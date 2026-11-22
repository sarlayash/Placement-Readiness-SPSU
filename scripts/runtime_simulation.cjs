const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');

console.log('====================================================');
console.log('   RUNNING COMPREHENSIVE RUNTIME SIMULATION TEST    ');
console.log('====================================================\n');

// Mock browser globals
const localStorageStore = {};
global.localStorage = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, val) => { localStorageStore[key] = String(val); },
  removeItem: (key) => { delete localStorageStore[key]; },
  clear: () => { for (const k in localStorageStore) delete localStorageStore[k]; }
};

global.window = {
  localStorage: global.localStorage,
  location: { hostname: 'localhost', origin: 'http://localhost:5173' },
  focus: () => {}
};

function transpileAndRun(filePath, mocks = {}) {
  const content = fs.readFileSync(filePath, 'utf8');
  const res = ts.transpileModule(content, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022
    }
  });
  const mod = { exports: {} };
  const defaultMocks = {
    'firebase/app': {
      getApps: () => [],
      initializeApp: () => ({}),
      getApp: () => ({})
    },
    'firebase/firestore': {
      getFirestore: () => ({}),
      collection: () => ({}),
      doc: () => ({}),
      setDoc: async () => {},
      getDocs: async () => ({ docs: [] }),
      onSnapshot: () => () => {}
    },
    'firebase/auth': {
      getAuth: () => ({}),
      GoogleAuthProvider: class GoogleAuthProvider {
        setCustomParameters() {}
      }
    }
  };
  const mergedMocks = { ...defaultMocks, ...mocks };
  const fn = new Function('module', 'exports', 'require', res.outputText);
  fn(mod, mod.exports, (modName) => {
    if (mergedMocks[modName]) return mergedMocks[modName];
    if (modName.startsWith('./') || modName.startsWith('../')) {
      const targetPath = path.resolve(path.dirname(filePath), modName + '.ts');
      const targetIndexPath = path.resolve(path.dirname(filePath), modName, 'index.ts');
      if (fs.existsSync(targetPath)) return transpileAndRun(targetPath, mergedMocks);
      if (fs.existsSync(targetIndexPath)) return transpileAndRun(targetIndexPath, mergedMocks);
    }
    return {};
  });
  return mod.exports;
}

let passedChecks = 0;
let failedChecks = 0;

function check(desc, condition) {
  if (condition) {
    passedChecks++;
    console.log(`  ✓ ${desc}`);
  } else {
    failedChecks++;
    console.error(`  ✗ FAIL: ${desc}`);
  }
}

// -----------------------------------------------------------------------------
// STEP 1: Storage Engine Simulation
// -----------------------------------------------------------------------------
console.log('>>> [Step 1] Simulating User Lifecycle in Storage Engine...');

const storageMod = transpileAndRun(path.join(root, 'src/utils/storage.ts'));

// 1. Initial anonymous progress
let anonProg = storageMod.loadStoredProgress();
check('Default progress has empty completedDays', Object.keys(anonProg.completedDays || {}).length === 0);
check('Default progress has empty preAssessmentScores', Object.keys(anonProg.preAssessmentScores || {}).length === 0);

// 2. Answering Day 1 Pre and Post assessments
anonProg.preAssessmentScores[1] = 42;
anonProg.preAssessmentPassed[1] = true;
anonProg.postAssessmentScores[1] = 45;
anonProg.postAssessmentPassed[1] = true;
anonProg.completedDays[1] = true;
anonProg.unlockedBadges[1] = true;

storageMod.saveStoredProgress(anonProg);
const reloadedAnon = storageMod.loadStoredProgress();
check('Day 1 progress updated in storage', reloadedAnon.completedDays[1] === true);
check('Day 1 badge unlocked', reloadedAnon.unlockedBadges[1] === true);

// 3. User logs in with Google account (Demo or real user)
const testUser = {
  uid: 'test-learner-999',
  email: 'learner999@placement.dev',
  name: 'Ananya Sharma',
  photoURL: 'https://avatar.url',
  signedInAt: new Date().toISOString()
};

storageMod.saveStoredGoogleUser(testUser);
const savedUser = storageMod.loadStoredGoogleUser();
check('User session saved and retrieved', savedUser.email === testUser.email && savedUser.name === testUser.name);

// 4. Progress isolated per user account
let userProg = storageMod.loadStoredProgress(testUser.email);
check('New user gets clean initialized progress', userProg.completedDays[1] === undefined);

// 5. User completes all 10 Days
for (let d = 1; d <= 10; d++) {
  userProg.completedDays[d] = true;
  userProg.unlockedBadges[d] = true;
  userProg.postAssessmentScores[d] = 48;
  userProg.postAssessmentPassed[d] = true;
}

storageMod.saveStoredProgress(userProg, testUser.email);
userProg = storageMod.loadStoredProgress(testUser.email);

check('User completed all 10 Days in storage', Object.keys(userProg.completedDays).length === 10);

// 6. Certificate generation
const certId = storageMod.generateOfficialCertificateId(testUser.email);
check('Certificate ID generated with learner email format', certId.startsWith('KAPIL-15D-') || certId.startsWith('KAPIL-10D-'));

userProg.certificateId = certId;
userProg.certificateIssuedAt = new Date().toISOString();
storageMod.saveStoredProgress(userProg, testUser.email);
userProg = storageMod.loadStoredProgress(testUser.email);
check('Certificate ID persisted in user progress', userProg.certificateId === certId);

// -----------------------------------------------------------------------------
// STEP 2: Learner Registry & Live Analytics Simulation
// -----------------------------------------------------------------------------
console.log('\n>>> [Step 2] Simulating Learner Registry Synchronization...');

