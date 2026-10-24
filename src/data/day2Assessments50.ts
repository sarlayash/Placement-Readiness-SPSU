import { AssessmentQuestion } from '../types';

export const DAY_2_PRE_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "day2-pre-q1",
    "question": "Trace the output of this C++ Two-Pointer code snippet on a sorted array:",
    "codeSnippet": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> a = {1, 3, 4, 7, 10};\n    int target = 11, l = 0, r = 4, count = 0;\n    while (l < r) {\n        int s = a[l] + a[r];\n        if (s == target) { count++; l++; r--; }\n        else if (s < target) l++;\n        else r--;\n    }\n    cout << count << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "0",
      "1",
      "2",
      "3"
    ],
    "correctIndex": 2,
    "explanation": "Pairs summing to 11 are: (1, 10) and (4, 7). Both pairs are found and count becomes 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q2",
    "question": "What is the maximum number of times any single element is pushed or popped in a Monotonic Stack of size N?",
    "options": [
      "Each element is pushed once and popped at most once (at most 2 operations)",
      "O(N) times per element",
      "O(log N) times per element",
      "Elements are never popped"
    ],
    "correctIndex": 0,
    "explanation": "Each element enters the stack exactly once and leaves at most once, guaranteeing amortized O(1) time per element and O(N) overall.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q3",
    "question": "What will be printed by this Python Sliding Window execution trace?",
    "codeSnippet": "s = \"abacaba\"\nlast = {}\nleft = 0\nmax_len = 0\nfor right, ch in enumerate(s):\n    if ch in last and last[ch] >= left:\n        left = last[ch] + 1\n    last[ch] = right\n    max_len = max(max_len, right - left + 1)\nprint(max_len)",
    "codeLanguage": "python",
    "options": [
      "2",
      "3",
      "4",
      "7"
    ],
    "correctIndex": 1,
    "explanation": "The longest substrings without repeating characters are \"bac\" and \"cab\", both with length 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q4",
    "question": "In a Hash Table with Separate Chaining, what is the worst-case search time complexity when all N keys hash to the same bucket?",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N²)"
    ],
    "correctIndex": 2,
    "explanation": "When all keys collide into a single bucket, the chain degrades to a linked list of length N, requiring O(N) linear traversal.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q5",
    "question": "Trace the output of this Floyd’s Cycle Detection simulation in C:",
    "codeSnippet": "int nextNode(int u) {\n    int nextArr[] = {1, 2, 3, 4, 2}; // 0->1->2->3->4->2 (cycle 2-3-4)\n    return nextArr[u];\n}\nint main() {\n    int slow = 0, fast = 0;\n    do {\n        slow = nextNode(slow);\n        fast = nextNode(nextNode(fast));\n    } while (slow != fast);\n    printf(\"%d\", slow);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "2",
      "3",
      "4",
      "1"
    ],
    "correctIndex": 2,
    "explanation": "Step 1: s=1, f=2; Step 2: s=2, f=4; Step 3: s=3, f=3. Slow and fast meet at node 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q6",
    "question": "Which Binary Tree traversal order guarantees visiting nodes in strictly increasing sorted order for a Binary Search Tree (BST)?",
    "options": [
      "Preorder (Root -> Left -> Right)",
      "Inorder (Left -> Root -> Right)",
      "Postorder (Left -> Right -> Root)",
      "Level-Order (Breadth-First)"
    ],
    "correctIndex": 1,
    "explanation": "Inorder traversal recursively visits the left subtree (< root), then root, then right subtree (> root), yielding sorted order.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q7",
    "question": "What is the output of this Java Next Greater Element monotonic stack trace?",
    "codeSnippet": "int[] arr = {3, 1, 4};\nint[] res = new int[3];\njava.util.Stack<Integer> st = new java.util.Stack<>();\nfor (int i = 2; i >= 0; i--) {\n    while (!st.isEmpty() && st.peek() <= arr[i]) st.pop();\n    res[i] = st.isEmpty() ? -1 : st.peek();\n    st.push(arr[i]);\n}\nSystem.out.println(res[0] + \" \" + res[1] + \" \" + res[2]);",
    "codeLanguage": "java",
    "options": [
      "4 4 -1",
      "4 -1 -1",
      "1 4 -1",
      "-1 4 -1"
    ],
    "correctIndex": 0,
    "explanation": "Next greater for 3 is 4; next greater for 1 is 4; next greater for 4 does not exist (-1). Result: \"4 4 -1\".",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q8",
    "question": "Why is `int mid = low + (high - low) / 2` preferred over `(low + high) / 2` in Binary Search?",
    "options": [
      "It runs in O(1) instead of O(log N)",
      "It prevents 32-bit signed integer overflow when low + high >= 2^31",
      "It rounds down to negative infinity in Python",
      "It automatically sorts the array"
    ],
    "correctIndex": 1,
    "explanation": "If low and high are both close to 2^31 - 1, their sum overflows into a negative value. `low + (high - low) / 2` is mathematically identical but stays within bounds.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q9",
    "question": "What is printed by this recursive tree height function?",
    "codeSnippet": "struct Node { int val; Node *left, *right; };\nint height(Node* root) {\n    if (!root) return 0;\n    int lh = height(root->left);\n    int rh = height(root->right);\n    return 1 + (lh > rh ? lh : rh);\n}",
    "codeLanguage": "cpp",
    "options": [
      "Total number of nodes",
      "Maximum edge depth / node height from root to deepest leaf",
      "Total number of leaves",
      "Diameter of the tree"
    ],
    "correctIndex": 1,
    "explanation": "The function returns 1 plus the maximum of left and right subtree heights, which computes the node height of the tree.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q10",
    "question": "Which graph traversal algorithm guarantees finding the shortest path in terms of number of edges on an unweighted graph?",
    "options": [
      "Depth-First Search (DFS)",
      "Breadth-First Search (BFS)",
      "Topological Sort",
      "Inorder Traversal"
    ],
    "correctIndex": 1,
    "explanation": "BFS explores vertices layer by layer in increasing distance from the source using a FIFO queue, guaranteeing shortest path in unweighted graphs.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q11",
    "question": "What is the output of this Python Prefix Sum + Hash Map snippet for target sum K = 3?",
    "codeSnippet": "nums = [1, 2, 3]\nprefix = {0: 1}\ncur = 0\nans = 0\nfor x in nums:\n    cur += x\n    if (cur - 3) in prefix:\n        ans += prefix[cur - 3]\n    prefix[cur] = prefix.get(cur, 0) + 1\nprint(ans)",
    "codeLanguage": "python",
    "options": [
      "1",
      "2",
      "3",
      "0"
    ],
    "correctIndex": 1,
    "explanation": "Subarrays summing to 3 are: [1, 2] (sum 3) and [3] (sum 3). Total count = 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q12",
    "question": "How many total subsets are generated for a set of size N during power set backtracking?",
    "options": [
      "N!",
      "2^N",
      "N²",
      "2N"
    ],
    "correctIndex": 1,
    "explanation": "Every element has 2 independent choices (either included or excluded in the subset), leading to 2^N total subsets.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q13",
    "question": "Trace the output of this C pointer reversal on a 3-node linked list (1 -> 2 -> 3 -> NULL):",
    "codeSnippet": "struct Node* curr = head, *prev = NULL, *next = NULL;\nwhile (curr) {\n    next = curr->next;\n    curr->next = prev;\n    prev = curr;\n    curr = next;\n}\nprintf(\"%d\", prev->val);",
    "codeLanguage": "c",
    "options": [
      "1",
      "2",
      "3",
      "NULL"
    ],
    "correctIndex": 2,
    "explanation": "When the loop terminates, prev points to the new head of the reversed list, which is the original last node: 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q14",
    "question": "What is the time complexity of building a Max-Heap from an unsorted array of size N using bottom-up Heapify (build-heap)?",
    "options": [
      "O(N log N)",
      "O(N)",
      "O(N²)",
      "O(log N)"
    ],
    "correctIndex": 1,
    "explanation": "Bottom-up heap construction runs in linear O(N) time because the majority of nodes are at the lower levels and require few sift-down operations.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q15",
    "question": "What does this C++ binary search snippet return when searching for target = 6 in {2, 4, 6, 8, 10}?",
    "codeSnippet": "vector<int> a = {2, 4, 6, 8, 10};\nint l = 0, r = 4, ans = -1;\nwhile (l <= r) {\n    int m = l + (r - l) / 2;\n    if (a[m] == 6) { ans = m; break; }\n    else if (a[m] < 6) l = m + 1;\n    else r = m - 1;\n}\ncout << ans;",
    "codeLanguage": "cpp",
    "options": [
      "1",
      "2",
      "3",
      "-1"
    ],
    "correctIndex": 1,
    "explanation": "First iteration checks m = 2 (a[2] = 6), which matches target 6 immediately. ans = 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q16",
    "question": "In Dynamic Programming, what two essential properties must a problem satisfy to be solvable via DP?",
    "options": [
      "Greedy choice property & sorted array",
      "Overlapping subproblems & Optimal substructure",
      "Complete binary tree & disjoint sets",
      "LIFO stack & FIFO queue"
    ],
    "correctIndex": 1,
    "explanation": "DP applies when a problem exhibits Optimal Substructure (optimal solution formed from optimal subproblem solutions) and Overlapping Subproblems (subproblems are computed repeatedly).",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q17",
    "question": "What is the value of `dp[4]` in this Java 1D Tabulation code for climbing stairs?",
    "codeSnippet": "int[] dp = new int[5];\ndp[0] = 1; dp[1] = 1;\nfor (int i = 2; i <= 4; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n}\nSystem.out.println(dp[4]);",
    "codeLanguage": "java",
    "options": [
      "3",
      "4",
      "5",
      "8"
    ],
    "correctIndex": 2,
    "explanation": "dp[0]=1, dp[1]=1, dp[2]=2, dp[3]=3, dp[4]=5. There are 5 distinct ways to climb 4 stairs.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q18",
    "question": "Which data structure is required to implement Level-Order Traversal (BFS) on a Binary Tree?",
    "options": [
      "Stack",
      "Queue",
      "Priority Queue",
      "Set"
    ],
    "correctIndex": 1,
    "explanation": "Level-order traversal visits nodes layer by layer from top to bottom, requiring a FIFO Queue.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q19",
    "question": "What is the output of this Python dictionary frequency counter code?",
    "codeSnippet": "words = [\"cat\", \"dog\", \"cat\", \"bird\", \"dog\", \"cat\"]\nfreq = {}\nfor w in words:\n    freq[w] = freq.get(w, 0) + 1\nprint(freq[\"cat\"], freq[\"dog\"], freq[\"bird\"])",
    "codeLanguage": "python",
    "options": [
      "3 2 1",
      "2 3 1",
      "3 1 2",
      "1 2 3"
    ],
    "correctIndex": 0,
    "explanation": "\"cat\" appears 3 times, \"dog\" appears 2 times, and \"bird\" appears 1 time.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q20",
    "question": "What is the worst-case time complexity of Quick Sort, and when does it occur?",
    "options": [
      "O(N log N) when array is random",
      "O(N²) when array is already sorted and pivot is chosen as first/last element",
      "O(N) when all elements are distinct",
      "O(log N) on empty arrays"
    ],
    "correctIndex": 1,
    "explanation": "If the array is already sorted and the pivot chosen is always the first or last element, partitions are unbalanced (sizes 0 and N-1), resulting in O(N²) quadratic time.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q21",
    "question": "Trace the output of this C code for circular queue index wrapping with capacity 5:",
    "codeSnippet": "int front = 4, capacity = 5;\nfront = (front + 1) % capacity;\nprintf(\"%d\", front);",
    "codeLanguage": "c",
    "options": [
      "5",
      "0",
      "4",
      "1"
    ],
    "correctIndex": 1,
    "explanation": "(4 + 1) % 5 = 5 % 5 = 0. The pointer cleanly wraps around to index 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q22",
    "question": "What is the space complexity of an in-place Linked List Reversal algorithm?",
    "options": [
      "O(N)",
      "O(1)",
      "O(log N)",
      "O(N²)"
    ],
    "correctIndex": 1,
    "explanation": "In-place reversal only updates existing next pointers using three auxiliary pointer variables (prev, curr, next), consuming strictly O(1) extra space.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q23",
    "question": "What does this C++ snippet compute on vector `heights = {1, 8, 6, 2, 5, 4, 8, 3, 7}`?",
    "codeSnippet": "int l = 0, r = 8, ans = 0;\nwhile (l < r) {\n    ans = max(ans, min(heights[l], heights[r]) * (r - l));\n    if (heights[l] < heights[r]) l++;\n    else r--;\n}\ncout << ans;",
    "codeLanguage": "cpp",
    "options": [
      "49",
      "40",
      "56",
      "36"
    ],
    "correctIndex": 0,
    "explanation": "This solves Container With Most Water. At l=1 (height 8) and r=8 (height 7), area = min(8,7) * (8-1) = 7 * 7 = 49.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q24",
    "question": "What is the relationship between the number of vertices V and edges E in a Tree (connected acyclic graph)?",
    "options": [
      "E = V",
      "E = V - 1",
      "E = V + 1",
      "E = 2V"
    ],
    "correctIndex": 1,
    "explanation": "By definition, every tree with V vertices has exactly V - 1 edges.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q25",
    "question": "What is printed by this Python recursion call stack trace?",
    "codeSnippet": "def fun(n):\n    if n <= 1:\n        return 1\n    return n * fun(n - 2)\nprint(fun(5))",
    "codeLanguage": "python",
    "options": [
      "120",
      "15",
      "24",
      "10"
    ],
    "correctIndex": 1,
    "explanation": "fun(5) = 5 * fun(3) = 5 * (3 * fun(1)) = 5 * 3 * 1 = 15.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q26",
    "question": "Which sorting algorithm is guaranteed to be stable and have an O(N log N) worst-case time complexity?",
    "options": [
      "Quick Sort",
      "Merge Sort",
      "Heap Sort",
      "Selection Sort"
    ],
    "correctIndex": 1,
    "explanation": "Merge Sort consistently divides in half and merges sorted sub-arrays preserving relative order of equal keys: stable O(N log N).",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q27",
    "question": "What is the output of this Java queue operation trace?",
    "codeSnippet": "java.util.Queue<Integer> q = new java.util.LinkedList<>();\nq.offer(10);\nq.offer(20);\nq.poll();\nq.offer(30);\nSystem.out.println(q.peek() + \" \" + q.size());",
    "codeLanguage": "java",
    "options": [
      "10 2",
      "20 2",
      "30 1",
      "20 3"
    ],
    "correctIndex": 1,
    "explanation": "Offer 10, offer 20. Poll removes 10. Offer 30. Queue now holds [20, 30]. Peek is 20, size is 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q28",
    "question": "In a Binary Search Tree with N nodes, what is the worst-case search time complexity when the tree is degenerate (skewed)?",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)"
    ],
    "correctIndex": 2,
    "explanation": "When keys are inserted in sorted order into an unbalanced BST, it degenerates into a linear linked list with O(N) search depth.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q29",
    "question": "Trace the output of this C string palindrome verification with two pointers:",
    "codeSnippet": "char s[] = \"racecar\";\nint l = 0, r = 6, ok = 1;\nwhile (l < r) {\n    if (s[l++] != s[r--]) { ok = 0; break; }\n}\nprintf(\"%d\", ok);",
    "codeLanguage": "c",
    "options": [
      "0",
      "1",
      "6",
      "-1"
    ],
    "correctIndex": 1,
    "explanation": "\"racecar\" reads the same forwards and backwards. All character comparisons match, so ok remains 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q30",
    "question": "What is the primary advantage of Adjacency List over Adjacency Matrix for storing sparse graphs (E << V²)?",
    "options": [
      "O(1) edge lookup time",
      "O(V + E) space instead of O(V²) space",
      "Faster matrix multiplication",
      "No need for pointers"
    ],
    "correctIndex": 1,
    "explanation": "Adjacency matrix consumes O(V²) memory regardless of edge count, whereas adjacency lists consume only O(V + E) memory, making it far superior for sparse graphs.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q31",
    "question": "What will this Python binary search code print when searching for the insertion index of 7 in `[1, 3, 5, 9]`?",
    "codeSnippet": "nums = [1, 3, 5, 9]\nlow, high = 0, len(nums) - 1\nwhile low <= high:\n    mid = (low + high) // 2\n    if nums[mid] < 7:\n        low = mid + 1\n    else:\n        high = mid - 1\nprint(low)",
    "codeLanguage": "python",
    "options": [
      "2",
      "3",
      "4",
      "1"
    ],
    "correctIndex": 1,
    "explanation": "Lower bound binary search stops with low pointing to index 3 (value 9), which is the correct insertion index for 7.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q32",
    "question": "What is the maximum number of nodes in a Binary Tree of height H (where height of a single node tree is 1)?",
    "options": [
      "2^H",
      "2^H - 1",
      "2^(H - 1)",
      "H²"
    ],
    "correctIndex": 1,
    "explanation": "A full binary tree has 1 + 2 + 4 + ... + 2^(H-1) = 2^H - 1 total nodes.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q33",
    "question": "Trace the output of this C++ valid parenthesis evaluation:",
    "codeSnippet": "#include <iostream>\n#include <stack>\nusing namespace std;\nint main() {\n    string s = \"{[()]}\";\n    stack<char> st;\n    for (char c : s) {\n        if (c == '{' || c == '[' || c == '(') st.push(c);\n        else if (!st.empty() && ((c == '}' && st.top() == '{') || (c == ']' && st.top() == '[') || (c == ')' && st.top() == '('))) st.pop();\n    }\n    cout << (st.empty() ? \"VALID\" : \"INVALID\");\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "VALID",
      "INVALID",
      "ERROR",
      "EMPTY"
    ],
    "correctIndex": 0,
    "explanation": "Every opening bracket correctly matches its corresponding closing bracket in LIFO order. Stack is empty at termination.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q34",
    "question": "Which algorithmic paradigm does Binary Search belong to?",
    "options": [
      "Greedy",
      "Divide and Conquer (Decrease and Conquer)",
      "Dynamic Programming",
      "Backtracking"
    ],
    "correctIndex": 1,
    "explanation": "Binary Search reduces the search space by half at each step, making it a classic Decrease and Conquer / Divide and Conquer algorithm.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q35",
    "question": "What is the output of this Java Min-Heap PriorityQueue execution?",
    "codeSnippet": "java.util.PriorityQueue<Integer> pq = new java.util.PriorityQueue<>();\npq.add(40);\npq.add(10);\npq.add(30);\npq.poll();\nSystem.out.println(pq.peek());",
    "codeLanguage": "java",
    "options": [
      "40",
      "10",
      "30",
      "0"
    ],
    "correctIndex": 2,
    "explanation": "Default Java PriorityQueue is a Min-Heap. Poll removes the smallest element (10). Next minimum is 30.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q36",
    "question": "In graph theory, what is a Directed Acyclic Graph (DAG) uniquely suitable for?",
    "options": [
      "Topological Sorting",
      "Dijkstra on negative cycles",
      "Finding Euler tours only",
      "Bipartite matching without edges"
    ],
    "correctIndex": 0,
    "explanation": "A topological ordering of vertices is possible if and only if the graph has no directed cycles (i.e. is a DAG).",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q37",
    "question": "What is the output of this Python coin change greedy simulation on denominations `[1, 5, 10]` for amount 18?",
    "codeSnippet": "coins = [10, 5, 1]\namount = 18\ncount = 0\nfor c in coins:\n    count += amount // c\n    amount %= c\nprint(count)",
    "codeLanguage": "python",
    "options": [
      "4",
      "5",
      "3",
      "6"
    ],
    "correctIndex": 1,
    "explanation": "10x1 (amount becomes 8) + 5x1 (amount becomes 3) + 1x3 (amount becomes 0) = 5 coins.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q38",
    "question": "Why does the Greedy choice fail for general coin change denominations like `[1, 3, 4]` for amount 6?",
    "options": [
      "Greedy takes 4, then 1, 1 (3 coins), whereas the optimal DP solution is 3 + 3 (2 coins)",
      "Greedy enters an infinite loop",
      "Greedy requires negative denominations",
      "Greedy is only defined for sorted inputs"
    ],
    "correctIndex": 0,
    "explanation": "Greedy greedily picks 4, leaving 2, which requires 1+1 (total 3 coins). The global optimal choice is two 3-cent coins (total 2 coins).",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q39",
    "question": "Trace the output of this C code finding the middle element of a 5-node linked list:",
    "codeSnippet": "int nodes[] = {10, 20, 30, 40, 50};\nint slow = 0, fast = 0;\nwhile (fast < 4) {\n    slow += 1;\n    fast += 2;\n}\nprintf(\"%d\", nodes[slow]);",
    "codeLanguage": "c",
    "options": [
      "20",
      "30",
      "40",
      "50"
    ],
    "correctIndex": 1,
    "explanation": "Fast advances by 2 while slow advances by 1. When fast reaches index 4, slow is at index 2 (value 30).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q40",
    "question": "What is the time complexity of searching for an element in an unsorted array of size N?",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)"
    ],
    "correctIndex": 2,
    "explanation": "In an unsorted array, any element could be anywhere, requiring a linear scan of up to N elements: O(N).",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q41",
    "question": "What does this C++ binary search snippet return when searching for the First Bad Version if versions 4, 5 are bad and 1, 2, 3 are good?",
    "codeSnippet": "bool isBad(int v) { return v >= 4; }\nint firstBadVersion(int n) {\n    int l = 1, r = n;\n    while (l < r) {\n        int m = l + (r - l) / 2;\n        if (isBad(m)) r = m;\n        else l = m + 1;\n    }\n    return l;\n}\n// Call firstBadVersion(5);",
    "codeLanguage": "cpp",
    "options": [
      "3",
      "4",
      "5",
      "1"
    ],
    "correctIndex": 1,
    "explanation": "Binary search contracts [1, 5] down to the boundary index where isBad(v) first becomes true, returning 4.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q42",
    "question": "What is the purpose of the `visited` array in graph traversals?",
    "options": [
      "To store shortest path distances",
      "To prevent infinite loops / cycles and avoid re-processing nodes",
      "To dynamically resize the graph",
      "To invert edge directions"
    ],
    "correctIndex": 1,
    "explanation": "In cyclic graphs, an unvisited check prevents the traversal from repeatedly processing nodes in an infinite loop.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q43",
    "question": "What will be printed by this Python memoized recursion for Fibonacci?",
    "codeSnippet": "memo = {}\ndef fib(n):\n    if n <= 1: return n\n    if n not in memo:\n        memo[n] = fib(n - 1) + fib(n - 2)\n    return memo[n]\nprint(fib(6))",
    "codeLanguage": "python",
    "options": [
      "5",
      "8",
      "13",
      "6"
    ],
    "correctIndex": 1,
    "explanation": "fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5, fib(6)=8.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q44",
    "question": "In a Doubly Linked List, what extra pointer does each node contain compared to a Singly Linked List?",
    "options": [
      "child",
      "prev",
      "random",
      "parent"
    ],
    "correctIndex": 1,
    "explanation": "Each node in a doubly linked list contains both a `next` pointer and a `prev` pointer.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q45",
    "question": "Trace the output of this Java String sorting anagram check:",
    "codeSnippet": "char[] a = \"silent\".toCharArray();\nchar[] b = \"listen\".toCharArray();\njava.util.Arrays.sort(a);\njava.util.Arrays.sort(b);\nSystem.out.println(java.util.Arrays.equals(a, b));",
    "codeLanguage": "java",
    "options": [
      "true",
      "false",
      "0",
      "null"
    ],
    "correctIndex": 0,
    "explanation": "Both words contain the exact same characters: e, i, l, n, s, t. The sorted arrays are identical, so equals returns true.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q46",
    "question": "What is the diameter of a Binary Tree defined as?",
    "options": [
      "Total number of nodes in tree",
      "Length of the longest path between any two nodes in the tree",
      "Height of root node",
      "Maximum width of any level"
    ],
    "correctIndex": 1,
    "explanation": "The diameter (or width) of a tree is defined as the number of nodes (or edges) on the longest path between any two leaf nodes in the tree.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q47",
    "question": "What is the output of this C code performing XOR on array elements to find the unique single number?",
    "codeSnippet": "int arr[] = {4, 1, 2, 1, 2};\nint x = 0;\nfor (int i = 0; i < 5; i++) x ^= arr[i];\nprintf(\"%d\", x);",
    "codeLanguage": "c",
    "options": [
      "0",
      "1",
      "4",
      "2"
    ],
    "correctIndex": 2,
    "explanation": "Because a ^ a = 0 and a ^ 0 = a, paired numbers cancel out: 1^1 = 0, 2^2 = 0. The remaining single number is 4.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q48",
    "question": "Which operation is NOT supported in O(1) time by a standard Hash Table?",
    "options": [
      "Insert(key, value)",
      "Search(key)",
      "Delete(key)",
      "FindMin()"
    ],
    "correctIndex": 3,
    "explanation": "Hash tables do not maintain keys in sorted order. Finding the minimum key requires examining all N elements: O(N).",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-pre-q49",
    "question": "What is printed by this C++ backtracking subsets count on vector `{1, 2}`?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint countSubsets(int idx, int n) {\n    if (idx == n) return 1;\n    return countSubsets(idx + 1, n) + countSubsets(idx + 1, n);\n}\nint main() {\n    cout << countSubsets(0, 2);\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "2",
      "4",
      "3",
      "1"
    ],
    "correctIndex": 1,
    "explanation": "At each index there are 2 choices (include/exclude), branching into 2^2 = 4 subsets: {}, {1}, {2}, {1, 2}.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-pre-q50",
    "question": "What is the time complexity of finding the Lowest Common Ancestor (LCA) in a balanced Binary Search Tree?",
    "options": [
      "O(N²)",
      "O(N)",
      "O(log N) or O(H)",
      "O(1)"
    ],
    "correctIndex": 2,
    "explanation": "In a BST, if both keys are smaller than current node, traverse left; if both greater, traverse right; otherwise current node is the LCA. This takes O(H) = O(log N) time for a balanced BST.",
    "category": "Theory (30%)"
  }
];

