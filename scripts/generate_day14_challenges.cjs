const fs = require('fs');
const path = require('path');

const challenges = [
  // 1. Consistent Hashing Ring
  {
    id: 'd14-ch-1',
    day: 14,
    title: 'Consistent Hashing Ring with Virtual Nodes',
    difficulty: 'Medium',
    moduleTag: '15. Distributed Systems (HLD/LLD)',
    companies: ['Amazon', 'Google', 'Netflix', 'Discord'],
    platforms: ['System Design Lab'],
    problemStatement:
      'Implement a Consistent Hashing ring supporting N physical server nodes with V virtual nodes each. Given a series of string keys, output which physical server each key is routed to (the first virtual node clockwise with hash >= key_hash, or wrapping to the smallest hash).',
    inputFormat: 'First line: N V (servers count and virtual nodes per server).\nNext N lines: server names.\nNext line: K (number of key queries).\nNext K lines: key strings.',
    outputFormat: 'For each key, output the name of the assigned physical server on a new line.',
    constraints: ['1 <= N <= 100', '1 <= V <= 50', '1 <= K <= 1000'],
    sampleInput: '3 2\nServerA\nServerB\nServerC\n3\nuser_1\norder_2\npayment_3',
    sampleOutput: 'ServerA\nServerA\nServerB',
    kapilIntuition:
      'Mentorship By Kapil: Generate hashes for each `server#i` where 0 <= i < V. Store in a sorted ring array or binary search tree. For each incoming key, compute its hash and use binary search (`std::lower_bound` or `bisect_right`) to find the next virtual node clockwise. If the search reaches the end, wrap around to the first node.',
    timeComplexity: 'O(log(N * V)) per lookup',
    spaceComplexity: 'O(N * V)',
    testCases: [
      { id: 'tc-1', input: '3 2\nServerA\nServerB\nServerC\n3\nuser_1\norder_2\npayment_3', expectedOutput: 'ServerA\nServerA\nServerB', isHidden: false, explanation: 'Keys map to nearest virtual node clockwise.' },
      { id: 'tc-2', input: '1 1\nServerMain\n2\nkey1\nkey2', expectedOutput: 'ServerMain\nServerMain', isHidden: false, explanation: 'Single server receives all traffic.' },
      { id: 'tc-3', input: '2 1\nNodeAlpha\nNodeBeta\n1\nrequest_z', expectedOutput: 'NodeAlpha', isHidden: true, explanation: 'Routing across two nodes.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, V;
    if (scanf("%d %d", &N, &V) != 2) return 0;
    // Implement Consistent Hashing
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

int main() {
    int N, V;
    if (!(cin >> N >> V)) return 0;
    // Implement Consistent Hashing
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int V = sc.nextInt();
        // Implement Consistent Hashing
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, v = int(lines[0]), int(lines[1])
    # Implement Consistent Hashing

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    unsigned int hash;
    char name[32];
} VNode;

unsigned int fnv1a(const char* s) {
    unsigned int h = 2166136261u;
    while (*s) {
        h ^= (unsigned char)(*s++);
        h *= 16777619u;
    }
    return h;
}

int cmpVNodes(const void* a, const void* b) {
    unsigned int hA = ((VNode*)a)->hash;
    unsigned int hB = ((VNode*)b)->hash;
    return (hA > hB) - (hA < hB);
}

int main() {
    int N, V;
    if (scanf("%d %d", &N, &V) != 2) return 0;
    VNode ring[6000];
    int ringSize = 0;

    for (int i = 0; i < N; i++) {
        char sName[32];
        scanf("%31s", sName);
        for (int v = 0; v < V; v++) {
            char buf[64];
            sprintf(buf, "%s#%d", sName, v);
            ring[ringSize].hash = fnv1a(buf);
            strcpy(ring[ringSize].name, sName);
            ringSize++;
        }
    }
    qsort(ring, ringSize, sizeof(VNode), cmpVNodes);

    int K;
    if (scanf("%d", &K) != 1) return 0;
    while (K--) {
        char key[64];
        scanf("%63s", key);
        unsigned int h = fnv1a(key);
        int low = 0, high = ringSize - 1, ans = 0;
        bool found = false;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (ring[mid].hash >= h) {
                ans = mid;
                found = true;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        if (!found) ans = 0;
        printf("%s\\n", ring[ans].name);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

unsigned int fnv1a(const string& s) {
    unsigned int h = 2166136261u;
    for (char c : s) {
        h ^= (unsigned char)c;
        h *= 16777619u;
    }
    return h;
}

int main() {
    int N, V;
    if (!(cin >> N >> V)) return 0;
    vector<pair<unsigned int, string>> ring;

    for (int i = 0; i < N; ++i) {
        string s; cin >> s;
        for (int v = 0; v < V; ++v) {
            ring.push_back({fnv1a(s + "#" + to_string(v)), s});
        }
    }
    sort(ring.begin(), ring.end());

    int K; cin >> K;
    while (K--) {
        string key; cin >> key;
        unsigned int h = fnv1a(key);
        auto it = lower_bound(ring.begin(), ring.end(), make_pair(h, string("")));
        if (it == ring.end()) it = ring.begin();
        cout << it->second << "\n";
    }
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    static int fnv1a(String s) {
        int h = (int)2166136261L;
        for (int i = 0; i < s.length(); i++) {
            h ^= (s.charAt(i) & 0xff);
            h *= 16777619;
        }
        return h;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int V = sc.nextInt();
        TreeMap<Integer, String> ring = new TreeMap<>();

        for (int i = 0; i < N; i++) {
            String s = sc.next();
            for (int v = 0; v < V; v++) {
                ring.put(fnv1a(s + "#" + v), s);
            }
        }

        int K = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        while (K-- > 0) {
            String key = sc.next();
            int h = fnv1a(key);
            Integer target = ring.ceilingKey(h);
            if (target == null) target = ring.firstKey();
            sb.append(ring.get(target)).append("\n");
        }
        System.out.print(sb);
    }
}`,
      python: `import sys
import bisect

def fnv1a(s: str) -> int:
    h = 2166136261
    for ch in s.encode('utf-8'):
        h ^= ch
        h = (h * 16777619) & 0xFFFFFFFF
    return h

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, v = int(lines[0]), int(lines[1])
    idx = 2
    ring = []
    vnode_map = {}

    for _ in range(n):
        s_name = lines[idx]
        idx += 1
        for replica in range(v):
            h = fnv1a(f"{s_name}#{replica}")
            ring.append(h)
            vnode_map[h] = s_name

    ring.sort()
    k = int(lines[idx])
    idx += 1

    out = []
    for _ in range(k):
        key = lines[idx]
        idx += 1
        h = fnv1a(key)
        pos = bisect.bisect_left(ring, h)
        if pos == len(ring):
            pos = 0
        out.append(vnode_map[ring[pos]])

    print('\\n'.join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 2. Token Bucket Rate Limiter
  {
    id: 'd14-ch-2',
    day: 14,
    title: 'Design Token Bucket Rate Limiter',
    difficulty: 'Medium',
    moduleTag: '15. Distributed Systems (HLD/LLD)',
    companies: ['Stripe', 'Uber', 'Cloudflare'],
    platforms: ['System Design Lab'],
    problemStatement:
      'Design a Token Bucket rate limiter that holds up to B tokens and refills at rate R tokens per second. Given an initial full bucket at time t = 0 and a series of requests with timestamp (seconds) and requested tokens cost, output `200` if the request is permitted, or `429` if rejected.',
    inputFormat: 'First line: B R (capacity and refill rate per second).\nSecond line: Q (number of requests).\nNext Q lines: timestamp cost.',
    outputFormat: 'For each request, output `200` or `429` on a new line.',
    constraints: ['1 <= B <= 1000', '1 <= R <= 100', '1 <= Q <= 1000', 'timestamps are non-decreasing'],
    sampleInput: '5 1\n4\n0 3\n0 3\n1 2\n2 1',
    sampleOutput: '200\n429\n200\n200',
    kapilIntuition:
      'Mentorship By Kapil: Maintain `tokens` and `lastTimestamp`. On arrival at timestamp `t`, compute `tokens = min(B, tokens + (t - lastTimestamp) * R)`. If `tokens >= cost`, deduct cost and return 200; else return 429.',
    timeComplexity: 'O(1) per request',
    spaceComplexity: 'O(1)',
    testCases: [
      { id: 'tc-1', input: '5 1\n4\n0 3\n0 3\n1 2\n2 1', expectedOutput: '200\n429\n200\n200', isHidden: false, explanation: 'Req 1 uses 3 tokens (rem 2). Req 2 needs 3, only 2 left (429). At t=1, 1 token refilled (rem 3), uses 2 (rem 1). At t=2, 1 refilled (rem 2), uses 1.' },
      { id: 'tc-2', input: '2 1\n2\n0 2\n0 1', expectedOutput: '200\n429', isHidden: false, explanation: 'First takes all 2 tokens, second is rate limited.' },
      { id: 'tc-3', input: '10 5\n1\n10 10', expectedOutput: '200', isHidden: true, explanation: 'Refilled to capacity and consumed.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    double B, R;
    if (scanf("%lf %lf", &B, &R) != 2) return 0;
    // Implement Token Bucket
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    double B, R;
    if (!(cin >> B >> R)) return 0;
    // Implement Token Bucket
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        double B = sc.nextDouble();
        double R = sc.nextDouble();
        // Implement Token Bucket
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    b, r = float(lines[0]), float(lines[1])
    # Implement Token Bucket

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    double B, R;
    if (scanf("%lf %lf", &B, &R) != 2) return 0;
    int Q;
    if (scanf("%d", &Q) != 1) return 0;

    double tokens = B;
    double lastT = 0;

    while (Q--) {
        double t, cost;
        scanf("%lf %lf", &t, &cost);
        tokens += (t - lastT) * R;
        if (tokens > B) tokens = B;
        lastT = t;

        if (tokens >= cost) {
            tokens -= cost;
            printf("200\\n");
        } else {
            printf("429\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <algorithm>

using namespace std;

int main() {
    double B, R;
    if (!(cin >> B >> R)) return 0;
    int Q; cin >> Q;

    double tokens = B;
    double lastT = 0;

    while (Q--) {
        double t, cost; cin >> t >> cost;
        tokens = min(B, tokens + (t - lastT) * R);
        lastT = t;
        if (tokens >= cost) {
            tokens -= cost;
            cout << 200 << "\n";
        } else {
            cout << 429 << "\n";
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        double B = sc.nextDouble();
        double R = sc.nextDouble();
        int Q = sc.nextInt();

        double tokens = B;
        double lastT = 0;
        StringBuilder sb = new StringBuilder();

        while (Q-- > 0) {
            double t = sc.nextDouble();
            double cost = sc.nextDouble();
            tokens = Math.min(B, tokens + (t - lastT) * R);
            lastT = t;
            if (tokens >= cost) {
                tokens -= cost;
                sb.append("200\n");
            } else {
                sb.append("429\n");
            }
        }
        System.out.print(sb);
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    b, r = float(lines[0]), float(lines[1])
    q = int(lines[2])
    idx = 3

    tokens = b
    last_t = 0.0
    out = []

    for _ in range(q):
        t, cost = float(lines[idx]), float(lines[idx + 1])
        idx += 2
        tokens = min(b, tokens + (t - last_t) * r)
        last_t = t
        if tokens >= cost:
            tokens -= cost
            out.append("200")
        else:
            out.append("429")

    print('\\n'.join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 3. Design LRU Cache
  {
    id: 'd14-ch-3',
    day: 14,
    title: 'Design In-Memory LRU Cache (O(1) Get & Put)',
    difficulty: 'Medium',
    moduleTag: '15. Distributed Systems (HLD/LLD)',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    platforms: ['LeetCode'],
    problemStatement:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with a given capacity.\nSupport:\n`GET key`: Return the value of the key if it exists, otherwise return -1.\n`PUT key val`: Update the value if key exists; otherwise add key-value pair. If number of keys exceeds capacity, evict the least recently used key.',
    inputFormat: 'First line: capacity Q (cache capacity and operations count).\nNext Q lines: `GET key` or `PUT key val`.',
    outputFormat: 'Output the result of each `GET` operation on a new line.',
    constraints: ['1 <= capacity <= 3000', '1 <= Q <= 10^5', '0 <= key, val <= 10^5'],
    sampleInput: '2 6\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3',
    sampleOutput: '1\n-1\n3',
    kapilIntuition:
      'Mentorship By Kapil: Combine a Hash Map and a Doubly Linked List! Hash map gives O(1) key-to-node lookup. Doubly linked list allows moving accessed nodes to the head (most recently used) and evicting the tail node (least recently used) in O(1) pointer updates.',
    timeComplexity: 'O(1) per get and put',
    spaceComplexity: 'O(capacity)',
    testCases: [
      { id: 'tc-1', input: '2 6\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3', expectedOutput: '1\n-1\n3', isHidden: false, explanation: 'Key 2 is evicted when key 3 is added.' },
      { id: 'tc-2', input: '1 3\nPUT 10 100\nGET 10\nGET 20', expectedOutput: '100\n-1', isHidden: false, explanation: 'Key 10 exists, 20 does not.' },
      { id: 'tc-3', input: '2 4\nPUT 1 10\nPUT 1 20\nGET 1\nGET 2', expectedOutput: '20\n-1', isHidden: true, explanation: 'Key 1 updated to 20.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int cap, Q;
    if (scanf("%d %d", &cap, &Q) != 2) return 0;
    // Implement LRU Cache
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

int main() {
    int cap, Q;
    if (!(cin >> cap >> Q)) return 0;
    // Implement LRU Cache
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int cap = sc.nextInt();
        int Q = sc.nextInt();
        // Implement LRU Cache
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    cap, q = int(lines[0]), int(lines[1])
    # Implement LRU Cache

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Node {
    int key, val;
    struct Node *prev, *next;
} Node;

Node* head;
Node* tail;
Node* map[100005];
int size = 0, capacity = 0;

void removeNode(Node* node) {
    node->prev->next = node->next;
    node->next->prev = node->prev;
}

void addToHead(Node* node) {
    node->next = head->next;
    node->prev = head;
    head->next->prev = node;
    head->next = node;
}

int get(int key) {
    if (!map[key]) return -1;
    Node* node = map[key];
    removeNode(node);
    addToHead(node);
    return node->val;
}

void put(int key, int val) {
    if (map[key]) {
        Node* node = map[key];
        node->val = val;
        removeNode(node);
        addToHead(node);
    } else {
        if (size == capacity) {
            Node* lru = tail->prev;
            map[lru->key] = NULL;
            removeNode(lru);
            free(lru);
            size--;
        }
        Node* newNode = (Node*)malloc(sizeof(Node));
        newNode->key = key;
        newNode->val = val;
        map[key] = newNode;
        addToHead(newNode);
        size++;
    }
}

int main() {
    int Q;
    if (scanf("%d %d", &capacity, &Q) != 2) return 0;
    head = (Node*)malloc(sizeof(Node));
    tail = (Node*)malloc(sizeof(Node));
    head->next = tail;
    tail->prev = head;

    while (Q--) {
        char op[8];
        scanf("%7s", op);
        if (strcmp(op, "GET") == 0) {
            int k; scanf("%d", &k);
            printf("%d\\n", get(k));
        } else {
            int k, v; scanf("%d %d", &k, &v);
            put(k, v);
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_map>
#include <list>
#include <string>

using namespace std;

class LRUCache {
    int capacity;
    list<pair<int, int>> dll;
    unordered_map<int, list<pair<int, int>>::iterator> map;
public:
    LRUCache(int cap) : capacity(cap) {}

    int get(int key) {
        if (!map.count(key)) return -1;
        dll.splice(dll.begin(), dll, map[key]);
        return map[key]->second;
    }

    void put(int key, int val) {
        if (map.count(key)) {
            map[key]->second = val;
            dll.splice(dll.begin(), dll, map[key]);
            return;
        }
        if ((int)dll.size() == capacity) {
            map.erase(dll.back().first);
            dll.pop_back();
        }
        dll.push_front({key, val});
        map[key] = dll.begin();
    }
};

int main() {
    int cap, Q;
    if (!(cin >> cap >> Q)) return 0;
    LRUCache cache(cap);
    while (Q--) {
        string op; cin >> op;
        if (op == "GET") {
            int k; cin >> k;
            cout << cache.get(k) << "\n";
        } else {
            int k, v; cin >> k >> v;
            cache.put(k, v);
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    static class LRUCache extends LinkedHashMap<Integer, Integer> {
        private final int capacity;
        LRUCache(int cap) {
            super(cap, 0.75f, true);
            this.capacity = cap;
        }
        public int getVal(int key) {
            return super.getOrDefault(key, -1);
        }
        @Override
        protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
            return size() > capacity;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int cap = sc.nextInt();
        int Q = sc.nextInt();
        LRUCache lru = new LRUCache(cap);
        StringBuilder sb = new StringBuilder();

        while (Q-- > 0) {
            String op = sc.next();
            if (op.equals("GET")) {
                int k = sc.nextInt();
                sb.append(lru.getVal(k)).append("\n");
            } else {
                int k = sc.nextInt();
                int v = sc.nextInt();
                lru.put(k, v);
            }
        }
        System.out.print(sb);
    }
}`,
      python: `import sys
import collections

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    cap, q = int(lines[0]), int(lines[1])
    cache = collections.OrderedDict()
    idx = 2
    out = []

    for _ in range(q):
        op = lines[idx]
        if op == "GET":
            k = int(lines[idx + 1])
            idx += 2
            if k in cache:
                cache.move_to_end(k)
                out.append(str(cache[k]))
            else:
                out.append("-1")
        else:
            k, v = int(lines[idx + 1]), int(lines[idx + 2])
            idx += 3
            if k in cache:
                cache.move_to_end(k)
            cache[k] = v
            if len(cache) > cap:
                cache.popitem(last=False)

    print('\\n'.join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 4. Design LFU Cache
  {
    id: 'd14-ch-4',
    day: 14,
    title: 'Design In-Memory LFU Cache in O(1)',
    difficulty: 'Hard',
    moduleTag: '15. Distributed Systems (HLD/LLD)',
    companies: ['Amazon', 'Google', 'Citadel'],
    platforms: ['LeetCode'],
    problemStatement:
      'Design a Least Frequently Used (LFU) cache with a given capacity. When capacity is exceeded, evict the key with the lowest access frequency. In case of tie, evict the least recently used key among them.',
    inputFormat: 'First line: capacity Q.\nNext Q lines: `GET key` or `PUT key val`.',
    outputFormat: 'Output the result of each `GET` operation on a new line.',
    constraints: ['1 <= capacity <= 10^4', '1 <= Q <= 10^5'],
    sampleInput: '2 6\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3',
    sampleOutput: '1\n-1\n3',
    kapilIntuition:
      'Mentorship By Kapil: Maintain three maps: (1) key -> val, (2) key -> frequency, (3) frequency -> DoublyLinkedList of keys. Track `minFreq`. When a key is accessed, move it from freq[f] to freq[f + 1]. If freq[f] becomes empty and `minFreq == f`, increment `minFreq`. On eviction, remove the LRU node from `freq[minFreq]`. Everything executes in O(1).',
    timeComplexity: 'O(1) per operation',
    spaceComplexity: 'O(capacity)',
    testCases: [
      { id: 'tc-1', input: '2 6\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3', expectedOutput: '1\n-1\n3', isHidden: false, explanation: 'Key 2 has frequency 1 and is evicted over key 1 (freq 2).' },
      { id: 'tc-2', input: '1 2\nPUT 1 10\nGET 1', expectedOutput: '10', isHidden: false, explanation: 'Single element stored and retrieved.' },
      { id: 'tc-3', input: '2 3\nPUT 1 1\nPUT 2 2\nGET 1', expectedOutput: '1', isHidden: true, explanation: 'Key 1 accessed.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int cap, Q;
    if (scanf("%d %d", &cap, &Q) != 2) return 0;
    // Implement LFU Cache
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int cap, Q;
    if (!(cin >> cap >> Q)) return 0;
    // Implement LFU Cache
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int cap = sc.nextInt();
        int Q = sc.nextInt();
        // Implement LFU Cache
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    cap, q = int(lines[0]), int(lines[1])
    # Implement LFU Cache

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_KEY 100005

typedef struct Node {
    int key, val, freq;
    struct Node *prev, *next;
} Node;

typedef struct DList {
    Node *head, *tail;
    int size;
} DList;

DList* createList() {
    DList* l = (DList*)malloc(sizeof(DList));
    l->head = (Node*)malloc(sizeof(Node));
    l->tail = (Node*)malloc(sizeof(Node));
    l->head->next = l->tail;
    l->tail->prev = l->head;
    l->size = 0;
    return l;
}

void addHead(DList* l, Node* node) {
    node->next = l->head->next;
    node->prev = l->head;
    l->head->next->prev = node;
    l->head->next = node;
    l->size++;
}

void removeN(DList* l, Node* node) {
    node->prev->next = node->next;
    node->next->prev = node->prev;
    l->size--;
}

Node* mapKey[MAX_KEY];
DList* freqMap[200005];
int minFreq = 0, capacity = 0, curSize = 0;

void touch(Node* node) {
    int f = node->freq;
    removeN(freqMap[f], node);
    if (freqMap[f]->size == 0 && minFreq == f) minFreq++;
    node->freq++;
    if (!freqMap[node->freq]) freqMap[node->freq] = createList();
    addHead(freqMap[node->freq], node);
}

int get(int key) {
    if (!mapKey[key]) return -1;
    touch(mapKey[key]);
    return mapKey[key]->val;
}

void put(int key, int val) {
    if (capacity <= 0) return;
    if (mapKey[key]) {
        mapKey[key]->val = val;
        touch(mapKey[key]);
    } else {
        if (curSize == capacity) {
            Node* lfu = freqMap[minFreq]->tail->prev;
            mapKey[lfu->key] = NULL;
            removeN(freqMap[minFreq], lfu);
            free(lfu);
            curSize--;
        }
        Node* node = (Node*)malloc(sizeof(Node));
        node->key = key; node->val = val; node->freq = 1;
        mapKey[key] = node;
        minFreq = 1;
        if (!freqMap[1]) freqMap[1] = createList();
        addHead(freqMap[1], node);
        curSize++;
    }
}

int main() {
    int Q;
    if (scanf("%d %d", &capacity, &Q) != 2) return 0;
    while (Q--) {
        char op[8];
        scanf("%7s", op);
        if (strcmp(op, "GET") == 0) {
            int k; scanf("%d", &k);
            printf("%d\\n", get(k));
        } else {
            int k, v; scanf("%d %d", &k, &v);
            put(k, v);
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_map>
#include <list>
#include <string>

using namespace std;

struct Node {
    int key, val, freq;
};

class LFUCache {
    int capacity, minFreq;
    unordered_map<int, list<Node>::iterator> keyMap;
    unordered_map<int, list<Node>> freqMap;
public:
    LFUCache(int cap) : capacity(cap), minFreq(0) {}

    int get(int key) {
        if (!keyMap.count(key)) return -1;
        auto it = keyMap[key];
        int val = it->val, freq = it->freq;
        freqMap[freq].erase(it);
        if (freqMap[freq].empty() && minFreq == freq) minFreq++;
        freqMap[freq + 1].push_front({key, val, freq + 1});
        keyMap[key] = freqMap[freq + 1].begin();
        return val;
    }

    void put(int key, int val) {
        if (capacity <= 0) return;
        if (keyMap.count(key)) {
            auto it = keyMap[key];
            int freq = it->freq;
            freqMap[freq].erase(it);
            if (freqMap[freq].empty() && minFreq == freq) minFreq++;
            freqMap[freq + 1].push_front({key, val, freq + 1});
            keyMap[key] = freqMap[freq + 1].begin();
            return;
        }
        if ((int)keyMap.size() == capacity) {
            auto lfu = freqMap[minFreq].back();
            keyMap.erase(lfu.key);
            freqMap[minFreq].pop_back();
        }
        minFreq = 1;
        freqMap[1].push_front({key, val, 1});
        keyMap[key] = freqMap[1].begin();
    }
};

int main() {
    int cap, Q;
    if (!(cin >> cap >> Q)) return 0;
    LFUCache cache(cap);
    while (Q--) {
        string op; cin >> op;
        if (op == "GET") {
            int k; cin >> k;
            cout << cache.get(k) << "\n";
        } else {
            int k, v; cin >> k >> v;
            cache.put(k, v);
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    static class Node {
        int key, val, freq;
        Node(int k, int v, int f) { key = k; val = v; freq = f; }
    }

    static int capacity, minFreq = 0;
    static Map<Integer, Node> keyMap = new HashMap<>();
    static Map<Integer, LinkedHashSet<Node>> freqMap = new HashMap<>();

    public static int get(int key) {
        if (!keyMap.containsKey(key)) return -1;
        Node node = keyMap.get(key);
        int f = node.freq;
        freqMap.get(f).remove(node);
        if (freqMap.get(f).isEmpty() && minFreq == f) minFreq++;
        node.freq++;
        freqMap.computeIfAbsent(node.freq, k -> new LinkedHashSet<>()).add(node);
        return node.val;
    }

    public static void put(int key, int val) {
        if (capacity <= 0) return;
        if (keyMap.containsKey(key)) {
            Node node = keyMap.get(key);
            node.val = val;
            get(key);
            return;
        }
        if (keyMap.size() == capacity) {
            Node lfu = freqMap.get(minFreq).iterator().next();
            freqMap.get(minFreq).remove(lfu);
            keyMap.remove(lfu.key);
        }
        Node node = new Node(key, val, 1);
        minFreq = 1;
        keyMap.put(key, node);
        freqMap.computeIfAbsent(1, k -> new LinkedHashSet<>()).add(node);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        capacity = sc.nextInt();
        int Q = sc.nextInt();
        StringBuilder sb = new StringBuilder();

        while (Q-- > 0) {
            String op = sc.next();
            if (op.equals("GET")) {
                sb.append(get(sc.nextInt())).append("\n");
            } else {
                put(sc.nextInt(), sc.nextInt());
            }
        }
        System.out.print(sb);
    }
}`,
      python: `import sys
import collections

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    cap, q = int(lines[0]), int(lines[1])
    key_map = {}
    freq_map = collections.defaultdict(collections.OrderedDict)
    min_freq = 0
    idx = 2
    out = []

    for _ in range(q):
        op = lines[idx]
        if op == "GET":
            k = int(lines[idx + 1])
            idx += 2
            if k not in key_map:
                out.append("-1")
            else:
                val, f = key_map[k]
                del freq_map[f][k]
                if not freq_map[f] and min_freq == f:
                    min_freq += 1
                freq_map[f + 1][k] = val
                key_map[k] = (val, f + 1)
                out.append(str(val))
        else:
            k, v = int(lines[idx + 1]), int(lines[idx + 2])
            idx += 3
            if cap <= 0:
                continue
            if k in key_map:
                _, f = key_map[k]
                del freq_map[f][k]
                if not freq_map[f] and min_freq == f:
                    min_freq += 1
                freq_map[f + 1][k] = v
                key_map[k] = (v, f + 1)
            else:
                if len(key_map) == cap:
                    lfu_k, _ = freq_map[min_freq].popitem(last=False)
                    del key_map[lfu_k]
                min_freq = 1
                freq_map[1][k] = v
                key_map[k] = (v, 1)

    print('\\n'.join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 5. Twitter Snowflake 64-Bit Unique Distributed ID Generator
  {
    id: 'd14-ch-5',
    day: 14,
    title: 'Design Twitter Snowflake Distributed ID Generator',
    difficulty: 'Medium',
    moduleTag: '15. Distributed Systems (HLD/LLD)',
    companies: ['Twitter', 'Discord', 'Uber'],
    platforms: ['System Design Lab'],
    problemStatement:
      'Implement the Twitter Snowflake 64-bit unique ID generation algorithm.\nA 64-bit ID consists of:\n- 1 unused sign bit (0)\n- 41 bits timestamp in milliseconds\n- 5 bits datacenter ID\n- 5 bits worker ID\n- 12 bits sequence number (resets to 0 each millisecond; increments if same millisecond).\nGiven custom epoch `E`, datacenter `D`, worker `W`, and a sequence of generation requests with timestamp `T`, generate the unique 64-bit integers.',
    inputFormat: 'First line: E D W (custom epoch ms, datacenter ID, worker ID).\nSecond line: Q (number of ID generation requests).\nNext line: Q non-decreasing millisecond timestamps.',
    outputFormat: 'Q 64-bit signed/unsigned integer IDs on separate lines.',
    constraints: ['0 <= D, W <= 31', 'T >= E', '1 <= Q <= 1000'],
    sampleInput: '1000 1 1\n3\n1005 1005 1006',
    sampleOutput: '20972544\n20972545\n25166848',
    kapilIntuition:
      'Mentorship By Kapil: Bit shifting mechanics: `(T - E) << 22 | (D << 17) | (W << 12) | sequence`. When timestamp equals the previous timestamp, increment `sequence`; when timestamp increases, reset `sequence = 0`.',
    timeComplexity: 'O(1) per ID',
    spaceComplexity: 'O(1)',
    testCases: [
      { id: 'tc-1', input: '1000 1 1\n3\n1005 1005 1006', expectedOutput: '20972544\n20972545\n25166848', isHidden: false, explanation: 'Two IDs at t=1005 increment sequence 0 and 1; t=1006 resets sequence to 0.' },
      { id: 'tc-2', input: '0 0 0\n2\n1 1', expectedOutput: '4194304\n4194305', isHidden: false, explanation: 'Epoch 0, D=0, W=0.' },
      { id: 'tc-3', input: '100 0 1\n1\n100', expectedOutput: '4096', isHidden: true, explanation: 'Delta 0, worker 1.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    long long E; int D, W, Q;
    if (scanf("%lld %d %d %d", &E, &D, &W, &Q) != 4) return 0;
    // Implement Snowflake
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    long long E; int D, W, Q;
    if (!(cin >> E >> D >> W >> Q)) return 0;
    // Implement Snowflake
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        long E = sc.nextLong();
        int D = sc.nextInt();
        int W = sc.nextInt();
        int Q = sc.nextInt();
        // Implement Snowflake
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    e, d, w, q = int(lines[0]), int(lines[1]), int(lines[2]), int(lines[3])
    # Implement Snowflake

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    long long E; int D, W, Q;
    if (scanf("%lld %d %d %d", &E, &D, &W, &Q) != 4) return 0;

    long long lastT = -1;
    long long seq = 0;

    while (Q--) {
        long long t;
        scanf("%lld", &t);
        if (t == lastT) {
            seq++;
        } else {
            seq = 0;
            lastT = t;
        }
        long long id = ((t - E) << 22) | ((long long)D << 17) | ((long long)W << 12) | seq;
        printf("%lld\\n", id);
    }
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    long long E; int D, W, Q;
    if (!(cin >> E >> D >> W >> Q)) return 0;

    long long lastT = -1, seq = 0;
    while (Q--) {
        long long t; cin >> t;
        if (t == lastT) seq++;
        else { seq = 0; lastT = t; }
        long long id = ((t - E) << 22) | ((long long)D << 17) | ((long long)W << 12) | seq;
        cout << id << "\n";
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        long E = sc.nextLong();
        int D = sc.nextInt();
        int W = sc.nextInt();
        int Q = sc.nextInt();

        long lastT = -1, seq = 0;
        StringBuilder sb = new StringBuilder();

        while (Q-- > 0) {
            long t = sc.nextLong();
            if (t == lastT) seq++;
            else { seq = 0; lastT = t; }
            long id = ((t - E) << 22) | ((long) D << 17) | ((long) W << 12) | seq;
            sb.append(id).append("\n");
        }
        System.out.print(sb);
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    e, d, w, q = int(lines[0]), int(lines[1]), int(lines[2]), int(lines[3])
    timestamps = [int(x) for x in lines[4:4 + q]]

    last_t = -1
    seq = 0
    out = []

    for t in timestamps:
        if t == last_t:
            seq += 1
        else:
            seq = 0
            last_t = t
        snowflake_id = ((t - e) << 22) | (d << 17) | (w << 12) | seq
        out.append(str(snowflake_id))

    print('\\n'.join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 6. WAL Crash Recovery Simulator
  {
    id: 'd14-ch-6',
    day: 14,
    title: 'Write-Ahead Log (WAL) Crash Recovery Simulator',
    difficulty: 'Medium',
    moduleTag: '15. Distributed Systems (HLD/LLD)',
    companies: ['PostgreSQL', 'Amazon Aurora', 'MongoDB'],
    platforms: ['System Design Lab'],
    problemStatement:
      'Simulate database crash recovery using Write-Ahead Logging (WAL).\nGiven a series of log records:\n`START txn`\n`SET txn key val`\n`COMMIT txn`\n`CHECKPOINT`\nIn the event of a simulated crash, recover the in-memory database state: ONLY transactions that completed with `COMMIT` prior to crash must be applied. Uncommitted transactions must be rolled back / discarded.',
    inputFormat: 'First line: L (number of WAL log lines).\nNext L lines: WAL commands.',
    outputFormat: 'Sorted key-value pairs (`key=val`) of the recovered state on separate lines, or `EMPTY` if no committed state.',
    constraints: ['1 <= L <= 1000', 'Keys and values are alphanumeric strings'],
    sampleInput: '7\nSTART T1\nSET T1 name Alice\nCOMMIT T1\nSTART T2\nSET T2 name Bob\nSET T2 age 30\nCRASH',
    sampleOutput: 'name=Alice',
    kapilIntuition:
      'Mentorship By Kapil: Parse the WAL forward to record operations per transaction. Check which transactions executed a valid `COMMIT`. In the recovery phase, apply only the operations of committed transactions. Uncommitted transaction T2 is discarded.',
    timeComplexity: 'O(L)',
    spaceComplexity: 'O(L)',
    testCases: [
      { id: 'tc-1', input: '7\nSTART T1\nSET T1 name Alice\nCOMMIT T1\nSTART T2\nSET T2 name Bob\nSET T2 age 30\nCRASH', expectedOutput: 'name=Alice', isHidden: false, explanation: 'T1 committed before crash; T2 aborted.' },
      { id: 'tc-2', input: '3\nSTART T1\nSET T1 count 5\nCRASH', expectedOutput: 'EMPTY', isHidden: false, explanation: 'T1 never committed.' },
      { id: 'tc-3', input: '6\nSTART T1\nSET T1 x 10\nCOMMIT T1\nSTART T2\nSET T2 x 20\nCOMMIT T2', expectedOutput: 'x=20', isHidden: true, explanation: 'T2 overwrites T1.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int L;
    if (scanf("%d", &L) != 1) return 0;
    // Implement WAL recovery
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int L;
    if (!(cin >> L)) return 0;
    // Implement WAL recovery
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int L = sc.nextInt();
        // Implement WAL recovery
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().splitlines()
    if not lines:
        return
    # Implement WAL recovery

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

typedef struct {
    char txn[16];
    char key[32];
    char val[32];
} Op;

typedef struct {
    char key[32];
    char val[32];
} Entry;

int cmpEntry(const void* a, const void* b) {
    return strcmp(((Entry*)a)->key, ((Entry*)b)->key);
}

int main() {
    int L;
    if (scanf("%d", &L) != 1) return 0;

    Op ops[1005];
    int opCount = 0;
    char committedTxns[1005][16];
    int commitCount = 0;

    for (int i = 0; i < L; i++) {
        char cmd[16];
        scanf("%15s", cmd);
        if (strcmp(cmd, "START") == 0) {
            char t[16]; scanf("%15s", t);
        } else if (strcmp(cmd, "SET") == 0) {
            scanf("%15s %31s %31s", ops[opCount].txn, ops[opCount].key, ops[opCount].val);
            opCount++;
        } else if (strcmp(cmd, "COMMIT") == 0) {
            char t[16]; scanf("%15s", t);
            strcpy(committedTxns[commitCount++], t);
        } else if (strcmp(cmd, "CRASH") == 0) {
            break;
        }
    }

    Entry db[1005];
    int dbCount = 0;

    for (int i = 0; i < opCount; i++) {
        bool isCommitted = false;
        for (int c = 0; c < commitCount; c++) {
            if (strcmp(ops[i].txn, committedTxns[c]) == 0) {
                isCommitted = true;
                break;
            }
        }
        if (isCommitted) {
            bool found = false;
            for (int k = 0; k < dbCount; k++) {
                if (strcmp(db[k].key, ops[i].key) == 0) {
                    strcpy(db[k].val, ops[i].val);
                    found = true;
                    break;
                }
            }
            if (!found) {
                strcpy(db[dbCount].key, ops[i].key);
                strcpy(db[dbCount].val, ops[i].val);
                dbCount++;
            }
        }
    }

    if (dbCount == 0) {
        printf("EMPTY\\n");
    } else {
        qsort(db, dbCount, sizeof(Entry), cmpEntry);
        for (int i = 0; i < dbCount; i++) {
            printf("%s=%s\\n", db[i].key, db[i].val);
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <set>

using namespace std;

struct Op {
    string txn, key, val;
};

int main() {
    int L;
    if (!(cin >> L)) return 0;
    vector<Op> ops;
    set<string> committed;

    for (int i = 0; i < L; ++i) {
        string cmd; cin >> cmd;
        if (cmd == "START") {
            string t; cin >> t;
        } else if (cmd == "SET") {
            string t, k, v; cin >> t >> k >> v;
            ops.push_back({t, k, v});
        } else if (cmd == "COMMIT") {
            string t; cin >> t;
            committed.insert(t);
        } else if (cmd == "CRASH") {
            break;
        }
    }

    map<string, string> db;
    for (auto& op : ops) {
        if (committed.count(op.txn)) {
            db[op.key] = op.val;
        }
    }

    if (db.empty()) {
        cout << "EMPTY\n";
    } else {
        for (auto& [k, v] : db) {
            cout << k << "=" << v << "\n";
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    static class Op {
        String txn, key, val;
        Op(String t, String k, String v) { txn = t; key = k; val = v; }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int L = sc.nextInt();
        List<Op> ops = new ArrayList<>();
        Set<String> committed = new HashSet<>();

        for (int i = 0; i < L; i++) {
            String cmd = sc.next();
            if (cmd.equals("START")) {
                sc.next();
            } else if (cmd.equals("SET")) {
                ops.add(new Op(sc.next(), sc.next(), sc.next()));
            } else if (cmd.equals("COMMIT")) {
                committed.add(sc.next());
            } else if (cmd.equals("CRASH")) {
                break;
            }
        }

        Map<String, String> db = new TreeMap<>();
        for (Op op : ops) {
            if (committed.contains(op.txn)) {
                db.put(op.key, op.val);
            }
        }

        if (db.isEmpty()) {
            System.out.println("EMPTY");
        } else {
            for (Map.Entry<String, String> e : db.entrySet()) {
                System.out.println(e.getKey() + "=" + e.getValue());
            }
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    l = int(lines[0])
    idx = 1

    ops = []
    committed = set()

    while idx < len(lines):
        cmd = lines[idx]
        idx += 1
        if cmd == "START":
            idx += 1
        elif cmd == "SET":
            t, k, v = lines[idx], lines[idx + 1], lines[idx + 2]
            idx += 3
            ops.append((t, k, v))
        elif cmd == "COMMIT":
            t = lines[idx]
            idx += 1
            committed.add(t)
        elif cmd == "CRASH":
            break

    db = {}
    for t, k, v in ops:
        if t in committed:
            db[k] = v

    if not db:
        print("EMPTY")
    else:
        for k in sorted(db.keys()):
            print(f"{k}={db[k]}")

if __name__ == '__main__':
    main()`
    }
  },

  // 7. Circuit Breaker Pattern
  {
    id: 'd14-ch-7',
    day: 14,
    title: 'Design Circuit Breaker Pattern with State Transitions',
    difficulty: 'Medium',
    moduleTag: '15. Distributed Systems (HLD/LLD)',
    companies: ['Netflix', 'Amazon', 'Uber'],
    platforms: ['System Design Lab'],
    problemStatement:
      'Implement a Distributed Circuit Breaker with 3 states:\n- `CLOSED`: Normal operation. If consecutive failures reach `failThreshold`, trip to `OPEN`.\n- `OPEN`: Fail fast immediately without calling downstream. Trips to `HALF-OPEN` after `coolDownSec` seconds.\n- `HALF-OPEN`: Allows 1 probe call. If probe succeeds, reset to `CLOSED`. If probe fails, return to `OPEN`.\nGiven threshold, cooldown, and simulated calls with timestamp and success status (1 = Success, 0 = Fail), output the status of the Circuit Breaker before each call: `CLOSED`, `OPEN`, or `HALF-OPEN`.',
    inputFormat: 'First line: failThreshold coolDownSec Q.\nNext Q lines: timestamp success (0 or 1).',
    outputFormat: 'For each call, print the state of the circuit breaker before executing.',
    constraints: ['1 <= failThreshold <= 10', '1 <= coolDownSec <= 60', '1 <= Q <= 1000'],
    sampleInput: '2 5 5\n0 0\n1 0\n2 1\n7 1\n8 1',
    sampleOutput: 'CLOSED\nCLOSED\nOPEN\nHALF-OPEN\nCLOSED',
    kapilIntuition:
      'Mentorship By Kapil: Maintain `state`, `failureCount`, and `openTimestamp`. If in OPEN state and `timestamp - openTimestamp >= coolDownSec`, transition to HALF-OPEN. In HALF-OPEN, success resets to CLOSED; failure trips back to OPEN.',
    timeComplexity: 'O(1) per call',
    spaceComplexity: 'O(1)',
    testCases: [
      { id: 'tc-1', input: '2 5 5\n0 0\n1 0\n2 1\n7 1\n8 1', expectedOutput: 'CLOSED\nCLOSED\nOPEN\nHALF-OPEN\nCLOSED', isHidden: false, explanation: '2 failures trip to OPEN at t=1. At t=2, circuit is OPEN. At t=7 (>= 1+5), probes HALF-OPEN and succeeds, resetting to CLOSED.' },
      { id: 'tc-2', input: '1 2 2\n0 0\n1 1', expectedOutput: 'CLOSED\nOPEN', isHidden: false, explanation: '1 failure trips immediately.' },
      { id: 'tc-3', input: '3 5 3\n0 1\n1 1\n2 1', expectedOutput: 'CLOSED\nCLOSED\nCLOSED', isHidden: true, explanation: 'All calls succeed.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int thresh, cd, Q;
    if (scanf("%d %d %d", &thresh, &cd, &Q) != 3) return 0;
    // Implement Circuit Breaker
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int thresh, cd, Q;
    if (!(cin >> thresh >> cd >> Q)) return 0;
    // Implement Circuit Breaker
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int thresh = sc.nextInt();
        int cd = sc.nextInt();
        int Q = sc.nextInt();
        // Implement Circuit Breaker
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    thresh, cd, q = int(lines[0]), int(lines[1]), int(lines[2])
    # Implement Circuit Breaker

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>

enum State { CLOSED, OPEN, HALF_OPEN };

int main() {
    int thresh, cd, Q;
    if (scanf("%d %d %d", &thresh, &cd, &Q) != 3) return 0;

    enum State state = CLOSED;
    int fails = 0;
    int openT = -1;

    while (Q--) {
        int t, ok;
        scanf("%d %d", &t, &ok);

        if (state == OPEN && (t - openT >= cd)) {
            state = HALF_OPEN;
        }

        if (state == CLOSED) printf("CLOSED\\n");
        else if (state == OPEN) printf("OPEN\\n");
        else printf("HALF-OPEN\\n");

        if (state == CLOSED) {
            if (!ok) {
                fails++;
                if (fails >= thresh) {
                    state = OPEN;
                    openT = t;
                }
            } else {
                fails = 0;
            }
        } else if (state == HALF_OPEN) {
            if (ok) {
                state = CLOSED;
                fails = 0;
            } else {
                state = OPEN;
                openT = t;
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

enum State { CLOSED, OPEN, HALF_OPEN };

int main() {
    int thresh, cd, Q;
    if (!(cin >> thresh >> cd >> Q)) return 0;

    State state = CLOSED;
    int fails = 0, openT = -1;

    while (Q--) {
        int t, ok; cin >> t >> ok;
        if (state == OPEN && (t - openT >= cd)) {
            state = HALF_OPEN;
        }

        if (state == CLOSED) cout << "CLOSED\n";
        else if (state == OPEN) cout << "OPEN\n";
        else cout << "HALF-OPEN\n";

        if (state == CLOSED) {
            if (!ok) {
                if (++fails >= thresh) {
                    state = OPEN;
                    openT = t;
                }
            } else fails = 0;
        } else if (state == HALF_OPEN) {
            if (ok) {
                state = CLOSED;
                fails = 0;
            } else {
                state = OPEN;
                openT = t;
            }
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    enum State { CLOSED, OPEN, HALF_OPEN }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int thresh = sc.nextInt();
        int cd = sc.nextInt();
        int Q = sc.nextInt();

        State state = State.CLOSED;
        int fails = 0, openT = -1;
        StringBuilder sb = new StringBuilder();

        while (Q-- > 0) {
            int t = sc.nextInt();
            int ok = sc.nextInt();

            if (state == State.OPEN && (t - openT >= cd)) {
                state = State.HALF_OPEN;
            }

            if (state == State.CLOSED) sb.append("CLOSED\n");
            else if (state == State.OPEN) sb.append("OPEN\n");
            else sb.append("HALF-OPEN\n");

            if (state == State.CLOSED) {
                if (ok == 0) {
                    if (++fails >= thresh) {
                        state = State.OPEN;
                        openT = t;
                    }
                } else fails = 0;
            } else if (state == State.HALF_OPEN) {
                if (ok == 1) {
                    state = State.CLOSED;
                    fails = 0;
                } else {
                    state = State.OPEN;
                    openT = t;
                }
            }
        }
        System.out.print(sb);
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    thresh, cd, q = int(lines[0]), int(lines[1]), int(lines[2])
    idx = 3

    state = "CLOSED"
    fails = 0
    open_t = -1
    out = []

    for _ in range(q):
        t, ok = int(lines[idx]), int(lines[idx + 1])
        idx += 2

        if state == "OPEN" and (t - open_t >= cd):
            state = "HALF-OPEN"

        out.append(state)

        if state == "CLOSED":
            if ok == 0:
                fails += 1
                if fails >= thresh:
                    state = "OPEN"
                    open_t = t
            else:
                fails = 0
        elif state == "HALF-OPEN":
            if ok == 1:
                state = "CLOSED"
                fails = 0
            else:
                state = "OPEN"
                open_t = t

    print('\\n'.join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 8. Distributed Lock Lease Manager
  {
    id: 'd14-ch-8',
    day: 14,
    title: 'Design Distributed Lock Lease Manager with TTL Expiry',
    difficulty: 'Medium',
    moduleTag: '15. Distributed Systems (HLD/LLD)',
    companies: ['Google Chubby', 'Zookeeper', 'Redis Redlock'],
    platforms: ['System Design Lab'],
    problemStatement:
      'Design an in-memory Distributed Lock Manager supporting mutual exclusion with TTL lease expirations.\nOperations:\n`ACQUIRE key client ttl`: Try to acquire lock for key. If key is currently unlocked or previous lease expired (t >= expiryTime), grant lock and output `GRANTED fencing_token`. If already locked by someone else, output `DENIED`.\n`RELEASE key client`: Release lock if currently held by `client`. Output `RELEASED` or `FAIL`.',
    inputFormat: 'First line: Q (operations count).\nNext Q lines: `ACQUIRE timestamp key client ttl` or `RELEASE timestamp key client`.',
    outputFormat: 'Output result of each operation on a separate line.',
    constraints: ['1 <= Q <= 1000', 'Timestamps are non-decreasing', 'Fencing token starts at 1 and increments on every granted lock'],
    sampleInput: '5\nACQUIRE 0 lockA C1 5\nACQUIRE 2 lockA C2 5\nRELEASE 3 lockA C1\nACQUIRE 4 lockA C2 5\nACQUIRE 10 lockA C3 5',
    sampleOutput: 'GRANTED 1\nDENIED\nRELEASED\nGRANTED 2\nGRANTED 3',
    kapilIntuition:
      'Mentorship By Kapil: Track `currentHolder`, `expiryTime`, and `fencingToken` for each lock key. If timestamp >= expiryTime, the previous lease expired automatically. Use monotonically increasing fencing tokens to prevent zombie writes in downstream storage.',
    timeComplexity: 'O(1) per lock operation',
    spaceComplexity: 'O(K)',
    testCases: [
      { id: 'tc-1', input: '5\nACQUIRE 0 lockA C1 5\nACQUIRE 2 lockA C2 5\nRELEASE 3 lockA C1\nACQUIRE 4 lockA C2 5\nACQUIRE 10 lockA C3 5', expectedOutput: 'GRANTED 1\nDENIED\nRELEASED\nGRANTED 2\nGRANTED 3', isHidden: false, explanation: 'Lock leased, denied, released early, acquired with token 2, and token 3 after TTL expiry.' },
      { id: 'tc-2', input: '2\nACQUIRE 0 myKey C1 10\nRELEASE 1 myKey C2', expectedOutput: 'GRANTED 1\nFAIL', isHidden: false, explanation: 'C2 cannot release a lock held by C1.' },
      { id: 'tc-3', input: '1\nRELEASE 0 myKey C1', expectedOutput: 'FAIL', isHidden: true, explanation: 'Releasing unheld lock fails.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int Q;
    if (scanf("%d", &Q) != 1) return 0;
    // Implement Distributed Lock Manager
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int Q;
    if (!(cin >> Q)) return 0;
    // Implement Distributed Lock Manager
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int Q = sc.nextInt();
        // Implement Distributed Lock Manager
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().splitlines()
    if not lines:
        return
    # Implement Distributed Lock Manager

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

typedef struct {
    char key[32];
    char holder[32];
    int expiry;
} Lock;

Lock locks[1000];
int lockCount = 0;
int nextFencingToken = 1;

int findLock(const char* key) {
    for (int i = 0; i < lockCount; i++) {
        if (strcmp(locks[i].key, key) == 0) return i;
    }
    return -1;
}

int main() {
    int Q;
    if (scanf("%d", &Q) != 1) return 0;

    while (Q--) {
        char op[16];
        scanf("%15s", op);
        if (strcmp(op, "ACQUIRE") == 0) {
            int t, ttl;
            char key[32], client[32];
            scanf("%d %31s %31s %d", &t, key, client, &ttl);
            int idx = findLock(key);
            if (idx == -1) {
                strcpy(locks[lockCount].key, key);
                strcpy(locks[lockCount].holder, client);
                locks[lockCount].expiry = t + ttl;
                lockCount++;
                printf("GRANTED %d\\n", nextFencingToken++);
            } else {
                if (t >= locks[idx].expiry || strcmp(locks[idx].holder, "") == 0) {
                    strcpy(locks[idx].holder, client);
                    locks[idx].expiry = t + ttl;
                    printf("GRANTED %d\\n", nextFencingToken++);
                } else {
                    printf("DENIED\\n");
                }
            }
        } else {
            int t;
            char key[32], client[32];
            scanf("%d %31s %31s", &t, key, client);
            int idx = findLock(key);
            if (idx != -1 && t < locks[idx].expiry && strcmp(locks[idx].holder, client) == 0) {
                strcpy(locks[idx].holder, "");
                printf("RELEASED\\n");
            } else {
                printf("FAIL\\n");
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

struct LockInfo {
    string holder;
    int expiry;
};

int main() {
    int Q;
    if (!(cin >> Q)) return 0;
    unordered_map<string, LockInfo> locks;
    int token = 1;

    while (Q--) {
        string op; cin >> op;
        if (op == "ACQUIRE") {
            int t, ttl; string key, client;
            cin >> t >> key >> client >> ttl;
            if (!locks.count(key) || t >= locks[key].expiry || locks[key].holder.empty()) {
                locks[key] = {client, t + ttl};
                cout << "GRANTED " << token++ << "\n";
            } else {
                cout << "DENIED\n";
            }
        } else {
            int t; string key, client;
            cin >> t >> key >> client;
            if (locks.count(key) && t < locks[key].expiry && locks[key].holder == client) {
                locks[key].holder = "";
                cout << "RELEASED\n";
            } else {
                cout << "FAIL\n";
            }
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    static class LockInfo {
        String holder;
        int expiry;
        LockInfo(String h, int exp) { holder = h; expiry = exp; }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int Q = sc.nextInt();
        Map<String, LockInfo> locks = new HashMap<>();
        int token = 1;
        StringBuilder sb = new StringBuilder();

        while (Q-- > 0) {
            String op = sc.next();
            if (op.equals("ACQUIRE")) {
                int t = sc.nextInt();
                String key = sc.next();
                String client = sc.next();
                int ttl = sc.nextInt();

                if (!locks.containsKey(key) || t >= locks.get(key).expiry || locks.get(key).holder.isEmpty()) {
                    locks.put(key, new LockInfo(client, t + ttl));
                    sb.append("GRANTED ").append(token++).append("\n");
                } else {
                    sb.append("DENIED\n");
                }
            } else {
                int t = sc.nextInt();
                String key = sc.next();
                String client = sc.next();

                if (locks.containsKey(key) && t < locks.get(key).expiry && locks.get(key).holder.equals(client)) {
                    locks.get(key).holder = "";
                    sb.append("RELEASED\n");
                } else {
                    sb.append("FAIL\n");
                }
            }
        }
        System.out.print(sb);
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    q = int(lines[0])
    idx = 1

    locks = {}
    token = 1
    out = []

    for _ in range(q):
        op = lines[idx]
        if op == "ACQUIRE":
            t, key, client, ttl = int(lines[idx + 1]), lines[idx + 2], lines[idx + 3], int(lines[idx + 4])
            idx += 5
            if key not in locks or t >= locks[key]["expiry"] or not locks[key]["holder"]:
                locks[key] = {"holder": client, "expiry": t + ttl}
                out.append(f"GRANTED {token}")
                token += 1
            else:
                out.append("DENIED")
        else:
            t, key, client = int(lines[idx + 1]), lines[idx + 2], lines[idx + 3]
            idx += 4
            if key in locks and t < locks[key]["expiry"] and locks[key]["holder"] == client:
                locks[key]["holder"] = ""
                out.append("RELEASED")
            else:
                out.append("FAIL")

    print('\\n'.join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 9. Quorum Replicated Datastore (R + W > N)
  {
    id: 'd14-ch-9',
    day: 14,
    title: 'Quorum Replicated Datastore (R + W > N)',
    difficulty: 'Medium',
    moduleTag: '15. Distributed Systems (HLD/LLD)',
    companies: ['Amazon DynamoDB', 'Apache Cassandra'],
    platforms: ['System Design Lab'],
    problemStatement:
      'Given N replica nodes, write quorum W, read quorum R, and a series of operations:\n`WRITE key val`: Write to W replicas with incrementing version timestamp.\n`READ key`: Read from R replicas and return the value with the highest version.\nVerify that when R + W > N, strong consistency is guaranteed.',
    inputFormat: 'First line: N W R Q (replicas, write quorum, read quorum, query count).\nNext Q lines: `WRITE key val` or `READ key`.',
    outputFormat: 'Output the recovered value for each `READ` query, or `NOT_FOUND`.',
    constraints: ['1 <= N <= 10', '1 <= W, R <= N', '1 <= Q <= 1000'],
    sampleInput: '5 3 3 3\nWRITE stock AAPL_150\nREAD stock\nWRITE stock AAPL_155\nREAD stock',
    sampleOutput: 'AAPL_150\nAAPL_155',
    kapilIntuition:
      'Mentorship By Kapil: For `WRITE`, write to the first W replicas with timestamp `v`. For `READ`, inspect the first R replicas, find the maximum version, and return that value. Because R + W > N, at least one node in the read quorum witnessed the latest write quorum.',
    timeComplexity: 'O(W + R) per operation',
    spaceComplexity: 'O(N * keys)',
    testCases: [
      { id: 'tc-1', input: '5 3 3 4\nWRITE stock AAPL_150\nREAD stock\nWRITE stock AAPL_155\nREAD stock', expectedOutput: 'AAPL_150\nAAPL_155', isHidden: false, explanation: 'Quorum read always returns the latest write version.' },
      { id: 'tc-2', input: '3 2 2 1\nREAD absent', expectedOutput: 'NOT_FOUND', isHidden: false, explanation: 'Key not found.' },
      { id: 'tc-3', input: '3 2 2 2\nWRITE item 100\nREAD item', expectedOutput: '100', isHidden: true, explanation: 'N=3, W=2, R=2.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, W, R, Q;
    if (scanf("%d %d %d %d", &N, &W, &R, &Q) != 4) return 0;
    // Implement Quorum System
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int N, W, R, Q;
    if (!(cin >> N >> W >> R >> Q)) return 0;
    // Implement Quorum System
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int W = sc.nextInt();
        int R = sc.nextInt();
        int Q = sc.nextInt();
        // Implement Quorum System
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, w, r, q = int(lines[0]), int(lines[1]), int(lines[2]), int(lines[3])
    # Implement Quorum System

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

typedef struct {
    char val[32];
    int version;
} Cell;

Cell cluster[10][1000];
char keys[1000][32];
int numKeys = 0;
int globalVer = 1;

int getKeyIdx(const char* k) {
    for (int i = 0; i < numKeys; i++) {
        if (strcmp(keys[i], k) == 0) return i;
    }
    strcpy(keys[numKeys], k);
    return numKeys++;
}

int main() {
    int N, W, R, Q;
    if (scanf("%d %d %d %d", &N, &W, &R, &Q) != 4) return 0;

    while (Q--) {
        char op[16];
        scanf("%15s", op);
        if (strcmp(op, "WRITE") == 0) {
            char k[32], v[32];
            scanf("%31s %31s", k, v);
            int kIdx = getKeyIdx(k);
            int vNum = globalVer++;
            for (int i = 0; i < W; i++) {
                strcpy(cluster[i][kIdx].val, v);
                cluster[i][kIdx].version = vNum;
            }
        } else {
            char k[32];
            scanf("%31s", k);
            int kIdx = -1;
            for (int i = 0; i < numKeys; i++) {
                if (strcmp(keys[i], k) == 0) { kIdx = i; break; }
            }
            if (kIdx == -1) {
                printf("NOT_FOUND\\n");
            } else {
                int maxV = 0, bestNode = -1;
                for (int i = 0; i < R; i++) {
                    if (cluster[i][kIdx].version > maxV) {
                        maxV = cluster[i][kIdx].version;
                        bestNode = i;
                    }
                }
                if (maxV == 0) printf("NOT_FOUND\\n");
                else printf("%s\\n", cluster[bestNode][kIdx].val);
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>

using namespace std;

struct Record {
    string val;
    int version = 0;
};

int main() {
    int N, W, R, Q;
    if (!(cin >> N >> W >> R >> Q)) return 0;

    vector<unordered_map<string, Record>> cluster(N);
    int currentVer = 1;

    while (Q--) {
        string op; cin >> op;
        if (op == "WRITE") {
            string k, v; cin >> k >> v;
            int vNum = currentVer++;
            for (int i = 0; i < W; ++i) {
                cluster[i][k] = {v, vNum};
            }
        } else {
            string k; cin >> k;
            int bestVer = 0;
            string bestVal = "NOT_FOUND";
            for (int i = 0; i < R; ++i) {
                if (cluster[i].count(k) && cluster[i][k].version > bestVer) {
                    bestVer = cluster[i][k].version;
                    bestVal = cluster[i][k].val;
                }
            }
            cout << bestVal << "\n";
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    static class Record {
        String val;
        int version;
        Record(String v, int ver) { val = v; version = ver; }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int N = sc.nextInt();
        int W = sc.nextInt();
        int R = sc.nextInt();
        int Q = sc.nextInt();

        List<Map<String, Record>> cluster = new ArrayList<>();
        for (int i = 0; i < N; i++) cluster.add(new HashMap<>());
        int currentVer = 1;
        StringBuilder sb = new StringBuilder();

        while (Q-- > 0) {
            String op = sc.next();
            if (op.equals("WRITE")) {
                String k = sc.next();
                String v = sc.next();
                int ver = currentVer++;
                for (int i = 0; i < W; i++) {
                    cluster.get(i).put(k, new Record(v, ver));
                }
            } else {
                String k = sc.next();
                int maxVer = 0;
                String bestVal = "NOT_FOUND";
                for (int i = 0; i < R; i++) {
                    if (cluster.get(i).containsKey(k)) {
                        Record rec = cluster.get(i).get(k);
                        if (rec.version > maxVer) {
                            maxVer = rec.version;
                            bestVal = rec.val;
                        }
                    }
                }
                sb.append(bestVal).append("\n");
            }
        }
        System.out.print(sb);
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    n, w, r, q = int(lines[0]), int(lines[1]), int(lines[2]), int(lines[3])
    idx = 4

    cluster = [{} for _ in range(n)]
    current_ver = 1
    out = []

    for _ in range(q):
        op = lines[idx]
        if op == "WRITE":
            k, v = lines[idx + 1], lines[idx + 2]
            idx += 3
            v_num = current_ver
            current_ver += 1
            for i in range(w):
                cluster[i][k] = (v, v_num)
        else:
            k = lines[idx + 1]
            idx += 2
            best_ver = 0
            best_val = "NOT_FOUND"
            for i in range(r):
                if k in cluster[i]:
                    val, ver = cluster[i][k]
                    if ver > best_ver:
                        best_ver = ver
                        best_val = val
            out.append(best_val)

    print('\\n'.join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 10. Sliding Window Log Rate Limiter
  {
    id: 'd14-ch-10',
    day: 14,
    title: 'Sliding Window Log Rate Limiter',
    difficulty: 'Medium',
    moduleTag: '15. Distributed Systems (HLD/LLD)',
    companies: ['Twitter', 'Discord', 'Stripe'],
    platforms: ['System Design Lab'],
    problemStatement:
      'Implement a precise Sliding Window Log Rate Limiter that allows at most `limit` requests within a rolling window of `windowSize` seconds. Evict expired request timestamps (`t_prev <= t_curr - windowSize`), and return `200` if the request is permitted, or `429` if rejected.',
    inputFormat: 'First line: limit windowSize Q.\nNext line: Q non-decreasing integer timestamps.',
    outputFormat: 'Q lines of `200` or `429`.',
    constraints: ['1 <= limit <= 1000', '1 <= windowSize <= 3600', '1 <= Q <= 2000'],
    sampleInput: '3 10 5\n1 2 3 5 12',
    sampleOutput: '200\n200\n200\n429\n200',
    kapilIntuition:
      'Mentorship By Kapil: Maintain timestamps in a FIFO queue or deque. When request arrives at `t`, pop all elements from the front where `timestamp <= t - windowSize`. If queue size < limit, append `t` and return 200; else return 429.',
    timeComplexity: 'O(1) amortized per request',
    spaceComplexity: 'O(limit)',
    testCases: [
      { id: 'tc-1', input: '3 10 5\n1 2 3 5 12', expectedOutput: '200\n200\n200\n429\n200', isHidden: false, explanation: 'At t=5, window [0, 5] has 3 requests already (429). At t=12, req at t=1 expired (12 - 10 = 2), so allowed.' },
      { id: 'tc-2', input: '1 5 3\n0 2 6', expectedOutput: '200\n429\n200', isHidden: false, explanation: 't=2 rejected, t=6 allowed after t=0 expires.' },
      { id: 'tc-3', input: '2 1 2\n0 0', expectedOutput: '200\n200', isHidden: true, explanation: 'Both allowed within limit.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int limit, window, Q;
    if (scanf("%d %d %d", &limit, &window, &Q) != 3) return 0;
    // Implement Sliding Window Log
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int limit, window, Q;
    if (!(cin >> limit >> window >> Q)) return 0;
    // Implement Sliding Window Log
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int limit = sc.nextInt();
        int window = sc.nextInt();
        int Q = sc.nextInt();
        // Implement Sliding Window Log
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    limit, window, q = int(lines[0]), int(lines[1]), int(lines[2])
    # Implement Sliding Window Log

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>

int queue[5005];
int head = 0, tail = 0;

int main() {
    int limit, window, Q;
    if (scanf("%d %d %d", &limit, &window, &Q) != 3) return 0;

    while (Q--) {
        int t;
        scanf("%d", &t);
        while (head < tail && queue[head] <= t - window) {
            head++;
        }
        if (tail - head < limit) {
            queue[tail++] = t;
            printf("200\\n");
        } else {
            printf("429\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <queue>

using namespace std;

int main() {
    int limit, window, Q;
    if (!(cin >> limit >> window >> Q)) return 0;
    queue<int> q;

    while (Q--) {
        int t; cin >> t;
        while (!q.empty() && q.front() <= t - window) q.pop();
        if ((int)q.size() < limit) {
            q.push(t);
            cout << "200\n";
        } else {
            cout << "429\n";
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int limit = sc.nextInt();
        int window = sc.nextInt();
        int Q = sc.nextInt();

        Queue<Integer> q = new ArrayDeque<>();
        StringBuilder sb = new StringBuilder();

        while (Q-- > 0) {
            int t = sc.nextInt();
            while (!q.isEmpty() && q.peek() <= t - window) q.poll();
            if (q.size() < limit) {
                q.add(t);
                sb.append("200\n");
            } else {
                sb.append("429\n");
            }
        }
        System.out.print(sb);
    }
}`,
      python: `import sys
import collections

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    limit, window, q = int(lines[0]), int(lines[1]), int(lines[2])
    timestamps = [int(x) for x in lines[3:3 + q]]

    dq = collections.deque()
    out = []

    for t in timestamps:
        while dq and dq[0] <= t - window:
            dq.popleft()
        if len(dq) < limit:
            dq.append(t)
            out.append("200")
        else:
            out.append("429")

    print('\\n'.join(out))

if __name__ == '__main__':
    main()`
    }
  }
];

const fileContent = `import { PracticalChallenge } from '../types';

/**
 * Placement Readiness Program
 * Mentor: Kapil | Day 14: Scalable Distributed Systems & Low-Level/High-Level Architecture (HLD/LLD)
 * 10 Production-Grade Coding Challenges (C, C++, Java, Python)
 */
export const DAY_14_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = ${JSON.stringify(challenges, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/day14Challenges10.ts'), fileContent, 'utf8');
console.log('Successfully wrote src/data/day14Challenges10.ts');
