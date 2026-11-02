import { PracticalChallenge } from '../types';

/**
 * SPSU Udaipur Placement Readiness Program
 * Mentor: Kapil | Day 8: Software Engineering, Git Workflows, Debugging & Testing
 * 10 Production-Grade Coding Challenges (C, C++, Java, Python)
 */
export const DAY_8_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  // 1. Semantic Versioning Comparator
  {
    id: 'd8-prob-1',
    day: 8,
    title: 'Semantic Versioning Comparator (SemVer 2.0.0)',
    difficulty: 'Easy',
    moduleTag: 'Module 8: Software Engineering & Developer Tools',
    problemStatement:
      'In modern package managers (npm, Maven, pip), dependencies follow Semantic Versioning (MAJOR.MINOR.PATCH). Implement a comparator function that compares two version strings `v1` and `v2`. Return `1` if `v1 > v2`, `-1` if `v1 < v2`, and `0` if `v1 == v2`.',
    inputFormat: 'Two space-separated semantic version strings (e.g., "1.2.10 1.2.4")',
    outputFormat: '1, -1, or 0',
    constraints: ['Versions are in format X.Y.Z where 0 <= X, Y, Z <= 1000'],
    sampleInput: '1.2.10 1.2.4',
    sampleOutput: '1',
    kapilIntuition:
      'Split each version by `.` into 3 integers: Major, Minor, Patch. Compare them sequentially from left to right. Notice that numeric comparison (10 > 4) is required, not lexicographical string comparison.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int compareSemVer(const char* v1, const char* v2) {
    // TODO: Parse X.Y.Z and compare sequentially
    return 0;
}

