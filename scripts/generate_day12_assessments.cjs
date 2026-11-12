const fs = require('fs');
const path = require('path');

const preAssessment = [
  // --- Theory (30%): Q1 to Q15 ---
  {
    id: 'd12-pre-1',
    question: 'What are the two mandatory mathematical properties that a problem must satisfy for Dynamic Programming to be applicable?',
    options: [
      'Continuous differentiability and linearity',
      'Optimal Substructure (an optimal solution to the problem contains within it optimal solutions to subproblems) and Overlapping Subproblems (the same subproblems are solved multiple times)',
      'Acyclic topology and greedy choice property',
      'Polynomial degree and sorting invariance'
    ],
    correctIndex: 1,
    explanation: 'Dynamic Programming requires Optimal Substructure so that subproblem solutions can be combined into a global optimum, and Overlapping Subproblems so that memoizing or tabulating subproblem results prevents exponential recomputation.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-2',
    question: 'In Top-Down Memoization vs Bottom-Up Tabulation, what is the primary risk of pure Top-Down recursive DP in languages like Python or Java for deep state spaces (e.g., N = 100,000)?',
    options: [
      'Memory corruption of static globals',
      'Call Stack Overflow (exceeding the operating system or runtime call-stack recursion depth limit)',
      'Hardware cache invalidation',
      'Loss of arithmetic precision'
    ],
    correctIndex: 1,
    explanation: 'Recursive call stacks in Python default to a depth of 1,000, and standard JVM thread stacks typically support only a few thousand frames. Deep recursions trigger StackOverflowError, making iterative tabulation safer for large N.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-3',
    question: 'Why can the classic 0/1 Knapsack problem with capacity W and N items be optimized from O(N * W) space to O(W) space by iterating backwards?',
    options: [
      'Iterating backwards sorts items by value-to-weight ratio',
      'In the recurrence dp[w] = max(dp[w], dp[w - weight] + val), iterating w from W down to weight ensures that dp[w - weight] comes from the PREVIOUS item iteration rather than being overwritten by the current item in the same step',
      'Backwards iteration avoids division by zero',
      'It allows the compiler to use SIMD instructions'
    ],
    correctIndex: 1,
    explanation: 'If we iterated forward, dp[w - weight] would already contain the choice of the current item, accidentally turning 0/1 Knapsack into Unbounded Knapsack (allowing multiple uses of the same item). Iterating backwards preserves the previous item\'s state.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-4',
    question: 'In Bitmask Dynamic Programming, what is the maximum value of N for which an O(2^N * N^2) or O(2^N * N) algorithm will comfortably run within standard FAANG 1.0s CPU limits (approx. 10^8 operations)?',
    options: [
      'N <= 20 (since 2^20 ≈ 1.05 * 10^6, and 10^6 * 20 ≈ 2 * 10^7 operations)',
      'N <= 50',
      'N <= 100',
      'N <= 1000'
    ],
    correctIndex: 0,
    explanation: '2^20 is approximately 1 million. For N=20, 2^N * N ≈ 2 * 10^7 operations, which executes in ~0.05s in C++/Java. If N was 30, 2^30 exceeds 1 billion operations, causing TLE.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-5',
    question: 'In Tree DP, why is any undirected acyclic tree guaranteed to have a valid topological order for bottom-up computation from any arbitrary root?',
    options: [
      'Trees do not contain cycles, so post-order traversal (visiting all children before the parent) naturally guarantees that subproblem values for all children are computed before computing the parent',
      'Trees are always binary',
      'Trees have negative edge weights',
      'Every tree has an Eulerian path'
    ],
    correctIndex: 0,
    explanation: 'A tree is a connected acyclic graph. Choosing any arbitrary root orients all edges away from the root, creating a Directed Acyclic Graph (DAG) where post-order DFS yields a valid topological evaluation order.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-6',
    question: 'In Interval Dynamic Programming (e.g. Matrix Chain Multiplication or Burst Balloons), in what order must the DP table be filled?',
    options: [
      'Row by row from top to bottom',
      'By increasing interval length `len = 1, 2, ..., N`, so that smaller sub-intervals are completely solved before larger intervals that depend on them are evaluated',
      'Column by column from right to left',
      'In random order with memoization'
    ],
    correctIndex: 1,
    explanation: 'Interval DP recurrence dp[i][j] splits into smaller sub-intervals dp[i][k] and dp[k+1][j]. For these sub-intervals to be available, all intervals of length < len(i, j) must already be computed.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-7',
    question: 'In State Machine DP, what distinguishes it from standard 1D array DP?',
    options: [
      'It uses multithreading across CPU cores',
      'The system state at step `i` is explicitly decomposed into multiple discrete mutually exclusive modes (e.g. Hold, Sold, Rest), each with its own recurrence equation governing transitions between modes',
      'It only applies to hardware circuit design',
      'It eliminates the need for base cases'
    ],
    correctIndex: 1,
    explanation: 'State Machine DP models problems where the permissible decisions on day i depend on the qualitative state (e.g., currently holding stock vs cool-down mode) established on day i-1.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-8',
    question: 'What is the time complexity of the classic Held-Karp algorithm for the Traveling Salesperson Problem (TSP) using Bitmask DP?',
    options: [
      'O(N!)',
      'O(2^N * N^2)',
      'O(N^3)',
      'O(N log N)'
    ],
    correctIndex: 1,
    explanation: 'There are 2^N subsets of visited cities, and for each subset there are N possible ending cities. From each state, we can transition to at most N unvisited cities, resulting in O(2^N * N^2) time, an exponential improvement over O(N!).',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-9',
    question: 'Why does the "Re-rooting Technique" in Tree DP reduce the time to compute all-nodes tree answers from O(N^2) to O(N)?',
    options: [
      'It ignores all leaf nodes',
      'It performs Pass 1 (post-order DFS) to compute values for an arbitrary root, and Pass 2 (pre-order DFS) to transition the root from parent to child in O(1) time using algebraic state transfer equations',
      'It converts the tree into a binary search tree',
      'It uses matrix multiplication'
    ],
    correctIndex: 1,
    explanation: 'Running a full DFS from each of the N nodes takes N * O(N) = O(N^2). Re-rooting computes the initial root in O(N) and updates the root dynamically across edges in O(1) per step during a second DFS pass.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-10',
    question: 'In Monotonic Queue / Deque DP optimization, how does a double-ended queue reduce the transition time from O(K) to O(1) amortized?',
    options: [
      'By sorting elements with quicksort on every push',
      'By maintaining indices whose DP values are strictly decreasing; elements outside the sliding window are removed from the front, and inferior smaller values are evicted from the back before insertion',
      'By hashing all previous states',
      'By doubling the capacity of the array'
    ],
    correctIndex: 1,
    explanation: 'Each element enters the deque once and is removed at most once (either from the back due to a larger incoming candidate or from the front due to sliding window expiration), giving O(1) amortized cost per state.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-11',
    question: 'What is Digit Dynamic Programming (Digit DP) primarily used for in competitive programming and FAANG technical assessments?',
    options: [
      'Multiplying large BigInteger numbers',
      'Counting the number of integers in a range [A, B] that satisfy a specific digit property (e.g. no consecutive ones, sum of digits equals S, monotonic digits) in O(log10(B)) time',
      'Converting decimal to binary strings',
      'Detecting cycles in linked lists'
    ],
    correctIndex: 1,
    explanation: 'Digit DP constructs numbers digit-by-digit from most significant to least significant, using state (index, tight_bound_flag, leading_zeros_flag, condition_state) to count valid integers up to 10^18 in milliseconds.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-12',
    question: 'In Digit DP, what does the boolean state flag `tight` (or `isLess`) signify?',
    options: [
      'Whether the CPU memory limit is nearly exhausted',
      'Whether the prefix of digits chosen so far is strictly constrained by the upper bound number N (if tight == true, current digit can only range from 0 to digit[i]; if tight == false, it can range freely from 0 to 9)',
      'Whether the number is negative',
      'Whether the number contains an odd number of digits'
    ],
    correctIndex: 1,
    explanation: 'The `tight` flag restricts digits so the generated number never exceeds the upper bound N. Once a chosen digit is strictly less than the boundary digit at index i, `tight` becomes false for all subsequent positions.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-13',
    question: 'What is the recurrence relation for the Longest Common Subsequence (LCS) between strings s1 of length M and s2 of length N?',
    options: [
      'dp[i][j] = dp[i-1][j-1] + dp[i-1][j]',
      'If s1[i-1] == s2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]; Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])',
      'dp[i][j] = dp[i-1][j] * dp[i][j-1]',
      'dp[i][j] = min(dp[i-1][j], dp[i][j-1])'
    ],
    correctIndex: 1,
    explanation: 'If the characters match, they extend the LCS of both prefixes by 1. If they do not match, we take the maximum LCS obtained by skipping either the current character of s1 or s2.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-14',
    question: 'Why does Dynamic Programming over Directed Acyclic Graphs (DAGs) naturally handle shortest or longest paths without requiring Dijkstra or Bellman-Ford?',
    options: [
      'A DAG has no directed cycles, meaning vertices can be ordered topologically such that all incoming dependencies for vertex v are completely computed before v is visited',
      'DAGs have no edge weights',
      'All paths in a DAG have equal length',
      'DAGs only contain 2 vertices'
    ],
    correctIndex: 0,
    explanation: 'In a DAG, topological sorting guarantees that when we process node v, all paths arriving at v have already been finalized, allowing simple O(V + E) relaxation for shortest or longest paths even with negative edge weights.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-pre-15',
    question: 'In the classic Matrix Chain Multiplication problem with dimensions p = [p0, p1, ..., pn], what does dp[i][j] represent?',
    options: [
      'The determinant of matrix product Ai...Aj',
      'The minimum number of scalar multiplications needed to compute the matrix product Ai * Ai+1 * ... * Aj',
      'The number of rows in matrix Ai',
      'The inverse of matrix product Ai...Aj'
    ],
    correctIndex: 1,
    explanation: 'dp[i][j] stores the minimum scalar multiplications to multiply matrices from index i to j. For partition k, cost is dp[i][k] + dp[k+1][j] + p[i-1] * p[k] * p[j].',
    category: 'Theory (30%)'
  },

  // --- Practical Execution & Trace (70%): Q16 to Q50 ---
  {
    id: 'd12-pre-16',
    question: 'Consider LeetCode 10 "Regular Expression Matching" matching s = "aa" with p = "a*". What is the value of dp[2][2] (2 chars of s matched with 2 chars of p)?',
    options: [
      'false',
      'true (since \'*\' can represent two copies of \'a\', matching "aa")',
      'null',
      'SyntaxError'
    ],
    correctIndex: 1,
    explanation: '\'*\' matches zero or more of \'a\'. Two \'a\' characters can be matched by applying the transition dp[i][j] = dp[i-1][j] when s[i-1] == p[j-2], yielding true.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-17',
    question: 'In Stock Trading with Cooldown, prices = [1, 2, 3, 0, 2]. What is the maximum profit achievable?',
    options: [
      '1',
      '2',
      '3 (Buy at 1, Sell at 2 [profit 1], Cooldown, Buy at 0, Sell at 2 [profit 2]; total 3)',
      '4'
    ],
    correctIndex: 2,
    explanation: 'Day 1: Buy @ 1. Day 2: Sell @ 2 (profit 1). Day 3: Cooldown (forced rest). Day 4: Buy @ 0. Day 5: Sell @ 2 (profit 2). Total profit = 1 + 2 = 3.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-18',
    question: 'In TSP Bitmask DP on 4 cities, what does the bitmask `11` (in binary: `1011`) represent in state dp[11][u]?',
    options: [
      'Cities 10 and 11 have been visited',
      'Cities 0, 1, and 3 have been visited (bits 0, 1, 3 are set to 1, while bit 2 is 0), currently ending at city u',
      'Only city 3 is visited',
      'Cities 1, 2, and 4 are visited'
    ],
    correctIndex: 1,
    explanation: 'In 0-indexed binary representation, 11 in decimal is 1011 in binary. Bits at index 0, 1, and 3 are 1, indicating cities {0, 1, 3} are in the visited subset.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-19',
    question: 'In LeetCode 312 "Burst Balloons" with nums = [3, 1, 5, 8], why is padding with boundary values 1 on both ends (val = [1, 3, 1, 5, 8, 1]) essential?',
    options: [
      'It increases the array size to an even number',
      'It provides uniform boundary conditions for the product val[left-1] * val[k] * val[right+1], eliminating out-of-bounds checks when bursting boundary balloons',
      'It prevents division by zero',
      'It sorts the balloon array'
    ],
    correctIndex: 1,
    explanation: 'The problem statement specifies that if i-1 or i+1 is out of bounds, treat it as a balloon with value 1. Explicitly padding with [1] at index 0 and index N+1 unifies interval DP transitions.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-20',
    question: 'In LeetCode 834 "Sum of Distances in Tree" for a tree of N = 6 nodes, if node 0 has ans[0] = 8 and its child node 2 has subtree size count[2] = 4, what is ans[2]?',
    options: [
      'ans[2] = 8 + 6 = 14',
      'ans[2] = ans[0] - count[2] + (N - count[2]) = 8 - 4 + (6 - 4) = 8 - 4 + 2 = 6',
      'ans[2] = 12',
      'ans[2] = 4'
    ],
    correctIndex: 1,
    explanation: 'Re-rooting formula: moving from parent 0 to child 2 brings the 4 nodes in subtree 2 one step closer (-4) and pushes the remaining 2 nodes one step further (+2). ans[2] = 8 - 4 + 2 = 6.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-21',
    question: 'In LeetCode 1425 "Constrained Subsequence Sum" with nums = [10, 2, -10, 5, 20] and k = 2, what is the maximum constrained subsequence sum?',
    options: [
      '27',
      '37 (subsequence [10, 2, 5, 20] where consecutive index gaps are 1, 2, 1 <= 2)',
      '20',
      '15'
    ],
    correctIndex: 1,
    explanation: 'Starting at index 0 (10), move to index 1 (2, gap 1), skip -10 to jump to index 3 (5, gap 2), then to index 4 (20, gap 1). All gaps <= k=2. Total sum = 10 + 2 + 5 + 20 = 37.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-22',
    question: 'In LeetCode 1000 "Minimum Cost to Merge Stones" with N = 4 and K = 3, what should the function return?',
    options: [
      '10',
      '-1 (because (N - 1) % (K - 1) = (4 - 1) % (3 - 1) = 3 % 2 = 1 != 0, making it mathematically impossible to reach 1 pile)',
      '20',
      '0'
    ],
    correctIndex: 1,
    explanation: 'Every merge of K piles reduces the total number of piles by (K - 1). To reach 1 pile from N piles, (N - 1) must be divisible by (K - 1). Here 3 % 2 = 1, so merging into 1 pile is impossible.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-23',
    question: 'In LeetCode 698 "Partition to K Equal Sum Subsets", if nums = [4, 3, 2, 3, 5, 2, 1] and k = 4, what is the target sum per subset?',
    options: [
      'sum is 20, target = 20 / 4 = 5',
      'target = 4',
      'target = 7',
      'target = 6'
    ],
    correctIndex: 0,
    explanation: 'The sum of all elements is 4 + 3 + 2 + 3 + 5 + 2 + 1 = 20. Since 20 % 4 == 0, each of the 4 subsets must sum to exactly 20 / 4 = 5.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-24',
    question: 'In LeetCode 600 "Non-negative Integers without Consecutive Ones" with N = 5 (binary `101`), which numbers in [0, 5] are valid?',
    options: [
      '0, 1, 2, 3, 4, 5 (all 6 numbers)',
      '0 (0), 1 (1), 2 (10), 4 (100), 5 (101) - exactly 5 valid numbers (3 has binary 11 and is invalid)',
      'Only 0 and 1',
      'None'
    ],
    correctIndex: 1,
    explanation: 'Binary forms: 0=0, 1=1, 2=10, 3=11 (invalid: consecutive 1s), 4=100, 5=101. The valid numbers are 0, 1, 2, 4, 5. Total count is 5.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-25',
    question: 'In LeetCode 124 "Binary Tree Maximum Path Sum" with tree root = [-10, 9, 20, null, null, 15, 7], what is the maximum path sum?',
    options: [
      '20',
      '42 (path 15 -> 20 -> 7)',
      '35',
      '9'
    ],
    correctIndex: 1,
    explanation: 'Node 20 has left child 15 and right child 7. The path 15 -> 20 -> 7 has sum 15 + 20 + 7 = 42. Adding -10 from above would reduce the sum, so 42 is the global maximum.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-26',
    question: 'In Stock IV (at most K transactions), what happens if K is very large, e.g., K >= N / 2 where N is the number of days?',
    options: [
      'The DP table overflows',
      'The constraint on K becomes inactive; we can simply execute every profitable single-day price increase (greedy O(N) pass: sum of max(0, prices[i] - prices[i-1]))',
      'The answer is always 0',
      'The problem requires O(N!) search'
    ],
    correctIndex: 1,
    explanation: 'Since you cannot buy and sell on the same day, you can make at most N / 2 complete transactions. If K >= N / 2, you can take every profitable trade, reducing to Best Time to Buy and Sell Stock II.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-27',
    question: 'In LeetCode 72 "Edit Distance" between word1 of length M and word2 of length N, if word1[i-1] != word2[j-1], what is the recurrence for dp[i][j]?',
    options: [
      'dp[i][j] = dp[i-1][j-1]',
      'dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) (representing Delete, Insert, and Replace operations respectively)',
      'dp[i][j] = 1 + dp[i-1][j-1]',
      'dp[i][j] = dp[i-1][j] + dp[i][j-1]'
    ],
    correctIndex: 1,
    explanation: 'The three edit operations correspond to: dp[i-1][j] (deletion from word1), dp[i][j-1] (insertion into word1), and dp[i-1][j-1] (replacement of character). We take the minimum cost plus 1.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-28',
    question: 'Trace the Edit Distance between "horse" and "ros". What is the minimum operations count?',
    options: [
      '1',
      '3 ("horse" -> "rorse" (replace h with r) -> "rose" (remove r) -> "ros" (remove e))',
      '4',
      '2'
    ],
    correctIndex: 1,
    explanation: 'Replace \'h\' with \'r\' ("rorse"), delete third character \'r\' ("rose"), delete final character \'e\' ("ros"). Total operations = 3.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-29',
    question: 'In LeetCode 847 "Shortest Path Visiting All Nodes" with 4 nodes connected as a star graph centered at 0 (edges: 0-1, 0-2, 0-3), what is the shortest path length?',
    options: [
      '3',
      '4 (e.g. 1 -> 0 -> 2 -> 0 -> 3 visits all 4 nodes using 4 edges)',
      '6',
      '5'
    ],
    correctIndex: 1,
    explanation: 'Starting at leaf 1, traverse to center 0 (1 edge), to leaf 2 (2 edges), back to center 0 (3 edges), to leaf 3 (4 edges). Total edges = 4.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-30',
    question: 'In LeetCode 322 "Coin Change" with coins = [1, 2, 5] and amount = 11, what is the minimum coins count?',
    options: [
      '4',
      '3 (5 + 5 + 1 = 11)',
      '2',
      '5'
    ],
    correctIndex: 1,
    explanation: 'Two 5-coins give 10, plus one 1-coin gives 11. Total coins = 3.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-31',
    question: 'In LeetCode 518 "Coin Change II" (counting number of combinations to make amount), why must the outer loop iterate over COINS and inner loop over AMOUNT?',
    options: [
      'To prevent compiler warnings',
      'Iterating coins on the outer loop guarantees combinations (uniqueness of coin sets) rather than permutations (order-dependent sequences)',
      'Because amount can be negative',
      'It produces an exponential speedup'
    ],
    correctIndex: 1,
    explanation: 'Looping over coins first means each coin denomination is considered in a fixed sequential order, preventing permutations like [1, 2] and [2, 1] from being counted as distinct combinations.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-32',
    question: 'In Matrix Chain Multiplication for 3 matrices A1 (10x100), A2 (100x5), A3 (5x50), which parenthesization minimizes scalar multiplications?',
    options: [
      '(A1 * A2) * A3: (10*100*5) + (10*5*50) = 5,000 + 2,500 = 7,500 operations',
      'A1 * (A2 * A3): (100*5*50) + (10*100*50) = 25,000 + 50,000 = 75,000 operations',
      'Both have equal operations',
      'Neither is valid'
    ],
    correctIndex: 0,
    explanation: '(A1 * A2) * A3 requires 5,000 + 2,500 = 7,500 multiplications, whereas A1 * (A2 * A3) requires 75,000 operations. Parenthesizing (A1 * A2) * A3 is 10x faster.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-33',
    question: 'In LeetCode 300 "Longest Increasing Subsequence" (LIS), how does Patience Sorting with Binary Search achieve O(N log N) time compared to standard O(N^2) DP?',
    options: [
      'It sorts the array in O(N log N) initially',
      'It maintains a `tails` array where tails[len] stores the smallest tail of all increasing subsequences of length `len + 1`. For each element x, binary search (std::lower_bound) finds the position to replace or extend in O(log N)',
      'It uses a segment tree',
      'It runs Dijkstra\'s algorithm'
    ],
    correctIndex: 1,
    explanation: 'The `tails` array is always strictly sorted. For each incoming number, lower_bound finds the first element >= x in O(log N). If none exists, x extends the LIS; otherwise, x replaces an existing tail, greedily keeping tails as small as possible.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-34',
    question: 'In LeetCode 416 "Partition Equal Subset Sum", what is the equivalent DP problem formulation?',
    options: [
      'Topological Sort on a DAG',
      '0/1 Knapsack where target weight is sum(nums) / 2; return true if a subset of items can sum exactly to target',
      'Shortest Path in a bipartite graph',
      'Interval DP'
    ],
    correctIndex: 1,
    explanation: 'Dividing nums into two subsets with equal sum requires finding a subset whose sum equals totalSum / 2. If totalSum is odd, return false immediately; otherwise, run 0/1 Knapsack for target = totalSum / 2.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-35',
    question: 'In LeetCode 1143 "Longest Common Subsequence" for s1 = "abcde" and s2 = "ace", what is the length of the LCS?',
    options: [
      '2',
      '3 ("a", "c", "e")',
      '4',
      '5'
    ],
    correctIndex: 1,
    explanation: 'Characters \'a\', \'c\', \'e\' appear in both strings in the exact same relative order. The LCS length is 3.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-36',
    question: 'In Tree DP for "House Robber III", each tree node can either be robbed or not robbed. What pair of values does each node return to its parent in post-order traversal?',
    options: [
      '(node.val, 0)',
      '(robThisNode, notRobThisNode): robThisNode = node.val + left.notRob + right.notRob; notRobThisNode = max(left.rob, left.notRob) + max(right.rob, right.notRob)',
      '(left.rob, right.rob)',
      '(node.height, node.depth)'
    ],
    correctIndex: 1,
    explanation: 'If a node is robbed, neither of its immediate children can be robbed. If a node is not robbed, each child can independently be robbed or skipped to maximize total loot.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-37',
    question: 'In LeetCode 198 "House Robber" on array nums = [2, 7, 9, 3, 1], what is the maximum amount of money you can rob without alerting the police (cannot rob adjacent houses)?',
    options: [
      '11',
      '12 (rob houses at indices 0 (2), 2 (9), 4 (1): 2 + 9 + 1 = 12)',
      '14',
      '10'
    ],
    correctIndex: 1,
    explanation: 'Robbing indices 0 (2), 2 (9), and 4 (1) gives 2 + 9 + 1 = 12. Robbing indices 1 (7) and 3 (3) gives 10. The optimal non-adjacent sum is 12.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-38',
    question: 'In LeetCode 213 "House Robber II", where houses are arranged in a circle, how do you handle the cycle constraint using the solution to House Robber I?',
    options: [
      'Run the algorithm once on the full array',
      'Solve two separate linear subproblems: Case A: consider houses from index 0 to N-2 (excluding the last house); Case B: consider houses from index 1 to N-1 (excluding the first house). The answer is max(Case A, Case B)',
      'Divide all numbers by 2',
      'Sort the houses by value'
    ],
    correctIndex: 1,
    explanation: 'Because house 0 and house N-1 are adjacent in a circle, you can never rob both. The solution must either rob from subset [0..N-2] or from subset [1..N-1]. Taking the maximum of these two linear runs covers all possibilities.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-39',
    question: 'In LeetCode 139 "Word Break" with s = "leetcode" and wordDict = ["leet", "code"], what is the value of dp[8]?',
    options: [
      'false',
      'true (since dp[0] is true, s[0..3] "leet" is in dict -> dp[4]=true; then s[4..7] "code" is in dict -> dp[8]=true)',
      'null',
      '8'
    ],
    correctIndex: 1,
    explanation: 'dp[0] = true. dp[4] = true because s[0..3] == "leet". dp[8] = true because dp[4] is true and s[4..7] == "code" is in wordDict. Final result is true.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-40',
    question: 'In LeetCode 140 "Word Break II", what is the primary computational challenge compared to Word Break I?',
    options: [
      'Word Break II requires BigInteger',
      'Word Break II must reconstruct ALL valid sentence permutations, which can be exponential (O(2^N)) in the worst case (e.g. s = "aaaa", dict = ["a", "aa", "aaa", "aaaa"]), requiring backtracking with memoization',
      'Word Break II only works on uppercase letters',
      'Word Break II requires Dijkstra'
    ],
    correctIndex: 1,
    explanation: 'While Word Break I only returns a boolean (O(N^2)), Word Break II must return all decomposed sentence strings, whose count can grow exponentially. Pre-filtering with DP and memoized backtracking avoids dead-ends.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-41',
    question: 'In LeetCode 115 "Distinct Subsequences" counting occurrences of target string `t` as a subsequence of source `s`, what is the base case when `t` is empty?',
    options: [
      'dp[i][0] = 0',
      'dp[i][0] = 1 (an empty string t is a valid subsequence of any prefix of s in exactly 1 way: by deleting all characters)',
      'dp[i][0] = -1',
      'dp[0][0] = 0'
    ],
    correctIndex: 1,
    explanation: 'There is exactly 1 way to form an empty string from any prefix of s: by choosing not to include any characters. Therefore, dp[i][0] = 1 for all i >= 0.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-42',
    question: 'In LeetCode 87 "Scramble String" with strings s1 and s2 of length N, what is the state definition for 3D/4D DP?',
    options: [
      'dp[i][j][len]: whether the substring of s1 starting at i of length `len` is a scramble of the substring of s2 starting at j of length `len`',
      'dp[i][j]: distance between strings',
      'dp[len]: count of scrambles',
      'dp[i][j][k][l]: coordinates in 4D space'
    ],
    correctIndex: 0,
    explanation: 'dp[i][j][len] models whether s1[i..i+len-1] and s2[j..j+len-1] are scramble strings. Transitions check splitting at position k (1 <= k < len) either without swap or with swap.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-43',
    question: 'In Bitmask DP, how do you iterate through all SUBMASKS of a given mask in decreasing order in O(3^N) total time across all masks?',
    options: [
      'for (int sub = mask; sub > 0; sub = (sub - 1) & mask)',
      'for (int sub = 0; sub <= mask; sub++)',
      'sub = mask >> 1',
      'while (mask > 0) mask--'
    ],
    correctIndex: 0,
    explanation: 'The idiom `sub = (sub - 1) & mask` visits only valid submasks of `mask`. Summing over all masks, the number of operations is sum_{k=0}^N binom(N, k) * 2^k = (1 + 2)^N = 3^N.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-44',
    question: 'In LeetCode 329 "Longest Increasing Path in a Matrix" of size M x N, why is simple DFS with memoization (dp[r][c]) guaranteed to run in strictly linear O(M * N) time without cycle detection?',
    options: [
      'Because all cells have identical values',
      'Because paths must be STRICTLY INCREASING: a strictly increasing path cannot contain cycles, turning the grid into a Directed Acyclic Graph (DAG) where each cell’s LIP is computed once and cached',
      'The matrix is always symmetric',
      'DFS runs in O(1) time'
    ],
    correctIndex: 1,
    explanation: 'A strictly increasing condition ensures that cell A can only transition to neighbor B if matrix[B] > matrix[A]. You can never return to cell A, guaranteeing an acyclic DAG and linear memoized search.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-45',
    question: 'In LeetCode 44 "Wildcard Matching" where \'*\' matches any sequence of characters (including empty sequence), how does the transition for \'*\' differ from LeetCode 10 Regular Expression Matching?',
    options: [
      'In Wildcard matching, \'*\' stands alone without a preceding character: dp[i][j] = dp[i][j-1] (matches 0 characters) || dp[i-1][j] (matches 1 or more characters)',
      'They are identical',
      'Wildcard matching does not support \'*\'',
      'Wildcard matching requires O(N!) time'
    ],
    correctIndex: 0,
    explanation: 'In Wildcard Matching (LeetCode 44), \'*\' matches any sequence of characters by itself, whereas in Regex (LeetCode 10), \'*\' acts as a quantifier modifying the preceding single character.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-46',
    question: 'In LeetCode 96 "Unique Binary Search Trees" (finding the number of structurally unique BSTs with N keys), which classic mathematical sequence provides the answer?',
    options: [
      'Fibonacci numbers',
      'Catalan numbers: C(n) = (2n)! / ((n + 1)! * n!) with recurrence C(n) = sum_{i=1}^n C(i-1) * C(n-i)',
      'Lucas numbers',
      'Bell numbers'
    ],
    correctIndex: 1,
    explanation: 'Choosing root i leaves i-1 keys in the left subtree and n-i keys in the right subtree. The total count is sum_{i=1}^n dp[i-1] * dp[n-i], which is the Catalan number sequence.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-47',
    question: 'In LeetCode 91 "Decode Ways" with s = "06", what is the number of valid decodings?',
    options: [
      '1',
      '0 (leading zeros are invalid: \'0\' has no corresponding letter mapping)',
      '2',
      '6'
    ],
    correctIndex: 1,
    explanation: 'The mapping \'A\' -> 1, ..., \'Z\' -> 26 contains no mapping for \'0\'. A leading zero like "06" cannot be decoded as single digit 0, nor can it pair with 6 as valid letters are 1-26.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-48',
    question: 'In LeetCode 552 "Student Attendance Record II", why does State Machine DP maintain states (days, consecutive_late_count, total_absent_count)?',
    options: [
      'To record student grades',
      'An award is given if a student has strictly fewer than 2 \'A\' (absent) and never 3 consecutive \'L\' (late). The state (i, absent_count, late_count) where absent in {0, 1} and late in {0, 1, 2} has only 6 sub-states per day',
      'It requires keeping track of all student names',
      'It cannot be solved with DP'
    ],
    correctIndex: 1,
    explanation: 'The eligibility constraints depend only on: (1) whether 0 or 1 \'A\' has been used so far, and (2) whether the trailing run of \'L\' is 0, 1, or 2. This creates exactly 2 * 3 = 6 states evaluated across N days.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-49',
    question: 'In LeetCode 174 "Dungeon Game", why must the DP be solved BACKWARDS starting from the bottom-right princess cell to the top-left knight cell?',
    options: [
      'Because the knight walks backwards',
      'Forward DP would require knowing both current health and minimum historical health, which does not satisfy optimal substructure; backward DP defines dp[r][c] as the minimum health REQUIRED to survive from (r, c) to the exit, which depends solely on future cells',
      'Because dungeon cells have negative coordinates',
      'To save memory'
    ],
    correctIndex: 1,
    explanation: 'A knight arriving at cell (r, c) with high health might have taken a path that required huge initial health. Moving backwards allows computing the exact minimum health required to survive the remainder of the dungeon.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-pre-50',
    question: 'In LeetCode 368 "Largest Divisible Subset", after computing the DP array of subset lengths, how is the actual subset of numbers reconstructed in O(N) time?',
    options: [
      'By running a second binary search',
      'By maintaining a `parent[i]` or `prev[i]` array storing the index of the predecessor element that maximized dp[i], and tracing back from the index with maximum dp value',
      'By sorting the array in reverse',
      'By converting numbers to strings'
    ],
    correctIndex: 1,
    explanation: 'Whenever dp[i] is updated with dp[j] + 1, we set parent[i] = j. Once the maximum dp[i] is found, following parent pointers reconstructs the complete optimal subset.',
    category: 'Practical Execution & Trace (70%)'
  }
];