export const DAY_2_POST_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "day2-post-q1",
    "question": "Trace the output of this C sliding window maximum sum subarray of size k = 3:",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int a[] = {2, 1, 5, 1, 3, 2};\n    int k = 3, w = 0;\n    for (int i = 0; i < k; i++) w += a[i];\n    int maxS = w;\n    for (int i = k; i < 6; i++) {\n        w += a[i] - a[i - k];\n        if (w > maxS) maxS = w;\n    }\n    printf(\"%d\", maxS);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "8",
      "9",
      "7",
      "11"
    ],
    "correctIndex": 1,
    "explanation": "Initial window (2+1+5)=8. Slide: (1+5+1)=7, (5+1+3)=9, (1+3+2)=6. Max sum is 9.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q2",
    "question": "What invariant must be maintained when using Two Pointers to find a pair with target sum?",
    "options": [
      "Array must be strictly alternating",
      "Array must be sorted so pointer moves monotonically increase or decrease the sum",
      "Array must have no duplicates",
      "Array size must be even"
    ],
    "correctIndex": 1,
    "explanation": "Monotonicity is required: moving left pointer rightwards increases the sum; moving right pointer leftwards decreases the sum.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q3",
    "question": "What is the output of this C++ Monotonic Stack for input `{2, 1, 2, 4, 3}`?",
    "codeSnippet": "vector<int> a = {2, 1, 2, 4, 3};\nstack<int> st;\nvector<int> res(5, -1);\nfor (int i = 4; i >= 0; i--) {\n    while (!st.empty() && st.top() <= a[i]) st.pop();\n    if (!st.empty()) res[i] = st.top();\n    st.push(a[i]);\n}\ncout << res[0] << \" \" << res[1] << \" \" << res[2] << \" \" << res[3] << \" \" << res[4];",
    "codeLanguage": "cpp",
    "options": [
      "4 2 4 -1 -1",
      "4 4 4 -1 -1",
      "4 2 -1 -1 -1",
      "2 2 4 -1 -1"
    ],
    "correctIndex": 0,
    "explanation": "For a[0]=2 -> 4; for a[1]=1 -> 2; for a[2]=2 -> 4; for a[3]=4 -> -1; for a[4]=3 -> -1. Output: \"4 2 4 -1 -1\".",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q4",
    "question": "In Floyd’s Cycle-Finding algorithm, once Slow and Fast meet inside the cycle, how do you locate the exact start node of the cycle?",
    "options": [
      "Reset Slow to head, keep Fast at meeting point, and advance both 1 step at a time until they collide",
      "Advance Fast 2 steps and Slow 1 step until both hit NULL",
      "Reset both to head and run BFS",
      "Reverse all pointers"
    ],
    "correctIndex": 0,
    "explanation": "By mathematical proof (distance from head to cycle start equals distance from meeting point to cycle start modulo C), advancing both 1 step at a time causes them to meet at the cycle start.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q5",
    "question": "Trace the output of this Python Binary Search on rotated sorted array:",
    "codeSnippet": "nums = [4, 5, 6, 7, 0, 1, 2]\ntarget = 0\nlow, high = 0, len(nums) - 1\nans = -1\nwhile low <= high:\n    mid = (low + high) // 2\n    if nums[mid] == target: ans = mid; break\n    if nums[low] <= nums[mid]:\n        if nums[low] <= target < nums[mid]: high = mid - 1\n        else: low = mid + 1\n    else:\n        if nums[mid] < target <= nums[high]: low = mid + 1\n        else: high = mid - 1\nprint(ans)",
    "codeLanguage": "python",
    "options": [
      "4",
      "5",
      "3",
      "-1"
    ],
    "correctIndex": 0,
    "explanation": "The value 0 is located at index 4 in `[4, 5, 6, 7, 0, 1, 2]`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q6",
    "question": "What is the time complexity of checking if a Binary Tree is height-balanced (AVL condition) in a top-down naïve manner vs bottom-up DFS?",
    "options": [
      "Top-down O(N²), Bottom-up O(N)",
      "Top-down O(N), Bottom-up O(N²)",
      "Both are O(N log N)",
      "Both are O(1)"
    ],
    "correctIndex": 0,
    "explanation": "Top-down repeatedly recomputes height at every node resulting in O(N²); bottom-up returns -1 as soon as an unbalanced subtree is discovered, checking each node once in O(N).",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q7",
    "question": "What will be printed by this Java code validating a BST?",
    "codeSnippet": "class Node { int val; Node left, right; Node(int v){val=v;} }\nboolean isValid(Node r, long min, long max) {\n    if (r == null) return true;\n    if (r.val <= min || r.val >= max) return false;\n    return isValid(r.left, min, r.val) && isValid(r.right, r.val, max);\n}\n// Root = 5, left = 6, right = 7\nNode root = new Node(5); root.left = new Node(6); root.right = new Node(7);\nSystem.out.println(isValid(root, Long.MIN_VALUE, Long.MAX_VALUE));",
    "codeLanguage": "java",
    "options": [
      "true",
      "false",
      "5",
      "null"
    ],
    "correctIndex": 1,
    "explanation": "Left child 6 is greater than root 5, violating the BST property (all left nodes must be strictly < root). Returns false.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q8",
    "question": "What is the time complexity of Breadth-First Search (BFS) on a graph with V vertices and E edges represented via an Adjacency List?",
    "options": [
      "O(V)",
      "O(E)",
      "O(V + E)",
      "O(V * E)"
    ],
    "correctIndex": 2,
    "explanation": "Each vertex is enqueued/dequeued once (O(V)), and each edge is examined twice for undirected or once for directed graphs (O(E)), giving O(V + E).",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q9",
    "question": "Trace the output of this C Subarray Sum Equals Zero check:",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int a[] = {4, 2, -3, 1, 6};\n    int sum = 0, found = 0;\n    int seen[1000] = {0};\n    seen[500] = 1; // offset 500 for sum 0\n    for (int i = 0; i < 5; i++) {\n        sum += a[i];\n        if (seen[sum + 500]) { found = 1; break; }\n        seen[sum + 500] = 1;\n    }\n    printf(\"%d\", found);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "0",
      "1",
      "4",
      "6"
    ],
    "correctIndex": 1,
    "explanation": "Prefix sums: 4, 6, 3, 4. The sum 4 repeats at index 0 and index 3, meaning subarray {2, -3, 1} sums to zero. found = 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q10",
    "question": "In 0/1 Knapsack with N items and capacity W, what are the dimensions of the standard 2D DP table?",
    "options": [
      "N x N",
      "W x W",
      "(N + 1) x (W + 1)",
      "2 x W"
    ],
    "correctIndex": 2,
    "explanation": "The states represent `dp[i][w]`: maximum value using a subset of the first `i` items with remaining capacity `w`, requiring `(N + 1) x (W + 1)` table entries.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q11",
    "question": "What is the output of this Python Coin Change DP tabulation for amount = 7 and coins = `[2, 3]`?",
    "codeSnippet": "coins = [2, 3]\namount = 7\ndp = [100] * (amount + 1)\ndp[0] = 0\nfor i in range(1, amount + 1):\n    for c in coins:\n        if i >= c:\n            dp[i] = min(dp[i], 1 + dp[i - c])\nprint(dp[7])",
    "codeLanguage": "python",
    "options": [
      "2",
      "3",
      "4",
      "100"
    ],
    "correctIndex": 1,
    "explanation": "Amount 7 can be formed using 3 coins: 3 + 2 + 2 = 7. dp[7] = 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q12",
    "question": "Why does Depth-First Search (DFS) on an undirected graph require tracking the `parent` node during cycle detection?",
    "options": [
      "To prevent immediately traversing back along the edge we just came from",
      "To balance the recursion tree",
      "To find shortest paths",
      "To invert the graph"
    ],
    "correctIndex": 0,
    "explanation": "In undirected graphs, an edge between u and v exists in both directions. Without checking `v != parent`, the algorithm would falsely detect a trivial 2-node cycle.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q13",
    "question": "Trace the output of this C++ snippet reversing words in a string in-place:",
    "codeSnippet": "#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string s = \"blue is sky the\";\n    reverse(s.begin(), s.end());\n    // Reverse each individual word...\n    cout << s.substr(0, 3);\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "blu",
      "the",
      "eht",
      "sky"
    ],
    "correctIndex": 2,
    "explanation": "Reversing the full string gives \"eht yks si eulb\". The first 3 characters are \"eht\".",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q14",
    "question": "What is the time complexity of inserting N elements one by one into an empty Hash Table using a good uniform hash function?",
    "options": [
      "O(N²)",
      "O(N) average time",
      "O(N log N)",
      "O(1) total"
    ],
    "correctIndex": 1,
    "explanation": "Each insertion takes O(1) amortized time, leading to O(N) total average time for N insertions.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q15",
    "question": "What is the output of this Java Level-Order BFS count on a complete binary tree of 7 nodes?",
    "codeSnippet": "int nodes = 7;\nint level = 0;\njava.util.Queue<Integer> q = new java.util.LinkedList<>();\nq.offer(1);\nint count = 1;\nwhile (!q.isEmpty()) {\n    int sz = q.size();\n    level++;\n    for (int i = 0; i < sz; i++) {\n        int u = q.poll();\n        if (count < nodes) { q.offer(++count); }\n        if (count < nodes) { q.offer(++count); }\n    }\n}\nSystem.out.println(level);",
    "codeLanguage": "java",
    "options": [
      "2",
      "3",
      "4",
      "7"
    ],
    "correctIndex": 1,
    "explanation": "A tree of 7 nodes has 3 levels: Root (level 1: 1 node), Level 2 (2 nodes), Level 3 (4 nodes). Total levels = 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q16",
    "question": "In Backtracking, what is the purpose of the \"undo choice\" (backtrack) step?",
    "options": [
      "To restore the shared state so subsequent branches can explore alternatives independently",
      "To delete invalid inputs",
      "To free memory immediately to avoid garbage collection",
      "To sort the output array"
    ],
    "correctIndex": 0,
    "explanation": "Backtracking passes a single mutable state (like a list or chessboard). Restoring the state (e.g. `list.pop()`) allows other branches to execute with the correct parent state.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q17",
    "question": "Trace the output of this Python Longest Common Prefix check:",
    "codeSnippet": "strs = [\"flower\", \"flow\", \"flight\"]\nprefix = strs[0]\nfor s in strs[1:]:\n    while not s.startswith(prefix):\n        prefix = prefix[:-1]\nprint(prefix)",
    "codeLanguage": "python",
    "options": [
      "flow",
      "fl",
      "f",
      "flight"
    ],
    "correctIndex": 1,
    "explanation": "\"flower\" shrinks to \"flow\" against \"flow\", then shrinks to \"fl\" against \"flight\". Output: \"fl\".",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q18",
    "question": "What is the worst-case space complexity of Depth-First Search (DFS) on a skewed graph/tree of V vertices?",
    "options": [
      "O(1)",
      "O(log V)",
      "O(V)",
      "O(V²)"
    ],
    "correctIndex": 2,
    "explanation": "In a skewed tree (or linear graph), the recursion call stack grows to depth V, consuming O(V) stack space.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q19",
    "question": "What is the output of this C code finding the intersection of two sorted arrays `[1, 2, 4, 5]` and `[2, 3, 5, 7]`:",
    "codeSnippet": "int a[] = {1, 2, 4, 5}, b[] = {2, 3, 5, 7};\nint i = 0, j = 0, count = 0;\nwhile (i < 4 && j < 4) {\n    if (a[i] == b[j]) { count++; i++; j++; }\n    else if (a[i] < b[j]) i++;\n    else j++;\n}\nprintf(\"%d\", count);",
    "codeLanguage": "c",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correctIndex": 1,
    "explanation": "Common elements are 2 and 5. count = 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q20",
    "question": "Which operation can be performed in O(1) time on a Doubly Linked List with known pointer to node X?",
    "options": [
      "Delete node X without traversing from head",
      "Search for key K",
      "Sort the list",
      "Find middle node"
    ],
    "correctIndex": 0,
    "explanation": "Because node X has pointers to both `X->prev` and `X->next`, it can rewire `X->prev->next = X->next` and `X->next->prev = X->prev` directly in O(1) time.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q21",
    "question": "Trace the output of this C++ lower_bound simulation for target = 4 in `[1, 2, 4, 4, 5]`:",
    "codeSnippet": "vector<int> a = {1, 2, 4, 4, 5};\nint l = 0, r = 4, ans = 5;\nwhile (l <= r) {\n    int m = l + (r - l) / 2;\n    if (a[m] >= 4) { ans = m; r = m - 1; }\n    else l = m + 1;\n}\ncout << ans;",
    "codeLanguage": "cpp",
    "options": [
      "2",
      "3",
      "4",
      "1"
    ],
    "correctIndex": 0,
    "explanation": "Lower bound finds the first index where element >= 4, which is index 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q22",
    "question": "What is the auxiliary space complexity of Merge Sort on an array of size N?",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N²)"
    ],
    "correctIndex": 2,
    "explanation": "Merge Sort requires an auxiliary array of size O(N) to merge the two sorted halves.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q23",
    "question": "What will be printed by this Java code finding the Inorder Successor of node 3 in BST with Inorder `[1, 2, 3, 4, 5]`?",
    "codeSnippet": "int[] inorder = {1, 2, 3, 4, 5};\nint target = 3, succ = -1;\nfor (int i = 0; i < inorder.length - 1; i++) {\n    if (inorder[i] == target) { succ = inorder[i + 1]; break; }\n}\nSystem.out.println(succ);",
    "codeLanguage": "java",
    "options": [
      "2",
      "4",
      "5",
      "-1"
    ],
    "correctIndex": 1,
    "explanation": "Inorder traversal visits keys in sorted order. The immediate successor of 3 is 4.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q24",
    "question": "What is the time complexity of the House Robber DP problem on N houses?",
    "options": [
      "O(2^N)",
      "O(N)",
      "O(N log N)",
      "O(1)"
    ],
    "correctIndex": 1,
    "explanation": "At each house, we compute `dp[i] = max(dp[i-1], nums[i] + dp[i-2])`, requiring O(1) time per house and O(N) overall.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q25",
    "question": "Trace the output of this Python BFS queue count on a 2D grid component:",
    "codeSnippet": "from collections import deque\ngrid = [[1, 1], [0, 1]]\nq = deque([(0, 0)])\ngrid[0][0] = 0\ncount = 1\nwhile q:\n    r, c = q.popleft()\n    for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:\n        nr, nc = r + dr, c + dc\n        if 0 <= nr < 2 and 0 <= nc < 2 and grid[nr][nc] == 1:\n            grid[nr][nc] = 0\n            count += 1\n            q.append((nr, nc))\nprint(count)",
    "codeLanguage": "python",
    "options": [
      "2",
      "3",
      "4",
      "1"
    ],
    "correctIndex": 1,
    "explanation": "Cells (0,0), (0,1), and (1,1) are all connected 1s. Total visited count = 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q26",
    "question": "Which data structure can be used to implement a Min-Stack with O(1) push, pop, and getMin operations?",
    "options": [
      "Single array with linear scan",
      "Stack paired with an auxiliary stack storing the minimum value at each depth",
      "Binary Search Tree",
      "Circular Queue"
    ],
    "correctIndex": 1,
    "explanation": "An auxiliary stack (or storing pairs of (value, min_so_far)) maintains the minimum element seen up to that stack depth in O(1) time.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q27",
    "question": "Trace the output of this C code rotating an array of size 5 to the right by k = 2:",
    "codeSnippet": "int a[] = {1, 2, 3, 4, 5};\n// Reverse all: {5, 4, 3, 2, 1}\n// Reverse first 2: {4, 5, 3, 2, 1}\n// Reverse remaining 3: {4, 5, 1, 2, 3}\nprintf(\"%d %d %d\", a[0], a[1], a[2]);",
    "codeLanguage": "c",
    "options": [
      "4 5 1",
      "1 2 3",
      "5 4 3",
      "3 4 5"
    ],
    "correctIndex": 0,
    "explanation": "The 3-step reversal algorithm (reverse all, reverse first k, reverse remaining) yields `[4, 5, 1, 2, 3]`. First three elements are 4, 5, 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q28",
    "question": "In a directed graph, what does a \"Back-Edge\" encountered during DFS indicate?",
    "options": [
      "The graph is bipartite",
      "A cycle exists in the directed graph",
      "The graph is disconnected",
      "The edge is redundant in MST"
    ],
    "correctIndex": 1,
    "explanation": "A back-edge connects a vertex to one of its ancestors currently on the active recursion stack, which proves the presence of a directed cycle.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q29",
    "question": "What is the output of this C++ string concatenation test with StringBuilder vs string `+=` in loop of N = 10^5?",
    "codeSnippet": "// Why avoid string s; for(...) s += c; in Java?\n// String is immutable in Java, so s += c creates a new copy of length i each step.",
    "codeLanguage": "cpp",
    "options": [
      "Degrades to O(N²) time due to repeated memory reallocation",
      "Remains O(N) due to compiler optimization",
      "Throws NullPointerException",
      "Takes O(log N) time"
    ],
    "correctIndex": 0,
    "explanation": "Because string concatenation in a loop copies 1 + 2 + ... + N characters, it degrades to O(N²) quadratic time. StringBuilder must be used.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q30",
    "question": "Trace the output of this Java code checking if a linked list of values `[1, 2, 2, 1]` is a palindrome:",
    "codeSnippet": "int[] a = {1, 2, 2, 1};\nboolean pal = true;\nfor (int i = 0; i < 2; i++) {\n    if (a[i] != a[3 - i]) { pal = false; break; }\n}\nSystem.out.println(pal);",
    "codeLanguage": "java",
    "options": [
      "true",
      "false",
      "1",
      "0"
    ],
    "correctIndex": 0,
    "explanation": "a[0] == a[3] (1 == 1) and a[1] == a[2] (2 == 2). The sequence is a palindrome.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q31",
    "question": "What is the time complexity of finding the Longest Increasing Subsequence (LIS) using Binary Search + Patience Sorting (tail array)?",
    "options": [
      "O(N²)",
      "O(N log N)",
      "O(N)",
      "O(2^N)"
    ],
    "correctIndex": 1,
    "explanation": "By maintaining an array of smallest tails and using binary search to replace or extend the sequence, LIS is solved in O(N log N) time.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q32",
    "question": "Trace the output of this Python script counting connected components with DFS:",
    "codeSnippet": "adj = {0: [1], 1: [0], 2: [3], 3: [2], 4: []}\nvisited = set()\ncount = 0\nfor u in adj:\n    if u not in visited:\n        count += 1\n        stack = [u]\n        visited.add(u)\n        while stack:\n            curr = stack.pop()\n            for v in adj[curr]:\n                if v not in visited:\n                    visited.add(v)\n                    stack.append(v)\nprint(count)",
    "codeLanguage": "python",
    "options": [
      "2",
      "3",
      "5",
      "1"
    ],
    "correctIndex": 1,
    "explanation": "The components are {0, 1}, {2, 3}, and {4}. Total count = 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q33",
    "question": "What is the result of applying Inorder Traversal to any valid Binary Search Tree (BST)?",
    "options": [
      "Keys in descending order",
      "Keys in strictly non-decreasing (sorted) order",
      "Random permutation of keys",
      "Level-by-level keys"
    ],
    "correctIndex": 1,
    "explanation": "Because Inorder visits Left (< Root) -> Root -> Right (> Root), it always enumerates BST keys in ascending sorted order.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q34",
    "question": "Trace the output of this C code finding maximum consecutive 1s:",
    "codeSnippet": "int a[] = {1, 1, 0, 1, 1, 1};\nint cur = 0, maxC = 0;\nfor (int i = 0; i < 6; i++) {\n    if (a[i] == 1) { cur++; if (cur > maxC) maxC = cur; }\n    else cur = 0;\n}\nprintf(\"%d\", maxC);",
    "codeLanguage": "c",
    "options": [
      "2",
      "3",
      "5",
      "1"
    ],
    "correctIndex": 1,
    "explanation": "The first streak has length 2; after 0, the second streak has length 3. Maximum consecutive 1s is 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q35",
    "question": "What is the recurrence relation for the Fibonacci sequence?",
    "options": [
      "F(n) = F(n-1) * F(n-2)",
      "F(n) = F(n-1) + F(n-2)",
      "F(n) = 2 * F(n-1)",
      "F(n) = F(n/2) + O(1)"
    ],
    "correctIndex": 1,
    "explanation": "By definition, each Fibonacci number is the sum of the preceding two Fibonacci numbers: F(n) = F(n-1) + F(n-2).",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q36",
    "question": "What will be printed by this C++ code evaluating a Postfix (Reverse Polish Notation) expression `[\"2\", \"3\", \"+\", \"4\", \"*\"]`?",
    "codeSnippet": "#include <iostream>\n#include <stack>\nusing namespace std;\nint main() {\n    stack<int> st;\n    st.push(2);\n    st.push(3);\n    int b = st.top(); st.pop();\n    int a = st.top(); st.pop();\n    st.push(a + b); // 5\n    st.push(4);\n    int d = st.top(); st.pop();\n    int c = st.top(); st.pop();\n    st.push(c * d); // 20\n    cout << st.top();\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "14",
      "20",
      "24",
      "10"
    ],
    "correctIndex": 1,
    "explanation": "(2 + 3) * 4 = 5 * 4 = 20.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q37",
    "question": "What is the time complexity of building an adjacency list for a graph with V vertices and E edges?",
    "options": [
      "O(V²)",
      "O(V + E)",
      "O(E log V)",
      "O(1)"
    ],
    "correctIndex": 1,
    "explanation": "Initializing V list heads takes O(V) and appending each of the E edges takes O(E), totaling O(V + E).",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q38",
    "question": "Trace the output of this Java code finding the intersection of two linked lists using two pointers:",
    "codeSnippet": "// When pointer A reaches end, redirect to head B; when pointer B reaches end, redirect to head A.\n// If lists intersect at node with value 8, both pointers traverse (lenA + lenB) and meet at node 8.\nSystem.out.println(\"Node: 8\");",
    "codeLanguage": "java",
    "options": [
      "Node: 8",
      "Node: null",
      "Node: 0",
      "Node: -1"
    ],
    "correctIndex": 0,
    "explanation": "The two-pointer technique equates the path lengths (lenA + lenB = lenB + lenA), guaranteeing that both pointers collide at the intersection node.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q39",
    "question": "What is the maximum number of edges in a simple undirected graph with V vertices?",
    "options": [
      "V²",
      "V * (V - 1) / 2",
      "2^V",
      "V - 1"
    ],
    "correctIndex": 1,
    "explanation": "Every pair of vertices can have at most one edge between them, giving V choose 2 = V * (V - 1) / 2 edges.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q40",
    "question": "Trace the output of this Python code searching for peak element in `[1, 2, 3, 1]`:",
    "codeSnippet": "a = [1, 2, 3, 1]\nl, r = 0, len(a) - 1\nwhile l < r:\n    m = (l + r) // 2\n    if a[m] > a[m + 1]: r = m\n    else: l = m + 1\nprint(l)",
    "codeLanguage": "python",
    "options": [
      "1",
      "2",
      "3",
      "0"
    ],
    "correctIndex": 1,
    "explanation": "Index 2 has value 3, which is greater than both its neighbors (2 and 1). Output is 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q41",
    "question": "What is the time complexity of finding the K-th smallest element in a BST using Inorder Traversal?",
    "options": [
      "O(N²)",
      "O(H + K) where H is tree height",
      "O(1)",
      "O(N log N)"
    ],
    "correctIndex": 1,
    "explanation": "Traversing in-order stops as soon as the K-th node is visited, taking O(H + K) time and O(H) stack space.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q42",
    "question": "What is printed by this C++ code for 0/1 knapsack base case when capacity W = 0?",
    "codeSnippet": "int dp[10][10] = {0};\ncout << dp[3][0];",
    "codeLanguage": "cpp",
    "options": [
      "0",
      "3",
      "-1",
      "1"
    ],
    "correctIndex": 0,
    "explanation": "With a knapsack capacity of 0, zero items can be held, yielding maximum value of 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q43",
    "question": "Why does a Queue implemented using two Stacks achieve amortized O(1) time per dequeue operation?",
    "options": [
      "Each element is pushed into stack 1 once, transferred to stack 2 once, and popped from stack 2 once",
      "Stack operations take O(log N)",
      "Elements are automatically sorted",
      "Because queues require no memory"
    ],
    "correctIndex": 0,
    "explanation": "Although transferring elements from in-stack to out-stack takes O(K) during an empty out-stack, each element is moved at most once across its lifetime, giving amortized O(1).",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q44",
    "question": "Trace the output of this C code finding the duplicate in array of size 5 containing numbers 1 to 4:",
    "codeSnippet": "int a[] = {1, 3, 4, 2, 2};\nint slow = a[0], fast = a[0];\ndo {\n    slow = a[slow];\n    fast = a[a[fast]];\n} while (slow != fast);\nslow = a[0];\nwhile (slow != fast) {\n    slow = a[slow];\n    fast = a[fast];\n}\nprintf(\"%d\", slow);",
    "codeLanguage": "c",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correctIndex": 1,
    "explanation": "Floyd's Tortoise and Hare on array indices treats values as pointers. The duplicate number forms a cycle entry point at value 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q45",
    "question": "What is the optimal substructure property in Dynamic Programming?",
    "options": [
      "An optimal solution to the problem contains optimal solutions to its subproblems",
      "All subproblems have equal weights",
      "The problem can only be solved using recursion",
      "The table must be 2-dimensional"
    ],
    "correctIndex": 0,
    "explanation": "Optimal substructure means the globally optimal solution can be constructed from the optimal solutions of its constituent subproblems.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q46",
    "question": "What is the output of this Python code generating all permutations of `[1, 2]`:",
    "codeSnippet": "import itertools\nperms = list(itertools.permutations([1, 2]))\nprint(len(perms))",
    "codeLanguage": "python",
    "options": [
      "1",
      "2",
      "4",
      "3"
    ],
    "correctIndex": 1,
    "explanation": "Permutations are `(1, 2)` and `(2, 1)`. Total count is 2! = 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q47",
    "question": "What is the time complexity of checking whether a graph is Bipartite using 2-coloring BFS?",
    "options": [
      "O(V + E)",
      "O(V²)",
      "O(E log V)",
      "O(1)"
    ],
    "correctIndex": 0,
    "explanation": "2-coloring visits each vertex and edge once with a queue, running in standard BFS time: O(V + E).",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q48",
    "question": "Trace the output of this Java code calculating depth of Binary Tree:",
    "codeSnippet": "int maxDepth(int leftH, int rightH) {\n    return 1 + Math.max(leftH, rightH);\n}\nSystem.out.println(maxDepth(2, 3));",
    "codeLanguage": "java",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "correctIndex": 1,
    "explanation": "1 + Math.max(2, 3) = 1 + 3 = 4.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day2-post-q49",
    "question": "What is the space complexity of Breadth-First Search (BFS) on a balanced binary tree of N nodes?",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N) (specifically N/2 nodes in queue at deepest level)",
      "O(N²)"
    ],
    "correctIndex": 2,
    "explanation": "In a balanced binary tree, the last level contains approximately N / 2 leaf nodes, all of which reside in the queue simultaneously: O(N) space.",
    "category": "Theory (30%)"
  },
  {
    "id": "day2-post-q50",
    "question": "What does this C++ snippet compute on vector `a = {10, 9, 2, 5, 3, 7, 101, 18}`?",
    "codeSnippet": "vector<int> a = {10, 9, 2, 5, 3, 7, 101, 18};\nvector<int> dp(8, 1);\nint maxL = 1;\nfor (int i = 0; i < 8; i++) {\n    for (int j = 0; j < i; j++) {\n        if (a[i] > a[j]) dp[i] = max(dp[i], 1 + dp[j]);\n    }\n    maxL = max(maxL, dp[i]);\n}\ncout << maxL;",
    "codeLanguage": "cpp",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "correctIndex": 1,
    "explanation": "This computes Longest Increasing Subsequence (LIS). One valid subsequence of length 4 is `[2, 3, 7, 101]`. maxL = 4.",
    "category": "Practical Execution & Trace (70%)"
  }
];
