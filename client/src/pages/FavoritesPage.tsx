import { Link } from 'react-router-dom';
import { allMatches, sports } from '@/data/mockData';
import { useAuthStore } from '@/store/authStore';
import { MatchCard } from '@/components/sportsbook/MatchCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Star, ArrowRight } from 'lucide-react';

export function FavoritesPage() {
  const { user, isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-2xl">⭐</p>
        <h2 className="text-xl font-bold text-white">Sign in to see your favorites</h2>
        <Link to="/login" className="btn-primary inline-block">Sign In</Link>
      </div>
    );
  }

  const favMatches = allMatches.filter((m) => user?.favoriteMatches.includes(m.id));
  const favSports = sports.filter((s) => user?.favoritesSports.includes(s.id));

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Star className="w-7 h-7 text-brand-400 fill-brand-400" />
        <h1 className="text-2xl font-bold text-white">Favorites</h1>
      </div>

      {/* Favorite sports */}
      <section>
        <h2 className="font-semibold text-slate-300 mb-3">Favorite Sports</h2>
        {favSports.length > 0 ? (
          <div className="flex gap-3 flex-wrap">
            {favSports.map((s) => (
              <Link key={s.id} to={`/sports/${s.slug}`} className="card px-4 py-3 flex items-center gap-2 hover:border-brand-500/50 transition-all">
                <span className="text-xl">{s.icon}</span>
                <span className="text-sm font-medium text-slate-200">{s.name}</span>
                <ArrowRight className="w-4 h-4 text-slate-600 ml-1" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center text-slate-500 text-sm">
            No favorite sports yet. Click the ⭐ next to any sport to add it.
          </div>
        )}
      </section>

      {/* Favorite matches */}
      <section>
        <h2 className="font-semibold text-slate-300 mb-3">Saved Matches</h2>
        {favMatches.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {favMatches.map((m) => <MatchCard key={m.id} match={m} />)}
          </div>
        ) : (
          <EmptyState
            icon="⭐"
            title="No saved matches"
            description="Click the ⭐ icon on any match card to save it here."
            action={<Link to="/sports" className="btn-primary text-sm">Browse Matches</Link>}
          />
        )}
      </section>
    </div>
  );
}
