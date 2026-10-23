import React from 'react';
import { MassSlot, PageId } from '../types';
import { CORIANO_MASSES, ZONE_CHURCHES } from '../data/siteData';

interface OrariPageProps {
  onNavigate: (page: PageId) => void;
}

const MassSlots: React.FC<{ slots: MassSlot[] }> = ({ slots }) => {
  if (slots.length === 0) {
    return (
      <>
        <span aria-hidden="true" className="text-[#324A6D]/50">–</span>
        <span className="sr-only">nessuna Messa</span>
      </>
    );
  }
  return (
    <ul className="space-y-1">
      {slots.map((slot) => (
        <li key={slot.time + (slot.note ?? '')}>
          <span className="font-semibold text-[#1C244B] tabular-nums">{slot.time}</span>
          {slot.note && (
            <span className="block text-xs sm:text-sm text-[#324A6D]/80">{slot.note}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export const OrariPage: React.FC<OrariPageProps> = ({ onNavigate }) => {
  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="space-y-3">
          <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#1C244B]">
            Orari delle Messe
          </h1>
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl">
            Per feste e ricorrenze gli orari possono cambiare: controlla gli{' '}
            <button
              onClick={() => onNavigate('avvisi')}
              className="text-[#2358CD] font-semibold underline hover:text-[#184CBF] cursor-pointer"
            >
              Avvisi
            </button>
            .
          </p>
        </header>

        {/* Coriano first: it is what most visitors are looking for */}
        <section
          aria-labelledby="messe-coriano"
          className="mt-10 rounded-3xl bg-[#1C244B] text-[#F4F6FB] p-6 sm:p-10"
        >
          <h2 id="messe-coriano" className="font-sans font-bold text-2xl sm:text-3xl">
            Coriano
            <span className="block text-base sm:text-lg font-normal text-[#F4F6FB]/75 mt-1">
              Chiesa di {CORIANO_MASSES.church}
            </span>
          </h2>
          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6">
            <div>
              <dt className="text-sm uppercase tracking-wider text-[#F4F6FB]/75">Sabato</dt>
              <dd className="text-3xl sm:text-4xl font-bold tabular-nums mt-1">{CORIANO_MASSES.saturday}</dd>
            </div>
            <div>
              <dt className="text-sm uppercase tracking-wider text-[#F4F6FB]/75">Domenica</dt>
              <dd className="text-3xl sm:text-4xl font-bold tabular-nums mt-1">{CORIANO_MASSES.sunday}</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-sm uppercase tracking-wider text-[#F4F6FB]/75">Lunedì – venerdì</dt>
              <dd className="text-3xl sm:text-4xl font-bold tabular-nums mt-1">
                {CORIANO_MASSES.weekdays}
                <span className="block text-base font-normal text-[#F4F6FB]/75 mt-1">
                  {CORIANO_MASSES.weekdaysNote}
                </span>
              </dd>
            </div>
          </dl>
          <button
            onClick={() => onNavigate('vita-comunita')}
            className="mt-8 text-sm sm:text-base font-semibold underline underline-offset-4 hover:text-[#B4D4DC] cursor-pointer"
          >
            Adorazione, confessioni e gli altri orari della settimana
          </button>
        </section>

        <section aria-labelledby="messe-zona" className="mt-16">
          <h2 id="messe-zona" className="font-sans font-bold text-2xl sm:text-3xl text-[#1C244B]">
            Le altre chiese della zona pastorale
          </h2>
          <table className="mt-6 w-full text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b-2 border-[#1C244B]/15 text-xs sm:text-sm uppercase tracking-wider text-[#324A6D]/80">
                <th scope="col" className="py-3 pr-3 font-semibold">Chiesa</th>
                <th scope="col" className="py-3 px-3 font-semibold w-24 sm:w-36">Sabato</th>
                <th scope="col" className="py-3 pl-3 font-semibold w-24 sm:w-36">Domenica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ZONE_CHURCHES.map((item) => (
                <tr key={item.place} className="align-top">
                  <th scope="row" className="py-4 pr-3 font-normal">
                    <span className="block font-semibold text-[#1C244B]">{item.place}</span>
                    {item.church && (
                      <span className="block text-xs sm:text-sm text-[#324A6D]/80">{item.church}</span>
                    )}
                  </th>
                  <td className="py-4 px-3">
                    <MassSlots slots={item.saturday} />
                  </td>
                  <td className="py-4 pl-3">
                    <MassSlots slots={item.sunday} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};
