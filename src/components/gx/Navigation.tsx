/**
 * @license
 * DeSiaVe Navigation Component - Fixed Responsive Mobile Tab Bar & Desktop Header
 */

import React from 'react';
import { Home, Wallet, Layers, User, Trophy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Icon } from './Icon';

export type NavTab = 'home' | 'money' | 'pages' | 'account';

interface NavigationProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab }) => {
  const { user } = useAuth();

  const tabs: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'money', label: 'Wallet', icon: Wallet },
    { id: 'pages', label: 'Quests', icon: Layers },
    { id: 'account', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Desktop Top Header Bar (1440px viewport presence) */}
      <header className="hidden md:flex sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3 items-center justify-between">
        <div className="flex items-center gap-6">
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-md flex items-center justify-center text-slate-950 font-black font-outfit text-base">
              G
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-100 font-outfit group-hover:text-amber-400 transition-colors">
              GainiRen
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="flex items-center gap-2">
            {tabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick User summary in desktop header */}
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <Icon name="coin" className="w-4 h-4" />
              <span className="text-xs font-bold text-amber-400 font-mono tabular-nums">
                {user.coins.toLocaleString()}
              </span>
            </div>

            <div
              onClick={() => onSelectTab('account')}
              className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-amber-500/50">
                <Icon name="avatar" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-bold text-slate-200">{user.name}</span>
            </div>
          </div>
        )}
      </header>

      {/* Fixed Mobile Bottom Tab Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 px-3 py-2 pb-safe"
      >
        <div className="max-w-md mx-auto grid grid-cols-4 items-center gap-1">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <IconComp
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'
                    }`}
                  />
                  {tab.id === 'pages' && (
                    <span className="absolute -top-1 -right-2 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold tracking-tight mt-1 transition-all ${
                    isActive ? 'text-amber-400 font-extrabold' : 'text-slate-400'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
