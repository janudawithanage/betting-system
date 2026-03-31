import type { Sport, League, Team, Match, MatchResult, Promotion, Transaction, Notification, MockUser } from '@/types';

// ===== SPORTS =====
export const sports: Sport[] = [
  { id: 'football', name: 'Football', slug: 'football', icon: '⚽', count: 342, isPopular: true },
  { id: 'cricket', name: 'Cricket', slug: 'cricket', icon: '🏏', count: 87, isPopular: true },
  { id: 'basketball', name: 'Basketball', slug: 'basketball', icon: '🏀', count: 124, isPopular: true },
  { id: 'tennis', name: 'Tennis', slug: 'tennis', icon: '🎾', count: 68 },
  { id: 'esports', name: 'Esports', slug: 'esports', icon: '🎮', count: 45, isPopular: true },
  { id: 'baseball', name: 'Baseball', slug: 'baseball', icon: '⚾', count: 37 },
  { id: 'ice-hockey', name: 'Ice Hockey', slug: 'ice-hockey', icon: '🏒', count: 52 },
  { id: 'mma', name: 'MMA', slug: 'mma', icon: '🥊', count: 23 },
  { id: 'boxing', name: 'Boxing', slug: 'boxing', icon: '🥋', count: 18 },
  { id: 'virtual', name: 'Virtual Sports', slug: 'virtual', icon: '🕹️', count: 96 },
  { id: 'rugby', name: 'Rugby', slug: 'rugby', icon: '🏉', count: 41 },
  { id: 'american-football', name: 'American Football', slug: 'american-football', icon: '🏈', count: 29 },
];

// ===== LEAGUES =====
export const leagues: League[] = [
  { id: 'epl', name: 'Premier League', slug: 'premier-league', sportId: 'football', country: 'England', countryCode: 'GB', featured: true },
  { id: 'laliga', name: 'La Liga', slug: 'la-liga', sportId: 'football', country: 'Spain', countryCode: 'ES', featured: true },
  { id: 'bundesliga', name: 'Bundesliga', slug: 'bundesliga', sportId: 'football', country: 'Germany', countryCode: 'DE', featured: true },
  { id: 'seriea', name: 'Serie A', slug: 'serie-a', sportId: 'football', country: 'Italy', countryCode: 'IT', featured: true },
  { id: 'ligue1', name: 'Ligue 1', slug: 'ligue-1', sportId: 'football', country: 'France', countryCode: 'FR' },
  { id: 'ucl', name: 'UEFA Champions League', slug: 'champions-league', sportId: 'football', country: 'Europe', countryCode: 'EU', featured: true },
  { id: 'uel', name: 'UEFA Europa League', slug: 'europa-league', sportId: 'football', country: 'Europe', countryCode: 'EU' },
  { id: 'nba', name: 'NBA', slug: 'nba', sportId: 'basketball', country: 'USA', countryCode: 'US', featured: true },
  { id: 'euroleague', name: 'EuroLeague', slug: 'euroleague', sportId: 'basketball', country: 'Europe', countryCode: 'EU' },
  { id: 'atp', name: 'ATP Tour', slug: 'atp', sportId: 'tennis', country: 'International', countryCode: 'INT', featured: true },
  { id: 'wta', name: 'WTA Tour', slug: 'wta', sportId: 'tennis', country: 'International', countryCode: 'INT' },
  { id: 'ipl', name: 'Indian Premier League', slug: 'ipl', sportId: 'cricket', country: 'India', countryCode: 'IN', featured: true },
  { id: 'ashes', name: 'The Ashes', slug: 'ashes', sportId: 'cricket', country: 'International', countryCode: 'INT' },
  { id: 'lol-worlds', name: 'LoL World Championship', slug: 'lol-worlds', sportId: 'esports', country: 'International', countryCode: 'INT', featured: true },
  { id: 'csgo-major', name: 'CS2 Major', slug: 'cs2-major', sportId: 'esports', country: 'International', countryCode: 'INT' },
  { id: 'nhl', name: 'NHL', slug: 'nhl', sportId: 'ice-hockey', country: 'USA/Canada', countryCode: 'NA', featured: true },
  { id: 'ufc', name: 'UFC', slug: 'ufc', sportId: 'mma', country: 'International', countryCode: 'INT', featured: true },
  { id: 'mlb', name: 'MLB', slug: 'mlb', sportId: 'baseball', country: 'USA', countryCode: 'US', featured: true },
];

