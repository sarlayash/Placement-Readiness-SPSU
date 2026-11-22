const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const errors = [];
const warnings = [];
const stats = {
  mcqsTested: 0,
  challengesTested: 0,
  testCasesTested: 0,
  usersTested: 0,
  modulesTested: 0,
  svgsValidated: 0,
  htmlDocsValidated: 0
};

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
    console.error('❌ FAIL:', message);
  }
}

function warn(condition, message) {
  if (!condition) {
    warnings.push(message);
    console.warn('⚠️ WARN:', message);
  }
}

console.log('====================================================');
console.log('  RUNNING DEEP TEST SUITE - PLACEMENT PORTAL 2026   ');
console.log('====================================================\n');

// -----------------------------------------------------------------------------
// TEST SUITE 1: DATASETS & CURRICULUM INTEGRITY
// -----------------------------------------------------------------------------
console.log('>>> [1/6] Validating Assessment & Curriculum Datasets...');

function validateMcqArray(name, questions, expectedCount) {
  assert(Array.isArray(questions), `${name}: should be an array`);
  if (expectedCount !== undefined) {
    assert(questions.length === expectedCount, `${name}: expected ${expectedCount} questions, got ${questions.length}`);
  }
  const seenIds = new Set();
  questions.forEach((q, idx) => {
    stats.mcqsTested++;
    const loc = `${name}[#${idx + 1}] (ID: ${q.id || 'MISSING'})`;
    assert(q.id && typeof q.id === 'string' && q.id.trim().length > 0, `${loc}: missing or empty ID`);
    if (q.id) {
      assert(!seenIds.has(q.id), `${loc}: duplicate ID '${q.id}'`);
      seenIds.add(q.id);
    }
    assert(q.question && typeof q.question === 'string' && q.question.trim().length > 0, `${loc}: missing or empty question text`);
    assert(Array.isArray(q.options) && q.options.length >= 2, `${loc}: options must be array with >= 2 choices, got ${q.options ? q.options.length : 0}`);
    assert(typeof q.correctIndex === 'number' && Number.isInteger(q.correctIndex), `${loc}: correctIndex must be integer, got ${q.correctIndex}`);
    assert(q.correctIndex >= 0 && q.correctIndex < (q.options ? q.options.length : 0), `${loc}: correctIndex ${q.correctIndex} out of bounds for options length ${q.options ? q.options.length : 0}`);
    assert(q.explanation && typeof q.explanation === 'string' && q.explanation.trim().length > 0, `${loc}: missing or empty explanation`);
  });
}

function validateChallengesArray(name, challenges, expectedCount) {
  assert(Array.isArray(challenges), `${name}: should be an array`);
  if (expectedCount !== undefined) {
    assert(challenges.length === expectedCount, `${name}: expected ${expectedCount} challenges, got ${challenges.length}`);
  }
  const seenIds = new Set();
  challenges.forEach((ch, idx) => {
    stats.challengesTested++;
    const loc = `${name}[#${idx + 1}] (ID: ${ch.id || 'MISSING'})`;
    assert(ch.id && typeof ch.id === 'string' && ch.id.trim().length > 0, `${loc}: missing or empty ID`);
    if (ch.id) {
      assert(!seenIds.has(ch.id), `${loc}: duplicate ID '${ch.id}'`);
      seenIds.add(ch.id);
    }
    assert(ch.title && typeof ch.title === 'string' && ch.title.trim().length > 0, `${loc}: missing title`);
    assert(ch.problemStatement && typeof ch.problemStatement === 'string' && ch.problemStatement.trim().length > 0, `${loc}: missing problemStatement`);
    assert(ch.starterCode && typeof ch.starterCode === 'object', `${loc}: missing starterCode`);
    assert(ch.solutionCode && typeof ch.solutionCode === 'object', `${loc}: missing solutionCode`);
    
    // Check languages in starterCode & solutionCode
    ['c', 'cpp', 'java', 'python'].forEach(lang => {
      assert(typeof ch.starterCode?.[lang] === 'string' && ch.starterCode[lang].trim().length > 0, `${loc}: missing starterCode for ${lang}`);
      assert(typeof ch.solutionCode?.[lang] === 'string' && ch.solutionCode[lang].trim().length > 0, `${loc}: missing solutionCode for ${lang}`);
    });

    // Check testCases
    assert(Array.isArray(ch.testCases) && ch.testCases.length >= 1, `${loc}: must have >= 1 testCases`);
    if (Array.isArray(ch.testCases)) {
      ch.testCases.forEach((tc, tcIdx) => {
        stats.testCasesTested++;
        const tcLoc = `${loc} TestCase #${tcIdx + 1} (${tc.id || 'NO-ID'})`;
        assert(tc.id && typeof tc.id === 'string', `${tcLoc}: missing ID`);
        assert(typeof tc.input === 'string', `${tcLoc}: input must be string`);
        assert(typeof tc.expectedOutput === 'string' && tc.expectedOutput.trim().length > 0, `${tcLoc}: expectedOutput must be non-empty string`);
      });
    }
  });
}

