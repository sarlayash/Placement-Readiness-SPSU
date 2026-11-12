const fs = require('fs');
const path = require('path');

const notes = [
  {
    id: 'd12-note-1',
    title: 'State Machine Dynamic Programming: Multi-State Transitions & Cooldowns',
    conceptSummary:
      'State Machine DP models problems where an agent transitions between a finite set of mutually exclusive states (e.g., Holding Stock, Sold / Cooldown, Free to Buy) at each discrete time step. Instead of tracking complex historical decisions, we formulate a recurrence where each state depends only on the previous day’s states. For example, in Stock Trading with a 1-day Cooldown: hold[i] = max(hold[i-1], rest[i-1] - price[i]), sold[i] = hold[i-1] + price[i], rest[i] = max(rest[i-1], sold[i-1]). Since day i only depends on day i-1, auxiliary space can be optimized from O(N) to O(1) rolling scalar registers.',
    timeSpaceNote: 'Time Complexity: O(N) single pass over N days. Space Complexity: O(1) auxiliary space using rolling scalar state variables.',
    kapilMentorTip:
      'Kapil Mentor Rule: Whenever a problem specifies "cannot do X immediately after Y" or "must wait K days", immediately draw a Finite State Automaton (FSA) with bubbles and directed arrows on your whiteboard before writing a single line of code. Label the arrows with the profit/cost gained during that transition. The code writes itself directly from the transition diagram.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <limits.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

// LeetCode 309: Best Time to Buy and Sell Stock with Cooldown
int maxProfitCooldown(const int* prices, int pricesSize) {
    if (pricesSize <= 1) return 0;
    int hold = -prices[0];
    int sold = 0;
    int rest = 0;

    for (int i = 1; i < pricesSize; i++) {
        int prevHold = hold;
        int prevSold = sold;
        int prevRest = rest;

        hold = MAX(prevHold, prevRest - prices[i]); // Buy or keep holding
        sold = prevHold + prices[i];                // Sell currently held stock
        rest = MAX(prevRest, prevSold);             // Cool down or continue resting
    }
    return MAX(sold, rest);
}

int main(void) {
    int prices[] = {1, 2, 3, 0, 2};
    int profit = maxProfitCooldown(prices, 5);
    printf("Max profit with cooldown: %d\\n", profit); // Output: 3 (buy@1, sell@2, rest, buy@0, sell@2)
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// State Machine DP: Stock with Cooldown
int maxProfitCooldown(const vector<int>& prices) {
    if (prices.size() <= 1) return 0;
    int hold = -prices[0];
    int sold = 0;
    int rest = 0;

    for (size_t i = 1; i < prices.size(); ++i) {
        int prevHold = hold, prevSold = sold, prevRest = rest;
        hold = max(prevHold, prevRest - prices[i]);
        sold = prevHold + prices[i];
        rest = max(prevRest, prevSold);
    }
    return max(sold, rest);
}

int main() {
    vector<int> prices = {1, 2, 3, 0, 2};
    cout << "Max Profit with Cooldown (C++20): " << maxProfitCooldown(prices) << endl;
    return 0;
}`,
      java: `public class StockCooldownStateMachine {
    public static int maxProfit(int[] prices) {
        if (prices == null || prices.length <= 1) return 0;
        int hold = -prices[0];
        int sold = 0;
        int rest = 0;

        for (int i = 1; i < prices.length; i++) {
            int prevHold = hold;
            int prevSold = sold;
            int prevRest = rest;

            hold = Math.max(prevHold, prevRest - prices[i]);
            sold = prevHold + prices[i];
            rest = Math.max(prevRest, prevSold);
        }
        return Math.max(sold, rest);
    }

    public static void main(String[] args) {
        int[] prices = {1, 2, 3, 0, 2};
        System.out.println("Max Profit (Java 21): " + maxProfit(prices));
    }
}`,
      python: `def max_profit_cooldown(prices: list[int]) -> int:
    if len(prices) <= 1:
        return 0
    hold = -prices[0]
    sold = 0
    rest = 0

    for price in prices[1:]:
        prev_hold, prev_sold, prev_rest = hold, sold, rest
        hold = max(prev_hold, prev_rest - price)
        sold = prev_hold + price
        rest = max(prev_rest, prev_sold)

    return max(sold, rest)

if __name__ == "__main__":
    prices = [1, 2, 3, 0, 2]
    print(f"Max Profit (Python 3.12): {max_profit_cooldown(prices)}")`,
    },
  },
  {
    id: 'd12-note-2',
    title: 'Bitmask Dynamic Programming: Exponential Subsets & Traveling Salesperson',
    conceptSummary:
      'Bitmask DP represents subsets of elements as integer bitmasks where the i-th bit indicates whether item i is included (1) or excluded (0). Used when N <= 20, replacing O(N!) brute-force permutations with O(2^N * N^2) or O(2^N * N) polynomial-in-mask time. In the classic Traveling Salesperson Problem (TSP) or Shortest Path Visiting All Nodes: dp[mask][u] represents the minimum cost to visit the exact subset of nodes indicated by `mask`, ending at node `u`. The transition explores all unvisited neighbors `v` where (mask & (1 << v)) == 0: dp[mask | (1 << v)][v] = min(dp[mask | (1 << v)][v], dp[mask][u] + dist[u][v]).',
    timeSpaceNote: 'Time Complexity: O(2^N * N^2). Space Complexity: O(2^N * N) for the memoization/tabulation table.',
    kapilMentorTip:
      'Kapil Mentor Signal: Whenever you see N <= 18 or N <= 20 in a FAANG interview constraint, 95% of the time it is Bitmask DP or Meet-in-the-Middle. Memorize standard bitwise primitives: check if visited: `(mask & (1 << i)) != 0`; mark visited: `mask | (1 << i)`; toggle: `mask ^ (1 << i)`; count set bits: `__builtin_popcount(mask)` in C++, `Integer.bitCount(mask)` in Java, `mask.bit_count()` in Python.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>

#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define INF 1000000000

// Traveling Salesperson Problem (TSP) using Bitmask DP
int tsp(int n, int dist[4][4]) {
    int totalMasks = 1 << n;
    int dp[1 << 4][4];

    for (int mask = 0; mask < totalMasks; mask++) {
        for (int u = 0; u < n; u++) dp[mask][u] = INF;
    }
    dp[1][0] = 0; // Start at node 0 with mask 0001

    for (int mask = 1; mask < totalMasks; mask++) {
        for (int u = 0; u < n; u++) {
            if (dp[mask][u] >= INF) continue;
            for (int v = 0; v < n; v++) {
                if (!(mask & (1 << v))) {
                    int nextMask = mask | (1 << v);
                    dp[nextMask][v] = MIN(dp[nextMask][v], dp[mask][u] + dist[u][v]);
                }
            }
        }
    }

    int ans = INF;
    for (int u = 1; u < n; u++) {
        ans = MIN(ans, dp[totalMasks - 1][u] + dist[u][0]); // Return to origin 0
    }
    return ans;
}

int main(void) {
    int dist[4][4] = {
        {0, 10, 15, 20},
        {10, 0, 35, 25},
        {15, 35, 0, 30},
        {20, 25, 30, 0}
    };
    printf("Optimal TSP Tour Cost: %d\\n", tsp(4, dist)); // Output: 80
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int INF = 1e9;

int tsp(int n, const vector<vector<int>>& dist) {
    int totalMasks = 1 << n;
    vector<vector<int>> dp(totalMasks, vector<int>(n, INF));
    dp[1][0] = 0;

    for (int mask = 1; mask < totalMasks; ++mask) {
        for (int u = 0; u < n; ++u) {
            if (dp[mask][u] >= INF) continue;
            for (int v = 0; v < n; ++v) {
                if (!(mask & (1 << v))) {
                    int nextMask = mask | (1 << v);
                    dp[nextMask][v] = min(dp[nextMask][v], dp[mask][u] + dist[u][v]);
                }
            }
        }
    }
    int ans = INF;
    for (int u = 1; u < n; ++u) {
        ans = min(ans, dp[totalMasks - 1][u] + dist[u][0]);
    }
    return ans;
}

int main() {
    vector<vector<int>> dist = {
        {0, 10, 15, 20},
        {10, 0, 35, 25},
        {15, 35, 0, 30},
        {20, 25, 30, 0}
    };
    cout << "Optimal TSP Tour Cost (C++20): " << tsp(4, dist) << endl;
    return 0;
}`,
      java: `import java.util.Arrays;

public class BitmaskTsp {
    static final int INF = 1_000_000_000;

    public static int solveTSP(int n, int[][] dist) {
        int totalMasks = 1 << n;
        int[][] dp = new int[totalMasks][n];
        for (int[] row : dp) Arrays.fill(row, INF);
        dp[1][0] = 0;

        for (int mask = 1; mask < totalMasks; mask++) {
            for (int u = 0; u < n; u++) {
                if (dp[mask][u] >= INF) continue;
                for (int v = 0; v < n; v++) {
                    if ((mask & (1 << v)) == 0) {
                        int nextMask = mask | (1 << v);
                        dp[nextMask][v] = Math.min(dp[nextMask][v], dp[mask][u] + dist[u][v]);
                    }
                }
            }
        }
        int minCost = INF;
        for (int u = 1; u < n; u++) {
            minCost = Math.min(minCost, dp[totalMasks - 1][u] + dist[u][0]);
        }
        return minCost;
    }

    public static void main(String[] args) {
        int[][] dist = {
            {0, 10, 15, 20},
            {10, 0, 35, 25},
            {15, 35, 0, 30},
            {20, 25, 30, 0}
        };
        System.out.println("Optimal TSP Cost (Java 21): " + solveTSP(4, dist));
    }
}`,
      python: `def tsp(n: int, dist: list[list[int]]) -> int:
    total_masks = 1 << n
    inf = float('inf')
    dp = [[inf] * n for _ in range(total_masks)]
    dp[1][0] = 0

    for mask in range(1, total_masks):
        for u in range(n):
            if dp[mask][u] == inf:
                continue
            for v in range(n):
                if not (mask & (1 << v)):
                    nxt = mask | (1 << v)
                    if dp[mask][u] + dist[u][v] < dp[nxt][v]:
                        dp[nxt][v] = dp[mask][u] + dist[u][v]

    return min(dp[total_masks - 1][u] + dist[u][0] for u in range(1, n))

if __name__ == "__main__":
    matrix = [
        [0, 10, 15, 20],
        [10, 0, 35, 25],
        [15, 35, 0, 30],
        [20, 25, 30, 0]
    ]
    print(f"Optimal TSP Cost (Python 3.12): {tsp(4, matrix)}")`,
    },
  },
  {
    id: 'd12-note-3',
    title: 'Tree DP & The Re-rooting Technique: Two-Pass Linear Invariant Computation',
    conceptSummary:
      'In Tree DP, problems require computing a metric for EVERY node as if it were the root of the tree (e.g., LeetCode 834 "Sum of Distances in Tree"). A naive approach runs DFS from each of the N nodes, taking O(N^2) time which gets TLE for N = 10^5. The Re-rooting Technique computes all N answers in optimal O(N) time using two DFS passes. Pass 1 (Post-Order): Arbitrarily root at 0 and compute subtree sizes `count[u]` and baseline answer `ans[0]`. Pass 2 (Pre-Order): When shifting the root from parent `u` to child `v`, `count[v]` nodes move 1 step closer to the new root, and `(N - count[v])` nodes move 1 step further away. Hence: ans[v] = ans[u] - count[v] + (N - count[v]) = ans[u] + N - 2 * count[v].',
    timeSpaceNote: 'Time Complexity: O(N) exactly two DFS traversals. Space Complexity: O(N) for tree adjacency list and DP arrays.',
    kapilMentorTip:
      'Kapil Invariant Proof: In re-rooting, never recompute the entire tree from scratch. Mathematically decompose the tree into: (1) Child subtree `v`, and (2) The rest of the tree `Tree \ Subtree(v)`. When moving root u -> v: Subtree(v) nodes become 1 step closer (-count[v]), and the rest of the tree nodes become 1 step further (+ (N - count[v])). Write this delta formula down clearly on your whiteboard.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>

#define MAX_N 10000

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

int main(void) {
    N = 6;
    for (int i = 0; i < N; i++) head[i] = -1;
    edgeIdx = 0;
    // Tree: 0-1, 0-2, 2-3, 2-4, 2-5
    addEdge(0, 1); addEdge(0, 2); addEdge(2, 3); addEdge(2, 4); addEdge(2, 5);

    dfs1(0, -1);
    dfs2(0, -1);

    printf("Sum of Distances for all nodes in Tree (C17):\\n");
    for (int i = 0; i < N; i++) {
        printf("  Node %d: %d\\n", i, ans[i]);
    }
    // Output: Node 0: 8, Node 1: 12, Node 2: 6, Node 3: 10, Node 4: 10, Node 5: 10
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class TreeDistanceRerooting {
    int n;
    vector<vector<int>> adj;
    vector<int> count, ans;

    void dfs1(int u, int p) {
        count[u] = 1;
        for (int v : adj[u]) {
            if (v == p) continue;
            dfs1(v, u);
            count[u] += count[v];
            ans[0] += ans[v] + count[v];
        }
    }

    void dfs2(int u, int p) {
        for (int v : adj[u]) {
            if (v == p) continue;
            ans[v] = ans[u] - count[v] + (n - count[v]);
            dfs2(v, u);
        }
    }

public:
    TreeDistanceRerooting(int n, const vector<pair<int, int>>& edges) : n(n), adj(n), count(n, 0), ans(n, 0) {
        for (auto& [u, v] : edges) {
            adj[u].push_back(v);
            adj[v].push_back(u);
        }
    }

    vector<int> solve() {
        dfs1(0, -1);
        dfs2(0, -1);
        return ans;
    }
};

int main() {
    int n = 6;
    vector<pair<int, int>> edges = {{0,1}, {0,2}, {2,3}, {2,4}, {2,5}};
    TreeDistanceRerooting solver(n, edges);
    auto res = solver.solve();
    cout << "Tree Rerooting All Distances (C++20):" << endl;
    for (int i = 0; i < n; ++i) cout << "  Node " << i << ": " << res[i] << endl;
    return 0;
}`,
      java: `import java.util.*;

public class TreeRerootingDistances {
    private final int n;
    private final List<List<Integer>> adj;
    private final int[] count, ans;

    public TreeRerootingDistances(int n) {
        this.n = n;
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        count = new int[n];
        ans = new int[n];
    }

    public void addEdge(int u, int v) {
        adj.get(u).add(v);
        adj.get(v).add(u);
    }

    public int[] solve() {
        dfs1(0, -1);
        dfs2(0, -1);
        return ans;
    }

    private void dfs1(int u, int p) {
        count[u] = 1;
        for (int v : adj.get(u)) {
            if (v == p) continue;
            dfs1(v, u);
            count[u] += count[v];
            ans[0] += ans[v] + count[v];
        }
    }

    private void dfs2(int u, int p) {
        for (int v : adj.get(u)) {
            if (v == p) continue;
            ans[v] = ans[u] - count[v] + (n - count[v]);
            dfs2(v, u);
        }
    }

    public static void main(String[] args) {
        TreeRerootingDistances tree = new TreeRerootingDistances(6);
        tree.addEdge(0, 1); tree.addEdge(0, 2); tree.addEdge(2, 3);
        tree.addEdge(2, 4); tree.addEdge(2, 5);
        int[] result = tree.solve();
        System.out.println("Sum of distances (Java 21): " + Arrays.toString(result));
    }
}`,
      python: `def sum_of_distances_in_tree(n: int, edges: list[list[int]]) -> list[int]:
    import collections
    adj = collections.defaultdict(list)
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)

    count = [1] * n
    ans = [0] * n

    def dfs1(u: int, p: int):
        for v in adj[u]:
            if v == p:
                continue
            dfs1(v, u)
            count[u] += count[v]
            ans[0] += ans[v] + count[v]

    def dfs2(u: int, p: int):
        for v in adj[u]:
            if v == p:
                continue
            ans[v] = ans[u] - count[v] + (n - count[v])
            dfs2(v, u)

    dfs1(0, -1)
    dfs2(0, -1)
    return ans

if __name__ == "__main__":
    edges = [[0, 1], [0, 2], [2, 3], [2, 4], [2, 5]]
    print("Tree Rerooting Distances (Python 3.12):", sum_of_distances_in_tree(6, edges))`,
    },
  },
  {
    id: 'd12-note-4',
    title: 'Monotonic Deque DP Optimization: Slashing O(N·K) Transitions to Linear O(N)',
    conceptSummary:
      'In standard dynamic programming, transition equations of the form `dp[i] = nums[i] + max_{i-k <= j < i} (dp[j])` require scanning the previous K entries, yielding O(N * K) time. When N = 10^5 and K = 50,000, O(N * K) = 5 * 10^9 operations (guaranteed TLE). Monotonic Deque Optimization maintains indices in a double-ended queue (`std::deque`) such that their corresponding DP values are strictly decreasing: dp[q[0]] > dp[q[1]] > ... > dp[q[m]]. Expired indices outside the sliding window (j < i - k) are evicted from the front in O(1). Suboptimal smaller DP values are evicted from the back before inserting the new candidate. Every element enters and leaves the deque at most once, reducing total transition time across all N states to strictly linear O(N).',
    timeSpaceNote: 'Time Complexity: O(N) amortized across the entire array. Space Complexity: O(K) or O(N) for deque and DP table.',
    kapilMentorTip:
      'Kapil Invariant Template: When maintaining a max-deque, before pushing index i, pop from the back while `dp[deque.back()] <= dp[i]`. Why? Because index i is both LARGER in value AND NEWER (will live longer in the sliding window). A candidate that is both smaller and expires sooner is completely useless and must be pruned.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <limits.h>

#define MAX_N 100000

// LeetCode 1425: Constrained Subsequence Sum in O(N) using Monotonic Deque
int constrainedSubsetSum(int* nums, int numsSize, int k) {
    int dp[MAX_N];
    int deque[MAX_N];
    int head = 0, tail = 0; // deque pointers

    int maxSum = nums[0];

    for (int i = 0; i < numsSize; i++) {
        // Evict expired elements outside sliding window [i - k, i - 1]
        while (head < tail && deque[head] < i - k) {
            head++;
        }

        int prevMax = (head < tail && dp[deque[head]] > 0) ? dp[deque[head]] : 0;
        dp[i] = nums[i] + prevMax;
        if (dp[i] > maxSum) maxSum = dp[i];

        // Maintain monotonically decreasing deque
        while (head < tail && dp[deque[tail - 1]] <= dp[i]) {
            tail--;
        }
        deque[tail++] = i;
    }
    return maxSum;
}

int main(void) {
    int nums[] = {10, 2, -10, 5, 20};
    int k = 2;
    printf("Max Constrained Subsequence Sum (C17): %d\\n", constrainedSubsetSum(nums, 5, k)); // Output: 37
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <deque>
#include <algorithm>

using namespace std;

// LeetCode 1425: Constrained Subsequence Sum in O(N)
int constrainedSubsetSum(const vector<int>& nums, int k) {
    int n = nums.size();
    vector<int> dp(n);
    deque<int> dq;
    int maxSum = nums[0];

    for (int i = 0; i < n; ++i) {
        if (!dq.empty() && dq.front() < i - k) {
            dq.pop_front();
        }

        dp[i] = nums[i] + (!dq.empty() && dp[dq.front()] > 0 ? dp[dq.front()] : 0);
        maxSum = max(maxSum, dp[i]);

        while (!dq.empty() && dp[dq.back()] <= dp[i]) {
            dq.pop_back();
        }
        dq.push_back(i);
    }
    return maxSum;
}

int main() {
    vector<int> nums = {10, 2, -10, 5, 20};
    int k = 2;
    cout << "Constrained Subsequence Sum (C++20): " << constrainedSubsetSum(nums, k) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class MonotonicDequeDP {
    public static int constrainedSubsetSum(int[] nums, int k) {
        int n = nums.length;
        int[] dp = new int[n];
        Deque<Integer> dq = new ArrayDeque<>();
        int maxSum = nums[0];

        for (int i = 0; i < n; i++) {
            if (!dq.isEmpty() && dq.peekFirst() < i - k) {
                dq.pollFirst();
            }

            dp[i] = nums[i] + (!dq.isEmpty() && dp[dq.peekFirst()] > 0 ? dp[dq.peekFirst()] : 0);
            maxSum = Math.max(maxSum, dp[i]);

            while (!dq.isEmpty() && dp[dq.peekLast()] <= dp[i]) {
                dq.pollLast();
            }
            dq.addLast(i);
        }
        return maxSum;
    }

    public static void main(String[] args) {
        int[] nums = {10, 2, -10, 5, 20};
        System.out.println("Max Constrained Sum (Java 21): " + constrainedSubsetSum(nums, 2));
    }
}`,
      python: `import collections

def constrained_subset_sum(nums: list[int], k: int) -> int:
    dp = [0] * len(nums)
    dq = collections.deque()
    max_sum = nums[0]

    for i, x in enumerate(nums):
        if dq and dq[0] < i - k:
            dq.popleft()

        prev_max = dp[dq[0]] if dq and dp[dq[0]] > 0 else 0
        dp[i] = x + prev_max
        max_sum = max(max_sum, dp[i])

        while dq and dp[dq[-1]] <= dp[i]:
            dq.pop()
        dq.append(i)

    return max_sum

if __name__ == "__main__":
    nums = [10, 2, -10, 5, 20]
    print("Constrained Subsequence Sum (Python 3.12):", constrained_subset_sum(nums, 2))`,
    },
  },
  {
    id: 'd12-note-5',
    title: 'Interval Dynamic Programming: Subarray Spans & Matrix Chain Multiplication',
    conceptSummary:
      'Interval DP computes solutions for contiguous subsegments `[i, j]` ordered by increasing interval length `len = 1, 2, ..., N`. In problems like Matrix Chain Multiplication, Burst Balloons (LeetCode 312), and Minimum Cost to Merge Stones (LeetCode 1000): `dp[i][j]` represents the optimal cost to process the interval between index `i` and `j`. The state splits the interval at an intermediate partition point `k` where `i <= k < j`: dp[i][j] = min_{k} (dp[i][k] + dp[k+1][j] + cost(i, k, j)). In Burst Balloons, the reverse intuition is essential: consider balloon `k` as the LAST balloon to be burst in `[i, j]`. This makes `k` independent of the internal order of balloons in `[i, k-1]` and `[k+1, j]`.',
    timeSpaceNote: 'Time Complexity: O(N^3) with 3 nested loops (length, left endpoint, partition point). Space Complexity: O(N^2) for the 2D DP table.',
    kapilMentorTip:
      'Kapil Inversion Insight (Burst Balloons): If you try to pick the FIRST balloon to burst, the subproblems become dependent because bursting balloon k suddenly makes its neighbors adjacent. But if you think backwards and pick the LAST balloon k to burst in window [i, j], balloon k is bordered by the fixed boundary balloons nums[i-1] and nums[j+1]! This restores subproblem independence.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

// LeetCode 312: Burst Balloons in O(N^3)
int maxCoins(const int* nums, int numsSize) {
    int n = numsSize;
    int val[n + 2];
    val[0] = 1;
    for (int i = 0; i < n; i++) val[i + 1] = nums[i];
    val[n + 1] = 1;

    int dp[n + 2][n + 2];
    memset(dp, 0, sizeof(dp));

    for (int len = 1; len <= n; len++) {
        for (int left = 1; left <= n - len + 1; left++) {
            int right = left + len - 1;
            for (int k = left; k <= right; k++) {
                int coins = val[left - 1] * val[k] * val[right + 1];
                coins += dp[left][k - 1] + dp[k + 1][right];
                dp[left][right] = MAX(dp[left][right], coins);
            }
        }
    }
    return dp[1][n];
}

int main(void) {
    int nums[] = {3, 1, 5, 8};
    printf("Max Burst Balloon Coins (C17): %d\\n", maxCoins(nums, 4)); // Output: 167
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int maxCoins(const vector<int>& nums) {
    int n = nums.size();
    vector<int> val(n + 2, 1);
    for (int i = 0; i < n; ++i) val[i + 1] = nums[i];

    vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));

    for (int len = 1; len <= n; ++len) {
        for (int left = 1; left <= n - len + 1; ++left) {
            int right = left + len - 1;
            for (int k = left; k <= right; ++k) {
                int coins = val[left - 1] * val[k] * val[right + 1]
                          + dp[left][k - 1] + dp[k + 1][right];
                dp[left][right] = max(dp[left][right], coins);
            }
        }
    }
    return dp[1][n];
}

