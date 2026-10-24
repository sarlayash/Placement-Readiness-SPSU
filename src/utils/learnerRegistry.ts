import { collection, doc, getDocs, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { GoogleUser, UserProgress, LearnerRecord } from '../types';
import { INITIAL_FIREBASE_AUTH_USERS } from '../data/firebaseAuthUsers';

const LOCAL_REGISTRY_KEY = 'spsu_kapil_all_learners_registry_v1';

/**
 * Reads local learners registry from localStorage as a fallback or hybrid store.
 */
export function getLocalLearnersRegistry(): Record<string, LearnerRecord> {
  const seed: Record<string, LearnerRecord> = {};
  for (const u of INITIAL_FIREBASE_AUTH_USERS) {
    seed[u.email.toLowerCase()] = { ...u };
  }

  try {
    const raw = localStorage.getItem(LOCAL_REGISTRY_KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw) as Record<string, LearnerRecord>;
    return { ...seed, ...parsed };
  } catch {
    return seed;
  }
}

/**
 * Saves learners registry into localStorage.
 */
export function saveLocalLearnersRegistry(registry: Record<string, LearnerRecord>): void {
  try {
    localStorage.setItem(LOCAL_REGISTRY_KEY, JSON.stringify(registry));
  } catch (err) {
    console.warn('Could not persist local learner registry:', err);
  }
}

/**
 * Record a user's sign in / login attempt with real timestamp.
 * Syncs to both Firebase Firestore and the persistent local registry.
 */
export async function recordUserSignIn(
  user: GoogleUser,
  currentProgress?: UserProgress
): Promise<LearnerRecord> {
  const now = new Date().toISOString();
  const localRegistry = getLocalLearnersRegistry();
  const existing = localRegistry[user.email.toLowerCase()] || localRegistry[user.uid];

  const updatedRecord: LearnerRecord = {
    uid: user.uid,
    name: (user.name || 'SPSU Learner').slice(0, 150),
    email: user.email.toLowerCase().slice(0, 150),
    photoURL: user.photoURL ? user.photoURL.slice(0, 1000) : '',
    firstLogin: existing?.firstLogin || user.signedInAt || now,
    lastLoginAttempt: now,
    preAssessmentScores: currentProgress?.preAssessmentScores || existing?.preAssessmentScores || {},
    postAssessmentScores: currentProgress?.postAssessmentScores || existing?.postAssessmentScores || {},
    preAssessmentPassed: currentProgress?.preAssessmentPassed || existing?.preAssessmentPassed || {},
    postAssessmentPassed: currentProgress?.postAssessmentPassed || existing?.postAssessmentPassed || {},
    completedDays: currentProgress?.completedDays || existing?.completedDays || {},
    unlockedBadges: currentProgress?.unlockedBadges || existing?.unlockedBadges || {},
    certificateId: currentProgress?.certificateId || existing?.certificateId || null,
    certificateIssuedAt: currentProgress?.certificateIssuedAt || existing?.certificateIssuedAt || null,
    patternQuizScore: currentProgress?.patternQuizScore ?? existing?.patternQuizScore ?? 0,
    patternQuizCompleted: currentProgress?.patternQuizCompleted ?? existing?.patternQuizCompleted ?? false,
    stressQuizScore: currentProgress?.stressQuizScore ?? existing?.stressQuizScore ?? 0,
    stressQuizAnswered: currentProgress?.stressQuizAnswered ?? existing?.stressQuizAnswered ?? 0,
    stressQuizCompleted: currentProgress?.stressQuizCompleted ?? existing?.stressQuizCompleted ?? false,
    stressQuizAttemptedAt: currentProgress?.stressQuizAttemptedAt || existing?.stressQuizAttemptedAt,
    aptitudeScore: currentProgress?.aptitudeScore ?? existing?.aptitudeScore ?? 0,
    aptitudeCorrectCount: currentProgress?.aptitudeCorrectCount ?? existing?.aptitudeCorrectCount ?? 0,
    aptitudePassed: currentProgress?.aptitudePassed ?? existing?.aptitudePassed ?? false,
    aptitudeAttemptedAt: currentProgress?.aptitudeAttemptedAt || existing?.aptitudeAttemptedAt,
    lorIssuedAt: currentProgress?.lorIssuedAt || existing?.lorIssuedAt || null,
    reportGeneratedAt: currentProgress?.reportGeneratedAt || existing?.reportGeneratedAt || null,
  };

  // Update local registry
  localRegistry[user.email.toLowerCase()] = updatedRecord;
  saveLocalLearnersRegistry(localRegistry);

  // Sync to Firebase Firestore
  try {
    const learnerDocRef = doc(db, 'learners', user.uid);
    await setDoc(learnerDocRef, updatedRecord, { merge: true });
    console.log('Learner synced successfully to Firestore:', user.uid);
  } catch (err) {
    console.warn('Firestore learner sync notice (local registry preserved):', err);
  }

  return updatedRecord;
}

/**
 * Update a learner's assessment progress and sync.
 */
export async function syncLearnerProgress(
  user: GoogleUser,
  progress: UserProgress
): Promise<void> {
  const localRegistry = getLocalLearnersRegistry();
  const existing = localRegistry[user.email.toLowerCase()] || localRegistry[user.uid];
  const now = new Date().toISOString();

  const updatedRecord: LearnerRecord = {
    uid: user.uid,
    name: (user.name || existing?.name || 'SPSU Learner').slice(0, 150),
    email: user.email.toLowerCase().slice(0, 150),
    photoURL: (user.photoURL || existing?.photoURL || '').slice(0, 1000),
    firstLogin: existing?.firstLogin || user.signedInAt || now,
    lastLoginAttempt: now,
    preAssessmentScores: { ...(existing?.preAssessmentScores || {}), ...progress.preAssessmentScores },
    postAssessmentScores: { ...(existing?.postAssessmentScores || {}), ...progress.postAssessmentScores },
    preAssessmentPassed: { ...(existing?.preAssessmentPassed || {}), ...progress.preAssessmentPassed },
    postAssessmentPassed: { ...(existing?.postAssessmentPassed || {}), ...progress.postAssessmentPassed },
    completedDays: { ...(existing?.completedDays || {}), ...(progress.completedDays || {}) },
    unlockedBadges: { ...(existing?.unlockedBadges || {}), ...progress.unlockedBadges },
    certificateId: progress.certificateId || existing?.certificateId || null,
    certificateIssuedAt: progress.certificateIssuedAt || existing?.certificateIssuedAt || null,
    patternQuizScore: progress.patternQuizScore ?? existing?.patternQuizScore ?? 0,
    patternQuizCompleted: progress.patternQuizCompleted ?? existing?.patternQuizCompleted ?? false,
    stressQuizScore: progress.stressQuizScore ?? existing?.stressQuizScore ?? 0,
    stressQuizAnswered: progress.stressQuizAnswered ?? existing?.stressQuizAnswered ?? 0,
    stressQuizCompleted: progress.stressQuizCompleted ?? existing?.stressQuizCompleted ?? false,
    stressQuizAttemptedAt: progress.stressQuizAttemptedAt || existing?.stressQuizAttemptedAt,
    aptitudeScore: progress.aptitudeScore ?? existing?.aptitudeScore ?? 0,
    aptitudeCorrectCount: progress.aptitudeCorrectCount ?? existing?.aptitudeCorrectCount ?? 0,
    aptitudePassed: progress.aptitudePassed ?? existing?.aptitudePassed ?? false,
    aptitudeAttemptedAt: progress.aptitudeAttemptedAt || existing?.aptitudeAttemptedAt,
    lorIssuedAt: progress.lorIssuedAt || existing?.lorIssuedAt || null,
    reportGeneratedAt: progress.reportGeneratedAt || existing?.reportGeneratedAt || null,
  };

  localRegistry[user.email.toLowerCase()] = updatedRecord;
  saveLocalLearnersRegistry(localRegistry);

  try {
    const learnerDocRef = doc(db, 'learners', user.uid);
    await setDoc(learnerDocRef, updatedRecord, { merge: true });
  } catch (err) {
    console.warn('Firestore progress sync notice:', err);
  }
}

/**
 * Fetch all registered learners from Firebase Firestore, merged with local registry.
 */
export async function fetchAllLearners(): Promise<LearnerRecord[]> {
  const mergedMap: Record<string, LearnerRecord> = {};

  // 1. Seed initial verified Firebase Auth users
  for (const initUser of INITIAL_FIREBASE_AUTH_USERS) {
    mergedMap[initUser.email.toLowerCase()] = { ...initUser };
  }

  // 2. Layer any local registry updates
  const localRegistry = getLocalLearnersRegistry();
  for (const [key, record] of Object.entries(localRegistry)) {
    const normKey = (record.email || key).toLowerCase();
    mergedMap[normKey] = {
      ...(mergedMap[normKey] || {}),
      ...record,
    };
  }

  // 3. Layer Firestore collection 'learners' data
  try {
    const snapshot = await getDocs(collection(db, 'learners'));
    snapshot.forEach((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as LearnerRecord;
        if (data && (data.email || data.uid)) {
          const key = (data.email || data.uid).toLowerCase();
          mergedMap[key] = {
            ...(mergedMap[key] || {}),
            ...data,
          };
        }
      }
    });
  } catch (err) {
    console.warn('Could not read from Firestore collection "learners", using cached registry:', err);
  }

  const list = Object.values(mergedMap);

  // Sort descending by last login attempt (newest first)
  list.sort((a, b) => {
    const tA = new Date(a.lastLoginAttempt || a.firstLogin || 0).getTime();
    const tB = new Date(b.lastLoginAttempt || b.firstLogin || 0).getTime();
    return tB - tA;
  });

  return list;
}

