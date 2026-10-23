import React from 'react';
import { PageId } from '../types';
import { PageLink } from '../components/PageLink';

interface NotFoundPageProps {
  onNavigate: (page: PageId) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => (
  <div className="font-sans text-[#324A6D] bg-white py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#1C244B]">
        Pagina non trovata
      </h1>
      <p className="text-base sm:text-lg leading-relaxed">
        L'indirizzo che hai aperto non esiste o è cambiato con il nuovo sito.
        Gli orari delle Messe e gli avvisi sono sempre raggiungibili dal menu.
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <PageLink page="home" onNavigate={onNavigate} className="btn-elementor">
          Torna alla home
        </PageLink>
        <PageLink page="orari-messe" onNavigate={onNavigate} className="btn-elementor">
          Orari Messe
        </PageLink>
      </div>
    </div>
  </div>
);
