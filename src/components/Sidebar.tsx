import {
  LayoutDashboard,
  Video,
  MessageSquare,
  Lightbulb,
  BarChart3,
  Settings,
  Zap,
} from 'lucide-react';
import type { PageId } from '@/types';

interface SidebarProps {
  active: PageId;
  onNavigate: (page: PageId) => void;
  pendingCount: number;
}

const navItems: { id: PageId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'comments', label: 'Comments & Replies', icon: MessageSquare },
  { id: 'ideas', label: 'Content Ideas', icon: Lightbulb },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ active, onNavigate, pendingCount }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-white/5 bg-black flex flex-col">
      <div className="flex items-center gap-2.5 px-6 py-6 border-b border-white/5">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600">
          <Zap className="w-5 h-5 text-black" fill="currentColor" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-[0.2em] text-white">CONTROL</h1>
          <p className="text-[10px] text-cyan-400/60 tracking-widest uppercase">TikTok Manager</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/15 to-transparent text-cyan-400'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.03]'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-cyan-400" />
              )}
              <Icon
                className={`w-[18px] h-[18px] transition-transform duration-200 ${
                  isActive ? '' : 'group-hover:scale-110'
                }`}
              />
              <span>{item.label}</span>
              {item.id === 'comments' && pendingCount > 0 && (
                <span className="ml-auto bg-red-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {pendingCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-bold text-sm">
            CC
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">Control Creator</p>
            <p className="text-xs text-gray-500 truncate">@control.creator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
