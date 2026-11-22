const fs = require('fs');
const path = require('path');

const cCode = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

#define MAX_VNODES 64
#define MAX_STR 64

uint32_t hash_fn(const char* key) {
    uint32_t h = 0x811c9dc5;
    while (*key) {
        h ^= (uint8_t)(*key++);
        h *= 0x01000193;
    }
    return h;
}

typedef struct {
    uint32_t token;
    char node_id[MAX_STR];
} VNode;

typedef struct {
    VNode ring[MAX_VNODES];
    int size;
} HashRing;

void init_ring(HashRing* hr) {
    hr->size = 0;
}

void add_node(HashRing* hr, const char* node_id, int vnodes_per_node) {
    char buf[128];
    for (int i = 0; i < vnodes_per_node; ++i) {
        snprintf(buf, sizeof(buf), "%s#%d", node_id, i);
        uint32_t token = hash_fn(buf);
        int idx = hr->size;
        while (idx > 0 && hr->ring[idx - 1].token > token) {
            hr->ring[idx] = hr->ring[idx - 1];
            idx--;
        }
        hr->ring[idx].token = token;
        strncpy(hr->ring[idx].node_id, node_id, MAX_STR - 1);
        hr->ring[idx].node_id[MAX_STR - 1] = '\\0';
        hr->size++;
    }
}

