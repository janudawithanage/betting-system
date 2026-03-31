// ===== CORE TYPES =====

export interface Sport {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  isPopular?: boolean;
}

export interface League {
  id: string;
  name: string;
  slug: string;
  sportId: string;
  country: string;
  countryCode: string;
  logo?: string;
  featured?: boolean;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  country: string;
}

export type MatchStatus = 'live' | 'upcoming' | 'finished' | 'postponed' | 'cancelled';

export interface MatchScore {
  home: number;
  away: number;
  period?: string;
  homeHT?: number;
  awayHT?: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  leagueId: string;
  sportId: string;
  startTime: string;
  status: MatchStatus;
  score?: MatchScore;
  minute?: number;
  period?: string;
  markets: OddsMarket[];
  marketCount: number;
  isHot?: boolean;
  stats?: MatchStats;
}

export interface MatchStats {
  possession?: { home: number; away: number };
  shots?: { home: number; away: number };
  shotsOnTarget?: { home: number; away: number };
  corners?: { home: number; away: number };
  yellowCards?: { home: number; away: number };
  redCards?: { home: number; away: number };
}

export type OddsFormat = 'decimal' | 'fractional' | 'american';

export interface Odd {
  id: string;
  label: string;
  value: number;
  isActive?: boolean;
  trend?: 'up' | 'down' | 'stable';
}

export interface OddsMarket {
  id: string;
  type: MarketType;
  name: string;
  odds: Odd[];
  isOpen: boolean;
}

export type MarketType =
  | '1x2'
  | 'both_teams_to_score'
  | 'over_under'
  | 'handicap'
  | 'correct_score'
  | 'draw_no_bet'
  | 'double_chance'
  | 'first_goalscorer'
  | 'anytime_goalscorer'
  | 'result_both_teams_score';

// ===== BET SLIP TYPES =====

export interface BetSelection {
  id: string;
  matchId: string;
  matchName: string;
  marketType: string;
  marketName: string;
  oddLabel: string;
  oddValue: number;
  sport: string;
  leagueName: string;
  startTime: string;
}

export type BetMode = 'single' | 'multi';

// ===== USER TYPES =====

export interface MockUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  balance: number;
  currency: string;
  country: string;
  joinedAt: string;
  level: 'standard' | 'silver' | 'gold' | 'vip';
  verified: boolean;
  favoritesSports: string[];
  favoriteMatches: string[];
}

// ===== PROMOTION TYPES =====

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  color: string;
  expiresAt: string;
  terms: string;
  icon: string;
  cta: string;
}

// ===== TRANSACTION TYPES =====

export type TransactionType = 'deposit' | 'withdrawal' | 'bet_placed' | 'bet_won' | 'bonus';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  description: string;
  createdAt: string;
  reference: string;
}

// ===== NOTIFICATION TYPES =====

export type NotificationType = 'info' | 'success' | 'warning' | 'promo' | 'result';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

// ===== RESULTS TYPES =====

export interface MatchResult {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  leagueId: string;
  sportId: string;
  date: string;
  scoreHome: number;
  scoreAway: number;
  scoreHomeHT?: number;
  scoreAwayHT?: number;
  status: 'finished';
}

// ===== UI TYPES =====

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

export interface FilterState {
  sport: string;
  league: string;
  status: 'all' | 'live' | 'upcoming';
  search: string;
}
