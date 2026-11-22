const fs = require('fs');
const path = require('path');

const notes = [
  {
    id: 'd14-note-1',
    title: 'Consistent Hashing with Virtual Nodes: Zero-Downtime Distributed Sharding',
    conceptSummary:
      'In traditional modulo hashing (`hash(key) % N`), adding or removing a single server invalidates nearly all key mappings (N/(N+1) keys must be moved), triggering massive database cache stampedes. Consistent Hashing maps both servers and keys to a continuous circular keyspace (hash ring from 0 to 2^32 - 1). A key is assigned to the first server encountered moving clockwise. When server S is removed, only keys residing between S and its predecessor need migration (1/N of the total keys). To prevent "hotspotting" and non-uniform data skew, each physical server is replicated into V "Virtual Nodes" distributed evenly across the ring, guaranteeing statistically balanced load distribution.',
    timeSpaceNote: 'Time Complexity: O(log(N * V)) binary search lookup on ring. Space Complexity: O(N * V) ring entries.',
    kapilMentorTip:
      'Kapil System Design Axiom: Whenever an interviewer asks how Cassandra, DynamoDB, Akamai, or Discord scale storage and gateway connections, Consistent Hashing with Virtual Nodes is the foundational answer. Mention that virtual nodes solve non-uniformity: with V = 100 to 200 virtual replicas per physical machine, data standard deviation drops below 5%.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_VNODES 1000

typedef struct {
    unsigned int hash;
    char serverId[32];
} VNode;

VNode ring[MAX_VNODES];
int ringSize = 0;

unsigned int hashMurmur(const char* key) {
    unsigned int h = 0x811c9dc5;
    while (*key) {
        h ^= (unsigned char)(*key++);
        h *= 0x01000193;
    }
    return h;
}

int cmpVNode(const void* a, const void* b) {
    unsigned int hA = ((VNode*)a)->hash;
    unsigned int hB = ((VNode*)b)->hash;
    return (hA > hB) - (hA < hB);
}

void addServer(const char* serverId, int replicas) {
    char buf[64];
    for (int r = 0; r < replicas; r++) {
        sprintf(buf, "%s#%d", serverId, r);
        ring[ringSize].hash = hashMurmur(buf);
        strcpy(ring[ringSize].serverId, serverId);
        ringSize++;
    }
    qsort(ring, ringSize, sizeof(VNode), cmpVNode);
}

const char* getServer(const char* key) {
    if (ringSize == 0) return NULL;
    unsigned int h = hashMurmur(key);
    int low = 0, high = ringSize - 1, idx = 0;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (ring[mid].hash >= h) {
            idx = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ring[idx].serverId;
}

int main(void) {
    addServer("Server-US-East", 3);
    addServer("Server-EU-West", 3);
    addServer("Server-AP-South", 3);

    printf("Key 'user_101' routed to: %s\\n", getServer("user_101"));
    printf("Key 'order_9876' routed to: %s\\n", getServer("order_9876"));
    printf("Key 'payment_token' routed to: %s\\n", getServer("payment_token"));
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <map>
#include <functional>

using namespace std;

class ConsistentHashRing {
    int replicas;
    map<size_t, string> ring; // sorted by hash
    hash<string> hasher;
public:
    ConsistentHashRing(int replicas = 100) : replicas(replicas) {}

    void addServer(const string& server) {
        for (int i = 0; i < replicas; ++i) {
            size_t h = hasher(server + "#" + to_string(i));
            ring[h] = server;
        }
    }

    void removeServer(const string& server) {
        for (int i = 0; i < replicas; ++i) {
            size_t h = hasher(server + "#" + to_string(i));
            ring.erase(h);
        }
    }

    string getServer(const string& key) {
        if (ring.empty()) return "";
        size_t h = hasher(key);
        auto it = ring.lower_bound(h);
        if (it == ring.end()) it = ring.begin(); // wrap around circle
        return it->second;
    }
};

int main() {
    ConsistentHashRing cluster(50);
    cluster.addServer("Node-US-East");
    cluster.addServer("Node-EU-Central");
    cluster.addServer("Node-AP-South");

    cout << "user_101 -> " << cluster.getServer("user_101") << endl;
    cout << "order_9876 -> " << cluster.getServer("order_9876") << endl;
    cout << "session_jwt -> " << cluster.getServer("session_jwt") << endl;
    return 0;
}`,
      java: `import java.util.*;

public class ConsistentHashRing {
    private final int replicas;
    private final NavigableMap<Integer, String> ring = new TreeMap<>();

    public ConsistentHashRing(int replicas) {
        this.replicas = replicas;
    }

    private int hash(String key) {
        return key.hashCode() & 0x7fffffff;
    }

    public void addServer(String server) {
        for (int i = 0; i < replicas; i++) {
            ring.put(hash(server + "#" + i), server);
        }
    }

    public void removeServer(String server) {
        for (int i = 0; i < replicas; i++) {
            ring.remove(hash(server + "#" + i));
        }
    }

    public String getServer(String key) {
        if (ring.isEmpty()) return null;
        int h = hash(key);
        Integer targetHash = ring.ceilingKey(h);
        if (targetHash == null) targetHash = ring.firstKey(); // circle wrap
        return ring.get(targetHash);
    }

    public static void main(String[] args) {
        ConsistentHashRing cluster = new ConsistentHashRing(50);
        cluster.addServer("Server-A");
        cluster.addServer("Server-B");
        cluster.addServer("Server-C");

        System.out.println("key_1 -> " + cluster.getServer("key_1"));
        System.out.println("key_2 -> " + cluster.getServer("key_2"));
        System.out.println("key_3 -> " + cluster.getServer("key_3"));
    }
}`,
      python: `import bisect
import hashlib

class ConsistentHashRing:
    def __init__(self, replicas=100):
        self.replicas = replicas
        self.ring = []
        self.vnode_map = {}

    def _hash(self, key: str) -> int:
        return int(hashlib.md5(key.encode('utf-8')).hexdigest(), 16) & 0xFFFFFFFF

    def add_server(self, server: str):
        for i in range(self.replicas):
            h = self._hash(f"{server}#{i}")
            bisect.insort(self.ring, h)
            self.vnode_map[h] = server

    def get_server(self, key: str) -> str:
        if not self.ring:
            return ""
        h = self._hash(key)
        idx = bisect.bisect_right(self.ring, h)
        if idx == len(self.ring):
            idx = 0
        return self.vnode_map[self.ring[idx]]

if __name__ == "__main__":
    cluster = ConsistentHashRing(50)
    cluster.add_server("Server-US-East")
    cluster.add_server("Server-EU-West")
    cluster.add_server("Server-AP-South")
    print("user_101 ->", cluster.get_server("user_101"))
    print("order_9876 ->", cluster.get_server("order_9876"))`,
    },
  },
  {
    id: 'd14-note-2',
    title: 'Distributed Rate Limiting: Token Bucket & Sliding Window Counter',
    conceptSummary:
      'Rate limiters defend distributed APIs against DDoS, credential stuffing, and noisy neighbors. In the Token Bucket algorithm, a bucket has capacity B and refills with tokens at constant rate R tokens/sec. Each request consumes 1 token. If the bucket is non-empty, the request is allowed; otherwise, HTTP 429 Too Many Requests is returned. Token Bucket naturally accommodates bursts up to capacity B. In distributed deployments, storing timestamps in Redis and computing tokens dynamically via `current_tokens = min(B, prev_tokens + (now - last_refill) * R)` avoids expensive background timer threads while atomic Lua scripts prevent race conditions.',
    timeSpaceNote: 'Time Complexity: O(1) per request evaluation. Space Complexity: O(1) storage per API key / IP.',
    kapilMentorTip:
      'Kapil Invariant Insight: Never run a cron job or background thread to refill tokens for millions of users! Compute tokens lazily on demand upon every incoming request by checking elapsed time since `lastRefillTime`. Use atomic Redis transactions (`MULTI/EXEC`) or Lua scripts (`EVAL`) to eliminate Time-Of-Check to Time-Of-Use (TOCTOU) race conditions.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>
#include <time.h>

typedef struct {
    double capacity;
    double refillRate; // tokens per second
    double tokens;
    long long lastRefillTime; // Unix timestamp in seconds
} TokenBucket;

void initBucket(TokenBucket* tb, double capacity, double rate) {
    tb->capacity = capacity;
    tb->refillRate = rate;
    tb->tokens = capacity;
    tb->lastRefillTime = time(NULL);
}

bool allowRequest(TokenBucket* tb, double tokensRequested) {
    long long now = time(NULL);
    double elapsed = (double)(now - tb->lastRefillTime);
    tb->tokens += elapsed * tb->refillRate;
    if (tb->tokens > tb->capacity) tb->tokens = tb->capacity;
    tb->lastRefillTime = now;

    if (tb->tokens >= tokensRequested) {
        tb->tokens -= tokensRequested;
        return true;
    }
    return false; // Rate limit exceeded (HTTP 429)
}

int main(void) {
    TokenBucket limiter;
    initBucket(&limiter, 5.0, 1.0); // Capacity 5, refills 1 token/sec

    for (int i = 1; i <= 7; i++) {
        bool allowed = allowRequest(&limiter, 1.0);
        printf("Request %d: %s (Remaining Tokens: %.1f)\\n", i, allowed ? "ALLOWED (200 OK)" : "REJECTED (429 Rate Limited)", limiter.tokens);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <chrono>
#include <algorithm>

using namespace std;

class TokenBucketRateLimiter {
    double capacity;
    double refillRate; // tokens / sec
    double tokens;
    chrono::steady_clock::time_point lastRefillTime;
public:
    TokenBucketRateLimiter(double capacity, double refillRate)
        : capacity(capacity), refillRate(refillRate), tokens(capacity),
          lastRefillTime(chrono::steady_clock::now()) {}

    bool allowRequest(double cost = 1.0) {
        auto now = chrono::steady_clock::now();
        chrono::duration<double> elapsed = now - lastRefillTime;
        lastRefillTime = now;

        tokens = min(capacity, tokens + elapsed.count() * refillRate);

        if (tokens >= cost) {
            tokens -= cost;
            return true;
        }
        return false;
    }
};

int main() {
    TokenBucketRateLimiter limiter(3, 1); // 3 tokens, 1 refill/sec
    for (int i = 1; i <= 5; ++i) {
        cout << "Request " << i << ": " << (limiter.allowRequest() ? "200 OK" : "429 RATE LIMITED") << endl;
    }
    return 0;
}`,
      java: `public class TokenBucketRateLimiter {
    private final double capacity;
    private final double refillRate; // tokens per second
    private double tokens;
    private long lastRefillTimestampNanos;

    public TokenBucketRateLimiter(double capacity, double refillRate) {
        this.capacity = capacity;
        this.refillRate = refillRate;
        this.tokens = capacity;
        this.lastRefillTimestampNanos = System.nanoTime();
    }

    public synchronized boolean allowRequest(double cost) {
        long now = System.nanoTime();
        double elapsedSeconds = (now - lastRefillTimestampNanos) / 1_000_000_000.0;
        lastRefillTimestampNanos = now;

        tokens = Math.min(capacity, tokens + elapsedSeconds * refillRate);

        if (tokens >= cost) {
            tokens -= cost;
            return true;
        }
        return false;
    }

    public static void main(String[] args) {
        TokenBucketRateLimiter limiter = new TokenBucketRateLimiter(3.0, 1.0);
        for (int i = 1; i <= 5; i++) {
            System.out.println("Req " + i + ": " + (limiter.allowRequest(1.0) ? "ALLOW" : "REJECT (429)"));
        }
    }
}`,
      python: `import time

class TokenBucketRateLimiter:
    def __init__(self, capacity: float, refill_rate: float):
        self.capacity = capacity
        self.refill_rate = refill_rate
        self.tokens = capacity
        self.last_refill = time.time()

    def allow_request(self, cost: float = 1.0) -> bool:
        now = time.time()
        elapsed = now - self.last_refill
        self.last_refill = now

        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)

        if self.tokens >= cost:
            self.tokens -= cost
            return True
        return False

if __name__ == "__main__":
    limiter = TokenBucketRateLimiter(3, 1)
    for i in range(1, 6):
        print(f"Request {i}: {'ALLOWED' if limiter.allow_request() else 'REJECTED (429)'}")`,
    },
  },
  {
    id: 'd14-note-3',
    title: 'Write-Ahead Logging (WAL) & LSM-Trees: High-Throughput Append-Only Durability',
    conceptSummary:
      'Traditional B-Trees perform random disk I/O to update database pages in-place, creating catastrophic disk write bottlenecks under heavy write traffic. Log-Structured Merge (LSM) Trees (the storage architecture powering RocksDB, Cassandra, Google Bigtable, and ScyllaDB) eliminate random writes entirely by enforcing strictly sequential append-only writes. Every write operation is: (1) Appended to a durable Write-Ahead Log (WAL) on disk for crash recovery, (2) Inserted into an in-memory sorted MemTable (SkipList/Red-Black Tree). Once MemTable reaches capacity (e.g. 64 MB), it is flushed sequentially to disk as an immutable SSTable (Sorted String Table). Background compaction merges SSTables to reclaim space and prune obsolete tombstones.',
    timeSpaceNote: 'Time Complexity: O(1) amortized write to WAL and MemTable. Space Complexity: O(Data) sequential disk layout.',
    kapilMentorTip:
      'Kapil Storage Engine Rule: Disk sequential writes are 100x to 1000x faster than random writes, even on modern NVMe SSDs! LSM Trees convert random writes into sequential appends. When an interviewer asks how a storage system handles 1,000,000 writes/second, explain: Write to append-only WAL on SSD + insert into in-memory MemTable, then flush as immutable SSTables with background leveled compaction.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_MEMTABLE 100

typedef struct {
    char key[32];
    char val[64];
} Entry;

Entry memTable[MAX_MEMTABLE];
int memTableCount = 0;

void appendWAL(const char* key, const char* val) {
    FILE* f = fopen("wal.log", "a");
    if (f) {
        fprintf(f, "PUT %s %s\\n", key, val);
        fflush(f);
        fclose(f);
    }
}

void put(const char* key, const char* val) {
    appendWAL(key, val); // 1. Append to durable WAL
    strcpy(memTable[memTableCount].key, key); // 2. Insert into in-memory MemTable
    strcpy(memTable[memTableCount].val, val);
    memTableCount++;
}

int main(void) {
    put("user:101", "Alice");
    put("user:102", "Bob");
    printf("Successfully wrote %d records sequentially to WAL and MemTable.\\n", memTableCount);
    remove("wal.log"); // Cleanup
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <map>
#include <fstream>

using namespace std;

class MiniLsmEngine {
    map<string, string> memTable;
    string walPath;
public:
    MiniLsmEngine(const string& walPath = "wal_cpp.log") : walPath(walPath) {}

    void put(const string& key, const string& val) {
        ofstream wal(walPath, ios::app);
        wal << key << "=" << val << "\\n"; // Sequential append
        wal.flush();
        memTable[key] = val; // In-memory sorted skip list / map
    }

    string get(const string& key) {
        if (memTable.count(key)) return memTable[key];
        return "NOT_FOUND";
    }
};

int main() {
    MiniLsmEngine db;
    db.put("stock:AAPL", "180.50");
    db.put("stock:GOOG", "175.20");
    cout << "AAPL price: " << db.get("stock:AAPL") << endl;
    return 0;
}`,
      java: `import java.util.*;

public class MiniLsmEngine {
    private final Map<String, String> memTable = new TreeMap<>();

    public void put(String key, String value) {
        // Step 1: Write to append-only WAL
        System.out.println("  [WAL-APPEND] " + key + " -> " + value);
        // Step 2: Insert into in-memory MemTable
        memTable.put(key, value);
    }

    public String get(String key) {
        return memTable.getOrDefault(key, "NOT_FOUND");
    }

    public static void main(String[] args) {
        MiniLsmEngine lsm = new MiniLsmEngine();
        lsm.put("order:401", "PAID");
        lsm.put("order:402", "PENDING");
        System.out.println("Order 401 status: " + lsm.get("order:401"));
    }
}`,
      python: `class MiniLsmEngine:
    def __init__(self):
        self.memtable = {}

    def put(self, key: str, val: str):
        # Step 1: Append to WAL log
        print(f"  [WAL-APPEND] {key} = {val}")
        # Step 2: Store in in-memory dict
        self.memtable[key] = val

    def get(self, key: str) -> str:
        return self.memtable.get(key, "NOT_FOUND")

if __name__ == "__main__":
    db = MiniLsmEngine()
    db.put("user:alice", "session_active")
    print("Fetched:", db.get("user:alice"))`,
    },
  },
  {
    id: 'd14-note-4',
    title: 'Distributed Caching Patterns: Cache-Aside, Write-Through & Stampede Defense',
    conceptSummary:
      'Distributed Caches (Redis, Memcached) shield core databases from query saturation. The primary patterns are: (1) Cache-Aside (Lazy Loading): The application inspects the cache; on cache miss, reads from DB and populates cache; (2) Write-Through: The app writes to cache, which synchronously writes to DB; (3) Write-Behind (Write-Back): The app writes to cache, and writes are asynchronously drained to DB in batches. A major risk is the Cache Stampede (Thundering Herd): when a popular cache key expires, thousands of concurrent requests miss simultaneously and hit the database, causing DB collapse. Defenses include: Distributed Mutex Locks (only 1 thread regenerates cache), Probabilistic Early Expiration (XFetch), and stale cache serving while background refresh occurs.',
    timeSpaceNote: 'Time Complexity: O(1) cache lookup vs O(10-100ms) database query.',
    kapilMentorTip:
      'Kapil Invalidation Rule: "There are only two hard things in Computer Science: cache invalidation and naming things." In high-concurrency interviews, always declare: (1) TTL on all keys to prevent stale zombie data, (2) Cache-Aside with Redis Distributed Locks to prevent thundering herds on hot keys.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

typedef struct {
    char key[32];
    char val[64];
    bool valid;
} CacheSlot;

CacheSlot cache[10];

const char* queryCacheAside(const char* key) {
    // 1. Check cache
    for (int i = 0; i < 10; i++) {
        if (cache[i].valid && strcmp(cache[i].key, key) == 0) {
            printf("  [CACHE HIT] Found '%s' in memory: %s\\n", key, cache[i].val);
            return cache[i].val;
        }
    }
    // 2. Cache Miss: Read from DB
    printf("  [CACHE MISS] Querying Database for '%s'...\\n", key);
    const char* dbResult = "DB_RECORD_VALUE_42";

    // 3. Populate Cache
    for (int i = 0; i < 10; i++) {
        if (!cache[i].valid) {
            strcpy(cache[i].key, key);
            strcpy(cache[i].val, dbResult);
            cache[i].valid = true;
            break;
        }
    }
    return dbResult;
}

int main(void) {
    for (int i = 0; i < 10; i++) cache[i].valid = false;
    queryCacheAside("user_profile_1"); // Miss -> Queries DB and populates cache
    queryCacheAside("user_profile_1"); // Hit -> Returns from memory
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

class CacheAsideService {
    unordered_map<string, string> cache;
    unordered_map<string, string> database;
public:
    CacheAsideService() {
        database["user:1"] = "{name: 'Alice', tier: 'Gold'}";
    }

    string getUser(const string& userId) {
        if (cache.count(userId)) {
            cout << "[CACHE HIT] " << userId << endl;
            return cache[userId];
        }
        cout << "[CACHE MISS] Fetching from DB: " << userId << endl;
        string data = database.count(userId) ? database[userId] : "NULL";
        if (data != "NULL") cache[userId] = data; // Populate cache
        return data;
    }
};

int main() {
    CacheAsideService service;
    service.getUser("user:1");
    service.getUser("user:1");
    return 0;
}`,
      java: `import java.util.*;

public class CacheAsidePattern {
    private final Map<String, String> cache = new HashMap<>();
    private final Map<String, String> db = new HashMap<>();

    public CacheAsidePattern() {
        db.put("sku:99", "Sony Headphones - $299");
    }

    public String getProduct(String sku) {
        if (cache.containsKey(sku)) {
            System.out.println("[CACHE HIT] " + sku);
            return cache.get(sku);
        }
        System.out.println("[CACHE MISS] Querying DB for " + sku);
        String val = db.getOrDefault(sku, "NOT_FOUND");
        if (!val.equals("NOT_FOUND")) {
            cache.put(sku, val);
        }
        return val;
    }

    public static void main(String[] args) {
        CacheAsidePattern cap = new CacheAsidePattern();
        cap.getProduct("sku:99");
        cap.getProduct("sku:99");
    }
}`,
      python: `class CacheAsideManager:
    def __init__(self):
        self.cache = {}
        self.db = {"user_42": "Alice"}

    def get_user(self, uid: str) -> str:
        if uid in self.cache:
            print(f"[CACHE HIT] {uid}")
            return self.cache[uid]
        print(f"[CACHE MISS] Reading DB: {uid}")
        val = self.db.get(uid, "NOT_FOUND")
        if val != "NOT_FOUND":
            self.cache[uid] = val
        return val

if __name__ == "__main__":
    mgr = CacheAsideManager()
    mgr.get_user("user_42")
    mgr.get_user("user_42")`,
    },
  },
  {
    id: 'd14-note-5',
    title: 'Distributed Consensus & Quorum Protocols: Raft, Paxos & R + W > N',
    conceptSummary:
      'Distributed systems face network partitions, server crashes, and message reordering. The CAP Theorem proves that a distributed data store can guarantee at most two of: Consistency, Availability, and Partition Tolerance. Consensus algorithms (Raft, Paxos) ensure that a cluster of distributed nodes agree on a series of state machine transitions even if a minority of nodes crash ($f < N/2$). In leaderless quorum systems (Dynamo, Cassandra), consistency is governed by the Quorum Inequality: $R + W > N$, where N is replication factor, W is write quorum, and R is read quorum. Because the read set and write set must overlap by at least one node, read repair and version vectors guarantee that the client always observes the most recent write.',
    timeSpaceNote: 'Time Complexity: O(Round-trip network latency) per consensus round.',
    kapilMentorTip:
      'Kapil Invariant Formula: Always cite $R + W > N$! For example, with $N = 3$, setting $W = 2$ and $R = 2$ gives $R + W = 4 > 3$, guaranteeing Strong Consistency. If the user prioritizes high write availability (AP system), choose $W = 1$ and $R = 3$ or rely on eventual consistency with Read Repair.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>

#define CLUSTER_SIZE 5

typedef struct {
    int value;
    int version;
} Replica;

bool writeQuorum(Replica nodes[], int N, int W, int val, int ver) {
    int acks = 0;
    for (int i = 0; i < N; i++) {
        nodes[i].value = val;
        nodes[i].version = ver;
        acks++;
        if (acks >= W) return true;
    }
    return false;
}

int readQuorum(Replica nodes[], int N, int R) {
    int highestVer = -1, latestVal = -1;
    for (int i = 0; i < R; i++) {
        if (nodes[i].version > highestVer) {
            highestVer = nodes[i].version;
            latestVal = nodes[i].value;
        }
    }
    return latestVal;
}

int main(void) {
    Replica cluster[CLUSTER_SIZE] = {0};
    int N = 5, W = 3, R = 3; // R + W = 6 > 5 (Strong Consistency)

    writeQuorum(cluster, N, W, 42, 1);
    printf("Read Quorum returned latest consistent value: %d (R+W=%d > N=%d)\\n", readQuorum(cluster, N, R), R + W, N);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct NodeRecord {
    int val = 0;
    int version = 0;
};

class QuorumDatastore {
    int n, w, r;
    vector<NodeRecord> cluster;
public:
    QuorumDatastore(int n = 5, int w = 3, int r = 3) : n(n), w(w), r(r), cluster(n) {}

    bool write(int val, int version) {
        int acks = 0;
        for (int i = 0; i < n; ++i) {
            cluster[i] = {val, version};
            if (++acks >= w) break;
        }
        return acks >= w;
    }

    int read() {
        int bestVal = -1, maxVer = -1;
        for (int i = 0; i < r; ++i) {
            if (cluster[i].version > maxVer) {
                maxVer = cluster[i].version;
                bestVal = cluster[i].val;
            }
        }
        return bestVal;
    }
};

int main() {
    QuorumDatastore q(5, 3, 3);
    q.write(100, 1);
    cout << "Quorum Read Result: " << q.read() << endl;
    return 0;
}`,
      java: `public class QuorumSystem {
    static class Record {
        int val;
        int version;
        Record(int v, int ver) { this.val = v; this.version = ver; }
    }

    public static void main(String[] args) {
        int N = 5, W = 3, R = 3;
        Record[] nodes = new Record[N];
        for (int i = 0; i < N; i++) nodes[i] = new Record(0, 0);

        // Write with Quorum W = 3
        for (int i = 0; i < W; i++) nodes[i] = new Record(999, 1);

        // Read with Quorum R = 3
        int maxVer = -1, result = -1;
        for (int i = 0; i < R; i++) {
            if (nodes[i].version > maxVer) {
                maxVer = nodes[i].version;
                result = nodes[i].val;
            }
        }
        System.out.println("Quorum Read (Java 21): " + result + " [R+W=" + (R+W) + " > N=" + N + "]");
    }
}`,
      python: `class QuorumSystem:
    def __init__(self, n=5, w=3, r=3):
        self.n, self.w, self.r = n, w, r
        self.nodes = [{"val": 0, "ver": 0} for _ in range(n)]

    def write(self, val: int, ver: int) -> bool:
        for i in range(self.w):
            self.nodes[i] = {"val": val, "ver": ver}
        return True

    def read(self) -> int:
        read_set = self.nodes[:self.r]
        latest = max(read_set, key=lambda x: x["ver"])
        return latest["val"]

if __name__ == "__main__":
    q = QuorumSystem(5, 3, 3)
    q.write(555, 1)
    print(f"Quorum Read (Python 3.12): {q.read()}")`,
    },
  },
];

const fileContent = `import { ProgrammingNote } from '../types';

/**
 * Day 14 High-Yield Polyglot Programming Notes (5 Placement Mastery Notes)
 * Module 15: Scalable Distributed Systems & Low-Level/High-Level Architecture (HLD/LLD)
 * Mentor: Kapil (Placement Readiness Program)
 * Full Polyglot Coverage: C (C17), C++ (C++20), Java (Java 21), Python (Python 3.12)
 */

export const DAY_14_PROGRAMMING_NOTES: ProgrammingNote[] = ${JSON.stringify(notes, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/day14ProgrammingNotes.ts'), fileContent, 'utf8');
console.log('Successfully wrote src/data/day14ProgrammingNotes.ts');
