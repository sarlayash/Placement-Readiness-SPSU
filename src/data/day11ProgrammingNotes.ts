import { ProgrammingNote } from '../types';

/**
 * Placement Readiness Program
 * Mentor: Kapil | Day 11: FAANG Advanced Graph Theory & Network Flow
 * 5 Comprehensive Polyglot Programming Notes (C, C++, Java, Python)
 */
export const DAY_11_PROGRAMMING_NOTES: ProgrammingNote[] = [
  {
    id: 'd11-note-1',
    title: 'Topological Sort & Cycle Detection in DAGs (Kahn\'s Algorithm & 3-Color DFS)',
    conceptSummary:
      'In FAANG systems (Bazel build systems, task schedulers, Airflow pipelines), tasks depend on preceding tasks. A Topological Ordering exists if and only if the directed graph has zero directed cycles (is a DAG). Kahn\'s Algorithm maintains in-degrees of all vertices in an array/map. Vertices with in-degree 0 are queued. When popped, their outgoing edges are removed (decrementing destination in-degrees). If the count of processed vertices equals V, the graph is a DAG; otherwise, a circular dependency deadlock exists. Time complexity is O(V + E) and space complexity is O(V + E).',
    timeSpaceNote: 'Time: O(V + E) | Space: O(V + E) for adjacency list and in-degree queue.',
    kapilMentorTip:
      'Mentor Kapil Intuition: Whenever a FAANG interviewer asks for "task order", "prerequisites", "compilation order", or "deadlock detection", immediately think Kahn\'s algorithm. Tracking in-degrees is cleaner to write under interview pressure than recursive cycle-coloring DFS.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_V 1000

typedef struct Node {
    int val;
    struct Node* next;
} Node;

typedef struct {
    Node* head;
} AdjList;

void addEdge(AdjList adj[], int u, int v) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->val = v;
    newNode->next = adj[u].head;
    adj[u].head = newNode;
}

bool kahnTopologicalSort(int V, AdjList adj[], int result[]) {
    int inDegree[MAX_V] = {0};
    for (int u = 0; u < V; u++) {
        for (Node* curr = adj[u].head; curr != NULL; curr = curr->next) {
            inDegree[curr->val]++;
        }
    }
    int queue[MAX_V], front = 0, rear = 0;
    for (int i = 0; i < V; i++) {
        if (inDegree[i] == 0) queue[rear++] = i;
    }
    int count = 0;
    while (front < rear) {
        int u = queue[front++];
        result[count++] = u;
        for (Node* curr = adj[u].head; curr != NULL; curr = curr->next) {
            if (--inDegree[curr->val] == 0) {
                queue[rear++] = curr->val;
            }
        }
    }
    return count == V;
}

int main() {
    int V = 4;
    AdjList adj[MAX_V] = {0};
    addEdge(adj, 0, 1);
    addEdge(adj, 0, 2);
    addEdge(adj, 1, 3);
    addEdge(adj, 2, 3);
    int order[MAX_V];
    if (kahnTopologicalSort(V, adj, order)) {
        printf("Valid Build Order: ");
        for (int i = 0; i < V; i++) printf("%d ", order[i]);
        printf("\\n");
    } else {
        printf("Deadlock detected (Cycle exists)\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

vector<int> findTopologicalOrder(int numTasks, const vector<pair<int, int>>& prerequisites) {
    vector<vector<int>> adj(numTasks);
    vector<int> inDegree(numTasks, 0);
    for (const auto& [src, dst] : prerequisites) {
        adj[src].push_back(dst);
        inDegree[dst]++;
    }
    queue<int> zeroInDegreeQueue;
    for (int i = 0; i < numTasks; ++i) {
        if (inDegree[i] == 0) zeroInDegreeQueue.push(i);
    }
    vector<int> executionOrder;
    while (!zeroInDegreeQueue.empty()) {
        int current = zeroInDegreeQueue.front();
        zeroInDegreeQueue.pop();
        executionOrder.push_back(current);
        for (int neighbor : adj[current]) {
            if (--inDegree[neighbor] == 0) {
                zeroInDegreeQueue.push(neighbor);
            }
        }
    }
    return (executionOrder.size() == static_cast<size_t>(numTasks)) ? executionOrder : vector<int>{};
}

int main() {
    vector<pair<int, int>> deps = {{0, 1}, {0, 2}, {1, 3}, {2, 3}};
    auto order = findTopologicalOrder(4, deps);
    if (!order.empty()) {
        cout << "FAANG Build Sequence: ";
        for (int id : order) cout << id << " ";
        cout << "\\n";
    }
    return 0;
}`,
      java: `import java.util.*;

public class TopologicalBuildSystem {
    public static List<Integer> getBuildOrder(int numTasks, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numTasks; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numTasks];

        for (int[] edge : prerequisites) {
            adj.get(edge[0]).add(edge[1]);
            inDegree[edge[1]]++;
        }

        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numTasks; i++) {
            if (inDegree[i] == 0) queue.offer(i);
        }

        List<Integer> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            order.add(curr);
            for (int neighbor : adj.get(curr)) {
                if (--inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        return order.size() == numTasks ? order : Collections.emptyList();
    }

    public static void main(String[] args) {
        int[][] deps = {{0, 1}, {0, 2}, {1, 3}, {2, 3}};
        System.out.println("Kahn's Execution Plan: " + getBuildOrder(4, deps));
    }
}`,
      python: `from collections import deque
from typing import List, Tuple

def find_build_order(num_tasks: int, prerequisites: List[Tuple[int, int]]) -> List[int]:
    adj = {i: [] for i in range(num_tasks)}
    in_degree = [0] * num_tasks
    for src, dst in prerequisites:
        adj[src].append(dst)
        in_degree[dst] += 1

    queue = deque([i for i in range(num_tasks) if in_degree[i] == 0])
    order = []
    while queue:
        curr = queue.popleft()
        order.append(curr)
        for nxt in adj[curr]:
            in_degree[nxt] -= 1
            if in_degree[nxt] == 0:
                queue.append(nxt)

    return order if len(order) == num_tasks else []

if __name__ == "__main__":
    deps = [(0, 1), (0, 2), (1, 3), (2, 3)]
    print("Topological Task Order:", find_build_order(4, deps))
`
    }
  },
  {
    id: 'd11-note-2',
    title: 'Shortest Path on Massive Graphs: Dijkstra\'s Algorithm & 0-1 BFS',
    conceptSummary:
      'Dijkstra\'s algorithm finds the shortest path from a single source to all vertices in a weighted graph with non-negative edge weights. Using a Min-Heap (priority queue), it greedily expands the frontier with the smallest tentative distance. By pairing distances with node IDs, we avoid re-exploring sub-optimal paths. For graphs where edge weights are restricted to 0 or 1 (e.g. state transition graphs with free vs paid edges), Dijkstra\'s O((V + E) log V) can be accelerated to O(V + E) using 0-1 BFS with a double-ended queue (deque). Push weight 0 edges to the front and weight 1 edges to the back.',
    timeSpaceNote: 'Dijkstra: O((V + E) log V) time, O(V) space. 0-1 BFS: O(V + E) time, O(V) space.',
    kapilMentorTip:
      'Mentor Kapil Interview Rule: If an interviewer gives you a grid where some transitions cost 0 and others cost 1 (like obstacle removal, turn costs), do NOT use standard Dijkstra. Mention 0-1 BFS with std::deque / ArrayDeque to instantly earn brownie points for optimal O(V+E) velocity.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

#define V 5

int minDistance(int dist[], bool sptSet[]) {
    int min = INT_MAX, min_index = -1;
    for (int v = 0; v < V; v++) {
        if (!sptSet[v] && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}

void dijkstra(int graph[V][V], int src, int dist[]) {
    bool sptSet[V] = {false};
    for (int i = 0; i < V; i++) dist[i] = INT_MAX;
    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        if (u == -1) break;
        sptSet[u] = true;
        for (int v = 0; v < V; v++) {
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX
                && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
}

int main() {
    int graph[V][V] = {
        {0, 4, 1, 0, 0},
        {0, 0, 0, 1, 0},
        {0, 2, 0, 5, 0},
        {0, 0, 0, 0, 3},
        {0, 0, 0, 0, 0}
    };
    int dist[V];
    dijkstra(graph, 0, dist);
    printf("Shortest latency from Datacenter 0 to 4: %d ms\\n", dist[4]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>

using namespace std;

struct Edge {
    int to;
    int weight;
};

vector<int> dijkstraMinHeap(int V, int src, const vector<vector<Edge>>& adj) {
    vector<int> dist(V, INT_MAX);
    // Min-heap storing pair<distance, vertex>
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        if (d > dist[u]) continue; // Lazy deletion / stale entry skip

        for (const auto& edge : adj[u]) {
            if (dist[u] + edge.weight < dist[edge.to]) {
                dist[edge.to] = dist[u] + edge.weight;
                pq.push({dist[edge.to], edge.to});
            }
        }
    }
    return dist;
}

int main() {
    int V = 5;
    vector<vector<Edge>> adj(V);
    adj[0].push_back({1, 4});
    adj[0].push_back({2, 1});
    adj[2].push_back({1, 2});
    adj[1].push_back({3, 1});
    adj[2].push_back({3, 5});
    adj[3].push_back({4, 3});

    auto distances = dijkstraMinHeap(V, 0, adj);
    cout << "Min Hop Latency to Server 4: " << distances[4] << " ms\\n";
    return 0;
}`,
      java: `import java.util.*;

public class NetworkRoutingDijkstra {
    record Edge(int to, int weight) {}
    record PathNode(int vertex, int dist) implements Comparable<PathNode> {
        public int compareTo(PathNode other) {
            return Integer.compare(this.dist, other.dist);
        }
    }

    public static int[] computeShortestPaths(int V, int src, List<List<Edge>> adj) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        PriorityQueue<PathNode> pq = new PriorityQueue<>();

        dist[src] = 0;
        pq.offer(new PathNode(src, 0));

        while (!pq.isEmpty()) {
            PathNode current = pq.poll();
            int u = current.vertex();
            int d = current.dist();

            if (d > dist[u]) continue; // Skip stale entries

            for (Edge e : adj.get(u)) {
                if (dist[u] + e.weight() < dist[e.to()]) {
                    dist[e.to()] = dist[u] + e.weight();
                    pq.offer(new PathNode(e.to(), dist[e.to()]));
                }
            }
        }
        return dist;
    }

    public static void main(String[] args) {
        int V = 5;
        List<List<Edge>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++) adj.add(new ArrayList<>());
        adj.get(0).add(new Edge(1, 4));
        adj.get(0).add(new Edge(2, 1));
        adj.get(2).add(new Edge(1, 2));
        adj.get(1).add(new Edge(3, 1));
        adj.get(3).add(new Edge(4, 3));

        int[] res = computeShortestPaths(V, 0, adj);
        System.out.println("Optimal Latency to 4: " + res[4] + " ms");
    }
}`,
      python: `import heapq
from typing import List, Tuple, Dict

def dijkstra_routing(num_servers: int, src: int, edges: List[Tuple[int, int, int]]) -> Dict[int, int]:
    adj = {i: [] for i in range(num_servers)}
    for u, v, w in edges:
        adj[u].append((v, w))

    dist = {i: float('inf') for i in range(num_servers)}
    dist[src] = 0
    pq = [(0, src)]

    while pq:
        curr_d, u = heapq.heappop(pq)
        if curr_d > dist[u]:
            continue

        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))

    return dist

if __name__ == "__main__":
    edge_list = [(0, 1, 4), (0, 2, 1), (2, 1, 2), (1, 3, 1), (3, 4, 3)]
    res = dijkstra_routing(5, 0, edge_list)
    print("Latency from Server 0 to 4:", res[4], "ms")
`
    }
  },
  {
    id: 'd11-note-3',
    title: 'Disjoint Set Union (DSU) with Path Compression & Union by Rank',
    conceptSummary:
      'Disjoint Set Union (DSU) / Union-Find maintains partition of an N-element set into disjoint subsets. It supports two core primitives: `find(i)` (returns the canonical representative of the set containing i) and `union(i, j)` (merges sets containing i and j). Path Compression flattens the tree during find: `parent[i] = find(parent[i])`. Union by Rank attaches the smaller tree under the root of the deeper tree, preventing tall trees. Together, they achieve an amortized time complexity of O(alpha(N)) per operation, where alpha is the Inverse Ackermann function (effectively constant <= 4 for any physical universe scale). Crucial for dynamic connectivity, Kruskal\'s MST, and cluster isolation.',
    timeSpaceNote: 'Time: Amortized O(alpha(N)) ≈ O(1) per op | Space: O(N) for parent and rank arrays.',
    kapilMentorTip:
      'Mentor Kapil Pro-Tip: Memorize the 6-line DSU template. It is one of the most powerful algorithms in FAANG interviews. Whenever an interviewer mentions "dynamic connectivity", "redundant connections", or "friend circles", write DSU with path compression immediately.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int* parent;
    int* rank;
    int count;
} DSU;

DSU* createDSU(int n) {
    DSU* dsu = (DSU*)malloc(sizeof(DSU));
    dsu->parent = (int*)malloc(n * sizeof(int));
    dsu->rank = (int*)malloc(n * sizeof(int));
    dsu->count = n;
    for (int i = 0; i < n; i++) {
        dsu->parent[i] = i;
        dsu->rank[i] = 0;
    }
    return dsu;
}

int findRoot(DSU* dsu, int i) {
    if (dsu->parent[i] == i) return i;
    return dsu->parent[i] = findRoot(dsu, dsu->parent[i]); // Path compression
}

bool uniteSets(DSU* dsu, int i, int j) {
    int rootI = findRoot(dsu, i);
    int rootJ = findRoot(dsu, j);
    if (rootI == rootJ) return false; // Cycle detected

    // Union by rank
    if (dsu->rank[rootI] < dsu->rank[rootJ]) {
        dsu->parent[rootI] = rootJ;
    } else if (dsu->rank[rootI] > dsu->rank[rootJ]) {
        dsu->parent[rootJ] = rootI;
    } else {
        dsu->parent[rootJ] = rootI;
        dsu->rank[rootI]++;
    }
    dsu->count--;
    return true;
}

int main() {
    DSU* dsu = createDSU(5);
    uniteSets(dsu, 0, 1);
    uniteSets(dsu, 1, 2);
    printf("Are 0 and 2 connected? %s\\n", findRoot(dsu, 0) == findRoot(dsu, 2) ? "YES" : "NO");
    printf("Remaining Connected Clusters: %d\\n", dsu->count);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <numeric>

using namespace std;

class DisjointSetUnion {
private:
    vector<int> parent;
    vector<int> rank;
    int numComponents;

public:
    explicit DisjointSetUnion(int n) : parent(n), rank(n, 0), numComponents(n) {
        iota(parent.begin(), parent.end(), 0);
    }

    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }

    bool unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI == rootJ) return false;

        if (rank[rootI] < rank[rootJ]) {
            parent[rootI] = rootJ;
        } else if (rank[rootI] > rank[rootJ]) {
            parent[rootJ] = rootI;
        } else {
            parent[rootJ] = rootI;
            rank[rootI]++;
        }
        numComponents--;
        return true;
    }

    bool isConnected(int i, int j) {
        return find(i) == find(j);
    }

    int getComponentsCount() const { return numComponents; }
};

