import React, { useState, useEffect } from 'react';
import { AppReminder, loadInAppReminders, saveInAppReminders, requestPushPermission, getPushPermissionStatus, sendNativePushNotification } from '../utils/pushNotifications';
import {
  Bell,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  Info,
  ShieldAlert,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDay: (day: number, tab?: 'notes' | 'ide' | 'pre' | 'post') => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  onSelectDay,
}) => {
  const [reminders, setReminders] = useState<AppReminder[]>([]);
  const [pushStatus, setPushStatus] = useState<string>('default');
  const [pushLoading, setPushLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setReminders(loadInAppReminders());
      setPushStatus(getPushPermissionStatus());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    const updated = reminders.map((r) => ({ ...r, read: true }));
    setReminders(updated);
    saveInAppReminders(updated);
  };

  const handleClearAll = () => {
    setReminders([]);
    saveInAppReminders([]);
  };

  const handleEnablePush = async () => {
    setPushLoading(true);
    try {
      const granted = await requestPushPermission();
      setPushStatus(granted ? 'granted' : 'denied');
      setReminders(loadInAppReminders());
    } finally {
      setPushLoading(false);
    }
  };

  const handleTestPush = () => {
    sendNativePushNotification(
      '🔔 SPSU Placement Portal Reminder',
      'Reminder: Both Pre & Post Assessments require strictly 80%+ passing score to verify mastery.'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border-2 border-[#0A192F] shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#0A192F] text-white p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#1E3A8A]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 text-[#93C5FD]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                Automatic Reminders & Alerts
              </h3>
              <p className="text-xs text-[#BFDBFE]">
                Daily Diagnostic (09:00 AM) & Verification (02:30 PM) Sessions
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#112240] hover:bg-[#1E3A8A] text-[#BFDBFE] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Push Notification Bar */}
        <div className="p-3.5 bg-amber-50 border-b border-amber-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-900 font-medium">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {pushStatus === 'granted'
                ? 'Browser Push Reminders Active (80% Passing Alerts)'
                : 'Enable Browser Push for automatic assessment alerts'}
            </span>
          </div>

          {pushStatus === 'granted' ? (
            <button
              type="button"
              onClick={handleTestPush}
              className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] transition-all cursor-pointer shrink-0"
            >
              Test Push
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEnablePush}
              disabled={pushLoading}
              className="px-3 py-1 rounded-lg bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold text-[11px] transition-all cursor-pointer shrink-0"
            >
              {pushLoading ? 'Enabling...' : 'Enable Push'}
            </button>
          )}
        </div>

        {/* Reminder List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {reminders.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Bell className="w-10 h-10 mx-auto text-slate-300" />
              <div className="text-xs font-bold text-slate-600">No active reminders</div>
              <p className="text-[11px]">All daily routines and assessment alerts are up to date.</p>
            </div>
          ) : (
            reminders.map((rem) => (
              <div
                key={rem.id}
                className={`p-3.5 rounded-2xl border text-xs transition-all space-y-1.5 ${
                  rem.priority === 'high'
                    ? 'bg-amber-50/70 border-amber-300 text-amber-950'
                    : 'bg-[#F8FAFC] border-slate-200 text-[#0A192F]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-extrabold text-xs flex items-center gap-1.5">
                    {rem.priority === 'high' ? (
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    ) : (
                      <Info className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" />
                    )}
                    <span>{rem.title}</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(rem.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {rem.message}
                </p>

                {rem.targetDay && (
                  <div className="pt-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectDay(rem.targetDay!, rem.type === 'pre-assessment' ? 'pre' : rem.type === 'post-assessment' ? 'post' : 'notes');
                      }}
                      className="px-2.5 py-1 rounded-md bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold text-[10px] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Go to Day {rem.targetDay}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="text-[#1E3A8A] hover:underline font-bold text-[11px] cursor-pointer"
            >
              Mark all read
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-red-600 hover:underline font-bold text-[11px] cursor-pointer"
            >
              Clear all
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0A192F] hover:bg-[#1E3A8A] text-white font-bold text-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
