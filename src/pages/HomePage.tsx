import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Zap, Shield, Clock, Users } from 'lucide-react';
import { FeaturedMatchCarousel } from '@/components/home/FeaturedMatchCarousel';
import { PromoCard } from '@/components/home/PromoCard';
import { MatchCard } from '@/components/sportsbook/MatchCard';
import { LiveMatchCard } from '@/components/sportsbook/LiveMatchCard';
import { liveMatches, upcomingMatches, promotions, sports, leagues } from '@/data/mockData';

const trustItems = [
  { icon: Shield, label: 'Licensed & Regulated' },
  { icon: Zap, label: 'Instant Payouts' },
  { icon: Clock, label: '24/7 Support' },
  { icon: Users, label: '2M+ Customers' },
];

export function HomePage() {
  return (
    <div className="space-y-0">
      {/* Hero section */}
      <section className="px-4 lg:px-8 py-6 bg-gradient-to-b from-bg-tertiary to-bg-primary">
        <div className="max-w-7xl mx-auto space-y-6">
          <FeaturedMatchCarousel />

          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="card px-4 py-3 flex items-center gap-3">
                <Icon className="w-5 h-5 text-brand-400 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-300">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links - sports */}
      <section className="px-4 lg:px-8 py-6 border-y border-bg-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Popular Sports</h2>
            <Link to="/sports" className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
              All Sports <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {sports.filter((s) => s.isPopular).map((sport) => (
              <Link
                key={sport.id}
                to={`/sports/${sport.slug}`}
                className="flex-shrink-0 flex flex-col items-center gap-1.5 bg-bg-elevated hover:bg-bg-hover border border-bg-border hover:border-brand-500/50 rounded-xl px-5 py-3 transition-all duration-200 min-w-[80px]"
              >
                <span className="text-2xl">{sport.icon}</span>
                <span className="text-xs font-medium text-slate-300">{sport.name}</span>
                <span className="text-xs text-slate-600">{sport.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live matches */}
      <section className="px-4 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="live-dot" />
              <h2 className="text-lg font-bold text-white">Live Now</h2>
              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-xs font-bold">{liveMatches.length}</span>
            </div>
            <Link to="/sports/live" className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
              View All Live <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {liveMatches.slice(0, 6).map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </section>

      {/* Top leagues */}
      <section className="px-4 lg:px-8 py-6 bg-bg-secondary border-y border-bg-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Top Leagues</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {leagues.filter((l) => l.featured).map((league) => (
              <Link
                key={league.id}
                to={`/sports`}
                className="card p-3 text-center hover:border-brand-500/50 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-bg-elevated rounded-full mx-auto mb-2 flex items-center justify-center text-lg">
                  {league.countryCode === 'EU' ? '🌍' : league.countryCode === 'GB' ? '🏴󠁧󠁢󠁥󠁮󠁧󠁿' : league.countryCode === 'ES' ? '🇪🇸' : league.countryCode === 'DE' ? '🇩🇪' : league.countryCode === 'IT' ? '🇮🇹' : league.countryCode === 'US' ? '🇺🇸' : league.countryCode === 'IN' ? '🇮🇳' : '🏆'}
                </div>
                <p className="text-xs font-semibold text-slate-300 truncate">{league.name}</p>
                <p className="text-xs text-slate-600 mt-0.5">{league.country}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming matches */}
      <section className="px-4 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-400" />
              <h2 className="text-lg font-bold text-white">Upcoming Matches</h2>
            </div>
            <Link to="/sports" className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
              All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingMatches.slice(0, 6).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="px-4 lg:px-8 py-6 bg-bg-secondary border-t border-bg-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">🎁 Promotions & Bonuses</h2>
            <Link to="/promotions" className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
              All Promos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {promotions.slice(0, 3).map((promo, i) => (
              <PromoCard key={promo.id} promo={promo} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer disclaimer */}
      <footer className="px-4 lg:px-8 py-8 border-t border-bg-border bg-bg-primary">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <p className="text-xs text-slate-600 max-w-2xl mx-auto leading-relaxed">
            BetPulse is a demonstration frontend platform. This site does not offer real money gambling services.
            All data is mocked for demonstration purposes. If you or someone you know has a gambling problem,
            please call the National Problem Gambling Helpline: 1-800-522-4700.
          </p>
          <p className="text-xs text-slate-700">© 2026 BetPulse Demo. 18+ | Please Gamble Responsibly.</p>
        </div>
      </footer>
    </div>
  );
}
