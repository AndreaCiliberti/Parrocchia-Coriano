import type { Archivio } from './archivio.js';
import { archivioGitHub } from './archivioGitHub.js';
import { archivioLocale } from './archivioLocale.js';

export function creaArchivio(): Archivio {
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    return archivioGitHub({
      token,
      repo: process.env.GITHUB_REPO ?? '',
      branch: process.env.GITHUB_BRANCH || 'main',
    });
  }
  if (process.env.VERCEL) throw new Error('GITHUB_TOKEN non configurato su Vercel');
  return archivioLocale(process.cwd());
}
