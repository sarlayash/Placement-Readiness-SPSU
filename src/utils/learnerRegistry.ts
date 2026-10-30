import { collection, doc, getDocs, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { GoogleUser, UserProgress, LearnerRecord } from '../types';
import { INITIAL_FIREBASE_AUTH_USERS } from '../data/firebaseAuthUsers';

const LOCAL_REGISTRY_KEY = 'spsu_kapil_all_learners_registry_v1';

// In-memory canonical firstLogin cache to preserve immutable registration timestamps
const canonicalFirstLoginCache = new Map<string, string>();

export function cacheCanonicalFirstLogin(userIdentifier: string, firstLogin: string): void {
  if (userIdentifier && firstLogin) {
    canonicalFirstLoginCache.set(userIdentifier.toLowerCase(), firstLogin);
  }
}

export function getCachedCanonicalFirstLogin(userIdentifier: string): string | undefined {
  if (!userIdentifier) return undefined;
  return canonicalFirstLoginCache.get(userIdentifier.toLowerCase());
}

/**
 * Reads local learners registry from localStorage as a fallback or hybrid store.
 */
export function getLocalLearnersRegistry(): Record<string, LearnerRecord> {
  const seed: Record<string, LearnerRecord> = {};
  for (const u of INITIAL_FIREBASE_AUTH_USERS) {
    seed[u.email.toLowerCase()] = { ...u };
    if (u.firstLogin) {
      cacheCanonicalFirstLogin(u.uid, u.firstLogin);
      cacheCanonicalFirstLogin(u.email, u.firstLogin);
    }
  }

  try {
    const raw = localStorage.getItem(LOCAL_REGISTRY_KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw) as Record<string, LearnerRecord>;
    for (const [key, item] of Object.entries(parsed)) {
      if (item.firstLogin) {
        if (item.uid) cacheCanonicalFirstLogin(item.uid, item.firstLogin);
        if (item.email) cacheCanonicalFirstLogin(item.email, item.firstLogin);
        cacheCanonicalFirstLogin(key, item.firstLogin);
      }
    }
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

const MAP_FIELDS = new Set([
  'preAssessmentScores',
  'postAssessmentScores',
  'preAssessmentPassed',
  'postAssessmentPassed',
  'completedDays',
  'unlockedBadges',
]);

export function cleanForFirestore(record: LearnerRecord): Record<string, any> {
  const clean: Record<string, any> = {};

  clean.uid = String(record.uid || '').slice(0, 128);
  clean.name = String(record.name || 'SPSU Learner').slice(0, 150);
  clean.email = String(record.email || '').toLowerCase().slice(0, 150);
  clean.photoURL = record.photoURL ? String(record.photoURL).slice(0, 1000) : '';
  clean.firstLogin = String(record.firstLogin || new Date().toISOString()).slice(0, 50);
  clean.lastLoginAttempt = String(record.lastLoginAttempt || new Date().toISOString()).slice(0, 50);

  // Maps with bounded entries and valid types
  const preScores: Record<string, number> = {};
  if (record.preAssessmentScores && typeof record.preAssessmentScores === 'object') {
    for (const [k, v] of Object.entries(record.preAssessmentScores)) {
      if (typeof v === 'number' && !isNaN(v)) {
        preScores[String(k)] = Math.min(100, Math.max(0, Math.round(v)));
      }
    }
  }
  clean.preAssessmentScores = preScores;

  const postScores: Record<string, number> = {};
  if (record.postAssessmentScores && typeof record.postAssessmentScores === 'object') {
    for (const [k, v] of Object.entries(record.postAssessmentScores)) {
      if (typeof v === 'number' && !isNaN(v)) {
        postScores[String(k)] = Math.min(100, Math.max(0, Math.round(v)));
      }
    }
  }
  clean.postAssessmentScores = postScores;

  const prePassed: Record<string, boolean> = {};
  if (record.preAssessmentPassed && typeof record.preAssessmentPassed === 'object') {
    for (const [k, v] of Object.entries(record.preAssessmentPassed)) {
      prePassed[String(k)] = Boolean(v);
    }
  }
  clean.preAssessmentPassed = prePassed;

  const postPassed: Record<string, boolean> = {};
  if (record.postAssessmentPassed && typeof record.postAssessmentPassed === 'object') {
    for (const [k, v] of Object.entries(record.postAssessmentPassed)) {
      postPassed[String(k)] = Boolean(v);
    }
  }
  clean.postAssessmentPassed = postPassed;

  const completedDays: Record<string, boolean> = {};
  if (record.completedDays && typeof record.completedDays === 'object') {
    for (const [k, v] of Object.entries(record.completedDays)) {
      completedDays[String(k)] = Boolean(v);
    }
  }
  clean.completedDays = completedDays;

  const unlockedBadges: Record<string, string> = {};
  if (record.unlockedBadges && typeof record.unlockedBadges === 'object') {
    for (const [k, v] of Object.entries(record.unlockedBadges)) {
      if (v) unlockedBadges[String(k)] = String(v).slice(0, 50);
    }
  }
  clean.unlockedBadges = unlockedBadges;

  // Scalar nullable and optional fields
  clean.certificateId = record.certificateId ? String(record.certificateId).slice(0, 100) : null;
  clean.certificateIssuedAt = record.certificateIssuedAt ? String(record.certificateIssuedAt).slice(0, 50) : null;

  clean.patternQuizScore = typeof record.patternQuizScore === 'number' && !isNaN(record.patternQuizScore)
    ? Math.min(100, Math.max(0, Math.round(record.patternQuizScore)))
    : null;
  clean.patternQuizCompleted = typeof record.patternQuizCompleted === 'boolean'
    ? record.patternQuizCompleted
    : null;

  clean.stressQuizScore = typeof record.stressQuizScore === 'number' && !isNaN(record.stressQuizScore)
    ? Math.min(100, Math.max(0, Math.round(record.stressQuizScore)))
    : null;
  clean.stressQuizAnswered = typeof record.stressQuizAnswered === 'number' && !isNaN(record.stressQuizAnswered)
    ? Math.min(500, Math.max(0, Math.round(record.stressQuizAnswered)))
    : null;
  clean.stressQuizCompleted = typeof record.stressQuizCompleted === 'boolean'
    ? record.stressQuizCompleted
    : null;
  clean.stressQuizAttemptedAt = record.stressQuizAttemptedAt ? String(record.stressQuizAttemptedAt).slice(0, 100) : null;

  clean.aptitudeScore = typeof record.aptitudeScore === 'number' && !isNaN(record.aptitudeScore)
    ? Math.min(100, Math.max(0, Math.round(record.aptitudeScore)))
    : null;
  clean.aptitudeCorrectCount = typeof record.aptitudeCorrectCount === 'number' && !isNaN(record.aptitudeCorrectCount)
    ? Math.min(500, Math.max(0, Math.round(record.aptitudeCorrectCount)))
    : null;
  clean.aptitudePassed = typeof record.aptitudePassed === 'boolean'
    ? record.aptitudePassed
    : null;
  clean.aptitudeAttemptedAt = record.aptitudeAttemptedAt ? String(record.aptitudeAttemptedAt).slice(0, 100) : null;

  clean.lorIssuedAt = record.lorIssuedAt ? String(record.lorIssuedAt).slice(0, 100) : null;
  clean.reportGeneratedAt = record.reportGeneratedAt ? String(record.reportGeneratedAt).slice(0, 100) : null;

  return clean;
}

export function mergeMaps<T>(base?: Record<string | number, T>, incoming?: Record<string | number, T>): Record<number, T> {
  const result: Record<number, T> = {};
  if (base) {
    for (const [k, v] of Object.entries(base)) {
      if (v !== undefined && v !== null) {
        result[Number(k)] = v;
      }
    }
  }
  if (incoming) {
    for (const [k, v] of Object.entries(incoming)) {
      if (v !== undefined && v !== null) {
        result[Number(k)] = v;
      }
    }
  }
  return result;
}

/**
 * Merges assessment score maps, always preserving existing attempted scores
 * and taking the highest score (Math.max) for each day.
 */
export function mergeScoreMaps(
  base?: Record<string | number, number>,
  incoming?: Record<string | number, number>
): Record<number, number> {
  const result: Record<number, number> = {};
  if (base) {
    for (const [k, v] of Object.entries(base)) {
      const dayNum = Number(k);
      if (typeof v === 'number' && !isNaN(v)) {
        result[dayNum] = v;
      }
    }
  }
  if (incoming) {
    for (const [k, v] of Object.entries(incoming)) {
      const dayNum = Number(k);
      if (typeof v === 'number' && !isNaN(v)) {
        result[dayNum] = result[dayNum] !== undefined ? Math.max(result[dayNum], v) : v;
      }
    }
  }
  return result;
}

/**
 * Merges boolean completion maps, ensuring once passed or completed (true),
 * it is permanently retained across sessions and devices.
 */
export function mergeBooleanMaps(
  base?: Record<string | number, boolean>,
  incoming?: Record<string | number, boolean>
): Record<number, boolean> {
  const result: Record<number, boolean> = {};
  if (base) {
    for (const [k, v] of Object.entries(base)) {
      result[Number(k)] = Boolean(v);
    }
  }
  if (incoming) {
    for (const [k, v] of Object.entries(incoming)) {
      result[Number(k)] = Boolean(result[Number(k)] || v);
    }
  }
  return result;
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

  let firstLoginToUse =
    getCachedCanonicalFirstLogin(user.uid) ||
    getCachedCanonicalFirstLogin(user.email);

  // ALWAYS check Firestore directly first to ensure firstLogin strictly matches immutable rule
  try {
    const learnerDocRef = doc(db, 'learners', user.uid);
    const snap = await getDoc(learnerDocRef);
    if (snap.exists() && snap.data()?.firstLogin) {
      const fl = String(snap.data().firstLogin);
      firstLoginToUse = fl;
      cacheCanonicalFirstLogin(user.uid, fl);
      cacheCanonicalFirstLogin(user.email, fl);
    }
  } catch {
    // Offline fallback
  }

  if (!firstLoginToUse) {
    firstLoginToUse = existing?.firstLogin || user.signedInAt || now;
  }
  cacheCanonicalFirstLogin(user.uid, firstLoginToUse);
  cacheCanonicalFirstLogin(user.email, firstLoginToUse);

  const updatedRecord: LearnerRecord = {
    uid: user.uid,
    name: (user.name || existing?.name || 'SPSU Learner').slice(0, 150),
    email: user.email.toLowerCase().slice(0, 150),
    photoURL: user.photoURL ? user.photoURL.slice(0, 1000) : (existing?.photoURL || ''),
    firstLogin: firstLoginToUse,
    lastLoginAttempt: now,
    preAssessmentScores: mergeScoreMaps(existing?.preAssessmentScores, currentProgress?.preAssessmentScores),
    postAssessmentScores: mergeScoreMaps(existing?.postAssessmentScores, currentProgress?.postAssessmentScores),
    preAssessmentPassed: mergeBooleanMaps(existing?.preAssessmentPassed, currentProgress?.preAssessmentPassed),
    postAssessmentPassed: mergeBooleanMaps(existing?.postAssessmentPassed, currentProgress?.postAssessmentPassed),
    completedDays: mergeBooleanMaps(existing?.completedDays, currentProgress?.completedDays),
    unlockedBadges: mergeMaps(existing?.unlockedBadges, currentProgress?.unlockedBadges),
    certificateId: currentProgress?.certificateId || existing?.certificateId || null,
    certificateIssuedAt: currentProgress?.certificateIssuedAt || existing?.certificateIssuedAt || null,
    patternQuizScore: currentProgress?.patternQuizScore ?? existing?.patternQuizScore ?? 0,
    patternQuizCompleted: currentProgress?.patternQuizCompleted ?? existing?.patternQuizCompleted ?? false,
    stressQuizScore: currentProgress?.stressQuizScore ?? existing?.stressQuizScore ?? 0,
    stressQuizAnswered: currentProgress?.stressQuizAnswered ?? existing?.stressQuizAnswered ?? 0,
    stressQuizCompleted: currentProgress?.stressQuizCompleted ?? existing?.stressQuizCompleted ?? false,
    stressQuizAttemptedAt: currentProgress?.stressQuizAttemptedAt || existing?.stressQuizAttemptedAt || null,
    aptitudeScore: currentProgress?.aptitudeScore ?? existing?.aptitudeScore ?? 0,
    aptitudeCorrectCount: currentProgress?.aptitudeCorrectCount ?? existing?.aptitudeCorrectCount ?? 0,
    aptitudePassed: currentProgress?.aptitudePassed ?? existing?.aptitudePassed ?? false,
    aptitudeAttemptedAt: currentProgress?.aptitudeAttemptedAt || existing?.aptitudeAttemptedAt || null,
    lorIssuedAt: currentProgress?.lorIssuedAt || existing?.lorIssuedAt || null,
    reportGeneratedAt: currentProgress?.reportGeneratedAt || existing?.reportGeneratedAt || null,
  };

  // Update local registry
  localRegistry[user.email.toLowerCase()] = updatedRecord;
  saveLocalLearnersRegistry(localRegistry);

  // Sync to Firebase Firestore
  try {
    const learnerDocRef = doc(db, 'learners', user.uid);
    await setDoc(learnerDocRef, cleanForFirestore(updatedRecord), { merge: true });
    console.log('✅ Learner sign-in synced successfully to Firestore:', user.uid);
  } catch (err) {
    console.warn('Firestore learner sign-in notice (local registry preserved):', err);
  }

  return updatedRecord;
}

/**
 * Update a learner's assessment progress and sync immediately to Firestore & Local Registry.
 */
export async function syncLearnerProgress(
  user: GoogleUser,
  progress: UserProgress
): Promise<void> {
  if (!user || !user.uid) return;

  const localRegistry = getLocalLearnersRegistry();
  const existing = localRegistry[user.email.toLowerCase()] || localRegistry[user.uid];
  const now = new Date().toISOString();

  let firstLoginToUse =
    getCachedCanonicalFirstLogin(user.uid) ||
    getCachedCanonicalFirstLogin(user.email);

  // Check Firestore directly to guarantee firstLogin immutability and merge cloud scores
  let cloudData: Partial<LearnerRecord> | undefined = undefined;
  try {
    const learnerDocRef = doc(db, 'learners', user.uid);
    const snap = await getDoc(learnerDocRef);
    if (snap.exists()) {
      cloudData = snap.data() as Partial<LearnerRecord>;
      if (cloudData?.firstLogin) {
        const fl = String(cloudData.firstLogin);
        firstLoginToUse = fl;
        cacheCanonicalFirstLogin(user.uid, fl);
        cacheCanonicalFirstLogin(user.email, fl);
      }
    }
  } catch {
    // Offline fallback
  }

  if (!firstLoginToUse) {
    firstLoginToUse = existing?.firstLogin || user.signedInAt || now;
  }
  cacheCanonicalFirstLogin(user.uid, firstLoginToUse);
  cacheCanonicalFirstLogin(user.email, firstLoginToUse);

  const updatedRecord: LearnerRecord = {
    uid: user.uid,
    name: (user.name || existing?.name || cloudData?.name || 'SPSU Learner').slice(0, 150),
    email: user.email.toLowerCase().slice(0, 150),
    photoURL: (user.photoURL || existing?.photoURL || cloudData?.photoURL || '').slice(0, 1000),
    firstLogin: firstLoginToUse,
    lastLoginAttempt: now,
    preAssessmentScores: mergeScoreMaps(mergeScoreMaps(cloudData?.preAssessmentScores, existing?.preAssessmentScores), progress.preAssessmentScores),
    postAssessmentScores: mergeScoreMaps(mergeScoreMaps(cloudData?.postAssessmentScores, existing?.postAssessmentScores), progress.postAssessmentScores),
    preAssessmentPassed: mergeBooleanMaps(mergeBooleanMaps(cloudData?.preAssessmentPassed, existing?.preAssessmentPassed), progress.preAssessmentPassed),
    postAssessmentPassed: mergeBooleanMaps(mergeBooleanMaps(cloudData?.postAssessmentPassed, existing?.postAssessmentPassed), progress.postAssessmentPassed),
    completedDays: mergeBooleanMaps(mergeBooleanMaps(cloudData?.completedDays, existing?.completedDays), progress.completedDays),
    unlockedBadges: mergeMaps(mergeMaps(cloudData?.unlockedBadges, existing?.unlockedBadges), progress.unlockedBadges),
    certificateId: progress.certificateId || existing?.certificateId || cloudData?.certificateId || null,
    certificateIssuedAt: progress.certificateIssuedAt || existing?.certificateIssuedAt || cloudData?.certificateIssuedAt || null,
    patternQuizScore: progress.patternQuizScore ?? existing?.patternQuizScore ?? cloudData?.patternQuizScore ?? 0,
    patternQuizCompleted: progress.patternQuizCompleted ?? existing?.patternQuizCompleted ?? cloudData?.patternQuizCompleted ?? false,
    stressQuizScore: progress.stressQuizScore ?? existing?.stressQuizScore ?? cloudData?.stressQuizScore ?? 0,
    stressQuizAnswered: progress.stressQuizAnswered ?? existing?.stressQuizAnswered ?? cloudData?.stressQuizAnswered ?? 0,
    stressQuizCompleted: progress.stressQuizCompleted ?? existing?.stressQuizCompleted ?? cloudData?.stressQuizCompleted ?? false,
    stressQuizAttemptedAt: progress.stressQuizAttemptedAt || existing?.stressQuizAttemptedAt || cloudData?.stressQuizAttemptedAt || null,
    aptitudeScore: progress.aptitudeScore ?? existing?.aptitudeScore ?? cloudData?.aptitudeScore ?? 0,
    aptitudeCorrectCount: progress.aptitudeCorrectCount ?? existing?.aptitudeCorrectCount ?? cloudData?.aptitudeCorrectCount ?? 0,
    aptitudePassed: progress.aptitudePassed ?? existing?.aptitudePassed ?? cloudData?.aptitudePassed ?? false,
    aptitudeAttemptedAt: progress.aptitudeAttemptedAt || existing?.aptitudeAttemptedAt || cloudData?.aptitudeAttemptedAt || null,
    lorIssuedAt: progress.lorIssuedAt || existing?.lorIssuedAt || cloudData?.lorIssuedAt || null,
    reportGeneratedAt: progress.reportGeneratedAt || existing?.reportGeneratedAt || cloudData?.reportGeneratedAt || null,
  };

  localRegistry[user.email.toLowerCase()] = updatedRecord;
  saveLocalLearnersRegistry(localRegistry);

  try {
    const learnerDocRef = doc(db, 'learners', user.uid);
    await setDoc(learnerDocRef, cleanForFirestore(updatedRecord), { merge: true });
    console.log('✅ [REALTIME PROGRESS SYNC] Synchronized successfully to Firestore:', user.uid);
  } catch (err) {
    console.warn('Firestore progress sync notice (local registry preserved):', err);
  }
}

/**
 * Capture an assessment score real-time and commit to both local cache and Firestore.
 * Returns the merged UserProgress state.
 */
export async function captureAssessmentScoreRealtime(
  user: GoogleUser,
  day: number,
  type: 'pre' | 'post',
  scorePercent: number,
  currentProgress: UserProgress
): Promise<UserProgress> {
  const isPassed = scorePercent >= 80;
  const isOtherPassed = type === 'pre'
    ? Boolean(currentProgress.postAssessmentPassed?.[day])
    : Boolean(currentProgress.preAssessmentPassed?.[day]);
  const bothPassed = isPassed && isOtherPassed;

  const nextScores = type === 'pre'
    ? { ...(currentProgress.preAssessmentScores || {}), [day]: scorePercent }
    : { ...(currentProgress.postAssessmentScores || {}), [day]: scorePercent };

  const nextPassed = type === 'pre'
    ? { ...(currentProgress.preAssessmentPassed || {}), [day]: isPassed }
    : { ...(currentProgress.postAssessmentPassed || {}), [day]: isPassed };

  const nextCompletedDays = { ...(currentProgress.completedDays || {}) };
  if (bothPassed) {
    nextCompletedDays[day] = true;
  }

  const nextBadges = { ...(currentProgress.unlockedBadges || {}) };
  if (type === 'post' && isPassed && !nextBadges[day]) {
    nextBadges[day] = new Date().toISOString();
  }

  const nextProgress: UserProgress = {
    ...currentProgress,
    ...(type === 'pre' ? { preAssessmentScores: nextScores, preAssessmentPassed: nextPassed } : {}),
    ...(type === 'post' ? { postAssessmentScores: nextScores, postAssessmentPassed: nextPassed, unlockedBadges: nextBadges } : {}),
    completedDays: nextCompletedDays,
  };

  // Sync to Firestore immediately
  if (user && user.uid) {
    await syncLearnerProgress(user, nextProgress);
  }

  return nextProgress;
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
          if (data.firstLogin) {
            if (data.uid) cacheCanonicalFirstLogin(data.uid, data.firstLogin);
            if (data.email) cacheCanonicalFirstLogin(data.email, data.firstLogin);
          }
          const key = (data.email || data.uid).toLowerCase();
          const prev = mergedMap[key] || {};
          mergedMap[key] = {
            ...prev,
            ...data,
            preAssessmentScores: mergeScoreMaps(prev.preAssessmentScores, data.preAssessmentScores),
            postAssessmentScores: mergeScoreMaps(prev.postAssessmentScores, data.postAssessmentScores),
            preAssessmentPassed: mergeBooleanMaps(prev.preAssessmentPassed, data.preAssessmentPassed),
            postAssessmentPassed: mergeBooleanMaps(prev.postAssessmentPassed, data.postAssessmentPassed),
            completedDays: mergeBooleanMaps(prev.completedDays, data.completedDays),
            unlockedBadges: mergeMaps(prev.unlockedBadges, data.unlockedBadges),
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
              if (data.firstLogin) {
                if (data.uid) cacheCanonicalFirstLogin(data.uid, data.firstLogin);
                if (data.email) cacheCanonicalFirstLogin(data.email, data.firstLogin);
              }
              const key = (data.email || data.uid).toLowerCase();
              const prev = mergedMap[key] || {};
              mergedMap[key] = {
                ...prev,
                ...data,
                preAssessmentScores: mergeScoreMaps(prev.preAssessmentScores, data.preAssessmentScores),
                postAssessmentScores: mergeScoreMaps(prev.postAssessmentScores, data.postAssessmentScores),
                preAssessmentPassed: mergeBooleanMaps(prev.preAssessmentPassed, data.preAssessmentPassed),
                postAssessmentPassed: mergeBooleanMaps(prev.postAssessmentPassed, data.postAssessmentPassed),
                completedDays: mergeBooleanMaps(prev.completedDays, data.completedDays),
                unlockedBadges: mergeMaps(prev.unlockedBadges, data.unlockedBadges),
              };
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