// ===== TEAMS =====
export const teams: Team[] = [
  { id: 'man-city', name: 'Manchester City', shortName: 'MCI', country: 'England' },
  { id: 'arsenal', name: 'Arsenal', shortName: 'ARS', country: 'England' },
  { id: 'liverpool', name: 'Liverpool', shortName: 'LIV', country: 'England' },
  { id: 'chelsea', name: 'Chelsea', shortName: 'CHE', country: 'England' },
  { id: 'man-utd', name: 'Manchester United', shortName: 'MUN', country: 'England' },
  { id: 'tottenham', name: 'Tottenham Hotspur', shortName: 'TOT', country: 'England' },
  { id: 'real-madrid', name: 'Real Madrid', shortName: 'RMA', country: 'Spain' },
  { id: 'barcelona', name: 'FC Barcelona', shortName: 'BAR', country: 'Spain' },
  { id: 'atletico', name: 'Atlético Madrid', shortName: 'ATM', country: 'Spain' },
  { id: 'juventus', name: 'Juventus', shortName: 'JUV', country: 'Italy' },
  { id: 'inter', name: 'Inter Milan', shortName: 'INT', country: 'Italy' },
  { id: 'ac-milan', name: 'AC Milan', shortName: 'ACM', country: 'Italy' },
  { id: 'psg', name: 'Paris Saint-Germain', shortName: 'PSG', country: 'France' },
  { id: 'monaco', name: 'AS Monaco', shortName: 'MON', country: 'France' },
  { id: 'bayern', name: 'Bayern Munich', shortName: 'BAY', country: 'Germany' },
  { id: 'dortmund', name: 'Borussia Dortmund', shortName: 'BVB', country: 'Germany' },
  { id: 'lakers', name: 'LA Lakers', shortName: 'LAL', country: 'USA' },
  { id: 'warriors', name: 'Golden State Warriors', shortName: 'GSW', country: 'USA' },
  { id: 'celtics', name: 'Boston Celtics', shortName: 'BOS', country: 'USA' },
  { id: 'heat', name: 'Miami Heat', shortName: 'MIA', country: 'USA' },
  { id: 'india-cricket', name: 'India', shortName: 'IND', country: 'India' },
  { id: 'australia-cricket', name: 'Australia', shortName: 'AUS', country: 'Australia' },
  { id: 'england-cricket', name: 'England', shortName: 'ENG', country: 'England' },
  { id: 'pakistan-cricket', name: 'Pakistan', shortName: 'PAK', country: 'Pakistan' },
  { id: 'djokovic', name: 'N. Djokovic', shortName: 'DJO', country: 'Serbia' },
  { id: 'alcaraz', name: 'C. Alcaraz', shortName: 'ALC', country: 'Spain' },
  { id: 'sinner', name: 'J. Sinner', shortName: 'SIN', country: 'Italy' },
  { id: 'medvedev', name: 'D. Medvedev', shortName: 'MED', country: 'Russia' },
];

const getTeam = (id: string): Team => teams.find(t => t.id === id) || teams[0];

