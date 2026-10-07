import React, { useCallback, useEffect, useState } from 'react';
import { ExternalLink, LogOut, Plus } from 'lucide-react';
import type { Avviso, NuovaImmagine } from '../types';
import { ErroreApi, caricaAvvisi, logout, pubblica } from './api';
import { cancellaBozza, leggiBozza, salvaBozza } from './bozzaLocale';
import { EditorAvviso } from './EditorAvviso';
import { Login } from './Login';
import { nomeDaPercorso, nuovoId, sposta, superaLimite } from './utilita';

type Fase = 'caricamento' | 'login' | 'editor' | 'errore';

interface Messaggio {
  tipo: 'ok' | 'errore' | 'info';
  testo: string;
  dettaglio?: string;
}

const COLORI_MESSAGGIO: Record<Messaggio['tipo'], string> = {
  ok: 'bg-green-50 text-green-800 border-green-200',
  errore: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-[#CDE4E7]/60 text-[#1C244B] border-[#B4D4DC]',
};

export const AdminApp: React.FC = () => {
  const [fase, setFase] = useState<Fase>('caricamento');
  const [avvisi, setAvvisi] = useState<Avviso[]>([]);
  const [nuoveImmagini, setNuoveImmagini] = useState<Record<string, string>>({});
  const [anteprimePubblicate, setAnteprimePubblicate] = useState<Record<string, string>>({});
  const [sha, setSha] = useState('');
  const [modificato, setModificato] = useState(false);
  const [versione, setVersione] = useState(0);
  const [inPubblicazione, setInPubblicazione] = useState(false);
  const [spazioEsaurito, setSpazioEsaurito] = useState(false);
  const [messaggio, setMessaggio] = useState<Messaggio | null>(null);

  const mostraErrore = useCallback((e: unknown) => {
    if (e instanceof ErroreApi && e.status === 401) {
      setFase('login');
      setMessaggio({ tipo: 'info', testo: 'Sessione scaduta, accedi di nuovo. Le modifiche non pubblicate sono state conservate.' });
    } else if (e instanceof ErroreApi) {
      setMessaggio({ tipo: 'errore', testo: e.message, dettaglio: e.dettaglio });
    } else {
      setMessaggio({ tipo: 'errore', testo: 'Errore di rete, controlla la connessione e riprova.', dettaglio: String(e) });
    }
  }, []);

  const carica = useCallback(async (ignoraBozza = false) => {
    try {
      const dalServer = await caricaAvvisi();
      const bozza = ignoraBozza ? null : leggiBozza();
      if (bozza) {
        setAvvisi(bozza.avvisi);
        setNuoveImmagini(bozza.nuoveImmagini);
        setSha(bozza.sha);
        setModificato(true);
        if (bozza.sha !== dalServer.sha) {
          setMessaggio({ tipo: 'info', testo: 'Attenzione: gli avvisi online sono cambiati dopo l’inizio di queste modifiche. Se pubblichi ti verrà chiesto di ricaricare.' });
        }
      } else {
        setAvvisi(dalServer.avvisi);
        setNuoveImmagini({});
        setSha(dalServer.sha);
        setModificato(false);
      }
      setVersione((v) => v + 1);
      setFase('editor');
    } catch (e) {
      if (e instanceof ErroreApi && e.status === 401) {
        setFase('login');
        return;
      }
      mostraErrore(e);
      setFase('errore');
    }
  }, [mostraErrore]);

  useEffect(() => {
    void carica();
  }, [carica]);

  const applica = (nuoviAvvisi: Avviso[], immagini: Record<string, string> = nuoveImmagini) => {
    setAvvisi(nuoviAvvisi);
    setNuoveImmagini(immagini);
    setModificato(true);
    setSpazioEsaurito(!salvaBozza({ avvisi: nuoviAvvisi, nuoveImmagini: immagini, sha }));
  };

  const aggiornaAvviso = (id: string, modifiche: Partial<Avviso>, immagine?: NuovaImmagine) => {
    const immagini = immagine ? { ...nuoveImmagini, [immagine.nome]: immagine.dataUrl } : nuoveImmagini;
    applica(avvisi.map((a) => (a.id === id ? { ...a, ...modifiche } : a)), immagini);
  };

  const nuovoAvviso = () => {
    applica([{ id: nuovoId(), titolo: '', descrizioneBreve: '', testo: '', immagine: null, bozza: true }, ...avvisi]);
  };

  const elimina = (avviso: Avviso) => {
    const nome = avviso.titolo.trim() || 'senza titolo';
    if (window.confirm(`Eliminare l’avviso “${nome}”? Sparirà dal sito alla prossima pubblicazione.`)) {
      applica(avvisi.filter((a) => a.id !== avviso.id));
    }
  };

  const annullaModifiche = async () => {
    if (!window.confirm('Annullare tutte le modifiche non pubblicate?')) return;
    cancellaBozza();
    setMessaggio(null);
    setSpazioEsaurito(false);
    await carica(true);
  };

  const esci = async () => {
    await logout().catch(() => undefined);
    setMessaggio(null);
    setFase('login');
  };

  const srcAnteprima = (avviso: Avviso): string | null => {
    if (!avviso.immagine) return null;
    const nome = nomeDaPercorso(avviso.immagine);
    return (nome && (nuoveImmagini[nome] ?? anteprimePubblicate[nome])) || avviso.immagine;
  };

  const titoliMancanti = avvisi.some((a) => !a.titolo.trim());

  const pubblicaTutto = async () => {
    const usate = new Set(avvisi.map((a) => a.immagine && nomeDaPercorso(a.immagine)).filter(Boolean));
    const immagini: NuovaImmagine[] = Object.entries(nuoveImmagini)
      .filter(([nome]) => usate.has(nome))
      .map(([nome, dataUrl]) => ({ nome, dataUrl }));
    const richiesta = { avvisi, nuoveImmagini: immagini, sha };
    if (superaLimite(JSON.stringify(richiesta))) {
      setMessaggio({
        tipo: 'errore',
        testo: 'Troppe immagini nuove per una sola pubblicazione. Rimuovine temporaneamente qualcuna, pubblica, poi aggiungile e pubblica di nuovo.',
      });
      return;
    }
    setInPubblicazione(true);
    setMessaggio({ tipo: 'info', testo: 'Pubblicazione in corso…' });
    try {
      const esito = await pubblica(richiesta);
      cancellaBozza();
      setAnteprimePubblicate((p) => ({ ...p, ...nuoveImmagini }));
      setAvvisi(esito.avvisi);
      setNuoveImmagini({});
      setSha(esito.sha);
      setModificato(false);
      setSpazioEsaurito(false);
      setVersione((v) => v + 1);
      setMessaggio({
        tipo: 'ok',
        testo: esito.modalita === 'locale' ? 'Salvato in locale.' : 'Pubblicato. Il sito si aggiorna entro circa un minuto.',
      });
    } catch (e) {
      mostraErrore(e);
    } finally {
      setInPubblicazione(false);
    }
  };

  if (fase === 'caricamento') {
    return <p className="min-h-screen flex items-center justify-center text-[#324A6D]">Caricamento…</p>;
  }

  if (fase === 'login') {
    return (
      <Login
        avviso={messaggio?.testo}
        onEntrato={() => {
          setMessaggio(null);
          setFase('caricamento');
          void carica();
        }}
      />
    );
  }

  if (fase === 'errore') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-red-700">{messaggio?.testo ?? 'Errore imprevisto.'}</p>
        <button type="button" className="btn-elementor" onClick={() => { setFase('caricamento'); void carica(); }}>
          Riprova
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-40">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3">
          <h1 className="font-bold text-xl text-[#1C244B]">Gestione avvisi</h1>
          <div className="ml-auto flex items-center gap-2">
            <a href="/#avvisi" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#1C244B] hover:bg-gray-100">
              <ExternalLink size={16} /> Vedi il sito
            </a>
            <button type="button" onClick={esci}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#1C244B] hover:bg-gray-100">
              <LogOut size={16} /> Esci
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {modificato && (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
            <span>Hai modifiche non pubblicate.</span>
            <button type="button" onClick={annullaModifiche} className="ml-auto text-sm font-semibold underline">
              Annulla modifiche
            </button>
          </div>
        )}
        {spazioEsaurito && (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            Il browser non riesce più a salvare le modifiche in attesa (spazio esaurito). Pubblica appena possibile per non perderle.
          </p>
        )}

        <button type="button" onClick={nuovoAvviso} className="btn-elementor gap-2">
          <Plus size={18} /> Nuovo avviso
        </button>

        {avvisi.length === 0 && (
          <p className="text-center py-12 text-[#324A6D]/80">Nessun avviso. Creane uno con “Nuovo avviso”.</p>
        )}

        {avvisi.map((avviso, indice) => (
          <EditorAvviso
            key={`${avviso.id}-${versione}`}
            avviso={avviso}
            indice={indice}
            totale={avvisi.length}
            srcAnteprima={srcAnteprima(avviso)}
            onCambia={(modifiche, immagine) => aggiornaAvviso(avviso.id, modifiche, immagine)}
            onSposta={(delta) => applica(sposta(avvisi, indice, indice + delta))}
            onElimina={() => elimina(avviso)}
          />
        ))}
      </main>

      <footer className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-0">
            {messaggio && (
              <div className={`rounded-xl border px-4 py-2 text-sm ${COLORI_MESSAGGIO[messaggio.tipo]}`}>
                {messaggio.testo}
                {messaggio.dettaglio && (
                  <details className="mt-1">
                    <summary className="cursor-pointer">Dettagli tecnici</summary>
                    <pre className="whitespace-pre-wrap break-all text-xs mt-1">{messaggio.dettaglio}</pre>
                  </details>
                )}
              </div>
            )}
            {!messaggio && titoliMancanti && <p className="text-sm text-red-600">Completa i titoli mancanti per pubblicare.</p>}
            {!messaggio && !titoliMancanti && !modificato && <p className="text-sm text-[#324A6D]/70">Nessuna modifica da pubblicare.</p>}
          </div>
          <button type="button" onClick={pubblicaTutto}
            disabled={inPubblicazione || titoliMancanti || !modificato}
            className="btn-elementor disabled:opacity-50 disabled:cursor-not-allowed">
            {inPubblicazione ? 'Pubblicazione…' : 'Pubblica'}
          </button>
        </div>
      </footer>
    </div>
  );
};