const registryMod = transpileAndRun(path.join(root, 'src/utils/learnerRegistry.ts'), {
  './storage': storageMod
});

// Reconcile learner into local registry
const localRegistry = registryMod.getLocalLearnersRegistry();
const initialLearners = Object.values(localRegistry);
check('Initial local registry loaded with seed users', initialLearners.length >= 70);

registryMod.reconcileLearnerIntoMap(localRegistry, {
  uid: testUser.uid,
  name: testUser.name,
  email: testUser.email,
  photoURL: testUser.photoURL,
  firstLogin: testUser.signedInAt,
  lastLoginAttempt: testUser.signedInAt,
  preAssessmentScores: userProg.preAssessmentScores,
  postAssessmentScores: userProg.postAssessmentScores,
  preAssessmentPassed: userProg.preAssessmentPassed,
  postAssessmentPassed: userProg.postAssessmentPassed,
  completedDays: userProg.completedDays,
  unlockedBadges: userProg.unlockedBadges,
  certificateId: userProg.certificateId,
  certificateIssuedAt: userProg.certificateIssuedAt,
  patternQuizScore: 94,
  patternQuizCompleted: true,
  stressQuizScore: 24,
  stressQuizAnswered: 25,
  stressQuizCompleted: true,
  stressQuizAttemptedAt: new Date().toISOString(),
  aptitudeScore: 92,
  aptitudeCorrectCount: 46,
  aptitudePassed: true,
  aptitudeAttemptedAt: new Date().toISOString()
});

registryMod.saveLocalLearnersRegistry(localRegistry);

const reloadedRegistry = registryMod.getLocalLearnersRegistry();
const foundRecord = reloadedRegistry[testUser.email.toLowerCase()];
check('Learner successfully reconciled into local registry', !!foundRecord);
check('Registry retains learner name', foundRecord && foundRecord.name === testUser.name);
check('Registry retains certificate ID', foundRecord && foundRecord.certificateId === certId);
check('Registry retains Pattern Quiz score', foundRecord && foundRecord.patternQuizScore === 94);
check('Registry retains Aptitude score', foundRecord && foundRecord.aptitudeScore === 92);

// -----------------------------------------------------------------------------
// STEP 3: Operating Hours Gate Simulation
// -----------------------------------------------------------------------------
console.log('\n>>> [Step 3] Simulating Operating Hours Gate & Evaluator Override...');

const hoursMod = transpileAndRun(path.join(root, 'src/utils/operatingHours.ts'));

// Initial operating hours status
const status = hoursMod.checkOperatingHours();
check('Operating hours status object returned', typeof status.isOpen === 'boolean' && typeof status.formattedCurrentTime === 'string');

// Test evaluator override toggle
hoursMod.setEvaluatorOverride(true);
check('Evaluator override enabled', hoursMod.isEvaluatorOverrideActive() === true);
const overrideStatus = hoursMod.checkOperatingHours();
check('When override active, portal is open', overrideStatus.isOpen === true && overrideStatus.isOverridden === true);

hoursMod.setEvaluatorOverride(false);
check('Evaluator override disabled cleanly', hoursMod.isEvaluatorOverrideActive() === false);

// -----------------------------------------------------------------------------
// STEP 4: LOR & Report Profile Generation Simulation
// -----------------------------------------------------------------------------
console.log('\n>>> [Step 4] Simulating 360° Report Profile & LOR Persona Construction...');

const reportMod = transpileAndRun(path.join(root, 'src/utils/reportAndLorGenerator.ts'), {
  'jspdf': class MockJsPdf {
    constructor() { this.internal = { pageSize: { getWidth: () => 210, getHeight: () => 297 } }; }
    addPage() {}
    setFont() {}
    setFontSize() {}
    setTextColor() {}
    setDrawColor() {}
    setFillColor() {}
    setLineWidth() {}
    roundedRect() {}
    rect() {}
    line() {}
    text() {}
    splitTextToSize(t) { return [t]; }
    save() {}
  }
});

const persona = reportMod.getPersonalizedLearnerProfile(foundRecord, userProg);
check('Persona archetype generated', typeof persona.archetype === 'string' && persona.archetype.length > 0);
check('Persona overall grade assigned', typeof persona.overallGrade === 'string');
check('Persona average post-assessment score calculated', persona.scores.avgPostScore === 48);
check('Percentile rank assigned', persona.percentileRank.includes('Top') || persona.percentileRank.includes('%'));
check('Persona competencies list generated (>= 4)', Array.isArray(persona.competencies) && persona.competencies.length >= 4);

const hash = reportMod.generateVerificationHash(testUser.email, 'LOR');
check('Cryptographic verification hash generated for LOR', hash && hash.startsWith('VER-LOR-'));

const certHash = reportMod.generateVerificationHash(testUser.email, 'CERT');
check('Cryptographic verification hash generated for Certificate', certHash && certHash.startsWith('VER-CERT-'));

// -----------------------------------------------------------------------------
// FINAL SUMMARY
// -----------------------------------------------------------------------------
console.log('\n====================================================');
console.log('              RUNTIME SIMULATION SUMMARY            ');
console.log('====================================================');
console.log(`Passed Checks:  ${passedChecks}`);
console.log(`Failed Checks:  ${failedChecks}`);

if (failedChecks > 0) {
  console.error('\n❌ RUNTIME ERRORS DETECTED!');
  process.exit(1);
} else {
  console.log('\n🌟 ALL RUNTIME SIMULATION CHECKS PASSED FLAWLESSLY!');
  process.exit(0);
}
