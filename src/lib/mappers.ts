/**
 * @license
 * DeSiaVe Data Mappers and Formatters
 */

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatCurrency(amount: number, currency: 'coins' | 'usd' | 'diamonds' = 'coins'): string {
  if (currency === 'usd') {
    return `$${amount.toFixed(2)}`;
  }
  if (currency === 'diamonds') {
    return `💎 ${formatNumber(amount)}`;
  }
  return `🪙 ${formatNumber(amount)}`;
}

export function calculateXpPercent(currentXp: number, targetXp: number): number {
  if (targetXp <= 0) return 100;
  return Math.min(100, Math.max(0, Math.round((currentXp / targetXp) * 100)));
}

export function getDifficultyColor(difficulty: string): { bg: string; text: string; border: string } {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' };
    case 'medium':
      return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' };
    case 'hard':
      return { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' };
    case 'legendary':
      return { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' };
    default:
      return { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' };
  }
}

export function getCategoryLabel(category: string): string {
  switch (category) {
    case 'daily': return 'Daily Quest';
    case 'special': return 'Special Event';
    case 'survey': return 'Fast Survey';
    case 'gaming': return 'Play to Earn';
    case 'social': return 'Community';
    case 'instant': return 'Instant Reward';
    default: return category;
  }
}
