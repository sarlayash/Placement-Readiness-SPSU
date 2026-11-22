import { AssessmentQuestion } from '../types';

export const DAY_14_PRE_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d14-pre-1",
    "question": "In Consistent Hashing, what happens to the key distribution when a node is added or removed from the hash ring?",
    "options": [
      "All keys across the entire cluster must be rehashed",
      "Only keys that fall within the range of the newly added or removed node must be migrated, which is on average K/N keys",
      "No keys move at all",
      "50% of the entire dataset is discarded"
    ],
    "correctIndex": 1,
    "explanation": "In consistent hashing with N nodes and K keys, adding or removing a node only impacts on average K/N keys mapped to that partition segment, preserving cache stability.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-2",
    "question": "Why are Virtual Nodes (vnodes) essential in production consistent hashing implementations like DynamoDB and Cassandra?",
    "options": [
      "To encrypt hash ring values",
      "To mitigate hot spots and ensure uniform load distribution across heterogeneous physical servers",
      "To eliminate the need for hash functions",
      "To make hash lookups run in O(1) space instead of log(N)"
    ],
    "correctIndex": 1,
    "explanation": "With few physical nodes, keys cluster unevenly due to hash variance. Assigning hundreds of virtual node tokens per physical server distributes segments uniformly around the ring.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-3",
    "question": "Under the CAP Theorem, why can a distributed system NEVER achieve both Consistency (Linearizability) and Availability during a Network Partition?",
    "options": [
      "Because network partitions never happen in modern cloud networks",
      "If partitioned nodes cannot communicate, they must either reject writes (sacrificing Availability for Consistency) or accept writes without synchronization (sacrificing Consistency for Availability)",
      "Because databases run on single-threaded CPUs",
      "Because Byzantine fault tolerance requires 51% consensus"
    ],
    "correctIndex": 1,
    "explanation": "A network partition (P) forces a binary choice: either allow reads/writes on both partitions leading to divergence (AP), or refuse operations on isolated nodes to prevent stale state (CP).",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-4",
    "question": "In the PACELC theorem, what does \"ELC\" represent when the system is operating normally without any partition?",
    "options": [
      "Else Latency vs Consistency trade-off",
      "Error Logging and Checkpointing",
      "Elastic Load Concentrator",
      "Eventual Local Convergence"
    ],
    "correctIndex": 0,
    "explanation": "PACELC states: If Partition (P), trade Availability (A) vs Consistency (C); Else (E), trade Latency (L) vs Consistency (C).",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-5",
    "question": "How does the Token Bucket algorithm differ fundamentally from the Leaking Bucket algorithm in API rate limiting?",
    "options": [
      "Token bucket cannot handle bursts of traffic, while leaking bucket allows instantaneous bursts",
      "Token bucket allows bursts of traffic up to the bucket capacity while maintaining an average rate, whereas leaking bucket forces a perfectly constant, smooth egress rate",
      "Token bucket discards tokens on rejection, while leaking bucket stores them forever",
      "Leaking bucket does not track timestamps"
    ],
    "correctIndex": 1,
    "explanation": "Token bucket accumulates tokens up to capacity, allowing a client to consume all available tokens in a burst. Leaking bucket queues and processes requests at a strictly constant rate.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-6",
    "question": "In Log-Structured Merge-Trees (LSM-Trees), why are all mutations (inserts, updates, deletes) written strictly sequentially to an append-only Write-Ahead Log (WAL) and MemTable?",
    "options": [
      "Because sequential disk I/O is orders of magnitude faster than random I/O, maximizing write throughput",
      "Because SSDs cannot handle append-only writes",
      "To prevent memory leaks in Java garbage collector",
      "To guarantee ACID isolation levels across multiple regions"
    ],
    "correctIndex": 0,
    "explanation": "Sequential append operations bypass disk seek overhead and write amplification, allowing LSM-trees (RocksDB, Cassandra) to achieve peak write throughput.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-7",
    "question": "What is the \"Cache Stampede\" (or Thundering Herd) problem, and what is the standard architectural mitigation?",
    "options": [
      "When cache memory overflows and deletes the database; solved by adding more RAM",
      "When an expensive cache key expires and thousands of concurrent requests miss simultaneously, hammering the backing database; mitigated by mutex locks, single-flight deduplication, or probabilistic early background refresh (XFetch)",
      "When Redis replicates too fast; mitigated by TCP flow control",
      "When CPU cache lines are invalidated by false sharing; mitigated by cache padding"
    ],
    "correctIndex": 1,
    "explanation": "Cache stampede occurs when a high-traffic key expires, triggering concurrent database queries. Mutexes, single-flight (Go `singleflight`), or XFetch prevent redundant queries.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-8",
    "question": "In distributed quorum consensus (e.g., Cassandra tunable consistency), what condition MUST hold for Strong Consistency (R + W > N)?",
    "options": [
      "Read quorum R and Write quorum W must sum to strictly greater than total replication factor N, ensuring at least one overlapping replica has the latest timestamped write",
      "R must equal N and W must equal 1",
      "R + W must be less than N to minimize latency",
      "The master node must reboot after every write"
    ],
    "correctIndex": 0,
    "explanation": "By Pigeonhole Principle, if R + W > N, the set of nodes read from and written to must intersect by at least one node containing the latest acknowledged write.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-9",
    "question": "In the Raft Consensus Algorithm, what is the role of the \"Term Number\"?",
    "options": [
      "It specifies the maximum number of network sockets open",
      "It acts as a logical epoch counter to detect obsolete leaders and stale candidate terms, guaranteeing at most one leader per term",
      "It defines the timeout duration in milliseconds",
      "It counts how many bytes are written to disk"
    ],
    "correctIndex": 1,
    "explanation": "Terms act as logical clocks in Raft. They allow servers to detect obsolete information such as stale leaders; any RPC received with an older term is immediately rejected.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-10",
    "question": "What is the primary trade-off of the Write-Through caching pattern compared to Write-Back (Write-Behind)?",
    "options": [
      "Write-through has lower write latency but higher data loss risk",
      "Write-through has higher write latency (since it writes to both cache and DB synchronously) but guarantees strong data durability and cache consistency",
      "Write-through never reads from the database",
      "Write-back requires zero memory"
    ],
    "correctIndex": 1,
    "explanation": "Write-through writes synchronously to cache and storage before returning success, increasing write latency but eliminating stale reads and avoiding data loss on cache crash.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-11",
    "question": "How does an SSTable (Sorted String Table) in an LSM-tree guarantee fast O(log N) key lookup during disk reads?",
    "options": [
      "It stores keys in random order with a full B-tree index on every block",
      "Keys are strictly sorted within the file, allowing an in-memory sparse index and Bloom filters to locate block offsets via binary search with minimal disk seeks",
      "It decompresses the entire 50GB file into RAM on every read",
      "It hashes each key to an absolute disk cylinder"
    ],
    "correctIndex": 1,
    "explanation": "Because keys are sorted, SSTables maintain a sparse in-memory index pointing to periodic block offsets, paired with Bloom filters to skip non-existent keys in O(1).",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-12",
    "question": "What problem does the Gossip Protocol solve in peer-to-peer distributed clusters like Apache Cassandra?",
    "options": [
      "It encrypts user passwords using RSA 4096",
      "It provides decentralized, epidemic node discovery, membership tracking, and node failure detection without requiring a centralized coordinator",
      "It compiles SQL queries into bytecode",
      "It automatically backs up the database to Amazon S3 every hour"
    ],
    "correctIndex": 1,
    "explanation": "Gossip protocols use decentralized epidemic state exchange to maintain cluster topology, heartbeats, and node state with O(log N) rounds and high fault tolerance.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-13",
    "question": "Why does Cassandra use Tombstones instead of immediately deleting records from disk?",
    "options": [
      "Because deleting data is illegal in database theory",
      "Because SSTables are immutable append-only files; deletes write a tombstone marker with a timestamp so distributed replicas acknowledge the deletion until compaction reclaims space",
      "Because disk drives cannot zero out bytes",
      "To allow users to recover deleted data anytime without backups"
    ],
    "correctIndex": 1,
    "explanation": "Immutable SSTables cannot be modified in place. Deleting a key writes a tombstone with a deletion timestamp. During subsequent compaction, keys older than the tombstone are discarded.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-14",
    "question": "In distributed tracing (e.g., OpenTelemetry, Jaeger), what is the difference between a Trace ID and a Span ID?",
    "options": [
      "Trace ID identifies a single function call, while Span ID identifies the database cluster",
      "A Trace ID represents the end-to-end journey of an entire request across all microservices, while a Span ID represents a single contiguous unit of work or RPC call within that trace",
      "They are completely identical synonyms",
      "Trace IDs are 32-bit while Span IDs are 1024-bit"
    ],
    "correctIndex": 1,
    "explanation": "A Trace encompasses the entire distributed execution graph; individual microservice hops and database calls are represented as Spans nested under the Trace ID.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-15",
    "question": "What is Split-Brain syndrome in distributed master-slave architectures, and how is it prevented?",
    "options": [
      "When memory runs out on two servers; prevented by garbage collection",
      "When a network partition causes isolated nodes to both declare themselves active leader/master, accepting conflicting writes; prevented by requiring an odd quorum (> N/2) to elect leaders or grant leases",
      "When CPU threads deadlock on a spinlock; prevented by mutexes",
      "When hard drives replicate simultaneously; prevented by RAID 1"
    ],
    "correctIndex": 1,
    "explanation": "Split-brain occurs when partitions elect conflicting leaders. Requiring strict majority quorum (> N/2) guarantees that at most one partition can assemble consensus.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-pre-16",
    "question": "Consider a Consistent Hash Ring with 3 physical nodes {A: hash 100, B: hash 300, C: hash 700}. A request arrives with key hash 250. Which node handles this key on a clockwise ring?",
    "options": [
      "Node A (hash 100)",
      "Node B (hash 300)",
      "Node C (hash 700)",
      "None (error)"
    ],
    "correctIndex": 1,
    "explanation": "Moving clockwise from 250, the first node encountered with hash >= 250 is Node B at position 300.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-17",
    "question": "On the same ring {A: 100, B: 300, C: 700}, which node receives key with hash 850 (assuming ring wrap-around at 1000)?",
    "options": [
      "Node C (hash 700)",
      "Node B (hash 300)",
      "Node A (hash 100)",
      "Node C and B simultaneously"
    ],
    "correctIndex": 2,
    "explanation": "Key hash 850 is greater than all nodes up to 700, so it wraps around to the beginning of the ring and is assigned to the first node, Node A (hash 100).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-18",
    "question": "A Token Bucket rate limiter has capacity = 10, refill_rate = 2 tokens/sec. At t = 0s, the bucket is full (10 tokens). A burst of 8 tokens is consumed immediately. At t = 3s, how many tokens are in the bucket?",
    "options": [
      "2 tokens",
      "6 tokens",
      "8 tokens",
      "10 tokens"
    ],
    "correctIndex": 2,
    "explanation": "At t = 0: 10 - 8 = 2 tokens left. Between t = 0 and t = 3s (elapsed 3s), refill adds 3 * 2 = 6 tokens. Total tokens = min(10, 2 + 6) = 8 tokens.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-19",
    "question": "In the same Token Bucket (capacity 10, refill 2/s), if 9 requests arrive at t = 3s when 8 tokens are present, what happens?",
    "options": [
      "All 9 requests succeed because burst capacity is 10",
      "The first 8 requests are allowed, and the 9th is rejected (or queued)",
      "All 9 requests are rejected immediately",
      "The limiter waits 10 seconds before replying"
    ],
    "correctIndex": 1,
    "explanation": "There are only 8 tokens in the bucket. Consuming 1 token per request, 8 requests succeed (bucket drops to 0) and the 9th fails due to insufficient tokens.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-20",
    "question": "A Sliding Window Log rate limiter allows 5 requests per 60-second window. The log contains timestamps: [10s, 25s, 40s, 55s, 65s]. A new request arrives at t = 75s. Is it accepted, and what is the new log state?",
    "options": [
      "Rejected; log already has 5 entries",
      "Accepted; timestamps <= 15s (i.e. 75 - 60) are evicted, removing 10s. The window now has [25s, 40s, 55s, 65s, 75s] (5 items)",
      "Rejected; rate limit exceeded for 100 seconds",
      "Accepted; the log resets completely to [75s]"
    ],
    "correctIndex": 1,
    "explanation": "At t = 75s, window boundary is 75 - 60 = 15s. Timestamps < 15s (10s) are evicted. Remaining count is 4 ([25, 40, 55, 65]). Adding 75 brings count to 5 <= 5, so it is accepted.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-21",
    "question": "A cluster has N = 5 replicas. You configure tunable consistency with W = 3 and R = 3. Is strong consistency guaranteed, and what is the maximum number of node failures tolerated for both reads and writes?",
    "options": [
      "No; R + W <= N; 0 failures tolerated",
      "Yes; R + W = 6 > 5; tolerates up to 2 node failures for both reads and writes",
      "Yes; tolerates 4 node failures",
      "No; Cassandra never guarantees strong consistency"
    ],
    "correctIndex": 1,
    "explanation": "R + W = 3 + 3 = 6 > 5 (Strong Consistency). Quorum size is 3 out of 5, meaning at least 3 nodes must be alive. The cluster can tolerate 5 - 3 = 2 node failures.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-22",
    "question": "In Raft consensus, a cluster has 5 nodes. A network partition divides it into Partition 1 {N1, N2} and Partition 2 {N3, N4, N5}. Can Partition 1 elect a new leader or commit writes?",
    "options": [
      "Yes, Partition 1 can commit writes because N1 has lowest ID",
      "No; Partition 1 has only 2 nodes, which is less than the strict majority quorum (\\lceil (5+1)/2 \\rceil = 3); it cannot elect a leader or commit writes",
      "Both partitions can independently commit writes",
      "Partition 1 reboots the entire 5 nodes"
    ],
    "correctIndex": 1,
    "explanation": "Majority quorum for N = 5 is 3. Partition 1 only has 2 nodes, so candidates cannot collect 3 votes. Partition 2 has 3 nodes and can elect a leader and commit writes.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-23",
    "question": "In an LSM-Tree, MemTable size threshold is 64MB. A workload writes 300MB of sequential log data. How many SSTable flush operations will occur, and what are their key orderings?",
    "options": [
      "0 flushes; MemTable expands infinitely",
      "4 full SSTables flushed (at 64MB, 128MB, 192MB, 256MB) each sorted internally by key; remaining 44MB stays in active MemTable",
      "1 huge 300MB unindexed file is created",
      "100 flushes with random ordering"
    ],
    "correctIndex": 1,
    "explanation": "Each time MemTable reaches 64MB, it freezes into an immutable MemTable and flushes to disk as an SSTable sorted by key: \\lfloor 300 / 64 \\rfloor = 4 SSTables flushed, with 44MB remaining in memory.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-24",
    "question": "A Bloom filter has m = 1000 bits, k = 4 hash functions, and currently contains 50 items. A query for key \"user:999\" returns bit values [1, 1, 0, 1] for its 4 hash positions. What is the conclusion?",
    "options": [
      "\"user:999\" is definitely in the set",
      "\"user:999\" is definitely NOT in the set",
      "\"user:999\" has a 50% probability of being in the set",
      "The Bloom filter must be resized immediately"
    ],
    "correctIndex": 1,
    "explanation": "Bloom filter property: If ANY of the k hash bits is 0, the element is definitely NOT in the set (zero false negatives).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-25",
    "question": "Trace the Write-Ahead Log (WAL) recovery sequence: A database crashes at t = 50. WAL shows:\n[LSN 1: BEGIN T1]\n[LSN 2: WRITE T1, X=10]\n[LSN 3: BEGIN T2]\n[LSN 4: WRITE T2, Y=20]\n[LSN 5: COMMIT T1]\nDuring crash recovery (ARIES Redo/Undo), what happens to X and Y?",
    "options": [
      "Both X and Y are discarded",
      "X is REDO-committed to 10; T2 is uncommitted so Y=20 is UNDO-rolled back",
      "Both X=10 and Y=20 are committed",
      "The database drops the table"
    ],
    "correctIndex": 1,
    "explanation": "T1 committed before the crash (LSN 5), so its modifications (X=10) are redone. T2 was in-flight without a COMMIT record, so its dirty changes (Y=20) must be undone.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-26",
    "question": "Consider a Cache-Aside (Lazy Loading) query pattern. What is the correct sequence of operations for reading key K?",
    "options": [
      "Read DB -> Write DB -> Delete Cache",
      "Read Cache -> If Hit return; If Miss: Read DB -> Write DB value to Cache -> Return value",
      "Write Cache -> Flush DB -> Return null",
      "Read DB only, never write to Cache"
    ],
    "correctIndex": 1,
    "explanation": "Cache-Aside read flow: Look up in cache. On hit, return immediately. On miss, fetch from primary database, populate cache with key-value and TTL, then return to client.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-27",
    "question": "In Cache Invalidation with Cache-Aside on write, why is \"Update Database, then Delete Cache key\" preferred over \"Update Database, then Update Cache value\"?",
    "options": [
      "Deleting cache keys is 100x slower",
      "Updating the cache value can cause race conditions where two concurrent writes overwrite each other in reverse order, leaving stale data in cache; deleting the key guarantees the next read fetches fresh data",
      "Databases do not support update operations",
      "Redis does not support key updates"
    ],
    "correctIndex": 1,
    "explanation": "If two writes W1 then W2 update DB, but network jitter causes W2 to update cache before W1, cache permanently holds W1's stale value. Invalidating (deleting) prevents this race.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-28",
    "question": "A distributed lock is implemented using Redis: `SET resource_name my_random_token NX PX 30000`. Why is `my_random_token` necessary instead of a static value like \"locked\"?",
    "options": [
      "To make the lock key look pretty",
      "To prevent Client A from accidentally releasing Client B's lock if Client A's operation took longer than 30s and the lock auto-expired",
      "Because Redis crashes on static strings",
      "To encrypt the network payload"
    ],
    "correctIndex": 1,
    "explanation": "If Client A exceeds the TTL, Redis auto-releases the lock and Client B acquires it. When Client A finishes, checking that the token matches Client A's random token prevents Client A from deleting Client B's active lock.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-29",
    "question": "In Fencing Tokens for distributed locking (Martin Kleppmann's critique of Redlock), what does the storage service do when receiving a write with fencing token 42 after already processing token 43?",
    "options": [
      "It overwrites 43 with 42",
      "It rejects token 42 because fencing tokens are strictly monotonically increasing, preventing a stale/delayed client from corrupting state",
      "It halts the entire database cluster",
      "It resets the fencing counter to 0"
    ],
    "correctIndex": 1,
    "explanation": "The storage system tracks the highest processed fencing token (e.g. 43). A write with an older token (42) from a delayed client is rejected, guaranteeing linearizability.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-30",
    "question": "A 2-Phase Commit (2PC) protocol has 1 Coordinator and 3 Participants. In Phase 1 (Prepare), Participant 1 votes YES, Participant 2 votes YES, Participant 3 votes NO. What message does the Coordinator send in Phase 2?",
    "options": [
      "GLOBAL_COMMIT to all participants",
      "GLOBAL_ABORT to all participants",
      "COMMIT to P1 and P2, ABORT to P3",
      "The coordinator crashes intentionally"
    ],
    "correctIndex": 1,
    "explanation": "In 2PC, all participants must vote YES to commit. If even one participant votes NO (or times out), the coordinator broadcasts GLOBAL_ABORT to rollback all participants.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-31",
    "question": "Trace Vector Clock comparison: Event A has vector clock V_A = [Node1: 2, Node2: 1]. Event B has vector clock V_B = [Node1: 1, Node2: 3]. What is the relationship between Event A and Event B?",
    "options": [
      "A happened-before B (A -> B)",
      "B happened-before A (B -> A)",
      "Concurrent (A || B); neither happened before the other, indicating a conflict/divergence",
      "Identical state"
    ],
    "correctIndex": 2,
    "explanation": "V_A has a higher Node1 counter (2 > 1), but V_B has a higher Node2 counter (3 > 1). Because neither vector dominates across all dimensions, the events are concurrent (conflict).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-32",
    "question": "Given vector clocks V1 = [A: 3, B: 2, C: 1] and V2 = [A: 2, B: 1, C: 1]. Does V2 happen-before V1?",
    "options": [
      "Yes, V2 <= V1 for all components and V2 != V1, so V2 -> V1",
      "No, V1 -> V2",
      "They are concurrent",
      "Vector clocks cannot compare 3 nodes"
    ],
    "correctIndex": 0,
    "explanation": "For every node: V2[A] (2) <= V1[A] (3), V2[B] (1) <= V1[B] (2), V2[C] (1) <= V1[C] (1). Thus V2 strictly precedes V1 (V2 -> V1).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-33",
    "question": "In Sharding by Range vs Sharding by Hash: If you store timeseries data with primary key `timestamp`, what is the primary downside of Sharding by Range `[Jan, Feb, Mar]`?",
    "options": [
      "Range queries are impossible",
      "All current write traffic is concentrated onto the single shard covering the current time window (Hotspotting)",
      "Data is corrupted during month transitions",
      "Requires 100x more disk space"
    ],
    "correctIndex": 1,
    "explanation": "Sharding monotonic keys (like timestamps or auto-increment IDs) by range routes 100% of current writes to the latest partition shard, defeating horizontal write distribution.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-34",
    "question": "In Sharding by Hash `shard_id = hash(user_id) % num_shards`, what is the primary limitation?",
    "options": [
      "Writing data takes O(N) time",
      "Range queries (e.g. `WHERE user_id BETWEEN 100 AND 200`) require querying ALL shards (scatter-gather), increasing latency",
      "Cannot use SSD storage",
      "Hash collisions destroy data"
    ],
    "correctIndex": 1,
    "explanation": "Hash sharding randomly scatters adjacent keys across different physical shards. A range scan cannot target a single shard and must scatter-gather across all shards.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-35",
    "question": "A Sliding Window Counter rate limiter uses 1-minute windows. Previous minute count = 60, current minute count = 10. A request arrives at second 18 of the current minute. Assuming limit is 50 req/min, what is the estimated count and decision?",
    "options": [
      "Weight of previous minute = (60 - 18)/60 = 0.7; Estimated = 60 * 0.7 + 10 = 42 + 10 = 52 > 50 -> REJECTED",
      "Weight is 0.3; Estimated = 18 + 10 = 28 <= 50 -> ACCEPTED",
      "Count is strictly 10 -> ACCEPTED",
      "Rejected because previous minute had 60"
    ],
    "correctIndex": 0,
    "explanation": "At second 18 of current minute, 70% of the sliding window falls into previous minute: 60 * (42/60) + 10 = 42 + 10 = 52. Since 52 > 50, the request is REJECTED.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-36",
    "question": "Calculate Write Amplification Factor (WAF): If an application issues 10 MB of random logical writes, but due to WAL, MemTable flushes, and SSTable compactions, the storage subsystem writes 60 MB of physical bytes to disk, what is the WAF?",
    "options": [
      "0.16",
      "6.0",
      "50.0",
      "1.0"
    ],
    "correctIndex": 1,
    "explanation": "Write Amplification Factor = Bytes Written to Storage / Bytes Written by Application = 60 MB / 10 MB = 6.0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-37",
    "question": "In Raft leader election, if Candidate A has term 4 and last log entry at index 10, term 3, while Candidate B has term 4 and last log entry at index 12, term 3. Will Node C vote for Candidate A over Candidate B?",
    "options": [
      "Yes, Node C prefers lower index",
      "No; Candidate B's log is more up-to-date because both have term 3 but B has a higher log index (12 > 10). Node C votes for B",
      "Node C crashes",
      "Node C votes for both"
    ],
    "correctIndex": 1,
    "explanation": "Raft log comparison rule: Higher last log term wins. If terms are equal, longer log (higher index) wins. Candidate B (index 12) is strictly more up-to-date than A (index 10).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-38",
    "question": "In Read-Repair in Apache Cassandra, when a client reads with Consistency Level QUORUM from 3 replicas and replica 1 returns value V2 (timestamp 200), replica 2 returns V1 (timestamp 100), and replica 3 returns V2 (timestamp 200), what happens?",
    "options": [
      "The query throws an unresolvable exception",
      "The client receives V2 (highest timestamp); an asynchronous background read-repair write of V2 is dispatched to replica 2 to reconcile it",
      "Replica 1 and 3 are deleted",
      "Replica 2 overwrites replica 1 and 3 with V1"
    ],
    "correctIndex": 1,
    "explanation": "Cassandra uses Last-Write-Wins (LWW) based on timestamps. V2 wins. The coordinator sends an asynchronous mutation with V2 to replica 2 to fix its stale state.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-39",
    "question": "What is the effect of setting TCP `SO_REUSEPORT` on a high-concurrency reverse proxy like NGINX or Envoy?",
    "options": [
      "It limits max connections to 1024",
      "It enables multiple independent worker processes to bind to the exact same listening port, allowing the OS kernel to balance incoming SYN packets across workers without lock contention",
      "It disables TCP checksums",
      "It forces all packets to route through a single CPU core"
    ],
    "correctIndex": 1,
    "explanation": "`SO_REUSEPORT` distributes incoming TCP connections at the kernel level across multiple listener sockets, eliminating accept-mutex bottlenecks.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-40",
    "question": "Consider an idempotent payment API endpoint `POST /charge`. What is the role of the `Idempotency-Key: uuid4` header?",
    "options": [
      "It provides the credit card number",
      "If network drops after payment gateway processes the charge, the client retries with the same Idempotency-Key. The server detects the cached completed response and returns it without charging the user twice",
      "It encrypts the payload with AES-256",
      "It deletes the user account on error"
    ],
    "correctIndex": 1,
    "explanation": "Idempotency keys ensure at-most-once execution: repeated identical requests return the original result rather than executing the side-effect multiple times.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-41",
    "question": "In database connection pooling (HikariCP / PgBouncer), why does setting the pool size too large (e.g. 500 connections on a 8-core DB server) drastically DECREASE throughput?",
    "options": [
      "The database runs out of disk storage",
      "Context switching overhead, lock contention, and disk seek thrashing across hundreds of concurrent threads overwhelm CPU and memory bandwidth",
      "Network cables overheat",
      "PostgreSQL caps connections at 10"
    ],
    "correctIndex": 1,
    "explanation": "CPUs can only execute C threads simultaneously (where C is core count). 500 active connections spend most of their time in OS context switching and cache invalidation.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-42",
    "question": "In a distributed messaging system like Kafka, how does partition count dictate consumer parallelism within a single Consumer Group?",
    "options": [
      "Any number of consumers can consume from the same partition simultaneously without coordination",
      "The maximum number of active consumers in a consumer group cannot exceed the number of partitions; extra consumers remain idle",
      "Every consumer receives 100% of all partitions regardless of group",
      "Kafka limits consumer groups to 1 consumer"
    ],
    "correctIndex": 1,
    "explanation": "Within a single Kafka consumer group, each partition is assigned to exactly one consumer thread. If partitions = 8 and consumers = 12, 4 consumers sit idle.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-43",
    "question": "In distributed deadlocks, what is the Wait-For Graph (WFG) cycle detection algorithm?",
    "options": [
      "It counts how many bytes are locked on disk",
      "Nodes in the graph represent transactions and directed edges represent lock requests (Ti -> Tj means Ti is waiting for Tj). A cycle in the graph indicates a distributed deadlock, resolved by aborting one transaction",
      "It calculates the shortest path from client to server",
      "It measures ping latency between data centers"
    ],
    "correctIndex": 1,
    "explanation": "In a Wait-For Graph, a cycle implies circular dependency where transactions are blocked waiting for resources held by each other. Breaking the cycle requires aborting a victim transaction.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-44",
    "question": "In a multi-master replication setup, two users update the same document concurrently in US-East and EU-West. Both write at the exact same physical millisecond. How does Cassandra resolve the conflict?",
    "options": [
      "Cassandra deletes the record",
      "Cassandra compares microsecond timestamps with tie-breaking based on client ID / lexicographical value (Last-Write-Wins)",
      "Cassandra halts until a human administrator intervenes",
      "Cassandra randomly chooses a document and corrupts it"
    ],
    "correctIndex": 1,
    "explanation": "Cassandra applies Last-Write-Wins (LWW) using cell timestamps. Ties are deterministically resolved by comparing values or client UUIDs.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-45",
    "question": "Why does an API Gateway use Circuit Breaker pattern (e.g. Resilience4j / Netflix Hystrix) when a downstream microservice fails?",
    "options": [
      "To shut down the entire cloud cluster",
      "When failure rate exceeds threshold, circuit trips OPEN to fail fast immediately without waiting for timeouts, preventing thread starvation and allowing the failing service to recover",
      "To double the retry rate to flood the failing service",
      "To convert REST calls into GraphQL"
    ],
    "correctIndex": 1,
    "explanation": "The Circuit Breaker pattern prevents cascading failures. By tripping OPEN on consecutive errors, it returns immediate fallback responses rather than tying up connection pools.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-46",
    "question": "In Content Delivery Networks (CDNs), what is the difference between `Cache-Control: s-maxage=3600` and `Cache-Control: max-age=3600`?",
    "options": [
      "`s-maxage` applies specifically to shared/public caches (like CDN edge proxies), overriding `max-age`, while `max-age` applies to private client browser caches",
      "`s-maxage` is for secure HTTPS only",
      "`max-age` is measured in minutes while `s-maxage` is measured in hours",
      "They are completely identical"
    ],
    "correctIndex": 0,
    "explanation": "`s-maxage` (shared max-age) specifically instructs intermediate shared proxies and CDNs how long to cache the response, leaving browser cache behavior to `max-age`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-47",
    "question": "In database indexing, what is a \"Covering Index\"?",
    "options": [
      "An index that covers all tables in the database",
      "An index that contains all the columns requested in the SQL query (both WHERE and SELECT clauses), allowing the database to satisfy the query entirely from the B-tree without touching table data pages (Index-Only Scan)",
      "An index that encrypts the table",
      "An index that backs up data to tape"
    ],
    "correctIndex": 1,
    "explanation": "A covering index includes all referenced columns for a query, enabling index-only scans and completely eliminating costly random heap lookups.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-48",
    "question": "In distributed microservices, what is the Saga Pattern for distributed transactions?",
    "options": [
      "Using 2-Phase Commit across all services",
      "A sequence of local transactions where each transaction updates data within a single service and publishes an event; if a step fails, compensating transactions are executed in reverse to undo changes",
      "Storing all microservice data in a single SQLite file",
      "A hardware load balancer from Cisco"
    ],
    "correctIndex": 1,
    "explanation": "Saga replaces blocking 2PC in microservices with choreographed or orchestrated local transactions paired with compensating actions for rollbacks.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-49",
    "question": "Why is Gossip Protocol convergence time O(log N) where N is the number of nodes in the cluster?",
    "options": [
      "Because binary search is used to find nodes",
      "Each round of gossip doubles the number of informed nodes exponentially (epidemic spread, similar to binary tree height), reaching all N nodes in roughly \\log_2 N rounds",
      "Because nodes only talk to 1 master node",
      "Because network switches route in log N time"
    ],
    "correctIndex": 1,
    "explanation": "In each round, every informed node contacts randomly chosen peers. The proportion of informed nodes grows exponentially (like an epidemic), achieving full cluster convergence in O(log N) time.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-pre-50",
    "question": "When scaling WebSocket servers horizontally, how do you broadcast a message from a user connected to Server 1 to a group member connected to Server 2?",
    "options": [
      "WebSockets cannot scale beyond 1 server",
      "Use a distributed Publish/Subscribe broker (e.g. Redis Pub/Sub, Kafka, NATS) where Server 1 publishes the event to a channel and Server 2 subscribes and relays to its local WebSocket client",
      "The client must disconnect and reconnect to Server 2",
      "Send an email to the user"
    ],
    "correctIndex": 1,
    "explanation": "A distributed Pub/Sub message bus decouples WebSocket server nodes, allowing any node to broadcast messages to clients connected to any other node.",
    "category": "Practical Execution & Trace (70%)"
  }
];

