# Dashboard Avvisi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Area riservata `/admin` per gestire gli avvisi della pagina `#avvisi`, salvati in un file JSON nel repository e pubblicati con un commit GitHub (o su disco in locale).

**Architecture:** Gli avvisi passano da JSX scritto a mano a `src/data/avvisi.json`, letto dalla pagina pubblica. Quattro funzioni Vercel in `api/` (login, logout, lettura, pubblicazione) con handler Web-standard `Request → Response`; la logica sta in `api/_lib/`. Un'astrazione `Archivio` scrive su GitHub (Git Data API, un commit) se `GITHUB_TOKEN` è impostato, altrimenti su disco. Un plugin Vite monta gli stessi handler nel dev server, così `npm run dev` basta per provare tutto. La dashboard è un secondo entry point Vite (`admin.html`) con editor Tiptap.

**Tech Stack:** React 19, TypeScript, Vite 8 (rolldown), Tailwind v4, Tiptap 3 (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/pm`), `sanitize-html`, Vercel Functions (Node), `node:test` + `tsx`.

**Spec:** `docs/superpowers/specs/2026-10-06-dashboard-avvisi-design.md`

## Global Constraints

- Tutti i testi visibili all'utente sono in italiano.
- Palette: `#1C244B` (titoli), `#324A6D` (testo), `#467FF7` (accento/link), `#F9FAFD` (sfondo scheda), `#F3F5F8` (sfondo secondario). Nessun colore nuovo.
- Nessun nuovo servizio di terze parti contattato dai visitatori del sito.
- Segreti solo in variabili d'ambiente: `.env.local` in locale (già ignorato da `.env*` in `.gitignore`, non va mai committato), Environment Variables su Vercel.
- Variabili: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET` (≥ 32 caratteri), `GITHUB_TOKEN` (vuoto in locale), `GITHUB_REPO` (`AndreaCiliberti/Parrocchia-Coriano`), `GITHUB_BRANCH` (`main`).
- Cookie: `sessione_admin`, `HttpOnly; SameSite=Strict; Path=/`, `Secure` solo su Vercel, durata 7 giorni.
- Testo avviso: solo tag `p`, `br`, `strong`, `a` (schemi `http`, `https`, `mailto`, `tel`), `ul`, `li`.
- Immagini nuove: JPEG, lato lungo ≤ 1600 px, qualità 0.82, ≤ 2 MB ciascuna, salvate in `public/images/avvisi/`, nome `^[a-z0-9][a-z0-9-]{0,80}\.jpg$`. Corpo della richiesta di pubblicazione ≤ 4 MB (limite Vercel 4,5 MB).
- File in `api/`: import relativi con estensione `.js` (es. `./_lib/http.js`); handler esportati come `export async function POST(request: Request): Promise<Response>`.
- Non toccare il blocco `server.hmr`/`watch` (`DISABLE_HMR`) in `vite.config.ts`.
- Un commit per task, con trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Nessun push.

## Review Focus

1. **Corpo della pubblicazione oltre il limite di Vercel** (molte foto nuove insieme): la dashboard deve bloccare prima dell'invio con un messaggio chiaro invece di ricevere un 413 opaco. Test: `superaLimite` in Task 9.
2. **Sessione scaduta o spazio del browser esaurito durante il lavoro**: le modifiche non devono andare perse; `salvaBozza` deve segnalare l'errore di quota senza lanciare eccezioni. Test: `bozzaLocale` in Task 9.
3. **Link scritti "a mano"** (`www.sito.it`, un'email, un numero di telefono): devono diventare link funzionanti (`https://`, `mailto:`, `tel:`). Test: `normalizzaLink` in Task 9.
4. **Titoli con accenti, apostrofi, emoji o vuoti** usati per il nome dell'immagine: il nome generato deve sempre passare la validazione del server. Test: `nomeImmagine` contro `RE_NOME_IMMAGINE` in Task 9.
5. **Due pubblicazioni ravvicinate o da due dispositivi**: la seconda non deve sovrascrivere la prima (409), e dopo una pubblicazione riuscita la dashboard deve usare il nuovo `sha` restituito dal server, non rileggere GitHub (che potrebbe essere ancora indietro). Test: `scrivi` restituisce il nuovo sha in Task 4 e Task 5; handler in Task 6.

---

## File Structure

| File | Responsabilità |
|------|----------------|
| `src/types/index.ts` (modifica) | Tipi `Avviso`, `FileAvvisi`, `NuovaImmagine`, `RichiestaPubblica` |
| `api/_lib/sanifica.ts` | Pulizia HTML del testo (whitelist) |
| `api/_lib/sessione.ts` | Creazione/verifica cookie firmato |
| `api/_lib/credenziali.ts` | Confronto credenziali a tempo costante |
| `api/_lib/valida.ts` | Validazione del corpo di `/api/pubblica` |
| `api/_lib/archivio.ts` | Interfaccia `Archivio`, `ConflittoError`, serializzazione, immagini orfane |
| `api/_lib/archivioLocale.ts` | Archivio su disco |
| `api/_lib/archivioGitHub.ts` | Archivio su GitHub (un commit) |
| `api/_lib/archivioScelto.ts` | Sceglie l'archivio in base alle variabili d'ambiente |
| `api/_lib/http.ts` | Helper risposte JSON |
| `api/login.ts`, `api/logout.ts`, `api/avvisi.ts`, `api/pubblica.ts` | Endpoint |
| `dev/apiLocale.ts` | Plugin Vite: monta `api/` nel dev server, rewrite `/admin` |
| `vercel.json` | Rewrite `/admin` → `/admin.html` |
| `src/data/avvisi.json` | Contenuto degli avvisi |
| `src/components/AvvisoCard.tsx` | Scheda avviso (sito e anteprima) |
| `src/pages/AvvisiPage.tsx` (modifica) | Legge il JSON |
| `src/index.css` (modifica) | Stili `.testo-avviso` |
| `src/admin/utilita.ts` | id, slug, nome immagine, link, limiti, spostamento |
| `src/admin/bozzaLocale.ts` | Modifiche non pubblicate in `localStorage` |
| `src/admin/immagini.ts` | Ridimensionamento immagini nel browser |
| `src/admin/api.ts` | Client delle API |
| `src/admin/Login.tsx`, `EditorTesto.tsx`, `EditorAvviso.tsx`, `AdminApp.tsx`, `main.tsx` | Interfaccia dashboard |
| `admin.html` | Entry point della dashboard |

---

### Task 1: Dipendenze, tipi e sanificazione del testo

**Files:**
- Modify: `package.json` (dipendenze, script `test`)
- Modify: `tsconfig.json`
- Modify: `src/types/index.ts` (in fondo al file)
- Create: `api/_lib/sanifica.ts`
- Test: `api/_lib/sanifica.test.ts`

**Interfaces:**
- Produces: `sanificaTesto(html: string): string`; tipi `Avviso`, `FileAvvisi`, `NuovaImmagine`, `RichiestaPubblica` da `src/types/index.ts`; script `npm test`.

- [ ] **Step 1: Installare le dipendenze**

Run:
```bash
npm install sanitize-html @tiptap/react @tiptap/starter-kit @tiptap/pm
npm install -D @types/sanitize-html
```
Expected: installazione senza errori; `@tiptap/react` alla versione 3.x.

- [ ] **Step 2: Aggiungere lo script di test**

In `package.json`, dentro `"scripts"`, dopo `"lint"`:
```json
    "lint": "tsc --noEmit",
    "test": "node --import tsx --test \"api/**/*.test.ts\""
```

- [ ] **Step 3: Aggiornare `tsconfig.json`**

Sostituire `"types": ["vite/client"],` con:
```json
    "types": ["vite/client", "node"],
    "resolveJsonModule": true,
```

- [ ] **Step 4: Aggiungere i tipi in fondo a `src/types/index.ts`**

```ts
export interface Avviso {
  id: string;
  titolo: string;
  descrizioneBreve: string;
  /** HTML ristretto: p, br, strong, a, ul, li */
  testo: string;
  /** Percorso sotto /images/ oppure null */
  immagine: string | null;
  bozza: boolean;
}

export interface FileAvvisi {
  avvisi: Avviso[];
}

export interface NuovaImmagine {
  nome: string;
  dataUrl: string;
}

export interface RichiestaPubblica {
  avvisi: Avviso[];
  nuoveImmagini: NuovaImmagine[];
  sha: string;
}
```

- [ ] **Step 5: Scrivere il test che fallisce**

`api/_lib/sanifica.test.ts`:
```ts
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
```

- [ ] **Step 6: Eseguire il test e verificare che fallisca**

Run: `npm test`
Expected: FAIL, `Cannot find module` / `ERR_MODULE_NOT_FOUND` per `./sanifica.js`.

- [ ] **Step 7: Implementare**

`api/_lib/sanifica.ts`:
```ts
import sanitizeHtml from 'sanitize-html';

const TAG_AMMESSI = ['p', 'br', 'strong', 'a', 'ul', 'li'];

export function sanificaTesto(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: TAG_AMMESSI,
    allowedAttributes: { a: ['href', 'target', 'rel'] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowProtocolRelative: false,
    transformTags: {
      b: 'strong',
      a: (_tag, attribs) => {
        const href = attribs.href ?? '';
        const esterno = /^https?:/i.test(href);
        return {
          tagName: 'a',
          attribs: esterno ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href },
        };
      },
    },
  }).trim();
}
```

- [ ] **Step 8: Eseguire i test**

Run: `npm test`
Expected: 6 test PASS. Se il test "Word" differisce solo per spazi, verificare l'output reale e correggere l'implementazione (non il test) finché tag e attributi non ammessi spariscono.

- [ ] **Step 9: Type-check**

Run: `npm run lint`
Expected: nessun errore.

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json tsconfig.json src/types/index.ts api/_lib/sanifica.ts api/_lib/sanifica.test.ts
git commit -m "feat(avvisi): add notice types and HTML sanitizer

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Sessione e credenziali

**Files:**
- Create: `api/_lib/sessione.ts`, `api/_lib/credenziali.ts`
- Test: `api/_lib/sessione.test.ts`, `api/_lib/credenziali.test.ts`

**Interfaces:**
- Produces:
  - `NOME_COOKIE = 'sessione_admin'`, `DURATA_SECONDI = 604800`
  - `creaToken(adesso?: number): string`
  - `tokenValido(token: string | undefined, adesso?: number): boolean`
  - `leggiCookie(request: Request, nome?: string): string | undefined`
  - `richiestaAutenticata(request: Request): boolean`
  - `cookieSessione(token: string): string`, `cookieCancellazione(): string`
  - `credenzialiValide(email: unknown, password: unknown): boolean`

- [ ] **Step 1: Scrivere i test**

`api/_lib/sessione.test.ts`:
```ts
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
```

`api/_lib/credenziali.test.ts`:
```ts
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
```

- [ ] **Step 2: Eseguire i test e verificare che falliscano**

Run: `npm test`
Expected: FAIL, moduli `./sessione.js` e `./credenziali.js` non trovati.

- [ ] **Step 3: Implementare `api/_lib/sessione.ts`**

```ts
import { createHmac, timingSafeEqual } from 'node:crypto';

export const NOME_COOKIE = 'sessione_admin';
export const DURATA_SECONDI = 7 * 24 * 60 * 60;

function segreto(): string {
  const valore = process.env.SESSION_SECRET;
  if (!valore || valore.length < 32) {
    throw new Error('SESSION_SECRET mancante o troppo corto (minimo 32 caratteri)');
  }
  return valore;
}

function firma(valore: string): string {
  return createHmac('sha256', segreto()).update(valore).digest('hex');
}

export function creaToken(adesso = Date.now()): string {
  const scadenza = String(adesso + DURATA_SECONDI * 1000);
  return `${scadenza}.${firma(scadenza)}`;
}

export function tokenValido(token: string | undefined, adesso = Date.now()): boolean {
  if (!token) return false;
  const [scadenza, firmaRicevuta, ...resto] = token.split('.');
  if (!scadenza || !firmaRicevuta || resto.length > 0) return false;
  const attesa = Buffer.from(firma(scadenza));
  const ricevuta = Buffer.from(firmaRicevuta);
  if (attesa.length !== ricevuta.length || !timingSafeEqual(attesa, ricevuta)) return false;
  return Number(scadenza) > adesso;
}

export function leggiCookie(request: Request, nome = NOME_COOKIE): string | undefined {
  const intestazione = request.headers.get('cookie') ?? '';
  for (const parte of intestazione.split(';')) {
    const [chiave, ...valore] = parte.trim().split('=');
    if (chiave === nome) return valore.join('=');
  }
  return undefined;
}

export function richiestaAutenticata(request: Request): boolean {
  return tokenValido(leggiCookie(request));
}

function attributi(maxAge: number): string {
  const secure = process.env.VERCEL ? '; Secure' : '';
  return `Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

export function cookieSessione(token: string): string {
  return `${NOME_COOKIE}=${token}; ${attributi(DURATA_SECONDI)}`;
}

export function cookieCancellazione(): string {
  return `${NOME_COOKIE}=; ${attributi(0)}`;
}
```

- [ ] **Step 4: Implementare `api/_lib/credenziali.ts`**

```ts
import { createHash, timingSafeEqual } from 'node:crypto';

const impronta = (valore: string) => createHash('sha256').update(valore).digest();
const uguali = (a: string, b: string) => timingSafeEqual(impronta(a), impronta(b));

export function credenzialiValide(email: unknown, password: unknown): boolean {
  const emailAttesa = process.env.ADMIN_EMAIL;
  const passwordAttesa = process.env.ADMIN_PASSWORD;
  if (!emailAttesa || !passwordAttesa) {
    throw new Error('ADMIN_EMAIL o ADMIN_PASSWORD non configurati');
  }
  if (typeof email !== 'string' || typeof password !== 'string') return false;
  const emailOk = uguali(email.trim().toLowerCase(), emailAttesa.trim().toLowerCase());
  const passwordOk = uguali(password, passwordAttesa);
  return emailOk && passwordOk;
}
```

- [ ] **Step 5: Eseguire i test**

Run: `npm test`
Expected: tutti PASS.

- [ ] **Step 6: Commit**

```bash
git add api/_lib/sessione.ts api/_lib/sessione.test.ts api/_lib/credenziali.ts api/_lib/credenziali.test.ts
git commit -m "feat(avvisi): add signed session cookie and credential check

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Validazione della richiesta di pubblicazione

**Files:**
- Create: `api/_lib/valida.ts`
- Test: `api/_lib/valida.test.ts`

**Interfaces:**
- Consumes: tipo `Avviso` da `src/types/index.ts`.
- Produces:
  - `CARTELLA_IMMAGINI = '/images/avvisi/'`, `RE_NOME_IMMAGINE`, `MAX_BYTE_IMMAGINE = 2097152`
  - `interface ImmagineDaSalvare { nome: string; byte: Buffer }`
  - `interface RichiestaPubblicaValida { avvisi: Avviso[]; nuoveImmagini: ImmagineDaSalvare[]; sha: string }`
  - `type EsitoValidazione = { ok: true; dati: RichiestaPubblicaValida } | { ok: false; status: 400 | 413; errore: string }`
  - `validaRichiestaPubblica(corpo: unknown): EsitoValidazione`

- [ ] **Step 1: Scrivere i test**

`api/_lib/valida.test.ts`:
```ts
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
```

- [ ] **Step 2: Eseguire i test e verificare che falliscano**

Run: `npm test`
Expected: FAIL, modulo `./valida.js` non trovato.

- [ ] **Step 3: Implementare `api/_lib/valida.ts`**

```ts
import type { Avviso } from '../../src/types/index.js';

export const CARTELLA_IMMAGINI = '/images/avvisi/';
export const MAX_AVVISI = 30;
export const MAX_IMMAGINI_NUOVE = 10;
export const MAX_BYTE_IMMAGINE = 2 * 1024 * 1024;
export const RE_NOME_IMMAGINE = /^[a-z0-9][a-z0-9-]{0,80}\.jpg$/;

const MAX_TITOLO = 200;
const MAX_DESCRIZIONE = 300;
const MAX_TESTO = 20000;
const RE_ID = /^[a-z0-9]{4,24}$/;
const RE_PERCORSO_IMMAGINE = /^\/images\/[A-Za-z0-9._/-]+\.(jpe?g|png|webp)$/i;
const PREFISSO_DATA_URL = 'data:image/jpeg;base64,';

export interface ImmagineDaSalvare {
  nome: string;
  byte: Buffer;
}

export interface RichiestaPubblicaValida {
  avvisi: Avviso[];
  nuoveImmagini: ImmagineDaSalvare[];
  sha: string;
}

export type EsitoValidazione =
  | { ok: true; dati: RichiestaPubblicaValida }
  | { ok: false; status: 400 | 413; errore: string };

const errore = (messaggio: string, status: 400 | 413 = 400): EsitoValidazione => ({ ok: false, status, errore: messaggio });

const isOggetto = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

function validaAvviso(valore: unknown, posizione: number): Avviso | string {
  const n = posizione + 1;
  if (!isOggetto(valore)) return `Avviso ${n}: formato non valido`;
  const { id, titolo, descrizioneBreve, testo, immagine, bozza } = valore;
  if (typeof id !== 'string' || !RE_ID.test(id)) return `Avviso ${n}: id non valido`;
  if (typeof titolo !== 'string' || !titolo.trim()) return `Avviso ${n}: il titolo è obbligatorio`;
  if (titolo.length > MAX_TITOLO) return `Avviso ${n}: titolo troppo lungo (max ${MAX_TITOLO} caratteri)`;
  if (typeof descrizioneBreve !== 'string' || descrizioneBreve.length > MAX_DESCRIZIONE) {
    return `Avviso ${n}: descrizione breve non valida (max ${MAX_DESCRIZIONE} caratteri)`;
  }
  if (typeof testo !== 'string' || testo.length > MAX_TESTO) return `Avviso ${n}: testo non valido o troppo lungo`;
  if (
    immagine !== null &&
    (typeof immagine !== 'string' || !RE_PERCORSO_IMMAGINE.test(immagine) || immagine.includes('..'))
  ) {
    return `Avviso ${n}: percorso immagine non valido`;
  }
  if (typeof bozza !== 'boolean') return `Avviso ${n}: stato bozza non valido`;
  return {
    id,
    titolo: titolo.trim(),
    descrizioneBreve: descrizioneBreve.trim(),
    testo,
    immagine: immagine as string | null,
    bozza,
  };
}

export function validaRichiestaPubblica(corpo: unknown): EsitoValidazione {
  if (!isOggetto(corpo)) return errore('Richiesta non valida');
  const { avvisi, nuoveImmagini, sha } = corpo;
  if (typeof sha !== 'string') return errore('Versione (sha) mancante');
  if (!Array.isArray(avvisi)) return errore('Elenco avvisi mancante');
  if (avvisi.length > MAX_AVVISI) return errore(`Troppi avvisi (max ${MAX_AVVISI})`);

  const validi: Avviso[] = [];
  for (const [i, valore] of avvisi.entries()) {
    const risultato = validaAvviso(valore, i);
    if (typeof risultato === 'string') return errore(risultato);
    validi.push(risultato);
  }
  if (new Set(validi.map((a) => a.id)).size !== validi.length) return errore('Ci sono due avvisi con lo stesso id');

  if (!Array.isArray(nuoveImmagini)) return errore('Elenco immagini mancante');
  if (nuoveImmagini.length > MAX_IMMAGINI_NUOVE) {
    return errore(`Troppe immagini nuove in una volta (max ${MAX_IMMAGINI_NUOVE})`, 413);
  }
  const usate = new Set(validi.map((a) => a.immagine).filter((p): p is string => p !== null));
  const immagini: ImmagineDaSalvare[] = [];
  for (const img of nuoveImmagini) {
    if (!isOggetto(img) || typeof img.nome !== 'string' || typeof img.dataUrl !== 'string') {
      return errore('Immagine non valida');
    }
    if (!RE_NOME_IMMAGINE.test(img.nome)) return errore(`Nome immagine non valido: ${img.nome}`);
    if (!usate.has(CARTELLA_IMMAGINI + img.nome)) return errore(`Immagine non usata da nessun avviso: ${img.nome}`);
    if (!img.dataUrl.startsWith(PREFISSO_DATA_URL)) return errore(`L'immagine ${img.nome} non è un JPEG`);
    const byte = Buffer.from(img.dataUrl.slice(PREFISSO_DATA_URL.length), 'base64');
    if (byte.length > MAX_BYTE_IMMAGINE) return errore(`L'immagine ${img.nome} è troppo grande (max 2 MB)`, 413);
    if (byte.length < 3 || byte[0] !== 0xff || byte[1] !== 0xd8 || byte[2] !== 0xff) {
      return errore(`L'immagine ${img.nome} non è un JPEG valido`);
    }
    immagini.push({ nome: img.nome, byte });
  }

  return { ok: true, dati: { avvisi: validi, nuoveImmagini: immagini, sha } };
}
```

- [ ] **Step 4: Eseguire i test**

Run: `npm test`
Expected: tutti PASS.

- [ ] **Step 5: Type-check e commit**

Run: `npm run lint` (nessun errore), poi:
```bash
git add api/_lib/valida.ts api/_lib/valida.test.ts
git commit -m "feat(avvisi): validate publish requests

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Archivio comune e archivio locale

