import { PracticalChallenge } from '../types';

/**
 * SPSU Udaipur Placement Readiness Program
 * Mentor: Kapil | Day 9: Full-Stack Development & Project Architecture Readiness
 * 10 Production-Grade Coding Challenges (C, C++, Java, Python)
 */
export const DAY_9_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  // 1. HTTP Bearer Token Extractor
  {
    id: 'd9-prob-1',
    day: 9,
    title: 'HTTP Authorization Bearer Token Extractor',
    difficulty: 'Easy',
    moduleTag: 'Module 9: Development & Project Readiness',
    problemStatement:
      'In REST API authentication middleware, requests pass security credentials via the `Authorization` header. Given a string representing the header value, if it begins with `"Bearer "` (case-sensitive) followed by a non-empty token, print the extracted token. Otherwise, print `UNAUTHORIZED`.',
    inputFormat: 'A single line of text representing the header value',
    outputFormat: 'The extracted token string, or UNAUTHORIZED',
    constraints: ['Length <= 256 characters'],
    sampleInput: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    sampleOutput: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    kapilIntuition:
      'Check if the string starts exactly with "Bearer " (7 characters) and has length > 7. If so, slice and print from index 7; otherwise reject with UNAUTHORIZED.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char header[512];
    if (fgets(header, sizeof(header), stdin)) {
        // TODO: Extract Bearer token or print UNAUTHORIZED
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string header;
    if (getline(cin, header)) {
        // TODO: Extract Bearer token or print UNAUTHORIZED
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String header = sc.nextLine();
            // TODO: Extract Bearer token or print UNAUTHORIZED
        }
    }
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    if line:
        # TODO: Extract Bearer token or print UNAUTHORIZED
        pass

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char header[512];
    if (fgets(header, sizeof(header), stdin)) {
        header[strcspn(header, "\\r\\n")] = 0;
        if (strncmp(header, "Bearer ", 7) == 0 && strlen(header) > 7) {
            printf("%s\\n", header + 7);
        } else {
            printf("UNAUTHORIZED\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string header;
    if (getline(cin, header)) {
        if (header.rfind("Bearer ", 0) == 0 && header.length() > 7) {
            cout << header.substr(7) << endl;
        } else {
            cout << "UNAUTHORIZED" << endl;
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String header = sc.nextLine().trim();
            if (header.startsWith("Bearer ") && header.length() > 7) {
                System.out.println(header.substring(7));
            } else {
                System.out.println("UNAUTHORIZED");
            }
        }
    }
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    if line.startswith("Bearer ") and len(line) > 7:
        print(line[7:])
    else:
        print("UNAUTHORIZED")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        expectedOutput: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        isHidden: false,
        explanation: 'Valid Bearer prefix followed by token.',
      },
      {
        id: 'tc2',
        input: 'Basic user:password',
        expectedOutput: 'UNAUTHORIZED',
        isHidden: false,
        explanation: 'Basic auth is not accepted when Bearer is required.',
      },
      {
        id: 'tc3',
        input: 'Bearer ',
        expectedOutput: 'UNAUTHORIZED',
        isHidden: true,
        explanation: 'Empty token after Bearer keyword.',
      },
    ],
  },

  // 2. SQL Injection Pattern Detector
  {
    id: 'd9-prob-2',
    day: 9,
    title: 'SQL Injection (SQLi) Vulnerability Detector',
    difficulty: 'Easy',
    moduleTag: 'Module 9: Development & Project Readiness',
    problemStatement:
      'Web Application Firewalls (WAF) inspect incoming parameters for dangerous SQL syntax. Given an input query parameter string, check if it contains any of the following malicious SQL injection signatures (case-insensitive): `\' OR \'`, `DROP TABLE`, `UNION SELECT`, `--`. If any are found, print `INJECTION_DETECTED`. Otherwise, print `SAFE_QUERY`.',
    inputFormat: 'A single line of text',
    outputFormat: 'INJECTION_DETECTED or SAFE_QUERY',
    constraints: ['Length <= 256 characters'],
    sampleInput: "admin' OR '1'='1",
    sampleOutput: 'INJECTION_DETECTED',
    kapilIntuition:
      'Convert the input to uppercase or check substrings for the known attack vectors. If any pattern matches, flag as INJECTION_DETECTED.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char input[512];
    if (fgets(input, sizeof(input), stdin)) {
        // TODO: Detect SQL injection signatures
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string input;
    if (getline(cin, input)) {
        // TODO: Detect SQL injection signatures
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String input = sc.nextLine();
            // TODO: Detect SQL injection signatures
        }
    }
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    if line:
        # TODO: Detect SQL injection signatures
        pass

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

void toUpperStr(char* str) {
    for (int i = 0; str[i]; i++) {
        str[i] = toupper((unsigned char)str[i]);
    }
}

int main() {
    char input[512];
    if (fgets(input, sizeof(input), stdin)) {
        input[strcspn(input, "\\r\\n")] = 0;
        char upper[512];
        strcpy(upper, input);
        toUpperStr(upper);

        if (strstr(upper, "' OR '") != NULL ||
            strstr(upper, "DROP TABLE") != NULL ||
            strstr(upper, "UNION SELECT") != NULL ||
            strstr(upper, "--") != NULL) {
            printf("INJECTION_DETECTED\\n");
        } else {
            printf("SAFE_QUERY\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string input;
    if (getline(cin, input)) {
        string upper = input;
        transform(upper.begin(), upper.end(), upper.begin(), ::toupper);

        if (upper.find("' OR '") != string::npos ||
            upper.find("DROP TABLE") != string::npos ||
            upper.find("UNION SELECT") != string::npos ||
            upper.find("--") != string::npos) {
            cout << "INJECTION_DETECTED" << endl;
        } else {
            cout << "SAFE_QUERY" << endl;
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String upper = sc.nextLine().toUpperCase();
            if (upper.contains("' OR '") ||
                upper.contains("DROP TABLE") ||
                upper.contains("UNION SELECT") ||
                upper.contains("--")) {
                System.out.println("INJECTION_DETECTED");
            } else {
                System.out.println("SAFE_QUERY");
            }
        }
    }
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    upper = line.upper()
    if ("' OR '" in upper or
        "DROP TABLE" in upper or
        "UNION SELECT" in upper or
        "--" in upper):
        print("INJECTION_DETECTED")
    else:
        print("SAFE_QUERY")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: "admin' OR '1'='1",
        expectedOutput: 'INJECTION_DETECTED',
        isHidden: false,
        explanation: 'Contains classic tautology bypass signature.',
      },
      {
        id: 'tc2',
        input: 'kapil_narula',
        expectedOutput: 'SAFE_QUERY',
        isHidden: false,
        explanation: 'Clean alphanumeric username string.',
      },
      {
        id: 'tc3',
        input: '1; drop table users; --',
        expectedOutput: 'INJECTION_DETECTED',
        isHidden: true,
        explanation: 'Contains DROP TABLE and SQL comment marker.',
      },
    ],
  },

  // 3. OWASP Password Strength Validator
  {
    id: 'd9-prob-3',
    day: 9,
    title: 'OWASP Password Strength & Complexity Validator',
    difficulty: 'Easy',
    moduleTag: 'Module 9: Development & Project Readiness',
    problemStatement:
      'According to OWASP security guidelines, user passwords must satisfy 5 criteria: 1) Minimum length of 8 characters, 2) At least one uppercase letter (A-Z), 3) At least one lowercase letter (a-z), 4) At least one digit (0-9), and 5) At least one special symbol from `!@#$%^&*`. Print `STRONG` if all 5 rules pass, or `WEAK` otherwise.',
    inputFormat: 'A single string representing the password',
    outputFormat: 'STRONG or WEAK',
    constraints: ['Length <= 100 characters, no whitespace'],
    sampleInput: 'Kapil@2026',
    sampleOutput: 'STRONG',
    kapilIntuition:
      'Traverse the string while maintaining boolean flags for uppercase, lowercase, digit, and special char. Check length >= 8 and that all 4 flags are true.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

const char* validatePassword(const char* pwd) {
    // TODO: Verify 5 OWASP password rules
    return "WEAK";
}

int main() {
    char pwd[128];
    if (scanf("%s", pwd) == 1) {
        printf("%s\\n", validatePassword(pwd));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

string validatePassword(const string& pwd) {
    // TODO: Verify 5 OWASP password rules
    return "WEAK";
}

int main() {
    string pwd;
    if (cin >> pwd) {
        cout << validatePassword(pwd) << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static String validatePassword(String pwd) {
        // TODO: Verify 5 OWASP password rules
        return "WEAK";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            System.out.println(validatePassword(sc.next()));
        }
    }
}`,
      python: `import sys

def validate_password(pwd: str) -> str:
    # TODO: Verify 5 OWASP password rules
    return "WEAK"

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        print(validate_password(line))`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

const char* validatePassword(const char* pwd) {
    size_t len = strlen(pwd);
    if (len < 8) return "WEAK";

    bool hasUpper = false, hasLower = false, hasDigit = false, hasSpecial = false;
    const char* specials = "!@#$%^&*";

    for (size_t i = 0; i < len; i++) {
        char c = pwd[i];
        if (isupper((unsigned char)c)) hasUpper = true;
        else if (islower((unsigned char)c)) hasLower = true;
        else if (isdigit((unsigned char)c)) hasDigit = true;
        else if (strchr(specials, c) != NULL) hasSpecial = true;
    }

    if (hasUpper && hasLower && hasDigit && hasSpecial) return "STRONG";
    return "WEAK";
}

int main() {
    char pwd[128];
    if (scanf("%s", pwd) == 1) {
        printf("%s\\n", validatePassword(pwd));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

string validatePassword(const string& pwd) {
    if (pwd.length() < 8) return "WEAK";
    bool upper = false, lower = false, digit = false, special = false;
    string specials = "!@#$%^&*";

    for (char c : pwd) {
        if (isupper(c)) upper = true;
        else if (islower(c)) lower = true;
        else if (isdigit(c)) digit = true;
        else if (specials.find(c) != string::npos) special = true;
    }
    return (upper && lower && digit && special) ? "STRONG" : "WEAK";
}

int main() {
    string pwd;
    if (cin >> pwd) {
        cout << validatePassword(pwd) << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static String validatePassword(String pwd) {
        if (pwd.length() < 8) return "WEAK";
        boolean upper = false, lower = false, digit = false, special = false;
        String specials = "!@#$%^&*";

        for (int i = 0; i < pwd.length(); i++) {
            char c = pwd.charAt(i);
            if (Character.isUpperCase(c)) upper = true;
            else if (Character.isLowerCase(c)) lower = true;
            else if (Character.isDigit(c)) digit = true;
            else if (specials.indexOf(c) != -1) special = true;
        }
        return (upper && lower && digit && special) ? "STRONG" : "WEAK";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            System.out.println(validatePassword(sc.next()));
        }
    }
}`,
      python: `import sys

def validate_password(pwd: str) -> str:
    if len(pwd) < 8:
        return "WEAK"
    specials = set("!@#$%^&*")
    upper = any(c.isupper() for c in pwd)
    lower = any(c.islower() for c in pwd)
    digit = any(c.isdigit() for c in pwd)
    special = any(c in specials for c in pwd)
    return "STRONG" if (upper and lower and digit and special) else "WEAK"

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        print(validate_password(line))`,
    },
    testCases: [
      {
        id: 'tc1',
        input: 'Kapil@2026',
        expectedOutput: 'STRONG',
        isHidden: false,
        explanation: 'Meets all 5 OWASP rules.',
      },
      {
        id: 'tc2',
        input: 'password',
        expectedOutput: 'WEAK',
        isHidden: false,
        explanation: 'Missing uppercase, digit, and special character.',
      },
      {
        id: 'tc3',
        input: 'Abc1!',
        expectedOutput: 'WEAK',
        isHidden: true,
        explanation: 'Length < 8 characters.',
      },
    ],
  },

  // 4. DTO Input Field Validator
  {
    id: 'd9-prob-4',
    day: 9,
    title: 'Data Transfer Object (DTO) Input Schema Validator',
    difficulty: 'Medium',
    moduleTag: 'Module 9: Development & Project Readiness',
    problemStatement:
      'In Spring Boot (`@Valid`) and FastAPI (`BaseModel`), controller inputs are bound to DTOs and validated before hitting service logic. Given `username email age`, validate: 1) Username length is between 3 and 20 alphanumeric characters, 2) Email contains both `@` and `.` with `@` occurring before `.`, and 3) Age is an integer between 18 and 100 inclusive. Print `VALID_DTO` if all pass, or `VALIDATION_FAILED` otherwise.',
    inputFormat: 'Three space-separated values: username email age',
    outputFormat: 'VALID_DTO or VALIDATION_FAILED',
    constraints: ['Username contains only [a-zA-Z0-9_]'],
    sampleInput: 'kapil_n kapil@spsu.ac.in 28',
    sampleOutput: 'VALID_DTO',
    kapilIntuition:
      'Check string lengths, ensure email contains @ and . in order, and verify 18 <= age <= 100.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    char user[64], email[128];
    int age;
    if (scanf("%s %s %d", user, email, &age) == 3) {
        // TODO: Validate DTO rules
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string user, email;
    int age;
    if (cin >> user >> email >> age) {
        // TODO: Validate DTO rules
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String user = sc.next();
            String email = sc.next();
            int age = sc.nextInt();
            // TODO: Validate DTO rules
        }
    }
}`,
      python: `import sys

def main():
    parts = sys.stdin.read().split()
    if len(parts) >= 3:
        user, email, age = parts[0], parts[1], int(parts[2])
        # TODO: Validate DTO rules

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char user[64], email[128];
    int age;
    if (scanf("%s %s %d", user, email, &age) == 3) {
        size_t uLen = strlen(user);
        if (uLen < 3 || uLen > 20) {
            printf("VALIDATION_FAILED\\n");
            return 0;
        }
        char* at = strchr(email, '@');
        char* dot = strrchr(email, '.');
        if (!at || !dot || at > dot || at == email || *(dot + 1) == '\\0') {
            printf("VALIDATION_FAILED\\n");
            return 0;
        }
        if (age < 18 || age > 100) {
            printf("VALIDATION_FAILED\\n");
            return 0;
        }
        printf("VALID_DTO\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string user, email;
    int age;
    if (cin >> user >> email >> age) {
        if (user.length() < 3 || user.length() > 20) {
            cout << "VALIDATION_FAILED" << endl;
            return 0;
        }
        size_t at = email.find('@');
        size_t dot = email.rfind('.');
        if (at == string::npos || dot == string::npos || at > dot || at == 0 || dot == email.length() - 1) {
            cout << "VALIDATION_FAILED" << endl;
            return 0;
        }
        if (age < 18 || age > 100) {
            cout << "VALIDATION_FAILED" << endl;
            return 0;
        }
        cout << "VALID_DTO" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String user = sc.next();
            String email = sc.next();
            int age = sc.nextInt();

            if (user.length() < 3 || user.length() > 20) {
                System.out.println("VALIDATION_FAILED");
                return;
            }
            int at = email.indexOf('@');
            int dot = email.lastIndexOf('.');
            if (at == -1 || dot == -1 || at > dot || at == 0 || dot == email.length() - 1) {
                System.out.println("VALIDATION_FAILED");
                return;
            }
            if (age < 18 || age > 100) {
                System.out.println("VALIDATION_FAILED");
                return;
            }
            System.out.println("VALID_DTO");
        }
    }
}`,
      python: `import sys

def main():
    parts = sys.stdin.read().split()
    if len(parts) >= 3:
        user = parts[0]
        email = parts[1]
        age = int(parts[2])

        if len(user) < 3 or len(user) > 20:
            print("VALIDATION_FAILED")
            return
        at = email.find('@')
        dot = email.rfind('.')
        if at == -1 or dot == -1 or at > dot or at == 0 or dot == len(email) - 1:
            print("VALIDATION_FAILED")
            return
        if age < 18 or age > 100:
            print("VALIDATION_FAILED")
            return
        print("VALID_DTO")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: 'kapil_n kapil@spsu.ac.in 28',
        expectedOutput: 'VALID_DTO',
        isHidden: false,
        explanation: 'All validation criteria satisfied.',
      },
      {
        id: 'tc2',
        input: 'ab invalidEmail 25',
        expectedOutput: 'VALIDATION_FAILED',
        isHidden: false,
        explanation: 'Username length < 3 and email missing @.',
      },
      {
        id: 'tc3',
        input: 'goodUser user@test.com 16',
        expectedOutput: 'VALIDATION_FAILED',
        isHidden: true,
        explanation: 'Age < 18.',
      },
    ],
  },

  // 5. Database Connection Pool Simulator
  {
    id: 'd9-prob-5',
    day: 9,
    title: 'Database Connection Pool Acquisition & Starvation Simulator',
    difficulty: 'Medium',
    moduleTag: 'Module 9: Development & Project Readiness',
    problemStatement:
      'Database connection pools (e.g. HikariCP) maintain a fixed pool capacity `C`. Given capacity `C` and `M` sequential operations: `CHECKOUT` or `RELEASE`. If a `CHECKOUT` occurs when all `C` connections are busy, print `POOL_EXHAUSTED` and reject. Otherwise, update the active count and print `ACTIVE: A / C`. On `RELEASE`, decrement active count (minimum 0) and print `ACTIVE: A / C`.',
    inputFormat: 'Line 1: C M. Next M lines: `CHECKOUT` or `RELEASE`',
    outputFormat: 'Status message for each operation',
    constraints: ['1 <= C <= 100', '1 <= M <= 1000'],
    sampleInput: "2 4\nCHECKOUT\nCHECKOUT\nCHECKOUT\nRELEASE",
    sampleOutput: "ACTIVE: 1 / 2\nACTIVE: 2 / 2\nPOOL_EXHAUSTED\nACTIVE: 1 / 2",
    kapilIntuition:
      'Maintain an integer counter `active`. On CHECKOUT: if active == C print POOL_EXHAUSTED, else active++ and print. On RELEASE: if active > 0 active--, print.',
    timeComplexity: 'O(M)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int c, m;
    if (scanf("%d %d", &c, &m) == 2) {
        // TODO: Simulate connection pool
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int c, m;
    if (cin >> c >> m) {
        // TODO: Simulate connection pool
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int c = sc.nextInt();
            int m = sc.nextInt();
            // TODO: Simulate connection pool
        }
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    c = int(tokens[0])
    m = int(tokens[1])
    # TODO: Simulate connection pool

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int c, m;
    if (scanf("%d %d", &c, &m) == 2) {
        int active = 0;
        for (int i = 0; i < m; i++) {
            char op[16];
            scanf("%s", op);
            if (strcmp(op, "CHECKOUT") == 0) {
                if (active >= c) {
                    printf("POOL_EXHAUSTED\\n");
                } else {
                    active++;
                    printf("ACTIVE: %d / %d\\n", active, c);
                }
            } else if (strcmp(op, "RELEASE") == 0) {
                if (active > 0) active--;
                printf("ACTIVE: %d / %d\\n", active, c);
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int c, m;
    if (cin >> c >> m) {
        int active = 0;
        for (int i = 0; i < m; i++) {
            string op;
            cin >> op;
            if (op == "CHECKOUT") {
                if (active >= c) {
                    cout << "POOL_EXHAUSTED" << endl;
                } else {
                    active++;
                    cout << "ACTIVE: " << active << " / " << c << endl;
                }
            } else if (op == "RELEASE") {
                if (active > 0) active--;
                cout << "ACTIVE: " << active << " / " << c << endl;
            }
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int c = sc.nextInt();
            int m = sc.nextInt();
            int active = 0;
            for (int i = 0; i < m; i++) {
                String op = sc.next();
                if ("CHECKOUT".equals(op)) {
                    if (active >= c) {
                        System.out.println("POOL_EXHAUSTED");
                    } else {
                        active++;
                        System.out.printf("ACTIVE: %d / %d%n", active, c);
                    }
                } else if ("RELEASE".equals(op)) {
                    if (active > 0) active--;
                    System.out.printf("ACTIVE: %d / %d%n", active, c);
                }
            }
        }
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    c = int(tokens[0])
    m = int(tokens[1])
    active = 0
    idx = 2
    for _ in range(m):
        op = tokens[idx]
        idx += 1
        if op == "CHECKOUT":
            if active >= c:
                print("POOL_EXHAUSTED")
            else:
                active += 1
                print(f"ACTIVE: {active} / {c}")
        elif op == "RELEASE":
            if active > 0:
                active -= 1
            print(f"ACTIVE: {active} / {c}")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: "2 4\nCHECKOUT\nCHECKOUT\nCHECKOUT\nRELEASE",
        expectedOutput: "ACTIVE: 1 / 2\nACTIVE: 2 / 2\nPOOL_EXHAUSTED\nACTIVE: 1 / 2",
        isHidden: false,
        explanation: 'Third checkout fails because pool capacity 2 is reached.',
      },
    ],
  },

  // 6. REST API Pagination Calculator
  {
    id: 'd9-prob-6',
    day: 9,
    title: 'REST API Pagination & SQL Offset-Limit Calculator',
    difficulty: 'Medium',
    moduleTag: 'Module 9: Development & Project Readiness',
    problemStatement:
      'Given `page` (1-based index), `pageSize`, and `totalItems`, calculate the SQL query parameters and pagination metadata. Output: `OFFSET: <offset> | LIMIT: <limit> | TOTAL_PAGES: <pages> | HAS_PREV: <true/false> | HAS_NEXT: <true/false>`.',
    inputFormat: 'Three space-separated integers: page pageSize totalItems',
    outputFormat: 'Formatted pagination metadata string',
    constraints: ['page >= 1', 'pageSize >= 1', 'totalItems >= 0'],
    sampleInput: '2 10 25',
    sampleOutput: 'OFFSET: 10 | LIMIT: 10 | TOTAL_PAGES: 3 | HAS_PREV: true | HAS_NEXT: true',
    kapilIntuition:
      'offset = (page - 1) * pageSize. totalPages = ceil(totalItems / pageSize) (or 0 if totalItems == 0). hasPrev = page > 1. hasNext = page < totalPages.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int page, pageSize, totalItems;
    if (scanf("%d %d %d", &page, &pageSize, &totalItems) == 3) {
        // TODO: Compute pagination metadata
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int page, pageSize, totalItems;
    if (cin >> page >> pageSize >> totalItems) {
        // TODO: Compute pagination metadata
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int page = sc.nextInt();
            int pageSize = sc.nextInt();
            int totalItems = sc.nextInt();
            // TODO: Compute pagination metadata
        }
    }
}`,
      python: `import sys

def main():
    parts = [int(x) for x in sys.stdin.read().split()]
    if len(parts) >= 3:
        page, page_size, total_items = parts[0], parts[1], parts[2]
        # TODO: Compute pagination metadata

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <math.h>

int main() {
    int page, pageSize, totalItems;
    if (scanf("%d %d %d", &page, &pageSize, &totalItems) == 3) {
        int offset = (page - 1) * pageSize;
        int limit = pageSize;
        int totalPages = (totalItems == 0) ? 0 : (totalItems + pageSize - 1) / pageSize;
        const char* hasPrev = (page > 1) ? "true" : "false";
        const char* hasNext = (page < totalPages) ? "true" : "false";

        printf("OFFSET: %d | LIMIT: %d | TOTAL_PAGES: %d | HAS_PREV: %s | HAS_NEXT: %s\\n",
               offset, limit, totalPages, hasPrev, hasNext);
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int page, pageSize, totalItems;
    if (cin >> page >> pageSize >> totalItems) {
        int offset = (page - 1) * pageSize;
        int limit = pageSize;
        int totalPages = (totalItems == 0) ? 0 : (totalItems + pageSize - 1) / pageSize;
        string hasPrev = (page > 1) ? "true" : "false";
        string hasNext = (page < totalPages) ? "true" : "false";

        cout << "OFFSET: " << offset << " | LIMIT: " << limit
             << " | TOTAL_PAGES: " << totalPages
             << " | HAS_PREV: " << hasPrev
             << " | HAS_NEXT: " << hasNext << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int page = sc.nextInt();
            int pageSize = sc.nextInt();
            int totalItems = sc.nextInt();

            int offset = (page - 1) * pageSize;
            int limit = pageSize;
            int totalPages = (totalItems == 0) ? 0 : (int) Math.ceil((double) totalItems / pageSize);
            boolean hasPrev = page > 1;
            boolean hasNext = page < totalPages;

            System.out.printf("OFFSET: %d | LIMIT: %d | TOTAL_PAGES: %d | HAS_PREV: %b | HAS_NEXT: %b%n",
                offset, limit, totalPages, hasPrev, hasNext);
        }
    }
}`,
      python: `import sys
import math

def main():
    parts = [int(x) for x in sys.stdin.read().split()]
    if len(parts) >= 3:
        page, page_size, total_items = parts[0], parts[1], parts[2]
        offset = (page - 1) * page_size
        limit = page_size
        total_pages = 0 if total_items == 0 else math.ceil(total_items / page_size)
        has_prev = "true" if page > 1 else "false"
        has_next = "true" if page < total_pages else "false"

        print(f"OFFSET: {offset} | LIMIT: {limit} | TOTAL_PAGES: {total_pages} | HAS_PREV: {has_prev} | HAS_NEXT: {has_next}")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '2 10 25',
        expectedOutput: 'OFFSET: 10 | LIMIT: 10 | TOTAL_PAGES: 3 | HAS_PREV: true | HAS_NEXT: true',
        isHidden: false,
        explanation: 'Page 2 of 3: offset is 10, both prev and next exist.',
      },
      {
        id: 'tc2',
        input: '1 10 5',
        expectedOutput: 'OFFSET: 0 | LIMIT: 10 | TOTAL_PAGES: 1 | HAS_PREV: false | HAS_NEXT: false',
        isHidden: false,
        explanation: 'Single page total: neither prev nor next exists.',
      },
    ],
  },

  // 7. CORS Preflight Validator
  {
    id: 'd9-prob-7',
    day: 9,
    title: 'Cross-Origin Resource Sharing (CORS) Preflight Validator',
    difficulty: 'Medium',
    moduleTag: 'Module 9: Development & Project Readiness',
    problemStatement:
      'Given an allowed origin `https://spsu.ac.in` and allowed methods `GET,POST,PUT`, write a security validator. Given two inputs: `requestOrigin` and `httpMethod`, print `CORS_ALLOWED` if origin equals allowed origin (or wildcard "*") AND the method is in the allowed set. Otherwise print `CORS_BLOCKED`.',
    inputFormat: 'Two space-separated strings: requestOrigin httpMethod',
    outputFormat: 'CORS_ALLOWED or CORS_BLOCKED',
    constraints: ['Origin and method strings are standard HTTP format'],
    sampleInput: 'https://spsu.ac.in POST',
    sampleOutput: 'CORS_ALLOWED',
    kapilIntuition:
      'Check if requestOrigin is "https://spsu.ac.in" and httpMethod is one of GET, POST, PUT.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    char origin[128], method[16];
    if (scanf("%s %s", origin, method) == 2) {
        // TODO: Validate CORS preflight
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string origin, method;
    if (cin >> origin >> method) {
        // TODO: Validate CORS preflight
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String origin = sc.next();
            String method = sc.next();
            // TODO: Validate CORS preflight
        }
    }
}`,
      python: `import sys

def main():
    parts = sys.stdin.read().split()
    if len(parts) >= 2:
        origin, method = parts[0], parts[1]
        # TODO: Validate CORS preflight

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char origin[128], method[16];
    if (scanf("%s %s", origin, method) == 2) {
        int originOk = (strcmp(origin, "https://spsu.ac.in") == 0);
        int methodOk = (strcmp(method, "GET") == 0 || strcmp(method, "POST") == 0 || strcmp(method, "PUT") == 0);

        if (originOk && methodOk) {
            printf("CORS_ALLOWED\\n");
        } else {
            printf("CORS_BLOCKED\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string origin, method;
    if (cin >> origin >> method) {
        bool originOk = (origin == "https://spsu.ac.in");
        bool methodOk = (method == "GET" || method == "POST" || method == "PUT");

        if (originOk && methodOk) {
            cout << "CORS_ALLOWED" << endl;
        } else {
            cout << "CORS_BLOCKED" << endl;
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;
import java.util.Set;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String origin = sc.next();
            String method = sc.next();
            boolean originOk = "https://spsu.ac.in".equals(origin);
            boolean methodOk = Set.of("GET", "POST", "PUT").contains(method);

            if (originOk && methodOk) {
                System.out.println("CORS_ALLOWED");
            } else {
                System.out.println("CORS_BLOCKED");
            }
        }
    }
}`,
      python: `import sys

def main():
    parts = sys.stdin.read().split()
    if len(parts) >= 2:
        origin = parts[0]
        method = parts[1]
        origin_ok = (origin == "https://spsu.ac.in")
        method_ok = method in {"GET", "POST", "PUT"}
        if origin_ok and method_ok:
            print("CORS_ALLOWED")
        else:
            print("CORS_BLOCKED")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: 'https://spsu.ac.in POST',
        expectedOutput: 'CORS_ALLOWED',
        isHidden: false,
        explanation: 'Trusted origin and allowed method.',
      },
      {
        id: 'tc2',
        input: 'https://evil.com POST',
        expectedOutput: 'CORS_BLOCKED',
        isHidden: false,
        explanation: 'Untrusted origin blocked by CORS policy.',
      },
      {
        id: 'tc3',
        input: 'https://spsu.ac.in DELETE',
        expectedOutput: 'CORS_BLOCKED',
        isHidden: true,
        explanation: 'DELETE is not in the allowed methods list.',
      },
    ],
  },

  // 8. Full-Stack Middleware Pipeline (Chain of Responsibility)
  {
    id: 'd9-prob-8',
    day: 9,
    title: 'Full-Stack Middleware Pipeline (Chain of Responsibility)',
    difficulty: 'Hard',
    moduleTag: 'Module 9: Development & Project Readiness',
    problemStatement:
      'Implement an HTTP request filter pipeline. Given `hasAuth` (1 or 0) and `requestCountInWindow` (integer): Filter 1 checks authentication (`hasAuth == 1`, else aborts with `HTTP 401: Unauthorized`). Filter 2 checks rate limit (`requestCountInWindow <= 100`, else aborts with `HTTP 429: Too Many Requests`). If both pass, the request hits the handler and prints `HTTP 200: Success`. Print the pipeline trace.',
    inputFormat: 'Two space-separated integers: hasAuth requestCountInWindow',
    outputFormat: 'Pipeline trace and final HTTP response',
    constraints: ['hasAuth is 0 or 1', 'requestCountInWindow >= 0'],
    sampleInput: '1 45',
    sampleOutput: "AUTH_FILTER: PASS\nRATE_FILTER: PASS\nHTTP 200: Success",
    kapilIntuition:
      'Evaluate each filter sequentially. If any filter fails, short-circuit and do not invoke subsequent filters.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int auth, reqCount;
    if (scanf("%d %d", &auth, &reqCount) == 2) {
        // TODO: Execute middleware pipeline
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int auth, reqCount;
    if (cin >> auth >> reqCount) {
        // TODO: Execute middleware pipeline
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int auth = sc.nextInt();
            int reqCount = sc.nextInt();
            // TODO: Execute middleware pipeline
        }
    }
}`,
      python: `import sys

