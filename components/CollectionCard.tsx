import React from 'react';
import type { Collection } from '../types';

interface CollectionCardProps {
  collection: Collection;
  onSelect: (collection: Collection) => void;
  index: number;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onSelect, index }) => {
  return (
    <div
      className="backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group border-primary-hover shadow-primary-hover card-enter flex flex-col"
      onClick={() => onSelect(collection)}
      style={{ 
        backgroundColor: 'var(--color-card-bg)',
        animationDelay: `${index * 100}ms`
      }}
    >
      <div className="relative">
        {collection.imageUrl ? (
          <img src={collection.imageUrl} alt={collection.title} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500">لا توجد صورة</span>
          </div>
        )}
        <span className="absolute top-2 right-2 bg-red-600/80 text-white text-xs font-bold px-2 py-1 rounded btn-primary">
          مجموعة
        </span>
      </div>
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <h3 
          className="text-lg sm:text-xl font-bold mb-2 group-hover:text-red-400 transition-colors duration-300 text-primary-hover"
          style={{ color: 'var(--color-card-title)' }}
        >
          {collection.title}
        </h3>
        <p 
          className="text-sm flex-grow"
          style={{ color: 'var(--color-card-description)' }}
        >
          {collection.description}
        </p>
      </div>
    </div>
  );
};

export default CollectionCard;
