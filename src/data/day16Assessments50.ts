import { AssessmentQuestion } from '../types';

export const DAY_16_PRE_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d16-pre-1",
    "question": "In Apache Kafka architecture, how does an append-only commit log achieve write throughput comparable to random memory writes?",
    "options": [
      "It runs entirely on GPU cores",
      "Sequential disk I/O eliminates mechanical seek overhead and leverages OS page cache readahead and background flushing",
      "It avoids writing to physical storage",
      "It compresses data using lossy MP3 compression"
    ],
    "correctIndex": 1,
    "explanation": "Sequential disk write throughput is orders of magnitude faster than random I/O and matches sequential memory access speeds when backed by kernel page cache.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-2",
    "question": "What is the role of the Linux `sendfile` system call (Zero-Copy) in high-throughput event streaming brokers?",
    "options": [
      "It encrypts data before transmission",
      "It transfers data directly from OS page-cache memory pages to the network socket buffer, bypassing intermediate copying to user-space memory and reducing context switches",
      "It converts JSON to XML automatically",
      "It restarts crashed brokers"
    ],
    "correctIndex": 1,
    "explanation": "Zero-Copy sendfile avoids copying bytes into Java/user-space buffers, cutting CPU cycles and context switches down to zero data copy passes.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-3",
    "question": "In an LSM-Tree (Log-Structured Merge-Tree) storage engine, what is the role of the Write-Ahead Log (WAL)?",
    "options": [
      "It provides O(1) random key reads",
      "It guarantees write durability on disk before or concurrent with inserting into the in-memory MemTable, enabling complete crash recovery if power fails",
      "It stores deleted keys permanently",
      "It compresses vector embeddings"
    ],
    "correctIndex": 1,
    "explanation": "The WAL records every mutation sequentially on disk. If the node crashes, the volatile MemTable is reconstructed by replaying the WAL from the last checkpoint.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-4",
    "question": "Why are Bloom Filters paired with SSTables (Sorted String Tables) in storage engines like RocksDB and Cassandra?",
    "options": [
      "To sort keys alphabetically",
      "To determine with 100% confidence if a key is definitely NOT present in an SSTable, preventing expensive unnecessary disk seeks",
      "To encrypt database passwords",
      "To calculate vector cosine distances"
    ],
    "correctIndex": 1,
    "explanation": "Bloom Filters have zero false negatives. If the filter returns NO, the engine skips reading that SSTable from disk entirely.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-5",
    "question": "In vector retrieval systems for LLM embeddings (RAG), what fundamental problem does Approximate Nearest Neighbor (ANN) solve over exact K-Nearest Neighbors (KNN)?",
    "options": [
      "It eliminates vector quantization",
      "Exact KNN requires O(N * D) brute-force distance calculations across all documents, whereas ANN constructs graph/index structures (e.g. HNSW) that achieve O(log N) query latency with >95% recall",
      "It converts floats into strings",
      "It generates synthetic vectors"
    ],
    "correctIndex": 1,
    "explanation": "Brute-force vector distance across millions of 1536-dimensional vectors is computationally intractable for interactive queries. ANN achieves sub-10ms search via proximity graphs.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-6",
    "question": "In Hierarchical Navigable Small World (HNSW) vector graphs, what is the purpose of multi-layer graph skip-lists?",
    "options": [
      "To support multi-threaded database transactions",
      "Higher layers contain sparse long-range highway edges to skip across the vector space quickly, while lower layers contain dense local edges for fine-grained nearest neighbor convergence",
      "To encrypt vector coordinates",
      "To reduce memory consumption to zero"
    ],
    "correctIndex": 1,
    "explanation": "Multi-layer HNSW mimics skip-lists in high-dimensional geometric spaces, achieving logarithmic routing to the query vector cluster.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-7",
    "question": "What is the primary difference between Event-Time and Processing-Time in distributed stream processing frameworks like Apache Flink?",
    "options": [
      "Event-time is measured in days while processing-time is measured in seconds",
      "Event-time is the wall-clock timestamp when the event was generated on the source device, whereas processing-time is the local clock time of the cluster node processing the event",
      "Event-time is only for batch jobs",
      "Processing-time is strictly deterministic across replays"
    ],
    "correctIndex": 1,
    "explanation": "Event-time captures reality at the edge, independent of network delays, mobile disconnections, or queue backlogs.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-8",
    "question": "In stream processing, what is a \"Watermark\" with allowed lateness?",
    "options": [
      "A watermark is an image placed on PDF reports",
      "A monotonic timestamp marker in the stream declaring that the engine expects no subsequent events with event-time earlier than the watermark, triggering window evaluation",
      "A network bandwidth throttler",
      "A database foreign key constraint"
    ],
    "correctIndex": 1,
    "explanation": "Watermarks balance latency against completeness by signaling when windows can safely finalize calculations despite out-of-order event arrivals.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-9",
    "question": "In consumer group rebalancing protocols (e.g. Kafka StickyAssignor), what is the main drawback of Eager Rebalancing compared to Cooperative Sticky Rebalancing?",
    "options": [
      "Eager rebalancing requires no network traffic",
      "Eager rebalancing revokes ALL partitions from ALL consumers simultaneously (Stop-the-World pause), whereas Cooperative Sticky rebalancing only migrates reassigned partitions while unaffected consumers continue processing",
      "Eager rebalancing allows duplicate messages",
      "Cooperative rebalancing cannot scale beyond 2 workers"
    ],
    "correctIndex": 1,
    "explanation": "Eager rebalancing forces full partition revocation and re-assignment, creating consumer processing halts. Cooperative rebalancing performs incremental handoffs.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-10",
    "question": "In LSM-Tree compaction, what distinguishes \"Size-Tiered Compaction\" from \"Leveled Compaction\"?",
    "options": [
      "Size-tiered uses 10x more CPU",
      "Size-tiered merges SSTables of similar sizes into larger SSTables (ideal for write-heavy workloads), while Leveled compaction divides disk into exponential levels with non-overlapping key ranges per level (ideal for low read amplification)",
      "Leveled compaction does not use disk",
      "Size-tiered does not delete tombstones"
    ],
    "correctIndex": 1,
    "explanation": "Leveled compaction guarantees that keys exist in at most one SSTable per level (except Level 0), drastically minimizing read amplification at the cost of higher write amplification.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-11",
    "question": "When indexing normalized embedding vectors for Cosine Similarity search, what optimization reduces distance computation by half?",
    "options": [
      "Inverting the vector coordinates",
      "When vectors are L2-normalized (magnitude = 1), Cosine Similarity simplifies to the Dot Product (sum(a_i * b_i)), avoiding two square roots and division per comparison",
      "Rounding all floats to 0",
      "Dropping odd-numbered dimensions"
    ],
    "correctIndex": 1,
    "explanation": "For unit vectors, ||A|| = 1 and ||B|| = 1, so (A • B) / (||A|| * ||B||) = A • B. A single dot product yields the exact cosine similarity.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-12",
    "question": "In a distributed commit log, what ensures that consumer offsets are stored reliably and survive broker restarts?",
    "options": [
      "Offsets are stored in consumer browser cookies",
      "Offsets are committed as standard messages to an internal, compacted, multi-replicated system topic (`__consumer_offsets`)",
      "Offsets are written to an external FTP server",
      "Offsets are never stored; consumers always re-read from offset 0"
    ],
    "correctIndex": 1,
    "explanation": "Consumer offsets are persisted in Kafka's internal compacted topic `__consumer_offsets`, benefiting from cluster replication, partition leader election, and log compaction.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-13",
    "question": "What is a \"Tombstone\" in distributed key-value databases and LSM storage engines?",
    "options": [
      "A marker indicating that a server has permanently died",
      "A deletion marker with a timestamp indicating that a key was deleted; it suppresses older versions during reads until finalized during SSTable compaction",
      "An encryption key used for secure storage",
      "A metric that counts database queries"
    ],
    "correctIndex": 1,
    "explanation": "Because LSM-Tree files are immutable, deletions cannot mutate disk in place. A tombstone record is appended to mask the key until garbage collected during compaction.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-14",
    "question": "What is \"Exactly-Once Semantics\" (EOS) in distributed streaming architectures (e.g., Kafka Streams / Flink)?",
    "options": [
      "The network cable sends electrons only once",
      "Each input record is processed and updates state and output sinks exactly once effectively, achieved via idempotent producers and transactional atomic commits between checkpoints and offsets",
      "The program crashes after processing one event",
      "Events can never be replayed"
    ],
    "correctIndex": 1,
    "explanation": "EOS ensures that despite retries, network disconnects, or broker failovers, consumer state updates and output events reflect each input record exactly once.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-15",
    "question": "In vector databases, what is \"Scalar Quantization\" (SQ) and how does it reduce memory footprints?",
    "options": [
      "It deletes half of the vectors",
      "It compresses 32-bit floating point vector dimensions (float32) into 8-bit integers (int8), reducing RAM consumption by 75% with minimal degradation in search recall",
      "It converts vectors into SQL tables",
      "It replaces floating point numbers with emojis"
    ],
    "correctIndex": 1,
    "explanation": "SQ maps the continuous range of vector dimensions into discrete 8-bit bins (0–255), cutting RAM consumption from 4 bytes to 1 byte per dimension while maintaining high ranking accuracy.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-pre-16",
    "question": "[Engine Trace #16] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-16\" with hash code 272. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P0, offset 1",
      "Partition P1, offset 2",
      "Partition P0, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (272) % 4 = P0. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-17",
    "question": "[Engine Trace #17] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-17\" with hash code 289. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P1, offset 2",
      "Partition P2, offset 3",
      "Partition P1, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (289) % 4 = P1. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-18",
    "question": "[Engine Trace #18] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-18\" with hash code 306. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P2, offset 3",
      "Partition P3, offset 4",
      "Partition P2, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (306) % 4 = P2. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-19",
    "question": "[Engine Trace #19] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-19\" with hash code 323. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P3, offset 0",
      "Partition P0, offset 1",
      "Partition P3, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (323) % 4 = P3. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-20",
    "question": "[Engine Trace #20] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-20\" with hash code 340. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P0, offset 1",
      "Partition P1, offset 2",
      "Partition P0, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (340) % 4 = P0. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-21",
    "question": "[Engine Trace #21] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-21\" with hash code 357. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P1, offset 2",
      "Partition P2, offset 3",
      "Partition P1, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (357) % 4 = P1. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-22",
    "question": "[Engine Trace #22] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-22\" with hash code 374. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P2, offset 3",
      "Partition P3, offset 4",
      "Partition P2, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (374) % 4 = P2. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-23",
    "question": "[Engine Trace #23] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-23\" with hash code 391. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P3, offset 0",
      "Partition P0, offset 1",
      "Partition P3, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (391) % 4 = P3. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-24",
    "question": "[Engine Trace #24] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-24\" with hash code 408. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P0, offset 1",
      "Partition P1, offset 2",
      "Partition P0, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (408) % 4 = P0. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-25",
    "question": "[Engine Trace #25] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-25\" with hash code 425. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P1, offset 2",
      "Partition P2, offset 3",
      "Partition P1, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (425) % 4 = P1. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-26",
    "question": "[Engine Trace #26] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-26\" with hash code 442. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P2, offset 3",
      "Partition P3, offset 4",
      "Partition P2, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (442) % 4 = P2. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-27",
    "question": "[Engine Trace #27] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-27\" with hash code 459. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P3, offset 0",
      "Partition P0, offset 1",
      "Partition P3, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (459) % 4 = P3. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-28",
    "question": "[Engine Trace #28] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-28\" with hash code 476. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P0, offset 1",
      "Partition P1, offset 2",
      "Partition P0, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (476) % 4 = P0. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-29",
    "question": "[Engine Trace #29] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-29\" with hash code 493. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P1, offset 2",
      "Partition P2, offset 3",
      "Partition P1, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (493) % 4 = P1. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-30",
    "question": "[Engine Trace #30] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-30\" with hash code 510. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P2, offset 3",
      "Partition P3, offset 4",
      "Partition P2, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (510) % 4 = P2. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-31",
    "question": "[Engine Trace #31] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-31\" with hash code 527. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P3, offset 0",
      "Partition P0, offset 1",
      "Partition P3, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (527) % 4 = P3. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-32",
    "question": "[Engine Trace #32] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-32\" with hash code 544. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P0, offset 1",
      "Partition P1, offset 2",
      "Partition P0, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (544) % 4 = P0. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-33",
    "question": "[Engine Trace #33] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-33\" with hash code 561. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P1, offset 2",
      "Partition P2, offset 3",
      "Partition P1, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (561) % 4 = P1. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-34",
    "question": "[Engine Trace #34] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-34\" with hash code 578. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P2, offset 3",
      "Partition P3, offset 4",
      "Partition P2, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (578) % 4 = P2. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-35",
    "question": "[Engine Trace #35] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-35\" with hash code 595. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P3, offset 0",
      "Partition P0, offset 1",
      "Partition P3, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (595) % 4 = P3. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-36",
    "question": "[Engine Trace #36] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-36\" with hash code 612. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P0, offset 1",
      "Partition P1, offset 2",
      "Partition P0, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (612) % 4 = P0. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-37",
    "question": "[Engine Trace #37] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-37\" with hash code 629. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P1, offset 2",
      "Partition P2, offset 3",
      "Partition P1, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (629) % 4 = P1. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-38",
    "question": "[Engine Trace #38] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-38\" with hash code 646. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P2, offset 3",
      "Partition P3, offset 4",
      "Partition P2, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (646) % 4 = P2. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-39",
    "question": "[Engine Trace #39] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-39\" with hash code 663. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P3, offset 0",
      "Partition P0, offset 1",
      "Partition P3, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (663) % 4 = P3. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-40",
    "question": "[Engine Trace #40] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-40\" with hash code 680. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P0, offset 1",
      "Partition P1, offset 2",
      "Partition P0, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (680) % 4 = P0. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-41",
    "question": "[Engine Trace #41] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-41\" with hash code 697. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P1, offset 2",
      "Partition P2, offset 3",
      "Partition P1, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (697) % 4 = P1. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-42",
    "question": "[Engine Trace #42] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-42\" with hash code 714. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P2, offset 3",
      "Partition P3, offset 4",
      "Partition P2, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (714) % 4 = P2. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-43",
    "question": "[Engine Trace #43] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-43\" with hash code 731. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P3, offset 0",
      "Partition P0, offset 1",
      "Partition P3, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (731) % 4 = P3. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-44",
    "question": "[Engine Trace #44] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-44\" with hash code 748. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P0, offset 1",
      "Partition P1, offset 2",
      "Partition P0, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (748) % 4 = P0. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-45",
    "question": "[Engine Trace #45] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-45\" with hash code 765. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P1, offset 2",
      "Partition P2, offset 3",
      "Partition P1, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (765) % 4 = P1. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-46",
    "question": "[Engine Trace #46] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-46\" with hash code 782. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P2, offset 3",
      "Partition P3, offset 4",
      "Partition P2, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (782) % 4 = P2. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-47",
    "question": "[Engine Trace #47] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-47\" with hash code 799. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P3, offset 0",
      "Partition P0, offset 1",
      "Partition P3, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (799) % 4 = P3. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-48",
    "question": "[Engine Trace #48] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-48\" with hash code 816. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P0, offset 1",
      "Partition P1, offset 2",
      "Partition P0, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (816) % 4 = P0. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-49",
    "question": "[Engine Trace #49] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-49\" with hash code 833. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P1, offset 2",
      "Partition P2, offset 3",
      "Partition P1, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (833) % 4 = P1. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-pre-50",
    "question": "[Engine Trace #50] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-50\" with hash code 850. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P2, offset 3",
      "Partition P3, offset 4",
      "Partition P2, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (850) % 4 = P2. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  }
];

