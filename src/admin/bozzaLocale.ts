import type { Avviso } from '../types';

export const CHIAVE_BOZZA = 'parrocchia-avvisi-bozza';

export interface BozzaLocale {
  avvisi: Avviso[];
  /** nome file → data URL delle immagini non ancora pubblicate */
  nuoveImmagini: Record<string, string>;
  /** sha della versione da cui sono partite le modifiche */
  sha: string;
}

type Memoria = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

function memoriaPredefinita(): Memoria | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

export function leggiBozza(memoria: Memoria | null = memoriaPredefinita()): BozzaLocale | null {
  try {
    const grezzo = memoria?.getItem(CHIAVE_BOZZA);
    if (!grezzo) return null;
    const dati = JSON.parse(grezzo) as Partial<BozzaLocale>;
    const valida =
      Array.isArray(dati.avvisi) &&
      typeof dati.sha === 'string' &&
      typeof dati.nuoveImmagini === 'object' &&
      dati.nuoveImmagini !== null;
    return valida ? (dati as BozzaLocale) : null;
  } catch {
    return null;
  }
}

/** Restituisce false se il browser non ha potuto salvare (es. spazio esaurito). */
export function salvaBozza(bozza: BozzaLocale, memoria: Memoria | null = memoriaPredefinita()): boolean {
  if (!memoria) return false;
  try {
    memoria.setItem(CHIAVE_BOZZA, JSON.stringify(bozza));
    return true;
  } catch {
    return false;
  }
}

export function cancellaBozza(memoria: Memoria | null = memoriaPredefinita()): void {
  try {
    memoria?.removeItem(CHIAVE_BOZZA);
  } catch {
    // niente da fare: la bozza resterà e verrà proposta alla prossima apertura
  }
}
