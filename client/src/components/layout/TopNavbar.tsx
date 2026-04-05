import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Search, User, ChevronDown, Wallet, Settings,
  LogOut, Star, BarChart2, Menu, X, Zap
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useBetSlipStore } from '@/store/betSlipStore';
import { useUIStore } from '@/store/uiStore';
import { notifications } from '@/data/mockData';
import { formatCurrency, formatTimeAgo } from '@/utils';
import { Badge } from '@/components/common/Badge';

const navItems = [
  { label: 'Sports', path: '/sports' },
  { label: 'Live', path: '/sports/live' },
  { label: 'Esports', path: '/sports/esports' },
  { label: 'Virtual', path: '/sports/virtual' },
  { label: 'Promotions', path: '/promotions' },
  { label: 'Results', path: '/results' },
];

export function TopNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuthStore();
  const { selectionCount, toggleOpen } = useBetSlipStore();
  const { toggleMobileMenu, mobileMenuOpen } = useUIStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const count = selectionCount();

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-bg-border">
      {/* Top strip */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-bg-secondary border-b border-bg-border text-xs text-slate-500">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5"><span className="live-dot" />Live Events: <span className="text-white font-medium">342</span></span>
          <span>Upcoming: <span className="text-white font-medium">1,284</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span>Odds format: Decimal</span>
          <span>18+ | Gamble Responsibly</span>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-glow-brand">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient-brand hidden sm:block">BetPulse</span>
        </Link>

        {/* Nav links - desktop */}
        <div className="hidden lg:flex items-center gap-1 mx-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link text-sm font-medium ${location.pathname === item.path || location.pathname.startsWith(item.path + '/') ? 'text-white' : ''}`}
            >
              {item.label}
              {item.label === 'Live' && (
                <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              )}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Search - desktop */}
          <button className="hidden lg:flex items-center gap-2 bg-bg-elevated border border-bg-border rounded-lg px-3 py-2 text-sm text-slate-500 hover:border-brand-500/50 transition-colors w-40">
            <Search className="w-4 h-4" />
            <span>Search...</span>
          </button>

          {/* Bet slip button */}
          <button
            onClick={toggleOpen}
            className="relative flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm"
          >
            <BarChart2 className="w-4 h-4" />
            <span className="hidden sm:block">Bet Slip</span>
            {count > 0 && (
              <span className="flex items-center justify-center w-5 h-5 bg-white text-brand-700 rounded-full text-xs font-bold">
                {count}
              </span>
            )}
          </button>

          {isLoggedIn && user ? (
            <>
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                  className="relative p-2 text-slate-400 hover:text-white hover:bg-bg-elevated rounded-lg transition-all"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      className="absolute right-0 top-12 w-80 card-elevated shadow-elevated overflow-hidden"
                    >
                      <div className="p-3 border-b border-bg-border flex items-center justify-between">
                        <span className="font-semibold text-sm">Notifications</span>
                        {unreadCount > 0 && <Badge variant="live">{unreadCount} new</Badge>}
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.slice(0, 5).map((n) => (
                          <div key={n.id} className={`p-3 border-b border-bg-border hover:bg-bg-hover transition-colors cursor-pointer ${!n.read ? 'bg-blue-500/5' : ''}`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${!n.read ? 'bg-blue-400' : 'bg-bg-border'}`} />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-slate-200 truncate">{n.title}</p>
                                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                                <p className="text-xs text-slate-600 mt-1">{formatTimeAgo(n.createdAt)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center">
                        <Link to="/dashboard" onClick={() => setShowNotifications(false)} className="text-sm text-brand-400 hover:text-brand-300">
                          View all notifications
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-bg-elevated transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-sm font-bold text-white">
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-medium text-white leading-none">{user.firstName}</p>
                    <p className="text-xs text-brand-400 font-semibold mt-0.5">{formatCurrency(user.balance)}</p>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-500 hidden lg:block" />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      className="absolute right-0 top-12 w-52 card-elevated shadow-elevated overflow-hidden"
                    >
                      <div className="p-3 border-b border-bg-border">
                        <p className="font-semibold text-sm text-white">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="badge-hot text-xs capitalize">{user.level}</span>
                          {user.verified && <span className="text-xs text-green-400">✓ Verified</span>}
                        </div>
                      </div>
                      <div className="py-1">
                        {[
                          { icon: User, label: 'Dashboard', path: '/dashboard' },
                          { icon: Wallet, label: 'Wallet', path: '/wallet' },
                          { icon: Star, label: 'Favorites', path: '/favorites' },
                          { icon: Settings, label: 'Settings', path: '/settings' },
                        ].map(({ icon: Icon, label, path }) => (
                          <Link
                            key={path}
                            to={path}
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-bg-elevated transition-colors"
                          >
                            <Icon className="w-4 h-4" />
                            {label}
                          </Link>
                        ))}
                        <hr className="border-bg-border my-1" />
                        <button
                          onClick={() => { logout(); setShowUserMenu(false); navigate('/'); }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-ghost text-sm font-medium hidden sm:block">Sign In</Link>
              <Link to="/register" className="btn-primary text-sm py-2 px-4">Join Now</Link>
            </div>
          )}

          {/* Mobile menu */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-bg-elevated rounded-lg transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-bg-border bg-bg-secondary overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => toggleMobileMenu()}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-white bg-bg-elevated' : 'text-slate-400 hover:text-white hover:bg-bg-elevated'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
