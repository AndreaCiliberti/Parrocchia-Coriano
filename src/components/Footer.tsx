import React from 'react';
import { PageId } from '../types';
import { SITE_INFO } from '../data/siteData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="font-sans text-[#324A6D]">
      {/* Upper footer with the authentic soft blue background (#B4D4DC) */}
      <div className="bg-[#B4D4DC] py-12 px-4 sm:px-6 lg:px-8 border-t border-[#a2c9d2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          {/* Col 1: Pagine */}
          <div>
            <h3 className="font-semibold text-lg text-[#1C244B] mb-4">
              Pagine
            </h3>
            <ul className="space-y-2 text-[#324A6D]">
              <li>
                <button 
                  onClick={() => handleNav('orari-messe')} 
                  className="hover:text-[#467FF7] transition-colors cursor-pointer text-left"
                >
                  Orari Messe
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('avvisi')} 
                  className="hover:text-[#467FF7] transition-colors cursor-pointer text-left"
                >
                  Avvisi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('immagini-da-una-comunita')} 
                  className="hover:text-[#467FF7] transition-colors cursor-pointer text-left"
                >
                  Immagini di comunità
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('vita-comunita')} 
                  className="hover:text-[#467FF7] transition-colors cursor-pointer text-left"
                >
                  Vita Comunità
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('comunita-parrocchiale')} 
                  className="hover:text-[#467FF7] transition-colors cursor-pointer text-left"
                >
                  Gruppi Comunità
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('storia')} 
                  className="hover:text-[#467FF7] transition-colors cursor-pointer text-left"
                >
                  Storia
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('contatti')} 
                  className="hover:text-[#467FF7] transition-colors cursor-pointer text-left"
                >
                  Contatti
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Legal */}
          <div>
            <h3 className="font-semibold text-lg text-[#1C244B] mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-[#324A6D]">
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-[#467FF7] transition-colors cursor-pointer text-left"
                >
                  Informativa Privacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cookie-policy')}
                  className="hover:text-[#467FF7] transition-colors cursor-pointer text-left"
                >
                  Cookie policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contatti */}
          <div>
            <h3 className="font-semibold text-lg text-[#1C244B] mb-4">
              Contatti
            </h3>
            <div className="space-y-2 text-[#324A6D]">
              <p>
                Mail:{' '}
                <a 
                  href={`mailto:${SITE_INFO.email}`} 
                  className="hover:text-[#467FF7] transition-colors underline"
                >
                  {SITE_INFO.email}
                </a>
              </p>
              <p>
                Tel:{' '}
                <a 
                  href={`tel:${SITE_INFO.phone}`} 
                  className="hover:text-[#467FF7] transition-colors underline"
                >
                  {SITE_INFO.phone}
                </a>
              </p>
              <p className="text-xs text-[#324A6D]/80 pt-1">
                Orari Segreteria: {SITE_INFO.secretaryHours}
              </p>
            </div>
          </div>

          {/* Col 4: Indirizzo */}
          <div>
            <h3 className="font-semibold text-lg text-[#1C244B] mb-4">
              Indirizzo
            </h3>
            <p className="text-[#324A6D] leading-relaxed">
              Via Libero Pedrelli, 2,<br />
              47853 Coriano RN
            </p>
          </div>
        </div>
      </div>

      {/* Middle section with the 4 institutional partner logos */}
      <div className="bg-[#B4D4DC] pb-8 pt-4 px-4 sm:px-6 lg:px-8 border-t border-[#a2c9d2]/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <img src="/images/1-1.png" alt="Unione Europea" className="h-14 sm:h-16 w-auto object-contain" />
          <img src="/images/2-1.png" alt="Repubblica Italiana" className="h-14 sm:h-16 w-auto object-contain" />
          <img src="/images/3-1.png" alt="Ministero del Lavoro e delle Politiche Sociali" className="h-14 sm:h-16 w-auto object-contain" />
          <img src="/images/4-1.png" alt="PN Inclusione" className="h-14 sm:h-16 w-auto object-contain" />
        </div>
      </div>

      {/* Lower section with the official PN Inclusione & FSE+ declaration */}
      <div className="bg-[#a7cad3] py-6 px-4 sm:px-6 lg:px-8 text-xs text-[#1C244B]/90 leading-relaxed text-center">
        <div className="max-w-5xl mx-auto">
          <p>
            La presente organizzazione senza scopo di lucro/Organismo pubblico <strong>PARROCCHIA DI S. MARIA ASSUNTA</strong> partecipa al Programma Nazionale Inclusione e Lotta alla povertà 2021-2027, Priorità 3 “Contrasto alla deprivazione materiale – Sostegno agli indigenti a titolo dell’obiettivo specifico di cui all’articolo 4, paragrafo 1, lettera m), del Regolamento FSE+”, Obiettivo Specifico (ESO.4.13), Azione di contrasto alla Povertà alimentare (PN Inclusione) in qualità di Organizzazione partner Territoriale (OpT) associata alla Organizzazione partner Capofila (OpC) <strong>CARITAS RIMINI ODV</strong>, nell’anno 2025, ha sostenuto n. 190 persone in condizione di grave deprivazione attraverso l’erogazione di aiuti alimentati e misure di accompagnamento, per un totale di beni distribuiti pari a 3,931 tonnellate di alimenti di cui n. 628 pacchi alimentari finanziati dal PN Inclusione.
          </p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="bg-[#1C244B] py-4 text-center text-xs text-white/80">
        <p>© All Rights Reserved - Parrocchia S. Maria Assunta di Coriano</p>
      </div>
    </footer>
  );
};
