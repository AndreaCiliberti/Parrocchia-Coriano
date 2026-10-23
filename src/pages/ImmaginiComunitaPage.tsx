import React, { useEffect, useRef, useState } from 'react';
import { PageId } from '../types';
import { CAMPO_LAVORO_PHOTOS } from '../data/siteData';
import { X, ZoomIn } from 'lucide-react';

interface ImmaginiComunitaPageProps {
  onNavigate: (page: PageId) => void;
}

const altFoto = (idx: number) => `Campo lavoro 2026, foto ${idx + 1} di ${CAMPO_LAVORO_PHOTOS.length}`;

export const ImmaginiComunitaPage: React.FC<ImmaginiComunitaPageProps> = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedIdx === null) return;
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedIdx(null);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      // Give focus back to the photo that opened the lightbox
      opener.current?.focus();
    };
  }, [selectedIdx]);

  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-2">
          <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#1C244B]">
            Foto della comunità
          </h1>
          <p className="italic text-lg sm:text-xl text-[#324A6D]/80">
            "Gloria Dei vivens homo"
          </p>
        </div>

        <section aria-labelledby="campo-lavoro" className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <h2 id="campo-lavoro" className="font-sans font-bold text-2xl sm:text-3xl text-[#1C244B]">
              Campo lavoro 2026
            </h2>
            <p className="text-base sm:text-lg leading-relaxed">
              Una bellissima esperienza! Due giorni intensi di lavoro ma anche di gioia. La bellezza di rimboccarsi le maniche per fare qualcosa di buono per i nostri fratelli più svantaggiati! Un grande grazie a tutti quelli che hanno contribuito alla riuscita di questo momento. Solo con il mercatino sono stati incassati in due giorni 2000 euro. È bello vedere che la Chiesa è anche mettersi a servizio (diaconia) degli altri. Il Signore ci benedica!
            </p>
            <p className="font-semibold text-[#1C244B]">Don Osvaldo</p>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {CAMPO_LAVORO_PHOTOS.map((photo, idx) => (
              <li key={photo}>
                <button
                  type="button"
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setSelectedIdx(idx);
                  }}
                  aria-label={`Ingrandisci: ${altFoto(idx)}`}
                  className="group relative block w-full aspect-square overflow-hidden rounded-2xl bg-gray-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2358CD]"
                >
                  <img
                    loading="lazy"
                    src={photo}
                    alt=""
                    className="w-full h-full object-cover motion-safe:group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute inset-0 bg-[#1C244B]/30 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity flex items-center justify-center text-[#F4F6FB]">
                    <ZoomIn className="w-8 h-8" aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Lightbox */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-[60] bg-[#1C244B]/90 flex items-center justify-center p-4"
          onClick={() => setSelectedIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label={altFoto(selectedIdx)}
        >
          <button
            ref={closeButton}
            onClick={() => setSelectedIdx(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Chiudi"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={CAMPO_LAVORO_PHOTOS[selectedIdx]}
            alt={altFoto(selectedIdx)}
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
