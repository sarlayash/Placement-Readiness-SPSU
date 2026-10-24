/**
 * SPSU Udaipur - Placement Readiness Portal
 * Push Notifications & Automatic Reminders System
 * Powered by Mentor Kapil
 */

export interface AppReminder {
  id: string;
  title: string;
  message: string;
  type: 'pre-assessment' | 'post-assessment' | 'schedule' | 'badge' | 'system';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  targetDay?: number;
  priority: 'high' | 'normal';
}

const STORAGE_KEY_NOTIF_PREF = 'spsu_push_notifications_enabled_v1';
const STORAGE_KEY_REMINDERS = 'spsu_stored_reminders_v1';
const STORAGE_KEY_LAST_REMINDER_TIME = 'spsu_last_auto_reminder_ts_v1';

/**
 * Checks if the browser supports native HTML5 Web Notifications.
 */
export function isPushNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Gets the current browser notification permission status.
 */
export function getPushPermissionStatus(): NotificationPermission | 'unsupported' {
  if (!isPushNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

/**
 * Requests native browser Push Notification permission from the user.
 */
export async function requestPushPermission(): Promise<boolean> {
  if (!isPushNotificationSupported()) {
    console.warn('Native Push Notifications are not supported in this browser environment.');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      localStorage.setItem(STORAGE_KEY_NOTIF_PREF, 'true');
      
      // Dispatch welcome push notification
      sendNativePushNotification(
        '🔔 SPSU Placement Reminders Active',
        'Automatic reminders enabled! You will receive alerts for 09:00 AM Diagnostic & 02:30 PM Verification sessions (80% Passing threshold).'
      );
      
      addInAppReminder({
        id: `rem-welcome-${Date.now()}`,
        title: '🔔 Push Notifications Enabled',
        message: 'Daily automated reminders are now active for SPSU Placement Readiness assessments.',
        type: 'system',
        timestamp: new Date().toISOString(),
        read: false,
        priority: 'high',
      });

      return true;
    } else {
      localStorage.setItem(STORAGE_KEY_NOTIF_PREF, 'false');
      return false;
    }
  } catch (err) {
    console.error('Error requesting notification permission:', err);
    return false;
  }
}

/**
 * Sends a native browser push notification if permission is granted.
 */
export function sendNativePushNotification(title: string, body: string, iconUrl?: string): void {
  if (!isPushNotificationSupported()) return;
  if (Notification.permission !== 'granted') return;

  try {
    const notif = new Notification(title, {
      body,
      icon: iconUrl || 'https://sarlayash.github.io/Placement-Readiness-SPSU/mentor-kapil.jpg',
      badge: 'https://sarlayash.github.io/Placement-Readiness-SPSU/mentor-kapil.jpg',
      tag: 'spsu-placement-reminder',
    });

    notif.onclick = () => {
      window.focus();
      notif.close();
    };
  } catch (err) {
    console.warn('Could not dispatch native notification:', err);
  }
}

/**
 * Loads stored in-app reminders.
 */
export function loadInAppReminders(): AppReminder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REMINDERS);
    if (!raw) return getDefaultReminders();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : getDefaultReminders();
  } catch {
    return getDefaultReminders();
  }
}

/**
 * Saves in-app reminders to localStorage.
 */
export function saveInAppReminders(reminders: AppReminder[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_REMINDERS, JSON.stringify(reminders));
  } catch (err) {
    console.warn('Could not save reminders:', err);
  }
}

/**
 * Adds a new in-app reminder.
 */
export function addInAppReminder(reminder: AppReminder): AppReminder[] {
  const current = loadInAppReminders();
  // Avoid duplicate reminders with exact same title within 1 hour
  const isDuplicate = current.some(
    (r) => r.title === reminder.title && Math.abs(new Date(r.timestamp).getTime() - new Date(reminder.timestamp).getTime()) < 3600000
  );
  if (isDuplicate) return current;

  const updated = [reminder, ...current].slice(0, 30); // keep last 30
  saveInAppReminders(updated);
  return updated;
}

