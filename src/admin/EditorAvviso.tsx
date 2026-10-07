import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, ImagePlus, Trash2, X } from 'lucide-react';
import type { Avviso, NuovaImmagine } from '../types';
import { AvvisoCard } from '../components/AvvisoCard';
import { EditorTesto } from './EditorTesto';
import { riduciImmagine } from './immagini';
import { CARTELLA_IMMAGINI, MAX_BYTE_IMMAGINE, byteDaDataUrl, nomeImmagine } from './utilita';

interface EditorAvvisoProps {
  avviso: Avviso;
  indice: number;
  totale: number;
  srcAnteprima: string | null;
  onCambia: (modifiche: Partial<Avviso>, immagine?: NuovaImmagine) => void;
  onSposta: (delta: -1 | 1) => void;
  onElimina: () => void;
}

const campo = 'w-full rounded-xl border px-4 py-2.5 focus:border-[#467FF7] focus:outline-none';
const bottoneIcona = 'p-2 rounded-lg text-[#1C244B] hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent';

export const EditorAvviso: React.FC<EditorAvvisoProps> = ({
  avviso, indice, totale, srcAnteprima, onCambia, onSposta, onElimina,
}) => {
  const [erroreImmagine, setErroreImmagine] = useState<string | null>(null);
  const [caricamento, setCaricamento] = useState(false);
  const titoloMancante = !avviso.titolo.trim();

  const scegliImmagine = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setErroreImmagine(null);
    setCaricamento(true);
    try {
      const dataUrl = await riduciImmagine(file);
      if (byteDaDataUrl(dataUrl) > MAX_BYTE_IMMAGINE) throw new Error('immagine troppo grande');
      const nome = nomeImmagine(avviso.titolo, avviso.id);
      onCambia({ immagine: CARTELLA_IMMAGINI + nome }, { nome, dataUrl });
    } catch {
      setErroreImmagine('Impossibile usare questa immagine. Prova con una foto JPEG o PNG.');
    } finally {
      setCaricamento(false);
    }
  };

  return (
    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-5">
      <header className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-[#1C244B]">Posizione {indice + 1}</span>
        {avviso.bozza ? (
          <span className="text-xs font-semibold uppercase tracking-wide bg-amber-100 text-amber-800 rounded-full px-2.5 py-1">Bozza</span>
        ) : (
          <span className="text-xs font-semibold uppercase tracking-wide bg-[#CDE4E7] text-[#1C244B] rounded-full px-2.5 py-1">Visibile</span>
        )}
        <div className="ml-auto flex items-center gap-1">
          <button type="button" className={bottoneIcona} title="Sposta su" aria-label="Sposta su" disabled={indice === 0} onClick={() => onSposta(-1)}>
            <ArrowUp size={18} />
          </button>
          <button type="button" className={bottoneIcona} title="Sposta giù" aria-label="Sposta giù" disabled={indice === totale - 1} onClick={() => onSposta(1)}>
            <ArrowDown size={18} />
          </button>
          <button type="button" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[#1C244B] hover:bg-gray-100"
            onClick={() => onCambia({ bozza: !avviso.bozza })}>
            {avviso.bozza ? <><Eye size={16} /> Rendi visibile</> : <><EyeOff size={16} /> Metti in bozza</>}
          </button>
          <button type="button" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50" onClick={onElimina}>
            <Trash2 size={16} /> Elimina
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-[#1C244B]">Titolo *</span>
            <input value={avviso.titolo} onChange={(e) => onCambia({ titolo: e.target.value })}
              className={`${campo} ${titoloMancante ? 'border-red-400' : 'border-gray-200'}`} />
            {titoloMancante && <span className="text-sm text-red-600">Il titolo è obbligatorio</span>}
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-[#1C244B]">Descrizione breve</span>
            <input value={avviso.descrizioneBreve} onChange={(e) => onCambia({ descrizioneBreve: e.target.value })}
              className={`${campo} border-gray-200`} />
          </label>
          <div className="space-y-1.5">
            <span className="text-sm font-medium text-[#1C244B]">Testo</span>
            <EditorTesto valore={avviso.testo} onCambia={(testo) => onCambia({ testo })} />
          </div>
          <div className="space-y-1.5">
            <span className="text-sm font-medium text-[#1C244B]">Immagine</span>
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#467FF7] text-[#467FF7] text-sm font-medium cursor-pointer hover:bg-[#467FF7] hover:text-white transition-colors">
                <ImagePlus size={16} />
                {caricamento ? 'Elaborazione…' : srcAnteprima ? 'Sostituisci immagine' : 'Carica immagine'}
                <input type="file" accept="image/*" className="sr-only" onChange={scegliImmagine} disabled={caricamento} />
              </label>
              {avviso.immagine && (
                <button type="button" className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-[#324A6D] hover:bg-gray-100"
                  onClick={() => onCambia({ immagine: null })}>
                  <X size={16} /> Rimuovi immagine
                </button>
              )}
            </div>
            {erroreImmagine && <p className="text-sm text-red-600">{erroreImmagine}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium text-[#1C244B]">Anteprima</span>
          <div className={avviso.bozza ? 'opacity-50' : ''}>
            <AvvisoCard avviso={{ ...avviso, titolo: avviso.titolo || 'Titolo dell’avviso' }} srcImmagine={srcAnteprima} />
          </div>
        </div>
      </div>
    </section>
  );
};
