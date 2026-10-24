import React from 'react';
import { GoogleUser, UserProgress } from '../types';
import { Award, BookOpen, Calendar, Code2, FileCheck2, LogIn, LogOut, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  user: GoogleUser | null;
  progress: UserProgress;
  activeView: 'planner' | 'day-workspace';
  selectedDay: number;
  onSelectPlanner: () => void;
  onSelectDay: (day: number) => void;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenBadges: () => void;
  onOpenCertificate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  progress,
  activeView,
  selectedDay,
  onSelectPlanner,
  onSelectDay,
  onOpenAuth,
  onSignOut,
  onOpenBadges,
  onOpenCertificate,
}) => {
  const unlockedBadgesCount = Object.keys(progress.unlockedBadges).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A192F] text-white border-b-2 border-[#1E3A8A] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
        {/* Left: SPSU Udaipur & Mentorship By Kapil Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSelectPlanner}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-white text-[#0A192F] font-black text-xl flex items-center justify-center border-2 border-[#93C5FD] shadow-xs group-hover:scale-105 transition-transform">
              K
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-base sm:text-lg tracking-tight text-white">
                  SPSU Udaipur
                </span>
                <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#1E3A8A] text-white border border-[#93C5FD]/40 font-bold">
                  Mentorship By Kapil
                </span>
              </div>
              <p className="text-xs text-[#BFDBFE] font-medium">
                10-Day Placement & Assessment Portal • 30% Theory | 70% Practical
              </p>
            </div>
          </button>
        </div>

        {/* Center Navigation Pills */}
        <nav className="hidden md:flex items-center gap-2 bg-[#112240] p-1.5 rounded-xl border border-[#1E3A8A]">
          <button
            type="button"
            onClick={onSelectPlanner}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === 'planner'
                ? 'bg-white text-[#0A192F] shadow-xs'
                : 'text-[#BFDBFE] hover:text-white hover:bg-[#1E3A8A]/50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Complete 10-Day Planner</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectDay(selectedDay)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === 'day-workspace'
                ? 'bg-white text-[#0A192F] shadow-xs'
                : 'text-[#BFDBFE] hover:text-white hover:bg-[#1E3A8A]/50'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Day {selectedDay} Lab & Notes</span>
          </button>
        </nav>

        {/* Right: Badges, Certificate & Strict Google Auth */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Daily Badges Button (Shows ONLY real user's unlocked count) */}
          <button
            type="button"
            onClick={onOpenBadges}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] border border-[#93C5FD]/40 text-white text-xs font-bold transition-all cursor-pointer"
            title="View & Download Daily Badges in PNG and PDF"
          >
            <Award className="w-4 h-4 text-[#93C5FD]" />
            <span className="hidden sm:inline">Badges</span>
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
            <span className="hidden sm:inline">Certificate</span>
          </button>

          {/* Google User Profile or Sign-In */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-[#1E3A8A]">
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
              <div className="hidden lg:block text-left leading-tight">
                <div className="text-xs font-bold text-white truncate max-w-[130px]">
                  {user.name}
                </div>
                <div className="text-[10px] font-mono text-[#93C5FD] truncate max-w-[130px]">
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
