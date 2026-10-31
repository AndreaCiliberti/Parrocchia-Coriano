import { json, nonAutorizzato } from './_lib/http.js';
import { richiestaAutenticata } from './_lib/sessione.js';

// Commit da cui è stato costruito il deploy che risponde: la dashboard lo
// confronta con quello appena pubblicato per sapere quando il sito è aggiornato.
export async function GET(request: Request): Promise<Response> {
  if (!richiestaAutenticata(request)) return nonAutorizzato();
  return json({ commit: process.env.VERCEL_GIT_COMMIT_SHA || null });
}
