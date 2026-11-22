const fs = require('fs');
const path = require('path');

// 50 Pre-Assessment Questions (30% Theory [15 Qs], 70% Practical Tracing/Execution [35 Qs])
const preAssessment = [];

const theoryQuestions = [
  {
    q: 'In Object-Oriented Low-Level Design (LLD), what does the "Single Responsibility Principle" (SRP) strictly mandate?',
    opts: ['A class should have only one method', 'A class should have one, and only one, reason to change — encapsulating a single well-defined cohesive responsibility', 'Every variable must be private', 'All classes must inherit from an interface'],
    ans: 1,
    exp: 'SRP dictates that a class or module should be responsible to one, and only one, actor or business domain, preventing monolithic god-classes.'
  },
  {
    q: 'In the Strategy Design Pattern, what is the primary benefit over using nested `switch` or `if-else` blocks for dynamic business logic (e.g. pricing, discounts)?',
    opts: ['It runs in O(1) CPU cycles', 'It adheres to the Open-Closed Principle (OCP): new algorithms or pricing strategies can be introduced by creating new strategy classes without modifying or recompiling existing client code', 'It requires zero memory allocation', 'It disables garbage collection'],
    ans: 1,
    exp: 'The Strategy Pattern encapsulates algorithms behind a common interface, allowing them to vary independently from clients that use them.'
  },
  {
    q: 'What is the "Spurious Wakeup" problem in multi-threaded condition variables (POSIX `pthread_cond_wait`, Java `condition.await()`, C++ `cv.wait()`)?',
    opts: ['A thread wakes up before the computer is turned on', 'A waiting thread may be awakened even without any explicit signal or broadcast; therefore, the condition predicate must ALWAYS be re-evaluated inside a while loop (`while (!condition) wait()`)', 'A condition variable throws an OutOfMemoryError', 'The thread terminates without executing unlock'],
    ans: 1,
    exp: 'OS scheduling and hardware interrupts can unpark waiting threads without a signal. Enclosing waits in a `while (!ready)` loop protects against false progress.'
  },
  {
    q: 'What is the "ABA Problem" in lock-free concurrent programming using Compare-And-Swap (CAS)?',
    opts: ['When memory runs out in section A and B', 'When thread 1 reads value A, thread 2 changes A to B and back to A; thread 1 performs CAS seeing A and mistakenly assumes nothing changed, though underlying memory or pointers may have been freed or mutated', 'When an algorithm requires three mutexes named A, B, and A', 'When CPU cache lines are invalid'],
    ans: 1,
    exp: 'The ABA problem occurs when a memory location is modified from A to B and back to A. A naive CAS succeeds because the value matches A, despite intermediate side effects.'
  },
  {
    q: 'How does a Reader-Writer Lock (`std::shared_mutex`, `ReentrantReadWriteLock`) achieve higher throughput than a standard mutual exclusion lock (`mutex`) in read-heavy workloads?',
    opts: ['It executes all reads on the GPU', 'It allows multiple reader threads to acquire shared read locks concurrently as long as no writer holds or waits for an exclusive lock', 'It skips read operations entirely', 'It compresses data in memory'],
    ans: 1,
    exp: 'Shared read locks permit unlimited concurrent readers without blocking each other, dramatically reducing lock contention when reads dominate writes (e.g. 95% reads).'
  },
  {
    q: 'Why does an LRU Cache require BOTH a Hash Table and a Doubly Linked List to achieve O(1) time complexity for both `get` and `put` operations?',
    opts: ['Because singly linked lists cannot store numbers', 'The Hash Table provides O(1) key-to-node lookup, while the Doubly Linked List allows O(1) removal, relocation to head, and eviction of the tail node without scanning', 'Because binary trees are too fast', 'To support ACID transactions'],
    ans: 1,
    exp: 'A hash table locates the node in O(1). A doubly linked list splices the node to the head or removes the tail in O(1) via its prev and next pointers.'
  },
  {
    q: 'In the Saga pattern for distributed microservices, what distinguishes an "Orchestrated Saga" from a "Choreographed Saga"?',
    opts: ['Choreography uses a central orchestrator class while Orchestration uses events', 'An Orchestrated Saga uses a centralized coordinator service that explicitly invokes each participant step and compensates failures, whereas Choreographed Sagas rely on decentralized event pub/sub where services react autonomously', 'Choreography is only for SQL databases', 'Orchestration cannot handle rollbacks'],
    ans: 1,
    exp: 'Orchestration centralizes control in a state machine / orchestrator. Choreography distributes control through domain event listeners without a central brain.'
  },
  {
    q: 'In distributed locking, why is using a simple Redis key `SET key value NX EX 30` insufficient for mission-critical writes to shared storage?',
    opts: ['Because Redis cannot store strings', 'Because long stop-the-world GC pauses or network pauses can cause the lock lease to expire while the client is still working, allowing another client to acquire the lock; subsequent writes from both clients race unless guarded by Fencing Tokens', 'Because Redis crashes every 30 seconds', 'Because NX does not check key existence'],
    ans: 1,
    exp: 'As Martin Kleppmann proved, lease expiration during GC pauses breaks mutual exclusion unless the backing storage validates monotonically increasing fencing tokens.'
  },
  {
    q: 'What is the role of Martin Kleppmann\'s "Fencing Token" pattern in distributed systems?',
    opts: ['To encrypt messages sent over TLS', 'The lock service issues a monotonically increasing integer token on each lock acquisition; the target storage service verifies that the incoming write token is strictly greater than the highest token processed so far, discarding stale writes', 'To limit network bandwidth to 10 Mbps', 'To partition the database across availability zones'],
    ans: 1,
    exp: 'Fencing tokens enforce linearizable mutual exclusion at the storage boundary by rejecting writes carrying an obsolete token from a delayed or zombie client.'
  },
  {
    q: 'In the Two-Phase Commit (2PC) protocol, what happens if the Coordinator crashes permanently after Phase 1 (Prepare) but before sending any Phase 2 (Commit/Abort) messages?',
    opts: ['All participants automatically commit within 5 seconds', 'Participants that voted PREPARED are blocked indefinitely in an in-doubt state, holding transaction locks and unable to unilaterally commit or abort', 'All participants abort immediately', 'The database deletes the transaction log'],
    ans: 1,
    exp: '2PC is a blocking protocol. If the coordinator crashes while participants are in the PREPARED state, participants cannot proceed because they do not know whether others committed or aborted.'
  },
  {
    q: 'What is the "Observer Design Pattern", and when should it be applied in machine coding?',
    opts: ['A pattern that prints debug logs to the console', 'A one-to-many dependency pattern where subject state changes automatically notify and update all subscribed observer components (e.g. stock price tickers, notification engines, Kafka event listeners)', 'A pattern for compiling regular expressions', 'A pattern for allocating C++ heap memory'],
    ans: 1,
    exp: 'Observer decouples event sources (publishers/subjects) from event consumers (listeners/subscribers), allowing dynamic subscription without hardcoded dependencies.'
  },
  {
    q: 'Why should you avoid using `Thread.stop()` or abrupt thread termination in concurrent Java/C++ applications?',
    opts: ['Because it is 100x slower than normal execution', 'Because abrupt termination unlocks all held monitors immediately, leaving shared objects in an inconsistent, corrupt state without running cleanup or invariants', 'Because the operating system reboots', 'Because CPU registers are wiped'],
    ans: 1,
    exp: '`Thread.stop()` is deprecated because it releases all locked monitors atomically, exposing partially modified, corrupted data structures to other threads.'
  },
  {
    q: 'In concurrent programming, what is "False Sharing", and how do high-performance systems prevent it?',
    opts: ['When two users share the same login credentials', 'When threads running on different CPU cores modify independent variables that reside within the same 64-byte hardware cache line, causing constant invalidation and bus traffic; prevented by cache-line padding (e.g. `@Contended` or 64-byte alignment)', 'When a thread reads from an empty queue', 'When an OS file is read by two processes'],
    ans: 1,
    exp: 'False sharing degrades multi-core performance when independent variables share a CPU cache line. Padding to 64 bytes ensures variables occupy distinct cache lines.'
  },
  {
    q: 'What is the primary difference between Optimistic Concurrency Control (OCC) and Pessimistic Locking?',
    opts: ['OCC locks data upfront while Pessimistic locks never lock', 'Pessimistic locking acquires exclusive locks before reading/modifying to prevent conflicts; OCC allows concurrent reads and writes without locks, validating version numbers / timestamps at commit time and aborting on conflict', 'OCC is only used on single-core machines', 'Pessimistic locking does not support transactions'],
    ans: 1,
    exp: 'Pessimistic assumes conflicts and locks resources upfront. OCC assumes conflicts are rare, executing without locks and checking version stamps at commit time.'
  },
  {
    q: 'In technical interviews, what is the best strategy when presented with an ambiguous problem statement?',
    opts: ['Immediately start writing code in silence', 'Clarify functional requirements, constraints, input scale, expected data types, and edge cases with the interviewer before writing a single line of architecture or code', 'Refuse to answer until the interviewer writes the test cases', 'Assume the simplest possible input of size 1'],
    ans: 1,
    exp: 'Senior engineers are evaluated on requirement gathering. Clarifying bounds, constraints, and failure modes shows architectural maturity.'
  }
];

