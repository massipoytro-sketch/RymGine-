/**
 * @license
 * DeSiaVe Sample & Default Mock Data
 */

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  cashUsd: number;
  energy: number;
  maxEnergy: number;
  streakDays: number;
  diamonds: number;
  rank: string;
  joinedDate: string;
}

export interface QuestRow {
  id: string;
  title: string;
  category: 'daily' | 'special' | 'survey' | 'gaming' | 'social' | 'instant';
  description: string;
  rewardCoins: number;
  rewardXp: number;
  rewardUsd?: number;
  icon: string;
  badge?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  progress: number;
  maxProgress: number;
  completed: boolean;
  featured?: boolean;
  timeEstimate?: string;
  multiplier?: number;
}

export interface TransactionRecord {
  id: string;
  title: string;
  type: 'earn' | 'withdraw' | 'chest' | 'bonus' | 'level_up';
  amount: number;
  currency: 'coins' | 'usd' | 'diamonds';
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  icon: string;
}

export interface LootBox {
  id: string;
  name: string;
  tier: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  image: string;
  costCoins: number;
  minReward: number;
  maxReward: number;
  available: boolean;
  cooldownSeconds?: number;
}

export const SAMPLE_USER: UserProfile = {
  id: 'usr_desiave_901',
  name: 'Massi Poytro',
  username: '@massi_master',
  email: 'massipoytro@gmail.com',
  avatar: '/assets/hav.jpg',
  level: 14,
  xp: 3450,
  xpToNextLevel: 5000,
  coins: 18450,
  cashUsd: 18.45,
  energy: 85,
  maxEnergy: 100,
  streakDays: 7,
  diamonds: 142,
  rank: 'Vanguard Elite',
  joinedDate: 'Joined Sep 2026',
};

export const SAMPLE_QUESTS: QuestRow[] = [
  {
    id: 'q_01',
    title: 'Daily Check-In & Streak Boost',
    category: 'daily',
    description: 'Claim your consecutive day login streak bonus to earn double energy and coins.',
    rewardCoins: 250,
    rewardXp: 120,
    rewardUsd: 0.25,
    icon: 'hfire',
    badge: 'DAILY',
    difficulty: 'Easy',
    progress: 1,
    maxProgress: 1,
    completed: true,
    timeEstimate: 'Instant',
    multiplier: 2,
  },
  {
    id: 'q_02',
    title: 'Complete 3 High-Yield Tasks',
    category: 'daily',
    description: 'Finish any three sponsored partner quests or surveys from the explore feed.',
    rewardCoins: 1200,
    rewardXp: 450,
    rewardUsd: 1.20,
    icon: 'pv_loot',
    badge: 'HOT',
    difficulty: 'Medium',
    progress: 2,
    maxProgress: 3,
    completed: false,
    featured: true,
    timeEstimate: '5 mins',
  },
  {
    id: 'q_03',
    title: 'Unlock Dragon Vault Chest',
    category: 'special',
    description: 'Use your collected key fragments to crack open the legendary reward vault.',
    rewardCoins: 3500,
    rewardXp: 1000,
    rewardUsd: 3.50,
    icon: 'chest',
    badge: 'LEGENDARY',
    difficulty: 'Legendary',
    progress: 0,
    maxProgress: 1,
    completed: false,
    featured: true,
    timeEstimate: '2 mins',
    multiplier: 3,
  },
  {
    id: 'q_04',
    title: 'Play Fantasy Arena (Level 5)',
    category: 'gaming',
    description: 'Install partner game and reach level 5 within 24 hours to claim huge reward.',
    rewardCoins: 4800,
    rewardXp: 1600,
    rewardUsd: 4.80,
    icon: 'pv_cpx',
    badge: 'BOUNTY',
    difficulty: 'Hard',
    progress: 3,
    maxProgress: 5,
    completed: false,
    timeEstimate: '15 mins',
  },
  {
    id: 'q_05',
    title: 'Quick Opinion Survey (Tech)',
    category: 'survey',
    description: 'Answer 8 quick questions about mobile gaming preferences.',
    rewardCoins: 850,
    rewardXp: 300,
    rewardUsd: 0.85,
    icon: 'pv_ot',
    badge: 'EASY',
    difficulty: 'Easy',
    progress: 0,
    maxProgress: 1,
    completed: false,
    timeEstimate: '3 mins',
  },
  {
    id: 'q_06',
    title: 'Join GainiRen Discord Community',
    category: 'social',
    description: 'Connect with verified players, participate in weekly coin giveaways and tournaments.',
    rewardCoins: 500,
    rewardXp: 200,
    rewardUsd: 0.50,
    icon: 'pv_tw',
    badge: 'COMMUNITY',
    difficulty: 'Easy',
    progress: 1,
    maxProgress: 1,
    completed: true,
    timeEstimate: 'Instant',
  },
  {
    id: 'q_07',
    title: 'Watch 3 Spotlight Video Ads',
    category: 'instant',
    description: 'Support game creators by watching short interactive video showcases.',
    rewardCoins: 300,
    rewardXp: 100,
    rewardUsd: 0.30,
    icon: 'pv_adg',
    badge: 'FAST',
    difficulty: 'Easy',
    progress: 1,
    maxProgress: 3,
    completed: false,
    timeEstimate: '1 min',
  },
  {
    id: 'q_08',
    title: 'Publish High Score in Arcade',
    category: 'gaming',
    description: 'Score over 10,000 points in the GainiRen mini-runner arcade mode.',
    rewardCoins: 2100,
    rewardXp: 750,
    rewardUsd: 2.10,
    icon: 'pv_pub',
    badge: 'SKILL',
    difficulty: 'Hard',
    progress: 7400,
    maxProgress: 10000,
    completed: false,
    timeEstimate: '8 mins',
  },
];

