import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as fbSignOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleUser } from '../types';

export const firebaseConfig = {
  apiKey: "AIzaSyB1zdWRRajxC5WE82h2E8P2zJuyJS4oHCY",
  authDomain: "placement-readiness-spsu.firebaseapp.com",
  projectId: "placement-readiness-spsu",
  storageBucket: "placement-readiness-spsu.firebasestorage.app",
  messagingSenderId: "966135315087",
  appId: "1:966135315087:web:04411f955b33b0d5970efa",
  measurementId: "G-W21DHVEDE0"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Helper to format Firebase User into application GoogleUser
export function formatFirebaseUser(fbUser: FirebaseUser): GoogleUser {
  return {
    uid: fbUser.uid,
    name: fbUser.displayName || (fbUser.email ? fbUser.email.split('@')[0] : 'SPSU Google Learner'),
    email: fbUser.email || '',
    photoURL:
      fbUser.photoURL ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        fbUser.displayName || 'Learner'
      )}&background=0A192F&color=ffffff&bold=true`,
    signedInAt: new Date().toISOString(),
  };
}

/**
 * Official Google Sign-In with Automatic Fallbacks:
 * 1. Attempts signInWithPopup
 * 2. If blocked by browser (mobile / popup blocker), triggers signInWithRedirect
 */
export async function signInWithGooglePopup(): Promise<GoogleUser> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return formatFirebaseUser(result.user);
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code || '';
    // Only fall back to a full-page redirect when the browser blocked the popup.
    // If the user closed the popup themselves, respect that and surface the error.
    if (
      code === 'auth/popup-blocked' ||
      code === 'auth/operation-not-supported-in-this-environment' ||
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) && code === 'auth/popup-closed-by-user'
    ) {
      console.warn('Mobile/popup restriction detected. Initiating redirect fallback...');
      await signInWithRedirect(auth, googleProvider);
      // Returns a pending promise until redirect completes
      return new Promise(() => {});
    }
    throw err;
  }
}

/**
 * Check if the user is returning from a signInWithRedirect
 */
export async function checkRedirectAuth(): Promise<GoogleUser | null> {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      return formatFirebaseUser(result.user);
    }
    return null;
  } catch (err) {
    console.warn('Redirect auth check notice:', err);
    return null;
  }
}

/**
 * Sign out from Firebase Auth
 */
export async function signOutGoogle(): Promise<void> {
  try {
    await fbSignOut(auth);
  } catch (err) {
    console.warn('Firebase sign-out notice:', err);
  }
}
