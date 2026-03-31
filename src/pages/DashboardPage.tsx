import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { mockUser, transactions, notifications } from '@/data/mockData';
import { allMatches } from '@/data/mockData';
import { formatCurrency, formatTimeAgo, formatMatchDate } from '@/utils';
import { User, Wallet, Star, Bell, Settings, TrendingUp, Award, Clock, BarChart2 } from 'lucide-react';
import { MatchCard } from '@/components/sportsbook/MatchCard';

function DashboardCard({ icon: Icon, label, value, sub, color }: { icon: any; label: string; value: string; sub?: string; color: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm font-medium text-slate-300">{label}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </motion.div>
  );
}

export function DashboardPage() {
  const { user, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-2xl">🔒</p>
        <h2 className="text-xl font-bold text-white">Sign in to access your dashboard</h2>
        <div className="flex gap-3 justify-center">
          <Link to="/login" className="btn-primary">Sign In</Link>
          <Link to="/register" className="btn-secondary">Register</Link>
        </div>
      </div>
    );
  }

  const profile = user || mockUser;
  const favMatches = allMatches.filter((m) => profile.favoriteMatches.includes(m.id));
  const unread = notifications.filter((n) => !n.read);
  const recentTxs = transactions.slice(0, 5);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Welcome bar */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-xl font-bold text-white">
          {profile.firstName[0]}{profile.lastName[0]}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, {profile.firstName}!</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="badge-hot capitalize">{profile.level}</span>
            {profile.verified && <span className="text-xs text-green-400 flex items-center gap-1">✓ Verified</span>}
          </div>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-slate-500">Balance</p>
          <p className="text-2xl font-bold text-brand-400">{formatCurrency(profile.balance)}</p>
          <Link to="/wallet" className="text-xs text-slate-500 hover:text-brand-400 transition-colors">Manage →</Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard icon={Wallet} label="Current Balance" value={formatCurrency(profile.balance)} color="bg-brand-500" />
        <DashboardCard icon={TrendingUp} label="Total Wagered" value="$524.00" sub="This month" color="bg-blue-500" />
        <DashboardCard icon={Award} label="Level" value={profile.level.toUpperCase()} sub="Gold Member" color="bg-amber-500" />
        <DashboardCard icon={Star} label="Favourites" value={`${profile.favoriteMatches.length}`} sub="Saved matches" color="bg-purple-500" />
      </div>

      {/* Two-col layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white flex items-center gap-2"><Bell className="w-4 h-4 text-brand-400" />Notifications</h2>
            {unread.length > 0 && <span className="text-xs text-brand-400">{unread.length} unread</span>}
          </div>
          <div className="space-y-2">
            {notifications.slice(0, 5).map((n) => (
              <div key={n.id} className={`card p-3 ${!n.read ? 'border-blue-500/30 bg-blue-500/5' : ''}`}>
                <div className="flex items-start gap-2">
                  <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                    n.type === 'success' ? 'bg-green-400' :
                    n.type === 'warning' ? 'bg-amber-400' :
                    n.type === 'promo' ? 'bg-brand-400' :
                    n.type === 'result' ? 'bg-blue-400' : 'bg-slate-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-200">{n.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-xs text-slate-700 mt-1">{formatTimeAgo(n.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent transactions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white flex items-center gap-2"><BarChart2 className="w-4 h-4 text-brand-400" />Recent Activity</h2>
            <Link to="/wallet" className="text-xs text-brand-400 hover:text-brand-300">View All →</Link>
          </div>
          <div className="space-y-2">
            {recentTxs.map((tx) => (
              <div key={tx.id} className="card p-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                  tx.amount > 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {tx.type === 'deposit' ? '↑' : tx.type === 'withdrawal' ? '↓' : tx.type === 'bet_won' ? '🏆' : tx.type === 'bonus' ? '🎁' : '🎯'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-200 truncate">{tx.description}</p>
                  <p className="text-xs text-slate-500">{formatTimeAgo(tx.createdAt)}</p>
                </div>
                <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-slate-400'}`}>
                  {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite sports */}
        <div className="space-y-3">
          <h2 className="font-bold text-white flex items-center gap-2"><Star className="w-4 h-4 text-brand-400" />Favourite Sports</h2>
          <div className="space-y-2">
            {profile.favoritesSports.map((sportId) => {
              const sport = { football: '⚽ Football', basketball: '🏀 Basketball', tennis: '🎾 Tennis', cricket: '🏏 Cricket', esports: '🎮 Esports' }[sportId];
              return sport ? (
                <Link key={sportId} to={`/sports/${sportId}`} className="card p-3 flex items-center gap-3 hover:border-brand-500/50 transition-all">
                  <span className="text-lg">{sport.split(' ')[0]}</span>
                  <span className="text-sm font-medium text-slate-200">{sport.split(' ').slice(1).join(' ')}</span>
                  <TrendingUp className="w-3 h-3 text-brand-400 ml-auto" />
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Favorite matches */}
      {favMatches.length > 0 && (
        <div>
          <h2 className="font-bold text-white mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-brand-400" />Saved Matches</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {favMatches.map((m) => <MatchCard key={m.id} match={m} />)}
          </div>
        </div>
      )}
    </div>
  );
}
