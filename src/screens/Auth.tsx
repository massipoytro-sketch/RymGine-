/**
 * @license
 * DeSiaVe Authentication Screen - Login, Sign Up, and Guest Access
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Icon } from '../components/gx/Icon';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('massipoytro@gmail.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md gx-glass-gold rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-amber-500/30">
        {/* Brand Lockup */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-1 mb-3 shadow-xl flex items-center justify-center">
            <span className="text-3xl font-black text-slate-950 font-outfit">G</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 font-outfit tracking-tight">
            GainiRen
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            The gamified quest & rewards platform. Complete tasks, level up, and earn cashouts.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                !isSignUp ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                isSignUp ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400'
              }`}
            >
              Register
            </button>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Email Address:
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Password:
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-outfit shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-1"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{isSignUp ? 'Create Player Account' : 'Enter DeSiaVe'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => login()}
            className="w-full py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-slate-300 font-medium text-xs border border-slate-800 transition-all"
          >
            Continue as Instant Guest Player
          </button>
        </form>

        <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-slate-800/80 text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" /> Secure Storage
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" /> Instant Payouts
          </span>
        </div>
      </div>
    </div>
  );
};
