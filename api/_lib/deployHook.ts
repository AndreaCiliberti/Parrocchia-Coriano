// Chiede a Vercel un nuovo deploy dopo una pubblicazione, senza dipendere
// dall'arrivo del push da GitHub. Non fallisce mai: il commit è già fatto.
export async function avviaDeploy(fetchFn: typeof fetch = fetch): Promise<boolean> {
  const url = process.env.VERCEL_DEPLOY_HOOK?.trim();
  if (!url) return false;
  try {
    const risposta = await fetchFn(url, { method: 'POST' });
    if (!risposta.ok) console.error(`Deploy hook: risposta ${risposta.status}`);
    return risposta.ok;
  } catch (e) {
    console.error('Deploy hook non raggiungibile', e);
    return false;
  }
}
