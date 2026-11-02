const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

console.log('--- STARTING VERIFICATION ---');

// 1. Verify 70 Firebase Auth Users
const authUsersPath = path.join(root, 'src', 'data', 'firebaseAuthUsers.ts');
const authCode = fs.readFileSync(authUsersPath, 'utf8');
const emailMatches = authCode.match(/"email":\s*"[^"]+"/g) || [];
console.log(`[Users] Found ${emailMatches.length} user records in firebaseAuthUsers.ts (Expected: 70)`);
if (emailMatches.length !== 70) {
  console.error('ERROR: Expected 70 users, found', emailMatches.length);
  process.exit(1);
}

// 2. Verify 10 Notes Modules
const notesPath = path.join(root, 'src', 'data', 'interviewReadinessNotes.ts');
const notesCode = fs.readFileSync(notesPath, 'utf8');
const fresherModules = (notesCode.match(/track:\s*'fresher'/g) || []).length;
const experiencedModules = (notesCode.match(/track:\s*'experienced'/g) || []).length;
console.log(`[Notes] Found ${fresherModules} Fresher modules + ${experiencedModules} Experienced modules (Total: ${fresherModules + experiencedModules})`);
if (fresherModules !== 5 || experiencedModules !== 5) {
  console.error('ERROR: Expected 5 fresher and 5 experienced modules');
  process.exit(1);
}

// 3. Verify 100 Core MCQs
const coreMcqPath = path.join(root, 'src', 'data', 'interviewReadiness100MCQs.ts');
const coreCode = fs.readFileSync(coreMcqPath, 'utf8');
const coreIds = (coreCode.match(/"id":\s*"ir-q-\d+"/g) || []);
console.log(`[Core MCQs] Found ${coreIds.length} questions in interviewReadiness100MCQs.ts (Expected: 100)`);
if (coreIds.length !== 100) {
  console.error('ERROR: Expected 100 core MCQs, found', coreIds.length);
  process.exit(1);
}

// 4. Verify 100 Scenario MCQs
const scenMcqPath = path.join(root, 'src', 'data', 'interviewScenarios100MCQs.ts');
const scenCode = fs.readFileSync(scenMcqPath, 'utf8');
const scenIds = (scenCode.match(/"id":\s*"ir-sc-\d+"/g) || []);
console.log(`[Scenario MCQs] Found ${scenIds.length} questions in interviewScenarios100MCQs.ts (Expected: 100)`);
if (scenIds.length !== 100) {
  console.error('ERROR: Expected 100 scenario MCQs, found', scenIds.length);
  process.exit(1);
}

console.log('--- ALL CONTENT VALIDATED SUCCESSFULLY ---');
