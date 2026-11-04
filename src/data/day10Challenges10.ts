import { PracticalChallenge } from '../types';

/**
 * Day 10 Practical Challenges (10 Placement-Grade Problems)
 * Modules 10 & 11: AI-Assisted Software Development & Technical Interview Preparation
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 */
export const DAY_10_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  {
    id: 'd10-prob-1',
    day: 10,
    title: 'AI Code Audit: Overflow-Safe Binary Search Midpoint',
    difficulty: 'Easy',
    moduleTag: 'Module 10: AI Code Review & Verification',
    companies: ['Google', 'Microsoft', 'Amazon'],
    platforms: ['LeetCode 704', 'GeeksforGeeks'],
    problemStatement:
      'An AI coding assistant generated a binary search implementation with `int mid = (low + high) / 2;`. When tested on large integer boundaries where low and high approach 2^31 - 1, the addition triggers signed 32-bit integer overflow, yielding a negative index and crashing the runtime.\n\nYour task: Given sorted integers and a target value, implement an audited binary search that computes the midpoint using overflow-safe arithmetic `low + (high - low) / 2` and returns the 0-based index of the target, or -1 if absent.',
    inputFormat: 'Line 1: N (array length), Line 2: N space-separated sorted integers, Line 3: target',
    outputFormat: 'Index of target or -1',
    constraints: [
      '0 <= N <= 10^5',
      '-2^31 <= nums[i], target <= 2^31 - 1',
      'Time Complexity: O(log N)',
      'Auxiliary Space: O(1)',
    ],
    sampleInput: '5\n1 3 5 7 9\n7',
    sampleOutput: '3',
    kapilIntuition:
      'Whenever adding two large positive integers in C, C++, or Java, always recognize that `(a + b)` risks 32-bit signed overflow. The algebraic rearrangement `a + (b - a) / 2` calculates the identical midpoint without ever exceeding `b`.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int binarySearch(int nums[], int n, int target) {
    // Audit & implement overflow-safe binary search
    return -1;
}

int main() {
    int n, target;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    scanf("%d", &target);
    printf("%d\\n", binarySearch(nums, n, target));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& nums, int target) {
    // Implement safe midpoint binary search
    return -1;
}

int main() {
    int n, target;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cin >> target;
    cout << binarySearch(nums, target) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static int binarySearch(int[] nums, int target) {
        // Implement safe midpoint binary search
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();
        System.out.println(binarySearch(nums, target));
    }
}`,
      python: `import sys