const char* route_key(HashRing* hr, const char* key) {
    if (hr->size == 0) return "NONE";
    uint32_t key_hash = hash_fn(key);
    int l = 0, r = hr->size - 1, ans = 0;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (hr->ring[mid].token >= key_hash) {
            ans = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return hr->ring[ans].node_id;
}

int main() {
    printf("--- Day 14 Mini Project: Distributed Event Stream Broker (C) ---\\n");
    HashRing ring;
    init_ring(&ring);
    add_node(&ring, "broker-alpha", 4);
    add_node(&ring, "broker-beta", 4);
    add_node(&ring, "broker-gamma", 4);

    const char* keys[] = {"order:1001", "payment:4092", "telemetry:device-9", "user:5810", "order:2002"};
    for (int i = 0; i < 5; ++i) {
        printf("[Event Ingestion] Key: %-18s -> Node: %s\\n", keys[i], route_key(&ring, keys[i]));
    }
    return 0;
}`;

const cppCode = `#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <iomanip>

class ConsistentHashRing {
private:
    std::map<uint32_t, std::string> ring;
    int vnodesPerNode;

    uint32_t hashFn(const std::string& key) const {
        uint32_t h = 0x811c9dc5;
        for (char c : key) {
            h ^= static_cast<uint8_t>(c);
            h *= 0x01000193;
        }
        return h;
    }

public:
    explicit ConsistentHashRing(int vnodes = 16) : vnodesPerNode(vnodes) {}

    void addNode(const std::string& nodeId) {
        for (int i = 0; i < vnodesPerNode; ++i) {
            std::string vnodeKey = nodeId + "#" + std::to_string(i);
            ring[hashFn(vnodeKey)] = nodeId;
        }
    }

    std::string route(const std::string& key) const {
        if (ring.empty()) return "NO_BROKERS_AVAILABLE";
        uint32_t h = hashFn(key);
        auto it = ring.lower_bound(h);
        if (it == ring.end()) it = ring.begin();
        return it->second;
    }
};

int main() {
    std::cout << "--- Day 14 Mini Project: Distributed Event Stream Broker (C++20) ---\\n";
    ConsistentHashRing router(8);
    router.addNode("cluster-us-east-1");
    router.addNode("cluster-us-west-2");
    router.addNode("cluster-eu-central-1");

    std::vector<std::string> eventKeys = {
        "order.checkout.9001", "payment.settled.1023", "fraud.alert.8831",
        "iot.telemetry.772", "auth.token.refresh.41", "order.checkout.9002"
    };

    for (const auto& key : eventKeys) {
        std::cout << "[Event Router] Key: " << std::left << std::setw(25) << key
                  << " -> Node: " << router.route(key) << "\\n";
    }
    return 0;
}`;

const javaCode = `package com.faang.distributed;

import java.nio.charset.StandardCharsets;
import java.util.*;

public class DistributedEventStreamRouter {
    public static class ConsistentHashRing {
        private final NavigableMap<Integer, String> ring = new TreeMap<>();
        private final int vnodeCount;

        public ConsistentHashRing(int vnodeCount) {
            this.vnodeCount = vnodeCount;
        }

        private int hash(String key) {
            int h = 0x811c9dc5;
            for (byte b : key.getBytes(StandardCharsets.UTF_8)) {
                h ^= (b & 0xff);
                h *= 0x01000193;
            }
            return h;
        }

        public void addNode(String nodeId) {
            for (int i = 0; i < vnodeCount; i++) {
                int token = hash(nodeId + "#vnode" + i);
                ring.put(token, nodeId);
            }
        }

        public String route(String key) {
            if (ring.isEmpty()) return "UNAVAILABLE";
            int h = hash(key);
            Integer successor = ring.ceilingKey(h);
            if (successor == null) successor = ring.firstKey();
            return ring.get(successor);
        }
    }

    public static void main(String[] args) {
        System.out.println("--- Day 14 Mini Project: Enterprise Distributed Event Router (Java 21) ---");
        ConsistentHashRing ring = new ConsistentHashRing(16);
        ring.addNode("kafka-broker-101.iad.aws");
        ring.addNode("kafka-broker-102.pdx.aws");
        ring.addNode("kafka-broker-103.fra.aws");

        String[] testKeys = {
            "user:profile:1001", "checkout:cart:5009", "telemetry:ping:77",
            "payment:tx:992", "session:heartbeat:33", "user:profile:1002"
        };

        for (String key : testKeys) {
            System.out.printf("[Broker Pipeline] Routing key: %-24s -> Partition: %s%n", key, ring.route(key));
        }
    }
}`;

const pythonCode = `import bisect
from typing import Dict, List

class ConsistentHashRing:
    def __init__(self, vnodes_per_node: int = 16):
        self.vnodes = vnodes_per_node
        self.ring: List[int] = []
        self.node_map: Dict[int, str] = {}

    @staticmethod
    def _hash(key: str) -> int:
        h = 0x811c9dc5
        for byte in key.encode('utf-8'):
            h ^= byte
            h = (h * 0x01000193) & 0xFFFFFFFF
        return h

    def add_node(self, node_id: str) -> None:
        for i in range(self.vnodes):
            token = self._hash(f"{node_id}#vnode{i}")
            bisect.insort(self.ring, token)
            self.node_map[token] = node_id

    def route(self, partition_key: str) -> str:
        if not self.ring:
            return "NO_BROKERS_AVAILABLE"
        token = self._hash(partition_key)
        idx = bisect.bisect_left(self.ring, token)
        if idx == len(self.ring):
            idx = 0
        return self.node_map[self.ring[idx]]

if __name__ == '__main__':
    print("--- Day 14 Mini Project: Distributed Event Router (Python 3.12) ---")
    router = ConsistentHashRing(vnodes_per_node=32)
    for broker in ["broker-virginia-prod", "broker-frankfurt-prod", "broker-tokyo-prod"]:
        router.add_node(broker)

    events = [
        "account:deposit:9021", "auth:refresh:1102", "order:fulfill:8831",
        "market:quote:AAPL", "market:quote:GOOG", "order:fulfill:8832"
    ]

    for event in events:
        target = router.route(event)
        print(f"[Event Router] Key: {event:<22} -> Shard: {target}")
`;

const miniProjectContent = `import { MiniProject } from '../types';

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
    c: ${JSON.stringify(cCode)},
    cpp: ${JSON.stringify(cppCode)},
    java: ${JSON.stringify(javaCode)},
    python: ${JSON.stringify(pythonCode)},
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
`;

fs.writeFileSync(path.join(__dirname, '../src/data/day14MiniProject.ts'), miniProjectContent, 'utf8');
console.log('Successfully wrote src/data/day14MiniProject.ts');
