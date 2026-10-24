import React from 'react';
import { DayPlan, GoogleUser, UserProgress } from '../types';
import {
  Calendar,
  Code2,
  Award,
  FileCheck2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Lock,
} from 'lucide-react';
import { LiveDateTime } from './LiveDateTime';
import { isDayUnlocked, isDayCompleted } from '../utils/dayLocking';

interface LeftSidebarProps {
  days: DayPlan[];
  selectedDay: number;
  activeView: 'planner' | 'day-workspace' | 'admin';
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSelectPlanner: () => void;
  onSelectDay: (day: number) => void;
  onOpenBadges: () => void;
  onOpenCertificate: () => void;
  onOpenAdmin: () => void;
  progress: UserProgress;
  user: GoogleUser | null;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  days,
  selectedDay,
  activeView,
  isCollapsed,
  onToggleCollapse,
  onSelectPlanner,
  onSelectDay,
  onOpenBadges,
  onOpenCertificate,
  onOpenAdmin,
  progress,
  user,
}) => {
  const unlockedBadgesCount = Object.keys(progress.unlockedBadges).length;

  return (
    <aside
      className={`fixed top-18 bottom-0 left-0 z-30 bg-[#0A192F] text-white border-r-2 border-[#1E3A8A] transition-all duration-300 flex flex-col shadow-xl select-none ${
        isCollapsed ? 'w-16' : 'w-72'
      }`}
      aria-label="Navigation Sidebar"
    >
      {/* Sidebar Header & Toggle */}
      <div className="p-3 border-b border-[#1E3A8A] flex items-center justify-between bg-[#081426]">
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-lg bg-white text-[#0A192F] font-black text-sm flex items-center justify-center shrink-0">
              K
            </div>
            <div className="truncate">
              <div className="text-xs font-black tracking-tight text-white truncate">
                Day Navigation
              </div>
              <div className="text-[10px] text-[#93C5FD] truncate font-medium">
                SPSU 10-Day Pathway
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onToggleCollapse}
          className={`p-1.5 rounded-lg bg-[#112240] hover:bg-[#1E3A8A] text-[#BFDBFE] hover:text-white transition-colors cursor-pointer border border-[#1E3A8A] ${
            isCollapsed ? 'mx-auto' : ''
          }`}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={isCollapsed ? 'Expand navigation sidebar' : 'Collapse navigation sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-[#93C5FD]" />
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-bold pr-1">
              <ChevronLeft className="w-4 h-4 text-[#93C5FD]" />
              <span>Collapse</span>
            </div>
          )}
        </button>
      </div>

      {/* Main Scrollable Navigation Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1.5 custom-scrollbar">
        {/* Complete 10-Day Planner Link */}
        <button
          type="button"
          onClick={onSelectPlanner}
          className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
            activeView === 'planner'
              ? 'bg-white text-[#0A192F] shadow-sm font-extrabold'
              : 'text-[#BFDBFE] hover:bg-[#112240] hover:text-white'
          }`}
          title="Complete 10-Day Planner Overview"
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              activeView === 'planner'
                ? 'bg-[#0A192F] text-white'
                : 'bg-[#112240] text-[#93C5FD]'
            }`}
          >
            <Calendar className="w-4 h-4" />
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <div className="truncate">10-Day Planner</div>
              <div
                className={`text-[10px] truncate ${
                  activeView === 'planner' ? 'text-slate-600' : 'text-[#93C5FD]'
                }`}
              >
                Syllabus & Milestones
              </div>
            </div>
          )}
        </button>

        {/* Divider */}
        {!isCollapsed && (
          <div className="px-2 pt-3 pb-1 text-[10px] uppercase font-bold tracking-wider text-[#93C5FD]/80 flex items-center justify-between">
            <span>Daily Modules</span>
            <span className="font-mono text-[9px] bg-[#112240] px-1.5 py-0.5 rounded text-[#BFDBFE]">
              {unlockedBadgesCount}/10 Done
            </span>
          </div>
        )}

        {/* All 10 Days List */}
        <div className="space-y-1">
          {days.map((day) => {
            const isUnlocked = isDayUnlocked(day.day, progress);
            const isComplete = isDayCompleted(day.day, progress);
            const isSelected = activeView === 'day-workspace' && selectedDay === day.day;
            const isBadgeUnlocked = !!progress.unlockedBadges[day.day];
            const hasPrePassed = !!progress.preAssessmentPassed[day.day];
            const hasPostPassed = !!progress.postAssessmentPassed[day.day];

            return (
              <button
                key={day.day}
                type="button"
                onClick={() => {
                  if (isUnlocked) {
                    onSelectDay(day.day);
                  } else {
                    alert(`Day ${day.day} is locked! Complete all sections of Day ${day.day - 1} (Pre-Assessment, Notes, IDE Lab, and Post-Assessment) to unlock.`);
                  }
                }}
                className={`w-full flex items-center gap-2 p-1.5 rounded-xl text-left text-xs transition-all ${
                  !isUnlocked
                    ? 'opacity-50 text-slate-400 hover:bg-[#112240]/40 cursor-not-allowed'
                    : isSelected
                    ? 'bg-[#1E3A8A] text-white font-extrabold ring-1 ring-white/40 cursor-pointer'
                    : 'text-[#BFDBFE] hover:bg-[#112240] hover:text-white cursor-pointer'
                }`}
                title={
                  !isUnlocked
                    ? `Day ${day.day} is Locked (Complete Day ${day.day - 1} to unlock)`
                    : `Day ${day.day}: ${day.title}`
                }
              >
                {/* Day Badge / Number / Lock Icon */}
                <div
                  className={`w-8 h-8 rounded-lg font-black text-xs flex items-center justify-center shrink-0 transition-transform ${
                    !isUnlocked
                      ? 'bg-[#081426] text-slate-400 border border-slate-700'
                      : isBadgeUnlocked
                      ? 'bg-amber-400 text-[#0A192F] shadow-xs'
                      : isSelected
                      ? 'bg-white text-[#0A192F]'
                      : 'bg-[#112240] text-[#93C5FD] border border-[#1E3A8A]'
                  }`}
                >
                  {!isUnlocked ? (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  ) : isBadgeUnlocked ? (
                    <Award className="w-4 h-4 text-[#0A192F]" />
                  ) : (
                    `D${day.day}`
                  )}
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-[11px] truncate text-white">
                        Day {day.day} {!isUnlocked && <span className="text-[9px] text-amber-300 font-normal">[Locked]</span>}
                      </span>
                      {!isUnlocked ? (
                        <span className="text-[9px] font-bold text-slate-400 bg-slate-800/80 px-1 py-0.2 rounded border border-slate-700">
                          Locked 🔒
                        </span>
                      ) : isBadgeUnlocked ? (
                        <span className="text-[9px] font-bold text-amber-300 bg-amber-950/60 px-1 py-0.2 rounded border border-amber-500/30">
                          Badge ✓
                        </span>
                      ) : hasPostPassed ? (
                        <span className="text-[9px] font-bold text-emerald-400">Post ✓</span>
                      ) : hasPrePassed ? (
                        <span className="text-[9px] font-bold text-sky-300">Pre ✓</span>
                      ) : null}
                    </div>
                    <div className="text-[10px] text-[#BFDBFE] truncate">
                      {!isUnlocked ? `Complete Day ${day.day - 1} to Unlock` : day.title}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer with Live Date/Time & Actions */}
      <div className="p-2.5 border-t border-[#1E3A8A] bg-[#081426] space-y-2">
        {/* Real Live Date/Time display in expanded view */}
        {!isCollapsed && <LiveDateTime variant="sidebar" />}

        {/* Quick Badges & Certificate Buttons */}
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={onOpenBadges}
            className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
              isCollapsed
                ? 'justify-center bg-[#112240] text-[#93C5FD] hover:bg-[#1E3A8A] hover:text-white'
                : 'bg-[#112240] hover:bg-[#1E3A8A] text-white border border-[#1E3A8A]'
            }`}
            title="Download Daily Badges (PNG/PDF)"
          >
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            {!isCollapsed && (
              <div className="flex items-center justify-between flex-1">
                <span>Daily Badges</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-400 text-[#0A192F] font-mono text-[10px] font-black">
                  {unlockedBadgesCount}/10
                </span>
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCertificate}
            className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs font-extrabold transition-all cursor-pointer ${
              isCollapsed
                ? 'justify-center bg-white text-[#0A192F] hover:bg-[#EFF6FF]'
                : 'bg-white hover:bg-[#EFF6FF] text-[#0A192F] shadow-xs'
            }`}
            title="Official Certificate by Kapil (PNG/PDF)"
          >
            <FileCheck2 className="w-4 h-4 text-[#1E3A8A] shrink-0" />
            {!isCollapsed && (
              <div className="truncate">
                <div className="text-[11px] font-black leading-tight">Kapil Certificate</div>
                <div className="text-[9px] text-slate-600 font-medium leading-tight">
                  Sole Official Signatory
                </div>
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenAdmin}
            className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
              activeView === 'admin'
                ? isCollapsed
                  ? 'justify-center bg-amber-400 text-[#0A192F]'
                  : 'bg-amber-400 text-[#0A192F] font-black'
                : isCollapsed
                ? 'justify-center bg-[#112240] text-amber-300 hover:bg-[#1E3A8A]'
                : 'bg-[#112240] hover:bg-[#1E3A8A] text-amber-300 border border-amber-400/40'
            }`}
            title="Administrator Dashboard & Score Export"
          >
            <Lock className="w-4 h-4 text-amber-300 shrink-0" />
            {!isCollapsed && <span>Admin Portal</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};
