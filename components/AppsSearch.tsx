import React, { useState, useEffect } from 'react';
import { SearchIcon, GridIcon, SparklesIcon } from './Icons';
import AppCard, { App } from './AppCard';
import SearchFilters from './SearchFilters';
import { embeddedAppsData } from './EmbeddedData';

interface Category {
  name: string;
  nameEn: string;
  icon: string;
  color: string;
}

interface AppsData {
  categories: { [key: string]: Category };
  apps: App[];
}

const AppsSearch: React.FC = () => {
  const [appsData, setAppsData] = useState<AppsData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredApps, setFilteredApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // تحميل قاعدة البيانات مع معالجة أفضل للأخطاء
  useEffect(() => {
    const loadApps = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('🔍 جاري تحميل قاعدة البيانات...');
        
        try {
          console.log('📡 محاولة تحميل ملف JSON...');
          const response = await fetch('/data/apps_database.json');
          console.log('📡 حالة الاستجابة:', response.status, response.statusText);
          
          if (response.ok) {
            const contentType = response.headers.get('content-type');
            console.log('📄 نوع المحتوى:', contentType);
            
            // فحص نوع المحتوى قبل محاولة تحليل JSON
            if (!contentType || !contentType.includes('application/json')) {
              console.warn('⚠️ نوع المحتوى غير JSON:', contentType);
              throw new Error(`نوع المحتوى غير صحيح: ${contentType}`);
            }
            
            const responseText = await response.text();
            console.log('📝 طول النص المستجيب:', responseText.length, 'حرف');
            
            // فحص إذا كان النص يبدأ بـ "<" مما يعني HTML
            if (responseText.trim().startsWith('<') || responseText.includes('<!DOCTYPE')) {
              console.error('❌ تم استلام HTML بدلاً من JSON');
              throw new Error('تم استلام صفحة HTML بدلاً من ملف JSON. تحقق من إعدادات الخادم.');
            }
            
            const data: AppsData = JSON.parse(responseText);
            console.log('✅ تم تحميل البيانات بنجاح:', data.apps.length, 'تطبيق');
            
            // التحقق من صحة البيانات
            if (!data.apps || !Array.isArray(data.apps) || data.apps.length === 0) {
              throw new Error('ملف JSON تالف أو فارغ');
            }
            
            setAppsData(data);
            setFilteredApps(data.apps);
            setIsLoading(false);
            console.log('🎉 تم تحميل جميع البيانات بنجاح!');
            return;
          } else {
            console.warn('⚠️ استجابة HTTP غير ناجحة:', response.status);
            throw new Error(`خطأ HTTP: ${response.status}`);
          }
          
        } catch (fetchError) {
          console.log('⚠️ فشل تحميل ملف JSON:', fetchError.message);
          console.log('🔄 سيتم استخدام البيانات المدمجة كحل احتياطي');
        }
        
        // استخدام البيانات المدمجة كحل احتياطي
        console.log('🔄 استخدام البيانات المدمجة كحل احتياطي');
        console.log('📊 عدد التطبيقات في البيانات المدمجة:', embeddedAppsData.apps.length);
        
        setAppsData(embeddedAppsData);
        setFilteredApps(embeddedAppsData.apps);
        setIsLoading(false);
        
      } catch (err) {
        console.error('❌ خطأ في تحميل البيانات:', err);
        
        // حتى لو فشل كل شيء، استخدم البيانات المدمجة
        console.log('🆘 استخدام البيانات المدمجة كحل طوارئ');
        setAppsData(embeddedAppsData);
        setFilteredApps(embeddedAppsData.apps);
        setIsLoading(false);
      }
    };

    loadApps();
  }, []);

  // البحث الذكي المحسن
  const performAISearch = (query: string, apps: App[], category: string): App[] => {
    if (!query && category === 'all') {
      return apps;
    }

    let results = apps;

    // فلترة حسب الفئة أولاً
    if (category !== 'all') {
      results = results.filter(app => app.category === category);
    }

    // إذا لم يكن هناك استعلام بحث، نعيد النتائج المفلترة حسب الفئة
    if (!query) {
      return results;
    }

    const normalizedQuery = query.toLowerCase().trim();
    const searchTerms = normalizedQuery.split(' ').filter(term => term.length > 0);
    
    // جمع جميع التطبيقات المطابقة في مجموعة واحدة
    const allMatchingApps = new Set<App>();
    
    results.forEach(app => {
      let isMatch = false;
      let matchScore = 0;
      
      // 1. البحث بالاسم (أعلى درجة مطابقة)
      const appNameLower = app.name.toLowerCase();
      const appNameArLower = app.nameAr.toLowerCase();
      const queryLower = query.toLowerCase();
      
      // مطابقة الاسم بالكامل أو الجزئية
      if (appNameLower === queryLower || appNameArLower === queryLower) {
        isMatch = true;
        matchScore += 100; // أعلى درجة مطابقة
      } else if (appNameLower.includes(queryLower) || appNameArLower.includes(queryLower)) {
        isMatch = true;
        matchScore += 80; // درجة عالية
      }
      
      // البحث بكلمات منفردة
      for (const term of searchTerms) {
        if (appNameLower.includes(term) || appNameArLower.includes(term)) {
          isMatch = true;
          matchScore += 60;
        }
      }
      
      // 2. البحث بالكلمات المفتاحية
      app.keywords.forEach(keyword => {
        const keywordLower = keyword.toLowerCase();
        if (keywordLower.includes(queryLower) || queryLower.includes(keywordLower)) {
          isMatch = true;
          matchScore += 50;
        }
        
        // البحث بكلمات منفردة في الكلمات المفتاحية
        for (const term of searchTerms) {
          if (keywordLower.includes(term) || term.includes(keywordLower)) {
            isMatch = true;
            matchScore += 40;
          }
        }
      });
      
      // 3. البحث في الوصف
      if (app.description.toLowerCase().includes(queryLower)) {
        isMatch = true;
        matchScore += 30;
      }
      
      // 4. البحث الذكي حسب السياق
      const contextualMatch = checkContextualMatch(normalizedQuery, app);
      if (contextualMatch) {
        isMatch = true;
        matchScore += 25;
      }
      
      // إضافة التطبيق إذا كان متطابقاً
      if (isMatch) {
        allMatchingApps.add(app);
      }
    });
    
    // تحويل إلى مصفوفة وترتيب حسب درجة المطابقة والميزات
    const finalResults = Array.from(allMatchingApps);
    
    return finalResults.sort((a, b) => {
      // المميزة أولاً
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // ثم حسب درجة المطابقة (يمكن حسابها لاحقاً إذا لزم الأمر)
      return 0;
    });
  };
  
  // البحث الذكي حسب السياق
  const checkContextualMatch = (query: string, app: App): boolean => {
    const queryLower = query.toLowerCase();
    
    // البحث بالرياضة
    if (queryLower.includes('رياضة') || queryLower.includes('كورة') || queryLower.includes('مباريات') || 
        queryLower.includes('football') || queryLower.includes('soccer') || queryLower.includes('sport')) {
      return app.keywords.some(k => k.toLowerCase().includes('sport') || k.toLowerCase().includes('football') || 
                                   k.toLowerCase().includes('soccer') || k.toLowerCase().includes('كرة'));
    }
    
    // البحث بالأفلام والمسلسلات
    if (queryLower.includes('أفلام') || queryLower.includes('مسلسلات') || queryLower.includes('سينما') ||
        queryLower.includes('movies') || queryLower.includes('series') || queryLower.includes('cinema')) {
      return app.category === 'movies' || app.keywords.some(k => k.toLowerCase().includes('movie') || 
                                                                  k.toLowerCase().includes('cinema') ||
                                                                  k.toLowerCase().includes('أفلام'));
    }
    
    // البحث بالذكاء الاصطناعي
    if (queryLower.includes('ذكاء') || queryLower.includes('ai') || queryLower.includes('ذكي')) {
      return app.category === 'ai_apps' || app.keywords.some(k => k.toLowerCase().includes('ai') || 
                                                                   k.toLowerCase().includes('ذكاء'));
    }
    
    // البحث بالتطبيقات المحدثة
    if (queryLower.includes('محدثة') || queryLower.includes('معدلة') || queryLower.includes('ذهبي') ||
        queryLower.includes('modified') || queryLower.includes('gold')) {
      return app.category === 'modified_apps' || app.keywords.some(k => k.toLowerCase().includes('modified') || 
                                                                          k.toLowerCase().includes('gold') ||
                                                                          k.toLowerCase().includes('محدثة'));
    }
    
    // البحث بالبث
    if (queryLower.includes('بث') || queryLower.includes('iptv') || queryLower.includes('تلفزيون') ||
        queryLower.includes('live') || queryLower.includes('streaming')) {
      return app.category === 'iptv' || app.keywords.some(k => k.toLowerCase().includes('iptv') || 
                                                               k.toLowerCase().includes('live') ||
                                                               k.toLowerCase().includes('streaming'));
    }
    
    // البحث بتطبيقات الياسين
    if (queryLower.includes('ياسين') || queryLower.includes('yassin')) {
      return app.keywords.some(k => k.toLowerCase().includes('ياسين') || k.toLowerCase().includes('yassin'));
    }
    
    return false;
  };

  // تطبيق البحث والفلترة
  useEffect(() => {
    if (appsData) {
      const results = performAISearch(searchQuery, appsData.apps, selectedCategory);
      setFilteredApps(results);
    }
  }, [searchQuery, selectedCategory, appsData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const handleAppSelect = (app: App) => {
    window.open(app.link, '_blank');
  };

  if (isLoading) {
    return (
      <div className="animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-8">بحث التطبيقات بالذكاء الاصطناعي</h2>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  if (error && appsData === null) {
    return (
      <div className="animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-8">بحث التطبيقات بالذكاء الاصطناعي</h2>
        <div className="text-center py-20">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-400 mb-2">خطأ في تحميل البيانات</h3>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            تم تحميل البيانات الأساسية بنجاح. يمكنك استخدام البحث في التطبيقات المتاحة.
          </p>
          <div className="text-sm text-gray-500 mb-6">
            عدد التطبيقات المتاحة: {embeddedAppsData.apps.length} تطبيق
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <SparklesIcon className="w-8 h-8 text-red-400 animate-pulse" />
          <h2 className="text-3xl font-bold">بحث التطبيقات بالذكاء الاصطناعي</h2>
        </div>
        <p className="text-gray-400 text-lg">
          ابحث عن أي تطبيق تريده بذكاء اصطناعي متقدم - 90 تطبيق متاح
        </p>
      </div>

      {/* شريط البحث */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="ابحث عن التطبيق... (مثال: واتساب، أفلام، رياضة، ذكاء اصطناعي)"
            className="w-full pr-12 pl-4 py-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
            style={{ direction: 'rtl' }}
          />
        </div>
      </div>

      {/* الفلترة */}
      {appsData && (
        <SearchFilters
          categories={appsData.categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onClearFilters={handleClearFilters}
        />
      )}

      {/* عدد النتائج */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-400">
          <GridIcon className="w-5 h-5" />
          <span className="font-semibold">
            {filteredApps.length} {filteredApps.length === 1 ? 'تطبيق' : 'تطبيقات'}
          </span>
        </div>
        
        {(searchQuery || selectedCategory !== 'all') && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-red-400 hover:text-red-300 transition-colors duration-300"
          >
            مسح جميع الفلترة
          </button>
        )}
      </div>

      {/* النتائج */}
      {filteredApps.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-400 mb-2">لم نجد أي تطبيقات مطابقة</p>
          <p className="text-gray-500">جرب كلمات بحث مختلفة أو امسح الفلترة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map(app => (
            <AppCard
              key={app.id}
              app={app}
              category={appsData!.categories[app.category]}
              onSelect={() => handleAppSelect(app)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppsSearch;
