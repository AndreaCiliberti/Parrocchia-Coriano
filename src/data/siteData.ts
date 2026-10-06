import { CommunityGroup, DaySchedule, MassTime, NoticeItem } from '../types';

export const SITE_INFO = {
  title: 'Parrocchia Coriano',
  subtitle: 'Parrocchia S. Maria Assunta di Coriano (RN)',
  motto: 'Una comunità che accoglie, prega e cresce insieme.',
  address: 'Via Libero Pedrelli, 2, 47853 Coriano RN',
  phone: '0541657167',
  email: 'segreteriacoriano@gmail.com',
  secretaryHours: 'Lun – Ven dalle 9.30 alle 12.00',
  donOsvaldo: 'Don Osvaldo',
};

export const PREFESTIVE_MASSES: MassTime[] = [
  { churchName: 'SS. BIAGIO E SIMEONE (MONTESCUDO)', time: '17.00', type: 'prefestiva' },
  { churchName: 'S. GIOVANNI BATTISTA (CERASOLO)', time: '17.30', type: 'prefestiva' },
  { churchName: 'S. ANDREA IN BESANIGO', time: '17.30', type: 'prefestiva' },
  { churchName: 'S. SALVATORE', time: '17.00 (inverno) 18.00 (estate)', type: 'prefestiva' },
  { churchName: 'S. GIOVANNI BATTISTA (CROCE)', time: '18.00 (da 01/01 a 30/06)', type: 'prefestiva' },
  { churchName: 'S. SAVINO', time: '18.00 (da 01/07 a 31/12)', type: 'prefestiva' },
  { churchName: 'SUORE A GAIOFANA', time: '18.00 (solare) 18.30 (legale)', type: 'prefestiva' },
  { churchName: 'S. MARIA MATER ECCLESIAE (1°MAGGIO)', time: '18.30', type: 'prefestiva' },
  { churchName: 'S. MARIA ASSUNTA (CORIANO)', time: '18.30', type: 'prefestiva' },
];

export const FESTIVE_MASSES: MassTime[] = [
  { churchName: 'S. LORENZO IN CORREGIANO', time: '8:00', type: 'festiva' },
  { churchName: 'S. MARIA IN CERRETO', time: '8:00', type: 'festiva' },
  { churchName: 'S. MARIA MATER ECCLESIAE (1°MAGGIO)', time: '8:30', type: 'festiva' },
  { churchName: 'SANTUARIO VALLIANO', time: '9:00', type: 'festiva' },
  { churchName: 'S. APOLLINARE (S. MARIA DEL PIANO)', time: '9:00', type: 'festiva' },
  { churchName: 'S. MARIA (CASALECCHIO)', time: '9:00', type: 'festiva' },
  { churchName: 'S. GIOVANNI EVANGELISTA (PASSANO)', time: '9:00', type: 'festiva' },
  { churchName: 'MULAZZANO', time: '9:30', type: 'festiva' },
  { churchName: 'SUORE GAIOFANA', time: '9:30', type: 'festiva' },
  { churchName: 'SS. PIETRO E PAOLO (TRARIVI)', time: '9:30', type: 'festiva' },
  { churchName: 'S. SALVATORE', time: '10:00', type: 'festiva' },
  { churchName: 'S. INNOCENZA V. E M. (MONTETAURO)', time: '10:00', type: 'festiva' },
  { churchName: 'S. PATRIGNANO', time: '10:00', type: 'festiva' },
  { churchName: 'S. MARTINO MONTE L’ABATE', time: '10:00', type: 'festiva' },
  { churchName: 'S. LORENZO IN CORREGIANO', time: '11:00', type: 'festiva' },
  { churchName: 'SS. BIAGIO E SIMEONE (MONTESCUDO)', time: '11:00', type: 'festiva' },
  { churchName: 'S. SAVINO', time: '11:00 (da 01/01 a 30/06)', type: 'festiva' },
  { churchName: 'S. GIOVANNI BATTISTA (CROCE)', time: '11:00 (da 01/07 a 31/12)', type: 'festiva' },
  { churchName: 'S. GIOVANNI BATTISTA (CERASOLO)', time: '11:15', type: 'festiva' },
  { churchName: 'S. M. ASSUNTA (CORIANO)', time: '11:15', type: 'festiva' },
  { churchName: 'S. ANDREA IN BESANIGO', time: '11:15', type: 'festiva' },
  { churchName: 'S. MARIA IN CERRETO', time: '11:15', type: 'festiva' },
  { churchName: 'S. MARIA MATER ECCLESIAE (1°MAGGIO)', time: '11:15', type: 'festiva' },
  { churchName: 'OSPEDALETTO', time: '11:15', type: 'festiva' },
];

