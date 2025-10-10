import type { Handler } from "@netlify/functions";
import { GoogleGenAI } from '@google/genai';

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

    const { API_KEY } = process.env;
    if (!API_KEY) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'AI service is not configured.' }),
        };
    }

    let parsedBody;
    try {
        parsedBody = JSON.parse(event.body || '{}');
    } catch (error) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
    }

    const { topic } = parsedBody;
    if (!topic) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing topic' }) };
    }

    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: topic,
            config: {
                systemInstruction: 'أنت باحث خبير. قم بتقديم معلومات مفصلة ومنظمة حول الموضوع التالي. استخدم العناوين والنقاط لتسهيل القراءة. يجب أن تكون المعلومات دقيقة ومستندة إلى مصادر موثوقة. تحدث باللغة العربية.',
                tools: [{ googleSearch: {} }],
            },
        });

        if (!response.text) {
            throw new Error("Received an empty response from the AI.");
        }

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const sources = groundingChunks
            .map((chunk: any) => chunk.web)
            .filter((web: any) => web && web.uri)
            // De-duplicate sources based on URI
            .reduce((acc: any[], current: any) => {
                if (!acc.find(item => item.uri === current.uri)) {
                    acc.push(current);
                }
                return acc;
            }, [])
            .slice(0, 5); // Limit to a maximum of 5 sources
            
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ details: response.text, sources }),
        };

    } catch (error) {
        console.error('Error fetching details from AI:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to fetch details from the AI service.' }),
        };
    }
};

export { handler };
