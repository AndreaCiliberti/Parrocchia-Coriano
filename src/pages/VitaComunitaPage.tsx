import React from 'react';
import { PageId } from '../types';
import { WEEKLY_SCHEDULE } from '../data/siteData';

interface VitaComunitaPageProps {
  onNavigate: (page: PageId) => void;
}

export const VitaComunitaPage: React.FC<VitaComunitaPageProps> = () => {
  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between gap-6">
          <div className="space-y-3">
            <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#1C244B]">
              Orari settimanali
            </h1>
            <p className="text-base sm:text-lg leading-relaxed max-w-xl">
              Preghiera, segreteria e attività della parrocchia, giorno per giorno.
            </p>
          </div>
          <img
            src="/images/48030.jpg"
            alt="Dipinto della chiesa di Santa Maria Assunta a Coriano"
            className="w-24 h-24 sm:w-40 sm:h-40 shrink-0 rounded-2xl object-cover"
          />
        </header>

        <div className="mt-10 border-t border-gray-200 divide-y divide-gray-200">
          {WEEKLY_SCHEDULE.map((day) => (
            <section
              key={day.dayName}
              aria-labelledby={`giorno-${day.dayName}`}
              className="py-6 sm:py-8 grid gap-3 sm:grid-cols-[10rem_1fr] sm:gap-6"
            >
              <h2 id={`giorno-${day.dayName}`} className="font-sans font-bold text-xl sm:text-2xl text-[#1C244B]">
                {day.dayName}
              </h2>
              <ul className="space-y-3">
                {day.slots.map((slot) => (
                  <li
                    key={slot.time + slot.activity}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4 text-base"
                  >
                    <span className="font-semibold text-[#1C244B] tabular-nums shrink-0 sm:w-40">
                      {slot.time}
                    </span>
                    <span>{slot.activity}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
