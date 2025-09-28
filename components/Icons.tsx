
import React from 'react';

type IconProps = {
  className?: string;
}

export const FacebookIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

export const TiktokIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.8-1.59-1.87-2.32-4.35-2.09-6.83.23-2.48 1.41-4.74 3.22-6.31 1.8-1.56 4.14-2.32 6.5-2.11.38.01 1.14.05 1.54.08v4.03c-.44-.03-.88-.06-1.32-.09-1.42-.11-2.84.31-3.98 1.15-1.14.84-1.95 2.11-2.23 3.45-.27 1.34.01 2.67.72 3.77.71 1.1 1.83 1.83 3.12 2.02 1.28.19 2.6-.04 3.75-.72.95-.57 1.63-1.48 1.96-2.58.32-1.11.42-2.3.41-3.48-.01-3.33.01-6.66-.02-9.99z"/>
  </svg>
);

export const YoutubeIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.701V8.115l6.06 3.434-6.06 4.336z" clipRule="evenodd" />
  </svg>
);

export const TelegramIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.6 12.07c-.53-.16-.54-.53.08-.78l16.39-6.2c.48-.19.93.08.79.64l-3.23 15.24c-.14.67-.55.83-1.12.52l-4.82-3.55-2.32 2.23c-.25.24-.46.45-.8.45z"/>
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className = "w-5 h-5 text-gray-400" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
