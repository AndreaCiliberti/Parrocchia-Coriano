import type { Avviso, RichiestaPubblica } from '../types';

export class ErroreApi extends Error {
  status: number;
  dettaglio?: string;
  constructor(status: number, messaggio: string, dettaglio?: string) {
    super(messaggio);
    this.name = 'ErroreApi';
    this.status = status;
    this.dettaglio = dettaglio;
  }
}

const MESSAGGI_PREDEFINITI: Record<number, string> = {
  401: 'Sessione scaduta, accedi di nuovo',
  413: 'Le immagini sono troppo grandi per una sola pubblicazione.',
};

async function chiama<T>(percorso: string, metodo: 'GET' | 'POST' = 'GET', corpo?: unknown): Promise<T> {
  const risposta = await fetch(percorso, {
    method: metodo,
    credentials: 'same-origin',
    headers: corpo === undefined ? undefined : { 'content-type': 'application/json' },
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
  });
  const dati = (await risposta.json().catch(() => ({}))) as { errore?: string; dettaglio?: string };
  if (!risposta.ok) {
    throw new ErroreApi(
      risposta.status,
      dati.errore ?? MESSAGGI_PREDEFINITI[risposta.status] ?? `Errore del server (${risposta.status})`,
      dati.dettaglio,
    );
  }
  return dati as T;
}

export interface EsitoPubblicazione {
  ok: true;
  modalita: 'github' | 'locale';
  avvisi: Avviso[];
  sha: string;
  commit: string | null;
}

export const login = (email: string, password: string) =>
  chiama<{ ok: true }>('/api/login', 'POST', { email, password });

export const logout = () => chiama<{ ok: true }>('/api/logout', 'POST', {});

export const caricaAvvisi = () => chiama<{ avvisi: Avviso[]; sha: string }>('/api/avvisi');

export const pubblica = (richiesta: RichiestaPubblica) =>
  chiama<EsitoPubblicazione>('/api/pubblica', 'POST', richiesta);

export const versioneOnline = () => chiama<{ commit: string | null }>('/api/versione');