int main() {
    DisjointSetUnion dsu(5);
    dsu.unite(0, 1);
    dsu.unite(2, 3);
    dsu.unite(1, 2);
    cout << "Is 0 connected to 3? " << (dsu.isConnected(0, 3) ? "TRUE" : "FALSE") << "\\n";
    cout << "Total Subnets: " << dsu.getComponentsCount() << "\\n";
    return 0;
}`,
      java: `import java.util.stream.IntStream;

public class DisjointSetForest {
    private final int[] parent;
    private final int[] rank;
    private int components;

    public DisjointSetForest(int n) {
        this.parent = IntStream.range(0, n).toArray();
        this.rank = new int[n];
        this.components = n;
    }

    public int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }

    public boolean union(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI == rootJ) return false;

        if (rank[rootI] < rank[rootJ]) {
            parent[rootI] = rootJ;
        } else if (rank[rootI] > rank[rootJ]) {
            parent[rootJ] = rootI;
        } else {
            parent[rootJ] = rootI;
            rank[rootI]++;
        }
        components--;
        return true;
    }

    public int getComponents() { return components; }

    public static void main(String[] args) {
        DisjointSetForest dsu = new DisjointSetForest(5);
        dsu.union(0, 1);
        dsu.union(1, 4);
        System.out.println("0 and 4 connected: " + (dsu.find(0) == dsu.find(4)));
        System.out.println("Clusters: " + dsu.getComponents());
    }
}`,
      python: `class DisjointSetUnion:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n

    def find(self, i: int) -> int:
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i]) # Path compression
        return self.parent[i]

    def union(self, i: int, j: int) -> bool:
        root_i, root_j = self.find(i), self.find(j)
        if root_i == root_j:
            return False

        if self.rank[root_i] < self.rank[root_j]:
            self.parent[root_i] = root_j
        elif self.rank[root_i] > self.rank[root_j]:
            self.parent[root_j] = root_i
        else:
            self.parent[root_j] = root_i
            self.rank[root_i] += 1

        self.components -= 1
        return True

