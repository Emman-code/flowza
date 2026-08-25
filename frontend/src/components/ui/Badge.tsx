import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'emerald' | 'indigo' | 'cyan' | 'amber' | 'destructive' | 'outline' | 'success' | 'warning' | 'accent' | 'neutral';
  dot?: boolean;
  ping?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'amber',
  dot = false,
  ping = false,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight select-none border transition-colors';
  
  const variants: Record<string, string> = {
    primary: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30',
    amber: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30',
    warning: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
    success: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
    indigo: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20',
    accent: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30',
    cyan: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
    destructive: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20',
    secondary: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700/60',
    neutral: 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border-neutral-200/80 dark:border-neutral-700/80',
    outline: 'text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 bg-transparent',
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, variants[variant] || variants.emerald, className))}
      {...props}
    >
      {(dot || ping) && (
        <span className="relative flex h-1.5 w-1.5">
          {ping && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          )}
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
        </span>
      )}
      {children}
    </span>
  );
};