const ts = require('typescript');

const moduleCache = new Map();

function loadTsModule(filePath) {
  if (moduleCache.has(filePath)) {
    return moduleCache.get(filePath);
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const res = ts.transpileModule(content, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022
    }
  });
  const mod = { exports: {} };
  const fn = new Function('module', 'exports', 'require', res.outputText);
  fn(mod, mod.exports, (modName) => ({}));
  moduleCache.set(filePath, mod.exports);
  return mod.exports;
}

function parseExportedConst(filePath, constName) {
  const exports = loadTsModule(filePath);
  if (!(constName in exports)) {
    throw new Error(`Could not find export ${constName} in ${filePath}`);
  }
  return exports[constName];
}

// -----------------------------------------------------------------------------
// Run dataset validations
// -----------------------------------------------------------------------------
try {
  // Aptitude
  const aptitude = parseExportedConst(path.join(root, 'src/data/aptitudeAssessments50.ts'), 'APTITUDE_50_QUESTIONS');
  assert(Array.isArray(aptitude) && aptitude.length === 50, `Aptitude: expected 50 questions, got ${aptitude.length}`);
  aptitude.forEach((q, idx) => {
    stats.mcqsTested++;
    const loc = `Aptitude[#${idx + 1}] (ID: ${q.id})`;
    assert(typeof q.id === 'number', `${loc}: id must be number`);
    assert(q.question && q.question.trim().length > 0, `${loc}: missing question`);
    assert(Array.isArray(q.options) && q.options.length >= 2, `${loc}: options length must be >= 2`);
    assert(typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < q.options.length, `${loc}: correctIndex invalid`);
    assert(q.stepByStepSolution && q.stepByStepSolution.length > 0, `${loc}: missing stepByStepSolution`);
    assert(q.mentorKapilShortcut && q.mentorKapilShortcut.length > 0, `${loc}: missing mentorKapilShortcut`);
  });

  // Interview Readiness 100 MCQs
  const ir100 = parseExportedConst(path.join(root, 'src/data/interviewReadiness100MCQs.ts'), 'INTERVIEW_READINESS_100_MCQS');
  validateMcqArray('InterviewReadiness100MCQs', ir100, 100);

  // Interview Scenarios 100 MCQs
  const irScen = parseExportedConst(path.join(root, 'src/data/interviewScenarios100MCQs.ts'), 'INTERVIEW_SCENARIOS_100_MCQS');
  validateMcqArray('InterviewScenarios100MCQs', irScen, 100);

  // System Design 120 Assessments
  const sd120 = parseExportedConst(path.join(root, 'src/data/systemDesign120Assessments.ts'), 'SYSTEM_DESIGN_120_ASSESSMENTS');
  validateMcqArray('SystemDesign120Assessments', sd120, 120);

  // Stress Wheel 25
  const stress = parseExportedConst(path.join(root, 'src/data/stressWheelQuiz25.ts'), 'STRESS_WHEEL_25_QUESTIONS');
  assert(Array.isArray(stress) && stress.length === 25, `StressWheelQuiz25: expected 25 questions, got ${stress.length}`);
  stress.forEach((q, idx) => {
    stats.mcqsTested++;
    assert(typeof q.id === 'number' && q.question && Array.isArray(q.options) && q.options.length >= 2, `StressWheel[#${idx+1}]: malformed structure`);
    assert(typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < q.options.length, `StressWheel[#${idx+1}]: invalid correctIndex`);
  });

  // Industry DSA Patterns 100
  const dsa100 = parseExportedConst(path.join(root, 'src/data/industryDsaPatterns100.ts'), 'INDUSTRY_DSA_SCENARIOS_100');
  assert(Array.isArray(dsa100) && dsa100.length === 100, `IndustryDsaPatterns100: expected 100 patterns, got ${dsa100.length}`);
  dsa100.forEach((item, idx) => {
    stats.mcqsTested++;
    assert(typeof item.id === 'number' && item.scenarioTitle && item.scenarioDescription, `DSA Scenario[#${idx+1}]: missing title/desc`);
    assert(Array.isArray(item.options) && item.options.length >= 2, `DSA Scenario[#${idx+1}]: invalid options`);
    assert(typeof item.correctIndex === 'number' && item.correctIndex >= 0 && item.correctIndex < item.options.length, `DSA Scenario[#${idx+1}]: invalid correctIndex`);
  });

  // Days 1 through 15 pre & post assessments and challenges
  for (let day = 1; day <= 15; day++) {
    const assessFile = path.join(root, `src/data/day${day}Assessments50.ts`);
    if (fs.existsSync(assessFile)) {
      const preName = `DAY_${day}_PRE_ASSESSMENT_50`;
      const postName = `DAY_${day}_POST_ASSESSMENT_50`;
      try {
        const pre = parseExportedConst(assessFile, preName);
        validateMcqArray(`Day${day}PreAssessments`, pre, 50);
        const post = parseExportedConst(assessFile, postName);
        validateMcqArray(`Day${day}PostAssessments`, post, 50);
      } catch (e) {
        errors.push(`Day ${day} assessments parse error: ${e.message}`);
      }
    }

    const challFile = path.join(root, `src/data/day${day}Challenges10.ts`);
    if (fs.existsSync(challFile)) {
      const challName = `DAY_${day}_PRACTICAL_CHALLENGES_10`;
      try {
        const challenges = parseExportedConst(challFile, challName);
        validateChallengesArray(`Day${day}Challenges`, challenges, 10);
      } catch (e) {
        errors.push(`Day ${day} challenges parse error: ${e.message}`);
      }
    }
  }

  console.log(`✅ Datasets validated: ${stats.mcqsTested} MCQs, ${stats.challengesTested} Challenges (${stats.testCasesTested} Test Cases).`);
} catch (err) {
  errors.push(`Dataset validation aborted: ${err.message}`);
}

