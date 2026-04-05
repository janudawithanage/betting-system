import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { OddsMarket, Match } from '@/types';
import { OddsButton } from './OddsButton';
import { leagues } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface MarketAccordionProps {
  market: OddsMarket;
  match: Match;
  defaultOpen?: boolean;
}

export function MarketAccordion({ market, match, defaultOpen = false }: MarketAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const league = leagues.find((l) => l.id === match.leagueId);
  const leagueName = league?.name || '';
  const matchName = `${match.homeTeam.name} vs ${match.awayTeam.name}`;

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-elevated/50 transition-colors"
      >
        <span className="font-semibold text-sm text-slate-200">{market.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">{market.odds.length} options</span>
          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-bg-border"
          >
            <div className="p-3">
              <div className="flex flex-wrap gap-2">
                {market.odds.map((odd) => (
                  <OddsButton
                    key={odd.id}
                    odd={odd}
                    market={market}
                    matchId={match.id}
                    matchName={matchName}
                    leagueName={leagueName}
                    sport={match.sportId}
                    startTime={match.startTime}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