// ===== HELPER: generate odds =====
function makeMarket(type: '1x2' | 'over_under' | 'both_teams_to_score' | 'handicap' | 'double_chance', homeVal: number, drawVal?: number, awayVal?: number) {
  if (type === '1x2') {
    const odds = [
      { id: 'h', label: '1', value: homeVal, trend: 'stable' as const },
      ...(drawVal !== undefined ? [{ id: 'd', label: 'X', value: drawVal, trend: 'stable' as const }] : []),
      ...(awayVal !== undefined ? [{ id: 'a', label: '2', value: awayVal, trend: 'stable' as const }] : []),
    ];
    return {
      id: `${type}-${Math.random().toString(36).substr(2, 6)}`,
      type: '1x2' as const,
      name: 'Match Result',
      isOpen: true,
      odds,
    };
  }
  if (type === 'over_under') {
    return {
      id: `${type}-${Math.random().toString(36).substr(2, 6)}`,
      type: 'over_under' as const,
      name: 'Over/Under 2.5',
      isOpen: true,
      odds: [
        { id: 'over', label: 'Over 2.5', value: homeVal, trend: 'up' as const },
        { id: 'under', label: 'Under 2.5', value: awayVal!, trend: 'down' as const },
      ],
    };
  }
  if (type === 'both_teams_to_score') {
    return {
      id: `${type}-${Math.random().toString(36).substr(2, 6)}`,
      type: 'both_teams_to_score' as const,
      name: 'Both Teams to Score',
      isOpen: true,
      odds: [
        { id: 'yes', label: 'Yes', value: homeVal, trend: 'stable' as const },
        { id: 'no', label: 'No', value: awayVal!, trend: 'stable' as const },
      ],
    };
  }
  if (type === 'double_chance') {
    const odds = [
      { id: '1x', label: '1X', value: homeVal, trend: 'stable' as const },
      ...(drawVal !== undefined ? [{ id: '12', label: '12', value: drawVal, trend: 'stable' as const }] : []),
      ...(awayVal !== undefined ? [{ id: 'x2', label: 'X2', value: awayVal, trend: 'stable' as const }] : []),
    ];
    return {
      id: `${type}-${Math.random().toString(36).substr(2, 6)}`,
      type: 'double_chance' as const,
      name: 'Double Chance',
      isOpen: true,
      odds,
    };
  }
  return {
    id: `${type}-${Math.random().toString(36).substr(2, 6)}`,
    type: 'handicap' as const,
    name: 'Asian Handicap',
    isOpen: true,
    odds: [
      { id: 'h-hc', label: `${getTeam('').shortName} -1`, value: homeVal, trend: 'stable' as const },
      { id: 'a-hc', label: `${getTeam('').shortName} +1`, value: awayVal!, trend: 'stable' as const },
    ],
  };
}

