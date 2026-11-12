import { DayPlan } from '../types';
import { DAY_11_PROGRAMMING_NOTES } from './day11ProgrammingNotes';
import { DAY_11_PRACTICAL_CHALLENGES_10 } from './day11Challenges10';
import { DAY_11_PRE_ASSESSMENT_50, DAY_11_POST_ASSESSMENT_50 } from './day11Assessments50';
import { DAY_11_MINI_PROJECT } from './day11MiniProject';

import { DAY_12_PROGRAMMING_NOTES } from './day12ProgrammingNotes';
import { DAY_12_PRACTICAL_CHALLENGES_10 } from './day12Challenges10';
import { DAY_12_PRE_ASSESSMENT_50, DAY_12_POST_ASSESSMENT_50 } from './day12Assessments50';
import { DAY_12_MINI_PROJECT } from './day12MiniProject';

export const DAYS_11_TO_12: DayPlan[] = [
  {
    day: 11,
    title: 'Advanced Graph Theory, Network Flow & Distributed Traversal',
    modulesCovered: [12],
    moduleNames: ['12. Advanced Graph Theory & Network Flow'],
    coverageSummary:
      'Topological Sort (Kahn / DFS), Dijkstra & 0-1 BFS, Disjoint Set Union (DSU) with Path Compression & Union by Rank, Tarjan / Kosaraju SCC & Bridges, Bidirectional BFS, Ford-Fulkerson & Dinic Max Flow, A* Heuristic Search.',
    learningOutcomes:
      'Master complex non-linear graphs, cycles, network flows, and shortest paths in distributed graphs under strict FAANG performance limits.',
    theoryAllocation:
      '30% Theory (90 Mins): Topological Invariants, Greedy Monotonicity in Dijkstra, DSU Inverse Ackermann Bounds, Tarjan Low-Link Invariants & Max-Flow Min-Cut Theorem',
    practicalAllocation:
      '70% Practical (210 Mins): Alien Dictionary, Critical Network Bridges, Network Delay Latency & Capstone Distributed Routing Engine in IDE',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 11 Diagnostic Pre-Assessment (Topological Sort, Dijkstra, DSU & Tarjan Bridges)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity:
          '30% Theory Session: Module 12 (Graph Topologies, Shortest Path Frontiers, DSU Disjoint Sets, Cut Vertices & Network Flow Formulations)',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity:
          '70% Practical IDE Lab: Kahn Build Order, Critical AWS Connections, Dijkstra Latency, Min Cost Points & Capstone Routing Simulator',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 11 Verification Post-Assessment & Daily Badge Unlock (FAANG Graph Specialist)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_11_PROGRAMMING_NOTES,
    practicalChallenges: DAY_11_PRACTICAL_CHALLENGES_10,
    preAssessment: DAY_11_PRE_ASSESSMENT_50,
    postAssessment: DAY_11_POST_ASSESSMENT_50,
    miniProject: DAY_11_MINI_PROJECT,
    badge: {
      id: 'badge-day-11',
      day: 11,
      title: 'FAANG Graph Specialist & Distributed Network Architect',
      subtitle: 'Module 12 • Topological Sort, DSU, Tarjan Bridges & Max Flow',
      moduleRef: 'Module 12: Advanced Graph Theory & Network Flow',
      criteria:
        'Completed Day 11 with mastery in Topological Ordering, Disjoint Set Union, Tarjan critical infrastructure bridges, and bidirectional shortest-path distributed graph engines.',
    },
  },
  {
    day: 12,
    title: 'Hard Dynamic Programming & State-Space Optimization',
    modulesCovered: [13],
    moduleNames: ['13. Hard Dynamic Programming & State-Space Optimization'],
    coverageSummary:
      'State Machine DP, Bitmask DP (Hamiltonian / TSP), Tree DP & Re-rooting techniques, Monotonic Deque & Convex Hull DP Optimization, Interval & MCM DP, Digit DP.',
    learningOutcomes:
      'Deconstruct complex exponential search spaces into subproblems, formulate multi-dimensional states, and reduce asymptotic runtimes using advanced DP optimizations.',
    theoryAllocation:
      '30% Theory (90 Mins): Finite State Automata in DP, Bitmask Subset Transitions, Tree Decomposition & Re-rooting Invariants, Monotonic Sliding Window Pruning & Interval Independence',
    practicalAllocation:
      '70% Practical (210 Mins): Regular Expression Matching, Stock IV with Cooldowns, Shortest Path All Nodes, Tree Distance Re-rooting, Burst Balloons & HFT Arbitrage Engine',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 12 Diagnostic Pre-Assessment (State Formulations, Optimal Substructure, Bitmasks & Tree DP)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity:
          '30% Theory Session: Module 13 (State Machine DP, Bitmask Hamiltonian TSP, Two-Pass Tree Re-rooting, Deque O(1) Sliding Windows & Digit DP)',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity:
          '70% Practical IDE Lab: Regex Matching, Stock IV, Constrained Subsequence Sum, Burst Balloons, Tree Rerooting & HFT Execution Arbitrage Engine',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity:
          'Day 12 Verification Post-Assessment, Master Badge Unlock & Final Grand Placement Readiness Certification',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_12_PROGRAMMING_NOTES,
    practicalChallenges: DAY_12_PRACTICAL_CHALLENGES_10,
    preAssessment: DAY_12_PRE_ASSESSMENT_50,
    postAssessment: DAY_12_POST_ASSESSMENT_50,
    miniProject: DAY_12_MINI_PROJECT,
    badge: {
      id: 'badge-day-12',
      day: 12,
      title: 'FAANG Hard DP & Algorithmic Optimization Master',
      subtitle: 'Module 13 • State Machine, Bitmask DP, Tree Re-rooting & Monotonic Deque',
      moduleRef: 'Module 13: Hard Dynamic Programming & State-Space Optimization',
      criteria:
        'Completed Day 12 with elite-tier mastery in high-dimensional Dynamic Programming, state-space compression, re-rooting trees, and real-time algorithmic execution optimization.',
    },
  },
];
