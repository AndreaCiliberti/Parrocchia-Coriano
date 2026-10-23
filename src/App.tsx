/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { OrariPage } from './pages/OrariPage';
import { AvvisiPage } from './pages/AvvisiPage';
import { ImmaginiComunitaPage } from './pages/ImmaginiComunitaPage';
import { VitaComunitaPage } from './pages/VitaComunitaPage';
import { ComunitaParrocchialePage } from './pages/ComunitaParrocchialePage';
import { StoriaPage } from './pages/StoriaPage';
import { ContattiPage } from './pages/ContattiPage';
import { LegalPage } from './pages/LegalPage';
import { PRIVACY_POLICY_HTML, COOKIE_POLICY_HTML } from './data/legalContent';
import { scrollBehavior } from './utils/motion';
import { pageFromHash, pageFromPath, pathFor } from './routes';
import { updateHead } from './seo';
import { NotFoundPage } from './pages/NotFoundPage';

interface AppProps {
  /** The page to render first; null renders the 404 page. */
  initialPage: PageId | null;
}

export default function App({ initialPage }: AppProps) {
  const [currentPage, setCurrentPage] = useState<PageId | null>(initialPage);

  // Back/forward buttons, and old hash links (/#avvisi) rewritten to real paths
  useEffect(() => {
    const fromHash = pageFromHash(window.location.hash);
    if (fromHash) {
      window.history.replaceState(null, '', pathFor(fromHash));
      setCurrentPage(fromHash);
    }
    const handlePopState = () => setCurrentPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    updateHead(currentPage);
  }, [currentPage]);

  const handleNavigate = (page: PageId) => {
    if (page !== currentPage) window.history.pushState(null, '', pathFor(page));
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#324A6D] antialiased selection:bg-[#2358CD]/20 selection:text-[#1C244B]">
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
        {currentPage === 'storia' && (
          <StoriaPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'contatti' && (
          <ContattiPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'privacy' && (
          <LegalPage title="Informativa privacy" html={PRIVACY_POLICY_HTML} />
        )}
        {currentPage === 'cookie-policy' && (
          <LegalPage title="Cookie policy" html={COOKIE_POLICY_HTML} />
        )}
        {currentPage === null && (
          <NotFoundPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Real site footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
