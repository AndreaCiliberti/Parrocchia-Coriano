import { PageId } from './types';
import { SITE_INFO } from './data/siteData';

// Canonical origin: the bare domain 308-redirects here (Vercel domain settings).
export const SITE_URL = 'https://www.parrocchiacoriano.com';

// Shown when a link is shared (WhatsApp, Facebook) and to search engines.
export const SHARE_IMAGE = { path: '/images/coriano.jpg', width: 700, height: 400, alt: 'Coriano con la chiesa di S. Maria Assunta' };

interface PageMeta {
  title: string;
  description: string;
}

// Title and description of every page. The title gets " | Parrocchia Coriano"
// appended, except on the home where it is used as is.
export const PAGES: Record<PageId, PageMeta> = {
  home: {
    title: 'Parrocchia S. Maria Assunta di Coriano (RN) | Orari Messe e avvisi',
    description: 'Parrocchia S. Maria Assunta di Coriano (RN): orari delle Messe, avvisi, gruppi e attività della comunità, storia della chiesa e contatti della segreteria.',
  },
  'orari-messe': {
    title: 'Orari delle Messe a Coriano e nella zona pastorale',
    description: 'Orari delle Messe feriali, prefestive e festive nella chiesa di S. Maria Assunta di Coriano e nelle altre chiese della zona pastorale.',
  },
  avvisi: {
    title: 'Avvisi',
    description: 'Gli avvisi della Parrocchia di Coriano: celebrazioni, incontri, iniziative e cambi di orario della settimana.',
  },
  'vita-comunita': {
    title: 'Orari settimanali',
    description: 'Il programma della settimana nella Parrocchia di Coriano: Messe, adorazione, confessioni, doposcuola e incontri, giorno per giorno.',
  },
  'comunita-parrocchiale': {
    title: 'Gruppi parrocchiali',
    description: 'I gruppi della Parrocchia di Coriano, dal catechismo alla Caritas: cosa fanno, quando si incontrano e come partecipare.',
  },
  'immagini-da-una-comunita': {
    title: 'Foto della comunità',
    description: 'Le foto della comunità parrocchiale di Coriano: feste, pellegrinaggi, campo lavoro e momenti di vita insieme.',
  },
  storia: {
    title: 'Storia della chiesa di Coriano',
    description: 'Mille anni di storia della chiesa di S. Maria Assunta di Coriano, dalla prima cappella alla distruzione della guerra e alla ricostruzione.',
  },
  contatti: {
    title: 'Contatti',
    description: `Contatti della Parrocchia di Coriano: ${SITE_INFO.address}, telefono ${SITE_INFO.phone}, segreteria ${SITE_INFO.secretaryHours}.`,
  },
  privacy: {
    title: 'Informativa privacy',
    description: 'Informativa sul trattamento dei dati personali del sito della Parrocchia S. Maria Assunta di Coriano.',
  },
  'cookie-policy': {
    title: 'Cookie policy',
    description: 'Informativa sui cookie usati dal sito della Parrocchia S. Maria Assunta di Coriano.',
  },
};

export const NOT_FOUND_META: PageMeta = {
  title: 'Pagina non trovata',
  description: 'La pagina cercata non esiste sul sito della Parrocchia di Coriano.',
};

export const PAGE_IDS = Object.keys(PAGES) as PageId[];

export function pathFor(page: PageId): string {
  return page === 'home' ? '/' : `/${page}`;
}

/** The page at a URL path, or null when no page has that path (404). */
export function pageFromPath(pathname: string): PageId | null {
  const slug = pathname.replace(/\/+$/, '').replace(/^\//, '').toLowerCase();
  if (slug === '') return 'home';
  return slug !== 'home' && (PAGE_IDS as string[]).includes(slug) ? (slug as PageId) : null;
}

/** Links from the old hash routing (`/#avvisi`, `/#/avvisi`) still work. */
export function pageFromHash(hash: string): PageId | null {
  const slug = hash.replace(/^#\/?/, '').toLowerCase();
  return slug !== '' && (PAGE_IDS as string[]).includes(slug) ? (slug as PageId) : null;
}

export function fullTitle(page: PageId | null): string {
  if (page === 'home') return PAGES.home.title;
  return `${(page ? PAGES[page] : NOT_FOUND_META).title} | ${SITE_INFO.title}`;
}

export function metaFor(page: PageId | null): PageMeta {
  return { title: fullTitle(page), description: (page ? PAGES[page] : NOT_FOUND_META).description };
}
