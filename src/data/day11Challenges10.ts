import { PracticalChallenge } from '../types';

/**
 * Placement Readiness Program
 * Mentor: Kapil | Day 11: FAANG Advanced Graph Theory & Network Flow
 * 10 Production-Grade Coding Challenges (C, C++, Java, Python)
 */
export const DAY_11_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  {
    id: 'd11-ch-1',
    day: 11,
    title: 'Distributed Build Order & Dependency Resolution (Kahn\'s Algorithm)',
    difficulty: 'Medium',
    moduleTag: 'FAANG Graph Engineering',
    companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
    platforms: ['LeetCode', 'Codeforces'],
    problemStatement:
      'Given N microservices numbered from 0 to N-1 and M directed dependency edges where edge `u v` denotes that service u must be compiled BEFORE service v. Return a valid linear compilation sequence. If a circular dependency exists (deadlock), output `DEADLOCK`. If multiple valid orders exist, output any valid one.',
    inputFormat: 'First line: N M (number of services and edges). Next M lines: u v (directed dependency from u to v).',
    outputFormat: 'Space-separated integers representing compilation order, or `DEADLOCK`.',
    constraints: ['1 <= N <= 10^5', '0 <= M <= 2 * 10^5', '0 <= u, v < N'],
    sampleInput: '4 4\n0 1\n0 2\n1 3\n2 3',
    sampleOutput: '0 1 2 3',
    kapilIntuition:
      'Mentorship By Kapil: Calculate the in-degree of all vertices. Push all vertices with in-degree 0 into a queue. As each vertex is popped, record it in the order and decrement the in-degree of its outgoing neighbors. If a neighbor reaches in-degree 0, enqueue it. If the final sequence length is less than N, a directed cycle exists.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    testCases: [
      {
        id: 'tc-1',
        input: '4 4\n0 1\n0 2\n1 3\n2 3',
        expectedOutput: '0 1 2 3',
        isHidden: false,
        explanation: '0 has in-degree 0. Then 1 and 2 become ready, followed by 3.'
      },
      {
        id: 'tc-2',
        input: '2 2\n0 1\n1 0',
        expectedOutput: 'DEADLOCK',
        isHidden: false,
        explanation: '0 and 1 depend mutually on each other, causing a circular deadlock.'
      },
      {
        id: 'tc-3',
        input: '1 0',
        expectedOutput: '0',
        isHidden: true,
        explanation: 'Single service with no prerequisites.'
      }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    // Implement Kahn's Algorithm
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
    int N, M;
    if (!(cin >> N >> M)) return 0;
    // Implement Kahn's Algorithm
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        // Implement Kahn's Algorithm
    }
}`,
      python: `import sys
from collections import deque

def solve():
    lines = sys.stdin.read().split()
    if not lines:
        return
    N = int(lines[0])
    M = int(lines[1])
    # Implement Kahn's Algorithm

if __name__ == "__main__":
    solve()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int val;
    struct Node* next;
} Node;

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    Node** adj = (Node**)calloc(N, sizeof(Node*));
    int* inDegree = (int*)calloc(N, sizeof(int));
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        Node* node = (Node*)malloc(sizeof(Node));
        node->val = v;
        node->next = adj[u];
        adj[u] = node;
        inDegree[v]++;
    }
    int* q = (int*)malloc(N * sizeof(int));
    int front = 0, rear = 0;
    for (int i = 0; i < N; i++) {
        if (inDegree[i] == 0) q[rear++] = i;
    }
    int* res = (int*)malloc(N * sizeof(int));
    int count = 0;
    while (front < rear) {
        int u = q[front++];
        res[count++] = u;
        for (Node* curr = adj[u]; curr != NULL; curr = curr->next) {
            if (--inDegree[curr->val] == 0) {
                q[rear++] = curr->val;
            }
        }
    }
    if (count == N) {
        for (int i = 0; i < N; i++) {
            printf("%d%s", res[i], (i == N - 1) ? "" : " ");
        }
        printf("\\n");
    } else {
        printf("DEADLOCK\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N, M;
    if (!(cin >> N >> M)) return 0;
    vector<vector<int>> adj(N);
    vector<int> inDegree(N, 0);
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        inDegree[v]++;
    }
    queue<int> q;
    for (int i = 0; i < N; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    vector<int> order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) {
                q.push(v);
            }
        }
    }
    if (order.size() == (size_t)N) {
        for (size_t i = 0; i < order.size(); i++) {
            cout << order[i] << (i + 1 == order.size() ? "" : " ");
        }
        cout << "\\n";
    } else {
        cout << "DEADLOCK\\n";
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < N; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[N];
        for (int i = 0; i < M; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
            inDegree[v]++;
        }
        Queue<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < N; i++) {
            if (inDegree[i] == 0) q.offer(i);
        }
        List<Integer> order = new ArrayList<>();
        while (!q.isEmpty()) {
            int u = q.poll();
            order.add(u);
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    q.offer(v);
                }
            }
        }
        if (order.size() == N) {
            for (int i = 0; i < N; i++) {
                System.out.print(order.get(i) + (i == N - 1 ? "" : " "));
            }
            System.out.println();
        } else {
            System.out.println("DEADLOCK");
        }
    }
}`,
      python: `import sys
from collections import deque

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N = int(data[0])
    M = int(data[1])
    adj = [[] for _ in range(N)]
    in_degree = [0] * N
    idx = 2
    for _ in range(M):
        u = int(data[idx])
        v = int(data[idx+1])
        idx += 2
        adj[u].append(v)
        in_degree[v] += 1

    q = deque([i for i in range(N) if in_degree[i] == 0])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                q.append(v)

    if len(order) == N:
        print(*(order))
    else:
        print("DEADLOCK")

