import { DayPlan } from '../types';
import { DAY_6_PROGRAMMING_NOTES } from './day6ProgrammingNotes';
import { DAY_6_PRACTICAL_CHALLENGES_10 } from './day6Challenges10';
import { DAY_6_PRE_ASSESSMENT_50, DAY_6_POST_ASSESSMENT_50 } from './day6Assessments50';
import { DAY_6_MINI_PROJECT } from './day6MiniProject';
import { DAY_7_PROGRAMMING_NOTES } from './day7ProgrammingNotes';
import { DAY_7_PRACTICAL_CHALLENGES_10 } from './day7Challenges10';
import { DAY_7_PRE_ASSESSMENT_50, DAY_7_POST_ASSESSMENT_50 } from './day7Assessments50';
import { DAY_7_MINI_PROJECT } from './day7MiniProject';
import { DAY_8_PROGRAMMING_NOTES } from './day8ProgrammingNotes';
import { DAY_8_PRACTICAL_CHALLENGES_10 } from './day8Challenges10';
import { DAY_8_PRE_ASSESSMENT_50, DAY_8_POST_ASSESSMENT_50 } from './day8Assessments50';
import { DAY_8_MINI_PROJECT } from './day8MiniProject';
import { DAY_9_PROGRAMMING_NOTES } from './day9ProgrammingNotes';
import { DAY_9_PRACTICAL_CHALLENGES_10 } from './day9Challenges10';
import { DAY_9_PRE_ASSESSMENT_50, DAY_9_POST_ASSESSMENT_50 } from './day9Assessments50';
import { DAY_9_MINI_PROJECT } from './day9MiniProject';

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
    programmingNotes: DAY_7_PROGRAMMING_NOTES,
    practicalChallenges: DAY_7_PRACTICAL_CHALLENGES_10,
    preAssessment: DAY_7_PRE_ASSESSMENT_50,
    postAssessment: DAY_7_POST_ASSESSMENT_50,
    miniProject: DAY_7_MINI_PROJECT,
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
    programmingNotes: DAY_8_PROGRAMMING_NOTES,
    practicalChallenges: DAY_8_PRACTICAL_CHALLENGES_10,
    preAssessment: DAY_8_PRE_ASSESSMENT_50,
    postAssessment: DAY_8_POST_ASSESSMENT_50,
    miniProject: DAY_8_MINI_PROJECT,
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
    programmingNotes: DAY_9_PROGRAMMING_NOTES,
    practicalChallenges: DAY_9_PRACTICAL_CHALLENGES_10,
    preAssessment: DAY_9_PRE_ASSESSMENT_50,
    postAssessment: DAY_9_POST_ASSESSMENT_50,
    miniProject: DAY_9_MINI_PROJECT,
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
