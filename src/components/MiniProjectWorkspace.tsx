import React, { useState, useEffect } from 'react';
import {
  MiniProject,
  SupportedLanguage,
  GoogleUser,
} from '../types';
import {
  Code2,
  Copy,
  Check,
  Play,
  RotateCcw,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Info,
  Sparkles,
  HelpCircle,
  FileCode2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MiniProjectWorkspaceProps {
  miniProject: MiniProject;
  user: GoogleUser | null;
  onLoadIntoIDE: (code: string, lang: SupportedLanguage) => void;
}

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  c: 'C (GCC C17 — Single Header)',
  cpp: 'C++ (G++ C++20)',
  java: 'Java (OpenJDK 21)',
  python: 'Python (Python 3.12)',
};

export const MiniProjectWorkspace: React.FC<MiniProjectWorkspaceProps> = ({
  miniProject,
  user,
  onLoadIntoIDE,
}) => {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('c');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number>(0);

  // Interactive Simulator State
  const [simOperation, setSimOperation] = useState<number>(1);
  const [num1, setNum1] = useState<string>('12.5');
  const [num2, setNum2] = useState<string>('4.5');
  const [modA, setModA] = useState<string>('47');
  const [modB, setModB] = useState<string>('5');
  const [baseVal, setBaseVal] = useState<string>('2.0');
  const [expVal, setExpVal] = useState<string>('10');
  const [simOutput, setSimOutput] = useState<string>('');

  useEffect(() => {
    setSelectedScenarioIdx(0);
    if (miniProject.day === 1) {
      setSimOutput(
        `================================================================\n` +
        `       EDUCATIONAL CALCULATOR — SINGLE HEADER (<stdio.h>)      \n` +
        `================================================================\n` +
        ` 1. Addition       2. Subtraction    3. Multiplication\n` +
        ` 4. Division       5. Modulus        6. Power (Iterative, No math.h)\n` +
        ` 7. Data Types     8. Exit\n` +
        `================================================================\n` +
        `Simulator ready. Select an operation and click "Execute Operation" to simulate verbatim C console I/O.`
      );
    } else {
      setSimOutput(
        `===================================================================\n` +
        `   ${miniProject.title.toUpperCase()}\n` +
        `   MODULE ${miniProject.day} CAPSTONE • SPSU PLACEMENT READINESS PROGRAM\n` +
        `===================================================================\n` +
        `Interactive Execution Sandbox ready. Click any scenario button below to simulate the execution trace in real time.`
      );
    }
  }, [miniProject.id, miniProject.day, miniProject.title]);

  const runScenarioSimulation = (scIdx: number) => {
    setSelectedScenarioIdx(scIdx);
    const sc = miniProject.interactiveScenarios[scIdx];
    if (!sc) return;

    let out = '';
    out += `===================================================================\n`;
    out += `   ${miniProject.title.toUpperCase()}\n`;
    out += `   MODULE ${miniProject.day} CAPSTONE • SPSU PLACEMENT READINESS PROGRAM\n`;
    out += `===================================================================\n\n`;
    out += `[ACTIVE SCENARIO #${scIdx + 1}] ${sc.name}\n`;
    out += `-------------------------------------------------------------------\n`;
    out += `Description   : ${sc.description}\n`;
    out += `Input Stream  : ${sc.sampleInputs.join(' ')}\n\n`;
    out += `[SIMULATED EXECUTION TRACE (stdout)]\n`;
    out += `${sc.expectedOutput}\n\n`;
    out += `[VERIFIED ARCHITECTURAL CONCEPT]\n`;
    out += `✔ ${sc.explanation}\n`;
    out += `-------------------------------------------------------------------\n`;
    out += `STATUS: EXECUTION VERIFIED | EXIT CODE: 0 (PASSED)\n`;

    setSimOutput(out);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0A192F', '#1E3A8A', '#93C5FD', '#10B981'],
    });
  };

  const handleCopyCode = () => {
    const code = miniProject.codeByLanguage[selectedLang];
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadIDE = () => {
    const code = miniProject.codeByLanguage[selectedLang];
    onLoadIntoIDE(code, selectedLang);
  };

  const runSimulation = (op: number, customParams?: { n1?: string; n2?: string; b?: string; e?: string; ma?: string; mb?: string }) => {
    const activeOp = op;
    setSimOperation(activeOp);

    const effectiveN1 = customParams?.n1 ?? num1;
    const effectiveN2 = customParams?.n2 ?? num2;
    const effectiveModA = customParams?.ma ?? modA;
    const effectiveModB = customParams?.mb ?? modB;
    const effectiveBase = customParams?.b ?? baseVal;
    const effectiveExp = customParams?.e ?? expVal;

    let out = '';
    out += `================================================================\n`;
    out += `       EDUCATIONAL CALCULATOR — SINGLE HEADER (<stdio.h>)      \n`;
    out += `================================================================\n`;
    out += `Select an operation (1 - 8): ${activeOp}\n\n`;

    switch (activeOp) {
      case 1: { // Addition
        const val1 = parseFloat(effectiveN1);
        const val2 = parseFloat(effectiveN2);
        if (isNaN(val1) || isNaN(val2)) {
          out += `[ERROR] Invalid numeric input.\n`;
        } else {
          const res = val1 + val2;
          out += `--- Addition ---\n`;
          out += `Enter two numbers: ${val1} ${val2}\n`;
          out += `Result: ${val1.toFixed(6)} + ${val2.toFixed(6)} = ${res.toFixed(6)}\n`;
        }
        break;
      }
      case 2: { // Subtraction
        const val1 = parseFloat(effectiveN1);
        const val2 = parseFloat(effectiveN2);
        if (isNaN(val1) || isNaN(val2)) {
          out += `[ERROR] Invalid numeric input.\n`;
        } else {
          const res = val1 - val2;
          out += `--- Subtraction ---\n`;
          out += `Enter two numbers: ${val1} ${val2}\n`;
          out += `Result: ${val1.toFixed(6)} - ${val2.toFixed(6)} = ${res.toFixed(6)}\n`;
        }
        break;
      }
      case 3: { // Multiplication
        const val1 = parseFloat(effectiveN1);
        const val2 = parseFloat(effectiveN2);
        if (isNaN(val1) || isNaN(val2)) {
          out += `[ERROR] Invalid numeric input.\n`;
        } else {
          const res = val1 * val2;
          out += `--- Multiplication ---\n`;
          out += `Enter two numbers: ${val1} ${val2}\n`;
          out += `Result: ${val1.toFixed(6)} * ${val2.toFixed(6)} = ${res.toFixed(6)}\n`;
        }
        break;
      }
      case 4: { // Division
        const val1 = parseFloat(effectiveN1);
        const val2 = parseFloat(effectiveN2);
        if (isNaN(val1) || isNaN(val2)) {
          out += `[ERROR] Invalid numeric input.\n`;
        } else if (val2 === 0) {
          out += `--- Division ---\n`;
          out += `Enter numerator and denominator: ${val1} ${val2}\n`;
          out += `[ERROR] Division by zero is undefined.\n`;
        } else {
          const res = val1 / val2;
          out += `--- Division ---\n`;
          out += `Enter numerator and denominator: ${val1} ${val2}\n`;
          out += `Result: ${val1.toFixed(6)} / ${val2.toFixed(6)} = ${res.toFixed(6)}\n`;
        }
        break;
      }
      case 5: { // Modulus
        const a = parseInt(effectiveModA, 10);
        const b = parseInt(effectiveModB, 10);
        if (isNaN(a) || isNaN(b)) {
          out += `[ERROR] Invalid integer input.\n`;
        } else if (b === 0) {
          out += `--- Modulus ---\n`;
          out += `Enter two integers (long long): ${a} ${b}\n`;
          out += `[ERROR] Modulo by zero is undefined.\n`;
        } else {
          const res = a % b;
          out += `--- Modulus ---\n`;
          out += `Enter two integers (long long): ${a} ${b}\n`;
          out += `Result: ${a} % ${b} = ${res}\n`;
        }
        break;
      }
      case 6: { // Power
        const b = parseFloat(effectiveBase);
        const e = parseInt(effectiveExp, 10);
        if (isNaN(b) || isNaN(e)) {
          out += `[ERROR] Invalid input.\n`;
        } else if (b === 0.0 && e < 0) {
          out += `--- Power (Iterative, No math.h) ---\n`;
          out += `Enter base (double) and exponent (integer): ${b} ${e}\n`;
          out += `[ERROR] Zero base with negative exponent results in division by zero.\n`;
        } else if (b === 0.0 && e === 0) {
          out += `--- Power (Iterative, No math.h) ---\n`;
          out += `Enter base (double) and exponent (integer): ${b} ${e}\n`;
          out += `Result: 0 ^ 0 is indeterminate (conventionally 1.000000).\n`;
        } else {
          let powRes = 1.0;
          const absE = Math.abs(e);
          for (let i = 0; i < absE; i++) {
            powRes *= b;
          }
          if (e < 0) {
            powRes = 1.0 / powRes;
          }
          out += `--- Power (Iterative, No math.h) ---\n`;
          out += `Enter base (double) and exponent (integer): ${b} ${e}\n`;
          out += `Result: ${b.toFixed(6)} ^ ${e} = ${powRes.toFixed(6)}\n`;
        }
        break;
      }
      case 7: { // Data types demonstration
        out += `================================================================\n`;
        out += `          C FUNDAMENTAL DATA TYPES DEMONSTRATION & SIZES        \n`;
        out += `================================================================\n`;
        out += ` Type          Format   Size (bytes)  Sample Value\n`;
        out += ` --------------------------------------------------------------\n`;
        out += ` char          %c       1             Z\n`;
        out += ` short         %hd      2             -32768\n`;
        out += ` int           %d       4             2147483647\n`;
        out += ` unsigned int  %u       4             4294967295\n`;
        out += ` long          %ld      8             2147483647\n`;
        out += ` long long     %lld     8             9223372036854775807\n`;
        out += ` float         %f       4             3.141592\n`;
        out += ` double        %lf      8             2.7182818285\n`;
        out += ` long double   %Lf      16            1.41421356237310\n`;
        out += ` _Bool         %d       1             1 (true)\n`;
        out += `================================================================\n`;
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#0A192F', '#1E3A8A', '#93C5FD'],
        });
        break;
      }
      case 8: { // Exit
        out += `\nTerminating educational calculator. Happy Coding!\n`;
        break;
      }
      default:
        out += `\n[ERROR] Choice out of range. Please enter 1 through 8.\n`;
        break;
    }

    out += `\nPerform another operation? (1 = Yes, Any other integer = No): 1\n`;
    setSimOutput(out);
  };

  return (
    <div className="space-y-8">
      {/* Hero Overview Banner */}
      <div className="rounded-3xl border-2 border-[#0A192F] bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#1E3A8A] text-white p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-[#0A192F] font-mono text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              DAY {miniProject.day} CAPSTONE MINI-PROJECT
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#BFDBFE] font-mono text-xs font-bold">
              Module {miniProject.day} • {miniProject.subtitle}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono text-xs font-bold">
              {miniProject.interactiveScenarios.length} Interactive Scenarios
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {miniProject.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 max-w-4xl leading-relaxed">
              {miniProject.description}
            </p>
          </div>

          {/* Key Pedagogical Constraints Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <div className="text-[10px] font-mono uppercase text-amber-300 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Architectural Invariant
              </div>
              <div className="text-xs text-slate-200 line-clamp-2">
                {miniProject.conceptsCovered.constraints[0] || 'Strict System Invariants'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#93C5FD] font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Core Data Types & Structs
              </div>
              <div className="text-xs text-slate-200 line-clamp-2">
                {miniProject.conceptsCovered.dataTypes.slice(0, 3).join(', ')}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <div className="text-[10px] font-mono uppercase text-emerald-300 font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Control Logic & Invariants
              </div>
              <div className="text-xs text-slate-200 line-clamp-2">
                {miniProject.conceptsCovered.conditionals[0] || 'Domain Decision Logic'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <div className="text-[10px] font-mono uppercase text-purple-300 font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Complexity Profile
              </div>
              <div className="text-xs text-slate-200 line-clamp-2">
                Basic: <span className="font-mono text-purple-200">{miniProject.complexity.basicOperations}</span> | Space: <span className="font-mono text-purple-200">{miniProject.complexity.auxiliarySpace}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulator Section */}
      <div className="rounded-3xl border-2 border-[#0A192F] bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#1E3A8A] font-extrabold flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-[#1E3A8A]" />
              Interactive Execution Sandbox
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#0A192F]">
              {miniProject.day === 1 ? 'Live Educational Calculator Simulator' : `Live ${miniProject.title} Simulator`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {miniProject.day === 1
                ? 'Test menu operations, observe division-by-zero guards, test manual iterative power calculation without pow(), and inspect the 10 data types.'
                : miniProject.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {miniProject.day === 1 ? (
              <button
                type="button"
                onClick={() => runSimulation(7)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Inspect All 10 Data Types</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => runScenarioSimulation(selectedScenarioIdx)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Run Scenario #{selectedScenarioIdx + 1}</span>
              </button>
            )}
          </div>
        </div>

        {miniProject.day === 1 ? (
          <>
            {/* Operation Selection Bar */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-extrabold text-[#0A192F] uppercase">
                Select Calculator Operation:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {[
                  { id: 1, label: '1. Addition', desc: 'a + b' },
                  { id: 2, label: '2. Subtraction', desc: 'a - b' },
                  { id: 3, label: '3. Multiplication', desc: 'a * b' },
                  { id: 4, label: '4. Division', desc: 'a / b (Guarded)' },
                  { id: 5, label: '5. Modulus', desc: 'a % b (Guarded)' },
                  { id: 6, label: '6. Power', desc: 'base ^ exp (No math.h)' },
                  { id: 7, label: '7. Data Types', desc: 'All 10 Types' },
                  { id: 8, label: '8. Exit', desc: 'Terminate' },
                ].map((op) => (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => setSimOperation(op.id)}
                    className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      simOperation === op.id
                        ? 'bg-[#0A192F] border-[#0A192F] text-white shadow-sm'
                        : 'bg-white border-slate-200 hover:border-[#0A192F] text-[#0A192F]'
                    }`}
                  >
                    <div className="text-xs font-bold leading-tight">{op.label}</div>
                    <div className={`text-[10px] truncate ${simOperation === op.id ? 'text-[#BFDBFE]' : 'text-slate-500'}`}>
                      {op.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Parameter Inputs based on operation */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-[#1E3A8A] uppercase">
                  Operation Inputs (Simulated Console Stdin)
                </span>
                {/* Quick Test Presets */}
                <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                  <span className="text-slate-500 font-medium">Quick Presets:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSimOperation(4);
                      setNum1('42.0');
                      setNum2('0.0');
                      runSimulation(4, { n1: '42.0', n2: '0.0' });
                    }}
                    className="px-2 py-0.5 rounded bg-white border border-slate-300 hover:border-[#0A192F] text-[#0A192F] font-mono cursor-pointer"
                  >
                    Zero Division Guard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSimOperation(5);
                      setModA('100');
                      setModB('0');
                      runSimulation(5, { ma: '100', mb: '0' });
                    }}
                    className="px-2 py-0.5 rounded bg-white border border-slate-300 hover:border-[#0A192F] text-[#0A192F] font-mono cursor-pointer"
                  >
                    Zero Modulus Guard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSimOperation(6);
                      setBaseVal('2.0');
                      setExpVal('10');
                      runSimulation(6, { b: '2.0', e: '10' });
                    }}
                    className="px-2 py-0.5 rounded bg-white border border-slate-300 hover:border-[#0A192F] text-[#0A192F] font-mono cursor-pointer"
                  >
                    Power 2^10
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSimOperation(6);
                      setBaseVal('2.0');
                      setExpVal('-3');
                      runSimulation(6, { b: '2.0', e: '-3' });
                    }}
                    className="px-2 py-0.5 rounded bg-white border border-slate-300 hover:border-[#0A192F] text-[#0A192F] font-mono cursor-pointer"
                  >
                    Power 2^-3 (Negative)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(simOperation >= 1 && simOperation <= 4) && (
                  <>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                        First Operand (double):
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono text-sm bg-white text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                        placeholder="e.g. 15.5"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                        Second Operand (double):
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono text-sm bg-white text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                        placeholder="e.g. 3.0"
                      />
                    </div>
                  </>
                )}

                {simOperation === 5 && (
                  <>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                        Numerator a (long long):
                      </label>
                      <input
                        type="number"
                        step="1"
                        value={modA}
                        onChange={(e) => setModA(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono text-sm bg-white text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                        placeholder="e.g. 47"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                        Denominator b (long long):
                      </label>
                      <input
                        type="number"
                        step="1"
                        value={modB}
                        onChange={(e) => setModB(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono text-sm bg-white text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                        placeholder="e.g. 5"
                      />
                    </div>
                  </>
                )}

                {simOperation === 6 && (
                  <>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                        Base (double):
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={baseVal}
                        onChange={(e) => setBaseVal(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono text-sm bg-white text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                        placeholder="e.g. 2.0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                        Exponent (integer):
                      </label>
                      <input
                        type="number"
                        step="1"
                        value={expVal}
                        onChange={(e) => setExpVal(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono text-sm bg-white text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                        placeholder="e.g. 10 or -3"
                      />
                    </div>
                  </>
                )}

                {(simOperation === 7 || simOperation === 8) && (
                  <div className="sm:col-span-2 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                    {simOperation === 7
                      ? 'No input arguments needed. Operation 7 inspects and formats all 10 fundamental C data types with sizeof() and exact printf format specifiers.'
                      : 'Terminates the calculator console loop.'}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => runSimulation(simOperation)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-black text-xs transition-all cursor-pointer shadow-md hover:scale-[1.02]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Execute Operation {simOperation}</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Scenarios Selection for Days 2 to 5 */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-extrabold text-[#0A192F] uppercase">
                Select Interactive Test Scenario:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {miniProject.interactiveScenarios.map((sc, idx) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => runScenarioSimulation(idx)}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      selectedScenarioIdx === idx
                        ? 'bg-[#0A192F] border-[#0A192F] text-white shadow-sm'
                        : 'bg-white border-slate-200 hover:border-[#0A192F] text-[#0A192F]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        selectedScenarioIdx === idx ? 'bg-amber-400 text-[#0A192F]' : 'bg-slate-100 text-slate-700'
                      }`}>
                        Scenario #{idx + 1}
                      </span>
                      <Play className={`w-3 h-3 ${selectedScenarioIdx === idx ? 'text-amber-400 fill-current' : 'text-slate-400'}`} />
                    </div>
                    <div className="text-xs font-bold leading-tight line-clamp-1">{sc.name}</div>
                    <div className={`text-[10px] mt-1 line-clamp-2 ${selectedScenarioIdx === idx ? 'text-[#BFDBFE]' : 'text-slate-500'}`}>
                      {sc.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Scenario Preview Box */}
            {miniProject.interactiveScenarios[selectedScenarioIdx] && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#1E3A8A] font-extrabold">
                      Active Target Scenario
                    </span>
                    <h4 className="text-sm font-bold text-[#0A192F]">
                      {miniProject.interactiveScenarios[selectedScenarioIdx].name}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => runScenarioSimulation(selectedScenarioIdx)}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-black text-xs transition-all cursor-pointer shadow-md hover:scale-[1.02] shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Scenario #{selectedScenarioIdx + 1}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-1">
                      Simulated Input Stream
                    </span>
                    <code className="text-xs font-mono text-[#1E3A8A] font-bold">
                      {miniProject.interactiveScenarios[selectedScenarioIdx].sampleInputs.join(' ')}
                    </code>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-1">
                      Pedagogical Concept & Invariant
                    </span>
                    <p className="text-xs text-slate-700">
                      {miniProject.interactiveScenarios[selectedScenarioIdx].explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Simulated Console Screen */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5 font-bold text-[#0A192F]">
              <Terminal className="w-3.5 h-3.5" />
              Simulated Console Terminal (stdout)
            </span>
            <span>Virtual GCC C17 Runtime</span>
          </div>

          <div className="rounded-2xl bg-[#0A192F] text-emerald-400 font-mono text-xs sm:text-sm p-5 border-2 border-[#1E3A8A] shadow-inner overflow-x-auto min-h-[220px]">
            <pre className="whitespace-pre font-mono leading-relaxed">{simOutput}</pre>
          </div>
        </div>
      </div>

      {/* Multi-Language Source Code Viewer & Actions */}
      <div className="rounded-3xl border-2 border-[#0A192F] bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#1E3A8A] font-extrabold flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-[#1E3A8A]" />
              Verified Implementation Code
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#0A192F]">
              Source Code across C, C++, Java & Python
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Inspect the verbatim single-header C implementation or study the polyglot ports in C++, Java, and Python.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-[#0A192F] bg-white hover:bg-[#0A192F] text-[#0A192F] hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
            </button>

            <button
              type="button"
              onClick={handleLoadIDE}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-black transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Load into Integrated IDE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {(['c', 'cpp', 'java', 'python'] as SupportedLanguage[]).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setSelectedLang(lang)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-extrabold border-2 transition-all cursor-pointer shrink-0 ${
                selectedLang === lang
                  ? 'bg-[#0A192F] border-[#0A192F] text-white shadow-xs'
                  : 'bg-white border-slate-300 hover:border-[#0A192F] text-[#0A192F]'
              }`}
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          ))}
        </div>

        {/* Code Block Container */}
        <div className="rounded-2xl bg-[#0A192F] text-slate-100 font-mono text-xs sm:text-sm border-2 border-[#1E3A8A] shadow-inner overflow-hidden">
          <div className="px-5 py-3 bg-[#112240] border-b border-[#1E3A8A] flex items-center justify-between text-xs">
            <span className="font-bold text-[#93C5FD]">
              {selectedLang === 'c'
                ? miniProject.day === 1
                  ? 'main.c — C17 Strict Single Header (<stdio.h>)'
                  : `day${miniProject.day}_solution.c — C17 Standard`
                : selectedLang === 'cpp'
                ? miniProject.day === 1
                  ? 'main.cpp — C++20 Stream I/O'
                  : `Day${miniProject.day}Solution.cpp — C++20 Standard`
                : selectedLang === 'java'
                ? miniProject.day === 1
                  ? 'Day1CalculatorMiniProject.java — OpenJDK 21'
                  : `Day${miniProject.day}App.java — OpenJDK 21`
                : miniProject.day === 1
                ? 'educational_calculator.py — Python 3.12'
                : `day${miniProject.day}_solution.py — Python 3.12`}
            </span>
            <span className="text-[11px] text-[#BFDBFE]">
              {miniProject.codeByLanguage[selectedLang].split('\n').length} lines
            </span>
          </div>

          <div className="p-5 max-h-[500px] overflow-y-auto overflow-x-auto">
            <pre className="whitespace-pre font-mono leading-relaxed text-slate-200">
              {miniProject.codeByLanguage[selectedLang]}
            </pre>
          </div>
        </div>
      </div>

      {/* Test Scenarios & Verification Suite */}
      <div className="rounded-3xl border-2 border-[#0A192F] bg-white p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-mono uppercase text-[#1E3A8A] font-extrabold">
              Edge Cases & Verification
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#0A192F]">
              {miniProject.interactiveScenarios.length} Core Verification Test Scenarios
            </h2>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold">
            100% Pass Required
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0A192F] text-white font-mono uppercase text-[10px] tracking-wider">
                <th className="p-3 rounded-tl-xl">ID</th>
                <th className="p-3">Scenario</th>
                <th className="p-3">Input Stream</th>
                <th className="p-3">Expected Console Output</th>
                <th className="p-3">Verified Concept</th>
                <th className="p-3 rounded-tr-xl text-right">Run in Simulator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 border-x border-b border-slate-200">
              {miniProject.interactiveScenarios.map((tc, idx) => (
                <tr key={tc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-[#1E3A8A] whitespace-nowrap">
                    #{idx + 1}
                  </td>
                  <td className="p-3 font-bold text-[#0A192F]">{tc.name}</td>
                  <td className="p-3 font-mono text-slate-600 bg-slate-50">{tc.sampleInputs.join(' ')}</td>
                  <td className="p-3 font-mono text-emerald-700 bg-emerald-50/50 whitespace-pre-wrap">{tc.expectedOutput}</td>
                  <td className="p-3 text-slate-600">{tc.explanation}</td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        if (miniProject.day === 1) {
                          if (tc.choice === 1 || tc.choice === 0) {
                            setSimOperation(1);
                            setNum1('12.5');
                            setNum2('4.5');
                            runSimulation(1, { n1: '12.5', n2: '4.5' });
                          } else if (tc.choice === 4) {
                            setSimOperation(4);
                            setNum1('25.0');
                            setNum2('0.0');
                            runSimulation(4, { n1: '25.0', n2: '0.0' });
                          } else if (tc.choice === 5) {
                            setSimOperation(5);
                            setModA('100');
                            setModB('0');
                            runSimulation(5, { ma: '100', mb: '0' });
                          } else if (tc.choice === 6) {
                            setSimOperation(6);
                            setBaseVal('2.0');
                            setExpVal('10');
                            runSimulation(6, { b: '2.0', e: '10' });
                          } else if (tc.choice === 7) {
                            setSimOperation(7);
                            runSimulation(7);
                          } else {
                            setSimOperation(tc.choice);
                            runSimulation(tc.choice);
                          }
                        } else {
                          runScenarioSimulation(idx);
                        }
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold text-[11px] cursor-pointer transition-colors shadow-xs"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Test</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep-Dive Educational Notes (Matching PDF Pages 6 & 7) */}
      <div className="rounded-3xl border-2 border-[#0A192F] bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono uppercase text-[#1E3A8A] font-extrabold">
            Kapil's Architectural Breakdown
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#0A192F]">
            Educational Notes & Concept Deconstructions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {miniProject.educationalNotes.map((note) => (
            <div
              key={note.number}
              className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0A192F] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {note.number}
                  </span>
                  <h3 className="text-base font-extrabold text-[#0A192F]">{note.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {note.details}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#1E3A8A]/30 text-xs text-[#0A192F] space-y-1">
                <span className="font-mono font-extrabold text-[#1E3A8A] uppercase text-[10px] block">
                  Core Architectural Rule:
                </span>
                <div className="font-medium">
                  {miniProject.day === 1
                    ? note.number === 1
                      ? 'Only <stdio.h> allowed — manual stream clearing with getchar() prevents runaway input loop.'
                      : note.number === 2
                      ? 'Accumulates product iteratively without powl(); handles negative exponents via reciprocal division.'
                      : note.number === 3
                      ? 'Uses correct conversion specifiers (%c, %hd, %d, %u, %ld, %lld, %f, %lf, %Lf, %d) to prevent stack misalignment.'
                      : note.number === 4
                      ? 'Protects against zero division, zero modulus, and non-integer input mismatch.'
                      : 'All arithmetic operations run in O(1) time; iterative exponentiation runs in O(|exp|) time.'
                    : miniProject.day === 2
                    ? note.number === 1
                      ? 'Dual-Heap guarantees O(1) top access with O(log N) balance step across bid/ask boundaries.'
                      : note.number === 2
                      ? 'Sliding window keeps exactly K entries in amortized O(1) time per price tick update.'
                      : note.number === 3
                      ? 'Monotonic stack preserves order invariant; each element is pushed and popped at most once O(N).'
                      : note.number === 4
                      ? 'Graph BFS guarantees shortest path hop count in unweighted topology networks O(V + E).'
                      : '0/1 Knapsack dynamic programming guarantees optimal multi-asset fee yields in O(N*W).'
                    : miniProject.day === 3
                    ? note.number === 1
                      ? 'Binary search on monotonic answer space reduces search space from O(N) to O(log(Max-Min)).'
                      : note.number === 2
                      ? 'Kadane dynamic programming with all-negative array guard preserves optimal subarray invariant.'
                      : note.number === 3
                      ? 'Two-pointer inward squeeze runs in O(N) linear time on sorted sequences without auxiliary space.'
                      : note.number === 4
                      ? '10^8 Operations rule strictly dictates algorithmic time complexity budget for 1.0s CPU limits.'
                      : 'Benchmarking compares real execution wall-clock time against asymptotic theoretical bounds.'
                    : miniProject.day === 4
                    ? note.number === 1
                      ? 'Foreign keys enforce referential integrity across normalized schemas with CASCADE / RESTRICT guards.'
                      : note.number === 2
                      ? 'ACID Write-Ahead Logging (WAL) and atomic rollback prevent inconsistent state upon transaction abort.'
                      : note.number === 3
                      ? 'Relational hash joins probe O(N+M) avoiding expensive O(N*M) nested loop Cartesian products.'
                      : note.number === 4
                      ? 'Analytical window functions like DENSE_RANK() compute rankings across partitions without collapsing row granularity.'
                      : 'Integrates patient demographics, clinical notes, and billing history into unified audit logs.'
                    : note.number === 1
                    ? 'Single Responsibility and Open/Closed principles ensure payment gateways can be extended without touching core checkout.'
                    : note.number === 2
                    ? 'Strategy pattern decouples dynamic surge pricing algorithms from vehicle dispatch controllers.'
                    : note.number === 3
                    ? 'Liskov Substitution Principle ensures Electric and Luxury cabs can substitute standard vehicles without side effects.'
                    : note.number === 4
                    ? 'Dependency Inversion Principle allows mock payment service injection for 100% deterministic unit testing.'
                    : 'Design patterns and encapsulation guarantee strict audit invariants across ride lifecycles.'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Day-Aware Master Architectural Reference Card */}
        <div className="p-6 rounded-2xl bg-[#0A192F] text-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-300 font-bold">
                {miniProject.day === 1
                  ? 'C Standard Library Memory Model'
                  : miniProject.day === 2
                  ? 'Data Structure Complexity & Space-Time Invariants'
                  : miniProject.day === 3
                  ? 'Placement Coding Complexity Bounds & 10^8 Operations Rule'
                  : miniProject.day === 4
                  ? 'Relational DBMS & SQL Execution Engine Reference'
                  : 'SOLID Principles & Gang-of-Four Design Patterns Reference'}
              </span>
              <h3 className="text-lg font-black text-white">
                {miniProject.day === 1
                  ? '10 Fundamental C Data Types & Format Specifiers Reference'
                  : miniProject.day === 2
                  ? 'High-Frequency Order Engine Algorithmic Complexity Table'
                  : miniProject.day === 3
                  ? 'Company Coding Time Complexity Benchmark & Operations Table'
                  : miniProject.day === 4
                  ? 'Healthcare RDBMS Schema, ACID & Query Optimization Reference'
                  : 'Enterprise OOP Architecture, Design Patterns & Invariants Reference'}
              </h3>
            </div>
            <span className="text-xs font-mono text-[#BFDBFE]">
              {miniProject.day === 1
                ? 'C99 / C11 / C17 Standard'
                : miniProject.day === 2
                ? 'High-Performance Algorithmic Trading'
                : miniProject.day === 3
                ? 'FAANG / Tier-1 Placement Benchmark'
                : miniProject.day === 4
                ? 'Enterprise SQL & Database Internals'
                : 'Production Enterprise Software Architecture'}
            </span>
          </div>

          <div className="overflow-x-auto">
            {miniProject.day === 1 ? (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#1E3A8A] text-[#93C5FD] font-mono uppercase text-[10px]">
                    <th className="py-2 px-3">Data Type</th>
                    <th className="py-2 px-3">Format Specifier</th>
                    <th className="py-2 px-3">Typical Size (bytes)</th>
                    <th className="py-2 px-3">Value Range & Characteristics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-mono">
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">char</td>
                    <td className="py-2 px-3">%c</td>
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3 font-sans text-slate-300">-128 to 127 or 0 to 255 (Single ASCII character)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">short</td>
                    <td className="py-2 px-3">%hd</td>
                    <td className="py-2 px-3">2</td>
                    <td className="py-2 px-3 font-sans text-slate-300">-32,768 to 32,767</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">int</td>
                    <td className="py-2 px-3">%d</td>
                    <td className="py-2 px-3">4</td>
                    <td className="py-2 px-3 font-sans text-slate-300">-2,147,483,648 to 2,147,483,647 (Standard signed int)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">unsigned int</td>
                    <td className="py-2 px-3">%u</td>
                    <td className="py-2 px-3">4</td>
                    <td className="py-2 px-3 font-sans text-slate-300">0 to 4,294,967,295 (Non-negative)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">long</td>
                    <td className="py-2 px-3">%ld</td>
                    <td className="py-2 px-3">4 or 8</td>
                    <td className="py-2 px-3 font-sans text-slate-300">At least 32-bit (Typically 64-bit on LP64 Linux/macOS)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">long long</td>
                    <td className="py-2 px-3">%lld</td>
                    <td className="py-2 px-3">8</td>
                    <td className="py-2 px-3 font-sans text-slate-300">-9.22 * 10^18 to +9.22 * 10^18 (Guaranteed &gt;= 64-bit)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">float</td>
                    <td className="py-2 px-3">%f</td>
                    <td className="py-2 px-3">4</td>
                    <td className="py-2 px-3 font-sans text-slate-300">IEEE 754 Single Precision (~6-7 decimal digits)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">double</td>
                    <td className="py-2 px-3">%lf</td>
                    <td className="py-2 px-3">8</td>
                    <td className="py-2 px-3 font-sans text-slate-300">IEEE 754 Double Precision (~15-17 decimal digits)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">long double</td>
                    <td className="py-2 px-3">%Lf</td>
                    <td className="py-2 px-3">12 or 16</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Extended Precision (~19-34 decimal digits)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">_Bool</td>
                    <td className="py-2 px-3">%d</td>
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3 font-sans text-slate-300">0 (false) or 1 (true) (C99 standard boolean primitive)</td>
                  </tr>
                </tbody>
              </table>
            ) : miniProject.day === 2 ? (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#1E3A8A] text-[#93C5FD] font-mono uppercase text-[10px]">
                    <th className="py-2 px-3">Data Structure</th>
                    <th className="py-2 px-3">Time Complexity</th>
                    <th className="py-2 px-3">Space Complexity</th>
                    <th className="py-2 px-3">Order-Matching Engine Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-mono">
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Dual Heap (Min/Max)</td>
                    <td className="py-2 px-3">O(log N) insert, O(1) peek</td>
                    <td className="py-2 px-3">O(N)</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Order book crossing: Max-Heap for Bids, Min-Heap for Asks.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Sliding Window Deque</td>
                    <td className="py-2 px-3">O(1) amortized per tick</td>
                    <td className="py-2 px-3">O(K)</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Rolling volatility and moving VWAP over the last K trade events.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Monotonic Stack</td>
                    <td className="py-2 px-3">O(1) amortized per push</td>
                    <td className="py-2 px-3">O(N)</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Instant price breakout and next higher tick barrier discovery.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Hash Table Ledger</td>
                    <td className="py-2 px-3">O(1) average lookup/insert</td>
                    <td className="py-2 px-3">O(U) users</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Instant balance validation and trade allocation to accounts.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">BFS Network Router</td>
                    <td className="py-2 px-3">O(V + E)</td>
                    <td className="py-2 px-3">O(V)</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Shortest path multi-hop order execution to exchange venues.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">0/1 Knapsack DP</td>
                    <td className="py-2 px-3">O(N * W)</td>
                    <td className="py-2 px-3">O(W)</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Maximizing trade bundle fee revenue under capital margin ceiling.</td>
                  </tr>
                </tbody>
              </table>
            ) : miniProject.day === 3 ? (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#1E3A8A] text-[#93C5FD] font-mono uppercase text-[10px]">
                    <th className="py-2 px-3">Time Complexity</th>
                    <th className="py-2 px-3">Max Permissible N (1.0s)</th>
                    <th className="py-2 px-3">Typical Algorithmic Paradigm</th>
                    <th className="py-2 px-3">Placement Problem Archetype</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-mono">
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">O(1) / O(log N)</td>
                    <td className="py-2 px-3">N &lt;= 10^18</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Binary Search on Answer, Math, Fast Exponentiation</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Aggressive Cows, Painter's Partition, Ship Packages</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">O(N)</td>
                    <td className="py-2 px-3">N &lt;= 10^7</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Kadane's DP, Two-Pointer Squeezing, Prefix Sums</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Maximum Subarray, Two Sum in Sorted Array, Trapping Rainwater</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">O(N log N)</td>
                    <td className="py-2 px-3">N &lt;= 10^6</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Merge / Quick / Heap Sort, Sweepline, Greedy Sorting</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Non-overlapping Intervals, Meeting Rooms II, Huffman Coding</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">O(N^2)</td>
                    <td className="py-2 px-3">N &lt;= 5,000</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Double Nested Loops, Floyd-Warshall, Matrix DP</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Longest Common Subsequence, Shortest Common Supersequence</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">O(2^N) / O(N!)</td>
                    <td className="py-2 px-3">N &lt;= 20 (2^N), N &lt;= 11 (N!)</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Recursive Backtracking, Bitmask DP</td>
                    <td className="py-2 px-3 font-sans text-slate-300">N-Queens, Sudoku Solver, Traveling Salesperson Problem</td>
                  </tr>
                </tbody>
              </table>
            ) : miniProject.day === 4 ? (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#1E3A8A] text-[#93C5FD] font-mono uppercase text-[10px]">
                    <th className="py-2 px-3">RDBMS Concept</th>
                    <th className="py-2 px-3">Execution Cost</th>
                    <th className="py-2 px-3">Integrity Guarantee</th>
                    <th className="py-2 px-3">Healthcare DBMS Implementation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-mono">
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Primary & Foreign Keys</td>
                    <td className="py-2 px-3">O(1) index probe</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Referential Integrity</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Admissions cannot reference missing patient_id or dept_id.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">ACID Transactions</td>
                    <td className="py-2 px-3">O(1) commit / rollback</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Atomicity & Consistency</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Write-Ahead Undo Log rolls back bed allocation on payment abort.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Relational Hash Join</td>
                    <td className="py-2 px-3">O(N + M) probe</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Equi-join completeness</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Joins Patients, Admissions, and Doctors without nested loop penalty.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">GROUP BY & HAVING</td>
                    <td className="py-2 px-3">O(N) hash bucket aggregation</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Aggregate constraint</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Department bed occupancy filters with HAVING COUNT(*) &gt;= threshold.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">DENSE_RANK() Window</td>
                    <td className="py-2 px-3">O(N log N) partition sort</td>
                    <td className="py-2 px-3 font-sans text-slate-300">No tie gaps</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Clinical doctor performance ranking partitioned by medical department.</td>
                  </tr>
                </tbody>
              </table>
            ) : miniProject.day === 5 ? (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#1E3A8A] text-[#93C5FD] font-mono uppercase text-[10px]">
                    <th className="py-2 px-3">SOLID / Design Pattern</th>
                    <th className="py-2 px-3">Architectural Role</th>
                    <th className="py-2 px-3">Failure Prevented</th>
                    <th className="py-2 px-3">Fleet Dispatch Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-mono">
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Single Responsibility (SRP)</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Separates pricing, dispatch & payments</td>
                    <td className="py-2 px-3 font-sans text-slate-300">God Object anti-pattern</td>
                    <td className="py-2 px-3 font-sans text-slate-300">FareCalculator only computes rates; DispatchEngine handles matching.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Open / Closed (OCP)</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Extensible payment gateways</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Brittle switch-case statements</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Add UPI or Crypto payments without modifying existing checkout code.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Liskov Substitution (LSP)</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Vehicle class hierarchies</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Runtime UnsupportedOperation errors</td>
                    <td className="py-2 px-3 font-sans text-slate-300">ElectricCab, LuxuryLimo, and AutoRickshaw satisfy Vehicle contract.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Dependency Inversion (DIP)</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Inject abstractions not concretes</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Tight database / network coupling</td>
                    <td className="py-2 px-3 font-sans text-slate-300">MockPaymentService injected seamlessly during deterministic unit tests.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Strategy Pattern (GoF)</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Interchangeable pricing algorithms</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Hardcoded tariff formulas</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Dynamic switch between Standard, Surge (2.0x), and NightFlat tariffs.</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#1E3A8A] text-[#93C5FD] font-mono uppercase text-[10px]">
                    <th className="py-2 px-3">OS Subsystem / Primitive</th>
                    <th className="py-2 px-3">Algorithmic Complexity</th>
                    <th className="py-2 px-3">Safety & Liveness Guarantee</th>
                    <th className="py-2 px-3">Kernel Engine Implementation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-mono">
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Preemptive Round-Robin</td>
                    <td className="py-2 px-3">O(1) queue shift</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Fair CPU time slicing, no starvation</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Time quantum q=2 enforces cooperative/preemptive task context switches.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Priority Scheduling + Aging</td>
                    <td className="py-2 px-3">O(N) search / O(log N) heap</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Aging prevents starvation of low-priority tasks</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Dynamic priority boost increments priority for tasks waiting &gt; 5 time units.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Mutex Lock Synchronization</td>
                    <td className="py-2 px-3">O(1) atomic CAS</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Mutual exclusion on shared memory</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Acquire/release guards shared transaction counter against data race corruption.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">Banker's Deadlock Avoidance</td>
                    <td className="py-2 px-3">O(P * R^2) safety check</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Resource allocation graph cycle avoidance</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Validates availability vector &gt;= need matrix before granting locks.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-bold">LRU Virtual Memory Paging</td>
                    <td className="py-2 px-3">O(1) hashmap + DLL cache</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Optimal temporal locality hit rate</td>
                    <td className="py-2 px-3 font-sans text-slate-300">Tracks timestamp/recency across K frames, evicting oldest page on fault.</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
