import { AssessmentQuestion } from '../types';

/**
 * Day 13 Comprehensive Assessment Suite (100 Placement-Grade MCQs)
 * 50 Pre-Assessment MCQs + 50 Post-Assessment MCQs
 * Module 14: Advanced Range Query Data Structures & String Algorithms
 * Mentor: Kapil (Placement Readiness Program)
 *
 * Strict Category Split:
 * Questions 1-15: 'Theory (30%)'
 * Questions 16-50: 'Practical Execution & Trace (70%)'
 */

export const DAY_13_PRE_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d13-pre-1",
    "question": "Why does a standard array-backed Segment Tree for an input of size N require allocating an array of size up to 4N?",
    "options": [
      "Because each node has 4 child pointers",
      "The tree is a complete binary tree where the number of leaves is rounded up to the next power of 2 (2^{\\lceil \\log_2 N \\rceil}), and the total nodes in a full binary tree with 2^k leaves is 2^{k+1} - 1 < 4N",
      "To prevent memory fragmentation in C runtime",
      "Because 4 is the cache line width on x86 CPUs"
    ],
    "correctIndex": 1,
    "explanation": "If N is 2^k + 1, the leaves must be padded to the next power of 2, which is 2^{k+1}. The total internal and leaf nodes in a binary tree with 2^{k+1} leaves is 2 * 2^{k+1} - 1 = 4 * 2^k - 1 < 4N.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-2",
    "question": "In a Segment Tree with Lazy Propagation, what is the core mechanism that prevents range updates from degrading to O(N log N)?",
    "options": [
      "It cancels all odd-indexed updates",
      "When an update interval completely encloses the interval of a tree node, the aggregated value is updated immediately and a lazy tag is stored; the update is NOT propagated to child subtrees until a future query or update strictly requires descending into them",
      "It converts range updates into point updates",
      "It stores the array in a hash map"
    ],
    "correctIndex": 1,
    "explanation": "Lazy propagation defers updates. Visiting only canonical covering segments bounds the work to O(log N) per range update.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-3",
    "question": "In a Fenwick Tree (Binary Indexed Tree / BIT), what does the bitwise expression `i & (-i)` compute for an integer index `i`?",
    "options": [
      "The highest set bit of i",
      "The least significant set bit (LSB) of i (i.e. the largest power of 2 that divides i)",
      "The bitwise inverse of i",
      "The count of set bits in i"
    ],
    "correctIndex": 1,
    "explanation": "In two's complement arithmetic, `-i = ~i + 1`. Bitwise ANDing `i & (-i)` isolates the lowest 1-bit, determining the interval length `[i - (i & -i) + 1, i]` covered by `bit[i]`.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-4",
    "question": "Why can a Sparse Table answer Range Minimum Queries (RMQ) in O(1) time, but CANNOT answer Range Sum Queries in O(1) time?",
    "options": [
      "Sparse Table cannot store 64-bit integers",
      "Minimum is an IDEMPOTENT operation (min(x, x) = x), allowing two overlapping intervals [L, L + 2^k - 1] and [R - 2^k + 1, R] to cover [L, R] without duplicating values. Addition is NOT idempotent, so overlapping elements would be counted twice",
      "Addition requires division",
      "Sparse table only works on negative numbers"
    ],
    "correctIndex": 1,
    "explanation": "Idempotency (f(x, x) = x) allows arbitrary overlapping coverage. Summation is strictly additive, so overlapping blocks count middle elements twice unless split into disjoint powers of 2 (which takes O(log N)).",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-5",
    "question": "What is the definition of the KMP Prefix Function $\\pi[i]$ for a string s of length N?",
    "options": [
      "The index of the first character mismatch",
      "The length of the longest proper prefix of s[0..i] that is also a suffix of s[0..i]",
      "The total number of vowels in substring s[0..i]",
      "The hash code of s[0..i]"
    ],
    "correctIndex": 1,
    "explanation": "$\\pi[i]$ represents the length of the longest proper prefix of s[0..i] (strictly shorter than the string itself) that matches a suffix ending at index i.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-6",
    "question": "In a Bitwise Trie of depth 31 used for Maximum XOR Pair queries, how does the query algorithm choose its branch at bit position `b`?",
    "options": [
      "It always chooses bit 0 to keep values small",
      "It greedily attempts to follow the branch with bit `1 - currentBit`; if that branch exists, it traverses it and sets bit `b` of the result to 1. Otherwise, it must follow `currentBit`",
      "It traverses both branches and takes the average",
      "It randomly selects a branch"
    ],
    "correctIndex": 1,
    "explanation": "To maximize the XOR result, bit `b` should be 1 if possible. Since `bit ^ want = 1` when `want = 1 - bit`, the algorithm greedily branches to `1 - bit`.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-7",
    "question": "What is the preprocessing time and space complexity to construct a Sparse Table for an array of size N?",
    "options": [
      "O(N) time and O(N) space",
      "O(N log N) time and O(N log N) space",
      "O(N^2) time and O(N) space",
      "O(log N) time and O(1) space"
    ],
    "correctIndex": 1,
    "explanation": "The Sparse Table has $\\lfloor \\log_2 N \\rfloor + 1$ levels, and each level stores N values. Precomputing level $k$ from level $k-1$ takes $O(N)$, giving $O(N \\log N)$ total time and space.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-8",
    "question": "In LeetCode 315 \"Count of Smaller Numbers After Self\", why must we traverse the array from RIGHT to LEFT when using a Fenwick Tree?",
    "options": [
      "To reverse the signs of numbers",
      "By processing elements from right to left, the Fenwick tree contains ONLY elements that appear strictly to the right of the current element, allowing an instant prefix count query `query(val - 1)` before inserting the current element",
      "Because Fenwick Trees only support reverse order",
      "To prevent integer overflow"
    ],
    "correctIndex": 1,
    "explanation": "Traversing right-to-left ensures that any element currently recorded in the Fenwick Tree was positioned to the right of the current element in the original array.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-9",
    "question": "Why does KMP achieve strictly linear O(N + M) search time without backtracking the text index `i`?",
    "options": [
      "It deletes mismatched characters from memory",
      "The precomputed $\\pi$ array specifies the exact longest prefix that is already matched upon mismatch at `pat[j]`, shifting the pattern forward by setting `j = \\pi[j - 1]` while advancing `i` monotonically forward",
      "It converts both strings to integer hash sets",
      "It uses parallel SIMD vectorization"
    ],
    "correctIndex": 1,
    "explanation": "The text pointer `i` never decreases. When a mismatch occurs, the pattern pointer `j` jumps to $\\pi[j-1]$, skipping redundant checks while preserving linear progress.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-10",
    "question": "What is the mathematical condition for a string s of length N to be periodic (i.e. composed of repeated copies of a shorter substring) using KMP prefix function $\\pi$?",
    "options": [
      "$\\pi[N - 1] == 0$",
      "$\\pi[N - 1] > 0$ and $N \\pmod{N - \\pi[N - 1]} == 0$, where $N - \\pi[N - 1]$ is the length of the smallest repeating period",
      "$\\pi[N - 1] == N / 2$",
      "$\\pi[i] == i$ for all i"
    ],
    "correctIndex": 1,
    "explanation": "If the period length $L = N - \\pi[N - 1]$ divides $N$ evenly, the prefix of length $\\pi[N - 1]$ and suffix of length $\\pi[N - 1]$ overlap identically, proving $s$ is formed by repeating the prefix of length $L$.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-11",
    "question": "How is the Maximum XOR Subarray problem reduced to the Maximum XOR Pair problem?",
    "options": [
      "By sorting the array in descending order",
      "Since $XOR(L..R) = prefixXOR[R] \\oplus prefixXOR[L - 1]$, any contiguous subarray XOR is the XOR of two prefix XOR values. Inserting prefix XORs into a Bitwise Trie finds the maximum subarray XOR in $O(32 \\cdot N)$",
      "By taking the product of all elements",
      "By running Floyd-Warshall"
    ],
    "correctIndex": 1,
    "explanation": "Prefix XORs satisfy the cancellation property: $prefix[R] \\oplus prefix[L-1]$ equals the XOR sum of elements from $L$ to $R$. Maximizing this over all pairs yields the maximum subarray XOR.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-12",
    "question": "In Rabin-Karp string matching, what is a \"Spurious Hit\"?",
    "options": [
      "A hardware cache fault during string traversal",
      "When the hash value of the current text window matches the hash value of the pattern, but an explicit character-by-character check reveals that the strings are actually different (a hash collision)",
      "When the pattern contains invalid Unicode characters",
      "When the string is empty"
    ],
    "correctIndex": 1,
    "explanation": "Hash collisions occur when distinct strings produce the same hash modulo $M$. A spurious hit occurs when hashes match but the underlying strings do not.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-13",
    "question": "In Fenwick Tree, why is the array traditionally 1-indexed rather than 0-indexed?",
    "options": [
      "Because index 0 causes an infinite loop: `0 & (-0) = 0`, so `idx += idx & (-idx)` would never increment index 0",
      "Because C does not support index 0",
      "To save 1 byte of memory",
      "It is an arbitrary compiler preference"
    ],
    "correctIndex": 0,
    "explanation": "`0 & (-0)` evaluates to `0`. If a 0-indexed Fenwick tree attempted to add LSB at index 0, it would get stuck adding 0 indefinitely. 1-indexing guarantees LSB is at least 1.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-14",
    "question": "What is Coordinate Compression and why is it used before inserting values into a Fenwick or Segment Tree?",
    "options": [
      "Compressing images to JPEG format",
      "Mapping large or sparse values (e.g. $-10^9 \\le x \\le 10^9$) to their rank order $[1..M]$ (where $M \\le N$) by sorting and removing duplicates, allowing an array-based Fenwick Tree of size $O(N)$ instead of $O(10^9)$",
      "Converting decimal floats to integers",
      "Splitting coordinates into longitude and latitude"
    ],
    "correctIndex": 1,
    "explanation": "When values range up to $10^9$, allocating an array of that size causes Out-Of-Memory. Sorting and ranking unique values compresses coordinates to $[1..N]$, keeping memory bounded by $O(N)$.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-15",
    "question": "In the Aho-Corasick algorithm, what is a \"Failure Link\" (or suffix link)?",
    "options": [
      "A broken TCP socket link",
      "A pointer from a Trie node representing string $u$ to the node representing the longest proper suffix of $u$ that exists in the Trie, functioning identically to KMP prefix values across multiple dictionary patterns",
      "A pointer to the parent node",
      "A link that terminates program execution on invalid inputs"
    ],
    "correctIndex": 1,
    "explanation": "Aho-Corasick generalizes KMP to a dictionary Trie. Failure links connect a node to the node representing its longest proper suffix, allowing instant fallback on mismatch in multi-pattern matching.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-pre-16",
    "question": "What is the KMP prefix function array $\\pi$ for the string s = \"aabaaab\"?",
    "options": [
      "[0, 1, 0, 1, 2, 2, 3]",
      "[0, 1, 0, 1, 2, 3, 4]",
      "[0, 0, 1, 2, 3, 4, 5]",
      "[0, 1, 2, 0, 1, 2, 3]"
    ],
    "correctIndex": 0,
    "explanation": "Tracing: s[0]='a':0; s[1]='a':1 (\"a\"); s[2]='b':0; s[3]='a':1 (\"a\"); s[4]='a':2 (\"aa\"); s[5]='a':2 (\"aa\", s[5] matches s[2]? 'a'!='b', fallback to pi[1]='a'); s[6]='b':3 (\"aab\"). Result: [0, 1, 0, 1, 2, 2, 3].",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-17",
    "question": "Trace Fenwick tree `add(3, 5)` on an array of size 8. Which indices in the `bit` array will be updated?",
    "options": [
      "Index 3 only",
      "Indices 3, 4, 8 (3 + LSB(3)=4; 4 + LSB(4)=8)",
      "Indices 3, 5, 7",
      "Indices 1, 2, 3"
    ],
    "correctIndex": 1,
    "explanation": "3 is binary 0011 (LSB=1) -> 3 + 1 = 4. 4 is binary 0100 (LSB=4) -> 4 + 4 = 8. 8 is binary 1000 (LSB=8) -> 8 + 8 = 16 > 8 (stops). Updated indices: 3, 4, 8.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-18",
    "question": "Trace Fenwick tree `query(7)`. Which indices in the `bit` array are summed?",
    "options": [
      "Indices 7, 6, 4 (7 - LSB(7)=6; 6 - LSB(6)=4; 4 - LSB(4)=0)",
      "Indices 7, 6, 5, 4, 3, 2, 1",
      "Index 7 only",
      "Indices 7, 5, 3, 1"
    ],
    "correctIndex": 0,
    "explanation": "7 is binary 0111 (LSB=1) -> 7 - 1 = 6. 6 is binary 0110 (LSB=2) -> 6 - 2 = 4. 4 is binary 0100 (LSB=4) -> 4 - 4 = 0. The sum accumulates bit[7] + bit[6] + bit[4].",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-19",
    "question": "Given an array arr = [7, 2, 3, 0, 5, 10, 3, 12] of length 8. For a Sparse Table query RMQ(2, 6) (elements [3, 0, 5, 10, 3]), what is k = floor(log2(len)) and the query formula?",
    "options": [
      "len = 5, k = 2; return min(st[2][2], st[2][6 - 4 + 1]) = min(st[2][2], st[2][3]) = min(0, 0) = 0",
      "len = 5, k = 1; return min(st[1][2], st[1][5])",
      "k = 3",
      "k = 0"
    ],
    "correctIndex": 0,
    "explanation": "Interval length is 6 - 2 + 1 = 5. k = floor(log2(5)) = 2 (span 2^2 = 4). Interval 1 is [2, 5], interval 2 is [3, 6]. min(st[2][2], st[2][3]) covers [2, 6] in O(1) and evaluates to 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-20",
    "question": "In LeetCode 421 \"Maximum XOR of Two Numbers\" with nums = [3, 10, 5, 25, 2, 8], what is the maximum XOR pair value?",
    "options": [
      "25",
      "28 (5 ^ 25 = 00101 ^ 11001 = 11100 in binary = 28)",
      "30",
      "15"
    ],
    "correctIndex": 1,
    "explanation": "Binary: 5 is 00101, 25 is 11001. Their bitwise XOR is 11100 = 16 + 8 + 4 = 28. No other pair exceeds 28.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-21",
    "question": "In LeetCode 214 \"Shortest Palindrome\" for string s = \"aacecaaa\", what is the output?",
    "options": [
      "aaacecaaa (prepend \"aa\" to form a palindrome with minimum additions)",
      "aaacecaaa",
      "aacecaa",
      "None"
    ],
    "correctIndex": 0,
    "explanation": "The longest palindromic prefix is \"aacecaa\" (length 7). The remaining suffix is \"a\". Reversing and prepending gives \"a\" + \"aacecaaa\" = \"aaacecaaa\".",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-22",
    "question": "In LeetCode 307 \"Range Sum Query - Mutable\" with nums = [1, 3, 5], if we execute `sumRange(0, 2)`, then `update(1, 2)` (setting nums[1] = 2), then `sumRange(0, 2)`, what are the two query outputs?",
    "options": [
      "9 and 8 (1+3+5=9; then 1+2+5=8)",
      "9 and 11",
      "8 and 8",
      "6 and 8"
    ],
    "correctIndex": 0,
    "explanation": "Initial sum [0..2] is 1 + 3 + 5 = 9. Replacing nums[1] with 2 modifies the array to [1, 2, 5]. Second sum [0..2] is 1 + 2 + 5 = 8.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-23",
    "question": "In LeetCode 315 \"Count of Smaller Numbers After Self\" for nums = [5, 2, 6, 1], what is the result array?",
    "options": [
      "[2, 1, 1, 0]",
      "[1, 1, 1, 0]",
      "[2, 2, 1, 0]",
      "[0, 0, 0, 0]"
    ],
    "correctIndex": 0,
    "explanation": "Elements smaller than 5 to its right are {2, 1} (count 2). Smaller than 2 is {1} (count 1). Smaller than 6 is {1} (count 1). Smaller than 1 is none (count 0). Result: [2, 1, 1, 0].",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-24",
    "question": "In LeetCode 1392 \"Longest Happy Prefix\" for string s = \"ababab\", what is the longest happy prefix?",
    "options": [
      "\"ab\"",
      "\"abab\" (length 4, both prefix and suffix of \"ababab\")",
      "\"ababab\"",
      "\"\""
    ],
    "correctIndex": 1,
    "explanation": "A proper prefix cannot be the entire string. Prefixes that are also suffixes: \"ab\" (len 2) and \"abab\" (len 4). The longest is \"abab\".",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-25",
    "question": "In a Segment Tree with Lazy Propagation over array of size 4 initially all 0s, we perform `updateRange(0, 2, 5)`. What will `queryRange(1, 3)` return?",
    "options": [
      "15",
      "10 (indices 1 and 2 each have value 5, index 3 has value 0: 5 + 5 + 0 = 10)",
      "5",
      "20"
    ],
    "correctIndex": 1,
    "explanation": "Indices [0, 1, 2] are updated by +5, resulting in [5, 5, 5, 0]. Query on [1, 3] sums nums[1] + nums[2] + nums[3] = 5 + 5 + 0 = 10.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-26",
    "question": "In Maximum XOR Subarray for nums = [1, 2, 3, 4], what is the maximum XOR subarray sum?",
    "options": [
      "4",
      "7 (subarray [3, 4] gives 3 ^ 4 = 011 ^ 100 = 111 = 7)",
      "6",
      "5"
    ],
    "correctIndex": 1,
    "explanation": "Subarrays: [1]=1, [2]=2, [3]=3, [4]=4, [1,2]=3, [2,3]=1, [3,4]=7, [1,2,3]=0, [2,3,4]=5, [1,2,3,4]=4. Maximum is 7.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-27",
    "question": "In the KMP algorithm, what happens when a character match occurs (`txt[i] == pat[j]`)?",
    "options": [
      "Only i is incremented",
      "Both i and j are incremented: `i++` and `j++`",
      "Only j is incremented",
      "j is reset to 0"
    ],
    "correctIndex": 1,
    "explanation": "When characters match, both text and pattern pointers advance simultaneously to inspect the next characters.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-28",
    "question": "Given string s = \"AAAA\", what is the KMP prefix function array $\\pi$?",
    "options": [
      "[0, 1, 2, 3]",
      "[0, 0, 0, 0]",
      "[1, 2, 3, 4]",
      "[0, 1, 0, 1]"
    ],
    "correctIndex": 0,
    "explanation": "At index 0: 0. Index 1: \"A\" matches prefix \"A\" (len 1). Index 2: \"AA\" matches (len 2). Index 3: \"AAA\" matches (len 3). Array is [0, 1, 2, 3].",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-29",
    "question": "In LeetCode 1032 \"Stream of Characters\" with words = [\"cd\", \"f\", \"kl\"], if characters 'a', 'b', 'c', 'd' arrive sequentially, on which character does the query first return `true`?",
    "options": [
      "'a'",
      "'c'",
      "'d' (stream suffix \"cd\" matches word \"cd\")",
      "'b'"
    ],
    "correctIndex": 2,
    "explanation": "At 'a': \"a\" (false). At 'b': \"ab\" (false). At 'c': \"abc\" (false). At 'd': \"abcd\" has suffix \"cd\" which is in the dictionary -> true.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-30",
    "question": "What is the value of `12 & (-12)` in binary?",
    "options": [
      "1",
      "2",
      "4 (12 is 1100 in binary; lowest set bit is 4)",
      "8"
    ],
    "correctIndex": 2,
    "explanation": "12 in binary is 01100. In two's complement, -12 is 10100. 01100 & 10100 = 00100 = 4.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-31",
    "question": "In a Segment Tree storing range minimums, what is returned for an out-of-bounds disjoint interval query?",
    "options": [
      "0",
      "+INFINITY (so that min(valid_val, infinity) = valid_val)",
      "-INFINITY",
      "-1"
    ],
    "correctIndex": 1,
    "explanation": "The neutral identity element for the `min` operation is positive infinity ($+\\infty$), ensuring it has no effect when combined with actual minimum values.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-32",
    "question": "In a Segment Tree storing range sums, what is the neutral identity element returned for disjoint intervals?",
    "options": [
      "0 (since sum + 0 = sum)",
      "1",
      "+INFINITY",
      "-1"
    ],
    "correctIndex": 0,
    "explanation": "The neutral identity element for addition is 0, ensuring that disjoint intervals contribute nothing to the total range sum.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-33",
    "question": "In a Segment Tree storing range GCD (Greatest Common Divisor), what is the neutral identity element returned for disjoint intervals?",
    "options": [
      "1",
      "0 (since gcd(x, 0) = x for all integers x)",
      "+INFINITY",
      "-1"
    ],
    "correctIndex": 1,
    "explanation": "In mathematics and number theory, $\\gcd(x, 0) = |x|$. Thus, 0 is the neutral identity element for range GCD queries.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-34",
    "question": "In LeetCode 28 \"Find the Index of the First Occurrence in a String\" with haystack = \"sadbutsad\" and needle = \"sad\", what index is returned?",
    "options": [
      "0",
      "6",
      "-1",
      "3"
    ],
    "correctIndex": 0,
    "explanation": "\"sad\" appears at index 0 and index 6. The problem requires the FIRST occurrence, which is index 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-35",
    "question": "What is the output of the KMP prefix function on string s = \"ABACABA\"?",
    "options": [
      "[0, 0, 1, 0, 1, 2, 3]",
      "[0, 1, 0, 1, 2, 3, 4]",
      "[0, 0, 0, 1, 2, 3, 4]",
      "[0, 0, 1, 2, 1, 2, 3]"
    ],
    "correctIndex": 0,
    "explanation": "'A':0; 'B':0; 'A':1; 'C':0; 'A':1; 'B':2 (\"AB\"); 'A':3 (\"ABA\"). Result is [0, 0, 1, 0, 1, 2, 3].",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-36",
    "question": "In a Fenwick tree of size 6, what is the value stored in `bit[6]`?",
    "options": [
      "arr[6] only",
      "arr[5] + arr[6] (since LSB(6) = 2, so it covers 2 elements: indices 5 and 6)",
      "arr[1] + ... + arr[6]",
      "arr[6] - arr[5]"
    ],
    "correctIndex": 1,
    "explanation": "6 is binary 0110. `LSB(6) = 6 & (-6) = 2`. Therefore, `bit[6]` stores the sum of the last 2 elements: `arr[5] + arr[6]`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-37",
    "question": "In a Fenwick tree, which indices store the prefix sum of ALL elements up to that index (i.e. power of 2 indices)?",
    "options": [
      "Odd indices",
      "Indices that are exact powers of 2 (e.g. 1, 2, 4, 8, 16), because their LSB equals their full value: `LSB(2^k) = 2^k`",
      "Prime indices",
      "Indices divisible by 3"
    ],
    "correctIndex": 1,
    "explanation": "For any power of 2, $i = 2^k$, its LSB is $2^k$. It covers the entire range $[1..2^k]$, storing the complete prefix sum directly in a single cell.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-38",
    "question": "In LeetCode 421, if nums contains only two elements: [14, 70], what is their XOR sum?",
    "options": [
      "56",
      "72",
      "76",
      "74"
    ],
    "correctIndex": 2,
    "explanation": "14 is binary 0001110. 70 is binary 1000110. 14 ^ 70 = 1001100 = 64 + 8 + 4 = 76.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-39",
    "question": "When implementing a Bitwise Trie, why do we start iterating bits from bit 30 or 31 down to 0 instead of 0 up to 30?",
    "options": [
      "To follow big-endian CPU order",
      "Most Significant Bits (MSBs) contribute exponentially greater value (2^30 >> 2^0); maximizing higher bits greedily guarantees a strictly larger total value than any combination of lower bits",
      "To prevent infinite loops",
      "Bitwise shift `>>` does not work in forward order"
    ],
    "correctIndex": 1,
    "explanation": "In binary arithmetic, $2^k > \\sum_{i=0}^{k-1} 2^i$. Securing a 1 at bit $k$ is strictly superior to setting all bits below $k$ to 1, requiring MSB-first greedy choices.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-40",
    "question": "In LeetCode 677 \"Map Sum Pairs\" supporting `insert(key, val)` and `sum(prefix)`, which data structure provides optimal prefix lookup?",
    "options": [
      "Standard Trie where each node maintains the cumulative sum of values of all keys passing through that node",
      "Segment Tree on sorted strings",
      "Binary Search Tree",
      "Min-Heap"
    ],
    "correctIndex": 0,
    "explanation": "By storing `node.sum` in each Trie node, querying `sum(prefix)` traverses to the end of the prefix in $O(L)$ time and returns `node.sum` in $O(1)$ without scanning all words.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-41",
    "question": "In a 2D Fenwick Tree of size R x C, what is the time complexity to update a cell and query a subgrid sum?",
    "options": [
      "O(R * C)",
      "O(log R * log C) for both point update and 2D prefix sum query",
      "O(log(R + C))",
      "O(1)"
    ],
    "correctIndex": 1,
    "explanation": "A 2D Fenwick Tree nests two 1D updates/queries: an outer loop for rows ($O(\\log R)$) and an inner loop for columns ($O(\\log C)$), yielding $O(\\log R \\cdot \\log C)$.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-42",
    "question": "In LeetCode 208 \"Implement Trie (Prefix Tree)\", what is the space complexity to store N words of average length L over lowercase English alphabet?",
    "options": [
      "O(N * L * 26) references in worst case",
      "O(1)",
      "O(N^2)",
      "O(L^2)"
    ],
    "correctIndex": 0,
    "explanation": "Each node allocates an array of 26 pointers. In the worst case where no words share prefixes, there are $N \\cdot L$ nodes, each holding 26 pointers.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-43",
    "question": "In LeetCode 211 \"Design Add and Search Words Data Structure\" supporting '.' matching any character, what is the search strategy for '.'?",
    "options": [
      "Return false immediately",
      "Recursive Depth-First Search: iterate through all 26 possible non-null child nodes and return true if any child path matches the remaining pattern",
      "Binary search on alphabet",
      "KMP search"
    ],
    "correctIndex": 1,
    "explanation": "A '.' can match any valid letter. The Trie must branch out to all 26 children; if any child subtree successfully matches the remaining suffix, the search succeeds.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-44",
    "question": "In LeetCode 303 \"Range Sum Query - Immutable\" where no updates occur, what is the best data structure?",
    "options": [
      "Segment Tree with Lazy Propagation",
      "1D Prefix Sum Array with $O(N)$ build and $O(1)$ query: `prefix[r + 1] - prefix[l]`",
      "Sparse Table",
      "Bitwise Trie"
    ],
    "correctIndex": 1,
    "explanation": "When no mutations occur, a simple 1D Prefix Sum array answers range sum queries in $O(1)$ with $O(N)$ memory and zero tree overhead.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-45",
    "question": "In LeetCode 1707 \"Maximum XOR With an Element From Array\" with queries `(xi, mi)` where only numbers <= `mi` can be used, how can queries be answered efficiently?",
    "options": [
      "Sort both nums and queries offline by `mi` in ascending order; as `mi` increases, insert eligible array elements into the Bitwise Trie, then query `xi` in O(32)",
      "Rebuild the Trie from scratch for every query",
      "Run Dijkstra",
      "Sort numbers descending"
    ],
    "correctIndex": 0,
    "explanation": "Offline query processing sorts both numbers and queries by threshold $m_i$. Inserting elements into the Trie monotonically as $m_i$ advances avoids rebuilding the Trie, running in $O((N + Q) \\log N + 32 \\cdot (N + Q))$.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-46",
    "question": "What is the Z-algorithm array Z[i] defined as for a string s of length N?",
    "options": [
      "The count of vowels",
      "The length of the longest substring starting from s[i] that is also a prefix of s (i.e. length of longest common prefix of s and s[i..N-1])",
      "The hash of s[i]",
      "The number of distinct characters"
    ],
    "correctIndex": 1,
    "explanation": "Z[i] is the length of the longest common prefix between the entire string $s$ and the suffix starting at index $i$, computed in linear $O(N)$ time.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-47",
    "question": "How does the Z-algorithm solve substring search for pattern P and text T in O(N + M) time?",
    "options": [
      "Form string $S = P + \\$ + T$. Compute Z-array of $S$. Any index $i$ in the text portion where $Z[i] == |P|$ marks a complete occurrence of pattern $P$",
      "Sort both strings",
      "Search from both ends",
      "Use a Fenwick tree"
    ],
    "correctIndex": 0,
    "explanation": "In $P + \\$ + T$, $Z[i]$ represents matching characters with $P$. If $Z[i] == |P|$, the suffix starting at text position $i$ begins with the exact pattern $P$.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-48",
    "question": "In LeetCode 327 \"Count of Range Sum\", why does calculating prefix sums and using a Merge Sort Tree or Coordinate-Compressed Fenwick Tree achieve O(N log N)?",
    "options": [
      "Because $lower \\le prefix[j] - prefix[i] \\le upper$ rearranges to $prefix[j] - upper \\le prefix[i] \\le prefix[j] - lower$, reducing to counting elements in a dynamic range $[L, R]$ in the Fenwick Tree",
      "Because all numbers are positive",
      "Because range sum equals product",
      "It cannot be solved in O(N log N)"
    ],
    "correctIndex": 0,
    "explanation": "Rewriting the condition bounds $prefix[i]$ between $prefix[j] - upper$ and $prefix[j] - lower$. Querying a Fenwick tree with coordinate compression counts valid predecessors in $O(\\log N)$.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-49",
    "question": "In a Segment Tree, what is the maximum depth of recursion for a point update on an array of size N?",
    "options": [
      "N",
      "$\\lceil \\log_2 N \\rceil + 1$",
      "4 * N",
      "1"
    ],
    "correctIndex": 1,
    "explanation": "A point update descends from the root down a single branch to the leaf. Since the tree has height $\\lceil \\log_2 N \\rceil$, at most $\\approx \\log_2 N$ nodes are visited.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-pre-50",
    "question": "Why is mastering Segment Trees, Fenwick Trees, and Advanced String Matchers (KMP/Trie) essential for passing FAANG L4/L5 and E4/E5 coding bars?",
    "options": [
      "They represent the elite algorithmic threshold where brute force $O(N^2)$ solutions get TLE, and candidates must demonstrate precise invariant maintenance, logarithmic range trees, and linear string state automata under live whiteboard constraints",
      "Because FAANG companies only write compilers",
      "Because they are easy to memorize",
      "They replace relational databases"
    ],
    "correctIndex": 0,
    "explanation": "These data structures separate senior problem solvers from junior programmers by testing whether a candidate can design advanced logarithmic and linear invariants under strict runtime constraints.",
    "category": "Practical Execution & Trace (70%)"
  }
];

