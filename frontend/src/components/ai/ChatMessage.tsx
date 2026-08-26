import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  User,
  Database,
  ArrowRight,
  Package,
  FileText,
  Truck,
  BarChart3,
} from 'lucide-react';
import { ChatMessageItem } from '../../types';

interface ChatMessageProps {
  message: ChatMessageItem;
}

const ACTION_ICONS: Record<string, React.ReactNode> = {
  Package: <Package className="w-3.5 h-3.5" />,
  FileText: <FileText className="w-3.5 h-3.5" />,
  Truck: <Truck className="w-3.5 h-3.5" />,
  BarChart3: <BarChart3 className="w-3.5 h-3.5" />,
  ArrowRight: <ArrowRight className="w-3.5 h-3.5" />,
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const navigate = useNavigate();
  const isUser = message.sender === 'user';

  const renderFormattedContent = (text: string) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-sm font-extrabold text-neutral-950 dark:text-white mt-3 mb-1.5 font-heading">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="text-base font-extrabold text-neutral-950 dark:text-white mt-3.5 mb-2 font-heading">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const itemText = line.substring(2);
        return (
          <div key={idx} className="flex items-start gap-2.5 my-1 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
            <div className="flex-1 min-w-0">{renderBoldAndCode(itemText)}</div>
          </div>
        );
      }
      const matchNum = line.match(/^(\d+)\.\s(.*)$/);
      if (matchNum) {
        const num = matchNum[1];
        const itemText = matchNum[2];
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0 min-w-4">{num}.</span>
            <div className="flex-1 min-w-0">{renderBoldAndCode(itemText)}</div>
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p key={idx} className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 my-1 leading-relaxed">
          {renderBoldAndCode(line)}
        </p>
      );
    });
  };

  const renderBoldAndCode = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-bold text-neutral-950 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={pIdx} className="px-1.5 py-0.5 rounded-md bg-neutral-200/70 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-xs font-mono font-semibold border border-neutral-300/50 dark:border-neutral-700/50">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`flex gap-3 sm:gap-3.5 my-3 sm:my-4 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-neutral-950 dark:bg-amber-500 text-white dark:text-neutral-950 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
          <Bot className="w-4 h-4" />
        </div>
      )}

      {/* Message Bubble Container */}
      <div
        className={`max-w-[90%] sm:max-w-[82%] flex flex-col ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`p-3.5 sm:p-4 rounded-2xl shadow-2xs text-xs sm:text-sm ${
            isUser
              ? 'bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 rounded-br-xs'
              : message.isError
              ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 rounded-bl-xs'
              : 'bg-[#F7F6F2] dark:bg-[#151822] border border-neutral-200/90 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-xs'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed font-medium">{message.text}</p>
          ) : (
            <div className="prose-sm max-w-none space-y-1">
              {renderFormattedContent(message.text)}
            </div>
          )}
        </div>

        {/* Data Sources Attribution Badge */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-neutral-500 font-mono">
            <Database className="w-3 h-3 text-neutral-400" />
            <span>Consulted Sources:</span>
            <div className="flex flex-wrap gap-1">
              {message.sources.map((s, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[10px] font-mono font-semibold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Action Navigation Chips */}
        {!isUser && message.suggested_actions && message.suggested_actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2.5">
            {message.suggested_actions.map((act, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => navigate(act.path)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 text-amber-800 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800 text-xs font-mono font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                {ACTION_ICONS[act.icon || 'ArrowRight'] || <ArrowRight className="w-3 h-3" />}
                <span>{act.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1 px-1 font-mono">
          {message.timestamp}
        </span>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-neutral-800 dark:bg-neutral-700 flex items-center justify-center text-white shrink-0 shadow-2xs mt-0.5">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
