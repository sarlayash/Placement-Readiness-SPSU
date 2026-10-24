import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
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
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

/**
 * Official Google Sign-In via Firebase Popup
 */
export async function signInWithGooglePopup(): Promise<GoogleUser> {
  const result = await signInWithPopup(auth, googleProvider);
  const fbUser = result.user;

  return {
    uid: fbUser.uid,
    name: fbUser.displayName || 'SPSU Google Learner',
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
 * Sign out from Firebase Auth
 */
export async function signOutGoogle(): Promise<void> {
  try {
    await fbSignOut(auth);
  } catch (err) {
    console.warn('Firebase sign-out notice:', err);
  }
}