int main() {
    char v1[32], v2[32];
    if (scanf("%s %s", v1, v2) == 2) {
        printf("%d\\n", compareSemVer(v1, v2));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int compareSemVer(string v1, string v2) {
    // TODO: Parse X.Y.Z and compare sequentially
    return 0;
}

int main() {
    string v1, v2;
    if (cin >> v1 >> v2) {
        cout << compareSemVer(v1, v2) << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static int compareSemVer(String v1, String v2) {
        // TODO: Parse X.Y.Z and compare sequentially
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String v1 = sc.next();
            String v2 = sc.next();
            System.out.println(compareSemVer(v1, v2));
        }
    }
}`,
      python: `import sys

def compare_semver(v1: str, v2: str) -> int:
    # TODO: Parse X.Y.Z and compare sequentially
    return 0

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        parts = line.split()
        if len(parts) >= 2:
            print(compare_semver(parts[0], parts[1]))`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int compareSemVer(const char* v1, const char* v2) {
    int maj1 = 0, min1 = 0, pat1 = 0;
    int maj2 = 0, min2 = 0, pat2 = 0;
    sscanf(v1, "%d.%d.%d", &maj1, &min1, &pat1);
    sscanf(v2, "%d.%d.%d", &maj2, &min2, &pat2);

    if (maj1 != maj2) return (maj1 > maj2) ? 1 : -1;
    if (min1 != min2) return (min1 > min2) ? 1 : -1;
    if (pat1 != pat2) return (pat1 > pat2) ? 1 : -1;
    return 0;
}

int main() {
    char v1[32], v2[32];
    if (scanf("%s %s", v1, v2) == 2) {
        printf("%d\\n", compareSemVer(v1, v2));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int compareSemVer(string v1, string v2) {
    int maj1 = 0, min1 = 0, pat1 = 0;
    int maj2 = 0, min2 = 0, pat2 = 0;
    char dot;
    stringstream ss1(v1), ss2(v2);
    ss1 >> maj1 >> dot >> min1 >> dot >> pat1;
    ss2 >> maj2 >> dot >> min2 >> dot >> pat2;

    if (maj1 != maj2) return (maj1 > maj2) ? 1 : -1;
    if (min1 != min2) return (min1 > min2) ? 1 : -1;
    if (pat1 != pat2) return (pat1 > pat2) ? 1 : -1;
    return 0;
}

int main() {
    string v1, v2;
    if (cin >> v1 >> v2) {
        cout << compareSemVer(v1, v2) << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static int compareSemVer(String v1, String v2) {
        String[] p1 = v1.split("\\\\.");
        String[] p2 = v2.split("\\\\.");
        int maj1 = Integer.parseInt(p1[0]), min1 = Integer.parseInt(p1[1]), pat1 = Integer.parseInt(p1[2]);
        int maj2 = Integer.parseInt(p2[0]), min2 = Integer.parseInt(p2[1]), pat2 = Integer.parseInt(p2[2]);

        if (maj1 != maj2) return maj1 > maj2 ? 1 : -1;
        if (min1 != min2) return min1 > min2 ? 1 : -1;
        if (pat1 != pat2) return pat1 > pat2 ? 1 : -1;
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String v1 = sc.next();
            String v2 = sc.next();
            System.out.println(compareSemVer(v1, v2));
        }
    }
}`,
      python: `import sys

def compare_semver(v1: str, v2: str) -> int:
    t1 = [int(x) for x in v1.split(".")]
    t2 = [int(x) for x in v2.split(".")]
    if t1 > t2:
        return 1
    elif t1 < t2:
        return -1
    return 0

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        parts = line.split()
        if len(parts) >= 2:
            print(compare_semver(parts[0], parts[1]))`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '1.2.10 1.2.4',
        expectedOutput: '1',
        isHidden: false,
        explanation: 'Patch 10 is strictly greater than patch 4.',
      },
      {
        id: 'tc2',
        input: '2.0.0 2.0.0',
        expectedOutput: '0',
        isHidden: false,
        explanation: 'Both versions are identical.',
      },
      {
        id: 'tc3',
        input: '1.9.9 2.0.0',
        expectedOutput: '-1',
        isHidden: true,
        explanation: 'Major version 1 is smaller than Major version 2.',
      },
    ],
  },

  // 2. Git Commit SHA-1 Hex Hash Validator
  {
    id: 'd8-prob-2',
    day: 8,
    title: 'Git Commit SHA-1 Hex Hash Validator',
    difficulty: 'Easy',
    moduleTag: 'Module 8: Software Engineering & Developer Tools',
    problemStatement:
      'Git commit IDs are 160-bit SHA-1 hashes represented as exactly 40 lowercase hexadecimal characters (`0-9`, `a-f`). Write a validator that takes a string and prints `VALID` if it is a valid 40-character Git SHA-1 hash, or `INVALID` otherwise.',
    inputFormat: 'A single string',
    outputFormat: 'VALID or INVALID',
    constraints: ['Length <= 100'],
    sampleInput: '4b825dc642cb6eb9a060e54bf8d69288fbee4904',
    sampleOutput: 'VALID',
    kapilIntuition:
      'Check that length == 40, and each character is either between "0" and "9" or between "a" and "f". Uppercase characters or non-hex characters invalidate the hash.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

const char* validateGitHash(const char* str) {
    // TODO: Verify length == 40 and all chars in [0-9a-f]
    return "INVALID";
}

int main() {
    char hash[128];
    if (scanf("%s", hash) == 1) {
        printf("%s\\n", validateGitHash(hash));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

string validateGitHash(const string& str) {
    // TODO: Verify length == 40 and all chars in [0-9a-f]
    return "INVALID";
}

int main() {
    string s;
    if (cin >> s) {
        cout << validateGitHash(s) << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static String validateGitHash(String str) {
        // TODO: Verify length == 40 and all chars in [0-9a-f]
        return "INVALID";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            System.out.println(validateGitHash(sc.next()));
        }
    }
}`,
      python: `import sys

def validate_git_hash(s: str) -> str:
    # TODO: Verify length == 40 and all chars in [0-9a-f]
    return "INVALID"

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        print(validate_git_hash(line))`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

const char* validateGitHash(const char* str) {
    if (strlen(str) != 40) return "INVALID";
    for (int i = 0; i < 40; i++) {
        char c = str[i];
        if (!((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f'))) {
            return "INVALID";
        }
    }
    return "VALID";
}

int main() {
    char hash[128];
    if (scanf("%s", hash) == 1) {
        printf("%s\\n", validateGitHash(hash));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

string validateGitHash(const string& str) {
    if (str.length() != 40) return "INVALID";
    for (char c : str) {
        if (!((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f'))) {
            return "INVALID";
        }
    }
    return "VALID";
}

int main() {
    string s;
    if (cin >> s) {
        cout << validateGitHash(s) << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static String validateGitHash(String str) {
        if (str.length() != 40) return "INVALID";
        for (int i = 0; i < 40; i++) {
            char c = str.charAt(i);
            if (!((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f'))) {
                return "INVALID";
            }
        }
        return "VALID";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            System.out.println(validateGitHash(sc.next()));
        }
    }
}`,
      python: `import sys

def validate_git_hash(s: str) -> str:
    if len(s) == 40 and all(c in "0123456789abcdef" for c in s):
        return "VALID"
    return "INVALID"

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        print(validate_git_hash(line))`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '4b825dc642cb6eb9a060e54bf8d69288fbee4904',
        expectedOutput: 'VALID',
        isHidden: false,
        explanation: 'Exactly 40 lowercase hexadecimal digits.',
      },
      {
        id: 'tc2',
        input: '4B825DC642CB6EB9A060E54BF8D69288FBEE4904',
        expectedOutput: 'INVALID',
        isHidden: false,
        explanation: 'Git hashes must be lowercase hex.',
      },
      {
        id: 'tc3',
        input: '4b825dc642cb6eb9a060e54bf8d69288fbee49',
        expectedOutput: 'INVALID',
        isHidden: true,
        explanation: 'Too short (38 characters).',
      },
    ],
  },

  // 3. Arrange-Act-Assert Unit Test Harness
  {
    id: 'd8-prob-3',
    day: 8,
    title: 'Arrange-Act-Assert (AAA) Unit Test Assertion Engine',
    difficulty: 'Easy',
    moduleTag: 'Module 8: Software Engineering & Developer Tools',
    problemStatement:
      'Given an integer N followed by N lines of test assertion pairs `expected actual`, evaluate each test case. Print `PASSED: P | FAILED: F` where P is the count of matching assertions and F is the count of mismatches.',
    inputFormat: 'Line 1: N. Next N lines: two space-separated integers `expected actual`',
    outputFormat: 'PASSED: P | FAILED: F',
    constraints: ['1 <= N <= 1000', '-10^6 <= expected, actual <= 10^6'],
    sampleInput: "4\n5 5\n10 10\n20 25\n0 0",
    sampleOutput: 'PASSED: 3 | FAILED: 1',
    kapilIntuition:
      'The Arrange-Act-Assert pattern evaluates whether actual outcomes match expected invariants. Loop through each pair, incrementing the passed counter when `expected == actual`, otherwise incrementing failed.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        int passed = 0, failed = 0;
        // TODO: Count matches and mismatches
        printf("PASSED: %d | FAILED: %d\\n", passed, failed);
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        int passed = 0, failed = 0;
        // TODO: Count matches and mismatches
        cout << "PASSED: " << passed << " | FAILED: " << failed << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            int passed = 0, failed = 0;
            // TODO: Count matches and mismatches
            System.out.printf("PASSED: %d | FAILED: %d%n", passed, failed);
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    passed, failed = 0, 0
    idx = 1
    for _ in range(n):
        exp = int(lines[idx])
        act = int(lines[idx + 1])
        idx += 2
        if exp == act:
            passed += 1
        else:
            failed += 1
    print(f"PASSED: {passed} | FAILED: {failed}")

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        int passed = 0, failed = 0;
        for (int i = 0; i < n; i++) {
            int exp, act;
            scanf("%d %d", &exp, &act);
            if (exp == act) passed++;
            else failed++;
        }
        printf("PASSED: %d | FAILED: %d\\n", passed, failed);
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        int passed = 0, failed = 0;
        for (int i = 0; i < n; i++) {
            int exp, act;
            cin >> exp >> act;
            if (exp == act) passed++;
            else failed++;
        }
        cout << "PASSED: " << passed << " | FAILED: " << failed << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            int passed = 0, failed = 0;
            for (int i = 0; i < n; i++) {
                int exp = sc.nextInt();
                int act = sc.nextInt();
                if (exp == act) passed++;
                else failed++;
            }
            System.out.printf("PASSED: %d | FAILED: %d%n", passed, failed);
        }
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    passed, failed = 0, 0
    idx = 1
    for _ in range(n):
        exp = int(tokens[idx])
        act = int(tokens[idx + 1])
        idx += 2
        if exp == act:
            passed += 1
        else:
            failed += 1
    print(f"PASSED: {passed} | FAILED: {failed}")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: "4\n5 5\n10 10\n20 25\n0 0",
        expectedOutput: 'PASSED: 3 | FAILED: 1',
        isHidden: false,
        explanation: '3 test pairs match, 1 pair differs.',
      },
      {
        id: 'tc2',
        input: "2\n1 2\n3 4",
        expectedOutput: 'PASSED: 0 | FAILED: 2',
        isHidden: true,
        explanation: 'All tests fail.',
      },
    ],
  },

  // 4. Git Merge Strategy Detector
  {
    id: 'd8-prob-4',
    day: 8,
    title: 'Git Merge Strategy Detector: Fast-Forward vs 3-Way Merge',
    difficulty: 'Medium',
    moduleTag: 'Module 8: Software Engineering & Developer Tools',
    problemStatement:
      'Given an integer `isAncestor` (1 if target branch commit is a direct ancestor of incoming branch, 0 otherwise) and `hasOverlappingDiff` (1 if both branches modified identical lines, 0 otherwise), output the exact Git merge result: `FAST_FORWARD`, `THREE_WAY_MERGE`, or `CONFLICT`.',
    inputFormat: 'Two integers: isAncestor hasOverlappingDiff',
    outputFormat: 'FAST_FORWARD, THREE_WAY_MERGE, or CONFLICT',
    constraints: ['Inputs are 0 or 1'],
    sampleInput: '1 0',
    sampleOutput: 'FAST_FORWARD',
    kapilIntuition:
      'If target is an ancestor, Git performs a fast-forward merge without creating a merge commit. If not an ancestor, it attempts a 3-way merge. If overlapping diffs exist, it results in a merge conflict.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int isAncestor, overlap;
    if (scanf("%d %d", &isAncestor, &overlap) == 2) {
        // TODO: Determine merge strategy
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int isAncestor, overlap;
    if (cin >> isAncestor >> overlap) {
        // TODO: Determine merge strategy
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int isAncestor = sc.nextInt();
            int overlap = sc.nextInt();
            // TODO: Determine merge strategy
        }
    }
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    if line:
        parts = line.split()
        is_ancestor = int(parts[0])
        overlap = int(parts[1])
        # TODO: Determine merge strategy

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int isAncestor, overlap;
    if (scanf("%d %d", &isAncestor, &overlap) == 2) {
        if (isAncestor) {
            printf("FAST_FORWARD\\n");
        } else if (overlap) {
            printf("CONFLICT\\n");
        } else {
            printf("THREE_WAY_MERGE\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int isAncestor, overlap;
    if (cin >> isAncestor >> overlap) {
        if (isAncestor) {
            cout << "FAST_FORWARD" << endl;
        } else if (overlap) {
            cout << "CONFLICT" << endl;
        } else {
            cout << "THREE_WAY_MERGE" << endl;
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int isAncestor = sc.nextInt();
            int overlap = sc.nextInt();
            if (isAncestor == 1) {
                System.out.println("FAST_FORWARD");
            } else if (overlap == 1) {
                System.out.println("CONFLICT");
            } else {
                System.out.println("THREE_WAY_MERGE");
            }
        }
    }
}`,
      python: `import sys

def main():
    parts = sys.stdin.read().split()
    if len(parts) >= 2:
        is_ancestor = int(parts[0])
        overlap = int(parts[1])
        if is_ancestor == 1:
            print("FAST_FORWARD")
        elif overlap == 1:
            print("CONFLICT")
        else:
            print("THREE_WAY_MERGE")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '1 0',
        expectedOutput: 'FAST_FORWARD',
        isHidden: false,
        explanation: 'Linear ancestor branch allows direct pointer fast-forward.',
      },
      {
        id: 'tc2',
        input: '0 0',
        expectedOutput: 'THREE_WAY_MERGE',
        isHidden: false,
        explanation: 'Diverged branches with no overlapping lines create a 3-way merge commit.',
      },
      {
        id: 'tc3',
        input: '0 1',
        expectedOutput: 'CONFLICT',
        isHidden: true,
        explanation: 'Overlapping edits cause merge conflicts.',
      },
    ],
  },

  // 5. Git Merge Conflict Marker Extractor
  {
    id: 'd8-prob-5',
    day: 8,
    title: 'Git Merge Conflict Marker Extractor',
    difficulty: 'Medium',
    moduleTag: 'Module 8: Software Engineering & Developer Tools',
    problemStatement:
      'When Git conflicts occur, it injects conflict markers: `<<<<<<< HEAD` (current branch), `=======` (separator), and `>>>>>>> <branch>` (incoming branch). Given a 3-line conflict block containing `HEAD_VALUE`, separator, and `INCOMING_VALUE`, extract and print both values formatted as: `HEAD: [val] | INCOMING: [val]`.',
    inputFormat: 'Three lines: Line 1: `<<<<<<< HEAD [val]`, Line 2: `=======`, Line 3: `>>>>>>> branch [val]`',
    outputFormat: 'HEAD: [val] | INCOMING: [val]',
    constraints: ['String values contain alphanumeric tokens'],
    sampleInput: "<<<<<<< HEAD userAuthV1\n=======\n>>>>>>> feature userAuthV2",
    sampleOutput: 'HEAD: userAuthV1 | INCOMING: userAuthV2',
    kapilIntuition:
      'Parse the token following `<<<<<<< HEAD ` from line 1, and the token following `>>>>>>> <branch> ` from line 3.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char l1[128], l2[128], l3[128];
    if (fgets(l1, sizeof(l1), stdin) && fgets(l2, sizeof(l2), stdin) && fgets(l3, sizeof(l3), stdin)) {
        // TODO: Extract HEAD and INCOMING tokens
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string l1, l2, l3;
    if (getline(cin, l1) && getline(cin, l2) && getline(cin, l3)) {
        // TODO: Extract HEAD and INCOMING tokens
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String l1 = sc.nextLine();
            String l2 = sc.nextLine();
            String l3 = sc.nextLine();
            // TODO: Extract HEAD and INCOMING tokens
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().strip().splitlines()
    if len(lines) >= 3:
        l1, l2, l3 = lines[0], lines[1], lines[2]
        # TODO: Extract HEAD and INCOMING tokens

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char l1[128], l2[128], l3[128];
    if (fgets(l1, sizeof(l1), stdin) && fgets(l2, sizeof(l2), stdin) && fgets(l3, sizeof(l3), stdin)) {
        char headVal[64] = "", incVal[64] = "";
        char dummy1[32], dummy2[32];
        sscanf(l1, "%s %s %s", dummy1, dummy2, headVal);
        sscanf(l3, "%s %s %s", dummy1, dummy2, incVal);
        printf("HEAD: %s | INCOMING: %s\\n", headVal, incVal);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string l1, l2, l3;
    if (getline(cin, l1) && getline(cin, l2) && getline(cin, l3)) {
        stringstream ss1(l1), ss3(l3);
        string d1, d2, headVal, incVal;
        ss1 >> d1 >> d2 >> headVal;
        ss3 >> d1 >> d2 >> incVal;
        cout << "HEAD: " << headVal << " | INCOMING: " << incVal << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] p1 = sc.nextLine().trim().split("\\\\s+");
            sc.nextLine(); // Skip =======
            String[] p3 = sc.nextLine().trim().split("\\\\s+");
            String headVal = p1[p1.length - 1];
            String incVal = p3[p3.length - 1];
            System.out.printf("HEAD: %s | INCOMING: %s%n", headVal, incVal);
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().strip().splitlines()
    if len(lines) >= 3:
        p1 = lines[0].split()
        p3 = lines[2].split()
        head_val = p1[-1]
        inc_val = p3[-1]
        print(f"HEAD: {head_val} | INCOMING: {inc_val}")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: "<<<<<<< HEAD userAuthV1\n=======\n>>>>>>> feature userAuthV2",
        expectedOutput: 'HEAD: userAuthV1 | INCOMING: userAuthV2',
        isHidden: false,
        explanation: 'Extracts userAuthV1 and userAuthV2 from Git conflict tags.',
      },
    ],
  },

  // 6. Binary Search Regression Pinpointer (Git Bisect)
  {
    id: 'd8-prob-6',
    day: 8,
    title: 'Git Bisect: Binary Search Regression Pinpointer',
    difficulty: 'Medium',
    moduleTag: 'Module 8: Software Engineering & Developer Tools',
    problemStatement:
      'Given an integer N followed by N space-separated integers representing commit build status (1 = PASS, 0 = FAIL). All passed commits precede failed commits. Using binary search, find the 0-based index of the first broken commit. If all commits passed, print -1.',
    inputFormat: 'Line 1: N. Line 2: N space-separated integers (1 or 0)',
    outputFormat: '0-based index of the first 0, or -1',
    constraints: ['1 <= N <= 10^5'],
    sampleInput: "8\n1 1 1 1 1 0 0 0",
    sampleOutput: '5',
    kapilIntuition:
      'This is standard binary search for the first occurrence of 0 in O(log N) time, exactly mirroring `git bisect`.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int findFirstBadCommit(int arr[], int n) {
    // TODO: Binary search for first 0
    return -1;
}

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        int arr[100000];
        for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
        printf("%d\\n", findFirstBadCommit(arr, n));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int findFirstBadCommit(const vector<int>& arr) {
    // TODO: Binary search for first 0
    return -1;
}

int main() {
    int n;
    if (cin >> n) {
        vector<int> arr(n);
        for (int i = 0; i < n; i++) cin >> arr[i];
        cout << findFirstBadCommit(arr) << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static int findFirstBadCommit(int[] arr) {
        // TODO: Binary search for first 0
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            int[] arr = new int[n];
            for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
            System.out.println(findFirstBadCommit(arr));
        }
    }
}`,
      python: `import sys

def find_first_bad(arr):
    # TODO: Binary search for first 0
    return -1

if __name__ == "__main__":
    tokens = [int(x) for x in sys.stdin.read().split()]
    if tokens:
        n = tokens[0]
        arr = tokens[1:n+1]
        print(find_first_bad(arr))`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int findFirstBadCommit(int arr[], int n) {
    int low = 0, high = n - 1;
    int ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == 0) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        static int arr[100000];
        for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
        printf("%d\\n", findFirstBadCommit(arr, n));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int findFirstBadCommit(const vector<int>& arr) {
    int low = 0, high = static_cast<int>(arr.size()) - 1;
    int ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == 0) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main() {
    int n;
    if (cin >> n) {
        vector<int> arr(n);
        for (int i = 0; i < n; i++) cin >> arr[i];
        cout << findFirstBadCommit(arr) << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static int findFirstBadCommit(int[] arr) {
        int low = 0, high = arr.length - 1;
        int ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == 0) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            int[] arr = new int[n];
            for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
            System.out.println(findFirstBadCommit(arr));
        }
    }
}`,
      python: `import sys

def find_first_bad(arr):
    low, high = 0, len(arr) - 1
    ans = -1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == 0:
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans

if __name__ == "__main__":
    tokens = [int(x) for x in sys.stdin.read().split()]
    if tokens:
        n = tokens[0]
        arr = tokens[1:n+1]
        print(find_first_bad(arr))`,
    },
    testCases: [
      {
        id: 'tc1',
        input: "8\n1 1 1 1 1 0 0 0",
        expectedOutput: '5',
        isHidden: false,
        explanation: 'Commit at index 5 is the first failure.',
      },
      {
        id: 'tc2',
        input: "4\n1 1 1 1",
        expectedOutput: '-1',
        isHidden: false,
        explanation: 'All commits passed.',
      },
      {
        id: 'tc3',
        input: "3\n0 0 0",
        expectedOutput: '0',
        isHidden: true,
        explanation: 'First commit failed.',
      },
    ],
  },

  // 7. Conventional Commits Linter
  {
    id: 'd8-prob-7',
    day: 8,
    title: 'Conventional Commits Specification Linter',
    difficulty: 'Medium',
    moduleTag: 'Module 8: Software Engineering & Developer Tools',
    problemStatement:
      'In professional teams, commit messages follow Conventional Commits: `<type>: <description>` or `<type>(<scope>): <description>`. Valid types are: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`. Given a commit message string, print `VALID` if it satisfies this convention, or `INVALID` otherwise.',
    inputFormat: 'A single line of text',
    outputFormat: 'VALID or INVALID',
    constraints: ['Length <= 200'],
    sampleInput: 'feat(auth): implement oauth2 google login',
    sampleOutput: 'VALID',
    kapilIntuition:
      'Check if the prefix before `:` is a valid type (optionally followed by `(...)`), followed immediately by `: ` and a non-empty description.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

const char* lintCommit(const char* msg) {
    // TODO: Verify Conventional Commit format
    return "INVALID";
}

int main() {
    char msg[256];
    if (fgets(msg, sizeof(msg), stdin)) {
        printf("%s\\n", lintCommit(msg));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

string lintCommit(const string& msg) {
    // TODO: Verify Conventional Commit format
    return "INVALID";
}

int main() {
    string msg;
    if (getline(cin, msg)) {
        cout << lintCommit(msg) << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static String lintCommit(String msg) {
        // TODO: Verify Conventional Commit format
        return "INVALID";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            System.out.println(lintCommit(sc.nextLine()));
        }
    }
}`,
      python: `import sys

def lint_commit(msg: str) -> str:
    # TODO: Verify Conventional Commit format
    return "INVALID"

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        print(lint_commit(line))`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

const char* VALID_TYPES[] = {"feat", "fix", "docs", "refactor", "test", "chore"};

const char* lintCommit(const char* msg) {
    const char* colon = strstr(msg, ": ");
    if (!colon || colon == msg) return "INVALID";
    if (strlen(colon + 2) == 0) return "INVALID";

    char prefix[64];
    size_t len = colon - msg;
    if (len >= 64) return "INVALID";
    strncpy(prefix, msg, len);
    prefix[len] = '\\0';

    char type[32];
    char* openParen = strchr(prefix, '(');
    if (openParen) {
        size_t tLen = openParen - prefix;
        strncpy(type, prefix, tLen);
        type[tLen] = '\\0';
    } else {
        strcpy(type, prefix);
    }

    for (int i = 0; i < 6; i++) {
        if (strcmp(type, VALID_TYPES[i]) == 0) return "VALID";
    }
    return "INVALID";
}

int main() {
    char msg[256];
    if (fgets(msg, sizeof(msg), stdin)) {
        // strip trailing newline
        msg[strcspn(msg, "\\r\\n")] = 0;
        printf("%s\\n", lintCommit(msg));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

string lintCommit(const string& msg) {
    size_t pos = msg.find(": ");
    if (pos == string::npos || pos == 0) return "INVALID";
    if (pos + 2 >= msg.length()) return "INVALID";

    string prefix = msg.substr(0, pos);
    size_t paren = prefix.find('(');
    string type = (paren != string::npos) ? prefix.substr(0, paren) : prefix;

    vector<string> valid = {"feat", "fix", "docs", "refactor", "test", "chore"};
    for (const auto& v : valid) {
        if (type == v) return "VALID";
    }
    return "INVALID";
}

int main() {
    string msg;
    if (getline(cin, msg)) {
        cout << lintCommit(msg) << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;
import java.util.regex.Pattern;

public class Solution {
    private static final Pattern PATTERN = Pattern.compile("^(feat|fix|docs|refactor|test|chore)(\\\\([\\\\w-]+\\\\))?:\\\\s+.+$");

    public static String lintCommit(String msg) {
        return PATTERN.matcher(msg.trim()).matches() ? "VALID" : "INVALID";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            System.out.println(lintCommit(sc.nextLine()));
        }
    }
}`,
      python: `import sys
import re

PATTERN = re.compile(r"^(feat|fix|docs|refactor|test|chore)(\([a-zA-Z0-9_-]+\))?:\s+.+$")

def lint_commit(msg: str) -> str:
    return "VALID" if PATTERN.match(msg.strip()) else "INVALID"

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        print(lint_commit(line))`,
    },
    testCases: [
      {
        id: 'tc1',
        input: 'feat(auth): implement oauth2 google login',
        expectedOutput: 'VALID',
        isHidden: false,
        explanation: 'Valid feat type with scope and description.',
      },
      {
        id: 'tc2',
        input: 'fix: resolve null pointer exception in payment flow',
        expectedOutput: 'VALID',
        isHidden: false,
        explanation: 'Valid fix without scope.',
      },
      {
        id: 'tc3',
        input: 'stuff: quick changes',
        expectedOutput: 'INVALID',
        isHidden: true,
        explanation: 'stuff is not an allowed conventional commit type.',
      },
    ],
  },

  // 8. Dependency Injection Mock Spy
  {
    id: 'd8-prob-8',
    day: 8,
    title: 'Unit Test Mock Spy & Invocation Tracker',
    difficulty: 'Hard',
    moduleTag: 'Module 8: Software Engineering & Developer Tools',
    problemStatement:
      'In unit testing, test spies record method invocations to verify interactions with dependencies without calling real databases or networks. Implement a mock spy tracker that processes N operations: `INVOKE <methodName>` and `VERIFY <methodName> <expectedCount>`. For each `VERIFY`, print `VERIFIED: <methodName> (<count>)` if actual count matches expectedCount, or `FAILED: <methodName> (expected <exp> but was <act>)`.',
    inputFormat: 'Line 1: N. Next N lines: `INVOKE <name>` or `VERIFY <name> <expCount>`',
    outputFormat: 'Verification status for each VERIFY command',
    constraints: ['1 <= N <= 1000'],
    sampleInput: "4\nINVOKE sendEmail\nINVOKE sendEmail\nVERIFY sendEmail 2\nVERIFY logMetrics 1",
    sampleOutput: "VERIFIED: sendEmail (2)\nFAILED: logMetrics (expected 1 but was 0)",
    kapilIntuition:
      'Use a hash map to maintain invocation frequencies per method name. On VERIFY, lookup the map (defaulting to 0 if not invoked) and compare with expected.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        // TODO: Track method invocation counts and verify
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        // TODO: Track method invocation counts and verify
    }
    return 0;
}`,
      java: `import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            // TODO: Track method invocation counts and verify
        }
    }
}`,
      python: `import sys