const postAssessment = [
  // --- Theory (30%): Q1 to Q15 ---
  {
    id: 'd12-post-1',
    question: 'What is the Convex Hull Trick (CHT) or Li Chao Tree optimization in Dynamic Programming, and what complexity reduction does it achieve?',
    options: [
      'It optimizes 3D graphics rendering in OpenGL',
      'It reduces DP transitions of the form dp[i] = min_{j < i} (dp[j] + m_j * x_i + c_j) from O(N^2) to O(N log N) or O(N) by viewing transitions as linear functions y = m*x + c and maintaining their lower convex envelope',
      'It eliminates floating point errors',
      'It solves integer factorizations'
    ],
    correctIndex: 1,
    explanation: 'When the transition function represents a family of linear equations y = m_j * x + c_j, computing the minimum at query point x_i is equivalent to finding the lower convex envelope of lines, solvable in O(1) amortized or O(log N).',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-2',
    question: 'Under what conditions does Knuth-Yao Optimization reduce Interval Dynamic Programming from O(N^3) to O(N^2)?',
    options: [
      'When all array elements are powers of 2',
      'When the cost function satisfies the Quadrangle Inequality (cost[a][c] + cost[b][d] <= cost[a][d] + cost[b][c] for a <= b <= c <= d) and monotonicity, implying optimal split points satisfy opt[i][j-1] <= opt[i][j] <= opt[i+1][j]',
      'When the graph is bipartite',
      'When all interval lengths are prime'
    ],
    correctIndex: 1,
    explanation: 'Knuth-Yao optimization applies when the optimal split point opt[i][j] is bounded between opt[i][j-1] and opt[i+1][j]. Narrowing the search range for k shrinks total operations from O(N^3) to O(N^2).',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-3',
    question: 'What is Divide and Conquer DP optimization, and when is it applicable?',
    options: [
      'It divides arrays into even and odd indices',
      'It applies to 2D DP of the form dp[i][j] = min_{k < j} (dp[i-1][k] + cost(k, j)) when the optimal split point opt[i][j] is monotonic in j: opt[i][j] <= opt[i][j+1], reducing O(K * N^2) to O(K * N log N)',
      'It converts recursive DP into quicksort',
      'It only works when K = 2'
    ],
    correctIndex: 1,
    explanation: 'If the optimal partition index moves monotonically to the right as j increases, we can compute the midpoint j = (l + r)/2, find its optimal k, and restrict searches for j < mid to k <= opt_mid and j > mid to k >= opt_mid, achieving O(K * N log N).',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-4',
    question: 'What is SOS DP (Sum Over Subsets Dynamic Programming) and what is its time complexity for an N-bit universe?',
    options: [
      'O(2^N)',
      'O(N * 2^N) - It computes the sum of f(submask) for all submasks of every mask in O(N * 2^N) time using dimension-by-dimension prefix sums, compared to O(3^N) for naive submask iteration',
      'O(4^N)',
      'O(N!)'
    ],
    correctIndex: 1,
    explanation: 'SOS DP decomposes subset inclusion bit-by-bit: dp[mask][i] = dp[mask][i-1] + (if bit i is set, dp[mask ^ (1<<i)][i-1]). Iterating N dimensions across 2^N masks takes strictly O(N * 2^N) time.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-5',
    question: 'How can any linear recurrence relation of degree K (e.g. Fib(N) = Fib(N-1) + Fib(N-2) with K=2) be solved for arbitrary large N (e.g. N = 10^18) in O(K^3 log N) time?',
    options: [
      'Using a lookup table of size 10^18',
      'Matrix Exponentiation: express state transition as state_{n} = T * state_{n-1}, and compute the K x K transformation matrix power T^N using Binary Exponentiation in O(K^3 log N) operations',
      'Using recursion without base cases',
      'Approximating with floating point logarithms'
    ],
    correctIndex: 1,
    explanation: 'Because matrix multiplication is associative, computing T^N takes O(log N) matrix multiplications. For a K x K transition matrix, each multiplication takes O(K^3), allowing N = 10^18 to be evaluated in milliseconds.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-6',
    question: 'In Tree DP with knapsack-like budget constraints (Tree Knapsack), what is the naive vs optimized time complexity for subtree merging?',
    options: [
      'Naive merging of subtree sizes takes O(N^3), but bounding the merge loops strictly by the actual sizes of the subtrees being merged (size[u] and size[v]) reduces the overall runtime to O(N^2)',
      'It is always O(N log N)',
      'Tree Knapsack is NP-hard and cannot be solved in polynomial time',
      'Both run in O(N!)'
    ],
    correctIndex: 0,
    explanation: 'When merging DP states of two subtrees of size S1 and S2, iterating only up to S1 and S2 corresponds to counting pairs of nodes in the tree, which bounds total operations across the entire tree to O(N^2).',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-7',
    question: 'Why does Monotonic Deque DP require that the function being optimized within the sliding window be independent of the current index `i`?',
    options: [
      'If the term inside the max depended on both `i` and `j` (e.g., nums[i] * nums[j]), the relative ordering of candidates could flip as `i` changes, invalidating the monotonic deque order; such transitions require Convex Hull Trick or Segment Trees',
      'Monotonic deques only work on integers',
      'Indices cannot be stored in deques',
      'Because `i` must always be negative'
    ],
    correctIndex: 0,
    explanation: 'A monotonic deque requires that if candidate A is better than candidate B at step i, candidate A remains better than B for all future steps. If a cross-term like nums[i]*nums[j] exists, line slopes vary and CHT is required.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-8',
    question: 'In Bitmask DP for Directed Hamiltonian Path / TSP, what is the base case initialization?',
    options: [
      'dp[0][0] = 1',
      'dp[1 << i][i] = 0 (or start cost) for all valid start nodes i (a path consisting solely of city i has visited mask 1<<i with 0 distance)',
      'All dp entries initialized to 0',
      'dp[(1<<N)-1][0] = 0'
    ],
    correctIndex: 1,
    explanation: 'A path of length 0 starts at any single city i. The mask contains only bit i (1 << i), and the cost is 0. All other dp[mask][u] entries are initialized to infinity.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-9',
    question: 'In 2D Grid DP, when is it possible to reduce the memory footprint from O(R * C) to O(C)?',
    options: [
      'When transitions at cell (r, c) depend ONLY on values from the current row `r` and the immediately preceding row `r - 1`',
      'When the grid has equal rows and columns',
      'When all numbers in the grid are positive',
      'When moving strictly in diagonal directions'
    ],
    correctIndex: 0,
    explanation: 'Because cell (r, c) only reads from row r-1 and previously computed cells in row r, we only need to keep two rows in memory (or a single rolling 1D array updated in-place), cutting space to O(C).',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-10',
    question: 'What is the "Profile DP" or "Broken Profile DP" technique used for in advanced competitive programming?',
    options: [
      'Profiling CPU performance with gprof',
      'Tiling a grid (e.g. N x M with dominoes) cell by cell where the bitmask represents the "ragged contour" (profile) of the boundary separating tiled and untiled cells',
      'Deleting duplicate profiles in a database',
      'Estimating Big-O complexity'
    ],
    correctIndex: 1,
    explanation: 'Broken Profile DP advances one square at a time rather than row-by-row. The bitmask of length M tracks the occupancy of the M boundary cells adjacent to the current position, allowing O(N * M * 2^M) transitions.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-11',
    question: 'In Interval DP, why is the outer loop index representing the interval length `len` rather than the left endpoint `i`?',
    options: [
      'To prevent segmentation faults on array bounds',
      'Because calculating dp[i][j] requires solutions for strictly smaller sub-intervals dp[i][k] and dp[k+1][j]. Iterating by length guarantees all smaller sub-intervals have been finalized',
      'Because matrix columns must be accessed sequentially',
      'It is an arbitrary stylistic convention'
    ],
    correctIndex: 1,
    explanation: 'Subproblem dependency in interval DP is strictly on interval length: an interval of length L depends on intervals of length 1, 2, ..., L-1. Outer looping on length ensures dependencies are computed first.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-12',
    question: 'How do you detect whether an optimal DP subproblem exhibits the "Greedy Choice Property", rendering DP unnecessary in favor of a faster Greedy algorithm?',
    options: [
      'If the array is already sorted',
      'If proving via exchange argument shows that locally optimal choices at each step can never prevent reaching the global optimum (e.g., Fractional Knapsack vs 0/1 Knapsack)',
      'If the time complexity is O(N^2)',
      'If there are no negative numbers'
    ],
    correctIndex: 1,
    explanation: 'If an exchange argument proves that swapping any alternative choice with the greedy choice produces an equal or better solution, the problem has the greedy choice property and does not require exploring all subproblems via DP.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-13',
    question: 'In Digit DP, why is memoization keyed on `(index, isLess, isStarted, ...)` without including the actual number prefix formed so far?',
    options: [
      'The actual prefix digits can be huge, creating an infinite state space. Only the properties of the prefix that affect future choices (e.g., tight constraint, parity, remainder modulo K) must be included in the memoization key',
      'Memoization cannot store strings',
      'Because numbers must be processed in reverse',
      'To comply with IEEE 754 floating point rules'
    ],
    correctIndex: 0,
    explanation: 'If we keyed on the prefix itself, every branch would have a unique key, defeating memoization. Collapsing prefixes into their equivalence classes (e.g. prefix_sum % K) keeps the state space small and enables caching.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-14',
    question: 'What is the difference between Unbounded Knapsack and 0/1 Knapsack in their 1D array DP state transitions?',
    options: [
      'Unbounded Knapsack iterates capacity `w` FORWARD from `weight` to `W` (allowing an item to be selected multiple times), whereas 0/1 Knapsack iterates capacity `w` BACKWARD from `W` down to `weight` (preventing multiple selections of the same item)',
      'Unbounded Knapsack requires negative weights',
      '0/1 Knapsack uses a queue while Unbounded uses a stack',
      'Unbounded Knapsack runs in O(1) time'
    ],
    correctIndex: 0,
    explanation: 'Forward iteration allows newly updated dp[w - weight] to be reused within the same item loop, modeling unlimited item supply. Backward iteration references only values from the previous item.',
    category: 'Theory (30%)'
  },
  {
    id: 'd12-post-15',
    question: 'What is the role of the "Dummy State" (index 0) in 1-based indexing for DP arrays?',
    options: [
      'It increases compiler memory allocation speed',
      'It provides a clean, unified base case (e.g., dp[0] = 0 or dp[0] = 1) that eliminates boundary `if (i == 0)` special-case checks inside high-performance loops',
      'It holds the total execution time',
      'It stores the return address of the function'
    ],
    correctIndex: 1,
    explanation: 'Using 1-based indexing with a sentinel dp[0] base case simplifies loop conditions by allowing dp[i - 1] to be accessed safely without branch checks on the first element.',
    category: 'Theory (30%)'
  },

  // --- Practical Execution & Trace (70%): Q16 to Q50 ---
  {
    id: 'd12-post-16',
    question: 'In LeetCode 10 "Regular Expression Matching", what is the value of matching s = "ab" with pattern p = ".*"?',
    options: [
      'false',
      'true (since \'.\' matches any char and \'*\' repeats it zero or more times, \'.*\' matches any sequence of any characters)',
      'null',
      'Error'
    ],
    correctIndex: 1,
    explanation: '\'.*\' is universal wildcard in regex: \'.\' matches \'a\', repeated by \'*\' to match any arbitrary sequence including "ab".',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-17',
    question: 'In LeetCode 10 "Regular Expression Matching", what is the result of matching s = "aab" with pattern p = "c*a*b"?',
    options: [
      'false',
      'true (\'c*\' represents 0 \'c\'s, \'a*\' represents 2 \'a\'s, and \'b\' matches \'b\')',
      'Compilation error',
      'null'
    ],
    correctIndex: 1,
    explanation: '\'c*\' eliminates \'c\' (0 occurrences), \'a*\' matches "aa", and \'b\' matches \'b\'. Result: true.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-18',
    question: 'In Stock Trading with a Transaction Fee `fee = 2` and prices = [1, 3, 2, 8, 4, 9], what is the maximum profit achievable?',
    options: [
      '6',
      '8 (Buy at 1, Sell at 8 [profit: 8 - 1 - 2 = 5]; Buy at 4, Sell at 9 [profit: 9 - 4 - 2 = 3]; Total = 5 + 3 = 8)',
      '10',
      '4'
    ],
    correctIndex: 1,
    explanation: 'Transaction 1: Buy @ 1, Sell @ 8 -> Profit = 8 - 1 - 2 = 5. Transaction 2: Buy @ 4, Sell @ 9 -> Profit = 9 - 4 - 2 = 3. Total profit = 8.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-19',
    question: 'In TSP on 4 cities, if city 0 is the starting base, how many non-trivial masks need to be computed?',
    options: [
      '4',
      '2^4 = 16 masks (from 0001 to 1111)',
      '4! = 24',
      '8'
    ],
    correctIndex: 1,
    explanation: 'With 4 cities, the subset of visited cities is represented by 4 bits, giving 2^4 = 16 distinct mask configurations.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-20',
    question: 'In LeetCode 312 "Burst Balloons" with nums = [1, 5], what is the maximum coins collected?',
    options: [
      '5',
      '10 (burst 1 first: 1*1*5 = 5; then burst 5: 1*5*1 = 5; total = 5 + 5 = 10)',
      '15',
      '6'
    ],
    correctIndex: 1,
    explanation: 'Bursting 1 first yields 1 * 1 * 5 = 5 coins. Bursting 5 last yields 1 * 5 * 1 = 5 coins. Total = 10 coins. (Bursting 5 first would yield 1*5*1 = 5, then 1*1*1 = 1, total 6).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-21',
    question: 'In LeetCode 834 "Sum of Distances in Tree" for a simple star graph of N = 4 nodes with edges (0-1, 0-2, 0-3), what is ans[0] (center node 0)?',
    options: [
      '0',
      '3 (distances to 1, 2, 3 are all 1: 1 + 1 + 1 = 3)',
      '4',
      '6'
    ],
    correctIndex: 1,
    explanation: 'From central node 0, nodes 1, 2, and 3 are each at distance 1. Total distance sum ans[0] = 1 + 1 + 1 = 3.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-22',
    question: 'Continuing from the previous question, what is ans[1] for leaf node 1 in that star graph with N = 4 and ans[0] = 3?',
    options: [
      'ans[1] = ans[0] - count[1] + (N - count[1]) = 3 - 1 + (4 - 1) = 3 - 1 + 3 = 5',
      '3',
      '1',
      '7'
    ],
    correctIndex: 0,
    explanation: 'Re-rooting formula: moving from 0 to 1 brings node 1 one step closer (-count[1] = -1) and pushes the other 3 nodes one step further (+ (N - count[1]) = +3). ans[1] = 3 - 1 + 3 = 5 (distances: 0 is 1, 2 is 2, 3 is 2; 1+2+2=5).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-23',
    question: 'In LeetCode 1425 "Constrained Subsequence Sum" with nums = [-1, -2, -3] and k = 1, what is the output?',
    options: [
      '0',
      '-1 (subsequence cannot be empty; the maximum single element is -1)',
      '-6',
      '-3'
    ],
    correctIndex: 1,
    explanation: 'The problem requires a non-empty subsequence. When all numbers are negative, the optimal choice is the single least negative element, which is -1.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-24',
    question: 'In LeetCode 1000 "Minimum Cost to Merge Stones" with stones = [3, 5, 1, 2, 6] and K = 3, what is the minimum cost to merge into 1 pile?',
    options: [
      '-1',
      '25 (Merge [5, 1, 2] -> 8 with cost 8; array becomes [3, 8, 6]; merge [3, 8, 6] -> 17 with cost 17; total = 8 + 17 = 25)',
      '30',
      '17'
    ],
    correctIndex: 1,
    explanation: '(5 - 1) % (3 - 1) = 4 % 2 = 0 (valid). Step 1: merge [5, 1, 2] into pile 8 (cost 8). Array is [3, 8, 6]. Step 2: merge [3, 8, 6] into 17 (cost 17). Total cost = 8 + 17 = 25.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-25',
    question: 'In LeetCode 698 "Partition to K Equal Sum Subsets", if nums = [1, 2, 3, 4] and k = 3, what is the output?',
    options: [
      'true',
      'false (total sum = 10, which is not divisible by 3: 10 % 3 = 1 != 0)',
      'null',
      '3'
    ],
    correctIndex: 1,
    explanation: 'For an array to be partitioned into K equal sum subsets, totalSum % K must equal 0. Here 10 % 3 != 0, making equal partition impossible.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-26',
    question: 'In LeetCode 600 "Non-negative Integers without Consecutive Ones", what is the value for N = 1?',
    options: [
      '1',
      '2 (numbers 0 [0] and 1 [1] are both valid)',
      '3',
      '0'
    ],
    correctIndex: 1,
    explanation: 'The numbers in range [0, 1] are 0 and 1. Neither has consecutive ones in binary representation. Total count is 2.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-27',
    question: 'In LeetCode 124 "Binary Tree Maximum Path Sum", what is the maximum path sum for a single node tree root = [-3]?',
    options: [
      '0',
      '-3 (non-empty path must contain at least one node)',
      '3',
      'null'
    ],
    correctIndex: 1,
    explanation: 'The problem specifies a non-empty path. If all node values are negative, the maximum path sum is the value of the single least negative node, here -3.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-28',
    question: 'In LeetCode 188 "Stock IV", if prices = [2, 4, 1] and k = 2, what is the maximum profit?',
    options: [
      '0',
      '2 (buy at 2, sell at 4)',
      '3',
      '1'
    ],
    correctIndex: 1,
    explanation: 'Buy on day 1 at 2, sell on day 2 at 4 for profit of 2. Buying on day 3 gives no opportunity to sell. Max profit = 2.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-29',
    question: 'In LeetCode 72 "Edit Distance", what is the edit distance between an empty string "" and a string of length N?',
    options: [
      '0',
      'N (requires inserting all N characters)',
      '1',
      '-1'
    ],
    correctIndex: 1,
    explanation: 'To convert an empty string into a string of length N requires exactly N character insertions. Hence dp[0][N] = N.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-30',
    question: 'In LeetCode 300 "Longest Increasing Subsequence" for nums = [10, 9, 2, 5, 3, 7, 101, 18], what is the length of the LIS?',
    options: [
      '3',
      '4 (subsequence [2, 3, 7, 101] or [2, 3, 7, 18])',
      '5',
      '6'
    ],
    correctIndex: 1,
    explanation: 'One longest strictly increasing subsequence is [2, 3, 7, 101] (or [2, 5, 7, 18]), both having length 4.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-31',
    question: 'In LeetCode 322 "Coin Change", what should be returned if amount = 3 and coins = [2]?',
    options: [
      '0',
      '-1 (impossible to form amount 3 using only denomination 2)',
      '1',
      '3'
    ],
    correctIndex: 1,
    explanation: 'Multiples of 2 are {0, 2, 4, 6...}. Amount 3 cannot be formed. By problem contract, return -1.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-32',
    question: 'In LeetCode 416 "Partition Equal Subset Sum" with nums = [1, 5, 11, 5], can it be partitioned into two equal subsets?',
    options: [
      'false',
      'true (total sum = 22, target = 11; subset [1, 5, 5] sums to 11, and [11] sums to 11)',
      'null',
      'Error'
    ],
    correctIndex: 1,
    explanation: 'The sum is 22. Target is 11. Subsets {11} and {1, 5, 5} both sum to 11. Return true.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-33',
    question: 'In LeetCode 139 "Word Break", if s = "catsandog" and wordDict = ["cats", "dog", "sand", "and", "cat"], what is the result?',
    options: [
      'true',
      'false (no partition covers the full string: "cat" + "sand" leaves "og"; "cats" + "and" leaves "og")',
      'null',
      'Error'
    ],
    correctIndex: 1,
    explanation: 'Both valid prefix paths leave the suffix "og", which is not present in the dictionary. The string cannot be broken; returns false.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-34',
    question: 'In LeetCode 91 "Decode Ways", what is the number of decodings for s = "226"?',
    options: [
      '2',
      '3 ("BZ" [2, 26], "VF" [22, 6], "BBF" [2, 2, 6])',
      '4',
      '1'
    ],
    correctIndex: 1,
    explanation: 'Decodings: (2, 2, 6) -> "BBF", (2, 26) -> "BZ", (22, 6) -> "VF". Total valid decodings = 3.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-35',
    question: 'In LeetCode 198 "House Robber", if nums = [1, 2, 3, 1], what is the maximum loot?',
    options: [
      '3',
      '4 (rob house 0 [1] and house 2 [3]: 1 + 3 = 4)',
      '5',
      '2'
    ],
    correctIndex: 1,
    explanation: 'House 0 (1) + House 2 (3) = 4. Robbing House 1 (2) + House 3 (1) = 3. Max is 4.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-36',
    question: 'In LeetCode 213 "House Robber II" with nums = [2, 3, 2], what is the maximum loot in a circular arrangement?',
    options: [
      '4',
      '3 (cannot rob first and last house 2 together; robbing middle house 3 yields 3)',
      '2',
      '5'
    ],
    correctIndex: 1,
    explanation: 'Houses 0 and 2 are adjacent in a circle. Robbing house 0 (2) prevents house 2. Robbing house 1 (3) prevents houses 0 and 2. Maximum is 3.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-37',
    question: 'In LeetCode 337 "House Robber III" on a binary tree with root = [3, 2, 3, null, 3, null, 1], what is the maximum loot?',
    options: [
      '6',
      '7 (rob root [3] + grandchildren [3, 1]: 3 + 3 + 1 = 7)',
      '8',
      '9'
    ],
    correctIndex: 1,
    explanation: 'If root 3 is robbed, children (2, 3) cannot be robbed, but grandchildren (3, 1) can: 3 + 3 + 1 = 7. If root is skipped, children give 2 + 3 = 5. Max is 7.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-38',
    question: 'In LeetCode 1143 "Longest Common Subsequence" for s1 = "abc" and s2 = "def", what is the length of the LCS?',
    options: [
      '1',
      '0 (no common characters)',
      '-1',
      'null'
    ],
    correctIndex: 1,
    explanation: 'The two strings have disjoint character sets. There are no common subsequences; length is 0.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-39',
    question: 'In LeetCode 518 "Coin Change II" with amount = 5 and coins = [1, 2, 5], how many distinct combinations exist?',
    options: [
      '3',
      '4 (5; 2+2+1; 2+1+1+1; 1+1+1+1+1)',
      '5',
      '9'
    ],
    correctIndex: 1,
    explanation: 'Combinations: [5], [2, 2, 1], [2, 1, 1, 1], [1, 1, 1, 1, 1]. Total distinct combinations = 4.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-40',
    question: 'In LeetCode 377 "Combination Sum IV" with nums = [1, 2, 3] and target = 4, how many ordered permutations sum to target?',
    options: [
      '4',
      '7 ((1,1,1,1), (1,1,2), (1,2,1), (2,1,1), (1,3), (3,1), (2,2))',
      '6',
      '8'
    ],
    correctIndex: 1,
    explanation: 'Unlike Coin Change II, Combination Sum IV counts permutations (order matters). The 7 valid sequences are: (1,1,1,1), (1,1,2), (1,2,1), (2,1,1), (1,3), (3,1), (2,2).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-41',
    question: 'In LeetCode 96 "Unique Binary Search Trees", how many unique BSTs can be formed with n = 3 keys?',
    options: [
      '3',
      '5 (Catalan number C(3) = 5)',
      '6',
      '4'
    ],
    correctIndex: 1,
    explanation: 'C(3) = (2*3)! / (4! * 3!) = 720 / (24 * 6) = 720 / 144 = 5 unique structural BST configurations.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-42',
    question: 'In LeetCode 174 "Dungeon Game", what is the minimum initial health required if the princess room at [0][0] has value -5?',
    options: [
      '5',
      '6 (knight needs 6 HP so that after losing 5 HP, health remains at least 1)',
      '1',
      '-5'
    ],
    correctIndex: 1,
    explanation: 'The knight must maintain health >= 1 at all times. To survive a -5 cell, the knight must enter with at least 1 - (-5) = 6 HP.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-43',
    question: 'In LeetCode 329 "Longest Increasing Path in a Matrix" for grid: [[9,9,4],[6,6,8],[2,1,1]], what is the length of the longest increasing path?',
    options: [
      '3',
      '4 (path: 1 -> 2 -> 6 -> 9)',
      '5',
      '6'
    ],
    correctIndex: 1,
    explanation: 'The path 1 -> 2 -> 6 -> 9 has length 4. No longer strictly increasing path exists.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-44',
    question: 'In LeetCode 368 "Largest Divisible Subset" with nums = [1, 2, 4, 8], what is the maximum subset size?',
    options: [
      '3',
      '4 ([1, 2, 4, 8], since every pair satisfies a % b == 0 or b % a == 0)',
      '2',
      '1'
    ],
    correctIndex: 1,
    explanation: 'Sorting the numbers: 2 % 1 = 0, 4 % 2 = 0, 8 % 4 = 0. All 4 elements satisfy mutual divisibility. Size is 4.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-45',
    question: 'In LeetCode 474 "Ones and Zeroes", what type of DP problem is it?',
    options: [
      '1D Fibonacci sequence',
      '2D 0/1 Knapsack with two simultaneous capacity constraints (max m zeros and max n ones)',
      'Interval DP',
      'Bitmask TSP'
    ],
    correctIndex: 1,
    explanation: 'Each string consumes a certain number of zeros and ones. We must maximize total strings chosen subject to remaining zeros <= m and ones <= n, which is 2D bounded Knapsack.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-46',
    question: 'In LeetCode 494 "Target Sum" where each number in nums can be assigned \'+\' or \'-\' to reach target S, how is this transformed into a standard Subset Sum problem?',
    options: [
      'Multiply all numbers by S',
      'Let P be the subset with \'+\' and N be the subset with \'-\'. P - N = S and P + N = sum. Adding gives 2*P = sum + S -> P = (sum + S) / 2. Find a subset summing to P',
      'Run Dijkstra',
      'Take the square root of all elements'
    ],
    correctIndex: 1,
    explanation: 'Algebraic decomposition: sum(P) - sum(N) = target and sum(P) + sum(N) = totalSum. Adding equations yields sum(P) = (totalSum + target) / 2, reducing it to classic 0/1 Knapsack.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-47',
    question: 'In LeetCode 516 "Longest Palindromic Subsequence" of string s, how can it be solved using Longest Common Subsequence (LCS)?',
    options: [
      'Compute LCS between string s and its REVERSE rev(s)',
      'Sort string s and compute LCS with s',
      'LPS cannot be solved with LCS',
      'Double the string s'
    ],
    correctIndex: 0,
    explanation: 'A palindrome reads the same forwards and backwards. The longest palindromic subsequence of s is mathematically equivalent to the LCS of s and reverse(s).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-48',
    question: 'In LeetCode 647 "Palindromic Substrings" (counting total palindromic substrings in s of length N), what is the optimal time and space complexity without Manacher\'s algorithm?',
    options: [
      'O(N^3) time and O(N) space',
      'O(N^2) time and O(1) auxiliary space by expanding around the 2*N - 1 possible centers (single characters and adjacent character pairs)',
      'O(N!) time',
      'O(log N) time'
    ],
    correctIndex: 1,
    explanation: 'There are N odd centers and N-1 even centers. Expanding outward from each center until characters differ checks all palindromes in O(N^2) time and O(1) extra space.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-49',
    question: 'In LeetCode 877 "Stone Game" with an even number of piles where total stones is odd, why does the first player ALWAYS win?',
    options: [
      'Because stones are negative',
      'The first player can choose to take all odd-indexed piles or all even-indexed piles on every turn. Since the total sum is odd, one of the two index sets strictly has a larger sum, guaranteeing the first player can force a win',
      'The second player is not allowed to pick',
      'The game ends in a tie'
    ],
    correctIndex: 1,
    explanation: 'Player 1 can calculate the sum of odd piles vs even piles. If odd piles have more stones, Player 1 picks pile 0, forcing Player 2 to expose an odd pile, allowing Player 1 to capture all odd piles.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd12-post-50',
    question: 'Why is mastering Advanced Dynamic Programming and State-Space Optimization considered the single highest differentiator in FAANG senior technical placement interviews?',
    options: [
      'Because DP questions test whether a candidate can formalize abstract state boundaries, discover optimal substructure, eliminate redundant exponential branches, and articulate asymptotic memory trade-offs under high-pressure live coding',
      'Because DP is the only topic asked at FAANG',
      'Because DP requires memorizing 500 lines of code',
      'Because DP replaces all operating systems'
    ],
    correctIndex: 0,
    explanation: 'DP evaluates engineering maturity: decomposing a complex ambiguous system into formal discrete states, deriving mathematical transitions, identifying invariants, and systematically optimizing time and memory.',
    category: 'Practical Execution & Trace (70%)'
  }
];

const fileContent = `import { AssessmentQuestion } from '../types';

/**
 * Day 12 Comprehensive Assessment Suite (100 Placement-Grade MCQs)
 * 50 Pre-Assessment MCQs + 50 Post-Assessment MCQs
 * Module 13: Hard Dynamic Programming & State-Space Optimization
 * Mentor: Kapil (Placement Readiness Program)
 *
 * Strict Category Split:
 * Questions 1-15: 'Theory (30%)'
 * Questions 16-50: 'Practical Execution & Trace (70%)'
 */

export const DAY_12_PRE_ASSESSMENT_50: AssessmentQuestion[] = ${JSON.stringify(preAssessment, null, 2)};

export const DAY_12_POST_ASSESSMENT_50: AssessmentQuestion[] = ${JSON.stringify(postAssessment, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/day12Assessments50.ts'), fileContent, 'utf8');
console.log('Successfully wrote src/data/day12Assessments50.ts');
