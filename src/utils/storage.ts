import { GoogleUser, UserProgress } from '../types';

const USER_STORAGE_KEY = 'spsu_kapil_10day_google_user_v1';
const PROGRESS_STORAGE_PREFIX = 'spsu_kapil_10day_progress_v1_';

export function createEmptyProgress(): UserProgress {
  return {
    preAssessmentScores: {},
    postAssessmentScores: {},
    preAssessmentPassed: {},
    postAssessmentPassed: {},
    completedChallengeIds: [],
    readNoteIds: [],
    completedDays: {},
    unlockedBadges: {},
    savedCode: {},
    certificateId: null,
    certificateIssuedAt: null,
    patternQuizScore: 0,
    patternQuizCompleted: false,
    stressQuizScore: 0,
    stressQuizAnswered: 0,
    stressQuizCompleted: false,
    aptitudeScore: 0,
    aptitudeCorrectCount: 0,
    aptitudePassed: false,
    lorIssuedAt: null,
    reportGeneratedAt: null,
  };
}

export const EMPTY_PROGRESS: UserProgress = createEmptyProgress();

export function loadStoredGoogleUser(): GoogleUser | null {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GoogleUser;
    if (!parsed || !parsed.email || !parsed.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveStoredGoogleUser(user: GoogleUser | null): void {
  try {
    if (!user) {
      localStorage.removeItem(USER_STORAGE_KEY);
    } else {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.warn('Failed to store Google user:', e);
  }
}

export function loadStoredProgress(userEmail?: string): UserProgress {
  const key = `${PROGRESS_STORAGE_PREFIX}${userEmail ? userEmail.toLowerCase() : 'anonymous'}`;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return createEmptyProgress();
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    return {
      preAssessmentScores: parsed.preAssessmentScores || {},
      postAssessmentScores: parsed.postAssessmentScores || {},
      preAssessmentPassed: parsed.preAssessmentPassed || {},
      postAssessmentPassed: parsed.postAssessmentPassed || {},
      completedChallengeIds: Array.isArray(parsed.completedChallengeIds) ? parsed.completedChallengeIds : [],
      readNoteIds: Array.isArray(parsed.readNoteIds) ? parsed.readNoteIds : [],
      completedDays: parsed.completedDays || {},
      unlockedBadges: parsed.unlockedBadges || {},
      savedCode: parsed.savedCode || {},
      certificateId: parsed.certificateId || null,
      certificateIssuedAt: parsed.certificateIssuedAt || null,
      patternQuizScore: parsed.patternQuizScore ?? 0,
      patternQuizCompleted: Boolean(parsed.patternQuizCompleted),
      stressQuizScore: parsed.stressQuizScore ?? 0,
      stressQuizAnswered: parsed.stressQuizAnswered ?? 0,
      stressQuizCompleted: Boolean(parsed.stressQuizCompleted),
      stressQuizAttemptedAt: parsed.stressQuizAttemptedAt,
      aptitudeScore: parsed.aptitudeScore ?? 0,
      aptitudeCorrectCount: parsed.aptitudeCorrectCount ?? 0,
      aptitudePassed: Boolean(parsed.aptitudePassed),
      aptitudeAttemptedAt: parsed.aptitudeAttemptedAt,
      lorIssuedAt: parsed.lorIssuedAt || null,
      reportGeneratedAt: parsed.reportGeneratedAt || null,
      systemDesignScore: parsed.systemDesignScore,
      systemDesignCorrectCount: parsed.systemDesignCorrectCount,
      systemDesignPassed: parsed.systemDesignPassed,
      systemDesignAttemptedAt: parsed.systemDesignAttemptedAt || null,
      systemDesignBadgeUnlockedAt: parsed.systemDesignBadgeUnlockedAt || null,
      systemDesignCertificateId: parsed.systemDesignCertificateId || null,
      systemDesignCertificateIssuedAt: parsed.systemDesignCertificateIssuedAt || null,
      interviewReadinessScore: parsed.interviewReadinessScore,
      interviewReadinessCorrectCount: parsed.interviewReadinessCorrectCount,
      interviewReadinessPassed: parsed.interviewReadinessPassed,
      interviewReadinessAttemptedAt: parsed.interviewReadinessAttemptedAt || null,
      interviewScenariosScore: parsed.interviewScenariosScore,
      interviewScenariosCorrectCount: parsed.interviewScenariosCorrectCount,
      interviewScenariosPassed: parsed.interviewScenariosPassed,
      interviewScenariosAttemptedAt: parsed.interviewScenariosAttemptedAt || null,
      interviewBadgeUnlockedAt: parsed.interviewBadgeUnlockedAt || parsed.interviewReadinessBadgeUnlockedAt || null,
      interviewReadinessBadgeUnlockedAt: parsed.interviewReadinessBadgeUnlockedAt || parsed.interviewBadgeUnlockedAt || null,
      interviewCertificateId: parsed.interviewCertificateId || null,
      interviewCertificateIssuedAt: parsed.interviewCertificateIssuedAt || parsed.interviewReadinessCertificateIssuedAt || null,
      interviewReadinessCertificateIssuedAt: parsed.interviewReadinessCertificateIssuedAt || parsed.interviewCertificateIssuedAt || null,
    };
  } catch {
    return createEmptyProgress();
  }
}

export function saveStoredProgress(progress: UserProgress, userEmail?: string): void {
  const key = `${PROGRESS_STORAGE_PREFIX}${userEmail ? userEmail.toLowerCase() : 'anonymous'}`;
  try {
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (e) {
    console.warn('Failed to store progress:', e);
  }
}

export function generateOfficialCertificateId(email: string, days: number = 16): string {
  const cleanHash = Array.from(email.toLowerCase())
    .reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0);
  const absHex = Math.abs(cleanHash).toString(16).toUpperCase().padStart(6, '0');
  return `KAPIL-${days}D-${absHex}`;
}
