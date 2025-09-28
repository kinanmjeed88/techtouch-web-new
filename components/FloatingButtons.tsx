
import React, { useState, useEffect } from 'react';
import { HomeIcon, ArrowUpIcon } from './Icons';

interface FloatingButtonsProps {
  onGoHome: () => void;
  showHomeButton: boolean;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onGoHome, showHomeButton }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 left-5 space-y-3 z-50">
      {showHomeButton && (
        <button
          onClick={onGoHome}
          aria-label="العودة للصفحة الرئيسية"
          className="text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 btn-primary"
        >
          <HomeIcon />
        </button>
      )}
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="العودة للأعلى"
          className="bg-gray-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-110"
        >
          <ArrowUpIcon />
        </button>
      )}
    </div>
  );
};

export default FloatingButtons;