/**
 * Real-time subscription to learners collection in Firestore.
 * Automatically pushes updates to the Admin Dashboard when any user signs up or updates progress.
 */
export function subscribeToLearners(callback: (learners: LearnerRecord[]) => void): () => void {
  // Push initial merged cache immediately
  fetchAllLearners().then(callback);

  try {
    const unsub = onSnapshot(
      collection(db, 'learners'),
      (snapshot) => {
        const mergedMap: Record<string, LearnerRecord> = {};
        for (const initUser of INITIAL_FIREBASE_AUTH_USERS) {
          mergedMap[initUser.email.toLowerCase()] = { ...initUser };
        }
        const localRegistry = getLocalLearnersRegistry();
        for (const [key, record] of Object.entries(localRegistry)) {
          const normKey = (record.email || key).toLowerCase();
          mergedMap[normKey] = { ...(mergedMap[normKey] || {}), ...record };
        }
        snapshot.forEach((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as LearnerRecord;
            if (data && (data.email || data.uid)) {
              const key = (data.email || data.uid).toLowerCase();
              mergedMap[key] = { ...(mergedMap[key] || {}), ...data };
            }
          }
        });
        const list = Object.values(mergedMap);
        list.sort((a, b) => {
          const tA = new Date(a.lastLoginAttempt || a.firstLogin || 0).getTime();
          const tB = new Date(b.lastLoginAttempt || b.firstLogin || 0).getTime();
          return tB - tA;
        });
        callback(list);
      },
      (err) => {
        console.warn('Real-time listener notice:', err);
      }
    );
    return unsub;
  } catch (err) {
    console.warn('Real-time subscription setup error:', err);
    return () => {};
  }
}