def main():
    parts = [int(x) for x in sys.stdin.read().split()]
    if len(parts) >= 2:
        auth, req_count = parts[0], parts[1]
        # TODO: Execute middleware pipeline

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int auth, reqCount;
    if (scanf("%d %d", &auth, &reqCount) == 2) {
        if (!auth) {
            printf("AUTH_FILTER: FAIL\\nHTTP 401: Unauthorized\\n");
            return 0;
        }
        printf("AUTH_FILTER: PASS\\n");

        if (reqCount > 100) {
            printf("RATE_FILTER: FAIL\\nHTTP 429: Too Many Requests\\n");
            return 0;
        }
        printf("RATE_FILTER: PASS\\nHTTP 200: Success\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int auth, reqCount;
    if (cin >> auth >> reqCount) {
        if (!auth) {
            cout << "AUTH_FILTER: FAIL\\nHTTP 401: Unauthorized" << endl;
            return 0;
        }
        cout << "AUTH_FILTER: PASS" << endl;

        if (reqCount > 100) {
            cout << "RATE_FILTER: FAIL\\nHTTP 429: Too Many Requests" << endl;
            return 0;
        }
        cout << "RATE_FILTER: PASS\\nHTTP 200: Success" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int auth = sc.nextInt();
            int reqCount = sc.nextInt();

            if (auth == 0) {
                System.out.println("AUTH_FILTER: FAIL");
                System.out.println("HTTP 401: Unauthorized");
                return;
            }
            System.out.println("AUTH_FILTER: PASS");

            if (reqCount > 100) {
                System.out.println("RATE_FILTER: FAIL");
                System.out.println("HTTP 429: Too Many Requests");
                return;
            }
            System.out.println("RATE_FILTER: PASS");
            System.out.println("HTTP 200: Success");
        }
    }
}`,
      python: `import sys

