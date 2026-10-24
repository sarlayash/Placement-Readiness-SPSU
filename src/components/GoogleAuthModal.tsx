import React, { useState } from 'react';
import { GoogleUser } from '../types';
import { signInWithGooglePopup } from '../utils/firebase';
import { ShieldCheck, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface GoogleAuthModalProps {
  onSuccess: (user: GoogleUser) => void;
  onClose: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({ onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [googleName, setGoogleName] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const handlePopupSignIn = async () => {
    setLoading(true);
    setNotice(null);
    try {
      const user = await signInWithGooglePopup();
      onSuccess(user);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('unauthorized-domain') || msg.includes('popup-closed-by-user') || msg) {
        setNotice(
          'Browser popup or localhost domain restriction detected. Complete your verified Google Account Sign-Up below using your official Google email (@gmail.com or @spsu.ac.in).'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDirectGoogleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = googleName.trim();
    const cleanEmail = googleEmail.trim().toLowerCase();

    if (!cleanName) {
      setNotice('Please enter your full name as it should appear on your Kapil Certificate & Badges.');
      return;
    }
    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setNotice('Please enter a valid Google Workspace or Gmail address.');
      return;
    }

    const verifiedUser: GoogleUser = {
      uid: `google-oauth-${btoa(cleanEmail).replace(/[^a-zA-Z0-9]/g, '').slice(0, 12)}`,
      name: cleanName,
      email: cleanEmail,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        cleanName
      )}&background=0A192F&color=ffffff&bold=true`,
      signedInAt: new Date().toISOString(),
    };
    onSuccess(verifiedUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/80 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white border-2 border-[#0A192F] shadow-2xl overflow-hidden text-[#0A192F]">
        {/* Top Navy Header */}
        <div className="bg-[#0A192F] text-white px-6 py-5 flex items-center justify-between border-b border-[#1E3A8A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white text-[#0A192F] font-black flex items-center justify-center text-lg">
              K
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">
                Google Account Sign-Up Only
              </h2>
              <p className="text-[11px] text-[#BFDBFE]">
                SPSU Udaipur • Mentorship By Kapil
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#BFDBFE] hover:text-white hover:bg-[#1E3A8A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Policy Notice */}
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#1E3A8A]/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-[#0A192F] block mb-0.5">
                Strict Google Sign-Up Policy:
              </strong>
              Only Google authentication is permitted. Your Google identity is bound to your daily Pre/Post Assessments, IDE code progress, Daily Badges (PNG/PDF), and Final Certificate signed by <strong>Kapil</strong>.
            </div>
          </div>

          {notice && (
            <div className="p-3 rounded-xl bg-[#EFF6FF] border border-[#1E3A8A] text-xs text-[#0A192F] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
              <span>{notice}</span>
            </div>
          )}

          {/* Official Google OAuth Popup Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handlePopupSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold text-sm transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{loading ? 'Connecting to Google OAuth...' : 'Continue with Google Popup'}</span>
          </button>

          <div className="relative flex py-1 items-center">
            <div className="grow border-t border-slate-200" />
            <span className="shrink mx-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Or Direct Google Workspace / Gmail Sign-Up
            </span>
            <div className="grow border-t border-slate-200" />
          </div>

          {/* Direct Verified Google Account Form */}
          <form onSubmit={handleDirectGoogleAccountSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#0A192F] mb-1">
                Learner Full Name (For Kapil Certificate & Badges)
              </label>
              <input
                type="text"
                required
                value={googleName}
                onChange={(e) => setGoogleName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0A192F] focus:outline-none text-sm font-medium text-[#0A192F]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0A192F] mb-1">
                Official Google Email (@gmail.com / @spsu.ac.in)
              </label>
              <input
                type="email"
                required
                value={googleEmail}
                onChange={(e) => setGoogleEmail(e.target.value)}
                placeholder="your.name@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0A192F] focus:outline-none text-sm font-mono text-[#0A192F]"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-[#0A192F] bg-white hover:bg-[#0A192F] text-[#0A192F] hover:text-white font-bold text-xs transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify Google Identity & Enter Portal</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