theoryQuestions.forEach((item, idx) => {
  preAssessment.push({
    id: `d15-pre-${idx + 1}`,
    question: item.q,
    options: item.opts,
    correctIndex: item.ans,
    explanation: item.exp,
    category: 'Theory (30%)'
  });
});

const practicalQuestions = [
  {
    q: 'Trace the state of a Treiber Lock-Free Stack after:\npush(10)\npush(20)\npop() -> x\npush(30)\npop() -> y\nWhat are the values of x and y, and the top element?',
    opts: ['x = 10, y = 30, top = 20', 'x = 20, y = 30, top = 10', 'x = 20, y = 10, top = 30', 'x = 10, y = 20, top = empty'],
    ans: 1,
    exp: '1) push(10) -> [10]; 2) push(20) -> [20, 10]; 3) pop() pops 20 -> x = 20, stack is [10]; 4) push(30) -> [30, 10]; 5) pop() pops 30 -> y = 30, stack is [10]. Top is 10.'
  },
  {
    q: 'In an LRU Cache with capacity = 2:\nput(1, 100)\nput(2, 200)\nget(1) -> returns 100\nput(3, 300)\nget(2) -> ?\nget(1) -> ?',
    opts: ['get(2) returns 200, get(1) returns -1', 'get(2) returns -1, get(1) returns 100', 'Both return -1', 'Both return values'],
    ans: 1,
    exp: 'After put(1) then put(2), order is [2, 1]. Calling get(1) promotes 1 to head: [1, 2]. put(3) evicts the tail (2). Thus get(2) returns -1 (evicted), and get(1) returns 100.'
  },
  {
    q: 'A Bounded Blocking Queue has capacity = 3. Thread 1 enqueues [A, B, C]. Thread 2 calls enqueue(D). What happens to Thread 2?',
    opts: ['Thread 2 overwrites item A', 'Thread 2 blocks on the `not_full` condition variable until a consumer calls dequeue() to free a slot', 'Queue throws an unchecked exception', 'Thread 2 creates a new queue'],
    ans: 1,
    exp: 'When a bounded blocking queue is at capacity, enqueue operations block waiting on the `not_full` condition variable until a slot is made available.'
  },
  {
    q: 'Trace a Reader-Writer Lock with Writer Preference: 2 active readers are holding read locks. A writer calls lockWrite(). Then a 3rd reader calls lockRead(). What happens?',
    opts: ['Reader 3 acquires the lock immediately', 'Writer blocks waiting for active readers; Reader 3 blocks because waiting_writers > 0 (writer preference prevents starvation)', 'All threads deadlock permanently', 'The writer aborts with an error'],
    ans: 1,
    exp: 'Under writer preference, when a writer begins waiting, new reader acquisitions are blocked to prevent continuous reader streams from starving the writer.'
  },
  {
    q: 'A Fencing Storage Service has processed highest token = 42. Three requests arrive in order: Write(token=45), Write(token=43), Write(token=48). Which writes succeed?',
    opts: ['All three succeed', 'Token 45 succeeds (highest becomes 45); Token 43 is REJECTED (43 <= 45); Token 48 succeeds (highest becomes 48)', 'Only Token 48 succeeds', 'Only Token 43 succeeds'],
    ans: 1,
    exp: 'Token 45 > 42 -> Accepted, highest=45. Token 43 <= 45 -> Rejected (stale write!). Token 48 > 45 -> Accepted, highest=48.'
  },
  {
    q: 'In a Two-Phase Commit transaction across 4 nodes, Node 1 votes PREPARED, Node 2 votes PREPARED, Node 3 votes ABORT, Node 4 votes PREPARED. What does Coordinator do?',
    opts: ['Commits on Nodes 1, 2, and 4', 'Broadcasts GLOBAL_ABORT to all 4 nodes, rolling back any prepared state', 'Retries Node 3 until it says yes', 'Reboots the cluster'],
    ans: 1,
    exp: '2PC requires unanimous PREPARED votes. If any participant votes ABORT, the coordinator must abort the entire distributed transaction.'
  },
  {
    q: 'In a Saga workflow with steps [ReserveInventory, ChargeCard, DispatchCourier]: ReserveInventory succeeds. ChargeCard fails with Insufficient Funds. What compensating actions run?',
    opts: ['No compensation needed', 'CancelReservation runs to undo ReserveInventory; DispatchCourier is never called', 'DispatchCourier runs then cancels', 'The whole database resets'],
    ans: 1,
    exp: 'The Saga rollback executes compensating transactions in reverse order strictly for steps that completed. ReserveInventory is compensated; DispatchCourier was never invoked.'
  },
  {
    q: 'In Java 21, what does the following code print?\n```java\nAtomicInteger counter = new AtomicInteger(10);\nboolean s1 = counter.compareAndSet(10, 20);\nboolean s2 = counter.compareAndSet(10, 30);\nSystem.out.println(s1 + " " + s2 + " " + counter.get());\n```',
    opts: ['true true 30', 'true false 20', 'false true 30', 'false false 10'],
    ans: 1,
    exp: 'First CAS succeeds (10 == 10, value becomes 20 -> true). Second CAS fails because current value is 20 != 10 -> false. Counter remains 20.'
  },
  {
    q: 'Consider an Expiring In-Memory Cache. Key "jwt" is inserted at t=100 with TTL=500ms (expiry t=600). At t=400, get("jwt") is called. At t=650, get("jwt") is called. What are the results?',
    opts: ['Both return the JWT value', 't=400 returns JWT value; t=650 returns null/empty (lazily evicted)', 'Both return null', 't=400 returns null, t=650 returns JWT'],
    ans: 1,
    exp: 'At t=400 <= 600, key is valid. At t=650 > 600, key is expired and lazily deleted, returning null.'
  },
  {
    q: 'In a Multi-Level Parking Lot with 2 floors and 2 spots per floor (Compact=0, Regular=1). A CAR (requires Regular spot) attempts to park. Floor 1 has spots [Compact, Regular(occupied)]. Floor 2 has spots [Compact, Regular(empty)]. Where does the car park?',
    opts: ['Floor 1, Spot 0', 'Floor 2, Regular spot (Spot 1)', 'Parking is rejected', 'Floor 1, Spot 1'],
    ans: 1,
    exp: 'Floor 1 Regular spot is occupied and Compact cannot accommodate a car. The search advances to Floor 2, successfully finding the empty Regular spot.'
  },
  {
    q: 'What is the deadlock risk in the Dining Philosophers problem if all 5 philosophers simultaneously pick up their left chopstick first?',
    opts: ['No risk; all can eat together', 'Circular Wait deadlock: each philosopher holds their left chopstick and blocks waiting for their right chopstick held by their neighbor', 'Chopsticks break', 'Memory leaks occur'],
    ans: 1,
    exp: 'If all 5 philosophers acquire their left chopstick simultaneously, each waits forever for the right chopstick held by their neighbor, creating a circular wait deadlock.'
  },
  {
    q: 'How does Resource Hierarchy solution solve the Dining Philosophers deadlock?',
    opts: ['Philosophers eat with their hands', 'Assign numbers 1 to 5 to chopsticks; require every philosopher to always acquire the lower-numbered chopstick first before the higher-numbered chopstick, breaking circular wait', 'Add 5 more chopsticks', 'Use random wait times'],
    ans: 1,
    exp: 'Imposing a global total ordering on resources and requiring acquisitions in strictly ascending order mathematically eliminates circular wait cycles.'
  },
  {
    q: 'In a thread pool with corePoolSize = 2, maxPoolSize = 4, and bounded queue capacity = 2: 5 tasks arrive simultaneously. Assuming each task takes 10 seconds, how are tasks handled in Java `ThreadPoolExecutor`?',
    opts: ['Tasks 1 & 2 run on core threads; Tasks 3 & 4 queue in workQueue; Task 5 triggers creation of a 3rd thread to execute Task 5 immediately', 'All 5 tasks run concurrently', 'Task 5 is rejected immediately', 'Tasks 1 to 5 wait in queue'],
    ans: 0,
    exp: 'In Java ThreadPoolExecutor: 1) Fill corePoolSize (2 tasks); 2) Fill workQueue (2 tasks); 3) When queue is full, spawn up to maxPoolSize (Task 5 spawns thread 3).'
  },
  {
    q: 'If a 6th task arrives in the previous scenario (threads=3, queue=2, max=4)?',
    opts: ['Task 6 spawns 4th thread (reaching maxPoolSize = 4) and runs immediately', 'Task 6 is rejected', 'Task 6 waits in queue', 'System crashes'],
    ans: 0,
    exp: 'Queue is full (2 tasks) and active threads are 3 < maxPoolSize (4). A 4th worker thread is spawned to run Task 6.'
  },
  {
    q: 'If a 7th task arrives in the same scenario (active threads = 4, queue = 2)?',
    opts: ['Spawns thread 5', 'RejectedExecutionHandler is invoked (e.g. AbortPolicy throws RejectedExecutionException)', 'Task 7 waits forever', 'Reboots thread pool'],
    ans: 1,
    exp: 'Both the queue (2 tasks) and maximum thread pool (4 threads) are saturated. The 7th task triggers the rejection policy.'
  },
  {
    q: 'In an in-memory Key-Value store, key "counter" has value "10". Two concurrent threads execute `INCR counter`. If the engine uses single-threaded event loop (like Redis), what is the final value?',
    opts: ['11', '12', '10', 'Random undefined value'],
    ans: 1,
    exp: 'Redis executes commands atomically on a single thread. The two `INCR` commands execute sequentially: 10 -> 11 -> 12 with zero race conditions.'
  },
  {
    q: 'In an idempotency gate using `SET key token NX EX 300`: Client sends request with ID "req-99". Gateway executes `SET req-99 "IN_PROGRESS" NX EX 300`. Returns OK. A duplicate request arrives 2ms later with same ID "req-99". What does the gateway do?',
    opts: ['Executes the payment again', '`SET NX` fails (returns null/false) because key already exists; gateway detects in-progress transaction and waits/returns 409 Conflict without re-executing', 'Deletes the key', 'Throws NullPointerException'],
    ans: 1,
    exp: '`NX` (Not Exists) fails on duplicate keys, preventing concurrent double-execution of the business logic.'
  },
  {
    q: 'In Java, what is the output of:\n```java\nString a = "FAANG";\nString b = "FAANG";\nSystem.out.println((a == b) + " " + a.equals(b));\n```',
    opts: ['false true', 'true true', 'true false', 'false false'],
    ans: 1,
    exp: 'String literals are interned in the JVM String Pool, so both variables reference the exact same memory address (`a == b` is true, and content equals is true).'
  },
  {
    q: 'What is the output if `String b = new String("FAANG");` is used instead in Java?',
    opts: ['true true', 'false true', 'true false', 'false false'],
    ans: 1,
    exp: '`new String(...)` explicitly allocates a distinct object on the heap. Thus `a == b` compares distinct references (false), while `a.equals(b)` compares contents (true).'
  },
  {
    q: 'In C++20, what is the difference between `std::unique_lock` and `std::lock_guard`?',
    opts: ['`std::unique_lock` is faster', '`std::lock_guard` is a simple RAII wrapper that acquires lock on construction and releases on destruction; `std::unique_lock` provides deferred locking, manual unlocking/relocking, and compatibility with condition variables', '`std::lock_guard` supports condition variables', 'They are completely identical'],
    ans: 1,
    exp: '`std::unique_lock` is more flexible, allowing explicit unlocking and condition variable waits, whereas `lock_guard` is strictly scoped RAII.'
  },
  {
    q: 'Trace the execution of Python `@functools.lru_cache(maxsize=2)`:\n`fib(1)` -> computed\n`fib(2)` -> computed\n`fib(3)` -> computed (evicts fib(1))\n`fib(2)` -> ?',
    opts: ['Recomputed', 'Cache Hit (served instantly from cache without re-execution)', 'Throws error', 'Clears cache'],
    ans: 1,
    exp: 'Cache capacity is 2. `fib(2)` was not evicted (only oldest `fib(1)` was evicted when `fib(3)` was added). Calling `fib(2)` is a cache hit.'
  },
  {
    q: 'In a thread-safe Queue, why should the Condition Variable signal use `notify_one()` vs `notify_all()` when an item is enqueued?',
    opts: ['`notify_all()` is always better', 'If multiple consumers are waiting, enqueuing a SINGLE item only needs to wake up ONE consumer (`notify_one()`), avoiding the thundering herd overhead of waking all consumers where only one can consume', '`notify_one()` deletes the queue', '`notify_all()` causes memory leaks'],
    ans: 1,
    exp: 'When exactly one item is added, waking all waiting threads wastes CPU cycles since all but one will immediately go back to sleep.'
  },
  {
    q: 'When MUST you use `notify_all()` (or `broadcast`) instead of `notify_one()`?',
    opts: ['Never', 'When a state change affects multiple threads or different types of waiters (e.g. Writer releasing lock wakes ALL waiting readers; or BoundedQueue shutting down)', 'Only when memory is below 1GB', 'When threads are running on different computers'],
    ans: 1,
    exp: 'When a condition transition enables multiple waiting threads to make progress simultaneously (such as a write lock release allowing all waiting readers), `notify_all()` is required.'
  },
  {
    q: 'Trace a distributed lock renewal (Heartbeat): Lock TTL is 30 seconds. A background watchdog thread periodically renews the lock every 10 seconds. If the client process hangs in a 40-second JVM GC pause, what happens to the lock?',
    opts: ['The lock is held forever', 'Because the GC pause halts all threads including the watchdog, renewal fails. At t=30s Redis auto-expires the key, freeing it for other clients', 'Redis crashes', 'The watchdog wakes up during GC'],
    ans: 1,
    exp: 'Stop-the-world GC pauses freeze the watchdog thread, allowing the TTL to expire in Redis and preventing indefinite deadlocks.'
  },
  {
    q: 'What is the ABA prevention mechanism in Java\'s `AtomicStampedReference<T>`?',
    opts: ['It encrypts the pointer', 'It associates an integer version stamp with the object reference; both the reference AND the version stamp must match for `compareAndSet` to succeed', 'It uses B-trees', 'It disables garbage collection'],
    ans: 1,
    exp: '`AtomicStampedReference` stores `[reference, stamp]`. Even if the reference changes from A to B back to A, the stamp has incremented (e.g. 1 -> 2 -> 3), causing CAS to fail.'
  },
  {
    q: 'In a Distributed Cash Register / ATM simulation, Account A has \$100. Two concurrent ATMs process withdrawals of \$80 and \$70. If isolation level is Read Committed without row locking, what anomaly can occur?',
    opts: ['Dirty Read', 'Lost Update / Over-withdrawal: both transactions read balance \$100 simultaneously, both verify \$100 >= withdrawal, resulting in final balance < 0 (race condition)', 'Non-repeatable read', 'Phantom read'],
    ans: 1,
    exp: 'Without pessimistic row locking (`SELECT FOR UPDATE`) or atomic conditional updates (`UPDATE accounts SET balance = balance - 80 WHERE balance >= 80`), concurrent reads cause lost updates.'
  },
  {
    q: 'What is the correct atomic SQL update statement to safely prevent over-withdrawal without pessimistic table locks?',
    opts: ['`UPDATE accounts SET balance = 0;`', '`UPDATE accounts SET balance = balance - 80 WHERE account_id = 1 AND balance >= 80;` and check if rows_affected == 1', '`SELECT balance FROM accounts;`', '`DROP TABLE accounts;`'],
    ans: 1,
    exp: 'Atomic conditional UPDATE checks `balance >= amount` directly inside the database lock, returning `rows_affected = 0` if balance is insufficient.'
  },
  {
    q: 'In an In-Memory File System LLD, what data structure cleanly represents directory hierarchies?',
    opts: ['Linear Array', 'Trie / N-ary Tree where each directory node contains a hash map of child names to Node pointers (Files or Subdirectories)', 'Doubly Linked List', 'Bloom Filter'],
    ans: 1,
    exp: 'A Trie / N-ary tree mirrors filesystem paths (`/usr/local/bin`) where path segments act as branch keys pointing to child directory or file nodes.'
  },
  {
    q: 'In a Thread-Safe Ring Buffer, why is the buffer capacity almost always chosen as a power of 2 (e.g. 1024)?',
    opts: ['Because CPUs can only allocate powers of 2', 'It allows replacing the slow modulo operator `% capacity` with an ultra-fast bitwise AND `& (capacity - 1)`', 'To prevent memory fragmentation', 'To support floating point numbers'],
    ans: 1,
    exp: 'If capacity is a power of 2, `index % capacity` is mathematically identical to `index & (capacity - 1)`, which executes in a single CPU cycle.'
  },
  {
    q: 'In a Web Crawler LLD, what is the best data structure to keep track of already visited URLs with minimum memory overhead?',
    opts: ['SQL Database table with text indexing', 'Bloom Filter or Scalable Counting Bloom Filter in RAM backed by a persistent key-value store', 'A text file on the Desktop', 'A 2D array of strings'],
    ans: 1,
    exp: 'A Bloom filter represents hundreds of millions of URLs in a few megabytes of RAM with O(1) checks, skipping already-crawled URLs before hitting storage.'
  },
  {
    q: 'In a Movie Ticket Booking System LLD, how do you prevent two users from booking the same seat simultaneously during checkout?',
    opts: ['Allow both to book and cancel one later', 'Temporary Seat Reservation with TTL (e.g. 10 minutes) stored with atomic state machine transition `AVAILABLE -> RESERVED -> BOOKED`; if payment succeeds, state transitions to BOOKED; if TTL expires, reverts to AVAILABLE', 'Shut down the server during booking', 'Only allow one user to visit the website at a time'],
    ans: 1,
    exp: 'Seat locking holds a temporary lease (10 min) with atomic CAS/Redis lease. If payment completes within TTL, status becomes BOOKED; otherwise lease expires.'
  },
  {
    q: 'In C++ memory models, what is `std::memory_order_relaxed` vs `std::memory_order_seq_cst`?',
    opts: ['Relaxed is slower', '`relaxed` guarantees atomic operation on the variable itself but provides NO synchronization or instruction ordering guarantees across threads; `seq_cst` enforces strict sequential consistency with full memory fences across all threads', '`seq_cst` causes memory leaks', 'Relaxed does not compile on x86'],
    ans: 1,
    exp: '`relaxed` allows compiler and CPU reordering, providing atomicity only. `seq_cst` (default) establishes a globally synchronized sequential execution order.'
  },
  {
    q: 'In FAANG behavioral and design rounds, when an interviewer challenges your architecture with "What if traffic surges 100x overnight?", what is the expected response framework?',
    opts: ['Say that it is impossible', 'Identify the primary bottleneck (e.g. DB writes, network I/O, cache hit ratio) -> Propose horizontal scaling and sharding -> Introduce asynchronous decoupling via message queues -> Add CDN/edge caching', 'Recommend rewriting everything in Rust', 'Suggest buying 100x bigger server immediately'],
    ans: 1,
    exp: 'Senior candidates systematically identify bottlenecks (Compute vs I/O vs Storage), apply queue-based buffering to absorb bursts, and propose horizontal sharding.'
  },
  {
    q: 'Trace the output of this Python generator pipeline:\n```python\nnums = [1, 2, 3, 4, 5]\ng = (x * 2 for x in nums if x % 2 == 1)\nprint(list(g))\n```',
    opts: ['[2, 4, 6, 8, 10]', '[2, 6, 10]', '[1, 3, 5]', '[4, 8]'],
    ans: 1,
    exp: 'Filter keeps odd numbers: [1, 3, 5]. Mapping multiplies each by 2: [2, 6, 10].'
  },
  {
    q: 'At the end of your 15-Day FAANG Placement journey, what is the single most decisive factor that separates top offers from rejections in final interview loops?',
    opts: ['Typing speed', 'Demonstrating deep mastery of data structure trade-offs, writing clean, bug-free, modular polyglot code, communicating thought process clearly, and validating edge cases rigorously', 'Memorizing solutions without understanding', 'Writing code only in one language without knowing memory details'],
    ans: 1,
    exp: 'FAANG interviewers look for structured problem decomposition, mastery of algorithmic invariants, clean OOP/systems architecture, and defensive verification of edge cases.'
  }
];

