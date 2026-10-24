import React, { useState, useRef, useEffect } from 'react';
import { STRESS_WHEEL_25_QUESTIONS, StressWheelQuestion } from '../data/stressWheelQuiz25';
import { UserProgress, GoogleUser } from '../types';
import { syncLearnerProgress } from '../utils/learnerRegistry';
import { saveStoredProgress } from '../utils/storage';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Compass,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCw,
  Share2,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  XCircle,
  Zap,
} from 'lucide-react';

interface SpinningWheelQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: GoogleUser | null;
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

const SECTOR_COLORS = [
  '#1E3A8A', '#0D9488', '#D97706', '#DC2626', '#7C3AED',
  '#2563EB', '#059669', '#B45309', '#E11D48', '#6D28D9',
  '#3B82F6', '#10B981', '#F59E0B', '#F43F5E', '#8B5CF6',
  '#1D4ED8', '#047857', '#92400E', '#BE123C', '#5B21B6',
  '#60A5FA', '#34D399', '#FBBF24', '#FB7185', '#A78BFA',
];

export const SpinningWheelQuizModal: React.FC<SpinningWheelQuizModalProps> = ({
  isOpen,
  onClose,
  user,
  progress,
  onUpdateProgress,
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = useState<StressWheelQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [answeredIds, setAnsweredIds] = useState<Set<number>>(new Set());
  const [correctCount, setCorrectCount] = useState<number>(progress.stressQuizScore || 0);

  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (progress.stressQuizScore !== undefined) {
      setCorrectCount(progress.stressQuizScore);
    }
  }, [progress.stressQuizScore]);

  // Audio synthesize click tick
  const playTickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio not permitted or supported
    }
  };

  const playSuccessSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Ignore
    }
  };

  if (!isOpen) return null;

  const totalQuestions = STRESS_WHEEL_25_QUESTIONS.length;
  const degreesPerSector = 360 / totalQuestions;

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setActiveQuestion(null);
    setSelectedOption(null);
    setIsAnswered(false);

    // Random landing index
    const randomIndex = Math.floor(Math.random() * totalQuestions);
    const extraSpins = 5 + Math.floor(Math.random() * 4); // 5 to 8 full rotations
    // The pointer is at top (270 degrees in canvas or 0 degrees at top).
    // Let's compute angle so pointer points directly to randomIndex
    const targetSectorAngle = (totalQuestions - randomIndex - 0.5) * degreesPerSector;
    const finalRotation = rotation + (extraSpins * 360) + (targetSectorAngle - (rotation % 360));

    // Play ticking simulation
    let ticks = 0;
    const tickInterval = setInterval(() => {
      ticks++;
      playTickSound();
      if (ticks > 24) clearInterval(tickInterval);
    }, 120);

    setRotation(finalRotation);

    setTimeout(() => {
      clearInterval(tickInterval);
      setIsSpinning(false);
      const landedQuestion = STRESS_WHEEL_25_QUESTIONS[randomIndex];
      setActiveQuestion(landedQuestion);
      playSuccessSound();
    }, 4000);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !activeQuestion) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === activeQuestion.correctIndex;
    const newAnswered = new Set(answeredIds);
    newAnswered.add(activeQuestion.id);
    setAnsweredIds(newAnswered);

    let newCorrect = correctCount;
    if (isCorrect) {
      newCorrect += 1;
      setCorrectCount(newCorrect);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      playSuccessSound();
    }

    // Save progress & sync to Firebase Firestore
    const updatedProgress: UserProgress = {
      ...progress,
      stressQuizScore: newCorrect,
      stressQuizAnswered: newAnswered.size,
      stressQuizCompleted: newAnswered.size >= 10,
      stressQuizAttemptedAt: new Date().toISOString(),
    };

    onUpdateProgress(updatedProgress);
    saveStoredProgress(updatedProgress, user?.email);
    if (user) {
      syncLearnerProgress(user, updatedProgress);
    }
  };

  const handleDirectSelect = (q: StressWheelQuestion) => {
    if (isSpinning) return;
    setActiveQuestion(q);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border-2 border-[#0A192F] shadow-2xl w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#0A192F] text-white p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#1E3A8A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#0A192F] flex items-center justify-center font-black text-xl shadow-md">
              🎡
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Spinning Wheel: B-Tech & Placement Stress Buster Quiz
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  25 Hilarious Scenarios + Kapil Mentorship
                </span>
              </div>
              <p className="text-xs text-[#BFDBFE]">
                Spin the wheel • Decode engineering anxiety • Learn high-EQ career lessons from Mentor Kapil
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
              title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8FAFC]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Interactive Wheel Canvas */}
            <div className="lg:col-span-6 flex flex-col items-center">
              {/* Scorecard Strip */}
              <div className="w-full bg-white p-3 rounded-2xl border border-slate-200 shadow-xs mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Resilience Score</span>
                  <span className="text-xl font-black text-[#1E3A8A] font-mono">
                    {correctCount} / 25
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Scenarios Explored</span>
                  <span className="text-xs font-bold text-slate-700 font-mono">
                    {answeredIds.size} of 25 answered
                  </span>
                </div>
              </div>

              {/* Wheel Container */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 my-2 select-none">
                {/* Pointer Arrow at 12 o'clock */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-amber-400 filter drop-shadow-md" />

                {/* Rotating SVG Wheel */}
                <div
                  className="w-full h-full rounded-full shadow-2xl border-4 border-[#0A192F] overflow-hidden transition-transform duration-[4000ms] ease-[cubic-bezier(0.15,0.9,0.25,1)]"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    {STRESS_WHEEL_25_QUESTIONS.map((q, idx) => {
                      const startAngle = idx * degreesPerSector;
                      const endAngle = (idx + 1) * degreesPerSector;
                      const startRad = ((startAngle - 90) * Math.PI) / 180;
                      const endRad = ((endAngle - 90) * Math.PI) / 180;

                      const x1 = 200 + 195 * Math.cos(startRad);
                      const y1 = 200 + 195 * Math.sin(startRad);
                      const x2 = 200 + 195 * Math.cos(endRad);
                      const y2 = 200 + 195 * Math.sin(endRad);

                      const midAngle = startAngle + degreesPerSector / 2;
                      const midRad = ((midAngle - 90) * Math.PI) / 180;
                      const textX = 200 + 130 * Math.cos(midRad);
                      const textY = 200 + 130 * Math.sin(midRad);

                      const color = SECTOR_COLORS[idx % SECTOR_COLORS.length];

                      return (
                        <g key={q.id}>
                          <path
                            d={`M 200 200 L ${x1} ${y1} A 195 195 0 0 1 ${x2} ${y2} Z`}
                            fill={color}
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                          />
                          <text
                            x={textX}
                            y={textY}
                            fill="#FFFFFF"
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                          >
                            {q.id}. {q.segmentTitle.substring(0, 11)}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Center Spin Button Hub */}
                <button
                  type="button"
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0A192F] border-4 border-amber-400 text-amber-300 font-black text-xs sm:text-sm tracking-wider flex flex-col items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer z-10 disabled:opacity-80"
                >
                  <RotateCw className={`w-5 h-5 mb-1 ${isSpinning ? 'animate-spin text-amber-400' : ''}`} />
                  <span>{isSpinning ? 'SPINNING' : 'SPIN WHEEL'}</span>
                </button>
              </div>

              {/* Action Buttons below wheel */}
              <div className="flex items-center gap-3 mt-3 w-full justify-center">
                <button
                  type="button"
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="px-6 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-[#2563EB] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>{isSpinning ? 'Wheel is Rotating...' : 'Spin Random Scenario'}</span>
                </button>
              </div>

              {/* Quick Jump 1 to 25 Drawer */}
              <div className="mt-4 w-full bg-white p-3 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-2">
                  Jump to Any of 25 B-Tech Stress Scenarios:
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {STRESS_WHEEL_25_QUESTIONS.map((q) => {
                    const isCurrent = activeQuestion?.id === q.id;
                    const isDone = answeredIds.has(q.id);
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => handleDirectSelect(q)}
                        className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                          isCurrent
                            ? 'bg-amber-400 text-[#0A192F] border-amber-500 shadow-sm'
                            : isDone
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                        title={`${q.id}. ${q.segmentTitle}`}
                      >
                        {q.id}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Question & Mentor Kapil Learning Modal */}
            <div className="lg:col-span-6">
              {activeQuestion ? (
                <div className="bg-white rounded-3xl border-2 border-[#1E3A8A] shadow-md p-5 space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  {/* Scenario Badge */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1E3A8A] border border-[#BFDBFE] font-mono text-xs font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Scenario {activeQuestion.id} of 25: {activeQuestion.theme}</span>
                    </span>

                    <span className="text-xs font-bold text-slate-500">
                      {activeQuestion.segmentTitle}
                    </span>
                  </div>

                  {/* Question Scenario */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <h4 className="text-sm sm:text-base font-extrabold text-[#0A192F] leading-snug">
                      "{activeQuestion.question}"
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {activeQuestion.options.map((opt, oIdx) => {
                      const isSelected = selectedOption === oIdx;
                      const isCorrect = oIdx === activeQuestion.correctIndex;

                      let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'border-red-500 bg-red-50 text-red-900 line-through';
                        } else {
                          btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                        }
                      } else if (isSelected) {
                        btnStyle = 'border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A] font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectOption(oIdx)}
                          disabled={isAnswered}
                          className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 text-xs leading-relaxed ${btnStyle}`}
                        >
                          <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {isAnswered && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {isAnswered && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Mentor Kapil Wisdom Box (Revealed when answered) */}
                  {isAnswered && (
                    <div className="space-y-3 pt-2 animate-in fade-in duration-300">
                      {/* Result Alert */}
                      <div
                        className={`p-3 rounded-2xl flex items-center gap-2.5 border text-xs font-bold ${
                          selectedOption === activeQuestion.correctIndex
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : 'bg-amber-50 border-amber-300 text-amber-900'
                        }`}
                      >
                        {selectedOption === activeQuestion.correctIndex ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Spot on! You chose the high-EQ engineering answer (+1 Resilience Point).</span>
                          </>
                        ) : (
                          <>
                            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>Understandable instinct! Here is the resilient senior engineer approach:</span>
                          </>
                        )}
                      </div>

                      {/* Mentor Kapil Wisdom Card */}
                      <div className="bg-[#0A192F] text-white p-4 sm:p-5 rounded-2xl border-2 border-amber-400 space-y-3 shadow-md">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                          <div className="w-7 h-7 rounded-lg bg-amber-400 text-[#0A192F] flex items-center justify-center font-black text-xs">
                            K
                          </div>
                          <div>
                            <strong className="text-xs text-amber-300 font-bold block">
                              Hidden Meaning & Learning from Mentor Kapil
                            </strong>
                            <span className="text-[10px] text-slate-300">
                              Engineering Mindset & Career Reality
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-amber-400 font-bold block text-[11px] mb-0.5">
                              1. The Hidden Reality:
                            </span>
                            <p className="text-slate-200 leading-relaxed font-sans">
                              {activeQuestion.mentorKapilWisdom.hiddenMeaning}
                            </p>
                          </div>

                          <div>
                            <span className="text-emerald-400 font-bold block text-[11px] mb-0.5">
                              2. Senior Engineering Takeaway:
                            </span>
                            <p className="text-slate-200 leading-relaxed font-sans">
                              {activeQuestion.mentorKapilWisdom.engineeringTakeaway}
                            </p>
                          </div>

                          <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                            <span className="text-cyan-300 font-bold block text-[10px] uppercase font-mono mb-0.5">
                              Daily Actionable Habit:
                            </span>
                            <p className="text-[#BFDBFE] text-[11px] font-sans">
                              "{activeQuestion.mentorKapilWisdom.actionableHabit}"
                            </p>
                          </div>
                        </div>

                        {/* Fun Reliever */}
                        <div className="text-[11px] text-amber-200 italic pt-1 border-t border-white/10 flex items-center gap-1.5">
                          <span>💡</span>
                          <span>{activeQuestion.funStressReliever}</span>
                        </div>
                      </div>

                      {/* Next Spin button */}
                      <div className="flex items-center justify-between gap-3 pt-2">
                        <button
                          type="button"
                          onClick={handleSpin}
                          className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                        >
                          <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                          <span>Spin Next Question</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const nextId = (activeQuestion.id % 25) + 1;
                            const nextQ = STRESS_WHEEL_25_QUESTIONS.find((q) => q.id === nextId);
                            if (nextQ) handleDirectSelect(nextQ);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <span>Next (Q{activeQuestion.id === 25 ? 1 : activeQuestion.id + 1})</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full min-h-[360px] bg-white rounded-3xl border-2 border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl shadow-sm">
                    🎡
                  </div>
                  <div className="max-w-sm">
                    <h4 className="text-base font-extrabold text-[#0A192F]">
                      Ready to Bust B-Tech & Placement Stress?
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Click <strong className="text-[#1E3A8A]">SPIN WHEEL</strong> in the center or select any scenario number (1 to 25) to tackle funny real-life engineering dilemmas with Mentor Kapil's philosophical takeaways.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className="px-6 py-3 rounded-2xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Spin Wheel Now</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 hidden sm:inline">
            Scores automatically persist to Learner Dashboard and sync real-time to Google Cloud Firestore.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer shadow-xs ml-auto"
          >
            Close Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
