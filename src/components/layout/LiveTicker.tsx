import { tickerItems } from '@/data/mockData';

export function LiveTicker() {
  return (
    <div className="bg-bg-secondary border-b border-bg-border overflow-hidden h-9 flex items-center">
      <div className="flex-shrink-0 bg-red-500 px-3 h-full flex items-center gap-1.5 text-white text-xs font-bold z-10">
        <span className="live-dot" />
        LIVE
      </div>
      <div className="ticker-container flex-1">
        <div className="ticker-content flex items-center gap-0">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center text-xs text-slate-400 px-6 border-r border-bg-border h-9">
              {item.hot && <span className="text-brand-400 mr-1">🔥</span>}
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