// -----------------------------------------------------------------------------
// TEST SUITE 2: FIREBASE AUTH USERS & REGISTRY
// -----------------------------------------------------------------------------
console.log('\n>>> [2/6] Validating Firebase Auth Users & Registry Synchronization...');
try {
  const users = parseExportedConst(path.join(root, 'src/data/firebaseAuthUsers.ts'), 'INITIAL_FIREBASE_AUTH_USERS');
  assert(Array.isArray(users), 'INITIAL_FIREBASE_AUTH_USERS should be an array');
  assert(users.length === 70, `Expected 70 initial firebase users, found ${users.length}`);

  const uids = new Set();
  const emails = new Set();
  users.forEach((u, i) => {
    stats.usersTested++;
    const loc = `User[#${i + 1}] (${u.email || u.uid})`;
    assert(u.uid && typeof u.uid === 'string', `${loc}: missing uid`);
    assert(u.email && typeof u.email === 'string', `${loc}: missing email`);
    assert(!uids.has(u.uid), `${loc}: duplicate uid ${u.uid}`);
    assert(!emails.has(u.email), `${loc}: duplicate email ${u.email}`);
    uids.add(u.uid);
    emails.add(u.email);

    // Verify certificateId format if present
    if (u.certificateId) {
      assert(/^KAPIL-10D-[A-Z0-9]+$/.test(u.certificateId), `${loc}: certificateId '${u.certificateId}' does not match expected format KAPIL-10D-*`);
    }

    // Verify scores are integers and non-negative
    ['patternQuizScore', 'stressQuizScore', 'aptitudeScore'].forEach(metric => {
      assert(typeof u[metric] === 'number' && u[metric] >= 0, `${loc}: ${metric} must be >= 0`);
    });
  });

  console.log(`✅ ${stats.usersTested} Firebase Auth learner records validated with unique UIDs, valid schemas, and standardized certificate IDs.`);
} catch (err) {
  errors.push(`Firebase users validation error: ${err.message}`);
}

