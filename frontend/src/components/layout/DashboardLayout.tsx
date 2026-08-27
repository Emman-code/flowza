import React, { useCallback } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Sidebar } from './Sidebar';
import { useSidebarStore } from '../../store/sidebar';
import { useThemeStore } from '../../store/theme';
import { useAuthStore } from '../../store/auth';
import { useWebSocket } from '../../hooks/useWebSocket';
import { NotificationBell } from '../notifications/NotificationBell';
import { Menu, Sun, Moon, LogOut, User as UserIcon, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { isCollapsed, open } = useSidebarStore();
  const { resolvedTheme, setTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  // Real-time WebSocket event handler
  const handleWebSocketMessage = useCallback(
    (payload: any) => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-bell-preview'] });

      if (payload.type?.startsWith('ORDER_') || payload.event === 'ORDER_STATUS_CHANGED') {
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        queryClient.invalidateQueries({ queryKey: ['order'] });
        queryClient.invalidateQueries({ queryKey: ['analytics'] });
      }
      if (payload.type?.startsWith('INVOICE_') || payload.type?.startsWith('PAYMENT_')) {
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
        queryClient.invalidateQueries({ queryKey: ['invoice'] });
        queryClient.invalidateQueries({ queryKey: ['analytics'] });
      }
      if (payload.type?.startsWith('INVENTORY_')) {
        queryClient.invalidateQueries({ queryKey: ['inventory'] });
        queryClient.invalidateQueries({ queryKey: ['analytics'] });
      }

      if (payload.title && payload.message) {
        if (payload.priority === 'urgent' || payload.type?.includes('REJECTED') || payload.type?.includes('OUT_OF_STOCK')) {
          toast.error(payload.title, {
            description: payload.message,
            duration: 6000,
          });
        } else {
          toast.success(payload.title, {
            description: payload.message,
            duration: 5000,
          });
        }
      }
    },
    [queryClient]
  );

  useWebSocket(handleWebSocketMessage);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return 'Workspace';
    const last = pathSegments[pathSegments.length - 1];
    return last.replace(/-/g, ' ').toUpperCase();
  };

  return (
    <div className="min-h-[100dvh] bg-[#FAFAFA] dark:bg-[#08090A] text-slate-900 dark:text-slate-100 flex transition-colors duration-200 relative overflow-x-hidden">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 min-h-[100dvh] transition-all duration-300 ${
          isCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
        }`}
      >
        {/* Top Header */}
        <header className="h-16 bg-white/85 dark:bg-[#0A0C10]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between px-3 sm:px-6 lg:px-8 z-20 shrink-0 sticky top-0">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={open}
              className="p-2 -ml-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white lg:hidden cursor-pointer"
              aria-label="Open Navigation"
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">
              <span className="capitalize">{user?.role?.name || 'Workspace'}</span>
              <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
              <span className="font-semibold text-slate-900 dark:text-white truncate">
                {getBreadcrumbs()}
              </span>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* AI Assistant Quick Pill */}
            <Link
              to="/assistant"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 transition-all cursor-pointer"
            >
              <Sparkles size={13} className="text-amber-500" />
              <span>AI Assistant</span>
            </Link>

            {/* Real-time Notifications Bell */}
            <NotificationBell />

            {/* User Profile Dropdown Pill */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800/80 transition-colors cursor-pointer"
              >
                <div className="h-8 w-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-bold flex items-center justify-center text-xs font-mono">
                  {user?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
                    {user?.full_name || 'Account'}
                  </span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono leading-tight truncate max-w-[120px]">
                    {user?.company?.company_name || user?.email}
                  </span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#12141A] border border-neutral-200 dark:border-neutral-800 shadow-xl p-1.5 z-40 space-y-1">
                    <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800/60 mb-1">
                      <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                        {user?.full_name}
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
                    >
                      <UserIcon size={15} />
                      <span>Company Profile</span>
                    </Link>
                    <Link
                      to="/assistant"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors"
                    >
                      <Sparkles size={15} />
                      <span>Flowza AI Assistant</span>
                    </Link>
                    <button
                      onClick={() => {
                        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        {resolvedTheme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                        <span>Appearance</span>
                      </span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                        {resolvedTheme}
                      </span>
                    </button>
                    <div className="border-t border-neutral-100 dark:border-neutral-800/60 my-1" />
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-3 sm:p-5 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