int main() {
    vector<int> nums = {3, 1, 5, 8};
    cout << "Max Coins Burst Balloons (C++20): " << maxCoins(nums) << endl;
    return 0;
}`,
      java: `public class IntervalDpBurstBalloons {
    public static int maxCoins(int[] nums) {
        int n = nums.length;
        int[] val = new int[n + 2];
        val[0] = 1;
        System.arraycopy(nums, 0, val, 1, n);
        val[n + 1] = 1;

        int[][] dp = new int[n + 2][n + 2];

        for (int len = 1; len <= n; len++) {
            for (int left = 1; left <= n - len + 1; left++) {
                int right = left + len - 1;
                for (int k = left; k <= right; k++) {
                    int coins = val[left - 1] * val[k] * val[right + 1]
                              + dp[left][k - 1] + dp[k + 1][right];
                    dp[left][right] = Math.max(dp[left][right], coins);
                }
            }
        }
        return dp[1][n];
    }

    public static void main(String[] args) {
        int[] nums = {3, 1, 5, 8};
        System.out.println("Max Coins (Java 21): " + maxCoins(nums));
    }
}`,
      python: `def max_coins(nums: list[int]) -> int:
    val = [1] + nums + [1]
    n = len(nums)
    dp = [[0] * (n + 2) for _ in range(n + 2)]

    for length in range(1, n + 1):
        for left in range(1, n - length + 2):
            right = left + length - 1
            for k in range(left, right + 1):
                coins = val[left - 1] * val[k] * val[right + 1] + dp[left][k - 1] + dp[k + 1][right]
                if coins > dp[left][right]:
                    dp[left][right] = coins

    return dp[1][n]

if __name__ == "__main__":
    nums = [3, 1, 5, 8]
    print("Max Burst Balloon Coins (Python 3.12):", max_coins(nums))`,
    },
  },
];

const fileContent = `import { ProgrammingNote } from '../types';

/**
 * Day 12 High-Yield Polyglot Programming Notes (5 Placement Mastery Notes)
 * Module 13: Hard Dynamic Programming & State-Space Optimization
 * Mentor: Kapil (Placement Readiness Program)
 * Full Polyglot Coverage: C (C17), C++ (C++20), Java (Java 21), Python (Python 3.12)
 */

export const DAY_12_PROGRAMMING_NOTES: ProgrammingNote[] = ${JSON.stringify(notes, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/day12ProgrammingNotes.ts'), fileContent, 'utf8');
console.log('Successfully wrote src/data/day12ProgrammingNotes.ts');
