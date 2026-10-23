# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Website for the Parrocchia S. Maria Assunta di Coriano (RN): Mass times, notices, community groups, contacts. All user-facing content is in Italian. The project was scaffolded from a Google AI Studio template (see `metadata.json`, `.env.example`).

## Commands

```bash
npm install
npm run dev       # Vite dev server on http://localhost:3000 (binds 0.0.0.0)
npm run build     # production build to dist/, then prerender of every page
npm run preview   # serve the built dist/
npm run lint      # type-check only (tsc --noEmit); there is no ESLint
npm test          # node:test via tsx: api/**/*.test.ts, src/**/*.test.ts
```

Tests cover the server-side logic of the notices dashboard (`api/_lib/`) and the dashboard helpers (`src/admin/`). There are no UI tests.

## Architecture

- **Stack:** React 19 + TypeScript, Vite, Tailwind CSS v4 (via `@tailwindcss/vite`, no `tailwind.config`), `lucide-react` icons.
- **Routing is hand-rolled, not a router library.** Each page has a real path (`/orari-messe`, `/avvisi`, ...). `src/routes.ts` maps `PageId` ↔ path and holds each page's title and description; `src/App.tsx` keeps `currentPage: PageId | null` (null = 404) in state and syncs it with the History API. Old hash links (`/#avvisi`) are rewritten to the path on load. Every page and the `Navbar`/`Footer` receive an `onNavigate(page)` prop; links between pages use `src/components/PageLink.tsx` (a real `<a href>` that navigates in-app), never `<button>`. Adding a page requires: a new member of the `PageId` union in `src/types/index.ts`, an entry in `PAGES` in `src/routes.ts`, a render branch in `App.tsx`, and a link in `Navbar`/`Footer`.
- **SEO / prerender:** `npm run build` runs `vite build` then `scripts/prerender.tsx`, which renders every page with `renderToString` into `dist/<page>.html` (plus `404.html` and `sitemap.xml`), with the `<head>` from `src/seo.ts` (title, description, canonical, Open Graph, JSON-LD `Church` on the home). `src/main.tsx` hydrates when the root is prerendered. So page components must render the same on server and client: no `window`/`document` during render, only in effects and handlers. `vercel.json` uses `cleanUrls` + `trailingSlash: false` and redirects the old WordPress slugs (`/calendario/*`, `/category/*`, ...). `public/robots.txt` points to the sitemap.
- **Content lives in `src/data/siteData.ts`** (site info, prefestive/festive Mass lists, weekly schedule, community groups, photo lists), typed by interfaces in `src/types/index.ts`. Update content there rather than hardcoding it in page components.
- **Images:** site photos are served from `public/images/` and referenced by absolute path (`/images/foo.jpg`). Many have WordPress-style size variants (`-300x200`, `-1024x682`) carried over from the original site.
- **Styling:** brand tokens are defined in the `@theme` block of `src/index.css` (`primary #1C244B`, `text #324A6D`, `accent #2358CD`, etc.), alongside a `.btn-elementor` pill-button class that mimics the original Elementor site. Components often use raw hex values in Tailwind arbitrary classes (`text-[#324A6D]`); keep to the same palette. Fonts (Poppins, Inter) load from Google Fonts in `index.html`.
- The `@/` import alias maps to the repo root (not `src/`).
- **Avvisi (notices) are data, not code:** `src/data/avvisi.json` (type `Avviso`), rendered by `AvvisiPage` through `src/components/AvvisoCard.tsx`. They are edited in the reserved dashboard at `/admin` (`admin.html` + `src/admin/`, a separate Vite entry so Tiptap stays out of the public bundle). Do not hand-edit notices in JSX.
- **Serverless API in `api/`** (Vercel Functions, Web `Request → Response` handlers, relative imports with `.js` extension): `login`, `logout`, `avvisi` (read), `pubblica` (publish). Shared logic lives in `api/_lib/` (underscore = not exposed as routes). Publishing writes through the `Archivio` interface: with `GITHUB_TOKEN` set it makes a single commit via the GitHub Git Data API, then `pubblica` calls the Vercel Deploy Hook in `VERCEL_DEPLOY_HOOK` (pushes from GitHub do not reliably trigger deploys on this Hobby project); with it empty it writes `src/data/avvisi.json` and `public/images/avvisi/` on disk.
- **Local dev runs the API too:** `dev/apiLocale.ts` is a Vite plugin that mounts the `api/` handlers in `npm run dev` and loads `.env.local`. Required variables are listed in `.env.example`. Note that publishing locally modifies tracked files.

