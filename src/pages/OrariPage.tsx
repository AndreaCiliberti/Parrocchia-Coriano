import React from 'react';
import { PageId } from '../types';
import { PREFESTIVE_MASSES, FESTIVE_MASSES, SITE_INFO } from '../data/siteData';

interface OrariPageProps {
  onNavigate: (page: PageId) => void;
}

export const OrariPage: React.FC<OrariPageProps> = ({ onNavigate }) => {
  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header with authentic icon and title */}
        <div className="text-center space-y-4">
          <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#1C244B]">
            Orari Messe Zona Pastorale
          </h1>
          <p className="text-base sm:text-lg text-[#324A6D] max-w-2xl mx-auto leading-relaxed">
            In caso di eventi o festività particolari gli orari possono cambiare. Consulta la sezione{' '}
            <button
              onClick={() => onNavigate('avvisi')}
              className="text-[#467FF7] font-semibold underline hover:text-[#336de6] cursor-pointer"
            >
              Avvisi
            </button>{' '}
            per sapere se ci sono cambiamenti in alcuni giorni particolare.
          </p>
        </div>

        {/* Section 1: Messe Prefestive */}
        <div className="bg-[#F9FAFD] rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
          <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#1C244B] border-b border-gray-200 pb-4">
            Messe Prefestive
          </h2>
          <ul className="divide-y divide-gray-200/70 text-sm sm:text-base">
            {PREFESTIVE_MASSES.map((item, idx) => (
              <li key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-medium text-[#1C244B] uppercase tracking-wide">
                  {item.churchName}
                </span>
                <span className="font-bold text-[#467FF7] text-base sm:text-lg">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2: Messe Festive */}
        <div className="bg-[#F9FAFD] rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
          <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#1C244B] border-b border-gray-200 pb-4">
            Messe Festive
          </h2>
          <ul className="divide-y divide-gray-200/70 text-sm sm:text-base">
            {FESTIVE_MASSES.map((item, idx) => (
              <li key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-medium text-[#1C244B] uppercase tracking-wide">
                  {item.churchName}
                </span>
                <span className="font-bold text-[#467FF7] text-base sm:text-lg">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Contatti Box */}
        <div className="bg-[#B4D4DC]/50 rounded-3xl p-6 sm:p-8 border border-[#a2c9d2]/60 text-center space-y-4">
          <h3 className="font-sans font-bold text-2xl text-[#1C244B]">
            Contatti
          </h3>
          <div className="text-sm sm:text-base text-[#1C244B] space-y-1">
            <p className="font-semibold">{SITE_INFO.address}</p>
            <p>
              Mail: <a href={`mailto:${SITE_INFO.email}`} className="text-[#467FF7] underline">{SITE_INFO.email}</a>
            </p>
            <p>
              Telefono: <a href={`tel:${SITE_INFO.phone}`} className="text-[#467FF7] underline">{SITE_INFO.phone}</a>
            </p>
            <p className="text-xs text-[#324A6D] pt-1">
              Orari Segreteria: {SITE_INFO.secretaryHours}
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('contatti')}
              className="btn-elementor cursor-pointer"
            >
              Contattaci
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
