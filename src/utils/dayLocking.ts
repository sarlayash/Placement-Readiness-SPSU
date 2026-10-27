import { UserProgress } from '../types';

export const PASSING_SCORE_PERCENT = 80;

/**
 * Global Portal Policy: ALL DAYS UNLOCKED
 * Requested by Administrator / Placement Mentor Kapil.
 * All 10 Days (Day 1 through Day 10) are immediately accessible for all learners.
 */
export const ALL_DAYS_UNLOCKED = true;

/**
 * Official Cohort Start Date: Monday, October 26, 2026 at 09:00 AM IST
 */
export const COHORT_START_DATE_STR = '2026-10-26T09:00:00+05:30';

/**
 * Returns the exact scheduled unlock Date for a given Day (1..10).
 */
export function getDayScheduledUnlockTime(day: number): Date {
  const base = new Date(COHORT_START_DATE_STR);
  base.setDate(base.getDate() + (day - 1));
  base.setHours(9, 0, 0, 0);
  return base;
}

/**
 * Checks whether the current time has reached the scheduled 09:00 AM unlock time for a day.
 */
export function isDayScheduleReached(day: number): boolean {
  if (ALL_DAYS_UNLOCKED) return true;
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
 * Policy: ALL DAYS UNLOCKED (returns true for Days 1 through 10).
 */
export function isDayUnlocked(_day: number, _progress?: UserProgress | null): boolean {
  return true;
}

/**
 * Returns human-readable status for a day's sections.
 * With ALL DAYS UNLOCKED, isUnlocked is always true, lockReason is null.
 */
export function getDaySectionStatus(day: number, progress?: UserProgress | null): DayDetailedStatus {
  const prePassed = Boolean(progress?.preAssessmentPassed?.[day]);
  const postPassed = Boolean(progress?.postAssessmentPassed?.[day]);
  const badgeUnlocked = Boolean(progress?.unlockedBadges?.[day]);
  const isComplete = isDayCompleted(day, progress);

  const unlockTime = getDayScheduledUnlockTime(day);

  return {
    isUnlocked: true,
    isComplete,
    prePassed,
    postPassed,
    badgeUnlocked,
    lockReason: null,
    scheduledUnlockTime: unlockTime,
    countdownSeconds: 0,
    formattedUnlockDate: 'Unlocked & Ready',
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
