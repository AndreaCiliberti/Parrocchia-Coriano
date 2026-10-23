import { PageId } from './types';
import { SITE_INFO } from './data/siteData';
import { SHARE_IMAGE, SITE_URL, metaFor, pathFor } from './routes';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Structured data for the home: the parish church as a place with address and contacts. */
export function parishJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Church',
    '@id': `${SITE_URL}/#parrocchia`,
    name: 'Parrocchia S. Maria Assunta di Coriano',
    alternateName: SITE_INFO.title,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}${SHARE_IMAGE.path}`,
    telephone: `+39 ${SITE_INFO.phone}`,
    email: SITE_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Libero Pedrelli, 2',
      postalCode: '47853',
      addressLocality: 'Coriano',
      addressRegion: 'RN',
      addressCountry: 'IT',
    },
  };
}

/**
 * The <head> tags that change from page to page, as HTML for the prerender.
 * `page` null is the 404 page, which must not be indexed.
 */
export function headHtml(page: PageId | null): string {
  const { title, description } = metaFor(page);
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  ];
  if (page === null) {
    tags.push('<meta name="robots" content="noindex" />');
    return tags.join('\n    ');
  }
  const url = `${SITE_URL}${pathFor(page)}`;
  tags.push(
    `<link rel="canonical" href="${url}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="it_IT" />',
    `<meta property="og:site_name" content="${escapeHtml(SITE_INFO.title)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL}${SHARE_IMAGE.path}" />`,
    `<meta property="og:image:width" content="${SHARE_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${SHARE_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(SHARE_IMAGE.alt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
  );
  if (page === 'home') {
    // "<" is escaped so the JSON can never close the script tag.
    const json = JSON.stringify(parishJsonLd()).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }
  return tags.join('\n    ');
}

/** Keeps title, description and canonical in step when navigating in the browser. */
export function updateHead(page: PageId | null): void {
  const { title, description } = metaFor(page);
  document.title = title;
  const set = (selector: string, attr: string, value: string) =>
    document.head.querySelector(selector)?.setAttribute(attr, value);
  set('meta[name="description"]', 'content', description);
  set('meta[property="og:title"]', 'content', title);
  set('meta[property="og:description"]', 'content', description);
  if (page !== null) {
    const url = `${SITE_URL}${pathFor(page)}`;
    set('link[rel="canonical"]', 'href', url);
    set('meta[property="og:url"]', 'content', url);
  }
}
