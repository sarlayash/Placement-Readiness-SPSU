// 120 Unique Placement-Focused System Design Assessment MCQs
// Aligned with the 107-Slide Masterclass on Real-World Architecture & Gmail Case Study
// Mentorship by Kapil • SPSU Udaipur

export interface SystemDesignAssessmentQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const SYSTEM_DESIGN_120_ASSESSMENTS: SystemDesignAssessmentQuestion[] = [
  {
    "id": "sd-q1",
    "category": "Production Outages & Failures",
    "question": "During the famous Instagram DNS outage, what critical client-side behavior caused a massive self-inflicted Distributed Denial of Service (DDoS) on the surviving infrastructure?",
    "options": [
      "Clients disconnected and ceased all network transmissions.",
      "Clients aggressively retried requests every 500ms without exponential backoff or jitter.",
      "Clients switched automatically to peer-to-peer torrent seeding.",
      "Clients cleared their local SQLite caches and uploaded all raw media files."
    ],
    "correctIndex": 1,
    "explanation": "When DNS resolution failed, millions of mobile apps retried requests immediately and synchronously without exponential backoff and jitter, creating a catastrophic retry storm."
  },
  {
    "id": "sd-q2",
    "category": "Production Outages & Failures",
    "question": "In the 2021 Meta (Facebook) global outage, what was the primary reason internal engineers could not physically or remotely access data center routers to fix the BGP configuration?",
    "options": [
      "All physical fiber cables under the ocean were physically severed by a storm.",
      "Their internal DNS servers and authentication systems were hosted inside the very network whose BGP routes were withdrawn.",
      "The company had forgotten the root SSH password for the core Cisco switches.",
      "The data center backup generators caught fire simultaneously."
    ],
    "correctIndex": 1,
    "explanation": "Meta in-band DNS and door-badge access systems depended on the same network that lost its Border Gateway Protocol (BGP) routing, completely isolating engineers from the data plane and management plane."
  },
  {
    "id": "sd-q3",
    "category": "Production Outages & Failures",
    "question": "During peak events like New Year's Eve midnight, WhatsApp message queues can suffer severe congestion. What is the fundamental risk when consumer threads cannot process incoming messages as fast as they arrive?",
    "options": [
      "The network cables melt due to excessive electron throughput.",
      "In-memory queues consume all RAM, triggering Linux Out-Of-Memory (OOM) killer to crash the message broker.",
      "Relational databases automatically drop all tables to protect foreign keys.",
      "The client mobile devices overheat and corrupt their SIM cards."
    ],
    "correctIndex": 1,
    "explanation": "Unbounded in-memory queuing leads to memory exhaustion and kernel OOM termination of broker nodes unless backpressure and dead-letter queues are enforced."
  },
  {
    "id": "sd-q4",
    "category": "Production Outages & Failures",
    "question": "What architectural technique prevents retry storms from crashing upstream services during partial outages?",
    "options": [
      "Fixed 100ms polling with synchronous blocking threads.",
      "Exponential backoff with full randomized jitter.",
      "Multiplying retry requests by 5 on every failure.",
      "Disabling all client-side timeout thresholds."
    ],
    "correctIndex": 1,
    "explanation": "Exponential backoff with randomized jitter (e.g. sleep = rand(0, min(max_sleep, base * 2^attempt))) disperses retry peaks and smooths traffic spikes."
  },
  {
    "id": "sd-q5",
    "category": "Production Outages & Failures",
    "question": "What architectural mistake led to Twitter/X implementing sudden draconian rate limits (HTTP 429) in July 2023?",
    "options": [
      "Uncontrolled automated scraping hitting unauthenticated, heavily unindexed database endpoints.",
      "The entire AWS cloud provider terminated Twitter's account.",
      "They switched from NoSQL to flat text files for timeline storage.",
      "Users posted too many emojis exceeding UTF-8 encoding limits."
    ],
    "correctIndex": 0,
    "explanation": "Aggressive scraping without API gateway rate-limiting hit unindexed database queries, overloading database CPU and forcing sudden rate limits."
  },
  {
    "id": "sd-q6",
    "category": "Production Outages & Failures",
    "question": "What is the primary role of a \"Circuit Breaker\" pattern in microservices (e.g., Netflix Hystrix / Resilience4j)?",
    "options": [
      "To shut down the entire data center when a single query fails.",
      "To stop sending requests to a failing downstream service after a failure threshold is reached, allowing it time to recover.",
      "To physically trip the electrical circuit breaker in the server rack.",
      "To permanently delete corrupted user accounts from PostgreSQL."
    ],
    "correctIndex": 1,
    "explanation": "The circuit breaker opens when failures exceed a threshold, failing fast locally and sparing the struggling downstream service from cascading failure."
  },
  {
    "id": "sd-q7",
    "category": "Production Outages & Failures",
    "question": "Why is decoupling the Management Plane from the Data Plane a golden rule of high-availability system design?",
    "options": [
      "It reduces company payroll costs.",
      "It ensures engineers can still monitor, debug, and configure network routers even if production user traffic is down.",
      "It allows front-end developers to bypass backend security audits.",
      "It removes the need for SSH keys and TLS encryption."
    ],
    "correctIndex": 1,
    "explanation": "Out-of-band management ensures that control channels and remote debugging stay operational regardless of outages in the customer-facing data plane."
  },
  {
    "id": "sd-q8",
    "category": "Production Outages & Failures",
    "question": "Which network protocol failure isolated Facebook's data centers from the global Internet in October 2021?",
    "options": [
      "BGP (Border Gateway Protocol)",
      "FTP (File Transfer Protocol)",
      "POP3 (Post Office Protocol 3)",
      "DHCP (Dynamic Host Configuration Protocol)"
    ],
    "correctIndex": 0,
    "explanation": "BGP is the routing protocol of the Internet that advertises IP prefix paths. When Meta withdrew its BGP routes, global DNS resolvers could not reach Meta nameservers."
  },
  {
    "id": "sd-q9",
    "category": "Production Outages & Failures",
    "question": "When message queues in WhatsApp or Kafka experience severe lag, what is \"backpressure\"?",
    "options": [
      "Forcing consumers to work twice as fast by overclocking server CPUs.",
      "Signaling producers to slow down or reject incoming requests when downstream workers cannot keep pace.",
      "Deleting all unread messages from disk storage.",
      "Compressing messages with lossy audio codecs."
    ],
    "correctIndex": 1,
    "explanation": "Backpressure is a reactive flow-control mechanism where overloaded consumers signal upstream producers to throttle ingress rates."
  },
  {
    "id": "sd-q10",
    "category": "Production Outages & Failures",
    "question": "What is a \"Dead Letter Queue\" (DLQ) used for in production messaging architectures?",
    "options": [
      "To store deleted email addresses forever.",
      "To isolate messages that repeatedly fail processing after maximum retry attempts for human or automated inspection.",
      "To send spam emails to competing companies.",
      "To increase throughput by ignoring message checksums."
    ],
    "correctIndex": 1,
    "explanation": "A Dead Letter Queue holds malformed or poison-pill messages that fail repeated processing attempts, preventing them from blocking the main queue."
  },
  {
    "id": "sd-q11",
    "category": "Production Outages & Failures",
    "question": "What is a \"Cascading Failure\" in distributed systems?",
    "options": [
      "A planned rolling software update.",
      "A failure in one component that triggers failures in progressively more components due to transferred load or resource contention.",
      "A successful database failover from primary to replica.",
      "A waterfall software development methodology."
    ],
    "correctIndex": 1,
    "explanation": "When one node or service fails, its traffic shifts to adjacent nodes, causing them to overload and fail, triggering a cascade across the cluster."
  },
  {
    "id": "sd-q12",
    "category": "Production Outages & Failures",
    "question": "Why should public APIs never allow unbounded pagination (e.g. `SELECT * FROM emails LIMIT 1000000`)?",
    "options": [
      "Because SQL databases only support 10 rows maximum.",
      "Because it causes severe memory spikes, buffer pool eviction, and long-running table locks on the database.",
      "Because web browsers cannot render more than 5 words at a time.",
      "Because JSON files cannot exceed 100 bytes."
    ],
    "correctIndex": 1,
    "explanation": "Unbounded queries cause database buffer thrashing, excessive IOPS, and network saturation, creating easy attack vectors for denial of service."
  },
  {
    "id": "sd-q13",
    "category": "Production Outages & Failures",
    "question": "In distributed systems, what is a \"Thundering Herd\" problem?",
    "options": [
      "When cattle chew through undersea fiber cables.",
      "When thousands of waiting processes or clients wake up simultaneously to handle an event or expired cache key, overwhelming resources.",
      "When database migrations are run during business hours.",
      "When too many developers push code to the master branch."
    ],
    "correctIndex": 1,
    "explanation": "A thundering herd occurs when many concurrent clients race simultaneously to regenerate a single resource or handle a single notification."
  },
  {
    "id": "sd-q14",
    "category": "Production Outages & Failures",
    "question": "Which algorithm is commonly used by API Gateways (like Kong, Envoy) to smoothly enforce rate limits?",
    "options": [
      "Bubble Sort",
      "Token Bucket / Leaky Bucket",
      "Depth First Search",
      "Dijkstra's Shortest Path"
    ],
    "correctIndex": 1,
    "explanation": "Token Bucket and Leaky Bucket are the industry standards for rate-limiting, allowing controlled bursts while maintaining a steady average throughput."
  },
  {
    "id": "sd-q15",
    "category": "Production Outages & Failures",
    "question": "What does \"fail-fast\" mean in fault-tolerant system design?",
    "options": [
      "Allowing a query to hang for 30 minutes before returning an error.",
      "Immediately halting execution and returning an explicit error response when a failure condition is detected, avoiding resource waste.",
      "Never testing code before deploying to production.",
      "Deleting all logs when an error occurs."
    ],
    "correctIndex": 1,
    "explanation": "Failing fast releases locks, threads, and connections promptly, preventing resource starvation from compounding across the system."
  },
  {
    "id": "sd-q16",
    "category": "Fundamentals & HLD vs LLD",
    "question": "What is the primary difference between High-Level Design (HLD) and Low-Level Design (LLD)?",
    "options": [
      "HLD focuses on frontend HTML; LLD focuses on backend CSS.",
      "HLD defines macroscopic system architecture, microservices, databases, and network topology; LLD defines classes, interfaces, schemas, and design patterns.",
      "HLD is written in Python; LLD is written in C++.",
      "HLD is only for managers; LLD is only for interns."
    ],
    "correctIndex": 1,
    "explanation": "HLD outlines the global architecture, data flow, and distributed components, whereas LLD specifies class models, methods, schemas, and concurrency locks."
  },
  {
    "id": "sd-q17",
    "category": "Fundamentals & HLD vs LLD",
    "question": "In a FAANG System Design interview, what is the recommended time allocation for the initial \"Clarify Requirements\" phase?",
    "options": [
      "0 minutes (start coding immediately).",
      "3 to 5 minutes to agree on functional and non-functional requirements and scale.",
      "35 minutes out of a 45-minute round.",
      "The entire interview."
    ],
    "correctIndex": 1,
    "explanation": "Spending the first 3-5 minutes establishing scope, use cases, and constraints is vital before committing to an architectural approach."
  },
  {
    "id": "sd-q18",
    "category": "Fundamentals & HLD vs LLD",
    "question": "If a system has 100 Million Daily Active Users (DAU) and each user makes 10 requests per day, what is the approximate average Queries Per Second (QPS)?",
    "options": [
      "~116 QPS",
      "~11,600 QPS",
      "~1,000,000 QPS",
      "~100 QPS"
    ],
    "correctIndex": 1,
    "explanation": "100M * 10 = 1 Billion requests/day. 1 day = 86,400 seconds (~100,000s). 1,000,000,000 / 86,400 ≈ 11,574 QPS (roughly 11.6k QPS)."
  },
  {
    "id": "sd-q19",
    "category": "Fundamentals & HLD vs LLD",
    "question": "What does \"Four Nines\" (99.99%) availability correspond to in terms of maximum allowable downtime per year?",
    "options": [
      "About 3.65 days",
      "About 52.6 minutes",
      "About 2.4 hours",
      "Zero seconds"
    ],
    "correctIndex": 1,
    "explanation": "99.99% availability means downtime is 0.01% of 365.25 days = 0.0001 * 525,960 minutes ≈ 52.6 minutes per year."
  },
  {
    "id": "sd-q20",
    "category": "Fundamentals & HLD vs LLD",
    "question": "According to the CAP Theorem, in the presence of a Network Partition (P), what trade-off must a distributed database make?",
    "options": [
      "Choose between Cost (C) and Agility (A).",
      "Choose between Consistency (C) and Availability (A).",
      "Choose between CPU speed and Memory bandwidth.",
      "Choose between Encryption and Compression."
    ],
    "correctIndex": 1,
    "explanation": "When network partitions occur, a distributed system must choose between returning consistent data (CP) or remaining available (AP)."
  },
  {
    "id": "sd-q21",
    "category": "Fundamentals & HLD vs LLD",
    "question": "What is the definition of \"P99 Latency\"?",
    "options": [
      "The average latency across 99 days.",
      "The maximum latency experienced by the fastest 1% of users.",
      "The latency threshold below which 99% of all requests are successfully served.",
      "The price of hosting 99 servers."
    ],
    "correctIndex": 2,
    "explanation": "P99 latency means 99% of requests complete faster than this number, while the slowest 1% take longer."
  },
  {
    "id": "sd-q22",
    "category": "Fundamentals & HLD vs LLD",
    "question": "Which of the following is considered a NON-FUNCTIONAL requirement in Gmail's design?",
    "options": [
      "Users can send an email with an attachment.",
      "Users can search their inbox by sender address.",
      "The system must achieve 99.99% availability with P99 search latency under 200 milliseconds.",
      "Users can label emails into folders."
    ],
    "correctIndex": 2,
    "explanation": "Availability, latency, scalability, and security are non-functional qualities, whereas sending emails and labeling are functional features."
  },
  {
    "id": "sd-q23",
    "category": "Fundamentals & HLD vs LLD",
    "question": "What is the relationship between Latency and Throughput?",
    "options": [
      "They are identical concepts.",
      "Latency is the time taken to service a single request; Throughput is the number of requests processed per unit of time.",
      "Higher latency always guarantees higher throughput.",
      "Throughput is measured in milliseconds; latency is measured in QPS."
    ],
    "correctIndex": 1,
    "explanation": "Latency measures delay (time/request), whereas throughput measures capacity (requests/second)."
  },
  {
    "id": "sd-q24",
    "category": "Fundamentals & HLD vs LLD",
    "question": "What is a \"Single Point of Failure\" (SPOF)?",
    "options": [
      "A developer who writes bug-free code.",
      "A component whose failure will cause the entire system to stop functioning.",
      "A backup battery in a server room.",
      "A read-only database replica."
    ],
    "correctIndex": 1,
    "explanation": "A SPOF is any single component whose disruption causes total system unavailability because there is no automated redundancy."
  },
  {
    "id": "sd-q25",
    "category": "Fundamentals & HLD vs LLD",
    "question": "What is the difference between Strong Consistency and Eventual Consistency?",
    "options": [
      "Strong consistency is only for NoSQL; eventual consistency is only for SQL.",
      "Strong consistency guarantees that any read returns the latest write immediately; Eventual consistency guarantees that all replicas will converge given enough time without new updates.",
      "Eventual consistency never guarantees data correctness.",
      "Strong consistency requires zero network bandwidth."
    ],
    "correctIndex": 1,
    "explanation": "Strong consistency ensures immediate global visibility of writes; eventual consistency accepts transient divergence across replicas for higher availability."
  },
  {
    "id": "sd-q26",
    "category": "Fundamentals & HLD vs LLD",
    "question": "Why do interviewers look for \"Scale Estimation\" in System Design rounds?",
    "options": [
      "To test if you can do mental calculus without a calculator.",
      "To determine whether the design requires distributed storage, memory caching, and sharding, or can fit on a single relational server.",
      "To estimate the exact salary bonus of the candidate.",
      "To calculate the physical weight of server racks."
    ],
    "correctIndex": 1,
    "explanation": "Scale estimation dictates the architectural tiers: 1,000 users need a simple monolith; 1 Billion users mandate sharded databases, CDNs, and distributed caches."
  },
  {
    "id": "sd-q27",
    "category": "Fundamentals & HLD vs LLD",
    "question": "In capacity planning, what is the standard estimate for 1 Terabyte (TB) in bytes for fast interview math?",
    "options": [
      "10^6 bytes",
      "10^9 bytes",
      "10^12 bytes",
      "10^15 bytes"
    ],
    "correctIndex": 2,
    "explanation": "1 KB = 10^3, 1 MB = 10^6, 1 GB = 10^9, 1 TB = 10^12, 1 PB = 10^15 bytes."
  },
  {
    "id": "sd-q28",
    "category": "Fundamentals & HLD vs LLD",
    "question": "What is the \"Read-to-Write Ratio\" and why does it shape system architecture?",
    "options": [
      "It compares how many words an author writes versus reads.",
      "It contrasts read query volume against write query volume; heavy read systems (e.g. 100:1) require aggressive caching and read replicas, whereas heavy write systems need message queues and LSM-tree storage.",
      "It determines font sizes in UI components.",
      "It is only relevant for optical CD-ROM drives."
    ],
    "correctIndex": 1,
    "explanation": "A 100:1 read-heavy system (like Twitter or YouTube) optimizes for caching and read replicas, whereas write-heavy systems (like IoT logging) optimize for sequential append logs."
  },
  {
    "id": "sd-q29",
    "category": "Fundamentals & HLD vs LLD",
    "question": "What does \"Stateless Architecture\" mean in modern microservices?",
    "options": [
      "Servers do not store client session state in local memory between requests; any instance can service any request because state is stored in a shared database or cache.",
      "Servers do not run any operating system.",
      "Servers cannot respond to HTTP requests.",
      "Clients are not allowed to submit form data."
    ],
    "correctIndex": 0,
    "explanation": "Stateless servers hold no sticky session state in local RAM, allowing effortless auto-scaling, blue-green deployments, and instant replacement of failed nodes."
  },
  {
    "id": "sd-q30",
    "category": "Fundamentals & HLD vs LLD",
    "question": "What is the primary role of an API Gateway (e.g., Kong, Envoy, AWS API Gateway)?",
    "options": [
      "To render HTML templates on client phones.",
      "To act as a single entry point for clients, handling authentication, SSL termination, rate-limiting, and routing to downstream microservices.",
      "To replace all persistent database systems.",
      "To compile C++ code into machine assembly."
    ],
    "correctIndex": 1,
    "explanation": "An API Gateway centralizes cross-cutting concerns (auth, rate limiting, logging, metrics, TLS termination) so individual microservices stay focused on business logic."
  },
  {
    "id": "sd-q31",
    "category": "Architecture Analogies",
    "question": "In the computer design to distributed systems analogy, what is the distributed equivalent of a computer's RAM?",
    "options": [
      "Distributed in-memory caches like Redis or Memcached.",
      "Magnetic tape archives stored in salt mines.",
      "Fiber optic ocean cables.",
      "The computer's cooling fan."
    ],
    "correctIndex": 0,
    "explanation": "RAM provides volatile, ultra-low-latency in-memory data access, exactly like Redis or Memcached in distributed systems."
  },
  {
    "id": "sd-q32",
    "category": "Architecture Analogies",
    "question": "What distributed component serves the equivalent role of a computer's Operating System Process Scheduler?",
    "options": [
      "A Load Balancer (or container orchestrator like Kubernetes).",
      "A USB flash drive.",
      "A power supply unit.",
      "A computer mouse."
    ],
    "correctIndex": 0,
    "explanation": "An OS scheduler distributes CPU time across competing threads; a load balancer distributes incoming network requests across compute nodes."
  },
  {
    "id": "sd-q33",
    "category": "Architecture Analogies",
    "question": "What is the distributed equivalent of a motherboard's PCIe / internal bus?",
    "options": [
      "A high-speed datacenter network fabric / gRPC service mesh.",
      "A single SATA cable.",
      "An HDMI monitor cord.",
      "A sound card."
    ],
    "correctIndex": 0,
    "explanation": "The internal bus interconnects CPU, RAM, and peripherals; in distributed systems, the internal high-speed network fabric interconnects microservices."
  },
  {
    "id": "sd-q34",
    "category": "Architecture Analogies",
    "question": "What distributed tool represents the equivalent of a threading Mutex / Semaphore?",
    "options": [
      "A distributed locking service like Redis Redlock, ZooKeeper, or Etcd.",
      "A CSS stylesheet.",
      "A printer queue.",
      "A graphics card."
    ],
    "correctIndex": 0,
    "explanation": "A Mutex coordinates exclusive access between threads on one CPU; distributed locks coordinate access to shared resources across independent network nodes."
  },
  {
    "id": "sd-q35",
    "category": "Architecture Analogies",
    "question": "Why is RAM access roughly 100,000 times faster than spinning hard disk seek time?",
    "options": [
      "RAM has no mechanical moving parts and accesses memory cells directly via silicon electrical circuits in nanoseconds, whereas mechanical disks require physical head movement taking milliseconds.",
      "Hard disks use slow dial-up modems.",
      "RAM is made of pure gold.",
      "Operating systems intentionally slow down hard disks."
    ],
    "correctIndex": 0,
    "explanation": "RAM latency is ~10-100 nanoseconds; rotational disk seek latency is ~1-10 milliseconds (~100,000x difference). This is why Redis caching is so effective."
  },
  {
    "id": "sd-q36",
    "category": "Architecture Analogies",
    "question": "What distributed storage tier mirrors the role of a computer's Hard Disk Drive for bulk unstructured storage?",
    "options": [
      "Distributed Object / Blob Storage (e.g. AWS S3, Google Cloud Storage).",
      "CPU L1 Cache registers.",
      "BIOS flash chip.",
      "Keyboard buffer."
    ],
    "correctIndex": 0,
    "explanation": "Object storage (S3/GCS) stores bulk, cold, or semi-structured data like videos, PDFs, and attachments reliably at low cost, mirroring hard drives."
  },
  {
    "id": "sd-q37",
    "category": "Architecture Analogies",
    "question": "In a single computer, threads communicate via shared memory. How do microservices communicate across distributed physical machines?",
    "options": [
      "Remote Procedure Calls (gRPC), REST APIs over HTTP, or asynchronous Message Brokers (Kafka/RabbitMQ).",
      "By sharing the same physical motherboard.",
      "Using infrared remote controls.",
      "Via audio frequencies over speakers."
    ],
    "correctIndex": 0,
    "explanation": "Distributed nodes communicate over the network using protocols like gRPC, HTTP/REST, and message queues."
  },
  {
    "id": "sd-q38",
    "category": "Architecture Analogies",
    "question": "What is the distributed equivalent of an OS thread pool or circular ring buffer for buffering spikes in work?",
    "options": [
      "Message Queues and Log Brokers (e.g. Apache Kafka, RabbitMQ, Amazon SQS).",
      "The Windows Recycle Bin.",
      "A monitor display port.",
      "A thermal paste tube."
    ],
    "correctIndex": 0,
    "explanation": "Queues buffer bursts of incoming work, decoupling fast producers from slower consumers, just like thread pools buffer runnable tasks."
  },
  {
    "id": "sd-q39",
    "category": "Architecture Analogies",
    "question": "What is the distributed system analog of Virtual Memory translation (MMU)?",
    "options": [
      "Service Discovery and Virtual IP routing (e.g., Consul, Eureka, K8s CoreDNS).",
      "Deleting unused browser cookies.",
      "Formatting a hard drive to FAT32.",
      "Unplugging the ethernet cable."
    ],
    "correctIndex": 0,
    "explanation": "The MMU maps virtual memory addresses to physical RAM pages; service discovery maps logical service names to dynamic physical IP addresses and ports."
  },
  {
    "id": "sd-q40",
    "category": "Architecture Analogies",
    "question": "Why does vertical scaling hit a hard physical ceiling while horizontal scaling can theoretically scale indefinitely?",
    "options": [
      "Single physical machines are bound by motherboard socket limits, thermal dissipation, and bus bandwidth, whereas horizontal systems add independent computers in parallel.",
      "Computer cases cannot exceed 20 inches in height.",
      "Power companies prohibit servers with more than 32 GB RAM.",
      "Vertical scaling is illegal in most countries."
    ],
    "correctIndex": 0,
    "explanation": "Vertical scaling reaches silicon, thermal, and cost limits; horizontal scaling distributes workload across hundreds of thousands of commodity machines."
  },
  {
    "id": "sd-q41",
    "category": "Gmail Architecture Case Study",
    "question": "Why does Gmail strictly separate email metadata (sender, subject, timestamp) from attachment files (PDFs, photos)?",
    "options": [
      "Because attachments can only be read by Google AI.",
      "Storing large binary files directly in relational/indexed databases causes massive buffer pool pollution, B-tree bloat, and severe disk I/O degradation.",
      "Attachments must always be printed onto physical paper.",
      "Email metadata is encrypted, but attachments are public."
    ],
    "correctIndex": 1,
    "explanation": "Relational databases are optimized for small, structured, indexed rows. Large blobs bloat database pages and destroy cache locality, so they are stored in Blob Storage (GCS/S3)."
  },
  {
    "id": "sd-q42",
    "category": "Gmail Architecture Case Study",
    "question": "How does Gmail's famous \"Undo Send\" (5 to 30 second delay) feature work from an architectural perspective?",
    "options": [
      "Gmail sends the email immediately via SMTP and sends a \"Recall\" packet over the Internet to delete it from the recipient's inbox.",
      "Gmail holds the email in a delayed task queue locally on the server; SMTP transmission is only triggered after the 30-second cancellation window expires.",
      "Gmail uses quantum computing to reverse time.",
      "Gmail asks the recipient's mail server for permission before sending."
    ],
    "correctIndex": 1,
    "explanation": "SMTP has no standard undo command. Once an email is sent to an external server, it cannot be recalled. Gmail achieves \"undo\" by holding the message in a delay queue before dispatch."
  },
  {
    "id": "sd-q43",
    "category": "Gmail Architecture Case Study",
    "question": "Which distributed data structure is best suited to implement a 30-second delay queue for Gmail's Undo Send?",
    "options": [
      "A FIFO stack in browser local storage.",
      "A Redis Sorted Set (ZSET) with the score set to `current_time + 30 seconds`, or a message broker with Dead Letter Exchanges / Delayed Message plugins.",
      "A linear array sorted with Bubble Sort every second.",
      "A flat CSV file on an NFS share."
    ],
    "correctIndex": 1,
    "explanation": "Redis Sorted Sets allow workers to poll items where `score <= current_timestamp` via `ZRANGEBYSCORE`, providing an efficient, distributed delay queue."
  },
  {
    "id": "sd-q44",
    "category": "Gmail Architecture Case Study",
    "question": "How does Gmail handle search across billions of user emails in sub-second latency?",
    "options": [
      "By running `SELECT * FROM emails WHERE body LIKE \"%keyword%\"` sequentially.",
      "Using an Inverted Index (similar to Elasticsearch / Lucene) that maps individual words to email IDs.",
      "By asking users to manually remember the date of every email.",
      "By downloading all emails to the client's phone RAM to search locally."
    ],
    "correctIndex": 1,
    "explanation": "An inverted index tokenizes text and maps each word to a postings list of document IDs, enabling instant keyword searches across petabytes of text."
  },
  {
    "id": "sd-q45",
    "category": "Gmail Architecture Case Study",
    "question": "What is Google Front End (GFE) in Google's infrastructure?",
    "options": [
      "A React frontend framework developed by Google.",
      "Google's globally distributed software reverse-proxy and edge load balancer that terminates TCP, TLS, and HTTP/3 QUIC connections near the user.",
      "A physical monitor used in Google offices.",
      "A database management tool."
    ],
    "correctIndex": 1,
    "explanation": "GFE terminates connections at Google's edge Points of Presence (PoPs), proxying requests through Google's private fiber backbone to internal data centers."
  },
  {
    "id": "sd-q46",
    "category": "Gmail Architecture Case Study",
    "question": "When a user attaches a 20MB video to a Gmail draft, how should the upload ideally be performed to avoid overloading the application servers?",
    "options": [
      "Send the 20MB file as a Base64 string in the JSON payload to the main app server.",
      "Client requests a pre-signed upload URL from the server, then uploads the binary data directly to Blob Storage (GCS/S3).",
      "Upload the file to the user's local printer.",
      "Send the file character-by-character over WebSockets."
    ],
    "correctIndex": 1,
    "explanation": "Pre-signed URLs offload heavy binary file transfers directly to scalable object storage, bypassing application servers and saving compute memory."
  },
  {
    "id": "sd-q47",
    "category": "Gmail Architecture Case Study",
    "question": "How does Gmail prevent storing duplicate identical attachments (e.g. a viral 25MB company PDF sent to 10,000 employees)?",
    "options": [
      "Content-Addressable Storage (CAS) and SHA-256 deduplication: store the file once under its cryptographic hash and reference it with pointers.",
      "Compressing the PDF 10,000 times until it becomes 1 byte.",
      "Deleting the PDF after 1 person reads it.",
      "Renaming the file with a random number."
    ],
    "correctIndex": 0,
    "explanation": "Deduplication hashes the file contents (e.g. SHA-256). If the hash already exists in blob storage, only a reference pointer is added to the email metadata."
  },
  {
    "id": "sd-q48",
    "category": "Gmail Architecture Case Study",
    "question": "What happens if a user clicks \"Undo\" at second 29.9 while the worker process is popping the message for delivery (a race condition)?",
    "options": [
      "Both processes crash and delete the user account.",
      "An atomic state transition (e.g., optimistic locking with versioning or distributed lock) ensures only one state change succeeds; if status transitions from PENDING to CANCELLED, delivery is aborted.",
      "The email is sent to an accidental random recipient.",
      "The user's browser locks up permanently."
    ],
    "correctIndex": 1,
    "explanation": "Atomic conditional updates (e.g., `UPDATE emails SET status = 'CANCELLED' WHERE id = ? AND status = 'PENDING_DELAY'`) prevent race condition double-execution."
  },
  {
    "id": "sd-q49",
    "category": "Gmail Architecture Case Study",
    "question": "Which Google distributed database is typically used for Gmail's globally consistent user metadata and transactional inbox state?",
    "options": [
      "Google Cloud Spanner (or Bigtable with Paxos consensus)",
      "Microsoft Access 97",
      "SQLite in-memory mode",
      "A shared Google Sheet"
    ],
    "correctIndex": 0,
    "explanation": "Cloud Spanner provides global distribution, high availability, and external consistency (TrueTime API) with ACID transactions at immense scale."
  },
  {
    "id": "sd-q50",
    "category": "Gmail Architecture Case Study",
    "question": "Why does Gmail use WebSockets, Server-Sent Events (SSE), or HTTP Long Polling for the web inbox?",
    "options": [
      "To push new incoming email notifications in real time without the browser polling the server every second.",
      "To play music in the background.",
      "To keep the user's screen from turning off.",
      "Because regular HTTP is no longer supported on the Internet."
    ],
    "correctIndex": 0,
    "explanation": "Persistent bidirectional or push channels allow the server to deliver incoming emails to active browser tabs instantly with minimal bandwidth overhead."
  },
  {
    "id": "sd-q51",
    "category": "Gmail Architecture Case Study",
    "question": "In Gmail's architecture, what is the role of an asynchronous Worker Pool in email delivery?",
    "options": [
      "To manage human employees in the office.",
      "To pick up queued outgoing emails, resolve external MX records via DNS, establish TLS SMTP handshakes, and retry on transient recipient errors.",
      "To delete all emails older than 24 hours.",
      "To convert emails to audio podcasts."
    ],
    "correctIndex": 1,
    "explanation": "Worker pools decouple user-facing HTTP request threads from slow, unpredictable external network calls (SMTP connections to remote servers)."
  },
  {
    "id": "sd-q52",
    "category": "Gmail Architecture Case Study",
    "question": "What is the standard protocol used between email servers on the Internet to deliver mail?",
    "options": [
      "SMTP (Simple Mail Transfer Protocol)",
      "SNMP (Simple Network Management Protocol)",
      "IGMP (Internet Group Management Protocol)",
      "NTP (Network Time Protocol)"
    ],
    "correctIndex": 0,
    "explanation": "SMTP is the universal standard protocol for sending and relaying emails across independent mail exchange (MX) servers."
  },
  {
    "id": "sd-q53",
    "category": "Gmail Architecture Case Study",
    "question": "How does Gmail maintain offline functionality on mobile apps when an airplane takes off?",
    "options": [
      "By beaming satellite signals through the airplane window.",
      "By maintaining a local embedded database (e.g. SQLite / Room) with delta-synchronization queues when connectivity is restored.",
      "Offline mode is physically impossible for web and mobile apps.",
      "By caching the entire 15GB mailbox in mobile SIM card memory."
    ],
    "correctIndex": 1,
    "explanation": "Local storage (SQLite/IndexedDB) allows offline reading and drafting; mutation queues sync changes to the server once the device reconnects."
  },
  {
    "id": "sd-q54",
    "category": "Gmail Architecture Case Study",
    "question": "What is the \"Fan-out\" pattern in email and messaging systems?",
    "options": [
      "Cooling the data center with larger fans.",
      "Distributing a single incoming message to multiple recipient inboxes or notification channels.",
      "Rejecting all incoming emails when traffic is high.",
      "Sending an email to a random user."
    ],
    "correctIndex": 1,
    "explanation": "Fan-out refers to replicating or referencing a message to all intended recipient mailboxes or subscriber queues."
  },
  {
    "id": "sd-q55",
    "category": "Gmail Architecture Case Study",
    "question": "Why does Gmail sanitize incoming email HTML bodies before rendering them in the web client?",
    "options": [
      "To improve reading comprehension for children.",
      "To prevent Cross-Site Scripting (XSS) attacks by stripping malicious `<script>` tags, iframe embeds, and javascript URIs.",
      "To convert all text into uppercase.",
      "To translate emails into French."
    ],
    "correctIndex": 1,
    "explanation": "HTML email bodies can carry malicious JavaScript; strict HTML sanitization is crucial to prevent XSS session hijacking."
  },
  {
    "id": "sd-q56",
    "category": "REST APIs & Postman",
    "question": "Which of the following HTTP methods is defined as both SAFE and IDEMPOTENT according to RFC 7231?",
    "options": [
      "POST",
      "GET",
      "PATCH",
      "CONNECT"
    ],
    "correctIndex": 1,
    "explanation": "GET is safe (read-only, does not alter server state) and idempotent (repeated identical calls return identical representations)."
  },
  {
    "id": "sd-q57",
    "category": "REST APIs & Postman",
    "question": "What does \"Idempotency\" mean in API design?",
    "options": [
      "The API can only be called once per day.",
      "Making multiple identical requests produces the exact same server side-effects as making a single request.",
      "The API always returns HTML rather than JSON.",
      "The API is encrypted with 4096-bit RSA keys."
    ],
    "correctIndex": 1,
    "explanation": "f(f(x)) = f(x): An idempotent operation can be repeated safely without creating unintended duplicate side-effects (e.g. duplicate credit card charges)."
  },
  {
    "id": "sd-q58",
    "category": "REST APIs & Postman",
    "question": "What is the fundamental semantic difference between HTTP PUT and HTTP PATCH?",
    "options": [
      "PUT is for reading; PATCH is for deleting.",
      "PUT replaces the entire resource representation (idempotent); PATCH applies partial modifications to the resource.",
      "PUT only accepts XML; PATCH only accepts JSON.",
      "There is no difference; they are exact aliases."
    ],
    "correctIndex": 1,
    "explanation": "PUT completely overwrites the target resource; PATCH updates only the specified attributes/fields."
  },
  {
    "id": "sd-q59",
    "category": "REST APIs & Postman",
    "question": "Why is HTTP DELETE considered idempotent even if the second call returns a 404 Not Found status?",
    "options": [
      "Because 404 is technically a success code.",
      "Because the server state after the second call is identical to the state after the first call: the resource remains deleted.",
      "Because web servers ignore the second request automatically.",
      "Because DELETE requests are never sent over TCP."
    ],
    "correctIndex": 1,
    "explanation": "Idempotency refers to server side-effects, not status codes. Deleting an already-deleted resource leaves the server in the exact same state."
  },
  {
    "id": "sd-q60",
    "category": "REST APIs & Postman",
    "question": "How do production payment gateways (like Stripe) guarantee that network timeouts do not cause double-charging?",
    "options": [
      "By never allowing customers to retry a failed payment.",
      "By requiring an `Idempotency-Key` header with each POST request and caching the transaction response in Redis.",
      "By only processing payments between 9am and 5pm.",
      "By charging half the amount on every retry."
    ],
    "correctIndex": 1,
    "explanation": "The client supplies a unique idempotency key. The gateway uses atomic `SETNX` in Redis to ensure subsequent requests with the same key return the previous result without reprocessing."
  },
  {
    "id": "sd-q61",
    "category": "REST APIs & Postman",
    "question": "In Postman, what is the purpose of \"Pre-request Scripts\"?",
    "options": [
      "To format the code according to Prettier guidelines.",
      "To execute JavaScript code before a request is sent, such as computing HMAC signatures, setting dynamic timestamps, or refreshing OAuth tokens.",
      "To delete the Postman workspace if an error occurs.",
      "To slow down the internet connection."
    ],
    "correctIndex": 1,
    "explanation": "Pre-request scripts run before the HTTP request is dispatched, allowing dynamic variable injection, header computation, and token generation."
  },
  {
    "id": "sd-q62",
    "category": "REST APIs & Postman",
    "question": "What is the purpose of the `Authorization: Bearer <token>` HTTP header?",
    "options": [
      "To specify which animal mascot the company uses.",
      "To transmit a cryptographic security token (e.g. JWT) verifying the client's identity and permissions to access protected resources.",
      "To tell the browser which font family to render.",
      "To disable SSL verification on the server."
    ],
    "correctIndex": 1,
    "explanation": "The Bearer token authenticates the caller to the API Gateway or resource server without transmitting username/password credentials on every request."
  },
  {
    "id": "sd-q63",
    "category": "REST APIs & Postman",
    "question": "In RESTful URL naming conventions, which of the following is considered best practice for fetching comments on a specific email?",
    "options": [
      "POST /get_all_comments_by_email_id_now?id=45",
      "GET /api/v1/emails/45/comments",
      "FETCH /comments?action=find_email_45",
      "GET /api/v1/comments_for_email_forty_five"
    ],
    "correctIndex": 1,
    "explanation": "REST resources use nouns and hierarchical URI paths: `/resources/{id}/subresources` with appropriate HTTP verbs."
  },
  {
    "id": "sd-q64",
    "category": "REST APIs & Postman",
    "question": "What is the purpose of the HTTP `Accept` header in a client request?",
    "options": [
      "To tell the server whether the user accepts the terms of service.",
      "To indicate the MIME types of content the client can understand and expects in the response (e.g., `application/json`).",
      "To accept incoming phone calls.",
      "To approve automatic billing charges."
    ],
    "correctIndex": 1,
    "explanation": "The `Accept` header handles content negotiation, allowing the client to request JSON, XML, or PDF representations."
  },
  {
    "id": "sd-q65",
    "category": "REST APIs & Postman",
    "question": "What does the HTTP header `Content-Type: application/json; charset=utf-8` tell the server?",
    "options": [
      "That the client wants to download an audio file.",
      "That the body of the request is formatted as JSON encoded in UTF-8 text.",
      "That the server should format the response as XML.",
      "That the client is using Google Chrome."
    ],
    "correctIndex": 1,
    "explanation": "`Content-Type` describes the media type of the payload currently being transmitted in the request or response body."
  },
  {
    "id": "sd-q66",
    "category": "REST APIs & Postman",
    "question": "In Postman Test scripts, which syntax correctly asserts that a response returned status code 200?",
    "options": [
      "`pm.expect(response).to.be.equal(200)`",
      "`pm.test(\"Status is 200\", () => { pm.response.to.have.status(200); });`",
      "`if (code == 200) { pass(); }`",
      "`assert status == 200`"
    ],
    "correctIndex": 1,
    "explanation": "Postman uses Chai-based assertions within `pm.test(\"name\", function() { pm.response.to.have.status(200); })`."
  },
  {
    "id": "sd-q67",
    "category": "REST APIs & Postman",
    "question": "Why should sensitive parameters (like passwords or API tokens) NEVER be passed in URL Query Parameters (e.g. `?token=secret`)?",
    "options": [
      "Because query strings are stored in plain text across web server access logs, browser history, proxy caches, and Referer headers.",
      "Because URLs only support numbers, not letters.",
      "Because query parameters can only be 5 characters long.",
      "Because HTTP prohibits questions marks in URLs."
    ],
    "correctIndex": 0,
    "explanation": "Query parameters are routinely logged in plaintext by reverse proxies, load balancers, and browser history, exposing secrets."
  },
  {
    "id": "sd-q68",
    "category": "REST APIs & Postman",
    "question": "What does CORS (Cross-Origin Resource Sharing) protect against in web browsers?",
    "options": [
      "It prevents an untrusted website from making unauthorized background AJAX requests to another origin using the user's ambient cookie credentials.",
      "It prevents computer monitors from burning out pixels.",
      "It stops servers from running out of disk space.",
      "It speeds up JavaScript compilation."
    ],
    "correctIndex": 0,
    "explanation": "CORS is a browser security mechanism enforcing the Same-Origin Policy and governing cross-domain API access via preflight `OPTIONS` requests."
  },
  {
    "id": "sd-q69",
    "category": "REST APIs & Postman",
    "question": "What is an HTTP Preflight Request?",
    "options": [
      "A request sent by airlines before booking a seat.",
      "An `OPTIONS` request sent automatically by browsers to check if the destination server permits cross-origin methods and custom headers before sending the real request.",
      "A ping request to check Wi-Fi speed.",
      "A test compilation of JavaScript code."
    ],
    "correctIndex": 1,
    "explanation": "The browser sends an `OPTIONS` preflight request with `Origin` and `Access-Control-Request-Method` headers before non-simple cross-origin requests."
  },
  {
    "id": "sd-q70",
    "category": "REST APIs & Postman",
    "question": "In Postman, what is an \"Environment Variable\"?",
    "options": [
      "A temperature sensor in the data center.",
      "A key-value pair (such as `{{baseUrl}}` or `{{authToken}}`) that allows requests to be reused across different environments (Development, Staging, Production).",
      "A global CSS class.",
      "A legal policy requirement."
    ],
    "correctIndex": 1,
    "explanation": "Environment variables allow test collections to run seamlessly across local, staging, and production environments by substituting base URLs and credentials."
  },
  {
    "id": "sd-q71",
    "category": "HTTP Status Codes",
    "question": "When a client initiates a long-running asynchronous batch process (like exporting 50,000 emails to a ZIP), which HTTP status code should the server return immediately?",
    "options": [
      "200 OK",
      "202 Accepted",
      "204 No Content",
      "404 Not Found"
    ],
    "correctIndex": 1,
    "explanation": "202 Accepted indicates that the request has been received and validated, but processing will occur asynchronously in the background."
  },
  {
    "id": "sd-q72",
    "category": "HTTP Status Codes",
    "question": "What is the precise architectural difference between HTTP 401 Unauthorized and HTTP 403 Forbidden?",
    "options": [
      "401 means the server crashed; 403 means the client crashed.",
      "401 is an Authentication failure (\"Who are you? Missing/invalid token\"); 403 is an Authorization failure (\"I know who you are, but you do not have permission\").",
      "401 is only for mobile apps; 403 is for desktop browsers.",
      "There is no difference; they are interchangeable."
    ],
    "correctIndex": 1,
    "explanation": "401 Unauthorized implies missing or invalid credentials; 403 Forbidden means the identity is verified, but access to the resource is explicitly denied."
  },
  {
    "id": "sd-q73",
    "category": "HTTP Status Codes",
    "question": "When a client sends a conditional GET request with `If-None-Match: \"etag123\"` and the server resource has not changed, what status code is returned?",
    "options": [
      "200 OK with the full payload again",
      "304 Not Modified with an empty body",
      "404 Not Found",
      "500 Server Error"
    ],
    "correctIndex": 1,
    "explanation": "304 Not Modified tells the client its cached copy is fresh, transferring zero payload bytes and saving bandwidth."
  },
  {
    "id": "sd-q74",
    "category": "HTTP Status Codes",
    "question": "What does HTTP 429 Too Many Requests signify, and which HTTP header typically accompanies it?",
    "options": [
      "The server hard disk is full; accompanied by `Content-Length`.",
      "The client exceeded rate limits; accompanied by `Retry-After` specifying how many seconds to wait before retrying.",
      "The user password was wrong; accompanied by `WWW-Authenticate`.",
      "The client browser is too old; accompanied by `User-Agent`."
    ],
    "correctIndex": 1,
    "explanation": "429 indicates rate-limit exhaustion. The `Retry-After` header tells the client how long to back off."
  },
  {
    "id": "sd-q75",
    "category": "HTTP Status Codes",
    "question": "What is the difference between a 502 Bad Gateway and a 504 Gateway Timeout?",
    "options": [
      "502 means the client disconnected; 504 means the server rebooted.",
      "502 means an edge reverse-proxy received an invalid or crashed response from the upstream server; 504 means the reverse-proxy timed out waiting for the upstream server to respond.",
      "502 is for Wi-Fi errors; 504 is for 4G cellular errors.",
      "They are identical codes generated by different operating systems."
    ],
    "correctIndex": 1,
    "explanation": "502 Bad Gateway occurs when the upstream node crashes or returns garbage; 504 Gateway Timeout occurs when the upstream takes longer than the proxy's timeout threshold."
  },
  {
    "id": "sd-q76",
    "category": "HTTP Status Codes",
    "question": "When a new resource (e.g. an email draft) is created successfully, what status code should be returned along with which header?",
    "options": [
      "200 OK with `Accept` header",
      "201 Created with `Location` header pointing to the new resource URL",
      "204 No Content with `Set-Cookie` header",
      "301 Moved Permanently with `Host` header"
    ],
    "correctIndex": 1,
    "explanation": "201 Created signals successful resource creation and should include the `Location: /api/v1/emails/draft-789` header."
  },
  {
    "id": "sd-q77",
    "category": "HTTP Status Codes",
    "question": "Which status code is most appropriate after a successful `DELETE /api/v1/emails/msg-456` where no response body is needed?",
    "options": [
      "201 Created",
      "204 No Content",
      "404 Not Found",
      "302 Found"
    ],
    "correctIndex": 1,
    "explanation": "204 No Content confirms that the action succeeded and the response payload is intentionally empty."
  },
  {
    "id": "sd-q78",
    "category": "HTTP Status Codes",
    "question": "What is the primary difference between HTTP 301 Moved Permanently and HTTP 302 Found?",
    "options": [
      "301 instructs search engines and browsers to permanently cache the new URL; 302 indicates a temporary redirection without updating bookmarks or SEO indexes.",
      "301 is an error; 302 is a success.",
      "301 requires payment; 302 is free.",
      "301 only works on mobile devices."
    ],
    "correctIndex": 0,
    "explanation": "301 is a permanent redirect (cached aggressively by browsers and search engines); 302 is temporary (clients query original URL again next time)."
  },
  {
    "id": "sd-q79",
    "category": "HTTP Status Codes",
    "question": "When a client submits a malformed JSON body (e.g. missing closing brace or invalid data type), which status code must be returned?",
    "options": [
      "500 Internal Server Error",
      "400 Bad Request",
      "403 Forbidden",
      "502 Bad Gateway"
    ],
    "correctIndex": 1,
    "explanation": "400 Bad Request is returned when the client sends syntactically invalid data, schema violations, or unparseable payloads."
  },
  {
    "id": "sd-q80",
    "category": "HTTP Status Codes",
    "question": "Why is returning HTTP 500 for business validation errors (e.g. \"Account balance insufficient\") considered a bad architectural practice?",
    "options": [
      "Because 500 signals an internal server crash/unhandled exception, polluting alert telemetry and misleading on-call engineers.",
      "Because status 500 causes the user's computer to restart.",
      "Because 500 status codes cost money on AWS.",
      "Because browsers refuse to display 500 responses."
    ],
    "correctIndex": 0,
    "explanation": "500 indicates unexpected system bugs or crashes. Expected business rule violations should return 4xx (e.g. 400 Bad Request or 422 Unprocessable Entity)."
  },
  {
    "id": "sd-q81",
    "category": "HTTP Status Codes",
    "question": "What does HTTP 503 Service Unavailable typically indicate in a production cloud environment?",
    "options": [
      "The website has gone out of business permanently.",
      "The server or load balancer is temporarily unable to handle the request due to maintenance, capacity exhaustion, or active rate shedding.",
      "The user has been blocked by law enforcement.",
      "The client's ethernet cable is unplugged."
    ],
    "correctIndex": 1,
    "explanation": "503 means the server is temporarily overloaded or undergoing maintenance. Well-behaved clients should back off and retry later."
  },
  {
    "id": "sd-q82",
    "category": "HTTP Status Codes",
    "question": "What is the meaning of HTTP 408 Request Timeout?",
    "options": [
      "The server spent 30 minutes executing a SQL query.",
      "The server closed the connection because the client took too long to complete sending the request body over TCP.",
      "The user forgot their password.",
      "The DNS server did not respond."
    ],
    "correctIndex": 1,
    "explanation": "408 indicates that the server's idle timer expired while waiting for the client to finish transmitting its HTTP request."
  },
  {
    "id": "sd-q83",
    "category": "HTTP Status Codes",
    "question": "Which status code indicates that the client requested a resource representation format that the server cannot supply (e.g. requesting `Accept: application/xml` from a JSON-only API)?",
    "options": [
      "404 Not Found",
      "406 Not Acceptable",
      "415 Unsupported Media Type",
      "501 Not Implemented"
    ],
    "correctIndex": 1,
    "explanation": "406 Not Acceptable is returned when the server cannot produce a response matching the `Accept` headers specified by the client."
  },
  {
    "id": "sd-q84",
    "category": "HTTP Status Codes",
    "question": "What is HTTP 415 Unsupported Media Type used for?",
    "options": [
      "When the client attempts to upload a file format (e.g. `Content-Type: image/bmp`) that the API endpoint explicitly rejects.",
      "When the client uses an unsupported web browser.",
      "When a video is playing in the wrong aspect ratio.",
      "When the server audio speaker is broken."
    ],
    "correctIndex": 0,
    "explanation": "415 indicates that the request entity payload format is not supported by the requested resource for the requested method."
  },
  {
    "id": "sd-q85",
    "category": "HTTP Status Codes",
    "question": "What does HTTP 409 Conflict indicate in REST APIs?",
    "options": [
      "Two developers are arguing in a meeting.",
      "The request could not be completed due to a conflict with the current state of the target resource (e.g., an edit conflict or duplicate unique key constraint).",
      "The server is running two conflicting operating systems.",
      "The user's email contains spelling errors."
    ],
    "correctIndex": 1,
    "explanation": "409 Conflict indicates a clash with existing resource state, such as optimistic lock version mismatches or attempting to register an existing email."
  },
  {
    "id": "sd-q86",
    "category": "Load Balancing & Scaling",
    "question": "What is the key functional difference between a Layer 4 (L4) and Layer 7 (L7) Load Balancer?",
    "options": [
      "L4 is 4 times slower than L7.",
      "L4 routes traffic based on TCP/UDP IP and Port without inspecting packet contents; L7 inspects HTTP headers, cookies, and URI paths.",
      "L4 is for software; L7 is for hardware.",
      "L4 does not support internet traffic."
    ],
    "correctIndex": 1,
    "explanation": "L4 makes routing decisions at the transport layer (ultra-high packet throughput); L7 terminates connections and evaluates application-layer HTTP payloads."
  },
  {
    "id": "sd-q87",
    "category": "Load Balancing & Scaling",
    "question": "When is the \"Least Connections\" load balancing algorithm superior to simple \"Round Robin\"?",
    "options": [
      "When all requests take exactly 5 milliseconds.",
      "When requests vary widely in duration and processing load (such as long-lived WebSocket sessions or large file uploads).",
      "When all backend servers have identical CPU and RAM.",
      "When there is only one backend server."
    ],
    "correctIndex": 1,
    "explanation": "If request durations vary, Round Robin can accumulate heavy connections on one node; Least Connections routes traffic to the server with the fewest active connections."
  },
  {
    "id": "sd-q88",
    "category": "Load Balancing & Scaling",
    "question": "What is \"IP Hash\" load balancing, and what is its primary weakness?",
    "options": [
      "It converts IP addresses into Bitcoin; weakness is volatility.",
      "It hashes client IP to bind a user to a specific server instance; weakness is that all clients behind a corporate NAT proxy get mapped to the same server, causing severe hot-spotting.",
      "It only works for IPv6 addresses.",
      "It requires servers to have static IP addresses."
    ],
    "correctIndex": 1,
    "explanation": "IP Hash creates affinity based on IP, but thousands of corporate users sharing one outbound NAT gateway will overload a single server instance."
  },
  {
    "id": "sd-q89",
    "category": "Load Balancing & Scaling",
    "question": "What is \"Consistent Hashing\" and why is it preferred over `hash(key) % N` in distributed caching systems?",
    "options": [
      "It ensures that hashes are always printed in uppercase letters.",
      "When nodes are added or removed, standard modulo rehashing remaps almost all keys, whereas Consistent Hashing remaps only `k / N` keys on average.",
      "It makes hashing 100 times slower to prevent hackers.",
      "It is only used for encrypting credit card numbers."
    ],
    "correctIndex": 1,
    "explanation": "Consistent Hashing maps both servers and keys to a virtual ring. Adding or removing a server affects only adjacent keys, avoiding catastrophic cache wipes."
  },
  {
    "id": "sd-q90",
    "category": "Load Balancing & Scaling",
    "question": "What is Anycast routing and how does Google use it at the edge?",
    "options": [
      "Broadcasting video games to YouTube.",
      "Assigning the same IP address to multiple physical servers worldwide; BGP routes the client's packets to the topologically closest data center.",
      "Sending every packet to all servers simultaneously.",
      "Encrypting data using quantum entanglement."
    ],
    "correctIndex": 1,
    "explanation": "Anycast advertises a single IP from multiple global locations, letting BGP route clients to the nearest physical PoP for low latency."
  },
  {
    "id": "sd-q91",
    "category": "Load Balancing & Scaling",
    "question": "What does \"SSL Termination\" (or TLS Offloading) at the Load Balancer level accomplish?",
    "options": [
      "It turns off encryption completely so hackers can see data.",
      "It decrypts incoming TLS traffic at the load balancer, relieving application servers from the heavy CPU cost of cryptographic handshakes.",
      "It terminates user accounts whose SSL certificates expire.",
      "It blocks all HTTPS traffic."
    ],
    "correctIndex": 1,
    "explanation": "Decrypting TLS at the edge load balancer centralizes certificate management and frees backend app servers to focus entirely on application logic."
  },
  {
    "id": "sd-q92",
    "category": "Load Balancing & Scaling",
    "question": "What is a \"Health Check\" in load balancing?",
    "options": [
      "A medical checkup for data center employees.",
      "A periodic probe (HTTP GET /healthz or TCP ping) sent to backend instances; if an instance fails to respond, the load balancer stops routing traffic to it.",
      "Checking the temperature of the server room.",
      "Scanning for computer viruses every morning."
    ],
    "correctIndex": 1,
    "explanation": "Health checks detect crashed or unhealthy instances automatically, removing them from the active pool to preserve 100% request success."
  },
  {
    "id": "sd-q93",
    "category": "Load Balancing & Scaling",
    "question": "What is the primary danger of using \"Sticky Sessions\" (Session Affinity) in production?",
    "options": [
      "Sessions become sticky like honey and attract ants.",
      "It prevents even load distribution, creates severe traffic hotspots, and drops active sessions if a server instance crashes.",
      "Sticky sessions are prohibited by modern web standards.",
      "They make CSS files load slower."
    ],
    "correctIndex": 1,
    "explanation": "Sticky sessions couple clients to specific physical machines. If a node fails, user sessions die. Storing sessions in distributed Redis clusters is far superior."
  },
  {
    "id": "sd-q94",
    "category": "Load Balancing & Scaling",
    "question": "What is \"Horizontal Pod Autoscaling\" (HPA) in Kubernetes?",
    "options": [
      "Stretching the physical computer case horizontally.",
      "Automatically adjusting the number of running replica pods based on observed CPU utilization, memory pressure, or custom QPS metrics.",
      "Upgrading CPU cores from 4 to 64 on a single machine.",
      "Rotating the screen orientation on mobile devices."
    ],
    "correctIndex": 1,
    "explanation": "HPA dynamically spins up new stateless container replicas during traffic surges and scales down during troughs to optimize infrastructure spend."
  },
  {
    "id": "sd-q95",
    "category": "Load Balancing & Scaling",
    "question": "Why is Horizontal Scaling generally preferred over Vertical Scaling for tier-1 web applications?",
    "options": [
      "Horizontal scaling allows near-infinite linear expansion using cost-effective commodity hardware and eliminates single points of failure.",
      "Vertical scaling is prohibited by cloud providers.",
      "Horizontal servers do not require electricity.",
      "Vertical scaling only works on Linux, not Windows."
    ],
    "correctIndex": 0,
    "explanation": "Vertical scaling reaches silicon, thermal, and cost limits; horizontal scaling distributes workload across hundreds of thousands of commodity machines."
  },
  {
    "id": "sd-q96",
    "category": "Load Balancing & Scaling",
    "question": "What is \"Cross-Zone Load Balancing\"?",
    "options": [
      "Balancing traffic across different time zones.",
      "Distributing traffic evenly across backend server instances located across multiple Availability Zones (AZs) in a cloud region.",
      "Sharing internet bandwidth with neighboring houses.",
      "Switching between Wi-Fi and 5G cellular."
    ],
    "correctIndex": 1,
    "explanation": "Cross-zone load balancing distributes requests across all instances in all target availability zones regardless of which zone received the incoming connection."
  },
  {
    "id": "sd-q97",
    "category": "Load Balancing & Scaling",
    "question": "What is a \"Reverse Proxy\" (e.g. NGINX, HAProxy)?",
    "options": [
      "A proxy that lets employees browse the internet from the office.",
      "A server that sits in front of web servers and forwards client requests to them, providing security, caching, SSL termination, and compression.",
      "A proxy that reverses the order of words in text.",
      "A device used to test backwards internet cables."
    ],
    "correctIndex": 1,
    "explanation": "Forward proxies sit in front of clients; reverse proxies sit in front of servers to intercept, balance, inspect, and protect internal infrastructure."
  },
  {
    "id": "sd-q98",
    "category": "Load Balancing & Scaling",
    "question": "What is the role of a Content Delivery Network (CDN) like Cloudflare or CloudFront?",
    "options": [
      "To build physical television sets.",
      "To cache static assets (HTML, CSS, JS, images, videos) at geographically dispersed edge servers close to end-users, reducing latency and origin server load.",
      "To replace backend database storage.",
      "To generate artificial intelligence content."
    ],
    "correctIndex": 1,
    "explanation": "CDNs terminate user connections at edge locations worldwide, serving cached static assets in single-digit milliseconds and reducing origin egress costs."
  },
  {
    "id": "sd-q99",
    "category": "Load Balancing & Scaling",
    "question": "What is \"Connection Pooling\" in high-performance application servers?",
    "options": [
      "A swimming pool inside a data center for cooling.",
      "Maintaining a cache of open, reusable database or HTTP connections to avoid the heavy latency of TCP and TLS handshakes on every request.",
      "Merging multiple Wi-Fi networks together.",
      "Sharing one user account across 100 people."
    ],
    "correctIndex": 1,
    "explanation": "Creating TCP/database connections is expensive (SYN/ACK, auth, TLS). Connection pools keep warm connections ready for instant reuse."
  },
  {
    "id": "sd-q100",
    "category": "Load Balancing & Scaling",
    "question": "What is \"DNS Round Robin\" and what is its primary limitation?",
    "options": [
      "It assigns multiple IP addresses to a domain name; its limitation is that DNS resolvers cache IPs locally, preventing instant failover if a server dies.",
      "It causes birds to fly in circles around antennas.",
      "It only works for `.com` domains.",
      "It requires updating DNS records manually every second."
    ],
    "correctIndex": 0,
    "explanation": "DNS round robin cycles IPs, but because client DNS caches respect TTLs, traffic continues hitting dead IPs long after an outage begins."
  },
  {
    "id": "sd-q101",
    "category": "Databases & Caching",
    "question": "What do the letters in ACID stand for in relational database management systems?",
    "options": [
      "Action, Calculation, Iteration, Deployment",
      "Atomicity, Consistency, Isolation, Durability",
      "Asynchronous, Concurrent, Indexed, Distributed",
      "Authentication, Cryptography, Integrity, Decryption"
    ],
    "correctIndex": 1,
    "explanation": "ACID guarantees: Atomicity (all or nothing), Consistency (valid state transitions), Isolation (independent concurrent transactions), Durability (persisted on disk)."
  },
  {
    "id": "sd-q102",
    "category": "Databases & Caching",
    "question": "What does the BASE model in NoSQL distributed systems stand for?",
    "options": [
      "Basically Available, Soft state, Eventual consistency",
      "Binary Architecture, Secure Encryption",
      "Base Array, Storage Engine",
      "Backup Automatically, Save Everything"
    ],
    "correctIndex": 0,
    "explanation": "BASE trades immediate ACID consistency for high availability and partition tolerance, guaranteeing eventual convergence across replicas."
  },
  {
    "id": "sd-q103",
    "category": "Databases & Caching",
    "question": "What is Database Sharding?",
    "options": [
      "Throwing a hard drive on the floor to break it.",
      "Horizontal partitioning of a database across multiple physical machines using a chosen Shard Key.",
      "Converting SQL tables into Excel spreadsheets.",
      "Encrypting database passwords with SHA-256."
    ],
    "correctIndex": 1,
    "explanation": "Sharding partitions rows across multiple independent database servers by shard key (e.g. user ID hash) to scale beyond single-node storage and IOPS limits."
  },
  {
    "id": "sd-q104",
    "category": "Databases & Caching",
    "question": "What is the \"Cache-Aside\" (Lazy Loading) caching pattern?",
    "options": [
      "The application always writes directly to disk and ignores cache.",
      "The application first checks the cache. On a cache miss, it reads from the database, writes the data to the cache, and returns it to the client.",
      "The database updates the cache automatically via background triggers.",
      "The cache is cleared every 5 seconds."
    ],
    "correctIndex": 1,
    "explanation": "In Cache-Aside, the application code coordinates both cache and DB: only requested keys are loaded into cache, saving memory for unaccessed records."
  },
  {
    "id": "sd-q105",
    "category": "Databases & Caching",
    "question": "What is \"Write-Through\" caching?",
    "options": [
      "Writing data directly to paper before typing it.",
      "The application writes data to the cache, and the cache synchronously writes to the primary database before acknowledging success.",
      "Writing data to the database without updating the cache.",
      "Writing data backwards in memory."
    ],
    "correctIndex": 1,
    "explanation": "In Write-Through, the cache layer sits between app and DB, writing synchronously to both to guarantee consistency at the cost of write latency."
  },
  {
    "id": "sd-q106",
    "category": "Databases & Caching",
    "question": "What is the primary risk of the \"Write-Back\" (Write-Behind) caching pattern?",
    "options": [
      "It is too slow for production.",
      "Because writes are acknowledged immediately after hitting RAM and flushed asynchronously to the database, data can be permanently lost if the cache server crashes before flushing.",
      "It causes SQL injection vulnerabilities.",
      "It disables read queries."
    ],
    "correctIndex": 1,
    "explanation": "Write-Back provides ultra-fast write performance, but volatile RAM buffering exposes uncommitted transactions to loss if the cache node crashes."
  },
  {
    "id": "sd-q107",
    "category": "Databases & Caching",
    "question": "What is \"Cache Penetration\" and what is the standard production solution?",
    "options": [
      "When hackers drill holes into server chips; solution is metal shielding.",
      "When clients query for non-existent keys (e.g. `userId = -1`) causing every request to miss cache and hit the database; solution is caching null values or using a Bloom Filter.",
      "When the cache server runs out of disk space; solution is adding SSDs.",
      "When cache keys are too long; solution is shortening strings."
    ],
    "correctIndex": 1,
    "explanation": "Cache Penetration bypasses cache completely. Bloom filters at the edge or short-lived null-value caching protect the DB from exhausting queries."
  },
  {
    "id": "sd-q108",
    "category": "Databases & Caching",
    "question": "What is a \"Bloom Filter\" in system design?",
    "options": [
      "A camera lens filter for photographing server racks.",
      "A space-efficient probabilistic data structure used to test whether an element is definitely NOT in a set or MIGHT be in a set.",
      "A software program that cleans dust from cooling fans.",
      "A graphical user interface for CSS animations."
    ],
    "correctIndex": 1,
    "explanation": "Bloom filters use bit arrays and multiple hash functions: false positives are possible, but false negatives are impossible, stopping invalid queries before the DB."
  },
  {
    "id": "sd-q109",
    "category": "Databases & Caching",
    "question": "What is the \"Cache Breakdown\" (Hotspot Key Expiry) problem?",
    "options": [
      "When a cache server catches fire.",
      "When an ultra-popular key (e.g. a breaking news tweet) expires, causing thousands of concurrent requests to simultaneously miss the cache and overwhelm the database.",
      "When Redis forgets how to parse JSON.",
      "When data is written faster than the network can transmit."
    ],
    "correctIndex": 1,
    "explanation": "When a viral key expires, concurrent threads slam the database. Mutex locks on cache misses or background refresh prevent DB collapse."
  },
  {
    "id": "sd-q110",
    "category": "Databases & Caching",
    "question": "How do you prevent a \"Cache Stampede\" (Thundering Herd) when setting Time-To-Live (TTL) on cached objects?",
    "options": [
      "Set the exact same TTL on every key.",
      "Add a randomized time jitter to the TTL (e.g., `TTL = 3600 + rand(0, 300)`) so keys do not expire at the exact same second.",
      "Disable TTL completely and never evict keys.",
      "Restart the cache server every hour."
    ],
    "correctIndex": 1,
    "explanation": "Adding random jitter disperses key expiration across a time window, preventing massive simultaneous cache misses."
  },
  {
    "id": "sd-q111",
    "category": "Databases & Caching",
    "question": "What is the difference between LRU (Least Recently Used) and LFU (Least Frequently Used) cache eviction policies?",
    "options": [
      "LRU evicts the key that has not been accessed for the longest time; LFU evicts the key that has been accessed the fewest total number of times.",
      "LRU is for strings; LFU is for numbers.",
      "LRU uses more memory than LFU.",
      "They are identical algorithms."
    ],
    "correctIndex": 0,
    "explanation": "LRU tracks recency of access; LFU tracks frequency of access counters. Both are standard cache eviction policies when RAM fills."
  },
  {
    "id": "sd-q112",
    "category": "Databases & Caching",
    "question": "What is Master-Slave (Primary-Replica) database replication, and what happens when the Primary node crashes?",
    "options": [
      "All replicas are immediately deleted.",
      "Writes go to the Primary and are replicated to read replicas; if the Primary crashes, an automated consensus election (via Raft/Paxos or Orchestrator) promotes a Replica to become the new Primary.",
      "The database remains read-only forever.",
      "Data is lost permanently."
    ],
    "correctIndex": 1,
    "explanation": "Primary-Replica offloads read queries to replicas. Automatic failover promotes a synchronized replica when the primary fails."
  },
  {
    "id": "sd-q113",
    "category": "Deployments & Interviews",
    "question": "What is a \"Blue-Green Deployment\"?",
    "options": [
      "Painting server racks in blue and green colors.",
      "Running two identical production environments (Blue and Green); new code is deployed to the idle Green environment, tested, and router switches 100% traffic to Green with instant rollback capability.",
      "Deploying code only on Mondays and Fridays.",
      "A deployment strategy for environmental sustainability."
    ],
    "correctIndex": 1,
    "explanation": "Blue-Green deployments maintain two identical stacks. Traffic is flipped at the load balancer instantly, allowing zero-downtime releases and rapid rollback."
  },
  {
    "id": "sd-q114",
    "category": "Deployments & Interviews",
    "question": "How does a \"Canary Deployment\" differ from a Blue-Green deployment?",
    "options": [
      "Canary deployment uses birds to carry USB flash drives.",
      "Canary rolls out the new version to a small percentage (e.g. 2%-5%) of real users, monitoring error rates and telemetry before progressively expanding to 100%.",
      "Canary deployment requires shutting down the data center.",
      "Canary deployment only works on staging servers."
    ],
    "correctIndex": 1,
    "explanation": "Named after canaries in coal mines, canary deployments expose a small fraction of real traffic to the new build, verifying stability before full rollout."
  },
  {
    "id": "sd-q115",
    "category": "Deployments & Interviews",
    "question": "What is a \"Feature Flag\" (Feature Toggle)?",
    "options": [
      "A colorful flag hung in the office when a sprint finishes.",
      "A software technique that decouples code deployment from feature release, allowing features to be enabled or disabled for specific users at runtime without redeploying code.",
      "A compiler flag that enables C++ optimizations.",
      "A git branch naming convention."
    ],
    "correctIndex": 1,
    "explanation": "Feature flags allow dynamic runtime toggling of features (via config or Redis), enabling dark launches, A/B testing, and instant kill-switches."
  },
  {
    "id": "sd-q116",
    "category": "Deployments & Interviews",
    "question": "What is the STAR method used in FAANG behavioral and engineering leadership interviews?",
    "options": [
      "Syntax, Testing, Architecture, Review",
      "Situation, Task, Action, Result",
      "Speed, Timing, Allocation, Routing",
      "Storage, Transport, Authentication, Reliability"
    ],
    "correctIndex": 1,
    "explanation": "The STAR framework structures behavioral answers: Situation (context), Task (challenge), Action (what you specifically did), and Result (quantifiable impact)."
  },
  {
    "id": "sd-q117",
    "category": "Deployments & Interviews",
    "question": "How do production database migrations safely add a non-nullable column to a 500-million-row SQL table without downtime?",
    "options": [
      "Execute `ALTER TABLE users ADD COLUMN phone VARCHAR(20) NOT NULL` during peak hours.",
      "Use a multi-step phased migration: (1) Add column as NULLABLE, (2) Deploy app writing to both old and new columns, (3) Backfill historical rows in small batches, (4) Add NOT NULL constraint, (5) Deprecate old code.",
      "Drop the table and recreate it from scratch.",
      "Export the table to a CSV file on a developer's laptop."
    ],
    "correctIndex": 1,
    "explanation": "Directly adding constraints on huge tables causes table locks. Multi-phase migrations (expand and contract pattern) prevent blocking user traffic."
  },
  {
    "id": "sd-q118",
    "category": "Deployments & Interviews",
    "question": "What does Mentor Kapil advise when an interviewer asks: \"Is your system design solution 100% perfect?\"",
    "options": [
      "Always say \"Yes, there are zero flaws in my design.\"",
      "Acknowledge that there are no perfect architectures, only trade-offs; articulate bottlenecks, single points of failure, and how the system behaves under 10x traffic.",
      "Argue that all other competitors will fail.",
      "Refuse to answer the question."
    ],
    "correctIndex": 1,
    "explanation": "Engineering is the discipline of trade-offs. Great interview candidates proactively identify where their design breaks down and discuss mitigations."
  },
  {
    "id": "sd-q119",
    "category": "Deployments & Interviews",
    "question": "What is \"Dark Launching\"?",
    "options": [
      "Releasing software in the middle of the night with the office lights turned off.",
      "Deploying a new backend feature and sending real production traffic or shadow requests to it in the background to test performance without presenting the UI to users.",
      "A cyber-attack launched by anonymous hackers.",
      "Deploying software without version control."
    ],
    "correctIndex": 1,
    "explanation": "Dark launching exercises the new backend under actual production load and latency conditions before exposing the feature in the user interface."
  },
  {
    "id": "sd-q120",
    "category": "Deployments & Interviews",
    "question": "What is the passing score benchmark for the SPSU Special Edition System Design Post-Assessment to unlock the System Design Architect Badge & Certificate?",
    "options": [
      "50% (60 / 120)",
      "60% (72 / 120)",
      "75% (90 / 120)",
      "Strictly 80% (at least 96 out of 120 correct)"
    ],
    "correctIndex": 3,
    "explanation": "The SPSU Placement Readiness curriculum enforces an 80% benchmark (96/120) to guarantee technical mastery for Tier-1 company hiring standards."
  }
];
