import { analyticsData } from '@/data/sampleData';
import { Eye, Heart, MessageSquare, Share2, Users, TrendingUp, Globe, Clock } from 'lucide-react';

export function Analytics() {
  const { overview, viewsTrend, audienceAge, topCountries, bestPostTimes } = analyticsData;
  const maxTrend = Math.max(...viewsTrend.map((d) => d.value));
  const maxAge = Math.max(...audienceAge.map((d) => d.value));
  const maxCountry = Math.max(...topCountries.map((d) => d.value));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MiniStat icon={<Eye className="w-5 h-5" />} label="Views" value="344.1K" />
        <MiniStat icon={<Heart className="w-5 h-5" />} label="Likes" value="49.1K" />
        <MiniStat icon={<MessageSquare className="w-5 h-5" />} label="Comments" value="2.5K" />
        <MiniStat icon={<Share2 className="w-5 h-5" />} label="Shares" value="7.1K" />
        <MiniStat icon={<Users className="w-5 h-5" />} label="Followers" value="28.4K" />
        <MiniStat icon={<TrendingUp className="w-5 h-5" />} label="Engagement" value="7.3%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Views trend */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-6">
          <h3 className="text-base font-semibold text-white mb-1">Views Trend</h3>
          <p className="text-sm text-gray-500 mb-6">Last 7 days</p>
          <div className="flex items-end justify-between gap-3 h-40">
            {viewsTrend.map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex-1 flex items-end relative">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-blue-600/40 to-cyan-400 group-hover:from-blue-600/60 group-hover:to-cyan-400 transition-all duration-300"
                    style={{ height: `${(d.value / maxTrend) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audience age */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-6">
          <h3 className="text-base font-semibold text-white mb-1">Audience by Age</h3>
          <p className="text-sm text-gray-500 mb-6">Percentage breakdown</p>
          <div className="space-y-3">
            {audienceAge.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <span className="text-sm text-gray-400 w-14 shrink-0">{d.label}</span>
                <div className="flex-1 h-6 bg-white/5 rounded-md overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-md flex items-center justify-end pr-2 transition-all duration-500"
                    style={{ width: `${(d.value / maxAge) * 100}%` }}
                  >
                    <span className="text-xs text-black font-semibold">{d.value}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top countries */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-semibold text-white">Top Countries</h3>
          </div>
          <p className="text-sm text-gray-500 mb-6">Where your viewers are</p>
          <div className="space-y-3">
            {topCountries.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <span className="text-sm text-gray-400 w-32 shrink-0 truncate">{d.label}</span>
                <div className="flex-1 h-5 bg-white/5 rounded-md overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400/60 to-blue-600/60 rounded-md transition-all duration-500"
                    style={{ width: `${(d.value / maxCountry) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400 w-10 text-right shrink-0">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best post times */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-semibold text-white">Optimal Post Times</h3>
          </div>
          <p className="text-sm text-gray-500 mb-6">When your audience is most active</p>
          <div className="space-y-3">
            {bestPostTimes.map((t) => (
              <div key={t.day} className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
                <span className="text-sm text-gray-400">{t.day}</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-sm font-medium text-white">{t.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 text-center">Prototype only — analytics shown are sample data, not from a live TikTok account.</p>
    </div>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 hover:border-cyan-500/30 transition-colors">
      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-2">
        {icon}
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
