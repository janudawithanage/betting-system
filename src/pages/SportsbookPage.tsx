import { useState, useMemo } from 'react';
import { allMatches, liveMatches, upcomingMatches } from '@/data/mockData';
import { MatchCard } from '@/components/sportsbook/MatchCard';
import { FilterBar } from '@/components/sportsbook/FilterBar';
import { SearchInput } from '@/components/common/SearchInput';
import { EmptyState } from '@/components/common/EmptyState';
import type { FilterState } from '@/types';

export function SportsbookPage() {
  const [filter, setFilter] = useState<FilterState>({
    sport: 'all',
    league: 'all',
    status: 'all',
    search: '',
  });

  const filtered = useMemo(() => {
    let matches = filter.status === 'live' ? liveMatches
      : filter.status === 'upcoming' ? upcomingMatches
      : allMatches;

    if (filter.sport !== 'all') {
      matches = matches.filter((m) => m.sportId === filter.sport);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      matches = matches.filter(
        (m) =>
          m.homeTeam.name.toLowerCase().includes(q) ||
          m.awayTeam.name.toLowerCase().includes(q)
      );
    }
    return matches;
  }, [filter]);

  const live = filtered.filter((m) => m.status === 'live');
  const upcoming = filtered.filter((m) => m.status === 'upcoming');

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <SearchInput
          value={filter.search}
          onChange={(v) => setFilter((f) => ({ ...f, search: v }))}
          className="w-full sm:w-72"
        />
        <FilterBar
          filter={filter}
          onChange={(updated) => setFilter((f) => ({ ...f, ...updated }))}
        />
      </div>

      {/* Live section */}
      {live.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="live-dot" />
            <h2 className="font-bold text-white">Live Events</h2>
            <span className="text-xs text-slate-500">({live.length})</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {live.map((m) => <MatchCard key={m.id} match={m} />)}
          </div>
        </section>
      )}

      {/* Upcoming section */}
      {upcoming.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-bold text-white">Upcoming</h2>
            <span className="text-xs text-slate-500">({upcoming.length})</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {upcoming.map((m) => <MatchCard key={m.id} match={m} />)}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <EmptyState
          icon="🔍"
          title="No events found"
          description="Try adjusting your filters or search term to find events."
        />
      )}
    </div>
  );
}
