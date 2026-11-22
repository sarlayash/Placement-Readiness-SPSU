import { PracticalChallenge } from '../types';

/**
 * Placement Readiness Program
 * Mentor: Kapil | Day 14: Scalable Distributed Systems & Low-Level/High-Level Architecture (HLD/LLD)
 * 10 Production-Grade Coding Challenges (C, C++, Java, Python)
 */
export const DAY_14_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  {
    "id": "d14-ch-1",
    "day": 14,
    "title": "Consistent Hashing Ring with Virtual Nodes",
    "difficulty": "Medium",
    "moduleTag": "15. Distributed Systems (HLD/LLD)",
    "companies": [
      "Amazon",
      "Google",
      "Netflix",
      "Discord"
    ],
    "platforms": [
      "System Design Lab"
    ],
    "problemStatement": "Implement a Consistent Hashing ring supporting N physical server nodes with V virtual nodes each. Given a series of string keys, output which physical server each key is routed to (the first virtual node clockwise with hash >= key_hash, or wrapping to the smallest hash).",
    "inputFormat": "First line: N V (servers count and virtual nodes per server).\nNext N lines: server names.\nNext line: K (number of key queries).\nNext K lines: key strings.",
    "outputFormat": "For each key, output the name of the assigned physical server on a new line.",
    "constraints": [
      "1 <= N <= 100",
      "1 <= V <= 50",
      "1 <= K <= 1000"
    ],
    "sampleInput": "3 2\nServerA\nServerB\nServerC\n3\nuser_1\norder_2\npayment_3",
    "sampleOutput": "ServerA\nServerA\nServerB",
    "kapilIntuition": "Mentorship By Kapil: Generate hashes for each `server#i` where 0 <= i < V. Store in a sorted ring array or binary search tree. For each incoming key, compute its hash and use binary search (`std::lower_bound` or `bisect_right`) to find the next virtual node clockwise. If the search reaches the end, wrap around to the first node.",
    "timeComplexity": "O(log(N * V)) per lookup",
    "spaceComplexity": "O(N * V)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "3 2\nServerA\nServerB\nServerC\n3\nuser_1\norder_2\npayment_3",
        "expectedOutput": "ServerA\nServerA\nServerB",
        "isHidden": false,
        "explanation": "Keys map to nearest virtual node clockwise."
      },
      {
        "id": "tc-2",
        "input": "1 1\nServerMain\n2\nkey1\nkey2",
        "expectedOutput": "ServerMain\nServerMain",
        "isHidden": false,
        "explanation": "Single server receives all traffic."
      },
      {
        "id": "tc-3",
        "input": "2 1\nNodeAlpha\nNodeBeta\n1\nrequest_z",
        "expectedOutput": "NodeAlpha",
        "isHidden": true,
        "explanation": "Routing across two nodes."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N, V;\n    if (scanf(\"%d %d\", &N, &V) != 2) return 0;\n    // Implement Consistent Hashing\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int N, V;\n    if (!(cin >> N >> V)) return 0;\n    // Implement Consistent Hashing\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int V = sc.nextInt();\n        // Implement Consistent Hashing\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, v = int(lines[0]), int(lines[1])\n    # Implement Consistent Hashing\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct {\n    unsigned int hash;\n    char name[32];\n} VNode;\n\nunsigned int fnv1a(const char* s) {\n    unsigned int h = 2166136261u;\n    while (*s) {\n        h ^= (unsigned char)(*s++);\n        h *= 16777619u;\n    }\n    return h;\n}\n\nint cmpVNodes(const void* a, const void* b) {\n    unsigned int hA = ((VNode*)a)->hash;\n    unsigned int hB = ((VNode*)b)->hash;\n    return (hA > hB) - (hA < hB);\n}\n\nint main() {\n    int N, V;\n    if (scanf(\"%d %d\", &N, &V) != 2) return 0;\n    VNode ring[6000];\n    int ringSize = 0;\n\n    for (int i = 0; i < N; i++) {\n        char sName[32];\n        scanf(\"%31s\", sName);\n        for (int v = 0; v < V; v++) {\n            char buf[64];\n            sprintf(buf, \"%s#%d\", sName, v);\n            ring[ringSize].hash = fnv1a(buf);\n            strcpy(ring[ringSize].name, sName);\n            ringSize++;\n        }\n    }\n    qsort(ring, ringSize, sizeof(VNode), cmpVNodes);\n\n    int K;\n    if (scanf(\"%d\", &K) != 1) return 0;\n    while (K--) {\n        char key[64];\n        scanf(\"%63s\", key);\n        unsigned int h = fnv1a(key);\n        int low = 0, high = ringSize - 1, ans = 0;\n        bool found = false;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (ring[mid].hash >= h) {\n                ans = mid;\n                found = true;\n                high = mid - 1;\n            } else {\n                low = mid + 1;\n            }\n        }\n        if (!found) ans = 0;\n        printf(\"%s\\n\", ring[ans].name);\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n\nusing namespace std;\n\nunsigned int fnv1a(const string& s) {\n    unsigned int h = 2166136261u;\n    for (char c : s) {\n        h ^= (unsigned char)c;\n        h *= 16777619u;\n    }\n    return h;\n}\n\nint main() {\n    int N, V;\n    if (!(cin >> N >> V)) return 0;\n    vector<pair<unsigned int, string>> ring;\n\n    for (int i = 0; i < N; ++i) {\n        string s; cin >> s;\n        for (int v = 0; v < V; ++v) {\n            ring.push_back({fnv1a(s + \"#\" + to_string(v)), s});\n        }\n    }\n    sort(ring.begin(), ring.end());\n\n    int K; cin >> K;\n    while (K--) {\n        string key; cin >> key;\n        unsigned int h = fnv1a(key);\n        auto it = lower_bound(ring.begin(), ring.end(), make_pair(h, string(\"\")));\n        if (it == ring.end()) it = ring.begin();\n        cout << it->second << \"\n\";\n    }\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    static int fnv1a(String s) {\n        int h = (int)2166136261L;\n        for (int i = 0; i < s.length(); i++) {\n            h ^= (s.charAt(i) & 0xff);\n            h *= 16777619;\n        }\n        return h;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int V = sc.nextInt();\n        TreeMap<Integer, String> ring = new TreeMap<>();\n\n        for (int i = 0; i < N; i++) {\n            String s = sc.next();\n            for (int v = 0; v < V; v++) {\n                ring.put(fnv1a(s + \"#\" + v), s);\n            }\n        }\n\n        int K = sc.nextInt();\n        StringBuilder sb = new StringBuilder();\n        while (K-- > 0) {\n            String key = sc.next();\n            int h = fnv1a(key);\n            Integer target = ring.ceilingKey(h);\n            if (target == null) target = ring.firstKey();\n            sb.append(ring.get(target)).append(\"\n\");\n        }\n        System.out.print(sb);\n    }\n}",
      "python": "import sys\nimport bisect\n\ndef fnv1a(s: str) -> int:\n    h = 2166136261\n    for ch in s.encode('utf-8'):\n        h ^= ch\n        h = (h * 16777619) & 0xFFFFFFFF\n    return h\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, v = int(lines[0]), int(lines[1])\n    idx = 2\n    ring = []\n    vnode_map = {}\n\n    for _ in range(n):\n        s_name = lines[idx]\n        idx += 1\n        for replica in range(v):\n            h = fnv1a(f\"{s_name}#{replica}\")\n            ring.append(h)\n            vnode_map[h] = s_name\n\n    ring.sort()\n    k = int(lines[idx])\n    idx += 1\n\n    out = []\n    for _ in range(k):\n        key = lines[idx]\n        idx += 1\n        h = fnv1a(key)\n        pos = bisect.bisect_left(ring, h)\n        if pos == len(ring):\n            pos = 0\n        out.append(vnode_map[ring[pos]])\n\n    print('\\n'.join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d14-ch-2",
    "day": 14,
    "title": "Design Token Bucket Rate Limiter",
    "difficulty": "Medium",
    "moduleTag": "15. Distributed Systems (HLD/LLD)",
    "companies": [
      "Stripe",
      "Uber",
      "Cloudflare"
    ],
    "platforms": [
      "System Design Lab"
    ],
    "problemStatement": "Design a Token Bucket rate limiter that holds up to B tokens and refills at rate R tokens per second. Given an initial full bucket at time t = 0 and a series of requests with timestamp (seconds) and requested tokens cost, output `200` if the request is permitted, or `429` if rejected.",
    "inputFormat": "First line: B R (capacity and refill rate per second).\nSecond line: Q (number of requests).\nNext Q lines: timestamp cost.",
    "outputFormat": "For each request, output `200` or `429` on a new line.",
    "constraints": [
      "1 <= B <= 1000",
      "1 <= R <= 100",
      "1 <= Q <= 1000",
      "timestamps are non-decreasing"
    ],
    "sampleInput": "5 1\n4\n0 3\n0 3\n1 2\n2 1",
    "sampleOutput": "200\n429\n200\n200",
    "kapilIntuition": "Mentorship By Kapil: Maintain `tokens` and `lastTimestamp`. On arrival at timestamp `t`, compute `tokens = min(B, tokens + (t - lastTimestamp) * R)`. If `tokens >= cost`, deduct cost and return 200; else return 429.",
    "timeComplexity": "O(1) per request",
    "spaceComplexity": "O(1)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "5 1\n4\n0 3\n0 3\n1 2\n2 1",
        "expectedOutput": "200\n429\n200\n200",
        "isHidden": false,
        "explanation": "Req 1 uses 3 tokens (rem 2). Req 2 needs 3, only 2 left (429). At t=1, 1 token refilled (rem 3), uses 2 (rem 1). At t=2, 1 refilled (rem 2), uses 1."
      },
      {
        "id": "tc-2",
        "input": "2 1\n2\n0 2\n0 1",
        "expectedOutput": "200\n429",
        "isHidden": false,
        "explanation": "First takes all 2 tokens, second is rate limited."
      },
      {
        "id": "tc-3",
        "input": "10 5\n1\n10 10",
        "expectedOutput": "200",
        "isHidden": true,
        "explanation": "Refilled to capacity and consumed."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    double B, R;\n    if (scanf(\"%lf %lf\", &B, &R) != 2) return 0;\n    // Implement Token Bucket\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    double B, R;\n    if (!(cin >> B >> R)) return 0;\n    // Implement Token Bucket\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        double B = sc.nextDouble();\n        double R = sc.nextDouble();\n        // Implement Token Bucket\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    b, r = float(lines[0]), float(lines[1])\n    # Implement Token Bucket\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    double B, R;\n    if (scanf(\"%lf %lf\", &B, &R) != 2) return 0;\n    int Q;\n    if (scanf(\"%d\", &Q) != 1) return 0;\n\n    double tokens = B;\n    double lastT = 0;\n\n    while (Q--) {\n        double t, cost;\n        scanf(\"%lf %lf\", &t, &cost);\n        tokens += (t - lastT) * R;\n        if (tokens > B) tokens = B;\n        lastT = t;\n\n        if (tokens >= cost) {\n            tokens -= cost;\n            printf(\"200\\n\");\n        } else {\n            printf(\"429\\n\");\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    double B, R;\n    if (!(cin >> B >> R)) return 0;\n    int Q; cin >> Q;\n\n    double tokens = B;\n    double lastT = 0;\n\n    while (Q--) {\n        double t, cost; cin >> t >> cost;\n        tokens = min(B, tokens + (t - lastT) * R);\n        lastT = t;\n        if (tokens >= cost) {\n            tokens -= cost;\n            cout << 200 << \"\n\";\n        } else {\n            cout << 429 << \"\n\";\n        }\n    }\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        double B = sc.nextDouble();\n        double R = sc.nextDouble();\n        int Q = sc.nextInt();\n\n        double tokens = B;\n        double lastT = 0;\n        StringBuilder sb = new StringBuilder();\n\n        while (Q-- > 0) {\n            double t = sc.nextDouble();\n            double cost = sc.nextDouble();\n            tokens = Math.min(B, tokens + (t - lastT) * R);\n            lastT = t;\n            if (tokens >= cost) {\n                tokens -= cost;\n                sb.append(\"200\n\");\n            } else {\n                sb.append(\"429\n\");\n            }\n        }\n        System.out.print(sb);\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    b, r = float(lines[0]), float(lines[1])\n    q = int(lines[2])\n    idx = 3\n\n    tokens = b\n    last_t = 0.0\n    out = []\n\n    for _ in range(q):\n        t, cost = float(lines[idx]), float(lines[idx + 1])\n        idx += 2\n        tokens = min(b, tokens + (t - last_t) * r)\n        last_t = t\n        if tokens >= cost:\n            tokens -= cost\n            out.append(\"200\")\n        else:\n            out.append(\"429\")\n\n    print('\\n'.join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d14-ch-3",
    "day": 14,
    "title": "Design In-Memory LRU Cache (O(1) Get & Put)",
    "difficulty": "Medium",
    "moduleTag": "15. Distributed Systems (HLD/LLD)",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft",
      "Apple"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with a given capacity.\nSupport:\n`GET key`: Return the value of the key if it exists, otherwise return -1.\n`PUT key val`: Update the value if key exists; otherwise add key-value pair. If number of keys exceeds capacity, evict the least recently used key.",
    "inputFormat": "First line: capacity Q (cache capacity and operations count).\nNext Q lines: `GET key` or `PUT key val`.",
    "outputFormat": "Output the result of each `GET` operation on a new line.",
    "constraints": [
      "1 <= capacity <= 3000",
      "1 <= Q <= 10^5",
      "0 <= key, val <= 10^5"
    ],
    "sampleInput": "2 6\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3",
    "sampleOutput": "1\n-1\n3",
    "kapilIntuition": "Mentorship By Kapil: Combine a Hash Map and a Doubly Linked List! Hash map gives O(1) key-to-node lookup. Doubly linked list allows moving accessed nodes to the head (most recently used) and evicting the tail node (least recently used) in O(1) pointer updates.",
    "timeComplexity": "O(1) per get and put",
    "spaceComplexity": "O(capacity)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "2 6\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3",
        "expectedOutput": "1\n-1\n3",
        "isHidden": false,
        "explanation": "Key 2 is evicted when key 3 is added."
      },
      {
        "id": "tc-2",
        "input": "1 3\nPUT 10 100\nGET 10\nGET 20",
        "expectedOutput": "100\n-1",
        "isHidden": false,
        "explanation": "Key 10 exists, 20 does not."
      },
      {
        "id": "tc-3",
        "input": "2 4\nPUT 1 10\nPUT 1 20\nGET 1\nGET 2",
        "expectedOutput": "20\n-1",
        "isHidden": true,
        "explanation": "Key 1 updated to 20."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int cap, Q;\n    if (scanf(\"%d %d\", &cap, &Q) != 2) return 0;\n    // Implement LRU Cache\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int cap, Q;\n    if (!(cin >> cap >> Q)) return 0;\n    // Implement LRU Cache\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int cap = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement LRU Cache\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    cap, q = int(lines[0]), int(lines[1])\n    # Implement LRU Cache\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct Node {\n    int key, val;\n    struct Node *prev, *next;\n} Node;\n\nNode* head;\nNode* tail;\nNode* map[100005];\nint size = 0, capacity = 0;\n\nvoid removeNode(Node* node) {\n    node->prev->next = node->next;\n    node->next->prev = node->prev;\n}\n\nvoid addToHead(Node* node) {\n    node->next = head->next;\n    node->prev = head;\n    head->next->prev = node;\n    head->next = node;\n}\n\nint get(int key) {\n    if (!map[key]) return -1;\n    Node* node = map[key];\n    removeNode(node);\n    addToHead(node);\n    return node->val;\n}\n\nvoid put(int key, int val) {\n    if (map[key]) {\n        Node* node = map[key];\n        node->val = val;\n        removeNode(node);\n        addToHead(node);\n    } else {\n        if (size == capacity) {\n            Node* lru = tail->prev;\n            map[lru->key] = NULL;\n            removeNode(lru);\n            free(lru);\n            size--;\n        }\n        Node* newNode = (Node*)malloc(sizeof(Node));\n        newNode->key = key;\n        newNode->val = val;\n        map[key] = newNode;\n        addToHead(newNode);\n        size++;\n    }\n}\n\nint main() {\n    int Q;\n    if (scanf(\"%d %d\", &capacity, &Q) != 2) return 0;\n    head = (Node*)malloc(sizeof(Node));\n    tail = (Node*)malloc(sizeof(Node));\n    head->next = tail;\n    tail->prev = head;\n\n    while (Q--) {\n        char op[8];\n        scanf(\"%7s\", op);\n        if (strcmp(op, \"GET\") == 0) {\n            int k; scanf(\"%d\", &k);\n            printf(\"%d\\n\", get(k));\n        } else {\n            int k, v; scanf(\"%d %d\", &k, &v);\n            put(k, v);\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <unordered_map>\n#include <list>\n#include <string>\n\nusing namespace std;\n\nclass LRUCache {\n    int capacity;\n    list<pair<int, int>> dll;\n    unordered_map<int, list<pair<int, int>>::iterator> map;\npublic:\n    LRUCache(int cap) : capacity(cap) {}\n\n    int get(int key) {\n        if (!map.count(key)) return -1;\n        dll.splice(dll.begin(), dll, map[key]);\n        return map[key]->second;\n    }\n\n    void put(int key, int val) {\n        if (map.count(key)) {\n            map[key]->second = val;\n            dll.splice(dll.begin(), dll, map[key]);\n            return;\n        }\n        if ((int)dll.size() == capacity) {\n            map.erase(dll.back().first);\n            dll.pop_back();\n        }\n        dll.push_front({key, val});\n        map[key] = dll.begin();\n    }\n};\n\nint main() {\n    int cap, Q;\n    if (!(cin >> cap >> Q)) return 0;\n    LRUCache cache(cap);\n    while (Q--) {\n        string op; cin >> op;\n        if (op == \"GET\") {\n            int k; cin >> k;\n            cout << cache.get(k) << \"\n\";\n        } else {\n            int k, v; cin >> k >> v;\n            cache.put(k, v);\n        }\n    }\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    static class LRUCache extends LinkedHashMap<Integer, Integer> {\n        private final int capacity;\n        LRUCache(int cap) {\n            super(cap, 0.75f, true);\n            this.capacity = cap;\n        }\n        public int getVal(int key) {\n            return super.getOrDefault(key, -1);\n        }\n        @Override\n        protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {\n            return size() > capacity;\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int cap = sc.nextInt();\n        int Q = sc.nextInt();\n        LRUCache lru = new LRUCache(cap);\n        StringBuilder sb = new StringBuilder();\n\n        while (Q-- > 0) {\n            String op = sc.next();\n            if (op.equals(\"GET\")) {\n                int k = sc.nextInt();\n                sb.append(lru.getVal(k)).append(\"\n\");\n            } else {\n                int k = sc.nextInt();\n                int v = sc.nextInt();\n                lru.put(k, v);\n            }\n        }\n        System.out.print(sb);\n    }\n}",
      "python": "import sys\nimport collections\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    cap, q = int(lines[0]), int(lines[1])\n    cache = collections.OrderedDict()\n    idx = 2\n    out = []\n\n    for _ in range(q):\n        op = lines[idx]\n        if op == \"GET\":\n            k = int(lines[idx + 1])\n            idx += 2\n            if k in cache:\n                cache.move_to_end(k)\n                out.append(str(cache[k]))\n            else:\n                out.append(\"-1\")\n        else:\n            k, v = int(lines[idx + 1]), int(lines[idx + 2])\n            idx += 3\n            if k in cache:\n                cache.move_to_end(k)\n            cache[k] = v\n            if len(cache) > cap:\n                cache.popitem(last=False)\n\n    print('\\n'.join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d14-ch-4",
    "day": 14,
    "title": "Design In-Memory LFU Cache in O(1)",
    "difficulty": "Hard",
    "moduleTag": "15. Distributed Systems (HLD/LLD)",
    "companies": [
      "Amazon",
      "Google",
      "Citadel"
    ],
    "platforms": [
      "LeetCode"
    ],
    "problemStatement": "Design a Least Frequently Used (LFU) cache with a given capacity. When capacity is exceeded, evict the key with the lowest access frequency. In case of tie, evict the least recently used key among them.",
    "inputFormat": "First line: capacity Q.\nNext Q lines: `GET key` or `PUT key val`.",
    "outputFormat": "Output the result of each `GET` operation on a new line.",
    "constraints": [
      "1 <= capacity <= 10^4",
      "1 <= Q <= 10^5"
    ],
    "sampleInput": "2 6\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3",
    "sampleOutput": "1\n-1\n3",
    "kapilIntuition": "Mentorship By Kapil: Maintain three maps: (1) key -> val, (2) key -> frequency, (3) frequency -> DoublyLinkedList of keys. Track `minFreq`. When a key is accessed, move it from freq[f] to freq[f + 1]. If freq[f] becomes empty and `minFreq == f`, increment `minFreq`. On eviction, remove the LRU node from `freq[minFreq]`. Everything executes in O(1).",
    "timeComplexity": "O(1) per operation",
    "spaceComplexity": "O(capacity)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "2 6\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3",
        "expectedOutput": "1\n-1\n3",
        "isHidden": false,
        "explanation": "Key 2 has frequency 1 and is evicted over key 1 (freq 2)."
      },
      {
        "id": "tc-2",
        "input": "1 2\nPUT 1 10\nGET 1",
        "expectedOutput": "10",
        "isHidden": false,
        "explanation": "Single element stored and retrieved."
      },
      {
        "id": "tc-3",
        "input": "2 3\nPUT 1 1\nPUT 2 2\nGET 1",
        "expectedOutput": "1",
        "isHidden": true,
        "explanation": "Key 1 accessed."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int cap, Q;\n    if (scanf(\"%d %d\", &cap, &Q) != 2) return 0;\n    // Implement LFU Cache\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int cap, Q;\n    if (!(cin >> cap >> Q)) return 0;\n    // Implement LFU Cache\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int cap = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement LFU Cache\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    cap, q = int(lines[0]), int(lines[1])\n    # Implement LFU Cache\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n#define MAX_KEY 100005\n\ntypedef struct Node {\n    int key, val, freq;\n    struct Node *prev, *next;\n} Node;\n\ntypedef struct DList {\n    Node *head, *tail;\n    int size;\n} DList;\n\nDList* createList() {\n    DList* l = (DList*)malloc(sizeof(DList));\n    l->head = (Node*)malloc(sizeof(Node));\n    l->tail = (Node*)malloc(sizeof(Node));\n    l->head->next = l->tail;\n    l->tail->prev = l->head;\n    l->size = 0;\n    return l;\n}\n\nvoid addHead(DList* l, Node* node) {\n    node->next = l->head->next;\n    node->prev = l->head;\n    l->head->next->prev = node;\n    l->head->next = node;\n    l->size++;\n}\n\nvoid removeN(DList* l, Node* node) {\n    node->prev->next = node->next;\n    node->next->prev = node->prev;\n    l->size--;\n}\n\nNode* mapKey[MAX_KEY];\nDList* freqMap[200005];\nint minFreq = 0, capacity = 0, curSize = 0;\n\nvoid touch(Node* node) {\n    int f = node->freq;\n    removeN(freqMap[f], node);\n    if (freqMap[f]->size == 0 && minFreq == f) minFreq++;\n    node->freq++;\n    if (!freqMap[node->freq]) freqMap[node->freq] = createList();\n    addHead(freqMap[node->freq], node);\n}\n\nint get(int key) {\n    if (!mapKey[key]) return -1;\n    touch(mapKey[key]);\n    return mapKey[key]->val;\n}\n\nvoid put(int key, int val) {\n    if (capacity <= 0) return;\n    if (mapKey[key]) {\n        mapKey[key]->val = val;\n        touch(mapKey[key]);\n    } else {\n        if (curSize == capacity) {\n            Node* lfu = freqMap[minFreq]->tail->prev;\n            mapKey[lfu->key] = NULL;\n            removeN(freqMap[minFreq], lfu);\n            free(lfu);\n            curSize--;\n        }\n        Node* node = (Node*)malloc(sizeof(Node));\n        node->key = key; node->val = val; node->freq = 1;\n        mapKey[key] = node;\n        minFreq = 1;\n        if (!freqMap[1]) freqMap[1] = createList();\n        addHead(freqMap[1], node);\n        curSize++;\n    }\n}\n\nint main() {\n    int Q;\n    if (scanf(\"%d %d\", &capacity, &Q) != 2) return 0;\n    while (Q--) {\n        char op[8];\n        scanf(\"%7s\", op);\n        if (strcmp(op, \"GET\") == 0) {\n            int k; scanf(\"%d\", &k);\n            printf(\"%d\\n\", get(k));\n        } else {\n            int k, v; scanf(\"%d %d\", &k, &v);\n            put(k, v);\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <unordered_map>\n#include <list>\n#include <string>\n\nusing namespace std;\n\nstruct Node {\n    int key, val, freq;\n};\n\nclass LFUCache {\n    int capacity, minFreq;\n    unordered_map<int, list<Node>::iterator> keyMap;\n    unordered_map<int, list<Node>> freqMap;\npublic:\n    LFUCache(int cap) : capacity(cap), minFreq(0) {}\n\n    int get(int key) {\n        if (!keyMap.count(key)) return -1;\n        auto it = keyMap[key];\n        int val = it->val, freq = it->freq;\n        freqMap[freq].erase(it);\n        if (freqMap[freq].empty() && minFreq == freq) minFreq++;\n        freqMap[freq + 1].push_front({key, val, freq + 1});\n        keyMap[key] = freqMap[freq + 1].begin();\n        return val;\n    }\n\n    void put(int key, int val) {\n        if (capacity <= 0) return;\n        if (keyMap.count(key)) {\n            auto it = keyMap[key];\n            int freq = it->freq;\n            freqMap[freq].erase(it);\n            if (freqMap[freq].empty() && minFreq == freq) minFreq++;\n            freqMap[freq + 1].push_front({key, val, freq + 1});\n            keyMap[key] = freqMap[freq + 1].begin();\n            return;\n        }\n        if ((int)keyMap.size() == capacity) {\n            auto lfu = freqMap[minFreq].back();\n            keyMap.erase(lfu.key);\n            freqMap[minFreq].pop_back();\n        }\n        minFreq = 1;\n        freqMap[1].push_front({key, val, 1});\n        keyMap[key] = freqMap[1].begin();\n    }\n};\n\nint main() {\n    int cap, Q;\n    if (!(cin >> cap >> Q)) return 0;\n    LFUCache cache(cap);\n    while (Q--) {\n        string op; cin >> op;\n        if (op == \"GET\") {\n            int k; cin >> k;\n            cout << cache.get(k) << \"\n\";\n        } else {\n            int k, v; cin >> k >> v;\n            cache.put(k, v);\n        }\n    }\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    static class Node {\n        int key, val, freq;\n        Node(int k, int v, int f) { key = k; val = v; freq = f; }\n    }\n\n    static int capacity, minFreq = 0;\n    static Map<Integer, Node> keyMap = new HashMap<>();\n    static Map<Integer, LinkedHashSet<Node>> freqMap = new HashMap<>();\n\n    public static int get(int key) {\n        if (!keyMap.containsKey(key)) return -1;\n        Node node = keyMap.get(key);\n        int f = node.freq;\n        freqMap.get(f).remove(node);\n        if (freqMap.get(f).isEmpty() && minFreq == f) minFreq++;\n        node.freq++;\n        freqMap.computeIfAbsent(node.freq, k -> new LinkedHashSet<>()).add(node);\n        return node.val;\n    }\n\n    public static void put(int key, int val) {\n        if (capacity <= 0) return;\n        if (keyMap.containsKey(key)) {\n            Node node = keyMap.get(key);\n            node.val = val;\n            get(key);\n            return;\n        }\n        if (keyMap.size() == capacity) {\n            Node lfu = freqMap.get(minFreq).iterator().next();\n            freqMap.get(minFreq).remove(lfu);\n            keyMap.remove(lfu.key);\n        }\n        Node node = new Node(key, val, 1);\n        minFreq = 1;\n        keyMap.put(key, node);\n        freqMap.computeIfAbsent(1, k -> new LinkedHashSet<>()).add(node);\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        capacity = sc.nextInt();\n        int Q = sc.nextInt();\n        StringBuilder sb = new StringBuilder();\n\n        while (Q-- > 0) {\n            String op = sc.next();\n            if (op.equals(\"GET\")) {\n                sb.append(get(sc.nextInt())).append(\"\n\");\n            } else {\n                put(sc.nextInt(), sc.nextInt());\n            }\n        }\n        System.out.print(sb);\n    }\n}",
      "python": "import sys\nimport collections\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    cap, q = int(lines[0]), int(lines[1])\n    key_map = {}\n    freq_map = collections.defaultdict(collections.OrderedDict)\n    min_freq = 0\n    idx = 2\n    out = []\n\n    for _ in range(q):\n        op = lines[idx]\n        if op == \"GET\":\n            k = int(lines[idx + 1])\n            idx += 2\n            if k not in key_map:\n                out.append(\"-1\")\n            else:\n                val, f = key_map[k]\n                del freq_map[f][k]\n                if not freq_map[f] and min_freq == f:\n                    min_freq += 1\n                freq_map[f + 1][k] = val\n                key_map[k] = (val, f + 1)\n                out.append(str(val))\n        else:\n            k, v = int(lines[idx + 1]), int(lines[idx + 2])\n            idx += 3\n            if cap <= 0:\n                continue\n            if k in key_map:\n                _, f = key_map[k]\n                del freq_map[f][k]\n                if not freq_map[f] and min_freq == f:\n                    min_freq += 1\n                freq_map[f + 1][k] = v\n                key_map[k] = (v, f + 1)\n            else:\n                if len(key_map) == cap:\n                    lfu_k, _ = freq_map[min_freq].popitem(last=False)\n                    del key_map[lfu_k]\n                min_freq = 1\n                freq_map[1][k] = v\n                key_map[k] = (v, 1)\n\n    print('\\n'.join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d14-ch-5",
    "day": 14,
    "title": "Design Twitter Snowflake Distributed ID Generator",
    "difficulty": "Medium",
    "moduleTag": "15. Distributed Systems (HLD/LLD)",
    "companies": [
      "Twitter",
      "Discord",
      "Uber"
    ],
    "platforms": [
      "System Design Lab"
    ],
    "problemStatement": "Implement the Twitter Snowflake 64-bit unique ID generation algorithm.\nA 64-bit ID consists of:\n- 1 unused sign bit (0)\n- 41 bits timestamp in milliseconds\n- 5 bits datacenter ID\n- 5 bits worker ID\n- 12 bits sequence number (resets to 0 each millisecond; increments if same millisecond).\nGiven custom epoch `E`, datacenter `D`, worker `W`, and a sequence of generation requests with timestamp `T`, generate the unique 64-bit integers.",
    "inputFormat": "First line: E D W (custom epoch ms, datacenter ID, worker ID).\nSecond line: Q (number of ID generation requests).\nNext line: Q non-decreasing millisecond timestamps.",
    "outputFormat": "Q 64-bit signed/unsigned integer IDs on separate lines.",
    "constraints": [
      "0 <= D, W <= 31",
      "T >= E",
      "1 <= Q <= 1000"
    ],
    "sampleInput": "1000 1 1\n3\n1005 1005 1006",
    "sampleOutput": "20972544\n20972545\n25166848",
    "kapilIntuition": "Mentorship By Kapil: Bit shifting mechanics: `(T - E) << 22 | (D << 17) | (W << 12) | sequence`. When timestamp equals the previous timestamp, increment `sequence`; when timestamp increases, reset `sequence = 0`.",
    "timeComplexity": "O(1) per ID",
    "spaceComplexity": "O(1)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "1000 1 1\n3\n1005 1005 1006",
        "expectedOutput": "20972544\n20972545\n25166848",
        "isHidden": false,
        "explanation": "Two IDs at t=1005 increment sequence 0 and 1; t=1006 resets sequence to 0."
      },
      {
        "id": "tc-2",
        "input": "0 0 0\n2\n1 1",
        "expectedOutput": "4194304\n4194305",
        "isHidden": false,
        "explanation": "Epoch 0, D=0, W=0."
      },
      {
        "id": "tc-3",
        "input": "100 0 1\n1\n100",
        "expectedOutput": "4096",
        "isHidden": true,
        "explanation": "Delta 0, worker 1."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    long long E; int D, W, Q;\n    if (scanf(\"%lld %d %d %d\", &E, &D, &W, &Q) != 4) return 0;\n    // Implement Snowflake\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    long long E; int D, W, Q;\n    if (!(cin >> E >> D >> W >> Q)) return 0;\n    // Implement Snowflake\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        long E = sc.nextLong();\n        int D = sc.nextInt();\n        int W = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement Snowflake\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    e, d, w, q = int(lines[0]), int(lines[1]), int(lines[2]), int(lines[3])\n    # Implement Snowflake\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    long long E; int D, W, Q;\n    if (scanf(\"%lld %d %d %d\", &E, &D, &W, &Q) != 4) return 0;\n\n    long long lastT = -1;\n    long long seq = 0;\n\n    while (Q--) {\n        long long t;\n        scanf(\"%lld\", &t);\n        if (t == lastT) {\n            seq++;\n        } else {\n            seq = 0;\n            lastT = t;\n        }\n        long long id = ((t - E) << 22) | ((long long)D << 17) | ((long long)W << 12) | seq;\n        printf(\"%lld\\n\", id);\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    long long E; int D, W, Q;\n    if (!(cin >> E >> D >> W >> Q)) return 0;\n\n    long long lastT = -1, seq = 0;\n    while (Q--) {\n        long long t; cin >> t;\n        if (t == lastT) seq++;\n        else { seq = 0; lastT = t; }\n        long long id = ((t - E) << 22) | ((long long)D << 17) | ((long long)W << 12) | seq;\n        cout << id << \"\n\";\n    }\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        long E = sc.nextLong();\n        int D = sc.nextInt();\n        int W = sc.nextInt();\n        int Q = sc.nextInt();\n\n        long lastT = -1, seq = 0;\n        StringBuilder sb = new StringBuilder();\n\n        while (Q-- > 0) {\n            long t = sc.nextLong();\n            if (t == lastT) seq++;\n            else { seq = 0; lastT = t; }\n            long id = ((t - E) << 22) | ((long) D << 17) | ((long) W << 12) | seq;\n            sb.append(id).append(\"\n\");\n        }\n        System.out.print(sb);\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    e, d, w, q = int(lines[0]), int(lines[1]), int(lines[2]), int(lines[3])\n    timestamps = [int(x) for x in lines[4:4 + q]]\n\n    last_t = -1\n    seq = 0\n    out = []\n\n    for t in timestamps:\n        if t == last_t:\n            seq += 1\n        else:\n            seq = 0\n            last_t = t\n        snowflake_id = ((t - e) << 22) | (d << 17) | (w << 12) | seq\n        out.append(str(snowflake_id))\n\n    print('\\n'.join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d14-ch-6",
    "day": 14,
    "title": "Write-Ahead Log (WAL) Crash Recovery Simulator",
    "difficulty": "Medium",
    "moduleTag": "15. Distributed Systems (HLD/LLD)",
    "companies": [
      "PostgreSQL",
      "Amazon Aurora",
      "MongoDB"
    ],
    "platforms": [
      "System Design Lab"
    ],
    "problemStatement": "Simulate database crash recovery using Write-Ahead Logging (WAL).\nGiven a series of log records:\n`START txn`\n`SET txn key val`\n`COMMIT txn`\n`CHECKPOINT`\nIn the event of a simulated crash, recover the in-memory database state: ONLY transactions that completed with `COMMIT` prior to crash must be applied. Uncommitted transactions must be rolled back / discarded.",
    "inputFormat": "First line: L (number of WAL log lines).\nNext L lines: WAL commands.",
    "outputFormat": "Sorted key-value pairs (`key=val`) of the recovered state on separate lines, or `EMPTY` if no committed state.",
    "constraints": [
      "1 <= L <= 1000",
      "Keys and values are alphanumeric strings"
    ],
    "sampleInput": "7\nSTART T1\nSET T1 name Alice\nCOMMIT T1\nSTART T2\nSET T2 name Bob\nSET T2 age 30\nCRASH",
    "sampleOutput": "name=Alice",
    "kapilIntuition": "Mentorship By Kapil: Parse the WAL forward to record operations per transaction. Check which transactions executed a valid `COMMIT`. In the recovery phase, apply only the operations of committed transactions. Uncommitted transaction T2 is discarded.",
    "timeComplexity": "O(L)",
    "spaceComplexity": "O(L)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "7\nSTART T1\nSET T1 name Alice\nCOMMIT T1\nSTART T2\nSET T2 name Bob\nSET T2 age 30\nCRASH",
        "expectedOutput": "name=Alice",
        "isHidden": false,
        "explanation": "T1 committed before crash; T2 aborted."
      },
      {
        "id": "tc-2",
        "input": "3\nSTART T1\nSET T1 count 5\nCRASH",
        "expectedOutput": "EMPTY",
        "isHidden": false,
        "explanation": "T1 never committed."
      },
      {
        "id": "tc-3",
        "input": "6\nSTART T1\nSET T1 x 10\nCOMMIT T1\nSTART T2\nSET T2 x 20\nCOMMIT T2",
        "expectedOutput": "x=20",
        "isHidden": true,
        "explanation": "T2 overwrites T1."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int L;\n    if (scanf(\"%d\", &L) != 1) return 0;\n    // Implement WAL recovery\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int L;\n    if (!(cin >> L)) return 0;\n    // Implement WAL recovery\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int L = sc.nextInt();\n        // Implement WAL recovery\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().splitlines()\n    if not lines:\n        return\n    # Implement WAL recovery\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\ntypedef struct {\n    char txn[16];\n    char key[32];\n    char val[32];\n} Op;\n\ntypedef struct {\n    char key[32];\n    char val[32];\n} Entry;\n\nint cmpEntry(const void* a, const void* b) {\n    return strcmp(((Entry*)a)->key, ((Entry*)b)->key);\n}\n\nint main() {\n    int L;\n    if (scanf(\"%d\", &L) != 1) return 0;\n\n    Op ops[1005];\n    int opCount = 0;\n    char committedTxns[1005][16];\n    int commitCount = 0;\n\n    for (int i = 0; i < L; i++) {\n        char cmd[16];\n        scanf(\"%15s\", cmd);\n        if (strcmp(cmd, \"START\") == 0) {\n            char t[16]; scanf(\"%15s\", t);\n        } else if (strcmp(cmd, \"SET\") == 0) {\n            scanf(\"%15s %31s %31s\", ops[opCount].txn, ops[opCount].key, ops[opCount].val);\n            opCount++;\n        } else if (strcmp(cmd, \"COMMIT\") == 0) {\n            char t[16]; scanf(\"%15s\", t);\n            strcpy(committedTxns[commitCount++], t);\n        } else if (strcmp(cmd, \"CRASH\") == 0) {\n            break;\n        }\n    }\n\n    Entry db[1005];\n    int dbCount = 0;\n\n    for (int i = 0; i < opCount; i++) {\n        bool isCommitted = false;\n        for (int c = 0; c < commitCount; c++) {\n            if (strcmp(ops[i].txn, committedTxns[c]) == 0) {\n                isCommitted = true;\n                break;\n            }\n        }\n        if (isCommitted) {\n            bool found = false;\n            for (int k = 0; k < dbCount; k++) {\n                if (strcmp(db[k].key, ops[i].key) == 0) {\n                    strcpy(db[k].val, ops[i].val);\n                    found = true;\n                    break;\n                }\n            }\n            if (!found) {\n                strcpy(db[dbCount].key, ops[i].key);\n                strcpy(db[dbCount].val, ops[i].val);\n                dbCount++;\n            }\n        }\n    }\n\n    if (dbCount == 0) {\n        printf(\"EMPTY\\n\");\n    } else {\n        qsort(db, dbCount, sizeof(Entry), cmpEntry);\n        for (int i = 0; i < dbCount; i++) {\n            printf(\"%s=%s\\n\", db[i].key, db[i].val);\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <map>\n#include <set>\n\nusing namespace std;\n\nstruct Op {\n    string txn, key, val;\n};\n\nint main() {\n    int L;\n    if (!(cin >> L)) return 0;\n    vector<Op> ops;\n    set<string> committed;\n\n    for (int i = 0; i < L; ++i) {\n        string cmd; cin >> cmd;\n        if (cmd == \"START\") {\n            string t; cin >> t;\n        } else if (cmd == \"SET\") {\n            string t, k, v; cin >> t >> k >> v;\n            ops.push_back({t, k, v});\n        } else if (cmd == \"COMMIT\") {\n            string t; cin >> t;\n            committed.insert(t);\n        } else if (cmd == \"CRASH\") {\n            break;\n        }\n    }\n\n    map<string, string> db;\n    for (auto& op : ops) {\n        if (committed.count(op.txn)) {\n            db[op.key] = op.val;\n        }\n    }\n\n    if (db.empty()) {\n        cout << \"EMPTY\n\";\n    } else {\n        for (auto& [k, v] : db) {\n            cout << k << \"=\" << v << \"\n\";\n        }\n    }\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    static class Op {\n        String txn, key, val;\n        Op(String t, String k, String v) { txn = t; key = k; val = v; }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int L = sc.nextInt();\n        List<Op> ops = new ArrayList<>();\n        Set<String> committed = new HashSet<>();\n\n        for (int i = 0; i < L; i++) {\n            String cmd = sc.next();\n            if (cmd.equals(\"START\")) {\n                sc.next();\n            } else if (cmd.equals(\"SET\")) {\n                ops.add(new Op(sc.next(), sc.next(), sc.next()));\n            } else if (cmd.equals(\"COMMIT\")) {\n                committed.add(sc.next());\n            } else if (cmd.equals(\"CRASH\")) {\n                break;\n            }\n        }\n\n        Map<String, String> db = new TreeMap<>();\n        for (Op op : ops) {\n            if (committed.contains(op.txn)) {\n                db.put(op.key, op.val);\n            }\n        }\n\n        if (db.isEmpty()) {\n            System.out.println(\"EMPTY\");\n        } else {\n            for (Map.Entry<String, String> e : db.entrySet()) {\n                System.out.println(e.getKey() + \"=\" + e.getValue());\n            }\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    l = int(lines[0])\n    idx = 1\n\n    ops = []\n    committed = set()\n\n    while idx < len(lines):\n        cmd = lines[idx]\n        idx += 1\n        if cmd == \"START\":\n            idx += 1\n        elif cmd == \"SET\":\n            t, k, v = lines[idx], lines[idx + 1], lines[idx + 2]\n            idx += 3\n            ops.append((t, k, v))\n        elif cmd == \"COMMIT\":\n            t = lines[idx]\n            idx += 1\n            committed.add(t)\n        elif cmd == \"CRASH\":\n            break\n\n    db = {}\n    for t, k, v in ops:\n        if t in committed:\n            db[k] = v\n\n    if not db:\n        print(\"EMPTY\")\n    else:\n        for k in sorted(db.keys()):\n            print(f\"{k}={db[k]}\")\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d14-ch-7",
    "day": 14,
    "title": "Design Circuit Breaker Pattern with State Transitions",
    "difficulty": "Medium",
    "moduleTag": "15. Distributed Systems (HLD/LLD)",
    "companies": [
      "Netflix",
      "Amazon",
      "Uber"
    ],
    "platforms": [
      "System Design Lab"
    ],
    "problemStatement": "Implement a Distributed Circuit Breaker with 3 states:\n- `CLOSED`: Normal operation. If consecutive failures reach `failThreshold`, trip to `OPEN`.\n- `OPEN`: Fail fast immediately without calling downstream. Trips to `HALF-OPEN` after `coolDownSec` seconds.\n- `HALF-OPEN`: Allows 1 probe call. If probe succeeds, reset to `CLOSED`. If probe fails, return to `OPEN`.\nGiven threshold, cooldown, and simulated calls with timestamp and success status (1 = Success, 0 = Fail), output the status of the Circuit Breaker before each call: `CLOSED`, `OPEN`, or `HALF-OPEN`.",
    "inputFormat": "First line: failThreshold coolDownSec Q.\nNext Q lines: timestamp success (0 or 1).",
    "outputFormat": "For each call, print the state of the circuit breaker before executing.",
    "constraints": [
      "1 <= failThreshold <= 10",
      "1 <= coolDownSec <= 60",
      "1 <= Q <= 1000"
    ],
    "sampleInput": "2 5 5\n0 0\n1 0\n2 1\n7 1\n8 1",
    "sampleOutput": "CLOSED\nCLOSED\nOPEN\nHALF-OPEN\nCLOSED",
    "kapilIntuition": "Mentorship By Kapil: Maintain `state`, `failureCount`, and `openTimestamp`. If in OPEN state and `timestamp - openTimestamp >= coolDownSec`, transition to HALF-OPEN. In HALF-OPEN, success resets to CLOSED; failure trips back to OPEN.",
    "timeComplexity": "O(1) per call",
    "spaceComplexity": "O(1)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "2 5 5\n0 0\n1 0\n2 1\n7 1\n8 1",
        "expectedOutput": "CLOSED\nCLOSED\nOPEN\nHALF-OPEN\nCLOSED",
        "isHidden": false,
        "explanation": "2 failures trip to OPEN at t=1. At t=2, circuit is OPEN. At t=7 (>= 1+5), probes HALF-OPEN and succeeds, resetting to CLOSED."
      },
      {
        "id": "tc-2",
        "input": "1 2 2\n0 0\n1 1",
        "expectedOutput": "CLOSED\nOPEN",
        "isHidden": false,
        "explanation": "1 failure trips immediately."
      },
      {
        "id": "tc-3",
        "input": "3 5 3\n0 1\n1 1\n2 1",
        "expectedOutput": "CLOSED\nCLOSED\nCLOSED",
        "isHidden": true,
        "explanation": "All calls succeed."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int thresh, cd, Q;\n    if (scanf(\"%d %d %d\", &thresh, &cd, &Q) != 3) return 0;\n    // Implement Circuit Breaker\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int thresh, cd, Q;\n    if (!(cin >> thresh >> cd >> Q)) return 0;\n    // Implement Circuit Breaker\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int thresh = sc.nextInt();\n        int cd = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement Circuit Breaker\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    thresh, cd, q = int(lines[0]), int(lines[1]), int(lines[2])\n    # Implement Circuit Breaker\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\nenum State { CLOSED, OPEN, HALF_OPEN };\n\nint main() {\n    int thresh, cd, Q;\n    if (scanf(\"%d %d %d\", &thresh, &cd, &Q) != 3) return 0;\n\n    enum State state = CLOSED;\n    int fails = 0;\n    int openT = -1;\n\n    while (Q--) {\n        int t, ok;\n        scanf(\"%d %d\", &t, &ok);\n\n        if (state == OPEN && (t - openT >= cd)) {\n            state = HALF_OPEN;\n        }\n\n        if (state == CLOSED) printf(\"CLOSED\\n\");\n        else if (state == OPEN) printf(\"OPEN\\n\");\n        else printf(\"HALF-OPEN\\n\");\n\n        if (state == CLOSED) {\n            if (!ok) {\n                fails++;\n                if (fails >= thresh) {\n                    state = OPEN;\n                    openT = t;\n                }\n            } else {\n                fails = 0;\n            }\n        } else if (state == HALF_OPEN) {\n            if (ok) {\n                state = CLOSED;\n                fails = 0;\n            } else {\n                state = OPEN;\n                openT = t;\n            }\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nenum State { CLOSED, OPEN, HALF_OPEN };\n\nint main() {\n    int thresh, cd, Q;\n    if (!(cin >> thresh >> cd >> Q)) return 0;\n\n    State state = CLOSED;\n    int fails = 0, openT = -1;\n\n    while (Q--) {\n        int t, ok; cin >> t >> ok;\n        if (state == OPEN && (t - openT >= cd)) {\n            state = HALF_OPEN;\n        }\n\n        if (state == CLOSED) cout << \"CLOSED\n\";\n        else if (state == OPEN) cout << \"OPEN\n\";\n        else cout << \"HALF-OPEN\n\";\n\n        if (state == CLOSED) {\n            if (!ok) {\n                if (++fails >= thresh) {\n                    state = OPEN;\n                    openT = t;\n                }\n            } else fails = 0;\n        } else if (state == HALF_OPEN) {\n            if (ok) {\n                state = CLOSED;\n                fails = 0;\n            } else {\n                state = OPEN;\n                openT = t;\n            }\n        }\n    }\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    enum State { CLOSED, OPEN, HALF_OPEN }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int thresh = sc.nextInt();\n        int cd = sc.nextInt();\n        int Q = sc.nextInt();\n\n        State state = State.CLOSED;\n        int fails = 0, openT = -1;\n        StringBuilder sb = new StringBuilder();\n\n        while (Q-- > 0) {\n            int t = sc.nextInt();\n            int ok = sc.nextInt();\n\n            if (state == State.OPEN && (t - openT >= cd)) {\n                state = State.HALF_OPEN;\n            }\n\n            if (state == State.CLOSED) sb.append(\"CLOSED\n\");\n            else if (state == State.OPEN) sb.append(\"OPEN\n\");\n            else sb.append(\"HALF-OPEN\n\");\n\n            if (state == State.CLOSED) {\n                if (ok == 0) {\n                    if (++fails >= thresh) {\n                        state = State.OPEN;\n                        openT = t;\n                    }\n                } else fails = 0;\n            } else if (state == State.HALF_OPEN) {\n                if (ok == 1) {\n                    state = State.CLOSED;\n                    fails = 0;\n                } else {\n                    state = State.OPEN;\n                    openT = t;\n                }\n            }\n        }\n        System.out.print(sb);\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    thresh, cd, q = int(lines[0]), int(lines[1]), int(lines[2])\n    idx = 3\n\n    state = \"CLOSED\"\n    fails = 0\n    open_t = -1\n    out = []\n\n    for _ in range(q):\n        t, ok = int(lines[idx]), int(lines[idx + 1])\n        idx += 2\n\n        if state == \"OPEN\" and (t - open_t >= cd):\n            state = \"HALF-OPEN\"\n\n        out.append(state)\n\n        if state == \"CLOSED\":\n            if ok == 0:\n                fails += 1\n                if fails >= thresh:\n                    state = \"OPEN\"\n                    open_t = t\n            else:\n                fails = 0\n        elif state == \"HALF-OPEN\":\n            if ok == 1:\n                state = \"CLOSED\"\n                fails = 0\n            else:\n                state = \"OPEN\"\n                open_t = t\n\n    print('\\n'.join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d14-ch-8",
    "day": 14,
    "title": "Design Distributed Lock Lease Manager with TTL Expiry",
    "difficulty": "Medium",
    "moduleTag": "15. Distributed Systems (HLD/LLD)",
    "companies": [
      "Google Chubby",
      "Zookeeper",
      "Redis Redlock"
    ],
    "platforms": [
      "System Design Lab"
    ],
    "problemStatement": "Design an in-memory Distributed Lock Manager supporting mutual exclusion with TTL lease expirations.\nOperations:\n`ACQUIRE key client ttl`: Try to acquire lock for key. If key is currently unlocked or previous lease expired (t >= expiryTime), grant lock and output `GRANTED fencing_token`. If already locked by someone else, output `DENIED`.\n`RELEASE key client`: Release lock if currently held by `client`. Output `RELEASED` or `FAIL`.",
    "inputFormat": "First line: Q (operations count).\nNext Q lines: `ACQUIRE timestamp key client ttl` or `RELEASE timestamp key client`.",
    "outputFormat": "Output result of each operation on a separate line.",
    "constraints": [
      "1 <= Q <= 1000",
      "Timestamps are non-decreasing",
      "Fencing token starts at 1 and increments on every granted lock"
    ],
    "sampleInput": "5\nACQUIRE 0 lockA C1 5\nACQUIRE 2 lockA C2 5\nRELEASE 3 lockA C1\nACQUIRE 4 lockA C2 5\nACQUIRE 10 lockA C3 5",
    "sampleOutput": "GRANTED 1\nDENIED\nRELEASED\nGRANTED 2\nGRANTED 3",
    "kapilIntuition": "Mentorship By Kapil: Track `currentHolder`, `expiryTime`, and `fencingToken` for each lock key. If timestamp >= expiryTime, the previous lease expired automatically. Use monotonically increasing fencing tokens to prevent zombie writes in downstream storage.",
    "timeComplexity": "O(1) per lock operation",
    "spaceComplexity": "O(K)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "5\nACQUIRE 0 lockA C1 5\nACQUIRE 2 lockA C2 5\nRELEASE 3 lockA C1\nACQUIRE 4 lockA C2 5\nACQUIRE 10 lockA C3 5",
        "expectedOutput": "GRANTED 1\nDENIED\nRELEASED\nGRANTED 2\nGRANTED 3",
        "isHidden": false,
        "explanation": "Lock leased, denied, released early, acquired with token 2, and token 3 after TTL expiry."
      },
      {
        "id": "tc-2",
        "input": "2\nACQUIRE 0 myKey C1 10\nRELEASE 1 myKey C2",
        "expectedOutput": "GRANTED 1\nFAIL",
        "isHidden": false,
        "explanation": "C2 cannot release a lock held by C1."
      },
      {
        "id": "tc-3",
        "input": "1\nRELEASE 0 myKey C1",
        "expectedOutput": "FAIL",
        "isHidden": true,
        "explanation": "Releasing unheld lock fails."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int Q;\n    if (scanf(\"%d\", &Q) != 1) return 0;\n    // Implement Distributed Lock Manager\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int Q;\n    if (!(cin >> Q)) return 0;\n    // Implement Distributed Lock Manager\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int Q = sc.nextInt();\n        // Implement Distributed Lock Manager\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().splitlines()\n    if not lines:\n        return\n    # Implement Distributed Lock Manager\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n#include <stdbool.h>\n\ntypedef struct {\n    char key[32];\n    char holder[32];\n    int expiry;\n} Lock;\n\nLock locks[1000];\nint lockCount = 0;\nint nextFencingToken = 1;\n\nint findLock(const char* key) {\n    for (int i = 0; i < lockCount; i++) {\n        if (strcmp(locks[i].key, key) == 0) return i;\n    }\n    return -1;\n}\n\nint main() {\n    int Q;\n    if (scanf(\"%d\", &Q) != 1) return 0;\n\n    while (Q--) {\n        char op[16];\n        scanf(\"%15s\", op);\n        if (strcmp(op, \"ACQUIRE\") == 0) {\n            int t, ttl;\n            char key[32], client[32];\n            scanf(\"%d %31s %31s %d\", &t, key, client, &ttl);\n            int idx = findLock(key);\n            if (idx == -1) {\n                strcpy(locks[lockCount].key, key);\n                strcpy(locks[lockCount].holder, client);\n                locks[lockCount].expiry = t + ttl;\n                lockCount++;\n                printf(\"GRANTED %d\\n\", nextFencingToken++);\n            } else {\n                if (t >= locks[idx].expiry || strcmp(locks[idx].holder, \"\") == 0) {\n                    strcpy(locks[idx].holder, client);\n                    locks[idx].expiry = t + ttl;\n                    printf(\"GRANTED %d\\n\", nextFencingToken++);\n                } else {\n                    printf(\"DENIED\\n\");\n                }\n            }\n        } else {\n            int t;\n            char key[32], client[32];\n            scanf(\"%d %31s %31s\", &t, key, client);\n            int idx = findLock(key);\n            if (idx != -1 && t < locks[idx].expiry && strcmp(locks[idx].holder, client) == 0) {\n                strcpy(locks[idx].holder, \"\");\n                printf(\"RELEASED\\n\");\n            } else {\n                printf(\"FAIL\\n\");\n            }\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n#include <unordered_map>\n\nusing namespace std;\n\nstruct LockInfo {\n    string holder;\n    int expiry;\n};\n\nint main() {\n    int Q;\n    if (!(cin >> Q)) return 0;\n    unordered_map<string, LockInfo> locks;\n    int token = 1;\n\n    while (Q--) {\n        string op; cin >> op;\n        if (op == \"ACQUIRE\") {\n            int t, ttl; string key, client;\n            cin >> t >> key >> client >> ttl;\n            if (!locks.count(key) || t >= locks[key].expiry || locks[key].holder.empty()) {\n                locks[key] = {client, t + ttl};\n                cout << \"GRANTED \" << token++ << \"\n\";\n            } else {\n                cout << \"DENIED\n\";\n            }\n        } else {\n            int t; string key, client;\n            cin >> t >> key >> client;\n            if (locks.count(key) && t < locks[key].expiry && locks[key].holder == client) {\n                locks[key].holder = \"\";\n                cout << \"RELEASED\n\";\n            } else {\n                cout << \"FAIL\n\";\n            }\n        }\n    }\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    static class LockInfo {\n        String holder;\n        int expiry;\n        LockInfo(String h, int exp) { holder = h; expiry = exp; }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int Q = sc.nextInt();\n        Map<String, LockInfo> locks = new HashMap<>();\n        int token = 1;\n        StringBuilder sb = new StringBuilder();\n\n        while (Q-- > 0) {\n            String op = sc.next();\n            if (op.equals(\"ACQUIRE\")) {\n                int t = sc.nextInt();\n                String key = sc.next();\n                String client = sc.next();\n                int ttl = sc.nextInt();\n\n                if (!locks.containsKey(key) || t >= locks.get(key).expiry || locks.get(key).holder.isEmpty()) {\n                    locks.put(key, new LockInfo(client, t + ttl));\n                    sb.append(\"GRANTED \").append(token++).append(\"\n\");\n                } else {\n                    sb.append(\"DENIED\n\");\n                }\n            } else {\n                int t = sc.nextInt();\n                String key = sc.next();\n                String client = sc.next();\n\n                if (locks.containsKey(key) && t < locks.get(key).expiry && locks.get(key).holder.equals(client)) {\n                    locks.get(key).holder = \"\";\n                    sb.append(\"RELEASED\n\");\n                } else {\n                    sb.append(\"FAIL\n\");\n                }\n            }\n        }\n        System.out.print(sb);\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    q = int(lines[0])\n    idx = 1\n\n    locks = {}\n    token = 1\n    out = []\n\n    for _ in range(q):\n        op = lines[idx]\n        if op == \"ACQUIRE\":\n            t, key, client, ttl = int(lines[idx + 1]), lines[idx + 2], lines[idx + 3], int(lines[idx + 4])\n            idx += 5\n            if key not in locks or t >= locks[key][\"expiry\"] or not locks[key][\"holder\"]:\n                locks[key] = {\"holder\": client, \"expiry\": t + ttl}\n                out.append(f\"GRANTED {token}\")\n                token += 1\n            else:\n                out.append(\"DENIED\")\n        else:\n            t, key, client = int(lines[idx + 1]), lines[idx + 2], lines[idx + 3]\n            idx += 4\n            if key in locks and t < locks[key][\"expiry\"] and locks[key][\"holder\"] == client:\n                locks[key][\"holder\"] = \"\"\n                out.append(\"RELEASED\")\n            else:\n                out.append(\"FAIL\")\n\n    print('\\n'.join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d14-ch-9",
    "day": 14,
    "title": "Quorum Replicated Datastore (R + W > N)",
    "difficulty": "Medium",
    "moduleTag": "15. Distributed Systems (HLD/LLD)",
    "companies": [
      "Amazon DynamoDB",
      "Apache Cassandra"
    ],
    "platforms": [
      "System Design Lab"
    ],
    "problemStatement": "Given N replica nodes, write quorum W, read quorum R, and a series of operations:\n`WRITE key val`: Write to W replicas with incrementing version timestamp.\n`READ key`: Read from R replicas and return the value with the highest version.\nVerify that when R + W > N, strong consistency is guaranteed.",
    "inputFormat": "First line: N W R Q (replicas, write quorum, read quorum, query count).\nNext Q lines: `WRITE key val` or `READ key`.",
    "outputFormat": "Output the recovered value for each `READ` query, or `NOT_FOUND`.",
    "constraints": [
      "1 <= N <= 10",
      "1 <= W, R <= N",
      "1 <= Q <= 1000"
    ],
    "sampleInput": "5 3 3 3\nWRITE stock AAPL_150\nREAD stock\nWRITE stock AAPL_155\nREAD stock",
    "sampleOutput": "AAPL_150\nAAPL_155",
    "kapilIntuition": "Mentorship By Kapil: For `WRITE`, write to the first W replicas with timestamp `v`. For `READ`, inspect the first R replicas, find the maximum version, and return that value. Because R + W > N, at least one node in the read quorum witnessed the latest write quorum.",
    "timeComplexity": "O(W + R) per operation",
    "spaceComplexity": "O(N * keys)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "5 3 3 4\nWRITE stock AAPL_150\nREAD stock\nWRITE stock AAPL_155\nREAD stock",
        "expectedOutput": "AAPL_150\nAAPL_155",
        "isHidden": false,
        "explanation": "Quorum read always returns the latest write version."
      },
      {
        "id": "tc-2",
        "input": "3 2 2 1\nREAD absent",
        "expectedOutput": "NOT_FOUND",
        "isHidden": false,
        "explanation": "Key not found."
      },
      {
        "id": "tc-3",
        "input": "3 2 2 2\nWRITE item 100\nREAD item",
        "expectedOutput": "100",
        "isHidden": true,
        "explanation": "N=3, W=2, R=2."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N, W, R, Q;\n    if (scanf(\"%d %d %d %d\", &N, &W, &R, &Q) != 4) return 0;\n    // Implement Quorum System\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int N, W, R, Q;\n    if (!(cin >> N >> W >> R >> Q)) return 0;\n    // Implement Quorum System\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int W = sc.nextInt();\n        int R = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement Quorum System\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, w, r, q = int(lines[0]), int(lines[1]), int(lines[2]), int(lines[3])\n    # Implement Quorum System\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char val[32];\n    int version;\n} Cell;\n\nCell cluster[10][1000];\nchar keys[1000][32];\nint numKeys = 0;\nint globalVer = 1;\n\nint getKeyIdx(const char* k) {\n    for (int i = 0; i < numKeys; i++) {\n        if (strcmp(keys[i], k) == 0) return i;\n    }\n    strcpy(keys[numKeys], k);\n    return numKeys++;\n}\n\nint main() {\n    int N, W, R, Q;\n    if (scanf(\"%d %d %d %d\", &N, &W, &R, &Q) != 4) return 0;\n\n    while (Q--) {\n        char op[16];\n        scanf(\"%15s\", op);\n        if (strcmp(op, \"WRITE\") == 0) {\n            char k[32], v[32];\n            scanf(\"%31s %31s\", k, v);\n            int kIdx = getKeyIdx(k);\n            int vNum = globalVer++;\n            for (int i = 0; i < W; i++) {\n                strcpy(cluster[i][kIdx].val, v);\n                cluster[i][kIdx].version = vNum;\n            }\n        } else {\n            char k[32];\n            scanf(\"%31s\", k);\n            int kIdx = -1;\n            for (int i = 0; i < numKeys; i++) {\n                if (strcmp(keys[i], k) == 0) { kIdx = i; break; }\n            }\n            if (kIdx == -1) {\n                printf(\"NOT_FOUND\\n\");\n            } else {\n                int maxV = 0, bestNode = -1;\n                for (int i = 0; i < R; i++) {\n                    if (cluster[i][kIdx].version > maxV) {\n                        maxV = cluster[i][kIdx].version;\n                        bestNode = i;\n                    }\n                }\n                if (maxV == 0) printf(\"NOT_FOUND\\n\");\n                else printf(\"%s\\n\", cluster[bestNode][kIdx].val);\n            }\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n#include <unordered_map>\n\nusing namespace std;\n\nstruct Record {\n    string val;\n    int version = 0;\n};\n\nint main() {\n    int N, W, R, Q;\n    if (!(cin >> N >> W >> R >> Q)) return 0;\n\n    vector<unordered_map<string, Record>> cluster(N);\n    int currentVer = 1;\n\n    while (Q--) {\n        string op; cin >> op;\n        if (op == \"WRITE\") {\n            string k, v; cin >> k >> v;\n            int vNum = currentVer++;\n            for (int i = 0; i < W; ++i) {\n                cluster[i][k] = {v, vNum};\n            }\n        } else {\n            string k; cin >> k;\n            int bestVer = 0;\n            string bestVal = \"NOT_FOUND\";\n            for (int i = 0; i < R; ++i) {\n                if (cluster[i].count(k) && cluster[i][k].version > bestVer) {\n                    bestVer = cluster[i][k].version;\n                    bestVal = cluster[i][k].val;\n                }\n            }\n            cout << bestVal << \"\n\";\n        }\n    }\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    static class Record {\n        String val;\n        int version;\n        Record(String v, int ver) { val = v; version = ver; }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int N = sc.nextInt();\n        int W = sc.nextInt();\n        int R = sc.nextInt();\n        int Q = sc.nextInt();\n\n        List<Map<String, Record>> cluster = new ArrayList<>();\n        for (int i = 0; i < N; i++) cluster.add(new HashMap<>());\n        int currentVer = 1;\n        StringBuilder sb = new StringBuilder();\n\n        while (Q-- > 0) {\n            String op = sc.next();\n            if (op.equals(\"WRITE\")) {\n                String k = sc.next();\n                String v = sc.next();\n                int ver = currentVer++;\n                for (int i = 0; i < W; i++) {\n                    cluster.get(i).put(k, new Record(v, ver));\n                }\n            } else {\n                String k = sc.next();\n                int maxVer = 0;\n                String bestVal = \"NOT_FOUND\";\n                for (int i = 0; i < R; i++) {\n                    if (cluster.get(i).containsKey(k)) {\n                        Record rec = cluster.get(i).get(k);\n                        if (rec.version > maxVer) {\n                            maxVer = rec.version;\n                            bestVal = rec.val;\n                        }\n                    }\n                }\n                sb.append(bestVal).append(\"\n\");\n            }\n        }\n        System.out.print(sb);\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n, w, r, q = int(lines[0]), int(lines[1]), int(lines[2]), int(lines[3])\n    idx = 4\n\n    cluster = [{} for _ in range(n)]\n    current_ver = 1\n    out = []\n\n    for _ in range(q):\n        op = lines[idx]\n        if op == \"WRITE\":\n            k, v = lines[idx + 1], lines[idx + 2]\n            idx += 3\n            v_num = current_ver\n            current_ver += 1\n            for i in range(w):\n                cluster[i][k] = (v, v_num)\n        else:\n            k = lines[idx + 1]\n            idx += 2\n            best_ver = 0\n            best_val = \"NOT_FOUND\"\n            for i in range(r):\n                if k in cluster[i]:\n                    val, ver = cluster[i][k]\n                    if ver > best_ver:\n                        best_ver = ver\n                        best_val = val\n            out.append(best_val)\n\n    print('\\n'.join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d14-ch-10",
    "day": 14,
    "title": "Sliding Window Log Rate Limiter",
    "difficulty": "Medium",
    "moduleTag": "15. Distributed Systems (HLD/LLD)",
    "companies": [
      "Twitter",
      "Discord",
      "Stripe"
    ],
    "platforms": [
      "System Design Lab"
    ],
    "problemStatement": "Implement a precise Sliding Window Log Rate Limiter that allows at most `limit` requests within a rolling window of `windowSize` seconds. Evict expired request timestamps (`t_prev <= t_curr - windowSize`), and return `200` if the request is permitted, or `429` if rejected.",
    "inputFormat": "First line: limit windowSize Q.\nNext line: Q non-decreasing integer timestamps.",
    "outputFormat": "Q lines of `200` or `429`.",
    "constraints": [
      "1 <= limit <= 1000",
      "1 <= windowSize <= 3600",
      "1 <= Q <= 2000"
    ],
    "sampleInput": "3 10 5\n1 2 3 5 12",
    "sampleOutput": "200\n200\n200\n429\n200",
    "kapilIntuition": "Mentorship By Kapil: Maintain timestamps in a FIFO queue or deque. When request arrives at `t`, pop all elements from the front where `timestamp <= t - windowSize`. If queue size < limit, append `t` and return 200; else return 429.",
    "timeComplexity": "O(1) amortized per request",
    "spaceComplexity": "O(limit)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "3 10 5\n1 2 3 5 12",
        "expectedOutput": "200\n200\n200\n429\n200",
        "isHidden": false,
        "explanation": "At t=5, window [0, 5] has 3 requests already (429). At t=12, req at t=1 expired (12 - 10 = 2), so allowed."
      },
      {
        "id": "tc-2",
        "input": "1 5 3\n0 2 6",
        "expectedOutput": "200\n429\n200",
        "isHidden": false,
        "explanation": "t=2 rejected, t=6 allowed after t=0 expires."
      },
      {
        "id": "tc-3",
        "input": "2 1 2\n0 0",
        "expectedOutput": "200\n200",
        "isHidden": true,
        "explanation": "Both allowed within limit."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int limit, window, Q;\n    if (scanf(\"%d %d %d\", &limit, &window, &Q) != 3) return 0;\n    // Implement Sliding Window Log\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int limit, window, Q;\n    if (!(cin >> limit >> window >> Q)) return 0;\n    // Implement Sliding Window Log\n    return 0;\n}",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int limit = sc.nextInt();\n        int window = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement Sliding Window Log\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    limit, window, q = int(lines[0]), int(lines[1]), int(lines[2])\n    # Implement Sliding Window Log\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\nint queue[5005];\nint head = 0, tail = 0;\n\nint main() {\n    int limit, window, Q;\n    if (scanf(\"%d %d %d\", &limit, &window, &Q) != 3) return 0;\n\n    while (Q--) {\n        int t;\n        scanf(\"%d\", &t);\n        while (head < tail && queue[head] <= t - window) {\n            head++;\n        }\n        if (tail - head < limit) {\n            queue[tail++] = t;\n            printf(\"200\\n\");\n        } else {\n            printf(\"429\\n\");\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <queue>\n\nusing namespace std;\n\nint main() {\n    int limit, window, Q;\n    if (!(cin >> limit >> window >> Q)) return 0;\n    queue<int> q;\n\n    while (Q--) {\n        int t; cin >> t;\n        while (!q.empty() && q.front() <= t - window) q.pop();\n        if ((int)q.size() < limit) {\n            q.push(t);\n            cout << \"200\n\";\n        } else {\n            cout << \"429\n\";\n        }\n    }\n    return 0;\n}",
      "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        int limit = sc.nextInt();\n        int window = sc.nextInt();\n        int Q = sc.nextInt();\n\n        Queue<Integer> q = new ArrayDeque<>();\n        StringBuilder sb = new StringBuilder();\n\n        while (Q-- > 0) {\n            int t = sc.nextInt();\n            while (!q.isEmpty() && q.peek() <= t - window) q.poll();\n            if (q.size() < limit) {\n                q.add(t);\n                sb.append(\"200\n\");\n            } else {\n                sb.append(\"429\n\");\n            }\n        }\n        System.out.print(sb);\n    }\n}",
      "python": "import sys\nimport collections\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    limit, window, q = int(lines[0]), int(lines[1]), int(lines[2])\n    timestamps = [int(x) for x in lines[3:3 + q]]\n\n    dq = collections.deque()\n    out = []\n\n    for t in timestamps:\n        while dq and dq[0] <= t - window:\n            dq.popleft()\n        if len(dq) < limit:\n            dq.append(t)\n            out.append(\"200\")\n        else:\n            out.append(\"429\")\n\n    print('\\n'.join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  }
];