// ===== MATCHES: LIVE =====
export const liveMatches: Match[] = [
  {
    id: 'live-1',
    homeTeam: getTeam('arsenal'),
    awayTeam: getTeam('man-city'),
    leagueId: 'epl',
    sportId: 'football',
    startTime: new Date(Date.now() - 47 * 60000).toISOString(),
    status: 'live',
    score: { home: 2, away: 1, homeHT: 1, awayHT: 0, period: '2nd Half' },
    minute: 67,
    marketCount: 48,
    isHot: true,
    markets: [
      makeMarket('1x2', 2.60, 3.40, 2.80),
      makeMarket('over_under', 1.72, undefined, 2.10),
      makeMarket('both_teams_to_score', 1.55, undefined, 2.35),
      makeMarket('double_chance', 1.45, 1.25, 1.65),
    ],
    stats: { possession: { home: 48, away: 52 }, shots: { home: 12, away: 15 }, shotsOnTarget: { home: 5, away: 7 }, corners: { home: 4, away: 6 }, yellowCards: { home: 2, away: 1 }, redCards: { home: 0, away: 0 } },
  },
  {
    id: 'live-2',
    homeTeam: getTeam('real-madrid'),
    awayTeam: getTeam('barcelona'),
    leagueId: 'laliga',
    sportId: 'football',
    startTime: new Date(Date.now() - 32 * 60000).toISOString(),
    status: 'live',
    score: { home: 1, away: 1, homeHT: 1, awayHT: 1, period: '2nd Half' },
    minute: 52,
    marketCount: 62,
    isHot: true,
    markets: [
      makeMarket('1x2', 2.20, 3.50, 3.10),
      makeMarket('over_under', 1.95, undefined, 1.85),
      makeMarket('both_teams_to_score', 1.40, undefined, 2.75),
      makeMarket('double_chance', 1.30, 1.15, 1.55),
    ],
    stats: { possession: { home: 55, away: 45 }, shots: { home: 18, away: 14 }, shotsOnTarget: { home: 7, away: 6 }, corners: { home: 8, away: 5 }, yellowCards: { home: 1, away: 3 }, redCards: { home: 0, away: 0 } },
  },
  {
    id: 'live-3',
    homeTeam: getTeam('lakers'),
    awayTeam: getTeam('celtics'),
    leagueId: 'nba',
    sportId: 'basketball',
    startTime: new Date(Date.now() - 58 * 60000).toISOString(),
    status: 'live',
    score: { home: 89, away: 94, period: 'Q3' },
    minute: 8,
    marketCount: 34,
    markets: [
      makeMarket('1x2', 2.40, undefined, 1.60),
      makeMarket('over_under', 1.91, undefined, 1.91),
    ],
    stats: { possession: { home: 44, away: 56 }, shots: { home: 0, away: 0 } },
  },
  {
    id: 'live-4',
    homeTeam: getTeam('india-cricket'),
    awayTeam: getTeam('australia-cricket'),
    leagueId: 'ipl',
    sportId: 'cricket',
    startTime: new Date(Date.now() - 120 * 60000).toISOString(),
    status: 'live',
    score: { home: 186, away: 142, period: '2nd Innings' },
    minute: 32,
    marketCount: 28,
    markets: [
      makeMarket('1x2', 1.45, undefined, 2.65),
      makeMarket('over_under', 1.85, undefined, 1.95),
    ],
  },
  {
    id: 'live-5',
    homeTeam: getTeam('djokovic'),
    awayTeam: getTeam('alcaraz'),
    leagueId: 'atp',
    sportId: 'tennis',
    startTime: new Date(Date.now() - 85 * 60000).toISOString(),
    status: 'live',
    score: { home: 1, away: 2, period: 'Set 3' },
    minute: 0,
    marketCount: 22,
    markets: [
      makeMarket('1x2', 2.10, undefined, 1.75),
      makeMarket('over_under', 1.80, undefined, 2.00),
    ],
  },
  {
    id: 'live-6',
    homeTeam: getTeam('psg'),
    awayTeam: getTeam('inter'),
    leagueId: 'ucl',
    sportId: 'football',
    startTime: new Date(Date.now() - 15 * 60000).toISOString(),
    status: 'live',
    score: { home: 0, away: 0, period: '1st Half' },
    minute: 15,
    marketCount: 55,
    markets: [
      makeMarket('1x2', 1.95, 3.60, 3.80),
      makeMarket('over_under', 1.90, undefined, 1.90),
      makeMarket('both_teams_to_score', 1.70, undefined, 2.10),
    ],
  },
];

