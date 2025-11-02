import React, { useState, useEffect } from 'react';
import { SearchIcon, GridIcon, SparklesIcon } from './Icons';
import AppCard, { App } from './AppCard';
import SearchFilters from './SearchFilters';

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

  // تحميل قاعدة البيانات
  useEffect(() => {
    const loadApps = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/apps_database.json');
        if (!response.ok) {
          throw new Error('فشل تحميل قاعدة البيانات');
        }
        const data: AppsData = await response.json();
        setAppsData(data);
        setFilteredApps(data.apps);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'حدث خطأ غير معروف');
        setIsLoading(false);
      }
    };

    loadApps();
  }, []);

  // البحث الذكي
  const performAISearch = (query: string, apps: App[], category: string): App[] => {
    if (!query && category === 'all') {
      return apps;
    }

    let results = apps;

    // فلترة حسب الفئة
    if (category !== 'all') {
      results = results.filter(app => app.category === category);
    }

    // إذا لم يكن هناك استعلام بحث، نعيد النتائج المفلترة حسب الفئة
    if (!query) {
      return results;
    }

    const normalizedQuery = query.toLowerCase().trim();
    
    // 1. البحث بالاسم الدقيق
    const exactMatch = results.filter(
      app =>
        app.name.toLowerCase() === normalizedQuery ||
        app.nameAr.includes(query) ||
        query.includes(app.nameAr)
    );

    // 2. البحث الجزئي بالاسم
    const partialMatch = results.filter(
      app =>
        app.name.toLowerCase().includes(normalizedQuery) ||
        app.nameAr.includes(query) ||
        app.description.includes(query)
    );

    // 3. البحث بالكلمات المفتاحية
    const keywordMatches = results.filter(app =>
      app.keywords.some(
        keyword =>
          keyword.includes(normalizedQuery) ||
          normalizedQuery.includes(keyword) ||
          keyword.includes(query)
      )
    );

    // 4. البحث الذكي حسب سياق الاستعلام
    const contextualMatches = results.filter(app => {
      // البحث بمصطلحات شائعة
      if (normalizedQuery.includes('رياضة') || normalizedQuery.includes('كورة') || normalizedQuery.includes('مباريات')) {
        return app.keywords.some(k => k.includes('sport') || k.includes('football') || k.includes('soccer'));
      }
      if (normalizedQuery.includes('أفلام') || normalizedQuery.includes('مسلسلات') || normalizedQuery.includes('سينما')) {
        return app.category === 'movies' || app.keywords.some(k => k.includes('movie') || k.includes('cinema'));
      }
      if (normalizedQuery.includes('ذكاء') || normalizedQuery.includes('ai') || normalizedQuery.includes('ذكي')) {
        return app.category === 'ai_apps';
      }
      if (normalizedQuery.includes('محدثة') || normalizedQuery.includes('معدلة') || normalizedQuery.includes('ذهبي')) {
        return app.category === 'modified_apps';
      }
      if (normalizedQuery.includes('بث') || normalizedQuery.includes('iptv') || normalizedQuery.includes('تلفزيون')) {
        return app.category === 'iptv';
      }
      return false;
    });

    // دمج النتائج وإزالة التكرارات
    const allResults = [...exactMatch, ...partialMatch, ...keywordMatches, ...contextualMatches];
    const uniqueResults = Array.from(new Set(allResults.map(app => app.id))).map(
      id => allResults.find(app => app.id === id)!
    );

    // ترتيب النتائج: المميزة أولاً
    return uniqueResults.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
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

  if (error) {
    return (
      <div className="animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-8">بحث التطبيقات بالذكاء الاصطناعي</h2>
        <div className="text-center py-20">
          <p className="text-red-500 text-xl">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
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
