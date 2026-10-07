export const CARTELLA_IMMAGINI = '/images/avvisi/';
export const MAX_BYTE_IMMAGINE = 2 * 1024 * 1024;
/** Margine sotto il limite di 4,5 MB del corpo delle Vercel Functions. */
export const LIMITE_RICHIESTA_BYTE = 4 * 1024 * 1024;

const ALFABETO = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function nuovoId(lunghezza = 10): string {
  const casuali = crypto.getRandomValues(new Uint8Array(lunghezza));
  return Array.from(casuali, (b) => ALFABETO[b % ALFABETO.length]).join('');
}

export function slug(testo: string): string {
  const s = testo
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/, '');
  return s || 'avviso';
}

export function nomeImmagine(titolo: string, id: string): string {
  return `${slug(titolo)}-${id}-${nuovoId(4)}.jpg`;
}

export function nomeDaPercorso(percorso: string): string | null {
  return percorso.startsWith(CARTELLA_IMMAGINI) ? percorso.slice(CARTELLA_IMMAGINI.length) : null;
}

export function normalizzaLink(input: string): string {
  const testo = input.trim();
  if (/^(https?:|mailto:|tel:)/i.test(testo)) return testo;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testo)) return `mailto:${testo}`;
  if (/^\+?[\d\s./-]{6,}$/.test(testo)) return `tel:${testo.replace(/[^\d+]/g, '')}`;
  return `https://${testo.replace(/^\/+/, '')}`;
}

export function byteDaDataUrl(dataUrl: string): number {
  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
  const riempimento = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  return (base64.length * 3) / 4 - riempimento;
}

export function superaLimite(corpo: string): boolean {
  return new TextEncoder().encode(corpo).length > LIMITE_RICHIESTA_BYTE;
}

export function sposta<T>(lista: T[], da: number, a: number): T[] {
  if (a < 0 || a >= lista.length || da === a) return lista;
  const copia = [...lista];
  const [elemento] = copia.splice(da, 1);
  copia.splice(a, 0, elemento);
  return copia;
}
