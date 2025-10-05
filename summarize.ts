import type { Handler } from "@netlify/functions";
import { GoogleGenAI } from '@google/genai';

interface CloudflareAIResponse {
  result: {
    response: string;
  };
  success: boolean;
  errors: any[];
  messages: any[];
}

const summarizeWithGemini = async (content: string, apiKey: string) => {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: content,
        config: {
            systemInstruction: 'أنت خبير في تلخيص النصوص. قم بتلخيص النص التالي بشكل موجز وواضح باللغة العربية، واستخدم نقاطًا للميزات الرئيسية إن أمكن.',
        }
    });
    if (!response.text) {
        throw new Error("Received an empty summary from Gemini AI.");
    }
    return response.text;
};

const summarizeWithCloudflare = async (content: string, accountId: string, apiKey: string) => {
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-2-7b-chat-int8`;
    const prompt = `Summarize the following text concisely in Arabic, using bullet points for key features if possible: "${content}"`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: [{ role: 'system', content: 'You are an expert text summarizer.' }, { role: 'user', content: prompt }]
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Cloudflare AI Error:", errorText);
        throw new Error("Fallback AI service failed to generate a summary.");
    }

    const data: CloudflareAIResponse = await response.json();
    if (!data.success || !data.result?.response) {
        throw new Error("Fallback AI service returned an invalid response.");
    }

    return data.result.response;
};


const handler: Handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    const { API_KEY, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_KEY } = process.env;

    if (!API_KEY) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Primary AI service is not configured.' })
        };
    }
    
    let parsedBody;
    try {
        parsedBody = JSON.parse(event.body || '{}');
    } catch (error) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
    }

    const { content } = parsedBody;
    if (!content) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing content' }) };
    }

    try {
        const result = await summarizeWithGemini(content, API_KEY);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ summary: result }),
        };
    } catch (geminiError) {
        console.warn("Gemini AI failed, attempting fallback to Cloudflare AI. Reason:", geminiError);
        
        if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_KEY) {
            console.error("Cloudflare credentials not configured for fallback.");
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Failed to generate summary with primary AI, and fallback is not configured.' })
            };
        }

        try {
            const result = await summarizeWithCloudflare(content, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_KEY);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ summary: result }),
            };
        } catch (cloudflareError) {
            console.error("Cloudflare AI fallback also failed. Reason:", cloudflareError);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Failed to generate summary with both primary and fallback AI services.' })
            };
        }
    }
};

export { handler };