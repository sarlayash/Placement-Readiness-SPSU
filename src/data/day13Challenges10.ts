import { PracticalChallenge } from '../types';

/**
 * Placement Readiness Program
 * Mentor: Kapil | Day 13: FAANG Range Query Data Structures & Advanced String Algorithms
 * 10 Production-Grade Coding Challenges (C, C++, Java, Python)
 */
export const DAY_13_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  {
    "id": "d13-ch-1",
    "day": 13,
    "title": "Range Sum Query - Mutable (Fenwick Tree / Segment Tree)",
    "difficulty": "Medium",
    "moduleTag": "14. Range Queries & Strings",
    "companies": [
      "Google",
      "Amazon",
      "Meta"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "Given an integer array nums and Q operations, handle two types of operations:\n1. `1 idx val`: Update nums[idx] by adding `val`.\n2. `2 l r`: Compute the sum of the elements of nums between indices l and r inclusive (0-indexed).",
    "inputFormat": "First line: N Q (array size and number of queries).\nSecond line: N space-separated integers.\nNext Q lines: operation `1 idx val` or `2 l r`.",
    "outputFormat": "For each type 2 operation, output the sum on a new line.",
    "constraints": [
      "1 <= N, Q <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "0 <= idx < N",
      "0 <= l <= r < N"
    ],
    "sampleInput": "5 3\n1 2 3 4 5\n2 1 3\n1 2 10\n2 1 3",
    "sampleOutput": "9\n19",
    "kapilIntuition": "Mentorship By Kapil: Use a 1-indexed Fenwick Tree (Binary Indexed Tree). An update `add(idx + 1, val)` runs in O(log N) by moving up via `i += i & (-i)`. A range sum query `sum(r) - sum(l - 1)` runs in O(log N) by moving down via `i -= i & (-i)`. This completely outperforms an O(N) linear scan or O(N) array update.",
    "timeComplexity": "O(log N) per operation",
    "spaceComplexity": "O(N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "5 3\n1 2 3 4 5\n2 1 3\n1 2 10\n2 1 3",
        "expectedOutput": "9\n19",
        "isHidden": false,
        "explanation": "Initial sum [1..3] is 2+3+4=9. After adding 10 to index 2, sum becomes 2+13+4=19."
      },
      {
        "id": "tc-2",
        "input": "3 2\n10 20 30\n2 0 2\n2 1 1",
        "expectedOutput": "60\n20",
        "isHidden": false,
        "explanation": "Sum of all 3 is 60, single element at index 1 is 20."
      },
      {
        "id": "tc-3",
        "input": "1 2\n5\n2 0 0\n1 0 5\n2 0 0",
        "expectedOutput": "5\n10",
        "isHidden": true,
        "explanation": "Single element updated from 5 to 10."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N, Q;\n    if (scanf(\"%d %d\", &N, &Q) != 2) return 0;\n    // Implement Fenwick Tree\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N, Q;\n    if (!(cin >> N >> Q)) return 0;\n    // Implement Fenwick Tree\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement Fenwick Tree\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, q = int(lines[0]), int(lines[1])\n    # Implement Fenwick Tree\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\n#define MAX_N 100005\nlong long bit[MAX_N];\nint N;\n\nvoid add(int idx, long long val) {\n    for (; idx <= N; idx += idx & (-idx)) bit[idx] += val;\n}\n\nlong long query(int idx) {\n    long long sum = 0;\n    for (; idx > 0; idx -= idx & (-idx)) sum += bit[idx];\n    return sum;\n}\n\nint main() {\n    int Q;\n    if (scanf(\"%d %d\", &N, &Q) != 2) return 0;\n    for (int i = 1; i <= N; i++) {\n        long long val;\n        scanf(\"%lld\", &val);\n        add(i, val);\n    }\n    while (Q--) {\n        int type;\n        scanf(\"%d\", &type);\n        if (type == 1) {\n            int idx; long long val;\n            scanf(\"%d %lld\", &idx, &val);\n            add(idx + 1, val);\n        } else {\n            int l, r;\n            scanf(\"%d %d\", &l, &r);\n            printf(\"%lld\\n\", query(r + 1) - query(l));\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nclass FenwickTree {\n    int n;\n    vector<long long> bit;\npublic:\n    FenwickTree(int n) : n(n), bit(n + 1, 0) {}\n    void add(int idx, long long val) {\n        for (; idx <= n; idx += idx & (-idx)) bit[idx] += val;\n    }\n    long long query(int idx) {\n        long long sum = 0;\n        for (; idx > 0; idx -= idx & (-idx)) sum += bit[idx];\n        return sum;\n    }\n};\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int N, Q;\n    if (!(cin >> N >> Q)) return 0;\n    FenwickTree ft(N);\n    for (int i = 1; i <= N; ++i) {\n        long long val; cin >> val;\n        ft.add(i, val);\n    }\n    while (Q--) {\n        int type; cin >> type;\n        if (type == 1) {\n            int idx; long long val;\n            cin >> idx >> val;\n            ft.add(idx + 1, val);\n        } else {\n            int l, r;\n            cin >> l >> r;\n            cout << ft.query(r + 1) - ft.query(l) << \"\\n\";\n        }\n    }\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    static class Fenwick {\n        int n;\n        long[] bit;\n        Fenwick(int n) { this.n = n; this.bit = new long[n + 1]; }\n        void add(int idx, long val) {\n            for (; idx <= n; idx += idx & (-idx)) bit[idx] += val;\n        }\n        long query(int idx) {\n            long sum = 0;\n            for (; idx > 0; idx -= idx & (-idx)) sum += bit[idx];\n            return sum;\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int Q = sc.nextInt();\n        Fenwick ft = new Fenwick(N);\n        for (int i = 1; i <= N; i++) {\n            ft.add(i, sc.nextLong());\n        }\n        while (Q-- > 0) {\n            int type = sc.nextInt();\n            if (type == 1) {\n                int idx = sc.nextInt();\n                long val = sc.nextLong();\n                ft.add(idx + 1, val);\n            } else {\n                int l = sc.nextInt();\n                int r = sc.nextInt();\n                System.out.println(ft.query(r + 1) - ft.query(l));\n            }\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n, q = int(input_data[0]), int(input_data[1])\n    bit = [0] * (n + 1)\n\n    def add(idx, val):\n        while idx <= n:\n            bit[idx] += val\n            idx += idx & (-idx)\n\n    def query(idx):\n        total = 0\n        while idx > 0:\n            total += bit[idx]\n            idx -= idx & (-idx)\n        return total\n\n    idx = 2\n    for i in range(1, n + 1):\n        add(i, int(input_data[idx]))\n        idx += 1\n\n    out = []\n    for _ in range(q):\n        t = int(input_data[idx])\n        if t == 1:\n            p, v = int(input_data[idx + 1]), int(input_data[idx + 2])\n            idx += 3\n            add(p + 1, v)\n        else:\n            l, r = int(input_data[idx + 1]), int(input_data[idx + 2])\n            idx += 3\n            out.append(str(query(r + 1) - query(l)))\n\n    print('\\n'.join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d13-ch-2",
    "day": 13,
    "title": "Range Update and Range Query with Lazy Propagation",
    "difficulty": "Hard",
    "moduleTag": "14. Range Queries & Strings",
    "companies": [
      "Google",
      "Meta",
      "Microsoft"
    ],
    "platforms": [
      "Codeforces",
      "HackerRank"
    ],
    "problemStatement": "Given an initial array of N zeros and Q operations:\n1. `1 l r val`: Add `val` to every element in range [l, r] (0-indexed).\n2. `2 l r`: Compute the sum of elements in range [l, r].",
    "inputFormat": "First line: N Q.\nNext Q lines: `1 l r val` or `2 l r`.",
    "outputFormat": "For each type 2 operation, output the range sum.",
    "constraints": [
      "1 <= N, Q <= 10^5",
      "0 <= l <= r < N",
      "-10^4 <= val <= 10^4"
    ],
    "sampleInput": "5 3\n1 0 2 5\n1 2 4 10\n2 1 3",
    "sampleOutput": "30",
    "kapilIntuition": "Mentorship By Kapil: Maintain a Segment Tree of size 4N with a `lazy` array. When range [l, r] is updated, if the current tree node interval is completely inside [l, r], update `tree[node] += val * len`, set `lazy[node] += val`, and return immediately. When recursing into children, push the pending lazy value down first.",
    "timeComplexity": "O(log N) per operation",
    "spaceComplexity": "O(4N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "5 3\n1 0 2 5\n1 2 4 10\n2 1 3",
        "expectedOutput": "30",
        "isHidden": false,
        "explanation": "Indices: [5, 5, 15, 10, 10]. Range [1, 3] sum = 5 + 15 + 10 = 30."
      },
      {
        "id": "tc-2",
        "input": "4 2\n1 0 3 2\n2 0 3",
        "expectedOutput": "8",
        "isHidden": false,
        "explanation": "All 4 elements become 2, sum is 8."
      },
      {
        "id": "tc-3",
        "input": "1 2\n1 0 0 7\n2 0 0",
        "expectedOutput": "7",
        "isHidden": true,
        "explanation": "Single element update and query."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N, Q;\n    if (scanf(\"%d %d\", &N, &Q) != 2) return 0;\n    // Implement Lazy Segment Tree\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N, Q;\n    if (!(cin >> N >> Q)) return 0;\n    // Implement Lazy Segment Tree\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement Lazy Segment Tree\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, q = int(lines[0]), int(lines[1])\n    # Implement Lazy Segment Tree\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\n#define MAX_N 100005\nlong long tree[4 * MAX_N], lazy[4 * MAX_N];\n\nvoid push(int node, int l, int r) {\n    if (lazy[node] != 0) {\n        int mid = l + (r - l) / 2;\n        tree[2 * node] += lazy[node] * (mid - l + 1);\n        lazy[2 * node] += lazy[node];\n        tree[2 * node + 1] += lazy[node] * (r - mid);\n        lazy[2 * node + 1] += lazy[node];\n        lazy[node] = 0;\n    }\n}\n\nvoid update(int node, int l, int r, int ql, int qr, long long val) {\n    if (ql <= l && r <= qr) {\n        tree[node] += val * (r - l + 1);\n        lazy[node] += val;\n        return;\n    }\n    push(node, l, r);\n    int mid = l + (r - l) / 2;\n    if (ql <= mid) update(2 * node, l, mid, ql, qr, val);\n    if (qr > mid) update(2 * node + 1, mid + 1, r, ql, qr, val);\n    tree[node] = tree[2 * node] + tree[2 * node + 1];\n}\n\nlong long query(int node, int l, int r, int ql, int qr) {\n    if (ql <= l && r <= qr) return tree[node];\n    push(node, l, r);\n    int mid = l + (r - l) / 2;\n    long long sum = 0;\n    if (ql <= mid) sum += query(2 * node, l, mid, ql, qr);\n    if (qr > mid) sum += query(2 * node + 1, mid + 1, r, ql, qr);\n    return sum;\n}\n\nint main() {\n    int N, Q;\n    if (scanf(\"%d %d\", &N, &Q) != 2) return 0;\n    while (Q--) {\n        int type;\n        scanf(\"%d\", &type);\n        if (type == 1) {\n            int l, r; long long val;\n            scanf(\"%d %d %lld\", &l, &r, &val);\n            update(1, 0, N - 1, l, r, val);\n        } else {\n            int l, r;\n            scanf(\"%d %d\", &l, &r);\n            printf(\"%lld\\n\", query(1, 0, N - 1, l, r));\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nclass LazySegmentTree {\n    int n;\n    vector<long long> tree, lazy;\n\n    void push(int node, int l, int r) {\n        if (lazy[node] != 0) {\n            int mid = l + (r - l) / 2;\n            tree[2 * node] += lazy[node] * (mid - l + 1);\n            lazy[2 * node] += lazy[node];\n            tree[2 * node + 1] += lazy[node] * (r - mid);\n            lazy[2 * node + 1] += lazy[node];\n            lazy[node] = 0;\n        }\n    }\n\n    void update(int node, int l, int r, int ql, int qr, long long val) {\n        if (ql <= l && r <= qr) {\n            tree[node] += val * (r - l + 1);\n            lazy[node] += val;\n            return;\n        }\n        push(node, l, r);\n        int mid = l + (r - l) / 2;\n        if (ql <= mid) update(2 * node, l, mid, ql, qr, val);\n        if (qr > mid) update(2 * node + 1, mid + 1, r, ql, qr, val);\n        tree[node] = tree[2 * node] + tree[2 * node + 1];\n    }\n\n    long long query(int node, int l, int r, int ql, int qr) {\n        if (ql <= l && r <= qr) return tree[node];\n        push(node, l, r);\n        int mid = l + (r - l) / 2;\n        long long sum = 0;\n        if (ql <= mid) sum += query(2 * node, l, mid, ql, qr);\n        if (qr > mid) sum += query(2 * node + 1, mid + 1, r, ql, qr);\n        return sum;\n    }\n\npublic:\n    LazySegmentTree(int n) : n(n), tree(4 * n, 0), lazy(4 * n, 0) {}\n    void updateRange(int ql, int qr, long long val) { update(1, 0, n - 1, ql, qr, val); }\n    long long queryRange(int ql, int qr) { return query(1, 0, n - 1, ql, qr); }\n};\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int N, Q;\n    if (!(cin >> N >> Q)) return 0;\n    LazySegmentTree st(N);\n    while (Q--) {\n        int type; cin >> type;\n        if (type == 1) {\n            int l, r; long long val;\n            cin >> l >> r >> val;\n            st.updateRange(l, r, val);\n        } else {\n            int l, r; cin >> l >> r;\n            cout << st.queryRange(l, r) << \"\\n\";\n        }\n    }\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    static class LazySegmentTree {\n        int n;\n        long[] tree, lazy;\n        LazySegmentTree(int n) {\n            this.n = n;\n            this.tree = new long[4 * n];\n            this.lazy = new long[4 * n];\n        }\n        void push(int node, int l, int r) {\n            if (lazy[node] != 0) {\n                int mid = l + (r - l) / 2;\n                tree[2 * node] += lazy[node] * (mid - l + 1);\n                lazy[2 * node] += lazy[node];\n                tree[2 * node + 1] += lazy[node] * (r - mid);\n                lazy[2 * node + 1] += lazy[node];\n                lazy[node] = 0;\n            }\n        }\n        void update(int node, int l, int r, int ql, int qr, long val) {\n            if (ql <= l && r <= qr) {\n                tree[node] += val * (r - l + 1);\n                lazy[node] += val;\n                return;\n            }\n            push(node, l, r);\n            int mid = l + (r - l) / 2;\n            if (ql <= mid) update(2 * node, l, mid, ql, qr, val);\n            if (qr > mid) update(2 * node + 1, mid + 1, r, ql, qr, val);\n            tree[node] = tree[2 * node] + tree[2 * node + 1];\n        }\n        long query(int node, int l, int r, int ql, int qr) {\n            if (ql <= l && r <= qr) return tree[node];\n            push(node, l, r);\n            int mid = l + (r - l) / 2;\n            long sum = 0;\n            if (ql <= mid) sum += query(2 * node, l, mid, ql, qr);\n            if (qr > mid) sum += query(2 * node + 1, mid + 1, r, ql, qr);\n            return sum;\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int Q = sc.nextInt();\n        LazySegmentTree st = new LazySegmentTree(N);\n        while (Q-- > 0) {\n            int type = sc.nextInt();\n            if (type == 1) {\n                int l = sc.nextInt();\n                int r = sc.nextInt();\n                long val = sc.nextLong();\n                st.update(1, 0, N - 1, l, r, val);\n            } else {\n                int l = sc.nextInt();\n                int r = sc.nextInt();\n                System.out.println(st.query(1, 0, N - 1, l, r));\n            }\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n, q = int(input_data[0]), int(input_data[1])\n    tree = [0] * (4 * n)\n    lazy = [0] * (4 * n)\n\n    def push(node, l, r):\n        if lazy[node] != 0:\n            mid = l + (r - l) // 2\n            tree[2 * node] += lazy[node] * (mid - l + 1)\n            lazy[2 * node] += lazy[node]\n            tree[2 * node + 1] += lazy[node] * (r - mid)\n            lazy[2 * node + 1] += lazy[node]\n            lazy[node] = 0\n\n    def update(node, l, r, ql, qr, val):\n        if ql <= l and r <= qr:\n            tree[node] += val * (r - l + 1)\n            lazy[node] += val\n            return\n        push(node, l, r)\n        mid = l + (r - l) // 2\n        if ql <= mid:\n            update(2 * node, l, mid, ql, qr, val)\n        if qr > mid:\n            update(2 * node + 1, mid + 1, r, ql, qr, val)\n        tree[node] = tree[2 * node] + tree[2 * node + 1]\n\n    def query(node, l, r, ql, qr):\n        if ql <= l and r <= qr:\n            return tree[node]\n        push(node, l, r)\n        mid = l + (r - l) // 2\n        total = 0\n        if ql <= mid:\n            total += query(2 * node, l, mid, ql, qr)\n        if qr > mid:\n            total += query(2 * node + 1, mid + 1, r, ql, qr)\n        return total\n\n    idx = 2\n    out = []\n    for _ in range(q):\n        t = int(input_data[idx])\n        if t == 1:\n            l, r, v = int(input_data[idx + 1]), int(input_data[idx + 2]), int(input_data[idx + 3])\n            idx += 4\n            update(1, 0, n - 1, l, r, v)\n        else:\n            l, r = int(input_data[idx + 1]), int(input_data[idx + 2])\n            idx += 3\n            out.append(str(query(1, 0, n - 1, l, r)))\n\n    print('\\n'.join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d13-ch-3",
    "day": 13,
    "title": "Count of Smaller Numbers After Self (Fenwick Inversion Counting)",
    "difficulty": "Hard",
    "moduleTag": "14. Range Queries & Strings",
    "companies": [
      "Google",
      "Meta",
      "Amazon"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].",
    "inputFormat": "First line: N (number of elements).\nSecond line: N space-separated integers.",
    "outputFormat": "Space-separated integers representing counts.",
    "constraints": [
      "1 <= N <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "sampleInput": "4\n5 2 6 1",
    "sampleOutput": "2 1 1 0",
    "kapilIntuition": "Mentorship By Kapil: Iterate from right to left! Since numbers can be negative, offset values by +10001 (or coordinate compress). For each number, query the Fenwick Tree for count of elements strictly smaller than `val`: `query(val - 1)`. Then add 1 to the frequency of `val`: `add(val, 1)`. Reversing the answer gives the exact counts in O(N log M) time.",
    "timeComplexity": "O(N log M) where M is range of values",
    "spaceComplexity": "O(M)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "4\n5 2 6 1",
        "expectedOutput": "2 1 1 0",
        "isHidden": false,
        "explanation": "To the right of 5: 2 and 1 (2). Right of 2: 1 (1). Right of 6: 1 (1). Right of 1: none (0)."
      },
      {
        "id": "tc-2",
        "input": "2\n-1 -1",
        "expectedOutput": "0 0",
        "isHidden": false,
        "explanation": "Equal elements are not smaller."
      },
      {
        "id": "tc-3",
        "input": "1\n10",
        "expectedOutput": "0",
        "isHidden": true,
        "explanation": "Single element has 0 smaller elements."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N;\n    if (scanf(\"%d\", &N) != 1) return 0;\n    // Implement Fenwick Inversion Counting\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N;\n    if (!(cin >> N)) return 0;\n    // Implement Fenwick Inversion Counting\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        // Implement Fenwick Inversion Counting\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n = int(lines[0])\n    # Implement Fenwick Inversion Counting\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\n#define OFFSET 10001\n#define MAX_VAL 20005\n\nint bit[MAX_VAL + 5];\n\nvoid add(int idx, int val) {\n    for (; idx <= MAX_VAL; idx += idx & (-idx)) bit[idx] += val;\n}\n\nint query(int idx) {\n    int sum = 0;\n    for (; idx > 0; idx -= idx & (-idx)) sum += bit[idx];\n    return sum;\n}\n\nint main() {\n    int N;\n    if (scanf(\"%d\", &N) != 1) return 0;\n    int nums[100005], ans[100005];\n    for (int i = 0; i < N; i++) scanf(\"%d\", &nums[i]);\n\n    for (int i = N - 1; i >= 0; i--) {\n        int val = nums[i] + OFFSET;\n        ans[i] = query(val - 1);\n        add(val, 1);\n    }\n\n    for (int i = 0; i < N; i++) {\n        printf(\"%d%c\", ans[i], i == N - 1 ? '\\n' : ' ');\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nconst int OFFSET = 10001;\nconst int MAX_VAL = 20005;\n\nstruct Fenwick {\n    vector<int> bit;\n    Fenwick() : bit(MAX_VAL + 5, 0) {}\n    void add(int idx, int val) {\n        for (; idx <= MAX_VAL; idx += idx & (-idx)) bit[idx] += val;\n    }\n    int query(int idx) {\n        int sum = 0;\n        for (; idx > 0; idx -= idx & (-idx)) sum += bit[idx];\n        return sum;\n    }\n};\n\nint main() {\n    int N;\n    if (!(cin >> N)) return 0;\n    vector<int> nums(N), ans(N);\n    for (int i = 0; i < N; ++i) cin >> nums[i];\n\n    Fenwick ft;\n    for (int i = N - 1; i >= 0; --i) {\n        int val = nums[i] + OFFSET;\n        ans[i] = ft.query(val - 1);\n        ft.add(val, 1);\n    }\n\n    for (int i = 0; i < N; ++i) {\n        cout << ans[i] << (i == N - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    static final int OFFSET = 10001;\n    static final int MAX_VAL = 20005;\n\n    static class Fenwick {\n        int[] bit = new int[MAX_VAL + 5];\n        void add(int idx, int val) {\n            for (; idx <= MAX_VAL; idx += idx & (-idx)) bit[idx] += val;\n        }\n        int query(int idx) {\n            int sum = 0;\n            for (; idx > 0; idx -= idx & (-idx)) sum += bit[idx];\n            return sum;\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int[] nums = new int[N];\n        for (int i = 0; i < N; i++) nums[i] = sc.nextInt();\n\n        Fenwick ft = new Fenwick();\n        int[] ans = new int[N];\n        for (int i = N - 1; i >= 0; i--) {\n            int val = nums[i] + OFFSET;\n            ans[i] = ft.query(val - 1);\n            ft.add(val, 1);\n        }\n\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < N; i++) {\n            sb.append(ans[i]).append(i == N - 1 ? \"\" : \" \");\n        }\n        System.out.println(sb);\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:]]\n\n    offset = 10001\n    max_val = 20005\n    bit = [0] * (max_val + 5)\n\n    def add(idx, val):\n        while idx <= max_val:\n            bit[idx] += val\n            idx += idx & (-idx)\n\n    def query(idx):\n        total = 0\n        while idx > 0:\n            total += bit[idx]\n            idx -= idx & (-idx)\n        return total\n\n    ans = [0] * n\n    for i in range(n - 1, -1, -1):\n        v = nums[i] + offset\n        ans[i] = query(v - 1)\n        add(v, 1)\n\n    print(*(ans))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d13-ch-4",
    "day": 13,
    "title": "Range Minimum Query in O(1) (Sparse Table)",
    "difficulty": "Medium",
    "moduleTag": "14. Range Queries & Strings",
    "companies": [
      "Apple",
      "Amazon",
      "Citadel"
    ],
    "platforms": [
      "SPOJ",
      "Codeforces"
    ],
    "problemStatement": "Given an array of N integers and Q range minimum queries [L, R] (0-indexed). Answer each query in O(1) time using a Sparse Table.",
    "inputFormat": "First line: N Q.\nSecond line: N space-separated integers.\nNext Q lines: L R.",
    "outputFormat": "For each query, output the minimum element in range [L, R] on a new line.",
    "constraints": [
      "1 <= N, Q <= 10^5",
      "0 <= L <= R < N",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "sampleInput": "6 3\n4 2 3 7 1 5\n0 2\n1 4\n3 5",
    "sampleOutput": "2\n1\n1",
    "kapilIntuition": "Mentorship By Kapil: Build a 2D table st[k][i] = min(st[k-1][i], st[k-1][i + 2^(k-1)]). Precompute a log table in O(N). For query [L, R], let k = log2(R - L + 1). Return min(st[k][L], st[k][R - 2^k + 1]). This is guaranteed O(1) per query.",
    "timeComplexity": "O(N log N) build, O(1) query",
    "spaceComplexity": "O(N log N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "6 3\n4 2 3 7 1 5\n0 2\n1 4\n3 5",
        "expectedOutput": "2\n1\n1",
        "isHidden": false,
        "explanation": "min(4,2,3)=2; min(2,3,7,1)=1; min(7,1,5)=1."
      },
      {
        "id": "tc-2",
        "input": "3 1\n9 9 9\n0 2",
        "expectedOutput": "9",
        "isHidden": false,
        "explanation": "Identical elements."
      },
      {
        "id": "tc-3",
        "input": "4 2\n-5 10 -20 3\n0 3\n1 3",
        "expectedOutput": "-20\n-20",
        "isHidden": true,
        "explanation": "Negative numbers handled cleanly."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N, Q;\n    if (scanf(\"%d %d\", &N, &Q) != 2) return 0;\n    // Implement Sparse Table RMQ\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N, Q;\n    if (!(cin >> N >> Q)) return 0;\n    // Implement Sparse Table RMQ\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement Sparse Table RMQ\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, q = int(lines[0]), int(lines[1])\n    # Implement Sparse Table RMQ\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\n#define MAX_N 100005\n#define MAX_LOG 18\n#define MIN(a, b) ((a) < (b) ? (a) : (b))\n\nint st[MAX_LOG][MAX_N], lg[MAX_N];\n\nint main() {\n    int N, Q;\n    if (scanf(\"%d %d\", &N, &Q) != 2) return 0;\n    lg[1] = 0;\n    for (int i = 2; i <= N; i++) lg[i] = lg[i / 2] + 1;\n\n    for (int i = 0; i < N; i++) scanf(\"%d\", &st[0][i]);\n\n    for (int k = 1; (1 << k) <= N; k++) {\n        int half = 1 << (k - 1);\n        for (int i = 0; i + (1 << k) <= N; i++) {\n            st[k][i] = MIN(st[k - 1][i], st[k - 1][i + half]);\n        }\n    }\n\n    while (Q--) {\n        int l, r;\n        scanf(\"%d %d\", &l, &r);\n        int k = lg[r - l + 1];\n        printf(\"%d\\n\", MIN(st[k][l], st[k][r - (1 << k) + 1]));\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int N, Q;\n    if (!(cin >> N >> Q)) return 0;\n\n    vector<int> lg(N + 1, 0);\n    for (int i = 2; i <= N; ++i) lg[i] = lg[i / 2] + 1;\n\n    int maxLog = lg[N] + 1;\n    vector<vector<int>> st(maxLog, vector<int>(N));\n    for (int i = 0; i < N; ++i) cin >> st[0][i];\n\n    for (int k = 1; (1 << k) <= N; ++k) {\n        int half = 1 << (k - 1);\n        for (int i = 0; i + (1 << k) <= N; ++i) {\n            st[k][i] = min(st[k - 1][i], st[k - 1][i + half]);\n        }\n    }\n\n    while (Q--) {\n        int l, r; cin >> l >> r;\n        int k = lg[r - l + 1];\n        cout << min(st[k][l], st[k][r - (1 << k) + 1]) << \"\\n\";\n    }\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int Q = sc.nextInt();\n\n        int[] lg = new int[N + 1];\n        for (int i = 2; i <= N; i++) lg[i] = lg[i / 2] + 1;\n\n        int maxLog = lg[N] + 1;\n        int[][] st = new int[maxLog][N];\n        for (int i = 0; i < N; i++) st[0][i] = sc.nextInt();\n\n        for (int k = 1; (1 << k) <= N; k++) {\n            int half = 1 << (k - 1);\n            for (int i = 0; i + (1 << k) <= N; i++) {\n                st[k][i] = Math.min(st[k - 1][i], st[k - 1][i + half]);\n            }\n        }\n\n        StringBuilder sb = new StringBuilder();\n        while (Q-- > 0) {\n            int l = sc.nextInt();\n            int r = sc.nextInt();\n            int k = lg[r - l + 1];\n            sb.append(Math.min(st[k][l], st[k][r - (1 << k) + 1])).append(\"\\n\");\n        }\n        System.out.print(sb);\n    }\n}",
      "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n, q = int(input_data[0]), int(input_data[1])\n    lg = [0] * (n + 1)\n    for i in range(2, n + 1):\n        lg[i] = lg[i // 2] + 1\n\n    max_log = lg[n] + 1\n    st = [[0] * n for _ in range(max_log)]\n\n    idx = 2\n    for i in range(n):\n        st[0][i] = int(input_data[idx])\n        idx += 1\n\n    for k in range(1, max_log):\n        span = 1 << k\n        half = 1 << (k - 1)\n        for i in range(n - span + 1):\n            st[k][i] = min(st[k - 1][i], st[k - 1][i + half])\n\n    out = []\n    for _ in range(q):\n        l, r = int(input_data[idx]), int(input_data[idx + 1])\n        idx += 2\n        k = lg[r - l + 1]\n        out.append(str(min(st[k][l], st[k][r - (1 << k) + 1])))\n\n    print('\\n'.join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d13-ch-5",
    "day": 13,
    "title": "Implement strStr() / Substring Search (KMP Algorithm)",
    "difficulty": "Medium",
    "moduleTag": "14. Range Queries & Strings",
    "companies": [
      "Google",
      "Meta",
      "Amazon",
      "Apple"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "Given two strings haystack and needle, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.",
    "inputFormat": "First line: haystack string.\nSecond line: needle string.",
    "outputFormat": "Single integer representing the 0-based index of the first occurrence, or -1.",
    "constraints": [
      "1 <= haystack.length, needle.length <= 10^5",
      "Both strings contain only lowercase English characters"
    ],
    "sampleInput": "sadbutsad\nsad",
    "sampleOutput": "0",
    "kapilIntuition": "Mentorship By Kapil: Precompute the longest prefix-suffix (LPS / $\\pi$) array of `needle`. When matching with `haystack`, on mismatch do not rewind the text pointer; simply jump `j = lps[j - 1]`. Guarantees strictly linear O(N + M) runtime.",
    "timeComplexity": "O(N + M)",
    "spaceComplexity": "O(M)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "sadbutsad\nsad",
        "expectedOutput": "0",
        "isHidden": false,
        "explanation": "\"sad\" appears first at index 0."
      },
      {
        "id": "tc-2",
        "input": "leetcode\nleeto",
        "expectedOutput": "-1",
        "isHidden": false,
        "explanation": "\"leeto\" does not appear in \"leetcode\"."
      },
      {
        "id": "tc-3",
        "input": "mississippi\nissip",
        "expectedOutput": "4",
        "isHidden": true,
        "explanation": "\"issip\" begins at index 4."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char h[100005], n[100005];\n    if (scanf(\"%100004s %100004s\", h, n) != 2) return 0;\n    // Implement KMP\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string h, n;\n    if (!(cin >> h >> n)) return 0;\n    // Implement KMP\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String h = sc.next();\n        String n = sc.next();\n        // Implement KMP\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if len(lines) < 2:\n        return\n    h, n = lines[0], lines[1]\n    # Implement KMP\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nint lps[100005];\n\nint main() {\n    char h[100005], n[100005];\n    if (scanf(\"%100004s %100004s\", h, n) != 2) return 0;\n    int lenH = strlen(h), lenN = strlen(n);\n\n    int len = 0, i = 1;\n    lps[0] = 0;\n    while (i < lenN) {\n        if (n[i] == n[len]) lps[i++] = ++len;\n        else if (len != 0) len = lps[len - 1];\n        else lps[i++] = 0;\n    }\n\n    int pText = 0, pPat = 0;\n    while (pText < lenH) {\n        if (h[pText] == n[pPat]) {\n            pText++; pPat++;\n        }\n        if (pPat == lenN) {\n            printf(\"%d\\n\", pText - pPat);\n            return 0;\n        } else if (pText < lenH && h[pText] != n[pPat]) {\n            if (pPat != 0) pPat = lps[pPat - 1];\n            else pText++;\n        }\n    }\n    printf(\"-1\\n\");\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string h, n;\n    if (!(cin >> h >> n)) return 0;\n    int lenH = h.size(), lenN = n.size();\n\n    vector<int> lps(lenN, 0);\n    int len = 0, i = 1;\n    while (i < lenN) {\n        if (n[i] == n[len]) lps[i++] = ++len;\n        else if (len != 0) len = lps[len - 1];\n        else lps[i++] = 0;\n    }\n\n    int pText = 0, pPat = 0;\n    while (pText < lenH) {\n        if (h[pText] == n[pPat]) {\n            pText++; pPat++;\n        }\n        if (pPat == lenN) {\n            cout << pText - pPat << endl;\n            return 0;\n        } else if (pText < lenH && h[pText] != n[pPat]) {\n            if (pPat != 0) pPat = lps[pPat - 1];\n            else pText++;\n        }\n    }\n    cout << -1 << endl;\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String h = sc.next();\n        String n = sc.next();\n        int lenH = h.length(), lenN = n.length();\n\n        int[] lps = new int[lenN];\n        int len = 0, i = 1;\n        while (i < lenN) {\n            if (n.charAt(i) == n.charAt(len)) lps[i++] = ++len;\n            else if (len != 0) len = lps[len - 1];\n            else lps[i++] = 0;\n        }\n\n        int pText = 0, pPat = 0;\n        while (pText < lenH) {\n            if (h.charAt(pText) == n.charAt(pPat)) {\n                pText++; pPat++;\n            }\n            if (pPat == lenN) {\n                System.out.println(pText - pPat);\n                return;\n            } else if (pText < lenH && h.charAt(pText) != n.charAt(pPat)) {\n                if (pPat != 0) pPat = lps[pPat - 1];\n                else pText++;\n            }\n        }\n        System.out.println(-1);\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if len(lines) < 2:\n        return\n    h, n = lines[0], lines[1]\n    len_h, len_n = len(h), len(n)\n\n    lps = [0] * len_n\n    l, i = 0, 1\n    while i < len_n:\n        if n[i] == n[l]:\n            l += 1\n            lps[i] = l\n            i += 1\n        elif l != 0:\n            l = lps[l - 1]\n        else:\n            lps[i] = 0\n            i += 1\n\n    pt, pp = 0, 0\n    while pt < len_h:\n        if h[pt] == n[pp]:\n            pt += 1\n            pp += 1\n        if pp == len_n:\n            print(pt - pp)\n            return\n        elif pt < len_h and h[pt] != n[pp]:\n            if pp != 0:\n                pp = lps[pp - 1]\n            else:\n                pt += 1\n\n    print(-1)\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d13-ch-6",
    "day": 13,
    "title": "Longest Happy Prefix / String Periodicity",
    "difficulty": "Hard",
    "moduleTag": "14. Range Queries & Strings",
    "companies": [
      "Google",
      "Microsoft"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "A string is called a happy prefix if is a non-empty prefix which is also a suffix (excluding the entire string itself). Given a string s, return the longest happy prefix of s. Return an empty string \"\" if no such prefix exists.",
    "inputFormat": "Single line: string s.",
    "outputFormat": "Single line: longest happy prefix substring or empty line.",
    "constraints": [
      "1 <= s.length <= 10^5",
      "s contains only lowercase English characters"
    ],
    "sampleInput": "level",
    "sampleOutput": "l",
    "kapilIntuition": "Mentorship By Kapil: The KMP prefix function value $\\pi[N - 1]$ gives the length of the longest proper prefix of s that is also a suffix of s. Simply compute the $\\pi$ array for string s in O(N) time and return the prefix substring of length $\\pi[N - 1]$.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "level",
        "expectedOutput": "l",
        "isHidden": false,
        "explanation": "\"l\" is both prefix and suffix of \"level\"."
      },
      {
        "id": "tc-2",
        "input": "ababab",
        "expectedOutput": "abab",
        "isHidden": false,
        "explanation": "\"abab\" is both prefix and suffix of \"ababab\"."
      },
      {
        "id": "tc-3",
        "input": "leetcodele",
        "expectedOutput": "le",
        "isHidden": true,
        "explanation": "\"le\" is both prefix and suffix of \"leetcodele\"."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[100005];\n    if (scanf(\"%100004s\", s) != 1) return 0;\n    // Compute KMP prefix function\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string s;\n    if (!(cin >> s)) return 0;\n    // Compute KMP prefix function\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // Compute KMP prefix function\n    }\n}",
      "python": "import sys\n\ndef main():\n    line = sys.stdin.read().strip()\n    if not line:\n        return\n    # Compute KMP prefix function\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nint pi[100005];\n\nint main() {\n    char s[100005];\n    if (scanf(\"%100004s\", s) != 1) return 0;\n    int n = strlen(s);\n\n    pi[0] = 0;\n    for (int i = 1; i < n; i++) {\n        int j = pi[i - 1];\n        while (j > 0 && s[i] != s[j]) j = pi[j - 1];\n        if (s[i] == s[j]) j++;\n        pi[i] = j;\n    }\n\n    int len = pi[n - 1];\n    s[len] = '\\0';\n    printf(\"%s\\n\", s);\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string s;\n    if (!(cin >> s)) return 0;\n    int n = s.size();\n    vector<int> pi(n, 0);\n\n    for (int i = 1; i < n; ++i) {\n        int j = pi[i - 1];\n        while (j > 0 && s[i] != s[j]) j = pi[j - 1];\n        if (s[i] == s[j]) j++;\n        pi[i] = j;\n    }\n\n    int len = pi[n - 1];\n    cout << s.substr(0, len) << endl;\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        int n = s.length();\n        int[] pi = new int[n];\n\n        for (int i = 1; i < n; i++) {\n            int j = pi[i - 1];\n            while (j > 0 && s.charAt(i) != s.charAt(j)) j = pi[j - 1];\n            if (s.charAt(i) == s.charAt(j)) j++;\n            pi[i] = j;\n        }\n\n        int len = pi[n - 1];\n        System.out.println(s.substring(0, len));\n    }\n}",
      "python": "import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = len(s)\n    pi = [0] * n\n\n    for i in range(1, n):\n        j = pi[i - 1]\n        while j > 0 and s[i] != s[j]:\n            j = pi[j - 1]\n        if s[i] == s[j]:\n            j += 1\n        pi[i] = j\n\n    print(s[:pi[n - 1]])\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d13-ch-7",
    "day": 13,
    "title": "Maximum XOR of Two Numbers in an Array (Bitwise Trie)",
    "difficulty": "Medium",
    "moduleTag": "14. Range Queries & Strings",
    "companies": [
      "Google",
      "Meta",
      "Uber"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < nums.length.",
    "inputFormat": "First line: N (number of elements).\nSecond line: N space-separated non-negative integers.",
    "outputFormat": "Single integer representing the maximum XOR value.",
    "constraints": [
      "1 <= N <= 2 * 10^5",
      "0 <= nums[i] <= 2^31 - 1"
    ],
    "sampleInput": "6\n3 10 5 25 2 8",
    "sampleOutput": "28",
    "kapilIntuition": "Mentorship By Kapil: Construct a Bitwise Trie of depth 31. For each number, greedily choose the opposite bit `1 - bit` at each level if present to maximize the resulting bit. Total time is strictly O(32 * N).",
    "timeComplexity": "O(32 * N)",
    "spaceComplexity": "O(32 * N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "6\n3 10 5 25 2 8",
        "expectedOutput": "28",
        "isHidden": false,
        "explanation": "5 ^ 25 = 28."
      },
      {
        "id": "tc-2",
        "input": "3\n14 70 53",
        "expectedOutput": "127",
        "isHidden": false,
        "explanation": "70 ^ 53 = 127."
      },
      {
        "id": "tc-3",
        "input": "1\n0",
        "expectedOutput": "0",
        "isHidden": true,
        "explanation": "0 ^ 0 = 0."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N;\n    if (scanf(\"%d\", &N) != 1) return 0;\n    // Implement Bitwise Trie\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N;\n    if (!(cin >> N)) return 0;\n    // Implement Bitwise Trie\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        // Implement Bitwise Trie\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n = int(lines[0])\n    # Implement Bitwise Trie\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n\ntypedef struct Node {\n    struct Node* next[2];\n} Node;\n\nNode* newNode() {\n    Node* n = (Node*)malloc(sizeof(Node));\n    n->next[0] = n->next[1] = NULL;\n    return n;\n}\n\nvoid insert(Node* root, int num) {\n    Node* curr = root;\n    for (int i = 30; i >= 0; i--) {\n        int b = (num >> i) & 1;\n        if (!curr->next[b]) curr->next[b] = newNode();\n        curr = curr->next[b];\n    }\n}\n\nint getMaxXor(Node* root, int num) {\n    Node* curr = root;\n    int ans = 0;\n    for (int i = 30; i >= 0; i--) {\n        int b = (num >> i) & 1;\n        int want = 1 - b;\n        if (curr->next[want]) {\n            ans |= (1 << i);\n            curr = curr->next[want];\n        } else {\n            curr = curr->next[b];\n        }\n    }\n    return ans;\n}\n\nint main() {\n    int N;\n    if (scanf(\"%d\", &N) != 1) return 0;\n    int nums[200005];\n    Node* root = newNode();\n    for (int i = 0; i < N; i++) {\n        scanf(\"%d\", &nums[i]);\n        insert(root, nums[i]);\n    }\n    int maxXor = 0;\n    for (int i = 0; i < N; i++) {\n        maxXor = MAX(maxXor, getMaxXor(root, nums[i]));\n    }\n    printf(\"%d\\n\", maxXor);\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nstruct Node {\n    Node* next[2] = {nullptr, nullptr};\n};\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int N;\n    if (!(cin >> N)) return 0;\n    vector<int> nums(N);\n    Node* root = new Node();\n\n    for (int i = 0; i < N; ++i) {\n        cin >> nums[i];\n        Node* curr = root;\n        for (int b = 30; b >= 0; --b) {\n            int bit = (nums[i] >> b) & 1;\n            if (!curr->next[bit]) curr->next[bit] = new Node();\n            curr = curr->next[bit];\n        }\n    }\n\n    int maxXor = 0;\n    for (int x : nums) {\n        Node* curr = root;\n        int curXor = 0;\n        for (int b = 30; b >= 0; --b) {\n            int bit = (x >> b) & 1;\n            int want = 1 - bit;\n            if (curr->next[want]) {\n                curXor |= (1 << b);\n                curr = curr->next[want];\n            } else {\n                curr = curr->next[bit];\n            }\n        }\n        maxXor = max(maxXor, curXor);\n    }\n    cout << maxXor << endl;\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    static class Node {\n        Node[] next = new Node[2];\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int[] nums = new int[N];\n        Node root = new Node();\n\n        for (int i = 0; i < N; i++) {\n            nums[i] = sc.nextInt();\n            Node curr = root;\n            for (int b = 30; b >= 0; b--) {\n                int bit = (nums[i] >> b) & 1;\n                if (curr.next[bit] == null) curr.next[bit] = new Node();\n                curr = curr.next[bit];\n            }\n        }\n\n        int maxXor = 0;\n        for (int x : nums) {\n            Node curr = root;\n            int curXor = 0;\n            for (int b = 30; b >= 0; b--) {\n                int bit = (x >> b) & 1;\n                int want = 1 - bit;\n                if (curr.next[want] != null) {\n                    curXor |= (1 << b);\n                    curr = curr.next[want];\n                } else {\n                    curr = curr.next[bit];\n                }\n            }\n            maxXor = Math.max(maxXor, curXor);\n        }\n        System.out.println(maxXor);\n    }\n}",
      "python": "import sys\n\nclass Node:\n    def __init__(self):\n        self.next = [None, None]\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:]]\n\n    root = Node()\n    for x in nums:\n        curr = root\n        for b in range(30, -1, -1):\n            bit = (x >> b) & 1\n            if not curr.next[bit]:\n                curr.next[bit] = Node()\n            curr = curr.next[bit]\n\n    max_xor = 0\n    for x in nums:\n        curr = root\n        cur_xor = 0\n        for b in range(30, -1, -1):\n            bit = (x >> b) & 1\n            want = 1 - bit\n            if curr.next[want]:\n                cur_xor |= (1 << b)\n                curr = curr.next[want]\n            else:\n                curr = curr.next[bit]\n        if cur_xor > max_xor:\n            max_xor = cur_xor\n\n    print(max_xor)\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d13-ch-8",
    "day": 13,
    "title": "Maximum XOR Subarray (Prefix XOR + Trie)",
    "difficulty": "Hard",
    "moduleTag": "14. Range Queries & Strings",
    "companies": [
      "Amazon",
      "Microsoft",
      "Citadel"
    ],
    "platforms": [
      "GeeksforGeeks",
      "CodeChef"
    ],
    "problemStatement": "Given an array of N integers, find the maximum XOR subarray value (i.e. maximum XOR sum among all contiguous subarrays).",
    "inputFormat": "First line: N.\nSecond line: N space-separated integers.",
    "outputFormat": "Single integer representing the maximum XOR subarray sum.",
    "constraints": [
      "1 <= N <= 10^5",
      "0 <= nums[i] <= 10^9"
    ],
    "sampleInput": "4\n1 2 3 4",
    "sampleOutput": "7",
    "kapilIntuition": "Mentorship By Kapil: `XOR(L..R) = prefixXOR[R] ^ prefixXOR[L - 1]`. Therefore, insert prefix XORs sequentially into a Bitwise Trie. Start with prefix 0 in the Trie. At each element, query the Trie with current `prefixXor` to find the maximum possible XOR pair, then insert `prefixXor`.",
    "timeComplexity": "O(32 * N)",
    "spaceComplexity": "O(32 * N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "4\n1 2 3 4",
        "expectedOutput": "7",
        "isHidden": false,
        "explanation": "Subarray [3, 4] gives 3 ^ 4 = 7."
      },
      {
        "id": "tc-2",
        "input": "3\n8 1 2",
        "expectedOutput": "11",
        "isHidden": false,
        "explanation": "Subarray [8, 1, 2] gives 8 ^ 1 ^ 2 = 11."
      },
      {
        "id": "tc-3",
        "input": "1\n42",
        "expectedOutput": "42",
        "isHidden": true,
        "explanation": "Single element is 42."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N;\n    if (scanf(\"%d\", &N) != 1) return 0;\n    // Implement Maximum XOR Subarray\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N;\n    if (!(cin >> N)) return 0;\n    // Implement Maximum XOR Subarray\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        // Implement Maximum XOR Subarray\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n = int(lines[0])\n    # Implement Maximum XOR Subarray\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n\ntypedef struct Node {\n    struct Node* next[2];\n} Node;\n\nNode* newNode() {\n    Node* n = (Node*)malloc(sizeof(Node));\n    n->next[0] = n->next[1] = NULL;\n    return n;\n}\n\nvoid insert(Node* root, int num) {\n    Node* curr = root;\n    for (int i = 30; i >= 0; i--) {\n        int b = (num >> i) & 1;\n        if (!curr->next[b]) curr->next[b] = newNode();\n        curr = curr->next[b];\n    }\n}\n\nint query(Node* root, int num) {\n    Node* curr = root;\n    int ans = 0;\n    for (int i = 30; i >= 0; i--) {\n        int b = (num >> i) & 1;\n        int want = 1 - b;\n        if (curr->next[want]) {\n            ans |= (1 << i);\n            curr = curr->next[want];\n        } else {\n            curr = curr->next[b];\n        }\n    }\n    return ans;\n}\n\nint main() {\n    int N;\n    if (scanf(\"%d\", &N) != 1) return 0;\n    Node* root = newNode();\n    insert(root, 0);\n\n    int prefixXor = 0, maxXor = 0;\n    for (int i = 0; i < N; i++) {\n        int val;\n        scanf(\"%d\", &val);\n        prefixXor ^= val;\n        maxXor = MAX(maxXor, query(root, prefixXor));\n        insert(root, prefixXor);\n    }\n    printf(\"%d\\n\", maxXor);\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nstruct Node {\n    Node* next[2] = {nullptr, nullptr};\n};\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int N;\n    if (!(cin >> N)) return 0;\n\n    Node* root = new Node();\n    auto insert = [&](int num) {\n        Node* curr = root;\n        for (int b = 30; b >= 0; --b) {\n            int bit = (num >> b) & 1;\n            if (!curr->next[bit]) curr->next[bit] = new Node();\n            curr = curr->next[bit];\n        }\n    };\n\n    auto query = [&](int num) {\n        Node* curr = root;\n        int ans = 0;\n        for (int b = 30; b >= 0; --b) {\n            int bit = (num >> b) & 1;\n            int want = 1 - bit;\n            if (curr->next[want]) {\n                ans |= (1 << b);\n                curr = curr->next[want];\n            } else {\n                curr = curr->next[bit];\n            }\n        }\n        return ans;\n    };\n\n    insert(0);\n    int prefixXor = 0, maxXor = 0;\n    for (int i = 0; i < N; ++i) {\n        int val; cin >> val;\n        prefixXor ^= val;\n        maxXor = max(maxXor, query(prefixXor));\n        insert(prefixXor);\n    }\n    cout << maxXor << endl;\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    static class Node {\n        Node[] next = new Node[2];\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        Node root = new Node();\n\n        // insert 0\n        Node c = root;\n        for (int b = 30; b >= 0; b--) {\n            c.next[0] = new Node();\n            c = c.next[0];\n        }\n\n        int prefixXor = 0, maxXor = 0;\n        for (int i = 0; i < N; i++) {\n            prefixXor ^= sc.nextInt();\n\n            // query\n            c = root;\n            int curXor = 0;\n            for (int b = 30; b >= 0; b--) {\n                int bit = (prefixXor >> b) & 1;\n                int want = 1 - bit;\n                if (c.next[want] != null) {\n                    curXor |= (1 << b);\n                    c = c.next[want];\n                } else {\n                    c = c.next[bit];\n                }\n            }\n            maxXor = Math.max(maxXor, curXor);\n\n            // insert prefixXor\n            c = root;\n            for (int b = 30; b >= 0; b--) {\n                int bit = (prefixXor >> b) & 1;\n                if (c.next[bit] == null) c.next[bit] = new Node();\n                c = c.next[bit];\n            }\n        }\n        System.out.println(maxXor);\n    }\n}",
      "python": "import sys\n\nclass Node:\n    def __init__(self):\n        self.next = [None, None]\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:]]\n\n    root = Node()\n\n    def insert(num):\n        curr = root\n        for b in range(30, -1, -1):\n            bit = (num >> b) & 1\n            if not curr.next[bit]:\n                curr.next[bit] = Node()\n            curr = curr.next[bit]\n\n    def query(num):\n        curr = root\n        ans = 0\n        for b in range(30, -1, -1):\n            bit = (num >> b) & 1\n            want = 1 - bit\n            if curr.next[want]:\n                ans |= (1 << b)\n                curr = curr.next[want]\n            else:\n                curr = curr.next[bit]\n        return ans\n\n    insert(0)\n    prefix_xor = 0\n    max_xor = 0\n\n    for x in nums:\n        prefix_xor ^= x\n        res = query(prefix_xor)\n        if res > max_xor:\n            max_xor = res\n        insert(prefix_xor)\n\n    print(max_xor)\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d13-ch-9",
    "day": 13,
    "title": "Stream of Characters (Reverse Suffix Trie)",
    "difficulty": "Hard",
    "moduleTag": "14. Range Queries & Strings",
    "companies": [
      "Google",
      "Amazon",
      "Apple"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "Given an array of dictionary words and a stream of incoming characters, for each incoming character determine if any suffix of the stream of characters received so far matches one of the dictionary words. Return `true` if a match exists, else `false`.",
    "inputFormat": "First line: W (number of words).\nSecond line: W space-separated words.\nThird line: C (number of stream characters).\nFourth line: C space-separated characters.",
    "outputFormat": "Space-separated `true` or `false` values for each character in stream.",
    "constraints": [
      "1 <= W <= 2000",
      "1 <= word.length <= 200",
      "1 <= C <= 2000",
      "All characters are lowercase English letters"
    ],
    "sampleInput": "3\ncd f kl\n6\na b c d e f",
    "sampleOutput": "false false false true false true",
    "kapilIntuition": "Mentorship By Kapil: Reverse the intuition! If you insert words in reverse order into a Trie, then checking if any suffix of the stream matches a dictionary word is equivalent to walking down the Trie starting from the MOST RECENT stream character backwards. If you encounter an `isEnd` node, return true immediately.",
    "timeComplexity": "O(W * L + C * L)",
    "spaceComplexity": "O(W * L)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "3\ncd f kl\n6\na b c d e f",
        "expectedOutput": "false false false true false true",
        "isHidden": false,
        "explanation": "Suffix \"cd\" matches word \"cd\" at d; suffix \"f\" matches word \"f\" at f."
      },
      {
        "id": "tc-2",
        "input": "1\nab\n2\na b",
        "expectedOutput": "false true",
        "isHidden": false,
        "explanation": "\"ab\" matches at character b."
      },
      {
        "id": "tc-3",
        "input": "1\na\n1\na",
        "expectedOutput": "true",
        "isHidden": true,
        "explanation": "Single character word matches immediately."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n#include <stdbool.h>\n\nint main() {\n    int W;\n    if (scanf(\"%d\", &W) != 1) return 0;\n    // Implement Reverse Suffix Trie\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int W;\n    if (!(cin >> W)) return 0;\n    // Implement Reverse Suffix Trie\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int W = sc.nextInt();\n        // Implement Reverse Suffix Trie\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    w = int(lines[0])\n    # Implement Reverse Suffix Trie\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\ntypedef struct TrieNode {\n    struct TrieNode* next[26];\n    bool isEnd;\n} TrieNode;\n\nTrieNode* newNode() {\n    TrieNode* n = (TrieNode*)malloc(sizeof(TrieNode));\n    for (int i = 0; i < 26; i++) n->next[i] = NULL;\n    n->isEnd = false;\n    return n;\n}\n\nvoid insertRev(TrieNode* root, const char* word) {\n    int len = strlen(word);\n    TrieNode* curr = root;\n    for (int i = len - 1; i >= 0; i--) {\n        int idx = word[i] - 'a';\n        if (!curr->next[idx]) curr->next[idx] = newNode();\n        curr = curr->next[idx];\n    }\n    curr->isEnd = true;\n}\n\nint main() {\n    int W;\n    if (scanf(\"%d\", &W) != 1) return 0;\n    TrieNode* root = newNode();\n    char word[256];\n    for (int i = 0; i < W; i++) {\n        scanf(\"%255s\", word);\n        insertRev(root, word);\n    }\n\n    int C;\n    if (scanf(\"%d\", &C) != 1) return 0;\n    char stream[2005];\n    int streamLen = 0;\n\n    for (int i = 0; i < C; i++) {\n        char ch[8];\n        scanf(\"%7s\", ch);\n        stream[streamLen++] = ch[0];\n\n        TrieNode* curr = root;\n        bool found = false;\n        for (int j = streamLen - 1; j >= 0; j--) {\n            int idx = stream[j] - 'a';\n            if (!curr->next[idx]) break;\n            curr = curr->next[idx];\n            if (curr->isEnd) { found = true; break; }\n        }\n        printf(\"%s%c\", found ? \"true\" : \"false\", i == C - 1 ? '\\n' : ' ');\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nstruct TrieNode {\n    TrieNode* next[26] = {nullptr};\n    bool isEnd = false;\n};\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int W;\n    if (!(cin >> W)) return 0;\n    TrieNode* root = new TrieNode();\n\n    for (int i = 0; i < W; ++i) {\n        string w; cin >> w;\n        TrieNode* curr = root;\n        for (int j = (int)w.size() - 1; j >= 0; --j) {\n            int idx = w[j] - 'a';\n            if (!curr->next[idx]) curr->next[idx] = new TrieNode();\n            curr = curr->next[idx];\n        }\n        curr->isEnd = true;\n    }\n\n    int C; cin >> C;\n    vector<char> stream;\n    for (int i = 0; i < C; ++i) {\n        char ch; cin >> ch;\n        stream.push_back(ch);\n        TrieNode* curr = root;\n        bool found = false;\n        for (int j = (int)stream.size() - 1; j >= 0; --j) {\n            int idx = stream[j] - 'a';\n            if (!curr->next[idx]) break;\n            curr = curr->next[idx];\n            if (curr->isEnd) { found = true; break; }\n        }\n        cout << (found ? \"true\" : \"false\") << (i == C - 1 ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    static class TrieNode {\n        TrieNode[] next = new TrieNode[26];\n        boolean isEnd = false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int W = sc.nextInt();\n        TrieNode root = new TrieNode();\n\n        for (int i = 0; i < W; i++) {\n            String w = sc.next();\n            TrieNode curr = root;\n            for (int j = w.length() - 1; j >= 0; j--) {\n                int idx = w.charAt(j) - 'a';\n                if (curr.next[idx] == null) curr.next[idx] = new TrieNode();\n                curr = curr.next[idx];\n            }\n            curr.isEnd = true;\n        }\n\n        int C = sc.nextInt();\n        StringBuilder stream = new StringBuilder();\n        StringBuilder out = new StringBuilder();\n\n        for (int i = 0; i < C; i++) {\n            char ch = sc.next().charAt(0);\n            stream.append(ch);\n            TrieNode curr = root;\n            boolean found = false;\n\n            for (int j = stream.length() - 1; j >= 0; j--) {\n                int idx = stream.charAt(j) - 'a';\n                if (curr.next[idx] == null) break;\n                curr = curr.next[idx];\n                if (curr.isEnd) { found = true; break; }\n            }\n            out.append(found ? \"true\" : \"false\").append(i == C - 1 ? \"\" : \" \");\n        }\n        System.out.println(out);\n    }\n}",
      "python": "import sys\n\nclass TrieNode:\n    def __init__(self):\n        self.next = {}\n        self.is_end = False\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    w = int(lines[0])\n    words = lines[1:w + 1]\n    c = int(lines[w + 1])\n    chars = lines[w + 2:w + 2 + c]\n\n    root = TrieNode()\n    for word in words:\n        curr = root\n        for ch in reversed(word):\n            if ch not in curr.next:\n                curr.next[ch] = TrieNode()\n            curr = curr.next[ch]\n        curr.is_end = True\n\n    stream = []\n    out = []\n    for ch in chars:\n        stream.append(ch)\n        curr = root\n        found = False\n        for s_ch in reversed(stream):\n            if s_ch not in curr.next:\n                break\n            curr = curr.next[s_ch]\n            if curr.is_end:\n                found = True\n                break\n        out.append(\"true\" if found else \"false\")\n\n    print(' '.join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d13-ch-10",
    "day": 13,
    "title": "Shortest Palindrome (KMP Prefix Function)",
    "difficulty": "Hard",
    "moduleTag": "14. Range Queries & Strings",
    "companies": [
      "Google",
      "Microsoft",
      "Amazon"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "Given a string s, you can convert it to a palindrome by adding characters in front of it. Find and return the shortest palindrome you can find by performing this transformation.",
    "inputFormat": "Single line: string s.",
    "outputFormat": "Single line: shortest palindrome string.",
    "constraints": [
      "0 <= s.length <= 10^5",
      "s consists of lowercase English letters only"
    ],
    "sampleInput": "aacecaaa",
    "sampleOutput": "aaacecaaa",
    "kapilIntuition": "Mentorship By Kapil: Adding characters in front means finding the LONGEST palindromic prefix of s! Let `rev = reverse(s)`. Construct string `combined = s + \"#\" + rev`. Run KMP prefix function on `combined`. The last value `pi[combined.length - 1]` gives the exact length of the longest palindromic prefix of s. The remaining suffix of s after index `len` is reversed and prepended to s.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "aacecaaa",
        "expectedOutput": "aaacecaaa",
        "isHidden": false,
        "explanation": "Longest palindromic prefix is \"aacecaa\" (len 7). Prepend remaining 'a' -> \"aaacecaaa\"."
      },
      {
        "id": "tc-2",
        "input": "abcd",
        "expectedOutput": "dcbabcd",
        "isHidden": false,
        "explanation": "Longest palindromic prefix is \"a\" (len 1). Prepend reverse(\"bcd\") = \"dcb\"."
      },
      {
        "id": "tc-3",
        "input": "a",
        "expectedOutput": "a",
        "isHidden": true,
        "explanation": "Single character is already a palindrome."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[100005];\n    if (scanf(\"%100004s\", s) != 1) { printf(\"\\n\"); return 0; }\n    // Implement KMP Shortest Palindrome\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string s;\n    if (!(cin >> s)) { cout << endl; return 0; }\n    // Implement KMP Shortest Palindrome\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) { System.out.println(); return; }\n        String s = sc.next();\n        // Implement KMP Shortest Palindrome\n    }\n}",
      "python": "import sys\n\ndef main():\n    line = sys.stdin.read().strip()\n    if not line:\n        print(\"\")\n        return\n    # Implement KMP Shortest Palindrome\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint pi[200010];\n\nint main() {\n    char s[100005];\n    if (scanf(\"%100004s\", s) != 1) { printf(\"\\n\"); return 0; }\n    int n = strlen(s);\n    if (n <= 1) { printf(\"%s\\n\", s); return 0; }\n\n    char rev[100005];\n    for (int i = 0; i < n; i++) rev[i] = s[n - 1 - i];\n    rev[n] = '\\0';\n\n    char comb[200015];\n    sprintf(comb, \"%s#%s\", s, rev);\n    int m = 2 * n + 1;\n\n    pi[0] = 0;\n    for (int i = 1; i < m; i++) {\n        int j = pi[i - 1];\n        while (j > 0 && comb[i] != comb[j]) j = pi[j - 1];\n        if (comb[i] == comb[j]) j++;\n        pi[i] = j;\n    }\n\n    int palLen = pi[m - 1];\n    for (int i = n - 1; i >= palLen; i--) putchar(s[i]);\n    printf(\"%s\\n\", s);\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    string s;\n    if (!(cin >> s) || s.empty()) { cout << endl; return 0; }\n    int n = s.size();\n\n    string rev = s;\n    reverse(rev.begin(), rev.end());\n    string comb = s + \"#\" + rev;\n    int m = comb.size();\n\n    vector<int> pi(m, 0);\n    for (int i = 1; i < m; ++i) {\n        int j = pi[i - 1];\n        while (j > 0 && comb[i] != comb[j]) j = pi[j - 1];\n        if (comb[i] == comb[j]) j++;\n        pi[i] = j;\n    }\n\n    int palLen = pi[m - 1];\n    string prefixToAdd = s.substr(palLen);\n    reverse(prefixToAdd.begin(), prefixToAdd.end());\n    cout << prefixToAdd + s << endl;\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) { System.out.println(); return; }\n        String s = sc.next();\n        int n = s.length();\n        if (n <= 1) { System.out.println(s); return; }\n\n        String rev = new StringBuilder(s).reverse().toString();\n        String comb = s + \"#\" + rev;\n        int m = comb.length();\n\n        int[] pi = new int[m];\n        for (int i = 1; i < m; i++) {\n            int j = pi[i - 1];\n            while (j > 0 && comb.charAt(i) != comb.charAt(j)) j = pi[j - 1];\n            if (comb.charAt(i) == comb.charAt(j)) j++;\n            pi[i] = j;\n        }\n\n        int palLen = pi[m - 1];\n        String prefixToAdd = new StringBuilder(s.substring(palLen)).reverse().toString();\n        System.out.println(prefixToAdd + s);\n    }\n}",
      "python": "import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        print(\"\")\n        return\n    n = len(s)\n    rev = s[::-1]\n    comb = s + \"#\" + rev\n    m = len(comb)\n    pi = [0] * m\n\n    for i in range(1, m):\n        j = pi[i - 1]\n        while j > 0 and comb[i] != comb[j]:\n            j = pi[j - 1]\n        if comb[i] == comb[j]:\n            j += 1\n        pi[i] = j\n\n    pal_len = pi[m - 1]\n    to_add = s[pal_len:][::-1]\n    print(to_add + s)\n\nif __name__ == '__main__':\n    main()"
    }
  }
];