practicalQuestions.forEach((item, idx) => {
  preAssessment.push({
    id: `d15-pre-${16 + idx}`,
    question: item.q,
    options: item.opts,
    correctIndex: item.ans,
    explanation: item.exp,
    category: 'Practical Execution & Trace (70%)'
  });
});

// 50 Post-Assessment Questions (30% Theory [15 Qs], 70% Practical Tracing/Execution [35 Qs])
const postAssessment = [];

const postTheoryQuestions = [
  {
    q: 'In clean architecture for enterprise machine coding, what does the "Dependency Inversion Principle" (DIP) state?',
    opts: ['High-level modules should depend on low-level modules directly', 'High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces), decoupling business rules from infrastructure details', 'Dependencies should be resolved at runtime using reflection only', 'All variables must be global'],
    ans: 1,
    exp: 'DIP ensures business logic does not depend on database drivers or UI frameworks; both depend on domain repository interfaces.'
  },
  {
    q: 'Why is the Decorator Pattern preferred over Subclassing when adding dynamic features (e.g. coffee toppings, logging wrappers, HTTP interceptors)?',
    opts: ['Subclassing causes compile errors', 'Subclassing leads to an exponential class explosion (e.g. CoffeeWithMilkAndSugar), whereas Decorators wrap objects dynamically at runtime, adhering to Single Responsibility and Composition over Inheritance', 'Decorators don\'t use memory', 'Subclassing cannot override methods'],
    ans: 1,
    exp: 'Decorators wrap classes dynamically to add behavior without inheriting rigid monolithic subclass trees.'
  },
  {
    q: 'In concurrent Java, what is the purpose of the `volatile` keyword on a shared variable?',
    opts: ['It acquires a synchronized lock on the variable', 'It guarantees memory visibility: reads and writes bypass CPU thread local caches and interact directly with main memory, preventing stale values and compiler instruction reordering', 'It makes the variable immutable', 'It deletes the variable on garbage collection'],
    ans: 1,
    exp: '`volatile` guarantees that any thread reading the field sees the most recent write made by any other thread, establishing a happens-before relationship without mutual exclusion.'
  },
  {
    q: 'What is a "Deadlock", and what are the 4 Coffman Conditions that MUST all hold simultaneously for a deadlock to occur?',
    opts: ['Memory leak, CPU spike, Network drop, Disk failure', 'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait', 'Read lock, Write lock, Shared lock, Exclusive lock', 'TCP timeout, UDP drop, SYN flood, ACK miss'],
    ans: 1,
    exp: 'Coffman conditions: 1) Mutual Exclusion; 2) Hold and Wait; 3) No Preemption; 4) Circular Wait. Breaking any one condition prevents deadlocks.'
  },
  {
    q: 'In lock-free data structures, what is the difference between "Lock-Free" and "Wait-Free" guarantees?',
    opts: ['Lock-free is faster in all cases', 'Lock-free guarantees system-wide progress (at least one thread makes progress in finite steps, though individual threads may starve); Wait-free guarantees per-thread progress (every thread makes progress in a bounded number of steps)', 'Wait-free uses mutexes while Lock-free does not', 'They are synonymous'],
    ans: 1,
    exp: 'Wait-free is a strictly stronger guarantee than lock-free: every operation completes in a bounded number of steps regardless of other threads\' timing.'
  },
  {
    q: 'How does a CountDownLatch differ from a CyclicBarrier in concurrent synchronization?',
    opts: ['They are identical', 'CountDownLatch cannot be reset once its count reaches zero; CyclicBarrier can be reused/reset repeatedly after all threads trip the barrier', 'CountDownLatch is for networks while CyclicBarrier is for disks', 'CyclicBarrier only works with 2 threads'],
    ans: 1,
    exp: 'CountDownLatch is a one-shot countdown for waiting on N events. CyclicBarrier synchronizes a fixed set of threads that repeatedly meet at a barrier.'
  },
  {
    q: 'In distributed transaction coordination, why is 3-Phase Commit (3PC) non-blocking under crash failures compared to 2PC, and why is it rarely used in practice?',
    opts: ['3PC uses three coordinators', '3PC introduces a PreCommit phase and timeout-driven transitions that allow non-blocking decisions under fail-stop node crashes, but it fails under network partitions, making Paxos/Raft superior', '3PC requires zero network messages', '3PC cannot run on Linux'],
    ans: 1,
    exp: '3PC is non-blocking only if network partitions never occur. Since real networks suffer partitions, 3PC can split-brain, so Raft/Paxos are preferred.'
  },
  {
    q: 'What is "Write-Skew" anomaly in database snapshot isolation transactions?',
    opts: ['Writing to disk at an angle', 'When two concurrent transactions read overlapping data, verify an invariant (e.g. at least one doctor on call), make disjoint updates that violate the invariant, and both commit successfully because their write sets did not overlap', 'When a single write updates two tables', 'When disk blocks are written out of order'],
    ans: 1,
    exp: 'Write-skew occurs under Snapshot Isolation when transactions make decisions based on shared read state and write to separate records, violating a cross-record constraint.'
  },
  {
    q: 'In in-memory caches, what is the LFU (Least Frequently Used) cache eviction policy, and what is its optimal Big-O implementation?',
    opts: ['O(N) search through an array', 'Evicts keys with lowest access frequency; implemented in O(1) time using a Hash Map of keys to nodes, and a Doubly Linked List of frequency buckets containing doubly linked lists of nodes', 'O(N^2) bubble sort', 'O(log N) binary tree only'],
    ans: 1,
    exp: 'An O(1) LFU cache maintains a hash map of keys, and a linked list of frequency nodes where each frequency node holds a linked list of items with that count.'
  },
  {
    q: 'In high-scale notification systems (e.g. Twitter/Uber), what is the "Fanout-on-Write" vs "Fanout-on-Read" architectural trade-off?',
    opts: ['Fanout-on-write is always better', 'Fanout-on-write pushes posts into every follower\'s feed cache at write time (fast reads, slow writes for celebrities); Fanout-on-read fetches and merges posts at read time (fast writes, slow reads); hybrid systems push for normal users and pull for celebrities', 'Fanout-on-read deletes old messages', 'Fanout-on-write requires magnetic tape'],
    ans: 1,
    exp: 'Fanout-on-write optimizes read latency by precomputing timelines. For high-follower accounts ("celebrity problem"), fanout-on-read prevents millions of write jobs.'
  },
  {
    q: 'What is the "Circuit Breaker" half-open state?',
    opts: ['The circuit breaker is broken and needs repair', 'After an open timeout expires, the breaker enters HALF_OPEN, allowing a limited probe trial of requests to pass through: if they succeed, it closes; if they fail, it reopens', 'All traffic is routed to the backup datacenter permanently', 'Requests are duplicated'],
    ans: 1,
    exp: 'In HALF_OPEN, the circuit breaker tests whether the struggling downstream dependency has recovered by sending a small sample of probe requests.'
  },
  {
    q: 'Why is Monotonic Clock (`CLOCK_MONOTONIC`, `System.nanoTime()`, `std::chrono::steady_clock`) mandatory for measuring durations instead of Wall-Clock Time (`System.currentTimeMillis()`)?',
    opts: ['Monotonic clocks are encrypted', 'Wall-clock time can jump backwards or forwards due to NTP time synchronization, leap seconds, or manual adjustments, producing negative durations or timing anomalies', 'Monotonic clocks use less battery', 'Wall-clock time is only accurate to minutes'],
    ans: 1,
    exp: 'Wall-clock time can skew or step backward due to NTP sync. Monotonic clocks guarantee non-decreasing ticks, making them safe for elapsed duration measurements.'
  },
  {
    q: 'In real-time trading engines, what is "Kernel Bypass" (e.g. DPDK, Solarflare OpenOnload)?',
    opts: ['Running code without an operating system', 'Techniques that bypass the standard OS network stack and context switches, allowing user-space applications to read network packets directly from the NIC ring buffer in sub-microsecond latency', 'Writing assembly language by hand', 'Disabling CPU caches'],
    ans: 1,
    exp: 'Kernel bypass eliminates OS interrupts, socket buffers, and syscall context switches, letting user space process network packets in sub-microseconds.'
  },
  {
    q: 'What is the difference between Synchronous Non-Blocking I/O (NIO) and Asynchronous I/O (AIO / io_uring)?',
    opts: ['NIO does not support files', 'NIO informs the application when a descriptor is ready to be read (application performs the read syscall); AIO / io_uring initiates the read in the kernel and notifies the application when the data has already been copied into the buffer', 'AIO is older than NIO', 'NIO runs only on Windows'],
    ans: 1,
    exp: 'NIO is readiness-based (select/epoll tells you data is ready). Proactor / io_uring is completion-based (kernel performs I/O and notifies when complete).'
  },
  {
    q: 'In the FAANG interview synthesis, what is the best approach when an interviewer presents a constraint you haven\'t seen before?',
    opts: ['Give up immediately', 'Acknowledge the constraint, relate it to foundational principles (e.g. graph search, sliding window, topological sort, concurrency invariants), voice your hypotheses, and test them with simple examples', 'Pretend you know the answer and guess', 'Change the question to an easier one'],
    ans: 1,
    exp: 'Interviewers often introduce novel constraints to evaluate problem-solving adaptability. Connecting the constraint back to core invariants demonstrates true senior engineering capability.'
  }
];

