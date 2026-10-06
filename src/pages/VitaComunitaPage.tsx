import React from 'react';
import { PageId } from '../types';
import { WEEKLY_SCHEDULE, SITE_INFO } from '../data/siteData';

interface VitaComunitaPageProps {
  onNavigate: (page: PageId) => void;
}

export const VitaComunitaPage: React.FC<VitaComunitaPageProps> = ({ onNavigate }) => {
  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Banner with original image */}
        <div className="text-center space-y-6">
          <div className="rounded-3xl overflow-hidden shadow-sm max-w-2xl mx-auto">
            <img
              src="/images/48030.jpg"
              alt="Vita Comunità"
              className="w-full h-auto object-cover max-h-80"
            />
          </div>
          <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#1C244B]">
            Gli orari della vita della comunità
          </h1>
        </div>

        {/* Schedule by Days */}
        <div className="space-y-8">
          {WEEKLY_SCHEDULE.map((day, idx) => (
            <div
              key={idx}
              className="bg-[#F9FAFD] rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4"
            >
              <h4 className="font-sans font-bold text-2xl text-[#1C244B] border-b border-gray-200/80 pb-3">
                {day.dayName}
              </h4>
              <div className="space-y-3">
                {day.slots.map((slot, sIdx) => (
                  <div key={sIdx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-sm sm:text-base">
                    <span className="font-bold text-[#467FF7] shrink-0 sm:w-44">
                      {slot.time}
                    </span>
                    <span className="text-[#324A6D]">
                      {slot.activity}
                    </span>
                  </div>
                ))}
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
