import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  duration?: number;
}

export function ToastProvider({ 
  children, 
  position = 'top-right',
  duration = 5000 
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>): string => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { ...toast, id, duration: toast.duration ?? duration };
    setToasts((prev) => [...prev, newToast]);
    
    if (newToast.duration !== Infinity) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, newToast.duration);
    }
    
    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (message: string, title?: string) => {
    addToast({ message, title, type: 'success' });
  };

  const error = (message: string, title?: string) => {
    addToast({ message, title, type: 'error' });
  };

  const warning = (message: string, title?: string) => {
    addToast({ message, title, type: 'warning' });
  };

  const info = (message: string, title?: string) => {
    addToast({ message, title, type: 'info' });
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-center':
        return 'top-4 left-1/2 -translate-x-1/2';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 -translate-x-1/2';
      case 'bottom-left':
        return 'bottom-4 left-4';
    }
  };

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'error':
        return <X className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeClasses = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-white border-l-4 border-l-green-600';
      case 'error':
        return 'bg-white border-l-4 border-l-red-600';
      case 'warning':
        return 'bg-white border-l-4 border-l-yellow-600';
      case 'info':
        return 'bg-white border-l-4 border-l-blue-600';
      default:
        return 'bg-white border-l-4 border-l-gray-600';
    }
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, warning, info }}>
      {children}
      <div className={cn('fixed z-50 flex flex-col gap-2 max-w-md', getPositionClasses())}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'flex items-start gap-3 rounded-md shadow-lg p-4 pr-8 animate-in slide-in-from-right fade-in duration-300',
              getTypeClasses(toast.type)
            )}
          >
            <div className="flex-shrink-0 mt-0.5">{getIcon(toast.type)}</div>
            <div className="flex-1 space-y-1">
              {toast.title && (
                <p className="text-sm font-semibold text-gray-900">{toast.title}</p>
              )}
              <p className="text-sm text-gray-600">{toast.message}</p>
              {toast.action && (
                <button
                  onClick={toast.action.onClick}
                  className="mt-2 text-sm font-medium text-primary hover:text-primary/80"
                >
                  {toast.action.label}
                </button>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Hook for easy toast access in components that can't use context
export function useToastHook() {
  const context = React.useContext(ToastContext);
  return context;
}
