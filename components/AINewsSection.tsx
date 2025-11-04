import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './Icons';

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
  const [aiSettings, setAiSettings] = useState<AISettings | null>(null);

  // تحميل الإعدادات من Netlify CMS
  useEffect(() => {
    loadSettings();
  }, []);

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

  // إذا كان القسم معطلاً، لا تعرض شيئاً
  if (aiSettings && !aiSettings.ai_news_enabled) {
    return null;
  }

  return (
    <div 
      className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/30 rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 hover:shadow-xl hover:border-purple-400/50 transition-all duration-300 cursor-pointer group" 
      onClick={onViewMore}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg group-hover:scale-110 transition-transform">
            <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
              {aiSettings?.ai_news_title || "آخر أخبار الذكاء الاصطناعي"}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-1">
              {aiSettings?.ai_news_description || "اكتشف أحدث الابتكارات والأدوات في عالم الذكاء الاصطناعي"}
            </p>
          </div>
        </div>
        
        {/* سهم للإشارة إلى إمكانية الضغط */}
        <div className="text-purple-400 group-hover:translate-x-2 group-hover:text-purple-300 transition-all">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AINewsSection;