**Files:**
- Create: `api/_lib/archivio.ts`, `api/_lib/archivioLocale.ts`
- Test: `api/_lib/archivioLocale.test.ts`

**Interfaces:**
- Consumes: `Avviso`; `CARTELLA_IMMAGINI`, `ImmagineDaSalvare` da `./valida.js`.
- Produces (`archivio.ts`):
  - `PERCORSO_JSON = 'src/data/avvisi.json'`, `CARTELLA_IMMAGINI_REPO = 'public/images/avvisi'`
  - `interface StatoArchivio { avvisi: Avviso[]; sha: string }`
  - `interface Archivio { modalita: 'github' | 'locale'; leggi(): Promise<StatoArchivio>; scrivi(avvisi: Avviso[], nuoveImmagini: ImmagineDaSalvare[], shaAtteso: string): Promise<string> }` — `scrivi` restituisce lo sha nuovo del JSON
  - `class ConflittoError extends Error`
  - `serializza(avvisi: Avviso[]): string`, `interpreta(contenuto: string): Avviso[]`
  - `immaginiOrfane(nomiPresenti: string[], avvisi: Avviso[]): string[]`
- Produces (`archivioLocale.ts`): `archivioLocale(radice: string): Archivio`

- [ ] **Step 1: Scrivere i test**

`api/_lib/archivioLocale.test.ts`:
```ts
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

  const nuovoSha = await archivio.scrivi(nuovi, [{ nome: 'nuova.jpg', byte: Buffer.from([1, 2, 3]) }], sha);

  assert.equal(await readFile(path.join(radice, 'src/data/avvisi.json'), 'utf8'), serializza(nuovi));
  assert.deepEqual((await readdir(path.join(radice, 'public/images/avvisi'))).sort(), ['.gitkeep', 'nuova.jpg']);
  assert.equal(nuovoSha, (await archivio.leggi()).sha);
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
```

- [ ] **Step 2: Eseguire i test e verificare che falliscano**

Run: `npm test`
Expected: FAIL, moduli `./archivio.js` e `./archivioLocale.js` non trovati.

- [ ] **Step 3: Implementare `api/_lib/archivio.ts`**

```ts
import type { Avviso } from '../../src/types/index.js';
import { CARTELLA_IMMAGINI, type ImmagineDaSalvare } from './valida.js';

export const PERCORSO_JSON = 'src/data/avvisi.json';
export const CARTELLA_IMMAGINI_REPO = 'public/images/avvisi';

export interface StatoArchivio {
  avvisi: Avviso[];
  sha: string;
}

export interface Archivio {
  modalita: 'github' | 'locale';
  leggi(): Promise<StatoArchivio>;
  /** Scrive tutto in un'unica operazione e restituisce lo sha nuovo del JSON. */
  scrivi(avvisi: Avviso[], nuoveImmagini: ImmagineDaSalvare[], shaAtteso: string): Promise<string>;
}

export class ConflittoError extends Error {
  constructor() {
    super('Gli avvisi sono stati modificati altrove. Ricarica per vedere la versione aggiornata.');
    this.name = 'ConflittoError';
  }
}

export function serializza(avvisi: Avviso[]): string {
  return JSON.stringify({ avvisi }, null, 2) + '\n';
}

export function interpreta(contenuto: string): Avviso[] {
  const dati = JSON.parse(contenuto) as { avvisi?: unknown };
  return Array.isArray(dati.avvisi) ? (dati.avvisi as Avviso[]) : [];
}

export function immaginiOrfane(nomiPresenti: string[], avvisi: Avviso[]): string[] {
  const usate = new Set(
    avvisi
      .map((a) => a.immagine)
      .filter((p): p is string => !!p && p.startsWith(CARTELLA_IMMAGINI))
      .map((p) => p.slice(CARTELLA_IMMAGINI.length)),
  );
  return nomiPresenti.filter((nome) => !nome.startsWith('.') && !usate.has(nome));
}
```

