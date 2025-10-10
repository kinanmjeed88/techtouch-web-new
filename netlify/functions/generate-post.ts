import type { Handler } from "@netlify/functions";
import { GoogleGenAI, Type } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';
// Fix: Import 'process' to provide type definitions for process.cwd()
import process from 'process';

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
            body: JSON.stringify({ error: 'خدمة الذكاء الاصطناعي غير مكونة.' }),
        };
    }

    let parsedBody;
    try {
        parsedBody = JSON.parse(event.body || '{}');
    } catch (error) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
    }

    const { title, description, link } = parsedBody;
    if (!title) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'العنوان مطلوب.' }) };
    }
    
    // 1. Load categories to provide context to the AI
    let categories: { id: string, title: string }[] = [];
    let categoryListForPrompt = 'any relevant category';
    try {
        const categoriesPath = path.join(process.cwd(), 'public/categories.json');
        const categoriesFile = await fs.readFile(categoriesPath, 'utf-8');
        const categoriesData = JSON.parse(categoriesFile);
        categories = categoriesData.categories || [];
        if (categories.length > 0) {
            categoryListForPrompt = categories.map(c => `'${c.id}' (${c.title})`).join(', ');
        }
    } catch (e) {
        console.warn("Could not load categories.json, proceeding without category suggestions.", e);
    }

    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const userPrompt = `
        Topic/Title: ${title}
        Description: ${description || 'غير متوفر.'}
        Reference Link: ${link || 'غير متوفر.'}
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction: `You are an expert content creator for a tech blog. Your task is to generate a complete blog post based on a given topic.
- The content must be concise, accurate, useful, and written in Arabic.
- It must be well-structured using Markdown for formatting (e.g., '##' for headings, '-' for bullet points).
- You must use Google Search to find up-to-date information and a relevant YouTube video link.
- You must also select the most appropriate category ID for this post from the following list: [${categoryListForPrompt}].
- Your entire response must be a single, valid JSON object, with no other text before or after it.`,
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        content: {
                            type: Type.STRING,
                            description: "The full blog post content in Arabic, formatted with Markdown."
                        },
                        youtubeUrl: {
                            type: Type.STRING,
                            description: "A relevant YouTube video URL for the topic."
                        },
                        category: {
                            type: Type.STRING,
                            description: `The ID of the most relevant category from the provided list.`
                        }
                    },
                    required: ["content", "youtubeUrl", "category"]
                }
            }
        });

        const jsonString = response.text.trim();
        const parsedResult = JSON.parse(jsonString);
        
        // Append sources from grounding metadata
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const sources = groundingChunks
            .map((chunk: any) => chunk.web)
            .filter((web: any) => web && web.uri)
            // de-duplicate sources based on URI
            .reduce((acc: any[], current: any) => {
                if (!acc.find(item => item.uri === current.uri)) {
                    acc.push(current);
                }
                return acc;
            }, [])
            .map((web: any) => `- [${web.title || web.uri}](${web.uri})`);

        if (sources.length > 0) {
            parsedResult.content += `\n\n## المصادر\n${sources.join('\n')}`;
        }
        
        // Find category title to return to frontend for easy UI manipulation
        const selectedCategory = categories.find(c => c.id === parsedResult.category);
        parsedResult.categoryTitle = selectedCategory ? selectedCategory.title : parsedResult.category;


        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(parsedResult),
        };

    } catch (error) {
        console.error('Error generating post with AI:', error);
        const errorMessage = error instanceof Error ? error.message : 'فشل إنشاء المحتوى.';
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: `فشل إنشاء المحتوى بالذكاء الاصطناعي: ${errorMessage}` }),
        };
    }
};

export { handler };
