const fs = require('fs');
const path = require('path');

const challenges = [
  // 1. Regular Expression Matching
  {
    id: 'd12-ch-1',
    day: 12,
    title: 'Regular Expression Matching (\'.\' and \'*\')',
    difficulty: 'Hard',
    moduleTag: '13. Hard Dynamic Programming',
    companies: ['Google', 'Meta', 'Amazon', 'Apple'],
    platforms: ['LeetCode', 'HackerRank'],
    problemStatement:
      'Given an input string s and a pattern p, implement regular expression matching with support for \'.\' and \'*\' where:\n\'.\' matches any single character.\n\'*\' matches zero or more of the preceding element.\nThe matching should cover the entire input string (not partial). Return `true` if pattern matches string, else `false`.',
    inputFormat: 'First line: string s.\nSecond line: pattern p.',
    outputFormat: '`true` or `false`.',
    constraints: ['1 <= s.length <= 20', '1 <= p.length <= 20', 's contains only lowercase English letters', 'p contains lowercase English letters, \'.\', and \'*\''],
    sampleInput: 'aa\na*',
    sampleOutput: 'true',
    kapilIntuition:
      'Mentorship By Kapil: Let dp[i][j] denote whether s[0..i-1] matches p[0..j-1]. If p[j-1] == \'*\', the \'*\' can represent 0 occurrences of p[j-2] (dp[i][j-2]) or 1+ occurrences (if s[i-1] matches p[j-2], then dp[i-1][j]). If characters match directly or p[j-1] == \'.\', then dp[i][j] = dp[i-1][j-1]. Initialize dp[0][0] = true.',
    timeComplexity: 'O(S * P)',
    spaceComplexity: 'O(S * P)',
    testCases: [
      { id: 'tc-1', input: 'aa\na*', expectedOutput: 'true', isHidden: false, explanation: '\'*\' matches zero or more \'a\'.' },
      { id: 'tc-2', input: 'mississippi\nmis*is*p*.', expectedOutput: 'false', isHidden: false, explanation: 'Mismatch on ending letters.' },
      { id: 'tc-3', input: 'ab\n.*', expectedOutput: 'true', isHidden: true, explanation: '\'.*\' matches any sequence.' }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

int main() {
    char s[64], p[64];
    if (scanf("%63s %63s", s, p) != 2) return 0;
    // Implement Regular Expression Matching DP
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main() {
    string s, p;
    if (!(cin >> s >> p)) return 0;
    // Implement Regular Expression Matching DP
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        String p = sc.next();
        // Implement Regular Expression Matching DP
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        return
    s, p = lines[0], lines[1]
    # Implement Regular Expression Matching DP

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

int main() {
    char s[64], p[64];
    if (scanf("%63s %63s", s, p) != 2) return 0;
    int m = strlen(s), n = strlen(p);
    bool dp[64][64];
    memset(dp, 0, sizeof(dp));
    dp[0][0] = true;

    for (int j = 2; j <= n; j += 2) {
        if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2];
    }

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*') {
                dp[i][j] = dp[i][j - 2];
                if (p[j - 2] == '.' || p[j - 2] == s[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            } else if (p[j - 1] == '.' || p[j - 1] == s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }
    printf("%s\\n", dp[m][n] ? "true" : "false");
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main() {
    string s, p;
    if (!(cin >> s >> p)) return 0;
    int m = s.size(), n = p.size();
    vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
    dp[0][0] = true;

    for (int j = 2; j <= n; ++j) {
        if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2];
    }

    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (p[j - 1] == '*') {
                dp[i][j] = dp[i][j - 2];
                if (p[j - 2] == '.' || p[j - 2] == s[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            } else if (p[j - 1] == '.' || p[j - 1] == s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }
    cout << (dp[m][n] ? "true" : "false") << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        String p = sc.next();
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true;

        for (int j = 2; j <= n; j++) {
            if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 2];
        }

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p.charAt(j - 1) == '*') {
                    dp[i][j] = dp[i][j - 2];
                    if (p.charAt(j - 2) == '.' || p.charAt(j - 2) == s.charAt(i - 1)) {
                        dp[i][j] = dp[i][j] || dp[i - 1][j];
                    }
                } else if (p.charAt(j - 1) == '.' || p.charAt(j - 1) == s.charAt(i - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
        System.out.println(dp[m][n] ? "true" : "false");
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        return
    s, p = lines[0], lines[1]
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True

    for j in range(2, n + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 2]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == '*':
                dp[i][j] = dp[i][j - 2]
                if p[j - 2] == '.' or p[j - 2] == s[i - 1]:
                    dp[i][j] = dp[i][j] or dp[i - 1][j]
            elif p[j - 1] == '.' or p[j - 1] == s[i - 1]:
                dp[i][j] = dp[i - 1][j - 1]

    print("true" if dp[m][n] else "false")

if __name__ == '__main__':
    main()`
    }
  },

  // 2. Best Time to Buy and Sell Stock IV
  {
    id: 'd12-ch-2',
    day: 12,
    title: 'Best Time to Buy and Sell Stock IV (At Most K Transactions)',
    difficulty: 'Hard',
    moduleTag: '13. Hard Dynamic Programming',
    companies: ['Citadel', 'Amazon', 'Goldman Sachs'],
    platforms: ['LeetCode', 'InterviewBit'],
    problemStatement:
      'You are given an integer array prices where prices[i] is the price of a given stock on the i-th day, and an integer k. Find the maximum profit you can achieve with at most k transactions. Note: You may not engage in multiple transactions simultaneously (i.e., you must sell before buying again).',
    inputFormat: 'First line: K N (max transactions and number of days).\nSecond line: N integers representing prices.',
    outputFormat: 'Single integer representing maximum achievable profit.',
    constraints: ['1 <= k <= 100', '1 <= N <= 1000', '0 <= prices[i] <= 1000'],
    sampleInput: '2 6\n3 2 6 5 0 3',
    sampleOutput: '7',
    kapilIntuition:
      'Mentorship By Kapil: If k >= N/2, it reduces to greedy unlimited transactions (Stock II). Otherwise, define buy[t] and sell[t] for t in 1..k. buy[t] = max(buy[t], sell[t-1] - price) and sell[t] = max(sell[t], buy[t] + price). Initialize buy[t] = -infinity and sell[t] = 0. Iterate through all prices and update from t = 1 to k.',
    timeComplexity: 'O(N * K)',
    spaceComplexity: 'O(K)',
    testCases: [
      { id: 'tc-1', input: '2 6\n3 2 6 5 0 3', expectedOutput: '7', isHidden: false, explanation: 'Buy day 2 (2), sell day 3 (6) profit 4; Buy day 5 (0), sell day 6 (3) profit 3. Total 7.' },
      { id: 'tc-2', input: '2 3\n2 4 1', expectedOutput: '2', isHidden: false, explanation: 'Buy day 1 (2), sell day 2 (4) profit 2.' },
      { id: 'tc-3', input: '1 5\n1 2 3 4 5', expectedOutput: '4', isHidden: true, explanation: 'Single transaction buying at 1 and selling at 5.' }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int K, N;
    if (scanf("%d %d", &K, &N) != 2) return 0;
    // Implement Stock IV DP
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int K, N;
    if (!(cin >> K >> N)) return 0;
    // Implement Stock IV DP
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int K = sc.nextInt();
        int N = sc.nextInt();
        // Implement Stock IV DP
    }
}`,
      python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    k = int(input_data[0])
    n = int(input_data[1])
    prices = [int(x) for x in input_data[2:]]
    # Implement Stock IV DP

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main() {
    int K, N;
    if (scanf("%d %d", &K, &N) != 2) return 0;
    int prices[1005];
    for (int i = 0; i < N; i++) scanf("%d", &prices[i]);
    if (N <= 1 || K == 0) { printf("0\\n"); return 0; }

    if (K >= N / 2) {
        int profit = 0;
        for (int i = 1; i < N; i++) {
            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
        }
        printf("%d\\n", profit);
        return 0;
    }

    int buy[105], sell[105];
    for (int t = 0; t <= K; t++) {
        buy[t] = -1000000000;
        sell[t] = 0;
    }

    for (int i = 0; i < N; i++) {
        int p = prices[i];
        for (int t = 1; t <= K; t++) {
            buy[t] = MAX(buy[t], sell[t - 1] - p);
            sell[t] = MAX(sell[t], buy[t] + p);
        }
    }
    printf("%d\\n", sell[K]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int K, N;
    if (!(cin >> K >> N)) return 0;
    vector<int> prices(N);
    for (int i = 0; i < N; ++i) cin >> prices[i];
    if (N <= 1 || K == 0) { cout << 0 << endl; return 0; }

    if (K >= N / 2) {
        int profit = 0;
        for (int i = 1; i < N; ++i) {
            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
        }
        cout << profit << endl;
        return 0;
    }

    vector<int> buy(K + 1, -1e9), sell(K + 1, 0);
    for (int p : prices) {
        for (int t = 1; t <= K; ++t) {
            buy[t] = max(buy[t], sell[t - 1] - p);
            sell[t] = max(sell[t], buy[t] + p);
        }
    }
    cout << sell[K] << endl;
    return 0;
}`,
      java: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int K = sc.nextInt();
        int N = sc.nextInt();
        int[] prices = new int[N];
        for (int i = 0; i < N; i++) prices[i] = sc.nextInt();
        if (N <= 1 || K == 0) { System.out.println(0); return; }

        if (K >= N / 2) {
            int profit = 0;
            for (int i = 1; i < N; i++) {
                if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
            }
            System.out.println(profit);
            return;
        }

        int[] buy = new int[K + 1];
        int[] sell = new int[K + 1];
        Arrays.fill(buy, -1_000_000_000);

        for (int p : prices) {
            for (int t = 1; t <= K; t++) {
                buy[t] = Math.max(buy[t], sell[t - 1] - p);
                sell[t] = Math.max(sell[t], buy[t] + p);
            }
        }
        System.out.println(sell[K]);
    }
}`,
      python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    k = int(input_data[0])
    n = int(input_data[1])
    prices = [int(x) for x in input_data[2:]]
    if n <= 1 or k == 0:
        print(0)
        return

    if k >= n // 2:
        print(sum(max(0, prices[i] - prices[i - 1]) for i in range(1, n)))
        return

    buy = [-float('inf')] * (k + 1)
    sell = [0] * (k + 1)

    for p in prices:
        for t in range(1, k + 1):
            buy[t] = max(buy[t], sell[t - 1] - p)
            sell[t] = max(sell[t], buy[t] + p)

    print(sell[k])

if __name__ == '__main__':
    main()`
    }
  },

  // 3. Shortest Path Visiting All Nodes
  {
    id: 'd12-ch-3',
    day: 12,
    title: 'Shortest Path Visiting All Nodes (Bitmask BFS/DP)',
    difficulty: 'Hard',
    moduleTag: '13. Hard Dynamic Programming',
    companies: ['Uber', 'Apple', 'Google'],
    platforms: ['LeetCode'],
    problemStatement:
      'You have an undirected, connected graph of n nodes labeled from 0 to n - 1. You are given an integer N and M edges. Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.',
    inputFormat: 'First line: N M (number of nodes and edges).\nNext M lines: u v (undirected edge).',
    outputFormat: 'Single integer representing the minimum number of steps.',
    constraints: ['1 <= N <= 12', '0 <= M <= 50', 'Graph is connected'],
    sampleInput: '4 3\n0 1\n0 2\n0 3',
    sampleOutput: '4',
    kapilIntuition:
      'Mentorship By Kapil: Since N <= 12, the visited set can be modeled as a bitmask of length N. The state is (mask, current_node). Initialize a queue with all start nodes: (1 << i, i) with distance 0. Run BFS: for each state, transition to all adjacent neighbors `v` with state (mask | (1 << v), v). The first time mask == (1 << N) - 1 is dequeued, return the step count.',
    timeComplexity: 'O(N * 2^N)',
    spaceComplexity: 'O(N * 2^N)',
    testCases: [
      { id: 'tc-1', input: '4 3\n0 1\n0 2\n0 3', expectedOutput: '4', isHidden: false, explanation: 'Path: 1 -> 0 -> 2 -> 0 -> 3 (4 edges).' },
      { id: 'tc-2', input: '4 4\n0 1\n0 2\n0 3\n2 3', expectedOutput: '4', isHidden: false, explanation: 'Visits all nodes in 4 steps.' },
      { id: 'tc-3', input: '1 0', expectedOutput: '0', isHidden: true, explanation: 'Single node requires 0 steps.' }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    // Implement Bitmask BFS
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
    int N, M;
    if (!(cin >> N >> M)) return 0;
    // Implement Bitmask BFS
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        // Implement Bitmask BFS
    }
}`,
      python: `import sys
import collections

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, m = int(lines[0]), int(lines[1])
    # Implement Bitmask BFS

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdbool.h>

typedef struct {
    int mask, u, dist;
} State;

State queue[1 << 16];
bool visited[1 << 12][12];

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    if (N <= 1) { printf("0\\n"); return 0; }

    int adj[12][12];
    int adjSize[12] = {0};
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        adj[u][adjSize[u]++] = v;
        adj[v][adjSize[v]++] = u;
    }

    int head = 0, tail = 0;
    int targetMask = (1 << N) - 1;

    for (int i = 0; i < N; i++) {
        int mask = 1 << i;
        queue[tail++] = (State){mask, i, 0};
        visited[mask][i] = true;
    }

    while (head < tail) {
        State cur = queue[head++];
        if (cur.mask == targetMask) {
            printf("%d\\n", cur.dist);
            return 0;
        }

        for (int i = 0; i < adjSize[cur.u]; i++) {
            int v = adj[cur.u][i];
            int nextMask = cur.mask | (1 << v);
            if (!visited[nextMask][v]) {
                visited[nextMask][v] = true;
                queue[tail++] = (State){nextMask, v, cur.dist + 1};
            }
        }
    }
    printf("0\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct State {
    int mask, u, dist;
};

int main() {
    int N, M;
    if (!(cin >> N >> M)) return 0;
    if (N <= 1) { cout << 0 << endl; return 0; }

    vector<vector<int>> adj(N);
    for (int i = 0; i < M; ++i) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    queue<State> q;
    vector<vector<bool>> visited(1 << N, vector<bool>(N, false));
    int target = (1 << N) - 1;

    for (int i = 0; i < N; ++i) {
        q.push({1 << i, i, 0});
        visited[1 << i][i] = true;
    }

    while (!q.empty()) {
        auto [mask, u, dist] = q.front(); q.pop();
        if (mask == target) {
            cout << dist << endl;
            return 0;
        }

        for (int v : adj[u]) {
            int nextMask = mask | (1 << v);
            if (!visited[nextMask][v]) {
                visited[nextMask][v] = true;
                q.push({nextMask, v, dist + 1});
            }
        }
    }
    cout << 0 << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        if (N <= 1) { System.out.println(0); return; }

        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < N; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < M; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
            adj.get(v).add(u);
        }

        Queue<int[]> q = new ArrayDeque<>();
        boolean[][] visited = new boolean[1 << N][N];
        int target = (1 << N) - 1;

        for (int i = 0; i < N; i++) {
            q.add(new int[]{1 << i, i, 0});
            visited[1 << i][i] = true;
        }

        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int mask = cur[0], u = cur[1], dist = cur[2];
            if (mask == target) {
                System.out.println(dist);
                return;
            }

            for (int v : adj.get(u)) {
                int nextMask = mask | (1 << v);
                if (!visited[nextMask][v]) {
                    visited[nextMask][v] = true;
                    q.add(new int[]{nextMask, v, dist + 1});
                }
            }
        }
        System.out.println(0);
    }
}`,
      python: `import sys
import collections

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, m = int(lines[0]), int(lines[1])
    if n <= 1:
        print(0)
        return

    adj = collections.defaultdict(list)
    idx = 2
    for _ in range(m):
        u, v = int(lines[idx]), int(lines[idx + 1])
        idx += 2
        adj[u].append(v)
        adj[v].append(u)

    target = (1 << n) - 1
    q = collections.deque()
    visited = set()

    for i in range(n):
        mask = 1 << i
        q.append((mask, i, 0))
        visited.add((mask, i))

    while q:
        mask, u, dist = q.popleft()
        if mask == target:
            print(dist)
            return

        for v in adj[u]:
            nxt_mask = mask | (1 << v)
            if (nxt_mask, v) not in visited:
                visited.add((nxt_mask, v))
                q.append((nxt_mask, v, dist + 1))

    print(0)

if __name__ == '__main__':
    main()`
    }
  },

  // 4. Binary Tree Maximum Path Sum
  {
    id: 'd12-ch-4',
    day: 12,
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    moduleTag: '13. Hard Dynamic Programming',
    companies: ['Meta', 'Microsoft', 'Amazon'],
    platforms: ['LeetCode'],
    problemStatement:
      'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Given the root of a binary tree represented in level-order format (with `null` for missing nodes), return the maximum path sum of any non-empty path.',
    inputFormat: 'Single line: level-order traversal of the tree with values or `null`.',
    outputFormat: 'Single integer representing the maximum path sum.',
    constraints: ['1 <= Number of nodes <= 3 * 10^4', '-1000 <= Node.val <= 1000'],
    sampleInput: '-10 9 20 null null 15 7',
    sampleOutput: '42',
    kapilIntuition:
      'Mentorship By Kapil: At each node u, compute the maximum gain from its left and right subtrees (pruning negative sums with max(0, gain)). The maximum path passing THROUGH node u is u.val + leftGain + rightGain, which updates globalMax. The function returns u.val + max(leftGain, rightGain) to its parent, as a valid path cannot branch twice.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H) where H is height of the tree',
    testCases: [
      { id: 'tc-1', input: '-10 9 20 null null 15 7', expectedOutput: '42', isHidden: false, explanation: 'Optimal path: 15 -> 20 -> 7 gives 15 + 20 + 7 = 42.' },
      { id: 'tc-2', input: '1 2 3', expectedOutput: '6', isHidden: false, explanation: 'Optimal path: 2 -> 1 -> 3 gives 6.' },
      { id: 'tc-3', input: '-3', expectedOutput: '-3', isHidden: true, explanation: 'Single negative node.' }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    // Parse level order and compute Max Path Sum
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    // Parse level order and compute Max Path Sum
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Parse level order and compute Max Path Sum
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    # Parse level order and compute Max Path Sum

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

typedef struct TreeNode {
    int val;
    struct TreeNode *left, *right;
} TreeNode;

int globalMax = -1000000000;

int maxGain(TreeNode* root) {
    if (!root) return 0;
    int leftGain = MAX(0, maxGain(root->left));
    int rightGain = MAX(0, maxGain(root->right));
    int priceNewPath = root->val + leftGain + rightGain;
    if (priceNewPath > globalMax) globalMax = priceNewPath;
    return root->val + MAX(leftGain, rightGain);
}

int main() {
    char token[32];
    TreeNode* nodes[30005];
    int count = 0;

    while (scanf("%31s", token) == 1) {
        if (strcmp(token, "null") == 0) {
            nodes[count++] = NULL;
        } else {
            TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));
            node->val = atoi(token);
            node->left = node->right = NULL;
            nodes[count++] = node;
        }
    }
    if (count == 0 || nodes[0] == NULL) { printf("0\\n"); return 0; }

    int childIdx = 1;
    for (int i = 0; i < count && childIdx < count; i++) {
        if (nodes[i]) {
            if (childIdx < count) nodes[i]->left = nodes[childIdx++];
            if (childIdx < count) nodes[i]->right = nodes[childIdx++];
        }
    }

    maxGain(nodes[0]);
    printf("%d\\n", globalMax);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <queue>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left = nullptr, *right = nullptr;
    TreeNode(int v) : val(v) {}
};

int globalMax = -1e9;

int maxGain(TreeNode* root) {
    if (!root) return 0;
    int leftGain = max(0, maxGain(root->left));
    int rightGain = max(0, maxGain(root->right));
    globalMax = max(globalMax, root->val + leftGain + rightGain);
    return root->val + max(leftGain, rightGain);
}

int main() {
    string s;
    vector<string> tokens;
    while (cin >> s) tokens.push_back(s);
    if (tokens.empty() || tokens[0] == "null") { cout << 0 << endl; return 0; }

    TreeNode* root = new TreeNode(stoi(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;

    while (!q.empty() && i < tokens.size()) {
        TreeNode* curr = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") {
            curr->left = new TreeNode(stoi(tokens[i]));
            q.push(curr->left);
        }
        i++;
        if (i < tokens.size() && tokens[i] != "null") {
            curr->right = new TreeNode(stoi(tokens[i]));
            q.push(curr->right);
        }
        i++;
    }

    maxGain(root);
    cout << globalMax << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { this.val = v; }
    }

    static int globalMax = -1_000_000_000;

    static int maxGain(TreeNode root) {
        if (root == null) return 0;
        int leftGain = Math.max(0, maxGain(root.left));
        int rightGain = Math.max(0, maxGain(root.right));
        globalMax = Math.max(globalMax, root.val + leftGain + rightGain);
        return root.val + Math.max(leftGain, rightGain);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<String> tokens = new ArrayList<>();
        while (sc.hasNext()) tokens.add(sc.next());
        if (tokens.isEmpty() || tokens.get(0).equals("null")) {
            System.out.println(0);
            return;
        }

        TreeNode root = new TreeNode(Integer.parseInt(tokens.get(0)));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;

        while (!q.isEmpty() && i < tokens.size()) {
            TreeNode curr = q.poll();
            if (i < tokens.size() && !tokens.get(i).equals("null")) {
                curr.left = new TreeNode(Integer.parseInt(tokens.get(i)));
                q.add(curr.left);
            }
            i++;
            if (i < tokens.size() && !tokens.get(i).equals("null")) {
                curr.right = new TreeNode(Integer.parseInt(tokens.get(i)));
                q.add(curr.right);
            }
            i++;
        }

        maxGain(root);
        System.out.println(globalMax);
    }
}`,
      python: `import sys
import collections

class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def main():
    tokens = sys.stdin.read().split()
    if not tokens or tokens[0] == "null":
        print(0)
        return

    root = TreeNode(int(tokens[0]))
    q = collections.deque([root])
    i = 1

    while q and i < len(tokens):
        curr = q.popleft()
        if i < len(tokens) and tokens[i] != "null":
            curr.left = TreeNode(int(tokens[i]))
            q.append(curr.left)
        i += 1
        if i < len(tokens) and tokens[i] != "null":
            curr.right = TreeNode(int(tokens[i]))
            q.append(curr.right)
        i += 1

    global_max = -float('inf')

    def max_gain(node):
        nonlocal global_max
        if not node:
            return 0
        left = max(0, max_gain(node.left))
        right = max(0, max_gain(node.right))
        global_max = max(global_max, node.val + left + right)
        return node.val + max(left, right)

    max_gain(root)
    print(global_max)

if __name__ == '__main__':
    main()`
    }
  },

  // 5. Constrained Subsequence Sum
  {
    id: 'd12-ch-5',
    day: 12,
    title: 'Constrained Subsequence Sum (Monotonic Deque DP)',
    difficulty: 'Hard',
    moduleTag: '13. Hard Dynamic Programming',
    companies: ['Google', 'Citadel', 'ByteDance'],
    platforms: ['LeetCode'],
    problemStatement:
      'Given an integer array nums and an integer k, return the maximum sum of a non-empty subsequence of that array such that for every two consecutive integers in the subsequence, nums[i] and nums[j], where i < j, the condition j - i <= k is satisfied.',
    inputFormat: 'First line: N K (array size and window size).\nSecond line: N space-separated integers.',
    outputFormat: 'Single integer representing maximum subsequence sum.',
    constraints: ['1 <= k <= N <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    sampleInput: '5 2\n10 2 -10 5 20',
    sampleOutput: '37',
    kapilIntuition:
      'Mentorship By Kapil: Let dp[i] = nums[i] + max(0, max_{i-k <= j < i} dp[j]). A naive scan takes O(N * K) time. We optimize this using a monotonically decreasing deque of indices storing optimal DP values. Pop outdated indices (index < i - k) from the front in O(1). The front element is the maximum in the window. Before pushing i, pop all elements from the back where dp[back] <= dp[i]. Total time is O(N).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    testCases: [
      { id: 'tc-1', input: '5 2\n10 2 -10 5 20', expectedOutput: '37', isHidden: false, explanation: 'Subsequence [10, 2, 5, 20] sums to 37 with steps <= 2.' },
      { id: 'tc-2', input: '4 2\n-1 -2 -3 -4', expectedOutput: '-1', isHidden: false, explanation: 'Must pick at least one element: max is -1.' },
      { id: 'tc-3', input: '6 1\n10 -2 -10 -5 20 1', expectedOutput: '23', isHidden: true, explanation: 'Pick [10, -2, -10, -5, 20, 1] or appropriate steps.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, K;
    if (scanf("%d %d", &N, &K) != 2) return 0;
    // Implement Monotonic Deque DP
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <deque>

using namespace std;

int main() {
    int N, K;
    if (!(cin >> N >> K)) return 0;
    // Implement Monotonic Deque DP
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int K = sc.nextInt();
        // Implement Monotonic Deque DP
    }
}`,
      python: `import sys
import collections

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, k = int(lines[0]), int(lines[1])
    nums = [int(x) for x in lines[2:]]
    # Implement Monotonic Deque DP

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>

#define MAX_N 100005

int main() {
    int N, K;
    if (scanf("%d %d", &N, &K) != 2) return 0;
    int nums[MAX_N], dp[MAX_N], dq[MAX_N];
    for (int i = 0; i < N; i++) scanf("%d", &nums[i]);

    int head = 0, tail = 0;
    int maxSum = nums[0];

    for (int i = 0; i < N; i++) {
        while (head < tail && dq[head] < i - K) head++;

        int prevMax = (head < tail && dp[dq[head]] > 0) ? dp[dq[head]] : 0;
        dp[i] = nums[i] + prevMax;
        if (dp[i] > maxSum) maxSum = dp[i];

        while (head < tail && dp[dq[tail - 1]] <= dp[i]) tail--;
        dq[tail++] = i;
    }
    printf("%d\\n", maxSum);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <deque>
#include <algorithm>

using namespace std;

int main() {
    int N, K;
    if (!(cin >> N >> K)) return 0;
    vector<int> nums(N);
    for (int i = 0; i < N; ++i) cin >> nums[i];

    vector<int> dp(N);
    deque<int> dq;
    int maxSum = nums[0];

    for (int i = 0; i < N; ++i) {
        if (!dq.empty() && dq.front() < i - K) dq.pop_front();

        dp[i] = nums[i] + (!dq.empty() && dp[dq.front()] > 0 ? dp[dq.front()] : 0);
        maxSum = max(maxSum, dp[i]);

        while (!dq.empty() && dp[dq.back()] <= dp[i]) dq.pop_back();
        dq.push_back(i);
    }
    cout << maxSum << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int K = sc.nextInt();
        int[] nums = new int[N];
        for (int i = 0; i < N; i++) nums[i] = sc.nextInt();

        int[] dp = new int[N];
        Deque<Integer> dq = new ArrayDeque<>();
        int maxSum = nums[0];

        for (int i = 0; i < N; i++) {
            if (!dq.isEmpty() && dq.peekFirst() < i - K) dq.pollFirst();

            dp[i] = nums[i] + (!dq.isEmpty() && dp[dq.peekFirst()] > 0 ? dp[dq.peekFirst()] : 0);
            maxSum = Math.max(maxSum, dp[i]);

            while (!dq.isEmpty() && dp[dq.peekLast()] <= dp[i]) dq.pollLast();
            dq.addLast(i);
        }
        System.out.println(maxSum);
    }
}`,
      python: `import sys
import collections

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, k = int(lines[0]), int(lines[1])
    nums = [int(x) for x in lines[2:]]

    dp = [0] * n
    dq = collections.deque()
    max_sum = nums[0]

    for i, x in enumerate(nums):
        if dq and dq[0] < i - k:
            dq.popleft()

        prev_max = dp[dq[0]] if dq and dp[dq[0]] > 0 else 0
        dp[i] = x + prev_max
        if dp[i] > max_sum:
            max_sum = dp[i]

        while dq and dp[dq[-1]] <= dp[i]:
            dq.pop()
        dq.append(i)

    print(max_sum)

if __name__ == '__main__':
    main()`
    }
  },

  // 6. Burst Balloons
  {
    id: 'd12-ch-6',
    day: 12,
    title: 'Burst Balloons (Interval DP)',
    difficulty: 'Hard',
    moduleTag: '13. Hard Dynamic Programming',
    companies: ['Amazon', 'Apple', 'Meta'],
    platforms: ['LeetCode'],
    problemStatement:
      'You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons. If you burst balloon i you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it. Return the maximum coins you can collect by bursting the balloons wisely.',
    inputFormat: 'First line: N (number of balloons).\nSecond line: N space-separated integers.',
    outputFormat: 'Single integer representing maximum coins collected.',
    constraints: ['1 <= N <= 300', '0 <= nums[i] <= 100'],
    sampleInput: '4\n3 1 5 8',
    sampleOutput: '167',
    kapilIntuition:
      'Mentorship By Kapil: Reverse the thinking! Instead of choosing which balloon to burst first (which causes dependencies), choose which balloon k is burst LAST in range [i, j]. Because balloon k is the last balloon burst in [i, j], its adjacent balloons when it bursts are guaranteed to be nums[i-1] and nums[j+1]. Hence: dp[i][j] = max_{k} (dp[i][k-1] + dp[k+1][j] + nums[i-1] * nums[k] * nums[j+1]).',
    timeComplexity: 'O(N^3)',
    spaceComplexity: 'O(N^2)',
    testCases: [
      { id: 'tc-1', input: '4\n3 1 5 8', expectedOutput: '167', isHidden: false, explanation: 'nums = [3,1,5,8] -> [3,5,8] -> [3,8] -> [8] -> [] gives coins 167.' },
      { id: 'tc-2', input: '2\n1 5', expectedOutput: '10', isHidden: false, explanation: 'Burst 1 then 5: 1*1*5 + 1*5*1 = 10.' },
      { id: 'tc-3', input: '1\n9', expectedOutput: '9', isHidden: true, explanation: 'Single balloon: 1 * 9 * 1 = 9.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N;
    if (scanf("%d", &N) != 1) return 0;
    // Implement Interval DP
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N;
    if (!(cin >> N)) return 0;
    // Implement Interval DP
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        // Implement Interval DP
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    nums = [int(x) for x in lines[1:]]
    # Implement Interval DP

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main() {
    int N;
    if (scanf("%d", &N) != 1) return 0;
    int val[305];
    val[0] = 1;
    for (int i = 0; i < N; i++) scanf("%d", &val[i + 1]);
    val[N + 1] = 1;

    int dp[305][305];
    memset(dp, 0, sizeof(dp));

    for (int len = 1; len <= N; len++) {
        for (int left = 1; left <= N - len + 1; left++) {
            int right = left + len - 1;
            for (int k = left; k <= right; k++) {
                int coins = val[left - 1] * val[k] * val[right + 1] + dp[left][k - 1] + dp[k + 1][right];
                dp[left][right] = MAX(dp[left][right], coins);
            }
        }
    }
    printf("%d\\n", dp[1][N]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int N;
    if (!(cin >> N)) return 0;
    vector<int> val(N + 2, 1);
    for (int i = 0; i < N; ++i) cin >> val[i + 1];

    vector<vector<int>> dp(N + 2, vector<int>(N + 2, 0));

    for (int len = 1; len <= N; ++len) {
        for (int left = 1; left <= N - len + 1; ++left) {
            int right = left + len - 1;
            for (int k = left; k <= right; ++k) {
                int coins = val[left - 1] * val[k] * val[right + 1] + dp[left][k - 1] + dp[k + 1][right];
                dp[left][right] = max(dp[left][right], coins);
            }
        }
    }
    cout << dp[1][N] << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int[] val = new int[N + 2];
        val[0] = 1;
        for (int i = 0; i < N; i++) val[i + 1] = sc.nextInt();
        val[N + 1] = 1;

        int[][] dp = new int[N + 2][N + 2];

        for (int len = 1; len <= N; len++) {
            for (int left = 1; left <= N - len + 1; left++) {
                int right = left + len - 1;
                for (int k = left; k <= right; k++) {
                    int coins = val[left - 1] * val[k] * val[right + 1] + dp[left][k - 1] + dp[k + 1][right];
                    dp[left][right] = Math.max(dp[left][right], coins);
                }
            }
        }
        System.out.println(dp[1][N]);
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    nums = [int(x) for x in lines[1:]]
    val = [1] + nums + [1]
    dp = [[0] * (n + 2) for _ in range(n + 2)]

    for length in range(1, n + 1):
        for left in range(1, n - length + 2):
            right = left + length - 1
            for k in range(left, right + 1):
                coins = val[left - 1] * val[k] * val[right + 1] + dp[left][k - 1] + dp[k + 1][right]
                if coins > dp[left][right]:
                    dp[left][right] = coins

    print(dp[1][n])

if __name__ == '__main__':
    main()`
    }
  },

  // 7. Sum of Distances in Tree
  {
    id: 'd12-ch-7',
    day: 12,
    title: 'Sum of Distances in Tree (Tree DP Re-rooting)',
    difficulty: 'Hard',
    moduleTag: '13. Hard Dynamic Programming',
    companies: ['Google', 'Uber', 'Microsoft'],
    platforms: ['LeetCode'],
    problemStatement:
      'There is an undirected connected tree with n nodes labeled from 0 to n - 1 and n - 1 edges. You are given the integer n and the edges. Return an array ans of length n where ans[i] is the sum of the distances between the i-th node in the tree and all other nodes.',
    inputFormat: 'First line: N (number of nodes).\nNext N-1 lines: u v (undirected tree edges).',
    outputFormat: 'Space-separated integers representing ans[0] ans[1] ... ans[N-1].',
    constraints: ['1 <= N <= 3 * 10^4', 'edges.length == N - 1', 'Tree is connected and acyclic'],
    sampleInput: '6\n0 1\n0 2\n2 3\n2 4\n2 5',
    sampleOutput: '8 12 6 10 10 10',
    kapilIntuition:
      'Mentorship By Kapil: Use 2-Pass Tree DP Re-rooting. Pass 1 (Post-order DFS): root arbitrarily at 0. Compute count[u] (subtree size) and ans[0] (sum of distances in subtree). Pass 2 (Pre-order DFS): when root shifts from parent u to child v, v moves 1 step closer to all count[v] nodes in its subtree (-count[v]), and 1 step further from all other (N - count[v]) nodes (+ N - count[v]). Hence: ans[v] = ans[u] + N - 2 * count[v].',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    testCases: [
      { id: 'tc-1', input: '6\n0 1\n0 2\n2 3\n2 4\n2 5', expectedOutput: '8 12 6 10 10 10', isHidden: false, explanation: 'Distance sums for nodes 0..5.' },
      { id: 'tc-2', input: '1', expectedOutput: '0', isHidden: false, explanation: 'Single node has distance 0.' },
      { id: 'tc-3', input: '2\n1 0', expectedOutput: '1 1', isHidden: true, explanation: 'Two nodes connected by 1 edge.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N;
    if (scanf("%d", &N) != 1) return 0;
    // Implement Re-rooting Tree DP
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N;
    if (!(cin >> N)) return 0;
    // Implement Re-rooting Tree DP
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        // Implement Re-rooting Tree DP
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    # Implement Re-rooting Tree DP

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

#define MAX_N 30005

int head[MAX_N], to[2 * MAX_N], nxt[2 * MAX_N], edgeIdx;
int count[MAX_N], ans[MAX_N], N;

void addEdge(int u, int v) {
    to[edgeIdx] = v; nxt[edgeIdx] = head[u]; head[u] = edgeIdx++;
    to[edgeIdx] = u; nxt[edgeIdx] = head[v]; head[v] = edgeIdx++;
}

void dfs1(int u, int p) {
    count[u] = 1;
    for (int e = head[u]; e != -1; e = nxt[e]) {
        int v = to[e];
        if (v == p) continue;
        dfs1(v, u);
        count[u] += count[v];
        ans[0] += ans[v] + count[v];
    }
}

void dfs2(int u, int p) {
    for (int e = head[u]; e != -1; e = nxt[e]) {
        int v = to[e];
        if (v == p) continue;
        ans[v] = ans[u] - count[v] + (N - count[v]);
        dfs2(v, u);
    }
}

int main() {
    if (scanf("%d", &N) != 1) return 0;
    if (N == 1) { printf("0\\n"); return 0; }
    for (int i = 0; i < N; i++) head[i] = -1;
    edgeIdx = 0;

    for (int i = 0; i < N - 1; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        addEdge(u, v);
    }

    dfs1(0, -1);
    dfs2(0, -1);

    for (int i = 0; i < N; i++) {
        printf("%d%c", ans[i], (i == N - 1 ? '\\n' : ' '));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int N;
vector<vector<int>> adj;
vector<int> subtreeCount, ans;

void dfs1(int u, int p) {
    subtreeCount[u] = 1;
    for (int v : adj[u]) {
        if (v == p) continue;
        dfs1(v, u);
        subtreeCount[u] += subtreeCount[v];
        ans[0] += ans[v] + subtreeCount[v];
    }
}

void dfs2(int u, int p) {
    for (int v : adj[u]) {
        if (v == p) continue;
        ans[v] = ans[u] - subtreeCount[v] + (N - subtreeCount[v]);
        dfs2(v, u);
    }
}

int main() {
    if (!(cin >> N)) return 0;
    if (N == 1) { cout << 0 << endl; return 0; }
    adj.assign(N, vector<int>());
    subtreeCount.assign(N, 0);
    ans.assign(N, 0);

    for (int i = 0; i < N - 1; ++i) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    dfs1(0, -1);
    dfs2(0, -1);

    for (int i = 0; i < N; ++i) {
        cout << ans[i] << (i == N - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    static int N;
    static List<List<Integer>> adj;
    static int[] count, ans;

    static void dfs1(int u, int p) {
        count[u] = 1;
        for (int v : adj.get(u)) {
            if (v == p) continue;
            dfs1(v, u);
            count[u] += count[v];
            ans[0] += ans[v] + count[v];
        }
    }

    static void dfs2(int u, int p) {
        for (int v : adj.get(u)) {
            if (v == p) continue;
            ans[v] = ans[u] - count[v] + (N - count[v]);
            dfs2(v, u);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        N = sc.nextInt();
        if (N == 1) { System.out.println(0); return; }

        adj = new ArrayList<>();
        for (int i = 0; i < N; i++) adj.add(new ArrayList<>());
        count = new int[N];
        ans = new int[N];

        for (int i = 0; i < N - 1; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
            adj.get(v).add(u);
        }

        dfs1(0, -1);
        dfs2(0, -1);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < N; i++) {
            sb.append(ans[i]).append(i == N - 1 ? "" : " ");
        }
        System.out.println(sb);
    }
}`,
      python: `import sys
import collections

# Set recursion depth for deep trees
sys.setrecursionlimit(100000)

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    if n == 1:
        print(0)
        return

    adj = collections.defaultdict(list)
    idx = 1
    for _ in range(n - 1):
        u, v = int(lines[idx]), int(lines[idx + 1])
        idx += 2
        adj[u].append(v)
        adj[v].append(u)

    count = [1] * n
    ans = [0] * n

    def dfs1(u, p):
        for v in adj[u]:
            if v == p:
                continue
            dfs1(v, u)
            count[u] += count[v]
            ans[0] += ans[v] + count[v]

    def dfs2(u, p):
        for v in adj[u]:
            if v == p:
                continue
            ans[v] = ans[u] - count[v] + (n - count[v])
            dfs2(v, u)

    dfs1(0, -1)
    dfs2(0, -1)
    print(*(ans))

if __name__ == '__main__':
    main()`
    }
  },

  // 8. Minimum Cost to Merge Stones
  {
    id: 'd12-ch-8',
    day: 12,
    title: 'Minimum Cost to Merge Stones (K-Pile Merge DP)',
    difficulty: 'Hard',
    moduleTag: '13. Hard Dynamic Programming',
    companies: ['Citadel', 'Bloomberg', 'Google'],
    platforms: ['LeetCode'],
    problemStatement:
      'There are n piles of stones arranged in a row. The i-th pile has stones[i] stones. A move consists of merging exactly k consecutive piles into one pile, and the cost of this move is equal to the total number of stones in these k piles. Return the minimum cost to merge all piles of stones into one pile. If it is impossible, return -1.',
    inputFormat: 'First line: N K (number of stone piles and merge factor).\nSecond line: N space-separated integers representing pile sizes.',
    outputFormat: 'Single integer representing minimum cost or `-1`.',
    constraints: ['1 <= stones.length <= 30', '2 <= k <= 30', '1 <= stones[i] <= 100'],
    sampleInput: '4 2\n3 2 4 1',
    sampleOutput: '20',
    kapilIntuition:
      'Mentorship By Kapil: Each merge reduces the number of piles by (k - 1). Therefore, a valid final merge into 1 pile is possible if and only if (n - 1) % (k - 1) == 0. Formulate interval DP: dp[i][j] is the min cost to merge stones[i..j] into as few piles as possible. When (j - i) % (k - 1) == 0, these piles can be merged into 1 pile, adding the prefix sum sum(stones[i..j]). Iterate partition point m in steps of (k - 1).',
    timeComplexity: 'O(N^3 / K)',
    spaceComplexity: 'O(N^2)',
    testCases: [
      { id: 'tc-1', input: '4 2\n3 2 4 1', expectedOutput: '20', isHidden: false, explanation: '[3,2,4,1] -> [5,4,1] (cost 5) -> [5,5] (cost 5) -> [10] (cost 10). Total = 20.' },
      { id: 'tc-2', input: '4 3\n3 2 4 1', expectedOutput: '-1', isHidden: false, explanation: '(4 - 1) % (3 - 1) = 3 % 2 = 1 != 0 (Impossible).' },
      { id: 'tc-3', input: '5 3\n3 5 1 2 6', expectedOutput: '25', isHidden: true, explanation: '(5 - 1) % (3 - 1) = 0 (Possible).' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, K;
    if (scanf("%d %d", &N, &K) != 2) return 0;
    // Implement K-pile stone merge DP
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, K;
    if (!(cin >> N >> K)) return 0;
    // Implement K-pile stone merge DP
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int K = sc.nextInt();
        // Implement K-pile stone merge DP
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, k = int(lines[0]), int(lines[1])
    stones = [int(x) for x in lines[2:]]
    # Implement K-pile stone merge DP

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>

#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define INF 1000000000

int main() {
    int N, K;
    if (scanf("%d %d", &N, &K) != 2) return 0;
    int stones[35], prefix[35];
    prefix[0] = 0;
    for (int i = 0; i < N; i++) {
        scanf("%d", &stones[i]);
        prefix[i + 1] = prefix[i] + stones[i];
    }

    if ((N - 1) % (K - 1) != 0) {
        printf("-1\\n");
        return 0;
    }

    int dp[35][35];
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) dp[i][j] = 0;
    }

    for (int len = K; len <= N; len++) {
        for (int i = 0; i <= N - len; i++) {
            int j = i + len - 1;
            dp[i][j] = INF;
            for (int m = i; m < j; m += K - 1) {
                dp[i][j] = MIN(dp[i][j], dp[i][m] + dp[m + 1][j]);
            }
            if ((len - 1) % (K - 1) == 0) {
                dp[i][j] += prefix[j + 1] - prefix[i];
            }
        }
    }
    printf("%d\\n", dp[0][N - 1]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int INF = 1e9;

int main() {
    int N, K;
    if (!(cin >> N >> K)) return 0;
    vector<int> stones(N), prefix(N + 1, 0);
    for (int i = 0; i < N; ++i) {
        cin >> stones[i];
        prefix[i + 1] = prefix[i] + stones[i];
    }

    if ((N - 1) % (K - 1) != 0) {
        cout << -1 << endl;
        return 0;
    }

    vector<vector<int>> dp(N, vector<int>(N, 0));

    for (int len = K; len <= N; ++len) {
        for (int i = 0; i <= N - len; ++i) {
            int j = i + len - 1;
            dp[i][j] = INF;
            for (int m = i; m < j; m += K - 1) {
                dp[i][j] = min(dp[i][j], dp[i][m] + dp[m + 1][j]);
            }
            if ((len - 1) % (K - 1) == 0) {
                dp[i][j] += prefix[j + 1] - prefix[i];
            }
        }
    }
    cout << dp[0][N - 1] << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    static final int INF = 1_000_000_000;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int K = sc.nextInt();
        int[] stones = new int[N];
        int[] prefix = new int[N + 1];
        for (int i = 0; i < N; i++) {
            stones[i] = sc.nextInt();
            prefix[i + 1] = prefix[i] + stones[i];
        }

        if ((N - 1) % (K - 1) != 0) {
            System.out.println(-1);
            return;
        }

        int[][] dp = new int[N][N];

        for (int len = K; len <= N; len++) {
            for (int i = 0; i <= N - len; i++) {
                int j = i + len - 1;
                dp[i][j] = INF;
                for (int m = i; m < j; m += K - 1) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][m] + dp[m + 1][j]);
                }
                if ((len - 1) % (K - 1) == 0) {
                    dp[i][j] += prefix[j + 1] - prefix[i];
                }
            }
        }
        System.out.println(dp[0][N - 1]);
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, k = int(lines[0]), int(lines[1])
    stones = [int(x) for x in lines[2:]]

    if (n - 1) % (k - 1) != 0:
        print(-1)
        return

    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + stones[i]

    inf = float('inf')
    dp = [[0] * n for _ in range(n)]

    for length in range(k, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = min(dp[i][m] + dp[m + 1][j] for m in range(i, j, k - 1))
            if (length - 1) % (k - 1) == 0:
                dp[i][j] += prefix[j + 1] - prefix[i]

    print(dp[0][n - 1])

if __name__ == '__main__':
    main()`
    }
  },

  // 9. Partition to K Equal Sum Subsets
  {
    id: 'd12-ch-9',
    day: 12,
    title: 'Partition to K Equal Sum Subsets (Bitmask DP)',
    difficulty: 'Hard',
    moduleTag: '13. Hard Dynamic Programming',
    companies: ['Meta', 'LinkedIn', 'Amazon'],
    platforms: ['LeetCode'],
    problemStatement:
      'Given an integer array nums and an integer k, return `true` if it is possible to divide this array into k non-empty subsets whose sums are all equal, else `false`.',
    inputFormat: 'First line: N K (array size and number of subsets).\nSecond line: N space-separated integers.',
    outputFormat: '`true` or `false`.',
    constraints: ['1 <= k <= N <= 16', '1 <= nums[i] <= 10^4'],
    sampleInput: '7 4\n4 3 2 3 5 2 1',
    sampleOutput: 'true',
    kapilIntuition:
      'Mentorship By Kapil: First check if sum(nums) % k == 0. Let target = sum(nums) / k. Since N <= 16, use Bitmask DP: dp[mask] stores the accumulated remainder (current subset sum % target) if the subset of elements in `mask` can be partitioned into valid target-sum subsets, or -1 if invalid. For each state mask, if dp[mask] != -1, try including unvisited element i where dp[mask] + nums[i] <= target. If dp[(1 << N) - 1] == 0, return true.',
    timeComplexity: 'O(N * 2^N)',
    spaceComplexity: 'O(2^N)',
    testCases: [
      { id: 'tc-1', input: '7 4\n4 3 2 3 5 2 1', expectedOutput: 'true', isHidden: false, explanation: 'Subsets: (5), (1,4), (2,3), (2,3) each sum to 5.' },
      { id: 'tc-2', input: '4 3\n1 2 3 4', expectedOutput: 'false', isHidden: false, explanation: 'Sum 10 is not divisible by 3.' },
      { id: 'tc-3', input: '4 4\n2 2 2 2', expectedOutput: 'true', isHidden: true, explanation: 'Each subset contains one 2.' }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int N, K;
    if (scanf("%d %d", &N, &K) != 2) return 0;
    // Implement Bitmask Partition DP
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, K;
    if (!(cin >> N >> K)) return 0;
    // Implement Bitmask Partition DP
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int K = sc.nextInt();
        // Implement Bitmask Partition DP
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, k = int(lines[0]), int(lines[1])
    nums = [int(x) for x in lines[2:]]
    # Implement Bitmask Partition DP

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdbool.h>
#include <string.h>

int main() {
    int N, K;
    if (scanf("%d %d", &N, &K) != 2) return 0;
    int nums[20], sum = 0;
    for (int i = 0; i < N; i++) {
        scanf("%d", &nums[i]);
        sum += nums[i];
    }
    if (sum % K != 0) { printf("false\\n"); return 0; }
    int target = sum / K;

    int totalMasks = 1 << N;
    int dp[1 << 16];
    memset(dp, -1, sizeof(int) * totalMasks);
    dp[0] = 0;

    for (int mask = 0; mask < totalMasks; mask++) {
        if (dp[mask] == -1) continue;
        for (int i = 0; i < N; i++) {
            if (!(mask & (1 << i)) && dp[mask] + nums[i] <= target) {
                int nextMask = mask | (1 << i);
                dp[nextMask] = (dp[mask] + nums[i]) % target;
            }
        }
    }
    printf("%s\\n", dp[totalMasks - 1] == 0 ? "true" : "false");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <numeric>

using namespace std;

int main() {
    int N, K;
    if (!(cin >> N >> K)) return 0;
    vector<int> nums(N);
    int sum = 0;
    for (int i = 0; i < N; ++i) {
        cin >> nums[i];
        sum += nums[i];
    }
    if (sum % K != 0) { cout << "false" << endl; return 0; }
    int target = sum / K;

    int totalMasks = 1 << N;
    vector<int> dp(totalMasks, -1);
    dp[0] = 0;

    for (int mask = 0; mask < totalMasks; ++mask) {
        if (dp[mask] == -1) continue;
        for (int i = 0; i < N; ++i) {
            if (!(mask & (1 << i)) && dp[mask] + nums[i] <= target) {
                dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target;
            }
        }
    }
    cout << (dp[totalMasks - 1] == 0 ? "true" : "false") << endl;
    return 0;
}`,
      java: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int K = sc.nextInt();
        int[] nums = new int[N];
        int sum = 0;
        for (int i = 0; i < N; i++) {
            nums[i] = sc.nextInt();
            sum += nums[i];
        }
        if (sum % K != 0) { System.out.println("false"); return; }
        int target = sum / K;

        int totalMasks = 1 << N;
        int[] dp = new int[totalMasks];
        Arrays.fill(dp, -1);
        dp[0] = 0;

        for (int mask = 0; mask < totalMasks; mask++) {
            if (dp[mask] == -1) continue;
            for (int i = 0; i < N; i++) {
                if ((mask & (1 << i)) == 0 && dp[mask] + nums[i] <= target) {
                    dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target;
                }
            }
        }
        System.out.println(dp[totalMasks - 1] == 0 ? "true" : "false");
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, k = int(lines[0]), int(lines[1])
    nums = [int(x) for x in lines[2:]]
    total_sum = sum(nums)
    if total_sum % k != 0:
        print("false")
        return
    target = total_sum // k

    total_masks = 1 << n
    dp = [-1] * total_masks
    dp[0] = 0

    for mask in range(total_masks):
        if dp[mask] == -1:
            continue
        for i in range(n):
            if not (mask & (1 << i)) and dp[mask] + nums[i] <= target:
                dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target

    print("true" if dp[total_masks - 1] == 0 else "false")

if __name__ == '__main__':
    main()`
    }
  },

  // 10. Non-negative Integers without Consecutive Ones
  {
    id: 'd12-ch-10',
    day: 12,
    title: 'Non-negative Integers without Consecutive Ones (Digit DP)',
    difficulty: 'Hard',
    moduleTag: '13. Hard Dynamic Programming',
    companies: ['Google', 'Apple', 'Microsoft'],
    platforms: ['LeetCode'],
    problemStatement:
      'Given a positive integer n, return the number of the integers in the range [0, n] whose binary representations do NOT contain consecutive ones.',
    inputFormat: 'Single line: integer N.',
    outputFormat: 'Single integer representing the count of valid numbers in [0, N].',
    constraints: ['1 <= N <= 10^9'],
    sampleInput: '5',
    sampleOutput: '5',
    kapilIntuition:
      'Mentorship By Kapil: This is classic Digit DP on binary representations. Notice that the number of binary strings of length k without consecutive ones follows the Fibonacci sequence: fib[k] = fib[k-1] + fib[k-2]. Convert N to its binary string. Traverse from most significant bit to least. If bit is 1, add fib[k] (for numbers with 0 at this position). If two consecutive 1s are encountered, break early because all remaining numbers will contain consecutive 1s. If loop completes, add 1 for N itself.',
    timeComplexity: 'O(log N) = O(32)',
    spaceComplexity: 'O(32)',
    testCases: [
      { id: 'tc-1', input: '5', expectedOutput: '5', isHidden: false, explanation: 'Valid numbers: 0 (0), 1 (1), 2 (10), 4 (100), 5 (101). Count is 5.' },
      { id: 'tc-2', input: '1', expectedOutput: '2', isHidden: false, explanation: '0 (0) and 1 (1).' },
      { id: 'tc-3', input: '2', expectedOutput: '3', isHidden: true, explanation: '0 (0), 1 (1), 2 (10).' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N;
    if (scanf("%d", &N) != 1) return 0;
    // Implement Digit DP on Binary Strings
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int N;
    if (!(cin >> N)) return 0;
    // Implement Digit DP on Binary Strings
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        // Implement Digit DP on Binary Strings
    }
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    if not line:
        return
    n = int(line)
    # Implement Digit DP on Binary Strings

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int N;
    if (scanf("%d", &N) != 1) return 0;

    int f[32];
    f[0] = 1;
    f[1] = 2;
    for (int i = 2; i < 32; i++) f[i] = f[i - 1] + f[i - 2];

    int ans = 0, prevBit = 0;
    for (int k = 30; k >= 0; k--) {
        if (N & (1 << k)) {
            ans += f[k];
            if (prevBit == 1) {
                printf("%d\\n", ans);
                return 0;
            }
            prevBit = 1;
        } else {
            prevBit = 0;
        }
    }
    printf("%d\\n", ans + 1);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N;
    if (!(cin >> N)) return 0;

    vector<int> f(32);
    f[0] = 1;
    f[1] = 2;
    for (int i = 2; i < 32; ++i) f[i] = f[i - 1] + f[i - 2];

    int ans = 0, prevBit = 0;
    for (int k = 30; k >= 0; --k) {
        if (N & (1 << k)) {
            ans += f[k];
            if (prevBit == 1) {
                cout << ans << endl;
                return 0;
            }
            prevBit = 1;
        } else {
            prevBit = 0;
        }
    }
    cout << ans + 1 << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();

        int[] f = new int[32];
        f[0] = 1;
        f[1] = 2;
        for (int i = 2; i < 32; i++) f[i] = f[i - 1] + f[i - 2];

        int ans = 0, prevBit = 0;
        for (int k = 30; k >= 0; k--) {
            if ((N & (1 << k)) != 0) {
                ans += f[k];
                if (prevBit == 1) {
                    System.out.println(ans);
                    return;
                }
                prevBit = 1;
            } else {
                prevBit = 0;
            }
        }
        System.out.println(ans + 1);
    }
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    if not line:
        return
    n = int(line)

    f = [0] * 32
    f[0] = 1
    f[1] = 2
    for i in range(2, 32):
        f[i] = f[i - 1] + f[i - 2]

    ans = 0
    prev_bit = 0
    for k in range(30, -1, -1):
        if n & (1 << k):
            ans += f[k]
            if prev_bit == 1:
                print(ans)
                return
            prev_bit = 1
        else:
            prev_bit = 0

    print(ans + 1)

if __name__ == '__main__':
    main()`
    }
  }
];

const fileContent = `import { PracticalChallenge } from '../types';

/**
 * Placement Readiness Program
 * Mentor: Kapil | Day 12: FAANG Hard Dynamic Programming & State-Space Optimization
 * 10 Production-Grade Coding Challenges (C, C++, Java, Python)
 */
export const DAY_12_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = ${JSON.stringify(challenges, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/day12Challenges10.ts'), fileContent, 'utf8');
console.log('Successfully wrote src/data/day12Challenges10.ts');