## Architettura operativa a 3 livelli (DOE)

Lavora come un sistema di agenti specializzati, con tre livelli che separano le responsabilità.

### Livello 1: Direttive (cosa fare)

I file `AGENT.md` e `SKILL.md` sono le direttive: SOP in linguaggio naturale da seguire come istruzioni precise.

- Agenti e skill sono **cartelle di 1° livello nella root** (nessun contenitore `agents/` o `skills/`): prefisso `Agente` (es. `Agente Business Consultant/`) e prefisso `Skill` (es. `Skill Preventivo/`).
- L'utente li richiama con la funzione **@** (es. `@Agente Business Consultant, @Skill Preventivo: [cosa fare]`). Quando ricevi una @-cartella, leggi il suo `.md` principale; con agente + skill leggi `AGENT.md` e `SKILL.md` e lavora seguendo le istruzioni combinate.

### Livello 2: Orchestrazione (decisioni): sei tu

Fai routing intelligente: leggi le direttive, chiama gli strumenti di esecuzione nell'ordine giusto, gestisci gli errori, chiedi chiarimenti quando serve, aggiorna le direttive con ciò che impari.

### Livello 3: Esecuzione (fare il lavoro)

Script Python deterministici in `execution/`. Usa script invece di lavoro manuale: se uno script esiste già usalo, altrimenti crealo, testalo e salvalo per il futuro.

### Principi operativi

1. **Controlla prima i tool esistenti** in `execution/`; crea nuovi script solo se non ne esistono.
2. **Auto-correggiti:** leggi l'errore, correggi, testa, aggiorna la direttiva con ciò che hai imparato. Se servono token o crediti a pagamento, chiedi prima all'utente.
3. **Aggiorna le direttive:** sono documenti vivi. Quando scopri vincoli, approcci migliori o errori comuni, proponi l'aggiornamento; non sovrascrivere senza chiedere.

### Organizzazione file

- `execution/`: script Python (tool deterministici)
- `.tmp/`: file intermedi, sempre rigenerabili, mai committare
- `.env`: chiavi API e credenziali
- `output/`: deliverable finali. Ogni agente salva nella cartella che corrisponde alla seconda parte del suo nome (es. `Agente Business Consultant` → `output/Business Consultant/`)

Queste cartelle (e `context/info-azienda.md`, da leggere sempre prima di operare se presente) non esistono ancora in questo repo: creale quando servono. Per il sito web lo stack resta quello descritto sopra (Vite + React + Tailwind), non Next.js. Se esiste `brand-guidelines.md` nella root, consultalo.

## Notes

- Deployment: code on GitHub, hosted on Vercel (not WordPress/SiteGround like the old site). Live at `https://www.parrocchiacoriano.com` (the bare domain 308-redirects to www; DNS on Namecheap BasicDNS); `parrocchia-coriano.vercel.app` still works. The privacy and cookie texts in `src/data/legalContent.ts` (pages `#privacy`, `#cookie-policy`, rendered by `src/pages/LegalPage.tsx`) must stay consistent with the third-party services the site actually uses.

- `vite.config.ts` disables HMR/file watching when `DISABLE_HMR=true` (AI Studio behaviour); leave that block as is.
- `@google/genai`, `express`, `dotenv` and `GEMINI_API_KEY` are template leftovers: nothing in `src/` uses them yet.
