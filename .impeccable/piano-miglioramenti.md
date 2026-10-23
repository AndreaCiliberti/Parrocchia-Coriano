# Piano miglioramenti grafici: da dove riprendere

Aggiornato: 2026-10-23

## Stato

- Critica completa del sito fatta con `/impeccable critique`: **23/40** (accettabile). Report completo: `.impeccable/critique/2026-10-21T16-25-14Z__src-pages-sito-intero.md`.
- `PRODUCT.md` creato nella root (profilo: parrocchiani abituali, tono accogliente e caldo, da evitare "vecchio sito parrocchiale" e "troppo chiesastico", identità = territorio + chiesa e storia + foto della comunità, accessibilità standard).
- `DESIGN.md` non esiste ancora (si può generare con `/impeccable document`).
- Passi 1, 2, 3, 5 e 6 fatti il 2026-10-23 (4 cancellato). Nuova critica: **31/40** (era 23/40), report in `.impeccable/critique/2026-10-23T07-49-16Z__src-pages-sito-intero.md` (modifiche nel codice, **non ancora committate**: `PRODUCT.md` e `.impeccable/` vanno nello stesso commit).

## Decisioni dell'utente

- Si parte da **menu e nomi delle pagine**.
- Si procede **un passo alla volta**: dopo ogni passo l'utente guarda il risultato e decide il successivo.
- Foto: **usare quelle già nel sito** (Coriano sulle colline `coriano.jpg`, dipinto della chiesa `48030.jpg`, archivio della Storia, foto di comunità), niente foto nuove per ora.

## Passi

1. **`/impeccable clarify`: menu e nomi** ✅ FATTO (2026-10-23)
   Applicato: menu e footer = Orari Messe · Avvisi · Orari settimanali · Gruppi · Foto · Storia · Contatti; titoli "Orari delle Messe" (sottotitolo "Coriano e le altre chiese della zona pastorale"), "Orari settimanali", "Gruppi della parrocchia", "Foto della comunità"; footer "Legal" → "Note legali"; card della home allineate; testo home corretto (le chiese sono più dei 5 paesi citati prima). Gli id delle pagine (hash) non sono cambiati.
   Problema di partenza: tre voci "comunità" indistinguibili (Immagini di comunità / Vita comunità / Comunità parrocchiale) e nomi diversi tra menu, footer e card della home. Proposta da far approvare PRIMA di cambiare: "Foto", "Orari settimanali", "Gruppi"; meno voci; "Legal" → italiano; titoli delle pagine allineati al menu. File: `src/components/Navbar.tsx`, `src/components/Footer.tsx`, card in `src/pages/HomePage.tsx`, titoli delle pagine.
