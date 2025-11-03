import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import AnnouncementBar from './components/AnnouncementBar';
import PostDetail from './components/PostDetail';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import PostCard from './components/PostCard';
import Pagination from './components/Pagination';
import SkeletonLoader from './components/SkeletonLoader';
import AITools from './components/AITools';
import AINewsSection from './components/AINewsSection';
import ProfileModal from './components/ProfileModal';
import type { Category, Post, SiteSettings, Profile } from './types';

interface AppData {
  posts: Post[];
  logoUrl: string;
  siteName: string;
  announcementText: string;
  announcementLink?: string;
  announcementLabel: string;
  announcementBgColor: string;
  announcementTextColor?: string;
  colors?: SiteSettings['colors'];
  socials?: SiteSettings['socials'];
  profile?: Profile;
}

const POSTS_PER_PAGE = 6;

const App: React.FC = () => {
  const [appData, setAppData] = useState<AppData | null>(null);
  const [categories, setCategories] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentView, setCurrentView] = useState<'home' | 'postDetail' | 'aiTools'>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // وظيفة مساعدة لفحص صحة JSON
  const validateJSON = (data: any, fileName: string, requiredFields: string[] = []): boolean => {
    // فحص أساسي للـ JSON
    if (!data || typeof data !== 'object') {
      console.warn(`⚠️ ${fileName}: البيانات ليست object صالح`);
      return false;
    }

    // فحص الحقول المطلوبة
    for (const field of requiredFields) {
      if (!(field in data)) {
        console.warn(`⚠️ ${fileName}: الحقل المطلوب "${field}" غير موجود`);
        return false;
      }
    }

    return true;
  };

  // وظيفة مساعدة لطلب بيانات مع timeout ومعالجة الأخطاء
  const fetchWithTimeout = async (url: string, timeout = 10000): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
        }
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`انتهت مهلة تحميل ${url} (${timeout}ms)`);
      }
      throw error;
    }
  };

  // وظيفة مساعدة لتحميل وتحليل ملف JSON مع معالجة الأخطاء الشاملة
  async function loadJSONFile<T>(
    url: string, 
    fileName: string, 
    requiredFields: string[] = [],
    defaultValue: T,
    timeout = 10000
  ): Promise<{ data: T; hasError: boolean; error?: string }> {
    try {
      console.log(`🔄 تحميل ${fileName}...`);
      
      const response = await fetchWithTimeout(url, timeout);
      
      // فحص حالة الاستجابة
      if (!response.ok) {
        const errorMsg = `${fileName}: HTTP ${response.status} - ${response.statusText}`;
        console.error(`❌ ${errorMsg}`);
        return { data: defaultValue, hasError: true, error: errorMsg };
      }

      // فحص نوع المحتوى
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const errorMsg = `${fileName}: نوع المحتوى غير صحيح (${contentType})`;
        console.warn(`⚠️ ${errorMsg}`);
        return { data: defaultValue, hasError: true, error: errorMsg };
      }

      // تحليل JSON
      let jsonData: T;
      try {
        const text = await response.text();
        if (!text.trim()) {
          const errorMsg = `${fileName}: الملف فارغ`;
          console.warn(`⚠️ ${errorMsg}`);
          return { data: defaultValue, hasError: true, error: errorMsg };
        }
        
        jsonData = JSON.parse(text);
        console.log(`✅ تم تحميل ${fileName} بنجاح`);
      } catch (parseError) {
        const errorMsg = `${fileName}: خطأ في تحليل JSON - ${parseError}`;
        console.error(`❌ ${errorMsg}`);
        return { data: defaultValue, hasError: true, error: errorMsg };
      }

      // فحص صحة البيانات
      if (!validateJSON(jsonData, fileName, requiredFields)) {
        const errorMsg = `${fileName}: البيانات غير صالحة`;
        console.warn(`⚠️ ${errorMsg}`);
        return { data: defaultValue, hasError: true, error: errorMsg };
      }

      return { data: jsonData, hasError: false };
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : `خطأ غير معروف في ${fileName}`;
      console.error(`❌ ${errorMsg}`);
      return { data: defaultValue, hasError: true, error: errorMsg };
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('📡 بدء تحميل البيانات...');
        
        const timestamp = new Date().getTime();
        
        // تحميل البيانات مع timeout ومعالجة أخطاء منفصلة
        const [
          settingsResult,
          postsResult, 
          categoriesResult,
          profileResult
        ] = await Promise.all([
          loadJSONFile(
            `/settings.json?v=${timestamp}`,
            'إعدادات الموقع',
            ['identity', 'colors', 'socials'],
            {
              identity: {
                logoUrl: '',
                siteName: 'techtouch تقنية',
                announcementText: 'أهلا بكم في موقع techtouch',
                announcementLink: 'https://t.me/techtouch7',
                announcementLabel: 'إعلان',
                announcementBgColor: '#1f2937',
                announcementTextColor: '#FFFFFF'
              },
              colors: {
                header: '#1f2937',
                card: 'rgba(31, 41, 55, 0.5)',
                primary: '#ef4444',
                primaryHover: '#ef4444CC',
                primaryFocus: '#ef4444B3',
                siteName: '#FFFFFF',
                cardTitle: '#FFFFFF',
                cardDescription: '#D1D5DB'
              },
              socials: {
                telegram: 'https://t.me/techtouch7'
              }
            }
          ),
          loadJSONFile(
            `/posts.json?v=${timestamp}`,
            'المقالات',
            ['posts'],
            { posts: [] }
          ),
          loadJSONFile(
            `/categories.json?v=${timestamp}`,
            'التصنيفات',
            ['categories'],
            { categories: [] }
          ),
          loadJSONFile(
            `/profile.json?v=${timestamp}`,
            'الملف الشخصي',
            [],
            {
              name: 'كنان الصائغ',
              bio: 'مطور ويب متخصص في التقنية',
              avatar: '',
              email: '',
              website: '',
              social: {}
            },
            5000 // timeout أقصر للملف الشخصي
          )
        ]);

        // جمع الأخطاء
        const allErrors = [
          settingsResult.hasError ? settingsResult.error : null,
          postsResult.hasError ? postsResult.error : null,
          categoriesResult.hasError ? categoriesResult.error : null,
          profileResult.hasError ? profileResult.error : null
        ].filter(Boolean);

        if (allErrors.length > 0) {
          console.warn('⚠️ بعض الملفات فشل تحميلها:', allErrors);
        }

        // استخدام البيانات المحملة أو الافتراضية
        const settingsData = settingsResult.data;
        const postsData = postsResult.data;
        const categoriesData = categoriesResult.data;
        const profileData = profileResult.data;

        // استخراج البيانات من الإعدادات
        const identity = settingsData.identity || {};
        const colors = settingsData.colors;
        const socials = settingsData.socials;

        // التحقق من صحة البيانات الأساسية
        const posts = Array.isArray(postsData.posts) ? postsData.posts : [];
        const categories = Array.isArray(categoriesData.categories) ? categoriesData.categories : [];

        // إعداد بيانات التطبيق
        setAppData({
          posts: posts.map((post: any) => ({
            ...post,
            // التأكد من وجود الحقول المطلوبة
            title: post.title || 'مقال بدون عنوان',
            description: post.description || 'لا توجد وصف متاح',
            content: post.content || '',
            slug: post.slug || `post-${post.id || Date.now()}`,
            category: post.category || 'عام'
          })),
          logoUrl: identity.logoUrl || '',
          siteName: identity.siteName || 'techtouch تقنية',
          announcementText: identity.announcementText || 'أهلا بكم في موقع techtouch',
          announcementLink: identity.announcementLink || 'https://t.me/techtouch7',
          announcementLabel: identity.announcementLabel || 'إعلان',
          announcementBgColor: identity.announcementBgColor || '#1f2937',
          announcementTextColor: identity.announcementTextColor || '#FFFFFF',
          colors: colors || {
            header: '#1f2937',
            card: 'rgba(31, 41, 55, 0.5)',
            primary: '#ef4444'
          },
          socials: socials || { telegram: 'https://t.me/techtouch7' },
          profile: profileData || {
            name: 'كنان الصائغ',
            bio: 'مطور ويب متخصص في التقنية'
          }
        });

        // إعداد التصنيفات
        setCategories(categories.map((cat: any) => ({
          ...cat,
          title: cat.title || 'تصنيف بدون اسم',
          id: cat.id || `cat-${Date.now()}`
        })));

        // تطبيق الألوان المخصصة
        if (colors) {
          try {
            const root = document.documentElement;
            const primaryColor = colors.primary || '#ef4444';
            
            root.style.setProperty('--color-header-bg', colors.header || '#1f2937');
            root.style.setProperty('--color-card-bg', colors.card || 'rgba(31, 41, 55, 0.5)');
            root.style.setProperty('--color-primary', primaryColor);
            root.style.setProperty('--color-primary-hover', `${primaryColor}CC`);
            root.style.setProperty('--color-primary-focus', `${primaryColor}B3`);
            root.style.setProperty('--color-site-name', colors.siteName || '#FFFFFF');
            root.style.setProperty('--color-card-title', colors.cardTitle || '#FFFFFF');
            root.style.setProperty('--color-card-description', colors.cardDescription || '#D1D5DB');
            
            console.log('🎨 تم تطبيق الألوان المخصصة بنجاح');
          } catch (colorError) {
            console.warn('⚠️ فشل في تطبيق الألوان:', colorError);
          }
        }

        // تقرير النتائج
        const successCount = [settingsResult, postsResult, categoriesResult, profileResult]
          .filter(result => !result.hasError).length;
        
        if (successCount === 4) {
          console.log('🎉 تم تحميل جميع البيانات بنجاح!');
        } else {
          console.log(`📊 تم تحميل ${successCount}/4 ملفات بنجاح`);
        }

        // تحديد رسالة الخطأ إذا كانت هناك أخطاء خطيرة
        if (allErrors.length > 0 && (allErrors.length >= 3 || postsResult.hasError)) {
          setError('فشل في تحميل بعض البيانات الأساسية. سيتم عرض البيانات المتاحة.');
        }

      } catch (err) {
        console.error('❌ خطأ عام في تحميل البيانات:', err);
        
        // في حالة خطأ عام، استخدم بيانات افتراضية شاملة
        console.log('🔄 استخدام بيانات افتراضية شاملة...');
        
        setAppData({
          posts: [
            {
              id: 1,
              title: 'مرحبا بكم في موقع techtouch',
              description: 'موقع متخصص في التقنية والبرمجة',
              content: '<p>هذا محتوى تجريبي. سيتم تحميل المحتوى الحقيقي قريباً.</p>',
              slug: 'welcome-post',
              category: 'عام',
              date: new Date().toISOString(),
              tags: ['ترحيب'],
              image: ''
            }
          ],
          logoUrl: '',
          siteName: 'techtouch تقنية',
          announcementText: 'أهلا بكم في موقع techtouch - موقعكم الأول للتقنية',
          announcementLink: 'https://t.me/techtouch7',
          announcementLabel: 'تواصل معنا',
          announcementBgColor: '#1f2937',
          announcementTextColor: '#FFFFFF',
          colors: {
            header: '#1f2937',
            card: 'rgba(31, 41, 55, 0.5)',
            primary: '#ef4444',
            primaryHover: '#ef4444CC',
            primaryFocus: '#ef4444B3',
            siteName: '#FFFFFF',
            cardTitle: '#FFFFFF',
            cardDescription: '#D1D5DB'
          },
          socials: {
            telegram: 'https://t.me/techtouch7',
            github: '',
            twitter: '',
            linkedin: ''
          },
          profile: {
            name: 'كنان الصائغ',
            bio: 'مطور ويب متخصص في التقنيات الحديثة مثل React, TypeScript, و Node.js. أساعد في بناء تطبيقات ويب مبتكرة وحلول تقنية متقدمة.',
            avatar: '',
            email: 'info@techtouch.com',
            website: 'https://techtouch.com',
            social: {
              telegram: 'https://t.me/techtouch7',
              github: '',
              twitter: '',
              linkedin: ''
            }
          }
        });
        setCategories([
          { id: 'general', title: 'عام' },
          { id: 'programming', title: 'برمجة' },
          { id: 'technology', title: 'تقنية' },
          { id: 'tutorials', title: 'دروس' }
        ]);
        
        setError('فشل في تحميل البيانات. يتم عرض بيانات تجريبية.');
        
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const handleLocationChange = () => {
      if (!appData) return;

      const path = window.location.pathname;
      const postMatch = path.match(/^\/post\/(\d+)\/(.*)$/);

      if (postMatch) {
        const postId = parseInt(postMatch[1], 10);
        const post = appData.posts.find(p => p.id === postId);
        if (post) {
          if (selectedPost?.id !== post.id) {
            setSelectedPost(post);
          }
          setCurrentView('postDetail');
        } else {
          // Post not found, go home
          window.history.replaceState({}, '', '/');
          setSelectedPost(null);
          setCurrentView('home');
        }
      } else if (path === '/ai-tools') {
        setSelectedPost(null);
        setCurrentView('aiTools');
      } else {
        setSelectedPost(null);
        setCurrentView('home');
      }
    };

    // Initial load check
    if(appData) {
      handleLocationChange();
    }

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [appData, selectedPost?.id]);

  const handleSelectPost = (post: Post) => {
    const newPath = `/post/${post.id}/${post.slug}`;
    window.history.pushState({ postId: post.id }, post.title, newPath);
    setSelectedPost(post);
    setCurrentView('postDetail');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    window.history.pushState({}, '', '/');
    setSelectedPost(null);
    setCurrentView('home');
  };
  
  const handleGoToAITools = () => {
    window.history.pushState({}, '', '/ai-tools');
    setSelectedPost(null);
    setCurrentView('aiTools');
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (category: Category | 'all') => {
    setActiveCategory(category);
    setCurrentPage(1);
  };
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  
  const categoryTitleMap = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat.id] = cat.title;
      return acc;
    }, {} as Record<string, string>);
  }, [categories]);

  const filteredPosts = (appData?.posts || [])
    .filter(post => activeCategory === 'all' || post.category === activeCategory)
    .filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  
  const renderHomeView = () => (
    <div>
      {/* مستطيل آخر أخبار الذكاء الاصطناعي */}
      <AINewsSection />
      
      <CategoryTabs />
      
      {loading ? <SkeletonLoader /> : filteredPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post, index) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onSelect={handleSelectPost}
                categoryTitle={categoryTitleMap[post.category] || post.category}
                index={index}
              />
            ))}
          </div>
          <Pagination 
            totalPosts={filteredPosts.length}
            postsPerPage={POSTS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-64 bg-gray-800/50 rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-400">لا توجد نتائج</h3>
            <p className="text-gray-500 mt-2">حاول تغيير فلتر البحث أو التصنيف.</p>
          </div>
        </div>
      )}
    </div>
  );

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500 text-2xl">حدث خطأ: {error}</div>;
  }

  if (loading && !appData) {
    return (
       <div className="bg-gray-900 min-h-screen text-white">
        <div className="container mx-auto px-4 py-8">
          <SkeletonLoader />
        </div>
      </div>
    );
  }
  
  if (!appData) return null; // Return null while waiting for routing effect after data load

  const CategoryTabs = () => {
    const activeCategoryTitle = useMemo(() => {
        if (activeCategory === 'all') return 'الكل';
        return categoryTitleMap[activeCategory] || 'التصنيفات';
    }, [activeCategory, categoryTitleMap]);

    const handleCategorySelect = (category: Category | 'all') => {
        handleFilterChange(category);
        setIsCategoryMenuOpen(false);
    };
    
    const ChevronDownIcon = () => (
        <svg className={`w-5 h-5 transition-transform duration-300 ${isCategoryMenuOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );

    return (
        <div className="relative mb-8">
            <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-700 text-white rounded-lg transition-colors duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 ring-primary"
                aria-haspopup="true"
                aria-expanded={isCategoryMenuOpen}
            >
                <span className="text-lg font-medium">التصنيفات: {activeCategoryTitle}</span>
                <ChevronDownIcon />
            </button>

            {isCategoryMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-full bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10 animate-fadeIn">
                    <ul className="py-1 max-h-60 overflow-y-auto">
                        <li>
                            <button
                                onClick={() => handleCategorySelect('all')}
                                className={`w-full text-right px-4 py-2 text-lg font-medium transition-colors duration-200 ${
                                    activeCategory === 'all'
                                        ? 'text-red-400 bg-gray-800'
                                        : 'text-gray-300 hover:bg-gray-600 hover:text-white'
                                }`}
                            >
                                الكل
                            </button>
                        </li>
                        {categories.map((cat) => (
                            <li key={cat.id}>
                                <button
                                    onClick={() => handleCategorySelect(cat.id)}
                                    className={`w-full text-right px-4 py-2 text-lg font-medium transition-colors duration-200 whitespace-nowrap ${
                                        activeCategory === cat.id
                                            ? 'text-red-400 bg-gray-800'
                                            : 'text-gray-300 hover:bg-gray-600 hover:text-white'
                                    }`}
                                >
                                    {cat.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <Header 
          onSearch={handleSearchChange} 
          logoUrl={appData.logoUrl} 
          siteName={appData.siteName}
          onLogoClick={() => setIsProfileModalOpen(true)}
          onGoToAITools={handleGoToAITools}
          currentView={currentView}
        />
        <AnnouncementBar 
          content={appData.announcementText} 
          link={appData.announcementLink} 
          label={appData.announcementLabel}
          bgColor={appData.announcementBgColor}
          textColor={appData.announcementTextColor}
        />

        <main className="mt-8">
          {currentView === 'postDetail' && selectedPost ? (
            <PostDetail 
                post={selectedPost} 
                onBack={handleGoHome} 
                siteName={appData.siteName}
                allPosts={appData.posts}
                onSelectPost={handleSelectPost}
            />
          ) : currentView === 'aiTools' ? (
            <AITools />
          ) : (
            renderHomeView()
          )}
        </main>
      </div>
      <Footer socials={appData.socials} />
      <FloatingButtons onGoHome={handleGoHome} showHomeButton={currentView !== 'home'} />

      {isProfileModalOpen && appData.profile && (
        <ProfileModal 
          profile={appData.profile}
          logoUrl={appData.logoUrl}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;