import React, { useState, useEffect, useRef } from 'react';
import { GoogleUser, UserProgress } from '../types';
import { SYSTEM_DESIGN_NOTES, SystemDesignSection } from '../data/systemDesignNotes';
import {
  SYSTEM_DESIGN_120_ASSESSMENTS,
  SystemDesignAssessmentQuestion,
} from '../data/systemDesign120Assessments';
import { PostmanSimulator } from './PostmanSimulator';
import {
  BookOpen,
  Send,
  Timer,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  FileCheck2,
  Download,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  Layers,
  ArrowLeft,
  Share2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  downloadSystemDesignBadgePNG,
  downloadSystemDesignBadgePDF,
  downloadSystemDesignCertificatePNG,
  downloadSystemDesignCertificatePDF,
} from '../utils/exportCredentials';

interface SystemDesignWorkspaceProps {
  user: GoogleUser | null;
  progress: UserProgress;
  onBackToPlanner: () => void;
  onRequireAuth: () => void;
  onSaveSystemDesignScore: (score: number, correctCount: number, passed: boolean) => void;
}

export const SystemDesignWorkspace: React.FC<SystemDesignWorkspaceProps> = ({
  user,
  progress,
  onBackToPlanner,
  onRequireAuth,
  onSaveSystemDesignScore,
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'postman' | 'assessment'>('notes');

  // Notes state
  const [selectedSectionId, setSelectedSectionId] = useState<string>(SYSTEM_DESIGN_NOTES[0].id);
  const [noteSearchQuery, setNoteSearchQuery] = useState<string>('');

  // Assessment state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isAssessmentSubmitted, setIsAssessmentSubmitted] = useState<boolean>(() => {
    return Boolean(progress.systemDesignAttemptedAt && progress.systemDesignPassed !== undefined);
  });
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(60 * 60); // 60 minutes
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [assessmentFilter, setAssessmentFilter] = useState<'all' | 'unanswered' | 'answered'>('all');

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeRemainingSeconds > 0 && !isAssessmentSubmitted) {
      interval = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmitAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeRemainingSeconds, isAssessmentSubmitted]);

  // Format timer MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Start assessment
  const handleStartAssessment = () => {
    if (!user) {
      onRequireAuth();
      return;
    }
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsAssessmentSubmitted(false);
    setTimeRemainingSeconds(60 * 60);
    setIsTimerRunning(true);
    setActiveTab('assessment');
  };

  // Submit assessment
  const handleSubmitAssessment = () => {
    setIsTimerRunning(false);
    setIsAssessmentSubmitted(true);

    let correct = 0;
    SYSTEM_DESIGN_120_ASSESSMENTS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    const percentage = Math.round((correct / SYSTEM_DESIGN_120_ASSESSMENTS.length) * 100);
    const passed = percentage >= 80; // strictly >= 80% (>= 96 / 120)

    onSaveSystemDesignScore(percentage, correct, passed);
  };

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    if (isAssessmentSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIndex,
    }));
  };

  const currentNote =
    SYSTEM_DESIGN_NOTES.find((n) => n.id === selectedSectionId) || SYSTEM_DESIGN_NOTES[0];

  const filteredNotes = SYSTEM_DESIGN_NOTES.filter(
    (n) =>
      n.title.toLowerCase().includes(noteSearchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(noteSearchQuery.toLowerCase()) ||
      n.tag.toLowerCase().includes(noteSearchQuery.toLowerCase())
  );

  // Score calculations
  const totalQuestions = SYSTEM_DESIGN_120_ASSESSMENTS.length; // 120
  const answeredCount = Object.keys(selectedAnswers).length;
  let correctCount = 0;
  if (isAssessmentSubmitted) {
    SYSTEM_DESIGN_120_ASSESSMENTS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) correctCount++;
    });
  } else if (progress.systemDesignCorrectCount !== undefined) {
    correctCount = progress.systemDesignCorrectCount;
  }
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = isAssessmentSubmitted ? scorePercent >= 80 : Boolean(progress.systemDesignPassed);

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="rounded-3xl bg-linear-to-r from-[#0A192F] via-[#112240] to-[#0A192F] border-2 border-[#1E3A8A] text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onBackToPlanner}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#081426] hover:bg-[#1E3A8A] text-xs font-bold font-mono text-[#BFDBFE] border border-[#1E3A8A] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to 10-Day Planner</span>
              </button>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-[#0A192F] text-xs font-mono font-black shadow-xs">
                ★ SPECIAL EDITION
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-bold">
                107-Slide Case Study Aligned
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              System Design Masterclass & Real API Lab
            </h1>

            <p className="text-sm sm:text-base text-[#BFDBFE] leading-relaxed">
              Exhaustive placement-focused architecture: Production outage post-mortems (Instagram, Meta, WhatsApp, Twitter), end-to-end Gmail design (Anycast, GFE, Spanner, 30s Undo Send queue), interactive Postman IDE simulations, and a 60-Minute 120-MCQ Assessment for the <strong>System Design Architect</strong> Badge & Certificate.
            </p>
          </div>

          {/* Quick Metrics / Status Card */}
          <div className="shrink-0 p-4 rounded-2xl bg-[#081426]/90 border border-[#1E3A8A] text-center min-w-[200px] flex flex-col justify-center items-center">
            <div className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              Assessment Status
            </div>
            {isPassed ? (
              <div className="mt-1 space-y-1">
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {scorePercent}% PASS
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Credential Unlocked</span>
                </div>
              </div>
            ) : progress.systemDesignAttemptedAt ? (
              <div className="mt-1 space-y-1">
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {scorePercent}% (Cutoff 80%)
                </div>
                <div className="text-[10px] text-amber-300">Retake available anytime</div>
              </div>
            ) : (
              <div className="mt-1 space-y-1">
                <div className="text-xl font-black text-white font-mono">120 MCQs</div>
                <div className="text-[10px] text-slate-400">60 Min • Cutoff 80%</div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-[#1E3A8A]">
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'notes'
                ? 'bg-white text-[#0A192F] shadow-md font-extrabold'
                : 'bg-[#112240] hover:bg-[#1E3A8A] text-[#BFDBFE]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Placement Notes & Architecture ({SYSTEM_DESIGN_NOTES.length} Sections)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('postman')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'postman'
                ? 'bg-amber-400 text-[#0A192F] shadow-md font-black'
                : 'bg-[#112240] hover:bg-[#1E3A8A] text-[#BFDBFE]'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Postman IDE & Real API Testing Lab</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('assessment')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'assessment'
                ? 'bg-white text-[#0A192F] shadow-md font-extrabold'
                : 'bg-[#112240] hover:bg-[#1E3A8A] text-[#BFDBFE]'
            }`}
          >
            <Timer className="w-4 h-4 text-amber-400" />
            <span>60-Min 120-MCQ Assessment</span>
            {isPassed && <span className="text-[10px] text-emerald-400 font-bold">✓</span>}
          </button>
        </div>
      </div>

      {/* TAB 1: PLACEMENT NOTES & ARCHITECTURE */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Notes Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-4 rounded-2xl bg-[#081426] border border-[#1E3A8A] text-white space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search architecture notes..."
                  value={noteSearchQuery}
                  onChange={(e) => setNoteSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#0A192F] border border-[#1E3A8A] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="text-[11px] font-mono text-[#93C5FD] font-bold">
                107-Slide Curriculum Modules ({filteredNotes.length})
              </div>

              <div className="space-y-1.5 max-h-[600px] overflow-y-auto custom-scrollbar pr-1">
                {filteredNotes.map((note) => {
                  const isSelected = note.id === selectedSectionId;
                  return (
                    <button
                      key={note.id}
                      type="button"
                      onClick={() => setSelectedSectionId(note.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#1E3A8A] text-white border-amber-400 shadow-sm'
                          : 'bg-[#0A192F] hover:bg-[#112240] text-[#BFDBFE] border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#081426] text-amber-300">
                          {note.tag}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{note.readTime}</span>
                      </div>
                      <div className="text-xs font-bold leading-tight line-clamp-2">{note.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Note Deep-Dive Content */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-3xl bg-white border-2 border-[#0A192F] p-6 sm:p-8 shadow-sm space-y-6 text-[#0A192F]">
              {/* Note Header */}
              <div className="space-y-2 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1E3A8A] text-[#BFDBFE] text-xs font-mono font-bold">
                    {currentNote.tag}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Estimated Read: {currentNote.readTime}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0A192F]">
                  {currentNote.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {currentNote.summary}
                </p>
              </div>

              {/* Core Bullet Points */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                <h3 className="text-xs font-mono font-bold text-[#1E3A8A] uppercase">
                  Key Architectural Concepts:
                </h3>
                <ul className="space-y-1.5">
                  {currentNote.bulletPoints.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Markdown Body */}
              <div className="prose prose-sm max-w-none text-slate-800">
                <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed font-sans bg-[#F1F5F9] p-5 rounded-2xl border border-slate-200 font-mono text-slate-900 overflow-x-auto">
                  {currentNote.deepDiveMarkdown}
                </div>
              </div>

              {/* Placement Interview Tips & FAANG Questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#1E3A8A] space-y-2">
                  <div className="flex items-center gap-2 text-[#0A192F] font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Kapil Mentor Placement Tips</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {currentNote.interviewTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#FDF4FF] border border-purple-300 space-y-2">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
                    <Layers className="w-4 h-4 text-purple-600" />
                    <span>Actual FAANG Interview Questions</span>
                  </div>
                  <ul className="space-y-1 text-xs text-purple-900">
                    {currentNote.faangQuestionExamples.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 italic">
                        <span className="text-purple-600 font-bold">Q:</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: POSTMAN IDE SIMULATOR */}
      {activeTab === 'postman' && (
        <div className="space-y-4">
          <PostmanSimulator />
        </div>
      )}

      {/* TAB 3: 60-MIN 120-MCQ ASSESSMENT */}
      {activeTab === 'assessment' && (
        <div className="space-y-6">
          {/* Assessment Header Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#081426] border-2 border-[#1E3A8A] text-white flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-[#0A192F] flex items-center justify-center font-black text-xl">
                ⏱
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-300">
                    OFFICIAL POST-ASSESSMENT
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  60-Minute System Design Placement Assessment (Cutoff 80%)
                </h3>
              </div>
            </div>

            {/* Timer and Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-[#0A192F] border border-[#1E3A8A] flex items-center gap-2">
                <Timer
                  className={`w-4 h-4 ${
                    timeRemainingSeconds < 300 ? 'text-rose-400 animate-pulse' : 'text-amber-400'
                  }`}
                />
                <span
                  className={`font-mono text-sm font-black ${
                    timeRemainingSeconds < 300 ? 'text-rose-400' : 'text-white'
                  }`}
                >
                  {formatTime(timeRemainingSeconds)}
                </span>
              </div>

              {!isAssessmentSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitAssessment}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0A192F] font-black text-xs transition-colors cursor-pointer shadow-sm"
                >
                  Submit Assessment ({answeredCount}/{totalQuestions})
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStartAssessment}
                  className="px-4 py-2 rounded-xl bg-[#1E3A8A] hover:bg-[#2563EB] text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
              )}
            </div>
          </div>

          {/* Submission Result Banner */}
          {isAssessmentSubmitted && (
            <div
              className={`p-6 rounded-3xl border-2 ${
                isPassed
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                  : 'bg-amber-50 border-amber-500 text-amber-950'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 ${
                      isPassed ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                    }`}
                  >
                    {isPassed ? '🏆' : '⚠️'}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">
                        {isPassed ? 'Benchmark Achieved (≥ 80%)' : 'Benchmark Not Met (< 80%)'}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black">
                      Score: {scorePercent}% ({correctCount} / {totalQuestions} Correct)
                    </h2>
                    <p className="text-xs text-slate-700">
                      {isPassed
                        ? 'Congratulations! You have demonstrated exceptional mastery over distributed architectures and unlocked the System Design Architect Badge and Certificate.'
                        : 'The placement benchmark requires 80% (at least 96 correct out of 120). Review the detailed explanations below and retake the assessment.'}
                    </p>
                  </div>
                </div>

                {isPassed && (
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        downloadSystemDesignBadgePNG(
                          user,
                          scorePercent,
                          progress.systemDesignBadgeUnlockedAt || new Date().toISOString()
                        )
                      }
                      className="px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Download Badge (PNG)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        downloadSystemDesignCertificatePNG(
                          user!,
                          scorePercent,
                          correctCount,
                          progress.systemDesignCertificateIssuedAt || new Date().toISOString()
                        )
                      }
                      className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0A192F] font-black text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <FileCheck2 className="w-4 h-4 text-[#0A192F]" />
                      <span>Download Certificate (PNG)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Assessment Main Grid: Question Content + Question Navigator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Active Question Display */}
            <div className="lg:col-span-8 space-y-4">
              {(() => {
                const q = SYSTEM_DESIGN_120_ASSESSMENTS[currentQuestionIndex];
                const selectedOpt = selectedAnswers[currentQuestionIndex];
                const isAnswered = selectedOpt !== undefined;

                return (
                  <div className="rounded-3xl bg-white border-2 border-[#0A192F] p-6 sm:p-8 shadow-sm space-y-5 text-[#0A192F]">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1E3A8A] text-[#BFDBFE] text-xs font-mono font-bold">
                        {q.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        Q{currentQuestionIndex + 1} / {totalQuestions}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0A192F] leading-snug">
                      {q.question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        let optionStyle =
                          'border-slate-200 bg-[#F8FAFC] text-slate-800 hover:bg-slate-100 hover:border-slate-300';

                        if (isAssessmentSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                          } else if (isChosen && optIdx !== q.correctIndex) {
                            optionStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                          }
                        } else if (isChosen) {
                          optionStyle = 'border-[#0A192F] bg-[#EFF6FF] text-[#0A192F] font-bold shadow-xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={isAssessmentSubmitted}
                            onClick={() => handleSelectAnswer(currentQuestionIndex, optIdx)}
                            className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                          >
                            <span
                              className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-black shrink-0 ${
                                isChosen ? 'bg-[#0A192F] text-white' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="text-xs sm:text-sm pt-0.5 leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation after submission */}
                    {isAssessmentSubmitted && (
                      <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#1E3A8A] text-xs text-slate-800 space-y-1">
                        <div className="font-bold text-[#0A192F] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Detailed Architectural Rationale:</span>
                        </div>
                        <p className="leading-relaxed pl-5.5">{q.explanation}</p>
                      </div>
                    )}

                    {/* Prev / Next Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                      <button
                        type="button"
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>

                      <button
                        type="button"
                        disabled={currentQuestionIndex === totalQuestions - 1}
                        onClick={() =>
                          setCurrentQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1))
                        }
                        className="px-4 py-2 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 120-Question Grid Navigator */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-3xl bg-[#081426] border-2 border-[#1E3A8A] text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono font-bold text-white">
                    Questions Navigator (1 – 120)
                  </div>
                  <div className="text-[11px] font-mono text-amber-300 font-bold">
                    {answeredCount} / {totalQuestions} Answered
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#0A192F] h-2 rounded-full overflow-hidden border border-[#1E3A8A]">
                  <div
                    className="bg-amber-400 h-full transition-all duration-300"
                    style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                  />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-6 gap-1.5 max-h-96 overflow-y-auto custom-scrollbar p-1">
                  {SYSTEM_DESIGN_120_ASSESSMENTS.map((q, idx) => {
                    const isAnswered = selectedAnswers[idx] !== undefined;
                    const isCurrent = currentQuestionIndex === idx;
                    let btnStyle = 'bg-[#0A192F] text-slate-300 hover:bg-[#112240]';

                    if (isAssessmentSubmitted) {
                      const isCorrect = selectedAnswers[idx] === q.correctIndex;
                      btnStyle = isCorrect
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-rose-600 text-white font-bold';
                    } else if (isCurrent) {
                      btnStyle = 'bg-amber-400 text-[#0A192F] font-black ring-2 ring-white';
                    } else if (isAnswered) {
                      btnStyle = 'bg-[#1E3A8A] text-white font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`h-8 rounded-lg text-[11px] font-mono flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="text-[10px] text-slate-400 flex flex-wrap items-center gap-3 pt-2 border-t border-[#1E3A8A]">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block" /> Current
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-[#1E3A8A] inline-block" /> Answered
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-[#0A192F] border border-slate-600 inline-block" /> Pending
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
