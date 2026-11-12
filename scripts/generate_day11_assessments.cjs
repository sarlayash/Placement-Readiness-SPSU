const fs = require('fs');
const path = require('path');

const preAssessment = [
  // --- Theory (30%): Q1 to Q15 ---
  {
    id: 'd11-pre-1',
    question: 'Why does Dijkstra’s algorithm fail or produce incorrect shortest path distances on graphs containing negative edge weights?',
    options: [
      'Negative edges cause memory allocation errors in std::priority_queue',
      'The greedy choice property assumes that once a vertex is extracted from the priority queue, its recorded shortest distance is finalized and cannot be decreased by extending through subsequent edges',
      'Dijkstra’s algorithm converts directed graphs into undirected graphs',
      'It causes the time complexity to degrade from O((V+E)log V) to O(V!)'
    ],
    correctIndex: 1,
    explanation: 'Dijkstra relies on the invariant that edge weights are non-negative, meaning any path extending from a settled node cannot decrease in total weight. Negative edges violate this greedy monotonicity.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-2',
    question: 'In Kahn’s Algorithm for Topological Sort, how is a directed cycle detected in a graph with V vertices?',
    options: [
      'By checking if any vertex has an out-degree of 0 at the start',
      'By observing if the number of vertices dequeued and placed into the topological ordering is strictly less than V',
      'By finding if the sum of all in-degrees is odd',
      'By running a secondary binary search on the adjacency matrix'
    ],
    correctIndex: 1,
    explanation: 'Vertices in a cycle will never reach an in-degree of 0 because each node in the cycle is waiting on another node in the cycle. Thus, Kahn\'s queue empties before all V vertices are processed.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-3',
    question: 'What is the nearly constant amortized time complexity per operation for Disjoint Set Union (DSU) when both Path Compression and Union by Rank (or Size) are implemented?',
    options: [
      'O(log V)',
      'O(1)',
      'O(α(V)), where α is the extremely slow-growing Inverse Ackermann function (α(V) < 5 for all practical universe scales)',
      'O(sqrt(V))'
    ],
    correctIndex: 2,
    explanation: 'Combining path compression and union by rank yields an amortized time bound of O(α(N)) per find/union call, which never exceeds 4 or 5 for any realistic input size.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-4',
    question: 'In Tarjan’s bridge-finding algorithm, under what exact mathematical condition is an undirected edge (u, v) declared a critical bridge?',
    options: [
      'low[v] > tin[u] (the lowest discovery time reachable from subtree v is strictly greater than the discovery time of u)',
      'low[v] == low[u]',
      'tin[v] < tin[u]',
      'low[v] < tin[u]'
    ],
    correctIndex: 0,
    explanation: 'If low[v] > tin[u], there is no back-edge from subtree v to u or any ancestor of u. Removing edge (u, v) completely disconnects subtree v from the rest of the graph.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-5',
    question: 'When can 0-1 BFS (Breadth-First Search) replace Dijkstra’s algorithm to achieve optimal O(V + E) linear runtime?',
    options: [
      'When the graph is a Directed Acyclic Graph (DAG) with arbitrary floating point edge weights',
      'When all edge weights in the graph are restricted to binary values: either 0 or 1',
      'When the graph has no cycles and edge weights are negative',
      'When the graph is bipartite'
    ],
    correctIndex: 1,
    explanation: 'In a graph with edge weights in {0, 1}, maintaining a double-ended queue (std::deque) and pushing 0-weight edges to the front and 1-weight edges to the back ensures non-decreasing order without a min-heap, achieving O(V + E).',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-6',
    question: 'According to the Max-Flow Min-Cut Theorem in network flow theory:',
    options: [
      'The maximum flow from source S to sink T is strictly greater than any cut capacity',
      'The maximum flow value from source S to sink T is equal to the minimum net capacity of an S-T cut separating S from T',
      'Residual graphs cannot contain backward edges',
      'The flow through any edge must equal its full capacity'
    ],
    correctIndex: 1,
    explanation: 'The Max-Flow Min-Cut theorem states that in a flow network, the maximum amount of flow passing from source to sink is equal to the minimum total capacity of the edges in a cut that separates source from sink.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-7',
    question: 'Why does Bidirectional BFS achieve exponential search space reduction compared to standard unidirectional BFS in unweighted graphs?',
    options: [
      'It skips half of the vertices using random sampling',
      'Unidirectional BFS expands O(b^d) nodes (where b is branching factor, d is distance), whereas Bidirectional BFS searches from both ends and meets in the middle at depth d/2, expanding roughly 2 * O(b^(d/2)) nodes',
      'It uses multithreading on modern x86 CPU cores',
      'It eliminates the need for a visited set'
    ],
    correctIndex: 1,
    explanation: 'If branching factor b=10 and distance d=8, unidirectional BFS visits ~10^8 nodes. Bidirectional BFS visits 2 * 10^4 = 20,000 nodes, reducing search space by orders of magnitude.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-8',
    question: 'In Tarjan’s Strongly Connected Components (SCC) algorithm for directed graphs, why is a stack used during the DFS traversal?',
    options: [
      'To prevent operating system stack overflow on recursive calls',
      'To keep track of vertices in the current DFS path or candidate SCC; when low[u] == tin[u], vertices popped until u form a maximal SCC',
      'To reverse the topological ordering of edges',
      'To sort the adjacency list in alphabetical order'
    ],
    correctIndex: 1,
    explanation: 'The stack tracks all active nodes in the current DFS exploration. When a root of an SCC is identified (low[u] == tin[u]), all nodes stacked above u belong to u\'s component and are popped together.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-9',
    question: 'In an undirected graph, what is the fundamental difference between a Bridge and an Articulation Point (Cut Vertex)?',
    options: [
      'A Bridge is an edge whose removal increases the number of connected components, while an Articulation Point is a vertex whose removal increases the number of connected components',
      'A Bridge only exists in directed graphs, while an Articulation Point only exists in undirected trees',
      'Bridges require negative edge weights, while Articulation Points require positive edge weights',
      'They are identical mathematical concepts with different names'
    ],
    correctIndex: 0,
    explanation: 'A bridge is an edge whose deletion disconnects the graph; an articulation point is a vertex whose removal (along with its incident edges) disconnects the graph.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-10',
    question: 'For an A* search heuristic h(n) to guarantee finding the optimal shortest path on a graph, what mathematical property must h(n) satisfy?',
    options: [
      'h(n) must be strictly greater than the actual remaining distance to the goal',
      'h(n) must be admissible (never overestimate the true cost from node n to the goal: h(n) <= h*(n)) and consistent (triangle inequality: h(u) <= c(u, v) + h(v))',
      'h(n) must equal 0 for every intermediate node',
      'h(n) must be monotonically decreasing to negative infinity'
    ],
    correctIndex: 1,
    explanation: 'Admissibility guarantees that A* never prunes an optimal path prematurely. Consistency ensures that when a node is expanded, its shortest path has already been found.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-11',
    question: 'What is the worst-case time complexity of the Edmonds-Karp implementation of the Ford-Fulkerson maximum flow algorithm?',
    options: [
      'O(V + E)',
      'O(V * E^2)',
      'O(V^3 * E)',
      'O(E * log V)'
    ],
    correctIndex: 1,
    explanation: 'Edmonds-Karp uses BFS to find the shortest augmenting path in the residual graph. Each augmenting path takes O(E), and an edge becomes critical at most V/2 times, leading to O(V * E^2).',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-12',
    question: 'In Kruskal’s Minimum Spanning Tree (MST) algorithm, why is sorting edges followed by DSU union operations optimal?',
    options: [
      'It creates directed cycles to minimize path length',
      'By the Cut Property of MSTs, the lightest edge crossing any partition of vertices is guaranteed to belong to some MST; DSU prevents cycle creation in O(α(V)) time',
      'Sorting edges changes the tree into a binary search tree',
      'It avoids checking graph connectivity'
    ],
    correctIndex: 1,
    explanation: 'Greedily inspecting edges from smallest to largest and adding an edge if its endpoints are in distinct connected components ensures the Cut Property is satisfied without creating cycles.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-13',
    question: 'In a directed graph, which edge classification in a DFS tree signals the presence of a directed cycle?',
    options: [
      'Tree Edge',
      'Forward Edge',
      'Cross Edge',
      'Back Edge (an edge pointing to an ancestor currently in the active DFS recursion stack)'
    ],
    correctIndex: 3,
    explanation: 'A back edge connects a vertex to one of its ancestors in the DFS tree that is currently on the recursion stack (marked as Gray in 3-color DFS), which proves a cycle exists.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-14',
    question: 'What is the primary difference between Kosaraju’s algorithm and Tarjan’s algorithm for finding Strongly Connected Components?',
    options: [
      'Kosaraju’s runs in O(V!) time while Tarjan’s runs in O(V)',
      'Kosaraju’s algorithm requires two DFS passes (one on the original graph to get finishing times, one on the transpose/reversed graph), whereas Tarjan’s algorithm requires only a single DFS pass using discovery times and low-link values',
      'Kosaraju only works on DAGs',
      'Tarjan requires all edge weights to be prime numbers'
    ],
    correctIndex: 1,
    explanation: 'Kosaraju uses two complete DFS traversals and graph reversal. Tarjan computes SCCs in a single DFS pass by tracking tin and low arrays on an active stack.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-pre-15',
    question: 'Why does Dijkstra’s algorithm using a Fibonacci Heap have theoretical time complexity O(E + V log V), but in real-world FAANG competitive programming std::priority_queue (Binary Heap) is almost universally preferred?',
    options: [
      'Fibonacci heap is not supported in C++',
      'Fibonacci heap has large hidden constant factors and complex pointer-heavy node manipulations that perform poorly with modern CPU L1/L2 cache lines compared to array-backed binary heaps',
      'Binary heaps use O(V^2) memory',
      'Fibonacci heaps only support integers up to 1000'
    ],
    correctIndex: 1,
    explanation: 'The amortized O(1) decrease-key in Fibonacci heaps comes with heavy constant overhead and pointer chasing, which thrashes CPU caches. Array-backed binary heaps are much faster in practice.',
    category: 'Theory (30%)'
  },

  // --- Practical Execution & Trace (70%): Q16 to Q50 ---
  {
    id: 'd11-pre-16',
    question: 'Consider a directed graph with edges: 1->2, 2->3, 3->1, 3->4. What is the in-degree array [deg(1), deg(2), deg(3), deg(4)] and does Kahn’s algorithm produce a complete topological sort?',
    options: [
      '[1, 1, 1, 1]; Yes, topological order is [1, 2, 3, 4]',
      '[1, 1, 1, 1]; No, the queue is initially empty because no vertex has in-degree 0, so 0 vertices are processed',
      '[0, 1, 1, 1]; Yes, starts with 1',
      '[2, 1, 1, 0]; No, only 4 is processed'
    ],
    correctIndex: 1,
    explanation: 'Edge 3->1 gives 1 an in-degree of 1; 1->2 gives 2 an in-degree of 1; 2->3 gives 3 an in-degree of 1; 3->4 gives 4 an in-degree of 1. All in-degrees are 1. Kahn\'s queue begins with zero elements, detecting the 1-2-3 cycle immediately.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-17',
    question: 'Trace Dijkstra’s algorithm on a graph with vertices {A, B, C} and directed edges: A->B (weight 4), A->C (weight 2), C->B (weight 1). What is the minimum distance array dist[B] starting from A?',
    options: [
      'dist[B] = 4 (via direct edge A->B)',
      'dist[B] = 3 (relaxed via path A -> C -> B: 2 + 1 = 3)',
      'dist[B] = 2',
      'dist[B] = 5'
    ],
    correctIndex: 1,
    explanation: 'Initial dist: dist[A]=0, dist[B]=4, dist[C]=2. Node C is extracted with dist 2. Neighbor B is relaxed: dist[B] = min(4, dist[C] + 1) = min(4, 3) = 3.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-18',
    question: 'Given an Alien Dictionary problem with ordered dictionary words: ["wrt", "wrf", "er", "ett", "rftt"]. What directed edge is deduced from comparing the adjacent words "wrt" and "wrf"?',
    options: [
      'w -> e',
      'r -> t',
      't -> f (the first differing character between "wrt" and "wrf")',
      'f -> t'
    ],
    correctIndex: 2,
    explanation: 'Comparing adjacent words "wrt" and "wrf": the first index where characters differ is index 2 (\'t\' vs \'f\'). Since "wrt" appears before "wrf", \'t\' precedes \'f\', creating the directed edge t -> f.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-19',
    question: 'In DSU with 5 elements {0, 1, 2, 3, 4}, we execute: union(0, 1), union(2, 3), union(1, 3). Which of the following statements about connected components is correct?',
    options: [
      'There are 3 connected components: {0, 1, 2, 3}, {4}, and an empty set',
      'There are 2 connected components: {0, 1, 2, 3} and {4}',
      'All 5 elements are now in the same component',
      '{0, 1} and {2, 3} remain disconnected'
    ],
    correctIndex: 1,
    explanation: 'union(0,1) merges {0,1}. union(2,3) merges {2,3}. union(1,3) finds root of 1 (0 or 1) and root of 3 (2 or 3) and joins them into {0,1,2,3}. 4 is untouched, leaving 2 components.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-20',
    question: 'What is the output of Tarjan’s bridge detection algorithm on a simple triangle graph with vertices {0, 1, 2} and edges {(0,1), (1,2), (2,0)}?',
    options: [
      '[(0, 1), (1, 2), (2, 0)] (all edges are bridges)',
      '[(0, 1)]',
      '[] (empty list, no bridges exist because every edge is part of a cycle)',
      '[(2, 0)]'
    ],
    correctIndex: 2,
    explanation: 'In a simple cycle, removing any single edge leaves the remaining vertices connected by the alternative path. For all nodes, low[v] <= tin[u], so no bridges exist.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-21',
    question: 'In 0-1 BFS on a 2D grid, an edge moving straight has cost 0, while turning 90 degrees has cost 1. How must neighbor states be added to the std::deque?',
    options: [
      'Straight moves (cost 0) are pushed to the back; turn moves (cost 1) are pushed to the front',
      'Straight moves (cost 0) are pushed to the front (push_front); turn moves (cost 1) are pushed to the back (push_back)',
      'Both moves are pushed to the front',
      'Both moves are sorted using qsort()'
    ],
    correctIndex: 1,
    explanation: '0-1 BFS maintains the invariant that the deque contains elements at distances d and d+1. 0-weight transitions remain at distance d and must be explored immediately (push_front). 1-weight transitions reach d+1 and go to the back (push_back).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-22',
    question: 'A network graph has 4 routers {0, 1, 2, 3} with edge latency: 0->1 (10ms), 0->2 (3ms), 2->1 (2ms), 1->3 (1ms), 2->3 (8ms). Starting from router 0, what is the minimum latency to reach router 3?',
    options: [
      '11ms (via 0->2->3)',
      '6ms (via 0->2->1->3: 3 + 2 + 1 = 6ms)',
      '10ms',
      '5ms'
    ],
    correctIndex: 1,
    explanation: 'Path 0->2 has cost 3. From 2, moving to 1 costs 2 (total 5). From 1, moving to 3 costs 1 (total 5 + 1 = 6). Direct 0->1->3 is 11ms, and 0->2->3 is 11ms. 6ms is optimal.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-23',
    question: 'In Hierholzer’s algorithm for finding an Eulerian Path in a directed graph, what data structure behavior reconstructs the path in the correct forward order?',
    options: [
      'Edges are appended to a queue during DFS traversal',
      'Nodes are pushed to a stack as the DFS backtracks (post-order traversal), and reversing the resulting list yields the Eulerian path',
      'Dijkstra’s priority queue is executed on the reverse graph',
      'Kruskal’s algorithm selects edges with odd degrees'
    ],
    correctIndex: 1,
    explanation: 'Hierholzer\'s algorithm follows edges until stuck, then adds the node to the itinerary as it backtracks. The final Eulerian path is the reverse of this post-order sequence.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-24',
    question: 'Suppose DSU find() with path compression is invoked on node 4 in a chain: 4 -> 3 -> 2 -> 1 -> 0 (where 0 is the root). What is parent[4], parent[3], parent[2] after the call returns?',
    options: [
      'parent[4]=3, parent[3]=2, parent[2]=1',
      'parent[4]=0, parent[3]=0, parent[2]=0 (all flattened directly to the root 0)',
      'parent[4]=1, parent[3]=1, parent[2]=1',
      'parent[4]=4, parent[3]=3, parent[2]=2'
    ],
    correctIndex: 1,
    explanation: 'Path compression recursively sets parent[i] = find(parent[i]), rewiring every visited ancestor directly to the root 0, flattening the tree to depth 1.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-25',
    question: 'In the LeetCode "Critical Connections in a Network" problem, why do we pass `parent` into the DFS function `dfs(node, parent)` in Tarjan’s algorithm?',
    options: [
      'To keep track of the total number of connected components',
      'To prevent the algorithm from falsely identifying the trivial bidirectional edge back to the immediate parent as a cycle back-edge',
      'To calculate the diameter of the tree',
      'To sort the adjacency list in ascending order'
    ],
    correctIndex: 1,
    explanation: 'Since the graph is undirected, an edge (u, v) exists in both directions. Without skipping the immediate caller parent, every tree edge would be treated as a cycle of length 2.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-26',
    question: 'What is the maximum flow from S to T in a network where S connects to A (cap 10) and B (cap 5), A connects to T (cap 8) and B (cap 3), and B connects to T (cap 7)?',
    options: [
      '12',
      '15',
      '18',
      '10'
    ],
    correctIndex: 1,
    explanation: 'Path 1: S->A->T can take min(10, 8) = 8 units. Residual cap of S->A is 2. Path 2: S->A->B->T can take min(2, 3, 7) = 2 units. Path 3: S->B->T can take min(5, 7 - 2 = 5) = 5 units. Total flow = 8 + 2 + 5 = 15. The min-cut {S, A, B} vs {T} has capacity 8 + 7 = 15.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-27',
    question: 'You are implementing Kahn’s algorithm on Course Schedule II with numCourses = 2, prerequisites = [[1,0]]. What is the valid topological sequence?',
    options: [
      '[1, 0]',
      '[0, 1] (course 0 must be taken before course 1)',
      '[] (cycle detected)',
      '[0]'
    ],
    correctIndex: 1,
    explanation: 'Prerequisite [1, 0] means to take course 1, you must first finish course 0 (directed edge 0 -> 1). In-degree of 0 is 0; in-degree of 1 is 1. Course 0 is dequeued first, unlocking course 1. Result: [0, 1].',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-28',
    question: 'In a graph with V = 10,000 vertices and E = 20,000 edges, which representation provides the most cache-friendly and memory-efficient Dijkstra performance?',
    options: [
      'Adjacency Matrix of size 10000 x 10000',
      'Adjacency List using std::vector<std::vector<pair<int, int>>> or CSR (Compressed Sparse Row)',
      'Linked list of edge objects with dynamic new allocations',
      'HashMap<Integer, HashMap<Integer, Integer>>'
    ],
    correctIndex: 1,
    explanation: 'An adjacency matrix would consume 10000 * 10000 * 4 bytes = 400 MB and take O(V^2) scan time. Contiguous vectors in an adjacency list consume only ~500 KB and traverse active neighbors in O(E).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-29',
    question: 'When solving "Cheapest Flights Within K Stops", why standard Dijkstra can fail if visited states are pruned solely on `node` rather than `(node, stops)`?',
    options: [
      'Dijkstra can only run on trees',
      'A path reaching node `v` with a slightly higher cost might have used significantly fewer stops, allowing it to reach the final destination within K stops where the cheapest path exceeded K stops',
      'Flights can have negative ticket prices',
      'K stops requires Bellman-Ford or BFS with state (node, stops)'
    ],
    correctIndex: 1,
    explanation: 'The problem has two dimensions: cost and stops. Standard Dijkstra prunes higher costs, but a higher-cost arrival at node v with fewer remaining stops may be the only valid path to the destination under the K-stop limit.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-30',
    question: 'In Kosaraju’s algorithm, step 1 fills a stack by order of DFS completion time. Why do we pop from this stack to start DFS traversals on the reversed graph?',
    options: [
      'To reverse the order of node IDs',
      'Vertices that finished last in the forward DFS must belong to a "source" SCC in the component DAG. Reversing edges turns source SCCs into "sink" SCCs, preventing DFS from leaking into other SCCs',
      'To minimize the number of recursive function calls',
      'To balance the search tree'
    ],
    correctIndex: 1,
    explanation: 'By processing nodes in decreasing order of finishing times on the transposed graph, DFS starting at the top of the stack will explore exactly its own SCC without traversing into downstream components.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-31',
    question: 'What is the time complexity of building a Minimum Spanning Tree using Prim’s Algorithm with a binary heap on a graph with V vertices and E edges?',
    options: [
      'O(V^3)',
      'O(E log V)',
      'O(V + E)',
      'O(V * E)'
    ],
    correctIndex: 1,
    explanation: 'Prim’s with a binary heap extracts the minimum weight edge O(V) times (each taking O(log V)) and relaxes adjacent edges O(E) times (each taking O(log V)), giving O((V + E) log V) = O(E log V).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-32',
    question: 'In "Word Ladder", we find the shortest transformation sequence from beginWord to endWord where each step alters 1 character. Why is Bidirectional BFS strictly preferred over standard BFS?',
    options: [
      'Standard BFS cannot handle 4-letter words',
      'If each word has ~20 valid one-letter mutations and distance is 6, standard BFS visits 20^6 ≈ 64,000,000 states, whereas Bidirectional BFS visits 2 * 20^3 ≈ 16,000 states, avoiding Time Limit Exceeded (TLE)',
      'Bidirectional BFS does not require a dictionary hash set',
      'Bidirectional BFS converts string mutations into integer hashes'
    ],
    correctIndex: 1,
    explanation: 'The exponential branching factor (20^d) explodes in unidirectional search. Meeting in the middle halves the search depth d/2, reducing the state space from 64 million to 16 thousand.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-33',
    question: 'Given an undirected graph with edges: [(0,1), (1,2), (2,3), (3,0), (2,4), (4,5)]. Which edge is a bridge?',
    options: [
      '(0, 1)',
      '(1, 2)',
      '(2, 4) and (4, 5)',
      '(2, 3)'
    ],
    correctIndex: 2,
    explanation: 'Cycle {0, 1, 2, 3} has no bridges. However, removing edge (2, 4) disconnects {4, 5} from the cycle. Removing edge (4, 5) disconnects node 5. Both (2, 4) and (4, 5) are critical bridges.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-34',
    question: 'What is the space complexity of Kahn’s Algorithm for Topological Sort on a graph with V vertices and E edges?',
    options: [
      'O(1)',
      'O(V + E) to store the adjacency list, in-degree array of size V, and the queue of size V',
      'O(V^2)',
      'O(E * log V)'
    ],
    correctIndex: 1,
    explanation: 'Kahn\'s algorithm maintains an in-degree array of size V, an adjacency list storing E edges, and a queue holding at most V nodes simultaneously, requiring O(V + E) space.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-35',
    question: 'In DSU, if rank[rootA] == rank[rootB] during union(A, B), how does the rank array change when rootA becomes the parent of rootB?',
    options: [
      'rank[rootA] stays unchanged',
      'rank[rootA] increases by 1, because attaching an identical-depth tree increases the height of the combined tree by 1',
      'rank[rootA] doubles',
      'rank[rootB] becomes -1'
    ],
    correctIndex: 1,
    explanation: 'When two trees of identical rank (upper bound on height) are merged, the new root\'s height increases by exactly 1. When ranks differ, attaching the shorter tree under the taller does not increase rank.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-36',
    question: 'How do you detect if an undirected graph is Bipartite (2-colorable) using BFS or DFS?',
    options: [
      'By checking if the graph contains any odd-length cycle (if an adjacent neighbor already has the same color as the current node, the graph is NOT bipartite)',
      'By checking if the number of edges is even',
      'By counting the number of connected components',
      'By verifying if every vertex has degree 2'
    ],
    correctIndex: 0,
    explanation: 'A graph is bipartite if and only if it contains no odd-length cycles. If during traversal a neighbor is already colored with the same color as the current vertex, an odd cycle is detected.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-37',
    question: 'In the Dinic maximum flow algorithm, what is the role of the "Level Graph" constructed via BFS in each phase?',
    options: [
      'It sorts vertices by their outgoing capacities',
      'It assigns each vertex a level level[v] representing its distance from source S in the residual graph, ensuring DFS only pushes flow along forward edges (level[to] == level[from] + 1)',
      'It eliminates backward edges in the residual network',
      'It stores the precomputed maximum flow value'
    ],
    correctIndex: 1,
    explanation: 'The level graph ensures that augmenting paths found by DFS are shortest paths in terms of edge count and move strictly forward, guaranteeing termination in at most V phases.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-38',
    question: 'Consider a directed graph with edges: A->B, B->C, C->D, D->B. What are the Strongly Connected Components (SCCs)?',
    options: [
      '{A, B, C, D} as a single SCC',
      '{A} and {B, C, D}',
      '{A, B} and {C, D}',
      '{A}, {B}, {C}, {D} each separately'
    ],
    correctIndex: 1,
    explanation: 'Node A can reach {B, C, D}, but no node in {B, C, D} can reach back to A. Nodes {B, C, D} form a directed cycle where every node can reach every other node. Thus, the SCCs are {A} and {B, C, D}.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-39',
    question: 'In Bellman-Ford algorithm, how many relaxation rounds across all E edges are performed to guarantee shortest paths in a graph with V vertices without negative cycles?',
    options: [
      'V rounds',
      'V - 1 rounds',
      'E rounds',
      'log V rounds'
    ],
    correctIndex: 1,
    explanation: 'A simple shortest path in a graph with V vertices can have at most V - 1 edges. Each round of Bellman-Ford extends the shortest path by at least one edge, so V - 1 rounds suffice.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-40',
    question: 'How does Bellman-Ford detect the presence of a negative weight cycle reachable from the source vertex?',
    options: [
      'If any edge relaxation succeeds in the V-th round (i.e. dist[v] > dist[u] + weight), a negative cycle exists',
      'If all distances become zero',
      'If the queue overflows',
      'If dist[target] remains infinity'
    ],
    correctIndex: 0,
    explanation: 'After V - 1 iterations, all shortest paths in a cycle-free graph are optimal. If an edge can still be relaxed on iteration V, distances can decrease infinitely, indicating a negative cycle.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-41',
    question: 'In LeetCode 1584 "Min Cost to Connect All Points" with N points in 2D space, why is Prim’s algorithm with an array-based O(N^2) scan preferred over Kruskal’s O(E log E) algorithm?',
    options: [
      'Kruskal’s algorithm does not work on coordinate points',
      'The graph is dense with E = N * (N - 1) / 2 edges. Kruskal requires sorting O(N^2) edges (O(N^2 log N)), while array-based Prim runs in O(N^2) without sorting edges, saving massive CPU time and memory',
      'Array-based Prim requires no memory allocations',
      'Points must be connected in clockwise order'
    ],
    correctIndex: 1,
    explanation: 'For a complete dense graph with E = O(V^2), Kruskal\'s edge sorting incurs O(V^2 log V) time and O(V^2) memory. Dense Prim\'s without a heap runs in O(V^2) time and O(V) space.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-42',
    question: 'In Tarjan’s SCC algorithm, what condition initiates the popping of vertices from the stack to form an SCC?',
    options: [
      'low[u] == tin[u] (the node cannot reach any ancestor higher up in the DFS tree)',
      'low[u] < tin[u]',
      'tin[u] == 0',
      'stack.size() == V'
    ],
    correctIndex: 0,
    explanation: 'When low[u] == tin[u], vertex u is the "root" of its Strongly Connected Component. All vertices currently on top of u in the stack belong to this component and are popped together.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-43',
    question: 'In a ride-dispatch graph, drivers and passenger requests must be matched 1-to-1 such that total pickup time is minimized. What graph algorithm formulation solves this optimally?',
    options: [
      'Eulerian Path',
      'Minimum Weight Maximum Bipartite Matching (Hungarian Algorithm or Min-Cost Max-Flow)',
      'Topological Sort',
      '0-1 BFS'
    ],
    correctIndex: 1,
    explanation: 'Matching riders to drivers with individual pairing costs is the classic Minimum Weight Bipartite Matching problem, solved via the Hungarian Algorithm in O(V^3) or Min-Cost Max-Flow.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-44',
    question: 'When implementing Dijkstra’s algorithm in Java with `PriorityQueue<int[]>`, why must we check `if (currDist > dist[u]) continue;` immediately after polling?',
    options: [
      'Java PriorityQueue does not support decrease-key; duplicate entries with stale, larger distances remain in the queue and must be skipped to preserve O((V+E)log V) runtime',
      'To prevent NullPointerException in Java runtime',
      'To verify if the graph is bipartite',
      'To ensure nodes are visited in reverse order'
    ],
    correctIndex: 0,
    explanation: 'Standard heaps allow stale distance records to accumulate when a node is relaxed multiple times. Skipping elements where currDist > dist[u] prevents redundant edge scans.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-45',
    question: 'Given a directed graph with adjacency list: 0: [1, 2], 1: [2], 2: [3], 3: []. What is the reverse (transpose) graph adjacency list?',
    options: [
      '0: [], 1: [0], 2: [0, 1], 3: [2]',
      '0: [3], 1: [2], 2: [1], 3: [0]',
      '0: [1, 2], 1: [2], 2: [3], 3: []',
      '0: [], 1: [], 2: [], 3: []'
    ],
    correctIndex: 0,
    explanation: 'Reversing every directed edge: 0->1 becomes 1->0; 0->2 becomes 2->0; 1->2 becomes 2->1; 2->3 becomes 3->2. The transpose is 0:[], 1:[0], 2:[0,1], 3:[2].',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-46',
    question: 'In the Floyd-Warshall all-pairs shortest path algorithm, why must the outer loop iterate over the intermediate vertex `k` rather than `i` or `j`?',
    options: [
      'To prevent compiler optimization errors',
      'Dynamic programming definition: dist[i][j] in stage k represents the shortest path using only intermediate vertices from {0, ..., k}. The subproblem dependency requires k to progress outward',
      'Because matrix multiplication requires row-first access',
      'It does not matter; any order produces the same result'
    ],
    correctIndex: 1,
    explanation: 'Floyd-Warshall defines subproblems by the set of allowed intermediate nodes {1..k}. For the DP relation dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) to hold, k must be the outer loop.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-47',
    question: 'What is the maximum number of edges in a simple undirected graph with V vertices that contains NO cycles (i.e. a forest)?',
    options: [
      'V',
      'V - 1',
      'V * (V - 1) / 2',
      '2 * V'
    ],
    correctIndex: 1,
    explanation: 'A connected acyclic graph is a tree with exactly V - 1 edges. If the graph has multiple disconnected components (a forest with c components), it has V - c edges, which is at most V - 1.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-48',
    question: 'You are given a directed graph representing package dependencies: npm packages A, B, C, D. If A depends on B, B depends on C, and C depends on A, what will Topological Sort return?',
    options: [
      '[A, B, C, D]',
      'Cycle detected; no valid topological ordering exists',
      '[D, C, B, A]',
      '[A, C, B, D]'
    ],
    correctIndex: 1,
    explanation: 'A->B->C->A is a circular dependency (directed cycle). A topological sort only exists for Directed Acyclic Graphs (DAGs). The cycle makes valid resolution impossible.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-49',
    question: 'In Tarjan’s bridge detection algorithm, why do we update `low[u] = min(low[u], tin[to]);` for back-edges instead of `low[u] = min(low[u], low[to]);`?',
    options: [
      'Using low[to] would incorrectly allow the search to jump across multiple back-edges that are not directly reachable from u, producing false bridge negatives',
      'tin[to] uses less memory than low[to]',
      'low[to] is always equal to 0',
      'It is a legacy bug in Tarjan’s original paper that has no practical effect'
    ],
    correctIndex: 0,
    explanation: 'For an unvisited tree-edge, subtree \'to\' can reach up to low[to]. But for a back-edge (u, to), node \'to\' is an ancestor directly connected to u, so low[u] can only take tin[to].',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-pre-50',
    question: 'In an Uber-style ride dispatch system with 50,000 intersections, why is Contraction Hierarchies or Bidirectional Dijkstra preferred over basic Dijkstra for calculating ETAs?',
    options: [
      'Standard Dijkstra cannot run on road networks',
      'Bidirectional Dijkstra prunes search radius to half the Euclidean distance, and Contraction Hierarchies precomputes shortcut edges, answering query latencies in microseconds (< 1ms) rather than hundreds of milliseconds',
      'Basic Dijkstra requires GPS satellite connection',
      'Contraction Hierarchies removes all traffic lights'
    ],
    correctIndex: 1,
    explanation: 'On large road networks, standard Dijkstra searches millions of radial edges across the whole city. Bidirectional search with shortcut hierarchies queries in microseconds, vital for real-time dispatch.',
    category: 'Practical Execution & Trace (70%)'
  }
];

