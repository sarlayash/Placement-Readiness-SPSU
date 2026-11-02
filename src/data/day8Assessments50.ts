import { AssessmentQuestion } from '../types';

/**
 * SPSU Udaipur Placement Readiness Program
 * Mentor: Kapil | Day 8: Software Engineering, Git Workflows, Debugging & Testing
 * Diagnostic Pre-Assessment: Exactly 50 MCQs
 */
export const DAY_8_PRE_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    id: 'd8-pre-1',
    question: 'In Git, what is the key difference between `git fetch` and `git pull`?',
    options: [
      '`git fetch` safely downloads remote objects and updates remote-tracking branches without altering your local working tree; `git pull` runs `git fetch` followed immediately by `git merge`',
      '`git fetch` deletes untracked files while `git pull` creates a zip archive',
      '`git pull` only inspects changes, whereas `git fetch` always forces a commit',
      'They are identical aliases for the same network operation'
    ],
    correctIndex: 0,
    explanation: '`git fetch` updates `.git/refs/remotes/origin/*` without modifying your working branch. `git pull` fetches and then automatically merges or rebases.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-2',
    question: 'Which Git command performs binary search across commits to pinpoint the exact revision that introduced a regression?',
    options: ['git bisect', 'git blame', 'git log --stat', 'git diff-tree'],
    correctIndex: 0,
    explanation: '`git bisect` uses binary search (O(log N)) to find the bug-introducing commit between a good and bad commit.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-3',
    question: 'In Agile Scrum, what is a "Sprint Retrospective"?',
    options: [
      'A meeting held at the end of a sprint for the team to reflect on what went well, what went wrong, and how to improve processes in the next sprint',
      'A meeting where the client decides developer salaries',
      'A code review session where managers rewrite code',
      'A daily 15-minute standup meeting'
    ],
    correctIndex: 0,
    explanation: 'Sprint Retrospectives focus on continuous team process improvement, inspecting successes, failures, and actionable remedies.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-4',
    question: 'What are the three core phases in the Arrange-Act-Assert (AAA) unit testing pattern?',
    options: [
      'Arrange test prerequisites and inputs, Act by executing the method under test, Assert that the output matches expected invariants',
      'Allocate memory, Compile source, Abort process',
      'Archive code, Analyze coverage, Alert team',
      'Authorize credentials, Authenticate token, Audit log'
    ],
    correctIndex: 0,
    explanation: 'AAA arranges test data/mocks, acts by triggering target behavior, and asserts expected results.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-5',
    question: 'Where does Git store the actual object database (blobs, trees, commits, tags)?',
    options: ['.git/objects/', '.git/refs/', '.git/index', '.git/hooks/'],
    correctIndex: 0,
    explanation: '`.git/objects/` contains all content-addressable objects addressed by their 40-character SHA-1 or SHA-256 hashes.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-6',
    question: 'What does `git status` inspect when determining changes to be committed?',
    options: [
      'The difference between the HEAD commit and the Staging Area (index)',
      'The remote GitHub server disk usage',
      'The system CPU utilization',
      'Only uncommitted git stash entries'
    ],
    correctIndex: 0,
    explanation: '`git status` compares the working tree with the staging index, and the staging index with HEAD.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-7',
    question: 'In the Test Pyramid model, which tier should form the largest volume of tests in a codebase?',
    options: ['Unit Tests', 'Manual QA Testing', 'End-to-End (E2E) Browser UI Tests', 'Performance Load Tests'],
    correctIndex: 0,
    explanation: 'Unit tests form the broad foundation (~70%) because they are ultra-fast, deterministic, and cheap to run in CI.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-8',
    question: 'What is the command to create a new branch named `feat/auth` and switch to it in a single step?',
    options: ['git checkout -b feat/auth', 'git branch -c feat/auth', 'git switch -m feat/auth', 'git commit -b feat/auth'],
    correctIndex: 0,
    explanation: '`git checkout -b <name>` (or `git switch -c <name>`) creates and checks out the new branch in one operation.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-9',
    question: 'What is a "Merge Conflict" in Git?',
    options: [
      'A state where two branches have conflicting modifications on the exact same lines of a file that Git cannot resolve automatically',
      'When GitHub servers lose internet connectivity',
      'When two developers use different text editors',
      'When a commit message is missing a ticket reference'
    ],
    correctIndex: 0,
    explanation: 'Git triggers a conflict when concurrent edits touch identical lines or file deletions conflict with modifications.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-10',
    question: 'What does the `--hard` flag do in `git reset --hard HEAD~1`?',
    options: [
      'Discards the last commit AND reverts all changes in the staging area and working directory to match HEAD~1',
      'Only updates the commit message without touching files',
      'Moves changes to the git stash',
      'Pushes changes forcefully to GitHub'
    ],
    correctIndex: 0,
    explanation: '`--hard` wipes both the staging index and uncommitted working tree changes, resetting to the specified commit.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-11',
    question: 'In Semantic Versioning `2.4.7`, what does the number `4` represent?',
    options: ['MINOR version (backwards-compatible new features)', 'MAJOR version (breaking changes)', 'PATCH version (bug fixes)', 'Build metadata'],
    correctIndex: 0,
    explanation: 'SemVer follows MAJOR.MINOR.PATCH. `4` is the MINOR version, indicating new backwards-compatible functionality.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-12',
    question: 'What is the primary objective of a Pull Request (PR) or Merge Request (MR)?',
    options: [
      'Peer review of code changes, automated CI verification, and architectural validation prior to merging into main',
      'To back up personal files on the cloud',
      'To delete old git branches',
      'To bypass unit testing completely'
    ],
    correctIndex: 0,
    explanation: 'PRs facilitate asynchronous code reviews, automated CI checks, security scans, and collaborative consensus.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-13',
    question: 'What does `git diff --staged` (or `git diff --cached`) display?',
    options: [
      'Changes between the Staging Area (index) and the last commit (HEAD)',
      'Changes between the working directory and staging area',
      'Changes between local main and remote origin/main',
      'All commit logs from the last 7 days'
    ],
    correctIndex: 0,
    explanation: '`git diff --staged` shows precisely what will be included in the next commit.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-14',
    question: 'What is Test-Driven Development (TDD) cycle colloquially known as?',
    options: [
      'Red-Green-Refactor (Write failing test, write minimal code to pass, clean up design)',
      'Code-Build-Deploy',
      'Draft-Review-Publish',
      'Scrum-Sprint-Retrospective'
    ],
    correctIndex: 0,
    explanation: 'TDD follows Red (failing test) -> Green (minimal code to pass test) -> Refactor (eliminate duplication and clean design).',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-15',
    question: 'What is the difference between a Mock and a Stub in unit testing?',
    options: [
      'A Stub provides canned pre-computed answers to calls; a Mock additionally asserts that specific methods were invoked with specific parameters',
      'Stubs are only for C programs; Mocks are for Java',
      'Mocks run on production databases; Stubs run in memory',
      'There is zero difference between them'
    ],
    correctIndex: 0,
    explanation: 'Stubs return predetermined test data. Mocks verify interaction behavior (e.g. checking that `sendEmail()` was called exactly once).',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-pre-16',
    question: 'Which Git command temporarily shelves uncommitted changes so you can switch branches cleanly?',
    options: ['git stash', 'git freeze', 'git suspend', 'git pause'],
    correctIndex: 0,
    explanation: '`git stash` records the current state of working directory and index, resetting back to HEAD.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-17',
    question: 'What is the purpose of the `.gitignore` file?',
    options: [
      'Specifies intentionally untracked files (build artifacts, node_modules, .env secrets) that Git should ignore',
      'Deletes corrupted git commits',
      'Stores passwords for GitHub HTTPS login',
      'Disables Git commands on production servers'
    ],
    correctIndex: 0,
    explanation: '`.gitignore` prevents ephemeral binaries, caches, and sensitive environment variables from being tracked in version control.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-18',
    question: 'In Continuous Integration (CI), what does a "broken build" mean?',
    options: [
      'A newly pushed commit caused automated compilation or unit tests to fail in the CI pipeline',
      'The developer laptop hardware was damaged',
      'The git repository was completely deleted',
      'The pull request had more than 5 reviewers'
    ],
    correctIndex: 0,
    explanation: 'A broken build indicates compilation errors, linting violations, or failed automated test assertions during CI execution.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-19',
    question: 'What is a "Fast-Forward" merge in Git?',
    options: [
      'When the current branch has no diverging commits from the target, Git simply advances the branch pointer without creating a merge commit',
      'A merge performed at 2x CPU clock speed',
      'A merge that skips all unit tests',
      'A merge that squashes all commit messages into one line'
    ],
    correctIndex: 0,
    explanation: 'Fast-forward moves the branch pointer directly forward along a linear commit history without generating an extra merge commit.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-20',
    question: 'What does `git blame <filename>` display?',
    options: [
      'Annotates each line in the file with the commit hash, author name, and date of the last modification',
      'Lists developers who committed compiler warnings',
      'Deletes all commits authored by a specific user',
      'Prints the total number of lines in a file'
    ],
    correctIndex: 0,
    explanation: '`git blame` shows line-by-line provenance, revealing who last touched each line and in which commit.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-21',
    question: 'In Kanban, what is the significance of a "Work In Progress" (WIP) limit?',
    options: [
      'Restricts the maximum number of items in any workflow stage to prevent bottlenecks and multitasking overload',
      'Limits the number of hours developers can work per week',
      'Restricts how many lines of code can be written per day',
      'Prevents developers from opening pull requests'
    ],
    correctIndex: 0,
    explanation: 'WIP limits force teams to finish existing tasks before pulling in new work, minimizing context switching.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-22',
    question: 'What is the role of Git hooks stored in `.git/hooks/`?',
    options: [
      'Scripts that trigger automatically before or after key Git operations (e.g. `pre-commit`, `pre-push`) to enforce linting and formatting',
      'Hardware drivers for network cards',
      'Security encryption keys for SSH authentication',
      'Plugins for IDE syntax highlighting'
    ],
    correctIndex: 0,
    explanation: 'Git hooks automate client-side and server-side validation (e.g. running linters or secret scanners before commits).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-23',
    question: 'What does `git log --oneline --graph --all` accomplish?',
    options: [
      'Renders an ASCII text visualization of the Directed Acyclic Graph (DAG) across all branches and commits',
      'Prints all source code files on one line',
      'Deletes branches that have not been merged',
      'Generates a graphical PDF report'
    ],
    correctIndex: 0,
    explanation: 'It provides a compact ASCII diagram showing branch splits, merges, and current head positions across the repository.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-24',
    question: 'What is "Regression Testing"?',
    options: [
      'Re-running existing test suites to verify that recent code changes or bug fixes have not broken previously working functionality',
      'Testing legacy hardware that is over 10 years old',
      'Writing statistical linear regression models',
      'Testing without assertions'
    ],
    correctIndex: 0,
    explanation: 'Regression testing ensures new features or bug fixes do not inadvertently degrade existing system capabilities.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-25',
    question: 'What does `git cherry-pick <commit-hash>` do?',
    options: [
      'Applies the exact changes from an individual commit onto the current working branch as a brand-new commit',
      'Selects the best performing commit based on execution benchmarks',
      'Deletes unmerged branches',
      'Reverts all commits by a specific author'
    ],
    correctIndex: 0,
    explanation: '`git cherry-pick` extracts the diff of a specific commit and commits it onto the currently checked-out branch.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-26',
    question: 'Which Git command allows you to view the reflog history to recover "lost" commits after an accidental reset?',
    options: ['git reflog', 'git recover', 'git history --all', 'git undo'],
    correctIndex: 0,
    explanation: '`git reflog` tracks every change to local HEAD references, enabling recovery of orphaned commits within retention periods.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-27',
    question: 'In software testing, what is "Code Coverage"?',
    options: [
      'A metric measuring the percentage of source code executed while running an automated test suite',
      'The number of comments written per line of code',
      'The total disk space consumed by test files',
      'The speed at which tests complete execution'
    ],
    correctIndex: 0,
    explanation: 'Code coverage calculates line, statement, branch, or function execution ratios during test runs.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-28',
    question: 'What is the "Waterfall" model’s greatest vulnerability in modern software delivery?',
    options: [
      'Inflexibility to changing customer requirements because testing and customer feedback only occur at the end of the life cycle',
      'It requires too many daily standups',
      'It cannot be used with relational databases',
      'It does not support source control'
    ],
    correctIndex: 0,
    explanation: 'Waterfall’s rigid phase gates mean requirement flaws discovered during testing require costly full-project rework.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-29',
    question: 'What does `git commit --amend` allow developers to do?',
    options: [
      'Modify the most recent commit by updating its message or incorporating staged changes into it',
      'Amend the entire repository license',
      'Sign off on a legal copyright contract',
      'Delete the branch from GitHub'
    ],
    correctIndex: 0,
    explanation: '`git commit --amend` replaces the tip of the current branch with a new commit containing staged changes and/or updated message.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-30',
    question: 'What does the term "Idempotency" mean in API design and testing?',
    options: [
      'Making multiple identical requests produces the exact same server state as making a single request (e.g. HTTP GET, PUT, DELETE)',
      'The API can only be called once per day',
      'The API requires two-factor authentication',
      'The API returns JSON only'
    ],
    correctIndex: 0,
    explanation: 'An operation is idempotent if its side effect on server resources is identical whether executed once or 100 times.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-31',
    question: 'What is a "Merge Commit"?',
    options: [
      'A special commit in Git that has two (or more) parent commits, joining divergent histories',
      'A commit created exclusively by GitHub bot accounts',
      'A commit with zero files modified',
      'A commit that deletes the destination branch'
    ],
    correctIndex: 0,
    explanation: 'A 3-way merge commit explicitly records two parent commit hashes, tying two branches together in the Git DAG.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-32',
    question: 'What does the `git rebase -i` interactive command enable?',
    options: [
      'Squashing, rewording, editing, dropping, or reordering a series of commits into a clean historical sequence',
      'Translating commit messages into international languages',
      'Installing external npm dependencies',
      'Creating graphical UML diagrams'
    ],
    correctIndex: 0,
    explanation: 'Interactive rebase (`-i`) opens an editor script allowing developers to polish messy feature commits before opening PRs.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-33',
    question: 'In Agile Scrum, who is responsible for prioritizing the Product Backlog?',
    options: ['The Product Owner (PO)', 'The Scrum Master', 'The Lead DevOps Engineer', 'The QA Tester'],
    correctIndex: 0,
    explanation: 'The Product Owner owns the product vision, customer value articulation, and backlog item prioritization.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-34',
    question: 'What is "Static Code Analysis"?',
    options: [
      'Analyzing source code without executing it (e.g. SonarQube, ESLint) to identify security vulnerabilities, code smells, and lint issues',
      'Running benchmarks on idle computers',
      'Benchmarking SQL queries on static read-only tables',
      'Debugging with print statements'
    ],
    correctIndex: 0,
    explanation: 'Static analysis parses abstract syntax trees (AST) to flag bugs, security flaws, and style violations at compile time.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-35',
    question: 'What is the danger of executing `git push --force` on a shared collaborative branch (e.g. `main`)?',
    options: [
      'It overwrites remote history, potentially destroying other teammates’ committed work that was merged previously',
      'It causes the local hard drive to crash',
      'It triggers a fee on GitHub',
      'It logs out all users from GitHub'
    ],
    correctIndex: 0,
    explanation: 'Force pushing rewrites remote refs, causing team members who branched off the previous commit to experience diverged histories.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-36',
    question: 'What does `git clean -fd` do in your local working directory?',
    options: [
      'Forcefully removes untracked files and directories that are not governed by `.gitignore`',
      'Cleans temporary Git object memory caches',
      'Deletes old branches',
      'Formats source code with Prettier'
    ],
    correctIndex: 0,
    explanation: '`git clean -f -d` deletes untracked files (`-f`) and directories (`-d`) to ensure a pristine working tree.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-37',
    question: 'In testing terminology, what is a "Boundary Value Analysis"?',
    options: [
      'Testing inputs at the extreme minimum, maximum, just inside, and just outside allowable ranges where off-by-one errors frequently occur',
      'Testing only values inside the geographic boundary of a country',
      'Testing memory addresses at 32-bit limits only',
      'Testing database primary keys'
    ],
    correctIndex: 0,
    explanation: 'Most software defects congregate around boundary thresholds (e.g. testing 0, 1, max, max+1).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-38',
    question: 'What is the purpose of the `git revert <commit-hash>` command?',
    options: [
      'Creates a new commit that records the exact inverse diff of the target commit, safely undoing changes without altering history',
      'Erases the target commit completely from the Git history log',
      'Reverts uncommitted working tree files to HEAD',
      'Restores deleted remote branches'
    ],
    correctIndex: 0,
    explanation: '`git revert` is safe for public branches because it appends a new inverse commit rather than rewriting existing commit history.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-39',
    question: 'What is the difference between Verification and Validation in software engineering?',
    options: [
      'Verification asks "Are we building the product right?" (conformance to specs); Validation asks "Are we building the right product?" (meeting user needs)',
      'Verification is automated; Validation is manual',
      'Verification is for databases; Validation is for frontends',
      'They are exact synonyms'
    ],
    correctIndex: 0,
    explanation: 'Verification checks formal technical correctness against specifications; Validation ensures the software fulfills customer requirements.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-40',
    question: 'What is the primary role of a CI/CD build artifact?',
    options: [
      'A compiled, deployable binary package (e.g. JAR, Docker container image, zip) produced by a CI pipeline for deployment into environments',
      'A meeting notes document from sprint planning',
      'A historical bug report',
      'A Git branch that has been closed'
    ],
    correctIndex: 0,
    explanation: 'Build artifacts are immutable compiled packages tested in CI and promoted sequentially across staging and production.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-41',
    question: 'What is "Flaky Test" in an automated test suite?',
    options: [
      'A test that exhibits non-deterministic behavior—sometimes passing and sometimes failing on the exact same code without modifications',
      'A test that takes less than 1 millisecond to execute',
      'A test written in Python',
      'A test with 100% code coverage'
    ],
    correctIndex: 0,
    explanation: 'Flaky tests stem from race conditions, async timing dependencies, network unreliability, or shared state leaks.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-42',
    question: 'What is the "Single Responsibility Principle" (SRP) in software design?',
    options: [
      'A class, module, or function should have one, and only one, reason to change',
      'Only one developer should work on a repository',
      'A program can only have a single thread of execution',
      'Every pull request must have exactly one line of code changed'
    ],
    correctIndex: 0,
    explanation: 'SRP states that a component should encompass a single cohesive responsibility, minimizing unintended side effects during changes.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-43',
    question: 'What does `git remote -v` display?',
    options: [
      'The names and network URLs (fetch and push) of all configured remote repositories',
      'The current Git version installed on your machine',
      'The remote server operating system version',
      'The number of commits on origin/main'
    ],
    correctIndex: 0,
    explanation: '`-v` (verbose) lists each remote alias (e.g. `origin`) alongside its associated fetch and push URLs.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-44',
    question: 'What is a "Smoke Test" in continuous deployment pipelines?',
    options: [
      'A shallow preliminary test suite executed immediately after deployment to verify critical core paths function before running deep test suites',
      'Testing hardware thermals and fans',
      'Testing how code behaves when servers are restarted',
      'Testing broken database connections'
    ],
    correctIndex: 0,
    explanation: 'Smoke tests ("build verification tests") provide rapid pass/fail feedback on essential sanity checks (e.g. does `/healthz` return 200).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-45',
    question: 'In Git, what is "HEAD"?',
    options: [
      'A pointer reference pointing to the currently checked-out commit or branch tip in your working tree',
      'The first commit ever made in the repository',
      'The remote GitHub server administrator',
      'The master branch license header'
    ],
    correctIndex: 0,
    explanation: 'HEAD points to the current active branch reference (or a detached commit) that serves as the parent for your next commit.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-46',
    question: 'What does `git checkout -- <filename>` (or `git restore <filename>`) do?',
    options: [
      'Discards uncommitted local modifications in the working tree, reverting the file back to the staged or HEAD state',
      'Permanently deletes the file from disk and Git',
      'Pushes the file to the remote repository',
      'Locks the file so no other developer can edit it'
    ],
    correctIndex: 0,
    explanation: '`git restore <file>` discards working tree changes, resetting the file back to the version in index or HEAD.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-47',
    question: 'What is a "Code Smell"?',
    options: [
      'A surface indication in source code that usually corresponds to a deeper design defect or technical debt (e.g. duplicate code, god objects, long methods)',
      'A syntax error that prevents compilation',
      'A hardware error on server racks',
      'An encrypted password stored in plaintext'
    ],
    correctIndex: 0,
    explanation: 'Code smells are architectural symptoms (e.g. feature envy, primitive obsession) that impair maintainability without necessarily being bugs.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-48',
    question: 'What does `git tag -a v1.0.0 -m "Release v1.0.0"` create?',
    options: [
      'An annotated tag object stored in Git containing a tagger name, email, date, message, and cryptographic signature support',
      'A lightweight branch that updates with new commits',
      'A commit that deletes older releases',
      'A zip archive download link on GitHub'
    ],
    correctIndex: 0,
    explanation: 'Annotated tags (`-a`) create full Git objects in `.git/objects/` that mark permanent milestones in project history.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-49',
    question: 'In the Agile manifesto, what is valued over comprehensive documentation?',
    options: ['Working software', 'Contract negotiation', 'Following a rigid plan', 'Processes and tools'],
    correctIndex: 0,
    explanation: 'The Agile Manifesto states: "Working software over comprehensive documentation".',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-pre-50',
    question: 'What is the primary benefit of Continuous Delivery (CD)?',
    options: [
      'Software is kept in a releasable state throughout its life cycle, enabling automated, repeatable, and low-risk deployments to production',
      'Developers never have to write automated tests',
      'Code is written without requirement analysis',
      'Production releases can only happen once every calendar year'
    ],
    correctIndex: 0,
    explanation: 'Continuous Delivery ensures every passing build is automatically verified and ready for safe one-click deployment to production.',
    category: 'Practical Execution & Trace (70%)'
  }
];

