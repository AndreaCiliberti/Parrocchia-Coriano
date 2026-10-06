import { StoriaChapter, StoriaContent, StoriaMilestone } from '../types';

// Testi tratti dal pannello "Storia della Chiesa di Coriano" (2026).

export const IMG = '/images/storia';

export const STORIA_HERO_IMAGE = {
  src: `${IMG}/panorama-coriano-1913.jpg`,
  caption: "Panorama di Coriano come appariva all'inizio del '900 (cartolina spedita il 02/09/1913)",
};

export const STORIA_MILESTONES: StoriaMilestone[] = [
  { year: '1059', text: 'Prima menzione della cappella di Santa Maria "in Corliano"' },
  { year: '1577', text: 'Visita pastorale del vescovo Castelli: la chiesa ha quattro altari' },
  { year: '1639', text: 'Consacrazione della chiesa seicentesca' },
  { year: '1941', text: 'La chiesa diventa "Santuario del Santissimo Crocifisso"' },
  { year: '1944', text: 'La Linea Gotica rade al suolo la chiesa e il centro storico' },
  { year: '1953', text: 'Inaugurazione solenne della nuova chiesa (13 settembre)' },
  { year: '2006-07', text: 'Consolidamento, restauro e rinnovamento degli interni' },
];

export const STORIA_CHAPTERS: StoriaChapter[] = [
  {
    id: 'santa-maria-assunta',
    number: 'I',
    title: 'La chiesa di Santa Maria Assunta',
    sections: [
      {
        id: 'antica-cappella',
        title: "L'antica cappella di Santa Maria",
        blocks: [
          {
            type: 'p',
            text: "La più antica testimonianza dell'esistenza di una comunità cristiana a Coriano risale al 1059, anno in cui l'allora vescovo di Rimini, Uberto, concesse un elenco di possedimenti al conte Everardo e alla moglie Marozia: tra i beni figurava anche la cappella di Santa Maria \"in Corliano\". Della struttura originaria, con ogni probabilità il primo edificio di culto corianese, non rimangono tracce, né se ne conosce l'esatta collocazione.",
          },
          {
            type: 'p',
            text: "Nell'organizzazione ecclesiastica della Romagna medievale, questa sussidiaria (definita \"cappella\") dipendeva dalla pieve di San Savino, vero e proprio fulcro religioso del circondario e unica sede dotata di fonte battesimale. Poiché l'edificio esisteva certamente già prima della menzione del 1059, la devozione mariana a Coriano affonda le radici in una tradizione documentata di oltre mille anni.",
          },
        ],
      },
      {
        id: 'xiii-xvi-secolo',
        title: 'Il complesso tra il XIII e il XVI secolo',
        blocks: [
          {
            type: 'p',
            text: "In mancanza di fonti continuative, è difficile stabilire con esattezza quanti edifici si siano succeduti nel tempo. Si può tuttavia ipotizzare che la comunità abbia avuto tre chiese principali: quella altomedievale, la struttura seicentesca e l'attuale tempio consacrato nel 1953.",
          },
          {
            type: 'p',
            text: "I documenti rinascimentali permettono di ricostruire l'aspetto del complesso alla fine del Quattrocento, quando la chiesa presentava ancora un portico esterno ed era affiancata da un cimitero. All'interno si trovavano un altare intitolato a San Valentino, una cappella dedicata a San Vincenzo, un dipinto di San Cristoforo e un secondo altare vicino al fonte battesimale; la crescente importanza dell'edificio spinse i notai dell'epoca a definirlo \"pieve\", sebbene giuridicamente dipendesse ancora da San Savino.",
          },
          {
            type: 'p',
            text: "Nel corso del Cinquecento la parrocchia consolidò il proprio prestigio: la chiesa divenne meta di frequenti pellegrinaggi di fedeli attratti dalla venerazione di un Crocifisso ritenuto miracoloso. Gli atti della visita pastorale compiuta dal vescovo Castelli nel 1577 descrivono un interno arricchito da quattro altari: oltre al maggiore, ve n'erano tre dedicati rispettivamente a Santa Mustiola, a San Giovanni Battista e alla Vergine. In questo periodo, conclusasi la dominazione malatestiana, Coriano divenne feudo dei conti Sassatelli di Imola, i quali scelsero proprio la chiesa cittadina come luogo per le proprie sepolture gentilizie.",
          },
        ],
      },
      {
        id: 'ricostruzione-seicentesca',
        title: 'La ricostruzione seicentesca',
        blocks: [
          {
            type: 'p',
            text: "Verso la fine del secolo si impose l'esigenza di rinnovare radicalmente il complesso sacro, ormai inadeguato allo sviluppo della Coriano moderna. Nel 1589 il consiglio cittadino promosse una raccolta di elemosine per l'ampliamento della struttura e nel 1595 la fabbrica era in piena attività: i registri consiliari dell'epoca descrivono l'edificio come \"fabbricato nuovamente\", sebbene ancora privo di copertura. Il cantiere si concluse entro il primo decennio del Seicento; nel 1612, infatti, il Commissario Generale della Provincia di Romagna definiva la chiesa di Santa Maria Assunta una «costruzione moderna, ricostruita da pochi anni al posto della prima chiesa antica». Una pergamena conservata nell'archivio parrocchiale permette di datare solennemente la consacrazione al 1639, per mano del vescovo di Rimini, monsignor Angelo Cesi.",
          },
          {
            type: 'p',
            text: "Sotto il profilo dell'organizzazione diocesana, il Settecento segnò una svolta fondamentale: in seguito alle riforme del vescovo Ferretti, Coriano si affrancò definitivamente dalla giurisdizione di San Savino. A riconoscimento dell'accresciuto peso economico e demografico, la chiesa fu elevata a sede di un Vicariato che ottenne l'amministrazione di una vasta porzione di territorio, divisa con Montescudo.",
          },
          {
            type: 'p',
            text: "La struttura seicentesca rimase pressoché inalterata fino al 1944. A differenza degli edifici precedenti, di questo tempio rimangono ricche testimonianze iconografiche, documentarie e materiali. Una descrizione particolarmente dettagliata si deve alla relazione redatta nel settembre 1912 dal parroco don Guglielmo Mondaini, in occasione della visita pastorale del vescovo Vincenzo Scozzoli:",
          },
          {
            type: 'quote',
            text: "Non presenta alcuno stile architettonico, ma è semplicemente un vasto salone di forma rettangolare, della lunghezza di metri 26, della larghezza di metri 10 e dell'altezza di metri 11, con soffitto piano formato a cassettoni di legno chiusi con tela. Questa chiesa ha sette altari: l'altare maggiore dedicato a Maria Santissima Assunta in cielo; sul lato sinistro per chi guarda verso l'altare si trova l'altare della Beata Vergine del Rosario, con tribuna in legno e doratura di recente data entro una nicchia aperta nel muro e la statua lignea della Beata Vergine del Rosario, opera di modesta fattura; dallo stesso lato vi è l'altare in cui si venera l'immagine di Gesù Crocifisso, che gode d'una grande devozione...",
            author: 'don Guglielmo Mondaini, 1912',
          },
          {
            type: 'p',
            text: "Gli altri altari erano intitolati alla Beata Vergine del Buon Consiglio, a Sant'Antonio Abate, a San Luigi Gonzaga e a Santa Eurosia. Il complesso era completato da un battistero, la cui memoria storica testimoniava l'antico titolo di chiesa plebale, e da un campanile dotato di due campane, una di epoca remota e l'altra fusa per volere di don Girolamo Mazza, predecessore di don Mondaini.",
          },
          {
            type: 'p',
            text: "Nel settembre del 1944, i violenti scontri della Linea Gotica tra le forze alleate e l'esercito tedesco travolsero l'abitato di Coriano, radendo al suolo la chiesa e gran parte del centro storico con un livello di devastazione che alcuni storici locali giudicano paragonabile a quello subito dalla vicina Rimini. Don Michele Bertozzi, figura centrale della comunità nel secondo Novecento, giunto in paese come cappellano nel 1943, rievocò drammaticamente quei giorni:",
          },
          {
            type: 'quote',
            text: 'Sembra ancora di vedere i muri sgretolarsi sotto lo schianto inesorabile delle granate e delle bombe. Ricorderò sempre il pianto e lo schianto di don Mondaini nel vedere la cima del bel poggio di Coriano ricoperta di macerie e di ruderi.',
            author: 'don Michele Bertozzi',
          },
        ],
        images: [
          { src: `${IMG}/chiesa-seicentesca-1941.jpg`, caption: "La chiesa seicentesca in una cartolina spedita l'08/06/1941" },
          { src: `${IMG}/interno-chiesa-seicentesca.jpg`, caption: "L'interno della chiesa seicentesca (metà anni '30)" },
        ],
      },
      {
        id: 'tempio-contemporaneo',
        title: 'Il tempio contemporaneo',
        blocks: [
          {
            type: 'p',
            text: "Dopo lo sgombero delle macerie e il getto delle prime fondamenta, solo la ferma determinazione di don Michele Bertozzi permise l'effettivo avvio del cantiere nel 1951, in un paese faticosamente impegnato nella ricostruzione post-bellica. La posa della prima pietra fu celebrata il 14 maggio 1951, mentre l'inaugurazione solenne del nuovo tempio avvenne il 13 settembre 1953.",
          },
          {
            type: 'p',
            text: "All'epoca vennero valutati due diversi progetti: il primo, risalente agli anni Trenta, era legato a un precedente e infruttuoso tentativo di ammodernamento della vecchia struttura; il secondo, non datato ma ascrivibile all'immediato dopoguerra, disegnava un edificio monumentale nelle proporzioni e ricco di apparati decorativi e finiture di pregio. Le ristrettezze economiche del periodo e i criteri di stanziamento dei danni di guerra da parte del Genio Civile spinsero tuttavia verso una drastica semplificazione: eliminati gli ornamenti non essenziali, si optò per la struttura attuale, sobria ed essenziale sia negli esterni sia negli interni, seppur fedele nell'impianto volumetrico alle fondazioni originarie.",
          },
          {
            type: 'p',
            text: "A testimonianza dello sforzo profuso da don Michele per raccogliere i fondi necessari, è tuttora conservata una parte delle lettere inviate nel 1945 ai Comitati di Liberazione Nazionale e alle amministrazioni comunali di tutta Italia.",
          },
          {
            type: 'p',
            text: "Subito dopo il completamento della chiesa si procedette all'erezione della torre campanaria. Il complesso architettonico definitivo misura 45 metri di lunghezza e 24 di larghezza all'altezza del transetto, svettando fino a 28 metri alla sommità della cupola e a 40 metri all'apice del campanile.",
          },
          {
            type: 'p',
            text: "Nell'estate del 2003, l'eccezionale siccità provocò vistose lesioni nelle murature, segnale di un pericoloso cedimento strutturale delle fondamenta. Tra il 2006 e il 2007 l'edificio fu oggetto di un radicale intervento di consolidamento e restauro, che portò anche a un profondo rinnovamento degli interni: vennero rimossi gli altari minori, chiuse le cappelle laterali di destra e ridisegnato interamente il presbiterio con nuovi arredi sacri (altare, ambone, tabernacolo e sostegno del Crocifisso). L'aula si presenta oggi come uno spazio austero ma imponente, caratterizzato da una diffusa luminosità e da una certa coerenza stilistica.",
          },
        ],
        images: [
          { src: `${IMG}/macerie-e-ricostruzione.jpg`, caption: 'Dalle macerie alla ricostruzione della chiesa' },
          { src: `${IMG}/don-michele-cantiere.jpg`, caption: 'Don Michele Bertozzi visita il cantiere della nuova chiesa' },
          { src: `${IMG}/secondo-progetto.jpg`, caption: 'Il secondo progetto' },
          { src: `${IMG}/voce-del-parroco-1953.jpg`, caption: 'Prima pagina del giornalino parrocchiale "La voce del parroco" che annuncia l\'inaugurazione della nuova chiesa (13/09/1953)' },
        ],
      },
      {
        id: 'patrimonio-artistico',
        title: 'Il patrimonio artistico recuperato e i nuovi arredi',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Il Crocifisso',
                text: "Oggi collocato sopra l'altare maggiore, è un'opera di origine complessa e affascinante. La tradizione vuole che il volto sia stato rinvenuto nel XIII secolo sulla spiaggia di Riccione da militi corianesi di guardia alle torri costiere. L'opera faceva presumibilmente parte del bottino di navi corsare che, dopo aver saccheggiato le coste orientali, si erano sbarazzate delle immagini sacre prive di valore commerciale. La raffinata fattura del volto ne testimonia la matrice bizantina; la testa è inoltre arricchita da barba e capelli veri. Il corpo ligneo in ulivo è invece di epoca successiva (XVI secolo), ascrivibile a un intagliatore locale. Considerato da subito miracoloso, il simulacro divenne il fulcro della devozione corianese, tanto che nel 1941 il tempio fu solennemente elevato a \"Santuario del Santissimo Crocifisso\". L'antica cornice lignea che lo ospitava, risalente al secolo scorso, è oggi visibile nella cappella di sinistra.",
              },
              {
                title: 'La statua della Madonna del Rosario',
                text: "Collocata su una stele alla destra del presbiterio, è un pregevole esempio di scultura devozionale risalente al XVIII-XIX secolo. Scolpita in legno di pero massiccio, in determinate ricorrenze liturgiche viene ancora rivestita con i tradizionali abiti ottocenteschi in tessuto laminato.",
              },
              {
                title: 'Le icone neo-bizantine',
                text: "Le icone che ornano il presbiterio e il battistero vennero realizzate da suor Maria Cristina Ghitti (della Piccola Famiglia dell'Annunziata) durante i restauri del 2006-2007. Il ciclo iconografico sviluppa un preciso programma teologico: l'ambone reca l'Annunciazione, mistero dell'Incarnazione; l'altare mostra la cena di Emmaus, fulcro della liturgia eucaristica e della testimonianza cristiana; ai lati del tabernacolo campeggiano le figure del patrono San Sebastiano e della Beata Elisabetta Renzi, fondatrice della congregazione delle Maestre Pie dell'Addolorata, la cui casa madre sorge a breve distanza. Infine, la pala del fonte battesimale compendia l'intera storia della Salvezza attraverso una raffinata catechesi per immagini, completata da formelle musive eseguite dalla comunità dossettiana di Ma'in, in Giordania.",
              },
              {
                title: 'Le tele della controfacciata',
                text: 'La controfacciata ospita due tele del Novecento, repliche della Crocifissione di San Pietro e della Conversione di San Paolo del Caravaggio, eseguite dal pittore corianese Sergio Nicoletti.',
              },
            ],
          },
        ],
        images: [
          { src: `${IMG}/crocifisso-1948.jpg`, caption: 'Il Crocifisso "rifugiato" nella chiesa degli Orfani dopo la distruzione della chiesa parrocchiale (1948)' },
          { src: `${IMG}/madonna-del-rosario.jpg`, caption: "L'immagine della Madonna del Rosario in una vecchia cartolina" },
        ],
      },
    ],
  },
  {
    id: 'altri-luoghi-di-culto',
    number: 'II',
    title: 'Altri luoghi di culto nel capoluogo',
    intro: [
      "Oltre alla chiesa parrocchiale, il territorio corianese ha ospitato nei secoli numerosi edifici sacri. Alcuni sono andati interamente perduti, come la cinquecentesca chiesa civica di San Sebastiano, l'oratorio della Madonna della Pietà, la cappella della Madonna della Rosa in palazzo Salvoni, una serie di piccoli oratori rurali e due complessi di cui si è persa memoria documentaria (la cappella di Santa Maddalena e la chiesa di San Giovanni di Marano). Altre strutture sono invece giunte fino a noi.",
    ],
    sections: [
      {
        id: 'istituto-orfani',
        title: "L'Istituto Agricolo Orfani di Guerra e la sua chiesa",
        blocks: [
          {
            type: 'p',
            text: "Nel settembre del 1919, l'iniziativa del parroco don Guglielmo Mondaini e di alcuni esponenti della comunità locale portò alla fondazione di un orfanotrofio destinato ai figli dei caduti della prima guerra mondiale. Pochi anni dopo, l'istituto si trasferì lungo l'attuale via Garibaldi (allora Corso Umberto I), all'interno della residenza già della famiglia Savini, acquistata insieme al vasto podere agricolo retrostante. Elevata a Ente Morale nel 1923 con il nome di Istituto Agricolo \"Orfani di Guerra\", la struttura si resse sulla generosità e sulle donazioni della popolazione.",
          },
          {
            type: 'p',
            text: "La solidarietà cittadina permise anche l'edificazione della cappella, inaugurata nel 1933 utilizzando in parte elementi di spoglio provenienti dalla demolizione della \"Cella Tonda\" del Foro Boario. Se l'antico edificio assistenziale versa oggi in stato di abbandono, la chiesetta annessa, scampata alle devastazioni del 1944 e utilizzata come parrocchiale provvisoria nell'immediato dopoguerra, è stata interamente restaurata e ospita saltuariamente funzioni liturgiche.",
          },
        ],
        images: [
          { src: `${IMG}/istituto-orfani.jpg`, caption: 'Il Collegio-Scuola di Agricoltura "Orfani di Guerra" in una cartolina d\'epoca' },
          { src: `${IMG}/orfani-istituto-agricolo.jpg`, caption: "Gli orfani ricoverati nell'Istituto Agricolo di Coriano" },
        ],
      },
      {
        id: 'casa-madre',
        title: "La Casa Madre delle Maestre Pie dell'Addolorata",
        blocks: [
          {
            type: 'p',
            text: "Nel 1839 la Beata Elisabetta Renzi fondò in questo luogo la congregazione dedita all'istruzione e all'educazione della gioventù femminile. All'interno dell'attigua chiesetta (1825) si conservano le spoglie della fondatrice, mentre nelle sale del convento è stata collocata una suggestiva esposizione di ricami e manufatti tessili eseguiti nel corso dei decenni dalle giovani allieve dell'istituto.",
          },
        ],
        images: [
          { src: `${IMG}/beata-elisabetta-renzi.jpg`, caption: 'La Beata Elisabetta Renzi' },
          { src: `${IMG}/casa-madre-maestre-pie.jpg`, caption: "La cappella dell'istituto delle Maestre Pie" },
        ],
      },
      {
        id: 'ca-righetti',
        title: 'La cappella rurale di "Ca\' Righetti"',
        blocks: [
          {
            type: 'p',
            text: "Rappresenta l'unica testimonianza superstite degli antichi oratori privati legati alle dimore delle famiglie possidenti. Risalente presumibilmente all'Ottocento, e forse eretta sui resti di un edificio precedente, la cappella è inserita nel complesso di una corte colonica restaurata; conserva elementi d'arredo d'epoca e un affresco contemporaneo eseguito sopra le tracce di un dipinto murale preesistente.",
          },
        ],
      },
    ],
  },
  {
    id: 'chiese-scomparse',
    number: 'III',
    title: 'Le chiese scomparse del centro storico',
    sections: [
      {
        id: 'san-sebastiano',
        title: 'La chiesa di San Sebastiano',
        blocks: [
          {
            type: 'p',
            text: "Sorgeva lungo la via che collega la piazza cittadina al castello, probabilmente a ridosso di un antico ospedale per pellegrini. Stando alle ricerche di don Michele Bertozzi, l'edificio risaliva al 1348, eretto come ex-voto della cittadinanza per la fine della terribile epidemia di peste nera. L'oratorio, di proprietà municipale, era dedicato al santo patrono e incarnava l'identità civile della comunità corianese: per tale ragione, fino ai primi del Novecento, le spese di manutenzione e il salario del sacerdote officiante erano interamente a carico del Comune. Divenuto successivamente sussidiaria della parrocchia, l'edificio subì danni gravissimi nel 1944; nel dopoguerra se ne decise la definitiva demolizione.",
          },
        ],
        images: [
          { src: `${IMG}/veduta-piazza.jpg`, caption: "Veduta dalla piazza del Comune (oggi piazza Mazzini, nell'attuale via Malatesta): lungo il corso si intravedono la facciata della cappella delle Maestre Pie e, sullo sfondo, la chiesa di San Sebastiano" },
        ],
      },
      {
        id: 'cella-tonda',
        title: 'L\'oratorio della Madonna della Pietà (detto "Cella Tonda")',
        blocks: [
          {
            type: 'p',
            text: "Anticamente situato lungo la via maestra nel cuore del centro storico (in località Cà li Zangari, poi Cà l'Agnolo), questo piccolo oratorio custodiva un'immagine quattrocentesca della Vergine col Bambino. Agli inizi del Seicento, in seguito a un'apparizione mariana alla giovane corianese Orsolina, il luogo divenne centro di una fitta serie di guarigioni devozionali. Nel 1609, mentre il tribunale ecclesiastico riminese ne riconosceva ufficialmente il carattere miracoloso, iniziarono i lavori per l'edificazione di un nuovo tempio ottagonale, terminato nel 1619, all'interno del quale l'affresco venne integrato nell'altare.",
          },
          {
            type: 'p',
            text: "Un prezioso inventario del 1624 rivela la ricchezza del santuario, che custodiva oltre duecento ex-voto in cera e tavolette, oltre a cinquantaquattro argenti preziosi. Danneggiata da un fulmine nel 1882 e restaurata nel 1887, la \"Cella Tonda\" venne purtroppo abbattuta nel 1931 per consentire l'edificazione del palazzo della Cassa di Risparmio. Le antiche fotografie rimangono l'unica testimonianza visiva del monumento, i cui mattoni vennero in parte reimpiegati nella vicina chiesa degli Orfani.",
          },
        ],
        images: [
          { src: `${IMG}/cella-tonda.jpg`, caption: 'L\'oratorio detto "Cella Tonda" come appariva a inizio Novecento (collezione Alessandro Catrani)' },
        ],
      },
    ],
  },
  {
    id: 'chiese-frazioni',
    number: 'IV',
    title: 'Le chiese delle frazioni corianesi',
    sections: [
      {
        id: 'cerasolo',
        title: 'La chiesa di San Giovanni Battista (Cerasolo)',
        blocks: [
          {
            type: 'p',
            text: "L'edificio sorge nella frazione di Cerasolo. Sebbene alcune fonti dell'XI secolo menzionassero una misteriosa pieve di San Giovanni in cella Jovis, la sua precisa identificazione geografica è rimasta incerta fino al ritrovamento, da parte dello storico Currado Curradi presso l'Archivio di San Marino, di due pergamene del 1231. Questi documenti confermano il titolo di San Giovanni Battista e testimoniano l'evoluzione del toponimo locale da Cella Jovis a Cerazoli, fino all'attuale Cerasolo. Tale continuità storica suggerisce che l'origine dell'insediamento religioso possa risalire addirittura all'VIII-IX secolo, l'epoca di massima diffusione delle pievi rurali nel riminese.",
          },
          {
            type: 'p',
            text: "La facciata si distingue per un disegno geometrico rigoroso: il portale d'ingresso e la soprastante finestra lunettata sono inquadrati da un sistema di quattro lesene che sorreggono un timpano classico con copertura a due falde, il tutto valorizzato da un'elegante bicromia nei toni del giallo e dell'arancio. Il campanile mostra una struttura in mattoni faccia a vista. All'interno, l'aula unica con cappelle laterali sfocia in un presbiterio rialzato, caratterizzato da una cantoria che ospita un pregevole organo del 1797 realizzato da Francesco Vasconi. Tra le opere d'arte si segnalano il fonte battesimale in pietra datato 1572, una raffinata Madonna col Bambino, diverse tele di scuola romagnola e i paliotti storici degli altari.",
          },
        ],
        images: [{ src: `${IMG}/chiesa-cerasolo.jpg`, caption: 'La chiesa di Cerasolo' }],
      },
      {
        id: 'monte-tauro',
        title: 'La chiesa di Santa Innocenza (Monte Tauro)',
        blocks: [
          {
            type: 'p',
            text: "Situato nella frazione di Monte Tauro, l'edificio vanta una continuità documentaria ininterrotta dall'anno Mille ai giorni nostri, configurandosi come uno dei siti storici più antichi dell'intero territorio. Le radici del culto sono legate alla figura di santa Innocenza; sebbene i dettagli biografici sfumino nella leggenda medievale, la tradizione riferisce che la giovane, appartenente a una nobile famiglia riminese proprietaria di latifondi nella valle del Marano, subì il martirio sotto Diocleziano durante il soggiorno dell'imperatore a Rimini (303-305 d.C.). La devozione rurale portò rapidamente alla nascita di un santuario votivo sul colle, mentre la tradizione storiografica locale vuole che la pieve di Monte Tauro fosse sorta direttamente sulle terre del contado di proprietà della martire, definita ancora in un atto del 1766 come \"signora e patrona\" di quei luoghi.",
          },
          {
            type: 'p',
            text: 'Il legame inscindibile tra il territorio e la santa è custodito da quattro storici capisaldi:',
          },
          {
            type: 'list',
            items: [
              { title: 'Il Complesso Parrocchiale', text: "Ospita l'arca con le reliquie, antichi vasi sacri, la tela d'altare raffigurante il martirio e i pregevoli bronzi novecenteschi dello scultore Enrico Manfrini." },
              { title: 'Il cosiddetto Castello di Santa Innocenza', text: 'Antica struttura fortificata che la memoria storica locale identifica come la residenza della famiglia.' },
              { title: 'La Fonte di Santa Innocenza', text: 'Situata nei pressi di via Fiume, storicamente la sorgente idrica più generosa della zona, celebre per non essersi mai prosciugata nemmeno durante le peggiori siccità.' },
              { title: 'I Fondi Rustici', text: 'I registri fondiari parrocchiali indicano da secoli questi appezzamenti come "le terre di santa Innocenza".' },
            ],
          },
          {
            type: 'p',
            text: "L'esterno dell'attuale parrocchiale si presenta in mattoni faccia a vista, con un prospetto lineare aperto da un portale ligneo sormontato da un piccolo oculo. L'interno ad aula unica presenta due cappelle laterali e culmina in un transetto scenograficamente rialzato.",
          },
        ],
        images: [{ src: `${IMG}/chiesa-monte-tauro.jpg`, caption: 'La chiesa di Monte Tauro' }],
      },
      {
        id: 'cavallino',
        title: "L'oratorio della Beata Vergine della Consolazione (Cavallino)",
        blocks: [
          {
            type: 'p',
            text: "Eretto tra il XVI e il XVII secolo su una collinetta nella frazione di Cavallino, questo piccolo oratorio conservò a lungo una propria indipendenza liturgica ed economica. Tra il Settecento e il primo Novecento la struttura mantenne infatti un proprio rettore residente, formalmente legato alla pieve di Monte Tauro ma autonomo nella cura d'anime locale. Fino alla metà del secolo scorso l'edificio custodiva intatto un ricco patrimonio di affreschi votivi, arredi serici e vasi sacri, sfortunatamente andato perduto a causa di una serie di furti avvenuti nel secondo dopoguerra, coincisi con il temporaneo abbandono della chiesa.",
          },
          {
            type: 'p',
            text: "Esternamente, la facciata è preceduta da un elegante protiro sorretto da sei colonne bianche; sull'architrave d'ingresso si legge l'iscrizione \"Matri Consolationis Dicata\". La struttura è conclusa da un campanile a vela edificato tra il 1884 e il 1885. L'interno, a navata unica, vanta un disegno armonico: il presbiterio, delimitato da un arco trionfale a tutto sesto, mostra una copertura a capriate lignee e pianelle in cotto. Sull'altare campeggia una monumentale ancona lignea laccata in bianco, impreziosita da colonne corinzie, cariatidi e dal fastigio con Dio Padre benedicente. Il centro della composizione accoglie una tela della Vergine col Bambino, mentre la parete sinistra ospita un dipinto raffigurante Sant'Antonio Abate.",
          },
        ],
        images: [{ src: `${IMG}/oratorio-cavallino.jpg`, caption: "L'oratorio di Cavallino" }],
      },
      {
        id: 'passano',
        title: 'La chiesa della Beata Vergine della Consolazione (Passano)',
        blocks: [
          {
            type: 'p',
            text: "Situata nella frazione di Passano, l'attuale struttura architettonica è frutto di un rifacimento avvenuto tra la metà del Settecento e la metà dell'Ottocento. L'edificio, sussidiario della parrocchia centrale, è fulcro di una sentita devozione rurale legata a una venerata immagine mariana, tradizionalmente condotta in processione nelle ricorrenze annuali.",
          },
        ],
      },
      {
        id: 'besanigo',
        title: "L'oratorio di Maria Madre del Popolo Cristiano (Sant'Andrea in Besanigo)",
        blocks: [
          {
            type: 'p',
            text: "Posto ai margini dell'abitato di Sant'Andrea in Besanigo, l'oratorio sorge sul sito di un'antichissima edicola devozionale. Come attesta un'epigrafe latina murata nel pavimento, il complesso venne interamente riedificato nel 1785 dal nobile forlimpopolese Matteo Brigliadori, che ne finanziò i lavori a causa del grave deterioramento della struttura precedente. Oggetto di restauri nel 1901 e nel 1967, la celletta rimane un punto di riferimento della tradizione religiosa locale, ospitando momenti di preghiera durante il mese di maggio.",
          },
        ],
      },
    ],
  },
  {
    id: 'crocifisso',
    number: 'V',
    title: 'Storia del Crocifisso di Coriano',
    intro: [
      "Riportiamo il testo di un documento conservato nell'archivio della parrocchia di Coriano. Contiene la storia del Crocifisso, a metà fra leggenda e vicende più documentate. Il documento non è firmato, ma quasi certamente l'autore è don Michele Bertozzi.",
    ],
    sections: [
      {
        id: 'festa-tradizionale',
        title: 'Una festa antica',
        blocks: [
          {
            type: 'p',
            text: "Un manoscritto dell'Archivio parrocchiale afferma che in una relazione fatta per una visita pastorale del sec. XIV (purtroppo distrutta dai bombardamenti dell'ultima guerra) il Parroco di allora scriveva:",
          },
          {
            type: 'quote',
            text: 'La terza domenica del mese di Settembre si celebra la festa tradizionale del Ss. Crocifisso, con la partecipazione del popolo di tutta la zona, dal mare fino a S. Marino.',
          },
          {
            type: 'p',
            text: "Era già allora \"Festa Tradizionale\", e chissà da quanto tempo la si celebrava! Sembra che risalga al 1200, quando si ha motivo di pensare che sia stata fondata la Parrocchia di Coriano, che prima era cappellania della Chiesa Plebale di S. Savino.",
          },
        ],
      },
      {
        id: 'venuto-dal-mare',
        title: 'Venuto dal mare',
        blocks: [
          {
            type: 'p',
            text: "È sempre stata voce popolare che il Crocifisso di Coriano venga dal mare e sia stato trovato sulla spiaggia. Oggi sembra incredibile, ma nel Medio Evo era cosa normalissima, quasi di ogni giorno, trovare sulla spiaggia oggetti o immagini sacre.",
          },
          {
            type: 'p',
            text: "Pensate ai Mussulmani che occupavano mezza Europa e con le loro navi-pirata avevano il dominio assoluto del Mare Mediterraneo; il Mare Adriatico poi era come il grande porto di tutta la pirateria turca, e gli anfratti delle coste slave erano il rifugio di tutte le scorrerie e le imprese dei predoni del mare. Questi pirati aggredivano le navi, oppure sbarcavano sulle coste italiane e facevano razzia nelle case e nelle chiese, poi caricavano il tutto alla rinfusa sulle loro navi e prendevano il largo dove, lontano dalla costa e da eventuali pericoli, facevano lo spoglio del bottino e se lo dividevano.",
          },
          {
            type: 'p',
            text: "Le immagini sacre, dipinte o scolpite, a loro non interessavano, perché il Corano le proibisce, e perciò, dopo averle spogliate degli oggetti preziosi ed ex-voto, le buttavano a mare, e il mare, pian piano le ributtava a spiaggia, dove qualcuno le trovava e le consegnava alla propria chiesa.",
          },
          {
            type: 'p',
            text: "Sulla spiaggia fino a cent'anni fa sorgevano delle torri in cima alle quali giorno e notte montavano la guardia una o due sentinelle di paesi limitrofi per dare l'allarme, qualora si avvicinasse qualche nave pirata. E anche la comunità di Coriano doveva mandare qualche uomo a tale scopo ogni giorno. E può darsi che sia stato proprio uno di questi a trovare sulla spiaggia il volto del nostro Crocifisso e a portarlo nella nostra chiesa.",
          },
          {
            type: 'p',
            text: "Il volto è scolpito da mano di artista, mentre tutto il corpo può essere stato fatto anche da un artigiano, magari qui del posto, perché non ha valore artistico. Il volto invece è di un bello stile bizantino, e può darsi che i pirati l'abbiano asportato da una chiesa dell'Oriente e le onde del mare abbiano poi provveduto a portarlo fin qua.",
          },
          {
            type: 'p',
            text: "Non c'è da meravigliarsi di queste frequenti scorrerie di Mussulmani lungo i secoli, perché leggiamo nella Storia di Rimini del Tonini che l'ultimo sbarco fatto dai Turchi nel riminese fu a Miramare nel 1873 quando, fra l'altro, rapirono anche una ragazza che non fece più ritorno.",
          },
        ],
        images: [
          { src: `${IMG}/vera-effigie-crocifisso.jpg`, caption: 'Vera effigie del SS. Crocifisso di Coriano' },
        ],
      },
      {
        id: 'devozione',
        title: 'La devozione dei corianesi',
        blocks: [
          {
            type: 'p',
            text: "La popolazione ebbe sempre una grandissima venerazione per l'immagine del Crocifisso di Coriano, e non solo in Parrocchia e nel Vicariato, ma in tutta la zona per vasto raggio all'intorno, e la gente, parafrasando S. Bernardo, diceva che non si era mai sentito dire che uno avesse invocato il Crocifisso e non fosse stato esaudito in tutto o in parte.",
          },
          {
            type: 'p',
            text: "Nel corso dei secoli ogni Venerdì si scopriva il Crocifisso per la S. Messa e si faceva una particolare funzione; ogni Domenica si celebrava la S. Messa delle Dieci all'Altare del Crocifisso, con la chiesa sempre stipata di gente, e non poche volte anche d'inverno, si doveva aprire il portone della chiesa perché potessero seguire la funzione anche quelli che non riuscivano ad entrare. (Quella volta, pur con pochi panni e scarpe rotte, non si aveva paura del freddo).",
          },
          {
            type: 'p',
            text: "Ora il Crocifisso fa il Suo ritorno sull'Altare Maggiore, ma nei tempi passati aveva una Sua Cappella a metà chiesa, con Trono e Altare in legno lavorato e dorato, molto bello, e una balaustra in bronzo, che poi è stata trasformata nell'Altare Liturgico attuale.",
          },
        ],
        images: [
          { src: `${IMG}/altare-del-crocifisso.jpg`, caption: "L'altare in cui si venerava l'immagine del SS. Crocifisso nella chiesa parrocchiale" },
        ],
      },
      {
        id: 'pellegrinaggio-1924',
        title: 'Il pellegrinaggio a Rimini del 1924',
        blocks: [
          {
            type: 'p',
            text: "Nel maggio del 1924 in Duomo a Rimini si celebrava la festa decennale della Madonna dell'Acqua, e ogni giorno dei festeggiamenti i diversi Vicariati della Diocesi scendevano a Rimini per pregare davanti alla Veneratissima Immagine della Madonna che tanta protezione aveva sempre elargito sulla Città e sulla Diocesi.",
          },
          {
            type: 'p',
            text: "Coriano pensò di scendere a Rimini con il suo Crocifisso. Fu allestito un bel carro, trainato da sei buoi, i più belli della zona; sul carro fu collocato il Crocifisso ben addobbato, fu allestito un Altare sul quale a turno diversi Sacerdoti celebravano la S. Messa da Coriano fino a Rimini e ritorno. Fu un pellegrinaggio memorabile a cui partecipò una folla immensa, e tutta la città si riversò in Piazza Tre Martiri (allora Piazza G. Cesare), per vedere il grande spettacolo, e dovunque, e per parecchio tempo non si parlò di altro che del Crocifisso di Coriano, sia in Città, sia in tutta la Diocesi.",
          },
        ],
        images: [
          { src: `${IMG}/processione-1.jpg`, caption: 'Processione con il SS. Crocifisso' },
          { src: `${IMG}/processione-2.jpg`, caption: 'Processione per le vie di Coriano' },
        ],
      },
    ],
  },
];

export const STORIA_IT: StoriaContent = {
  heroImage: STORIA_HERO_IMAGE,
  milestones: STORIA_MILESTONES,
  chapters: STORIA_CHAPTERS,
  ui: {
    eyebrow: 'Parrocchia S. Maria Assunta',
    title: 'Storia',
    intro:
      'Oltre mille anni di fede a Coriano: dalla cappella di Santa Maria "in Corliano" alla chiesa ricostruita dopo la guerra, fino ai luoghi di culto delle frazioni.',
    milestonesTitle: 'Le date principali',
    chaptersNavLabel: 'Capitoli',
    chapterLabel: 'Capitolo',
    outroTitle: 'Vieni a trovarci',
    outroText:
      'La chiesa di Santa Maria Assunta, Santuario del Santissimo Crocifisso, ti aspetta in Via Libero Pedrelli 2 a Coriano.',
    massTimes: 'Orari Messe',
    contacts: 'Contatti',
    zoom: 'Ingrandisci',
    close: 'Chiudi',
    switchLabel: 'EN',
    switchAria: 'Read this page in English',
  },
};
