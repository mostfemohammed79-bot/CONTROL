import { StatCard } from '@/components/StatCard';
import { analyticsData } from '@/data/sampleData';
import { Eye, Heart, MessageSquare, Share2, Users, TrendingUp, Clock, Video as VideoIcon } from 'lucide-react';
import type { PageId } from '@/types';

interface DashboardProps {
  onNavigate: (page: PageId) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { overview, viewsTrend, bestPostTimes } = analyticsData;
  const maxTrend = Math.max(...viewsTrend.map((d) => d.value));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Views" value="344.1K" change="+12.4%" positive icon={<Eye className="w-5 h-5" />} />
        <StatCard label="Total Likes" value="49.1K" change="+8.7%" positive icon={<Heart className="w-5 h-5" />} />
        <StatCard label="Comments" value="2,524" change="+15.2%" positive icon={<MessageSquare className="w-5 h-5" />} />
        <StatCard label="Shares" value="7,110" change="+5.1%" positive icon={<Share2 className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Views trend */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">Views This Week</h3>
              <p className="text-sm text-gray-500 mt-0.5">Daily breakdown across all videos</p>
            </div>
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {viewsTrend.map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex-1 flex items-end relative">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-blue-600/40 to-cyan-400 group-hover:from-blue-600/60 group-hover:to-cyan-400 transition-all duration-300"
                    style={{ height: `${(d.value / maxTrend) * 100}%` }}
                  />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-cyan-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {(d.value / 1000).toFixed(1)}K
                  </span>
                </div>
                <span className="text-xs text-gray-500">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement + Followers */}
        <div className="space-y-4">
          <div className="bg-white/[0.03] border border-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{overview.followers.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Engagement Rate</span>
                <span className="text-sm font-semibold text-cyan-400">{overview.engagementRate}%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${overview.engagementRate * 10}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">Best Times to Post</h3>
            </div>
            <div className="space-y-2.5">
              {bestPostTimes.map((t) => (
                <div key={t.day} className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{t.day}</span>
                  <span className="text-white font-medium bg-white/[0.04] px-2.5 py-1 rounded-md">{t.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('videos')}
          className="bg-gradient-to-br from-cyan-500/10 to-blue-600/5 border border-cyan-500/20 rounded-xl p-6 text-left hover:border-cyan-500/40 transition-all duration-300 group"
        >
          <VideoIcon className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="text-white font-semibold mb-1">Upload & Schedule</h4>
          <p className="text-sm text-gray-500">Manage your video library and schedule posts</p>
        </button>
        <button
          onClick={() => onNavigate('comments')}
          className="bg-gradient-to-br from-cyan-500/10 to-blue-600/5 border border-cyan-500/20 rounded-xl p-6 text-left hover:border-cyan-500/40 transition-all duration-300 group"
        >
          <MessageSquare className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="text-white font-semibold mb-1">Reply Automation</h4>
          <p className="text-sm text-gray-500">Set keyword rules and approve sensitive comments</p>
        </button>
        <button
          onClick={() => onNavigate('ideas')}
          className="bg-gradient-to-br from-cyan-500/10 to-blue-600/5 border border-cyan-500/20 rounded-xl p-6 text-left hover:border-cyan-500/40 transition-all duration-300 group"
        >
          <TrendingUp className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="text-white font-semibold mb-1">AI Content Ideas</h4>
          <p className="text-sm text-gray-500">Get fresh concepts tailored to your niche</p>
        </button>
      </div>
    </div>
  );
}
