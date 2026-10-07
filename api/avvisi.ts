import { creaArchivio } from './_lib/archivioScelto.js';
import { json, nonAutorizzato } from './_lib/http.js';
import { richiestaAutenticata } from './_lib/sessione.js';

export async function GET(request: Request): Promise<Response> {
  if (!richiestaAutenticata(request)) return nonAutorizzato();
  try {
    return json(await creaArchivio().leggi());
  } catch (e) {
    console.error(e);
    return json({
      errore: 'Impossibile leggere gli avvisi, riprova tra poco.',
      dettaglio: e instanceof Error ? e.message : String(e),
    }, 502);
  }
}
