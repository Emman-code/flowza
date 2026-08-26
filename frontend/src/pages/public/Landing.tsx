import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Store,
  Truck,
  ShieldCheck,
  Receipt,
  Boxes,
  FileText,
  ChevronDown,
  Sparkles,
  ArrowDown,
  Clock,
  Building2,
  X,
  Users,
} from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [activeSimStep, setActiveSimStep] = useState<number>(2);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const simulationSteps = [
    {
      id: 1,
      stepNum: '01',
      phase: 'PLACE',
      title: 'Retailer Places Order',
      actor: 'Retailer (Fresh Mart)',
      action: 'Purchase order #FZ-2084 submitted with 20 bags Basmati Rice + 6 tins Sunflower Oil.',
      status: 'Pending Supplier Review',
      inventory: '100 On-Hand • 20 Requested',
    },
    {
      id: 2,
      stepNum: '02',
      phase: 'CONFIRM',
      title: 'Supplier Confirms Availability',
      actor: 'Wholesale Supplier (Apex FMCG)',
      action: 'Supplier confirms quantities. System atomically locks 20 bags and 6 tins in inventory reserve.',
      status: 'Stock Reserved & Confirmed',
      inventory: '100 On-Hand • 20 Reserved • 80 Available',
    },
    {
      id: 3,
      stepNum: '03',
      phase: 'FULFIL',
      title: 'Supplier Prepares & Dispatches',
      actor: 'Supplier Logistics Team',
      action: 'Order is packed and dispatched. Both parties track live fulfilment state in their shared workspace.',
      status: 'Dispatched in Transit',
      inventory: '100 On-Hand • 20 Reserved • 80 Available',
    },
    {
      id: 4,
      stepNum: '04',
      phase: 'CLOSE',
      title: 'Delivery & GST Invoice Ready',
      actor: 'Retailer Receiving & Accounts',
      action: 'Retailer confirms receipt. Stock balances settle permanently and GST-ready invoice PDF is generated.',
      status: 'Completed & Invoiced',
      inventory: '80 On-Hand • 0 Reserved • 80 Available',
    },
  ];

  const comparisonRows = [
    {
      problem: 'Orders scattered across WhatsApp chats & voice notes',
      solution: 'Structured purchase orders with clean SKUs, units & prices',
    },
    {
      problem: 'Unclear stock availability & duplicate sales risk',
      solution: 'Confirmed inventory reservations before dispatch',
    },
    {
      problem: 'Manual invoice preparation & tax calculation errors',
      solution: 'GST-ready invoice records with automatic state tax rules',
    },
    {
      problem: 'Repeated status calls ("Where is my delivery?")',
      solution: 'Shared live order status from confirmation to delivery',
    },
    {
      problem: 'Disputes over delivered quantities and billing',
      solution: 'Single auditable order & invoice record for both parties',
    },
  ];

  const faqs = [
    {
      q: 'Do I need to find new suppliers on Flowza, or can I use my existing partners?',
      a: 'You can start immediately with your existing trading partners. Retailers and wholesale suppliers invite their current partners to coordinate purchase orders in one shared workspace without any new network setup.',
    },
    {
      q: 'How does stock reservation prevent duplicate sales?',
      a: 'The moment a wholesale supplier confirms an order, the required line items are locked in reserve in the database. This prevents other buyers from ordering stock that is already committed for fulfillment.',
    },
    {
      q: 'Are the invoices GST-ready for Indian business filing?',
      a: 'Yes. Invoices include verified 15-character GSTINs, supplier/retailer business details, line item HSN details, and calculated CGST/SGST or IGST breakdowns, available for instant PDF export.',
    },
    {
      q: 'How does the grounded AI Assistant help my business?',
      a: 'The AI assistant is a tenant-scoped, read-only copilot that queries live database records to answer practical questions such as "Which items are low in stock?", "Show me active orders from Apex FMCG", or "List unpaid invoices this month" without manual spreadsheet lookups.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] dark:bg-[#0D0E12] text-[#111216] dark:text-[#F8F8FA] selection:bg-amber-500/20 selection:text-amber-950 dark:selection:text-amber-200 font-sans">
      {/* Top Navigation */}
      <Navbar />

      {/* ========================================================= */}
      {/* 1. HERO SECTION — ASYMMETRICAL SPLIT SCREEN               */}
      {/* ========================================================= */}
      <section className="pt-24 md:pt-30 pb-12 md:pb-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT 48%: Core Positioning Narrative */}
          <div className="lg:col-span-5 space-y-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
              <span className="w-2 h-2 bg-amber-500 rounded-xs" />
              <span>Retailer & Wholesale Supplier Workspace</span>
            </div>

            {/* Clear Primary Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
              One wholesale order. Both sides in sync.
            </h1>

            {/* Practical Value Copy */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Flowza replaces WhatsApp messages, spreadsheets, and phone calls with a shared purchase-order workflow. Retailers place orders, wholesale suppliers confirm availability, and both sides track stock, fulfilment, and GST-ready invoices in one place.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 rounded-lg text-xs sm:text-sm font-bold font-mono bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
              >
                <span>Choose your workspace →</span>
              </button>

              <a
                href="#comparison"
                className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white inline-flex items-center gap-1.5 transition-colors px-2 py-2"
              >
                <span>Why Flowza</span>
                <ArrowDown size={13} />
              </a>
            </div>

            {/* Role Demo Shortcuts */}
            <div className="flex items-center gap-2 text-xs font-mono pt-1 text-neutral-500">
              <span>Try Demo:</span>
              <button
                onClick={() => navigate('/login')}
                className="text-amber-700 dark:text-amber-400 hover:underline font-bold"
              >
                As Retailer
              </button>
              <span>•</span>
              <button
                onClick={() => navigate('/login')}
                className="text-amber-700 dark:text-amber-400 hover:underline font-bold"
              >
                As Wholesale Supplier
              </button>
            </div>

            {/* Proof Badges */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                Atomic stock reservations
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                GST-ready invoicing
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                Single auditable record
              </span>
            </div>
          </div>

          {/* RIGHT 52%: Shared Purchase Order Workspace Card (Above the fold fit) */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#12141A] text-neutral-900 dark:text-neutral-100 shadow-lg overflow-hidden">
              {/* Workspace Card Header */}
              <div className="px-4 py-3 bg-neutral-50 dark:bg-[#161820] border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block font-bold">
                    Shared Purchase Order
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-extrabold text-neutral-950 dark:text-white">
                    #PO-2084
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    STOCK RESERVED
                  </span>
                </div>
              </div>

              {/* Connecting Parties Bar */}
              <div className="p-3.5 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-[#14161D]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-center">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#181A22] border border-neutral-200/80 dark:border-neutral-800 space-y-0.5">
                    <span className="text-[9px] font-mono font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      RETAILER
                    </span>
                    <p className="text-xs font-bold text-neutral-950 dark:text-white truncate">
                      Fresh Mart Supermarket
                    </p>
                    <p className="text-[10px] text-neutral-500 font-mono">GSTIN: 33AAAAA0000A1Z5 (Coimbatore)</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#181A22] border border-neutral-200/80 dark:border-neutral-800 space-y-0.5">
                    <span className="text-[9px] font-mono font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      WHOLESALE SUPPLIER
                    </span>
                    <p className="text-xs font-bold text-neutral-950 dark:text-white truncate">
                      Apex FMCG Wholesalers
                    </p>
                    <p className="text-[10px] text-neutral-500 font-mono">GSTIN: 33BBBBB1111B2Z6 (Salem)</p>
                  </div>
                </div>
              </div>

              {/* Order Status Stepper */}
              <div className="px-4 py-2.5 bg-white dark:bg-[#12141A] border-b border-neutral-100 dark:border-neutral-800/80">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                  <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={12} /> Placed
                  </span>
                  <span className="h-px w-4 sm:w-6 bg-neutral-200 dark:bg-neutral-800" />
                  <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={12} /> Confirmed
                  </span>
                  <span className="h-px w-4 sm:w-6 bg-neutral-200 dark:bg-neutral-800" />
                  <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                    <span className="w-3 h-3 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-[8px] font-bold">3</span>
                    Stock Reserved
                  </span>
                  <span className="h-px w-4 sm:w-6 bg-neutral-200 dark:bg-neutral-800" />
                  <span className="flex items-center gap-1 text-neutral-400 dark:text-neutral-500">
                    <span className="w-3 h-3 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[8px]">4</span>
                    GST Prepared
                  </span>
                </div>
              </div>

              {/* Order Line Items Table */}
              <div className="p-4 space-y-3">
                <div className="rounded-lg border border-neutral-200/80 dark:border-neutral-800 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-neutral-50 dark:bg-[#161820] text-neutral-500 border-b border-neutral-200/80 dark:border-neutral-800 text-[10px] uppercase font-mono">
                      <tr>
                        <th className="p-2 font-semibold">Line Item</th>
                        <th className="p-2 font-semibold">Quantity</th>
                        <th className="p-2 font-semibold text-right">Unit Price</th>
                        <th className="p-2 font-semibold text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                      <tr>
                        <td className="p-2 font-semibold text-neutral-950 dark:text-white">
                          Organic Basmati Rice (25kg)
                        </td>
                        <td className="p-2 font-mono">20 bags</td>
                        <td className="p-2 text-right font-mono">₹200.00</td>
                        <td className="p-2 text-right font-mono font-bold text-neutral-950 dark:text-white">
                          ₹4,000.00
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold text-neutral-950 dark:text-white">
                          Refined Sunflower Oil (15L)
                        </td>
                        <td className="p-2 font-mono">6 tins</td>
                        <td className="p-2 text-right font-mono">₹150.00</td>
                        <td className="p-2 text-right font-mono font-bold text-neutral-950 dark:text-white">
                          ₹900.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Real-time Confirmation Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-0.5 font-mono">
                    <span className="text-[9px] uppercase font-bold text-amber-700 dark:text-amber-400 block">
                      Inventory Status
                    </span>
                    <p className="font-semibold text-neutral-950 dark:text-white text-[11px] flex items-center gap-1.5">
                      <Check size={13} className="text-amber-600 dark:text-amber-400" />
                      20 bags reserved · 80 available
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-0.5 font-mono">
                    <span className="text-[9px] uppercase font-bold text-emerald-700 dark:text-emerald-400 block">
                      GST Invoicing
                    </span>
                    <p className="font-semibold text-neutral-950 dark:text-white text-[11px] flex items-center gap-1.5">
                      <Check size={13} className="text-emerald-600 dark:text-emerald-400" />
                      CGST 2.5% + SGST 2.5% prepared
                    </p>
                  </div>
                </div>

                {/* Total Line */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 text-white dark:bg-[#181A22] border border-neutral-800 font-mono">
                  <span className="text-xs text-neutral-300">
                    Subtotal ₹4,900.00 + 5% GST (₹245.00)
                  </span>
                  <div className="text-right">
                    <span className="text-[9px] text-neutral-400 uppercase block">Total Due</span>
                    <span className="text-sm sm:text-base font-bold text-amber-400">₹5,145.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. BUILT FOR BOTH SIDES OF WHOLESALE                      */}
      {/* ========================================================= */}
      <section id="roles" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
            Dual Workspace Architecture
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Built for both sides of wholesale.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Whether you buy for a store or supply one, Flowza keeps every order clear and organised.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: For Retailers */}
          <div className="p-6 sm:p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                For Retailers
              </span>
              <Store className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
                Order with clarity.
              </h3>
              <p className="text-xs text-neutral-500">
                Stop guessing stock availability or losing track of WhatsApp order trails.
              </p>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Send structured purchase orders in minutes</strong> — clean line items with pricing and delivery terms.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>See confirmed stock before dispatch</strong> — know exactly what is reserved and shipped.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Track order progress from confirmation to delivery</strong> — live fulfillment updates at every step.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Receive GST-ready invoice records automatically</strong> — clean tax breakdowns with instant PDF downloads.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-950 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <span>Launch Retailer Workspace →</span>
              </Link>
            </div>
          </div>

          {/* Card 2: For Wholesale Suppliers */}
          <div className="p-6 sm:p-8 rounded-xl border border-neutral-950/20 dark:border-amber-500/30 bg-neutral-50 dark:bg-[#151720] space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                For Wholesale Suppliers
              </span>
              <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
                Fulfil with confidence.
              </h3>
              <p className="text-xs text-neutral-500">
                Eliminate unconfirmed orders, missed requests, and manual billing errors.
              </p>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Receive clean, complete purchase orders</strong> — verified buyer details, quantities, and GSTINs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Confirm availability without phone calls</strong> — accept or adjust quantities with one click.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Reserve stock as orders are accepted</strong> — prevent duplicate sales across multiple stores.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Keep order records and invoices organised</strong> — permanent, searchable, auditable transaction history.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-950 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <span>Launch Supplier Workspace →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. REPLACE THE BACK-AND-FORTH (WHY FLOWZA SECTION)         */}
      {/* ========================================================= */}
      <section id="comparison" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
            Why Flowza
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Replace the back-and-forth.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Compare manual WhatsApp ordering with Flowza's shared purchase-order workspace.
          </p>
        </div>

        {/* Structured Comparison Table */}
        <div className="max-w-4xl mx-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-neutral-100 dark:bg-[#161820] border-b border-neutral-200 dark:border-neutral-800 text-xs font-mono font-bold">
            <div className="p-3.5 text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <X className="w-4 h-4 text-rose-500" />
              <span>Without Flowza (WhatsApp & Calls)</span>
            </div>
            <div className="p-3.5 text-neutral-950 dark:text-white uppercase tracking-wider flex items-center gap-2 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 bg-amber-500/5">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>With Flowza Shared Workspace</span>
            </div>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs sm:text-sm">
            {comparisonRows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 text-neutral-600 dark:text-neutral-400 flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>{row.problem}</span>
                </div>
                <div className="p-4 text-neutral-950 dark:text-neutral-100 font-medium flex items-start gap-2.5 border-t md:border-t-0 md:border-l border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#14161F]/50">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{row.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Partner Onboarding Callout */}
        <div className="mt-8 max-w-4xl mx-auto p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white font-heading">
                Start with your existing trading partners.
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Invite your current retailers or wholesale suppliers and coordinate your next purchase order in minutes.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-lg bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 text-xs font-mono font-bold shrink-0 cursor-pointer shadow-xs"
          >
            Get Started →
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. HOW IT WORKS (4-STEP REFINED PROCESS)                  */}
      {/* ========================================================= */}
      <section id="how-it-works" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-10 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
            Clear 4-Step Workflow
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            From order to invoice, without the back-and-forth.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Step 1 */}
          <div className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-3 shadow-xs">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block">
              01 / PLACE
            </span>
            <h3 className="font-heading text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
              Retailer places order
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Select products and send a structured purchase order with quantities, unit prices, and delivery terms.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-3 shadow-xs">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block">
              02 / CONFIRM
            </span>
            <h3 className="font-heading text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
              Supplier confirms availability
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Review line items, confirm available quantities, and lock stock in database reserve immediately.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-3 shadow-xs">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block">
              03 / FULFIL
            </span>
            <h3 className="font-heading text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
              Supplier prepares order
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Track state transitions as the order is picked, packed, and dispatched for destination delivery.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-3 shadow-xs">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block">
              04 / CLOSE
            </span>
            <h3 className="font-heading text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
              Both sides receive record
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Confirm receipt, settle stock balances permanently, and download the GST-ready PDF invoice.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. INTERACTIVE ORDER SIMULATOR (TEST-DRIVE WORKFLOW)      */}
      {/* ========================================================= */}
      <section id="simulator" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
              Interactive Workflow
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              See the 4-step order lifecycle in action.
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-neutral-200/80 dark:bg-neutral-800 p-1 rounded-lg">
            {simulationSteps.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSimStep(s.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeSimStep === s.id
                    ? 'bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                {s.stepNum} {s.phase}
              </button>
            ))}
          </div>
        </div>

        {/* Active Simulation Step View */}
        <div className="p-6 md:p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] shadow-sm">
          {simulationSteps
            .filter((s) => s.id === activeSimStep)
            .map((s) => (
              <div key={s.id} className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <span className="h-7 w-7 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
                      {s.stepNum}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-neutral-950 dark:text-white">
                        {s.title}
                      </h3>
                      <span className="text-xs text-neutral-500">Active Role: {s.actor}</span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded font-mono font-bold text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
                    Status: {s.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                    <p className="leading-relaxed">{s.action}</p>
                    <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs">
                      <span className="text-neutral-500 block mb-0.5 uppercase font-mono text-[10px]">
                        Live Inventory Coordination
                      </span>
                      <span className="font-bold text-neutral-950 dark:text-white font-mono">{s.inventory}</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-lg bg-neutral-900 text-white dark:bg-[#161820] space-y-2 border border-neutral-800 text-xs">
                    <span className="text-amber-400 font-bold block mb-1 font-mono">
                      // AUDIT TRAIL LOG
                    </span>
                    <p className="text-neutral-300">
                      Purchase Order #PO-2084 transitioned to state '{s.status}'.
                    </p>
                    <p className="text-emerald-400 flex items-center gap-1.5 font-medium">
                      <Check size={13} /> Shared record synced across Retailer and Supplier workspaces.
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. GST, INVENTORY & GROUNDED AI SCOPE                     */}
      {/* ========================================================= */}
      <section id="trust" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Receipt size={18} />
            </div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
              GST-Ready Invoicing
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Calculates applicable CGST/SGST (intra-state) or IGST (inter-state) based on product tax rates and company state GSTINs, with instant PDF generation.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Boxes size={18} />
            </div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
              Atomic Stock Reservations
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Transactional inventory ledger immediately locks stock upon confirmation, preventing concurrent overselling and stock disputes across buyers.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
              Grounded Business Copilot
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              The AI assistant queries authorised company data using deterministic read-only tools to answer inventory, PO, and invoice inquiries with zero hallucinated figures.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. FAQS                                                  */}
      {/* ========================================================= */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-8 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
            Frequently Asked Questions
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Common questions about Flowza.
          </h2>
        </div>

        <div className="space-y-2.5 text-xs">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className="font-semibold text-xs sm:text-sm text-neutral-900 dark:text-white">
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-neutral-400 transition-transform shrink-0 ${
                    openFaq === idx ? 'rotate-180 text-amber-500' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-4 pb-4 text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. FINAL CALL TO ACTION                                   */}
      {/* ========================================================= */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="rounded-2xl p-8 sm:p-12 bg-neutral-950 text-white dark:bg-[#14161F] border border-neutral-800 text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to simplify wholesale ordering?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Coordinate purchase orders between your retail stores and wholesale suppliers with live inventory reservations and automated GST-ready invoices.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3.5 rounded-lg text-xs sm:text-sm font-bold font-mono bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>Choose your workspace →</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
