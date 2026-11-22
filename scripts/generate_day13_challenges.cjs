const fs = require('fs');
const path = require('path');

const challenges = [
  // 1. Range Sum Query - Mutable
  {
    id: 'd13-ch-1',
    day: 13,
    title: 'Range Sum Query - Mutable (Fenwick Tree / Segment Tree)',
    difficulty: 'Medium',
    moduleTag: '14. Range Queries & Strings',
    companies: ['Google', 'Amazon', 'Meta'],
    platforms: ['LeetCode'],
    problemStatement:
      'Given an integer array nums and Q operations, handle two types of operations:\n1. `1 idx val`: Update nums[idx] by adding `val`.\n2. `2 l r`: Compute the sum of the elements of nums between indices l and r inclusive (0-indexed).',
    inputFormat: 'First line: N Q (array size and number of queries).\nSecond line: N space-separated integers.\nNext Q lines: operation `1 idx val` or `2 l r`.',
    outputFormat: 'For each type 2 operation, output the sum on a new line.',
    constraints: ['1 <= N, Q <= 10^5', '-10^4 <= nums[i] <= 10^4', '0 <= idx < N', '0 <= l <= r < N'],
    sampleInput: '5 3\n1 2 3 4 5\n2 1 3\n1 2 10\n2 1 3',
    sampleOutput: '9\n19',
    kapilIntuition:
      'Mentorship By Kapil: Use a 1-indexed Fenwick Tree (Binary Indexed Tree). An update `add(idx + 1, val)` runs in O(log N) by moving up via `i += i & (-i)`. A range sum query `sum(r) - sum(l - 1)` runs in O(log N) by moving down via `i -= i & (-i)`. This completely outperforms an O(N) linear scan or O(N) array update.',
    timeComplexity: 'O(log N) per operation',
    spaceComplexity: 'O(N)',
    testCases: [
      { id: 'tc-1', input: '5 3\n1 2 3 4 5\n2 1 3\n1 2 10\n2 1 3', expectedOutput: '9\n19', isHidden: false, explanation: 'Initial sum [1..3] is 2+3+4=9. After adding 10 to index 2, sum becomes 2+13+4=19.' },
      { id: 'tc-2', input: '3 2\n10 20 30\n2 0 2\n2 1 1', expectedOutput: '60\n20', isHidden: false, explanation: 'Sum of all 3 is 60, single element at index 1 is 20.' },
      { id: 'tc-3', input: '1 2\n5\n2 0 0\n1 0 5\n2 0 0', expectedOutput: '5\n10', isHidden: true, explanation: 'Single element updated from 5 to 10.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, Q;
    if (scanf("%d %d", &N, &Q) != 2) return 0;
    // Implement Fenwick Tree
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, Q;
    if (!(cin >> N >> Q)) return 0;
    // Implement Fenwick Tree
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int Q = sc.nextInt();
        // Implement Fenwick Tree
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, q = int(lines[0]), int(lines[1])
    # Implement Fenwick Tree

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>

#define MAX_N 100005
long long bit[MAX_N];
int N;

void add(int idx, long long val) {
    for (; idx <= N; idx += idx & (-idx)) bit[idx] += val;
}

long long query(int idx) {
    long long sum = 0;
    for (; idx > 0; idx -= idx & (-idx)) sum += bit[idx];
    return sum;
}

int main() {
    int Q;
    if (scanf("%d %d", &N, &Q) != 2) return 0;
    for (int i = 1; i <= N; i++) {
        long long val;
        scanf("%lld", &val);
        add(i, val);
    }
    while (Q--) {
        int type;
        scanf("%d", &type);
        if (type == 1) {
            int idx; long long val;
            scanf("%d %lld", &idx, &val);
            add(idx + 1, val);
        } else {
            int l, r;
            scanf("%d %d", &l, &r);
            printf("%lld\\n", query(r + 1) - query(l));
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class FenwickTree {
    int n;
    vector<long long> bit;
public:
    FenwickTree(int n) : n(n), bit(n + 1, 0) {}
    void add(int idx, long long val) {
        for (; idx <= n; idx += idx & (-idx)) bit[idx] += val;
    }
    long long query(int idx) {
        long long sum = 0;
        for (; idx > 0; idx -= idx & (-idx)) sum += bit[idx];
        return sum;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N, Q;
    if (!(cin >> N >> Q)) return 0;
    FenwickTree ft(N);
    for (int i = 1; i <= N; ++i) {
        long long val; cin >> val;
        ft.add(i, val);
    }
    while (Q--) {
        int type; cin >> type;
        if (type == 1) {
            int idx; long long val;
            cin >> idx >> val;
            ft.add(idx + 1, val);
        } else {
            int l, r;
            cin >> l >> r;
            cout << ft.query(r + 1) - ft.query(l) << "\\n";
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    static class Fenwick {
        int n;
        long[] bit;
        Fenwick(int n) { this.n = n; this.bit = new long[n + 1]; }
        void add(int idx, long val) {
            for (; idx <= n; idx += idx & (-idx)) bit[idx] += val;
        }
        long query(int idx) {
            long sum = 0;
            for (; idx > 0; idx -= idx & (-idx)) sum += bit[idx];
            return sum;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int Q = sc.nextInt();
        Fenwick ft = new Fenwick(N);
        for (int i = 1; i <= N; i++) {
            ft.add(i, sc.nextLong());
        }
        while (Q-- > 0) {
            int type = sc.nextInt();
            if (type == 1) {
                int idx = sc.nextInt();
                long val = sc.nextLong();
                ft.add(idx + 1, val);
            } else {
                int l = sc.nextInt();
                int r = sc.nextInt();
                System.out.println(ft.query(r + 1) - ft.query(l));
            }
        }
    }
}`,
      python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n, q = int(input_data[0]), int(input_data[1])
    bit = [0] * (n + 1)

    def add(idx, val):
        while idx <= n:
            bit[idx] += val
            idx += idx & (-idx)

    def query(idx):
        total = 0
        while idx > 0:
            total += bit[idx]
            idx -= idx & (-idx)
        return total

    idx = 2
    for i in range(1, n + 1):
        add(i, int(input_data[idx]))
        idx += 1

    out = []
    for _ in range(q):
        t = int(input_data[idx])
        if t == 1:
            p, v = int(input_data[idx + 1]), int(input_data[idx + 2])
            idx += 3
            add(p + 1, v)
        else:
            l, r = int(input_data[idx + 1]), int(input_data[idx + 2])
            idx += 3
            out.append(str(query(r + 1) - query(l)))

    print('\\n'.join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 2. Range Update and Range Query with Lazy Propagation
  {
    id: 'd13-ch-2',
    day: 13,
    title: 'Range Update and Range Query with Lazy Propagation',
    difficulty: 'Hard',
    moduleTag: '14. Range Queries & Strings',
    companies: ['Google', 'Meta', 'Microsoft'],
    platforms: ['Codeforces', 'HackerRank'],
    problemStatement:
      'Given an initial array of N zeros and Q operations:\n1. `1 l r val`: Add `val` to every element in range [l, r] (0-indexed).\n2. `2 l r`: Compute the sum of elements in range [l, r].',
    inputFormat: 'First line: N Q.\nNext Q lines: `1 l r val` or `2 l r`.',
    outputFormat: 'For each type 2 operation, output the range sum.',
    constraints: ['1 <= N, Q <= 10^5', '0 <= l <= r < N', '-10^4 <= val <= 10^4'],
    sampleInput: '5 3\n1 0 2 5\n1 2 4 10\n2 1 3',
    sampleOutput: '30',
    kapilIntuition:
      'Mentorship By Kapil: Maintain a Segment Tree of size 4N with a `lazy` array. When range [l, r] is updated, if the current tree node interval is completely inside [l, r], update `tree[node] += val * len`, set `lazy[node] += val`, and return immediately. When recursing into children, push the pending lazy value down first.',
    timeComplexity: 'O(log N) per operation',
    spaceComplexity: 'O(4N)',
    testCases: [
      { id: 'tc-1', input: '5 3\n1 0 2 5\n1 2 4 10\n2 1 3', expectedOutput: '30', isHidden: false, explanation: 'Indices: [5, 5, 15, 10, 10]. Range [1, 3] sum = 5 + 15 + 10 = 30.' },
      { id: 'tc-2', input: '4 2\n1 0 3 2\n2 0 3', expectedOutput: '8', isHidden: false, explanation: 'All 4 elements become 2, sum is 8.' },
      { id: 'tc-3', input: '1 2\n1 0 0 7\n2 0 0', expectedOutput: '7', isHidden: true, explanation: 'Single element update and query.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, Q;
    if (scanf("%d %d", &N, &Q) != 2) return 0;
    // Implement Lazy Segment Tree
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, Q;
    if (!(cin >> N >> Q)) return 0;
    // Implement Lazy Segment Tree
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int Q = sc.nextInt();
        // Implement Lazy Segment Tree
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, q = int(lines[0]), int(lines[1])
    # Implement Lazy Segment Tree

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>

#define MAX_N 100005
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

int main() {
    int N, Q;
    if (scanf("%d %d", &N, &Q) != 2) return 0;
    while (Q--) {
        int type;
        scanf("%d", &type);
        if (type == 1) {
            int l, r; long long val;
            scanf("%d %d %lld", &l, &r, &val);
            update(1, 0, N - 1, l, r, val);
        } else {
            int l, r;
            scanf("%d %d", &l, &r);
            printf("%lld\\n", query(1, 0, N - 1, l, r));
        }
    }
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
    LazySegmentTree(int n) : n(n), tree(4 * n, 0), lazy(4 * n, 0) {}
    void updateRange(int ql, int qr, long long val) { update(1, 0, n - 1, ql, qr, val); }
    long long queryRange(int ql, int qr) { return query(1, 0, n - 1, ql, qr); }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N, Q;
    if (!(cin >> N >> Q)) return 0;
    LazySegmentTree st(N);
    while (Q--) {
        int type; cin >> type;
        if (type == 1) {
            int l, r; long long val;
            cin >> l >> r >> val;
            st.updateRange(l, r, val);
        } else {
            int l, r; cin >> l >> r;
            cout << st.queryRange(l, r) << "\\n";
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    static class LazySegmentTree {
        int n;
        long[] tree, lazy;
        LazySegmentTree(int n) {
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

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int Q = sc.nextInt();
        LazySegmentTree st = new LazySegmentTree(N);
        while (Q-- > 0) {
            int type = sc.nextInt();
            if (type == 1) {
                int l = sc.nextInt();
                int r = sc.nextInt();
                long val = sc.nextLong();
                st.update(1, 0, N - 1, l, r, val);
            } else {
                int l = sc.nextInt();
                int r = sc.nextInt();
                System.out.println(st.query(1, 0, N - 1, l, r));
            }
        }
    }
}`,
      python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n, q = int(input_data[0]), int(input_data[1])
    tree = [0] * (4 * n)
    lazy = [0] * (4 * n)

    def push(node, l, r):
        if lazy[node] != 0:
            mid = l + (r - l) // 2
            tree[2 * node] += lazy[node] * (mid - l + 1)
            lazy[2 * node] += lazy[node]
            tree[2 * node + 1] += lazy[node] * (r - mid)
            lazy[2 * node + 1] += lazy[node]
            lazy[node] = 0

    def update(node, l, r, ql, qr, val):
        if ql <= l and r <= qr:
            tree[node] += val * (r - l + 1)
            lazy[node] += val
            return
        push(node, l, r)
        mid = l + (r - l) // 2
        if ql <= mid:
            update(2 * node, l, mid, ql, qr, val)
        if qr > mid:
            update(2 * node + 1, mid + 1, r, ql, qr, val)
        tree[node] = tree[2 * node] + tree[2 * node + 1]

    def query(node, l, r, ql, qr):
        if ql <= l and r <= qr:
            return tree[node]
        push(node, l, r)
        mid = l + (r - l) // 2
        total = 0
        if ql <= mid:
            total += query(2 * node, l, mid, ql, qr)
        if qr > mid:
            total += query(2 * node + 1, mid + 1, r, ql, qr)
        return total

    idx = 2
    out = []
    for _ in range(q):
        t = int(input_data[idx])
        if t == 1:
            l, r, v = int(input_data[idx + 1]), int(input_data[idx + 2]), int(input_data[idx + 3])
            idx += 4
            update(1, 0, n - 1, l, r, v)
        else:
            l, r = int(input_data[idx + 1]), int(input_data[idx + 2])
            idx += 3
            out.append(str(query(1, 0, n - 1, l, r)))

    print('\\n'.join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 3. Count of Smaller Numbers After Self
  {
    id: 'd13-ch-3',
    day: 13,
    title: 'Count of Smaller Numbers After Self (Fenwick Inversion Counting)',
    difficulty: 'Hard',
    moduleTag: '14. Range Queries & Strings',
    companies: ['Google', 'Meta', 'Amazon'],
    platforms: ['LeetCode'],
    problemStatement:
      'Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].',
    inputFormat: 'First line: N (number of elements).\nSecond line: N space-separated integers.',
    outputFormat: 'Space-separated integers representing counts.',
    constraints: ['1 <= N <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    sampleInput: '4\n5 2 6 1',
    sampleOutput: '2 1 1 0',
    kapilIntuition:
      'Mentorship By Kapil: Iterate from right to left! Since numbers can be negative, offset values by +10001 (or coordinate compress). For each number, query the Fenwick Tree for count of elements strictly smaller than `val`: `query(val - 1)`. Then add 1 to the frequency of `val`: `add(val, 1)`. Reversing the answer gives the exact counts in O(N log M) time.',
    timeComplexity: 'O(N log M) where M is range of values',
    spaceComplexity: 'O(M)',
    testCases: [
      { id: 'tc-1', input: '4\n5 2 6 1', expectedOutput: '2 1 1 0', isHidden: false, explanation: 'To the right of 5: 2 and 1 (2). Right of 2: 1 (1). Right of 6: 1 (1). Right of 1: none (0).' },
      { id: 'tc-2', input: '2\n-1 -1', expectedOutput: '0 0', isHidden: false, explanation: 'Equal elements are not smaller.' },
      { id: 'tc-3', input: '1\n10', expectedOutput: '0', isHidden: true, explanation: 'Single element has 0 smaller elements.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N;
    if (scanf("%d", &N) != 1) return 0;
    // Implement Fenwick Inversion Counting
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N;
    if (!(cin >> N)) return 0;
    // Implement Fenwick Inversion Counting
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        // Implement Fenwick Inversion Counting
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    # Implement Fenwick Inversion Counting

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>

#define OFFSET 10001
#define MAX_VAL 20005

int bit[MAX_VAL + 5];

void add(int idx, int val) {
    for (; idx <= MAX_VAL; idx += idx & (-idx)) bit[idx] += val;
}

int query(int idx) {
    int sum = 0;
    for (; idx > 0; idx -= idx & (-idx)) sum += bit[idx];
    return sum;
}

int main() {
    int N;
    if (scanf("%d", &N) != 1) return 0;
    int nums[100005], ans[100005];
    for (int i = 0; i < N; i++) scanf("%d", &nums[i]);

    for (int i = N - 1; i >= 0; i--) {
        int val = nums[i] + OFFSET;
        ans[i] = query(val - 1);
        add(val, 1);
    }

    for (int i = 0; i < N; i++) {
        printf("%d%c", ans[i], i == N - 1 ? '\\n' : ' ');
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

const int OFFSET = 10001;
const int MAX_VAL = 20005;

struct Fenwick {
    vector<int> bit;
    Fenwick() : bit(MAX_VAL + 5, 0) {}
    void add(int idx, int val) {
        for (; idx <= MAX_VAL; idx += idx & (-idx)) bit[idx] += val;
    }
    int query(int idx) {
        int sum = 0;
        for (; idx > 0; idx -= idx & (-idx)) sum += bit[idx];
        return sum;
    }
};

int main() {
    int N;
    if (!(cin >> N)) return 0;
    vector<int> nums(N), ans(N);
    for (int i = 0; i < N; ++i) cin >> nums[i];

    Fenwick ft;
    for (int i = N - 1; i >= 0; --i) {
        int val = nums[i] + OFFSET;
        ans[i] = ft.query(val - 1);
        ft.add(val, 1);
    }

    for (int i = 0; i < N; ++i) {
        cout << ans[i] << (i == N - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    static final int OFFSET = 10001;
    static final int MAX_VAL = 20005;

    static class Fenwick {
        int[] bit = new int[MAX_VAL + 5];
        void add(int idx, int val) {
            for (; idx <= MAX_VAL; idx += idx & (-idx)) bit[idx] += val;
        }
        int query(int idx) {
            int sum = 0;
            for (; idx > 0; idx -= idx & (-idx)) sum += bit[idx];
            return sum;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int[] nums = new int[N];
        for (int i = 0; i < N; i++) nums[i] = sc.nextInt();

        Fenwick ft = new Fenwick();
        int[] ans = new int[N];
        for (int i = N - 1; i >= 0; i--) {
            int val = nums[i] + OFFSET;
            ans[i] = ft.query(val - 1);
            ft.add(val, 1);
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < N; i++) {
            sb.append(ans[i]).append(i == N - 1 ? "" : " ");
        }
        System.out.println(sb);
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    nums = [int(x) for x in lines[1:]]

    offset = 10001
    max_val = 20005
    bit = [0] * (max_val + 5)

    def add(idx, val):
        while idx <= max_val:
            bit[idx] += val
            idx += idx & (-idx)

    def query(idx):
        total = 0
        while idx > 0:
            total += bit[idx]
            idx -= idx & (-idx)
        return total

    ans = [0] * n
    for i in range(n - 1, -1, -1):
        v = nums[i] + offset
        ans[i] = query(v - 1)
        add(v, 1)

    print(*(ans))

if __name__ == '__main__':
    main()`
    }
  },

  // 4. Range Minimum Query in O(1) (Sparse Table)
  {
    id: 'd13-ch-4',
    day: 13,
    title: 'Range Minimum Query in O(1) (Sparse Table)',
    difficulty: 'Medium',
    moduleTag: '14. Range Queries & Strings',
    companies: ['Apple', 'Amazon', 'Citadel'],
    platforms: ['SPOJ', 'Codeforces'],
    problemStatement:
      'Given an array of N integers and Q range minimum queries [L, R] (0-indexed). Answer each query in O(1) time using a Sparse Table.',
    inputFormat: 'First line: N Q.\nSecond line: N space-separated integers.\nNext Q lines: L R.',
    outputFormat: 'For each query, output the minimum element in range [L, R] on a new line.',
    constraints: ['1 <= N, Q <= 10^5', '0 <= L <= R < N', '-10^9 <= nums[i] <= 10^9'],
    sampleInput: '6 3\n4 2 3 7 1 5\n0 2\n1 4\n3 5',
    sampleOutput: '2\n1\n1',
    kapilIntuition:
      'Mentorship By Kapil: Build a 2D table st[k][i] = min(st[k-1][i], st[k-1][i + 2^(k-1)]). Precompute a log table in O(N). For query [L, R], let k = log2(R - L + 1). Return min(st[k][L], st[k][R - 2^k + 1]). This is guaranteed O(1) per query.',
    timeComplexity: 'O(N log N) build, O(1) query',
    spaceComplexity: 'O(N log N)',
    testCases: [
      { id: 'tc-1', input: '6 3\n4 2 3 7 1 5\n0 2\n1 4\n3 5', expectedOutput: '2\n1\n1', isHidden: false, explanation: 'min(4,2,3)=2; min(2,3,7,1)=1; min(7,1,5)=1.' },
      { id: 'tc-2', input: '3 1\n9 9 9\n0 2', expectedOutput: '9', isHidden: false, explanation: 'Identical elements.' },
      { id: 'tc-3', input: '4 2\n-5 10 -20 3\n0 3\n1 3', expectedOutput: '-20\n-20', isHidden: true, explanation: 'Negative numbers handled cleanly.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, Q;
    if (scanf("%d %d", &N, &Q) != 2) return 0;
    // Implement Sparse Table RMQ
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, Q;
    if (!(cin >> N >> Q)) return 0;
    // Implement Sparse Table RMQ
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int Q = sc.nextInt();
        // Implement Sparse Table RMQ
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, q = int(lines[0]), int(lines[1])
    # Implement Sparse Table RMQ

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>

#define MAX_N 100005
#define MAX_LOG 18
#define MIN(a, b) ((a) < (b) ? (a) : (b))

int st[MAX_LOG][MAX_N], lg[MAX_N];

int main() {
    int N, Q;
    if (scanf("%d %d", &N, &Q) != 2) return 0;
    lg[1] = 0;
    for (int i = 2; i <= N; i++) lg[i] = lg[i / 2] + 1;

    for (int i = 0; i < N; i++) scanf("%d", &st[0][i]);

    for (int k = 1; (1 << k) <= N; k++) {
        int half = 1 << (k - 1);
        for (int i = 0; i + (1 << k) <= N; i++) {
            st[k][i] = MIN(st[k - 1][i], st[k - 1][i + half]);
        }
    }

    while (Q--) {
        int l, r;
        scanf("%d %d", &l, &r);
        int k = lg[r - l + 1];
        printf("%d\\n", MIN(st[k][l], st[k][r - (1 << k) + 1]));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N, Q;
    if (!(cin >> N >> Q)) return 0;

    vector<int> lg(N + 1, 0);
    for (int i = 2; i <= N; ++i) lg[i] = lg[i / 2] + 1;

    int maxLog = lg[N] + 1;
    vector<vector<int>> st(maxLog, vector<int>(N));
    for (int i = 0; i < N; ++i) cin >> st[0][i];

    for (int k = 1; (1 << k) <= N; ++k) {
        int half = 1 << (k - 1);
        for (int i = 0; i + (1 << k) <= N; ++i) {
            st[k][i] = min(st[k - 1][i], st[k - 1][i + half]);
        }
    }

    while (Q--) {
        int l, r; cin >> l >> r;
        int k = lg[r - l + 1];
        cout << min(st[k][l], st[k][r - (1 << k) + 1]) << "\\n";
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int Q = sc.nextInt();

        int[] lg = new int[N + 1];
        for (int i = 2; i <= N; i++) lg[i] = lg[i / 2] + 1;

        int maxLog = lg[N] + 1;
        int[][] st = new int[maxLog][N];
        for (int i = 0; i < N; i++) st[0][i] = sc.nextInt();

        for (int k = 1; (1 << k) <= N; k++) {
            int half = 1 << (k - 1);
            for (int i = 0; i + (1 << k) <= N; i++) {
                st[k][i] = Math.min(st[k - 1][i], st[k - 1][i + half]);
            }
        }

        StringBuilder sb = new StringBuilder();
        while (Q-- > 0) {
            int l = sc.nextInt();
            int r = sc.nextInt();
            int k = lg[r - l + 1];
            sb.append(Math.min(st[k][l], st[k][r - (1 << k) + 1])).append("\\n");
        }
        System.out.print(sb);
    }
}`,
      python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n, q = int(input_data[0]), int(input_data[1])
    lg = [0] * (n + 1)
    for i in range(2, n + 1):
        lg[i] = lg[i // 2] + 1

    max_log = lg[n] + 1
    st = [[0] * n for _ in range(max_log)]

    idx = 2
    for i in range(n):
        st[0][i] = int(input_data[idx])
        idx += 1

    for k in range(1, max_log):
        span = 1 << k
        half = 1 << (k - 1)
        for i in range(n - span + 1):
            st[k][i] = min(st[k - 1][i], st[k - 1][i + half])

    out = []
    for _ in range(q):
        l, r = int(input_data[idx]), int(input_data[idx + 1])
        idx += 2
        k = lg[r - l + 1]
        out.append(str(min(st[k][l], st[k][r - (1 << k) + 1])))

    print('\\n'.join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 5. Implement strStr() / Substring Search (KMP Algorithm)
  {
    id: 'd13-ch-5',
    day: 13,
    title: 'Implement strStr() / Substring Search (KMP Algorithm)',
    difficulty: 'Medium',
    moduleTag: '14. Range Queries & Strings',
    companies: ['Google', 'Meta', 'Amazon', 'Apple'],
    platforms: ['LeetCode'],
    problemStatement:
      'Given two strings haystack and needle, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.',
    inputFormat: 'First line: haystack string.\nSecond line: needle string.',
    outputFormat: 'Single integer representing the 0-based index of the first occurrence, or -1.',
    constraints: ['1 <= haystack.length, needle.length <= 10^5', 'Both strings contain only lowercase English characters'],
    sampleInput: 'sadbutsad\nsad',
    sampleOutput: '0',
    kapilIntuition:
      'Mentorship By Kapil: Precompute the longest prefix-suffix (LPS / $\\pi$) array of `needle`. When matching with `haystack`, on mismatch do not rewind the text pointer; simply jump `j = lps[j - 1]`. Guarantees strictly linear O(N + M) runtime.',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(M)',
    testCases: [
      { id: 'tc-1', input: 'sadbutsad\nsad', expectedOutput: '0', isHidden: false, explanation: '"sad" appears first at index 0.' },
      { id: 'tc-2', input: 'leetcode\nleeto', expectedOutput: '-1', isHidden: false, explanation: '"leeto" does not appear in "leetcode".' },
      { id: 'tc-3', input: 'mississippi\nissip', expectedOutput: '4', isHidden: true, explanation: '"issip" begins at index 4.' }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char h[100005], n[100005];
    if (scanf("%100004s %100004s", h, n) != 2) return 0;
    // Implement KMP
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string h, n;
    if (!(cin >> h >> n)) return 0;
    // Implement KMP
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String h = sc.next();
        String n = sc.next();
        // Implement KMP
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        return
    h, n = lines[0], lines[1]
    # Implement KMP

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int lps[100005];

int main() {
    char h[100005], n[100005];
    if (scanf("%100004s %100004s", h, n) != 2) return 0;
    int lenH = strlen(h), lenN = strlen(n);

    int len = 0, i = 1;
    lps[0] = 0;
    while (i < lenN) {
        if (n[i] == n[len]) lps[i++] = ++len;
        else if (len != 0) len = lps[len - 1];
        else lps[i++] = 0;
    }

    int pText = 0, pPat = 0;
    while (pText < lenH) {
        if (h[pText] == n[pPat]) {
            pText++; pPat++;
        }
        if (pPat == lenN) {
            printf("%d\\n", pText - pPat);
            return 0;
        } else if (pText < lenH && h[pText] != n[pPat]) {
            if (pPat != 0) pPat = lps[pPat - 1];
            else pText++;
        }
    }
    printf("-1\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    string h, n;
    if (!(cin >> h >> n)) return 0;
    int lenH = h.size(), lenN = n.size();

    vector<int> lps(lenN, 0);
    int len = 0, i = 1;
    while (i < lenN) {
        if (n[i] == n[len]) lps[i++] = ++len;
        else if (len != 0) len = lps[len - 1];
        else lps[i++] = 0;
    }

    int pText = 0, pPat = 0;
    while (pText < lenH) {
        if (h[pText] == n[pPat]) {
            pText++; pPat++;
        }
        if (pPat == lenN) {
            cout << pText - pPat << endl;
            return 0;
        } else if (pText < lenH && h[pText] != n[pPat]) {
            if (pPat != 0) pPat = lps[pPat - 1];
            else pText++;
        }
    }
    cout << -1 << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String h = sc.next();
        String n = sc.next();
        int lenH = h.length(), lenN = n.length();

        int[] lps = new int[lenN];
        int len = 0, i = 1;
        while (i < lenN) {
            if (n.charAt(i) == n.charAt(len)) lps[i++] = ++len;
            else if (len != 0) len = lps[len - 1];
            else lps[i++] = 0;
        }

        int pText = 0, pPat = 0;
        while (pText < lenH) {
            if (h.charAt(pText) == n.charAt(pPat)) {
                pText++; pPat++;
            }
            if (pPat == lenN) {
                System.out.println(pText - pPat);
                return;
            } else if (pText < lenH && h.charAt(pText) != n.charAt(pPat)) {
                if (pPat != 0) pPat = lps[pPat - 1];
                else pText++;
            }
        }
        System.out.println(-1);
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        return
    h, n = lines[0], lines[1]
    len_h, len_n = len(h), len(n)

    lps = [0] * len_n
    l, i = 0, 1
    while i < len_n:
        if n[i] == n[l]:
            l += 1
            lps[i] = l
            i += 1
        elif l != 0:
            l = lps[l - 1]
        else:
            lps[i] = 0
            i += 1

    pt, pp = 0, 0
    while pt < len_h:
        if h[pt] == n[pp]:
            pt += 1
            pp += 1
        if pp == len_n:
            print(pt - pp)
            return
        elif pt < len_h and h[pt] != n[pp]:
            if pp != 0:
                pp = lps[pp - 1]
            else:
                pt += 1

    print(-1)

if __name__ == '__main__':
    main()`
    }
  },

  // 6. Longest Happy Prefix
  {
    id: 'd13-ch-6',
    day: 13,
    title: 'Longest Happy Prefix / String Periodicity',
    difficulty: 'Hard',
    moduleTag: '14. Range Queries & Strings',
    companies: ['Google', 'Microsoft'],
    platforms: ['LeetCode'],
    problemStatement:
      'A string is called a happy prefix if is a non-empty prefix which is also a suffix (excluding the entire string itself). Given a string s, return the longest happy prefix of s. Return an empty string "" if no such prefix exists.',
    inputFormat: 'Single line: string s.',
    outputFormat: 'Single line: longest happy prefix substring or empty line.',
    constraints: ['1 <= s.length <= 10^5', 's contains only lowercase English characters'],
    sampleInput: 'level',
    sampleOutput: 'l',
    kapilIntuition:
      'Mentorship By Kapil: The KMP prefix function value $\\pi[N - 1]$ gives the length of the longest proper prefix of s that is also a suffix of s. Simply compute the $\\pi$ array for string s in O(N) time and return the prefix substring of length $\\pi[N - 1]$.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    testCases: [
      { id: 'tc-1', input: 'level', expectedOutput: 'l', isHidden: false, explanation: '"l" is both prefix and suffix of "level".' },
      { id: 'tc-2', input: 'ababab', expectedOutput: 'abab', isHidden: false, explanation: '"abab" is both prefix and suffix of "ababab".' },
      { id: 'tc-3', input: 'leetcodele', expectedOutput: 'le', isHidden: true, explanation: '"le" is both prefix and suffix of "leetcodele".' }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char s[100005];
    if (scanf("%100004s", s) != 1) return 0;
    // Compute KMP prefix function
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    // Compute KMP prefix function
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        // Compute KMP prefix function
    }
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    if not line:
        return
    # Compute KMP prefix function

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int pi[100005];

int main() {
    char s[100005];
    if (scanf("%100004s", s) != 1) return 0;
    int n = strlen(s);

    pi[0] = 0;
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j]) j = pi[j - 1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }

    int len = pi[n - 1];
    s[len] = '\\0';
    printf("%s\\n", s);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    int n = s.size();
    vector<int> pi(n, 0);

    for (int i = 1; i < n; ++i) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j]) j = pi[j - 1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }

    int len = pi[n - 1];
    cout << s.substr(0, len) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        int n = s.length();
        int[] pi = new int[n];

        for (int i = 1; i < n; i++) {
            int j = pi[i - 1];
            while (j > 0 && s.charAt(i) != s.charAt(j)) j = pi[j - 1];
            if (s.charAt(i) == s.charAt(j)) j++;
            pi[i] = j;
        }

        int len = pi[n - 1];
        System.out.println(s.substring(0, len));
    }
}`,
      python: `import sys

def main():
    s = sys.stdin.read().strip()
    if not s:
        return
    n = len(s)
    pi = [0] * n

    for i in range(1, n):
        j = pi[i - 1]
        while j > 0 and s[i] != s[j]:
            j = pi[j - 1]
        if s[i] == s[j]:
            j += 1
        pi[i] = j

    print(s[:pi[n - 1]])

if __name__ == '__main__':
    main()`
    }
  },

  // 7. Maximum XOR of Two Numbers in an Array
  {
    id: 'd13-ch-7',
    day: 13,
    title: 'Maximum XOR of Two Numbers in an Array (Bitwise Trie)',
    difficulty: 'Medium',
    moduleTag: '14. Range Queries & Strings',
    companies: ['Google', 'Meta', 'Uber'],
    platforms: ['LeetCode'],
    problemStatement:
      'Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < nums.length.',
    inputFormat: 'First line: N (number of elements).\nSecond line: N space-separated non-negative integers.',
    outputFormat: 'Single integer representing the maximum XOR value.',
    constraints: ['1 <= N <= 2 * 10^5', '0 <= nums[i] <= 2^31 - 1'],
    sampleInput: '6\n3 10 5 25 2 8',
    sampleOutput: '28',
    kapilIntuition:
      'Mentorship By Kapil: Construct a Bitwise Trie of depth 31. For each number, greedily choose the opposite bit `1 - bit` at each level if present to maximize the resulting bit. Total time is strictly O(32 * N).',
    timeComplexity: 'O(32 * N)',
    spaceComplexity: 'O(32 * N)',
    testCases: [
      { id: 'tc-1', input: '6\n3 10 5 25 2 8', expectedOutput: '28', isHidden: false, explanation: '5 ^ 25 = 28.' },
      { id: 'tc-2', input: '3\n14 70 53', expectedOutput: '127', isHidden: false, explanation: '70 ^ 53 = 127.' },
      { id: 'tc-3', input: '1\n0', expectedOutput: '0', isHidden: true, explanation: '0 ^ 0 = 0.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N;
    if (scanf("%d", &N) != 1) return 0;
    // Implement Bitwise Trie
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N;
    if (!(cin >> N)) return 0;
    // Implement Bitwise Trie
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        // Implement Bitwise Trie
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    # Implement Bitwise Trie

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

typedef struct Node {
    struct Node* next[2];
} Node;

Node* newNode() {
    Node* n = (Node*)malloc(sizeof(Node));
    n->next[0] = n->next[1] = NULL;
    return n;
}

void insert(Node* root, int num) {
    Node* curr = root;
    for (int i = 30; i >= 0; i--) {
        int b = (num >> i) & 1;
        if (!curr->next[b]) curr->next[b] = newNode();
        curr = curr->next[b];
    }
}

int getMaxXor(Node* root, int num) {
    Node* curr = root;
    int ans = 0;
    for (int i = 30; i >= 0; i--) {
        int b = (num >> i) & 1;
        int want = 1 - b;
        if (curr->next[want]) {
            ans |= (1 << i);
            curr = curr->next[want];
        } else {
            curr = curr->next[b];
        }
    }
    return ans;
}

int main() {
    int N;
    if (scanf("%d", &N) != 1) return 0;
    int nums[200005];
    Node* root = newNode();
    for (int i = 0; i < N; i++) {
        scanf("%d", &nums[i]);
        insert(root, nums[i]);
    }
    int maxXor = 0;
    for (int i = 0; i < N; i++) {
        maxXor = MAX(maxXor, getMaxXor(root, nums[i]));
    }
    printf("%d\\n", maxXor);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Node {
    Node* next[2] = {nullptr, nullptr};
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N;
    if (!(cin >> N)) return 0;
    vector<int> nums(N);
    Node* root = new Node();

    for (int i = 0; i < N; ++i) {
        cin >> nums[i];
        Node* curr = root;
        for (int b = 30; b >= 0; --b) {
            int bit = (nums[i] >> b) & 1;
            if (!curr->next[bit]) curr->next[bit] = new Node();
            curr = curr->next[bit];
        }
    }

    int maxXor = 0;
    for (int x : nums) {
        Node* curr = root;
        int curXor = 0;
        for (int b = 30; b >= 0; --b) {
            int bit = (x >> b) & 1;
            int want = 1 - bit;
            if (curr->next[want]) {
                curXor |= (1 << b);
                curr = curr->next[want];
            } else {
                curr = curr->next[bit];
            }
        }
        maxXor = max(maxXor, curXor);
    }
    cout << maxXor << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    static class Node {
        Node[] next = new Node[2];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int[] nums = new int[N];
        Node root = new Node();

        for (int i = 0; i < N; i++) {
            nums[i] = sc.nextInt();
            Node curr = root;
            for (int b = 30; b >= 0; b--) {
                int bit = (nums[i] >> b) & 1;
                if (curr.next[bit] == null) curr.next[bit] = new Node();
                curr = curr.next[bit];
            }
        }

        int maxXor = 0;
        for (int x : nums) {
            Node curr = root;
            int curXor = 0;
            for (int b = 30; b >= 0; b--) {
                int bit = (x >> b) & 1;
                int want = 1 - bit;
                if (curr.next[want] != null) {
                    curXor |= (1 << b);
                    curr = curr.next[want];
                } else {
                    curr = curr.next[bit];
                }
            }
            maxXor = Math.max(maxXor, curXor);
        }
        System.out.println(maxXor);
    }
}`,
      python: `import sys

class Node:
    def __init__(self):
        self.next = [None, None]

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    nums = [int(x) for x in lines[1:]]

    root = Node()
    for x in nums:
        curr = root
        for b in range(30, -1, -1):
            bit = (x >> b) & 1
            if not curr.next[bit]:
                curr.next[bit] = Node()
            curr = curr.next[bit]

    max_xor = 0
    for x in nums:
        curr = root
        cur_xor = 0
        for b in range(30, -1, -1):
            bit = (x >> b) & 1
            want = 1 - bit
            if curr.next[want]:
                cur_xor |= (1 << b)
                curr = curr.next[want]
            else:
                curr = curr.next[bit]
        if cur_xor > max_xor:
            max_xor = cur_xor

    print(max_xor)

if __name__ == '__main__':
    main()`
    }
  },

  // 8. Maximum XOR Subarray
  {
    id: 'd13-ch-8',
    day: 13,
    title: 'Maximum XOR Subarray (Prefix XOR + Trie)',
    difficulty: 'Hard',
    moduleTag: '14. Range Queries & Strings',
    companies: ['Amazon', 'Microsoft', 'Citadel'],
    platforms: ['GeeksforGeeks', 'CodeChef'],
    problemStatement:
      'Given an array of N integers, find the maximum XOR subarray value (i.e. maximum XOR sum among all contiguous subarrays).',
    inputFormat: 'First line: N.\nSecond line: N space-separated integers.',
    outputFormat: 'Single integer representing the maximum XOR subarray sum.',
    constraints: ['1 <= N <= 10^5', '0 <= nums[i] <= 10^9'],
    sampleInput: '4\n1 2 3 4',
    sampleOutput: '7',
    kapilIntuition:
      'Mentorship By Kapil: `XOR(L..R) = prefixXOR[R] ^ prefixXOR[L - 1]`. Therefore, insert prefix XORs sequentially into a Bitwise Trie. Start with prefix 0 in the Trie. At each element, query the Trie with current `prefixXor` to find the maximum possible XOR pair, then insert `prefixXor`.',
    timeComplexity: 'O(32 * N)',
    spaceComplexity: 'O(32 * N)',
    testCases: [
      { id: 'tc-1', input: '4\n1 2 3 4', expectedOutput: '7', isHidden: false, explanation: 'Subarray [3, 4] gives 3 ^ 4 = 7.' },
      { id: 'tc-2', input: '3\n8 1 2', expectedOutput: '11', isHidden: false, explanation: 'Subarray [8, 1, 2] gives 8 ^ 1 ^ 2 = 11.' },
      { id: 'tc-3', input: '1\n42', expectedOutput: '42', isHidden: true, explanation: 'Single element is 42.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N;
    if (scanf("%d", &N) != 1) return 0;
    // Implement Maximum XOR Subarray
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N;
    if (!(cin >> N)) return 0;
    // Implement Maximum XOR Subarray
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        // Implement Maximum XOR Subarray
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    # Implement Maximum XOR Subarray

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

typedef struct Node {
    struct Node* next[2];
} Node;

Node* newNode() {
    Node* n = (Node*)malloc(sizeof(Node));
    n->next[0] = n->next[1] = NULL;
    return n;
}

void insert(Node* root, int num) {
    Node* curr = root;
    for (int i = 30; i >= 0; i--) {
        int b = (num >> i) & 1;
        if (!curr->next[b]) curr->next[b] = newNode();
        curr = curr->next[b];
    }
}

int query(Node* root, int num) {
    Node* curr = root;
    int ans = 0;
    for (int i = 30; i >= 0; i--) {
        int b = (num >> i) & 1;
        int want = 1 - b;
        if (curr->next[want]) {
            ans |= (1 << i);
            curr = curr->next[want];
        } else {
            curr = curr->next[b];
        }
    }
    return ans;
}

int main() {
    int N;
    if (scanf("%d", &N) != 1) return 0;
    Node* root = newNode();
    insert(root, 0);

    int prefixXor = 0, maxXor = 0;
    for (int i = 0; i < N; i++) {
        int val;
        scanf("%d", &val);
        prefixXor ^= val;
        maxXor = MAX(maxXor, query(root, prefixXor));
        insert(root, prefixXor);
    }
    printf("%d\\n", maxXor);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Node {
    Node* next[2] = {nullptr, nullptr};
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N;
    if (!(cin >> N)) return 0;

    Node* root = new Node();
    auto insert = [&](int num) {
        Node* curr = root;
        for (int b = 30; b >= 0; --b) {
            int bit = (num >> b) & 1;
            if (!curr->next[bit]) curr->next[bit] = new Node();
            curr = curr->next[bit];
        }
    };

    auto query = [&](int num) {
        Node* curr = root;
        int ans = 0;
        for (int b = 30; b >= 0; --b) {
            int bit = (num >> b) & 1;
            int want = 1 - bit;
            if (curr->next[want]) {
                ans |= (1 << b);
                curr = curr->next[want];
            } else {
                curr = curr->next[bit];
            }
        }
        return ans;
    };

    insert(0);
    int prefixXor = 0, maxXor = 0;
    for (int i = 0; i < N; ++i) {
        int val; cin >> val;
        prefixXor ^= val;
        maxXor = max(maxXor, query(prefixXor));
        insert(prefixXor);
    }
    cout << maxXor << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    static class Node {
        Node[] next = new Node[2];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        Node root = new Node();

        // insert 0
        Node c = root;
        for (int b = 30; b >= 0; b--) {
            c.next[0] = new Node();
            c = c.next[0];
        }

        int prefixXor = 0, maxXor = 0;
        for (int i = 0; i < N; i++) {
            prefixXor ^= sc.nextInt();

            // query
            c = root;
            int curXor = 0;
            for (int b = 30; b >= 0; b--) {
                int bit = (prefixXor >> b) & 1;
                int want = 1 - bit;
                if (c.next[want] != null) {
                    curXor |= (1 << b);
                    c = c.next[want];
                } else {
                    c = c.next[bit];
                }
            }
            maxXor = Math.max(maxXor, curXor);

            // insert prefixXor
            c = root;
            for (int b = 30; b >= 0; b--) {
                int bit = (prefixXor >> b) & 1;
                if (c.next[bit] == null) c.next[bit] = new Node();
                c = c.next[bit];
            }
        }
        System.out.println(maxXor);
    }
}`,
      python: `import sys

class Node:
    def __init__(self):
        self.next = [None, None]

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n = int(lines[0])
    nums = [int(x) for x in lines[1:]]

    root = Node()

    def insert(num):
        curr = root
        for b in range(30, -1, -1):
            bit = (num >> b) & 1
            if not curr.next[bit]:
                curr.next[bit] = Node()
            curr = curr.next[bit]

    def query(num):
        curr = root
        ans = 0
        for b in range(30, -1, -1):
            bit = (num >> b) & 1
            want = 1 - bit
            if curr.next[want]:
                ans |= (1 << b)
                curr = curr.next[want]
            else:
                curr = curr.next[bit]
        return ans

    insert(0)
    prefix_xor = 0
    max_xor = 0

    for x in nums:
        prefix_xor ^= x
        res = query(prefix_xor)
        if res > max_xor:
            max_xor = res
        insert(prefix_xor)

    print(max_xor)

if __name__ == '__main__':
    main()`
    }
  },

  // 9. Stream of Characters / Multi-Word Suffix Query
  {
    id: 'd13-ch-9',
    day: 13,
    title: 'Stream of Characters (Reverse Suffix Trie)',
    difficulty: 'Hard',
    moduleTag: '14. Range Queries & Strings',
    companies: ['Google', 'Amazon', 'Apple'],
    platforms: ['LeetCode'],
    problemStatement:
      'Given an array of dictionary words and a stream of incoming characters, for each incoming character determine if any suffix of the stream of characters received so far matches one of the dictionary words. Return `true` if a match exists, else `false`.',
    inputFormat: 'First line: W (number of words).\nSecond line: W space-separated words.\nThird line: C (number of stream characters).\nFourth line: C space-separated characters.',
    outputFormat: 'Space-separated `true` or `false` values for each character in stream.',
    constraints: ['1 <= W <= 2000', '1 <= word.length <= 200', '1 <= C <= 2000', 'All characters are lowercase English letters'],
    sampleInput: '3\ncd f kl\n6\na b c d e f',
    sampleOutput: 'false false false true false true',
    kapilIntuition:
      'Mentorship By Kapil: Reverse the intuition! If you insert words in reverse order into a Trie, then checking if any suffix of the stream matches a dictionary word is equivalent to walking down the Trie starting from the MOST RECENT stream character backwards. If you encounter an `isEnd` node, return true immediately.',
    timeComplexity: 'O(W * L + C * L)',
    spaceComplexity: 'O(W * L)',
    testCases: [
      { id: 'tc-1', input: '3\ncd f kl\n6\na b c d e f', expectedOutput: 'false false false true false true', isHidden: false, explanation: 'Suffix "cd" matches word "cd" at d; suffix "f" matches word "f" at f.' },
      { id: 'tc-2', input: '1\nab\n2\na b', expectedOutput: 'false true', isHidden: false, explanation: '"ab" matches at character b.' },
      { id: 'tc-3', input: '1\na\n1\na', expectedOutput: 'true', isHidden: true, explanation: 'Single character word matches immediately.' }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

int main() {
    int W;
    if (scanf("%d", &W) != 1) return 0;
    // Implement Reverse Suffix Trie
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    int W;
    if (!(cin >> W)) return 0;
    // Implement Reverse Suffix Trie
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int W = sc.nextInt();
        // Implement Reverse Suffix Trie
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    w = int(lines[0])
    # Implement Reverse Suffix Trie

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

typedef struct TrieNode {
    struct TrieNode* next[26];
    bool isEnd;
} TrieNode;

TrieNode* newNode() {
    TrieNode* n = (TrieNode*)malloc(sizeof(TrieNode));
    for (int i = 0; i < 26; i++) n->next[i] = NULL;
    n->isEnd = false;
    return n;
}

void insertRev(TrieNode* root, const char* word) {
    int len = strlen(word);
    TrieNode* curr = root;
    for (int i = len - 1; i >= 0; i--) {
        int idx = word[i] - 'a';
        if (!curr->next[idx]) curr->next[idx] = newNode();
        curr = curr->next[idx];
    }
    curr->isEnd = true;
}

int main() {
    int W;
    if (scanf("%d", &W) != 1) return 0;
    TrieNode* root = newNode();
    char word[256];
    for (int i = 0; i < W; i++) {
        scanf("%255s", word);
        insertRev(root, word);
    }

    int C;
    if (scanf("%d", &C) != 1) return 0;
    char stream[2005];
    int streamLen = 0;

    for (int i = 0; i < C; i++) {
        char ch[8];
        scanf("%7s", ch);
        stream[streamLen++] = ch[0];

        TrieNode* curr = root;
        bool found = false;
        for (int j = streamLen - 1; j >= 0; j--) {
            int idx = stream[j] - 'a';
            if (!curr->next[idx]) break;
            curr = curr->next[idx];
            if (curr->isEnd) { found = true; break; }
        }
        printf("%s%c", found ? "true" : "false", i == C - 1 ? '\\n' : ' ');
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

struct TrieNode {
    TrieNode* next[26] = {nullptr};
    bool isEnd = false;
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int W;
    if (!(cin >> W)) return 0;
    TrieNode* root = new TrieNode();

    for (int i = 0; i < W; ++i) {
        string w; cin >> w;
        TrieNode* curr = root;
        for (int j = (int)w.size() - 1; j >= 0; --j) {
            int idx = w[j] - 'a';
            if (!curr->next[idx]) curr->next[idx] = new TrieNode();
            curr = curr->next[idx];
        }
        curr->isEnd = true;
    }

    int C; cin >> C;
    vector<char> stream;
    for (int i = 0; i < C; ++i) {
        char ch; cin >> ch;
        stream.push_back(ch);
        TrieNode* curr = root;
        bool found = false;
        for (int j = (int)stream.size() - 1; j >= 0; --j) {
            int idx = stream[j] - 'a';
            if (!curr->next[idx]) break;
            curr = curr->next[idx];
            if (curr->isEnd) { found = true; break; }
        }
        cout << (found ? "true" : "false") << (i == C - 1 ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    static class TrieNode {
        TrieNode[] next = new TrieNode[26];
        boolean isEnd = false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int W = sc.nextInt();
        TrieNode root = new TrieNode();

        for (int i = 0; i < W; i++) {
            String w = sc.next();
            TrieNode curr = root;
            for (int j = w.length() - 1; j >= 0; j--) {
                int idx = w.charAt(j) - 'a';
                if (curr.next[idx] == null) curr.next[idx] = new TrieNode();
                curr = curr.next[idx];
            }
            curr.isEnd = true;
        }

        int C = sc.nextInt();
        StringBuilder stream = new StringBuilder();
        StringBuilder out = new StringBuilder();

        for (int i = 0; i < C; i++) {
            char ch = sc.next().charAt(0);
            stream.append(ch);
            TrieNode curr = root;
            boolean found = false;

            for (int j = stream.length() - 1; j >= 0; j--) {
                int idx = stream.charAt(j) - 'a';
                if (curr.next[idx] == null) break;
                curr = curr.next[idx];
                if (curr.isEnd) { found = true; break; }
            }
            out.append(found ? "true" : "false").append(i == C - 1 ? "" : " ");
        }
        System.out.println(out);
    }
}`,
      python: `import sys

class TrieNode:
    def __init__(self):
        self.next = {}
        self.is_end = False

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    w = int(lines[0])
    words = lines[1:w + 1]
    c = int(lines[w + 1])
    chars = lines[w + 2:w + 2 + c]

    root = TrieNode()
    for word in words:
        curr = root
        for ch in reversed(word):
            if ch not in curr.next:
                curr.next[ch] = TrieNode()
            curr = curr.next[ch]
        curr.is_end = True

    stream = []
    out = []
    for ch in chars:
        stream.append(ch)
        curr = root
        found = False
        for s_ch in reversed(stream):
            if s_ch not in curr.next:
                break
            curr = curr.next[s_ch]
            if curr.is_end:
                found = True
                break
        out.append("true" if found else "false")

    print(' '.join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 10. Shortest Palindrome
  {
    id: 'd13-ch-10',
    day: 13,
    title: 'Shortest Palindrome (KMP Prefix Function)',
    difficulty: 'Hard',
    moduleTag: '14. Range Queries & Strings',
    companies: ['Google', 'Microsoft', 'Amazon'],
    platforms: ['LeetCode'],
    problemStatement:
      'Given a string s, you can convert it to a palindrome by adding characters in front of it. Find and return the shortest palindrome you can find by performing this transformation.',
    inputFormat: 'Single line: string s.',
    outputFormat: 'Single line: shortest palindrome string.',
    constraints: ['0 <= s.length <= 10^5', 's consists of lowercase English letters only'],
    sampleInput: 'aacecaaa',
    sampleOutput: 'aaacecaaa',
    kapilIntuition:
      'Mentorship By Kapil: Adding characters in front means finding the LONGEST palindromic prefix of s! Let `rev = reverse(s)`. Construct string `combined = s + "#" + rev`. Run KMP prefix function on `combined`. The last value `pi[combined.length - 1]` gives the exact length of the longest palindromic prefix of s. The remaining suffix of s after index `len` is reversed and prepended to s.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    testCases: [
      { id: 'tc-1', input: 'aacecaaa', expectedOutput: 'aaacecaaa', isHidden: false, explanation: 'Longest palindromic prefix is "aacecaa" (len 7). Prepend remaining \'a\' -> "aaacecaaa".' },
      { id: 'tc-2', input: 'abcd', expectedOutput: 'dcbabcd', isHidden: false, explanation: 'Longest palindromic prefix is "a" (len 1). Prepend reverse("bcd") = "dcb".' },
      { id: 'tc-3', input: 'a', expectedOutput: 'a', isHidden: true, explanation: 'Single character is already a palindrome.' }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char s[100005];
    if (scanf("%100004s", s) != 1) { printf("\\n"); return 0; }
    // Implement KMP Shortest Palindrome
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string s;
    if (!(cin >> s)) { cout << endl; return 0; }
    // Implement KMP Shortest Palindrome
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println(); return; }
        String s = sc.next();
        // Implement KMP Shortest Palindrome
    }
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    if not line:
        print("")
        return
    # Implement KMP Shortest Palindrome

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int pi[200010];

int main() {
    char s[100005];
    if (scanf("%100004s", s) != 1) { printf("\\n"); return 0; }
    int n = strlen(s);
    if (n <= 1) { printf("%s\\n", s); return 0; }

    char rev[100005];
    for (int i = 0; i < n; i++) rev[i] = s[n - 1 - i];
    rev[n] = '\\0';

    char comb[200015];
    sprintf(comb, "%s#%s", s, rev);
    int m = 2 * n + 1;

    pi[0] = 0;
    for (int i = 1; i < m; i++) {
        int j = pi[i - 1];
        while (j > 0 && comb[i] != comb[j]) j = pi[j - 1];
        if (comb[i] == comb[j]) j++;
        pi[i] = j;
    }

    int palLen = pi[m - 1];
    for (int i = n - 1; i >= palLen; i--) putchar(s[i]);
    printf("%s\\n", s);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

int main() {
    string s;
    if (!(cin >> s) || s.empty()) { cout << endl; return 0; }
    int n = s.size();

    string rev = s;
    reverse(rev.begin(), rev.end());
    string comb = s + "#" + rev;
    int m = comb.size();

    vector<int> pi(m, 0);
    for (int i = 1; i < m; ++i) {
        int j = pi[i - 1];
        while (j > 0 && comb[i] != comb[j]) j = pi[j - 1];
        if (comb[i] == comb[j]) j++;
        pi[i] = j;
    }

    int palLen = pi[m - 1];
    string prefixToAdd = s.substr(palLen);
    reverse(prefixToAdd.begin(), prefixToAdd.end());
    cout << prefixToAdd + s << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println(); return; }
        String s = sc.next();
        int n = s.length();
        if (n <= 1) { System.out.println(s); return; }

        String rev = new StringBuilder(s).reverse().toString();
        String comb = s + "#" + rev;
        int m = comb.length();

        int[] pi = new int[m];
        for (int i = 1; i < m; i++) {
            int j = pi[i - 1];
            while (j > 0 && comb.charAt(i) != comb.charAt(j)) j = pi[j - 1];
            if (comb.charAt(i) == comb.charAt(j)) j++;
            pi[i] = j;
        }

        int palLen = pi[m - 1];
        String prefixToAdd = new StringBuilder(s.substring(palLen)).reverse().toString();
        System.out.println(prefixToAdd + s);
    }
}`,
      python: `import sys

def main():
    s = sys.stdin.read().strip()
    if not s:
        print("")
        return
    n = len(s)
    rev = s[::-1]
    comb = s + "#" + rev
    m = len(comb)
    pi = [0] * m

    for i in range(1, m):
        j = pi[i - 1]
        while j > 0 and comb[i] != comb[j]:
            j = pi[j - 1]
        if comb[i] == comb[j]:
            j += 1
        pi[i] = j

    pal_len = pi[m - 1]
    to_add = s[pal_len:][::-1]
    print(to_add + s)

if __name__ == '__main__':
    main()`
    }
  }
];

const fileContent = `import { PracticalChallenge } from '../types';

/**
 * Placement Readiness Program
 * Mentor: Kapil | Day 13: FAANG Range Query Data Structures & Advanced String Algorithms
 * 10 Production-Grade Coding Challenges (C, C++, Java, Python)
 */
export const DAY_13_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = ${JSON.stringify(challenges, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/day13Challenges10.ts'), fileContent, 'utf8');
console.log('Successfully wrote src/data/day13Challenges10.ts');
