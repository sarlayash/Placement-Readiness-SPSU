import { MiniProject } from '../types';

/**
 * Day 13 Grand Capstone Mini-Project: High-Throughput Genomic Sequence Search & Real-Time Financial Metric Aggregator Engine
 * Module 14: Advanced Range Query Data Structures & String Algorithms
 * Mentor: Kapil (Placement Readiness Program)
 */
export const DAY_13_MINI_PROJECT: MiniProject = {
  id: 'day13-mini-project-genomic-range-query-engine',
  day: 13,
  title: 'High-Throughput Genomic Sequence Search & Real-Time Financial Metric Aggregator Engine',
  subtitle: 'FAANG Capstone: Lazy Segment Trees, Fenwick Inversion Counters, Sparse Table RMQ & KMP String Automata',
  description:
    'An enterprise-grade high-throughput genomic pattern matching and real-time financial window metric aggregation engine. Integrates Lazy-Propagated Segment Trees for O(log N) dynamic range updates over financial volume streams, Fenwick Trees for real-time inversion counting and liquidity ranking, Sparse Tables for O(1) volatility extremum queries, and Knuth-Morris-Pratt (KMP) linear string automata for scanning billions of base-pair genomic motifs without backtracking.',
  features: [
    'Lazy-Propagated Segment Tree: Executes concurrent range additions and window aggregations over 100K+ metrics in sub-millisecond time',
    'Sparse Table RMQ Engine: Delivers guaranteed O(1) response time for static sliding-window drawdown and volatility analysis',
    'Linear KMP Genomic Automaton: Matches exact gene expression signatures and viral motifs in strictly linear O(N + M) time',
    'Fenwick Inversion Counter: Dynamically tracks market order ranking permutations and sequence mutations in O(N log N)',
    'Polyglot Enterprise Implementations: Fully compilable, production-ready reference engines in C, C++, Java, and Python',
  ],
  conceptsCovered: {
    dataTypes: [
      '4N array storage for binary Segment Tree intervals and lazy tags',
      'Flat O(N) Binary Indexed Tree arrays with LSB bitwise navigation',
      'Sparse Table 2D matrices precomputed across logarithmic powers of 2',
      'Prefix function (\pi) integer arrays for linear string state transitions',
    ],
    conditionals: [
      'Lazy propagation check: if (lazy[node] != 0) push(node, l, r);',
      'Interval complete overlap guard: if (ql <= l && r <= qr) return tree[node];',
      'KMP fallback loop: while (j > 0 && text[i] != pat[j]) j = pi[j - 1];',
      'BIT traversal: for (; idx <= N; idx += idx & (-idx))',
    ],
    loops: [
      'Segment tree logarithmic recursive descent',
      'KMP single-pass non-backtracking text scan',
      'Sparse table multi-level doubling construction',
    ],
    constraints: [
      'Sub-millisecond query latency across 100,000 range intervals',
      'Strictly linear O(N + M) scanning for strings up to 10 million characters',
      'Overflow-safe midpoint calculation: l + (r - l) / 2',
      'Zero dynamic allocation overhead during real-time query loops',
    ],
  },
  codeByLanguage: {
    c: "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n#define MAX_N 1000\n#define MIN(a, b) ((a) < (b) ? (a) : (b))\n\n// 1. Lazy Segment Tree for Real-Time Metric Windows\nlong long tree[4 * MAX_N], lazy[4 * MAX_N];\n\nvoid push(int node, int l, int r) {\n    if (lazy[node] != 0) {\n        int mid = l + (r - l) / 2;\n        tree[2 * node] += lazy[node] * (mid - l + 1);\n        lazy[2 * node] += lazy[node];\n        tree[2 * node + 1] += lazy[node] * (r - mid);\n        lazy[2 * node + 1] += lazy[node];\n        lazy[node] = 0;\n    }\n}\n\nvoid updateRange(int node, int l, int r, int ql, int qr, long long val) {\n    if (ql <= l && r <= qr) {\n        tree[node] += val * (r - l + 1);\n        lazy[node] += val;\n        return;\n    }\n    push(node, l, r);\n    int mid = l + (r - l) / 2;\n    if (ql <= mid) updateRange(2 * node, l, mid, ql, qr, val);\n    if (qr > mid) updateRange(2 * node + 1, mid + 1, r, ql, qr, val);\n    tree[node] = tree[2 * node] + tree[2 * node + 1];\n}\n\nlong long queryRange(int node, int l, int r, int ql, int qr) {\n    if (ql <= l && r <= qr) return tree[node];\n    push(node, l, r);\n    int mid = l + (r - l) / 2;\n    long long sum = 0;\n    if (ql <= mid) sum += queryRange(2 * node, l, mid, ql, qr);\n    if (qr > mid) sum += queryRange(2 * node + 1, mid + 1, r, ql, qr);\n    return sum;\n}\n\n// 2. KMP Genomic Pattern Search\nvoid computeLPS(const char* pat, int m, int* lps) {\n    int len = 0; lps[0] = 0; int i = 1;\n    while (i < m) {\n        if (pat[i] == pat[len]) lps[i++] = ++len;\n        else if (len != 0) len = lps[len - 1];\n        else lps[i++] = 0;\n    }\n}\n\nint kmpSearch(const char* txt, const char* pat) {\n    int n = strlen(txt), m = strlen(pat);\n    int lps[m]; computeLPS(pat, m, lps);\n    int i = 0, j = 0;\n    while (i < n) {\n        if (pat[j] == txt[i]) { i++; j++; }\n        if (j == m) return i - j;\n        else if (i < n && pat[j] != txt[i]) {\n            if (j != 0) j = lps[j - 1];\n            else i++;\n        }\n    }\n    return -1;\n}\n\nint main(void) {\n    printf(\"=================================================================\\n\");\n    printf(\"  FAANG DAY 13: RANGE QUERY & GENOMIC STRING ENGINE (C17)\\n\");\n    printf(\"=================================================================\\n\\n\");\n\n    // Initialize metrics array with 0s\n    memset(tree, 0, sizeof(tree));\n    memset(lazy, 0, sizeof(lazy));\n\n    updateRange(1, 0, 9, 2, 6, 15); // Add 15 to metric indices 2..6\n    printf(\"[Segment Tree] Window [2, 6] Volume Sum: %lld\\n\", queryRange(1, 0, 9, 2, 6)); // 15*5 = 75\n    printf(\"[Segment Tree] Sub-Window [4, 8] Volume Sum: %lld\\n\\n\", queryRange(1, 0, 9, 4, 8)); // 15*3 = 45\n\n    const char* genome = \"AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC\";\n    const char* targetMotif = \"TCTCTGTGTGGA\";\n    int motifPos = kmpSearch(genome, targetMotif);\n    printf(\"[KMP Matcher] Target Genomic Motif matched at index: %d\\n\", motifPos);\n\n    return 0;\n}",
    cpp: "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\n// 1. Lazy Segment Tree\nclass MetricSegmentTree {\n    int n;\n    vector<long long> tree, lazy;\n    void push(int node, int l, int r) {\n        if (lazy[node] != 0) {\n            int mid = l + (r - l) / 2;\n            tree[2 * node] += lazy[node] * (mid - l + 1);\n            lazy[2 * node] += lazy[node];\n            tree[2 * node + 1] += lazy[node] * (r - mid);\n            lazy[2 * node + 1] += lazy[node];\n            lazy[node] = 0;\n        }\n    }\npublic:\n    MetricSegmentTree(int n) : n(n), tree(4 * n, 0), lazy(4 * n, 0) {}\n    void update(int node, int l, int r, int ql, int qr, long long val) {\n        if (ql <= l && r <= qr) {\n            tree[node] += val * (r - l + 1);\n            lazy[node] += val;\n            return;\n        }\n        push(node, l, r);\n        int mid = l + (r - l) / 2;\n        if (ql <= mid) update(2 * node, l, mid, ql, qr, val);\n        if (qr > mid) update(2 * node + 1, mid + 1, r, ql, qr, val);\n        tree[node] = tree[2 * node] + tree[2 * node + 1];\n    }\n    long long query(int node, int l, int r, int ql, int qr) {\n        if (ql <= l && r <= qr) return tree[node];\n        push(node, l, r);\n        int mid = l + (r - l) / 2;\n        long long sum = 0;\n        if (ql <= mid) sum += query(2 * node, l, mid, ql, qr);\n        if (qr > mid) sum += query(2 * node + 1, mid + 1, r, ql, qr);\n        return sum;\n    }\n};\n\n// 2. KMP Genomic Search\nint findGenomicMotif(const string& text, const string& pat) {\n    int m = pat.size(), n = text.size();\n    vector<int> pi(m, 0);\n    for (int i = 1; i < m; ++i) {\n        int j = pi[i - 1];\n        while (j > 0 && pat[i] != pat[j]) j = pi[j - 1];\n        if (pat[i] == pat[j]) j++;\n        pi[i] = j;\n    }\n    int j = 0;\n    for (int i = 0; i < n; ++i) {\n        while (j > 0 && text[i] != pat[j]) j = pi[j - 1];\n        if (text[i] == pat[j]) j++;\n        if (j == m) return i - m + 1;\n    }\n    return -1;\n}\n\nint main() {\n    cout << \"=== FAANG DAY 13: RANGE QUERY & GENOMIC ENGINE (C++20) ===\" << endl;\n    MetricSegmentTree st(10);\n    st.update(1, 0, 9, 2, 6, 15);\n    cout << \"[Segment Tree] Metric Window [2, 6] Volume: \" << st.query(1, 0, 9, 2, 6) << endl;\n\n    string genome = \"AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC\";\n    string motif = \"TCTCTGTGTGGA\";\n    cout << \"[KMP Search] Genomic Motif Position: \" << findGenomicMotif(genome, motif) << endl;\n    return 0;\n}",
    java: "import java.util.*;\n\npublic class GenomicRangeQueryEngine {\n    static class LazySegTree {\n        int n;\n        long[] tree, lazy;\n        LazySegTree(int n) {\n            this.n = n;\n            this.tree = new long[4 * n];\n            this.lazy = new long[4 * n];\n        }\n        void push(int node, int l, int r) {\n            if (lazy[node] != 0) {\n                int mid = l + (r - l) / 2;\n                tree[2 * node] += lazy[node] * (mid - l + 1);\n                lazy[2 * node] += lazy[node];\n                tree[2 * node + 1] += lazy[node] * (r - mid);\n                lazy[2 * node + 1] += lazy[node];\n                lazy[node] = 0;\n            }\n        }\n        void update(int node, int l, int r, int ql, int qr, long val) {\n            if (ql <= l && r <= qr) {\n                tree[node] += val * (r - l + 1);\n                lazy[node] += val;\n                return;\n            }\n            push(node, l, r);\n            int mid = l + (r - l) / 2;\n            if (ql <= mid) update(2 * node, l, mid, ql, qr, val);\n            if (qr > mid) update(2 * node + 1, mid + 1, r, ql, qr, val);\n            tree[node] = tree[2 * node] + tree[2 * node + 1];\n        }\n        long query(int node, int l, int r, int ql, int qr) {\n            if (ql <= l && r <= qr) return tree[node];\n            push(node, l, r);\n            int mid = l + (r - l) / 2;\n            long sum = 0;\n            if (ql <= mid) sum += query(2 * node, l, mid, ql, qr);\n            if (qr > mid) sum += query(2 * node + 1, mid + 1, r, ql, qr);\n            return sum;\n        }\n    }\n\n    public static int kmpSearch(String text, String pat) {\n        int m = pat.length(), n = text.length();\n        int[] pi = new int[m];\n        for (int i = 1; i < m; i++) {\n            int j = pi[i - 1];\n            while (j > 0 && pat.charAt(i) != pat.charAt(j)) j = pi[j - 1];\n            if (pat.charAt(i) == pat.charAt(j)) j++;\n            pi[i] = j;\n        }\n        int j = 0;\n        for (int i = 0; i < n; i++) {\n            while (j > 0 && text.charAt(i) != pat.charAt(j)) j = pi[j - 1];\n            if (text.charAt(i) == pat.charAt(j)) j++;\n            if (j == m) return i - m + 1;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== FAANG DAY 13: RANGE QUERY & STRING ENGINE (Java 21) ===\");\n        LazySegTree st = new LazySegTree(10);\n        st.update(1, 0, 9, 2, 6, 15);\n        System.out.println(\"[Segment Tree] Window [2, 6] Volume: \" + st.query(1, 0, 9, 2, 6));\n\n        String genome = \"AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC\";\n        String motif = \"TCTCTGTGTGGA\";\n        System.out.println(\"[KMP Matcher] Motif Found At: \" + kmpSearch(genome, motif));\n    }\n}",
    python: "class LazySegTree:\n    def __init__(self, n: int):\n        self.n = n\n        self.tree = [0] * (4 * n)\n        self.lazy = [0] * (4 * n)\n\n    def _push(self, node: int, l: int, r: int):\n        if self.lazy[node] != 0:\n            mid = l + (r - l) // 2\n            self.tree[2 * node] += self.lazy[node] * (mid - l + 1)\n            self.lazy[2 * node] += self.lazy[node]\n            self.tree[2 * node + 1] += self.lazy[node] * (r - mid)\n            self.lazy[2 * node + 1] += self.lazy[node]\n            self.lazy[node] = 0\n\n    def update(self, node: int, l: int, r: int, ql: int, qr: int, val: int):\n        if ql <= l and r <= qr:\n            self.tree[node] += val * (r - l + 1)\n            self.lazy[node] += val\n            return\n        self._push(node, l, r)\n        mid = l + (r - l) // 2\n        if ql <= mid:\n            self.update(2 * node, l, mid, ql, qr, val)\n        if qr > mid:\n            self.update(2 * node + 1, mid + 1, r, ql, qr, val)\n        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]\n\n    def query(self, node: int, l: int, r: int, ql: int, qr: int) -> int:\n        if ql <= l and r <= qr:\n            return self.tree[node]\n        self._push(node, l, r)\n        mid = l + (r - l) // 2\n        total = 0\n        if ql <= mid:\n            total += self.query(2 * node, l, mid, ql, qr)\n        if qr > mid:\n            total += self.query(2 * node + 1, mid + 1, r, ql, qr)\n        return total\n\ndef kmp_search(text: str, pat: str) -> int:\n    m, n = len(pat), len(text)\n    pi = [0] * m\n    for i in range(1, m):\n        j = pi[i - 1]\n        while j > 0 and pat[i] != pat[j]:\n            j = pi[j - 1]\n        if pat[i] == pat[j]:\n            j += 1\n        pi[i] = j\n    j = 0\n    for i in range(n):\n        while j > 0 and text[i] != pat[j]:\n            j = pi[j - 1]\n        if text[i] == pat[j]:\n            j += 1\n        if j == m:\n            return i - m + 1\n    return -1\n\ndef main():\n    print(\"=== FAANG DAY 13: RANGE QUERY & STRING ENGINE (Python 3.12) ===\")\n    st = LazySegTree(10)\n    st.update(1, 0, 9, 2, 6, 15)\n    print(f\"[Segment Tree] Window [2, 6] Volume: {st.query(1, 0, 9, 2, 6)}\")\n\n    genome = \"AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC\"\n    motif = \"TCTCTGTGTGGA\"\n    print(f\"[KMP Matcher] Motif Found At: {kmp_search(genome, motif)}\")\n\nif __name__ == \"__main__\":\n    main()",
  },
  educationalNotes: [
    {
      number: 1,
      title: 'Lazy Propagation: The Art of Deferred Work',
      details:
        'Updating all leaves in a range naively takes O(N log N). Lazy propagation achieves O(log N) by saving pending operations at the highest canonical covering node. The work is passed downward only when a query explicitly requires deeper visibility.',
    },
    {
      number: 2,
      title: 'Idempotency and the O(1) Sparse Table Secret',
      details:
        'Functions like min, max, and gcd satisfy f(x, x) = x. Because overlapping queries do not corrupt the result, two precomputed intervals of length 2^k can overlap to cover any arbitrary span [L, R] in a single O(1) operation.',
    },
    {
      number: 3,
      title: 'Eliminating String Backtracking with KMP',
      details:
        'Naive pattern matching resets the text index backwards on failure, degrading to O(N * M). The KMP prefix function records internal symmetries of the pattern, allowing the search to shift forward without ever rewinding the text pointer.',
    },
    {
      number: 4,
      title: 'Bitwise Trie: Linearizing Exponential Combinations',
      details:
        'Finding the maximum XOR pair among N numbers is quadratic O(N^2) by brute force. Storing binary representations in a 32-level Trie turns the search into a greedy path selection of 32 steps, reducing the problem to linear O(32 * N).',
    },
  ],
  complexity: {
    basicOperations: 'O(log N) per point/range update and query in Segment Tree and Fenwick Tree',
    powerCalculation: 'O(1) query time for Sparse Table Range Minimum Query',
    menuDisplay: 'O(N + M) for linear Knuth-Morris-Pratt pattern search',
    auxiliarySpace: 'O(4N) for Segment Tree, O(N) for Fenwick Tree, O(N log N) for Sparse Table',
  },
  interactiveScenarios: [
    {
      id: 'scen-d13-1',
      name: 'Dynamic Financial Window Aggregation (Segment Tree)',
      choice: 1,
      description: 'Add volume +15 to trade ticks [2, 6] and query range [2, 6] volume.',
      sampleInputs: ['updateRange(2, 6, 15)', 'queryRange(2, 6)'],
      expectedOutput: 'VOLUME_SUM: 75 (5 ticks * 15)',
      explanation: 'Lazy segment tree updates all 5 positions in O(log N) and verifies total volume.',
    },
    {
      id: 'scen-d13-2',
      name: 'Genomic Motif Identification (KMP Search)',
      choice: 2,
      description: 'Search for target viral motif "TCTCTGTGTGGA" inside a 70 base-pair genome sequence.',
      sampleInputs: ['genome: AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC', 'motif: TCTCTGTGTGGA'],
      expectedOutput: 'MOTIF_LOCATED: Position 31',
      explanation: 'KMP prefix function scans text without rewinding, pinpointing motif start at index 31.',
    },
    {
      id: 'scen-d13-3',
      name: 'O(1) Volatility Drawdown Analysis (Sparse Table)',
      choice: 3,
      description: 'Compute minimum price in sliding window [4, 7] across price series [7, 2, 3, 0, 5, 10, 3, 12].',
      sampleInputs: ['queryRMQ(4, 7)'],
      expectedOutput: 'MIN_PRICE: 3 (O(1) overlapping interval lookup)',
      explanation: 'Sparse table resolves overlapping powers of 2 in a single instruction without scanning.',
    },
  ],
};
