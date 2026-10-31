import type { IncomingMessage } from 'node:http';
import { loadEnv, type Plugin } from 'vite';

const ROTTE: Record<string, string> = {
  '/api/login': '/api/login.ts',
  '/api/logout': '/api/logout.ts',
  '/api/avvisi': '/api/avvisi.ts',
  '/api/pubblica': '/api/pubblica.ts',
  '/api/versione': '/api/versione.ts',
};

type Handler = (request: Request) => Promise<Response>;

async function versoRequest(req: IncomingMessage): Promise<Request> {
  const intestazioni = new Headers();
  for (const [chiave, valore] of Object.entries(req.headers)) {
    if (typeof valore === 'string') intestazioni.set(chiave, valore);
    else if (Array.isArray(valore)) intestazioni.set(chiave, valore.join(', '));
  }
  const metodo = req.method ?? 'GET';
  let corpo: Uint8Array<ArrayBuffer> | undefined;
  if (metodo !== 'GET' && metodo !== 'HEAD') {
    const parti: Buffer[] = [];
    for await (const parte of req) parti.push(parte as Buffer);
    corpo = new Uint8Array(Buffer.concat(parti));
  }
  return new Request(new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`), {
    method: metodo,
    headers: intestazioni,
    body: corpo,
  });
}

/** Monta gli handler di api/ nel dev server di Vite, come farebbe Vercel. */
export function apiLocale(): Plugin {
  return {
    name: 'api-locale',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, server.config.root, ''));

      server.middlewares.use(async (req, res, next) => {
        const percorso = new URL(req.url ?? '/', 'http://localhost').pathname;
        if (percorso === '/admin' || percorso === '/admin/') {
          req.url = '/admin.html';
          return next();
        }
        const modulo = ROTTE[percorso];
        if (!modulo) return next();

        try {
          const esportazioni = (await server.ssrLoadModule(modulo)) as Record<string, unknown>;
          const handler = esportazioni[req.method ?? 'GET'] as Handler | undefined;
          if (typeof handler !== 'function') {
            res.statusCode = 405;
            res.end();
            return;
          }
          const risposta = await handler(await versoRequest(req));
          res.statusCode = risposta.status;
          risposta.headers.forEach((valore, chiave) => {
            if (chiave !== 'set-cookie') res.setHeader(chiave, valore);
          });
          const cookie = risposta.headers.getSetCookie();
          if (cookie.length > 0) res.setHeader('set-cookie', cookie);
          res.end(Buffer.from(await risposta.arrayBuffer()));
        } catch (e) {
          server.ssrFixStacktrace(e as Error);
          console.error(e);
          res.statusCode = 500;
          res.setHeader('content-type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ errore: 'Errore interno del server locale', dettaglio: String(e) }));
        }
      });
    },
  };
}