def main():
    parts = [int(x) for x in sys.stdin.read().split()]
    if len(parts) >= 2:
        auth, req_count = parts[0], parts[1]
        if not auth:
            print("AUTH_FILTER: FAIL")
            print("HTTP 401: Unauthorized")
            return
        print("AUTH_FILTER: PASS")

        if req_count > 100:
            print("RATE_FILTER: FAIL")
            print("HTTP 429: Too Many Requests")
            return
        print("RATE_FILTER: PASS")
        print("HTTP 200: Success")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '1 45',
        expectedOutput: "AUTH_FILTER: PASS\nRATE_FILTER: PASS\nHTTP 200: Success",
        isHidden: false,
        explanation: 'Both auth and rate limit checks pass.',
      },
      {
        id: 'tc2',
        input: '0 50',
        expectedOutput: "AUTH_FILTER: FAIL\nHTTP 401: Unauthorized",
        isHidden: false,
        explanation: 'Fails at first filter (auth), short-circuiting rate filter.',
      },
      {
        id: 'tc3',
        input: '1 120',
        expectedOutput: "AUTH_FILTER: PASS\nRATE_FILTER: FAIL\nHTTP 429: Too Many Requests",
        isHidden: true,
        explanation: 'Auth passes but rate limit exceeded.',
      },
    ],
  },

  // 9. N+1 Query Problem Detector & Batch Optimizer
  {
    id: 'd9-prob-9',
    day: 9,
    title: 'N+1 Query Problem Detector & SQL Batch Optimizer',
    difficulty: 'Hard',
    moduleTag: 'Module 9: Development & Project Readiness',
    problemStatement:
      'In ORMs (Hibernate/JPA, Prisma), fetching N parent records often triggers N individual child queries (e.g. `SELECT * FROM orders WHERE user_id = ?`). Given `N` followed by `N` unique user IDs, detect the N+1 anti-pattern: Output the total query count `UNOPTIMIZED: <N+1> QUERIES`, followed by the single batched SQL query: `OPTIMIZED: SELECT * FROM orders WHERE user_id IN (id1, id2, ... idN)`.',
    inputFormat: 'Line 1: N. Line 2: N space-separated user IDs',
    outputFormat: 'Line 1: UNOPTIMIZED: X QUERIES. Line 2: OPTIMIZED: SELECT ...',
    constraints: ['1 <= N <= 100'],
    sampleInput: "3\n101 102 103",
    sampleOutput: "UNOPTIMIZED: 4 QUERIES\nOPTIMIZED: SELECT * FROM orders WHERE user_id IN (101, 102, 103)",
    kapilIntuition:
      'Unoptimized query count is N + 1 (1 parent fetch + N child fetches). The batched query groups IDs with an `IN (...)` clause, reducing DB round-trips from N+1 down to 2 (or 1 with a JOIN).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        // TODO: Print unoptimized query count and batched query
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        // TODO: Print unoptimized query count and batched query
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            // TODO: Print unoptimized query count and batched query
        }
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    ids = tokens[1:n+1]
    # TODO: Print unoptimized query count and batched query

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        int ids[100];
        for (int i = 0; i < n; i++) scanf("%d", &ids[i]);

        printf("UNOPTIMIZED: %d QUERIES\\n", n + 1);
        printf("OPTIMIZED: SELECT * FROM orders WHERE user_id IN (");
        for (int i = 0; i < n; i++) {
            printf("%d%s", ids[i], (i == n - 1) ? "" : ", ");
        }
        printf(")\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        vector<int> ids(n);
        for (int i = 0; i < n; i++) cin >> ids[i];

        cout << "UNOPTIMIZED: " << (n + 1) << " QUERIES" << endl;
        cout << "OPTIMIZED: SELECT * FROM orders WHERE user_id IN (";
        for (int i = 0; i < n; i++) {
            cout << ids[i] << (i == n - 1 ? "" : ", ");
        }
        cout << ")" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;
import java.util.StringJoiner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            StringJoiner sj = new StringJoiner(", ");
            for (int i = 0; i < n; i++) {
                sj.add(sc.next());
            }
            System.out.printf("UNOPTIMIZED: %d QUERIES%n", n + 1);
            System.out.printf("OPTIMIZED: SELECT * FROM orders WHERE user_id IN (%s)%n", sj.toString());
        }
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    ids = tokens[1:n+1]
    print(f"UNOPTIMIZED: {n + 1} QUERIES")
    joined = ", ".join(ids)
    print(f"OPTIMIZED: SELECT * FROM orders WHERE user_id IN ({joined})")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: "3\n101 102 103",
        expectedOutput: "UNOPTIMIZED: 4 QUERIES\nOPTIMIZED: SELECT * FROM orders WHERE user_id IN (101, 102, 103)",
        isHidden: false,
        explanation: '3 parent user queries + 1 = 4 queries unoptimized. Batched in single IN clause.',
      },
      {
        id: 'tc2',
        input: "1\n55",
        expectedOutput: "UNOPTIMIZED: 2 QUERIES\nOPTIMIZED: SELECT * FROM orders WHERE user_id IN (55)",
        isHidden: true,
        explanation: 'Single record batch.',
      },
    ],
  },

  // 10. Multi-Tier Cache-Aside (Lazy Loading) Engine
  {
    id: 'd9-prob-10',
    day: 9,
    title: 'Cache-Aside (Lazy Loading) Multi-Tier Storage Simulator',
    difficulty: 'Hard',
    moduleTag: 'Module 9: Development & Project Readiness',
    problemStatement:
      'In high-throughput backends, the Cache-Aside pattern queries an in-memory cache (e.g. Redis) first. If found, it returns `CACHE_HIT: <value>` (0ms DB load). If not found, it queries MySQL, populates the cache for future requests, and returns `CACHE_MISS -> DB_FETCH: <value>`. Given `N` query lookups for integer product IDs (where database value for product `ID` is `Prod_<ID>`), simulate Cache-Aside and print the retrieval trace for each query.',
    inputFormat: 'Line 1: N. Line 2: N space-separated product ID integers',
    outputFormat: 'N lines: CACHE_HIT or CACHE_MISS -> DB_FETCH',
    constraints: ['1 <= N <= 1000', '1 <= ID <= 10^5'],
    sampleInput: "4\n10 20 10 30",
    sampleOutput: "CACHE_MISS -> DB_FETCH: Prod_10\nCACHE_MISS -> DB_FETCH: Prod_20\nCACHE_HIT: Prod_10\nCACHE_MISS -> DB_FETCH: Prod_30",
    kapilIntuition:
      'Maintain an in-memory hash set / map of cached IDs. If ID exists in cache, print CACHE_HIT. If not, insert ID into cache set and print CACHE_MISS -> DB_FETCH.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        // TODO: Simulate Cache-Aside retrieval
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        // TODO: Simulate Cache-Aside retrieval
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
            int n = sc.nextInt();
            // TODO: Simulate Cache-Aside retrieval
        }
    }
}`,
      python: `import sys

