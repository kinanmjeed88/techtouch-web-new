import React from 'react';
import { SearchIcon } from './Icons';

interface HeaderProps {
  onSearch: (query: string) => void;
  logoUrl: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, logoUrl }) => {
  return (
    <header 
      className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg"
      style={{ backgroundColor: 'var(--color-header-bg)' }}
    >
      <div className="flex items-center space-x-4 space-x-reverse">
        <img
          src={logoUrl}
          alt="Site Logo"
          className="w-24 h-24 rounded-full border-4 object-cover"
          style={{ borderColor: 'var(--color-primary)' }}
        />
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400" dir="ltr">
          techtouch0
        </h1>
      </div>
      <div className="relative mt-6 w-full max-w-lg">
        <input
          type="text"
          placeholder="ابحث عن منشور..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:border-transparent transition-all ring-primary"
          aria-label="Search posts"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
