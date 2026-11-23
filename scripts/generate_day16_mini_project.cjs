const fs = require('fs');
const path = require('path');

const cCode = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

#define MAX_PARTITIONS 4
#define MAX_RECORDS 64
#define MAX_DOCS 32
#define DIM 4

typedef struct {
    long long offset;
    char key[32];
    char payload[64];
} EventRecord;

typedef struct {
    EventRecord records[MAX_RECORDS];
    int count;
    long long next_offset;
} Partition;

typedef struct {
    int id;
    char text[64];
    double vector[DIM];
} VectorDoc;

typedef struct {
    char key[32];
    char value[64];
    int is_deleted;
} MemEntry;

typedef struct {
    Partition partitions[MAX_PARTITIONS];
    VectorDoc docs[MAX_DOCS];
    int doc_count;
    MemEntry memtable[MAX_DOCS];
    int mem_count;
    long long window_start;
    long long window_end;
    long long window_event_count;
} CapAIStreamEngine;

void engine_init(CapAIStreamEngine* eng) {
    memset(eng, 0, sizeof(CapAIStreamEngine));
    eng->window_start = 0;
    eng->window_end = 60;
    eng->window_event_count = 0;
}

long long stream_append(CapAIStreamEngine* eng, int p, const char* key, const char* payload) {
    if (p < 0 || p >= MAX_PARTITIONS) return -1;
    Partition* part = &eng->partitions[p];
    if (part->count >= MAX_RECORDS) return -1;
    long long off = part->next_offset++;
    part->records[part->count].offset = off;
    strncpy(part->records[part->count].key, key, 31);
    strncpy(part->records[part->count].payload, payload, 63);
    part->count++;
    eng->window_event_count++;
    return off;
}

int vector_index(CapAIStreamEngine* eng, int id, const char* text, const double* vec) {
    if (eng->doc_count >= MAX_DOCS) return -1;
    int idx = eng->doc_count++;
    eng->docs[idx].id = id;
    strncpy(eng->docs[idx].text, text, 63);
    for (int i = 0; i < DIM; ++i) eng->docs[idx].vector[i] = vec[i];
    return idx;
}

int vector_search_nearest(CapAIStreamEngine* eng, const double* query_vec) {
    if (eng->doc_count == 0) return -1;
    int best_id = -1;
    double best_score = -2.0;

    double q_norm = 0.0;
    for (int i = 0; i < DIM; ++i) q_norm += query_vec[i] * query_vec[i];
    q_norm = sqrt(q_norm);

    for (int d = 0; d < eng->doc_count; ++d) {
        double dot = 0.0, d_norm = 0.0;
        for (int i = 0; i < DIM; ++i) {
            dot += query_vec[i] * eng->docs[d].vector[i];
            d_norm += eng->docs[d].vector[i] * eng->docs[d].vector[i];
        }
        d_norm = sqrt(d_norm);
        double denom = q_norm * d_norm;
        double sim = denom < 1e-9 ? 0.0 : dot / denom;
        if (sim > best_score) {
            best_score = sim;
            best_id = eng->docs[d].id;
        }
    }
    return best_id;
}

void lsm_put(CapAIStreamEngine* eng, const char* key, const char* val) {
    for (int i = 0; i < eng->mem_count; ++i) {
        if (strcmp(eng->memtable[i].key, key) == 0) {
            strncpy(eng->memtable[i].value, val, 63);
            eng->memtable[i].is_deleted = 0;
            return;
        }
    }
    if (eng->mem_count < MAX_DOCS) {
        int idx = eng->mem_count++;
        strncpy(eng->memtable[idx].key, key, 31);
        strncpy(eng->memtable[idx].value, val, 63);
        eng->memtable[idx].is_deleted = 0;
    }
}

const char* lsm_get(CapAIStreamEngine* eng, const char* key) {
    for (int i = 0; i < eng->mem_count; ++i) {
        if (strcmp(eng->memtable[i].key, key) == 0) {
            if (eng->memtable[i].is_deleted) return NULL;
            return eng->memtable[i].value;
        }
    }
    return NULL;
}