export const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    dayName: 'Lunedì',
    slots: [
      { time: 'Ore 7.30 – 9.30', activity: 'Lodi e adorazione Eucaristica presso la Chiesa parrocchiale' },
      { time: 'Ore 9.30 – 12.00', activity: 'Servizio Segreteria in Sede parrocchiale' },
      { time: 'Ore 9.30 – 12.00', activity: 'Confessioni in Chiesa parrocchiale' },
      { time: 'Ore 18.30', activity: 'Messa in Chiesa Parrocchiale' },
    ],
  },
  {
    dayName: 'Martedì',
    slots: [
      { time: 'Ore 7.30 – 9.30', activity: 'Lodi e adorazione Eucaristica presso la Chiesa parrocchiale' },
      { time: 'Ore 9.30 – 12.00', activity: 'Servizio Segreteria in Sede parrocchiale' },
      { time: 'Ore 15.30 – 17.00', activity: 'Aiuto compiti bambini scuole elementari e medie presso la Sede Parrocchiale' },
      { time: 'Ore 18.30', activity: 'Messa in Chiesa Parrocchiale' },
    ],
  },
  {
    dayName: 'Mercoledì',
    slots: [
      { time: 'Ore 7.30 – 9.30', activity: 'Lodi e adorazione Eucaristica presso la Chiesa parrocchiale' },
      { time: 'Ore 9.30 – 12.00', activity: 'Servizio Segreteria in Sede parrocchiale' },
      { time: 'Ore 18.30', activity: 'Messa in Chiesa Parrocchiale' },
    ],
  },
  {
    dayName: 'Giovedì',
    slots: [
      { time: 'Ore 9.30 – 12.00', activity: 'Servizio Segreteria in Sede parrocchiale' },
      { time: 'Ore 15.30 – 17.00', activity: 'Aiuto compiti bambini scuole elementari e medie presso la Sede Parrocchiale' },
      { time: 'Ore 20.30', activity: 'Messa in Chiesa parrocchiale e momento guidato di adorazione eucaristica' },
    ],
  },
  {
    dayName: 'Venerdì',
    slots: [
      { time: 'Ore 7.30 – 9.30', activity: 'Lodi e adorazione Eucaristica presso la Chiesa parrocchiale' },
      { time: 'Ore 9.30 – 12.00', activity: 'Servizio Segreteria in Sede parrocchiale' },
      { time: 'Ore 18.30', activity: 'Messa in Chiesa Parrocchiale' },
      { time: 'Ore 21.30', activity: 'Gruppo giovani (Biennio superiori) presso Sede parrocchiale' },
      { time: 'Ore 21.30', activity: 'Gruppo giovani (Triennio superiori) presso la Sede parrocchiale' },
    ],
  },
  {
    dayName: 'Sabato',
    slots: [
      { time: 'Mattino', activity: 'Lavori di pubblica utilità presso la Sede parrocchiale' },
      { time: 'Pomeriggio', activity: 'Oratorio – presso la Sede Parrocchiale' },
      { time: 'Pomeriggio', activity: 'Prove coro per la messa del sabato in Sede parrocchiale' },
    ],
  },
];

