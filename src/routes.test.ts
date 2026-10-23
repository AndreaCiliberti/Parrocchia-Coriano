import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PAGE_IDS, fullTitle, pageFromHash, pageFromPath, pathFor } from './routes';

test('every page round-trips through its path', () => {
  for (const page of PAGE_IDS) assert.equal(pageFromPath(pathFor(page)), page);
});

test('pageFromPath accepts trailing slashes and capitals', () => {
  assert.equal(pageFromPath('/orari-messe/'), 'orari-messe');
  assert.equal(pageFromPath('/Avvisi'), 'avvisi');
  assert.equal(pageFromPath(''), 'home');
});

test('pageFromPath returns null for unknown paths and for /home', () => {
  assert.equal(pageFromPath('/calendario/quarantore'), null);
  assert.equal(pageFromPath('/home'), null);
  assert.equal(pageFromPath('/admin'), null);
});

test('pageFromHash reads the old hash links', () => {
  assert.equal(pageFromHash('#avvisi'), 'avvisi');
  assert.equal(pageFromHash('#/storia'), 'storia');
  assert.equal(pageFromHash(''), null);
  assert.equal(pageFromHash('#capitolo-3'), null);
});

test('titles carry the site name, except the home', () => {
  assert.equal(fullTitle('avvisi'), 'Avvisi | Parrocchia Coriano');
  assert.equal(fullTitle(null), 'Pagina non trovata | Parrocchia Coriano');
  assert.ok(!fullTitle('home').endsWith('| Parrocchia Coriano'));
});
