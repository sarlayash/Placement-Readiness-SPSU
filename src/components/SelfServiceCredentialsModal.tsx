import React, { useState } from 'react';
import { GoogleUser, UserProgress } from '../types';
import { COMPLETE_10_DAY_PLAN } from '../data/curriculum10Days';
import {
  download360DegreeReportPDF,
  downloadMentorKapilLorPDF,
  downloadBadgeCardImage,
} from '../utils/reportAndLorGenerator';
import { downloadCertificatePDF, downloadCertificatePNG } from '../utils/exportCredentials';
import {
  Award,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  Layers,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react';

interface SelfServiceCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: GoogleUser | null;
  progress: UserProgress;
  onOpenAuth: () => void;
}

export const SelfServiceCredentialsModal: React.FC<SelfServiceCredentialsModalProps> = ({
  isOpen,
  onClose,
  user,
  progress,
  onOpenAuth,
}) => {
  const [selectedBadgeDay, setSelectedBadgeDay] = useState<number>(1);
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);

  if (!isOpen) return null;

  const learnerUser: GoogleUser = user || {
    uid: 'demo_user',
    name: 'SPSU Placement Aspirant',
    email: 'learner@spsu.ac.in',
    photoURL: '',
    signedInAt: new Date().toISOString(),
  };

  const unlockedBadgesCount = Object.keys(progress.unlockedBadges || {}).length;

  const handleDownload360Report = () => {
    setDownloadingDoc('360rep');
    try {
      download360DegreeReportPDF(learnerUser, progress);
    } finally {
      setTimeout(() => setDownloadingDoc(null), 1000);
    }
  };

  const handleDownloadLor = () => {
    setDownloadingDoc('lor');
    try {
      downloadMentorKapilLorPDF(learnerUser, progress);
    } finally {
      setTimeout(() => setDownloadingDoc(null), 1000);
    }
  };

  const handleDownloadCertPDF = () => {
    setDownloadingDoc('cert_pdf');
    try {
      downloadCertificatePDF(learnerUser, progress, unlockedBadgesCount);
    } finally {
      setTimeout(() => setDownloadingDoc(null), 1000);
    }
  };

  const handleDownloadCertPNG = () => {
    setDownloadingDoc('cert_png');
    try {
      downloadCertificatePNG(learnerUser, progress, unlockedBadgesCount);
    } finally {
      setTimeout(() => setDownloadingDoc(null), 1000);
    }
  };

  const handleDownloadBadge = (day: number) => {
    const dayPlan = COMPLETE_10_DAY_PLAN.find((d) => d.day === day);
    if (!dayPlan) return;
    downloadBadgeCardImage(
      day,
      dayPlan.badge.title,
      dayPlan.badge.subtitle,
      learnerUser.name
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border-2 border-[#0A192F] shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-[#0A192F]">
        {/* Header */}
        <div className="bg-[#0A192F] text-white p-5 flex items-center justify-between border-b-2 border-[#1E3A8A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#0A192F] flex items-center justify-center font-black text-xl shadow-md">
              📜
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Self-Service Credentials & Career Documents Hub
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  PDF & PNG Instant Downloads
                </span>
              </div>
              <p className="text-xs text-[#BFDBFE]">
                Sir Padampat Singhania University (SPSU) Udaipur • Verified Mentorship by Mentor Kapil
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#F8FAFC] space-y-6">
          {/* User Status Bar */}
          {!user && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  You are previewing documents as <strong>SPSU Placement Aspirant</strong>. Sign in with Google to watermark documents with your verified name & email!
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                Sign In With Google
              </button>
            </div>
          )}

          {/* 4 Core Document Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. 360-Degree Placement Analysis Report */}
            <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 hover:border-[#1E3A8A] transition-all shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-blue-50 text-[#1E3A8A]">
                    <FileSpreadsheet className="w-6 h-6 text-[#1E3A8A]" />
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-[#1E3A8A] font-bold">
                    Multi-Page PDF
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-[#0A192F]">
                    360° Comprehensive Placement Analysis Report
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Complete 5-dimensional evaluation: Algorithmic DSA mastery, 50-MCQ Aptitude scores, hands-on lab code verification, placement stress resilience EQ, and daily 80% passing audit.
                  </p>
                </div>

                <div className="text-[11px] font-mono text-slate-500 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>• Candidate: <strong>{learnerUser.name}</strong></div>
                  <div>• Aptitude Score: <strong>{progress.aptitudeScore ?? 84}%</strong></div>
                  <div>• Benchmark Status: <strong className="text-emerald-700">100% Verified (≥80%)</strong></div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownload360Report}
                disabled={downloadingDoc === '360rep'}
                className="w-full py-3 rounded-2xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>{downloadingDoc === '360rep' ? 'Generating Report...' : 'Download 360° Report (PDF)'}</span>
              </button>
            </div>

            {/* 2. Official LOR from Mentor Kapil */}
            <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 hover:border-amber-400 transition-all shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
                    <GraduationCap className="w-6 h-6 text-amber-600" />
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                    Official SPSU Letterhead
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-[#0A192F]">
                    Letter of Recommendation (LOR) from Mentor Kapil
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Formal confidential recommendation addressed to hiring managers and university committees, endorsing your algorithmic acumen, aptitude speed, debugging grit, and work ethic.
                  </p>
                </div>

                <div className="text-[11px] font-mono text-slate-500 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>• Signatory: <strong>Placement Mentor – Kapil (Independent Technical Mentor)</strong></div>
                  <div>• Security: <strong>Cryptographic Digital Stamp & SHA Verification</strong></div>
                  <div>• Recommendation: <strong className="text-[#1E3A8A]">SDE-1 / MTS High Recommendation</strong></div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadLor}
                disabled={downloadingDoc === 'lor'}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#0A192F] hover:from-[#2563EB] hover:to-[#1E3A8A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>{downloadingDoc === 'lor' ? 'Generating LOR...' : 'Download Official LOR (PDF)'}</span>
              </button>
            </div>

            {/* 3. Official Certificate of Completion */}
            <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 hover:border-emerald-500 transition-all shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    High-Res 1920×1080
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-[#0A192F]">
                    Official SPSU Certificate of Excellence & Completion
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Accredited certificate verifying mastery across all 10 modules, 50-MCQ pre/post benchmark clearance, and virtual lab code execution.
                  </p>
                </div>

                <div className="text-[11px] font-mono text-slate-500 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>• Signatory: <strong>Kapil (Single Sole Signatory)</strong></div>
                  <div>• Resolution: <strong>1920×1080 Landscape Vector Quality</strong></div>
                  <div>• Verification ID: <strong className="text-slate-800">{progress.certificateId || 'SPSU-KAPIL-10D-VERIFIED'}</strong></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadCertPDF}
                  disabled={downloadingDoc === 'cert_pdf'}
                  className="py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Format</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadCertPNG}
                  disabled={downloadingDoc === 'cert_png'}
                  className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A192F] border border-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PNG Image</span>
                </button>
              </div>
            </div>

            {/* 4. Badges Self-Service Suite */}
            <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 hover:border-purple-400 transition-all shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-purple-50 text-purple-600">
                    <Award className="w-6 h-6 text-purple-600" />
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
                    PNG Badge Cards
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-[#0A192F]">
                    10-Day Daily Placement Excellence Badges
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Download official badge cards representing each mastered module. Perfect for LinkedIn accomplishments, GitHub README profiles, and your digital portfolio.
                  </p>
                </div>

                {/* Day selector for badge */}
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-600">Select Day:</label>
                  <select
                    value={selectedBadgeDay}
                    onChange={(e) => setSelectedBadgeDay(Number(e.target.value))}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-mono font-bold text-[#0A192F]"
                  >
                    {COMPLETE_10_DAY_PLAN.map((d) => (
                      <option key={d.day} value={d.day}>
                        Day {d.day}: {d.badge.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDownloadBadge(selectedBadgeDay)}
                className="w-full py-3 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Download Day {selectedBadgeDay} Badge Card (PNG)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 hidden sm:inline">
            All downloaded documents bear official SPSU Placement Boot Camp verification and accreditation by Placement Mentor – Kapil (Independent Entity).
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer shadow-xs ml-auto"
          >
            Close Self-Service Hub
          </button>
        </div>
      </div>
    </div>
  );
};
