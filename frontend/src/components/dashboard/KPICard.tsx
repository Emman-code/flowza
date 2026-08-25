import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trendPct?: number | null;
  trendLabel?: string;
  description?: string;
  badgeVariant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  iconBgClass?: string;
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  icon,
  trendPct,
  trendLabel = 'vs prior period',
  description,
  iconBgClass = 'bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
  className = '',
}) => {
  const hasTrend = trendPct !== undefined && trendPct !== null;
  const isPositive = (trendPct ?? 0) > 0;
  const isNegative = (trendPct ?? 0) < 0;

  return (
    <Card
      className={`p-5 transition-all duration-200 hover:shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#12141A] border-neutral-200 dark:border-neutral-800 ${className}`}
      role="region"
      aria-label={`${label}: ${value}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1.5 flex-1 min-w-0 pr-2">
          <p className="text-[10px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider truncate">
            {label}
          </p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-950 dark:text-white tracking-tight">
              {value}
            </h3>
          </div>
        </div>

        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${iconBgClass} shadow-2xs`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      {(hasTrend || description) && (
        <div className="mt-3.5 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
          {hasTrend && (
            <div className="flex items-center gap-1.5 font-medium">
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-mono text-[11px] font-bold ${
                  isPositive
                    ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50'
                    : isNegative
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50'
                    : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                }`}
              >
                {isPositive ? (
                  <TrendingUp size={11} className="inline" />
                ) : isNegative ? (
                  <TrendingDown size={11} className="inline" />
                ) : (
                  <Minus size={11} className="inline" />
                )}
                {isPositive ? '+' : ''}
                {trendPct}%
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-[11px] truncate">
                {trendLabel}
              </span>
            </div>
          )}

          {description && (
            <span className="text-slate-400 dark:text-slate-500 text-[11px] ml-auto">
              {description}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
