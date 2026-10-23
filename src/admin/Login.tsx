import React, { useState } from 'react';
import { ErroreApi, login } from './api';

interface LoginProps {
  onEntrato: () => void;
  avviso?: string;
}

export const Login: React.FC<LoginProps> = ({ onEntrato, avviso }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState<string | null>(null);
  const [invio, setInvio] = useState(false);

  const invia = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrore(null);
    setInvio(true);
    try {
      await login(email, password);
      onEntrato();
    } catch (err) {
      setErrore(err instanceof ErroreApi ? err.message : 'Errore di rete, riprova.');
    } finally {
      setInvio(false);
    }
  };

  const campo = 'w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-[#2358CD] focus:outline-none';

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={invia} className="w-full max-w-sm bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-5">
        <h1 className="font-bold text-2xl text-[#1C244B] text-center">Gestione avvisi</h1>
        {avviso && <p className="text-sm text-[#1C244B] bg-[#CDE4E7] rounded-xl px-4 py-3">{avviso}</p>}
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-[#1C244B]">Email</span>
          <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={campo} />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-[#1C244B]">Password</span>
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={campo} />
        </label>
        {errore && <p role="alert" className="text-sm text-red-600">{errore}</p>}
        <button type="submit" disabled={invio} className="btn-elementor w-full disabled:opacity-60">
          {invio ? 'Accesso…' : 'Accedi'}
        </button>
      </form>
    </div>
  );
};
