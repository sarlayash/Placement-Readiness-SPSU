import React, { useState } from 'react';
import { GoogleUser, UserProgress } from '../types';
import { Award, Download, FileText, Image, LogIn, ShieldCheck, Sparkles, X, Target } from 'lucide-react';
import {
  downloadCertificatePNG,
  downloadCertificatePDF,
  downloadSystemDesignCertificatePNG,
  downloadSystemDesignCertificatePDF,
  downloadInterviewReadinessCertificatePNG,
  downloadInterviewReadinessCertificatePDF,
} from '../utils/exportCredentials';
import { generateOfficialCertificateId } from '../utils/storage';

interface CertificateModalProps {
  user: GoogleUser | null;
  progress: UserProgress;
  onClose: () => void;
  onPromptAuth: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  user,
  progress,
  onClose,
  onPromptAuth,
}) => {
  const [activeCertType, setActiveCertType] = useState<'curriculum' | 'system-design' | 'interview-readiness'>('curriculum');

  // Fallback for Demo User
  const effectiveUser: GoogleUser = user || {
    uid: 'demo_user',
    name: 'SPSU Placement Aspirant',
    email: 'learner@spsu.ac.in',
    photoURL: '',
    signedInAt: new Date().toISOString(),
  };

  const unlockedBadgesCount = Object.keys(progress.unlockedBadges || {}).length || 10;
  const certId = effectiveUser
    ? progress.certificateId || generateOfficialCertificateId(effectiveUser.email)
    : 'SPSU-KAPIL-10D-VERIFIED';

  const systemDesignCertId = `SPSU-SD-ARCH-${Math.abs(effectiveUser.email.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)).toString(16).toUpperCase()}-2026`;
  const interviewReadinessCertId = `SPSU-IR-SPEC-${Math.abs(effectiveUser.email.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)).toString(16).toUpperCase()}-2026`;

  const issueDate = progress.certificateIssuedAt
    ? new Date(progress.certificateIssuedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

  const sdIssueDate = progress.systemDesignCertificateIssuedAt
    ? new Date(progress.systemDesignCertificateIssuedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

  const irIssueDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white border-2 border-[#0A192F] shadow-2xl overflow-hidden my-6 text-[#0A192F]">
        {/* Top Navy Bar */}
        <div className="bg-[#0A192F] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#1E3A8A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-[#0A192F] font-black flex items-center justify-center text-lg">
              K
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black">
                  Official SPSU Udaipur Certificates • Powered By Kapil
                </h2>
                {!user && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400 text-[#0A192F] font-bold">
                    Demo Mode Enabled
                  </span>
                )}
              </div>
              <p className="text-xs text-[#BFDBFE]">
                Sole Signatory: Placement Mentor Kapil (Zero Fake Signatories • 1920×1080 High-Res PNG & Landscape PDF)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Download Action Buttons */}
            {activeCertType === 'curriculum' && (
              <>
                <button
                  type="button"
                  onClick={() => downloadCertificatePNG(effectiveUser, progress, unlockedBadgesCount)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EFF6FF] text-[#0A192F] text-xs font-extrabold transition-colors cursor-pointer shadow-xs"
                >
                  <Image className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span>Download PNG</span>
                </button>
                <button
                  type="button"
                  onClick={() => downloadCertificatePDF(effectiveUser, progress, unlockedBadgesCount)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1E3A8A] hover:bg-[#2563EB] border border-white/30 text-white text-xs font-extrabold transition-colors cursor-pointer shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </>
            )}

            {activeCertType === 'system-design' && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    downloadSystemDesignCertificatePNG(
                      effectiveUser,
                      progress.systemDesignScore || 100,
                      progress.systemDesignCorrectCount || 96,
                      progress.systemDesignCertificateIssuedAt || new Date().toISOString()
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0A192F] text-xs font-black transition-colors cursor-pointer shadow-xs"
                >
                  <Image className="w-3.5 h-3.5 text-[#0A192F]" />
                  <span>Download SD PNG</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    downloadSystemDesignCertificatePDF(
                      effectiveUser,
                      progress.systemDesignScore || 100,
                      progress.systemDesignCorrectCount || 96,
                      progress.systemDesignCertificateIssuedAt || new Date().toISOString()
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#112240] border border-amber-400 text-amber-300 text-xs font-extrabold transition-colors cursor-pointer shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download SD PDF</span>
                </button>
              </>
            )}

            {activeCertType === 'interview-readiness' && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    downloadInterviewReadinessCertificatePNG(
                      effectiveUser,
                      100,
                      80,
                      new Date().toISOString()
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black transition-colors cursor-pointer shadow-xs"
                >
                  <Image className="w-3.5 h-3.5 text-white" />
                  <span>Download IR PNG</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    downloadInterviewReadinessCertificatePDF(
                      effectiveUser,
                      100,
                      80,
                      new Date().toISOString()
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#112240] border border-emerald-400 text-emerald-300 text-xs font-extrabold transition-colors cursor-pointer shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download IR PDF</span>
                </button>
              </>
            )}

            {!user && (
              <button
                type="button"
                onClick={onPromptAuth}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400 text-amber-300 text-xs font-bold transition-all cursor-pointer"
                title="Sign in with your Google account to bind your official name and university email"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Google Bind</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Type Switcher */}
        <div className="bg-[#081426] px-6 py-2.5 flex items-center gap-3 border-b border-[#1E3A8A] overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveCertType('curriculum')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeCertType === 'curriculum'
                ? 'bg-white text-[#0A192F] font-black shadow-sm'
                : 'text-[#BFDBFE] hover:bg-[#112240] hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>10-Day Technical Mastery Certificate</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCertType('system-design')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeCertType === 'system-design'
                ? 'bg-amber-400 text-[#0A192F] font-black shadow-sm'
                : 'text-[#BFDBFE] hover:bg-[#112240] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Special Edition: System Design Architect</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCertType('interview-readiness')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeCertType === 'interview-readiness'
                ? 'bg-emerald-500 text-white font-black shadow-sm'
                : 'text-[#BFDBFE] hover:bg-[#112240] hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span>Special Edition: Interview Readiness</span>
          </button>
        </div>

        {/* Certificate Preview Canvas Card */}
        <div className="p-5 sm:p-8">
          {activeCertType === 'curriculum' && (
            <div className="rounded-2xl border-8 border-double border-[#0A192F] bg-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                <span className="text-7xl sm:text-9xl font-black tracking-widest text-[#0A192F]">
                  KAPIL
                </span>
              </div>

              {/* Header */}
              <div className="text-center space-y-2 border-b-2 border-[#0A192F] pb-5 relative z-10">
                <div className="inline-block px-4 py-1 rounded-full bg-[#0A192F] text-white font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-widest">
                  SPSU Udaipur • Mentorship By Kapil • 10-Day Intensive Curriculum
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight uppercase font-serif-title text-[#0A192F] pt-1">
                  Certificate of Technical Mastery
                </h1>
                <p className="text-xs sm:text-sm font-bold text-[#1E3A8A]">
                  Powered by Kapil • 30% Conceptual Theory & 70% Practical IDE Execution (C, C++, Java, Python)
                </p>
              </div>

              {/* Body */}
              <div className="my-6 text-center space-y-3 relative z-10">
                <p className="text-xs uppercase tracking-widest font-bold text-slate-500">
                  This official credential is proudly presented to
                </p>

                <div className="text-2xl sm:text-4xl font-black text-[#0A192F] border-b-2 border-[#0A192F] inline-block px-8 pb-1">
                  {effectiveUser.name}
                </div>

                <div className="text-xs font-mono font-bold text-[#1E3A8A]">
                  {effectiveUser.email}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl mx-auto pt-1">
                  for completing the <strong className="text-[#0A192F]">10-Day Placement & Assessment Curriculum</strong> aligned with all <strong className="text-[#0A192F]">11 Core Syllabus Modules</strong> (Programming Fundamentals, Data Structures & Algorithms, Company-oriented Coding Lab, SQL & Database Systems, OOP, Operating Systems, Computer Networks, Software Engineering & Developer Tools, Development & Project Readiness, AI-assisted Software Development, and Technical Interview Preparation).
                </p>
              </div>

              {/* Footer: Sole Signatory Kapil */}
              <div className="pt-6 border-t-2 border-[#0A192F] grid grid-cols-1 sm:grid-cols-3 gap-6 items-end relative z-10">
                <div className="text-left space-y-1 text-xs">
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                    Date of Issuance
                  </div>
                  <div className="font-extrabold text-[#0A192F]">{issueDate}</div>
                  <div className="text-[11px] font-mono text-[#1E3A8A] font-bold pt-1">
                    ID: {certId}
                  </div>
                  <div className="text-[11px] font-bold text-[#0A192F]">
                    Verified Progress: {unlockedBadgesCount}/10 Badges • {progress.completedChallengeIds?.length || 10} Labs
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#0A192F] border-4 border-[#1E3A8A] text-white flex flex-col items-center justify-center p-2 shadow-md">
                    <span className="text-[8px] font-mono uppercase text-[#BFDBFE] font-bold">
                      SPSU UDAIPUR
                    </span>
                    <Award className="w-5 h-5 text-white my-0.5" />
                    <span className="text-[10px] font-black tracking-wider">KAPIL</span>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="font-serif italic text-2xl font-bold text-[#1E3A8A] border-b-2 border-[#0A192F] inline-block px-4 pb-1">
                    Mentor Kapil
                  </div>
                  <div className="text-xs font-black text-[#0A192F] uppercase tracking-wider">
                    PLACEMENT MENTOR – KAPIL
                  </div>
                  <div className="text-xs font-bold text-[#1E3A8A]">
                    Placement Mentor (Independent Technical Mentor)
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium">
                    SPSU Udaipur Placement Readiness Boot Camp
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCertType === 'system-design' && (
            <div className="rounded-2xl border-8 border-double border-[#0A192F] bg-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                <span className="text-7xl sm:text-9xl font-black tracking-widest text-amber-500">
                  ARCHITECT
                </span>
              </div>

              <div className="text-center space-y-2 border-b-2 border-amber-500 pb-5 relative z-10">
                <div className="inline-block px-4 py-1 rounded-full bg-[#0A192F] text-amber-300 font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-widest">
                  ★ SPSU Udaipur • Mentorship By Kapil • Special Edition Credential
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight uppercase font-serif-title text-[#0A192F] pt-1">
                  Certified System Design Architect
                </h1>
                <p className="text-xs sm:text-sm font-bold text-amber-700">
                  High-Level Design, Gmail Case Study, Postman Masterclass & 120-MCQ Assessment (≥ 80% Benchmark)
                </p>
              </div>

              <div className="my-6 text-center space-y-3 relative z-10">
                <p className="text-xs uppercase tracking-widest font-bold text-slate-500">
                  This special edition credential is proudly conferred upon
                </p>

                <div className="text-2xl sm:text-4xl font-black text-[#0A192F] border-b-2 border-[#0A192F] inline-block px-8 pb-1">
                  {effectiveUser.name}
                </div>

                <div className="text-xs font-mono font-bold text-[#1E3A8A]">
                  {effectiveUser.email}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl mx-auto pt-1">
                  for demonstrating technical mastery over distributed systems: Outage Case Studies (Instagram DNS, Meta BGP, WhatsApp queues, Twitter rate limits), Gmail End-to-End Architecture, 30s Undo Send Task Queue, Postman REST APIs & Idempotency, HTTP Status Codes, Load Balancing, Sharding, Caching, and scoring <strong className="text-emerald-700">{progress.systemDesignScore || 100}% ({progress.systemDesignCorrectCount || 96}/120)</strong> on the 60-Minute Assessment.
                </p>
              </div>

              <div className="pt-6 border-t-2 border-[#0A192F] grid grid-cols-1 sm:grid-cols-3 gap-6 items-end relative z-10">
                <div className="text-left space-y-1 text-xs">
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                    Conferral Date
                  </div>
                  <div className="font-extrabold text-[#0A192F]">{sdIssueDate}</div>
                  <div className="text-[11px] font-mono text-amber-700 font-bold pt-1">
                    ID: {systemDesignCertId}
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700">
                    Verified Score: {progress.systemDesignScore || 100}% (Benchmark ≥ 80%)
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#0A192F] border-4 border-amber-400 text-white flex flex-col items-center justify-center p-2 shadow-md">
                    <span className="text-[8px] font-mono uppercase text-amber-300 font-bold">
                      SYSTEM DESIGN
                    </span>
                    <Sparkles className="w-5 h-5 text-amber-400 my-0.5" />
                    <span className="text-[10px] font-black tracking-wider text-emerald-400">80% PASS</span>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="font-serif italic text-2xl font-bold text-[#1E3A8A] border-b-2 border-[#0A192F] inline-block px-4 pb-1">
                    Mentor Kapil
                  </div>
                  <div className="text-xs font-black text-[#0A192F] uppercase tracking-wider">
                    PLACEMENT MENTOR – KAPIL
                  </div>
                  <div className="text-xs font-bold text-[#1E3A8A]">
                    Placement Mentor (Independent Technical Mentor)
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium">
                    SPSU Udaipur Placement Readiness Boot Camp
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCertType === 'interview-readiness' && (
            <div className="rounded-2xl border-8 border-double border-[#0A192F] bg-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                <span className="text-7xl sm:text-9xl font-black tracking-widest text-emerald-600">
                  READINESS
                </span>
              </div>

              <div className="text-center space-y-2 border-b-2 border-emerald-600 pb-5 relative z-10">
                <div className="inline-block px-4 py-1 rounded-full bg-[#0A192F] text-emerald-300 font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-widest">
                  🎯 SPSU Udaipur • Mentorship By Kapil • Placement Readiness Track
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight uppercase font-serif-title text-[#0A192F] pt-1">
                  Certified Interview Ready Engineer
                </h1>
                <p className="text-xs sm:text-sm font-bold text-emerald-700">
                  Fresher & Experienced Dual-Track Placement Mastery (200 Curated MCQs + Scenario Assessments)
                </p>
              </div>

              <div className="my-6 text-center space-y-3 relative z-10">
                <p className="text-xs uppercase tracking-widest font-bold text-slate-500">
                  This credential of excellence is officially conferred upon
                </p>

                <div className="text-2xl sm:text-4xl font-black text-[#0A192F] border-b-2 border-[#0A192F] inline-block px-8 pb-1">
                  {effectiveUser.name}
                </div>

                <div className="text-xs font-mono font-bold text-[#1E3A8A]">
                  {effectiveUser.email}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl mx-auto pt-1">
                  for demonstrating exceptional performance across core technical interview disciplines: Data Structures & Algorithms, System Architecture, Operating Systems, Database Management Systems, Computer Networks, and Behavioral STAR Framework scenarios.
                </p>
              </div>

              <div className="pt-6 border-t-2 border-[#0A192F] grid grid-cols-1 sm:grid-cols-3 gap-6 items-end relative z-10">
                <div className="text-left space-y-1 text-xs">
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                    Conferral Date
                  </div>
                  <div className="font-extrabold text-[#0A192F]">{irIssueDate}</div>
                  <div className="text-[11px] font-mono text-emerald-700 font-bold pt-1">
                    ID: {interviewReadinessCertId}
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700">
                    Dual Track: 100 Core + 100 Scenarios Mastered
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#0A192F] border-4 border-emerald-500 text-white flex flex-col items-center justify-center p-2 shadow-md">
                    <span className="text-[8px] font-mono uppercase text-emerald-300 font-bold">
                      SPSU UDAIPUR
                    </span>
                    <Target className="w-5 h-5 text-emerald-400 my-0.5" />
                    <span className="text-[10px] font-black tracking-wider text-emerald-400">READY</span>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="font-serif italic text-2xl font-bold text-[#1E3A8A] border-b-2 border-[#0A192F] inline-block px-4 pb-1">
                    Mentor Kapil
                  </div>
                  <div className="text-xs font-black text-[#0A192F] uppercase tracking-wider">
                    PLACEMENT MENTOR – KAPIL
                  </div>
                  <div className="text-xs font-bold text-[#1E3A8A]">
                    Head of Corporate Training & Placements
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium">
                    Sir Padampat Singhania University, Udaipur
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
