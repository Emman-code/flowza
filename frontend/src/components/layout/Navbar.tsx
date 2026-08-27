import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { FlowzaLogo } from '../common/FlowzaLogo';
import {
  LogOut,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F7F6F2]/95 dark:bg-[#0D0E12]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left Side: Logo & Business Navigation */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center group">
            <FlowzaLogo size="sm" badge="B2B" />
          </Link>

          {/* Desktop Business Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {!isAboutPage ? (
              <>
                <a
                  href="#how-it-works"
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#roles"
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Workspaces
                </a>
                <a
                  href="#comparison"
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Why Flowza
                </a>
                <a
                  href="#simulator"
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Simulator
                </a>
              </>
            ) : (
              <Link
                to="/"
                className="hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                ← Back to Home
              </Link>
            )}

            <Link
              to="/about"
              className={`transition-colors ${
                isAboutPage
                  ? 'text-amber-700 dark:text-amber-400 font-bold'
                  : 'hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              About Team
            </Link>
          </nav>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center space-x-3">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate(getDashboardPath())}
                className="px-3 py-1.5 rounded-md text-xs font-mono font-medium border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors cursor-pointer"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded text-neutral-500 hover:text-red-600 transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3 text-xs">
              <Link
                to="/login"
                className="font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-md font-semibold font-mono text-xs bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 transition-colors inline-flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <span>Get Started</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 rounded text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-[#F7F6F2] dark:bg-[#0D0E12] px-4 py-4 space-y-3 text-xs font-medium">
          {!isAboutPage ? (
            <>
              <a
                href="#how-it-works"
                onClick={() => setIsOpen(false)}
                className="block py-1 text-neutral-700 dark:text-neutral-300"
              >
                How It Works
              </a>
              <a
                href="#roles"
                onClick={() => setIsOpen(false)}
                className="block py-1 text-neutral-700 dark:text-neutral-300"
              >
                Workspaces
              </a>
              <a
                href="#comparison"
                onClick={() => setIsOpen(false)}
                className="block py-1 text-neutral-700 dark:text-neutral-300"
              >
                Why Flowza
              </a>
              <a
                href="#simulator"
                onClick={() => setIsOpen(false)}
                className="block py-1 text-neutral-700 dark:text-neutral-300"
              >
                Simulator
              </a>
            </>
          ) : (
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block py-1 text-neutral-700 dark:text-neutral-300"
            >
              ← Back to Home
            </Link>
          )}
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-amber-700 dark:text-amber-400 font-bold"
          >
            About Team ThunderBoltz
          </Link>
        </div>
      )}
    </header>
  );
};
