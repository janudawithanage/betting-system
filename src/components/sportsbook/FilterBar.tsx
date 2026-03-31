import { cn } from '@/utils';
import type { FilterState } from '@/types';
import { sports } from '@/data/mockData';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  onChange: (filter: Partial<FilterState>) => void;
  showStatusFilter?: boolean;
}

const statusOptions: { value: FilterState['status']; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'live', label: '🔴 Live' },
  { value: 'upcoming', label: 'Upcoming' },
];

export function FilterBar({ filter, onChange, showStatusFilter = true }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1 text-slate-500">
        <Filter className="w-4 h-4" />
      </div>

      {showStatusFilter && (
        <div className="flex bg-bg-elevated rounded-lg p-1 gap-0.5">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ status: opt.value })}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-medium transition-all',
                filter.status === opt.value
                  ? 'bg-brand-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <select
        value={filter.sport}
        onChange={(e) => onChange({ sport: e.target.value })}
        className="bg-bg-elevated border border-bg-border rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-brand-500 transition-colors"
      >
        <option value="all">All Sports</option>
        {sports.map((s) => (
          <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
        ))}
      </select>
    </div>
  );
}
