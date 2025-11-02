
import React from 'react';
import { FacebookIcon, TiktokIcon, YoutubeIcon, TelegramIcon } from './Icons';
import type { SiteSettings } from '../types';

interface FooterProps {
  socials?: SiteSettings['socials'];
}

const Footer: React.FC<FooterProps> = ({ socials }) => {
  const socialLinks = [
    { name: 'Facebook', Icon: FacebookIcon, url: socials?.facebook },
    { name: 'TikTok', Icon: TiktokIcon, url: socials?.tiktok },
    { name: 'YouTube', Icon: YoutubeIcon, url: socials?.youtube },
    { name: 'Telegram', Icon: TelegramIcon, url: socials?.telegram },
  ].filter(link => link.url);

  if (socialLinks.length === 0) {
    return (
        <footer className="mt-12 py-8" style={{ backgroundColor: 'rgba(31, 41, 55, 0.5)' }}>
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-500 text-xs sm:text-sm">
                    &copy; {new Date().getFullYear()} <span dir="ltr">techtouch تقنية</span>. جميع الحقوق محفوظة.
                </p>
            </div>
        </footer>
    );
  }

  return (
    <footer className="mt-12 py-8" style={{ backgroundColor: 'rgba(31, 41, 55, 0.5)' }}>
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-lg sm:text-xl font-bold text-gray-300 mb-4">
          تابعنا على
        </h3>
        <div className="flex justify-center space-x-4 sm:space-x-6 space-x-reverse mb-6">
          {socialLinks.map(({ name, Icon, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-gray-400 hover:text-red-400 transition-all duration-300 transform hover:scale-125 text-primary-hover"
            >
              <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
            </a>
          ))}
        </div>
        <p className="text-gray-500 text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} <span dir="ltr">techtouch تقنية</span>. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
