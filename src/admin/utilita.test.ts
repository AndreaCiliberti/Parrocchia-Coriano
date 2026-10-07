import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RE_NOME_IMMAGINE } from '../../api/_lib/valida.js';
import {
  LIMITE_RICHIESTA_BYTE, byteDaDataUrl, nomeDaPercorso, nomeImmagine, normalizzaLink, nuovoId, slug, sposta,
  superaLimite,
} from './utilita.js';

test('nuovoId: 10 caratteri minuscoli e cifre, diversi tra loro', () => {
  const id = nuovoId();
  assert.match(id, /^[a-z0-9]{10}$/);
  assert.notEqual(nuovoId(), id);
});

test('slug: accenti, apostrofi, emoji, titoli vuoti e lunghi', () => {
  assert.equal(slug("Festa d'estate è qui!"), 'festa-d-estate-e-qui');
  assert.equal(slug('📌 Confessioni'), 'confessioni');
  assert.equal(slug('🎉🎉'), 'avviso');
  assert.equal(slug(''), 'avviso');
  assert.ok(slug('a'.repeat(100)).length <= 40);
  assert.doesNotMatch(slug('parola '.repeat(10)), /-$/);
});

test('nomeImmagine passa sempre la validazione del server', () => {
  for (const titolo of ["Festa d'estate è qui!", '📌', '', 'Ç'.repeat(300), 'LA DIOCESI DI RIMINI ACCOGLIE IL PAPA']) {
    const nome = nomeImmagine(titolo, nuovoId());
    assert.match(nome, RE_NOME_IMMAGINE, nome);
  }
});

test('nomeDaPercorso', () => {
  assert.equal(nomeDaPercorso('/images/avvisi/a-1.jpg'), 'a-1.jpg');
  assert.equal(nomeDaPercorso('/images/altro.jpg'), null);
});

test('normalizzaLink completa link scritti a mano', () => {
  assert.equal(normalizzaLink(' https://example.org '), 'https://example.org');
  assert.equal(normalizzaLink('www.diocesi.rimini.it'), 'https://www.diocesi.rimini.it');
  assert.equal(normalizzaLink('parrocchiacoriano@gmail.com'), 'mailto:parrocchiacoriano@gmail.com');
  assert.equal(normalizzaLink('0541 657167'), 'tel:0541657167');
  assert.equal(normalizzaLink('+39 338 928 4013'), 'tel:+393389284013');
  assert.equal(normalizzaLink('mailto:a@b.it'), 'mailto:a@b.it');
  assert.equal(normalizzaLink('tel:123456'), 'tel:123456');
});

test('limite della richiesta in byte (non in caratteri)', () => {
  assert.equal(superaLimite('a'.repeat(LIMITE_RICHIESTA_BYTE)), false);
  assert.equal(superaLimite('a'.repeat(LIMITE_RICHIESTA_BYTE + 1)), true);
  assert.equal(superaLimite('è'.repeat(LIMITE_RICHIESTA_BYTE / 2 + 1)), true);
});

test('byteDaDataUrl stima la dimensione decodificata', () => {
  const dati = Buffer.alloc(3000);
  assert.equal(byteDaDataUrl(`data:image/jpeg;base64,${dati.toString('base64')}`), 3000);
});

test('sposta: su, giù e fuori dai limiti', () => {
  assert.deepEqual(sposta(['a', 'b', 'c'], 1, 0), ['b', 'a', 'c']);
  assert.deepEqual(sposta(['a', 'b', 'c'], 1, 2), ['a', 'c', 'b']);
  const lista = ['a', 'b'];
  assert.equal(sposta(lista, 0, -1), lista);
  assert.equal(sposta(lista, 1, 2), lista);
});