def binary_search(nums: list[int], target: int) -> int:
    # Implement safe binary search
    return -1

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    nums = [int(x) for x in lines[1:n+1]]
    target = int(lines[n+1])
    print(binary_search(nums, target))

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int binarySearch(int nums[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int n, target;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    scanf("%d", &target);
    printf("%d\\n", binarySearch(nums, n, target));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& nums, int target) {
    int low = 0, high = (int)nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int n, target;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cin >> target;
    cout << binarySearch(nums, target) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static int binarySearch(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();
        System.out.println(binarySearch(nums, target));
    }
}`,
      python: `import sys

def binary_search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    nums = [int(x) for x in lines[1:n+1]]
    target = int(lines[n+1])
    print(binary_search(nums, target))

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd10-prob-1-tc1',
        input: '5\n1 3 5 7 9\n7',
        expectedOutput: '3',
        isHidden: false,
        explanation: 'Target 7 is located at index 3.',
      },
      {
        id: 'd10-prob-1-tc2',
        input: '5\n1 3 5 7 9\n2',
        expectedOutput: '-1',
        isHidden: false,
        explanation: 'Target 2 is not present in the array.',
      },
      {
        id: 'd10-prob-1-tc3',
        input: '1\n100\n100',
        expectedOutput: '0',
        isHidden: true,
        explanation: 'Single-element array boundary case.',
      },
    ],
  },
  {
    id: 'd10-prob-2',
    day: 10,
    title: 'AI Code Audit: Memory Leak & Resource Management Scanner',
    difficulty: 'Medium',
    moduleTag: 'Module 10: AI Code Review & Verification',
    companies: ['Adobe', 'Cisco', 'Uber'],
    platforms: ['HackerRank', 'CodeChef'],
    problemStatement:
      'AI coding assistants regularly fail to match memory allocations (`malloc`/`new`) with deallocations (`free`/`delete`), leading to severe memory leaks in long-running services.\n\nYour task: Build a static allocation balance scanner. Given a sequence of resource operations (`ALLOC <id>`, `FREE <id>`, `OPEN <id>`, `CLOSE <id>`), detect whether any resource leaked without being released, or if an invalid double-free occurred. Print `LEAK_DETECTED: <count>` if any resources remain open, `DOUBLE_FREE: <id>` on an illegal duplicate free, or `CLEAN` if all resources were correctly disposed.',
    inputFormat: 'Line 1: N operations. Next N lines: `<ACTION> <RESOURCE_ID>`',
    outputFormat: '`CLEAN`, `DOUBLE_FREE: <id>`, or `LEAK_DETECTED: <count>`',
    constraints: [
      '1 <= N <= 10^4',
      'Action is in {ALLOC, FREE, OPEN, CLOSE}',
      'Resource ID is an alphanumeric string',
      'Time Complexity: O(N)',
      'Auxiliary Space: O(N)',
    ],
    sampleInput: '4\nALLOC res1\nALLOC res2\nFREE res1\nFREE res2',
    sampleOutput: 'CLEAN',
    kapilIntuition:
      'In C and C++, resource leaks degrade production servers over time. Maintain an active resource set. When an allocation occurs, record it. When freed, erase it. If freed when not active, flag double-free; if non-empty at exit, flag leaked resources.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    // Implement allocation and leak scanner
    printf("CLEAN\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

int main() {
    // Implement allocation and leak scanner
    cout << "CLEAN" << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // Implement allocation and leak scanner
        System.out.println("CLEAN");
    }
}`,
      python: `import sys

def main():
    # Implement allocation and leak scanner
    print("CLEAN")

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

#define MAX_ITEMS 500
char active[MAX_ITEMS][64];
int count = 0;

int findActive(const char* id) {
    for (int i = 0; i < count; i++) {
        if (strcmp(active[i], id) == 0) return i;
    }
    return -1;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    char action[32], id[64];
    for (int i = 0; i < n; i++) {
        scanf("%s %s", action, id);
        if (strcmp(action, "ALLOC") == 0 || strcmp(action, "OPEN") == 0) {
            strcpy(active[count++], id);
        } else if (strcmp(action, "FREE") == 0 || strcmp(action, "CLOSE") == 0) {
            int idx = findActive(id);
            if (idx == -1) {
                printf("DOUBLE_FREE: %s\\n", id);
                return 0;
            }
            // Remove by swapping with last
            strcpy(active[idx], active[count - 1]);
            count--;
        }
    }
    if (count > 0) {
        printf("LEAK_DETECTED: %d\\n", count);
    } else {
        printf("CLEAN\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    unordered_set<string> active;
    string action, id;
    for (int i = 0; i < n; ++i) {
        cin >> action >> id;
        if (action == "ALLOC" || action == "OPEN") {
            active.insert(id);
        } else if (action == "FREE" || action == "CLOSE") {
            if (active.find(id) == active.end()) {
                cout << "DOUBLE_FREE: " << id << endl;
                return 0;
            }
            active.erase(id);
        }
    }
    if (!active.empty()) {
        cout << "LEAK_DETECTED: " << active.size() << endl;
    } else {
        cout << "CLEAN" << endl;
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        Set<String> active = new HashSet<>();
        for (int i = 0; i < n; i++) {
            String action = sc.next();
            String id = sc.next();
            if (action.equals("ALLOC") || action.equals("OPEN")) {
                active.add(id);
            } else if (action.equals("FREE") || action.equals("CLOSE")) {
                if (!active.contains(id)) {
                    System.out.println("DOUBLE_FREE: " + id);
                    return;
                }
                active.remove(id);
            }
        }
        if (!active.isEmpty()) {
            System.out.println("LEAK_DETECTED: " + active.size());
        } else {
            System.out.println("CLEAN");
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    active = set()
    idx = 1
    for _ in range(n):
        action = lines[idx]
        item_id = lines[idx + 1]
        idx += 2
        if action in ("ALLOC", "OPEN"):
            active.add(item_id)
        elif action in ("FREE", "CLOSE"):
            if item_id not in active:
                print(f"DOUBLE_FREE: {item_id}")
                return
            active.remove(item_id)
    if active:
        print(f"LEAK_DETECTED: {len(active)}")
    else:
        print("CLEAN")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd10-prob-2-tc1',
        input: '4\nALLOC res1\nALLOC res2\nFREE res1\nFREE res2',
        expectedOutput: 'CLEAN',
        isHidden: false,
        explanation: 'All allocated resources were correctly freed.',
      },
      {
        id: 'd10-prob-2-tc2',
        input: '3\nALLOC r1\nALLOC r2\nFREE r1',
        expectedOutput: 'LEAK_DETECTED: 1',
        isHidden: false,
        explanation: 'Resource r2 was allocated but never freed.',
      },
      {
        id: 'd10-prob-2-tc3',
        input: '3\nALLOC r1\nFREE r1\nFREE r1',
        expectedOutput: 'DOUBLE_FREE: r1',
        isHidden: true,
        explanation: 'Resource r1 freed twice triggers illegal double-free error.',
      },
    ],
  },
  {
    id: 'd10-prob-3',
    day: 10,
    title: 'Supply-Chain Slopsquatting & Package Whitelist Validator',
    difficulty: 'Easy',
    moduleTag: 'Module 10: AI Security & Responsible Use',
    companies: ['Datadog', 'Palo Alto Networks', 'CrowdStrike'],
    platforms: ['LeetCode 205', 'HackerEarth'],
    problemStatement:
      'LLMs frequently hallucinate plausible third-party package names (e.g. `express-auth-pro`, `fastapi-security-turbo`). Attackers register these hallucinated names on public registries with malicious payloads ("slopsquatting").\n\nYour task: Build an automated dependency validator. Given a curated whitelist of verified packages and a list of AI-suggested packages, output each candidate as `APPROVED` or `REJECTED: HALLUCINATED_PACKAGE`.',
    inputFormat: 'Line 1: K (whitelist count). Line 2: K space-separated verified package names. Line 3: M (candidate count). Line 4: M candidate package names.',
    outputFormat: 'M lines: `<package>: APPROVED` or `<package>: REJECTED: HALLUCINATED_PACKAGE` (case-insensitive comparison)',
    constraints: [
      '1 <= K, M <= 1000',
      'Package names contain alphanumeric chars and dashes',
      'Comparison is strictly case-insensitive',
      'Time Complexity: O((K + M) * L)',
      'Auxiliary Space: O(K * L)',
    ],
    sampleInput: '3\nexpress react lodash\n3\nexpress react-jwt-v2 lodash',
    sampleOutput: 'express: APPROVED\nreact-jwt-v2: REJECTED: HALLUCINATED_PACKAGE\nlodash: APPROVED',
    kapilIntuition:
      'Never allow build scripts to run `npm install` or `pip install` on unvetted AI suggestions. Maintain an in-memory hash set of normalized (lowercase) whitelisted names for instant O(1) membership testing.',
    timeComplexity: 'O(K + M)',
    spaceComplexity: 'O(K)',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    // Implement package whitelist validator
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

int main() {
    // Implement package whitelist validator
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // Implement package whitelist validator
    }
}`,
      python: `import sys

def main():
    # Implement package whitelist validator
    pass

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

void toLowerStr(char* s) {
    for (int i = 0; s[i]; i++) s[i] = tolower(s[i]);
}

int main() {
    int k;
    if (scanf("%d", &k) != 1) return 0;
    char whitelist[1000][64];
    for (int i = 0; i < k; i++) {
        scanf("%s", whitelist[i]);
        toLowerStr(whitelist[i]);
    }
    int m;
    if (scanf("%d", &m) != 1) return 0;
    char candidate[64], orig[64];
    for (int i = 0; i < m; i++) {
        scanf("%s", orig);
        strcpy(candidate, orig);
        toLowerStr(candidate);
        bool found = false;
        for (int j = 0; j < k; j++) {
            if (strcmp(candidate, whitelist[j]) == 0) {
                found = true;
                break;
            }
        }
        if (found) {
            printf("%s: APPROVED\\n", orig);
        } else {
            printf("%s: REJECTED: HALLUCINATED_PACKAGE\\n", orig);
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_set>
#include <algorithm>
using namespace std;

string toLowerStr(string s) {
    transform(s.begin(), s.end(), s.begin(), ::tolower);
    return s;
}

int main() {
    int k;
    if (!(cin >> k)) return 0;
    unordered_set<string> whitelist;
    for (int i = 0; i < k; ++i) {
        string pkg;
        cin >> pkg;
        whitelist.insert(toLowerStr(pkg));
    }
    int m;
    if (!(cin >> m)) return 0;
    for (int i = 0; i < m; ++i) {
        string orig;
        cin >> orig;
        if (whitelist.count(toLowerStr(orig))) {
            cout << orig << ": APPROVED\\n";
        } else {
            cout << orig << ": REJECTED: HALLUCINATED_PACKAGE\\n";
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int k = sc.nextInt();
        Set<String> whitelist = new HashSet<>();
        for (int i = 0; i < k; i++) {
            whitelist.add(sc.next().toLowerCase());
        }
        int m = sc.nextInt();
        for (int i = 0; i < m; i++) {
            String orig = sc.next();
            if (whitelist.contains(orig.toLowerCase())) {
                System.out.println(orig + ": APPROVED");
            } else {
                System.out.println(orig + ": REJECTED: HALLUCINATED_PACKAGE");
            }
        }
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    k = int(tokens[0])
    whitelist = set(pkg.lower() for pkg in tokens[1:k+1])
    m = int(tokens[k+1])
    candidates = tokens[k+2:k+2+m]
    for orig in candidates:
        if orig.lower() in whitelist:
            print(f"{orig}: APPROVED")
        else:
            print(f"{orig}: REJECTED: HALLUCINATED_PACKAGE")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd10-prob-3-tc1',
        input: '3\nexpress react lodash\n3\nexpress react-jwt-v2 lodash',
        expectedOutput: 'express: APPROVED\nreact-jwt-v2: REJECTED: HALLUCINATED_PACKAGE\nlodash: APPROVED',
        isHidden: false,
        explanation: 'react-jwt-v2 is not in the approved whitelist and is rejected.',
      },
      {
        id: 'd10-prob-3-tc2',
        input: '2\nPydantic FastAPI\n2\nfastapi Pydantic',
        expectedOutput: 'fastapi: APPROVED\nPydantic: APPROVED',
        isHidden: false,
        explanation: 'Case-insensitive comparison approves packages regardless of casing.',
      },
    ],
  },
  {
    id: 'd10-prob-4',
    day: 10,
    title: 'PII & Secret Redactor for Prompt Sanitization',
    difficulty: 'Medium',
    moduleTag: 'Module 10: AI Security & Privacy',
    companies: ['Google Cloud', 'Cloudflare', 'Okta'],
    platforms: ['LeetCode 824', 'HackerRank'],
    problemStatement:
      'Engineers must never paste client PII or secrets into public LLM prompts. Build a sanitization filter that takes a raw text stream and redacts:\n1. Any email address (contains `@` with standard domain) -> replace with `[REDACTED_EMAIL]`\n2. Any string beginning with `Bearer ` -> replace with `Bearer [REDACTED_TOKEN]`\n3. Any AWS access key (starts with `AKIA` followed by 16 alphanumeric characters) -> replace with `[REDACTED_KEY]`\n\nPrint the fully scrubbed text.',
    inputFormat: 'A single line of text containing mixed code/prompt logs',
    outputFormat: 'The sanitized string with all sensitive entities redacted',
    constraints: [
      '1 <= length <= 2000',
      'All tokens separated by spaces',
      'Time Complexity: O(N)',
      'Auxiliary Space: O(N)',
    ],
    sampleInput: 'User email is kapil@spsu.ac.in and key is AKIA1234567890ABCDEF with Bearer tokenSecret123',
    sampleOutput: 'User email is [REDACTED_EMAIL] and key is [REDACTED_KEY] with Bearer [REDACTED_TOKEN]',
    kapilIntuition:
      'Token-level regex/lexical scanning before sending prompts to external APIs prevents catastrophic GDPR/HIPAA compliance violations and credential leaks.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    // Implement PII and secret redactor
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <regex>
using namespace std;

int main() {
    // Implement PII and secret redactor
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        // Implement PII and secret redactor
    }
}`,
      python: `import sys

def main():
    # Implement PII and secret redactor
    pass

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool isEmail(const char* s) {
    const char* at = strchr(s, '@');
    if (!at || at == s || *(at + 1) == '\\0') return false;
    const char* dot = strchr(at + 1, '.');
    return dot && *(dot + 1) != '\\0';
}

bool isAwsKey(const char* s) {
    if (strncmp(s, "AKIA", 4) != 0) return false;
    return strlen(s) == 20;
}

int main() {
    char token[256];
    bool first = true;
    bool prevWasBearer = false;
    while (scanf("%s", token) == 1) {
        if (!first) printf(" ");
        first = false;

        if (prevWasBearer) {
            printf("[REDACTED_TOKEN]");
            prevWasBearer = false;
        } else if (strcmp(token, "Bearer") == 0) {
            printf("Bearer");
            prevWasBearer = true;
        } else if (isEmail(token)) {
            printf("[REDACTED_EMAIL]");
        } else if (isAwsKey(token)) {
            printf("[REDACTED_KEY]");
        } else {
            printf("%s", token);
        }
    }
    printf("\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <sstream>
#include <regex>
using namespace std;

int main() {
    string line;
    if (!getline(cin, line)) return 0;

    // Redact AWS Key
    regex awsRegex(R"(AKIA[A-Za-z0-9]{16})");
    line = regex_replace(line, awsRegex, "[REDACTED_KEY]");

    // Redact Bearer Token
    regex bearerRegex(R"(Bearer\s+[^\s]+)");
    line = regex_replace(line, bearerRegex, "Bearer [REDACTED_TOKEN]");

    // Redact Email
    regex emailRegex(R"([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})");
    line = regex_replace(line, emailRegex, "[REDACTED_EMAIL]");

    cout << line << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String line = sc.nextLine();
        
        line = line.replaceAll("AKIA[A-Za-z0-9]{16}", "[REDACTED_KEY]");
        line = line.replaceAll("Bearer\\s+[^\\s]+", "Bearer [REDACTED_TOKEN]");
        line = line.replaceAll("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}", "[REDACTED_EMAIL]");
        
        System.out.println(line);
    }
}`,
      python: `import sys
import re

def main():
    text = sys.stdin.read().strip()
    if not text:
        return
    text = re.sub(r'AKIA[A-Za-z0-9]{16}', '[REDACTED_KEY]', text)
    text = re.sub(r'Bearer\s+[^\s]+', 'Bearer [REDACTED_TOKEN]', text)
    text = re.sub(r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', '[REDACTED_EMAIL]', text)
    print(text)

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd10-prob-4-tc1',
        input: 'User email is kapil@spsu.ac.in and key is AKIA1234567890ABCDEF with Bearer tokenSecret123',
        expectedOutput: 'User email is [REDACTED_EMAIL] and key is [REDACTED_KEY] with Bearer [REDACTED_TOKEN]',
        isHidden: false,
        explanation: 'Email, AWS API key, and Bearer token are all scrubbed.',
      },
      {
        id: 'd10-prob-4-tc2',
        input: 'Clean log without sensitive credentials',
        expectedOutput: 'Clean log without sensitive credentials',
        isHidden: false,
        explanation: 'Unchanged if no sensitive entities match.',
      },
    ],
  },
  {
    id: 'd10-prob-5',
    day: 10,
    title: 'Live-Coding Classic: Trapping Rain Water (Two-Pointer O(N) Time, O(1) Space)',
    difficulty: 'Hard',
    moduleTag: 'Module 11: Technical Interview Live Coding',
    companies: ['Google', 'Amazon', 'Meta', 'Goldman Sachs'],
    platforms: ['LeetCode 42', 'GeeksforGeeks'],
    problemStatement:
      'Given N non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\nIn a technical interview, solving this in O(N) space using auxiliary arrays is acceptable for a passing grade, but top product companies require the O(1) auxiliary space Two-Pointer solution with clear invariant narration.',
    inputFormat: 'Line 1: N. Line 2: N space-separated non-negative integers representing elevation heights.',
    outputFormat: 'Single integer representing total trapped water units',
    constraints: [
      '0 <= N <= 2 * 10^5',
      '0 <= height[i] <= 10^5',
      'Time Complexity: O(N)',
      'Auxiliary Space: O(1)',
    ],
    sampleInput: '12\n0 1 0 2 1 0 1 3 2 1 2 1',
    sampleOutput: '6',
    kapilIntuition:
      'Water trapped above any bar at index i equals max(0, min(maxLeft, maxRight) - height[i]). With two pointers `left` and `right`, the side with the smaller height is always the limiting factor, allowing us to safely calculate water and advance inward in O(1) space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int trap(int height[], int n) {
    // Implement Two-Pointer Trapping Rain Water in O(1) auxiliary space
    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int h[n];
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    printf("%d\\n", trap(h, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int trap(const vector<int>& height) {
    // Implement Two-Pointer Trapping Rain Water in O(1) auxiliary space
    return 0;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    cout << trap(h) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static int trap(int[] height) {
        // Implement Two-Pointer Trapping Rain Water in O(1) auxiliary space
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        System.out.println(trap(h));
    }
}`,
      python: `import sys

def trap(height: list[int]) -> int:
    # Implement Two-Pointer Trapping Rain Water in O(1) space
    return 0

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    h = [int(x) for x in tokens[1:n+1]]
    print(trap(h))

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int trap(int height[], int n) {
    if (n <= 2) return 0;
    int left = 0, right = n - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int h[n];
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    printf("%d\\n", trap(h, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int trap(const vector<int>& height) {
    if (height.size() <= 2) return 0;
    int left = 0, right = (int)height.size() - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    cout << trap(h) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static int trap(int[] height) {
        if (height == null || height.length <= 2) return 0;
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        System.out.println(trap(h));
    }
}`,
      python: `import sys

def trap(height: list[int]) -> int:
    if len(height) <= 2:
        return 0
    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    water = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    return water

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    h = [int(x) for x in tokens[1:n+1]]
    print(trap(h))

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd10-prob-5-tc1',
        input: '12\n0 1 0 2 1 0 1 3 2 1 2 1',
        expectedOutput: '6',
        isHidden: false,
        explanation: 'Standard valley elevation traps 6 units of water.',
      },
      {
        id: 'd10-prob-5-tc2',
        input: '6\n4 2 0 3 2 5',
        expectedOutput: '9',
        isHidden: false,
        explanation: 'Deep basin traps 9 units of water.',
      },
      {
        id: 'd10-prob-5-tc3',
        input: '3\n3 2 1',
        expectedOutput: '0',
        isHidden: true,
        explanation: 'Strictly monotonic descending terrain traps 0 water.',
      },
    ],
  },
  {
    id: 'd10-prob-6',
    day: 10,
    title: 'Technical Interview Classic: LRU Cache Implementation (O(1) Get & Put)',
    difficulty: 'Medium',
    moduleTag: 'Module 11: Technical Interview Prep & OOP Synthesis',
    companies: ['Amazon', 'Microsoft', 'Bloomberg', 'Apple'],
    platforms: ['LeetCode 146', 'InterviewBit'],
    problemStatement:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the LRUCache class:\n- `LRUCache(int capacity)`: Initialize the LRU cache with positive size capacity.\n- `int get(int key)`: Return the value of the key if it exists, otherwise return -1.\n- `void put(int key, int value)`: Update the value of the key if existing. Otherwise, add the key-value pair. If keys exceed capacity, evict the least recently used key.\n\nBoth functions MUST run in O(1) average time complexity.',
    inputFormat: 'Line 1: capacity, Line 2: Q (number of operations). Next Q lines: `GET <key>` or `PUT <key> <val>`',
    outputFormat: 'Print the return value for each `GET` operation on a new line',
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls to get and put',
      'Time Complexity: O(1) per operation',
      'Auxiliary Space: O(capacity)',
    ],
    sampleInput: '2\n6\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3',
    sampleOutput: '1\n-1\n3',
    kapilIntuition:
      'To achieve O(1) for both lookup and eviction, combine a Hash Map (mapping key -> node pointer) with a Doubly Linked List (maintaining order). When a node is read or updated, detach it and move it to the head. On eviction, remove the tail.',
    timeComplexity: 'O(1) per operation',
    spaceComplexity: 'O(capacity)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    // Implement LRU Cache with Doubly Linked List & Hash Table
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_map>
#include <list>
using namespace std;

int main() {
    // Implement LRU Cache
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // Implement LRU Cache
    }
}`,
      python: `import sys

def main():
    # Implement LRU Cache
    pass

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Node {
    int key, val;
    struct Node *prev, *next;
} Node;

Node* head;
Node* tail;
Node* nodeMap[10001];
int cap, sz;

void init(int c) {
    cap = c; sz = 0;
    head = (Node*)malloc(sizeof(Node));
    tail = (Node*)malloc(sizeof(Node));
    head->next = tail; tail->prev = head;
    head->prev = tail->next = NULL;
    memset(nodeMap, 0, sizeof(nodeMap));
}

void addNode(Node* n) {
    n->next = head->next;
    n->prev = head;
    head->next->prev = n;
    head->next = n;
}

void removeNode(Node* n) {
    n->prev->next = n->next;
    n->next->prev = n->prev;
}

int get(int key) {
    if (key < 0 || key > 10000 || !nodeMap[key]) return -1;
    Node* n = nodeMap[key];
    removeNode(n);
    addNode(n);
    return n->val;
}

void put(int key, int value) {
    if (key < 0 || key > 10000) return;
    if (nodeMap[key]) {
        Node* n = nodeMap[key];
        n->val = value;
        removeNode(n);
        addNode(n);
    } else {
        if (sz >= cap) {
            Node* lru = tail->prev;
            nodeMap[lru->key] = NULL;
            removeNode(lru);
            free(lru);
            sz--;
        }
        Node* n = (Node*)malloc(sizeof(Node));
        n->key = key; n->val = value;
        nodeMap[key] = n;
        addNode(n);
        sz++;
    }
}

int main() {
    int c, q;
    if (scanf("%d %d", &c, &q) != 2) return 0;
    init(c);
    char op[16]; int k, v;
    for (int i = 0; i < q; i++) {
        scanf("%s", op);
        if (strcmp(op, "GET") == 0) {
            scanf("%d", &k);
            printf("%d\\n", get(k));
        } else if (strcmp(op, "PUT") == 0) {
            scanf("%d %d", &k, &v);
            put(k, v);
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_map>
#include <list>
#include <string>
using namespace std;

class LRUCache {
    int capacity;
    list<pair<int, int>> l; // (key, value)
    unordered_map<int, list<pair<int, int>>::iterator> m;
public:
    LRUCache(int cap) : capacity(cap) {}

    int get(int key) {
        auto it = m.find(key);
        if (it == m.end()) return -1;
        l.splice(l.begin(), l, it->second);
        return it->second->second;
    }

    void put(int key, int value) {
        auto it = m.find(key);
        if (it != m.end()) {
            l.splice(l.begin(), l, it->second);
            it->second->second = value;
            return;
        }
        if (l.size() == capacity) {
            int dKey = l.back().first;
            l.pop_back();
            m.erase(dKey);
        }
        l.emplace_front(key, value);
        m[key] = l.begin();
    }
};

int main() {
    int c, q;
    if (!(cin >> c >> q)) return 0;
    LRUCache cache(c);
    string op; int k, v;
    while (q--) {
        cin >> op;
        if (op == "GET") {
            cin >> k;
            cout << cache.get(k) << "\\n";
        } else if (op == "PUT") {
            cin >> k >> v;
            cache.put(k, v);
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    static class LRUCache extends LinkedHashMap<Integer, Integer> {
        private final int capacity;
        public LRUCache(int capacity) {
            super(capacity, 0.75f, true);
            this.capacity = capacity;
        }
        public int get(int key) {
            return super.getOrDefault(key, -1);
        }
        public void put(int key, int value) {
            super.put(key, value);
        }
        @Override
        protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
            return size() > capacity;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int c = sc.nextInt();
        int q = sc.nextInt();
        LRUCache cache = new LRUCache(c);
        for (int i = 0; i < q; i++) {
            String op = sc.next();
            if (op.equals("GET")) {
                int k = sc.nextInt();
                System.out.println(cache.get(k));
            } else if (op.equals("PUT")) {
                int k = sc.nextInt();
                int v = sc.nextInt();
                cache.put(k, v);
            }
        }
    }
}`,
      python: `import sys
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    c = int(tokens[0])
    q = int(tokens[1])
    cache = LRUCache(c)
    idx = 2
    for _ in range(q):
        op = tokens[idx]
        if op == "GET":
            k = int(tokens[idx + 1])
            idx += 2
            print(cache.get(k))
        elif op == "PUT":
            k = int(tokens[idx + 1])
            v = int(tokens[idx + 2])
            idx += 3
            cache.put(k, v)

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd10-prob-6-tc1',
        input: '2\n6\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3',
        expectedOutput: '1\n-1\n3',
        isHidden: false,
        explanation: 'Key 2 is evicted when Key 3 is put because Key 1 was refreshed by GET 1.',
      },
      {
        id: 'd10-prob-6-tc2',
        input: '1\n4\nPUT 10 100\nGET 10\nPUT 20 200\nGET 10',
        expectedOutput: '100\n-1',
        isHidden: false,
        explanation: 'Capacity 1 immediately evicts key 10 when key 20 is put.',
      },
    ],
  },
  {
    id: 'd10-prob-7',
    day: 10,
    title: 'Placement Follow-Up: Subarray Sum Equals K (Prefix Sum Hash Map)',
    difficulty: 'Medium',
    moduleTag: 'Module 11: Technical Interview Live Coding',
    companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
    platforms: ['LeetCode 560', 'GeeksforGeeks'],
    problemStatement:
      'Given an array of integers `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals `k`.\n\nIn live placement interviews, interviewers use this problem to test whether candidates instinctively default to two pointers (which FAILS for arrays containing negative numbers) or recognize the Prefix Sum + Hash Map pattern.',
    inputFormat: 'Line 1: N and K. Line 2: N space-separated integers.',
    outputFormat: 'Single integer count of qualifying subarrays',
    constraints: [
      '1 <= N <= 2 * 10^4',
      '-1000 <= nums[i] <= 1000',
      '-10^7 <= k <= 10^7',
      'Time Complexity: O(N)',
      'Auxiliary Space: O(N)',
    ],
    sampleInput: '3 2\n1 1 1',
    sampleOutput: '2',
    kapilIntuition:
      'If cumulative sum up to index j is S_j, then a subarray between i and j sums to k if and only if S_j - S_{i-1} = k, which rearranges to S_{i-1} = S_j - k. Store prefix sum frequencies in a hash map to answer in O(1) time per element.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    starterCode: {
      c: `#include <stdio.h>

int subarraySum(int nums[], int n, int k) {
    // Implement O(N) Prefix Sum + Hash Map Subarray Sum
    return 0;
}

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    printf("%d\\n", subarraySum(nums, n, k));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int subarraySum(const vector<int>& nums, int k) {
    // Implement O(N) Prefix Sum + Hash Map
    return 0;
}

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << subarraySum(nums, k) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int subarraySum(int[] nums, int k) {
        // Implement O(N) Prefix Sum + Hash Map
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println(subarraySum(nums, k));
    }
}`,
      python: `import sys
from collections import defaultdict

def subarray_sum(nums: list[int], k: int) -> int:
    # Implement O(N) Prefix Sum + Hash Map
    return 0

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    k = int(tokens[1])
    nums = [int(x) for x in tokens[2:n+2]]
    print(subarray_sum(nums, k))

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

// Simple hash map for C implementation with negative key offset
#define OFFSET 20000000
#define SIZE 40000001
int freq[SIZE];

int subarraySum(int nums[], int n, int k) {
    int count = 0, currentSum = 0;
    freq[OFFSET] = 1; // Base case: prefix sum 0 occurs once
    for (int i = 0; i < n; i++) {
        currentSum += nums[i];
        int target = currentSum - k;
        if (target + OFFSET >= 0 && target + OFFSET < SIZE) {
            count += freq[target + OFFSET];
        }
        if (currentSum + OFFSET >= 0 && currentSum + OFFSET < SIZE) {
            freq[currentSum + OFFSET]++;
        }
    }
    // Clean up used slots
    currentSum = 0;
    freq[OFFSET] = 0;
    for (int i = 0; i < n; i++) {
        currentSum += nums[i];
        freq[currentSum + OFFSET] = 0;
    }
    return count;
}

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    printf("%d\\n", subarraySum(nums, n, k));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int subarraySum(const vector<int>& nums, int k) {
    unordered_map<int, int> prefixFreq;
    prefixFreq[0] = 1;
    int count = 0, currentSum = 0;
    for (int x : nums) {
        currentSum += x;
        if (prefixFreq.count(currentSum - k)) {
            count += prefixFreq[currentSum - k];
        }
        prefixFreq[currentSum]++;
    }
    return count;
}

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << subarraySum(nums, k) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixFreq = new HashMap<>();
        prefixFreq.put(0, 1);
        int count = 0, currentSum = 0;
        for (int x : nums) {
            currentSum += x;
            count += prefixFreq.getOrDefault(currentSum - k, 0);
            prefixFreq.put(currentSum, prefixFreq.getOrDefault(currentSum, 0) + 1);
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println(subarraySum(nums, k));
    }
}`,
      python: `import sys
from collections import defaultdict

def subarray_sum(nums: list[int], k: int) -> int:
    prefix_freq = defaultdict(int)
    prefix_freq[0] = 1
    count = 0
    current_sum = 0
    for x in nums:
        current_sum += x
        count += prefix_freq[current_sum - k]
        prefix_freq[current_sum] += 1
    return count

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    k = int(tokens[1])
    nums = [int(x) for x in tokens[2:n+2]]
    print(subarray_sum(nums, k))

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd10-prob-7-tc1',
        input: '3 2\n1 1 1',
        expectedOutput: '2',
        isHidden: false,
        explanation: 'Subarrays [1, 1] at indices [0, 1] and [1, 2] sum to 2.',
      },
      {
        id: 'd10-prob-7-tc2',
        input: '3 3\n1 2 3',
        expectedOutput: '2',
        isHidden: false,
        explanation: 'Subarrays [1, 2] and [3] both sum to 3.',
      },
      {
        id: 'd10-prob-7-tc3',
        input: '4 0\n1 -1 1 -1',
        expectedOutput: '4',
        isHidden: true,
        explanation: 'Negative numbers require prefix sum hash map rather than sliding window.',
      },
    ],
  },
  {
    id: 'd10-prob-8',
    day: 10,
    title: 'OS Concurrency: Deadlock Cycle Detection in Resource Allocation Graphs',
    difficulty: 'Medium',
    moduleTag: 'Module 11: OS Concurrency & Multi-Threading',
    companies: ['Oracle', 'Qualcomm', 'VMware', 'Cisco'],
    platforms: ['GeeksforGeeks', 'HackerEarth'],
    problemStatement:
      'In multi-threaded applications, circular hold-and-wait chains cause permanent system freezes (deadlock). Coffman conditions specify that a cycle in a single-unit Resource Allocation Graph (RAG) indicates deadlock.\n\nGiven N threads and M directed wait-for dependencies (Thread U is blocked waiting for a lock held by Thread V), determine if the dependency graph contains a cycle. Print `DEADLOCK_DETECTED` or `NO_DEADLOCK`.',
    inputFormat: 'Line 1: N (number of threads, 0 to N-1) and M (dependencies). Next M lines: `u v` (thread u waits for thread v)',
    outputFormat: '`DEADLOCK_DETECTED` or `NO_DEADLOCK`',
    constraints: [
      '1 <= N <= 10^4',
      '0 <= M <= 5 * 10^4',
      '0 <= u, v < N',
      'Time Complexity: O(N + M)',
      'Auxiliary Space: O(N + M)',
    ],
    sampleInput: '4 4\n0 1\n1 2\n2 3\n3 0',
    sampleOutput: 'DEADLOCK_DETECTED',
    kapilIntuition:
      'Model dependencies as a directed graph. A cycle detected via DFS with a three-color state (0 = unvisited, 1 = visiting/recursion stack, 2 = visited) indicates circular wait: deadlock.',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(N + M)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    // Implement Cycle Detection in Directed Graph
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Implement Cycle Detection in Directed Graph
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // Implement Cycle Detection in Directed Graph
    }
}`,
      python: `import sys

def main():
    # Implement Cycle Detection in Directed Graph
    pass

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdbool.h>

#define MAXN 10005
#define MAXM 50005

int head[MAXN], to[MAXM], nxt[MAXM], edgeCount = 0;
int color[MAXN]; // 0: unvisited, 1: visiting, 2: visited

void addEdge(int u, int v) {
    to[edgeCount] = v;
    nxt[edgeCount] = head[u];
    head[u] = edgeCount++;
}

bool dfs(int u) {
    color[u] = 1;
    for (int e = head[u]; e != -1; e = nxt[e]) {
        int v = to[e];
        if (color[v] == 1) return true; // Cycle detected
        if (color[v] == 0 && dfs(v)) return true;
    }
    color[u] = 2;
    return false;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    for (int i = 0; i < n; i++) {
        head[i] = -1;
        color[i] = 0;
    }
    for (int i = 0; i < m; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        addEdge(u, v);
    }
    bool hasDeadlock = false;
    for (int i = 0; i < n; i++) {
        if (color[i] == 0) {
            if (dfs(i)) {
                hasDeadlock = true;
                break;
            }
        }
    }
    if (hasDeadlock) printf("DEADLOCK_DETECTED\\n");
    else printf("NO_DEADLOCK\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

bool dfs(int u, const vector<vector<int>>& adj, vector<int>& color) {
    color[u] = 1;
    for (int v : adj[u]) {
        if (color[v] == 1) return true;
        if (color[v] == 0 && dfs(v, adj, color)) return true;
    }
    color[u] = 2;
    return false;
}

int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<int>> adj(n);
    for (int i = 0; i < m; ++i) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
    }
    vector<int> color(n, 0);
    bool deadlock = false;
    for (int i = 0; i < n; ++i) {
        if (color[i] == 0 && dfs(i, adj, color)) {
            deadlock = true;
            break;
        }
    }
    if (deadlock) cout << "DEADLOCK_DETECTED\\n";
    else cout << "NO_DEADLOCK\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    private static boolean dfs(int u, List<List<Integer>> adj, int[] color) {
        color[u] = 1;
        for (int v : adj.get(u)) {
            if (color[v] == 1) return true;
            if (color[v] == 0 && dfs(v, adj, color)) return true;
        }
        color[u] = 2;
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int m = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < m; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
        }
        int[] color = new int[n];
        boolean deadlock = false;
        for (int i = 0; i < n; i++) {
            if (color[i] == 0 && dfs(i, adj, color)) {
                deadlock = true;
                break;
            }
        }
        System.out.println(deadlock ? "DEADLOCK_DETECTED" : "NO_DEADLOCK");
    }
}`,
      python: `import sys

# Increase recursion depth for deep dependency chains
sys.setrecursionlimit(200000)

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    m = int(tokens[1])
    adj = [[] for _ in range(n)]
    idx = 2
    for _ in range(m):
        u = int(tokens[idx])
        v = int(tokens[idx + 1])
        adj[u].append(v)
        idx += 2

    color = [0] * n  # 0: unvisited, 1: visiting, 2: visited

    def dfs(u: int) -> bool:
        color[u] = 1
        for v in adj[u]:
            if color[v] == 1:
                return True
            if color[v] == 0 and dfs(v):
                return True
        color[u] = 2
        return False

    deadlock = any(color[i] == 0 and dfs(i) for i in range(n))
    print("DEADLOCK_DETECTED" if deadlock else "NO_DEADLOCK")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd10-prob-8-tc1',
        input: '4 4\n0 1\n1 2\n2 3\n3 0',
        expectedOutput: 'DEADLOCK_DETECTED',
        isHidden: false,
        explanation: 'Circular dependency 0 -> 1 -> 2 -> 3 -> 0 causes deadlock.',
      },
      {
        id: 'd10-prob-8-tc2',
        input: '3 2\n0 1\n1 2',
        expectedOutput: 'NO_DEADLOCK',
        isHidden: false,
        explanation: 'Acyclic DAG allows thread 2 to finish, releasing 1, then 0.',
      },
    ],
  },
  {
    id: 'd10-prob-9',
    day: 10,
    title: 'SQL Query Plan Optimizer & Index Scan Simulator',
    difficulty: 'Medium',
    moduleTag: 'Module 11: DBMS Query Optimization',
    companies: ['Snowflake', 'Oracle', 'Amazon AWS', 'MongoDB'],
    platforms: ['LeetCode 175', 'GeeksforGeeks'],
    problemStatement:
      'Database query planners choose between Full Table Scans (O(N)) and Index Lookups (O(log N)) based on the WHERE clause columns, indexing configuration, and sort orders.\n\nGiven N rows in a table, an indexed column name, and a query type:\n- `INDEX_SEEK <col> <val>`: If `<col>` matches the indexed column, cost is `LOG_N` (ceil(log2(N)) + 1). If not indexed, it triggers a `FULL_TABLE_SCAN` with cost `N`.\n- `RANGE_SCAN <col> <low> <high>`: If indexed, cost is `LOG_N + K` (where K is matching rows). If not indexed, cost is `N`.\n\nCalculate the total computational cost for Q queries.',
    inputFormat: 'Line 1: N and INDEXED_COLUMN. Line 2: Q (number of queries). Next Q lines: query strings',
    outputFormat: 'Print total computed cost across all Q queries',
    constraints: [
      '1 <= N <= 10^7',
      '1 <= Q <= 10^4',
      'Time Complexity: O(Q)',
      'Auxiliary Space: O(1)',
    ],
    sampleInput: '1000 user_id\n2\nINDEX_SEEK user_id 101\nINDEX_SEEK email test@spsu.ac.in',
    sampleOutput: '1011',
    kapilIntuition:
      'In technical interviews, query performance is explained by comparing disk I/O costs between B-Tree branch traversals (O(log N)) and sequential table heap reads (O(N)).',
    timeComplexity: 'O(Q)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    // Implement SQL Query Cost Simulator
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    // Implement SQL Query Cost Simulator
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        // Implement SQL Query Cost Simulator
    }
}`,
      python: `import sys

def main():
    # Implement SQL Query Cost Simulator
    pass

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <math.h>

int getLogCost(long long n) {
    if (n <= 1) return 1;
    return (int)ceil(log2((double)n)) + 1;
}

int main() {
    long long n;
    char indexedCol[64];
    if (scanf("%lld %s", &n, indexedCol) != 2) return 0;
    int q;
    if (scanf("%d", &q) != 1) return 0;
    long long totalCost = 0;
    int logCost = getLogCost(n);

    for (int i = 0; i < q; i++) {
        char op[32], col[64], val[64];
        scanf("%s %s %s", op, col, val);
        if (strcmp(op, "INDEX_SEEK") == 0) {
            if (strcmp(col, indexedCol) == 0) totalCost += logCost;
            else totalCost += n;
        } else if (strcmp(op, "RANGE_SCAN") == 0) {
            char high[64];
            scanf("%s", high);
            if (strcmp(col, indexedCol) == 0) totalCost += (logCost + 5);
            else totalCost += n;
        }
    }
    printf("%lld\\n", totalCost);
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <cmath>
using namespace std;

int getLogCost(long long n) {
    if (n <= 1) return 1;
    return (int)ceil(log2((double)n)) + 1;
}

int main() {
    long long n;
    string indexedCol;
    if (!(cin >> n >> indexedCol)) return 0;
    int q;
    if (!(cin >> q)) return 0;
    long long totalCost = 0;
    int logCost = getLogCost(n);

    while (q--) {
        string op, col, val;
        cin >> op >> col >> val;
        if (op == "INDEX_SEEK") {
            if (col == indexedCol) totalCost += logCost;
            else totalCost += n;
        } else if (op == "RANGE_SCAN") {
            string high;
            cin >> high;
            if (col == indexedCol) totalCost += (logCost + 5);
            else totalCost += n;
        }
    }
    cout << totalCost << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    private static int getLogCost(long n) {
        if (n <= 1) return 1;
        return (int) Math.ceil(Math.log(n) / Math.log(2)) + 1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long n = sc.nextLong();
        String indexedCol = sc.next();
        int q = sc.nextInt();
        long totalCost = 0;
        int logCost = getLogCost(n);

        for (int i = 0; i < q; i++) {
            String op = sc.next();
            String col = sc.next();
            String val = sc.next();
            if (op.equals("INDEX_SEEK")) {
                if (col.equals(indexedCol)) totalCost += logCost;
                else totalCost += n;
            } else if (op.equals("RANGE_SCAN")) {
                String high = sc.next();
                if (col.equals(indexedCol)) totalCost += (logCost + 5);
                else totalCost += n;
            }
        }
        System.out.println(totalCost);
    }
}`,
      python: `import sys
import math

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    indexed_col = tokens[1]
    q = int(tokens[2])
    log_cost = 1 if n <= 1 else math.ceil(math.log2(n)) + 1
    total_cost = 0
    idx = 3
    for _ in range(q):
        op = tokens[idx]
        col = tokens[idx + 1]
        val = tokens[idx + 2]
        idx += 3
        if op == "INDEX_SEEK":
            total_cost += log_cost if col == indexed_col else n
        elif op == "RANGE_SCAN":
            high = tokens[idx]
            idx += 1
            total_cost += (log_cost + 5) if col == indexed_col else n
    print(total_cost)

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd10-prob-9-tc1',
        input: '1000 user_id\n2\nINDEX_SEEK user_id 101\nINDEX_SEEK email test@spsu.ac.in',
        expectedOutput: '1011',
        isHidden: false,
        explanation: 'user_id index seek costs 11 (ceil(log2(1000)) + 1 = 10 + 1 = 11). email full scan costs 1000. Total = 1011.',
      },
      {
        id: 'd10-prob-9-tc2',
        input: '1000000 id\n1\nINDEX_SEEK id 999',
        expectedOutput: '21',
        isHidden: false,
        explanation: 'Indexed seek on 1M rows costs ceil(log2(1M)) + 1 = 20 + 1 = 21.',
      },
    ],
  },
  {
    id: 'd10-prob-10',
    day: 10,
    title: 'Grand Placement Capstone: Median of Two Sorted Arrays (O(log(min(M, N))))',
    difficulty: 'Hard',
    moduleTag: 'Module 11: Placement Live Coding Synthesis',
    companies: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'],
    platforms: ['LeetCode 4', 'GeeksforGeeks'],
    problemStatement:
      'Given two sorted arrays `nums1` and `nums2` of size M and N respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity MUST be O(log(min(M, N))).\n\nThis is widely regarded as one of the ultimate technical interview benchmark problems for Tier-1 product placement. Naive merging achieves O(M + N) time, but top candidates solve it using binary search over partition points.',
    inputFormat: 'Line 1: M and N. Line 2: M sorted integers. Line 3: N sorted integers.',
    outputFormat: 'Print the median formatted to 1 decimal place (e.g. `2.0` or `2.5`)',
    constraints: [
      '0 <= M, N <= 10^5',
      '1 <= M + N <= 2 * 10^5',
      '-10^6 <= nums1[i], nums2[i] <= 10^6',
      'Time Complexity: O(log(min(M, N)))',
      'Auxiliary Space: O(1)',
    ],
    sampleInput: '2 1\n1 3\n2',
    sampleOutput: '2.0',
    kapilIntuition:
      'Partition both arrays such that the left half has (M + N + 1) / 2 elements and all elements in the left half are <= all elements in the right half. Binary search on the cut index of the smaller array.',
    timeComplexity: 'O(log(min(M, N)))',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

double findMedianSortedArrays(int nums1[], int m, int nums2[], int n) {
    // Implement O(log(min(M, N))) Binary Search on Partitions
    return 0.0;
}

int main() {
    int m, n;
    if (scanf("%d %d", &m, &n) != 2) return 0;
    int a[m], b[n];
    for (int i = 0; i < m; i++) scanf("%d", &a[i]);
    for (int i = 0; i < n; i++) scanf("%d", &b[i]);
    printf("%.1f\\n", findMedianSortedArrays(a, m, b, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

double findMedianSortedArrays(const vector<int>& nums1, const vector<int>& nums2) {
    // Implement O(log(min(M, N))) Binary Search on Partitions
    return 0.0;
}

int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<int> a(m), b(n);
    for (int i = 0; i < m; i++) cin >> a[i];
    for (int i = 0; i < n; i++) cin >> b[i];
    cout << fixed << setprecision(1) << findMedianSortedArrays(a, b) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Implement O(log(min(M, N))) Binary Search on Partitions
        return 0.0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        int n = sc.nextInt();
        int[] a = new int[m];
        for (int i = 0; i < m; i++) a[i] = sc.nextInt();
        int[] b = new int[n];
        for (int i = 0; i < n; i++) b[i] = sc.nextInt();
        System.out.printf("%.1f\\n", findMedianSortedArrays(a, b));
    }
}`,
      python: `import sys

def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:
    # Implement O(log(min(M, N))) Binary Search on Partitions
    return 0.0

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    m = int(tokens[0])
    n = int(tokens[1])
    a = [int(x) for x in tokens[2:m+2]]
    b = [int(x) for x in tokens[m+2:m+2+n]]
    print(f"{find_median_sorted_arrays(a, b):.1f}")

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <limits.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

double findMedianSortedArrays(int nums1[], int m, int nums2[], int n) {
    if (m > n) return findMedianSortedArrays(nums2, n, nums1, m);
    int low = 0, high = m;
    while (low <= high) {
        int i = (low + high) / 2;
        int j = (m + n + 1) / 2 - i;
        int maxLeft1 = (i == 0) ? INT_MIN : nums1[i - 1];
        int minRight1 = (i == m) ? INT_MAX : nums1[i];
        int maxLeft2 = (j == 0) ? INT_MIN : nums2[j - 1];
        int minRight2 = (j == n) ? INT_MAX : nums2[j];

        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 == 1) return (double)MAX(maxLeft1, maxLeft2);
            return (MAX(maxLeft1, maxLeft2) + MIN(minRight1, minRight2)) / 2.0;
        } else if (maxLeft1 > minRight2) {
            high = i - 1;
        } else {
            low = i + 1;
        }
    }
    return 0.0;
}

int main() {
    int m, n;
    if (scanf("%d %d", &m, &n) != 2) return 0;
    int a[m], b[n];
    for (int i = 0; i < m; i++) scanf("%d", &a[i]);
    for (int i = 0; i < n; i++) scanf("%d", &b[i]);
    printf("%.1f\\n", findMedianSortedArrays(a, m, b, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <climits>
#include <iomanip>
#include <algorithm>
using namespace std;

double findMedianSortedArrays(const vector<int>& nums1, const vector<int>& nums2) {
    if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
    int m = (int)nums1.size(), n = (int)nums2.size();
    int low = 0, high = m;
    while (low <= high) {
        int i = (low + high) / 2;
        int j = (m + n + 1) / 2 - i;
        int maxLeft1 = (i == 0) ? INT_MIN : nums1[i - 1];
        int minRight1 = (i == m) ? INT_MAX : nums1[i];
        int maxLeft2 = (j == 0) ? INT_MIN : nums2[j - 1];
        int minRight2 = (j == n) ? INT_MAX : nums2[j];

        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 == 1) return (double)max(maxLeft1, maxLeft2);
            return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0;
        } else if (maxLeft1 > minRight2) {
            high = i - 1;
        } else {
            low = i + 1;
        }
    }
    return 0.0;
}

int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<int> a(m), b(n);
    for (int i = 0; i < m; i++) cin >> a[i];
    for (int i = 0; i < n; i++) cin >> b[i];
    cout << fixed << setprecision(1) << findMedianSortedArrays(a, b) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.length, n = nums2.length;
        int low = 0, high = m;
        while (low <= high) {
            int i = (low + high) / 2;
            int j = (m + n + 1) / 2 - i;
            int maxLeft1 = (i == 0) ? Integer.MIN_VALUE : nums1[i - 1];
            int minRight1 = (i == m) ? Integer.MAX_VALUE : nums1[i];
            int maxLeft2 = (j == 0) ? Integer.MIN_VALUE : nums2[j - 1];
            int minRight2 = (j == n) ? Integer.MAX_VALUE : nums2[j];

            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                if ((m + n) % 2 == 1) return Math.max(maxLeft1, maxLeft2);
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0;
            } else if (maxLeft1 > minRight2) {
                high = i - 1;
            } else {
                low = i + 1;
            }
        }
        return 0.0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        int n = sc.nextInt();
        int[] a = new int[m];
        for (int i = 0; i < m; i++) a[i] = sc.nextInt();
        int[] b = new int[n];
        for (int i = 0; i < n; i++) b[i] = sc.nextInt();
        System.out.printf("%.1f\\n", findMedianSortedArrays(a, b));
    }
}`,
      python: `import sys

def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:
    if len(nums1) > len(nums2):
        return find_median_sorted_arrays(nums2, nums1)
    m, n = len(nums1), len(nums2)
    low, high = 0, m
    while low <= high:
        i = (low + high) // 2
        j = (m + n + 1) // 2 - i
        max_left1 = -float('inf') if i == 0 else nums1[i - 1]
        min_right1 = float('inf') if i == m else nums1[i]
        max_left2 = -float('inf') if j == 0 else nums2[j - 1]
        min_right2 = float('inf') if j == n else nums2[j]

        if max_left1 <= min_right2 and max_left2 <= min_right1:
            if (m + n) % 2 == 1:
                return float(max(max_left1, max_left2))
            return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2.0
        elif max_left1 > min_right2:
            high = i - 1
        else:
            low = i + 1
    return 0.0

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    m = int(tokens[0])
    n = int(tokens[1])
    a = [int(x) for x in tokens[2:m+2]]
    b = [int(x) for x in tokens[m+2:m+2+n]]
    print(f"{find_median_sorted_arrays(a, b):.1f}")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd10-prob-10-tc1',
        input: '2 1\n1 3\n2',
        expectedOutput: '2.0',
        isHidden: false,
        explanation: 'Combined sorted array is [1, 2, 3] with median 2.0.',
      },
      {
        id: 'd10-prob-10-tc2',
        input: '2 2\n1 2\n3 4',
        expectedOutput: '2.5',
        isHidden: false,
        explanation: 'Combined sorted array is [1, 2, 3, 4] with median (2 + 3) / 2 = 2.5.',
      },
      {
        id: 'd10-prob-10-tc3',
        input: '0 2\n\n10 20',
        expectedOutput: '15.0',
        isHidden: true,
        explanation: 'One array is empty, median is (10 + 20) / 2 = 15.0.',
      },
    ],
  },
];
