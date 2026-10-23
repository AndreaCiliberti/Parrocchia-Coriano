// Runs after `vite build`: renders every page to static HTML so search engines
// and link previews get the content and the right <head> without running JS.
// Output: dist/index.html, dist/<page>.html (served at /<page> by cleanUrls in
// vercel.json), dist/404.html and dist/sitemap.xml.
import { readFileSync, writeFileSync } from 'node:fs';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { PageId } from '../src/types';
import { PAGE_IDS, SITE_URL, pathFor } from '../src/routes';
import { headHtml } from '../src/seo';

const DIST = 'dist';
const template = readFileSync(`${DIST}/index.html`, 'utf8');

const HEAD_TO_REPLACE = /<title>[\s\S]*?<\/title>\s*<meta name="description"[^>]*>/;
const EMPTY_ROOT = '<div id="root"></div>';
if (!HEAD_TO_REPLACE.test(template) || !template.includes(EMPTY_ROOT)) {
  throw new Error(`${DIST}/index.html is not the plain Vite output: run "vite build" first.`);
}

function renderPage(page: PageId | null): string {
  const body = renderToString(<App initialPage={page} />);
  return template
    .replace(HEAD_TO_REPLACE, () => headHtml(page))
    .replace(EMPTY_ROOT, () => `<div id="root">${body}</div>`);
}

for (const page of PAGE_IDS) {
  const file = page === 'home' ? 'index.html' : `${page}.html`;
  writeFileSync(`${DIST}/${file}`, renderPage(page));
}
writeFileSync(`${DIST}/404.html`, renderPage(null));

const urls = PAGE_IDS.map((page) => `  <url><loc>${SITE_URL}${pathFor(page)}</loc></url>`).join('\n');
writeFileSync(
  `${DIST}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

console.log(`prerender: ${PAGE_IDS.length} pages, 404.html and sitemap.xml written to ${DIST}/`);
