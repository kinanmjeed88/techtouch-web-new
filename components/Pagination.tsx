
import React from 'react';

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPosts, postsPerPage, currentPage, onPageChange }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (totalPages <= 1) return null;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-8 sm:mt-12" aria-label="Pagination">
      <ul className="flex items-center space-x-1 sm:space-x-2 space-x-reverse">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-colors duration-200 font-medium text-sm sm:text-base ${
                currentPage === number
                  ? 'bg-red-600 text-white shadow-md btn-primary'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              aria-current={currentPage === number ? 'page' : undefined}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
