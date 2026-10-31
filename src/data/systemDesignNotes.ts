// Comprehensive System Design Placement Notes
// Aligned with the 107-Slide Masterclass on Real-World Architecture & Gmail Case Study
// Mentorship by Kapil • SPSU Udaipur

export interface SystemDesignSection {
  id: string;
  title: string;
  tag: string;
  readTime: string;
  summary: string;
  bulletPoints: string[];
  deepDiveMarkdown: string;
  interviewTips: string[];
  faangQuestionExamples: string[];
}

export const SYSTEM_DESIGN_NOTES: SystemDesignSection[] = [
  {
    id: 'outage-case-studies',
    title: '1. Real-World Engineering Disasters: The Cost of Architecture Failure',
    tag: 'Production Disasters',
    readTime: '12 min',
    summary:
      'Why System Design matters: Analysis of massive production outages at Instagram, Facebook (Meta), WhatsApp, and Twitter/X, and the architectural lessons learned.',
    bulletPoints: [
      'Instagram (DNS Outage): How DNS misconfiguration took down a platform with 1B+ users and caused worldwide cascading retry storms.',
      'Facebook (Meta BGP Route Withdrawal): How an automated routine configuration command withdrew BGP routes, making Meta servers unreachable even from their own physical datacenters.',
      'WhatsApp (Queue Congestion & Traffic Surges): What happens during New Year midnight traffic when message brokers (Kafka/RabbitMQ) exhaust memory and consumer threads lag.',
      'Twitter/X (Sudden Rate-Limiting Crisis): Uncontrolled scraping and unindexed SQL lookups forcing aggressive HTTP 429 limits and degrading user trust.',
    ],
    deepDiveMarkdown: `### Architectural Post-Mortems of Iconic Outages

#### 1. Instagram DNS Resolution Collapse
* **The Root Cause:** A misconfigured DNS record TTL (Time To Live) combined with an invalid name-server delegation.
* **The Cascading Effect:** When billions of mobile apps failed to resolve the domain, clients aggressively retried every 500ms without exponential backoff or jitter. This created a self-inflicted Distributed Denial of Service (DDoS) on the surviving infrastructure.
* **Architectural Lesson:** Always implement client-side exponential backoff with full jitter (\`sleep = rand(0, min(max_sleep, base * 2 ^ attempt))\`) and protect DNS records with multi-provider redundancy (Anycast DNS).

#### 2. Facebook (Meta) 2021 BGP Route Withdrawal
* **The Root Cause:** An automated maintenance audit tool sent a command to assess the backbone network capacity, which accidentally disconnected all Meta data centers from the Internet.
* **The Fatal Flaw:** Meta's internal DNS servers were hosted inside the very same network that lost its BGP routes. Because DNS was unreachable, Meta engineers could not even use their digital keycards or VPNs to physically enter the data halls.
* **Architectural Lesson:** Keep your Management Plane completely decoupled from the Data Plane. Out-of-band management access must never depend on in-band network resolution.

#### 3. WhatsApp New Year's Eve Queue Congestion
* **The Root Cause:** Sudden 10x-50x spikes in concurrent media messages at midnight.
* **The Failure Mode:** The message queues filled faster than workers could consume. In-flight queues in Erlang/RabbitMQ processes ran out of memory, triggering Linux OOM (Out Of Memory) killer kills on message brokers.
* **Architectural Lesson:** Backpressure, priority queues, and dead-letter exchanges (DLX) with active rate-limiting per second (Token Bucket / Leaky Bucket algorithms) are mandatory for real-time messaging.

#### 4. Twitter/X Rate Limiting Panic (July 2023)
* **The Root Cause:** Millions of AI scrapers hit unauthenticated endpoints simultaneously, causing massive database CPU spikes on unindexed tweet reply tables.
* **Emergency Response:** Emergency hard rate-limits (HTTP 429 Too Many Requests) restricted users to viewing 600-6000 posts per day.
* **Architectural Lesson:** Public APIs must be gated behind an intelligent API Gateway (Kong, Envoy, Cloud Armor) with distributed Redis token bucket rate limiters, web application firewalls (WAF), and CDN edge caching.`,
    interviewTips: [
      'In FAANG System Design rounds, always bring up real outage examples to show production maturity.',
      'Explain how you would prevent cascading failures using Circuit Breakers (Netflix Hystrix pattern) and Exponential Backoff with Jitter.',
    ],
    faangQuestionExamples: [
      '"How would you prevent a retry storm from taking down your API Gateway during a partial outage?"',
      '"Design a distributed rate limiter that handles 1,000,000 requests per second across 50 data centers."',
    ],
  },
  {
    id: 'system-design-definition-and-placement',
    title: '2. What is System Design? HLD vs LLD & Placement Perspective',
    tag: 'Core Concepts',
    readTime: '10 min',
    summary:
      'Understanding System Design from a FAANG recruiter & interviewer perspective: High-Level Design (HLD) vs Low-Level Design (LLD), Non-Functional Requirements, and the 45-Minute Interview Blueprint.',
    bulletPoints: [
      'System Design is the process of defining architecture, components, modules, interfaces, and data flow to satisfy specified functional and non-functional requirements.',
      'HLD (High-Level Design): The macroscopic view—microservices, load balancers, caching layers, database partitioning, message brokers, CDNs.',
      'LLD (Low-Level Design): The microscopic view—class diagrams, design patterns (Factory, Observer, Strategy), database schemas, concurrency locks, API signatures.',
      'Why Companies Ask It: Assesses scalability thinking, trade-off evaluation (CAP theorem, Latency vs Throughput), fault tolerance, and cost efficiency.',
    ],
    deepDiveMarkdown: `### The 45-Minute FAANG System Design Blueprint

| Time | Phase | Focus & Deliverables |
| :--- | :--- | :--- |
| **00 - 05 min** | **Scope & Requirements** | Clarify Functional vs Non-Functional Requirements. Ask questions! Do not jump to coding. |
| **05 - 10 min** | **Capacity Estimation** | DAU, QPS (Queries per Second), Read/Write ratio, Storage for 5 years, Network Bandwidth. |
| **10 - 20 min** | **High-Level Design (HLD)** | Draw end-to-end blocks: Client → DNS → CDN → Load Balancer → API Gateway → App Servers → DB + Cache. |
| **20 - 35 min** | **Deep Dive into Core Problems** | Dive into the hardest bottlenecks (e.g., Undo Send queue, real-time sync, sharding strategy). |
| **35 - 45 min** | **Bottlenecks & Trade-offs** | Single points of failure (SPOF), replication lag, cache invalidation, disaster recovery. |

#### Functional vs. Non-Functional Requirements
* **Functional Requirements (What the system DOES):**
  * Users can send and receive emails.
  * Users can search emails by subject, body, or recipient.
  * Users can undo an email send within 30 seconds.
* **Non-Functional Requirements (How well the system DOES it):**
  * **High Availability:** 99.99% uptime (less than 52 minutes of downtime per year).
  * **Low Latency:** P99 read latency < 200ms, P99 send latency < 500ms.
  * **Strong Consistency for Inbox State vs Eventual Consistency for Search Index.**
  * **Zero Data Loss:** Durability is paramount. Emails cannot disappear.`,
    interviewTips: [
      'Never start drawing boxes until you agree with the interviewer on Functional and Non-Functional requirements.',
      'Always calculate QPS: 100M Daily Active Users doing 10 requests/day = 1 Billion requests/day ≈ 11,600 QPS average (peak = 2x-3x ≈ 35,000 QPS).',
    ],
    faangQuestionExamples: [
      '"What is the difference between latency and throughput, and how do they trade off?"',
      '"What metrics define High Availability, and what does 4 nines (99.99%) mean in practice?"',
    ],
  },
  {
    id: 'computer-vs-system-design-analogy',
    title: '3. The Master Analogy: Computer Architecture vs Distributed System Design',
    tag: 'Mental Model',
    readTime: '8 min',
    summary:
      'How every distributed system component is simply a macroscopic, networked equivalent of single-computer hardware and operating system concepts.',
    bulletPoints: [
      'CPU Core ↔ Application Microservice / Worker Instance (Compute)',
      'RAM / L1-L3 Cache ↔ Distributed In-Memory Cache (Redis, Memcached)',
      'Hard Disk Drive (NVMe/SSD) ↔ Persistent Database (PostgreSQL, Spanner, MongoDB)',
      'Motherboard PCIe Bus ↔ Network Fabric, API Gateway & RPC (gRPC / HTTP)',
      'OS Process Scheduler ↔ Load Balancer (Round Robin, Least Connections)',
      'Operating System Semaphore / Mutex ↔ Distributed Lock (Redis Redlock, ZooKeeper)',
    ],
    deepDiveMarkdown: `### The Computer Architecture to Distributed Systems Mapping

Whenever you feel overwhelmed by distributed systems terminology, map it back to basic computer organization:

\`\`\`
+------------------------------------+-------------------------------------------+
| Single Computer Component          | Distributed System Equivalent             |
+------------------------------------+-------------------------------------------+
| CPU (Central Processing Unit)      | Stateless Compute Servers / Kubernetes Pods|
| CPU L1/L2/L3 Registers & Cache     | Local Process Cache (Guava / Caffeine)   |
| System RAM (Volatile, Ultra-Fast)  | Distributed In-Memory Cache (Redis/Memcached) |
| SSD / NVMe Storage (Persistent)    | Persistent Distributed Database (Spanner) |
| Hard Disk Storage (Bulk Files)     | Distributed Blob Storage (Amazon S3 / GCS)|
| Motherboard System Bus             | 100 Gbps Network Fabric / gRPC mesh       |
| OS Process Scheduler               | Load Balancers (HAProxy, NGINX, AWS ALB)  |
| OS Thread Pool / Ring Buffer       | Message Brokers (Kafka, RabbitMQ, SQS)    |
| Thread Mutex / Lock                | Distributed Locking (Redis Redlock, Etcd) |
| Memory Management Unit (MMU)       | Virtual IP / Service Discovery (Consul)   |
+------------------------------------+-------------------------------------------+
\`\`\`

#### Key Takeaway for Placements:
A single computer scales **vertically** until it hits physical heat and silicon limits. A distributed system takes the exact same architectural components and scales them **horizontally** across thousands of networked computers with software redundancy.`,
    interviewTips: [
      'Use this analogy when explaining why an architecture needs Redis: "Just as a CPU cannot fetch every instruction from a slow hard drive, our App Servers cannot fetch every read query from disk-based SQL tables."',
    ],
    faangQuestionExamples: [
      '"Why is accessing RAM 100,000 times faster than disk I/O, and what does that mean for cache design?"',
      '"How does a distributed lock differ from a language-level mutex?"',
    ],
  },
  {
    id: 'gmail-architecture-deep-dive',
    title: '4. End-to-End System Design: Gmail Architecture Case Study',
    tag: 'Case Study',
    readTime: '18 min',
    summary:
      'Complete breakdown of Gmail at 1.8 Billion users: Client, DNS, CDN, API Gateway, GFE Load Balancer, Microservices, Storage Layer, and Search Indexing.',
    bulletPoints: [
      'Tier 1: Client Layer (Web SPA, Android/iOS Apps) with local SQLite offline cache and Delta sync.',
      'Tier 2: Global Anycast DNS and Google Front End (GFE) termination for HTTP/2 & HTTP/3 QUIC.',
      'Tier 3: API Gateway for JWT token validation, rate-limiting, and protocol translation.',
      'Tier 4: Microservices: Email Ingestion, Delivery Worker, Spam Classifier, Notification Dispatcher.',
      'Tier 5: Distributed Storage: Metadata in Google Cloud Spanner / Bigtable, Attachments in Colossus / GCS.',
      'Tier 6: Search & Filter Engine: Inverted Index built on Google Bigtable / Distributed Lucene.',
    ],
    deepDiveMarkdown: `### Gmail End-to-End Architecture Blueprint

\`\`\`
[Web / Mobile Client]
         |
    (Anycast DNS)
         v
[Google Front End (GFE) / Global Load Balancer]
         | (SSL Termination & QUIC)
         v
[API Gateway / Edge Router]
   | (Auth, Rate Limiting, Routing)
   +------------------------+------------------------+
   |                        |                        |
   v                        v                        v
[Mailbox Read Service]   [Mail Send Service]      [Search Service]
   |                        |                        |
   v                        v                        v
[Redis / Memcached]      [Delayed Queue]          [Elasticsearch /
(Inbox Metadata Cache)   (RabbitMQ / Kafka)       Inverted Index]
   |                        |
   v                        v
[Spanner / Bigtable]     [SMTP Delivery Worker]
(Primary DB)                |
   |                        v
[Colossus / GCS Blob]    [External Recipient Mail Servers]
(Attachments)
\`\`\`

#### 1. Why Email Metadata and Attachments are Separated
* **The Antipattern:** Storing 25MB PDF/image files inside relational tables (as \`BLOB\` or \`BYTEA\`) destroys database performance. It bloats B-Trees, causes buffer cache thrashing, and creates severe disk I/O bottlenecks.
* **The Solution:**
  * **Email Metadata** (sender, recipient, subject, timestamp, read status) goes into **Google Cloud Spanner** or **Cassandra/Bigtable** (strongly indexed, relational or wide-column).
  * **Raw Attachments** are uploaded directly via pre-signed URLs to **Google Cloud Storage (GCS) / AWS S3** with immutable content-addressed hashes (SHA-256 deduplication).

#### 2. The Gmail "Undo Send" 5–30s Architecture
* When the user clicks "Send", Gmail **does NOT immediately transmit** the email via SMTP to the recipient server.
* Once an email leaves your SMTP server to Yahoo or Outlook, it **cannot be recalled** (SMTP has no native undo protocol).
* **The Mechanism:**
  1. The client sends \`POST /api/v1/emails/send\`.
  2. The server stores the message in Spanner with status \`PENDING_DELAY\`.
  3. The server enqueues a delayed job in a **Delay Queue** (Redis Sorted Set with score = timestamp + 30s, or RabbitMQ dead-letter exchange).
  4. If the user clicks **"Undo"** before the 30s window expires:
     * A \`POST /api/v1/emails/cancel\` request cancels the job. The message status becomes \`DRAFT\`.
  5. If no cancel arrives:
     * The worker pops the job after 30 seconds, validates status is still \`PENDING_DELAY\`, updates to \`TRANSMITTED\`, and dispatches via SMTP.`,
    interviewTips: [
      'In any messaging design (Gmail, Slack, WhatsApp), always explain the separation of metadata (DB) vs binary attachments (Blob Storage).',
      'The "Undo Send" question is a classic FAANG interview favorite—always explain that SMTP has no undo, so the delay must happen locally in our queuing tier.',
    ],
    faangQuestionExamples: [
      '"Design the Undo Send feature in Gmail. How do you handle race conditions if the user clicks Undo at second 29.9?"',
      '"How does Gmail search through petabytes of emails in under 100 milliseconds?"',
    ],
  },
  {
    id: 'postman-and-rest-apis',
    title: '5. Postman IDE, REST APIs & The Idempotency Matrix',
    tag: 'API Architecture',
    readTime: '15 min',
    summary:
      'Mastering HTTP Methods, Idempotency, Safe vs Unsafe operations, Request/Response anatomy, and how FAANG uses Postman for contract testing.',
    bulletPoints: [
      'GET: Safe & Idempotent. Fetches resource representation. Never alters server state.',
      'POST: Unsafe & Non-Idempotent. Creates a subordinate resource or triggers a side-effect.',
      'PUT: Unsafe & Idempotent. Completely replaces the target resource or creates it if absent.',
      'PATCH: Unsafe & Non-Idempotent (by standard, though often implemented idempotently). Partial updates.',
      'DELETE: Unsafe & Idempotent. Removes the target resource. Calling DELETE 1x or 10x results in the same server state.',
      'Idempotency Keys (\`X-Idempotency-Key\`): How Stripe and Google prevent double billing and duplicate emails.',
    ],
    deepDiveMarkdown: `### The REST Idempotency & Safety Matrix

| HTTP Method | Safe? (Read-only) | Idempotent? (\`f(f(x)) = f(x)\`) | Cacheable? | Typical Usage |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | **YES** | **YES** | YES | \`GET /api/v1/emails/inbox\` |
| **HEAD** | **YES** | **YES** | YES | \`HEAD /api/v1/attachments/file.pdf\` |
| **POST** | **NO** | **NO** | Rare | \`POST /api/v1/emails/send\` |
| **PUT** | **NO** | **YES** | NO | \`PUT /api/v1/users/profile\` (Full replace) |
| **PATCH** | **NO** | **NO** | NO | \`PATCH /api/v1/emails/msg-123\` (Mark as Read) |
| **DELETE** | **NO** | **YES** | NO | \`DELETE /api/v1/emails/msg-123\` |

#### Understanding Idempotency for Placements
* **Definition:** An operation is *idempotent* if making the same request multiple times produces the exact same server side-effects as making it once.
* **Why it matters:** In distributed systems, networks are unreliable. If a network drops during a payment or email send, the client retries.
* **How FAANG Solves Double-Charging with Idempotency Keys:**
  1. Client generates a UUID: \`Idempotency-Key: 7b84f3e2-8091-447c-b26a-9f4a1e948123\`.
  2. Client sends \`POST /api/v1/payments\` with this header.
  3. API Gateway checks Redis: \`SET key value NX EX 300\` (Set if Not Exists, 5-minute expiry).
  4. If key already exists in Redis: The server returns the cached response immediately without reprocessing!

#### Postman Testing in Production Environments
* **Pre-Request Scripts:** Inject dynamic authentication tokens (JWT / OAuth2 bearer tokens) and HMAC signatures before hitting endpoints.
* **Test Assertions:** Validate status codes (\`pm.response.to.have.status(200)\`), JSON schema conformance, and response time thresholds (< 300ms).`,
    interviewTips: [
      'Interviewers will ask: "What is the difference between PUT and PATCH?" Always answer: PUT is complete replacement and idempotent; PATCH is partial update.',
      'Explain how you would handle network drops during POST requests using client-generated Idempotency Keys.',
    ],
    faangQuestionExamples: [
      '"Is DELETE idempotent if the second request returns 404 Not Found?" (Yes! The server state is identical: the resource does not exist).',
      '"How do you design an API that guarantees exactly-once payment processing over an unreliable network?"',
    ],
  },
  {
    id: 'http-status-codes-masterclass',
    title: '6. The HTTP Status Codes Masterclass: 2xx, 3xx, 4xx & 5xx',
    tag: 'Network Protocols',
    readTime: '14 min',
    summary:
      'Exhaustive guide to all critical HTTP status codes with production Gmail examples, emojis, troubleshooting playbooks, and interviewer traps.',
    bulletPoints: [
      '2xx Success: 200 OK, 201 Created (email saved), 202 Accepted (queued for asynchronous processing), 204 No Content (deleted).',
      '3xx Redirection: 301 Moved Permanently (SEO transfer), 302 Found (temporary redirect), 304 Not Modified (ETag browser cache match).',
      '4xx Client Error: 400 Bad Request, 401 Unauthorized (missing/bad token), 403 Forbidden (no permission), 404 Not Found, 408 Request Timeout, 429 Too Many Requests (rate-limited).',
      '5xx Server Error: 500 Internal Error, 502 Bad Gateway (upstream crashed), 503 Service Unavailable (over capacity / maintenance), 504 Gateway Timeout (upstream too slow).',
    ],
    deepDiveMarkdown: `### Exhaustive Status Code Reference with Production Scenarios

#### 2xx — Success
* \`200 OK\`: Standard response for successful GET, PUT, or PATCH.
* \`201 Created\`: Sent when a new resource has been created. Must include \`Location\` header (e.g., \`Location: /api/v1/emails/msg-987\`).
* \`202 Accepted\`: **Extremely important in System Design!** The request has been accepted for processing, but processing is not complete. Used for asynchronous background jobs (e.g., bulk email dispatch or video transcoding).
* \`204 No Content\`: Request succeeded, but the response body is intentionally empty (standard for \`DELETE /api/v1/emails/123\`).

#### 3xx — Redirection & Caching
* \`301 Moved Permanently\`: Old URL is permanently deprecated. Search engines update their index.
* \`302 Found (Temporary Redirect)\`: User is temporarily sent elsewhere (e.g., redirecting unauthenticated users to login).
* \`304 Not Modified\`: Conditional GET using \`If-None-Match: "etag_hash"\`. Browser uses its local disk cache without re-downloading bytes! Saves massive network bandwidth.

#### 4xx — Client Errors (The Caller Screwed Up)
* \`400 Bad Request\`: Malformed JSON syntax or schema validation failure.
* \`401 Unauthorized\`: **Authentication failure.** Missing, expired, or invalid API key / JWT Bearer token.
* \`403 Forbidden\`: **Authorization failure.** The server knows who you are, but you do not have permission to access this resource (e.g., viewing another user's private emails).
* \`404 Not Found\`: Resource ID does not exist in the database.
* \`408 Request Timeout\`: Client took too long to finish sending the request body over TCP.
* \`429 Too Many Requests\`: **Rate limit exceeded.** Accompanied by \`Retry-After: 60\` header. Indicates Token Bucket or Leaky Bucket threshold reached.

#### 5xx — Server Errors (The Infrastructure Screwed Up)
* \`500 Internal Server Error\`: Unhandled exception or crash in application server code (e.g., NullPointerException).
* \`502 Bad Gateway\`: Reverse proxy (NGINX / ALB) received an invalid response from the upstream microservice (upstream process crashed or closed connection abruptly).
* \`503 Service Unavailable\`: Server is overloaded or down for maintenance. Load balancer shedding load.
* \`504 Gateway Timeout\`: Reverse proxy waited for upstream microservice response, but upstream exceeded timeout limit (e.g., slow SQL query or thread pool exhaustion).`,
    interviewTips: [
      'Differentiate 401 vs 403 clearly: 401 is "Who are you?" (Authentication). 403 is "You cannot touch this!" (Authorization).',
      'Explain when to return 202 Accepted instead of 200 OK: "When an operation takes longer than a few hundred milliseconds, return 202 immediately with a job ID and process in the background via Kafka."',
    ],
    faangQuestionExamples: [
      '"What is the difference between a 502 Bad Gateway and a 504 Gateway Timeout?"',
      '"How does a 304 Not Modified status code save millions of dollars in CDN egress bandwidth?"',
    ],
  },
  {
    id: 'load-balancing-and-scaling',
    title: '7. Load Balancing Algorithms & Vertical vs Horizontal Scaling',
    tag: 'Scalability',
    readTime: '16 min',
    summary:
      'How traffic is distributed across thousands of server instances: Round Robin, Least Connections, IP Hash, Anycast, and the limits of vertical vs horizontal scaling.',
    bulletPoints: [
      'Vertical Scaling (Scale-Up): Adding more CPU, RAM, and SSD to a single physical machine. Hard hardware ceiling and creates Single Point of Failure (SPOF).',
      'Horizontal Scaling (Scale-Out): Adding more commodity server nodes behind a load balancer. Infinite scaling capability and high fault tolerance.',
      'Layer 4 (Transport) vs Layer 7 (Application) Load Balancing.',
      'Algorithms: Round Robin, Weighted Round Robin, Least Connections, Least Response Time, IP Hash (Session Affinity), Consistent Hashing.',
    ],
    deepDiveMarkdown: `### Load Balancing Algorithm Breakdown

\`\`\`
                         [Incoming Clients]
                                 |
                                 v
                     [Layer 7 Load Balancer]
                     (NGINX / Envoy / ALB)
                                 |
         +-----------------------+-----------------------+
         | (Round Robin)         | (Least Conn)          | (IP Hash)
         v                       v                       v
    [App Server 1]          [App Server 2]          [App Server 3]
\`\`\`

#### 1. Round Robin vs Weighted Round Robin
* **Round Robin:** Requests distributed sequentially: $1 \rightarrow 2 \rightarrow 3 \rightarrow 1$. Assumes all backend servers have equal hardware specifications and all requests consume equal CPU.
* **Weighted Round Robin:** Assigns weights based on server capacity (e.g., Server A [8 cores] gets weight 3, Server B [2 cores] gets weight 1).

#### 2. Least Connections
* Routes new traffic to the server instance with the fewest active TCP/HTTP connections.
* **Best used for:** Long-lived transactions, WebSocket connections, or heavy file uploads where request duration varies widely.

#### 3. IP Hash (Sticky Sessions)
* Computes \`hash(client_ip) % N\` to always route a specific client to the same backend node.
* **Caveat:** If a server dies, active sessions are dropped. Modern architectures prefer **stateless servers** storing sessions in distributed Redis clusters rather than sticky sessions.

#### 4. Layer 4 vs Layer 7 Load Balancing
* **Layer 4 (L4):** Routes at TCP/UDP level based purely on IP and Port. Extremely fast (millions of packets/sec) because it does not inspect packet payload.
* **Layer 7 (L7):** Inspects HTTP headers, cookies, and URL paths (e.g., routing \`/api/v1/emails\` to Mailbox Service and \`/api/v1/search\` to Search Service). Enables SSL termination, gzip compression, and intelligent routing.`,
    interviewTips: [
      'Always advocate for Stateless Application Servers behind Layer 7 Load Balancers in interview designs.',
      'When asked how to distribute traffic to stateful caches, use Consistent Hashing instead of simple modulo arithmetic.',
    ],
    faangQuestionExamples: [
      '"What happens to a simple hash-based load balancer \`hash(key) % N\` when 1 of the N servers crashes?"',
      '"When would you choose Layer 4 over Layer 7 load balancing?"',
    ],
  },
  {
    id: 'databases-sharding-and-caching',
    title: '8. Database Sharding, SQL vs NoSQL & Caching Strategies',
    tag: 'Data Architecture',
    readTime: '18 min',
    summary:
      'Managing massive data at scale: SQL (ACID) vs NoSQL (BASE), Master-Slave replication, Database Sharding techniques, and Redis caching topologies.',
    bulletPoints: [
      'SQL (Relational, ACID): PostgreSQL, MySQL, Google Spanner. Best for structured, relational, transactional data with complex joins.',
      'NoSQL (BASE, Horizontal): Key-Value (Redis), Wide-Column (Cassandra, Bigtable), Document (MongoDB), Graph (Neo4j).',
      'Database Sharding: Horizontal partitioning across multiple physical machines by Shard Key (User ID, Hash, Range).',
      'Caching Topologies: Cache-Aside (Lazy Loading), Write-Through, Write-Back (Write-Behind), Refresh-Ahead.',
      'Cache Traps: Cache Penetration, Cache Breakdown, Cache Stampede (Thundering Herd), and Eviction Policies (LRU, LFU, FIFO).',
    ],
    deepDiveMarkdown: `### Database Sharding & Caching Blueprint

#### 1. Database Sharding Strategies
When a single database server runs out of disk or write IOPS, you partition the data across multiple database instances:
* **Range-Based Sharding:** Shard 1 (A-H), Shard 2 (I-P), Shard 3 (Q-Z).
  * *Downside:* Massive hotspots (e.g., letters with common names get overloaded).
* **Hash-Based Sharding:** \`shard_id = hash(user_id) % num_shards\`.
  * *Advantage:* Uniform distribution of traffic.
  * *Downside:* Resharding when adding a new node requires rehashing unless **Consistent Hashing** is used.

#### 2. Caching Strategies (Redis / Memcached)

\`\`\`
Pattern 1: Cache-Aside (Most Popular)
   App -> Read Cache -> (Hit? Return data)
                     -> (Miss? Read DB -> Write Cache -> Return data)

Pattern 2: Write-Through
   App -> Write to Cache -> Cache writes to DB synchronously -> OK

Pattern 3: Write-Back (Write-Behind)
   App -> Write to Cache -> Cache acks immediately -> Async worker flushes to DB
   (Ultra fast, but risk of data loss if cache crashes before flush!)
\`\`\`

#### 3. Critical Production Cache Pitfalls
* **Cache Penetration:** Requests query for non-existent keys (e.g., \`user_id = -9999\`). The cache misses, every query hits the database, and the DB crashes.
  * *Solution:* Cache null values with short TTL, or use a **Bloom Filter** at the edge.
* **Cache Breakdown (Hotspot Key Expiry):** A single ultra-hot key (e.g., celebrity post) expires. 100,000 concurrent threads miss the cache and simultaneously slam the DB.
  * *Solution:* Mutex lock on cache miss (only 1 thread queries DB; others wait), or soft expiry with background refresh.
* **Cache Stampede / Thundering Herd:** Massive numbers of keys expire at the exact same minute.
  * *Solution:* Add random jitter to key TTLs (\`TTL = 3600 + rand(0, 300)\`).`,
    interviewTips: [
      'In any database interview discussion, clearly state your chosen Shard Key and explain why it prevents hot-spotting.',
      'Always add jitter to cache TTLs in your designs to prevent thundering herds.',
    ],
    faangQuestionExamples: [
      '"How do you choose between Redis and Memcached for distributed caching?"',
      '"What happens when a write succeeds in the database but fails to update the cache in Cache-Aside?"',
    ],
  },
  {
    id: 'cicd-deployments-and-faang-interview',
    title: '9. Zero-Downtime Deployments & The FAANG Interview Framework',
    tag: 'DevOps & Interviewing',
    readTime: '15 min',
    summary:
      'CI/CD deployment patterns (Blue-Green, Canary, Feature Flags) and the exact behavioral and technical framework required to crack Tier-1 System Design interviews.',
    bulletPoints: [
      'Blue-Green Deployment: Two identical production environments. Router instantly switches 100% traffic from Blue to Green. Zero downtime, instant rollback.',
      'Canary Deployment: Deploy new version to 2%-5% of traffic. Monitor error rates, P99 latency, and CPU before progressive rollout.',
      'Feature Flags & Dark Launching: Decouple code deployment from feature release. Toggle features via Redis/LaunchDarkly in real-time.',
      'The STAR Method for Behavioral & System Design Questions: Situation, Task, Action, Result.',
      'Kapil Mentor Wisdom: "System design is not about finding the perfect solution; it is about articulating trade-offs clearly under constraints."',
    ],
    deepDiveMarkdown: `### Zero-Downtime Deployment Strategies

#### 1. Blue-Green Deployment
* Maintain two identical production environments: **Blue (Active v1.0)** and **Green (Idle v2.0)**.
* Deploy new code, run automated smoke tests on Green.
* Switch the Load Balancer / Router target from Blue to Green.
* **Rollback:** If unexpected 5xx errors occur, switch router back to Blue in under 1 second.

#### 2. Canary Deployment
* Roll out the new build to a small fraction of real users (e.g., 2% of traffic in a specific region).
* Compare telemetry metrics (error rate, memory leak, CPU, P99 latency) between the Canary group and Baseline group.
* If metrics are stable, gradually scale from 2% $\rightarrow$ 10% $\rightarrow$ 50% $\rightarrow$ 100%.

#### 3. The FAANG Interview Scoring Rubric
1. **Scope & Communication (20%):** Did you ask clarifying questions? Did you collaborate effectively?
2. **Architecture & Abstraction (30%):** Are components decoupled? Did you choose the right DB, queue, and cache?
3. **Deep Dive & Bottlenecks (30%):** Can you handle 10x traffic? How do you handle network partitions?
4. **Trade-off Articulation (20%):** Did you explain pros and cons of SQL vs NoSQL, or Strong vs Eventual consistency?`,
    interviewTips: [
      'When an interviewer asks "Is this scalable?", never just say "Yes". Explain the bottlenecks: "It scales well up to 50k QPS, but beyond that, the Redis master will become a write bottleneck, requiring Redis Cluster with cluster sharding."',
      'Use the STAR method for behavioral and post-mortem questions.',
    ],
    faangQuestionExamples: [
      '"How do you perform database schema migrations (adding a column to a 1-billion-row table) with zero downtime?"',
      '"Tell me about a time you designed an architecture that had to be rolled back in production."',
    ],
  },
];
