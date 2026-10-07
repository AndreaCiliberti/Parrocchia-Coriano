export function json(dati: unknown, status = 200, intestazioni: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(dati), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...intestazioni,
    },
  });
}

export async function leggiJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}

export function nonAutorizzato(): Response {
  return json({ errore: 'Sessione scaduta, accedi di nuovo' }, 401);
}