export const DAY_13_POST_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d13-post-1",
    "question": "What is a Persistent Segment Tree and how does it achieve O(log N) space per version update?",
    "options": [
      "It writes all tree nodes to disk storage in JSON format",
      "It creates new nodes ONLY along the path from root to the updated leaf (at most $\\log N$ nodes), while reusing all untouched child pointers from the previous version, allowing historical time-travel queries across all versions",
      "It keeps a copy of the entire 4N array on every update",
      "It uses multithreaded mutex locks"
    ],
    "correctIndex": 1,
    "explanation": "Path copying creates only $\\approx \\log N$ new nodes per update. The new root points to newly created modified nodes and shares all unmodified subtrees with the previous root, achieving $O(\\log N)$ time and space per version.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-2",
    "question": "What is a Dynamic Segment Tree (Implicit Segment Tree), and when is it required over a standard array Segment Tree?",
    "options": [
      "When elements are floating point numbers",
      "When coordinate ranges are vast (e.g. $1 \\le L \\le R \\le 10^9$) but the number of actual update/query operations $Q$ is modest (e.g. $Q \\le 10^5$), nodes are created dynamically with pointers only when visited, consuming $O(Q \\log(\\text{range}))$ memory instead of $O(4 \\times 10^9)$",
      "When updates are faster than queries",
      "When all array values are 0"
    ],
    "correctIndex": 1,
    "explanation": "A coordinate space of $10^9$ cannot be stored in a static 4N array. A Dynamic Segment Tree allocates nodes on-demand using pointers, consuming only $O(Q \\log(\\text{range}))$ memory.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-3",
    "question": "What problem does a Merge Sort Tree solve in O(log^2 N) time?",
    "options": [
      "Sorting strings alphabetically",
      "Range Query: Counting how many elements in subarray $arr[L..R]$ are strictly less than a threshold $K$, by storing a sorted `std::vector` at each segment tree node and binary searching (`std::lower_bound`) on each visited segment",
      "Finding the shortest path in a graph",
      "Inverting a binary matrix"
    ],
    "correctIndex": 1,
    "explanation": "In a Merge Sort Tree, each segment tree node stores the sorted merge of its children. Querying $[L, R]$ visits $O(\\log N)$ canonical nodes, and running `lower_bound` on each node's sorted vector takes $O(\\log N)$, totaling $O(\\log^2 N)$.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-4",
    "question": "In the Suffix Automaton (SAM) data structure for a string of length N, what are the maximum number of states and transitions?",
    "options": [
      "States: at most $2N - 1$; Transitions: at most $3N - 4$. It represents all $O(N^2)$ substrings of a string in strictly linear $O(N)$ space and time",
      "States: $N^2$; Transitions: $N^3$",
      "States: $N$; Transitions: $N$",
      "States: $2^N$; Transitions: $2^N$"
    ],
    "correctIndex": 0,
    "explanation": "Suffix Automaton is the minimal DFA accepting all suffixes of a string. Despite encoding all $O(N^2)$ substrings, it contains at most $2N - 1$ states and $3N - 4$ transitions, making it extraordinarily powerful.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-5",
    "question": "What is Manacher’s Algorithm and what is its optimal time complexity for finding the longest palindromic substring?",
    "options": [
      "O(N^2) using dynamic programming table",
      "Strictly linear O(N) time by inserting delimiters '#' and using mirror symmetry around the current rightmost palindrome boundary (center `C` and right boundary `R`) to skip redundant character expansions",
      "O(N log N) with suffix arrays",
      "O(N^3) brute force"
    ],
    "correctIndex": 1,
    "explanation": "Manacher's algorithm uses previously expanded palindrome symmetry to initialize palindrome radii at symmetric positions, advancing the right boundary monotonically in strictly linear $O(N)$ time.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-6",
    "question": "What is the Suffix Array of a string, and how is the LCP (Longest Common Prefix) array computed in linear O(N) time?",
    "options": [
      "Suffix Array is the sorted array of all suffixes of string s; Kasai’s algorithm computes the LCP array in linear O(N) time by observing that the LCP of the next suffix in original text order decreases by at most 1: $h \\ge h - 1$",
      "Suffix Array is a linked list of characters",
      "Kasai's algorithm takes O(N^3)",
      "LCP array cannot be computed in linear time"
    ],
    "correctIndex": 0,
    "explanation": "Kasai's algorithm exploits the property that moving from suffix $i$ to $i+1$ drops the LCP by at most 1, avoiding restarting character comparisons and bounding total decrements and increments to $O(N)$.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-7",
    "question": "What is the \"Heavy-Light Decomposition\" (HLD) of a tree, and how does it integrate with Segment Trees?",
    "options": [
      "It weighs nodes by their degree",
      "It partitions tree edges into \"heavy\" edges (leading to child with largest subtree) and \"light\" edges, decomposing the tree into disjoint paths. Queries between any two nodes cross at most $O(\\log N)$ light edges, enabling path queries in $O(\\log^2 N)$ via a Segment Tree",
      "It deletes all light nodes",
      "It converts trees into binary heaps"
    ],
    "correctIndex": 1,
    "explanation": "HLD flattens tree paths into contiguous intervals on a Segment Tree. Any path between nodes $u$ and $v$ decomposes into at most $O(\\log N)$ continuous segments, answerable in $O(\\log^2 N)$ time.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-8",
    "question": "In a Segment Tree with Lazy Propagation supporting BOTH range addition (`+= val`) and range multiplication (`*= val`), how must lazy tags be composed?",
    "options": [
      "Multiplication and addition can be applied in any random order",
      "Maintain two lazy tags `mul` and `add`. When multiplying by `v`, update `mul = (mul * v) % MOD` and `add = (add * v) % MOD`. When adding `v`, update `add = (add + v) % MOD`. Multiplication distributes over addition: $(x \\cdot mul + add) \\cdot v = x \\cdot (mul \\cdot v) + (add \\cdot v)$",
      "Addition must always precede multiplication",
      "Two separate segment trees must be maintained"
    ],
    "correctIndex": 1,
    "explanation": "Algebraic composition: applying multiplication $v$ updates the linear transformation from $a \\cdot x + b$ to $(a \\cdot v) \\cdot x + (b \\cdot v)$. Applying addition $v$ updates it to $a \\cdot x + (b + v)$.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-9",
    "question": "In Rolling Hash (Rabin-Karp), why are double hashes (e.g. using two distinct large primes like $10^9+7$ and $10^9+9$ with distinct bases) used in competitive programming?",
    "options": [
      "To speed up CPU computation",
      "To prevent adversarial anti-hash test cases: a single 32-bit or 64-bit modulo can be forced into collisions via birthday paradox or crafted test cases, while double 64-bit independent primes make the collision probability negligibly close to zero ($< 10^{-18}$)",
      "To support negative characters",
      "It is required by the C standard"
    ],
    "correctIndex": 1,
    "explanation": "By the Birthday Paradox, a single modulo of $10^9$ has high collision probability after $\\approx 10^5$ queries. Dual coprime moduli multiply the collision space to $10^{18}$, eliminating false positives.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-10",
    "question": "What is a Treap (Tree + Heap) and why is an \"Implicit Treap\" uniquely capable of range insertions, deletions, and reversals in O(log N)?",
    "options": [
      "It is a graph with 3 edges",
      "An Implicit Treap uses subtree sizes instead of keys to represent array indices. Splitting by size (`split`) and merging (`merge`) in $O(\\log N)$ allows slicing out subsegments, reversing them via lazy tags, and reinserting them in $O(\\log N)$ time",
      "It only supports static arrays",
      "It requires sorting the array first"
    ],
    "correctIndex": 1,
    "explanation": "Implicit Treaps treat implicit subtree sizes as array indices. Splitting an array at index $k$ takes $O(\\log N)$, and lazy tags can reverse or shift intervals in $O(\\log N)$, solving LeetCode \"reverse subarray\" queries.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-11",
    "question": "In Mo’s Algorithm for offline range queries on arrays of size N with Q queries, what block size achieves the optimal time complexity of O((N + Q) * sqrt(N))?",
    "options": [
      "Block size $B = \\sqrt{N}$ (sorting queries by $(L / B, R)$ so the left pointer moves at most $O(Q \\sqrt{N})$ and the right pointer moves at most $O(N \\sqrt{N})$)",
      "Block size $B = N / 2$",
      "Block size $B = \\log N$",
      "Block size $B = N$"
    ],
    "correctIndex": 0,
    "explanation": "Dividing the array into blocks of size $\\approx \\sqrt{N}$ and sorting queries primarily by $\\lfloor L / B \\rfloor$ and secondarily by $R$ minimizes total pointer oscillations to $O((N + Q) \\sqrt{N})$.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-12",
    "question": "What is a \"Prefix Tree with Failure & Output Links\" known as in computer science?",
    "options": [
      "Aho-Corasick Automaton (a dictionary matching machine combining Trie with KMP suffix links)",
      "Binary Search Tree",
      "AVL Tree",
      "Huffman Tree"
    ],
    "correctIndex": 0,
    "explanation": "The Aho-Corasick automaton matches multiple dictionary keywords simultaneously in $O(N + \\text{matches})$ by augmenting a Trie with failure and dictionary suffix links.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-13",
    "question": "In a Fenwick Tree, how can RANGE updates and POINT queries be supported?",
    "options": [
      "By maintaining a difference array $D[i] = arr[i] - arr[i - 1]$ inside the Fenwick tree. Adding $V$ to range $[L, R]$ updates $add(L, V)$ and $add(R + 1, -V)$. Point query $arr[i]$ is then simply the prefix sum $query(i)$",
      "It cannot be done without a Segment Tree",
      "By running binary search on every query",
      "By storing pointers to all elements"
    ],
    "correctIndex": 0,
    "explanation": "Difference array formulation transforms range updates into two point updates ($+V$ at $L$ and $-V$ at $R+1$). The point value at index $i$ is recovered by prefix summing the difference array.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-14",
    "question": "How can a Fenwick Tree support BOTH Range Updates AND Range Queries in O(log N)?",
    "options": [
      "Using two Fenwick Trees: one tracking $D[i]$ and the second tracking $D[i] \\cdot (i - 1)$, deriving range sum algebraically via $(i \\cdot \\sum D[j]) - \\sum (D[j] \\cdot (j - 1))$",
      "Fenwick tree cannot support range updates with range queries",
      "By sorting elements before each query",
      "Using a 2D matrix"
    ],
    "correctIndex": 0,
    "explanation": "By algebraically expanding the double summation of prefix sums, range sum is expressed as $(i+1)\\sum D[j] - \\sum j \\cdot D[j]$, managed with two auxiliary BITs in $O(\\log N)$.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-15",
    "question": "Why does the Z-algorithm use the variables `[L, R]` to maintain a \"Z-box\"?",
    "options": [
      "To record the largest palindrome",
      "`[L, R]` represents the interval with the furthest reaching right boundary $R$ that matches a prefix of string $s$. For index $i < R$, $Z[i]$ is initialized from its symmetric mirror $Z[i - L]$ inside the box without character comparisons",
      "To prevent compiler optimization",
      "To track the start and end of the text"
    ],
    "correctIndex": 1,
    "explanation": "The Z-box maintains the rightmost match with the prefix. Inside the box, $Z[i]$ can be copied from $Z[i - L]$ up to $R - i$, eliminating redundant comparisons and ensuring linear $O(N)$ time.",
    "category": "Theory (30%)"
  },
  {
    "id": "d13-post-16",
    "question": "In LeetCode 307 \"Range Sum Query - Mutable\", an initial array is [1, 2, 3, 4, 5]. We execute `add(3, 10)` (adding 10 to index 3, making it 14). What is the new range sum `query(2, 4)` (indices 2, 3, 4)?",
    "options": [
      "12",
      "22 (3 + 14 + 5 = 22)",
      "14",
      "24"
    ],
    "correctIndex": 1,
    "explanation": "Original elements at [2, 3, 4] were 3, 4, 5 (sum 12). Adding 10 to element at index 3 increases the range sum by 10 to 22.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-17",
    "question": "In LeetCode 214 \"Shortest Palindrome\" for s = \"abcd\", what is the shortest palindrome formed by adding characters in front?",
    "options": [
      "\"dcbabcd\" (longest palindromic prefix is \"a\"; prepend reverse(\"bcd\") = \"dcb\")",
      "\"abcdcba\"",
      "\"dcbabcd\"",
      "\"abcd\""
    ],
    "correctIndex": 0,
    "explanation": "Longest palindromic prefix of \"abcd\" is \"a\" (length 1). The suffix to reverse is \"bcd\" -> \"dcb\". Prepending \"dcb\" to \"abcd\" yields \"dcbabcd\" (length 7).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-18",
    "question": "Trace the Z-array for string s = \"aaaaa\". What are the values of Z[0..4]?",
    "options": [
      "[0, 4, 3, 2, 1]",
      "[5, 4, 3, 2, 1]",
      "[0, 1, 2, 3, 4]",
      "[0, 0, 0, 0, 0]"
    ],
    "correctIndex": 0,
    "explanation": "By convention $Z[0] = 0$. For $i=1$: \"aaaa\" matches prefix (len 4). For $i=2$: \"aaa\" matches prefix (len 3). For $i=3$: \"aa\" (len 2). For $i=4$: \"a\" (len 1). Z is [0, 4, 3, 2, 1].",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-19",
    "question": "In LeetCode 315 \"Count of Smaller Numbers After Self\" for nums = [-1, -1], what is the output?",
    "options": [
      "[0, 0] (no element strictly smaller exists to the right)",
      "[1, 0]",
      "[0, 1]",
      "[-1, -1]"
    ],
    "correctIndex": 0,
    "explanation": "The problem requires strictly smaller elements. Equal numbers are not smaller, so both counts are 0: [0, 0].",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-20",
    "question": "In a Segment Tree covering [0, 7], which tree node index represents the root covering [0, 7] under standard 1-based indexing?",
    "options": [
      "Node 0",
      "Node 1 (left child is 2*1=2 covering [0, 3], right child is 2*1+1=3 covering [4, 7])",
      "Node 7",
      "Node 8"
    ],
    "correctIndex": 1,
    "explanation": "Under 1-based indexing, the root is at index 1. Its children are $2 \\times 1 = 2$ and $2 \\times 1 + 1 = 3$.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-21",
    "question": "In LeetCode 421 \"Maximum XOR of Two Numbers\", what is the XOR of 15 and 0?",
    "options": [
      "0",
      "15 (x ^ 0 = x for all numbers)",
      "-15",
      "1"
    ],
    "correctIndex": 1,
    "explanation": "Bitwise XOR with 0 is an identity operation: $x \\oplus 0 = x$. Thus, $15 \\oplus 0 = 15$.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-22",
    "question": "In a Sparse Table, what is the value of `st[0][i]` for any array?",
    "options": [
      "0",
      "arr[i] (an interval of length 2^0 = 1 contains only the single element arr[i])",
      "arr[0]",
      "infinity"
    ],
    "correctIndex": 1,
    "explanation": "Level 0 corresponds to intervals of length $2^0 = 1$. The minimum of a single element is the element itself: $st[0][i] = arr[i]$.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-23",
    "question": "In LeetCode 1392 \"Longest Happy Prefix\" for string s = \"leetcode\", what is returned?",
    "options": [
      "\"\" (empty string, as no proper prefix equals a proper suffix)",
      "\"l\"",
      "\"e\"",
      "\"code\""
    ],
    "correctIndex": 0,
    "explanation": "There is no non-empty proper prefix of \"leetcode\" that is also a suffix. The result is the empty string \"\".",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-24",
    "question": "In a Fenwick Tree of size 8, how many indices must be accessed to compute `query(8)`?",
    "options": [
      "8",
      "1 index: `bit[8]` (since 8 is binary 1000, 8 - LSB(8) = 0, so bit[8] directly stores the sum of all 8 elements)",
      "4",
      "2"
    ],
    "correctIndex": 1,
    "explanation": "8 is binary 1000. LSB(8) is 8. `8 - 8 = 0`. The loop terminates after visiting only index 8, which already holds the full sum of all 8 elements.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-25",
    "question": "In LeetCode 28 \"Implement strStr()\", what is returned if haystack = \"leetcode\" and needle = \"leeto\"?",
    "options": [
      "0",
      "-1 (needle does not occur anywhere in haystack)",
      "5",
      "null"
    ],
    "correctIndex": 1,
    "explanation": "\"leeto\" is not a substring of \"leetcode\". The function returns -1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-26",
    "question": "In LeetCode 307 \"Range Sum Query - Mutable\", what is the time complexity of `update` and `sumRange` using a Fenwick Tree?",
    "options": [
      "O(1) update, O(N) sum",
      "O(log N) update, O(log N) sum",
      "O(N) update, O(1) sum",
      "O(N log N) both"
    ],
    "correctIndex": 1,
    "explanation": "Fenwick Tree balances point updates and prefix sums to both run in logarithmic $O(\\log N)$ time.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-27",
    "question": "In a Bitwise Trie, how many nodes are created in the worst case when inserting N 32-bit integers?",
    "options": [
      "At most 32 * N nodes",
      "2^32 nodes",
      "N^2 nodes",
      "1 node"
    ],
    "correctIndex": 0,
    "explanation": "Each number creates at most 32 nodes along its path from MSB to LSB. For N numbers, at most $32 \\cdot N$ nodes are allocated.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-28",
    "question": "In a Segment Tree with Lazy Propagation, what happens to `lazy[node]` after calling `push(node, l, r)`?",
    "options": [
      "It is doubled",
      "It is reset to 0 (clearing the pending tag because the update has been transferred to child nodes)",
      "It is set to -1",
      "It is deleted from memory"
    ],
    "correctIndex": 1,
    "explanation": "Once the lazy value is added to the children's tree and lazy values, `lazy[node]` is reset to 0 so it is not reapplied in future queries.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-29",
    "question": "What is the XOR sum of an array where every number appears twice except for one number X that appears once?",
    "options": [
      "0",
      "X (since $a \\oplus a = 0$ for all duplicates, and $0 \\oplus X = X$)",
      "2 * X",
      "-X"
    ],
    "correctIndex": 1,
    "explanation": "By properties of XOR: $a \\oplus a = 0$, $a \\oplus 0 = a$, and XOR is commutative/associative. All duplicate pairs cancel to 0, leaving only X.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-30",
    "question": "In LeetCode 315, if nums = [1, 2, 3, 4], what is the output?",
    "options": [
      "[0, 0, 0, 0] (the array is strictly increasing; no element has smaller elements to its right)",
      "[1, 1, 1, 0]",
      "[3, 2, 1, 0]",
      "[0, 1, 2, 3]"
    ],
    "correctIndex": 0,
    "explanation": "Since the array is sorted in ascending order, every element to the right is strictly larger. The count of smaller elements to the right of each element is 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-31",
    "question": "In a Fenwick Tree of size 10, what is the parent index updated after index 5 during `add(5, val)`?",
    "options": [
      "Index 6 (5 + (5 & -5) = 5 + 1 = 6)",
      "Index 10",
      "Index 4",
      "Index 7"
    ],
    "correctIndex": 0,
    "explanation": "5 is binary 0101. LSB(5) is 1. `5 + 1 = 6`. The next index updated is 6.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-32",
    "question": "Continuing from the previous question, what index is updated after index 6 during `add(5, val)` in size 10?",
    "options": [
      "Index 7",
      "Index 8 (6 + (6 & -6) = 6 + 2 = 8)",
      "Index 9",
      "Index 10"
    ],
    "correctIndex": 1,
    "explanation": "6 is binary 0110. LSB(6) is 2. `6 + 2 = 8`. The next index updated is 8.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-33",
    "question": "And what index is updated after index 8 during `add(5, val)` in size 10?",
    "options": [
      "Index 16 (8 + (8 & -8) = 8 + 8 = 16 > 10, so update loop terminates)",
      "Index 9",
      "Index 10",
      "Index 0"
    ],
    "correctIndex": 0,
    "explanation": "8 is binary 1000. LSB(8) is 8. `8 + 8 = 16`. Since 16 exceeds array size 10, the update loop terminates. Total updated indices for 5 are {5, 6, 8}.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-34",
    "question": "In Sparse Table RMQ, what is `lg[1]` initialized to?",
    "options": [
      "0 (since $\\lfloor \\log_2 1 \\rfloor = 0$)",
      "1",
      "-1",
      "infinity"
    ],
    "correctIndex": 0,
    "explanation": "$\\log_2(1) = 0$. Precomputing $\\lg[1] = 0$ provides the base case for recurrence $\\lg[i] = \\lg[i / 2] + 1$.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-35",
    "question": "In Sparse Table RMQ, what is `lg[4]`?",
    "options": [
      "1",
      "2 (since $\\lfloor \\log_2 4 \\rfloor = 2$)",
      "3",
      "4"
    ],
    "correctIndex": 1,
    "explanation": "$2^2 = 4$, so $\\log_2(4) = 2$.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-36",
    "question": "In LeetCode 208 \"Implement Trie\", how long does `insert(\"apple\")` take?",
    "options": [
      "O(1)",
      "O(L) = 5 operations, where L is the length of the word",
      "O(26)",
      "O(N)"
    ],
    "correctIndex": 1,
    "explanation": "Each character of the string traverses one edge down the Trie. For a string of length 5, exactly 5 node lookups/insertions occur.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-37",
    "question": "In LeetCode 208 \"Implement Trie\", what boolean flag distinguishes a complete word from a non-word prefix?",
    "options": [
      "isLeaf",
      "isEnd (or isWord) set to true on the final character node of an inserted string",
      "isRoot",
      "hasChildren"
    ],
    "correctIndex": 1,
    "explanation": "A node may have descendants forming longer words (e.g. \"apple\" and \"apples\"). `isEnd == true` marks that a word terminates at this specific node.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-38",
    "question": "In LeetCode 1032 \"Stream of Characters\", why is inserting words in REVERSE into the Trie optimal?",
    "options": [
      "It reduces alphabet size",
      "Stream queries ask if ANY SUFFIX of the stream matches a word. Suffixes of a stream ending at the current character are PREFIXES of the reversed stream, allowing a direct downward walk from the newest character in the reversed Trie",
      "Reversed strings use less memory",
      "It prevents recursion"
    ],
    "correctIndex": 1,
    "explanation": "The most recent character of the stream is the last character of a matching word. Walking backwards through the stream corresponds directly to walking downwards in a reversed-word Trie.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-39",
    "question": "In KMP, what does it mean if $\\pi[N - 1] == 0$?",
    "options": [
      "The string is empty",
      "The string has no proper prefix that matches a proper suffix",
      "All characters are identical",
      "The string is a palindrome"
    ],
    "correctIndex": 1,
    "explanation": "$\\pi[N - 1] = 0$ means the longest common prefix-suffix of the entire string has length 0 (no common boundary).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-40",
    "question": "What is the result of `0 ^ 0` in bitwise XOR?",
    "options": [
      "0",
      "1",
      "-1",
      "Undefined"
    ],
    "correctIndex": 0,
    "explanation": "XOR outputs 1 if and only if the bits differ. Matching bits (0 and 0) produce 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-41",
    "question": "What is the result of `1 ^ 1` in bitwise XOR?",
    "options": [
      "1",
      "0 (matching bits produce 0)",
      "2",
      "-1"
    ],
    "correctIndex": 1,
    "explanation": "Identical bits produce 0 under XOR: $1 \\oplus 1 = 0$.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-42",
    "question": "In LeetCode 421, if nums = [0, 0, 0], what is the maximum XOR pair?",
    "options": [
      "0 (0 ^ 0 = 0)",
      "1",
      "3",
      "null"
    ],
    "correctIndex": 0,
    "explanation": "All elements are 0, so any pair yields $0 \\oplus 0 = 0$.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-43",
    "question": "In a Segment Tree, what is the time complexity to update ALL elements in range [L, R] WITHOUT Lazy Propagation?",
    "options": [
      "O(log N)",
      "O(N log N) (since every leaf in range [L, R] must be visited and updated individually)",
      "O(1)",
      "O(N^2)"
    ],
    "correctIndex": 1,
    "explanation": "Without lazy propagation, updating $K$ leaves requires $K$ separate point updates, taking $O(K \\log N) = O(N \\log N)$ in the worst case.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-44",
    "question": "In Sparse Table RMQ on array [1, 2, 3, 4, 5], what is query RMQ(0, 4)?",
    "options": [
      "5",
      "1 (minimum of entire array is 1)",
      "3",
      "0"
    ],
    "correctIndex": 1,
    "explanation": "The minimum element across the full array [1, 2, 3, 4, 5] is 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-45",
    "question": "In LeetCode 28, if needle is the empty string \"\", what does `strStr` traditionally return according to C/Java standard library specifications?",
    "options": [
      "0",
      "-1",
      "null",
      "Exception"
    ],
    "correctIndex": 0,
    "explanation": "In C `strstr` and Java `indexOf`, searching for an empty string \"\" returns index 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-46",
    "question": "In LeetCode 315, if nums = [1], what is the result array?",
    "options": [
      "[0] (no elements to the right)",
      "[1]",
      "[]",
      "[-1]"
    ],
    "correctIndex": 0,
    "explanation": "A single element has no elements to its right, so the count is 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-47",
    "question": "What is the height of a balanced Fenwick Tree on N elements?",
    "options": [
      "N",
      "$\\lfloor \\log_2 N \\rfloor + 1$",
      "2 * N",
      "O(1)"
    ],
    "correctIndex": 1,
    "explanation": "Because indices increase or decrease by powers of 2 at each step, any traversal reaches the boundary in at most $\\approx \\log_2 N$ steps.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-48",
    "question": "In a Segment Tree, why is mid calculated as `mid = l + (r - l) / 2` rather than `mid = (l + r) / 2`?",
    "options": [
      "To prevent 32-bit signed integer overflow when $l + r > 2^{31} - 1$",
      "It is faster on ARM chips",
      "To round up instead of down",
      "It makes code shorter"
    ],
    "correctIndex": 0,
    "explanation": "When $l$ and $r$ are large positive integers, $l + r$ can exceed $2,147,483,647$ and wrap to a negative value. `l + (r - l) / 2` prevents overflow.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-49",
    "question": "In Maximum XOR Subarray for array with all zeros [0, 0, 0], what is the maximum XOR subarray?",
    "options": [
      "0",
      "1",
      "-1",
      "null"
    ],
    "correctIndex": 0,
    "explanation": "The XOR of any subarray of zeros is 0. Maximum is 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d13-post-50",
    "question": "Why does mastering Range Query Data Structures and String Automata directly elevate a candidate to Senior / Staff engineer bands at Tier-1 product companies?",
    "options": [
      "Because real-world search engines, high-frequency limit order books, and distributed metrics aggregators rely on sub-millisecond range trees and linear pattern automata for real-time queries over billions of records",
      "Because they are required by legal software patents",
      "Because they eliminate the need for CPU caches",
      "Because they only run on Linux servers"
    ],
    "correctIndex": 0,
    "explanation": "Production architectures (e.g. Lucene, Kafka, Redis, genomic search engines) utilize segment trees and string automata to achieve real-time indexing and range aggregation over massive data streams.",
    "category": "Practical Execution & Trace (70%)"
  }
];
