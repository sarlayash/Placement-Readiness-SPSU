import React, { useState, useMemo } from 'react';
import {
  INDUSTRY_DSA_SCENARIOS_100,
  IndustryScenarioQuizItem,
} from '../data/industryDsaPatterns100';
import { GoogleUser, UserProgress } from '../types';
import { syncLearnerProgress } from '../utils/learnerRegistry';
import { saveStoredProgress } from '../utils/storage';
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Flame,
  HelpCircle,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  X,
  XCircle,
  Zap,
} from 'lucide-react';

interface IndustryPatternQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: GoogleUser | null;
  progress?: UserProgress;
  onUpdateProgress?: (updated: UserProgress) => void;
}

export const IndustryPatternQuizModal: React.FC<IndustryPatternQuizModalProps> = ({
  isOpen,
  onClose,
  user,
  progress,
  onUpdateProgress,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSummary, setShowSummary] = useState<boolean>(false);

  // Filtered Scenarios
  const filteredScenarios = useMemo(() => {
    return INDUSTRY_DSA_SCENARIOS_100.filter((item) => {
      const matchesDomain = selectedDomain === 'All' || item.domain === selectedDomain;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.company.toLowerCase().includes(q) ||
        item.scenarioTitle.toLowerCase().includes(q) ||
        item.scenarioDescription.toLowerCase().includes(q) ||
        item.correctPattern.toLowerCase().includes(q);
      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, searchQuery]);

  const activeScenario = filteredScenarios[currentIndex] || filteredScenarios[0] || INDUSTRY_DSA_SCENARIOS_100[0];

  // Stats calculation
  const totalAttempted = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).filter(
    ([id, ansIdx]) => {
      const sc = INDUSTRY_DSA_SCENARIOS_100.find((s) => s.id === Number(id));
      return sc && sc.correctIndex === ansIdx;
    }
  ).length;

  const scorePercentage = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

  // Streak Calculation
  const currentStreak = useMemo(() => {
    let streak = 0;
    for (let i = currentIndex; i >= 0; i--) {
      const item = filteredScenarios[i];
      if (item && selectedAnswers[item.id] !== undefined) {
        if (selectedAnswers[item.id] === item.correctIndex) {
          streak++;
        } else {
          break;
        }
      }
    }
    return streak;
  }, [currentIndex, selectedAnswers, filteredScenarios]);

  if (!isOpen) return null;

  const domains = [
    'All',
    'Streaming & Media',
    'Ride-Sharing & Mobility',
    'Logistics & Warehousing',
    'Fintech & Trading',
    'Cloud & Infrastructure',
    'Social & Messaging',
    'E-Commerce',
    'Search & Gaming',
  ];

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[activeScenario.id] !== undefined) return; // Locked once answered
    const nextAnswers = {
      ...selectedAnswers,
      [activeScenario.id]: optionIndex,
    };
    setSelectedAnswers(nextAnswers);

    // Sync score to progress and Firebase
    if (progress && onUpdateProgress) {
      const nextAttempted = Object.keys(nextAnswers).length;
      const nextCorrect = Object.entries(nextAnswers).filter(([id, ansIdx]) => {
        const sc = INDUSTRY_DSA_SCENARIOS_100.find((s) => s.id === Number(id));
        return sc && sc.correctIndex === ansIdx;
      }).length;
      const nextPct = nextAttempted > 0 ? Math.round((nextCorrect / nextAttempted) * 100) : 0;
      const updated: UserProgress = {
        ...progress,
        patternQuizScore: nextPct,
        patternQuizCompleted: nextAttempted >= 10,
      };
      onUpdateProgress(updated);
      saveStoredProgress(updated, user?.email);
      if (user) {
        syncLearnerProgress(user, updated);
      }
    }
  };

  const handleResetQuiz = () => {
    if (window.confirm('Reset all answers and restart the 100-scenario quiz?')) {
      setSelectedAnswers({});
      setCurrentIndex(0);
      setShowSummary(false);
    }
  };

  const isCurrentAnswered = selectedAnswers[activeScenario.id] !== undefined;
  const userAnswer = selectedAnswers[activeScenario.id];
  const isCurrentCorrect = isCurrentAnswered && userAnswer === activeScenario.correctIndex;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/90 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white border-2 border-[#0A192F] shadow-2xl overflow-hidden flex flex-col max-h-[94vh] my-auto">
        {/* Top Header */}
        <div className="bg-[#0A192F] text-white px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b-2 border-[#1E3A8A] shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-mono font-bold">
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                <span>100 INDUSTRY SCENARIOS • DSA PATTERN QUIZ</span>
              </span>
              <span className="text-xs font-mono text-[#93C5FD]">
                Mentorship By Kapil • SPSU Udaipur
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              Real-World Pattern Identification Master Quiz
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Live Score Badge */}
            <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-[#112240] border border-[#1E3A8A]">
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono text-[#93C5FD]">Mastery Score</div>
                <div className="text-sm font-black text-white">
                  {correctCount} / {totalAttempted} ({scorePercentage}%)
                </div>
              </div>
              {currentStreak > 1 && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-400/40">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{currentStreak} Streak</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1E3A8A] transition-colors cursor-pointer"
              title="Close Quiz"
              aria-label="Close Quiz"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#F8FAFC] border-b border-slate-200 px-5 sm:px-8 py-3 shrink-0 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
          {/* Domain Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
            {domains.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setSelectedDomain(d);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDomain === d
                    ? 'bg-[#0A192F] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative shrink-0 md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Search company, problem, pattern..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:outline-none focus:border-[#1E3A8A]"
            />
          </div>
        </div>

        {/* Question Selector Quick-Bar (1..100) */}
        <div className="bg-slate-100 border-b border-slate-200 px-5 sm:px-8 py-2 overflow-x-auto no-scrollbar shrink-0 flex items-center gap-1.5">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase mr-1 shrink-0">
            Jump ({filteredScenarios.length}):
          </span>
          {filteredScenarios.map((item, idx) => {
            const isAnswered = selectedAnswers[item.id] !== undefined;
            const isCorrect = isAnswered && selectedAnswers[item.id] === item.correctIndex;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold shrink-0 transition-all cursor-pointer flex items-center justify-center border ${
                  isCurrent
                    ? 'ring-2 ring-[#0A192F] scale-105 z-10 font-black'
                    : ''
                } ${
                  !isAnswered
                    ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-200'
                    : isCorrect
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-rose-600 text-white border-rose-700'
                }`}
                title={`#${item.id} - ${item.company}: ${item.scenarioTitle}`}
              >
                {item.id}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {filteredScenarios.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="text-base font-bold text-slate-700">No scenarios match your search filter.</div>
              <p className="text-xs text-slate-500">Try clearing the search query or selecting "All" domains.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDomain('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-[#0A192F] text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Question Header Card */}
              <div className="rounded-2xl border-2 border-slate-300 p-5 sm:p-6 bg-white shadow-xs space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-[#0A192F] text-white font-mono font-black text-xs">
                      Scenario #{activeScenario.id} of 100
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1E3A8A] border border-blue-200 text-xs font-bold font-mono">
                      {activeScenario.company}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-medium">
                      {activeScenario.domain}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-slate-500">
                    Question {currentIndex + 1} of {filteredScenarios.length} in view
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-black text-[#0A192F]">
                    {activeScenario.scenarioTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {activeScenario.scenarioDescription}
                  </p>
                </div>

                {/* Constraints & Scale Box */}
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 text-xs text-amber-950 flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold uppercase text-[10px] text-amber-800 tracking-wider">
                      SCALE & CONSTRAINT BOUNDS:
                    </span>
                    <div className="font-mono text-xs font-semibold mt-0.5">
                      {activeScenario.constraintsAndScale}
                    </div>
                  </div>
                </div>
              </div>

              {/* Options Section */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold uppercase text-[#0A192F] flex items-center justify-between">
                  <span>Which DSA Algorithmic Pattern Solves this Problem Optimally?</span>
                  {isCurrentAnswered && (
                    <span
                      className={`inline-flex items-center gap-1 font-bold ${
                        isCurrentCorrect ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {isCurrentCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Correct Pattern! (+1 Point)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Incorrect Selection</span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeScenario.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    const isCorrectChoice = optIdx === activeScenario.correctIndex;

                    let btnStyle = 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800';

                    if (isCurrentAnswered) {
                      if (isCorrectChoice) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-xs ring-2 ring-emerald-500/20';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-bold';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(optIdx)}
                        disabled={isCurrentAnswered}
                        className={`p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-slate-100 text-[#0A192F] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-slate-300">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isCurrentAnswered && isCorrectChoice && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isCurrentAnswered && isSelected && !isCorrectChoice && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Kapil Mentor Explanation Banner (Revealed upon answering) */}
              {isCurrentAnswered && (
                <div className="rounded-2xl border-2 border-emerald-500 bg-white p-5 sm:p-6 shadow-sm space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3 flex-wrap">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold font-mono text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>OFFICIAL PATTERN SOLUTION • MENTOR KAPIL</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono font-bold">
                      <span className="text-slate-600">
                        Time: <strong className="text-emerald-700">{activeScenario.timeComplexity}</strong>
                      </span>
                      <span>•</span>
                      <span className="text-slate-600">
                        Space: <strong className="text-blue-700">{activeScenario.spaceComplexity}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {activeScenario.kapilPatternInsight}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Navigation & Controls */}
        <div className="bg-[#0A192F] text-white px-5 sm:px-8 py-4 border-t-2 border-[#1E3A8A] shrink-0 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentIndex((idx) => Math.min(filteredScenarios.length - 1, idx + 1))}
              disabled={currentIndex >= filteredScenarios.length - 1}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#112240] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleResetQuiz}
              className="p-2 rounded-xl bg-[#112240] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
              title="Reset Quiz Progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs font-mono text-[#BFDBFE] hidden md:block">
            Score: <strong className="text-emerald-300">{correctCount}</strong> / {totalAttempted} ({scorePercentage}%)
            {' • '}Total Scenarios: {INDUSTRY_DSA_SCENARIOS_100.length}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#0A192F] text-xs font-black transition-all cursor-pointer shadow-md"
          >
            Close Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
