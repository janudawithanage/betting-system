import { useState, useMemo } from 'react';
import { matchResults, leagues, sports as sportsData } from '@/data/mockData';
import { formatMatchDate, cn } from '@/utils';
import { SearchInput } from '@/components/common/SearchInput';
import { EmptyState } from '@/components/common/EmptyState';
import { Trophy } from 'lucide-react';

const dateFilters = ['Today', 'Yesterday', 'Last 3 days', 'This week'];

export function ResultsPage() {
  const [search, setSearch] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('Last 3 days');

  const filtered = useMemo(() => {
    let results = [...matchResults];
    if (sportFilter !== 'all') {
      results = results.filter((r) => r.sportId === sportFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (r) => r.homeTeam.name.toLowerCase().includes(q) || r.awayTeam.name.toLowerCase().includes(q)
      );
    }
    return results;
  }, [search, sportFilter]);

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Trophy className="w-8 h-8 text-brand-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Results</h1>
          <p className="text-sm text-slate-400">Recent match results across all sports</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search teams..." className="sm:w-64" />

        <div className="flex gap-1 bg-bg-elevated rounded-lg p-1">
          {dateFilters.map((f) => (
            <button key={f} onClick={() => setDateFilter(f)}
              className={cn('px-3 py-1.5 rounded-md text-xs font-medium transition-all', dateFilter === f ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white')}>
              {f}
            </button>
          ))}
        </div>

        <select
          value={sportFilter}
          onChange={(e) => setSportFilter(e.target.value)}
          className="bg-bg-elevated border border-bg-border rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
        >
          <option value="all">All Sports</option>
          {sportsData.map((s) => <option key={s.id} value={s.id}>{s.icon} {s.name}</option>)}
        </select>
      </div>

      {/* Results table */}
      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((result) => {
            const league = leagues.find((l) => l.id === result.leagueId);
            const homeWon = result.scoreHome > result.scoreAway;
            const awayWon = result.scoreAway > result.scoreHome;

            return (
              <div key={result.id} className="card p-4 hover:border-bg-hover transition-all">
                {/* League */}
                <p className="text-xs text-slate-500 mb-3">{league?.name} • {formatMatchDate(result.date)}</p>

                <div className="flex items-center gap-4">
                  {/* Home */}
                  <div className={cn('flex-1 text-right', homeWon ? 'text-white font-bold' : 'text-slate-400')}>
                    <p className="text-sm">{result.homeTeam.name}</p>
                  </div>

                  {/* Score */}
                  <div className="flex-shrink-0 text-center">
                    <div className="flex items-center gap-2">
                      <span className={cn('text-2xl font-black tabular-nums', homeWon ? 'text-white' : 'text-slate-400')}>
                        {result.scoreHome}
                      </span>
                      <span className="text-slate-600 font-medium">-</span>
                      <span className={cn('text-2xl font-black tabular-nums', awayWon ? 'text-white' : 'text-slate-400')}>
                        {result.scoreAway}
                      </span>
                    </div>
                    {result.scoreHomeHT !== undefined && (
                      <p className="text-xs text-slate-600 mt-0.5">HT: {result.scoreHomeHT}-{result.scoreAwayHT}</p>
                    )}
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">FT</span>
                  </div>

                  {/* Away */}
                  <div className={cn('flex-1', awayWon ? 'text-white font-bold' : 'text-slate-400')}>
                    <p className="text-sm">{result.awayTeam.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon="🏆" title="No results found" description="Try expanding your filters or search term." />
      )}
    </div>
  );
}
