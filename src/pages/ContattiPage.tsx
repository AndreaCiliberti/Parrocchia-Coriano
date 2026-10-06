import React, { useState } from 'react';
import { PageId } from '../types';
import { SITE_INFO } from '../data/siteData';

interface ContattiPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContattiPage: React.FC<ContattiPageProps> = ({ onNavigate }) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-sans font-bold text-4xl sm:text-5xl text-[#1C244B]">
            Contatti
          </h1>
          <p className="text-base sm:text-lg text-[#324A6D] leading-relaxed">
            Siamo qui per ascoltarti e condividere il cammino della fede insieme a te. Per qualsiasi domanda, informazione o richiesta sui gruppi parrocchiali, non esitare a metterti in contatto con noi.
          </p>
        </div>

        {/* Contact Info and Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info & Real Map Screenshot */}
          <div className="space-y-8">
            <div className="bg-[#F9FAFD] rounded-3xl p-8 border border-gray-100 shadow-sm space-y-5">
              <h2 className="font-sans font-bold text-2xl text-[#1C244B]">
                Parrocchia
              </h2>
              <div className="space-y-3 text-base text-[#1C244B]">
                <p>
                  <strong>Indirizzo:</strong> {SITE_INFO.address}
                </p>
                <p>
                  <strong>Orari Segreteria:</strong> {SITE_INFO.secretaryHours}
                </p>
                <p>
                  <strong>Telefono:</strong>{' '}
                  <a href={`tel:${SITE_INFO.phone}`} className="text-[#467FF7] font-semibold underline">
                    {SITE_INFO.phone}
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${SITE_INFO.email}`} className="text-[#467FF7] font-semibold underline">
                    {SITE_INFO.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Original Map Screenshot from User's Site */}
            <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-200">
              <a
                href="https://maps.google.com/?q=Via+Libero+Pedrelli+2+Coriano+RN"
                target="_blank"
                rel="noopener noreferrer"
                title="Apri in Google Maps"
                className="block group relative"
              >
                <img
                  src="/images/Screenshot-2025-03-12-alle-16.45.09-1024x902.png"
                  alt="Mappa Coriano"
                  className="w-full h-auto object-cover group-hover:opacity-95 transition-opacity"
                />
                <div className="p-4 bg-white text-xs font-semibold text-[#467FF7] text-center border-t border-gray-100 flex items-center justify-center space-x-1.5">
                  <span>📍 Apri la posizione su Google Maps</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="bg-[#F9FAFD] rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="font-sans font-bold text-2xl text-[#1C244B] mb-2">
              Scrivici un Messaggio
            </h3>
            <p className="text-sm text-[#324A6D] mb-6">
              Compila il modulo per inviare una richiesta alla segreteria della Parrocchia.
            </p>

            {sent ? (
              <div className="bg-blue-50 border border-blue-200 text-[#1C244B] p-6 rounded-2xl text-center space-y-3">
                <div className="text-2xl">✓</div>
                <h4 className="font-bold text-lg">Grazie, {formName}!</h4>
                <p className="text-sm text-[#324A6D]">
                  Il tuo messaggio è stato inviato alla segreteria parrocchiale. Ti risponderemo al più presto.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setFormName('');
                    setFormEmail('');
                    setFormSubject('');
                    setFormMessage('');
                  }}
                  className="mt-2 text-xs font-semibold text-[#467FF7] underline"
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C244B] uppercase mb-1">
                    Nome e Cognome*
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#467FF7] text-sm"
                    placeholder="Mario Rossi"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C244B] uppercase mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#467FF7] text-sm"
                    placeholder="nome@email.it"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C244B] uppercase mb-1">
                    Oggetto
                  </label>
                  <input
                    type="text"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#467FF7] text-sm"
                    placeholder="Informazioni o richiesta..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C244B] uppercase mb-1">
                    Messaggio*
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#467FF7] text-sm"
                    placeholder="Scrivi qui il tuo messaggio..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-elementor w-full cursor-pointer"
                  >
                    Invia Messaggio
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