- [ ] **Step 4: Implementare `api/_lib/archivioLocale.ts`**

```ts
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  CARTELLA_IMMAGINI_REPO, ConflittoError, PERCORSO_JSON, immaginiOrfane, interpreta, serializza,
  type Archivio,
} from './archivio.js';

const hash = (contenuto: string) => createHash('sha256').update(contenuto).digest('hex');

export function archivioLocale(radice: string): Archivio {
  const fileJson = path.join(radice, PERCORSO_JSON);
  const cartellaImmagini = path.join(radice, CARTELLA_IMMAGINI_REPO);

  async function leggiContenuto(): Promise<string> {
    try {
      return await readFile(fileJson, 'utf8');
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') return serializza([]);
      throw e;
    }
  }

  return {
    modalita: 'locale',

    async leggi() {
      const contenuto = await leggiContenuto();
      return { avvisi: interpreta(contenuto), sha: hash(contenuto) };
    },

    async scrivi(avvisi, nuoveImmagini, shaAtteso) {
      if (hash(await leggiContenuto()) !== shaAtteso) throw new ConflittoError();
      await mkdir(cartellaImmagini, { recursive: true });
      for (const img of nuoveImmagini) {
        await writeFile(path.join(cartellaImmagini, img.nome), img.byte);
      }
      const contenuto = serializza(avvisi);
      await mkdir(path.dirname(fileJson), { recursive: true });
      await writeFile(fileJson, contenuto);
      for (const nome of immaginiOrfane(await readdir(cartellaImmagini), avvisi)) {
        await unlink(path.join(cartellaImmagini, nome));
      }
      return hash(contenuto);
    },
  };
}
```

- [ ] **Step 5: Eseguire i test**

Run: `npm test`
Expected: tutti PASS.

- [ ] **Step 6: Commit**

```bash
git add api/_lib/archivio.ts api/_lib/archivioLocale.ts api/_lib/archivioLocale.test.ts
git commit -m "feat(avvisi): add storage abstraction with local filesystem backend

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Archivio GitHub e scelta dell'archivio

**Files:**
- Create: `api/_lib/archivioGitHub.ts`, `api/_lib/archivioScelto.ts`
- Test: `api/_lib/archivioGitHub.test.ts`

**Interfaces:**
- Consumes: tutto `archivio.ts`; `archivioLocale(radice)`.
- Produces:
  - `interface ConfigGitHub { token: string; repo: string; branch: string }`
  - `class ErroreGitHub extends Error { status: number }`
  - `archivioGitHub(config: ConfigGitHub, fetchFn?: typeof fetch): Archivio`
  - `creaArchivio(): Archivio` (in `archivioScelto.ts`)

- [ ] **Step 1: Scrivere i test**

`api/_lib/archivioGitHub.test.ts`:
```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { Avviso } from '../../src/types/index.js';
import { ConflittoError, serializza } from './archivio.js';
import { archivioGitHub } from './archivioGitHub.js';

const avviso = (id: string, immagine: string | null = null): Avviso => ({
  id, titolo: id, descrizioneBreve: '', testo: '', immagine, bozza: false,
});
const b64 = (s: string) => Buffer.from(s).toString('base64');

type Gestore = (corpo: any) => [number, unknown];

function githubFinto(rotte: Record<string, Gestore>) {
  const chiamate: { chiave: string; corpo: any; auth: string | null }[] = [];
  const fetchFn = (async (url: string | URL | Request, init?: RequestInit) => {
    const u = new URL(String(url));
    const chiave = `${init?.method ?? 'GET'} ${u.pathname.replace('/repos/o/r', '')}${u.search}`;
    const corpo = init?.body ? JSON.parse(String(init.body)) : undefined;
    const intestazioni = new Headers(init?.headers);
    chiamate.push({ chiave, corpo, auth: intestazioni.get('authorization') });
    const gestore = rotte[chiave];
    if (!gestore) return new Response(`non previsto: ${chiave}`, { status: 404 });
    const [status, dati] = gestore(corpo);
    return new Response(JSON.stringify(dati), { status });
  }) as typeof fetch;
  return { fetchFn, chiamate };
}

const config = { token: 'tok', repo: 'o/r', branch: 'main' };

function rotteScrittura(extra: Record<string, Gestore> = {}): Record<string, Gestore> {
  let blob = 0;
  return {
    'GET /git/ref/heads/main': () => [200, { object: { sha: 'testa' } }],
    'GET /git/commits/testa': () => [200, { tree: { sha: 'albero0' } }],
    'GET /contents/src/data/avvisi.json?ref=testa': () => [200, { content: b64(serializza([avviso('aaaa')])), sha: 'shaFile' }],
    'GET /contents/public/images/avvisi?ref=testa': () => [200, [
      { name: 'vecchia.jpg', type: 'file' },
      { name: 'tenuta.jpg', type: 'file' },
    ]],
    'POST /git/blobs': () => [201, { sha: `blob${++blob}` }],
    'POST /git/trees': () => [201, { sha: 'albero1' }],
    'POST /git/commits': () => [201, { sha: 'commit1' }],
    'PATCH /git/refs/heads/main': () => [200, {}],
    ...extra,
  };
}

test('repo non valido rifiutato', () => {
  assert.throws(() => archivioGitHub({ ...config, repo: '' }), /GITHUB_REPO/);
});

test('leggi decodifica il JSON e usa il token', async () => {
  const { fetchFn, chiamate } = githubFinto({
    'GET /contents/src/data/avvisi.json?ref=main': () => [200, { content: b64(serializza([avviso('aaaa')])), sha: 'shaFile' }],
  });
  const stato = await archivioGitHub(config, fetchFn).leggi();
  assert.equal(stato.avvisi[0].id, 'aaaa');
  assert.equal(stato.sha, 'shaFile');
  assert.equal(chiamate[0].auth, 'Bearer tok');
});

test('scrivi crea un solo commit con JSON, immagine nuova e cancellazione delle orfane', async () => {
  const { fetchFn, chiamate } = githubFinto(rotteScrittura());
  const avvisi = [avviso('bbbb', '/images/avvisi/nuova.jpg'), avviso('cccc', '/images/avvisi/tenuta.jpg')];

  const nuovoSha = await archivioGitHub(config, fetchFn).scrivi(
    avvisi, [{ nome: 'nuova.jpg', byte: Buffer.from([1, 2, 3]) }], 'shaFile',
  );

  const blobJson = chiamate.find((c) => c.chiave === 'POST /git/blobs' && c.corpo.encoding === 'utf-8');
  assert.equal(blobJson?.corpo.content, serializza(avvisi));
  const albero = chiamate.find((c) => c.chiave === 'POST /git/trees')!.corpo;
  assert.equal(albero.base_tree, 'albero0');
  assert.deepEqual(albero.tree, [
    { path: 'src/data/avvisi.json', mode: '100644', type: 'blob', sha: 'blob1' },
    { path: 'public/images/avvisi/nuova.jpg', mode: '100644', type: 'blob', sha: 'blob2' },
    { path: 'public/images/avvisi/vecchia.jpg', mode: '100644', type: 'blob', sha: null },
  ]);
  const commit = chiamate.find((c) => c.chiave === 'POST /git/commits')!.corpo;
  assert.deepEqual(commit.parents, ['testa']);
  assert.equal(commit.tree, 'albero1');
  assert.deepEqual(chiamate.find((c) => c.chiave === 'PATCH /git/refs/heads/main')!.corpo, { sha: 'commit1', force: false });
  assert.equal(nuovoSha, 'blob1');
});

test('sha diverso: ConflittoError prima di qualsiasi scrittura', async () => {
  const { fetchFn, chiamate } = githubFinto(rotteScrittura());
  await assert.rejects(archivioGitHub(config, fetchFn).scrivi([avviso('bbbb')], [], 'vecchio'), ConflittoError);
  assert.equal(chiamate.some((c) => c.chiave.startsWith('POST') || c.chiave.startsWith('PATCH')), false);
});

test('ref avanzato nel frattempo (422): ConflittoError', async () => {
  const { fetchFn } = githubFinto(rotteScrittura({ 'PATCH /git/refs/heads/main': () => [422, { message: 'not fast forward' }] }));
  await assert.rejects(archivioGitHub(config, fetchFn).scrivi([avviso('bbbb')], [], 'shaFile'), ConflittoError);
});

test('cartella immagini assente (404): nessuna cancellazione', async () => {
  const rotte = rotteScrittura();
  delete rotte['GET /contents/public/images/avvisi?ref=testa'];
  const { fetchFn, chiamate } = githubFinto(rotte);
  await archivioGitHub(config, fetchFn).scrivi([avviso('bbbb')], [], 'shaFile');
  const albero = chiamate.find((c) => c.chiave === 'POST /git/trees')!.corpo;
  assert.equal(albero.tree.length, 1);
});

test('errore GitHub generico propagato con lo status', async () => {
  const { fetchFn } = githubFinto({ 'GET /contents/src/data/avvisi.json?ref=main': () => [500, { message: 'boom' }] });
  await assert.rejects(archivioGitHub(config, fetchFn).leggi(), (e: any) => e.name === 'ErroreGitHub' && e.status === 500);
});
```

- [ ] **Step 2: Eseguire i test e verificare che falliscano**

Run: `npm test`
Expected: FAIL, modulo `./archivioGitHub.js` non trovato.

- [ ] **Step 3: Implementare `api/_lib/archivioGitHub.ts`**

```ts
import {
  CARTELLA_IMMAGINI_REPO, ConflittoError, PERCORSO_JSON, immaginiOrfane, interpreta, serializza,
  type Archivio,
} from './archivio.js';

export interface ConfigGitHub {
  token: string;
  repo: string;
  branch: string;
}

export class ErroreGitHub extends Error {
  status: number;
  constructor(status: number, messaggio: string) {
    super(messaggio);
    this.name = 'ErroreGitHub';
    this.status = status;
  }
}

interface VoceAlbero {
  path: string;
  mode: '100644';
  type: 'blob';
  sha: string | null;
}

export function archivioGitHub(config: ConfigGitHub, fetchFn: typeof fetch = fetch): Archivio {
  if (!/^[\w.-]+\/[\w.-]+$/.test(config.repo)) {
    throw new Error('GITHUB_REPO non valido (formato: proprietario/repository)');
  }
  const base = `https://api.github.com/repos/${config.repo}`;

  async function api<T>(metodo: string, percorso: string, corpo?: unknown): Promise<T> {
    const risposta = await fetchFn(base + percorso, {
      method: metodo,
      headers: {
        authorization: `Bearer ${config.token}`,
        accept: 'application/vnd.github+json',
        'x-github-api-version': '2022-11-28',
        'user-agent': 'parrocchia-coriano-admin',
        ...(corpo === undefined ? {} : { 'content-type': 'application/json' }),
      },
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
    });
    if (!risposta.ok) {
      throw new ErroreGitHub(risposta.status, `GitHub ${metodo} ${percorso}: ${risposta.status} ${await risposta.text()}`);
    }
    return (await risposta.json()) as T;
  }

  async function leggiFile(rif: string) {
    const file = await api<{ content: string; sha: string }>('GET', `/contents/${PERCORSO_JSON}?ref=${encodeURIComponent(rif)}`);
    return { contenuto: Buffer.from(file.content, 'base64').toString('utf8'), sha: file.sha };
  }

  async function nomiImmagini(rif: string): Promise<string[]> {
    try {
      const voci = await api<{ name: string; type: string }[]>(
        'GET', `/contents/${CARTELLA_IMMAGINI_REPO}?ref=${encodeURIComponent(rif)}`,
      );
      return voci.filter((v) => v.type === 'file').map((v) => v.name);
    } catch (e) {
      if (e instanceof ErroreGitHub && e.status === 404) return [];
      throw e;
    }
  }

  const creaBlob = (content: string, encoding: 'utf-8' | 'base64') =>
    api<{ sha: string }>('POST', '/git/blobs', { content, encoding });

  return {
    modalita: 'github',

    async leggi() {
      const { contenuto, sha } = await leggiFile(config.branch);
      return { avvisi: interpreta(contenuto), sha };
    },

    async scrivi(avvisi, nuoveImmagini, shaAtteso) {
      const testa = await api<{ object: { sha: string } }>('GET', `/git/ref/heads/${config.branch}`);
      const shaTesta = testa.object.sha;
      const commitTesta = await api<{ tree: { sha: string } }>('GET', `/git/commits/${shaTesta}`);
      const attuale = await leggiFile(shaTesta);
      if (attuale.sha !== shaAtteso) throw new ConflittoError();
      const presenti = await nomiImmagini(shaTesta);

      const blobJson = await creaBlob(serializza(avvisi), 'utf-8');
      const voci: VoceAlbero[] = [{ path: PERCORSO_JSON, mode: '100644', type: 'blob', sha: blobJson.sha }];
      for (const img of nuoveImmagini) {
        const blob = await creaBlob(img.byte.toString('base64'), 'base64');
        voci.push({ path: `${CARTELLA_IMMAGINI_REPO}/${img.nome}`, mode: '100644', type: 'blob', sha: blob.sha });
      }
      for (const nome of immaginiOrfane(presenti, avvisi)) {
        voci.push({ path: `${CARTELLA_IMMAGINI_REPO}/${nome}`, mode: '100644', type: 'blob', sha: null });
      }

      const albero = await api<{ sha: string }>('POST', '/git/trees', { base_tree: commitTesta.tree.sha, tree: voci });
      const commit = await api<{ sha: string }>('POST', '/git/commits', {
        message: 'avvisi: aggiornamento dalla dashboard',
        tree: albero.sha,
        parents: [shaTesta],
      });
      try {
        await api('PATCH', `/git/refs/heads/${config.branch}`, { sha: commit.sha, force: false });
      } catch (e) {
        if (e instanceof ErroreGitHub && e.status === 422) throw new ConflittoError();
        throw e;
      }
      return blobJson.sha;
    },
  };
}
```

Nota: lo sha restituito dalla Contents API per un file è lo sha del blob, quindi `blobJson.sha` coincide con quello che `leggi()` restituirà dopo la pubblicazione.

- [ ] **Step 4: Implementare `api/_lib/archivioScelto.ts`**

```ts
import type { Archivio } from './archivio.js';
import { archivioGitHub } from './archivioGitHub.js';
import { archivioLocale } from './archivioLocale.js';

