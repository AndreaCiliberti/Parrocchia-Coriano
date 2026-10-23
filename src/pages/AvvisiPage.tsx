import React from 'react';
import { PageId, type FileAvvisi } from '../types';
import { AvvisoCard } from '../components/AvvisoCard';
import datiAvvisi from '../data/avvisi.json';
import { soloPubblicati } from '../data/avvisiPubblici';

interface AvvisiPageProps {
  onNavigate: (page: PageId) => void;
}

const avvisiVisibili = soloPubblicati((datiAvvisi as FileAvvisi).avvisi);

export const AvvisiPage: React.FC<AvvisiPageProps> = () => {
  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#1C244B]">
          Avvisi
        </h1>

        {avvisiVisibili.length > 0 ? (
          avvisiVisibili.map((avviso) => <AvvisoCard key={avviso.id} avviso={avviso} />)
        ) : (
          <p className="text-center text-lg text-[#324A6D]/80">Al momento non ci sono avvisi.</p>
        )}
      </div>
    </div>
  );
};
