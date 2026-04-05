import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Chrome, Apple, Check, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/utils';

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'Uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'Number', ok: /[0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className={cn('h-1 flex-1 rounded-full transition-colors', i < score ? score === 1 ? 'bg-red-500' : score === 2 ? 'bg-amber-400' : 'bg-green-500' : 'bg-bg-border')} />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-1.5">
            {c.ok ? <Check className="w-3 h-3 text-green-400" /> : <X className="w-3 h-3 text-slate-600" />}
            <span className={cn('text-xs', c.ok ? 'text-green-400' : 'text-slate-600')}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '', agree: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      addToast({ type: 'error', title: 'Password mismatch', message: 'Passwords do not match.' });
      return;
    }
    setLoading(true);
    await login(form.email, form.password);
    setLoading(false);
    addToast({ type: 'success', title: 'Account Created!', message: 'Welcome to BetPulse!' });
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated p-8 rounded-2xl"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-slate-400 text-sm">Join BetPulse and start betting today</p>
      </div>

      <div className="flex gap-3 mb-6">
        <button className="flex-1 btn-secondary flex items-center justify-center gap-2 text-sm"><Chrome className="w-4 h-4" /> Google</button>
        <button className="flex-1 btn-secondary flex items-center justify-center gap-2 text-sm"><Apple className="w-4 h-4" /> Apple</button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-bg-border" />
        <span className="text-xs text-slate-600">or register with email</span>
        <div className="flex-1 h-px bg-bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">First Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required className="input-dark pl-10" placeholder="John" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">Last Name</label>
            <input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required className="input-dark" placeholder="Doe" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required className="input-dark pl-10" placeholder="you@example.com" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="input-dark pl-10" placeholder="+1 (555) 000-0000" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => update('password', e.target.value)} required className="input-dark pl-10 pr-10" placeholder="Create a strong password" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {form.password && <PasswordStrength password={form.password} />}
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5">Confirm Password</label>
          <input type="password" value={form.confirm} onChange={(e) => update('confirm', e.target.value)} required className={cn('input-dark', form.confirm && form.password !== form.confirm && 'border-red-500')} placeholder="Repeat your password" />
          {form.confirm && form.password !== form.confirm && <p className="text-xs text-red-400 mt-1">Passwords don't match</p>}
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.agree} onChange={(e) => update('agree', e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-bg-border" required />
          <span className="text-xs text-slate-400 leading-relaxed">
            I am 18+ years old and agree to the{' '}
            <button type="button" className="text-brand-400 hover:text-brand-300">Terms of Service</button>{' '}and{' '}
            <button type="button" className="text-brand-400 hover:text-brand-300">Privacy Policy</button>.
            I acknowledge this is a demo platform.
          </span>
        </label>

        <button type="submit" disabled={loading || !form.agree} className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">Sign In</Link>
      </p>

      <p className="text-center text-xs text-slate-700 mt-4">
        18+ | Please gamble responsibly | Demo Platform Only
      </p>
    </motion.div>
  );
}
