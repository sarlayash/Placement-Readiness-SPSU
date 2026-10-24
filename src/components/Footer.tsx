import React from 'react';
import { Award, FileCheck2, ShieldCheck, Code2, GraduationCap, CheckCircle, Lock } from 'lucide-react';
import { LiveDateTime } from './LiveDateTime';

interface FooterProps {
  onOpenBadges: () => void;
  onOpenCertificate: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBadges, onOpenCertificate, onOpenAdmin }) => {
  return (
    <footer className="bg-[#0A192F] text-white border-t-2 border-[#1E3A8A] mt-auto">
      {/* Top Banner with Real Date & Time and Verification Badge */}
      <div className="border-b border-[#1E3A8A]/60 bg-[#081426] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          {/* Live Date and Time */}
          <LiveDateTime variant="footer" />

          {/* Genuine Signature Verification */}
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Official Mentorship By Kapil • Sole Accredited Signatory</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white text-[#0A192F] font-black text-xl flex items-center justify-center border border-[#93C5FD]">
                K
              </div>
              <div>
                <div className="font-extrabold text-sm text-white">SPSU Udaipur</div>
                <div className="text-[11px] font-mono font-bold text-[#93C5FD]">
                  Mentorship By Kapil
                </div>
              </div>
            </div>
            <p className="text-[#BFDBFE] leading-relaxed text-[11px]">
              Complete 10-Day Placement Readiness & Technical Assessment Portal. Aligned across 11 syllabus modules with 30% Theory and 70% Practical execution.
            </p>
          </div>

          {/* Col 2: Architecture & Format */}
          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#93C5FD]" />
              <span>Languages & IDE</span>
            </div>
            <ul className="space-y-1.5 text-[#BFDBFE] text-[11px]">
              <li>• C (C99/C11 Standard Syntax & Tracing)</li>
              <li>• C++ (C++17 STL & Memory Management)</li>
              <li>• Java (JDK 17 OOP & Collections)</li>
              <li>• Python (Python 3.11 Idioms & Complexity)</li>
              <li>• Embedded Multi-Language IDE Sandbox</li>
            </ul>
          </div>

          {/* Col 3: Curriculum Milestones */}
          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#93C5FD]" />
              <span>10-Day Pathway</span>
            </div>
            <ul className="space-y-1.5 text-[#BFDBFE] text-[11px]">
              <li>• Days 1–3: Fundamentals, DSA & Coding Lab</li>
              <li>• Days 4–6: SQL, OOP & Operating Systems</li>
              <li>• Days 7–8: Computer Networks & Dev Tools</li>
              <li>• Days 9–10: Web Projects & Placement Prep</li>
              <li>• 30% Theory (90m) + 70% Practical (210m)</li>
            </ul>
          </div>

          {/* Col 4: Credentials & Downloads */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Learner Credentials</span>
            </div>
            <p className="text-[#BFDBFE] text-[11px] leading-relaxed">
              Earn official Daily Badges and the Final Placement Readiness Certificate. Only real learner scores and verified Google accounts are recorded.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={onOpenBadges}
                className="px-2.5 py-1 rounded-lg bg-[#112240] hover:bg-[#1E3A8A] text-[#BFDBFE] hover:text-white border border-[#1E3A8A] text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Award className="w-3 h-3 text-amber-400" />
                <span>Daily Badges (PNG/PDF)</span>
              </button>
              <button
                type="button"
                onClick={onOpenCertificate}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#EFF6FF] text-[#0A192F] text-[11px] font-black transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <FileCheck2 className="w-3 h-3 text-[#1E3A8A]" />
                <span>Kapil Certificate</span>
              </button>
              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="px-2.5 py-1 rounded-lg bg-[#112240] hover:bg-[#1E3A8A] text-amber-300 hover:text-white border border-amber-400/40 text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                  title="Administrator Portal"
                >
                  <Lock className="w-3 h-3 text-amber-300" />
                  <span>Admin</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Policy Strip */}
        <div className="pt-6 border-t border-[#1E3A8A] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#BFDBFE]">
          <div className="flex items-center gap-2">
            <span>© 2026 SPSU Udaipur Placement Readiness</span>
            <span>•</span>
            <span className="text-white font-bold">Mentorship By Kapil</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-300">
              <CheckCircle className="w-3 h-3" />
              <span>Strict Google OAuth Only</span>
            </span>
            <span>•</span>
            <span>No Fake or Dummy Statistics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
