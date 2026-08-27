import React, { useState } from 'react';
import { GrainGradient } from '@paper-design/shaders-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { toast } from 'sonner';
import {
  Store,
  Truck,
  Shield,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Check,
  Building2,
  Lock,
  Mail,
  User,
  Phone,
  Receipt,
} from 'lucide-react';
import { FlowzaLogo } from '../common/FlowzaLogo';

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
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Quick fill helper for review & testing
  const quickFill = (userEmail: string, pass: string = 'Password123!', userRole: 'vendor' | 'supplier' = 'vendor') => {
    setEmail(userEmail);
    setPassword(pass);
    setRole(userRole);
    toast.info(`Filled credentials for ${userRole === 'vendor' ? 'Retailer' : 'Supplier'}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!email || !password) {
          toast.error('Please enter your email and password');
          setLoading(false);
          return;
        }

        await login({
          email,
          password,
          remember_me: rememberMe,
        });

        toast.success('Authenticated successfully. Redirecting...');
        const from = (location.state as any)?.from?.pathname;
        const user = useAuthStore.getState().user;
        const roleName = user?.role?.name || role;

        if (from) {
          navigate(from, { replace: true });
        } else {
          navigate(`/dashboard/${roleName}`, { replace: true });
        }
      } else {
        if (!agreeTerms) {
          toast.error('Please accept the Terms of Service to continue');
          setLoading(false);
          return;
        }

        if (!fullName || !email || !password || !companyName) {
          toast.error('Please fill in all required fields');
          setLoading(false);
          return;
        }

        await registerUser({
          full_name: fullName,
          email,
          password,
          phone: phone || '9876543210',
          role_name: role,
          company_name: companyName,
          business_type: role === 'vendor' ? 'Retail' : 'Wholesale',
          gst_number: gstNumber || undefined,
          country: 'India',
          state: 'Tamil Nadu',
          city: 'Coimbatore',
          address_line: 'Industrial Area Phase 2',
        });

        toast.success('Account created successfully. Welcome to Flowza!');
        navigate(`/dashboard/${role}`, { replace: true });
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.error?.message ||
        error.response?.data?.detail ||
        error.message ||
        'Authentication failed. Please check your credentials.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F7F6F2] dark:bg-[#0D0E12] text-[#111216] dark:text-[#F8F8FA] antialiased p-2 sm:p-4 md:p-6 transition-colors duration-200">
      <div className="grid min-h-[calc(100vh-2rem)] gap-4 lg:gap-6 lg:grid-cols-[1fr_1.05fr] max-w-[1500px] mx-auto items-stretch">
        {/* LEFT COLUMN: Clean High-Craft Form Panel */}
        <div className="flex flex-col justify-between rounded-2xl border-[1.5px] border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#12141A] p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
          {/* Top Navigation Row */}
          <div className="flex items-center justify-between pb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Back to Overview
            </Link>

            <FlowzaLogo size="sm" badge="B2B Network" />
          </div>

          {/* Form Header */}
          <div className="w-full max-w-[520px] mx-auto space-y-6 my-auto">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-neutral-950 dark:text-white">
                {mode === 'login' ? 'Sign in to workspace' : 'Create your account'}
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-normal">
                {mode === 'login'
                  ? 'Access your purchase orders, live stock, and GST-ready invoices.'
                  : 'Start syncing wholesale orders with your suppliers in real time.'}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 text-xs font-mono font-bold">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white dark:bg-[#181A22] text-neutral-950 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-white dark:bg-[#181A22] text-neutral-950 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'
                }`}
              >
                Register
              </button>
            </div>

            {/* Role Selection Tabs */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setRole('vendor')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border-[1.5px] text-left transition-all cursor-pointer ${
                    role === 'vendor'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-300 shadow-2xs font-bold'
                      : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                  }`}
                >
                  <Store size={18} className={role === 'vendor' ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-400'} />
                  <div>
                    <span className="text-xs font-bold block leading-tight">Retailer</span>
                    <span className="text-[10px] font-mono opacity-80">Buyer Workspace</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('supplier')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border-[1.5px] text-left transition-all cursor-pointer ${
                    role === 'supplier'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-300 shadow-2xs font-bold'
                      : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                  }`}
                >
                  <Truck size={18} className={role === 'supplier' ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-400'} />
                  <div>
                    <span className="text-xs font-bold block leading-tight">Supplier</span>
                    <span className="text-[10px] font-mono opacity-80">Seller Workspace</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick-Fill Demo Pills (Login Mode) */}
            {mode === 'login' && (
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-neutral-500 tracking-wider block">
                  Quick-Fill Demo Credentials:
                </span>
                <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => quickFill('vendor@supermarket.com', 'Password123!', 'vendor')}
                    className="py-1.5 px-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-amber-500 hover:text-amber-600 transition-all cursor-pointer text-center font-medium shadow-2xs"
                  >
                    Retailer
                  </button>
                  <button
                    type="button"
                    onClick={() => quickFill('abc@distributors.com', 'Password123!', 'supplier')}
                    className="py-1.5 px-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-amber-500 hover:text-amber-600 transition-all cursor-pointer text-center font-medium shadow-2xs"
                  >
                    Supplier
                  </button>
                  <button
                    type="button"
                    onClick={() => quickFill('admin@flowza.com', 'AdminPassword123!', 'vendor')}
                    className="py-1.5 px-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-amber-500 hover:text-amber-600 transition-all cursor-pointer text-center font-medium shadow-2xs"
                  >
                    Admin
                  </button>
                </div>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-bold text-neutral-600 dark:text-neutral-400 uppercase">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Emmanuel Joshua"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-950 dark:text-white outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-bold text-neutral-600 dark:text-neutral-400 uppercase">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="9876543210"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-950 dark:text-white outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-bold text-neutral-600 dark:text-neutral-400 uppercase">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Fresh Mart Supermarket"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-950 dark:text-white outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-bold text-neutral-600 dark:text-neutral-400 uppercase">
                        GSTIN (Optional)
                      </label>
                      <input
                        type="text"
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)}
                        placeholder="33AAAAA0000A1Z5"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-950 dark:text-white outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono uppercase"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-neutral-600 dark:text-neutral-400 uppercase">
                  Business Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-950 dark:text-white outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-neutral-600 dark:text-neutral-400 uppercase">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-950 dark:text-white outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Terms or Remember Me */}
              <div className="pt-1 flex items-center justify-between text-xs font-mono">
                {mode === 'login' ? (
                  <>
                    <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-600 dark:text-neutral-400">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-neutral-300 text-amber-500 focus:ring-amber-500"
                      />
                      <span>Remember for 30 days</span>
                    </label>

                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info('Demo password is: Password123!');
                      }}
                      className="text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </>
                ) : (
                  <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-600 dark:text-neutral-400">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="rounded border-neutral-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span>
                      I agree to the{' '}
                      <span className="text-amber-600 dark:text-amber-400 underline">Terms of Service</span>
                    </span>
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl text-xs sm:text-sm font-bold font-mono bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 active:scale-[0.99]"
              >
                <span>{loading ? 'Processing...' : mode === 'login' ? 'Sign In to Workspace' : 'Create Flowza Account'}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </div>

          {/* Bottom Switcher */}
          <div className="pt-6 text-center text-xs text-neutral-500 border-t border-neutral-100 dark:border-neutral-800">
            {mode === 'login' ? (
              <>
                New to Flowza?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-neutral-950 dark:text-white hover:underline cursor-pointer"
                >
                  Create an account →
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-neutral-950 dark:text-white hover:underline cursor-pointer"
                >
                  Sign in here →
                </button>
              </>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Ambient Grain Shader Visual Experience */}
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden rounded-2xl bg-neutral-950 p-8 sm:p-12 text-white min-h-[640px] border-[1.5px] border-neutral-900 shadow-lg">
          <GrainGradient
            speed={0.8}
            scale={1.2}
            rotation={0}
            offsetX={0}
            offsetY={0}
            softness={0.6}
            intensity={0.55}
            noise={0.2}
            shape="corners"
            frame={2854.5}
            colors={['#111216', '#F59E0B', '#D97706', '#1C1917']}
            colorBack="#00000000"
            className="absolute inset-0 bg-neutral-950"
          />

          {/* Foreground Visual Content */}
          <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-white/10 text-white/90 border border-white/15 backdrop-blur-md">
                Commercial Wholesale Network
              </span>
              <span className="text-xs font-mono text-white/60">v1.0.0</span>
            </div>

            <div className="space-y-4 max-w-lg">
              <h2 className="text-4xl xl:text-5xl font-black tracking-tight font-heading text-white leading-[1.1]">
                One wholesale order.
                <br />
                <span className="text-amber-400">Both sides in sync.</span>
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                Replace WhatsApp fragmentation with structured purchase orders, live stock reserves, and GST-compliant tax invoicing.
              </p>
            </div>

            {/* Proof Metric Card */}
            <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>Active Synchronized Flow</span>
                <span className="text-emerald-400 font-bold">100% AUDIT READY</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold text-white">Basmati Rice + Sunflower Oil PO</span>
                <span className="text-xs font-mono font-bold text-amber-400">₹5,145.00 CONFIRMED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
