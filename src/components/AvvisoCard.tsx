import React from 'react';
import type { Avviso } from '../types';

interface AvvisoCardProps {
  avviso: Avviso;
  /** Sorgente da mostrare al posto di avviso.immagine (anteprima di un'immagine non ancora pubblicata). */
  srcImmagine?: string | null;
}

export const AvvisoCard: React.FC<AvvisoCardProps> = ({ avviso, srcImmagine = avviso.immagine }) => {
  return (
    <article className="bg-[#F9FAFD] rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
      {srcImmagine && (
        <div className="rounded-2xl overflow-hidden shadow-sm max-w-2xl mx-auto">
          <img loading="lazy" src={srcImmagine} alt={avviso.titolo} className="w-full h-auto object-contain" />
        </div>
      )}
      <div className="space-y-4">
        <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#1C244B]">{avviso.titolo}</h2>
        {avviso.descrizioneBreve && (
          <p className="text-lg font-semibold text-[#1C244B]">{avviso.descrizioneBreve}</p>
        )}
        {avviso.testo && (
          <div
            className="testo-avviso text-base sm:text-lg text-[#324A6D] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: avviso.testo }}
          />
        )}
      </div>
    </article>
  );
};
