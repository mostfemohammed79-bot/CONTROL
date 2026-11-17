import type { PageId } from '@/types';
import { Bell, Search, Plus } from 'lucide-react';

interface TopBarProps {
  page: PageId;
  onQuickAction: () => void;
}

const titles: Record<PageId, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of your TikTok performance' },
  videos: { title: 'Videos', subtitle: 'Manage, upload, and schedule your content' },
  comments: { title: 'Comments & Replies', subtitle: 'Auto-reply rules and sensitive comment approval' },
  ideas: { title: 'Content Ideas', subtitle: 'AI-generated concepts based on your niche' },
  analytics: { title: 'Analytics', subtitle: 'Deep dive into your audience and performance' },
  settings: { title: 'Settings', subtitle: 'Account preferences and automation controls' },
};

export function TopBar({ page, onQuickAction }: TopBarProps) {
  const { title, subtitle } = titles[page];
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-black/40 backdrop-blur-sm sticky top-0 z-20">
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-white/[0.04] border border-white/5 rounded-lg px-3.5 py-2 w-56">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            placeholder="Search..."
            className="bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none flex-1"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-white/[0.05] transition-colors">
          <Bell className="w-[18px] h-[18px] text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full" />
        </button>
        <button
          onClick={onQuickAction}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Video</span>
        </button>
      </div>
    </header>
  );
}
