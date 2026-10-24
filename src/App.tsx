import React, { useState, useEffect } from 'react';
import { GoogleUser, SupportedLanguage, UserProgress } from './types';
import {
  COMPLETE_10_DAY_PLAN,
  SYLLABUS_MODULES,
  ALL_DAILY_BADGES,
} from './data/curriculum10Days';
import {
  loadStoredGoogleUser,
  saveStoredGoogleUser,
  loadStoredProgress,
  saveStoredProgress,
  generateOfficialCertificateId,
} from './utils/storage';
import { auth, signOutGoogle, checkRedirectAuth } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { LeftSidebar } from './components/LeftSidebar';
import { Footer } from './components/Footer';
import { LandingDayPlanner } from './components/LandingDayPlanner';
import { DayWorkspace } from './components/DayWorkspace';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { BadgeGalleryModal } from './components/BadgeGalleryModal';
import { CertificateModal } from './components/CertificateModal';

export function App() {
  const [user, setUser] = useState<GoogleUser | null>(() => loadStoredGoogleUser());
  const [progress, setProgress] = useState<UserProgress>(() =>
    loadStoredProgress(loadStoredGoogleUser()?.email)
  );

  // Landing page defaults to Complete Day Planner ('planner')
  const [activeView, setActiveView] = useState<'planner' | 'day-workspace'>('planner');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [initialDayTab, setInitialDayTab] = useState<'notes' | 'ide' | 'pre' | 'post'>('notes');

  // Modals
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showBadgesModal, setShowBadgesModal] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  // Left Sidebar Expand/Collapse state (defaults to expanded on desktop, toggleable anytime)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Sync Firebase Google Auth state if popup completes or redirect returns
  useEffect(() => {
    try {
      checkRedirectAuth().then((redirectUser) => {
        if (redirectUser && redirectUser.email) {
          handleAuthSuccess(redirectUser);
        }
      });

      const unsub = onAuthStateChanged(auth, (fbUser) => {
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
          setUser(mapped);
          saveStoredGoogleUser(mapped);
          setProgress(loadStoredProgress(mapped.email));
        }
      });
      return () => unsub();
    } catch {
      // Ignore if offline
    }
  }, []);

  // Persist user progress whenever it changes
  useEffect(() => {
    saveStoredProgress(progress, user?.email);
  }, [progress, user]);

  const handleAuthSuccess = (authenticatedUser: GoogleUser) => {
    setUser(authenticatedUser);
    saveStoredGoogleUser(authenticatedUser);
    const loaded = loadStoredProgress(authenticatedUser.email);
    if (!loaded.certificateId) {
      loaded.certificateId = generateOfficialCertificateId(authenticatedUser.email);
      loaded.certificateIssuedAt = new Date().toISOString();
    }
    setProgress(loaded);
    setShowAuthModal(false);
  };

  const handleSignOut = async () => {
    await signOutGoogle();
    setUser(null);
    saveStoredGoogleUser(null);
  };

  const handleSelectDay = (day: number, tab: 'notes' | 'ide' | 'pre' | 'post' = 'notes') => {
    setSelectedDay(day);
    setInitialDayTab(tab);
    setActiveView('day-workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePreScore = (day: number, scorePercent: number) => {
    setProgress((prev) => ({
      ...prev,
      preAssessmentScores: { ...prev.preAssessmentScores, [day]: scorePercent },
      preAssessmentPassed: { ...prev.preAssessmentPassed, [day]: true },
    }));
  };

  const handleSavePostScore = (day: number, scorePercent: number) => {
    setProgress((prev) => {
      const nextBadges = { ...prev.unlockedBadges };
      if (!nextBadges[day]) {
        nextBadges[day] = new Date().toISOString();
      }
      return {
        ...prev,
        postAssessmentScores: { ...prev.postAssessmentScores, [day]: scorePercent },
        postAssessmentPassed: { ...prev.postAssessmentPassed, [day]: true },
        unlockedBadges: nextBadges,
        certificateId:
          prev.certificateId || (user ? generateOfficialCertificateId(user.email) : null),
        certificateIssuedAt: prev.certificateIssuedAt || new Date().toISOString(),
      };
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
            {activeView === 'planner' ? (
              <LandingDayPlanner
                days={COMPLETE_10_DAY_PLAN}
                modules={SYLLABUS_MODULES}
                user={user}
                progress={progress}
                onSelectDay={handleSelectDay}
                onOpenAuth={() => setShowAuthModal(true)}
                onOpenBadges={() => setShowBadgesModal(true)}
                onOpenCertificate={() => setShowCertificateModal(true)}
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
          />
        </div>
      </div>

      {showAuthModal && (
        <GoogleAuthModal
          onSuccess={handleAuthSuccess}
          onClose={() => setShowAuthModal(false)}
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
    </div>
  );
}

export default App;
