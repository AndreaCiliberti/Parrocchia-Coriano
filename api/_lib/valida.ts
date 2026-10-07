import type { Avviso } from '../../src/types/index.js';

export const CARTELLA_IMMAGINI = '/images/avvisi/';
export const MAX_AVVISI = 30;
export const MAX_IMMAGINI_NUOVE = 10;
export const MAX_BYTE_IMMAGINE = 2 * 1024 * 1024;
export const RE_NOME_IMMAGINE = /^[a-z0-9][a-z0-9-]{0,80}\.jpg$/;

const MAX_TITOLO = 200;
const MAX_DESCRIZIONE = 300;
const MAX_TESTO = 20000;
const RE_ID = /^[a-z0-9]{4,24}$/;
const RE_PERCORSO_IMMAGINE = /^\/images\/[A-Za-z0-9._/-]+\.(jpe?g|png|webp)$/i;
const PREFISSO_DATA_URL = 'data:image/jpeg;base64,';

export interface ImmagineDaSalvare {
  nome: string;
  byte: Buffer;
}

export interface RichiestaPubblicaValida {
  avvisi: Avviso[];
  nuoveImmagini: ImmagineDaSalvare[];
  sha: string;
}

export type EsitoValidazione =
  | { ok: true; dati: RichiestaPubblicaValida }
  | { ok: false; status: 400 | 413; errore: string };

const errore = (messaggio: string, status: 400 | 413 = 400): EsitoValidazione => ({ ok: false, status, errore: messaggio });

const isOggetto = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

function validaAvviso(valore: unknown, posizione: number): Avviso | string {
  const n = posizione + 1;
  if (!isOggetto(valore)) return `Avviso ${n}: formato non valido`;
  const { id, titolo, descrizioneBreve, testo, immagine, bozza } = valore;
  if (typeof id !== 'string' || !RE_ID.test(id)) return `Avviso ${n}: id non valido`;
  if (typeof titolo !== 'string' || !titolo.trim()) return `Avviso ${n}: il titolo è obbligatorio`;
  if (titolo.length > MAX_TITOLO) return `Avviso ${n}: titolo troppo lungo (max ${MAX_TITOLO} caratteri)`;
  if (typeof descrizioneBreve !== 'string' || descrizioneBreve.length > MAX_DESCRIZIONE) {
    return `Avviso ${n}: descrizione breve non valida (max ${MAX_DESCRIZIONE} caratteri)`;
  }
  if (typeof testo !== 'string' || testo.length > MAX_TESTO) return `Avviso ${n}: testo non valido o troppo lungo`;
  if (
    immagine !== null &&
    (typeof immagine !== 'string' || !RE_PERCORSO_IMMAGINE.test(immagine) || immagine.includes('..'))
  ) {
    return `Avviso ${n}: percorso immagine non valido`;
  }
  if (typeof bozza !== 'boolean') return `Avviso ${n}: stato bozza non valido`;
  return {
    id,
    titolo: titolo.trim(),
    descrizioneBreve: descrizioneBreve.trim(),
    testo,
    immagine: immagine as string | null,
    bozza,
  };
}

export function validaRichiestaPubblica(corpo: unknown): EsitoValidazione {
  if (!isOggetto(corpo)) return errore('Richiesta non valida');
  const { avvisi, nuoveImmagini, sha } = corpo;
  if (typeof sha !== 'string') return errore('Versione (sha) mancante');
  if (!Array.isArray(avvisi)) return errore('Elenco avvisi mancante');
  if (avvisi.length > MAX_AVVISI) return errore(`Troppi avvisi (max ${MAX_AVVISI})`);

  const validi: Avviso[] = [];
  for (const [i, valore] of avvisi.entries()) {
    const risultato = validaAvviso(valore, i);
    if (typeof risultato === 'string') return errore(risultato);
    validi.push(risultato);
  }
  if (new Set(validi.map((a) => a.id)).size !== validi.length) return errore('Ci sono due avvisi con lo stesso id');

  if (!Array.isArray(nuoveImmagini)) return errore('Elenco immagini mancante');
  if (nuoveImmagini.length > MAX_IMMAGINI_NUOVE) {
    return errore(`Troppe immagini nuove in una volta (max ${MAX_IMMAGINI_NUOVE})`, 413);
  }
  const usate = new Set(validi.map((a) => a.immagine).filter((p): p is string => p !== null));
  const immagini: ImmagineDaSalvare[] = [];
  for (const img of nuoveImmagini) {
    if (!isOggetto(img) || typeof img.nome !== 'string' || typeof img.dataUrl !== 'string') {
      return errore('Immagine non valida');
    }
    if (!RE_NOME_IMMAGINE.test(img.nome)) return errore(`Nome immagine non valido: ${img.nome}`);
    if (!usate.has(CARTELLA_IMMAGINI + img.nome)) return errore(`Immagine non usata da nessun avviso: ${img.nome}`);
    if (!img.dataUrl.startsWith(PREFISSO_DATA_URL)) return errore(`L'immagine ${img.nome} non è un JPEG`);
    const byte = Buffer.from(img.dataUrl.slice(PREFISSO_DATA_URL.length), 'base64');
    if (byte.length > MAX_BYTE_IMMAGINE) return errore(`L'immagine ${img.nome} è troppo grande (max 2 MB)`, 413);
    if (byte.length < 3 || byte[0] !== 0xff || byte[1] !== 0xd8 || byte[2] !== 0xff) {
      return errore(`L'immagine ${img.nome} non è un JPEG valido`);
    }
    immagini.push({ nome: img.nome, byte });
  }

  return { ok: true, dati: { avvisi: validi, nuoveImmagini: immagini, sha } };
}
