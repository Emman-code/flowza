import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { toast } from 'sonner';
import {
  Store,
  Truck,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { FlowzaLogo } from '../common/FlowzaLogo';
import ColorBends from './ColorBends';

interface AuthSectionOneProps {
  initialMode?: 'login' | 'register';
  defaultRole?: 'vendor' | 'supplier';
}

export default function AuthSectionOne({
  initialMode = 'login',
  defaultRole = 'vendor',
}: AuthSectionOneProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register: registerUser } = useAuthStore();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<'vendor' | 'supplier'>(defaultRole);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Quick fill helper
  const quickFill = (userEmail: string, pass: string = 'Password123!', userRole: 'vendor' | 'supplier' = 'vendor') => {
    setEmail(userEmail);
    setPassword(pass);
    setRole(userRole);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!email || !password) {
          toast.error('Enter email and password');
          setLoading(false);
          return;
        }

        await login({
          email,
          password,
          remember_me: rememberMe,
        });

        toast.success('Signed in successfully');
        const from = (location.state as any)?.from?.pathname;
        const user = useAuthStore.getState().user;
        const roleName = user?.role?.name || role;

        if (from) {
          navigate(from, { replace: true });
        } else {
          navigate(`/dashboard/${roleName}`, { replace: true });
        }
      } else {
        if (!fullName || !email || !password || !companyName) {
          toast.error('Please fill in all fields');
          setLoading(false);
          return;
        }

        await registerUser({
          full_name: fullName,
          email,
          password,
          phone: '9876543210',
          role_name: role,
          company_name: companyName,
          business_type: role === 'vendor' ? 'Retail' : 'Wholesale',
          country: 'India',
          state: 'Tamil Nadu',
          city: 'Coimbatore',
          address_line: 'Commercial Hub',
        });

        toast.success('Account created');
        navigate(`/dashboard/${role}`, { replace: true });
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.error?.message ||
        error.response?.data?.detail ||
        error.message ||
        'Authentication failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen md:h-screen md:max-h-screen md:overflow-hidden bg-[#F7F6F2] dark:bg-[#0D0E12] text-[#111216] dark:text-[#F8F8FA] antialiased p-3 sm:p-4 lg:p-6 flex flex-col justify-center transition-colors">
      <div className="grid h-full max-h-[860px] gap-4 lg:gap-6 lg:grid-cols-[1fr_1.05fr] max-w-[1300px] w-full mx-auto items-stretch">
        {/* LEFT COLUMN: Clean Minimalist Form Panel */}
        <div className="flex flex-col justify-between rounded-2xl border-[1.5px] border-neutral-300/90 dark:border-neutral-800 bg-white dark:bg-[#12141A] p-5 sm:p-7 lg:p-8 shadow-sm relative overflow-hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-2 sm:pb-0">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={13} /> Home
            </Link>

            <FlowzaLogo size="sm" />
          </div>

          {/* Core Form Wrapper */}
          <div className="w-full max-w-[420px] mx-auto space-y-4 my-auto py-4 sm:py-2">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25">
                <Sparkles size={11} /> Flowza Workspace
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-[-0.03em] font-heading text-neutral-950 dark:text-white">
                {mode === 'login' ? 'Sign in to workspace' : 'Create your account'}
              </h1>
              <p className="text-xs text-neutral-500 font-normal">
                {mode === 'login' ? 'Access your orders, stock reserve & invoices.' : 'Sync purchase orders and invoices with suppliers.'}
              </p>
            </div>

            {/* Mode & Role Switchers in one clean compact row */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {/* Mode Toggle */}
              <div className="grid grid-cols-2 p-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`py-1.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-white dark:bg-[#181A22] text-neutral-950 dark:text-white shadow-xs'
                      : 'text-neutral-500'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`py-1.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    mode === 'register'
                      ? 'bg-white dark:bg-[#181A22] text-neutral-950 dark:text-white shadow-xs'
                      : 'text-neutral-500'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Role Toggle */}
              <div className="grid grid-cols-2 p-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <button
                  type="button"
                  onClick={() => setRole('vendor')}
                  className={`py-1.5 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    role === 'vendor'
                      ? 'bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/30'
                      : 'text-neutral-500'
                  }`}
                >
                  <Store size={12} /> Retailer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('supplier')}
                  className={`py-1.5 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    role === 'supplier'
                      ? 'bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/30'
                      : 'text-neutral-500'
                  }`}
                >
                  <Truck size={12} /> Supplier
                </button>
              </div>
            </div>

            {/* Quick Demo Fill (One-Line Strip) */}
            {mode === 'login' && (
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-[10px] font-mono">
                <span className="text-neutral-400 font-bold uppercase">Quick Demo:</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => quickFill('vendor@supermarket.com', 'Password123!', 'vendor')}
                    className="px-2 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-amber-600 font-medium cursor-pointer"
                  >
                    Retailer
                  </button>
                  <button
                    type="button"
                    onClick={() => quickFill('abc@distributors.com', 'Password123!', 'supplier')}
                    className="px-2 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-amber-600 font-medium cursor-pointer"
                  >
                    Supplier
                  </button>
                  <button
                    type="button"
                    onClick={() => quickFill('admin@flowza.com', 'AdminPassword123!', 'vendor')}
                    className="px-2 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-amber-600 font-medium cursor-pointer"
                  >
                    Admin
                  </button>
                </div>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'register' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-0.5">
                    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-950 dark:text-white outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Business Name"
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-950 dark:text-white outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-0.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                  Business Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-950 dark:text-white outline-none focus:border-amber-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-0.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                    Password *
                  </label>
                  {mode === 'login' && (
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info('Demo password: Password123!');
                      }}
                      className="text-[10px] font-mono text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      Forgot?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 pr-8 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-950 dark:text-white outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1.5 py-2.5 rounded-lg text-xs font-bold font-mono bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50 active:scale-[0.99]"
              >
                <span>{loading ? 'Processing...' : mode === 'login' ? 'Sign In to Workspace →' : 'Create Account →'}</span>
              </button>
            </form>
          </div>

          {/* Minimal Bottom Switcher */}
          <div className="text-center text-[11px] text-neutral-500 font-mono pt-2 sm:pt-0">
            {mode === 'login' ? (
              <span>
                Need an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-neutral-950 dark:text-white underline cursor-pointer"
                >
                  Register
                </button>
              </span>
            ) : (
              <span>
                Have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-neutral-950 dark:text-white underline cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Light-Theme ColorBends Ambient Visual Panel */}
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden rounded-2xl bg-[#FAF9F5] dark:bg-neutral-900/60 p-8 xl:p-10 text-neutral-900 dark:text-white min-h-[500px] border-[1.5px] border-neutral-300/90 dark:border-neutral-800 shadow-sm">
          {/* ColorBends Ambient Light Background */}
          <ColorBends
            colors={['#F59E0B', '#FBBF24', '#FDE68A', '#FED7AA', '#FFFBEB']}
            rotation={90}
            speed={0.2}
            scale={1}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            noise={0.08}
            parallax={0.5}
            iterations={1}
            intensity={1.3}
            bandWidth={6}
            transparent={true}
            className="absolute inset-0 z-0 opacity-60 dark:opacity-25 pointer-events-none"
          />

          {/* Minimal Overlay Content */}
          <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300/80 dark:border-neutral-700 shadow-2xs backdrop-blur-xs">
                Flowza B2B Network
              </span>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-semibold">v1.0.0</span>
            </div>

            <div className="space-y-3 max-w-md">
              <h2 className="text-3xl xl:text-4xl font-black tracking-tight font-heading text-neutral-950 dark:text-white leading-tight">
                One wholesale order.
                <br />
                <span className="text-amber-600 dark:text-amber-400">Both sides in sync.</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                Replace WhatsApp fragmentation with structured purchase orders, live stock reserves, and GST-ready invoices.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/90 dark:bg-neutral-800/80 border border-neutral-300/80 dark:border-neutral-700 flex items-center justify-between text-xs font-mono shadow-2xs backdrop-blur-xs">
              <span className="text-neutral-600 dark:text-neutral-400 font-medium">Live Workspace Status</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">● 100% AUDIT READY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