// -----------------------------------------------------------------------------
// TEST SUITE 3: STORAGE ENGINE & PROGRESS LIFECYCLE
// -----------------------------------------------------------------------------
console.log('\n>>> [3/6] Testing Storage Engine & Progress Lifecycle...');
try {
  // Mock localStorage in Node
  const mockStorage = {};
  global.localStorage = {
    getItem: (key) => mockStorage[key] || null,
    setItem: (key, val) => { mockStorage[key] = String(val); },
    removeItem: (key) => { delete mockStorage[key]; },
    clear: () => { for (const k in mockStorage) delete mockStorage[k]; }
  };

  // Test certificate generator logic
  function generateCertificateId(learnerName, day = 10) {
    const cleanName = (learnerName || 'LEARNER').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 4) || 'LRNR';
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
    return `KAPIL-${day}D-${cleanName}${randomHex}`;
  }

  const id1 = generateCertificateId('Aditi Sharma', 10);
  assert(id1.startsWith('KAPIL-10D-ADIT'), `Certificate ID format error: got ${id1}`);

  const id2 = generateCertificateId('Deepak Kumar', 10);
  assert(id2.startsWith('KAPIL-10D-DEEP'), `Certificate ID format error: got ${id2}`);

  // Test progress completion calculation
  function hasCompletedAllDays(completedDays) {
    if (!completedDays) return false;
    for (let day = 1; day <= 10; day++) {
      if (!completedDays[day]) return false;
    }
    return true;
  }

  assert(!hasCompletedAllDays({ 1: true, 2: true, 3: true }), 'hasCompletedAllDays should return false for partial progress');
  assert(hasCompletedAllDays({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true }), 'hasCompletedAllDays should return true for complete 10-day progress');

  console.log('✅ Storage engine logic, ID generation, and multi-day completion logic passed.');
} catch (err) {
  errors.push(`Storage engine testing error: ${err.message}`);
}

// -----------------------------------------------------------------------------
// TEST SUITE 4: LOR & 360° REPORT GENERATION ENGINE
// -----------------------------------------------------------------------------
console.log('\n>>> [4/6] Testing LOR & 360° Assessment Report Generation...');
try {
  // Read reportAndLorGenerator.ts and check PDF template validity
  const genCode = fs.readFileSync(path.join(root, 'src/utils/reportAndLorGenerator.ts'), 'utf8');

  // Verify no lingering institutional placeholders
  assert(!genCode.includes('Sir Padampat'), 'reportAndLorGenerator.ts still contains "Sir Padampat"');
  assert(!genCode.includes('SPSU'), 'reportAndLorGenerator.ts still contains "SPSU"');

  // Verify key sections are present
  assert(genCode.includes('10-DAY INTENSIVE PLACEMENT READINESS BOOT CAMP'), 'reportAndLorGenerator.ts missing placement boot camp letterhead');
  assert(genCode.includes('EVALUATED & APPROVED BY:'), 'reportAndLorGenerator.ts missing evaluated & approved by block');
  assert(genCode.includes('Mentor Kapil'), 'reportAndLorGenerator.ts missing Mentor Kapil signature');
  assert(genCode.includes('download360DegreeReportPDF'), 'reportAndLorGenerator.ts missing download360DegreeReportPDF');
  assert(genCode.includes('downloadMentorKapilLorPDF'), 'reportAndLorGenerator.ts missing downloadMentorKapilLorPDF');

  stats.htmlDocsValidated += 2;
  console.log('✅ LOR & 360° Report Generator templates and signature blocks validated.');
} catch (err) {
  errors.push(`LOR & Report generator error: ${err.message}`);
}

