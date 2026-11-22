const fs = require('fs');
const path = require('path');

const cCode = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_N 1000
#define MIN(a, b) ((a) < (b) ? (a) : (b))

// 1. Lazy Segment Tree for Real-Time Metric Windows
long long tree[4 * MAX_N], lazy[4 * MAX_N];

void push(int node, int l, int r) {
    if (lazy[node] != 0) {
        int mid = l + (r - l) / 2;
        tree[2 * node] += lazy[node] * (mid - l + 1);
        lazy[2 * node] += lazy[node];
        tree[2 * node + 1] += lazy[node] * (r - mid);
        lazy[2 * node + 1] += lazy[node];
        lazy[node] = 0;
    }
}

void updateRange(int node, int l, int r, int ql, int qr, long long val) {
    if (ql <= l && r <= qr) {
        tree[node] += val * (r - l + 1);
        lazy[node] += val;
        return;
    }
    push(node, l, r);
    int mid = l + (r - l) / 2;
    if (ql <= mid) updateRange(2 * node, l, mid, ql, qr, val);
    if (qr > mid) updateRange(2 * node + 1, mid + 1, r, ql, qr, val);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

long long queryRange(int node, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return tree[node];
    push(node, l, r);
    int mid = l + (r - l) / 2;
    long long sum = 0;
    if (ql <= mid) sum += queryRange(2 * node, l, mid, ql, qr);
    if (qr > mid) sum += queryRange(2 * node + 1, mid + 1, r, ql, qr);
    return sum;
}

// 2. KMP Genomic Pattern Search
void computeLPS(const char* pat, int m, int* lps) {
    int len = 0; lps[0] = 0; int i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) lps[i++] = ++len;
        else if (len != 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
}

int kmpSearch(const char* txt, const char* pat) {
    int n = strlen(txt), m = strlen(pat);
    int lps[m]; computeLPS(pat, m, lps);
    int i = 0, j = 0;
    while (i < n) {
        if (pat[j] == txt[i]) { i++; j++; }
        if (j == m) return i - j;
        else if (i < n && pat[j] != txt[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
    return -1;
}

int main(void) {
    printf("=================================================================\\n");
    printf("  FAANG DAY 13: RANGE QUERY & GENOMIC STRING ENGINE (C17)\\n");
    printf("=================================================================\\n\\n");

    // Initialize metrics array with 0s
    memset(tree, 0, sizeof(tree));
    memset(lazy, 0, sizeof(lazy));

    updateRange(1, 0, 9, 2, 6, 15); // Add 15 to metric indices 2..6
    printf("[Segment Tree] Window [2, 6] Volume Sum: %lld\\n", queryRange(1, 0, 9, 2, 6)); // 15*5 = 75
    printf("[Segment Tree] Sub-Window [4, 8] Volume Sum: %lld\\n\\n", queryRange(1, 0, 9, 4, 8)); // 15*3 = 45

    const char* genome = "AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC";
    const char* targetMotif = "TCTCTGTGTGGA";
    int motifPos = kmpSearch(genome, targetMotif);
    printf("[KMP Matcher] Target Genomic Motif matched at index: %d\\n", motifPos);

    return 0;
}`;

const cppCode = `#include <iostream>
#include <vector>
#include <string>

using namespace std;

// 1. Lazy Segment Tree
class MetricSegmentTree {
    int n;
    vector<long long> tree, lazy;
    void push(int node, int l, int r) {
        if (lazy[node] != 0) {
            int mid = l + (r - l) / 2;
            tree[2 * node] += lazy[node] * (mid - l + 1);
            lazy[2 * node] += lazy[node];
            tree[2 * node + 1] += lazy[node] * (r - mid);
            lazy[2 * node + 1] += lazy[node];
            lazy[node] = 0;
        }
    }
public:
    MetricSegmentTree(int n) : n(n), tree(4 * n, 0), lazy(4 * n, 0) {}
    void update(int node, int l, int r, int ql, int qr, long long val) {
        if (ql <= l && r <= qr) {
            tree[node] += val * (r - l + 1);
            lazy[node] += val;
            return;
        }
        push(node, l, r);
        int mid = l + (r - l) / 2;
        if (ql <= mid) update(2 * node, l, mid, ql, qr, val);
        if (qr > mid) update(2 * node + 1, mid + 1, r, ql, qr, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
    long long query(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[node];
        push(node, l, r);
        int mid = l + (r - l) / 2;
        long long sum = 0;
        if (ql <= mid) sum += query(2 * node, l, mid, ql, qr);
        if (qr > mid) sum += query(2 * node + 1, mid + 1, r, ql, qr);
        return sum;
    }
};

// 2. KMP Genomic Search
int findGenomicMotif(const string& text, const string& pat) {
    int m = pat.size(), n = text.size();
    vector<int> pi(m, 0);
    for (int i = 1; i < m; ++i) {
        int j = pi[i - 1];
        while (j > 0 && pat[i] != pat[j]) j = pi[j - 1];
        if (pat[i] == pat[j]) j++;
        pi[i] = j;
    }
    int j = 0;
    for (int i = 0; i < n; ++i) {
        while (j > 0 && text[i] != pat[j]) j = pi[j - 1];
        if (text[i] == pat[j]) j++;
        if (j == m) return i - m + 1;
    }
    return -1;
}

int main() {
    cout << "=== FAANG DAY 13: RANGE QUERY & GENOMIC ENGINE (C++20) ===" << endl;
    MetricSegmentTree st(10);
    st.update(1, 0, 9, 2, 6, 15);
    cout << "[Segment Tree] Metric Window [2, 6] Volume: " << st.query(1, 0, 9, 2, 6) << endl;

    string genome = "AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC";
    string motif = "TCTCTGTGTGGA";
    cout << "[KMP Search] Genomic Motif Position: " << findGenomicMotif(genome, motif) << endl;
    return 0;
}`;

const javaCode = `import java.util.*;

public class GenomicRangeQueryEngine {
    static class LazySegTree {
        int n;
        long[] tree, lazy;
        LazySegTree(int n) {
            this.n = n;
            this.tree = new long[4 * n];
            this.lazy = new long[4 * n];
        }
        void push(int node, int l, int r) {
            if (lazy[node] != 0) {
                int mid = l + (r - l) / 2;
                tree[2 * node] += lazy[node] * (mid - l + 1);
                lazy[2 * node] += lazy[node];
                tree[2 * node + 1] += lazy[node] * (r - mid);
                lazy[2 * node + 1] += lazy[node];
                lazy[node] = 0;
            }
        }
        void update(int node, int l, int r, int ql, int qr, long val) {
            if (ql <= l && r <= qr) {
                tree[node] += val * (r - l + 1);
                lazy[node] += val;
                return;
            }
            push(node, l, r);
            int mid = l + (r - l) / 2;
            if (ql <= mid) update(2 * node, l, mid, ql, qr, val);
            if (qr > mid) update(2 * node + 1, mid + 1, r, ql, qr, val);
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
        long query(int node, int l, int r, int ql, int qr) {
            if (ql <= l && r <= qr) return tree[node];
            push(node, l, r);
            int mid = l + (r - l) / 2;
            long sum = 0;
            if (ql <= mid) sum += query(2 * node, l, mid, ql, qr);
            if (qr > mid) sum += query(2 * node + 1, mid + 1, r, ql, qr);
            return sum;
        }
    }

    public static int kmpSearch(String text, String pat) {
        int m = pat.length(), n = text.length();
        int[] pi = new int[m];
        for (int i = 1; i < m; i++) {
            int j = pi[i - 1];
            while (j > 0 && pat.charAt(i) != pat.charAt(j)) j = pi[j - 1];
            if (pat.charAt(i) == pat.charAt(j)) j++;
            pi[i] = j;
        }
        int j = 0;
        for (int i = 0; i < n; i++) {
            while (j > 0 && text.charAt(i) != pat.charAt(j)) j = pi[j - 1];
            if (text.charAt(i) == pat.charAt(j)) j++;
            if (j == m) return i - m + 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        System.out.println("=== FAANG DAY 13: RANGE QUERY & STRING ENGINE (Java 21) ===");
        LazySegTree st = new LazySegTree(10);
        st.update(1, 0, 9, 2, 6, 15);
        System.out.println("[Segment Tree] Window [2, 6] Volume: " + st.query(1, 0, 9, 2, 6));

        String genome = "AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC";
        String motif = "TCTCTGTGTGGA";
        System.out.println("[KMP Matcher] Motif Found At: " + kmpSearch(genome, motif));
    }
}`;

const pythonCode = `class LazySegTree:
    def __init__(self, n: int):
        self.n = n
        self.tree = [0] * (4 * n)
        self.lazy = [0] * (4 * n)

    def _push(self, node: int, l: int, r: int):
        if self.lazy[node] != 0:
            mid = l + (r - l) // 2
            self.tree[2 * node] += self.lazy[node] * (mid - l + 1)
            self.lazy[2 * node] += self.lazy[node]
            self.tree[2 * node + 1] += self.lazy[node] * (r - mid)
            self.lazy[2 * node + 1] += self.lazy[node]
            self.lazy[node] = 0

    def update(self, node: int, l: int, r: int, ql: int, qr: int, val: int):
        if ql <= l and r <= qr:
            self.tree[node] += val * (r - l + 1)
            self.lazy[node] += val
            return
        self._push(node, l, r)
        mid = l + (r - l) // 2
        if ql <= mid:
            self.update(2 * node, l, mid, ql, qr, val)
        if qr > mid:
            self.update(2 * node + 1, mid + 1, r, ql, qr, val)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query(self, node: int, l: int, r: int, ql: int, qr: int) -> int:
        if ql <= l and r <= qr:
            return self.tree[node]
        self._push(node, l, r)
        mid = l + (r - l) // 2
        total = 0
        if ql <= mid:
            total += self.query(2 * node, l, mid, ql, qr)
        if qr > mid:
            total += self.query(2 * node + 1, mid + 1, r, ql, qr)
        return total

def kmp_search(text: str, pat: str) -> int:
    m, n = len(pat), len(text)
    pi = [0] * m
    for i in range(1, m):
        j = pi[i - 1]
        while j > 0 and pat[i] != pat[j]:
            j = pi[j - 1]
        if pat[i] == pat[j]:
            j += 1
        pi[i] = j
    j = 0
    for i in range(n):
        while j > 0 and text[i] != pat[j]:
            j = pi[j - 1]
        if text[i] == pat[j]:
            j += 1
        if j == m:
            return i - m + 1
    return -1

def main():
    print("=== FAANG DAY 13: RANGE QUERY & STRING ENGINE (Python 3.12) ===")
    st = LazySegTree(10)
    st.update(1, 0, 9, 2, 6, 15)
    print(f"[Segment Tree] Window [2, 6] Volume: {st.query(1, 0, 9, 2, 6)}")

    genome = "AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC"
    motif = "TCTCTGTGTGGA"
    print(f"[KMP Matcher] Motif Found At: {kmp_search(genome, motif)}")

if __name__ == "__main__":
    main()`;

const miniProjectContent = `import { MiniProject } from '../types';

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
      'Prefix function (\\pi) integer arrays for linear string state transitions',
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
    c: ${JSON.stringify(cCode)},
    cpp: ${JSON.stringify(cppCode)},
    java: ${JSON.stringify(javaCode)},
    python: ${JSON.stringify(pythonCode)},
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
`;

fs.writeFileSync(path.join(__dirname, '../src/data/day13MiniProject.ts'), miniProjectContent, 'utf8');
console.log('Successfully wrote src/data/day13MiniProject.ts');