if __name__ == "__main__":
    solve()`
    }
  },
  {
    id: 'd11-ch-2',
    day: 11,
    title: 'Low-Latency Server Packet Routing (Dijkstra\'s Min-Heap)',
    difficulty: 'Medium',
    moduleTag: 'FAANG Graph Engineering',
    companies: ['Amazon', 'Google', 'Cisco', 'Cloudflare'],
    platforms: ['LeetCode', 'HackerRank'],
    problemStatement:
      'Given a network of N servers (0 to N-1) connected by M directed links, each having a transmission latency in milliseconds. Given a source server S and destination server D, find the minimum total latency to deliver a packet from S to D. If D is unreachable from S, output -1.',
    inputFormat: 'First line: N M S D. Next M lines: u v w (directed link from server u to v with latency w).',
    outputFormat: 'Single integer representing minimum latency, or -1.',
    constraints: ['1 <= N <= 10^5', '1 <= M <= 3 * 10^5', '0 <= w <= 10^4', '0 <= S, D < N'],
    sampleInput: '4 4 0 3\n0 1 10\n0 2 5\n2 1 2\n1 3 1',
    sampleOutput: '8',
    kapilIntuition:
      'Mentorship By Kapil: Dijkstra with a Min-Heap. The path 0 -> 2 (5) -> 1 (5+2=7) -> 3 (7+1=8) is cheaper than direct 0 -> 1 (10) -> 3 (11). Store pair (dist, u) in priority queue and skip stale popped entries.',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V + E)',
    testCases: [
      {
        id: 'tc-1',
        input: '4 4 0 3\n0 1 10\n0 2 5\n2 1 2\n1 3 1',
        expectedOutput: '8',
        isHidden: false,
        explanation: 'Optimal route: 0 -> 2 -> 1 -> 3 has latency 5 + 2 + 1 = 8.'
      },
      {
        id: 'tc-2',
        input: '3 1 0 2\n0 1 15',
        expectedOutput: '-1',
        isHidden: false,
        explanation: 'Destination 2 is completely unreachable.'
      },
      {
        id: 'tc-3',
        input: '2 1 0 0\n0 1 50',
        expectedOutput: '0',
        isHidden: true,
        explanation: 'Source is destination, latency is 0.'
      }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, M, S, D;
    if (scanf("%d %d %d %d", &N, &M, &S, &D) != 4) return 0;
    // Implement Dijkstra Min-Heap
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
    int N, M, S, D;
    if (!(cin >> N >> M >> S >> D)) return 0;
    // Implement Dijkstra
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        int S = sc.nextInt();
        int D = sc.nextInt();
        // Implement Dijkstra
    }
}`,
      python: `import sys
import heapq

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M, S, D = map(int, data[:4])
    # Implement Dijkstra

if __name__ == "__main__":
    solve()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

typedef struct Edge {
    int to, weight;
    struct Edge* next;
} Edge;

typedef struct {
    int u, d;
} HeapNode;

typedef struct {
    HeapNode* arr;
    int size;
} MinHeap;

void swap(HeapNode* a, HeapNode* b) { HeapNode t = *a; *a = *b; *b = t; }

void push(MinHeap* h, int u, int d) {
    int i = h->size++;
    h->arr[i].u = u;
    h->arr[i].d = d;
    while (i > 0 && h->arr[i].d < h->arr[(i - 1) / 2].d) {
        swap(&h->arr[i], &h->arr[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

HeapNode pop(MinHeap* h) {
    HeapNode top = h->arr[0];
    h->arr[0] = h->arr[--h->size];
    int i = 0;
    while (2 * i + 1 < h->size) {
        int left = 2 * i + 1, right = 2 * i + 2, best = left;
        if (right < h->size && h->arr[right].d < h->arr[left].d) best = right;
        if (h->arr[best].d < h->arr[i].d) {
            swap(&h->arr[i], &h->arr[best]);
            i = best;
        } else break;
    }
    return top;
}

int main() {
    int N, M, S, D;
    if (scanf("%d %d %d %d", &N, &M, &S, &D) != 4) return 0;
    Edge** adj = (Edge**)calloc(N, sizeof(Edge*));
    for (int i = 0; i < M; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        Edge* e = (Edge*)malloc(sizeof(Edge));
        e->to = v; e->weight = w; e->next = adj[u];
        adj[u] = e;
    }
    int* dist = (int*)malloc(N * sizeof(int));
    for (int i = 0; i < N; i++) dist[i] = INT_MAX;
    dist[S] = 0;
    MinHeap h;
    h.arr = (HeapNode*)malloc((M + N + 10) * sizeof(HeapNode));
    h.size = 0;
    push(&h, S, 0);

    while (h.size > 0) {
        HeapNode top = pop(&h);
        int u = top.u, d = top.d;
        if (d > dist[u]) continue;
        if (u == D) break;
        for (Edge* e = adj[u]; e != NULL; e = e->next) {
            if (dist[u] + e->weight < dist[e->to]) {
                dist[e->to] = dist[u] + e->weight;
                push(&h, e->to, dist[e->to]);
            }
        }
    }
    printf("%d\\n", dist[D] == INT_MAX ? -1 : dist[D]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N, M, S, D;
    if (!(cin >> N >> M >> S >> D)) return 0;
    vector<vector<pair<int, int>>> adj(N);
    for (int i = 0; i < M; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
    vector<int> dist(N, INT_MAX);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    dist[S] = 0;
    pq.push({0, S});
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;
        if (u == D) break;
        for (auto& edge : adj[u]) {
            int v = edge.first;
            int w = edge.second;
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    cout << (dist[D] == INT_MAX ? -1 : dist[D]) << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    record Edge(int to, int weight) {}
    record NodeDist(int u, int d) implements Comparable<NodeDist> {
        public int compareTo(NodeDist o) {
            return Integer.compare(this.d, o.d);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        int S = sc.nextInt();
        int D = sc.nextInt();
        List<List<Edge>> adj = new ArrayList<>();
        for (int i = 0; i < N; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < M; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            int w = sc.nextInt();
            adj.get(u).add(new Edge(v, w));
        }
        int[] dist = new int[N];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[S] = 0;
        PriorityQueue<NodeDist> pq = new PriorityQueue<>();
        pq.offer(new NodeDist(S, 0));
        while (!pq.isEmpty()) {
            NodeDist top = pq.poll();
            int u = top.u;
            int d = top.d;
            if (d > dist[u]) continue;
            if (u == D) break;
            for (Edge e : adj.get(u)) {
                if (dist[u] + e.weight < dist[e.to]) {
                    dist[e.to] = dist[u] + e.weight;
                    pq.offer(new NodeDist(e.to, dist[e.to]));
                }
            }
        }
        System.out.println(dist[D] == Integer.MAX_VALUE ? -1 : dist[D]);
    }
}`,
      python: `import sys
import heapq

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M, S, D = map(int, data[:4])
    adj = [[] for _ in range(N)]
    idx = 4
    for _ in range(M):
        u = int(data[idx])
        v = int(data[idx+1])
        w = int(data[idx+2])
        idx += 3
        adj[u].append((v, w))

    dist = [float('inf')] * N
    dist[S] = 0
    pq = [(0, S)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        if u == D:
            break
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))

    print(-1 if dist[D] == float('inf') else dist[D])

if __name__ == "__main__":
    solve()`
    }
  },
  {
    id: 'd11-ch-3',
    day: 11,
    title: 'Redundant Cable Detection & Network Redundancy (DSU)',
    difficulty: 'Medium',
    moduleTag: 'FAANG Graph Engineering',
    companies: ['Google', 'Meta', 'Netflix'],
    platforms: ['LeetCode'],
    problemStatement:
      'In a datacenter tree topology of N nodes (labeled 1 to N), an extra edge was added forming exactly one cycle. Given M edges (where M = N), return the edge that can be removed so that the resulting graph is a tree of N nodes. If there are multiple answers, return the edge that occurs last in the input.',
    inputFormat: 'First line: N (number of nodes). Next N lines: u v (edges between nodes).',
    outputFormat: 'Print: u v (the redundant edge).',
    constraints: ['3 <= N <= 10^5', '1 <= u, v <= N', 'u != v'],
    sampleInput: '3\n1 2\n1 3\n2 3',
    sampleOutput: '2 3',
    kapilIntuition:
      'Mentorship By Kapil: Disjoint Set Union (DSU). Initialize each node with its own parent. For each edge (u, v), find the roots of u and v. If root(u) == root(v), they are already connected in the same component, which means adding (u, v) creates a cycle! Return that edge immediately.',
    timeComplexity: 'O(N * alpha(N))',
    spaceComplexity: 'O(N)',
    testCases: [
      {
        id: 'tc-1',
        input: '3\n1 2\n1 3\n2 3',
        expectedOutput: '2 3',
        isHidden: false,
        explanation: 'Edge 2 3 creates the cycle in the triangle.'
      },
      {
        id: 'tc-2',
        input: '5\n1 2\n2 3\n3 4\n1 4\n1 5',
        expectedOutput: '1 4',
        isHidden: false,
        explanation: 'Nodes 1-2-3-4 form a cycle. 1 4 appears last among the cycle edges.'
      }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N;
    if (scanf("%d", &N) != 1) return 0;
    // Implement DSU cycle detection
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N;
    if (!(cin >> N)) return 0;
    // Implement DSU
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        // Implement DSU
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N = int(data[0])
    # Implement DSU

if __name__ == "__main__":
    solve()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int findRoot(int parent[], int i) {
    if (parent[i] == i) return i;
    return parent[i] = findRoot(parent, parent[i]);
}

int main() {
    int N;
    if (scanf("%d", &N) != 1) return 0;
    int* parent = (int*)malloc((N + 1) * sizeof(int));
    for (int i = 1; i <= N; i++) parent[i] = i;
    int redU = -1, redV = -1;
    for (int i = 0; i < N; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        int rU = findRoot(parent, u);
        int rV = findRoot(parent, v);
        if (rU == rV) {
            redU = u;
            redV = v;
        } else {
            parent[rU] = rV;
        }
    }
    printf("%d %d\\n", redU, redV);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <numeric>

using namespace std;

int findRoot(vector<int>& parent, int i) {
    if (parent[i] == i) return i;
    return parent[i] = findRoot(parent, parent[i]);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N;
    if (!(cin >> N)) return 0;
    vector<int> parent(N + 1);
    iota(parent.begin(), parent.end(), 0);
    int redU = -1, redV = -1;
    for (int i = 0; i < N; i++) {
        int u, v;
        cin >> u >> v;
        int rU = findRoot(parent, u);
        int rV = findRoot(parent, v);
        if (rU == rV) {
            redU = u;
            redV = v;
        } else {
            parent[rU] = rV;
        }
    }
    cout << redU << " " << redV << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    static int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int[] parent = new int[N + 1];
        for (int i = 1; i <= N; i++) parent[i] = i;
        int redU = -1, redV = -1;
        for (int i = 0; i < N; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            int rU = find(parent, u);
            int rV = find(parent, v);
            if (rU == rV) {
                redU = u;
                redV = v;
            } else {
                parent[rU] = rV;
            }
        }
        System.out.println(redU + " " + redV);
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N = int(data[0])
    parent = list(range(N + 1))

    def find(i):
        if parent[i] == i:
            return i
        parent[i] = find(parent[i])
        return parent[i]

    idx = 1
    red_u, red_v = -1, -1
    for _ in range(N):
        u = int(data[idx])
        v = int(data[idx+1])
        idx += 2
        r_u, r_v = find(u), find(v)
        if r_u == r_v:
            red_u, red_v = u, v
        else:
            parent[r_u] = r_v

    print(f"{red_u} {red_v}")

if __name__ == "__main__":
    solve()`
    }
  },
  {
    id: 'd11-ch-4',
    day: 11,
    title: 'Financial Arbitrage & Negative Cycle Discovery (Bellman-Ford)',
    difficulty: 'Hard',
    moduleTag: 'FAANG Graph Engineering',
    companies: ['Goldman Sachs', 'Jane Street', 'Citadel', 'Two Sigma'],
    platforms: ['LeetCode', 'Codeforces'],
    problemStatement:
      'Given N currencies (0 to N-1) and M directed exchange rates where converting currency u to v multiplies your capital by rate R. An arbitrage opportunity exists if a trader can start with a currency, execute a sequence of trades, and finish with strictly more than 1 unit of that same currency. By taking -ln(R), finding arbitrage reduces to finding a negative cycle in a directed graph. Output `ARBITRAGE_FOUND` if a negative cycle exists, otherwise `NO_ARBITRAGE`.',
    inputFormat: 'First line: N M. Next M lines: u v w (where w is the weight = -100 * ln(rate)).',
    outputFormat: 'Print: ARBITRAGE_FOUND or NO_ARBITRAGE',
    constraints: ['2 <= N <= 2500', '1 <= M <= 10000', '-10000 <= w <= 10000'],
    sampleInput: '3 3\n0 1 10\n1 2 20\n2 0 -35',
    sampleOutput: 'ARBITRAGE_FOUND',
    kapilIntuition:
      'Mentorship By Kapil: Bellman-Ford relaxed over N-1 passes. If on the N-th pass any edge can still be relaxed (`dist[u] + w < dist[v]`), then a negative weight cycle exists.',
    timeComplexity: 'O(V * E)',
    spaceComplexity: 'O(V)',
    testCases: [
      {
        id: 'tc-1',
        input: '3 3\n0 1 10\n1 2 20\n2 0 -35',
        expectedOutput: 'ARBITRAGE_FOUND',
        isHidden: false,
        explanation: 'Cycle 0->1->2->0 has net weight 10 + 20 - 35 = -5 < 0, signifying arbitrage.'
      },
      {
        id: 'tc-2',
        input: '3 3\n0 1 10\n1 2 20\n2 0 -25',
        expectedOutput: 'NO_ARBITRAGE',
        isHidden: false,
        explanation: 'Cycle net weight is 10 + 20 - 25 = 5 > 0, no negative cycle.'
      }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    // Implement Bellman-Ford
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, M;
    if (!(cin >> N >> M)) return 0;
    // Implement Bellman-Ford
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        // Implement Bellman-Ford
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M = int(data[0]), int(data[1])
    # Implement Bellman-Ford

if __name__ == "__main__":
    solve()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int u, v, w;
} Edge;

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    Edge* edges = (Edge*)malloc(M * sizeof(Edge));
    for (int i = 0; i < M; i++) {
        scanf("%d %d %d", &edges[i].u, &edges[i].v, &edges[i].w);
    }
    long long* dist = (long long*)calloc(N, sizeof(long long));
    // Bellman-Ford N-1 iterations
    for (int iter = 0; iter < N - 1; iter++) {
        for (int i = 0; i < M; i++) {
            int u = edges[i].u, v = edges[i].v, w = edges[i].w;
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    // N-th iteration check
    bool hasCycle = false;
    for (int i = 0; i < M; i++) {
        int u = edges[i].u, v = edges[i].v, w = edges[i].w;
        if (dist[u] + w < dist[v]) {
            hasCycle = true;
            break;
        }
    }
    printf("%s\\n", hasCycle ? "ARBITRAGE_FOUND" : "NO_ARBITRAGE");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

struct Edge { int u, v, w; };

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N, M;
    if (!(cin >> N >> M)) return 0;
    vector<Edge> edges(M);
    for (int i = 0; i < M; i++) {
        cin >> edges[i].u >> edges[i].v >> edges[i].w;
    }
    vector<long long> dist(N, 0);
    for (int iter = 0; iter < N - 1; iter++) {
        for (const auto& e : edges) {
            if (dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.w;
            }
        }
    }
    bool hasNegativeCycle = false;
    for (const auto& e : edges) {
        if (dist[e.u] + e.w < dist[e.v]) {
            hasNegativeCycle = true;
            break;
        }
    }
    cout << (hasNegativeCycle ? "ARBITRAGE_FOUND" : "NO_ARBITRAGE") << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    record Edge(int u, int v, int w) {}

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        List<Edge> edges = new ArrayList<>();
        for (int i = 0; i < M; i++) {
            edges.add(new Edge(sc.nextInt(), sc.nextInt(), sc.nextInt()));
        }
        long[] dist = new long[N];
        for (int iter = 0; iter < N - 1; iter++) {
            for (Edge e : edges) {
                if (dist[e.u] + e.w < dist[e.v]) {
                    dist[e.v] = dist[e.u] + e.w;
                }
            }
        }
        boolean hasNegCycle = false;
        for (Edge e : edges) {
            if (dist[e.u] + e.w < dist[e.v]) {
                hasNegCycle = true;
                break;
            }
        }
        System.out.println(hasNegCycle ? "ARBITRAGE_FOUND" : "NO_ARBITRAGE");
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M = int(data[0]), int(data[1])
    edges = []
    idx = 2
    for _ in range(M):
        edges.append((int(data[idx]), int(data[idx+1]), int(data[idx+2])))
        idx += 3

    dist = [0] * N
    for _ in range(N - 1):
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    has_neg_cycle = any(dist[u] + w < dist[v] for u, v, w in edges)
    print("ARBITRAGE_FOUND" if has_neg_cycle else "NO_ARBITRAGE")

if __name__ == "__main__":
    solve()`
    }
  },
  {
    id: 'd11-ch-5',
    day: 11,
    title: 'Meta Social Network: Degrees of Separation (Bidirectional BFS)',
    difficulty: 'Medium',
    moduleTag: 'FAANG Graph Engineering',
    companies: ['Meta', 'LinkedIn', 'Google'],
    platforms: ['LeetCode', 'InterviewBit'],
    problemStatement:
      'Given an undirected social graph of N people (0 to N-1) with M friendship links, find the minimum degrees of separation (number of friendship hops) between user S and user D. If they are in disconnected friend circles, output -1.',
    inputFormat: 'First line: N M S D. Next M lines: u v (friendship edge between u and v).',
    outputFormat: 'Single integer representing the minimum number of hops, or -1.',
    constraints: ['2 <= N <= 10^5', '0 <= M <= 2 * 10^5', '0 <= S, D < N'],
    sampleInput: '5 4 0 4\n0 1\n1 2\n2 3\n3 4',
    sampleOutput: '4',
    kapilIntuition:
      'Mentorship By Kapil: Bidirectional BFS. Expanding forward from S and backward from D and alternating to always expand the smaller frontier reduces time from O(b^d) to O(b^(d/2)).',
    timeComplexity: 'O(b^(d/2))',
    spaceComplexity: 'O(b^(d/2))',
    testCases: [
      {
        id: 'tc-1',
        input: '5 4 0 4\n0 1\n1 2\n2 3\n3 4',
        expectedOutput: '4',
        isHidden: false,
        explanation: '0 - 1 - 2 - 3 - 4 has 4 hops.'
      },
      {
        id: 'tc-2',
        input: '4 1 0 3\n0 1',
        expectedOutput: '-1',
        isHidden: false,
        explanation: '3 is disconnected from 0.'
      }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, M, S, D;
    if (scanf("%d %d %d %d", &N, &M, &S, &D) != 4) return 0;
    // Implement BFS
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, M, S, D;
    if (!(cin >> N >> M >> S >> D)) return 0;
    // Implement Bidirectional BFS
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        int S = sc.nextInt();
        int D = sc.nextInt();
        // Implement Bidirectional BFS
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M, S, D = map(int, data[:4])
    # Implement Bidirectional BFS

if __name__ == "__main__":
    solve()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct Node {
    int val;
    struct Node* next;
} Node;

int main() {
    int N, M, S, D;
    if (scanf("%d %d %d %d", &N, &M, &S, &D) != 4) return 0;
    if (S == D) { printf("0\\n"); return 0; }
    Node** adj = (Node**)calloc(N, sizeof(Node*));
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        Node* n1 = (Node*)malloc(sizeof(Node)); n1->val = v; n1->next = adj[u]; adj[u] = n1;
        Node* n2 = (Node*)malloc(sizeof(Node)); n2->val = u; n2->next = adj[v]; adj[v] = n2;
    }
    int* dist = (int*)malloc(N * sizeof(int));
    for (int i = 0; i < N; i++) dist[i] = -1;
    dist[S] = 0;
    int* q = (int*)malloc(N * sizeof(int));
    int f = 0, r = 0;
    q[r++] = S;
    while (f < r) {
        int u = q[f++];
        if (u == D) break;
        for (Node* curr = adj[u]; curr != NULL; curr = curr->next) {
            if (dist[curr->val] == -1) {
                dist[curr->val] = dist[u] + 1;
                q[r++] = curr->val;
            }
        }
    }
    printf("%d\\n", dist[D]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N, M, S, D;
    if (!(cin >> N >> M >> S >> D)) return 0;
    if (S == D) { cout << "0\\n"; return 0; }
    vector<vector<int>> adj(N);
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    unordered_set<int> fwd = {S}, bwd = {D};
    vector<bool> visFwd(N, false), visBwd(N, false);
    visFwd[S] = true;
    visBwd[D] = true;
    int hops = 0;
    bool found = false;

    while (!fwd.empty() && !bwd.empty()) {
        hops++;
        if (fwd.size() > bwd.size()) {
            swap(fwd, bwd);
            swap(visFwd, visBwd);
        }
        unordered_set<int> nextFrontier;
        for (int u : fwd) {
            for (int v : adj[u]) {
                if (bwd.count(v)) {
                    found = true;
                    break;
                }
                if (!visFwd[v]) {
                    visFwd[v] = true;
                    nextFrontier.insert(v);
                }
            }
            if (found) break;
        }
        if (found) break;
        fwd = move(nextFrontier);
    }
    cout << (found ? hops : -1) << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        int S = sc.nextInt();
        int D = sc.nextInt();
        if (S == D) { System.out.println(0); return; }
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < N; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < M; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        Set<Integer> fwd = new HashSet<>(List.of(S));
        Set<Integer> bwd = new HashSet<>(List.of(D));
        boolean[] visFwd = new boolean[N];
        boolean[] visBwd = new boolean[N];
        visFwd[S] = true;
        visBwd[D] = true;
        int hops = 0;
        boolean found = false;
        while (!fwd.isEmpty() && !bwd.isEmpty()) {
            hops++;
            if (fwd.size() > bwd.size()) {
                Set<Integer> temp = fwd; fwd = bwd; bwd = temp;
                boolean[] tVis = visFwd; visFwd = visBwd; visBwd = tVis;
            }
            Set<Integer> next = new HashSet<>();
            for (int u : fwd) {
                for (int v : adj.get(u)) {
                    if (bwd.contains(v)) { found = true; break; }
                    if (!visFwd[v]) {
                        visFwd[v] = true;
                        next.add(v);
                    }
                }
                if (found) break;
            }
            if (found) break;
            fwd = next;
        }
        System.out.println(found ? hops : -1);
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M, S, D = map(int, data[:4])
    if S == D:
        print(0)
        return
    adj = [[] for _ in range(N)]
    idx = 4
    for _ in range(M):
        u, v = int(data[idx]), int(data[idx+1])
        idx += 2
        adj[u].append(v)
        adj[v].append(u)

    fwd = {S}
    bwd = {D}
    vis_fwd = {S}
    vis_bwd = {D}
    hops = 0
    found = False

    while fwd and bwd:
        hops += 1
        if len(fwd) > len(bwd):
            fwd, bwd = bwd, fwd
            vis_fwd, vis_bwd = vis_bwd, vis_fwd

        next_frontier = set()
        for u in fwd:
            for v in adj[u]:
                if v in bwd:
                    found = True
                    break
                if v not in vis_fwd:
                    vis_fwd.add(v)
                    next_frontier.add(v)
            if found:
                break
        if found:
            break
        fwd = next_frontier

    print(hops if found else -1)

if __name__ == "__main__":
    solve()`
    }
  },
  {
    id: 'd11-ch-6',
    day: 11,
    title: 'Critical Infrastructure: Bridge Count in Network (Tarjan\'s)',
    difficulty: 'Hard',
    moduleTag: 'FAANG Graph Engineering',
    companies: ['Amazon', 'Microsoft', 'Google'],
    platforms: ['LeetCode'],
    problemStatement:
      'Given an undirected communication network of N servers (0 to N-1) with M bidirectional cables. A cable is critical (a Bridge) if cutting it partitions the network into more disconnected components. Count the total number of critical cables.',
    inputFormat: 'First line: N M. Next M lines: u v (cable connecting u and v).',
    outputFormat: 'Single integer representing total number of critical bridges.',
    constraints: ['2 <= N <= 10^5', '1 <= M <= 2 * 10^5', '0 <= u, v < N'],
    sampleInput: '4 4\n0 1\n1 2\n2 0\n1 3',
    sampleOutput: '1',
    kapilIntuition:
      'Mentorship By Kapil: Tarjan\'s Bridge-finding algorithm using DFS entry time `tin` and low-link value `low`. When traversing tree edge (u, v), if `low[v] > tin[u]`, edge (u, v) is a critical bridge.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    testCases: [
      {
        id: 'tc-1',
        input: '4 4\n0 1\n1 2\n2 0\n1 3',
        expectedOutput: '1',
        isHidden: false,
        explanation: 'Edge 1-3 is the only bridge; removing it isolates node 3.'
      },
      {
        id: 'tc-2',
        input: '3 3\n0 1\n1 2\n2 0',
        expectedOutput: '0',
        isHidden: false,
        explanation: 'Simple cycle of length 3 has 0 bridges (2-edge connected).'
      }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    // Implement Tarjan's Bridge
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, M;
    if (!(cin >> N >> M)) return 0;
    // Implement Tarjan's Bridge
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        // Implement Tarjan's Bridge
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M = int(data[0]), int(data[1])
    # Implement Tarjan's Bridge

if __name__ == "__main__":
    solve()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int val;
    struct Node* next;
} Node;

int timer = 0, bridgeCount = 0;
int min(int a, int b) { return a < b ? a : b; }

void dfs(int u, int p, Node** adj, int tin[], int low[], int vis[]) {
    vis[u] = 1;
    tin[u] = low[u] = ++timer;
    for (Node* curr = adj[u]; curr != NULL; curr = curr->next) {
        int v = curr->val;
        if (v == p) continue;
        if (vis[v]) {
            low[u] = min(low[u], tin[v]);
        } else {
            dfs(v, u, adj, tin, low, vis);
            low[u] = min(low[u], low[v]);
            if (low[v] > tin[u]) {
                bridgeCount++;
            }
        }
    }
}

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    Node** adj = (Node**)calloc(N, sizeof(Node*));
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        Node* n1 = (Node*)malloc(sizeof(Node)); n1->val = v; n1->next = adj[u]; adj[u] = n1;
        Node* n2 = (Node*)malloc(sizeof(Node)); n2->val = u; n2->next = adj[v]; adj[v] = n2;
    }
    int* tin = (int*)calloc(N, sizeof(int));
    int* low = (int*)calloc(N, sizeof(int));
    int* vis = (int*)calloc(N, sizeof(int));
    for (int i = 0; i < N; i++) {
        if (!vis[i]) dfs(i, -1, adj, tin, low, vis);
    }
    printf("%d\\n", bridgeCount);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int timer = 0, bridges = 0;

void dfs(int u, int p, const vector<vector<int>>& adj, vector<int>& tin, vector<int>& low, vector<bool>& vis) {
    vis[u] = true;
    tin[u] = low[u] = ++timer;
    for (int v : adj[u]) {
        if (v == p) continue;
        if (vis[v]) {
            low[u] = min(low[u], tin[v]);
        } else {
            dfs(v, u, adj, tin, low, vis);
            low[u] = min(low[u], low[v]);
            if (low[v] > tin[u]) bridges++;
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N, M;
    if (!(cin >> N >> M)) return 0;
    vector<vector<int>> adj(N);
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    vector<int> tin(N, -1), low(N, -1);
    vector<bool> vis(N, false);
    for (int i = 0; i < N; i++) {
        if (!vis[i]) dfs(i, -1, adj, tin, low, vis);
    }
    cout << bridges << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    static int timer = 0, bridges = 0;

    static void dfs(int u, int p, List<List<Integer>> adj, int[] tin, int[] low, boolean[] vis) {
        vis[u] = true;
        tin[u] = low[u] = ++timer;
        for (int v : adj.get(u)) {
            if (v == p) continue;
            if (vis[v]) {
                low[u] = Math.min(low[u], tin[v]);
            } else {
                dfs(v, u, adj, tin, low, vis);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > tin[u]) bridges++;
            }
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < N; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < M; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        int[] tin = new int[N];
        int[] low = new int[N];
        boolean[] vis = new boolean[N];
        for (int i = 0; i < N; i++) {
            if (!vis[i]) dfs(i, -1, adj, tin, low, vis);
        }
        System.out.println(bridges);
    }
}`,
      python: `import sys
sys.setrecursionlimit(200000)

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M = int(data[0]), int(data[1])
    adj = [[] for _ in range(N)]
    idx = 2
    for _ in range(M):
        u, v = int(data[idx]), int(data[idx+1])
        idx += 2
        adj[u].append(v)
        adj[v].append(u)

    tin = [-1] * N
    low = [-1] * N
    vis = [False] * N
    timer = 0
    bridges = 0

    def dfs(u, p):
        nonlocal timer, bridges
        vis[u] = True
        timer += 1
        tin[u] = low[u] = timer
        for v in adj[u]:
            if v == p:
                continue
            if vis[v]:
                low[u] = min(low[u], tin[v])
            else:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > tin[u]:
                    bridges += 1

    for i in range(N):
        if not vis[i]:
            dfs(i, -1)

    print(bridges)

if __name__ == "__main__":
    solve()`
    }
  },
  {
    id: 'd11-ch-7',
    day: 11,
    title: 'Cheapest Flights with At Most K Transit Stops (Bounded Bellman-Ford)',
    difficulty: 'Medium',
    moduleTag: 'FAANG Graph Engineering',
    companies: ['Airbnb', 'Google', 'Expedia'],
    platforms: ['LeetCode'],
    problemStatement:
      'There are N cities connected by M flights. Given source city S, destination D, and an integer K (maximum allowable stops, meaning at most K+1 flight legs). Return the cheapest price to reach D from S with at most K stops. If impossible, output -1.',
    inputFormat: 'First line: N M S D K. Next M lines: u v price (cost of flight from city u to city v).',
    outputFormat: 'Single integer representing cheapest price, or -1.',
    constraints: ['1 <= N <= 100', '0 <= M <= N * (N - 1) / 2', '0 <= K <= 100'],
    sampleInput: '4 5 0 3 1\n0 1 100\n1 2 100\n2 3 100\n0 2 500\n2 3 200',
    sampleOutput: '700',
    kapilIntuition:
      'Mentorship By Kapil: Bellman-Ford algorithm executed for exactly K + 1 iterations. In each iteration, use a clone of previous distances to prevent cascading updates from taking multiple hops in a single iteration step.',
    timeComplexity: 'O(K * E)',
    spaceComplexity: 'O(V)',
    testCases: [
      {
        id: 'tc-1',
        input: '4 5 0 3 1\n0 1 100\n1 2 100\n2 3 100\n0 2 500\n2 3 200',
        expectedOutput: '700',
        isHidden: false,
        explanation: 'Route 0->2->3 has 1 stop and cost 500+200=700. Route 0->1->2->3 costs 300 but needs 2 stops (> K).'
      },
      {
        id: 'tc-2',
        input: '3 3 0 2 0\n0 1 100\n1 2 100\n0 2 500',
        expectedOutput: '500',
        isHidden: false,
        explanation: '0 stops requires a direct flight: 0->2 cost 500.'
      }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, M, S, D, K;
    if (scanf("%d %d %d %d %d", &N, &M, &S, &D, &K) != 5) return 0;
    // Implement Bounded Bellman-Ford
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, M, S, D, K;
    if (!(cin >> N >> M >> S >> D >> K)) return 0;
    // Implement Bounded Bellman-Ford
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        int S = sc.nextInt();
        int D = sc.nextInt();
        int K = sc.nextInt();
        // Implement Bounded Bellman-Ford
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M, S, D, K = map(int, data[:5])
    # Implement Bounded Bellman-Ford

if __name__ == "__main__":
    solve()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define INF 1000000000

typedef struct {
    int u, v, w;
} Flight;

int main() {
    int N, M, S, D, K;
    if (scanf("%d %d %d %d %d", &N, &M, &S, &D, &K) != 5) return 0;
    Flight* flights = (Flight*)malloc(M * sizeof(Flight));
    for (int i = 0; i < M; i++) {
        scanf("%d %d %d", &flights[i].u, &flights[i].v, &flights[i].w);
    }
    int* dist = (int*)malloc(N * sizeof(int));
    int* temp = (int*)malloc(N * sizeof(int));
    for (int i = 0; i < N; i++) dist[i] = INF;
    dist[S] = 0;

    for (int i = 0; i <= K; i++) {
        memcpy(temp, dist, N * sizeof(int));
        for (int j = 0; j < M; j++) {
            int u = flights[j].u, v = flights[j].v, w = flights[j].w;
            if (dist[u] != INF && dist[u] + w < temp[v]) {
                temp[v] = dist[u] + w;
            }
        }
        memcpy(dist, temp, N * sizeof(int));
    }
    printf("%d\\n", dist[D] >= INF ? -1 : dist[D]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

const int INF = 1e9;

struct Flight { int u, v, w; };

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N, M, S, D, K;
    if (!(cin >> N >> M >> S >> D >> K)) return 0;
    vector<Flight> flights(M);
    for (int i = 0; i < M; i++) {
        cin >> flights[i].u >> flights[i].v >> flights[i].w;
    }
    vector<int> dist(N, INF);
    dist[S] = 0;
    for (int step = 0; step <= K; step++) {
        vector<int> temp = dist;
        for (const auto& f : flights) {
            if (dist[f.u] != INF && dist[f.u] + f.w < temp[f.v]) {
                temp[f.v] = dist[f.u] + f.w;
            }
        }
        dist = move(temp);
    }
    cout << (dist[D] >= INF ? -1 : dist[D]) << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    record Flight(int u, int v, int w) {}
    static final int INF = (int)1e9;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        int S = sc.nextInt();
        int D = sc.nextInt();
        int K = sc.nextInt();
        List<Flight> flights = new ArrayList<>();
        for (int i = 0; i < M; i++) {
            flights.add(new Flight(sc.nextInt(), sc.nextInt(), sc.nextInt()));
        }
        int[] dist = new int[N];
        Arrays.fill(dist, INF);
        dist[S] = 0;
        for (int step = 0; step <= K; step++) {
            int[] temp = Arrays.copyOf(dist, N);
            for (Flight f : flights) {
                if (dist[f.u] != INF && dist[f.u] + f.w < temp[f.v]) {
                    temp[f.v] = dist[f.u] + f.w;
                }
            }
            dist = temp;
        }
        System.out.println(dist[D] >= INF ? -1 : dist[D]);
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M, S, D, K = map(int, data[:5])
    flights = []
    idx = 5
    for _ in range(M):
        flights.append((int(data[idx]), int(data[idx+1]), int(data[idx+2])))
        idx += 3

    dist = [float('inf')] * N
    dist[S] = 0
    for _ in range(K + 1):
        temp = list(dist)
        for u, v, w in flights:
            if dist[u] != float('inf') and dist[u] + w < temp[v]:
                temp[v] = dist[u] + w
        dist = temp

    print(-1 if dist[D] == float('inf') else dist[D])

if __name__ == "__main__":
    solve()`
    }
  },
  {
    id: 'd11-ch-8',
    day: 11,
    title: 'Bipartite Matching & Maximum Server Assignment',
    difficulty: 'Hard',
    moduleTag: 'FAANG Graph Engineering',
    companies: ['Google', 'Meta', 'Uber'],
    platforms: ['LeetCode', 'SPOJ'],
    problemStatement:
      'Given P pending compute jobs (0 to P-1) and S available server instances (0 to S-1). Each job can only be executed on certain compatible servers. Each server can handle at most 1 job. Given the list of compatible pairs, find the maximum number of jobs that can be simultaneously assigned.',
    inputFormat: 'First line: P S M (jobs, servers, and edges). Next M lines: p s (job p can run on server s).',
    outputFormat: 'Single integer representing maximum matchings.',
    constraints: ['1 <= P, S <= 500', '0 <= M <= P * S'],
    sampleInput: '3 3 4\n0 0\n0 1\n1 1\n2 2',
    sampleOutput: '3',
    kapilIntuition:
      'Mentorship By Kapil: Maximum Bipartite Matching using augmenting paths (Ford-Fulkerson or Kuhn\'s algorithm). Maintain `match[server]` array and run a DFS for each job.',
    timeComplexity: 'O(V * E)',
    spaceComplexity: 'O(V + E)',
    testCases: [
      {
        id: 'tc-1',
        input: '3 3 4\n0 0\n0 1\n1 1\n2 2',
        expectedOutput: '3',
        isHidden: false,
        explanation: '0->0, 1->1, 2->2 gives a maximum matching of 3.'
      },
      {
        id: 'tc-2',
        input: '2 2 2\n0 0\n1 0',
        expectedOutput: '1',
        isHidden: false,
        explanation: 'Both jobs only run on server 0. Server can take only 1, so max matching is 1.'
      }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int P, S, M;
    if (scanf("%d %d %d", &P, &S, &M) != 3) return 0;
    // Implement Bipartite Matching
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int P, S, M;
    if (!(cin >> P >> S >> M)) return 0;
    // Implement Bipartite Matching
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int P = sc.nextInt();
        int S = sc.nextInt();
        int M = sc.nextInt();
        // Implement Bipartite Matching
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    P, S, M = map(int, data[:3])
    # Implement Bipartite Matching

if __name__ == "__main__":
    solve()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

#define MAX_V 600

int adj[MAX_V][MAX_V];
int adjSize[MAX_V];
int match[MAX_V];
bool vis[MAX_V];

bool dfs(int u) {
    for (int i = 0; i < adjSize[u]; i++) {
        int v = adj[u][i];
        if (!vis[v]) {
            vis[v] = true;
            if (match[v] < 0 || dfs(match[v])) {
                match[v] = u;
                return true;
            }
        }
    }
    return false;
}

int main() {
    int P, S, M;
    if (scanf("%d %d %d", &P, &S, &M) != 3) return 0;
    memset(adjSize, 0, sizeof(adjSize));
    for (int i = 0; i < M; i++) {
        int p, s;
        scanf("%d %d", &p, &s);
        adj[p][adjSize[p]++] = s;
    }
    memset(match, -1, sizeof(match));
    int result = 0;
    for (int u = 0; u < P; u++) {
        memset(vis, false, sizeof(vis));
        if (dfs(u)) result++;
    }
    printf("%d\\n", result);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

bool dfs(int u, const vector<vector<int>>& adj, vector<int>& match, vector<bool>& vis) {
    for (int v : adj[u]) {
        if (!vis[v]) {
            vis[v] = true;
            if (match[v] == -1 || dfs(match[v], adj, match, vis)) {
                match[v] = u;
                return true;
            }
        }
    }
    return false;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int P, S, M;
    if (!(cin >> P >> S >> M)) return 0;
    vector<vector<int>> adj(P);
    for (int i = 0; i < M; i++) {
        int p, s;
        cin >> p >> s;
        adj[p].push_back(s);
    }
    vector<int> match(S, -1);
    int totalMatches = 0;
    for (int u = 0; u < P; u++) {
        vector<bool> vis(S, false);
        if (dfs(u, adj, match, vis)) totalMatches++;
    }
    cout << totalMatches << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    static boolean dfs(int u, List<List<Integer>> adj, int[] match, boolean[] vis) {
        for (int v : adj.get(u)) {
            if (!vis[v]) {
                vis[v] = true;
                if (match[v] == -1 || dfs(match[v], adj, match, vis)) {
                    match[v] = u;
                    return true;
                }
            }
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int P = sc.nextInt();
        int S = sc.nextInt();
        int M = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < P; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < M; i++) {
            adj.get(sc.nextInt()).add(sc.nextInt());
        }
        int[] match = new int[S];
        Arrays.fill(match, -1);
        int totalMatches = 0;
        for (int u = 0; u < P; u++) {
            boolean[] vis = new boolean[S];
            if (dfs(u, adj, match, vis)) totalMatches++;
        }
        System.out.println(totalMatches);
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    P, S, M = map(int, data[:3])
    adj = [[] for _ in range(P)]
    idx = 3
    for _ in range(M):
        p, s = int(data[idx]), int(data[idx+1])
        idx += 2
        adj[p].append(s)

    match = [-1] * S

    def dfs(u, vis):
        for v in adj[u]:
            if not vis[v]:
                vis[v] = True
                if match[v] == -1 or dfs(match[v], vis):
                    match[v] = u
                    return True
        return False

    ans = 0
    for u in range(P):
        vis = [False] * S
        if dfs(u, vis):
            ans += 1
    print(ans)

if __name__ == "__main__":
    solve()`
    }
  },
  {
    id: 'd11-ch-9',
    day: 11,
    title: 'Eulerian Flight Itinerary Reconstruction (Hierholzer\'s Algorithm)',
    difficulty: 'Hard',
    moduleTag: 'FAANG Graph Engineering',
    companies: ['Google', 'Meta', 'Apple'],
    platforms: ['LeetCode'],
    problemStatement:
      'Given a list of flight tickets represented by pairs of departure and arrival airport codes (0 to N-1). Reconstruct the itinerary in order, starting from airport 0. All tickets must be used exactly once. When multiple valid itineraries exist, choose the lexicographically smallest route.',
    inputFormat: 'First line: N M (airports and tickets). Next M lines: u v (flight ticket from u to v).',
    outputFormat: 'Space-separated airport IDs representing the complete valid itinerary.',
    constraints: ['1 <= N <= 1000', '1 <= M <= 5000'],
    sampleInput: '4 5\n0 1\n0 2\n1 2\n2 0\n2 3',
    sampleOutput: '0 1 2 0 2 3',
    kapilIntuition:
      'Mentorship By Kapil: Hierholzer\'s algorithm for Eulerian path. Sort edges outgoing from each vertex in ascending order, then run DFS popping edges as you traverse. Add vertices to the itinerary stack on backtracking, then reverse.',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V + E)',
    testCases: [
      {
        id: 'tc-1',
        input: '4 5\n0 1\n0 2\n1 2\n2 0\n2 3',
        expectedOutput: '0 1 2 0 2 3',
        isHidden: false,
        explanation: '0->1->2->0->2->3 uses all 5 tickets starting at 0.'
      }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    // Implement Hierholzer's algorithm
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, M;
    if (!(cin >> N >> M)) return 0;
    // Implement Hierholzer
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        // Implement Hierholzer
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M = int(data[0]), int(data[1])
    # Implement Hierholzer

if __name__ == "__main__":
    solve()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

#define MAX_E 10000

typedef struct Edge {
    int to;
    struct Edge* next;
} Edge;

Edge* adj[1005];
int route[MAX_E], routeLen = 0;

void addEdgeSorted(int u, int v) {
    Edge* e = (Edge*)malloc(sizeof(Edge));
    e->to = v;
    if (!adj[u] || v < adj[u]->to) {
        e->next = adj[u];
        adj[u] = e;
        return;
    }
    Edge* curr = adj[u];
    while (curr->next && curr->next->to <= v) {
        curr = curr->next;
    }
    e->next = curr->next;
    curr->next = e;
}

void dfs(int u) {
    while (adj[u]) {
        Edge* nextEdge = adj[u];
        adj[u] = adj[u]->next;
        dfs(nextEdge->to);
    }
    route[routeLen++] = u;
}

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    for (int i = 0; i < N; i++) adj[i] = NULL;
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        addEdgeSorted(u, v);
    }
    dfs(0);
    for (int i = routeLen - 1; i >= 0; i--) {
        printf("%d%s", route[i], (i == 0 ? "" : " "));
    }
    printf("\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

void dfs(int u, vector<priority_queue<int, vector<int>, greater<int>>>& adj, vector<int>& route) {
    while (!adj[u].empty()) {
        int v = adj[u].top();
        adj[u].pop();
        dfs(v, adj, route);
    }
    route.push_back(u);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N, M;
    if (!(cin >> N >> M)) return 0;
    vector<priority_queue<int, vector<int>, greater<int>>> adj(N);
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push(v);
    }
    vector<int> route;
    dfs(0, adj, route);
    reverse(route.begin(), route.end());
    for (size_t i = 0; i < route.size(); i++) {
        cout << route[i] << (i + 1 == route.size() ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    static void dfs(int u, Map<Integer, PriorityQueue<Integer>> adj, List<Integer> route) {
        PriorityQueue<Integer> pq = adj.get(u);
        while (pq != null && !pq.isEmpty()) {
            dfs(pq.poll(), adj, route);
        }
        route.add(u);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        Map<Integer, PriorityQueue<Integer>> adj = new HashMap<>();
        for (int i = 0; i < N; i++) adj.put(i, new PriorityQueue<>());
        for (int i = 0; i < M; i++) {
            adj.get(sc.nextInt()).offer(sc.nextInt());
        }
        List<Integer> route = new ArrayList<>();
        dfs(0, adj, route);
        Collections.reverse(route);
        for (int i = 0; i < route.size(); i++) {
            System.out.print(route.get(i) + (i == route.size() - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
      python: `import sys
from collections import defaultdict
import heapq

sys.setrecursionlimit(20000)

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M = int(data[0]), int(data[1])
    adj = defaultdict(list)
    idx = 2
    for _ in range(M):
        u, v = int(data[idx]), int(data[idx+1])
        idx += 2
        heapq.heappush(adj[u], v)

    route = []
    def dfs(u):
        while adj[u]:
            v = heapq.heappop(adj[u])
            dfs(v)
        route.append(u)

    dfs(0)
    print(*(route[::-1]))

if __name__ == "__main__":
    solve()`
    }
  },
  {
    id: 'd11-ch-10',
    day: 11,
    title: 'Minimum Cable Cost for Cross-Datacenter Interconnect (Kruskal\'s MST)',
    difficulty: 'Medium',
    moduleTag: 'FAANG Graph Engineering',
    companies: ['Google', 'AWS', 'Microsoft', 'Oracle'],
    platforms: ['LeetCode', 'HackerRank'],
    problemStatement:
      'Given N datacenter locations (0 to N-1) and M proposed fiber-optic bidirectional cables, each with a deployment cost. Find the minimum total cost to connect all N datacenters into a single connected network. If it is impossible to connect all datacenters, output -1.',
    inputFormat: 'First line: N M. Next M lines: u v cost.',
    outputFormat: 'Single integer representing minimum total cost, or -1.',
    constraints: ['1 <= N <= 10^5', '0 <= M <= 2 * 10^5', '0 <= cost <= 10^5'],
    sampleInput: '4 5\n0 1 1\n0 2 4\n1 2 2\n1 3 6\n2 3 3',
    sampleOutput: '6',
    kapilIntuition:
      'Mentorship By Kapil: Kruskal\'s Algorithm with Disjoint Set Union (DSU). Sort all edges ascending by cost. Iterate through edges, uniting sets. If an edge connects two previously disjoint components, add its cost to total and decrement component count. If components reach 1, output cost, else -1.',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V + E)',
    testCases: [
      {
        id: 'tc-1',
        input: '4 5\n0 1 1\n0 2 4\n1 2 2\n1 3 6\n2 3 3',
        expectedOutput: '6',
        isHidden: false,
        explanation: 'Select edges (0,1,1), (1,2,2), (2,3,3) = total cost 1 + 2 + 3 = 6.'
      },
      {
        id: 'tc-2',
        input: '3 1\n0 1 5',
        expectedOutput: '-1',
        isHidden: false,
        explanation: 'Node 2 cannot be connected, so MST is impossible.'
      }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    // Implement Kruskal's MST
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, M;
    if (!(cin >> N >> M)) return 0;
    // Implement Kruskal
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        // Implement Kruskal
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M = int(data[0]), int(data[1])
    # Implement Kruskal

if __name__ == "__main__":
    solve()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int u, v, cost;
} Edge;

int cmp(const void* a, const void* b) {
    return ((Edge*)a)->cost - ((Edge*)b)->cost;
}

int findRoot(int parent[], int i) {
    if (parent[i] == i) return i;
    return parent[i] = findRoot(parent, parent[i]);
}

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    if (N <= 1) { printf("0\\n"); return 0; }
    Edge* edges = (Edge*)malloc(M * sizeof(Edge));
    for (int i = 0; i < M; i++) {
        scanf("%d %d %d", &edges[i].u, &edges[i].v, &edges[i].cost);
    }
    qsort(edges, M, sizeof(Edge), cmp);
    int* parent = (int*)malloc(N * sizeof(int));
    for (int i = 0; i < N; i++) parent[i] = i;

    long long totalCost = 0;
    int edgesCount = 0;
    for (int i = 0; i < M; i++) {
        int rU = findRoot(parent, edges[i].u);
        int rV = findRoot(parent, edges[i].v);
        if (rU != rV) {
            parent[rU] = rV;
            totalCost += edges[i].cost;
            edgesCount++;
            if (edgesCount == N - 1) break;
        }
    }
    if (edgesCount == N - 1) {
        printf("%lld\\n", totalCost);
    } else {
        printf("-1\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

using namespace std;

struct Edge { int u, v, cost; };

int findRoot(vector<int>& parent, int i) {
    if (parent[i] == i) return i;
    return parent[i] = findRoot(parent, parent[i]);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N, M;
    if (!(cin >> N >> M)) return 0;
    if (N <= 1) { cout << "0\\n"; return 0; }
    vector<Edge> edges(M);
    for (int i = 0; i < M; i++) {
        cin >> edges[i].u >> edges[i].v >> edges[i].cost;
    }
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
        return a.cost < b.cost;
    });
    vector<int> parent(N);
    iota(parent.begin(), parent.end(), 0);

    long long totalCost = 0;
    int connectedEdges = 0;
    for (const auto& e : edges) {
        int rU = findRoot(parent, e.u);
        int rV = findRoot(parent, e.v);
        if (rU != rV) {
            parent[rU] = rV;
            totalCost += e.cost;
            connectedEdges++;
            if (connectedEdges == N - 1) break;
        }
    }
    cout << (connectedEdges == N - 1 ? totalCost : -1) << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    record Edge(int u, int v, int cost) {}

    static int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        if (N <= 1) { System.out.println(0); return; }
        List<Edge> edges = new ArrayList<>();
        for (int i = 0; i < M; i++) {
            edges.add(new Edge(sc.nextInt(), sc.nextInt(), sc.nextInt()));
        }
        edges.sort(Comparator.comparingInt(Edge::cost));
        int[] parent = new int[N];
        for (int i = 0; i < N; i++) parent[i] = i;

        long totalCost = 0;
        int edgeCount = 0;
        for (Edge e : edges) {
            int rU = find(parent, e.u);
            int rV = find(parent, e.v);
            if (rU != rV) {
                parent[rU] = rV;
                totalCost += e.cost;
                edgeCount++;
                if (edgeCount == N - 1) break;
            }
        }
        System.out.println(edgeCount == N - 1 ? totalCost : -1);
    }
}`,
      python: `import sys

def solve():
    data = sys.stdin.read().split()
    if not data:
        return
    N, M = int(data[0]), int(data[1])
    if N <= 1:
        print(0)
        return
    edges = []
    idx = 2
    for _ in range(M):
        edges.append((int(data[idx]), int(data[idx+1]), int(data[idx+2])))
        idx += 3

    edges.sort(key=lambda x: x[2])
    parent = list(range(N))

    def find(i):
        if parent[i] == i:
            return i
        parent[i] = find(parent[i])
        return parent[i]

    total_cost = 0
    edge_count = 0
    for u, v, cost in edges:
        r_u, r_v = find(u), find(v)
        if r_u != r_v:
            parent[r_u] = r_v
            total_cost += cost
            edge_count += 1
            if edge_count == N - 1:
                break

    print(total_cost if edge_count == N - 1 else -1)

if __name__ == "__main__":
    solve()`
    }
  }
];