from collections import defaultdict

def main():
    lines = sys.stdin.read().strip().splitlines()
    if not lines:
        return
    # TODO: Track method invocation counts and verify

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[64];
    int count;
} MethodCall;

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        MethodCall calls[256];
        int callCount = 0;

        for (int i = 0; i < n; i++) {
            char op[16], name[64];
            scanf("%s %s", op, name);
            if (strcmp(op, "INVOKE") == 0) {
                int found = 0;
                for (int j = 0; j < callCount; j++) {
                    if (strcmp(calls[j].name, name) == 0) {
                        calls[j].count++;
                        found = 1;
                        break;
                    }
                }
                if (!found && callCount < 256) {
                    strcpy(calls[callCount].name, name);
                    calls[callCount].count = 1;
                    callCount++;
                }
            } else if (strcmp(op, "VERIFY") == 0) {
                int exp;
                scanf("%d", &exp);
                int act = 0;
                for (int j = 0; j < callCount; j++) {
                    if (strcmp(calls[j].name, name) == 0) {
                        act = calls[j].count;
                        break;
                    }
                }
                if (act == exp) {
                    printf("VERIFIED: %s (%d)\\n", name, act);
                } else {
                    printf("FAILED: %s (expected %d but was %d)\\n", name, exp, act);
                }
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        unordered_map<string, int> counts;
        for (int i = 0; i < n; i++) {
            string op, name;
            cin >> op >> name;
            if (op == "INVOKE") {
                counts[name]++;
            } else if (op == "VERIFY") {
                int exp;
                cin >> exp;
                int act = counts[name];
                if (act == exp) {
                    cout << "VERIFIED: " << name << " (" << act << ")\\n";
                } else {
                    cout << "FAILED: " << name << " (expected " << exp << " but was " << act << ")\\n";
                }
            }
        }
    }
    return 0;
}`,
      java: `import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            Map<String, Integer> counts = new HashMap<>();
            for (int i = 0; i < n; i++) {
                String op = sc.next();
                String name = sc.next();
                if ("INVOKE".equals(op)) {
                    counts.put(name, counts.getOrDefault(name, 0) + 1);
                } else if ("VERIFY".equals(op)) {
                    int exp = sc.nextInt();
                    int act = counts.getOrDefault(name, 0);
                    if (act == exp) {
                        System.out.printf("VERIFIED: %s (%d)%n", name, act);
                    } else {
                        System.out.printf("FAILED: %s (expected %d but was %d)%n", name, exp, act);
                    }
                }
            }
        }
    }
}`,
      python: `import sys
