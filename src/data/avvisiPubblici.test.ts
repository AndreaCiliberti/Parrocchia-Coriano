import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estratto, soloPubblicati } from './avvisiPubblici.js';
import type { Avviso } from '../types';

const avviso = (id: string, bozza: boolean): Avviso => ({
  id,
  titolo: id,
  descrizioneBreve: '',
  testo: '',
  immagine: null,
  bozza,
});

test('soloPubblicati scarta le bozze e mantiene l’ordine', () => {
  const lista = [avviso('a', false), avviso('b', true), avviso('c', false)];
  assert.deepEqual(soloPubblicati(lista).map((a) => a.id), ['a', 'c']);
});

test('estratto toglie i tag e unisce gli spazi', () => {
  assert.equal(
    estratto('<p>Confessioni il <strong>lunedì</strong>.</p><p>In chiesa.</p>', 200),
    'Confessioni il lunedì. In chiesa.',
  );
});

test('estratto decodifica le entità più comuni', () => {
  assert.equal(estratto('<p>Messa &amp; adorazione&nbsp;ore 18</p>', 200), 'Messa & adorazione ore 18');
});

test('estratto taglia sull’ultima parola intera e aggiunge i puntini', () => {
  assert.equal(estratto('<p>uno due tre quattro</p>', 12), 'uno due tre…');
});

test('estratto non aggiunge puntini se il testo sta nel limite', () => {
  assert.equal(estratto('<p>breve</p>', 12), 'breve');
});
