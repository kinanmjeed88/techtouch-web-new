import React, { useState, useEffect } from 'react';
import { SearchIcon, GridIcon, SparklesIcon } from './Icons';
import AppCard, { App } from './AppCard';
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
  const [filteredApps, setFilteredApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllApps, setShowAllApps] = useState(false);

  // تحويل البيانات من البنية الجديدة إلى البنية القديمة
  const convertNewFormatToOld = (rawData: any): AppsData => {
    // تحويل التصنيفات من array إلى object
    const categories: { [key: string]: Category } = {};
    const categoryColors: { [key: string]: string } = {
      modified: '#FFD700',
      iptv: '#FF6B6B',
      movies: '#4ECDC4',
      sports: '#45B7D1',
      design: '#96CEB4',
      ai: '#FFEAA7',
      tools: '#DDA0DD'
    };

    if (rawData.categories && Array.isArray(rawData.categories)) {
      rawData.categories.forEach((cat: any) => {
        categories[cat.id] = {
          name: cat.name_ar,
          nameEn: cat.name_en,
          icon: cat.icon,
          color: categoryColors[cat.id] || '#808080'
        };
      });
    }

    // تحويل التطبيقات
    const apps: App[] = rawData.apps?.map((app: any) => ({
      id: app.id,
      name: app.name_en || app.name_ar,
      nameAr: app.name_ar,
      link: app.download_link || app.link,
      category: app.category,
      keywords: [...(app.keywords_ar || []), ...(app.keywords_en || [])],
      description: app.description || `تطبيق ${app.name_ar}`,
      featured: false
    })) || [];

    return { categories, apps };
  };

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
            
            const rawData = JSON.parse(responseText);
            console.log('✅ تم تحميل البيانات الخام بنجاح');
            
            // تحويل البيانات إلى البنية القديمة
            const data: AppsData = convertNewFormatToOld(rawData);
            console.log('✅ تم تحويل البيانات بنجاح:', data.apps.length, 'تطبيق');
            
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
          
        } catch (fetchError: any) {
          console.log('⚠️ فشل تحميل ملف JSON:', fetchError.message);
          console.log('🔄 سيتم استخدام البيانات المدمجة كحل احتياطي');
        }
        
        // استخدام البيانات المدمجة كحل احتياطي
        console.log('🔄 استخدام البيانات المدمجة كحل احتياطي');
        const fallbackData = convertNewFormatToOld(embeddedAppsData);
        console.log('📊 عدد التطبيقات في البيانات المدمجة:', fallbackData.apps.length);
        
        setAppsData(fallbackData);
        setFilteredApps(fallbackData.apps);
        setIsLoading(false);
        
      } catch (err) {
        console.error('❌ خطأ في تحميل البيانات:', err);
        
        // حتى لو فشل كل شيء، استخدم البيانات المدمجة
        console.log('🆘 استخدام البيانات المدمجة كحل طوارئ');
        const fallbackData = convertNewFormatToOld(embeddedAppsData);
        setAppsData(fallbackData);
        setFilteredApps(fallbackData.apps);
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
      
      // 1. البحث بالاسم (أعلى درجة مطابقة) مع دعم أسماء متنوعة
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
      
      // البحث بالأسطورة والإسطورة - دعم جميع الصيغ
      if ((queryLower.includes('أسطورة') || queryLower.includes('إسطورة')) && 
          (appNameLower.includes('أسطورة') || appNameArLower.includes('أسطورة'))) {
        isMatch = true;
        matchScore += 90; // درجة عالية جداً للأسطورة
      }
      
      // البحث بسينمانا وجميع صيغ السينما
      if ((queryLower.includes('سينمانا') || queryLower.includes('سينما') || queryLower.includes('cine')) && 
          (appNameLower.includes('cinema') || appNameArLower.includes('سينما') || 
           app.keywords.some(k => k.toLowerCase().includes('cinema') || k.toLowerCase().includes('سينمانا')))) {
        isMatch = true;
        matchScore += 85; // درجة عالية جداً للسينما
      }
      
      // البحث بكلمات منفردة مع تحسين الحساسية
      for (const term of searchTerms) {
        if (appNameLower.includes(term) || appNameArLower.includes(term)) {
          isMatch = true;
          matchScore += 60;
        }
        
        // البحث بكلمات مشابهة ومتقاربة
        const similarTerms = getSimilarTerms(term);
        similarTerms.forEach(similarTerm => {
          if (appNameLower.includes(similarTerm) || appNameArLower.includes(similarTerm)) {
            isMatch = true;
            matchScore += 45;
          }
        });
      }
      
      // 2. البحث بالكلمات المفتاحية مع مصطلحات ذكية محسنة
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
          
          // البحث بالكلمات المشابهة في الكلمات المفتاحية
          const similarTerms = getSimilarTerms(term);
          similarTerms.forEach(similarTerm => {
            if (keywordLower.includes(similarTerm) || similarTerm.includes(keywordLower)) {
              isMatch = true;
              matchScore += 35;
            }
          });
        }
        
        // بحث إضافي للأسطورة والإسطورة
        if ((queryLower.includes('أسطورة') || queryLower.includes('إسطورة')) && 
            (keywordLower.includes('أسطورة') || keywordLower.includes('قناة') || keywordLower.includes('موقع'))) {
          isMatch = true;
          matchScore += 55;
        }
        
        // بحث إضافي لسينمانا
        if ((queryLower.includes('سينمانا') || queryLower.includes('سينما')) && 
            (keywordLower.includes('cinema') || keywordLower.includes('cine') || keywordLower.includes('movie'))) {
          isMatch = true;
          matchScore += 55;
        }
        
        // بحث إضافي للواتساب
        if ((queryLower.includes('واتساب') || queryLower.includes('whatsapp')) && 
            (keywordLower.includes('whatsapp') || keywordLower.includes('واتساب') || keywordLower.includes('message'))) {
          isMatch = true;
          matchScore += 55;
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
  
  // الحصول على الكلمات المشابهة والتقريبية
  const getSimilarTerms = (term: string): string[] => {
    const termLower = term.toLowerCase();
    const similarTerms: string[] = [];

    // الكلمات المشابهة للأسطورة
    if (termLower.includes('أسطورة') || termLower.includes('إسطورة')) {
      similarTerms.push('الأسطورة', 'الإسطورة', 'قناة الأسطورة', 'موقع الأسطورة');
    }

    // الكلمات المشابهة للسينما
    if (termLower.includes('سينما') || termLower.includes('cine')) {
      similarTerms.push('سينمانا', 'CineBooo', 'أفلام', 'مسلسلات');
    }

    // الكلمات المشابهة للواتساب
    if (termLower.includes('واتساب') || termLower.includes('whatsapp')) {
      similarTerms.push('WhatsApp GB', 'WhatsApp Plus', 'واتساب الذهبي', 'واتساب بلس');
    }

    // الكلمات المشابهة للرياضة
    if (termLower.includes('رياضة') || termLower.includes('football')) {
      similarTerms.push('كورة', 'مباريات', 'sport', 'soccer');
    }

    // الكلمات المشابهة للألعاب
    if (termLower.includes('لعبة') || termLower.includes('game')) {
      similarTerms.push('فايف', 'فيفا', 'PUBG', 'Free Fire');
    }

    return [...new Set(similarTerms)];
  };

  // البحث الذكي المحسن حسب السياق مع دعم الأسماء المتنوعة
  const checkContextualMatch = (query: string, app: App): boolean => {
    const queryLower = query.toLowerCase();
    
    // البحث بالرياضة - يغطي جميع صيغ البحث
    if (queryLower.includes('رياضة') || queryLower.includes('كورة') || queryLower.includes('مباريات') || 
        queryLower.includes('football') || queryLower.includes('soccer') || queryLower.includes('sport') ||
        queryLower.includes('بري') || queryLower.includes('football')) {
      return app.keywords.some(k => k.toLowerCase().includes('sport') || k.toLowerCase().includes('football') || 
                                   k.toLowerCase().includes('soccer') || k.toLowerCase().includes('كرة') ||
                                   k.toLowerCase().includes('رياضة'));
    }
    
    // البحث بالأفلام والمسلسلات - يشمل سينمانا وجميع المصطلحات
    if (queryLower.includes('أفلام') || queryLower.includes('مسلسلات') || queryLower.includes('سينما') ||
        queryLower.includes('سينمانا') || queryLower.includes('cine') || queryLower.includes('cinema') ||
        queryLower.includes('movie') || queryLower.includes('series')) {
      return app.category === 'movies' || 
             app.keywords.some(k => k.toLowerCase().includes('movie') || 
                                   k.toLowerCase().includes('cinema') ||
                                   k.toLowerCase().includes('أفلام') ||
                                   k.toLowerCase().includes('سينمانا') ||
                                   k.toLowerCase().includes('cine'));
    }
    
    // البحث بالذكاء الاصطناعي
    if (queryLower.includes('ذكاء') || queryLower.includes('ai') || queryLower.includes('ذكي') ||
        queryLower.includes('artificial') || queryLower.includes('machine')) {
      return app.category === 'ai_apps' || app.keywords.some(k => k.toLowerCase().includes('ai') || 
                                                                   k.toLowerCase().includes('ذكاء') ||
                                                                   k.toLowerCase().includes('ذكاء اصطناعي'));
    }
    
    // البحث بالتطبيقات المحدثة - يغطي جميع الصيغ
    if (queryLower.includes('محدثة') || queryLower.includes('معدلة') || queryLower.includes('ذهبي') ||
        queryLower.includes('modified') || queryLower.includes('gold') || queryLower.includes('plus') ||
        queryLower.includes('بريميوم') || queryLower.includes('بلك')) {
      return app.category === 'modified_apps' || app.keywords.some(k => k.toLowerCase().includes('modified') || 
                                                                          k.toLowerCase().includes('gold') ||
                                                                          k.toLowerCase().includes('محدثة') ||
                                                                          k.toLowerCase().includes('بلك') ||
                                                                          k.toLowerCase().includes('plus'));
    }
    
    // البحث بالبث - يشمل IPTV والبث المباشر
    if (queryLower.includes('بث') || queryLower.includes('iptv') || queryLower.includes('تلفزيون') ||
        queryLower.includes('live') || queryLower.includes('streaming') || queryLower.includes('tv') ||
        queryLower.includes('قناة')) {
      return app.category === 'iptv' || app.keywords.some(k => k.toLowerCase().includes('iptv') || 
                                                               k.toLowerCase().includes('live') ||
                                                               k.toLowerCase().includes('streaming') ||
                                                               k.toLowerCase().includes('بث'));
    }
    
    // البحث بالأسطورة/الإسطورة - جميع الصيغ والكتابات
    if (queryLower.includes('أسطورة') || queryLower.includes('إسطورة') || queryLower.includes('الأسطورة') || 
        queryLower.includes('الأسطورة') || queryLower.includes('قناة الأسطورة') || queryLower.includes('موقع الأسطورة')) {
      return app.keywords.some(k => k.toLowerCase().includes('أسطورة') || 
                                   k.toLowerCase().includes('قناة الأسطورة') ||
                                   k.toLowerCase().includes('موقع الأسطورة'));
    }
    
    // البحث بتطبيقات الياسين
    if (queryLower.includes('ياسين') || queryLower.includes('yassin')) {
      return app.keywords.some(k => k.toLowerCase().includes('ياسين') || k.toLowerCase().includes('yassin'));
    }
    
    // البحث بالألعاب - يشمل جميع أنواع الألعاب
    if (queryLower.includes('لعبة') || queryLower.includes('game') || queryLower.includes('فايف') ||
        queryLower.includes('فيفا') || queryLower.includes('pubg') || queryLower.includes('free fire')) {
      return app.keywords.some(k => k.toLowerCase().includes('game') || 
                                   k.toLowerCase().includes('لعبة') ||
                                   k.toLowerCase().includes('فايف') ||
                                   k.toLowerCase().includes('فيفا') ||
                                   k.toLowerCase().includes('pubg'));
    }
    
    // البحث باليوتيوب والتطبيقات المشابهة
    if (queryLower.includes('يوتيوب') || queryLower.includes('youtube') || queryLower.includes('فيديو') ||
        queryLower.includes('video') || queryLower.includes('مشاهدة')) {
      return app.keywords.some(k => k.toLowerCase().includes('youtube') || 
                                   k.toLowerCase().includes('فيديو') ||
                                   k.toLowerCase().includes('video'));
    }
    
    return false;
  };

  // تطبيق البحث الذكي
  useEffect(() => {
    if (appsData) {
      const results = performAISearch(searchQuery, appsData.apps);
      setFilteredApps(results);
    }
  }, [searchQuery, showAllApps, appsData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowAllApps(false);
  };

  const handleShowAllApps = () => {
    setShowAllApps(true);
    setSearchQuery('');
  };

  // اقتراحات البحث الذكية
  const getSearchSuggestions = (query: string): string[] => {
    const suggestions: string[] = [];
    const queryLower = query.toLowerCase();

    // أسماء متنوعة للأسطورة/الإسطورة
    if (queryLower.includes('أسطورة') || queryLower.includes('إسطورة') || queryLower.includes('الأسطورة') || queryLower.includes('الإسطورة')) {
      suggestions.push('الأسطورة', 'الإسطورة', 'قناه الأسطورة', 'موقع الأسطورة');
    }

    // سينمانا ومصطلحات الأفلام
    if (queryLower.includes('سينمانا') || queryLower.includes('cine') || queryLower.includes('سينما')) {
      suggestions.push('سينمانا', 'CineBooo', 'أفلام', 'مسلسلات', 'Netflix', 'WatchBox');
    }

    // واتساب ومتنوعاته
    if (queryLower.includes('واتساب') || queryLower.includes('whatsapp')) {
      suggestions.push('WhatsApp GB', 'WhatsApp Plus', 'واتساب الذهبي', 'واتساب بلس');
    }

    // اليوتيوب
    if (queryLower.includes('يوتيوب') || queryLower.includes('youtube')) {
      suggestions.push('YouTube Premium', 'YouTube Music', 'YouTube Vanced', 'يوتيوب البلس');
    }

    // الألعاب
    if (queryLower.includes('لعبة') || queryLower.includes('game') || queryLower.includes('فايف')) {
      suggestions.push('PUBG Mobile', 'Free Fire', 'Call of Duty', 'FIFA Mobile', 'فايف ستايت');
    }

    return [...new Set(suggestions)];
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
        <p className="text-gray-500 text-sm mt-2">
          البحث الذكي يدعم الأسماء المختلفة: الأسطورة، الإسطورة، سينمانا، والمزيد
        </p>
      </div>

      {/* شريط البحث المحسن */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto mb-6">
          <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="ابحث عن التطبيق... (مثال: الأسطورة، سينمانا، واتساب، أفلام، رياضة)"
            className="w-full pr-12 pl-4 py-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
            style={{ direction: 'rtl' }}
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* زر عرض جميع التطبيقات */}
        <div className="text-center">
          <button
            onClick={handleShowAllApps}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 text-sm"
          >
            عرض جميع التطبيقات ({appsData?.apps.length || 0})
          </button>
        </div>

        {/* اقتراحات البحث */}
        {searchQuery && (
          <div className="max-w-2xl mx-auto mt-4">
            <div className="text-sm text-gray-400 mb-2">هل تقصد:</div>
            <div className="flex flex-wrap gap-2">
              {getSearchSuggestions(searchQuery).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-3 py-1 bg-gray-700 hover:bg-red-500 text-white text-xs rounded-full transition-colors duration-300"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* عدد النتائج */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-400">
          <GridIcon className="w-5 h-5" />
          <span className="font-semibold">
            {filteredApps.length} {filteredApps.length === 1 ? 'تطبيق' : 'تطبيقات'}
          </span>
          {searchQuery && (
            <span className="text-sm text-gray-500">
              نتائج البحث عن: "{searchQuery}"
            </span>
          )}
        </div>
        
        {(searchQuery || showAllApps) && (
          <button
            onClick={handleClearSearch}
            className="text-sm text-red-400 hover:text-red-300 transition-colors duration-300"
          >
            مسح البحث
          </button>
        )}
      </div>

      {/* النتائج */}
      {filteredApps.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-400 mb-2">لم نجد أي تطبيقات مطابقة</p>
          <p className="text-gray-500 mb-4">جرب كلمات بحث مختلفة مثل: الأسطورة، سينمانا، واتساب بلس</p>
          <div className="text-sm text-gray-600">
            <p className="mb-2">اقتراحات للبحث:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['الأسطورة', 'سينمانا', 'واتساب', 'يوتيوب', 'أفلام', 'رياضة', 'ألعاب'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-3 py-1 bg-gray-700 hover:bg-red-500 text-white text-xs rounded-full transition-colors duration-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
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