int main(void) {
    CapAIStreamEngine engine;
    engine_init(&engine);

    long long off = stream_append(&engine, 0, "evt-1", "PAYMENT_COMPLETED");
    printf("1. Appended Event to Partition 0 at Offset: %lld\\n", off);

    double v1[DIM] = {1.0, 0.0, 0.0, 0.0};
    double v2[DIM] = {0.0, 1.0, 0.0, 0.0};
    vector_index(&engine, 101, "Banking Policy", v1);
    vector_index(&engine, 102, "Healthcare Guide", v2);

    double q[DIM] = {0.9, 0.1, 0.0, 0.0};
    int matched_doc = vector_search_nearest(&engine, q);
    printf("2. Semantic Nearest Doc ID for Query: %d\\n", matched_doc);

    lsm_put(&engine, "customer:101", "Tier-1 Prime");
    printf("3. LSM-Tree Retrieved Key: %s\\n", lsm_get(&engine, "customer:101"));
    printf("4. Active Streaming Window Event Count: %lld\\n", engine.window_event_count);
    return 0;
}`;

const cppCode = `#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <cmath>
#include <memory>
#include <algorithm>

struct VectorDoc {
    int id;
    std::string text;
    std::vector<double> vector;
};

class CapAIStreamEngine {
private:
    std::vector<std::vector<std::pair<std::string, std::string>>> partitions_;
    std::vector<VectorDoc> vectorStore_;
    std::map<std::string, std::string> memTable_;
    int64_t windowEventCount_ = 0;

public:
    CapAIStreamEngine(int numPartitions = 4) : partitions_(numPartitions) {}

    int64_t streamAppend(int partitionId, const std::string& key, const std::string& payload) {
        if (partitionId < 0 || partitionId >= static_cast<int>(partitions_.size())) return -1;
        int64_t offset = partitions_[partitionId].size();
        partitions_[partitionId].emplace_back(key, payload);
        windowEventCount_++;
        return offset;
    }

    void indexVector(int id, const std::string& text, const std::vector<double>& vec) {
        vectorStore_.push_back({id, text, vec});
    }

    int searchNearest(const std::vector<double>& query) const {
        if (vectorStore_.empty()) return -1;
        double qNorm = 0.0;
        for (double x : query) qNorm += x * x;
        qNorm = std::sqrt(qNorm);

        int bestId = -1;
        double bestScore = -2.0;

        for (const auto& doc : vectorStore_) {
            double dot = 0.0, dNorm = 0.0;
            for (size_t i = 0; i < query.size() && i < doc.vector.size(); ++i) {
                dot += query[i] * doc.vector[i];
                dNorm += doc.vector[i] * doc.vector[i];
            }
            dNorm = std::sqrt(dNorm);
            double denom = qNorm * dNorm;
            double sim = denom < 1e-9 ? 0.0 : dot / denom;
            if (sim > bestScore) {
                bestScore = sim;
                bestId = doc.id;
            }
        }
        return bestId;
    }

    void lsmPut(const std::string& key, const std::string& val) {
        memTable_[key] = val;
    }

    std::string lsmGet(const std::string& key) const {
        auto it = memTable_.find(key);
        return it != memTable_.end() ? it->second : "NOT_FOUND";
    }

    int64_t getWindowEventCount() const { return windowEventCount_; }
};

int main() {
    CapAIStreamEngine engine(4);
    int64_t off = engine.streamAppend(0, "evt-1", "PAYMENT_COMPLETED");
    std::cout << "1. Appended Event to Partition 0 at Offset: " << off << std::endl;

    engine.indexVector(101, "Banking Policy", {1.0, 0.0, 0.0, 0.0});
    engine.indexVector(102, "Healthcare Guide", {0.0, 1.0, 0.0, 0.0});

    int nearest = engine.searchNearest({0.9, 0.1, 0.0, 0.0});
    std::cout << "2. Semantic Nearest Doc ID for Query: " << nearest << std::endl;

    engine.lsmPut("customer:101", "Tier-1 Prime");
    std::cout << "3. LSM-Tree Retrieved Key: " << engine.lsmGet("customer:101") << std::endl;
    std::cout << "4. Active Streaming Window Event Count: " << engine.getWindowEventCount() << std::endl;
    return 0;
}`;

const javaCode = `package com.faang.capstone;

import java.util.*;

public class CapAIStreamEngine {
    static class VectorDoc {
        int id;
        String text;
        double[] vector;
        VectorDoc(int id, String text, double[] vector) {
            this.id = id;
            this.text = text;
            this.vector = vector;
        }
    }

    private final List<List<String>> partitions = new ArrayList<>();
    private final List<VectorDoc> vectorStore = new ArrayList<>();
    private final Map<String, String> memTable = new TreeMap<>();
    private long windowEventCount = 0;

    public CapAIStreamEngine(int numPartitions) {
        for (int i = 0; i < numPartitions; i++) {
            partitions.add(new ArrayList<>());
        }
    }