/**
 * SPSU Udaipur Placement Readiness Program
 * Mentor: Kapil | Day 8: Software Engineering, Git Workflows, Debugging & Testing
 * Verification Post-Assessment: Exactly 50 MCQs
 */
export const DAY_8_POST_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    id: 'd8-post-1',
    question: 'How does Git’s object model store a directory containing multiple files and subdirectories?',
    options: [
      'As a Tree object whose contents are a list of file modes, object types, SHA-1 hashes, and filenames pointing to blobs or child trees',
      'As a tar archive compressed with gzip',
      'As an SQL database table stored in `.git/database.sqlite`',
      'As a flat JSON dictionary'
    ],
    correctIndex: 0,
    explanation: 'Git Tree objects represent directory nodes in the Merkle tree DAG, referencing Blobs (files) or other Trees (subdirectories).',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-2',
    question: 'What occurs internally when you execute `git rebase main` on a feature branch?',
    options: [
      'Git calculates the common ancestor, saves feature branch commits as patches, resets the feature branch pointer to main, and applies each commit patch sequentially on top of main with new commit hashes',
      'Git merges main into the feature branch with a 3-way merge commit',
      'Git deletes all feature branch commits permanently',
      'Git clones a new repository from GitHub'
    ],
    correctIndex: 0,
    explanation: 'Rebase replays commits on a new base, generating completely new commit objects with different parent pointers and hashes.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-3',
    question: 'When should you strictly avoid using `git rebase`?',
    options: [
      'On public or shared branches (e.g. `main` or team sprint branches) where other developers have already branched off your commits',
      'On personal local feature branches',
      'When preparing a single-developer pull request',
      'Before running automated unit tests'
    ],
    correctIndex: 0,
    explanation: 'The Golden Rule of Rebasing: Never rebase shared public commits, as rewriting shared history causes divergence and merge chaos for collaborators.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-4',
    question: 'What is the "Boy Scout Rule" in clean software engineering?',
    options: [
      'Always leave the code cleaner and better structured than you found it whenever you touch a file',
      'Only write unit tests during official camping trips',
      'Wear formal uniforms during sprint demos',
      'Never refactor working legacy code under any circumstances'
    ],
    correctIndex: 0,
    explanation: 'Formulated by Uncle Bob Martin: Continuous minor cleanups prevent technical debt accumulation over time.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-5',
    question: 'What is the difference between Mutation Testing and standard Code Coverage?',
    options: [
      'Code coverage only measures if a line was executed; Mutation Testing modifies lines of code (inverting conditionals, altering constants) to verify that tests actually fail and catch the defects',
      'Mutation testing is only for biological gene data',
      'Code coverage tests hardware; Mutation testing tests databases',
      'There is no difference'
    ],
    correctIndex: 0,
    explanation: 'Mutation testing introduces synthetic faults ("mutants") to evaluate the test suite’s fault-detection effectiveness (mutation score).',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-6',
    question: 'In Git, what does a "Detached HEAD" state indicate?',
    options: [
      'HEAD points directly to a specific commit hash rather than a named local branch reference',
      'The git repository was corrupted by a power failure',
      'The author of the commit deleted their GitHub account',
      'The working directory has no files'
    ],
    correctIndex: 0,
    explanation: 'In detached HEAD, new commits are not attached to any named branch ref and will become orphaned if you switch branches without creating a new branch.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-7',
    question: 'How do you recover an orphaned commit that was accidentally abandoned after a `git reset --hard`?',
    options: [
      'Run `git reflog` to identify the orphaned commit hash, then run `git checkout -b recover-branch <hash>`',
      'Download the repository from GitHub again',
      'Reinstall the Git CLI',
      'Orphaned commits are wiped immediately from disk and cannot be recovered'
    ],
    correctIndex: 0,
    explanation: 'Git preserves loose objects until garbage collection runs (default 30-90 days). `git reflog` locates the commit hash for instant checkout.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-8',
    question: 'What is the primary difference between Integration Testing and Unit Testing?',
    options: [
      'Unit tests isolate single components in-memory using mocks; Integration tests verify collaborative behavior across multiple real components (e.g. Service + Database + Network)',
      'Unit tests are written in Python; Integration tests are written in C',
      'Integration tests run faster than unit tests',
      'Unit tests require deployment to production servers'
    ],
    correctIndex: 0,
    explanation: 'Integration testing verifies contract correctness across subsystem boundaries (ORMs, DB connections, HTTP clients).',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-9',
    question: 'What is the purpose of Git’s index file (`.git/index`)?',
    options: [
      'It acts as the Staging Area binary cache, holding a list of file paths, timestamps, permissions, and SHA-1 hashes that will compose the next commit',
      'It indexes words in commit messages for text search',
      'It stores passwords for git push',
      'It tracks compiler execution speed'
    ],
    correctIndex: 0,
    explanation: 'The staging area (`.git/index`) prepares the exact tree state before snapshotting it into an immutable Commit object.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-10',
    question: 'What is "Technical Debt"?',
    options: [
      'The implied cost of additional rework caused by choosing an easy, suboptimal implementation shortcut now instead of using a better approach that would take longer',
      'Money owed to cloud infrastructure providers (AWS, GCP)',
      'The total number of unassigned Jira tickets in a sprint',
      'Salary expenses of software engineering contractors'
    ],
    correctIndex: 0,
    explanation: 'Coined by Ward Cunningham, technical debt compounds interest: expedient architectural hacks slow future velocity until paid down via refactoring.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-11',
    question: 'In Git, what does `git squash` (or squashing during merge/rebase) accomplish?',
    options: [
      'Combines multiple intermediate commits into a single coherent commit with a consolidated commit message',
      'Compresses images inside git repositories',
      'Deletes commits with failing unit tests',
      'Shortens commit hashes from 40 characters to 7 characters'
    ],
    correctIndex: 0,
    explanation: 'Squashing condenses noisy commit histories (e.g. "fix typo", "wip") into clean, atomic feature commits.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-12',
    question: 'What is the "Open/Closed Principle" (OCP) in SOLID design?',
    options: [
      'Software entities (classes, modules, functions) should be open for extension, but closed for modification',
      'Source code must be open-source and closed to private enterprise',
      'Network sockets should remain open during unit testing',
      'Offices must remain open during sprints'
    ],
    correctIndex: 0,
    explanation: 'OCP allows system behavior to be augmented via inheritance or polymorphism without editing tested, existing source code.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-13',
    question: 'What is the function of `git submodule` or `git subtree`?',
    options: [
      'Enables embedding and tracking an external Git repository as a subdirectory inside another parent Git repository',
      'Deletes child branches automatically',
      'Splits monolithic databases into microservices',
      'Renders CSS flexbox trees'
    ],
    correctIndex: 0,
    explanation: 'Git submodules keep a pointer to a specific commit of an external repository, enabling shared library dependency management.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-14',
    question: 'In automated CI/CD pipelines, what is "Shift-Left Testing"?',
    options: [
      'Moving testing, security scans, and validation activities earlier in the development lifecycle (e.g. IDE linters, pre-commit hooks, unit tests)',
      'Writing code only on the left side of the screen',
      'Testing only frontend client-side code',
      'Running tests in western time zones'
    ],
    correctIndex: 0,
    explanation: 'Shift-left catches defects early when fixing costs are 10-100x lower than in production environments.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-15',
    question: 'What is a "Git Merkle Tree"?',
    options: [
      'A tree data structure where parent node hashes are cryptographically computed from the hashes of their children, guaranteeing tamper-evident content integrity',
      'A holiday tree decorated with GitHub stickers',
      'A visual graph drawn with graphviz in terminal',
      'A binary search tree optimized for sorting commits chronologically'
    ],
    correctIndex: 0,
    explanation: 'Git uses a Merkle DAG: altering even one byte in a historical blob alters its hash, cascading upward and invalidating all descendant commit hashes.',
    category: 'Theory (30%)'
  },
  {
    id: 'd8-post-16',
    question: 'What does the command `git push --force-with-lease` do differently than `git push --force`?',
    options: [
      'It only forces the push if the remote branch reference matches your local tracking ref, preventing you from overwriting teammates’ newly pushed commits',
      'It requires paying a monthly fee on GitHub',
      'It limits bandwidth during push operations',
      'It only updates branches older than 30 days'
    ],
    correctIndex: 0,
    explanation: '`--force-with-lease` is a safer force push: it aborts if the remote ref was updated by a colleague since your last fetch.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-17',
    question: 'What is "Cyclomatic Complexity" in code analysis?',
    options: [
      'A quantitative measure of the number of linearly independent execution paths through a program’s source code (based on conditionals, loops, branches)',
      'The number of CPU cycles consumed per function call',
      'The speed of the computer fan during compilation',
      'The total number of commits on a branch'
    ],
    correctIndex: 0,
    explanation: 'Higher cyclomatic complexity ($M = E - N + 2P$) correlates directly with higher defect density and testing difficulty.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-18',
    question: 'What is the purpose of `git archive --format=zip HEAD -o release.zip`?',
    options: [
      'Creates a clean zip archive containing only the project source tree at HEAD without bundling the internal `.git/` metadata folder',
      'Deletes the repository after compressing',
      'Uploads the project to an FTP server',
      'Converts source code into binary bytecode'
    ],
    correctIndex: 0,
    explanation: '`git archive` produces production distribution zip/tarballs stripped of large `.git` history folders.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-19',
    question: 'What is "Canary Deployment" in continuous delivery?',
    options: [
      'Deploying a new software version to a tiny percentage (e.g. 2-5%) of real production users to monitor error rates and latency before full rollout',
      'Deploying code exclusively to development staging machines',
      'Deploying software inside underground coal mines',
      'Testing software on mobile devices only'
    ],
    correctIndex: 0,
    explanation: 'Canary releases mitigate blast radius by detecting anomalies with minimal user exposure before global release.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-20',
    question: 'In Git, what does `git stash pop` do vs `git stash apply`?',
    options: [
      '`git stash pop` applies the most recent stashed state and removes it from the stash list; `git stash apply` applies it but preserves it on the list',
      '`git stash pop` deletes the working tree without applying changes',
      '`git stash apply` creates a new branch',
      'They are identical'
    ],
    correctIndex: 0,
    explanation: '`pop` applies and drops stash@{0}; `apply` leaves the stashed state intact in case you need to re-apply it across multiple branches.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-21',
    question: 'What is "Property-Based Testing" (e.g. QuickCheck, Hypothesis)?',
    options: [
      'Testing where the framework generates hundreds of randomized edge-case inputs to verify that universal invariants/properties always hold true',
      'Testing only private class properties',
      'Testing CSS layout properties',
      'Testing real estate management web applications'
    ],
    correctIndex: 0,
    explanation: 'Property-based testing searches for minimal counterexamples by fuzzing arbitrary inputs against invariant specifications.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-22',
    question: 'What does `git shortlog -sn` show?',
    options: [
      'Summarizes commit history by author, displaying the total commit count sorted in descending numerical order',
      'Shortens commit hashes',
      'Prints the shortest commit messages in the repository',
      'Lists developers sorted alphabetically'
    ],
    correctIndex: 0,
    explanation: '`-s` suppresses individual commit descriptions and `-n` sorts authors by total number of commits.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-23',
    question: 'What is a "Deadlock" in concurrent multithreaded systems?',
    options: [
      'A condition where two or more threads are permanently blocked, each holding a lock the other requires to proceed (Circular Wait)',
      'A computer running out of battery power',
      'When an API endpoint returns HTTP 404',
      'When a git merge cannot find common ancestors'
    ],
    correctIndex: 0,
    explanation: 'Deadlocks require four Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-24',
    question: 'What does `git diff branchA...branchB` (triple dot) show?',
    options: [
      'Changes on branchB starting from the common ancestor of branchA and branchB (ignoring commits unique to branchA)',
      'All differences between the current tips of branchA and branchB',
      'A syntax error in Git',
      'Only deleted files'
    ],
    correctIndex: 0,
    explanation: 'Triple-dot diff (`A...B`) evaluates changes on B since its common ancestor with A—exactly what GitHub PR views display.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-25',
    question: 'In microservice architectures, what is "Contract Testing" (e.g. Pact)?',
    options: [
      'Verifying that service providers and API consumers adhere to an agreed-upon schema and message contract without needing to deploy both services live',
      'Signing non-disclosure agreements before reviewing source code',
      'Writing legal terms of service for end users',
      'Validating payment gateway invoices'
    ],
    correctIndex: 0,
    explanation: 'Contract testing verifies API compatibility independently, preventing breaking changes between microservice versions.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-26',
    question: 'What is "Trunk-Based Development"?',
    options: [
      'A version-control branching strategy where developers merge small, frequent updates into a single central branch ("trunk"/main) daily, avoiding long-lived branches',
      'Storing git repositories on USB thumb drives',
      'A branching model with at least 15 permanent sub-branches',
      'Developing software without any Git branches'
    ],
    correctIndex: 0,
    explanation: 'Trunk-based development avoids "merge hell" by integrating small feature increments with feature flags into main continuously.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-27',
    question: 'What does `git gc --prune=now` do?',
    options: [
      'Runs Git garbage collection, repacking loose objects into packfiles and deleting unreferenced orphaned objects immediately',
      'Deletes all git branches except main',
      'Empties your trash folder on your laptop',
      'Cleans up commit messages'
    ],
    correctIndex: 0,
    explanation: '`git gc` cleans up loose unreachable objects, optimizes packfile indexes, and reduces repository disk footprint.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-28',
    question: 'What is a "Blue-Green Deployment"?',
    options: [
      'Maintaining two identical production environments (Blue active, Green idle staging); new versions deploy to Green, test, then router traffic flips instantly to Green',
      'Deploying code on ecological solar-powered servers',
      'A color scheme used in IntelliJ and VS Code',
      'Testing frontend color palettes for accessibility'
    ],
    correctIndex: 0,
    explanation: 'Blue-Green achieves zero-downtime releases and near-instant rollback by flipping load balancer target groups.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-29',
    question: 'What is the purpose of Git’s `rerere` functionality (`git config --global rerere.enabled true`)?',
    options: [
      'Reuse Recorded Resolution: Automatically records and remembers how you resolved a merge conflict so future identical conflicts are resolved automatically',
      'Retries failed network downloads in git clone',
      'Repeats unit tests 3 times to check for flakiness',
      'Re-encrypts SSH private keys'
    ],
    correctIndex: 0,
    explanation: '`rerere` caches conflict resolutions, saving significant manual labor during repeated rebases or backports.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-30',
    question: 'What is the difference between Unit Tests and End-to-End (E2E) UI Tests in terms of execution cost and feedback speed?',
    options: [
      'Unit tests execute in milliseconds in memory with high precision; E2E tests take minutes/hours, are fragile to UI layout tweaks, but test realistic user journeys',
      'Unit tests are more expensive to run than E2E tests',
      'E2E tests have zero flakiness',
      'Unit tests test browser JavaScript DOM rendering'
    ],
    correctIndex: 0,
    explanation: 'The pyramid favors unit tests for fast developer feedback loops, reserving E2E for critical smoke user journeys.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-31',
    question: 'What does the Liskov Substitution Principle (LSP) require?',
    options: [
      'Subtypes must be substitutable for their base types without altering the correctness or properties of the program',
      'Every class must implement at least two interfaces',
      'Variables must be named after their data types',
      'Only subclasses can be instantiated'
    ],
    correctIndex: 0,
    explanation: 'Subclasses must honor parent class contracts, preconditions cannot be strengthened and postconditions cannot be weakened.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-32',
    question: 'What is a "Feature Flag" (or Feature Toggle)?',
    options: [
      'A software technique enabling features to be enabled or disabled at runtime (via config/remote toggle) without deploying new code',
      'A boolean flag inside the Linux kernel',
      'A visual icon in GitHub pull requests',
      'A license key required for open-source code'
    ],
    correctIndex: 0,
    explanation: 'Feature flags decouple code deployment from feature release, enabling dark launches, A/B testing, and instant kill switches.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-33',
    question: 'What does `git log -S "secretToken"` (Pickaxe search) do?',
    options: [
      'Searches commit history for commits that introduced or removed the exact string "secretToken" in their diffs',
      'Searches commit messages only',
      'Searches author names',
      'Deletes secret tokens from git history'
    ],
    correctIndex: 0,
    explanation: 'The `-S` pickaxe option inspects actual file patch diffs, locating the exact commits where a keyword was added or deleted.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-34',
    question: 'In Git, what is the role of the `.git/refs/tags/` directory?',
    options: [
      'Stores references (pointers containing commit hashes) for each release tag created in the repository',
      'Stores CSS styles for the web UI',
      'Stores user credentials',
      'Tracks open pull requests'
    ],
    correctIndex: 0,
    explanation: 'Lightweight tags are text files in `refs/tags/` holding 40-byte commit hashes; annotated tags point to tag objects in `objects/`.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-35',
    question: 'What is "Chaos Engineering" (e.g. Chaos Monkey)?',
    options: [
      'Intentionally injecting real-world infrastructure failures (killing random container pods, inducing network latency) into production to test system resiliency',
      'Writing code without unit tests or architecture designs',
      'Randomly deleting Git branches to test developer memory',
      'Hacking competitor websites'
    ],
    correctIndex: 0,
    explanation: 'Pioneered by Netflix, Chaos Engineering validates that distributed systems withstand unpredictable component outages gracefully.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-36',
    question: 'In Continuous Integration, what is "Matrix Testing"?',
    options: [
      'Running the same automated test suite concurrently across combinations of operating systems (Ubuntu, Windows, macOS) and runtime versions (Node 18, 20, 22)',
      'Testing 2D matrix arrays in DSA',
      'Testing green visual text in terminal screens',
      'Running tests in virtual reality headsets'
    ],
    correctIndex: 0,
    explanation: 'Matrix builds execute permutations in parallel runners, verifying cross-platform and multi-runtime compatibility.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-37',
    question: 'What does `git reset --soft HEAD~1` do to your working tree and staging index?',
    options: [
      'Moves the HEAD branch pointer back by 1 commit, but preserves all changes from that commit in your Staging Area (ready to re-commit)',
      'Wipes out all changes from the working tree',
      'Deletes the repository remote',
      'Creates a 3-way merge commit'
    ],
    correctIndex: 0,
    explanation: '`--soft` un-commits the changes while keeping them staged in the index, ideal for rewording or grouping commits.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-38',
    question: 'What is "Cyclic Dependency" in software architecture, and why is it dangerous?',
    options: [
      'When Component A depends on Component B, which directly or indirectly depends back on Component A; it prevents modular testing, causes build deadlocks, and leaks memory',
      'When a for loop runs infinitely',
      'When two git branches have the same name',
      'When an API returns an array of numbers'
    ],
    correctIndex: 0,
    explanation: 'Cyclic dependencies violate the Acyclic Dependencies Principle (ADP), turning independent modules into an indivisible monolith.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-39',
    question: 'What does `git commit --dry-run` do?',
    options: [
      'Simulates the commit process and reports what would be committed without actually creating a new commit object',
      'Runs code through a static compiler',
      'Deletes uncommitted changes',
      'Checks if your computer has enough free disk space'
    ],
    correctIndex: 0,
    explanation: '`--dry-run` verifies staging index status and commit validation hooks without modifying Git history.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-40',
    question: 'What is the purpose of "Semantic Release" in CI/CD automation?',
    options: [
      'Automatically analyzing conventional commit messages (`feat`, `fix`, `BREAKING CHANGE`) to calculate the next semver version, generate changelogs, and publish releases',
      'Translating English documentation into other languages',
      'Checking grammar in code comments',
      'Encrypting release passwords'
    ],
    correctIndex: 0,
    explanation: 'Semantic release automates release versioning: `fix` bumps patch, `feat` bumps minor, `BREAKING CHANGE` bumps major.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-41',
    question: 'What does `git stash branch <new-branch-name>` accomplish?',
    options: [
      'Creates and checks out a new branch starting from the commit where the stash was created, and immediately pops the stashed changes onto it',
      'Deletes all stashes across all branches',
      'Renames an existing branch',
      'Pushes the stash to GitHub'
    ],
    correctIndex: 0,
    explanation: 'If popping a stash on your current branch causes painful merge conflicts, `git stash branch` creates a clean branch at the stash base.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-42',
    question: 'What is "Dead Code" and why should it be removed rather than commented out?',
    options: [
      'Code that is never executed or reachable; version control already preserves historical code, so dead code only confuses maintainers and adds cognitive overhead',
      'Code written by developers who left the company',
      'Code that fails unit tests',
      'Binary bytecode files'
    ],
    correctIndex: 0,
    explanation: 'Commented-out and unreachable code increases cognitive debt. Trust Git history and delete dead code.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-43',
    question: 'What does `git log --left-right branchA...branchB` display?',
    options: [
      'Marks commits with `<` if they belong uniquely to branchA, and `>` if they belong uniquely to branchB',
      'Scrolls the terminal text left and right',
      'Aligns commit messages on the left and author names on the right',
      'Sorts commits by timestamp'
    ],
    correctIndex: 0,
    explanation: 'The symmetric difference indicator (`<` / `>`) clearly shows which commits reside on which branch.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-44',
    question: 'What is the "Dependency Inversion Principle" (DIP) in SOLID?',
    options: [
      'High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces). Abstractions should not depend on details',
      'Developers must invert binary trees during interviews',
      'Every class must be imported in reverse order',
      'Dependencies must be downloaded from bottom to top'
    ],
    correctIndex: 0,
    explanation: 'DIP enables loose coupling and testability: application business logic depends on repository interfaces, not concrete SQL implementations.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-45',
    question: 'What is a "Reproducible Build" in software engineering?',
    options: [
      'A build process that produces bit-for-bit identical output artifacts when compiled from the exact same source code, compiler, and build environment',
      'A build that can be run more than once per day',
      'A build that passes 100% of unit tests',
      'A build that does not require an internet connection'
    ],
    correctIndex: 0,
    explanation: 'Reproducible builds guarantee that no backdoors, malware, or host-specific timestamp discrepancies contaminate binary deliverables.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-46',
    question: 'In Git, what does `git check-ref-format` verify?',
    options: [
      'Validates whether a proposed branch or tag name adheres to Git’s official naming rules (no spaces, `~`, `^`, `:`, consecutive dots `..`)',
      'Checks if a commit hash has 40 characters',
      'Verifies remote repository URLs',
      'Checks if user email is valid'
    ],
    correctIndex: 0,
    explanation: 'Branch and tag names have strict syntax constraints (cannot start with `-`, contain `@{`, or end with `.lock`).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-47',
    question: 'What is the role of an API Gateway in modern enterprise architectures?',
    options: [
      'A reverse proxy serving as a single entry point that handles rate limiting, authentication, SSL termination, request routing, and metric collection for microservices',
      'A hardware router plugged into an Ethernet wall socket',
      'A software package for drawing UML diagrams',
      'A tool for compressing git commit logs'
    ],
    correctIndex: 0,
    explanation: 'API Gateways decouple external clients from internal service topology and enforce cross-cutting operational policies.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-48',
    question: 'What does `git update-index --assume-unchanged <file>` accomplish?',
    options: [
      'Instructs Git to stop monitoring modifications to a tracked local file without removing it from the repository index or deleting it on remotes',
      'Permanently deletes the file from GitHub',
      'Encrypts the file with a secret password',
      'Marks the file as read-only on the operating system'
    ],
    correctIndex: 0,
    explanation: 'Ideal for local development config tweaks on tracked files that you do not want to accidentally commit.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-49',
    question: 'What is "Postman" predominantly used for in software development teams?',
    options: [
      'Designing, testing, mocking, documenting, and executing automated test collections for REST, GraphQL, and WebSocket APIs',
      'Delivering physical postal letters to employee homes',
      'Managing database indexes in PostgreSQL',
      'Compiling C and C++ source code'
    ],
    correctIndex: 0,
    explanation: 'Postman provides an interactive environment for API exploration, automated payload assertions, and collection test runs.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd8-post-50',
    question: 'What is the ultimate metric of success in modern DevOps and Continuous Delivery pipelines?',
    options: [
      'Short Lead Time for Changes, High Deployment Frequency, Low Change Failure Rate, and Fast Mean Time to Recovery (DORA Metrics)',
      'The total number of lines of code written per engineer per sprint',
      'The number of Jira tickets marked closed per hour',
      'The total disk size of the Git repository'
    ],
    correctIndex: 0,
    explanation: 'The 4 DORA metrics measure elite engineering throughput and software stability without rewarding vanity lines-of-code output.',
    category: 'Practical Execution & Trace (70%)'
  }
];
