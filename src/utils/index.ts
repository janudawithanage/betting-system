import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatOdds(value: number | undefined | null): string {
  if (value === undefined || value === null || isNaN(value)) return '--';
  return value.toFixed(2);
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatMatchTime(isoString: string): string {
  try {
    return format(parseISO(isoString), 'HH:mm');
  } catch {
    return '--:--';
  }
}

export function formatMatchDate(isoString: string): string {
  try {
    return format(parseISO(isoString), 'MMM d, yyyy');
  } catch {
    return '---';
  }
}

export function formatTimeAgo(isoString: string): string {
  try {
    return formatDistanceToNow(parseISO(isoString), { addSuffix: true });
  } catch {
    return '---';
  }
}

export function calculatePayout(stake: number, odds: number | undefined | null): number {
  if (!odds || isNaN(odds)) return 0;
  return stake * odds;
}

export function calculateMultiOdds(odds: number[]): number {
  return odds.reduce((acc, odd) => acc * odd, 1);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '…';
}

export function getOddsChange(trend?: 'up' | 'down' | 'stable'): string {
  if (trend === 'up') return 'text-green-400';
  if (trend === 'down') return 'text-red-400';
  return '';
}
