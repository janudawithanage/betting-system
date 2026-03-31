import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn, formatOdds } from '@/utils';
import type { Odd, OddsMarket, BetSelection } from '@/types';
import { useBetSlipStore } from '@/store/betSlipStore';
import { useUIStore } from '@/store/uiStore';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface OddsButtonProps {
  odd: Odd;
  market: OddsMarket;
  matchId: string;
  matchName: string;
  leagueName: string;
  sport: string;
  startTime: string;
  compact?: boolean;
}

export function OddsButton({
  odd, market, matchId, matchName, leagueName, sport, startTime, compact = false
}: OddsButtonProps) {
  const { selections, addSelection, removeSelection } = useBetSlipStore();
  const { addToast } = useUIStore();

  const isSelected = selections.some(
    (s) => s.matchId === matchId && s.oddLabel === odd.label && s.marketType === market.type
  );

  const handleClick = () => {
    if (isSelected) {
      const existing = selections.find(
        (s) => s.matchId === matchId && s.oddLabel === odd.label && s.marketType === market.type
      );
      if (existing) removeSelection(existing.id);
      return;
    }

    const selection: Omit<BetSelection, 'id'> = {
      matchId,
      matchName,
      marketType: market.type,
      marketName: market.name,
      oddLabel: odd.label,
      oddValue: odd.value,
      sport,
      leagueName,
      startTime,
    };
    addSelection(selection);
    addToast({ type: 'success', title: 'Added to Slip', message: `${matchName} — ${odd.label} @ ${formatOdds(odd.value)}` });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
      className={cn(
        'odds-btn',
        isSelected && 'active',
        compact ? 'px-2 py-1.5 min-w-[56px]' : 'px-3 py-2 min-w-[72px]'
      )}
    >
      <span className={cn('text-xs font-medium truncate', isSelected ? 'text-brand-300' : 'text-slate-400', compact && 'text-[10px]')}>
        {odd.label}
      </span>
      <div className="flex items-center gap-0.5">
        {odd.trend === 'up' && <TrendingUp className="w-2.5 h-2.5 text-green-400" />}
        {odd.trend === 'down' && <TrendingDown className="w-2.5 h-2.5 text-red-400" />}
        <span className={cn(
          'font-bold',
          compact ? 'text-sm' : 'text-base',
          isSelected ? 'text-brand-400' : 'text-white',
          odd.trend === 'up' && !isSelected && 'text-green-400',
          odd.trend === 'down' && !isSelected && 'text-red-400'
        )}>
          {formatOdds(odd.value)}
        </span>
      </div>
    </motion.button>
  );
}
