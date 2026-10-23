import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X } from 'lucide-react';
import { scrollBehavior } from '../utils/motion';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: { id: PageId; label: string }[] = [
    { id: 'orari-messe', label: 'Orari Messe' },
    { id: 'avvisi', label: 'Avvisi' },
    { id: 'vita-comunita', label: 'Orari settimanali' },
    { id: 'comunita-parrocchiale', label: 'Gruppi' },
    { id: 'immagini-da-una-comunita', label: 'Foto' },
    { id: 'storia', label: 'Storia' },
    { id: 'contatti', label: 'Contatti' },
  ];

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand matching original WordPress Elementor Pathway header */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center text-left rounded-md group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2358CD]"
          >
            <span className="font-sans font-semibold text-xl sm:text-2xl text-[#1C244B] tracking-tight group-hover:text-[#2358CD] transition-colors">
              Parrocchia Coriano
            </span>
          </button>

          {/* Desktop Navigation Menu */}
          <nav aria-label="Menu principale" className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2358CD] ${
                    isActive
                      ? 'text-[#2358CD] font-semibold'
                      : 'text-[#324A6D] hover:text-[#2358CD]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 -mr-3 rounded-lg text-[#1C244B] hover:text-[#2358CD] hover:bg-gray-50 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2358CD]"
              aria-label={mobileMenuOpen ? 'Chiudi il menu' : 'Apri il menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="menu-mobile"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav id="menu-mobile" aria-label="Menu" className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="px-4 py-3 space-y-1">
            <button
              onClick={() => handleNav('home')}
              aria-current={currentPage === 'home' ? 'page' : undefined}
              className={`w-full text-left px-3 py-3 rounded-lg text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2358CD] ${
                currentPage === 'home'
                  ? 'bg-blue-50 text-[#2358CD] font-semibold'
                  : 'text-[#324A6D] hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            {menuItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full text-left px-3 py-3 rounded-lg text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2358CD] ${
                    isActive
                      ? 'bg-blue-50 text-[#2358CD] font-semibold'
                      : 'text-[#324A6D] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};
