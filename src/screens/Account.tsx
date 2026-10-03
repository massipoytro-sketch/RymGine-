/**
 * @license
 * DeSiaVe Account & Profile Screen
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Icon } from '../components/gx/Icon';
import { SectionHeader } from '../components/gx/Basics';
import { formatNumber } from '../lib/mappers';
import {
  User,
  Shield,
  Bell,
  Share2,
  Copy,
  Check,
  LogOut,
  RefreshCw,
  Trophy,
  Sparkles,
  Zap,
} from 'lucide-react';

export const AccountScreen: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const [copied, setCopied] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(user?.name || '');

  if (!user) return null;

  const referralCode = `GAINIREN-${user.username.replace('@', '').toUpperCase()}-77`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      updateUser({ name: tempName.trim() });
    }
    setEditingName(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 pb-24">
      {/* Profile Card Header */}
      <div className="w-full gx-glass-gold rounded-3xl p-6 shadow-2xl relative border border-amber-500/40 text-center flex flex-col items-center">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-amber-500/70 p-1 bg-slate-900 shadow-xl">
            <Icon name="avatar" className="w-full h-full rounded-full object-cover" />
          </div>
          <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded-full border-2 border-slate-900 font-outfit shadow-md">
            LV.{user.level}
          </span>
        </div>

        {editingName ? (
          <div className="flex items-center gap-2 mb-1">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="px-3 py-1 rounded-xl bg-slate-900 border border-amber-500/50 text-slate-100 text-sm font-bold text-center focus:outline-none"
            />
            <button
              onClick={handleSaveName}
              className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              Save
            </button>
          </div>
        ) : (
          <h1
            onClick={() => setEditingName(true)}
            className="text-xl font-extrabold text-slate-100 font-outfit tracking-tight cursor-pointer hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            {user.name}
            <span className="text-xs text-slate-400">✏️</span>
          </h1>
        )}

        <p className="text-xs text-amber-300 font-mono mb-2">{user.username}</p>
        <span className="text-[10px] text-slate-400 font-mono bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
          {user.rank} · {user.joinedDate}
        </span>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 w-full mt-5 pt-4 border-t border-amber-500/20">
          <div className="bg-slate-900/70 rounded-2xl p-2.5 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-medium">Streak</span>
            <div className="text-base font-bold text-rose-400 font-mono mt-0.5">
              {user.streakDays} Days
            </div>
          </div>

          <div className="bg-slate-900/70 rounded-2xl p-2.5 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-medium">Total Coins</span>
            <div className="text-base font-bold text-amber-400 font-mono mt-0.5">
              {formatNumber(user.coins)}
            </div>
          </div>

          <div className="bg-slate-900/70 rounded-2xl p-2.5 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-medium">Diamonds</span>
            <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">
              {formatNumber(user.diamonds)}
            </div>
          </div>
        </div>
      </div>

      {/* Referral & Invite Banner */}
      <div className="gx-glass rounded-2xl p-4 border border-slate-800 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-slate-200 font-outfit uppercase tracking-wider">
            Refer Friends & Earn 500 Coins
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Give friends your VIP invite code and earn 10% lifetime bounty bonuses.
        </p>

        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-mono text-amber-400 font-bold truncate">
            {referralCode}
          </div>
          <button
            onClick={handleCopyCode}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-outfit transition-all active:scale-95 flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Account Preferences / Controls */}
      <div className="gx-glass rounded-2xl p-4 border border-slate-800 flex flex-col gap-3">
        <SectionHeader title="Settings & Security" />

        <div className="flex flex-col divide-y divide-slate-800/80">
          <div className="flex items-center justify-between py-2.5 text-xs text-slate-300">
            <span>Email Address</span>
            <span className="text-slate-400 font-mono">{user.email}</span>
          </div>

          <div className="flex items-center justify-between py-2.5 text-xs text-slate-300">
            <span>Account Security</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Protected
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5 text-xs text-slate-300">
            <span>App Version</span>
            <span className="text-slate-500 font-mono">GainiRen v2.4.0</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full mt-2 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs font-outfit uppercase tracking-wider border border-rose-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Switch Account / Log Out
        </button>
      </div>
    </div>
  );
};
