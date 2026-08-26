import React from 'react';
import { Loader2, Database } from 'lucide-react';

interface ToolActivityBadgeProps {
  toolName?: string;
  isInvestigating?: boolean;
}

const TOOL_LABELS: Record<string, string> = {
  get_low_stock_products: 'Checking Warehouse Stock Levels...',
  get_out_of_stock_products: 'Scanning Out-of-Stock Products...',
  get_inventory_summary: 'Aggregating Inventory Metrics...',
  get_supplier_overview: 'Analyzing Sales & Revenue Performance...',
  get_vendor_overview: 'Computing Procurement Spend...',
  get_admin_overview: 'Calculating Platform Trade Volume...',
  get_top_products: 'Ranking Top-Selling Products...',
  get_top_suppliers: 'Ranking Top Suppliers...',
  get_active_orders: 'Querying Active Purchase Orders...',
  get_recent_orders: 'Fetching Recent Orders...',
  get_orders_by_status: 'Filtering Order Lifecycle States...',
  get_outstanding_invoices: 'Reviewing Outstanding Invoices...',
  get_recent_invoices: 'Querying Financial Invoices...',
  get_payment_summary: 'Auditing Payment Settlements...',
  search_products: 'Searching Product Catalog...',
};

export const ToolActivityBadge: React.FC<ToolActivityBadgeProps> = ({
  toolName,
  isInvestigating = false,
}) => {
  const label = toolName
    ? TOOL_LABELS[toolName] || `Executing ${toolName}...`
    : 'Flowza AI is reasoning over your business data...';

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-xs font-medium font-mono shadow-2xs">
      {isInvestigating ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600 dark:text-amber-400 shrink-0" />
      ) : (
        <Database className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
      )}
      <span className="truncate">{label}</span>
    </div>
  );
};
