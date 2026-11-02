import React, { useState, useEffect } from 'react';
import { GoogleUser, UserProgress } from '../types';
import { INTERVIEW_READINESS_MODULES } from '../data/interviewReadinessNotes';
import { INTERVIEW_READINESS_100_MCQS } from '../data/interviewReadiness100MCQs';
import { INTERVIEW_SCENARIOS_100_MCQS } from '../data/interviewScenarios100MCQs';
import {
  BookOpen,
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
  ArrowLeft,
  ShieldCheck,
  Zap,
  GraduationCap,
  Briefcase,
  Layers,
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Code2,
  FileText,
  TrendingUp,
} from 'lucide-react';
import {
  downloadInterviewReadinessBadgePNG,
  downloadInterviewReadinessBadgePDF,
  downloadInterviewReadinessCertificatePNG,
  downloadInterviewReadinessCertificatePDF,
} from '../utils/exportCredentials';

interface InterviewReadinessWorkspaceProps {
  user: GoogleUser | null;
  progress: UserProgress;
  onBackToPlanner: () => void;
  onRequireAuth: () => void;
  onSaveInterviewScore: (type: 'core' | 'scenarios', score: number, correctCount: number, passed: boolean) => void;
}

export const InterviewReadinessWorkspace: React.FC<InterviewReadinessWorkspaceProps> = ({
  user,
  progress,
  onBackToPlanner,
  onRequireAuth,
  onSaveInterviewScore,
}) => {
  const [activeTab, setActiveTab] = useState<'tracks' | 'core-assessment' | 'scenarios-assessment' | 'credentials'>('tracks');

  // Track selection: all, fresher, experienced
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'fresher' | 'experienced'>('all');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(INTERVIEW_READINESS_MODULES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Assessment 1 (Core 100 MCQs) state
  const [coreAnswers, setCoreAnswers] = useState<Record<number, number>>({});
  const [coreCurrentIdx, setCoreCurrentIdx] = useState<number>(0);
  const [coreSubmitted, setCoreSubmitted] = useState<boolean>(() => {
    return Boolean(progress.interviewReadinessAttemptedAt && progress.interviewReadinessPassed !== undefined);
  });
  const [coreTimeRemaining, setCoreTimeRemaining] = useState<number>(60 * 60);
  const [coreTimerActive, setCoreTimerActive] = useState<boolean>(false);
  const [coreFilter, setCoreFilter] = useState<'all' | 'unanswered' | 'answered'>('all');

  // Assessment 2 (100 Scenarios) state
  const [scenariosAnswers, setScenariosAnswers] = useState<Record<number, number>>({});
  const [scenariosCurrentIdx, setScenariosCurrentIdx] = useState<number>(0);
  const [scenariosSubmitted, setScenariosSubmitted] = useState<boolean>(() => {
    return Boolean(progress.interviewScenariosAttemptedAt && progress.interviewScenariosPassed !== undefined);
  });
  const [scenariosTimeRemaining, setScenariosTimeRemaining] = useState<number>(60 * 60);
  const [scenariosTimerActive, setScenariosTimerActive] = useState<boolean>(false);
  const [scenariosFilter, setScenariosFilter] = useState<'all' | 'unanswered' | 'answered'>('all');

  // Timer 1: Core Assessment
  useEffect(() => {
    let interval: any = null;
    if (coreTimerActive && coreTimeRemaining > 0 && !coreSubmitted) {
      interval = setInterval(() => {
        setCoreTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmitCore();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [coreTimerActive, coreTimeRemaining, coreSubmitted]);

  // Timer 2: Scenarios Assessment
  useEffect(() => {
    let interval: any = null;
    if (scenariosTimerActive && scenariosTimeRemaining > 0 && !scenariosSubmitted) {
      interval = setInterval(() => {
        setScenariosTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmitScenarios();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [scenariosTimerActive, scenariosTimeRemaining, scenariosSubmitted]);

  // Submit Core Assessment
  const handleSubmitCore = () => {
    let correct = 0;
    INTERVIEW_READINESS_100_MCQS.forEach((q, idx) => {
      if (coreAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    const percentage = Math.round((correct / INTERVIEW_READINESS_100_MCQS.length) * 100);
    const passed = percentage >= 80;
    setCoreSubmitted(true);
    setCoreTimerActive(false);
    onSaveInterviewScore('core', percentage, correct, passed);
  };

  // Submit Scenarios Assessment
  const handleSubmitScenarios = () => {
    let correct = 0;
    INTERVIEW_SCENARIOS_100_MCQS.forEach((s, idx) => {
      if (scenariosAnswers[idx] === s.correctIndex) {
        correct++;
      }
    });
    const percentage = Math.round((correct / INTERVIEW_SCENARIOS_100_MCQS.length) * 100);
    const passed = percentage >= 80;
    setScenariosSubmitted(true);
    setScenariosTimerActive(false);
    onSaveInterviewScore('scenarios', percentage, correct, passed);
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Filtered modules
  const filteredModules = INTERVIEW_READINESS_MODULES.filter((m) => {
    const matchesTrack = selectedTrack === 'all' || m.track === selectedTrack || m.track === 'universal';
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  const selectedModule =
    INTERVIEW_READINESS_MODULES.find((m) => m.id === selectedModuleId) || INTERVIEW_READINESS_MODULES[0];

  // Best scores
  const coreScore = progress.interviewReadinessScore ?? 0;
  const corePassed = progress.interviewReadinessPassed ?? false;
  const scenariosScore = progress.interviewScenariosScore ?? 0;
  const scenariosPassed = progress.interviewScenariosPassed ?? false;
  const hasUnlockedCredential = corePassed || scenariosPassed;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-16">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-b border-emerald-800/40 px-4 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPlanner}
              className="p-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-slate-300 hover:text-white transition flex items-center gap-2 text-sm shadow-sm"
              title="Return to 10-Day Plan"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>Back to Plan</span>
            </button>
            <div className="h-6 w-px bg-slate-800 hidden md:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Dual Track Portal
                </span>
                <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Mentor: Kapil
                </span>
              </div>
              <h1 className="text-xl lg:text-2xl font-black text-white tracking-tight flex items-center gap-2 mt-1">
                Interview Readiness Hub
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Fresher & Experienced
                </span>
              </h1>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <div className="bg-slate-900/90 border border-emerald-900/60 rounded-xl px-3 py-1.5 flex items-center gap-2.5 shrink-0">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Fresher Track</p>
                <p className="text-xs font-bold text-white">Campus Placements</p>
              </div>
            </div>
            <div className="bg-slate-900/90 border border-blue-900/60 rounded-xl px-3 py-1.5 flex items-center gap-2.5 shrink-0">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Experienced Track</p>
                <p className="text-xs font-bold text-white">SDE-2 & Senior Lateral</p>
              </div>
            </div>
            <div className="bg-slate-900/90 border border-amber-900/60 rounded-xl px-3 py-1.5 flex items-center gap-2.5 shrink-0">
              <Award className="w-4 h-4 text-amber-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Assessments</p>
                <p className="text-xs font-bold text-amber-300">200 High-Yield MCQs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 mt-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('tracks')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition shrink-0 ${
              activeTab === 'tracks'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-500'
                : 'bg-slate-900/70 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Preparation Tracks & Notes (10 Modules)</span>
          </button>

          <button
            onClick={() => setActiveTab('core-assessment')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition shrink-0 ${
              activeTab === 'core-assessment'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-500'
                : 'bg-slate-900/70 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Assessment 1: 100 Core MCQs</span>
            {coreSubmitted && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                  corePassed ? 'bg-emerald-500 text-slate-950' : 'bg-red-500 text-white'
                }`}
              >
                {coreScore}%
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('scenarios-assessment')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition shrink-0 ${
              activeTab === 'scenarios-assessment'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-500'
                : 'bg-slate-900/70 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Assessment 2: 100 Real Scenarios</span>
            {scenariosSubmitted && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                  scenariosPassed ? 'bg-emerald-500 text-slate-950' : 'bg-red-500 text-white'
                }`}
              >
                {scenariosScore}%
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('credentials')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition shrink-0 ${
              activeTab === 'credentials'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40 border border-amber-500'
                : 'bg-slate-900/70 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Verified Credentials & Badge</span>
            {hasUnlockedCredential && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 py-6 flex-1">
        {/* ========================================================================= */}
        {/* TAB 1: PREPARATION TRACKS & NOTES */}
        {/* ========================================================================= */}
        {activeTab === 'tracks' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar: Tracks Filter & Module List */}
            <div className="lg:col-span-4 space-y-4">
              {/* Track Selector Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-emerald-400" /> Filter Experience Track
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedTrack('all')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition text-center ${
                      selectedTrack === 'all'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-800/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    All (10)
                  </button>
                  <button
                    onClick={() => setSelectedTrack('fresher')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      selectedTrack === 'fresher'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-800/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Fresher</span>
                  </button>
                  <button
                    onClick={() => setSelectedTrack('experienced')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      selectedTrack === 'experienced'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-800/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Senior</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative mt-3">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search notes, topics, patterns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Module List */}
              <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
                {filteredModules.map((m, idx) => {
                  const isSelected = m.id === selectedModuleId;
                  const isFresher = m.track === 'fresher';
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModuleId(m.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition group ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/50'
                          : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            isFresher
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}
                        >
                          {isFresher ? 'Fresher Track' : 'Experienced SDE'}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-slate-500" /> {m.estimatedReadTime}
                        </span>
                      </div>
                      <h4
                        className={`text-sm font-bold mt-2 leading-snug ${
                          isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {m.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {m.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Panel: Active Module Content */}
            <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xl backdrop-blur-sm space-y-6">
              {/* Header */}
              <div className="border-b border-slate-800 pb-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                      selectedModule.track === 'fresher'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {selectedModule.track === 'fresher' ? 'Fresher Campus Blueprint' : 'Experienced SDE-2 & Senior'}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> {selectedModule.estimatedReadTime} reading time
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">{selectedModule.title}</h2>
                <p className="text-sm font-medium text-emerald-400 mt-1">{selectedModule.subtitle}</p>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  {selectedModule.summary}
                </p>
              </div>

              {/* Kapil Mentor Pro Tips Alert */}
              <div className="bg-amber-950/30 border border-amber-600/40 rounded-xl p-4 lg:p-5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Kapil Mentor Placement Guidance (SPSU Udaipur)</span>
                </div>
                <ul className="space-y-1.5 text-xs lg:text-sm text-slate-200">
                  {selectedModule.kapilMentorTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Takeaways Grid */}
              <div>
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Placement Takeaways
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedModule.keyTakeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl flex items-start gap-2.5 text-xs lg:text-sm text-slate-300"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs">
                        {idx + 1}
                      </span>
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deep Dive Markdown Text */}
              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-6">
                <div className="whitespace-pre-line font-sans">{selectedModule.deepDiveMarkdown}</div>
              </div>

              {/* Polyglot Code Snippets if present */}
              {selectedModule.codeSnippets && selectedModule.codeSnippets.length > 0 && (
                <div className="border-t border-slate-800 pt-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400" /> Tested Technical Code Implementations
                  </h3>
                  {selectedModule.codeSnippets.map((snippet, idx) => (
                    <div key={idx} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400">{snippet.title}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {snippet.language}
                        </span>
                      </div>
                      <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              )}

              {/* Real Sample Interview Q&A with Model Answers & Red Flags */}
              {selectedModule.sampleInterviewQA && selectedModule.sampleInterviewQA.length > 0 && (
                <div className="border-t border-slate-800 pt-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-400" /> High-Stakes Interview Q&A Simulation
                  </h3>
                  {selectedModule.sampleInterviewQA.map((qa, idx) => (
                    <div key={idx} className="bg-slate-950/80 rounded-xl border border-blue-900/30 p-5 space-y-3">
                      <h4 className="text-sm lg:text-base font-bold text-white flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">Question</span>
                        {qa.question}
                      </h4>

                      <div className="bg-slate-900/90 rounded-lg p-3 text-xs text-slate-300 border-l-4 border-blue-500">
                        <span className="font-bold text-blue-300">Interviewer Expectation: </span>
                        {qa.interviewerExpectation}
                      </div>

                      <div className="bg-emerald-950/30 rounded-lg p-3.5 text-xs lg:text-sm text-slate-200 border-l-4 border-emerald-500 space-y-1">
                        <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Ideal Candidate Answer (STAR / Technical)
                        </p>
                        <p className="leading-relaxed">{qa.idealAnswer}</p>
                      </div>

                      <div className="bg-red-950/30 rounded-lg p-3 text-xs text-slate-200 border-l-4 border-red-500">
                        <span className="font-bold text-red-400 flex items-center gap-1 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Red Flags To Avoid
                        </span>
                        <p>{qa.redFlagsToAvoid}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ASSESSMENT 1 (100 CORE MCQS) */}
        {/* ========================================================================= */}
        {activeTab === 'core-assessment' && (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Assessment Status Bar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verification Exam
                </span>
                <h2 className="text-xl font-black text-white mt-1">100 Core Interview Readiness MCQs</h2>
                <p className="text-xs text-slate-400">
                  Passing Benchmark: 80% (80/100 correct) • DSA, OOPs, DBMS, OS, Networks, SDLC & Behavioral
                </p>
              </div>

              {/* Timer & Submit controls */}
              <div className="flex items-center gap-3">
                <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-base font-black text-white">
                    {formatTime(coreTimeRemaining)}
                  </span>
                </div>

                {!coreSubmitted ? (
                  <>
                    {!coreTimerActive ? (
                      <button
                        onClick={() => setCoreTimerActive(true)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-md"
                      >
                        Start Timer
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitCore}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-md flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submit Exam</span>
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                        corePassed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {corePassed ? 'PASSED (80%+)' : 'NEEDS RETRY (<80%)'}
                    </span>
                    <button
                      onClick={() => {
                        setCoreSubmitted(false);
                        setCoreAnswers({});
                        setCoreCurrentIdx(0);
                        setCoreTimeRemaining(60 * 60);
                        setCoreTimerActive(true);
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retry
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Question Navigator Palette */}
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-400">
                <span>QUESTION PALETTE (1 to 100)</span>
                <span>Answered: {Object.keys(coreAnswers).length} / 100</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {INTERVIEW_READINESS_100_MCQS.map((_, idx) => {
                  const isAnswered = coreAnswers[idx] !== undefined;
                  const isCurrent = coreCurrentIdx === idx;
                  const isCorrect = coreSubmitted && coreAnswers[idx] === INTERVIEW_READINESS_100_MCQS[idx].correctIndex;
                  const isWrong = coreSubmitted && isAnswered && !isCorrect;

                  let btnBg = 'bg-slate-800/60 text-slate-400 border-slate-700/50';
                  if (coreSubmitted) {
                    if (isCorrect) btnBg = 'bg-emerald-600 text-white border-emerald-400';
                    else if (isWrong) btnBg = 'bg-red-600 text-white border-red-400';
                  } else if (isAnswered) {
                    btnBg = 'bg-emerald-600 text-white border-emerald-500';
                  }
                  if (isCurrent) {
                    btnBg += ' ring-2 ring-amber-400';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setCoreCurrentIdx(idx)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold border transition flex items-center justify-center ${btnBg}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Question Card */}
            {(() => {
              const q = INTERVIEW_READINESS_100_MCQS[coreCurrentIdx];
              const selectedOpt = coreAnswers[coreCurrentIdx];

              return (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl">
                  {/* Category & Track header */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-slate-800 text-emerald-400 border border-slate-700">
                        {q.category}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        Question {coreCurrentIdx + 1} of 100
                      </span>
                    </div>
                    {q.companyTags && q.companyTags.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Asked at:</span>
                        {q.companyTags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Question Text */}
                  <h3 className="text-base lg:text-lg font-bold text-white leading-relaxed">
                    {q.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = selectedOpt === oIdx;
                      const isRightOption = coreSubmitted && q.correctIndex === oIdx;
                      const isWrongOption = coreSubmitted && isChosen && q.correctIndex !== oIdx;

                      let optStyle =
                        'bg-slate-950/70 border-slate-800/80 hover:bg-slate-800/80 hover:border-slate-700 text-slate-200';
                      if (coreSubmitted) {
                        if (isRightOption) optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                        else if (isWrongOption) optStyle = 'bg-red-950/60 border-red-500 text-red-200';
                      } else if (isChosen) {
                        optStyle = 'bg-emerald-950/40 border-emerald-500 text-white shadow-md shadow-emerald-950/30';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={coreSubmitted}
                          onClick={() => {
                            setCoreAnswers((prev) => ({ ...prev, [coreCurrentIdx]: oIdx }));
                          }}
                          className={`w-full text-left p-4 rounded-xl border font-medium text-xs lg:text-sm transition flex items-center justify-between ${optStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                isChosen ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {coreSubmitted && isRightOption && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          )}
                          {coreSubmitted && isWrongOption && (
                            <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {coreSubmitted && (
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2 mt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Kapil Mentor Solution Analysis:
                      </p>
                      <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
                    </div>
                  )}

                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                    <button
                      disabled={coreCurrentIdx === 0}
                      onClick={() => setCoreCurrentIdx((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>

                    <button
                      disabled={coreCurrentIdx === INTERVIEW_READINESS_100_MCQS.length - 1}
                      onClick={() =>
                        setCoreCurrentIdx((prev) =>
                          Math.min(INTERVIEW_READINESS_100_MCQS.length - 1, prev + 1)
                        )
                      }
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ASSESSMENT 2 (100 REAL SCENARIOS & CASE STUDIES) */}
        {/* ========================================================================= */}
        {activeTab === 'scenarios-assessment' && (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Status Bar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Case Study Simulation
                </span>
                <h2 className="text-xl font-black text-white mt-1">100 Real Engineering Scenario MCQs</h2>
                <p className="text-xs text-slate-400">
                  Passing Benchmark: 80% (80/100 correct) • Production Outages, Deadlocks, Arch Trade-offs & Leadership
                </p>
              </div>

              {/* Timer & Controls */}
              <div className="flex items-center gap-3">
                <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="font-mono text-base font-black text-white">
                    {formatTime(scenariosTimeRemaining)}
                  </span>
                </div>

                {!scenariosSubmitted ? (
                  <>
                    {!scenariosTimerActive ? (
                      <button
                        onClick={() => setScenariosTimerActive(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-md"
                      >
                        Start Timer
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitScenarios}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-md flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submit Exam</span>
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                        scenariosPassed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {scenariosPassed ? 'PASSED (80%+)' : 'NEEDS RETRY (<80%)'}
                    </span>
                    <button
                      onClick={() => {
                        setScenariosSubmitted(false);
                        setScenariosAnswers({});
                        setScenariosCurrentIdx(0);
                        setScenariosTimeRemaining(60 * 60);
                        setScenariosTimerActive(true);
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retry
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Scenario Navigator Palette */}
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-400">
                <span>SCENARIO PALETTE (1 to 100)</span>
                <span>Answered: {Object.keys(scenariosAnswers).length} / 100</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {INTERVIEW_SCENARIOS_100_MCQS.map((_, idx) => {
                  const isAnswered = scenariosAnswers[idx] !== undefined;
                  const isCurrent = scenariosCurrentIdx === idx;
                  const isCorrect =
                    scenariosSubmitted &&
                    scenariosAnswers[idx] === INTERVIEW_SCENARIOS_100_MCQS[idx].correctIndex;
                  const isWrong = scenariosSubmitted && isAnswered && !isCorrect;

                  let btnBg = 'bg-slate-800/60 text-slate-400 border-slate-700/50';
                  if (scenariosSubmitted) {
                    if (isCorrect) btnBg = 'bg-emerald-600 text-white border-emerald-400';
                    else if (isWrong) btnBg = 'bg-red-600 text-white border-red-400';
                  } else if (isAnswered) {
                    btnBg = 'bg-blue-600 text-white border-blue-500';
                  }
                  if (isCurrent) {
                    btnBg += ' ring-2 ring-amber-400';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setScenariosCurrentIdx(idx)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold border transition flex items-center justify-center ${btnBg}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Scenario Card */}
            {(() => {
              const sc = INTERVIEW_SCENARIOS_100_MCQS[scenariosCurrentIdx];
              const selectedOpt = scenariosAnswers[scenariosCurrentIdx];

              return (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl">
                  {/* Category & Role Context */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {sc.category}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        Scenario {scenariosCurrentIdx + 1} of 100
                      </span>
                    </div>
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                      Role: {sc.roleContext}
                    </span>
                  </div>

                  {/* Scenario Context Box */}
                  <div className="bg-slate-950/90 border border-slate-800/80 p-5 rounded-xl border-l-4 border-l-blue-500 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      Real-World Workplace Scenario:
                    </p>
                    <p className="text-sm lg:text-base text-slate-200 leading-relaxed font-medium">
                      {sc.scenarioContext}
                    </p>
                  </div>

                  {/* Core Question */}
                  <h3 className="text-base font-black text-white">{sc.question}</h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {sc.options.map((opt, oIdx) => {
                      const isChosen = selectedOpt === oIdx;
                      const isRightOption = scenariosSubmitted && sc.correctIndex === oIdx;
                      const isWrongOption = scenariosSubmitted && isChosen && sc.correctIndex !== oIdx;

                      let optStyle =
                        'bg-slate-950/70 border-slate-800/80 hover:bg-slate-800/80 hover:border-slate-700 text-slate-200';
                      if (scenariosSubmitted) {
                        if (isRightOption) optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                        else if (isWrongOption) optStyle = 'bg-red-950/60 border-red-500 text-red-200';
                      } else if (isChosen) {
                        optStyle = 'bg-blue-950/40 border-blue-500 text-white shadow-md shadow-blue-950/30';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={scenariosSubmitted}
                          onClick={() => {
                            setScenariosAnswers((prev) => ({ ...prev, [scenariosCurrentIdx]: oIdx }));
                          }}
                          className={`w-full text-left p-4 rounded-xl border font-medium text-xs lg:text-sm transition flex items-center justify-between ${optStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                isChosen ? 'bg-blue-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {scenariosSubmitted && isRightOption && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          )}
                          {scenariosSubmitted && isWrongOption && (
                            <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Solution Analysis after submission */}
                  {scenariosSubmitted && (
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2 mt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Mentor Kapil Industry Best Practice:
                      </p>
                      <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">{sc.explanation}</p>
                    </div>
                  )}

                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                    <button
                      disabled={scenariosCurrentIdx === 0}
                      onClick={() => setScenariosCurrentIdx((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>

                    <button
                      disabled={scenariosCurrentIdx === INTERVIEW_SCENARIOS_100_MCQS.length - 1}
                      onClick={() =>
                        setScenariosCurrentIdx((prev) =>
                          Math.min(INTERVIEW_SCENARIOS_100_MCQS.length - 1, prev + 1)
                        )
                      }
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: VERIFIED CREDENTIALS & BADGES */}
        {/* ========================================================================= */}
        {activeTab === 'credentials' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Official Certification Hub
              </span>
              <h2 className="text-3xl font-black text-white">Interview Readiness Credentials</h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Demonstrating mastery in either the 100 Core MCQs or the 100 Real Scenario Assessment unlocks the verified placement credential signed by Placement Mentor Kapil.
              </p>
            </div>

            {/* Criteria & Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-5 rounded-2xl border transition ${
                  corePassed
                    ? 'bg-emerald-950/40 border-emerald-500/60'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase">Assessment 1 Benchmark</span>
                  {corePassed ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Passed ({coreScore}%)
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">Target: 80%</span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white mt-1">100 Core MCQs</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Covers DSA, OOPs, DBMS, OS, Networks, and HR Behavioral Framework.
                </p>
              </div>

              <div
                className={`p-5 rounded-2xl border transition ${
                  scenariosPassed
                    ? 'bg-emerald-950/40 border-emerald-500/60'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 uppercase">Assessment 2 Benchmark</span>
                  {scenariosPassed ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Passed ({scenariosScore}%)
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">Target: 80%</span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white mt-1">100 Real Scenarios</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Covers Production Incidents, Lock Deadlocks, Architecture, and Leadership.
                </p>
              </div>
            </div>

            {/* Action Card: Badge & Certificate Export */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-10 shadow-2xl space-y-8">
              {!user ? (
                <div className="text-center py-6 space-y-3">
                  <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Sign In Required for Verified Credentials</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Please sign in with your student Google account so your name and email are permanently stamped onto your official credentials.
                  </p>
                  <button
                    onClick={onRequireAuth}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-950/40"
                  >
                    Sign In with Google
                  </button>
                </div>
              ) : !hasUnlockedCredential ? (
                <div className="text-center py-6 space-y-3">
                  <LockBadgePlaceholder />
                  <h3 className="text-lg font-bold text-white">Credentials Locked</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Complete either Assessment 1 (100 Core MCQs) or Assessment 2 (100 Real Scenarios) with an 80% score to unlock your official verified badge and certificate.
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('core-assessment')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition"
                    >
                      Take 100 Core MCQs
                    </button>
                    <button
                      onClick={() => setActiveTab('scenarios-assessment')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition"
                    >
                      Take 100 Scenarios
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Unlocked Announcement */}
                  <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/80 border border-amber-500/40 p-5 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black shrink-0">
                        <Award className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-white">
                          Congratulations, {user.name}!
                        </h4>
                        <p className="text-xs text-slate-300">
                          You have met the SPSU Udaipur Placement Readiness benchmark. Your official credentials are ready for export.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dual Grid for Badge & Certificate Downloads */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Badge Card */}
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                          Digital LinkedIn Badge
                        </span>
                        <h3 className="text-lg font-bold text-white mt-2">Interview Readiness Specialist</h3>
                        <p className="text-xs text-slate-400 mt-1">
                          High-resolution 1000x1000 square badge with gold laurel crest, learner name, verified score, and Mentor Kapil signature.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => downloadInterviewReadinessBadgePNG(user, Math.max(coreScore, scenariosScore))}
                          className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/30"
                        >
                          <Download className="w-4 h-4" /> Download PNG
                        </button>
                        <button
                          onClick={() => downloadInterviewReadinessBadgePDF(user, Math.max(coreScore, scenariosScore))}
                          className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 border border-slate-700"
                        >
                          <Download className="w-4 h-4" /> Download PDF
                        </button>
                      </div>
                    </div>

                    {/* Certificate Card */}
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                          Executive Certificate
                        </span>
                        <h3 className="text-lg font-bold text-white mt-2">Placement & Lateral Credential</h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Full 1920x1080 landscape verifiable certificate with unique SPSU credential ID, course syllabus, and official seal.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => downloadInterviewReadinessCertificatePNG(user, Math.max(coreScore, scenariosScore), Math.max(coreScore, scenariosScore))}
                          className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-950/30"
                        >
                          <Download className="w-4 h-4" /> Download PNG
                        </button>
                        <button
                          onClick={() => downloadInterviewReadinessCertificatePDF(user, Math.max(coreScore, scenariosScore), Math.max(coreScore, scenariosScore))}
                          className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 border border-slate-700"
                        >
                          <Download className="w-4 h-4" /> Download PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LockBadgePlaceholder = () => (
  <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mx-auto text-slate-500">
    <Award className="w-8 h-8 opacity-40" />
  </div>
);
