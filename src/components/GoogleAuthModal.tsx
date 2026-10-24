import React, { useState } from 'react';
import { GoogleUser } from '../types';
import { signInWithGooglePopup } from '../utils/firebase';
import { ShieldCheck, X, AlertCircle, ArrowRight } from 'lucide-react';

interface GoogleAuthModalProps {
  onSuccess: (user: GoogleUser) => void;
  onClose: () => void;
}

function describeAuthError(code: string): string {
  const host = typeof window !== 'undefined' ? window.location.hostname : 'this domain';
  switch (code) {
    case 'auth/unauthorized-domain':
      return `Google Sign-In is not yet authorised for "${host}". The portal administrator must add "${host}" in Firebase Console → Authentication → Settings → Authorized domains. Meanwhile, use the official portal at placement-readiness-spsu.web.app.`;
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'The Google window was closed before sign-in finished. Please click the button again and choose your Google account.';
    case 'auth/popup-blocked':
      return 'Your browser blocked the Google popup. Redirecting you to Google instead…';
    case 'auth/network-request-failed':
      return 'Network error while contacting Google. Check your internet connection and try again.';
    case 'auth/operation-not-allowed':
      return 'Google sign-in is disabled for this project. The administrator must enable the Google provider in Firebase Console → Authentication → Sign-in method.';
    case 'auth/internal-error':
      return 'Google returned an internal error. If you use strict privacy/tracking blockers or third-party-cookie blocking, allow accounts.google.com and try again.';
    default:
      return `Google Sign-In failed${code ? ` (${code})` : ''}. Please try again.`;
  }
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({ onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setNotice(null);
    try {
      const user = await signInWithGooglePopup();
      if (user && user.email) {
        onSuccess(user);
      } else {
        setNotice('Your Google account did not share an email address. Please use a Google account with a verified email.');
      }
    } catch (err: unknown) {
      console.warn('Google Sign-In error:', err);
      const code = (err as { code?: string })?.code || '';
      setNotice(describeAuthError(code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/80 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white border-2 border-[#0A192F] shadow-2xl overflow-hidden text-[#0A192F]">
        <div className="bg-[#0A192F] text-white px-6 py-5 flex items-center justify-between border-b border-[#1E3A8A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white text-[#0A192F] font-black flex items-center justify-center text-lg">
              K
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Sign Up / Sign In with Google</h2>
              <p className="text-[11px] text-[#BFDBFE]">SPSU Udaipur • Mentorship By Kapil</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-[#BFDBFE] hover:text-white hover:bg-[#1E3A8A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#1E3A8A]/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-[#0A192F] block mb-0.5">Google accounts only</strong>
              Your first Google sign-in creates your learner account automatically. Your name and email from Google appear on your Daily Badges and the Certificate signed by <strong>Kapil</strong>.
            </div>
          </div>

          {notice && (
            <div role="alert" className="p-3 rounded-xl bg-[#EFF6FF] border border-[#1E3A8A] text-xs text-[#0A192F] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
              <span>{notice}</span>
            </div>
          )}

          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold text-sm transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>{loading ? 'Waiting for Google…' : 'Continue with Google'}</span>
            {!loading && <ArrowRight className="w-4 h-4 ml-1 opacity-70" />}
          </button>
        </div>
      </div>
    </div>
  );
};