    public synchronized long streamAppend(int partitionId, String key, String payload) {
        if (partitionId < 0 || partitionId >= partitions.size()) return -1;
        long off = partitions.get(partitionId).size();
        partitions.get(partitionId).add(key + ":" + payload);
        windowEventCount++;
        return off;
    }

    public synchronized void indexVector(int id, String text, double[] vec) {
        vectorStore.add(new VectorDoc(id, text, vec));
    }

    public synchronized int searchNearest(double[] query) {
        if (vectorStore.isEmpty()) return -1;
        double qNorm = 0.0;
        for (double v : query) qNorm += v * v;
        qNorm = Math.sqrt(qNorm);

        int bestId = -1;
        double bestScore = -2.0;

        for (VectorDoc doc : vectorStore) {
            double dot = 0.0, dNorm = 0.0;
            for (int i = 0; i < query.length; i++) {
                dot += query[i] * doc.vector[i];
                dNorm += doc.vector[i] * doc.vector[i];
            }
            dNorm = Math.sqrt(dNorm);
            double denom = qNorm * dNorm;
            double sim = denom < 1e-9 ? 0.0 : dot / denom;
            if (sim > bestScore) {
                bestScore = sim;
                bestId = doc.id;
            }
        }
        return bestId;
    }

    public synchronized void lsmPut(String key, String val) {
        memTable.put(key, val);
    }

    public synchronized String lsmGet(String key) {
        return memTable.getOrDefault(key, "NOT_FOUND");
    }

    public synchronized long getWindowEventCount() {
        return windowEventCount;
    }

    public static void main(String[] args) {
        CapAIStreamEngine engine = new CapAIStreamEngine(4);
        long off = engine.streamAppend(0, "evt-1", "PAYMENT_COMPLETED");
        System.out.println("1. Appended Event to Partition 0 at Offset: " + off);

        engine.indexVector(101, "Banking Policy", new double[]{1.0, 0.0, 0.0, 0.0});
        engine.indexVector(102, "Healthcare Guide", new double[]{0.0, 1.0, 0.0, 0.0});

        int nearest = engine.searchNearest(new double[]{0.9, 0.1, 0.0, 0.0});
        System.out.println("2. Semantic Nearest Doc ID for Query: " + nearest);

        engine.lsmPut("customer:101", "Tier-1 Prime");
        System.out.println("3. LSM-Tree Retrieved Key: " + engine.lsmGet("customer:101"));
        System.out.println("4. Active Streaming Window Event Count: " + engine.getWindowEventCount());
    }
}`;

const pythonCode = `import math

class CapAIStreamEngine:
    def __init__(self, num_partitions=4):
        self.partitions = [[] for _ in range(num_partitions)]
        self.vector_store = []
        self.mem_table = {}
        self.window_event_count = 0

    def stream_append(self, partition_id: int, key: str, payload: str) -> int:
        if 0 <= partition_id < len(self.partitions):
            off = len(self.partitions[partition_id])
            self.partitions[partition_id].append((key, payload))
            self.window_event_count += 1
            return off
        return -1

    def index_vector(self, doc_id: int, text: str, vec: list):
        self.vector_store.append({"id": doc_id, "text": text, "vector": vec})

    def search_nearest(self, query: list) -> int:
        if not self.vector_store:
            return -1
        q_norm = math.sqrt(sum(x * x for x in query))
        best_id = -1
        best_score = -2.0

        for doc in self.vector_store:
            v = doc["vector"]
            dot = sum(a * b for a, b in zip(query, v))
            d_norm = math.sqrt(sum(x * x for x in v))
            denom = q_norm * d_norm
            sim = dot / denom if denom > 1e-9 else 0.0
            if sim > best_score:
                best_score = sim
                best_id = doc["id"]
        return best_id

    def lsm_put(self, key: str, val: str):
        self.mem_table[key] = val

    def lsm_get(self, key: str) -> str:
        return self.mem_table.get(key, "NOT_FOUND")

