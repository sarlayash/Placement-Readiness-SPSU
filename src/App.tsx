import React, { useState, useEffect, useRef } from 'react';
import { GoogleUser, SupportedLanguage, UserProgress } from './types';
import {
  COMPLETE_10_DAY_PLAN,
  SYLLABUS_MODULES,
  ALL_DAILY_BADGES,
} from './data/curriculum10Days';
import { INITIAL_FIREBASE_AUTH_USERS } from './data/firebaseAuthUsers';
import {
  loadStoredGoogleUser,
  saveStoredGoogleUser,
  loadStoredProgress,
  saveStoredProgress,
  generateOfficialCertificateId,
} from './utils/storage';
import { auth, signOutGoogle, checkRedirectAuth, db } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { Navbar } from './components/Navbar';
import { LeftSidebar } from './components/LeftSidebar';
import { Footer } from './components/Footer';
import { LandingDayPlanner } from './components/LandingDayPlanner';
import { DayWorkspace } from './components/DayWorkspace';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { BadgeGalleryModal } from './components/BadgeGalleryModal';
import { CertificateModal } from './components/CertificateModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LearnerDashboardModal } from './components/LearnerDashboardModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { OperatingHoursModal } from './components/OperatingHoursModal';
import { IndustryPatternQuizModal } from './components/IndustryPatternQuizModal';
import { SpinningWheelQuizModal } from './components/SpinningWheelQuizModal';
import { AptitudeAssessmentModal } from './components/AptitudeAssessmentModal';
import { SelfServiceCredentialsModal } from './components/SelfServiceCredentialsModal';
import {
  recordUserSignIn,
  syncLearnerProgress,
  captureAssessmentScoreRealtime,
  mergeMaps,
  mergeScoreMaps,
  mergeBooleanMaps,
  cacheCanonicalFirstLogin,
} from './utils/learnerRegistry';
import { checkAndTriggerAutomaticReminders, loadInAppReminders } from './utils/pushNotifications';