from collections import defaultdict

def main():
    lines = sys.stdin.read().strip().splitlines()
    if not lines:
        return
    n = int(lines[0])
    counts = defaultdict(int)
    for line in lines[1:n+1]:
        parts = line.split()
        if not parts:
            continue
        op = parts[0]
        name = parts[1]
        if op == "INVOKE":
            counts[name] += 1
        elif op == "VERIFY":
            exp = int(parts[2])
            act = counts[name]
            if act == exp:
                print(f"VERIFIED: {name} ({act})")
            else:
                print(f"FAILED: {name} (expected {exp} but was {act})")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: "4\nINVOKE sendEmail\nINVOKE sendEmail\nVERIFY sendEmail 2\nVERIFY logMetrics 1",
        expectedOutput: "VERIFIED: sendEmail (2)\nFAILED: logMetrics (expected 1 but was 0)",
        isHidden: false,
        explanation: 'sendEmail was invoked twice, logMetrics zero times.',
      },
    ],
  },

  // 9. Code Coverage Calculator
  {
    id: 'd8-prob-9',
    day: 8,
    title: 'Code Coverage & Quality Metric Calculator',
    difficulty: 'Hard',
    moduleTag: 'Module 8: Software Engineering & Developer Tools',
    problemStatement:
      'Given the total number of executable lines `T`, and an integer `M` followed by `M` line numbers executed during test runs (some line numbers may repeat), calculate the line coverage percentage. Print `COVERAGE: X% (EXECUTED: E / TOTAL: T)` rounded to nearest integer.',
    inputFormat: 'Line 1: T M. Line 2: M space-separated executed line numbers',
    outputFormat: 'COVERAGE: X% (EXECUTED: E / TOTAL: T)',
    constraints: ['1 <= T <= 10^5', '0 <= M <= 10^5'],
    sampleInput: "10 5\n1 2 2 3 5",
    sampleOutput: 'COVERAGE: 40% (EXECUTED: 4 / TOTAL: 10)',
    kapilIntuition:
      'Store executed lines in a hash set to deduplicate. The count of unique valid lines `1 <= line <= T` is `E`. Coverage is `round((E / T) * 100)`.',
    timeComplexity: 'O(M)',
    spaceComplexity: 'O(E)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int t, m;
    if (scanf("%d %d", &t, &m) == 2) {
        // TODO: Deduplicate executed lines and print coverage
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    int t, m;
    if (cin >> t >> m) {
        // TODO: Deduplicate executed lines and print coverage
    }
    return 0;
}`,
      java: `import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int t = sc.nextInt();
            int m = sc.nextInt();
            // TODO: Deduplicate executed lines and print coverage
        }
    }
}`,
      python: `import sys

