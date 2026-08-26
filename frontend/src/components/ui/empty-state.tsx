import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 p-12 text-center",
        className
      )}
    >
      {icon || (
        <div className="mb-4 rounded-full bg-muted p-4">
          <Info className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      )}
      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}

// Pre-built empty state variants for common scenarios
export function NoOrdersEmpty({ onCreateOrder }: { onCreateOrder?: () => void }) {
  return (
    <EmptyState
      icon={<AlertCircle className="h-12 w-12 text-muted-foreground" />}
      title="No orders yet"
      description="Get started by creating your first order. Track inventory, manage shipments, and grow your business."
      action={
        onCreateOrder && (
          <button
            onClick={onCreateOrder}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Create Order
          </button>
        )
      }
    />
  );
}

export function NoProductsEmpty({ onAddProduct }: { onAddProduct?: () => void }) {
  return (
    <EmptyState
      icon={<AlertCircle className="h-12 w-12 text-muted-foreground" />}
      title="No products found"
      description="Add your first product to start managing inventory and tracking stock levels."
      action={
        onAddProduct && (
          <button
            onClick={onAddProduct}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Add Product
          </button>
        )
      }
    />
  );
}

export function NoNotificationsEmpty() {
  return (
    <EmptyState
      icon={<CheckCircle2 className="h-12 w-12 text-muted-foreground" />}
      title="All caught up!"
      description="You have no new notifications at the moment. Check back later for updates."
    />
  );
}

export function SearchNoResults({ query, onClearSearch }: { query: string; onClearSearch?: () => void }) {
  return (
    <EmptyState
      icon={<XCircle className="h-12 w-12 text-muted-foreground" />}
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try adjusting your search terms or filters.`}
      action={
        onClearSearch && (
          <button
            onClick={onClearSearch}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Clear Search
          </button>
        )
      }
    />
  );
}

export function NoDataEmpty({ entity = "data" }: { entity?: string }) {
  return (
    <EmptyState
      icon={<Info className="h-12 w-12 text-muted-foreground" />}
      title={`No ${entity} available`}
      description={`There is currently no ${entity} to display. Please check back later or contact support if you believe this is an error.`}
    />
  );
}
