import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { avviaDeploy } from './deployHook.js';

const URL_HOOK = 'https://api.vercel.com/v1/integrations/deploy/prj_x/abc';

afterEach(() => {
  delete process.env.VERCEL_DEPLOY_HOOK;
});

test('senza VERCEL_DEPLOY_HOOK non chiama nulla', async () => {
  let chiamate = 0;
  const esito = await avviaDeploy((async () => { chiamate++; return new Response(); }) as typeof fetch);
  assert.equal(esito, false);
  assert.equal(chiamate, 0);
});

test('con VERCEL_DEPLOY_HOOK fa una POST all\'indirizzo', async () => {
  process.env.VERCEL_DEPLOY_HOOK = ` ${URL_HOOK} `;
  const ricevute: { url: string; metodo?: string }[] = [];
  const esito = await avviaDeploy((async (url: string, init?: RequestInit) => {
    ricevute.push({ url, metodo: init?.method });
    return new Response('{}', { status: 201 });
  }) as typeof fetch);
  assert.equal(esito, true);
  assert.deepEqual(ricevute, [{ url: URL_HOOK, metodo: 'POST' }]);
});

test('errori del hook non vengono propagati', async () => {
  process.env.VERCEL_DEPLOY_HOOK = URL_HOOK;
  const errore = console.error;
  console.error = () => {};
  try {
    assert.equal(await avviaDeploy((async () => new Response('', { status: 500 })) as typeof fetch), false);
    assert.equal(await avviaDeploy((async () => { throw new Error('rete'); }) as typeof fetch), false);
  } finally {
    console.error = errore;
  }
});
