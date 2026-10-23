import React from 'react';
import { PageId } from '../types';
import { SITE_INFO } from '../data/siteData';
import { MapPin } from 'lucide-react';

interface ContattiPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContattiPage: React.FC<ContattiPageProps> = ({ onNavigate }) => {
  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Title */}
        <div className="space-y-4 max-w-2xl">
          <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#1C244B]">
            Contatti
          </h1>
          <p className="text-base sm:text-lg text-[#324A6D] leading-relaxed">
            Per domande, informazioni o per avvicinarti a un gruppo, chiamaci o scrivici. La segreteria risponde dal lunedì al venerdì, dalle 9.30 alle 12.
          </p>
        </div>

        {/* Contact Info and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-[#F9FAFD] rounded-3xl p-8 border border-gray-100 shadow-sm space-y-5">
            <h2 className="font-sans font-bold text-2xl text-[#1C244B]">
              Parrocchia
            </h2>
            <div className="space-y-3 text-base text-[#1C244B]">
              <p>
                <strong>Indirizzo:</strong> {SITE_INFO.address}
              </p>
              <p>
                <strong>Segreteria:</strong> {SITE_INFO.secretaryHours}
              </p>
              <p>
                <strong>Telefono:</strong>{' '}
                <a href={`tel:${SITE_INFO.phone}`} className="text-[#2358CD] font-semibold underline">
                  {SITE_INFO.phone}
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${SITE_INFO.email}`} className="text-[#2358CD] font-semibold underline">
                  {SITE_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Original Map Screenshot from User's Site */}
          <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-200">
            <a
              href="https://maps.google.com/?q=Via+Libero+Pedrelli+2+Coriano+RN"
              target="_blank"
              rel="noopener noreferrer"
              title="Apri in Google Maps"
              className="block group relative"
            >
              <img
                loading="lazy"
                src="/images/Screenshot-2025-03-12-alle-16.45.09-1024x902.png"
                alt=""
                className="w-full h-auto object-cover group-hover:opacity-95 transition-opacity"
              />
              <div className="p-4 bg-white text-sm font-semibold text-[#2358CD] text-center border-t border-gray-100 flex items-center justify-center gap-1.5">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Apri la posizione su Google Maps</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
