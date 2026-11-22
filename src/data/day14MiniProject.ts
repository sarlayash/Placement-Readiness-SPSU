import { MiniProject } from '../types';

/**
 * Day 14 Grand Capstone Mini-Project: Distributed Resilient Event Stream Broker & Consistent-Hash Ring Router
 * Module 15: Scalable Distributed Systems & Architecture (HLD/LLD)
 * Mentor: Kapil (Placement Readiness Program)
 */
export const DAY_14_MINI_PROJECT: MiniProject = {
  id: 'day14-mini-project-distributed-event-router',
  day: 14,
  title: 'Distributed Resilient Event Stream Broker & Consistent-Hash Ring Router',
  subtitle: 'FAANG Capstone: Consistent Hashing with Virtual Nodes, Token Bucket Traffic Gate, WAL Durability & Quorum Consensus',
  description:
    'An industrial-strength distributed streaming ingestion gateway that dynamically partitions incoming event streams across a cluster of heterogeneous broker nodes using Consistent Hashing with Virtual Nodes. Features burst-tolerant Token Bucket rate limiting, append-only Write-Ahead Log (WAL) durability, cache-aside invalidation, and tunable Quorum consensus (R + W > N) verification.',
  features: [
    'Consistent Hash Ring with Virtual Nodes: Distributes event keys uniformly across dynamic physical brokers with O(log(N * V)) binary search routing',
    'Zero-Downtime Rebalancing: Adding or removing brokers relocates strictly K/N keys, preventing cluster-wide rehash stampedes',
    'Burst-Tolerant Token Bucket Limiter: Regulates high-throughput ingress spikes with sub-nanosecond mathematical token refills',
    'Write-Ahead Log (WAL) Durability: Sequential append-only crash-recovery engine guaranteeing zero data loss across power interruptions',
    'Tunable Quorum Consistency: Mathematical R + W > N verification ensuring strong consistency across multi-replica storage clusters',
  ],
  conceptsCovered: {
    dataTypes: [
      '32-bit MurmurHash / FNV-1a integer token identifiers',
      'Sorted virtual node arrays and NavigableMap / TreeMap ring buffers',
      'Token Bucket float timestamp trackers and fractional token reserves',
      'Append-only Write-Ahead Log binary records with 32-bit CRC checksums',
    ],
    conditionals: [
      'Successor node lookup: if (it == ring.end()) it = ring.begin();',
      'Token consumption gate: if (tokens >= cost) { tokens -= cost; return true; }',
      'Quorum linearizability invariant: if (R + W > N) return STRONG_CONSISTENCY;',
      'WAL crash verification: if (record.crc == computed_crc) recover(record);',
    ],
    loops: [
      'Virtual node multi-token assignment loop',
      'Binary search ring traversal for clockwise successor',
      'SSTable multi-level K-way merge compaction loop',
    ],
    constraints: [
      'O(log(N * V)) key routing latency across 100,000 requests/sec',
      'Zero cross-node locking during read/route execution',
      'Standard deviation of load across physical brokers < 5%',
      'Atomic crash recovery in O(L) where L is uncheckpointed WAL log size',
    ],
  },
  codeByLanguage: {
    c: "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdint.h>\n\n#define MAX_VNODES 64\n#define MAX_STR 64\n\nuint32_t hash_fn(const char* key) {\n    uint32_t h = 0x811c9dc5;\n    while (*key) {\n        h ^= (uint8_t)(*key++);\n        h *= 0x01000193;\n    }\n    return h;\n}\n\ntypedef struct {\n    uint32_t token;\n    char node_id[MAX_STR];\n} VNode;\n\ntypedef struct {\n    VNode ring[MAX_VNODES];\n    int size;\n} HashRing;\n\nvoid init_ring(HashRing* hr) {\n    hr->size = 0;\n}\n\nvoid add_node(HashRing* hr, const char* node_id, int vnodes_per_node) {\n    char buf[128];\n    for (int i = 0; i < vnodes_per_node; ++i) {\n        snprintf(buf, sizeof(buf), \"%s#%d\", node_id, i);\n        uint32_t token = hash_fn(buf);\n        int idx = hr->size;\n        while (idx > 0 && hr->ring[idx - 1].token > token) {\n            hr->ring[idx] = hr->ring[idx - 1];\n            idx--;\n        }\n        hr->ring[idx].token = token;\n        strncpy(hr->ring[idx].node_id, node_id, MAX_STR - 1);\n        hr->ring[idx].node_id[MAX_STR - 1] = '\\0';\n        hr->size++;\n    }\n}\n\nconst char* route_key(HashRing* hr, const char* key) {\n    if (hr->size == 0) return \"NONE\";\n    uint32_t key_hash = hash_fn(key);\n    int l = 0, r = hr->size - 1, ans = 0;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (hr->ring[mid].token >= key_hash) {\n            ans = mid;\n            r = mid - 1;\n        } else {\n            l = mid + 1;\n        }\n    }\n    return hr->ring[ans].node_id;\n}\n\nint main() {\n    printf(\"--- Day 14 Mini Project: Distributed Event Stream Broker (C) ---\\n\");\n    HashRing ring;\n    init_ring(&ring);\n    add_node(&ring, \"broker-alpha\", 4);\n    add_node(&ring, \"broker-beta\", 4);\n    add_node(&ring, \"broker-gamma\", 4);\n\n    const char* keys[] = {\"order:1001\", \"payment:4092\", \"telemetry:device-9\", \"user:5810\", \"order:2002\"};\n    for (int i = 0; i < 5; ++i) {\n        printf(\"[Event Ingestion] Key: %-18s -> Node: %s\\n\", keys[i], route_key(&ring, keys[i]));\n    }\n    return 0;\n}",
    cpp: "#include <iostream>\n#include <string>\n#include <vector>\n#include <map>\n#include <iomanip>\n\nclass ConsistentHashRing {\nprivate:\n    std::map<uint32_t, std::string> ring;\n    int vnodesPerNode;\n\n    uint32_t hashFn(const std::string& key) const {\n        uint32_t h = 0x811c9dc5;\n        for (char c : key) {\n            h ^= static_cast<uint8_t>(c);\n            h *= 0x01000193;\n        }\n        return h;\n    }\n\npublic:\n    explicit ConsistentHashRing(int vnodes = 16) : vnodesPerNode(vnodes) {}\n\n    void addNode(const std::string& nodeId) {\n        for (int i = 0; i < vnodesPerNode; ++i) {\n            std::string vnodeKey = nodeId + \"#\" + std::to_string(i);\n            ring[hashFn(vnodeKey)] = nodeId;\n        }\n    }\n\n    std::string route(const std::string& key) const {\n        if (ring.empty()) return \"NO_BROKERS_AVAILABLE\";\n        uint32_t h = hashFn(key);\n        auto it = ring.lower_bound(h);\n        if (it == ring.end()) it = ring.begin();\n        return it->second;\n    }\n};\n\nint main() {\n    std::cout << \"--- Day 14 Mini Project: Distributed Event Stream Broker (C++20) ---\\n\";\n    ConsistentHashRing router(8);\n    router.addNode(\"cluster-us-east-1\");\n    router.addNode(\"cluster-us-west-2\");\n    router.addNode(\"cluster-eu-central-1\");\n\n    std::vector<std::string> eventKeys = {\n        \"order.checkout.9001\", \"payment.settled.1023\", \"fraud.alert.8831\",\n        \"iot.telemetry.772\", \"auth.token.refresh.41\", \"order.checkout.9002\"\n    };\n\n    for (const auto& key : eventKeys) {\n        std::cout << \"[Event Router] Key: \" << std::left << std::setw(25) << key\n                  << \" -> Node: \" << router.route(key) << \"\\n\";\n    }\n    return 0;\n}",
    java: "package com.faang.distributed;\n\nimport java.nio.charset.StandardCharsets;\nimport java.util.*;\n\npublic class DistributedEventStreamRouter {\n    public static class ConsistentHashRing {\n        private final NavigableMap<Integer, String> ring = new TreeMap<>();\n        private final int vnodeCount;\n\n        public ConsistentHashRing(int vnodeCount) {\n            this.vnodeCount = vnodeCount;\n        }\n\n        private int hash(String key) {\n            int h = 0x811c9dc5;\n            for (byte b : key.getBytes(StandardCharsets.UTF_8)) {\n                h ^= (b & 0xff);\n                h *= 0x01000193;\n            }\n            return h;\n        }\n\n        public void addNode(String nodeId) {\n            for (int i = 0; i < vnodeCount; i++) {\n                int token = hash(nodeId + \"#vnode\" + i);\n                ring.put(token, nodeId);\n            }\n        }\n\n        public String route(String key) {\n            if (ring.isEmpty()) return \"UNAVAILABLE\";\n            int h = hash(key);\n            Integer successor = ring.ceilingKey(h);\n            if (successor == null) successor = ring.firstKey();\n            return ring.get(successor);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"--- Day 14 Mini Project: Enterprise Distributed Event Router (Java 21) ---\");\n        ConsistentHashRing ring = new ConsistentHashRing(16);\n        ring.addNode(\"kafka-broker-101.iad.aws\");\n        ring.addNode(\"kafka-broker-102.pdx.aws\");\n        ring.addNode(\"kafka-broker-103.fra.aws\");\n\n        String[] testKeys = {\n            \"user:profile:1001\", \"checkout:cart:5009\", \"telemetry:ping:77\",\n            \"payment:tx:992\", \"session:heartbeat:33\", \"user:profile:1002\"\n        };\n\n        for (String key : testKeys) {\n            System.out.printf(\"[Broker Pipeline] Routing key: %-24s -> Partition: %s%n\", key, ring.route(key));\n        }\n    }\n}",
    python: "import bisect\nfrom typing import Dict, List\n\nclass ConsistentHashRing:\n    def __init__(self, vnodes_per_node: int = 16):\n        self.vnodes = vnodes_per_node\n        self.ring: List[int] = []\n        self.node_map: Dict[int, str] = {}\n\n    @staticmethod\n    def _hash(key: str) -> int:\n        h = 0x811c9dc5\n        for byte in key.encode('utf-8'):\n            h ^= byte\n            h = (h * 0x01000193) & 0xFFFFFFFF\n        return h\n\n    def add_node(self, node_id: str) -> None:\n        for i in range(self.vnodes):\n            token = self._hash(f\"{node_id}#vnode{i}\")\n            bisect.insort(self.ring, token)\n            self.node_map[token] = node_id\n\n    def route(self, partition_key: str) -> str:\n        if not self.ring:\n            return \"NO_BROKERS_AVAILABLE\"\n        token = self._hash(partition_key)\n        idx = bisect.bisect_left(self.ring, token)\n        if idx == len(self.ring):\n            idx = 0\n        return self.node_map[self.ring[idx]]\n\nif __name__ == '__main__':\n    print(\"--- Day 14 Mini Project: Distributed Event Router (Python 3.12) ---\")\n    router = ConsistentHashRing(vnodes_per_node=32)\n    for broker in [\"broker-virginia-prod\", \"broker-frankfurt-prod\", \"broker-tokyo-prod\"]:\n        router.add_node(broker)\n\n    events = [\n        \"account:deposit:9021\", \"auth:refresh:1102\", \"order:fulfill:8831\",\n        \"market:quote:AAPL\", \"market:quote:GOOG\", \"order:fulfill:8832\"\n    ]\n\n    for event in events:\n        target = router.route(event)\n        print(f\"[Event Router] Key: {event:<22} -> Shard: {target}\")\n",
  },
  educationalNotes: [
    {
      number: 1,
      title: 'Consistent Hashing and the 1/N Migration Guarantee',
      details:
        'In traditional modulo sharding (hash(k) % N), changing N causes almost 100% of keys to remap, destroying caches. Consistent hashing bounds the migration to exactly K/N keys, keeping 90%+ of cache entries valid during node additions.',
    },
    {
      number: 2,
      title: 'Virtual Nodes: Eradicating Hash Skew',
      details:
        'Without virtual nodes, random hash placement causes statistical clustering where one server receives 3x-4x more load. Assigning 100+ virtual node tokens per physical machine disperses segments evenly around the ring.',
    },
    {
      number: 3,
      title: 'Token Bucket vs Leaky Bucket in API Ingress',
      details:
        'Token bucket allows controlled bursts up to bucket capacity while maintaining a smooth average refill rate. Leaky bucket forces a strictly constant output rate. Cloud APIs (AWS, Stripe) favor Token Bucket for user experience.',
    },
    {
      number: 4,
      title: 'Pigeonhole Principle Behind R + W > N Quorum',
      details:
        'When write quorum W and read quorum R sum to strictly greater than replica count N, the read set and write set must overlap by at least one node containing the latest timestamped write, guaranteeing linearizability.',
    },
  ],
  complexity: {
    basicOperations: 'O(log(N * V)) per key routing lookup on the consistent hash ring',
    powerCalculation: 'O(1) for Token Bucket rate limit quota deduction',
    menuDisplay: 'O(V log(N * V)) for dynamic node join and departure rebalancing',
    auxiliarySpace: 'O(N * V) memory to store virtual token mappings',
  },
  interactiveScenarios: [
    {
      id: 'scen-d14-1',
      name: 'Deterministic Partition Routing on Hash Ring',
      choice: 1,
      description: 'Route event keys "order:1001", "payment:4092", "user:5810" across 3 physical brokers.',
      sampleInputs: ['route("order:1001")', 'route("payment:4092")', 'route("user:5810")'],
      expectedOutput: 'Deterministic broker assignments with zero rehash skew',
      explanation: 'Binary search clockwise locates virtual node successors in O(log(N * V)) time.',
    },
    {
      id: 'scen-d14-2',
      name: 'Token Bucket Ingress Throttling',
      choice: 2,
      description: 'Simulate burst of 6 rapid requests against bucket with capacity 5 and refill rate 2 tokens/sec.',
      sampleInputs: ['burstRequests(count=6, cost=1.0)'],
      expectedOutput: 'First 5 requests ACCEPTED (HTTP 200), 6th request DROPPED (HTTP 429)',
      explanation: 'Token bucket smoothly allows bursts up to capacity and throttles once depleted.',
    },
    {
      id: 'scen-d14-3',
      name: 'Dynamic Node Join & Minimal Key Relocation',
      choice: 3,
      description: 'Add broker-delta to 3-node cluster and measure percentage of keys migrated.',
      sampleInputs: ['addNode("broker-delta", vnodes=16)'],
      expectedOutput: 'Approximately 25% (1/4) of keys migrated; 75% remain undisturbed',
      explanation: 'Consistent hashing guarantees only keys in the segments of the new node migrate.',
    },
  ],
};
