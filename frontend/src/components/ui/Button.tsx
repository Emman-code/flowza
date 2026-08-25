import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'indigo' | 'outline' | 'ghost' | 'destructive' | 'glass' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  trailingIcon?: React.ReactNode;
  iconCircle?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, trailingIcon, iconCircle = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'group relative inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none active:scale-[0.98]';
    
    const variants = {
      primary: 'bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-neutral-950 shadow-xs border border-neutral-800 dark:border-amber-400/30',
      indigo: 'bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-neutral-950 shadow-xs',
      secondary: 'bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 shadow-xs',
      outline: 'border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 shadow-xs',
      ghost: 'bg-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-neutral-100',
      glass: 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md text-neutral-900 dark:text-white hover:bg-white dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 shadow-xs',
      destructive: 'bg-red-600 hover:bg-red-500 text-white shadow-xs border border-red-500/20',
      link: 'bg-transparent text-amber-600 dark:text-amber-400 underline-offset-4 hover:underline p-0 focus:ring-transparent focus:ring-offset-0',
    };

    const sizes = {
      sm: 'min-h-[34px] px-3 py-1 text-xs tracking-tight gap-1.5',
      md: 'min-h-[42px] px-4 py-2 text-sm tracking-tight gap-2',
      lg: 'min-h-[48px] px-6 py-2.5 text-base tracking-tight gap-2.5',
      xl: 'min-h-[54px] px-8 py-3 text-base font-semibold tracking-tight gap-3',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : null}
        
        <span>{children}</span>

        {trailingIcon && (
          iconCircle ? (
            <span className="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              {trailingIcon}
            </span>
          ) : (
            <span className="transition-transform group-hover:translate-x-0.5">
              {trailingIcon}
            </span>
          )
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
