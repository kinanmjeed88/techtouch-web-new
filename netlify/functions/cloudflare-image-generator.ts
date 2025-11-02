import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  // Ensure Cloudflare API credentials are present
  const { CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID } = process.env;
  if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ACCOUNT_ID) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'مفاتيح API الخاصة بـ Cloudflare غير موجودة. يرجى التحقق من إعدادات البيئة.' }),
    };
  }

  let parsedBody;
  try {
    parsedBody = JSON.parse(event.body || '{}');
  } catch (error) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { prompt } = parsedBody;

  // Ensure prompt is provided
  if (!prompt) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing prompt' }) };
  }

  try {
    // Call Cloudflare AI API for image generation
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          steps: 4,
          guidance: 3.5,
          lora_scale: 1,
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "jpeg",
          output_quality: 90
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Cloudflare API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();

    if (!data.success || !data.result || !data.result.images || data.result.images.length === 0) {
      throw new Error('لم يتم إنشاء أي صور من قبل Cloudflare AI.');
    }

    // Convert base64 image to data URL
    const base64Image = data.result.images[0];
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ imageUrl }),
    };
  } catch (error) {
    console.error('Error calling Cloudflare Image API:', error);
    const errorMessage = error instanceof Error ? error.message : 'فشل إنشاء الصورة.';

    // More user-friendly messages for API key issues
    if (errorMessage.includes('Authentication') || errorMessage.includes('401')) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'خطأ في المصادقة مع Cloudflare AI. يرجى التحقق من مفتاح API.' })
      };
    }

    if (errorMessage.includes('Account') || errorMessage.includes('403')) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'خطأ في الوصول للحساب. يرجى التحقق من Account ID.' })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: errorMessage })
    };
  }
};

export { handler };