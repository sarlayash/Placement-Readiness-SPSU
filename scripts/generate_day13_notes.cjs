const fs = require('fs');
const path = require('path');

const notes = [
  {
    id: 'd13-note-1',
    title: 'Segment Tree with Lazy Propagation: Range Updates & Queries in O(log N)',
    conceptSummary:
      'A Segment Tree is a binary tree where each node represents an interval [L, R] of an array. Standard segment trees support point updates and range queries in O(log N). When range updates (e.g., adding value V to all elements in [L, R]) are required, updating every leaf node naively degrades to O(N log N). Lazy Propagation defers updates: when an update completely covers node interval [qL, qR], we update the node\'s aggregated value immediately, record the pending change in a `lazy[node]` array, and return without descending. The pending update is pushed down to child nodes only when a subsequent query or update needs to inspect children, guaranteeing strict O(log N) runtime for both range updates and range queries.',
    timeSpaceNote: 'Time Complexity: O(N) build, O(log N) per range update, O(log N) per range query. Space Complexity: O(4N) array storage.',
    kapilMentorTip:
      'Kapil Invariant Rule: The 4N array rule! For an array of size N, the segment tree requires at most 4N nodes. Always implement a unified `push(node, l, r)` helper to propagate lazy tags before recursing into left and right children. Remember: when pushing lazy value down to children, child lazy accumulates: `lazy[left] += lazy[node]` and child tree sum increases by `lazy[node] * childIntervalLength`.',
    codeByLanguage: {
      c: `#include <stdio.h>

#define MAX_N 100005
long long tree[4 * MAX_N], lazy[4 * MAX_N];

void build(int node, int l, int r, const int* arr) {
    lazy[node] = 0;
    if (l == r) {
        tree[node] = arr[l];
        return;
    }
    int mid = l + (r - l) / 2;
    build(2 * node, l, mid, arr);
    build(2 * node + 1, mid + 1, r, arr);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
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

int main(void) {
    int arr[] = {1, 2, 3, 4, 5};
    build(1, 0, 4, arr);
    printf("Initial sum [1, 3]: %lld\\n", queryRange(1, 0, 4, 1, 3)); // 2+3+4 = 9
    updateRange(1, 0, 4, 1, 3, 10); // add 10 to indices 1..3
    printf("Sum [1, 3] after +10: %lld\\n", queryRange(1, 0, 4, 1, 3)); // 9 + 30 = 39
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class LazySegmentTree {
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

    void build(int node, int l, int r, const vector<int>& arr) {
        if (l == r) {
            tree[node] = arr[l];
            return;
        }
        int mid = l + (r - l) / 2;
        build(2 * node, l, mid, arr);
        build(2 * node + 1, mid + 1, r, arr);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

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

public:
    LazySegmentTree(const vector<int>& arr) : n(arr.size()), tree(4 * n, 0), lazy(4 * n, 0) {
        build(1, 0, n - 1, arr);
    }
    void updateRange(int ql, int qr, long long val) { update(1, 0, n - 1, ql, qr, val); }
    long long queryRange(int ql, int qr) { return query(1, 0, n - 1, ql, qr); }
};

int main() {
    vector<int> arr = {1, 2, 3, 4, 5};
    LazySegmentTree st(arr);
    cout << "Sum [1, 3]: " << st.queryRange(1, 3) << endl;
    st.updateRange(1, 3, 10);
    cout << "Updated Sum [1, 3]: " << st.queryRange(1, 3) << endl;
    return 0;
}`,
      java: `public class LazySegmentTree {
    private final int n;
    private final long[] tree;
    private final long[] lazy;

    public LazySegmentTree(int[] arr) {
        this.n = arr.length;
        this.tree = new long[4 * n];
        this.lazy = new long[4 * n];
        build(1, 0, n - 1, arr);
    }

    private void build(int node, int l, int r, int[] arr) {
        if (l == r) {
            tree[node] = arr[l];
            return;
        }
        int mid = l + (r - l) / 2;
        build(2 * node, l, mid, arr);
        build(2 * node + 1, mid + 1, r, arr);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    private void push(int node, int l, int r) {
        if (lazy[node] != 0) {
            int mid = l + (r - l) / 2;
            tree[2 * node] += lazy[node] * (mid - l + 1);
            lazy[2 * node] += lazy[node];
            tree[2 * node + 1] += lazy[node] * (r - mid);
            lazy[2 * node + 1] += lazy[node];
            lazy[node] = 0;
        }
    }

    public void updateRange(int ql, int qr, long val) {
        update(1, 0, n - 1, ql, qr, val);
    }

    private void update(int node, int l, int r, int ql, int qr, long val) {
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

    public long queryRange(int ql, int qr) {
        return query(1, 0, n - 1, ql, qr);
    }

    private long query(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[node];
        push(node, l, r);
        int mid = l + (r - l) / 2;
        long sum = 0;
        if (ql <= mid) sum += query(2 * node, l, mid, ql, qr);
        if (qr > mid) sum += query(2 * node + 1, mid + 1, r, ql, qr);
        return sum;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        LazySegmentTree st = new LazySegmentTree(arr);
        System.out.println("Sum [1, 3]: " + st.queryRange(1, 3));
        st.updateRange(1, 3, 10);
        System.out.println("Updated Sum [1, 3]: " + st.queryRange(1, 3));
    }
}`,
      python: `class LazySegmentTree:
    def __init__(self, arr: list[int]):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)
        self._build(1, 0, self.n - 1, arr)

    def _build(self, node: int, l: int, r: int, arr: list[int]):
        if l == r:
            self.tree[node] = arr[l]
            return
        mid = l + (r - l) // 2
        self._build(2 * node, l, mid, arr)
        self._build(2 * node + 1, mid + 1, r, arr)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def _push(self, node: int, l: int, r: int):
        if self.lazy[node] != 0:
            mid = l + (r - l) // 2
            self.tree[2 * node] += self.lazy[node] * (mid - l + 1)
            self.lazy[2 * node] += self.lazy[node]
            self.tree[2 * node + 1] += self.lazy[node] * (r - mid)
            self.lazy[2 * node + 1] += self.lazy[node]
            self.lazy[node] = 0

    def update_range(self, ql: int, qr: int, val: int):
        self._update(1, 0, self.n - 1, ql, qr, val)

    def _update(self, node: int, l: int, r: int, ql: int, qr: int, val: int):
        if ql <= l and r <= qr:
            self.tree[node] += val * (r - l + 1)
            self.lazy[node] += val
            return
        self._push(node, l, r)
        mid = l + (r - l) // 2
        if ql <= mid:
            self._update(2 * node, l, mid, ql, qr, val)
        if qr > mid:
            self._update(2 * node + 1, mid + 1, r, ql, qr, val)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query_range(self, ql: int, qr: int) -> int:
        return self._query(1, 0, self.n - 1, ql, qr)

    def _query(self, node: int, l: int, r: int, ql: int, qr: int) -> int:
        if ql <= l and r <= qr:
            return self.tree[node]
        self._push(node, l, r)
        mid = l + (r - l) // 2
        total = 0
        if ql <= mid:
            total += self._query(2 * node, l, mid, ql, qr)
        if qr > mid:
            total += self._query(2 * node + 1, mid + 1, r, ql, qr)
        return total

if __name__ == "__main__":
    arr = [1, 2, 3, 4, 5]
    st = LazySegmentTree(arr)
    print("Sum [1, 3]:", st.query_range(1, 3))
    st.update_range(1, 3, 10)
    print("Updated Sum [1, 3]:", st.query_range(1, 3))`,
    },
  },
  {
    id: 'd13-note-2',
    title: 'Fenwick Tree (Binary Indexed Tree / BIT) & Inversion Counting',
    conceptSummary:
      'A Fenwick Tree (Binary Indexed Tree / BIT) provides O(log N) prefix sum queries and O(log N) point updates using only O(N) memory with zero pointer overhead. The key insight is that each index `i` stores the sum of a range of length `LSB(i) = i & (-i)` (the least significant set bit). Prefix sum queries traverse down by subtracting LSB: `i -= (i & -i)`. Point updates traverse up by adding LSB: `i += (i & -i)`. Fenwick Trees are exceptionally fast in CPU cache lines and solve Inversion Counting (LeetCode 315 "Count of Smaller Numbers After Self") and dynamic frequency counting.',
    timeSpaceNote: 'Time Complexity: O(log N) per query and update. Space Complexity: O(N) flat array.',
    kapilMentorTip:
      'Kapil Mentor Bitwise Secret: `i & (-i)` extracts the lowest set bit using two’s complement negation! Remember that Fenwick Trees are naturally 1-indexed. If given 0-indexed values or large coordinates, always coordinate-compress them first to range [1..M] before querying the BIT.',
    codeByLanguage: {
      c: `#include <stdio.h>

#define MAX_N 100005
int bit[MAX_N], N;

void add(int idx, int val) {
    for (; idx <= N; idx += idx & (-idx)) {
        bit[idx] += val;
    }
}

int query(int idx) {
    int sum = 0;
    for (; idx > 0; idx -= idx & (-idx)) {
        sum += bit[idx];
    }
    return sum;
}

int queryRange(int l, int r) {
    return query(r) - query(l - 1);
}

int main(void) {
    N = 5;
    for (int i = 1; i <= N; i++) add(i, i); // arr = [1, 2, 3, 4, 5]
    printf("Prefix sum(3): %d\\n", query(3)); // 1 + 2 + 3 = 6
    printf("Range sum(2, 4): %d\\n", queryRange(2, 4)); // 2 + 3 + 4 = 9
    add(3, 10); // add 10 to index 3
    printf("Updated Range sum(2, 4): %d\\n", queryRange(2, 4)); // 9 + 10 = 19
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class FenwickTree {
    int n;
    vector<int> bit;
public:
    FenwickTree(int n) : n(n), bit(n + 1, 0) {}

    void add(int idx, int val) {
        for (; idx <= n; idx += idx & (-idx)) {
            bit[idx] += val;
        }
    }

    int query(int idx) {
        int sum = 0;
        for (; idx > 0; idx -= idx & (-idx)) {
            sum += bit[idx];
        }
        return sum;
    }

    int queryRange(int l, int r) {
        return query(r) - query(l - 1);
    }
};

int main() {
    FenwickTree ft(5);
    for (int i = 1; i <= 5; ++i) ft.add(i, i);
    cout << "Range sum [2, 4]: " << ft.queryRange(2, 4) << endl;
    ft.add(3, 10);
    cout << "Updated Range sum [2, 4]: " << ft.queryRange(2, 4) << endl;
    return 0;
}`,
      java: `public class FenwickTree {
    private final int n;
    private final int[] bit;

    public FenwickTree(int n) {
        this.n = n;
        this.bit = new int[n + 1];
    }

    public void add(int idx, int val) {
        for (; idx <= n; idx += idx & (-idx)) {
            bit[idx] += val;
        }
    }

    public int query(int idx) {
        int sum = 0;
        for (; idx > 0; idx -= idx & (-idx)) {
            sum += bit[idx];
        }
        return sum;
    }

    public int queryRange(int l, int r) {
        return query(r) - query(l - 1);
    }

    public static void main(String[] args) {
        FenwickTree ft = new FenwickTree(5);
        for (int i = 1; i <= 5; i++) ft.add(i, i);
        System.out.println("Range sum [2, 4]: " + ft.queryRange(2, 4));
        ft.add(3, 10);
        System.out.println("Updated Range sum [2, 4]: " + ft.queryRange(2, 4));
    }
}`,
      python: `class FenwickTree:
    def __init__(self, n: int):
        self.n = n
        self.bit = [0] * (n + 1)

    def add(self, idx: int, val: int):
        while idx <= self.n:
            self.bit[idx] += val
            idx += idx & (-idx)

    def query(self, idx: int) -> int:
        total = 0
        while idx > 0:
            total += self.bit[idx]
            idx -= idx & (-idx)
        return total

    def query_range(self, l: int, r: int) -> int:
        return self.query(r) - self.query(l - 1)

if __name__ == "__main__":
    ft = FenwickTree(5)
    for i in range(1, 6):
        ft.add(i, i)
    print("Range sum [2, 4]:", ft.query_range(2, 4))
    ft.add(3, 10)
    print("Updated Range sum [2, 4]:", ft.query_range(2, 4))`,
    },
  },
  {
    id: 'd13-note-3',
    title: 'Sparse Table: O(1) Range Minimum / Maximum Query (RMQ)',
    conceptSummary:
      'Sparse Table is a static range query data structure that answers Range Minimum/Maximum Queries in O(1) time after O(N log N) preprocessing. It relies on precomputing table[k][i] = range minimum of interval [i, i + 2^k - 1]. Because minimum/maximum is an idempotent operation (min(x, x) = x), any arbitrary interval [L, R] of length len = R - L + 1 can be covered by two overlapping intervals of length 2^k where k = floor(log2(len)): RMQ(L, R) = min(table[k][L], table[k][R - 2^k + 1]). Since the intervals overlap without changing the minimum, the query requires only a single O(1) lookup.',
    timeSpaceNote: 'Time Complexity: O(N log N) precomputation, O(1) per query. Space Complexity: O(N log N) table.',
    kapilMentorTip:
      'Kapil Invariant Warning: Sparse Table only works in O(1) for IDEMPOTENT operations (min, max, gcd, bitwise AND/OR). It cannot answer sum queries in O(1) because overlapping regions would be counted twice (for sums, use Fenwick or Segment Tree). Precompute a log2 table in O(N) to avoid calling std::log2 inside competitive loops.',
    codeByLanguage: {
      c: `#include <stdio.h>

#define MAX_N 100005
#define MAX_LOG 18
#define MIN(a, b) ((a) < (b) ? (a) : (b))

int st[MAX_LOG][MAX_N];
int lg[MAX_N];

void buildSparseTable(const int* arr, int n) {
    lg[1] = 0;
    for (int i = 2; i <= n; i++) lg[i] = lg[i / 2] + 1;

    for (int i = 0; i < n; i++) st[0][i] = arr[i];

    for (int k = 1; (1 << k) <= n; k++) {
        for (int i = 0; i + (1 << k) <= n; i++) {
            st[k][i] = MIN(st[k - 1][i], st[k - 1][i + (1 << (k - 1))]);
        }
    }
}

int queryRMQ(int l, int r) {
    int k = lg[r - l + 1];
    return MIN(st[k][l], st[k][r - (1 << k) + 1]);
}

int main(void) {
    int arr[] = {7, 2, 3, 0, 5, 10, 3, 12, 18};
    buildSparseTable(arr, 9);
    printf("RMQ [0, 4]: %d\\n", queryRMQ(0, 4)); // min(7, 2, 3, 0, 5) = 0
    printf("RMQ [4, 7]: %d\\n", queryRMQ(4, 7)); // min(5, 10, 3, 12) = 3
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class SparseTable {
    int n, maxLog;
    vector<vector<int>> st;
    vector<int> lg;
public:
    SparseTable(const vector<int>& arr) : n(arr.size()), maxLog(32 - __builtin_clz(n)) {
        lg.assign(n + 1, 0);
        for (int i = 2; i <= n; ++i) lg[i] = lg[i / 2] + 1;

        st.assign(maxLog, vector<int>(n));
        st[0] = arr;

        for (int k = 1; (1 << k) <= n; ++k) {
            for (int i = 0; i + (1 << k) <= n; ++i) {
                st[k][i] = min(st[k - 1][i], st[k - 1][i + (1 << (k - 1))]);
            }
        }
    }

    int query(int l, int r) {
        int k = lg[r - l + 1];
        return min(st[k][l], st[k][r - (1 << k) + 1]);
    }
};

int main() {
    vector<int> arr = {7, 2, 3, 0, 5, 10, 3, 12, 18};
    SparseTable st(arr);
    cout << "RMQ [0, 4]: " << st.query(0, 4) << endl;
    cout << "RMQ [4, 7]: " << st.query(4, 7) << endl;
    return 0;
}`,
      java: `public class SparseTable {
    private final int[][] st;
    private final int[] lg;

    public SparseTable(int[] arr) {
        int n = arr.length;
        this.lg = new int[n + 1];
        for (int i = 2; i <= n; i++) lg[i] = lg[i / 2] + 1;

        int maxLog = lg[n] + 1;
        this.st = new int[maxLog][n];
        System.arraycopy(arr, 0, st[0], 0, n);

        for (int k = 1; (1 << k) <= n; k++) {
            for (int i = 0; i + (1 << k) <= n; i++) {
                st[k][i] = Math.min(st[k - 1][i], st[k - 1][i + (1 << (k - 1))]);
            }
        }
    }

    public int query(int l, int r) {
        int k = lg[r - l + 1];
        return Math.min(st[k][l], st[k][r - (1 << k) + 1]);
    }

    public static void main(String[] args) {
        int[] arr = {7, 2, 3, 0, 5, 10, 3, 12, 18};
        SparseTable st = new SparseTable(arr);
        System.out.println("RMQ [0, 4]: " + st.query(0, 4));
        System.out.println("RMQ [4, 7]: " + st.query(4, 7));
    }
}`,
      python: `import math

class SparseTable:
    def __init__(self, arr: list[int]):
        n = len(arr)
        self.lg = [0] * (n + 1)
        for i in range(2, n + 1):
            self.lg[i] = self.lg[i // 2] + 1

        max_log = self.lg[n] + 1
        self.st = [[0] * n for _ in range(max_log)]
        self.st[0] = list(arr)

        for k in range(1, max_log):
            span = 1 << k
            half = 1 << (k - 1)
            for i in range(n - span + 1):
                self.st[k][i] = min(self.st[k - 1][i], self.st[k - 1][i + half])

    def query(self, l: int, r: int) -> int:
        k = self.lg[r - l + 1]
        return min(self.st[k][l], self.st[k][r - (1 << k) + 1])

if __name__ == "__main__":
    arr = [7, 2, 3, 0, 5, 10, 3, 12, 18]
    st = SparseTable(arr)
    print("RMQ [0, 4]:", st.query(0, 4))
    print("RMQ [4, 7]:", st.query(4, 7))`,
    },
  },
  {
    id: 'd13-note-4',
    title: 'Knuth-Morris-Pratt (KMP) & Prefix Function: Linear O(N + M) Exact Matching',
    conceptSummary:
      'The Knuth-Morris-Pratt (KMP) algorithm finds all occurrences of pattern P of length M inside text T of length N in strictly linear O(N + M) time. A naive search backtracks when characters mismatch, incurring O(N * M) worst-case time. KMP precomputes the $\\pi$ (prefix function) array for pattern P, where $\\pi[i]$ is the length of the longest proper prefix of P[0..i] that is also a suffix of P[0..i]. On a mismatch at index `j`, instead of resetting `i` back to the start, KMP shifts the pattern so that index `j` becomes $\\pi[j - 1]$, skipping redundant comparisons while guaranteeing no valid matches are missed.',
    timeSpaceNote: 'Time Complexity: O(M) preprocessing, O(N) search pass = O(N + M). Space Complexity: O(M) for the $\\pi$ array.',
    kapilMentorTip:
      'Kapil Invariant Insight: The prefix function $\\pi$ encodes string periodicity! If $n \\pmod{n - \\pi[n - 1]} == 0$, the entire string is formed by repeating a substring of length $n - \\pi[n - 1]$. Also, running KMP on string $S + \\# + \\text{reverse}(S)$ immediately finds the longest palindromic prefix in O(N), solving LeetCode 214 "Shortest Palindrome".',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>

void computeLPS(const char* pat, int m, int* lps) {
    int len = 0;
    lps[0] = 0;
    int i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i++] = len;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i++] = 0;
            }
        }
    }
}

