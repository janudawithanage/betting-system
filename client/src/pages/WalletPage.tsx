import { Link } from 'react-router-dom';
import { useState } from 'react';
import { mockUser, transactions } from '@/data/mockData';
import { formatCurrency, formatMatchDate, cn } from '@/utils';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { AlertCircle, CreditCard, Smartphone, Building, Bitcoin, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const depositMethods = [
  { icon: CreditCard, name: 'Credit / Debit Card', time: 'Instant', fee: 'Free', popular: true },
  { icon: Smartphone, name: 'Apple Pay / Google Pay', time: 'Instant', fee: 'Free', popular: true },
  { icon: Building, name: 'Bank Transfer', time: '1-3 days', fee: 'Free' },
  { icon: Bitcoin, name: 'Cryptocurrency', time: '10-30 min', fee: 'Free' },
];

const statusColors: Record<string, string> = {
  completed: 'text-green-400',
  pending: 'text-amber-400',
  failed: 'text-red-400',
  cancelled: 'text-slate-500',
};

export function WalletPage() {
  const { isLoggedIn, user } = useAuthStore();
  const { addToast } = useUIStore();
  const profile = user || mockUser;
  const [depositAmount, setDepositAmount] = useState('50');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('Bank Transfer');
  const [withdrawAccount, setWithdrawAccount] = useState('');
  const [selectedDepositMethod, setSelectedDepositMethod] = useState(depositMethods[0].name);

  if (!isLoggedIn) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-2xl">🔒</p>
        <h2 className="text-xl font-bold text-white">Sign in to access your wallet</h2>
        <Link to="/login" className="btn-primary inline-block">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Demo banner */}
      <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3">
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <p className="text-sm text-amber-300">
          <strong>Demo Mode:</strong> This is a simulated wallet UI. No real transactions are processed.
        </p>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Available Balance', value: profile.balance, icon: '💰', color: 'from-orange-500/20 to-red-500/10 border-orange-500/20', text: 'text-brand-400' },
          { label: 'Bonus Balance', value: 50.00, icon: '🎁', color: 'from-purple-500/20 to-blue-500/10 border-purple-500/20', text: 'text-purple-400' },
          { label: 'Pending Withdrawal', value: 150.00, icon: '⏳', color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/20', text: 'text-amber-400' },
        ].map((card) => (
          <motion.div key={card.label} whileHover={{ y: -2 }} className={`card bg-gradient-to-br ${card.color} p-5`}>
            <p className="text-2xl mb-3">{card.icon}</p>
            <p className={`text-2xl font-bold ${card.text}`}>{formatCurrency(card.value)}</p>
            <p className="text-sm text-slate-400 mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deposit methods */}
        <div className="space-y-4">
          <h2 className="font-bold text-white text-lg">Deposit Funds</h2>
          <div className="space-y-2">
            {depositMethods.map(({ icon: Icon, name, time, fee, popular }) => (
              <motion.button
                key={name}
                whileHover={{ scale: 1.01, x: 4 }}
                type="button"
                onClick={() => {
                  setSelectedDepositMethod(name);
                  addToast({ type: 'info', title: 'Deposit method selected', message: `${name} is ready for demo deposits.` });
                }}
                className="w-full card p-4 flex items-center gap-4 hover:border-brand-500/50 transition-all text-left"
              >
                <div className="w-10 h-10 bg-bg-elevated rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-slate-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-200">{name}</p>
                    {selectedDepositMethod === name && <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-md font-medium">Selected</span>}
                    {popular && <span className="px-1.5 py-0.5 bg-brand-500/20 text-brand-400 text-xs rounded-md font-medium">Popular</span>}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{time} • {fee}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600" />
              </motion.button>
            ))}
          </div>

          {/* Quick deposit amounts */}
          <div>
            <p className="text-sm font-medium text-slate-400 mb-2">Quick Deposit</p>
            <div className="flex gap-2 flex-wrap">
              {[20, 50, 100, 200, 500].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setDepositAmount(String(amt));
                    addToast({ type: 'success', title: 'Deposit amount selected', message: `${formatCurrency(amt)} prepared for ${selectedDepositMethod}.` });
                  }}
                  className="px-4 py-2 bg-bg-elevated hover:bg-brand-500/20 border border-bg-border hover:border-brand-500/50 rounded-lg text-sm font-medium text-slate-300 hover:text-brand-400 transition-all"
                >
                  ${amt}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="number"
                min="10"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Custom amount"
                className="input-dark flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  const amount = Number(depositAmount);
                  if (!amount || amount < 10) {
                    addToast({ type: 'warning', title: 'Minimum deposit is $10', message: 'Please enter a valid amount.' });
                    return;
                  }
                  addToast({ type: 'success', title: 'Deposit initiated', message: `${formatCurrency(amount)} via ${selectedDepositMethod} is queued in demo mode.` });
                }}
                className="btn-primary px-6"
              >
                Deposit
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-2">Min $10 • Max $10,000 per transaction</p>
          </div>
        </div>

        {/* Withdraw form */}
        <div className="space-y-4">
          <h2 className="font-bold text-white text-lg">Withdraw Funds</h2>
          <div className="card p-5 space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Withdrawal Method</label>
              <select value={withdrawMethod} onChange={(e) => setWithdrawMethod(e.target.value)} className="input-dark text-sm">
                <option>Bank Transfer</option>
                <option>Credit Card</option>
                <option>Bitcoin</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Amount ($)</label>
              <input
                type="number"
                min="10"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                className="input-dark"
              />
              <p className="text-xs text-slate-600 mt-1">Available: {formatCurrency(profile.balance)}</p>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Account / Wallet</label>
              <input
                type="text"
                value={withdrawAccount}
                onChange={(e) => setWithdrawAccount(e.target.value)}
                placeholder="IBAN / Wallet address"
                className="input-dark"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                const amount = Number(withdrawAmount);
                if (!amount || amount < 10) {
                  addToast({ type: 'warning', title: 'Minimum withdrawal is $10', message: 'Please enter a valid amount.' });
                  return;
                }
                if (!withdrawAccount.trim()) {
                  addToast({ type: 'warning', title: 'Account required', message: 'Enter an account or wallet address.' });
                  return;
                }
                addToast({ type: 'success', title: 'Withdrawal requested', message: `${formatCurrency(amount)} via ${withdrawMethod} is pending review.` });
                setWithdrawAmount('');
                setWithdrawAccount('');
              }}
              className="w-full btn-secondary flex items-center justify-center gap-2"
            >
              <ArrowDownRight className="w-4 h-4" />
              Request Withdrawal
            </button>
            <p className="text-xs text-slate-600 text-center">Processing time: 2-5 business days</p>
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div>
        <h2 className="font-bold text-white text-lg mb-4">Transaction History</h2>
        <div className="card overflow-hidden">
          <div className="hidden sm:grid grid-cols-5 px-4 py-2.5 border-b border-bg-border text-xs font-medium text-slate-500 uppercase tracking-wider">
            <span className="col-span-2">Description</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Date</span>
          </div>
          <div className="divide-y divide-bg-border">
            {transactions.map((tx) => (
              <div key={tx.id} className="grid grid-cols-2 sm:grid-cols-5 gap-2 px-4 py-3.5 hover:bg-bg-elevated/50 transition-colors">
                <div className="col-span-2 flex items-center gap-3">
                  <div className={cn('w-8 h-8 rounded-lg text-center flex items-center justify-center text-sm flex-shrink-0', tx.amount > 0 ? 'bg-green-500/15' : 'bg-bg-border')}>
                    {tx.type === 'deposit' ? '↑' : tx.type === 'withdrawal' ? '↓' : tx.type === 'bet_won' ? '🏆' : tx.type === 'bonus' ? '🎁' : '🎯'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{tx.description}</p>
                    <p className="text-xs text-slate-600">{tx.reference}</p>
                  </div>
                </div>
                <div className={cn('text-sm font-bold self-center', tx.amount > 0 ? 'text-green-400' : 'text-slate-400')}>
                  {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                </div>
                <div className="self-center">
                  <span className={cn('text-xs font-medium capitalize', statusColors[tx.status])}>
                    {tx.status === 'pending' ? <><Clock className="w-3 h-3 inline mr-1" />{tx.status}</> : tx.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500 self-center">{formatMatchDate(tx.createdAt)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
