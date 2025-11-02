# 🔧 أدوات حل مشاكل مولد الصور Cloudflare

## 🚀 التشغيل السريع

### اختبار النظام من المتصفح:
```javascript
// انسخ هذا في Console المتصفح
fetch('https://techtouch.kinanmjeed88.com/.netlify/functions/image-generator-test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ type: 'debug' })
}).then(r => r.json()).then(console.log);
```

## 📁 الملفات المتوفرة

### 1. أدوات التشخيص:
- `image-generator-test.ts` - ملف Netlify Function للاختبار الشامل
- `cloudflare-image-generator-debug.ts` - إصدار محسن بالتفاصيل
- `comprehensive_test.js` - اختبار شامل في المتصفح

### 2. التوثيق:
- `دليل_حل_مشاكل_Cloudflare_AI_محدث.md` - دليل شامل لحل المشاكل
- `اختبار_مولد_الصور.js` - اختبار سريع

### 3. ملفات البيئة:
- `.env.example` - مثال على متغيرات البيئة المطلوبة

## 🛠️ الاستخدام

### للاختبار من Netlify Functions:
```bash
# اختبار التشخيص
POST /image-generator-test
{"type": "debug"}

# اختبار المصادقة  
POST /image-generator-test
{"type": "test_auth"}

# اختبار إنشاء صورة
POST /image-generator-test
{"type": "test_image", "prompt": "sunset over mountains"}
```

### للاختبار من المتصفح:
```javascript
// شغّل في Console
fetch('https://techtouch.kinanmjeed88.com/.netlify/functions/cloudflare-image-generator', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'a beautiful cat' })
}).then(r => r.json()).then(console.log);
```

## 🔍 الأخطاء الشائعة

### ❌ خطأ 401: API Token خطأ
### ❌ خطأ 403: Workers AI غير مفعل
### ❌ خطأ 404: Account ID خطأ
### ❌ خطأ 429: Rate Limit

## ✅ إصلاح سريع

1. **فعل Workers AI** في Cloudflare Dashboard
2. **أضف متغيرات البيئة** في Netlify
3. **اختبر الاتصال** بالأدوات أعلاه

## 📞 للمساعدة

إذا لم تنجح الحلول، استخدم أدوات التشخيص وأرسل النتيجة.