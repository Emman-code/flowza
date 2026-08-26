import React, { useState, useEffect, useCallback } from 'react';
import inventoryService from '../../services/inventoryService';
import type { InventoryRecord } from '../../types';
import { Button } from '@/components/ui/button';
import { SkeletonTable } from '@/components/ui/skeleton';
import { SearchNoResults, NoDataEmpty } from '@/components/ui/empty-state';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useToast } from '@/components/ui/toast';
import { DataTable, type Column, Pagination } from '@/components/ui/data-table';
import { Search, X, Package, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

// ─── Status helpers ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
    healthy: { label: 'In Stock', variant: 'success' as const, icon: CheckCircle2 },
    low_stock: { label: 'Low Stock', variant: 'warning' as const, icon: AlertCircle },
    out_of_stock: { label: 'Out of Stock', variant: 'destructive' as const, icon: Package },
};

function stockStatus(status: string) {
    return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.healthy;
}

// ─── Adjust Modal ──────────────────────────────────────────────────────────────
interface AdjustModalProps {
    record: InventoryRecord;
    onClose: () => void;
    onSuccess: () => void;
}

function AdjustModal({ record, onClose, onSuccess }: AdjustModalProps) {
    const [adjustment, setAdjustment] = useState<string>('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const delta = parseInt(adjustment || '0', 10);
    const newQty = record.quantity_on_hand + delta;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!adjustment || isNaN(delta) || delta === 0) {
            toast.error('Please enter a non-zero adjustment value.');
            return;
        }
        setLoading(true);
        try {
            await inventoryService.adjustStock(record.product_id, { adjustment: delta, reason: reason || undefined });
            toast.success('Stock adjusted successfully', `Updated ${record.product?.name}`);
            onSuccess();
        } catch (err: any) {
            toast.error(err?.response?.data?.error?.message ?? 'Adjustment failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ConfirmDialog
            isOpen={true}
            onClose={onClose}
            onConfirm={handleSubmit}
            title="Adjust Stock"
            description={`Current on-hand: ${record.quantity_on_hand} ${record.product?.unit}`}
            confirmLabel={loading ? 'Adjusting...' : 'Apply Adjustment'}
            isLoading={loading}
        >
            <div className="space-y-4 mt-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Adjustment (+ add / − remove)</label>
                    <input
                        type="number"
                        value={adjustment}
                        onChange={(e) => setAdjustment(e.target.value)}
                        placeholder="e.g. 50 or -10"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        autoFocus
                    />
                </div>
                {adjustment !== '' && !isNaN(delta) && (
                    <div className={`rounded-md border p-3 ${newQty < 0 ? 'border-red-500 bg-red-50' : 'border-indigo-500 bg-indigo-50'}`}>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">New on-hand:</span>
                            <span className={`font-bold ${newQty < 0 ? 'text-red-600' : 'text-indigo-600'}`}>
                                {newQty} {record.product?.unit}
                            </span>
                        </div>
                    </div>
                )}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Reason (optional)</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="e.g. Stock received, Damaged, Counted"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>
        </ConfirmDialog>
    );
}

// ─── Edit Levels Modal ─────────────────────────────────────────────────────────
interface EditLevelsModalProps {
    record: InventoryRecord;
    onClose: () => void;
    onSuccess: () => void;
}

function EditLevelsModal({ record, onClose, onSuccess }: EditLevelsModalProps) {
    const [onHand, setOnHand] = useState(String(record.quantity_on_hand));
    const [reorderLevel, setReorderLevel] = useState(String(record.reorder_level));
    const [reorderQty, setReorderQty] = useState(String(record.reorder_quantity));
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await inventoryService.updateInventory(record.product_id, {
                quantity_on_hand: parseInt(onHand, 10),
                reorder_level: parseInt(reorderLevel, 10),
                reorder_quantity: parseInt(reorderQty, 10),
            });
            toast.success('Inventory levels updated successfully', `Updated ${record.product?.name}`);
            onSuccess();
        } catch (err: any) {
            toast.error(err?.response?.data?.error?.message ?? 'Update failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ConfirmDialog
            isOpen={true}
            onClose={onClose}
            onConfirm={handleSubmit}
            title="Edit Inventory Levels"
            description={`Editing: ${record.product?.name}`}
            confirmLabel={loading ? 'Saving...' : 'Save Changes'}
            isLoading={loading}
        >
            <div className="space-y-4 mt-4">
                {[
                    { label: 'Quantity On Hand', value: onHand, set: setOnHand, help: 'Physical stock count' },
                    { label: 'Reorder Level', value: reorderLevel, set: setReorderLevel, help: 'Alert when available drops below this' },
                    { label: 'Reorder Quantity', value: reorderQty, set: setReorderQty, help: 'Typical batch size to order' },
                ].map((field) => (
                    <div key={field.label} className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">{field.label}</label>
                        <input
                            type="number"
                            min="0"
                            value={field.value}
                            onChange={(e) => field.set(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-xs text-muted-foreground">{field.help}</span>
                    </div>
                ))}
            </div>
        </ConfirmDialog>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function InventoryManagement() {
    const [inventory, setInventory] = useState<InventoryRecord[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState<'all' | 'healthy' | 'low_stock' | 'out_of_stock'>('all');
    const [search, setSearch] = useState('');
    const [adjustTarget, setAdjustTarget] = useState<InventoryRecord | null>(null);
    const [editTarget, setEditTarget] = useState<InventoryRecord | null>(null);
    const toast = useToast();

    const fetchInventory = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await inventoryService.listMyInventory(1, 100);
            setInventory(res.data.items);
            setTotal(res.data.total);
        } catch (err: any) {
            const errorMsg = err?.response?.data?.error?.message ?? 'Failed to load inventory.';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => { fetchInventory(); }, [fetchInventory]);

    const filtered = inventory.filter(inv => {
        const matchesFilter = filter === 'all' || inv.stock_status === filter;
        const matchesSearch = !search ||
            inv.product?.name.toLowerCase().includes(search.toLowerCase()) ||
            (inv.product?.sku ?? '').toLowerCase().includes(search.toLowerCase()) ||
            (inv.product?.category ?? '').toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Summary counts
    const counts = {
        all: inventory.length,
        healthy: inventory.filter(i => i.stock_status === 'healthy').length,
        low_stock: inventory.filter(i => i.stock_status === 'low_stock').length,
        out_of_stock: inventory.filter(i => i.stock_status === 'out_of_stock').length,
    };

    const summaryCards = [
        { key: 'all' as const, label: 'Total Products', icon: Package, variant: 'default' as const },
        { key: 'healthy' as const, label: 'In Stock', icon: CheckCircle2, variant: 'success' as const },
        { key: 'low_stock' as const, label: 'Low Stock', icon: AlertCircle, variant: 'warning' as const },
        { key: 'out_of_stock' as const, label: 'Out of Stock', icon: TrendingUp, variant: 'destructive' as const },
    ];

    // Table columns definition
    const columns: Column<InventoryRecord>[] = [
        {
            key: 'product',
            title: 'Product',
            render: (item) => (
                <div>
                    <div className="font-semibold text-foreground">{item.product?.name ?? '—'}</div>
                    <div className="text-xs text-muted-foreground">{item.product?.unit}</div>
                </div>
            ),
        },
        {
            key: 'sku',
            title: 'SKU',
            render: (item) => (
                <span className="font-mono text-xs text-muted-foreground">
                    {item.product?.sku ?? <span className="opacity-40">—</span>}
                </span>
            ),
        },
        {
            key: 'category',
            title: 'Category',
            render: (item) => (
                <span className="text-sm text-muted-foreground">
                    {item.product?.category ?? <span className="opacity-40">—</span>}
                </span>
            ),
        },
        {
            key: 'quantity_on_hand',
            title: 'On Hand',
            render: (item) => <span className="font-semibold">{item.quantity_on_hand}</span>,
        },
        {
            key: 'quantity_reserved',
            title: 'Reserved',
            render: (item) => <span className="text-amber-500">{item.quantity_reserved}</span>,
        },
        {
            key: 'available_quantity',
            title: 'Available',
            render: (item) => (
                <span className={`font-bold ${item.available_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.available_quantity}
                </span>
            ),
        },
        {
            key: 'reorder_level',
            title: 'Reorder At',
            render: (item) => <span className="text-muted-foreground">{item.reorder_level}</span>,
        },
        {
            key: 'stock_status',
            title: 'Status',
            render: (item) => {
                const status = stockStatus(item.stock_status);
                const Icon = status.icon;
                return (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-${status.variant}-100 text-${status.variant}-700`}>
                        <Icon className="h-3 w-3" />
                        {status.label}
                    </span>
                );
            },
        },
        {
            key: 'actions',
            title: 'Actions',
            render: (item) => (
                <div className="flex gap-2">
                    <Button
                        size="xs"
                        variant="outline"
                        onClick={() => setAdjustTarget(item)}
                    >
                        ± Adjust
                    </Button>
                    <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => setEditTarget(item)}
                    >
                        ✎ Edit
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-8 max-w-[1280px] mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                        Inventory Management
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {total} product{total !== 1 ? 's' : ''} · Track, adjust, and manage your stock levels
                    </p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {summaryCards.map((card) => {
                    const Icon = card.icon;
                    const isActive = filter === card.key;
                    return (
                        <button
                            key={card.key}
                            onClick={() => setFilter(card.key)}
                            className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                                isActive 
                                    ? `border-${card.variant} bg-${card.variant}/10 ring-2 ring-${card.variant}` 
                                    : 'border-border bg-card hover:bg-accent'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Icon className={`h-5 w-5 ${isActive ? `text-${card.variant}` : 'text-muted-foreground'}`} />
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    {card.label}
                                </span>
                            </div>
                            <div className={`text-3xl font-bold ${isActive ? `text-${card.variant}` : 'text-foreground'}`}>
                                {counts[card.key]}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search by product name, SKU, or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {search && (
                    <button
                        onClick={() => setSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin h-9 w-9 border-4 border-indigo-200 border-t-indigo-600 rounded-full" />
                    <p className="text-muted-foreground mt-4">Loading inventory...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {error}
                </div>
            ) : filtered.length === 0 ? (
                search || filter !== 'all' ? (
                    <SearchNoResults query={search || filter} onClearSearch={() => { setSearch(''); setFilter('all'); }} />
                ) : (
                    <NoDataEmpty entity="products" />
                )
            ) : (
                <div className="space-y-4">
                    <DataTable
                        data={filtered}
                        columns={columns}
                        stickyHeader
                        density="comfortable"
                        emptyState={<NoDataEmpty entity="products" />}
                    />
                    <Pagination
                        currentPage={1}
                        totalPages={Math.ceil(filtered.length / 20)}
                        onPageChange={() => {}}
                        totalItems={filtered.length}
                    />
                </div>
            )}

            {/* Modals */}
            {adjustTarget && (
                <AdjustModal
                    record={adjustTarget}
                    onClose={() => setAdjustTarget(null)}
                    onSuccess={() => { setAdjustTarget(null); fetchInventory(); }}
                />
            )}
            {editTarget && (
                <EditLevelsModal
                    record={editTarget}
                    onClose={() => setEditTarget(null)}
                    onSuccess={() => { setEditTarget(null); fetchInventory(); }}
                />
            )}
        </div>
    );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
}