const postAssessment = [
  // --- Theory (30%): Q1 to Q15 ---
  {
    id: 'd11-post-1',
    question: 'What is the primary computational bottleneck in Dinic’s algorithm for Maximum Flow, and what is its worst-case time complexity on general networks?',
    options: [
      'O(V * E) due to adjacency matrix multiplication',
      'O(V^2 * E) on general networks; BFS builds level graphs in at most V phases, and DFS pushes blocking flows in O(V * E) per phase',
      'O(2^V) due to recursive backtracking',
      'O(E log V) using Fibonacci heaps'
    ],
    correctIndex: 1,
    explanation: 'Dinic\'s algorithm runs in at most V phases. In each phase, finding blocking flows with DFS and edge-pointer optimization takes O(V * E), yielding O(V^2 * E) on general networks (and O(E * sqrt(V)) on unit networks).',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-2',
    question: 'In Kahn’s algorithm for Topological Sort, what condition guarantees that a UNIQUE topological ordering exists for a given DAG?',
    options: [
      'The graph has an even number of vertices',
      'At every single iteration of the while-loop, the queue contains EXACTLY one vertex with in-degree 0 (forming a Hamiltonian path)',
      'The sum of all edge weights is zero',
      'All nodes have out-degree equal to 1'
    ],
    correctIndex: 1,
    explanation: 'If at any point more than one vertex has in-degree 0, any of them could be picked next, resulting in multiple valid topological orders. A unique order requires exactly one choice at each step.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-3',
    question: 'Why does Tarjan’s algorithm for finding Strongly Connected Components visit every vertex and edge exactly once, achieving optimal O(V + E) time?',
    options: [
      'It sorts all vertices by degree prior to DFS',
      'It performs a single Depth-First Search traversal, updating discovery and low-link values in-place and popping SCC components off a stack when low[u] == tin[u]',
      'It runs Dijkstra\'s algorithm on the dual planar graph',
      'It eliminates all back-edges'
    ],
    correctIndex: 1,
    explanation: 'Each vertex is pushed onto and popped from the stack at most once, and each edge is examined once during the DFS traversal, yielding strictly linear O(V + E) time.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-4',
    question: 'In the Disjoint Set Union (DSU) data structure, why is Path Compression alone without Union by Rank insufficient to guarantee O(α(N)) amortized time?',
    options: [
      'Without rank balancing, a malicious sequence of union operations can construct a degenerate tree of depth O(N), leading to worst-case O(N log N) or O(N^2) before path compression takes effect',
      'Path compression causes stack overflow',
      'Union by rank is required to prevent negative node IDs',
      'Path compression only works on trees with height <= 2'
    ],
    correctIndex: 0,
    explanation: 'Without union by rank/size, tree depth can degrade to O(N) during unions. Combining path compression with union by rank ensures the tree height remains logarithmic and amortized cost drops to O(α(N)).',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-5',
    question: 'Under what conditions does Dijkstra’s algorithm running on a Directed Acyclic Graph (DAG) waste time compared to DAG Shortest Path?',
    options: [
      'Dijkstra requires O((V + E) log V) due to priority queue management, whereas DAG Shortest Path finds shortest paths in strictly linear O(V + E) by relaxing edges in Topological Order without any heap',
      'Dijkstra does not work on DAGs',
      'DAG Shortest Path requires negative cycle detection',
      'Dijkstra cannot handle floating point numbers'
    ],
    correctIndex: 0,
    explanation: 'Processing vertices in topological order relaxes edges in a single pass without a priority queue, achieving O(V + E) time, even handling negative edge weights as long as the graph is a DAG.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-6',
    question: 'In Network Flow, what is the significance of the "Residual Graph"?',
    options: [
      'It stores disconnected vertices after max flow finishes',
      'It maintains forward edges with residual capacity (capacity - flow) and backward edges with capacity equal to the current flow, allowing the algorithm to "undo" suboptimal flow assignments',
      'It represents the MST of the network',
      'It records execution logs for debugging'
    ],
    correctIndex: 1,
    explanation: 'Backward edges in the residual graph permit pushing flow in the reverse direction, which mathematically cancels previously assigned flow and allows finding the global maximum flow.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-7',
    question: 'What is an Articulation Point in a biconnected components analysis of critical infrastructure (e.g., AWS availability zones)?',
    options: [
      'A router with maximum bandwidth',
      'A single point of failure (vertex) whose failure increases the number of connected components, severing communication between remaining sub-networks',
      'A vertex with in-degree equal to out-degree',
      'A node that only connects to external clients'
    ],
    correctIndex: 1,
    explanation: 'An articulation point (cut vertex) is a single node whose removal disconnects the graph. In distributed systems, these represent critical single points of failure.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-8',
    question: 'In Kruskal’s vs Prim’s algorithm for Minimum Spanning Tree, which algorithm is asymptotically faster on extremely sparse graphs where E ≈ V?',
    options: [
      'Prim’s with adjacency matrix (O(V^2))',
      'Kruskal’s algorithm: sorting E edges takes O(E log E) ≈ O(V log V), and DSU operations take O(V α(V)), making it exceptionally fast and simple to implement',
      'Floyd-Warshall algorithm',
      'Both run in O(V!) time'
    ],
    correctIndex: 1,
    explanation: 'When E ≈ V, Kruskal\'s O(E log E) is O(V log V), which is lightweight and fast. On dense graphs (E ≈ V^2), Prim\'s without a heap running in O(V^2) avoids sorting O(V^2) edges.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-9',
    question: 'Why is Bidirectional BFS termination condition subtle: why can’t we terminate the instant the two frontiers touch at any node without checking path lengths?',
    options: [
      'In weighted graphs or irregular frontier expansion, the first intersection point found might not lie on the shortest overall path; we must finish expanding the current level to ensure optimality',
      'Bidirectional BFS never terminates',
      'The queue must be completely empty before returning',
      'Both search trees must have identical depth'
    ],
    correctIndex: 0,
    explanation: 'The first intersection of two BFS search horizons guarantees the shortest path only in unweighted graphs when expanding level-by-level; in edge-weighted graphs, the true shortest path might intersect at another node in the frontier.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-10',
    question: 'What is the condition for a directed graph to have an Eulerian Circuit (a closed walk traversing every edge exactly once)?',
    options: [
      'All vertices must have even in-degrees',
      'Every vertex must have in_degree(v) == out_degree(v), and all vertices with non-zero degree must belong to a single strongly connected component',
      'The graph must be a DAG',
      'The graph must be bipartite'
    ],
    correctIndex: 1,
    explanation: 'For a directed Eulerian circuit, every time a walk enters a vertex it must exit it, requiring in-degree == out-degree for all nodes, along with connected non-zero degree vertices.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-11',
    question: 'In A* search, what happens if the heuristic function h(n) is set to 0 for all nodes?',
    options: [
      'A* search degenerates exactly into Dijkstra’s algorithm (Uniform Cost Search)',
      'A* search runs in O(1) time',
      'A* search fails with a divide-by-zero exception',
      'A* search degenerates into Depth-First Search'
    ],
    correctIndex: 0,
    explanation: 'A* evaluates f(n) = g(n) + h(n). When h(n) = 0, f(n) = g(n) (the exact cost from the start), which is precisely Dijkstra\'s algorithm.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-12',
    question: 'What is the Maximum Bipartite Matching problem equivalent to in network flow terms?',
    options: [
      'A shortest path on a tree',
      'A Max-Flow problem with a source S connected to all left partition nodes (capacity 1), left nodes connected to right nodes (capacity 1), and right nodes connected to sink T (capacity 1)',
      'Minimum Spanning Tree with negative edges',
      'Eulerian Circuit on an undirected graph'
    ],
    correctIndex: 1,
    explanation: 'By adding source S and sink T with unit capacities, any valid integer unit flow corresponds directly to a valid 1-to-1 matching without overlapping endpoints.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-13',
    question: 'In Tarjan’s SCC algorithm, what is the definition of low[u]?',
    options: [
      'The minimum node ID in the graph',
      'The smallest discovery time (tin) reachable from u through its DFS subtree, including at most one back-edge to an active stack ancestor',
      'The degree of vertex u',
      'The distance of vertex u from the root'
    ],
    correctIndex: 1,
    explanation: 'low[u] tracks the highest ancestor (lowest discovery timestamp) that can be reached from u\'s subtree via tree edges and back-edges.',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-14',
    question: 'Why does the 0-1 BFS algorithm never require sorting or a priority queue?',
    options: [
      'Because all nodes have degree 0',
      'Because edge weights are either 0 or 1, distances in the deque always span at most two consecutive integers {d, d+1}. Pushing 0-edges to the front and 1-edges to the back preserves monotonic order',
      'It converts edges into negative numbers',
      'It relies on random shuffling'
    ],
    correctIndex: 1,
    explanation: 'Since edge weights are only 0 or 1, any newly reached node has distance d (same as current) or d+1. Pushing d to the front and d+1 to the back maintains a perfectly sorted queue in O(1).',
    category: 'Theory (30%)'
  },
  {
    id: 'd11-post-15',
    question: 'In a graph with negative cycles, what does the Floyd-Warshall algorithm exhibit on its diagonal entries?',
    options: [
      'dist[i][i] becomes negative (dist[i][i] < 0) for any node i that can reach and be reached by the negative cycle',
      'dist[i][i] becomes infinity',
      'dist[i][i] equals 0',
      'dist[i][i] produces a segmentation fault'
    ],
    correctIndex: 0,
    explanation: 'Initially dist[i][i] = 0. If a negative cycle exists that passes through or connects to i, traversing the cycle reduces dist[i][i] to a negative value.',
    category: 'Theory (30%)'
  },

  // --- Practical Execution & Trace (70%): Q16 to Q50 ---
  {
    id: 'd11-post-16',
    question: 'Given an Alien Dictionary with words: ["z", "x", "z"]. What is the correct conclusion?',
    options: [
      'Alien order is: "z", "x"',
      'Alien order is: "x", "z"',
      'Invalid / Impossible dictionary (cycle detected: "z" appears before "x", and "x" appears before "z", yielding z -> x and x -> z)',
      'Empty string'
    ],
    correctIndex: 2,
    explanation: 'Comparing words[0] ("z") and words[1] ("x") yields z < x (edge z->x). Comparing words[1] ("x") and words[2] ("z") yields x < z (edge x->z). This forms a 2-cycle z <-> x, making a valid ordering impossible.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-17',
    question: 'In LeetCode 269 "Alien Dictionary", what critical prefix edge case MUST be handled when comparing adjacent words like "apple" and "app"?',
    options: [
      'Convert all characters to uppercase',
      'If word1 starts with word2 but word1 is longer (e.g. "apple" precedes "app"), this violates the fundamental prefix rule of lex-order, so the dictionary is invalid (return "")',
      'Add a blank character to the graph',
      'Ignore the shorter word'
    ],
    correctIndex: 1,
    explanation: 'In any valid lexicographical order, a prefix must always come before a longer string extending it (e.g., "app" must precede "apple"). If "apple" is listed before "app", the input is invalid.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-18',
    question: 'Trace the distance array in Dijkstra starting from node 0 on a graph with edges: (0,1,5), (0,2,2), (2,1,1), (1,3,3), (2,3,7). What is dist[3]?',
    options: [
      'dist[3] = 7 (via 0->2->3)',
      'dist[3] = 6 (via 0->2->1->3: 2 + 1 + 3 = 6)',
      'dist[3] = 8 (via 0->1->3: 5 + 3 = 8)',
      'dist[3] = 5'
    ],
    correctIndex: 1,
    explanation: 'Initial dist: dist[0]=0, dist[1]=5, dist[2]=2. Node 2 is visited (dist=2). Neighbor 1 relaxed to min(5, 2+1) = 3. Node 1 is visited (dist=3). Neighbor 3 relaxed to min(inf, 3+3) = 6.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-19',
    question: 'In DSU with path compression, consider nodes {0, 1, 2, 3}. Initially parents are parent[i] = i. We perform: union(0, 1), union(1, 2). What does find(2) return?',
    options: [
      '2',
      'The representative root (either 0 or 1 depending on rank/order)',
      'null',
      '-1'
    ],
    correctIndex: 1,
    explanation: 'union(0, 1) groups 0 and 1 under a shared root. union(1, 2) groups 2 under that same root. Calling find(2) traverses up to the common representative and compresses the path.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-20',
    question: 'In Tarjan’s Bridge algorithm on a network: edges (0,1), (1,2), (2,0), (1,3), (3,4), (4,5), (5,3). Which edge is the ONLY bridge in the entire network?',
    options: [
      '(0, 1)',
      '(1, 3)',
      '(3, 4)',
      '(4, 5)'
    ],
    correctIndex: 1,
    explanation: '{0, 1, 2} forms a 3-cycle. {3, 4, 5} forms a 3-cycle. The only link connecting these two subgraphs is edge (1, 3). Removing (1, 3) cuts the graph into two disconnected components.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-21',
    question: 'In a 0-1 BFS maze navigation where stepping on grass costs 0 and stepping on water costs 1, what prevents processing the same cell multiple times with suboptimal distance?',
    options: [
      'Maintaining a dist[r][c] 2D matrix initialized to infinity and only pushing to deque if newDist < dist[nr][nc]',
      'Using a recursive function call',
      'Sorting the grid before search',
      'Using a random number generator'
    ],
    correctIndex: 0,
    explanation: 'Just like Dijkstra, 0-1 BFS must check `if (newDist < dist[nr][nc]) { dist[nr][nc] = newDist; ... }` before pushing into the front or back of the deque to avoid redundant expansions.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-22',
    question: 'In LeetCode 743 "Network Delay Time", N nodes are sent a signal from node K. How is the total time for ALL nodes to receive the signal computed after running Dijkstra?',
    options: [
      'The sum of all dist[i] for i = 1..N',
      'The maximum value in dist[i] for i = 1..N (if any dist[i] == infinity, return -1 because that node is unreachable)',
      'The minimum value in dist[i]',
      'dist[K]'
    ],
    correctIndex: 1,
    explanation: 'Signals propagate in parallel along all shortest paths. The total time until every node receives the signal is the time taken by the slowest node (max(dist)). If any node has dist == inf, it never receives it.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-23',
    question: 'In LeetCode 332 "Reconstruct Itinerary", an itinerary must use all flight tickets starting from "JFK" in lexicographically smallest order. Why does a standard greedy DFS fail?',
    options: [
      'A greedy DFS can enter a dead-end airport before visiting all available tickets; Hierholzer’s post-order algorithm solves this by backtracking and appending dead-ends to the end of the route',
      'Greedy DFS cannot compare string ticket names',
      'Lexicographical order is not supported by graphs',
      'JFK is not always in the United States'
    ],
    correctIndex: 0,
    explanation: 'A greedy choice may fly to an airport with no outgoing tickets while other unused tickets remain elsewhere. Hierholzer\'s algorithm commits dead-ends last during post-order traversal, avoiding premature traps.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-24',
    question: 'You have 4 vertices {0, 1, 2, 3}. Edges are added one by one: (0, 1), (1, 2), (2, 3), (3, 0). Which edge causes DSU union() to return false, detecting a cycle?',
    options: [
      '(0, 1)',
      '(1, 2)',
      '(2, 3)',
      '(3, 0) (because find(3) and find(0) already share the same root component)'
    ],
    correctIndex: 3,
    explanation: 'Before adding (3, 0), nodes 0, 1, 2, 3 are already connected in the same component by the previous 3 edges. Attempting union(3, 0) detects find(3) == find(0), revealing the cycle.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-25',
    question: 'What is the maximum flow through a network with source S and sink T if the cut ({S, A}, {B, T}) has forward edges S->B (cap 4) and A->T (cap 6), and backward edge B->A (cap 5)?',
    options: [
      '15',
      '10 (cut capacity considers ONLY edges pointing from partition S to partition T: 4 + 6 = 10)',
      '5',
      '20'
    ],
    correctIndex: 1,
    explanation: 'By the formal definition of an S-T cut (A, B), capacity is the sum of capacities of edges originating in set A and terminating in set B. Backward edges (B->A) do not contribute to cut capacity.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-26',
    question: 'In the LeetCode 127 "Word Ladder" problem with beginWord = "hit", endWord = "cog", and wordList = ["hot","dot","dog","lot","log","cog"], what is the shortest sequence length?',
    options: [
      '4',
      '5 ("hit" -> "hot" -> "dot" -> "dog" -> "cog")',
      '6',
      '3'
    ],
    correctIndex: 1,
    explanation: 'One shortest path is: "hit" (1) -> "hot" (2) -> "dot" (3) -> "dog" (4) -> "cog" (5). Length is 5 words.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-27',
    question: 'In Kosaraju’s algorithm, what would happen if we ran the second DFS pass on the ORIGINAL graph instead of the transposed (reversed) graph?',
    options: [
      'The algorithm would correctly find all SCCs',
      'The DFS would bleed across directed edges into downstream components, failing to isolate individual SCCs',
      'It would cause a segmentation fault',
      'It would compute the Minimum Spanning Tree'
    ],
    correctIndex: 1,
    explanation: 'Reversing edges prevents DFS from traversing out of an SCC into components that could previously be reached in the forward direction.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-28',
    question: 'In LeetCode 1192 "Critical Connections in a Network", an edge (u, v) is added to the result list when:',
    options: [
      'low[v] > tin[u]',
      'low[v] < tin[u]',
      'low[v] == tin[u]',
      'tin[v] == tin[u]'
    ],
    correctIndex: 0,
    explanation: 'If low[v] > tin[u], the lowest discovery time reachable from subtree v is strictly greater than u\'s discovery time, meaning no alternate path or back-edge reaches u or its ancestors. Edge (u, v) is a bridge.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-29',
    question: 'In Prim’s algorithm on a graph with V vertices, when a vertex `u` is added to the MST, how are the key values of its adjacent unvisited neighbors `v` updated?',
    options: [
      'key[v] = key[u] + weight(u, v)',
      'key[v] = min(key[v], weight(u, v)) (the direct connection cost to the growing MST tree, NOT the cumulative distance from the start)',
      'key[v] = key[v] * 2',
      'key[v] = 0'
    ],
    correctIndex: 1,
    explanation: 'Crucial distinction: Dijkstra accumulates distance from source (dist[u] + weight), whereas Prim records the cheapest single edge connecting node v to ANY node in the current MST (min(key[v], weight)).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-30',
    question: 'In a Bidirectional BFS from start to target, how do we efficiently decide which frontier to expand on each iteration?',
    options: [
      'Always alternate strictly: one step from start, one step from target',
      'Always expand the SMALLER frontier set (if frontierA.size() > frontierB.size(), swap them); this minimizes total state expansions at each depth',
      'Pick a random frontier',
      'Always expand the start frontier first until halfway'
    ],
    correctIndex: 1,
    explanation: 'Always expanding the smaller frontier keeps the branching factor constrained to the narrower boundary, drastically cutting the number of neighbor lookups.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-31',
    question: 'What is the time complexity of the Floyd-Warshall algorithm for an adjacency matrix of size V x V?',
    options: [
      'O(V^2)',
      'O(V^3) with three nested loops k, i, j from 0 to V-1',
      'O(V * E log V)',
      'O(2^V)'
    ],
    correctIndex: 1,
    explanation: 'Floyd-Warshall executes three nested loops of size V: for k in 0..V-1, for i in 0..V-1, for j in 0..V-1: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]). This is O(V^3).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-32',
    question: 'In LeetCode 802 "Find Eventual Safe States", a node is eventual safe if every possible path starting from that node leads to a terminal node (no cycles). How can this be solved using Kahn’s Algorithm?',
    options: [
      'Reverse all graph edges and run Kahn’s algorithm starting with nodes that have in-degree 0 in the reversed graph (originally terminal nodes with out-degree 0)',
      'Run Dijkstra from node 0',
      'Sort vertices by node ID',
      'Run Kruskal’s algorithm'
    ],
    correctIndex: 0,
    explanation: 'By reversing the edges, terminal nodes (out-degree 0) become sources (in-degree 0). Running Kahn\'s topological sort peels away all nodes that safely lead to terminals, leaving cyclical nodes unprocessed.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-33',
    question: 'In Edmonds-Karp Max-Flow, why does using BFS to find augmenting paths guarantee polynomial runtime O(V * E^2)?',
    options: [
      'BFS always visits edges in alphabetical order',
      'Shortest augmenting paths ensure that the distance from source to any node in the residual network never decreases, and each edge becomes critical at most V/2 times',
      'BFS eliminates negative edge weights',
      'BFS limits the flow to 1 unit per path'
    ],
    correctIndex: 1,
    explanation: 'Using BFS guarantees that the shortest path distance in the residual graph increases monotonically. A bottleneck edge can become critical at most O(V) times, bounding total augmentations to O(V * E).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-34',
    question: 'Consider a grid where you can move up, down, left, right. Some cells have obstacles. If you are allowed to eliminate at most K obstacles, what is the state representation for BFS?',
    options: [
      '(row, col)',
      '(row, col, obstacles_eliminated_so_far)',
      '(row, col, time)',
      '(obstacles_eliminated_so_far)'
    ],
    correctIndex: 1,
    explanation: 'Arriving at cell (r, c) having used fewer obstacle eliminations is strictly superior to arriving with more eliminations used. The state must be 3-dimensional: (row, col, obstacles_left).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-35',
    question: 'In Tarjan’s algorithm for Articulation Points, the root of the DFS tree is an articulation point if and only if:',
    options: [
      'It has at least 2 children in the DFS tree',
      'It has low[root] == tin[root]',
      'It has an in-degree of 0',
      'It is connected to a leaf'
    ],
    correctIndex: 0,
    explanation: 'Special rule for the DFS root: because it has no ancestor in the tree, low[v] >= tin[u] is trivially true for all children. The root is a cut vertex if and only if it has 2 or more distinct children in the DFS tree.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-36',
    question: 'What is the output of Topological Sort on the following graph: 5->0, 5->2, 4->0, 4->1, 2->3, 3->1?',
    options: [
      '[5, 4, 2, 3, 1, 0] (one valid topological ordering among several valid permutations)',
      '[0, 1, 2, 3, 4, 5]',
      'Cycle detected',
      '[1, 0, 3, 2, 4, 5]'
    ],
    correctIndex: 0,
    explanation: 'In-degrees: 5:0, 4:0, 2:1, 0:2, 3:1, 1:2. Both 5 and 4 can be processed first. Processing 5 and 4 unblocks 2, which unblocks 3, which unblocks 1 and 0. [5, 4, 2, 3, 1, 0] is completely valid.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-37',
    question: 'In LeetCode 787 "Cheapest Flights Within K Stops", why is Bellman-Ford or BFS with an auxiliary `prev_dist` array preferred?',
    options: [
      'Standard in-place Bellman-Ford can propagate relaxations across multiple hops within a single round, violating the exact "at most K stops" invariant; taking a snapshot of distances prevents multi-hop cascade',
      'Bellman-Ford uses O(1) memory',
      'Dijkstra is banned by FAANG interviewers',
      'Stops cannot be counted with integers'
    ],
    correctIndex: 0,
    explanation: 'If edges (A, B) and (B, C) are relaxed sequentially in the same round, dist[C] might update using the newly changed dist[B], effectively taking 2 hops in 1 step. A snapshot of previous distances isolates each step.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-38',
    question: 'What data structure enables finding the Shortest Path in a Directed Acyclic Graph (DAG) with edge weights in O(V + E) time?',
    options: [
      'Topological Sort array + simple distance array (relax edges in topological order)',
      'Binary Search Tree',
      'Disjoint Set Union',
      'Adjacency Matrix'
    ],
    correctIndex: 0,
    explanation: 'By traversing nodes in topological order, every incoming edge to node u is guaranteed to have been fully processed before we relax u\'s outgoing edges, giving O(V + E) without a priority queue.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-39',
    question: 'In a graph with 6 vertices, what is the minimum number of edges required to make the graph strongly connected?',
    options: [
      '5',
      '6 (a single directed cycle of length 6)',
      '12',
      '15'
    ],
    correctIndex: 1,
    explanation: 'In any strongly connected directed graph, every vertex must have in-degree >= 1 and out-degree >= 1. The minimal configuration is a single simple directed cycle visiting all V vertices, requiring V edges (6 edges).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-40',
    question: 'In Kruskal’s algorithm, how is the total weight of the Minimum Spanning Tree computed if a graph has V vertices and only V - 2 edges are added before all remaining edges create cycles?',
    options: [
      'The graph is disconnected; no spanning tree exists (return -1 or report disconnected graph)',
      'The tree is complete',
      'Return the sum of the V - 2 edges',
      'Add a random edge'
    ],
    correctIndex: 0,
    explanation: 'A valid spanning tree for V vertices requires exactly V - 1 edges. If fewer than V - 1 edges can be added without cycles, the graph has multiple disconnected components.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-41',
    question: 'When implementing DSU to solve LeetCode 684 "Redundant Connection", when is an edge [u, v] identified as redundant?',
    options: [
      'When u > v',
      'When find(u) == find(v) prior to union, indicating that u and v are already connected through an existing path, so adding [u, v] forms a cycle',
      'When rank[u] == rank[v]',
      'When degree of u exceeds 2'
    ],
    correctIndex: 1,
    explanation: 'If find(u) == find(v), a path already exists connecting u and v in the tree. The edge [u, v] is therefore redundant and creates a cycle.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-42',
    question: 'In LeetCode 126 "Word Ladder II", why is finding the shortest path length using BFS FIRST followed by backtracking with DFS (or building a predecessor DAG) optimal?',
    options: [
      'BFS establishes the exact shortest distance to every word and creates a directed level DAG, preventing DFS from wandering down infinite or suboptimal longer paths',
      'DFS cannot read string characters',
      'BFS requires O(1) space',
      'Word Ladder II does not require all shortest paths'
    ],
    correctIndex: 0,
    explanation: 'Pure DFS would explore exponential non-optimal paths. BFS builds a DAG of shortest transitions (where dist[parent] + 1 == dist[child]), allowing DFS to extract only optimal paths in minimal time.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-43',
    question: 'In Tarjan’s SCC algorithm, what is the role of the boolean array `inStack[u]`?',
    options: [
      'It checks if node u was visited during the previous year',
      'It allows O(1) checking of whether neighbor `v` is in the current active DFS recursion path / component; only nodes with `inStack[v] == true` can update `low[u] = min(low[u], tin[v])`',
      'It prevents stack overflow on recursive calls',
      'It marks nodes that have odd degrees'
    ],
    correctIndex: 1,
    explanation: 'Cross-edges may lead to nodes that have already been assigned to a previous, completed SCC. `inStack[v]` ensures we only consider back-edges to ancestors within the active component.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-44',
    question: 'What is the diameter of an undirected tree with edges: (1,2), (1,3), (3,4), (4,5), (3,6)?',
    options: [
      '3',
      '4 (path: 2 - 1 - 3 - 4 - 5 or 5 - 4 - 3 - 6)',
      '5',
      '2'
    ],
    correctIndex: 1,
    explanation: 'Path 2->1->3->4->5 has 4 edges. Path 5->4->3->6 has 3 edges. Path 2->1->3->6 has 3 edges. The maximum number of edges between any two nodes is 4.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-45',
    question: 'In LeetCode 207 "Course Schedule", how do we detect cycles using DFS with 3-color marking?',
    options: [
      'White (0) = unvisited, Gray (1) = visiting (currently on recursion stack), Black (2) = completely visited. Encountering a Gray neighbor confirms a directed cycle',
      'Colors represent course grades',
      'Marking nodes as red or blue to find bipartite partitions',
      'Every node is marked Gray immediately'
    ],
    correctIndex: 0,
    explanation: 'Three-color DFS: White = unvisited; Gray = currently being processed on the active DFS path; Black = all descendants finished. If DFS visits an edge leading to a Gray node, a back-edge and cycle are detected.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-46',
    question: 'How do you find the center of a star graph with N vertices and N - 1 edges in O(1) time given an edge list?',
    options: [
      'Run Dijkstra from all nodes',
      'The center vertex must appear in both edges[0] and edges[1]; simply find which of edges[0][0] or edges[0][1] matches edges[1][0] or edges[1][1]',
      'Sort all edges by weight',
      'Count the number of cycles'
    ],
    correctIndex: 1,
    explanation: 'In a star graph, the central vertex is connected to every other vertex. Therefore, it MUST appear in both the first and second edge. Checking the 4 endpoints takes O(1) time.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-47',
    question: 'In LeetCode 990 "Satisfiability of Equality Equations", how does DSU process equations like ["a==b", "b==c", "a!=c"]?',
    options: [
      'Pass 1: union all pairs with "==" (union(\'a\', \'b\') and union(\'b\', \'c\')). Pass 2: for all "!=", verify find(u) != find(v). Here find(\'a\') == find(\'c\'), so equation is unsatisfiable (return false)',
      'Convert characters to ASCII and add them',
      'Sort strings alphabetically',
      'Return true for all inputs'
    ],
    correctIndex: 0,
    explanation: 'All equality relations define equivalence classes (connected components). Once components are merged, any inequality "u!=v" between elements with find(u) == find(v) creates an immediate contradiction.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-48',
    question: 'In LeetCode 1631 "Path With Minimum Effort", what is the most optimal way to find the minimum effort path across an R x C grid?',
    options: [
      'Dijkstra’s algorithm on the grid where distance to neighbor is max(current_effort, abs(height[nr][nc] - height[r][c]))',
      'Simple DFS with backtracking',
      'Kruskal’s algorithm on strings',
      'Topological Sort'
    ],
    correctIndex: 0,
    explanation: 'Modified Dijkstra maintains the minimum maximum edge effort to reach each cell. Alternatively, binary search on effort + BFS/DSU check also achieves O(R * C log(max_height)).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-49',
    question: 'In an undirected graph, what is the maximum number of connected components a single articulation point can split the graph into?',
    options: [
      'At most 2',
      'At most degree(v) components (each neighbor could become part of an isolated component)',
      'Always V components',
      'Exactly 1'
    ],
    correctIndex: 1,
    explanation: 'If a central hub node connects to K isolated leaves or disconnected subtrees, removing it splits the graph into up to K = degree(v) separate connected components.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd11-post-50',
    question: 'Why is Kahn’s algorithm preferred over DFS for topological sort in distributed or multi-threaded build systems (e.g., Bazel, Google Build)?',
    options: [
      'Kahn\'s algorithm maintains an explicit queue of tasks ready for execution (in-degree 0), allowing worker threads in a thread pool to immediately pick and execute independent tasks concurrently as prerequisites finish',
      'Kahn\'s algorithm uses less disk storage',
      'DFS cannot run on Linux servers',
      'Kahn\'s algorithm converts C++ into machine code'
    ],
    correctIndex: 0,
    explanation: 'Kahn\'s algorithm surfaces all zero-dependency tasks simultaneously in a queue. In distributed build systems, these tasks can be assigned across multiple worker nodes in parallel.',
    category: 'Practical Execution & Trace (70%)'
  }
];

const fileContent = `import { AssessmentQuestion } from '../types';

/**
 * Day 11 Comprehensive Assessment Suite (100 Placement-Grade MCQs)
 * 50 Pre-Assessment MCQs + 50 Post-Assessment MCQs
 * Module 12: Advanced Graph Theory, Network Flow & Distributed Traversal
 * Mentor: Kapil (Placement Readiness Program)
 *
 * Strict Category Split:
 * Questions 1-15: 'Theory (30%)'
 * Questions 16-50: 'Practical Execution & Trace (70%)'
 */

export const DAY_11_PRE_ASSESSMENT_50: AssessmentQuestion[] = ${JSON.stringify(preAssessment, null, 2)};

export const DAY_11_POST_ASSESSMENT_50: AssessmentQuestion[] = ${JSON.stringify(postAssessment, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/day11Assessments50.ts'), fileContent, 'utf8');
console.log('Successfully wrote src/data/day11Assessments50.ts');
