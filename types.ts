
export type Category = 'general' | 'android-apps' | 'movie-apps' | 'sports-apps' | 'games' | string;

export interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  timestamp: string;
  link?: string;
  fileUrl?: string;
  category: Category;
  views: number;
}

export interface SiteSettings {
    logoUrl: string;
    announcementText: string;
    announcementLink?: string;
    announcementTextColor?: string;
    colors?: {
        header: string;
        card: string;
        primary: string;
        siteName?: string;
        cardTitle?: string;
        cardDescription?: string;
    };
    socials?: {
        facebook?: string;
        tiktok?: string;
        youtube?: string;
        telegram?: string;
    };
}