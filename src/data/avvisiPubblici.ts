import type { Avviso } from '../types';

/** Avvisi visibili sul sito (non bozze), nell'ordine in cui sono salvati. */
export function soloPubblicati(avvisi: Avviso[]): Avviso[] {
  return avvisi.filter((a) => !a.bozza);
}

const ENTITA: Record<string, string> = {
  '&amp;': '&',
  '&nbsp;': ' ',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

/** Testo semplice ricavato dall'HTML di un avviso, tagliato a `max` caratteri su una parola intera. */
export function estratto(html: string, max: number): string {
  const testo = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(amp|nbsp|lt|gt|quot|#39);/g, (e) => ENTITA[e])
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?])/g, '$1')
    .trim();
  if (testo.length <= max) return testo;
  const taglio = testo.slice(0, max + 1);
  const ultimoSpazio = taglio.lastIndexOf(' ');
  return (ultimoSpazio > 0 ? taglio.slice(0, ultimoSpazio) : testo.slice(0, max)) + '…';
}
