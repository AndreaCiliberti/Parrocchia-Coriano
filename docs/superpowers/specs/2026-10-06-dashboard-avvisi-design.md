# Dashboard Avvisi — Design

Data: 2026-10-06
Stato: approvato in chat, in revisione scritta

## Obiettivo

Permettere alla parrocchia di gestire la pagina Avvisi (`#avvisi`) senza toccare il codice: un'area riservata dove creare, modificare, ordinare, nascondere (bozza) ed eliminare avvisi, e un bottone **Pubblica** che rende visibili le modifiche sul sito.

Vincoli emersi:

- Pochi avvisi (circa 5 alla volta), contenuto leggero: niente database.
- Un solo utente: email e password fisse, nessun recupero password.
- Sito statico Vite + React ospitato su Vercel, codice su GitHub.
- Il testo dell'avviso richiede solo grassetto, link ed elenchi puntati.

## Decisioni prese

| Tema | Decisione |
|------|-----------|
| Archiviazione | File JSON nel repository GitHub; Pubblica = commit, Vercel ricostruisce il sito (~1 minuto) |
| Avviso "Confessioni" | Diventa un avviso normale, gestito dalla dashboard |
| Descrizione breve | Sottotitolo in grassetto nella scheda, tra titolo e testo |
| Bottoni (CTA) | Nessun campo dedicato: i link si scrivono nel testo |
| Salvataggio | Solo con Pubblica; le modifiche non pubblicate restano nel `localStorage` del browser |
| Limite avvisi | Nessun limite rigido |

## 1. Modello dati

File: `src/data/avvisi.json`, importato staticamente da `AvvisiPage`.

```json
{
  "avvisi": [
    {
      "id": "k3x9a2",
      "titolo": "Festa dei nonni",
      "descrizioneBreve": "Domenica 28 giugno, cortile Suore",
      "testo": "<p>Vi aspettiamo <strong>tutti</strong>…</p><ul><li>…</li></ul>",
      "immagine": "/images/avvisi/festa-dei-nonni-k3x9a2.jpg",
      "bozza": false
    }
  ]
}
```

- L'ordine nell'array è l'ordine di visualizzazione.
- `id`: stringa casuale breve, generata alla creazione.
- `descrizioneBreve`: può essere vuota (in quel caso il sottotitolo non viene mostrato).
- `testo`: HTML ristretto ai tag `p`, `br`, `strong`, `a` (solo `href` http/https/mailto/tel), `ul`, `li`.
- `immagine`: percorso sotto `/images/avvisi/` oppure `null`.
- Tipo TypeScript `Avviso` in `src/types/index.ts`.

Immagini: `public/images/avvisi/<slug-titolo>-<id>.jpg`. A ogni pubblicazione le immagini in quella cartella non più referenziate dal JSON vengono eliminate nello stesso commit.

Migrazione iniziale: i 4 avvisi oggi scritti a mano in `AvvisiPage.tsx` vengono trasferiti nel JSON (le loro immagini restano dove sono in `/images/`; il ripulitore tocca solo `/images/avvisi/`). I bottoni dell'avviso del Papa diventano link nel testo; il riquadro telefoni della Festa dei nonni diventa un elenco con link `tel:`.

## 2. Pagina Avvisi pubblica

`src/pages/AvvisiPage.tsx` mantiene intestazione e stile attuali (scheda `bg-[#F9FAFD] rounded-3xl`) e renderizza in ordine gli avvisi con `bozza: false`:

1. immagine (se presente), `object-contain`, `alt` = titolo;
2. titolo (`h2`);
3. descrizione breve in grassetto (se presente);
4. testo, inserito come HTML già ripulito, con stili per `a` (`#467FF7`, semibold), `strong`, `ul` (elenco puntato).

Nessun avviso visibile → messaggio "Al momento non ci sono avvisi."

Il componente scheda (`AvvisoCard`) è condiviso con l'anteprima della dashboard, così anteprima e sito coincidono.

## 3. Dashboard `/admin`

Pagina separata: secondo entry point Vite (`admin.html` + `src/admin/main.tsx`), così Tiptap e il codice admin non finiscono nel bundle pubblico. `<meta name="robots" content="noindex, nofollow">`, nessun link da Navbar/Footer. Su Vercel `/admin` serve `admin.html` (rewrite in `vercel.json`).

**Login:** form email + password → `POST /api/login`. Email confrontata senza distinzione di maiuscole. Errore generico "Credenziali non valide".

**Editor:** elenco degli avvisi nell'ordine attuale. Per ognuno:

- campi Titolo (obbligatorio), Descrizione breve, Testo (editor Tiptap con soli Grassetto, Link, Elenco puntato), Immagine (carica / sostituisci / rimuovi);
- frecce su/giù per la posizione;
- interruttore Visibile / Bozza (le bozze hanno un'etichetta "Bozza" e appaiono attenuate);
- Elimina, con conferma;
- anteprima live con `AvvisoCard`.

In alto: "+ Nuovo avviso" (aggiunto in cima, come bozza). In fondo: bottone **Pubblica**.

**Immagini:** ridimensionate nel browser con canvas (lato lungo max 1600 px, JPEG qualità 0.82) prima dell'invio; tenute in memoria come data URL finché non si pubblica.

**Stato locale:** ogni modifica viene salvata in `localStorage` insieme allo `sha` del file da cui si è partiti. Alla riapertura, se esistono modifiche non pubblicate, compare il banner "Hai modifiche non pubblicate" con "Annulla modifiche" (ricarica dal server). Dopo una pubblicazione riuscita il `localStorage` viene svuotato.

**Esito pubblicazione:** "Pubblicazione in corso…" → "Pubblicato. Il sito si aggiorna entro circa un minuto." (in modalità locale: "Salvato in locale.").

## 4. Funzioni server (`api/`, Vercel Functions Node)

Logica in moduli condivisi `api/_lib/` (il prefisso `_` impedisce a Vercel di esporli come endpoint):

- `sessione.ts`: crea e verifica il cookie `sessione_admin` = `scadenza.firmaHMAC-SHA256(SESSION_SECRET)`; `HttpOnly`, `SameSite=Strict`, `Path=/`, `Secure` in produzione, durata 7 giorni.
- `credenziali.ts`: confronto a tempo costante di email e password con `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
- `sanifica.ts`: whitelist dei tag/attributi del testo (vedi §1); i link esterni ricevono `target="_blank" rel="noopener noreferrer"`.
- `valida.ts`: controllo della forma degli avvisi ricevuti (campi, tipi, lunghezze massime, immagini solo JPEG data URL ≤ 2 MB ciascuna).
- `archivio.ts`: interfaccia `leggi()` / `scrivi(avvisi, nuoveImmagini, shaAtteso)` con due implementazioni:
  - **GitHub** (se `GITHUB_TOKEN` è impostato): lettura via Contents API; scrittura in un unico commit con la Git Data API (blob → tree → commit → aggiornamento ref), che include JSON, immagini nuove ed eliminazione di quelle orfane. Messaggio: `avvisi: aggiornamento dalla dashboard`.
  - **Locale** (se `GITHUB_TOKEN` è vuoto): legge e scrive direttamente `src/data/avvisi.json` e `public/images/avvisi/` su disco; lo `sha` è l'hash del contenuto del file.

Endpoint:

| Metodo | Percorso | Auth | Effetto |
|--------|----------|------|---------|
| POST | `/api/login` | no | Verifica credenziali, imposta cookie. Errore: 401 dopo ~1 s di attesa |
| POST | `/api/logout` | no | Cancella il cookie |
| GET | `/api/avvisi` | sì | `{ avvisi, sha }` dalla fonte attuale |
| POST | `/api/pubblica` | sì | Body `{ avvisi, nuoveImmagini: [{ nome, dataUrl }], sha }` → valida, sanifica, scrive. 409 se `sha` non corrisponde |

Senza cookie valido gli endpoint protetti rispondono 401.

Variabili d'ambiente:

| Nome | Uso |
|------|-----|
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Credenziali di accesso |
| `SESSION_SECRET` | Chiave di firma del cookie (stringa casuale lunga) |
| `GITHUB_TOKEN` | Token fine-grained, solo questo repo, permesso Contents read/write. Vuoto in locale |
| `GITHUB_REPO`, `GITHUB_BRANCH` | `AndreaCiliberti/Parrocchia-Coriano`, `main` |

In locale stanno in `.env.local` (ignorato da git); in produzione nelle Environment Variables di Vercel. `.env.example` viene aggiornato con i nomi (senza valori reali).

## 5. Sviluppo locale senza Vercel

Un plugin Vite (`vite.config.ts`, attivo solo in `serve`) monta gli stessi handler di `api/` come middleware del dev server e carica `.env.local`. Con `npm run dev`:

- `http://localhost:3000/admin` apre la dashboard;
- Pubblica scrive su disco (modalità locale), Vite ricarica e `#avvisi` mostra subito il risultato;
- nessun account Vercel né token GitHub necessario.

Gli handler sono scritti in forma indipendente dal runtime (`(richiesta) => risposta`) con un piccolo adattatore per Vercel e uno per il middleware Vite.

## 6. Errori

Messaggi in italiano nella dashboard:

- 401 su qualsiasi chiamata → "Sessione scaduta, accedi di nuovo" e ritorno al login (le modifiche restano nel `localStorage`).
- 409 → "Gli avvisi sono stati modificati altrove. Ricarica per vedere la versione aggiornata." (le modifiche locali non vengono perse finché non si sceglie Annulla).
- 413 / immagine troppo grande → messaggio sul singolo avviso.
- Errore GitHub o di rete → "Pubblicazione non riuscita, riprova tra poco." con il dettaglio tecnico in un riquadro espandibile.
- Titolo vuoto → Pubblica disabilitato e campo evidenziato.

## 7. Test

Il progetto non ha una suite di test. Si aggiungono test mirati con `node:test` eseguiti via `tsx` (script `npm test`), sulle parti a rischio:

- `sanifica`: tag non ammessi rimossi, `javascript:` nei link rifiutato, attributi extra eliminati;
- `sessione`: cookie valido accettato, scaduto o manomesso rifiutato;
- `valida`: avvisi malformati e immagini oltre il limite rifiutati;
- `archivio` locale: scrittura del JSON, salvataggio immagini nuove, eliminazione delle orfane, 409 su `sha` diverso.

Verifica end-to-end manuale in locale: login, creazione, riordino, bozza, eliminazione, immagine, pubblicazione, controllo di `#avvisi`. `npm run lint` e `npm run build` devono passare.

## 8. Privacy e documentazione

- Nessun nuovo servizio di terze parti per i visitatori.
- `src/data/legalContent.ts`: aggiungere alla cookie policy il cookie tecnico `sessione_admin`, usato solo nell'area riservata.
- `CLAUDE.md`: aggiornare la sezione Architecture (contenuto avvisi in `avvisi.json`, area `/admin`, cartella `api/`, modalità locale).

## Fuori ambito

- Più utenti, ruoli, recupero password.
- Programmazione di pubblicazione/scadenza automatica degli avvisi.
- Mostrare gli avvisi in Home Page.
- Bottoni CTA dedicati.