export function creaArchivio(): Archivio {
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    return archivioGitHub({
      token,
      repo: process.env.GITHUB_REPO ?? '',
      branch: process.env.GITHUB_BRANCH || 'main',
    });
  }
  if (process.env.VERCEL) throw new Error('GITHUB_TOKEN non configurato su Vercel');
  return archivioLocale(process.cwd());
}
```

- [ ] **Step 5: Eseguire test e type-check**

Run: `npm test && npm run lint`
Expected: tutti PASS, nessun errore di tipo.

- [ ] **Step 6: Commit**

```bash
git add api/_lib/archivioGitHub.ts api/_lib/archivioGitHub.test.ts api/_lib/archivioScelto.ts
git commit -m "feat(avvisi): add GitHub storage backend (single commit via Git Data API)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Endpoint API

**Files:**
- Create: `api/_lib/http.ts`, `api/login.ts`, `api/logout.ts`, `api/avvisi.ts`, `api/pubblica.ts`
- Test: `api/_lib/endpoint.test.ts`

**Interfaces:**
- Consumes: `sessione.ts`, `credenziali.ts`, `valida.ts`, `sanifica.ts`, `archivio.ts` (`ConflittoError`), `archivioScelto.ts` (`creaArchivio`).
- Produces (contratto HTTP usato dal client in Task 9):
  - `POST /api/login` body `{ email, password }` → 200 `{ ok: true }` + `Set-Cookie`; 400 `{ errore }`; 401 `{ errore: 'Credenziali non valide' }`
  - `POST /api/logout` → 200 `{ ok: true }` + cookie cancellato
  - `GET /api/avvisi` → 200 `{ avvisi: Avviso[], sha: string }`; 401 `{ errore }`; 502 `{ errore, dettaglio }`
  - `POST /api/pubblica` body `RichiestaPubblica` → 200 `{ ok: true, modalita: 'github' | 'locale', avvisi: Avviso[], sha: string }`; 400/413 `{ errore }`; 401; 409 `{ errore }`; 502 `{ errore, dettaglio }`
  - `json(dati: unknown, status?: number, intestazioni?: Record<string, string>): Response`, `leggiJson(request: Request): Promise<unknown>`, `nonAutorizzato(): Response`

- [ ] **Step 1: Scrivere i test**

`api/_lib/endpoint.test.ts`:
```ts
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { POST as login } from '../login.js';
import { POST as logout } from '../logout.js';
import { GET as leggiAvvisi } from '../avvisi.js';
import { POST as pubblica } from '../pubblica.js';
import { serializza } from './archivio.js';
import { NOME_COOKIE, creaToken } from './sessione.js';

let radice = '';

before(async () => {
  process.env.SESSION_SECRET = 's'.repeat(64);
  process.env.ADMIN_EMAIL = 'admin@example.com';
  process.env.ADMIN_PASSWORD = 'pw';
  process.env.GITHUB_TOKEN = '';
  delete process.env.VERCEL;
  radice = await mkdtemp(path.join(tmpdir(), 'endpoint-'));
  await mkdir(path.join(radice, 'src/data'), { recursive: true });
  await writeFile(path.join(radice, 'src/data/avvisi.json'), serializza([]));
  process.chdir(radice);
});

const conCookie = (init: RequestInit = {}) => ({
  ...init,
  headers: { ...(init.headers as Record<string, string>), cookie: `${NOME_COOKIE}=${creaToken()}` },
});
const richiesta = (metodo: string, url: string, corpo?: unknown, init: RequestInit = {}) =>
  new Request(`http://localhost${url}`, {
    method: metodo,
    ...init,
    headers: { 'content-type': 'application/json', ...(init.headers as Record<string, string>) },
    body: corpo === undefined ? undefined : typeof corpo === 'string' ? corpo : JSON.stringify(corpo),
  });

test('login corretto imposta il cookie', async () => {
  const r = await login(richiesta('POST', '/api/login', { email: 'ADMIN@example.com', password: 'pw' }));
  assert.equal(r.status, 200);
  assert.match(r.headers.get('set-cookie') ?? '', /^sessione_admin=\d+\.[0-9a-f]+; .*HttpOnly/);
});

test('login errato: 401 senza cookie', async () => {
  const r = await login(richiesta('POST', '/api/login', { email: 'admin@example.com', password: 'no' }));
  assert.equal(r.status, 401);
  assert.equal(r.headers.get('set-cookie'), null);
  assert.equal((await r.json()).errore, 'Credenziali non valide');
});

test('login con corpo non JSON: 400', async () => {
  const r = await login(richiesta('POST', '/api/login', 'non json'));
  assert.equal(r.status, 400);
});

test('logout cancella il cookie', async () => {
  const r = await logout(richiesta('POST', '/api/logout', {}));
  assert.match(r.headers.get('set-cookie') ?? '', /Max-Age=0/);
});

test('endpoint protetti senza cookie: 401', async () => {
  assert.equal((await leggiAvvisi(richiesta('GET', '/api/avvisi'))).status, 401);
  assert.equal((await pubblica(richiesta('POST', '/api/pubblica', { avvisi: [], nuoveImmagini: [], sha: '' }))).status, 401);
});

test('lettura e pubblicazione in modalità locale, con sanificazione e nuovo sha', async () => {
  const lettura = await leggiAvvisi(richiesta('GET', '/api/avvisi', undefined, conCookie()));
  assert.equal(lettura.status, 200);
  const { sha } = await lettura.json();

  const avviso = {
    id: 'abcd1234', titolo: 'Festa', descrizioneBreve: '', testo: '<p>Ciao<script>alert(1)</script></p>',
    immagine: null, bozza: false,
  };
  const r = await pubblica(richiesta('POST', '/api/pubblica', { avvisi: [avviso], nuoveImmagini: [], sha }, conCookie()));
  assert.equal(r.status, 200);
  const esito = await r.json();
  assert.equal(esito.modalita, 'locale');
  assert.equal(esito.avvisi[0].testo, '<p>Ciao</p>');

  const salvato = JSON.parse(await readFile(path.join(radice, 'src/data/avvisi.json'), 'utf8'));
  assert.equal(salvato.avvisi[0].testo, '<p>Ciao</p>');

  const rilettura = await (await leggiAvvisi(richiesta('GET', '/api/avvisi', undefined, conCookie()))).json();
  assert.equal(esito.sha, rilettura.sha);

  const conflitto = await pubblica(richiesta('POST', '/api/pubblica', { avvisi: [], nuoveImmagini: [], sha }, conCookie()));
  assert.equal(conflitto.status, 409);
});

test('richiesta non valida: 400 con messaggio', async () => {
  const r = await pubblica(richiesta('POST', '/api/pubblica', { avvisi: 'x', nuoveImmagini: [], sha: 'a' }, conCookie()));
  assert.equal(r.status, 400);
  assert.match((await r.json()).errore, /Elenco avvisi/);
});
```

- [ ] **Step 2: Eseguire i test e verificare che falliscano**

Run: `npm test`
Expected: FAIL, moduli `../login.js` ecc. non trovati.

- [ ] **Step 3: Implementare `api/_lib/http.ts`**

```ts
export function json(dati: unknown, status = 200, intestazioni: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(dati), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...intestazioni,
    },
  });
}

export async function leggiJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}

export function nonAutorizzato(): Response {
  return json({ errore: 'Sessione scaduta, accedi di nuovo' }, 401);
}
```

- [ ] **Step 4: Implementare gli endpoint**

`api/login.ts`:
```ts
import { credenzialiValide } from './_lib/credenziali.js';
import { json, leggiJson } from './_lib/http.js';
import { cookieSessione, creaToken } from './_lib/sessione.js';

const ATTESA_ERRORE_MS = 1000;

export async function POST(request: Request): Promise<Response> {
  const corpo = await leggiJson(request);
  if (typeof corpo !== 'object' || corpo === null) return json({ errore: 'Richiesta non valida' }, 400);
  const { email, password } = corpo as { email?: unknown; password?: unknown };
  if (!credenzialiValide(email, password)) {
    await new Promise((risolvi) => setTimeout(risolvi, ATTESA_ERRORE_MS));
    return json({ errore: 'Credenziali non valide' }, 401);
  }
  return json({ ok: true }, 200, { 'set-cookie': cookieSessione(creaToken()) });
}
```

`api/logout.ts`:
```ts
import { json } from './_lib/http.js';
import { cookieCancellazione } from './_lib/sessione.js';

export async function POST(): Promise<Response> {
  return json({ ok: true }, 200, { 'set-cookie': cookieCancellazione() });
}
```

`api/avvisi.ts`:
```ts
import { creaArchivio } from './_lib/archivioScelto.js';
import { json, nonAutorizzato } from './_lib/http.js';
import { richiestaAutenticata } from './_lib/sessione.js';

export async function GET(request: Request): Promise<Response> {
  if (!richiestaAutenticata(request)) return nonAutorizzato();
  try {
    return json(await creaArchivio().leggi());
  } catch (e) {
    console.error(e);
    return json({
      errore: 'Impossibile leggere gli avvisi, riprova tra poco.',
      dettaglio: e instanceof Error ? e.message : String(e),
    }, 502);
  }
}
```

`api/pubblica.ts`:
```ts
import { ConflittoError } from './_lib/archivio.js';
import { creaArchivio } from './_lib/archivioScelto.js';
import { json, leggiJson, nonAutorizzato } from './_lib/http.js';
import { sanificaTesto } from './_lib/sanifica.js';
import { richiestaAutenticata } from './_lib/sessione.js';
import { validaRichiestaPubblica } from './_lib/valida.js';

export async function POST(request: Request): Promise<Response> {
  if (!richiestaAutenticata(request)) return nonAutorizzato();
  const esito = validaRichiestaPubblica(await leggiJson(request));
  if (!esito.ok) return json({ errore: esito.errore }, esito.status);

  const { nuoveImmagini, sha } = esito.dati;
  const avvisi = esito.dati.avvisi.map((a) => ({ ...a, testo: sanificaTesto(a.testo) }));
  try {
    const archivio = creaArchivio();
    const nuovoSha = await archivio.scrivi(avvisi, nuoveImmagini, sha);
    return json({ ok: true, modalita: archivio.modalita, avvisi, sha: nuovoSha });
  } catch (e) {
    if (e instanceof ConflittoError) return json({ errore: e.message }, 409);
    console.error(e);
    return json({
      errore: 'Pubblicazione non riuscita, riprova tra poco.',
      dettaglio: e instanceof Error ? e.message : String(e),
    }, 502);
  }
}
```

- [ ] **Step 5: Eseguire test e type-check**

Run: `npm test && npm run lint`
Expected: tutti PASS (il test "login errato" impiega ~1 s), nessun errore di tipo.

- [ ] **Step 6: Commit**

```bash
git add api/_lib/http.ts api/_lib/endpoint.test.ts api/login.ts api/logout.ts api/avvisi.ts api/pubblica.ts
git commit -m "feat(avvisi): add login, logout, read and publish endpoints

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: API nel dev server, configurazione Vercel e variabili