def main():
    tokens = [int(x) for x in sys.stdin.read().split()]
    if not tokens:
        return
    t = tokens[0]
    m = tokens[1]
    # TODO: Deduplicate executed lines and print coverage

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <math.h>

int main() {
    int t, m;
    if (scanf("%d %d", &t, &m) == 2) {
        static char visited[100001] = {0};
        int uniqueCount = 0;
        for (int i = 0; i < m; i++) {
            int line;
            scanf("%d", &line);
            if (line >= 1 && line <= t && !visited[line]) {
                visited[line] = 1;
                uniqueCount++;
            }
        }
        int pct = (int)round(((double)uniqueCount / t) * 100.0);
        printf("COVERAGE: %d%% (EXECUTED: %d / TOTAL: %d)\\n", pct, uniqueCount, t);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_set>
#include <cmath>
using namespace std;

int main() {
    int t, m;
    if (cin >> t >> m) {
        unordered_set<int> uniqueLines;
        for (int i = 0; i < m; i++) {
            int line;
            cin >> line;
            if (line >= 1 && line <= t) uniqueLines.insert(line);
        }
        int uniqueCount = static_cast<int>(uniqueLines.size());
        int pct = static_cast<int>(round((static_cast<double>(uniqueCount) / t) * 100.0));
        cout << "COVERAGE: " << pct << "% (EXECUTED: " << uniqueCount << " / TOTAL: " << t << ")\\n";
    }
    return 0;
}`,
      java: `import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int t = sc.nextInt();
            int m = sc.nextInt();
            Set<Integer> unique = new HashSet<>();
            for (int i = 0; i < m; i++) {
                int line = sc.nextInt();
                if (line >= 1 && line <= t) unique.add(line);
            }
            int e = unique.size();
            int pct = (int) Math.round(((double) e / t) * 100.0);
            System.out.printf("COVERAGE: %d%% (EXECUTED: %d / TOTAL: %d)%n", pct, e, t);
        }
    }
}`,
      python: `import sys

