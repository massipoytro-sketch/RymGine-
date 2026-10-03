/**
 * @license
 * DeSiaVe ListScreen Component - Interactive Quest and Task List with Filters
 */

import React from 'react';
import { Search, CheckCircle2, Circle, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { QuestRow } from '../../data/sample';
import { Icon } from './Icon';
import { formatNumber, getDifficultyColor } from '../../lib/mappers';

interface ListScreenProps {
  rows: QuestRow[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClaimReward: (id: string) => void;
  onToggleCompletion: (id: string) => void;
  onOpenRowDetails?: (row: QuestRow) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Tasks' },
  { id: 'daily', label: 'Daily' },
  { id: 'special', label: 'Special' },
  { id: 'gaming', label: 'Games' },
  { id: 'survey', label: 'Surveys' },
  { id: 'social', label: 'Community' },
];

export const ListScreen: React.FC<ListScreenProps> = ({
  rows,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onClaimReward,
  onToggleCompletion,
  onOpenRowDetails,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Search Input and Filter Tags */}
      <div className="flex flex-col gap-2.5">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search quests, bounties, surveys..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Horizontal Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quest Items List */}
      <div className="flex flex-col gap-3">
        {rows.length === 0 ? (
          <div className="gx-glass rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-2 border border-slate-800">
            <Sparkles className="w-8 h-8 text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No tasks found</p>
            <p className="text-xs text-slate-500">
              Try selecting another category or clear your search term.
            </p>
          </div>
        ) : (
          rows.map((row) => {
            const diffStyle = getDifficultyColor(row.difficulty);
            const isCompleted = row.completed;
            const progressPercent = Math.round((row.progress / row.maxProgress) * 100);

            return (
              <div
                key={row.id}
                className={`gx-glass rounded-2xl p-4 transition-all duration-200 border relative overflow-hidden ${
                  isCompleted
                    ? 'border-emerald-500/30 bg-slate-900/40 opacity-85'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Multiplier / Featured Ribbon */}
                {row.multiplier && row.multiplier > 1 && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-yellow-400 text-slate-950 font-black text-[9px] px-2.5 py-0.5 rounded-bl-lg font-outfit uppercase tracking-wider shadow-sm">
                    {row.multiplier}X REWARD
                  </div>
                )}

                <div className="flex items-start gap-3">
                  {/* Category / Icon graphic */}
                  <div className="w-11 h-11 rounded-xl bg-slate-900/90 border border-slate-800 p-2 flex items-center justify-center shrink-0 shadow-inner">
                    <Icon name={row.icon} className="w-full h-full object-contain" />
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider font-mono ${diffStyle.bg} ${diffStyle.text} border ${diffStyle.border}`}
                      >
                        {row.difficulty}
                      </span>

                      {row.timeEstimate && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {row.timeEstimate}
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => onOpenRowDetails?.(row)}
                      className={`text-sm font-bold text-slate-100 truncate cursor-pointer hover:text-amber-400 transition-colors ${
                        isCompleted ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {row.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                      {row.description}
                    </p>

                    {/* Progress Bar if not instant */}
                    {row.maxProgress > 1 && !isCompleted && (
                      <div className="mt-2.5">
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
                          <span>Progress</span>
                          <span>
                            {row.progress} / {row.maxProgress} ({progressPercent}%)
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Footer with Rewards & Action CTA */}
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold font-mono">
                          <Icon name="coin" className="w-3.5 h-3.5" />
                          <span>+{formatNumber(row.rewardCoins * (row.multiplier || 1))}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          +{row.rewardXp} XP
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Claimed
                          </span>
                        ) : (
                          <button
                            onClick={() => onClaimReward(row.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/10 transition-all active:scale-95 flex items-center gap-1 font-outfit"
                          >
                            <span>Claim</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
