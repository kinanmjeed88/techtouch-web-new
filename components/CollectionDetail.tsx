import React, { useMemo } from 'react';
import type { Collection, Post } from '../types';
import PostCard from './PostCard';

interface CollectionDetailProps {
  collection: Collection;
  allPosts: Post[];
  onSelectPost: (post: Post) => void;
  onBack: () => void;
  categoryTitleMap: Record<string, string>;
}

const CollectionDetail: React.FC<CollectionDetailProps> = ({ collection, allPosts, onSelectPost, onBack, categoryTitleMap }) => {
  
  const collectionPosts = useMemo(() => {
    const postMap = new Map(allPosts.map(p => [p.id, p]));
    return collection.posts.map(postId => postMap.get(postId)).filter(Boolean) as Post[];
  }, [collection.posts, allPosts]);

  return (
    <div className="p-4 sm:p-6 rounded-lg shadow-xl animate-fadeIn" style={{ backgroundColor: 'var(--color-header-bg)'}}>
      <button onClick={onBack} className="mb-6 text-sm sm:text-base hover:text-red-300 transition-colors duration-300 font-semibold" style={{ color: 'var(--color-primary-focus)' }}>
        &larr; العودة إلى المجموعات
      </button>

      <div className="text-center mb-8">
        {collection.imageUrl && (
            <img 
                src={collection.imageUrl} 
                alt={collection.title} 
                className="w-full max-w-lg mx-auto h-auto max-h-72 object-cover rounded-lg mb-6 shadow-lg" 
            />
        )}
        <h1 className="text-2xl sm:text-4xl font-bold mb-2">{collection.title}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">{collection.description}</p>
      </div>

      {collectionPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionPosts.map((post, index) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onSelect={onSelectPost}
              categoryTitle={categoryTitleMap[post.category] || post.category}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 bg-gray-800/50 rounded-lg">
          <p className="text-gray-500">لا توجد منشورات في هذه المجموعة بعد.</p>
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
