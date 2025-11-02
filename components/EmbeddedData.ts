// بيانات التطبيقات المُدمجة - تُستخدم كحل احتياطي في حالة فشل تحميل ملف JSON
// البيانات مطابقة تماماً لـ apps_database.json
export const embeddedAppsData = {
  "categories": [
    {
      "id": "modified",
      "name_ar": "التطبيقات المعدلة (الذهبية)",
      "name_en": "Modified Apps (Gold)",
      "icon": "💎",
      "description_ar": "تطبيقات معدلة بميزات إضافية"
    },
    {
      "id": "iptv",
      "name_ar": "بث مباشر و IPTV",
      "name_en": "Live Streaming & IPTV",
      "icon": "📺",
      "description_ar": "تطبيقات البث المباشر والتلفزيون"
    },
    {
      "id": "movies",
      "name_ar": "أفلام ومسلسلات",
      "name_en": "Movies & Series",
      "icon": "🎬",
      "description_ar": "منصات مشاهدة الأفلام والمسلسلات"
    },
    {
      "id": "sports",
      "name_ar": "رياضة",
      "name_en": "Sports",
      "icon": "⚽",
      "description_ar": "تطبيقات متابعة الرياضة والمباريات"
    },
    {
      "id": "design",
      "name_ar": "تصميم ومونتاج",
      "name_en": "Design & Editing",
      "icon": "🎨",
      "description_ar": "تطبيقات التصميم وتعديل الصور والفيديو"
    },
    {
      "id": "ai",
      "name_ar": "ذكاء اصطناعي",
      "name_en": "Artificial Intelligence",
      "icon": "🤖",
      "description_ar": "تطبيقات الذكاء الاصطناعي"
    },
    {
      "id": "tools",
      "name_ar": "أدوات وتطبيقات عامة",
      "name_en": "Tools & Utilities",
      "icon": "🔧",
      "description_ar": "أدوات مساعدة وتطبيقات عامة"
    }
  ],
  "apps": []
};

// Note: apps array is empty to reduce bundle size. 
// The component will always try to fetch from /data/apps_database.json first.
