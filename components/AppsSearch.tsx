import React, { useState } from 'react';
import { SearchIcon } from './Icons';
import { embeddedAppsData } from './EmbeddedData';

const AppsSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // خريطة المرادفات للفئات
  const categorySynonyms: { [key: string]: string[] } = {
    modified: ['معدل', 'معدلة', 'ذهبي', 'ذهبية', 'gold', 'mod', 'plus', 'بلس', 'واتساب', 'whatsapp', 'انستقرام', 'instagram', 'تيك توك', 'tiktok', 'سناب', 'snap'],
    iptv: ['بث', 'قنوات', 'تلفزيون', 'تلفاز', 'iptv', 'live', 'tv', 'channels'],
    movies: ['افلام', 'أفلام', 'مسلسلات', 'مسلسل', 'فيلم', 'سينما', 'مشاهدة', 'movies', 'series', 'cinema', 'سينمانا', 'cinemana', 'شاهد', 'watch'],
    sports: ['رياضة', 'رياضه', 'الرياضية', 'رياضي', 'مباريات', 'مباراة', 'كورة', 'كرة', 'sports', 'match', 'football', 'soccer', 'يلا شوت', 'kora'],
    design: ['تصميم', 'مونتاج', 'تعديل', 'صور', 'فيديو', 'design', 'edit', 'photo', 'video', 'فوتوشوب', 'photoshop'],
    ai: ['ذكاء', 'اصطناعي', 'ai', 'artificial', 'intelligence', 'chatgpt', 'جي بي تي'],
    tools: ['أدوات', 'ادوات', 'تطبيقات', 'عامة', 'tools', 'utilities', 'apps']
  };
  
  // دالة البحث الذكي
  const smartSearch = (query: string) => {
    if (!query.trim()) {
      return [];
    }
    
    const normalizedQuery = query.toLowerCase().trim();
    const results: any[] = [];
    
    // 1. البحث في أسماء التطبيقات مباشرة
    embeddedAppsData.apps.forEach(app => {
      const nameAr = app.name_ar?.toLowerCase() || '';
      const nameEn = app.name_en?.toLowerCase() || '';
      const keywords = [...(app.keywords_ar || []), ...(app.keywords_en || [])].join(' ').toLowerCase();
      
      if (nameAr.includes(normalizedQuery) || nameEn.includes(normalizedQuery) || keywords.includes(normalizedQuery)) {
        if (!results.find(r => r.id === app.id)) {
          results.push(app);
        }
      }
    });
    
    // 2. البحث بالفئات والمرادفات
    Object.keys(categorySynonyms).forEach(categoryId => {
      const synonyms = categorySynonyms[categoryId];
      
      // إذا كان الاستعلام يطابق أي مرادف
      const isMatch = synonyms.some(synonym => 
        normalizedQuery.includes(synonym) || synonym.includes(normalizedQuery)
      );
      
      if (isMatch) {
        // إضافة جميع التطبيقات من هذه الفئة
        embeddedAppsData.apps.forEach(app => {
          if (app.category === categoryId && !results.find(r => r.id === app.id)) {
            results.push(app);
          }
        });
      }
    });
    
    return results;
  };
  
  const filteredApps = smartSearch(searchQuery);
  
  return (
    <div className="animate-fadeIn">
      {/* العنوان */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">🔍 بحث التطبيقات الذكي</h2>
        <p className="text-gray-400 mb-2">ابحث عن أي تطبيق تريده من بين 140 تطبيق</p>
        <p className="text-gray-500 text-sm">
          جرّب: واتساب، سينمانا، رياضة، الأسطورة، تصميم، أفلام
        </p>
      </div>
      
      {/* شريط البحث */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث هنا... (مثال: رياضة، أفلام، واتساب، تصميم)"
            className="w-full pr-12 pl-4 py-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            style={{ direction: 'rtl' }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      {/* أمثلة البحث السريع */}
      {!searchQuery && (
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-gray-400 text-sm mb-3 text-center">اختصارات سريعة:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: '⚽ رياضة', query: 'رياضة' },
              { label: '🎬 أفلام', query: 'أفلام' },
              { label: '🎨 تصميم', query: 'تصميم' },
              { label: '💎 واتساب', query: 'واتساب' },
              { label: '📺 بث مباشر', query: 'iptv' },
              { label: '🤖 ذكاء اصطناعي', query: 'ذكاء' }
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(item.query)}
                className="px-4 py-2 bg-gray-800 hover:bg-red-500 text-white text-sm rounded-lg transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* النتائج */}
      <div className="max-w-4xl mx-auto">
        {searchQuery && (
          <div className="mb-4 text-gray-400 text-center">
            {filteredApps.length === 0 ? (
              <p className="text-lg">لم نجد أي تطبيقات 😢</p>
            ) : (
              <p className="text-lg">
                وجدنا <span className="text-red-400 font-bold">{filteredApps.length}</span> تطبيق 🎉
              </p>
            )}
          </div>
        )}
        
        {filteredApps.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">جرّب البحث عن:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['رياضة', 'أفلام', 'تصميم', 'واتساب', 'سينمانا'].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-3 py-1 bg-gray-700 hover:bg-red-500 text-white text-sm rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {filteredApps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredApps.map((app) => (
              <div key={app.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
                <p className="text-lg">
                  تفضل التطبيق{' '}
                  <a
                    href={app.download_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 font-bold underline decoration-2 underline-offset-2"
                  >
                    {app.name_ar}
                  </a>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* معلومات إضافية */}
      {!searchQuery && (
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center">💡 نصائح للبحث</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>اكتب "رياضة" أو "الرياضية" لعرض جميع تطبيقات الرياضة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>اكتب "أفلام" أو "سينما" لعرض تطبيقات الأفلام</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>اكتب "تصميم" أو "مونتاج" لعرض تطبيقات التصميم</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>ابحث باسم التطبيق مباشرة: "واتساب"، "سينمانا"، "الأسطورة"</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppsSearch;
