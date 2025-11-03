import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ExternalLinkIcon, SparklesIcon } from './Icons';

// واجهة لمحتوى الذكاء الاصطناعي
interface AIContent {
  id: number;
  title: string;
  description: string;
  category: 'ابتكارات' | 'مواقع جديدة' | 'اكتشافات' | 'أدوات';
  link?: string;
  date: string;
  keywords: string[];
  published?: boolean;
  priority?: number;
}

// واجهة لإعدادات الذكاء الاصطناعي
interface AISettings {
  ai_news_enabled: boolean;
  ai_news_title: string;
  ai_news_description: string;
  articles_per_load: number;
  auto_update_hours: number;
  enable_smart_search: boolean;
  enable_category_filter: boolean;
  enable_load_more: boolean;
  welcome_message: string;
  search_sources: string[];
  update_frequency: number;
  max_results: number;
  blocked_keywords: string[];
  preferred_terms: string[];
}

const AINewsSection: React.FC = () => {
  const [displayedContent, setDisplayedContent] = useState<AIContent[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('جميع');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiSettings, setAiSettings] = useState<AISettings | null>(null);

  const categories = [
    { id: 'جميع', name: 'جميع الأخبار', icon: '📰' },
    { id: 'ابتكارات', name: 'ابتكارات', icon: '💡' },
    { id: 'مواقع جديدة', name: 'مواقع جديدة', icon: '🚀' },
    { id: 'اكتشافات', name: 'اكتشافات', icon: '🔬' },
    { id: 'أدوات', name: 'أدوات', icon: '🛠️' }
  ];

  // تحميل الإعدادات والمحتوى
  useEffect(() => {
    loadSettings();
    loadContent('جميع');
  }, []);

  // تحميل الإعدادات من Netlify CMS
  const loadSettings = async () => {
    try {
      const response = await fetch('/data/ai-settings.json');
      if (response.ok) {
        const settings = await response.json();
        setAiSettings(settings);
      }
    } catch (error) {
      console.error('خطأ في تحميل إعدادات الذكاء الاصطناعي:', error);
    }
  };

  // تحميل المحتوى من Netlify CMS
  const loadContent = async (category: string) => {
    setIsLoading(true);
    
    try {
      // تحميل من Netlify CMS
      const response = await fetch('/data/ai-content.json');
      if (!response.ok) {
        throw new Error('فشل في تحميل البيانات');
      }
      
      const allContent: AIContent[] = await response.json();
      const publishedContent = allContent.filter(item => item.published !== false);
      
      let content: AIContent[];
      
      if (category === 'جميع') {
        // ترتيب حسب الأولوية ثم تاريخ
        content = publishedContent
          .sort((a, b) => (b.priority || 0) - (a.priority || 0))
          .slice(0, aiSettings?.articles_per_load || 5);
      } else {
        content = publishedContent
          .filter(item => item.category === category)
          .sort((a, b) => (b.priority || 0) - (a.priority || 0));
      }
      
      setDisplayedContent(content);
    } catch (error) {
      console.error('خطأ في تحميل المحتوى:', error);
      // في حالة الخطأ، استخدم البيانات المحلية كبديل
      const fallbackContent = getFallbackContent(category);
      setDisplayedContent(fallbackContent);
    } finally {
      setIsLoading(false);
    }
  };

  // بيانات بديلة في حالة فشل تحميل البيانات من Netlify CMS
  const getFallbackContent = (category: string): AIContent[] => {
    const fallbackData: AIContent[] = [
      {
        id: 1,
        title: "روبوتات الدردشة بالذكاء الاصطناعي 2024",
        description: "شهدت روبوتات الدردشة المدعمة بالذكاء الاصطناعي تطورات هائلة في 2024، حيث أصبحت أكثر ذكاءً وقدرة على فهم السياق. تشمل التقنيات الجديدة فهم المشاعر وتحليل النية بدقة عالية، مما يجعل المحادثات أكثر طبيعية وفائدة للمستخدمين في مختلف القطاعات التجارية والخدمية.",
        category: "ابتكارات",
        link: "https://yellow.ai/ar/blog/ai-chatbots/",
        date: "2024-12-15",
        keywords: ["chatbot", "روبوت", "دردشة", "ذكاء اصطناعي", "تفاعل"],
        published: true,
        priority: 95
      },
      {
        id: 2,
        title: "تقنيات الحفاظ على اللغات المهددة بالانقراض",
        description: "أطلقت شركة Reese Speecher الأوكرانية تقنية جديدة لاستنساخ الأصوات باستخدام الذكاء الاصطناعي، مما يساعد في الحفاظ على اللغات المهددة بالانقراض. هذه التقنية تستخدم خوارزميات متقدمة لمحاكاة الأصوات الطبيعية وضمان استمرارية التراث اللغوي للأجيال القادمة بطريقة رقمية مبتكرة.",
        category: "اكتشافات",
        link: "https://www.alarabiya.net/technology/ai/2024/12/18/",
        date: "2024-12-18",
        keywords: ["لغات", "انقراض", "استنساخ", "أصوات", "تراث"],
        published: true,
        priority: 90
      },
      {
        id: 3,
        title: "Meta AI: الريادة في ابتكارات الذكاء الاصطناعي",
        description: "واصلت شركة Meta قيادة الابتكارات في مجال الذكاء الاصطناعي خلال 2024 بإطلاق مجموعة جديدة من الأدوات والتقنيات. تشمل هذه الابتكارات تحسين خوارزميات التعلم الآلي وتطوير نماذج أكثر كفاءة في معالجة اللغة الطبيعية، مما يفتح آفاقاً جديدة في مجال التواصل والتسويق الرقمي.",
        category: "ابتكارات",
        link: "https://solutions.fixed.global/ar/news/top-ai-innovations-2024-ar",
        date: "2024-12-10",
        keywords: ["Meta", "ابتكارات", "تعلم آلي", "لغة طبيعية", "تواصل"],
        published: true,
        priority: 88
      },
      {
        id: 4,
        title: "GitHub Copilot: مساعد المبرمجين الذكي",
        description: "أصبح GitHub Copilot من أهم الأدوات للمبرمجين في 2024، حيث يوفر اقتراحات ذكية للكود ويجبر عملية التطوير بشكل كبير. يستخدم هذا الأداة تقنيات التعلم الآلي المتقدمة لفهم سياق الكود وتقديم اقتراحات دقيقة ومناسبة، مما يقلل الوقت المطلوب لكتابة التطبيقات والبرامج.",
        category: "أدوات",
        link: "https://github.com/features/copilot",
        date: "2024-11-28",
        keywords: ["GitHub", "Copilot", "برمجة", "كود", "مطورين"],
        published: true,
        priority: 85
      },
      {
        id: 5,
        title: "شريحة Neuralink للدماغ البشري",
        description: "حققت شركة Neuralink إنجازاً تاريخياً في 2024 بتطوير شريحة دماغية متقدمة تتيح التواصل المباشر بين الدماغ والحاسوب. هذه التقنية الثورية تفتح آفاقاً جديدة لعلاج الأمراض العصبية وتساعد الأشخاص ذوي الإعاقة في التحكم في الأجهزة الرقمية بإشارات الدماغ، مما يمثل نقلة نوعية في مجال الطب التقني.",
        category: "اكتشافات",
        link: "https://neuralink.com/",
        date: "2024-12-01",
        keywords: ["Neuralink", "دماغ", "شريحة", "طب", "إعاقة"],
        published: true,
        priority: 92
      }
    ];

    if (category === 'جميع') {
      return fallbackData;
    } else {
      return fallbackData.filter(item => item.category === category);
    }
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setSearchQuery('');
    loadContent(category);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      loadContent(currentCategory);
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(async () => {
      try {
        const response = await fetch('/data/ai-content.json');
        if (!response.ok) {
          throw new Error('فشل في تحميل البيانات');
        }
        
        const allContent: AIContent[] = await response.json();
        const publishedContent = allContent.filter(item => item.published !== false);
        
        const normalizedQuery = searchQuery.toLowerCase().trim();
        const searchResults = publishedContent.filter(content => 
          content.title.toLowerCase().includes(normalizedQuery) ||
          content.description.toLowerCase().includes(normalizedQuery) ||
          content.keywords.some(keyword => keyword.toLowerCase().includes(normalizedQuery))
        );
        
        setDisplayedContent(searchResults.slice(0, aiSettings?.max_results || 5));
      } catch (error) {
        console.error('خطأ في البحث:', error);
        // استخدام البحث المحلي كبديل
        const localResults = getFallbackContent('جميع').filter(content =>
          content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          content.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setDisplayedContent(localResults);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const loadMore = () => {
    setIsLoading(true);
    
    setTimeout(async () => {
      try {
        const response = await fetch('/data/ai-content.json');
        if (!response.ok) {
          throw new Error('فشل في تحميل البيانات');
        }
        
        const allContent: AIContent[] = await response.json();
        const publishedContent = allContent.filter(item => item.published !== false);
        
        let additionalContent: AIContent[];
        
        if (currentCategory === 'جميع') {
          additionalContent = publishedContent
            .sort((a, b) => (b.priority || 0) - (a.priority || 0))
            .slice(displayedContent.length, displayedContent.length + (aiSettings?.articles_per_load || 5));
        } else {
          additionalContent = publishedContent
            .filter(item => item.category === currentCategory)
            .sort((a, b) => (b.priority || 0) - (a.priority || 0))
            .slice(displayedContent.length, displayedContent.length + (aiSettings?.articles_per_load || 5));
        }
        
        setDisplayedContent([...displayedContent, ...additionalContent]);
      } catch (error) {
        console.error('خطأ في تحميل المزيد:', error);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // إذا كان القسم معطلاً، لا تعرض شيئاً
  if (!aiSettings?.ai_news_enabled) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      {/* العنوان الرئيسي */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
          <SparklesIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {aiSettings?.ai_news_title || "آخر أخبار الذكاء الاصطناعي"}
          </h2>
          <p className="text-gray-600 text-sm">
            {aiSettings?.ai_news_description || "اكتشف أحدث الابتكارات والأدوات والمواقع الجديدة في عالم الذكاء الاصطناعي"}
          </p>
        </div>
      </div>

      {/* شريط البحث */}
      {aiSettings?.enable_smart_search && (
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="ابحث في أخبار الذكاء الاصطناعي..."
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              dir="rtl"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            بحث
          </button>
        </div>
      )}

      {/* الفئات */}
      {aiSettings?.enable_category_filter && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                currentCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-sm">{category.icon}</span>
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* مؤشر التحميل */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          <span className="mr-3 text-gray-600">جاري التحميل...</span>
        </div>
      )}

      {/* المحتوى */}
      {!isLoading && displayedContent.length > 0 && (
        <div className="space-y-4 mb-6">
          {displayedContent.map((content) => (
            <div
              key={content.id}
              className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all hover:border-purple-300"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  {/* عنوان المنشور */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 leading-relaxed">
                    {content.title}
                  </h3>
                  
                  {/* وصف مختصر */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {content.description}
                  </p>
                  
                  {/* معلومات إضافية */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      📅 {formatDate(content.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      🏷️ {content.category}
                    </span>
                  </div>
                </div>
                
                {/* رابط المحتوى */}
                {content.link && (
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    زيارة الموقع
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* زر تحميل المزيد */}
      {aiSettings?.enable_load_more && !isLoading && displayedContent.length > 0 && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all font-medium"
          >
            <ChevronDownIcon className="w-5 h-5" />
            المزيد من الأخبار
          </button>
        </div>
      )}

      {/* حالة فارغة */}
      {!isLoading && displayedContent.length === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🤖</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">لا توجد نتائج</h3>
          <p className="text-gray-500">جرب البحث بكلمات مختلفة أو اختر فئة أخرى</p>
        </div>
      )}
    </div>
  );
};

export default AINewsSection;