2. **`/impeccable layout`** ✅ FATTO (2026-10-23)
   Applicato: dati delle Messe riorganizzati in `siteData.ts` (`CORIANO_MASSES` + `ZONE_CHURCHES`, una voce per chiesa; sostituiscono `PREFESTIVE_MASSES`/`FESTIVE_MASSES` e il tipo `MassTime`). Pagina Orari: riquadro blu scuro con le Messe di Coriano (sabato, domenica, feriali) in cima, poi tabella "una riga per chiesa" con colonne Sabato/Domenica in ordine alfabetico (scelta dell'utente; il raggruppamento per paese non era possibile perché i dati non dicono in che paese sono S. Salvatore, S. Savino ecc.). Home: orari di Coriano nella prima schermata, pulsante "Orari di tutta la zona". Se cambiano gli orari feriali, aggiornare sia `CORIANO_MASSES` sia `WEEKLY_SCHEDULE`.
   Da rivedere nel passo 3: la sezione "Orari Messe" con le 4 foto in home ora ripete il pulsante dell'hero.
   Obiettivo iniziale: Messe di Coriano in evidenza in home e in cima a Orari; le 30 chiese raggruppate per paese o fascia oraria (`src/pages/OrariPage.tsx`, `src/data/siteData.ts`).
3. **`/impeccable distill`** ✅ FATTO (2026-10-23)
   Applicato: home = hero (con orari di Coriano) → Avvisi (primi 3 pubblicati da `avvisi.json`, titolo + descrizione breve o estratto del testo, poi "Leggi tutti gli avvisi") → Vita della comunità (2 card: Orari settimanali, Gruppi). Tolti: sezione "Orari Messe" con 4 foto, sezione "Avvisi" con foto stock, "In evidenza" scritto a mano (diceva adorazione 8-9 mentre Orari settimanali dice 7.30-9.30; il suo 8x1000 è un avviso in bozza), card Avvisi. Tolti i box Contatti da Orari, Orari settimanali, Gruppi, Foto (restano nel footer e in Contatti). Nuovo `src/data/avvisiPubblici.ts` (`soloPubblicati`, `estratto`) con test, usato da home e pagina Avvisi.
   Da rivedere nel passo 4: le 2 card "Vita della comunità" sono ancora card identiche con foto stock (calice, ragazzi Pexels).
   Obiettivo iniziale: home con gli ultimi 2-3 avvisi letti da `src/data/avvisi.json`; togliere "In evidenza" scritto a mano (duplica gli avvisi con testi diversi), la seconda griglia di foto stock e i box Contatti ripetuti su 4 pagine.
4. **`/impeccable bolder`** ❌ CANCELLATO (decisione dell'utente, 2026-10-23: le immagini restano come sono). Era: hero con foto vera di Coriano al posto dell'acquerello Depositphotos; via le foto stock (Pexels mani colorate, doposcuola, bambini catechismo).
5. **`/impeccable audit`** ✅ FATTO (2026-10-23)
   Applicato: blu `#467FF7` → `#2358CD` (scelto dall'utente tra 3 tonalità: 6,3:1 su bianco, 6,0:1 su `#F9FAFD`), hover `#336de6` → `#184CBF`, in tutto il sito, nella dashboard, in `index.css` e in CLAUDE.md. Card della home: titolo = vero `<button>` con area cliccabile estesa a tutta la card (`after:absolute after:inset-0`) e bordo di focus. Titoli: Avvisi e Foto ora hanno un h1 (il motto è un `<p>`), giorni di Orari settimanali h4 → h2, card della home h4 → h3.
   Rimasti da fare (trovati nell'audit, non corretti): foto della pagina Foto apribili solo col mouse (`div onClick`); 4 `focus:outline-none` che nascondono il focus (logo e hamburger nella navbar); hamburger senza `aria-expanded`; nessun rispetto di `prefers-reduced-motion` (zoom e sollevamento al passaggio, scroll animato); solo la pagina Storia usa `loading="lazy"` sulle immagini; in Storia un elenco senza titolo fa saltare da h3 a h5.
   Obiettivo iniziale: blu `#467FF7` a 3,7:1 → scurire fino ad almeno 4,5:1 per pulsanti e orari; card della home da `div onClick` a veri link/button; ordine dei titoli (h1→h3 in home, h2→h5 in Avvisi).
6. **`/impeccable polish`** ✅ FATTO (2026-10-23), poi critica rilanciata: 31/40.
   Testi approvati: footer "© {anno} Parrocchia…", Email/Telefono/Segreteria uniformi, "Informativa privacy", intro Contatti nuova, "Campo lavoro 2026", motto solo in Foto, descrizioni nuove delle 2 card. Da confermare: sottotitolo di Orari settimanali ("Preghiera, segreteria e attività della parrocchia, giorno per giorno.").
   Tecnico: navbar con focus visibile, `aria-expanded`, `aria-current`, aree tattili più grandi; `prefers-reduced-motion` (CSS + `src/utils/motion.ts` per lo scroll, `motion-safe:` sugli effetti al passaggio); `loading="lazy"` sotto la piega; Foto con pulsanti veri, Esc e focus che torna alla foto; Storia h4/h5 corretti. Stile: intestazioni a sinistra con h1 uguale; Orari settimanali senza riquadri per giorno, dipinto piccolo accanto al titolo; Foto senza card annidate; Gruppi senza finto effetto cliccabile; immagine di Contatti decorativa con icona mappa.

## Piano chiuso il 2026-10-23

L'utente considera il lavoro finito. Restano solo come promemoria, da fare solo se richiesti:

- [P2] Orari feriali di Coriano scritti due volte (`CORIANO_MASSES` e `WEEKLY_SCHEDULE`); orario dell'adorazione da verificare con la segreteria (7.30-9.30 o 8-9). `/impeccable harden`
- [P2] Citazione con barra laterale in Storia (`StoriaPage.tsx:26`) e box dentro la card Caritas nei Gruppi. `/impeccable polish`
- [P3] Inter scaricato ma non usato (`index.html`), credito foto a 11px in Storia, Esc per chiudere il menu da telefono, tasto Indietro che non ripristina la posizione. `/impeccable optimize`

## Promemoria pratici

- Dopo ogni push: Vercel **non** parte da solo. Serve Deployments → Create Deployment → `main` (non "Redeploy", che ricostruisce il commit vecchio). Verificare poi su https://parrocchia-coriano.vercel.app.
- Commit con: `git -c user.name="Andrea Ciliberti" -c user.email="164937902+AndreaCiliberti@users.noreply.github.com" commit ...`
- Prima di fare push, `git fetch`: la dashboard degli avvisi committa direttamente su `main`.
- Il browser non permette screenshot sul dominio Vercel: per guardare il sito usare `npm run dev` su localhost:3000.