// ===== MATCHES: UPCOMING =====
export const upcomingMatches: Match[] = [
  {
    id: 'up-1',
    homeTeam: getTeam('liverpool'),
    awayTeam: getTeam('chelsea'),
    leagueId: 'epl',
    sportId: 'football',
    startTime: new Date(Date.now() + 2 * 3600000).toISOString(),
    status: 'upcoming',
    marketCount: 89,
    isHot: true,
    markets: [
      makeMarket('1x2', 2.05, 3.50, 3.70),
      makeMarket('over_under', 1.85, undefined, 1.95),
      makeMarket('both_teams_to_score', 1.62, undefined, 2.25),
      makeMarket('double_chance', 1.28, 1.22, 1.75),
    ],
  },
  {
    id: 'up-2',
    homeTeam: getTeam('bayern'),
    awayTeam: getTeam('dortmund'),
    leagueId: 'bundesliga',
    sportId: 'football',
    startTime: new Date(Date.now() + 4 * 3600000).toISOString(),
    status: 'upcoming',
    marketCount: 76,
    markets: [
      makeMarket('1x2', 1.55, 4.20, 6.00),
      makeMarket('over_under', 1.75, undefined, 2.05),
      makeMarket('both_teams_to_score', 1.58, undefined, 2.30),
    ],
  },
  {
    id: 'up-3',
    homeTeam: getTeam('atletico'),
    awayTeam: getTeam('juventus'),
    leagueId: 'ucl',
    sportId: 'football',
    startTime: new Date(Date.now() + 6 * 3600000).toISOString(),
    status: 'upcoming',
    marketCount: 65,
    markets: [
      makeMarket('1x2', 2.30, 3.20, 3.10),
      makeMarket('over_under', 2.10, undefined, 1.70),
    ],
  },
  {
    id: 'up-4',
    homeTeam: getTeam('warriors'),
    awayTeam: getTeam('heat'),
    leagueId: 'nba',
    sportId: 'basketball',
    startTime: new Date(Date.now() + 8 * 3600000).toISOString(),
    status: 'upcoming',
    marketCount: 42,
    markets: [
      makeMarket('1x2', 1.70, undefined, 2.15),
      makeMarket('over_under', 1.91, undefined, 1.91),
    ],
  },
  {
    id: 'up-5',
    homeTeam: getTeam('sinner'),
    awayTeam: getTeam('medvedev'),
    leagueId: 'atp',
    sportId: 'tennis',
    startTime: new Date(Date.now() + 3 * 3600000).toISOString(),
    status: 'upcoming',
    marketCount: 31,
    markets: [
      makeMarket('1x2', 1.60, undefined, 2.35),
      makeMarket('over_under', 1.85, undefined, 1.95),
    ],
  },
  {
    id: 'up-6',
    homeTeam: getTeam('man-utd'),
    awayTeam: getTeam('tottenham'),
    leagueId: 'epl',
    sportId: 'football',
    startTime: new Date(Date.now() + 1 * 3600000).toISOString(),
    status: 'upcoming',
    marketCount: 92,
    isHot: true,
    markets: [
      makeMarket('1x2', 2.80, 3.40, 2.50),
      makeMarket('over_under', 1.80, undefined, 2.00),
      makeMarket('both_teams_to_score', 1.70, undefined, 2.10),
    ],
  },
  {
    id: 'up-7',
    homeTeam: getTeam('england-cricket'),
    awayTeam: getTeam('pakistan-cricket'),
    leagueId: 'ashes',
    sportId: 'cricket',
    startTime: new Date(Date.now() + 12 * 3600000).toISOString(),
    status: 'upcoming',
    marketCount: 35,
    markets: [
      makeMarket('1x2', 1.80, 3.00, 4.50),
      makeMarket('over_under', 1.90, undefined, 1.90),
    ],
  },
  {
    id: 'up-8',
    homeTeam: getTeam('ac-milan'),
    awayTeam: getTeam('monaco'),
    leagueId: 'ucl',
    sportId: 'football',
    startTime: new Date(Date.now() + 24 * 3600000).toISOString(),
    status: 'upcoming',
    marketCount: 58,
    markets: [
      makeMarket('1x2', 1.85, 3.60, 4.20),
      makeMarket('over_under', 1.95, undefined, 1.85),
      makeMarket('both_teams_to_score', 1.75, undefined, 2.05),
    ],
  },
];

export const allMatches: Match[] = [...liveMatches, ...upcomingMatches];

