import { createHmac, timingSafeEqual } from 'node:crypto';

export const NOME_COOKIE = 'sessione_admin';
export const DURATA_SECONDI = 7 * 24 * 60 * 60;

function segreto(): string {
  const valore = process.env.SESSION_SECRET;
  if (!valore || valore.length < 32) {
    throw new Error('SESSION_SECRET mancante o troppo corto (minimo 32 caratteri)');
  }
  return valore;
}

function firma(valore: string): string {
  return createHmac('sha256', segreto()).update(valore).digest('hex');
}

export function creaToken(adesso = Date.now()): string {
  const scadenza = String(adesso + DURATA_SECONDI * 1000);
  return `${scadenza}.${firma(scadenza)}`;
}

export function tokenValido(token: string | undefined, adesso = Date.now()): boolean {
  if (!token) return false;
  const [scadenza, firmaRicevuta, ...resto] = token.split('.');
  if (!scadenza || !firmaRicevuta || resto.length > 0) return false;
  const attesa = Buffer.from(firma(scadenza));
  const ricevuta = Buffer.from(firmaRicevuta);
  if (attesa.length !== ricevuta.length || !timingSafeEqual(attesa, ricevuta)) return false;
  return Number(scadenza) > adesso;
}

export function leggiCookie(request: Request, nome = NOME_COOKIE): string | undefined {
  const intestazione = request.headers.get('cookie') ?? '';
  for (const parte of intestazione.split(';')) {
    const [chiave, ...valore] = parte.trim().split('=');
    if (chiave === nome) return valore.join('=');
  }
  return undefined;
}

export function richiestaAutenticata(request: Request): boolean {
  return tokenValido(leggiCookie(request));
}

function attributi(maxAge: number): string {
  const secure = process.env.VERCEL ? '; Secure' : '';
  return `Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

export function cookieSessione(token: string): string {
  return `${NOME_COOKIE}=${token}; ${attributi(DURATA_SECONDI)}`;
}

export function cookieCancellazione(): string {
  return `${NOME_COOKIE}=; ${attributi(0)}`;
}
