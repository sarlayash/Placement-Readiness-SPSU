import React, { useState } from 'react';
import { DayPlan, CurriculumModule, GoogleUser, UserProgress } from '../types';
import {
  Award,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Code2,
  Download,
  Eye,
  FileText,
  Flame,
  Image,
  Layers,
  Lock,
  LogIn,
  Maximize2,
  Quote,
  Share2,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import mentorKapilImg from '../assets/mentor-kapil.jpg';
import spsuPortalBannerImg from '../assets/spsu-kapil-portal-banner.png';
import { downloadBadgePNG, downloadBadgePDF } from '../utils/exportCredentials';
import { isDayUnlocked, isDayCompleted, getDaySectionStatus } from '../utils/dayLocking';

interface LandingDayPlannerProps {
  days: DayPlan[];
  modules: CurriculumModule[];
  user: GoogleUser | null;
  progress: UserProgress;
  onSelectDay: (day: number, initialTab?: 'notes' | 'ide' | 'pre' | 'post' | 'project') => void;
  onOpenAuth: () => void;
  onOpenBadges: () => void;
  onOpenCertificate: () => void;
  onOpenPatternQuiz?: () => void;
  onOpenStressWheel?: () => void;
  onOpenAptitude?: () => void;
  onOpenSelfService?: () => void;
  onOpenLearnerDashboard?: () => void;
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
  onOpenPatternQuiz,
  onOpenStressWheel,
  onOpenAptitude,
  onOpenSelfService,
  onOpenLearnerDashboard,
}) => {
  const [showBannerLightbox, setShowBannerLightbox] = useState<boolean>(false);
  const [bannerCopied, setBannerCopied] = useState<boolean>(false);

  const handleDownloadBanner = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const link = document.createElement('a');
    link.href = spsuPortalBannerImg;
    link.download = 'SPSU-Udaipur-Mentor-Kapil-Placement-Banner.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareBanner = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      await navigator.clipboard.writeText(window.location.href);
      setBannerCopied(true);
      setTimeout(() => setBannerCopied(false), 2500);
    } catch {
      // ignore
    }
  };

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
      {/* 0. Grand Institutional Panoramic Banner (SPSU Udaipur × Google Classroom Powered by Kapil) */}
      <section className="rounded-3xl border-2 border-[#1E3A8A] bg-[#0A192F] shadow-2xl overflow-hidden relative group">
        {/* Top Header Micro-Bar */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#0A192F] border-b border-[#1E3A8A]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
            <span className="font-mono text-[11px] font-bold text-slate-200 tracking-wide">
              OFFICIAL COLLABORATIVE BANNER • SIR PADAMPAT SINGHANIA UNIVERSITY, UDAIPUR
            </span>
            <span className="hidden md:inline-flex px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 font-mono text-[10px] font-extrabold">
              QS I-GAUGE GOLD • RANKED #3 RAJASTHAN
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShareBanner}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-[11px] font-bold transition-all cursor-pointer"
              title="Copy Portal Link"
            >
              {bannerCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#93C5FD]" />}
              <span>{bannerCopied ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowBannerLightbox(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#112240] hover:bg-[#1E3A8A] border border-[#93C5FD]/40 text-white font-mono text-[11px] font-bold transition-all cursor-pointer shadow-xs"
              title="Expand High-Definition Panorama & Accreditations"
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Inspect Full Panorama</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadBanner}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#0A192F] font-mono text-[11px] font-black transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              title="Download High-Res Commemorative Banner"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PNG</span>
            </button>
          </div>
        </div>

        {/* The Panoramic Image Container */}
        <div
          className="relative w-full cursor-pointer overflow-hidden bg-slate-950"
          onClick={() => setShowBannerLightbox(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setShowBannerLightbox(true);
            }
          }}
          title="Click to view full-resolution banner and institutional accreditations"
        >
          <img
            src={spsuPortalBannerImg}
            alt="Sir Padampat Singhania University Udaipur - Placement Mentorship Powered by Kapil - Google Classroom Collaboration"
            className="w-full h-auto object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            loading="eager"
          />

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-6 pointer-events-none">
            <div className="text-white text-xs sm:text-sm font-bold flex items-center gap-2 drop-shadow-md">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Click anywhere to explore full panoramic view &amp; national accreditation credentials</span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs font-mono font-bold border border-white/30 shadow-lg">
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>Inspect Full Resolution</span>
            </div>
          </div>
        </div>

        {/* 7-Pillar Interactive Navigation Deck (Corresponding directly to banner's 7 bottom pillars) */}
        <div className="p-3 sm:p-4 bg-[#081426] border-t border-[#1E3A8A]/80">
          <div className="flex items-center justify-between gap-2 mb-2 px-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              7 Core Placement Pillars (From Campus to Careers Together)
            </span>
            <span className="text-[10px] font-mono text-[#BFDBFE] hidden sm:inline">
              Click any pillar to launch respective portal section
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {[
              {
                id: 'learn',
                icon: BookOpen,
                label: 'Learn Anytime',
                sub: '10-Day Plan',
                action: () => onSelectDay(1, 'notes'),
              },
              {
                id: 'resources',
                icon: Layers,
                label: 'Access Resources',
                sub: '4-Lang Notes',
                action: () => onSelectDay(1, 'notes'),
              },
              {
                id: 'assignments',
                icon: Code2,
                label: 'Submit Labs',
                sub: '70% IDE Lab',
                action: () => onSelectDay(1, 'ide'),
              },
              {
                id: 'collaborate',
                icon: Quote,
                label: 'Collaborate',
                sub: 'Mentor Kapil',
                action: () => {
                  const el = document.getElementById('mentor-note-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                },
              },
              {
                id: 'progress',
                icon: CheckCircle2,
                label: 'Track Progress',
                sub: '360° Analytics',
                action: () => {
                  if (onOpenLearnerDashboard) onOpenLearnerDashboard();
                  else if (onOpenSelfService) onOpenSelfService();
                },
              },
              {
                id: 'certificates',
                icon: Award,
                label: 'Earn Credentials',
                sub: 'Badges & LOR',
                action: onOpenCertificate,
              },
              {
                id: 'careers',
                icon: Zap,
                label: 'Prepare Careers',
                sub: '100 DSA Quizzes',
                action: () => {
                  if (onOpenPatternQuiz) onOpenPatternQuiz();
                  else onSelectDay(1, 'ide');
                },
              },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={p.action}
                  className="p-2.5 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] border border-[#1E3A8A] text-left transition-all cursor-pointer group/btn shadow-xs hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-1.5 text-amber-300 group-hover/btn:text-white transition-colors">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs font-black text-white truncate">{p.label}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 group-hover/btn:text-[#BFDBFE] truncate mt-0.5 font-mono">
                    {p.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 1. Official Note from Mentor Kapil Banner with Image - Top of Landing Page */}
      <section id="mentor-note-section" className="rounded-3xl bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F] text-white border-2 border-[#1E3A8A] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Ambient background accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Mentor Image Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group max-w-xs sm:max-w-sm w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#93C5FD] via-amber-300 to-[#1E3A8A] rounded-3xl blur-md opacity-50 group-hover:opacity-80 transition duration-500" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 bg-white shadow-2xl">
                <img
                  src={mentorKapilImg}
                  alt="Mentor Kapil - SPSU Udaipur Placement Mentorship"
                  className="w-full h-auto object-cover object-top block transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
            <div className="mt-3.5 text-center">
              <div className="text-base font-black tracking-wide text-white uppercase font-mono">
                Kapil
              </div>
              <div className="text-xs text-[#93C5FD] font-semibold mt-0.5">
                Placement Mentor – Kapil (Independent Technical Mentor)
              </div>
              <div className="text-[11px] text-[#BFDBFE]/80 mt-0.5">
                Placement Readiness Boot Camp in collaboration with SPSU Udaipur
              </div>
            </div>
          </div>

          {/* Mentor Note Letter & Philosophy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A8A]/70 border border-[#93C5FD]/40 text-xs font-mono font-bold text-[#93C5FD]">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>OFFICIAL MENTOR ADDRESS • INDEPENDENT PLACEMENT MENTOR</span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Note from Mentor Kapil
              </h2>
              <div className="text-xs sm:text-sm font-mono text-[#BFDBFE] font-bold">
                A Personal Message to Every Placement & Engineering Aspirant
              </div>
            </div>

            {/* Mentor's Iconic Callout Quote */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#081426]/90 border-l-4 border-amber-400 border-y border-r border-[#1E3A8A] space-y-2">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-wider font-extrabold">
                <Quote className="w-4 h-4 rotate-180" />
                <span>Mentor's Core Philosophy</span>
              </div>
              <blockquote className="text-base sm:text-lg lg:text-xl font-serif italic text-white leading-relaxed">
                “People are more than predictions.<br className="hidden sm:inline" />
                Contributions are more than metrics.<br className="hidden sm:inline" />
                And gratitude is more than an algorithm.”
              </blockquote>
            </div>

            {/* Mentor's Letter */}
            <div className="space-y-3 text-xs sm:text-sm text-[#BFDBFE] leading-relaxed">
              <p>
                <strong className="text-white">Welcome, future engineers and leaders of SPSU Udaipur.</strong> Preparing for high-stakes technical placements is never about rote memorization or surface-level tricks. Real engineering readiness demands <strong className="text-white underline">conceptual clarity</strong>, the discipline to <strong className="text-white underline">trace code execution step-by-step</strong>, and the tenacity to build solutions from first principles across <strong className="text-white">C, C++, Java, and Python</strong>.
              </p>
              <p>
                We have structured this 10-day roadmap with a deterministic <strong className="text-white">30% Theory & 70% Practical Execution</strong> ratio. Each day is locked sequentially until you conquer its challenges, pass the 50-MCQ assessments with genuine code analysis, and verify every single section.
              </p>
              <p>
                Treat every problem with respect, write clean code, and hold yourself to the highest standard of excellence. I am with you at every step of this journey.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectDay(1, 'notes')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#EFF6FF] text-[#0A192F] font-black text-xs sm:text-sm transition-all cursor-pointer shadow-md hover:scale-[1.02]"
              >
                <Terminal className="w-4 h-4 text-[#1E3A8A]" />
                <span>Begin Day 1 with Mentor Kapil</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenCertificate}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] border border-white/30 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <Award className="w-4 h-4 text-[#93C5FD]" />
                <span>Official Kapil Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </section>

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

      {/* 2. NEW FEATURE: 100 Unique Real-Time Industry Scenarios: DSA Pattern Identification Quiz */}
      <section className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-white to-blue-50 border-2 border-amber-400 p-6 sm:p-8 shadow-lg space-y-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white font-mono font-black text-xs shadow-xs">
                <Trophy className="w-3.5 h-3.5 text-white" />
                <span>NEW INDUSTRY FEATURE • 100 SCENARIOS</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 font-mono text-xs font-bold">
                Netflix • Uber • Amazon • Google • Stripe • Meta • Spotify
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
              100 Real-Time Industry Problem Scenarios: DSA Pattern Identification Quiz
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Top tech recruiters test your ability to look at real-world production engineering challenges and instantly map them to the optimal algorithmic pattern (Sliding Window, Monotonic Stack, Two Pointers, Binary Search on Answer, DSU, Topological Sort, Heaps, and Dynamic Programming). Test your placement readiness across 100 unique real-time scenarios curated by <strong>Mentor Kapil</strong>!
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {onOpenPatternQuiz && (
              <button
                type="button"
                onClick={onOpenPatternQuiz}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-black text-sm transition-all cursor-pointer shadow-xl hover:scale-[1.02] border-2 border-amber-400 group"
              >
                <Trophy className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>Launch 100-Scenario Quiz Master</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </button>
            )}
          </div>
        </div>

        {/* 4 Sample Live Cards previewing the 100 scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
          {/* Card 1 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-[#1E3A8A] transition-all">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-700 font-bold font-mono text-[11px]">
                Netflix
              </span>
              <span className="text-[10px] text-slate-400 font-mono font-bold">Scenario #1</span>
            </div>
            <div className="font-extrabold text-xs text-[#0A192F] line-clamp-1">
              Adaptive Bitrate Buffer Smoothing
            </div>
            <p className="text-[11px] text-slate-600 line-clamp-2">
              Smooth video playback by measuring bandwidth packet throughput over a sliding time interval of K seconds.
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="font-mono text-emerald-700 font-bold">Sliding Window</span>
              {onOpenPatternQuiz && (
                <button
                  type="button"
                  onClick={onOpenPatternQuiz}
                  className="text-xs font-bold text-[#1E3A8A] hover:underline cursor-pointer"
                >
                  Solve →
                </button>
              )}
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-[#1E3A8A] transition-all">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white font-bold font-mono text-[11px]">
                Uber
              </span>
              <span className="text-[10px] text-slate-400 font-mono font-bold">Scenario #2</span>
            </div>
            <div className="font-extrabold text-xs text-[#0A192F] line-clamp-1">
              Nearest Available Driver Dispatch
            </div>
            <p className="text-[11px] text-slate-600 line-clamp-2">
              Query top 5 closest available drivers out of 50,000 active cabs in under 5 milliseconds.
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="font-mono text-emerald-700 font-bold">Max-Heap (Top-K)</span>
              {onOpenPatternQuiz && (
                <button
                  type="button"
                  onClick={onOpenPatternQuiz}
                  className="text-xs font-bold text-[#1E3A8A] hover:underline cursor-pointer"
                >
                  Solve →
                </button>
              )}
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-[#1E3A8A] transition-all">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold font-mono text-[11px]">
                Amazon
              </span>
              <span className="text-[10px] text-slate-400 font-mono font-bold">Scenario #3</span>
            </div>
            <div className="font-extrabold text-xs text-[#0A192F] line-clamp-1">
              Warehouse Robot Cargo Bin Packing
            </div>
            <p className="text-[11px] text-slate-600 line-clamp-2">
              Pack 100,000 packages into K containers minimizing the maximum container weight without rearranging items.
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="font-mono text-emerald-700 font-bold">BS on Answer</span>
              {onOpenPatternQuiz && (
                <button
                  type="button"
                  onClick={onOpenPatternQuiz}
                  className="text-xs font-bold text-[#1E3A8A] hover:underline cursor-pointer"
                >
                  Solve →
                </button>
              )}
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-[#1E3A8A] transition-all">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-bold font-mono text-[11px]">
                Stripe
              </span>
              <span className="text-[10px] text-slate-400 font-mono font-bold">Scenario #7</span>
            </div>
            <div className="font-extrabold text-xs text-[#0A192F] line-clamp-1">
              Zero-Sum Credit Loop Detection
            </div>
            <p className="text-[11px] text-slate-600 line-clamp-2">
              Detect contiguous sequences of negative and positive transactions cancelling to zero balance in single pass.
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="font-mono text-emerald-700 font-bold">Prefix Sum + Map</span>
              {onOpenPatternQuiz && (
                <button
                  type="button"
                  onClick={onOpenPatternQuiz}
                  className="text-xs font-bold text-[#1E3A8A] hover:underline cursor-pointer"
                >
                  Solve →
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEW SPECIAL PLACEMENT TOOLS: Spinning Wheel Stress Buster + 50 Aptitude MCQs + Self-Service Hub */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Placement Resilience, Cognitive Aptitude & Credential Hub</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#0A192F] mt-0.5">
              Interactive Tools, Aptitude Drills & Career Verification
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Direct Real-Time Firestore Sync
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card A: Spinning Wheel B-Tech Stress Buster */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white to-amber-50 border-2 border-amber-400 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-amber-400 text-[#0A192F] flex items-center justify-center text-2xl shadow-sm">
                  🎡
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono text-[10px] font-bold">
                  25 Hilarious Scenarios
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-[#0A192F]">
                  Spinning Wheel: B-Tech Stress Buster
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  3 AM segfaults, ghost teammates, 74.8% attendance panic & placement anxiety decoded with <strong>Mentor Kapil's hidden meanings & high-EQ engineering wisdom</strong>.
                </p>
              </div>

              <div className="text-[11px] font-mono text-amber-900 bg-amber-100/60 p-2.5 rounded-xl">
                • Current Score: <strong>{progress.stressQuizScore ?? 0}/25</strong> ({progress.stressQuizAnswered ?? 0} answered)
              </div>
            </div>

            {onOpenStressWheel && (
              <button
                type="button"
                onClick={onOpenStressWheel}
                className="w-full py-3 rounded-2xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Spin the Wheel Now</span>
                <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          {/* Card B: Placement Aptitude Assessment (50 MCQs) */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-500/10 via-white to-blue-50 border-2 border-[#1E3A8A] shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center text-2xl shadow-sm">
                  🧠
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                  Cutoff: 80% (40/50)
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-[#0A192F]">
                  Placement Aptitude Master (50 MCQs)
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Quantitative Aptitude, Logical Reasoning, and Verbal Ability mapped to TCS NQT, Infosys DSE, Amazon, Cognizant, and Wipro with <strong>Mentor Kapil's speed shortcuts</strong>.
                </p>
              </div>

              <div className="text-[11px] font-mono text-blue-900 bg-blue-100/60 p-2.5 rounded-xl">
                • Score: <strong>{progress.aptitudeScore !== undefined ? `${progress.aptitudeScore}% (${progress.aptitudeCorrectCount || 0}/50)` : 'Not Attempted'}</strong> • {progress.aptitudePassed ? '✓ PASSED ≥80%' : 'Required ≥80%'}
              </div>
            </div>

            {onOpenAptitude && (
              <button
                type="button"
                onClick={onOpenAptitude}
                className="w-full py-3 rounded-2xl bg-[#1E3A8A] hover:bg-[#2563EB] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Launch 50-MCQ Aptitude Test</span>
                <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          {/* Card C: Self-Service Hub (360° Report, LOR, Badges, Cert) */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-white to-emerald-50 border-2 border-emerald-500 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-sm">
                  📜
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                  PDF & PNG Hub
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-[#0A192F]">
                  Self-Service Credentials & Reports Hub
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Instant one-click downloads: <strong>360-Degree Placement Analysis Report (PDF)</strong>, <strong>Official Letter of Recommendation (LOR) from Mentor Kapil (PDF)</strong>, Certificate & Badges.
                </p>
              </div>

              <div className="text-[11px] font-mono text-emerald-900 bg-emerald-100/60 p-2.5 rounded-xl">
                • Credentials: <strong>360° Report</strong> • <strong>Mentor LOR</strong> • <strong>Badges</strong> • <strong>Cert</strong>
              </div>
            </div>

            {onOpenSelfService && (
              <button
                type="button"
                onClick={onOpenSelfService}
                className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Open Self-Service Downloads</span>
                <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
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
            const unlocked = isDayUnlocked(dayPlan.day, progress);
            const completed = isDayCompleted(dayPlan.day, progress);

            return (
              <div
                key={dayPlan.day}
                className={`rounded-2xl border-2 transition-all flex flex-col justify-between overflow-hidden ${
                  unlocked
                    ? 'border-[#0A192F] bg-white shadow-sm hover:shadow-md'
                    : 'border-slate-300 bg-slate-50/80 opacity-90 shadow-none'
                }`}
              >
                {/* Day Card Navy Header */}
                <div className={`px-5 py-4 flex items-center justify-between gap-3 border-b ${
                  unlocked
                    ? 'bg-[#0A192F] text-white border-[#1E3A8A]'
                    : 'bg-[#1E293B] text-slate-200 border-slate-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl font-black text-base flex flex-col items-center justify-center leading-none shrink-0 ${
                      unlocked ? 'bg-white text-[#0A192F]' : 'bg-slate-700 text-slate-300'
                    }`}>
                      <span className={`text-[9px] font-mono uppercase ${unlocked ? 'text-[#1E3A8A]' : 'text-slate-400'}`}>DAY</span>
                      <span className="text-lg">{dayPlan.day}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {dayPlan.moduleNames.map((mName) => (
                          <span
                            key={mName}
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md font-bold ${
                              unlocked ? 'bg-[#1E3A8A] text-[#BFDBFE]' : 'bg-slate-700 text-slate-300'
                            }`}
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

                  {/* Badge & Lock Status Pill */}
                  <div className="shrink-0">
                    {!unlocked ? (
                      (() => {
                        const sStatus = getDaySectionStatus(dayPlan.day, progress);
                        const isTimeLocked = sStatus.lockReason === 'SCHEDULE_TIME_LOCKED';
                        return (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                            isTimeLocked
                              ? 'bg-amber-400/20 border border-amber-300 text-amber-300'
                              : 'bg-slate-700/60 border border-slate-600 text-slate-300'
                          }`}>
                            {isTimeLocked ? (
                              <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                            ) : (
                              <Lock className="w-3.5 h-3.5 text-slate-400" />
                            )}
                            <span>{isTimeLocked ? 'Unlocks 09:00 AM' : 'Locked'}</span>
                          </span>
                        );
                      })()
                    ) : isBadgeUnlocked || completed ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#0A192F] text-[11px] font-black">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        <span>Day Completed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#112240] border border-[#93C5FD]/30 text-[#BFDBFE] text-[11px] font-semibold">
                        <Award className="w-3.5 h-3.5" />
                        <span>Unlocked</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Day Card Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Locked Notice if day is locked */}
                    {!unlocked && (
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                        <Lock className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                        <div>
                          <strong className="font-bold">Day {dayPlan.day} is currently locked.</strong>
                          <p className="text-amber-800 text-[11px] mt-0.5">
                            Complete all sections of Day {dayPlan.day - 1} (Pre-Assessment, 30% Theory Notes, 70% IDE Lab, and Post-Assessment) to automatically unlock Day {dayPlan.day}.
                          </p>
                        </div>
                      </div>
                    )}

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
                    {!unlocked ? (
                      (() => {
                        const sStatus = getDaySectionStatus(dayPlan.day, progress);
                        const isTimeLocked = sStatus.lockReason === 'SCHEDULE_TIME_LOCKED';
                        return (
                          <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl border ${
                            isTimeLocked
                              ? 'bg-amber-50/80 border-amber-300'
                              : 'bg-slate-100 border-slate-300'
                          }`}>
                            <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                              {isTimeLocked ? (
                                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                              ) : (
                                <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                              )}
                              <span>
                                {isTimeLocked
                                  ? `Unlocks ${sStatus.formattedUnlockDate} (Day ${dayPlan.day - 1} Completed)`
                                  : `Requires Completion of Day ${dayPlan.day - 1} (>=80% Pass)`}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => onSelectDay(isTimeLocked ? dayPlan.day : dayPlan.day - 1, 'notes')}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer shrink-0"
                            >
                              <span>{isTimeLocked ? 'View Unlock Timer' : `Complete Day ${dayPlan.day - 1}`}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })()
                    ) : (
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
                    )}

                    {/* Capstone Mini-Project Launcher Button (if day has miniProject) */}
                    {dayPlan.miniProject && unlocked && (
                      <div className="pt-0.5">
                        <button
                          type="button"
                          onClick={() => onSelectDay(dayPlan.day, 'project')}
                          className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/70 hover:from-amber-100 hover:to-amber-200/80 border border-amber-300 text-amber-950 font-bold text-xs transition-all cursor-pointer shadow-xs hover:scale-[1.01]"
                        >
                          <span className="flex items-center gap-2 truncate">
                            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                            <span className="font-black text-[#0A192F]">Capstone Mini-Project:</span>
                            <span className="truncate text-slate-800 font-semibold">{dayPlan.miniProject.title}</span>
                          </span>
                          <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-[#0A192F] font-mono text-[10px] font-black shrink-0 shadow-xs">
                            Single Header C17
                          </span>
                        </button>
                      </div>
                    )}

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

      {/* High-Definition Banner Lightbox & Accreditation Modal */}
      {showBannerLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative max-w-6xl w-full bg-[#0A192F] border-2 border-[#1E3A8A] rounded-3xl overflow-hidden shadow-2xl my-auto text-white">
            {/* Modal Header */}
            <div className="px-5 py-4 bg-[#112240] border-b border-[#1E3A8A] flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-extrabold">
                    Official Institutional Panorama &amp; Accreditations
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-black text-white mt-0.5">
                  Sir Padampat Singhania University, Udaipur × Google Classroom
                </h3>
                <p className="text-xs text-[#BFDBFE]">
                  Placement Readiness Mentorship Powered by Kapil • Independent Technical Mentor
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadBanner}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0A192F] font-mono text-xs font-black transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download High-Res PNG</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowBannerLightbox(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/20"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Banner Full Image Viewer */}
            <div className="p-4 sm:p-6 bg-slate-950/60 space-y-5">
              <div className="rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
                <img
                  src={spsuPortalBannerImg}
                  alt="Sir Padampat Singhania University Udaipur - Placement Mentorship Powered by Kapil - Google Classroom Collaboration"
                  className="w-full h-auto object-contain block max-h-[65vh] mx-auto"
                />
              </div>

              {/* Accreditations & Recognitions Showcase Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase text-[#93C5FD] font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    Verified Institutional Recognitions &amp; Accreditations
                  </span>
                  <span className="text-xs font-serif italic text-amber-300">
                    “From Campus to Careers Together...”
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-left">
                  <div className="p-3 rounded-xl bg-[#112240] border border-[#1E3A8A] space-y-1">
                    <div className="text-[10px] font-mono text-amber-300 font-extrabold uppercase">
                      QS I-GAUGE
                    </div>
                    <div className="text-xs font-black text-white">Gold Rating</div>
                    <div className="text-[10px] text-slate-300 leading-tight">National Benchmark</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#112240] border border-[#1E3A8A] space-y-1">
                    <div className="text-[10px] font-mono text-[#93C5FD] font-extrabold uppercase">
                      AIMA
                    </div>
                    <div className="text-xs font-black text-white">Member</div>
                    <div className="text-[10px] text-slate-300 leading-tight">All India Mgmt Assoc.</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#112240] border border-[#1E3A8A] space-y-1">
                    <div className="text-[10px] font-mono text-[#93C5FD] font-extrabold uppercase">
                      CIPU
                    </div>
                    <div className="text-xs font-black text-white">Member</div>
                    <div className="text-[10px] text-slate-300 leading-tight">Confederation Private Univ.</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#112240] border border-[#1E3A8A] space-y-1">
                    <div className="text-[10px] font-mono text-[#93C5FD] font-extrabold uppercase">
                      AIU
                    </div>
                    <div className="text-xs font-black text-white">Member</div>
                    <div className="text-[10px] text-slate-300 leading-tight">Assoc. Indian Universities</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#112240] border border-[#1E3A8A] space-y-1">
                    <div className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase">
                      Campus Award
                    </div>
                    <div className="text-xs font-black text-white">Clean 2026</div>
                    <div className="text-[10px] text-slate-300 leading-tight">Environment Solutions</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#112240] border border-[#1E3A8A] space-y-1">
                    <div className="text-[10px] font-mono text-amber-300 font-extrabold uppercase">
                      State Ranking
                    </div>
                    <div className="text-xs font-black text-white">Ranked #3</div>
                    <div className="text-[10px] text-slate-300 leading-tight">Rajasthan Private Tech</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#112240] border border-[#1E3A8A] space-y-1">
                    <div className="text-[10px] font-mono text-purple-300 font-extrabold uppercase">
                      UGC Motto
                    </div>
                    <div className="text-xs font-black text-white">ज्ञान-विज्ञान</div>
                    <div className="text-[10px] text-slate-300 leading-tight">विमुक्तये (Excellence)</div>
                  </div>
                </div>
              </div>

              {/* 7 Operational Pillars Strip */}
              <div className="p-4 rounded-2xl bg-[#112240]/80 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-200">
                <div className="space-y-0.5">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>7 Connected Placement Operations</span>
                  </div>
                  <div className="text-[11px] text-[#BFDBFE]">
                    Learn Anytime • Access Resources • Submit Assignments • Discuss &amp; Collaborate • Track Progress • Earn Certificates • Prepare for Careers
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowBannerLightbox(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#0A192F] font-black text-xs transition-colors cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
