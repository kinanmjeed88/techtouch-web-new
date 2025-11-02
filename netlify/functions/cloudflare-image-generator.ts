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

  // Check for required environment variables
  const { CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID } = process.env;
  if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ACCOUNT_ID) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'مفاتيح API غير موجودة',
        details: 'يرجى إضافة CLOUDFLARE_API_TOKEN و CLOUDFLARE_ACCOUNT_ID في Netlify environment variables'
      }),
    };
  }

  let parsedBody;
  try {
    parsedBody = JSON.parse(event.body || '{}');
  } catch (error) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { prompt } = parsedBody;
  if (!prompt) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'يرجى إدخال وصف للصورة' }) };
  }

  try {
    console.log('🎨 بدء إنشاء الصورة...', { 
      prompt: prompt.substring(0, 50) + '...', 
      accountId: CLOUDFLARE_ACCOUNT_ID?.substring(0, 8) + '...' 
    });
    
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

    console.log('📡 استجابة Cloudflare API:', { 
      status: response.status, 
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ خطأ من Cloudflare API:', errorText);
      
      let errorMessage = 'فشل في إنشاء الصورة';
      
      if (response.status === 401) {
        errorMessage = 'خطأ في المصادقة - تأكد من صحة CLOUDFLARE_API_TOKEN';
      } else if (response.status === 403) {
        errorMessage = 'خطأ في الصلاحيات - تأكد من تفعيل Workers AI في حسابك';
      } else if (response.status === 404) {
        errorMessage = 'خطأ في الـ Account ID أو النموذج غير متوفر';
      } else if (response.status === 429) {
        errorMessage = 'تم تجاوز حد الطلبات - انتظر قليلاً وحاول مرة أخرى';
      } else if (response.status >= 500) {
        errorMessage = 'خطأ في خوادم Cloudflare - يرجى المحاولة لاحقاً';
      }
      
      throw new Error(`${errorMessage} (HTTP ${response.status})`);
    }

    const data = await response.json();
    console.log('✅ استجابة ناجحة من Cloudflare API:', {
      success: data.success,
      hasImages: !!(data.result?.images?.length > 0),
      imageCount: data.result?.images?.length || 0
    });

    if (!data.success || !data.result || !data.result.images || data.result.images.length === 0) {
      throw new Error(`Cloudflare API لم يُرجع أي صور. الاستجابة: ${JSON.stringify(data)}`);
    }

    const base64Image = data.result.images[0];
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    console.log('🎉 تم إنشاء الصورة بنجاح!');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        imageUrl,
        message: 'تم إنشاء الصورة بنجاح!',
        model: '@cf/black-forest-labs/flux-1-schnell'
      }),
    };
  } catch (error) {
    console.error('❌ خطأ في إنشاء الصورة:', error);
    const errorMessage = error instanceof Error ? error.message : 'فشل إنشاء الصورة';
    
    // رسائل خطأ مفيدة للمستخدم
    let userFriendlyError = errorMessage;
    
    if (errorMessage.includes('Authentication') || errorMessage.includes('401')) {
      userFriendlyError = 'خطأ في المصادقة - تأكد من صحة CLOUDFLARE_API_TOKEN';
    } else if (errorMessage.includes('Account') || errorMessage.includes('403')) {
      userFriendlyError = 'خطأ في الوصول للحساب - تأكد من تفعيل Workers AI في حسابك';
    } else if (errorMessage.includes('404')) {
      userFriendlyError = 'خطأ في الـ Account ID - تأكد من صحة CLOUDFLARE_ACCOUNT_ID';
    } else if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
      userFriendlyError = 'تم تجاوز حد الطلبات - انتظر قليلاً وحاول مرة أخرى';
    } else if (errorMessage.includes('500')) {
      userFriendlyError = 'خطأ في خوادم Cloudflare - يرجى المحاولة لاحقاً';
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: userFriendlyError,
        originalError: errorMessage,
        timestamp: new Date().toISOString(),
        help: 'تأكد من إضافة متغيرات البيئة في Netlify Dashboard وفعّل Workers AI في حساب Cloudflare'
      })
    };
  }
};

export { handler };