**Files:**
- Create: `dev/apiLocale.ts`, `vercel.json`
- Modify: `vite.config.ts`, `.env.example`

**Interfaces:**
- Consumes: i quattro endpoint di Task 6 (export nominati `GET`/`POST`).
- Produces: `apiLocale(): Plugin`; in dev `/api/*` risponde e `/admin` serve `admin.html` (che arriva in Task 10).

- [ ] **Step 1: Creare `dev/apiLocale.ts`**

```ts
import type { IncomingMessage } from 'node:http';
import { loadEnv, type Plugin } from 'vite';

const ROTTE: Record<string, string> = {
  '/api/login': '/api/login.ts',
  '/api/logout': '/api/logout.ts',
  '/api/avvisi': '/api/avvisi.ts',
  '/api/pubblica': '/api/pubblica.ts',
};

type Handler = (request: Request) => Promise<Response>;

async function versoRequest(req: IncomingMessage): Promise<Request> {
  const intestazioni = new Headers();
  for (const [chiave, valore] of Object.entries(req.headers)) {
    if (typeof valore === 'string') intestazioni.set(chiave, valore);
    else if (Array.isArray(valore)) intestazioni.set(chiave, valore.join(', '));
  }
  const metodo = req.method ?? 'GET';
  let corpo: Buffer | undefined;
  if (metodo !== 'GET' && metodo !== 'HEAD') {
    const parti: Buffer[] = [];
    for await (const parte of req) parti.push(parte as Buffer);
    corpo = Buffer.concat(parti);
  }
  return new Request(new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`), {
    method: metodo,
    headers: intestazioni,
    body: corpo,
  });
}

/** Monta gli handler di api/ nel dev server di Vite, come farebbe Vercel. */
export function apiLocale(): Plugin {
  return {
    name: 'api-locale',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, server.config.root, ''));

      server.middlewares.use(async (req, res, next) => {
        const percorso = new URL(req.url ?? '/', 'http://localhost').pathname;
        if (percorso === '/admin' || percorso === '/admin/') {
          req.url = '/admin.html';
          return next();
        }
        const modulo = ROTTE[percorso];
        if (!modulo) return next();

        try {
          const esportazioni = (await server.ssrLoadModule(modulo)) as Record<string, unknown>;
          const handler = esportazioni[req.method ?? 'GET'] as Handler | undefined;
          if (typeof handler !== 'function') {
            res.statusCode = 405;
            res.end();
            return;
          }
          const risposta = await handler(await versoRequest(req));
          res.statusCode = risposta.status;
          risposta.headers.forEach((valore, chiave) => {
            if (chiave !== 'set-cookie') res.setHeader(chiave, valore);
          });
          const cookie = risposta.headers.getSetCookie();
          if (cookie.length > 0) res.setHeader('set-cookie', cookie);
          res.end(Buffer.from(await risposta.arrayBuffer()));
        } catch (e) {
          server.ssrFixStacktrace(e as Error);
          console.error(e);
          res.statusCode = 500;
          res.setHeader('content-type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ errore: 'Errore interno del server locale', dettaglio: String(e) }));
        }
      });
    },
  };
}
```

- [ ] **Step 2: Registrare il plugin in `vite.config.ts`**

Aggiungere l'import dopo `import {defineConfig} from 'vite';`:
```ts
import { apiLocale } from './dev/apiLocale';
```
e cambiare la riga dei plugin in:
```ts
    plugins: [react(), tailwindcss(), apiLocale()],
```
Non toccare il blocco `server`.

- [ ] **Step 3: Creare `vercel.json`**

```json
{
  "rewrites": [{ "source": "/admin", "destination": "/admin.html" }]
}
```

- [ ] **Step 4: Aggiornare `.env.example`**

Aggiungere in fondo:
```bash

# Area riservata /admin (gestione avvisi)
ADMIN_EMAIL="indirizzo@example.com"
ADMIN_PASSWORD="scegli-una-password"
# Stringa casuale di almeno 32 caratteri: openssl rand -hex 32
SESSION_SECRET=""

# Pubblicazione su GitHub. Lasciare GITHUB_TOKEN vuoto in locale:
# la dashboard scrive direttamente i file su disco.
# Su Vercel: token fine-grained limitato a questo repository, permesso "Contents: Read and write".
GITHUB_TOKEN=""
GITHUB_REPO="AndreaCiliberti/Parrocchia-Coriano"
GITHUB_BRANCH="main"
```

- [ ] **Step 5: Verificare gli endpoint dal dev server**

Se un dev server è già attivo sulla porta 3000, Vite si riavvia da solo al cambio di `vite.config.ts`; altrimenti avviarlo con `npm run dev` in background. Poi:

```bash
C=$(mktemp)
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/avvisi
curl -s -c "$C" -H 'content-type: application/json' \
  -d "{\"email\":\"$(grep ^ADMIN_EMAIL .env.local | cut -d'"' -f2)\",\"password\":\"$(grep ^ADMIN_PASSWORD .env.local | cut -d'"' -f2)\"}" \
  http://localhost:3000/api/login
curl -s -b "$C" http://localhost:3000/api/avvisi
```
Expected: `401`, poi `{"ok":true}`, poi `{"avvisi":[],"sha":"..."}` (il JSON non esiste ancora: elenco vuoto).

- [ ] **Step 6: Lint, build e commit**

Run: `npm run lint && npm run build`
Expected: nessun errore.

```bash
git add dev/apiLocale.ts vite.config.ts vercel.json .env.example
git commit -m "feat(avvisi): serve api/ handlers from the Vite dev server

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Avvisi nel JSON e pagina pubblica

**Files:**
- Create: `src/data/avvisi.json`, `src/components/AvvisoCard.tsx`, `public/images/avvisi/.gitkeep`
- Modify: `src/pages/AvvisiPage.tsx` (riscrittura), `src/index.css` (in fondo)

**Interfaces:**
- Consumes: `Avviso`, `FileAvvisi`.
- Produces: `AvvisoCard: React.FC<{ avviso: Avviso; srcImmagine?: string | null }>` (usato anche dalla dashboard in Task 10); classe CSS `.testo-avviso`.

- [ ] **Step 1: Creare `src/data/avvisi.json` con i 4 avvisi attuali**

```json
{
  "avvisi": [
    {
      "id": "dona8x1000",
      "titolo": "DONA IL TUO 8x1000",
      "descrizioneBreve": "Due firme che non costano nulla, ma cambiano tante cose",
      "testo": "<p>Dona il tuo 8×1000 alla Chiesa Cattolica e il 5×1000 all’ANSPI di Coriano.</p>",
      "immagine": "/images/WhatsApp-Image-2026-04-28-at-13.06.51.jpeg",
      "bozza": false
    },
    {
      "id": "festanonni",
      "titolo": "FESTA DEI NONNI - DOMENICA 28 GIUGNO CORTILE SUORE",
      "descrizioneBreve": "",
      "testo": "<p>Vi aspettiamo tutti per una serata in compagnia ed allegria dedicata alle persone più importanti delle nostre famiglie 💖</p><p><strong>Prenotate entro il 24 giugno ai numeri:</strong></p><ul><li><p>Telefono: <a href=\"tel:0541657167\">0541 657167</a></p></li><li><p>Cellulare: <a href=\"tel:3389284013\">338 9284013</a></p></li></ul>",
      "immagine": "/images/Festa-dei-nonni-768x543.jpeg",
      "bozza": false
    },
    {
      "id": "papa2026",
      "titolo": "LA DIOCESI DI RIMINI ACCOGLIE IL PAPA - PARTECIPA COME VOLONTARIO",
      "descrizioneBreve": "IL PAPA A RIMINI",
      "testo": "<p>Il nostro aiuto è importante… dai bambini agli adulti! Lasciamoci coinvolgere tutti e partecipiamo attivamente alla visita del Papa.</p><ul><li><p><a href=\"https://docs.google.com/forms/d/e/1FAIpQLSf2e77euV3pO0aUuahlttjE4ZFI8mjjTrrIxsFLgrMVNbM99A/viewform\" target=\"_blank\" rel=\"noopener noreferrer\">Candidati come volontario</a></p></li><li><p><a href=\"https://www.diocesi.rimini.it\" target=\"_blank\" rel=\"noopener noreferrer\">Info utili Diocesi</a></p></li></ul>",
      "immagine": "/images/Diocesi-di-Rimini-e-Papa-768x1086.jpeg",
      "bozza": false
    },
    {
      "id": "confessioni",
      "titolo": "Confessioni",
      "descrizioneBreve": "",
      "testo": "<p>E’ possibile confessarsi ogni lunedì mattina tra le <strong>9.30 e le 12</strong> presso la chiesa parrocchiale di Coriano.</p>",
      "immagine": null,
      "bozza": false
    }
  ]
}
```

Creare anche la cartella delle immagini con un file segnaposto (git non traccia cartelle vuote):
```bash
mkdir -p public/images/avvisi && touch public/images/avvisi/.gitkeep
```

- [ ] **Step 2: Creare `src/components/AvvisoCard.tsx`**

```tsx
import React from 'react';
import type { Avviso } from '../types';

interface AvvisoCardProps {
  avviso: Avviso;
  /** Sorgente da mostrare al posto di avviso.immagine (anteprima di un'immagine non ancora pubblicata). */
  srcImmagine?: string | null;
}

export const AvvisoCard: React.FC<AvvisoCardProps> = ({ avviso, srcImmagine = avviso.immagine }) => {
  return (
    <article className="bg-[#F9FAFD] rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
      {srcImmagine && (
        <div className="rounded-2xl overflow-hidden shadow-sm max-w-2xl mx-auto">
          <img src={srcImmagine} alt={avviso.titolo} className="w-full h-auto object-contain" />
        </div>
      )}
      <div className="space-y-4">
        <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#1C244B]">{avviso.titolo}</h2>
        {avviso.descrizioneBreve && (
          <p className="text-lg font-semibold text-[#1C244B]">{avviso.descrizioneBreve}</p>
        )}
        {avviso.testo && (
          <div
            className="testo-avviso text-base sm:text-lg text-[#324A6D] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: avviso.testo }}
          />
        )}
      </div>
    </article>
  );
};
```

L'HTML è sicuro da inserire: ogni testo passa da `sanificaTesto` in `/api/pubblica` prima di finire nel JSON.

- [ ] **Step 3: Riscrivere `src/pages/AvvisiPage.tsx`**

```tsx
import React from 'react';
import { PageId, type FileAvvisi } from '../types';
import { AvvisoCard } from '../components/AvvisoCard';
import datiAvvisi from '../data/avvisi.json';

interface AvvisiPageProps {
  onNavigate: (page: PageId) => void;
}

const avvisiVisibili = (datiAvvisi as FileAvvisi).avvisi.filter((a) => !a.bozza);

export const AvvisiPage: React.FC<AvvisiPageProps> = () => {
  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="font-sans font-bold text-4xl sm:text-5xl text-[#1C244B]">
            Avvisi
          </h2>
          <h5 className="italic text-lg sm:text-xl text-[#324A6D]/80">
            "Gloria Dei vivens homo"
          </h5>
        </div>

        {avvisiVisibili.length > 0 ? (
          avvisiVisibili.map((avviso) => <AvvisoCard key={avviso.id} avviso={avviso} />)
        ) : (
          <p className="text-center text-lg text-[#324A6D]/80">Al momento non ci sono avvisi.</p>
        )}
      </div>
    </div>
  );
};
```

- [ ] **Step 4: Aggiungere gli stili del testo in fondo a `src/index.css`**

```css
/* Testo degli avvisi (HTML da dashboard: p, strong, a, ul, li) */
.testo-avviso p + p,
.testo-avviso p + ul,
.testo-avviso ul + p {
  margin-top: 0.75rem;
}

.testo-avviso strong {
  font-weight: 700;
  color: #1C244B;
}

.testo-avviso a {
  color: #467FF7;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.testo-avviso ul {
  list-style: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
}

.testo-avviso li + li {
  margin-top: 0.25rem;
}
```

- [ ] **Step 5: Verificare**

Run: `npm run lint && npm run build`
Expected: nessun errore.