def main():
    tokens = [int(x) for x in sys.stdin.read().split()]
    if not tokens:
        return
    n = tokens[0]
    ids = tokens[1:n+1]
    # TODO: Simulate Cache-Aside retrieval

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        static int cache[100001] = {0};
        for (int i = 0; i < n; i++) {
            int id;
            scanf("%d", &id);
            if (id <= 100000 && cache[id]) {
                printf("CACHE_HIT: Prod_%d\\n", id);
            } else {
                if (id <= 100000) cache[id] = 1;
                printf("CACHE_MISS -> DB_FETCH: Prod_%d\\n", id);
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        unordered_set<int> cache;
        for (int i = 0; i < n; i++) {
            int id;
            cin >> id;
            if (cache.count(id)) {
                cout << "CACHE_HIT: Prod_" << id << endl;
            } else {
                cache.insert(id);
                cout << "CACHE_MISS -> DB_FETCH: Prod_" << id << endl;
            }
        }
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
            int n = sc.nextInt();
            Set<Integer> cache = new HashSet<>();
            for (int i = 0; i < n; i++) {
                int id = sc.nextInt();
                if (cache.contains(id)) {
                    System.out.printf("CACHE_HIT: Prod_%d%n", id);
                } else {
                    cache.add(id);
                    System.out.printf("CACHE_MISS -> DB_FETCH: Prod_%d%n", id);
                }
            }
        }
    }
}`,
      python: `import sys

def main():
    tokens = [int(x) for x in sys.stdin.read().split()]
    if not tokens:
        return
    n = tokens[0]
    ids = tokens[1:n+1]
    cache = set()
    for id_val in ids:
        if id_val in cache:
            print(f"CACHE_HIT: Prod_{id_val}")
        else:
            cache.add(id_val)
            print(f"CACHE_MISS -> DB_FETCH: Prod_{id_val}")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: "4\n10 20 10 30",
        expectedOutput: "CACHE_MISS -> DB_FETCH: Prod_10\nCACHE_MISS -> DB_FETCH: Prod_20\nCACHE_HIT: Prod_10\nCACHE_MISS -> DB_FETCH: Prod_30",
        isHidden: false,
        explanation: 'Second lookup of 10 hits the in-memory cache.',
      },
      {
        id: 'tc2',
        input: "3\n5 5 5",
        expectedOutput: "CACHE_MISS -> DB_FETCH: Prod_5\nCACHE_HIT: Prod_5\nCACHE_HIT: Prod_5",
        isHidden: true,
        explanation: 'Repeated lookups hit cache.',
      },
    ],
  },
];
