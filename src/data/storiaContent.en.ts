import { StoriaContent } from '../types';
import { IMG } from './storiaContent';

// English text from the panel "PANNELLO CHIESA 2026 ENG". It is a condensed
// version of the Italian panel, so its chapters do not match one to one.

export const STORIA_EN: StoriaContent = {
  heroImage: {
    src: `${IMG}/panorama-coriano-1913.jpg`,
    caption: 'View of Coriano in the early 1900s (postcard sent on 02/09/1913)',
  },
  milestones: [
    { year: '1059', text: 'First mention of the chapel of Santa Maria "in Corliano"' },
    { year: '1577', text: 'Pastoral visit of Bishop Castelli: the church has four altars' },
    { year: '1609', text: 'Consecration of the seventeenth-century church' },
    { year: '1941', text: 'The church becomes the Sanctuary of the Holy Crucifix' },
    { year: '1944', text: 'The Gothic Line razes the church and the historic centre' },
    { year: '1953', text: 'Solemn inauguration of the new church (September 13)' },
    { year: '2006-07', text: 'Restoration and consolidation of the church' },
  ],
  chapters: [
    {
      id: 'ancient-chapel',
      number: 'I',
      title: 'The Ancient Chapel of Santa Maria and the Origins',
      sections: [
        {
          id: 'thousand-years',
          title: 'A Thousand Years of Marian Devotion in Coriano',
          blocks: [
            {
              type: 'p',
              text: 'The earliest evidence of a Christian community in Coriano dates back to 1059, when the Bishop of Rimini, Uberto, granted a list of properties to Count Everardo and his wife Marozia: among these assets was the chapel of Santa Maria "in Corliano".',
            },
            {
              type: 'list',
              heading: 'The Mysteries of the Origin',
              items: [
                { text: 'No traces remain of the original structure, nor is its exact location known.' },
                { text: 'It likely did not stand on the hilltop: archaeological excavations led by Don Michele Bertozzi revealed only modest remains of residential foundations.' },
                { text: 'According to some reconstructions, the primitive chapel could have been located along Via Marano or in the area of a later church demolished to make room for the Cassa di Risparmio building on the "stradone".' },
              ],
            },
            {
              type: 'p',
              text: 'In the ecclesiastical organization of medieval Romagna, this subsidiary (defined as a "chapel") depended on the Pieve of San Savino, the true religious hub of the surrounding area and the only site equipped with a baptismal font. Since the building certainly existed before its mention in 1059, Marian devotion in Coriano boasts a documented tradition of over a thousand years.',
            },
          ],
        },
      ],
    },
    {
      id: 'middle-ages-renaissance',
      number: 'II',
      title: 'The Church between the Middle Ages and the Renaissance',
      sections: [
        {
          id: 'thirteenth-sixteenth-century',
          title: 'The Complex from the 13th to the 16th Century',
          blocks: [
            {
              type: 'p',
              text: 'In the absence of continuous sources, it is difficult to establish exactly how many buildings succeeded each other over time. However, it can be assumed that the community had three main churches: the early medieval one, the seventeenth-century structure, and the current temple consecrated in 1953.',
            },
            {
              type: 'list',
              heading: 'The Renaissance Structure (Late 15th Century)',
              items: [
                { text: 'The church still featured an external portico and was flanked by a cemetery.' },
                { text: 'Inside were an altar dedicated to San Valentino, a chapel dedicated to San Vincenzo, a painting depicting San Cristoforo, and a second altar near the baptismal font.' },
                { text: 'The growing importance of the building led contemporary notaries to define it as a "pieve", although legally it still depended on San Savino.' },
              ],
            },
            {
              type: 'p',
              text: 'During the sixteenth century, the parish consolidated its prestige: the church became a destination for frequent pilgrimages of the faithful attracted by the veneration of a Crucifix considered miraculous. The acts of the pastoral visit carried out by Bishop Castelli in 1577 describe an interior enriched by four altars: in addition to the high altar, there were three dedicated respectively to Santa Mustiola, San Giovanni Battista, and the Virgin. During this period, following the end of Malatesta rule, Coriano became a fief of the Counts Sassatelli of Imola, who chose the town church as the site for their noble burials.',
            },
          ],
        },
      ],
    },
    {
      id: 'reconstruction-and-war',
      number: 'III',
      title: 'The Seventeenth-Century Reconstruction and the Tragedy of War',
      sections: [
        {
          id: 'baroque-to-destruction',
          title: 'From Baroque Splendor to the Destruction of 1609-1944',
          blocks: [
            {
              type: 'p',
              text: 'Toward the end of the sixteenth century, the need arose to radically renew the sacred complex, which had become inadequate for the development of modern Coriano. In 1589, the city council promoted a collection of alms, and by 1595 the construction site was fully active. A parchment preserved in the parish archive dates the solemn consecration to 1609, by the hand of the Bishop of Rimini, Monsignor Angelo Cesi.',
            },
            {
              type: 'list',
              heading: 'The Historical Description of 1912 (Don Guglielmo Mondaini)',
              items: [
                { title: 'Dimensions', text: 'A vast rectangular hall 26 meters long, 10 meters wide, and 11 meters high, with a flat wooden coffered ceiling covered with canvas.' },
                { title: 'Altars', text: 'Seven altars in total. The main one dedicated to the Blessed Virgin Assumed into Heaven; the side ones dedicated to the Blessed Virgin of the Rosary, Jesus Crucified, the Blessed Virgin of Good Counsel, Saint Anthony Abbot, Saint Aloysius Gonzaga, and Saint Eurosia.' },
              ],
            },
            {
              type: 'p',
              text: 'In September 1944, the violent clashes of the Gothic Line between Allied forces and the German army swept through the town of Coriano, razing the church and most of the historic center to the ground. Don Michele Bertozzi dramatically recalled those days:',
            },
            {
              type: 'quote',
              text: 'It seems as if we can still see the walls crumbling under the relentless crash of shells and bombs. I will always remember the weeping and heartbreak of Don Mondaini upon seeing the top of the beautiful hill of Coriano covered with rubble and ruins.',
              author: 'Don Michele Bertozzi',
            },
          ],
          images: [
            { src: `${IMG}/chiesa-seicentesca-1941.jpg`, caption: 'The seventeenth-century church on a postcard sent on 08/06/1941' },
            { src: `${IMG}/interno-chiesa-seicentesca.jpg`, caption: 'The interior of the seventeenth-century church (mid-1930s)' },
          ],
        },
      ],
    },
    {
      id: 'contemporary-temple',
      number: 'IV',
      title: 'The Contemporary Temple and the Recovered Heritage',
      sections: [
        {
          id: 'post-war-rebirth',
          title: 'Post-War Rebirth and Art Treasures',
          blocks: [
            {
              type: 'p',
              text: 'After the clearing of the rubble, the firm determination of Don Michele Bertozzi allowed the actual start of construction in 1951. The laying of the first stone was celebrated on May 14, 1951, while the solemn inauguration took place on September 13, 1953. Stripped of non-essential ornaments for economic reasons, the current sober and essential structure was chosen, completely restored and consolidated between 2006 and 2007.',
            },
            {
              type: 'list',
              heading: 'The Housed Artistic Heritage',
              items: [
                { title: 'The Crucifix (Sanctuary since 1941)', text: 'A face of refined Byzantine matrix (13th century), enriched with real beard and hair, traditionally found on the beach of Riccione. The wooden body in olive wood is from a later period (16th century). It incredibly remained standing, unharmed, among the rubble of 1944.' },
                { title: 'The Statue of the Madonna of the Rosary', text: 'A fine work of devotional sculpture in solid pear wood, dating back to the second half of the eighteenth century.' },
                { title: 'Contemporary Icons (2006-2007)', text: 'Created by Sister Maria Cristina Ghitti, they adorn the presbytery representing the Annunciation, the Supper at Emmaus, Saint Sebastian, and Blessed Elisabetta Renzi.' },
              ],
            },
          ],
          images: [
            { src: `${IMG}/macerie-e-ricostruzione.jpg`, caption: 'From the rubble to the reconstruction of the church' },
            { src: `${IMG}/don-michele-cantiere.jpg`, caption: 'Don Michele Bertozzi visiting the construction site of the new church' },
            { src: `${IMG}/secondo-progetto.jpg`, caption: 'The second design for the new church' },
            { src: `${IMG}/voce-del-parroco-1953.jpg`, caption: 'Front page of the parish newsletter "La voce del parroco" announcing the inauguration of the new church (13/09/1953)' },
            { src: `${IMG}/crocifisso-1948.jpg`, caption: 'The Crucifix sheltered in the Orphans\' church after the destruction of the parish church (1948)' },
            { src: `${IMG}/vera-effigie-crocifisso.jpg`, caption: 'True likeness of the Holy Crucifix of Coriano' },
            { src: `${IMG}/altare-del-crocifisso.jpg`, caption: 'The altar of the Holy Crucifix in the old parish church' },
            { src: `${IMG}/madonna-del-rosario.jpg`, caption: 'The Madonna of the Rosary on an old postcard' },
          ],
        },
      ],
    },
    {
      id: 'other-places-of-worship',
      number: 'V',
      title: 'Other Places of Worship and Lost Churches',
      sections: [
        {
          id: 'main-town-memory',
          title: 'The Historical Memory of the Main Town',
          blocks: [
            {
              type: 'p',
              text: 'In addition to the parish temple, the historic center of Coriano has housed and still houses important religious complexes that bear witness to its rich social and welfare evolution.',
            },
            {
              type: 'list',
              heading: 'Preserved Historic Buildings',
              items: [
                { title: 'Agricultural Institute for War Orphans', text: 'Founded in 1919 by Don Guglielmo Mondaini to house the sons of fallen soldiers. The annexed chapel, inaugurated in 1933, escaped the bombings and served as a temporary parish church after the war.' },
                { title: "Convent of the Maestre Pie dell'Addolorata", text: 'Founded in 1839 by Blessed Elisabetta Renzi for female education. It houses the remains of the foundress.' },
                { title: 'Rural Chapel of "Cà Righetti"', text: 'Nineteenth-century, inserted within a restored farmhouse courtyard, it preserves period furnishings.' },
              ],
            },
            {
              type: 'list',
              heading: 'Churches Lost in Bombings or Demolished',
              items: [
                { title: 'Church of San Sebastiano', text: 'Dating back to 1348 as an ex-voto for the Black Death. Owned by the municipality, it was the civic symbol of the town. Demolished after the war due to wartime damage.' },
                { title: 'Oratory of the Madonna della Pietà ("Cella Tonda")', text: 'A Baroque octagonal building (1619) that housed a miraculous fresco and rich ex-votos. Demolished in 1931 to make room for the Cassa di Risparmio building.' },
              ],
            },
          ],
          images: [
            { src: `${IMG}/istituto-orfani.jpg`, caption: 'The Agricultural School "Orfani di Guerra" on a vintage postcard' },
            { src: `${IMG}/orfani-istituto-agricolo.jpg`, caption: 'The orphans housed in the Agricultural Institute of Coriano' },
            { src: `${IMG}/beata-elisabetta-renzi.jpg`, caption: 'Blessed Elisabetta Renzi' },
            { src: `${IMG}/casa-madre-maestre-pie.jpg`, caption: 'The chapel of the Maestre Pie institute' },
            { src: `${IMG}/veduta-piazza.jpg`, caption: 'View from the town square: along the main street, the façade of the Maestre Pie chapel and, in the background, the church of San Sebastiano' },
            { src: `${IMG}/cella-tonda.jpg`, caption: 'The oratory known as "Cella Tonda" in the early 1900s (Alessandro Catrani collection)' },
          ],
        },
      ],
    },
    {
      id: 'frazioni',
      number: 'VI',
      title: 'The Heritage of the Frazioni',
      sections: [
        {
          id: 'local-parishes',
          title: "Cerasolo, Montetauro, Cavallino, Passano, and Sant'Andrea",
          blocks: [
            {
              type: 'p',
              text: 'The historical wealth of Coriano extends throughout its hamlets, each preserving centuries-old religious and architectural traditions.',
            },
            {
              type: 'list',
              heading: 'The Local Parishes',
              items: [
                { title: 'San Giovanni Battista (Cerasolo)', text: 'Identified with the ancient medieval pieve in cella Jovis (documented in 1231). Bicolor Neoclassical facade and interior featuring a 1797 organ by Francesco Vasconi. It preserves a 1572 baptismal font.' },
                { title: 'Santa Innocenza (Montetauro)', text: 'Linked to the martyrdom of the young Innocenza (303-305 AD) under Diocletian. The pieve boasts continuity since the year 1000. It houses the sarcophagus with the relics and bronze works by Enrico Manfrini. Nearby are the ancient castle and the historic perennial spring.' },
                { title: 'Beata Vergine della Consolazione (Cavallino)', text: 'A 16th-17th century oratory preceded by a portico with six white columns. A bell-gable from 1884 and an interior featuring a majestic Baroque wooden altarpiece.' },
                { title: "La Consolazione (Passano) & Maria Madre del Popolo (Sant'Andrea in Besanigo)", text: 'Late eighteenth-century buildings, hubs of rural devotion and traditional Marian prayers held in May.' },
              ],
            },
          ],
          images: [
            { src: `${IMG}/chiesa-cerasolo.jpg`, caption: 'The church of Cerasolo' },
            { src: `${IMG}/chiesa-monte-tauro.jpg`, caption: 'The church of Montetauro' },
            { src: `${IMG}/oratorio-cavallino.jpg`, caption: 'The oratory of Cavallino' },
          ],
        },
      ],
    },
  ],
  ui: {
    eyebrow: 'Parish of S. Maria Assunta',
    title: 'History',
    intro:
      'Over a thousand years of faith in Coriano: from the chapel of Santa Maria "in Corliano" to the church rebuilt after the war and the places of worship in the surrounding hamlets.',
    milestonesTitle: 'Key dates',
    chaptersNavLabel: 'Chapters',
    chapterLabel: 'Chapter',
    outroTitle: 'Come and visit us',
    outroText:
      'The church of Santa Maria Assunta, Sanctuary of the Holy Crucifix, is in Via Libero Pedrelli 2, Coriano.',
    massTimes: 'Mass times',
    contacts: 'Contact us',
    zoom: 'Enlarge',
    close: 'Close',
    switchLabel: 'ITA',
    switchAria: 'Leggi questa pagina in italiano',
  },
};