export const COMMUNITY_GROUPS: CommunityGroup[] = [
  {
    id: 'catechismo',
    name: 'Catechismo bambini',
    image: '/images/gruppo_catechismo_NET.jpg',
    description:
      'Il percorso di catechismo accompagna bambini e ragazzi nella scoperta della fede cristiana, preparando ai sacramenti della Comunione e della Cresima. Attraverso incontri settimanali, momenti di preghiera e attività formative, i giovani imparano a conoscere Gesù e a vivere la comunità con gioia.',
  },
  {
    id: 'oratorio',
    name: 'Oratorio',
    image: '/images/oratorio-1024x682.jpg',
    description:
      'L’oratorio è un luogo di incontro, gioco e amicizia, aperto a bambini e ragazzi che vogliono trascorrere il loro tempo libero in un ambiente sano e coinvolgente. Proponiamo attività ricreative, laboratori, sport e momenti di formazione per stare insieme in modo costruttivo.',
  },
  {
    id: 'compiti',
    name: 'Aiuto compiti',
    image: '/images/compiti-1024x682.jpg',
    description:
      'Uno spazio dedicato ai bambini e ragazzi di scuole elementari e medie che hanno bisogno di un sostegno nello studio. Volontari qualificati li affiancano nei compiti e nel recupero scolastico, in un ambiente sereno e accogliente. Un’occasione per imparare insieme e crescere in autonomia.',
  },
  {
    id: 'caritas',
    name: 'Caritas',
    image: '/images/corridoi.jpg',
    description:
      'La Caritas parrocchiale è al servizio delle persone in difficoltà, offrendo aiuto concreto attraverso la distribuzione di beni di prima necessità, l’ascolto e il supporto a chi vive situazioni di fragilità. Ogni gesto di solidarietà può fare la differenza.',
    contactExtra: {
      phone: '3895268365',
      mail: 'corianocaritas@gmail.com',
    },
  },
  {
    id: 'nonni',
    name: 'Gruppo Nonni',
    image: '/images/nonni-nipoti-UE.jpg',
    description:
      'Uno spazio dedicato ai nonni della comunità, per condividere esperienze, trascorrere del tempo insieme e sentirsi parte attiva della parrocchia. Attraverso incontri, attività e momenti di socialità, valorizziamo la ricchezza dell’esperienza di vita.',
  },
  {
    id: 'giovani',
    name: 'Gruppo Giovani',
    image: '/images/giovani-1024x682.jpg',
    description:
      'Un cammino di crescita e confronto per i ragazzi più grandi, con incontri, attività e momenti di riflessione su temi di fede e vita. Un’occasione per costruire legami autentici e vivere insieme esperienze significative.',
  },
  {
    id: 'matrimoniale',
    name: 'Corso pre-matrimoniale',
    image: '/images/depositphotos_150978128-stock-photo-happy-couple-in-sunset.webp',
    description:
      'Un percorso dedicato alle coppie che si preparano al matrimonio cristiano. Attraverso incontri con sacerdoti ed esperti, vengono approfonditi il significato del sacramento, la vita di coppia e i valori fondamentali della famiglia.',
  },
  {
    id: 'cl',
    name: 'Scuola di comunità CL',
    image: '/images/Pietro-Giovanni.jpg',
    description:
      'Un momento di incontro e approfondimento della fede secondo il carisma di Comunione e Liberazione. Attraverso la lettura di testi e il confronto di esperienze, ci si aiuta a vivere con consapevolezza il cammino cristiano nella quotidianità.',
  },
  {
    id: 'parole',
    name: 'Dieci Parole',
    image: '/images/rosario-libro-1024x682.jpg',
    description:
      'Un percorso di catechesi per giovani e adulti, ispirato ai Dieci Comandamenti, per riscoprire il senso profondo della fede cristiana e il significato della vita. Gli incontri aiutano a leggere la propria esperienza alla luce della Parola di Dio.',
  },
  {
    id: 'cercatori',
    name: 'Cercatori di significato',
    image: '/images/pexels-minan1398-853168.jpg',
    description:
      'Un gruppo aperto a chiunque voglia porsi domande profonde sulla vita, la fede e il senso dell’esistenza. Attraverso il dialogo e la condivisione, cerchiamo insieme risposte e nuovi spunti di riflessione.',
  },
  {
    id: 'pulizie',
    name: 'Gruppo pulizie Chiesa e Parrocchia',
    image: '/images/pulizie-1024x768.jpg',
    description:
      'Un’opportunità per chi deve svolgere lavori di pulizia e pubblica utilità, mettendosi a servizio della comunità parrocchiale in diverse attività pratiche. Un’esperienza che permette di riscoprire il valore del contributo personale al bene comune.',
  },
];

export const CAMPO_LAVORO_PHOTOS = [
  '/images/compo-lavoro-2026-7-768x1024.jpeg',
  '/images/campo-lavoro-2026-15-1024x1024.jpeg',
  '/images/campo-lavoro-2026-13-1024x1024.jpeg',
  '/images/campo-lavoro-2026-12-1024x1024.jpeg',
  '/images/campo-lavoro-2026-11-1024x1024.jpeg',
  '/images/campo-lavoro-2026-10-1024x768.jpeg',
  '/images/campo-lavoro-2026-8-768x1024.jpeg',
  '/images/campo-lavoro-2026-6-768x1024.jpeg',
  '/images/campo-lavoro-2026-5-641x1024.jpeg',
  '/images/campo-lavoro-2026-4-1024x1024.jpeg',
  '/images/campo-lavoro-2026-3-1024x768.jpeg',
  '/images/campo-lavoro-2026-2.jpeg',
  '/images/campo-lavoro-2026-1-1024x683.jpeg',
];
