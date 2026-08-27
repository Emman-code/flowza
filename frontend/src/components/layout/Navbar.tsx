import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { FlowzaLogo } from '../common/FlowzaLogo';
import {
  LogOut,
  ArrowRight,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardPath = () => {
    if (!user) return '/login';
    return `/dashboard/${user.role?.name || 'vendor'}`;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isAboutPage = location.pathname === '/about';

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 mx-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] max-w-5xl z-50 transition-all duration-300">
      {/* Floating Island Pill Enclosure */}
      <div
        className={`rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#F7F6F2]/90 dark:bg-[#12141A]/90 backdrop-blur-2xl border border-neutral-300/80 dark:border-neutral-800 shadow-[0_12px_40px_rgba(0,0,0,0.08)] py-2 px-3 sm:px-5'
            : 'bg-[#F7F6F2]/80 dark:bg-[#12141A]/80 backdrop-blur-xl border border-neutral-200/90 dark:border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] py-2 px-3.5 sm:px-5'
        } flex items-center justify-between`}
      >
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link to="/" className="flex items-center group py-0.5">
            <FlowzaLogo size="sm" badge="B2B" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
            {!isAboutPage ? (
              <>
                <a
                  href="#how-it-works"
                  className="px-3 py-1.5 rounded-full hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/80 transition-all"
                >
                  How It Works
                </a>
                <a
                  href="#roles"
                  className="px-3 py-1.5 rounded-full hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/80 transition-all"
                >
                  Workspaces
                </a>
                <a
                  href="#comparison"
                  className="px-3 py-1.5 rounded-full hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/80 transition-all"
                >
                  Why Flowza
                </a>
                <a
                  href="#simulator"
                  className="px-3 py-1.5 rounded-full hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/80 transition-all"
                >
                  Simulator
                </a>
              </>
            ) : (
              <Link
                to="/"
                className="px-3 py-1.5 rounded-full hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/80 transition-all"
              >
                ← Back to Overview
              </Link>
            )}

            <Link
              to="/about"
              className={`px-3 py-1.5 rounded-full transition-all ${
                isAboutPage
                  ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/30'
                  : 'hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/80'
              }`}
            >
              About Team
            </Link>
          </nav>
        </div>

        {/* Right Side: Actions (iPhone-style Button Pill) */}
        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigate(getDashboardPath())}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 transition-all cursor-pointer shadow-xs"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-full text-neutral-500 hover:text-red-600 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="hidden sm:inline-block px-3 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/80 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="group pl-3.5 pr-1.5 py-1 rounded-full text-xs font-mono font-bold bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 transition-all inline-flex items-center gap-2 shadow-xs active:scale-[0.98]"
              >
                <span>Get Started</span>
                <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={11} />
                </span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile Floating Drawer */}
      {isOpen && (
        <div className="md:hidden mt-2 rounded-2xl bg-[#F7F6F2]/95 dark:bg-[#12141A]/95 backdrop-blur-2xl border border-neutral-300/80 dark:border-neutral-800 p-4 space-y-2.5 text-xs font-medium shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          {!isAboutPage ? (
            <>
              <a
                href="#how-it-works"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#roles"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
              >
                Dual Workspaces
              </a>
              <a
                href="#comparison"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
              >
                Why Flowza
              </a>
              <a
                href="#simulator"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
              >
                Order Simulator
              </a>
            </>
          ) : (
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
            >
              ← Back to Overview
            </Link>
          )}
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-xl text-amber-700 dark:text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20"
          >
            About Team ThunderBoltz
          </Link>
          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-neutral-600 dark:text-neutral-400 px-3 py-1.5"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-mono font-bold bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950"
            >
              Choose Workspace →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
