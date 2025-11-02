// ملف اختبار لاستكشاف أخطاء مولد الصور
// استخدم هذا الملف لاستكشاف مشاكل API وإعدادات Cloudflare

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

  // Debug: فحص متغيرات البيئة
  const { CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID } = process.env;
  
  const debugInfo = {
    timestamp: new Date().toISOString(),
    hasToken: !!CLOUDFLARE_API_TOKEN,
    tokenLength: CLOUDFLARE_API_TOKEN ? CLOUDFLARE_API_TOKEN.length : 0,
    tokenPrefix: CLOUDFLARE_API_TOKEN ? CLOUDFLARE_API_TOKEN.substring(0, 10) + '...' : 'none',
    tokenLastChars: CLOUDFLARE_API_TOKEN ? '...' + CLOUDFLARE_API_TOKEN.substring(-4) : 'none',
    hasAccountId: !!CLOUDFLARE_ACCOUNT_ID,
    accountIdLength: CLOUDFLARE_ACCOUNT_ID ? CLOUDFLARE_ACCOUNT_ID.length : 0,
    accountIdValue: CLOUDFLARE_ACCOUNT_ID ? CLOUDFLARE_ACCOUNT_ID : 'none',
    environment: process.env.NODE_ENV || 'unknown'
  };

  // إذا كان الطلب contains "debug" فقط، أرجع معلومات التشخيص
  const parsedBody = event.body ? JSON.parse(event.body) : {};
  if (parsedBody.type === 'debug') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: '🔍 معلومات التشخيص لمولد الصور',
        debugInfo,
        instructions: [
          '1. تأكد من وجود CLOUDFLARE_API_TOKEN و CLOUDFLARE_ACCOUNT_ID',
          '2. تأكد من صحة Account ID (32 حرف)',
          '3. تأكد من صحة API Token (يبدأ بـ cf_)',
          '4. تأكد من تفعيل Workers AI في حساب Cloudflare'
        ]
      }),
    };
  }

  // اختبار المصادقة مع Cloudflare
  if (parsedBody.type === 'test_auth') {
    if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ACCOUNT_ID) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'مفاتيح API غير موجودة',
          debugInfo
        }),
      };
    }

    try {
      console.log('🧪 اختبار المصادقة مع Cloudflare API...');
      
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/models`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('📡 استجابة اختبار المصادقة:', { status: response.status });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          statusCode: response.status,
          headers,
          body: JSON.stringify({ 
            error: 'فشل في اختبار المصادقة',
            status: response.status,
            statusText: response.statusText,
            errorDetails: errorText,
            debugInfo
          }),
        };
      }

      const data = await response.json();
      
      // فحص إذا كان نموذج Flux متوفر
      const fluxModel = data.result?.find((model: any) => model.name.includes('flux'));
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: '✅ نجح اختبار المصادقة',
          modelsAvailable: data.result?.length || 0,
          fluxModelAvailable: !!fluxModel,
          fluxModelName: fluxModel?.name || 'غير متوفر',
          debugInfo
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'خطأ في اختبار المصادقة',
          errorMessage: error instanceof Error ? error.message : 'خطأ غير معروف',
          debugInfo
        }),
      };
    }
  }

  // اختبار إنشاء صورة فعلية
  if (parsedBody.type === 'test_image') {
    const { prompt } = parsedBody;
    
    if (!prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'يرجى توفير prompt لاختبار إنشاء الصورة' }),
      };
    }

    if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ACCOUNT_ID) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'مفاتيح API غير موجودة', debugInfo }),
      };
    }

    try {
      console.log('🎨 اختبار إنشاء صورة...', { prompt });

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
        const errorText = await response.text();
        console.error('❌ خطأ في إنشاء الصورة:', errorText);
        
        return {
          statusCode: response.status,
          headers,
          body: JSON.stringify({ 
            error: 'فشل في إنشاء الصورة',
            status: response.status,
            statusText: response.statusText,
            errorDetails: errorText,
            debugInfo
          }),
        };
      }

      const data = await response.json();
      console.log('✅ نجح إنشاء الصورة');

      if (!data.success || !data.result || !data.result.images || data.result.images.length === 0) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Cloudflare API لم يُرجع أي صور',
            responseData: data,
            debugInfo
          }),
        };
      }

      const base64Image = data.result.images[0];
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: '🎉 نجح إنشاء الصورة!',
          imageUrl,
          model: '@cf/black-forest-labs/flux-1-schnell',
          debugInfo
        }),
      };
    } catch (error) {
      console.error('❌ خطأ في اختبار إنشاء الصورة:', error);
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'خطأ في إنشاء الصورة',
          errorMessage: error instanceof Error ? error.message : 'خطأ غير معروف',
          debugInfo
        }),
      };
    }
  }

  return {
    statusCode: 400,
    headers,
    body: JSON.stringify({ 
      error: 'نوع طلب غير صحيح',
      availableTypes: ['debug', 'test_auth', 'test_image'],
      example: {
        debug: { type: 'debug' },
        test_auth: { type: 'test_auth' },
        test_image: { type: 'test_image', prompt: 'a beautiful sunset' }
      }
    }),
  };
};

export { handler };