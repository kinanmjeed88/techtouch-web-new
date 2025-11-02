import React from 'react';
import { FilterIcon, XIcon } from './Icons';

interface Category {
  name: string;
  nameEn: string;
  icon: string;
  color: string;
}

interface SearchFiltersProps {
  categories: { [key: string]: Category };
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onClearFilters,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FilterIcon className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-bold text-white">تصفية حسب الفئة</h3>
        </div>
        
        {selectedCategory !== 'all' && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors duration-300"
          >
            <XIcon className="w-4 h-4" />
            <span>مسح الفلترة</span>
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          الكل
        </button>
        
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
              selectedCategory === key
                ? 'text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            style={
              selectedCategory === key
                ? { backgroundColor: category.color }
                : {}
            }
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilters;
