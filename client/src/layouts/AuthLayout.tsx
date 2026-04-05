import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { ToastContainer } from '@/components/common/Toast';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <div className="flex items-center justify-center py-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-glow-brand">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gradient-brand">BetPulse</span>
        </Link>
      </div>
      <div className="flex-1 flex items-start justify-center px-4 pb-16">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
      <div className="py-4 text-center text-xs text-slate-600">
        © 2026 BetPulse. 18+ | Gamble Responsibly | Demo Platform Only
      </div>
      <ToastContainer />
    </div>
  );
}
