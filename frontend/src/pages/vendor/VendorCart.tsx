import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Building2,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  PackageCheck,
  AlertTriangle,
  FileText,
  Calendar,
  MapPin,
  CheckCircle2,
  X,
  Loader2,
  Sparkles,
  Info,
} from 'lucide-react';
import cartService from '../../services/cartService';
import type { Cart, CartItem, CheckoutResult } from '../../types';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Dialog } from '../../components/ui/Dialog';
import { toast } from 'sonner';

// ─── Checkout Confirmation Modal ──────────────────────────────────────────────
interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCarts: Cart[];
  onConfirm: (cartIds: string[], deliveryDate?: string, deliveryAddress?: string, notes?: string) => Promise<void>;
  isLoading: boolean;
}

function CheckoutModal({ isOpen, onClose, targetCarts, onConfirm, isLoading }: CheckoutModalProps) {
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  const totalItems = targetCarts.reduce((sum, c) => sum + c.item_count, 0);
  const totalSubtotal = targetCarts.reduce((sum, c) => sum + Number(c.subtotal), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onConfirm(
      targetCarts.map((c) => c.id),
      deliveryDate || undefined,
      deliveryAddress || undefined,
      notes || undefined
    );
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={targetCarts.length > 1 ? `Review & Place ${targetCarts.length} Purchase Orders` : 'Review & Place Purchase Order'}
      description="Review order specifications before transmitting POs to wholesale suppliers."
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5 pt-1">
        {/* Supplier breakdown summary */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {targetCarts.map((cart) => (
            <div
              key={cart.id}
              className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#14161F] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <Building2 size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                    {cart.supplier?.company_name ?? 'Wholesale Supplier'}
                  </h4>
                  <p className="text-xxs text-neutral-500 dark:text-neutral-400 mt-0.5 font-mono">
                    {cart.item_count} SKU{cart.item_count !== 1 ? 's' : ''} • Subtotal: ₹{Number(cart.subtotal).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-xxs font-mono uppercase font-semibold">
                PO Generation
              </Badge>
            </div>
          ))}
        </div>

        {/* Total Financial Summary Box */}
        <div className="p-4 rounded-xl bg-neutral-950 text-white dark:bg-[#12141A] border border-neutral-800 space-y-2 font-mono">
          <div className="flex justify-between text-xs text-neutral-400">
            <span>Total Item Count</span>
            <span className="text-white font-bold">{totalItems} units</span>
          </div>
          <div className="flex justify-between text-xs text-neutral-400">
            <span>Taxable PO Value</span>
            <span className="text-white font-bold">
              ₹{totalSubtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="border-t border-neutral-800 pt-2 flex justify-between items-center">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              Total Procurement Amount
            </span>
            <span className="text-lg font-black text-amber-400">
              ₹{totalSubtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Fulfillment fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Expected Delivery Date (Optional)
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full h-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161F] px-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Delivery Dock / Location (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Warehouse Dock #3, Main Gate"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full h-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161F] px-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
            Purchase Order Instructions / Notes (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="Special packing notes, batch constraints, or delivery timing..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161F] p-2.5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
          <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isLoading} className="font-mono text-xs">
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={isLoading}
            className="bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 font-mono font-bold text-xs px-5"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Transmitting POs...
              </>
            ) : (
              <>
                Confirm & Place Order ({targetCarts.length} PO{targetCarts.length !== 1 ? 's' : ''}) →
              </>
            )}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

// ─── Order Placement Success Modal ───────────────────────────────────────────
interface SuccessModalProps {
  results: CheckoutResult[];
  onClose: () => void;
}

function CheckoutSuccessModal({ results, onClose }: SuccessModalProps) {
  const navigate = useNavigate();
  const totalAmount = results.reduce((sum, r) => sum + Number(r.total), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#12141A] border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center space-y-2">
          <div className="h-14 w-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={28} />
          </div>
          <h2 className="text-xl font-extrabold text-neutral-950 dark:text-white font-heading">
            {results.length > 1 ? `${results.length} Purchase Orders Placed!` : 'Purchase Order Transmitted!'}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
            Stock reservations have been locked. Suppliers have received real-time notifications for fulfillment.
          </p>
        </div>

        {/* List of generated POs */}
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {results.map((res, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#14161F] flex items-center justify-between"
            >
              <div>
                <span className="text-xxs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                  {res.order_number}
                </span>
                <p className="text-xs font-bold text-neutral-900 dark:text-white mt-0.5">{res.supplier_company}</p>
                <p className="text-xxs text-neutral-500 font-mono mt-0.5">
                  {res.item_count} items • Status: <span className="uppercase text-amber-600 dark:text-amber-400 font-semibold">{res.status}</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black font-mono text-neutral-950 dark:text-white">
                  ₹{Number(res.total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Summary */}
        <div className="p-3.5 rounded-xl bg-neutral-950 text-white dark:bg-[#181B24] border border-neutral-800 flex justify-between items-center font-mono">
          <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Total Order Value</span>
          <span className="text-base font-black text-amber-400">
            ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 font-mono text-xs"
          >
            Continue Procurement
          </Button>
          <Button
            onClick={() => {
              onClose();
              navigate('/dashboard/vendor/orders');
            }}
            className="flex-1 bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 font-mono font-bold text-xs"
          >
            <FileText size={14} className="mr-1.5" /> View Order History
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Cart Page Component ────────────────────────────────────────────────
export default function VendorCart() {
  const navigate = useNavigate();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Checkout modal states
  const [checkoutTargetCarts, setCheckoutTargetCarts] = useState<Cart[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccessResults, setCheckoutSuccessResults] = useState<CheckoutResult[] | null>(null);

  // Fetch all carts
  const fetchCarts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await cartService.listCarts();
      setCarts(res.data.carts);
    } catch (err: any) {
      setError(err?.response?.data?.error?.message ?? 'Failed to load procurement cart.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  // Quantity updates
  const handleQuantityChange = async (itemId: string, qty: number) => {
    try {
      const res = await cartService.updateItem(itemId, qty);
      setCarts((prev) => prev.map((c) => (c.id === res.data.id ? res.data : c)));
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message ?? 'Failed to update item quantity.');
    }
  };

  // Remove item
  const handleRemoveItem = async (itemId: string) => {
    try {
      const res = await cartService.removeItem(itemId);
      toast.success('Item removed from cart');
      setCarts((prev) => {
        const updatedCart = res.data;
        if (updatedCart.item_count === 0) {
          return prev.filter((c) => c.id !== updatedCart.id);
        }
        return prev.map((c) => (c.id === updatedCart.id ? updatedCart : c));
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message ?? 'Failed to remove item.');
    }
  };

  // Open checkout for a single cart
  const handleOpenSingleCheckout = (cart: Cart) => {
    setCheckoutTargetCarts([cart]);
    setIsCheckoutModalOpen(true);
  };

  // Open checkout for all carts
  const handleOpenAllCheckout = () => {
    if (carts.length === 0) return;
    setCheckoutTargetCarts(carts);
    setIsCheckoutModalOpen(true);
  };

  // Execute checkout
  const handleExecuteCheckout = async (
    cartIds: string[],
    deliveryDate?: string,
    deliveryAddress?: string,
    notes?: string
  ) => {
    setCheckoutLoading(true);
    const results: CheckoutResult[] = [];
    const failedErrors: string[] = [];

    try {
      for (const cartId of cartIds) {
        try {
          const res = await cartService.checkout(cartId, {
            delivery_date: deliveryDate,
            delivery_address: deliveryAddress,
            notes: notes,
          });
          results.push(res.data);
        } catch (err: any) {
          const msg = err?.response?.data?.error?.message ?? `Failed to checkout cart ${cartId}`;
          failedErrors.push(msg);
        }
      }

      if (results.length > 0) {
        setIsCheckoutModalOpen(false);
        setCheckoutSuccessResults(results);
        await fetchCarts();
      }

      if (failedErrors.length > 0) {
        toast.error(`Checkout note: ${failedErrors.join('; ')}`);
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  const totalItems = carts.reduce((sum, c) => sum + c.item_count, 0);
  const grandTotal = carts.reduce((sum, c) => sum + Number(c.subtotal), 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 pb-16">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-heading flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-amber-500" />
              Procurement Cart
            </h1>
            {carts.length > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xxs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                {carts.length} Supplier Group{carts.length !== 1 ? 's' : ''} • {totalItems} Item{totalItems !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Review your procurement lines, adjust quantities, and transmit purchase orders to wholesale suppliers.
          </p>
        </div>

        {/* Global Summary & Checkout All Button */}
        {carts.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="p-2.5 px-4 rounded-xl bg-white dark:bg-[#12141A] border border-neutral-200 dark:border-neutral-800 text-right font-mono shadow-xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Grand Total</span>
              <span className="text-base font-black text-neutral-950 dark:text-white">
                ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <Button
              onClick={handleOpenAllCheckout}
              className="bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 font-mono font-bold text-xs h-11 px-5 shadow-xs"
            >
              Checkout All ({carts.length} PO{carts.length !== 1 ? 's' : ''}) →
            </Button>
          </div>
        )}
      </div>

      {/* ── Explainer Banner ────────────────────────────────────────── */}
      {carts.length > 0 && (
        <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-[#14161F]/80 flex items-start gap-3 text-xs text-neutral-600 dark:text-neutral-300">
          <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-neutral-950 dark:text-white">Multi-Supplier Procurement Notice:</span>{' '}
            Products from different wholesale suppliers are grouped into separate supplier purchase orders. You can
            checkout each supplier individually or click <strong>"Checkout All"</strong> to issue all POs at once.
          </div>
        </div>
      )}

      {/* ── Content States ─────────────────────────────────────────── */}
      {loading ? (
        <div className="p-16 text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto" />
          <p className="text-xs font-mono text-neutral-400">Loading procurement cart...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 text-xs text-rose-700 dark:text-rose-300">
          {error}
        </div>
      ) : carts.length === 0 ? (
        /* Empty Cart State */
        <div className="p-16 text-center rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-neutral-100 dark:bg-[#181B24] border border-neutral-200 dark:border-neutral-800 text-neutral-400 flex items-center justify-center mx-auto shadow-inner">
            <ShoppingCart size={28} />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-white font-heading">
              Your procurement cart is empty
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
              Browse verified wholesale catalogs to add items, compare prices, and draft purchase orders.
            </p>
          </div>
          <Button
            onClick={() => navigate('/dashboard/vendor/products')}
            className="bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 font-mono font-bold text-xs px-6"
          >
            Browse Wholesale Catalog →
          </Button>
        </div>
      ) : (
        /* Supplier Carts List */
        <div className="space-y-6">
          {carts.map((cart) => (
            <Card
              key={cart.id}
              className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] overflow-hidden rounded-2xl shadow-xs"
            >
              {/* Supplier Header */}
              <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#151720] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-950 dark:text-white font-heading flex items-center gap-2">
                      {cart.supplier?.company_name ?? 'Wholesale Supplier'}
                    </h3>
                    <p className="text-xxs text-neutral-500 dark:text-neutral-400 mt-0.5 font-mono">
                      Supplier Order Group • {cart.item_count} SKU{cart.item_count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {cart.has_price_changes && (
                  <Badge variant="amber" className="text-xxs font-mono font-bold">
                    <AlertTriangle size={12} className="mr-1 text-amber-500" /> Price Updated by Supplier
                  </Badge>
                )}
              </div>

              {/* Items Table / List */}
              <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60 p-2 sm:p-4">
                {cart.items.map((item) => {
                  const product = item.product;
                  const currentPrice = Number(item.current_price ?? item.unit_price);
                  const lineTotal = currentPrice * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 rounded-xl transition-all"
                    >
                      {/* Product details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                          {product?.name ?? 'Wholesale Product'}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xxs text-neutral-500 dark:text-neutral-400 font-mono">
                          {product?.sku && (
                            <span className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-600 dark:text-neutral-300">
                              SKU: {product.sku}
                            </span>
                          )}
                          <span>Unit: {product?.unit ?? 'unit'}</span>
                          {item.price_changed && (
                            <span className="text-amber-600 line-through">
                              was ₹{Number(item.unit_price).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="text-right sm:min-w-[100px] font-mono">
                        <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                          ₹{currentPrice.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-neutral-400">per {product?.unit ?? 'unit'}</span>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              handleQuantityChange(item.id, item.quantity - 1);
                            }
                          }}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181B24] flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-10 text-center font-mono font-bold text-xs text-neutral-950 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181B24] flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Line Subtotal */}
                      <div className="text-right sm:min-w-[110px] font-mono">
                        <span className="text-xs font-black text-neutral-950 dark:text-white">
                          ₹{lineTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="h-8 w-8 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center transition-colors cursor-pointer self-end sm:self-center"
                        title="Remove product"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Cart Footer */}
              <div className="p-4 sm:p-5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-[#14161F]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                    Supplier Subtotal:
                  </span>
                  <span className="text-base font-black text-neutral-950 dark:text-white">
                    ₹{Number(cart.subtotal).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/dashboard/vendor/products')}
                    className="text-xs font-mono"
                  >
                    + Add More Items
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleOpenSingleCheckout(cart)}
                    className="bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 font-mono font-bold text-xs px-4"
                  >
                    Checkout {cart.supplier?.company_name ?? 'Supplier'} →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── Checkout Confirmation Modal ────────────────────────────── */}
      {isCheckoutModalOpen && (
        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          targetCarts={checkoutTargetCarts}
          onConfirm={handleExecuteCheckout}
          isLoading={checkoutLoading}
        />
      )}

      {/* ── Order Placement Success Modal ──────────────────────────── */}
      {checkoutSuccessResults && (
        <CheckoutSuccessModal
          results={checkoutSuccessResults}
          onClose={() => setCheckoutSuccessResults(null)}
        />
      )}
    </div>
  );
}
