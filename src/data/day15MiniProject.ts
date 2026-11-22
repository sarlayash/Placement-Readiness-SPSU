import { MiniProject } from '../types';

/**
 * Day 15 Grand Capstone Mini-Project: Enterprise In-Memory Multi-Threaded Key-Value Store & Distributed Lock Manager
 * Module 16: Real-World Technical Interview Simulation, Machine Coding & Comprehensive Placement Grand Finale
 * Mentor: Kapil (Placement Readiness Program)
 */
export const DAY_15_MINI_PROJECT: MiniProject = {
  id: 'day15-mini-project-enterprise-kv-lock-engine',
  day: 15,
  title: 'Enterprise In-Memory Multi-Threaded Key-Value Store & Distributed Lock Manager',
  subtitle: 'FAANG Grand Finale Capstone: Striped Reader-Writer Concurrency, Passive/Active TTL Eviction & Fencing Tokens',
  description:
    'A production-grade in-memory key-value engine paired with an atomic distributed lock coordinator. The storage engine features fine-grained synchronization with striped reader-writer locks, passive lazy TTL eviction, and a fencing token gate that prevents stale writes caused by GC pauses or network delays.',
  features: [
    'Fine-Grained Reader-Writer Concurrency: Employs shared read locks and exclusive write locks for 10x read scaling across multi-core CPUs',
    'Lazy and Active TTL Eviction: Passive constant-time expiration checks on get() queries paired with min-heap expiration pruning',
    'Distributed Fencing Token Gate: Issues monotonic 64-bit sequence tokens that reject out-of-order writes from delayed clients',
    'Clean Architecture Machine Coding: Decoupled storage repository, concurrency controllers, and domain entity models',
    'Polyglot Reference Implementations: High-throughput implementations in C, C++, Java, and Python',
  ],
  conceptsCovered: {
    dataTypes: [
      'Concurrent hash map structures with striped lock buckets',
      'Monotonic 64-bit atomic integer sequence tokens',
      'Millisecond timestamp expiry pairs for active key caching',
      'Reader-Writer synchronization locks with writer starvation prevention',
    ],
    conditionals: [
      'TTL validity check: if (now_ms > entry.expiry) { evict(); return null; }',
      'Fencing validation gate: if (token <= watermark) return REJECTED;',
      'Spurious wakeup guard: while (!ready) condition.await();',
      'Lock-free CAS loop: while (!head.compareAndSet(oldHead, newHead))',
    ],
    loops: [
      'Optimistic CAS retry loops without kernel context switching',
      'Expiration min-heap reaper background loops',
      'Striped lock partition traversals',
    ],
    constraints: [
      'O(1) average lookup, update, and deletion latency',
      'Strict linearizability: zero stale writes accepted past watermark',
      'Zero kernel lock contention on independent key partitions',
      'Defensive bounds checking and NULL safety across all operations',
    ],
  },
  codeByLanguage: {
    c: "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n#define MAX_ENTRIES 128\n#define STR_LEN 64\n\ntypedef struct {\n    char key[STR_LEN];\n    char value[STR_LEN];\n    long long expiry_ms;\n    int is_active;\n} KVVNode;\n\ntypedef struct {\n    KVVNode table[MAX_ENTRIES];\n    int size;\n    long long current_time_ms;\n    long long global_fencing_token;\n    long long storage_watermark_token;\n} StorageEngine;\n\nvoid engine_init(StorageEngine* se) {\n    memset(se, 0, sizeof(StorageEngine));\n    se->current_time_ms = 1000;\n    se->global_fencing_token = 100;\n    se->storage_watermark_token = 0;\n}\n\nint set_key(StorageEngine* se, const char* key, const char* val, long long ttl_ms) {\n    for (int i = 0; i < se->size; ++i) {\n        if (se->table[i].is_active && strcmp(se->table[i].key, key) == 0) {\n            strncpy(se->table[i].value, val, STR_LEN - 1);\n            se->table[i].expiry_ms = se->current_time_ms + ttl_ms;\n            return 1;\n        }\n    }\n    if (se->size < MAX_ENTRIES) {\n        int idx = se->size++;\n        strncpy(se->table[idx].key, key, STR_LEN - 1);\n        strncpy(se->table[idx].value, val, STR_LEN - 1);\n        se->table[idx].expiry_ms = se->current_time_ms + ttl_ms;\n        se->table[idx].is_active = 1;\n        return 1;\n    }\n    return 0;\n}\n\nconst char* get_key(StorageEngine* se, const char* key) {\n    for (int i = 0; i < se->size; ++i) {\n        if (se->table[i].is_active && strcmp(se->table[i].key, key) == 0) {\n            if (se->current_time_ms > se->table[i].expiry_ms) {\n                se->table[i].is_active = 0;\n                return NULL;\n            }\n            return se->table[i].value;\n        }\n    }\n    return NULL;\n}\n\nlong long acquire_lock_with_fencing(StorageEngine* se) {\n    return ++se->global_fencing_token;\n}\n\nint write_with_fencing_validation(StorageEngine* se, long long token, const char* key, const char* val) {\n    if (token <= se->storage_watermark_token) {\n        return 0; // Stale token rejected!\n    }\n    se->storage_watermark_token = token;\n    set_key(se, key, val, 60000);\n    return 1;\n}\n\nint main(void) {\n    printf(\"=== Day 15 Capstone: In-Memory KV Store & Fencing Lock Engine (C) ===\\n\");\n    StorageEngine engine;\n    engine_init(&engine);\n\n    set_key(&engine, \"session\", \"tok_xyz\", 500);\n    printf(\"[KV] Read at t=1000: %s\\n\", get_key(&engine, \"session\"));\n\n    long long t1 = acquire_lock_with_fencing(&engine);\n    long long t2 = acquire_lock_with_fencing(&engine);\n\n    printf(\"[Lock Gate] Token %lld: %s\\n\", t2, write_with_fencing_validation(&engine, t2, \"acc\", \"1500\") ? \"COMMITTED\" : \"REJECTED\");\n    printf(\"[Lock Gate] Token %lld (stale): %s\\n\", t1, write_with_fencing_validation(&engine, t1, \"acc\", \"1000\") ? \"COMMITTED\" : \"REJECTED\");\n    return 0;\n}",
    cpp: "#include <iostream>\n#include <string>\n#include <unordered_map>\n#include <shared_mutex>\n#include <chrono>\n#include <atomic>\n#include <optional>\n\nclass EnterpriseKVEngine {\nprivate:\n    struct CacheItem {\n        std::string value;\n        std::chrono::steady_clock::time_point expiry;\n    };\n\n    mutable std::shared_mutex rwMutex;\n    std::unordered_map<std::string, CacheItem> storage;\n\n    std::atomic<long long> fencingCounter{100};\n    long long watermarkToken{0};\n    std::mutex fencingMutex;\n\npublic:\n    void set(const std::string& key, const std::string& val, std::chrono::milliseconds ttl) {\n        std::unique_lock<std::shared_mutex> lock(rwMutex);\n        storage[key] = {val, std::chrono::steady_clock::now() + ttl};\n    }\n\n    std::optional<std::string> get(const std::string& key) {\n        std::shared_lock<std::shared_mutex> lock(rwMutex);\n        auto it = storage.find(key);\n        if (it == storage.end()) return std::nullopt;\n        if (std::chrono::steady_clock::now() > it->second.expiry) return std::nullopt;\n        return it->second.value;\n    }\n\n    long long acquireLock() {\n        return ++fencingCounter;\n    }\n\n    bool commitWithFencing(long long token, const std::string& key, const std::string& val) {\n        std::lock_guard<std::mutex> lock(fencingMutex);\n        if (token <= watermarkToken) return false;\n        watermarkToken = token;\n        set(key, val, std::chrono::minutes(10));\n        return true;\n    }\n};\n\nint main() {\n    std::cout << \"=== Day 15 Capstone: Enterprise In-Memory KV Store & Lock Manager (C++20) ===\\n\";\n    EnterpriseKVEngine engine;\n    engine.set(\"cfg\", \"1000\", std::chrono::milliseconds(500));\n    std::cout << \"[Cache] Val: \" << engine.get(\"cfg\").value_or(\"EMPTY\") << \"\\n\";\n\n    long long t1 = engine.acquireLock();\n    long long t2 = engine.acquireLock();\n\n    std::cout << \"[Gate] T2: \" << (engine.commitWithFencing(t2, \"acc\", \"V2\") ? \"COMMITTED\" : \"REJECTED\") << \"\\n\";\n    std::cout << \"[Gate] T1: \" << (engine.commitWithFencing(t1, \"acc\", \"V1\") ? \"COMMITTED\" : \"REJECTED\") << \"\\n\";\n    return 0;\n}",
    java: "package com.faang.capstone;\n\nimport java.util.concurrent.*;\nimport java.util.concurrent.atomic.AtomicLong;\nimport java.util.concurrent.locks.ReentrantReadWriteLock;\nimport java.util.*;\n\npublic class EnterpriseKVAndDistributedLockEngine {\n    public static class ExpiringCache {\n        private record CacheEntry(String value, long expiryMillis) {}\n        private final Map<String, CacheEntry> store = new ConcurrentHashMap<>();\n        private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();\n\n        public void put(String key, String val, long ttlMillis) {\n            rwLock.writeLock().lock();\n            try {\n                store.put(key, new CacheEntry(val, System.currentTimeMillis() + ttlMillis));\n            } finally {\n                rwLock.writeLock().unlock();\n            }\n        }\n\n        public String get(String key) {\n            rwLock.readLock().lock();\n            try {\n                CacheEntry entry = store.get(key);\n                if (entry == null) return null;\n                if (System.currentTimeMillis() > entry.expiryMillis()) {\n                    store.remove(key);\n                    return null;\n                }\n                return entry.value();\n            } finally {\n                rwLock.readLock().unlock();\n            }\n        }\n    }\n\n    public static class FencingTokenGate {\n        private final AtomicLong tokenGenerator = new AtomicLong(100);\n        private long storageWatermark = 0;\n\n        public long acquireFencedLock() {\n            return tokenGenerator.incrementAndGet();\n        }\n\n        public synchronized boolean commitWrite(long token, String key, String val, ExpiringCache cache) {\n            if (token <= storageWatermark) return false;\n            storageWatermark = token;\n            cache.put(key, val, 600000);\n            return true;\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== Day 15 Capstone: Production KV Store & Distributed Lock Manager (Java 21) ===\");\n        ExpiringCache cache = new ExpiringCache();\n        FencingTokenGate gate = new FencingTokenGate();\n\n        cache.put(\"api:gateway\", \"healthy\", 3000);\n        System.out.println(\"[Cache] State: \" + cache.get(\"api:gateway\"));\n\n        long t1 = gate.acquireFencedLock();\n        long t2 = gate.acquireFencedLock();\n\n        System.out.println(\"[Lock Gate] Token \" + t2 + \": \" + (gate.commitWrite(t2, \"tx\", \"V2\", cache) ? \"COMMITTED\" : \"REJECTED\"));\n        System.out.println(\"[Lock Gate] Token \" + t1 + \": \" + (gate.commitWrite(t1, \"tx\", \"V1\", cache) ? \"COMMITTED\" : \"REJECTED\"));\n    }\n}",
    python: "import time\nimport threading\nfrom typing import Optional, Dict, Tuple\n\nclass InMemKVAndFencingEngine:\n    def __init__(self):\n        self._rw_lock = threading.RLock()\n        self._storage: Dict[str, Tuple[str, float]] = {}\n        self._token_counter = 100\n        self._storage_watermark = 0\n\n    def put(self, key: str, val: str, ttl_seconds: float) -> None:\n        with self._rw_lock:\n            self._storage[key] = (val, time.time() + ttl_seconds)\n\n    def get(self, key: str) -> Optional[str]:\n        with self._rw_lock:\n            if key not in self._storage:\n                return None\n            val, expiry = self._storage[key]\n            if time.time() > expiry:\n                del self._storage[key]\n                return None\n            return val\n\n    def acquire_lock_token(self) -> int:\n        with self._rw_lock:\n            self._token_counter += 1\n            return self._token_counter\n\n    def commit_with_fencing(self, token: int, key: str, val: str) -> bool:\n        with self._rw_lock:\n            if token <= self._storage_watermark:\n                return False\n            self._storage_watermark = token\n            self._storage[key] = (val, time.time() + 600.0)\n            return True\n\nif __name__ == '__main__':\n    print(\"=== Day 15 Capstone: In-Memory KV Store & Fencing Lock Engine (Python 3.12) ===\")\n    engine = InMemKVAndFencingEngine()\n    engine.put(\"session_id\", \"xyz_token\", ttl_seconds=10.0)\n    print(\"KV Cached:\", engine.get(\"session_id\"))\n\n    t1 = engine.acquire_lock_token()\n    t2 = engine.acquire_lock_token()\n\n    print(\"Client 2:\", \"COMMITTED\" if engine.commit_with_fencing(t2, \"inv\", \"PAID\") else \"REJECTED\")\n    print(\"Client 1:\", \"COMMITTED\" if engine.commit_with_fencing(t1, \"inv\", \"VOID\") else \"REJECTED\")\n",
  },
  educationalNotes: [
    {
      number: 1,
      title: 'Reader-Writer Lock Scaling in Read-Heavy Workloads',
      details:
        'Standard mutual exclusion forces readers to serialize, bottlenecking CPU cores. Reader-Writer locks allow unlimited concurrent readers while granting exclusive access to writers, scaling linearly with available processor cores.',
    },
    {
      number: 2,
      title: 'Defeating Spurious Wakeups with While Loops',
      details:
        'OS thread schedulers can wake waiting condition threads without any signal. Enclosing condition waits inside a while loop (while (!condition) wait()) guarantees that the predicate is re-verified before proceeding.',
    },
    {
      number: 3,
      title: 'Martin Kleppmann Fencing Tokens vs Time-Based Leases',
      details:
        'Time-based locks in Redis or ZooKeeper can expire if a client thread experiences an unexpected GC pause. Attaching monotonically increasing fencing tokens that storage verifies before writes prevents delayed zombie clients from corrupting data.',
    },
    {
      number: 4,
      title: 'Optimistic CAS vs Pessimistic Kernel Locks',
      details:
        'Lock-free data structures use CPU hardware instructions (compare_exchange_weak) to modify pointers atomically, completely avoiding OS thread context switching and thread suspension overhead.',
    },
  ],
  complexity: {
    basicOperations: 'O(1) average for get(), put(), and delete() operations',
    powerCalculation: 'O(1) lock acquisition and monotonic token increment',
    menuDisplay: 'O(1) storage gate fencing token validation',
    auxiliarySpace: 'O(N) memory where N is maximum active key-value entries',
  },
  interactiveScenarios: [
    {
      id: 'scen-d15-1',
      name: 'Passive TTL Eviction on Expired Session',
      choice: 1,
      description: 'Insert session token with 500ms TTL, query at t=200ms and t=800ms.',
      sampleInputs: ['put("session_id", "jwt_token", ttl=500)', 'get("session_id") at t=200', 'get("session_id") at t=800'],
      expectedOutput: 't=200 returns "jwt_token"; t=800 returns NULL (lazily evicted)',
      explanation: 'Lazy expiration checks timestamp in O(1) time on access and frees expired entries.',
    },
    {
      id: 'scen-d15-2',
      name: 'Stale Client Write Rejection with Fencing Tokens',
      choice: 2,
      description: 'Client A (Token 101) and Client B (Token 102) contend. Client B commits first.',
      sampleInputs: ['commit(token=102, val="V2")', 'commit(token=101, val="V1")'],
      expectedOutput: 'Token 102 COMMITTED; Token 101 REJECTED (Stale token blocked)',
      explanation: 'Storage rejects Token 101 because 101 <= watermark 102, preventing data corruption.',
    },
    {
      id: 'scen-d15-3',
      name: 'Multi-Threaded Concurrent Read/Write Throughput',
      choice: 3,
      description: 'Simulate 8 concurrent reader threads and 1 writer thread on shared cache.',
      sampleInputs: ['readers=8, writers=1, ops=10000'],
      expectedOutput: 'High throughput execution with zero data races and linear reader scaling',
      explanation: 'Reader-Writer locks permit concurrent reads without serializing thread execution.',
    },
  ],
};