Aprire `http://localhost:3000/#avvisi` e confrontare con la versione precedente: 4 schede nello stesso ordine, immagini presenti, link telefono e link Papa in blu e cliccabili (quelli esterni in una nuova scheda), elenchi puntati visibili. Poi `curl -s -b "$C" http://localhost:3000/api/avvisi` (cookie di Task 7) deve restituire i 4 avvisi.

- [ ] **Step 6: Commit**

```bash
git add src/data/avvisi.json src/components/AvvisoCard.tsx src/pages/AvvisiPage.tsx src/index.css public/images/avvisi/.gitkeep
git commit -m "feat(avvisi): render notices from avvisi.json

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Logica client della dashboard (utilità, bozza locale, immagini, API)

**Files:**
- Create: `src/admin/utilita.ts`, `src/admin/bozzaLocale.ts`, `src/admin/immagini.ts`, `src/admin/api.ts`
- Test: `src/admin/utilita.test.ts`, `src/admin/bozzaLocale.test.ts`
- Modify: `package.json` (script `test`)

**Interfaces:**
- Consumes: contratto HTTP di Task 6; `RE_NOME_IMMAGINE` (solo nel test).
- Produces:
  - `utilita.ts`: `CARTELLA_IMMAGINI`, `MAX_BYTE_IMMAGINE`, `LIMITE_RICHIESTA_BYTE`, `nuovoId(): string`, `slug(testo: string): string`, `nomeImmagine(titolo: string, id: string): string`, `nomeDaPercorso(percorso: string): string | null`, `normalizzaLink(input: string): string`, `byteDaDataUrl(dataUrl: string): number`, `superaLimite(corpo: string): boolean`, `sposta<T>(lista: T[], da: number, a: number): T[]`
  - `bozzaLocale.ts`: `interface BozzaLocale { avvisi: Avviso[]; nuoveImmagini: Record<string, string>; sha: string }`, `leggiBozza(memoria?)`, `salvaBozza(bozza, memoria?): boolean`, `cancellaBozza(memoria?)`
  - `immagini.ts`: `riduciImmagine(file: File): Promise<string>` (data URL JPEG)
  - `api.ts`: `class ErroreApi extends Error { status: number; dettaglio?: string }`, `login`, `logout`, `caricaAvvisi(): Promise<{ avvisi: Avviso[]; sha: string }>`, `interface EsitoPubblicazione { ok: true; modalita: 'github' | 'locale'; avvisi: Avviso[]; sha: string }`, `pubblica(r: RichiestaPubblica): Promise<EsitoPubblicazione>`

- [ ] **Step 1: Estendere lo script di test**

In `package.json`:
```json
    "test": "node --import tsx --test \"api/**/*.test.ts\" \"src/**/*.test.ts\""
```

- [ ] **Step 2: Scrivere i test**

`src/admin/utilita.test.ts`:
```ts
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
```

`src/admin/bozzaLocale.test.ts`:
```ts
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
```

- [ ] **Step 3: Eseguire i test e verificare che falliscano**

Run: `npm test`
Expected: FAIL, moduli `./utilita.js` e `./bozzaLocale.js` non trovati.

- [ ] **Step 4: Implementare `src/admin/utilita.ts`**

```ts
export const CARTELLA_IMMAGINI = '/images/avvisi/';
export const MAX_BYTE_IMMAGINE = 2 * 1024 * 1024;
/** Margine sotto il limite di 4,5 MB del corpo delle Vercel Functions. */
export const LIMITE_RICHIESTA_BYTE = 4 * 1024 * 1024;

const ALFABETO = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function nuovoId(lunghezza = 10): string {
  const casuali = crypto.getRandomValues(new Uint8Array(lunghezza));
  return Array.from(casuali, (b) => ALFABETO[b % ALFABETO.length]).join('');
}

export function slug(testo: string): string {
  const s = testo
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/, '');
  return s || 'avviso';
}

export function nomeImmagine(titolo: string, id: string): string {
  return `${slug(titolo)}-${id}-${nuovoId(4)}.jpg`;
}

export function nomeDaPercorso(percorso: string): string | null {
  return percorso.startsWith(CARTELLA_IMMAGINI) ? percorso.slice(CARTELLA_IMMAGINI.length) : null;
}

export function normalizzaLink(input: string): string {
  const testo = input.trim();
  if (/^(https?:|mailto:|tel:)/i.test(testo)) return testo;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testo)) return `mailto:${testo}`;
  if (/^\+?[\d\s./-]{6,}$/.test(testo)) return `tel:${testo.replace(/[^\d+]/g, '')}`;
  return `https://${testo.replace(/^\/+/, '')}`;
}

export function byteDaDataUrl(dataUrl: string): number {
  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
  const riempimento = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  return (base64.length * 3) / 4 - riempimento;
}

export function superaLimite(corpo: string): boolean {
  return new TextEncoder().encode(corpo).length > LIMITE_RICHIESTA_BYTE;
}

export function sposta<T>(lista: T[], da: number, a: number): T[] {
  if (a < 0 || a >= lista.length || da === a) return lista;
  const copia = [...lista];
  const [elemento] = copia.splice(da, 1);
  copia.splice(a, 0, elemento);
  return copia;
}
```

- [ ] **Step 5: Implementare `src/admin/bozzaLocale.ts`**

```ts
import type { Avviso } from '../types';

export const CHIAVE_BOZZA = 'parrocchia-avvisi-bozza';

export interface BozzaLocale {
  avvisi: Avviso[];
  /** nome file → data URL delle immagini non ancora pubblicate */
  nuoveImmagini: Record<string, string>;
  /** sha della versione da cui sono partite le modifiche */
  sha: string;
}

type Memoria = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

function memoriaPredefinita(): Memoria | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

export function leggiBozza(memoria: Memoria | null = memoriaPredefinita()): BozzaLocale | null {
  try {
    const grezzo = memoria?.getItem(CHIAVE_BOZZA);
    if (!grezzo) return null;
    const dati = JSON.parse(grezzo) as Partial<BozzaLocale>;
    const valida =
      Array.isArray(dati.avvisi) &&
      typeof dati.sha === 'string' &&
      typeof dati.nuoveImmagini === 'object' &&
      dati.nuoveImmagini !== null;
    return valida ? (dati as BozzaLocale) : null;
  } catch {
    return null;
  }
}

/** Restituisce false se il browser non ha potuto salvare (es. spazio esaurito). */
export function salvaBozza(bozza: BozzaLocale, memoria: Memoria | null = memoriaPredefinita()): boolean {
  if (!memoria) return false;
  try {
    memoria.setItem(CHIAVE_BOZZA, JSON.stringify(bozza));
    return true;
  } catch {
    return false;
  }
}

export function cancellaBozza(memoria: Memoria | null = memoriaPredefinita()): void {
  try {
    memoria?.removeItem(CHIAVE_BOZZA);
  } catch {
    // niente da fare: la bozza resterà e verrà proposta alla prossima apertura
  }
}
```

- [ ] **Step 6: Eseguire i test**

Run: `npm test`
Expected: tutti PASS (api e src).

- [ ] **Step 7: Implementare `src/admin/immagini.ts`** (solo browser, verificato a mano in Task 10)

```ts
const LATO_MAX = 1600;
const QUALITA = 0.82;

/** Ridimensiona un'immagine (lato lungo ≤ 1600 px) e la converte in data URL JPEG. */
export async function riduciImmagine(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  try {
    const scala = Math.min(1, LATO_MAX / Math.max(bitmap.width, bitmap.height));
    const larghezza = Math.round(bitmap.width * scala);
    const altezza = Math.round(bitmap.height * scala);
    const canvas = document.createElement('canvas');
    canvas.width = larghezza;
    canvas.height = altezza;
    const contesto = canvas.getContext('2d');
    if (!contesto) throw new Error('Canvas non disponibile');
    contesto.fillStyle = '#ffffff';
    contesto.fillRect(0, 0, larghezza, altezza);
    contesto.drawImage(bitmap, 0, 0, larghezza, altezza);
    return canvas.toDataURL('image/jpeg', QUALITA);
  } finally {
    bitmap.close();
  }
}
```

- [ ] **Step 8: Implementare `src/admin/api.ts`**

```ts
import type { Avviso, RichiestaPubblica } from '../types';

export class ErroreApi extends Error {
  status: number;
  dettaglio?: string;
  constructor(status: number, messaggio: string, dettaglio?: string) {
    super(messaggio);
    this.name = 'ErroreApi';
    this.status = status;
    this.dettaglio = dettaglio;
  }
}

const MESSAGGI_PREDEFINITI: Record<number, string> = {
  401: 'Sessione scaduta, accedi di nuovo',
  413: 'Le immagini sono troppo grandi per una sola pubblicazione.',
};

async function chiama<T>(percorso: string, metodo: 'GET' | 'POST' = 'GET', corpo?: unknown): Promise<T> {
  const risposta = await fetch(percorso, {
    method: metodo,
    credentials: 'same-origin',
    headers: corpo === undefined ? undefined : { 'content-type': 'application/json' },
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
  });
  const dati = (await risposta.json().catch(() => ({}))) as { errore?: string; dettaglio?: string };
  if (!risposta.ok) {
    throw new ErroreApi(
      risposta.status,
      dati.errore ?? MESSAGGI_PREDEFINITI[risposta.status] ?? `Errore del server (${risposta.status})`,
      dati.dettaglio,
    );
  }
  return dati as T;
}

export interface EsitoPubblicazione {
  ok: true;
  modalita: 'github' | 'locale';
  avvisi: Avviso[];
  sha: string;
}

export const login = (email: string, password: string) =>
  chiama<{ ok: true }>('/api/login', 'POST', { email, password });

export const logout = () => chiama<{ ok: true }>('/api/logout', 'POST', {});

export const caricaAvvisi = () => chiama<{ avvisi: Avviso[]; sha: string }>('/api/avvisi');

export const pubblica = (richiesta: RichiestaPubblica) =>
  chiama<EsitoPubblicazione>('/api/pubblica', 'POST', richiesta);
```

- [ ] **Step 9: Type-check e commit**

Run: `npm run lint && npm test`
Expected: nessun errore, test PASS.

```bash
git add package.json src/admin/utilita.ts src/admin/utilita.test.ts src/admin/bozzaLocale.ts src/admin/bozzaLocale.test.ts src/admin/immagini.ts src/admin/api.ts
git commit -m "feat(avvisi): add dashboard client helpers, local draft storage and API client

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Interfaccia della dashboard

**Files:**
- Create: `admin.html`, `src/admin/main.tsx`, `src/admin/Login.tsx`, `src/admin/EditorTesto.tsx`, `src/admin/EditorAvviso.tsx`, `src/admin/AdminApp.tsx`
- Modify: `vite.config.ts` (entry multipli)

**Interfaces:**
- Consumes: tutto Task 9; `AvvisoCard` (Task 8); tipi.
- Produces: pagina `/admin` funzionante.

- [ ] **Step 1: Creare `admin.html`**

```html
<!doctype html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Gestione avvisi | Parrocchia Coriano</title>
    <link rel="icon" href="/images/cropped-Parrocchia-32x32.png" sizes="32x32" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#F3F5F8] text-[#324A6D] antialiased">
    <div id="root"></div>
    <script type="module" src="/src/admin/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Aggiungere l'entry in `vite.config.ts`**

Dentro l'oggetto restituito, accanto a `resolve`:
```ts
    build: {
      rolldownOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          admin: path.resolve(__dirname, 'admin.html'),
        },
      },
    },
```

- [ ] **Step 3: Creare `src/admin/main.tsx`**

```tsx
import { createRoot } from 'react-dom/client';
import { AdminApp } from './AdminApp';
import '../index.css';

createRoot(document.getElementById('root')!).render(<AdminApp />);
```

- [ ] **Step 4: Creare `src/admin/Login.tsx`**

```tsx
import React, { useState } from 'react';
import { ErroreApi, login } from './api';

interface LoginProps {
  onEntrato: () => void;
  avviso?: string;
}

export const Login: React.FC<LoginProps> = ({ onEntrato, avviso }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState<string | null>(null);
  const [invio, setInvio] = useState(false);

  const invia = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrore(null);
    setInvio(true);
    try {
      await login(email, password);
      onEntrato();
    } catch (err) {
      setErrore(err instanceof ErroreApi ? err.message : 'Errore di rete, riprova.');
    } finally {
      setInvio(false);
    }
  };

  const campo = 'w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-[#467FF7] focus:outline-none';

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={invia} className="w-full max-w-sm bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-5">
        <h1 className="font-bold text-2xl text-[#1C244B] text-center">Gestione avvisi</h1>
        {avviso && <p className="text-sm text-[#1C244B] bg-[#CDE4E7] rounded-xl px-4 py-3">{avviso}</p>}
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-[#1C244B]">Email</span>
          <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={campo} />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-[#1C244B]">Password</span>
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={campo} />
        </label>
        {errore && <p role="alert" className="text-sm text-red-600">{errore}</p>}
        <button type="submit" disabled={invio} className="btn-elementor w-full disabled:opacity-60">
          {invio ? 'Accesso…' : 'Accedi'}
        </button>
      </form>
    </div>
  );
};
```

- [ ] **Step 5: Creare `src/admin/EditorTesto.tsx`**

```tsx
import React, { useRef } from 'react';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Link as IconaLink, List } from 'lucide-react';
import { normalizzaLink } from './utilita';

