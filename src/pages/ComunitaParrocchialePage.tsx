import React from 'react';
import { PageId } from '../types';
import { COMMUNITY_GROUPS, SITE_INFO } from '../data/siteData';

interface ComunitaParrocchialePageProps {
  onNavigate: (page: PageId) => void;
}

export const ComunitaParrocchialePage: React.FC<ComunitaParrocchialePageProps> = ({ onNavigate }) => {
  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <img
              src="/images/giovani-quadrata.png"
              alt="Comunità Parrocchiale"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#1C244B]">
            Comunità Parrocchia Coriano
          </h1>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {COMMUNITY_GROUPS.map((group) => (
            <div
              key={group.id}
              className="bg-[#F9FAFD] rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="h-64 overflow-hidden bg-gray-100">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 sm:p-8 space-y-4">
                  <h2 className="font-sans font-bold text-2xl text-[#1C244B]">
                    {group.name}
                  </h2>
                  <p className="text-sm sm:text-base text-[#324A6D] leading-relaxed">
                    {group.description}
                  </p>

                  {group.contactExtra && (
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 text-sm space-y-1 font-medium text-[#1C244B]">
                      {group.contactExtra.phone && (
                        <p>Telefono: <a href={`tel:${group.contactExtra.phone}`} className="text-[#467FF7]">{group.contactExtra.phone}</a></p>
                      )}
                      {group.contactExtra.mail && (
                        <p>Mail: <a href={`mailto:${group.contactExtra.mail}`} className="text-[#467FF7]">{group.contactExtra.mail}</a></p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <div className="text-xs sm:text-sm text-[#467FF7] font-semibold flex items-center">
                  <span className="mr-1.5">📍</span>
                  <span>Per saperne di più, chiedi del referente in segreteria.</span>
                </div>
              </div>
            </div>
          ))}
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
