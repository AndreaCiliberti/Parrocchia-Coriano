import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { POST as login } from '../login.js';
import { POST as logout } from '../logout.js';
import { GET as leggiAvvisi } from '../avvisi.js';
import { POST as pubblica } from '../pubblica.js';
import { serializza } from './archivio.js';
import { NOME_COOKIE, creaToken } from './sessione.js';

let radice = '';

before(async () => {
  process.env.SESSION_SECRET = 's'.repeat(64);
  process.env.ADMIN_EMAIL = 'admin@example.com';
  process.env.ADMIN_PASSWORD = 'pw';
  process.env.GITHUB_TOKEN = '';
  delete process.env.VERCEL;
  radice = await mkdtemp(path.join(tmpdir(), 'endpoint-'));
  await mkdir(path.join(radice, 'src/data'), { recursive: true });
  await writeFile(path.join(radice, 'src/data/avvisi.json'), serializza([]));
  process.chdir(radice);
});

const conCookie = (init: RequestInit = {}) => ({
  ...init,
  headers: { ...(init.headers as Record<string, string>), cookie: `${NOME_COOKIE}=${creaToken()}` },
});
const richiesta = (metodo: string, url: string, corpo?: unknown, init: RequestInit = {}) =>
  new Request(`http://localhost${url}`, {
    method: metodo,
    ...init,
    headers: { 'content-type': 'application/json', ...(init.headers as Record<string, string>) },
    body: corpo === undefined ? undefined : typeof corpo === 'string' ? corpo : JSON.stringify(corpo),
  });

test('login corretto imposta il cookie', async () => {
  const r = await login(richiesta('POST', '/api/login', { email: 'ADMIN@example.com', password: 'pw' }));
  assert.equal(r.status, 200);
  assert.match(r.headers.get('set-cookie') ?? '', /^sessione_admin=\d+\.[0-9a-f]+; .*HttpOnly/);
});

test('login errato: 401 senza cookie', async () => {
  const r = await login(richiesta('POST', '/api/login', { email: 'admin@example.com', password: 'no' }));
  assert.equal(r.status, 401);
  assert.equal(r.headers.get('set-cookie'), null);
  assert.equal((await r.json()).errore, 'Credenziali non valide');
});

test('login con corpo non JSON: 400', async () => {
  const r = await login(richiesta('POST', '/api/login', 'non json'));
  assert.equal(r.status, 400);
});

test('logout cancella il cookie', async () => {
  const r = await logout(richiesta('POST', '/api/logout', {}));
  assert.match(r.headers.get('set-cookie') ?? '', /Max-Age=0/);
});

test('endpoint protetti senza cookie: 401', async () => {
  assert.equal((await leggiAvvisi(richiesta('GET', '/api/avvisi'))).status, 401);
  assert.equal((await pubblica(richiesta('POST', '/api/pubblica', { avvisi: [], nuoveImmagini: [], sha: '' }))).status, 401);
});

test('lettura e pubblicazione in modalità locale, con sanificazione e nuovo sha', async () => {
  const lettura = await leggiAvvisi(richiesta('GET', '/api/avvisi', undefined, conCookie()));
  assert.equal(lettura.status, 200);
  const { sha } = await lettura.json();

  const avviso = {
    id: 'abcd1234', titolo: 'Festa', descrizioneBreve: '', testo: '<p>Ciao<script>alert(1)</script></p>',
    immagine: null, bozza: false,
  };
  const r = await pubblica(richiesta('POST', '/api/pubblica', { avvisi: [avviso], nuoveImmagini: [], sha }, conCookie()));
  assert.equal(r.status, 200);
  const esito = await r.json();
  assert.equal(esito.modalita, 'locale');
  assert.equal(esito.avvisi[0].testo, '<p>Ciao</p>');

  const salvato = JSON.parse(await readFile(path.join(radice, 'src/data/avvisi.json'), 'utf8'));
  assert.equal(salvato.avvisi[0].testo, '<p>Ciao</p>');

  const rilettura = await (await leggiAvvisi(richiesta('GET', '/api/avvisi', undefined, conCookie()))).json();
  assert.equal(esito.sha, rilettura.sha);

  const conflitto = await pubblica(richiesta('POST', '/api/pubblica', { avvisi: [], nuoveImmagini: [], sha }, conCookie()));
  assert.equal(conflitto.status, 409);
});

test('richiesta non valida: 400 con messaggio', async () => {
  const r = await pubblica(richiesta('POST', '/api/pubblica', { avvisi: 'x', nuoveImmagini: [], sha: 'a' }, conCookie()));
  assert.equal(r.status, 400);
  assert.match((await r.json()).errore, /Elenco avvisi/);
});
