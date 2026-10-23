---
target: sito della parrocchia
total_score: 23
p0_count: 0
p1_count: 3
timestamp: 2026-10-21T16-25-14Z
slug: src-pages-sito-intero
---
# Critica: sito Parrocchia Coriano (tutte le pagine pubbliche)

## Punteggio euristiche: 23/40 (Accettabile)

| # | Euristica | Voto | Problema principale |
|---|---|---|---|
| 1 | Stato del sistema | 3 | Menu attivo ok; il tasto Indietro non riporta in cima alla pagina |
| 2 | Linguaggio dell'utente | 2 | Tre voci "comunità" indistinguibili; "Legal" in inglese |
| 3 | Controllo e libertà | 3 | Sito semplice, nessuna trappola |
| 4 | Coerenza | 2 | Stessa pagina con 3 nomi diversi tra menu, footer e home |
| 5 | Prevenzione errori | 2 | Orari scritti a mano in home, già diversi dagli avvisi |
| 6 | Riconoscere, non ricordare | 2 | Orari Messe: 30 righe piatte, bisogna sapere quale chiesa cercare |
| 7 | Efficienza | 1 | Nessuna scorciatoia "Messe di oggi / domenica" |
| 8 | Estetica minimale | 2 | Foto stock, sezioni ripetute, box Contatti su ogni pagina |
| 9 | Recupero errori | 3 | Messaggio "nessun avviso" presente |
| 10 | Aiuto | 3 | Contatti sempre raggiungibili |

## Anti-pattern
Template Elementor: titolo centrato + tre card identiche, due sezioni "4 foto + testo + pulsante" uguali, pulsanti a pillola ovunque. Foto stock (illustrazione Depositphotos nell'hero, mani colorate e doposcuola da Pexels, bambini del catechismo) contro foto vere di Coriano già presenti (coriano.jpg, dipinto 48030.jpg, archivio Storia).
Scanner: 4 segnalazioni nel codice (side-stripe in StoriaPage.tsx:25, solo Poppins, bg-black nel lightbox = falso positivo) e 13 nel browser (contrasto basso sui pulsanti, card annidate, riga troppo lunga nel testo PN Inclusione, salto h1 a h3).

## Priorità
- [P1] La home non risponde a "a che ora è la Messa?" e la pagina Orari è una lista piatta di 30 chiese in maiuscolo. Fix: Messe della parrocchia di Coriano in evidenza in home e in cima a Orari, raggruppare per paese o fascia oraria.
- [P1] Foto stock al posto di persone e luoghi veri. Fix: hero con foto reale di Coriano/chiesa, sostituire le stock con foto della comunità.
- [P1] Gli avvisi veri non compaiono in home; "In evidenza" è scritto a mano e duplica gli avvisi con testo diverso. Fix: home legge gli ultimi avvisi da avvisi.json; togliere "In evidenza" o spostarlo nei dati.
- [P2] Navigazione confusa: Immagini di comunità / Vita comunità / Comunità parrocchiale, nomi diversi tra menu, footer, home. Fix: rinominare (Foto, Orari settimanali, Gruppi) e uniformare.
- [P2] Accessibilità: blu #467FF7 a 3,7:1 (sotto 4,5:1) su pulsanti e orari; card della home sono div cliccabili non raggiungibili da tastiera. Fix: scurire l'accento, usare button/link.

## Persone
- Anna, 74 anni, parrocchiana: sul telefono deve aprire il menu, poi scorrere 30 righe in maiuscolo per trovare la sua Messa; orari in blu chiaro poco leggibili.
- Casey (mobile, distratto): in home vede titolo e acquerello, poi 4 foto stock prima di qualsiasi orario.
- Marco, papà per il catechismo: "Vita comunità" o "Comunità parrocchiale"? Nella card trova solo "chiedi del referente in segreteria".

## Minori
Titoli h1 → h3 e h2 → h5; "gruppi comunità Parrocchiale" minuscolo; "E'" invece di "È"; box Contatti identico su 4 pagine; loghi partner minuscoli; testo PN Inclusione a 12px su 150 caratteri per riga; citazione Storia con bordo sinistro colorato; alt generici.

## Domande
- E se la prima cosa in home fosse "Messe di questo fine settimana"?
- Quante voci di menu servono davvero a un parrocchiano?
- Cosa direbbe di Coriano una sola foto in apertura?
