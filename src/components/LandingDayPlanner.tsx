import React from 'react';
import { DayPlan, CurriculumModule, GoogleUser, UserProgress } from '../types';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Download,
  FileText,
  Image,
  Layers,
  LogIn,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { downloadBadgePNG, downloadBadgePDF } from '../utils/exportCredentials';

interface LandingDayPlannerProps {
  days: DayPlan[];
  modules: CurriculumModule[];
  user: GoogleUser | null;
  progress: UserProgress;
  onSelectDay: (day: number, initialTab?: 'notes' | 'ide' | 'pre' | 'post') => void;
  onOpenAuth: () => void;
  onOpenBadges: () => void;
  onOpenCertificate: () => void;
}

export const LandingDayPlanner: React.FC<LandingDayPlannerProps> = ({
  days,
  modules,
  user,
  progress,
  onSelectDay,
  onOpenAuth,
  onOpenBadges,
  onOpenCertificate,
}) => {
  // Real, non-fake structural counts & authenticated user progress only
  const unlockedBadgesCount = Object.keys(progress.unlockedBadges).length;
  const preCompletedCount = Object.keys(progress.preAssessmentPassed).filter(
    (d) => progress.preAssessmentPassed[Number(d)]
  ).length;
  const postCompletedCount = Object.keys(progress.postAssessmentPassed).filter(
    (d) => progress.postAssessmentPassed[Number(d)]
  ).length;
  const solvedLabsCount = progress.completedChallengeIds.length;

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner: Navy Blue & White Theme */}
      <section className="rounded-3xl bg-[#0A192F] text-white border-2 border-[#1E3A8A] p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-4xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#112240] border border-[#93C5FD]/40 text-xs font-mono font-bold text-[#93C5FD]">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>SPSU UDAIPUR • MENTORSHIP BY KAPIL • OFFICIAL 10-DAY PLANNER</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Complete 10-Day Placement & Technical Assessment Planner
          </h1>

          <p className="text-sm sm:text-base text-[#BFDBFE] leading-relaxed max-w-3xl">
            Aligned across all <strong className="text-white">11 Core Curriculum Modules</strong> in a structured{' '}
            <strong className="text-white">10-Day Execution Schedule</strong>. Every day enforces a strict{' '}
            <strong className="text-white underline">30% Conceptual Theory & 70% Practical Execution</strong> balance with Daily Pre-Assessments, Multi-Language Programming Notes (<span className="font-mono text-white">C, C++, Java, Python</span>), an Integrated Coding IDE, Daily Post-Assessments, and Daily Downloadable Badges (<span className="font-mono text-white">PNG & PDF</span>) & Certificates signed exclusively by <strong className="text-white">Kapil</strong>.
          </p>

          {/* Pedagogical Architecture Pills (Strictly Factual Curriculum Structure — Zero Fake Statistics) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="p-3.5 rounded-2xl bg-[#112240] border border-[#1E3A8A]">
              <div className="text-[11px] font-mono uppercase text-[#93C5FD] font-bold">
                Curriculum Alignment
              </div>
              <div className="text-lg sm:text-xl font-black text-white mt-0.5">
                10 Days • 11 Modules
              </div>
              <div className="text-[11px] text-[#BFDBFE]">Complete Syllabus Mapped</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#112240] border border-[#1E3A8A]">
              <div className="text-[11px] font-mono uppercase text-[#93C5FD] font-bold">
                Pedagogy Split
              </div>
              <div className="text-lg sm:text-xl font-black text-white mt-0.5">
                30% Theory • 70% Lab
              </div>
              <div className="text-[11px] text-[#BFDBFE]">Integrated Multi-Lang IDE</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#112240] border border-[#1E3A8A]">
              <div className="text-[11px] font-mono uppercase text-[#93C5FD] font-bold">
                Languages & Notes
              </div>
              <div className="text-lg sm:text-xl font-black text-white mt-0.5">
                C • C++ • Java • Python
              </div>
              <div className="text-[11px] text-[#BFDBFE]">Side-by-Side Code & Execution</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#112240] border border-[#1E3A8A]">
              <div className="text-[11px] font-mono uppercase text-[#93C5FD] font-bold">
                Your Real Progress
              </div>
              <div className="text-lg sm:text-xl font-black text-white mt-0.5">
                {unlockedBadgesCount}/10 Badges
              </div>
              <div className="text-[11px] text-[#BFDBFE]">
                Pre: {preCompletedCount}/10 • Post: {postCompletedCount}/10 • Labs: {solvedLabsCount}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onSelectDay(1, 'notes')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#EFF6FF] text-[#0A192F] font-black text-xs sm:text-sm transition-all cursor-pointer shadow-md"
            >
              <Terminal className="w-4 h-4 text-[#1E3A8A]" />
              <span>Start Day 1 Learning & IDE Lab</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenBadges}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] border border-white/30 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 text-[#93C5FD]" />
              <span>Daily Badges Gallery (PNG/PDF)</span>
            </button>

            <button
              type="button"
              onClick={onOpenCertificate}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] border border-white/30 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#93C5FD]" />
              <span>Official Kapil Certificate</span>
            </button>

            {!user && (
              <button
                type="button"
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1E3A8A] hover:bg-[#2563EB] border border-[#93C5FD] text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Google Sign-Up to Bind Credentials</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Section 1: Complete 10-Day Master Planner Grid (Landing Page Core Requirement) */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-[#0A192F] pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#1E3A8A] font-extrabold">
              10-Day Master Schedule • 30% Theory & 70% Practical
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A192F] mt-0.5">
              Complete 10-Day Learning & Assessment Planner
            </h2>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Click any Day to launch its Pre-Assessment, C/C++/Java/Python Notes, Integrated IDE, Post-Assessment & Badge Export.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {days.map((dayPlan) => {
            const preScore = progress.preAssessmentScores[dayPlan.day];
            const postScore = progress.postAssessmentScores[dayPlan.day];
            const preDone = Boolean(progress.preAssessmentPassed[dayPlan.day]);
            const postDone = Boolean(progress.postAssessmentPassed[dayPlan.day]);
            const badgeUnlockedAt = progress.unlockedBadges[dayPlan.day];
            const isBadgeUnlocked = Boolean(badgeUnlockedAt);

            return (
              <div
                key={dayPlan.day}
                className="rounded-2xl border-2 border-[#0A192F] bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Day Card Navy Header */}
                <div className="bg-[#0A192F] text-white px-5 py-4 flex items-center justify-between gap-3 border-b border-[#1E3A8A]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white text-[#0A192F] font-black text-base flex flex-col items-center justify-center leading-none shrink-0">
                      <span className="text-[9px] font-mono uppercase text-[#1E3A8A]">DAY</span>
                      <span className="text-lg">{dayPlan.day}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {dayPlan.moduleNames.map((mName) => (
                          <span
                            key={mName}
                            className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#1E3A8A] text-[#BFDBFE] font-bold"
                          >
                            {mName}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-white mt-1">
                        {dayPlan.title}
                      </h3>
                    </div>
                  </div>

                  {/* Badge Status Pill */}
                  <div className="shrink-0">
                    {isBadgeUnlocked ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#0A192F] text-[11px] font-black">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        <span>Badge Earned</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#112240] border border-[#93C5FD]/30 text-[#BFDBFE] text-[11px] font-semibold">
                        <Award className="w-3.5 h-3.5" />
                        <span>Day {dayPlan.day} Badge</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Day Card Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Coverage & Outcomes */}
                    <div className="text-xs text-slate-700 space-y-1.5">
                      <div>
                        <strong className="text-[#0A192F] uppercase font-mono text-[11px]">
                          Syllabus Coverage:{' '}
                        </strong>
                        <span>{dayPlan.coverageSummary}</span>
                      </div>
                      <div>
                        <strong className="text-[#1E3A8A] uppercase font-mono text-[11px]">
                          Learning Outcomes:{' '}
                        </strong>
                        <span>{dayPlan.learningOutcomes}</span>
                      </div>
                    </div>

                    {/* 30% Theory / 70% Practical Split Bar */}
                    <div className="rounded-xl bg-[#F8FAFC] border border-slate-200 p-3 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-[#0A192F]">30% Theory Concept Notes (C, C++, Java, Python)</span>
                        <span className="text-[#1E3A8A]">70% Practical IDE Lab & Assessments</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden flex">
                        <div className="w-[30%] bg-[#0A192F]" title="30% Theory" />
                        <div className="w-[70%] bg-[#1E3A8A]" title="70% Practical" />
                      </div>
                    </div>

                    {/* Daily Time-Slot Schedule */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono uppercase font-bold text-[#0A192F]">
                        Daily Structured Timeline:
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        {dayPlan.dailySchedule.map((slot, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-slate-200 text-xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="font-mono text-[10px] font-bold text-[#1E3A8A] shrink-0">
                                {slot.timeSlot}
                              </span>
                              <span className="text-[#0A192F] font-medium truncate">
                                {slot.activity}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-slate-300 text-[#0A192F] shrink-0">
                              {slot.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons & Direct Badge Download */}
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectDay(dayPlan.day, 'pre')}
                        className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          preDone
                            ? 'bg-[#EFF6FF] border-[#1E3A8A] text-[#0A192F]'
                            : 'bg-white border-slate-300 hover:border-[#0A192F] text-[#0A192F]'
                        }`}
                      >
                        <ClipboardCheck className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        <span>Pre-Test {preScore !== undefined ? `(${preScore}%)` : ''}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectDay(dayPlan.day, 'notes')}
                        className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-300 hover:border-[#0A192F] bg-white text-[#0A192F] text-xs font-bold transition-all cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        <span>4-Lang Notes</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectDay(dayPlan.day, 'ide')}
                        className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>70% IDE Lab</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectDay(dayPlan.day, 'post')}
                        className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          postDone
                            ? 'bg-[#EFF6FF] border-[#1E3A8A] text-[#0A192F]'
                            : 'bg-white border-slate-300 hover:border-[#0A192F] text-[#0A192F]'
                        }`}
                      >
                        <Award className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        <span>Post-Test {postScore !== undefined ? `(${postScore}%)` : ''}</span>
                      </button>
                    </div>

                    {/* Daily Badge Bar with Instant PNG & PDF Download */}
                    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#F8FAFC] border border-slate-200">
                      <div className="flex items-center gap-2 text-xs">
                        <Award className="w-4 h-4 text-[#0A192F]" />
                        <span className="font-bold text-[#0A192F]">
                          Day {dayPlan.day} Badge: {dayPlan.badge.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => downloadBadgePNG(dayPlan.badge, user, badgeUnlockedAt)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#0A192F] bg-white hover:bg-[#0A192F] text-[#0A192F] hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
                          title="Download Day Badge in PNG"
                        >
                          <Image className="w-3 h-3" />
                          <span>PNG</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => downloadBadgePDF(dayPlan.badge, user, badgeUnlockedAt)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-[11px] font-bold transition-colors cursor-pointer"
                          title="Download Day Badge in PDF"
                        >
                          <Download className="w-3 h-3" />
                          <span>PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Official Curriculum & Module-wise Learning Outcomes Table (Exact Match to Syllabus Image) */}
      <section className="space-y-4">
        <div className="border-b-2 border-[#0A192F] pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#1E3A8A] font-extrabold">
              Official Syllabus Reference
            </span>
            <h2 className="text-2xl font-black text-[#0A192F]">
              Curriculum and Module-wise Learning Outcomes (Aligned to 10 Days)
            </h2>
          </div>
          <span className="text-xs font-bold text-[#0A192F] bg-[#EFF6FF] border border-[#1E3A8A] px-3 py-1 rounded-full">
            SPSU Udaipur • Mentorship By Kapil
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-[#0A192F] shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-[#0A192F] text-white text-xs sm:text-sm font-extrabold">
                <th className="py-3.5 px-4 border-r border-[#1E3A8A] w-1/5">Module</th>
                <th className="py-3.5 px-4 border-r border-[#1E3A8A] w-2/5">Coverage</th>
                <th className="py-3.5 px-4 border-r border-[#1E3A8A] w-1/4">Learning Outcomes</th>
                <th className="py-3.5 px-4 text-center w-36">10-Day Alignment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              {modules.map((mod, idx) => (
                <tr
                  key={mod.id}
                  className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}
                >
                  <td className="py-3.5 px-4 font-extrabold text-[#0A192F] border-r border-slate-200">
                    {mod.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 border-r border-slate-200 leading-relaxed">
                    {mod.coverage}
                  </td>
                  <td className="py-3.5 px-4 text-slate-800 font-medium border-r border-slate-200 leading-relaxed">
                    {mod.learningOutcomes}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => onSelectDay(mod.alignedDay, 'notes')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <span>Day {mod.alignedDay}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
