import React from 'react';
import { GoogleUser, UserProgress } from '../types';
import { Bell, LogIn, LogOut, Menu } from 'lucide-react';
import { LiveDateTime } from './LiveDateTime';

interface NavbarProps {
  user: GoogleUser | null;
  progress: UserProgress;
  activeView: 'planner' | 'day-workspace' | 'admin' | 'system-design' | 'interview-readiness';
  selectedDay: number;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onSelectPlanner: () => void;
  onSelectDay: (day: number) => void;
  onSelectSystemDesign?: () => void;
  onSelectInterviewReadiness?: () => void;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenBadges: () => void;
  onOpenCertificate: () => void;
  onOpenCredentials?: () => void;
  onOpenAdmin: () => void;
  onOpenLearnerDashboard: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  isSidebarCollapsed,
  onToggleSidebar,
  onSelectPlanner,
  onOpenAuth,
  onSignOut,
  onOpenNotifications,
  unreadNotificationsCount = 0,
}) => (
  <header className="app-navbar sticky top-0 z-40 w-full text-white">
    <div className="app-navbar-inner h-[68px] flex items-center justify-between gap-4 px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="app-icon-button"
          title={isSidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          aria-label={isSidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          <Menu className="h-5 w-5" />
        </button>
        <button type="button" onClick={onSelectPlanner} className="flex min-w-0 items-center gap-3 text-left">
          <span className="app-brand-mark">P</span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold tracking-tight sm:text-base">Placement Readiness</span>
            <span className="hidden text-xs text-slate-500 sm:block">SPSU · Mentorship by Kapil</span>
          </span>
        </button>
      </div>

      <div className="hidden md:block"><LiveDateTime variant="header" /></div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onOpenNotifications}
          className="app-icon-button relative"
          title="Notifications and reminders"
          aria-label="View notifications and reminders"
        >
          <Bell className="h-4 w-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
              {unreadNotificationsCount}
            </span>
          )}
        </button>
        {user ? (
          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
            <img src={user.photoURL} alt={user.name} className="h-8 w-8 rounded-full border border-slate-200 object-cover" />
            <span className="hidden max-w-[150px] truncate text-xs font-semibold text-slate-700 lg:block">{user.name}</span>
            <button type="button" onClick={onSignOut} className="app-icon-button" title="Sign out" aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button type="button" onClick={onOpenAuth} className="app-primary-button">
            <LogIn className="h-4 w-4" /><span className="hidden sm:inline">Sign in</span>
          </button>
        )}
      </div>
    </div>
  </header>
);
