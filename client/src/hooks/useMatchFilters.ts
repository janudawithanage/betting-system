/**
 * useMatchFilters
 *
 * Reusable hook that encapsulates match list filtering logic.
 * Used by SportsbookPage and any future page that needs to filter a match list.
 */

import { useState, useMemo } from "react";
import type { Match, FilterState } from "@/types";

const DEFAULT_FILTER: FilterState = {
  sport: "all",
  league: "all",
  status: "all",
  search: "",
};

interface UseMatchFiltersResult {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: (partial: Partial<FilterState>) => void;
  resetFilter: () => void;
  filteredMatches: Match[];
  liveMatches: Match[];
  upcomingMatches: Match[];
}

export function useMatchFilters(matches: Match[]): UseMatchFiltersResult {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  const filteredMatches = useMemo(() => {
    let result = matches;

    if (filter.status !== "all") {
      result = result.filter((m) => m.status === filter.status);
    }

    if (filter.sport !== "all") {
      result = result.filter((m) => m.sportId === filter.sport);
    }

    if (filter.league !== "all") {
      result = result.filter((m) => m.leagueId === filter.league);
    }

    if (filter.search.trim()) {
      const query = filter.search.toLowerCase();
      result = result.filter(
        (m) =>
          m.homeTeam.name.toLowerCase().includes(query) ||
          m.awayTeam.name.toLowerCase().includes(query),
      );
    }

    return result;
  }, [matches, filter]);

  const liveMatches = useMemo(
    () => filteredMatches.filter((m) => m.status === "live"),
    [filteredMatches],
  );

  const upcomingMatches = useMemo(
    () => filteredMatches.filter((m) => m.status === "upcoming"),
    [filteredMatches],
  );

  const updateFilter = (partial: Partial<FilterState>) =>
    setFilter((prev) => ({ ...prev, ...partial }));

  const resetFilter = () => setFilter(DEFAULT_FILTER);

  return {
    filter,
    setFilter,
    updateFilter,
    resetFilter,
    filteredMatches,
    liveMatches,
    upcomingMatches,
  };
}
