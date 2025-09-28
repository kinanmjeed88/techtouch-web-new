import React from 'react';
import { SearchIcon } from './Icons';

interface HeaderProps {
  onSearch: (query: string) => void;
  logoUrl: string;
  siteName: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, logoUrl, siteName }) => {
  return (
    <header 
      className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg"
      style={{ backgroundColor: 'var(--color-header-bg)' }}
    >
      <div className="flex items-center space-x-4 space-x-reverse mb-6">
        {logoUrl && (
            <img
            src={logoUrl}
            alt="Site Logo"
            className="w-24 h-24 rounded-full border-4 animate-borderColorPulse"
            style={{ borderColor: 'var(--color-primary)' }}
            />
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-white">{siteName}</h1>
      </div>
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="ابحث عن منشور..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-full py-3 pr-12 pl-4 focus:outline-none focus:ring-2 ring-primary"
          aria-label="Search posts"
        />
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <SearchIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
