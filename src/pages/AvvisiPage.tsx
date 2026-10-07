import React from 'react';
import { PageId, type FileAvvisi } from '../types';
import { AvvisoCard } from '../components/AvvisoCard';
import datiAvvisi from '../data/avvisi.json';

interface AvvisiPageProps {
  onNavigate: (page: PageId) => void;
}

const avvisiVisibili = (datiAvvisi as FileAvvisi).avvisi.filter((a) => !a.bozza);

export const AvvisiPage: React.FC<AvvisiPageProps> = () => {
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

        {avvisiVisibili.length > 0 ? (
          avvisiVisibili.map((avviso) => <AvvisoCard key={avviso.id} avviso={avviso} />)
        ) : (
          <p className="text-center text-lg text-[#324A6D]/80">Al momento non ci sono avvisi.</p>
        )}
      </div>
    </div>
  );
};