interface EditorTestoProps {
  valore: string;
  onCambia: (html: string) => void;
}

export const EditorTesto: React.FC<EditorTestoProps> = ({ valore, onCambia }) => {
  // Tiptap registra onUpdate alla creazione: il ref evita di chiamare una callback vecchia.
  const ultimoOnCambia = useRef(onCambia);
  ultimoOnCambia.current = onCambia;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        italic: false,
        strike: false,
        underline: false,
        code: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        orderedList: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
    ],
    content: valore,
    editorProps: {
      attributes: { class: 'testo-avviso min-h-[8rem] px-4 py-3 text-[#324A6D] focus:outline-none' },
    },
    onUpdate: ({ editor: e }) => ultimoOnCambia.current(e.isEmpty ? '' : e.getHTML()),
  });

  const stato = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      grassetto: e?.isActive('bold') ?? false,
      link: e?.isActive('link') ?? false,
      elenco: e?.isActive('bulletList') ?? false,
    }),
  });

  if (!editor) return null;

  const modificaLink = () => {
    const attuale = editor.getAttributes('link').href as string | undefined;
    const risposta = window.prompt(
      'Indirizzo del link (sito, email o telefono). Lascia vuoto per togliere il link.',
      attuale ?? '',
    );
    if (risposta === null) return;
    if (!risposta.trim()) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    const href = normalizzaLink(risposta);
    if (editor.state.selection.empty && !editor.isActive('link')) {
      editor.chain().focus().insertContent({ type: 'text', text: risposta.trim(), marks: [{ type: 'link', attrs: { href } }] }).run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
    }
  };

  const classeBottone = (attivo: boolean) =>
    `p-2 rounded-lg transition-colors ${attivo ? 'bg-[#467FF7] text-white' : 'text-[#1C244B] hover:bg-gray-100'}`;
  const nonPerdereFocus = (e: React.MouseEvent) => e.preventDefault();

  return (
    <div className="rounded-xl border border-gray-200 focus-within:border-[#467FF7] bg-white">
      <div className="flex gap-1 border-b border-gray-100 p-1.5">
        <button type="button" title="Grassetto" aria-label="Grassetto" aria-pressed={stato?.grassetto}
          className={classeBottone(!!stato?.grassetto)} onMouseDown={nonPerdereFocus}
          onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={16} />
        </button>
        <button type="button" title="Link" aria-label="Link" aria-pressed={stato?.link}
          className={classeBottone(!!stato?.link)} onMouseDown={nonPerdereFocus} onClick={modificaLink}>
          <IconaLink size={16} />
        </button>
        <button type="button" title="Elenco puntato" aria-label="Elenco puntato" aria-pressed={stato?.elenco}
          className={classeBottone(!!stato?.elenco)} onMouseDown={nonPerdereFocus}
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={16} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
```

Se `npm run lint` segnala opzioni di `StarterKit.configure` non riconosciute, controllare i nomi in `node_modules/@tiptap/starter-kit/dist/index.d.ts` (Tiptap 3 include `link` e `underline` nello StarterKit) e adeguare solo i nomi.

- [ ] **Step 6: Creare `src/admin/EditorAvviso.tsx`**

```tsx
import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, ImagePlus, Trash2, X } from 'lucide-react';
import type { Avviso, NuovaImmagine } from '../types';
import { AvvisoCard } from '../components/AvvisoCard';
import { EditorTesto } from './EditorTesto';
import { riduciImmagine } from './immagini';
import { CARTELLA_IMMAGINI, MAX_BYTE_IMMAGINE, byteDaDataUrl, nomeImmagine } from './utilita';

interface EditorAvvisoProps {
  avviso: Avviso;
  indice: number;
  totale: number;
  srcAnteprima: string | null;
  onCambia: (modifiche: Partial<Avviso>, immagine?: NuovaImmagine) => void;
  onSposta: (delta: -1 | 1) => void;
  onElimina: () => void;
}

const campo = 'w-full rounded-xl border px-4 py-2.5 focus:border-[#467FF7] focus:outline-none';
const bottoneIcona = 'p-2 rounded-lg text-[#1C244B] hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent';

