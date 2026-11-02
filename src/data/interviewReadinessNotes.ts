import { InterviewTrackModule } from '../types';

/**
 * SPSU Udaipur Placement Readiness Program
 * Mentor: Kapil | Comprehensive Interview Readiness Modules
 * Dual Tracks: Fresher (Campus / Entry-Level) & Experienced (SDE-2 / Senior / Lateral)
 */
export const INTERVIEW_READINESS_MODULES: InterviewTrackModule[] = [
  // ==========================================
  // FRESHER TRACK (MODULES 1 to 5)
  // ==========================================
  {
    id: 'fresher-mod-1',
    track: 'fresher',
    title: 'The Fresher Placement Blueprint: DSA, Online Assessments & Coding Rounds',
    subtitle: 'From Screening Rounds to Final Technical Offers in Product & Service Enterprises',
    estimatedReadTime: '15 Mins',
    summary:
      'A comprehensive roadmap designed by Mentor Kapil for college students and fresh graduates. Covers high-yield Data Structures and Algorithms (Arrays, Two Pointers, Sliding Window, Trees, Graphs, DP), online assessment (OA) test strategies, time-management under proctoring, and how tier-1 companies filter candidates.',
    keyTakeaways: [
      'Master the "Top 75" LeetCode patterns rather than grinding 1,000 disconnected questions.',
      'Always start OA questions with brute force verification before optimizing to avoid edge-case zeroes.',
      'Understand the difference between online platform testing (hidden corner test cases) and in-person interviews.',
      'Time allocation: 20 mins for Easy, 35 mins for Medium in typical 90-minute 2-question online assessments.',
    ],
    kapilMentorTips: [
      'Interviewers in campus hiring care 70% about your problem-solving thought process and 30% about syntax correctness. Always communicate your thoughts out loud.',
      'Never write code until you have validated your approach on a sample input with the interviewer.',
      'Keep track of Big-O time and auxiliary space complexity before typing the first line of code.',
    ],
    deepDiveMarkdown: `### 1. The Anatomy of Modern Campus Hiring

Campus recruitment across Tier-1 tech giants (Amazon, Microsoft, Google, Adobe, Cisco) and top IT consulting leaders (TCS Digital, Infosys SP/DSE, Cognizant, Wipro Turbo) operates through a standardized 4-stage funnel:

\`\`\`
[1. Resume ATS Screen] ➔ [2. Online Assessment (OA)] ➔ [3. Technical Round 1 & 2] ➔ [4. Techno-HR & Leadership]
\`\`\`

#### Stage 1: The Online Assessment (OA)
- **Format**: Typically 2 to 3 coding problems in 75–90 minutes on HackerRank, CodeSignal, or HackerEarth.
- **Scoring**: Automated unit test suites. 30% visible test cases, 70% hidden edge-case tests (Time Limit Exceeded TLE, integer overflow, empty constraints).
- **Survival Strategy**: 
  1. Solve the simplest problem first to secure base points.
  2. Watch out for $10^5$ constraints requiring $O(N)$ or $O(N \\log N)$ solutions. An $O(N^2)$ solution will fail with TLE on large test cases.
  3. Use 64-bit integers (\`long long\` in C++, \`long\` in Java) when summing values up to $10^9$.

#### Stage 2: The Core DSA Patterns Every Fresher Must Master
| Pattern Name | Core Data Structure | Typical Placement Problem | Optimal Complexity |
|---|---|---|---|
| **Two Pointers** | Array / String | Pair with Target Sum, Trapping Rainwater | $O(N)$ Time, $O(1)$ Space |
| **Sliding Window** | Array / Hash Map | Longest Substring Without Repeating Characters | $O(N)$ Time, $O(K)$ Space |
| **Fast & Slow Pointers** | Linked List | Detect Cycle in Linked List, Middle of List | $O(N)$ Time, $O(1)$ Space |
| **Topological Sort** | Directed Graph | Course Schedule, Build Dependency Resolution | $O(V + E)$ Time, $O(V)$ Space |
| **Monotonic Stack** | Stack | Next Greater Element, Largest Rectangle in Histogram | $O(N)$ Time, $O(N)$ Space |
| **Breadth-First Search** | Queue / Matrix | Shortest Path in Binary Maze, Rotting Oranges | $O(V + E)$ Time, $O(V)$ Space |
| **Dynamic Programming** | 1D / 2D Table | 0/1 Knapsack, Coin Change, Longest Common Subsequence | $O(N \\times W)$ Time & Space |`,
    codeSnippets: [
      {
        language: 'java',
        title: 'Two Pointer Technique (Pair Sum in Sorted Array)',
        code: `public class TwoSumSorted {
    public static int[] findPair(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) return new int[]{left, right};
            else if (sum < target) left++;
            else right--;
        }
        return new int[]{-1, -1}; // Not found
    }
}`,
      },
      {
        language: 'python',
        title: 'Sliding Window (Longest Substring Without Repeating Characters)',
        code: `def length_of_longest_substring(s: str) -> int:
    char_index = {}
    max_len = 0
    left = 0
    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1
        char_index[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
      },
    ],
    sampleInterviewQA: [
      {
        question: 'How do you decide whether to use BFS or DFS when exploring a graph or tree?',
        interviewerExpectation:
          'Evaluates if the candidate understands shortest-path guarantees vs memory overhead in tree traversals.',
        idealAnswer:
          'I choose BFS when finding the shortest path on unweighted graphs or level-order relationships because BFS explores nodes radially level-by-level using a Queue. I choose DFS when checking for cycles, exhaustive path existence, backtracking, or topological ordering using recursion or a Stack, since DFS has an $O(H)$ stack memory footprint compared to $O(W)$ breadth width in BFS.',
        redFlagsToAvoid:
          'Saying "BFS and DFS are identical and you can just pick whichever you like better."',
      },
    ],
  },
  {
    id: 'fresher-mod-2',
    track: 'fresher',
    title: 'Cracking the Live Technical Interview: 7-Step Whiteboard Protocol',
    subtitle: 'How to Impress Interviewers When You Don’t Immediately Know the Full Solution',
    estimatedReadTime: '18 Mins',
    summary:
      'Technical rounds can be daunting. Placement Mentor Kapil details the battle-tested 7-Step Protocol used by top college hires to turn high-stress coding interviews into collaborative pairing sessions with the interviewer.',
    keyTakeaways: [
      'Step 1: Clarify Requirements & Scope. Ask about constraints, null inputs, and negatives.',
      'Step 2: Propose Concrete Examples (including base and edge cases).',
      'Step 3: State the Brute Force Approach First. Establish an upper baseline.',
      'Step 4: Optimize using Patterns & Trade-offs (Space vs Time).',
      'Step 5: Verbally Dry-Run Before Writing Code.',
      'Step 6: Write Clean, Modular, Production-Grade Code (meaningful variable names, no shortcuts).',
      'Step 7: Trace Code with Test Cases & Walk Through Complexity.',
    ],
    kapilMentorTips: [
      'Silence is your biggest enemy in an interview. When thinking, say: "I am considering two approaches here: one using a Hash Map for O(1) lookups at the cost of O(N) memory, and another by sorting the array first..."',
      'If you get stuck, re-examine the problem constraints. A constraint like N <= 20 signals exponential or bitmask DP, while N <= 10^5 mandates O(N log N) or O(N).',
      'Welcome interviewer hints! Interviewers give hints to see how receptive and coachable you are.',
    ],
    deepDiveMarkdown: `### The 7-Step Technical Interview Framework

In top tech interviews, the interviewer is evaluating: **"Would I enjoy pair-programming and debugging with this candidate every day?"**

#### The 7 Steps Walkthrough:
1. **Clarify Constraints (2–3 mins)**:
   - *"Can the input array contain negative numbers or duplicates?"*
   - *"What is the maximum size of N? Can the string be empty or null?"*
   - *"Should the return index be 0-indexed or 1-indexed?"*

2. **Work Through Examples (3 mins)**:
   - Provide a normal example: \`nums = [2, 7, 11, 15], target = 9\`
   - Provide an edge-case example: \`nums = [3, 3], target = 6\`
   - Provide an empty/no-match example: \`nums = [1, 2], target = 5\`

3. **Brute Force Baseline (2 mins)**:
   - *"We can check every pair using two nested loops in $O(N^2)$ time and $O(1)$ space. Can we do better?"*

4. **Optimal Design & Data Structure Selection (5 mins)**:
   - *"If we trade memory for speed, we can store visited elements in a Hash Map to reduce lookups to $O(1)$, achieving $O(N)$ total time."*

5. **Dry-Run the Algorithm (3 mins)**:
   - Trace with a quick table before writing code:
     \`\`\`
     Iter 1: num = 2, complement = 7, map = {2: 0}
     Iter 2: num = 7, complement = 2 (Found in map at index 0!) -> Return [0, 1]
     \`\`\`

6. **Implement with Production Quality (10–12 mins)**:
   - Avoid single-letter variables like \`x\`, \`y\`, \`z\` (except standard \`i\`, \`j\` loops).
   - Write defensive checks at the top: \`if (nums == null || nums.length < 2) return new int[0];\`

7. **Test & Analyze (3 mins)**:
   - Walk through the code line by line with an edge case.
   - Conclude clearly: *"Time complexity is $O(N)$ because each element is inserted and checked once in average $O(1)$ time. Space complexity is $O(N)$ for the hash map."*`,
    codeSnippets: [
      {
        language: 'cpp',
        title: 'Clean Modular C++ Implementation with Edge Case Handling',
        code: `#include <vector>
#include <unordered_map>
#include <stdexcept>

using namespace std;

class Solution {
public:
    vector<int> twoSum(const vector<int>& nums, int target) {
        // Defensive check
        if (nums.size() < 2) return {};

        unordered_map<int, int> numToIndex;
        for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
            int complement = target - nums[i];
            auto it = numToIndex.find(complement);
            if (it != numToIndex.end()) {
                return {it->second, i};
            }
            numToIndex[nums[i]] = i;
        }
        return {}; // No pair found
    }
};`,
      },
    ],
    sampleInterviewQA: [
      {
        question: 'What do you do if you realize halfway through writing code that your approach has a fundamental bug?',
        interviewerExpectation: 'Tests emotional composure, honesty, and analytical resilience under pressure.',
        idealAnswer:
          'I immediately pause, communicate the discovery openly to the interviewer, explain why the current assumption breaks (e.g., "I notice that this greedy choice fails when elements have negative values"), and discuss a quick pivot—such as transitioning to dynamic programming or a monotonic stack—rather than silently writing buggy code.',
        redFlagsToAvoid:
          'Trying to hide the bug, hoping the interviewer will not notice, or freezing up in silence.',
      },
    ],
  },
  {
    id: 'fresher-mod-3',
    track: 'fresher',
    title: 'Core CS Subjects Rapid Revision: OOPs, DBMS, OS & Networks',
    subtitle: 'The 4 Pillars of Every Campus Placement Technical Interview',
    estimatedReadTime: '20 Mins',
    summary:
      'Tier-1 and Tier-2 product engineering companies almost always spend 20–30 minutes probing core computer science fundamentals. This module condenses OOPs (Polymorphism, Abstraction, Encapsulation, Inheritance), DBMS (ACID, Normalization, Indexing), OS (Processes vs Threads, Deadlocks, Paging), and Networks (TCP/UDP, DNS, HTTP) into rapid interview answers.',
    keyTakeaways: [
      'OOPs: Compile-time polymorphism (Method Overloading) vs Runtime polymorphism (Method Overriding & Virtual Tables).',
      'DBMS: ACID properties (Atomicity, Consistency, Isolation, Durability) and B+ Tree indexing benefits.',
      'OS: The 4 Coffman conditions for Deadlock and how Mutex differs from Counting Semaphore.',
      'Networks: Exactly what happens step-by-step when you type https://google.com into your browser.',
    ],
    kapilMentorTips: [
      'Whenever asked an OOPs concept, always provide a real-world software entity example (e.g., PaymentGateway base class with PayPal/Stripe subclasses) rather than generic Dog/Animal examples.',
      'For DBMS, be ready to write raw SQL joins (INNER, LEFT, RIGHT, FULL) and explain why indexing on high-cardinality columns speeds up queries.',
    ],
    deepDiveMarkdown: `### 1. Object-Oriented Programming (OOP) Essentials

#### The 4 Core Pillars:
1. **Encapsulation**: Bundling state and behaviors into a class while restricting direct access via private fields and public getters/setters. Promotes data integrity.
2. **Abstraction**: Hiding internal implementation complexity and presenting only essential interfaces (Interfaces / Abstract Classes in Java/C++).
3. **Inheritance**: Mechanism where a child class acquires fields and behaviors of a parent class (\`is-a\` relationship), facilitating code reuse.
4. **Polymorphism**: Ability for an entity to take multiple forms.
   - *Compile-Time (Static)*: Method Overloading (same method name, different parameter signature).
   - *Runtime (Dynamic)*: Method Overriding (subclass overrides parent method; resolved dynamically via vtable pointer).

---

### 2. Database Management Systems (DBMS)

#### The ACID Guarantee:
- **Atomicity**: All operations in a transaction succeed, or the entire transaction rolls back ("All-or-Nothing").
- **Consistency**: The database transitions from one valid state to another, preserving all schema constraints and foreign keys.
- **Isolation**: Concurrent transactions execute without interfering with one another (Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable).
- **Durability**: Once a transaction commits, its writes persist permanently even across power failures (via Write-Ahead Logging WAL).

---

### 3. Operating Systems (OS)
- **Process vs Thread**: A process has its own isolated virtual address space (code, data, heap, file descriptors). A thread is a lightweight execution unit inside a process that shares the heap, data, and code segments, but owns its private program counter and call stack.
- **Deadlock Coffman Conditions**:
  1. *Mutual Exclusion*: Exclusive resource lock.
  2. *Hold and Wait*: Holding one resource while requesting another.
  3. *No Preemption*: Resources cannot be forcibly seized.
  4. *Circular Wait*: Closed chain of processes waiting on each other.

---

### 4. Computer Networks (CN)
- **URL Navigation Flow**:
  1. Browser checks local cache -> OS cache -> Resolver -> Root -> TLD -> Authoritative DNS server to resolve IP.
  2. TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK.
  3. TLS Handshake: Client Hello -> Server Hello + Certificate -> Key Exchange -> Encrypted symmetric communication.
  4. HTTP Request sent -> Server processes via Reverse Proxy -> HTTP 200 OK Response streamed -> DOM parsed and rendered.`,
    codeSnippets: [
      {
        language: 'sql',
        title: 'Top SQL Interview Query: Second Highest Salary with CTE & Window Function',
        code: `-- Approach 1: Dense Rank Window Function (Handles ties cleanly)
WITH RankedSalaries AS (
    SELECT id, name, salary,
           DENSE_RANK() OVER (ORDER BY salary DESC) as salary_rank
    FROM Employees
)
SELECT salary FROM RankedSalaries
WHERE salary_rank = 2
LIMIT 1;

-- Approach 2: Subquery with MAX
SELECT MAX(salary) AS SecondHighestSalary
FROM Employees
WHERE salary < (SELECT MAX(salary) FROM Employees);`,
      },
    ],
    sampleInterviewQA: [
      {
        question: 'Why do relational databases use B+ Trees rather than Binary Search Trees (BST) or Hash Indexes for table indexing?',
        interviewerExpectation: 'Tests understanding of hardware disk I/O, block paging, and range query access patterns.',
        idealAnswer:
          'B+ Trees have high fan-out (thousands of child pointers per node), which minimizes disk I/O seek depth to typically 3 to 4 levels even for millions of records. Furthermore, in a B+ Tree, all data records are stored exclusively in leaf nodes linked sequentially by pointers, making range queries (e.g., BETWEEN 10 AND 50) extremely fast with single sequential disk scans, whereas BSTs have excessive height and Hash Indexes cannot support range searches.',
        redFlagsToAvoid:
          'Stating that Hash Indexes are always better for all database queries.',
      },
    ],
  },
  {
    id: 'fresher-mod-4',
    track: 'fresher',
    title: 'ATS-Friendly Resume Engineering & GitHub Portfolio for Freshers',
    subtitle: 'How to Get Your Resume Shortlisted by Top Tech Recruiters & ATS Scanners',
    estimatedReadTime: '12 Mins',
    summary:
      'Over 75% of campus and off-campus resumes are discarded by Applicant Tracking Systems (ATS) before a human engineer ever reads them. Mentor Kapil breaks down the single-column ATS resume layout, the Google "X-Y-Z" bullet formula, and what makes a GitHub portfolio stand out.',
    keyTakeaways: [
      'Use a clean single-column format without tables, text boxes, icons, or graphical rating bars.',
      'Format every project bullet with the formula: Accomplished [X] measured by [Y] by doing [Z].',
      'Include live deployment links (Vercel, AWS, GitHub Pages) and clean public GitHub repositories with descriptive READMEs.',
      'Tailor skills and keyword tags directly matching the job description.',
    ],
    kapilMentorTips: [
      'Never list "C, C++, Java, Python, Go, Rust, Ruby" all together unless you can write production code in each. Claiming 8 programming languages invites interviewers to ask difficult language-internals questions.',
      'Replace vague bullets like "Created an e-commerce website" with: "Architected a full-stack e-commerce REST API handling 5,000 requests/sec with JWT authentication and Redis caching, cutting P99 query latency by 42%."',
    ],
    deepDiveMarkdown: `### The ATS Resume Architecture

#### The 5 Essential Sections:
1. **Header**: Name, Professional Email, Phone, LinkedIn URL, GitHub URL, Portfolio Link (No home address, photos, or marital status).
2. **Education**: Degree, Major, University (SPSU Udaipur), Graduation Year, CGPA.
3. **Technical Skills**:
   - *Languages*: Java, Python, C++, SQL, TypeScript
   - *Frameworks & Tools*: React, Spring Boot, Node.js, Express, Tailwind CSS
   - *Databases & Cloud*: PostgreSQL, MongoDB, Redis, Docker, Git, AWS (S3, EC2)
4. **Engineering Projects (2–3 impactful projects)**:
   - Must demonstrate full-stack or systems complexity, not basic tutorials (no basic Todo lists or calculators).
5. **Achievements & Certifications**:
   - Hackathon finalist, LeetCode contest rating, Open Source contributions, Academic rank.

---

### The Google "X-Y-Z" Bullet Formula
Instead of describing duties, describe **measurable engineering impact**:

\`\`\`
Accomplished [X] as measured by [Y], by doing [Z]
\`\`\`

- **Weak**: *"Built an authentication system for the college portal."*
- **Strong**: *"Engineered a role-based access control (RBAC) authentication microservice in Spring Boot and JWT, securing 1,200 active student records with zero unauthorized breaches."*

- **Weak**: *"Worked on database performance."*
- **Strong**: *"Optimized PostgreSQL query execution by introducing compound B-Tree indexes and Redis caching, slashing API response time from 380ms to 45ms (88% reduction)."*`,
    codeSnippets: [],
    sampleInterviewQA: [
      {
        question: 'Walk me through your most challenging engineering project on your resume.',
        interviewerExpectation: 'Tests project authenticity, depth of ownership, problem-solving, and technical passion.',
        idealAnswer:
          'I built an automated network packet sniffer and CIDR route forwarding engine in C++ and Python. The hardest bottleneck occurred when processing high packet volumes—the application began dropping incoming frames due to socket buffer overflow. I diagnosed the issue using memory profiling, discovered that synchronous disk logging was blocking the event loop, and refactored the pipeline into a producer-consumer architecture using an asynchronous ring buffer and worker thread pool, boosting sustained throughput by 3.5x.',
        redFlagsToAvoid:
          'Saying: "It was a team project and my friend handled the backend so I do not know how the database was set up."',
      },
    ],
  },
  {
    id: 'fresher-mod-5',
    track: 'fresher',
    title: 'HR, Behavioral & Cultural Fit Mastery: The STAR Method for Freshers',
    subtitle: 'Answering Tricky Behavioral Questions and Standing Out in Techno-HR Rounds',
    estimatedReadTime: '15 Mins',
    summary:
      'Technical competence opens the interview door, but behavioral and cultural fit decides who receives the offer letter. Placement Mentor Kapil explains how freshers can structure responses using the STAR method, handle the classic "Tell me about yourself" opener, and address weaknesses without sabotaging their chances.',
    keyTakeaways: [
      'Master the STAR framework: Situation, Task, Action, Result.',
      'Structure "Tell Me About Yourself" chronologically in 90 seconds: Past (Education), Present (Key Projects/Skills), Future (Why this role).',
      'Never cite a fake weakness like "I am too much of a perfectionist." Share a genuine technical growth area and how you actively mitigated it.',
      'Always prepare 3 thoughtful questions for the interviewer at the end of the round.',
    ],
    kapilMentorTips: [
      'When asked why you want to join the company, never say "because of the brand and salary." Mention a specific product architecture, engineering blog post, or open-source initiative the company leads.',
      'Spend 60% of your STAR answer time on the "Action" component—what YOU personally did, not just what the group did.',
    ],
    deepDiveMarkdown: `### The STAR Framework

\`\`\`
[S] Situation: Set the context (Where? When? What project?) - 15%
[T] Task: The challenge or obstacle faced - 15%
[A] Action: The specific engineering steps YOU spearheaded - 55%
[R] Result: The quantified outcome, learning, or impact - 15%
\`\`\`

#### Example: "Tell me about a time you faced a tight deadline or project conflict."
- **Situation**: During our 5th-semester capstone sprint, our team had 48 hours remaining before final evaluation.
- **Task**: Our payment gateway integration suddenly failed due to a breaking third-party API deprecation.
- **Action**: I scheduled an emergency 15-minute alignment, created a mock testing sandbox, refactored the HTTP request client to the new OAuth 2.0 endpoint specifications, and pair-programmed with my teammate through the night to update the schema migrations.
- **Result**: We submitted the project 4 hours before deadline, achieved 100% test suite pass rate, and secured the top project grade in the department.

---

### Questions to Ask the Interviewer (The 3 Best End-of-Interview Questions):
1. *"What does the typical day-to-day deployment and release cycle look like for an entry-level engineer on your team?"*
2. *"I read on your engineering blog that your team recently migrated services to Kubernetes. What was the biggest architectural hurdle during that transition?"*
3. *"What is one key attribute that distinguishes good freshers from great freshers within their first 6 months here?"*`,
    codeSnippets: [],
    sampleInterviewQA: [
      {
        question: 'Why should we hire you over other candidates from other universities?',
        interviewerExpectation: 'Tests self-awareness, confidence without arrogance, and clarity of value proposition.',
        idealAnswer:
          'While many candidates have strong academic qualifications, what sets me apart is my proven discipline in writing production-ready, test-driven code. Through the SPSU 10-Day Placement Readiness Boot Camp, I have built real-world microservices with Redis caching, simulated operating system schedulers, and solved over 200 algorithmic challenges across multiple languages. I combine fundamental theoretical rigor with practical problem-solving velocity, allowing me to contribute productively to your team from week one.',
        redFlagsToAvoid:
          'Belittling other candidates or boasting with unsupported claims.',
      },
    ],
  },

  // ==========================================
  // EXPERIENCED TRACK (MODULES 6 to 10)
  // ==========================================
  {
    id: 'exp-mod-6',
    track: 'experienced',
    title: 'The SDE-2 & Senior Career Matrix: Beyond Syntax to Engineering Ownership',
    subtitle: 'Navigating Lateral Hiring, System Ownership, and Mid-to-Senior Engineering Standards',
    estimatedReadTime: '20 Mins',
    summary:
      'Transitioning from an entry-level SDE-1 to an SDE-2 or Senior Software Engineer requires a paradigm shift. Companies (Google, Meta, Uber, Swiggy, Flipkart) expect autonomous technical ownership, system scalability intuition, operational excellence, and cross-functional leadership.',
    keyTakeaways: [
      'SDE-1 focuses on tasks and tickets; SDE-2 focuses on features and components; Senior SDE owns end-to-end systems and technical roadmaps.',
      'Lateral interviews prioritize System Design (HLD/LLD) and past architectural impact over pure puzzle DSA.',
      'Operational Excellence: Monitoring, SLO/SLA management, CI/CD canary deployments, and PagerDuty on-call readiness.',
      'Code reviews should focus on extensibility, concurrency bugs, and architectural maintainability.',
    ],
    kapilMentorTips: [
      'In lateral interviews, never talk about what "we" did in passive voice. Frame your answers with clear technical ownership: "I designed the schema migration strategy, I chose DynamoDB over Postgres because...", and "I resolved the P99 latency spike."',
      'Demonstrate business empathy: understand the cost per transaction and infrastructure spending implications of your technical choices.',
    ],
    deepDiveMarkdown: `### The Engineering Career Progression Spectrum

| Attribute | SDE-1 (0–2 Yrs) | SDE-2 (2–5 Yrs) | Senior / Staff SDE (5+ Yrs) |
|---|---|---|---|
| **Scope of Work** | Assigned tasks & bug fixes | Subsystem / Feature ownership | System architecture & roadmaps |
| **Autonomy** | Requires code review guidance | Self-directed; reviews others | Sets architectural standards |
| **System Design** | Understands components | Designs robust scalable services | Designs distributed ecosystems |
| **Production Impact** | Fixes reported issues | Drives Root Cause Analysis (RCA) | Eliminates systemic failure modes |
| **Mentorship** | Learns from seniors | Mentors interns & SDE-1s | Grows team engineering culture |

---

### Key Areas Evaluated in Lateral Hiring:
1. **High-Level Design (HLD)**: Microservices, Caching (Redis), Load Balancers, Event Streaming (Kafka), DB Sharding.
2. **Low-Level Design (LLD)**: SOLID Principles, Clean Architecture, Design Patterns (Factory, Strategy, Observer, Decorator).
3. **Production Debugging**: Analyzing stack traces, memory dumps, deadlocks, GC pauses, slow query execution plans.
4. **Behavioral Leadership**: Cross-team alignment, handling technical debt vs feature velocity trade-offs.`,
    codeSnippets: [],
    sampleInterviewQA: [
      {
        question: 'How do you handle technical debt when product managers are pushing hard for new feature delivery?',
        interviewerExpectation: 'Tests pragmatic engineering maturity, negotiation skills, and business value alignment.',
        idealAnswer:
          'I do not treat technical debt as an abstract purity issue; I translate technical debt into business risk and velocity impact. If an un-refactored service causes a 20% increase in production bugs and slows future feature delivery, I quantify this cost for product managers. I advocate for allocating a consistent 15–20% of every sprint to tech debt remediation and refactoring, prioritizing areas with high churn or high outage risk.',
        redFlagsToAvoid:
          'Saying "Product managers do not understand tech so I just rewrite code in secret without telling them."',
      },
    ],
  },
  {
    id: 'exp-mod-7',
    track: 'experienced',
    title: 'Low-Level Design (LLD), Object-Oriented Modeling & Design Patterns',
    subtitle: 'Designing Extensible, Testable, and Maintainable Software Components',
    estimatedReadTime: '22 Mins',
    summary:
      'Low-Level Design (LLD) or Machine Coding rounds test whether an engineer can translate ambiguous business requirements into clean, object-oriented code adhering to SOLID principles and industry design patterns within 90 minutes.',
    keyTakeaways: [
      'SOLID Principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.',
      'Creational Patterns: Factory, Builder, Singleton (Thread-safe Double-Checked Locking).',
      'Structural Patterns: Adapter, Decorator, Facade, Composite.',
      'Behavioral Patterns: Strategy, Observer, Command, State, Chain of Responsibility.',
    ],
    kapilMentorTips: [
      'In LLD interviews, always write the core Interfaces and Enums first before writing concrete classes.',
      'Avoid premature optimization: make the code modular and easily extendable with zero tight coupling.',
    ],
    deepDiveMarkdown: `### 1. SOLID Principles in Action

1. **S - Single Responsibility Principle (SRP)**: A class should have only one reason to change.
   - *Violation*: \`Invoice\` class calculating totals, saving to SQL DB, and sending emails.
   - *Fix*: Separate into \`InvoiceCalculator\`, \`InvoiceRepository\`, and \`NotificationService\`.

2. **O - Open/Closed Principle (OCP)**: Software entities should be open for extension, but closed for modification.
   - *Fix*: Use the **Strategy Pattern** for payment processing (\`PaymentStrategy\` interface with \`CreditCardStrategy\`, \`UPIStrategy\`, \`CryptoStrategy\`). Adding a new payment method does not alter existing code.

3. **L - Liskov Substitution Principle (LSP)**: Subtypes must be substitutable for their base types without altering correctness.
   - *Violation*: Subclass \`Square\` extending \`Rectangle\` and overriding \`setWidth\` to alter height.

4. **I - Interface Segregation Principle (ISP)**: Clients should not be forced to depend on interfaces they do not use. Prefer many small, focused interfaces over one monolithic interface.

5. **D - Dependency Inversion Principle (DIP)**: High-level modules should not depend on low-level modules; both should depend on abstractions.

---

### 2. High-Yield LLD Design Patterns:
- **Strategy Pattern**: Define a family of algorithms, encapsulate each one, and make them interchangeable at runtime.
- **Observer Pattern**: Publish-subscribe model where state change in a subject notifies registered observers automatically.
- **Factory Method**: Delegates object instantiation to subclasses without specifying concrete classes in caller code.
- **Builder Pattern**: Constructs complex objects step-by-step; eliminates telescoping constructors with multiple arguments.`,
    codeSnippets: [
      {
        language: 'java',
        title: 'Strategy Pattern Implementation for Payment Processing in Java',
        code: `// 1. Strategy Interface
public interface PaymentStrategy {
    void pay(double amount);
}

// 2. Concrete Strategies
public class UPIPayment implements PaymentStrategy {
    private String upiId;
    public UPIPayment(String upiId) { this.upiId = upiId; }
    @Override
    public void pay(double amount) {
        System.out.println("Processing ₹" + amount + " via UPI ID: " + upiId);
    }
}

public class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;
    public CreditCardPayment(String cardNumber) { this.cardNumber = cardNumber; }
    @Override
    public void pay(double amount) {
        System.out.println("Processing ₹" + amount + " via Card: " + cardNumber);
    }
}

// 3. Context
public class ShoppingCart {
    private PaymentStrategy paymentStrategy;
    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }
    public void checkout(double total) {
        if (paymentStrategy == null) throw new IllegalStateException("Payment strategy not set");
        paymentStrategy.pay(total);
    }
}`,
      },
    ],
    sampleInterviewQA: [
      {
        question: 'Design a thread-safe Singleton in Java or C++. What is Double-Checked Locking and why is volatile necessary?',
        interviewerExpectation: 'Tests understanding of multi-threading memory models, instruction reordering, and atomic references.',
        idealAnswer:
          'In Java, double-checked locking checks the instance twice—once without synchronization for fast retrieval, and once inside a synchronized block before creation. The instance variable MUST be declared \`volatile\` to prevent the JVM compiler and CPU from reordering instructions (allocating memory, assigning reference, then running constructor), which could otherwise expose a half-initialized object reference to concurrent threads.',
        redFlagsToAvoid:
          'Implementing a simple non-synchronized Singleton or claiming that synchronizing the whole getInstance() method has no performance cost.',
      },
    ],
  },
  {
    id: 'exp-mod-8',
    track: 'experienced',
    title: 'High-Level System Design (HLD): Scalability, Caching & Microservices',
    subtitle: 'Architecting Distributed Systems for Millions of Concurrent Users',
    estimatedReadTime: '25 Mins',
    summary:
      'High-Level Design rounds evaluate an experienced engineer’s ability to design planetary-scale distributed systems (e.g., Design URL Shortener, Twitter Feed, Uber Dispatch, WhatsApp Chat). Mentor Kapil breaks down the canonical 45-minute HLD interview framework.',
    keyTakeaways: [
      'The 4-Step HLD Template: 1) Requirements & Capacity Estimation, 2) High-Level Architecture, 3) Detailed Component Design, 4) Bottlenecks & Failure Modes.',
      'CAP Theorem & PACELC: Understanding why you cannot have both Strong Consistency and High Availability in a network partition.',
      'Caching Strategies: Cache-Aside, Write-Through, Write-Back; Eviction policies: LRU, LFU; Cache Stampede defense.',
      'Database Scaling: Read Replicas, Horizontal Sharding, Consistent Hashing, Polyglot Persistence.',
    ],
    kapilMentorTips: [
      'Never jump straight into drawing boxes. Spend the first 5 minutes clarifying scale: Daily Active Users (DAU), Read:Write ratio, QPS, latency SLAs, and storage volume.',
      'Always calculate throughput numbers: 100 Million daily active users making 10 requests = 1 Billion requests/day = ~12,000 QPS average (~25,000 peak QPS).',
    ],
    deepDiveMarkdown: `### The 4-Step HLD Interview Blueprint

#### Step 1: Requirements & Estimations (5–7 mins)
- **Functional Requirements**: Top 3 critical features (e.g., Shorten URL, Redirect URL, Track Click Analytics).
- **Non-Functional Requirements**: High availability (99.99%), low latency (<20ms redirect), data durability.
- **Traffic Math**:
  - 100M URLs created/year = ~3 URLs/sec write traffic.
  - Read:Write ratio = 100:1 ➔ Read traffic = 300 QPS.
  - Storage: 100M URLs × 500 bytes = 50 GB/year (manageable on a single database, but needs replication for availability).

#### Step 2: High-Level Architecture (10 mins)
Draw the end-to-end data flow:
\`\`\`
[Clients] ➔ [Route 53 DNS] ➔ [API Gateway / Load Balancer]
                                    |
            +-----------------------+-----------------------+
            |                                               |
    [URL Service Microservice]                      [Analytics Service]
            |                                               |
    +-------+-------+                               [Kafka Topic]
    |               |                                       |
[Redis Cache]  [PostgreSQL / DynamoDB]             [ClickHouse / BigQuery]
\`\`\`

#### Step 3: Deep Dive into Core Bottlenecks (15 mins)
- **Key Generation Service (KGS)**: Pre-generate unique Base62 tokens (6–7 characters) into a token buffer in Redis or DB to eliminate collision overhead on writes.
- **Database Partitioning**: Shard by hash of short URL key using Consistent Hashing to avoid hotspotting.

#### Step 4: Resiliency, Failure Modes & Edge Cases (10 mins)
- What happens when Redis cache fails? (Fall back to read-replicas; rate limit to prevent DB thrashing).
- How to handle cache stampede? (Use Mutex locking or probabilistic early expiration).`,
    codeSnippets: [
      {
        language: 'python',
        title: 'Base62 Bijective Encoding for URL Shortener',
        code: `CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode_base62(num: int) -> str:
    if num == 0:
        return CHARS[0]
    res = []
    while num > 0:
        res.append(CHARS[num % 62])
        num //= 62
    return "".join(reversed(res))

def decode_base62(s: str) -> int:
    num = 0
    for char in s:
        num = num * 62 + CHARS.index(char)
    return num`,
      },
    ],
    sampleInterviewQA: [
      {
        question: 'What is Consistent Hashing and why is it preferred over simple modulo hashing (hash(key) % N) in distributed caches?',
        interviewerExpectation: 'Tests distributed systems theory, dynamic node addition, and minimizing cache invalidation.',
        idealAnswer:
          'In simple modulo hashing \`hash(key) % N\`, when a cache server is added or removed, nearly all keys re-map to new servers, causing a catastrophic cache miss storm. Consistent Hashing maps both servers and keys to a 360-degree hash ring. When a server is added or removed, only $K/N$ keys need to be migrated (where $K$ is total keys and $N$ is server count). Furthermore, introducing Virtual Nodes distributes data evenly and prevents hot spots.',
        redFlagsToAvoid:
          'Not knowing what happens to neighboring nodes on the ring when a node crashes.',
      },
    ],
  },
  {
    id: 'exp-mod-9',
    track: 'experienced',
    title: 'Production Outage Triage, Root Cause Analysis (RCA) & Site Reliability',
    subtitle: 'Debugging High-Severity Incidents, P99 Latency, Deadlocks & Memory Leaks',
    estimatedReadTime: '20 Mins',
    summary:
      'Senior engineers distinguish themselves during production outages. Interviewers assess your incident management maturity: triaging live outages, using observability tools (Prometheus, Grafana, Jaeger, ELK), mitigating user impact first, and conducting blameless Post-Mortems / RCAs.',
    keyTakeaways: [
      'Golden Rule of Incident Response: Mitigate first, investigate second (Roll back, divert traffic, scale out, failover).',
      'The 4 Golden Signals of SRE: Latency, Traffic, Errors, Saturation.',
      'Root Cause Analysis (RCA) Framework: The "5 Whys" methodology to identify systemic process/code failures.',
      'Diagnosing JVM / Linux Bottlenecks: Thread Dumps, Heap Dumps, GC Logs, Top/VMStat commands.',
    ],
    kapilMentorTips: [
      'During scenario questions about a live production outage, NEVER say: "I will open the code in my IDE and start debugging." The correct answer is: "First, I mitigate customer impact by rolling back the latest deployment or flipping a feature flag."',
      'Mention blameless post-mortems: focusing on fixing systems, monitoring alerts, and guardrails rather than assigning individual human blame.',
    ],
    deepDiveMarkdown: `### The Incident Management Lifecycle

\`\`\`
[1. Detection (Alert)] ➔ [2. Triage & Severity] ➔ [3. Mitigation] ➔ [4. Resolution] ➔ [5. Blameless RCA]
\`\`\`

#### Triaging P99 Latency Spikes:
1. **Check Infrastructure Metrics**: CPU, Memory, Disk I/O, Network Bandwidth.
2. **Check Database Health**: Active connection pool exhaustion, slow queries, unindexed table scans, row-level locks.
3. **Check Downstream Dependencies**: Third-party payment gateway or external API throttling.
4. **Check Garbage Collection (GC)**: Long "Stop-The-World" GC pauses due to memory fragmentation or memory leaks.

---

### The "5 Whys" RCA Structure
- **Problem**: E-commerce checkout service went down for 45 minutes on Black Friday.
  - *Why 1*: Database connection pool ran out of available connections.
  - *Why 2*: Database queries took 12 seconds instead of 10ms.
  - *Why 3*: A newly deployed query performed a sequential table scan on 50 million orders.
  - *Why 4*: The migration script adding the foreign key index was omitted in the CI/CD pipeline.
  - *Why 5*: The staging database was too small (1,000 rows) so sequential scan did not trigger an alert in pre-prod.
- **Action Items**: 
  1. Add automated CI/CD check verifying EXPLAIN plan has no table scans before deployment.
  2. Implement database query timeout of 2,000ms.
  3. Mirror production data scale in staging benchmark tests.`,
    codeSnippets: [],
    sampleInterviewQA: [
      {
        question: 'Your production microservice suddenly experiences a memory leak and crashes every 3 hours with OutOfMemoryError (OOM). How do you identify and fix it?',
        interviewerExpectation: 'Tests hands-on production profiling, memory dump analysis, and root cause discovery.',
        idealAnswer:
          'First, I configure the JVM flag \`-XX:+HeapDumpOnOutOfMemoryError\` to capture a heap dump immediately upon crash, while setting up an automated container restart policy in Kubernetes to maintain availability. Next, I inspect the heap dump using Eclipse Memory Analyzer (MAT) or JProfiler to identify the "Leak Suspect"—typically unbounded static collections, unclosed streams, or thread-local variables that are never evicted. Once identified, I fix the lifecycle leak, implement weak references or bounded LRU caches, and add regression load tests.',
        redFlagsToAvoid:
          'Simply saying "I will just increase the RAM on the server forever."',
      },
    ],
  },
  {
    id: 'exp-mod-10',
    track: 'experienced',
    title: 'Leadership Principles, Behavioral Nuances & Offer Negotiation Strategy',
    subtitle: 'Mastering Executive Presence, Conflict Resolution & Maximizing Total Compensation (CTC)',
    estimatedReadTime: '18 Mins',
    summary:
      'Senior roles hinge on leadership acumen, cross-team influence without authority, and strategic alignment. Mentor Kapil reveals how experienced engineers ace behavioral rounds (including Amazon Leadership Principles) and negotiate compensation packages (Base, Bonuses, RSUs/ESOPs).',
    keyTakeaways: [
      'Focus on "Influence Without Authority": Persuading product, QA, and security teams through data and prototypes.',
      'Handling Disagreements: "Disagree and Commit"—debate passionately with data, but execute completely once a decision is made.',
      'Compensation Anatomy: Base Salary vs Performance Bonus vs Stock Grants (RSUs with 4-year vesting schedules).',
      'Negotiation Rule: Never disclose your target salary first; let the company provide the initial band.',
    ],
    kapilMentorTips: [
      'In senior behavioral rounds, frame stories with quantified business ROI: "By leading this initiative, we cut cloud infrastructure costs by ₹40 Lakhs annually while improving 99.9% uptime."',
      'When evaluating competing offers, always calculate the annualized liquid value of equity (public RSUs vs private illiquid ESOPs).',
    ],
    deepDiveMarkdown: `### 1. Amazon-Style Senior Leadership Principles

1. **Customer Obsession**: Start with the customer and work backwards. Vigorously earn and keep customer trust.
2. **Ownership**: Leaders are owners. They think long-term and never say "that's not my job."
3. **Invent and Simplify**: Expect and require innovation and simplification from your teams.
4. **Are Right, A Lot**: Leaders have strong judgment and good instincts. They seek diverse perspectives and disconfirm their beliefs.
5. **Bias for Action**: Speed matters in business. Many decisions are two-way doors and reversible.

---

### 2. Salary & Total Compensation (CTC) Negotiation Blueprint
When negotiating mid-to-senior offers:

- **Understand the Components**:
  - *Fixed Base Salary*: Guaranteed monthly cash flow (PF, tax deductions apply).
  - *Variable / Performance Bonus*: Typically 10–20% of base, paid annually based on company and individual performance.
  - *Equity (RSUs / Stock)*: In public companies (e.g., Google, Amazon, Microsoft), RSUs are equivalent to cash with a vesting schedule (e.g., 25% each year over 4 years).
  - *Joining / Sign-on Bonus*: One-time cash bonus paid in month 1 to bridge stock transition.

- **Negotiation Script**:
  - *"Thank you for the offer. I am genuinely excited about the engineering vision and the team. Based on my current market research, competing interviews in final stages, and the scope of responsibilities, I was expecting a total compensation closer to [X]. Can we explore flexibility in the base salary or sign-on bonus to bridge this gap?"*`,
    codeSnippets: [],
    sampleInterviewQA: [
      {
        question: 'Describe a situation where you had a strong technical disagreement with your Engineering Manager or Architect. How did you handle it?',
        interviewerExpectation: 'Tests maturity, communication, emotional intelligence, and ability to prioritize team objectives.',
        idealAnswer:
          'During an architectural planning session, our lead architect proposed using MongoDB for our core transactional ledger. Having analyzed our data consistency requirements, I believed PostgreSQL with ACID guarantees was far safer to prevent phantom balance discrepancies. Rather than arguing opinion, I built a quick proof-of-concept benchmark demonstrating concurrency race conditions under distributed writes, and presented the data objectively. The team agreed on PostgreSQL, and the migration went forward smoothly with zero transaction errors.',
        redFlagsToAvoid:
          'Saying: "I proved that my manager was wrong and made him look foolish in front of everyone."',
      },
    ],
  },
];
