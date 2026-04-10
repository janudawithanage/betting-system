import { MatchCard } from "@/components/sportsbook/MatchCard";
import { FilterBar } from "@/components/sportsbook/FilterBar";
import { SearchInput } from "@/components/common/SearchInput";
import { EmptyState } from "@/components/common/EmptyState";
import { getAllMatches } from "@/services/matchService";
import { useMatchFilters } from "@/hooks/useMatchFilters";

const allMatches = getAllMatches();

export function SportsbookPage() {
  const {
    filter,
    updateFilter,
    filteredMatches: filtered,
    liveMatches: live,
    upcomingMatches: upcoming,
  } = useMatchFilters(allMatches);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <SearchInput
          value={filter.search}
          onChange={(v) => updateFilter({ search: v })}
          className="w-full sm:w-72"
        />
        <FilterBar filter={filter} onChange={updateFilter} />
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
            {live.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
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
            {upcoming.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
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
