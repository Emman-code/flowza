import React from 'react';
import { clsx } from 'clsx';

interface Step {
  title: string;
  description?: string;
}

interface MultiStepFormProps {
  steps: Step[];
  currentStep: number; // 0-indexed
  children: React.ReactNode;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  currentStep,
  children,
}) => {
  return (
    <div className="w-full space-y-6">
      {/* Progress Indicator */}
      <div className="w-full px-2">
        <div className="relative flex justify-between items-center w-full">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2 z-0" />
          
          {/* Active colored line */}
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-amber-500 -translate-y-1/2 z-0 transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / Math.max(1, steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, idx) => {
            const isCompleted = currentStep > idx;
            const isActive = currentStep === idx;
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <div
                  className={clsx(
                    'h-8 w-8 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2 transition-all duration-300 ease-in-out select-none shadow-xs',
                    isCompleted && 'bg-amber-500 border-amber-500 text-neutral-950',
                    isActive && 'bg-white border-amber-500 text-amber-600 dark:bg-neutral-900 ring-4 ring-amber-500/20',
                    !isCompleted && !isActive && 'bg-neutral-100 border-neutral-300 text-neutral-400 dark:bg-neutral-800 dark:border-neutral-700'
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Step labels grid */}
        <div
          className="grid gap-1 mt-3"
          style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
        >
          {steps.map((step, idx) => {
            const isCompleted = currentStep > idx;
            const isActive = currentStep === idx;
            return (
              <div key={idx} className="text-center px-0.5">
                <span
                  className={clsx(
                    'text-xs font-semibold block truncate',
                    isActive && 'text-amber-600 dark:text-amber-400 font-bold',
                    isCompleted && 'text-neutral-700 dark:text-neutral-300',
                    !isActive && !isCompleted && 'text-neutral-400 dark:text-neutral-500'
                  )}
                  title={step.title}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 block truncate hidden md:block">
                    {step.description}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Form Content */}
      <div className="bg-white dark:bg-[#14161F] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-xs">
        {children}
      </div>
    </div>
  );
};
