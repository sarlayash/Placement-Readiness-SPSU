import { DayPlan } from '../types';
import { DAY_1_PROGRAMMING_NOTES } from './day1ProgrammingNotes';
import { DAY_1_PRE_ASSESSMENT_50, DAY_1_POST_ASSESSMENT_50 } from './day1Assessments50';
import { DAY_1_PRACTICAL_CHALLENGES_10 } from './day1Challenges10';
import { DAY_1_MINI_PROJECT } from './day1MiniProject';
import { DAY_2_PROGRAMMING_NOTES } from './day2ProgrammingNotes';
import { DAY_2_PRE_ASSESSMENT_50, DAY_2_POST_ASSESSMENT_50 } from './day2Assessments50';
import { DAY_2_PRACTICAL_CHALLENGES_10 } from './day2Challenges10';
import { DAY_3_PROGRAMMING_NOTES } from './day3ProgrammingNotes';
import { DAY_3_PRACTICAL_CHALLENGES_10 } from './day3Challenges10';
import { DAY_3_PRE_ASSESSMENT_50, DAY_3_POST_ASSESSMENT_50 } from './day3Assessments50';
import { DAY_3_MINI_PROJECT } from './day3MiniProject';
import { DAY_4_PROGRAMMING_NOTES } from './day4ProgrammingNotes';
import { DAY_4_PRACTICAL_CHALLENGES_10 } from './day4Challenges10';
import { DAY_4_PRE_ASSESSMENT_50, DAY_4_POST_ASSESSMENT_50 } from './day4Assessments50';
import { DAY_4_MINI_PROJECT } from './day4MiniProject';
import { DAY_5_PROGRAMMING_NOTES } from './day5ProgrammingNotes';
import { DAY_5_PRACTICAL_CHALLENGES_10 } from './day5Challenges10';
import { DAY_5_PRE_ASSESSMENT_50, DAY_5_POST_ASSESSMENT_50 } from './day5Assessments50';
import { DAY_5_MINI_PROJECT } from './day5MiniProject';

