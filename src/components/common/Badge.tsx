import { cn } from '@/utils';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'live' | 'hot' | 'new' | 'default' | 'success' | 'warning';
  className?: string;
}

const variantClasses: Record<string, string> = {
  live: 'bg-red-500/20 text-red-400 border border-red-500/30',
  hot: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  new: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  success: 'bg-green-500/20 text-green-400 border border-green-500/30',
  warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  default: 'bg-bg-border text-slate-400',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold',
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  );
}

export function LiveBadge() {
  return (
    <Badge variant="live">
      <span className="live-dot" />
      LIVE
    </Badge>
  );
}

export function HotBadge() {
  return <Badge variant="hot">🔥 HOT</Badge>;
}