export const EditorAvviso: React.FC<EditorAvvisoProps> = ({
  avviso, indice, totale, srcAnteprima, onCambia, onSposta, onElimina,
}) => {
  const [erroreImmagine, setErroreImmagine] = useState<string | null>(null);
  const [caricamento, setCaricamento] = useState(false);
  const titoloMancante = !avviso.titolo.trim();

  const scegliImmagine = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setErroreImmagine(null);
    setCaricamento(true);
    try {
      const dataUrl = await riduciImmagine(file);
      if (byteDaDataUrl(dataUrl) > MAX_BYTE_IMMAGINE) throw new Error('immagine troppo grande');
      const nome = nomeImmagine(avviso.titolo, avviso.id);
      onCambia({ immagine: CARTELLA_IMMAGINI + nome }, { nome, dataUrl });
    } catch {
      setErroreImmagine('Impossibile usare questa immagine. Prova con una foto JPEG o PNG.');
    } finally {
      setCaricamento(false);
    }
  };

  return (
    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-5">
      <header className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-[#1C244B]">Posizione {indice + 1}</span>
        {avviso.bozza ? (
          <span className="text-xs font-semibold uppercase tracking-wide bg-amber-100 text-amber-800 rounded-full px-2.5 py-1">Bozza</span>
        ) : (
          <span className="text-xs font-semibold uppercase tracking-wide bg-[#CDE4E7] text-[#1C244B] rounded-full px-2.5 py-1">Visibile</span>
        )}
        <div className="ml-auto flex items-center gap-1">
          <button type="button" className={bottoneIcona} title="Sposta su" aria-label="Sposta su" disabled={indice === 0} onClick={() => onSposta(-1)}>
            <ArrowUp size={18} />
          </button>
          <button type="button" className={bottoneIcona} title="Sposta giù" aria-label="Sposta giù" disabled={indice === totale - 1} onClick={() => onSposta(1)}>
            <ArrowDown size={18} />
          </button>
          <button type="button" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[#1C244B] hover:bg-gray-100"
            onClick={() => onCambia({ bozza: !avviso.bozza })}>
            {avviso.bozza ? <><Eye size={16} /> Rendi visibile</> : <><EyeOff size={16} /> Metti in bozza</>}
          </button>
          <button type="button" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50" onClick={onElimina}>
            <Trash2 size={16} /> Elimina
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-[#1C244B]">Titolo *</span>
            <input value={avviso.titolo} onChange={(e) => onCambia({ titolo: e.target.value })}
              className={`${campo} ${titoloMancante ? 'border-red-400' : 'border-gray-200'}`} />
            {titoloMancante && <span className="text-sm text-red-600">Il titolo è obbligatorio</span>}
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-[#1C244B]">Descrizione breve</span>
            <input value={avviso.descrizioneBreve} onChange={(e) => onCambia({ descrizioneBreve: e.target.value })}
              className={`${campo} border-gray-200`} />
          </label>
          <div className="space-y-1.5">
            <span className="text-sm font-medium text-[#1C244B]">Testo</span>
            <EditorTesto valore={avviso.testo} onCambia={(testo) => onCambia({ testo })} />
          </div>
          <div className="space-y-1.5">
            <span className="text-sm font-medium text-[#1C244B]">Immagine</span>
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#467FF7] text-[#467FF7] text-sm font-medium cursor-pointer hover:bg-[#467FF7] hover:text-white transition-colors">
                <ImagePlus size={16} />
                {caricamento ? 'Elaborazione…' : srcAnteprima ? 'Sostituisci immagine' : 'Carica immagine'}
                <input type="file" accept="image/*" className="sr-only" onChange={scegliImmagine} disabled={caricamento} />
              </label>
              {avviso.immagine && (
                <button type="button" className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-[#324A6D] hover:bg-gray-100"
                  onClick={() => onCambia({ immagine: null })}>
                  <X size={16} /> Rimuovi immagine
                </button>
              )}
            </div>
            {erroreImmagine && <p className="text-sm text-red-600">{erroreImmagine}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium text-[#1C244B]">Anteprima</span>
          <div className={avviso.bozza ? 'opacity-50' : ''}>
            <AvvisoCard avviso={{ ...avviso, titolo: avviso.titolo || 'Titolo dell’avviso' }} srcImmagine={srcAnteprima} />
          </div>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 7: Creare `src/admin/AdminApp.tsx`**

```tsx
import React, { useCallback, useEffect, useState } from 'react';
import { ExternalLink, LogOut, Plus } from 'lucide-react';
import type { Avviso, NuovaImmagine } from '../types';
import { ErroreApi, caricaAvvisi, logout, pubblica } from './api';
import { cancellaBozza, leggiBozza, salvaBozza } from './bozzaLocale';
import { EditorAvviso } from './EditorAvviso';
import { Login } from './Login';
import { nomeDaPercorso, nuovoId, sposta, superaLimite } from './utilita';

type Fase = 'caricamento' | 'login' | 'editor' | 'errore';

interface Messaggio {
  tipo: 'ok' | 'errore' | 'info';
  testo: string;
  dettaglio?: string;
}

const COLORI_MESSAGGIO: Record<Messaggio['tipo'], string> = {
  ok: 'bg-green-50 text-green-800 border-green-200',
  errore: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-[#CDE4E7]/60 text-[#1C244B] border-[#B4D4DC]',
};

export const AdminApp: React.FC = () => {
  const [fase, setFase] = useState<Fase>('caricamento');
  const [avvisi, setAvvisi] = useState<Avviso[]>([]);
  const [nuoveImmagini, setNuoveImmagini] = useState<Record<string, string>>({});
  const [anteprimePubblicate, setAnteprimePubblicate] = useState<Record<string, string>>({});
  const [sha, setSha] = useState('');
  const [modificato, setModificato] = useState(false);
  const [versione, setVersione] = useState(0);
  const [inPubblicazione, setInPubblicazione] = useState(false);
  const [spazioEsaurito, setSpazioEsaurito] = useState(false);
  const [messaggio, setMessaggio] = useState<Messaggio | null>(null);

  const mostraErrore = useCallback((e: unknown) => {
    if (e instanceof ErroreApi && e.status === 401) {
      setFase('login');
      setMessaggio({ tipo: 'info', testo: 'Sessione scaduta, accedi di nuovo. Le modifiche non pubblicate sono state conservate.' });
    } else if (e instanceof ErroreApi) {
      setMessaggio({ tipo: 'errore', testo: e.message, dettaglio: e.dettaglio });
    } else {
      setMessaggio({ tipo: 'errore', testo: 'Errore di rete, controlla la connessione e riprova.', dettaglio: String(e) });
    }
  }, []);

  const carica = useCallback(async (ignoraBozza = false) => {
    try {
      const dalServer = await caricaAvvisi();
      const bozza = ignoraBozza ? null : leggiBozza();
      if (bozza) {
        setAvvisi(bozza.avvisi);
        setNuoveImmagini(bozza.nuoveImmagini);
        setSha(bozza.sha);
        setModificato(true);
        if (bozza.sha !== dalServer.sha) {
          setMessaggio({ tipo: 'info', testo: 'Attenzione: gli avvisi online sono cambiati dopo l’inizio di queste modifiche. Se pubblichi ti verrà chiesto di ricaricare.' });
        }
      } else {
        setAvvisi(dalServer.avvisi);
        setNuoveImmagini({});
        setSha(dalServer.sha);
        setModificato(false);
      }
      setVersione((v) => v + 1);
      setFase('editor');
    } catch (e) {
      if (e instanceof ErroreApi && e.status === 401) {
        setFase('login');
        return;
      }
      mostraErrore(e);
      setFase('errore');
    }
  }, [mostraErrore]);

  useEffect(() => {
    void carica();
  }, [carica]);

  const applica = (nuoviAvvisi: Avviso[], immagini: Record<string, string> = nuoveImmagini) => {
    setAvvisi(nuoviAvvisi);
    setNuoveImmagini(immagini);
    setModificato(true);
    setSpazioEsaurito(!salvaBozza({ avvisi: nuoviAvvisi, nuoveImmagini: immagini, sha }));
  };

  const aggiornaAvviso = (id: string, modifiche: Partial<Avviso>, immagine?: NuovaImmagine) => {
    const immagini = immagine ? { ...nuoveImmagini, [immagine.nome]: immagine.dataUrl } : nuoveImmagini;
    applica(avvisi.map((a) => (a.id === id ? { ...a, ...modifiche } : a)), immagini);
  };

  const nuovoAvviso = () => {
    applica([{ id: nuovoId(), titolo: '', descrizioneBreve: '', testo: '', immagine: null, bozza: true }, ...avvisi]);
  };

  const elimina = (avviso: Avviso) => {
    const nome = avviso.titolo.trim() || 'senza titolo';
    if (window.confirm(`Eliminare l’avviso “${nome}”? Sparirà dal sito alla prossima pubblicazione.`)) {
      applica(avvisi.filter((a) => a.id !== avviso.id));
    }
  };

  const annullaModifiche = async () => {
    if (!window.confirm('Annullare tutte le modifiche non pubblicate?')) return;
    cancellaBozza();
    setMessaggio(null);
    setSpazioEsaurito(false);
    await carica(true);
  };

  const esci = async () => {
    await logout().catch(() => undefined);
    setMessaggio(null);
    setFase('login');
  };

  const srcAnteprima = (avviso: Avviso): string | null => {
    if (!avviso.immagine) return null;
    const nome = nomeDaPercorso(avviso.immagine);
    return (nome && (nuoveImmagini[nome] ?? anteprimePubblicate[nome])) || avviso.immagine;
  };

  const titoliMancanti = avvisi.some((a) => !a.titolo.trim());

  const pubblicaTutto = async () => {
    const usate = new Set(avvisi.map((a) => a.immagine && nomeDaPercorso(a.immagine)).filter(Boolean));
    const immagini: NuovaImmagine[] = Object.entries(nuoveImmagini)
      .filter(([nome]) => usate.has(nome))
      .map(([nome, dataUrl]) => ({ nome, dataUrl }));
    const richiesta = { avvisi, nuoveImmagini: immagini, sha };
    if (superaLimite(JSON.stringify(richiesta))) {
      setMessaggio({
        tipo: 'errore',
        testo: 'Troppe immagini nuove per una sola pubblicazione. Rimuovine temporaneamente qualcuna, pubblica, poi aggiungile e pubblica di nuovo.',
      });
      return;
    }
    setInPubblicazione(true);
    setMessaggio({ tipo: 'info', testo: 'Pubblicazione in corso…' });
    try {
      const esito = await pubblica(richiesta);
      cancellaBozza();
      setAnteprimePubblicate((p) => ({ ...p, ...nuoveImmagini }));
      setAvvisi(esito.avvisi);
      setNuoveImmagini({});
      setSha(esito.sha);
      setModificato(false);
      setSpazioEsaurito(false);
      setVersione((v) => v + 1);
      setMessaggio({
        tipo: 'ok',
        testo: esito.modalita === 'locale' ? 'Salvato in locale.' : 'Pubblicato. Il sito si aggiorna entro circa un minuto.',
      });
    } catch (e) {
      mostraErrore(e);
    } finally {
      setInPubblicazione(false);
    }
  };

  if (fase === 'caricamento') {
    return <p className="min-h-screen flex items-center justify-center text-[#324A6D]">Caricamento…</p>;
  }

  if (fase === 'login') {
    return (
      <Login
        avviso={messaggio?.testo}
        onEntrato={() => {
          setMessaggio(null);
          setFase('caricamento');
          void carica();
        }}
      />
    );
  }

  if (fase === 'errore') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-red-700">{messaggio?.testo ?? 'Errore imprevisto.'}</p>
        <button type="button" className="btn-elementor" onClick={() => { setFase('caricamento'); void carica(); }}>
          Riprova
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-40">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3">
          <h1 className="font-bold text-xl text-[#1C244B]">Gestione avvisi</h1>
          <div className="ml-auto flex items-center gap-2">
            <a href="/#avvisi" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#1C244B] hover:bg-gray-100">
              <ExternalLink size={16} /> Vedi il sito
            </a>
            <button type="button" onClick={esci}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#1C244B] hover:bg-gray-100">
              <LogOut size={16} /> Esci
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {modificato && (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
            <span>Hai modifiche non pubblicate.</span>
            <button type="button" onClick={annullaModifiche} className="ml-auto text-sm font-semibold underline">
              Annulla modifiche
            </button>
          </div>
        )}
        {spazioEsaurito && (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            Il browser non riesce più a salvare le modifiche in attesa (spazio esaurito). Pubblica appena possibile per non perderle.
          </p>
        )}

        <button type="button" onClick={nuovoAvviso} className="btn-elementor gap-2">
          <Plus size={18} /> Nuovo avviso
        </button>

        {avvisi.length === 0 && (
          <p className="text-center py-12 text-[#324A6D]/80">Nessun avviso. Creane uno con “Nuovo avviso”.</p>
        )}

        {avvisi.map((avviso, indice) => (
          <EditorAvviso
            key={`${avviso.id}-${versione}`}
            avviso={avviso}
            indice={indice}
            totale={avvisi.length}
            srcAnteprima={srcAnteprima(avviso)}
            onCambia={(modifiche, immagine) => aggiornaAvviso(avviso.id, modifiche, immagine)}
            onSposta={(delta) => applica(sposta(avvisi, indice, indice + delta))}
            onElimina={() => elimina(avviso)}
          />
        ))}
      </main>

      <footer className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-0">
            {messaggio && (
              <div className={`rounded-xl border px-4 py-2 text-sm ${COLORI_MESSAGGIO[messaggio.tipo]}`}>
                {messaggio.testo}
                {messaggio.dettaglio && (
                  <details className="mt-1">
                    <summary className="cursor-pointer">Dettagli tecnici</summary>
                    <pre className="whitespace-pre-wrap break-all text-xs mt-1">{messaggio.dettaglio}</pre>
                  </details>
                )}
              </div>
            )}
            {!messaggio && titoliMancanti && <p className="text-sm text-red-600">Completa i titoli mancanti per pubblicare.</p>}
            {!messaggio && !titoliMancanti && !modificato && <p className="text-sm text-[#324A6D]/70">Nessuna modifica da pubblicare.</p>}
          </div>
          <button type="button" onClick={pubblicaTutto}
            disabled={inPubblicazione || titoliMancanti || !modificato}
            className="btn-elementor disabled:opacity-50 disabled:cursor-not-allowed">
            {inPubblicazione ? 'Pubblicazione…' : 'Pubblica'}
          </button>
        </div>
      </footer>
    </div>
  );
};
```

- [ ] **Step 8: Lint e build**

Run: `npm run lint && npm run build && ls dist/admin.html`
Expected: nessun errore; `dist/admin.html` presente. Controllare che il bundle principale non contenga Tiptap: `grep -l prosemirror dist/assets/*.js` deve elencare solo file caricati da `admin.html` (confrontare con gli `<script>` di `dist/index.html`).

- [ ] **Step 9: Verifica end-to-end in locale**

Con `npm run dev` attivo, aprire `http://localhost:3000/admin` e verificare in ordine:
1. Login con credenziali sbagliate → "Credenziali non valide" dopo ~1 s.
2. Login con le credenziali di `.env.local` → elenco dei 4 avvisi, anteprime corrette.
3. "Nuovo avviso" → compare in cima come Bozza; Pubblica disabilitato finché il titolo è vuoto.
4. Compilare titolo, descrizione, testo con grassetto, un link scritto `www.diocesi.rimini.it` e un elenco; caricare una foto dal disco → anteprima immediata.
5. Ricaricare la pagina del browser → banner "Hai modifiche non pubblicate" e lavoro ritrovato.
6. Spostare l'avviso in seconda posizione, renderlo Visibile, mettere "Confessioni" in bozza.
7. Pubblica → "Salvato in locale."; in `http://localhost:3000/#avvisi` (ricaricata) il nuovo avviso è in seconda posizione, Confessioni non c'è, il link punta a `https://www.diocesi.rimini.it`. `ls public/images/avvisi/` mostra la nuova foto.
8. Rimuovere l'immagine dal nuovo avviso e pubblicare → il file sparisce da `public/images/avvisi/`.
9. Eliminare il nuovo avviso, rimettere Confessioni visibile e in fondo, pubblicare.
10. Esci → torna al login; `/api/avvisi` senza cookie risponde 401.

Alla fine ripristinare i dati di partenza (la verifica scrive sui file veri):
```bash
git checkout src/data/avvisi.json
git clean -n public/images/avvisi/   # controllare l'elenco, poi:
git clean -f public/images/avvisi/
```

- [ ] **Step 10: Commit**

```bash
git add admin.html vite.config.ts src/admin/main.tsx src/admin/Login.tsx src/admin/EditorTesto.tsx src/admin/EditorAvviso.tsx src/admin/AdminApp.tsx
git commit -m "feat(avvisi): add /admin dashboard to edit, reorder and publish notices

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Cookie policy e documentazione

**Files:**
- Modify: `src/data/legalContent.ts` (`COOKIE_POLICY_HTML`)
- Modify: `CLAUDE.md`

- [ ] **Step 1: Aggiungere il cookie tecnico alla cookie policy**

In `src/data/legalContent.ts`, dentro `COOKIE_POLICY_HTML`, sostituire esattamente:
```
strettamente necessarie a garantire il funzionamento o la fornitura del Servizio.</p><h3>Misurazione</h3>
```
con:
```
strettamente necessarie a garantire il funzionamento o la fornitura del Servizio.</p><h4>Strumenti di Tracciamento gestiti direttamente dal Titolare</h4><p><strong>sessione_admin</strong>: cookie tecnico impostato solo nell’area riservata alla gestione degli avvisi, dopo l’accesso con le credenziali dell’amministratore. Serve a mantenere attiva la sessione di lavoro e non viene mai impostato per i visitatori del sito.</p><p>Durata: 7 giorni.</p><h3>Misurazione</h3>
```
Verifica: `grep -c "sessione_admin" src/data/legalContent.ts` → `1`.

- [ ] **Step 2: Aggiornare `CLAUDE.md`**

Nella sezione `## Commands`, aggiungere dopo la riga di `npm run lint`:
```
npm test          # node:test via tsx: api/**/*.test.ts, src/**/*.test.ts
```
e sostituire la riga "There is no test suite." con:
```
Tests cover the server-side logic of the notices dashboard (`api/_lib/`) and the dashboard helpers (`src/admin/`). There are no UI tests.
```

Nella sezione `## Architecture`, aggiungere in fondo all'elenco:
```markdown
- **Avvisi (notices) are data, not code:** `src/data/avvisi.json` (type `Avviso`), rendered by `AvvisiPage` through `src/components/AvvisoCard.tsx`. They are edited in the reserved dashboard at `/admin` (`admin.html` + `src/admin/`, a separate Vite entry so Tiptap stays out of the public bundle). Do not hand-edit notices in JSX.
- **Serverless API in `api/`** (Vercel Functions, Web `Request → Response` handlers, relative imports with `.js` extension): `login`, `logout`, `avvisi` (read), `pubblica` (publish). Shared logic lives in `api/_lib/` (underscore = not exposed as routes). Publishing writes through the `Archivio` interface: with `GITHUB_TOKEN` set it makes a single commit via the GitHub Git Data API (Vercel then redeploys); with it empty it writes `src/data/avvisi.json` and `public/images/avvisi/` on disk.
- **Local dev runs the API too:** `dev/apiLocale.ts` is a Vite plugin that mounts the `api/` handlers in `npm run dev` and loads `.env.local`. Required variables are listed in `.env.example`. Note that publishing locally modifies tracked files.
```

- [ ] **Step 3: Verifica finale**

Run: `npm test && npm run lint && npm run build`
Expected: tutto verde.

- [ ] **Step 4: Commit**

```bash
git add src/data/legalContent.ts CLAUDE.md
git commit -m "docs(avvisi): document admin session cookie and dashboard architecture

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

## Dopo l'implementazione (fuori dal piano, a cura dell'utente)

Per andare online su Vercel: creare un token GitHub fine-grained (solo questo repository, "Contents: Read and write"), impostare su Vercel `ADMIN_EMAIL`, `ADMIN_PASSWORD` (nuova), `SESSION_SECRET` (nuovo, `openssl rand -hex 32`), `GITHUB_TOKEN`, `GITHUB_REPO`, `GITHUB_BRANCH`, poi fare push.
