import { UserProgress } from '../types';

/**
 * Checks whether a given day has all its sections completed.
 * A day is considered completed if:
 * 1. It has been explicitly marked completed in progress.completedDays[day], OR
 * 2. Its official badge has been unlocked in progress.unlockedBadges[day], OR
 * 3. Both Pre-Assessment and Post-Assessment have been passed for that day.
 */
export function isDayCompleted(day: number, progress?: UserProgress | null): boolean {
  if (!progress) return false;
  if (progress.completedDays && progress.completedDays[day]) return true;
  if (progress.unlockedBadges && progress.unlockedBadges[day]) return true;
  return Boolean(progress.preAssessmentPassed?.[day] && progress.postAssessmentPassed?.[day]);
}

/**
 * Checks whether a day is unlocked for the learner.
 * Rule:
 * - Day 1 is ALWAYS unlocked.
 * - Any subsequent Day D (2..10) is unlocked ONLY IF Day D-1 has been completed.
 */
export function isDayUnlocked(day: number, progress?: UserProgress | null): boolean {
  if (day <= 1) return true;
  return isDayCompleted(day - 1, progress);
}

/**
 * Returns human-readable status for a day's sections.
 */
export function getDaySectionStatus(day: number, progress?: UserProgress | null) {
  const prePassed = Boolean(progress?.preAssessmentPassed?.[day]);
  const postPassed = Boolean(progress?.postAssessmentPassed?.[day]);
  const badgeUnlocked = Boolean(progress?.unlockedBadges?.[day]);
  const isComplete = isDayCompleted(day, progress);
  const isUnlocked = isDayUnlocked(day, progress);

  return {
    isUnlocked,
    isComplete,
    prePassed,
    postPassed,
    badgeUnlocked,
  };
}