if __name__ == "__main__":
    dsu = DisjointSetUnion(5)
    dsu.union(0, 1)
    dsu.union(1, 2)
    print("0 connected to 2:", dsu.find(0) == dsu.find(2))
    print("Active network partitions:", dsu.components)
`
    }
  },
  {
    id: 'd11-note-4',
    title: 'Tarjan\'s Bridge & Articulation Point Algorithm in Critical Infrastructure',
    conceptSummary:
      'In distributed network infrastructure (AWS VPCs, Google Cloud Interconnects), a single point of failure (SPOF) must be automatically detected. An edge is a Bridge if removing it increases the number of connected components. A node is an Articulation Point if removing it and its incident edges disconnects the graph. Tarjan\'s Bridge algorithm uses DFS to assign discovery times `tin[u]` and lowest reachable discovery time `low[u]`. For an edge (u, v): if `low[v] > tin[u]`, then edge (u, v) is a Bridge because there is no back-edge from v\'s subtree to u or an ancestor of u. Time complexity is O(V + E) in a single DFS pass.',
    timeSpaceNote: 'Time: O(V + E) single-pass DFS | Space: O(V) recursion stack and low/tin arrays.',
    kapilMentorTip:
      'Mentor Kapil Insight: The condition `low[v] > tin[u]` is the key to identifying critical bridges. Do NOT use the parent edge as a back-edge. Always pass `parent` to the recursive helper to avoid counting trivial undirected reversals.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_V 100

typedef struct Node {
    int val;
    struct Node* next;
} Node;

Node* adj[MAX_V];
int timer = 0;
int tin[MAX_V], low[MAX_V];
int visited[MAX_V];

void addEdge(int u, int v) {
    Node* n1 = (Node*)malloc(sizeof(Node));
    n1->val = v; n1->next = adj[u]; adj[u] = n1;
    Node* n2 = (Node*)malloc(sizeof(Node));
    n2->val = u; n2->next = adj[v]; adj[v] = n2;
}

int min(int a, int b) { return a < b ? a : b; }

void dfsBridges(int u, int p) {
    visited[u] = 1;
    tin[u] = low[u] = ++timer;
    for (Node* curr = adj[u]; curr != NULL; curr = curr->next) {
        int v = curr->val;
        if (v == p) continue;
        if (visited[v]) {
            low[u] = min(low[u], tin[v]);
        } else {
            dfsBridges(v, u);
            low[u] = min(low[u], low[v]);
            if (low[v] > tin[u]) {
                printf("CRITICAL BRIDGE: %d - %d\\n", u, v);
            }
        }
    }
}

int main() {
    addEdge(0, 1);
    addEdge(1, 2);
    addEdge(2, 0);
    addEdge(1, 3);
    dfsBridges(0, -1);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class CriticalConnectionsFinder {
private:
    int timer = 0;
    vector<vector<int>> bridges;

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
                if (low[v] > tin[u]) {
                    bridges.push_back({u, v});
                }
            }
        }
    }

public:
    vector<vector<int>> findBridges(int n, const vector<vector<int>>& connections) {
        vector<vector<int>> adj(n);
        for (const auto& edge : connections) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }
        vector<int> tin(n, -1), low(n, -1);
        vector<bool> vis(n, false);
        for (int i = 0; i < n; ++i) {
            if (!vis[i]) dfs(i, -1, adj, tin, low, vis);
        }
        return bridges;
    }
};

int main() {
    CriticalConnectionsFinder finder;
    vector<vector<int>> conns = {{0, 1}, {1, 2}, {2, 0}, {1, 3}};
    auto b = finder.findBridges(4, conns);
    for (const auto& bridge : b) {
        cout << "Critical Link: " << bridge[0] << " <-> " << bridge[1] << "\\n";
    }
    return 0;
}`,
      java: `import java.util.*;

public class TarjanBridgeEngine {
    private int timer = 0;
    private final List<List<Integer>> bridges = new ArrayList<>();

    public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (List<Integer> edge : connections) {
            adj.get(edge.get(0)).add(edge.get(1));
            adj.get(edge.get(1)).add(edge.get(0));
        }

        int[] tin = new int[n];
        int[] low = new int[n];
        boolean[] vis = new boolean[n];

        for (int i = 0; i < n; i++) {
            if (!vis[i]) dfs(i, -1, adj, tin, low, vis);
        }
        return bridges;
    }

    private void dfs(int u, int p, List<List<Integer>> adj, int[] tin, int[] low, boolean[] vis) {
        vis[u] = true;
        tin[u] = low[u] = ++timer;

        for (int v : adj.get(u)) {
            if (v == p) continue;
            if (vis[v]) {
                low[u] = Math.min(low[u], tin[v]);
            } else {
                dfs(v, u, adj, tin, low, vis);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > tin[u]) {
                    bridges.add(List.of(u, v));
                }
            }
        }
    }

    public static void main(String[] args) {
        TarjanBridgeEngine engine = new TarjanBridgeEngine();
        List<List<Integer>> conns = List.of(
            List.of(0, 1), List.of(1, 2), List.of(2, 0), List.of(1, 3)
        );
        System.out.println("Single Points of Failure (Bridges): " + engine.criticalConnections(4, conns));
    }
}`,
      python: `from typing import List

def find_critical_network_bridges(n: int, connections: List[List[int]]) -> List[List[int]]:
    adj = [[] for _ in range(n)]
    for u, v in connections:
        adj[u].append(v)
        adj[v].append(u)

    tin = [-1] * n
    low = [-1] * n
    vis = [False] * n
    timer = 0
    bridges = []

    def dfs(u: int, p: int):
        nonlocal timer
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
                    bridges.append([u, v])

    for i in range(n):
        if not vis[i]:
            dfs(i, -1)
    return bridges

if __name__ == "__main__":
    links = [[0, 1], [1, 2], [2, 0], [1, 3]]
    print("Detected Network Bottlenecks:", find_critical_network_bridges(4, links))
`
    }
  },
  {
    id: 'd11-note-5',
    title: 'Bidirectional BFS: Ultra-Fast Search on Massive Social Graphs',
    conceptSummary:
      'In massive graph networks like Meta (3+ billion users) or LinkedIn, finding the shortest degrees of separation between two users using standard BFS with branching factor b and depth d explores O(b^d) nodes. When b=100 and d=6, b^d = 10^12 nodes (impossible in real time). Bidirectional BFS runs two simultaneous searches: one forward from the source and one backward from the target. When the two frontiers collide, the shortest path is found. This reduces the search space from O(b^d) to O(2 * b^(d/2)), converting 10^12 operations down to 2 * 10^6 operations (a 500,000x acceleration!).',
    timeSpaceNote: 'Time: O(b^(d/2)) | Space: O(b^(d/2)) for the forward and backward frontier sets.',
    kapilMentorTip:
      'Mentor Kapil Architecture Tip: In FAANG system interviews (e.g., "Design LinkedIn Degrees of Separation" or "Word Ladder"), always explain Bidirectional BFS. Expanding the smaller frontier at each step gives the optimal asymptotic bound.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>
#include <string.h>

#define MAX_NODES 100

int bidirectionalBFS(int adj[MAX_NODES][MAX_NODES], int n, int src, int target) {
    if (src == target) return 0;

    bool visSrc[MAX_NODES] = {false};
    bool visDst[MAX_NODES] = {false};

    int qSrc[MAX_NODES], fSrc = 0, rSrc = 0;
    int qDst[MAX_NODES], fDst = 0, rDst = 0;

    qSrc[rSrc++] = src; visSrc[src] = true;
    qDst[rDst++] = target; visDst[target] = true;

    int distance = 0;

    while (fSrc < rSrc && fDst < rDst) {
        distance++;
        // Expand smaller frontier (Src)
        int size = rSrc - fSrc;
        for (int i = 0; i < size; i++) {
            int u = qSrc[fSrc++];
            for (int v = 0; v < n; v++) {
                if (adj[u][v]) {
                    if (visDst[v]) return distance;
                    if (!visSrc[v]) {
                        visSrc[v] = true;
                        qSrc[rSrc++] = v;
                    }
                }
            }
        }
    }
    return -1;
}

int main() {
    int adj[MAX_NODES][MAX_NODES] = {0};
    adj[0][1] = adj[1][0] = 1;
    adj[1][2] = adj[2][1] = 1;
    adj[2][3] = adj[3][2] = 1;
    adj[3][4] = adj[4][3] = 1;

    int hops = bidirectionalBFS(adj, 5, 0, 4);
    printf("Shortest Social Hops (0 to 4): %d\\n", hops);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>

using namespace std;

int bidirectionalHops(int n, const vector<vector<int>>& adj, int src, int dst) {
    if (src == dst) return 0;

    unordered_set<int> forwardSet = {src};
    unordered_set<int> backwardSet = {dst};
    unordered_set<int> visitedForward = {src};
    unordered_set<int> visitedBackward = {dst};

    int hops = 0;

    while (!forwardSet.empty() && !backwardSet.empty()) {
        hops++;
        // Always expand the smaller frontier
        if (forwardSet.size() > backwardSet.size()) {
            swap(forwardSet, backwardSet);
            swap(visitedForward, visitedBackward);
        }

        unordered_set<int> nextFrontier;
        for (int u : forwardSet) {
            for (int v : adj[u]) {
                if (backwardSet.count(v)) return hops;
                if (!visitedForward.count(v)) {
                    visitedForward.insert(v);
                    nextFrontier.insert(v);
                }
            }
        }
        forwardSet = move(nextFrontier);
    }
    return -1;
}

int main() {
    int n = 5;
    vector<vector<int>> adj(n);
    auto addUndirected = [&](int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    };
    addUndirected(0, 1);
    addUndirected(1, 2);
    addUndirected(2, 3);
    addUndirected(3, 4);

    cout << "Meta Friend Distance: " << bidirectionalHops(n, adj, 0, 4) << " degrees\\n";
    return 0;
}`,
      java: `import java.util.*;

public class BidirectionalSocialGraph {
    public static int findDegreesOfSeparation(int n, List<List<Integer>> adj, int src, int target) {
        if (src == target) return 0;

        Set<Integer> forward = new HashSet<>();
        Set<Integer> backward = new HashSet<>();
        Set<Integer> visForward = new HashSet<>();
        Set<Integer> visBackward = new HashSet<>();

        forward.add(src);
        visForward.add(src);
        backward.add(target);
        visBackward.add(target);

        int level = 0;

        while (!forward.isEmpty() && !backward.isEmpty()) {
            level++;
            // Always expand smaller set
            if (forward.size() > backward.size()) {
                Set<Integer> temp = forward; forward = backward; backward = temp;
                Set<Integer> visTemp = visForward; visForward = visBackward; visBackward = visTemp;
            }

            Set<Integer> nextFrontier = new HashSet<>();
            for (int u : forward) {
                for (int v : adj.get(u)) {
                    if (backward.contains(v)) return level;
                    if (!visForward.contains(v)) {
                        visForward.add(v);
                        nextFrontier.add(v);
                    }
                }
            }
            forward = nextFrontier;
        }
        return -1;
    }

    public static void main(String[] args) {
        int n = 6;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        adj.get(0).add(1); adj.get(1).add(0);
        adj.get(1).add(2); adj.get(2).add(1);
        adj.get(2).add(3); adj.get(3).add(2);
        adj.get(3).add(4); adj.get(4).add(3);

        System.out.println("LinkedIn Connection Degree: " + findDegreesOfSeparation(n, adj, 0, 4));
    }
}`,
      python: `from typing import List, Set

def bidirectional_degrees_of_separation(n: int, adj: List[List[int]], src: int, dst: int) -> int:
    if src == dst:
        return 0

    forward: Set[int] = {src}
    backward: Set[int] = {dst}
    vis_forward: Set[int] = {src}
    vis_backward: Set[int] = {dst}

    hops = 0
    while forward and backward:
        hops += 1
        # Always expand the smaller frontier
        if len(forward) > len(backward):
            forward, backward = backward, forward
            vis_forward, vis_backward = vis_backward, vis_forward

        next_frontier: Set[int] = set()
        for u in forward:
            for v in adj[u]:
                if v in backward:
                    return hops
                if v not in vis_forward:
                    vis_forward.add(v)
                    next_frontier.add(v)
        forward = next_frontier

    return -1

if __name__ == "__main__":
    adj_list = [[1], [0, 2], [1, 3], [2, 4], [3]]
    print("Degrees of separation between 0 and 4:", bidirectional_degrees_of_separation(5, adj_list, 0, 4))
`
    }
  }
];
