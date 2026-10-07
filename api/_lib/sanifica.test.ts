import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sanificaTesto } from './sanifica.js';

test('mantiene paragrafi, grassetto ed elenchi', () => {
  const html = '<p>Ciao <strong>tutti</strong></p><ul><li><p>uno</p></li><li><p>due</p></li></ul>';
  assert.equal(sanificaTesto(html), html);
});

test('aggiunge target e rel ai link esterni', () => {
  assert.equal(
    sanificaTesto('<p><a href="https://example.org">x</a></p>'),
    '<p><a href="https://example.org" target="_blank" rel="noopener noreferrer">x</a></p>',
  );
});

test('tel e mailto restano senza target', () => {
  assert.equal(
    sanificaTesto('<p><a href="tel:0541657167" target="_blank">t</a> <a href="mailto:a@b.it">m</a></p>'),
    '<p><a href="tel:0541657167">t</a> <a href="mailto:a@b.it">m</a></p>',
  );
});

test('rimuove i link javascript ma tiene il testo', () => {
  const out = sanificaTesto('<p><a href="javascript:alert(1)">x</a></p>');
  assert.ok(!out.includes('javascript'));
  assert.ok(out.includes('x'));
});

test('rimuove tag, stili e script incollati da Word o dal web', () => {
  const out = sanificaTesto(
    '<p style="color:red" class="MsoNormal"><span>Testo</span> <em>corsivo</em><script>alert(1)</script></p><h1>Titolo</h1><img src=x onerror=alert(1)>',
  );
  assert.equal(out, '<p>Testo corsivo</p>Titolo');
});

test('converte b in strong', () => {
  assert.equal(sanificaTesto('<p><b>x</b></p>'), '<p><strong>x</strong></p>');
});