int kmpSearch(const char* txt, const char* pat) {
    int n = strlen(txt);
    int m = strlen(pat);
    int lps[m];
    computeLPS(pat, m, lps);

    int i = 0, j = 0;
    while (i < n) {
        if (pat[j] == txt[i]) {
            i++; j++;
        }
        if (j == m) {
            return i - j; // Match found at index (i - j)
        } else if (i < n && pat[j] != txt[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
    return -1;
}

int main(void) {
    const char* txt = "ABABDABACDABABCABAB";
    const char* pat = "ABABCABAB";
    int pos = kmpSearch(txt, pat);
    printf("Pattern found at index: %d\\n", pos); // Output: 10
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

vector<int> computePrefixFunction(const string& s) {
    int n = s.size();
    vector<int> pi(n, 0);
    for (int i = 1; i < n; ++i) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j]) j = pi[j - 1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }
    return pi;
}

int kmpSearch(const string& text, const string& pattern) {
    if (pattern.empty()) return 0;
    vector<int> pi = computePrefixFunction(pattern);
    int j = 0;
    for (size_t i = 0; i < text.size(); ++i) {
        while (j > 0 && text[i] != pattern[j]) j = pi[j - 1];
        if (text[i] == pattern[j]) j++;
        if (j == (int)pattern.size()) return i - j + 1;
    }
    return -1;
}

int main() {
    string txt = "ABABDABACDABABCABAB";
    string pat = "ABABCABAB";
    cout << "KMP Match Position: " << kmpSearch(txt, pat) << endl;
    return 0;
}`,
      java: `public class KmpSearch {
    public static int[] computeLps(String pat) {
        int m = pat.length();
        int[] lps = new int[m];
        int len = 0, i = 1;
        while (i < m) {
            if (pat.charAt(i) == pat.charAt(len)) {
                len++;
                lps[i++] = len;
            } else {
                if (len != 0) len = lps[len - 1];
                else lps[i++] = 0;
            }
        }
        return lps;
    }

    public static int search(String txt, String pat) {
        int n = txt.length(), m = pat.length();
        if (m == 0) return 0;
        int[] lps = computeLps(pat);
        int i = 0, j = 0;
        while (i < n) {
            if (pat.charAt(j) == txt.charAt(i)) {
                i++; j++;
            }
            if (j == m) return i - j;
            else if (i < n && pat.charAt(j) != txt.charAt(i)) {
                if (j != 0) j = lps[j - 1];
                else i++;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        String txt = "ABABDABACDABABCABAB";
        String pat = "ABABCABAB";
        System.out.println("Match at index: " + search(txt, pat));
    }
}`,
      python: `def compute_prefix_function(s: str) -> list[int]:
    n = len(s)
    pi = [0] * n
    for i in range(1, n):
        j = pi[i - 1]
        while j > 0 and s[i] != s[j]:
            j = pi[j - 1]
        if s[i] == s[j]:
            j += 1
        pi[i] = j
    return pi

def kmp_search(txt: str, pat: str) -> int:
    if not pat:
        return 0
    pi = compute_prefix_function(pat)
    j = 0
    for i, ch in enumerate(txt):
        while j > 0 and ch != pat[j]:
            j = pi[j - 1]
        if ch == pat[j]:
            j += 1
        if j == len(pat):
            return i - j + 1
    return -1

if __name__ == "__main__":
    txt = "ABABDABACDABABCABAB"
    pat = "ABABCABAB"
    print("Match at index:", kmp_search(txt, pat))`,
    },
  },
  {
    id: 'd13-note-5',
    title: 'Bitwise XOR Trie: Maximum XOR Pair & Prefix Subarray in O(32·N)',
    conceptSummary:
      'A Bitwise Trie represents 32-bit integers as binary paths of length 31 from the root (MSB bit 31) to leaf (LSB bit 0). Each node has at most two children (0 and 1). In the classic Maximum XOR of Two Numbers problem (LeetCode 421) and Maximum XOR Subarray: to maximize `num ^ query`, we greedily traverse the Trie by attempting to take the OPPOSITE bit at each level: `desiredBit = 1 - currentBit`. If a child with `desiredBit` exists, we follow it and set the corresponding bit of our running XOR to 1; otherwise, we must take `currentBit`. Inserting and querying each number takes exactly 32 steps, solving an otherwise O(N^2) search in optimal linear O(32 * N) time.',
    timeSpaceNote: 'Time Complexity: O(32 * N) for N insertions and queries. Space Complexity: O(32 * N) node references.',
    kapilMentorTip:
      'Kapil Invariant Property: Recall that subarray XOR sum can be transformed using prefix XORs: `xor(i..j) = prefixXor[j] ^ prefixXor[i-1]`. Therefore, finding the Maximum XOR Subarray in an array reduces directly to finding two prefix XOR values that maximize their XOR pair, which is solved in O(32 * N) with a Bitwise Trie! Always insert 0 initially to represent an empty prefix.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

typedef struct TrieNode {
    struct TrieNode* next[2];
} TrieNode;

TrieNode* createNode(void) {
    TrieNode* node = (TrieNode*)malloc(sizeof(TrieNode));
    node->next[0] = node->next[1] = NULL;
    return node;
}

void insert(TrieNode* root, int num) {
    TrieNode* curr = root;
    for (int i = 31; i >= 0; i--) {
        int bit = (num >> i) & 1;
        if (!curr->next[bit]) curr->next[bit] = createNode();
        curr = curr->next[bit];
    }
}

int queryMaxXOR(TrieNode* root, int num) {
    TrieNode* curr = root;
    int maxVal = 0;
    for (int i = 31; i >= 0; i--) {
        int bit = (num >> i) & 1;
        int want = 1 - bit;
        if (curr->next[want]) {
            maxVal |= (1 << i);
            curr = curr->next[want];
        } else {
            curr = curr->next[bit];
        }
    }
    return maxVal;
}

int findMaximumXOR(int* nums, int numsSize) {
    TrieNode* root = createNode();
    for (int i = 0; i < numsSize; i++) insert(root, nums[i]);
    int maxResult = 0;
    for (int i = 0; i < numsSize; i++) {
        maxResult = MAX(maxResult, queryMaxXOR(root, nums[i]));
    }
    return maxResult;
}

int main(void) {
    int nums[] = {3, 10, 5, 25, 2, 8};
    printf("Maximum XOR Pair (C17): %d\\n", findMaximumXOR(nums, 6)); // Output: 28 (5 ^ 25 = 28)
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct TrieNode {
    TrieNode* next[2] = {nullptr, nullptr};
};

class BitwiseXorTrie {
    TrieNode* root;
public:
    BitwiseXorTrie() : root(new TrieNode()) {}

    void insert(int num) {
        TrieNode* curr = root;
        for (int i = 31; i >= 0; --i) {
            int bit = (num >> i) & 1;
            if (!curr->next[bit]) curr->next[bit] = new TrieNode();
            curr = curr->next[bit];
        }
    }

    int getMaxXor(int num) {
        TrieNode* curr = root;
        int maxVal = 0;
        for (int i = 31; i >= 0; --i) {
            int bit = (num >> i) & 1;
            int want = 1 - bit;
            if (curr->next[want]) {
                maxVal |= (1 << i);
                curr = curr->next[want];
            } else {
                curr = curr->next[bit];
            }
        }
        return maxVal;
    }
};

int findMaximumXOR(const vector<int>& nums) {
    BitwiseXorTrie trie;
    for (int x : nums) trie.insert(x);
    int maxXor = 0;
    for (int x : nums) maxXor = max(maxXor, trie.getMaxXor(x));
    return maxXor;
}

int main() {
    vector<int> nums = {3, 10, 5, 25, 2, 8};
    cout << "Maximum XOR Pair (C++20): " << findMaximumXOR(nums) << endl;
    return 0;
}`,
      java: `public class BitwiseXorTrie {
    static class Node {
        Node[] next = new Node[2];
    }

    private final Node root = new Node();

    public void insert(int num) {
        Node curr = root;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (curr.next[bit] == null) curr.next[bit] = new Node();
            curr = curr.next[bit];
        }
    }

    public int getMaxXor(int num) {
        Node curr = root;
        int maxVal = 0;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            int want = 1 - bit;
            if (curr.next[want] != null) {
                maxVal |= (1 << i);
                curr = curr.next[want];
            } else {
                curr = curr.next[bit];
            }
        }
        return maxVal;
    }

    public static int findMaximumXOR(int[] nums) {
        BitwiseXorTrie trie = new BitwiseXorTrie();
        for (int x : nums) trie.insert(x);
        int maxVal = 0;
        for (int x : nums) maxVal = Math.max(maxVal, trie.getMaxXor(x));
        return maxVal;
    }

    public static void main(String[] args) {
        int[] nums = {3, 10, 5, 25, 2, 8};
        System.out.println("Maximum XOR (Java 21): " + findMaximumXOR(nums));
    }
}`,
      python: `class TrieNode:
    def __init__(self):
        self.next = [None, None]

class BitwiseXorTrie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, num: int):
        curr = self.root
        for i in range(31, -1, -1):
            bit = (num >> i) & 1
            if not curr.next[bit]:
                curr.next[bit] = TrieNode()
            curr = curr.next[bit]

    def get_max_xor(self, num: int) -> int:
        curr = self.root
        max_val = 0
        for i in range(31, -1, -1):
            bit = (num >> i) & 1
            want = 1 - bit
            if curr.next[want]:
                max_val |= (1 << i)
                curr = curr.next[want]
            else:
                curr = curr.next[bit]
        return max_val

def find_maximum_xor(nums: list[int]) -> int:
    trie = BitwiseXorTrie()
    for x in nums:
        trie.insert(x)
    return max(trie.get_max_xor(x) for x in nums)

if __name__ == "__main__":
    nums = [3, 10, 5, 25, 2, 8]
    print("Maximum XOR Pair (Python 3.12):", find_maximum_xor(nums))`,
    },
  },
];

const fileContent = `import { ProgrammingNote } from '../types';

/**
 * Day 13 High-Yield Polyglot Programming Notes (5 Placement Mastery Notes)
 * Module 14: Advanced Range Query Data Structures & String Algorithms
 * Mentor: Kapil (Placement Readiness Program)
 * Full Polyglot Coverage: C (C17), C++ (C++20), Java (Java 21), Python (Python 3.12)
 */

export const DAY_13_PROGRAMMING_NOTES: ProgrammingNote[] = ${JSON.stringify(notes, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/day13ProgrammingNotes.ts'), fileContent, 'utf8');
console.log('Successfully wrote src/data/day13ProgrammingNotes.ts');
