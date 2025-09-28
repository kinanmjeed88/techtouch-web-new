
import React from 'react';
import type { Post } from '../types';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const formattedDate = new Date(post.timestamp).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="p-4 sm:p-6 rounded-lg shadow-xl" style={{ backgroundColor: 'var(--color-header-bg)'}}>
      <button onClick={onBack} className="mb-6 text-sm sm:text-base hover:text-red-300 transition-colors duration-300 font-semibold" style={{ color: 'var(--color-primary-focus)' }}>
        &larr; العودة إلى المنشورات
      </button>

      <article>
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-400 text-sm mb-6">{formattedDate}</p>
        
        <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[300px] sm:max-h-[500px] object-cover rounded-lg mb-6 shadow-lg" />
        
        <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />

        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row gap-4">
          <a 
            href={post.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 text-center text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-transform duration-300 transform hover:scale-105 btn-primary"
          >
            زيارة الرابط
          </a>
          <a 
            href={post.fileUrl} 
            download 
            className="flex-1 text-center bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-transform duration-300 transform hover:scale-105"
          >
            تحميل الملف
          </a>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
