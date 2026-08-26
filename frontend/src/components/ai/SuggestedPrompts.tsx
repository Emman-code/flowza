import React from 'react';
import {
  AlertTriangle,
  TrendingUp,
  Clock,
  DollarSign,
  ShoppingCart,
  Users,
  FileText,
  Truck,
  BarChart2,
  Building,
  PieChart,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { AISuggestedQuestion } from '../../types';

interface SuggestedPromptsProps {
  questions: AISuggestedQuestion[];
  onSelectPrompt: (question: string) => void;
  isLoading?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  AlertTriangle: <AlertTriangle className="w-4 h-4 text-amber-500" />,
  TrendingUp: <TrendingUp className="w-4 h-4 text-emerald-500" />,
  Clock: <Clock className="w-4 h-4 text-indigo-500" />,
  DollarSign: <DollarSign className="w-4 h-4 text-emerald-500" />,
  ShoppingCart: <ShoppingCart className="w-4 h-4 text-blue-500" />,
  Users: <Users className="w-4 h-4 text-purple-500" />,
  FileText: <FileText className="w-4 h-4 text-rose-500" />,
  Truck: <Truck className="w-4 h-4 text-sky-500" />,
  BarChart2: <BarChart2 className="w-4 h-4 text-emerald-500" />,
  Building: <Building className="w-4 h-4 text-violet-500" />,
  PieChart: <PieChart className="w-4 h-4 text-amber-500" />,
};

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  questions,
  onSelectPrompt,
  isLoading = false,
}) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Suggested Inquiries
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
        {questions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            disabled={isLoading}
            onClick={() => onSelectPrompt(q.question)}
            className="group relative flex items-start gap-3 p-3.5 text-left rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#F7F6F2]/60 dark:bg-[#151822] hover:border-amber-500/50 dark:hover:border-amber-500/40 transition-all duration-150 shadow-2xs hover:shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer h-full"
          >
            <div className="p-2 rounded-lg bg-white dark:bg-neutral-800/90 border border-neutral-200/70 dark:border-neutral-700/70 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-colors shrink-0 mt-0.5 shadow-2xs">
              {ICON_MAP[q.icon] || <Sparkles className="w-4 h-4 text-amber-500" />}
            </div>
            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase rounded bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 group-hover:text-amber-700 dark:group-hover:text-amber-400 group-hover:bg-amber-500/10 transition-colors">
                  {q.category}
                </span>
              </div>
              <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug">
                {q.question}
              </p>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 absolute top-3.5 right-3.5 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};
