import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: { id: PageId; label: string }[] = [
    { id: 'orari-messe', label: 'Orari Messe' },
    { id: 'avvisi', label: 'Avvisi' },
    { id: 'immagini-da-una-comunita', label: 'Immagini di comunità' },
    { id: 'vita-comunita', label: 'Vita comunità' },
    { id: 'comunita-parrocchiale', label: 'Comunità parrocchiale' },
    { id: 'contatti', label: 'Contatti' },
  ];

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand matching original WordPress Elementor Pathway header */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center space-x-3 text-left focus:outline-none group cursor-pointer"
          >
            <img
              src="/images/cropped-Parrocchia-180x180.png"
              alt="Parrocchia Coriano"
              className="w-12 h-12 object-contain"
            />
            <span className="font-sans font-semibold text-xl sm:text-2xl text-[#1C244B] tracking-tight group-hover:text-[#467FF7] transition-colors">
              Parrocchia Coriano
            </span>
          </button>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${
                    isActive
                      ? 'text-[#467FF7] font-semibold'
                      : 'text-[#324A6D] hover:text-[#467FF7]'
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
              className="p-2 rounded-lg text-[#1C244B] hover:text-[#467FF7] hover:bg-gray-50 focus:outline-none cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg animate-in slide-in-from-top-2">
          <div className="px-4 py-3 space-y-1">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'home'
                  ? 'bg-blue-50 text-[#467FF7] font-semibold'
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
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-blue-50 text-[#467FF7] font-semibold'
                      : 'text-[#324A6D] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
