/**
 * @license
 * DeSiaVe Basic Atomic UI Components
 */

import React from 'react';
import { Icon } from './Icon';
import { formatNumber, formatCurrency, calculateXpPercent } from '../../lib/mappers';
import { useAuth } from '../../context/AuthContext';
import { Flame, Zap, Trophy, Sparkles, ChevronRight } from 'lucide-react';

export const TopUserBar: React.FC<{ onAvatarClick?: () => void }> = ({ onAvatarClick }) => {
  const { user, claimDailyStreak } = useAuth();
  if (!user) return null;

  const xpPercent = calculateXpPercent(user.xp, user.xpToNextLevel);

  return (
    <div className="w-full gx-glass rounded-2xl p-3 sm:p-4 mb-4 flex items-center justify-between gap-3 shadow-lg border border-slate-800/80">
      {/* User Info & Avatar */}
      <div
        onClick={onAvatarClick}
        className="flex items-center gap-3 cursor-pointer group hover:opacity-95 transition-opacity"
      >
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-500/60 p-0.5 bg-slate-900 shadow-md">
            <Icon name="avatar" className="w-full h-full rounded-full object-cover" />
          </div>
          <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-[10px] font-bold text-slate-950 px-1.5 py-0.2 rounded-full border border-slate-900 font-outfit">
            LV.{user.level}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-100 flex items-center gap-1.5 group-hover:text-amber-400 transition-colors">
            {user.name}
            <span className="text-[10px] text-amber-400/90 font-medium px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 font-mono">
              {user.rank}
            </span>
          </span>

          {/* XP Bar */}
          <div className="flex items-center gap-2 mt-1">
            <div className="w-24 sm:w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-mono tabular-nums">
              {formatNumber(user.xp)}/{formatNumber(user.xpToNextLevel)} XP
            </span>
          </div>
        </div>
      </div>

      {/* Streak & Energy Quick Stats */}
      <div className="flex items-center gap-2">
        <button
          onClick={claimDailyStreak}
          title="Daily Streak - Click to boost"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold transition-all active:scale-95"
        >
          <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          <span className="tabular-nums font-mono">{user.streakDays}d</span>
        </button>

        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
          <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
          <span className="tabular-nums font-mono">{user.energy}%</span>
        </div>
      </div>
    </div>
  );
};

export const BalanceCard: React.FC<{
  onDeposit?: () => void;
  onWithdraw?: () => void;
}> = ({ onDeposit, onWithdraw }) => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="w-full gx-glass-gold rounded-3xl p-5 mb-5 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-amber-200/80 tracking-wide uppercase flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Total Vault Balance
        </span>
        <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
          <span>💎 {formatNumber(user.diamonds)} Gems</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-outfit tracking-tight tabular-nums">
            {formatNumber(user.coins)}
          </span>
          <span className="text-sm font-semibold text-amber-200/90 uppercase tracking-wider">
            Coins
          </span>
        </div>
        <div className="text-sm font-medium text-slate-300 flex items-center gap-1">
          <span>Equivalent:</span>
          <span className="text-emerald-400 font-bold font-mono text-base">
            ${user.cashUsd.toFixed(2)} USD
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-amber-500/20">
        <button
          onClick={onDeposit}
          className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
        >
          <Icon name="coin" className="w-4 h-4" />
          Earn Coins
        </button>
        <button
          onClick={onWithdraw}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
        >
          <Icon name="hwal" className="w-4 h-4" />
          Cash Out
        </button>
      </div>
    </div>
  );
};

export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
  iconName?: string;
}> = ({ title, subtitle, actionText, onAction, iconName }) => {
  return (
    <div className="flex items-center justify-between mb-3 px-1">
      <div className="flex items-center gap-2">
        {iconName && <Icon name={iconName} className="w-5 h-5" />}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-100 font-outfit tracking-tight">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
      </div>

      {actionText && (
        <button
          onClick={onAction}
          className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-0.5"
        >
          {actionText}
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
