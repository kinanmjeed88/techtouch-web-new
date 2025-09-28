
import React from 'react';

interface AnnouncementBarProps {
  content: string;
  link?: string;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ content, link }) => {
  const BarContent = () => (
    <div className="mt-6 p-3 rounded-lg shadow-md overflow-hidden" style={{ backgroundColor: 'var(--color-header-bg)' }}>
      <div className="relative flex items-center whitespace-nowrap">
        <div className="flex items-center">
           <span className="font-bold text-lg border-2 rounded-md py-1 px-3 animate-borderColorPulse" style={{ color: 'var(--color-primary-focus)' }}>
            إعلان
          </span>
          <p className="mr-4 text-gray-300">{content}</p>
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" aria-label="Announcement">
        <BarContent />
      </a>
    );
  }

  return <BarContent />;
};

export default AnnouncementBar;