export const DAY_14_POST_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d14-post-1",
    "question": "In consistent hashing rings with virtual nodes, what is the standard mathematical formula for mapping K keys across N physical nodes each with V virtual nodes?",
    "options": [
      "Each node owns exactly K/N keys without any hash ring",
      "Each physical node is assigned V tokens on a ring of size 2^32 or 2^64; keys map to the next clockwise virtual token, ensuring standard deviation of load decreases proportional to 1/sqrt(V)",
      "All keys are assigned to the root node",
      "V must always equal 1"
    ],
    "correctIndex": 1,
    "explanation": "Adding V virtual nodes reduces hash variance, with load variation dropping as O(1/\\sqrt{V}), preventing hotspotting across physical machines.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-2",
    "question": "Why does Cassandra's Murmur3Partitioner use a 64-bit integer range [-2^63 to 2^63 - 1] for its consistent hash ring?",
    "options": [
      "To support negative numbers in SQL queries",
      "Because 64-bit Murmur3 provides uniform, non-cryptographic high-speed hashing with negligible collision probability across 2^64 token space",
      "Because Java long is 64-bit",
      "To comply with ISO 9001 standards"
    ],
    "correctIndex": 1,
    "explanation": "Murmur3 produces uniformly distributed hashes rapidly, spanning 2^64 tokens to virtually eliminate token collisions on distributed rings.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-3",
    "question": "In the PACELC theorem, what does MongoDB with primary-secondary replication exhibit during network partitions vs normal operation?",
    "options": [
      "PA/EL",
      "PC/EC: Consistency over Availability during partitions (rejects writes during primary election), and Consistency over Latency normally (reads from primary)",
      "PA/EE",
      "Neither"
    ],
    "correctIndex": 1,
    "explanation": "Default MongoDB is PC/EC: during partitions it blocks writes until a majority elect a new primary (PC); under normal conditions reads from primary yield Consistency over Latency (EC).",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-4",
    "question": "In Dynamo-style distributed storage, what is the role of \"Sloppy Quorum\" and \"Hinted Handoff\"?",
    "options": [
      "To immediately delete failing nodes",
      "To preserve write availability during network partitions by accepting writes on healthy non-designated nodes (sloppy quorum), which store a hint to hand off the write when the primary replica recovers",
      "To bypass all authentication checks",
      "To enforce ACID transactions across partitions"
    ],
    "correctIndex": 1,
    "explanation": "Sloppy Quorum and Hinted Handoff optimize for Availability (AP): if primary replicas are unreachable, writes land on temporary neighbor nodes that deliver updates once the target nodes return.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-5",
    "question": "What is the \"Thundering Herd\" problem when multiple worker processes wait on the same event or socket?",
    "options": [
      "A memory leak in Linux kernel",
      "When an event triggers all sleeping processes to wake up simultaneously to compete for the resource, resulting in massive CPU spikes and context switching while only one process succeeds",
      "A database lock that never releases",
      "A DDoS attack from multiple IP addresses"
    ],
    "correctIndex": 1,
    "explanation": "Thundering Herd occurs when all waiting threads awaken for a single event. Using `EPOLLEXCLUSIVE` or `SO_REUSEPORT` wakes only one worker.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-6",
    "question": "Why is Bloom filter deletion inherently difficult in standard bit-array Bloom filters, and what variation supports deletions?",
    "options": [
      "Bits cannot be flipped from 1 to 0 without corrupting other keys that hashed to that same bit; Counting Bloom Filters (using small integer counters instead of single bits) allow decrements to support deletions",
      "Standard Bloom filters do support deletion by zeroing the bit",
      "Bloom filters only store numbers",
      "Deleting bits deletes the database"
    ],
    "correctIndex": 0,
    "explanation": "Because multiple keys share hash bit locations, clearing a bit could create false negatives for other keys. Counting Bloom Filters replace bits with counters to enable safe decrements.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-7",
    "question": "In Write-Ahead Logging (WAL), what is the \"Write-Ahead\" property strictly enforcing before dirty data pages are flushed from RAM to table storage?",
    "options": [
      "The log record describing the update must be flushed and persisted to durable non-volatile disk before the corresponding dirty data page is written to disk",
      "Data pages must be written first",
      "Log records can be discarded after 10ms",
      "The database must notify all clients before logging"
    ],
    "correctIndex": 0,
    "explanation": "The Write-Ahead rule ensures that changes are permanently recorded in the append-only log before in-memory buffer pages reach disk, guaranteeing atomicity and crash recovery.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-8",
    "question": "What distinguishes Leveled Compaction (LCS) from Size-Tiered Compaction (STCS) in RocksDB / Cassandra?",
    "options": [
      "LCS uses more memory",
      "STCS groups SSTables of similar sizes for compaction causing high space amplification (up to 50%), whereas LCS organizes SSTables into hierarchical levels (L0, L1, ...) where levels have strict non-overlapping key ranges, reducing space amplification to ~10% and optimizing reads",
      "LCS does not sort keys",
      "STCS is for SQL while LCS is for NoSQL"
    ],
    "correctIndex": 1,
    "explanation": "LCS enforces disjoint non-overlapping key ranges across levels >= L1, bounding space amplification and guaranteeing at most one SSTable lookup per level during reads.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-9",
    "question": "In the Raft consensus algorithm, how does a leader prevent stale reads when serving read-only queries without writing to the Raft log (Read Index / Lease Read)?",
    "options": [
      "It returns the first cached value without checking anything",
      "The leader contacts a majority of nodes with heartbeat probes (or verifies an active leader lease) to confirm it has not been deposed by a newer leader before returning data",
      "It initiates an election",
      "It restarts the follower nodes"
    ],
    "correctIndex": 1,
    "explanation": "To avoid returning stale reads from a deposed leader that was partitioned away, the leader confirms its current leadership with a heartbeat quorum before serving read requests.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-10",
    "question": "What is the purpose of \"Heartbeating with Exponential Backoff and Jitter\" in distributed failure detectors?",
    "options": [
      "To overheat the network card",
      "To avoid synchronized retry storms where thousands of nodes ping simultaneously after a transient hiccup, spreading traffic evenly over time",
      "To increase heartbeat latency indefinitely",
      "To disable TCP keepalive"
    ],
    "correctIndex": 1,
    "explanation": "Adding random jitter to exponential backoff decorrelates retry attempts across thousands of clients or nodes, preventing stampedes and network congestion.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-11",
    "question": "In event-driven architectures, what is the \"Outbox Pattern\"?",
    "options": [
      "Sending emails to users when accounts are created",
      "Writing domain state changes and corresponding event records into the same database within a single atomic local transaction, and having an asynchronous CDC process (like Debezium) publish outbox events to the message broker",
      "Storing outgoing HTTP requests in an S3 bucket",
      "Deleting old messages from Kafka"
    ],
    "correctIndex": 1,
    "explanation": "The Outbox Pattern avoids dual-write inconsistencies between a database and a message broker by committing business entities and outbox events in a single ACID transaction.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-12",
    "question": "What does \"Dual Write Problem\" refer to when updating both a primary database and a cache / search index?",
    "options": [
      "Writing to two disks simultaneously in RAID 1",
      "Without distributed transactions, if one write succeeds and the second fails (or concurrent writes arrive out of order), the two data stores drift out of sync permanently",
      "Writing both English and Spanish translations",
      "Writing two bytes per word"
    ],
    "correctIndex": 1,
    "explanation": "Dual writing directly to DB and Cache/Elasticsearch lacks atomicity: failures or race conditions leave the secondary store permanently inconsistent.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-13",
    "question": "In distributed data pipelines, what is \"At-Least-Once\" processing semantics vs \"Exactly-Once\" (EOS)?",
    "options": [
      "At-Least-Once processes messages faster by skipping errors",
      "At-Least-Once guarantees no messages are lost but duplicates may occur due to retries; Exactly-Once combines idempotency and two-phase commit transactions so state reflects each message precisely once",
      "Exactly-Once guarantees messages arrive within 1 millisecond",
      "At-Least-Once means every message is delivered exactly twice"
    ],
    "correctIndex": 1,
    "explanation": "At-Least-Once re-delivers upon unacknowledged failures, risking duplicates. Exactly-Once processing (e.g. Kafka transactions + Flink checkpoints) ensures state updates are idempotent and deduplicated.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-14",
    "question": "How does Consistent Hashing handle heterogeneous servers with different CPU/RAM specifications?",
    "options": [
      "It cannot handle different servers",
      "By assigning a proportional number of virtual nodes (vnodes) to each server: a machine with 2x capacity receives 2x virtual node tokens on the ring",
      "By placing faster servers in the center of the ring",
      "By running multiple operating systems"
    ],
    "correctIndex": 1,
    "explanation": "Heterogeneity is handled cleanly in consistent hashing by weighting: a server with twice the hardware capacity is allocated double the virtual node tokens.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-15",
    "question": "What is the role of Apache Zookeeper / etcd in distributed systems architectures?",
    "options": [
      "To store petabytes of user image files",
      "To provide a highly reliable, strongly consistent distributed coordination primitive for leader election, distributed locking, service discovery, and configuration management",
      "To replace SQL databases",
      "To act as a GPU rendering pipeline"
    ],
    "correctIndex": 1,
    "explanation": "etcd (Raft) and Zookeeper (ZAB) provide fault-tolerant, linearizable key-value storage for consensus, leader leases, and cluster metadata.",
    "category": "Theory (30%)"
  },
  {
    "id": "d14-post-16",
    "question": "A Consistent Hash Ring has physical nodes with virtual token positions:\nNode X: [50, 250, 450]\nNode Y: [150, 350, 550]\nA key hashes to 200. On a clockwise ring, which node handles this key?",
    "options": [
      "Node Y (token 150)",
      "Node X (token 250)",
      "Node Y (token 350)",
      "Node X (token 450)"
    ],
    "correctIndex": 1,
    "explanation": "Next token clockwise from 200 is 250, which belongs to Node X.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-17",
    "question": "On the same ring (tokens: 50, 150, 250, 350, 450, 550, max 600), a key hashes to 580. Which node handles this key after wrap-around?",
    "options": [
      "Node Y (token 550)",
      "Node X (token 50)",
      "Node Y (token 150)",
      "Key is dropped"
    ],
    "correctIndex": 1,
    "explanation": "Key 580 exceeds the largest token (550). Wrapping around to the start of the ring, the first token is 50, which belongs to Node X.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-18",
    "question": "A Leaky Bucket rate limiter has capacity = 10 requests and leak rate = 1 request every 200ms. At t = 0ms, 8 requests arrive and enter the bucket. At t = 600ms, how many requests remain in the bucket?",
    "options": [
      "8 requests",
      "5 requests",
      "3 requests",
      "0 requests"
    ],
    "correctIndex": 1,
    "explanation": "In 600ms, the bucket leaks 600 / 200 = 3 requests. Remaining in bucket = 8 - 3 = 5 requests.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-19",
    "question": "In the same Leaky Bucket (capacity 10, leak 1/200ms), 5 requests remain at t = 600ms. 6 new requests arrive simultaneously at t = 600ms. What happens?",
    "options": [
      "All 6 requests are accepted",
      "5 requests enter the bucket (filling it to capacity 10); the 6th request overflows and is dropped (HTTP 429)",
      "All 11 requests are dropped",
      "The bucket doubles its capacity"
    ],
    "correctIndex": 1,
    "explanation": "Current occupancy is 5. Capacity is 10. The bucket can only accommodate 10 - 5 = 5 additional requests. The 6th request overflows the queue and is dropped.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-20",
    "question": "A distributed cache has 4 nodes. A key \"session:user42\" maps to Node 2. If node 2 fails and Consistent Hashing with replication factor RF = 2 is used, where does the failover read go?",
    "options": [
      "Node 1 (preceding node)",
      "The next clockwise replica node on the hash ring (Node 3)",
      "The database is deleted",
      "All nodes fail"
    ],
    "correctIndex": 1,
    "explanation": "With consistent hashing replication (RF >= 2), keys are stored on the primary token node and replicated to the next N-1 distinct physical nodes clockwise along the ring.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-21",
    "question": "In a Sliding Window Counter, window size = 60s. At t = 45s, previous window had 80 requests, current window has 20 requests. If limit is 60 req/min, is a new request accepted?",
    "options": [
      "Accepted; current window only has 20 <= 60",
      "Rejected; weight of previous window = (60 - 45)/60 = 0.25; Estimated = 80 * 0.25 + 20 = 20 + 20 = 40 <= 60, wait! Let us calculate: 40 <= 60 so it is ACCEPTED!",
      "Rejected; 80 > 60",
      "None"
    ],
    "correctIndex": 1,
    "explanation": "Weight of previous window at t = 45s is (60 - 45)/60 = 15/60 = 0.25. Total estimated requests = 80 * 0.25 + 20 = 20 + 20 = 40. Since 40 < 60, the request is ACCEPTED.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-22",
    "question": "A Bloom filter uses 3 hash functions. An element X hashes to bit indices [4, 12, 19]. Current filter state has bit 4 = 1, bit 12 = 0, bit 19 = 1. What is returned for `contains(X)`?",
    "options": [
      "true (probably present)",
      "false (definitely not present)",
      "NullPointerException",
      "Bloom filter recalculates"
    ],
    "correctIndex": 1,
    "explanation": "Since bit 12 is 0, element X could never have been inserted into this filter. It returns false with 100% certainty.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-23",
    "question": "In an LSM-Tree, Level 0 contains 4 SSTables of 10MB each. Compaction threshold is 4 files. When compaction triggers, how does Level 0 merge into Level 1?",
    "options": [
      "The files are appended without sorting",
      "A K-way merge sort merges all 4 SSTables into Level 1 SSTables with disjoint key ranges, removing overwritten values and obsolete tombstones",
      "All data is cleared",
      "Level 0 files are moved to Level 2 directly"
    ],
    "correctIndex": 1,
    "explanation": "Level 0 tables can have overlapping ranges. Merging them into Level 1 performs a multiway merge sort, consolidating keys and deduplicating tombstones.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-24",
    "question": "Consider Raft log replication: Leader sends AppendEntries with `prevLogIndex = 5, prevLogTerm = 2`. Follower has its last entry at index 4. What is the Follower's response?",
    "options": [
      "Success = true",
      "Success = false (Log Inconsistency: follower rejects because it does not have an entry matching prevLogIndex 5)",
      "Follower crashes",
      "Follower becomes Leader immediately"
    ],
    "correctIndex": 1,
    "explanation": "If the follower does not contain an entry at `prevLogIndex` matching `prevLogTerm`, it rejects the AppendEntries RPC. The leader then decrements `nextIndex` and retries.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-25",
    "question": "In Cassandra with replication factor N = 3, write consistency is set to ALL and read consistency is set to ONE. What are the trade-offs?",
    "options": [
      "Writes are highly available, reads are slow",
      "Writes require all 3 replicas to be alive (tolerates 0 node failures for writes), but reads are fast (R=1) and strong consistency is maintained because R + W = 1 + 3 = 4 > 3",
      "Writes and reads both tolerate 2 node failures",
      "Data is inconsistent"
    ],
    "correctIndex": 1,
    "explanation": "With W=ALL (3) and R=ONE (1), R + W = 4 > 3, ensuring strong consistency. However, write availability is brittle: if even 1 node is down, writes fail.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-26",
    "question": "In distributed locking with Redis, Client A acquires lock with TTL 10s. Client A experiences a 15-second GC pause. Client B acquires lock at t = 11s. At t = 15s, Client A wakes up and writes to shared storage. What is this error called, and how does Martin Kleppmann solve it?",
    "options": [
      "Deadlock; solved by increasing RAM",
      "Lock Expiration / Stale Write hazard; solved by attaching monotonic Fencing Tokens issued by the lock manager, which the storage layer verifies before accepting writes",
      "Race condition; solved by turning off garbage collection",
      "Cache Stampede; solved by Bloom filter"
    ],
    "correctIndex": 1,
    "explanation": "GC pauses cause lock timeouts. When Client A resumes, it believes it still holds the lock. Monotonic fencing tokens ensure storage rejects Client A's stale token (e.g. 101) after Client B's newer token (102).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-27",
    "question": "Two database replicas reconcile using Vector Clocks: Replica 1 has VC1 = [A: 2, B: 0]. Replica 2 has VC2 = [A: 1, B: 3]. What is the merged vector clock after reconciliation?",
    "options": [
      "[A: 1, B: 0]",
      "[A: 3, B: 3]",
      "[A: 2, B: 3]",
      "[A: 2, B: 0]"
    ],
    "correctIndex": 2,
    "explanation": "When reconciling divergent vector clocks, the component-wise maximum is taken: max(2, 1) = 2 for A, and max(0, 3) = 3 for B, yielding [A: 2, B: 3].",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-28",
    "question": "In database sharding with Resharding: Moving from 4 shards to 8 shards using consistent hashing. If total keys = 8,000,000, roughly how many keys must be migrated across the network?",
    "options": [
      "8,000,000 keys (100%)",
      "4,000,000 keys (~50%)",
      "1,000,000 keys (~12.5%)",
      "0 keys"
    ],
    "correctIndex": 1,
    "explanation": "Doubling the number of nodes in consistent hashing splits each existing partition roughly in half. Approximately K/2 = 4,000,000 keys migrate, compared to ~100% in modulo hashing.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-29",
    "question": "Under standard modulo sharding `key % N`: If you have 4 shards and increase to 5 shards, what percentage of keys must be remapped?",
    "options": [
      "20%",
      "80%",
      "50%",
      "0%"
    ],
    "correctIndex": 1,
    "explanation": "In modulo sharding `hash(key) % N`, changing N from 4 to 5 changes the result of `hash(key) % 5` for roughly N / (N + 1) = 4 / 5 = 80% of all keys, triggering a massive data migration.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-30",
    "question": "Trace an idempotent payment request: Client sends `POST /pay` with `Idempotency-Key: abc-123`. Server processes payment and charges $50. Network times out before response reaches client. Client retries with `Idempotency-Key: abc-123`. What should the server do?",
    "options": [
      "Charge $50 again and return new receipt",
      "Look up key `abc-123` in idempotency store, find previously recorded successful response, and return the exact same receipt without re-executing the payment",
      "Throw an HTTP 500 error",
      "Refund the previous payment"
    ],
    "correctIndex": 1,
    "explanation": "Idempotency lookup identifies the key as completed and immediately replays the cached success response, preventing double charging.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-31",
    "question": "In Write-Through vs Write-Back caching: Cache latency = 1ms, DB write latency = 20ms. What is the client write latency under Write-Through vs Write-Back?",
    "options": [
      "Write-Through: 1ms; Write-Back: 21ms",
      "Write-Through: 21ms (synchronous write to both); Write-Back: 1ms (writes to cache and returns immediately, queuing DB write asynchronously)",
      "Both are 20ms",
      "Both are 1ms"
    ],
    "correctIndex": 1,
    "explanation": "Write-Through waits for DB persistence (1ms + 20ms = 21ms). Write-Back acknowledges once cache is updated (1ms), persisting to DB in the background.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-32",
    "question": "In distributed message queuing: A consumer pulls a message, processes it for 45 seconds, but the Visibility Timeout is set to 30 seconds. What happens?",
    "options": [
      "The message is permanently deleted",
      "At t = 30s, the message becomes visible again in the queue and another consumer worker picks it up, leading to duplicate processing",
      "The consumer process is terminated by the queue",
      "The queue pauses all messages"
    ],
    "correctIndex": 1,
    "explanation": "If processing time exceeds the visibility timeout, the broker assumes the worker died and re-exposes the message to other workers. The worker must use heartbeat extensions to renew the lease.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-33",
    "question": "What is the optimal thread pool size formula for an I/O-intensive task on an 8-core CPU where tasks spend 80% of time waiting for DB I/O (Wait/Compute ratio W/C = 4)?",
    "options": [
      "8 threads",
      "16 threads",
      "40 threads (Threads = Cores * (1 + W/C) = 8 * (1 + 4) = 40)",
      "4 threads"
    ],
    "correctIndex": 2,
    "explanation": "Goetz's formula: N_threads = N_cpu * U_cpu * (1 + W/C). For 100% CPU utilization: 8 * 1 * (1 + 4) = 40 threads to keep all 8 cores busy during 80% I/O wait.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-34",
    "question": "In Cassandra Tombstone Garbage Collection: `gc_grace_seconds` is set to 864,000 (10 days). A tombstone was written on day 1. Can compaction physically remove this tombstone on day 5?",
    "options": [
      "Yes, compaction removes tombstones immediately",
      "No; the tombstone must be retained for at least `gc_grace_seconds` (10 days) so offline replicas have time to detect the deletion and prevent phantom data resurrection",
      "Yes, if disk space is below 10%",
      "Tombstones can never be deleted"
    ],
    "correctIndex": 1,
    "explanation": "`gc_grace_seconds` prevents deleted data from resurrecting if a node was temporarily down during the delete. The tombstone is kept until the grace period expires.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-35",
    "question": "In a microservice call graph A -> B -> C: Service B fails with HTTP 500. Service A has a circuit breaker. After 10 consecutive failures, what does Service A's circuit breaker do for the 11th request?",
    "options": [
      "Forwards the request to Service B",
      "Immediately short-circuits and returns a fallback response or error without making a network call to Service B",
      "Restarts Service B remotely",
      "Drops the connection without responding"
    ],
    "correctIndex": 1,
    "explanation": "When tripped OPEN, the circuit breaker fails fast locally without sending requests downstream, protecting both services and preserving caller threads.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-36",
    "question": "In CDN caching: An origin server responds with `Cache-Control: public, max-age=300, stale-while-revalidate=60`. A request arrives at the CDN edge at t = 320s. What does the CDN do?",
    "options": [
      "Returns HTTP 504 Gateway Timeout",
      "Serves the stale cached response immediately to the user while asynchronously fetching a fresh copy from the origin server in the background",
      "Blocks the client until origin responds",
      "Purges the cache and returns 404"
    ],
    "correctIndex": 1,
    "explanation": "`stale-while-revalidate` allows edge caches to serve slightly stale content instantly to eliminate user-perceived latency while refreshing the resource asynchronously.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-37",
    "question": "Calculate Bloom filter false positive rate: With m/n = 10 bits per element and k = 7 optimal hash functions, the false positive probability p is roughly:",
    "options": [
      "50%",
      "1%",
      "0.001%",
      "10%"
    ],
    "correctIndex": 1,
    "explanation": "Using the Bloom filter equation p \\approx (1 - e^{-k n / m})^k \\approx (0.5)^7 \\approx 0.0078 \\approx 0.8% - 1%.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-38",
    "question": "In Redis Cluster, how many total hash slots exist, and what algorithm assigns keys to slots?",
    "options": [
      "1,024 slots; MurmurHash",
      "16,384 slots; CRC16(key) % 16384",
      "65,536 slots; SHA-256",
      "1,000,000 slots; MD5"
    ],
    "correctIndex": 1,
    "explanation": "Redis Cluster divides its keyspace into 16,384 hash slots using `HASH_SLOT = CRC16(key) mod 16384`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-39",
    "question": "What is a \"Hash Tag\" in Redis Cluster (e.g. `{user:100}:profile` and `{user:100}:orders`)?",
    "options": [
      "A Twitter integration feature",
      "Ensures both keys hash using only the text inside `{...}`, guaranteeing they map to the exact same hash slot and same physical node for multi-key operations",
      "An encryption key",
      "A tag that limits memory usage"
    ],
    "correctIndex": 1,
    "explanation": "Hash tags `{...}` force Redis Cluster to hash only the substring inside the braces, ensuring related keys land on the same node for multi-key transactions.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-40",
    "question": "In a distributed database: Transaction T1 updates Row R in Datacenter 1. Transaction T2 updates Row R in Datacenter 2 simultaneously. If Two-Phase Locking (2PL) across WAN is too slow, what optimistic concurrency technique is used?",
    "options": [
      "Single-threaded Redis",
      "Multi-Version Concurrency Control (MVCC) with Lamport / Hybrid Logical Clocks (HLC) and Last-Write-Wins or CRDTs",
      "Turning off replication",
      "Manual file locks"
    ],
    "correctIndex": 1,
    "explanation": "MVCC paired with Hybrid Logical Clocks (HLC) or Conflict-Free Replicated Data Types (CRDTs) enables non-blocking local writes and deterministic convergence.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-41",
    "question": "In Raft: Cluster has nodes S1, S2, S3, S4, S5. Leader S1 crashes. Can S2 be elected leader if only S3 and S4 vote for S2?",
    "options": [
      "No, S5 must also vote",
      "Yes, because S2, S3, and S4 constitute 3 votes, which is a strict majority (> 5/2 = 2.5) of the 5-node cluster",
      "No, 100% unanimity is required in Raft",
      "Only S1 can be leader"
    ],
    "correctIndex": 1,
    "explanation": "In a 5-node cluster, a majority quorum is 3. S2 receiving votes from S3, S4, and self (total 3) successfully wins the election.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-42",
    "question": "In Apache Kafka: A topic has 3 partitions. A consumer group has 4 consumers. How many consumers will be actively receiving messages?",
    "options": [
      "4 consumers",
      "3 consumers; 1 consumer will remain completely idle",
      "1 consumer",
      "0 consumers"
    ],
    "correctIndex": 1,
    "explanation": "A partition can only be assigned to a single consumer in a group. With 3 partitions and 4 consumers, at most 3 consumers can be active; the 4th sits idle on standby.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-43",
    "question": "In an append-only Write-Ahead Log: A corrupted record is detected at offset 4096 during recovery. What does the database do?",
    "options": [
      "Deletes the entire database",
      "Truncates the log at offset 4096 (discarding the incomplete/torn write), recovers up to the last valid checkpoint, and starts normal operation",
      "Ignores the error and continues",
      "Writes random bytes to disk"
    ],
    "correctIndex": 1,
    "explanation": "Torn writes from sudden power failure are truncated at the boundary of the last valid checksummed log record during crash recovery.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-44",
    "question": "Trace the token count in a Token Bucket with capacity 5, refill rate 1 token every 10 seconds. Initially empty (0 tokens). Requests arrive at: t=5s (1 token requested), t=10s (1 token), t=15s (1 token). Which succeed?",
    "options": [
      "All 3 succeed",
      "t=5s FAILS (0 tokens available); t=10s SUCCEEDS (1 token refilled); t=15s FAILS (0.5 tokens available < 1)",
      "Only t=5s succeeds",
      "All fail"
    ],
    "correctIndex": 1,
    "explanation": "At t=5s: tokens = 0.5 < 1 -> Rejected. At t=10s: tokens = 1.0 >= 1 -> Accepted, tokens drop to 0. At t=15s: elapsed 5s adds 0.5 tokens < 1 -> Rejected.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-45",
    "question": "In MySQL InnoDB, what is the purpose of the \"Doublewrite Buffer\"?",
    "options": [
      "Writing to two different database tables simultaneously",
      "Preventing torn page corruption on 16KB InnoDB pages when OS 4KB page writes are interrupted by crash; pages are written sequentially to doublewrite buffer before writing to data files",
      "Backing up data to AWS",
      "Encrypting passwords"
    ],
    "correctIndex": 1,
    "explanation": "Because OS writes in 4KB blocks while InnoDB pages are 16KB, a crash halfway through corrupts the page. Doublewrite buffer provides a pristine copy for recovery.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-46",
    "question": "In NGINX load balancing, what is the primary benefit of the `least_conn` algorithm over `round_robin` for microservices with heterogeneous request processing times?",
    "options": [
      "It encrypts incoming traffic",
      "It directs new requests to the backend server with the fewest active connections, preventing slow requests from accumulating on an overwhelmed server",
      "It reduces DNS lookup time",
      "It disables HTTP/2"
    ],
    "correctIndex": 1,
    "explanation": "`least_conn` balances dynamic load intelligently when request execution times vary widely, preventing pile-ups on slower servers.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-47",
    "question": "Why do distributed databases use Epoll / Kqueue instead of `select` or `poll` for multiplexing 100,000 concurrent network sockets?",
    "options": [
      "`select` is written in Java while `epoll` is written in Python",
      "`select` iterates through an O(N) descriptor set on every call, whereas `epoll` uses an O(1) event-driven callback mechanism returning only active descriptors",
      "`epoll` does not use memory",
      "`poll` has a limit of 10 connections"
    ],
    "correctIndex": 1,
    "explanation": "`select` scales as O(N) because the kernel must scan every file descriptor. `epoll` uses red-black trees and ready lists to notify in O(1) time per event.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-48",
    "question": "In high-throughput logging systems, why is Ring Buffer (Disruptor pattern) preferred over `BlockingQueue`?",
    "options": [
      "It uses 10x more threads",
      "It pre-allocates contiguous memory, avoids garbage collection churn, and uses lock-free atomic CAS operations with cache line padding to prevent false sharing",
      "It writes directly to tape",
      "It cannot overflow"
    ],
    "correctIndex": 1,
    "explanation": "LMAX Disruptor eliminates lock contention and GC overhead using a bounded pre-allocated circular array with cache-line-padded sequence pointers.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-49",
    "question": "In distributed caching, what does TTL jitter (e.g. `TTL = base_ttl + rand(0, 300)`) prevent?",
    "options": [
      "Buffer overflows",
      "Cache stampedes caused by simultaneous expiration of thousands of keys created in bulk at the same time",
      "Network routing loops",
      "Memory fragmentation"
    ],
    "correctIndex": 1,
    "explanation": "Adding random jitter to TTL spreads cache expiration times across a window, preventing waves of concurrent cache misses from overwhelming the database.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d14-post-50",
    "question": "In a distributed key-value store, what is the time complexity of locating the coordinator node for a key in a Consistent Hash Ring with V virtual nodes using binary search?",
    "options": [
      "O(V)",
      "O(log V)",
      "O(1)",
      "O(V^2)"
    ],
    "correctIndex": 1,
    "explanation": "Because virtual node tokens are stored in a sorted array or binary search tree (std::map / TreeMap), finding the successor token takes O(log V) time.",
    "category": "Practical Execution & Trace (70%)"
  }
];
