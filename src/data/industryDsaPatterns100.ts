export interface IndustryScenarioQuizItem {
  id: number;
  company: string;
  domain:
    | 'E-Commerce'
    | 'Ride-Sharing & Mobility'
    | 'Streaming & Media'
    | 'Fintech & Trading'
    | 'Cloud & Infrastructure'
    | 'Social & Messaging'
    | 'Logistics & Warehousing'
    | 'Search & Gaming';
  scenarioTitle: string;
  scenarioDescription: string;
  constraintsAndScale: string;
  options: string[];
  correctIndex: number;
  correctPattern: string;
  kapilPatternInsight: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export const INDUSTRY_DSA_SCENARIOS_100: IndustryScenarioQuizItem[] = [
  {
    id: 1,
    company: 'Netflix',
    domain: 'Streaming & Media',
    scenarioTitle: 'Adaptive Bitrate Buffer Smoothing',
    scenarioDescription:
      'Netflix dynamically measures network packet throughput over the last K seconds to adjust video streaming resolution smoothly without video stutter. You need to continuously compute the average bandwidth in a stream of 100,000 throughput readings.',
    constraintsAndScale: 'Window size K = 30 seconds; 1,000 incoming telemetry packets per second; O(1) query time required.',
    options: ['Sliding Window (Fixed Size)', 'Depth First Search (DFS)', 'Segment Tree', 'Backtracking'],
    correctIndex: 0,
    correctPattern: 'Sliding Window (Fixed Size)',
    kapilPatternInsight:
      'Mentorship By Kapil: Whenever a metric is computed over a continuous, moving interval of fixed length K, maintain a running sum. When advancing, add the incoming element and subtract the outgoing element in O(1) time.',
    timeComplexity: 'O(N) total, O(1) per update',
    spaceComplexity: 'O(K)',
  },
  {
    id: 2,
    company: 'Uber',
    domain: 'Ride-Sharing & Mobility',
    scenarioTitle: 'Nearest Available Driver Dispatch',
    scenarioDescription:
      'When a passenger requests a ride in Bangalore, the system must immediately identify the top 5 nearest verified drivers from among 50,000 active drivers moving around the city coordinates.',
    constraintsAndScale: 'N = 50,000 drivers; query must return top K = 5 drivers in under 5 milliseconds.',
    options: ['Max-Heap of size K (or Min-Heap)', 'Floyd-Warshall All-Pairs Shortest Path', 'Bitmask Dynamic Programming', 'Topological Sort'],
    correctIndex: 0,
    correctPattern: 'Max-Heap of size K (Priority Queue)',
    kapilPatternInsight:
      'Mentorship By Kapil: Finding the top K smallest or nearest elements in a dynamic pool of size N requires a Max-Heap of size K. Each insertion takes O(log K) rather than sorting the whole array in O(N log N).',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
  },
  {
    id: 3,
    company: 'Amazon',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'Automated Robot Cargo Bin Packing',
    scenarioDescription:
      'Amazon fulfillment robots must pack N cargo packages into K shipping containers. Contiguous conveyor packages cannot be rearranged. You must find the minimum possible container capacity so all packages fit in <= K containers.',
    constraintsAndScale: 'N = 100,000 packages; package weights up to 10^9; capacity search range up to 10^14.',
    options: ['Binary Search on Answer Space (Min-Max Optimization)', 'Breadth First Search (BFS)', 'Disjoint Set Union (DSU)', 'Boyer-Moore Voting'],
    correctIndex: 0,
    correctPattern: 'Binary Search on Answer Space',
    kapilPatternInsight:
      'Mentorship By Kapil: The feasibility predicate is monotonic: if capacity C can ship the cargo in <= K containers, any capacity > C can also do so. Binary search the range [max(weight), sum(weights)]!',
    timeComplexity: 'O(N log(sum - max))',
    spaceComplexity: 'O(1)',
  },
  {
    id: 4,
    company: 'Zerodha / Goldman Sachs',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Daily Stock Span & Next Market Spike',
    scenarioDescription:
      'A financial trading terminal needs to compute the "stock span" for every stock price tick: the number of consecutive previous days the stock price was less than or equal to today’s price.',
    constraintsAndScale: 'N = 1,000,000 price ticks; strict sub-millisecond latency per tick.',
    options: ['Monotonic Stack', 'Kruskal Algorithm', 'Trie Data Structure', '2D Dynamic Programming'],
    correctIndex: 0,
    correctPattern: 'Monotonic Stack',
    kapilPatternInsight:
      'Mentorship By Kapil: Any problem requiring the nearest previous or next greater/smaller element is a canonical Monotonic Stack problem. Every price is pushed and popped at most once for amortized O(1) time per tick.',
    timeComplexity: 'O(N) amortized',
    spaceComplexity: 'O(N)',
  },
  {
    id: 5,
    company: 'Google Maps',
    domain: 'Ride-Sharing & Mobility',
    scenarioTitle: 'Point-to-Point Navigation with Positive Road Weights',
    scenarioDescription:
      'Calculate the fastest driving route between two road junctions in a city road network of 200,000 intersections, where each road has non-negative real travel times.',
    constraintsAndScale: 'V = 200,000 intersections, E = 800,000 road segments; all edge weights >= 0.',
    options: ["Dijkstra's Algorithm with Min-Heap", 'Floyd-Warshall Algorithm', 'Tarjan Strongly Connected Components', 'Bubble Sort'],
    correctIndex: 0,
    correctPattern: "Dijkstra's Algorithm with Min-Heap",
    kapilPatternInsight:
      'Mentorship By Kapil: For single-source shortest paths on weighted directed/undirected graphs with non-negative edge weights, Dijkstra using an adjacency list and Min-Heap runs in O((V + E) log V).',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V + E)',
  },
  {
    id: 6,
    company: 'Spotify',
    domain: 'Streaming & Media',
    scenarioTitle: 'LRU Song Cache with O(1) Eviction',
    scenarioDescription:
      'Spotify caches the user’s recently streamed songs in device memory. When the memory limit of C songs is reached, the Least Recently Played song must be evicted. Fetching and playing a song must update its recency in O(1) time.',
    constraintsAndScale: 'Cache capacity C = 1,000; stream of 10,000,000 playback events; both get() and put() must be strictly O(1).',
    options: ['Hash Map + Doubly Linked List', 'Single Sorted Array', 'Binary Search Tree', 'Min-Heap with Rebuilding'],
    correctIndex: 0,
    correctPattern: 'Hash Map + Doubly Linked List',
    kapilPatternInsight:
      'Mentorship By Kapil: A Hash Map provides O(1) key-to-node lookup, while a Doubly Linked List allows O(1) node detachment and insertion at the head (Most Recently Used) or removal from the tail (Least Recently Used).',
    timeComplexity: 'O(1) for both get and put',
    spaceComplexity: 'O(C)',
  },
  {
    id: 7,
    company: 'Stripe',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Zero-Sum Fraudulent Credit Loop Detection',
    scenarioDescription:
      'Stripe audits merchant transaction logs containing positive and negative balance adjustments. They need to find whether any contiguous sequence of transactions cancels out to exactly zero (sum = 0) or sum = K.',
    constraintsAndScale: 'N = 200,000 transactions; amounts can be negative, zero, or positive; must run in single pass.',
    options: ['Prefix Sum + Hash Map', 'Two Pointers (Sliding Window)', 'Bitwise XOR', 'Branch and Bound'],
    correctIndex: 0,
    correctPattern: 'Prefix Sum + Hash Map',
    kapilPatternInsight:
      'Mentorship By Kapil: Two Pointers fails when arrays contain negative values because window expansion is not monotonic! Prefix Sum with a Hash Map stores previous cumulative sums to detect S_j - S_i = K in O(N) time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 8,
    company: 'LinkedIn',
    domain: 'Social & Messaging',
    scenarioTitle: 'Mutual Connection Degree Separation',
    scenarioDescription:
      'Determine the minimum number of mutual connection hops between two professionals on LinkedIn (Degrees of Connection: 1st, 2nd, 3rd degree).',
    constraintsAndScale: 'Unweighted social graph with 800M users; find shortest hop distance efficiently.',
    options: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Bellman-Ford Algorithm', 'Kruskal Algorithm'],
    correctIndex: 0,
    correctPattern: 'Breadth-First Search (BFS)',
    kapilPatternInsight:
      'Mentorship By Kapil: In an unweighted graph, Breadth-First Search visits nodes level-by-level, mathematically guaranteeing that the first time the destination node is reached, it is via the shortest path (minimum hops).',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
  },
  {
    id: 9,
    company: 'Zomato / Swiggy',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'Maximum Overlapping Delivery Orders (Kitchen Heatmap)',
    scenarioDescription:
      'A cloud kitchen receives hundreds of meal orders with preparation intervals [prepStart, prepEnd]. Determine the maximum number of chefs needed simultaneously so no order waits.',
    constraintsAndScale: 'N = 50,000 orders; intervals with timestamps up to 86,400 seconds.',
    options: ['Interval Sweep-Line / Greedy Sort with Min-Heap', 'Backtracking with Pruning', 'Matrix Exponentiation', 'String KMP Algorithm'],
    correctIndex: 0,
    correctPattern: 'Interval Sweep-Line / Greedy Sort',
    kapilPatternInsight:
      'Mentorship By Kapil: Sort start and end timestamps independently or maintain a Min-Heap of end times. If a new order starts before the earliest active order ends, increment room/chef allocation.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 10,
    company: 'Google Search',
    domain: 'Search & Gaming',
    scenarioTitle: 'Search Bar Autocomplete Query Prefix Matching',
    scenarioDescription:
      'As a user types characters into the search bar (e.g. "pla..."), instantly retrieve the top query completions matching that prefix from a dictionary of 10,000,000 stored search queries.',
    constraintsAndScale: 'Dictionary of 10,000,000 words; query prefix length L <= 20; latency under 2ms.',
    options: ['Trie (Prefix Tree)', 'Monotonic Queue', 'Floyd Cycle Detection', 'Topological Sort'],
    correctIndex: 0,
    correctPattern: 'Trie (Prefix Tree)',
    kapilPatternInsight:
      'Mentorship By Kapil: A Trie allows prefix searches in O(L) time, where L is the length of the typed prefix string, completely independent of the 10,000,000 total words in the dictionary!',
    timeComplexity: 'O(L) per search',
    spaceComplexity: 'O(Total Characters in Dictionary)',
  },
  {
    id: 11,
    company: 'Meta / WhatsApp',
    domain: 'Social & Messaging',
    scenarioTitle: 'Single Corrupted Message Packet Identification',
    scenarioDescription:
      'In a distributed chat sync protocol, every message ID appears exactly twice (sent acknowledgement & received acknowledgement) across mirrors, except for one corrupted packet that appears only once.',
    constraintsAndScale: 'N = 10,000,001 IDs; memory constraint: strictly O(1) auxiliary space allowed.',
    options: ['Bitwise XOR Accumulator', 'Hash Set', 'Merge Sort', 'Binary Search Tree'],
    correctIndex: 0,
    correctPattern: 'Bitwise XOR Accumulator',
    kapilPatternInsight:
      'Mentorship By Kapil: Due to the properties x ^ x = 0 and x ^ 0 = x, XORing all packet IDs cancels all duplicate pairs in O(N) time while using zero auxiliary heap memory!',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 12,
    company: 'Microsoft Azure',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Microservice Build Dependency Graph Resolution',
    scenarioDescription:
      'Azure Pipelines must compile 500 interdependent microservices. Some services depend on the output binaries of others. Output a valid sequential compilation order or flag circular dependency errors.',
    constraintsAndScale: 'Directed Graph with 500 nodes and 2,000 dependency edges; cycle detection mandatory.',
    options: ["Topological Sort (Kahn's Algorithm / In-degree BFS)", 'Prim Minimal Spanning Tree', 'Monotonic Stack', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: "Topological Sort (Kahn's Algorithm)",
    kapilPatternInsight:
      'Mentorship By Kapil: Dependency ordering in a Directed Acyclic Graph (DAG) is the textbook definition of Topological Sort. If Kahn’s in-degree queue finishes with fewer than V nodes processed, a circular dependency cycle exists!',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
  },
  {
    id: 13,
    company: 'Amazon Prime Video',
    domain: 'Streaming & Media',
    scenarioTitle: 'Sliding Window Maximum Bitrate Monitoring',
    scenarioDescription:
      'Monitor continuous video streams of length N. In every moving frame window of size K, output the peak bitrate consumption to detect encoding anomalies.',
    constraintsAndScale: 'N = 1,000,000 frames, window size K = 1,000. O(N * K) is too slow (10^9 operations).',
    options: ['Monotonic Deque (Double-Ended Queue)', 'Nested Double Loop', 'Binary Search Tree', 'Selection Sort'],
    correctIndex: 0,
    correctPattern: 'Monotonic Deque',
    kapilPatternInsight:
      'Mentorship By Kapil: Maintain indices in a deque in decreasing order of bitrate. Discard indices outside the window from the front and smaller values from the back. Front always holds the window maximum in amortized O(N) total time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
  },
  {
    id: 14,
    company: 'Apple iOS',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Dynamic Friend Group Merger & Circle Query (Airdrop Contacts)',
    scenarioDescription:
      'When devices discover each other over Bluetooth, connect them into local clusters. Quickly answer queries: "Are Device A and Device B part of the same network cluster?" as clusters merge dynamically.',
    constraintsAndScale: 'N = 100,000 devices; 500,000 dynamic merge and query operations.',
    options: ['Disjoint Set Union (DSU / Union-Find with Path Compression)', 'Breadth First Search on each query', 'Floyd-Warshall', 'Quick Sort'],
    correctIndex: 0,
    correctPattern: 'Disjoint Set Union (DSU)',
    kapilPatternInsight:
      'Mentorship By Kapil: Dynamic connectivity with frequent merge and component queries is solved optimally by Union-Find with path compression and rank, giving near-constant O(alpha(N)) amortized time per operation.',
    timeComplexity: 'O(alpha(N)) ≈ O(1) per query',
    spaceComplexity: 'O(N)',
  },
  {
    id: 15,
    company: 'Flipkart',
    domain: 'E-Commerce',
    scenarioTitle: 'Big Billion Day Flash Sale Cart Budget Optimization',
    scenarioDescription:
      'A shopper has a gift voucher of exactly ₹K. Given a list of item prices, find the maximum total value of items the shopper can purchase without exceeding weight capacity W.',
    constraintsAndScale: 'N = 1,000 items, Weight Capacity W = 10,000. Each item can be picked at most once.',
    options: ['0/1 Knapsack Dynamic Programming', 'Greedy Ratio Sort', 'Sliding Window', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: '0/1 Knapsack Dynamic Programming',
    kapilPatternInsight:
      'Mentorship By Kapil: When items cannot be fractionally divided (all-or-nothing choice) and decision depends on a bounded capacity W, Greedy fails! 0/1 Knapsack DP guarantees the global optimum in O(N * W) time.',
    timeComplexity: 'O(N * W)',
    spaceComplexity: 'O(W) with 1D array space optimization',
  },
  {
    id: 16,
    company: 'Git / GitHub',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Merge Base Identification for Divergent Branches',
    scenarioDescription:
      'When merging two feature branches in Git, the engine must find the most recent common ancestor commit between Branch A and Branch B in the commit DAG.',
    constraintsAndScale: 'Commit tree with 500,000 commits; must query merge base in O(log N) or O(N) time.',
    options: ['Lowest Common Ancestor (LCA) in Tree/DAG', 'Topological Sort', 'Dijkstra Shortest Path', 'Bitwise AND'],
    correctIndex: 0,
    correctPattern: 'Lowest Common Ancestor (LCA)',
    kapilPatternInsight:
      'Mentorship By Kapil: Identifying the merge base of two branches is mathematically equivalent to the Lowest Common Ancestor (LCA) problem. Can be solved using Binary Lifting in O(log N) query time.',
    timeComplexity: 'O(log N) with binary lifting',
    spaceComplexity: 'O(N log N)',
  },
  {
    id: 17,
    company: 'Paytm / PhonePe',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Real-Time Median Transaction Amount Streaming',
    scenarioDescription:
      'UPI payment servers monitor real-time transaction amounts to flag outliers. The server needs to report the running median transaction amount after every single incoming payment.',
    constraintsAndScale: 'Stream of 500,000 incoming payments; median query must execute in O(1) time after each insert.',
    options: ['Two Heaps Pattern (Max-Heap for lower half + Min-Heap for upper half)', 'Re-sorting array after each insert', 'Single Queue', 'Stack'],
    correctIndex: 0,
    correctPattern: 'Two Heaps Pattern',
    kapilPatternInsight:
      'Mentorship By Kapil: Maintain a Max-Heap for the smaller half of numbers and a Min-Heap for the larger half. Balancing sizes ensures median is accessible from heap roots in O(1) time with O(log N) insertion.',
    timeComplexity: 'O(log N) per insert, O(1) per median query',
    spaceComplexity: 'O(N)',
  },
  {
    id: 18,
    company: 'Cisco / Cloudflare',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Longest Prefix Matching for IP Route Tables',
    scenarioDescription:
      'A network router receives incoming IP packets (e.g., 192.168.1.45) and must determine the destination interface using the Longest Prefix Match rule against 500,000 CIDR routing table rules.',
    constraintsAndScale: '32-bit IPv4 addresses; 500,000 rules; packet lookup must occur within nanoseconds.',
    options: ['Binary Trie (Radix Tree)', 'Hash Map with Linear Scan', 'Graph DFS', 'Bubble Sort'],
    correctIndex: 0,
    correctPattern: 'Binary Trie (Radix Tree)',
    kapilPatternInsight:
      'Mentorship By Kapil: IP routing tables use binary Tries where each bit (0 or 1) represents a branch. Finding the longest matching prefix takes at most 32 steps (O(32) = O(1)) regardless of routing table size.',
    timeComplexity: 'O(32) = O(1)',
    spaceComplexity: 'O(N * 32)',
  },
  {
    id: 19,
    company: 'Swiggy Instamart / Blinkit',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'Delivery Boy Fuel Minimum Refuel Stops',
    scenarioDescription:
      'A dark-store delivery fleet travels to a remote warehouse located at distance D. The vehicle has starting fuel F. Along the road are gas stations with fuel capacities. Find the minimum number of refueling stops required to reach the destination.',
    constraintsAndScale: 'Distance D up to 10^9, N = 10,000 gas stations. Return -1 if unreachable.',
    options: ['Greedy with Max-Heap of Passed Stations', '0/1 Knapsack DP', 'Sliding Window', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: 'Greedy with Max-Heap',
    kapilPatternInsight:
      'Mentorship By Kapil: Travel as far as current fuel allows. Whenever fuel runs out before reaching the next stop, greedily refuel from the passed station with the MAXIMUM available fuel using a Max-Heap.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 20,
    company: 'Salesforce',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Nested CRM Formula Syntax Validation',
    scenarioDescription:
      'Validate whether complex customer formula expressions with nested delimiters `({[]})` and logical operators in Salesforce validation rules are correctly balanced and closed.',
    constraintsAndScale: 'Formula string length up to 100,000 characters; must validate in O(N) time.',
    options: ['Stack', 'Queue', 'Binary Search', 'Breadth-First Search'],
    correctIndex: 0,
    correctPattern: 'Stack',
    kapilPatternInsight:
      'Mentorship By Kapil: The LIFO (Last-In, First-Out) property of a Stack perfectly mirrors nested hierarchical structures: every opening delimiter is pushed, and matching closing delimiters must pop the corresponding open symbol.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 21,
    company: 'Bloomberg',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Merge K Sorted Financial Feeds into One Stream',
    scenarioDescription:
      'Bloomberg receives K real-time sorted stock price feeds from K different stock exchanges (NSE, BSE, NASDAQ, NYSE, LSE). Merge them into a single sequentially sorted time-series stream.',
    constraintsAndScale: 'K = 500 feeds, each feed containing 10,000 ticks. Total ticks = 5,000,000.',
    options: ['Min-Heap of size K (K-Way Merge)', 'Repeated Two-Way Merge Sort', 'Array Concatenation and Quick Sort', 'Depth First Search'],
    correctIndex: 0,
    correctPattern: 'Min-Heap of size K (K-Way Merge)',
    kapilPatternInsight:
      'Mentorship By Kapil: Maintain a Min-Heap of size K containing the current smallest tick from each feed. Extract min and push the next tick from that specific feed in O(log K) time per element.',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
  },
  {
    id: 22,
    company: 'Instagram / Meta',
    domain: 'Social & Messaging',
    scenarioTitle: 'Infinite Feed Image Prefetching Window',
    scenarioDescription:
      'As a user scrolls through the Instagram feed, prefetch and cache the next K images while discarding images more than K items behind to prevent mobile OOM (Out Of Memory) crash.',
    constraintsAndScale: 'Continuous scroll with 10,000 posts; viewport window of size K = 10.',
    options: ['Two Pointers / Sliding Window', 'Recursion Tree', 'Floyd-Warshall', 'Topological Sort'],
    correctIndex: 0,
    correctPattern: 'Two Pointers / Sliding Window',
    kapilPatternInsight:
      'Mentorship By Kapil: Tracking a visible sliding segment over a linear stream is solved by maintaining active window boundaries [left, right], updating references in O(1) per scroll event.',
    timeComplexity: 'O(1) per scroll step',
    spaceComplexity: 'O(K)',
  },
  {
    id: 23,
    company: 'Adobe Acrobat',
    domain: 'Search & Gaming',
    scenarioTitle: 'Text Justification & Word Wrap Layout',
    scenarioDescription:
      'Format a paragraph of words into lines of maximum width W such that the raggedness (penalty for extra spaces) is minimized globally across the entire document page.',
    constraintsAndScale: 'N = 10,000 words, Line width W = 80 characters.',
    options: ['Dynamic Programming (Memoization / Tabulation)', 'Greedy line-by-line fill', 'Binary Search', 'Union-Find'],
    correctIndex: 0,
    correctPattern: 'Dynamic Programming',
    kapilPatternInsight:
      'Mentorship By Kapil: Greedy line filling often produces severe raggedness on the final line. DP evaluates the minimum cost choice for line breaks from index i to j with optimal substructure.',
    timeComplexity: 'O(N^2) or O(N * W)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 24,
    company: 'Tesla Autopilot',
    domain: 'Ride-Sharing & Mobility',
    scenarioTitle: 'Obstacle Distance Sensor Array Peaks',
    scenarioDescription:
      'Radar sensors record distance measurements in a mountain contour array where values strictly increase to a peak and then strictly decrease. Find the exact peak obstacle distance in O(log N) time.',
    constraintsAndScale: 'N = 1,000,000 readings; guaranteed bitonic array with distinct adjacent readings.',
    options: ['Binary Search on Bitonic / Mountain Array', 'Linear Scan O(N)', 'Breadth First Search', 'Radix Sort'],
    correctIndex: 0,
    correctPattern: 'Binary Search on Bitonic Array',
    kapilPatternInsight:
      'Mentorship By Kapil: Compare mid with mid + 1. If arr[mid] < arr[mid + 1], you are on the ascending slope (peak lies to the right); else you are on the descending slope. Runs in O(log N)!',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 25,
    company: 'Razorpay',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Currency Conversion Arbitrage Cycle Detection',
    scenarioDescription:
      'Detect if there exists a currency exchange rate cycle (USD -> EUR -> GBP -> USD) where multiplying exchange rates yields a profit greater than 1.0 (Arbitrage).',
    constraintsAndScale: 'N = 150 global currencies; exchange rate matrix with directed edges.',
    options: ['Bellman-Ford Algorithm with Negative Log Weights', 'Dijkstra Algorithm', 'Binary Search', 'Sliding Window'],
    correctIndex: 0,
    correctPattern: 'Bellman-Ford Algorithm (Negative Cycle Detection)',
    kapilPatternInsight:
      'Mentorship By Kapil: Taking the negative logarithm of exchange rates transforms rate multiplication into addition: -log(r1 * r2) = -log(r1) - log(r2). A profitable cycle becomes a Negative Weight Cycle detected by Bellman-Ford!',
    timeComplexity: 'O(V * E)',
    spaceComplexity: 'O(V)',
  },
  {
    id: 26,
    company: 'Microsoft Word / Excel',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Multi-Level Undo/Redo Engine',
    scenarioDescription:
      'Implement full undo and redo functionality in a collaborative document editor where edits can be reverted sequentially or re-applied until a new modification takes place.',
    constraintsAndScale: '100,000 user action steps; instant O(1) undo and redo operations.',
    options: ['Two Stacks Pattern (Undo Stack & Redo Stack)', 'Single Linked List', 'Breadth First Search', 'Binary Search'],
    correctIndex: 0,
    correctPattern: 'Two Stacks Pattern',
    kapilPatternInsight:
      'Mentorship By Kapil: On edit, push to Undo Stack and clear Redo Stack. On undo, pop from Undo Stack and push to Redo Stack. On redo, pop from Redo Stack and push to Undo Stack. Both are O(1).',
    timeComplexity: 'O(1) per undo/redo',
    spaceComplexity: 'O(N)',
  },
  {
    id: 27,
    company: 'Zomato Delivery',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'Multi-Stop Delivery Route Travelling Salesman (Small N)',
    scenarioDescription:
      'A delivery executive has to pick up and deliver food across 15 exact addresses before returning to base. Find the optimal route with the minimum total travel distance.',
    constraintsAndScale: 'N = 15 locations; N <= 20.',
    options: ['Held-Karp Bitmask Dynamic Programming', 'Dijkstra Algorithm', 'Greedy Nearest Neighbor', 'Binary Search on Answer'],
    correctIndex: 0,
    correctPattern: 'Held-Karp Bitmask DP',
    kapilPatternInsight:
      'Mentorship By Kapil: For N <= 20, brute force O(N!) factorial is too slow (15! ≈ 1.3 * 10^12). Bitmask DP state dp(mask, last_node) reduces complexity to O(2^N * N^2) ≈ 15 * 10^6 operations, passing in 0.1s.',
    timeComplexity: 'O(2^N * N^2)',
    spaceComplexity: 'O(2^N * N)',
  },
  {
    id: 28,
    company: 'Cloudflare',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'DDoS Rate Limiter with Sliding Window Counter',
    scenarioDescription:
      'Drop incoming HTTP requests from an IP if that specific IP has sent more than 100 requests in any rolling 60-second window.',
    constraintsAndScale: '1,000,000 requests per second; rolling window precision down to millisecond.',
    options: ['Sliding Window Log / Token Bucket with Deque', 'DFS Cycle Detection', 'Topological Sort', 'Merge Sort'],
    correctIndex: 0,
    correctPattern: 'Sliding Window Counter / Deque',
    kapilPatternInsight:
      'Mentorship By Kapil: Store request timestamps in a deque for each client IP. When a new request arrives at time T, purge timestamps older than T - 60 seconds. If remaining count >= 100, drop the packet.',
    timeComplexity: 'O(1) amortized per request',
    spaceComplexity: 'O(Max Requests per Window)',
  },
  {
    id: 29,
    company: 'Amazon Kindle',
    domain: 'Search & Gaming',
    scenarioTitle: 'Longest Palindromic Highlighted Quotation',
    scenarioDescription:
      'Find the longest symmetrical (palindromic) substring within a continuous text passage of length 1,000 characters.',
    constraintsAndScale: 'String length N <= 1,000 characters.',
    options: ['Expand Around Center (Two Pointers) or 2D DP', 'Binary Search on Graph', 'Trie', 'Breadth-First Search'],
    correctIndex: 0,
    correctPattern: 'Expand Around Center (Two Pointers)',
    kapilPatternInsight:
      'Mentorship By Kapil: There are 2N - 1 possible centers (single characters and gaps between characters). Expanding outward with two pointers takes O(N^2) time and O(1) auxiliary space without DP table memory overhead.',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 30,
    company: 'Flipkart Logistics',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'Connecting Remote Warehouses with Minimum Fiber Cable',
    scenarioDescription:
      'Connect N regional warehouses across India with fiber-optic cable such that all warehouses can communicate, minimizing the total cable length used.',
    constraintsAndScale: 'V = 5,000 warehouses, E = 50,000 potential cable routes with installation costs.',
    options: ["Kruskal's Algorithm with Disjoint Set Union (DSU)", 'Breadth-First Search', 'Topological Sort', 'Sliding Window'],
    correctIndex: 0,
    correctPattern: "Kruskal's Algorithm (Minimum Spanning Tree)",
    kapilPatternInsight:
      'Mentorship By Kapil: Connecting all vertices with minimum total weight without cycles is the definition of Minimum Spanning Tree (MST). Sort edges by weight and greedily union connected components using DSU in O(E log E).',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V + E)',
  },
  {
    id: 31,
    company: 'Epic Games / Unreal Engine',
    domain: 'Search & Gaming',
    scenarioTitle: '3D Spatial Collision Detection in Game Physics',
    scenarioDescription:
      'In a 3D battle royale game with 100 players and 10,000 static obstacles, detect which objects collide with a player bullet without checking all pairs every frame.',
    constraintsAndScale: '10,000 objects; 60 FPS frame rate requirement (16.6ms budget).',
    options: ['Octree / Spatial Hashing', 'Nested O(N^2) Loop', 'Bubble Sort', 'Dijkstra'],
    correctIndex: 0,
    correctPattern: 'Spatial Partitioning (Octree / BVH)',
    kapilPatternInsight:
      'Mentorship By Kapil: Spatial Partitioning recursively subdivides 3D space into octants. Queries check only objects sharing the bounding volume, reducing collision checks from O(N^2) to O(log N).',
    timeComplexity: 'O(log N) per query',
    spaceComplexity: 'O(N)',
  },
  {
    id: 32,
    company: 'Uber Eats',
    domain: 'Ride-Sharing & Mobility',
    scenarioTitle: 'Delivery Time Window Overlap Scheduling',
    scenarioDescription:
      'Given delivery windows [readyTime, dropoffDeadline] for multiple orders assigned to a rider, determine if any delivery deadline is physically impossible to meet.',
    constraintsAndScale: 'N = 100 orders per driver shift.',
    options: ['Greedy Earliest Deadline First (EDF) Sorting', 'Backtracking with 2^N states', 'Floyd-Warshall', 'Trie'],
    correctIndex: 0,
    correctPattern: 'Greedy Earliest Deadline First (EDF)',
    kapilPatternInsight:
      'Mentorship By Kapil: In single-machine real-time scheduling, the Earliest Deadline First rule is mathematically proven to minimize maximum lateness. Sort by deadline and verify cumulative execution times.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 33,
    company: 'WhatsApp / Signal',
    domain: 'Social & Messaging',
    scenarioTitle: 'Group Chat Unread Message Counter Boundary',
    scenarioDescription:
      'In a group chat with 100,000 messages, find the index of the first unread message given that all messages before it have read_status = true and all after have read_status = false.',
    constraintsAndScale: 'N = 100,000 messages; array is monotonic boolean [True, True, ..., False, False].',
    options: ['Binary Search (First False Occurrence)', 'Linear Scan', 'DFS', 'Stack'],
    correctIndex: 0,
    correctPattern: 'Binary Search (Predicate Boundary)',
    kapilPatternInsight:
      'Mentorship By Kapil: A transition from True to False in a monotonic array is the classic binary search boundary pattern. If arr[mid] is True, search right half; else record mid and search left half in O(log N).',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 34,
    company: 'Twitter / X',
    domain: 'Social & Messaging',
    scenarioTitle: 'Top Trending Hashtags in the Last Hour',
    scenarioDescription:
      'Twitter ingests 50,000 tweets per second. Continuously compute and display the top 10 trending hashtags over the sliding 60-minute window.',
    constraintsAndScale: '50,000 tweets/sec; 10 top items; rolling 1-hour window.',
    options: ['Sliding Window + Hash Map + Min-Heap of size 10', 'Full Quick Sort every second', 'Binary Search Tree', 'BFS'],
    correctIndex: 0,
    correctPattern: 'Sliding Window + Hash Map + Min-Heap',
    kapilPatternInsight:
      'Mentorship By Kapil: Maintain hashtag frequencies within the sliding time window using a Hash Map, and maintain the top 10 candidates with a Min-Heap of size K = 10.',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(Unique Hashtags)',
  },
  {
    id: 35,
    company: 'Google Photos',
    domain: 'Search & Gaming',
    scenarioTitle: 'Connected Island Counting in Image Segmentation',
    scenarioDescription:
      'Given a 2D binary grid representing pixels of foreground objects (1) and background sky (0), count the number of distinct physical objects (connected components).',
    constraintsAndScale: 'Grid size M = 2,000 x N = 2,000 pixels (4,000,000 cells).',
    options: ['Flood Fill (BFS / DFS Grid Traversal)', 'Binary Search', 'Kadane Algorithm', 'Dijkstra'],
    correctIndex: 0,
    correctPattern: 'Flood Fill (BFS / DFS)',
    kapilPatternInsight:
      'Mentorship By Kapil: Traverse the 2D grid. Whenever unvisited pixel 1 is encountered, increment island count and trigger BFS/DFS to mark all 4-directionally adjacent 1s as visited in O(M * N) time.',
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N) worst-case queue/recursion space',
  },
  {
    id: 36,
    company: 'Stripe Billing',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Subscription Tier Minimum Coin Change',
    scenarioDescription:
      'Calculate the minimum number of credit vouchers required to pay an exact subscription balance amount of ₹V, given denominations [c1, c2, c3...].',
    constraintsAndScale: 'Denominations N <= 50, Target V = 10,000.',
    options: ['Unbounded Knapsack / Dynamic Programming', 'Greedy Choice (always pick largest)', 'Binary Search', 'Sliding Window'],
    correctIndex: 0,
    correctPattern: 'Dynamic Programming (Coin Change)',
    kapilPatternInsight:
      'Mentorship By Kapil: Greedy fails for non-canonical denominations (e.g. coins [1, 3, 4] for amount 6: greedy gives 4+1+1 (3 coins), but optimal is 3+3 (2 coins)). DP table dp[amount] guarantees the true minimum.',
    timeComplexity: 'O(N * V)',
    spaceComplexity: 'O(V)',
  },
  {
    id: 37,
    company: 'Disney+ Hotstar',
    domain: 'Streaming & Media',
    scenarioTitle: 'Simultaneous Cricket Stream Peak Viewership',
    scenarioDescription:
      'During an IPL match, viewer login and logout timestamps are logged. Determine the exact peak concurrent viewers timestamp and count.',
    constraintsAndScale: 'N = 25,000,000 concurrent viewer sessions; timestamps in seconds.',
    options: ['Two Pointers on Sorted Arrival & Departure Arrays', 'Quad Tree', 'Trie', 'Floyd Cycle Detection'],
    correctIndex: 0,
    correctPattern: 'Two Pointers on Sorted Events',
    kapilPatternInsight:
      'Mentorship By Kapil: Extract logins and logouts into two sorted arrays. Advance the earlier timestamp pointer: if login <= logout, activeViewers++, advance login; else activeViewers--, advance logout.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 38,
    company: 'Atlassian Jira',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Sprint Task Circular Blocker Detection',
    scenarioDescription:
      'Detect if an agile sprint task board has a circular blocking deadlock (e.g. Task A blocks Task B, Task B blocks Task C, Task C blocks Task A).',
    constraintsAndScale: 'N = 1,000 tasks, 5,000 blocking links; directed graph.',
    options: ['DFS with 3-Coloring Cycle Detection (White, Grey, Black)', 'Kadane Algorithm', 'Binary Search', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: 'DFS Cycle Detection in Directed Graph',
    kapilPatternInsight:
      'Mentorship By Kapil: In a directed graph, a cycle exists if and only if a DFS traversal visits a node currently on the recursion call stack (Grey state in 3-color taxonomy) in O(V + E) time.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
  },
  {
    id: 39,
    company: 'Swiggy',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'Restaurant Minimum Spanning Delivery Network',
    scenarioDescription:
      'Group restaurants and delivery hubs into minimum cost interconnected road networks where adding any more roads would form a redundant cycle.',
    constraintsAndScale: 'V = 2,000 hubs, E = 20,000 roads.',
    options: ["Prim's or Kruskal's Minimum Spanning Tree", 'Topological Sort', 'Boyer-Moore', 'Suffix Tree'],
    correctIndex: 0,
    correctPattern: "Prim's / Kruskal's MST",
    kapilPatternInsight:
      'Mentorship By Kapil: For dense graphs with many edges, Prim’s Algorithm using an adjacency list and Min-Heap connects all hubs with minimal total edge weight without cycles in O(E log V).',
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V + E)',
  },
  {
    id: 40,
    company: 'MongoDB / MySQL',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'B-Tree Database Index Range Scan',
    scenarioDescription:
      'Given sorted table index leaves, execute a range query `SELECT * WHERE salary BETWEEN 50000 AND 80000` in logarithmic seek time followed by sequential traversal.',
    constraintsAndScale: '100,000,000 records on disk; return results in order.',
    options: ['B+ Tree Index Traversal (Binary Search to Lower Bound + Linked Leaf Scan)', 'Hash Index with Full Scan', 'DFS', 'Stack'],
    correctIndex: 0,
    correctPattern: 'B+ Tree Lower Bound Binary Search',
    kapilPatternInsight:
      'Mentorship By Kapil: B+ trees store all data in linked leaf nodes. Binary search finds the lower bound (salary >= 50000) in O(log N) disk reads, then scans the linked leaf chain until salary > 80000.',
    timeComplexity: 'O(log N + K)',
    spaceComplexity: 'O(1) auxiliary',
  },
  {
    id: 41,
    company: 'Google Chrome',
    domain: 'Search & Gaming',
    scenarioTitle: 'Tab Navigation History (Back & Forward Buttons)',
    scenarioDescription:
      'Implement the browser navigation bar: clicking a new link clears forward history, "Back" moves to previous page, and "Forward" restores the navigated page.',
    constraintsAndScale: 'Continuous user browsing; instant O(1) page state transitions.',
    options: ['Two Stacks (Back Stack & Forward Stack)', 'Queue', 'Binary Search Tree', 'Hash Map'],
    correctIndex: 0,
    correctPattern: 'Two Stacks Pattern',
    kapilPatternInsight:
      'Mentorship By Kapil: Standard web browser architecture: navigating pushes current page to Back Stack. Clicking Back pops from Back Stack and pushes to Forward Stack. Visiting a new link clears the Forward Stack.',
    timeComplexity: 'O(1) per navigation action',
    spaceComplexity: 'O(Number of visited pages)',
  },
  {
    id: 42,
    company: 'Oracle / PostgreSQL',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Deadlock Detection in Transaction Lock Wait-For Graph',
    scenarioDescription:
      'Database engine monitors transactions holding locks on rows. If Transaction T1 waits for T2, and T2 waits for T1, detect and abort the cycle immediately.',
    constraintsAndScale: 'Directed Lock-Wait Graph with V <= 10,000 transactions.',
    options: ['Cycle Detection in Directed Graph (DFS / Tarjan)', 'Dijkstra Algorithm', 'Binary Search', 'Sliding Window'],
    correctIndex: 0,
    correctPattern: 'Cycle Detection in Directed Graph',
    kapilPatternInsight:
      'Mentorship By Kapil: In database transaction management, a deadlock occurs if and only if the wait-for graph contains a directed cycle. Running cycle-detection DFS identifies deadlock in O(V + E).',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
  },
  {
    id: 43,
    company: 'Amazon Web Services (AWS)',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Auto-Scaling Server Cluster Minimum Cost Capacity',
    scenarioDescription:
      'AWS EC2 needs to provision virtual servers across N instance types to satisfy CPU and memory requirements while minimizing total hourly hosting cost.',
    constraintsAndScale: 'N = 50 instance types; multiple resource constraints (CPU, RAM, Network).',
    options: ['Multi-Dimensional Dynamic Programming / Integer Linear Programming', 'Simple Array Sort', 'Two Pointers', 'Queue'],
    correctIndex: 0,
    correctPattern: 'Multi-Dimensional Dynamic Programming',
    kapilPatternInsight:
      'Mentorship By Kapil: Multi-constraint capacity packing is Multi-Dimensional Knapsack DP where the state dp[i][cpu][ram] tracks the minimum cost achievable across multiple resource dimensions.',
    timeComplexity: 'O(N * CPU * RAM)',
    spaceComplexity: 'O(CPU * RAM)',
  },
  {
    id: 44,
    company: 'Ola Cabs',
    domain: 'Ride-Sharing & Mobility',
    scenarioTitle: 'Driver Route Carpooling Feasibility',
    scenarioDescription:
      'A driver with vehicle capacity C accepts multiple ride requests with pickup and dropoff points [numPassengers, from, to]. Verify if at any point the number of passengers exceeds car capacity.',
    constraintsAndScale: 'N = 10,000 trips; locations between 0 and 1,000.',
    options: ['Difference Array / Prefix Sum Array', 'Depth First Search', 'Binary Search on Graph', 'Bitwise Shift'],
    correctIndex: 0,
    correctPattern: 'Difference Array / Event Sweeping',
    kapilPatternInsight:
      'Mentorship By Kapil: Instead of iterating through every kilometer of the trip, increment passengers at `from` index and decrement at `to` index in a Difference Array. Cumulative prefix sum gives occupancy at every point in O(N).',
    timeComplexity: 'O(N + MaxLocation)',
    spaceComplexity: 'O(MaxLocation)',
  },
  {
    id: 45,
    company: 'Flipkart Logistics',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'Delivery Truck Optimal Parcel Height Stacking',
    scenarioDescription:
      'Stack rectangular boxes [w, d, h] in a truck bed such that each box is strictly smaller in both width and depth than the box beneath it, maximizing total stacked height.',
    constraintsAndScale: 'N = 500 boxes; rotations allowed; find maximum total height.',
    options: ['Longest Increasing Subsequence (LIS) Dynamic Programming', 'Binary Search Tree', 'Two Pointers', 'Sliding Window'],
    correctIndex: 0,
    correctPattern: 'Longest Increasing Subsequence (LIS) DP',
    kapilPatternInsight:
      'Mentorship By Kapil: Generating all 3 orientations for each box and sorting by base area transforms box stacking into a 2D Longest Increasing Subsequence problem solvable in O(N^2) dynamic programming.',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 46,
    company: 'TCS / Infosys',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Bank Account Balance Transaction Anomaly (Majority Vote)',
    scenarioDescription:
      'In a database of 10,000,000 transactions, determine if a single merchant ID accounts for strictly MORE than 50% of all transactions (Majority Element) using O(1) extra memory.',
    constraintsAndScale: 'N = 10,000,000 records; O(1) auxiliary space strictly required.',
    options: ['Boyer-Moore Voting Algorithm', 'Hash Map with Frequencies', 'Merge Sort', 'Binary Search Tree'],
    correctIndex: 0,
    correctPattern: 'Boyer-Moore Voting Algorithm',
    kapilPatternInsight:
      'Mentorship By Kapil: A Hash Map requires O(N) space, violating constraints. Boyer-Moore cancels out non-matching candidates with a single counter variable in O(N) time and strictly O(1) memory.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 47,
    company: 'Slack / Microsoft Teams',
    domain: 'Social & Messaging',
    scenarioTitle: 'Real-Time Channel Activity Ranking',
    scenarioDescription:
      'Track 50,000 Slack channels and maintain the top 20 most active channels by message count in real-time as messages stream in continuously.',
    constraintsAndScale: '50,000 channels, 10,000 messages/sec; top K = 20 channels.',
    options: ['Min-Heap of size K + Hash Map for channel counters', 'Full array sort every second', 'BFS', 'DFS'],
    correctIndex: 0,
    correctPattern: 'Min-Heap of size K + Hash Map',
    kapilPatternInsight:
      'Mentorship By Kapil: A Hash Map stores live frequency counters, while a Min-Heap of size 20 tracks the top threshold. New message events update the heap in O(log 20) = O(1) time.',
    timeComplexity: 'O(log K) per message',
    spaceComplexity: 'O(Total Channels)',
  },
  {
    id: 48,
    company: 'Uber',
    domain: 'Ride-Sharing & Mobility',
    scenarioTitle: 'Surge Pricing Regional Clustering',
    scenarioDescription:
      'Partition city ride pickup coordinates into dynamic geographic clusters where any two points within 2 km belong to the same pricing zone.',
    constraintsAndScale: 'N = 20,000 pickup locations.',
    options: ['Disjoint Set Union (DSU / Kruskal clustering)', 'Binary Search', 'Sliding Window', 'Topological Sort'],
    correctIndex: 0,
    correctPattern: 'Disjoint Set Union (DSU)',
    kapilPatternInsight:
      'Mentorship By Kapil: Dynamic geographic clustering based on proximity distance threshold is modeled as edge connections between points within 2 km. DSU unions connected components in near-linear time.',
    timeComplexity: 'O(E * alpha(V))',
    spaceComplexity: 'O(V)',
  },
  {
    id: 49,
    company: 'YouTube',
    domain: 'Streaming & Media',
    scenarioTitle: 'Video Comment Thread Hierarchy Tree Traversal',
    scenarioDescription:
      'Render nested comment replies under a viral YouTube video (Root Comment -> Reply -> Sub-reply) in hierarchical tree display order.',
    constraintsAndScale: '10,000 nested comments per video; arbitrary nesting depth.',
    options: ['Tree DFS (Pre-Order Traversal with Depth Tracking)', 'Breadth First Search', 'Binary Search', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: 'Tree DFS (Pre-Order Traversal)',
    kapilPatternInsight:
      'Mentorship By Kapil: Hierarchical rendering requires visiting a parent comment immediately followed by its complete sub-reply subtree. Depth-First Pre-Order traversal is the exact pattern for nested UI trees.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(Maximum Nesting Depth)',
  },
  {
    id: 50,
    company: 'Amazon DynamoDB',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Distributed Key-Value Range Sum Queries with Live Updates',
    scenarioDescription:
      'A distributed ledger needs to update account balances and immediately compute sum of balances in arbitrary account number ranges [L, R] in logarithmic time.',
    constraintsAndScale: 'N = 500,000 accounts; 1,000,000 updates and range sum queries interleaved.',
    options: ['Segment Tree or Binary Indexed Tree (Fenwick Tree)', 'Static Prefix Sum Array', 'Linear Array', 'Queue'],
    correctIndex: 0,
    correctPattern: 'Segment Tree / Fenwick Tree',
    kapilPatternInsight:
      'Mentorship By Kapil: A static Prefix Sum array allows O(1) query but requires O(N) to update on every mutation. A Fenwick / Segment Tree achieves both O(log N) updates and O(log N) range sum queries simultaneously!',
    timeComplexity: 'O(log N) per update and query',
    spaceComplexity: 'O(N)',
  },
  {
    id: 51,
    company: 'Netflix',
    domain: 'Streaming & Media',
    scenarioTitle: 'Content Recommendation User Taste Similarity',
    scenarioDescription:
      'Given two users’ movie rating vectors containing movie IDs and ratings, calculate the Cosine Similarity between their shared movie preferences.',
    constraintsAndScale: 'User rating lists are pre-sorted by movie ID; length up to 50,000 movies.',
    options: ['Two Pointers on Sorted Arrays', '0/1 Knapsack', 'Bellman-Ford', 'Disjoint Set Union'],
    correctIndex: 0,
    correctPattern: 'Two Pointers (Merge Intersection)',
    kapilPatternInsight:
      'Mentorship By Kapil: Because movie ID lists are sorted, use two pointers (ptrA, ptrB) to advance and find common movie IDs in single O(M + N) pass without extra hash set allocations.',
    timeComplexity: 'O(M + N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 52,
    company: 'Swiggy',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'Bipartite Delivery Partner Order Assignment',
    scenarioDescription:
      'Assign N delivery partners to N ready restaurant orders such that every partner gets at most one order and compatibility preferences (distance, vehicle type) are maximized.',
    constraintsAndScale: 'N = 300 partners, N = 300 orders.',
    options: ['Max Bipartite Matching (Hopcroft-Karp / Dinic Network Flow)', 'Binary Search', 'Sliding Window', 'Monotonic Stack'],
    correctIndex: 0,
    correctPattern: 'Maximum Bipartite Matching',
    kapilPatternInsight:
      'Mentorship By Kapil: Matching two disjoint sets (riders and orders) with 1-to-1 constraints is a classic Bipartite Matching problem solved via Hopcroft-Karp in O(E * sqrt(V)) or Dinic Network Flow.',
    timeComplexity: 'O(E * sqrt(V))',
    spaceComplexity: 'O(V + E)',
  },
  {
    id: 53,
    company: 'Google Sheets',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Cell Formula Evaluation Dependency Order',
    scenarioDescription:
      'Evaluate formula cells in a spreadsheet where cell C1 depends on B1, and B1 depends on A1. Compute cells in proper order or flag cyclic reference error.',
    constraintsAndScale: '100,000 formula cells with directed dependency edges.',
    options: ["Topological Sort (Kahn's Algorithm)", 'Dijkstra', 'Kadane Algorithm', 'Boyer-Moore'],
    correctIndex: 0,
    correctPattern: "Topological Sort",
    kapilPatternInsight:
      'Mentorship By Kapil: A spreadsheet formula engine is a Directed Acyclic Graph of dependencies. Topological sorting guarantees that every prerequisite cell is evaluated before any dependent formula.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
  },
  {
    id: 54,
    company: 'Stripe',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Credit Card Luhn Algorithm Validation',
    scenarioDescription:
      'Validate if a 16-digit credit card number is structurally valid by doubling every second digit from right to left and checking if total sum is divisible by 10.',
    constraintsAndScale: '16-digit number string; must validate in O(1) time.',
    options: ['Single-Pass Digit Simulation (Two Pointers / Modulo Math)', 'Dynamic Programming', 'Trie', 'Graph DFS'],
    correctIndex: 0,
    correctPattern: 'Mathematical Digit Simulation',
    kapilPatternInsight:
      'Mentorship By Kapil: Luhn formula requires single right-to-left scan of 16 digits, doubling alternating digits and summing. Runs in strict O(1) time and space.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 55,
    company: 'Microsoft Teams',
    domain: 'Social & Messaging',
    scenarioTitle: 'Meeting Room Booking Collision Detection',
    scenarioDescription:
      'Given a new meeting request [newStart, newEnd] and a list of existing bookings in a conference room, determine in O(log N) time if the new meeting conflicts with any existing booking.',
    constraintsAndScale: 'N = 100,000 existing booked meetings.',
    options: ['Binary Search Tree / TreeMap Floor and Ceiling Queries', 'Linear Scan O(N)', 'BFS', 'Kadane'],
    correctIndex: 0,
    correctPattern: 'Self-Balancing BST (Floor & Ceiling)',
    kapilPatternInsight:
      'Mentorship By Kapil: A TreeMap / Red-Black Tree allows querying `floorEntry(newStart)` and `ceilingEntry(newStart)` in O(log N) time to check if adjacent intervals overlap.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 56,
    company: 'Amazon',
    domain: 'E-Commerce',
    scenarioTitle: 'Customer Review Sentiment Keyword Inversion Count',
    scenarioDescription:
      'Measure how disordered an array of customer review rankings is by counting the number of pairs (i, j) such that i < j and rating[i] > rating[j] (Inversion Count).',
    constraintsAndScale: 'N = 100,000 rankings; O(N^2) too slow.',
    options: ['Modified Merge Sort (Divide and Conquer)', 'Bubble Sort', 'Breadth-First Search', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: 'Modified Merge Sort (Divide & Conquer)',
    kapilPatternInsight:
      'Mentorship By Kapil: During the merge step of Merge Sort, if arr[left] > arr[right], all remaining elements in the left subarray also invert with arr[right]. Count inversions in O(N log N) time.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 57,
    company: 'Meta',
    domain: 'Social & Messaging',
    scenarioTitle: 'Facebook Friend Recommendation (Triadic Closure)',
    scenarioDescription:
      'Find people who share the maximum number of mutual friends with a target user (Friends of Friends who are not already direct friends).',
    constraintsAndScale: 'Social graph with 1,000,000 nodes; degree per node <= 500.',
    options: ['Graph Breadth First Search (2-Hop Neighborhood Counting)', 'Dijkstra Shortest Path', 'Binary Search', 'Knapsack'],
    correctIndex: 0,
    correctPattern: 'BFS (2-Hop Neighborhood)',
    kapilPatternInsight:
      'Mentorship By Kapil: Traverse all direct friends of user U (distance 1), then gather their friends (distance 2). Use a frequency hash map to rank 2-hop contacts by mutual friend count.',
    timeComplexity: 'O(Degree(U) * AvgDegree)',
    spaceComplexity: 'O(V)',
  },
  {
    id: 58,
    company: 'Uber',
    domain: 'Ride-Sharing & Mobility',
    scenarioTitle: 'Gas Station Fuel Refill along a Circular Highway',
    scenarioDescription:
      'There are N gas stations on a circular route. gas[i] is fuel at station i, and cost[i] is fuel needed to reach station i + 1. Find the starting station index to complete the full circuit, or -1 if impossible.',
    constraintsAndScale: 'N = 100,000 gas stations; O(N) time required.',
    options: ["Greedy Single Pass (Kadane-like Deficit Tracking)", 'Nested O(N^2) Loop', 'Binary Search', 'Trie'],
    correctIndex: 0,
    correctPattern: 'Greedy Deficit Tracking',
    kapilPatternInsight:
      'Mentorship By Kapil: If total gas < total cost, completion is mathematically impossible. Otherwise, if current tank becomes negative starting from station S at index i, reset starting station to i + 1 in a single O(N) pass.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 59,
    company: 'Twitter / X',
    domain: 'Social & Messaging',
    scenarioTitle: 'Longest Consecutive Tweet Streak Sequence',
    scenarioDescription:
      'Given an unsorted array of daily active streak day IDs (e.g. [100, 4, 200, 1, 3, 2]), find the length of the longest consecutive elements sequence in O(N) time.',
    constraintsAndScale: 'N = 100,000 IDs; must run in strictly O(N) time (sorting is disallowed).',
    options: ['Hash Set with Streak Start Detection', 'Merge Sort', 'Binary Search Tree', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: 'Hash Set Lookup',
    kapilPatternInsight:
      'Mentorship By Kapil: Insert all numbers into a Hash Set. Only start counting a streak if `num - 1` is NOT in the set (guaranteeing `num` is the true beginning of a streak). Each number is visited twice: O(N) total!',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 60,
    company: 'Apple / Google Maps',
    domain: 'Ride-Sharing & Mobility',
    scenarioTitle: 'Shortest Path in Unweighted Subway Transit Network',
    scenarioDescription:
      'Find the minimum number of train transfers between two metro stations in a city subway map with 500 stations and 2,000 track connections.',
    constraintsAndScale: 'Unweighted network; must return minimum station hops.',
    options: ['Breadth First Search (BFS)', 'Bellman-Ford', 'Prim MST', 'Topological Sort'],
    correctIndex: 0,
    correctPattern: 'Breadth First Search (BFS)',
    kapilPatternInsight:
      'Mentorship By Kapil: Since all train tracks between adjacent stations carry uniform weight (1 hop), BFS guarantees discovering the shortest path level by level in O(V + E) time.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
  },
  {
    id: 61,
    company: 'Amazon Web Services',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Distributed Task Parallel Execution Bottleneck (Critical Path)',
    scenarioDescription:
      'AWS Step Functions executes complex workflows of dependent tasks with durations. Find the minimum time to complete all tasks, determined by the longest path through the workflow DAG (Critical Path Method).',
    constraintsAndScale: 'DAG with 10,000 tasks and durations.',
    options: ['Topological Sort + DP on DAG (Longest Path)', 'Dijkstra Shortest Path', 'Binary Search', 'Sliding Window'],
    correctIndex: 0,
    correctPattern: 'Topological Sort + DP on DAG',
    kapilPatternInsight:
      'Mentorship By Kapil: In a DAG, longest path (Critical Path) can be found in O(V + E) time by relaxing edges in topological order: `dist[v] = max(dist[v], dist[u] + duration[v])`.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
  },
  {
    id: 62,
    company: 'Spotify',
    domain: 'Streaming & Media',
    scenarioTitle: 'Kth Smallest Element in a Matrix of Audio Bitrates',
    scenarioDescription:
      'Given an N x N matrix where each row and column is sorted in ascending order of bitrate qualities, find the K-th smallest element without flattening and sorting.',
    constraintsAndScale: 'N = 1,000 (1,000,000 elements), K <= 10^6.',
    options: ['Binary Search on Value Range or Min-Heap of size N', 'Quick Sort', 'DFS', 'Stack'],
    correctIndex: 0,
    correctPattern: 'Binary Search on Value Range',
    kapilPatternInsight:
      'Mentorship By Kapil: Binary search the value range [matrix[0][0], matrix[N-1][N-1]]. For candidate mid, count elements <= mid in O(N) using two pointers from top-right to bottom-left. Total: O(N log(max - min)).',
    timeComplexity: 'O(N log(max - min))',
    spaceComplexity: 'O(1)',
  },
  {
    id: 63,
    company: 'Zomato',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'Delivery Rider Battery Hot-Swapping Stations',
    scenarioDescription:
      'Electric delivery riders have battery range R. Determine if a rider can travel from Hub A to Hub B by hopping across battery swapping stations situated along the highway.',
    constraintsAndScale: 'N = 50,000 stations sorted along highway; range R.',
    options: ['Greedy Range Jump / BFS', 'Binary Search Tree', '0/1 Knapsack', 'Trie'],
    correctIndex: 0,
    correctPattern: 'Greedy Range Jump',
    kapilPatternInsight:
      'Mentorship By Kapil: At current station, greedily jump to the farthest station within range R. If no station is reachable, destination cannot be reached. Solves in linear O(N) time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 64,
    company: 'LinkedIn',
    domain: 'Social & Messaging',
    scenarioTitle: 'Alumni Network Shared College Group Connectivity',
    scenarioDescription:
      'Given pairs of alumni who graduated from the same university, determine the total number of disconnected alumni communities across India.',
    constraintsAndScale: 'N = 100,000 alumni, 300,000 shared graduation links.',
    options: ['Disjoint Set Union (DSU) or Connected Components via BFS/DFS', 'Binary Search', 'Sliding Window', 'Kadane'],
    correctIndex: 0,
    correctPattern: 'Connected Components (DSU / BFS)',
    kapilPatternInsight:
      'Mentorship By Kapil: Count the number of disjoint sets after unioning all shared college edges, or count how many BFS/DFS launches are required to visit all unvisited nodes in O(V + E).',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
  },
  {
    id: 65,
    company: 'Flipkart',
    domain: 'E-Commerce',
    scenarioTitle: 'Discount Coupon Code Permutations Generator',
    scenarioDescription:
      'Generate all distinct 4-letter promo codes that can be formed from a set of characters containing duplicates (e.g. "AABBC") without generating duplicate codes.',
    constraintsAndScale: 'String length N <= 8.',
    options: ['Backtracking with Duplicate Pruning (Sort + Skip Adjacent)', 'BFS', 'Sliding Window', 'Binary Search'],
    correctIndex: 0,
    correctPattern: 'Backtracking with Pruning',
    kapilPatternInsight:
      'Mentorship By Kapil: Sort characters first. In recursive backtracking, if character `chars[i] == chars[i-1]` and `chars[i-1]` was not used in current branch, prune the branch to eliminate duplicate permutations.',
    timeComplexity: 'O(N! / duplicates)',
    spaceComplexity: 'O(N) recursion stack',
  },
  {
    id: 66,
    company: 'Google Docs',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Document Revision Diff / Longest Common Subsequence',
    scenarioDescription:
      'Compare two versions of a document to find the minimum insertions and deletions needed to transform Version 1 into Version 2 (Git Diff / Google Docs version history).',
    constraintsAndScale: 'Version 1 length M = 1,000 lines, Version 2 length N = 1,000 lines.',
    options: ['Longest Common Subsequence (LCS) Dynamic Programming', 'Binary Search', 'Trie', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: 'Longest Common Subsequence (LCS) DP',
    kapilPatternInsight:
      'Mentorship By Kapil: The diff algorithm finds the Longest Common Subsequence (LCS) between two texts using a 2D dynamic programming grid in O(M * N) time, then formats unchanged vs added lines.',
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N) or O(min(M, N))',
  },
  {
    id: 67,
    company: 'Stripe',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Foreign Exchange Rate Multi-Hop Lowest Fee Path',
    scenarioDescription:
      'Calculate the cheapest currency conversion fee from Currency A to B through intermediate banks with non-negative conversion fee percentages.',
    constraintsAndScale: '100 currencies, 1,000 conversion corridors; non-negative fees.',
    options: ["Dijkstra's Shortest Path Algorithm", 'Depth First Search', 'Topological Sort', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: "Dijkstra's Algorithm",
    kapilPatternInsight:
      'Mentorship By Kapil: For non-negative transition fees, Dijkstra explores the path of lowest cumulative fee greedily using a Min-Heap in O((V + E) log V).',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V + E)',
  },
  {
    id: 68,
    company: 'Amazon Fresh',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'Rotten Oranges Freshness Decay Simulation',
    scenarioDescription:
      'A crate contains fresh oranges (1) and rotten oranges (2). Every minute, any fresh orange 4-directionally adjacent to a rotten orange becomes rotten. Determine minutes until no fresh orange remains, or -1 if impossible.',
    constraintsAndScale: 'Grid dimensions M = 500, N = 500.',
    options: ['Multi-Source Breadth First Search (BFS)', 'Depth First Search', 'Binary Search', 'Kadane'],
    correctIndex: 0,
    correctPattern: 'Multi-Source BFS',
    kapilPatternInsight:
      'Mentorship By Kapil: Multiple rotten oranges rot their neighbors concurrently. Initialize the BFS queue with ALL rotten orange coordinates at minute 0 (Multi-Source BFS) and advance minute-by-minute in O(M * N).',
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
  },
  {
    id: 69,
    company: 'Netflix',
    domain: 'Streaming & Media',
    scenarioTitle: 'Video Playback Speed Histogram Largest Rectangular Viewing Area',
    scenarioDescription:
      'Given an array representing consecutive bar heights in a bandwidth histogram, find the area of the largest rectangular viewing window that fits beneath the histogram bars.',
    constraintsAndScale: 'N = 100,000 bars; bar heights up to 10^5.',
    options: ['Monotonic Stack', 'Two Pointers', 'Binary Search Tree', '0/1 Knapsack'],
    correctIndex: 0,
    correctPattern: 'Monotonic Stack',
    kapilPatternInsight:
      'Mentorship By Kapil: For each bar, find the first smaller bar to its left and right using a Monotonic Increasing Stack. The rectangle height is `height[i]` and width is `rightSmaller - leftSmaller - 1` in O(N) time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 70,
    company: 'Meta / Instagram',
    domain: 'Social & Messaging',
    scenarioTitle: 'Hashtag Search Prefix Autocomplete with Frequency Rank',
    scenarioDescription:
      'Store 1,000,000 Instagram hashtags and their usage counts. When a user types "#sum...", return top 5 hashtags sorted by popularity.',
    constraintsAndScale: '1,000,000 hashtags; query prefix length <= 10; sub-5ms response.',
    options: ['Trie with Top-K Heap stored at each node', 'Linear Array Search', 'Floyd-Warshall', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: 'Trie with Top-K Node Cache',
    kapilPatternInsight:
      'Mentorship By Kapil: Enhance standard Trie nodes to store a list/heap of top K most frequent words passing through that node. Looking up prefix P takes O(|P|) time, instantly yielding the top K words without subtree traversal.',
    timeComplexity: 'O(|P|)',
    spaceComplexity: 'O(Total Characters * K)',
  },
  {
    id: 71,
    company: 'Google Maps',
    domain: 'Ride-Sharing & Mobility',
    scenarioTitle: 'Bridge and Bottleneck Road Identification in Transit Network',
    scenarioDescription:
      'Identify critical roads in a city graph whose closure or traffic block would completely disconnect one section of the city from another (Bridges / Cut-Edges).',
    constraintsAndScale: 'V = 50,000 intersections, E = 150,000 roads; undirected graph.',
    options: ["Tarjan's Bridge-Finding Algorithm (DFS Low-Link Values)", 'Dijkstra Algorithm', 'Binary Search', 'Sliding Window'],
    correctIndex: 0,
    correctPattern: "Tarjan's Bridge Algorithm",
    kapilPatternInsight:
      'Mentorship By Kapil: Maintain discovery times `disc[u]` and lowest reachable ancestors `low[u]` during DFS. An edge (u, v) is a bridge if and only if `low[v] > disc[u]`, computed in single O(V + E) pass.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
  },
  {
    id: 72,
    company: 'Uber',
    domain: 'Ride-Sharing & Mobility',
    scenarioTitle: 'Minimum Fare Path with At Most K Stops',
    scenarioDescription:
      'Find the cheapest flight/ride from City A to City B with a maximum limit of K intermediate stops/layovers.',
    constraintsAndScale: 'N = 100 cities, K <= 100 stops; edge weights are fares.',
    options: ['Bellman-Ford / BFS with K Step Relaxation', 'Pure Dijkstra without step limit', 'Prim MST', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: 'Bellman-Ford (K Iterations)',
    kapilPatternInsight:
      'Mentorship By Kapil: Standard Dijkstra does not restrict the number of hops. Running Bellman-Ford for exactly K + 1 iterations guarantees that paths use at most K intermediate stops in O(K * E) time.',
    timeComplexity: 'O(K * E)',
    spaceComplexity: 'O(V)',
  },
  {
    id: 73,
    company: 'Flipkart',
    domain: 'E-Commerce',
    scenarioTitle: 'Customer Cart Two-Item Match for Free Shipping Threshold',
    scenarioDescription:
      'A customer has an order and needs to pick exactly two items from a sorted catalog of prices to make the cart total reach exactly ₹999 for free shipping.',
    constraintsAndScale: 'N = 100,000 sorted item prices; exact pair required in O(N) time and O(1) space.',
    options: ['Two Pointers (Opposite Boundaries Squeeze)', 'Binary Search Tree', '0/1 Knapsack', 'BFS'],
    correctIndex: 0,
    correctPattern: 'Two Pointers (Sorted)',
    kapilPatternInsight:
      'Mentorship By Kapil: Since the catalog is pre-sorted, place `left` at 0 and `right` at N - 1. If sum < 999, left++; if sum > 999, right--; if sum == 999, pair found! Runs in O(N) time and O(1) space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 74,
    company: 'Bloomberg',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Best Time to Buy and Sell Stock with Cooldown',
    scenarioDescription:
      'Given daily stock prices, maximize total trading profit with unlimited transactions, but after selling stock, you must rest for 1 day cooldown before buying again.',
    constraintsAndScale: 'N = 50,000 days; state machine transitions.',
    options: ['State Machine Dynamic Programming (Hold, Sold, Rest)', 'Greedy Kadane', 'Binary Search', 'Sliding Window'],
    correctIndex: 0,
    correctPattern: 'State Machine Dynamic Programming',
    kapilPatternInsight:
      'Mentorship By Kapil: Model three states at day i: Hold (owning stock), Sold (just sold today), and Rest (cooldown/empty). Transitions between states determine maximum profit in O(N) time and O(1) space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 75,
    company: 'Google Cloud Platform (GCP)',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Server Log Anomaly Detection in Sliding Window of 10 Minutes',
    scenarioDescription:
      'Detect if error rate in web server access logs exceeds threshold in any moving 10-minute window over a 24-hour log file.',
    constraintsAndScale: '50,000,000 log events with timestamps.',
    options: ['Sliding Window with Two Pointers', 'Recursive Backtracking', 'Floyd-Warshall', 'Trie'],
    correctIndex: 0,
    correctPattern: 'Sliding Window',
    kapilPatternInsight:
      'Mentorship By Kapil: Timestamps in log files arrive in monotonically non-decreasing order. Two pointers (windowStart, windowEnd) compute error counts across the 10-minute interval in single O(N) pass.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 76,
    company: 'Amazon Pay',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Coin Change Combination Ways Count',
    scenarioDescription:
      'Find the total number of distinct ways to pay an amount of ₹N using unlimited coins of given denominations [1, 2, 5].',
    constraintsAndScale: 'Amount N = 5,000, Denominations length <= 50.',
    options: ['Unbounded Knapsack DP (Ways Combination)', '0/1 Knapsack', 'Two Pointers', 'Binary Search'],
    correctIndex: 0,
    correctPattern: 'Unbounded Knapsack DP',
    kapilPatternInsight:
      'Mentorship By Kapil: Outer loop over coins and inner loop over amounts from coin to N: `dp[a] += dp[a - coin]`. Looping coins on the outside guarantees combinations are counted without permutation duplicates!',
    timeComplexity: 'O(Coins * N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 77,
    company: 'Zomato',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'K Closest Restaurants to Delivery Location',
    scenarioDescription:
      'Given delivery latitude and longitude, retrieve the top K closest restaurants from an unsorted list of N partner restaurants.',
    constraintsAndScale: 'N = 100,000 restaurants, K = 10; response in under 5ms.',
    options: ['Max-Heap of size K or QuickSelect O(N)', 'Bubble Sort', 'Floyd-Warshall', 'Trie'],
    correctIndex: 0,
    correctPattern: 'Max-Heap of size K',
    kapilPatternInsight:
      'Mentorship By Kapil: Maintain a Max-Heap of size K containing the closest restaurants seen so far. If a new restaurant is closer than the heap root, pop root and push new restaurant in O(log K).',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
  },
  {
    id: 78,
    company: 'Microsoft Teams',
    domain: 'Social & Messaging',
    scenarioTitle: 'Chat Transcript Word Frequency Top K Words',
    scenarioDescription:
      'Given a meeting transcript of 100,000 words, return the K most frequently spoken words sorted by frequency descending, then alphabetically.',
    constraintsAndScale: 'N = 100,000 words, K = 20.',
    options: ['Hash Map + Min-Heap of size K with Custom Comparator', 'Selection Sort', 'DFS', 'Binary Search'],
    correctIndex: 0,
    correctPattern: 'Hash Map + Min-Heap of size K',
    kapilPatternInsight:
      'Mentorship By Kapil: Count frequencies with a Hash Map in O(N). Insert into a Min-Heap of size K with comparator checking frequency then reverse alphabetical order in O(N log K).',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(Unique Words)',
  },
  {
    id: 79,
    company: 'Cloudflare',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'DNS Cache with TTL (Time To Live) Expiry',
    scenarioDescription:
      'Implement a DNS cache storing domain-to-IP mappings where each entry expires after TTL seconds. Querying must return IP if not expired, else -1 in O(1) time.',
    constraintsAndScale: '10,000,000 DNS lookups per day; instant O(1) lookup.',
    options: ['Hash Map with Timestamp Validation + Priority Queue for cleanup', 'Graph DFS', 'Kadane', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: 'Hash Map with Timestamp Expiration',
    kapilPatternInsight:
      'Mentorship By Kapil: Store `(value, expiryTimestamp)` in a Hash Map. On get(key), check if `currentTime < expiryTimestamp` in O(1). Periodically clean expired keys with a Min-Heap sorted by expiry.',
    timeComplexity: 'O(1) get/set',
    spaceComplexity: 'O(Active Keys)',
  },
  {
    id: 80,
    company: 'Apple / Shazam',
    domain: 'Streaming & Media',
    scenarioTitle: 'Audio Fingerprint Bitwise Hamming Distance Match',
    scenarioDescription:
      'Shazam converts 10-second song clips into 64-bit integer hashes. Compare a query audio hash with millions of catalog song hashes to find the match with minimum bit differences (Hamming Distance).',
    constraintsAndScale: '64-bit hashes; calculate number of differing bits in O(1) time per song.',
    options: ["Bitwise XOR + Brian Kernighan's Bit Count (__builtin_popcountll)", 'Merge Sort', 'Binary Search Tree', 'BFS'],
    correctIndex: 0,
    correctPattern: "Bitwise XOR + Popcount",
    kapilPatternInsight:
      'Mentorship By Kapil: `hashA ^ hashB` sets bits to 1 where the two hashes differ. Calling CPU intrinsic popcount computes differing bits in a single CPU instruction clock cycle!',
    timeComplexity: 'O(1) per comparison',
    spaceComplexity: 'O(1)',
  },
  {
    id: 81,
    company: 'Meta / WhatsApp',
    domain: 'Social & Messaging',
    scenarioTitle: 'Longest Substring Without Repeating Characters in Status Message',
    scenarioDescription:
      'Find the length of the longest contiguous segment of characters in a string that contains zero repeating characters.',
    constraintsAndScale: 'String length N <= 10^5.',
    options: ['Sliding Window with Character Index Hash Map', 'Recursion Tree', 'Binary Search on Answer', 'Topological Sort'],
    correctIndex: 0,
    correctPattern: 'Sliding Window (Dynamic Window)',
    kapilPatternInsight:
      'Mentorship By Kapil: Track the last seen index of each character. When character `s[right]` is seen inside the current window, immediately advance `left = max(left, lastSeen[char] + 1)` in O(N) time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(Alphabet Size) ≈ O(1)',
  },
  {
    id: 82,
    company: 'Uber',
    domain: 'Ride-Sharing & Mobility',
    scenarioTitle: 'Rider Pickup Order Assignment with Minimum Wait Variance',
    scenarioDescription:
      'Partition N waiting riders among K identical shuttles such that the maximum waiting time assigned to any shuttle is minimized.',
    constraintsAndScale: 'N = 10,000 riders, K = 500 shuttles; contiguous allocation.',
    options: ['Binary Search on Answer Space', 'Floyd-Warshall', 'Trie', 'Sliding Window'],
    correctIndex: 0,
    correctPattern: 'Binary Search on Answer Space',
    kapilPatternInsight:
      'Mentorship By Kapil: Another variant of the Book Allocation / Capacity Partition problem: Binary search the maximum load capacity range and greedily verify shuttle counts in O(N log(Range)).',
    timeComplexity: 'O(N log(Range))',
    spaceComplexity: 'O(1)',
  },
  {
    id: 83,
    company: 'Stripe',
    domain: 'Fintech & Trading',
    scenarioTitle: 'High-Volume Transaction Idempotency Filter (Bloom Filter)',
    scenarioDescription:
      'Stripe needs to quickly reject duplicate payment requests in high-throughput APIs without querying the central database for every request.',
    constraintsAndScale: '100,000,000 requests per day; memory constraint: 100MB RAM.',
    options: ['Bloom Filter (Bit Array + K Independent Hash Functions)', 'In-Memory HashMap with all string IDs', 'Quick Sort', 'DFS'],
    correctIndex: 0,
    correctPattern: 'Bloom Filter (Probabilistic Data Structure)',
    kapilPatternInsight:
      'Mentorship By Kapil: A Bloom filter uses a bit array and K hash functions. It can conclusively guarantee that an item is NOT in the set (zero false negatives) using just a few bits per item!',
    timeComplexity: 'O(K) ≈ O(1)',
    spaceComplexity: 'O(Bit Array Size)',
  },
  {
    id: 84,
    company: 'Swiggy',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'Longest Continuous Increasing Delivery Speed Window',
    scenarioDescription:
      'Given an array of delivery bike speeds over time, find the length of the longest contiguous subsegment where speed was strictly increasing.',
    constraintsAndScale: 'N = 100,000 data points.',
    options: ['Single-Pass Sliding Window / Two Pointers', '0/1 Knapsack', 'Binary Search Tree', 'Bellman-Ford'],
    correctIndex: 0,
    correctPattern: 'Two Pointers (Linear Scan)',
    kapilPatternInsight:
      'Mentorship By Kapil: Keep `currentLength = 1`. If `speed[i] > speed[i - 1]`, `currentLength++`; else reset `currentLength = 1`. Update `maxLength = max(maxLength, currentLength)` in O(N) time and O(1) space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 85,
    company: 'Flipkart',
    domain: 'E-Commerce',
    scenarioTitle: 'Customer Review Character Frequency Sort',
    scenarioDescription:
      'Given a string of review text, sort characters in decreasing order of their occurrence frequency. If frequencies match, maintain deterministic order.',
    constraintsAndScale: 'String length up to 500,000 characters.',
    options: ['Hash Map + Bucket Sort (O(N) time)', 'Quick Sort O(N log N)', 'Graph BFS', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: 'Bucket Sort on Frequencies',
    kapilPatternInsight:
      'Mentorship By Kapil: Count frequencies with a map in O(N). Since the maximum frequency cannot exceed string length N, group characters into frequency buckets [0..N] and concatenate in O(N) time!',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 86,
    company: 'Amazon Warehouse',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'Automated Forklift Maze Path with Keys and Doors',
    scenarioDescription:
      'A warehouse robot must navigate a 2D grid from Start to Target. Some cells contain colored keys (a, b, c) that unlock corresponding security doors (A, B, C). Find the minimum steps required.',
    constraintsAndScale: 'Grid size 30 x 30, at most 6 distinct keys.',
    options: ['BFS with Bitmask State (x, y, keysBitmask)', 'Simple BFS without state', 'Binary Search', 'Kadane'],
    correctIndex: 0,
    correctPattern: 'BFS with Bitmask State',
    kapilPatternInsight:
      'Mentorship By Kapil: A cell can be revisited with a different set of collected keys! State is `(row, col, keysMask)`. With <= 6 keys, keysMask is an integer from 0 to 63. BFS guarantees shortest path in O(M * N * 2^K).',
    timeComplexity: 'O(M * N * 2^K)',
    spaceComplexity: 'O(M * N * 2^K)',
  },
  {
    id: 87,
    company: 'Google Flights',
    domain: 'Search & Gaming',
    scenarioTitle: 'Flight Itinerary Construction using All Airport Tickets',
    scenarioDescription:
      'Given a list of flight tickets `[from, to]`, reconstruct the complete itinerary starting from "JFK" that uses every single ticket exactly once, returning the lexicographically smallest itinerary if multiple exist.',
    constraintsAndScale: 'N = 10,000 tickets; guaranteed Eulerian Path.',
    options: ["Hierholzer's Algorithm (Eulerian Path with DFS & Min-Heap)", 'Hamiltonian Path Backtracking', 'Dijkstra', 'Sliding Window'],
    correctIndex: 0,
    correctPattern: "Hierholzer's Algorithm",
    kapilPatternInsight:
      'Mentorship By Kapil: Using every edge exactly once is an Eulerian Path problem. Hierholzer’s algorithm traverses edges greedily, post-ordering nodes onto a stack to build the valid path in O(E log E) time.',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V + E)',
  },
  {
    id: 88,
    company: 'Zerodha',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Continuous Subarray Sum Divisible by K',
    scenarioDescription:
      'Check if a trading account ledger has a continuous subarray of size at least 2 whose sum is a multiple of K (sum % K == 0).',
    constraintsAndScale: 'N = 100,000 transactions; K up to 10^9.',
    options: ['Prefix Sum Modulo Property + Hash Map', 'Sliding Window', 'Two Pointers', 'Trie'],
    correctIndex: 0,
    correctPattern: 'Prefix Sum Modulo + Hash Map',
    kapilPatternInsight:
      'Mentorship By Kapil: If two prefix sums have the same remainder when divided by K: `prefixSum[j] % K == prefixSum[i] % K`, then the subarray between them is divisible by K! Store remainder indices in a map in O(N).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(N, K))',
  },
  {
    id: 89,
    company: 'Spotify',
    domain: 'Streaming & Media',
    scenarioTitle: 'Shuffle Playlist Without Repeating Songs Until Complete Cycle',
    scenarioDescription:
      'Implement an unbiased random shuffle for a playlist of N songs such that every permutation has equal probability 1/N! in O(N) time and O(1) extra space.',
    constraintsAndScale: 'N = 100,000 songs in playlist.',
    options: ['Fisher-Yates Shuffle Algorithm', 'Sort by random floating-point keys', 'Binary Search', 'BFS'],
    correctIndex: 0,
    correctPattern: 'Fisher-Yates Shuffle',
    kapilPatternInsight:
      'Mentorship By Kapil: Iterate from N - 1 down to 1. At step i, pick a random index j in [0, i] and swap arr[i] with arr[j]. Mathematically proven to produce all N! permutations with uniform probability in O(N).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 90,
    company: 'Atlassian Confluence',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Word Break Verification Against Document Glossary',
    scenarioDescription:
      'Given an unspaced string of characters (e.g. "placementreadinessportal") and a glossary of valid words, determine if the string can be segmented into space-separated dictionary words.',
    constraintsAndScale: 'String length N <= 300, Dictionary size <= 1,000.',
    options: ['Dynamic Programming (1D Boolean DP array) or Trie', 'Sliding Window', 'Two Pointers', 'Kruskal'],
    correctIndex: 0,
    correctPattern: '1D Dynamic Programming (Word Break)',
    kapilPatternInsight:
      'Mentorship By Kapil: Define `dp[i]` as true if substring `s[0...i]` can be segmented. For every split point j < i, if `dp[j]` is true and `s[j...i]` is in dictionary, set `dp[i] = true` in O(N^2) time.',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 91,
    company: 'Microsoft Excel',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Excel Column Title to Number Conversion',
    scenarioDescription:
      'Given an Excel column title as string (e.g. "A" -> 1, "Z" -> 26, "AA" -> 27, "ZY" -> 701), convert it to its corresponding integer column number.',
    constraintsAndScale: 'String length <= 7 (fits in 32-bit int).',
    options: ['Base-26 Positional Number System Conversion', 'Binary Search', 'Graph Traversal', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: 'Base-26 Positional Conversion',
    kapilPatternInsight:
      'Mentorship By Kapil: Excel column letters represent a Base-26 number system without a zero digit: `result = result * 26 + (char - "A" + 1)`. Single pass runs in O(Length).',
    timeComplexity: 'O(Length)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 92,
    company: 'Amazon Fulfillment',
    domain: 'Logistics & Warehousing',
    scenarioTitle: 'Reorganize Packaging Conveyor String Without Adjacent Identical Labels',
    scenarioDescription:
      'Rearrange letters in a packaging label string such that no two adjacent characters are identical. Return any valid rearrangement or empty string if impossible.',
    constraintsAndScale: 'String length N <= 100,000.',
    options: ['Max-Heap of Character Frequencies (Greedy Pairing)', 'Sliding Window', 'Binary Search', 'Bellman-Ford'],
    correctIndex: 0,
    correctPattern: 'Max-Heap Greedy Pairing',
    kapilPatternInsight:
      'Mentorship By Kapil: If the most frequent character appears more than (N + 1) / 2 times, it is impossible! Otherwise, use a Max-Heap to greedily append the most frequent character alternating with the second most frequent in O(N log 26).',
    timeComplexity: 'O(N log 26) ≈ O(N)',
    spaceComplexity: 'O(26) ≈ O(1)',
  },
  {
    id: 93,
    company: 'Apple FaceID',
    domain: 'Search & Gaming',
    scenarioTitle: 'Facial Landmark Point Convex Hull Boundary',
    scenarioDescription:
      'Given 1,000 facial landmark points (x, y) detected by a depth camera, compute the smallest convex polygon that encloses all points (Convex Hull).',
    constraintsAndScale: 'N = 1,000 points; 60 FPS constraint.',
    options: ["Graham Scan or Monotone Chain Algorithm", 'Dijkstra', 'Kadane', 'Bitwise Shift'],
    correctIndex: 0,
    correctPattern: "Monotone Chain / Graham Scan (Convex Hull)",
    kapilPatternInsight:
      'Mentorship By Kapil: Sort points by coordinates, then construct lower and upper hulls using a cross-product orientation test on a stack in O(N log N) time.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 94,
    company: 'Stripe',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Validate Parentheses in JSON Payload Parser',
    scenarioDescription:
      'Given a raw payload string containing brackets `()`, `{}`, `[]`, verify if every opening bracket has an exact matching closing bracket in correct nested order.',
    constraintsAndScale: 'Payload string up to 500,000 characters.',
    options: ['Stack Pattern', 'Queue', 'Kadane Algorithm', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: 'Stack',
    kapilPatternInsight:
      'Mentorship By Kapil: Push expected closing brackets onto a stack when encountering opening brackets. If a closing bracket does not match `stack.pop()`, the payload syntax is invalid.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 95,
    company: 'Uber',
    domain: 'Ride-Sharing & Mobility',
    scenarioTitle: 'Find Kth Largest Ride Distance from Unsorted Driver Records',
    scenarioDescription:
      'From a historical list of 10,000,000 ride distances recorded by drivers, find the 100th longest ride distance without sorting the entire 10M record array.',
    constraintsAndScale: 'N = 10,000,000 elements, K = 100.',
    options: ['QuickSelect (Hoare Selection) or Min-Heap of size K', 'Bubble Sort', 'DFS', 'Sliding Window'],
    correctIndex: 0,
    correctPattern: 'QuickSelect / Min-Heap of size K',
    kapilPatternInsight:
      'Mentorship By Kapil: QuickSelect partitions array like quicksort, recursing only into the half containing the Kth element. Average time complexity is O(N) linear!',
    timeComplexity: 'O(N) average QuickSelect, O(N log K) Min-Heap',
    spaceComplexity: 'O(1) with QuickSelect',
  },
  {
    id: 96,
    company: 'Google Docs',
    domain: 'Cloud & Infrastructure',
    scenarioTitle: 'Collaborative Cursor Position Relative Rank (Order Statistic Tree)',
    scenarioDescription:
      'In a collaborative document with 1,000,000 characters, dynamically insert characters, delete characters, and find the character at index K in O(log N) time.',
    constraintsAndScale: '1,000,000 characters; frequent insertions and rank queries.',
    options: ['Order Statistic Tree / Fenwick Tree on Character Positions', 'Plain Array with memmove O(N)', 'Queue', 'Two Pointers'],
    correctIndex: 0,
    correctPattern: 'Order Statistic Tree (Balanced BST with Subtree Size)',
    kapilPatternInsight:
      'Mentorship By Kapil: A standard array takes O(N) to shift elements on insertion. An Order Statistic Tree augments each node with its subtree size, enabling both O(log N) insertion and O(log N) Kth-index lookup.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 97,
    company: 'Disney+ Hotstar',
    domain: 'Streaming & Media',
    scenarioTitle: 'Video Segment Buffering Maximum Continuous Viewing Time',
    scenarioDescription:
      'A user downloads discontinuous video segments `[[1, 3], [2, 6], [8, 10], [15, 18]]`. Merge all overlapping segments and compute total continuous watchable minutes.',
    constraintsAndScale: 'N = 100,000 intervals.',
    options: ['Merge Overlapping Intervals (Sort by Start Time)', 'Binary Search', 'Dijkstra', 'Trie'],
    correctIndex: 0,
    correctPattern: 'Merge Intervals Pattern',
    kapilPatternInsight:
      'Mentorship By Kapil: Sort intervals by start time. Iterate and compare `currentStart` with `lastEnd`. If `currentStart <= lastEnd`, merge by updating `lastEnd = max(lastEnd, currentEnd)` in O(N log N).',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 98,
    company: 'Netflix',
    domain: 'Streaming & Media',
    scenarioTitle: 'Circular Queue for Video Frame Ring Buffer',
    scenarioDescription:
      'Implement a fixed-size Circular Buffer of capacity K to store incoming raw camera video frames, continuously overwriting oldest frames when full without moving memory.',
    constraintsAndScale: 'Capacity K = 120 frames; continuous 120 FPS write and read.',
    options: ['Circular Queue (Array with head and tail pointers modulo K)', 'Dynamic Vector with erase(0)', 'Stack', 'BST'],
    correctIndex: 0,
    correctPattern: 'Circular Queue (Ring Buffer)',
    kapilPatternInsight:
      'Mentorship By Kapil: Array `erase(0)` takes O(N) shifting overhead. A Circular Queue advances `head = (head + 1) % K` and `tail = (tail + 1) % K`, achieving strictly O(1) non-blocking enqueue and dequeue.',
    timeComplexity: 'O(1) strictly',
    spaceComplexity: 'O(K)',
  },
  {
    id: 99,
    company: 'TCS Digital / Infosys DSE',
    domain: 'Fintech & Trading',
    scenarioTitle: 'Trapping Rain Water Multi-Pillar Elevation Basin',
    scenarioDescription:
      'Calculate the exact volume of water trapped between elevation bars in an elevation profile where each bar width is 1.',
    constraintsAndScale: 'N = 50,000 elevation bars; must run in O(N) time and O(1) space.',
    options: ['Two Pointers Squeezing from Boundaries', 'Nested Loop O(N^2)', 'Binary Search Tree', 'Kruskal'],
    correctIndex: 0,
    correctPattern: 'Two Pointers (Squeezing)',
    kapilPatternInsight:
      'Mentorship By Kapil: Maintain `leftMax` and `rightMax`. If `height[left] <= height[right]`, water at left is bottlenecked by `leftMax - height[left]`; advance left++. Optimal O(N) time and O(1) space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 100,
    company: 'SPSU Placement Portal (Mentorship By Kapil)',
    domain: 'Search & Gaming',
    scenarioTitle: 'Master Placement Company Problem Pattern Identification Formula',
    scenarioDescription:
      'Given any technical interview coding problem in top recruiter online tests (Google, Amazon, TCS, Microsoft), what is the golden 3-step strategy to instantly identify the optimal pattern and guarantee 80%+ passing score?',
    constraintsAndScale: '100% test-case pass rate; 10^8 operations rule; zero TLE / MLE / WA.',
    options: [
      'Analyze Constraints on N -> Match to Target Big-O (10^8 rule) -> Identify Invariants (Monotonicity, Sliding, Stack, DP, Graph) -> Verify Edge Cases (N=1, negative, overflow)',
      'Immediately write code in C without reading constraints',
      'Always use brute force nested loops',
      'Memorize LeetCode code lines verbatim without understanding invariants',
    ],
    correctIndex: 0,
    correctPattern: "Kapil's Master Constraint-to-Pattern Formula",
    kapilPatternInsight:
      'Mentorship By Kapil: Golden Rule: Never start typing code until you know the target Big-O from the constraints! N <= 20: Backtracking/Bitmask; N <= 2000: O(N^2) DP; N <= 10^5: O(N log N) or O(N); N <= 10^9: O(log N) Binary Search on Answer space. This guarantees placement success!',
    timeComplexity: 'O(1) pattern recognition mindset',
    spaceComplexity: 'O(1)',
  },
];
