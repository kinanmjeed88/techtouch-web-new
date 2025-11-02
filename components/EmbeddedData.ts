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
      id: 17,
      name: "ياسين تيفي برو",
      nameAr: "ياسين تيفي برو",
      link: "https://t.me/techtouch7/137",
      category: "iptv",
      keywords: ["iptv", "yassin", "ياسين", "pro"],
      description: "تطبيق IPTV ياسين البرو",
      featured: true
    },
    {
      id: 18,
      name: "ياسين تيفي الأخضر",
      nameAr: "ياسين تيفي الأخضر",
      link: "https://t.me/techtouch7/138",
      category: "iptv",
      keywords: ["iptv", "yassin", "ياسين", "أخضر", "green"],
      description: "تطبيق IPTV ياسين الأخضر",
      featured: false
    },
    {
      id: 19,
      name: "ياسين تيفي الأسود",
      nameAr: "ياسين تيفي الأسود",
      link: "https://t.me/techtouch7/136",
      category: "iptv",
      keywords: ["iptv", "yassin", "ياسين", "أسود", "black"],
      description: "تطبيق IPTV ياسين الأسود",
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
    },
    {
      id: 88,
      name: "تلجرام الذهبي",
      nameAr: "تلجرام الذهبي",
      link: "https://t.me/techtouch7/543",
      category: "modified_apps",
      keywords: ["telegram", "modified", "تلجرام", "ذهبي", "tele"],
      description: "تطبيق تلجرام المعدل",
      featured: true
    },
    {
      id: 89,
      name: "واتساب بلس",
      nameAr: "واتساب بلس",
      link: "https://t.me/techtouch7/1234",
      category: "modified_apps",
      keywords: ["whatsapp", "modified", "واتساب", "plus", "بلس"],
      description: "تطبيق واتساب بلس",
      featured: true
    },
    {
      id: 90,
      name: "تيليجرام إكس",
      nameAr: "تيليجرام إكس",
      link: "https://t.me/techtouch7/2345",
      category: "modified_apps",
      keywords: ["telegram", "x", "modified", "تيليجرام", "ex"],
      description: "تطبيق تيليجرام إكس",
      featured: true
    },
    {
      id: 91,
      name: "الأسطورة",
      nameAr: "الأسطورة",
      link: "https://t.me/techtouch7/2000",
      category: "movies",
      keywords: ["الأسطورة", "al aslha", "أفلام", "مسلسلات", "cinema", "سينما", "movie"],
      description: "تطبيق الأسطورة لمشاهدة الأفلام والمسلسلات",
      featured: true
    },
    {
      id: 92,
      name: "سينمانا",
      nameAr: "سينمانا",
      link: "https://t.me/techtouch7/2001",
      category: "movies",
      keywords: ["سينمانا", "cinemana", "أفلام", "مسلسلات", "cinema", "سينما", "movie"],
      description: "تطبيق سينمانا لمشاهدة الأفلام والمسلسلات",
      featured: true
    },
    {
      id: 93,
      name: "شاهد VIP",
      nameAr: "شاهد VIP",
      link: "https://t.me/techtouch7/2002",
      category: "movies",
      keywords: ["شاهد", "shahid", "vip", "أفلام", "مسلسلات", "drama", "دراما"],
      description: "تطبيق شاهد VIP لمشاهدة المحتوى الحصري",
      featured: true
    },
    {
      id: 94,
      name: "اميونيتي",
      nameAr: "اميونيتي",
      link: "https://t.me/techtouch7/2003",
      category: "tools",
      keywords: ["اميونيتي", "immunity", "vpn", "شبكة", "اتصال"],
      description: "تطبيق اميونيتي للاتصالات الآمنة",
      featured: false
    },
    {
      id: 95,
      name: "واتساب GB",
      nameAr: "واتساب GB",
      link: "https://t.me/techtouch7/2004",
      category: "modified_apps",
      keywords: ["whatsapp", "gb", "واتساب", "معدل", "modified", "whatsapp gb"],
      description: "تطبيق واتساب GB المحدث",
      featured: true
    },
    {
      id: 96,
      name: "تيليجرام قنصلي",
      nameAr: "تيليجرام قنصلي",
      link: "https://t.me/techtouch7/2005",
      category: "modified_apps",
      keywords: ["telegram", "قنصلي", "qansary", "modified", "تيليجرام"],
      description: "تطبيق تيليجرام قنصلي المحدث",
      featured: false
    },
    {
      id: 97,
      name: "سناب شات الذهبي",
      nameAr: "سناب شات الذهبي",
      link: "https://t.me/techtouch7/2006",
      category: "modified_apps",
      keywords: ["snapchat", "golden", "ذهبي", "سناب شات", "modified"],
      description: "تطبيق سناب شات الذهبي المحدث",
      featured: true
    },
    {
      id: 98,
      name: "جوجل كروم المعدل",
      nameAr: "جوجل كروم المعدل",
      link: "https://t.me/techtouch7/2007",
      category: "tools",
      keywords: ["chrome", "google", "متصفح", "browser", "modified", "كروم"],
      description: "متصفح جوجل كروم المعدل",
      featured: false
    },
    {
      id: 99,
      name: "تيك توك الذهبي",
      nameAr: "تيك توك الذهبي",
      link: "https://t.me/techtouch7/2008",
      category: "modified_apps",
      keywords: ["tiktok", "golden", "ذهبي", "تيك توك", "modified", "tik tok"],
      description: "تطبيق تيك توك الذهبي المحدث",
      featured: true
    },
    {
      id: 100,
      name: "يوتيوب فليكس",
      nameAr: "يوتيوب فليكس",
      link: "https://t.me/techtouch7/2009",
      category: "modified_apps",
      keywords: ["youtube", "flex", "يوتيوب", "معدل", "modified", "vanced"],
      description: "تطبيق يوتيوب فليكس المحدث",
      featured: true
    },
    {
      id: 101,
      name: "بلو ستack",
      nameAr: "بلو ستack",
      link: "https://t.me/techtouch7/2010",
      category: "tools",
      keywords: ["bluestacks", "محاكي", "emulator", "اندرويد", "android"],
      description: "محاكي بلو ستack للأندرويد",
      featured: false
    },
    {
      id: 102,
      name: "PUBG المحدث",
      nameAr: "PUBG المحدث",
      link: "https://t.me/techtouch7/2011",
      category: "entertainment",
      keywords: ["pubg", "battle royale", "لعبة", "game", "باتل رويال"],
      description: "لعبة PUBG المحدثة",
      featured: true
    },
    {
      id: 103,
      name: "فري فاير المحدث",
      nameAr: "فري فاير المحدث",
      link: "https://t.me/techtouch7/2012",
      category: "entertainment",
      keywords: ["free fire", "لعبة", "game", "battle royale", "باتل رويال"],
      description: "لعبة فري فاير المحدثة",
      featured: true
    },
    {
      id: 104,
      name: "wara dijin",
      nameAr: "وارا دين",
      link: "https://t.me/techtouch7/2013",
      category: "entertainment",
      keywords: ["wara dijin", "وارا دين", "لعبة", "game", "استراتيجية"],
      description: "لعبة وارا دين الاستراتيجية",
      featured: false
    },
    {
      id: 105,
      name: "فقرة",
      nameAr: "فقرة",
      link: "https://t.me/techtouch7/2014",
      category: "productivity",
      keywords: ["فقرة", "fokra", "تطبيق", "مفيدة", "utilities"],
      description: "تطبيق فقرة المفيد",
      featured: false
    },
    {
      id: 106,
      name: "كيودو",
      nameAr: "كيودو",
      link: "https://t.me/techtouch7/2015",
      category: "entertainment",
      keywords: ["كيودو", "kaydo", "لعبة", "game", "ذكاء"],
      description: "لعبة كيودو الذهنية",
      featured: false
    },
    {
      id: 107,
      name: "بيمو",
      nameAr: "بيمو",
      link: "https://t.me/techtouch7/2016",
      category: "tools",
      keywords: ["بيمو", "bimo", "تطبيق", "مفيدة", "utilities"],
      description: "تطبيق بيمو المفيد",
      featured: false
    },
    {
      id: 108,
      name: "mix player",
      nameAr: "ميكس بلاير",
      link: "https://t.me/techtouch7/2017",
      category: "entertainment",
      keywords: ["mix player", "ميكس بلاير", "موسيقى", "music", "مشغل"],
      description: "مشغل ميكس للموسيقى",
      featured: false
    },
    {
      id: 109,
      name: "dhvani",
      nameAr: "ديفاني",
      link: "https://t.me/techtouch7/2018",
      category: "ai_apps",
      keywords: ["dhvani", "ديفاني", "ذكاء اصطناعي", "ai", "تطبيق ذكي"],
      description: "تطبيق ديفاني الذكي",
      featured: false
    },
    {
      id: 110,
      name: "هايبر fronte",
      nameAr: "هايبر fronte",
      link: "https://t.me/techtouch7/2019",
      category: "tools",
      keywords: ["hyper fronte", "هايبر fronte", "vpn", "شبكة"],
      description: "تطبيق هايبر fronte للشبكة",
      featured: false
    },
    {
      id: 111,
      name: "شوفاز",
      nameAr: "شوفاز",
      link: "https://t.me/techtouch7/2020",
      category: "movies",
      keywords: ["شوفاز", "shofaz", "أفلام", "مسلسلات", "cinema", "سينما"],
      description: "تطبيق شوفاز لمشاهدة الأفلام والمسلسلات",
      featured: true
    },
    {
      id: 112,
      name: "فليكس",
      nameAr: "فليكس",
      link: "https://t.me/techtouch7/2021",
      category: "movies",
      keywords: ["فليكس", "flix", "أفلام", "مسلسلات", "streaming", "بث"],
      description: "تطبيق فليكس لمشاهدة المحتوى",
      featured: true
    },
    {
      id: 113,
      name: "MovieBox",
      nameAr: "موفي بوكس",
      link: "https://t.me/techtouch7/2022",
      category: "movies",
      keywords: ["movie box", "موفي بوكس", "أفلام", "movies", "cinema"],
      description: "تطبيق MovieBox لمشاهدة الأفلام",
      featured: true
    },
    {
      id: 114,
      name: "Live One Sports",
      nameAr: "لايف ون سبورتس",
      link: "https://t.me/techtouch7/2023",
      category: "entertainment",
      keywords: ["live one sports", "لايف ون سبورتس", "رياضة", "sports", "بث"],
      description: "تطبيق بث المباريات الرياضية",
      featured: true
    },
    {
      id: 115,
      name: "GO TV",
      nameAr: "جو تي في",
      link: "https://t.me/techtouch7/2024",
      category: "iptv",
      keywords: ["go tv", "جو تي في", "iptv", "تلفزيون", "tv"],
      description: "تطبيق جو تي في للبث المباشر",
      featured: false
    },
    {
      id: 116,
      name: "TR BOX",
      nameAr: "TR BOX",
      link: "https://t.me/techtouch7/2025",
      category: "iptv",
      keywords: ["tr box", "iptv", "تلفزيون", "tv", "بث مباشر"],
      description: "تطبيق TR BOX للبث المباشر",
      featured: false
    },
    {
      id: 117,
      name: "KLIVE",
      nameAr: "KLIVE",
      link: "https://t.me/techtouch7/2026",
      category: "iptv",
      keywords: ["klive", "iptv", "live", "بث مباشر", "تلفزيون"],
      description: "تطبيق KLIVE للبث المباشر",
      featured: false
    },
    {
      id: 118,
      name: "Chat Filter",
      nameAr: "فلتر الدردشة",
      link: "https://t.me/techtouch7/2027",
      category: "modified_apps",
      keywords: ["chat filter", "فلتر", "دردشة", "whatsapp", "واتساب"],
      description: "فلتر الدردشة للتطبيقات",
      featured: false
    },
    {
      id: 119,
      name: "WhatsApp Delta",
      nameAr: "واتساب دلتا",
      link: "https://t.me/techtouch7/2028",
      category: "modified_apps",
      keywords: ["whatsapp", "delta", "واتساب", "معدل", "modified"],
      description: "تطبيق واتساب دلتا المحدث",
      featured: true
    },
    {
      id: 120,
      name: "Instagram PRISMA",
      nameAr: "انستجرام بريزما",
      link: "https://t.me/techtouch7/2029",
      category: "modified_apps",
      keywords: ["instagram", "prisma", "انستجرام", "معدل", "modified"],
      description: "تطبيق انستجرام بريزما المحدث",
      featured: true
    },
    {
      id: 121,
      name: "TikTok Vanced",
      nameAr: "تيك توك فانسيد",
      link: "https://t.me/techtouch7/2030",
      category: "modified_apps",
      keywords: ["tiktok", "vanced", "تيك توك", "معدل", "modified"],
      description: "تطبيق تيك توك فانسيد",
      featured: true
    },
    {
      id: 122,
      name: "Film App",
      nameAr: "فيلم آپ",
      link: "https://t.me/techtouch7/2031",
      category: "movies",
      keywords: ["film app", "فيلم آپ", "أفلام", "movies", "cinema"],
      description: "تطبيق فيلم آپ لمشاهدة الأفلام",
      featured: true
    },
    {
      id: 123,
      name: "TP Wallet",
      nameAr: "TP Wallet",
      link: "https://t.me/techtouch7/2032",
      category: "tools",
      keywords: ["tp wallet", "محفظة", "wallet", "crypto", "عملة رقمية"],
      description: "تطبيق TP Wallet للمحافظ الرقمية",
      featured: false
    },
    {
      id: 124,
      name: "ChatGPT",
      nameAr: "تشات جي بي تي",
      link: "https://t.me/techtouch7/2033",
      category: "ai_apps",
      keywords: ["chatgpt", "تشات جي بي تي", "ذكاء اصطناعي", "ai", "chat"],
      description: "تطبيق تشات جي بي تي للذكاء الاصطناعي",
      featured: true
    },
    {
      id: 125,
      name: "Bard AI",
      nameAr: "بارد ذكاء اصطناعي",
      link: "https://t.me/techtouch7/2034",
      category: "ai_apps",
      keywords: ["bard", "بارد", "ذكاء اصطناعي", "ai", "google"],
      description: "تطبيق بارد للذكاء الاصطناعي",
      featured: true
    },
    {
      id: 126,
      name: "Perplexity AI",
      nameAr: "بيربلكسيتي ذكاء اصطناعي",
      link: "https://t.me/techtouch7/2035",
      category: "ai_apps",
      keywords: ["perplexity", "بيربلكسيتي", "ذكاء اصطناعي", "ai", "search"],
      description: "تطبيق بيربلكسيتي للبحث الذكي",
      featured: false
    },
    {
      id: 127,
      name: "CapCut",
      nameAr: "كاب كات",
      link: "https://t.me/techtouch7/2036",
      category: "productivity",
      keywords: ["capcut", "كاب كات", "مونتاج", "video", "فيديو", "تعديل"],
      description: "تطبيق كاب كات لتعديل الفيديو",
      featured: true
    },
    {
      id: 128,
      name: "InShot",
      nameAr: "إن شوت",
      link: "https://t.me/techtouch7/2037",
      category: "productivity",
      keywords: ["inshot", "إن شوت", "مونتاج", "video", "فيديو", "تعديل"],
      description: "تطبيق إن شوت لتعديل الفيديو",
      featured: true
    },
    {
      id: 129,
      name: "VSCO",
      nameAr: "في إس كيو أو",
      link: "https://t.me/techtouch7/2038",
      category: "productivity",
      keywords: ["vsco", "في إس كيو أو", "صور", "photo", "فوتوغرافي", "تصوير"],
      description: "تطبيق VSCO لمعالجة الصور",
      featured: true
    },
    {
      id: 130,
      name: "Lightroom",
      nameAr: "لايت روم",
      link: "https://t.me/techtouch7/2039",
      category: "productivity",
      keywords: ["lightroom", "لايت روم", "صور", "photo", "adobe", "تصوير"],
      description: "تطبيق LightRoom لمعالجة الصور",
      featured: true
    },
    {
      id: 131,
      name: "موجا غيمر",
      nameAr: "موجا غيمر",
      link: "https://t.me/techtouch7/2040",
      category: "entertainment",
      keywords: ["موجا غيمر", "moga gamer", "لعبة", "game", "تحكم"],
      description: "تطبيق موجا غيمر للتحكم في الألعاب",
      featured: false
    },
    {
      id: 132,
      name: "ألعاب هايبر",
      nameAr: "ألعاب هايبر",
      link: "https://t.me/techtouch7/2041",
      category: "entertainment",
      keywords: ["هايبر", "hyper", "ألعاب", "games", "لعب"],
      description: "مجموعة ألعاب هايبر",
      featured: false
    },
    {
      id: 133,
      name: "WhatsApp Turkish",
      nameAr: "واتساب تركيش",
      link: "https://t.me/techtouch7/2042",
      category: "modified_apps",
      keywords: ["whatsapp", "turkish", "واتساب", "معدل", "modified"],
      description: "تطبيق واتساب Turkish المحدث",
      featured: true
    },
    {
      id: 134,
      name: "تيليجرام X Premium",
      nameAr: "تيليجرام إكس بريميوم",
      link: "https://t.me/techtouch7/2043",
      category: "modified_apps",
      keywords: ["telegram", "premium", "تيليجرام", "معدل", "modified"],
      description: "تطبيق تيليجرام X Premium المحدث",
      featured: true
    },
    {
      id: 135,
      name: "YouTube ReVanced",
      nameAr: "يوتيوب ريڤانسيد",
      link: "https://t.me/techtouch7/2044",
      category: "modified_apps",
      keywords: ["youtube", "revanced", "يوتيوب", "معدل", "modified"],
      description: "تطبيق يوتيوب ReVanced المحدث",
      featured: true
    },
    {
      id: 136,
      name: "TikTok+",
      nameAr: "تيك توك بلس",
      link: "https://t.me/techtouch7/2045",
      category: "modified_apps",
      keywords: ["tiktok", "+", "تيك توك", "معدل", "modified"],
      description: "تطبيق تيك توك+ المحدث",
      featured: true
    },
    {
      id: 137,
      name: "Instagram Lite",
      nameAr: "انستجرام لايت",
      link: "https://t.me/techtouch7/2046",
      category: "modified_apps",
      keywords: ["instagram", "lite", "انستجرام", "خفيف", "modified"],
      description: "تطبيق انستجرام Lite الخفيف",
      featured: true
    },
    {
      id: 138,
      name: "FaceApp Pro",
      nameAr: "فيس آب برو",
      link: "https://t.me/techtouch7/2047",
      category: "ai_apps",
      keywords: ["faceapp", "pro", "فيس آب", "ذكي", "تعديل صور"],
      description: "تطبيق FaceApp Pro للذكاء الاصطناعي",
      featured: true
    },
    {
      id: 139,
      name: "Lensa AI",
      nameAr: "لينسا ذكاء اصطناعي",
      link: "https://t.me/techtouch7/2048",
      category: "ai_apps",
      keywords: ["lensa", "ai", "لينسا", "ذكاء اصطناعي", "صور"],
      description: "تطبيق Lensa AI لتعديل الصور",
      featured: true
    },
    {
      id: 140,
      name: "Deepfake",
      nameAr: "ديب فيك",
      link: "https://t.me/techtouch7/2049",
      category: "ai_apps",
      keywords: ["deepfake", "ديب فيك", "ذكاء اصطناعي", "ai", "تعديل"],
      description: "تطبيق Deepfake للذكاء الاصطناعي",
      featured: false
    },
    {
      id: 141,
      name: "WhatsApp BAW",
      nameAr: "واتساب بااو",
      link: "https://t.me/techtouch7/2050",
      category: "modified_apps",
      keywords: ["whatsapp", "baw", "واتساب", "معدل", "modified"],
      description: "تطبيق واتساب BAW المحدث",
      featured: true
    },
    {
      id: 142,
      name: "Zoom Pro",
      nameAr: "زوم برو",
      link: "https://t.me/techtouch7/2051",
      category: "productivity",
      keywords: ["zoom", "pro", "زوم", "اجتماعات", "conference"],
      description: "تطبيق Zoom Pro للاجتماعات",
      featured: false
    },
    {
      id: 143,
      name: "Skype",
      nameAr: "سكايب",
      link: "https://t.me/techtouch7/2052",
      category: "productivity",
      keywords: ["skype", "سكايب", "مكالمات", "calls", "دردشة"],
      description: "تطبيق سكايب للمكالمات والدردشة",
      featured: false
    },
    {
      id: 144,
      name: "Discord",
      nameAr: "ديسكورد",
      link: "https://t.me/techtouch7/2053",
      category: "productivity",
      keywords: ["discord", "ديسكورد", "دردشة", "chat", "gaming"],
      description: "تطبيق ديسكورد للمحادثات والألعاب",
      featured: true
    },
    {
      id: 145,
      name: "Signal",
      nameAr: "سيجنال",
      link: "https://t.me/techtouch7/2054",
      category: "productivity",
      keywords: ["signal", "سيجنال", "آمن", "secure", "مكالمات"],
      description: "تطبيق سيجنال للمحادثات الآمنة",
      featured: false
    },
    {
      id: 146,
      name: "Telegram Premium",
      nameAr: "تيليجرام بريميوم",
      link: "https://t.me/techtouch7/2055",
      category: "modified_apps",
      keywords: ["telegram", "premium", "تيليجرام", "مدفوع", "paid"],
      description: "تطبيق تيليجرام Premium المحدث",
      featured: true
    },
    {
      id: 147,
      name: "Facebook Messenger",
      nameAr: "فيسبوك ماسنجر",
      link: "https://t.me/techtouch7/2056",
      category: "modified_apps",
      keywords: ["facebook", "messenger", "فيسبوك", "ماسنجر", "معدل"],
      description: "تطبيق فيسبوك ماسنجر المحدث",
      featured: true
    },
    {
      id: 148,
      name: "Viber",
      nameAr: "فايبر",
      link: "https://t.me/techtouch7/2057",
      category: "productivity",
      keywords: ["viber", "فايبر", "مكالمات", "calls", "رسائل"],
      description: "تطبيق فايبر للمكالمات والرسائل",
      featured: false
    },
    {
      id: 149,
      name: "KakaoTalk",
      nameAr: "كاكاو توك",
      link: "https://t.me/techtouch7/2058",
      category: "productivity",
      keywords: ["kakaotalk", "كاكاو توك", "دردشة", "chat", "رسائل"],
      description: "تطبيق كاكاو توك للدردشة",
      featured: false
    },
    {
      id: 150,
      name: "Line",
      nameAr: "لاين",
      link: "https://t.me/techtouch7/2059",
      category: "productivity",
      keywords: ["line", "لاين", "دردشة", "chat", "رسائل", "استيكر"],
      description: "تطبيق لاين للدردشة والاستيكر",
      featured: false
    },
    {
      id: 151,
      name: "WeChat",
      nameAr: "وي تشات",
      link: "https://t.me/techtouch7/2060",
      category: "productivity",
      keywords: ["wechat", "وي تشات", "دردشة", "chat", "صيني", "chinese"],
      description: "تطبيق وي تشات للصين",
      featured: false
    },
    {
      id: 152,
      name: "QQ",
      nameAr: "كي كيو",
      link: "https://t.me/techtouch7/2061",
      category: "productivity",
      keywords: ["qq", "كي كيو", "دردشة", "chat", "صيني", "chinese"],
      description: "تطبيق QQ للصين",
      featured: false
    },
    {
      id: 153,
      name: "Snap",
      nameAr: "سناب",
      link: "https://t.me/techtouch7/2062",
      category: "productivity",
      keywords: ["snap", "سناب", "مؤقت", "temporary", "صور", "photos"],
      description: "تطبيق سناب للتعارف",
      featured: false
    },
    {
      id: 154,
      name: "Telegram Polaris",
      nameAr: "تيليجرام بولاريس",
      link: "https://t.me/techtouch7/2063",
      category: "modified_apps",
      keywords: ["telegram", "polaris", "تيليجرام", "معدل", "modified"],
      description: "تطبيق تيليجرام Polaris المحدث",
      featured: true
    },
    {
      id: 155,
      name: "Mobdro",
      nameAr: "موبدرو",
      link: "https://t.me/techtouch7/2064",
      category: "iptv",
      keywords: ["mobdro", "موبدرو", "iptv", "بث مباشر", "streaming"],
      description: "تطبيق موبدرو للبث المباشر",
      featured: true
    },
    {
      id: 156,
      name: "Cinema HD",
      nameAr: "سينما إتش دي",
      link: "https://t.me/techtouch7/2065",
      category: "movies",
      keywords: ["cinema hd", "سينما إتش دي", "أفلام", "movies", "hd"],
      description: "تطبيق Cinema HD لمشاهدة الأفلام",
      featured: true
    },
    {
      id: 157,
      name: "TeaTV",
      nameAr: "تياتا في",
      link: "https://t.me/techtouch7/2066",
      category: "movies",
      keywords: ["teatv", "تياتا في", "أفلام", "movies", "streaming"],
      description: "تطبيق TeaTV لمشاهدة الأفلام",
      featured: true
    },
    {
      id: 158,
      name: "CyberFlix TV",
      nameAr: "سايبار فليكس تي في",
      link: "https://t.me/techtouch7/2067",
      category: "movies",
      keywords: ["cyberflix", "سايبار فليكس", "أفلام", "movies", "streaming"],
      description: "تطبيق CyberFlix TV للبث",
      featured: true
    },
    {
      id: 159,
      name: "Titanium TV",
      nameAr: "تيتانيوم تي في",
      link: "https://t.me/techtouch7/2068",
      category: "iptv",
      keywords: ["titanium tv", "تيتانيوم", "iptv", "بث مباشر", "streaming"],
      description: "تطبيق Titanium TV للبث المباشر",
      featured: true
    },
    {
      id: 160,
      name: "Smart YouTube TV",
      nameAr: "سمارت يوتيوب تي في",
      link: "https://t.me/techtouch7/2069",
      category: "modified_apps",
      keywords: ["smart youtube tv", "سمارت يوتيوب", "iptv", "streaming"],
      description: "تطبيق Smart YouTube TV للبث",
      featured: true
    },
    {
      id: 161,
      name: "صورتك أرناها",
      nameAr: "صورتك أرناها",
      link: "https://t.me/techtouch7/2070",
      category: "entertainment",
      keywords: ["صورتك أرناها", "صورتك", "تطبيق", "عربي", "تصوير"],
      description: "تطبيق صورتك أرناها للتصوير",
      featured: false
    },
    {
      id: 162,
      name: "دردشة عربية",
      nameAr: "دردشة عربية",
      link: "https://t.me/techtouch7/2071",
      category: "productivity",
      keywords: ["دردشة عربية", "دردشة", "عربي", "chat", "تواصل"],
      description: "تطبيق الدردشة العربية",
      featured: false
    },
    {
      id: 163,
      name: "واتساب العربي",
      nameAr: "واتساب العربي",
      link: "https://t.me/techtouch7/2072",
      category: "modified_apps",
      keywords: ["واتساب عربي", "whatsapp", "عربي", "معدل", "modified"],
      description: "تطبيق واتساب العربي المحدث",
      featured: true
    },
    {
      id: 164,
      name: "AndroVid Pro",
      nameAr: "أندرو فيد برو",
      link: "https://t.me/techtouch7/2073",
      category: "productivity",
      keywords: ["androvid", "pro", "أندرو فيد", "مونتاج", "video"],
      description: "تطبيق AndroVid Pro لتعديل الفيديو",
      featured: false
    },
    {
      id: 165,
      name: "Quik Video Editor",
      nameAr: "كويك فيديو إديتور",
      link: "https://t.me/techtouch7/2074",
      category: "productivity",
      keywords: ["quik", "video editor", "كويك", "مونتاج", "فيديو"],
      description: "تطبيق Quik لتعديل الفيديو السريع",
      featured: false
    },
    {
      id: 166,
      name: "Funimate",
      nameAr: "فاني مات",
      link: "https://t.me/techtouch7/2075",
      category: "productivity",
      keywords: ["funimate", "فاني مات", "مونتاج", "video", "ريلز"],
      description: "تطبيق Funimate لإنشاء الريلز",
      featured: true
    },
    {
      id: 167,
      name: "VivaVideo",
      nameAr: "فيفا فيديو",
      link: "https://t.me/techtouch7/2076",
      category: "productivity",
      keywords: ["vivavideo", "فيفا فيديو", "مونتاج", "video", "فيديو"],
      description: "تطبيق VivaVideo لتعديل الفيديو",
      featured: true
    },
    {
      id: 168,
      name: "PowerDirector",
      nameAr: "باور دايركتور",
      link: "https://t.me/techtouch7/2077",
      category: "productivity",
      keywords: ["powerdirector", "باور دايركتور", "مونتاج", "professional"],
      description: "تطبيق PowerDirector الاحترافي",
      featured: true
    },
    {
      id: 169,
      name: "FilmoraGo",
      nameAr: "فيلمورا جو",
      link: "https://t.me/techtouch7/2078",
      category: "productivity",
      keywords: ["filmorago", "فيلمورا جو", "مونتاج", "video", "سهل"],
      description: "تطبيق FilmoraGo السهل للمبتدئين",
      featured: true
    },
    {
      id: 170,
      name: "KLITE Media Player",
      nameAr: "كليت ميديا بلاير",
      link: "https://t.me/techtouch7/2079",
      category: "entertainment",
      keywords: ["klite", "media player", "كليت", "مشغل", "فيديو"],
      description: "مشغل كليت للفيديو والصوت",
      featured: false
    },
    {
      id: 171,
      name: "قرآن كريم",
      nameAr: "قرآن كريم",
      link: "https://t.me/techtouch7/2080",
      category: "productivity",
      keywords: ["قرآن", "quran", "اسلام", "islam", "تلاوات", "ديني"],
      description: "تطبيق القرآن الكريم مع التلاوات",
      featured: true
    },
    {
      id: 172,
      name: "أوقات الصلاة",
      nameAr: "أوقات الصلاة",
      link: "https://t.me/techtouch7/2081",
      category: "productivity",
      keywords: ["صلاة", "prayer", "اسلام", "islam", "أوقات", "مواعيد"],
      description: "تطبيق أوقات الصلاة المحدث",
      featured: true
    },
    {
      id: 173,
      name: "القبلة",
      nameAr: "القبلة",
      link: "https://t.me/techtouch7/2082",
      category: "productivity",
      keywords: ["قبلة", "qibla", "اسلام", "islam", "اتجاه", " compass"],
      description: "تطبيق القبلة لتحديد اتجاه الصلاة",
      featured: true
    },
    {
      id: 174,
      name: "إسلام ويب",
      nameAr: "إسلام ويب",
      link: "https://t.me/techtouch7/2083",
      category: "productivity",
      keywords: ["اسلام ويب", "islamweb", "اسلام", "islam", "محتوى", "ديني"],
      description: "تطبيق إسلام ويب للمحتوى الديني",
      featured: false
    },
    {
      id: 175,
      name: "ترف تاكسي",
      nameAr: "ترف تاكسي",
      link: "https://t.me/techtouch7/2084",
      category: "productivity",
      keywords: ["ترف", "tarf", "تاكسي", "taxi", "نقل", "سيارات"],
      description: "تطبيق ترق تاكسي للنقل",
      featured: false
    },
    {
      id: 176,
      name: "طلبات",
      nameAr: "طلبات",
      link: "https://t.me/techtouch7/2085",
      category: "productivity",
      keywords: ["طلبات", "talab", "توصيل", "delivery", "طعام", "food"],
      description: "تطبيق طلبات للطعام والتوصيل",
      featured: true
    },
    {
      id: 177,
      name: "هنقرستيشن",
      nameAr: "هنقرستيشن",
      link: "https://t.me/techtouch7/2086",
      category: "productivity",
      keywords: ["هنقرستيشن", "hungerstation", "توصيل", "delivery", "طعام"],
      description: "تطبيق هنقرستيشن للطعام",
      featured: true
    },
    {
      id: 178,
      name: "اوبر",
      nameAr: "اوبر",
      link: "https://t.me/techtouch7/2087",
      category: "productivity",
      keywords: ["اوبر", "uber", "تاكسي", "taxi", "نقل", "car"],
      description: "تطبيق اوبر للنقل",
      featured: true
    },
    {
      id: 179,
      name: "كريم",
      nameAr: "كريم",
      link: "https://t.me/techtouch7/2088",
      category: "productivity",
      keywords: ["كريم", "careem", "تاكسي", "taxi", "نقل", "car"],
      description: "تطبيق كريم للنقل",
      featured: true
    },
    {
      id: 180,
      name: "أداء",
      nameAr: "أداء",
      link: "https://t.me/techtouch7/2089",
      category: "productivity",
      keywords: ["أداء", "adalah", "دفع", "payment", "حوالة", "money"],
      description: "تطبيق أداء للدفع الإلكتروني",
      featured: false
    },
    {
      id: 181,
      name: "مدى",
      nameAr: "مدى",
      link: "https://t.me/techtouch7/2090",
      category: "productivity",
      keywords: ["مدى", "mada", "دفع", "payment", "بطاقة", "card"],
      description: "تطبيق مدى للدفع الإلكتروني",
      featured: false
    },
    {
      id: 182,
      name: "رتبلي",
      nameAr: "رتبلي",
      link: "https://t.me/techtouch7/2091",
      category: "productivity",
      keywords: ["رتبلي", "rotuby", "مناقصات", "government", "حكومي", "عام"],
      description: "تطبيق رتبلي للمناقصات الحكومية",
      featured: false
    },
    {
      id: 183,
      name: "البنك الأهلي",
      nameAr: "البنك الأهلي",
      link: "https://t.me/techtouch7/2092",
      category: "productivity",
      keywords: ["البنك الأهلي", "الاهلي", "بنوك", "bank", "مالي", "money"],
      description: "تطبيق البنك الأهلي",
      featured: false
    },
    {
      id: 184,
      name: "RAKBANK",
      nameAr: "بنك رأس الخيمة",
      link: "https://t.me/techtouch7/2093",
      category: "productivity",
      keywords: ["rakbank", "بنك", "bank", "مالي", "money", "emirates"],
      description: "تطبيق بنك رأس الخيمة",
      featured: false
    },
    {
      id: 185,
      name: "Emirates NBD",
      nameAr: "الإمارات دبي الوطني",
      link: "https://t.me/techtouch7/2094",
      category: "productivity",
      keywords: ["emirates nbd", "الامارات", "bank", "بنك", "مالي"],
      description: "تطبيق الإمارات دبي الوطني",
      featured: false
    },
    {
      id: 186,
      name: "استيكر عربي",
      nameAr: "استيكر عربي",
      link: "https://t.me/techtouch7/2095",
      category: "entertainment",
      keywords: ["استيكر", "sticker", "عربي", "arabic", "رموز", "expressions"],
      description: "مجموعة استيكر عربي للمحادثات",
      featured: true
    },
    {
      id: 187,
      name: "emoji عربي",
      nameAr: "إيموجي عربي",
      link: "https://t.me/techtouch7/2096",
      category: "entertainment",
      keywords: ["emoji", "إيموجي", "عربي", "arabic", "رموز", "expressions"],
      description: "مجموعة إيموجي عربي",
      featured: true
    },
    {
      id: 188,
      name: "تيك توك عربي",
      nameAr: "تيك توك عربي",
      link: "https://t.me/techtouch7/2097",
      category: "entertainment",
      keywords: ["تيك توك عربي", "tiktok arabic", "فيديو", "video", "عربي"],
      description: "محتوى تيك توك عربي",
      featured: true
    },
    {
      id: 189,
      name: "ريلز عربي",
      nameAr: "ريلز عربي",
      link: "https://t.me/techtouch7/2098",
      category: "entertainment",
      keywords: ["ريلز عربي", "reels arabic", "فيديو", "video", "قصير"],
      description: "ريلز عربي قصير",
      featured: true
    },
    {
      id: 190,
      name: "مصلي",
      nameAr: "مصلي",
      link: "https://t.me/techtouch7/2099",
      category: "productivity",
      keywords: ["مصلي", "masali", "صلاة", "prayer", "اسلام", "islam"],
      description: "تطبيق مصلي للتذكير بالصلاة",
      featured: true
    }
  ]
};

