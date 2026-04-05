import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { allMatches, leagues, sports as sportsData, matchResults } from '@/data/mockData';
import { MarketAccordion } from '@/components/sportsbook/MarketAccordion';
import { MatchCard } from '@/components/sportsbook/MatchCard';
import { EmptyState } from '@/components/common/EmptyState';
import { LiveBadge } from '@/components/common/Badge';
import { formatMatchDate, formatMatchTime, cn } from '@/utils';
import { ChevronLeft, Clock, BarChart2, Target, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = ['Overview', 'Odds', 'Statistics', 'H2H'];

export function MatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Odds');
  const match = allMatches.find((m) => m.id === id);

  if (!match) {
    return (
      <div className="p-8">
        <EmptyState icon="⚽" title="Match not found" description="This event doesn't exist or has been removed." action={<Link to="/sports" className="btn-primary">Browse Sports</Link>} />
      </div>
    );
  }

  const league = leagues.find((l) => l.id === match.leagueId);
  const sport = sportsData.find((s) => s.id === match.sportId);
  const matchName = `${match.homeTeam.name} vs ${match.awayTeam.name}`;
  const related = allMatches.filter((m) => m.leagueId === match.leagueId && m.id !== match.id).slice(0, 4);
  const h2hResults = matchResults.filter(
    (r) => (r.homeTeam.id === match.homeTeam.id || r.awayTeam.id === match.homeTeam.id) &&
            (r.homeTeam.id === match.awayTeam.id || r.awayTeam.id === match.awayTeam.id)
  );

  return (
    <div>
      {/* Event header */}
      <div className="bg-gradient-to-b from-bg-tertiary to-bg-primary border-b border-bg-border">
        <div className="p-4 lg:p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <Link to="/sports" className="hover:text-white flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Sports</Link>
            <span>/</span>
            <span>{sport?.name}</span>
            <span>/</span>
            <span>{league?.name}</span>
          </div>

          {/* Teams */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Home */}
            <div className="flex-1 text-right">
              <div className="w-16 h-16 bg-bg-elevated rounded-full ml-auto mb-2 flex items-center justify-center text-2xl font-bold text-white border-2 border-bg-border">
                {match.homeTeam.shortName[0]}
              </div>
              <p className="font-bold text-white text-lg">{match.homeTeam.name}</p>
              <p className="text-xs text-slate-500">{match.homeTeam.country}</p>
            </div>

            {/* Score/Time */}
            <div className="text-center flex-shrink-0">
              {match.status === 'live' && match.score ? (
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-black text-white">{match.score.home}</span>
                    <span className="text-slate-500 font-bold text-2xl">:</span>
                    <span className="text-5xl font-black text-white">{match.score.away}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <LiveBadge />
                    <span className="text-red-400 font-bold">{match.minute}'</span>
                    <span className="text-slate-500 text-sm">{match.score.period}</span>
                  </div>
                  {match.score.homeHT !== undefined && (
                    <p className="text-xs text-slate-600 mt-1">HT: {match.score.homeHT}-{match.score.awayHT}</p>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-4xl font-black text-slate-500">VS</p>
                  <div className="flex items-center justify-center gap-1.5 mt-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">{formatMatchTime(match.startTime)}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{formatMatchDate(match.startTime)}</p>
                </div>
              )}
              <p className="text-xs text-slate-500 mt-2">{league?.name}</p>
            </div>

            {/* Away */}
            <div className="flex-1">
              <div className="w-16 h-16 bg-bg-elevated rounded-full mr-auto mb-2 flex items-center justify-center text-2xl font-bold text-white border-2 border-bg-border">
                {match.awayTeam.shortName[0]}
              </div>
              <p className="font-bold text-white text-lg">{match.awayTeam.name}</p>
              <p className="text-xs text-slate-500">{match.awayTeam.country}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-bg-border px-4 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-5 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap',
                activeTab === tab
                  ? 'border-brand-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-white'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 lg:p-6 space-y-4">
        {/* Overview */}
        {activeTab === 'Overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: BarChart2, label: 'Markets', value: match.marketCount },
                { icon: Target, label: 'Status', value: match.status === 'live' ? '🔴 LIVE' : '⏱ Upcoming' },
                { icon: Users, label: 'Sport', value: sport?.name || '--' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="card p-4 text-center">
                  <Icon className="w-5 h-5 text-brand-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="font-bold text-white text-sm">{value}</p>
                </div>
              ))}
            </div>
            {/* Primary market preview */}
            {match.markets[0] && <MarketAccordion market={match.markets[0]} match={match} defaultOpen />}
          </div>
        )}

        {/* Odds */}
        {activeTab === 'Odds' && (
          <div className="space-y-3">
            {match.markets.map((market, i) => (
              <MarketAccordion key={market.id} market={market} match={match} defaultOpen={i === 0} />
            ))}
          </div>
        )}

        {/* Statistics */}
        {activeTab === 'Statistics' && match.stats ? (
          <div className="card p-5 space-y-4">
            <h3 className="font-bold text-white">Match Statistics</h3>
            {[
              { label: 'Possession', home: match.stats.possession?.home, away: match.stats.possession?.away, unit: '%' },
              { label: 'Shots', home: match.stats.shots?.home, away: match.stats.shots?.away },
              { label: 'Shots on Target', home: match.stats.shotsOnTarget?.home, away: match.stats.shotsOnTarget?.away },
              { label: 'Corners', home: match.stats.corners?.home, away: match.stats.corners?.away },
              { label: 'Yellow Cards', home: match.stats.yellowCards?.home, away: match.stats.yellowCards?.away },
            ].filter(row => row.home !== undefined).map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-semibold text-white">{row.home}{row.unit}</span>
                  <span className="text-slate-400 text-xs">{row.label}</span>
                  <span className="font-semibold text-white">{row.away}{row.unit}</span>
                </div>
                <div className="flex h-1.5 rounded-full overflow-hidden bg-bg-border gap-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(row.home! / (row.home! + row.away!)) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="bg-blue-500 h-full rounded-l-full"
                  />
                  <div className="flex-1 bg-orange-500 h-full rounded-r-full" />
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === 'Statistics' ? (
          <EmptyState icon="📊" title="No statistics yet" description="Statistics will be available once the match begins." />
        ) : null}

        {/* H2H */}
        {activeTab === 'H2H' && (
          <div className="space-y-3">
            <h3 className="font-bold text-white">Head to Head</h3>
            {h2hResults.length > 0 ? h2hResults.map((r) => (
              <div key={r.id} className="card p-4 flex items-center justify-between">
                <div className="text-sm font-medium text-white">{r.homeTeam.name}</div>
                <div className="text-center">
                  <span className="font-bold text-white">{r.scoreHome} - {r.scoreAway}</span>
                  <p className="text-xs text-slate-500">{formatMatchDate(r.date)}</p>
                </div>
                <div className="text-sm font-medium text-white text-right">{r.awayTeam.name}</div>
              </div>
            )) : (
              <EmptyState icon="🔄" title="No H2H data" description="No recent head-to-head matches found for these teams." />
            )}
          </div>
        )}

        {/* Related matches */}
        {related.length > 0 && (
          <div className="pt-4 border-t border-bg-border">
            <h3 className="font-bold text-white mb-3">More in {league?.name}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {related.map((m) => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
