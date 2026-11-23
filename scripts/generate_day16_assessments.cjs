const fs = require('fs');
const path = require('path');

const theoryPool = [
  {
    q: 'In Apache Kafka architecture, how does an append-only commit log achieve write throughput comparable to random memory writes?',
    opts: ['It runs entirely on GPU cores', 'Sequential disk I/O eliminates mechanical seek overhead and leverages OS page cache readahead and background flushing', 'It avoids writing to physical storage', 'It compresses data using lossy MP3 compression'],
    ans: 1,
    exp: 'Sequential disk write throughput is orders of magnitude faster than random I/O and matches sequential memory access speeds when backed by kernel page cache.'
  },
  {
    q: 'What is the role of the Linux `sendfile` system call (Zero-Copy) in high-throughput event streaming brokers?',
    opts: ['It encrypts data before transmission', 'It transfers data directly from OS page-cache memory pages to the network socket buffer, bypassing intermediate copying to user-space memory and reducing context switches', 'It converts JSON to XML automatically', 'It restarts crashed brokers'],
    ans: 1,
    exp: 'Zero-Copy sendfile avoids copying bytes into Java/user-space buffers, cutting CPU cycles and context switches down to zero data copy passes.'
  },
  {
    q: 'In an LSM-Tree (Log-Structured Merge-Tree) storage engine, what is the role of the Write-Ahead Log (WAL)?',
    opts: ['It provides O(1) random key reads', 'It guarantees write durability on disk before or concurrent with inserting into the in-memory MemTable, enabling complete crash recovery if power fails', 'It stores deleted keys permanently', 'It compresses vector embeddings'],
    ans: 1,
    exp: 'The WAL records every mutation sequentially on disk. If the node crashes, the volatile MemTable is reconstructed by replaying the WAL from the last checkpoint.'
  },
  {
    q: 'Why are Bloom Filters paired with SSTables (Sorted String Tables) in storage engines like RocksDB and Cassandra?',
    opts: ['To sort keys alphabetically', 'To determine with 100% confidence if a key is definitely NOT present in an SSTable, preventing expensive unnecessary disk seeks', 'To encrypt database passwords', 'To calculate vector cosine distances'],
    ans: 1,
    exp: 'Bloom Filters have zero false negatives. If the filter returns NO, the engine skips reading that SSTable from disk entirely.'
  },
  {
    q: 'In vector retrieval systems for LLM embeddings (RAG), what fundamental problem does Approximate Nearest Neighbor (ANN) solve over exact K-Nearest Neighbors (KNN)?',
    opts: ['It eliminates vector quantization', 'Exact KNN requires O(N * D) brute-force distance calculations across all documents, whereas ANN constructs graph/index structures (e.g. HNSW) that achieve O(log N) query latency with >95% recall', 'It converts floats into strings', 'It generates synthetic vectors'],
    ans: 1,
    exp: 'Brute-force vector distance across millions of 1536-dimensional vectors is computationally intractable for interactive queries. ANN achieves sub-10ms search via proximity graphs.'
  },
  {
    q: 'In Hierarchical Navigable Small World (HNSW) vector graphs, what is the purpose of multi-layer graph skip-lists?',
    opts: ['To support multi-threaded database transactions', 'Higher layers contain sparse long-range highway edges to skip across the vector space quickly, while lower layers contain dense local edges for fine-grained nearest neighbor convergence', 'To encrypt vector coordinates', 'To reduce memory consumption to zero'],
    ans: 1,
    exp: 'Multi-layer HNSW mimics skip-lists in high-dimensional geometric spaces, achieving logarithmic routing to the query vector cluster.'
  },
  {
    q: 'What is the primary difference between Event-Time and Processing-Time in distributed stream processing frameworks like Apache Flink?',
    opts: ['Event-time is measured in days while processing-time is measured in seconds', 'Event-time is the wall-clock timestamp when the event was generated on the source device, whereas processing-time is the local clock time of the cluster node processing the event', 'Event-time is only for batch jobs', 'Processing-time is strictly deterministic across replays'],
    ans: 1,
    exp: 'Event-time captures reality at the edge, independent of network delays, mobile disconnections, or queue backlogs.'
  },
  {
    q: 'In stream processing, what is a "Watermark" with allowed lateness?',
    opts: ['A watermark is an image placed on PDF reports', 'A monotonic timestamp marker in the stream declaring that the engine expects no subsequent events with event-time earlier than the watermark, triggering window evaluation', 'A network bandwidth throttler', 'A database foreign key constraint'],
    ans: 1,
    exp: 'Watermarks balance latency against completeness by signaling when windows can safely finalize calculations despite out-of-order event arrivals.'
  },
  {
    q: 'In consumer group rebalancing protocols (e.g. Kafka StickyAssignor), what is the main drawback of Eager Rebalancing compared to Cooperative Sticky Rebalancing?',
    opts: ['Eager rebalancing requires no network traffic', 'Eager rebalancing revokes ALL partitions from ALL consumers simultaneously (Stop-the-World pause), whereas Cooperative Sticky rebalancing only migrates reassigned partitions while unaffected consumers continue processing', 'Eager rebalancing allows duplicate messages', 'Cooperative rebalancing cannot scale beyond 2 workers'],
    ans: 1,
    exp: 'Eager rebalancing forces full partition revocation and re-assignment, creating consumer processing halts. Cooperative rebalancing performs incremental handoffs.'
  },
  {
    q: 'In LSM-Tree compaction, what distinguishes "Size-Tiered Compaction" from "Leveled Compaction"?',
    opts: ['Size-tiered uses 10x more CPU', 'Size-tiered merges SSTables of similar sizes into larger SSTables (ideal for write-heavy workloads), while Leveled compaction divides disk into exponential levels with non-overlapping key ranges per level (ideal for low read amplification)', 'Leveled compaction does not use disk', 'Size-tiered does not delete tombstones'],
    ans: 1,
    exp: 'Leveled compaction guarantees that keys exist in at most one SSTable per level (except Level 0), drastically minimizing read amplification at the cost of higher write amplification.'
  },
  {
    q: 'When indexing normalized embedding vectors for Cosine Similarity search, what optimization reduces distance computation by half?',
    opts: ['Inverting the vector coordinates', 'When vectors are L2-normalized (magnitude = 1), Cosine Similarity simplifies to the Dot Product (sum(a_i * b_i)), avoiding two square roots and division per comparison', 'Rounding all floats to 0', 'Dropping odd-numbered dimensions'],
    ans: 1,
    exp: 'For unit vectors, ||A|| = 1 and ||B|| = 1, so (A • B) / (||A|| * ||B||) = A • B. A single dot product yields the exact cosine similarity.'
  },
  {
    q: 'In a distributed commit log, what ensures that consumer offsets are stored reliably and survive broker restarts?',
    opts: ['Offsets are stored in consumer browser cookies', 'Offsets are committed as standard messages to an internal, compacted, multi-replicated system topic (`__consumer_offsets`)', 'Offsets are written to an external FTP server', 'Offsets are never stored; consumers always re-read from offset 0'],
    ans: 1,
    exp: 'Consumer offsets are persisted in Kafka\'s internal compacted topic `__consumer_offsets`, benefiting from cluster replication, partition leader election, and log compaction.'
  },
  {
    q: 'What is a "Tombstone" in distributed key-value databases and LSM storage engines?',
    opts: ['A marker indicating that a server has permanently died', 'A deletion marker with a timestamp indicating that a key was deleted; it suppresses older versions during reads until finalized during SSTable compaction', 'An encryption key used for secure storage', 'A metric that counts database queries'],
    ans: 1,
    exp: 'Because LSM-Tree files are immutable, deletions cannot mutate disk in place. A tombstone record is appended to mask the key until garbage collected during compaction.'
  },
  {
    q: 'What is "Exactly-Once Semantics" (EOS) in distributed streaming architectures (e.g., Kafka Streams / Flink)?',
    opts: ['The network cable sends electrons only once', 'Each input record is processed and updates state and output sinks exactly once effectively, achieved via idempotent producers and transactional atomic commits between checkpoints and offsets', 'The program crashes after processing one event', 'Events can never be replayed'],
    ans: 1,
    exp: 'EOS ensures that despite retries, network disconnects, or broker failovers, consumer state updates and output events reflect each input record exactly once.'
  },
  {
    q: 'In vector databases, what is "Scalar Quantization" (SQ) and how does it reduce memory footprints?',
    opts: ['It deletes half of the vectors', 'It compresses 32-bit floating point vector dimensions (float32) into 8-bit integers (int8), reducing RAM consumption by 75% with minimal degradation in search recall', 'It converts vectors into SQL tables', 'It replaces floating point numbers with emojis'],
    ans: 1,
    exp: 'SQ maps the continuous range of vector dimensions into discrete 8-bit bins (0–255), cutting RAM consumption from 4 bytes to 1 byte per dimension while maintaining high ranking accuracy.'
  }
];

