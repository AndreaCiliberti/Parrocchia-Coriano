import React, { useEffect, useRef, useState } from 'react';
import { PageId, PhotoAlbum } from '../types';
import { PHOTO_ALBUMS } from '../data/siteData';
import { X, ZoomIn } from 'lucide-react';

interface ImmaginiComunitaPageProps {
  onNavigate: (page: PageId) => void;
}

const altFoto = (album: PhotoAlbum, idx: number) =>
  `${album.title}, foto ${idx + 1} di ${album.photos.length}`;

export const ImmaginiComunitaPage: React.FC<ImmaginiComunitaPageProps> = () => {
  const [selected, setSelected] = useState<{ album: PhotoAlbum; idx: number } | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selected === null) return;
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      // Give focus back to the photo that opened the lightbox
      opener.current?.focus();
    };
  }, [selected]);

  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="space-y-2">
          <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#1C244B]">
            Foto della comunità
          </h1>
          <p className="italic text-lg sm:text-xl text-[#324A6D]/80">
            "Gloria Dei vivens homo"
          </p>
        </div>

        {PHOTO_ALBUMS.map((album) => (
          <section key={album.id} aria-labelledby={album.id} className="space-y-8">
            <div className="max-w-3xl space-y-4">
              <h2 id={album.id} className="font-sans font-bold text-2xl sm:text-3xl text-[#1C244B]">
                {album.title}
              </h2>
              {album.text && <p className="text-base sm:text-lg leading-relaxed">{album.text}</p>}
              {album.author && <p className="font-semibold text-[#1C244B]">{album.author}</p>}
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {album.photos.map((photo, idx) => (
                <li key={photo}>
                  <button
                    type="button"
                    onClick={(e) => {
                      opener.current = e.currentTarget;
                      setSelected({ album, idx });
                    }}
                    aria-label={`Ingrandisci: ${altFoto(album, idx)}`}
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
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[60] bg-[#1C244B]/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={altFoto(selected.album, selected.idx)}
        >
          <button
            ref={closeButton}
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Chiudi"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selected.album.photos[selected.idx]}
            alt={altFoto(selected.album, selected.idx)}
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
