import { InterviewAssessmentQuestion } from '../types';

/**
 * SPSU Udaipur Placement Readiness Program
 * Mentor: Kapil | 100 Comprehensive Interview Readiness MCQs
 * Balanced Coverage: DSA Intuition, OOPs & Language Internals, OS, DBMS/SQL, Networks, SDLC & Behavioral
 */
export const INTERVIEW_READINESS_100_MCQS: InterviewAssessmentQuestion[] = [
  {
    "id": "ir-q-1",
    "question": "In an interview, you are asked to find two numbers in a sorted array that sum up to target T. What is the most optimal approach?",
    "options": [
      "Binary search every element in O(N log N) time and O(1) space",
      "Two Pointers from both ends converging inward in O(N) time and O(1) space",
      "Nested loops brute force in O(N^2) time and O(1) space",
      "Recursion tree with backtracking in O(2^N) time"
    ],
    "correctIndex": 1,
    "explanation": "Because the array is already sorted, the Two Pointer technique achieves optimal O(N) time and O(1) auxiliary space without requiring a hash map.",
    "track": "fresher",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Amazon",
      "TCS Digital",
      "Microsoft"
    ]
  },
  {
    "id": "ir-q-2",
    "question": "When should you choose a Hash Map over a Trie (Prefix Tree) when designing a search dictionary?",
    "options": [
      "When you only need exact string matching lookups in average O(1) time",
      "When you need auto-complete suggestions based on prefix",
      "When you need lexicographically sorted string traversal",
      "When memory is extremely constrained and strings share long common prefixes"
    ],
    "correctIndex": 0,
    "explanation": "A Hash Map provides O(1) average lookup for exact key matches. A Trie is strictly superior when prefix matching, auto-complete, or lexicographical sorting is required.",
    "track": "fresher",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Google",
      "Adobe"
    ]
  },
  {
    "id": "ir-q-3",
    "question": "What is the amortized time complexity of inserting an element into a dynamic array (like std::vector in C++ or ArrayList in Java)?",
    "options": [
      "O(N)",
      "O(log N)",
      "O(1)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "explanation": "While resizing occasionally takes O(N) time when capacity doubles, the cost distributed over N insertions yields an amortized O(1) time complexity per append.",
    "track": "universal",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Infosys SP",
      "Microsoft"
    ]
  },
  {
    "id": "ir-q-4",
    "question": "Which graph algorithm can find the shortest path from a single source in a directed graph that contains negative edge weights (provided there is no negative cycle)?",
    "options": [
      "Dijkstra's Algorithm",
      "Breadth-First Search (BFS)",
      "Bellman-Ford Algorithm",
      "Kruskal's Algorithm"
    ],
    "correctIndex": 2,
    "explanation": "Dijkstra assumes non-negative edge weights and fails with negative edges. Bellman-Ford correctly handles negative edge weights in O(V * E) time and detects negative cycles.",
    "track": "experienced",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Amazon",
      "Flipkart"
    ]
  },
  {
    "id": "ir-q-5",
    "question": "In a live interview, what is the best strategy when you are asked to find the 'K-th largest element' in an unsorted stream of numbers?",
    "options": [
      "Sort the entire array on every incoming number in O(N log N)",
      "Maintain a Min-Heap of size K in O(log K) insertion time",
      "Use a Max-Heap storing all N elements",
      "Linear scan through the stream in O(N * K)"
    ],
    "correctIndex": 1,
    "explanation": "A Min-Heap of size K keeps the K largest elements seen so far at the root, allowing O(log K) updates and O(1) retrieval of the K-th largest.",
    "track": "fresher",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Google",
      "Uber",
      "Cisco"
    ]
  },
  {
    "id": "ir-q-6",
    "question": "What is the key indicator in a problem statement that suggests applying the 'Sliding Window' pattern?",
    "options": [
      "The problem asks for topological ordering of dependencies",
      "The problem involves finding contiguous subarrays or substrings satisfying a specific condition (e.g. sum, distinct characters)",
      "The problem requires finding the minimum spanning tree",
      "The problem asks to permute all subsets of a collection"
    ],
    "correctIndex": 1,
    "explanation": "Sliding window applies directly to contiguous sequences (subarrays/substrings) where expanding the right pointer and contracting the left pointer maintains monotonic window invariants.",
    "track": "fresher",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Amazon",
      "TCS Digital"
    ]
  },
  {
    "id": "ir-q-7",
    "question": "What is the space complexity of an in-order depth-first traversal on a completely balanced Binary Search Tree with N nodes?",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)"
    ],
    "correctIndex": 1,
    "explanation": "On a balanced binary tree, the maximum call stack depth equals the tree height H = log2(N), giving O(log N) auxiliary stack space.",
    "track": "fresher",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Infosys",
      "Cognizant"
    ]
  },
  {
    "id": "ir-q-8",
    "question": "When implementing Breadth-First Search (BFS) on an unweighted graph, which data structure is mandatory for tracking node exploration order?",
    "options": [
      "Stack (LIFO)",
      "Queue (FIFO)",
      "Priority Queue",
      "Disjoint Set Union (DSU)"
    ],
    "correctIndex": 1,
    "explanation": "BFS requires a FIFO Queue to explore vertices radially level-by-level in increasing order of distance from the source.",
    "track": "fresher",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Wipro",
      "TCS"
    ]
  },
  {
    "id": "ir-q-9",
    "question": "What is the primary difference between Backtracking and Dynamic Programming (DP)?",
    "options": [
      "Backtracking is only for numbers while DP is only for strings",
      "DP stores solutions to overlapping subproblems to avoid recomputation; Backtracking explores all candidates and prunes invalid search branches without memoization unless enhanced",
      "Backtracking is always O(1) time",
      "DP can never be implemented iteratively"
    ],
    "correctIndex": 1,
    "explanation": "Dynamic programming requires optimal substructure and overlapping subproblems solved via memoization/tabulation. Backtracking is state-space depth exploration with pruning.",
    "track": "universal",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Microsoft",
      "Adobe"
    ]
  },
  {
    "id": "ir-q-10",
    "question": "In a Monotonic Stack, why would you maintain elements in strictly decreasing order from bottom to top?",
    "options": [
      "To find the Next Greater Element for each position in O(N) total time",
      "To sort the array in O(1) time",
      "To perform binary search on an unsorted list",
      "To invert a binary tree"
    ],
    "correctIndex": 0,
    "explanation": "A monotonic decreasing stack pops elements smaller than the incoming number, pinpointing the Next Greater Element in amortized O(1) operations per item.",
    "track": "experienced",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Google",
      "Amazon"
    ]
  },
  {
    "id": "ir-q-11",
    "question": "Which data structure is most optimal for implementing an LRU (Least Recently Used) Cache with O(1) get and put operations?",
    "options": [
      "Singly Linked List + Binary Search Tree",
      "Doubly Linked List + Hash Map",
      "Array + Min Heap",
      "Circular Queue + Stack"
    ],
    "correctIndex": 1,
    "explanation": "A Hash Map provides O(1) node lookup by key, while a Doubly Linked List enables O(1) node removal and insertion at the head for recency tracking.",
    "track": "universal",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Salesforce"
    ]
  },
  {
    "id": "ir-q-12",
    "question": "What is the cycle detection algorithm that uses two pointers moving at speeds of 1 step and 2 steps respectively?",
    "options": [
      "Dijkstra's Algorithm",
      "Floyd's Tortoise and Hare Algorithm",
      "Prim's Algorithm",
      "A* Search Algorithm"
    ],
    "correctIndex": 1,
    "explanation": "Floyd's Cycle-Finding Algorithm uses slow (1x) and fast (2x) pointers. If a cycle exists in the linked list, the fast pointer will lap and meet the slow pointer in O(N) time and O(1) space.",
    "track": "fresher",
    "category": "DSA & Algorithms",
    "companyTags": [
      "TCS",
      "Infosys",
      "Capgemini"
    ]
  },
  {
    "id": "ir-q-13",
    "question": "What does it mean when an algorithm has 'Optimal Substructure'?",
    "options": [
      "The code has no comments or helper functions",
      "An optimal solution to the overall problem contains within it optimal solutions to its subproblems",
      "The algorithm runs in strictly O(1) space",
      "The input data must be uniformly distributed"
    ],
    "correctIndex": 1,
    "explanation": "Optimal substructure is the mathematical property enabling Greedy algorithms and Dynamic Programming: solving sub-problems optimally directly forms the global optimal answer.",
    "track": "universal",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Adobe",
      "Microsoft"
    ]
  },
  {
    "id": "ir-q-14",
    "question": "Which of the following problems CANNOT be solved using a standard Greedy strategy?",
    "options": [
      "Fractional Knapsack Problem",
      "Activity Selection Problem",
      "Huffman Coding",
      "0/1 Knapsack Problem"
    ],
    "correctIndex": 3,
    "explanation": "0/1 Knapsack requires Dynamic Programming because items cannot be broken; a greedy choice based on value-to-weight ratio can miss the optimal combination.",
    "track": "fresher",
    "category": "DSA & Algorithms",
    "companyTags": [
      "TCS Digital",
      "Accenture"
    ]
  },
  {
    "id": "ir-q-15",
    "question": "In an interview, if an array of size N contains numbers from 1 to N with exactly one missing and one duplicate, what is the O(N) time and O(1) auxiliary space approach?",
    "options": [
      "Sort the array using QuickSort",
      "Use Hash Set to find the duplicate",
      "Index-as-hash sign negation or Mathematical Sum and Sum-of-Squares equations",
      "Double nested loop comparing all pairs"
    ],
    "correctIndex": 2,
    "explanation": "Negating elements at index abs(val)-1 or using Gauss sum formulas allows finding both missing and duplicate in O(N) time with zero extra heap memory.",
    "track": "universal",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Amazon",
      "Microsoft"
    ]
  },
  {
    "id": "ir-q-16",
    "question": "What is the time complexity of building a Binary Heap from an arbitrary array of N elements using the bottom-up heapify algorithm?",
    "options": [
      "O(N log N)",
      "O(N)",
      "O(N^2)",
      "O(log N)"
    ],
    "correctIndex": 1,
    "explanation": "Bottom-up heap construction (sifting down from N/2 to 0) sums to O(N) mathematically, because most nodes are near the leaves with small heights.",
    "track": "experienced",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Google",
      "Directi"
    ]
  },
  {
    "id": "ir-q-17",
    "question": "What is the worst-case time complexity of QuickSort and how can it be mitigated in production?",
    "options": [
      "O(N log N); use recursion",
      "O(N^2) when pivot is always extreme; mitigated by Randomized Pivot selection or Median-of-Three",
      "O(N); mitigated by bubble sort",
      "O(2^N); mitigated by multithreading"
    ],
    "correctIndex": 1,
    "explanation": "When the input is already sorted or reverse-sorted and the first/last element is picked as pivot, QuickSort degrades to O(N^2). Randomized pivoting guarantees expected O(N log N).",
    "track": "fresher",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Infosys",
      "TCS"
    ]
  },
  {
    "id": "ir-q-18",
    "question": "How can you verify if a directed graph contains a cycle during Topological Sort?",
    "options": [
      "If the processed output count equals total vertices V, there is no cycle; if fewer than V nodes are processed, a cycle exists (Kahn's Algorithm)",
      "If all vertices have degree > 2",
      "If the sum of edge weights is zero",
      "If the graph can be colored with 1 color"
    ],
    "correctIndex": 0,
    "explanation": "In Kahn's BFS algorithm, vertices with in-degree 0 are queued. If a cycle exists, cyclic nodes never reach in-degree 0, so the count of visited vertices is strictly less than V.",
    "track": "universal",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Amazon",
      "Uber"
    ]
  },
  {
    "id": "ir-q-19",
    "question": "Which data structure is used to implement a Trie node efficiently for lowercase English letters (a-z)?",
    "options": [
      "A fixed-size array of 26 pointers and a boolean flag isEndOfWord",
      "A circular linked list of characters",
      "A stack of strings",
      "A single 64-bit integer bitmask"
    ],
    "correctIndex": 0,
    "explanation": "A Trie node typically stores an array of size 26 for child pointers (children[char - 'a']) and a boolean isEndOfWord to mark completed words.",
    "track": "fresher",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Microsoft",
      "Adobe"
    ]
  },
  {
    "id": "ir-q-20",
    "question": "What is the 'Binary Search on Answer' pattern commonly used for in interviews?",
    "options": [
      "Searching a string in a dictionary",
      "Finding the minimum or maximum feasible value over a monotonic search space (e.g., Koko Eating Bananas, Capacity to Ship Packages)",
      "Balancing an AVL tree",
      "Finding cycles in linked lists"
    ],
    "correctIndex": 1,
    "explanation": "When the problem asks for the 'minimum maximum' or 'maximum minimum' and a predicate isValid(mid) is monotonic (True then False, or vice versa), Binary Search on Answer finds the threshold in O(log(Range) * checkCost).",
    "track": "experienced",
    "category": "DSA & Algorithms",
    "companyTags": [
      "Google",
      "Amazon",
      "Flipkart"
    ]
  },
  {
    "id": "ir-q-21",
    "question": "In Java, what happens in memory when you execute: String s1 = 'SPSU'; String s2 = new String('SPSU');?",
    "options": [
      "Both strings point to the same object in the String Constant Pool",
      "s1 references an object in the String Constant Pool, while s2 allocates a distinct object on the Java Heap",
      "Neither object is stored in memory",
      "Compilation error due to duplicate literal declaration"
    ],
    "correctIndex": 1,
    "explanation": "String literals are stored in the String Constant Pool inside heap memory. Using 'new String()' explicitly allocates a separate object on the normal heap outside the pool.",
    "track": "fresher",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro"
    ]
  },
  {
    "id": "ir-q-22",
    "question": "What is the difference between Compile-Time (Static) and Runtime (Dynamic) Polymorphism in C++ and Java?",
    "options": [
      "Static polymorphism is achieved via Method Overloading; Dynamic polymorphism is achieved via Method Overriding using virtual methods",
      "Static is for private classes; Dynamic is for public classes",
      "Static is slower than Dynamic",
      "There is no difference between them"
    ],
    "correctIndex": 0,
    "explanation": "Static polymorphism (Method Overloading / Templates) is resolved at compile time. Dynamic polymorphism (Method Overriding) is resolved at runtime via the Virtual Method Table (vtable).",
    "track": "universal",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Microsoft",
      "Cisco",
      "Oracle"
    ]
  },
  {
    "id": "ir-q-23",
    "question": "Why can an Abstract Class have a constructor if you cannot instantiate an abstract class directly?",
    "options": [
      "It is a bug in the compiler",
      "To initialize member fields of the abstract class when a concrete subclass constructor is invoked via super()",
      "Constructors in abstract classes are purely decorative",
      "Only static variables can be initialized"
    ],
    "correctIndex": 1,
    "explanation": "Subclasses invoke super() during instantiation to initialize inherited state defined in the abstract base class.",
    "track": "fresher",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Cognizant",
      "TCS",
      "Infosys"
    ]
  },
  {
    "id": "ir-q-24",
    "question": "What is the purpose of the 'virtual' keyword in C++ member function declarations?",
    "options": [
      "It forces the compiler to inline the function",
      "It enables dynamic dispatch via vtable so that the derived class implementation is invoked when called through a base class pointer/reference",
      "It makes the variable thread-safe",
      "It marks the function as deprecated"
    ],
    "correctIndex": 1,
    "explanation": "Without 'virtual', C++ binds calls at compile time based on the pointer type (early binding). 'virtual' enables late binding via the object's virtual table pointer (vptr).",
    "track": "universal",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Qualcomm",
      "Adobe",
      "Microsoft"
    ]
  },
  {
    "id": "ir-q-25",
    "question": "In Java, what is the contract between equals() and hashCode()?",
    "options": [
      "If two objects are equal according to equals(), they MUST return the same hashCode() value",
      "If two objects have the same hashCode(), they must be equal according to equals()",
      "hashCode() must always return 0 for custom objects",
      "equals() and hashCode() can operate completely independently without constraint"
    ],
    "correctIndex": 0,
    "explanation": "The Java specification mandates: if a.equals(b) is true, then a.hashCode() == b.hashCode() MUST be true. Otherwise, HashMaps and HashSets will fail to locate stored keys.",
    "track": "universal",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Amazon",
      "Goldman Sachs",
      "Morgan Stanley"
    ]
  },
  {
    "id": "ir-q-26",
    "question": "What is the Python Global Interpreter Lock (GIL) and how does it impact multi-threaded CPU-bound programs?",
    "options": [
      "It speeds up multithreaded calculation by 10x",
      "It is a mutex that prevents multiple native threads from executing Python bytecodes simultaneously, restricting CPU-bound multithreading to a single core",
      "It automatically compiles Python into machine assembly",
      "It enforces static type checking in Python"
    ],
    "correctIndex": 1,
    "explanation": "The GIL ensures thread safety in CPython's memory management, but limits CPU-bound multi-threading to one core. CPU parallelism in Python is achieved via multiprocessing.",
    "track": "experienced",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Google",
      "Meta",
      "Uber"
    ]
  },
  {
    "id": "ir-q-27",
    "question": "In C++, what is the difference between std::unique_ptr and std::shared_ptr?",
    "options": [
      "unique_ptr enforces exclusive ownership with zero overhead; shared_ptr uses reference counting to allow multiple owners and deletes the resource when ref count hits 0",
      "unique_ptr cannot be moved",
      "shared_ptr is only for primitive integers",
      "They are synonyms for raw pointers"
    ],
    "correctIndex": 0,
    "explanation": "std::unique_ptr cannot be copied (only moved) and has zero runtime overhead. std::shared_ptr manages shared ownership using a thread-safe control block reference counter.",
    "track": "experienced",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Adobe",
      "Qualcomm",
      "Nvidia"
    ]
  },
  {
    "id": "ir-q-28",
    "question": "What is the Diamond Problem in object-oriented inheritance and how is it resolved?",
    "options": [
      "A class has four fields of the same name",
      "Ambiguity arising when a class inherits from two classes that both inherit from a common base class; resolved in C++ using virtual inheritance and in Java by banning multiple class inheritance",
      "A memory leak in circular linked lists",
      "A syntax error when compiling 4 classes simultaneously"
    ],
    "correctIndex": 1,
    "explanation": "The Diamond Problem occurs when class D extends both B and C, which both derive from A. D receives duplicate copies of A. Java avoids this by permitting multiple interfaces but only single class inheritance.",
    "track": "fresher",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Infosys",
      "TCS Digital",
      "Wipro"
    ]
  },
  {
    "id": "ir-q-29",
    "question": "In Java, what is the key difference between final, finally, and finalize?",
    "options": [
      "final is a keyword for constants/immutability; finally is a block that always executes after try-catch; finalize was a deprecated method invoked prior to garbage collection",
      "They are identical and interchangeable",
      "finally is used to declare immutable classes",
      "finalize is called every time a thread starts"
    ],
    "correctIndex": 0,
    "explanation": "final defines immutable variables/unextendable classes/unoverridable methods. finally guarantees resource cleanup after try/catch. finalize() is a legacy Object cleanup hook deprecated since Java 9.",
    "track": "fresher",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "TCS",
      "Cognizant",
      "HCL"
    ]
  },
  {
    "id": "ir-q-30",
    "question": "What is the difference between Shallow Copy and Deep Copy?",
    "options": [
      "Shallow copy copies primitive values and references to nested objects; Deep copy recursively duplicates the nested objects, ensuring complete state isolation",
      "Shallow copy is for arrays; Deep copy is for strings",
      "Deep copy only copies pointers",
      "There is no difference in memory"
    ],
    "correctIndex": 0,
    "explanation": "A shallow copy duplicates only the top-level object, sharing inner heap references. Modifying a nested object in a shallow copy mutates the original. A deep copy creates an independent cloned graph.",
    "track": "universal",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Amazon",
      "Microsoft"
    ]
  },
  {
    "id": "ir-q-31",
    "question": "What is the purpose of the 'volatile' keyword in Java when applied to a variable?",
    "options": [
      "It makes the variable private to each thread's CPU cache",
      "It guarantees that reads and writes are made directly to main memory, ensuring cross-thread visibility and preventing compiler instruction reordering",
      "It locks the entire class for exclusive write access",
      "It makes the variable immutable like final"
    ],
    "correctIndex": 1,
    "explanation": "volatile instructs the JVM not to cache the variable in CPU registers, guaranteeing that all threads always read the freshest value from main memory.",
    "track": "experienced",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Morgan Stanley",
      "Oracle"
    ]
  },
  {
    "id": "ir-q-32",
    "question": "In Python, what is the difference between a list and a tuple?",
    "options": [
      "Lists are mutable and defined with square brackets []; Tuples are immutable and defined with parentheses ()",
      "Lists can only store integers; Tuples can store any data type",
      "Tuples are always slower than lists",
      "Lists cannot be sliced"
    ],
    "correctIndex": 0,
    "explanation": "Lists are mutable dynamic arrays. Tuples are immutable, have a smaller memory footprint, and can be used as dictionary keys when they contain only hashable elements.",
    "track": "fresher",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "TCS",
      "Accenture",
      "Cognizant"
    ]
  },
  {
    "id": "ir-q-33",
    "question": "What design principle is violated when a single class handles calculating salaries, generating PDF payslips, and executing direct bank transfers?",
    "options": [
      "Open/Closed Principle",
      "Single Responsibility Principle (SRP)",
      "Liskov Substitution Principle",
      "Interface Segregation Principle"
    ],
    "correctIndex": 1,
    "explanation": "The Single Responsibility Principle (SRP) states a class should have only one reason to change. Salary calculation, PDF formatting, and banking APIs represent three distinct responsibilities.",
    "track": "universal",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Google",
      "Amazon"
    ]
  },
  {
    "id": "ir-q-34",
    "question": "What is the role of the Java Garbage Collector (GC) Generational Hypothesis?",
    "options": [
      "Most allocated objects die young; memory is divided into Young (Eden, Survivor) and Old (Tenured) generations to optimize collection frequency",
      "Old objects must be deleted before young objects",
      "Garbage collection only runs when the computer shuts down",
      "All objects live forever unless explicitly set to null"
    ],
    "correctIndex": 0,
    "explanation": "Empirical evidence proves that >95% of objects are temporary and die shortly after allocation. Minor GC rapidly reclaims the Young generation without stopping the entire heap for Major GC.",
    "track": "experienced",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Flipkart",
      "Uber",
      "Oracle"
    ]
  },
  {
    "id": "ir-q-35",
    "question": "In C++, what is RAII (Resource Acquisition Is Initialization)?",
    "options": [
      "A compiler optimization for fast loops",
      "A programming idiom where resource holding (memory, sockets, files) is tied to object lifetime, automatically releasing resources in the destructor when exiting scope",
      "An algorithm for sorting vectors",
      "A library for graphics rendering"
    ],
    "correctIndex": 1,
    "explanation": "RAII guarantees zero memory or resource leaks even if exceptions are thrown, because local object destructors are reliably invoked during stack unwinding.",
    "track": "experienced",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Microsoft",
      "Adobe",
      "Qualcomm"
    ]
  },
  {
    "id": "ir-q-36",
    "question": "Why is String in Java designed to be immutable?",
    "options": [
      "To allow security in network connections/file paths, thread safety without synchronization, and caching in the String Constant Pool",
      "Because Java does not support memory mutation",
      "To prevent developers from using strings",
      "Because immutable strings use more RAM"
    ],
    "correctIndex": 0,
    "explanation": "String immutability is fundamental to Java: it allows safe sharing across threads, protects sensitive parameters (DB connection URLs, passwords), and enables caching in the String Constant Pool.",
    "track": "fresher",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "TCS Digital",
      "Infosys SP"
    ]
  },
  {
    "id": "ir-q-37",
    "question": "What is the difference between an Interface and an Abstract Class in modern Java (Java 8+)?",
    "options": [
      "An abstract class can maintain mutable instance state (non-static fields) and constructors; an interface cannot have instance state or constructors (only default/static methods and constants)",
      "Interfaces can never have any method implementations",
      "A class can extend multiple abstract classes",
      "Abstract classes cannot have concrete methods"
    ],
    "correctIndex": 0,
    "explanation": "Since Java 8, interfaces support default and static methods, but they still cannot store instance variables or define constructors. A class can implement multiple interfaces, but extend only one class.",
    "track": "universal",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Amazon",
      "Cisco"
    ]
  },
  {
    "id": "ir-q-38",
    "question": "In Python, what is a generator and what keyword is used to produce items lazily?",
    "options": [
      "A class that generates random numbers using return",
      "A function that returns an iterator using the 'yield' keyword, evaluating values on-demand to conserve memory",
      "A tool to compile C code",
      "A background thread that monitors CPU usage"
    ],
    "correctIndex": 1,
    "explanation": "Generators use 'yield' to pause execution and produce values lazily one at a time, avoiding storing large collections in memory (e.g., reading gigabyte log files line-by-line).",
    "track": "fresher",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Google",
      "Cognizant"
    ]
  },
  {
    "id": "ir-q-39",
    "question": "What happens during a Thread Context Switch in an operating system or JVM?",
    "options": [
      "The CPU clock speed is doubled",
      "The CPU registers, Program Counter, and stack pointers of the current thread are saved to its TCB/PCB, and the state of the scheduled thread is restored",
      "All heap memory is wiped clean",
      "The network card is reset"
    ],
    "correctIndex": 1,
    "explanation": "Context switching preserves the execution state of the preempted thread into its Thread Control Block (TCB) so it can resume seamlessly later. Context switches incur CPU cache invalidation overhead.",
    "track": "universal",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "Qualcomm",
      "Microsoft"
    ]
  },
  {
    "id": "ir-q-40",
    "question": "What is the purpose of the 'transient' keyword in Java serialization?",
    "options": [
      "It forces the field to be serialized into encrypted format",
      "It prevents the marked field from being serialized into the byte stream during object serialization (e.g., sensitive passwords, temporary cached values)",
      "It makes the variable thread-safe",
      "It converts integers into strings"
    ],
    "correctIndex": 1,
    "explanation": "Fields marked 'transient' are skipped by Java serialization mechanisms and initialized to default values (null, 0) upon deserialization.",
    "track": "fresher",
    "category": "OOPs & Language Internals",
    "companyTags": [
      "TCS",
      "Wipro"
    ]
  },
  {
    "id": "ir-q-41",
    "question": "Which of the following is NOT one of the 4 Coffman conditions required for a deadlock to occur?",
    "options": [
      "Mutual Exclusion",
      "Hold and Wait",
      "Preemption of Resources",
      "Circular Wait"
    ],
    "correctIndex": 2,
    "explanation": "The four Coffman conditions are: Mutual Exclusion, Hold and Wait, NO Preemption, and Circular Wait. If preemption is allowed, deadlocks cannot occur.",
    "track": "fresher",
    "category": "Operating Systems",
    "companyTags": [
      "Infosys",
      "TCS",
      "Amazon"
    ]
  },
  {
    "id": "ir-q-42",
    "question": "What is Belady's Anomaly in operating systems virtual memory management?",
    "options": [
      "The CPU crashes when memory exceeds 4GB",
      "Allocating MORE physical page frames causes MORE page faults under FIFO page replacement",
      "LRU page replacement causes infinite loops",
      "Virtual memory runs faster than physical RAM"
    ],
    "correctIndex": 1,
    "explanation": "Belady's Anomaly is a counter-intuitive phenomenon observed in FIFO page replacement where increasing the number of page frames leads to an increased number of page faults.",
    "track": "universal",
    "category": "Operating Systems",
    "companyTags": [
      "Microsoft",
      "Adobe"
    ]
  },
  {
    "id": "ir-q-43",
    "question": "What is the fundamental difference between a Process and a Thread?",
    "options": [
      "Processes share memory by default; Threads have completely isolated virtual memory",
      "A Process has an independent virtual address space; Threads inside the same process share code, data, and heap, but maintain private stacks and program counters",
      "Threads cannot run concurrently",
      "A process can only run on a single CPU core"
    ],
    "correctIndex": 1,
    "explanation": "Processes are isolated execution containers with distinct address spaces (requiring IPC to communicate). Threads are lightweight execution units within a process sharing heap memory.",
    "track": "fresher",
    "category": "Operating Systems",
    "companyTags": [
      "TCS Digital",
      "Cognizant",
      "Wipro"
    ]
  },
  {
    "id": "ir-q-44",
    "question": "What is the difference between a Mutex and a Binary Semaphore?",
    "options": [
      "A Mutex has ownership (only the locking thread can unlock it); a Semaphore is a signaling primitive with no ownership (any thread can signal/post)",
      "A Mutex can hold up to 100 threads",
      "Semaphores only work on Linux",
      "There is no difference between them"
    ],
    "correctIndex": 0,
    "explanation": "Mutex = Mutual Exclusion with thread ownership. Semaphore = Signaling mechanism where thread A can signal thread B without owning the lock.",
    "track": "universal",
    "category": "Operating Systems",
    "companyTags": [
      "Amazon",
      "Cisco",
      "Qualcomm"
    ]
  },
  {
    "id": "ir-q-45",
    "question": "What causes 'Thrashing' in an operating system virtual memory subsystem?",
    "options": [
      "A computer virus corrupting files",
      "Processes spend more time swapping pages into and out of disk swap space than executing CPU instructions because the sum of working sets exceeds available RAM",
      "A damaged hard drive platter",
      "Too many keyboard interrupts"
    ],
    "correctIndex": 1,
    "explanation": "Thrashing occurs when total working set sizes exceed physical RAM. The OS continuously faults pages to/from disk, causing CPU utilization to plummet near 0%.",
    "track": "universal",
    "category": "Operating Systems",
    "companyTags": [
      "Microsoft",
      "Oracle"
    ]
  },
  {
    "id": "ir-q-46",
    "question": "What is the purpose of the Translation Lookaside Buffer (TLB)?",
    "options": [
      "To buffer audio data for headphones",
      "A fast hardware cache in the MMU that stores recent virtual-to-physical page frame translations, avoiding 2-step memory lookups",
      "To translate English to machine assembly",
      "To store file system directory paths"
    ],
    "correctIndex": 1,
    "explanation": "The TLB caches virtual-to-physical address mappings. A TLB hit resolves the physical address in ~1ns; a TLB miss requires multi-level page table walks in RAM.",
    "track": "experienced",
    "category": "Operating Systems",
    "companyTags": [
      "Intel",
      "Qualcomm",
      "Nvidia"
    ]
  },
  {
    "id": "ir-q-47",
    "question": "Which CPU scheduling algorithm provides the theoretical minimum average waiting time for a given set of stationary processes?",
    "options": [
      "First-Come First-Served (FCFS)",
      "Shortest Job First (SJF / Preemptive SRTF)",
      "Round Robin (RR)",
      "Priority Scheduling"
    ],
    "correctIndex": 1,
    "explanation": "Shortest Job First (SJF) is mathematically proven to minimize average waiting time, although predicting exact burst times in advance is challenging in general-purpose OS kernels.",
    "track": "fresher",
    "category": "Operating Systems",
    "companyTags": [
      "TCS",
      "Infosys"
    ]
  },
  {
    "id": "ir-q-48",
    "question": "What is the purpose of the fork() system call in Unix/Linux operating systems?",
    "options": [
      "To terminate the current process",
      "To create a new child process that is an exact duplicate of the calling parent process (using Copy-On-Write)",
      "To divide the screen into two windows",
      "To mount a USB flash drive"
    ],
    "correctIndex": 1,
    "explanation": "fork() spawns a new child process with a duplicated address space. Modern kernels use Copy-On-Write (COW) so physical memory pages are only duplicated when one process writes.",
    "track": "universal",
    "category": "Operating Systems",
    "companyTags": [
      "Adobe",
      "Red Hat"
    ]
  },
  {
    "id": "ir-q-49",
    "question": "What is Priority Inversion and how do modern kernels prevent it?",
    "options": [
      "High priority tasks running faster than low priority tasks",
      "A low-priority thread holds a resource needed by a high-priority thread, while a medium-priority thread preempts the low-priority thread; resolved via Priority Inheritance",
      "When memory addresses are inverted in the register",
      "When threads run backwards"
    ],
    "correctIndex": 1,
    "explanation": "Priority Inversion famously halted the Mars Pathfinder spacecraft in 1997. Priority Inheritance temporarily boosts the low-priority lock holder's priority to match the blocked high-priority thread.",
    "track": "experienced",
    "category": "Operating Systems",
    "companyTags": [
      "Google",
      "Amazon",
      "Cisco"
    ]
  },
  {
    "id": "ir-q-50",
    "question": "What is the difference between Preemptive and Non-Preemptive scheduling?",
    "options": [
      "In preemptive scheduling, the OS can interrupt a running process to allocate CPU to a higher-priority task; in non-preemptive, the process retains the CPU until it terminates or yields",
      "Preemptive scheduling is only used for printers",
      "Non-preemptive scheduling is 100x faster",
      "There is no difference"
    ],
    "correctIndex": 0,
    "explanation": "Preemptive kernels (e.g., Round Robin, Preemptive Priority) ensure interactive responsiveness by slicing CPU time. Non-preemptive systems run tasks to completion, risking CPU hogging.",
    "track": "fresher",
    "category": "Operating Systems",
    "companyTags": [
      "TCS",
      "Wipro"
    ]
  },
  {
    "id": "ir-q-51",
    "question": "What is an 'Orphan Process' in Unix?",
    "options": [
      "A process whose child processes were terminated",
      "A process whose parent terminated before it did, which is then adopted by the init / systemd process (PID 1)",
      "A process that has no CPU assigned",
      "A process with syntax errors"
    ],
    "correctIndex": 1,
    "explanation": "When a parent process exits without waiting for its children, the remaining active children become orphans and are adopted by init (PID 1), which reaps their termination status.",
    "track": "fresher",
    "category": "Operating Systems",
    "companyTags": [
      "Infosys",
      "Cognizant"
    ]
  },
  {
    "id": "ir-q-52",
    "question": "What is a 'Zombie Process' in Unix?",
    "options": [
      "A process infected by malware",
      "A terminated process whose exit status has not yet been read by its parent via the wait() system call, maintaining an entry in the process table",
      "A process running without an executable binary",
      "A thread that refuses to sleep"
    ],
    "correctIndex": 1,
    "explanation": "A zombie has finished execution and released its memory, but retains its PCB entry in the process table so its parent can read its exit code. If parents fail to call wait(), the process table exhausts.",
    "track": "universal",
    "category": "Operating Systems",
    "companyTags": [
      "Microsoft",
      "Amazon"
    ]
  },
  {
    "id": "ir-q-53",
    "question": "Which algorithm is used in operating systems for Deadlock Avoidance by simulating resource allocations before granting them?",
    "options": [
      "Dijkstra's Banker's Algorithm",
      "Kruskal's Algorithm",
      "Round Robin Algorithm",
      "Aho-Corasick Algorithm"
    ],
    "correctIndex": 0,
    "explanation": "Banker's Algorithm tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources, ensuring the system never enters an unsafe state.",
    "track": "universal",
    "category": "Operating Systems",
    "companyTags": [
      "TCS Digital",
      "Infosys SP"
    ]
  },
  {
    "id": "ir-q-54",
    "question": "What is the difference between Internal and External Fragmentation in memory management?",
    "options": [
      "Internal occurs when allocated memory block is larger than requested data; External occurs when total free memory is sufficient but non-contiguous",
      "Internal is on hard drives; External is on USB drives",
      "Internal only happens in Python",
      "External fragmentation has zero performance impact"
    ],
    "correctIndex": 0,
    "explanation": "Internal fragmentation leaves wasted slack bytes inside allocated pages. External fragmentation scatters free memory holes across RAM, preventing allocation of large contiguous blocks.",
    "track": "fresher",
    "category": "Operating Systems",
    "companyTags": [
      "TCS",
      "Accenture"
    ]
  },
  {
    "id": "ir-q-55",
    "question": "What is the role of the 'volatile' keyword in C/C++ embedded programming and kernel drivers?",
    "options": [
      "It makes variables thread-safe like a mutex",
      "It instructs the compiler not to optimize or cache variable reads/writes, ensuring the hardware register or memory-mapped I/O is accessed every time",
      "It encrypts the variable in RAM",
      "It makes the variable global across all files"
    ],
    "correctIndex": 1,
    "explanation": "In C/C++, volatile prevents compiler optimizations (such as caching in registers or eliminating seemingly redundant loops) for variables modified by external hardware or interrupt routines.",
    "track": "experienced",
    "category": "Operating Systems",
    "companyTags": [
      "Qualcomm",
      "Nvidia",
      "Intel"
    ]
  },
  {
    "id": "ir-q-56",
    "question": "What is the difference between DELETE, TRUNCATE, and DROP in SQL?",
    "options": [
      "DELETE is a DML command that removes specific rows and can be rolled back; TRUNCATE is a DDL command that deallocates all pages fast; DROP deletes the entire table schema and data",
      "TRUNCATE can use a WHERE clause",
      "DELETE is faster than TRUNCATE on 10 million rows",
      "DROP preserves table structure"
    ],
    "correctIndex": 0,
    "explanation": "DELETE scans and logs each row deletion (can use WHERE). TRUNCATE deallocates data pages quickly with minimal logging and resets identity counters. DROP removes schema and data permanently.",
    "track": "fresher",
    "category": "DBMS & SQL",
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant"
    ]
  },
  {
    "id": "ir-q-57",
    "question": "What is a 'Dirty Read' anomaly in database transaction isolation levels?",
    "options": [
      "Reading data from an unformatted disk",
      "A transaction reads uncommitted data written by another concurrent transaction that might later be rolled back",
      "Reading data with SQL syntax errors",
      "Reading duplicate primary keys"
    ],
    "correctIndex": 1,
    "explanation": "A Dirty Read occurs at Read Uncommitted isolation level when Transaction A reads modifications made by Transaction B before B commits; if B aborts, A processed phantom phantom non-existent data.",
    "track": "universal",
    "category": "DBMS & SQL",
    "companyTags": [
      "Oracle",
      "Microsoft"
    ]
  },
  {
    "id": "ir-q-58",
    "question": "What is the difference between Clustered and Non-Clustered Indexes in a relational database?",
    "options": [
      "A Clustered Index determines the physical order of data rows on disk (only 1 per table); a Non-Clustered Index is a separate B+ tree storing pointers to the clustered index or heap",
      "A table can have 10 Clustered Indexes",
      "Non-Clustered indexes are slower than full table scans",
      "Clustered indexes are only for string columns"
    ],
    "correctIndex": 0,
    "explanation": "Because leaf nodes of a Clustered Index contain the actual physical table rows, there can be only one clustered index per table (typically the Primary Key).",
    "track": "universal",
    "category": "DBMS & SQL",
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Flipkart"
    ]
  },
  {
    "id": "ir-q-59",
    "question": "What is Database Normalization and why do we normalize schemas up to 3rd Normal Form (3NF)?",
    "options": [
      "To increase data duplication for speed",
      "To minimize data redundancy and eliminate insert, update, and delete anomalies by ensuring non-key attributes depend solely on the primary key",
      "To convert SQL into MongoDB NoSQL",
      "To compress database tables using ZIP"
    ],
    "correctIndex": 1,
    "explanation": "Normalization organizes data into related tables: 1NF removes repeating groups; 2NF removes partial key dependencies; 3NF removes transitive dependencies (A -> B -> C).",
    "track": "fresher",
    "category": "DBMS & SQL",
    "companyTags": [
      "TCS",
      "Capgemini",
      "Accenture"
    ]
  },
  {
    "id": "ir-q-60",
    "question": "In SQL, what is the difference between WHERE and HAVING clauses?",
    "options": [
      "WHERE filters individual rows before grouping; HAVING filters aggregated groups after GROUP BY execution",
      "HAVING cannot be used without ORDER BY",
      "WHERE is only for string columns",
      "They are 100% interchangeable"
    ],
    "correctIndex": 0,
    "explanation": "WHERE filters raw records prior to aggregation (cannot evaluate aggregate functions like SUM, COUNT). HAVING applies predicate filters on aggregated groups.",
    "track": "fresher",
    "category": "DBMS & SQL",
    "companyTags": [
      "Infosys",
      "Wipro",
      "TCS Digital"
    ]
  },
  {
    "id": "ir-q-61",
    "question": "What does the 'I' in ACID stand for and what are the standard ANSI SQL isolation levels?",
    "options": [
      "Integrity: Low, Medium, High",
      "Isolation: Read Uncommitted, Read Committed, Repeatable Read, Serializable",
      "Indexing: B-Tree, Hash, GiST, GIN",
      "Iteration: While, For, Do-While"
    ],
    "correctIndex": 1,
    "explanation": "Isolation prevents concurrent transactions from seeing each other's intermediate uncommitted states. Serializable provides the highest guarantee by simulating strictly sequential execution.",
    "track": "universal",
    "category": "DBMS & SQL",
    "companyTags": [
      "Amazon",
      "Google"
    ]
  },
  {
    "id": "ir-q-62",
    "question": "What is the N+1 Query Problem in Object-Relational Mapping (ORM) frameworks like Hibernate or Entity Framework?",
    "options": [
      "Executing N queries when 1 query would suffice",
      "An application fetches N parent records in 1 query, and then issues N separate individual queries to fetch child associations for each record, degrading performance; solved via Eager/JOIN fetching",
      "A deadlock involving N+1 databases",
      "An off-by-one index error in SQL arrays"
    ],
    "correctIndex": 1,
    "explanation": "If you load 100 users and then access their orders, an unoptimized ORM executes 1 query for users and 100 queries for orders (101 total). It is resolved by JOIN FETCH or batch fetching.",
    "track": "experienced",
    "category": "DBMS & SQL",
    "companyTags": [
      "Uber",
      "Swiggy",
      "Amazon"
    ]
  },
  {
    "id": "ir-q-63",
    "question": "What is the CAP Theorem in distributed databases?",
    "options": [
      "A distributed system can simultaneously provide at most two of: Consistency, Availability, and Partition Tolerance",
      "Computers Always Process data sequentially",
      "Capacity, Accuracy, and Performance cannot be measured",
      "Cloud Applications must use PostgreSQL"
    ],
    "correctIndex": 0,
    "explanation": "Formulated by Eric Brewer: In the presence of a network partition (P), a distributed system must choose between returning errors/waiting (Consistency - CP) or serving stale reads (Availability - AP).",
    "track": "experienced",
    "category": "DBMS & SQL",
    "companyTags": [
      "Amazon",
      "Google",
      "Microsoft"
    ]
  },
  {
    "id": "ir-q-64",
    "question": "In SQL, what does the UNION operator do compared to UNION ALL?",
    "options": [
      "UNION combines result sets and removes duplicate rows by sorting; UNION ALL combines result sets without removing duplicates, making it faster",
      "UNION ALL deletes the table",
      "UNION is only for numerical tables",
      "UNION ALL is slower because it creates new schemas"
    ],
    "correctIndex": 0,
    "explanation": "UNION performs a deduplication step requiring sorting or hashing. UNION ALL simply concatenates the two streams, offering significantly higher execution speed.",
    "track": "fresher",
    "category": "DBMS & SQL",
    "companyTags": [
      "TCS",
      "Infosys",
      "Cognizant"
    ]
  },
  {
    "id": "ir-q-65",
    "question": "What is Write-Ahead Logging (WAL) in database storage engines?",
    "options": [
      "Writing logs after committing transactions",
      "A technique where changes are appended sequentially to a durable log file on disk BEFORE data pages are written to the main database tables, guaranteeing Durability and Crash Recovery",
      "Writing logs to a remote email server",
      "Logging user keystrokes in the terminal"
    ],
    "correctIndex": 1,
    "explanation": "Sequential disk writes to WAL are fast. If power fails before dirty buffer pages reach disk, the database replays the WAL on restart (REDO) to reconstruct committed states.",
    "track": "experienced",
    "category": "DBMS & SQL",
    "companyTags": [
      "PostgreSQL",
      "Oracle",
      "CockroachDB"
    ]
  },
  {
    "id": "ir-q-66",
    "question": "What is a Foreign Key constraint in a relational database?",
    "options": [
      "A key used to access foreign international websites",
      "A field or collection of fields in one table that uniquely identifies a row in another table, enforcing referential integrity",
      "A secret encryption password",
      "A secondary index on strings"
    ],
    "correctIndex": 1,
    "explanation": "Foreign keys guarantee referential integrity: you cannot insert a child record with a foreign key that does not exist in the referenced parent table.",
    "track": "fresher",
    "category": "DBMS & SQL",
    "companyTags": [
      "TCS",
      "Wipro",
      "HCL"
    ]
  },
  {
    "id": "ir-q-67",
    "question": "When should you choose a NoSQL database (like MongoDB or Cassandra) over a Relational SQL database (like PostgreSQL)?",
    "options": [
      "When schemas are dynamic/polymorphic, horizontal write scalability across clusters is critical, and strict multi-table ACID joins are not mandatory",
      "When you need complex multi-table SQL joins and financial transactions",
      "Because NoSQL databases are always free",
      "When you only store 10 rows of data"
    ],
    "correctIndex": 0,
    "explanation": "NoSQL databases excel at horizontal scaling, document/key-value storage, and high-throughput ingestion where flexible schemas and partitioned data outshine relational joins.",
    "track": "universal",
    "category": "DBMS & SQL",
    "companyTags": [
      "Amazon",
      "Netflix",
      "Uber"
    ]
  },
  {
    "id": "ir-q-68",
    "question": "What is Database Sharding?",
    "options": [
      "Deleting unused tables",
      "Horizontal partitioning of a database into smaller, faster, independent chunks called shards distributed across multiple physical database servers",
      "Backing up data to a single tape drive",
      "Compressing SQL strings"
    ],
    "correctIndex": 1,
    "explanation": "Sharding splits large tables across multiple database instances based on a shard key (e.g., hash(user_id)), eliminating single-server storage and CPU ceilings.",
    "track": "experienced",
    "category": "DBMS & SQL",
    "companyTags": [
      "Uber",
      "Meta",
      "Swiggy"
    ]
  },
  {
    "id": "ir-q-69",
    "question": "What is a View in SQL and does a standard view store data physically on disk?",
    "options": [
      "A view is a virtual table defined by a SQL query; it does not store data physically unless created as a Materialized View",
      "A view is an image file of the database schema",
      "A view stores duplicate data taking 2x disk space",
      "A view can only be created by system administrators"
    ],
    "correctIndex": 0,
    "explanation": "A standard SQL View is a saved query definition re-executed on demand. A Materialized View physically caches query results on disk and refreshes periodically.",
    "track": "fresher",
    "category": "DBMS & SQL",
    "companyTags": [
      "TCS Digital",
      "Infosys"
    ]
  },
  {
    "id": "ir-q-70",
    "question": "What is SQL Injection (SQLi) and how is it completely prevented?",
    "options": [
      "Injecting SQL into hardware RAM; prevented by antivirus",
      "A security vulnerability where malicious SQL commands are injected into data inputs; prevented by using Parameterized Prepared Statements and Object Relational Mappers",
      "A virus that deletes hard drives",
      "A database crash caused by large queries"
    ],
    "correctIndex": 1,
    "explanation": "SQL injection occurs when untrusted input is concatenated directly into query strings. Parameterized queries ensure the database driver treats input strictly as literal values, never executable SQL.",
    "track": "universal",
    "category": "DBMS & SQL",
    "companyTags": [
      "Microsoft",
      "Cisco",
      "Amazon"
    ]
  },
  {
    "id": "ir-q-71",
    "question": "In the TCP 3-Way Handshake, what packets are exchanged between Client and Server to establish a connection?",
    "options": [
      "1. Client SYN ➔ 2. Server SYN-ACK ➔ 3. Client ACK",
      "1. Client ACK ➔ 2. Server SYN ➔ 3. Client FIN",
      "1. Client PING ➔ 2. Server PONG",
      "1. Client HELLO ➔ 2. Server OK"
    ],
    "correctIndex": 0,
    "explanation": "The client synchronizes sequence numbers with SYN. The server acknowledges and sends its own SYN (SYN-ACK). The client completes the handshake with ACK.",
    "track": "fresher",
    "category": "Networks & Security",
    "companyTags": [
      "Cisco",
      "TCS",
      "Infosys"
    ]
  },
  {
    "id": "ir-q-72",
    "question": "What is the primary difference between TCP and UDP at the Transport Layer?",
    "options": [
      "TCP is connection-oriented, reliable, and ordered with flow/congestion control; UDP is connectionless, lightweight, and unordered with minimal latency overhead",
      "TCP is for videos; UDP is for text emails",
      "UDP is 100% reliable; TCP drops packets",
      "TCP only works over fiber optic cables"
    ],
    "correctIndex": 0,
    "explanation": "TCP guarantees ordered byte streams via retransmissions and acknowledgments. UDP has zero handshake overhead, making it ideal for DNS, VoIP, and gaming.",
    "track": "fresher",
    "category": "Networks & Security",
    "companyTags": [
      "Cisco",
      "Amazon",
      "Microsoft"
    ]
  },
  {
    "id": "ir-q-73",
    "question": "Why does a TCP connection enter the TIME_WAIT state for 2*MSL (Maximum Segment Lifetime) during teardown?",
    "options": [
      "To waste server memory",
      "To ensure the final ACK was received by the remote peer and to allow lingering delayed duplicate packets in the network to expire before reusing the port pair",
      "To download new security updates",
      "To restart the physical network router"
    ],
    "correctIndex": 1,
    "explanation": "TIME_WAIT prevents old delayed duplicate packets from being mistaken as belonging to a newly opened connection on the same IP:Port pair.",
    "track": "experienced",
    "category": "Networks & Security",
    "companyTags": [
      "Cloudflare",
      "Google",
      "Amazon"
    ]
  },
  {
    "id": "ir-q-74",
    "question": "How does HTTP/2 achieve superior throughput over HTTP/1.1?",
    "options": [
      "By compressing text into ZIP files",
      "By introducing Binary Framing, Multiplexing multiple bidirectional streams over a single TCP connection, and Header Compression (HPACK)",
      "By removing encryption entirely",
      "By using UDP instead of TCP"
    ],
    "correctIndex": 1,
    "explanation": "HTTP/1.1 suffered from Head-of-Line blocking across multiple TCP connections. HTTP/2 multiplexes independent streams over one connection and compresses headers.",
    "track": "universal",
    "category": "Networks & Security",
    "companyTags": [
      "Google",
      "Meta",
      "Cloudflare"
    ]
  },
  {
    "id": "ir-q-75",
    "question": "What transport protocol does HTTP/3 utilize instead of standard TCP?",
    "options": [
      "UDP with QUIC (Quick UDP Internet Connections)",
      "SCTP",
      "ICMP",
      "Raw Ethernet Frames"
    ],
    "correctIndex": 0,
    "explanation": "HTTP/3 replaces TCP with QUIC over UDP, eliminating TCP-level head-of-line blocking, accelerating connection setup to 0-RTT, and supporting seamless connection migration across networks.",
    "track": "experienced",
    "category": "Networks & Security",
    "companyTags": [
      "Google",
      "Cloudflare",
      "Uber"
    ]
  },
  {
    "id": "ir-q-76",
    "question": "What is Cross-Origin Resource Sharing (CORS) in web browsers?",
    "options": [
      "A mechanism to share hard drives over the internet",
      "A browser security standard that uses HTTP headers to determine whether a web page on one domain can access resources hosted on a different domain",
      "A protocol for connecting Bluetooth devices",
      "A programming language for servers"
    ],
    "correctIndex": 1,
    "explanation": "The Same-Origin Policy blocks cross-origin requests by default. CORS headers (Access-Control-Allow-Origin) allow servers to whitelist trusted client domains.",
    "track": "universal",
    "category": "Networks & Security",
    "companyTags": [
      "Amazon",
      "Microsoft"
    ]
  },
  {
    "id": "ir-q-77",
    "question": "What is the difference between Symmetric and Asymmetric Encryption?",
    "options": [
      "Symmetric uses the same secret key for encryption and decryption; Asymmetric uses a mathematically linked Public-Private key pair",
      "Symmetric is only for passwords; Asymmetric is for files",
      "Asymmetric encryption is 10,000x faster than Symmetric",
      "There is no mathematical difference"
    ],
    "correctIndex": 0,
    "explanation": "Asymmetric encryption (RSA, ECC) enables secure key exchange without prior shared secrets. Once established, symmetric encryption (AES-256) handles bulk data transfer fast.",
    "track": "fresher",
    "category": "Networks & Security",
    "companyTags": [
      "TCS",
      "Infosys",
      "Cisco"
    ]
  },
  {
    "id": "ir-q-78",
    "question": "What is Cross-Site Scripting (XSS) and what is the primary defense against it?",
    "options": [
      "Injecting SQL into databases; defended by firewalls",
      "Injecting malicious client-side JavaScript into trusted websites viewed by other users; defended by context-aware HTML output escaping and Content Security Policy (CSP)",
      "Flooding servers with SYN packets",
      "Intercepting unencrypted Wi-Fi passwords"
    ],
    "correctIndex": 1,
    "explanation": "XSS executes unauthorized scripts in a victim's browser, potentially stealing session cookies. Sanitizing and escaping untrusted data before rendering prevents XSS.",
    "track": "universal",
    "category": "Networks & Security",
    "companyTags": [
      "Google",
      "Microsoft",
      "Amazon"
    ]
  },
  {
    "id": "ir-q-79",
    "question": "What does an HTTP 429 status code signify to an API client?",
    "options": [
      "Internal Server Error",
      "Too Many Requests (Rate limit exceeded)",
      "Unauthorized Access",
      "Resource Not Found"
    ],
    "correctIndex": 1,
    "explanation": "HTTP 429 Too Many Requests indicates that the client has sent too many requests in a given time window, often returning a 'Retry-After' header for backoff.",
    "track": "fresher",
    "category": "Networks & Security",
    "companyTags": [
      "Stripe",
      "Twilio",
      "Amazon"
    ]
  },
  {
    "id": "ir-q-80",
    "question": "What is the function of an API Gateway in a microservices architecture?",
    "options": [
      "It acts as a single reverse proxy entry point handling routing, authentication, SSL termination, rate limiting, and observability for backend microservices",
      "It compiles Java code into JavaScript",
      "It replaces the database completely",
      "It connects physical Ethernet cables to servers"
    ],
    "correctIndex": 0,
    "explanation": "An API Gateway decouples external clients from internal microservices topologies, providing centralized auth, traffic shaping, rate limiting, and request routing.",
    "track": "experienced",
    "category": "Networks & Security",
    "companyTags": [
      "Amazon",
      "Uber",
      "Netflix"
    ]
  },
  {
    "id": "ir-q-81",
    "question": "In Git, what is the critical difference between 'git merge' and 'git rebase'?",
    "options": [
      "git merge creates a new merge commit preserving exact branch history; git rebase rewrites commit history by replaying branch commits onto the tip of the target branch for a linear log",
      "git rebase deletes all files on your hard drive",
      "git merge can only be used on the main branch",
      "They perform identical actions under the hood"
    ],
    "correctIndex": 0,
    "explanation": "Merge preserves chronological non-destructive history with merge commits. Rebase produces a clean linear commit graph by reapplying local commits on top of the base.",
    "track": "universal",
    "category": "SDLC & Developer Tools",
    "companyTags": [
      "Microsoft",
      "Atlassian",
      "GitHub"
    ]
  },
  {
    "id": "ir-q-82",
    "question": "What does 'git cherry-pick <commit-hash>' do?",
    "options": [
      "Deletes the selected commit",
      "Applies the exact changes introduced by a specific existing commit from another branch onto your currently checked-out branch",
      "Creates a fruit icon next to the commit",
      "Reverts the last 5 commits"
    ],
    "correctIndex": 1,
    "explanation": "Cherry-pick copies an individual commit's changes and commits it cleanly to your active branch without merging the entire source branch.",
    "track": "fresher",
    "category": "SDLC & Developer Tools",
    "companyTags": [
      "TCS Digital",
      "Infosys"
    ]
  },
  {
    "id": "ir-q-83",
    "question": "What is the Test Pyramid concept in software engineering?",
    "options": [
      "A monument in Egypt",
      "A testing philosophy advocating for a broad base of fast Unit Tests, a middle tier of Integration Tests, and a narrow top of slow End-to-End (E2E) UI Tests",
      "Testing only in production",
      "Testing 100% of code manually with spreadsheets"
    ],
    "correctIndex": 1,
    "explanation": "The Test Pyramid maximizes feedback velocity and test reliability: fast, cheap unit tests catch 80% of regressions, while integration and UI tests verify end-to-end user journeys.",
    "track": "universal",
    "category": "SDLC & Developer Tools",
    "companyTags": [
      "Google",
      "Amazon",
      "ThoughtWorks"
    ]
  },
  {
    "id": "ir-q-84",
    "question": "What is the difference between a Docker Container and a Virtual Machine (VM)?",
    "options": [
      "Containers share the host OS kernel and isolate user spaces via namespaces and cgroups (lightweight, starts in milliseconds); VMs run complete guest operating systems on a hypervisor",
      "VMs are always faster than containers",
      "Containers only run on Windows",
      "A container cannot run code"
    ],
    "correctIndex": 0,
    "explanation": "Because containers share the host kernel without guest OS virtualization overhead, they consume a fraction of the memory and launch in seconds.",
    "track": "universal",
    "category": "SDLC & Developer Tools",
    "companyTags": [
      "Red Hat",
      "Microsoft",
      "Docker"
    ]
  },
  {
    "id": "ir-q-85",
    "question": "In Agile Scrum methodology, what is the primary purpose of the Daily Standup meeting?",
    "options": [
      "A 3-hour lecture by the project manager",
      "A 15-minute synchronization where team members share: What was done yesterday, what will be done today, and any blockers impeding progress",
      "A performance review meeting",
      "A code debugging session"
    ],
    "correctIndex": 1,
    "explanation": "Daily Standups promote peer accountability, surface blockers quickly, and maintain sprint goal alignment in a brief 15-minute timebox.",
    "track": "fresher",
    "category": "SDLC & Developer Tools",
    "companyTags": [
      "Infosys",
      "Wipro",
      "TCS"
    ]
  },
  {
    "id": "ir-q-86",
    "question": "What is Test-Driven Development (TDD) cycle?",
    "options": [
      "Red (Write a failing test) ➔ Green (Write minimal code to pass) ➔ Refactor (Clean up code while tests pass)",
      "Code first, test later if time permits",
      "Deploy to production, wait for customer bugs",
      "Delete failing tests so CI passes"
    ],
    "correctIndex": 0,
    "explanation": "TDD follows Red-Green-Refactor. Writing tests first forces modular API design and guarantees comprehensive regression safety nets.",
    "track": "universal",
    "category": "SDLC & Developer Tools",
    "companyTags": [
      "Amazon",
      "ThoughtWorks"
    ]
  },
  {
    "id": "ir-q-87",
    "question": "What is Canary Deployment in modern CI/CD release engineering?",
    "options": [
      "Releasing software only to internal pet birds",
      "Rolling out a new software release to a small subset of real users (e.g., 5%) to observe error rates and performance before full fleet deployment",
      "Shutting down all servers simultaneously",
      "Deploying code without running unit tests"
    ],
    "correctIndex": 1,
    "explanation": "Canary deployments limit blast radius: automated monitoring compares metrics between canary and baseline instances, rolling back instantly if latency or errors spike.",
    "track": "experienced",
    "category": "SDLC & Developer Tools",
    "companyTags": [
      "Netflix",
      "Google",
      "Meta"
    ]
  },
  {
    "id": "ir-q-88",
    "question": "What does the command 'git reset --hard HEAD~1' do?",
    "options": [
      "Pushes the commit to GitHub",
      "Moves HEAD back by 1 commit and DISCARDS all uncommitted changes in both the staging index and working directory permanently",
      "Creates a backup zip file",
      "Creates a new branch"
    ],
    "correctIndex": 1,
    "explanation": "--hard resets both the staging index and working tree, destroying any uncommitted modifications. --soft moves HEAD while keeping changes staged.",
    "track": "universal",
    "category": "SDLC & Developer Tools",
    "companyTags": [
      "Atlassian",
      "GitHub"
    ]
  },
  {
    "id": "ir-q-89",
    "question": "In code reviews, what should a senior engineer prioritize over minor stylistic nitpicks?",
    "options": [
      "Font size in the IDE",
      "Architectural design, algorithmic correctness, concurrency bugs, data race conditions, boundary edge cases, and security vulnerabilities",
      "Tabs vs spaces exclusively",
      "Rewriting the author's code into a personal preferred style"
    ],
    "correctIndex": 1,
    "explanation": "Linters and formatters handle stylistic formatting automatically. Human code reviews must focus on logic bugs, security, scalability, and maintainability.",
    "track": "experienced",
    "category": "SDLC & Developer Tools",
    "companyTags": [
      "Google",
      "Amazon"
    ]
  },
  {
    "id": "ir-q-90",
    "question": "What is Semantic Versioning (SemVer) format MAJOR.MINOR.PATCH (e.g., 2.4.1)?",
    "options": [
      "MAJOR for breaking API changes, MINOR for backwards-compatible new features, PATCH for backwards-compatible bug fixes",
      "MAJOR for year, MINOR for month, PATCH for day",
      "Random numbers chosen by developers",
      "MAJOR for price increase"
    ],
    "correctIndex": 0,
    "explanation": "SemVer communicates change impact clearly: bumping MAJOR warns consumers of breaking changes; MINOR adds functionality safely; PATCH patches defects safely.",
    "track": "fresher",
    "category": "SDLC & Developer Tools",
    "companyTags": [
      "Microsoft",
      "GitHub"
    ]
  },
  {
    "id": "ir-q-91",
    "question": "When an interviewer asks 'Tell me about yourself', what is the recommended structure and duration?",
    "options": [
      "Talk about your childhood for 10 minutes",
      "A structured 90-second overview covering: Present (Current education/skills), Past (Key projects & internships), and Future (Why you are excited about this specific role)",
      "Read your resume word-for-word",
      "Say 'Everything is in my resume, what do you want to know?'"
    ],
    "correctIndex": 1,
    "explanation": "The Present-Past-Future framework keeps the answer crisp, relevant, professional, and directly linked to how your background solves the employer's needs.",
    "track": "universal",
    "category": "HR & Behavioral",
    "companyTags": [
      "All Companies"
    ]
  },
  {
    "id": "ir-q-92",
    "question": "In the STAR framework for answering behavioral interview questions, what do the letters stand for?",
    "options": [
      "Strategy, Technology, Architecture, Roadmap",
      "Situation, Task, Action, Result",
      "Skills, Talent, Attitude, Reliability",
      "Speed, Time, Accuracy, Review"
    ],
    "correctIndex": 1,
    "explanation": "STAR (Situation, Task, Action, Result) ensures structured storytelling. Allocate most of your speaking time to the 'Action' step to highlight your individual contributions.",
    "track": "universal",
    "category": "HR & Behavioral",
    "companyTags": [
      "Amazon",
      "Google",
      "TCS"
    ]
  },
  {
    "id": "ir-q-93",
    "question": "How should you answer the classic interview question: 'What is your greatest weakness?'",
    "options": [
      "Say: 'I am too much of a perfectionist and work too hard'",
      "Share a genuine, non-fatal professional technical skill you recognized was lacking, and explain the concrete, proactive steps you took to improve it",
      "Say: 'I do not have any weaknesses'",
      "Confess that you dislike arriving at work on time"
    ],
    "correctIndex": 1,
    "explanation": "Interviewers seek self-awareness and active growth mindset. Acknowledging a real growth area and explaining how you mitigated it demonstrates maturity.",
    "track": "universal",
    "category": "HR & Behavioral",
    "companyTags": [
      "All Companies"
    ]
  },
  {
    "id": "ir-q-94",
    "question": "If you disagree with an interviewer's critique of your code during a technical round, what is the best response?",
    "options": [
      "Argue aggressively until the interviewer admits defeat",
      "Listen attentively, ask clarifying questions to understand their perspective, and calmly explain your rationale using trade-offs while remaining open to their feedback",
      "Stop talking and refuse to write more code",
      "Say 'Whatever you say' and disengage"
    ],
    "correctIndex": 1,
    "explanation": "Interviewers evaluate coachability and collaboration. Treating disagreement as a collaborative design trade-off discussion demonstrates senior team maturity.",
    "track": "universal",
    "category": "HR & Behavioral",
    "companyTags": [
      "Amazon",
      "Google",
      "Microsoft"
    ]
  },
  {
    "id": "ir-q-95",
    "question": "When an interviewer asks at the end: 'Do you have any questions for me?', what is the best approach?",
    "options": [
      "Say 'No, everything was covered'",
      "Ask thoughtful questions about team engineering culture, deployment frequency, recent architectural migrations, or what distinguishes great performers on their team",
      "Ask 'How much will you pay me?'",
      "Ask 'Did I pass this interview?'"
    ],
    "correctIndex": 1,
    "explanation": "Asking insightful engineering questions shows genuine passion, research, and intellectual curiosity. It turns the interview into a mutual two-way conversation.",
    "track": "universal",
    "category": "HR & Behavioral",
    "companyTags": [
      "All Companies"
    ]
  },
  {
    "id": "ir-q-96",
    "question": "How should you answer: 'Where do you see yourself in 3 to 5 years?'",
    "options": [
      "Say: 'Sitting in your chair as manager'",
      "Express a commitment to technical growth, mastering production system design, contributing high-impact software, and mentoring junior engineers within the company's engineering ecosystem",
      "Say: 'I plan to quit and start my own business next year'",
      "Say: 'I have no idea what I will do next week'"
    ],
    "correctIndex": 1,
    "explanation": "Companies look for long-term retention, growth trajectory, technical passion, and organizational commitment.",
    "track": "fresher",
    "category": "HR & Behavioral",
    "companyTags": [
      "TCS",
      "Infosys",
      "Cognizant"
    ]
  },
  {
    "id": "ir-q-97",
    "question": "What is the best way to explain a project failure or missed deadline in a behavioral interview?",
    "options": [
      "Blame your teammates or the client",
      "Take personal ownership of the outcome, explain what went wrong objectively, what immediate mitigations were enacted, and the key process improvements you implemented to prevent recurrence",
      "Pretend the failure never happened",
      "Claim the project was a total success"
    ],
    "correctIndex": 1,
    "explanation": "Radical ownership and learning from failure are hallmarks of strong engineers. Interviewers respect candidates who demonstrate resilience and institutional learning.",
    "track": "universal",
    "category": "HR & Behavioral",
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Uber"
    ]
  },
  {
    "id": "ir-q-98",
    "question": "Why do tech companies value the 'Disagree and Commit' leadership principle?",
    "options": [
      "It encourages passive-aggressive compliance",
      "It empowers teams to debate vigorously and challenge ideas with data during planning, but once a decision is finalized, everyone commits 100% to executing the team direction",
      "It prevents engineers from speaking during meetings",
      "It fires engineers who have opinions"
    ],
    "correctIndex": 1,
    "explanation": "Disagree and Commit eliminates lingering cynicism and factionalism, fostering high-speed execution once technical debates conclude.",
    "track": "experienced",
    "category": "HR & Behavioral",
    "companyTags": [
      "Amazon",
      "Google"
    ]
  },
  {
    "id": "ir-q-99",
    "question": "When negotiating an offer letter, what is the golden rule regarding salary discussion?",
    "options": [
      "State your lowest possible acceptable salary in the first phone call",
      "Politely deflect early salary questions until an offer is extended, research market salary bands, evaluate total compensation (Base + Bonuses + Equity), and negotiate professionally based on value",
      "Threaten to leave bad reviews on Glassdoor",
      "Accept whatever is offered immediately without reviewing terms"
    ],
    "correctIndex": 1,
    "explanation": "Negotiating with market data, professional poise, and holistic total compensation focus yields optimal long-term financial outcomes without burning bridges.",
    "track": "experienced",
    "category": "HR & Behavioral",
    "companyTags": [
      "All Companies"
    ]
  },
  {
    "id": "ir-q-100",
    "question": "What is the ultimate attribute Placement Mentor Kapil emphasizes for succeeding in software engineering placement drives?",
    "options": [
      "Memorizing answers without understanding",
      "Consistency of daily practice, deep fundamental mastery of core computer science principles, clear communication of thought process, and relentless resilience under pressure",
      "Writing code as fast as possible without testing",
      "Relying solely on college GPA"
    ],
    "correctIndex": 1,
    "explanation": "Consistent discipline, core CS depth, articulated problem-solving, and professional composure are the proven pillars of placement success.",
    "track": "universal",
    "category": "HR & Behavioral",
    "companyTags": [
      "SPSU Placement Drive 2026"
    ]
  }
];
