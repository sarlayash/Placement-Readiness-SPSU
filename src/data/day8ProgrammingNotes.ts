import { ProgrammingNote } from '../types';

/**
 * SPSU Udaipur Placement Readiness Program
 * Mentor: Kapil | Day 8: Software Engineering, Git Workflows, Debugging & Automated Testing
 * 5 Comprehensive Masterclass Notes with Complete Polyglot Code (C, C++, Java, Python)
 */
export const DAY_8_PROGRAMMING_NOTES: ProgrammingNote[] = [
  // NOTE 1
  {
    id: 'd8-note-1',
    title: 'Software Development Life Cycle (SDLC): Waterfall vs Agile Scrum vs Kanban',
    conceptSummary:
      'The SDLC governs software creation from ideation to decommissioning. Waterfall follows sequential phases (Requirements -> Design -> Implementation -> Verification -> Maintenance), ideal only for rigid, safety-critical aerospace/hardware specs. Modern tech enterprises use Agile Scrum (2-week timeboxed Sprints, Daily Standups, Sprint Planning, Sprint Review/Demo, and Retrospective) or Kanban (continuous flow, Work-In-Progress WIP limits, burndown tracking).',
    timeSpaceNote: 'Scrum Velocity Calculation: Average Story Points delivered per Sprint over 3-5 iterations.',
    kapilMentorTip:
      'In tech interviews, when asked about Agile, never say "Agile means writing code fast without documentation". Agile means iterative value delivery with continuous customer feedback loops and automated regression safety nets.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

// Sprint Velocity & Burndown Tracker
typedef struct {
    int sprintId;
    int committedPoints;
    int completedPoints;
    bool isCompleted;
} Sprint;

double calculateAverageVelocity(Sprint sprints[], int count) {
    if (count <= 0) return 0.0;
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += sprints[i].completedPoints;
    }
    return (double)total / count;
}

int main() {
    Sprint history[3] = {
        {1, 40, 38, true},
        {2, 45, 42, true},
        {3, 42, 45, true}
    };
    double velocity = calculateAverageVelocity(history, 3);
    printf("Agile Scrum Velocity Analysis:\\n");
    printf("Historical Velocity across 3 Sprints: %.2f Story Points/Sprint\\n", velocity);
    printf("Estimated capacity for next sprint: %d Story Points\\n", (int)velocity);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <numeric>
#include <iomanip>

struct Sprint {
    int id;
    int committed;
    int completed;
};

class AgileScrumTracker {
public:
    static double getVelocity(const std::vector<Sprint>& history) {
        if (history.empty()) return 0.0;
        int total = std::accumulate(history.begin(), history.end(), 0,
            [](int sum, const Sprint& s) { return sum + s.completed; });
        return static_cast<double>(total) / history.size();
    }
};

int main() {
    std::vector<Sprint> sprints = {{1, 40, 38}, {2, 45, 42}, {3, 42, 45}};
    double vel = AgileScrumTracker::getVelocity(sprints);
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "Agile Scrum Velocity Analysis:\\n";
    std::cout << "Historical Velocity across 3 Sprints: " << vel << " Story Points/Sprint\\n";
    std::cout << "Estimated capacity for next sprint: " << static_cast<int>(vel) << " Story Points\\n";
    return 0;
}`,
      java: `import java.util.List;

public class AgileScrumManager {
    public record Sprint(int id, int committed, int completed) {}

    public static double calculateVelocity(List<Sprint> history) {
        if (history == null || history.isEmpty()) return 0.0;
        return history.stream().mapToInt(Sprint::completed).average().orElse(0.0);
    }

    public static void main(String[] args) {
        List<Sprint> history = List.of(
            new Sprint(1, 40, 38),
            new Sprint(2, 45, 42),
            new Sprint(3, 42, 45)
        );
        double vel = calculateVelocity(history);
        System.out.println("Agile Scrum Velocity Analysis:");
        System.out.printf("Historical Velocity across 3 Sprints: %.2f Story Points/Sprint%n", vel);
        System.out.printf("Estimated capacity for next sprint: %d Story Points%n", (int) vel);
    }
}`,
      python: `from dataclasses import dataclass
from typing import List

@dataclass(frozen=True)
class Sprint:
    id: int
    committed: int
    completed: int

def calculate_velocity(history: List[Sprint]) -> float:
    if not history:
        return 0.0
    return sum(s.completed for s in history) / len(history)

if __name__ == "__main__":
    history = [Sprint(1, 40, 38), Sprint(2, 45, 42), Sprint(3, 42, 45)]
    vel = calculate_velocity(history)
    print("Agile Scrum Velocity Analysis:")
    print(f"Historical Velocity across 3 Sprints: {vel:.2f} Story Points/Sprint")
    print(f"Estimated capacity for next sprint: {int(vel)} Story Points")`,
    },
  },

  // NOTE 2
  {
    id: 'd8-note-2',
    title: 'Git Directed Acyclic Graph (DAG) Internals: Blobs, Trees, Commits & Hashes',
    conceptSummary:
      'Git is not a diff-based version control system; it is a content-addressable object store structured as a Directed Acyclic Graph (DAG). There are 4 fundamental objects in `.git/objects/`: 1) Blob (raw file bytes without filename), 2) Tree (directory mapping file names & permissions to blob or tree hashes), 3) Commit (points to top-level tree, author/committer, timestamp, message, and zero or more parent commit hashes), and 4) Annotated Tag. All objects are addressed by their SHA-1 (40 hex chars) or SHA-256 hash computed over `<type> <size>\\0<content>`.',
    timeSpaceNote: 'Content-addressable lookup by hash: O(1) file retrieval from `.git/objects/`.',
    kapilMentorTip:
      'Understanding that Git branches are simply 41-byte text files in `.git/refs/heads/` containing the 40-character hex hash of the latest commit demystifies branching and makes Git painless.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>

// Representation of a Git Tree Entry (Directory to Blob mapping)
typedef struct {
    char mode[7];        // 100644 (file), 040000 (tree)
    char name[64];       // filename (e.g., "main.c")
    char sha1Hex[41];    // 40 hex char SHA-1 hash
} GitTreeEntry;

void inspectGitTree(GitTreeEntry entries[], int count) {
    printf("=== Git Tree Object Inspection ===\\n");
    for (int i = 0; i < count; i++) {
        printf("Mode: %s | Hash: %.7s... | Name: %s\\n",
               entries[i].mode, entries[i].sha1Hex, entries[i].name);
    }
}

int main() {
    GitTreeEntry tree[2] = {
        {"100644", "main.c", "4b825dc642cb6eb9a060e54bf8d69288fbee4904"},
        {"100644", "README.md", "a8f3b21c43ef210892019ab921cbf820194821a1"}
    };
    inspectGitTree(tree, 2);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

struct GitTreeEntry {
    std::string mode;
    std::string name;
    std::string sha1;
};

void inspectGitTree(const std::vector<GitTreeEntry>& tree) {
    std::cout << "=== Git Tree Object Inspection ===\\n";
    for (const auto& entry : tree) {
        std::cout << "Mode: " << entry.mode << " | Hash: " << entry.sha1.substr(0, 7)
                  << "... | Name: " << entry.name << "\\n";
    }
}

int main() {
    std::vector<GitTreeEntry> tree = {
        {"100644", "main.cpp", "4b825dc642cb6eb9a060e54bf8d69288fbee4904"},
        {"100644", "README.md", "a8f3b21c43ef210892019ab921cbf820194821a1"}
    };
    inspectGitTree(tree);
    return 0;
}`,
      java: `import java.util.List;

public class GitObjectExplorer {
    public record TreeEntry(String mode, String name, String sha1) {}

    public static void inspectGitTree(List<TreeEntry> tree) {
        System.out.println("=== Git Tree Object Inspection ===");
        for (TreeEntry entry : tree) {
            System.out.printf("Mode: %s | Hash: %s... | Name: %s%n",
                entry.mode(), entry.sha1().substring(0, 7), entry.name());
        }
    }

    public static void main(String[] args) {
        List<TreeEntry> tree = List.of(
            new TreeEntry("100644", "Main.java", "4b825dc642cb6eb9a060e54bf8d69288fbee4904"),
            new TreeEntry("100644", "README.md", "a8f3b21c43ef210892019ab921cbf820194821a1")
        );
        inspectGitTree(tree);
    }
}`,
      python: `from dataclasses import dataclass
from typing import List

@dataclass(frozen=True)
class GitTreeEntry:
    mode: str
    name: str
    sha1: str

def inspect_git_tree(tree: List[GitTreeEntry]) -> None:
    print("=== Git Tree Object Inspection ===")
    for entry in tree:
        print(f"Mode: {entry.mode} | Hash: {entry.sha1[:7]}... | Name: {entry.name}")

if __name__ == "__main__":
    tree = [
        GitTreeEntry("100644", "main.py", "4b825dc642cb6eb9a060e54bf8d69288fbee4904"),
        GitTreeEntry("100644", "README.md", "a8f3b21c43ef210892019ab921cbf820194821a1"),
    ]
    inspect_git_tree(tree)`,
    },
  },

  // NOTE 3
  {
    id: 'd8-note-3',
    title: 'Git Branching Strategies: Merge vs Rebase vs Cherry-Pick & Conflict Resolution',
    conceptSummary:
      'Branches allow isolated feature development. Merging (`git merge feature`) combines diverging histories by creating a new 3-way Merge Commit with two parents, preserving historical chronology. Rebase (`git rebase main`) re-applies feature branch commits on top of main by creating new commit objects with different hashes, keeping history linear. Never rebase public shared branches! When concurrent edits touch the same lines, Git halts with conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>> feature`). Cherry-picking (`git cherry-pick <hash>`) selectively applies a specific commit to your current branch.',
    timeSpaceNote: 'Fast-Forward merge: O(1) pointer adjustment without creating a merge commit.',
    kapilMentorTip:
      'Golden Rule: Use `git merge` for pulling long-running branches into main with audit history. Use `git rebase` only for local personal feature branches before opening a Pull Request to keep the review diff clean.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>
#include <string.h>

// Git Merge Decision Matrix Simulator
typedef enum { FAST_FORWARD, THREE_WAY_MERGE, CONFLICT } MergeResult;

MergeResult simulateMerge(bool isAncestor, bool hasOverlappingLines) {
    if (isAncestor) {
        return FAST_FORWARD;
    }
    if (hasOverlappingLines) {
        return CONFLICT;
    }
    return THREE_WAY_MERGE;
}

const char* getMergeDescription(MergeResult res) {
    switch (res) {
        case FAST_FORWARD: return "Fast-Forward: Pointer moved directly to tip (O(1)).";
        case THREE_WAY_MERGE: return "3-Way Merge: Created new merge commit with 2 parents.";
        case CONFLICT: return "Conflict: Overlapping line edits detected. Resolve manually.";
    }
    return "Unknown";
}

int main() {
    printf("Git Merge Simulation Tests:\\n");
    printf("Scenario 1: %s\\n", getMergeDescription(simulateMerge(true, false)));
    printf("Scenario 2: %s\\n", getMergeDescription(simulateMerge(false, false)));
    printf("Scenario 3: %s\\n", getMergeDescription(simulateMerge(false, true)));
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

enum class MergeResult { FastForward, ThreeWayMerge, Conflict };

MergeResult simulateMerge(bool isAncestor, bool hasOverlappingLines) {
    if (isAncestor) return MergeResult::FastForward;
    if (hasOverlappingLines) return MergeResult::Conflict;
    return MergeResult::ThreeWayMerge;
}

std::string describe(MergeResult r) {
    switch (r) {
        case MergeResult::FastForward: return "Fast-Forward: Pointer moved directly to tip (O(1)).";
        case MergeResult::ThreeWayMerge: return "3-Way Merge: Created new merge commit with 2 parents.";
        case MergeResult::Conflict: return "Conflict: Overlapping line edits detected. Resolve manually.";
    }
    return "";
}

int main() {
    std::cout << "Git Merge Simulation Tests:\\n";
    std::cout << "Scenario 1: " << describe(simulateMerge(true, false)) << "\\n";
    std::cout << "Scenario 2: " << describe(simulateMerge(false, false)) << "\\n";
    std::cout << "Scenario 3: " << describe(simulateMerge(false, true)) << "\\n";
    return 0;
}`,
      java: `public class GitBranchStrategy {
    public enum MergeType { FAST_FORWARD, THREE_WAY_MERGE, CONFLICT }

    public static MergeType simulateMerge(boolean isAncestor, boolean hasOverlappingLines) {
        if (isAncestor) return MergeType.FAST_FORWARD;
        if (hasOverlappingLines) return MergeType.CONFLICT;
        return MergeType.THREE_WAY_MERGE;
    }

    public static void main(String[] args) {
        System.out.println("Git Merge Simulation Tests:");
        System.out.println("Scenario 1: Fast-Forward: Pointer moved directly to tip (O(1)).");
        System.out.println("Scenario 2: 3-Way Merge: Created new merge commit with 2 parents.");
        System.out.println("Scenario 3: Conflict: Overlapping line edits detected. Resolve manually.");
    }
}`,
      python: `from enum import Enum

class MergeType(Enum):
    FAST_FORWARD = "Fast-Forward: Pointer moved directly to tip (O(1))."
    THREE_WAY_MERGE = "3-Way Merge: Created new merge commit with 2 parents."
    CONFLICT = "Conflict: Overlapping line edits detected. Resolve manually."

def simulate_merge(is_ancestor: bool, has_overlapping_lines: bool) -> MergeType:
    if is_ancestor:
        return MergeType.FAST_FORWARD
    if has_overlapping_lines:
        return MergeType.CONFLICT
    return MergeType.THREE_WAY_MERGE

if __name__ == "__main__":
    print("Git Merge Simulation Tests:")
    print("Scenario 1:", simulate_merge(True, False).value)
    print("Scenario 2:", simulate_merge(False, False).value)
    print("Scenario 3:", simulate_merge(False, True).value)`,
    },
  },

  // NOTE 4
  {
    id: 'd8-note-4',
    title: 'Systematic Debugging & Root Cause Analysis (RCA): Git Bisect & 5 Whys',
    conceptSummary:
      'Debugging is the scientific application of hypothesis testing. When a regression appears among 1,000 commits, `git bisect` utilizes Binary Search ($O(\\log N)$): you mark `git bisect bad` (current broken commit) and `git bisect good <commit_id>` (last known working version). Git automatically checks out the midpoint commit (~10 tests isolate the bug across 1,024 commits). Post-incident, engineering teams run a "5 Whys" Root Cause Analysis to address structural deficiencies rather than blaming individuals.',
    timeSpaceNote: 'Git bisect time complexity: O(log N) tests where N is commit distance.',
    kapilMentorTip:
      'Never debug by guessing. Formulate a testable hypothesis, reproduce the issue with an automated failing unit test, observe the failure, fix the root cause, and verify the test turns green.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>

// Git Bisect Binary Search Simulator
// Returns the index of the first commit that introduced the bug
int gitBisect(bool commitPassed[], int totalCommits) {
    int low = 0;
    int high = totalCommits - 1;
    int firstBad = -1;
    int steps = 0;

    while (low <= high) {
        steps++;
        int mid = low + (high - low) / 2;
        if (!commitPassed[mid]) {
            firstBad = mid;
            high = mid - 1; // Look for earlier bad commit
        } else {
            low = mid + 1;  // Bad commit is in upper half
        }
    }
    printf("[git bisect] Tested %d midpoints across %d commits.\\n", steps, totalCommits);
    return firstBad;
}

int main() {
    // 8 commits: commits 0..4 passed, commits 5..7 broke
    bool commits[8] = {true, true, true, true, true, false, false, false};
    int badIndex = gitBisect(commits, 8);
    printf("First bad commit detected at Index: %d\\n", badIndex);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

int gitBisect(const std::vector<bool>& commits) {
    int low = 0;
    int high = static_cast<int>(commits.size()) - 1;
    int firstBad = -1;
    int steps = 0;

    while (low <= high) {
        steps++;
        int mid = low + (high - low) / 2;
        if (!commits[mid]) {
            firstBad = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    std::cout << "[git bisect] Tested " << steps << " midpoints across " << commits.size() << " commits.\\n";
    return firstBad;
}

int main() {
    std::vector<bool> commits = {true, true, true, true, true, false, false, false};
    int bad = gitBisect(commits);
    std::cout << "First bad commit detected at Index: " << bad << "\\n";
    return 0;
}`,
      java: `public class GitBisectEngine {
    public static int findFirstBadCommit(boolean[] commits) {
        int low = 0, high = commits.length - 1;
        int firstBad = -1, steps = 0;

        while (low <= high) {
            steps++;
            int mid = low + (high - low) / 2;
            if (!commits[mid]) {
                firstBad = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        System.out.printf("[git bisect] Tested %d midpoints across %d commits.%n", steps, commits.length);
        return firstBad;
    }

    public static void main(String[] args) {
        boolean[] commits = {true, true, true, true, true, false, false, false};
        int bad = findFirstBadCommit(commits);
        System.out.println("First bad commit detected at Index: " + bad);
    }
}`,
      python: `from typing import List

def git_bisect(commits: List[bool]) -> int:
    low, high = 0, len(commits) - 1
    first_bad = -1
    steps = 0

    while low <= high:
        steps += 1
        mid = low + (high - low) // 2
        if not commits[mid]:
            first_bad = mid
            high = mid - 1
        else:
            low = mid + 1

    print(f"[git bisect] Tested {steps} midpoints across {len(commits)} commits.")
    return first_bad

if __name__ == "__main__":
    commits = [True, True, True, True, True, False, False, False]
    bad = git_bisect(commits)
    print(f"First bad commit detected at Index: {bad}")`,
    },
  },

  // NOTE 5
  {
    id: 'd8-note-5',
    title: 'Automated Testing, Test Pyramid & Continuous Integration (CI)',
    conceptSummary:
      'The Test Pyramid categorizes automated tests: 1) Unit Tests (70% base: isolate pure functions, fast, deterministic, AAA pattern: Arrange-Act-Assert), 2) Integration Tests (20%: verify database queries, REST API handlers, message queues), and 3) End-to-End E2E Tests (10% apex: browser automation with Cypress/Playwright). Continuous Integration (GitHub Actions, GitLab CI) triggers test suites on every git push or PR, preventing broken builds from polluting production.',
    timeSpaceNote: 'Unit test suite execution: Milliseconds per test; full suites run in < 60s in CI pipelines.',
    kapilMentorTip:
      'Follow F.I.R.S.T. unit test principles: Fast (runs in milliseconds), Independent (no test depends on another), Repeatable (same result anywhere), Self-validating (boolean pass/fail), and Timely (written alongside code).',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>
#include <assert.h>

// Micro Unit Testing Harness in C
typedef struct {
    int totalRun;
    int passed;
    int failed;
} TestRunner;

void assertIntEquals(TestRunner* tr, const char* testName, int expected, int actual) {
    tr->totalRun++;
    if (expected == actual) {
        tr->passed++;
        printf("  [PASS] %s\\n", testName);
    } else {
        tr->failed++;
        printf("  [FAIL] %s: Expected %d but got %d\\n", testName, expected, actual);
    }
}

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int main() {
    TestRunner runner = {0, 0, 0};
    printf("Running Micro Unit Test Suite (AAA Pattern):\\n");
    // Test 1: Addition happy path
    assertIntEquals(&runner, "testAddPositiveNumbers", 5, add(2, 3));
    // Test 2: Multiplication with zero
    assertIntEquals(&runner, "testMultiplyByZero", 0, multiply(7, 0));
    // Test 3: Negative numbers
    assertIntEquals(&runner, "testAddNegativeNumbers", -5, add(-2, -3));

    printf("Test Results: %d/%d Passed (%d Failed)\\n", runner.passed, runner.totalRun, runner.failed);
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

class TestRunner {
public:
    int total = 0;
    int passed = 0;
    int failed = 0;

    void assertEquals(const std::string& name, int expected, int actual) {
        total++;
        if (expected == actual) {
            passed++;
            std::cout << "  [PASS] " << name << "\\n";
        } else {
            failed++;
            std::cout << "  [FAIL] " << name << ": Expected " << expected << " but got " << actual << "\\n";
        }
    }
};

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int main() {
    TestRunner runner;
    std::cout << "Running Micro Unit Test Suite (AAA Pattern):\\n";
    runner.assertEquals("testAddPositiveNumbers", 5, add(2, 3));
    runner.assertEquals("testMultiplyByZero", 0, multiply(7, 0));
    runner.assertEquals("testAddNegativeNumbers", -5, add(-2, -3));
    std::cout << "Test Results: " << runner.passed << "/" << runner.total << " Passed (" << runner.failed << " Failed)\\n";
    return 0;
}`,
      java: `public class TestHarness {
    private int total = 0, passed = 0, failed = 0;

    public void assertEquals(String testName, int expected, int actual) {
        total++;
        if (expected == actual) {
            passed++;
            System.out.println("  [PASS] " + testName);
        } else {
            failed++;
            System.out.printf("  [FAIL] %s: Expected %d but got %d%n", testName, expected, actual);
        }
    }

    public static int add(int a, int b) { return a + b; }
    public static int multiply(int a, int b) { return a * b; }

    public static void main(String[] args) {
        TestHarness runner = new TestHarness();
        System.out.println("Running Micro Unit Test Suite (AAA Pattern):");
        runner.assertEquals("testAddPositiveNumbers", 5, add(2, 3));
        runner.assertEquals("testMultiplyByZero", 0, multiply(7, 0));
        runner.assertEquals("testAddNegativeNumbers", -5, add(-2, -3));
        System.out.printf("Test Results: %d/%d Passed (%d Failed)%n", runner.passed, runner.total, runner.failed);
    }
}`,
      python: `class TestRunner:
    def __init__(self):
        self.total = 0
        self.passed = 0
        self.failed = 0

    def assert_equals(self, test_name: str, expected: int, actual: int) -> None:
        self.total += 1
        if expected == actual:
            self.passed += 1
            print(f"  [PASS] {test_name}")
        else:
            self.failed += 1
            print(f"  [FAIL] {test_name}: Expected {expected} but got {actual}")

def add(a: int, b: int) -> int:
    return a + b

def multiply(a: int, b: int) -> int:
    return a * b

if __name__ == "__main__":
    runner = TestRunner()
    print("Running Micro Unit Test Suite (AAA Pattern):")
    runner.assert_equals("testAddPositiveNumbers", 5, add(2, 3))
    runner.assert_equals("testMultiplyByZero", 0, multiply(7, 0))
    runner.assert_equals("testAddNegativeNumbers", -5, add(-2, -3))
    print(f"Test Results: {runner.passed}/{runner.total} Passed ({runner.failed} Failed)")`,
    },
  },
];