// ===== RESULTS =====
export const matchResults: MatchResult[] = [
  { id: 'r-1', homeTeam: getTeam('man-city'), awayTeam: getTeam('arsenal'), leagueId: 'epl', sportId: 'football', date: new Date(Date.now() - 1 * 86400000).toISOString(), scoreHome: 2, scoreAway: 1, scoreHomeHT: 1, scoreAwayHT: 0, status: 'finished' },
  { id: 'r-2', homeTeam: getTeam('real-madrid'), awayTeam: getTeam('atletico'), leagueId: 'laliga', sportId: 'football', date: new Date(Date.now() - 1 * 86400000).toISOString(), scoreHome: 3, scoreAway: 1, scoreHomeHT: 2, scoreAwayHT: 0, status: 'finished' },
  { id: 'r-3', homeTeam: getTeam('lakers'), awayTeam: getTeam('warriors'), leagueId: 'nba', sportId: 'basketball', date: new Date(Date.now() - 2 * 86400000).toISOString(), scoreHome: 112, scoreAway: 108, status: 'finished' },
  { id: 'r-4', homeTeam: getTeam('liverpool'), awayTeam: getTeam('man-utd'), leagueId: 'epl', sportId: 'football', date: new Date(Date.now() - 2 * 86400000).toISOString(), scoreHome: 4, scoreAway: 0, scoreHomeHT: 2, scoreAwayHT: 0, status: 'finished' },
  { id: 'r-5', homeTeam: getTeam('india-cricket'), awayTeam: getTeam('england-cricket'), leagueId: 'ipl', sportId: 'cricket', date: new Date(Date.now() - 3 * 86400000).toISOString(), scoreHome: 298, scoreAway: 241, status: 'finished' },
  { id: 'r-6', homeTeam: getTeam('barcelona'), awayTeam: getTeam('psg'), leagueId: 'ucl', sportId: 'football', date: new Date(Date.now() - 3 * 86400000).toISOString(), scoreHome: 2, scoreAway: 2, scoreHomeHT: 1, scoreAwayHT: 1, status: 'finished' },
  { id: 'r-7', homeTeam: getTeam('djokovic'), awayTeam: getTeam('sinner'), leagueId: 'atp', sportId: 'tennis', date: new Date(Date.now() - 4 * 86400000).toISOString(), scoreHome: 3, scoreAway: 1, status: 'finished' },
  { id: 'r-8', homeTeam: getTeam('juventus'), awayTeam: getTeam('inter'), leagueId: 'seriea', sportId: 'football', date: new Date(Date.now() - 4 * 86400000).toISOString(), scoreHome: 1, scoreAway: 2, scoreHomeHT: 0, scoreAwayHT: 1, status: 'finished' },
  { id: 'r-9', homeTeam: getTeam('chelsea'), awayTeam: getTeam('tottenham'), leagueId: 'epl', sportId: 'football', date: new Date(Date.now() - 5 * 86400000).toISOString(), scoreHome: 1, scoreAway: 1, scoreHomeHT: 0, scoreAwayHT: 1, status: 'finished' },
  { id: 'r-10', homeTeam: getTeam('heat'), awayTeam: getTeam('celtics'), leagueId: 'nba', sportId: 'basketball', date: new Date(Date.now() - 5 * 86400000).toISOString(), scoreHome: 118, scoreAway: 121, status: 'finished' },
  { id: 'r-11', homeTeam: getTeam('dortmund'), awayTeam: getTeam('monaco'), leagueId: 'ucl', sportId: 'football', date: new Date(Date.now() - 6 * 86400000).toISOString(), scoreHome: 3, scoreAway: 0, scoreHomeHT: 2, scoreAwayHT: 0, status: 'finished' },
  { id: 'r-12', homeTeam: getTeam('australia-cricket'), awayTeam: getTeam('pakistan-cricket'), leagueId: 'ashes', sportId: 'cricket', date: new Date(Date.now() - 6 * 86400000).toISOString(), scoreHome: 312, scoreAway: 287, status: 'finished' },
];

