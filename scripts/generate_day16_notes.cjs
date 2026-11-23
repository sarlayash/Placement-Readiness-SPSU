const fs = require('fs');
const path = require('path');

const notes = [
  {
    id: 'd16-note-1',
    title: 'Distributed Commit Logs, Zero-Copy I/O & Partitioned Consumer Architecture (Kafka Model)',
    conceptSummary:
      'High-throughput distributed event streaming systems like Apache Kafka decouple producers and consumers through an append-only commit log divided into ordered, immutable partitions. Disk writes are sequential, yielding mechanical drive speeds comparable to sequential memory access. Throughput is maximized by bypassing OS user space via the Linux `sendfile` system call (Zero-Copy), transferring page-cache pages directly to the network socket without CPU data copying. Consumers track progress independently via 64-bit monotonically increasing offsets, enabling distributed rebalancing protocols and horizontal consumer group scaling.',
    timeSpaceNote: 'Time Complexity: O(1) sequential append and offset lookup. Space Complexity: O(1) in-memory buffer overhead + bounded disk segment size.',
    kapilMentorTip:
      'Kapil Streaming System Invariant: Remember why Kafka is fast: (1) Sequential I/O on disk, (2) OS Page Cache utilization without Java GC overhead, and (3) Zero-Copy sendfile. In interviews, when asked how to scale from 10k to 10M events/sec, never suggest adding locks or threads—partition the log by customer key and let independent consumer workers poll separate partitions in parallel.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_PARTITIONS 4
#define MAX_RECORDS 100

typedef struct {
    long long offset;
    char key[32];
    char payload[64];
} LogRecord;

typedef struct {
    LogRecord records[MAX_RECORDS];
    int count;
    long long next_offset;
} PartitionLog;

typedef struct {
    PartitionLog partitions[MAX_PARTITIONS];
} TopicCluster;

void topic_init(TopicCluster* tc) {
    for (int p = 0; p < MAX_PARTITIONS; ++p) {
        tc->partitions[p].count = 0;
        tc->partitions[p].next_offset = 0;
    }
}

long long append_record(TopicCluster* tc, int partition_id, const char* key, const char* payload) {
    if (partition_id < 0 || partition_id >= MAX_PARTITIONS) return -1;
    PartitionLog* pl = &tc->partitions[partition_id];
    if (pl->count >= MAX_RECORDS) return -1;
    long long off = pl->next_offset++;
    pl->records[pl->count].offset = off;
    strncpy(pl->records[pl->count].key, key, 31);
    strncpy(pl->records[pl->count].payload, payload, 63);
    pl->count++;
    return off;
}

int main(void) {
    TopicCluster cluster;
    topic_init(&cluster);
    long long off1 = append_record(&cluster, 0, "order-991", "STATUS_CREATED");
    long long off2 = append_record(&cluster, 0, "order-992", "STATUS_PAID");
    printf("Partition 0 Appended Offset 1: %lld, Offset 2: %lld\\n", off1, off2);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <memory>

struct LogRecord {
    int64_t offset;
    std::string key;
    std::string payload;
};

class PartitionLog {
private:
    std::vector<LogRecord> log_;
    int64_t nextOffset_ = 0;

public:
    int64_t append(const std::string& key, const std::string& payload) {
        int64_t off = nextOffset_++;
        log_.push_back({off, key, payload});
        return off;
    }

    const LogRecord* readAt(int64_t offset) const {
        if (offset < 0 || offset >= static_cast<int64_t>(log_.size())) return nullptr;
        return &log_[offset];
    }
};

int main() {
    PartitionLog partition;
    auto off1 = partition.append("user-42", "CLICK_EVENT");
    auto off2 = partition.append("user-42", "PURCHASE_EVENT");
    std::cout << "Recorded sequential offsets: " << off1 << " and " << off2 << std::endl;
    return 0;
}`,
      java: `package com.faang.streaming;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

public class PartitionedEventLog {
    public static class Record {
        public final long offset;
        public final String key;
        public final String payload;

        public Record(long offset, String key, String payload) {
            this.offset = offset;
            this.key = key;
            this.payload = payload;
        }
    }

    private final List<Record> records = new ArrayList<>();
    private final AtomicLong nextOffset = new AtomicLong(0);

    public synchronized long append(String key, String payload) {
        long offset = nextOffset.getAndIncrement();
        records.add(new Record(offset, key, payload));
        return offset;
    }

    public synchronized Record read(long offset) {
        if (offset < 0 || offset >= records.size()) return null;
        return records.get((int) offset);
    }

    public static void main(String[] args) {
        PartitionedEventLog log = new PartitionedEventLog();
        long o1 = log.append("trade-101", "BUY AAPL 150");
        long o2 = log.append("trade-102", "SELL GOOG 2800");
        System.out.println("Committed offsets: " + o1 + ", " + o2);
    }
}`,
      python: `class PartitionLog:
    def __init__(self):
        self.records = []
        self.next_offset = 0

    def append(self, key: str, payload: str) -> int:
        offset = self.next_offset
        self.next_offset += 1
        self.records.append({"offset": offset, "key": key, "payload": payload})
        return offset

    def read_at(self, offset: int):
        if 0 <= offset < len(self.records):
            return self.records[offset]
        return None

if __name__ == "__main__":
    pl = PartitionLog()
    o1 = pl.append("auth-token", "LOGIN_SUCCESS")
    o2 = pl.append("auth-token", "ACCESS_RESOURCE")
    print(f"Log offsets: {o1}, {o2}")`
    }
  },
  {
    id: 'd16-note-2',
    title: 'High-Dimensional Vector Embeddings & Vector Similarity Search (HNSW / Cosine Retrieval)',
    conceptSummary:
      'In modern AI and LLM architectures (Retrieval-Augmented Generation / RAG), documents and queries are projected into dense high-dimensional vectors (e.g. 512–1536 dimensions). Exact brute-force K-Nearest Neighbors (KNN) requires O(N * D) comparisons, which becomes prohibitive across millions of vectors. Approximate Nearest Neighbor (ANN) search solves this using Hierarchical Navigable Small World (HNSW) graphs. HNSW constructs multi-layer proximity skip-graphs: higher layers perform long-distance skip-jumps to locate the cluster neighborhood, and lower layers perform fine-grained greedy local searches, reducing similarity query latency from O(N) to O(log N).',
    timeSpaceNote: 'Time Complexity: O(log N * D) per vector query with HNSW vs O(N * D) for brute force. Space Complexity: O(N * M * D) for graph edges and vector storage.',
    kapilMentorTip:
      'Kapil Vector Retrieval Rule: For normalized embedding vectors (magnitude = 1), Dot Product and Cosine Similarity are mathematically identical: cos(A, B) = A • B. Pre-normalizing embeddings at indexing time converts an expensive square root and divide operation into a blazing-fast SIMD vector dot product.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <math.h>

#define DIM 4

double cosine_similarity(const double* a, const double* b, int d) {
    double dot = 0.0, norm_a = 0.0, norm_b = 0.0;
    for (int i = 0; i < d; ++i) {
        dot += a[i] * b[i];
        norm_a += a[i] * a[i];
        norm_b += b[i] * b[i];
    }
    double denom = sqrt(norm_a) * sqrt(norm_b);
    return denom < 1e-9 ? 0.0 : dot / denom;
}

int main(void) {
    double query[DIM] = {0.2, 0.8, 0.5, 0.1};
    double doc1[DIM] = {0.25, 0.75, 0.6, 0.05};
    double sim = cosine_similarity(query, doc1, DIM);
    printf("Vector Cosine Similarity: %.4f\\n", sim);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

double cosineSimilarity(const std::vector<double>& a, const std::vector<double>& b) {
    double dot = 0.0, normA = 0.0, normB = 0.0;
    for (size_t i = 0; i < a.size(); ++i) {
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }
    double denom = std::sqrt(normA) * std::sqrt(normB);
    return denom < 1e-9 ? 0.0 : dot / denom;
}

int main() {
    std::vector<double> query = {0.1, 0.9, 0.4};
    std::vector<double> candidate = {0.15, 0.85, 0.5};
    std::cout << "Cosine Similarity: " << cosineSimilarity(query, candidate) << std::endl;
    return 0;
}`,
      java: `package com.faang.ai;

public class VectorSimilarity {
    public static double cosineSimilarity(double[] a, double[] b) {
        double dot = 0.0, normA = 0.0, normB = 0.0;
        for (int i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }
        double denom = Math.sqrt(normA) * Math.sqrt(normB);
        return denom < 1e-9 ? 0.0 : dot / denom;
    }

    public static void main(String[] args) {
        double[] q = {0.5, 0.5, 0.5, 0.5};
        double[] d = {0.5, 0.5, 0.5, 0.5};
        System.out.printf("Exact Match Score: %.4f%n", cosineSimilarity(q, d));
    }
}`,
      python: `import math

def cosine_similarity(a: list, b: list) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(y * y for y in b))
    denom = norm_a * norm_b
    return dot / denom if denom > 1e-9 else 0.0

if __name__ == "__main__":
    q = [0.1, 0.5, 0.8]
    doc = [0.2, 0.4, 0.9]
    print(f"Similarity Score: {cosine_similarity(q, doc):.4f}")`
    }
  },
  {
    id: 'd16-note-3',
    title: 'Log-Structured Merge-Trees (LSM-Tree), MemTable, WAL & SSTable Compaction',
    conceptSummary:
      'LSM-Trees power modern write-heavy storage engines like RocksDB, Google Bigtable, Apache Cassandra, and ScyllaDB. Writes are appended to an on-disk Write-Ahead Log (WAL) for durability and inserted into an in-memory sorted structure called the MemTable (typically a Red-Black Tree or SkipList). When the MemTable exceeds size threshold (e.g. 64MB), it is flushed to disk as an immutable Sorted String Table (SSTable) accompanied by an in-memory Bloom Filter. Reads check the MemTable first, then scan SSTables in reverse chronological order using Bloom Filters to skip SSTables that definitely do not contain the target key. Background compaction merges overlapping SSTables into sorted runs, removing tombstones (deletions) and consolidating versions.',
    timeSpaceNote: 'Time Complexity: O(1) sequential write, O(log N) MemTable insert, O(log N) SSTable binary search + Bloom Filter O(K) check. Space Complexity: O(N) disk storage.',
    kapilMentorTip:
      'Kapil Storage Engine Philosophy: Traditional B-Trees perform in-place updates, causing random I/O writes that destroy SSD endurance and latency bounds. LSM-Trees convert every write into sequential I/O. The trade-off is Read Amplification and Compaction I/O—which is why Bloom Filters and multi-level leveled compaction are essential topics in FAANG systems rounds.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_ENTRIES 32

typedef struct {
    char key[32];
    char value[64];
    int is_deleted;
} MemEntry;

typedef struct {
    MemEntry entries[MAX_ENTRIES];
    int count;
} MemTable;

void memtable_put(MemTable* mt, const char* key, const char* val) {
    for (int i = 0; i < mt->count; ++i) {
        if (strcmp(mt->entries[i].key, key) == 0) {
            strncpy(mt->entries[i].value, val, 63);
            mt->entries[i].is_deleted = 0;
            return;
        }
    }
    if (mt->count < MAX_ENTRIES) {
        strncpy(mt->entries[mt->count].key, key, 31);
        strncpy(mt->entries[mt->count].value, val, 63);
        mt->entries[mt->count].is_deleted = 0;
        mt->count++;
    }
}

int main(void) {
    MemTable mt = { .count = 0 };
    memtable_put(&mt, "user:101", "Alice");
    memtable_put(&mt, "user:102", "Bob");
    printf("MemTable active count: %d\\n", mt.count);
    return 0;
}`,
      cpp: `#include <iostream>
#include <map>
#include <string>
#include <optional>

class SimpleMemTable {
private:
    std::map<std::string, std::string> table_;

public:
    void put(const std::string& key, const std::string& value) {
        table_[key] = value;
    }

    std::optional<std::string> get(const std::string& key) const {
        auto it = table_.find(key);
        if (it != table_.end()) return it->second;
        return std::nullopt;
    }

    size_t size() const { return table_.size(); }
};

int main() {
    SimpleMemTable memTable;
    memTable.put("session:xyz", "ACTIVE");
    auto res = memTable.get("session:xyz");
    std::cout << "Retrieved key status: " << (res ? *res : "NOT_FOUND") << std::endl;
    return 0;
}`,
      java: `package com.faang.storage;

import java.util.concurrent.ConcurrentSkipListMap;

public class LSMStorageEngine {
    private final ConcurrentSkipListMap<String, String> memTable = new ConcurrentSkipListMap<>();

    public void put(String key, String value) {
        // In real systems, append to WAL first, then insert into MemTable
        memTable.put(key, value);
    }

    public String get(String key) {
        return memTable.get(key);
    }

    public static void main(String[] args) {
        LSMStorageEngine engine = new LSMStorageEngine();
        engine.put("order:4001", "PAID");
        System.out.println("Read from MemTable: " + engine.get("order:4001"));
    }
}`,
      python: `class MemTable:
    def __init__(self):
        self.data = {}

    def put(self, key: str, value: str):
        self.data[key] = value

    def get(self, key: str):
        return self.data.get(key, None)

if __name__ == "__main__":
    mt = MemTable()
    mt.put("cache:k1", "v1")
    print("MemTable Lookup:", mt.get("cache:k1"))`
    }
  },
  {
    id: 'd16-note-4',
    title: 'Real-Time Stream Processing: Event-Time, Watermarks & Exactly-Once Semantics (EOS)',
    conceptSummary:
      'Real-time streaming engines (Apache Flink, Spark Streaming, Kafka Streams) process unbounded streams of data. The critical distinction is Event-Time (the timestamp when the event actually occurred on the client device) versus Processing-Time (the clock of the worker node processing the event). Because mobile devices encounter network jitter and offline buffering, events arrive out of order. Streaming engines handle this via Watermarks—a monotonic metric representing progress in event time (e.g. "We are confident all events with timestamp <= T have arrived"). Tumbling windows aggregate events in fixed non-overlapping intervals, while sliding windows capture moving trends. Exactly-Once Processing (EOS) is achieved using Two-Phase Commit between the stream state checkpoint and the sink log.',
    timeSpaceNote: 'Time Complexity: O(1) per event insert into active window buffer, O(W) window emission. Space Complexity: O(active_window_keys).',
    kapilMentorTip:
      'Kapil Streaming Question Strategy: When interviewers ask: "How do you count active users per minute when some clients submit events 10 minutes late?", immediately introduce Watermarks with a Late Data Bound: "We set a watermark latency threshold of 2 minutes. Any event arriving within 2 minutes of window closure is merged into the window; events older than 2 minutes are rerouted to a Dead-Letter Queue (DLQ) for side-output correction."',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    long long window_start_sec;
    long long window_end_sec;
    int event_count;
} TumblingWindow;

void process_event(TumblingWindow* win, long long event_timestamp_sec) {
    if (event_timestamp_sec >= win->window_start_sec && event_timestamp_sec < win->window_end_sec) {
        win->event_count++;
    }
}

int main(void) {
    TumblingWindow win = { .window_start_sec = 0, .window_end_sec = 60, .event_count = 0 };
    process_event(&win, 15);
    process_event(&win, 45);
    process_event(&win, 75); // outside window
    printf("Window [0-60s] Total Events: %d\\n", win.event_count);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>

struct Event {
    int64_t timestamp;
    int value;
};

class TumblingWindowAggregator {
private:
    int64_t windowSizeSec_;
    std::map<int64_t, int> windowCounts_;

public:
    explicit TumblingWindowAggregator(int64_t windowSizeSec) : windowSizeSec_(windowSizeSec) {}

    void addEvent(int64_t timestamp) {
        int64_t windowStart = (timestamp / windowSizeSec_) * windowSizeSec_;
        windowCounts_[windowStart]++;
    }

    int getWindowCount(int64_t windowStart) {
        return windowCounts_[windowStart];
    }
};

int main() {
    TumblingWindowAggregator agg(60);
    agg.addEvent(12);
    agg.addEvent(58);
    agg.addEvent(65);
    std::cout << "Window 0-60s Count: " << agg.getWindowCount(0) << std::endl;
    std::cout << "Window 60-120s Count: " << agg.getWindowCount(60) << std::endl;
    return 0;
}`,
      java: `package com.faang.streaming;

import java.util.HashMap;
import java.util.Map;

public class TumblingWindowStream {
    private final long windowSizeMs;
    private final Map<Long, Integer> windowCounts = new HashMap<>();

    public TumblingWindowStream(long windowSizeMs) {
        this.windowSizeMs = windowSizeMs;
    }

    public synchronized void recordEvent(long eventTimestampMs) {
        long bucket = (eventTimestampMs / windowSizeMs) * windowSizeMs;
        windowCounts.put(bucket, windowCounts.getOrDefault(bucket, 0) + 1);
    }

    public synchronized int getCount(long windowStartMs) {
        return windowCounts.getOrDefault(windowStartMs, 0);
    }

    public static void main(String[] args) {
        TumblingWindowStream stream = new TumblingWindowStream(60000);
        stream.recordEvent(15000);
        stream.recordEvent(45000);
        System.out.println("Events in First Minute: " + stream.getCount(0));
    }
}`,
      python: `class TumblingWindowStream:
    def __init__(self, window_size_sec: int):
        self.window_size = window_size_sec
        self.windows = {}

    def ingest(self, timestamp: int):
        bucket = (timestamp // self.window_size) * self.window_size
        self.windows[bucket] = self.windows.get(bucket, 0) + 1

    def get_count(self, bucket: int) -> int:
        return self.windows.get(bucket, 0)

if __name__ == "__main__":
    tws = TumblingWindowStream(60)
    tws.ingest(10)
    tws.ingest(40)
    print("Window 0 count:", tws.get_count(0))`
    }
  }
];

const fileContent = `import { ProgrammingNote } from '../types';

export const DAY_16_PROGRAMMING_NOTES: ProgrammingNote[] = ${JSON.stringify(notes, null, 2)};
`;

const targetPath = path.join(__dirname, '../src/data/day16ProgrammingNotes.ts');
fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log('Successfully generated src/data/day16ProgrammingNotes.ts with 4 comprehensive notes.');
