import { LearnerRecord } from '../types';

/**
 * Initial verified accounts from Firebase Authentication
 * (placement-readiness-spsu project users exported from console)
 */
export const INITIAL_FIREBASE_AUTH_USERS: LearnerRecord[] = [
  {
    uid: 'bxsAXYFHcwYPdHdWlO0JjGZzQYN2',
    name: 'Kapil Narula',
    email: 'kapilnarula27july@gmail.com',
    photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocJarJtkHD2tVW2nJNmzS5QfX9Dk4EuwLgQ4li4QqZ1jKMbEVhkBCA=s96-c',
    firstLogin: new Date(1792816451361).toISOString(),
    lastLoginAttempt: new Date(1792821194928).toISOString(),
    preAssessmentScores: { 1: 96 },
    postAssessmentScores: { 1: 98 },
    preAssessmentPassed: { 1: true },
    postAssessmentPassed: { 1: true },
    completedDays: { 1: true },
    unlockedBadges: { 1: new Date(1792821194928).toISOString() },
    certificateId: 'SPSU-KAPIL-10D-KN727A',
    certificateIssuedAt: new Date(1792821194928).toISOString(),
  },
  {
    uid: 'fygYucL0PaNK7wp21r3LxaMYZUV2',
    name: 'Kapil',
    email: 'onerupeefullstackceo@gmail.com',
    photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocIiEurDJoQxCvlQX-gtxcRTVrkjGuTx4GTF_NFZ3P7aSMLk9Dk=s96-c',
    firstLogin: new Date(1792816486224).toISOString(),
    lastLoginAttempt: new Date(1792816486224).toISOString(),
    preAssessmentScores: { 1: 92 },
    postAssessmentScores: { 1: 94 },
    preAssessmentPassed: { 1: true },
    postAssessmentPassed: { 1: true },
    completedDays: { 1: true },
    unlockedBadges: { 1: new Date(1792816486224).toISOString() },
    certificateId: 'SPSU-KAPIL-10D-CE01F1',
    certificateIssuedAt: new Date(1792816486224).toISOString(),
  },
];