export const DAYS_1_TO_5: DayPlan[] = [
  {
    day: 1,
    title: 'Programming Fundamentals & Complexity Analysis',
    modulesCovered: [1],
    moduleNames: ['1. Programming Fundamentals'],
    coverageSummary:
      'Variables, data types, operators, conditions, loops, functions, arrays, strings, recursion, I/O, exceptions, code tracing, debugging, introductory complexity.',
    learningOutcomes:
      'Write correct programs; trace execution; identify common errors; explain basic time and space complexity.',
    theoryAllocation: '30% Theory (90 Mins): Memory Layout, Stack Frames, Control Flow & Big-O Asymptotics',
    practicalAllocation: '70% Practical (210 Mins): Code Tracing, Debugging Edge Cases, Recursion & Array Manipulation in IDE',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 1 Diagnostic Pre-Assessment (Execution Tracing & Complexity Bounds)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: Data Types, Bitwise/Logical Operators, Call Stack & Big-O Analysis across C, C++, Java & Python',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: Array Reversal, String Frequency, Recursive Call Tracing & Exception Guarding',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 1 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_1_PROGRAMMING_NOTES,
    practicalChallenges: DAY_1_PRACTICAL_CHALLENGES_10,
    miniProject: DAY_1_MINI_PROJECT,
    preAssessment: DAY_1_PRE_ASSESSMENT_50,
    postAssessment: DAY_1_POST_ASSESSMENT_50,
    badge: {
      id: 'badge-day-1',
      day: 1,
      title: 'Programming Fundamentals Architect',
      subtitle: 'Module 1 • Execution Tracing & Complexity Mastery',
      moduleRef: 'Module 1: Programming Fundamentals',
      criteria:
        'Verified mastery of variables, control flow, arrays, strings, recursion stack tracing, and Big-O complexity across C, C++, Java, and Python.',
    },
  },
  {
    day: 2,
    title: 'Data Structures & Algorithmic Patterns',
    modulesCovered: [2],
    moduleNames: ['2. Data Structures & Algorithms'],
    coverageSummary:
      'Arrays/strings, sorting/searching, hashing, two pointers, sliding window, linked lists, stacks, queues, recursion/backtracking, trees/BST, BFS/DFS, greedy and introductory DP.',
    learningOutcomes:
      'Select suitable data structures and algorithmic patterns; solve easy-to-medium and selected advanced problems.',
    theoryAllocation: '30% Theory (90 Mins): Hashing Collisions, Sliding Window Invariants, Tree/Graph Traversals & DP Overlapping Subproblems',
    practicalAllocation: '70% Practical (210 Mins): Sliding Window, Monotonic Stack, Linked List Cycle & BFS/DP Implementation in IDE',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 2 Diagnostic Pre-Assessment (Data Structure Selection & Pattern Recognition)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: Hash Tables, Two Pointers, Sliding Window, Trees/BST, BFS/DFS & Memoization vs Tabulation',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: Longest Unique Substring (Sliding Window) & Next Greater Element / DP Coin Change',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 2 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_2_PROGRAMMING_NOTES,
    practicalChallenges: DAY_2_PRACTICAL_CHALLENGES_10,
        preAssessment: DAY_2_PRE_ASSESSMENT_50,
    postAssessment: DAY_2_POST_ASSESSMENT_50,
    badge: {
      id: 'badge-day-2',
      day: 2,
      title: 'Data Structures & Patterns Specialist',
      subtitle: 'Module 2 • Sliding Window, Trees, Graphs & DP',
      moduleRef: 'Module 2: Data Structures & Algorithms',
      criteria:
        'Mastered selection and implementation of Hashing, Sliding Window, Monotonic Stack, Trees/BST, BFS/DFS, and Dynamic Programming.',
    },
  },
  {
    day: 3,
    title: 'Company-Oriented Coding Lab & Trade-off Benchmarking',
    modulesCovered: [3],
    moduleNames: ['3. Company-oriented Coding Lab'],
    coverageSummary:
      'Timed problem-solving, difficulty bands, test cases, code-quality feedback and solution walkthroughs; target 150–200 curated placement-style problems.',
    learningOutcomes:
      'Improve speed, accuracy, test-case coverage and explanation of solution trade-offs.',
    theoryAllocation: '30% Theory (90 Mins): Constraint-Driven Algorithm Selection, Corner-Case Taxonomy & Brute->Better->Optimal Trade-offs',
    practicalAllocation: '70% Practical (210 Mins): Timed Company-Style Coding Lab (Binary Search on Answer & Kadane/Subarray Hashing)',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 3 Diagnostic Pre-Assessment (Constraint Mapping & Edge-Case Detection)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: Reading Constraints (10^5 vs 10^9), Integer Overflow Guards & Explaining Trade-offs',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: Timed Placement Problems with Hidden Boundary Test Cases',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 3 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_3_PROGRAMMING_NOTES,
    practicalChallenges: DAY_3_PRACTICAL_CHALLENGES_10,
    miniProject: DAY_3_MINI_PROJECT,
    preAssessment: DAY_3_PRE_ASSESSMENT_50,
    postAssessment: DAY_3_POST_ASSESSMENT_50,
    badge: {
      id: 'badge-day-3',
      day: 3,
      title: 'Company Coding Lab Champion',
      subtitle: 'Module 3 • Timed Problem Solving & Trade-off Rigor',
      moduleRef: 'Module 3: Company-oriented Coding Lab',
      criteria:
        'Demonstrated placement speed, hidden test-case accuracy, and optimal complexity trade-offs on company-style coding benchmarks.',
    },
  },
  {
    day: 4,
    title: 'SQL & Relational Database Systems',
    modulesCovered: [4],
    moduleNames: ['4. SQL & Database Systems'],
    coverageSummary:
      'SELECT, filtering, sorting, aggregation, GROUP BY/HAVING, joins, subqueries, CASE, constraints, views, indexes, query optimisation, keys, normalisation, transactions, ACID and concurrency.',
    learningOutcomes:
      'Write and debug SQL queries; interpret schema and explain core database concepts. Target at least 75 structured SQL problems.',
    theoryAllocation: '30% Theory (90 Mins): Relational Keys, B+ Tree Indexing, Normalisation (1NF–BCNF), ACID Transactions & Isolation Levels',
    practicalAllocation: '70% Practical (210 Mins): Complex JOINs, GROUP BY/HAVING, Window Functions, Correlated Subqueries & Relational Engine Implementation',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 4 Diagnostic Pre-Assessment (SQL Execution Order, Keys & ACID Properties)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: B+ Tree Indexes, Query Optimisation, Normalisation (1NF-BCNF) & Concurrency Control',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: SQL Query Equivalence & In-Memory Relational Aggregation / Join Execution',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 4 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_4_PROGRAMMING_NOTES,
    practicalChallenges: DAY_4_PRACTICAL_CHALLENGES_10,
    preAssessment: DAY_4_PRE_ASSESSMENT_50,
    postAssessment: DAY_4_POST_ASSESSMENT_50,
    badge: {
      id: 'badge-day-4',
      day: 4,
      title: 'SQL & Relational Database Architect',
      subtitle: 'Module 4 • Queries, Indexing, Normalisation & ACID',
      moduleRef: 'Module 4: SQL & Database Systems',
      criteria:
        'Verified proficiency in SQL JOINs, GROUP BY/HAVING, subqueries, B+ Tree indexing, 3NF/BCNF normalisation, and ACID transactions.',
    },
    miniProject: DAY_4_MINI_PROJECT,
  },
  {
    day: 5,
    title: 'Object-Oriented Programming (OOP) & SOLID Design',
    modulesCovered: [5],
    moduleNames: ['5. OOP'],
    coverageSummary:
      'Classes/objects, encapsulation, inheritance, polymorphism, abstraction, constructors, overloading/overriding, interfaces, abstract classes, exceptions and introductory SOLID.',
    learningOutcomes:
      'Apply OOP principles and explain design choices in code and interviews.',
    theoryAllocation: '30% Theory (90 Mins): 4 Pillars of OOP, Virtual Method Tables (vtable), Abstract Classes vs Interfaces & SOLID Principles',
    practicalAllocation: '70% Practical (210 Mins): Polymorphic Payment Gateway & Encapsulated Banking Hierarchy in C, C++, Java & Python',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 5 Diagnostic Pre-Assessment (Polymorphism, Constructors & SOLID Principles)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: Encapsulation, Dynamic Dispatch (vtable), Interfaces vs Abstract Classes & SOLID',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: Runtime Polymorphism, Method Overriding & SOLID Open-Closed Architecture',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 5 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_5_PROGRAMMING_NOTES,
    practicalChallenges: DAY_5_PRACTICAL_CHALLENGES_10,
    preAssessment: DAY_5_PRE_ASSESSMENT_50,
    postAssessment: DAY_5_POST_ASSESSMENT_50,
    miniProject: DAY_5_MINI_PROJECT,
    badge: {
      id: 'badge-day-5',
      day: 5,
      title: 'OOP & SOLID Systems Designer',
      subtitle: 'Module 5 • Encapsulation, Polymorphism & SOLID Architecture',
      moduleRef: 'Module 5: OOP',
      criteria:
        'Applied object-oriented encapsulation, inheritance, runtime polymorphism, and SOLID design principles in code and interview scenarios.',
    },
  },
];