export const DAY_16_POST_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d16-post-1",
    "question": "In Apache Kafka architecture, how does an append-only commit log achieve write throughput comparable to random memory writes?",
    "options": [
      "It runs entirely on GPU cores",
      "Sequential disk I/O eliminates mechanical seek overhead and leverages OS page cache readahead and background flushing",
      "It avoids writing to physical storage",
      "It compresses data using lossy MP3 compression"
    ],
    "correctIndex": 1,
    "explanation": "Sequential disk write throughput is orders of magnitude faster than random I/O and matches sequential memory access speeds when backed by kernel page cache.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-2",
    "question": "What is the role of the Linux `sendfile` system call (Zero-Copy) in high-throughput event streaming brokers?",
    "options": [
      "It encrypts data before transmission",
      "It transfers data directly from OS page-cache memory pages to the network socket buffer, bypassing intermediate copying to user-space memory and reducing context switches",
      "It converts JSON to XML automatically",
      "It restarts crashed brokers"
    ],
    "correctIndex": 1,
    "explanation": "Zero-Copy sendfile avoids copying bytes into Java/user-space buffers, cutting CPU cycles and context switches down to zero data copy passes.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-3",
    "question": "In an LSM-Tree (Log-Structured Merge-Tree) storage engine, what is the role of the Write-Ahead Log (WAL)?",
    "options": [
      "It provides O(1) random key reads",
      "It guarantees write durability on disk before or concurrent with inserting into the in-memory MemTable, enabling complete crash recovery if power fails",
      "It stores deleted keys permanently",
      "It compresses vector embeddings"
    ],
    "correctIndex": 1,
    "explanation": "The WAL records every mutation sequentially on disk. If the node crashes, the volatile MemTable is reconstructed by replaying the WAL from the last checkpoint.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-4",
    "question": "Why are Bloom Filters paired with SSTables (Sorted String Tables) in storage engines like RocksDB and Cassandra?",
    "options": [
      "To sort keys alphabetically",
      "To determine with 100% confidence if a key is definitely NOT present in an SSTable, preventing expensive unnecessary disk seeks",
      "To encrypt database passwords",
      "To calculate vector cosine distances"
    ],
    "correctIndex": 1,
    "explanation": "Bloom Filters have zero false negatives. If the filter returns NO, the engine skips reading that SSTable from disk entirely.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-5",
    "question": "In vector retrieval systems for LLM embeddings (RAG), what fundamental problem does Approximate Nearest Neighbor (ANN) solve over exact K-Nearest Neighbors (KNN)?",
    "options": [
      "It eliminates vector quantization",
      "Exact KNN requires O(N * D) brute-force distance calculations across all documents, whereas ANN constructs graph/index structures (e.g. HNSW) that achieve O(log N) query latency with >95% recall",
      "It converts floats into strings",
      "It generates synthetic vectors"
    ],
    "correctIndex": 1,
    "explanation": "Brute-force vector distance across millions of 1536-dimensional vectors is computationally intractable for interactive queries. ANN achieves sub-10ms search via proximity graphs.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-6",
    "question": "In Hierarchical Navigable Small World (HNSW) vector graphs, what is the purpose of multi-layer graph skip-lists?",
    "options": [
      "To support multi-threaded database transactions",
      "Higher layers contain sparse long-range highway edges to skip across the vector space quickly, while lower layers contain dense local edges for fine-grained nearest neighbor convergence",
      "To encrypt vector coordinates",
      "To reduce memory consumption to zero"
    ],
    "correctIndex": 1,
    "explanation": "Multi-layer HNSW mimics skip-lists in high-dimensional geometric spaces, achieving logarithmic routing to the query vector cluster.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-7",
    "question": "What is the primary difference between Event-Time and Processing-Time in distributed stream processing frameworks like Apache Flink?",
    "options": [
      "Event-time is measured in days while processing-time is measured in seconds",
      "Event-time is the wall-clock timestamp when the event was generated on the source device, whereas processing-time is the local clock time of the cluster node processing the event",
      "Event-time is only for batch jobs",
      "Processing-time is strictly deterministic across replays"
    ],
    "correctIndex": 1,
    "explanation": "Event-time captures reality at the edge, independent of network delays, mobile disconnections, or queue backlogs.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-8",
    "question": "In stream processing, what is a \"Watermark\" with allowed lateness?",
    "options": [
      "A watermark is an image placed on PDF reports",
      "A monotonic timestamp marker in the stream declaring that the engine expects no subsequent events with event-time earlier than the watermark, triggering window evaluation",
      "A network bandwidth throttler",
      "A database foreign key constraint"
    ],
    "correctIndex": 1,
    "explanation": "Watermarks balance latency against completeness by signaling when windows can safely finalize calculations despite out-of-order event arrivals.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-9",
    "question": "In consumer group rebalancing protocols (e.g. Kafka StickyAssignor), what is the main drawback of Eager Rebalancing compared to Cooperative Sticky Rebalancing?",
    "options": [
      "Eager rebalancing requires no network traffic",
      "Eager rebalancing revokes ALL partitions from ALL consumers simultaneously (Stop-the-World pause), whereas Cooperative Sticky rebalancing only migrates reassigned partitions while unaffected consumers continue processing",
      "Eager rebalancing allows duplicate messages",
      "Cooperative rebalancing cannot scale beyond 2 workers"
    ],
    "correctIndex": 1,
    "explanation": "Eager rebalancing forces full partition revocation and re-assignment, creating consumer processing halts. Cooperative rebalancing performs incremental handoffs.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-10",
    "question": "In LSM-Tree compaction, what distinguishes \"Size-Tiered Compaction\" from \"Leveled Compaction\"?",
    "options": [
      "Size-tiered uses 10x more CPU",
      "Size-tiered merges SSTables of similar sizes into larger SSTables (ideal for write-heavy workloads), while Leveled compaction divides disk into exponential levels with non-overlapping key ranges per level (ideal for low read amplification)",
      "Leveled compaction does not use disk",
      "Size-tiered does not delete tombstones"
    ],
    "correctIndex": 1,
    "explanation": "Leveled compaction guarantees that keys exist in at most one SSTable per level (except Level 0), drastically minimizing read amplification at the cost of higher write amplification.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-11",
    "question": "When indexing normalized embedding vectors for Cosine Similarity search, what optimization reduces distance computation by half?",
    "options": [
      "Inverting the vector coordinates",
      "When vectors are L2-normalized (magnitude = 1), Cosine Similarity simplifies to the Dot Product (sum(a_i * b_i)), avoiding two square roots and division per comparison",
      "Rounding all floats to 0",
      "Dropping odd-numbered dimensions"
    ],
    "correctIndex": 1,
    "explanation": "For unit vectors, ||A|| = 1 and ||B|| = 1, so (A • B) / (||A|| * ||B||) = A • B. A single dot product yields the exact cosine similarity.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-12",
    "question": "In a distributed commit log, what ensures that consumer offsets are stored reliably and survive broker restarts?",
    "options": [
      "Offsets are stored in consumer browser cookies",
      "Offsets are committed as standard messages to an internal, compacted, multi-replicated system topic (`__consumer_offsets`)",
      "Offsets are written to an external FTP server",
      "Offsets are never stored; consumers always re-read from offset 0"
    ],
    "correctIndex": 1,
    "explanation": "Consumer offsets are persisted in Kafka's internal compacted topic `__consumer_offsets`, benefiting from cluster replication, partition leader election, and log compaction.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-13",
    "question": "What is a \"Tombstone\" in distributed key-value databases and LSM storage engines?",
    "options": [
      "A marker indicating that a server has permanently died",
      "A deletion marker with a timestamp indicating that a key was deleted; it suppresses older versions during reads until finalized during SSTable compaction",
      "An encryption key used for secure storage",
      "A metric that counts database queries"
    ],
    "correctIndex": 1,
    "explanation": "Because LSM-Tree files are immutable, deletions cannot mutate disk in place. A tombstone record is appended to mask the key until garbage collected during compaction.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-14",
    "question": "What is \"Exactly-Once Semantics\" (EOS) in distributed streaming architectures (e.g., Kafka Streams / Flink)?",
    "options": [
      "The network cable sends electrons only once",
      "Each input record is processed and updates state and output sinks exactly once effectively, achieved via idempotent producers and transactional atomic commits between checkpoints and offsets",
      "The program crashes after processing one event",
      "Events can never be replayed"
    ],
    "correctIndex": 1,
    "explanation": "EOS ensures that despite retries, network disconnects, or broker failovers, consumer state updates and output events reflect each input record exactly once.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-15",
    "question": "In vector databases, what is \"Scalar Quantization\" (SQ) and how does it reduce memory footprints?",
    "options": [
      "It deletes half of the vectors",
      "It compresses 32-bit floating point vector dimensions (float32) into 8-bit integers (int8), reducing RAM consumption by 75% with minimal degradation in search recall",
      "It converts vectors into SQL tables",
      "It replaces floating point numbers with emojis"
    ],
    "correctIndex": 1,
    "explanation": "SQ maps the continuous range of vector dimensions into discrete 8-bit bins (0–255), cutting RAM consumption from 4 bytes to 1 byte per dimension while maintaining high ranking accuracy.",
    "category": "Theory (30%)"
  },
  {
    "id": "d16-post-16",
    "question": "[Engine Trace #101] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-101\" with hash code 1717. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P1, offset 1",
      "Partition P2, offset 2",
      "Partition P1, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1717) % 4 = P1. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-17",
    "question": "[Engine Trace #102] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-102\" with hash code 1734. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P2, offset 2",
      "Partition P3, offset 3",
      "Partition P2, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1734) % 4 = P2. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-18",
    "question": "[Engine Trace #103] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-103\" with hash code 1751. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P3, offset 3",
      "Partition P0, offset 4",
      "Partition P3, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1751) % 4 = P3. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-19",
    "question": "[Engine Trace #104] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-104\" with hash code 1768. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P0, offset 0",
      "Partition P1, offset 1",
      "Partition P0, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1768) % 4 = P0. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-20",
    "question": "[Engine Trace #105] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-105\" with hash code 1785. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P1, offset 1",
      "Partition P2, offset 2",
      "Partition P1, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1785) % 4 = P1. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-21",
    "question": "[Engine Trace #106] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-106\" with hash code 1802. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P2, offset 2",
      "Partition P3, offset 3",
      "Partition P2, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1802) % 4 = P2. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-22",
    "question": "[Engine Trace #107] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-107\" with hash code 1819. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P3, offset 3",
      "Partition P0, offset 4",
      "Partition P3, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1819) % 4 = P3. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-23",
    "question": "[Engine Trace #108] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-108\" with hash code 1836. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P0, offset 0",
      "Partition P1, offset 1",
      "Partition P0, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1836) % 4 = P0. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-24",
    "question": "[Engine Trace #109] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-109\" with hash code 1853. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P1, offset 1",
      "Partition P2, offset 2",
      "Partition P1, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1853) % 4 = P1. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-25",
    "question": "[Engine Trace #110] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-110\" with hash code 1870. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P2, offset 2",
      "Partition P3, offset 3",
      "Partition P2, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1870) % 4 = P2. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-26",
    "question": "[Engine Trace #111] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-111\" with hash code 1887. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P3, offset 3",
      "Partition P0, offset 4",
      "Partition P3, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1887) % 4 = P3. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-27",
    "question": "[Engine Trace #112] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-112\" with hash code 1904. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P0, offset 0",
      "Partition P1, offset 1",
      "Partition P0, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1904) % 4 = P0. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-28",
    "question": "[Engine Trace #113] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-113\" with hash code 1921. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P1, offset 1",
      "Partition P2, offset 2",
      "Partition P1, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1921) % 4 = P1. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-29",
    "question": "[Engine Trace #114] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-114\" with hash code 1938. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P2, offset 2",
      "Partition P3, offset 3",
      "Partition P2, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1938) % 4 = P2. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-30",
    "question": "[Engine Trace #115] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-115\" with hash code 1955. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P3, offset 3",
      "Partition P0, offset 4",
      "Partition P3, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1955) % 4 = P3. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-31",
    "question": "[Engine Trace #116] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-116\" with hash code 1972. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P0, offset 0",
      "Partition P1, offset 1",
      "Partition P0, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1972) % 4 = P0. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-32",
    "question": "[Engine Trace #117] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-117\" with hash code 1989. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P1, offset 1",
      "Partition P2, offset 2",
      "Partition P1, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (1989) % 4 = P1. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-33",
    "question": "[Engine Trace #118] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-118\" with hash code 2006. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P2, offset 2",
      "Partition P3, offset 3",
      "Partition P2, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2006) % 4 = P2. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-34",
    "question": "[Engine Trace #119] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-119\" with hash code 2023. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P3, offset 3",
      "Partition P0, offset 4",
      "Partition P3, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2023) % 4 = P3. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-35",
    "question": "[Engine Trace #120] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-120\" with hash code 2040. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P0, offset 0",
      "Partition P1, offset 1",
      "Partition P0, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2040) % 4 = P0. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-36",
    "question": "[Engine Trace #121] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-121\" with hash code 2057. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P1, offset 1",
      "Partition P2, offset 2",
      "Partition P1, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2057) % 4 = P1. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-37",
    "question": "[Engine Trace #122] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-122\" with hash code 2074. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P2, offset 2",
      "Partition P3, offset 3",
      "Partition P2, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2074) % 4 = P2. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-38",
    "question": "[Engine Trace #123] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-123\" with hash code 2091. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P3, offset 3",
      "Partition P0, offset 4",
      "Partition P3, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2091) % 4 = P3. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-39",
    "question": "[Engine Trace #124] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-124\" with hash code 2108. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P0, offset 0",
      "Partition P1, offset 1",
      "Partition P0, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2108) % 4 = P0. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-40",
    "question": "[Engine Trace #125] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-125\" with hash code 2125. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P1, offset 1",
      "Partition P2, offset 2",
      "Partition P1, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2125) % 4 = P1. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-41",
    "question": "[Engine Trace #126] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-126\" with hash code 2142. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P2, offset 2",
      "Partition P3, offset 3",
      "Partition P2, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2142) % 4 = P2. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-42",
    "question": "[Engine Trace #127] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-127\" with hash code 2159. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P3, offset 3",
      "Partition P0, offset 4",
      "Partition P3, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2159) % 4 = P3. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-43",
    "question": "[Engine Trace #128] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-128\" with hash code 2176. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P0, offset 0",
      "Partition P1, offset 1",
      "Partition P0, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2176) % 4 = P0. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-44",
    "question": "[Engine Trace #129] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-129\" with hash code 2193. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P1, offset 1",
      "Partition P2, offset 2",
      "Partition P1, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2193) % 4 = P1. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-45",
    "question": "[Engine Trace #130] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-130\" with hash code 2210. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P2, offset 2",
      "Partition P3, offset 3",
      "Partition P2, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2210) % 4 = P2. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-46",
    "question": "[Engine Trace #131] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-131\" with hash code 2227. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P3, offset 3",
      "Partition P0, offset 4",
      "Partition P3, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2227) % 4 = P3. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-47",
    "question": "[Engine Trace #132] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-132\" with hash code 2244. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 0 records?",
    "options": [
      "Partition P0, offset 0",
      "Partition P1, offset 1",
      "Partition P0, offset 2",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2244) % 4 = P0. Next append offset in that partition is exactly 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-48",
    "question": "[Engine Trace #133] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-133\" with hash code 2261. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 1 records?",
    "options": [
      "Partition P1, offset 1",
      "Partition P2, offset 2",
      "Partition P1, offset 3",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2261) % 4 = P1. Next append offset in that partition is exactly 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-49",
    "question": "[Engine Trace #134] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-134\" with hash code 2278. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 2 records?",
    "options": [
      "Partition P2, offset 2",
      "Partition P3, offset 3",
      "Partition P2, offset 4",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2278) % 4 = P2. Next append offset in that partition is exactly 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d16-post-50",
    "question": "[Engine Trace #135] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key \"entity-135\" with hash code 2295. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained 3 records?",
    "options": [
      "Partition P3, offset 3",
      "Partition P0, offset 4",
      "Partition P3, offset 5",
      "Partition P0, offset 0"
    ],
    "correctIndex": 0,
    "explanation": "Partition = (2295) % 4 = P3. Next append offset in that partition is exactly 3.",
    "category": "Practical Execution & Trace (70%)"
  }
];
