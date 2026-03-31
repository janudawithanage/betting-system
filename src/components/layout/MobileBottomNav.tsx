import { Link, useLocation } from 'react-router-dom';
import { Home, Zap, BarChart2, Tag, Trophy } from 'lucide-react';
import { useBetSlipStore } from '@/store/betSlipStore';
import { cn } from '@/utils';

const items = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Zap, label: 'Live', path: '/sports/live' },
  { icon: BarChart2, label: 'Slip', path: null, action: 'slip' },
  { icon: Tag, label: 'Promos', path: '/promotions' },
  { icon: Trophy, label: 'Results', path: '/results' },
];

export function MobileBottomNav() {
  const location = useLocation();
  const { selectionCount, toggleOpen } = useBetSlipStore();
  const count = selectionCount();

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-secondary border-t border-bg-border safe-area-pb">
      <div className="flex items-center justify-around px-2 h-16">
        {items.map((item) => {
          const isSlip = item.action === 'slip';
          const isActive = !isSlip && (location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path || '')));
          const Icon = item.icon;

          if (isSlip) {
            return (
              <button key="slip" onClick={toggleOpen} className="flex flex-col items-center gap-1 flex-1">
                <div className="relative w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center -mt-4 shadow-glow-brand">
                  <Icon className="w-5 h-5 text-white" />
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-brand-600 rounded-full text-[10px] font-bold flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400">{item.label}</span>
              </button>
            );
          }

          return (
            <Link key={item.path} to={item.path!} className={cn('flex flex-col items-center gap-1 flex-1 py-2', isActive ? 'text-brand-400' : 'text-slate-500 hover:text-slate-300')}>
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && <span className="absolute bottom-1 w-1 h-1 bg-brand-400 rounded-full" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
