import React from 'react';
import { PageId } from '../types';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="font-sans text-[#324A6D] bg-white">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#F3F5F8] to-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100 flex items-center min-h-[calc(85svh-5rem)] lg:min-h-[calc(100svh-5rem)]">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1C244B] leading-tight">
              Parrocchia S. Maria Assunta di Coriano (RN)
            </h1>
            <p className="text-xl sm:text-2xl text-[#324A6D] font-normal leading-relaxed">
              Una comunità che accoglie, prega e cresce insieme.
            </p>
            <div>
              <button
                onClick={() => onNavigate('orari-messe')}
                className="btn-elementor cursor-pointer"
              >
                Orari messe
              </button>
            </div>
          </div>

          {/* Right Column: Hero Illustration */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/images/depositphotos_426954492-stock-illustration-small-church-belfry-bell-cross.webp"
              alt="Parrocchia Coriano"
              className="max-w-full sm:max-w-md lg:max-w-lg h-auto object-contain drop-shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* 2. SECTION: ORARI MESSE */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: 4 Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <img
                src="/images/calice-square.png"
                alt="Calice"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <img
                src="/images/messa-quadrata.png"
                alt="Celebrazione"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <img
                src="/images/coriano.jpg"
                alt="Chiesa Coriano"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <img
                src="/images/rosario-libro-1024x682.jpg"
                alt="Rosario e Sacra Scrittura"
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="space-y-6">
            <h3 className="font-sans font-bold text-3xl sm:text-4xl text-[#1C244B]">
              Orari Messe
            </h3>
            <p className="text-lg text-[#324A6D] leading-relaxed">
              Qui trovi tutti gli orari delle Messe festive e feriali nelle chiese di{' '}
              <strong className="text-[#1C244B]">
                Coriano, Ospedaletto, Mulazzano, Cerasolo e Passano.
              </strong>
            </p>
            <div>
              <button
                onClick={() => onNavigate('orari-messe')}
                className="btn-elementor cursor-pointer"
              >
                Orari messe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: VITA DELLA COMUNITÀ (3 FEATURED CARDS) */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F9FAFD] border-b border-gray-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h3 className="font-sans font-bold text-3xl sm:text-4xl text-[#1C244B]">
              Vita della comunità
            </h3>
            <p className="text-lg text-[#324A6D]">
              Insieme, per costruire una Chiesa accogliente e missionaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Avvisi */}
            <div
              onClick={() => onNavigate('avvisi')}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center cursor-pointer group"
            >
              <div className="w-40 h-40 mb-6 overflow-hidden rounded-2xl">
                <img
                  src="/images/avvisi-3.png"
                  alt="Avvisi"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-sans font-bold text-2xl text-[#1C244B] group-hover:text-[#467FF7] transition-colors mb-3">
                Avvisi
              </h4>
              <p className="text-sm text-[#324A6D] leading-relaxed">
                Scopri gli avvisi del mese della comunità parrocchiale di Coriano.
              </p>
            </div>

            {/* Card 2: Vita della Comunità */}
            <div
              onClick={() => onNavigate('vita-comunita')}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center cursor-pointer group"
            >
              <div className="w-40 h-40 mb-6 overflow-hidden rounded-2xl">
                <img
                  src="/images/calice-square.png"
                  alt="Vita della Comunità"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-sans font-bold text-2xl text-[#1C244B] group-hover:text-[#467FF7] transition-colors mb-3">
                Vita della Comunità
              </h4>
              <p className="text-sm text-[#324A6D] leading-relaxed">
                Scopri gli orari quotidiani delle attività della parrocchia.
              </p>
            </div>

            {/* Card 3: gruppi comunità Parrocchiale */}
            <div
              onClick={() => onNavigate('comunita-parrocchiale')}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center cursor-pointer group"
            >
              <div className="w-40 h-40 mb-6 overflow-hidden rounded-2xl">
                <img
                  src="/images/giovani-600x600-1.png"
                  alt="Gruppi Comunità"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-sans font-bold text-2xl text-[#1C244B] group-hover:text-[#467FF7] transition-colors mb-3">
                gruppi comunità Parrocchiale
              </h4>
              <p className="text-sm text-[#324A6D] leading-relaxed">
                Scopri tutte le attività ed i gruppi attivi in parrocchia tutti i giorni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION: AVVISI PREVIEW */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: 4 Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-2xl shadow-sm">
              <img
                src="/images/oratorio-1024x682.jpg"
                alt="Oratorio"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-sm">
              <img
                src="/images/compiti-1024x682.jpg"
                alt="Compiti"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-sm">
              <img
                src="/images/pexels-minan1398-1629212-1024x576.jpg"
                alt="Comunità"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-sm">
              <img
                src="/images/messa-quadrata.png"
                alt="Messa"
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>

          {/* Right: Text & Button */}
          <div className="space-y-6">
            <h3 className="font-sans font-bold text-3xl sm:text-4xl text-[#1C244B]">
              Avvisi
            </h3>
            <p className="text-lg text-[#324A6D] leading-relaxed">
              Rimani aggiornato su tutte le attività della parrocchia! Qui troverai le informazioni su Messe, incontri, eventi comunitari e iniziative speciali.
            </p>
            <div>
              <button
                onClick={() => onNavigate('avvisi')}
                className="btn-elementor cursor-pointer"
              >
                Scopri di più
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION: IN EVIDENZA */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F3F5F8] border-b border-gray-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <h3 className="font-sans font-bold text-3xl sm:text-4xl text-[#1C244B]">
              In evidenza
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Spotlight 1: Confessioni */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex items-start space-x-5">
              <img
                src="/images/calice-square.png"
                alt="Confessioni"
                className="w-16 h-16 rounded-2xl object-cover shrink-0"
              />
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-lg text-[#1C244B]">
                  Confessioni
                </h4>
                <p className="text-sm text-[#324A6D] leading-relaxed">
                  E' possibile confessarsi tutti i lunedì tra le 9.30 e le 12 in Chiesa Parrocchiale.
                </p>
              </div>
            </div>

            {/* Spotlight 2: Messa Feriale */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex items-start space-x-5">
              <img
                src="/images/Pietro-Giovanni.jpg"
                alt="Messa Feriale"
                className="w-16 h-16 rounded-2xl object-cover shrink-0"
              />
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-lg text-[#1C244B]">
                  Messa Feriale
                </h4>
                <p className="text-sm text-[#324A6D] leading-relaxed">
                  La messa feriale viene celebrata tutti i giorni alle 18.30 in chiesa parrocchiale tranne il giovedì, quando la messa si celebra alle 20.30.
                </p>
              </div>
            </div>

            {/* Spotlight 3: Adorazione eucaristica */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex items-start space-x-5">
              <img
                src="/images/messa-quadrata.png"
                alt="Adorazione eucaristica"
                className="w-16 h-16 rounded-2xl object-cover shrink-0"
              />
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-lg text-[#1C244B]">
                  Adorazione eucaristica
                </h4>
                <p className="text-sm text-[#324A6D] leading-relaxed">
                  L'adorazione eucaristica si celebra ogni giorno dalle 8.00 alle 9.00 in Chiesa parrocchiale tranne il giovedì, quando l'adorazione si svolge la sera dopo la messa delle ore 20.30.
                </p>
              </div>
            </div>

            {/* Spotlight 4: 8x1000 & 5x1000 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex items-start space-x-5">
              <img
                src="/images/WhatsApp-Image-2026-04-28-at-13.06.51.jpeg"
                alt="8x1000"
                className="w-16 h-16 rounded-2xl object-cover shrink-0"
              />
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-lg text-[#1C244B]">
                  Dona il tuo 8x1000 e 5x1000
                </h4>
                <p className="text-sm text-[#324A6D] leading-relaxed">
                  Dona il tuo 8x1000 alla Chiesa Cattolica e il 5x1000 all'ANSPI di Coriano. Due firme che non costano nulla, ma cambiano tante cose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
