import { GoogleUser, UserProgress } from '../types';

const USER_STORAGE_KEY = 'spsu_kapil_10day_google_user_v1';
const PROGRESS_STORAGE_PREFIX = 'spsu_kapil_10day_progress_v1_';

export const EMPTY_PROGRESS: UserProgress = {
  preAssessmentScores: {},
  postAssessmentScores: {},
  preAssessmentPassed: {},
  postAssessmentPassed: {},
  completedChallengeIds: [],
  readNoteIds: [],
  unlockedBadges: {},
  savedCode: {},
  certificateId: null,
  certificateIssuedAt: null,
};

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
    if (!raw) return { ...EMPTY_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    return {
      preAssessmentScores: parsed.preAssessmentScores || {},
      postAssessmentScores: parsed.postAssessmentScores || {},
      preAssessmentPassed: parsed.preAssessmentPassed || {},
      postAssessmentPassed: parsed.postAssessmentPassed || {},
      completedChallengeIds: Array.isArray(parsed.completedChallengeIds) ? parsed.completedChallengeIds : [],
      readNoteIds: Array.isArray(parsed.readNoteIds) ? parsed.readNoteIds : [],
      unlockedBadges: parsed.unlockedBadges || {},
      savedCode: parsed.savedCode || {},
      certificateId: parsed.certificateId || null,
      certificateIssuedAt: parsed.certificateIssuedAt || null,
    };
  } catch {
    return { ...EMPTY_PROGRESS };
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

export function generateOfficialCertificateId(email: string): string {
  const cleanHash = Array.from(email.toLowerCase())
    .reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0);
  const absHex = Math.abs(cleanHash).toString(16).toUpperCase().padStart(6, '0');
  return `SPSU-KAPIL-10D-${absHex}`;
}
