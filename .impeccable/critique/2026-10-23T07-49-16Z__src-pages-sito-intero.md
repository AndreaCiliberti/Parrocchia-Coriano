---
target: sito della parrocchia
total_score: 31
p0_count: 0
p1_count: 1
timestamp: 2026-10-23T07-49-16Z
slug: src-pages-sito-intero
---
# Critica: sito della parrocchia (dopo i passi 1, 2, 3, 5, 6)

Valutazione A (revisione di design) fatta prima del rilevatore; valutazione B = `detect.mjs` sui sorgenti + rilevatore iniettato nel browser su Home, Orari, Gruppi, Storia.

## Punteggio (euristiche di Nielsen)

| # | Euristica | Voto | Problema principale |
|---|---|---|---|
| 1 | Stato del sistema | 3 | Menu attivo e `aria-current` ok; il tasto Indietro non riporta alla posizione nella pagina |
| 2 | Linguaggio dell'utente | 4 | Nomi chiari e uguali ovunque, italiano piano, note "gen – giu" comprensibili |
| 3 | Controllo e libertà | 3 | Esc chiude le foto, menu chiudibile; il menu da telefono non si chiude con Esc |
| 4 | Coerenza | 3 | Intestazioni, blu e nomi allineati; restano card dentro card (Gruppi) e la citazione con barra laterale (Storia) |
| 5 | Prevenzione errori | 3 | Avvisi letti dai dati; ma gli orari feriali di Coriano sono scritti in due punti |
| 6 | Riconoscere, non ricordare | 3 | Coriano in cima e una riga per chiesa; S. Salvatore, S. Savino ecc. senza paese |
| 7 | Efficienza | 3 | Orari di Coriano nella prima schermata della home |
| 8 | Estetica minimale | 3 | Home a 3 sezioni, niente doppioni; le immagini stock restano |
| 9 | Recupero errori | 3 | Messaggi "nessun avviso" in home e in Avvisi |
| 10 | Aiuto | 3 | Contatti nel footer di ogni pagina, orari della segreteria chiari |
| **Totale** | | **31/40** | **Buono** (era 23/40) |

## Verdetto anti-pattern

**Valutazione A**: non sembra più un template generico nella struttura (tabella Messe, riquadro Coriano, avvisi in elenco), ma l'identità visiva è ancora affidata a immagini stock: acquerello Depositphotos nell'hero, acquerello di una chiesa qualsiasi nella pagina Contatti (dove ci si aspetta una mappa), bambini e mani colorate nei Gruppi, calice e ragazzi nelle card della home. Le due card "Vita della comunità" sono una griglia di card identiche in piccolo.

**Valutazione B** (rilevatore): CLI 2 risultati, browser 4 + 2 + 3 + 5.
- Reali: barra laterale `border-l-4` sulla citazione in `StoriaPage.tsx:26` (divieto assoluto); card dentro card nei Gruppi (box contatti Caritas); un solo font (Poppins; Inter viene scaricato ma è solo un ripiego, quindi peso inutile); credito foto a 11px in Storia.
- Falsi positivi: contrasto 1,0:1 e 1,6:1 nell'hero di Storia (il testo sta su foto con velo blu al 70%); "glow su pagina scura" (la pagina è chiara, è l'ombra blu dei pulsanti); paragrafo "al bordo" (riga del copyright centrata); card dentro card in home (il rilevatore conta il riquadro della foto); "Capitolo I…V" ripetuti in Storia (voluti, sono capitoli).

## Impressione generale

Il sito ora fa bene il suo lavoro principale: l'orario della Messa si trova in due secondi e la navigazione non confonde più. Il limite è l'identità: senza foto vere di Coriano e della comunità resta un sito ordinato ma anonimo. La singola opportunità più grande è il passo 4 saltato.

## Cosa funziona

- Riquadro blu scuro con le Messe di Coriano: è la cosa più importante della pagina e si vede subito, anche da telefono.
- Tabella "una riga per chiesa": chi frequenta sempre la stessa chiesa la trova senza scorrere 30 righe, e le alternanze di Croce/S. Savino diventano evidenti.
- Home che legge gli avvisi dai dati: niente più testi scritti a mano che divergono dalla dashboard.

## Problemi prioritari

- **[P1] Le immagini stock portano ancora l'identità.** Contraddicono "persone e luoghi veri" (PRODUCT.md) e l'anti-riferimento "template anonimo". La pagina Contatti mostra un acquerello generico dove ci si aspetta una mappa. Fix: hero con `coriano.jpg` o il dipinto `48030.jpg`, foto del campo lavoro nelle card, mappa vera o solo l'indirizzo con link in Contatti. Comando: `/impeccable bolder`.
- **[P2] Orari scritti due volte e un conflitto da chiarire.** Messe feriali di Coriano in `CORIANO_MASSES` e in `WEEKLY_SCHEDULE`; l'adorazione era indicata 8-9 nel vecchio "In evidenza" e 7.30-9.30 in Orari settimanali. Fix: ricavare `CORIANO_MASSES.weekdays` da `WEEKLY_SCHEDULE` e verificare l'orario dell'adorazione con la segreteria. Comando: `/impeccable harden`.
- **[P2] Due residui di stile da template.** Citazione con barra laterale in Storia e box bianco dentro la card Caritas nei Gruppi. Fix: citazione con sfondo tenue e virgolette grandi, contatto Caritas come righe semplici. Comando: `/impeccable polish`.
- **[P3] Peso e dettagli.** Inter scaricato senza essere usato, credito foto a 11px in Storia, tasto Indietro che non ripristina la posizione. Comando: `/impeccable optimize`.

## Persona: segnali d'allarme

**Parrocchiana anziana, dal telefono, sabato pomeriggio**: trova subito "Sabato 18.30" in home. Nella tabella delle altre chiese le note "ora solare / ora legale" in grigio piccolo sono leggibili ma al limite; il trattino per "nessuna Messa" è corretto ma tenue.

**Nuovo arrivato a Coriano (Jordan)**: non sa dove sia "S. Salvatore" o "S. Savino": la tabella non lo aiuta. Nella pagina Contatti cerca una mappa e trova un acquerello.

**Utente da tastiera / lettore di schermo**: menu, card della home e foto ora funzionano; il menu da telefono si apre e si chiude col pulsante ma non con Esc.

## Osservazioni minori

- Le attività in Orari settimanali scrivono "Chiesa Parrocchiale" e "chiesa parrocchiale" in modi diversi (dati in `siteData.ts`).
- "Ore" ripetuto davanti a ogni orario in Orari settimanali: la colonna basta.
- Il blocco PN Inclusione nel footer è lungo e fitto su ogni pagina; è un obbligo, ma potrebbe stare più compatto.
- Nella pagina Orari settimanali c'è un sottotitolo nuovo ("Preghiera, segreteria e attività della parrocchia, giorno per giorno.") da confermare.

## Domande

- Se la home mostrasse "La prossima Messa a Coriano: oggi alle 18.30", servirebbero ancora tre orari?
- Che cosa racconterebbe una sola foto vera della comunità al posto dell'acquerello?
- La pagina Contatti ha bisogno di un'immagine, o basta l'indirizzo con il link alla mappa?
