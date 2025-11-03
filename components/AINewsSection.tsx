import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './Icons';

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
}

interface AINewsSectionProps {
  onViewMore?: () => void;
}

const AINewsSection: React.FC<AINewsSectionProps> = ({ onViewMore }) => {
  const [displayedContent, setDisplayedContent] = useState<AIContent[]>([]);
  const [aiSettings, setAiSettings] = useState<AISettings | null>(null);

  // تحميل الإعدادات والمحتوى
  useEffect(() => {
    loadSettings();
    loadContent();
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
  const loadContent = async () => {
    try {
      const response = await fetch('/data/ai-content.json');
      if (!response.ok) {
        throw new Error('فشل في تحميل البيانات');
      }
      
      const allContent: AIContent[] = await response.json();
      const publishedContent = allContent.filter(item => item.published !== false);
      
      // أخذ أول 3 عناصر فقط للمعاينة
      const content = publishedContent
        .sort((a, b) => (b.priority || 0) - (a.priority || 0))
        .slice(0, 3);
      
      setDisplayedContent(content);
    } catch (error) {
      console.error('خطأ في تحميل المحتوى:', error);
      // في حالة الخطأ، استخدم البيانات المحلية كبديل
      const fallbackContent = getFallbackContent();
      setDisplayedContent(fallbackContent);
    }
  };

  // بيانات بديلة في حالة فشل تحميل البيانات من Netlify CMS
  const getFallbackContent = (): AIContent[] => {
    return [
      {
        id: 1,
        title: "روبوتات الدردشة بالذكاء الاصطناعي 2024",
        description: "شهدت روبوتات الدردشة المدعمة بالذكاء الاصطناعي تطورات هائلة في 2024",
        category: "ابتكارات",
        link: "https://yellow.ai/ar/blog/ai-chatbots/",
        date: "2024-12-15",
        keywords: ["chatbot", "روبوت"],
        published: true,
        priority: 95
      },
      {
        id: 2,
        title: "تقنيات الحفاظ على اللغات المهددة بالانقراض",
        description: "أطلقت شركة Reese Speecher تقنية جديدة لاستنساخ الأصوات باستخدام الذكاء الاصطناعي",
        category: "اكتشافات",
        link: "https://www.alarabiya.net/technology/ai/2024/12/18/",
        date: "2024-12-18",
        keywords: ["لغات", "انقراض"],
        published: true,
        priority: 90
      },
      {
        id: 3,
        title: "Meta AI: الريادة في ابتكارات الذكاء الاصطناعي",
        description: "واصلت شركة Meta قيادة الابتكارات في مجال الذكاء الاصطناعي خلال 2024",
        category: "ابتكارات",
        link: "https://solutions.fixed.global/ar/news/top-ai-innovations-2024-ar",
        date: "2024-12-10",
        keywords: ["Meta", "ابتكارات"],
        published: true,
        priority: 88
      }
    ];
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
  if (aiSettings && !aiSettings.ai_news_enabled) {
    return null;
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-lg p-3 sm:p-4 lg:p-6 mb-6 sm:mb-8 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group" 
      onClick={onViewMore}
    >
      {/* العنوان الرئيسي */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg group-hover:scale-110 transition-transform">
            <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
              {aiSettings?.ai_news_title || "آخر أخبار الذكاء الاصطناعي"}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              اضغط لعرض جميع الأخبار والابتكارات
            </p>
          </div>
        </div>
        {/* سهم للإشارة إلى إمكانية الضغط */}
        <div className="text-purple-500 group-hover:translate-x-2 transition-transform">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>

      {/* معاينة سريعة للمحتوى */}
      {displayedContent.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {displayedContent.map((content) => (
            <div
              key={content.id}
              className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3 sm:p-4 group-hover:border-purple-400 transition-all"
            >
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xl">{
                  content.category === 'ابتكارات' ? '💡' :
                  content.category === 'مواقع جديدة' ? '🚀' :
                  content.category === 'اكتشافات' ? '🔬' : '🛠️'
                }</span>
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-2 flex-1">
                  {content.title}
                </h3>
              </div>
              <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                {content.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded">{content.category}</span>
                <span>📅 {formatDate(content.date)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AINewsSection;
