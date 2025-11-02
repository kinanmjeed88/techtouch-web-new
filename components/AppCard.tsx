import React from 'react';
import { LinkIcon } from './Icons';

export interface App {
  id: number;
  name: string;
  nameAr: string;
  link: string;
  category: string;
  keywords: string[];
  description: string;
  featured?: boolean;
}

interface Category {
  name: string;
  nameEn: string;
  icon: string;
  color: string;
}

interface AppCardProps {
  app: App;
  category: Category;
  onSelect: () => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, category, onSelect }) => {
  return (
    <div
      className="p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-red-500 relative overflow-hidden group"
      style={{ backgroundColor: 'var(--color-card-bg)' }}
      onClick={onSelect}
    >
      {app.featured && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          مميز
        </div>
      )}
      
      <div className="flex items-center justify-center w-14 h-14 rounded-full mb-4 text-3xl" style={{ backgroundColor: category.color + '20' }}>
        {category.icon}
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-right" style={{ color: 'var(--color-card-title)' }}>
        {app.nameAr}
      </h3>
      
      <p className="text-sm text-gray-400 mb-3 text-right" style={{ color: 'var(--color-card-description)' }}>
        {app.description}
      </p>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs px-3 py-1 rounded-full" style={{ backgroundColor: category.color + '30', color: category.color }}>
          <span>{category.icon}</span>
          <span className="font-semibold">{category.name}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 mt-4 py-2 px-4 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold transition-all duration-300 transform group-hover:scale-105">
        <LinkIcon className="w-5 h-5" />
        <span>افتح التطبيق</span>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-1">
        {app.keywords.slice(0, 3).map((keyword, idx) => (
          <span key={idx} className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AppCard;
