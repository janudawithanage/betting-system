import { motion } from 'framer-motion';
import { Activity, Zap } from 'lucide-react';
import { LiveMatchCard } from '@/components/sportsbook/LiveMatchCard';
import { getLiveMatches } from '@/services/matchService';

const liveMatches = getLiveMatches();
import { EmptyState } from '@/components/common/EmptyState';

export function LivePage() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
          <Activity className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Live Betting</h1>
          <p className="text-sm text-slate-400">{liveMatches.length} events in play right now</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm font-bold">
          <span className="live-dot" />
          LIVE
        </span>
      </div>

      {/* Pinned animated header */}
      <div className="card p-4 flex items-center gap-4 bg-gradient-to-r from-red-500/10 to-bg-card border-red-500/20">
        <Zap className="w-6 h-6 text-brand-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-white">Live Bet Guarantee</p>
          <p className="text-xs text-slate-400">Place live bets with the lowest latency on all markets. Odds update in real-time.</p>
        </div>
        <div className="ml-auto text-right flex-shrink-0">
          <p className="text-xs text-slate-500">Cash Out</p>
          <p className="text-sm font-bold text-green-400">Available</p>
        </div>
      </div>

      {/* Market tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {['All Sports', '⚽ Football', '🏀 Basketball', '🏏 Cricket', '🎾 Tennis'].map((tab, i) => (
          <button
            key={tab}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${i === 0 ? 'bg-brand-500 text-white' : 'bg-bg-elevated text-slate-400 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {liveMatches.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {liveMatches.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <LiveMatchCard match={match} />
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="⚡"
          title="No live events right now"
          description="Check back soon or browse upcoming matches."
        />
      )}
    </div>
  );
}
