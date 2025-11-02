// أداة اختبار شاملة لمولد الصور Cloudflare
// انسخ هذا في Console المتصفح وقم بتشغيله

const API_BASE = 'https://techtouch.kinanmjeed88.com/.netlify/functions';

// اختبار شامل
async function runFullTest() {
  console.log('🚀 بدء الاختبار الشامل لمولد الصور Cloudflare...');
  
  // 1. اختبار التشخيص
  await testDiagnostics();
  
  // 2. اختبار المصادقة
  await testAuthentication();
  
  // 3. اختبار إنشاء صورة
  await testImageGeneration();
  
  console.log('✅ انتهى الاختبار الشامل!');
}

// اختبار التشخيص
async function testDiagnostics() {
  console.log('\n🔍 اختبار التشخيص...');
  try {
    const response = await fetch(`${API_BASE}/image-generator-test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'debug' })
    });
    
    const data = await response.json();
    console.log('📊 معلومات التشخيص:', data);
    
    if (data.debugInfo) {
      const info = data.debugInfo;
      console.log(`🔑 Token: ${info.hasToken ? '✅ موجود' : '❌ مفقود'} (${info.tokenLength} chars)`);
      console.log(`🆔 Account ID: ${info.hasAccountId ? '✅ موجود' : '❌ مفقود'} (${info.accountIdLength} chars)`);
    }
    
  } catch (error) {
    console.error('❌ خطأ في التشخيص:', error);
  }
}

// اختبار المصادقة
async function testAuthentication() {
  console.log('\n🔐 اختبار المصادقة...');
  try {
    const response = await fetch(`${API_BASE}/image-generator-test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'test_auth' })
    });
    
    const data = await response.json();
    console.log('🔐 نتائج المصادقة:', data);
    
    if (data.modelsAvailable !== undefined) {
      console.log(`🤖 النماذج المتاحة: ${data.modelsAvailable}`);
      console.log(`🚀 نموذج Flux: ${data.fluxModelAvailable ? '✅ متوفر' : '❌ غير متوفر'}`);
    }
    
  } catch (error) {
    console.error('❌ خطأ في المصادقة:', error);
  }
}

// اختبار إنشاء صورة
async function testImageGeneration() {
  console.log('\n🎨 اختبار إنشاء صورة...');
  
  const testPrompt = 'a beautiful sunset over mountains';
  
  try {
    const startTime = Date.now();
    
    const response = await fetch(`${API_BASE}/cloudflare-image-generator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: testPrompt })
    });
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    const data = await response.json();
    console.log(`⏱️ وقت الاستجابة: ${duration}ms`);
    console.log(`📊 حالة الاستجابة: ${response.status}`);
    
    if (response.ok && data.imageUrl) {
      console.log('✅ نجح إنشاء الصورة!');
      console.log('📷 إنشاء معاينة الصورة...');
      
      const img = document.createElement('img');
      img.src = data.imageUrl;
      img.style.cssText = 'max-width: 250px; border: 3px solid #4CAF50; border-radius: 8px; margin: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);';
      img.title = `مُنشأة في ${duration}ms`;
      
      const container = document.getElementById('image-result-container') || document.body;
      if (container.id !== 'image-result-container') {
        container.id = 'image-result-container';
      }
      
      container.appendChild(img);
      
    } else {
      console.error('❌ فشل في إنشاء الصورة:', data.error);
    }
    
  } catch (error) {
    console.error('❌ خطأ في إنشاء الصورة:', error);
  }
}

// فحص البيئة
function checkEnvironment() {
  console.log('🌍 معلومات البيئة:');
  console.log(`📍 الموقع: ${window.location.href}`);
  console.log(`🖥️ المتصفح: ${navigator.userAgent.split(' ')[0]}`);
  console.log(`📱 الشاشة: ${screen.width}x${screen.height}`);
  console.log(`⏰ الوقت: ${new Date().toLocaleString()}`);
}

// تصدير الدوال
window.runFullTest = runFullTest;
window.testDiagnostics = testDiagnostics;
window.testAuthentication = testAuthentication;
window.testImageGeneration = testImageGeneration;
window.checkEnvironment = checkEnvironment;

console.log(`
🎨 Cloudflare Image Generator - اختبار شامل

الأوامر المتاحة:
• runFullTest() - تشغيل جميع الاختبارات
• testDiagnostics() - اختبار التشخيص فقط
• testAuthentication() - اختبار المصادقة فقط
• testImageGeneration() - اختبار إنشاء صورة
• checkEnvironment() - فحص معلومات البيئة

للاستخدام السريع:
runFullTest()
`);

// تشغيل تلقائي
setTimeout(() => {
  console.log('🤖 تشغيل تلقائي للاختبار...');
  checkEnvironment();
  runFullTest();
}, 2000);