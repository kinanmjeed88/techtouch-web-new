// بيانات التطبيقات المُدمجة في حالة فشل تحميل ملف JSON
export const embeddedAppsData = {
  categories: {
    iptv: {
      name: "بث مباشر - IPTV",
      nameEn: "Live Streaming - IPTV",
      icon: "📺",
      color: "#FF6B6B"
    },
    movies: {
      name: "أفلام ومسلسلات",
      nameEn: "Movies & Series",
      icon: "🎬",
      color: "#4ECDC4"
    },
    modified_apps: {
      name: "تطبيقات محدثة",
      nameEn: "Modified Apps",
      icon: "💎",
      color: "#45B7D1"
    },
    tools: {
      name: "أدوات ومعدات",
      nameEn: "Tools & Utilities",
      icon: "🔧",
      color: "#96CEB4"
    },
    ai_apps: {
      name: "ذكاء اصطناعي",
      nameEn: "AI Applications",
      icon: "🤖",
      color: "#FFEAA7"
    },
    entertainment: {
      name: "ترفيه وموسيقى",
      nameEn: "Entertainment",
      icon: "🎮",
      color: "#DDA0DD"
    },
    productivity: {
      name: "إنتاجية",
      nameEn: "Productivity",
      icon: "📱",
      color: "#F4A261"
    }
  },
  apps: [
    {
      id: 1,
      name: "Black Ultra",
      nameAr: "بلاك اولترا",
      link: "https://t.me/techtouch7/2719",
      category: "iptv",
      keywords: ["iptv", "iptv", "streaming", "بث مباشر", "تلفزيون"],
      description: "تطبيق بث مباشر متقدم",
      featured: true
    },
    {
      id: 2,
      name: "OTF TV",
      nameAr: "OTF TV",
      link: "https://t.me/techtouch7/3873",
      category: "iptv",
      keywords: ["iptv", "live", "streaming", "بث", "تلفزيون"],
      description: "تطبيق IPTV عالي الجودة",
      featured: false
    },
    {
      id: 3,
      name: "ZAIN LIVE",
      nameAr: "زين لايف",
      link: "https://t.me/techtouch7/1992",
      category: "iptv",
      keywords: ["iptv", "zain", "live", "زين", "بث"],
      description: "بث مباشر لقناة زين",
      featured: false
    },
    {
      id: 9,
      name: "Yalla Shoot",
      nameAr: "يلا شوت",
      link: "https://t.me/techtouch7/674",
      category: "entertainment",
      keywords: ["sports", "football", "soccer", "رياضة", "كرة قدم", "يلا شوت"],
      description: "موقع مشاهدة المباريات",
      featured: true
    },
    {
      id: 11,
      name: "Mix Flix TV",
      nameAr: "ميكس فليكس تي في",
      link: "https://t.me/techtouch7/1450",
      category: "movies",
      keywords: ["movies", "series", "أفلام", "مسلسلات", "mix", "flix"],
      description: "تطبيق مشاهدة الأفلام والمسلسلات",
      featured: true
    },
    {
      id: 13,
      name: "Shoof",
      nameAr: "شوف",
      link: "https://t.me/techtouch7/372",
      category: "movies",
      keywords: ["movies", "series", "أفلام", "مسلسلات", "shuf", "شوف"],
      description: "منصة مشاهدة الأفلام شوف",
      featured: true
    },
    {
      id: 42,
      name: "Netflix",
      nameAr: "نتفليكس",
      link: "https://t.me/techtouch7/2676",
      category: "movies",
      keywords: ["netflix", "streaming", "نتفليكس", "أفلام"],
      description: "تطبيق Netflix المعدل",
      featured: true
    },
    {
      id: 54,
      name: "واتساب الذهبي",
      nameAr: "واتساب الذهبي",
      link: "https://t.me/techtouch7/3071",
      category: "modified_apps",
      keywords: ["whatsapp", "modified", "واتساب", "ذهبي"],
      description: "تطبيق واتساب المعدل",
      featured: true
    },
    {
      id: 55,
      name: "ماسنجر الذهبي",
      nameAr: "ماسنجر الذهبي",
      link: "https://t.me/techtouch7/9?single",
      category: "modified_apps",
      keywords: ["messenger", "modified", "فيسبوك", "ماسنجر"],
      description: "تطبيق ماسنجر المعدل",
      featured: true
    },
    {
      id: 57,
      name: "انستجرام الذهبي",
      nameAr: "انستجرام الذهبي",
      link: "https://t.me/techtouch7/283",
      category: "modified_apps",
      keywords: ["instagram", "modified", "انستجرام", "ذهبي"],
      description: "تطبيق انستجرام المعدل",
      featured: true
    },
    {
      id: 61,
      name: "يوتيوب الذهبي",
      nameAr: "يوتيوب الذهبي",
      link: "https://t.me/techtouch7/222?single",
      category: "modified_apps",
      keywords: ["youtube", "modified", "يوتيوب", "ذهبي"],
      description: "تطبيق يوتيوب المعدل",
      featured: true
    },
    {
      id: 65,
      name: "كيبورد الذكاء الاصطناعي",
      nameAr: "كيبورد الذكاء الاصطناعي",
      link: "https://t.me/techtouch7/1733",
      category: "ai_apps",
      keywords: ["ai", "keyboard", "ذكاء اصطناعي", "كيبورد"],
      description: "كيبورد ذكي بالذكاء الاصطناعي",
      featured: true
    },
    {
      id: 69,
      name: "ChatOn",
      nameAr: "شات أون",
      link: "https://t.me/techtouch7/1489",
      category: "ai_apps",
      keywords: ["chat", "ai", "شات", "ذكاء اصطناعي"],
      description: "تطبيق محادثة بالذكاء الاصطناعي",
      featured: true
    },
    {
      id: 75,
      name: "FaceApp",
      nameAr: "فيس آب",
      link: "https://t.me/techtouch7/1950",
      category: "ai_apps",
      keywords: ["face", "ai", "صور", "وجوه", "فيس آب"],
      description: "تعديل الصور بالذكاء الاصطناعي",
      featured: true
    },
    {
      id: 83,
      name: "Remini",
      nameAr: "رميني",
      link: "https://t.me/techtouch7/456",
      category: "productivity",
      keywords: ["photo", "enhance", "تحسين صور", "رميني"],
      description: "تطبيق تحسين جودة الصور",
      featured: true
    },
    {
      id: 84,
      name: "PicsArt",
      nameAr: "بيكس آرت",
      link: "https://t.me/techtouch7/76",
      category: "productivity",
      keywords: ["design", "photo", "تصميم", "صور", "بيكس آرت"],
      description: "تطبيق التصميم الشامل",
      featured: true
    },
    {
      id: 86,
      name: "1.1.1.1",
      nameAr: "1.1.1.1",
      link: "https://t.me/techtouch7/889",
      category: "tools",
      keywords: ["vpn", "privacy", "vpn", "خصوصية"],
      description: "تطبيق VPN مجاني",
      featured: true
    }
  ]
};

// وظائف مساعدة للبحث
export const searchQueries = {
  sports: {
    keywords: ["رياضة", "football", "soccer", "كرة قدم", "مباريات", "yalla shoot", "kora", "juventus"],
    related_terms: ["athletics", "soccer", "فوتبول", "سبورت"]
  },
  movies: {
    keywords: ["أفلام", "movies", "مسلسلات", "series", "drama", "دراما", "cinema", "سينما"],
    related_terms: ["entertainment", "streaming", "بث", "متابعة"]
  },
  iptv: {
    keywords: ["iptv", "بث مباشر", "live", "تلفزيون", "tv", "streaming"],
    related_terms: ["بث مباشر", "live streaming", "قنوات"]
  },
  ai: {
    keywords: ["ذكاء اصطناعي", "ai", "artificial intelligence"],
    related_terms: ["مساعد ذكي", "smart assistant"]
  },
  modified_apps: {
    keywords: ["تطبيقات محدثة", "modified", "ذهبي", "gold"],
    related_terms: ["تطبيقات معدلة", "modded apps"]
  },
  utilities: {
    keywords: ["أدوات", "utilities", "مساعدات", "admin"],
    related_terms: ["تطبيقات مساعدة", "helper apps"]
  }
};