// وظائف مساعدة للبحث
export const searchQueries = {
  sports: {
    keywords: ["رياضة", "football", "soccer", "كرة قدم", "مباريات", "yalla shoot", "kora", "juventus", "live one sports"],
    related_terms: ["athletics", "soccer", "فوتبول", "سبورت", "اتحاد", "فيفا"]
  },
  movies: {
    keywords: ["أفلام", "movies", "مسلسلات", "series", "drama", "دراما", "cinema", "سينما", "الأسطورة", "سينمانا", "شاهد", "شوفاز", "فليكس", "موفي بوكس"],
    related_terms: ["entertainment", "streaming", "بث", "متابعة", "هوليوود", "بوليود"]
  },
  iptv: {
    keywords: ["iptv", "بث مباشر", "live", "تلفزيون", "tv", "streaming", "go tv", "tr box", "klive", "black ultra", "otf tv", "zain live"],
    related_terms: ["بث مباشر", "live streaming", "قنوات", "تلفاز"]
  },
  ai: {
    keywords: ["ذكاء اصطناعي", "ai", "artificial intelligence", "chatgpt", "bard", "lensa", "deepfake", "faceapp pro"],
    related_terms: ["مساعد ذكي", "smart assistant", "تشات بوت", "روبوت"]
  },
  modified_apps: {
    keywords: ["تطبيقات محدثة", "modified", "ذهبي", "gold", "واتساب", "انستجرام", "تيليجرام", "يوتيوب", "تيك توك", "whatsapp gb", "delta", "prisma", "revanced"],
    related_terms: ["تطبيقات معدلة", "modded apps", "بينت", "مفعل"]
  },
  utilities: {
    keywords: ["أدوات", "utilities", "مساعدات", "admin", "فيسبوك", "ماسنجر", "snapchat", "discord", "signal", "skype"],
    related_terms: ["تطبيقات مساعدة", "helper apps", "شبكات اجتماعية"]
  },
  gaming: {
    keywords: ["ألعاب", "games", "pubg", "فري فاير", "wara dijin", "لعب", "gaming"],
    related_terms: ["العاب", "تسلية", "ترفيه", "منافسة"]
  },
  video_editing: {
    keywords: ["مونتاج", "video", "فيديو", "تعديل", "capcut", "inshot", "editing"],
    related_terms: ["إنتاج", "فيلم", "ريلز", "تيك توك"]
  },
  photo_editing: {
    keywords: ["صور", "photo", "فوتوغرافي", "تصوير", "vsco", "lightroom", "picsart", "remini"],
    related_terms: ["فلاتر", "تأثيرات", "كاميرا", "ذكاء اصطناعي"]
  },
  communication: {
    keywords: ["مكالمات", "calls", "رسائل", "messages", "دردشة", "chat", "فايبر", "line", "kakaotalk"],
    related_terms: ["تواصل", "إرسال", "استقبال"]
  },
  privacy: {
    keywords: ["خصوصية", "privacy", "آمان", "secure", "vpn", "1.1.1.1"],
    related_terms: ["حماية", "تشفير", "أمان"]
  },
  productivity: {
    keywords: ["إنتاجية", "productivity", "عمل", "work", "zoom", "meeting"],
    related_terms: ["اجتماعات", "مكتب", "أعمال"]
  },
  new_apps: {
    keywords: ["جديد", "new", "حديث", "latest", "محدث", "updated"],
    related_terms: ["إصدار", "نسخة", "تحديث"]
  },
  trending: {
    keywords: ["رائج", "trending", "شائع", "popular", "مميز", "featured"],
    related_terms: ["الأكثر تحميلاً", "الأكثر شعبية"]
  },
  arabic_apps: {
    keywords: ["عربي", "arabic", "الأسطورة", "سينمانا", "شوفاز", "شاهد", "يلا شوت"],
    related_terms: ["محلي", "دولي", "تطبيقات عربية"]
  }
};