// ===== PROMOTIONS =====
export const promotions: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Welcome Bonus',
    subtitle: '100% up to $200',
    description: 'Start your journey with our exclusive welcome package. Get a 100% match on your first deposit, giving you twice the funds to explore our markets.',
    tag: 'New Players',
    color: 'from-orange-500 to-red-600',
    expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    terms: 'Min deposit $20. Wagering requirements 5x. Valid 30 days.',
    icon: '🎉',
    cta: 'Claim Bonus',
  },
  {
    id: 'promo-2',
    title: 'Acca Boost',
    subtitle: 'Up to 50% extra winnings',
    description: 'Get extra returns on your accumulator bets. The more selections you add, the bigger your boost — up to 50% additional winnings.',
    tag: 'Accumulators',
    color: 'from-violet-500 to-purple-700',
    expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    terms: 'Minimum 4 selections. Each selection at 1.3+ odds. Max boost $500.',
    icon: '🚀',
    cta: 'Bet Now',
  },
  {
    id: 'promo-3',
    title: 'Cashback Friday',
    subtitle: '10% weekly cashback',
    description: 'Every Friday, receive 10% cashback on any net losses from the previous week. No strings attached — pure value returned to you.',
    tag: 'Cashback',
    color: 'from-emerald-500 to-teal-600',
    expiresAt: new Date(Date.now() + 3 * 86400000).toISOString(),
    terms: 'Min net loss $50. Max cashback $200. Credited every Friday.',
    icon: '💰',
    cta: 'Learn More',
  },
  {
    id: 'promo-4',
    title: 'Live Bet Refund',
    subtitle: 'Insurance on live markets',
    description: "Place a live bet and if the match turns against you in the final 10 minutes, we'll refund your stake up to $50.",
    tag: 'Live Betting',
    color: 'from-red-500 to-rose-700',
    expiresAt: new Date(Date.now() + 14 * 86400000).toISOString(),
    terms: 'Max refund $50. Single bets only. Selected markets.',
    icon: '⚡',
    cta: 'Go Live',
  },
  {
    id: 'promo-5',
    title: 'Champions League Specials',
    subtitle: 'Enhanced odds every matchday',
    description: 'Exclusive price boosts on Champions League matches every Tuesday and Wednesday. Get the best value on Europe\'s biggest nights.',
    tag: 'Football',
    color: 'from-blue-500 to-indigo-700',
    expiresAt: new Date(Date.now() + 5 * 86400000).toISOString(),
    terms: 'Max stake $50 on boosted odds. One per customer per event.',
    icon: '🏆',
    cta: 'View Boosts',
  },
  {
    id: 'promo-6',
    title: 'Refer a Friend',
    subtitle: '$25 for you and your friend',
    description: 'Share your unique referral code and earn $25 for each friend who signs up and places their first bet.',
    tag: 'Referral',
    color: 'from-amber-400 to-orange-600',
    expiresAt: new Date(Date.now() + 60 * 86400000).toISOString(),
    terms: 'Referred friend must deposit min $20 and place min $10 bet.',
    icon: '👥',
    cta: 'Share Now',
  },
];

// ===== MOCK USER =====
export const mockUser: MockUser = {
  id: 'user-001',
  username: 'pulsebet_pro',
  email: 'demo@betpulse.io',
  firstName: 'Alex',
  lastName: 'Morgan',
  balance: 1284.50,
  currency: 'USD',
  country: 'United Kingdom',
  joinedAt: '2024-03-15T10:00:00Z',
  level: 'gold',
  verified: true,
  favoritesSports: ['football', 'basketball', 'tennis'],
  favoriteMatches: ['live-1', 'up-1', 'up-6'],
};

