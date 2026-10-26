import { UserProgress } from '../types';
import { isEvaluatorOverrideActive } from './operatingHours';

export const PASSING_SCORE_PERCENT = 80;

/**
 * Official Cohort Start Date: Monday, October 26, 2026 at 09:00 AM IST
 * Day 1: October 26, 2026 (09:00 AM IST)
 * Day 2: October 27, 2026 (09:00 AM IST) - Unlocks next day at 9:00 AM
 * Day 3: October 28, 2026 (09:00 AM IST)
 * Day 4: October 29, 2026 (09:00 AM IST)
 * Day 5: October 30, 2026 (09:00 AM IST)
 * Day 6: October 31, 2026 (09:00 AM IST)
 * Day 7: November 1, 2026 (09:00 AM IST)
 * Day 8: November 2, 2026 (09:00 AM IST)
 * Day 9: November 3, 2026 (09:00 AM IST)
 * Day 10: November 4, 2026 (09:00 AM IST)
 */
export const COHORT_START_DATE_STR = '2026-10-26T09:00:00+05:30';

/**
 * Returns the exact scheduled unlock Date for a given Day (1..10).
 * Each day unlocks strictly at 09:00 AM IST on its scheduled calendar day.
 */
export function getDayScheduledUnlockTime(day: number): Date {
  const base = new Date(COHORT_START_DATE_STR);
  // Day 1 has 0 days offset, Day 2 has 1 day offset, etc.
  base.setDate(base.getDate() + (day - 1));
  base.setHours(9, 0, 0, 0);
  return base;
}

/**
 * Checks whether the current time has reached the scheduled 09:00 AM unlock time for a day.
 */
export function isDayScheduleReached(day: number): boolean {
  if (day <= 1) return true;
  const unlockTime = getDayScheduledUnlockTime(day);
  return new Date().getTime() >= unlockTime.getTime();
}

/**
 * Checks whether a given day has all its sections completed.
 * A day is considered completed if:
 * 1. It has been explicitly marked completed in progress.completedDays[day], OR
 * 2. Its official badge has been unlocked in progress.unlockedBadges[day], OR
 * 3. Both Pre-Assessment and Post-Assessment have been passed with >= 80% score.
 */
export function isDayCompleted(day: number, progress?: UserProgress | null): boolean {
  if (!progress) return false;
  if (progress.completedDays && progress.completedDays[day]) return true;
  if (progress.unlockedBadges && progress.unlockedBadges[day]) return true;

  const preScore = progress.preAssessmentScores?.[day];
  const postScore = progress.postAssessmentScores?.[day];

  const prePassed =
    Boolean(progress.preAssessmentPassed?.[day]) &&
    (preScore === undefined || preScore >= PASSING_SCORE_PERCENT);
  const postPassed =
    Boolean(progress.postAssessmentPassed?.[day]) &&
    (postScore === undefined || postScore >= PASSING_SCORE_PERCENT);

  return Boolean(prePassed && postPassed);
}

export type DayLockReason = 'PREREQUISITE_NOT_MET' | 'SCHEDULE_TIME_LOCKED' | null;

export interface DayDetailedStatus {
  isUnlocked: boolean;
  isComplete: boolean;
  prePassed: boolean;
  postPassed: boolean;
  badgeUnlocked: boolean;
  lockReason: DayLockReason;
  scheduledUnlockTime: Date;
  countdownSeconds: number;
  formattedUnlockDate: string;
}

/**
 * Checks whether a day is unlocked for the learner.
 * Rules:
 * 1. Evaluator / Admin Override: When active, allows 24/7 review across all 10 days for evaluation and testing.
 * 2. Day 1 is always unlocked for all learners.
 * 3. Subsequent Day D (2..10) unlocks ONLY IF:
 *    - Day D-1 has been completed with >= 80% passing benchmark, AND
 *    - The 09:00 AM next-day unlock time has arrived.
 */
export function isDayUnlocked(day: number, progress?: UserProgress | null): boolean {
  if (isEvaluatorOverrideActive()) return true;
  if (day <= 1) return true;

  // Prerequisite check: Must complete previous day
  if (!isDayCompleted(day - 1, progress)) {
    return false;
  }

  // Schedule check: Must be at or after 09:00 AM on the scheduled day
  if (!isDayScheduleReached(day)) {
    return false;
  }

  return true;
}

/**
 * Returns human-readable status for a day's sections, prerequisite and schedule locking.
 */
export function getDaySectionStatus(day: number, progress?: UserProgress | null): DayDetailedStatus {
  const isOverridden = isEvaluatorOverrideActive();
  const prePassed = Boolean(progress?.preAssessmentPassed?.[day]);
  const postPassed = Boolean(progress?.postAssessmentPassed?.[day]);
  const badgeUnlocked = Boolean(progress?.unlockedBadges?.[day]);
  const isComplete = isDayCompleted(day, progress);

  const prevCompleted = day <= 1 || isDayCompleted(day - 1, progress);
  const scheduleReached = day <= 1 || isDayScheduleReached(day);

  let lockReason: DayLockReason = null;
  if (!isOverridden && day > 1) {
    if (!prevCompleted) {
      lockReason = 'PREREQUISITE_NOT_MET';
    } else if (!scheduleReached) {
      lockReason = 'SCHEDULE_TIME_LOCKED';
    }
  }

  const isUnlocked = isOverridden || (day <= 1) || (prevCompleted && scheduleReached);

  const unlockTime = getDayScheduledUnlockTime(day);
  const now = new Date();
  const diffMs = unlockTime.getTime() - now.getTime();
  const countdownSeconds = Math.max(0, Math.floor(diffMs / 1000));

  const formattedUnlockDate = unlockTime.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) + ' at 09:00 AM IST';

  return {
    isUnlocked,
    isComplete,
    prePassed,
    postPassed,
    badgeUnlocked,
    lockReason,
    scheduledUnlockTime: unlockTime,
    countdownSeconds,
    formattedUnlockDate,
  };
}

export function formatDayCountdown(totalSeconds: number): {
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