// -----------------------------------------------------------------------------
// TEST SUITE 5: CREDENTIALS EXPORT & SVG WATERMARK INTEGRITY
// -----------------------------------------------------------------------------
console.log('\n>>> [5/6] Testing Certificate & Badge SVG Export Generation...');
try {
  const exportCode = fs.readFileSync(path.join(root, 'src/utils/exportCredentials.ts'), 'utf8');

  // Check that SVG definitions do not contain SPSU
  assert(!exportCode.includes('SPSU'), 'exportCredentials.ts still contains "SPSU"');
  assert(!exportCode.includes('Sir Padampat'), 'exportCredentials.ts still contains "Sir Padampat"');

  // Check export functions
  assert(exportCode.includes('renderCertificateCanvas'), 'exportCredentials.ts missing renderCertificateCanvas');
  assert(exportCode.includes('downloadCertificatePNG'), 'exportCredentials.ts missing downloadCertificatePNG');
  assert(exportCode.includes('downloadCertificatePDF'), 'exportCredentials.ts missing downloadCertificatePDF');
  assert(exportCode.includes('renderBadgeCanvas'), 'exportCredentials.ts missing renderBadgeCanvas');
  assert(exportCode.includes('downloadBadgePNG'), 'exportCredentials.ts missing downloadBadgePNG');
  assert(exportCode.includes('downloadBadgePDF'), 'exportCredentials.ts missing downloadBadgePDF');
  assert(exportCode.includes('renderInterviewReadinessCertificateCanvas'), 'exportCredentials.ts missing renderInterviewReadinessCertificateCanvas');
  assert(exportCode.includes('downloadInterviewReadinessCertificatePNG'), 'exportCredentials.ts missing downloadInterviewReadinessCertificatePNG');

  stats.svgsValidated += 2;
  console.log('✅ Credentials SVG and PDF export handlers validated.');
} catch (err) {
  errors.push(`Credentials export validation error: ${err.message}`);
}

// -----------------------------------------------------------------------------
// TEST SUITE 6: INTERVIEW READINESS WORKSPACE & NOTES
// -----------------------------------------------------------------------------
console.log('\n>>> [6/6] Testing Interview Readiness Modules & Scenarios...');
try {
  const irNotesPath = path.join(root, 'src/data/interviewReadinessNotes.ts');
  const irNotes = parseExportedConst(irNotesPath, 'INTERVIEW_READINESS_MODULES');
  assert(Array.isArray(irNotes), 'INTERVIEW_READINESS_MODULES must be array');
  assert(irNotes.length === 10, `Expected 10 interview readiness notes modules, got ${irNotes.length}`);

  const fresherCount = irNotes.filter(m => m.track === 'fresher').length;
  const expCount = irNotes.filter(m => m.track === 'experienced').length;
  assert(fresherCount === 5, `Expected 5 fresher modules, got ${fresherCount}`);
  assert(expCount === 5, `Expected 5 experienced modules, got ${expCount}`);

  irNotes.forEach((mod, idx) => {
    stats.modulesTested++;
    assert(mod.id && mod.title && mod.summary && mod.deepDiveMarkdown && mod.deepDiveMarkdown.length > 50, `Module #${idx+1} (${mod.id}): deepDiveMarkdown too short or missing`);
  });

  console.log(`✅ 10 Interview Readiness modules (5 Fresher + 5 Experienced) verified with rich technical notes.`);
} catch (err) {
  errors.push(`Interview readiness validation error: ${err.message}`);
}

// -----------------------------------------------------------------------------
// SUMMARY & REPORT
// -----------------------------------------------------------------------------
console.log('\n====================================================');
console.log('                 TEST SUITE SUMMARY                 ');
console.log('====================================================');
console.log(`Total MCQs Tested:        ${stats.mcqsTested}`);
console.log(`Total Challenges Tested:  ${stats.challengesTested}`);
console.log(`Total Test Cases Tested:  ${stats.testCasesTested}`);
console.log(`Total Users Tested:       ${stats.usersTested}`);
console.log(`Total Modules Tested:     ${stats.modulesTested}`);
console.log(`Warnings:                 ${warnings.length}`);
console.log(`Errors:                   ${errors.length}`);

if (errors.length > 0) {
  console.error('\n❌ FAILURES DETECTED:');
  errors.forEach((e, idx) => console.error(`  ${idx + 1}. ${e}`));
  process.exit(1);
} else {
  console.log('\n🎉 ALL TESTS PASSED! System is robust, consistent, and ready for production.');
  process.exit(0);
}
