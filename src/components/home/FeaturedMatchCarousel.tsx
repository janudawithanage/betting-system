import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Zap } from 'lucide-react';
import { liveMatches, upcomingMatches } from '@/data/mockData';
import { formatMatchTime } from '@/utils';
import { OddsButton } from '@/components/sportsbook/OddsButton';
import { leagues } from '@/data/mockData';

const featured = [...liveMatches.slice(0, 2), ...upcomingMatches.slice(0, 2)];

const gradients = [
  'from-violet-900/80 via-blue-900/60 to-bg-primary',
  'from-red-900/80 via-orange-900/60 to-bg-primary',
  'from-emerald-900/80 via-teal-900/60 to-bg-primary',
  'from-blue-900/80 via-indigo-900/60 to-bg-primary',
];

export function FeaturedMatchCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % featured.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const match = featured[current];
  const league = leagues.find((l) => l.id === match.leagueId);

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-bg-card min-h-[220px]"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Background gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-r ${gradients[current]}`}
        />
      </AnimatePresence>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl translate-y-1/2" />

      <div className="relative p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {/* League info */}
            <div className="flex items-center gap-2 mb-5">
              {match.status === 'live' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500 rounded-full text-xs font-bold text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-white/10 rounded-full text-xs font-medium text-white/80">
                  <Zap className="w-3 h-3 inline mr-1" />
                  UPCOMING
                </span>
              )}
              <span className="text-sm text-white/70 font-medium">{league?.name}</span>
              <span className="text-white/40">•</span>
              <span className="text-sm text-white/70">
                {match.status === 'live' ? `${match.minute}'` : formatMatchTime(match.startTime)}
              </span>
            </div>

            {/* Teams + Score */}
            <div className="flex items-center gap-6 mb-5">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white">
                    {match.homeTeam.shortName[0]}
                  </div>
                  <span className="text-xl lg:text-2xl font-bold text-white">{match.homeTeam.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white">
                    {match.awayTeam.shortName[0]}
                  </div>
                  <span className="text-xl lg:text-2xl font-bold text-white/80">{match.awayTeam.name}</span>
                </div>
              </div>
              {match.score && (
                <div className="text-center">
                  <div className="text-5xl font-black text-white tabular-nums">
                    {match.score.home}
                    <span className="text-white/40 mx-2">:</span>
                    {match.score.away}
                  </div>
                  {match.score.homeHT !== undefined && (
                    <div className="text-xs text-white/50 mt-1">
                      HT: {match.score.homeHT}-{match.score.awayHT}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Odds */}
            {match.markets[0] && (
              <div className="flex items-center gap-3 flex-wrap">
                {match.markets[0].odds.map((odd) => (
                  <OddsButton
                    key={odd.id}
                    odd={odd}
                    market={match.markets[0]}
                    matchId={match.id}
                    matchName={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
                    leagueName={league?.name || ''}
                    sport={match.sportId}
                    startTime={match.startTime}
                  />
                ))}
                <Link to={`/match/${match.id}`} className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors ml-2">
                  All markets <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute right-4 bottom-4 flex items-center gap-2">
        <button onClick={() => setCurrent((c) => (c - 1 + featured.length) % featured.length)}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <div className="flex gap-1">
          {featured.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-brand-500' : 'w-1.5 bg-white/30'}`} />
          ))}
        </div>
        <button onClick={() => setCurrent((c) => (c + 1) % featured.length)}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