postTheoryQuestions.forEach((item, idx) => {
  postAssessment.push({
    id: `d15-post-${idx + 1}`,
    question: item.q,
    options: item.opts,
    correctIndex: item.ans,
    explanation: item.exp,
    category: 'Theory (30%)'
  });
});

const postPracticalQuestions = [
  {
    q: 'Trace the state of a thread-safe LRU Cache with capacity 3:\nput(A, 1)\nput(B, 2)\nput(C, 3)\nget(A)\nput(D, 4)\nWhich key is evicted?',
    opts: ['Key A', 'Key B', 'Key C', 'Key D'],
    ans: 1,
    exp: '1) [C, B, A]; 2) get(A) moves A to head: [A, C, B]; 3) put(D) evicts least recently used tail, which is B.'
  },
  {
    q: 'In a Bounded Blocking Queue with capacity 1:\nProducer 1 enqueues item X.\nProducer 2 enqueues item Y.\nConsumer calls dequeue().\nWhat does Consumer receive, and what does Producer 2 do?',
    opts: ['Consumer gets Y; Producer 2 throws error', 'Consumer gets X; Producer 2 was blocked and is unparked to enqueue Y', 'Consumer gets nothing', 'Both producers crash'],
    ans: 1,
    exp: 'Queue holds X. Producer 2 blocks on `not_full`. When consumer dequeues X, `not_full` signals, unblocking Producer 2 to insert Y.'
  },
  {
    q: 'Trace a Saga transaction: Step 1 (Debit $50) -> OK; Step 2 (Reserve Hotel) -> OK; Step 3 (Book Flight) -> FAILS. In what order do compensating actions execute?',
    opts: ['Cancel Hotel, then Credit $50', 'Credit $50, then Cancel Hotel', 'Cancel Hotel only', 'No compensation'],
    ans: 0,
    exp: 'Rollback runs compensating transactions in reverse chronological order: Cancel Hotel first, then Credit $50.'
  },
  {
    q: 'Two threads concurrently execute:\n`counter.compare_exchange_weak(expected, expected + 1)`\nInitial counter = 50. Thread A and B both read expected = 50. Thread A wins CAS. What does Thread B\'s CAS return, and what is its next step?',
    opts: ['Returns true; counter becomes 52', 'Returns false (CAS failed because counter is now 51 != 50); Thread B updates its expected value to 51 and retries in the loop', 'Thread B terminates', 'Counter resets to 0'],
    ans: 1,
    exp: 'CAS fails when expected != current. Thread B receives false, refreshes expected to 51, and loops to retry.'
  },
  {
    q: 'In a parking lot LLD with 1 Floor and 3 spots: [Spot 0: Bike, Spot 1: Car, Spot 2: Truck].\nA Truck arrives and parks in Spot 2.\nA Car arrives and parks in Spot 1.\nA second Truck arrives. What is returned?',
    opts: ['Parks in Spot 0', 'Parks in Spot 1', 'Returns -1 (No large spot available for truck)', 'Overwrites Spot 2'],
    ans: 2,
    exp: 'Trucks require Large spots. Spot 2 (Large) is taken. Spot 0 (Compact) and Spot 1 (Regular) cannot accommodate trucks. Thus returns -1.'
  },
  {
    q: 'A Token Bucket Rate Limiter with capacity 10 and refill rate 5 tokens/sec starts empty (0 tokens) at t=0. At t=2s, 12 requests arrive simultaneously. How many requests succeed?',
    opts: ['0 requests', '10 requests succeed; 2 are dropped', '12 requests succeed', '5 requests succeed'],
    ans: 1,
    exp: 'In 2s, bucket accumulates 2 * 5 = 10 tokens (capped at capacity 10). The first 10 requests consume all tokens; remaining 2 are throttled.'
  },
  {
    q: 'In a Fencing Storage Gate: Coordinator issues Token 101 to Client A and Token 102 to Client B. Client B writes with Token 102 (accepted, highest=102). Client A resumes from GC pause and writes with Token 101. What is the response?',
    opts: ['Accepted and overwrites B', 'Rejected (Stale Token: 101 <= 102)', 'Both tokens merged', 'Database rolls back'],
    ans: 1,
    exp: 'Fencing rules reject any token <= highest seen token (101 <= 102), stopping stale write corruption.'
  },
  {
    q: 'What is the output of the following Java snippet?\n```java\nReentrantLock lock = new ReentrantLock();\nlock.lock();\nlock.lock();\nSystem.out.println(lock.getHoldCount());\nlock.unlock();\nSystem.out.println(lock.isLocked());\n```',
    opts: ['1 false', '2 true', '2 false', '1 true'],
    ans: 1,
    exp: 'ReentrantLock tracks hold count: 2 locks mean hold count is 2. After 1 unlock, hold count is 1, so `isLocked()` is still true.'
  },
  {
    q: 'Trace the output of this Python dictionary comprehension:\n`d = {x: x**2 for x in range(5) if x % 2 == 0}`\n`print(d)`',
    opts: ['{0: 0, 1: 1, 2: 4}', '{0: 0, 2: 4, 4: 16}', '{1: 1, 3: 9}', '{2: 4, 4: 16}'],
    ans: 1,
    exp: 'Even numbers in range(5) are 0, 2, 4. Mapping produces {0: 0, 2: 4, 4: 16}.'
  },
  {
    q: 'In an In-Memory Cache with TTL: Key X inserted at t=1000 with TTL=2000 (expiry=3000). At t=2500, key X is updated with `set(X, new_val, ttl=1000)`. When does key X now expire?',
    opts: ['t=3000', 't=3500 (2500 + 1000)', 't=4500', 'Never'],
    ans: 1,
    exp: 'Updating a key with a new TTL replaces its expiration timestamp with `now + new_ttl` = 2500 + 1000 = 3500.'
  },
  {
    q: 'In C++20, what happens when a thread attempts to `unlock()` an unowned `std::mutex`?',
    opts: ['Returns false', 'Undefined behavior (often program crash / abort)', 'Throws `std::logic_error`', 'Nothing happens'],
    ans: 1,
    exp: 'Unlocking a mutex that is not currently owned by the calling thread results in Undefined Behavior according to the C++ standard.'
  },
  {
    q: 'In a distributed lock with Redlock algorithm across 5 independent Redis instances: To acquire the lock, on how many instances must a client successfully set the lock key within the timeout?',
    opts: ['At least 1 instance', 'At least 3 instances (strict majority: > 5/2)', 'All 5 instances', '4 instances'],
    ans: 1,
    exp: 'Redlock requires acquiring the lock on a majority of nodes (N/2 + 1 = 3 out of 5) within the validity time to consider the lock established.'
  },
  {
    q: 'In a concurrent Producer-Consumer system, if 10 Producer threads and 10 Consumer threads share a bounded buffer, why should you use `std::condition_variable_any` or `std::condition_variable` with a mutex instead of a spinlock?',
    opts: ['Spinlocks use less memory', 'A spinlock consumes 100% of CPU cycles spinning on the core while waiting, whereas a condition variable puts the waiting thread to sleep in the OS kernel until signaled', 'Condition variables don\'t require locks', 'Spinlocks prevent deadlocks'],
    ans: 1,
    exp: 'Condition variables deschedule threads, freeing CPU cores for other active workers, whereas spinlocks burn CPU bandwidth.'
  },
  {
    q: 'Consider an Atomic Lock-Free Stack. Two threads call `pop()` concurrently when the stack has only 1 element [Z]. What happens?',
    opts: ['Both threads pop Z successfully', 'One thread succeeds in CAS(head, Z, NULL) and returns Z; the other thread fails CAS, loops, finds head == NULL, and returns empty', 'Both threads block forever', 'The stack throws an exception'],
    ans: 1,
    exp: 'Atomic CAS ensures mutual exclusion: exactly one thread successfully swings head from Z to NULL; the other sees empty on retry.'
  },
  {
    q: 'In Java, what does `Thread.yield()` do?',
    opts: ['Terminates the thread immediately', 'Provides a hint to the thread scheduler that the current thread is willing to yield its current use of a processor to other runnable threads of equal priority', 'Suspends the thread for 1 second', 'Acquires a lock'],
    ans: 1,
    exp: '`yield()` is a cooperative hint to the OS scheduler that the current thread can relinquish its CPU quantum.'
  },
  {
    q: 'In an In-Memory Key-Value store with Striped Locking (16 lock stripes): Key "order:99" hashes to stripe 7. Key "user:12" hashes to stripe 3. Can Thread A write to "order:99" concurrently while Thread B writes to "user:12"?',
    opts: ['No, only one thread can write to the store at a time', 'Yes, because they acquire independent stripe locks (stripe 7 and stripe 3) without contention', 'Only if they run on the same CPU core', 'Only if the keys have the same length'],
    ans: 1,
    exp: 'Striped locking partitions the lock space. Independent stripes permit concurrent operations without thread blocking.'
  },
  {
    q: 'In an Idempotent Payment endpoint, what HTTP status code should be returned when a duplicate request with the same `Idempotency-Key` is currently still processing?',
    opts: ['HTTP 200 OK', 'HTTP 409 Conflict (or 425 Too Early)', 'HTTP 500 Internal Server Error', 'HTTP 404 Not Found'],
    ans: 1,
    exp: 'HTTP 409 Conflict informs the client that an identical request is actively being processed, preventing duplicate concurrent execution.'
  },
  {
    q: 'Trace the output of this Python code:\n```python\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))\n```',
    opts: ['3', '4', '1', 'Error'],
    ans: 1,
    exp: 'In Python, assignment `b = a` creates a reference to the same list. Mutating `b` mutates `a`, so `len(a)` is 4.'
  },
  {
    q: 'In C++20, what is the role of `std::jthread` compared to `std::thread`?',
    opts: ['`std::jthread` is for Java interop', '`std::jthread` automatically joins on destruction and supports cooperative cancellation via stop tokens, preventing `std::terminate()` crashes from unjoined threads', '`std::jthread` runs on the GPU', '`std::jthread` cannot take arguments'],
    ans: 1,
    exp: '`std::jthread` (joining thread) joins automatically upon destruction and provides built-in cancellation via `std::stop_token`.'
  },
  {
    q: 'In a distributed auction system, 5 bids arrive at the exact same millisecond. How does the system determine the winning bid?',
    opts: ['Picks a random bid', 'Uses a monotonic distributed sequencer (e.g. Raft consensus log index or Snowflake ID) to establish a strict total order', 'Accepts all 5 as winners', 'Discards all 5 bids'],
    ans: 1,
    exp: 'Consensus log ordering assigns a deterministic, linearizable sequence number to each incoming transaction.'
  },
  {
    q: 'In a multi-threaded system, what is "Priority Inversion", and how does Priority Inheritance solve it?',
    opts: ['High priority threads run first', 'When a low-priority thread holds a lock needed by a high-priority thread, and a medium-priority thread preempts the low-priority thread, delaying the high-priority thread; solved by temporarily elevating the low-priority thread\'s priority to match the high-priority waiter', 'When threads switch priorities randomly', 'When threads are assigned negative priorities'],
    ans: 1,
    exp: 'Priority inheritance raises the lock holder\'s priority to that of the highest-priority waiting thread, preventing medium threads from preempting it.'
  },
  {
    q: 'In a Rate Limiter with Sliding Window Log, a user is allowed 3 requests per 10 seconds. Log at t=12s has timestamps [3s, 5s, 8s]. A request arrives at t=12s. What happens?',
    opts: ['Rejected; log has 3 items', 'Timestamps <= 2s (12 - 10) are evicted (none in this case); count is 3 >= 3, so the request is REJECTED', 'Accepted; count is reset to 0', 'The timestamp is updated to 0'],
    ans: 1,
    exp: 'Window is [2s, 12s]. All 3 existing timestamps (3, 5, 8) fall inside the window. Count is 3 >= limit 3. Request is REJECTED.'
  },
  {
    q: 'At t=16s in the same Sliding Window Log (timestamps [3s, 5s, 8s]), a new request arrives. What happens?',
    opts: ['Timestamps < 6s (3s, 5s) are evicted, leaving [8s]. Adding 16s gives count 2 <= 3 -> ACCEPTED', 'Rejected; limit permanently exhausted', 'Accepted; log is cleared', 'Error'],
    ans: 0,
    exp: 'Window boundary is 16 - 10 = 6s. Timestamps 3s and 5s are < 6s, so they are evicted. Only 8s remains (count 1). Request at 16s is accepted (count 2 <= 3).'
  },
  {
    q: 'What is the space complexity of Sliding Window Log rate limiter compared to Token Bucket?',
    opts: ['Both are O(1)', 'Sliding Window Log requires O(M) memory where M is request volume in the window (storing every timestamp); Token Bucket is strictly O(1) storing only token count and timestamp', 'Sliding Window Log is O(1)', 'Token Bucket requires O(M) memory'],
    ans: 1,
    exp: 'Sliding window log stores a timestamp for every request in memory, consuming O(M) space, whereas token bucket requires only two numbers (O(1)).'
  },
  {
    q: 'In an In-Memory Key-Value store, how do you implement Atomic Compare-And-Set `CAS key old_val new_val`?',
    opts: ['By reading then writing without locks', 'Lock the key/stripe -> check if current value equals `old_val` -> if true, set `new_val` and return true; else return false -> release lock', 'By deleting the database', 'By sending an email'],
    ans: 1,
    exp: 'Atomic CAS verifies the old value matches expectations within an exclusive critical section before mutating to the new value.'
  },
  {
    q: 'What is the time complexity of searching a word of length L in a Trie?',
    opts: ['O(N) where N is total words in dictionary', 'O(L) strictly proportional to word length, independent of dictionary size', 'O(L^2)', 'O(log N)'],
    ans: 1,
    exp: 'Trie search traverses one character per level, taking O(L) time regardless of how many millions of words exist in the Trie.'
  },
  {
    q: 'In the Observer Pattern, why should observers be registered using Weak References (e.g. `WeakReference` in Java/C#)?',
    opts: ['To make them run faster', 'To prevent the "Lapsed Listener" memory leak where the subject retains a strong reference to an observer that is otherwise no longer needed, preventing garbage collection', 'To allow observers to run on background threads', 'To encrypt event messages'],
    ans: 1,
    exp: 'Strong references in observer lists prevent discarded listener objects from being garbage collected, causing memory leaks unless weak references are used.'
  },
  {
    q: 'What is the output of this Python expression: `bool([]) == bool([0])`?',
    opts: ['True', 'False', 'None', 'SyntaxError'],
    ans: 1,
    exp: '`bool([])` is `False` (empty list is falsy). `bool([0])` is `True` (non-empty list is truthy). `False == True` is `False`.'
  },
  {
    q: 'In a multi-threaded system, what is "Lock Contention"?',
    opts: ['When two locks have the same name', 'When multiple threads attempt to acquire the same exclusive lock simultaneously, forcing threads to block and context-switch, degrading parallel scaling', 'When memory is corrupted', 'When CPU runs at 100% without locks'],
    ans: 1,
    exp: 'Lock contention occurs when threads wait for a lock held by another thread, creating bottlenecks and context switching overhead.'
  },
  {
    q: 'How does Lock Striping reduce lock contention?',
    opts: ['It deletes all locks', 'Instead of one global lock, the dataset is partitioned across N independent locks (stripes). Concurrent operations on different stripes proceed in parallel without blocking each other', 'It makes locks recursive', 'It increases lock timeouts'],
    ans: 1,
    exp: 'Striping partitions data across N locks (e.g. ConcurrentHashMap), reducing the probability of two concurrent threads contending on the same lock to 1/N.'
  },
  {
    q: 'In a production LLD machine coding test, what is the best strategy to handle input parsing errors?',
    opts: ['Crash the application with exit(1)', 'Validate inputs at the boundary using custom Domain Exceptions or Result types with informative error messages, keeping core entities pure', 'Ignore invalid inputs and continue', 'Return null for everything'],
    ans: 1,
    exp: 'Validating inputs at the controller/boundary and raising typed domain exceptions demonstrates production-grade robustness.'
  },
  {
    q: 'Trace the value of this Java atomic operation:\n```java\nAtomicInteger ai = new AtomicInteger(5);\nint res = ai.getAndUpdate(x -> x * 2 + 1);\nSystem.out.println(res + " " + ai.get());\n```',
    opts: ['11 11', '5 11', '5 5', '11 5'],
    ans: 1,
    exp: '`getAndUpdate` returns the PREVIOUS value (5) and atomically updates the counter to 5 * 2 + 1 = 11.'
  },
  {
    q: 'Why is Composition favored over Inheritance in modern software engineering ("Composition over Inheritance")?',
    opts: ['Inheritance is slower', 'Composition provides loose coupling, runtime flexibility (swapping components dynamically), and avoids fragile base class hierarchies where parent changes break child subclasses', 'Composition requires zero code', 'Inheritance is forbidden in Java'],
    ans: 1,
    exp: 'Composition allows flexible object assembly at runtime and prevents rigid, brittle inheritance hierarchies.'
  },
  {
    q: 'In an In-Memory Cache with eviction, what is the trade-off of using a Background Reaper Thread vs Lazy Eviction on `get()`?',
    opts: ['Lazy eviction uses more memory', 'Lazy eviction incurs zero background CPU overhead but leaves expired keys occupying memory until accessed; Background Reaper reclaims memory actively using a Timer/Min-Heap at the cost of periodic thread CPU cycles', 'Background reaper is always faster for reads', 'Lazy eviction causes memory leaks that crash the OS'],
    ans: 1,
    exp: 'Lazy eviction only evicts on read, risking memory accumulation for abandoned keys. Background reapers actively clean memory at the cost of background CPU.'
  },
  {
    q: 'With Day 15 complete, what comprehensive placement credential does the learner unlock across the entire 15-day curriculum?',
    opts: ['Junior Developer Attendance Badge', 'FAANG Grandmaster & Placement Ready Certified Principal Candidate Badge (150 Practical Challenges & 1,500 Placement-Grade MCQs mastered)', 'Certificate of Partial Completion', 'Trial Student Pass'],
    ans: 1,
    exp: 'Completing all 15 Days of rigorous algorithmic and system design mastery awards the highest placement distinction: FAANG Grandmaster & Placement Ready Certified Principal Candidate.'
  }
];

postPracticalQuestions.forEach((item, idx) => {
  postAssessment.push({
    id: `d15-post-${16 + idx}`,
    question: item.q,
    options: item.opts,
    correctIndex: item.ans,
    explanation: item.exp,
    category: 'Practical Execution & Trace (70%)'
  });
});

const content = `import { AssessmentQuestion } from '../types';

export const DAY_15_PRE_ASSESSMENT_50: AssessmentQuestion[] = ${JSON.stringify(preAssessment, null, 2)};

export const DAY_15_POST_ASSESSMENT_50: AssessmentQuestion[] = ${JSON.stringify(postAssessment, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/day15Assessments50.ts'), content, 'utf8');
console.log('Successfully wrote src/data/day15Assessments50.ts');
