import { useParams, Link } from 'react-router-dom';
import { allMatches, leagues, sports } from '@/data/mockData';
import { MatchCard } from '@/components/sportsbook/MatchCard';
import { EmptyState } from '@/components/common/EmptyState';
import { sports as sportsData } from '@/data/mockData';

export function SportPage() {
  const { sport } = useParams<{ sport: string }>();
  const sportData = sportsData.find((s) => s.slug === sport);
  const matches = allMatches.filter((m) => m.sportId === sportData?.id);
  const live = matches.filter((m) => m.status === 'live');
  const upcoming = matches.filter((m) => m.status === 'upcoming');

  if (!sportData) {
    return (
      <div className="p-8">
        <EmptyState icon="🏆" title="Sport not found" description="This sport doesn't exist or has no events." />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <span className="text-4xl">{sportData.icon}</span>
        <div>
          <h1 className="text-2xl font-bold text-white">{sportData.name}</h1>
          <p className="text-slate-400 text-sm">{sportData.count} events available</p>
        </div>
      </div>

      {live.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="live-dot" />
            <h2 className="font-bold text-white">Live</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {live.map((m) => <MatchCard key={m.id} match={m} />)}
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section>
          <h2 className="font-bold text-white mb-3">Upcoming</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {upcoming.map((m) => <MatchCard key={m.id} match={m} />)}
          </div>
        </section>
      )}

      {matches.length === 0 && (
        <EmptyState icon={sportData.icon} title={`No ${sportData.name} events`} description="Check back soon for upcoming events in this sport." />
      )}
    </div>
  );
}