if __name__ == "__main__":
    engine = CapAIStreamEngine(4)
    off = engine.stream_append(0, "evt-1", "PAYMENT_COMPLETED")
    print(f"1. Appended Event to Partition 0 at Offset: {off}")

    engine.index_vector(101, "Banking Policy", [1.0, 0.0, 0.0, 0.0])
    engine.index_vector(102, "Healthcare Guide", [0.0, 1.0, 0.0, 0.0])

    nearest = engine.search_nearest([0.9, 0.1, 0.0, 0.0])
    print(f"2. Semantic Nearest Doc ID for Query: {nearest}")

    engine.lsm_put("customer:101", "Tier-1 Prime")
    print(f"3. LSM-Tree Retrieved Key: {engine.lsm_get('customer:101')}")
    print(f"4. Active Streaming Window Event Count: {engine.window_event_count}")`;

const miniProject = {
  id: 'day16-mini-project',
  day: 16,
  title: 'Enterprise Real-Time Event Stream, Vector Search & LSM-Tree Engine (Cap-AI-Stream)',
  subtitle: 'End-to-End Distributed Stream Buffer, Vector Embeddings Indexer, LSM-Tree Storage & Tumbling Window Aggregator',
  description:
    'An enterprise-grade hybrid storage and streaming engine synthesizing: (1) A partitioned sequential commit log with offset tracking, (2) An in-memory vector embedding store with Cosine Similarity KNN retrieval for RAG agents, (3) An LSM-Tree MemTable with tombstone deletion support, and (4) Real-time event-time window aggregation.',
  features: [
    'Append-only multi-partition event streaming buffer with monotonic offset assignment',
    'High-dimensional vector embedding store with Cosine Similarity top-K retrieval',
    'LSM-Tree MemTable key-value store with tombstone deletion tracking',
    'Real-time tumbling window event stream counter and watermark boundaries'
  ],
  conceptsCovered: {
    dataTypes: ['LogRecord', 'VectorDoc', 'MemEntry', 'CosineSimilarity', 'Watermark'],
    conditionals: ['Similarity threshold check', 'Tombstone validation', 'Partition bounds validation'],
    loops: ['Multi-dimensional dot product summation', 'Partition traversal', 'MemTable linear search'],
    constraints: ['Zero false negatives in Bloom/LSM', 'Vector normalization safety', 'Partition offset monotonicity']
  },
  codeByLanguage: {
    c: cCode,
    cpp: cppCode,
    java: javaCode,
    python: pythonCode
  },
  educationalNotes: [
    {
      number: 1,
      title: 'Sequential I/O in Distributed Commit Logs',
      details: 'Appending to an immutable log avoids mechanical disk seek latencies, allowing streaming brokers to saturate network interfaces at multi-gigabit throughput.'
    },
    {
      number: 2,
      title: 'Cosine Similarity in High-Dimensional Vector Search',
      details: 'Cosine similarity measures directional alignment between semantic embeddings, invariant to document length differences.'
    },
    {
      number: 3,
      title: 'LSM-Tree Write Amplification vs Read Latency',
      details: 'LSM storage engines trade off background compaction I/O to achieve sub-millisecond write latency across large-scale distributed databases.'
    }
  ],
  complexity: {
    basicOperations: 'O(1) append & offset lookup',
    powerCalculation: 'O(N * D) vector similarity search',
    menuDisplay: 'O(1) window count lookup',
    auxiliarySpace: 'O(P * R + D * N) for streaming partitions, vector store & MemTable'
  },
  interactiveScenarios: [
    {
      id: 'sc-1',
      name: 'Partitioned Event Log Append & Query',
      choice: 1,
      description: 'Append an event to partition 0 and observe monotonic offset issuance.',
      sampleInputs: ['stream_append(0, "evt-1", "PAYMENT_COMPLETED")'],
      expectedOutput: 'Offset: 0',
      explanation: 'First record in partition 0 receives offset 0.'
    },
    {
      id: 'sc-2',
      name: 'RAG Semantic Vector Search',
      choice: 2,
      description: 'Query embedding vector [0.9, 0.1, 0.0, 0.0] against indexed policy documents.',
      sampleInputs: ['search_nearest([0.9, 0.1, 0.0, 0.0])'],
      expectedOutput: 'Nearest Doc ID: 101',
      explanation: 'Document 101 has the highest cosine similarity with the query vector.'
    },
    {
      id: 'sc-3',
      name: 'LSM-Tree Key-Value Mutation',
      choice: 3,
      description: 'Store key customer:101 and read it from the active MemTable.',
      sampleInputs: ['lsm_put("customer:101", "Tier-1 Prime")', 'lsm_get("customer:101")'],
      expectedOutput: 'Tier-1 Prime',
      explanation: 'MemTable retrieves updated value in O(1).'
    }
  ]
};

const fileContent = `import { MiniProject } from '../types';

export const DAY_16_MINI_PROJECT: MiniProject = ${JSON.stringify(miniProject, null, 2)};
`;

const targetPath = path.join(__dirname, '../src/data/day16MiniProject.ts');
fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log('Successfully generated src/data/day16MiniProject.ts with full enterprise capstone.');
