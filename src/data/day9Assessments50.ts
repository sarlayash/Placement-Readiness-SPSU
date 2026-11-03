import { AssessmentQuestion } from '../types';

/**
 * SPSU Udaipur Placement Readiness Program
 * Mentor: Kapil | Day 9: Full-Stack Development & Project Architecture Readiness
 * Diagnostic Pre-Assessment: Exactly 50 MCQs
 */
export const DAY_9_PRE_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    id: 'd9-pre-1',
    question: 'In enterprise 3-tier software architecture, what is the core responsibility of the Controller layer?',
    options: [
      'Handling incoming HTTP requests, validating input DTOs, and delegating business processing to the Service layer',
      'Directly opening TCP database sockets and writing raw SQL transactions',
      'Rendering CSS stylesheets in user web browsers',
      'Managing physical hard disk partition tables'
    ],
    correctIndex: 0,
    explanation: 'Controllers act as entry points: they parse request headers/body, enforce validation, and return HTTP response entities.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-2',
    question: 'What is a Data Transfer Object (DTO), and why is it preferred over exposing database Entities directly?',
    options: [
      'An object carrying data between processes that decouples internal database schemas from external API contracts and prevents sensitive field leaks',
      'A database driver that compresses SQL statements',
      'A hardware chip on network routers',
      'A Git branch used exclusively for testing'
    ],
    correctIndex: 0,
    explanation: 'DTOs encapsulate only fields needed by client views, hiding internal columns like password hashes or database-generated audit keys.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-3',
    question: 'What problem does Database Connection Pooling (e.g. HikariCP) solve in web servers?',
    options: [
      'Eliminates the latency and CPU overhead of establishing a new TCP connection and authenticating with MySQL for every single HTTP request',
      'Translates SQL queries into Python code automatically',
      'Encrypts entire database hard drives',
      'Increases database storage capacity by 10x'
    ],
    correctIndex: 0,
    explanation: 'Establishing database connections requires expensive TCP handshakes and authentication; pooling maintains pre-warmed connections.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-4',
    question: 'How does a Parameterized PreparedStatement prevent SQL Injection (SQLi) attacks?',
    options: [
      'The database compiles the SQL query template and execution plan first; user inputs are treated strictly as literal data values rather than executable SQL code',
      'It encrypts user inputs using MD5',
      'It deletes all single quote characters from user inputs',
      'It converts SQL queries into HTTP POST requests'
    ],
    correctIndex: 0,
    explanation: 'Prepared statements separate query structure from user parameters, rendering quotation marks and SQL operators harmless.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-5',
    question: 'In the 4-Step Project Defense Framework for placement interviews, what should you articulate first?',
    options: [
      'The business problem statement, context, and user pain points solved by the project',
      'The exact version of React and Node.js installed on your machine',
      'The number of lines of code you wrote in git',
      'Your salary expectations'
    ],
    correctIndex: 0,
    explanation: 'Step 1 anchors the discussion on customer value and business context before diving into deep technical choices.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-6',
    question: 'What is Cross-Origin Resource Sharing (CORS)?',
    options: [
      'A browser security mechanism that restricts web applications from making HTTP requests to a domain different from the one that served the web page',
      'A protocol for sharing hard disk drives across servers',
      'A technique for running JavaScript in background threads',
      'A database query optimization strategy'
    ],
    correctIndex: 0,
    explanation: 'CORS enforces the Same-Origin Policy in browsers while allowing servers to selectively whitelist trusted origins.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-7',
    question: 'What are the three dot-separated components of a JSON Web Token (JWT)?',
    options: [
      'Header, Payload, Signature',
      'Username, Password, Salt',
      'Client, Server, Database',
      'Protocol, Host, Port'
    ],
    correctIndex: 0,
    explanation: 'JWTs comprise a Base64URL-encoded Header (algorithm), Payload (claims), and cryptographic Signature (tamper verification).',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-8',
    question: 'In REST API design, which HTTP method should be used to partially update an existing resource?',
    options: ['PATCH', 'GET', 'POST', 'DELETE'],
    correctIndex: 0,
    explanation: 'PUT replaces an entire resource; PATCH applies a partial delta update to specific fields.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-9',
    question: 'What is the purpose of the `@Transactional` annotation in Spring Boot / enterprise Java services?',
    options: [
      'Ensures all database operations inside the method execute within a single atomic ACID transaction, rolling back automatically on runtime exceptions',
      'Increases database query execution speed by 500%',
      'Exports data to an Excel spreadsheet',
      'Encrypts network packets over HTTPS'
    ],
    correctIndex: 0,
    explanation: '`@Transactional` manages transaction boundaries, guaranteeing atomicity across multi-table operations.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-10',
    question: 'Why should passwords never be stored in plain text or with simple MD5/SHA-256 hashes?',
    options: [
      'Simple hashes are vulnerable to rainbow table lookups and brute force attacks; production systems require salted adaptive algorithms like BCrypt or Argon2',
      'MD5 hashes take too much disk space',
      'Databases cannot index strings longer than 32 characters',
      'Passwords must be stored in plaintext for customer support'
    ],
    correctIndex: 0,
    explanation: 'BCrypt and Argon2 use cryptographic salts and tunable work factors (cost) to defeat GPU-accelerated cracking.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-11',
    question: 'What is the "N+1 Query Problem" in ORM frameworks like Hibernate or Prisma?',
    options: [
      'Executing 1 initial query to fetch N parent records, followed by N separate queries to fetch associated children, causing severe database I/O bottlenecks',
      'Adding 1 extra column to an existing database table',
      'Creating N+1 database users',
      'Running queries with N+1 nested joins'
    ],
    correctIndex: 0,
    explanation: 'N+1 occurs when lazy-loading triggers separate SELECT queries inside loops instead of a single JOIN FETCH or batched query.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-12',
    question: 'What is the primary function of an API Gateway in microservice architectures?',
    options: [
      'Serving as the single entry point that manages request routing, authentication, SSL termination, and rate limiting across services',
      'Writing frontend HTML code',
      'Managing physical fiber-optic cables',
      'Formatting code with Prettier'
    ],
    correctIndex: 0,
    explanation: 'API Gateways shield internal service topologies and centralize cross-cutting security and monitoring policies.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-13',
    question: 'In client-side web security, why is it recommended to store authentication refresh tokens in `HttpOnly; Secure; SameSite=Strict` cookies?',
    options: [
      'HttpOnly cookies cannot be accessed or read by JavaScript code, protecting tokens from theft via Cross-Site Scripting (XSS) attacks',
      'Cookies are faster than localStorage',
      'Cookies never expire',
      'Cookies can hold up to 1GB of data'
    ],
    correctIndex: 0,
    explanation: '`HttpOnly` prevents browser scripts from reading the cookie, neutralizing token exfiltration via malicious XSS injections.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-14',
    question: 'What is the role of the Service layer in a 3-tier architecture?',
    options: [
      'Contains core business rules, orchestrates multiple repository calls, and manages transaction boundaries independent of HTTP specifics',
      'Listens on TCP port 80 for network connections',
      'Renders CSS flexbox grids',
      'Stores user passwords in cookies'
    ],
    correctIndex: 0,
    explanation: 'Services contain domain business logic, keeping controllers lean and repositories focused purely on persistence.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-15',
    question: 'What is the difference between synchronous HTTP communication and asynchronous message queue communication (e.g. Kafka, RabbitMQ)?',
    options: [
      'Synchronous HTTP blocks the client waiting for an immediate response; asynchronous messaging decouples producer from consumer, buffering requests during traffic spikes',
      'HTTP is for databases; Kafka is for web browsers',
      'HTTP is faster than Kafka in all scenarios',
      'Kafka requires zero CPU power'
    ],
    correctIndex: 0,
    explanation: 'Message queues decouple systems, enabling backpressure management, asynchronous processing, and fault tolerance.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-pre-16',
    question: 'What HTTP status code should a backend API return when a client attempts to access a protected endpoint without an Authorization header?',
    options: ['401 Unauthorized', '403 Forbidden', '404 Not Found', '500 Internal Server Error'],
    correctIndex: 0,
    explanation: '401 Unauthorized indicates missing or invalid authentication credentials. 403 Forbidden indicates authenticated but lacking permissions.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-17',
    question: 'Given an HTTP request with `Authorization: Bearer mySecretToken123`, what is the exact string extracted as the access token?',
    options: ['mySecretToken123', 'Bearer mySecretToken123', 'Bearer', 'mySecretToken'],
    correctIndex: 0,
    explanation: 'The Bearer prefix and trailing space are stripped, leaving the raw token string.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-18',
    question: 'Which of the following SQL strings represents a classic authentication bypass SQL injection payload?',
    options: ["admin' OR '1'='1", "SELECT * FROM users", "INSERT INTO logs VALUES (1)", "WHERE id = 5"],
    correctIndex: 0,
    explanation: `' OR '1'='1 makes the WHERE clause evaluate to true for every database row, bypassing password checks.`,
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-19',
    question: 'If a backend connection pool has a maximum size of 10, and 10 concurrent requests are currently executing slow queries, what happens when an 11th request arrives?',
    options: [
      'It waits in a queue until a connection is released, or times out with a ConnectionPoolTimeoutException if the timeout threshold is exceeded',
      'The database crashes immediately',
      'The server creates 1,000 extra connections automatically',
      'The request is redirected to Google'
    ],
    correctIndex: 0,
    explanation: 'Connection pools hold waiting threads until timeout (e.g. 30,000ms), preventing database thread starvation.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-20',
    question: 'In a pagination query with `page = 3` and `pageSize = 20`, what are the resulting SQL `LIMIT` and `OFFSET` values?',
    options: ['LIMIT 20 OFFSET 40', 'LIMIT 20 OFFSET 60', 'LIMIT 40 OFFSET 20', 'LIMIT 3 OFFSET 20'],
    correctIndex: 0,
    explanation: 'OFFSET = (page - 1) * pageSize = (3 - 1) * 20 = 40. LIMIT = 20.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-21',
    question: 'What HTTP status code is most appropriate when a client creates a new user resource via POST `/api/v1/users` successfully?',
    options: ['201 Created', '200 OK', '204 No Content', '301 Moved Permanently'],
    correctIndex: 0,
    explanation: '201 Created indicates successful creation of a new resource, typically accompanied by a Location header.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-22',
    question: 'Which HTTP response header tells the browser which frontend origins are permitted to access resources via CORS?',
    options: ['Access-Control-Allow-Origin', 'Allow-Origin-Policy', 'Origin-Trusted-Host', 'Sec-Fetch-Origin'],
    correctIndex: 0,
    explanation: '`Access-Control-Allow-Origin: https://example.com` explicitly authorises the browser to expose responses to client scripts.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-23',
    question: 'What is the result of executing `SELECT * FROM users WHERE id = ?` with parameter `1; DROP TABLE users;` in a PreparedStatement?',
    options: [
      'The database searches for a user whose literal ID matches the entire string, resulting in 0 rows without dropping any table',
      'The users table is dropped immediately',
      'The query crashes the server with a segmentation fault',
      'All users are deleted'
    ],
    correctIndex: 0,
    explanation: 'Because input is bound to the literal parameter placeholder `?`, semicolons and DROP commands are treated as benign string text.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-24',
    question: 'In REST API pagination, if `totalItems = 25` and `pageSize = 10`, what is the total number of pages?',
    options: ['3 pages (pages 1, 2, and 3)', '2.5 pages', '2 pages', '25 pages'],
    correctIndex: 0,
    explanation: 'Math.ceil(25 / 10) = 3 pages. Page 1 has 10 items, page 2 has 10, page 3 has the remaining 5.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-25',
    question: 'Which of the following passwords fails OWASP complexity requirements for missing a special symbol?',
    options: ['KapilNarula2026', 'Kapil@2026', 'Password!99', 'Admin#1234'],
    correctIndex: 0,
    explanation: `'KapilNarula2026' has uppercase, lowercase, and digits, but lacks a special symbol (!@#$%^&*).`,
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-26',
    question: 'In the Cache-Aside pattern, what action is taken when a requested entity is NOT found in the cache (Cache Miss)?',
    options: [
      'Query the primary database, store the result in the cache with a TTL, and return the data to the client',
      'Return HTTP 404 immediately without checking the database',
      'Delete the cache completely',
      'Throw a NullPointerException'
    ],
    correctIndex: 0,
    explanation: 'On a cache miss, the backend lazily fetches from database and backfills the cache to ensure subsequent requests hit in-memory.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-27',
    question: 'What is the purpose of an HTTP `OPTIONS` preflight request generated automatically by browsers before CORS requests?',
    options: [
      'To verify with the server which HTTP methods, headers, and credentials are permitted prior to sending the actual cross-origin request',
      'To download options menus for HTML dropdowns',
      'To benchmark network ping latency',
      'To check if the user is using Google Chrome'
    ],
    correctIndex: 0,
    explanation: 'Preflight OPTIONS checks ensure the remote server understands and permits non-simple methods (PUT, DELETE) before execution.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-28',
    question: 'What does a `429 Too Many Requests` HTTP status code communicate to the client?',
    options: [
      'The client has exceeded the server’s designated rate limiting quota within a specific time window',
      'The server is permanently offline',
      'The user credentials have expired',
      'The requested URL does not exist'
    ],
    correctIndex: 0,
    explanation: '429 indicates rate-limiting engagement, often accompanied by a `Retry-After` header indicating backoff delay.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-29',
    question: 'How do you fix an N+1 query problem when fetching Authors and their Books in Spring Data JPA?',
    options: [
      'Use a `JOIN FETCH` clause in a JPQL query (e.g. `SELECT a FROM Author a JOIN FETCH a.books`) or `@EntityGraph`',
      'Write a for-loop in Java that queries books one-by-one',
      'Delete all books with missing authors',
      'Restart the database server'
    ],
    correctIndex: 0,
    explanation: '`JOIN FETCH` instructs Hibernate to retrieve parent and children in a single SQL JOIN query, reducing queries from N+1 to 1.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-30',
    question: 'What does the `SameSite=Strict` cookie attribute prevent?',
    options: [
      'Cross-Site Request Forgery (CSRF) by preventing the browser from sending the cookie in any cross-site browsing context',
      'SQL injection in database queries',
      'Buffer overflows in C code',
      'Users from changing their password'
    ],
    correctIndex: 0,
    explanation: 'SameSite=Strict ensures cookies are only dispatched on requests originating from the exact same site, blocking CSRF attacks.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-31',
    question: 'If a client sends an invalid JSON payload missing mandatory fields to a REST controller, which status code should be returned?',
    options: ['400 Bad Request', '500 Internal Server Error', '403 Forbidden', '200 OK'],
    correctIndex: 0,
    explanation: '400 Bad Request signals client validation errors, schema violations, or malformed JSON payloads.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-32',
    question: 'What is the role of an ORM (Object-Relational Mapping) tool such as Hibernate or SQLAlchemy?',
    options: [
      'Translates between object-oriented domain models in code and relational tables/rows in database schemas',
      'Compresses images before uploading to Cloud Storage',
      'Compiles C code to binary machine instructions',
      'Configures network routers'
    ],
    correctIndex: 0,
    explanation: 'ORMs map classes to tables and object instances to rows, abstracting raw SQL queries into high-level API methods.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-33',
    question: 'What is the main danger of storing sensitive database credentials directly inside application Git source code?',
    options: [
      'Anyone with repository read access (including compromised developer laptops or public repos) can steal database credentials and compromise production data',
      'It slows down Git commit speed',
      'Git refuses to commit files with passwords',
      'It causes Java compiler errors'
    ],
    correctIndex: 0,
    explanation: 'Credentials must be injected via secure Environment Variables or secret managers (e.g. AWS Secrets Manager, HashiCorp Vault).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-34',
    question: 'Which layer of 3-tier architecture should contain validation annotations like `@NotBlank`, `@Size`, and `@Email` in Spring Boot?',
    options: [
      'The DTO classes in the Presentation / Controller layer',
      'The database trigger scripts only',
      'The CSS stylesheet files',
      'The web server hardware BIOS'
    ],
    correctIndex: 0,
    explanation: 'Validating DTOs immediately upon entry prevents invalid or malicious payloads from penetrating deeper into service layers.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-35',
    question: 'What does `HTTP 204 No Content` indicate?',
    options: [
      'The request succeeded, but there is no response body to return (common for successful DELETE operations)',
      'The requested page was not found',
      'The server is experiencing internal crashes',
      'The client is unauthorized'
    ],
    correctIndex: 0,
    explanation: '204 communicates successful execution without requiring redundant payload bytes in the response.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-36',
    question: 'In modern REST APIs, why is stateless authentication (e.g. JWT) preferred over server-side session memory (e.g. HttpSession)?',
    options: [
      'Stateless backends can scale horizontally across multiple load-balanced instances without needing sticky sessions or synchronized session caches',
      'JWTs use 0 bytes of RAM',
      'Server-side sessions are illegal in Europe',
      'JWTs cannot be decoded by anyone'
    ],
    correctIndex: 0,
    explanation: 'Any backend replica can verify a stateless cryptographic signature without querying a shared session store.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-37',
    question: 'What does a database `Index` accomplish, and what is its associated trade-off?',
    options: [
      'Accelerates SELECT query search speed from O(N) full-table scans to O(log N) B-Tree lookups, at the cost of slower INSERT/UPDATE writes and additional disk space',
      'Reduces table disk size by 50%',
      'Eliminates the need for primary keys',
      'Prevents SQL injection attacks'
    ],
    correctIndex: 0,
    explanation: 'Indexes build B-Tree auxiliary search trees: queries run exponentially faster, but every write must update the index.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-38',
    question: 'What happens if a backend application does not properly close or return database connections to the connection pool?',
    options: [
      'Connection Leak: The pool gradually runs out of available connections, causing all subsequent user requests to hang and time out',
      'The database automatically doubles its RAM',
      'The application runs 10x faster',
      'Nothing happens'
    ],
    correctIndex: 0,
    explanation: 'Leaked connections never return to the pool. When all connections remain checked out, the pool becomes permanently exhausted.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-39',
    question: 'What is the purpose of the `Content-Type: application/json` header in an HTTP POST request?',
    options: [
      'Notifies the server that the request body is formatted as a JSON string so it can deserialize it into native objects',
      'Tells the browser to download a file',
      'Enables SSL encryption',
      'Authenticates the user password'
    ],
    correctIndex: 0,
    explanation: 'MIME types guide parsers: `application/json` informs middleware to parse the raw byte stream as JSON.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-40',
    question: 'In interview project walkthroughs, how should you respond when an interviewer asks "What would you improve in your project if you had more time?"',
    options: [
      'Discuss concrete architectural evolutions: e.g. adding Redis caching for read-heavy routes, implementing asynchronous message queues for email dispatch, or adding distributed tracing',
      'State that the project is 100% perfect and cannot be improved',
      'Say that you did not write the project so you do not know',
      'Complain that your group teammates did not help'
    ],
    correctIndex: 0,
    explanation: 'Acknowledging production engineering trade-offs (caching, queues, observability) demonstrates mature system design perspective.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-41',
    question: 'What is an ACID transaction "Rollback"?',
    options: [
      'Reverting all database state changes executed during a transaction when an unhandled error or exception occurs, preserving consistency',
      'Restoring a git commit from yesterday',
      'Reinstalling the MySQL database software',
      'Deleting all historical customer orders'
    ],
    correctIndex: 0,
    explanation: 'Atomicity ensures all-or-nothing: if step 4 of 5 fails, rollback undoes steps 1-3 so data is never left corrupted.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-42',
    question: 'What is Cross-Site Scripting (XSS)?',
    options: [
      'A vulnerability where an attacker injects malicious client-side JavaScript into a web application, executing in the browsers of victim users',
      'Cracking Wi-Fi passwords with brute force',
      'Denial of service via network flooding',
      'Overheating laptop CPUs with infinite loops'
    ],
    correctIndex: 0,
    explanation: 'XSS occurs when untrusted user input is rendered into HTML without proper contextual sanitization or output escaping.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-43',
    question: 'Which of the following headers represents an HTTP request carrying a basic authorization token?',
    options: ['Authorization: Basic YWRtaW46cGFzc3dvcmQ=', 'Content-Type: text/html', 'Accept: text/plain', 'Host: spsu.ac.in'],
    correctIndex: 0,
    explanation: 'Basic auth prefixes Base64-encoded `username:password` credentials with the `Basic ` keyword.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-44',
    question: 'What does a `502 Bad Gateway` HTTP status code indicate in a full-stack deployment?',
    options: [
      'The reverse proxy (e.g. Nginx, Cloudflare) received an invalid or failed response from the upstream application server (e.g. Spring Boot, FastAPI)',
      'The user entered an invalid password',
      'The client browser has no internet connection',
      'The database query returned 0 rows'
    ],
    correctIndex: 0,
    explanation: '502 indicates that edge gateways could not communicate with or received an unexpected crash response from backend servers.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-45',
    question: 'Why should database connection pool sizes typically be kept relatively small (e.g. 10-30) rather than set to 10,000?',
    options: [
      'Databases are CPU and disk I/O bound; excessive concurrent connections cause context-switching thrashing and memory exhaustion that degrades overall throughput',
      'Connection pools crash if size > 50',
      'Network cards only support 30 TCP sockets',
      'Each connection costs $100 per month'
    ],
    correctIndex: 0,
    explanation: 'HikariCP benchmarks prove that smaller pools matching CPU core and disk thread capacity maximize throughput by avoiding CPU context thrashing.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-46',
    question: 'In Spring Boot, what is the role of the `@Repository` annotation?',
    options: [
      'Marks a class as a Data Access Object (DAO) responsible for database persistence and enables automatic exception translation into Spring Data exceptions',
      'Registers a class as a Git repository on GitHub',
      'Uploads compiled JAR files to Maven Central',
      'Configures React routing'
    ],
    correctIndex: 0,
    explanation: '`@Repository` denotes data persistence components, encapsulating storage, retrieval, and query execution.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-47',
    question: 'What does the `p95 latency` metric represent in backend performance monitoring?',
    options: [
      '95% of all HTTP requests were served faster than or equal to this latency duration, highlighting tail latencies experienced by the slowest 5% of users',
      'The average latency multiplied by 95',
      'The temperature of the server CPU',
      'The percentage of requests that failed with HTTP 500'
    ],
    correctIndex: 0,
    explanation: 'Percentile metrics (p95, p99) expose worst-case user experiences that misleading averages disguise.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-48',
    question: 'What is a "Deadlock" between two concurrent database transactions?',
    options: [
      'Transaction A locks Row 1 and waits for Row 2; Transaction B locks Row 2 and waits for Row 1; neither can progress until the database engine aborts one',
      'When the database hard drive is 100% full',
      'When two users have the same username',
      'When an SQL query has syntax errors'
    ],
    correctIndex: 0,
    explanation: 'Circular wait deadlocks are detected by database engines, which automatically abort and rollback one transaction to break the cycle.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-49',
    question: 'What is the purpose of an API schema specification like OpenAPI / Swagger?',
    options: [
      'Provides a machine-readable, interactive contract documenting all API endpoints, request schemas, parameters, responses, and authentication requirements',
      'Writes automated unit tests without developer input',
      'Deploys applications to Kubernetes automatically',
      'Formats code comments with Javadoc'
    ],
    correctIndex: 0,
    explanation: 'OpenAPI contracts enable frontend-backend teams to collaborate seamlessly and generate client SDKs automatically.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-pre-50',
    question: 'In technical interviews, what is the best way to demonstrate mastery of full-stack development?',
    options: [
      'Clearly explain the end-to-end flow of data across tiers, justify design and database choices, and discuss how you handled concurrency, errors, and security',
      'Recite memorized syntax of 20 different CSS properties',
      'Claim that you never encounter any bugs when you write software',
      'Argue that frontend is superior to backend'
    ],
    correctIndex: 0,
    explanation: 'Interviewers look for systems thinking: understanding how UI, API, database, and operational components interact cohesively.',
    category: 'Practical Execution & Trace (70%)'
  }
];

