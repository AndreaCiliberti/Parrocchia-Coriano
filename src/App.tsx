/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { OrariPage } from './pages/OrariPage';
import { AvvisiPage } from './pages/AvvisiPage';
import { ImmaginiComunitaPage } from './pages/ImmaginiComunitaPage';
import { VitaComunitaPage } from './pages/VitaComunitaPage';
import { ComunitaParrocchialePage } from './pages/ComunitaParrocchialePage';
import { ContattiPage } from './pages/ContattiPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Handle URL hash navigation for exact page matching
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
      const validPages: PageId[] = [
        'home',
        'orari-messe',
        'avvisi',
        'immagini-da-una-comunita',
        'vita-comunita',
        'comunita-parrocchiale',
        'contatti',
      ];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#324A6D] antialiased selection:bg-[#467FF7]/20 selection:text-[#1C244B]">
      {/* Real site navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Pages */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}
        {currentPage === 'orari-messe' && (
          <OrariPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'avvisi' && (
          <AvvisiPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'immagini-da-una-comunita' && (
          <ImmaginiComunitaPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'vita-comunita' && (
          <VitaComunitaPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'comunita-parrocchiale' && (
          <ComunitaParrocchialePage onNavigate={handleNavigate} />
        )}
        {currentPage === 'contatti' && (
          <ContattiPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Real site footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
