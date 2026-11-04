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
import { DAY_10_PROGRAMMING_NOTES } from './day10ProgrammingNotes';
import { DAY_10_PRACTICAL_CHALLENGES_10 } from './day10Challenges10';
import { DAY_10_PRE_ASSESSMENT_50, DAY_10_POST_ASSESSMENT_50 } from './day10Assessments50';
import { DAY_10_MINI_PROJECT } from './day10MiniProject';

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
    programmingNotes: DAY_10_PROGRAMMING_NOTES,
    practicalChallenges: DAY_10_PRACTICAL_CHALLENGES_10,
    preAssessment: DAY_10_PRE_ASSESSMENT_50,
    postAssessment: DAY_10_POST_ASSESSMENT_50,
    miniProject: DAY_10_MINI_PROJECT,
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
