import React, { useState, useEffect, useRef } from 'react';
import { APTITUDE_50_QUESTIONS, AptitudeQuestion } from '../data/aptitudeAssessments50';
import { GoogleUser, UserProgress } from '../types';
import { syncLearnerProgress } from '../utils/learnerRegistry';
import { saveStoredProgress } from '../utils/storage';
import confetti from 'canvas-confetti';
import {
  AlertCircle,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Filter,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  X,
  XCircle,
  Zap,
} from 'lucide-react';

interface AptitudeAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: GoogleUser | null;
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const AptitudeAssessmentModal: React.FC<AptitudeAssessmentModalProps> = ({
  isOpen,
  onClose,
  user,
  progress,
  onUpdateProgress,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<'All' | 'Quantitative Aptitude' | 'Logical Reasoning' | 'Verbal & Analytical'>('All');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scorePercentage, setScorePercentage] = useState<number>(progress.aptitudeScore || 0);
  const [correctCount, setCorrectCount] = useState<number>(progress.aptitudeCorrectCount || 0);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(3600); // 60 mins

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && !isSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isSubmitted]);

  if (!isOpen) return null;

  // Filter questions by category if needed
  const filteredQuestions = activeCategory === 'All'
    ? APTITUDE_50_QUESTIONS
    : APTITUDE_50_QUESTIONS.filter((q) => q.category === activeCategory);

  const currentQuestion = filteredQuestions[currentIndex] || APTITUDE_50_QUESTIONS[0];

  const handleSelectOption = (qId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionIdx,
    }));
  };

  const toggleFlag = (qId: number) => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const handleSubmitTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Calculate score out of 50
    let correct = 0;
    APTITUDE_50_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct += 1;
      }
    });

    const percent = Math.round((correct / APTITUDE_50_QUESTIONS.length) * 100);
    const passed = percent >= 80;

    setCorrectCount(correct);
    setScorePercentage(percent);
    setIsSubmitted(true);

    if (passed) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }

    // Persist & sync to Firestore
    const updatedProgress: UserProgress = {
      ...progress,
      aptitudeScore: percent,
      aptitudeCorrectCount: correct,
      aptitudePassed: passed,
      aptitudeAttemptedAt: new Date().toISOString(),
    };

    onUpdateProgress(updatedProgress);
    saveStoredProgress(updatedProgress, user?.email);
    if (user) {
      syncLearnerProgress(user, updatedProgress);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setFlaggedIds(new Set());
    setIsSubmitted(false);
    setTimeLeftSeconds(3600);
    setCurrentIndex(0);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border-2 border-[#0A192F] shadow-2xl w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#0A192F] text-white p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#1E3A8A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black text-xl shadow-md">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Placement Aptitude Master Assessment (50 MCQs)
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  Cutoff: 80% (40/50)
                </span>
              </div>
              <p className="text-xs text-[#BFDBFE]">
                TCS NQT • Infosys DSE • Amazon • Cognizant • Kapil Speed Formulas & Shortcuts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 font-mono text-xs font-bold text-amber-300 border border-white/20">
                <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{formatTimer(timeLeftSeconds)}</span>
              </div>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8FAFC]">
          {isSubmitted ? (
            /* Result Summary View */
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300 py-4">
              <div
                className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl text-center space-y-4 ${
                  scorePercentage >= 80
                    ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-500 text-rose-950'
                }`}
              >
                <div
                  className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl shadow-md ${
                    scorePercentage >= 80
                      ? 'bg-emerald-500 text-white'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {scorePercentage >= 80 ? '🏆' : '⚠️'}
                </div>

                <div>
                  <span className="text-xs font-mono font-bold tracking-wider uppercase opacity-80 block">
                    Placement Aptitude Assessment Outcome
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-1">
                    {scorePercentage >= 80
                      ? 'BENCHMARK CLEARED — PLACEMENT READY!'
                      : 'BENCHMARK NOT MET — 80% REQUIRED'}
                  </h3>
                  <p className="text-xs sm:text-sm mt-1 max-w-md mx-auto opacity-90">
                    {scorePercentage >= 80
                      ? 'Congratulations! Your score satisfies the rigorous SPSU Placement Cell 80% passing cutoff for enterprise recruitment.'
                      : 'Mentor Kapil mandate: You must score at least 80% (40/50 correct) to earn verification. Review the solutions below and retake.'}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Correct</span>
                    <span className="text-xl font-black text-emerald-700 font-mono mt-0.5 block">
                      {correctCount} / 50
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Percentage</span>
                    <span className="text-xl font-black text-[#1E3A8A] font-mono mt-0.5 block">
                      {scorePercentage}%
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Status</span>
                    <span
                      className={`text-xs font-black font-mono mt-1.5 inline-block px-2 py-0.5 rounded-full ${
                        scorePercentage >= 80
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {scorePercentage >= 80 ? 'PASSED' : 'RETAKE'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0A192F] border border-slate-300 text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake 50-MCQ Test</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Review Step-by-Step Solutions & Kapil Shortcuts</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Active Test & Review View */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Question Card & Category Filter */}
              <div className="lg:col-span-8 space-y-4">
                {/* Category Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {(['All', 'Quantitative Aptitude', 'Logical Reasoning', 'Verbal & Analytical'] as const).map(
                    (cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setActiveCategory(cat);
                          setCurrentIndex(0);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                          activeCategory === cat
                            ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cat === 'All' ? 'All (50 Qs)' : cat}
                      </button>
                    )
                  )}
                </div>

                {/* Question Box */}
                <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
                  {/* Question Header */}
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1E3A8A] font-mono font-black text-sm flex items-center justify-center">
                        {currentQuestion.id}
                      </span>
                      <div>
                        <span className="text-xs font-extrabold text-[#0A192F] block">
                          {currentQuestion.category} • {currentQuestion.subtopic}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5">
                          {currentQuestion.targetCompanies.map((c) => (
                            <span
                              key={c}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFlag(currentQuestion.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                        flaggedIds.has(currentQuestion.id)
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>★</span>
                      <span>{flaggedIds.has(currentQuestion.id) ? 'Flagged' : 'Flag'}</span>
                    </button>
                  </div>

                  {/* Question Statement */}
                  <h4 className="text-sm sm:text-base font-bold text-[#0A192F] leading-relaxed">
                    {currentQuestion.question}
                  </h4>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {currentQuestion.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[currentQuestion.id] === oIdx;
                      const isCorrect = oIdx === currentQuestion.correctIndex;

                      let style = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                      if (isSubmitted) {
                        if (isCorrect) {
                          style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                        } else if (isSelected && !isCorrect) {
                          style = 'border-red-500 bg-red-50 text-red-950 line-through';
                        } else {
                          style = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                        }
                      } else if (isSelected) {
                        style = 'border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A] font-bold shadow-xs';
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectOption(currentQuestion.id, oIdx)}
                          className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${style}`}
                        >
                          <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {isSubmitted && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {isSubmitted && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Step-by-Step Solution & Kapil Shortcut (Displayed after submission) */}
                  {isSubmitted && (
                    <div className="space-y-3 pt-3 border-t border-slate-200 animate-in fade-in duration-300">
                      {/* Step by Step */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A192F]">
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                          <span>Step-by-Step Mathematical Derivation:</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-sans">
                          {currentQuestion.stepByStepSolution}
                        </p>
                      </div>

                      {/* Mentor Kapil Shortcut Trick */}
                      <div className="p-4 rounded-2xl bg-[#0A192F] text-white border-2 border-amber-400 space-y-1.5 shadow-md">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-amber-400 text-[#0A192F] font-black text-xs flex items-center justify-center">
                            K
                          </div>
                          <span className="text-xs font-bold text-amber-300">
                            Mentor Kapil 20-Second Speed Shortcut Formula:
                          </span>
                        </div>
                        <p className="text-xs text-[#BFDBFE] leading-relaxed font-sans pl-8">
                          {currentQuestion.mentorKapilShortcut}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation controls below question */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={currentIndex === 0}
                      onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A192F] text-xs font-bold transition-all cursor-pointer disabled:opacity-40 flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <span className="text-xs font-mono font-bold text-slate-500">
                      {currentIndex + 1} of {filteredQuestions.length}
                    </span>

                    <button
                      type="button"
                      disabled={currentIndex === filteredQuestions.length - 1}
                      onClick={() => setCurrentIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
                      className="px-4 py-2 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-40 flex items-center gap-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: 50-Question Palette & Final Submit */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#0A192F] uppercase tracking-wider">
                      Question Palette (50)
                    </span>
                    <span className="text-xs font-mono font-bold text-[#1E3A8A]">
                      {answeredCount}/50 Answered
                    </span>
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-emerald-500" />
                      <span>Answered ({answeredCount})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-slate-200" />
                      <span>Unanswered ({50 - answeredCount})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-amber-400" />
                      <span>Flagged ({flaggedIds.size})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded border-2 border-[#1E3A8A]" />
                      <span>Current</span>
                    </div>
                  </div>

                  {/* 1 to 50 Grid */}
                  <div className="grid grid-cols-5 gap-1.5 max-h-56 overflow-y-auto p-1">
                    {APTITUDE_50_QUESTIONS.map((q, idx) => {
                      const isAnsweredQ = selectedAnswers[q.id] !== undefined;
                      const isFlagged = flaggedIds.has(q.id);
                      const isCurrent = currentQuestion.id === q.id;

                      let btnBg = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                      if (isSubmitted) {
                        const isCorrect = selectedAnswers[q.id] === q.correctIndex;
                        btnBg = isCorrect
                          ? 'bg-emerald-500 text-white font-bold'
                          : 'bg-rose-500 text-white font-bold';
                      } else if (isAnsweredQ) {
                        btnBg = 'bg-emerald-600 text-white font-bold';
                      } else if (isFlagged) {
                        btnBg = 'bg-amber-400 text-[#0A192F] font-bold';
                      }

                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => {
                            const foundIdx = filteredQuestions.findIndex((fq) => fq.id === q.id);
                            if (foundIdx !== -1) {
                              setCurrentIndex(foundIdx);
                            } else {
                              setActiveCategory('All');
                              setCurrentIndex(q.id - 1);
                            }
                          }}
                          className={`h-8 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer border ${
                            isCurrent ? 'ring-2 ring-[#0A192F] ring-offset-1 border-[#0A192F]' : 'border-transparent'
                          } ${btnBg}`}
                        >
                          {q.id}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit Test Button */}
                  {!isSubmitted ? (
                    <button
                      type="button"
                      onClick={handleSubmitTest}
                      className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Aptitude Assessment</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRetake}
                      className="w-full py-3 rounded-2xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Retake Assessment</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 hidden sm:inline">
            Aptitude scores automatically update real-time across Learner Dashboard & Admin Dashboard.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer shadow-xs ml-auto"
          >
            Close Assessment
          </button>
        </div>
      </div>
    </div>
  );
};
