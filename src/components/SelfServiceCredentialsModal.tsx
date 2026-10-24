import React, { useState } from 'react';
import { GoogleUser, UserProgress } from '../types';
import { COMPLETE_10_DAY_PLAN } from '../data/curriculum10Days';
import {
  download360DegreeReportPDF,
  downloadMentorKapilLorPDF,
  downloadBadgeCardImage,
  getPersonalizedLearnerProfile,
  generateVerificationHash,
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
  Target,
  TrendingUp,
  User,
  X,
  Zap,
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
  const [activeTab, setActiveTab] = useState<'hub' | 'swot' | 'lor'>('hub');
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
  const profile = getPersonalizedLearnerProfile(learnerUser, progress);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border-2 border-[#0A192F] shadow-2xl w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden text-[#0A192F]">
        {/* Header */}
        <div className="bg-[#0A192F] text-white p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#1E3A8A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#0A192F] flex items-center justify-center font-black text-xl shadow-md shrink-0">
              📜
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Self-Service Credentials & Career Documents Hub
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  Personalized SWOT & LOR
                </span>
              </div>
              <p className="text-xs text-[#BFDBFE]">
                Sir Padampat Singhania University (SPSU) Udaipur • Evaluated by Placement Mentor – Kapil (Independent Entity)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 pt-2 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('hub')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'hub'
                ? 'bg-white text-[#0A192F] border-t-2 border-x border-[#1E3A8A] shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F]'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-[#1E3A8A]" />
            <span>Document Downloads (PDF & PNG)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('swot')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'swot'
                ? 'bg-white text-[#0A192F] border-t-2 border-x border-[#1E3A8A] shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F]'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span>Personalized SWOT Analysis</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
              Individual
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lor')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'lor'
                ? 'bg-white text-[#0A192F] border-t-2 border-x border-[#1E3A8A] shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
            <span>Official LOR Preview</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono">
              Custom Value-Add
            </span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8FAFC]">
          {/* User Sign-in Warning Banner if Demo */}
          {!user && (
            <div className="mb-5 p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Previewing credentials for <strong>SPSU Placement Aspirant</strong>. Sign in with Google to watermark documents with your verified student name and email!
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenAuth}
                className="px-3 py-1.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold transition-all cursor-pointer whitespace-nowrap self-start sm:self-center text-xs"
              >
                Sign In With Google
              </button>
            </div>
          )}

          {/* TAB 1: ALL CREDENTIALS & DOWNLOADS */}
          {activeTab === 'hub' && (
            <div className="space-y-6">
              {/* Candidate Quick Stats Strip */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                    Assigned Engineering Archetype
                  </span>
                  <div className="text-sm font-black text-[#1E3A8A] mt-0.5">
                    {profile.archetype}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {profile.tagline}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                      Overall Evaluation
                    </span>
                    <span className="text-sm font-black text-emerald-700 font-mono">
                      {profile.overallGrade}
                    </span>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    {profile.percentileRank}
                  </span>
                </div>
              </div>

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
                        3-Page Comprehensive PDF
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-[#0A192F]">
                        360° Comprehensive Placement Analysis Report
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Full individual assessment audit: 100 Industry DSA Scenarios, 50-MCQ Aptitude, Virtual Lab code traces, and complete 4-quadrant SWOT Analysis.
                      </p>
                    </div>

                    <div className="text-[11px] font-mono text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div>• Candidate: <strong>{learnerUser.name}</strong></div>
                      <div>• DSA Patterns Score: <strong className="text-cyan-700">{profile.scores.patternQuizScore}%</strong></div>
                      <div>• Aptitude Score: <strong className="text-emerald-700">{profile.scores.aptitudeScore}% ({profile.scores.aptitudeCorrectCount}/50)</strong></div>
                      <div>• Virtual Lab Solved: <strong className="text-[#1E3A8A]">{profile.scores.virtualLabChallenges} Problems</strong></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleDownload360Report}
                      disabled={downloadingDoc === '360rep'}
                      className="w-full py-3 rounded-2xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4 text-amber-400" />
                      <span>{downloadingDoc === '360rep' ? 'Generating 3-Page Report...' : 'Download 360° Report (PDF)'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('swot')}
                      className="w-full py-1.5 text-[11px] text-[#1E3A8A] hover:underline font-bold text-center cursor-pointer"
                    >
                      Preview Personalized SWOT On-Screen →
                    </button>
                  </div>
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
                        Authentic, personalized recommendation detailing your specific technical strengths, stress resilience EQ, and SDE-1 placement suitability.
                      </p>
                    </div>

                    <div className="text-[11px] font-mono text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div>• Signatory: <strong>Placement Mentor – Kapil (Independent Technical Mentor)</strong></div>
                      <div>• Template: <strong className="text-emerald-700">100% Unique to {learnerUser.name.split(' ')[0]}</strong></div>
                      <div>• Security: <strong>Cryptographic Digital Stamp & Verification ID</strong></div>
                      <div>• Target Level: <strong className="text-[#1E3A8A]">SDE-1 / MTS High Recommendation</strong></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleDownloadLor}
                      disabled={downloadingDoc === 'lor'}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#0A192F] hover:from-[#2563EB] hover:to-[#1E3A8A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4 text-emerald-400" />
                      <span>{downloadingDoc === 'lor' ? 'Generating Official LOR...' : 'Download Official LOR (PDF)'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('lor')}
                      className="w-full py-1.5 text-[11px] text-amber-800 hover:underline font-bold text-center cursor-pointer"
                    >
                      Read Full LOR Narrative On-Screen →
                    </button>
                  </div>
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
                        Official SPSU Certificate of Technical Mastery
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Accredited certificate verifying mastery across all 10 modules, 80%+ pre/post assessments, and virtual lab execution.
                      </p>
                    </div>

                    <div className="text-[11px] font-mono text-slate-500 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div>• Signatory: <strong>Kapil (Independent Technical Mentor)</strong></div>
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
                        Download official badge cards representing each mastered module. Perfect for LinkedIn accomplishments and your digital resume.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-600">Select Day:</label>
                      <select
                        value={selectedBadgeDay}
                        onChange={(e) => setSelectedBadgeDay(Number(e.target.value))}
                        className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-mono font-bold text-[#0A192F] max-w-[200px] truncate"
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
          )}

          {/* TAB 2: PERSONALIZED SWOT ANALYSIS ON-SCREEN */}
          {activeTab === 'swot' && (
            <div className="space-y-6">
              {/* SWOT Header Card */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                      360° Candidate SWOT Profile
                    </span>
                    <h3 className="text-lg font-black text-[#0A192F] mt-0.5">
                      {learnerUser.name} • {profile.archetype}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Grounded in real-time scores across 100 DSA Scenarios, 50 Aptitude MCQs, Virtual Lab test executions, and Placement Stress Resilience.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload360Report}
                    disabled={downloadingDoc === '360rep'}
                    className="px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2 self-start sm:self-center shrink-0"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Download 360° PDF</span>
                  </button>
                </div>

                {/* Score Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs font-mono">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">DSA Patterns</span>
                    <strong className="text-cyan-700 text-sm">{profile.scores.patternQuizScore}%</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Aptitude (50 Q)</span>
                    <strong className="text-emerald-700 text-sm">{profile.scores.aptitudeScore}%</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Stress Resilience</span>
                    <strong className="text-purple-700 text-sm">{profile.scores.stressQuizScore}/25</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Overall Benchmark</span>
                    <strong className="text-[#1E3A8A] text-sm">{profile.overallGrade}</strong>
                  </div>
                </div>
              </div>

              {/* 4 Quadrants Visual Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Quadrant 1: Strengths */}
                <div className="p-5 rounded-3xl bg-emerald-50/50 border-2 border-emerald-300 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-black text-sm">
                    <div className="w-6 h-6 rounded-lg bg-emerald-200 text-emerald-900 flex items-center justify-center text-xs">
                      S
                    </div>
                    <span>STRENGTHS (Internal Advantages)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                    {profile.swot.strengths.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quadrant 2: Weaknesses */}
                <div className="p-5 rounded-3xl bg-amber-50/50 border-2 border-amber-300 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-amber-800 font-black text-sm">
                    <div className="w-6 h-6 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center text-xs">
                      W
                    </div>
                    <span>GROWTH AREAS (Technical Deltas)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                    {profile.swot.weaknesses.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quadrant 3: Opportunities */}
                <div className="p-5 rounded-3xl bg-blue-50/50 border-2 border-[#1E3A8A]/30 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-[#1E3A8A] font-black text-sm">
                    <div className="w-6 h-6 rounded-lg bg-blue-200 text-[#0A192F] flex items-center justify-center text-xs">
                      O
                    </div>
                    <span>OPPORTUNITIES (Corporate Match)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                    {profile.swot.opportunities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quadrant 4: Threats */}
                <div className="p-5 rounded-3xl bg-rose-50/50 border-2 border-rose-300 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 font-black text-sm">
                    <div className="w-6 h-6 rounded-lg bg-rose-200 text-rose-900 flex items-center justify-center text-xs">
                      T
                    </div>
                    <span>THREATS & MITIGATION STRATEGY</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                    {profile.swot.threats.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Target Company Compatibility Bars */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-sm font-black text-[#0A192F]">
                  Corporate Tier & Role Compatibility Matrix
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Tier-1 Product Tech (Amazon, Microsoft, Google, Adobe, Flipkart)</span>
                      <span className="font-mono text-[#1E3A8A]">{profile.compatibility.productTier1}% Match</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-[#1E3A8A] h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${profile.compatibility.productTier1}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>High-Scale Core Systems & Fintech (Goldman Sachs, Morgan Stanley, Cisco)</span>
                      <span className="font-mono text-emerald-700">{profile.compatibility.fintechCore}% Match</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${profile.compatibility.fintechCore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Elite Digital Specialist Enterprise (TCS Digital, Infosys DSE, Cognizant GenC)</span>
                      <span className="font-mono text-purple-700">{profile.compatibility.digitalSpecialist}% Match</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${profile.compatibility.digitalSpecialist}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OFFICIAL LOR PREVIEW ON-SCREEN */}
          {activeTab === 'lor' && (
            <div className="space-y-6">
              {/* LOR Letterhead Container */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-md space-y-6 max-w-4xl mx-auto font-serif">
                {/* Official Letterhead Header */}
                <div className="text-center border-b-2 border-[#0A192F] pb-4 space-y-1 font-sans">
                  <div className="text-xs font-bold tracking-widest text-[#1E3A8A] uppercase">
                    Sir Padampat Singhania University (SPSU), Udaipur
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0A192F] tracking-tight">
                    10-DAY INTENSIVE PLACEMENT READINESS BOOT CAMP
                  </h3>
                  <div className="text-xs text-slate-600">
                    Conducted by Placement Mentor – Kapil (Independent Technical Mentor)
                  </div>
                  <div className="text-xs font-bold text-amber-700 pt-1">
                    CONFIDENTIAL LETTER OF RECOMMENDATION (LOR)
                  </div>
                </div>

                {/* Reference and Date */}
                <div className="flex flex-col sm:flex-row justify-between text-xs font-mono text-slate-500 pt-2 font-sans gap-1">
                  <span>REF NO: MENTOR-KAPIL/LOR/SPSU-2026/{generateVerificationHash(learnerUser.email, 'LOR').substring(7)}</span>
                  <span>DATE: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>

                {/* Salutation & Subject */}
                <div className="space-y-2 font-sans">
                  <div className="text-xs font-bold text-slate-800">
                    {profile.lorNarrative.salutation}
                  </div>
                  <div className="text-sm font-black text-[#1E3A8A]">
                    {profile.lorNarrative.subject}
                  </div>
                </div>

                {/* Personalized Body Paragraphs */}
                <div className="space-y-4 text-sm text-slate-800 leading-relaxed">
                  <p>{profile.lorNarrative.p1Intro}</p>
                  <p>{profile.lorNarrative.p2Technical}</p>
                  <p>{profile.lorNarrative.p3EmotionalEQ}</p>
                  <p>{profile.lorNarrative.p4ValueAdd}</p>
                  <p>{profile.lorNarrative.p5Endorsement}</p>
                </div>

                {/* Signatory and Stamp Box */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 font-sans">
                  <div>
                    <div className="text-xs text-slate-600">Sincerely and with warm regards,</div>
                    <div className="text-2xl font-serif italic text-[#1E3A8A] my-2">Mentor Kapil</div>
                    <div className="text-xs font-black text-[#0A192F]">PLACEMENT MENTOR – KAPIL</div>
                    <div className="text-[11px] text-slate-600">Placement Mentor (Independent Technical Mentor)</div>
                    <div className="text-[11px] text-slate-500">Lead Evaluator • 10-Day Placement Readiness Boot Camp</div>
                    <div className="text-[11px] text-slate-500">Conducted for Sir Padampat Singhania University (SPSU), Udaipur</div>
                  </div>

                  {/* Stamp */}
                  <div className="p-3 rounded-2xl border-2 border-[#1E3A8A] bg-blue-50/50 text-center font-mono text-[10px] space-y-0.5 min-w-[200px]">
                    <div className="font-bold text-[#1E3A8A] text-xs">PLACEMENT MENTORSHIP</div>
                    <div className="text-slate-500">INDEPENDENT EVALUATION EMBLEM</div>
                    <div className="text-slate-800 font-bold">ID: {generateVerificationHash(learnerUser.email, 'LOR')}</div>
                    <div className="text-slate-700">VERIFIED: 80%+ PASS</div>
                    <div className="text-emerald-700 font-bold pt-1">★ MENTOR KAPIL ACCREDITED ★</div>
                  </div>
                </div>

                {/* Download Button inside LOR view */}
                <div className="pt-4 flex justify-end font-sans">
                  <button
                    type="button"
                    onClick={handleDownloadLor}
                    disabled={downloadingDoc === 'lor'}
                    className="px-6 py-3 rounded-2xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>{downloadingDoc === 'lor' ? 'Downloading Official LOR...' : 'Download Official LOR (PDF)'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
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
