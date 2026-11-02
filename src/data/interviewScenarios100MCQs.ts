import { InterviewScenarioQuestion } from '../types';

/**
 * SPSU Udaipur Placement Readiness Program
 * Mentor: Kapil | 100 Real Engineering Scenario & Case Study MCQs
 * Comprehensive Industry Coverage:
 * - Production Outage Triage & Incident Management (20 Scenarios)
 * - Database Deadlocks, Slow Queries & Storage Engineering (20 Scenarios)
 * - Distributed Systems & Microservices Architecture (20 Scenarios)
 * - Code Review, Technical Debt & Refactoring (15 Scenarios)
 * - Agile Sprint Deadlines, Estimation & Scope Creep (10 Scenarios)
 * - Engineering Leadership, Ethics & Team Conflict Resolution (15 Scenarios)
 */
export const INTERVIEW_SCENARIOS_100_MCQS: InterviewScenarioQuestion[] = [
  {
    "id": "ir-sc-1",
    "scenarioContext": "During a major e-commerce festive sale at 12:05 AM, the checkout microservice begins returning HTTP 500 errors to 35% of shoppers. CPU usage on the container cluster spikes to 98% and error logs show connection timeouts to the payment database.",
    "question": "As the on-call engineer, what is your IMMEDIATE first action?",
    "options": [
      "Open the IDE and inspect the latest commit diff to find bug origins",
      "Mitigate customer impact immediately by scaling out container replicas, enabling circuit breakers / fallback queue, and notifying incident response channels",
      "Restart the production database without taking a snapshot",
      "Wait 15 minutes to see if traffic naturally subsides"
    ],
    "correctIndex": 1,
    "explanation": "In live production incidents, the golden rule is 'Mitigate First, Investigate Later'. Scaling replicas or enabling fallback queues shields users while preserving error logs for investigation.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-2",
    "scenarioContext": "A newly deployed canary release of your mobile backend introduces a severe bug where authenticated sessions prematurely expire every 30 seconds. 5% of users in the canary group are affected.",
    "question": "What is the most prudent and standard DevOps action to take?",
    "options": [
      "Push a hasty hotfix commit directly into the production branch without tests",
      "Immediately roll back the canary deployment to the previous stable release version and investigate the bug in a local staging environment",
      "Keep the canary running and tell affected users to reinstall the mobile app",
      "Promote the canary to 100% of users so everyone has the same behavior"
    ],
    "correctIndex": 1,
    "explanation": "Canary deployments exist specifically to catch regressions at low blast radius. The instant an anomaly is detected, the deployment should be rolled back automatically or manually.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-3",
    "scenarioContext": "Your cloud service experiences a cascading failure: Service A calls Service B, which calls Service C. Service C slows down due to high load, causing Service B threads to block, which in turn exhausts Service A's thread pool, taking down the entire portal.",
    "question": "Which architectural pattern would have prevented this catastrophic cascading collapse?",
    "options": [
      "Singleton Pattern",
      "Circuit Breaker Pattern (e.g. Resilience4j / Netflix Hystrix) with tight timeouts and fallback responses",
      "Infinite retry loop without backoff",
      "Removing all authentication headers"
    ],
    "correctIndex": 1,
    "explanation": "The Circuit Breaker pattern trips open when downstream failure rates or latencies exceed a threshold, failing fast with cached fallbacks and preventing upstream thread pool starvation.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-4",
    "scenarioContext": "A junior developer accidentally executes 'DROP TABLE users;' in the production MySQL terminal while attempting to clean up a staging test database.",
    "question": "What sequence of actions should the engineering team follow?",
    "options": [
      "Fire the developer on the spot and delete the server",
      "Immediately activate the disaster recovery runbook: freeze writes, restore the latest point-in-time snapshot (PITR) from Write-Ahead Logs / automated backups, verify data consistency, and conduct a blameless post-mortem",
      "Manually recreate user rows from memory",
      "Ignore the incident and hope no users log in"
    ],
    "correctIndex": 1,
    "explanation": "Disaster recovery depends on Point-in-Time Recovery (PITR) from WAL logs and automated snapshots. Blameless post-mortems eliminate root access directly to production terminals, replacing it with audited migration tools.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-5",
    "scenarioContext": "Following a major outage that lasted 42 minutes, management requests a formal Root Cause Analysis (RCA) report.",
    "question": "What is the core philosophy of an industry-standard 'Blameless Post-Mortem'?",
    "options": [
      "Identifying the individual engineer who made the mistake and publicly reprimanding them",
      "Assuming that humans will always make mistakes under complex conditions, and focusing on systemic vulnerabilities, insufficient automated guardrails, missing alerts, and process improvements",
      "Hiding the incident from external stakeholders and customers",
      "Claiming the cloud provider was entirely at fault"
    ],
    "correctIndex": 1,
    "explanation": "Blameless post-mortems focus on systemic improvements (better CI/CD checks, automated canary rollbacks, restricted DB permissions) rather than human scapegoating, encouraging open reporting of risks.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-6",
    "scenarioContext": "Your application logs are flooding with 'java.lang.OutOfMemoryError: Java heap space' every 4 hours. Restarting the pod temporarily resolves the issue, but memory ramps up continuously.",
    "question": "What is the most effective diagnostic step?",
    "options": [
      "Configure -XX:+HeapDumpOnOutOfMemoryError, capture a production heap dump, and analyze object retention paths in Eclipse Memory Analyzer (MAT)",
      "Keep doubling the RAM allocation on the Kubernetes node indefinitely",
      "Disable garbage collection completely",
      "Write a cron job to restart the application every 3 hours"
    ],
    "correctIndex": 0,
    "explanation": "A continuous memory ramp indicates an unbounded memory leak (e.g., static collections, unclosed listeners). Analyzing a heap dump pinpoints the exact object holding memory.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-7",
    "scenarioContext": "A distributed system experiences sudden clock drift between Server 1 and Server 2 of 450 milliseconds, causing cryptographic JWT token verification and database timestamp ordering to fail.",
    "question": "Which infrastructure protocol and practice must be enforced across the cluster?",
    "options": [
      "Configure NTP (Network Time Protocol) / PTP daemons with synchronized atomic clocks or Google TrueTime / AWS Time Sync Service",
      "Manually set the clock via SSH every morning",
      "Remove all timestamps from JWT tokens",
      "Use local client phone time as the source of truth"
    ],
    "correctIndex": 0,
    "explanation": "Distributed systems rely on Network Time Protocol (NTP) or hardware atomic clocks (like TrueTime) to bound clock skew; otherwise causality and consensus protocols break.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-8",
    "scenarioContext": "A critical third-party SMS verification provider goes down globally. Your user signup flow is completely halted because the SMS sending step is synchronous.",
    "question": "How should the signup architecture be refactored to withstand future third-party outages?",
    "options": [
      "Make SMS sending asynchronous via a durable message queue (Kafka/RabbitMQ) with automatic retries and a secondary fallback SMS vendor integration",
      "Disable user signup permanently",
      "Block all international phone numbers",
      "Store plain text passwords in URL parameters"
    ],
    "correctIndex": 0,
    "explanation": "Decoupling third-party side-effects into asynchronous queues with multi-vendor fallbacks (e.g. Twilio + AWS SNS) ensures core user flows remain resilient during vendor outages.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-9",
    "scenarioContext": "You receive a PagerDuty alert at 3:00 AM stating that CPU utilization on an API pod is 100%. Running 'top' shows high CPU, but memory and disk are normal.",
    "question": "Which Linux / JVM diagnostic tool will show you exactly which thread and line of code is spinning in a busy loop?",
    "options": [
      "Generate a thread dump using 'jstack <pid>' or profiling with 'perf / async-profiler' and correlate thread CPU time via 'top -H -p <pid>'",
      "cat /etc/passwd",
      "Reboot the computer immediately",
      "ping 8.8.8.8"
    ],
    "correctIndex": 0,
    "explanation": "top -H displays per-thread CPU consumption (TID). Converting the top CPU thread ID to hexadecimal matches the 'nid' in a thread dump (jstack), pinpointing the exact spinning line of code.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-10",
    "scenarioContext": "A distributed Denial of Service (DDoS) attack begins hammering your public login endpoint with 150,000 requests per second from a botnet of infected smart home devices.",
    "question": "What is the first line of defense to absorb and filter this volumetric attack before it reaches your backend servers?",
    "options": [
      "Scale up your Spring Boot application",
      "Enable Cloudflare / AWS Shield Web Application Firewall (WAF) with rate limiting, IP reputation filtering, and managed challenge (CAPTCHA) rules at the CDN edge",
      "Delete the login endpoint",
      "Turn off HTTPS"
    ],
    "correctIndex": 1,
    "explanation": "Edge networks (Cloudflare, CloudFront, Akamai) have multi-terabit capacity to absorb and scrub DDoS attacks with edge rate limiting and challenge verification before packets reach origin servers.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-11",
    "scenarioContext": "A database connection pool of size 50 is exhausted. New incoming HTTP requests hang for 30 seconds before failing with 'ConnectionPoolTimeoutException'. Upon inspecting thread dumps, you find all 50 threads are stuck waiting on an HTTP REST call to an external tax calculation service while holding open database transactions.",
    "question": "What architectural violation occurred and how should it be corrected?",
    "options": [
      "Increase the pool to 50,000 connections",
      "Transactions should never hold database connections while performing external network I/O; fetch tax data first or make external calls outside the transactional boundary",
      "Remove database transactions entirely",
      "Turn off database logging"
    ],
    "correctIndex": 1,
    "explanation": "Holding database transactions open during external network I/O is a cardinal sin: external latency directly monopolizes database connections, starving the entire application pool.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-12",
    "scenarioContext": "Your team is deploying an urgent security patch to a stateless microservice running behind an Application Load Balancer with zero downtime allowed.",
    "question": "Which deployment strategy ensures that traffic transitions seamlessly from old pods to new pods without dropping active requests?",
    "options": [
      "Big Bang deployment (terminate all old pods at once)",
      "Rolling Deployment (or Blue-Green) with pre-stop lifecycle hooks, graceful shutdown SIGTERM handling, and readiness health probes",
      "Copying binaries via FTP directly onto running servers",
      "Emailing the code to customers"
    ],
    "correctIndex": 1,
    "explanation": "Kubernetes rolling updates with readiness probes route traffic only to fully warmed-up pods while allowing old pods a 30-second graceful termination window to finish in-flight requests.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-13",
    "scenarioContext": "A sudden disk space spike causes an EC2 instance to hit 100% disk usage, causing writes to freeze and logs to stop updating.",
    "question": "Which command in Linux allows you to find which directory or file is consuming the largest disk space?",
    "options": [
      "du -sh /* | sort -h",
      "ls -l",
      "uname -a",
      "whoami"
    ],
    "correctIndex": 0,
    "explanation": "'du -sh /* | sort -h' summarizes disk usage per root directory and sorts in human-readable ascending order, allowing rapid discovery of runaway log files.",
    "roleContext": "Fresher / SDE-1",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-14",
    "scenarioContext": "During a major promotion, 10,000 concurrent users attempt to purchase the exact same limited-stock item (only 1 unit available). The database records negative stock (-8 items).",
    "question": "What caused this race condition and how is it prevented in production SQL?",
    "options": [
      "A hardware glitch; solved by rebooting",
      "Non-atomic read-modify-write cycle; prevented using Atomic SQL updates ('UPDATE inventory SET stock = stock - 1 WHERE item_id = 1 AND stock > 0;') or pessimistic locking ('SELECT FOR UPDATE')",
      "Using an odd number of database replicas",
      "The table had too many columns"
    ],
    "correctIndex": 1,
    "explanation": "Checking stock in one query and updating in another causes classic lost-updates under concurrency. An atomic single-statement update with 'WHERE stock > 0' leverages row-level locks natively.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-15",
    "scenarioContext": "A critical microservice starts throwing 'SocketTimeoutException: Read timed out' when querying a cache server.",
    "question": "What is the most effective way to prevent this cache timeout from bringing down the entire user-facing service?",
    "options": [
      "Configure fallback to the primary database with circuit breaker, tight read timeouts (e.g. 50ms), and asynchronous background re-population",
      "Increase cache timeout to 10 minutes",
      "Never use caches in production",
      "Crash the application whenever cache misses occur"
    ],
    "correctIndex": 0,
    "explanation": "Cache should always be an optimization, never a single point of failure. Bounded timeouts (50ms) and graceful fallback to DB ensure system survival during cache degradation.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-16",
    "scenarioContext": "An engineer receives an alert that SSL/TLS certificates on production domains expire in 48 hours. The original engineer who set up the domain has left the company.",
    "question": "What is the recommended modern enterprise procedure for SSL management?",
    "options": [
      "Wait until certificates expire and then generate self-signed certs",
      "Renew immediately via automated certificate authority (e.g. Let's Encrypt / AWS Certificate Manager) and configure automated DNS validation with auto-renewal alerts 30 days prior",
      "Disable HTTPS and revert to plain HTTP",
      "Change the company domain name"
    ],
    "correctIndex": 1,
    "explanation": "Automated certificate managers (ACM, Certbot) handle automatic rotation at 60 days. Human-managed manual SSL renewals are an operational hazard.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-17",
    "scenarioContext": "A Redis cluster node fails. The application receives 'OOM command not allowed when used memory > 'maxmemory''.",
    "question": "What configuration parameter controls what Redis does when it runs out of allocated memory?",
    "options": [
      "maxmemory-policy (e.g., allkeys-lru, volatile-lru, noeviction)",
      "redis-color-theme",
      "port-number-rotation",
      "sql-mode"
    ],
    "correctIndex": 0,
    "explanation": "When Redis hits maxmemory, its eviction policy dictates behavior: 'allkeys-lru' evicts least recently used keys to accept new writes, while 'noeviction' throws errors.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-18",
    "scenarioContext": "Users in Australia report 800ms latency when loading user profiles, while users in North America experience 45ms latency. The origin server is located in us-east-1.",
    "question": "What is the industry best practice to slash latency for global users?",
    "options": [
      "Tell Australian users to move closer to America",
      "Deploy a global Content Delivery Network (CDN) like Cloudflare / CloudFront for static assets and multi-region read replicas or edge caching for user profile reads",
      "Rewrite the backend in assembly language",
      "Lower the screen resolution of images"
    ],
    "correctIndex": 1,
    "explanation": "Speed-of-light propagation across the Pacific imposes ~200ms round-trip latency physically. Edge caching, CDNs, and multi-region database read-replicas solve geographical latency.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-19",
    "scenarioContext": "A database master node suddenly crashes due to a physical hardware motherboard failure. You have an active read-replica running in another availability zone.",
    "question": "What automated process promotes the replica to the new primary writer and updates application endpoints?",
    "options": [
      "Manual database export via CSV",
      "Automated High Availability Failover (e.g. AWS RDS Multi-AZ failover, Patroni / Orchestrator for Postgres/MySQL) using DNS CNAME or virtual IP swapping",
      "Rebuilding the database from scratch",
      "Asking users to wait 3 days"
    ],
    "correctIndex": 1,
    "explanation": "Multi-AZ failover detects primary heart-beat loss, promotes the synchronous standby replica to writer in under 60 seconds, and flips the database DNS endpoint automatically.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-20",
    "scenarioContext": "Your team needs to run database migrations on a table containing 100 million rows in production to add a new column and index without locking writes for hours.",
    "question": "What tool or strategy prevents table-locking downtime during large schema changes in MySQL or PostgreSQL?",
    "options": [
      "Run 'ALTER TABLE users ADD COLUMN age INT;' directly in peak hours",
      "Use an Online Schema Change tool (e.g. gh-ost, pt-online-schema-change) or PostgreSQL 'ADD COLUMN ... NULL' and 'CREATE INDEX CONCURRENTLY'",
      "Export the database to Excel and re-import",
      "Drop the table and recreate it"
    ],
    "correctIndex": 1,
    "explanation": "Standard ALTER TABLE locks writes on huge tables. Modern tools (gh-ost) create a ghost table, copy rows in chunks, stream binlog delta events, and perform an atomic cutover with zero downtime.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Production Incident Management"
  },
  {
    "id": "ir-sc-21",
    "scenarioContext": "Two concurrent transactions execute: Transaction A updates User 1 then User 2. Transaction B simultaneously updates User 2 then User 1. Both freeze and MySQL logs 'Deadlock found when trying to get lock; try restarting transaction'.",
    "question": "What is the definitive engineering practice to permanently eliminate lock-order deadlocks?",
    "options": [
      "Enforce a deterministic, consistent global acquisition order across all transactions (e.g. Always lock user IDs in ascending numerical order: min(id1, id2) then max(id1, id2))",
      "Disable all transactions in the codebase",
      "Set database timeout to 0 seconds",
      "Use MongoDB instead"
    ],
    "correctIndex": 0,
    "explanation": "Deadlocks require circular wait. If all transactions always acquire resources in the exact same sorted global order (e.g., ascending ID order), circular wait becomes mathematically impossible.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-22",
    "scenarioContext": "A database query 'SELECT * FROM orders WHERE customer_id = 94812 ORDER BY created_at DESC;' takes 4,500ms on a table of 20 million rows. EXPLAIN shows 'type: ALL, rows: 19800000, Using filesort'.",
    "question": "What index should be created to optimize this query from 4.5s down to under 5ms?",
    "options": [
      "Single-column index on 'status'",
      "Composite (Compound) B-Tree Index on (customer_id, created_at DESC)",
      "Hash index on 'id'",
      "Full-text index on 'customer_id'"
    ],
    "correctIndex": 1,
    "explanation": "A composite index on (customer_id, created_at DESC) allows the database to instantly seek matching customer rows in the B-Tree and read them in pre-sorted order, eliminating both table scans and filesort.",
    "roleContext": "Fresher / SDE-1",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-23",
    "scenarioContext": "A query uses 'WHERE UPPER(email) = 'STUDENT@SPSU.EDU.IN''. Despite having a standard B-Tree index on the 'email' column, the database performs a full table scan.",
    "question": "Why did the database ignore the index?",
    "options": [
      "The email string is too long",
      "Applying a function or computation like UPPER() or DATE() to an indexed column invalidates direct B-Tree index lookup; resolved via Function-Based Index or storing normalized lowercase strings",
      "The database was out of memory",
      "B-Tree indexes cannot index strings"
    ],
    "correctIndex": 1,
    "explanation": "Wrapping indexed columns in functions prevents the optimizer from performing binary tree search on the raw values. Best practice is to store normalized lowercase values or create a functional index.",
    "roleContext": "Fresher / SDE-1",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-24",
    "scenarioContext": "Your financial accounting ledger database must guarantee that an account balance can never drop below zero, even under massive concurrent withdrawal attempts.",
    "question": "Which database constraint is the ultimate guarantee against negative balances?",
    "options": [
      "A JavaScript 'if (balance > 0)' check on the frontend",
      "A database CHECK constraint ('CHECK (balance >= 0)') enforced at the schema engine level",
      "A console.log warning",
      "Trusting users not to withdraw more than their balance"
    ],
    "correctIndex": 1,
    "explanation": "Application-level checks can be bypassed by race conditions or direct DB access. A database CHECK constraint is validated atomically by the storage engine on every write.",
    "roleContext": "Fresher / SDE-1",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-25",
    "scenarioContext": "A social media post has 200,000 comments. Paginating with 'SELECT * FROM comments WHERE post_id = 101 ORDER BY id LIMIT 20 OFFSET 190000;' takes 8 seconds.",
    "question": "Why does OFFSET pagination become exponentially slower on deep pages, and what is the optimal solution?",
    "options": [
      "OFFSET must read and discard all 190,000 prior rows; replaced by Keyset (Seek) Pagination ('WHERE post_id = 101 AND id > last_seen_id ORDER BY id LIMIT 20')",
      "Database hard drives get tired on deep pages",
      "SQL does not support more than 100 rows",
      "The table must be divided into 190,000 separate tables"
    ],
    "correctIndex": 0,
    "explanation": "OFFSET N forces the storage engine to scan and discard N rows. Keyset pagination seek directly to 'id > last_seen_id' via the B-Tree index in O(1) seek time regardless of page depth.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-26",
    "scenarioContext": "Your team is selecting a database for an IoT sensor tracking platform that ingests 500,000 timestamped temperature readings every second and performs time-bucket rollups.",
    "question": "Which database architecture is best suited for this workload?",
    "options": [
      "Standard SQLite file",
      "A specialized Time-Series Database (e.g. TimescaleDB, InfluxDB, ClickHouse) with columnar compression and automatic time-based partitioning",
      "A Microsoft Access database",
      "A Git repository committing CSV files"
    ],
    "correctIndex": 1,
    "explanation": "Time-series databases organize data sequentially on disk by time intervals and compress columnar metrics by up to 90%, enabling massive write ingestion and rapid analytical aggregation.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-27",
    "scenarioContext": "During a code review, you find the following query: 'SELECT * FROM users WHERE status = 'ACTIVE''. The 'status' column has only 2 distinct values ('ACTIVE', 'INACTIVE') evenly split 50/50 across 10 million rows.",
    "question": "Why would an index on the 'status' column be ineffective?",
    "options": [
      "The column has extremely low Cardinality (selectivity); scanning an index that matches 50% of the table is slower than a sequential sequential table scan",
      "The database cannot index varchar columns",
      "Indexes only work on primary keys",
      "The status should be written in lowercase"
    ],
    "correctIndex": 0,
    "explanation": "Low cardinality indexes provide low selectivity. When a predicate matches a large fraction of the table, the query planner prefers a sequential scan over random disk I/O from index lookups.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-28",
    "scenarioContext": "An application needs to store user shopping cart sessions that automatically expire after 30 minutes of inactivity.",
    "question": "What is the most suitable data store and feature for this use case?",
    "options": [
      "PostgreSQL with a cron job deleting old rows",
      "Redis with Key TTL (Time-To-Live) set to 1800 seconds and automatic in-memory key expiration",
      "Writing session strings to local text files",
      "Storing sessions in cookies on external servers"
    ],
    "correctIndex": 1,
    "explanation": "Redis provides native, highly optimized Time-To-Live (TTL) key expiration in memory, eliminating manual cleanup jobs and relational database bloat.",
    "roleContext": "Fresher / SDE-1",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-29",
    "scenarioContext": "Your database has reached 4 Terabytes and write throughput is bottlenecking the single primary server's NVMe drive IOPS.",
    "question": "What database architecture strategy splits the write load across multiple servers?",
    "options": [
      "Read Replicas",
      "Horizontal Database Sharding based on a shard key",
      "Vertical indexing",
      "Increasing client timeout"
    ],
    "correctIndex": 1,
    "explanation": "Read replicas only scale reads. Sharding partitions both data and write traffic across multiple independent database nodes based on a partition hash key.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-30",
    "scenarioContext": "What is the danger of executing 'SELECT *' in production code instead of specifying explicit column names ('SELECT id, name, email')?",
    "question": "What is the danger of executing 'SELECT *' in production code instead of specifying explicit column names ('SELECT id, name, email')?",
    "options": [
      "It consumes unnecessary network bandwidth, prevents the query planner from using Index-Only Covering Scans, and breaks code when new columns are added",
      "It causes the database to delete unselected columns",
      "It is invalid SQL syntax",
      "It runs in reverse order"
    ],
    "correctIndex": 0,
    "explanation": "Explicit column projection allows Covering Indexes (answering queries strictly from index memory without touching disk tables), cuts serialization overhead, and maintains contract stability.",
    "roleContext": "Fresher / SDE-1",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-31",
    "scenarioContext": "A developer wants to store product attributes where each category has completely different fields (e.g. Shoes have 'size', Laptops have 'RAM' and 'CPU').",
    "question": "How should this be modeled in a modern PostgreSQL database?",
    "options": [
      "Create 500 different tables for each product",
      "Use a JSONB column with GIN (Generalized Inverted Index) indexing for flexible, semi-structured attribute querying",
      "Store all attributes in a single comma-separated text string",
      "Do not allow products to have different attributes"
    ],
    "correctIndex": 1,
    "explanation": "PostgreSQL's JSONB data type combines relational ACID reliability with NoSQL document flexibility, and GIN indexes enable fast indexing of nested JSON key-value pairs.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-32",
    "scenarioContext": "In a distributed microservice architecture, Service A updates user records and Service B sends welcome emails. How do you guarantee the email is sent if and only if the database write succeeds?",
    "question": "In a distributed microservice architecture, Service A updates user records and Service B sends welcome emails. How do you guarantee the email is sent if and only if the database write succeeds?",
    "options": [
      "Call the email service in a Java try block and hope it succeeds",
      "Transactional Outbox Pattern: Save the outgoing message event into an 'outbox' table in the SAME local database transaction, and have a reliable publisher (e.g. Debezium) stream it to Kafka",
      "Send the email before updating the database",
      "Never send emails in microservices"
    ],
    "correctIndex": 1,
    "explanation": "The Transactional Outbox Pattern solves dual-write failure modes by guaranteeing atomic persistence of state and event in the same local ACID transaction.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-33",
    "scenarioContext": "Your team discovers that a database index has grown to 80GB and is heavily fragmented after months of high-volume updates and deletions.",
    "question": "What maintenance command rebuilds and defragments the B-Tree index in PostgreSQL or MySQL?",
    "options": [
      "REINDEX TABLE / OPTIMIZE TABLE",
      "DELETE INDEX",
      "SHUTDOWN DATABASE",
      "FLUSH PRIVILEGES"
    ],
    "correctIndex": 0,
    "explanation": "REINDEX (Postgres) or OPTIMIZE TABLE (MySQL) rebuilds the physical B-Tree index structure from scratch, freeing dead space and restoring contiguous index pages.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-34",
    "scenarioContext": "A query planner chooses a slow sequential scan instead of using an existing index because database statistics are severely outdated after a bulk insert of 5 million records.",
    "question": "Which maintenance command forces the database engine to refresh its distribution statistics?",
    "options": [
      "ANALYZE table_name;",
      "SELECT * FROM table_name;",
      "DROP TABLE table_name;",
      "REBOOT;"
    ],
    "correctIndex": 0,
    "explanation": "ANALYZE gathers statistics about the distribution of values in table columns, enabling the cost-based query optimizer (CBO) to make accurate cardinality and index seek estimates.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-35",
    "scenarioContext": "What is the difference between Optimistic Locking and Pessimistic Locking?",
    "question": "What is the difference between Optimistic Locking and Pessimistic Locking?",
    "options": [
      "Optimistic locking uses a version number/timestamp column and checks it on update; Pessimistic locking acquires exclusive row locks ('SELECT FOR UPDATE') during the read",
      "Optimistic locking only works in memory",
      "Pessimistic locking prevents any other user from reading the table forever",
      "There is no difference"
    ],
    "correctIndex": 0,
    "explanation": "Optimistic locking is ideal for low-conflict web workloads (checks version on write). Pessimistic locking holds database-level row locks, preferred in high-contention financial transfers.",
    "roleContext": "universal",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-36",
    "scenarioContext": "You are designing a notification inbox where unread notifications must be fetched in milliseconds. Write throughput is 20,000 notifications/sec.",
    "question": "Which data structure in Redis provides ordered, time-stamped retrieval with O(log N) inserts and O(K) range queries?",
    "options": [
      "Redis Strings",
      "Redis Sorted Sets (ZSET) using epoch timestamp as score",
      "Redis Bitmaps",
      "Redis Pub/Sub without persistence"
    ],
    "correctIndex": 1,
    "explanation": "Redis Sorted Sets (ZSET) order elements by numerical score (timestamp), allowing O(log N) insertion and instant ZREVRANGEBYSCORE pagination of the newest notifications.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-37",
    "scenarioContext": "A multi-tenant SaaS database hosts 5,000 enterprise clients. Management wants to ensure that under no circumstances can Company A's queries accidentally view Company B's data.",
    "question": "What modern PostgreSQL feature provides row-level security isolation directly in the database engine?",
    "options": [
      "Row-Level Security (RLS) policies enforcing tenant_id = current_setting('app.current_tenant')",
      "Creating 5,000 separate operating systems",
      "Renaming all tables every hour",
      "Writing custom SQL parsers in React"
    ],
    "correctIndex": 0,
    "explanation": "PostgreSQL Row-Level Security (RLS) enforces row filtering at the database kernel level based on the active session role or tenant setting, preventing accidental cross-tenant data leaks.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-38",
    "scenarioContext": "An analytical query calculates total sales per region, but the business analyst also needs to display each individual order's percentage contribution to its regional total in the same row.",
    "question": "Which SQL feature accomplishes this without requiring separate self-joins?",
    "options": [
      "SQL Window Functions with OVER (PARTITION BY region)",
      "Nested while loops in stored procedures",
      "Exporting to CSV and using a calculator",
      "UNION of 50 tables"
    ],
    "correctIndex": 0,
    "explanation": "Window functions like 'SUM(amount) OVER (PARTITION BY region)' calculate aggregate sums across partitions without collapsing individual rows, enabling inline percentage computations.",
    "roleContext": "Fresher / SDE-1",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-39",
    "scenarioContext": "Your team is migrating from self-hosted MySQL to AWS Aurora. What is the key architectural innovation of Amazon Aurora compared to traditional MySQL?",
    "question": "Your team is migrating from self-hosted MySQL to AWS Aurora. What is the key architectural innovation of Amazon Aurora compared to traditional MySQL?",
    "options": [
      "It eliminates the query parser",
      "Decoupled compute and storage: a distributed, multi-tenant storage fleet across 3 Availability Zones with 6-way replication and log-structured storage engine",
      "It only supports Python",
      "It does not require passwords"
    ],
    "correctIndex": 1,
    "explanation": "Aurora decouples the SQL compute node from storage. Storage is striped across 6 storage nodes in 3 AZs, offloading logging and replication to the storage layer for 5x MySQL throughput.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-40",
    "scenarioContext": "What is the purpose of database Connection Pooling (e.g. HikariCP) in enterprise applications?",
    "question": "What is the purpose of database Connection Pooling (e.g. HikariCP) in enterprise applications?",
    "options": [
      "To encrypt all database tables",
      "To maintain a pool of established, pre-warmed TCP/SSL database connections, eliminating the high cost of TCP handshakes and authentication on every HTTP request",
      "To pool money for server maintenance",
      "To merge multiple databases into one"
    ],
    "correctIndex": 1,
    "explanation": "Establishing a new TLS database connection takes 50–100ms. Connection poolers (HikariCP) maintain re-usable connections, cutting query dispatch overhead to sub-millisecond speeds.",
    "roleContext": "Fresher / SDE-1",
    "category": "Database Engineering"
  },
  {
    "id": "ir-sc-41",
    "scenarioContext": "You are designing a Ride-Sharing dispatch system like Uber. Drivers report their GPS latitude/longitude every 4 seconds. The system needs to find the 5 closest drivers to a requesting rider in <50ms.",
    "question": "Which spatial indexing technique is industry-standard for proximity geofencing?",
    "options": [
      "Comparing rider distance against all 2 million drivers sequentially in O(N)",
      "Spatial Hexagonal Hierarchical Indexing (e.g. Uber H3 / Google S2 / Geohash) or R-Tree indexing",
      "Sorting drivers by name alphabetically",
      "Storing coordinates in text files on S3"
    ],
    "correctIndex": 1,
    "explanation": "Uber H3 and S2 project the Earth's sphere into hierarchical hexagonal or quad-tree cells. Finding neighboring drivers reduces to finding drivers in matching hex cell buckets in O(1) time.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-42",
    "scenarioContext": "Your company is migrating a large 10-year-old Monolith into Microservices. The CTO wants to rewrite the entire system from scratch over 2 years.",
    "question": "Why is the 'Big Bang Rewrite' widely considered an anti-pattern, and what proven alternative should you recommend?",
    "options": [
      "Big Bang rewrites take too much paper",
      "The Big Bang rewrite has a >80% historical failure rate due to scope creep and moving target specifications; recommend the **Strangler Fig Pattern** to incrementally carve out microservices around the monolith",
      "Monoliths can never be broken down",
      "Microservices are illegal in financial tech"
    ],
    "correctIndex": 1,
    "explanation": "The Strangler Fig pattern places an API Gateway in front of the monolith, routing newly refactored endpoints to microservices incrementally while leaving legacy flows intact until the old core is retired.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-43",
    "scenarioContext": "In a microservices ecosystem, an order placement flow involves: Order Service, Payment Service, Inventory Service, and Shipping Service. A distributed transaction across all four fails at the Shipping step.",
    "question": "Which distributed pattern coordinates compensating transactions to roll back the payment and inventory reservation gracefully?",
    "options": [
      "Two-Phase Commit (2PC) with global locks",
      "Saga Pattern (Choreography or Orchestration-based) executing compensating transactions in reverse order",
      "Ignore the failure and charge the customer anyway",
      "Restart all four microservices"
    ],
    "correctIndex": 1,
    "explanation": "Two-Phase Commit is slow and fragile in microservices. The Saga pattern breaks the flow into local transactions: if step 4 fails, the Saga orchestrator invokes compensating rollback APIs on steps 3, 2, and 1.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-44",
    "scenarioContext": "You are designing a real-time Chat application like WhatsApp or Discord. Which protocol provides full-duplex, low-latency, bidirectional communication over a single long-lived TCP connection?",
    "question": "You are designing a real-time Chat application like WhatsApp or Discord. Which protocol provides full-duplex, low-latency, bidirectional communication over a single long-lived TCP connection?",
    "options": [
      "HTTP/1.0 Polling every 5 seconds",
      "WebSockets (RFC 6455)",
      "FTP",
      "DNS"
    ],
    "correctIndex": 1,
    "explanation": "WebSockets upgrade an initial HTTP handshake into a persistent, bidirectional full-duplex TCP stream with 2-byte frame overhead, enabling sub-10ms real-time message delivery.",
    "roleContext": "Fresher / SDE-1",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-45",
    "scenarioContext": "An e-commerce flash sale expects 100,000 purchases per minute, but the backend inventory database can only handle 2,000 write transactions per second safely.",
    "question": "How should the architecture buffer and smooth out this spike?",
    "options": [
      "Reject 98% of users immediately",
      "Introduce an event-driven Message Queue (e.g. Apache Kafka or RabbitMQ) as a buffer for incoming orders, allowing backend consumer workers to process writes at a sustainable steady rate (Rate Leveling)",
      "Remove database passwords",
      "Disable the checkout button during sales"
    ],
    "correctIndex": 1,
    "explanation": "Message queues act as shock absorbers (traffic leveling). They accept massive burst ingestion without dropping requests, decoupling producer spikes from consumer processing limits.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-46",
    "scenarioContext": "You are designing a distributed Rate Limiter for an enterprise API with 50 server instances behind a load balancer. Each user is limited to 100 requests per minute.",
    "question": "Why is storing rate limit counters in local server RAM insufficient, and what distributed solution should be used?",
    "options": [
      "Local RAM counters do not share state across the 50 instances (a user could make 5,000 requests); use a centralized Redis cluster running Atomic Token Bucket / Sliding Window Log scripts via Lua",
      "Local RAM is too fast for rate limiting",
      "Rate limiters must be written in hardware only",
      "Users will voluntarily stop making requests"
    ],
    "correctIndex": 0,
    "explanation": "Load balancers distribute requests randomly across instances. Storing counters in Redis ensures a single source of truth across all 50 servers, using atomic Lua scripts to prevent race conditions.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-47",
    "scenarioContext": "What is the 'Cache Stampede' (or Thundering Herd) problem, and how is it prevented when a popular cached key expires?",
    "question": "What is the 'Cache Stampede' (or Thundering Herd) problem, and how is it prevented when a popular cached key expires?",
    "options": [
      "When servers physically overheat in a data center",
      "When a high-traffic cached key expires, thousands of concurrent requests miss simultaneously and hammer the primary database; prevented by Mutex Locking, Early Refresh, or XFetch probabilistic early expiration",
      "A memory leak in Redis",
      "When too many developers edit code at once"
    ],
    "correctIndex": 1,
    "explanation": "If an item getting 10,000 QPS expires, all 10,000 requests hit the database simultaneously. Using a distributed lock (Redlock) ensures only ONE worker queries DB to repopulate cache while others wait.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-48",
    "scenarioContext": "You need to design a Video Streaming platform like YouTube or Netflix. How should video files be served efficiently to millions of global users on varying internet connection speeds?",
    "question": "You need to design a Video Streaming platform like YouTube or Netflix. How should video files be served efficiently to millions of global users on varying internet connection speeds?",
    "options": [
      "Serve a single 4K MP4 file directly from an EC2 instance",
      "Chunk videos into small segments (e.g. 4 seconds) at multiple bitrates (1080p, 720p, 480p) using Adaptive Bitrate Streaming (HLS / DASH) distributed across edge CDNs",
      "Email the video to users as an attachment",
      "Stream raw uncompressed AVI files over UDP"
    ],
    "correctIndex": 1,
    "explanation": "Adaptive Bitrate Streaming (HLS/DASH) allows video players to dynamically switch resolution based on real-time bandwidth, while edge CDNs cache video chunks close to users.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-49",
    "scenarioContext": "In an event-driven architecture with Apache Kafka, what is the role of Consumer Groups?",
    "question": "In an event-driven architecture with Apache Kafka, what is the role of Consumer Groups?",
    "options": [
      "To allow multiple consumer instances to divide and parallelize message processing across Kafka topic partitions, scaling throughput horizontally",
      "To group consumers by age and location",
      "To delete old messages",
      "To format JSON messages"
    ],
    "correctIndex": 0,
    "explanation": "Each partition in a Kafka topic is consumed by exactly one consumer within a Consumer Group, enabling linear horizontal scaling of processing throughput as partition count expands.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-50",
    "scenarioContext": "What is the difference between Idempotent and Non-Idempotent operations in REST APIs?",
    "question": "What is the difference between Idempotent and Non-Idempotent operations in REST APIs?",
    "options": [
      "Idempotent operations produce the exact same resource state on the server whether executed once or 100 times (e.g. GET, PUT, DELETE); Non-Idempotent operations create new side effects on each call (e.g. POST)",
      "Idempotent operations cannot use passwords",
      "Non-Idempotent operations only work on iPhones",
      "There is no difference in HTTP specifications"
    ],
    "correctIndex": 0,
    "explanation": "Idempotency guarantees safety under network retries. If a client loses connection after sending a PUT /orders/123, repeating the request is safe. Repeating a POST /orders could duplicate credit card charges.",
    "roleContext": "Fresher / SDE-1",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-51",
    "scenarioContext": "How does an Idempotency Key header (e.g. 'Idempotency-Key: uuid-v4') protect payment processing APIs from duplicate charges when network timeouts occur?",
    "question": "How does an Idempotency Key header (e.g. 'Idempotency-Key: uuid-v4') protect payment processing APIs from duplicate charges when network timeouts occur?",
    "options": [
      "It encrypts the credit card number",
      "The payment server stores the unique UUID key in Redis/DB; if a duplicate request arrives with the same key, the server returns the cached prior response instead of re-charging the card",
      "It doubles the transaction fee",
      "It automatically cancels the purchase"
    ],
    "correctIndex": 1,
    "explanation": "Enterprise payment APIs (Stripe, Razorpay) mandate client-generated idempotency keys. If a timeout occurs, the client safely retries; the server recognizes the key and returns the original transaction result.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-52",
    "scenarioContext": "Your microservices application has 40 independent services. Tracking a failed user request across 6 different downstream service hops is nearly impossible with standard text logs.",
    "question": "What observability standard enables tracking a request across distributed services?",
    "options": [
      "Distributed Tracing using a unique Correlation ID / Trace ID injected into HTTP headers (e.g. OpenTelemetry, Jaeger, Zipkin)",
      "Printing logs to a local paper printer",
      "Increasing log levels to DEBUG on all servers",
      "Disabling all microservices"
    ],
    "correctIndex": 0,
    "explanation": "Distributed Tracing injects a unique Trace ID at the API gateway and propagates it across all downstream RPCs and queues, linking all spans into a unified visualization in Jaeger or Datadog.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-53",
    "scenarioContext": "What is the difference between Horizontal Scaling (Scale-Out) and Vertical Scaling (Scale-Up)?",
    "question": "What is the difference between Horizontal Scaling (Scale-Out) and Vertical Scaling (Scale-Up)?",
    "options": [
      "Horizontal scaling adds more machine instances to a cluster; Vertical scaling adds more CPU, RAM, or disk to an existing single machine",
      "Horizontal scaling is only for CSS layouts",
      "Vertical scaling has no hardware limits",
      "Horizontal scaling always costs 10x more"
    ],
    "correctIndex": 0,
    "explanation": "Vertical scaling eventually hits physical hardware and cost ceilings. Horizontal scaling scales elastically across commodity cloud nodes without practical upper limits.",
    "roleContext": "Fresher / SDE-1",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-54",
    "scenarioContext": "You are designing a distributed file storage service like Google Drive or Dropbox. How can you minimize storage costs when millions of users upload identical files (e.g., popular movies or memes)?",
    "question": "You are designing a distributed file storage service like Google Drive or Dropbox. How can you minimize storage costs when millions of users upload identical files (e.g., popular movies or memes)?",
    "options": [
      "Delete all uploaded files after 7 days",
      "Block-level Deduplication: compute cryptographic hashes (SHA-256) of file chunks; if a chunk hash already exists in storage, simply reference the existing chunk pointer",
      "Compress files using lossy JPEG compression",
      "Charge users $100 per file"
    ],
    "correctIndex": 1,
    "explanation": "Block-level deduplication hashes chunks into content-addressable storage (CAS). Identical chunks across different users are stored only once, saving petabytes of expensive cloud disk space.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-55",
    "scenarioContext": "What is the purpose of a Reverse Proxy (e.g. NGINX, HAProxy, Envoy) in front of application backends?",
    "question": "What is the purpose of a Reverse Proxy (e.g. NGINX, HAProxy, Envoy) in front of application backends?",
    "options": [
      "To reverse the order of letters in HTTP responses",
      "To provide load balancing, SSL/TLS termination, static content caching, IP filtering, and obfuscation of internal server network topology",
      "To write Python code automatically",
      "To act as a physical database"
    ],
    "correctIndex": 1,
    "explanation": "A reverse proxy sits between the internet and origin servers, terminating SSL, distributing load across backend pools, and shielding origin IPs from direct external exposure.",
    "roleContext": "Fresher / SDE-1",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-56",
    "scenarioContext": "When designing a distributed key-value store, what does the PACELC theorem state as an extension to CAP?",
    "question": "When designing a distributed key-value store, what does the PACELC theorem state as an extension to CAP?",
    "options": [
      "If there is a Partition (P), trade off Availability (A) and Consistency (C); Else (E), trade off Latency (L) and Consistency (C)",
      "Every packet must be encoded in Latin characters",
      "Databases should always prioritize cost over speed",
      "Passwords must be at least 12 characters"
    ],
    "correctIndex": 0,
    "explanation": "PACELC extends CAP: even during normal operation without network partitions (Else), a distributed database must still choose between low latency (L) and strong consistency (C).",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-57",
    "scenarioContext": "In an e-commerce microservices platform, the recommendation engine requires heavy machine learning model inference that takes 400ms per request.",
    "question": "How should the homepage render quickly without blocking on the slow recommendation engine?",
    "options": [
      "Delay loading the entire homepage until recommendations finish",
      "Server-Side Rendering (SSR) shell with Client-Side lazy loading or Edge Streaming (React Server Components / Suspense), rendering the core page in 30ms and populating recommendations asynchronously",
      "Delete the recommendation engine",
      "Block users with slow internet"
    ],
    "correctIndex": 1,
    "explanation": "Asynchronous lazy loading and streaming render the critical above-the-fold UI instantly, streaming or fetching slow personalized components in the background.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-58",
    "scenarioContext": "Why is JWT (JSON Web Token) widely favored for stateless authentication in microservices, and what is its primary security drawback?",
    "question": "Why is JWT (JSON Web Token) widely favored for stateless authentication in microservices, and what is its primary security drawback?",
    "options": [
      "JWT is stateless and cryptographically verified by any service without DB lookups; however, revoking a compromised JWT before its expiration requires maintaining a distributed blacklist/revocation store",
      "JWT cannot be decrypted by anyone",
      "JWT only works on Google Chrome",
      "JWT has zero drawbacks and is 100% secure forever"
    ],
    "correctIndex": 0,
    "explanation": "JWTs eliminate central session database lookups because the signature proves authenticity. However, immediate invalidation (logout/token breach) requires an external token blocklist in Redis.",
    "roleContext": "universal",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-59",
    "scenarioContext": "You are designing an Uber-like ride booking confirmation system. The system needs to guarantee that a driver cannot accept two conflicting rides simultaneously.",
    "question": "Which concurrency control mechanism guarantees that only the first driver to tap 'Accept' secures the booking?",
    "options": [
      "Optimistic concurrency control with version checking on the ride record or a distributed lock with TTL in Redis (Redlock)",
      "First-Come First-Served in frontend JavaScript",
      "Relying on driver honesty",
      "Allowing both drivers to arrive and fight"
    ],
    "correctIndex": 0,
    "explanation": "Distributed locking (via Redis SETNX with TTL) or atomic DB version matching guarantees mutual exclusion across concurrent booking attempts across distributed nodes.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-60",
    "scenarioContext": "What is the difference between Pull-based (Polling) and Push-based (Webhooks / SSE / WebSockets) architectural patterns?",
    "question": "What is the difference between Pull-based (Polling) and Push-based (Webhooks / SSE / WebSockets) architectural patterns?",
    "options": [
      "Pull requires clients to periodically ask the server for updates; Push allows the server to transmit data to clients immediately as events occur, reducing latency and unnecessary bandwidth",
      "Pull is only for Git repositories",
      "Push is 100x more expensive than Pull",
      "There is no difference in network traffic"
    ],
    "correctIndex": 0,
    "explanation": "Polling wastes bandwidth with thousands of empty 304/200 checks. Push architectures notify clients instantaneously upon event generation with minimal idle connection overhead.",
    "roleContext": "Fresher / SDE-1",
    "category": "System Architecture"
  },
  {
    "id": "ir-sc-61",
    "scenarioContext": "During a pull request code review, you notice a teammate has written a 900-line method with 8 levels of nested if-else statements containing duplicate business logic.",
    "question": "What code smell is present and what refactoring strategy should you suggest?",
    "options": [
      "Long Method & Cyclomatic Complexity smell; recommend Extract Method refactoring, Guard Clauses to return early, and Strategy Pattern / Polymorphism to replace nested conditionals",
      "Tell the author that 900-line methods are impressive and approve the PR",
      "Delete the repository",
      "Rename all variables to single letters to make the file shorter"
    ],
    "correctIndex": 0,
    "explanation": "High cyclomatic complexity makes code untestable and error-prone. Extracting methods, using guard clauses to flatten nesting, and leveraging strategy patterns restores readability and testability.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-62",
    "scenarioContext": "A developer submits code that catches generic 'Exception e' silently: 'try { doSomething(); } catch (Exception e) { /* do nothing */ }'.",
    "question": "Why is this practice considered a critical defect in production code?",
    "options": [
      "It hides real failures, swallows NullPointerExceptions and OutOfMemoryErrors, makes production debugging impossible, and leads to corrupted system states",
      "It makes the code compile too fast",
      "Java does not allow try-catch blocks",
      "It uses too much memory"
    ],
    "correctIndex": 0,
    "explanation": "Swallowing exceptions silently (Pokemon exception handling: 'gotta catch em all') blinds monitoring systems to production crashes and masks catastrophic state corruption.",
    "roleContext": "Fresher / SDE-1",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-63",
    "scenarioContext": "In a code review for a payment microservice, you spot hardcoded AWS credentials and database passwords in a configuration file checked into Git.",
    "question": "What is the immediate protocol to rectify this critical security vulnerability?",
    "options": [
      "Commit another file with 'password = null' and ignore it",
      "Immediately revoke and rotate the exposed credentials in AWS/DB, remove the secret from Git history (using git filter-repo or BFG), and configure Secret Managers (e.g. AWS Secrets Manager / HashiCorp Vault) via environment variables",
      "Make the GitHub repository private and pretend it never happened",
      "Delete the AWS account"
    ],
    "correctIndex": 1,
    "explanation": "Once a secret is committed to Git, it is compromised permanently in commit history. The only safe remediation is immediate credential revocation, rotation, and external secret injection.",
    "roleContext": "universal",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-64",
    "scenarioContext": "A teammate submits code where an entity class directly accesses and queries the SQL database inside its getters and setters.",
    "question": "Which architectural layer separation pattern should you recommend?",
    "options": [
      "Repository / DAO (Data Access Object) Pattern to decouple domain business entities from persistence infrastructure",
      "Keep database queries inside getters for convenience",
      "Write all SQL queries directly inside HTML templates",
      "Delete the entity class"
    ],
    "correctIndex": 0,
    "explanation": "Mixing domain models with persistence violates Separation of Concerns. The Repository pattern encapsulates data access, enabling mocking, unit testing, and database independence.",
    "roleContext": "Fresher / SDE-1",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-65",
    "scenarioContext": "During code review, you see a loop executing a separate SQL query inside every iteration: 'for (User u : users) { orders = db.query(\"SELECT * FROM orders WHERE user_id = \" + u.id); }'.",
    "question": "What classic performance anti-pattern is this and how must it be refactored?",
    "options": [
      "N+1 Query Anti-Pattern; refactor to a single batch query using 'SELECT * FROM orders WHERE user_id IN (...)' or a JOIN with GROUP BY",
      "Infinite Loop Bug; add a break statement",
      "SQL Injection only; add quotation marks",
      "It is optimal and should not be changed"
    ],
    "correctIndex": 0,
    "explanation": "Executing queries inside loops generates N network roundtrips to the database. Replacing it with an IN clause or JOIN executes in a single roundtrip.",
    "roleContext": "Fresher / SDE-1",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-66",
    "scenarioContext": "A pull request introduces a breaking change to a public REST API endpoint by renaming the field 'user_id' to 'accountId'.",
    "question": "How should API evolution be managed without breaking thousands of third-party mobile clients running older app versions?",
    "options": [
      "Deploy the change immediately and let old apps crash",
      "Implement API Versioning (e.g. /v2/users or Accept header versioning) while deprecating v1 gracefully with backward compatibility and migration timelines",
      "Call every user and tell them to update their phone",
      "Never rename fields under any circumstances"
    ],
    "correctIndex": 1,
    "explanation": "Public APIs are immutable contracts. Breaking field changes mandate new API versions (/v2/) or supporting both fields concurrently until older clients migrate.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-67",
    "scenarioContext": "A developer creates a mutable class that will be shared across multiple concurrent threads in a Spring singleton bean, storing user-specific data in instance variables.",
    "question": "What critical bug will manifest under concurrent production load?",
    "options": [
      "Race conditions and cross-user data bleeding (Thread A reads User B's personal data) because singleton beans share a single instance across all request threads",
      "The server will physically catch fire",
      "The database will refuse to start",
      "Compilation error"
    ],
    "correctIndex": 0,
    "explanation": "Spring beans are singletons by default. Storing request-scoped state in singleton instance fields causes cross-thread race conditions where concurrent requests overwrite each other's data.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-68",
    "scenarioContext": "In a Java / C++ codebase, you discover that a developer is creating a new database connection and HTTP client instance inside every single incoming controller request.",
    "question": "What resource exhaustion issue will this cause and how should it be refactored?",
    "options": [
      "Socket exhaustion and high connection latency; refactor to re-use a singleton connection pool and HTTP client instance with keep-alive connections",
      "The code will run 10x faster",
      "There is no issue; modern computers have infinite sockets",
      "It automatically cleans up memory"
    ],
    "correctIndex": 0,
    "explanation": "Creating clients per request incurs TLS handshakes and leaves sockets lingering in TIME_WAIT, eventually causing 'java.net.BindException: Address already in use' (ephemeral port exhaustion).",
    "roleContext": "Fresher / SDE-1",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-69",
    "scenarioContext": "A developer wrote 2,000 lines of complex algorithm logic but included zero automated unit or integration tests, stating 'I tested it manually on my laptop and it works'.",
    "question": "As a code reviewer, how do you respond constructively and professionally?",
    "options": [
      "Approve the PR because manual testing is sufficient",
      "Politely withhold approval, explain that automated regression tests are mandatory to safeguard future refactorings, prevent regressions in CI, and request core test coverage before merge",
      "Insult the developer in the PR comments",
      "Merge the code and write tests yourself over the weekend"
    ],
    "correctIndex": 1,
    "explanation": "Automated tests are non-negotiable in professional engineering. Reviewers must uphold quality standards constructively by emphasizing team safety and long-term velocity.",
    "roleContext": "universal",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-70",
    "scenarioContext": "Your team has a legacy codebase with 0% test coverage. Management wants to refactor the core billing logic to support new subscription plans.",
    "question": "What technique allows safe refactoring of legacy code without unit tests?",
    "options": [
      "Characterization (Golden Master) Testing: record existing inputs and outputs to establish a baseline test suite before refactoring internal implementation",
      "Rewrite the entire codebase in Go in one night",
      "Delete the billing module",
      "Deploy directly to production and wait for customer billing complaints"
    ],
    "correctIndex": 0,
    "explanation": "Characterization tests treat legacy code as a black box, recording actual behavior to detect unintended regressions while refactoring internal structures.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-71",
    "scenarioContext": "A developer uses raw string concatenation to construct dynamic SQL queries: 'String query = \"SELECT * FROM users WHERE name = '\" + input + \"'\";'.",
    "question": "What is the severity of this finding in a code review and how must it be fixed?",
    "options": [
      "Trivial styling issue",
      "Critical Security Vulnerability (SQL Injection); must be refactored to use Parameterized Prepared Statements immediately",
      "Moderate performance nitpick",
      "Safe as long as the user inputs letters"
    ],
    "correctIndex": 1,
    "explanation": "String concatenation in SQL queries allows attackers to bypass authentication or drop databases via SQL Injection. Parameterized queries are mandatory.",
    "roleContext": "Fresher / SDE-1",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-72",
    "scenarioContext": "During code review, you find a recursive function without a base case check for negative inputs, causing StackOverflowError when negative values are passed.",
    "question": "What type of testing would have automatically caught this defect prior to code review?",
    "options": [
      "Boundary Value Analysis and Edge-Case Unit Testing",
      "Manual visual inspection only",
      "Load testing on 10,000 servers",
      "CSS styling checks"
    ],
    "correctIndex": 0,
    "explanation": "Boundary Value Analysis explicitly tests domain thresholds (0, -1, MAX_INT, null), immediately surfacing missing guard clauses and base case errors.",
    "roleContext": "Fresher / SDE-1",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-73",
    "scenarioContext": "A pull request contains 85 changed files and 6,000 lines of code across 5 unrelated features.",
    "question": "What feedback should you give to the author regarding PR sizing?",
    "options": [
      "Approve immediately because big PRs look impressive",
      "Politely ask the author to decompose the massive PR into smaller, independent, focused PRs (ideally <300 lines each) to ensure thorough review and low deployment risk",
      "Close the PR and delete the branch without explanation",
      "Merge it directly to production without testing"
    ],
    "correctIndex": 1,
    "explanation": "Massive PRs receive superficial reviews and carry high regression risks. Small, focused PRs (<300 lines) are reviewed faster and reverted easily if defects occur.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-74",
    "scenarioContext": "A utility class contains 25 static methods that perform mathematical calculations. None of the methods maintain internal state.",
    "question": "Should the constructor of this utility class be public or private?",
    "options": [
      "Private constructor to prevent unnecessary instantiation of a stateless utility class",
      "Public constructor with 10 parameters",
      "Constructors are forbidden in static classes",
      "It does not matter"
    ],
    "correctIndex": 0,
    "explanation": "Stateless utility classes (like java.lang.Math) should have a private constructor to prevent callers from instantiating meaningless instances.",
    "roleContext": "Fresher / SDE-1",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-75",
    "scenarioContext": "What is the Boy Scout Rule in software engineering code hygiene?",
    "question": "What is the Boy Scout Rule in software engineering code hygiene?",
    "options": [
      "Always wear a uniform while writing code",
      "Always leave the code cleaner than you found it (e.g. fix a typo, rename a confusing variable, or add a missing test when touching a file)",
      "Never touch code written by someone else",
      "Only code outdoors in nature"
    ],
    "correctIndex": 1,
    "explanation": "The Boy Scout Rule ensures that technical debt is incrementally reduced during normal feature development, preventing software rot.",
    "roleContext": "universal",
    "category": "Code Review & Refactoring"
  },
  {
    "id": "ir-sc-76",
    "scenarioContext": "Two days before sprint completion, the Product Manager requests a 'small quick feature addition' that alters database schemas and touches 4 services.",
    "question": "As the lead engineer, how should you handle this scope creep?",
    "options": [
      "Silently work 48 hours without sleep to deliver both the original sprint and the new feature",
      "Explain the engineering impact transparently: estimate the effort, demonstrate that adding it risks current sprint commitments, and offer trade-offs (e.g. push to next sprint or swap out equal story points)",
      "Yell at the product manager in the hallway",
      "Fake your sick leave to avoid the deadline"
    ],
    "correctIndex": 1,
    "explanation": "Scope creep must be managed with transparent trade-offs. The iron triangle of project management (Scope, Time, Resources) requires swapping commitments rather than cutting quality.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Agile & Project Management"
  },
  {
    "id": "ir-sc-77",
    "scenarioContext": "In sprint planning, an engineer consistently estimates all tasks at 1 story point, but repeatedly fails to finish them on time due to unconsidered edge cases.",
    "question": "How should the Scrum Master and team address this estimation bias?",
    "options": [
      "Publicly humiliate the engineer during standup",
      "Encourage Collaborative Planning Poker: break tasks down into definition-of-done criteria, discuss hidden complexity (tests, migrations, PR review), and align on realistic consensus estimates",
      "Ban the engineer from estimating forever",
      "Eliminate estimations entirely"
    ],
    "correctIndex": 1,
    "explanation": "Underestimating stems from ignoring testing, deployment, and edge cases. Collaborative planning poker surfaces hidden operational dependencies and calibrates team velocity.",
    "roleContext": "universal",
    "category": "Agile & Project Management"
  },
  {
    "id": "ir-sc-78",
    "scenarioContext": "Midway through a two-week sprint, an engineer realizes a critical task has a major technical roadblock and cannot be completed without an external team's API that is delayed by 2 weeks.",
    "question": "When should the engineer surface this blocker?",
    "options": [
      "Wait until the last hour of the sprint review to announce it",
      "Surface the blocker immediately in the next Daily Standup (or message the Tech Lead right away) so the team can unblock, pivot, or adjust sprint commitments early",
      "Keep it secret and blame the other team after the sprint fails",
      "Pretend the task is finished"
    ],
    "correctIndex": 1,
    "explanation": "Fail fast and surface blockers early. Surfacing roadblocks on day 4 allows the team to swap in alternative backlog items and coordinate cross-team dependencies.",
    "roleContext": "Fresher / SDE-1",
    "category": "Agile & Project Management"
  },
  {
    "id": "ir-sc-79",
    "scenarioContext": "What is the 'Definition of Done' (DoD) in Agile software development?",
    "question": "What is the 'Definition of Done' (DoD) in Agile software development?",
    "options": [
      "When the developer types the last line of code on their laptop",
      "An agreed-upon checklist of criteria required before a user story is considered complete (e.g. code reviewed, unit/integration tests passing, documentation updated, deployed to staging, QA verified)",
      "When the sprint deadline clock hits 5:00 PM",
      "When the client pays the invoice"
    ],
    "correctIndex": 1,
    "explanation": "The Definition of Done ensures quality consistency: a feature is not done just because code is written; it must meet testing, review, documentation, and deployment criteria.",
    "roleContext": "Fresher / SDE-1",
    "category": "Agile & Project Management"
  },
  {
    "id": "ir-sc-80",
    "scenarioContext": "During a sprint retrospective, team members complain that PR code reviews are taking 4 to 5 days, stalling development velocity.",
    "question": "What actionable team agreement can resolve this bottleneck?",
    "options": [
      "Stop doing code reviews completely",
      "Establish a Service Level Agreement (SLA) for PR reviews (e.g. initial review within 24 hours), allocate dedicated review time daily, and enforce smaller PR batch sizes (<300 lines)",
      "Only allow the engineering manager to review code",
      "Merge code automatically without human review"
    ],
    "correctIndex": 1,
    "explanation": "PR review SLAs (24h) and smaller PR sizes eliminate review inertia and accelerate pipeline throughput without compromising code quality.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Agile & Project Management"
  },
  {
    "id": "ir-sc-81",
    "scenarioContext": "Your team's historical velocity is 40 story points per sprint. In the next sprint planning, stakeholders pressure the team to commit to 75 points.",
    "question": "How should the Engineering Manager respond?",
    "options": [
      "Accept 75 points and force the team into burnout",
      "Use historical velocity data to show that overcommitting leads to incomplete deliverables and technical debt; commit to 40 points of the highest-priority features and create a stretch goal backlog",
      "Resign on the spot",
      "Reduce story point values by half to manipulate the numbers"
    ],
    "correctIndex": 1,
    "explanation": "Velocity is an empirical measurement, not a negotiation dial. Committing to realistic velocity guarantees predictable, high-quality releases and prevents team burnout.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Agile & Project Management"
  },
  {
    "id": "ir-sc-82",
    "scenarioContext": "What is the difference between an Epic, a User Story, and a Task in Agile Jira boards?",
    "question": "What is the difference between an Epic, a User Story, and a Task in Agile Jira boards?",
    "options": [
      "An Epic is a large body of work spanning multiple sprints; a User Story is a specific end-user deliverable completed within a sprint; a Task is an individual technical step to build the story",
      "An Epic is for managers; User Story is for designers; Task is for testers",
      "They are synonyms and can be used interchangeably",
      "An Epic is a story that has failed"
    ],
    "correctIndex": 0,
    "explanation": "Hierarchy: Epics represent high-level business capabilities broken down into manageable User Stories deliverable in a sprint, which engineers break into concrete technical Tasks.",
    "roleContext": "Fresher / SDE-1",
    "category": "Agile & Project Management"
  },
  {
    "id": "ir-sc-83",
    "scenarioContext": "A developer finishes all their assigned sprint user stories 3 days before the sprint ends.",
    "question": "What is the most professional and collaborative next step?",
    "options": [
      "Browse social media and leave early for the rest of the week",
      "Check in with team members to pair-program on blocked stories, assist with code reviews, write regression tests, or pull the next prioritized item from the sprint backlog with team alignment",
      "Start rewriting the company website without permission",
      "Delete old Git branches"
    ],
    "correctIndex": 1,
    "explanation": "High-performing teams succeed as a collective. Assisting teammates, unblocking stalled PRs, and tackling tech debt demonstrate true senior teamwork.",
    "roleContext": "Fresher / SDE-1",
    "category": "Agile & Project Management"
  },
  {
    "id": "ir-sc-84",
    "scenarioContext": "What is the primary objective of the Sprint Retrospective ceremony?",
    "question": "What is the primary objective of the Sprint Retrospective ceremony?",
    "options": [
      "To assign blame to underperforming developers",
      "To reflect on the past sprint (What went well? What didn't go well? What can we improve?) and commit to 1-2 concrete, actionable process improvements for the next sprint",
      "To celebrate bonuses",
      "To rewrite the company mission statement"
    ],
    "correctIndex": 1,
    "explanation": "Retrospectives drive continuous team evolution (Kaizen). Identifying what hindered velocity and enacting concrete process fixes creates compound engineering improvements.",
    "roleContext": "universal",
    "category": "Agile & Project Management"
  },
  {
    "id": "ir-sc-85",
    "scenarioContext": "A product manager insists that a feature must be released on Friday evening at 7:00 PM before a long holiday weekend.",
    "question": "Why is 'Friday Evening Deployment' considered an industry anti-pattern and how should the team advocate for safer deployment schedules?",
    "options": [
      "Engineers dislike working on Fridays",
      "Deploying before weekends risks high-severity outages when on-call staffing is minimal and support teams are offline; advocate for deploying during core business hours (Tuesday–Thursday morning) when full team support is available",
      "Friday deployments are banned by internet law",
      "Servers are slower on weekends"
    ],
    "correctIndex": 1,
    "explanation": "Deploying during core weekday hours ensures that if an unforeseen bug manifests, the full engineering, QA, and database teams are on-hand to triage immediately.",
    "roleContext": "universal",
    "category": "Agile & Project Management"
  },
  {
    "id": "ir-sc-86",
    "scenarioContext": "A senior architect on your team designs a new caching system that you believe has a critical flaw during network partition failovers.",
    "question": "How should you raise your technical concern constructively?",
    "options": [
      "Interrupt them loudly in an all-hands meeting and call the design flawed",
      "Schedule a 1-on-1 design discussion, present specific architectural failure scenarios and edge-case data objectively, and propose a collaborative enhancement or test POC",
      "Complain behind their back to junior developers",
      "Remain silent and let production crash to prove them wrong"
    ],
    "correctIndex": 1,
    "explanation": "Professional technical disagreement relies on objective data, respect, and constructive alternatives. Raising concerns in a 1-on-1 with data preserves team psychological safety.",
    "roleContext": "universal",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-87",
    "scenarioContext": "A junior engineer on your team makes a mistake that causes a 10-minute staging environment outage, and they are visibly panicked and demoralized.",
    "question": "As a mentor or senior teammate, how do you handle this situation?",
    "options": [
      "Reprimand them publicly so other engineers learn not to make mistakes",
      "Reassure them calmly that staging is designed to catch failures, pair with them to diagnose the root cause, guide them through fixing it, and teach them the guardrails that will prevent it in production",
      "Tell management that the junior engineer should be let go",
      "Ignore them entirely"
    ],
    "correctIndex": 1,
    "explanation": "Great engineering cultures treat mistakes as teaching moments. Psychological safety enables junior engineers to grow into confident, disciplined technical leaders.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-88",
    "scenarioContext": "Your company's business executives ask you to implement code that intentionally hides cancellation buttons and uses misleading dark patterns to trap users into recurring subscriptions.",
    "question": "What is the ethical responsibility of a professional software engineer?",
    "options": [
      "Implement it immediately without question",
      "Raise the ethical and legal concerns respectfully with leadership, cite consumer protection laws (e.g. FTC guidelines on dark patterns), and propose transparent, compliant UX alternatives",
      "Secretly insert malware into the website",
      "Post company source code online"
    ],
    "correctIndex": 1,
    "explanation": "Software engineers have professional and ethical obligations against fraudulent or deceptive user practices (ACM Code of Ethics). Surfacing legal risks and proposing transparent designs protects both users and company.",
    "roleContext": "universal",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-89",
    "scenarioContext": "During a code review, an engineer leaves harsh, personal comments on a colleague's PR like 'Who wrote this garbage? Did you even go to college?'.",
    "question": "How should this behavior be addressed according to professional engineering standards?",
    "options": [
      "Join in the insult to build team camaraderie",
      "Address the unprofessional conduct immediately: establish that code reviews must critique the code constructively, never the person, and enforce a respectful Code of Conduct",
      "Delete the repository",
      "Ignore it because senior engineers are allowed to be rude"
    ],
    "correctIndex": 1,
    "explanation": "Toxic code reviews destroy team psychological safety and collaboration. Feedback must focus strictly on the code, explain the 'why' behind suggestions, and maintain professional empathy.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-90",
    "scenarioContext": "You discover an unpatched Zero-Day vulnerability in your company's production authentication system that allows account takeover.",
    "question": "What is the responsible disclosure protocol within your organization?",
    "options": [
      "Post the vulnerability on Twitter/X to gain social media followers",
      "Immediately notify the security team and engineering leadership via high-priority secure channels, file a P0 security ticket, and assist in developing and validating an emergency hotfix patch",
      "Exploit the vulnerability to see what user accounts you can access",
      "Ignore it until someone else notices"
    ],
    "correctIndex": 1,
    "explanation": "Critical security vulnerabilities require immediate internal escalation through designated security channels with strict confidentiality while patches are engineered and deployed.",
    "roleContext": "universal",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-91",
    "scenarioContext": "Two senior engineers on your team are deadlocked in an intense argument over whether to use TypeScript or plain JavaScript for a new project, stalling progress for 2 weeks.",
    "question": "How should a Tech Lead break this deadlock?",
    "options": [
      "Flip a coin in secret",
      "Define objective decision criteria (type safety, refactoring velocity, ecosystem support, team ramp-up time), schedule a timeboxed RFC review, make a final decision, and invoke 'Disagree and Commit'",
      "Allow both engineers to write in different languages in the same file",
      "Cancel the project"
    ],
    "correctIndex": 1,
    "explanation": "Protracted debates require structured resolution: evaluate against objective business/technical criteria, timebox the debate, decide decisively, and enforce full commitment.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-92",
    "scenarioContext": "A client requests that your team bypass standard QA and security penetration testing to meet an arbitrary marketing launch date.",
    "question": "How should the engineering leadership respond?",
    "options": [
      "Comply fully and skip all security testing",
      "Transparently explain the severe financial, legal, and reputational risks of deploying untested software, refuse to compromise security standards, and negotiate launching a reduced-scope MVP that has passed full QA",
      "Falsify the QA test reports",
      "Blame the marketing team on social media"
    ],
    "correctIndex": 1,
    "explanation": "Engineering leadership must defend security and quality guardrails. Launching a smaller, rock-solid MVP protects user data and institutional credibility.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-93",
    "scenarioContext": "A cross-functional team member (e.g. UX Designer or QA Engineer) feels that their input is constantly dismissed by software developers during feature planning.",
    "question": "As an empathetic software engineer, how can you improve cross-functional collaboration?",
    "options": [
      "Remind them that only developers write code that matters",
      "Actively solicit their expertise in early design discussions, respect their domain authority on accessibility and usability, and foster a culture of cross-disciplinary partnership",
      "Stop inviting them to meetings",
      "Hand them a coding book and tell them to learn to code"
    ],
    "correctIndex": 1,
    "explanation": "Top products are built through true cross-functional collaboration. Respecting design, QA, and product insights leads to superior end-user experiences and stronger team cohesion.",
    "roleContext": "universal",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-94",
    "scenarioContext": "You are interviewing candidates for an engineering role. A candidate shares a solution that is completely different from your preferred approach, but is equally optimal in time and space complexity.",
    "question": "How should you evaluate this candidate?",
    "options": [
      "Fail the candidate because they did not use your preferred approach",
      "Evaluate the candidate positively: praise their alternative perspective, discuss the trade-offs collaboratively, and assess their depth of understanding and code clarity",
      "Argue with them for 45 minutes",
      "Ask them trivia questions until they fail"
    ],
    "correctIndex": 1,
    "explanation": "Interviews evaluate problem-solving capability, not mind-reading. Recognizing valid alternative architectures is the hallmark of a mature, unbiased technical interviewer.",
    "roleContext": "Experienced SDE (1-5 Yrs)",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-95",
    "scenarioContext": "An engineer notices that a proprietary open-source library used by the team has a GPL license that legally requires open-sourcing the company's entire proprietary commercial codebase.",
    "question": "What is the correct protocol?",
    "options": [
      "Ignore the license and hope the copyright holders don't notice",
      "Immediately flag the licensing conflict to legal/compliance and engineering leadership, quarantine the dependency, and prioritize replacing it with a permissively licensed alternative (MIT / Apache 2.0)",
      "Delete the license file from the node_modules folder",
      "Sell the company before anyone finds out"
    ],
    "correctIndex": 1,
    "explanation": "Strict copyleft licenses (like GPL in commercial distributed binaries) carry major legal liabilities. Permissive licenses (MIT, Apache 2.0, BSD) are the standard for proprietary commercial software.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-96",
    "scenarioContext": "Your team is experiencing severe burnout after 3 consecutive crunch sprints with 12-hour workdays. Quality is plummeting and bugs are rising.",
    "question": "As an Engineering Manager or Tech Lead, what is the required intervention?",
    "options": [
      "Demand 14-hour workdays to finish the bugs faster",
      "Recognize that sustained crunch destroys productivity, enforce sustainable work hours, introduce a cool-down sprint focused on tech debt and bug stabilization, and re-calibrate delivery roadmaps realistically",
      "Order pizza and tell everyone to keep coding all night",
      "Threaten to cancel vacations"
    ],
    "correctIndex": 1,
    "explanation": "Software engineering is a marathon of cognitive endurance, not a sprint. Chronic burnout causes severe attrition and catastrophic production defects; sustainable pace is essential.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-97",
    "scenarioContext": "A developer wants to adopt a brand new programming language for an upcoming mission-critical project because it is trending on social media, despite the team having zero production experience in it.",
    "question": "How should this technology adoption decision be evaluated?",
    "options": [
      "Adopt it immediately because new tech is always better",
      "Write an Architecture Decision Record (ADR) or Request for Comments (RFC) evaluating ecosystem maturity, hiring availability, production support, and team learning curve against the project's reliability requirements",
      "Ban all new technologies permanently",
      "Let each developer write in whatever language they want"
    ],
    "correctIndex": 1,
    "explanation": "Technology adoption in mission-critical services requires structured evaluation (ADR/RFC): operational maturity, community support, and team ramp-up velocity outweigh transient hype.",
    "roleContext": "Senior SDE / Tech Lead",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-98",
    "scenarioContext": "You receive an email from an external security researcher reporting a vulnerability, accompanied by a polite request for a bug bounty reward.",
    "question": "How should this communication be handled?",
    "options": [
      "Threaten legal action against the researcher",
      "Acknowledge receipt professionally, forward to the internal security/AppSec team for validation, verify the finding under the company's Responsible Disclosure policy, and award appropriate bounty/credit if valid",
      "Delete the email and ignore it",
      "Steal the finding and take credit for finding it"
    ],
    "correctIndex": 1,
    "explanation": "Ethical security researchers are critical partners in defense. Responsible disclosure programs reward white-hat researchers and fix vulnerabilities before malicious actors exploit them.",
    "roleContext": "universal",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-99",
    "scenarioContext": "A teammate frequently takes credit during company all-hands meetings for architectural designs and code optimizations that YOU conceived and implemented.",
    "question": "What is the most constructive way to resolve this credit-claiming issue?",
    "options": [
      "Send an angry company-wide email calling them a thief",
      "Have a private, professional 1-on-1 conversation with the teammate explaining how this impact was shared, ensure future RFCs and commits carry clear co-authorship tags, and keep your manager informed of your direct contributions",
      "Sabotage their code in production",
      "Stop contributing to any projects"
    ],
    "correctIndex": 1,
    "explanation": "Direct, calm 1-on-1 communication clarifies boundaries without drama. Documenting contributions in RFCs, PR descriptions, and 1-on-1s with your manager ensures transparent attribution.",
    "roleContext": "universal",
    "category": "Leadership & Ethics"
  },
  {
    "id": "ir-sc-100",
    "scenarioContext": "What is the core principle Placement Mentor Kapil teaches to SPSU Udaipur students regarding engineering ethics and professionalism throughout their careers?",
    "question": "What is the core principle Placement Mentor Kapil teaches to SPSU Udaipur students regarding engineering ethics and professionalism throughout their careers?",
    "options": [
      "Write code solely for the paycheck and cut corners whenever unsupervised",
      "Craft software with relentless integrity, treat colleagues with respect, write maintainable and battle-tested code you are proud to sign your name to, and commit to continuous lifelong learning",
      "Never help other engineers so you remain the smartest in the room",
      "Avoid taking responsibility for anything that goes wrong"
    ],
    "correctIndex": 1,
    "explanation": "Integrity, rigorous craft, respect, and continuous lifelong mastery are the hallmarks of great engineers who build long, respected, and deeply impactful careers.",
    "roleContext": "universal",
    "category": "Leadership & Ethics"
  }
];
