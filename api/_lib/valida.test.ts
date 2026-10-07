import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MAX_BYTE_IMMAGINE, validaRichiestaPubblica } from './valida.js';

const JPEG = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
const dataUrl = (byte: Buffer, tipo = 'image/jpeg') => `data:${tipo};base64,${byte.toString('base64')}`;

const avviso = (extra: Record<string, unknown> = {}) => ({
  id: 'abcd1234',
  titolo: '  Festa  ',
  descrizioneBreve: ' Domenica ',
  testo: '<p>Ciao</p>',
  immagine: null,
  bozza: false,
  ...extra,
});

const richiesta = (extra: Record<string, unknown> = {}) => ({
  avvisi: [avviso()],
  nuoveImmagini: [],
  sha: 'abc',
  ...extra,
});

const errore = (corpo: unknown) => {
  const esito = validaRichiestaPubblica(corpo);
  assert.equal(esito.ok, false);
  return esito as { ok: false; status: number; errore: string };
};

test('richiesta valida: titolo e descrizione ripuliti dagli spazi', () => {
  const esito = validaRichiestaPubblica(richiesta());
  assert.ok(esito.ok);
  assert.equal(esito.dati.avvisi[0].titolo, 'Festa');
  assert.equal(esito.dati.avvisi[0].descrizioneBreve, 'Domenica');
  assert.equal(esito.dati.sha, 'abc');
});

test('elenco vuoto accettato', () => {
  assert.ok(validaRichiestaPubblica(richiesta({ avvisi: [] })).ok);
});

test('corpo non oggetto o sha mancante', () => {
  errore(undefined);
  errore([]);
  assert.match(errore(richiesta({ sha: undefined })).errore, /sha/);
});

test('titolo vuoto rifiutato con posizione', () => {
  assert.match(errore(richiesta({ avvisi: [avviso({ titolo: '   ' })] })).errore, /Avviso 1: il titolo è obbligatorio/);
});

test('id non valido o duplicato', () => {
  errore(richiesta({ avvisi: [avviso({ id: 'A B' })] }));
  assert.match(errore(richiesta({ avvisi: [avviso(), avviso()] })).errore, /stesso id/);
});

test('percorsi immagine pericolosi rifiutati, percorsi esistenti accettati', () => {
  errore(richiesta({ avvisi: [avviso({ immagine: '/images/../.env.jpg' })] }));
  errore(richiesta({ avvisi: [avviso({ immagine: 'https://evil.example/x.jpg' })] }));
  errore(richiesta({ avvisi: [avviso({ immagine: '/images/x.svg' })] }));
  assert.ok(validaRichiestaPubblica(richiesta({
    avvisi: [avviso({ immagine: '/images/WhatsApp-Image-2026-04-28-at-13.06.51.jpeg' })],
  })).ok);
});

test('immagine nuova valida', () => {
  const esito = validaRichiestaPubblica(richiesta({
    avvisi: [avviso({ immagine: '/images/avvisi/festa-abcd1234-x1y2.jpg' })],
    nuoveImmagini: [{ nome: 'festa-abcd1234-x1y2.jpg', dataUrl: dataUrl(JPEG) }],
  }));
  assert.ok(esito.ok);
  assert.deepEqual(esito.dati.nuoveImmagini[0].byte, JPEG);
});

test('immagine nuova non usata, nome non valido, non JPEG', () => {
  assert.match(errore(richiesta({
    nuoveImmagini: [{ nome: 'orfana-1.jpg', dataUrl: dataUrl(JPEG) }],
  })).errore, /non usata/);
  errore(richiesta({
    avvisi: [avviso({ immagine: '/images/avvisi/../x.jpg' })],
    nuoveImmagini: [{ nome: '../x.jpg', dataUrl: dataUrl(JPEG) }],
  }));
  errore(richiesta({
    avvisi: [avviso({ immagine: '/images/avvisi/a-1.jpg' })],
    nuoveImmagini: [{ nome: 'a-1.jpg', dataUrl: dataUrl(JPEG, 'image/png') }],
  }));
  errore(richiesta({
    avvisi: [avviso({ immagine: '/images/avvisi/a-1.jpg' })],
    nuoveImmagini: [{ nome: 'a-1.jpg', dataUrl: dataUrl(Buffer.from('ciao')) }],
  }));
});

test('immagine oltre 2 MB rifiutata con 413', () => {
  const grande = Buffer.concat([JPEG, Buffer.alloc(MAX_BYTE_IMMAGINE)]);
  const esito = errore(richiesta({
    avvisi: [avviso({ immagine: '/images/avvisi/a-1.jpg' })],
    nuoveImmagini: [{ nome: 'a-1.jpg', dataUrl: dataUrl(grande) }],
  }));
  assert.equal(esito.status, 413);
});
