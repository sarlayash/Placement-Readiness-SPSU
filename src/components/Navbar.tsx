import React from 'react';
import { GoogleUser, UserProgress } from '../types';
import {
  Award,
  Bell,
  Calendar,
  Code2,
  FileCheck2,
  Layers,
  Lock,
  LogIn,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { LiveDateTime } from './LiveDateTime';

interface NavbarProps {
  user: GoogleUser | null;
  progress: UserProgress;
  activeView: 'planner' | 'day-workspace' | 'admin';
  selectedDay: number;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onSelectPlanner: () => void;
  onSelectDay: (day: number) => void;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenBadges: () => void;
  onOpenCertificate: () => void;
  onOpenAdmin: () => void;
  onOpenLearnerDashboard: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  progress,
  activeView,
  selectedDay,
  isSidebarCollapsed,
  onToggleSidebar,
  onSelectPlanner,
  onSelectDay,
  onOpenAuth,
  onSignOut,
  onOpenBadges,
  onOpenCertificate,
  onOpenAdmin,
  onOpenLearnerDashboard,
  onOpenNotifications,
  unreadNotificationsCount = 0,
}) => {
  const unlockedBadgesCount = Object.keys(progress.unlockedBadges).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A192F] text-white border-b-2 border-[#1E3A8A] shadow-md">
      <div className="w-full px-4 sm:px-6 h-18 flex items-center justify-between gap-3">
        {/* Left: Sidebar Toggle Button + Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] text-[#BFDBFE] hover:text-white transition-all cursor-pointer border border-[#1E3A8A] flex items-center gap-1.5 shadow-xs"
            title={isSidebarCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Navigation Sidebar'}
            aria-label={isSidebarCollapsed ? 'Expand navigation sidebar' : 'Collapse navigation sidebar'}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-5 h-5 text-[#93C5FD]" />
            ) : (
              <PanelLeftClose className="w-5 h-5 text-[#93C5FD]" />
            )}
            <span className="hidden sm:inline text-xs font-bold text-[#BFDBFE]">
              {isSidebarCollapsed ? 'Expand' : 'Collapse'}
            </span>
          </button>

          <button
            type="button"
            onClick={onSelectPlanner}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#0A192F] font-black text-xl flex items-center justify-center border-2 border-[#93C5FD] shadow-xs group-hover:scale-105 transition-transform">
              K
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-base sm:text-lg tracking-tight text-white">
                  SPSU Udaipur
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#1E3A8A] text-white border border-[#93C5FD]/40 font-bold">
                  Mentorship By Kapil
                </span>
              </div>
              <p className="text-[11px] text-[#BFDBFE] font-medium hidden sm:block">
                10-Day Placement Portal • 30% Theory | 70% Practical
              </p>
            </div>
          </button>
        </div>

        {/* Center: Real Live Date & Time Widget */}
        <div className="flex items-center gap-2">
          <LiveDateTime variant="header" />
        </div>

        {/* Right: Notifications, Learner Dashboard, Badges, Certificate & Strict Google Auth */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Automatic Reminders Notification Bell */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] border border-[#93C5FD]/40 text-[#BFDBFE] hover:text-white transition-all cursor-pointer shadow-xs"
            title="Automatic Reminders & Push Notification Alerts"
            aria-label="View notifications and reminders"
          >
            <Bell className="w-4 h-4 text-amber-300" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-mono text-[9px] font-black flex items-center justify-center animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Learner Dashboard: Live Scores & 80% Benchmark */}
          <button
            type="button"
            onClick={onOpenLearnerDashboard}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] border border-[#93C5FD]/40 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            title="View Real-Time Scores & Learner Dashboard (80% Passing Benchmark)"
          >
            <Layers className="w-4 h-4 text-[#93C5FD]" />
            <span className="hidden md:inline">My Scores</span>
          </button>

          {/* Daily Badges Button (Shows ONLY real user's unlocked count) */}
          <button
            type="button"
            onClick={onOpenBadges}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] border border-[#93C5FD]/40 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            title="View & Download Daily Badges in PNG and PDF"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Badges</span>
            <span className="px-1.5 py-0.5 rounded-md bg-white text-[#0A192F] font-mono text-[11px] font-black">
              {unlockedBadgesCount}/10
            </span>
          </button>

          {/* Official Certificate Button */}
          <button
            type="button"
            onClick={onOpenCertificate}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#EFF6FF] text-[#0A192F] text-xs font-extrabold transition-all cursor-pointer shadow-xs"
            title="Official Certificate Powered by Kapil (PNG & PDF)"
          >
            <FileCheck2 className="w-4 h-4 text-[#1E3A8A]" />
            <span className="hidden md:inline">Certificate</span>
          </button>

          {/* Admin Lock Button */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
              activeView === 'admin'
                ? 'bg-amber-400 text-[#0A192F] font-black'
                : 'bg-[#112240] hover:bg-[#1E3A8A] border border-amber-400/50 text-amber-300 hover:text-white'
            }`}
            title="Administrator Dashboard & Score Export"
            aria-label="Admin Dashboard"
          >
            <Lock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* Google User Profile or Sign-In */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-[#1E3A8A]">
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
              <div className="hidden xl:block text-left leading-tight">
                <div className="text-xs font-bold text-white truncate max-w-[120px]">
                  {user.name}
                </div>
                <div className="text-[10px] font-mono text-[#93C5FD] truncate max-w-[120px]">
                  {user.email}
                </div>
              </div>
              <button
                type="button"
                onClick={onSignOut}
                className="p-2 rounded-lg bg-[#112240] hover:bg-[#1E3A8A] text-[#BFDBFE] hover:text-white transition-colors cursor-pointer"
                title="Sign out of Google Account"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1E3A8A] hover:bg-[#2563EB] border border-white/30 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Google Sign-In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
