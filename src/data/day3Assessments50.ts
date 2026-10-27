import { AssessmentQuestion } from '../types';

/**
 * Day 3 Assessments (50 Pre-Assessment MCQs & 50 Post-Assessment MCQs = 100 Total)
 * Module 3: Company-Oriented Coding Lab & Trade-Off Benchmarking
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 * Coverage: Constraint Analysis (10^8 ops rule), Binary Search on Answer Space,
 * Prefix Sum with Hash Map, Kadane's Algorithm, Two Pointers, Monotonic Stack & Queue,
 * Greedy Interval Scheduling, Bitwise Hacks & Hidden Boundary Testing.
 * Formatted with balanced A/B/C/D key distribution & dedicated syntax codeSnippet blocks.
 */

export const DAY_3_PRE_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d3-pre-1",
    "question": "In standard placement online assessments (TCS Digital, Amazon, Infosys), approximately how many basic operations can a C/C++ or Java program perform within a 1.0-second CPU time limit?",
    "options": [
      "10^8 operations",
      "10^6 operations",
      "10^12 operations",
      "10^4 operations"
    ],
    "correctIndex": 0,
    "explanation": "The industry rule of thumb is ~10^8 operations per second. Algorithms exceeding 10^8 operations for the maximum constraint will trigger Time Limit Exceeded (TLE).",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-2",
    "question": "If a problem specifies an array size N <= 10^5, which of the following algorithmic time complexities is guaranteed to pass within 1.0 second?",
    "options": [
      "O(N^2)",
      "O(N log N)",
      "O(N^3)",
      "O(2^N)"
    ],
    "correctIndex": 1,
    "explanation": "For N = 10^5, N log2(N) ≈ 10^5 * 17 ≈ 1.7 * 10^6 operations, well beneath the 10^8 threshold. In contrast, O(N^2) is 10^10 operations, triggering severe TLE.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-3",
    "question": "Consider the following binary search mid calculation:\n`int mid = (low + high) / 2;`\nWhat serious bug occurs when low and high are near 2^31 - 1 in C, C++, or Java?",
    "options": [
      "Compilation syntax error",
      "Floating-point precision rounding error",
      "Signed 32-bit integer overflow resulting in a negative mid and segmentation fault / ArrayIndexOutOfBoundsException",
      "Infinite loop caused by underflow"
    ],
    "correctIndex": 2,
    "explanation": "If low + high exceeds 2^31 - 1 (2,147,483,647), it overflows into negative numbers. The standard safe formula is `mid = low + (high - low) / 2;`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-4",
    "question": "In the Book Allocation / Capacity to Ship Packages problem with weights = [3, 2, 2, 4, 1, 4] and days = 3, what should be the initial search space [low, high] for Binary Search on Answer?",
    "options": [
      "[0, 16]",
      "[1, 16]",
      "[6, 16]",
      "[4, 16]"
    ],
    "correctIndex": 3,
    "explanation": "low must be max(weights) = 4 (because the ship must hold at least the heaviest single item). high must be sum(weights) = 16 (all items shipped in 1 day).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-5",
    "question": "What is the output of the following C code snippet?",
    "options": [
      "-2",
      "3",
      "2",
      "-3"
    ],
    "correctIndex": 0,
    "explanation": "In C and C++, the `%` operator computes truncated remainder. (-7) % 5 = -2. To obtain mathematical positive modulo (3), use `(a % m + m) % m;`.",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "int a = -7, m = 5;\nprintf(\"%d\", a % m);",
    "codeLanguage": "c"
  },
  {
    "id": "d3-pre-6",
    "question": "Which prerequisite property MUST hold true for a problem to be solvable via Binary Search on the Answer Space?",
    "options": [
      "The input array must already be sorted in descending order.",
      "The feasibility predicate function f(x) must be monotonic (e.g., if capacity x is feasible, all capacities > x are also feasible).",
      "The elements must all be distinct positive prime numbers.",
      "The graph must be a Directed Acyclic Graph (DAG)."
    ],
    "correctIndex": 1,
    "explanation": "Monotonicity of the decision space is the fundamental prerequisite. If f(x) produces a monotonic transition [False, False, ..., True, True], binary search can locate the inflection point in O(log(range)) checks.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-7",
    "question": "What is the output of Kadane’s algorithm on array `nums = [-5, -2, -8, -1, -4]`?",
    "options": [
      "0",
      "-20",
      "-1",
      "-5"
    ],
    "correctIndex": 2,
    "explanation": "When all numbers are negative, the maximum subarray is the single largest negative number: -1. A naive Kadane implementation initialized with 0 would incorrectly output 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-8",
    "question": "Why does the Sliding Window technique fail on the \"Subarray Sum Equals K\" problem when the array contains negative numbers?",
    "options": [
      "Negative numbers cannot be stored in a hash map.",
      "Negative numbers cause integer overflow in 32-bit registers.",
      "Sliding window only works on strings, never on integer arrays.",
      "Expanding the window by advancing right pointer no longer guarantees the sum increases monotonically, so shrinking left cannot be deterministically decided."
    ],
    "correctIndex": 3,
    "explanation": "Sliding window relies on monotonic expansion (adding positive elements increases sum; removing left decreases sum). With negative numbers, adding an element may decrease the sum, breaking the greedy window adjustment.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-9",
    "question": "What is the time complexity of finding all unique pairs in a sorted array that sum to a target using Two Pointers?",
    "options": [
      "O(N)",
      "O(N log N)",
      "O(N^2)",
      "O(1)"
    ],
    "correctIndex": 0,
    "explanation": "With pointers at low = 0 and high = N - 1, each step advances low or decrements high. The array is traversed at most once in strictly O(N) time.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-10",
    "question": "Trace the following C++ code:\n\nWhat is printed?",
    "options": [
      "2",
      "3",
      "5",
      "6"
    ],
    "correctIndex": 1,
    "explanation": "42 in binary is 101010_2 (which has three 1s). Brian Kernighan’s algorithm `n = n & (n - 1)` clears one set bit per iteration. The loop runs exactly 3 times.",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "int n = 42;\nint count = 0;\nwhile (n > 0) {\n    n = n & (n - 1);\n    count++;\n}\ncout << count;",
    "codeLanguage": "cpp"
  },
  {
    "id": "d3-pre-11",
    "question": "In LeetCode #42 (Trapping Rain Water), what determines the volume of water trapped above an index i?",
    "options": [
      "height[i] - min(leftMax, rightMax)",
      "(leftMax + rightMax) / 2",
      "max(0, min(leftMax, rightMax) - height[i])",
      "max(leftMax, rightMax) - height[i]"
    ],
    "correctIndex": 2,
    "explanation": "Water level is bounded by the shorter of the tallest boundaries on either side: min(leftMax, rightMax). Trapped water is that boundary minus height[i].",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-12",
    "question": "What is the primary benefit of using a Monotonic Stack for finding the Next Greater Element compared to a nested loop?",
    "options": [
      "Reduces auxiliary space from O(N) to O(1)",
      "Eliminates the need for array indexing",
      "Allows searching for negative numbers",
      "Reduces runtime complexity from O(N^2) to amortized O(N)"
    ],
    "correctIndex": 3,
    "explanation": "In a Monotonic Stack, each array element is pushed onto the stack exactly once and popped at most once. Hence, total operations across all elements are bounded by 2N = O(N).",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-13",
    "question": "When solving the \"Non-Overlapping Intervals\" / \"Activity Selection\" problem greedily, how should intervals be sorted?",
    "options": [
      "By end time ascending",
      "By start time ascending",
      "By interval length descending",
      "By start time descending"
    ],
    "correctIndex": 0,
    "explanation": "Sorting by END TIME ascending ensures that we greedily choose the activity that finishes earliest, leaving maximum available time for subsequent activities.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-14",
    "question": "What does the bitwise expression `(n > 0) && ((n & (n - 1)) == 0)` evaluate to?",
    "options": [
      "True if n is an odd number",
      "True if n is a power of 2",
      "True if n is a prime number",
      "True if n is divisible by 4"
    ],
    "correctIndex": 1,
    "explanation": "Powers of two (1, 2, 4, 8, 16...) have exactly one set bit in binary. Subtracting 1 flips all bits after that bit. Thus, n & (n - 1) equals 0 strictly for powers of 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-15",
    "question": "What is the value of `x` after executing:",
    "options": [
      "0",
      "1",
      "4",
      "2"
    ],
    "correctIndex": 2,
    "explanation": "XOR properties: a ^ a = 0 and a ^ 0 = a. Duplicate pairs (1^1=0, 2^2=0) cancel out, leaving the unique number 4.",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "int[] arr = {4, 1, 2, 1, 2};\nint x = 0;\nfor (int num : arr) x ^= num;",
    "codeLanguage": "java"
  },
  {
    "id": "d3-pre-16",
    "question": "Given an array with N = 10^5 elements where each element can be up to 10^9, what data type must be used to accumulate the array sum in C/C++ to avoid overflow?",
    "options": [
      "int",
      "short",
      "float",
      "long long"
    ],
    "correctIndex": 3,
    "explanation": "Maximum sum = 10^5 * 10^9 = 10^14. Standard 32-bit signed int maxes out at ~2.14 * 10^9. `long long` (64-bit) can hold up to ~9.22 * 10^18.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-17",
    "question": "In C++, why is `ios_base::sync_with_stdio(false); cin.tie(NULL);` frequently placed at the beginning of `main()` in placement coding contests?",
    "options": [
      "To untie C++ streams from standard C stdio, dramatically accelerating `cin`/`cout` speed to prevent TLE",
      "To prevent memory leaks in the heap",
      "To enable multi-threading execution",
      "To automatically sort incoming inputs"
    ],
    "correctIndex": 0,
    "explanation": "By default, cin/cout synchronize with C’s stdio buffers. Disabling synchronization makes C++ I/O almost as fast as C’s `scanf`/`printf`.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-18",
    "question": "In a rotated sorted array `nums = [4, 5, 6, 7, 0, 1, 2]`, what condition confirms that the left half `[low, mid]` is sorted?",
    "options": [
      "nums[low] < nums[high]",
      "nums[low] <= nums[mid]",
      "nums[mid] < nums[high]",
      "target >= nums[mid]"
    ],
    "correctIndex": 1,
    "explanation": "If `nums[low] <= nums[mid]`, no rotation inflection point exists between low and mid; therefore, the left segment is strictly sorted.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-19",
    "question": "What is the auxiliary space complexity of Kadane’s algorithm when implemented optimally?",
    "options": [
      "O(N)",
      "O(log N)",
      "O(1)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "explanation": "Kadane’s algorithm only requires two scalar tracking variables (current_sum and max_so_far), achieving O(1) auxiliary space.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-20",
    "question": "What is the output of the following Python snippet?",
    "options": [
      "1 2",
      "3 1",
      "IndexError",
      "3 2"
    ],
    "correctIndex": 3,
    "explanation": "Python supports negative indexing where -1 accesses the last element (3) and -2 accesses the second to last element (2).",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "nums = [1, 2, 3]\nprint(nums[-1], nums[-2])",
    "codeLanguage": "python"
  },
  {
    "id": "d3-pre-21",
    "question": "Consider a 2D grid DP problem with dimensions 1000 x 1000. What is the approximate number of state transitions, and will it pass within 1.0 second?",
    "options": [
      "10^6 transitions; easily passes within ~0.05 seconds",
      "10^9 transitions; triggers TLE",
      "10^12 transitions; triggers Out Of Memory",
      "1000 transitions; too small to measure"
    ],
    "correctIndex": 0,
    "explanation": "1000 x 1000 = 10^6 states. With O(1) transitions per cell, 10^6 operations execute in ~5-10 milliseconds, well below the 10^8 threshold.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-22",
    "question": "In the 3Sum problem (`nums[i] + nums[j] + nums[k] == 0`), why is sorting the array initially as O(N log N) acceptable?",
    "options": [
      "Because sorting is required by online judges",
      "Because the overall two-pointer search takes O(N^2), which dominates the initial O(N log N) sort time",
      "Because sorting reduces space complexity to O(0)",
      "Because it converts negative numbers to positive numbers"
    ],
    "correctIndex": 1,
    "explanation": "O(N log N) + O(N^2) = O(N^2). The sorting phase is asymptotically negligible compared to the quadratic two-pointer search loops.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-23",
    "question": "What happens when inserting key 0 into prefix sum map with `map[0] = 1` before processing array elements in \"Subarray Sum Equals K\"?",
    "options": [
      "It causes a NullPointerException",
      "It prevents negative numbers from entering the map",
      "It accounts for valid subarrays whose prefix sum itself exactly equals K from index 0",
      "It sets the maximum capacity of the hash map"
    ],
    "correctIndex": 2,
    "explanation": "If a prefix sum at index i equals K, then current_sum - K = 0. Having `map[0] = 1` ensures that subarrays starting from index 0 are counted.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-24",
    "question": "What is the time complexity of the Sliding Window Maximum problem using a Double-Ended Queue (Deque)?",
    "options": [
      "O(N * K)",
      "O(N log K)",
      "O(N^2)",
      "O(N)"
    ],
    "correctIndex": 3,
    "explanation": "Each element index is pushed into the deque once and popped at most once. The total operations across the entire array of length N is 2N, which is strictly O(N).",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-25",
    "question": "What is printed by this C program?",
    "options": [
      "20",
      "10",
      "5",
      "25"
    ],
    "correctIndex": 0,
    "explanation": "Left shift `x << k` is equivalent to multiplying x by 2^k. 5 * 2^2 = 5 * 4 = 20.",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int x = 5;\n    printf(\"%d\", x << 2);\n    return 0;\n}",
    "codeLanguage": "c"
  },
  {
    "id": "d3-pre-26",
    "question": "Which of the following data structures is optimal for maintaining the maximum element of a sliding window in O(1) amortized time?",
    "options": [
      "Binary Search Tree",
      "Monotonic Deque",
      "Min Heap",
      "Linked List"
    ],
    "correctIndex": 1,
    "explanation": "A monotonic deque stores indices with decreasing values, allowing O(1) retrieval of the maximum from the front.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-27",
    "question": "In Java, which collection should you use instead of `Stack<Integer>` to implement a fast LIFO stack?",
    "options": [
      "Vector<Integer>",
      "Hashtable<Integer>",
      "ArrayDeque<Integer>",
      "TreeSet<Integer>"
    ],
    "correctIndex": 2,
    "explanation": "Java’s legacy `Stack` class inherits from `Vector` and synchronizes all methods, adding synchronization overhead. `ArrayDeque` is unsynchronized and significantly faster.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-28",
    "question": "What is the Next Greater Element for each item in `[5, 4, 3, 2, 1]`?",
    "options": [
      "[4, 3, 2, 1, -1]",
      "[1, 2, 3, 4, 5]",
      "[5, 5, 5, 5, 5]",
      "[-1, -1, -1, -1, -1]"
    ],
    "correctIndex": 3,
    "explanation": "In a strictly decreasing array, no element has a greater element to its right. Therefore, all answers are -1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-29",
    "question": "What is the result of `13 & 7` in bitwise operations?",
    "options": [
      "5",
      "7",
      "1",
      "15"
    ],
    "correctIndex": 0,
    "explanation": "13 = 1101_2, 7 = 0111_2. Bitwise AND: 1101 & 0111 = 0101_2 = 5.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-30",
    "question": "If an algorithm has recurrence relation `T(N) = 2T(N/2) + O(N)`, what is its Big-O time complexity by the Master Theorem?",
    "options": [
      "O(N)",
      "O(N log N)",
      "O(N^2)",
      "O(log N)"
    ],
    "correctIndex": 1,
    "explanation": "Here a = 2, b = 2, f(N) = N. N^(log_b a) = N^1 = N. Case 2 of Master Theorem applies: T(N) = O(N log N) (classic Merge Sort).",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-31",
    "question": "What is the result of `18 >> 2` in integer division representation?",
    "options": [
      "9",
      "8",
      "4",
      "2"
    ],
    "correctIndex": 2,
    "explanation": "Right shift `x >> k` is equivalent to integer floor division by 2^k. 18 / 4 = 4.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-32",
    "question": "How do you check if the k-th bit (0-indexed from right) of an integer `n` is set (equals 1)?",
    "options": [
      "n % k == 1",
      "(n | (1 << k)) == 0",
      "(n ^ k) == 1",
      "(n & (1 << k)) != 0"
    ],
    "correctIndex": 3,
    "explanation": "`1 << k` creates a bitmask with only the k-th bit set. `n & (1 << k)` isolates that bit; if non-zero, the bit is set.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-33",
    "question": "What will happen if you attempt to allocate a static array `int arr[10000000];` inside `main()` on the stack in C/C++?",
    "options": [
      "Stack overflow (segmentation fault) because standard stack memory limit is only 1MB to 8MB.",
      "It compiles and runs without issues.",
      "The compiler automatically moves it to the CPU register.",
      "It is converted to a hash table at runtime."
    ],
    "correctIndex": 0,
    "explanation": "A 10^7 int array requires 40MB of memory. Default thread stack size on most systems is only 1MB to 8MB. Declare large arrays globally (BSS segment) or use heap allocation (`malloc`/`std::vector`).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-34",
    "question": "What is the maximum number of subsets for an array of size N = 20, and can it be iterated in 1 second?",
    "options": [
      "20 subsets; ~1 microsecond",
      "2^20 ≈ 1.05 * 10^6 subsets; easily runs in ~0.02 seconds",
      "20! subsets; impossible",
      "400 subsets; runs instantly"
    ],
    "correctIndex": 1,
    "explanation": "2^20 = 1,048,576. Iterating 10^6 iterations takes ~10 milliseconds in C++/Java.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-35",
    "question": "In Python, what is the default recursion limit, and how can it be safely increased for deep DFS tree/graph traversals?",
    "options": [
      "1,000,000 by default",
      "10 by default; cannot be modified",
      "1,000 by default; increased via `sys.setrecursionlimit(200000)`",
      "Unlimited by default"
    ],
    "correctIndex": 2,
    "explanation": "Python’s default recursion depth is 1,000 to prevent C stack overflows. For competitive programming, `import sys; sys.setrecursionlimit(200000)` is required for deep graphs.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-36",
    "question": "What is the sum of all elements in array `[1, 2, 3, 4, 5]` using the math formula n*(n+1)/2?",
    "options": [
      "10",
      "25",
      "20",
      "15"
    ],
    "correctIndex": 3,
    "explanation": "5 * 6 / 2 = 15.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-37",
    "question": "In C++, what is the average and worst-case time complexity of search in `std::unordered_map` versus `std::map`?",
    "options": [
      "unordered_map: O(1) avg / O(N) worst; map: O(log N) both",
      "unordered_map: O(N) avg; map: O(1) avg",
      "Both are O(1) in all cases",
      "unordered_map: O(log N); map: O(1)"
    ],
    "correctIndex": 0,
    "explanation": "`unordered_map` is based on hash tables (O(1) average, O(N) worst upon hash collisions). `std::map` is a Red-Black self-balancing BST with strict O(log N) guarantees.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-38",
    "question": "What is the output of the following Java snippet?",
    "options": [
      "100",
      "0",
      "20",
      "10"
    ],
    "correctIndex": 1,
    "explanation": "In Java, `^` is bitwise XOR, NOT exponentiation. Any integer XORed with itself is 0.",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "System.out.println(10 ^ 10);",
    "codeLanguage": "java"
  },
  {
    "id": "d3-pre-39",
    "question": "Trace the following loop in C:\n\nWhat is printed?",
    "options": [
      "6",
      "15",
      "9",
      "12"
    ],
    "correctIndex": 2,
    "explanation": "i takes values 1, 3, 5. Sum = 1 + 3 + 5 = 9.",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "int s = 0;\nfor (int i = 1; i <= 5; i += 2) s += i;\nprintf(\"%d\", s);",
    "codeLanguage": "c"
  },
  {
    "id": "d3-pre-40",
    "question": "In a two-pointer approach for 3Sum, if `nums[i] + nums[left] + nums[right] < 0`, what must be updated?",
    "options": [
      "right--",
      "break",
      "i++",
      "left++"
    ],
    "correctIndex": 3,
    "explanation": "Because the array is sorted, to increase the sum towards 0, we must advance the smaller pointer: `left++`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-41",
    "question": "What is the time complexity of building a heap from an unsorted array of size N using Floyd’s `build_heap` method?",
    "options": [
      "O(N)",
      "O(N log N)",
      "O(N^2)",
      "O(log N)"
    ],
    "correctIndex": 0,
    "explanation": "Bottom-up heap construction runs in mathematically proven O(N) time, unlike inserting N elements one by one which takes O(N log N).",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-42",
    "question": "Which of the following is an example of an amortized O(1) operation?",
    "options": [
      "Binary Search on an array",
      "Vector `push_back()` with dynamic array doubling",
      "Selection Sort outer loop",
      "Linear search on linked list"
    ],
    "correctIndex": 1,
    "explanation": "Vector doubling takes O(N) occasionally, but spread across N insertions, the cost per insertion is amortized O(1).",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-43",
    "question": "What is the output of the following C++ code?",
    "options": [
      "10",
      "20",
      "30",
      "0"
    ],
    "correctIndex": 2,
    "explanation": "`v.back()` returns a reference to the last element in the vector (30).",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "vector<int> v = {10, 20, 30};\ncout << v.back();",
    "codeLanguage": "cpp"
  },
  {
    "id": "d3-pre-44",
    "question": "If two intervals are `[2, 6]` and `[4, 8]`, do they overlap, and what is their merged interval?",
    "options": [
      "No overlap",
      "Invalid intervals",
      "Yes, merged interval is [4, 6]",
      "Yes, merged interval is [2, 8]"
    ],
    "correctIndex": 3,
    "explanation": "Since start2 (4) <= end1 (6), they overlap. Merged start = min(2, 4) = 2; merged end = max(6, 8) = 8 -> [2, 8].",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-45",
    "question": "What is the output of `~0` (bitwise NOT of 0) in 32-bit two’s complement representation?",
    "options": [
      "-1",
      "1",
      "0",
      "2147483647"
    ],
    "correctIndex": 0,
    "explanation": "0 in binary is all 0s. Bitwise NOT flips all bits to 1s. In two’s complement arithmetic, all 1s represents -1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-46",
    "question": "In competitive programming, which sort algorithm does C++ `std::sort` implement internally?",
    "options": [
      "Pure Quick Sort",
      "Introsort (Hybrid of Quick Sort, Heap Sort, and Insertion Sort)",
      "Pure Merge Sort",
      "Bubble Sort"
    ],
    "correctIndex": 1,
    "explanation": "`std::sort` uses Introsort: it begins with Quick Sort, switches to Heap Sort if recursion depth exceeds 2*log(N) (preventing O(N^2) degradation), and uses Insertion Sort for small partitions.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-47",
    "question": "What is printed by Python code: `print(bool([]), bool([0]))`?",
    "options": [
      "False False",
      "True True",
      "False True",
      "True False"
    ],
    "correctIndex": 2,
    "explanation": "An empty list `[]` evaluates to truth value `False`. A non-empty list `[0]` has length 1 and evaluates to `True`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-48",
    "question": "What is the maximum number of edges in a simple undirected graph with V vertices?",
    "options": [
      "V",
      "2^V",
      "V^2",
      "V * (V - 1) / 2"
    ],
    "correctIndex": 3,
    "explanation": "Each vertex can connect to V - 1 other vertices. Dividing by 2 for undirected edges gives V * (V - 1) / 2.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-pre-49",
    "question": "What is the value of `x` after: `int x = 7 ^ 7 ^ 9 ^ 3 ^ 3;`?",
    "options": [
      "9",
      "0",
      "7",
      "19"
    ],
    "correctIndex": 0,
    "explanation": "7^7 = 0, 3^3 = 0. 0 ^ 0 ^ 9 = 9.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-pre-50",
    "question": "What is the key takeaway rule from Mentor Kapil regarding placement assessment code?",
    "options": [
      "Write the most concise code regardless of readability",
      "Always analyze constraints on N first, choose the target Big-O, verify 3 boundary edge cases, and ensure integer overflow safety before submission",
      "Memorize solutions line-by-line",
      "Always use O(N^3) brute force first and submit"
    ],
    "correctIndex": 1,
    "explanation": "Kapil’s Placement Formula: Map constraints to complexity (10^8 ops rule), code defensively with 64-bit guards, and test empty/all-negative/boundary inputs before submitting.",
    "category": "Theory (30%)"
  }
];

export const DAY_3_POST_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d3-post-1",
    "question": "In the Book Allocation problem with pages = [12, 34, 67, 90] and K = 2 students, what is the minimum possible maximum load allocated to any student?",
    "options": [
      "113",
      "101",
      "90",
      "203"
    ],
    "correctIndex": 0,
    "explanation": "Partitioning as [12, 34, 67] (sum = 113) and [90] (sum = 90) gives maximum load 113. Any smaller capacity like 112 requires at least 3 students.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-2",
    "question": "What is the time complexity of the Two-Pointer Trapping Rain Water algorithm?",
    "options": [
      "O(N^2)",
      "O(N)",
      "O(N log N)",
      "O(1)"
    ],
    "correctIndex": 1,
    "explanation": "The left and right pointers start at opposite ends and move towards each other, inspecting each elevation bar exactly once in O(N) time and O(1) auxiliary space.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-3",
    "question": "Given intervals `[[1, 2], [2, 3], [3, 4], [1, 3]]`, what is the minimum number of intervals to remove to eliminate all overlaps?",
    "options": [
      "0",
      "2",
      "1",
      "3"
    ],
    "correctIndex": 2,
    "explanation": "Sorting by end times: [1,2], [2,3], [1,3], [3,4]. Keeping [1,2], [2,3], and [3,4] yields 3 non-overlapping intervals. We remove only [1,3] (total removals = 1).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-4",
    "question": "Trace the following C++ code:\n\nWhat is printed?",
    "options": [
      "011",
      "210",
      "002",
      "012"
    ],
    "correctIndex": 3,
    "explanation": "The Dutch National Flag algorithm sorts the array in-place to [0, 0, 1, 1, 2, 2]. nums[0] is 0, nums[2] is 1, nums[5] is 2 -> prints \"012\".",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "vector<int> nums = {2, 0, 2, 1, 1, 0};\n// Dutch National Flag\nint low = 0, mid = 0, high = nums.size() - 1;\nwhile (mid <= high) {\n    if (nums[mid] == 0) swap(nums[low++], nums[mid++]);\n    else if (nums[mid] == 1) mid++;\n    else swap(nums[mid], nums[high--]);\n}\ncout << nums[0] << nums[2] << nums[5];",
    "codeLanguage": "cpp"
  },
  {
    "id": "d3-post-5",
    "question": "What is the output of Kadane’s Algorithm on `arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`?",
    "options": [
      "6",
      "4",
      "7",
      "10"
    ],
    "correctIndex": 0,
    "explanation": "The contiguous subarray with maximum sum is [4, -1, 2, 1], with sum = 4 + (-1) + 2 + 1 = 6.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-6",
    "question": "In \"Search in Rotated Sorted Array\", if `nums[mid] == target`, what is returned immediately?",
    "options": [
      "low",
      "mid",
      "high",
      "-1"
    ],
    "correctIndex": 1,
    "explanation": "The target has been located at index `mid`, so returning `mid` completes the search in O(log N).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-7",
    "question": "What is the output of the following Python snippet?",
    "options": [
      "1",
      "3",
      "2",
      "0"
    ],
    "correctIndex": 2,
    "explanation": "The subarrays [0..1] and [1..2] each sum to 2. The code correctly counts 2 subarrays.",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "def solve():\n    nums = [1, 1, 1]\n    k = 2\n    d = {0: 1}\n    s = ans = 0\n    for x in nums:\n        s += x\n        ans += d.get(s - k, 0)\n        d[s] = d.get(s, 0) + 1\n    return ans\nprint(solve())",
    "codeLanguage": "python"
  },
  {
    "id": "d3-post-8",
    "question": "For array `arr = [4, 5, 2, 25]`, what are the Next Greater Elements for indices 0, 1, 2, and 3?",
    "options": [
      "[-1, -1, -1, -1]",
      "[25, 25, 25, -1]",
      "[5, -1, 25, -1]",
      "[5, 25, 25, -1]"
    ],
    "correctIndex": 3,
    "explanation": "4->5, 5->25, 2->25, 25 has no greater element to its right so -1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-9",
    "question": "What is the output of the following bitwise operation in C/Java?\n`int ans = 1 << 4;`",
    "options": [
      "16",
      "8",
      "4",
      "32"
    ],
    "correctIndex": 0,
    "explanation": "1 shifted left by 4 positions is 2^4 = 16.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-10",
    "question": "Why is `std::deque` preferred over `std::vector` when implementing a sliding window maximum algorithm?",
    "options": [
      "std::deque uses less memory than std::vector",
      "std::deque supports O(1) push and pop at BOTH the front and back, while vector only supports O(1) at the back",
      "std::deque automatically sorts its contents",
      "std::vector cannot store integer indices"
    ],
    "correctIndex": 1,
    "explanation": "Sliding window requires popping stale indices from the front (left of window) and smaller elements from the back in O(1) time. `deque` provides O(1) operations at both ends.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-11",
    "question": "What is the sum of elements in an arithmetic progression with first term a = 3, common difference d = 4, and n = 5 terms?",
    "options": [
      "45",
      "50",
      "55",
      "60"
    ],
    "correctIndex": 2,
    "explanation": "Terms are 3, 7, 11, 15, 19. Sum = (5/2) * (2*3 + 4*4) = 2.5 * (6 + 16) = 2.5 * 22 = 55.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-12",
    "question": "What is the value of `res` after:",
    "options": [
      "100",
      "5050",
      "1",
      "0"
    ],
    "correctIndex": 3,
    "explanation": "Any set of values XORed with itself an even number of times completely cancels out to 0.",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "int res = 0;\nfor (int i = 1; i <= 100; i++) res ^= i;\nfor (int i = 1; i <= 100; i++) res ^= i;",
    "codeLanguage": "c"
  },
  {
    "id": "d3-post-13",
    "question": "In Java, how do you sort a 2D array `int[][] intervals` by its start times ascending?",
    "options": [
      "Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));",
      "Arrays.sort(intervals);",
      "Collections.sort(intervals);",
      "intervals.sort();"
    ],
    "correctIndex": 0,
    "explanation": "Passing a lambda comparator `(a, b) -> Integer.compare(a[0], b[0])` sorts intervals ascending by the 0-th column (start time).",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-14",
    "question": "What is the worst-case space complexity of storing all prefixes of an array of length N in a hash table?",
    "options": [
      "O(1)",
      "O(N)",
      "O(log N)",
      "O(N^2)"
    ],
    "correctIndex": 1,
    "explanation": "An array of length N produces at most N distinct prefix sums, occupying O(N) entries in a hash map.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-15",
    "question": "What is the output of the following C code?",
    "options": [
      "37",
      "29",
      "21",
      "13"
    ],
    "correctIndex": 2,
    "explanation": "12 = 01100_2, 25 = 11001_2. Bitwise XOR: 01100 ^ 11001 = 10101_2 = 16 + 4 + 1 = 21.",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "int a = 12; // 1100\nint b = 25; // 11001\nprintf(\"%d\", a ^ b);",
    "codeLanguage": "c"
  },
  {
    "id": "d3-post-16",
    "question": "Which algorithmic paradigm does Kadane’s Algorithm strictly belong to?",
    "options": [
      "Backtracking",
      "Divide and Conquer",
      "Branch and Bound",
      "Dynamic Programming"
    ],
    "correctIndex": 3,
    "explanation": "Kadane’s algorithm uses dynamic programming with the recurrence `dp[i] = max(nums[i], dp[i-1] + nums[i])`, optimized to O(1) space.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-17",
    "question": "What is the output of this Python code?",
    "options": [
      "[5, 4, 3]",
      "[1, 1, 3]",
      "[4, 3, 1]",
      "[5, 4, 1]"
    ],
    "correctIndex": 0,
    "explanation": "Descending sorted array is [5, 4, 3, 1, 1]. Slice `[:3]` returns the first 3 elements: `[5, 4, 3]`.",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "print(sorted([3, 1, 4, 1, 5], reverse=True)[:3])",
    "codeLanguage": "python"
  },
  {
    "id": "d3-post-18",
    "question": "In LeetCode #15 (3Sum), why do we execute `while (left < right && nums[left] == nums[left+1]) left++;` after finding a valid triplet?",
    "options": [
      "To prevent infinite loops",
      "To skip duplicate numbers and guarantee that duplicate triplets are not added to the answer",
      "To sort the array in reverse",
      "To satisfy JVM garbage collection"
    ],
    "correctIndex": 1,
    "explanation": "The problem mandates unique triplets. Advancing pointers past identical values prevents generating the same triplet again.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-19",
    "question": "What is the binary representation of decimal number 45?",
    "options": [
      "101010",
      "110011",
      "101101",
      "111100"
    ],
    "correctIndex": 2,
    "explanation": "45 = 32 + 8 + 4 + 1 = 2^5 + 2^3 + 2^2 + 2^0 = 101101_2.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-20",
    "question": "What is the output of the following Java snippet?",
    "options": [
      "49",
      "13",
      "60",
      "12"
    ],
    "correctIndex": 3,
    "explanation": "0011 1100 & 0000 1101 = 0000 1100 = 12.",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "int x = 60; // 0011 1100\nint y = 13; // 0000 1101\nSystem.out.println(x & y);",
    "codeLanguage": "java"
  },
  {
    "id": "d3-post-21",
    "question": "In a company assessment, you are asked to find the Kth largest element in an unsorted array of size N = 10^7 with K = 5. What is the optimal approach and complexity?",
    "options": [
      "Maintain a Min-Heap of size K in O(N log K) time and O(K) space",
      "Sort entire array in O(N log N) time",
      "Bubble sort K times in O(N * K) time",
      "Use nested recursion in O(2^N) time"
    ],
    "correctIndex": 0,
    "explanation": "With K = 5, log(K) is constant (~2.3 ops). Maintaining a min-heap of size 5 takes O(N * 3) operations, which takes under 0.1 seconds for 10^7 elements.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-22",
    "question": "What is the output of `printf(\"%d\", 5 > 3 ? 10 : 20);` in C?",
    "options": [
      "5",
      "10",
      "3",
      "20"
    ],
    "correctIndex": 1,
    "explanation": "Since 5 > 3 is true, ternary operator evaluates to the first branch: 10.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-23",
    "question": "What is the space complexity of quicksort in the worst case (unbalanced partition)?",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "explanation": "In the worst case (already sorted array with naive pivot), recursion depth reaches N stack frames, consuming O(N) auxiliary stack space.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-24",
    "question": "What is printed by Python code: `print([x*2 for x in [1, 2, 3] if x > 1])`?",
    "options": [
      "[2, 4, 6]",
      "[4]",
      "[2, 3]",
      "[4, 6]"
    ],
    "correctIndex": 3,
    "explanation": "The filter `if x > 1` selects 2 and 3. Multiplication produces [4, 6].",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-25",
    "question": "How many bits are set in the binary representation of `(1 << 10) - 1`?",
    "options": [
      "10",
      "9",
      "1",
      "11"
    ],
    "correctIndex": 0,
    "explanation": "`1 << 10` is 10000000000_2 (1 followed by ten 0s). Subtracting 1 gives 1111111111_2 (ten 1s).",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-26",
    "question": "If `weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]` and `days = 5`, why is capacity = 14 insufficient?",
    "options": [
      "Because package 14 does not exist",
      "Because capacity 14 requires 6 days: [1..4](10), [5,6](11), [7](7), [8](8), [9](9), [10](10), which exceeds the 5-day limit",
      "Because 14 is not divisible by 5",
      "Because 14 is smaller than the largest package 10"
    ],
    "correctIndex": 1,
    "explanation": "Greedy allocation with capacity 14 requires 6 shipments, violating the 5-day constraint.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-27",
    "question": "What is the output of `System.out.println(Math.floorMod(-1, 5));` in Java?",
    "options": [
      "-1",
      "0",
      "4",
      "1"
    ],
    "correctIndex": 2,
    "explanation": "`Math.floorMod` performs mathematical floor division modulo, correctly returning 4 because (-1) = (-1 * 5) + 4.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-28",
    "question": "What is the output of the following C code snippet?",
    "options": [
      "8",
      "15",
      "32",
      "16"
    ],
    "correctIndex": 3,
    "explanation": "x doubles each step: 1 -> 2 -> 4 -> 8 -> 16. Once x = 16, the condition `x < 16` fails and 16 is printed.",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "int x = 1;\nwhile (x < 16) x <<= 1;\nprintf(\"%d\", x);",
    "codeLanguage": "c"
  },
  {
    "id": "d3-post-29",
    "question": "In a sliding window of size k = 3 over `[1, 3, -1, -3, 5, 3, 6, 7]`, what is the maximum in the first window `[1, 3, -1]`?",
    "options": [
      "3",
      "1",
      "-1",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "Max of {1, 3, -1} is 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-30",
    "question": "What is the sum of integers from 1 to 100?",
    "options": [
      "5000",
      "5050",
      "5100",
      "10000"
    ],
    "correctIndex": 1,
    "explanation": "100 * 101 / 2 = 5050.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-31",
    "question": "What is the output of `printf(\"%d\", 10 ^ 0);` in C?",
    "options": [
      "0",
      "1",
      "10",
      "11"
    ],
    "correctIndex": 2,
    "explanation": "Any number XORed with 0 remains unchanged (x ^ 0 = x). 10 ^ 0 = 10.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-32",
    "question": "Why does `cin >> s;` fail when reading a full line of text containing spaces in C++?",
    "options": [
      "It triggers a segmentation fault",
      "It overwrites memory buffers",
      "`cin` only reads integers",
      "`cin >>` stops reading at the first whitespace character (space, tab, or newline); use `getline(cin, s)` instead"
    ],
    "correctIndex": 3,
    "explanation": "Operator `>>` treats whitespace as delimiters. To read full lines with spaces, `getline(cin, s)` is required.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-33",
    "question": "What is the output of `(16 & 15)` in bitwise operations?",
    "options": [
      "0",
      "1",
      "15",
      "16"
    ],
    "correctIndex": 0,
    "explanation": "16 = 10000_2, 15 = 01111_2. They share no set bits, so 16 & 15 = 0. (Validates power of 2 check).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-34",
    "question": "In Python, what is the output of `len({1, 2, 2, 3, 3, 3})`?",
    "options": [
      "6",
      "3",
      "1",
      "TypeError"
    ],
    "correctIndex": 1,
    "explanation": "Curly braces `{...}` create a `set`, which automatically deduplicates elements to `{1, 2, 3}` with length 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-35",
    "question": "What is the output of `int x = 5 / 2;` in C and Java?",
    "options": [
      "2.5",
      "3",
      "2",
      "Error"
    ],
    "correctIndex": 2,
    "explanation": "Integer division truncates the fractional portion towards zero, yielding 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-36",
    "question": "When should you use a Monotonic Queue over a standard Queue?",
    "options": [
      "When you need FIFO ordering for Breadth First Search",
      "When you want to sort numbers in O(1) time",
      "When you want to reverse a string",
      "When you need to maintain minimum or maximum elements in a sliding window in O(1) time"
    ],
    "correctIndex": 3,
    "explanation": "A monotonic queue maintains elements in strictly increasing or decreasing order, enabling O(1) window extremes query.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-37",
    "question": "What is the time complexity of reversing an array in-place of size N using two pointers?",
    "options": [
      "O(N)",
      "O(N log N)",
      "O(N^2)",
      "O(1)"
    ],
    "correctIndex": 0,
    "explanation": "The two pointers swap N/2 pairs, executing in strictly O(N) linear time and O(1) space.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-38",
    "question": "What is the result of `25 ^ 25` in C/C++/Java?",
    "options": [
      "25",
      "0",
      "50",
      "1"
    ],
    "correctIndex": 1,
    "explanation": "XORing any number with itself cancels all identical bits, resulting in 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-39",
    "question": "What is the value of `count` after:",
    "options": [
      "16",
      "12",
      "6",
      "10"
    ],
    "correctIndex": 2,
    "explanation": "Number of pairs = 4 * 3 / 2 = 6: (0,1), (0,2), (0,3), (1,2), (1,3), (2,3).",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "int count = 0;\nfor (int i = 0; i < 4; i++)\n    for (int j = i + 1; j < 4; j++)\n        count++;",
    "codeLanguage": "c"
  },
  {
    "id": "d3-post-40",
    "question": "What is the maximum element that can be stored in a signed 32-bit integer?",
    "options": [
      "2^32 - 1",
      "2^30",
      "10^18",
      "2^31 - 1 (2,147,483,647)"
    ],
    "correctIndex": 3,
    "explanation": "A signed 32-bit int reserves 1 bit for the sign and 31 bits for magnitude: 2^31 - 1 = 2,147,483,647.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-41",
    "question": "What is the output of the following Java snippet?",
    "options": [
      "ell",
      "hel",
      "ello",
      "he"
    ],
    "correctIndex": 0,
    "explanation": "`substring(beginIndex, endIndex)` is exclusive of endIndex: indices 1, 2, and 3 produce \"ell\".",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "String s = \"hello\";\nSystem.out.println(s.substring(1, 4));",
    "codeLanguage": "java"
  },
  {
    "id": "d3-post-42",
    "question": "In C++, what does `std::accumulate(v.begin(), v.end(), 0LL)` return?",
    "options": [
      "The average of vector v",
      "The 64-bit sum of elements in vector v",
      "The maximum element of v",
      "The size of vector v"
    ],
    "correctIndex": 1,
    "explanation": "`std::accumulate` with `0LL` initializes a 64-bit long long accumulator and returns the sum of all elements without 32-bit overflow.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-43",
    "question": "What is the output of Python code: `print(\"placement\".find(\"ace\"))`?",
    "options": [
      "True",
      "3",
      "2",
      "1"
    ],
    "correctIndex": 2,
    "explanation": "\"placement\": p(0), l(1), a(2), c(3), e(4). \"ace\" starts at index 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-44",
    "question": "In the Activity Selection problem, if activity A is [1, 4] and activity B is [4, 7], can both be scheduled consecutively on the same resource?",
    "options": [
      "No, because 4 overlaps with 4",
      "It depends on the operating system",
      "Only if A is rescheduled",
      "Yes, because start time 4 is greater than or equal to end time 4"
    ],
    "correctIndex": 3,
    "explanation": "Standard interval scheduling treats intervals as [start, end). Since B starts at 4 right when A finishes at 4, they are non-overlapping.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-45",
    "question": "What is the output of `printf(\"%d\", 3 << 3);` in C?",
    "options": [
      "24",
      "9",
      "18",
      "27"
    ],
    "correctIndex": 0,
    "explanation": "3 * 2^3 = 3 * 8 = 24.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-46",
    "question": "What is the output of `int[] a = new int[5]; System.out.println(a[0]);` in Java?",
    "options": [
      "null",
      "0",
      "Garbage value",
      "1"
    ],
    "correctIndex": 1,
    "explanation": "Java guarantees that heap-allocated integer array elements are default-initialized to 0.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-47",
    "question": "What is the output of the following C++ code?",
    "options": [
      "10 20",
      "0 0",
      "20 10",
      "20 20"
    ],
    "correctIndex": 2,
    "explanation": "This is the classic three-step in-place variable swap using XOR without extra memory: a becomes 20 and b becomes 10.",
    "category": "Practical Execution & Trace (70%)",
    "codeSnippet": "int a = 10, b = 20;\na = a ^ b;\nb = a ^ b;\na = a ^ b;\ncout << a << \" \" << b;",
    "codeLanguage": "cpp"
  },
  {
    "id": "d3-post-48",
    "question": "What is the worst-case time complexity of binary search on an array of size N?",
    "options": [
      "O(1)",
      "O(N log N)",
      "O(N)",
      "O(log N)"
    ],
    "correctIndex": 3,
    "explanation": "Binary search halves the search space each iteration, reaching 1 element in at most log2(N) steps.",
    "category": "Theory (30%)"
  },
  {
    "id": "d3-post-49",
    "question": "What is the output of `print(3 * \"ab\" + \"c\")` in Python?",
    "options": [
      "abababc",
      "abcabcabc",
      "3abc",
      "Error"
    ],
    "correctIndex": 0,
    "explanation": "String multiplication in Python repeats the string: 3 * \"ab\" = \"ababab\". Adding \"c\" results in \"abababc\".",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d3-post-50",
    "question": "What does Mentor Kapil emphasize as the most decisive factor for passing company placement coding rounds?",
    "options": [
      "Typing as fast as possible without thinking",
      "Recognizing algorithmic patterns early, analyzing boundary constraints, and validating against tricky hidden test cases before submission",
      "Using the longest possible variable names",
      "Submitting unfinished code for partial marks"
    ],
    "correctIndex": 1,
    "explanation": "Systematic pattern recognition (Sliding Window, Binary Search, Two Pointers, Monotonic Stack) combined with rigorous edge-case testing guarantees consistent success in placement online assessments.",
    "category": "Theory (30%)"
  }
];
