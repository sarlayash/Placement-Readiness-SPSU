import React, { useState } from 'react';
import { Lock, ShieldCheck, X, AlertCircle, ArrowRight } from 'lucide-react';

interface AdminLoginModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onSuccess, onClose }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      // Secure Admin Verification (Credentials strictly confidential - never displayed on screen)
      if (adminId.trim() === 'KAPILADMIN' && password === 'ADMIN123') {
        setIsLoading(false);
        onSuccess();
      } else {
        setIsLoading(false);
        setErrorMessage('Authentication failed. Invalid Admin ID or Password.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/85 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white border-2 border-[#0A192F] shadow-2xl overflow-hidden text-[#0A192F]">
        {/* Header */}
        <div className="bg-[#0A192F] text-white px-6 py-5 flex items-center justify-between border-b border-[#1E3A8A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-[#0A192F] flex items-center justify-center font-black">
              <Lock className="w-5 h-5 text-[#0A192F]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Admin Authentication</h2>
              <p className="text-[11px] text-[#BFDBFE]">SPSU Placement Readiness Portal</p>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#1E3A8A]/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-[#0A192F] block mb-0.5">Authorized Personnel Only</strong>
              Sign in with your verified administrative credentials to inspect registered Firebase users, review login records, and export daily assessment scores.
            </div>
          </div>

          {errorMessage && (
            <div role="alert" className="p-3 rounded-xl bg-red-50 border border-red-300 text-xs text-red-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold text-[#0A192F] uppercase">
              Admin ID
            </label>
            <input
              type="text"
              required
              autoFocus
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="Enter Admin ID"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#1E3A8A] text-sm font-medium"
              autoComplete="off"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold text-[#0A192F] uppercase">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#1E3A8A] text-sm font-medium"
              autoComplete="off"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold text-sm transition-all cursor-pointer shadow-md disabled:opacity-60"
            >
              <Lock className="w-4 h-4 text-amber-300" />
              <span>{isLoading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
