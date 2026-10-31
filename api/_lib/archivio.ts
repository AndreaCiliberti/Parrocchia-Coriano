import type { Avviso } from '../../src/types/index.js';
import { CARTELLA_IMMAGINI, type ImmagineDaSalvare } from './valida.js';

export const PERCORSO_JSON = 'src/data/avvisi.json';
export const CARTELLA_IMMAGINI_REPO = 'public/images/avvisi';

export interface StatoArchivio {
  avvisi: Avviso[];
  sha: string;
}

export interface EsitoScrittura {
  /** Sha nuovo del JSON, da usare come shaAtteso alla scrittura successiva. */
  sha: string;
  /** Commit creato su GitHub; null in modalità locale. */
  commit: string | null;
}

export interface Archivio {
  modalita: 'github' | 'locale';
  leggi(): Promise<StatoArchivio>;
  /** Scrive tutto in un'unica operazione. */
  scrivi(avvisi: Avviso[], nuoveImmagini: ImmagineDaSalvare[], shaAtteso: string): Promise<EsitoScrittura>;
}

export class ConflittoError extends Error {
  constructor() {
    super('Gli avvisi sono stati modificati altrove. Ricarica per vedere la versione aggiornata.');
    this.name = 'ConflittoError';
  }
}

export function serializza(avvisi: Avviso[]): string {
  return JSON.stringify({ avvisi }, null, 2) + '\n';
}

export function interpreta(contenuto: string): Avviso[] {
  const dati = JSON.parse(contenuto) as { avvisi?: unknown };
  return Array.isArray(dati.avvisi) ? (dati.avvisi as Avviso[]) : [];
}

export function immaginiOrfane(nomiPresenti: string[], avvisi: Avviso[]): string[] {
  const usate = new Set(
    avvisi
      .map((a) => a.immagine)
      .filter((p): p is string => !!p && p.startsWith(CARTELLA_IMMAGINI))
      .map((p) => p.slice(CARTELLA_IMMAGINI.length)),
  );
  return nomiPresenti.filter((nome) => !nome.startsWith('.') && !usate.has(nome));
}
