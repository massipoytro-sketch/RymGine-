/**
 * @license
 * DeSiaVe Pages & Quests Explorer Screen
 */

import React, { useState } from 'react';
import { useRows } from '../hooks/useRows';
import { ListScreen } from '../components/gx/ListScreen';
import { SectionHeader } from '../components/gx/Basics';
import { QuestRow } from '../data/sample';
import { Plus, Sparkles, X, CheckCircle2, Trophy, Clock, ArrowRight } from 'lucide-react';
import { formatNumber, getDifficultyColor } from '../lib/mappers';
import { Icon } from '../components/gx/Icon';

export const PagesScreen: React.FC = () => {
  const {
    rows,
    filteredRows,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    claimReward,
    toggleRowCompletion,
    addCustomRow,
  } = useRows();

  const [selectedRow, setSelectedRow] = useState<QuestRow | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newReward, setNewReward] = useState('500');
  const [newCategory, setNewCategory] = useState<'daily' | 'special' | 'gaming' | 'survey' | 'social'>('daily');

  const completedCount = rows.filter((r) => r.completed).length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addCustomRow({
      title: newTitle,
      description: newDesc || 'User defined custom quest objective.',
      category: newCategory,
      rewardCoins: parseInt(newReward) || 500,
      rewardXp: Math.round((parseInt(newReward) || 500) * 0.4),
      icon: 'pv_loot',
      difficulty: 'Medium',
      maxProgress: 1,
      timeEstimate: 'Custom',
    });

    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 pb-24">
      {/* Header Banner & Progress Bar */}
      <div className="w-full gx-glass rounded-3xl p-5 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-100 font-outfit tracking-tight">
              Quest & Bounty Board
            </h1>
            <p className="text-xs text-slate-400">
              Complete tasks, play sponsored games, and claim coin multipliers
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-outfit shadow-md transition-all active:scale-95 flex items-center gap-1 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>

        {/* Quest Completion Tracker */}
        <div className="bg-slate-900/80 rounded-2xl p-3 border border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-slate-300">
              Completed Tasks: <span className="text-amber-400 font-mono font-bold">{completedCount} / {rows.length}</span>
            </span>
          </div>

          <div className="w-24 sm:w-40 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${Math.round((completedCount / (rows.length || 1)) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Filterable List Component */}
      <ListScreen
        rows={filteredRows}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClaimReward={claimReward}
        onToggleCompletion={toggleRowCompletion}
        onOpenRowDetails={(row) => setSelectedRow(row)}
      />

      {/* Quest Details Modal */}
      {selectedRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md gx-glass-gold rounded-3xl p-6 relative border border-amber-500/40 shadow-2xl">
            <button
              onClick={() => setSelectedRow(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 p-2.5 flex items-center justify-center shrink-0">
                <Icon name={selectedRow.icon} className="w-full h-full object-contain" />
              </div>
              <div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider font-mono ${
                    getDifficultyColor(selectedRow.difficulty).bg
                  } ${getDifficultyColor(selectedRow.difficulty).text} border`}
                >
                  {selectedRow.difficulty}
                </span>
                <h3 className="text-base font-bold text-slate-100 font-outfit mt-1">
                  {selectedRow.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {selectedRow.description}
            </p>

            <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-slate-800 grid grid-cols-2 gap-2 mb-5">
              <div>
                <span className="text-[10px] text-slate-400">Total Coins Reward:</span>
                <div className="text-sm font-bold text-amber-400 font-mono mt-0.5">
                  +{formatNumber(selectedRow.rewardCoins * (selectedRow.multiplier || 1))} 🪙
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Experience Points:</span>
                <div className="text-sm font-bold text-yellow-300 font-mono mt-0.5">
                  +{selectedRow.rewardXp} XP
                </div>
              </div>
            </div>

            <div className="flex gap-2.5">
              {selectedRow.completed ? (
                <button
                  disabled
                  className="w-full py-3 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-500/30"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Quest Already Completed
                </button>
              ) : (
                <button
                  onClick={() => {
                    claimReward(selectedRow.id);
                    setSelectedRow(null);
                  }}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-outfit uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Complete & Claim Reward</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md gx-glass rounded-3xl p-6 relative border border-slate-800 shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-100 font-outfit mb-1">
              Create New Custom Task
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Add your own daily habit or productivity goal to GainiRen
            </p>

            <form onSubmit={handleCreateTask} className="flex flex-col gap-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Task Title:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Read 20 pages of Book"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Description:
                </label>
                <textarea
                  placeholder="Optional details or instructions..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none h-16"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Category:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="daily">Daily Habit</option>
                    <option value="special">Special Quest</option>
                    <option value="gaming">Gaming</option>
                    <option value="survey">Study / Survey</option>
                    <option value="social">Social</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Coin Reward:
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="10000"
                    step="50"
                    value={newReward}
                    onChange={(e) => setNewReward(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-outfit shadow-md transition-all active:scale-95"
              >
                Add Goal to Quest Board
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
