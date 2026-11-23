import { MiniProject } from '../types';

export const DAY_16_MINI_PROJECT: MiniProject = {
  "id": "day16-mini-project",
  "day": 16,
  "title": "Enterprise Real-Time Event Stream, Vector Search & LSM-Tree Engine (Cap-AI-Stream)",
  "subtitle": "End-to-End Distributed Stream Buffer, Vector Embeddings Indexer, LSM-Tree Storage & Tumbling Window Aggregator",
  "description": "An enterprise-grade hybrid storage and streaming engine synthesizing: (1) A partitioned sequential commit log with offset tracking, (2) An in-memory vector embedding store with Cosine Similarity KNN retrieval for RAG agents, (3) An LSM-Tree MemTable with tombstone deletion support, and (4) Real-time event-time window aggregation.",
  "features": [
    "Append-only multi-partition event streaming buffer with monotonic offset assignment",
    "High-dimensional vector embedding store with Cosine Similarity top-K retrieval",
    "LSM-Tree MemTable key-value store with tombstone deletion tracking",
    "Real-time tumbling window event stream counter and watermark boundaries"
  ],
  "conceptsCovered": {
    "dataTypes": [
      "LogRecord",
      "VectorDoc",
      "MemEntry",
      "CosineSimilarity",
      "Watermark"
    ],
    "conditionals": [
      "Similarity threshold check",
      "Tombstone validation",
      "Partition bounds validation"
    ],
    "loops": [
      "Multi-dimensional dot product summation",
      "Partition traversal",
      "MemTable linear search"
    ],
    "constraints": [
      "Zero false negatives in Bloom/LSM",
      "Vector normalization safety",
      "Partition offset monotonicity"
    ]
  },
  "codeByLanguage": {
    "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <math.h>\n\n#define MAX_PARTITIONS 4\n#define MAX_RECORDS 64\n#define MAX_DOCS 32\n#define DIM 4\n\ntypedef struct {\n    long long offset;\n    char key[32];\n    char payload[64];\n} EventRecord;\n\ntypedef struct {\n    EventRecord records[MAX_RECORDS];\n    int count;\n    long long next_offset;\n} Partition;\n\ntypedef struct {\n    int id;\n    char text[64];\n    double vector[DIM];\n} VectorDoc;\n\ntypedef struct {\n    char key[32];\n    char value[64];\n    int is_deleted;\n} MemEntry;\n\ntypedef struct {\n    Partition partitions[MAX_PARTITIONS];\n    VectorDoc docs[MAX_DOCS];\n    int doc_count;\n    MemEntry memtable[MAX_DOCS];\n    int mem_count;\n    long long window_start;\n    long long window_end;\n    long long window_event_count;\n} CapAIStreamEngine;\n\nvoid engine_init(CapAIStreamEngine* eng) {\n    memset(eng, 0, sizeof(CapAIStreamEngine));\n    eng->window_start = 0;\n    eng->window_end = 60;\n    eng->window_event_count = 0;\n}\n\nlong long stream_append(CapAIStreamEngine* eng, int p, const char* key, const char* payload) {\n    if (p < 0 || p >= MAX_PARTITIONS) return -1;\n    Partition* part = &eng->partitions[p];\n    if (part->count >= MAX_RECORDS) return -1;\n    long long off = part->next_offset++;\n    part->records[part->count].offset = off;\n    strncpy(part->records[part->count].key, key, 31);\n    strncpy(part->records[part->count].payload, payload, 63);\n    part->count++;\n    eng->window_event_count++;\n    return off;\n}\n\nint vector_index(CapAIStreamEngine* eng, int id, const char* text, const double* vec) {\n    if (eng->doc_count >= MAX_DOCS) return -1;\n    int idx = eng->doc_count++;\n    eng->docs[idx].id = id;\n    strncpy(eng->docs[idx].text, text, 63);\n    for (int i = 0; i < DIM; ++i) eng->docs[idx].vector[i] = vec[i];\n    return idx;\n}\n\nint vector_search_nearest(CapAIStreamEngine* eng, const double* query_vec) {\n    if (eng->doc_count == 0) return -1;\n    int best_id = -1;\n    double best_score = -2.0;\n\n    double q_norm = 0.0;\n    for (int i = 0; i < DIM; ++i) q_norm += query_vec[i] * query_vec[i];\n    q_norm = sqrt(q_norm);\n\n    for (int d = 0; d < eng->doc_count; ++d) {\n        double dot = 0.0, d_norm = 0.0;\n        for (int i = 0; i < DIM; ++i) {\n            dot += query_vec[i] * eng->docs[d].vector[i];\n            d_norm += eng->docs[d].vector[i] * eng->docs[d].vector[i];\n        }\n        d_norm = sqrt(d_norm);\n        double denom = q_norm * d_norm;\n        double sim = denom < 1e-9 ? 0.0 : dot / denom;\n        if (sim > best_score) {\n            best_score = sim;\n            best_id = eng->docs[d].id;\n        }\n    }\n    return best_id;\n}\n\nvoid lsm_put(CapAIStreamEngine* eng, const char* key, const char* val) {\n    for (int i = 0; i < eng->mem_count; ++i) {\n        if (strcmp(eng->memtable[i].key, key) == 0) {\n            strncpy(eng->memtable[i].value, val, 63);\n            eng->memtable[i].is_deleted = 0;\n            return;\n        }\n    }\n    if (eng->mem_count < MAX_DOCS) {\n        int idx = eng->mem_count++;\n        strncpy(eng->memtable[idx].key, key, 31);\n        strncpy(eng->memtable[idx].value, val, 63);\n        eng->memtable[idx].is_deleted = 0;\n    }\n}\n\nconst char* lsm_get(CapAIStreamEngine* eng, const char* key) {\n    for (int i = 0; i < eng->mem_count; ++i) {\n        if (strcmp(eng->memtable[i].key, key) == 0) {\n            if (eng->memtable[i].is_deleted) return NULL;\n            return eng->memtable[i].value;\n        }\n    }\n    return NULL;\n}\n\nint main(void) {\n    CapAIStreamEngine engine;\n    engine_init(&engine);\n\n    long long off = stream_append(&engine, 0, \"evt-1\", \"PAYMENT_COMPLETED\");\n    printf(\"1. Appended Event to Partition 0 at Offset: %lld\\n\", off);\n\n    double v1[DIM] = {1.0, 0.0, 0.0, 0.0};\n    double v2[DIM] = {0.0, 1.0, 0.0, 0.0};\n    vector_index(&engine, 101, \"Banking Policy\", v1);\n    vector_index(&engine, 102, \"Healthcare Guide\", v2);\n\n    double q[DIM] = {0.9, 0.1, 0.0, 0.0};\n    int matched_doc = vector_search_nearest(&engine, q);\n    printf(\"2. Semantic Nearest Doc ID for Query: %d\\n\", matched_doc);\n\n    lsm_put(&engine, \"customer:101\", \"Tier-1 Prime\");\n    printf(\"3. LSM-Tree Retrieved Key: %s\\n\", lsm_get(&engine, \"customer:101\"));\n    printf(\"4. Active Streaming Window Event Count: %lld\\n\", engine.window_event_count);\n    return 0;\n}",
    "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <map>\n#include <cmath>\n#include <memory>\n#include <algorithm>\n\nstruct VectorDoc {\n    int id;\n    std::string text;\n    std::vector<double> vector;\n};\n\nclass CapAIStreamEngine {\nprivate:\n    std::vector<std::vector<std::pair<std::string, std::string>>> partitions_;\n    std::vector<VectorDoc> vectorStore_;\n    std::map<std::string, std::string> memTable_;\n    int64_t windowEventCount_ = 0;\n\npublic:\n    CapAIStreamEngine(int numPartitions = 4) : partitions_(numPartitions) {}\n\n    int64_t streamAppend(int partitionId, const std::string& key, const std::string& payload) {\n        if (partitionId < 0 || partitionId >= static_cast<int>(partitions_.size())) return -1;\n        int64_t offset = partitions_[partitionId].size();\n        partitions_[partitionId].emplace_back(key, payload);\n        windowEventCount_++;\n        return offset;\n    }\n\n    void indexVector(int id, const std::string& text, const std::vector<double>& vec) {\n        vectorStore_.push_back({id, text, vec});\n    }\n\n    int searchNearest(const std::vector<double>& query) const {\n        if (vectorStore_.empty()) return -1;\n        double qNorm = 0.0;\n        for (double x : query) qNorm += x * x;\n        qNorm = std::sqrt(qNorm);\n\n        int bestId = -1;\n        double bestScore = -2.0;\n\n        for (const auto& doc : vectorStore_) {\n            double dot = 0.0, dNorm = 0.0;\n            for (size_t i = 0; i < query.size() && i < doc.vector.size(); ++i) {\n                dot += query[i] * doc.vector[i];\n                dNorm += doc.vector[i] * doc.vector[i];\n            }\n            dNorm = std::sqrt(dNorm);\n            double denom = qNorm * dNorm;\n            double sim = denom < 1e-9 ? 0.0 : dot / denom;\n            if (sim > bestScore) {\n                bestScore = sim;\n                bestId = doc.id;\n            }\n        }\n        return bestId;\n    }\n\n    void lsmPut(const std::string& key, const std::string& val) {\n        memTable_[key] = val;\n    }\n\n    std::string lsmGet(const std::string& key) const {\n        auto it = memTable_.find(key);\n        return it != memTable_.end() ? it->second : \"NOT_FOUND\";\n    }\n\n    int64_t getWindowEventCount() const { return windowEventCount_; }\n};\n\nint main() {\n    CapAIStreamEngine engine(4);\n    int64_t off = engine.streamAppend(0, \"evt-1\", \"PAYMENT_COMPLETED\");\n    std::cout << \"1. Appended Event to Partition 0 at Offset: \" << off << std::endl;\n\n    engine.indexVector(101, \"Banking Policy\", {1.0, 0.0, 0.0, 0.0});\n    engine.indexVector(102, \"Healthcare Guide\", {0.0, 1.0, 0.0, 0.0});\n\n    int nearest = engine.searchNearest({0.9, 0.1, 0.0, 0.0});\n    std::cout << \"2. Semantic Nearest Doc ID for Query: \" << nearest << std::endl;\n\n    engine.lsmPut(\"customer:101\", \"Tier-1 Prime\");\n    std::cout << \"3. LSM-Tree Retrieved Key: \" << engine.lsmGet(\"customer:101\") << std::endl;\n    std::cout << \"4. Active Streaming Window Event Count: \" << engine.getWindowEventCount() << std::endl;\n    return 0;\n}",
    "java": "package com.faang.capstone;\n\nimport java.util.*;\n\npublic class CapAIStreamEngine {\n    static class VectorDoc {\n        int id;\n        String text;\n        double[] vector;\n        VectorDoc(int id, String text, double[] vector) {\n            this.id = id;\n            this.text = text;\n            this.vector = vector;\n        }\n    }\n\n    private final List<List<String>> partitions = new ArrayList<>();\n    private final List<VectorDoc> vectorStore = new ArrayList<>();\n    private final Map<String, String> memTable = new TreeMap<>();\n    private long windowEventCount = 0;\n\n    public CapAIStreamEngine(int numPartitions) {\n        for (int i = 0; i < numPartitions; i++) {\n            partitions.add(new ArrayList<>());\n        }\n    }\n\n    public synchronized long streamAppend(int partitionId, String key, String payload) {\n        if (partitionId < 0 || partitionId >= partitions.size()) return -1;\n        long off = partitions.get(partitionId).size();\n        partitions.get(partitionId).add(key + \":\" + payload);\n        windowEventCount++;\n        return off;\n    }\n\n    public synchronized void indexVector(int id, String text, double[] vec) {\n        vectorStore.add(new VectorDoc(id, text, vec));\n    }\n\n    public synchronized int searchNearest(double[] query) {\n        if (vectorStore.isEmpty()) return -1;\n        double qNorm = 0.0;\n        for (double v : query) qNorm += v * v;\n        qNorm = Math.sqrt(qNorm);\n\n        int bestId = -1;\n        double bestScore = -2.0;\n\n        for (VectorDoc doc : vectorStore) {\n            double dot = 0.0, dNorm = 0.0;\n            for (int i = 0; i < query.length; i++) {\n                dot += query[i] * doc.vector[i];\n                dNorm += doc.vector[i] * doc.vector[i];\n            }\n            dNorm = Math.sqrt(dNorm);\n            double denom = qNorm * dNorm;\n            double sim = denom < 1e-9 ? 0.0 : dot / denom;\n            if (sim > bestScore) {\n                bestScore = sim;\n                bestId = doc.id;\n            }\n        }\n        return bestId;\n    }\n\n    public synchronized void lsmPut(String key, String val) {\n        memTable.put(key, val);\n    }\n\n    public synchronized String lsmGet(String key) {\n        return memTable.getOrDefault(key, \"NOT_FOUND\");\n    }\n\n    public synchronized long getWindowEventCount() {\n        return windowEventCount;\n    }\n\n    public static void main(String[] args) {\n        CapAIStreamEngine engine = new CapAIStreamEngine(4);\n        long off = engine.streamAppend(0, \"evt-1\", \"PAYMENT_COMPLETED\");\n        System.out.println(\"1. Appended Event to Partition 0 at Offset: \" + off);\n\n        engine.indexVector(101, \"Banking Policy\", new double[]{1.0, 0.0, 0.0, 0.0});\n        engine.indexVector(102, \"Healthcare Guide\", new double[]{0.0, 1.0, 0.0, 0.0});\n\n        int nearest = engine.searchNearest(new double[]{0.9, 0.1, 0.0, 0.0});\n        System.out.println(\"2. Semantic Nearest Doc ID for Query: \" + nearest);\n\n        engine.lsmPut(\"customer:101\", \"Tier-1 Prime\");\n        System.out.println(\"3. LSM-Tree Retrieved Key: \" + engine.lsmGet(\"customer:101\"));\n        System.out.println(\"4. Active Streaming Window Event Count: \" + engine.getWindowEventCount());\n    }\n}",
    "python": "import math\n\nclass CapAIStreamEngine:\n    def __init__(self, num_partitions=4):\n        self.partitions = [[] for _ in range(num_partitions)]\n        self.vector_store = []\n        self.mem_table = {}\n        self.window_event_count = 0\n\n    def stream_append(self, partition_id: int, key: str, payload: str) -> int:\n        if 0 <= partition_id < len(self.partitions):\n            off = len(self.partitions[partition_id])\n            self.partitions[partition_id].append((key, payload))\n            self.window_event_count += 1\n            return off\n        return -1\n\n    def index_vector(self, doc_id: int, text: str, vec: list):\n        self.vector_store.append({\"id\": doc_id, \"text\": text, \"vector\": vec})\n\n    def search_nearest(self, query: list) -> int:\n        if not self.vector_store:\n            return -1\n        q_norm = math.sqrt(sum(x * x for x in query))\n        best_id = -1\n        best_score = -2.0\n\n        for doc in self.vector_store:\n            v = doc[\"vector\"]\n            dot = sum(a * b for a, b in zip(query, v))\n            d_norm = math.sqrt(sum(x * x for x in v))\n            denom = q_norm * d_norm\n            sim = dot / denom if denom > 1e-9 else 0.0\n            if sim > best_score:\n                best_score = sim\n                best_id = doc[\"id\"]\n        return best_id\n\n    def lsm_put(self, key: str, val: str):\n        self.mem_table[key] = val\n\n    def lsm_get(self, key: str) -> str:\n        return self.mem_table.get(key, \"NOT_FOUND\")\n\nif __name__ == \"__main__\":\n    engine = CapAIStreamEngine(4)\n    off = engine.stream_append(0, \"evt-1\", \"PAYMENT_COMPLETED\")\n    print(f\"1. Appended Event to Partition 0 at Offset: {off}\")\n\n    engine.index_vector(101, \"Banking Policy\", [1.0, 0.0, 0.0, 0.0])\n    engine.index_vector(102, \"Healthcare Guide\", [0.0, 1.0, 0.0, 0.0])\n\n    nearest = engine.search_nearest([0.9, 0.1, 0.0, 0.0])\n    print(f\"2. Semantic Nearest Doc ID for Query: {nearest}\")\n\n    engine.lsm_put(\"customer:101\", \"Tier-1 Prime\")\n    print(f\"3. LSM-Tree Retrieved Key: {engine.lsm_get('customer:101')}\")\n    print(f\"4. Active Streaming Window Event Count: {engine.window_event_count}\")"
  },
  "educationalNotes": [
    {
      "number": 1,
      "title": "Sequential I/O in Distributed Commit Logs",
      "details": "Appending to an immutable log avoids mechanical disk seek latencies, allowing streaming brokers to saturate network interfaces at multi-gigabit throughput."
    },
    {
      "number": 2,
      "title": "Cosine Similarity in High-Dimensional Vector Search",
      "details": "Cosine similarity measures directional alignment between semantic embeddings, invariant to document length differences."
    },
    {
      "number": 3,
      "title": "LSM-Tree Write Amplification vs Read Latency",
      "details": "LSM storage engines trade off background compaction I/O to achieve sub-millisecond write latency across large-scale distributed databases."
    }
  ],
  "complexity": {
    "basicOperations": "O(1) append & offset lookup",
    "powerCalculation": "O(N * D) vector similarity search",
    "menuDisplay": "O(1) window count lookup",
    "auxiliarySpace": "O(P * R + D * N) for streaming partitions, vector store & MemTable"
  },
  "interactiveScenarios": [
    {
      "id": "sc-1",
      "name": "Partitioned Event Log Append & Query",
      "choice": 1,
      "description": "Append an event to partition 0 and observe monotonic offset issuance.",
      "sampleInputs": [
        "stream_append(0, \"evt-1\", \"PAYMENT_COMPLETED\")"
      ],
      "expectedOutput": "Offset: 0",
      "explanation": "First record in partition 0 receives offset 0."
    },
    {
      "id": "sc-2",
      "name": "RAG Semantic Vector Search",
      "choice": 2,
      "description": "Query embedding vector [0.9, 0.1, 0.0, 0.0] against indexed policy documents.",
      "sampleInputs": [
        "search_nearest([0.9, 0.1, 0.0, 0.0])"
      ],
      "expectedOutput": "Nearest Doc ID: 101",
      "explanation": "Document 101 has the highest cosine similarity with the query vector."
    },
    {
      "id": "sc-3",
      "name": "LSM-Tree Key-Value Mutation",
      "choice": 3,
      "description": "Store key customer:101 and read it from the active MemTable.",
      "sampleInputs": [
        "lsm_put(\"customer:101\", \"Tier-1 Prime\")",
        "lsm_get(\"customer:101\")"
      ],
      "expectedOutput": "Tier-1 Prime",
      "explanation": "MemTable retrieves updated value in O(1)."
    }
  ]
};
