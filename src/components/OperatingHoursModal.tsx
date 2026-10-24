import React, { useState, useEffect } from 'react';
import {
  Clock,
  Lock,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Key,
} from 'lucide-react';
import {
  checkOperatingHours,
  formatCountdown,
  setEvaluatorOverride,
  OperatingHoursStatus,
  OPERATING_HOURS_START,
  OPERATING_HOURS_END,
} from '../utils/operatingHours';

interface OperatingHoursModalProps {
  onAdminClick: () => void;
  onOverrideToggle: (active: boolean) => void;
}

export const OperatingHoursModal: React.FC<OperatingHoursModalProps> = ({
  onAdminClick,
  onOverrideToggle,
}) => {
  const [status, setStatus] = useState<OperatingHoursStatus>(() => checkOperatingHours());

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(checkOperatingHours());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // If portal is open or overridden, do not render this blocking modal
  if (status.isOpen) {
    return null;
  }

  const { hours, minutes, seconds } = formatCountdown(status.countdownSeconds);

  const handleBypass = () => {
    setEvaluatorOverride(true);
    setStatus(checkOperatingHours());
    onOverrideToggle(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/95 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border-4 border-[#0A192F] shadow-2xl overflow-hidden my-8">
        {/* Top Header */}
        <div className="bg-[#0A192F] text-white p-6 sm:p-8 text-center relative overflow-hidden border-b-4 border-[#1E3A8A]">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-mono font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>OFFICIAL OPERATING HOURS: 09:00 AM – 09:00 PM IST</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Portal Closed for Overnight Revision
            </h2>

            <p className="text-xs sm:text-sm text-[#BFDBFE] max-w-lg mx-auto">
              SPSU Udaipur Placement Readiness Program operates daily from <strong>09:00 AM to 09:00 PM IST</strong> to instill disciplined industry work habits.
            </p>
          </div>
        </div>

        {/* Live Countdown & Operational Timetable */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Countdown Clock Display */}
          <div className="p-5 rounded-2xl bg-[#0A192F] text-white text-center space-y-3 shadow-inner">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#93C5FD]">
              Countdown to Daily Reopening (09:00 AM IST)
            </div>

            <div className="flex items-center justify-center gap-3 font-mono font-black">
              <div className="bg-[#112240] border border-[#1E3A8A] rounded-xl px-4 py-2.5 min-w-[70px]">
                <div className="text-2xl sm:text-4xl text-amber-400">{hours}</div>
                <div className="text-[10px] text-slate-400 uppercase">Hours</div>
              </div>
              <span className="text-2xl sm:text-4xl text-slate-400">:</span>
              <div className="bg-[#112240] border border-[#1E3A8A] rounded-xl px-4 py-2.5 min-w-[70px]">
                <div className="text-2xl sm:text-4xl text-amber-400">{minutes}</div>
                <div className="text-[10px] text-slate-400 uppercase">Minutes</div>
              </div>
              <span className="text-2xl sm:text-4xl text-slate-400">:</span>
              <div className="bg-[#112240] border border-[#1E3A8A] rounded-xl px-4 py-2.5 min-w-[70px]">
                <div className="text-2xl sm:text-4xl text-amber-400">{seconds}</div>
                <div className="text-[10px] text-slate-400 uppercase">Seconds</div>
              </div>
            </div>

            <div className="text-[11px] text-[#BFDBFE] font-mono">
              Current Live Time: {status.formattedCurrentTime} IST
            </div>
          </div>

          {/* Daily Schedule Overview */}
          <div className="rounded-2xl border-2 border-slate-200 p-4 space-y-3 bg-slate-50">
            <div className="text-xs font-mono font-bold uppercase text-[#0A192F] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#1E3A8A]" />
              <span>Daily Placement Protocol Schedule</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-0.5">
                <div className="font-mono font-bold text-emerald-800">09:00 AM – 09:30 AM</div>
                <div className="font-bold text-[#0A192F]">Diagnostic Pre-Assessment</div>
                <div className="text-[11px] text-slate-500">50 MCQs (80% passing benchmark)</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-0.5">
                <div className="font-mono font-bold text-[#1E3A8A]">09:30 AM – 11:00 AM</div>
                <div className="font-bold text-[#0A192F]">Theory & Architecture (30%)</div>
                <div className="text-[11px] text-slate-500">Core notes & complexity proofs</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-0.5">
                <div className="font-mono font-bold text-purple-800">11:00 AM – 02:30 PM</div>
                <div className="font-bold text-[#0A192F]">Practical IDE Lab (70%)</div>
                <div className="text-[11px] text-slate-500">10 Solved problems across 4 languages</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-0.5">
                <div className="font-mono font-bold text-amber-800">02:30 PM – 09:00 PM</div>
                <div className="font-bold text-[#0A192F]">Verification & Lab Practice</div>
                <div className="text-[11px] text-slate-500">Post-tests, badges & code tracing</div>
              </div>
            </div>
          </div>

          {/* Mentor Kapil Guidance Note */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase font-mono">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Note from Mentor Kapil (SPSU Udaipur)</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              "Dear Students, disciplined rest and evening synthesis are critical for peak cognitive performance during technical placement assessments. Review today’s notes, verify edge cases in your head, get sound sleep, and be ready at <strong>09:00 AM sharp</strong> for tomorrow's diagnostic evaluation!"
            </p>
          </div>

          {/* Action Buttons: Admin Login & Evaluator Override */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onAdminClick}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <Key className="w-3.5 h-3.5 text-amber-300" />
              <span>Admin / Faculty Login</span>
            </button>

            <button
              type="button"
              onClick={handleBypass}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evaluator Demo Override (Bypass Gate)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