export function App() {
  const [user, setUser] = useState<GoogleUser | null>(() => loadStoredGoogleUser());
  const [progress, setProgress] = useState<UserProgress>(() =>
    loadStoredProgress(loadStoredGoogleUser()?.email)
  );
  const isHydratedRef = useRef<boolean>(false);
  const isRemoteUpdateRef = useRef<boolean>(false);

  // Landing page defaults to Complete Day Planner ('planner'), can be 'day-workspace' or 'admin'
  const [activeView, setActiveView] = useState<'planner' | 'day-workspace' | 'admin'>('planner');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [initialDayTab, setInitialDayTab] = useState<'notes' | 'ide' | 'pre' | 'post' | 'project'>('notes');

  // Modals & Admin Session
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showBadgesModal, setShowBadgesModal] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [showLearnerDashboard, setShowLearnerDashboard] = useState<boolean>(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState<boolean>(false);
  const [showPatternQuiz, setShowPatternQuiz] = useState<boolean>(false);
  const [showStressWheel, setShowStressWheel] = useState<boolean>(false);
  const [showAptitude, setShowAptitude] = useState<boolean>(false);
  const [showSelfService, setShowSelfService] = useState<boolean>(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(() => {
    try {
      return loadInAppReminders().filter((r) => !r.read).length;
    } catch {
      return 1;
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('spsu_kapil_admin_auth_v1') === 'true';
    } catch {
      return false;
    }
  });

  // Left Sidebar Expand/Collapse state (defaults to expanded on desktop, toggleable anytime)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Daily Operating Hours (09:00 AM – 09:00 PM) re-render trigger
  const [, setHoursOverrideTick] = useState<number>(0);

  // Periodic automatic reminders check
  useEffect(() => {
    const runReminderCheck = () => {
      const preScore = progress.preAssessmentScores?.[selectedDay];
      const postScore = progress.postAssessmentScores?.[selectedDay];
      const prePassed = progress.preAssessmentPassed?.[selectedDay];
      const postPassed = progress.postAssessmentPassed?.[selectedDay];

      const newReminder = checkAndTriggerAutomaticReminders(
        selectedDay,
        preScore,
        postScore,
        prePassed,
        postPassed
      );
      if (newReminder) {
        setUnreadNotificationsCount(loadInAppReminders().filter((r) => !r.read).length);
      }
    };

    runReminderCheck();
    const interval = setInterval(runReminderCheck, 60000);
    return () => clearInterval(interval);
  }, [selectedDay, progress]);

  // Helper to fetch live real scores from Firestore and merge with local progress
  const hydrateUserProgress = async (u: GoogleUser, localProgress: UserProgress): Promise<UserProgress> => {
    let merged: UserProgress = { ...localProgress };

    // Check seed data first if available to ensure instant hydration on new devices
    const seedUser = INITIAL_FIREBASE_AUTH_USERS.find(
      (x) =>
        (u.email && x.email.toLowerCase() === u.email.toLowerCase()) ||
        (u.uid && x.uid === u.uid)
    );
    if (seedUser) {
      if (seedUser.firstLogin) {
        cacheCanonicalFirstLogin(u.uid, seedUser.firstLogin);
        cacheCanonicalFirstLogin(u.email, seedUser.firstLogin);
      }
      merged = {
        ...merged,
        preAssessmentScores: mergeScoreMaps(seedUser.preAssessmentScores, merged.preAssessmentScores),
        postAssessmentScores: mergeScoreMaps(seedUser.postAssessmentScores, merged.postAssessmentScores),
        preAssessmentPassed: mergeBooleanMaps(seedUser.preAssessmentPassed, merged.preAssessmentPassed),
        postAssessmentPassed: mergeBooleanMaps(seedUser.postAssessmentPassed, merged.postAssessmentPassed),
        completedDays: mergeBooleanMaps(seedUser.completedDays, merged.completedDays),
        unlockedBadges: mergeMaps(seedUser.unlockedBadges, merged.unlockedBadges),
        certificateId: seedUser.certificateId || merged.certificateId,
        certificateIssuedAt: seedUser.certificateIssuedAt || merged.certificateIssuedAt,
        patternQuizScore: Math.max(seedUser.patternQuizScore ?? 0, merged.patternQuizScore ?? 0),
        patternQuizCompleted: Boolean(seedUser.patternQuizCompleted ?? merged.patternQuizCompleted),
        stressQuizScore: Math.max(seedUser.stressQuizScore ?? 0, merged.stressQuizScore ?? 0),
        stressQuizAnswered: Math.max(seedUser.stressQuizAnswered ?? 0, merged.stressQuizAnswered ?? 0),
        stressQuizCompleted: Boolean(seedUser.stressQuizCompleted ?? merged.stressQuizCompleted),
        stressQuizAttemptedAt: seedUser.stressQuizAttemptedAt || merged.stressQuizAttemptedAt || null,
        aptitudeScore: Math.max(seedUser.aptitudeScore ?? 0, merged.aptitudeScore ?? 0),
        aptitudeCorrectCount: Math.max(seedUser.aptitudeCorrectCount ?? 0, merged.aptitudeCorrectCount ?? 0),
        aptitudePassed: Boolean(seedUser.aptitudePassed ?? merged.aptitudePassed),
        aptitudeAttemptedAt: seedUser.aptitudeAttemptedAt || merged.aptitudeAttemptedAt || null,
        lorIssuedAt: seedUser.lorIssuedAt || merged.lorIssuedAt || null,
        reportGeneratedAt: seedUser.reportGeneratedAt || merged.reportGeneratedAt || null,
      };
    }

    try {
      let snap = await getDoc(doc(db, 'learners', u.uid));
      if (!snap.exists() && u.email) {
        const emailSnap = await getDoc(doc(db, 'learners', u.email.toLowerCase()));
        if (emailSnap.exists()) {
          snap = emailSnap;
        }
      }
      if (snap.exists()) {
        const data = snap.data();
        if (data?.firstLogin) {
          cacheCanonicalFirstLogin(u.uid, data.firstLogin);
          cacheCanonicalFirstLogin(u.email, data.firstLogin);
        }
        merged = {
          ...merged,
          preAssessmentScores: mergeScoreMaps(data?.preAssessmentScores, merged.preAssessmentScores),
          postAssessmentScores: mergeScoreMaps(data?.postAssessmentScores, merged.postAssessmentScores),
          preAssessmentPassed: mergeBooleanMaps(data?.preAssessmentPassed, merged.preAssessmentPassed),
          postAssessmentPassed: mergeBooleanMaps(data?.postAssessmentPassed, merged.postAssessmentPassed),
          completedDays: mergeBooleanMaps(data?.completedDays, merged.completedDays),
          unlockedBadges: mergeMaps(data?.unlockedBadges, merged.unlockedBadges),
          certificateId: data?.certificateId || merged.certificateId || generateOfficialCertificateId(u.email),
          certificateIssuedAt: data?.certificateIssuedAt || merged.certificateIssuedAt,
          patternQuizScore: Math.max(data?.patternQuizScore ?? 0, merged.patternQuizScore ?? 0),
          patternQuizCompleted: Boolean(data?.patternQuizCompleted ?? merged.patternQuizCompleted),
          stressQuizScore: Math.max(data?.stressQuizScore ?? 0, merged.stressQuizScore ?? 0),
          stressQuizAnswered: Math.max(data?.stressQuizAnswered ?? 0, merged.stressQuizAnswered ?? 0),
          stressQuizCompleted: Boolean(data?.stressQuizCompleted ?? merged.stressQuizCompleted),
          stressQuizAttemptedAt: data?.stressQuizAttemptedAt || merged.stressQuizAttemptedAt || null,
          aptitudeScore: Math.max(data?.aptitudeScore ?? 0, merged.aptitudeScore ?? 0),
          aptitudeCorrectCount: Math.max(data?.aptitudeCorrectCount ?? 0, merged.aptitudeCorrectCount ?? 0),
          aptitudePassed: Boolean(data?.aptitudePassed ?? merged.aptitudePassed),
          aptitudeAttemptedAt: data?.aptitudeAttemptedAt || merged.aptitudeAttemptedAt || null,
          lorIssuedAt: data?.lorIssuedAt || merged.lorIssuedAt || null,
          reportGeneratedAt: data?.reportGeneratedAt || merged.reportGeneratedAt || null,
        };
      }
    } catch (err) {
      console.warn('Could not hydrate progress from Firestore:', err);
    }
    return merged;
  };

  // Real-time bi-directional sync with Firestore for active learner across phone, laptop, and tabs
  useEffect(() => {
    if (!user || !user.uid) {
      isHydratedRef.current = false;
      return;
    }

    // Rapid initial hydration from Firestore
    const localProg = loadStoredProgress(user.email);
    hydrateUserProgress(user, localProg).then((hydrated) => {
      saveStoredProgress(hydrated, user.email);
      isRemoteUpdateRef.current = true;
      setProgress(hydrated);
      isHydratedRef.current = true;
    });

    // Real-time listener for live score updates across multiple devices/tabs
    const unsub = onSnapshot(
      doc(db, 'learners', user.uid),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data?.firstLogin) {
            cacheCanonicalFirstLogin(user.uid, data.firstLogin);
            cacheCanonicalFirstLogin(user.email, data.firstLogin);
          }
          isRemoteUpdateRef.current = true;
          setProgress((prev) => {
            const next: UserProgress = {
              ...prev,
              preAssessmentScores: mergeScoreMaps(data?.preAssessmentScores, prev.preAssessmentScores),
              postAssessmentScores: mergeScoreMaps(data?.postAssessmentScores, prev.postAssessmentScores),
              preAssessmentPassed: mergeBooleanMaps(data?.preAssessmentPassed, prev.preAssessmentPassed),
              postAssessmentPassed: mergeBooleanMaps(data?.postAssessmentPassed, prev.postAssessmentPassed),
              completedDays: mergeBooleanMaps(data?.completedDays, prev.completedDays),
              unlockedBadges: mergeMaps(data?.unlockedBadges, prev.unlockedBadges),
              certificateId: data?.certificateId || prev.certificateId,
              certificateIssuedAt: data?.certificateIssuedAt || prev.certificateIssuedAt,
              patternQuizScore: Math.max(data?.patternQuizScore ?? 0, prev.patternQuizScore ?? 0),
              patternQuizCompleted: Boolean(data?.patternQuizCompleted ?? prev.patternQuizCompleted),
              stressQuizScore: Math.max(data?.stressQuizScore ?? 0, prev.stressQuizScore ?? 0),
              stressQuizAnswered: Math.max(data?.stressQuizAnswered ?? 0, prev.stressQuizAnswered ?? 0),
              stressQuizCompleted: Boolean(data?.stressQuizCompleted ?? prev.stressQuizCompleted),
              stressQuizAttemptedAt: data?.stressQuizAttemptedAt || prev.stressQuizAttemptedAt || null,
              aptitudeScore: Math.max(data?.aptitudeScore ?? 0, prev.aptitudeScore ?? 0),
              aptitudeCorrectCount: Math.max(data?.aptitudeCorrectCount ?? 0, prev.aptitudeCorrectCount ?? 0),
              aptitudePassed: Boolean(data?.aptitudePassed ?? prev.aptitudePassed),
              aptitudeAttemptedAt: data?.aptitudeAttemptedAt || prev.aptitudeAttemptedAt || null,
              lorIssuedAt: data?.lorIssuedAt || prev.lorIssuedAt || null,
              reportGeneratedAt: data?.reportGeneratedAt || prev.reportGeneratedAt || null,
            };
            saveStoredProgress(next, user.email);
            return next;
          });
          isHydratedRef.current = true;
        }
      },
      (err) => {
        console.warn('Real-time Firestore learner onSnapshot notice:', err);
      }
    );

    return () => unsub();
  }, [user?.uid]);

  // Synchronize immediately when mobile tab returns from background or device reconnects online
  useEffect(() => {
    const syncLatestFromFirestore = () => {
      if (user && user.uid) {
        const p = loadStoredProgress(user.email);
        hydrateUserProgress(user, p).then((hydrated) => {
          saveStoredProgress(hydrated, user.email);
          isRemoteUpdateRef.current = true;
          setProgress(hydrated);
          isHydratedRef.current = true;
        });
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        syncLatestFromFirestore();
      }
    };

    const handleOnline = () => {
      syncLatestFromFirestore();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('online', handleOnline);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('online', handleOnline);
    };
  }, [user?.uid, user?.email]);

  // Sync Firebase Google Auth state if popup completes or redirect returns
  useEffect(() => {
    try {
      checkRedirectAuth().then(async (redirectUser) => {
        if (redirectUser && redirectUser.email) {
          await handleAuthSuccess(redirectUser);
        }
      });

      const unsub = onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser && fbUser.email) {
          const mapped: GoogleUser = {
            uid: fbUser.uid,
            name: fbUser.displayName || 'SPSU Google Learner',
            email: fbUser.email,
            photoURL:
              fbUser.photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                fbUser.displayName || 'Learner'
              )}&background=0A192F&color=ffffff&bold=true`,
            signedInAt: new Date().toISOString(),
          };
          saveStoredGoogleUser(mapped);
          const p = loadStoredProgress(mapped.email);
          const hydrated = await hydrateUserProgress(mapped, p);
          saveStoredProgress(hydrated, mapped.email);
          isRemoteUpdateRef.current = true;
          setProgress(hydrated);
          setUser(mapped);
          isHydratedRef.current = true;
          // Record real login attempt in centralized registry & Firestore
          recordUserSignIn(mapped, hydrated);
        }
      });
      return () => unsub();
    } catch {
      // Ignore if offline
    }
  }, []);

  // Persist user progress whenever it changes (guarded against unhydrated overwrite)
  useEffect(() => {
    if (!isHydratedRef.current || !user) return;
    saveStoredProgress(progress, user.email);
    // If progress update was triggered by a remote Firestore snapshot, do not echo back
    if (isRemoteUpdateRef.current) {
      isRemoteUpdateRef.current = false;
      return;
    }
    syncLearnerProgress(user, progress);
  }, [progress, user]);

  const handleAuthSuccess = async (authenticatedUser: GoogleUser) => {
    saveStoredGoogleUser(authenticatedUser);
    const loaded = loadStoredProgress(authenticatedUser.email);
    if (!loaded.certificateId) {
      loaded.certificateId = generateOfficialCertificateId(authenticatedUser.email);
      loaded.certificateIssuedAt = new Date().toISOString();
    }
    const hydrated = await hydrateUserProgress(authenticatedUser, loaded);
    saveStoredProgress(hydrated, authenticatedUser.email);
    isRemoteUpdateRef.current = true;
    setProgress(hydrated);
    setUser(authenticatedUser);
    isHydratedRef.current = true;
    setShowAuthModal(false);
    // Record login attempt in centralized registry & Firestore
    recordUserSignIn(authenticatedUser, hydrated);
  };

  const handleSignOut = async () => {
    isHydratedRef.current = false;
    await signOutGoogle();
    setUser(null);
    saveStoredGoogleUser(null);
    setProgress(loadStoredProgress('anonymous'));
  };

  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setActiveView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowAdminModal(true);
    }
  };

  const handleAdminSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      sessionStorage.setItem('spsu_kapil_admin_auth_v1', 'true');
    } catch {
      // ignore
    }
    setShowAdminModal(false);
    setActiveView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminSignOut = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('spsu_kapil_admin_auth_v1');
    } catch {
      // ignore
    }
    setActiveView('planner');
  };

  const handleSelectDay = (day: number, tab: 'notes' | 'ide' | 'pre' | 'post' | 'project' = 'notes') => {
    setSelectedDay(day);
    setInitialDayTab(tab);
    setActiveView('day-workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePreScore = (day: number, scorePercent: number) => {
    isHydratedRef.current = true;
    isRemoteUpdateRef.current = false;
    setProgress((prev) => {
      const isPassed = scorePercent >= 80;
      const isPostPassed = Boolean(prev.postAssessmentPassed?.[day]);
      const bothPassed = isPassed && isPostPassed;
      const nextCompleted = { ...(prev.completedDays || {}) };
      if (bothPassed) nextCompleted[day] = true;

      const nextState: UserProgress = {
        ...prev,
        preAssessmentScores: { ...prev.preAssessmentScores, [day]: scorePercent },
        preAssessmentPassed: { ...prev.preAssessmentPassed, [day]: isPassed },
        completedDays: nextCompleted,
      };
      if (user) {
        saveStoredProgress(nextState, user.email);
        captureAssessmentScoreRealtime(user, day, 'pre', scorePercent, nextState);
      }
      return nextState;
    });
  };

  const handleSavePostScore = (day: number, scorePercent: number) => {
    isHydratedRef.current = true;
    isRemoteUpdateRef.current = false;
    setProgress((prev) => {
      const isPassed = scorePercent >= 80;
      const isPrePassed = Boolean(prev.preAssessmentPassed?.[day]);
      const bothPassed = isPassed && isPrePassed;
      const nextBadges = { ...prev.unlockedBadges };
      if (isPassed && !nextBadges[day]) {
        nextBadges[day] = new Date().toISOString();
      }
      const nextCompleted = { ...(prev.completedDays || {}) };
      if (bothPassed) nextCompleted[day] = true;

      const nextCertId =
        prev.certificateId || (user && bothPassed ? generateOfficialCertificateId(user.email) : prev.certificateId);
      const nextCertIssued =
        prev.certificateIssuedAt || (bothPassed ? new Date().toISOString() : prev.certificateIssuedAt);

      const nextState: UserProgress = {
        ...prev,
        postAssessmentScores: { ...prev.postAssessmentScores, [day]: scorePercent },
        postAssessmentPassed: { ...prev.postAssessmentPassed, [day]: isPassed },
        completedDays: nextCompleted,
        unlockedBadges: nextBadges,
        certificateId: nextCertId,
        certificateIssuedAt: nextCertIssued,
      };
      if (user) {
        saveStoredProgress(nextState, user.email);
        captureAssessmentScoreRealtime(user, day, 'post', scorePercent, nextState);
      }
      return nextState;
    });
  };

  const handleMarkChallengeSolved = (day: number, challengeId: string) => {
    setProgress((prev) => {
      const exists = prev.completedChallengeIds.includes(challengeId);
      const nextCompleted = exists
        ? prev.completedChallengeIds
        : [...prev.completedChallengeIds, challengeId];
      const nextBadges = { ...prev.unlockedBadges };
      if (!nextBadges[day]) {
        nextBadges[day] = new Date().toISOString();
      }
      return {
        ...prev,
        completedChallengeIds: nextCompleted,
        unlockedBadges: nextBadges,
      };
    });
  };

  const handleMarkDayCompleted = (day: number) => {
    setProgress((prev) => {
      const nextBadges = { ...prev.unlockedBadges };
      if (!nextBadges[day]) {
        nextBadges[day] = new Date().toISOString();
      }
      return {
        ...prev,
        completedDays: {
          ...(prev.completedDays || {}),
          [day]: true,
        },
        unlockedBadges: nextBadges,
      };
    });
  };

  const handleSaveUserCode = (
    challengeId: string,
    lang: SupportedLanguage,
    code: string
  ) => {
    setProgress((prev) => ({
      ...prev,
      savedCode: {
        ...prev.savedCode,
        [challengeId]: {
          ...(prev.savedCode[challengeId] || {}),
          [lang]: code,
        },
      },
    }));
  };

  const activeDayPlan =
    COMPLETE_10_DAY_PLAN.find((d) => d.day === selectedDay) || COMPLETE_10_DAY_PLAN[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A192F]">
      {/* Sticky Header with Real Live Date/Time & Actions */}
      <Navbar
        user={user}
        progress={progress}
        activeView={activeView}
        selectedDay={selectedDay}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        onSelectPlanner={() => setActiveView('planner')}
        onSelectDay={(d) => handleSelectDay(d, 'notes')}
        onOpenAuth={() => setShowAuthModal(true)}
        onSignOut={handleSignOut}
        onOpenBadges={() => setShowBadgesModal(true)}
        onOpenCertificate={() => setShowCertificateModal(true)}
        onOpenAdmin={handleOpenAdmin}
        onOpenLearnerDashboard={() => setShowLearnerDashboard(true)}
        onOpenNotifications={() => {
          setShowNotificationCenter(true);
          setUnreadNotificationsCount(0);
        }}
        unreadNotificationsCount={unreadNotificationsCount}
      />

      {/* Main Layout: Collapsible Left Sidebar + Content Area */}
      <div className="flex-1 flex w-full relative">
        <LeftSidebar
          days={COMPLETE_10_DAY_PLAN}
          selectedDay={selectedDay}
          activeView={activeView}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          onSelectPlanner={() => setActiveView('planner')}
          onSelectDay={(d) => handleSelectDay(d, 'notes')}
          onOpenBadges={() => setShowBadgesModal(true)}
          onOpenCertificate={() => setShowCertificateModal(true)}
          onOpenAdmin={handleOpenAdmin}
          onOpenLearnerDashboard={() => setShowLearnerDashboard(true)}
          onOpenNotifications={() => {
            setShowNotificationCenter(true);
            setUnreadNotificationsCount(0);
          }}
          onOpenPatternQuiz={() => setShowPatternQuiz(true)}
          onOpenStressWheel={() => setShowStressWheel(true)}
          onOpenAptitude={() => setShowAptitude(true)}
          onOpenSelfService={() => setShowSelfService(true)}
          progress={progress}
          user={user}
        />

        {/* Dynamic Margin for Content Area based on Left Sidebar state */}
        <div
          className={`flex-1 transition-all duration-300 w-full flex flex-col ${
            isSidebarCollapsed ? 'pl-16' : 'pl-16 md:pl-72'
          }`}
        >
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {activeView === 'admin' ? (
              <AdminDashboard
                onBackToPortal={() => setActiveView('planner')}
                onAdminSignOut={handleAdminSignOut}
              />
            ) : activeView === 'planner' ? (
              <LandingDayPlanner
                days={COMPLETE_10_DAY_PLAN}
                modules={SYLLABUS_MODULES}
                user={user}
                progress={progress}
                onSelectDay={handleSelectDay}
                onOpenAuth={() => setShowAuthModal(true)}
                onOpenBadges={() => setShowBadgesModal(true)}
                onOpenCertificate={() => setShowCertificateModal(true)}
                onOpenPatternQuiz={() => setShowPatternQuiz(true)}
                onOpenStressWheel={() => setShowStressWheel(true)}
                onOpenAptitude={() => setShowAptitude(true)}
                onOpenSelfService={() => setShowSelfService(true)}
                onOpenLearnerDashboard={() => setShowLearnerDashboard(true)}
              />
            ) : (
              <DayWorkspace
                dayPlan={activeDayPlan}
                allDays={COMPLETE_10_DAY_PLAN}
                initialTab={initialDayTab}
                user={user}
                progress={progress}
                onSelectDay={(d) => handleSelectDay(d, activeView === 'day-workspace' ? initialDayTab : 'notes')}
                onBackToPlanner={() => setActiveView('planner')}
                onRequireAuth={() => setShowAuthModal(true)}
                onSavePreScore={handleSavePreScore}
                onSavePostScore={handleSavePostScore}
                onMarkChallengeSolved={handleMarkChallengeSolved}
                onMarkDayCompleted={handleMarkDayCompleted}
                onSaveUserCode={handleSaveUserCode}
              />
            )}
          </main>

          {/* Proper Navy Blue & White Footer with Real Date & Time */}
          <Footer
            onOpenBadges={() => setShowBadgesModal(true)}
            onOpenCertificate={() => setShowCertificateModal(true)}
            onOpenAdmin={handleOpenAdmin}
          />
        </div>
      </div>

      {showAuthModal && (
        <GoogleAuthModal
          onSuccess={handleAuthSuccess}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {showAdminModal && (
        <AdminLoginModal
          onSuccess={handleAdminSuccess}
          onClose={() => setShowAdminModal(false)}
        />
      )}

      {showBadgesModal && (
        <BadgeGalleryModal
          badges={ALL_DAILY_BADGES}
          user={user}
          progress={progress}
          onClose={() => setShowBadgesModal(false)}
        />
      )}

      {showCertificateModal && (
        <CertificateModal
          user={user}
          progress={progress}
          onClose={() => setShowCertificateModal(false)}
          onPromptAuth={() => {
            setShowCertificateModal(false);
            setShowAuthModal(true);
          }}
        />
      )}

      {showLearnerDashboard && (
        <LearnerDashboardModal
          isOpen={showLearnerDashboard}
          onClose={() => setShowLearnerDashboard(false)}
          user={user}
          progress={progress}
          onSelectDay={(d, tab) => {
            setShowLearnerDashboard(false);
            handleSelectDay(d, tab);
          }}
          onOpenAuth={() => {
            setShowLearnerDashboard(false);
            setShowAuthModal(true);
          }}
          onOpenCertificate={() => {
            setShowLearnerDashboard(false);
            setShowCertificateModal(true);
          }}
          onOpenStressWheel={() => {
            setShowLearnerDashboard(false);
            setShowStressWheel(true);
          }}
          onOpenAptitude={() => {
            setShowLearnerDashboard(false);
            setShowAptitude(true);
          }}
          onOpenSelfService={() => {
            setShowLearnerDashboard(false);
            setShowSelfService(true);
          }}
        />
      )}

      {showNotificationCenter && (
        <NotificationCenterModal
          isOpen={showNotificationCenter}
          onClose={() => setShowNotificationCenter(false)}
          onSelectDay={(d, tab) => {
            setShowNotificationCenter(false);
            handleSelectDay(d, tab);
          }}
        />
      )}

      {/* 100 Real-Time Industry Scenarios: DSA Pattern Identification Quiz Modal */}
      {showPatternQuiz && (
        <IndustryPatternQuizModal
          isOpen={showPatternQuiz}
          onClose={() => setShowPatternQuiz(false)}
          user={user}
          progress={progress}
          onUpdateProgress={setProgress}
        />
      )}

      {/* Spinning Wheel: B-Tech Stress Buster Quiz (25 Scenarios + Kapil Mentorship) */}
      {showStressWheel && (
        <SpinningWheelQuizModal
          isOpen={showStressWheel}
          onClose={() => setShowStressWheel(false)}
          user={user}
          progress={progress}
          onUpdateProgress={setProgress}
        />
      )}

      {/* 50-MCQ Placement Aptitude Master Assessment (Quant, Logic, Verbal, Kapil Shortcuts) */}
      {showAptitude && (
        <AptitudeAssessmentModal
          isOpen={showAptitude}
          onClose={() => setShowAptitude(false)}
          user={user}
          progress={progress}
          onUpdateProgress={setProgress}
        />
      )}

      {/* Self-Service Credentials Hub (Download 360° Report, Mentor Kapil LOR, Badges & Cert) */}
      {showSelfService && (
        <SelfServiceCredentialsModal
          isOpen={showSelfService}
          onClose={() => setShowSelfService(false)}
          user={user}
          progress={progress}
          onOpenAuth={() => {
            setShowSelfService(false);
            setShowAuthModal(true);
          }}
        />
      )}

      {/* 09:00 AM – 09:00 PM Daily Operating Hours Gate */}
      {!isAdminAuthenticated && (
        <OperatingHoursModal
          onAdminClick={() => setShowAdminModal(true)}
          onOverrideToggle={() => setHoursOverrideTick((t) => t + 1)}
        />
      )}
    </div>
  );
}

export default App;
