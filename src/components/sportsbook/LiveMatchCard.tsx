import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Activity } from 'lucide-react';
import type { Match } from '@/types';
import { leagues } from '@/data/mockData';
import { OddsButton } from './OddsButton';
import { LiveBadge } from '@/components/common/Badge';
import { cn } from '@/utils';

interface LiveMatchCardProps {
  match: Match;
}

export function LiveMatchCard({ match }: LiveMatchCardProps) {
  const league = leagues.find((l) => l.id === match.leagueId);
  const leagueName = league?.name || '';
  const primaryMarket = match.markets[0];
  const matchName = `${match.homeTeam.name} vs ${match.awayTeam.name}`;

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      className="card border-l-2 border-l-red-500 overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-red-500/5 border-b border-bg-border">
        <div className="flex items-center gap-2">
          <LiveBadge />
          <span className="text-xs text-slate-400">{leagueName}</span>
        </div>
        <div className="flex items-center gap-1.5 text-red-400">
          <Activity className="w-3.5 h-3.5" />
          <span className="text-xs font-bold">{match.minute}'</span>
          <span className="text-xs text-slate-500">{match.score?.period}</span>
        </div>
      </div>

      <div className="p-3">
        {/* Scoreboard */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex-1 space-y-2">
            <TeamRow
              name={match.homeTeam.name}
              score={match.score?.home ?? 0}
              isWinning={(match.score?.home ?? 0) > (match.score?.away ?? 0)}
            />
            <TeamRow
              name={match.awayTeam.name}
              score={match.score?.away ?? 0}
              isWinning={(match.score?.away ?? 0) > (match.score?.home ?? 0)}
            />
          </div>
        </div>

        {/* Stats if available */}
        {match.stats?.possession && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>{match.stats.possession.home}%</span>
              <span>Possession</span>
              <span>{match.stats.possession.away}%</span>
            </div>
            <div className="flex h-1.5 rounded-full overflow-hidden bg-bg-border">
              <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${match.stats.possession.home}%` }} />
              <div className="bg-orange-500 h-full rounded-full flex-1" />
            </div>
          </div>
        )}

        {/* Odds */}
        {primaryMarket && (
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 flex-1">
              {primaryMarket.odds.map((odd) => (
                <OddsButton
                  key={odd.id}
                  odd={odd}
                  market={primaryMarket}
                  matchId={match.id}
                  matchName={matchName}
                  leagueName={leagueName}
                  sport={match.sportId}
                  startTime={match.startTime}
                  compact
                />
              ))}
            </div>
            <Link
              to={`/match/${match.id}`}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-bg-elevated text-slate-400 hover:text-brand-400 text-xs transition-colors"
            >
              +{match.marketCount}
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TeamRow({ name, score, isWinning }: { name: string; score: number; isWinning: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={cn('text-sm font-semibold truncate flex-1', isWinning ? 'text-white' : 'text-slate-400')}>
        {name}
      </span>
      <span className={cn('text-xl font-bold tabular-nums ml-4', isWinning ? 'text-white' : 'text-slate-500')}>
        {score}
      </span>
    </div>
  );
}
