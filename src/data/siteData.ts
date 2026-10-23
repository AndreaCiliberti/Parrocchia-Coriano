import { ChurchMasses, CommunityGroup, DaySchedule, NoticeItem, PhotoAlbum } from '../types';

export const SITE_INFO = {
  title: 'Parrocchia Coriano',
  subtitle: 'Parrocchia S. Maria Assunta di Coriano (RN)',
  motto: 'Una comunità che accoglie, prega e cresce insieme.',
  address: 'Via Libero Pedrelli, 2, 47853 Coriano RN',
  phone: '0541657167',
  email: 'segreteriacoriano@gmail.com',
  secretaryHours: 'lun – ven dalle 9.30 alle 12.00',
  donOsvaldo: 'Don Osvaldo',
};

// Masses of the parish church, shown first on the home and on the Orari page.
// Weekdays must match the "Messa" slots in WEEKLY_SCHEDULE.
export const CORIANO_MASSES = {
  church: 'S. Maria Assunta',
  saturday: '18.30',
  sunday: '11.15',
  weekdays: '18.30',
  weekdaysNote: 'giovedì 20.30',
};

// Other churches of the pastoral zone, in alphabetical order of `place`.
export const ZONE_CHURCHES: ChurchMasses[] = [
  { place: '1° Maggio', church: 'S. Maria Mater Ecclesiae', saturday: [{ time: '18.30' }], sunday: [{ time: '8.30' }, { time: '11.15' }] },
  { place: 'Casalecchio', church: 'S. Maria', saturday: [], sunday: [{ time: '9.00' }] },
  { place: 'Cerasolo', church: 'S. Giovanni Battista', saturday: [{ time: '17.30' }], sunday: [{ time: '11.15' }] },
  { place: 'Croce', church: 'S. Giovanni Battista', saturday: [{ time: '18.00', note: 'gen – giu' }], sunday: [{ time: '11.00', note: 'lug – dic' }] },
  { place: 'Gaiofana', church: 'Suore', saturday: [{ time: '18.00', note: 'ora solare' }, { time: '18.30', note: 'ora legale' }], sunday: [{ time: '9.30' }] },
  { place: 'Montescudo', church: 'Ss. Biagio e Simeone', saturday: [{ time: '17.00' }], sunday: [{ time: '11.00' }] },
  { place: 'Montetauro', church: 'S. Innocenza V. e M.', saturday: [], sunday: [{ time: '10.00' }] },
  { place: 'Mulazzano', saturday: [], sunday: [{ time: '9.30' }] },
  { place: 'Ospedaletto', saturday: [], sunday: [{ time: '11.15' }] },
  { place: 'Passano', church: 'S. Giovanni Evangelista', saturday: [], sunday: [{ time: '9.00' }] },
  { place: 'S. Andrea in Besanigo', saturday: [{ time: '17.30' }], sunday: [{ time: '11.15' }] },
  { place: 'S. Lorenzo in Correggiano', saturday: [], sunday: [{ time: '8.00' }, { time: '11.00' }] },
  { place: 'S. Maria del Piano', church: 'S. Apollinare', saturday: [], sunday: [{ time: '9.00' }] },
  { place: 'S. Maria in Cerreto', saturday: [], sunday: [{ time: '8.00' }, { time: '11.15' }] },
  { place: "S. Martino Monte l'Abate", saturday: [], sunday: [{ time: '10.00' }] },
  { place: 'S. Patrignano', saturday: [], sunday: [{ time: '10.00' }] },
  { place: 'S. Salvatore', saturday: [{ time: '17.00', note: 'inverno' }, { time: '18.00', note: 'estate' }], sunday: [{ time: '10.00' }] },
  { place: 'S. Savino', saturday: [{ time: '18.00', note: 'lug – dic' }], sunday: [{ time: '11.00', note: 'gen – giu' }] },
  { place: 'Santuario di Valliano', saturday: [], sunday: [{ time: '9.00' }] },
  { place: 'Trarivi', church: 'Ss. Pietro e Paolo', saturday: [], sunday: [{ time: '9.30' }] },
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
      { time: 'Ore 15.30 – 17.00', activity: 'Aiuto compiti bambini scuole elementari e medie presso la Sede Parrocchiale' },
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

// Albums shown on the Foto page, newest first
export const PHOTO_ALBUMS: PhotoAlbum[] = [
  {
    id: 'pellegrinaggio-valliano-2026',
    title: 'Pellegrinaggio a Valliano – Ottobre 2026',
    photos: [1, 2, 3, 4, 5, 6, 7].map((n) => `/images/pellegrinaggio-valliano-2026-${n}.jpg`),
  },
  {
    id: 'campo-lavoro-2026',
    title: 'Campo lavoro 2026',
    text: 'Una bellissima esperienza! Due giorni intensi di lavoro ma anche di gioia. La bellezza di rimboccarsi le maniche per fare qualcosa di buono per i nostri fratelli più svantaggiati! Un grande grazie a tutti quelli che hanno contribuito alla riuscita di questo momento. Solo con il mercatino sono stati incassati in due giorni 2000 euro. È bello vedere che la Chiesa è anche mettersi a servizio (diaconia) degli altri. Il Signore ci benedica!',
    author: 'Don Osvaldo',
    photos: CAMPO_LAVORO_PHOTOS,
  },
];
