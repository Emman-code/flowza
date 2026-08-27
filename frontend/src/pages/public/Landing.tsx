import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import ColorBends from '../../components/ui/ColorBends';
import MaskedHeading from '../../components/ui/MaskedHeading';
import heroTexture from '../../assets/hero-texture.jpg';
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

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-6');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    });

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
      q: 'How does stock reservation prevent overselling?',
      a: 'When a retailer places an order, the supplier’s inventory is immediately soft-locked atomically in PostgreSQL. If the supplier confirms, it locks as reserved stock; if rejected, stock is released instantly—eliminating overselling and double booking.',
    },
    {
      q: 'Are invoices GST compliant for Indian tax filing?',
      a: 'Yes. Every confirmed order generates an immutable invoice record calculating exact CGST (2.5%), SGST (2.5%), or IGST (5%) with verified 15-digit GSTINs, valid HSN codes, and auto-computed tax breakdowns.',
    },
    {
      q: 'Can retailers and suppliers see each other’s internal data?',
      a: 'No. Flowza enforces strict tenant boundaries. Retailers only see their own placed purchase orders and supplier status. Suppliers only see orders assigned to their catalog and their own warehouse stock.',
    },
    {
      q: 'What is the role of the Flowza AI Assistant?',
      a: 'The AI assistant is a tenant-scoped, read-only copilot that queries live database records to answer practical questions such as "Which items are low in stock?", "Show me active orders from Apex FMCG", or "List unpaid invoices this month" without manual spreadsheet lookups.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] dark:bg-[#0D0E12] text-[#111216] dark:text-[#F8F8FA] selection:bg-amber-500/20 selection:text-amber-950 dark:selection:text-amber-200 font-sans relative overflow-hidden">
      {/* Top Floating Navbar */}
      <Navbar />

      {/* Full-Width Interactive Hero ColorBends Background (Subtle Warm Ambient Glow) */}
      <div className="absolute top-0 left-0 right-0 h-[720px] pointer-events-none z-0 opacity-35 dark:opacity-15 overflow-hidden">
        <ColorBends
          colors={['#F59E0B', '#FB923C', '#FBBF24', '#D97706', '#FDE68A']}
          rotation={90}
          speed={0.16}
          scale={1.1}
          frequency={0.9}
          warpStrength={1.0}
          mouseInfluence={0.6}
          noise={0.06}
          parallax={0.3}
          iterations={1}
          intensity={1.05}
          bandWidth={7}
          transparent={true}
          className="w-full h-full"
        />
      </div>

      {/* ========================================================= */}
      {/* 1. HERO SECTION — ASYMMETRICAL SPLIT SCREEN               */}
      {/* ========================================================= */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-14 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* LEFT 48%: Core Positioning Narrative */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Headline with React Bits MaskedHeading & Handcrafted SVG Underline */}
            <div className="space-y-2">
              <MaskedHeading
                tag="h1"
                text="One wholesale order. Both sides in sync."
                src={heroTexture}
                align="left"
                weight={900}
                tracking={-0.035}
                lineHeight={1.02}
                textScale={0.122}
                fillScale={1.35}
                parallax={28}
                drift={15}
                reveal="rise"
                trigger="view"
                duration={1.1}
                stagger={0.08}
                className="font-heading font-black text-neutral-950 dark:text-white"
              />
              <svg
                className="w-48 sm:w-60 h-3 text-amber-500 overflow-visible pointer-events-none"
                viewBox="0 0 260 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9.5C55 2.5 160 -1.5 257 7.5C195 11.5 85 12.5 14 11.5"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="text-amber-500"
                />
              </svg>
            </div>

            {/* Practical Value Copy */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              A shared wholesale ordering workspace for retailers and suppliers with live stock reserves and GST-ready invoices.
            </p>

            {/* Primary Action Buttons (Nested Button-in-Button Architecture) */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className="group pl-6 pr-2.5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-mono bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 transition-all flex items-center gap-3 shadow-md shadow-black/10 active:scale-[0.98] cursor-pointer"
              >
                <span>Choose your workspace</span>
                <span className="w-7 h-7 rounded-full bg-white/20 dark:bg-black/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={13} />
                </span>
              </button>

              <a
                href="#comparison"
                className="px-4 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-white dark:bg-neutral-800/80 border-[1.5px] border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 transition-all inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>Why Flowza</span>
                <ArrowDown size={12} />
              </a>
            </div>

            {/* Direct Sign-Up Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
              <button
                onClick={() => navigate('/register?role=vendor')}
                className="px-3.5 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border-[1.5px] border-neutral-300 dark:border-neutral-700 font-semibold transition-colors cursor-pointer"
              >
                Sign up as Retailer →
              </button>
              <button
                onClick={() => navigate('/register?role=supplier')}
                className="px-3.5 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border-[1.5px] border-neutral-300 dark:border-neutral-700 font-semibold transition-colors cursor-pointer"
              >
                Sign up as Supplier →
              </button>
            </div>
          </div>

          {/* RIGHT 52%: Clean Structural Purchase Order & Tax Invoice Manifest */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border-[1.5px] border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#12141A] text-neutral-900 dark:text-neutral-100 shadow-md overflow-hidden">
              {/* Manifest Header Row */}
              <div className="px-5 py-4 bg-[#FAF9F5] dark:bg-[#161822] border-b-[1.5px] border-neutral-300 dark:border-neutral-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold block">
                    Shared Purchase Order Manifest
                  </span>
                  <span className="text-sm sm:text-base font-mono font-black text-neutral-950 dark:text-white">
                    #PO-2084
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md text-[11px] font-mono font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border-[1.5px] border-amber-500/30">
                    STOCK RESERVED
                  </span>
                </div>
              </div>

              {/* Counterparties Structured 2-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-[1.5px] sm:divide-y-0 sm:divide-x-[1.5px] divide-neutral-300 dark:divide-neutral-700 border-b-[1.5px] border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#12141A]">
                {/* Retailer Info */}
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                    Buyer (Retail Store)
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white">
                    Fresh Mart Supermarket
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                    GSTIN: 33AAAAA0000A1Z5 • Coimbatore, TN
                  </p>
                </div>

                {/* Wholesale Supplier Info */}
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                    Seller (Wholesale Supplier)
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white">
                    Apex FMCG Wholesalers
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                    GSTIN: 33BBBBB1111B2Z6 • Salem, TN
                  </p>
                </div>
              </div>

              {/* Itemized Order Table */}
              <div className="p-4 sm:p-5 space-y-4">
                <div className="rounded-xl border-[1.5px] border-neutral-300 dark:border-neutral-700 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#FAF9F5] dark:bg-[#161822] text-neutral-500 dark:text-neutral-400 border-b-[1.5px] border-neutral-300 dark:border-neutral-700 text-[10px] uppercase font-mono tracking-wider font-bold">
                      <tr>
                        <th className="p-3">Item Description</th>
                        <th className="p-3">Quantity</th>
                        <th className="p-3 text-right">Unit Rate</th>
                        <th className="p-3 text-right">Taxable Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-[1.5px] divide-neutral-300 dark:divide-neutral-700 text-neutral-800 dark:text-neutral-200">
                      <tr>
                        <td className="p-3">
                          <p className="font-bold text-neutral-950 dark:text-white">Organic Basmati Rice (25kg)</p>
                          <p className="text-[10px] text-neutral-500 font-mono">HSN: 10063020 • Tax Rate: 5% GST</p>
                        </td>
                        <td className="p-3 font-mono">20 bags</td>
                        <td className="p-3 text-right font-mono">₹200.00</td>
                        <td className="p-3 text-right font-mono font-bold text-neutral-950 dark:text-white">
                          ₹4,000.00
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">
                          <p className="font-bold text-neutral-950 dark:text-white">Refined Sunflower Oil (15L)</p>
                          <p className="text-[10px] text-neutral-500 font-mono">HSN: 15121910 • Tax Rate: 5% GST</p>
                        </td>
                        <td className="p-3 font-mono">6 tins</td>
                        <td className="p-3 text-right font-mono">₹150.00</td>
                        <td className="p-3 text-right font-mono font-bold text-neutral-950 dark:text-white">
                          ₹900.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Tax Breakdown & Total Strip */}
                <div className="rounded-xl border-[1.5px] border-neutral-300 dark:border-neutral-700 bg-[#FAF9F5] dark:bg-[#161822] p-4 space-y-3 font-mono text-xs">
                  <div className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
                    <div className="flex justify-between">
                      <span>Subtotal (Taxable Value):</span>
                      <span className="font-semibold text-neutral-950 dark:text-white">₹4,900.00</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>CGST (2.5%):</span>
                      <span className="text-neutral-950 dark:text-white">₹122.50</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>SGST (2.5%):</span>
                      <span className="text-neutral-950 dark:text-white">₹122.50</span>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t-[1.5px] border-neutral-300 dark:border-neutral-700 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold block">
                        Total Invoice Payable
                      </span>
                      <span className="text-base sm:text-lg font-black text-neutral-950 dark:text-amber-400">
                        ₹5,145.00
                      </span>
                    </div>

                    <div className="px-2.5 py-1 rounded border-[1.5px] border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold tracking-wider flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
                      <span>GSTIN COMPLIANT</span>
                    </div>
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
      <section id="roles" className="scroll-reveal opacity-0 translate-y-6 transition-all duration-700 ease-out py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
            Dual Workspace Architecture
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Built for both sides of wholesale.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Clean orders for stores. Confirmed fulfilment for suppliers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: For Retailers */}
          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                Retail Stores
              </span>
              <Store className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>

            <h3 className="font-heading text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
              Order with precision.
            </h3>

            <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Structured purchase orders with clean line items & rates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Confirmed inventory locks before shipment</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Automated GST tax invoices with instant PDF downloads</span>
              </li>
            </ul>

            <div className="pt-1">
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-xs font-mono font-bold text-neutral-950 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <span>Launch Retailer Workspace →</span>
              </Link>
            </div>
          </div>

          {/* Card 2: For Wholesale Suppliers */}
          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                Wholesale Suppliers
              </span>
              <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>

            <h3 className="font-heading text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
              Fulfil with confidence.
            </h3>

            <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Verified buyer details, quantities, and GSTINs</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>One-click availability confirmation & inventory reserve</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Auditable transaction records & payment tracking</span>
              </li>
            </ul>

            <div className="pt-1">
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-xs font-mono font-bold text-neutral-950 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
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
      <section id="comparison" className="scroll-reveal opacity-0 translate-y-6 transition-all duration-700 ease-out py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
            Why Flowza
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Replace the back-and-forth.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Compare manual WhatsApp ordering with Flowza's shared workspace.
          </p>
        </div>

        {/* Structured Comparison Table */}
        <div className="max-w-4xl mx-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-neutral-100 dark:bg-[#161820] border-b border-neutral-200 dark:border-neutral-800 text-xs font-mono font-bold">
            <div className="p-3 text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <X className="w-3.5 h-3.5 text-rose-500" />
              <span>Without Flowza (WhatsApp & Calls)</span>
            </div>
            <div className="p-3 text-neutral-950 dark:text-white uppercase tracking-wider flex items-center gap-2 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 bg-amber-500/5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>With Flowza Shared Workspace</span>
            </div>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs sm:text-sm">
            {comparisonRows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-3.5 text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>{row.problem}</span>
                </div>
                <div className="p-3.5 text-neutral-950 dark:text-neutral-100 font-medium flex items-start gap-2 border-t md:border-t-0 md:border-l border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#14161F]/50">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{row.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. HOW IT WORKS (4-STEP REFINED PROCESS)                  */}
      {/* ========================================================= */}
      <section id="how-it-works" className="scroll-reveal opacity-0 translate-y-6 transition-all duration-700 ease-out py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
            Order Lifecycle
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            How Flowza Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-2 shadow-xs">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block">
              01 / PLACE
            </span>
            <h3 className="font-heading text-base font-bold text-neutral-950 dark:text-white">
              Retailer sends PO
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Create structured purchase order with line items, quantities, and pricing.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-2 shadow-xs">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block">
              02 / CONFIRM
            </span>
            <h3 className="font-heading text-base font-bold text-neutral-950 dark:text-white">
              Supplier confirms
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Review items and lock inventory in reserve immediately.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-2 shadow-xs">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block">
              03 / FULFIL
            </span>
            <h3 className="font-heading text-base font-bold text-neutral-950 dark:text-white">
              Order dispatched
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Track picking, packing, and destination delivery in real time.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] space-y-2 shadow-xs">
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block">
              04 / CLOSE
            </span>
            <h3 className="font-heading text-base font-bold text-neutral-950 dark:text-white">
              GST Invoice ready
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Settle balances and download compliant tax invoice PDF.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. INTERACTIVE ORDER SIMULATOR (TEST-DRIVE WORKFLOW)      */}
      {/* ========================================================= */}
      <section id="simulator" className="scroll-reveal opacity-0 translate-y-6 transition-all duration-700 ease-out py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
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
      <section id="trust" className="scroll-reveal opacity-0 translate-y-6 transition-all duration-700 ease-out py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
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
      <section className="scroll-reveal opacity-0 translate-y-6 transition-all duration-700 ease-out py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
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
      <section className="scroll-reveal opacity-0 translate-y-6 transition-all duration-700 ease-out py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
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
