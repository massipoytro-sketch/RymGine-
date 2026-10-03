/**
 * @license
 * DeSiaVe Home Screen - Main Hub, Loot Chests, and Daily Highlights
 */

import React, { useState } from 'react';
import { TopUserBar, BalanceCard, SectionHeader } from '../components/gx/Basics';
import { Icon } from '../components/gx/Icon';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_LOOTBOXES, LootBox, QuestRow } from '../data/sample';
import { useRows } from '../hooks/useRows';
import { formatNumber } from '../lib/mappers';
import { Sparkles, Gift, Flame, ArrowRight, Zap, Trophy, X } from 'lucide-react';

interface HomeScreenProps {
  onNavigateToTab: (tab: 'home' | 'money' | 'pages' | 'account') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToTab }) => {
  const { user, addCoins, deductCoins, addXp, triggerConfetti } = useAuth();
  const { rows, claimReward } = useRows();

  const [openingBox, setOpeningBox] = useState<LootBox | null>(null);
  const [rewardModal, setRewardModal] = useState<{
    boxName: string;
    coinsEarned: number;
    xpEarned: number;
  } | null>(null);

  // Filter 3 high-yield or daily featured quests
  const featuredQuests = rows.slice(0, 3);

  const handleOpenChest = (box: LootBox) => {
    if (!user) return;
    if (user.coins < box.costCoins) {
      alert(`You need ${formatNumber(box.costCoins)} coins to open this chest! Complete quests to earn coins.`);
      return;
    }

    const success = deductCoins(box.costCoins, `Opened ${box.name}`);
    if (success) {
      setOpeningBox(box);

      setTimeout(() => {
        // Random reward between min and max
        const coinsReward = Math.floor(
          Math.random() * (box.maxReward - box.minReward + 1) + box.minReward
        );
        const xpReward = Math.round(coinsReward * 0.35);

        addCoins(coinsReward, `${box.name} Loot Reward`);
        addXp(xpReward);
        triggerConfetti();

        setOpeningBox(null);
        setRewardModal({
          boxName: box.name,
          coinsEarned: coinsReward,
          xpEarned: xpReward,
        });
      }, 900);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 pb-24">
      {/* Top Profile Header */}
      <TopUserBar onAvatarClick={() => onNavigateToTab('account')} />

      {/* Main Balance Card */}
      <BalanceCard
        onDeposit={() => onNavigateToTab('pages')}
        onWithdraw={() => onNavigateToTab('money')}
      />

      {/* Daily Treasure Vaults & Loot Box Section */}
      <div className="flex flex-col gap-3">
        <SectionHeader
          title="Daily Mystery Vaults"
          subtitle="Crack open chests for instant massive coin multipliers"
          iconName="chest"
          actionText="View All"
          onAction={() => onNavigateToTab('money')}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_LOOTBOXES.map((box) => {
            const canAfford = user ? user.coins >= box.costCoins : false;

            return (
              <div
                key={box.id}
                className="gx-glass rounded-2xl p-3 flex flex-col items-center text-center justify-between border border-slate-800 hover:border-amber-500/40 transition-all group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden mb-2 p-1 relative flex items-center justify-center">
                  <Icon
                    name={box.tier === 'Legendary' ? 'hgift' : box.tier === 'Epic' ? 'chest' : 'gift'}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="absolute -top-1 -right-1 text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-outfit">
                    {box.tier}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-100 truncate w-full mb-1">
                  {box.name}
                </h3>

                <p className="text-[10px] text-amber-300/80 font-mono mb-2">
                  Up to {formatNumber(box.maxReward)} 🪙
                </p>

                <button
                  onClick={() => handleOpenChest(box)}
                  disabled={openingBox !== null}
                  className={`w-full py-1.5 px-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-1 font-outfit ${
                    canAfford
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <Icon name="coin" className="w-3 h-3" />
                  <span>{formatNumber(box.costCoins)}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Quests Carousel / List */}
      <div className="flex flex-col gap-3">
        <SectionHeader
          title="Active Daily Missions"
          subtitle="Complete fast challenges to level up your character"
          iconName="hfire"
          actionText="Explore 8+ Tasks"
          onAction={() => onNavigateToTab('pages')}
        />

        <div className="flex flex-col gap-2.5">
          {featuredQuests.map((quest) => (
            <div
              key={quest.id}
              className="gx-glass rounded-2xl p-3.5 flex items-center justify-between gap-3 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 p-2 shrink-0 flex items-center justify-center">
                  <Icon name={quest.icon} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100 truncate">
                    {quest.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-amber-400 font-mono flex items-center gap-0.5">
                      +{formatNumber(quest.rewardCoins * (quest.multiplier || 1))} 🪙
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      +{quest.rewardXp} XP
                    </span>
                  </div>
                </div>
              </div>

              {quest.completed ? (
                <span className="text-xs font-bold text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-xl border border-emerald-500/20 whitespace-nowrap">
                  Done
                </span>
              ) : (
                <button
                  onClick={() => claimReward(quest.id)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95 whitespace-nowrap"
                >
                  Claim
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Reward Modal */}
      {rewardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm gx-glass-gold rounded-3xl p-6 text-center shadow-2xl relative border border-amber-500/40">
            <button
              onClick={() => setRewardModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-amber-500/20 p-2 flex items-center justify-center shadow-lg animate-bounce">
              <Icon name="chest" className="w-full h-full object-contain" />
            </div>

            <h3 className="text-xl font-extrabold text-amber-400 font-outfit mb-1">
              Vault Unlocked!
            </h3>
            <p className="text-xs text-slate-300 mb-4">{rewardModal.boxName}</p>

            <div className="bg-slate-900/80 rounded-2xl p-4 border border-amber-500/20 flex flex-col gap-2 mb-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Coins Earned:</span>
                <span className="text-amber-400 font-bold font-mono text-base">
                  +{formatNumber(rewardModal.coinsEarned)} 🪙
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">XP Earned:</span>
                <span className="text-yellow-300 font-bold font-mono text-base">
                  +{formatNumber(rewardModal.xpEarned)} XP
                </span>
              </div>
            </div>

            <button
              onClick={() => setRewardModal(null)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm font-outfit shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              Collect Rewards
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
