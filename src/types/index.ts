export type PageId = 
  | 'home' 
  | 'orari-messe' 
  | 'avvisi' 
  | 'immagini-da-una-comunita' 
  | 'vita-comunita' 
  | 'comunita-parrocchiale'
  | 'storia'
  | 'contatti'
  | 'privacy'
  | 'cookie-policy';

/** One Mass time; `note` qualifies it when it changes during the year. */
export interface MassSlot {
  time: string;
  note?: string;
}

/** A church of the pastoral zone with its Saturday (prefestive) and Sunday Masses. */
export interface ChurchMasses {
  place: string;
  church?: string;
  saturday: MassSlot[];
  sunday: MassSlot[];
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

export interface StoriaImage {
  src: string;
  caption: string;
}

export type StoriaBlock =
  | { type: 'p'; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'list'; heading?: string; items: { title?: string; text: string }[] };

export interface StoriaSection {
  id: string;
  title: string;
  blocks: StoriaBlock[];
  images?: StoriaImage[];
}

export interface StoriaChapter {
  id: string;
  number: string;
  title: string;
  intro?: string[];
  sections: StoriaSection[];
}

export interface StoriaMilestone {
  year: string;
  text: string;
}

export type StoriaLang = 'it' | 'en';

export interface StoriaContent {
  heroImage: StoriaImage;
  milestones: StoriaMilestone[];
  chapters: StoriaChapter[];
  ui: {
    eyebrow: string;
    title: string;
    intro: string;
    milestonesTitle: string;
    chaptersNavLabel: string;
    chapterLabel: string;
    outroTitle: string;
    outroText: string;
    massTimes: string;
    contacts: string;
    zoom: string;
    close: string;
    // Button that switches to the other language
    switchLabel: string;
    switchAria: string;
  };
}

export interface Avviso {
  id: string;
  titolo: string;
  descrizioneBreve: string;
  /** HTML ristretto: p, br, strong, a, ul, li */
  testo: string;
  /** Percorso sotto /images/ oppure null */
  immagine: string | null;
  bozza: boolean;
}

export interface FileAvvisi {
  avvisi: Avviso[];
}

export interface NuovaImmagine {
  nome: string;
  dataUrl: string;
}

export interface RichiestaPubblica {
  avvisi: Avviso[];
  nuoveImmagini: NuovaImmagine[];
  sha: string;
}

/** An event on the Foto page: title, optional text and signature, photos. */
export interface PhotoAlbum {
  id: string;
  title: string;
  text?: string;
  author?: string;
  photos: string[];
}
