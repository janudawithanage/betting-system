import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, Star } from 'lucide-react';
import type { Match } from '@/types';
import { leagues } from '@/data/mockData';
import { formatMatchTime, formatMatchDate, cn } from '@/utils';
import { OddsButton } from './OddsButton';
import { LiveBadge, HotBadge } from '@/components/common/Badge';
import { useAuthStore } from '@/store/authStore';

interface MatchCardProps {
  match: Match;
  compact?: boolean;
}

export function MatchCard({ match, compact = false }: MatchCardProps) {
  const league = leagues.find((l) => l.id === match.leagueId);
  const leagueName = league?.name || 'League';
  const { user, toggleFavoriteMatch } = useAuthStore();
  const isFav = user?.favoriteMatches.includes(match.id);
  const primaryMarket = match.markets[0];

  return (
    <motion.div
      whileHover={{ y: -1, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
      transition={{ duration: 0.15 }}
      className="card hover:border-bg-hover transition-all duration-200 overflow-hidden"
    >
      {/* League header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-bg-border bg-bg-tertiary/50">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs text-slate-500 font-medium">{league?.countryCode}</span>
          <span className="text-xs text-slate-400 font-medium truncate">{leagueName}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {match.isHot && <HotBadge />}
          {match.status === 'live' && <LiveBadge />}
          <button
            onClick={(e) => { e.preventDefault(); toggleFavoriteMatch(match.id); }}
            className={cn('p-1 rounded transition-colors', isFav ? 'text-brand-400' : 'text-slate-600 hover:text-brand-400')}
          >
            <Star className="w-3.5 h-3.5" fill={isFav ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Match body */}
      <div className="p-3">
        <div className="flex items-center gap-3">
          {/* Teams + Score */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded-full bg-bg-border flex items-center justify-center text-xs font-bold text-slate-400 flex-shrink-0">
                  {match.homeTeam.shortName[0]}
                </div>
                <span className={cn('text-sm font-semibold truncate', match.status === 'live' && match.score && match.score.home > match.score.away ? 'text-white' : 'text-slate-200')}>
                  {match.homeTeam.name}
                </span>
              </div>
              {match.score && (
                <span className={cn('text-base font-bold flex-shrink-0', match.score.home > match.score.away ? 'text-white' : 'text-slate-400')}>
                  {match.score.home}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded-full bg-bg-border flex items-center justify-center text-xs font-bold text-slate-400 flex-shrink-0">
                  {match.awayTeam.shortName[0]}
                </div>
                <span className={cn('text-sm font-semibold truncate', match.status === 'live' && match.score && match.score.away > match.score.home ? 'text-white' : 'text-slate-200')}>
                  {match.awayTeam.name}
                </span>
              </div>
              {match.score && (
                <span className={cn('text-base font-bold flex-shrink-0', match.score.away > match.score.home ? 'text-white' : 'text-slate-400')}>
                  {match.score.away}
                </span>
              )}
            </div>
          </div>

          {/* Time / Live status */}
          <div className="flex-shrink-0 text-center w-16">
            {match.status === 'live' ? (
              <div className="space-y-0.5">
                <div className="flex items-center justify-center gap-1">
                  <span className="live-dot" />
                  <span className="text-red-400 font-bold text-sm">{match.minute}'</span>
                </div>
                <span className="text-slate-500 text-xs">{match.score?.period}</span>
              </div>
            ) : (
              <div className="space-y-0.5">
                <div className="flex items-center justify-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs font-medium">{formatMatchTime(match.startTime)}</span>
                </div>
                <span className="text-slate-600 text-xs">{formatMatchDate(match.startTime)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Odds row */}
        {primaryMarket && !compact && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-1.5 flex-1">
              {primaryMarket.odds.map((odd) => (
                <OddsButton
                  key={odd.id}
                  odd={odd}
                  market={primaryMarket}
                  matchId={match.id}
                  matchName={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
                  leagueName={leagueName}
                  sport={match.sportId}
                  startTime={match.startTime}
                  compact
                />
              ))}
            </div>
            <Link
              to={`/match/${match.id}`}
              className="flex items-center gap-1 text-slate-500 hover:text-brand-400 text-xs transition-colors flex-shrink-0"
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
