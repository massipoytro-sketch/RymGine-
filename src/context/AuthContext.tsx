/**
 * @license
 * DeSiaVe Authentication and Game Economy State Context
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SAMPLE_USER, UserProfile, SAMPLE_TRANSACTIONS, TransactionRecord } from '../data/sample';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  transactions: TransactionRecord[];
  addCoins: (amount: number, reason?: string) => void;
  deductCoins: (amount: number, reason?: string) => boolean;
  addXp: (amount: number) => void;
  claimDailyStreak: () => void;
  addTransaction: (tx: Omit<TransactionRecord, 'id' | 'timestamp'>) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  login: (email?: string) => void;
  logout: () => void;
  triggerConfetti: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'desiave_user_profile_v1';
const TX_STORAGE_KEY = 'desiave_transactions_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SAMPLE_USER;
  });

  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => {
    try {
      const saved = localStorage.getItem(TX_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SAMPLE_TRANSACTIONS;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(TX_STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#fbbf24', '#06b6d4', '#10b981', '#ffffff'],
      });
    } catch {
      // safe ignore in environments without canvas
    }
  };

  const addTransaction = (tx: Omit<TransactionRecord, 'id' | 'timestamp'>) => {
    const newTx: TransactionRecord = {
      ...tx,
      id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: 'Just now',
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const addXp = (amount: number) => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return prev;
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newXpTarget = prev.xpToNextLevel;

      while (newXp >= newXpTarget) {
        newXp -= newXpTarget;
        newLevel += 1;
        newXpTarget = Math.round(newXpTarget * 1.25);
        triggerConfetti();
        addTransaction({
          title: `Milestone: Reached Level ${newLevel}!`,
          type: 'level_up',
          amount: 10 * newLevel,
          currency: 'diamonds',
          status: 'completed',
          icon: 'hlvl',
        });
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        xpToNextLevel: newXpTarget,
      };
    });
  };

  const addCoins = (amount: number, reason = 'Quest Reward') => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return prev;
      const newCoins = prev.coins + amount;
      const newCashUsd = Number((newCoins / 1000).toFixed(2));
      return {
        ...prev,
        coins: newCoins,
        cashUsd: newCashUsd,
      };
    });

    addTransaction({
      title: reason,
      type: 'earn',
      amount,
      currency: 'coins',
      status: 'completed',
      icon: 'hearn',
    });
    triggerConfetti();
  };

  const deductCoins = (amount: number, reason = 'Shop Purchase'): boolean => {
    if (!user || user.coins < amount) return false;
    setUser((prev) => {
      if (!prev) return prev;
      const newCoins = prev.coins - amount;
      const newCashUsd = Number((newCoins / 1000).toFixed(2));
      return {
        ...prev,
        coins: newCoins,
        cashUsd: newCashUsd,
      };
    });

    addTransaction({
      title: reason,
      type: 'withdraw',
      amount,
      currency: 'coins',
      status: 'completed',
      icon: 'hwal',
    });
    return true;
  };

  const claimDailyStreak = () => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        streakDays: prev.streakDays + 1,
        energy: prev.maxEnergy,
      };
    });
    addCoins(350, 'Daily Streak Day ' + (user.streakDays + 1));
    addXp(150);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const login = (email = 'massipoytro@gmail.com') => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        ...SAMPLE_USER,
        email,
      });
      setIsLoading(false);
    }, 400);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        transactions,
        addCoins,
        deductCoins,
        addXp,
        claimDailyStreak,
        addTransaction,
        updateUser,
        login,
        logout,
        triggerConfetti,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
