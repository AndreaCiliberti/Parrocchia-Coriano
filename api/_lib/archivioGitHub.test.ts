import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { Avviso } from '../../src/types/index.js';
import { ConflittoError, serializza } from './archivio.js';
import { archivioGitHub } from './archivioGitHub.js';

const avviso = (id: string, immagine: string | null = null): Avviso => ({
  id, titolo: id, descrizioneBreve: '', testo: '', immagine, bozza: false,
});
const b64 = (s: string) => Buffer.from(s).toString('base64');

type Gestore = (corpo: any) => [number, unknown];

function githubFinto(rotte: Record<string, Gestore>) {
  const chiamate: { chiave: string; corpo: any; auth: string | null }[] = [];
  const fetchFn = (async (url: string | URL | Request, init?: RequestInit) => {
    const u = new URL(String(url));
    const chiave = `${init?.method ?? 'GET'} ${u.pathname.replace('/repos/o/r', '')}${u.search}`;
    const corpo = init?.body ? JSON.parse(String(init.body)) : undefined;
    const intestazioni = new Headers(init?.headers);
    chiamate.push({ chiave, corpo, auth: intestazioni.get('authorization') });
    const gestore = rotte[chiave];
    if (!gestore) return new Response(`non previsto: ${chiave}`, { status: 404 });
    const [status, dati] = gestore(corpo);
    return new Response(JSON.stringify(dati), { status });
  }) as typeof fetch;
  return { fetchFn, chiamate };
}

const config = { token: 'tok', repo: 'o/r', branch: 'main' };

function rotteScrittura(extra: Record<string, Gestore> = {}): Record<string, Gestore> {
  let blob = 0;
  return {
    'GET /git/ref/heads/main': () => [200, { object: { sha: 'testa' } }],
    'GET /git/commits/testa': () => [200, { tree: { sha: 'albero0' } }],
    'GET /contents/src/data/avvisi.json?ref=testa': () => [200, { content: b64(serializza([avviso('aaaa')])), sha: 'shaFile' }],
    'GET /contents/public/images/avvisi?ref=testa': () => [200, [
      { name: 'vecchia.jpg', type: 'file' },
      { name: 'tenuta.jpg', type: 'file' },
    ]],
    'POST /git/blobs': () => [201, { sha: `blob${++blob}` }],
    'POST /git/trees': () => [201, { sha: 'albero1' }],
    'POST /git/commits': () => [201, { sha: 'commit1' }],
    'PATCH /git/refs/heads/main': () => [200, {}],
    ...extra,
  };
}

test('repo non valido rifiutato', () => {
  assert.throws(() => archivioGitHub({ ...config, repo: '' }), /GITHUB_REPO/);
});

test('leggi decodifica il JSON e usa il token', async () => {
  const { fetchFn, chiamate } = githubFinto({
    'GET /contents/src/data/avvisi.json?ref=main': () => [200, { content: b64(serializza([avviso('aaaa')])), sha: 'shaFile' }],
  });
  const stato = await archivioGitHub(config, fetchFn).leggi();
  assert.equal(stato.avvisi[0].id, 'aaaa');
  assert.equal(stato.sha, 'shaFile');
  assert.equal(chiamate[0].auth, 'Bearer tok');
});

test('scrivi crea un solo commit con JSON, immagine nuova e cancellazione delle orfane', async () => {
  const { fetchFn, chiamate } = githubFinto(rotteScrittura());
  const avvisi = [avviso('bbbb', '/images/avvisi/nuova.jpg'), avviso('cccc', '/images/avvisi/tenuta.jpg')];

  const nuovoSha = await archivioGitHub(config, fetchFn).scrivi(
    avvisi, [{ nome: 'nuova.jpg', byte: Buffer.from([1, 2, 3]) }], 'shaFile',
  );

  const blobJson = chiamate.find((c) => c.chiave === 'POST /git/blobs' && c.corpo.encoding === 'utf-8');
  assert.equal(blobJson?.corpo.content, serializza(avvisi));
  const albero = chiamate.find((c) => c.chiave === 'POST /git/trees')!.corpo;
  assert.equal(albero.base_tree, 'albero0');
  assert.deepEqual(albero.tree, [
    { path: 'src/data/avvisi.json', mode: '100644', type: 'blob', sha: 'blob1' },
    { path: 'public/images/avvisi/nuova.jpg', mode: '100644', type: 'blob', sha: 'blob2' },
    { path: 'public/images/avvisi/vecchia.jpg', mode: '100644', type: 'blob', sha: null },
  ]);
  const commit = chiamate.find((c) => c.chiave === 'POST /git/commits')!.corpo;
  assert.deepEqual(commit.parents, ['testa']);
  assert.equal(commit.tree, 'albero1');
  assert.deepEqual(chiamate.find((c) => c.chiave === 'PATCH /git/refs/heads/main')!.corpo, { sha: 'commit1', force: false });
  assert.equal(nuovoSha, 'blob1');
});

test('sha diverso: ConflittoError prima di qualsiasi scrittura', async () => {
  const { fetchFn, chiamate } = githubFinto(rotteScrittura());
  await assert.rejects(archivioGitHub(config, fetchFn).scrivi([avviso('bbbb')], [], 'vecchio'), ConflittoError);
  assert.equal(chiamate.some((c) => c.chiave.startsWith('POST') || c.chiave.startsWith('PATCH')), false);
});

test('ref avanzato nel frattempo (422): ConflittoError', async () => {
  const { fetchFn } = githubFinto(rotteScrittura({ 'PATCH /git/refs/heads/main': () => [422, { message: 'not fast forward' }] }));
  await assert.rejects(archivioGitHub(config, fetchFn).scrivi([avviso('bbbb')], [], 'shaFile'), ConflittoError);
});

test('cartella immagini assente (404): nessuna cancellazione', async () => {
  const rotte = rotteScrittura();
  delete rotte['GET /contents/public/images/avvisi?ref=testa'];
  const { fetchFn, chiamate } = githubFinto(rotte);
  await archivioGitHub(config, fetchFn).scrivi([avviso('bbbb')], [], 'shaFile');
  const albero = chiamate.find((c) => c.chiave === 'POST /git/trees')!.corpo;
  assert.equal(albero.tree.length, 1);
});

test('errore GitHub generico propagato con lo status', async () => {
  const { fetchFn } = githubFinto({ 'GET /contents/src/data/avvisi.json?ref=main': () => [500, { message: 'boom' }] });
  await assert.rejects(archivioGitHub(config, fetchFn).leggi(), (e: any) => e.name === 'ErroreGitHub' && e.status === 500);
});
