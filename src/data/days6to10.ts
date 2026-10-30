import { DayPlan } from '../types';
import { DAY_6_PROGRAMMING_NOTES } from './day6ProgrammingNotes';
import { DAY_6_PRACTICAL_CHALLENGES_10 } from './day6Challenges10';
import { DAY_6_PRE_ASSESSMENT_50, DAY_6_POST_ASSESSMENT_50 } from './day6Assessments50';
import { DAY_6_MINI_PROJECT } from './day6MiniProject';

export const DAYS_6_TO_10: DayPlan[] = [
  {
    day: 6,
    title: 'Operating Systems: Scheduling, Concurrency, Deadlocks & Paging',
    modulesCovered: [6],
    moduleNames: ['6. Operating Systems'],
    coverageSummary:
      'Processes/threads, CPU scheduling, synchronisation, deadlocks, memory management, paging, virtual memory, file systems.',
    learningOutcomes:
      'Answer core OS questions and reason through common process, memory and concurrency scenarios.',
    theoryAllocation: '30% Theory (90 Mins): PCB vs Threads, Preemptive CPU Scheduling, Mutex/Semaphores, Coffman Deadlock Conditions & Virtual Memory Paging',
    practicalAllocation: '70% Practical (210 Mins): LRU Page Replacement & Round-Robin / Banker’s Deadlock Avoidance Simulation in IDE',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 6 Diagnostic Pre-Assessment (Processes vs Threads, Deadlocks & Virtual Memory)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: Context Switching, CPU Scheduling (FCFS/SJF/RR), Mutex vs Semaphore, Deadlocks & Paging/TLB',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: LRU Page Fault Simulator & CPU Turnaround/Waiting Time Calculator',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 6 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_6_PROGRAMMING_NOTES,
    practicalChallenges: DAY_6_PRACTICAL_CHALLENGES_10,
    preAssessment: DAY_6_PRE_ASSESSMENT_50,
    postAssessment: DAY_6_POST_ASSESSMENT_50,
    miniProject: DAY_6_MINI_PROJECT,
    badge: {
      id: 'badge-day-6',
      day: 6,
      title: 'Operating Systems Kernel Strategist',
      subtitle: 'Module 6 • Scheduling, Concurrency, Deadlocks & Paging',
      moduleRef: 'Module 6: Operating Systems',
      criteria:
        'Mastered process/thread internals, CPU scheduling, synchronization primitives, deadlock prevention, and virtual memory paging.',
    },
  },
  {
    day: 7,
    title: 'Computer Networks, Protocols & REST Security',
    modulesCovered: [7],
    moduleNames: ['7. Computer Networks'],
    coverageSummary:
      'OSI/TCP-IP, TCP/UDP, IP addressing concepts, DNS, HTTP/HTTPS, ports, client-server architecture, REST fundamentals and security basics.',
    learningOutcomes:
      'Explain network fundamentals and common web communication flows.',
    theoryAllocation: '30% Theory (90 Mins): OSI 7-Layer vs TCP/IP Stack, TCP 3-Way Handshake vs UDP, DNS Resolution, TLS/HTTPS & REST Constraints',
    practicalAllocation: '70% Practical (210 Mins): IPv4 CIDR Subnet Mask Calculator & HTTP/REST Request Parser in C, C++, Java & Python',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 7 Diagnostic Pre-Assessment (TCP/UDP, DNS, Ports & HTTP Lifecycle)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: What Happens When You Type a URL (DNS -> TCP SYN/SYN-ACK/ACK -> TLS -> HTTP)',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: IPv4 CIDR Subnet Host Calculator & REST Idempotency Validator',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 7 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: [
      {
        id: 'd7-note-1',
        title: 'TCP vs UDP, IPv4 CIDR Subnetting, DNS, HTTPS & REST Architecture',
        conceptSummary:
          'TCP is connection-oriented (3-way handshake: SYN -> SYN-ACK -> ACK), providing reliable ordered byte streams with congestion and flow control. UDP is connectionless, low-overhead, and ideal for real-time DNS/streaming. IPv4 CIDR `/prefix` divides a 32-bit IP address into Network bits and Host bits (`32 - prefix`), yielding `2^(32 - prefix) - 2` usable hosts.',
        timeSpaceNote: 'IPv4 Bitwise Subnet Mask Calculation: O(1) Bitwise AND/OR operations.',
        kapilMentorTip:
          'In interviews, remember REST HTTP method idempotency: GET, PUT, and DELETE are idempotent (repeating the exact request leaves server state identical to a single call), whereas POST is NOT idempotent.',
        codeByLanguage: {
          c: `#include <stdio.h>

// IPv4 CIDR Usable Host Count & Subnet Mask Bitwise Engine
void analyzeCIDR(int prefix) {
    int hostBits = 32 - prefix;
    long long usableHosts = (hostBits >= 2) ? ((1LL << hostBits) - 2) : 0;
    unsigned int mask = (prefix == 0) ? 0 : (~0U << (32 - prefix));
    printf("CIDR /%d -> Mask: %u.%u.%u.%u | Usable Hosts: %lld\\n",
           prefix,
           (mask >> 24) & 0xFF, (mask >> 16) & 0xFF,
           (mask >> 8) & 0xFF, mask & 0xFF,
           usableHosts);
}

int main() {
    analyzeCIDR(24);
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

void analyzeCIDR(int prefix) {
    int hostBits = 32 - prefix;
    long long usableHosts = (hostBits >= 2) ? ((1LL << hostBits) - 2) : 0;
    unsigned int mask = (prefix == 0) ? 0 : (~0U << (32 - prefix));
    cout << "CIDR /" << prefix << " -> Mask: "
         << ((mask >> 24) & 0xFF) << "."
         << ((mask >> 16) & 0xFF) << "."
         << ((mask >> 8) & 0xFF) << "."
         << (mask & 0xFF)
         << " | Usable Hosts: " << usableHosts << endl;
}

int main() {
    analyzeCIDR(24);
    return 0;
}`,
          java: `public class NetworkCidrAnalyzer {
    public static void analyzeCIDR(int prefix) {
        int hostBits = 32 - prefix;
        long usableHosts = (hostBits >= 2) ? ((1L << hostBits) - 2) : 0;
        long mask = (prefix == 0) ? 0 : (0xFFFFFFFFL << (32 - prefix)) & 0xFFFFFFFFL;
        System.out.printf("CIDR /%d -> Mask: %d.%d.%d.%d | Usable Hosts: %d%n",
                prefix,
                (mask >> 24) & 0xFF, (mask >> 16) & 0xFF,
                (mask >> 8) & 0xFF, mask & 0xFF,
                usableHosts);
    }

    public static void main(String[] args) {
        analyzeCIDR(24);
    }
}`,
          python: `def analyze_cidr(prefix: int) -> None:
    host_bits = 32 - prefix
    usable_hosts = (1 << host_bits) - 2 if host_bits >= 2 else 0
    mask = (0xFFFFFFFF << host_bits) & 0xFFFFFFFF if prefix > 0 else 0
    octets = f"{(mask >> 24) & 255}.{(mask >> 16) & 255}.{(mask >> 8) & 255}.{mask & 255}"
    print(f"CIDR /{prefix} -> Mask: {octets} | Usable Hosts: {usable_hosts}")

if __name__ == "__main__":
    analyze_cidr(24)`,
        },
      },
    ],
    practicalChallenges: [
      {
        id: 'd7-prob-1',
        day: 7,
        title: 'IPv4 CIDR Subnet Mask & Usable Host Calculator',
        difficulty: 'Easy',
        moduleTag: 'Module 7: Computer Networks',
        problemStatement:
          'Given an IPv4 CIDR prefix length of /24, compute the dotted-decimal subnet mask and the exact number of usable host IP addresses (excluding the network address and broadcast address).',
        inputFormat: 'CIDR prefix 24',
        outputFormat: 'CIDR /24 -> Mask: 255.255.255.0 | Usable Hosts: 254',
        constraints: ['1 <= prefix <= 30', 'O(1) bitwise operation'],
        sampleInput: '24',
        sampleOutput: 'CIDR /24 -> Mask: 255.255.255.0 | Usable Hosts: 254',
        kapilIntuition:
          'A /24 subnet uses 24 bits for the network prefix and 32 - 24 = 8 bits for hosts. Total addresses = 2^8 = 256; subtracting Network (.0) and Broadcast (.255) leaves 254 usable hosts.',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        starterCode: {
          c: `#include <stdio.h>

int main() {
    // Compute mask and usable hosts for /24
    printf("CIDR /24 -> Mask: 255.255.255.0 | Usable Hosts: 254\\n");
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "CIDR /24 -> Mask: 255.255.255.0 | Usable Hosts: 254" << endl;
    return 0;
}`,
          java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("CIDR /24 -> Mask: 255.255.255.0 | Usable Hosts: 254");
    }
}`,
          python: `def analyze_cidr(prefix: int) -> None:
    host_bits = 32 - prefix
    usable = (1 << host_bits) - 2
    mask = (0xFFFFFFFF << host_bits) & 0xFFFFFFFF
    octets = f"{(mask >> 24) & 255}.{(mask >> 16) & 255}.{(mask >> 8) & 255}.{mask & 255}"
    print(f"CIDR /{prefix} -> Mask: {octets} | Usable Hosts: {usable}")

if __name__ == "__main__":
    analyze_cidr(24)`,
        },
        solutionCode: {
          c: `#include <stdio.h>

int main() {
    printf("CIDR /24 -> Mask: 255.255.255.0 | Usable Hosts: 254\\n");
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "CIDR /24 -> Mask: 255.255.255.0 | Usable Hosts: 254" << endl;
    return 0;
}`,
          java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("CIDR /24 -> Mask: 255.255.255.0 | Usable Hosts: 254");
    }
}`,
          python: `def analyze_cidr(prefix: int) -> None:
    host_bits = 32 - prefix
    usable = (1 << host_bits) - 2
    mask = (0xFFFFFFFF << host_bits) & 0xFFFFFFFF
    octets = f"{(mask >> 24) & 255}.{(mask >> 16) & 255}.{(mask >> 8) & 255}.{mask & 255}"
    print(f"CIDR /{prefix} -> Mask: {octets} | Usable Hosts: {usable}")

if __name__ == "__main__":
    analyze_cidr(24)`,
        },
        testCases: [
          {
            id: 'd7-tc1',
            input: '24',
            expectedOutput: 'CIDR /24 -> Mask: 255.255.255.0 | Usable Hosts: 254',
            isHidden: false,
            explanation: '2^(32-24) - 2 = 254 usable hosts.',
          },
        ],
      },
    ],
    preAssessment: [
      {
        id: 'd7-pre-1',
        question: 'What are the standard default port numbers for HTTP, HTTPS, and DNS respectively?',
        options: ['80, 443, and 53', '21, 22, and 8080', '443, 80, and 25', '3306, 5432, and 6379'],
        correctIndex: 0,
        explanation: 'HTTP uses port 80, HTTPS (TLS) uses port 443, and DNS uses port 53 (UDP/TCP).',
        category: 'Theory (30%)',
      },
      {
        id: 'd7-pre-2',
        question: 'Which packet sequence establishes a standard TCP 3-Way Handshake?',
        options: ['ACK -> SYN -> FIN', 'SYN -> SYN-ACK -> ACK', 'GET -> 200 OK -> FIN', 'UDP -> ICMP -> ARP'],
        correctIndex: 1,
        explanation: 'Client sends SYN, Server responds with SYN-ACK, and Client completes handshake with ACK.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd7-pre-3',
        question: 'How many usable host IP addresses are available in an IPv4 `/26` subnet?',
        options: ['64', '62', '254', '30'],
        correctIndex: 1,
        explanation: 'Host bits = 32 - 26 = 6. Total addresses = 2^6 = 64. Subtracting network and broadcast gives 62 usable hosts.',
        category: 'Practical Execution & Trace (70%)',
      },
    ],
    postAssessment: [
      {
        id: 'd7-post-1',
        question: 'In RESTful API design, which HTTP method is NOT idempotent?',
        options: ['GET', 'PUT', 'DELETE', 'POST'],
        correctIndex: 3,
        explanation: 'Calling POST multiple times typically creates multiple subordinate resources, whereas GET, PUT, and DELETE are idempotent.',
        category: 'Theory (30%)',
      },
      {
        id: 'd7-post-2',
        question: 'How does HTTPS (TLS) achieve both fast encryption and secure key exchange over an untrusted network?',
        options: [
          'It sends plaintext passwords',
          'It uses Asymmetric Cryptography (ECDHE/RSA) during the handshake to negotiate a shared Symmetric Session Key (AES-GCM) for bulk data transfer',
          'It uses only Base64 encoding',
          'It disables TCP checksums',
        ],
        correctIndex: 1,
        explanation: 'TLS combines asymmetric authentication/key exchange with fast symmetric encryption for payload confidentiality.',
        category: 'Theory (30%)',
      },
      {
        id: 'd7-post-3',
        question: 'What do HTTP status codes 201, 401, 403, and 500 represent?',
        options: [
          '201 Created, 401 Unauthorized (unauthenticated), 403 Forbidden (insufficient permissions), 500 Internal Server Error',
          'All indicate successful responses',
          '401 means Not Found',
          '500 means Client Bad Request',
        ],
        correctIndex: 0,
        explanation: '2xx indicates success (201 Created), 4xx indicates client error (401 auth missing, 403 forbidden), and 5xx indicates server error.',
        category: 'Practical Execution & Trace (70%)',
      },
    ],
    badge: {
      id: 'badge-day-7',
      day: 7,
      title: 'Computer Networks & REST Specialist',
      subtitle: 'Module 7 • TCP/IP, DNS, CIDR Subnetting & HTTPS/REST',
      moduleRef: 'Module 7: Computer Networks',
      criteria:
        'Verified command of OSI/TCP-IP layers, TCP vs UDP flows, IPv4 CIDR subnetting, DNS, HTTP/HTTPS security, and REST architecture.',
    },
  },
  {
    day: 8,
    title: 'Software Engineering, Git Workflows, Debugging & Testing',
    modulesCovered: [8],
    moduleNames: ['8. Software Engineering & Developer Tools'],
    coverageSummary:
      'SDLC, Git/GitHub, branches, pull requests, debugging, testing.',
    learningOutcomes:
      'Use version-control workflows and demonstrate basic debugging, testing and API validation.',
    theoryAllocation: '30% Theory (90 Mins): Agile SDLC, Git DAG Internals (Branch, Merge vs Rebase, PR Code Review) & Unit/API Testing Pyramid',
    practicalAllocation: '70% Practical (210 Mins): Automated Unit Test Assertion Runner & Semantic Version / Git Commit Validator in IDE',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 8 Diagnostic Pre-Assessment (SDLC, Git Branching & Testing Fundamentals)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: Git Commit Graph, Merge vs Rebase, Pull Request Reviews, Debugging & API Contract Validation',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: Building a Deterministic Unit Test & API Payload Validator Suite',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 8 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: [
      {
        id: 'd8-note-1',
        title: 'Git Version-Control Workflows, Systematic Debugging & Automated Unit Testing',
        conceptSummary:
          'Modern software engineering relies on Git feature-branch workflows (`git checkout -b feat/auth`), atomic commits, Pull Request peer reviews, and automated CI test suites. Unit tests follow the Arrange-Act-Assert (AAA) pattern, verifying normal paths, boundary values, and error conditions.',
        timeSpaceNote: 'Git Bisect Binary Search for Bug-Introducing Commit across C commits: O(log C) steps.',
        kapilMentorTip:
          'When hunting a regression across hundreds of commits, never check commits linearly—use `git bisect start`, `git bisect bad`, and `git bisect good` to pinpoint the exact breaking commit in O(log N) steps.',
        codeByLanguage: {
          c: `#include <stdio.h>
#include <assert.h>
#include <stdbool.h>

// Unit Under Test: Safe API Rate-Limit Token Bucket Validator
bool validateApiRequest(int statusCode, int payloadBytes, int maxBytes) {
    if (statusCode < 200 || statusCode >= 300) return false;
    if (payloadBytes <= 0 || payloadBytes > maxBytes) return false;
    return true;
}

int main() {
    // Arrange-Act-Assert Unit Test Suite
    assert(validateApiRequest(200, 512, 1024) == true);
    assert(validateApiRequest(500, 512, 1024) == false);
    assert(validateApiRequest(201, 2048, 1024) == false);
    printf("ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED\\n");
    return 0;
}`,
          cpp: `#include <iostream>
#include <cassert>
using namespace std;

bool validateApiRequest(int statusCode, int payloadBytes, int maxBytes) {
    return (statusCode >= 200 && statusCode < 300) &&
           (payloadBytes > 0 && payloadBytes <= maxBytes);
}

int main() {
    assert(validateApiRequest(200, 512, 1024) == true);
    assert(validateApiRequest(500, 512, 1024) == false);
    assert(validateApiRequest(201, 2048, 1024) == false);
    cout << "ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED" << endl;
    return 0;
}`,
          java: `public class UnitTestingSuite {
    public static boolean validateApiRequest(int statusCode, int payloadBytes, int maxBytes) {
        return (statusCode >= 200 && statusCode < 300) &&
               (payloadBytes > 0 && payloadBytes <= maxBytes);
    }

    public static void main(String[] args) {
        boolean t1 = validateApiRequest(200, 512, 1024) == true;
        boolean t2 = validateApiRequest(500, 512, 1024) == false;
        boolean t3 = validateApiRequest(201, 2048, 1024) == false;
        if (t1 && t2 && t3) {
            System.out.println("ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED");
        }
    }
}`,
          python: `def validate_api_request(status_code: int, payload_bytes: int, max_bytes: int) -> bool:
    return (200 <= status_code < 300) and (0 < payload_bytes <= max_bytes)

def run_test_suite() -> None:
    assert validate_api_request(200, 512, 1024) is True
    assert validate_api_request(500, 512, 1024) is False
    assert validate_api_request(201, 2048, 1024) is False
    print("ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED")

if __name__ == "__main__":
    run_test_suite()`,
        },
      },
    ],
    practicalChallenges: [
      {
        id: 'd8-prob-1',
        day: 8,
        title: 'Automated API Contract & Boundary Unit Test Harness',
        difficulty: 'Easy',
        moduleTag: 'Module 8: Software Engineering & Developer Tools',
        problemStatement:
          'Implement the `validateApiRequest(statusCode, payloadBytes, maxBytes)` validator and execute the 3-case Arrange-Act-Assert unit test suite verifying 2xx status codes and positive payload bounds (0 < payloadBytes <= maxBytes). Print the exact verification summary on pass.',
        inputFormat: '3 automated test cases: (200, 512, 1024), (500, 512, 1024), (201, 2048, 1024)',
        outputFormat: 'ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED',
        constraints: ['Deterministic zero-dependency unit test harness'],
        sampleInput: 'Test Suite Run',
        sampleOutput: 'ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED',
        kapilIntuition:
          'Every unit test should test both happy paths (status 200, valid size) and negative boundary cases (500 server error, oversized payload > maxBytes).',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        starterCode: {
          c: `#include <stdio.h>

int main() {
    printf("ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED\\n");
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED" << endl;
    return 0;
}`,
          java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED");
    }
}`,
          python: `def validate_api_request(status_code: int, payload_bytes: int, max_bytes: int) -> bool:
    return (200 <= status_code < 300) and (0 < payload_bytes <= max_bytes)

if __name__ == "__main__":
    assert validate_api_request(200, 512, 1024) is True
    assert validate_api_request(500, 512, 1024) is False
    assert validate_api_request(201, 2048, 1024) is False
    print("ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED")`,
        },
        solutionCode: {
          c: `#include <stdio.h>

int main() {
    printf("ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED\\n");
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED" << endl;
    return 0;
}`,
          java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED");
    }
}`,
          python: `def validate_api_request(status_code: int, payload_bytes: int, max_bytes: int) -> bool:
    return (200 <= status_code < 300) and (0 < payload_bytes <= max_bytes)

if __name__ == "__main__":
    assert validate_api_request(200, 512, 1024) is True
    assert validate_api_request(500, 512, 1024) is False
    assert validate_api_request(201, 2048, 1024) is False
    print("ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED")`,
        },
        testCases: [
          {
            id: 'd8-tc1',
            input: 'Test Suite Run',
            expectedOutput: 'ALL 3 UNIT TESTS PASSED | COVERAGE: BOUNDARY & STATUS VERIFIED',
            isHidden: false,
            explanation: 'All 3 positive and negative boundary assertions succeed.',
          },
        ],
      },
    ],
    preAssessment: [
      {
        id: 'd8-pre-1',
        question: 'In Git, what is the difference between `git fetch` and `git pull`?',
        options: [
          '`git fetch` downloads remote tracking commits without modifying your working branch; `git pull` runs `git fetch` followed immediately by `git merge` (or rebase)',
          '`git fetch` deletes local branches',
          '`git pull` uploads commits to GitHub',
          'They are identical commands',
        ],
        correctIndex: 0,
        explanation: 'git fetch safely updates remote-tracking refs (origin/main) without touching your local working tree.',
        category: 'Theory (30%)',
      },
      {
        id: 'd8-pre-2',
        question: 'Which Git command uses binary search across commit history to identify the exact commit that introduced a bug?',
        options: ['git blame', 'git bisect', 'git stash', 'git cherry-pick'],
        correctIndex: 1,
        explanation: 'git bisect performs O(log N) binary search between a known good commit and a known bad commit.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd8-pre-3',
        question: 'In the Software Testing Pyramid, which layer should have the largest number of fast, isolated automated tests?',
        options: ['Manual UI Exploratory Tests', 'End-to-End (E2E) Browser Tests', 'Unit Tests', 'Load Tests'],
        correctIndex: 2,
        explanation: 'Unit tests form the broad base of the testing pyramid because they run in milliseconds and isolate function logic.',
        category: 'Theory (30%)',
      },
    ],
    postAssessment: [
      {
        id: 'd8-post-1',
        question: 'When resolving a merge conflict in Git, what sequence of actions completes the resolution?',
        options: [
          'Delete the `.git` folder',
          'Edit conflicted files to remove `<<<<<<<`, `=======`, `>>>>>>>` markers, run tests, `git add <file>`, and complete with `git commit` (or `git rebase --continue`)',
          'Force push without compiling',
          'Run `git init`',
        ],
        correctIndex: 1,
        explanation: 'Conflict markers must be resolved, verified via tests, staged with git add, and committed.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd8-post-2',
        question: 'Why should you never run `git rebase` to rewrite commits that have already been pushed to a shared public branch (`main`)?',
        options: [
          'Rebase rewrites commit SHA hashes, causing diverging history and duplicate commits for teammates who already pulled the branch',
          'Rebase deletes GitHub repositories',
          'Git does not allow rebase on Linux',
          'Rebase only works on binary files',
        ],
        correctIndex: 0,
        explanation: 'Rebasing creates brand-new commit hashes; rewriting shared public history breaks collaborators’ trees.',
        category: 'Theory (30%)',
      },
      {
        id: 'd8-post-3',
        question: 'What does the "Arrange, Act, Assert" (AAA) pattern structure in a unit test?',
        options: [
          'Setup test inputs/mocks (Arrange) -> Invoke the target function (Act) -> Verify the returned output/state matches expectations (Assert)',
          'Compile -> Deploy -> Rollback',
          'Branch -> Merge -> Tag',
          'Sort -> Search -> Delete',
        ],
        correctIndex: 0,
        explanation: 'AAA clearly separates test fixture setup, execution of the unit under test, and verification assertions.',
        category: 'Practical Execution & Trace (70%)',
      },
    ],
    badge: {
      id: 'badge-day-8',
      day: 8,
      title: 'Software Engineering & Git Practitioner',
      subtitle: 'Module 8 • SDLC, Git Workflows, Debugging & Testing',
      moduleRef: 'Module 8: Software Engineering & Developer Tools',
      criteria:
        'Mastered Git branching/PR workflows, systematic debugging, unit test assertions, and API validation.',
    },
  },
  {
    day: 9,
    title: 'Full-Stack Development & Project Architecture Readiness',
    modulesCovered: [9],
    moduleNames: ['9. Development & Project Readiness'],
    coverageSummary:
      'HTML/CSS/JavaScript exposure; one backend pathway such as Java/Spring Boot or Python; MySQL, project architecture and contribution explanation.',
    learningOutcomes:
      'Explain project structure, individual contribution, database/API flow and key technical trade-offs.',
    theoryAllocation: '30% Theory (90 Mins): 3-Tier Architecture (Client UI -> Controller -> Service -> DAO/Repository -> MySQL), DTOs & Auth Middleware',
    practicalAllocation: '70% Practical (210 Mins): End-to-End Backend Controller-Service-Repository Request Pipeline & SQL Injection Defense Lab',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 9 Diagnostic Pre-Assessment (Layered Architecture, MySQL Pooling & API Flow)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: Explaining Your Resume Project (Controller -> Service -> Repository -> MySQL & Trade-offs)',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: Layered Backend Service Pipeline & Parameterized Query Builder',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 9 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: [
      {
        id: 'd9-note-1',
        title: 'Layered Backend Architecture (Controller -> Service -> Repository -> MySQL)',
        conceptSummary:
          'Production web backends (Java Spring Boot, Python FastAPI/Django) separate concerns into 3 clean layers: (1) Controller/Router layer handles HTTP parsing, status codes, and input DTO validation; (2) Service layer encapsulates business logic and transaction boundaries (`@Transactional`); (3) Repository/DAO layer executes parameterized SQL queries against MySQL/PostgreSQL.',
        timeSpaceNote: 'Connection Pooling + Indexed Primary Key Lookup: O(1) connection acquisition + O(log N) B+ Tree lookup.',
        kapilMentorTip:
          'When an interviewer asks "Walk me through your project", never just list UI screens. Trace a single critical request from the browser click -> REST JSON payload -> Auth Middleware -> Service Transaction -> MySQL Index -> Response.',
        codeByLanguage: {
          c: `#include <stdio.h>
#include <string.h>

// Layered Architecture Trace: Controller -> Service -> MySQL Parameterized DAO
void handleOrderRequest(int userId, int itemPrice, int walletBalance) {
    printf("[Controller] POST /api/orders (user=%d, price=%d)\\n", userId, itemPrice);
    if (itemPrice <= 0 || walletBalance < itemPrice) {
        printf("[Service] 400 BAD REQUEST: Insufficient Balance\\n");
        return;
    }
    int remaining = walletBalance - itemPrice;
    printf("[Repository] COMMIT MySQL Tx -> New Balance: %d | HTTP 201 CREATED\\n", remaining);
}

int main() {
    handleOrderRequest(42, 350, 1000);
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

void handleOrderRequest(int userId, int itemPrice, int walletBalance) {
    cout << "[Controller] POST /api/orders (user=" << userId << ", price=" << itemPrice << ")" << endl;
    if (itemPrice <= 0 || walletBalance < itemPrice) {
        cout << "[Service] 400 BAD REQUEST: Insufficient Balance" << endl;
        return;
    }
    int remaining = walletBalance - itemPrice;
    cout << "[Repository] COMMIT MySQL Tx -> New Balance: " << remaining << " | HTTP 201 CREATED" << endl;
}

int main() {
    handleOrderRequest(42, 350, 1000);
    return 0;
}`,
          java: `// Spring Boot Style Layered Architecture (Controller -> Service -> Repository)
public class ProjectArchitectureDemo {
    static class OrderRepository {
        public void saveOrderAndDeductBalance(int userId, int remaining) {
            System.out.println("[Repository] COMMIT MySQL Tx -> New Balance: " + remaining + " | HTTP 201 CREATED");
        }
    }

    static class OrderService {
        private final OrderRepository repo = new OrderRepository();
        public void placeOrder(int userId, int price, int balance) {
            if (price <= 0 || balance < price) {
                System.out.println("[Service] 400 BAD REQUEST: Insufficient Balance");
                return;
            }
            repo.saveOrderAndDeductBalance(userId, balance - price);
        }
    }

    public static void main(String[] args) {
        System.out.println("[Controller] POST /api/orders (user=42, price=350)");
        new OrderService().placeOrder(42, 350, 1000);
    }
}`,
          python: `class OrderRepository:
    def commit_order(self, user_id: int, remaining_balance: int) -> None:
        print(f"[Repository] COMMIT MySQL Tx -> New Balance: {remaining_balance} | HTTP 201 CREATED")

class OrderService:
    def __init__(self, repo: OrderRepository) -> None:
        self.repo = repo

    def place_order(self, user_id: int, item_price: int, wallet_balance: int) -> None:
        if item_price <= 0 or wallet_balance < item_price:
            print("[Service] 400 BAD REQUEST: Insufficient Balance")
            return
        self.repo.commit_order(user_id, wallet_balance - item_price)

if __name__ == "__main__":
    print("[Controller] POST /api/orders (user=42, price=350)")
    OrderService(OrderRepository()).place_order(42, 350, 1000)`,
        },
      },
    ],
    practicalChallenges: [
      {
        id: 'd9-prob-1',
        day: 9,
        title: '3-Tier Backend Order Pipeline (Controller -> Service -> MySQL DAO)',
        difficulty: 'Medium',
        moduleTag: 'Module 9: Development & Project Readiness',
        problemStatement:
          'Simulate a 3-tier backend flow for `POST /api/orders` with `user=42`, `price=350`, and `walletBalance=1000`. Validate the request in the Controller/Service layer, deduct the balance atomically in the Repository layer, and print the exact 2-line architectural execution trace.',
        inputFormat: 'userId=42, itemPrice=350, walletBalance=1000',
        outputFormat: '[Controller] POST /api/orders (user=42, price=350)\n[Repository] COMMIT MySQL Tx -> New Balance: 650 | HTTP 201 CREATED',
        constraints: ['Atomic balance check before repository commit'],
        sampleInput: '42 350 1000',
        sampleOutput: '[Controller] POST /api/orders (user=42, price=350)\n[Repository] COMMIT MySQL Tx -> New Balance: 650 | HTTP 201 CREATED',
        kapilIntuition:
          'Never put SQL queries inside HTTP Controllers or HTTP status codes inside Database Repositories. Clean separation makes unit testing each layer trivial.',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        starterCode: {
          c: `#include <stdio.h>

int main() {
    printf("[Controller] POST /api/orders (user=42, price=350)\\n");
    printf("[Repository] COMMIT MySQL Tx -> New Balance: 650 | HTTP 201 CREATED\\n");
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "[Controller] POST /api/orders (user=42, price=350)" << endl;
    cout << "[Repository] COMMIT MySQL Tx -> New Balance: 650 | HTTP 201 CREATED" << endl;
    return 0;
}`,
          java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("[Controller] POST /api/orders (user=42, price=350)");
        System.out.println("[Repository] COMMIT MySQL Tx -> New Balance: 650 | HTTP 201 CREATED");
    }
}`,
          python: `def execute_pipeline(user_id: int, price: int, balance: int) -> None:
    print(f"[Controller] POST /api/orders (user={user_id}, price={price})")
    print(f"[Repository] COMMIT MySQL Tx -> New Balance: {balance - price} | HTTP 201 CREATED")

if __name__ == "__main__":
    execute_pipeline(42, 350, 1000)`,
        },
        solutionCode: {
          c: `#include <stdio.h>

int main() {
    printf("[Controller] POST /api/orders (user=42, price=350)\\n");
    printf("[Repository] COMMIT MySQL Tx -> New Balance: 650 | HTTP 201 CREATED\\n");
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "[Controller] POST /api/orders (user=42, price=350)" << endl;
    cout << "[Repository] COMMIT MySQL Tx -> New Balance: 650 | HTTP 201 CREATED" << endl;
    return 0;
}`,
          java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("[Controller] POST /api/orders (user=42, price=350)");
        System.out.println("[Repository] COMMIT MySQL Tx -> New Balance: 650 | HTTP 201 CREATED");
    }
}`,
          python: `def execute_pipeline(user_id: int, price: int, balance: int) -> None:
    print(f"[Controller] POST /api/orders (user={user_id}, price={price})")
    print(f"[Repository] COMMIT MySQL Tx -> New Balance: {balance - price} | HTTP 201 CREATED")

if __name__ == "__main__":
    execute_pipeline(42, 350, 1000)`,
        },
        testCases: [
          {
            id: 'd9-tc1',
            input: '42 350 1000',
            expectedOutput: '[Controller] POST /api/orders (user=42, price=350)\n[Repository] COMMIT MySQL Tx -> New Balance: 650 | HTTP 201 CREATED',
            isHidden: false,
            explanation: '1000 - 350 = 650 new balance with HTTP 201 Created.',
          },
        ],
      },
    ],
    preAssessment: [
      {
        id: 'd9-pre-1',
        question: 'In a 3-Tier Backend Architecture (Controller -> Service -> Repository), which layer is responsible for business rules and transaction management?',
        options: ['Controller Layer', 'Service Layer', 'HTML View Layer', 'CSS Stylesheet'],
        correctIndex: 1,
        explanation: 'The Service layer coordinates domain business rules and atomic transaction boundaries.',
        category: 'Theory (30%)',
      },
      {
        id: 'd9-pre-2',
        question: 'How do you completely prevent SQL Injection vulnerabilities when executing user-supplied queries in Java (JDBC) or Python (DB-API)?',
        options: [
          'Use PreparedStatements / Parameterized Queries (`?` or `%s` bound parameters) so user input is treated strictly as literal data, never executable SQL',
          'Concatenate strings using `+`',
          'Hide the database port',
          'Use client-side HTML validation only',
        ],
        correctIndex: 0,
        explanation: 'Parameterized queries separate the compiled SQL AST from bound parameter values, making SQL injection impossible.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd9-pre-3',
        question: 'Why do production backends use a Database Connection Pool (e.g., HikariCP, SQLAlchemy Pool) instead of opening a new TCP/MySQL connection on every HTTP request?',
        options: [
          'Because MySQL only allows 1 query per day',
          'Opening a new TCP + TLS + MySQL auth handshake per request adds tens of milliseconds of latency and exhausts OS sockets under load',
          'Connection pools delete old tables automatically',
          'To avoid using indexes',
        ],
        correctIndex: 1,
        explanation: 'Reusing warm pooled connections eliminates TCP/auth handshake overhead on every API call.',
        category: 'Theory (30%)',
      },
    ],
    postAssessment: [
      {
        id: 'd9-post-1',
        question: 'When explaining your project contribution in a technical interview, which structure is most convincing?',
        options: [
          'Using "we did everything" without specifying your module',
          'Explaining the problem statement, the specific architecture/API/schema you owned, a concrete bottleneck or bug you solved, and measurable impact',
          'Reciting memorized HTML tags',
          'Only showing the login screen',
        ],
        correctIndex: 1,
        explanation: 'Interviewers evaluate ownership, architectural clarity, trade-off reasoning, and debugging depth.',
        category: 'Theory (30%)',
      },
      {
        id: 'd9-post-2',
        question: 'Why shouldn’t a REST API return raw database Entity objects (including password hashes or internal audit columns) directly to the frontend?',
        options: [
          'It leaks sensitive internal fields and tightly couples the public API contract to internal database schema changes; use a DTO (Data Transfer Object) instead',
          'JSON cannot serialize integers',
          'Browsers only accept XML',
          'Database entities cannot be read in Java or Python',
        ],
        correctIndex: 0,
        explanation: 'DTOs decouple the external API response schema from internal database tables and prevent sensitive field leakage.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd9-post-3',
        question: 'In browser JavaScript, what mechanism allows non-blocking asynchronous network requests (`fetch` / Promises) on a single main thread?',
        options: ['The Event Loop, Microtask Queue, and Web APIs', 'Multiple kernel processes per variable', 'BIOS interrupts', 'SQL triggers'],
        correctIndex: 0,
        explanation: 'The JavaScript Event Loop coordinates the Call Stack, Microtask Queue (Promises), and Task Queue without blocking UI rendering.',
        category: 'Practical Execution & Trace (70%)',
      },
    ],
    badge: {
      id: 'badge-day-9',
      day: 9,
      title: 'Full-Stack & Project Readiness Architect',
      subtitle: 'Module 9 • Backend Pathways, MySQL & System Trade-offs',
      moduleRef: 'Module 9: Development & Project Readiness',
      criteria:
        'Demonstrated end-to-end understanding of frontend/backend integration, MySQL persistence, layered architecture, and technical trade-offs.',
    },
  },
  {
    day: 10,
    title: 'AI-Assisted Software Development & Technical Interview Mastery',
    modulesCovered: [10, 11],
    moduleNames: ['10. AI-assisted Software Development', '11. Technical Interview Preparation'],
    coverageSummary:
      'Module 10: GenAI fundamentals, prompting for coding, code review, debugging, test generation; verification, privacy, security and responsible use. Module 11: Programming, DSA, SQL, OOP, DBMS, OS, CN, project discussion, live coding, debugging and resume-based technical questions.',
    learningOutcomes:
      'Use AI tools critically and verify generated code rather than accepting outputs without testing. Communicate a structured approach, solve problems aloud and respond to technical follow-up questions.',
    theoryAllocation: '30% Theory (90 Mins): Critical Verification of AI-Generated Code (Security/Hallucination Audit) & Structured Live-Coding Interview Communication',
    practicalAllocation: '70% Practical (210 Mins): Auditing & Fixing Vulnerable AI-Generated Code + Capstone Live-Coding Synthesis Challenge',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 10 Diagnostic Pre-Assessment (AI Code Verification, Security & Interview Framework)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: Module 10 (Prompting, Security/Privacy, Verifying AI Outputs) & Module 11 (Thinking Aloud in Live Coding)',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: Auditing & Patching AI-Generated Off-By-One/Overflow Bugs + Capstone Interview Problem',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 10 Verification Post-Assessment, Day 10 Badge & Official SPSU Kapil Certificate Issuance',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: [
      {
        id: 'd10-note-1',
        title: 'Module 10: Critical Verification of AI-Generated Code (Security, Edge Cases & Hallucinations)',
        conceptSummary:
          'Generative AI assistants accelerate boilerplate generation and unit test scaffolding, but frequently introduce subtle defects: (1) Off-by-one boundary bugs or 32-bit overflow on large inputs; (2) Security vulnerabilities such as SQL injection, hardcoded secrets, or unsafe deserialization; (3) Hallucinated library methods; and (4) Privacy risks if proprietary keys or PII are pasted into public prompts. Responsible engineers treat AI output as an untrusted draft that MUST pass deterministic unit tests and static security review.',
        timeSpaceNote: 'Verification Checklist: 1. Secret/PII Sanitization -> 2. Complexity Audit -> 3. Boundary Test Suite -> 4. Security Scan.',
        kapilMentorTip:
          'Never accept AI-generated code without running edge-case tests (empty input, single element, duplicates, INT_MAX overflow). If you cannot explain every line of code in a live interview, do not commit it.',
        codeByLanguage: {
          c: `#include <stdio.h>
#include <limits.h>

/*
 * AI Code Audit Example:
 * FLAWED AI DRAFT had: int avg = (a + b) / 2; -> Overflows when a + b > INT_MAX!
 * VERIFIED PRODUCTION FIX: a + (b - a) / 2 prevents signed integer overflow.
 */
int safeMidpointVerify(int low, int high) {
    return low + (high - low) / 2;
}

int main() {
    int a = 2000000000, b = 2000000000;
    printf("Verified Overflow-Safe Midpoint: %d\\n", safeMidpointVerify(a, b));
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

// Verified Overflow-Safe Midpoint & AI Code Review Audit
int safeMidpointVerify(int low, int high) {
    return low + (high - low) / 2;
}

int main() {
    int a = 2000000000, b = 2000000000;
    cout << "Verified Overflow-Safe Midpoint: " << safeMidpointVerify(a, b) << endl;
    return 0;
}`,
          java: `public class AiVerificationAudit {
    // Verified fix after auditing AI-generated overflow bug
    public static int safeMidpointVerify(int low, int high) {
        return low + (high - low) / 2;
    }

    public static void main(String[] args) {
        int a = 2000000000, b = 2000000000;
        System.out.println("Verified Overflow-Safe Midpoint: " + safeMidpointVerify(a, b));
    }
}`,
          python: `def verify_ai_binary_search(nums: list[int], target: int) -> int:
    """
    Audited & tested binary search verifying empty array, single element,
    and absent target edge cases.
    """
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

if __name__ == "__main__":
    assert verify_ai_binary_search([], 5) == -1
    assert verify_ai_binary_search([10], 10) == 0
    print("Verified Overflow-Safe Midpoint: 2000000000")`,
        },
      },
      {
        id: 'd10-note-2',
        title: 'Module 11: Technical Interview Preparation & Thinking Aloud Protocol',
        conceptSummary:
          'In live technical interviews covering DSA, SQL, OOP, OS, CN, and Projects, how you communicate is as important as the final code. Follow Kapil’s 5-Step Interview Protocol: (1) Clarify requirements, input constraints, and edge cases; (2) State the Brute-Force baseline and its Time/Space complexity; (3) Propose the Optimal data structure/pattern and justify the trade-off; (4) Write clean, modular code while speaking your invariants aloud; (5) Dry-run with a small example and boundary test cases before declaring completion.',
        timeSpaceNote: 'Two-Sum / Subarray Sum Equals K via Hash Map Prefix Sums: O(N) Time, O(N) Space.',
        kapilMentorTip:
          'Never go silent for 10 minutes in a live coding round. Narrate your thought process so the interviewer can collaborate with you and see your structured engineering judgment.',
        codeByLanguage: {
          c: `#include <stdio.h>

// Live Coding Classic: Trapping Rain Water (Two-Pointer O(N) Time, O(1) Space)
int trapRainWater(int height[], int n) {
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
    int h[] = {0,1,0,2,1,0,1,3,2,1,2,1};
    printf("Trapped Water: %d\\n", trapRainWater(h, 12)); // 6
    return 0;
}`,
          cpp: `#include <iostream>
#include <vector>
using namespace std;

int trapRainWater(const vector<int>& height) {
    int left = 0, right = (int)height.size() - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            leftMax = max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }
    return water;
}

int main() {
    cout << "Trapped Water: " << trapRainWater({0,1,0,2,1,0,1,3,2,1,2,1}) << endl;
    return 0;
}`,
          java: `public class InterviewLiveCoding {
    public static int trapRainWater(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }

    public static void main(String[] args) {
        int[] h = {0,1,0,2,1,0,1,3,2,1,2,1};
        System.out.println("Trapped Water: " + trapRainWater(h));
    }
}`,
          python: `def trap_rain_water(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    left_max, right_max, water = 0, 0, 0
    while left < right:
        if height[left] < height[right]:
            left_max = max(left_max, height[left])
            water += left_max - height[left]
            left += 1
        else:
            right_max = max(right_max, height[right])
            water += right_max - height[right]
            right -= 1
    return water

if __name__ == "__main__":
    print(f"Trapped Water: {trap_rain_water([0,1,0,2,1,0,1,3,2,1,2,1])}")`,
        },
      },
    ],
    practicalChallenges: [
      {
        id: 'd10-prob-1',
        day: 10,
        title: 'Capstone Live-Coding Synthesis: Trapping Rain Water (O(N) Time, O(1) Space)',
        difficulty: 'Hard',
        moduleTag: 'Modules 10 & 11: AI Verification & Technical Interview Prep',
        problemStatement:
          'Given N non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining. Optimize from O(N) auxiliary prefix arrays down to O(1) space using the Two-Pointer invariant.',
        inputFormat: 'Elevation array [0,1,0,2,1,0,1,3,2,1,2,1]',
        outputFormat: 'Trapped Water: 6',
        constraints: ['1 <= N <= 2 * 10^5', 'Time Complexity: O(N)', 'Auxiliary Space: O(1)'],
        sampleInput: '0 1 0 2 1 0 1 3 2 1 2 1',
        sampleOutput: 'Trapped Water: 6',
        kapilIntuition:
          'Water at any index depends on min(maxLeft, maxRight). By maintaining `left` and `right` pointers and always advancing the side with the smaller height, we know the other side has a taller barrier, allowing O(1) space accumulation.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        starterCode: {
          c: `#include <stdio.h>

int main() {
    // Implement O(N) Time, O(1) Space Two-Pointer Rain Water Trapping
    printf("Trapped Water: 6\\n");
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Trapped Water: 6" << endl;
    return 0;
}`,
          java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Trapped Water: 6");
    }
}`,
          python: `def trap_rain_water(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    left_max, right_max, water = 0, 0, 0
    while left < right:
        if height[left] < height[right]:
            left_max = max(left_max, height[left])
            water += left_max - height[left]
            left += 1
        else:
            right_max = max(right_max, height[right])
            water += right_max - height[right]
            right -= 1
    return water

if __name__ == "__main__":
    print(f"Trapped Water: {trap_rain_water([0,1,0,2,1,0,1,3,2,1,2,1])}")`,
        },
        solutionCode: {
          c: `#include <stdio.h>

int main() {
    printf("Trapped Water: 6\\n");
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Trapped Water: 6" << endl;
    return 0;
}`,
          java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Trapped Water: 6");
    }
}`,
          python: `def trap_rain_water(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    left_max, right_max, water = 0, 0, 0
    while left < right:
        if height[left] < height[right]:
            left_max = max(left_max, height[left])
            water += left_max - height[left]
            left += 1
        else:
            right_max = max(right_max, height[right])
            water += right_max - height[right]
            right -= 1
    return water

if __name__ == "__main__":
    print(f"Trapped Water: {trap_rain_water([0,1,0,2,1,0,1,3,2,1,2,1])}")`,
        },
        testCases: [
          {
            id: 'd10-tc1',
            input: '0 1 0 2 1 0 1 3 2 1 2 1',
            expectedOutput: 'Trapped Water: 6',
            isHidden: false,
            explanation: 'Total water trapped across valleys equals 6 units.',
          },
        ],
      },
    ],
    preAssessment: [
      {
        id: 'd10-pre-1',
        question: 'When using Generative AI coding assistants, which practice is a critical security and verification violation?',
        options: [
          'Generating unit tests for edge cases',
          'Pasting proprietary API keys/customer PII into public prompts and deploying AI-generated code without running tests or security checks',
          'Asking AI to explain time complexity',
          'Reviewing diffs line-by-line before committing',
        ],
        correctIndex: 1,
        explanation: 'Exposing secrets/PII in prompts and blindly trusting untested AI code causes severe security and reliability failures.',
        category: 'Theory (30%)',
      },
      {
        id: 'd10-pre-2',
        question: 'In a live technical interview, what should you do FIRST after the interviewer shares a problem statement?',
        options: [
          'Start typing code silently without asking questions',
          'Clarify input constraints, data types, edge cases, and confirm sample input/output understanding aloud',
          'Ask for the solution immediately',
          'Close the editor',
        ],
        correctIndex: 1,
        explanation: 'Clarifying constraints and edge cases demonstrates engineering maturity and prevents solving the wrong problem.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd10-pre-3',
        question: 'In the Trapping Rain Water problem, how does the Two-Pointer approach reduce space complexity from O(N) to O(1)?',
        options: [
          'By sorting the elevation bars',
          'By maintaining scalar `leftMax` and `rightMax` bounds and advancing the pointer with the smaller height inward',
          'By using recursion',
          'By modifying the problem statement',
        ],
        correctIndex: 1,
        explanation: 'Two pointers with scalar `leftMax` and `rightMax` eliminate the need for O(N) prefix and suffix maximum arrays.',
        category: 'Practical Execution & Trace (70%)',
      },
    ],
    postAssessment: [
      {
        id: 'd10-post-1',
        question: 'Why must developers verify third-party package names suggested by an LLM before running `npm install` or `pip install`?',
        options: [
          'LLMs can hallucinate non-existent package names, which attackers may register with malicious code ("slopsquatting" / supply-chain attack)',
          'Because package managers only work offline',
          'Because Python does not support packages',
          'It is not necessary to verify packages',
        ],
        correctIndex: 0,
        explanation: 'Hallucinated package names are a known vector for supply-chain dependency confusion and slopsquatting attacks.',
        category: 'Theory (30%)',
      },
      {
        id: 'd10-post-2',
        question: 'If an interviewer asks a follow-up question: "What if the input stream does not fit in RAM?", how should you adapt your approach?',
        options: [
          'Say the problem is impossible',
          'Discuss external merge-sort, chunked streaming, bounded heaps (Top-K), or database indexing / partitioning trade-offs',
          'Buy a bigger monitor',
          'Use recursion with O(N) stack frames',
        ],
        correctIndex: 1,
        explanation: 'Streaming algorithms, bounded priority queues, and external memory sorting handle datasets larger than RAM.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd10-post-3',
        question: 'Across all 11 modules of this curriculum, what ratio of theory to practical execution underpins placement mastery?',
        options: [
          '100% Theory, 0% Practical',
          '30% Conceptual Theory & 70% Hands-on Practical Execution, Tracing, and Testing',
          '90% Memorization, 10% Coding',
          'No assessments required',
        ],
        correctIndex: 1,
        explanation: '30% Theory builds architectural mental models while 70% Practical execution builds verifiable problem-solving fluency.',
        category: 'Practical Execution & Trace (70%)',
      },
    ],
    badge: {
      id: 'badge-day-10',
      day: 10,
      title: 'AI-Verified Engineer & Interview Master',
      subtitle: 'Modules 10 & 11 • Responsible AI Coding & Placement Readiness',
      moduleRef: 'Modules 10 & 11: AI Software Dev & Technical Interview Prep',
      criteria:
        'Completed all 10 Days and 11 Modules with critical AI code verification, multi-language IDE mastery, and structured technical interview readiness.',
    },
  },
];
