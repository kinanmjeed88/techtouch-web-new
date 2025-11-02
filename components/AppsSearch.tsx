import React, { useState } from 'react';
import { SearchIcon } from './Icons';
import { embeddedAppsData } from './EmbeddedData';

const AppsSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // البحث البسيط
  const getFilteredApps = () => {
    if (!searchQuery.trim()) {
      return [];
    }
    
    const query = searchQuery.toLowerCase().trim();
    
    return embeddedAppsData.apps.filter(app => {
      const nameAr = app.name_ar?.toLowerCase() || '';
      const nameEn = app.name_en?.toLowerCase() || '';
      const keywords = [...(app.keywords_ar || []), ...(app.keywords_en || [])].join(' ').toLowerCase();
      
      return nameAr.includes(query) || nameEn.includes(query) || keywords.includes(query);
    });
  };
  
  const filteredApps = getFilteredApps();
  
  return (
    <div className="animate-fadeIn">
      {/* العنوان */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">بحث التطبيقات</h2>
        <p className="text-gray-400">ابحث عن أي تطبيق تريده من بين 140 تطبيق</p>
      </div>
      
      {/* شريط البحث */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن التطبيق... (مثال: واتساب، سينمانا، الأسطورة)"
            className="w-full pr-12 pl-4 py-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            style={{ direction: 'rtl' }}
          />
        </div>
      </div>
      
      {/* النتائج */}
      <div className="max-w-2xl mx-auto">
        {searchQuery && (
          <div className="mb-4 text-gray-400">
            {filteredApps.length} تطبيق
          </div>
        )}
        
        {filteredApps.length === 0 && searchQuery && (
          <div className="text-center py-8 text-gray-400">
            لم نجد أي تطبيقات مطابقة لـ "{searchQuery}"
          </div>
        )}
        
        {filteredApps.length > 0 && (
          <div className="space-y-3">
            {filteredApps.map((app) => (
              <div key={app.id} className="bg-gray-800 rounded-lg p-4">
                <p className="text-lg">
                  تفضل التطبيق{' '}
                  <a
                    href={app.download_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 font-bold underline"
                  >
                    {app.name_ar}
                  </a>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppsSearch;
