/**
 * @license
 * DeSiaVe Money & Wallet Screen - Balances, Cashouts, and Transaction Logs
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatNumber } from '../lib/mappers';
import { Icon } from '../components/gx/Icon';
import { SectionHeader } from '../components/gx/Basics';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Gift,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Sparkles,
} from 'lucide-react';

export const MoneyScreen: React.FC = () => {
  const { user, transactions, deductCoins, addCoins, triggerConfetti } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [cashoutAmount, setCashoutAmount] = useState<number>(10);
  const [accountInput, setAccountInput] = useState<string>('');
  const [cashoutSuccess, setCashoutSuccess] = useState<boolean>(false);

  if (!user) return null;

  const CASHOUT_METHODS = [
    { id: 'paypal', name: 'PayPal Cash', icon: 'hwal', minUsd: 5, fee: '0%' },
    { id: 'crypto', name: 'Crypto (USDT/BTC)', icon: 'coin', minUsd: 10, fee: '0%' },
    { id: 'amazon', name: 'Amazon Gift Card', icon: 'gift', minUsd: 10, fee: '0%' },
    { id: 'apple', name: 'Apple / Google Play', icon: 'hgift', minUsd: 5, fee: '0%' },
  ];

  const handleExecuteCashout = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredCoins = cashoutAmount * 1000;

    if (user.coins < requiredCoins) {
      alert(`Insufficient balance! You need ${formatNumber(requiredCoins)} coins for a $${cashoutAmount} cashout.`);
      return;
    }

    if (!accountInput.trim()) {
      alert('Please enter your recipient account details.');
      return;
    }

    const deducted = deductCoins(requiredCoins, `${selectedMethod?.toUpperCase()} Cashout ($${cashoutAmount})`);
    if (deducted) {
      triggerConfetti();
      setCashoutSuccess(true);
      setTimeout(() => {
        setCashoutSuccess(false);
        setSelectedMethod(null);
        setAccountInput('');
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 pb-24">
      {/* Wallet Master Card */}
      <div className="w-full gx-glass-gold rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 p-2 flex items-center justify-center">
              <Icon name="hwal" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-100 font-outfit">
                GainiRen Vault Wallet
              </h1>
              <p className="text-[11px] text-amber-200/80">Instant Automated Payouts</p>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Verified Account
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-900/80 rounded-2xl p-4 border border-amber-500/20">
            <span className="text-[11px] text-slate-400 font-medium">Coin Balance</span>
            <div className="text-2xl font-extrabold text-amber-400 font-outfit mt-1 tabular-nums">
              {formatNumber(user.coins)}
            </div>
            <span className="text-[10px] text-amber-300/70 font-mono">1,000 Coins = $1.00 USD</span>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-4 border border-amber-500/20">
            <span className="text-[11px] text-slate-400 font-medium">Real Cash Value</span>
            <div className="text-2xl font-extrabold text-emerald-400 font-outfit mt-1 tabular-nums">
              ${user.cashUsd.toFixed(2)}
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Ready to Withdraw</span>
          </div>
        </div>

        <button
          onClick={() => setSelectedMethod('paypal')}
          className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-outfit shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Wallet className="w-4 h-4" />
          Request Immediate Cashout
        </button>
      </div>

      {/* Cashout Methods Grid */}
      <div className="flex flex-col gap-3">
        <SectionHeader
          title="Withdrawal Options"
          subtitle="Choose your preferred payment method"
          iconName="hearn"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CASHOUT_METHODS.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className="gx-glass rounded-2xl p-3.5 flex flex-col items-center text-center justify-between border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all active:scale-95 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 p-2 mb-2 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon name={method.icon} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xs font-bold text-slate-100 truncate w-full mb-0.5">
                {method.name}
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                Min ${method.minUsd}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions Feed */}
      <div className="flex flex-col gap-3">
        <SectionHeader
          title="Transaction Activity"
          subtitle="Real-time log of rewards, chests, and cashouts"
          iconName="hcoin"
        />

        <div className="flex flex-col gap-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="gx-glass rounded-2xl p-3.5 flex items-center justify-between gap-3 border border-slate-800"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 p-2 shrink-0 flex items-center justify-center">
                  <Icon name={tx.icon} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-100 truncate">
                    {tx.title}
                  </span>
                  <span className="text-[10px] text-slate-500">{tx.timestamp}</span>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs font-bold font-mono ${
                    tx.type === 'withdraw' ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {tx.type === 'withdraw' ? '-' : '+'}
                  {tx.currency === 'usd' ? `$${tx.amount.toFixed(2)}` : formatNumber(tx.amount)}
                  {tx.currency === 'coins' ? ' 🪙' : tx.currency === 'diamonds' ? ' 💎' : ''}
                </span>
                <div className="text-[9px] text-emerald-400/80 font-medium">Completed</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cashout Modal */}
      {selectedMethod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="w-full max-w-sm gx-glass-gold rounded-3xl p-6 relative border border-amber-500/40 shadow-2xl">
            <button
              onClick={() => setSelectedMethod(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {cashoutSuccess ? (
              <div className="text-center py-6 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 p-3 flex items-center justify-center border border-emerald-500/40 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 font-outfit">
                  Withdrawal Submitted!
                </h3>
                <p className="text-xs text-slate-400">
                  ${cashoutAmount} USD is being processed to your account.
                </p>
              </div>
            ) : (
              <form onSubmit={handleExecuteCashout} className="flex flex-col gap-4">
                <div className="text-center">
                  <h3 className="text-lg font-extrabold text-amber-400 font-outfit">
                    Cashout with {selectedMethod.toUpperCase()}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Available: {formatNumber(user.coins)} Coins (${user.cashUsd.toFixed(2)})
                  </p>
                </div>

                {/* Amount presets */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Select Cashout Amount:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[5, 10, 20].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setCashoutAmount(amt)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          cashoutAmount === amt
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        ${amt} ({amt * 1000} 🪙)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recipient Account Input */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Recipient Email or Wallet Address:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. user@email.com or wallet"
                    value={accountInput}
                    onChange={(e) => setAccountInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-outfit shadow-md transition-all active:scale-95"
                >
                  Confirm & Payout ${cashoutAmount}.00
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