export const SAMPLE_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'tx_01',
    title: 'Completed Daily Bounty Streak',
    type: 'earn',
    amount: 1200,
    currency: 'coins',
    timestamp: 'Today, 2:40 PM',
    status: 'completed',
    icon: 'hearn',
  },
  {
    id: 'tx_02',
    title: 'Opened Golden Mythic Chest',
    type: 'chest',
    amount: 3500,
    currency: 'coins',
    timestamp: 'Today, 11:15 AM',
    status: 'completed',
    icon: 'chest',
  },
  {
    id: 'tx_03',
    title: 'Fast PayPal Cashout Request',
    type: 'withdraw',
    amount: 10.00,
    currency: 'usd',
    timestamp: 'Yesterday',
    status: 'completed',
    icon: 'hwal',
  },
  {
    id: 'tx_04',
    title: 'Level 14 Milestone Reward',
    type: 'level_up',
    amount: 25,
    currency: 'diamonds',
    timestamp: '2 days ago',
    status: 'completed',
    icon: 'hlvl',
  },
  {
    id: 'tx_05',
    title: 'Fantasy Arena Game Bonus',
    type: 'earn',
    amount: 4800,
    currency: 'coins',
    timestamp: '3 days ago',
    status: 'completed',
    icon: 'hearn',
  },
];

export const SAMPLE_LOOTBOXES: LootBox[] = [
  {
    id: 'lb_01',
    name: 'Starter Bronze Chest',
    tier: 'Common',
    image: '/assets/gift.jpg',
    costCoins: 500,
    minReward: 300,
    maxReward: 1200,
    available: true,
  },
  {
    id: 'lb_02',
    name: 'Dragon Vault Trove',
    tier: 'Epic',
    image: '/assets/chest.jpg',
    costCoins: 2500,
    minReward: 2000,
    maxReward: 8000,
    available: true,
  },
  {
    id: 'lb_03',
    name: 'Celestial Diamond Vault',
    tier: 'Legendary',
    image: '/assets/hgift.jpg',
    costCoins: 6000,
    minReward: 5000,
    maxReward: 20000,
    available: true,
  },
  {
    id: 'lb_04',
    name: 'Candy Sweet Treasure',
    tier: 'Rare',
    image: '/assets/candyL.jpg',
    costCoins: 1200,
    minReward: 800,
    maxReward: 3000,
    available: true,
  },
];
