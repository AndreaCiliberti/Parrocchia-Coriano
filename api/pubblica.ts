import { ConflittoError } from './_lib/archivio.js';
import { creaArchivio } from './_lib/archivioScelto.js';
import { avviaDeploy } from './_lib/deployHook.js';
import { json, leggiJson, nonAutorizzato } from './_lib/http.js';
import { sanificaTesto } from './_lib/sanifica.js';
import { richiestaAutenticata } from './_lib/sessione.js';
import { validaRichiestaPubblica } from './_lib/valida.js';

export async function POST(request: Request): Promise<Response> {
  if (!richiestaAutenticata(request)) return nonAutorizzato();
  const esito = validaRichiestaPubblica(await leggiJson(request));
  if (!esito.ok) return json({ errore: esito.errore }, esito.status);

  const { nuoveImmagini, sha } = esito.dati;
  const avvisi = esito.dati.avvisi.map((a) => ({ ...a, testo: sanificaTesto(a.testo) }));
  try {
    const archivio = creaArchivio();
    const nuovoSha = await archivio.scrivi(avvisi, nuoveImmagini, sha);
    if (archivio.modalita === 'github') await avviaDeploy();
    return json({ ok: true, modalita: archivio.modalita, avvisi, sha: nuovoSha });
  } catch (e) {
    if (e instanceof ConflittoError) return json({ errore: e.message }, 409);
    console.error(e);
    return json({
      errore: 'Pubblicazione non riuscita, riprova tra poco.',
      dettaglio: e instanceof Error ? e.message : String(e),
    }, 502);
  }
}