def main():
    tokens = [int(x) for x in sys.stdin.read().split()]
    if not tokens:
        return
    t = tokens[0]
    m = tokens[1]
    lines = tokens[2:2+m]
    unique = {x for x in lines if 1 <= x <= t}
    e = len(unique)
    pct = round((e / t) * 100) if t > 0 else 0
    print(f"COVERAGE: {pct}% (EXECUTED: {e} / TOTAL: {t})")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: "10 5\n1 2 2 3 5",
        expectedOutput: 'COVERAGE: 40% (EXECUTED: 4 / TOTAL: 10)',
        isHidden: false,
        explanation: 'Unique lines: 1, 2, 3, 5 = 4 lines out of 10 = 40%.',
      },
    ],
  },

  // 10. CI/CD Build DAG Scheduler (Topological Sort)
  {
    id: 'd8-prob-10',
    day: 8,
    title: 'CI/CD Build Pipeline Task Scheduler & Deadlock Detector',
    difficulty: 'Hard',
    moduleTag: 'Module 8: Software Engineering & Developer Tools',
    problemStatement:
      'In modern CI/CD engines (GitHub Actions, GitLab CI), build steps form a Directed Acyclic Graph (DAG) with prerequisites. Given `V` tasks (numbered 0 to V-1) and `E` dependency edges `U V` (meaning task U must complete before task V can run), determine if a valid deadlock-free execution order exists. If a cycle exists, print `CYCLIC_DEADLOCK`. Otherwise, print `VALID_PIPELINE`.',
    inputFormat: 'Line 1: V E. Next E lines: U V',
    outputFormat: 'VALID_PIPELINE or CYCLIC_DEADLOCK',
    constraints: ['1 <= V <= 1000', '0 <= E <= 5000'],
    sampleInput: "4 3\n0 1\n1 2\n2 3",
    sampleOutput: 'VALID_PIPELINE',
    kapilIntuition:
      "Use Kahn's algorithm (indegree counting and BFS queue). If the number of processed nodes equals V, the DAG is acyclic and valid. If fewer nodes are processed, a cyclic dependency deadlock exists.",
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int v, e;
    if (scanf("%d %d", &v, &e) == 2) {
        // TODO: Kahn's Algorithm / Cycle Detection in CI DAG
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int v, e;
    if (cin >> v >> e) {
        // TODO: Kahn's Algorithm / Cycle Detection in CI DAG
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int v = sc.nextInt();
            int e = sc.nextInt();
            // TODO: Kahn's Algorithm / Cycle Detection in CI DAG
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().strip().split()
    if not lines:
        return
    # TODO: Kahn's Algorithm / Cycle Detection in CI DAG

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int v, e;
    if (scanf("%d %d", &v, &e) == 2) {
        static int adj[1000][1000] = {0};
        static int adjCount[1000] = {0};
        static int inDegree[1000] = {0};

        for (int i = 0; i < e; i++) {
            int u, dest;
            scanf("%d %d", &u, &dest);
            adj[u][adjCount[u]++] = dest;
            inDegree[dest]++;
        }

        int queue[1000], front = 0, rear = 0;
        for (int i = 0; i < v; i++) {
            if (inDegree[i] == 0) queue[rear++] = i;
        }

        int processed = 0;
        while (front < rear) {
            int curr = queue[front++];
            processed++;
            for (int i = 0; i < adjCount[curr]; i++) {
                int nxt = adj[curr][i];
                if (--inDegree[nxt] == 0) {
                    queue[rear++] = nxt;
                }
            }
        }

        if (processed == v) {
            printf("VALID_PIPELINE\\n");
        } else {
            printf("CYCLIC_DEADLOCK\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int v, e;
    if (cin >> v >> e) {
        vector<vector<int>> adj(v);
        vector<int> inDegree(v, 0);
        for (int i = 0; i < e; i++) {
            int u, dest;
            cin >> u >> dest;
            adj[u].push_back(dest);
            inDegree[dest]++;
        }

        queue<int> q;
        for (int i = 0; i < v; i++) {
            if (inDegree[i] == 0) q.push(i);
        }

        int processed = 0;
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            processed++;
            for (int nxt : adj[curr]) {
                if (--inDegree[nxt] == 0) q.push(nxt);
            }
        }

        if (processed == v) {
            cout << "VALID_PIPELINE\\n";
        } else {
            cout << "CYCLIC_DEADLOCK\\n";
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int v = sc.nextInt();
            int e = sc.nextInt();
            List<List<Integer>> adj = new ArrayList<>();
            for (int i = 0; i < v; i++) adj.add(new ArrayList<>());
            int[] inDegree = new int[v];

            for (int i = 0; i < e; i++) {
                int u = sc.nextInt();
                int dest = sc.nextInt();
                adj.get(u).add(dest);
                inDegree[dest]++;
            }

            Queue<Integer> q = new LinkedList<>();
            for (int i = 0; i < v; i++) {
                if (inDegree[i] == 0) q.add(i);
            }

            int processed = 0;
            while (!q.isEmpty()) {
                int curr = q.poll();
                processed++;
                for (int nxt : adj.get(curr)) {
                    if (--inDegree[nxt] == 0) q.add(nxt);
                }
            }

            if (processed == v) {
                System.out.println("VALID_PIPELINE");
            } else {
                System.out.println("CYCLIC_DEADLOCK");
            }
        }
    }
}`,
      python: `import sys
from collections import deque

def main():
    tokens = [int(x) for x in sys.stdin.read().split()]
    if not tokens:
        return
    v = tokens[0]
    e = tokens[1]
    adj = [[] for _ in range(v)]
    in_degree = [0] * v
    idx = 2
    for _ in range(e):
        u = tokens[idx]
        dest = tokens[idx + 1]
        idx += 2
        adj[u].append(dest)
        in_degree[dest] += 1

    q = deque([i for i in range(v) if in_degree[i] == 0])
    processed = 0
    while q:
        curr = q.popleft()
        processed += 1
        for nxt in adj[curr]:
            in_degree[nxt] -= 1
            if in_degree[nxt] == 0:
                q.append(nxt)

    if processed == v:
        print("VALID_PIPELINE")
    else:
        print("CYCLIC_DEADLOCK")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: "4 3\n0 1\n1 2\n2 3",
        expectedOutput: 'VALID_PIPELINE',
        isHidden: false,
        explanation: 'Linear dependency chain 0 -> 1 -> 2 -> 3 has no cycles.',
      },
      {
        id: 'tc2',
        input: "3 3\n0 1\n1 2\n2 0",
        expectedOutput: 'CYCLIC_DEADLOCK',
        isHidden: false,
        explanation: 'Cycle 0 -> 1 -> 2 -> 0 causes CI pipeline deadlock.',
      },
    ],
  },
];
