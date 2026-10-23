import React from 'react';
import { PageId, type FileAvvisi } from '../types';
import { CORIANO_MASSES } from '../data/siteData';
import datiAvvisi from '../data/avvisi.json';
import { estratto, soloPubblicati } from '../data/avvisiPubblici';

// Avvisi have no date: the first ones in avvisi.json are the ones shown first on the Avvisi page.
const ultimiAvvisi = soloPubblicati((datiAvvisi as FileAvvisi).avvisi).slice(0, 3);

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
            <div className="pt-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#324A6D]">
                Messe a Coriano
              </h2>
              <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-4">
                <div>
                  <dt className="text-sm text-[#324A6D]">Sabato</dt>
                  <dd className="text-2xl sm:text-3xl font-bold text-[#1C244B] tabular-nums">{CORIANO_MASSES.saturday}</dd>
                </div>
                <div>
                  <dt className="text-sm text-[#324A6D]">Domenica</dt>
                  <dd className="text-2xl sm:text-3xl font-bold text-[#1C244B] tabular-nums">{CORIANO_MASSES.sunday}</dd>
                </div>
                <div>
                  <dt className="text-sm text-[#324A6D]">Lunedì – venerdì</dt>
                  <dd className="text-2xl sm:text-3xl font-bold text-[#1C244B] tabular-nums">
                    {CORIANO_MASSES.weekdays}
                    <span className="ml-2 text-sm font-normal text-[#324A6D]">{CORIANO_MASSES.weekdaysNote}</span>
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <button
                onClick={() => onNavigate('orari-messe')}
                className="btn-elementor cursor-pointer"
              >
                Orari di tutta la zona
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

      {/* 2. SECTION: ULTIMI AVVISI (from avvisi.json) */}
      <section
        aria-labelledby="home-avvisi"
        className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="max-w-3xl mx-auto">
          <h2 id="home-avvisi" className="font-sans font-bold text-3xl sm:text-4xl text-[#1C244B]">
            Avvisi
          </h2>
          {ultimiAvvisi.length > 0 ? (
            <ul className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
              {ultimiAvvisi.map((avviso) => (
                <li key={avviso.id} className="py-6">
                  <h3 className="font-sans font-semibold text-xl text-[#1C244B]">{avviso.titolo}</h3>
                  <p className="mt-2 text-base sm:text-lg text-[#324A6D] leading-relaxed">
                    {avviso.descrizioneBreve || estratto(avviso.testo, 180)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-lg text-[#324A6D]">Al momento non ci sono avvisi.</p>
          )}
          <button
            onClick={() => onNavigate('avvisi')}
            className="btn-elementor cursor-pointer mt-8"
          >
            {ultimiAvvisi.length > 0 ? 'Leggi tutti gli avvisi' : 'Vai agli avvisi'}
          </button>
        </div>
      </section>

      {/* 3. SECTION: VITA DELLA COMUNITÀ */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F9FAFD] border-b border-gray-100">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-3">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#1C244B]">
              Vita della comunità
            </h2>
            <p className="text-lg text-[#324A6D]">
              Insieme, per costruire una Chiesa accogliente e missionaria.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1: Orari settimanali */}
            <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg motion-safe:hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center group focus-within:ring-2 focus-within:ring-[#2358CD] focus-within:ring-offset-2">
              <div className="w-40 h-40 mb-6 overflow-hidden rounded-2xl">
                <img
                  loading="lazy"
                  src="/images/calice-square.png"
                  alt=""
                  className="w-full h-full object-contain motion-safe:group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-sans font-bold text-2xl text-[#1C244B] group-hover:text-[#2358CD] transition-colors mb-3">
                {/* The ::after overlay makes the whole card clickable */}
                <button
                  type="button"
                  onClick={() => onNavigate('vita-comunita')}
                  className="cursor-pointer focus:outline-none after:absolute after:inset-0 after:rounded-3xl"
                >
                  Orari settimanali
                </button>
              </h3>
              <p className="text-sm text-[#324A6D] leading-relaxed">
                Adorazione, confessioni, doposcuola e incontri, giorno per giorno.
              </p>
            </div>

            {/* Card 2: Gruppi */}
            <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg motion-safe:hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center group focus-within:ring-2 focus-within:ring-[#2358CD] focus-within:ring-offset-2">
              <div className="w-40 h-40 mb-6 overflow-hidden rounded-2xl">
                <img
                  loading="lazy"
                  src="/images/giovani-600x600-1.png"
                  alt=""
                  className="w-full h-full object-contain motion-safe:group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-sans font-bold text-2xl text-[#1C244B] group-hover:text-[#2358CD] transition-colors mb-3">
                {/* The ::after overlay makes the whole card clickable */}
                <button
                  type="button"
                  onClick={() => onNavigate('comunita-parrocchiale')}
                  className="cursor-pointer focus:outline-none after:absolute after:inset-0 after:rounded-3xl"
                >
                  Gruppi
                </button>
              </h3>
              <p className="text-sm text-[#324A6D] leading-relaxed">
                Dal catechismo alla Caritas: i gruppi della parrocchia e come partecipare.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
