import { CurriculumModule } from '../types';

export const SYLLABUS_MODULES: CurriculumModule[] = [
  {
    id: 1,
    title: '1. Programming Fundamentals',
    coverage:
      'Variables, data types, operators, conditions, loops, functions, arrays, strings, recursion, I/O, exceptions, code tracing, debugging, introductory complexity.',
    learningOutcomes:
      'Write correct programs; trace execution; identify common errors; explain basic time and space complexity.',
    alignedDay: 1,
  },
  {
    id: 2,
    title: '2. Data Structures & Algorithms',
    coverage:
      'Arrays/strings, sorting/searching, hashing, two pointers, sliding window, linked lists, stacks, queues, recursion/backtracking, trees/BST, BFS/DFS, greedy and introductory DP.',
    learningOutcomes:
      'Select suitable data structures and algorithmic patterns; solve easy-to-medium and selected advanced problems.',
    alignedDay: 2,
  },
  {
    id: 3,
    title: '3. Company-oriented Coding Lab',
    coverage:
      'Timed problem-solving, difficulty bands, test cases, code-quality feedback and solution walkthroughs; target 150–200 curated placement-style problems.',
    learningOutcomes:
      'Improve speed, accuracy, test-case coverage and explanation of solution trade-offs.',
    alignedDay: 3,
  },
  {
    id: 4,
    title: '4. SQL & Database Systems',
    coverage:
      'SELECT, filtering, sorting, aggregation, GROUP BY/HAVING, joins, subqueries, CASE, constraints, views, indexes, query optimisation, keys, normalisation, transactions, ACID and concurrency.',
    learningOutcomes:
      'Write and debug SQL queries; interpret schema and explain core database concepts. Target at least 75 structured SQL problems.',
    alignedDay: 4,
  },
  {
    id: 5,
    title: '5. OOP',
    coverage:
      'Classes/objects, encapsulation, inheritance, polymorphism, abstraction, constructors, overloading/overriding, interfaces, abstract classes, exceptions and introductory SOLID.',
    learningOutcomes:
      'Apply OOP principles and explain design choices in code and interviews.',
    alignedDay: 5,
  },
  {
    id: 6,
    title: '6. Operating Systems',
    coverage:
      'Processes/threads, CPU scheduling, synchronisation, deadlocks, memory management, paging, virtual memory, file systems.',
    learningOutcomes:
      'Answer core OS questions and reason through common process, memory and concurrency scenarios.',
    alignedDay: 6,
  },
  {
    id: 7,
    title: '7. Computer Networks',
    coverage:
      'OSI/TCP-IP, TCP/UDP, IP addressing concepts, DNS, HTTP/HTTPS, ports, client-server architecture, REST fundamentals and security basics.',
    learningOutcomes:
      'Explain network fundamentals and common web communication flows.',
    alignedDay: 7,
  },
  {
    id: 8,
    title: '8. Software Engineering & Developer Tools',
    coverage: 'SDLC, Git/GitHub, branches, pull requests, debugging, testing.',
    learningOutcomes:
      'Use version-control workflows and demonstrate basic debugging, testing and API validation.',
    alignedDay: 8,
  },
  {
    id: 9,
    title: '9. Development & Project Readiness',
    coverage:
      'HTML/CSS/JavaScript exposure; one backend pathway such as Java/Spring Boot or Python; MySQL, project architecture and contribution explanation.',
    learningOutcomes:
      'Explain project structure, individual contribution, database/API flow and key technical trade-offs.',
    alignedDay: 9,
  },
  {
    id: 10,
    title: '10. AI-assisted Software Development',
    coverage:
      'GenAI fundamentals, prompting for coding, code review, debugging, test generation; verification, privacy, security and responsible use.',
    learningOutcomes:
      'Use AI tools critically and verify generated code rather than accepting outputs without testing.',
    alignedDay: 10,
  },
  {
    id: 11,
    title: '11. Technical Interview Preparation',
    coverage:
      'Programming, DSA, SQL, OOP, DBMS, OS, CN, project discussion, live coding, debugging and resume-based technical questions.',
    learningOutcomes:
      'Communicate a structured approach, solve problems aloud and respond to technical follow-up questions.',
    alignedDay: 10,
  },
  {
    id: 12,
    title: '12. Advanced Graph Theory & Network Flow',
    coverage:
      'Topological Sort (Kahn / DFS), Dijkstra & 0-1 BFS, Disjoint Set Union (DSU) with Path Compression & Union by Rank, Tarjan / Kosaraju SCC & Bridges, Bidirectional BFS, Ford-Fulkerson & Dinic Max Flow, A* Heuristic Search.',
    learningOutcomes:
      'Master complex non-linear graphs, cycles, network flows, and shortest paths in distributed graphs under strict FAANG performance limits.',
    alignedDay: 11,
  },
  {
    id: 13,
    title: '13. Hard Dynamic Programming & State-Space Optimization',
    coverage:
      'State Machine DP, Bitmask DP (Hamiltonian / TSP), Tree DP & Re-rooting techniques, Monotonic Deque & Convex Hull DP Optimization, Interval & MCM DP, Digit DP.',
    learningOutcomes:
      'Deconstruct complex exponential search spaces into subproblems, formulate multi-dimensional states, and reduce asymptotic runtimes using advanced DP optimizations.',
    alignedDay: 12,
  },
  {
    id: 14,
    title: '14. Advanced Range Query Data Structures & String Algorithms',
    coverage:
      'Segment Trees with Lazy Propagation, Fenwick Trees / Binary Indexed Trees (BIT), Sparse Table RMQ, Knuth-Morris-Pratt (KMP) prefix automaton, Z-Algorithm, Bitwise XOR Tries, Suffix Arrays & LCP.',
    learningOutcomes:
      'Execute logarithmic point and range updates over dynamic streams, achieve O(1) static range minimum queries, and linearize complex string pattern matching under strict FAANG interview benchmarks.',
    alignedDay: 13,
  },
  {
    id: 15,
    title: '15. Scalable Distributed Systems & Architecture (HLD/LLD)',
    coverage:
      'Consistent Hashing with Virtual Nodes, Token Bucket & Leaky Bucket Rate Limiting, Write-Ahead Logging (WAL) & LSM-Trees, Cache-Aside & Invalidation, Distributed Consensus (Raft / Paxos), Tunable Quorum (R + W > N) & PACELC.',
    learningOutcomes:
      'Architect resilient, partition-tolerant distributed backends, design burst-tolerant API rate limiters, eliminate cache stampedes, and implement storage durability engines used in DynamoDB, Cassandra, and Kafka.',
    alignedDay: 14,
  },
  {
    id: 16,
    title: '16. Real-World Technical Interview Simulation, Machine Coding & Comprehensive Placement Grand Finale',
    coverage:
      '90-minute Machine Coding (SOLID, Design Patterns, Parking Lot), Multi-Threaded Concurrency (Reader-Writer Locks, Producer-Consumer, Condition Variables, Treiber CAS Lock-Free Stack), Expiring In-Memory Cache with TTL & Eviction, Distributed Transactions (2PC & Saga Orchestration), Monotonic Fencing Tokens, and FAANG Technical Interview Synthesis.',
    learningOutcomes:
      'Excel in high-stakes 90-minute Machine Coding and Concurrency rounds, write thread-safe and lock-free data structures, design robust distributed transaction handlers, and synthesize complete FAANG technical interview readiness.',
    alignedDay: 15,
  },
  {
    id: 17,
    title: '17. Enterprise Real-Time Event Streaming, Vector Search & AI/LLM Infra Engine Architecture',
    coverage:
      'Distributed Commit Logs (Kafka Architecture, Monotonic Offsets, Zero-Copy sendfile), Vector Embeddings & Approximate Nearest Neighbor Search (Cosine Similarity, Euclidean Distance, HNSW Graphs for LLM/RAG Retrieval), LSM-Trees (MemTable, WAL Durability, SSTable Multi-Way Compaction Merge, Bloom Filter Pruning), and Real-Time Event-Time Stream Processing (Tumbling/Sliding Windows, Watermark Latency Bounds, Exactly-Once Semantics EOS).',
    learningOutcomes:
      'Architect and implement mission-critical real-time event streaming systems, perform approximate nearest neighbor vector searches for generative AI applications, build durable write-heavy storage engines using LSM-trees, and process out-of-order event streams with watermarks.',
    alignedDay: 16,
  },
];