// ===== TRANSACTIONS =====
export const transactions: Transaction[] = [
  { id: 'tx-1', type: 'deposit', amount: 200, currency: 'USD', status: 'completed', description: 'Credit Card Deposit', createdAt: new Date(Date.now() - 1 * 86400000).toISOString(), reference: 'DEP-2024-001' },
  { id: 'tx-2', type: 'bet_placed', amount: -45, currency: 'USD', status: 'completed', description: 'Arsenal vs Man City — Win', createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), reference: 'BET-2024-082' },
  { id: 'tx-3', type: 'bet_won', amount: 112.50, currency: 'USD', status: 'completed', description: 'Bet Won: Liverpool vs Chelsea', createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), reference: 'WIN-2024-034' },
  { id: 'tx-4', type: 'bet_placed', amount: -20, currency: 'USD', status: 'completed', description: 'Acca — 4 Selections', createdAt: new Date(Date.now() - 3 * 86400000).toISOString(), reference: 'BET-2024-081' },
  { id: 'tx-5', type: 'withdrawal', amount: -150, currency: 'USD', status: 'pending', description: 'Bank Transfer Withdrawal', createdAt: new Date(Date.now() - 3 * 86400000).toISOString(), reference: 'WIT-2024-012' },
  { id: 'tx-6', type: 'bonus', amount: 50, currency: 'USD', status: 'completed', description: 'Weekly Cashback Bonus', createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), reference: 'BON-2024-021' },
  { id: 'tx-7', type: 'deposit', amount: 500, currency: 'USD', status: 'completed', description: 'PayPal Deposit', createdAt: new Date(Date.now() - 7 * 86400000).toISOString(), reference: 'DEP-2024-000' },
  { id: 'tx-8', type: 'bet_placed', amount: -30, currency: 'USD', status: 'completed', description: 'Real Madrid vs Barcelona', createdAt: new Date(Date.now() - 8 * 86400000).toISOString(), reference: 'BET-2024-080' },
  { id: 'tx-9', type: 'bet_won', amount: 87.00, currency: 'USD', status: 'completed', description: 'Bet Won: NBA Special', createdAt: new Date(Date.now() - 9 * 86400000).toISOString(), reference: 'WIN-2024-033' },
  { id: 'tx-10', type: 'bet_placed', amount: -15, currency: 'USD', status: 'completed', description: 'Tennis — Djokovic to Win', createdAt: new Date(Date.now() - 10 * 86400000).toISOString(), reference: 'BET-2024-079' },
];

// ===== NOTIFICATIONS =====
export const notifications: Notification[] = [
  { id: 'n-1', type: 'result', title: 'Bet Result', message: 'Your bet on Liverpool to Win has settled. You won $112.50!', read: false, createdAt: new Date(Date.now() - 30 * 60000).toISOString(), link: '/dashboard' },
  { id: 'n-2', type: 'promo', title: 'New Promotion', message: 'Cashback Friday is live! Claim your 10% on losses before midnight.', read: false, createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), link: '/promotions' },
  { id: 'n-3', type: 'info', title: 'Match Starting Soon', message: 'Liverpool vs Chelsea kicks off in 30 minutes. Don\'t miss out!', read: true, createdAt: new Date(Date.now() - 4 * 3600000).toISOString(), link: '/match/up-1' },
  { id: 'n-4', type: 'success', title: 'Deposit Successful', message: 'Your $200 deposit has been credited to your account.', read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'n-5', type: 'warning', title: 'Withdrawal Pending', message: 'Your withdrawal of $150 is being processed. Allow 2-3 business days.', read: true, createdAt: new Date(Date.now() - 3 * 86400000).toISOString(), link: '/wallet' },
  { id: 'n-6', type: 'promo', title: 'Acca Boost Available', message: 'Get up to 50% extra on your next accumulator bet!', read: true, createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), link: '/promotions' },
];

// ===== LIVE TICKER DATA =====
export const tickerItems = [
  { id: 't-1', text: '⚽ Arsenal 2-1 Man City | 67\'', hot: true },
  { id: 't-2', text: '⚽ Real Madrid 1-1 Barcelona | 52\'', hot: true },
  { id: 't-3', text: '🏀 Lakers 89-94 Celtics | Q3 8\'', hot: false },
  { id: 't-4', text: '🏏 India 186/4 vs Australia | O32', hot: false },
  { id: 't-5', text: '🎾 Djokovic 1-2 Alcaraz | Set 3', hot: false },
  { id: 't-6', text: '⚽ PSG 0-0 Inter Milan | 15\'', hot: false },
  { id: 't-7', text: '⚽ Upcoming: Liverpool vs Chelsea | 2h', hot: true },
  { id: 't-8', text: '⚽ Upcoming: Bayern vs Dortmund | 4h', hot: false },
];
