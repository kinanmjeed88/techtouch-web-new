import React from 'react';
import { SearchIcon } from './Icons';
import { SparklesIcon } from './Icons';

interface HeaderProps {
  onSearch: (query: string) => void;
  logoUrl: string;
  siteName: string;
  onLogoClick: () => void;
  onGoToAITools: () => void;
  onGoToAINews: () => void;
  currentView: 'home' | 'postDetail' | 'aiTools' | 'aiNews';
}

const Header: React.FC<HeaderProps> = ({ onSearch, logoUrl, siteName, onLogoClick, onGoToAITools, onGoToAINews, currentView }) => {
  return (
    <header 
      className="flex flex-col items-center justify-center p-3 sm:p-6 rounded-lg shadow-lg"
      style={{ backgroundColor: 'var(--color-header-bg)' }}
    >
      <button onClick={onLogoClick} className="flex items-center space-x-3 space-x-reverse mb-3 sm:mb-6 group cursor-pointer">
        {logoUrl && (
            <img
            src={logoUrl}
            alt="Site Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-3 sm:border-4 animate-borderColorPulse transition-transform duration-300 group-hover:scale-105"
            style={{ borderColor: 'var(--color-primary)' }}
            />
        )}
        <h1 
          className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 group-hover:text-red-400 text-primary-hover text-center"
          style={{ color: 'var(--color-site-name)' }}
        >
          {siteName}
        </h1>
      </button>
      
      {/* شريط البحث والأزرار */}
      <div className="flex w-full max-w-2xl items-center gap-2 sm:gap-3">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="ابحث عن منشور..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-full py-2 sm:py-3 pr-8 sm:pr-12 pl-3 sm:pl-4 focus:outline-none focus:ring-2 ring-primary text-xs sm:text-base"
            aria-label="Search posts"
          />
          <div className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>
        
        {/* زر آخر أخبار الذكاء الاصطناعي */}
        <button 
          onClick={onGoToAINews} 
          title="آخر أخبار الذكاء الاصطناعي" 
          aria-label="آخر أخبار الذكاء الاصطناعي"
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm font-medium ${
            currentView === 'aiNews' 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
            : 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 hover:from-purple-500/30 hover:to-blue-500/30 hover:text-white border border-purple-400/30'
          }`}
        >
          <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">أخبار AI</span>
          <span className="xs:hidden">AI</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
