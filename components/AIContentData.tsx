// قاعدة بيانات محتوى الذكاء الاصطناعي
export interface AIContent {
  id: number;
  title: string;
  description: string;
  category: 'ابتكارات' | 'مواقع جديدة' | 'اكتشافات' | 'أدوات';
  link?: string;
  date: string;
  keywords: string[];
}

export const aiContentData: AIContent[] = [
  {
    id: 1,
    title: "روبوتات الدردشة بالذكاء الاصطناعي 2024",
    description: "شهدت روبوتات الدردشة المدعمة بالذكاء الاصطناعي تطورات هائلة في 2024، حيث أصبحت أكثر ذكاءً وقدرة على فهم السياق. تشمل التقنيات الجديدة فهم المشاعر وتحليل النية بدقة عالية، مما يجعل المحادثات أكثر طبيعية وفائدة للمستخدمين في مختلف القطاعات التجارية والخدمية.",
    category: "ابتكارات",
    link: "https://yellow.ai/ar/blog/ai-chatbots/",
    date: "2024-12-15",
    keywords: ["chatbot", "روبوت", "دردشة", "ذكاء اصطناعي", "تفاعل"]
  },
  {
    id: 2,
    title: "تقنيات الحفاظ على اللغات المهددة بالانقراض",
    description: "أطلقت شركة Reese Speecher الأوكرانية تقنية جديدة لاستنساخ الأصوات باستخدام الذكاء الاصطناعي، مما يساعد في الحفاظ على اللغات المهددة بالانقراض. هذه التقنية تستخدم خوارزميات متقدمة لمحاكاة الأصوات الطبيعية وضمان استمرارية التراث اللغوي للأجيال القادمة بطريقة رقمية مبتكرة.",
    category: "اكتشافات",
    link: "https://www.alarabiya.net/technology/ai/2024/12/18/",
    date: "2024-12-18",
    keywords: ["لغات", "انقراض", "استنساخ", "أصوات", "تراث"]
  },
  {
    id: 3,
    title: "Meta AI: الريادة في ابتكارات الذكاء الاصطناعي",
    description: "واصلت شركة Meta قيادة الابتكارات في مجال الذكاء الاصطناعي خلال 2024 بإطلاق مجموعة جديدة من الأدوات والتقنيات. تشمل هذه الابتكارات تحسين خوارزميات التعلم الآلي وتطوير نماذج أكثر كفاءة في معالجة اللغة الطبيعية، مما يفتح آفاقاً جديدة في مجال التواصل والتسويق الرقمي.",
    category: "ابتكارات",
    link: "https://solutions.fixed.global/ar/news/top-ai-innovations-2024-ar",
    date: "2024-12-10",
    keywords: ["Meta", "ابتكارات", "تعلم آلي", "لغة طبيعية", "تواصل"]
  },
  {
    id: 4,
    title: "GitHub Copilot: مساعد المبرمجين الذكي",
    description: "أصبح GitHub Copilot من أهم الأدوات للمبرمجين في 2024، حيث يوفر اقتراحات ذكية للكود ويجبر عملية التطوير بشكل كبير. يستخدم هذا الأداة تقنيات التعلم الآلي المتقدمة لفهم سياق الكود وتقديم اقتراحات دقيقة ومناسبة، مما يقلل الوقت المطلوب لكتابة التطبيقات والبرامج.",
    category: "أدوات",
    link: "https://github.com/features/copilot",
    date: "2024-11-28",
    keywords: ["GitHub", "Copilot", "برمجة", "كود", "مطورين"]
  },
  {
    id: 5,
    title: "شريحة Neuralink للدماغ البشري",
    description: "حققت شركة Neuralink إنجازاً تاريخياً في 2024 بتطوير شريحة دماغية متقدمة تتيح التواصل المباشر بين الدماغ والحاسوب. هذه التقنية الثورية تفتح آفاقاً جديدة لعلاج الأمراض العصبية وتساعد الأشخاص ذوي الإعاقة في التحكم في الأجهزة الرقمية بإشارات الدماغ، مما يمثل نقلة نوعية في مجال الطب التقني.",
    category: "اكتشافات",
    link: "https://neuralink.com/",
    date: "2024-12-01",
    keywords: ["Neuralink", "دماغ", "شريحة", "طب", "إعاقة"]
  },
  {
    id: 6,
    title: "OpenAI Sora: إنتاج مقاطع فيديو بالذكاء الاصطناعي",
    description: "أطلقت OpenAI أداة Sora التي تمكن من إنشاء مقاطع فيديو عالية الجودة من النصوص البسيطة. تستخدم هذه التقنية نماذج التعلم العميق لتحويل الوصف النصي إلى مقاطع فيديو واقعية ومتحركة، مما يوفر إمكانيات هائلة للمبدعين وصناع المحتوى في مختلف المجالات من التعليم إلى التسويق.",
    category: "مواقع جديدة",
    link: "https://openai.com/sora",
    date: "2024-12-20",
    keywords: ["Sora", "فيديو", "نص", "OpenAI", "إنتاج"]
  },
  {
    id: 7,
    title: "Google Gemini: النموذج اللغوي المتقدم",
    description: "قدمت Google نموذج Gemini الجديد الذي يتفوق على ChatGPT في عدة مهام، خاصة في مجال البحث والتحليل. يتميز هذا النموذج بقدرته على معالجة النصوص والصور والصوت في آن واحد، مما يوفر تجربة شاملة للمستخدمين في البحث والتعلم وإنشاء المحتوى بطرق أكثر ذكاءً ودقة.",
    category: "ابتكارات",
    link: "https://ai.google.dev/gemini-api",
    date: "2024-12-05",
    keywords: ["Google", "Gemini", "نموذج", "لغوي", "بحث"]
  },
  {
    id: 8,
    title: "أداة Replika للدعم العاطفي",
    description: "طورت شركة Replika روبوت دردشة ذكي متخصص في الدعم العاطفي وتقديم الرفقة النفسية. يستخدم هذا الروبوت تقنيات متقدمة في علم النفس الحاسوبي لفهم مشاعر المستخدمين وتقديم الدعم المناسب، مما يجعله شريكاً رقمياً مفيداً للأشخاص الذين يبحثون عن الدعم النفسي والتواصل.",
    category: "أدوات",
    link: "https://replika.ai/",
    date: "2024-11-15",
    keywords: ["Replika", "عاطفي", "دعم", "رفقة", "نفسي"]
  },
  {
    id: 9,
    title: "DeepSeek: النموذج الصيني المفتوح المصدر",
    description: "أطلقت الصين نموذج DeepSeek الضخم المفتوح المصدر بتريليون معلمة، مما يثير المنافسة في مجال الذكاء الاصطناعي العالمي. يتميز هذا النموذج بكفاءته العالية في معالجة النصوص والتعامل مع المهام المعقدة، وكونه مفتوح المصدر يسهل على الباحثين والمطورين استخدامه وتطويره.",
    category: "اكتشافات",
    link: "https://www.deepseek.com/",
    date: "2024-12-22",
    keywords: ["DeepSeek", "صيني", "مفتوح", "مليار", "معلمة"]
  },
  {
    id: 10,
    title: "Canva AI: تصميم جرافيك بالذكاء الاصطناعي",
    description: "طورت Canva أدوات ذكاء اصطناعي متقدمة لتصميم الجرافيك تتيح للمستخدمين إنشاء صور ومحتوى مرئي عالي الجودة بسهولة. تستخدم هذه الأداة تقنيات التعلم الآلي لإنشاء تصاميم تلقائية بناءً على تفضيلات المستخدم، مما يوفر وقت كبير للمصممين والمسوقين في إنتاج المحتوى البصري.",
    category: "أدوات",
    link: "https://www.canva.com/ai",
    date: "2024-11-20",
    keywords: ["Canva", "تصميم", "جرافيك", "صور", "مرئي"]
  }
];

// دوال مساعدة للتصنيف والبحث
export const getAIContentByCategory = (category: string) => {
  return aiContentData.filter(content => content.category === category);
};

export const searchAIContent = (query: string) => {
  const normalizedQuery = query.toLowerCase().trim();
  return aiContentData.filter(content => 
    content.title.toLowerCase().includes(normalizedQuery) ||
    content.description.toLowerCase().includes(normalizedQuery) ||
    content.keywords.some(keyword => keyword.toLowerCase().includes(normalizedQuery))
  );
};

export const getRandomAIContent = (count: number = 5) => {
  const shuffled = [...aiContentData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};