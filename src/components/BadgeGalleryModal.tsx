import React, { useState, useEffect, useRef } from 'react';
import { DailyBadge, GoogleUser, UserProgress } from '../types';
import { Award, CheckCircle2, Download, Eye, Image, ShieldCheck, Sparkles, X } from 'lucide-react';
import {
  downloadBadgePNG,
  downloadBadgePDF,
  downloadSystemDesignBadgePNG,
  downloadSystemDesignBadgePDF,
  downloadInterviewReadinessBadgePNG,
  downloadInterviewReadinessBadgePDF,
  renderBadgeCanvas,
  renderSystemDesignBadgeCanvas,
  renderInterviewReadinessBadgeCanvas,
} from '../utils/exportCredentials';

interface BadgeGalleryModalProps {
  badges: DailyBadge[];
  user: GoogleUser | null;
  progress: UserProgress;
  onClose: () => void;
}

export const BadgeGalleryModal: React.FC<BadgeGalleryModalProps> = ({
  badges,
  user,
  progress,
  onClose,
}) => {
  const effectiveUser: GoogleUser = user || {
    uid: 'demo-user-spsu',
    name: 'SPSU Placement Aspirant',
    displayName: 'SPSU Placement Aspirant',
    email: 'learner@spsu.ac.in',
    photoURL: '',
    signedInAt: new Date().toISOString(),
  };

  const unlockedCount = Object.keys(progress.unlockedBadges || {}).length;

  // Badge Preview State
  const [previewModal, setPreviewModal] = useState<{
    title: string;
    type: 'daily' | 'system-design' | 'interview-readiness';
    badge?: DailyBadge;
    unlockedAt?: string;
    score?: number;
  } | null>(null);

  const previewCanvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!previewModal || !previewCanvasContainerRef.current) return;
    previewCanvasContainerRef.current.innerHTML = '';

    let canvas: HTMLCanvasElement;
    if (previewModal.type === 'system-design') {
      canvas = renderSystemDesignBadgeCanvas(
        effectiveUser,
        previewModal.score || progress.systemDesignScore || 100,
        previewModal.unlockedAt || progress.systemDesignBadgeUnlockedAt || new Date().toISOString()
      );
    } else if (previewModal.type === 'interview-readiness') {
      canvas = renderInterviewReadinessBadgeCanvas(
        effectiveUser,
        previewModal.score || progress.interviewReadinessScore || 100,
        previewModal.unlockedAt || (progress.interviewReadinessBadgeUnlockedAt || progress.interviewBadgeUnlockedAt) || new Date().toISOString()
      );
    } else if (previewModal.badge) {
      canvas = renderBadgeCanvas(
        previewModal.badge,
        effectiveUser,
        previewModal.unlockedAt || new Date().toISOString()
      );
    } else {
      return;
    }

    canvas.className = 'w-full h-auto max-h-[65vh] object-contain rounded-2xl shadow-2xl border-2 border-[#1E3A8A]';
    previewCanvasContainerRef.current.appendChild(canvas);
  }, [previewModal, effectiveUser, progress]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white border-2 border-[#0A192F] shadow-2xl overflow-hidden my-6 text-[#0A192F]">
        {/* Header */}
        <div className="bg-[#0A192F] text-white px-6 py-5 flex items-center justify-between gap-4 border-b border-[#1E3A8A]">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1E3A8A] text-[#BFDBFE] font-mono text-xs font-bold">
                SPSU UDAIPUR • MENTORSHIP BY KAPIL
              </span>
              <span className="text-xs font-mono text-white font-extrabold">
                {unlockedCount} / 10 Daily Badges Unlocked
              </span>
              {progress.systemDesignPassed && (
                <span className="text-xs font-mono text-amber-300 font-extrabold">
                  • System Design Unlocked
                </span>
              )}
              {progress.interviewReadinessPassed && (
                <span className="text-xs font-mono text-emerald-300 font-extrabold">
                  • Interview Readiness Unlocked
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1">
              Placement & Assessment Credential Badges
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Info Banner */}
          <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-[#1E3A8A] flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#0A192F]">
              <ShieldCheck className="w-4 h-4 text-[#1E3A8A] shrink-0" />
              <span>
                <strong>High-Resolution Credential Export & Live Preview:</strong> Every Badge is rendered on a crisp 1000×1000 high-resolution canvas with candidate personalization (<strong>{effectiveUser.displayName || effectiveUser.name || 'SPSU Placement Aspirant'}</strong>) signed solely by <strong>Placement Mentor – Kapil</strong> and downloadable in both <strong>PNG</strong> and <strong>PDF</strong> formats.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SPECIAL EDITION: System Design Architect Badge */}
            <div
              className={`rounded-2xl border-2 p-5 flex flex-col justify-between gap-4 transition-all md:col-span-2 ${
                progress.systemDesignPassed
                  ? 'border-amber-500 bg-linear-to-r from-amber-50/40 via-white to-amber-50/20 shadow-md'
                  : 'border-slate-200 bg-[#F8FAFC]'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 font-mono font-black border-2 ${
                      progress.systemDesignPassed
                        ? 'bg-[#0A192F] text-amber-400 border-amber-400 shadow-md'
                        : 'bg-slate-200 text-slate-600 border-slate-300'
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-wider">SPECIAL</span>
                    <span className="text-xl leading-none">HLD</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded-full bg-amber-400 text-[#0A192F]">
                        ★ SPECIAL EDITION BADGE
                      </span>
                      {progress.systemDesignPassed ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-900 text-[10px] font-black">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          <span>EARNED ({progress.systemDesignScore || 100}%)</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500 font-semibold">
                          Requires 80% on 60-Min 120-MCQ Assessment
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-black text-[#0A192F]">
                      System Design Architect Badge
                    </h3>
                    <p className="text-xs font-bold text-[#1E3A8A]">
                      High-Level Design, Gmail End-to-End Architecture & Postman Masterclass
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Conferred for mastering distributed architecture concepts, Layer 4/7 load balancing, database sharding, Redis caching, and scoring ≥ 80% on the 120-question placement post-assessment.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 flex-wrap">
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewModal({
                        title: 'System Design Architect Badge',
                        type: 'system-design',
                        score: progress.systemDesignScore || 100,
                        unlockedAt: progress.systemDesignBadgeUnlockedAt || undefined,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-[#0A192F] text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    <span>Preview Badge</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      downloadSystemDesignBadgePNG(
                        effectiveUser,
                        progress.systemDesignScore || 100,
                        progress.systemDesignBadgeUnlockedAt || new Date().toISOString()
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#0A192F] bg-white hover:bg-[#0A192F] text-[#0A192F] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Image className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      downloadSystemDesignBadgePDF(
                        effectiveUser,
                        progress.systemDesignScore || 100,
                        progress.systemDesignBadgeUnlockedAt || new Date().toISOString()
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0A192F] font-black text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SPECIAL EDITION: Interview Readiness Elite Career Badge */}
            <div
              className={`rounded-2xl border-2 p-5 flex flex-col justify-between gap-4 transition-all md:col-span-2 ${
                progress.interviewReadinessPassed
                  ? 'border-emerald-500 bg-linear-to-r from-emerald-50/40 via-white to-emerald-50/20 shadow-md'
                  : 'border-slate-200 bg-[#F8FAFC]'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 font-mono font-black border-2 ${
                      progress.interviewReadinessPassed
                        ? 'bg-[#064e3b] text-emerald-400 border-emerald-400 shadow-md'
                        : 'bg-slate-200 text-slate-600 border-slate-300'
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-wider">SPECIAL</span>
                    <span className="text-xl leading-none">INT</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                        ★ SPECIAL EDITION BADGE
                      </span>
                      {progress.interviewReadinessPassed ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-900 text-[10px] font-black">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          <span>EARNED ({progress.interviewReadinessScore || 100}%)</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500 font-semibold">
                          Requires 80% on 100 Comprehensive Interview MCQs
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-black text-[#0A192F]">
                      Interview Readiness Elite Career Badge
                    </h3>
                    <p className="text-xs font-bold text-emerald-700">
                      Fresher & Experienced Technical, Behavioral & Real-World Placement Prep
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Conferred for mastering behavioral frameworks, STAR storytelling, core CS fundamentals, salary negotiation, and achieving ≥ 80% on the 100-question interview readiness assessment.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 flex-wrap">
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewModal({
                        title: 'Interview Readiness Elite Career Badge',
                        type: 'interview-readiness',
                        score: progress.interviewReadinessScore || 100,
                        unlockedAt: (progress.interviewReadinessBadgeUnlockedAt || progress.interviewBadgeUnlockedAt) || undefined,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-[#0A192F] text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    <span>Preview Badge</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      downloadInterviewReadinessBadgePNG(
                        effectiveUser,
                        progress.interviewReadinessScore || 100,
                        (progress.interviewReadinessBadgeUnlockedAt || progress.interviewBadgeUnlockedAt) || new Date().toISOString()
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#0A192F] bg-white hover:bg-[#0A192F] text-[#0A192F] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Image className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      downloadInterviewReadinessBadgePDF(
                        effectiveUser,
                        progress.interviewReadinessScore || 100,
                        (progress.interviewReadinessBadgeUnlockedAt || progress.interviewBadgeUnlockedAt) || new Date().toISOString()
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 10 DAILY BADGES */}
            {badges.map((badge) => {
              const unlockedAt = progress.unlockedBadges[badge.day];
              const isUnlocked = Boolean(unlockedAt);

              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl border-2 p-5 flex flex-col justify-between gap-4 transition-all ${
                    isUnlocked
                      ? 'border-[#0A192F] bg-white shadow-sm'
                      : 'border-slate-200 bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 font-mono font-black border-2 ${
                        isUnlocked
                          ? 'bg-[#0A192F] text-white border-[#1E3A8A]'
                          : 'bg-slate-200 text-slate-600 border-slate-300'
                      }`}
                    >
                      <span className="text-[9px] uppercase">DAY</span>
                      <span className="text-xl leading-none">{badge.day}</span>
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#1E3A8A]">
                          {badge.moduleRef}
                        </span>
                        {isUnlocked ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EFF6FF] border border-[#0A192F] text-[#0A192F] text-[10px] font-black">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>EARNED</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500 font-semibold">
                            Complete Day {badge.day} Lab / Post-Test
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-black text-[#0A192F]">
                        {badge.title}
                      </h3>
                      <p className="text-xs font-bold text-[#1E3A8A]">{badge.subtitle}</p>
                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {badge.criteria}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-500">
                      Signatory: <strong className="text-[#0A192F]">Kapil</strong>
                    </span>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewModal({
                            title: `Day ${badge.day}: ${badge.title}`,
                            type: 'daily',
                            badge,
                            unlockedAt: unlockedAt || new Date().toISOString(),
                          })
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-[#0A192F] text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-600" />
                        <span>Preview</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => downloadBadgePNG(badge, effectiveUser, unlockedAt)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#0A192F] bg-white hover:bg-[#0A192F] text-[#0A192F] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Image className="w-3.5 h-3.5" />
                        <span>PNG</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => downloadBadgePDF(badge, effectiveUser, unlockedAt)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* POPUP PREVIEW LIGHTBOX */}
      {previewModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative bg-white rounded-3xl border-2 border-[#0A192F] max-w-2xl w-full p-5 space-y-4 shadow-2xl flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#1E3A8A]">
                  HIGH-RESOLUTION LIVE BADGE PREVIEW (1000×1000)
                </span>
                <h3 className="text-base font-black text-[#0A192F]">
                  {previewModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-[#0A192F] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Canvas Container */}
            <div
              ref={previewCanvasContainerRef}
              className="w-full flex items-center justify-center py-2"
            />

            {/* Action buttons */}
            <div className="w-full flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
              <span className="font-mono text-slate-500 text-[11px]">
                Recipient: <strong>{effectiveUser.displayName || effectiveUser.name || 'SPSU Placement Aspirant'}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (previewModal.type === 'system-design') {
                      downloadSystemDesignBadgePNG(
                        effectiveUser,
                        previewModal.score || 100,
                        previewModal.unlockedAt
                      );
                    } else if (previewModal.type === 'interview-readiness') {
                      downloadInterviewReadinessBadgePNG(
                        effectiveUser,
                        previewModal.score || 100,
                        previewModal.unlockedAt
                      );
                    } else if (previewModal.badge) {
                      downloadBadgePNG(previewModal.badge, effectiveUser, previewModal.unlockedAt);
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl border-2 border-[#0A192F] bg-white hover:bg-[#0A192F] hover:text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Image className="w-3.5 h-3.5" />
                  <span>Download PNG</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (previewModal.type === 'system-design') {
                      downloadSystemDesignBadgePDF(
                        effectiveUser,
                        previewModal.score || 100,
                        previewModal.unlockedAt
                      );
                    } else if (previewModal.type === 'interview-readiness') {
                      downloadInterviewReadinessBadgePDF(
                        effectiveUser,
                        previewModal.score || 100,
                        previewModal.unlockedAt
                      );
                    } else if (previewModal.badge) {
                      downloadBadgePDF(previewModal.badge, effectiveUser, previewModal.unlockedAt);
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
