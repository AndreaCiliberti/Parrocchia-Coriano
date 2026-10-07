import { json } from './_lib/http.js';
import { cookieCancellazione } from './_lib/sessione.js';

export async function POST(_request?: Request): Promise<Response> {
  return json({ ok: true }, 200, { 'set-cookie': cookieCancellazione() });
}
