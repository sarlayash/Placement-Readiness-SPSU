import React, { useState, useEffect } from 'react';
import { GoogleUser, UserProgress, DayPlan } from '../types';
import { COMPLETE_10_DAY_PLAN } from '../data/curriculum10Days';
import { isDayUnlocked, isDayCompleted } from '../utils/dayLocking';
import {
  isPushNotificationSupported,
  getPushPermissionStatus,
  requestPushPermission,
  sendNativePushNotification,
} from '../utils/pushNotifications';
import {
  Award,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  Layers,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  User,
  X,
  XCircle,
  Zap,
} from 'lucide-react';
import {
  download360DegreeReportPDF,
  downloadMentorKapilLorPDF,
} from '../utils/reportAndLorGenerator';

interface LearnerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: GoogleUser | null;
  progress: UserProgress;
  onSelectDay: (day: number, tab?: 'notes' | 'ide' | 'pre' | 'post' | 'project') => void;
  onOpenAuth: () => void;
  onOpenCertificate: () => void;
  onOpenStressWheel?: () => void;
  onOpenAptitude?: () => void;
  onOpenSelfService?: () => void;
}

export const LearnerDashboardModal: React.FC<LearnerDashboardModalProps> = ({
  isOpen,
  onClose,
  user,
  progress,
  onSelectDay,
  onOpenAuth,
  onOpenCertificate,
  onOpenStressWheel,
  onOpenAptitude,
  onOpenSelfService,
}) => {
  const [pushStatus, setPushStatus] = useState<string>('default');
  const [pushLoading, setPushLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setPushStatus(getPushPermissionStatus());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const unlockedBadgesCount = Object.keys(progress.unlockedBadges || {}).length;
  const completedDaysCount = Object.keys(progress.completedDays || {}).length;

  const handleEnablePush = async () => {
    setPushLoading(true);
    try {
      const granted = await requestPushPermission();
      setPushStatus(granted ? 'granted' : 'denied');
    } finally {
      setPushLoading(false);
    }
  };

  const handleTestNotification = () => {
    sendNativePushNotification(
      '🎯 SPSU 80% Passing Score Reminder',
      'Kapil Mentor Reminder: Day 1 & Day 2 Diagnostic Pre-Assessments require 80%+ (40/50) to verify mastery.'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border-2 border-[#0A192F] shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#0A192F] text-white p-5 flex items-center justify-between border-b-2 border-[#1E3A8A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0A192F] flex items-center justify-center font-black text-lg shadow-xs">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Learner Progress Dashboard
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Real-Time Sync
                </span>
              </div>
              <p className="text-xs text-[#BFDBFE]">
                Mentorship By Kapil • 10-Day Placement Readiness Pathway
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] text-[#BFDBFE] hover:text-white transition-colors cursor-pointer"
            aria-label="Close Learner Dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* User Profile & Real-Time Sync Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0A192F] to-[#1E3A8A] text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {user ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-14 h-14 rounded-2xl border-2 border-white object-cover shadow-sm shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center shrink-0">
                  <User className="w-7 h-7 text-[#93C5FD]" />
                </div>
              )}
              <div className="space-y-0.5">
                <div className="text-base sm:text-lg font-black text-white">
                  {user ? user.name : 'Guest Learner'}
                </div>
                <div className="text-xs font-mono text-[#93C5FD]">
                  {user ? user.email : 'Sign in with Google to sync scores with Firestore'}
                </div>
                <div className="text-[11px] text-blue-200 flex items-center gap-1.5 pt-1">
                  <Clock className="w-3.5 h-3.5 text-blue-300" />
                  <span>Last Sync Attempt: {user?.signedInAt ? new Date(user.signedInAt).toLocaleTimeString() : 'Current Session'}</span>
                </div>
              </div>
            </div>

            {!user && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="px-4 py-2.5 rounded-xl bg-white text-[#0A192F] font-black text-xs hover:bg-[#EFF6FF] transition-all shadow-xs cursor-pointer self-start sm:self-center"
              >
                Sign In with Google to Sync →
              </button>
            )}
          </div>

          {/* 80% Passing Score Rule Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <strong className="text-sm font-black text-[#0A192F] block">
                  Strict 80% Passing Benchmark Enforced
                </strong>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Both <strong>Pre-Assessment</strong> and <strong>Post-Assessment</strong> require a minimum score of <strong>80% (40 out of 50 correct)</strong> to unlock next-day modules, earn daily mastery badges, and be certified by Mentor Kapil.
                </p>
              </div>
            </div>
            <div className="text-center sm:text-right shrink-0">
              <span className="font-mono text-xl sm:text-2xl font-black text-[#0A192F] block">
                ≥ 80%
              </span>
              <span className="text-[10px] font-extrabold uppercase text-amber-800">
                Passing Cutoff
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC]">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                Days Completed
              </span>
              <span className="text-lg font-black text-[#0A192F] font-mono mt-0.5 block">
                {completedDaysCount} / 10
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC]">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                Badges Unlocked
              </span>
              <span className="text-lg font-black text-amber-600 font-mono mt-0.5 block">
                {unlockedBadgesCount} / 10
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC]">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                Solved Challenges
              </span>
              <span className="text-lg font-black text-[#1E3A8A] font-mono mt-0.5 block">
                {progress.completedChallengeIds?.length || 0}
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC]">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                DSA Patterns (100)
              </span>
              <span className="text-lg font-black text-cyan-700 font-mono mt-0.5 block">
                {progress.patternQuizScore !== undefined ? `${progress.patternQuizScore}%` : 'Pending'}
              </span>
              <span className="text-[9px] font-mono text-slate-500">
                {progress.patternQuizCompleted ? '✓ Completed' : '100 Scenarios'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC]">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                Aptitude (50 Qs)
              </span>
              <span className="text-lg font-black text-emerald-700 font-mono mt-0.5 block">
                {progress.aptitudeScore !== undefined ? `${progress.aptitudeScore}%` : 'Pending'}
              </span>
              <span className="text-[9px] font-mono text-slate-500">
                {progress.aptitudePassed ? '✓ Passed (≥80%)' : 'Cutoff: 80%'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC]">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                Stress Wheel Quiz
              </span>
              <span className="text-lg font-black text-purple-700 font-mono mt-0.5 block">
                {progress.stressQuizScore ?? 0} / 25
              </span>
              <span className="text-[9px] font-mono text-slate-500">
                {progress.stressQuizAnswered ?? 0} Scenarios
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC]">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                Official Certificate
              </span>
              <span className="text-xs font-bold text-[#0A192F] truncate mt-1 block font-mono">
                {progress.certificateId ? '✓ Generated' : 'Pending (80%+)'}
              </span>
            </div>
          </div>

          {/* Self-Service Instant Downloads Section */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0A192F] to-[#1E3A8A] text-white shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-400 text-[#0A192F]">
                  <Download className="w-5 h-5 text-[#0A192F]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">
                    Learner Self-Service Downloads Center
                  </h4>
                  <p className="text-[11px] text-[#BFDBFE]">
                    Instant access to your verified 360° Evaluation Report, Mentor Kapil LOR, Badges & Certificate.
                  </p>
                </div>
              </div>

              {onOpenSelfService && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSelfService();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap self-start sm:self-center"
                >
                  Open Full Hub →
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {/* 360 Report PDF */}
              <button
                type="button"
                onClick={() => {
                  const learnerUser: GoogleUser = user || {
                    uid: 'demo_user',
                    name: 'SPSU Learner',
                    email: 'learner@spsu.ac.in',
                    photoURL: '',
                    signedInAt: new Date().toISOString(),
                  };
                  download360DegreeReportPDF(learnerUser, progress);
                }}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-all cursor-pointer space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <FileSpreadsheet className="w-4 h-4 text-amber-300" />
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-200">PDF</span>
                </div>
                <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                  360° Detailed Report
                </div>
                <div className="text-[10px] text-slate-300">
                  Personalized SWOT analysis, 5-dimension competency & 10-day audit.
                </div>
              </button>

              {/* LOR from Mentor Kapil PDF */}
              <button
                type="button"
                onClick={() => {
                  const learnerUser: GoogleUser = user || {
                    uid: 'demo_user',
                    name: 'SPSU Learner',
                    email: 'learner@spsu.ac.in',
                    photoURL: '',
                    signedInAt: new Date().toISOString(),
                  };
                  downloadMentorKapilLorPDF(learnerUser, progress);
                }}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-all cursor-pointer space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <GraduationCap className="w-4 h-4 text-emerald-300" />
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-200">PDF</span>
                </div>
                <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Mentor Kapil LOR
                </div>
                <div className="text-[10px] text-slate-300">
                  Individualized SDE-1 recommendation with authentic personal value-add.
                </div>
              </button>

              {/* Certificate */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCertificate();
                }}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-all cursor-pointer space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <ShieldCheck className="w-4 h-4 text-cyan-300" />
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/30 text-cyan-200">PDF / PNG</span>
                </div>
                <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Official Certificate
                </div>
                <div className="text-[10px] text-slate-300">
                  Sole signatory: Kapil. Verified completion credential.
                </div>
              </button>

              {/* Launch Aptitude / Stress Quiz */}
              <div className="p-3 rounded-xl bg-white/10 border border-white/20 flex flex-col justify-between gap-1.5">
                <span className="text-[10px] font-mono text-amber-300 uppercase font-bold">
                  Quick Quiz Launch
                </span>
                <div className="flex items-center gap-2">
                  {onOpenAptitude && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenAptitude();
                      }}
                      className="flex-1 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-[10px] font-bold text-white transition-all cursor-pointer text-center"
                    >
                      🧠 Aptitude (50 Q)
                    </button>
                  )}
                  {onOpenStressWheel && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenStressWheel();
                      }}
                      className="flex-1 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-[10px] font-bold text-[#0A192F] transition-all cursor-pointer text-center"
                    >
                      🎡 Wheel (25 Q)
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Push Notifications Section */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#EFF6FF] text-[#1E3A8A]">
                <Bell className="w-5 h-5 text-[#1E3A8A]" />
              </div>
              <div>
                <strong className="text-xs sm:text-sm font-bold text-[#0A192F] block">
                  Automatic Push Notifications & Routine Reminders
                </strong>
                <p className="text-[11px] text-slate-500">
                  Receive browser alerts for 09:00 AM Diagnostic Benchmarks and 02:30 PM Verification sessions.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              {pushStatus === 'granted' ? (
                <>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Alerts Active</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleTestNotification}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A192F] text-xs font-bold transition-all cursor-pointer"
                  >
                    Test Push
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEnablePush}
                  disabled={pushLoading}
                  className="px-4 py-2 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-300" />
                  <span>{pushLoading ? 'Requesting...' : 'Enable Push Reminders'}</span>
                </button>
              )}
            </div>
          </div>

          {/* 10-Day Real-Time Assessment Scorecard Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-[#0A192F] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1E3A8A]" />
                <span>10-Day Live Assessment Scorecard (Passing: 80%)</span>
              </h4>
              <span className="text-xs text-slate-500 font-mono">
                Real-Time Firestore Synchronized
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0A192F] text-white font-mono uppercase text-[10px]">
                      <th className="py-3 px-3.5">Day</th>
                      <th className="py-3 px-3.5">Module Coverage</th>
                      <th className="py-3 px-3.5">Pre-Assessment (50 Qs)</th>
                      <th className="py-3 px-3.5">Post-Assessment (50 Qs)</th>
                      <th className="py-3 px-3.5">Day Status</th>
                      <th className="py-3 px-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {COMPLETE_10_DAY_PLAN.map((d) => {
                      const dayNum = d.day;
                      const preScore = progress.preAssessmentScores?.[dayNum];
                      const postScore = progress.postAssessmentScores?.[dayNum];
                      const prePassed = Boolean(progress.preAssessmentPassed?.[dayNum]);
                      const postPassed = Boolean(progress.postAssessmentPassed?.[dayNum]);
                      const isUnlocked = isDayUnlocked(dayNum, progress);
                      const isComplete = isDayCompleted(dayNum, progress);

                      return (
                        <tr key={dayNum} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-3.5 font-bold text-[#0A192F]">
                            Day {dayNum}
                          </td>
                          <td className="py-3 px-3.5 font-sans font-medium text-slate-800 max-w-[200px] truncate" title={d.title}>
                            {d.title}
                          </td>
                          
                          {/* Pre-Assessment Score */}
                          <td className="py-3 px-3.5">
                            {preScore !== undefined ? (
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-bold text-xs ${
                                  preScore >= 80
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : 'bg-red-50 text-red-800 border border-red-200'
                                }`}
                              >
                                {preScore >= 80 ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                                )}
                                <span>{preScore}%</span>
                                <span className="text-[9px] font-sans">
                                  {preScore >= 80 ? '(PASS)' : '(RETAKE)'}
                                </span>
                              </span>
                            ) : (
                              <span className="text-slate-400 font-sans italic">Not Attempted</span>
                            )}
                          </td>

                          {/* Post-Assessment Score */}
                          <td className="py-3 px-3.5">
                            {postScore !== undefined ? (
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-bold text-xs ${
                                  postScore >= 80
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : 'bg-red-50 text-red-800 border border-red-200'
                                }`}
                              >
                                {postScore >= 80 ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                                )}
                                <span>{postScore}%</span>
                                <span className="text-[9px] font-sans">
                                  {postScore >= 80 ? '(PASS)' : '(RETAKE)'}
                                </span>
                              </span>
                            ) : (
                              <span className="text-slate-400 font-sans italic">Not Attempted</span>
                            )}
                          </td>

                          {/* Day Status */}
                          <td className="py-3 px-3.5">
                            {isComplete ? (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                                ✓ COMPLETED
                              </span>
                            ) : isUnlocked ? (
                              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-[#1E3A8A] font-extrabold text-[10px]">
                                IN PROGRESS
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 font-bold text-[10px] flex items-center gap-1 w-max">
                                <Lock className="w-3 h-3" />
                                <span>LOCKED</span>
                              </span>
                            )}
                          </td>

                          {/* Action Button */}
                          <td className="py-3 px-3.5 text-right font-sans">
                            {isUnlocked ? (
                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  onSelectDay(dayNum, preScore === undefined ? 'pre' : postScore === undefined ? 'post' : 'notes');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer shadow-xs inline-flex items-center gap-1"
                              >
                                <span>Launch</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            ) : (
                              <span className="text-slate-400 text-xs">Locked</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500 hidden sm:inline">
            Real-time score records are preserved in Google Cloud Firestore and verifiable by SPSU Admin.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer shadow-xs ml-auto"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