/**
 * Downloads assessment scores (Pre and Post) in CSV format.
 * If day is specified (1..10), downloads day-specific scores.
 * Otherwise, downloads a comprehensive CSV of all 10 days.
 */
export function downloadAssessmentScoresCSV(learners: LearnerRecord[], dayFilter?: number): void {
  let csvContent = '';
  const nowStr = new Date().toISOString().replace(/[:.]/g, '-');

  if (dayFilter && dayFilter >= 1 && dayFilter <= 10) {
    // Single Day CSV with explicit 80% passing benchmark annotations
    const headers = [
      'Learner Name',
      'Email Address',
      'Firebase UID',
      'First Registration Date',
      'Last Login Attempt',
      `Day ${dayFilter} Pre-Assessment Score (%)`,
      `Day ${dayFilter} Pre Status (80% Cutoff)`,
      `Day ${dayFilter} Post-Assessment Score (%)`,
      `Day ${dayFilter} Post Status (80% Cutoff)`,
      `Day ${dayFilter} Completed (Both >= 80%)`,
      'Total Badges Earned',
      'Official Certificate ID',
    ];

    const rows = learners.map((l) => {
      const rawPre = l.preAssessmentScores?.[dayFilter];
      const rawPost = l.postAssessmentScores?.[dayFilter];

      const preScore = rawPre !== undefined ? `${rawPre}%` : 'Not Attempted';
      const prePassed = rawPre !== undefined ? (rawPre >= 80 ? 'PASSED (>=80%)' : 'NEEDS RETAKE (<80%)') : 'NOT ATTEMPTED';

      const postScore = rawPost !== undefined ? `${rawPost}%` : 'Not Attempted';
      const postPassed = rawPost !== undefined ? (rawPost >= 80 ? 'PASSED (>=80%)' : 'NEEDS RETAKE (<80%)') : 'NOT ATTEMPTED';

      const dayCompleted = (rawPre !== undefined && rawPre >= 80 && rawPost !== undefined && rawPost >= 80) ? 'YES' : 'NO';
      const badgeCount = Object.keys(l.unlockedBadges || {}).length;

      return [
        `"${(l.name || 'Learner').replace(/"/g, '""')}"`,
        `"${(l.email || '').replace(/"/g, '""')}"`,
        `"${(l.uid || '').replace(/"/g, '""')}"`,
        `"${l.firstLogin || ''}"`,
        `"${l.lastLoginAttempt || ''}"`,
        `"${preScore}"`,
        `"${prePassed}"`,
        `"${postScore}"`,
        `"${postPassed}"`,
        `"${dayCompleted}"`,
        `"${badgeCount}/10"`,
        `"${l.certificateId || 'Pending'}"`,
      ].join(',');
    });

    csvContent = [headers.join(','), ...rows].join('\r\n');
    triggerFileDownload(csvContent, `SPSU_Kapil_Day_${dayFilter}_Assessment_Scores_${nowStr}.csv`);
  } else {
    // Complete 10-Day Master CSV with explicit 80% passing indicator
    const headers = [
      'Learner Name',
      'Email Address',
      'Firebase UID',
      'First Registration Date',
      'Last Login Attempt',
      'Day 1 Pre (Cutoff 80%)',
      'Day 1 Post (Cutoff 80%)',
      'Day 2 Pre (Cutoff 80%)',
      'Day 2 Post (Cutoff 80%)',
      'Day 3 Pre (Cutoff 80%)',
      'Day 3 Post (Cutoff 80%)',
      'Day 4 Pre (Cutoff 80%)',
      'Day 4 Post (Cutoff 80%)',
      'Day 5 Pre (Cutoff 80%)',
      'Day 5 Post (Cutoff 80%)',
      'Day 6 Pre (Cutoff 80%)',
      'Day 6 Post (Cutoff 80%)',
      'Day 7 Pre (Cutoff 80%)',
      'Day 7 Post (Cutoff 80%)',
      'Day 8 Pre (Cutoff 80%)',
      'Day 8 Post (Cutoff 80%)',
      'Day 9 Pre (Cutoff 80%)',
      'Day 9 Post (Cutoff 80%)',
      'Day 10 Pre (Cutoff 80%)',
      'Day 10 Post (Cutoff 80%)',
      'Aptitude Assessment (50 Qs, Cutoff 80%)',
      'Aptitude Passed',
      'B-Tech Stress Wheel Score (25 Qs)',
      'DSA Pattern Quiz (100 Scenarios)',
      'Total Days Completed (Both >= 80%)',
      'Badges Unlocked',
      'Certificate ID',
      'Certificate Issued At',
      '360 Report Status',
      'LOR Issued Status',
    ];

    const rows = learners.map((l) => {
      const scoresCols: string[] = [];
      let completedDaysCount = 0;

      for (let d = 1; d <= 10; d++) {
        const rawPre = l.preAssessmentScores?.[d];
        const rawPost = l.postAssessmentScores?.[d];

        const preStr = rawPre !== undefined
          ? (rawPre >= 80 ? `${rawPre}% [PASS]` : `${rawPre}% [RETAKE]`)
          : '-';
        const postStr = rawPost !== undefined
          ? (rawPost >= 80 ? `${rawPost}% [PASS]` : `${rawPost}% [RETAKE]`)
          : '-';

        scoresCols.push(`"${preStr}"`, `"${postStr}"`);

        if (rawPre !== undefined && rawPre >= 80 && rawPost !== undefined && rawPost >= 80) {
          completedDaysCount++;
        }
      }

      const badgeCount = Object.keys(l.unlockedBadges || {}).length;
      const aptScoreStr = l.aptitudeScore !== undefined ? `${l.aptitudeScore}% (${l.aptitudeCorrectCount || 0}/50)` : 'Not Attempted';
      const aptPassStr = l.aptitudePassed ? 'PASSED (>=80%)' : (l.aptitudeScore !== undefined ? 'FAILED (<80%)' : 'Pending');
      const stressScoreStr = l.stressQuizScore !== undefined ? `${l.stressQuizScore}/25 (${Math.round((l.stressQuizScore/25)*100)}%)` : 'Not Attempted';
      const patternScoreStr = l.patternQuizScore !== undefined ? `${l.patternQuizScore}/100` : 'Not Attempted';

      return [
        `"${(l.name || 'Learner').replace(/"/g, '""')}"`,
        `"${(l.email || '').replace(/"/g, '""')}"`,
        `"${(l.uid || '').replace(/"/g, '""')}"`,
        `"${l.firstLogin || ''}"`,
        `"${l.lastLoginAttempt || ''}"`,
        ...scoresCols,
        `"${aptScoreStr}"`,
        `"${aptPassStr}"`,
        `"${stressScoreStr}"`,
        `"${patternScoreStr}"`,
        `"${completedDaysCount}/10"`,
        `"${badgeCount}/10"`,
        `"${l.certificateId || 'Pending'}"`,
        `"${l.certificateIssuedAt || ''}"`,
        `"${l.reportGeneratedAt ? 'Generated' : 'Ready'}"`,
        `"${l.lorIssuedAt ? 'Issued' : 'Eligible'}"`,
      ].join(',');
    });

    csvContent = [headers.join(','), ...rows].join('\r\n');
    triggerFileDownload(csvContent, `SPSU_Kapil_All_Days_Assessment_Scores_${nowStr}.csv`);
  }
}

function triggerFileDownload(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
