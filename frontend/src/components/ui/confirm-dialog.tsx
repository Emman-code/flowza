import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from './button';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  isLoading = false,
}: ConfirmDialogProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (isLoading) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity",
          isClosing ? "opacity-0" : "opacity-100"
        )}
        onClick={handleClose}
      />
      
      {/* Dialog */}
      <div
        className={cn(
          "relative w-full max-w-md rounded-lg bg-background p-6 shadow-lg animate-in zoom-in-95 fade-in duration-200",
          isClosing && "animate-out zoom-out-95 fade-out duration-200"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon */}
        <div className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-full",
          variant === 'destructive' 
            ? "bg-red-100 text-red-600" 
            : "bg-blue-100 text-blue-600"
        )}>
          <AlertTriangle className="h-6 w-6" />
        </div>

        {/* Content */}
        <h3 id="dialog-title" className="text-lg font-semibold mb-2">
          {title}
        </h3>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-6">
            {description}
          </p>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            onClick={handleConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Pre-built dialog variants
export function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isLoading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  isLoading?: boolean;
}) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete item"
      description={`Are you sure you want to delete "${itemName}"? This action cannot be undone.`}
      confirmLabel="Delete"
      variant="destructive"
      isLoading={isLoading}
    />
  );
}

export function LogoutConfirmation({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Log out"
      description="Are you sure you want to log out of your account?"
      confirmLabel="Log out"
    />
  );
}

export function DiscardChangesConfirmation({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Discard changes?"
      description="You have unsaved changes that will be lost if you discard them."
      confirmLabel="Discard"
      variant="destructive"
    />
  );
}
