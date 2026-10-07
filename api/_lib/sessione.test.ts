import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  DURATA_SECONDI, NOME_COOKIE, cookieCancellazione, cookieSessione, creaToken, leggiCookie, tokenValido,
} from './sessione.js';

beforeEach(() => {
  process.env.SESSION_SECRET = 'a'.repeat(64);
  delete process.env.VERCEL;
});

test('un token appena creato è valido', () => {
  assert.equal(tokenValido(creaToken()), true);
});

test('un token scaduto è rifiutato', () => {
  const token = creaToken(0);
  assert.equal(tokenValido(token, DURATA_SECONDI * 1000 + 1), false);
});

test('un token con scadenza modificata è rifiutato', () => {
  const [scadenza, firma] = creaToken().split('.');
  assert.equal(tokenValido(`${Number(scadenza) + 1000}.${firma}`), false);
});

test('token malformati rifiutati', () => {
  for (const t of [undefined, '', 'abc', 'a.b.c', '.', 'NaN.abc']) {
    assert.equal(tokenValido(t), false, `token: ${t}`);
  }
});

test('un token firmato con un altro segreto è rifiutato', () => {
  const token = creaToken();
  process.env.SESSION_SECRET = 'b'.repeat(64);
  assert.equal(tokenValido(token), false);
});

test('SESSION_SECRET mancante o corto genera un errore esplicito', () => {
  process.env.SESSION_SECRET = 'corto';
  assert.throws(() => creaToken(), /SESSION_SECRET/);
});

test('leggiCookie trova il cookie tra altri', () => {
  const r = new Request('http://x/', { headers: { cookie: `altro=1; ${NOME_COOKIE}=abc.def; z=2` } });
  assert.equal(leggiCookie(r), 'abc.def');
  assert.equal(leggiCookie(new Request('http://x/')), undefined);
});

test('attributi del cookie', () => {
  const c = cookieSessione('t.f');
  assert.match(c, /^sessione_admin=t\.f; /);
  assert.match(c, /HttpOnly/);
  assert.match(c, /SameSite=Strict/);
  assert.match(c, /Max-Age=604800/);
  assert.doesNotMatch(c, /Secure/);
  process.env.VERCEL = '1';
  assert.match(cookieSessione('t.f'), /Secure/);
  assert.match(cookieCancellazione(), /Max-Age=0/);
});
