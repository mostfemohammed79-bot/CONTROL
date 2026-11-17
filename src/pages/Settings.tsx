import { useState } from 'react';
import { accountSettings } from '@/data/sampleData';
import { User, Bell, Bot, Palette, Save, Check } from 'lucide-react';

export function Settings() {
  const [settings, setSettings] = useState(accountSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggle = (key: keyof typeof accountSettings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings({ ...settings, [key]: !settings[key] });
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Profile */}
      <Section icon={<User className="w-5 h-5" />} title="Profile" description="Your public TikTok account info">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="TikTok Handle" value={settings.tiktokHandle} onChange={(v) => setSettings({ ...settings, tiktokHandle: v })} />
          <Field label="Display Name" value={settings.displayName} onChange={(v) => setSettings({ ...settings, displayName: v })} />
        </div>
        <Field label="Email" value={settings.email} onChange={(v) => setSettings({ ...settings, email: v })} />
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Bio</label>
          <textarea
            value={settings.bio}
            onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
            rows={3}
            className="w-full bg-white/[0.04] border border-white/10 text-white text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-cyan-500/50 transition-colors resize-none"
          />
        </div>
        <p className="text-xs text-gray-600 pt-1">
          Official TikTok connection is not yet enabled. When available, you will authenticate securely through TikTok — CONTROL never asks for your password.
        </p>
      </Section>

      {/* Automation */}
      <Section icon={<Bot className="w-5 h-5" />} title="Automation" description="Control how CONTROL replies on your behalf">
        <Toggle
          label="Auto-Reply"
          description="Automatically reply to comments matching your keyword rules"
          enabled={settings.autoReply}
          onToggle={() => toggle('autoReply')}
        />
        <Toggle
          label="Sensitive Comment Approval"
          description="Hold spam and flagged comments for manual review before replying"
          enabled={settings.sensitiveApproval}
          onToggle={() => toggle('sensitiveApproval')}
        />
      </Section>

      {/* Notifications */}
      <Section icon={<Bell className="w-5 h-5" />} title="Notifications" description="Choose what CONTROL alerts you about">
        <Toggle
          label="Comment Notifications"
          description="Get notified when new comments arrive"
          enabled={settings.notifyComments}
          onToggle={() => toggle('notifyComments')}
        />
        <Toggle
          label="Mention Notifications"
          description="Get notified when your account is mentioned"
          enabled={settings.notifyMentions}
          onToggle={() => toggle('notifyMentions')}
        />
        <Toggle
          label="Weekly Performance Report"
          description="Receive a summary of your stats every Monday"
          enabled={settings.weeklyReport}
          onToggle={() => toggle('weeklyReport')}
        />
      </Section>

      {/* Appearance */}
      <Section icon={<Palette className="w-5 h-5" />} title="Appearance" description="Customize the dashboard accent color">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-400 ring-2 ring-cyan-400/30 ring-offset-2 ring-offset-zinc-900" />
            <span className="text-sm text-white">Electric Blue</span>
          </div>
          <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
            <div className="w-10 h-10 rounded-lg bg-green-500" />
            <span className="text-sm text-gray-500">Green</span>
          </div>
          <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
            <div className="w-10 h-10 rounded-lg bg-orange-500" />
            <span className="text-sm text-gray-500">Orange</span>
          </div>
        </div>
        <p className="text-xs text-gray-600">More themes coming soon</p>
      </Section>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

function Section({ icon, title, description, children }: { icon: React.ReactNode; title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/[0.04] border border-white/10 text-white text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-cyan-500/50 transition-colors"
      />
    </div>
  );
}

function Toggle({ label, description, enabled, onToggle }: { label: string; description: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-12 h-6.5 rounded-full transition-colors shrink-0 ${enabled ? 'bg-cyan-500' : 'bg-white/10'}`}
        style={{ height: '26px', width: '48px' }}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-0.5'}`}
        />
      </button>
    </div>
  );
}
