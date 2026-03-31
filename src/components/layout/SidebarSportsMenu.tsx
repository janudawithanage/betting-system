import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, Star } from 'lucide-react';
import { sports, leagues } from '@/data/mockData';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function SidebarSportsMenu() {
  const { sport: activeSport } = useParams<{ sport?: string }>();
  const [expandedSports, setExpandedSports] = useState<string[]>(['football', 'basketball']);
  const { user, toggleFavoriteSport } = useAuthStore();

  const toggle = (sportId: string) => {
    setExpandedSports((prev) =>
      prev.includes(sportId) ? prev.filter((s) => s !== sportId) : [...prev, sportId]
    );
  };

  return (
    <aside className="w-60 flex-shrink-0 h-full overflow-y-auto scrollable bg-bg-secondary border-r border-bg-border hidden lg:block">
      <div className="p-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 mb-3">Sports</p>

        {sports.map((sport) => {
          const sportLeagues = leagues.filter((l) => l.sportId === sport.id);
          const isExpanded = expandedSports.includes(sport.id);
          const isActive = activeSport === sport.slug;
          const isFav = user?.favoritesSports.includes(sport.id);

          return (
            <div key={sport.id} className="mb-0.5">
              <div
                className={cn('sidebar-item group', isActive && 'active')}
              >
                <Link
                  to={`/sports/${sport.slug}`}
                  className="flex items-center gap-2.5 flex-1 min-w-0"
                >
                  <span className="text-base leading-none">{sport.icon}</span>
                  <span className="text-sm font-medium truncate">{sport.name}</span>
                  <span className="text-xs text-slate-600 ml-auto mr-1 hidden group-hover:block">{sport.count}</span>
                </Link>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.preventDefault(); toggleFavoriteSport(sport.id); }}
                    className={cn('p-0.5 rounded transition-colors opacity-0 group-hover:opacity-100', isFav ? 'text-brand-400 opacity-100' : 'text-slate-600 hover:text-brand-400')}
                  >
                    <Star className="w-3 h-3" fill={isFav ? 'currentColor' : 'none'} />
                  </button>
                  {sportLeagues.length > 0 && (
                    <button onClick={() => toggle(sport.id)} className="p-0.5 text-slate-600 hover:text-white transition-colors">
                      {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && sportLeagues.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden ml-3 pl-3 border-l border-bg-border mt-0.5 mb-1"
                  >
                    {sportLeagues.map((league) => (
                      <Link
                        key={league.id}
                        to={`/sports/${sport.slug}`}
                        className="flex items-center gap-2 px-2 py-2 rounded-lg text-slate-500 hover:text-white hover:bg-bg-elevated transition-all text-xs"
                      >
                        <span className="text-xs opacity-60">{league.countryCode}</span>
                        <span className="truncate">{league.name}</span>
                        {league.featured && <span className="ml-auto text-yellow-500 text-xs">★</span>}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
