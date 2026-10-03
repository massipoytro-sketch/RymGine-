/**
 * @license
 * DeSiaVe useRows Hook - Quests and Task Row State Management
 */

import { useState, useEffect, useMemo } from 'react';
import { SAMPLE_QUESTS, QuestRow } from '../data/sample';
import { useAuth } from '../context/AuthContext';

const ROWS_STORAGE_KEY = 'desiave_quests_rows_v1';

export function useRows() {
  const { addCoins, addXp } = useAuth();
  const [rows, setRows] = useState<QuestRow[]>(() => {
    try {
      const saved = localStorage.getItem(ROWS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SAMPLE_QUESTS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    localStorage.setItem(ROWS_STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesCategory = activeCategory === 'all' || row.category === activeCategory;
      const matchesSearch =
        row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [rows, activeCategory, searchQuery]);

  const claimReward = (id: string) => {
    const target = rows.find((r) => r.id === id);
    if (!target || target.completed) return;

    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, completed: true, progress: r.maxProgress } : r
      )
    );

    const bonusMultiplier = target.multiplier || 1;
    addCoins(target.rewardCoins * bonusMultiplier, `Completed: ${target.title}`);
    addXp(target.rewardXp * bonusMultiplier);
  };

  const toggleRowCompletion = (id: string) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextCompleted = !r.completed;
          return {
            ...r,
            completed: nextCompleted,
            progress: nextCompleted ? r.maxProgress : Math.max(0, r.progress - 1),
          };
        }
        return r;
      })
    );
  };

  const addCustomRow = (newRow: Omit<QuestRow, 'id' | 'completed' | 'progress'>) => {
    const row: QuestRow = {
      ...newRow,
      id: `q_custom_${Date.now()}`,
      completed: false,
      progress: 0,
    };
    setRows((prev) => [row, ...prev]);
  };

  const resetAllProgress = () => {
    setRows(SAMPLE_QUESTS);
  };

  return {
    rows,
    filteredRows,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    claimReward,
    toggleRowCompletion,
    addCustomRow,
    resetAllProgress,
  };
}
