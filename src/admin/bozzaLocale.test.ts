import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CHIAVE_BOZZA, cancellaBozza, leggiBozza, salvaBozza, type BozzaLocale } from './bozzaLocale.js';

function memoriaFinta() {
  const dati = new Map<string, string>();
  return {
    getItem: (k: string) => dati.get(k) ?? null,
    setItem: (k: string, v: string) => void dati.set(k, v),
    removeItem: (k: string) => void dati.delete(k),
    dati,
  };
}

const bozza: BozzaLocale = {
  avvisi: [{ id: 'abcd1234', titolo: 'T', descrizioneBreve: '', testo: '', immagine: null, bozza: true }],
  nuoveImmagini: { 'a-1.jpg': 'data:image/jpeg;base64,AAAA' },
  sha: 'abc',
};

test('salva e rilegge la bozza', () => {
  const m = memoriaFinta();
  assert.equal(salvaBozza(bozza, m), true);
  assert.deepEqual(leggiBozza(m), bozza);
});

test('nessuna bozza o bozza corrotta: null', () => {
  const m = memoriaFinta();
  assert.equal(leggiBozza(m), null);
  m.dati.set(CHIAVE_BOZZA, '{non json');
  assert.equal(leggiBozza(m), null);
  m.dati.set(CHIAVE_BOZZA, JSON.stringify({ avvisi: 'x' }));
  assert.equal(leggiBozza(m), null);
});

test('spazio esaurito: salvaBozza restituisce false senza lanciare', () => {
  const m = { ...memoriaFinta(), setItem: () => { throw new Error('QuotaExceededError'); } };
  assert.equal(salvaBozza(bozza, m), false);
});

test('memoria non disponibile: nessun errore', () => {
  assert.equal(leggiBozza(null), null);
  assert.equal(salvaBozza(bozza, null), false);
  assert.doesNotThrow(() => cancellaBozza(null));
});

test('cancellaBozza rimuove la bozza', () => {
  const m = memoriaFinta();
  salvaBozza(bozza, m);
  cancellaBozza(m);
  assert.equal(leggiBozza(m), null);
});
