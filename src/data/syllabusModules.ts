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
];
