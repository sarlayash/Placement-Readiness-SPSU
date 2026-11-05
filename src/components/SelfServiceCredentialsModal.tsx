import React, { useState, useEffect, useRef } from 'react';
import { GoogleUser, UserProgress } from '../types';
import { COMPLETE_10_DAY_PLAN } from '../data/curriculum10Days';
import spsuPortalBannerImg from '../assets/spsu-kapil-portal-banner.png';
import {
  download360DegreeReportPDF,
  downloadMentorKapilLorPDF,
  downloadBadgeCardImage,
  getPersonalizedLearnerProfile,
  generateVerificationHash,
} from '../utils/reportAndLorGenerator';
import {
  downloadCertificatePDF,
  downloadCertificatePNG,
  downloadSystemDesignCertificatePDF,
  downloadSystemDesignCertificatePNG,
  downloadSystemDesignBadgePDF,
  downloadSystemDesignBadgePNG,
  downloadInterviewReadinessCertificatePDF,
  downloadInterviewReadinessCertificatePNG,
  downloadInterviewReadinessBadgePDF,
  downloadInterviewReadinessBadgePNG,
  downloadBadgePNG,
  downloadBadgePDF,
  renderCertificateCanvas,
  renderSystemDesignCertificateCanvas,
  renderInterviewReadinessCertificateCanvas,
  renderBadgeCanvas,
  renderSystemDesignBadgeCanvas,
  renderInterviewReadinessBadgeCanvas,
} from '../utils/exportCredentials';
import {
  Award,
  BarChart3,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  Image,
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
  const [activeTab, setActiveTab] = useState<'hub' | 'report' | 'swot' | 'lor' | 'cert' | 'badges'>('hub');
  const [selectedBadgeDay, setSelectedBadgeDay] = useState<number>(1);
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);

  // Demo user candidate name customization
  const [demoCandidateName, setDemoCandidateName] = useState<string>('SPSU Placement Aspirant');

  // Interactive Certificate preview selector
  const [previewCertType, setPreviewCertType] = useState<'curriculum' | 'system-design' | 'interview-readiness'>('curriculum');
  const certCanvasContainerRef = useRef<HTMLDivElement>(null);

  // Interactive Badges preview selector
  const [previewBadgeType, setPreviewBadgeType] = useState<'daily' | 'system-design' | 'interview-readiness'>('daily');
  const [previewBadgeDay, setPreviewBadgeDay] = useState<number>(1);
  const badgeCanvasContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const candidateName = user
    ? (user.displayName || user.name || 'SPSU Placement Aspirant')
    : (demoCandidateName.trim() || 'SPSU Placement Aspirant');

  const learnerUser: GoogleUser = user || {
    uid: 'demo_user',
    name: candidateName,
    displayName: candidateName,
    email: 'learner@spsu.ac.in',
    photoURL: '',
    signedInAt: new Date().toISOString(),
  };

  const unlockedBadgesCount = Object.keys(progress.unlockedBadges || {}).length;
  const profile = getPersonalizedLearnerProfile(learnerUser, progress);

  // Live Certificate Canvas renderer for 'cert' tab
  useEffect(() => {
    if (activeTab !== 'cert' || !certCanvasContainerRef.current) return;
    certCanvasContainerRef.current.innerHTML = '';

    let canvas: HTMLCanvasElement;
    if (previewCertType === 'system-design') {
      canvas = renderSystemDesignCertificateCanvas(
        learnerUser,
        progress.systemDesignScore || 100,
        progress.systemDesignCorrectCount || 96,
        progress.systemDesignCertificateIssuedAt || new Date().toISOString()
      );
    } else if (previewCertType === 'interview-readiness') {
      canvas = renderInterviewReadinessCertificateCanvas(
        learnerUser,
        progress.interviewReadinessScore || 100,
        progress.interviewReadinessCorrectCount || 80,
        (progress.interviewReadinessCertificateIssuedAt || progress.interviewCertificateIssuedAt) || new Date().toISOString()
      );
    } else {
      canvas = renderCertificateCanvas(
        learnerUser,
        progress,
        unlockedBadgesCount || 10
      );
    }

    canvas.className = 'w-full h-auto max-h-[55vh] object-contain rounded-2xl shadow-xl border-2 border-[#1E3A8A]';
    certCanvasContainerRef.current.appendChild(canvas);
  }, [activeTab, previewCertType, learnerUser, progress, unlockedBadgesCount]);

  // Live Badge Canvas renderer for 'badges' tab
  useEffect(() => {
    if (activeTab !== 'badges' || !badgeCanvasContainerRef.current) return;
    badgeCanvasContainerRef.current.innerHTML = '';

    let canvas: HTMLCanvasElement;
    if (previewBadgeType === 'system-design') {
      canvas = renderSystemDesignBadgeCanvas(
        learnerUser,
        progress.systemDesignScore || 100,
        progress.systemDesignBadgeUnlockedAt || new Date().toISOString()
      );
    } else if (previewBadgeType === 'interview-readiness') {
      canvas = renderInterviewReadinessBadgeCanvas(
        learnerUser,
        progress.interviewReadinessScore || 100,
        (progress.interviewReadinessBadgeUnlockedAt || progress.interviewBadgeUnlockedAt) || new Date().toISOString()
      );
    } else {
      const dayPlan = COMPLETE_10_DAY_PLAN.find((d) => d.day === previewBadgeDay) || COMPLETE_10_DAY_PLAN[0];
      const unlockedAt = progress.unlockedBadges[previewBadgeDay] || new Date().toISOString();
      canvas = renderBadgeCanvas(dayPlan.badge, learnerUser, unlockedAt);
    }

    canvas.className = 'w-full h-auto max-h-[50vh] object-contain rounded-2xl shadow-xl border-2 border-[#1E3A8A]';
    badgeCanvasContainerRef.current.appendChild(canvas);
  }, [activeTab, previewBadgeType, previewBadgeDay, learnerUser, progress]);

  // Handlers
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
      downloadCertificatePDF(learnerUser, progress, unlockedBadgesCount || 10);
    } finally {
      setTimeout(() => setDownloadingDoc(null), 1000);
    }
  };

  const handleDownloadCertPNG = () => {
    setDownloadingDoc('cert_png');
    try {
      downloadCertificatePNG(learnerUser, progress, unlockedBadgesCount || 10);
    } finally {
      setTimeout(() => setDownloadingDoc(null), 1000);
    }
  };

  const handleDownloadBadge = (day: number) => {
    const dayPlan = COMPLETE_10_DAY_PLAN.find((d) => d.day === day);
    if (!dayPlan) return;
    const unlockedAt = progress.unlockedBadges[day] || new Date().toISOString();
    downloadBadgePNG(dayPlan.badge, learnerUser, unlockedAt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border-2 border-[#0A192F] shadow-2xl w-full max-w-6xl max-h-[96vh] flex flex-col overflow-hidden text-[#0A192F]">
        {/* Header */}
        <div className="bg-[#0A192F] text-white p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#1E3A8A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#0A192F] flex items-center justify-center font-black text-xl shadow-md shrink-0">
              📜
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Credentials, LOR & 360° Reports Hub
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  Personalized Verification
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold">
                  Live Previews
                </span>
              </div>
              <p className="text-xs text-[#BFDBFE]">
                Sir Padampat Singhania University (SPSU) Udaipur • Evaluated solely by Placement Mentor – Kapil (Independent Technical Mentor)
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
            className={`px-3 sm:px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'hub'
                ? 'bg-white text-[#0A192F] border-t-2 border-x border-[#1E3A8A] shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F]'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-[#1E3A8A]" />
            <span>Download Center</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`px-3 sm:px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'report'
                ? 'bg-white text-[#0A192F] border-t-2 border-x border-[#1E3A8A] shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>360° Report Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('swot')}
            className={`px-3 sm:px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'swot'
                ? 'bg-white text-[#0A192F] border-t-2 border-x border-[#1E3A8A] shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F]'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span>SWOT Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lor')}
            className={`px-3 sm:px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'lor'
                ? 'bg-white text-[#0A192F] border-t-2 border-x border-[#1E3A8A] shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
            <span>Official LOR Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cert')}
            className={`px-3 sm:px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'cert'
                ? 'bg-white text-[#0A192F] border-t-2 border-x border-[#1E3A8A] shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F]'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            <span>Certificate Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('badges')}
            className={`px-3 sm:px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'badges'
                ? 'bg-white text-[#0A192F] border-t-2 border-x border-[#1E3A8A] shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-purple-600" />
            <span>Badges Preview</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8FAFC]">
          {/* Candidate Customization Banner for Demo Users */}
          {!user && (
            <div className="mb-5 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold">Demo Mode Active:</span> You can preview and download all LORs, reports, certificates, and badges immediately! Enter your name below to personalize your documents:
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={demoCandidateName}
                  onChange={(e) => setDemoCandidateName(e.target.value)}
                  placeholder="Enter your full name"
                  className="px-3 py-1.5 rounded-xl border border-amber-300 bg-white text-xs font-bold text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-amber-500 w-48 sm:w-56"
                />
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="px-3 py-1.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold transition-all cursor-pointer whitespace-nowrap text-xs shrink-0"
                >
                  Sign In With Google
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: ALL CREDENTIALS & DOWNLOAD CENTER */}
          {activeTab === 'hub' && (
            <div className="space-y-6">
              {/* Candidate Quick Stats Strip */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                    Candidate Recipient
                  </span>
                  <div className="text-sm font-black text-[#1E3A8A] mt-0.5">
                    {candidateName}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Archetype: <strong>{profile.archetype}</strong> • {profile.tagline}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                      Evaluation Benchmark
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

              {/* Document Download Cards Grid */}
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
                      <div>• Candidate: <strong>{candidateName}</strong></div>
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
                      onClick={() => setActiveTab('report')}
                      className="w-full py-1.5 text-[11px] text-[#1E3A8A] hover:underline font-bold text-center cursor-pointer"
                    >
                      Preview Full 360° Report On-Screen →
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
                      <div>• Template: <strong className="text-emerald-700">100% Unique to {candidateName.split(' ')[0]}</strong></div>
                      <div>• Security: <strong>Cryptographic Digital Stamp & Verification ID</strong></div>
                      <div>• Target Level: <strong className="text-[#1E3A8A]">SDE-1 / MTS High Recommendation</strong></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleDownloadLor}
                      disabled={downloadingDoc === 'lor'}
                      className="w-full py-3 rounded-2xl bg-linear-to-r from-[#1E3A8A] to-[#0A192F] hover:from-[#2563EB] hover:to-[#1E3A8A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
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

                {/* 3. Official Curriculum Certificate of Completion */}
                <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 hover:border-emerald-500 transition-all shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
                        <ShieldCheck className="w-6 h-6 text-emerald-600" />
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        10-Day Curriculum Mastery
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-[#0A192F]">
                        10-Day Placement Boot Camp Certificate
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

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleDownloadCertPDF}
                        disabled={downloadingDoc === 'cert_pdf'}
                        className="py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-400" />
                        <span>Download PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadCertPNG}
                        disabled={downloadingDoc === 'cert_png'}
                        className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A192F] border border-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Image className="w-3.5 h-3.5" />
                        <span>Download PNG</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setPreviewCertType('curriculum');
                        setActiveTab('cert');
                      }}
                      className="w-full py-1.5 text-[11px] text-[#1E3A8A] hover:underline font-bold text-center cursor-pointer"
                    >
                      Preview Certificate On-Screen →
                    </button>
                  </div>
                </div>

                {/* 4. Badges Suite */}
                <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 hover:border-purple-400 transition-all shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="p-2.5 rounded-2xl bg-purple-50 text-purple-600">
                        <Award className="w-6 h-6 text-purple-600" />
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
                        10 Daily Badges
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-[#0A192F]">
                        Daily Placement Excellence Badges
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

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleDownloadBadge(selectedBadgeDay)}
                        className="py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Image className="w-3.5 h-3.5 text-amber-300" />
                        <span>PNG Badge</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const d = COMPLETE_10_DAY_PLAN.find((p) => p.day === selectedBadgeDay);
                          if (d) downloadBadgePDF(d.badge, learnerUser, progress.unlockedBadges[selectedBadgeDay]);
                        }}
                        className="py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF Badge</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setPreviewBadgeType('daily');
                        setPreviewBadgeDay(selectedBadgeDay);
                        setActiveTab('badges');
                      }}
                      className="w-full py-1.5 text-[11px] text-purple-700 hover:underline font-bold text-center cursor-pointer"
                    >
                      Preview All Badges On-Screen →
                    </button>
                  </div>
                </div>

                {/* 5. Special Edition: System Design Suite */}
                <div className="p-5 rounded-3xl bg-linear-to-r from-amber-500/10 via-white to-amber-500/5 border-2 border-amber-400 transition-all shadow-md flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-400 text-[#0A192F] font-black uppercase shadow-xs">
                        ★ Special Edition
                      </span>
                      <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                        {progress.systemDesignPassed ? `Passed: ${progress.systemDesignScore}%` : 'Benchmark: 80% (96/120)'}
                      </span>
                    </div>
                    <h4 className="text-base font-black text-[#0A192F]">
                      System Design Architect Credentials
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      HLD & LLD, Gmail Architecture, Undo Send queues, Postman REST testing, and 120-MCQ Assessment.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          downloadSystemDesignBadgePNG(
                            learnerUser,
                            progress.systemDesignScore || 100,
                            progress.systemDesignBadgeUnlockedAt || new Date().toISOString()
                          )
                        }
                        className="py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>Badge (PNG)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          downloadSystemDesignCertificatePDF(
                            learnerUser,
                            progress.systemDesignScore || 100,
                            progress.systemDesignCorrectCount || 96,
                            progress.systemDesignCertificateIssuedAt || new Date().toISOString()
                          )
                        }
                        className="py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0A192F] text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5 text-[#0A192F]" />
                        <span>Certificate (PDF)</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setPreviewCertType('system-design');
                        setActiveTab('cert');
                      }}
                      className="w-full py-1 text-[11px] text-amber-800 hover:underline font-bold text-center cursor-pointer"
                    >
                      Preview System Design Certificate →
                    </button>
                  </div>
                </div>

                {/* 6. Special Edition: Interview Readiness Suite */}
                <div className="p-5 rounded-3xl bg-linear-to-r from-emerald-500/10 via-white to-emerald-500/5 border-2 border-emerald-400 transition-all shadow-md flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black uppercase shadow-xs">
                        ★ Special Edition
                      </span>
                      <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                        {progress.interviewReadinessPassed ? `Passed: ${progress.interviewReadinessScore}%` : 'Benchmark: 80% (80/100)'}
                      </span>
                    </div>
                    <h4 className="text-base font-black text-[#0A192F]">
                      Interview Readiness Elite Career Credentials
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Fresher & Experienced Technical, Behavioral STAR Framework, Salary Negotiation, and 100-MCQ Assessment.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          downloadInterviewReadinessBadgePNG(
                            learnerUser,
                            progress.interviewReadinessScore || 100,
                            (progress.interviewReadinessBadgeUnlockedAt || progress.interviewBadgeUnlockedAt) || new Date().toISOString()
                          )
                        }
                        className="py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Badge (PNG)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          downloadInterviewReadinessCertificatePDF(
                            learnerUser,
                            progress.interviewReadinessScore || 100,
                            progress.interviewReadinessCorrectCount || 80,
                            (progress.interviewReadinessCertificateIssuedAt || progress.interviewCertificateIssuedAt) || new Date().toISOString()
                          )
                        }
                        className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5 text-white" />
                        <span>Certificate (PDF)</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setPreviewCertType('interview-readiness');
                        setActiveTab('cert');
                      }}
                      className="w-full py-1 text-[11px] text-emerald-800 hover:underline font-bold text-center cursor-pointer"
                    >
                      Preview Interview Readiness Certificate →
                    </button>
                  </div>
                </div>

                {/* 7. Institutional Keepsake Banner */}
                <div className="md:col-span-2 p-5 rounded-3xl bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#0A192F] text-white border-2 border-[#1E3A8A] transition-all shadow-md flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl">
                    <div className="w-40 sm:w-56 rounded-xl overflow-hidden border border-white/20 shadow-lg shrink-0">
                      <img
                        src={spsuPortalBannerImg}
                        alt="SPSU Udaipur Mentor Kapil Commemorative Banner"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400 text-[#0A192F] font-black uppercase">
                          Official Commemorative Keepsake
                        </span>
                        <span className="text-[10px] text-[#BFDBFE] font-mono">High-Res PNG</span>
                      </div>
                      <h4 className="text-base font-black text-white">
                        SPSU Udaipur × Placement Mentorship by Kapil
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Features verified accreditations (QS I-GAUGE Gold, Ranked #3 in Rajasthan), Udaipur Lake Palace, Mentor Kapil & students, and the 7 core career pillars.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = spsuPortalBannerImg;
                      link.download = 'SPSU-Udaipur-Mentor-Kapil-Placement-Banner.png';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-[#0A192F] text-xs font-black transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 shrink-0 hover:scale-[1.02]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Keepsake Banner</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 360° REPORT FULL INTERACTIVE PREVIEW */}
          {activeTab === 'report' && (
            <div className="space-y-6">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-[#1E3A8A] block">
                      ON-SCREEN PREVIEW • 360° COMPREHENSIVE PLACEMENT AUDIT
                    </span>
                    <h3 className="text-xl font-black text-[#0A192F] mt-0.5">
                      360° Placement Evaluation: {candidateName}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Accredited by Placement Mentor – Kapil (Independent Technical Mentor) • Ref ID: <strong>{generateVerificationHash(learnerUser.email, '360REP')}</strong>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload360Report}
                    disabled={downloadingDoc === '360rep'}
                    className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2 shrink-0"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Download 3-Page PDF</span>
                  </button>
                </div>

                {/* Executive Summary */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0A192F]">
                    Executive Summary & Placement Benchmark
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Archetype</span>
                      <strong className="text-sm text-[#1E3A8A]">{profile.archetype}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Overall Score</span>
                      <strong className="text-sm text-emerald-700">{profile.overallGrade}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Cohort Percentile</span>
                      <strong className="text-sm text-blue-700">{profile.percentileRank}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Badges Conferred</span>
                      <strong className="text-sm text-purple-700">{unlockedBadgesCount} / 10</strong>
                    </div>
                  </div>
                </div>

                {/* 6 Core Competency Pillars */}
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-[#0A192F]">
                    6 Core Placement Competency Metrics
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex justify-between font-bold">
                        <span>1. Data Structures & Algorithmic Problem Solving</span>
                        <span className="font-mono text-cyan-700">{profile.scores.patternQuizScore}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-cyan-600 h-2 rounded-full" style={{ width: `${profile.scores.patternQuizScore}%` }} />
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex justify-between font-bold">
                        <span>2. Quantitative Aptitude & Logical Reasoning</span>
                        <span className="font-mono text-emerald-700">{profile.scores.aptitudeScore}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${profile.scores.aptitudeScore}%` }} />
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex justify-between font-bold">
                        <span>3. Virtual Lab Execution & Coding Speed</span>
                        <span className="font-mono text-[#1E3A8A]">
                          {Math.min(100, Math.round((profile.scores.virtualLabChallenges / 50) * 100))}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-[#1E3A8A] h-2 rounded-full"
                          style={{ width: `${Math.min(100, Math.round((profile.scores.virtualLabChallenges / 50) * 100))}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex justify-between font-bold">
                        <span>4. Placement Pressure & Stress Resilience</span>
                        <span className="font-mono text-purple-700">{Math.round((profile.scores.stressQuizScore / 25) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${Math.round((profile.scores.stressQuizScore / 25) * 100)}%` }} />
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex justify-between font-bold">
                        <span>5. System Design & Distributed Systems</span>
                        <span className="font-mono text-amber-700">{progress.systemDesignScore || 90}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${progress.systemDesignScore || 90}%` }} />
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex justify-between font-bold">
                        <span>6. Behavioral & STAR Framework Readiness</span>
                        <span className="font-mono text-teal-700">{progress.interviewReadinessScore || 92}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-teal-600 h-2 rounded-full" style={{ width: `${progress.interviewReadinessScore || 92}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Tier Fit */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <h4 className="text-sm font-black text-[#0A192F]">
                    Target Corporate Placement Match
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200">
                      <div className="font-bold text-[#1E3A8A]">Tier-1 Product Tech</div>
                      <div className="text-[11px] text-slate-600">Amazon, Google, Microsoft, Adobe</div>
                      <div className="text-lg font-black text-[#1E3A8A] font-mono mt-1">
                        {profile.compatibility.productTier1}% Match
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
                      <div className="font-bold text-emerald-800">FinTech & Core Systems</div>
                      <div className="text-[11px] text-slate-600">Goldman Sachs, Morgan Stanley, Cisco</div>
                      <div className="text-lg font-black text-emerald-700 font-mono mt-1">
                        {profile.compatibility.fintechCore}% Match
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200">
                      <div className="font-bold text-purple-800">Digital Specialist Enterprise</div>
                      <div className="text-[11px] text-slate-600">TCS Digital, Infosys DSE, Cognizant</div>
                      <div className="text-lg font-black text-purple-700 font-mono mt-1">
                        {profile.compatibility.digitalSpecialist}% Match
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PERSONALIZED SWOT ANALYSIS ON-SCREEN */}
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
                      {candidateName} • {profile.archetype}
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
            </div>
          )}

          {/* TAB 4: OFFICIAL LOR PREVIEW ON-SCREEN */}
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

          {/* TAB 5: CERTIFICATES LIVE INTERACTIVE PREVIEW */}
          {activeTab === 'cert' && (
            <div className="space-y-6">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-[#1E3A8A] block">
                      LIVE RENDERED HIGH-RES CANVAS PREVIEW (1920×1080)
                    </span>
                    <h3 className="text-lg font-black text-[#0A192F] mt-0.5">
                      Accredited Certificate Preview
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Switch certificate types below to preview and download in vector-crisp PDF or PNG formats.
                    </p>
                  </div>

                  {/* Cert Type Switcher */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setPreviewCertType('curriculum')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        previewCertType === 'curriculum'
                          ? 'bg-[#0A192F] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      10-Day Curriculum
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviewCertType('system-design')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        previewCertType === 'system-design'
                          ? 'bg-amber-400 text-[#0A192F] font-black shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      System Design (HLD)
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviewCertType('interview-readiness')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        previewCertType === 'interview-readiness'
                          ? 'bg-emerald-600 text-white font-black shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Interview Readiness
                    </button>
                  </div>
                </div>

                {/* Rendered Canvas Container */}
                <div
                  ref={certCanvasContainerRef}
                  className="w-full flex items-center justify-center p-2 bg-slate-100/60 rounded-2xl"
                />

                {/* Download Toolbar for Selected Cert */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-600 font-mono text-[11px]">
                    Recipient: <strong>{candidateName}</strong> • Signatory: <strong>Kapil (Independent Entity)</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (previewCertType === 'system-design') {
                          downloadSystemDesignCertificatePNG(
                            learnerUser,
                            progress.systemDesignScore || 100,
                            progress.systemDesignCorrectCount || 96,
                            progress.systemDesignCertificateIssuedAt || undefined
                          );
                        } else if (previewCertType === 'interview-readiness') {
                          downloadInterviewReadinessCertificatePNG(
                            learnerUser,
                            progress.interviewReadinessScore || 100,
                            progress.interviewReadinessCorrectCount || 80,
                            (progress.interviewReadinessCertificateIssuedAt || progress.interviewCertificateIssuedAt) || undefined
                          );
                        } else {
                          downloadCertificatePNG(learnerUser, progress, unlockedBadgesCount || 10);
                        }
                      }}
                      className="px-4 py-2 rounded-xl border-2 border-[#0A192F] bg-white hover:bg-[#0A192F] hover:text-white text-[#0A192F] font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Image className="w-3.5 h-3.5" />
                      <span>Download PNG</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (previewCertType === 'system-design') {
                          downloadSystemDesignCertificatePDF(
                            learnerUser,
                            progress.systemDesignScore || 100,
                            progress.systemDesignCorrectCount || 96,
                            progress.systemDesignCertificateIssuedAt || undefined
                          );
                        } else if (previewCertType === 'interview-readiness') {
                          downloadInterviewReadinessCertificatePDF(
                            learnerUser,
                            progress.interviewReadinessScore || 100,
                            progress.interviewReadinessCorrectCount || 80,
                            (progress.interviewReadinessCertificateIssuedAt || progress.interviewCertificateIssuedAt) || undefined
                          );
                        } else {
                          downloadCertificatePDF(learnerUser, progress, unlockedBadgesCount || 10);
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BADGES LIVE INTERACTIVE PREVIEW */}
          {activeTab === 'badges' && (
            <div className="space-y-6">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-[#1E3A8A] block">
                      HIGH-RESOLUTION 1000×1000 LIVE BADGE CANVAS
                    </span>
                    <h3 className="text-lg font-black text-[#0A192F] mt-0.5">
                      Placement Excellence Badges Gallery
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Preview any daily or special edition badge in real-time, rendered with your credentials.
                    </p>
                  </div>

                  {/* Badge Category Switcher */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setPreviewBadgeType('daily')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        previewBadgeType === 'daily'
                          ? 'bg-[#0A192F] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      10 Daily Badges
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviewBadgeType('system-design')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        previewBadgeType === 'system-design'
                          ? 'bg-amber-400 text-[#0A192F] font-black shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      System Design Badge
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviewBadgeType('interview-readiness')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        previewBadgeType === 'interview-readiness'
                          ? 'bg-emerald-600 text-white font-black shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Interview Readiness Badge
                    </button>
                  </div>
                </div>

                {/* Day Selector if Daily */}
                {previewBadgeType === 'daily' && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <span className="text-xs font-bold text-slate-600 shrink-0">Day:</span>
                    {COMPLETE_10_DAY_PLAN.map((d) => (
                      <button
                        key={d.day}
                        type="button"
                        onClick={() => setPreviewBadgeDay(d.day)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                          previewBadgeDay === d.day
                            ? 'bg-[#1E3A8A] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Day {d.day}
                      </button>
                    ))}
                  </div>
                )}

                {/* Canvas Container */}
                <div
                  ref={badgeCanvasContainerRef}
                  className="w-full flex items-center justify-center p-4 bg-slate-100/60 rounded-2xl"
                />

                {/* Download Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-600 font-mono text-[11px]">
                    Recipient: <strong>{candidateName}</strong> • Signatory: <strong>Kapil</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (previewBadgeType === 'system-design') {
                          downloadSystemDesignBadgePNG(
                            learnerUser,
                            progress.systemDesignScore || 100,
                            progress.systemDesignBadgeUnlockedAt || undefined
                          );
                        } else if (previewBadgeType === 'interview-readiness') {
                          downloadInterviewReadinessBadgePNG(
                            learnerUser,
                            progress.interviewReadinessScore || 100,
                            (progress.interviewReadinessBadgeUnlockedAt || progress.interviewBadgeUnlockedAt) || undefined
                          );
                        } else {
                          const d = COMPLETE_10_DAY_PLAN.find((p) => p.day === previewBadgeDay);
                          if (d) downloadBadgePNG(d.badge, learnerUser, progress.unlockedBadges[previewBadgeDay] || undefined);
                        }
                      }}
                      className="px-4 py-2 rounded-xl border-2 border-[#0A192F] bg-white hover:bg-[#0A192F] hover:text-white text-[#0A192F] font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Image className="w-3.5 h-3.5" />
                      <span>Download PNG</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (previewBadgeType === 'system-design') {
                          downloadSystemDesignBadgePDF(
                            learnerUser,
                            progress.systemDesignScore || 100,
                            progress.systemDesignBadgeUnlockedAt || undefined
                          );
                        } else if (previewBadgeType === 'interview-readiness') {
                          downloadInterviewReadinessBadgePDF(
                            learnerUser,
                            progress.interviewReadinessScore || 100,
                            (progress.interviewReadinessBadgeUnlockedAt || progress.interviewBadgeUnlockedAt) || undefined
                          );
                        } else {
                          const d = COMPLETE_10_DAY_PLAN.find((p) => p.day === previewBadgeDay);
                          if (d) downloadBadgePDF(d.badge, learnerUser, progress.unlockedBadges[previewBadgeDay] || undefined);
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Download PDF</span>
                    </button>
                  </div>
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