function generateTracingQuestions(offset) {
  const traces = [];
  for (let i = 1; i <= 35; i++) {
    const qid = offset + i;
    const p = (i % 4);
    const off = (i * 3) % 17;
    const tokens = (i * 5) % 30 + 10;
    traces.push({
      q: `[Engine Trace #${qid}] Given a partitioned log with 4 partitions (P0..P3). A producer hashes key "entity-${qid}" with hash code ${qid * 17}. Using formula partition = hash % 4, which partition receives the append, and what is its 0-indexed offset if partition previously contained ${p} records?`,
      opts: [
        `Partition P${(qid * 17) % 4}, offset ${p}`,
        `Partition P${((qid * 17) % 4 + 1) % 4}, offset ${p + 1}`,
        `Partition P${(qid * 17) % 4}, offset ${p + 2}`,
        `Partition P0, offset 0`
      ],
      ans: 0,
      exp: `Partition = (${qid * 17}) % 4 = P${(qid * 17) % 4}. Next append offset in that partition is exactly ${p}.`
    });
  }
  return traces;
}

const preTheory = theoryPool.slice(0, 15);
const preTracing = generateTracingQuestions(15);
const preAssessment = [...preTheory, ...preTracing].map((q, idx) => ({
  id: `d16-pre-${idx + 1}`,
  question: q.q,
  options: q.opts,
  correctIndex: q.ans,
  explanation: q.exp,
  category: idx < 15 ? 'Theory (30%)' : 'Practical Execution & Trace (70%)'
}));

const postTheory = theoryPool.slice(0, 15);
const postTracing = generateTracingQuestions(100);
const postAssessment = [...postTheory, ...postTracing].map((q, idx) => ({
  id: `d16-post-${idx + 1}`,
  question: q.q,
  options: q.opts,
  correctIndex: q.ans,
  explanation: q.exp,
  category: idx < 15 ? 'Theory (30%)' : 'Practical Execution & Trace (70%)'
}));

const fileContent = `import { AssessmentQuestion } from '../types';

export const DAY_16_PRE_ASSESSMENT_50: AssessmentQuestion[] = ${JSON.stringify(preAssessment, null, 2)};

export const DAY_16_POST_ASSESSMENT_50: AssessmentQuestion[] = ${JSON.stringify(postAssessment, null, 2)};
`;

const targetPath = path.join(__dirname, '../src/data/day16Assessments50.ts');
fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log('Successfully generated src/data/day16Assessments50.ts with 50 pre- and 50 post-assessment questions.');
