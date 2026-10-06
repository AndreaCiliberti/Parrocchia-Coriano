export type PageId = 
  | 'home' 
  | 'orari-messe' 
  | 'avvisi' 
  | 'immagini-da-una-comunita' 
  | 'vita-comunita' 
  | 'comunita-parrocchiale' 
  | 'contatti'
  | 'privacy'
  | 'cookie-policy';

export interface MassTime {
  churchName: string;
  time: string;
  type: 'prefestiva' | 'festiva';
  notes?: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  content: string[];
  links?: { label: string; url: string }[];
}

export interface CommunityGroup {
  id: string;
  name: string;
  image: string;
  description: string;
  contactExtra?: {
    phone?: string;
    mail?: string;
  };
}

export interface DaySchedule {
  dayName: string;
  slots: {
    time: string;
    activity: string;
  }[];
}
