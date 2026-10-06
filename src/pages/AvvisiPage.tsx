import React from 'react';
import { PageId } from '../types';

interface AvvisiPageProps {
  onNavigate: (page: PageId) => void;
}

export const AvvisiPage: React.FC<AvvisiPageProps> = ({ onNavigate }) => {
  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="font-sans font-bold text-4xl sm:text-5xl text-[#1C244B]">
            Avvisi
          </h2>
          <h5 className="italic text-lg sm:text-xl text-[#324A6D]/80">
            "Gloria Dei vivens homo"
          </h5>
        </div>

        {/* Notice 1: 8x1000 & 5x1000 */}
        <div className="bg-[#F9FAFD] rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-sm max-w-2xl mx-auto">
            <img
              src="/images/WhatsApp-Image-2026-04-28-at-13.06.51.jpeg"
              alt="Dona il tuo 8x1000"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#1C244B]">
              DONA IL TUO 8x1000
            </h2>
            <p className="text-lg text-[#324A6D] leading-relaxed">
              Dona il tuo 8×1000 alla Chiesa Cattolica e il 5×1000 all’ANSPI di Coriano.
            </p>
            <p className="text-base text-[#1C244B] font-semibold">
              Due firme che non costano nulla, ma cambiano tante cose
            </p>
          </div>
        </div>

        {/* Notice 2: Festa dei nonni */}
        <div className="bg-[#F9FAFD] rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-sm max-w-2xl mx-auto">
            <img
              src="/images/Festa-dei-nonni-768x543.jpeg"
              alt="Festa dei nonni"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="space-y-4">
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#1C244B]">
              FESTA DEI NONNI - DOMENICA 28 GIUGNO CORTILE SUORE
            </h2>
            <p className="text-base sm:text-lg text-[#324A6D] leading-relaxed">
              Vi aspettiamo tutti per una serata in compagnia ed allegria dedicata alle persone più importanti delle nostre famiglie 💖
            </p>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 text-sm sm:text-base space-y-1">
              <p className="font-semibold text-[#1C244B]">Prenotate entro il 24 giugno ai numeri:</p>
              <p>Telefono: <a href="tel:0541657167" className="text-[#467FF7] font-semibold">0541 657167</a></p>
              <p>Cellulare: <a href="tel:3389284013" className="text-[#467FF7] font-semibold">338 9284013</a></p>
            </div>
          </div>
        </div>

        {/* Notice 3: Diocesi accoglie il Papa */}
        <div className="bg-[#F9FAFD] rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-sm max-w-lg mx-auto">
            <img
              src="/images/Diocesi-di-Rimini-e-Papa-768x1086.jpeg"
              alt="La Diocesi di Rimini accoglie il Papa"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="space-y-4">
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#1C244B]">
              LA DIOCESI DI RIMINI ACCOGLIE IL PAPA - PARTECIPA COME VOLONTARIO
            </h2>
            <p className="text-lg font-semibold text-[#1C244B]">
              IL PAPA A RIMINI
            </p>
            <p className="text-base text-[#324A6D] leading-relaxed">
              Il nostro aiuto è importante… dai bambini agli adulti! Lasciamoci coinvolgere tutti e partecipiamo attivamente alla visita del Papa.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf2e77euV3pO0aUuahlttjE4ZFI8mjjTrrIxsFLgrMVNbM99A/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-elementor text-xs sm:text-sm"
              >
                CANDIDATI COME VOLONTARIO
              </a>
              <a
                href="https://www.diocesi.rimini.it"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-[#467FF7] text-[#467FF7] hover:bg-[#467FF7] hover:text-white transition-colors text-xs sm:text-sm font-medium"
              >
                INFO UTILI DIOCESI
              </a>
            </div>
          </div>
        </div>

        {/* Notice 4: Confessioni */}
        <div className="bg-[#B4D4DC]/40 rounded-3xl p-8 border border-[#a2c9d2] space-y-3">
          <h2 className="font-sans font-bold text-2xl text-[#1C244B] flex items-center">
            <span className="mr-2">📌</span> Confessioni
          </h2>
          <p className="text-base sm:text-lg text-[#1C244B] leading-relaxed">
            E’ possibile confessarsi ogni lunedì mattina tra le <strong>9.30 e le 12</strong> presso la chiesa parrocchiale di Coriano.
          </p>
        </div>
      </div>
    </div>
  );
};