/**
 * Default starter reminders for all learners.
 */
function getDefaultReminders(): AppReminder[] {
  return [
    {
      id: 'rem-pass-score-notice',
      title: '🎯 Passing Benchmark: 80% Required',
      message: 'Mentor Kapil Announcement: Passing score for both Pre-Assessment and Post-Assessment is strictly 80% (40/50 MCQs correct) to guarantee top placement qualification.',
      type: 'system',
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'high',
    },
    {
      id: 'rem-daily-pre-1',
      title: '⏰ Day 1 & Day 2 Diagnostic Pre-Assessments',
      message: 'Complete your Diagnostic Pre-Assessment (30% Theory / 70% Practical Execution & Trace) before starting the IDE lab.',
      type: 'pre-assessment',
      timestamp: new Date().toISOString(),
      read: false,
      targetDay: 1,
      priority: 'high',
    },
    {
      id: 'rem-schedule-sessions',
      title: '📅 Daily Routine: 09:00 AM & 02:30 PM',
      message: 'Join daily scheduled sessions: 09:00 AM Diagnostic Benchmark, 09:30 AM Theory Architecture, 11:00 AM Practical IDE Lab, 02:30 PM Verification Assessment.',
      type: 'schedule',
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'normal',
    },
  ];
}

/**
 * Evaluates learner progress and triggers automatic reminders.
 * Call this periodically (e.g. on route change, user login, or 60s interval).
 */
export function checkAndTriggerAutomaticReminders(
  day: number,
  preScore?: number,
  postScore?: number,
  prePassed?: boolean,
  postPassed?: boolean
): AppReminder | null {
  const now = Date.now();
  const lastCheck = parseInt(localStorage.getItem(STORAGE_KEY_LAST_REMINDER_TIME) || '0', 10);

  // Throttle automatic reminder generation to at most once every 10 minutes
  if (now - lastCheck < 600000) {
    return null;
  }
  localStorage.setItem(STORAGE_KEY_LAST_REMINDER_TIME, String(now));

  let generated: AppReminder | null = null;

  if (preScore === undefined || !prePassed) {
    const isRetake = preScore !== undefined && preScore < 80;
    const title = isRetake
      ? `⚠️ Day ${day} Pre-Assessment Needs Retake (${preScore}% < 80%)`
      : `⏰ Day ${day} Diagnostic Pre-Assessment Pending`;
    const message = isRetake
      ? `Your recorded score is ${preScore}%. Retake the Day ${day} Diagnostic Pre-Assessment to reach the 80% passing benchmark.`
      : `Day ${day} Pre-Assessment is awaiting your attempt. Score 80%+ to benchmark your concepts.`;

    generated = {
      id: `rem-auto-pre-${day}-${now}`,
      title,
      message,
      type: 'pre-assessment',
      timestamp: new Date().toISOString(),
      read: false,
      targetDay: day,
      priority: 'high',
    };
  } else if (postScore === undefined || !postPassed) {
    const isRetake = postScore !== undefined && postScore < 80;
    const title = isRetake
      ? `⚠️ Day ${day} Post-Assessment Needs Retake (${postScore}% < 80%)`
      : `🏆 Day ${day} Post-Assessment & Badge Pending`;
    const message = isRetake
      ? `Your verified score is ${postScore}%. Retake the Day ${day} Post-Assessment to score 80%+ and unlock your official Day ${day} Badge.`
      : `Day ${day} Post-Assessment is ready! Pass with 80%+ to unlock your verifiable badge and PDF certificate.`;

    generated = {
      id: `rem-auto-post-${day}-${now}`,
      title,
      message,
      type: 'post-assessment',
      timestamp: new Date().toISOString(),
      read: false,
      targetDay: day,
      priority: 'high',
    };
  }

  if (generated) {
    addInAppReminder(generated);
    sendNativePushNotification(generated.title, generated.message);
  }

  return generated;
}
