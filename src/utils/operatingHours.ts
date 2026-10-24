/**
 * Daily Operating Hours Manager for SPSU Placement Readiness Portal
 * Operating Window: 09:00 AM to 09:00 PM (IST) Daily
 * Mentor: Kapil (SPSU Udaipur)
 */

export const OPERATING_HOURS_START = 9;  // 09:00 AM
export const OPERATING_HOURS_END = 21;   // 09:00 PM (21:00)

const OVERRIDE_STORAGE_KEY = 'spsu_hours_evaluator_override_v1';

export interface OperatingHoursStatus {
  isOpen: boolean;
  currentHour: number;
  currentMinute: number;
  formattedCurrentTime: string;
  nextOpenTime: Date;
  countdownSeconds: number;
  isOverridden: boolean;
  message: string;
}

export function isEvaluatorOverrideActive(): boolean {
  try {
    return sessionStorage.getItem(OVERRIDE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setEvaluatorOverride(active: boolean): void {
  try {
    if (active) {
      sessionStorage.setItem(OVERRIDE_STORAGE_KEY, 'true');
    } else {
      sessionStorage.removeItem(OVERRIDE_STORAGE_KEY);
    }
  } catch (err) {
    console.warn('Could not persist operating hours override:', err);
  }
}

export function checkOperatingHours(): OperatingHoursStatus {
  const isOverridden = isEvaluatorOverrideActive();
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Portal is open between 9:00 AM and 8:59:59 PM (i.e. hours 9 to 20 inclusive)
  const isWithinWindow = currentHour >= OPERATING_HOURS_START && currentHour < OPERATING_HOURS_END;
  const isOpen = isOverridden || isWithinWindow;

  // Calculate next opening time at 09:00 AM
  const nextOpen = new Date(now);
  if (currentHour >= OPERATING_HOURS_END) {
    // Reopens tomorrow morning at 09:00 AM
    nextOpen.setDate(nextOpen.getDate() + 1);
    nextOpen.setHours(OPERATING_HOURS_START, 0, 0, 0);
  } else if (currentHour < OPERATING_HOURS_START) {
    // Opens today morning at 09:00 AM
    nextOpen.setHours(OPERATING_HOURS_START, 0, 0, 0);
  } else {
    // Currently open, next cycle is tomorrow at 09:00 AM
    nextOpen.setDate(nextOpen.getDate() + 1);
    nextOpen.setHours(OPERATING_HOURS_START, 0, 0, 0);
  }

  const diffMs = nextOpen.getTime() - now.getTime();
  const countdownSeconds = Math.max(0, Math.floor(diffMs / 1000));

  const formattedCurrentTime = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return {
    isOpen,
    currentHour,
    currentMinute,
    formattedCurrentTime,
    nextOpenTime: nextOpen,
    countdownSeconds,
    isOverridden,
    message: isOverridden
      ? 'Evaluator / Admin Override: Portal Unlocked 24/7 for Testing'
      : isWithinWindow
      ? 'Portal Open: 09:00 AM – 09:00 PM IST Daily'
      : 'Portal Closed: Opens Daily at 09:00 AM IST',
  };
}

export function formatCountdown(totalSeconds: number): {
  hours: string;
  minutes: string;
  seconds: string;
} {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return {
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
  };
}
