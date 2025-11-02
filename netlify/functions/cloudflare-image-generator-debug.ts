import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  // Debug: Check environment variables
  const { CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID } = process.env;
  
  const debugInfo = {
    hasToken: !!CLOUDFLARE_API_TOKEN,
    tokenLength: CLOUDFLARE_API_TOKEN ? CLOUDFLARE_API_TOKEN.length : 0,
    tokenPrefix: CLOUDFLARE_API_TOKEN ? CLOUDFLARE_API_TOKEN.substring(0, 10) + '...' : 'none',
    hasAccountId: !!CLOUDFLARE_ACCOUNT_ID,
    accountIdLength: CLOUDFLARE_ACCOUNT_ID ? CLOUDFLARE_ACCOUNT_ID.length : 0,
    accountIdValue: CLOUDFLARE_ACCOUNT_ID || 'none'
  };

  // If this is a debug request
  const parsedBody = event.body ? JSON.parse(event.body) : {};
  if (parsedBody.debug) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'معلومات التشخيص',
        debugInfo,
        timestamp: new Date().toISOString()
      }),
    };
  }

  if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ACCOUNT_ID) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'مفاتيح API غير موجودة',
        debugInfo,
        details: 'يرجى إضافة CLOUDFLARE_API_TOKEN و CLOUDFLARE_ACCOUNT_ID في Netlify environment variables'
      }),
    };
  }

  const { prompt } = parsedBody;
  if (!prompt) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing prompt' }) };
  }

  try {
    console.log('Trying to call Cloudflare AI API...');
    console.log('Account ID:', CLOUDFLARE_ACCOUNT_ID);
    console.log('Token prefix:', CLOUDFLARE_API_TOKEN.substring(0, 10));
    
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

    console.log('Cloudflare API Response Status:', response.status);
    console.log('Cloudflare API Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Cloudflare API Error Response:', errorText);
      throw new Error(`Cloudflare API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log('Cloudflare API Success Response:', JSON.stringify(data, null, 2));

    if (!data.success || !data.result || !data.result.images || data.result.images.length === 0) {
      throw new Error(`Cloudflare API returned no images. Response: ${JSON.stringify(data)}`);
    }

    const base64Image = data.result.images[0];
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ imageUrl }),
    };
  } catch (error) {
    console.error('Cloudflare Image API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'فشل إنشاء الصورة';
    const errorStack = error instanceof Error ? error.stack : undefined;

    // Enhanced error messages
    let userFriendlyError = errorMessage;
    
    if (errorMessage.includes('401') || errorMessage.includes('Authentication')) {
      userFriendlyError = 'خطأ في المصادقة - تأكد من صحة CLOUDFLARE_API_TOKEN';
    } else if (errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
      userFriendlyError = 'خطأ في الصلاحيات - تأكد من تفعيل Workers AI في حسابك';
    } else if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      userFriendlyError = 'خطأ في الـ Account ID أو النموذج غير متوفر';
    } else if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
      userFriendlyError = 'تم تجاوز حد الطلبات - انتظر قليلاً وحاول مرة أخرى';
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: userFriendlyError,
        originalError: errorMessage,
        debugInfo,
        timestamp: new Date().toISOString(),
        stack: errorStack
      }),
    };
  }
};

export { handler};