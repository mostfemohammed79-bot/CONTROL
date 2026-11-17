import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: ReactNode;
}

export function StatCard({ label, value, change, positive, icon }: StatCardProps) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 hover:border-cyan-500/30 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
          {icon}
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-md ${
            positive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}
        >
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
