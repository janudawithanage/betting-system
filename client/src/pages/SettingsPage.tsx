import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { mockUser } from '@/data/mockData';
import { Settings, Bell, Shield, Moon, Globe, Info, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn('relative w-11 h-6 rounded-full transition-colors duration-200', checked ? 'bg-brand-500' : 'bg-bg-border')}
    >
      <span className={cn('absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200', checked && 'translate-x-5')} />
    </button>
  );
}

function SettingRow({ icon: Icon, label, description, action }: { icon: any; label: string; description?: string; action: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-bg-border last:border-0">
      <div className="w-9 h-9 rounded-xl bg-bg-elevated flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-slate-300" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-200">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function SettingsPage() {
  const { isLoggedIn } = useAuthStore();
  const { addToast } = useUIStore();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    liveUpdates: true,
    oddsFormat: 'decimal',
    language: 'English',
    timezone: 'UTC+0',
    darkMode: true,
  });

  if (!isLoggedIn) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-2xl">⚙️</p>
        <h2 className="text-xl font-bold text-white">Sign in to access settings</h2>
        <Link to="/login" className="btn-primary inline-block">Sign In</Link>
      </div>
    );
  }

  const toggle = (key: string) => {
    setSettings((s) => ({ ...s, [key]: !s[key as keyof typeof s] }));
    addToast({ type: 'info', title: 'Setting updated', message: '', duration: 1500 });
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Settings className="w-7 h-7 text-brand-400" />
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>

      {/* Account info */}
      <div className="card p-5">
        <h2 className="font-bold text-white mb-4">Account Information</h2>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500 block mb-1">First Name</label>
              <input defaultValue={mockUser.firstName} className="input-dark text-sm" />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">Last Name</label>
              <input defaultValue={mockUser.lastName} className="input-dark text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">Email</label>
            <input defaultValue={mockUser.email} type="email" className="input-dark text-sm" />
          </div>
          <button
            onClick={() => addToast({ type: 'success', title: 'Saved', message: 'Account information updated.' })}
            className="btn-primary text-sm px-6"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-5">
        <h2 className="font-bold text-white mb-2 flex items-center gap-2"><Bell className="w-4 h-4 text-brand-400" />Notification Preferences</h2>
        <div>
          <SettingRow icon={Bell} label="Push Notifications" description="Receive bet results and offers" action={<ToggleSwitch checked={settings.notifications} onChange={() => toggle('notifications')} />} />
          <SettingRow icon={Info} label="Email Alerts" description="Weekly summary and promotions" action={<ToggleSwitch checked={settings.emailAlerts} onChange={() => toggle('emailAlerts')} />} />
          <SettingRow icon={Info} label="Live Match Updates" description="Score changes during live events" action={<ToggleSwitch checked={settings.liveUpdates} onChange={() => toggle('liveUpdates')} />} />
        </div>
      </div>

      {/* Display preferences */}
      <div className="card p-5">
        <h2 className="font-bold text-white mb-2 flex items-center gap-2"><Moon className="w-4 h-4 text-brand-400" />Display & Preferences</h2>
        <div>
          <SettingRow icon={Moon} label="Dark Mode" description="Premium dark interface" action={<ToggleSwitch checked={settings.darkMode} onChange={() => toggle('darkMode')} />} />
          <SettingRow
            icon={Globe}
            label="Odds Format"
            description="How odds are displayed"
            action={
              <select value={settings.oddsFormat} onChange={(e) => setSettings(s => ({ ...s, oddsFormat: e.target.value }))} className="bg-bg-elevated border border-bg-border rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none">
                <option value="decimal">Decimal</option>
                <option value="fractional">Fractional</option>
                <option value="american">American</option>
              </select>
            }
          />
          <SettingRow
            icon={Globe}
            label="Language"
            action={
              <select className="bg-bg-elevated border border-bg-border rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            }
          />
        </div>
      </div>

      {/* Security */}
      <div className="card p-5">
        <h2 className="font-bold text-white mb-2 flex items-center gap-2"><Shield className="w-4 h-4 text-brand-400" />Security</h2>
        <div>
          {[
            { label: 'Change Password', desc: 'Update your account password' },
            { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security' },
            { label: 'Active Sessions', desc: 'Manage logged-in devices' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => addToast({ type: 'info', title: 'Feature Coming Soon', message: 'This feature is in development.' })}
              className="w-full flex items-center gap-4 py-4 border-b border-bg-border last:border-0 hover:bg-bg-elevated -mx-5 px-5 transition-colors text-left"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">{item.label}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          ))}
        </div>
      </div>

      {/* Responsible gambling */}
      <div className="card p-5 border-amber-500/20 bg-amber-500/5">
        <h2 className="font-bold text-white mb-2">⚠️ Responsible Gambling</h2>
        <p className="text-xs text-slate-400 mb-3">Set limits to help manage your betting activity:</p>
        <div className="grid grid-cols-2 gap-3">
          {['Daily Deposit Limit', 'Weekly Bet Limit', 'Self-Exclusion', 'Reality Check'].map((limit) => (
            <button key={limit} onClick={() => addToast({ type: 'info', title: limit, message: 'This is a demo feature.' })} className="card p-3 text-xs font-medium text-slate-300 hover:border-amber-500/50 transition-all text-left">
              {limit}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
