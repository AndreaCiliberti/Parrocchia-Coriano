import { credenzialiValide } from './_lib/credenziali.js';
import { json, leggiJson } from './_lib/http.js';
import { cookieSessione, creaToken } from './_lib/sessione.js';

const ATTESA_ERRORE_MS = 1000;

export async function POST(request: Request): Promise<Response> {
  const corpo = await leggiJson(request);
  if (typeof corpo !== 'object' || corpo === null) return json({ errore: 'Richiesta non valida' }, 400);
  const { email, password } = corpo as { email?: unknown; password?: unknown };
  if (!credenzialiValide(email, password)) {
    await new Promise((risolvi) => setTimeout(risolvi, ATTESA_ERRORE_MS));
    return json({ errore: 'Credenziali non valide' }, 401);
  }
  return json({ ok: true }, 200, { 'set-cookie': cookieSessione(creaToken()) });
}
