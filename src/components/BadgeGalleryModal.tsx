import React from 'react';
import { DailyBadge, GoogleUser, UserProgress } from '../types';
import { Award, CheckCircle2, Download, Image, ShieldCheck, Sparkles, X } from 'lucide-react';
import {
  downloadBadgePNG,
  downloadBadgePDF,
  downloadSystemDesignBadgePNG,
  downloadSystemDesignBadgePDF,
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
  const unlockedCount = Object.keys(progress.unlockedBadges).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white border-2 border-[#0A192F] shadow-2xl overflow-hidden my-6 text-[#0A192F]">
        {/* Header */}
        <div className="bg-[#0A192F] text-white px-6 py-5 flex items-center justify-between gap-4 border-b border-[#1E3A8A]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1E3A8A] text-[#BFDBFE] font-mono text-xs font-bold">
                SPSU UDAIPUR • MENTORSHIP BY KAPIL
              </span>
              <span className="text-xs font-mono text-white font-extrabold">
                {unlockedCount} / 10 Daily Badges Unlocked
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1">
              10-Day Placement & Assessment Daily Badges
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
          <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-[#1E3A8A] flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#0A192F]">
              <ShieldCheck className="w-4 h-4 text-[#1E3A8A] shrink-0" />
              <span>
                <strong>High-Resolution Credential Export:</strong> Every Daily Badge is rendered on a crisp 1000×1000 Navy Blue & White canvas signed solely by <strong>Kapil</strong> and downloadable in both <strong>PNG</strong> and <strong>PDF</strong> formats.
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
                    <div className="flex items-center gap-2">
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

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                  <button
                    type="button"
                    onClick={() =>
                      downloadSystemDesignBadgePNG(
                        user,
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
                        user,
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

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-500">
                      Signatory: <strong className="text-[#0A192F]">Kapil</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => downloadBadgePNG(badge, user, unlockedAt)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#0A192F] bg-white hover:bg-[#0A192F] text-[#0A192F] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Image className="w-3.5 h-3.5" />
                        <span>Download PNG</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => downloadBadgePDF(badge, user, unlockedAt)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
