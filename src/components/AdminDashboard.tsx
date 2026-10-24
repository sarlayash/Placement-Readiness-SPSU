import React, { useState, useEffect } from 'react';
import { LearnerRecord } from '../types';
import { fetchAllLearners, subscribeToLearners, downloadAssessmentScoresCSV } from '../utils/learnerRegistry';
import { LiveDateTime } from './LiveDateTime';
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  GraduationCap,
  Layers,
  Lock,
  LogOut,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
  X,
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToPortal: () => void;
  onAdminSignOut: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToPortal,
  onAdminSignOut,
}) => {
  const [learners, setLearners] = useState<LearnerRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDayFilter, setSelectedDayFilter] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'day1_pre' | 'day1_post' | 'day1_complete' | 'certified'>('all');
  const [inspectedLearner, setInspectedLearner] = useState<LearnerRecord | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllLearners();
      setLearners(data);
    } catch (err) {
      console.warn('Failed to fetch learners in admin dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToLearners((liveLearners) => {
      setLearners(liveLearners);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Filtered Learners
  const filteredLearners = learners.filter((l) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (l.name && l.name.toLowerCase().includes(q)) ||
      (l.email && l.email.toLowerCase().includes(q)) ||
      (l.uid && l.uid.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (statusFilter === 'day1_pre') {
      return Boolean(l.preAssessmentPassed?.[1]);
    }
    if (statusFilter === 'day1_post') {
      return Boolean(l.postAssessmentPassed?.[1]);
    }
    if (statusFilter === 'day1_complete') {
      return Boolean(l.completedDays?.[1] || (l.preAssessmentPassed?.[1] && l.postAssessmentPassed?.[1]));
    }
    if (statusFilter === 'certified') {
      return Boolean(l.certificateId);
    }

    return true;
  });

  // Structural KPI metrics
  const totalLearners = learners.length;
  const day1PreCompletedCount = learners.filter((l) => l.preAssessmentPassed?.[1]).length;
  const day1PostCompletedCount = learners.filter((l) => l.postAssessmentPassed?.[1]).length;
  const certifiedCount = learners.filter((l) => l.certificateId).length;
  const totalBadgesEarned = learners.reduce(
    (acc, l) => acc + Object.keys(l.unlockedBadges || {}).length,
    0
  );

  const formatTimestamp = (isoString?: string) => {
    if (!isoString) return 'Not available';
    try {
      const d = new Date(isoString);
      return d.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'medium',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Admin Top Header Card */}
      <section className="rounded-3xl bg-[#0A192F] text-white border-2 border-[#1E3A8A] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-mono font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>ADMIN PORTAL • AUTHENTICATED</span>
              </span>
              <span className="text-xs font-mono text-[#93C5FD]">
                SPSU Udaipur Placement Readiness System
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Executive Administrator Dashboard
            </h1>

            <p className="text-xs sm:text-sm text-[#BFDBFE] max-w-2xl leading-relaxed">
              Real-time monitoring of authenticated Firebase Google learners, login attempts, sequential day completions, and daily pre/post assessment scores with instant CSV exports.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Live Clock */}
            <div className="px-4 py-2 rounded-xl bg-[#112240] border border-[#1E3A8A] flex items-center justify-center">
              <LiveDateTime />
            </div>

            <button
              type="button"
              onClick={onBackToPortal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#EFF6FF] text-[#0A192F] text-xs font-black transition-all cursor-pointer shadow-md"
            >
              <span>Back to Learner Portal</span>
            </button>

            <button
              type="button"
              onClick={onAdminSignOut}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-950 hover:bg-red-900 border border-red-500/50 text-red-200 text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Admin Logout</span>
            </button>
          </div>
        </div>
      </section>

      {/* 80% Passing Cutoff Strict Benchmark Notice */}
      <section className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-emerald-600 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex flex-col items-center justify-center font-black text-xs shrink-0 shadow-sm">
            <span>80%</span>
            <span className="text-[9px] font-mono">PASS</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-emerald-800">
                Placement Standard Enforced
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                ≥ 40/50 MCQs
              </span>
            </div>
            <div className="text-base font-extrabold text-[#0A192F]">
              Strict 80% Passing Benchmark Across All Assessments
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Real-time Firestore scoring: Learners must score at least 80% (40 out of 50 correct MCQs) on both Diagnostic Pre-Assessment and Verification Post-Assessment to qualify for Badges and Day progression.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>≥ 80% = PASSED</span>
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-300 font-mono text-xs font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>&lt; 80% = RETAKE</span>
          </span>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border-2 border-[#0A192F] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[#1E3A8A] font-bold uppercase">
            <span>Registered Users</span>
            <Users className="w-4 h-4 text-[#0A192F]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0A192F]">
            {isLoading ? '...' : totalLearners}
          </div>
          <div className="text-[11px] text-slate-500">Firebase Google Accounts</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border-2 border-[#0A192F] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[#1E3A8A] font-bold uppercase">
            <span>Day 1 Pre-Tests</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0A192F]">
            {isLoading ? '...' : day1PreCompletedCount}
          </div>
          <div className="text-[11px] text-slate-500">50-MCQ Pre Completed</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border-2 border-[#0A192F] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[#1E3A8A] font-bold uppercase">
            <span>Day 1 Post-Tests</span>
            <Award className="w-4 h-4 text-[#1E3A8A]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0A192F]">
            {isLoading ? '...' : day1PostCompletedCount}
          </div>
          <div className="text-[11px] text-slate-500">50-MCQ Post Completed</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border-2 border-[#0A192F] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[#1E3A8A] font-bold uppercase">
            <span>Badges Unlocked</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0A192F]">
            {isLoading ? '...' : totalBadgesEarned}
          </div>
          <div className="text-[11px] text-slate-500">Cumulative Badges Claimed</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border-2 border-[#0A192F] shadow-sm space-y-1 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs font-mono text-[#1E3A8A] font-bold uppercase">
            <span>Certificates</span>
            <GraduationCap className="w-4 h-4 text-[#0A192F]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0A192F]">
            {isLoading ? '...' : certifiedCount}
          </div>
          <div className="text-[11px] text-slate-500">Kapil Signed Credentials</div>
        </div>
      </section>

      {/* CSV Export & Download Action Center */}
      <section className="rounded-2xl border-2 border-[#0A192F] bg-white p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase text-[#1E3A8A]">
              ASSESSMENT SCORES EXPORT SUITE
            </div>
            <h2 className="text-xl font-black text-[#0A192F]">
              Download Assessment Scores in CSV Format
            </h2>
          </div>
          <div className="text-xs text-slate-600">
            Exports real-time scores, pass statuses, and last login attempts across all learners.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Complete 10-Days Assessment CSV Download */}
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-300 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-sm font-black text-[#0A192F]">
                <FileSpreadsheet className="w-4 h-4 text-[#1E3A8A]" />
                <span>Complete 10-Day Assessment Scores (Master CSV)</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Includes all student profiles, UID, first login, last login attempt, Pre & Post scores for Days 1 through 10, completed days tally, and certificate status.
              </p>
            </div>
            <button
              type="button"
              onClick={() => downloadAssessmentScoresCSV(learners)}
              disabled={learners.length === 0}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Download Master CSV (All 10 Days)</span>
            </button>
          </div>

          {/* Daily Specific Assessment CSV Download */}
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-300 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-sm font-black text-[#0A192F]">
                <FileText className="w-4 h-4 text-[#1E3A8A]" />
                <span>Daily Assessment Scores (Single Day CSV)</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Select a specific day to export its 50-MCQ Pre-Assessment score, Post-Assessment score, section verification, and learner login timestamps.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedDayFilter}
                onChange={(e) => setSelectedDayFilter(Number(e.target.value))}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-mono font-bold text-[#0A192F] focus:outline-none focus:border-[#1E3A8A]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => (
                  <option key={d} value={d}>
                    Day {d} Assessment
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => downloadAssessmentScoresCSV(learners, selectedDayFilter)}
                disabled={learners.length === 0}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-[#2563EB] text-white text-xs font-bold transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Download Day {selectedDayFilter} CSV</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Real Users Table & Search Controls */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-black text-[#0A192F]">
                Authenticated Learners & Activity Log
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono text-[10px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Firebase Sync Active</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Showing {filteredLearners.length} of {learners.length} registered learners with verified Google Firebase sign-ups.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={loadData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-[#0A192F] transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Firebase Data</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by learner name, email address, or Firebase UID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:outline-none focus:border-[#1E3A8A]"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-[#0A192F] focus:outline-none focus:border-[#1E3A8A]"
            >
              <option value="all">All Learners ({learners.length})</option>
              <option value="day1_pre">Day 1 Pre-Test Attempted ({day1PreCompletedCount})</option>
              <option value="day1_post">Day 1 Post-Test Attempted ({day1PostCompletedCount})</option>
              <option value="certified">Certificate Awarded ({certifiedCount})</option>
            </select>
          </div>
        </div>

        {/* Learners Table */}
        <div className="rounded-2xl border-2 border-[#0A192F] bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#0A192F] text-white font-mono uppercase text-[11px]">
                  <th className="py-3 px-4 border-r border-[#1E3A8A]">Learner Profile</th>
                  <th className="py-3 px-4 border-r border-[#1E3A8A]">Email & UID</th>
                  <th className="py-3 px-4 border-r border-[#1E3A8A]">Last Login Attempt</th>
                  <th className="py-3 px-4 text-center border-r border-[#1E3A8A]">Day 1 Pre (50 Q)</th>
                  <th className="py-3 px-4 text-center border-r border-[#1E3A8A]">Day 1 Post (50 Q)</th>
                  <th className="py-3 px-4 text-center border-r border-[#1E3A8A]">Days Done</th>
                  <th className="py-3 px-4 text-center border-r border-[#1E3A8A]">Badges</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLearners.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500">
                      <div className="space-y-2">
                        <Users className="w-8 h-8 text-slate-400 mx-auto" />
                        <div className="font-bold text-slate-700">No learners found matching criteria.</div>
                        <p className="text-xs text-slate-500">
                          {learners.length === 0
                            ? 'No Google sign-ups recorded yet. When students sign in via Google, they appear here instantly.'
                            : 'Try adjusting your search query or filter.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLearners.map((learner) => {
                    const pre1 = learner.preAssessmentScores?.[1];
                    const post1 = learner.postAssessmentScores?.[1];
                    const prePassed = Boolean(learner.preAssessmentPassed?.[1]);
                    const postPassed = Boolean(learner.postAssessmentPassed?.[1]);
                    const completedDaysCount = Object.keys(learner.completedDays || {}).length;
                    const badgesCount = Object.keys(learner.unlockedBadges || {}).length;

                    return (
                      <tr key={learner.email || learner.uid} className="hover:bg-slate-50 transition-colors">
                        {/* Learner Profile */}
                        <td className="py-3 px-4 border-r border-slate-200">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={learner.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(learner.name || 'User')}&background=0A192F&color=fff`}
                              alt={learner.name}
                              className="w-8 h-8 rounded-full border border-slate-300 object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="font-bold text-[#0A192F] truncate">
                                {learner.name || 'SPSU Learner'}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                Reg: {learner.firstLogin ? new Date(learner.firstLogin).toLocaleDateString('en-IN') : 'N/A'}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Email & UID */}
                        <td className="py-3 px-4 border-r border-slate-200 font-mono text-[11px]">
                          <div className="text-[#1E3A8A] font-semibold truncate max-w-xs" title={learner.email}>
                            {learner.email}
                          </div>
                          <div className="text-[9px] text-slate-400 truncate max-w-xs" title={learner.uid}>
                            UID: {learner.uid}
                          </div>
                        </td>

                        {/* Last Login Attempt */}
                        <td className="py-3 px-4 border-r border-slate-200">
                          <div className="flex items-center gap-1.5 text-xs text-[#0A192F] font-medium">
                            <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{formatTimestamp(learner.lastLoginAttempt)}</span>
                          </div>
                        </td>

                        {/* Day 1 Pre Score */}
                        <td className="py-3 px-4 text-center border-r border-slate-200">
                          {pre1 !== undefined ? (
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono font-bold text-[11px] border ${
                                pre1 >= 80
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-rose-50 text-rose-800 border-rose-300'
                              }`}
                            >
                              <span>{pre1}%</span>
                              <span className="text-[9px] uppercase tracking-wider">
                                {pre1 >= 80 ? 'PASS' : 'RETAKE'}
                              </span>
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono text-[11px]">Not attempted</span>
                          )}
                        </td>

                        {/* Day 1 Post Score */}
                        <td className="py-3 px-4 text-center border-r border-slate-200">
                          {post1 !== undefined ? (
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono font-bold text-[11px] border ${
                                post1 >= 80
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-rose-50 text-rose-800 border-rose-300'
                              }`}
                            >
                              <span>{post1}%</span>
                              <span className="text-[9px] uppercase tracking-wider">
                                {post1 >= 80 ? 'PASS' : 'RETAKE'}
                              </span>
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono text-[11px]">Not attempted</span>
                          )}
                        </td>

                        {/* Completed Days */}
                        <td className="py-3 px-4 text-center border-r border-slate-200 font-mono font-bold text-[#0A192F]">
                          {completedDaysCount}/10
                        </td>

                        {/* Badges */}
                        <td className="py-3 px-4 text-center border-r border-slate-200">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 font-bold text-[11px]">
                            <Award className="w-3 h-3 text-amber-600" />
                            <span>{badgesCount}</span>
                          </span>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => setInspectedLearner(learner)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-[11px] font-bold transition-all cursor-pointer"
                          >
                            <span>Inspect</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Inspect Learner Detail Modal */}
      {inspectedLearner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/80 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border-2 border-[#0A192F] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-[#0A192F] text-white px-6 py-4 flex items-center justify-between border-b border-[#1E3A8A]">
              <div className="flex items-center gap-3">
                <img
                  src={inspectedLearner.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(inspectedLearner.name || 'User')}&background=fff&color=0A192F`}
                  alt={inspectedLearner.name}
                  className="w-10 h-10 rounded-full border border-white/30 object-cover"
                />
                <div>
                  <h3 className="text-base font-extrabold text-white">{inspectedLearner.name}</h3>
                  <div className="text-xs text-[#93C5FD] font-mono">{inspectedLearner.email}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInspectedLearner(null)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#1E3A8A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">First Registered</div>
                  <div className="font-bold text-[#0A192F] mt-0.5">{formatTimestamp(inspectedLearner.firstLogin)}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Last Login Attempt</div>
                  <div className="font-bold text-[#0A192F] mt-0.5">{formatTimestamp(inspectedLearner.lastLoginAttempt)}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Certificate ID</div>
                  <div className="font-bold text-[#1E3A8A] mt-0.5 font-mono">{inspectedLearner.certificateId || 'Pending'}</div>
                </div>
              </div>

              {/* 10-Day Pre and Post Score Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-[#0A192F]">
                  10-Day Assessment Scores Matrix (Pre & Post)
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC] text-slate-700 font-mono uppercase text-[10px] border-b border-slate-200">
                        <th className="py-2 px-3">Day</th>
                        <th className="py-2 px-3">Pre-Assessment (50 MCQs)</th>
                        <th className="py-2 px-3">Post-Assessment (50 MCQs)</th>
                        <th className="py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => {
                        const pre = inspectedLearner.preAssessmentScores?.[d];
                        const post = inspectedLearner.postAssessmentScores?.[d];
                        const completed = inspectedLearner.completedDays?.[d] || (inspectedLearner.preAssessmentPassed?.[d] && inspectedLearner.postAssessmentPassed?.[d]);

                        return (
                          <tr key={d} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3 font-bold text-[#0A192F]">Day {d}</td>
                            <td className="py-2.5 px-3">
                              {pre !== undefined ? (
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                                    pre >= 80
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                      : 'bg-rose-50 text-rose-800 border-rose-300'
                                  }`}
                                >
                                  <span>{pre}%</span>
                                  <span>({pre >= 80 ? 'PASSED ≥80%' : 'NEEDS RETAKE'})</span>
                                </span>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>
                            <td className="py-2.5 px-3">
                              {post !== undefined ? (
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                                    post >= 80
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                      : 'bg-rose-50 text-rose-800 border-rose-300'
                                  }`}
                                >
                                  <span>{post}%</span>
                                  <span>({post >= 80 ? 'PASSED ≥80%' : 'NEEDS RETAKE'})</span>
                                </span>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>
                            <td className="py-2.5 px-3">
                              {completed ? (
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>DAY COMPLETED (≥80%)</span>
                                </span>
                              ) : pre !== undefined || post !== undefined ? (
                                <span className="text-amber-700 font-bold">IN PROGRESS (&lt;80%)</span>
                              ) : (
                                <span className="text-slate-400">PENDING</span>
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

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setInspectedLearner(null)}
                className="px-4 py-2 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
