import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Chrome, Apple } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { DEMO_EMAIL, DEMO_PASSWORD } from '@/config/constants';

export function LoginPage() {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      addToast({ type: 'success', title: 'Welcome back!', message: 'You have signed in successfully.' });
      navigate('/dashboard');
    } else {
      addToast({ type: 'error', title: 'Login failed', message: 'Invalid email or password.' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated p-8 rounded-2xl"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-slate-400 text-sm">Sign in to your BetPulse account</p>
      </div>

      {/* Social login */}
      <div className="flex gap-3 mb-6">
        <button className="flex-1 btn-secondary flex items-center justify-center gap-2 text-sm">
          <Chrome className="w-4 h-4" /> Google
        </button>
        <button className="flex-1 btn-secondary flex items-center justify-center gap-2 text-sm">
          <Apple className="w-4 h-4" /> Apple
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-bg-border" />
        <span className="text-xs text-slate-600">or continue with email</span>
        <div className="flex-1 h-px bg-bg-border" />
      </div>

      {/* Demo info */}
      <div className="mb-4 bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 text-xs text-blue-300">
        🎯 Demo: Use the pre-filled credentials or any email/password to sign in.
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-dark pl-10"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-slate-400">Password</label>
            <button type="button" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">Forgot password?</button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-dark pl-10 pr-10"
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2 py-3"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Sign In <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">Create one free</Link>
      </p>

      <p className="text-center text-xs text-slate-700 mt-4">
        18+ | Gambling can be addictive. Play responsibly.
      </p>
    </motion.div>
  );
}
