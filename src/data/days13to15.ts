import { DayPlan } from '../types';
import { DAY_13_PROGRAMMING_NOTES } from './day13ProgrammingNotes';
import { DAY_13_PRACTICAL_CHALLENGES_10 } from './day13Challenges10';
import { DAY_13_PRE_ASSESSMENT_50, DAY_13_POST_ASSESSMENT_50 } from './day13Assessments50';
import { DAY_13_MINI_PROJECT } from './day13MiniProject';

import { DAY_14_PROGRAMMING_NOTES } from './day14ProgrammingNotes';
import { DAY_14_PRACTICAL_CHALLENGES_10 } from './day14Challenges10';
import { DAY_14_PRE_ASSESSMENT_50, DAY_14_POST_ASSESSMENT_50 } from './day14Assessments50';
import { DAY_14_MINI_PROJECT } from './day14MiniProject';

import { DAY_15_PROGRAMMING_NOTES } from './day15ProgrammingNotes';
import { DAY_15_PRACTICAL_CHALLENGES_10 } from './day15Challenges10';
import { DAY_15_PRE_ASSESSMENT_50, DAY_15_POST_ASSESSMENT_50 } from './day15Assessments50';
import { DAY_15_MINI_PROJECT } from './day15MiniProject';

export const DAYS_13_TO_15: DayPlan[] = [
  {
    day: 13,
    title: 'Advanced Range Query Data Structures & String Algorithms',
    modulesCovered: [14],
    moduleNames: ['14. Advanced Range Query Data Structures & String Algorithms'],
    coverageSummary:
      'Segment Trees with Lazy Propagation, Fenwick Trees (Binary Indexed Trees), Sparse Table RMQ, Knuth-Morris-Pratt (KMP) prefix automaton, Z-Algorithm, Bitwise XOR Tries, Suffix Arrays & LCP.',
    learningOutcomes:
      'Execute logarithmic point and range updates over dynamic streams, achieve O(1) static range minimum queries, and linearize complex string pattern matching under strict FAANG interview benchmarks.',
    theoryAllocation:
      '30% Theory (90 Mins): Canonical Segment Decomposition, Lazy Tag Propagation Invariants, Least Significant Bit (LSB) Fenwick Indexing, KMP Longest Proper Prefix Failure Functions & Trie Bit Manipulation',
    practicalAllocation:
      '70% Practical (210 Mins): Dynamic Range Sum & Min, Lazy Range Additions, Maximum XOR Pair, KMP Substring Search, Longest Duplicate Substring & Capstone Genomic Search / Financial Aggregator Engine',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 13 Diagnostic Pre-Assessment (Segment Trees, Lazy Propagation, Fenwick BIT & KMP Matching)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity:
          '30% Theory Session: Module 14 (Range Query Tree Architectures, Lazy Deferral, LSB BIT Algebra, KMP State Automata & XOR Trie Depth Invariants)',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity:
          '70% Practical IDE Lab: Segment Tree Range Sum & Min, Fenwick Point Updates, XOR Trie Maximum Pairs, KMP Pattern Matching & Capstone Genomic Aggregator in IDE',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 13 Verification Post-Assessment & Daily Badge Unlock (FAANG Range Query Architect)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_13_PROGRAMMING_NOTES,
    practicalChallenges: DAY_13_PRACTICAL_CHALLENGES_10,
    preAssessment: DAY_13_PRE_ASSESSMENT_50,
    postAssessment: DAY_13_POST_ASSESSMENT_50,
    miniProject: DAY_13_MINI_PROJECT,
    badge: {
      id: 'badge-day-13',
      day: 13,
      title: 'FAANG Range Query Architect & String Algorithms Specialist',
      subtitle: 'Module 14 • Segment Tree, Lazy Propagation, Fenwick BIT, KMP & XOR Trie',
      moduleRef: 'Module 14: Advanced Range Query Data Structures & String Algorithms',
      criteria:
        'Completed Day 13 with verified mastery in dynamic logarithmic range trees, lazy update propagation, binary indexed tree mathematics, linear string pattern matching, and high-performance genomic search engines.',
    },
  },
  {
    day: 14,
    title: 'Scalable Distributed Systems & Architecture (HLD / LLD)',
    modulesCovered: [15],
    moduleNames: ['15. Scalable Distributed Systems & Architecture'],
    coverageSummary:
      'Consistent Hashing with Virtual Nodes, Token Bucket & Leaky Bucket Rate Limiting, Write-Ahead Logging (WAL) & LSM-Trees, Cache-Aside & Invalidation, Distributed Consensus (Raft / Paxos), Tunable Quorum (R + W > N) & PACELC.',
    learningOutcomes:
      'Architect resilient, partition-tolerant distributed backends, design burst-tolerant API rate limiters, eliminate cache stampedes, and implement storage durability engines used in DynamoDB, Cassandra, and Kafka.',
    theoryAllocation:
      '30% Theory (90 Mins): Consistent Hash Ring Topologies, Pigeonhole Proof of R + W > N Quorum, CAP / PACELC Realities, LSM Sequential Append I/O vs Random Seeks, and Raft Term Elections',
    practicalAllocation:
      '70% Practical (210 Mins): Hash Ring Router with Virtual Nodes, In-Memory Token Bucket Limiter, Sliding Window Counter, SSTable Compaction Simulator, Quorum Verifier & Capstone Distributed Event Broker',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 14 Diagnostic Pre-Assessment (Consistent Hashing, CAP/PACELC, Token Bucket & LSM Durability)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity:
          '30% Theory Session: Module 15 (Consistent Hashing Mathematics, Token Refill Invariants, WAL / SSTable Disk Physics, Quorum Consensus & Distributed Cache Patterns)',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity:
          '70% Practical IDE Lab: Murmur3 Consistent Hash Ring, Token Bucket Middleware, Sliding Window Rate Gate, WAL Crash Recovery, Quorum Evaluator & Capstone Event Broker Engine',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 14 Verification Post-Assessment & Daily Badge Unlock (FAANG Scalable Systems Architect)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_14_PROGRAMMING_NOTES,
    practicalChallenges: DAY_14_PRACTICAL_CHALLENGES_10,
    preAssessment: DAY_14_PRE_ASSESSMENT_50,
    postAssessment: DAY_14_POST_ASSESSMENT_50,
    miniProject: DAY_14_MINI_PROJECT,
    badge: {
      id: 'badge-day-14',
      day: 14,
      title: 'FAANG Scalable Systems Architect & Distributed Design Master',
      subtitle: 'Module 15 • Consistent Hashing, Rate Limiting, WAL / LSM & Consensus Quorum',
      moduleRef: 'Module 15: Scalable Distributed Systems & Architecture',
      criteria:
        'Completed Day 14 demonstrating industrial proficiency in consistent hashing topology, burst-tolerant traffic throttling, sequential append-only storage engines, cache invalidation safety, and fault-tolerant distributed consensus.',
    },
  },
  {
    day: 15,
    title: 'Machine Coding, Concurrency & Comprehensive Placement Grand Finale',
    modulesCovered: [16],
    moduleNames: ['16. Machine Coding, Concurrency & Placement Grand Finale'],
    coverageSummary:
      '90-Minute Machine Coding (SOLID, Strategy, Observer, Multi-Level Parking Lot), Multi-Threaded Concurrency (Reader-Writer Locks, Bounded Blocking Queue, Condition Variables, Treiber CAS Lock-Free Stack), In-Memory Cache with TTL & Eviction, Distributed Transactions (2PC & Saga Orchestration), Monotonic Fencing Tokens, and Whiteboard Technical Interview Synthesis.',
    learningOutcomes:
      'Excel in the high-stakes 90-minute Machine Coding and Concurrency rounds, write thread-safe and lock-free data structures, design robust distributed transaction handlers, and synthesize complete FAANG technical interview readiness.',
    theoryAllocation:
      '30% Theory (90 Mins): Clean Architecture & SOLID Decoupling, Coffman Deadlock Conditions, Reader-Writer Starvation Invariants, Compare-And-Swap (CAS) Hardware Instructions, 2PC vs Saga Rollback Protocols & Fencing Token Proofs',
    practicalAllocation:
      '70% Practical (210 Mins): Multi-Level Parking Lot LLD, Bounded Blocking Queue with Condition Variables, Writer-Preference RW Lock, Lock-Free Treiber Stack, Saga Workflow Orchestrator & Capstone Enterprise KV Store with Fencing Tokens in IDE',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 15 Diagnostic Pre-Assessment (Machine Coding Principles, Multi-Threading, CAS & Distributed Locking)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity:
          '30% Theory Session: Module 16 (Object-Oriented Domain Modeling, Concurrency Primitives, Spurious Wakeups, Lock-Free Progress Guarantees, Distributed Fencing & Placement Synthesis)',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity:
          '70% Practical IDE Lab: Parking Lot Machine Coding, Bounded Blocking Queue, Writer-Preference Lock, Lock-Free CAS Stack, Saga Orchestrator & Capstone In-Memory KV Store with Distributed Lock Manager',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity:
          'Day 15 Verification Post-Assessment, Ultimate Grandmaster Badge Unlock & Final Grand Placement Readiness Certification',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_15_PROGRAMMING_NOTES,
    practicalChallenges: DAY_15_PRACTICAL_CHALLENGES_10,
    preAssessment: DAY_15_PRE_ASSESSMENT_50,
    postAssessment: DAY_15_POST_ASSESSMENT_50,
    miniProject: DAY_15_MINI_PROJECT,
    badge: {
      id: 'badge-day-15',
      day: 15,
      title: 'FAANG Grandmaster & Placement Ready Certified Principal Candidate',
      subtitle: 'Module 16 • Machine Coding, Concurrency, Distributed Transactions & Placement Grand Finale',
      moduleRef: 'Module 16: Machine Coding, Concurrency & Placement Grand Finale',
      criteria:
        'Completed the entire 15-Day Elite Placement Curriculum, mastering 150 practical challenges, 1,500 diagnostic/verification assessments, and 15 capstone enterprise mini-projects across advanced data structures, dynamic programming, distributed systems, and real-time concurrency.',
    },
  },
];
