/**
 * Match Service
 *
 * Provides all match and sport-related data to the UI layer.
 *
 * CURRENT BEHAVIOUR  — all functions return data from the local mock file
 *   (`src/data/mockData.ts`).  This keeps the app fully functional without a backend.
 *
 * MIGRATION PATH — when the backend is ready, replace each function body marked
 *   with a "TODO: API" comment.  The rest of the codebase does not need to change
 *   because components only import from this module, not from mockData directly.
 *
 * Example migration for getLiveMatches:
 *   import { apiClient } from './apiClient';
 *   export async function getLiveMatches() {
 *     const { data } = await apiClient.get<Match[]>('/matches/live');
 *     return data;
 *   }
 */

import type { Match, MatchResult, Sport, League } from "@/types";
import {
  liveMatches,
  upcomingMatches,
  allMatches,
  matchResults,
  sports,
  leagues,
} from "@/data/mockData";

// ─── Matches ─────────────────────────────────────────────────────────────────

/** Returns all currently live matches.
 *  TODO: API → GET /api/matches/live */
export function getLiveMatches(): Match[] {
  return liveMatches;
}

/** Returns all upcoming (pre-match) events.
 *  TODO: API → GET /api/matches/upcoming */
export function getUpcomingMatches(): Match[] {
  return upcomingMatches;
}

/** Returns live + upcoming matches combined.
 *  TODO: API → GET /api/matches */
export function getAllMatches(): Match[] {
  return allMatches;
}

/** Returns a single match by ID, or undefined if not found.
 *  TODO: API → GET /api/matches/:id */
export function getMatchById(id: string): Match | undefined {
  return allMatches.find((m) => m.id === id);
}

/** Returns matches filtered to a specific sport slug.
 *  TODO: API → GET /api/matches?sport=:slug */
export function getMatchesBySport(sportSlug: string): Match[] {
  const sport = sports.find((s) => s.slug === sportSlug);
  if (!sport) return [];
  return allMatches.filter((m) => m.sportId === sport.id);
}

// ─── Results ─────────────────────────────────────────────────────────────────

/** Returns completed match results.
 *  TODO: API → GET /api/results */
export function getMatchResults(): MatchResult[] {
  return matchResults;
}

// ─── Sports & Leagues ────────────────────────────────────────────────────────

/** Returns the full sports catalogue.
 *  TODO: API → GET /api/sports */
export function getSports(): Sport[] {
  return sports;
}

/** Returns all leagues, optionally filtered by sport ID.
 *  TODO: API → GET /api/leagues?sportId=:id */
export function getLeagues(sportId?: string): League[] {
  return sportId ? leagues.filter((l) => l.sportId === sportId) : leagues;
}

/** Returns a single sport by slug.
 *  TODO: API → GET /api/sports/:slug */
export function getSportBySlug(slug: string): Sport | undefined {
  return sports.find((s) => s.slug === slug);
}
