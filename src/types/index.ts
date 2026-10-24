export type SupportedLanguage = 'c' | 'cpp' | 'java' | 'python';

export interface CurriculumModule {
  id: number;
  title: string;
  coverage: string;
  learningOutcomes: string;
  alignedDay: number;
}

export interface ProgrammingNote {
  id: string;
  title: string;
  conceptSummary: string;
  timeSpaceNote: string;
  kapilMentorTip: string;
  codeByLanguage: Record<SupportedLanguage, string>;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  explanation?: string;
}

export interface PracticalChallenge {
  id: string;
  day: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  moduleTag: string;
  problemStatement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  kapilIntuition: string;
  timeComplexity: string;
  spaceComplexity: string;
  starterCode: Record<SupportedLanguage, string>;
  solutionCode: Record<SupportedLanguage, string>;
  testCases: TestCase[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  codeLanguage?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'Theory (30%)' | 'Practical Execution & Trace (70%)';
}

export interface DayScheduleSlot {
  timeSlot: string;
  activity: string;
  type: 'Pre-Assessment' | 'Theory (30%)' | 'Practical IDE Lab (70%)' | 'Post-Assessment & Badge';
  duration: string;
}

export interface DayPlan {
  day: number;
  title: string;
  modulesCovered: number[];
  moduleNames: string[];
  coverageSummary: string;
  learningOutcomes: string;
  theoryAllocation: string; // Strictly "30% Theory & Architecture"
  practicalAllocation: string; // Strictly "70% Hands-on IDE & Assessment"
  dailySchedule: DayScheduleSlot[];
  programmingNotes: ProgrammingNote[];
  practicalChallenges: PracticalChallenge[];
  preAssessment: AssessmentQuestion[];
  postAssessment: AssessmentQuestion[];
  badge: DailyBadge;
}

export interface DailyBadge {
  id: string;
  day: number;
  title: string;
  subtitle: string;
  moduleRef: string;
  criteria: string;
}

export interface GoogleUser {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  signedInAt: string;
}

export interface UserProgress {
  preAssessmentScores: Record<number, number>; // day -> percentage 0..100
  postAssessmentScores: Record<number, number>; // day -> percentage 0..100
  preAssessmentPassed: Record<number, boolean>;
  postAssessmentPassed: Record<number, boolean>;
  completedChallengeIds: string[];
  readNoteIds: string[];
  completedDays?: Record<number, boolean>;
  unlockedBadges: Record<number, string>; // day -> ISO timestamp unlocked
  savedCode: Record<string, Record<SupportedLanguage, string>>; // challengeId -> lang -> code
  certificateId: string | null;
  certificateIssuedAt: string | null;
}

export interface LearnerRecord {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  firstLogin: string;
  lastLoginAttempt: string;
  preAssessmentScores: Record<number, number>;
  postAssessmentScores: Record<number, number>;
  preAssessmentPassed: Record<number, boolean>;
  postAssessmentPassed: Record<number, boolean>;
  completedDays: Record<number, boolean>;
  unlockedBadges: Record<number, string>;
  certificateId?: string | null;
  certificateIssuedAt?: string | null;
}
