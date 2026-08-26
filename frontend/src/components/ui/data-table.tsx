import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, ChevronsUpDown, ArrowUpDown } from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (item: T) => void;
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (selectedRows: T[]) => void;
  emptyState?: React.ReactNode;
  className?: string;
  stickyHeader?: boolean;
  density?: 'default' | 'compact' | 'comfortable';
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onSort,
  onRowClick,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  emptyState,
  className,
  stickyHeader = false,
  density = 'default',
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    if (!onSort) {
      setSortConfig((prev) => {
        if (prev?.key === key) {
          return prev.direction === 'asc' ? { key, direction: 'desc' } : null;
        }
        return { key, direction: 'asc' };
      });
      return;
    }

    const newDirection = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction: newDirection });
    onSort(key, newDirection);
  };

  const handleSelectAll = (checked: boolean) => {
    if (onSelectionChange) {
      onSelectionChange(checked ? data : []);
    }
  };

  const handleSelectRow = (item: T) => {
    if (!onSelectionChange) return;
    
    const isSelected = selectedRows.some((row) => row.id === item.id);
    if (isSelected) {
      onSelectionChange(selectedRows.filter((row) => row.id !== item.id));
    } else {
      onSelectionChange([...selectedRows, item]);
    }
  };

  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;
    
    const isSorted = sortConfig?.key === column.key;
    if (!isSorted) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    
    return sortConfig?.direction === 'asc' 
      ? <ChevronUp className="ml-2 h-4 w-4" />
      : <ChevronDown className="ml-2 h-4 w-4" />;
  };

  const getDensityClasses = () => {
    switch (density) {
      case 'compact':
        return 'py-2';
      case 'comfortable':
        return 'py-4';
      default:
        return 'py-3';
    }
  };

  if (data.length === 0) {
    return emptyState || (
      <div className={cn("rounded-lg border bg-muted/30 p-12 text-center", className)}>
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border bg-card", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={cn(stickyHeader && "sticky top-0 z-10", "bg-muted/50")}>
            <tr className="border-b">
              {selectable && (
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === data.length && data.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "px-4 text-left text-sm font-medium text-muted-foreground",
                    column.headerClassName,
                    getDensityClasses(),
                    column.sortable && "cursor-pointer hover:bg-muted/80 transition-colors"
                  )}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <div className="flex items-center">
                    {column.title}
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr
                key={item.id}
                className={cn(
                  "border-b last:border-0 transition-colors",
                  onRowClick && "cursor-pointer hover:bg-muted/50",
                  selectedRows.some((row) => row.id === item.id) && "bg-muted/80"
                )}
                onClick={() => onRowClick?.(item)}
              >
                {selectable && (
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedRows.some((row) => row.id === item.id)}
                      onChange={() => handleSelectRow(item)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={cn(
                      "px-4 text-sm",
                      column.className,
                      getDensityClasses()
                    )}
                  >
                    {column.render 
                      ? column.render(item, rowIndex) 
                      : String(item[column.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Pagination component
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 10,
  totalItems,
  className,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;
    
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {totalItems && (
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results
        </div>
      )}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-2 text-muted-foreground">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={cn(
                  "inline-flex items-center justify-center rounded-md border px-3 py-1 text-sm font-medium transition-colors",
                  page === currentPage
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
