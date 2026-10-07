import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { credenzialiValide } from './credenziali.js';

beforeEach(() => {
  process.env.ADMIN_EMAIL = 'Parrocchia@Example.com';
  process.env.ADMIN_PASSWORD = 'segreta?1';
});

test('accetta email senza distinzione di maiuscole e spazi', () => {
  assert.equal(credenzialiValide('  parrocchia@example.COM ', 'segreta?1'), true);
});

test('la password distingue le maiuscole', () => {
  assert.equal(credenzialiValide('parrocchia@example.com', 'Segreta?1'), false);
});

test('email sbagliata rifiutata', () => {
  assert.equal(credenzialiValide('altro@example.com', 'segreta?1'), false);
});

test('valori non stringa rifiutati', () => {
  assert.equal(credenzialiValide(undefined, 'segreta?1'), false);
  assert.equal(credenzialiValide('parrocchia@example.com', 123), false);
});

test('credenziali non configurate generano un errore esplicito', () => {
  delete process.env.ADMIN_PASSWORD;
  assert.throws(() => credenzialiValide('a', 'b'), /ADMIN_EMAIL o ADMIN_PASSWORD/);
});
