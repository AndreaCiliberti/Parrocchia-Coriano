import React, { useState } from 'react';
import { PageId } from '../types';
import { CAMPO_LAVORO_PHOTOS, SITE_INFO } from '../data/siteData';
import { X, ZoomIn } from 'lucide-react';

interface ImmaginiComunitaPageProps {
  onNavigate: (page: PageId) => void;
}

export const ImmaginiComunitaPage: React.FC<ImmaginiComunitaPageProps> = ({ onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="font-sans font-bold text-4xl sm:text-5xl text-[#1C244B]">
            Immagini da una comunità
          </h2>
          <h5 className="italic text-lg sm:text-xl text-[#324A6D]/80">
            "Gloria Dei vivens homo"
          </h5>
        </div>

        {/* CAMPO LAVORO 2026 ALBUM */}
        <div className="bg-[#F9FAFD] rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-8">
          <div className="space-y-4">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#1C244B]">
              CAMPO LAVORO 2026
            </h2>
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs text-base sm:text-lg leading-relaxed text-[#324A6D] space-y-4">
              <p>
                Una bellissima esperienza! Due giorni intensi di lavoro ma anche di gioia. La bellezza di rimboccarsi le maniche per fare qualcosa di buono per i nostri fratelli più svantaggiati! Un grande grazie a tutti quelli che hanno contribuito alla riuscita di questo momento. Solo con il mercatino sono stati incassati in due giorni 2000 euro. È bello vedere che la Chiesa è anche mettersi a servizio (diaconia) degli altri. Il Signore ci benedica!
              </p>
              <p className="font-bold text-[#1C244B] text-lg">
                Don Osvaldo
              </p>
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CAMPO_LAVORO_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(photo)}
                className="group relative h-64 overflow-hidden rounded-2xl bg-gray-100 cursor-pointer shadow-xs hover:shadow-md transition-all"
              >
                <img
                  src={photo}
                  alt={`Campo Lavoro ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <ZoomIn className="w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2 cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Campo Lavoro Ingrandimento"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};
