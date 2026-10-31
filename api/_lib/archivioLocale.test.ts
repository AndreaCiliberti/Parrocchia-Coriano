import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import type { Avviso } from '../../src/types/index.js';
import { ConflittoError, immaginiOrfane, serializza } from './archivio.js';
import { archivioLocale } from './archivioLocale.js';

const avviso = (id: string, immagine: string | null = null): Avviso => ({
  id, titolo: id, descrizioneBreve: '', testo: '', immagine, bozza: false,
});

async function radiceDiProva(avvisi: Avviso[] = [], immagini: string[] = []) {
  const radice = await mkdtemp(path.join(tmpdir(), 'avvisi-'));
  await mkdir(path.join(radice, 'src/data'), { recursive: true });
  await writeFile(path.join(radice, 'src/data/avvisi.json'), serializza(avvisi));
  await mkdir(path.join(radice, 'public/images/avvisi'), { recursive: true });
  for (const nome of immagini) await writeFile(path.join(radice, 'public/images/avvisi', nome), 'x');
  return radice;
}

test('immaginiOrfane considera solo /images/avvisi/ e ignora i file nascosti', () => {
  const avvisi = [avviso('aaaa', '/images/avvisi/usata.jpg'), avviso('bbbb', '/images/altra.jpg')];
  assert.deepEqual(immaginiOrfane(['usata.jpg', 'vecchia.jpg', '.gitkeep', 'altra.jpg'], avvisi), ['vecchia.jpg', 'altra.jpg']);
});

test('leggi restituisce avvisi e sha; file mancante = elenco vuoto', async () => {
  const radice = await radiceDiProva([avviso('aaaa')]);
  const stato = await archivioLocale(radice).leggi();
  assert.equal(stato.avvisi[0].id, 'aaaa');
  assert.match(stato.sha, /^[0-9a-f]{64}$/);

  const vuota = await mkdtemp(path.join(tmpdir(), 'avvisi-vuota-'));
  assert.deepEqual((await archivioLocale(vuota).leggi()).avvisi, []);
});

test('scrivi salva JSON e immagini nuove, elimina le orfane, restituisce il nuovo sha', async () => {
  const radice = await radiceDiProva([avviso('aaaa', '/images/avvisi/vecchia.jpg')], ['vecchia.jpg', '.gitkeep']);
  const archivio = archivioLocale(radice);
  const { sha } = await archivio.leggi();
  const nuovi = [avviso('bbbb', '/images/avvisi/nuova.jpg')];

  const esito = await archivio.scrivi(nuovi, [{ nome: 'nuova.jpg', byte: Buffer.from([1, 2, 3]) }], sha);

  assert.equal(await readFile(path.join(radice, 'src/data/avvisi.json'), 'utf8'), serializza(nuovi));
  assert.deepEqual((await readdir(path.join(radice, 'public/images/avvisi'))).sort(), ['.gitkeep', 'nuova.jpg']);
  assert.deepEqual(esito, { sha: (await archivio.leggi()).sha, commit: null });
});

test('sha diverso: ConflittoError e nessuna scrittura', async () => {
  const radice = await radiceDiProva([avviso('aaaa')]);
  const archivio = archivioLocale(radice);
  const { sha } = await archivio.leggi();
  await archivio.scrivi([avviso('bbbb')], [], sha);

  await assert.rejects(archivio.scrivi([avviso('cccc')], [], sha), ConflittoError);
  const stato = await archivio.leggi();
  assert.equal(stato.avvisi[0].id, 'bbbb');
});