/**
 * SPSU Udaipur Placement Readiness Program
 * Mentor: Kapil | Day 9: Full-Stack Development & Project Architecture Readiness
 * Verification Post-Assessment: Exactly 50 MCQs
 */
export const DAY_9_POST_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    id: 'd9-post-1',
    question: 'In deep 3-tier architecture, why must business domain rules reside strictly in the Service layer rather than inside Controllers or Database Entities?',
    options: [
      'To keep business logic reusable, decoupled from the HTTP transport protocol, and easily testable via unit tests without mocking web servers',
      'Because Controllers cannot execute if statements in Java or Python',
      'Because database queries cannot run inside Services',
      'To increase network packet latency'
    ],
    correctIndex: 0,
    explanation: 'Separating business logic from transport means the same service can be driven by REST controllers, CLI jobs, or message queues without code changes.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-2',
    question: 'What is the architectural difference between Monolithic and Microservice backend architectures?',
    options: [
      'A monolith deploys all modules and domain logic as a single unified binary sharing one database; microservices split domains into independent deployable services with private databases communicating via APIs/queues',
      'Monoliths are written only in C; microservices are written in HTML',
      'Microservices never experience network failures',
      'Monoliths cannot connect to relational databases'
    ],
    correctIndex: 0,
    explanation: 'Monoliths offer simpler initial development and transactional consistency; microservices offer independent deployment scalability and fault isolation.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-3',
    question: 'In JWT authentication, why is the signature component vital for security even though the payload is Base64-encoded in plaintext?',
    options: [
      'The signature is cryptographically computed with a server secret key; any client modification to payload claims (e.g. changing role from "user" to "admin") invalidates the signature and causes rejection',
      'The signature encrypts the user’s credit card data',
      'The signature prevents users from logging out',
      'The signature deletes cookies from browsers'
    ],
    correctIndex: 0,
    explanation: 'JWTs provide tamper-evidence (authenticity and integrity): anyone can read the claims, but only the server with the private key can forge a valid signature.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-4',
    question: 'What is "Connection Pool Starvation" and how does it manifest in production?',
    options: [
      'All pooled database connections are held by slow or blocked requests, causing new incoming requests to queue, exhaust threads, and fail with timeout exceptions',
      'The database runs out of disk storage space',
      'The physical power cord of the database server is disconnected',
      'The network speed drops to zero'
    ],
    correctIndex: 0,
    explanation: 'Pool starvation occurs when slow queries or external network calls inside DB transactions occupy connections, blocking all incoming traffic.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-5',
    question: 'What is the difference between Optimistic Locking and Pessimistic Locking in database concurrency control?',
    options: [
      'Optimistic locking uses a version number/timestamp column and validates it on update without holding locks; Pessimistic locking explicitly locks rows (`SELECT ... FOR UPDATE`) during read',
      'Optimistic locking only works in memory; Pessimistic locking works on disk',
      'Pessimistic locking prevents users from logging in',
      'There is zero difference between them'
    ],
    correctIndex: 0,
    explanation: 'Optimistic locking avoids locking overhead in read-heavy web apps; Pessimistic locking prevents conflicting writes in high-contention financial transfers.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-6',
    question: 'How does an In-Memory Cache (such as Redis) protect relational databases during traffic surges?',
    options: [
      'Serves frequent read queries in sub-millisecond RAM latency, absorbing 70-90% of read traffic before it ever touches database disks',
      'Writes automated SQL queries',
      'Backs up database tables to tape drives',
      'Encrypts user passwords with SHA-1'
    ],
    correctIndex: 0,
    explanation: 'Caching hot keys in Redis shields the database from repetitive read load, preserving DB CPU and connection pool headroom.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-7',
    question: 'In REST API design, why is idempotency important when designing checkout or payment processing endpoints?',
    options: [
      'If a network timeout occurs, the client can safely retry the request with an Idempotency-Key without risking duplicate charges or double deductions',
      'It makes the API run twice as fast',
      'It encrypts credit card numbers',
      'It converts HTTP POST into GET'
    ],
    correctIndex: 0,
    explanation: 'Idempotency keys ensure retry requests return the original recorded result rather than executing a duplicate charge.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-8',
    question: 'What is "Database Sharding"?',
    options: [
      'Horizontally partitioning rows of a large database table across multiple independent physical database instances using a shard key (e.g. user_id % N)',
      'Compressing database files to save disk space',
      'Backing up databases to multiple hard drives',
      'Deleting old inactive users'
    ],
    correctIndex: 0,
    explanation: 'Sharding distributes massive datasets and write throughput across distinct database servers when single-node scaling limits are reached.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-9',
    question: 'What is the danger of executing non-database I/O operations (like calling external payment or email APIs) inside a `@Transactional` boundary?',
    options: [
      'External network latency holds the scarce database connection open for seconds, rapidly exhausting the connection pool and bringing down the entire application',
      'It creates duplicate database tables',
      'It corrupts Git commit history',
      'It violates REST API naming conventions'
    ],
    correctIndex: 0,
    explanation: 'Transactions must encompass only immediate database modifications; external HTTP calls should occur outside transactional blocks.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-10',
    question: 'What is the "Cache Stampede" (or Thundering Herd) problem in caching architectures?',
    options: [
      'When a popular cache key expires, thousands of simultaneous concurrent requests experience a cache miss and hit the database at once, overwhelming it',
      'When Redis crashes due to lack of RAM',
      'When cache data is written in uppercase text',
      'When network cards overheat'
    ],
    correctIndex: 0,
    explanation: 'Stampedes are prevented using mutex locks, probabilistic early expiration (XFetch), or background cache pre-warming.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-11',
    question: 'What is the difference between Authentication and Authorization in web security?',
    options: [
      'Authentication verifies WHO you are (identity verification via login/password/JWT); Authorization verifies WHAT you are permitted to do (permissions, RBAC)',
      'Authentication is for frontends; Authorization is for databases',
      'Authentication uses HTTP 403; Authorization uses HTTP 401',
      'They are exact synonyms'
    ],
    correctIndex: 0,
    explanation: 'AuthN establishes caller identity; AuthZ evaluates whether that identity holds permissions to execute a specific action.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-12',
    question: 'In full-stack applications, what is "Server-Side Rendering" (SSR) vs "Client-Side Rendering" (CSR)?',
    options: [
      'SSR generates the complete HTML page on the server for each request (superior SEO and initial load); CSR downloads a blank HTML shell and builds the DOM in the browser via JavaScript',
      'SSR is written in C; CSR is written in Python',
      'CSR requires zero JavaScript',
      'SSR does not work on mobile phones'
    ],
    correctIndex: 0,
    explanation: 'SSR sends fully-rendered markup for immediate display and SEO indexing; CSR offloads rendering computation to client browser runtimes.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-13',
    question: 'What is the primary role of a Reverse Proxy (such as Nginx or Traefik) positioned in front of application backends?',
    options: [
      'Terminating SSL/TLS encryption, load-balancing traffic across backend replicas, serving static assets, and shielding internal server ports',
      'Executing database SQL joins',
      'Compiling Java bytecode',
      'Editing CSS stylesheets'
    ],
    correctIndex: 0,
    explanation: 'Reverse proxies optimize ingress traffic, offload TLS cryptography, compress responses, and enforce global rate limits.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-14',
    question: 'In database management, what does the ACID acronym stand for?',
    options: [
      'Atomicity, Consistency, Isolation, Durability',
      'Authentication, Cryptography, Integrity, Decryption',
      'Allocation, Concurrency, Iteration, Deletion',
      'Access, Communication, Identification, Distribution'
    ],
    correctIndex: 0,
    explanation: 'ACID guarantees reliable transaction processing: all-or-nothing, invariant preservation, concurrent independence, and persistent commitment.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-15',
    question: 'Why is it critical to articulate "Trade-Offs" when defending your project architecture in technical interviews?',
    options: [
      'Every real-world engineering choice has compromises (e.g. speed vs memory, consistency vs availability); articulating trade-offs proves you made reasoned design decisions rather than just copying tutorials',
      'To convince the interviewer that programming is easy',
      'To make the interview take more time',
      'To avoid answering questions about your resume'
    ],
    correctIndex: 0,
    explanation: 'Senior engineers evaluate candidates on their ability to reason through architectural compromises and justify technical decisions.',
    category: 'Theory (30%)'
  },
  {
    id: 'd9-post-16',
    question: 'If an incoming request carries an expired JWT token, which HTTP status code and response body should the authentication filter return?',
    options: [
      'HTTP 401 Unauthorized with an error indicating token expiration',
      'HTTP 200 OK with null data',
      'HTTP 500 Internal Server Error',
      'HTTP 404 Not Found'
    ],
    correctIndex: 0,
    explanation: 'Expired credentials constitute invalid authentication, requiring 401 Unauthorized so clients know to refresh or re-authenticate.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-17',
    question: 'Given an input string with malicious HTML: `<script>alert("hack")</script>`, what does output encoding (HTML entity escaping) convert it into?',
    options: [
      '&lt;script&gt;alert(&quot;hack&quot;)&lt;/script&gt;',
      'DELETED_SCRIPT',
      '<script>alert("hack")</script>',
      'An empty string'
    ],
    correctIndex: 0,
    explanation: 'Escaping `<` to `&lt;` and `>` to `&gt;` causes the browser to render the characters as visible text rather than executable markup.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-18',
    question: 'In a pagination system where `totalItems = 0`, what should `totalPages` and `hasNext` evaluate to?',
    options: ['totalPages = 0, hasNext = false', 'totalPages = 1, hasNext = true', 'totalPages = -1, hasNext = false', 'totalPages = 0, hasNext = true'],
    correctIndex: 0,
    explanation: 'Zero items yield zero total pages, and subsequent navigation is impossible (`hasNext = false`).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-19',
    question: 'What is the SQL query generated when batching 4 child order lookups to eliminate an N+1 query problem for user IDs 12, 15, 18, and 24?',
    options: [
      'SELECT * FROM orders WHERE user_id IN (12, 15, 18, 24)',
      'SELECT * FROM orders WHERE user_id = 12 AND user_id = 15',
      'SELECT * FROM orders GROUP BY user_id',
      'DELETE FROM orders WHERE user_id > 12'
    ],
    correctIndex: 0,
    explanation: 'Using the `IN (...)` operator batches all child records into a single round-trip database query.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-20',
    question: 'If a database connection pool is initialized with `minimumIdle = 5` and `maximumPoolSize = 20`, how many connections are created upon server bootstrap?',
    options: ['5 pre-warmed idle connections', '20 connections immediately', '0 connections', '100 connections'],
    correctIndex: 0,
    explanation: 'HikariCP initializes `minimumIdle` connections immediately to handle initial traffic, scaling up to `maximumPoolSize` on demand.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-21',
    question: 'In the Cache-Aside pattern, what happens when an entity is UPDATED in the database?',
    options: [
      'The corresponding key in the cache must be invalidated (deleted) or updated to prevent stale data reads',
      'The cache is ignored completely',
      'The database query is canceled',
      'The server restarts'
    ],
    correctIndex: 0,
    explanation: 'Cache invalidation on write ensures subsequent reads observe fresh database state rather than stale cached copies.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-22',
    question: 'What is the role of a DTO Mapper library like MapStruct in Java or Pydantic in Python?',
    options: [
      'Automatically and efficiently generates compile-time code to copy properties between Entity and DTO objects with zero reflection overhead',
      'Translates code into Spanish',
      'Builds Docker container images',
      'Compresses database tables'
    ],
    correctIndex: 0,
    explanation: 'MapStruct generates type-safe, fast, and reflection-free bean-to-bean mapping code during compilation.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-23',
    question: 'When configuring CORS for an enterprise API, why is setting `Access-Control-Allow-Origin: *` dangerous when `Access-Control-Allow-Credentials: true`?',
    options: [
      'Browsers explicitly reject this combination as a critical security vulnerability: wildcard origin with credentials allows arbitrary third-party sites to steal authenticated user data',
      'It increases network packet size',
      'It causes JavaScript to crash',
      'It deletes browser cookies'
    ],
    correctIndex: 0,
    explanation: 'W3C CORS specifications strictly forbid wildcard origins when credentials (cookies, auth headers) are transmitted.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-24',
    question: 'What is the HTTP response status code when a client attempts to create an account with an email that already exists in a unique database index?',
    options: ['409 Conflict', '500 Internal Server Error', '404 Not Found', '200 OK'],
    correctIndex: 0,
    explanation: '409 Conflict indicates the request cannot be completed due to a conflict with current server state (duplicate unique constraint).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-25',
    question: 'In a microservice architecture, what happens if Service A calls Service B with a synchronous HTTP REST call, and Service B takes 45 seconds to respond?',
    options: [
      'Service A’s thread is blocked waiting for 45 seconds; under high traffic, this cascades thread pool exhaustion and takes down Service A as well',
      'Service A automatically cancels the request in 1 millisecond',
      'Service B is rebooted automatically',
      'The database handles the request directly'
    ],
    correctIndex: 0,
    explanation: 'Cascading latency failures are mitigated using Circuit Breakers (e.g. Resilience4j), tight timeouts, and async message queues.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-26',
    question: 'What is the purpose of the `Flyway` or `Liquibase` database migration tools in a backend project?',
    options: [
      'Version-controlling database schema alterations (DDL scripts) and applying migrations deterministically across development, testing, and production environments',
      'Compressing SQL databases into zip files',
      'Translating SQL queries into JavaScript',
      'Drawing ER diagrams automatically'
    ],
    correctIndex: 0,
    explanation: 'Database migration tools treat schema changes as immutable code commits, guaranteeing environment consistency.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-27',
    question: 'What is the primary vulnerability prevented by setting the `X-Content-Type-Options: nosniff` header?',
    options: [
      'MIME-type sniffing attacks where browsers execute malicious script masquerading as benign image files',
      'SQL injection attacks',
      'Denial of service network floods',
      'Password cracking'
    ],
    correctIndex: 0,
    explanation: '`nosniff` forces browsers to adhere strictly to declared MIME types, preventing user uploads from being interpreted as script.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-28',
    question: 'In a REST API returning a paginated list of products, which response structure follows industry best practices?',
    options: [
      'An object containing metadata (`totalItems`, `totalPages`, `currentPage`, `pageSize`) and a `data: [...]` array of product DTOs',
      'A raw unformatted string of comma-separated numbers',
      'Returning all 1,000,000 database rows in a single array',
      'Returning an HTML webpage'
    ],
    correctIndex: 0,
    explanation: 'Standardized envelope responses provide frontend clients with both content data and navigation pagination metadata.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-29',
    question: 'What does a composite database index on `(user_id, created_at DESC)` optimize?',
    options: [
      'Queries filtering by `user_id` and ordering by `created_at DESC` (e.g. fetching a user’s most recent orders) in a single B-Tree scan without in-memory file sorting',
      'Queries filtering exclusively by `email`',
      'Full-text search on product descriptions',
      'Deleting all historical rows'
    ],
    correctIndex: 0,
    explanation: 'Composite indexes fulfill both filtering and sorting predicates, eliminating expensive in-memory sort operations (`Using filesort`).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-30',
    question: 'What does the HTTP header `Cache-Control: no-store` instruct client browsers and intermediary proxies to do?',
    options: [
      'Do not cache or store any part of the request or response in any memory or disk cache; always fetch a fresh version from origin servers',
      'Store the response on disk forever',
      'Cache the response for exactly 24 hours',
      'Compress the response with gzip'
    ],
    correctIndex: 0,
    explanation: '`no-store` is critical for authenticated, sensitive, or financial endpoints to prevent browser history caching.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-31',
    question: 'What is a "Deadlock Victim" in relational database management systems (RDBMS)?',
    options: [
      'The transaction chosen by the database deadlock detection algorithm to be aborted and rolled back so that other transactions can complete',
      'A corrupted database table file',
      'A user whose account was banned',
      'A server whose CPU failed'
    ],
    correctIndex: 0,
    explanation: 'When cycle graphs are detected, database engines sacrifice the transaction with the least amount of completed work.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-32',
    question: 'In placement interviews, when an interviewer asks you to draw your project architecture, what should you draw first?',
    options: [
      'The 3 core tiers (Client UI -> Backend API Gateway & Services -> Relational Database / Cache) with arrows indicating request/response flow',
      'A picture of your university campus',
      'The detailed SQL schema of 50 tables with all columns',
      'Your personal Git commit history graph'
    ],
    correctIndex: 0,
    explanation: 'Starting with a clean 3-tier box-and-arrow diagram gives the interviewer immediate structural orientation.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-33',
    question: 'What is the purpose of an "Actuator" or health check endpoint (`/healthz` or `/actuator/health`) in production backends?',
    options: [
      'Provides automated liveness and readiness signals to load balancers and Kubernetes to determine if the container can accept traffic or needs restart',
      'Plays audio music on server speakers',
      'Resets developer passwords',
      'Deletes uncommitted git branches'
    ],
    correctIndex: 0,
    explanation: 'Health endpoints return HTTP 200 when databases and dependencies are reachable, guiding automated orchestrator routing.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-34',
    question: 'What is the benefit of using an asynchronous job worker (e.g. Celery in Python or Spring `@Async`) to send registration verification emails?',
    options: [
      'The user registration API responds instantly in < 50ms without blocking the user while connecting to third-party SMTP email servers',
      'It sends emails without needing an internet connection',
      'It bypasses spam filters automatically',
      'It encrypts email text using RSA'
    ],
    correctIndex: 0,
    explanation: 'Offloading slow, non-critical I/O to background workers keeps HTTP response latencies ultra-low.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-35',
    question: 'What does the HTTP status code `415 Unsupported Media Type` indicate?',
    options: [
      'The server refuses to accept the request because the payload format (e.g. sending XML when API expects JSON) is in an unsupported format',
      'The server hard drive has run out of memory',
      'The video player cannot play the requested file',
      'The user has not logged in'
    ],
    correctIndex: 0,
    explanation: '415 occurs when the client’s `Content-Type` header specifies a serialization format the server cannot parse.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-36',
    question: 'In Spring Boot or FastAPI, what is Dependency Injection (DI) and why is it beneficial?',
    options: [
      'Dependencies (services, repositories) are provided to a class from the outside by an IoC container rather than instantiated internally with `new`, enabling easy mocking and loose coupling',
      'Injecting raw SQL into database queries',
      'Downloading dependencies from GitHub at runtime',
      'Writing code without functions'
    ],
    correctIndex: 0,
    explanation: 'Dependency Injection enforces the Inversion of Control (IoC) principle, allowing mock repositories to be swapped in during unit testing.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-37',
    question: 'What is the primary role of a Content Delivery Network (CDN) like Cloudflare or AWS CloudFront in a full-stack web application?',
    options: [
      'Caching static assets (JS, CSS, images, video) at edge locations close to users worldwide, reducing origin server load and slashing page load latency',
      'Compiling Java backend applications in the cloud',
      'Executing database SQL migrations',
      'Generating user passwords'
    ],
    correctIndex: 0,
    explanation: 'CDNs cache static assets in edge data centers geographically proximate to clients, minimizing latency and transit costs.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-38',
    question: 'What does an HTTP `ETag` (Entity Tag) header enable in web caching?',
    options: [
      'Conditional request validation (`If-None-Match`): The server returns `304 Not Modified` if the resource has not changed, saving bandwidth',
      'Encrypts HTTP cookies with RSA',
      'Stores user tags for social media',
      'Counts the number of page views'
    ],
    correctIndex: 0,
    explanation: 'ETags provide fingerprinting for web resources: unchanged resources return 304 without transferring redundant body bytes.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-39',
    question: 'Why should you never commit your `.env` configuration file to version control repositories?',
    options: [
      '`.env` files contain private secret keys, database credentials, and API tokens that become permanently exposed if committed to Git',
      'Git cannot read files that begin with a dot',
      '`.env` files crash the compiler',
      '`.env` files take up too much disk space'
    ],
    correctIndex: 0,
    explanation: 'Committed secrets are permanently etched into Git history. Use `.env.example` templates and keep actual `.env` files gitignored.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-40',
    question: 'What is the purpose of Database Connection Pool "Leak Detection Threshold" (e.g. `leakDetectionThreshold = 2000` in HikariCP)?',
    options: [
      'Logs a stack trace warning if a thread holds a checked-out connection longer than the threshold, helping developers pinpoint unclosed connections',
      'Detects physical water leaks in server rooms',
      'Checks if database cables are disconnected',
      'Deletes corrupted database tables'
    ],
    correctIndex: 0,
    explanation: 'Leak detection flags code paths that fail to release connections back to the pool within expected time bounds.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-41',
    question: 'In full-stack development, what is a "Single Page Application" (SPA)?',
    options: [
      'A web application that interacts with the browser by dynamically rewriting the current web page with data from API calls, rather than reloading entire new pages from the server',
      'A website that has only one paragraph of text',
      'An application written in pure HTML without CSS',
      'A mobile app that runs on smartwatches only'
    ],
    correctIndex: 0,
    explanation: 'SPAs (built with React, Angular, Vue) load once and perform seamless client-side routing and DOM updates via REST APIs.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-42',
    question: 'What does the HTTP status code `405 Method Not Allowed` communicate to the API consumer?',
    options: [
      'The requested endpoint exists, but the HTTP verb used (e.g. POST to a read-only GET endpoint) is not supported for that resource',
      'The user has not logged in',
      'The server is experiencing high traffic',
      'The requested URL does not exist'
    ],
    correctIndex: 0,
    explanation: '405 indicates an invalid HTTP verb for the target route, often accompanied by an `Allow` header listing permitted methods.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-43',
    question: 'What is the role of an ORM "Cascade" setting (e.g. `CascadeType.ALL` in JPA)?',
    options: [
      'Automatically propagates entity state transitions (persist, merge, remove) from a parent entity to its associated child entities',
      'Deletes the database schema when an error occurs',
      'Creates waterfall charts in Excel',
      'Connects multiple CSS stylesheets'
    ],
    correctIndex: 0,
    explanation: 'Cascading ensures operations on parent aggregates (e.g. deleting an Order) automatically cascade to its children (OrderItems).',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-44',
    question: 'Why is it critical to validate user inputs on the backend server even if validation is already performed on the frontend client UI?',
    options: [
      'Frontend validation can be trivially bypassed by attackers using Postman, curl, or custom HTTP scripts; only backend validation guarantees data integrity',
      'Frontend validation is unreliable in Google Chrome',
      'Backend validation runs 100x faster than frontend validation',
      'Databases refuse to execute queries if backend validation is missing'
    ],
    correctIndex: 0,
    explanation: 'The client is untrusted: client-side checks improve user experience, but server-side validation enforces non-negotiable security.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-45',
    question: 'What is a "Composite Primary Key" in relational databases?',
    options: [
      'A primary key composed of two or more columns that together uniquely identify an entity row (e.g. `order_id` and `product_id` in an order_items join table)',
      'A primary key created by concatenating two strings in Java',
      'A primary key that is encrypted with AES',
      'A primary key that changes value every day'
    ],
    correctIndex: 0,
    explanation: 'Composite keys enforce uniqueness across multi-attribute combinations, commonly employed in many-to-many relationship join tables.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-46',
    question: 'What does the HTTP header `Strict-Transport-Security: max-age=31536000; includeSubDomains` (HSTS) enforce?',
    options: [
      'Instructs browsers that the website must only be accessed using HTTPS, preventing protocol downgrade attacks and cookie interception over HTTP',
      'Prevents users from downloading images',
      'Limits website traffic to 31 million users',
      'Enables high-speed network routing'
    ],
    correctIndex: 0,
    explanation: 'HSTS eliminates man-in-the-middle attacks by forcing browsers to communicate strictly over encrypted HTTPS connections.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-47',
    question: 'In API architecture, what is "Rate Limiting" and which algorithm is commonly used to implement it?',
    options: [
      'Restricting the rate of requests a client can submit to protect services from abuse; commonly implemented using the Token Bucket or Leaky Bucket algorithm',
      'Measuring internet download speed using Ookla',
      'Limiting the number of tables in a database',
      'Limiting the number of lines in a function'
    ],
    correctIndex: 0,
    explanation: 'Token bucket rate limiters allow burst traffic while maintaining an average rate ceiling, protecting services from Denial of Service.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-48',
    question: 'What does a `304 Not Modified` HTTP status code save in terms of network transmission?',
    options: [
      'Saves the entire response payload body transmission because the client already possesses the latest cached version matching the server’s ETag',
      'Saves battery power on the client phone',
      'Saves database storage space',
      'Saves developer compilation time'
    ],
    correctIndex: 0,
    explanation: '304 responses contain only headers without a message body, saving bandwidth and slashing page render times.',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-49',
    question: 'What is "Database Normalization" (up to Third Normal Form - 3NF)?',
    options: [
      'Organizing database tables and columns to reduce data redundancy and eliminate insert, update, and delete anomalies by ensuring non-key attributes depend only on the primary key',
      'Converting all text data to uppercase letters',
      'Resetting database passwords to default values',
      'Deleting all foreign keys'
    ],
    correctIndex: 0,
    explanation: '3NF ensures: "Every non-key attribute must provide a fact about the key, the whole key, and nothing but the key, so help me Codd."',
    category: 'Practical Execution & Trace (70%)'
  },
  {
    id: 'd9-post-50',
    question: 'When asked by an interviewer to explain the biggest bug you resolved in your project, what makes an outstanding response?',
    options: [
      'Describing a real bug (e.g. race condition under concurrent checkouts, database pool exhaustion, or an N+1 query), explaining how you debugged and measured it, and walking through the architectural fix and regression test',
      'Claiming that you have never written a bug in your life',
      'Blaming a team partner for making a mistake',
      'Explaining a simple missing semicolon that took 5 seconds to fix'
    ],
    correctIndex: 0,
    explanation: 'Discussing complex technical triage, root cause analysis, and preventative regression testing proves deep real-world engineering capability.',
    category: 'Practical Execution & Trace (70%)'
  }
];
