import { PracticalChallenge } from '../types';

/**
 * Placement Readiness Program
 * Mentor: Kapil | Day 12: FAANG Hard Dynamic Programming & State-Space Optimization
 * 10 Production-Grade Coding Challenges (C, C++, Java, Python)
 */
export const DAY_12_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  {
    "id": "d12-ch-1",
    "day": 12,
    "title": "Regular Expression Matching ('.' and '*')",
    "difficulty": "Hard",
    "moduleTag": "13. Hard Dynamic Programming",
    "companies": [
      "Google",
      "Meta",
      "Amazon",
      "Apple"
    ],
    "platforms": [
      "LeetCode",
      "HackerRank"
    ],
    "problemStatement": "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n'.' matches any single character.\n'*' matches zero or more of the preceding element.\nThe matching should cover the entire input string (not partial). Return `true` if pattern matches string, else `false`.",
    "inputFormat": "First line: string s.\nSecond line: pattern p.",
    "outputFormat": "`true` or `false`.",
    "constraints": [
      "1 <= s.length <= 20",
      "1 <= p.length <= 20",
      "s contains only lowercase English letters",
      "p contains lowercase English letters, '.', and '*'"
    ],
    "sampleInput": "aa\na*",
    "sampleOutput": "true",
    "kapilIntuition": "Mentorship By Kapil: Let dp[i][j] denote whether s[0..i-1] matches p[0..j-1]. If p[j-1] == '*', the '*' can represent 0 occurrences of p[j-2] (dp[i][j-2]) or 1+ occurrences (if s[i-1] matches p[j-2], then dp[i-1][j]). If characters match directly or p[j-1] == '.', then dp[i][j] = dp[i-1][j-1]. Initialize dp[0][0] = true.",
    "timeComplexity": "O(S * P)",
    "spaceComplexity": "O(S * P)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "aa\na*",
        "expectedOutput": "true",
        "isHidden": false,
        "explanation": "'*' matches zero or more 'a'."
      },
      {
        "id": "tc-2",
        "input": "mississippi\nmis*is*p*.",
        "expectedOutput": "false",
        "isHidden": false,
        "explanation": "Mismatch on ending letters."
      },
      {
        "id": "tc-3",
        "input": "ab\n.*",
        "expectedOutput": "true",
        "isHidden": true,
        "explanation": "'.*' matches any sequence."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n#include <stdbool.h>\n\nint main() {\n    char s[64], p[64];\n    if (scanf(\"%63s %63s\", s, p) != 2) return 0;\n    // Implement Regular Expression Matching DP\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    string s, p;\n    if (!(cin >> s >> p)) return 0;\n    // Implement Regular Expression Matching DP\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        String p = sc.next();\n        // Implement Regular Expression Matching DP\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if len(lines) < 2:\n        return\n    s, p = lines[0], lines[1]\n    # Implement Regular Expression Matching DP\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n#include <stdbool.h>\n\nint main() {\n    char s[64], p[64];\n    if (scanf(\"%63s %63s\", s, p) != 2) return 0;\n    int m = strlen(s), n = strlen(p);\n    bool dp[64][64];\n    memset(dp, 0, sizeof(dp));\n    dp[0][0] = true;\n\n    for (int j = 2; j <= n; j += 2) {\n        if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2];\n    }\n\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (p[j - 1] == '*') {\n                dp[i][j] = dp[i][j - 2];\n                if (p[j - 2] == '.' || p[j - 2] == s[i - 1]) {\n                    dp[i][j] = dp[i][j] || dp[i - 1][j];\n                }\n            } else if (p[j - 1] == '.' || p[j - 1] == s[i - 1]) {\n                dp[i][j] = dp[i - 1][j - 1];\n            }\n        }\n    }\n    printf(\"%s\\n\", dp[m][n] ? \"true\" : \"false\");\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    string s, p;\n    if (!(cin >> s >> p)) return 0;\n    int m = s.size(), n = p.size();\n    vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));\n    dp[0][0] = true;\n\n    for (int j = 2; j <= n; ++j) {\n        if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2];\n    }\n\n    for (int i = 1; i <= m; ++i) {\n        for (int j = 1; j <= n; ++j) {\n            if (p[j - 1] == '*') {\n                dp[i][j] = dp[i][j - 2];\n                if (p[j - 2] == '.' || p[j - 2] == s[i - 1]) {\n                    dp[i][j] = dp[i][j] || dp[i - 1][j];\n                }\n            } else if (p[j - 1] == '.' || p[j - 1] == s[i - 1]) {\n                dp[i][j] = dp[i - 1][j - 1];\n            }\n        }\n    }\n    cout << (dp[m][n] ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        String p = sc.next();\n        int m = s.length(), n = p.length();\n        boolean[][] dp = new boolean[m + 1][n + 1];\n        dp[0][0] = true;\n\n        for (int j = 2; j <= n; j++) {\n            if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 2];\n        }\n\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (p.charAt(j - 1) == '*') {\n                    dp[i][j] = dp[i][j - 2];\n                    if (p.charAt(j - 2) == '.' || p.charAt(j - 2) == s.charAt(i - 1)) {\n                        dp[i][j] = dp[i][j] || dp[i - 1][j];\n                    }\n                } else if (p.charAt(j - 1) == '.' || p.charAt(j - 1) == s.charAt(i - 1)) {\n                    dp[i][j] = dp[i - 1][j - 1];\n                }\n            }\n        }\n        System.out.println(dp[m][n] ? \"true\" : \"false\");\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if len(lines) < 2:\n        return\n    s, p = lines[0], lines[1]\n    m, n = len(s), len(p)\n    dp = [[False] * (n + 1) for _ in range(m + 1)]\n    dp[0][0] = True\n\n    for j in range(2, n + 1):\n        if p[j - 1] == '*':\n            dp[0][j] = dp[0][j - 2]\n\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if p[j - 1] == '*':\n                dp[i][j] = dp[i][j - 2]\n                if p[j - 2] == '.' or p[j - 2] == s[i - 1]:\n                    dp[i][j] = dp[i][j] or dp[i - 1][j]\n            elif p[j - 1] == '.' or p[j - 1] == s[i - 1]:\n                dp[i][j] = dp[i - 1][j - 1]\n\n    print(\"true\" if dp[m][n] else \"false\")\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d12-ch-2",
    "day": 12,
    "title": "Best Time to Buy and Sell Stock IV (At Most K Transactions)",
    "difficulty": "Hard",
    "moduleTag": "13. Hard Dynamic Programming",
    "companies": [
      "Citadel",
      "Amazon",
      "Goldman Sachs"
    ],
    "platforms": [
      "LeetCode",
      "InterviewBit"
    ],
    "problemStatement": "You are given an integer array prices where prices[i] is the price of a given stock on the i-th day, and an integer k. Find the maximum profit you can achieve with at most k transactions. Note: You may not engage in multiple transactions simultaneously (i.e., you must sell before buying again).",
    "inputFormat": "First line: K N (max transactions and number of days).\nSecond line: N integers representing prices.",
    "outputFormat": "Single integer representing maximum achievable profit.",
    "constraints": [
      "1 <= k <= 100",
      "1 <= N <= 1000",
      "0 <= prices[i] <= 1000"
    ],
    "sampleInput": "2 6\n3 2 6 5 0 3",
    "sampleOutput": "7",
    "kapilIntuition": "Mentorship By Kapil: If k >= N/2, it reduces to greedy unlimited transactions (Stock II). Otherwise, define buy[t] and sell[t] for t in 1..k. buy[t] = max(buy[t], sell[t-1] - price) and sell[t] = max(sell[t], buy[t] + price). Initialize buy[t] = -infinity and sell[t] = 0. Iterate through all prices and update from t = 1 to k.",
    "timeComplexity": "O(N * K)",
    "spaceComplexity": "O(K)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "2 6\n3 2 6 5 0 3",
        "expectedOutput": "7",
        "isHidden": false,
        "explanation": "Buy day 2 (2), sell day 3 (6) profit 4; Buy day 5 (0), sell day 6 (3) profit 3. Total 7."
      },
      {
        "id": "tc-2",
        "input": "2 3\n2 4 1",
        "expectedOutput": "2",
        "isHidden": false,
        "explanation": "Buy day 1 (2), sell day 2 (4) profit 2."
      },
      {
        "id": "tc-3",
        "input": "1 5\n1 2 3 4 5",
        "expectedOutput": "4",
        "isHidden": true,
        "explanation": "Single transaction buying at 1 and selling at 5."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int K, N;\n    if (scanf(\"%d %d\", &K, &N) != 2) return 0;\n    // Implement Stock IV DP\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int K, N;\n    if (!(cin >> K >> N)) return 0;\n    // Implement Stock IV DP\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int K = sc.nextInt();\n        int N = sc.nextInt();\n        // Implement Stock IV DP\n    }\n}",
      "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    k = int(input_data[0])\n    n = int(input_data[1])\n    prices = [int(x) for x in input_data[2:]]\n    # Implement Stock IV DP\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n\nint main() {\n    int K, N;\n    if (scanf(\"%d %d\", &K, &N) != 2) return 0;\n    int prices[1005];\n    for (int i = 0; i < N; i++) scanf(\"%d\", &prices[i]);\n    if (N <= 1 || K == 0) { printf(\"0\\n\"); return 0; }\n\n    if (K >= N / 2) {\n        int profit = 0;\n        for (int i = 1; i < N; i++) {\n            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];\n        }\n        printf(\"%d\\n\", profit);\n        return 0;\n    }\n\n    int buy[105], sell[105];\n    for (int t = 0; t <= K; t++) {\n        buy[t] = -1000000000;\n        sell[t] = 0;\n    }\n\n    for (int i = 0; i < N; i++) {\n        int p = prices[i];\n        for (int t = 1; t <= K; t++) {\n            buy[t] = MAX(buy[t], sell[t - 1] - p);\n            sell[t] = MAX(sell[t], buy[t] + p);\n        }\n    }\n    printf(\"%d\\n\", sell[K]);\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    int K, N;\n    if (!(cin >> K >> N)) return 0;\n    vector<int> prices(N);\n    for (int i = 0; i < N; ++i) cin >> prices[i];\n    if (N <= 1 || K == 0) { cout << 0 << endl; return 0; }\n\n    if (K >= N / 2) {\n        int profit = 0;\n        for (int i = 1; i < N; ++i) {\n            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];\n        }\n        cout << profit << endl;\n        return 0;\n    }\n\n    vector<int> buy(K + 1, -1e9), sell(K + 1, 0);\n    for (int p : prices) {\n        for (int t = 1; t <= K; ++t) {\n            buy[t] = max(buy[t], sell[t - 1] - p);\n            sell[t] = max(sell[t], buy[t] + p);\n        }\n    }\n    cout << sell[K] << endl;\n    return 0;\n}",
      "java": "import java.util.Scanner;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int K = sc.nextInt();\n        int N = sc.nextInt();\n        int[] prices = new int[N];\n        for (int i = 0; i < N; i++) prices[i] = sc.nextInt();\n        if (N <= 1 || K == 0) { System.out.println(0); return; }\n\n        if (K >= N / 2) {\n            int profit = 0;\n            for (int i = 1; i < N; i++) {\n                if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];\n            }\n            System.out.println(profit);\n            return;\n        }\n\n        int[] buy = new int[K + 1];\n        int[] sell = new int[K + 1];\n        Arrays.fill(buy, -1_000_000_000);\n\n        for (int p : prices) {\n            for (int t = 1; t <= K; t++) {\n                buy[t] = Math.max(buy[t], sell[t - 1] - p);\n                sell[t] = Math.max(sell[t], buy[t] + p);\n            }\n        }\n        System.out.println(sell[K]);\n    }\n}",
      "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    k = int(input_data[0])\n    n = int(input_data[1])\n    prices = [int(x) for x in input_data[2:]]\n    if n <= 1 or k == 0:\n        print(0)\n        return\n\n    if k >= n // 2:\n        print(sum(max(0, prices[i] - prices[i - 1]) for i in range(1, n)))\n        return\n\n    buy = [-float('inf')] * (k + 1)\n    sell = [0] * (k + 1)\n\n    for p in prices:\n        for t in range(1, k + 1):\n            buy[t] = max(buy[t], sell[t - 1] - p)\n            sell[t] = max(sell[t], buy[t] + p)\n\n    print(sell[k])\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d12-ch-3",
    "day": 12,
    "title": "Shortest Path Visiting All Nodes (Bitmask BFS/DP)",
    "difficulty": "Hard",
    "moduleTag": "13. Hard Dynamic Programming",
    "companies": [
      "Uber",
      "Apple",
      "Google"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "You have an undirected, connected graph of n nodes labeled from 0 to n - 1. You are given an integer N and M edges. Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.",
    "inputFormat": "First line: N M (number of nodes and edges).\nNext M lines: u v (undirected edge).",
    "outputFormat": "Single integer representing the minimum number of steps.",
    "constraints": [
      "1 <= N <= 12",
      "0 <= M <= 50",
      "Graph is connected"
    ],
    "sampleInput": "4 3\n0 1\n0 2\n0 3",
    "sampleOutput": "4",
    "kapilIntuition": "Mentorship By Kapil: Since N <= 12, the visited set can be modeled as a bitmask of length N. The state is (mask, current_node). Initialize a queue with all start nodes: (1 << i, i) with distance 0. Run BFS: for each state, transition to all adjacent neighbors `v` with state (mask | (1 << v), v). The first time mask == (1 << N) - 1 is dequeued, return the step count.",
    "timeComplexity": "O(N * 2^N)",
    "spaceComplexity": "O(N * 2^N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "4 3\n0 1\n0 2\n0 3",
        "expectedOutput": "4",
        "isHidden": false,
        "explanation": "Path: 1 -> 0 -> 2 -> 0 -> 3 (4 edges)."
      },
      {
        "id": "tc-2",
        "input": "4 4\n0 1\n0 2\n0 3\n2 3",
        "expectedOutput": "4",
        "isHidden": false,
        "explanation": "Visits all nodes in 4 steps."
      },
      {
        "id": "tc-3",
        "input": "1 0",
        "expectedOutput": "0",
        "isHidden": true,
        "explanation": "Single node requires 0 steps."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdbool.h>\n\nint main() {\n    int N, M;\n    if (scanf(\"%d %d\", &N, &M) != 2) return 0;\n    // Implement Bitmask BFS\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\nint main() {\n    int N, M;\n    if (!(cin >> N >> M)) return 0;\n    // Implement Bitmask BFS\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int M = sc.nextInt();\n        // Implement Bitmask BFS\n    }\n}",
      "python": "import sys\nimport collections\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, m = int(lines[0]), int(lines[1])\n    # Implement Bitmask BFS\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdbool.h>\n\ntypedef struct {\n    int mask, u, dist;\n} State;\n\nState queue[1 << 16];\nbool visited[1 << 12][12];\n\nint main() {\n    int N, M;\n    if (scanf(\"%d %d\", &N, &M) != 2) return 0;\n    if (N <= 1) { printf(\"0\\n\"); return 0; }\n\n    int adj[12][12];\n    int adjSize[12] = {0};\n    for (int i = 0; i < M; i++) {\n        int u, v;\n        scanf(\"%d %d\", &u, &v);\n        adj[u][adjSize[u]++] = v;\n        adj[v][adjSize[v]++] = u;\n    }\n\n    int head = 0, tail = 0;\n    int targetMask = (1 << N) - 1;\n\n    for (int i = 0; i < N; i++) {\n        int mask = 1 << i;\n        queue[tail++] = (State){mask, i, 0};\n        visited[mask][i] = true;\n    }\n\n    while (head < tail) {\n        State cur = queue[head++];\n        if (cur.mask == targetMask) {\n            printf(\"%d\\n\", cur.dist);\n            return 0;\n        }\n\n        for (int i = 0; i < adjSize[cur.u]; i++) {\n            int v = adj[cur.u][i];\n            int nextMask = cur.mask | (1 << v);\n            if (!visited[nextMask][v]) {\n                visited[nextMask][v] = true;\n                queue[tail++] = (State){nextMask, v, cur.dist + 1};\n            }\n        }\n    }\n    printf(\"0\\n\");\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\nstruct State {\n    int mask, u, dist;\n};\n\nint main() {\n    int N, M;\n    if (!(cin >> N >> M)) return 0;\n    if (N <= 1) { cout << 0 << endl; return 0; }\n\n    vector<vector<int>> adj(N);\n    for (int i = 0; i < M; ++i) {\n        int u, v; cin >> u >> v;\n        adj[u].push_back(v);\n        adj[v].push_back(u);\n    }\n\n    queue<State> q;\n    vector<vector<bool>> visited(1 << N, vector<bool>(N, false));\n    int target = (1 << N) - 1;\n\n    for (int i = 0; i < N; ++i) {\n        q.push({1 << i, i, 0});\n        visited[1 << i][i] = true;\n    }\n\n    while (!q.empty()) {\n        auto [mask, u, dist] = q.front(); q.pop();\n        if (mask == target) {\n            cout << dist << endl;\n            return 0;\n        }\n\n        for (int v : adj[u]) {\n            int nextMask = mask | (1 << v);\n            if (!visited[nextMask][v]) {\n                visited[nextMask][v] = true;\n                q.push({nextMask, v, dist + 1});\n            }\n        }\n    }\n    cout << 0 << endl;\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int M = sc.nextInt();\n        if (N <= 1) { System.out.println(0); return; }\n\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < N; i++) adj.add(new ArrayList<>());\n        for (int i = 0; i < M; i++) {\n            int u = sc.nextInt();\n            int v = sc.nextInt();\n            adj.get(u).add(v);\n            adj.get(v).add(u);\n        }\n\n        Queue<int[]> q = new ArrayDeque<>();\n        boolean[][] visited = new boolean[1 << N][N];\n        int target = (1 << N) - 1;\n\n        for (int i = 0; i < N; i++) {\n            q.add(new int[]{1 << i, i, 0});\n            visited[1 << i][i] = true;\n        }\n\n        while (!q.isEmpty()) {\n            int[] cur = q.poll();\n            int mask = cur[0], u = cur[1], dist = cur[2];\n            if (mask == target) {\n                System.out.println(dist);\n                return;\n            }\n\n            for (int v : adj.get(u)) {\n                int nextMask = mask | (1 << v);\n                if (!visited[nextMask][v]) {\n                    visited[nextMask][v] = true;\n                    q.add(new int[]{nextMask, v, dist + 1});\n                }\n            }\n        }\n        System.out.println(0);\n    }\n}",
      "python": "import sys\nimport collections\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, m = int(lines[0]), int(lines[1])\n    if n <= 1:\n        print(0)\n        return\n\n    adj = collections.defaultdict(list)\n    idx = 2\n    for _ in range(m):\n        u, v = int(lines[idx]), int(lines[idx + 1])\n        idx += 2\n        adj[u].append(v)\n        adj[v].append(u)\n\n    target = (1 << n) - 1\n    q = collections.deque()\n    visited = set()\n\n    for i in range(n):\n        mask = 1 << i\n        q.append((mask, i, 0))\n        visited.add((mask, i))\n\n    while q:\n        mask, u, dist = q.popleft()\n        if mask == target:\n            print(dist)\n            return\n\n        for v in adj[u]:\n            nxt_mask = mask | (1 << v)\n            if (nxt_mask, v) not in visited:\n                visited.add((nxt_mask, v))\n                q.append((nxt_mask, v, dist + 1))\n\n    print(0)\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d12-ch-4",
    "day": 12,
    "title": "Binary Tree Maximum Path Sum",
    "difficulty": "Hard",
    "moduleTag": "13. Hard Dynamic Programming",
    "companies": [
      "Meta",
      "Microsoft",
      "Amazon"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Given the root of a binary tree represented in level-order format (with `null` for missing nodes), return the maximum path sum of any non-empty path.",
    "inputFormat": "Single line: level-order traversal of the tree with values or `null`.",
    "outputFormat": "Single integer representing the maximum path sum.",
    "constraints": [
      "1 <= Number of nodes <= 3 * 10^4",
      "-1000 <= Node.val <= 1000"
    ],
    "sampleInput": "-10 9 20 null null 15 7",
    "sampleOutput": "42",
    "kapilIntuition": "Mentorship By Kapil: At each node u, compute the maximum gain from its left and right subtrees (pruning negative sums with max(0, gain)). The maximum path passing THROUGH node u is u.val + leftGain + rightGain, which updates globalMax. The function returns u.val + max(leftGain, rightGain) to its parent, as a valid path cannot branch twice.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(H) where H is height of the tree",
    "testCases": [
      {
        "id": "tc-1",
        "input": "-10 9 20 null null 15 7",
        "expectedOutput": "42",
        "isHidden": false,
        "explanation": "Optimal path: 15 -> 20 -> 7 gives 15 + 20 + 7 = 42."
      },
      {
        "id": "tc-2",
        "input": "1 2 3",
        "expectedOutput": "6",
        "isHidden": false,
        "explanation": "Optimal path: 2 -> 1 -> 3 gives 6."
      },
      {
        "id": "tc-3",
        "input": "-3",
        "expectedOutput": "-3",
        "isHidden": true,
        "explanation": "Single negative node."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    // Parse level order and compute Max Path Sum\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    // Parse level order and compute Max Path Sum\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Parse level order and compute Max Path Sum\n    }\n}",
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    # Parse level order and compute Max Path Sum\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n\ntypedef struct TreeNode {\n    int val;\n    struct TreeNode *left, *right;\n} TreeNode;\n\nint globalMax = -1000000000;\n\nint maxGain(TreeNode* root) {\n    if (!root) return 0;\n    int leftGain = MAX(0, maxGain(root->left));\n    int rightGain = MAX(0, maxGain(root->right));\n    int priceNewPath = root->val + leftGain + rightGain;\n    if (priceNewPath > globalMax) globalMax = priceNewPath;\n    return root->val + MAX(leftGain, rightGain);\n}\n\nint main() {\n    char token[32];\n    TreeNode* nodes[30005];\n    int count = 0;\n\n    while (scanf(\"%31s\", token) == 1) {\n        if (strcmp(token, \"null\") == 0) {\n            nodes[count++] = NULL;\n        } else {\n            TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));\n            node->val = atoi(token);\n            node->left = node->right = NULL;\n            nodes[count++] = node;\n        }\n    }\n    if (count == 0 || nodes[0] == NULL) { printf(\"0\\n\"); return 0; }\n\n    int childIdx = 1;\n    for (int i = 0; i < count && childIdx < count; i++) {\n        if (nodes[i]) {\n            if (childIdx < count) nodes[i]->left = nodes[childIdx++];\n            if (childIdx < count) nodes[i]->right = nodes[childIdx++];\n        }\n    }\n\n    maxGain(nodes[0]);\n    printf(\"%d\\n\", globalMax);\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <queue>\n\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left = nullptr, *right = nullptr;\n    TreeNode(int v) : val(v) {}\n};\n\nint globalMax = -1e9;\n\nint maxGain(TreeNode* root) {\n    if (!root) return 0;\n    int leftGain = max(0, maxGain(root->left));\n    int rightGain = max(0, maxGain(root->right));\n    globalMax = max(globalMax, root->val + leftGain + rightGain);\n    return root->val + max(leftGain, rightGain);\n}\n\nint main() {\n    string s;\n    vector<string> tokens;\n    while (cin >> s) tokens.push_back(s);\n    if (tokens.empty() || tokens[0] == \"null\") { cout << 0 << endl; return 0; }\n\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* curr = q.front(); q.pop();\n        if (i < tokens.size() && tokens[i] != \"null\") {\n            curr->left = new TreeNode(stoi(tokens[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < tokens.size() && tokens[i] != \"null\") {\n            curr->right = new TreeNode(stoi(tokens[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n\n    maxGain(root);\n    cout << globalMax << endl;\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    static class TreeNode {\n        int val;\n        TreeNode left, right;\n        TreeNode(int v) { this.val = v; }\n    }\n\n    static int globalMax = -1_000_000_000;\n\n    static int maxGain(TreeNode root) {\n        if (root == null) return 0;\n        int leftGain = Math.max(0, maxGain(root.left));\n        int rightGain = Math.max(0, maxGain(root.right));\n        globalMax = Math.max(globalMax, root.val + leftGain + rightGain);\n        return root.val + Math.max(leftGain, rightGain);\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<String> tokens = new ArrayList<>();\n        while (sc.hasNext()) tokens.add(sc.next());\n        if (tokens.isEmpty() || tokens.get(0).equals(\"null\")) {\n            System.out.println(0);\n            return;\n        }\n\n        TreeNode root = new TreeNode(Integer.parseInt(tokens.get(0)));\n        Queue<TreeNode> q = new ArrayDeque<>();\n        q.add(root);\n        int i = 1;\n\n        while (!q.isEmpty() && i < tokens.size()) {\n            TreeNode curr = q.poll();\n            if (i < tokens.size() && !tokens.get(i).equals(\"null\")) {\n                curr.left = new TreeNode(Integer.parseInt(tokens.get(i)));\n                q.add(curr.left);\n            }\n            i++;\n            if (i < tokens.size() && !tokens.get(i).equals(\"null\")) {\n                curr.right = new TreeNode(Integer.parseInt(tokens.get(i)));\n                q.add(curr.right);\n            }\n            i++;\n        }\n\n        maxGain(root);\n        System.out.println(globalMax);\n    }\n}",
      "python": "import sys\nimport collections\n\nclass TreeNode:\n    def __init__(self, val=0):\n        self.val = val\n        self.left = None\n        self.right = None\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens or tokens[0] == \"null\":\n        print(0)\n        return\n\n    root = TreeNode(int(tokens[0]))\n    q = collections.deque([root])\n    i = 1\n\n    while q and i < len(tokens):\n        curr = q.popleft()\n        if i < len(tokens) and tokens[i] != \"null\":\n            curr.left = TreeNode(int(tokens[i]))\n            q.append(curr.left)\n        i += 1\n        if i < len(tokens) and tokens[i] != \"null\":\n            curr.right = TreeNode(int(tokens[i]))\n            q.append(curr.right)\n        i += 1\n\n    global_max = -float('inf')\n\n    def max_gain(node):\n        nonlocal global_max\n        if not node:\n            return 0\n        left = max(0, max_gain(node.left))\n        right = max(0, max_gain(node.right))\n        global_max = max(global_max, node.val + left + right)\n        return node.val + max(left, right)\n\n    max_gain(root)\n    print(global_max)\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d12-ch-5",
    "day": 12,
    "title": "Constrained Subsequence Sum (Monotonic Deque DP)",
    "difficulty": "Hard",
    "moduleTag": "13. Hard Dynamic Programming",
    "companies": [
      "Google",
      "Citadel",
      "ByteDance"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "Given an integer array nums and an integer k, return the maximum sum of a non-empty subsequence of that array such that for every two consecutive integers in the subsequence, nums[i] and nums[j], where i < j, the condition j - i <= k is satisfied.",
    "inputFormat": "First line: N K (array size and window size).\nSecond line: N space-separated integers.",
    "outputFormat": "Single integer representing maximum subsequence sum.",
    "constraints": [
      "1 <= k <= N <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "sampleInput": "5 2\n10 2 -10 5 20",
    "sampleOutput": "37",
    "kapilIntuition": "Mentorship By Kapil: Let dp[i] = nums[i] + max(0, max_{i-k <= j < i} dp[j]). A naive scan takes O(N * K) time. We optimize this using a monotonically decreasing deque of indices storing optimal DP values. Pop outdated indices (index < i - k) from the front in O(1). The front element is the maximum in the window. Before pushing i, pop all elements from the back where dp[back] <= dp[i]. Total time is O(N).",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "5 2\n10 2 -10 5 20",
        "expectedOutput": "37",
        "isHidden": false,
        "explanation": "Subsequence [10, 2, 5, 20] sums to 37 with steps <= 2."
      },
      {
        "id": "tc-2",
        "input": "4 2\n-1 -2 -3 -4",
        "expectedOutput": "-1",
        "isHidden": false,
        "explanation": "Must pick at least one element: max is -1."
      },
      {
        "id": "tc-3",
        "input": "6 1\n10 -2 -10 -5 20 1",
        "expectedOutput": "23",
        "isHidden": true,
        "explanation": "Pick [10, -2, -10, -5, 20, 1] or appropriate steps."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N, K;\n    if (scanf(\"%d %d\", &N, &K) != 2) return 0;\n    // Implement Monotonic Deque DP\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <deque>\n\nusing namespace std;\n\nint main() {\n    int N, K;\n    if (!(cin >> N >> K)) return 0;\n    // Implement Monotonic Deque DP\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int K = sc.nextInt();\n        // Implement Monotonic Deque DP\n    }\n}",
      "python": "import sys\nimport collections\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:]]\n    # Implement Monotonic Deque DP\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\n#define MAX_N 100005\n\nint main() {\n    int N, K;\n    if (scanf(\"%d %d\", &N, &K) != 2) return 0;\n    int nums[MAX_N], dp[MAX_N], dq[MAX_N];\n    for (int i = 0; i < N; i++) scanf(\"%d\", &nums[i]);\n\n    int head = 0, tail = 0;\n    int maxSum = nums[0];\n\n    for (int i = 0; i < N; i++) {\n        while (head < tail && dq[head] < i - K) head++;\n\n        int prevMax = (head < tail && dp[dq[head]] > 0) ? dp[dq[head]] : 0;\n        dp[i] = nums[i] + prevMax;\n        if (dp[i] > maxSum) maxSum = dp[i];\n\n        while (head < tail && dp[dq[tail - 1]] <= dp[i]) tail--;\n        dq[tail++] = i;\n    }\n    printf(\"%d\\n\", maxSum);\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <deque>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    int N, K;\n    if (!(cin >> N >> K)) return 0;\n    vector<int> nums(N);\n    for (int i = 0; i < N; ++i) cin >> nums[i];\n\n    vector<int> dp(N);\n    deque<int> dq;\n    int maxSum = nums[0];\n\n    for (int i = 0; i < N; ++i) {\n        if (!dq.empty() && dq.front() < i - K) dq.pop_front();\n\n        dp[i] = nums[i] + (!dq.empty() && dp[dq.front()] > 0 ? dp[dq.front()] : 0);\n        maxSum = max(maxSum, dp[i]);\n\n        while (!dq.empty() && dp[dq.back()] <= dp[i]) dq.pop_back();\n        dq.push_back(i);\n    }\n    cout << maxSum << endl;\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int K = sc.nextInt();\n        int[] nums = new int[N];\n        for (int i = 0; i < N; i++) nums[i] = sc.nextInt();\n\n        int[] dp = new int[N];\n        Deque<Integer> dq = new ArrayDeque<>();\n        int maxSum = nums[0];\n\n        for (int i = 0; i < N; i++) {\n            if (!dq.isEmpty() && dq.peekFirst() < i - K) dq.pollFirst();\n\n            dp[i] = nums[i] + (!dq.isEmpty() && dp[dq.peekFirst()] > 0 ? dp[dq.peekFirst()] : 0);\n            maxSum = Math.max(maxSum, dp[i]);\n\n            while (!dq.isEmpty() && dp[dq.peekLast()] <= dp[i]) dq.pollLast();\n            dq.addLast(i);\n        }\n        System.out.println(maxSum);\n    }\n}",
      "python": "import sys\nimport collections\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:]]\n\n    dp = [0] * n\n    dq = collections.deque()\n    max_sum = nums[0]\n\n    for i, x in enumerate(nums):\n        if dq and dq[0] < i - k:\n            dq.popleft()\n\n        prev_max = dp[dq[0]] if dq and dp[dq[0]] > 0 else 0\n        dp[i] = x + prev_max\n        if dp[i] > max_sum:\n            max_sum = dp[i]\n\n        while dq and dp[dq[-1]] <= dp[i]:\n            dq.pop()\n        dq.append(i)\n\n    print(max_sum)\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d12-ch-6",
    "day": 12,
    "title": "Burst Balloons (Interval DP)",
    "difficulty": "Hard",
    "moduleTag": "13. Hard Dynamic Programming",
    "companies": [
      "Amazon",
      "Apple",
      "Meta"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons. If you burst balloon i you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it. Return the maximum coins you can collect by bursting the balloons wisely.",
    "inputFormat": "First line: N (number of balloons).\nSecond line: N space-separated integers.",
    "outputFormat": "Single integer representing maximum coins collected.",
    "constraints": [
      "1 <= N <= 300",
      "0 <= nums[i] <= 100"
    ],
    "sampleInput": "4\n3 1 5 8",
    "sampleOutput": "167",
    "kapilIntuition": "Mentorship By Kapil: Reverse the thinking! Instead of choosing which balloon to burst first (which causes dependencies), choose which balloon k is burst LAST in range [i, j]. Because balloon k is the last balloon burst in [i, j], its adjacent balloons when it bursts are guaranteed to be nums[i-1] and nums[j+1]. Hence: dp[i][j] = max_{k} (dp[i][k-1] + dp[k+1][j] + nums[i-1] * nums[k] * nums[j+1]).",
    "timeComplexity": "O(N^3)",
    "spaceComplexity": "O(N^2)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "4\n3 1 5 8",
        "expectedOutput": "167",
        "isHidden": false,
        "explanation": "nums = [3,1,5,8] -> [3,5,8] -> [3,8] -> [8] -> [] gives coins 167."
      },
      {
        "id": "tc-2",
        "input": "2\n1 5",
        "expectedOutput": "10",
        "isHidden": false,
        "explanation": "Burst 1 then 5: 1*1*5 + 1*5*1 = 10."
      },
      {
        "id": "tc-3",
        "input": "1\n9",
        "expectedOutput": "9",
        "isHidden": true,
        "explanation": "Single balloon: 1 * 9 * 1 = 9."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N;\n    if (scanf(\"%d\", &N) != 1) return 0;\n    // Implement Interval DP\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N;\n    if (!(cin >> N)) return 0;\n    // Implement Interval DP\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        // Implement Interval DP\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:]]\n    # Implement Interval DP\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n\nint main() {\n    int N;\n    if (scanf(\"%d\", &N) != 1) return 0;\n    int val[305];\n    val[0] = 1;\n    for (int i = 0; i < N; i++) scanf(\"%d\", &val[i + 1]);\n    val[N + 1] = 1;\n\n    int dp[305][305];\n    memset(dp, 0, sizeof(dp));\n\n    for (int len = 1; len <= N; len++) {\n        for (int left = 1; left <= N - len + 1; left++) {\n            int right = left + len - 1;\n            for (int k = left; k <= right; k++) {\n                int coins = val[left - 1] * val[k] * val[right + 1] + dp[left][k - 1] + dp[k + 1][right];\n                dp[left][right] = MAX(dp[left][right], coins);\n            }\n        }\n    }\n    printf(\"%d\\n\", dp[1][N]);\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    int N;\n    if (!(cin >> N)) return 0;\n    vector<int> val(N + 2, 1);\n    for (int i = 0; i < N; ++i) cin >> val[i + 1];\n\n    vector<vector<int>> dp(N + 2, vector<int>(N + 2, 0));\n\n    for (int len = 1; len <= N; ++len) {\n        for (int left = 1; left <= N - len + 1; ++left) {\n            int right = left + len - 1;\n            for (int k = left; k <= right; ++k) {\n                int coins = val[left - 1] * val[k] * val[right + 1] + dp[left][k - 1] + dp[k + 1][right];\n                dp[left][right] = max(dp[left][right], coins);\n            }\n        }\n    }\n    cout << dp[1][N] << endl;\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int[] val = new int[N + 2];\n        val[0] = 1;\n        for (int i = 0; i < N; i++) val[i + 1] = sc.nextInt();\n        val[N + 1] = 1;\n\n        int[][] dp = new int[N + 2][N + 2];\n\n        for (int len = 1; len <= N; len++) {\n            for (int left = 1; left <= N - len + 1; left++) {\n                int right = left + len - 1;\n                for (int k = left; k <= right; k++) {\n                    int coins = val[left - 1] * val[k] * val[right + 1] + dp[left][k - 1] + dp[k + 1][right];\n                    dp[left][right] = Math.max(dp[left][right], coins);\n                }\n            }\n        }\n        System.out.println(dp[1][N]);\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:]]\n    val = [1] + nums + [1]\n    dp = [[0] * (n + 2) for _ in range(n + 2)]\n\n    for length in range(1, n + 1):\n        for left in range(1, n - length + 2):\n            right = left + length - 1\n            for k in range(left, right + 1):\n                coins = val[left - 1] * val[k] * val[right + 1] + dp[left][k - 1] + dp[k + 1][right]\n                if coins > dp[left][right]:\n                    dp[left][right] = coins\n\n    print(dp[1][n])\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d12-ch-7",
    "day": 12,
    "title": "Sum of Distances in Tree (Tree DP Re-rooting)",
    "difficulty": "Hard",
    "moduleTag": "13. Hard Dynamic Programming",
    "companies": [
      "Google",
      "Uber",
      "Microsoft"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "There is an undirected connected tree with n nodes labeled from 0 to n - 1 and n - 1 edges. You are given the integer n and the edges. Return an array ans of length n where ans[i] is the sum of the distances between the i-th node in the tree and all other nodes.",
    "inputFormat": "First line: N (number of nodes).\nNext N-1 lines: u v (undirected tree edges).",
    "outputFormat": "Space-separated integers representing ans[0] ans[1] ... ans[N-1].",
    "constraints": [
      "1 <= N <= 3 * 10^4",
      "edges.length == N - 1",
      "Tree is connected and acyclic"
    ],
    "sampleInput": "6\n0 1\n0 2\n2 3\n2 4\n2 5",
    "sampleOutput": "8 12 6 10 10 10",
    "kapilIntuition": "Mentorship By Kapil: Use 2-Pass Tree DP Re-rooting. Pass 1 (Post-order DFS): root arbitrarily at 0. Compute count[u] (subtree size) and ans[0] (sum of distances in subtree). Pass 2 (Pre-order DFS): when root shifts from parent u to child v, v moves 1 step closer to all count[v] nodes in its subtree (-count[v]), and 1 step further from all other (N - count[v]) nodes (+ N - count[v]). Hence: ans[v] = ans[u] + N - 2 * count[v].",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "6\n0 1\n0 2\n2 3\n2 4\n2 5",
        "expectedOutput": "8 12 6 10 10 10",
        "isHidden": false,
        "explanation": "Distance sums for nodes 0..5."
      },
      {
        "id": "tc-2",
        "input": "1",
        "expectedOutput": "0",
        "isHidden": false,
        "explanation": "Single node has distance 0."
      },
      {
        "id": "tc-3",
        "input": "2\n1 0",
        "expectedOutput": "1 1",
        "isHidden": true,
        "explanation": "Two nodes connected by 1 edge."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N;\n    if (scanf(\"%d\", &N) != 1) return 0;\n    // Implement Re-rooting Tree DP\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N;\n    if (!(cin >> N)) return 0;\n    // Implement Re-rooting Tree DP\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        // Implement Re-rooting Tree DP\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n = int(lines[0])\n    # Implement Re-rooting Tree DP\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n\n#define MAX_N 30005\n\nint head[MAX_N], to[2 * MAX_N], nxt[2 * MAX_N], edgeIdx;\nint count[MAX_N], ans[MAX_N], N;\n\nvoid addEdge(int u, int v) {\n    to[edgeIdx] = v; nxt[edgeIdx] = head[u]; head[u] = edgeIdx++;\n    to[edgeIdx] = u; nxt[edgeIdx] = head[v]; head[v] = edgeIdx++;\n}\n\nvoid dfs1(int u, int p) {\n    count[u] = 1;\n    for (int e = head[u]; e != -1; e = nxt[e]) {\n        int v = to[e];\n        if (v == p) continue;\n        dfs1(v, u);\n        count[u] += count[v];\n        ans[0] += ans[v] + count[v];\n    }\n}\n\nvoid dfs2(int u, int p) {\n    for (int e = head[u]; e != -1; e = nxt[e]) {\n        int v = to[e];\n        if (v == p) continue;\n        ans[v] = ans[u] - count[v] + (N - count[v]);\n        dfs2(v, u);\n    }\n}\n\nint main() {\n    if (scanf(\"%d\", &N) != 1) return 0;\n    if (N == 1) { printf(\"0\\n\"); return 0; }\n    for (int i = 0; i < N; i++) head[i] = -1;\n    edgeIdx = 0;\n\n    for (int i = 0; i < N - 1; i++) {\n        int u, v;\n        scanf(\"%d %d\", &u, &v);\n        addEdge(u, v);\n    }\n\n    dfs1(0, -1);\n    dfs2(0, -1);\n\n    for (int i = 0; i < N; i++) {\n        printf(\"%d%c\", ans[i], (i == N - 1 ? '\\n' : ' '));\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint N;\nvector<vector<int>> adj;\nvector<int> subtreeCount, ans;\n\nvoid dfs1(int u, int p) {\n    subtreeCount[u] = 1;\n    for (int v : adj[u]) {\n        if (v == p) continue;\n        dfs1(v, u);\n        subtreeCount[u] += subtreeCount[v];\n        ans[0] += ans[v] + subtreeCount[v];\n    }\n}\n\nvoid dfs2(int u, int p) {\n    for (int v : adj[u]) {\n        if (v == p) continue;\n        ans[v] = ans[u] - subtreeCount[v] + (N - subtreeCount[v]);\n        dfs2(v, u);\n    }\n}\n\nint main() {\n    if (!(cin >> N)) return 0;\n    if (N == 1) { cout << 0 << endl; return 0; }\n    adj.assign(N, vector<int>());\n    subtreeCount.assign(N, 0);\n    ans.assign(N, 0);\n\n    for (int i = 0; i < N - 1; ++i) {\n        int u, v; cin >> u >> v;\n        adj[u].push_back(v);\n        adj[v].push_back(u);\n    }\n\n    dfs1(0, -1);\n    dfs2(0, -1);\n\n    for (int i = 0; i < N; ++i) {\n        cout << ans[i] << (i == N - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    static int N;\n    static List<List<Integer>> adj;\n    static int[] count, ans;\n\n    static void dfs1(int u, int p) {\n        count[u] = 1;\n        for (int v : adj.get(u)) {\n            if (v == p) continue;\n            dfs1(v, u);\n            count[u] += count[v];\n            ans[0] += ans[v] + count[v];\n        }\n    }\n\n    static void dfs2(int u, int p) {\n        for (int v : adj.get(u)) {\n            if (v == p) continue;\n            ans[v] = ans[u] - count[v] + (N - count[v]);\n            dfs2(v, u);\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        N = sc.nextInt();\n        if (N == 1) { System.out.println(0); return; }\n\n        adj = new ArrayList<>();\n        for (int i = 0; i < N; i++) adj.add(new ArrayList<>());\n        count = new int[N];\n        ans = new int[N];\n\n        for (int i = 0; i < N - 1; i++) {\n            int u = sc.nextInt();\n            int v = sc.nextInt();\n            adj.get(u).add(v);\n            adj.get(v).add(u);\n        }\n\n        dfs1(0, -1);\n        dfs2(0, -1);\n\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < N; i++) {\n            sb.append(ans[i]).append(i == N - 1 ? \"\" : \" \");\n        }\n        System.out.println(sb);\n    }\n}",
      "python": "import sys\nimport collections\n\n# Set recursion depth for deep trees\nsys.setrecursionlimit(100000)\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n = int(lines[0])\n    if n == 1:\n        print(0)\n        return\n\n    adj = collections.defaultdict(list)\n    idx = 1\n    for _ in range(n - 1):\n        u, v = int(lines[idx]), int(lines[idx + 1])\n        idx += 2\n        adj[u].append(v)\n        adj[v].append(u)\n\n    count = [1] * n\n    ans = [0] * n\n\n    def dfs1(u, p):\n        for v in adj[u]:\n            if v == p:\n                continue\n            dfs1(v, u)\n            count[u] += count[v]\n            ans[0] += ans[v] + count[v]\n\n    def dfs2(u, p):\n        for v in adj[u]:\n            if v == p:\n                continue\n            ans[v] = ans[u] - count[v] + (n - count[v])\n            dfs2(v, u)\n\n    dfs1(0, -1)\n    dfs2(0, -1)\n    print(*(ans))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d12-ch-8",
    "day": 12,
    "title": "Minimum Cost to Merge Stones (K-Pile Merge DP)",
    "difficulty": "Hard",
    "moduleTag": "13. Hard Dynamic Programming",
    "companies": [
      "Citadel",
      "Bloomberg",
      "Google"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "There are n piles of stones arranged in a row. The i-th pile has stones[i] stones. A move consists of merging exactly k consecutive piles into one pile, and the cost of this move is equal to the total number of stones in these k piles. Return the minimum cost to merge all piles of stones into one pile. If it is impossible, return -1.",
    "inputFormat": "First line: N K (number of stone piles and merge factor).\nSecond line: N space-separated integers representing pile sizes.",
    "outputFormat": "Single integer representing minimum cost or `-1`.",
    "constraints": [
      "1 <= stones.length <= 30",
      "2 <= k <= 30",
      "1 <= stones[i] <= 100"
    ],
    "sampleInput": "4 2\n3 2 4 1",
    "sampleOutput": "20",
    "kapilIntuition": "Mentorship By Kapil: Each merge reduces the number of piles by (k - 1). Therefore, a valid final merge into 1 pile is possible if and only if (n - 1) % (k - 1) == 0. Formulate interval DP: dp[i][j] is the min cost to merge stones[i..j] into as few piles as possible. When (j - i) % (k - 1) == 0, these piles can be merged into 1 pile, adding the prefix sum sum(stones[i..j]). Iterate partition point m in steps of (k - 1).",
    "timeComplexity": "O(N^3 / K)",
    "spaceComplexity": "O(N^2)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "4 2\n3 2 4 1",
        "expectedOutput": "20",
        "isHidden": false,
        "explanation": "[3,2,4,1] -> [5,4,1] (cost 5) -> [5,5] (cost 5) -> [10] (cost 10). Total = 20."
      },
      {
        "id": "tc-2",
        "input": "4 3\n3 2 4 1",
        "expectedOutput": "-1",
        "isHidden": false,
        "explanation": "(4 - 1) % (3 - 1) = 3 % 2 = 1 != 0 (Impossible)."
      },
      {
        "id": "tc-3",
        "input": "5 3\n3 5 1 2 6",
        "expectedOutput": "25",
        "isHidden": true,
        "explanation": "(5 - 1) % (3 - 1) = 0 (Possible)."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N, K;\n    if (scanf(\"%d %d\", &N, &K) != 2) return 0;\n    // Implement K-pile stone merge DP\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N, K;\n    if (!(cin >> N >> K)) return 0;\n    // Implement K-pile stone merge DP\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int K = sc.nextInt();\n        // Implement K-pile stone merge DP\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, k = int(lines[0]), int(lines[1])\n    stones = [int(x) for x in lines[2:]]\n    # Implement K-pile stone merge DP\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\n#define MIN(a, b) ((a) < (b) ? (a) : (b))\n#define INF 1000000000\n\nint main() {\n    int N, K;\n    if (scanf(\"%d %d\", &N, &K) != 2) return 0;\n    int stones[35], prefix[35];\n    prefix[0] = 0;\n    for (int i = 0; i < N; i++) {\n        scanf(\"%d\", &stones[i]);\n        prefix[i + 1] = prefix[i] + stones[i];\n    }\n\n    if ((N - 1) % (K - 1) != 0) {\n        printf(\"-1\\n\");\n        return 0;\n    }\n\n    int dp[35][35];\n    for (int i = 0; i < N; i++) {\n        for (int j = 0; j < N; j++) dp[i][j] = 0;\n    }\n\n    for (int len = K; len <= N; len++) {\n        for (int i = 0; i <= N - len; i++) {\n            int j = i + len - 1;\n            dp[i][j] = INF;\n            for (int m = i; m < j; m += K - 1) {\n                dp[i][j] = MIN(dp[i][j], dp[i][m] + dp[m + 1][j]);\n            }\n            if ((len - 1) % (K - 1) == 0) {\n                dp[i][j] += prefix[j + 1] - prefix[i];\n            }\n        }\n    }\n    printf(\"%d\\n\", dp[0][N - 1]);\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nconst int INF = 1e9;\n\nint main() {\n    int N, K;\n    if (!(cin >> N >> K)) return 0;\n    vector<int> stones(N), prefix(N + 1, 0);\n    for (int i = 0; i < N; ++i) {\n        cin >> stones[i];\n        prefix[i + 1] = prefix[i] + stones[i];\n    }\n\n    if ((N - 1) % (K - 1) != 0) {\n        cout << -1 << endl;\n        return 0;\n    }\n\n    vector<vector<int>> dp(N, vector<int>(N, 0));\n\n    for (int len = K; len <= N; ++len) {\n        for (int i = 0; i <= N - len; ++i) {\n            int j = i + len - 1;\n            dp[i][j] = INF;\n            for (int m = i; m < j; m += K - 1) {\n                dp[i][j] = min(dp[i][j], dp[i][m] + dp[m + 1][j]);\n            }\n            if ((len - 1) % (K - 1) == 0) {\n                dp[i][j] += prefix[j + 1] - prefix[i];\n            }\n        }\n    }\n    cout << dp[0][N - 1] << endl;\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    static final int INF = 1_000_000_000;\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int K = sc.nextInt();\n        int[] stones = new int[N];\n        int[] prefix = new int[N + 1];\n        for (int i = 0; i < N; i++) {\n            stones[i] = sc.nextInt();\n            prefix[i + 1] = prefix[i] + stones[i];\n        }\n\n        if ((N - 1) % (K - 1) != 0) {\n            System.out.println(-1);\n            return;\n        }\n\n        int[][] dp = new int[N][N];\n\n        for (int len = K; len <= N; len++) {\n            for (int i = 0; i <= N - len; i++) {\n                int j = i + len - 1;\n                dp[i][j] = INF;\n                for (int m = i; m < j; m += K - 1) {\n                    dp[i][j] = Math.min(dp[i][j], dp[i][m] + dp[m + 1][j]);\n                }\n                if ((len - 1) % (K - 1) == 0) {\n                    dp[i][j] += prefix[j + 1] - prefix[i];\n                }\n            }\n        }\n        System.out.println(dp[0][N - 1]);\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, k = int(lines[0]), int(lines[1])\n    stones = [int(x) for x in lines[2:]]\n\n    if (n - 1) % (k - 1) != 0:\n        print(-1)\n        return\n\n    prefix = [0] * (n + 1)\n    for i in range(n):\n        prefix[i + 1] = prefix[i] + stones[i]\n\n    inf = float('inf')\n    dp = [[0] * n for _ in range(n)]\n\n    for length in range(k, n + 1):\n        for i in range(n - length + 1):\n            j = i + length - 1\n            dp[i][j] = min(dp[i][m] + dp[m + 1][j] for m in range(i, j, k - 1))\n            if (length - 1) % (k - 1) == 0:\n                dp[i][j] += prefix[j + 1] - prefix[i]\n\n    print(dp[0][n - 1])\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d12-ch-9",
    "day": 12,
    "title": "Partition to K Equal Sum Subsets (Bitmask DP)",
    "difficulty": "Hard",
    "moduleTag": "13. Hard Dynamic Programming",
    "companies": [
      "Meta",
      "LinkedIn",
      "Amazon"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "Given an integer array nums and an integer k, return `true` if it is possible to divide this array into k non-empty subsets whose sums are all equal, else `false`.",
    "inputFormat": "First line: N K (array size and number of subsets).\nSecond line: N space-separated integers.",
    "outputFormat": "`true` or `false`.",
    "constraints": [
      "1 <= k <= N <= 16",
      "1 <= nums[i] <= 10^4"
    ],
    "sampleInput": "7 4\n4 3 2 3 5 2 1",
    "sampleOutput": "true",
    "kapilIntuition": "Mentorship By Kapil: First check if sum(nums) % k == 0. Let target = sum(nums) / k. Since N <= 16, use Bitmask DP: dp[mask] stores the accumulated remainder (current subset sum % target) if the subset of elements in `mask` can be partitioned into valid target-sum subsets, or -1 if invalid. For each state mask, if dp[mask] != -1, try including unvisited element i where dp[mask] + nums[i] <= target. If dp[(1 << N) - 1] == 0, return true.",
    "timeComplexity": "O(N * 2^N)",
    "spaceComplexity": "O(2^N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "7 4\n4 3 2 3 5 2 1",
        "expectedOutput": "true",
        "isHidden": false,
        "explanation": "Subsets: (5), (1,4), (2,3), (2,3) each sum to 5."
      },
      {
        "id": "tc-2",
        "input": "4 3\n1 2 3 4",
        "expectedOutput": "false",
        "isHidden": false,
        "explanation": "Sum 10 is not divisible by 3."
      },
      {
        "id": "tc-3",
        "input": "4 4\n2 2 2 2",
        "expectedOutput": "true",
        "isHidden": true,
        "explanation": "Each subset contains one 2."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdbool.h>\n\nint main() {\n    int N, K;\n    if (scanf(\"%d %d\", &N, &K) != 2) return 0;\n    // Implement Bitmask Partition DP\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N, K;\n    if (!(cin >> N >> K)) return 0;\n    // Implement Bitmask Partition DP\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int K = sc.nextInt();\n        // Implement Bitmask Partition DP\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:]]\n    # Implement Bitmask Partition DP\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdbool.h>\n#include <string.h>\n\nint main() {\n    int N, K;\n    if (scanf(\"%d %d\", &N, &K) != 2) return 0;\n    int nums[20], sum = 0;\n    for (int i = 0; i < N; i++) {\n        scanf(\"%d\", &nums[i]);\n        sum += nums[i];\n    }\n    if (sum % K != 0) { printf(\"false\\n\"); return 0; }\n    int target = sum / K;\n\n    int totalMasks = 1 << N;\n    int dp[1 << 16];\n    memset(dp, -1, sizeof(int) * totalMasks);\n    dp[0] = 0;\n\n    for (int mask = 0; mask < totalMasks; mask++) {\n        if (dp[mask] == -1) continue;\n        for (int i = 0; i < N; i++) {\n            if (!(mask & (1 << i)) && dp[mask] + nums[i] <= target) {\n                int nextMask = mask | (1 << i);\n                dp[nextMask] = (dp[mask] + nums[i]) % target;\n            }\n        }\n    }\n    printf(\"%s\\n\", dp[totalMasks - 1] == 0 ? \"true\" : \"false\");\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <numeric>\n\nusing namespace std;\n\nint main() {\n    int N, K;\n    if (!(cin >> N >> K)) return 0;\n    vector<int> nums(N);\n    int sum = 0;\n    for (int i = 0; i < N; ++i) {\n        cin >> nums[i];\n        sum += nums[i];\n    }\n    if (sum % K != 0) { cout << \"false\" << endl; return 0; }\n    int target = sum / K;\n\n    int totalMasks = 1 << N;\n    vector<int> dp(totalMasks, -1);\n    dp[0] = 0;\n\n    for (int mask = 0; mask < totalMasks; ++mask) {\n        if (dp[mask] == -1) continue;\n        for (int i = 0; i < N; ++i) {\n            if (!(mask & (1 << i)) && dp[mask] + nums[i] <= target) {\n                dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target;\n            }\n        }\n    }\n    cout << (dp[totalMasks - 1] == 0 ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "import java.util.Scanner;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int K = sc.nextInt();\n        int[] nums = new int[N];\n        int sum = 0;\n        for (int i = 0; i < N; i++) {\n            nums[i] = sc.nextInt();\n            sum += nums[i];\n        }\n        if (sum % K != 0) { System.out.println(\"false\"); return; }\n        int target = sum / K;\n\n        int totalMasks = 1 << N;\n        int[] dp = new int[totalMasks];\n        Arrays.fill(dp, -1);\n        dp[0] = 0;\n\n        for (int mask = 0; mask < totalMasks; mask++) {\n            if (dp[mask] == -1) continue;\n            for (int i = 0; i < N; i++) {\n                if ((mask & (1 << i)) == 0 && dp[mask] + nums[i] <= target) {\n                    dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target;\n                }\n            }\n        }\n        System.out.println(dp[totalMasks - 1] == 0 ? \"true\" : \"false\");\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, k = int(lines[0]), int(lines[1])\n    nums = [int(x) for x in lines[2:]]\n    total_sum = sum(nums)\n    if total_sum % k != 0:\n        print(\"false\")\n        return\n    target = total_sum // k\n\n    total_masks = 1 << n\n    dp = [-1] * total_masks\n    dp[0] = 0\n\n    for mask in range(total_masks):\n        if dp[mask] == -1:\n            continue\n        for i in range(n):\n            if not (mask & (1 << i)) and dp[mask] + nums[i] <= target:\n                dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target\n\n    print(\"true\" if dp[total_masks - 1] == 0 else \"false\")\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d12-ch-10",
    "day": 12,
    "title": "Non-negative Integers without Consecutive Ones (Digit DP)",
    "difficulty": "Hard",
    "moduleTag": "13. Hard Dynamic Programming",
    "companies": [
      "Google",
      "Apple",
      "Microsoft"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "Given a positive integer n, return the number of the integers in the range [0, n] whose binary representations do NOT contain consecutive ones.",
    "inputFormat": "Single line: integer N.",
    "outputFormat": "Single integer representing the count of valid numbers in [0, N].",
    "constraints": [
      "1 <= N <= 10^9"
    ],
    "sampleInput": "5",
    "sampleOutput": "5",
    "kapilIntuition": "Mentorship By Kapil: This is classic Digit DP on binary representations. Notice that the number of binary strings of length k without consecutive ones follows the Fibonacci sequence: fib[k] = fib[k-1] + fib[k-2]. Convert N to its binary string. Traverse from most significant bit to least. If bit is 1, add fib[k] (for numbers with 0 at this position). If two consecutive 1s are encountered, break early because all remaining numbers will contain consecutive 1s. If loop completes, add 1 for N itself.",
    "timeComplexity": "O(log N) = O(32)",
    "spaceComplexity": "O(32)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "5",
        "expectedOutput": "5",
        "isHidden": false,
        "explanation": "Valid numbers: 0 (0), 1 (1), 2 (10), 4 (100), 5 (101). Count is 5."
      },
      {
        "id": "tc-2",
        "input": "1",
        "expectedOutput": "2",
        "isHidden": false,
        "explanation": "0 (0) and 1 (1)."
      },
      {
        "id": "tc-3",
        "input": "2",
        "expectedOutput": "3",
        "isHidden": true,
        "explanation": "0 (0), 1 (1), 2 (10)."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N;\n    if (scanf(\"%d\", &N) != 1) return 0;\n    // Implement Digit DP on Binary Strings\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int N;\n    if (!(cin >> N)) return 0;\n    // Implement Digit DP on Binary Strings\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        // Implement Digit DP on Binary Strings\n    }\n}",
      "python": "import sys\n\ndef main():\n    line = sys.stdin.read().strip()\n    if not line:\n        return\n    n = int(line)\n    # Implement Digit DP on Binary Strings\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N;\n    if (scanf(\"%d\", &N) != 1) return 0;\n\n    int f[32];\n    f[0] = 1;\n    f[1] = 2;\n    for (int i = 2; i < 32; i++) f[i] = f[i - 1] + f[i - 2];\n\n    int ans = 0, prevBit = 0;\n    for (int k = 30; k >= 0; k--) {\n        if (N & (1 << k)) {\n            ans += f[k];\n            if (prevBit == 1) {\n                printf(\"%d\\n\", ans);\n                return 0;\n            }\n            prevBit = 1;\n        } else {\n            prevBit = 0;\n        }\n    }\n    printf(\"%d\\n\", ans + 1);\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N;\n    if (!(cin >> N)) return 0;\n\n    vector<int> f(32);\n    f[0] = 1;\n    f[1] = 2;\n    for (int i = 2; i < 32; ++i) f[i] = f[i - 1] + f[i - 2];\n\n    int ans = 0, prevBit = 0;\n    for (int k = 30; k >= 0; --k) {\n        if (N & (1 << k)) {\n            ans += f[k];\n            if (prevBit == 1) {\n                cout << ans << endl;\n                return 0;\n            }\n            prevBit = 1;\n        } else {\n            prevBit = 0;\n        }\n    }\n    cout << ans + 1 << endl;\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n\n        int[] f = new int[32];\n        f[0] = 1;\n        f[1] = 2;\n        for (int i = 2; i < 32; i++) f[i] = f[i - 1] + f[i - 2];\n\n        int ans = 0, prevBit = 0;\n        for (int k = 30; k >= 0; k--) {\n            if ((N & (1 << k)) != 0) {\n                ans += f[k];\n                if (prevBit == 1) {\n                    System.out.println(ans);\n                    return;\n                }\n                prevBit = 1;\n            } else {\n                prevBit = 0;\n            }\n        }\n        System.out.println(ans + 1);\n    }\n}",
      "python": "import sys\n\ndef main():\n    line = sys.stdin.read().strip()\n    if not line:\n        return\n    n = int(line)\n\n    f = [0] * 32\n    f[0] = 1\n    f[1] = 2\n    for i in range(2, 32):\n        f[i] = f[i - 1] + f[i - 2]\n\n    ans = 0\n    prev_bit = 0\n    for k in range(30, -1, -1):\n        if n & (1 << k):\n            ans += f[k]\n            if prev_bit == 1:\n                print(ans)\n                return\n            prev_bit = 1\n        else:\n            prev_bit = 0\n\n    print(ans + 1)\n\nif __name__ == '__main__':\n    main()"
    }
  }
];
