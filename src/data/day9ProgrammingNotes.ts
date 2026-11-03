import { ProgrammingNote } from '../types';

/**
 * SPSU Udaipur Placement Readiness Program
 * Mentor: Kapil | Day 9: Full-Stack Development & Project Architecture Readiness
 * 5 Comprehensive Masterclass Notes with Complete Polyglot Code (C, C++, Java, Python)
 */
export const DAY_9_PROGRAMMING_NOTES: ProgrammingNote[] = [
  // NOTE 1
  {
    id: 'd9-note-1',
    title: 'Enterprise 3-Tier Architecture: Presentation, Business Logic & Data Tier',
    conceptSummary:
      'Enterprise software adheres to the 3-Tier Architecture to enforce separation of concerns, scalability, and testability. 1) Presentation Tier: Handles user interaction, client UI rendering (React/HTML/JS), and HTTP request/response serialization. 2) Application / Business Logic Tier (Controllers & Services): Controllers handle endpoint routing and DTO validation; Services orchestrate business rules, calculations, and transactional boundaries. 3) Data Tier (DAOs / Repositories): Manages persistence with databases (MySQL, PostgreSQL) via connection pools and ORMs. Data Transfer Objects (DTOs) decouple internal database entities from external client contracts.',
    timeSpaceNote: 'DTO Transformation & In-Memory Validation: O(K) where K is number of fields in the DTO.',
    kapilMentorTip:
      'Never expose your raw Database Entities (`@Entity` / ORM models) directly in HTTP Controller responses. Always map entities to DTOs. Exposing entities leaks sensitive fields (like password hashes, internal IDs) and tightly couples database schema to external API contracts.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

// 1. Data Tier: Database Model
typedef struct {
    int id;
    char username[32];
    char passwordHash[64];
    char email[64];
    bool isActive;
} UserEntity;

// 2. Presentation Tier: Data Transfer Object (DTO) - Strips internal sensitive fields
typedef struct {
    int id;
    char username[32];
    char email[64];
} UserResponseDTO;

// 3. Service Layer: Entity to DTO Mapper
UserResponseDTO mapToDTO(const UserEntity* entity) {
    UserResponseDTO dto;
    dto.id = entity->id;
    strncpy(dto.username, entity->username, sizeof(dto.username));
    strncpy(dto.email, entity->email, sizeof(dto.email));
    return dto;
}

int main() {
    // Simulated Database Record
    UserEntity dbUser = {101, "kapil_narula", "$2a$12$e8e...secretHash", "kapil@spsu.ac.in", true};
    UserResponseDTO clientResponse = mapToDTO(&dbUser);

    printf("3-Tier Architecture DTO Mapping Result:\\n");
    printf("  [Client Safe] ID: %d | Username: %s | Email: %s\\n",
           clientResponse.id, clientResponse.username, clientResponse.email);
    printf("  [Security Invariant] Sensitive passwordHash stripped from response.\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

// Data Tier: Database Model
struct UserEntity {
    int id;
    std::string username;
    std::string passwordHash;
    std::string email;
    bool isActive;
};

// Presentation Tier: Safe Client DTO
struct UserResponseDTO {
    int id;
    std::string username;
    std::string email;
};

// Service Tier: Business Mapping
class UserService {
public:
    static UserResponseDTO toDTO(const UserEntity& entity) {
        return UserResponseDTO{entity.id, entity.username, entity.email};
    }
};

int main() {
    UserEntity dbUser{101, "kapil_narula", "$2a$12$e8e...secretHash", "kapil@spsu.ac.in", true};
    UserResponseDTO response = UserService::toDTO(dbUser);

    std::cout << "3-Tier Architecture DTO Mapping Result:\\n";
    std::cout << "  [Client Safe] ID: " << response.id << " | Username: " << response.username
              << " | Email: " << response.email << "\\n";
    std::cout << "  [Security Invariant] Sensitive passwordHash stripped from response.\\n";
    return 0;
}`,
      java: `public class ThreeTierArchitecture {
    // Data Tier: Entity
    public record UserEntity(int id, String username, String passwordHash, String email, boolean active) {}

    // Presentation Tier: DTO
    public record UserResponseDTO(int id, String username, String email) {}

    // Service Tier: Mapper
    public static UserResponseDTO mapToDTO(UserEntity entity) {
        return new UserResponseDTO(entity.id(), entity.username(), entity.email());
    }

    public static void main(String[] args) {
        UserEntity dbUser = new UserEntity(101, "kapil_narula", "$2a$12$e8e...secretHash", "kapil@spsu.ac.in", true);
        UserResponseDTO response = mapToDTO(dbUser);

        System.out.println("3-Tier Architecture DTO Mapping Result:");
        System.out.printf("  [Client Safe] ID: %d | Username: %s | Email: %s%n",
            response.id(), response.username(), response.email());
        System.out.println("  [Security Invariant] Sensitive passwordHash stripped from response.");
    }
}`,
      python: `from dataclasses import dataclass

@dataclass(frozen=True)
class UserEntity:
    id: int
    username: str
    password_hash: str
    email: str
    is_active: bool

@dataclass(frozen=True)
class UserResponseDTO:
    id: int
    username: str
    email: str

def map_to_dto(entity: UserEntity) -> UserResponseDTO:
    return UserResponseDTO(id=entity.id, username=entity.username, email=entity.email)

if __name__ == "__main__":
    db_user = UserEntity(101, "kapil_narula", "$2a$12$e8e...secretHash", "kapil@spsu.ac.in", True)
    response = map_to_dto(db_user)

    print("3-Tier Architecture DTO Mapping Result:")
    print(f"  [Client Safe] ID: {response.id} | Username: {response.username} | Email: {response.email}")
    print("  [Security Invariant] Sensitive password_hash stripped from response.")`,
    },
  },

  // NOTE 2
  {
    id: 'd9-note-2',
    title: 'The Backend REST Request Lifecycle: Dispatcher, Middleware & Controllers',
    conceptSummary:
      'Understanding what happens when an HTTP request arrives at a backend server (Spring Boot, FastAPI, Express): 1) Network Socket receives raw HTTP bytes; 2) Dispatcher Servlet / Gateway routes to middleware pipeline; 3) Middleware Interceptors run authentication (JWT bearer token verification), CORS headers, rate limiting, and request logging; 4) Parameter Deserialization maps JSON request body to a typed DTO with input validation (e.g. Hibernate Validator / Pydantic); 5) Controller routes call to Service layer; 6) Service processes business rules in an ACID transaction; 7) Response is formatted as standard JSON with HTTP status code (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error).',
    timeSpaceNote: 'Middleware Chain: O(M) where M is the number of registered filter stages.',
    kapilMentorTip:
      'In technical interviews, when asked "What happens when an API is called?", do not just jump to database queries. Walk through the entire pipeline: DNS resolution -> Reverse Proxy -> SSL termination -> Middleware auth filter -> Controller -> Service -> DAO connection acquisition -> DB execution -> JSON serialization.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

// Middleware Pipeline Demonstration
typedef struct {
    const char* path;
    const char* authHeader;
    int payloadSize;
} HttpRequest;

typedef struct {
    int statusCode;
    const char* body;
} HttpResponse;

bool authMiddleware(const HttpRequest* req) {
    return (req->authHeader != NULL && strncmp(req->authHeader, "Bearer ", 7) == 0);
}

bool rateLimitMiddleware(const HttpRequest* req) {
    return req->payloadSize <= 4096; // 4KB limit
}

HttpResponse handleRequest(const HttpRequest* req) {
    if (!authMiddleware(req)) {
        return (HttpResponse){401, "{\\"error\\": \\"Unauthorized: Invalid Token\\"}"};
    }
    if (!rateLimitMiddleware(req)) {
        return (HttpResponse){429, "{\\"error\\": \\"Payload Too Large\\"}"};
    }
    return (HttpResponse){200, "{\\"status\\": \\"success\\", \\"data\\": \\"Resource Fetched\\"}"};
}

int main() {
    HttpRequest validReq = {"/api/v1/profile", "Bearer valid_jwt_token", 512};
    HttpRequest unauthReq = {"/api/v1/profile", NULL, 512};

    HttpResponse res1 = handleRequest(&validReq);
    HttpResponse res2 = handleRequest(&unauthReq);

    printf("Request 1 Status: %d | Body: %s\\n", res1.statusCode, res1.body);
    printf("Request 2 Status: %d | Body: %s\\n", res2.statusCode, res2.body);
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

struct HttpRequest {
    std::string path;
    std::string authHeader;
    int payloadSize;
};

struct HttpResponse {
    int statusCode;
    std::string body;
};

class RequestPipeline {
public:
    static HttpResponse process(const HttpRequest& req) {
        // Middleware 1: Auth
        if (req.authHeader.rfind("Bearer ", 0) != 0) {
            return {401, "{\\"error\\": \\"Unauthorized: Missing Bearer Token\\"}"};
        }
        // Middleware 2: Rate/Size check
        if (req.payloadSize > 4096) {
            return {429, "{\\"error\\": \\"Payload Exceeds Limit\\"}"};
        }
        // Controller Execution
        return {200, "{\\"status\\": \\"success\\", \\"path\\": \\"" + req.path + "\\"}"};
    }
};

int main() {
    HttpRequest req1{"/api/v1/users", "Bearer jwt.xyz.123", 1024};
    HttpRequest req2{"/api/v1/users", "Basic user:pass", 1024};

    HttpResponse res1 = RequestPipeline::process(req1);
    HttpResponse res2 = RequestPipeline::process(req2);

    std::cout << "Request 1: HTTP " << res1.statusCode << " -> " << res1.body << "\\n";
    std::cout << "Request 2: HTTP " << res2.statusCode << " -> " << res2.body << "\\n";
    return 0;
}`,
      java: `public class RequestLifecycle {
    public record HttpRequest(String path, String authHeader, int payloadBytes) {}
    public record HttpResponse(int statusCode, String body) {}

    public static HttpResponse handle(HttpRequest req) {
        // Middleware 1: Authentication Check
        if (req.authHeader() == null || !req.authHeader().startsWith("Bearer ")) {
            return new HttpResponse(401, "{\"error\": \"Unauthorized: Missing Bearer Token\"}");
        }
        // Middleware 2: Size Limit
        if (req.payloadBytes() > 4096) {
            return new HttpResponse(429, "{\"error\": \"Payload Exceeds 4KB Limit\"}");
        }
        // Controller execution
        return new HttpResponse(200, "{\"status\": \"success\", \"path\": \"" + req.path() + "\"}");
    }

    public static void main(String[] args) {
        HttpRequest req1 = new HttpRequest("/api/v1/orders", "Bearer valid.jwt.signature", 512);
        HttpRequest req2 = new HttpRequest("/api/v1/orders", "InvalidHeader", 512);

        System.out.println("Request 1: " + handle(req1));
        System.out.println("Request 2: " + handle(req2));
    }
}`,
      python: `from dataclasses import dataclass
from typing import Optional, Dict

@dataclass(frozen=True)
class HttpRequest:
    path: str
    auth_header: Optional[str]
    payload_bytes: int

@dataclass(frozen=True)
class HttpResponse:
    status_code: int
    body: str

def handle_request(req: HttpRequest) -> HttpResponse:
    # Middleware 1: Auth
    if not req.auth_header or not req.auth_header.startswith("Bearer "):
        return HttpResponse(401, '{"error": "Unauthorized"}')
    # Middleware 2: Payload bound
    if req.payload_bytes > 4096:
        return HttpResponse(429, '{"error": "Payload Too Large"}')
    return HttpResponse(200, f'{{"status": "success", "path": "{req.path}"}}')

if __name__ == "__main__":
    req1 = HttpRequest("/api/v1/items", "Bearer valid.token.here", 256)
    req2 = HttpRequest("/api/v1/items", None, 256)
    print("Request 1:", handle_request(req1))
    print("Request 2:", handle_request(req2))`,
    },
  },

  // NOTE 3
  {
    id: 'd9-note-3',
    title: 'Database Connection Pooling & SQL Injection Defense via Prepared Statements',
    conceptSummary:
      'Creating a new TCP connection and authenticating with MySQL or PostgreSQL for every single HTTP request incurs 50-100ms latency overhead and crashes database servers under concurrency. Production backends utilize Connection Pools (such as HikariCP in Java or SQLAlchemy in Python): a pool of pre-established database connections (e.g. size 20-50) is maintained in memory. Threads checkout a connection, execute queries, and return it to the pool in < 2ms. Crucially, raw string concatenation (such as "SELECT * FROM users WHERE user = " + input) enables SQL Injection (SQLi). Backends MUST use Parameterized Queries (PreparedStatements) where user input is treated strictly as literal data, never executable SQL.',
    timeSpaceNote: 'PreparedStatement compilation: Cached once by database query planner; re-executed in O(1).',
    kapilMentorTip:
      'Never explain database interactions by saying "I wrote queries in code". Emphasize that you used Parameterized PreparedStatements with connection pooling (e.g. HikariCP with pool-size=20, connectionTimeout=30000ms) to ensure resilience against SQL injection and thread pool exhaustion.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

// Parameterized Query Simulation vs Vulnerable String Concatenation
void vulnerableQuery(const char* userInput) {
    char sql[256];
    // VULNERABLE: Direct string interpolation allows: admin' OR '1'='1
    snprintf(sql, sizeof(sql), "SELECT * FROM users WHERE username = '%s'", userInput);
    printf("  [VULNERABLE QUERY]: %s\\n", sql);
}

void safeParameterizedQuery(const char* userInput) {
    // SAFE: The DB parses the AST template first, treating user input purely as literal parameter ?
    printf("  [PREPARED STATEMENT TEMPLATE]: SELECT * FROM users WHERE username = ?\\n");
    printf("  [BOUND PARAMETER LITERAL]:     Param 1 = \\"%s\\" (Escaped / Non-Executable)\\n", userInput);
}

int main() {
    const char* maliciousPayload = "admin' OR '1'='1";
    printf("Demonstrating SQL Injection Defense:\\n");
    printf("Attack Input: %s\\n\\n", maliciousPayload);

    vulnerableQuery(maliciousPayload);
    printf("\\n");
    safeParameterizedQuery(maliciousPayload);
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

class DatabaseSecurityDemo {
public:
    static void executeVulnerable(const std::string& input) {
        std::string sql = "SELECT * FROM users WHERE username = '" + input + "'";
        std::cout << "  [VULNERABLE QUERY]: " << sql << "\\n";
    }

    static void executeSafe(const std::string& input) {
        std::cout << "  [PREPARED STATEMENT TEMPLATE]: SELECT * FROM users WHERE username = ?\\n";
        std::cout << "  [BOUND PARAMETER LITERAL]:     Param 1 = \\"" << input << "\\" (Escaped / Non-Executable)\\n";
    }
};

int main() {
    std::string attackPayload = "admin' OR '1'='1";
    std::cout << "Demonstrating SQL Injection Defense:\\n";
    std::cout << "Attack Input: " << attackPayload << "\\n\\n";

    DatabaseSecurityDemo::executeVulnerable(attackPayload);
    std::cout << "\\n";
    DatabaseSecurityDemo::executeSafe(attackPayload);
    return 0;
}`,
      java: `public class DatabaseSecurityDemo {
    public static void executeVulnerable(String input) {
        String sql = "SELECT * FROM users WHERE username = '" + input + "'";
        System.out.println("  [VULNERABLE QUERY]: " + sql);
    }

    public static void executeSafe(String input) {
        System.out.println("  [PREPARED STATEMENT TEMPLATE]: SELECT * FROM users WHERE username = ?");
        System.out.println("  [BOUND PARAMETER LITERAL]:     Param 1 = \"" + input + "\" (Escaped / Non-Executable)");
    }

    public static void main(String[] args) {
        String payload = "admin' OR '1'='1";
        System.out.println("Demonstrating SQL Injection Defense:");
        System.out.println("Attack Input: " + payload + "\n");

        executeVulnerable(payload);
        System.out.println();
        executeSafe(payload);
    }
}`,
      python: `def execute_vulnerable(user_input: str) -> None:
    sql = f"SELECT * FROM users WHERE username = '{user_input}'"
    print(f"  [VULNERABLE QUERY]: {sql}")

def execute_safe(user_input: str) -> None:
    print("  [PREPARED STATEMENT TEMPLATE]: SELECT * FROM users WHERE username = %s")
    print(f'  [BOUND PARAMETER LITERAL]:     Param 1 = "{user_input}" (Escaped / Non-Executable)')

if __name__ == "__main__":
    payload = "admin' OR '1'='1"
    print("Demonstrating SQL Injection Defense:")
    print("Attack Input:", payload, "\n")
    execute_vulnerable(payload)
    print()
    execute_safe(payload)`,
    },
  },

  // NOTE 4
  {
    id: 'd9-note-4',
    title: 'The 4-Step Project Defense Framework for Tech Placement Interviews',
    conceptSummary:
      'In campus placement and lateral hiring rounds, 40-50% of the interview evaluates your ability to articulate your academic or personal capstone project. Kapil’s 4-Step Project Defense Framework: 1) Business Context & Problem Statement (What real-world pain point did this solve? Who are the users?); 2) High-Level Architecture (Walk through the 3-tier diagram: Frontend React UI -> Spring Boot/FastAPI REST API -> MySQL & Redis Cache); 3) Individual Technical Contributions & Deep-Dive (Which specific modules did YOU author? What challenges did you face? e.g. handling race conditions in inventory checkout, optimizing slow joins with composite indexes); 4) Quantitative Metrics & Trade-offs (What were the performance numbers? Why choose PostgreSQL over MongoDB? What would you improve in v2?).',
    timeSpaceNote: 'Pitch Duration: 2-3 minutes for the high-level overview, then invite deep dives.',
    kapilMentorTip:
      'Never describe your project as "just a simple CRUD application". Frame it through architectural trade-offs: "I built a high-throughput transaction platform featuring JWT-secured stateless REST endpoints, connection-pooled relational persistence, and Redis caching to reduce database read load by 65%."',
    codeByLanguage: {
      c: `#include <stdio.h>

// The 4-Step Project Defense Script Simulator
void deliverProjectWalkthrough() {
    printf("=== The 4-Step Placement Project Defense Framework ===\\n\\n");
    printf("Step 1: Problem Statement & Value Proposition:\\n");
    printf("  'We built a distributed campus placement portal to eliminate manual PDF resume verification\\n");
    printf("   and support real-time assessment score tracking across 500+ simultaneous students.'\\n\\n");

    printf("Step 2: Architecture & Technology Stack:\\n");
    printf("  'We utilized a 3-tier decoupled architecture: React frontend communicating over HTTPS REST\\n");
    printf("   with a Spring Boot backend, backed by PostgreSQL for ACID transaction integrity and Redis for caching.'\\n\\n");

    printf("Step 3: Individual Contribution & Technical Hurdles:\\n");
    printf("  'I engineered the real-time scoring engine and authentication middleware. When concurrent quiz submissions\\n");
    printf("   caused database connection pool timeouts, I introduced batch inserts and connection pooling.'\\n\\n");

    printf("Step 4: Quantitative Results & Trade-Offs:\\n");
    printf("  'Reduced p95 API response latency from 450ms to 65ms, handled 1,200 requests/sec with zero deadlocks.'\\n");
}

int main() {
    deliverProjectWalkthrough();
    return 0;
}`,
      cpp: `#include <iostream>

void deliverProjectWalkthrough() {
    std::cout << "=== The 4-Step Placement Project Defense Framework ===\\n\\n";
    std::cout << "Step 1: Problem Statement & Value Proposition:\\n";
    std::cout << "  'We built a distributed campus placement portal to eliminate manual resume verification\\n";
    std::cout << "   and support real-time assessment score tracking across 500+ simultaneous students.'\\n\\n";

    std::cout << "Step 2: Architecture & Technology Stack:\\n";
    std::cout << "  'We utilized a 3-tier decoupled architecture: React frontend communicating over HTTPS REST\\n";
    std::cout << "   with a Spring Boot backend, backed by PostgreSQL for ACID transactions and Redis for caching.'\\n\\n";

    std::cout << "Step 3: Individual Contribution & Technical Hurdles:\\n";
    std::cout << "  'I engineered the real-time scoring engine. When concurrent quiz submissions caused DB pool\\n";
    std::cout << "   starvation, I implemented HikariCP tuning and batch writes.'\\n\\n";

    std::cout << "Step 4: Quantitative Results & Trade-Offs:\\n";
    std::cout << "  'Reduced p95 API latency from 450ms to 65ms, handled 1,200 req/sec with zero deadlocks.'\\n";
}

int main() {
    deliverProjectWalkthrough();
    return 0;
}`,
      java: `public class ProjectDefenseFramework {
    public static void deliverWalkthrough() {
        System.out.println("=== The 4-Step Placement Project Defense Framework ===\n");
        System.out.println("Step 1: Problem Statement & Value Proposition:");
        System.out.println("  'We built a campus placement portal to eliminate manual resume verification");
        System.out.println("   and support real-time score tracking across 500+ concurrent students.'\n");

        System.out.println("Step 2: Architecture & Technology Stack:");
        System.out.println("  'We utilized a 3-tier decoupled architecture: React frontend, Spring Boot backend,");
        System.out.println("   PostgreSQL for ACID persistence, and Redis for caching session state.'\n");

        System.out.println("Step 3: Individual Contribution & Technical Hurdles:");
        System.out.println("  'I architected the assessment submission pipeline. Under high concurrency,");
        System.out.println("   I tuned connection pools and implemented optimistic locking to eliminate write contention.'\n");

        System.out.println("Step 4: Quantitative Results & Trade-Offs:");
        System.out.println("  'Reduced p95 latency from 450ms to 65ms, supporting 1,200 req/sec with zero data loss.'");
    }

    public static void main(String[] args) {
        deliverWalkthrough();
    }
}`,
      python: `def deliver_project_walkthrough() -> None:
    print("=== The 4-Step Placement Project Defense Framework ===\\n")
    print("Step 1: Problem Statement & Value Proposition:")
    print("  'We built a campus placement portal to eliminate manual resume verification")
    print("   and support real-time score tracking across 500+ concurrent students.'\\n")

    print("Step 2: Architecture & Technology Stack:")
    print("  'We utilized a 3-tier decoupled architecture: React frontend, Spring Boot/FastAPI backend,")
    print("   PostgreSQL for ACID persistence, and Redis for caching session state.'\\n")

    print("Step 3: Individual Contribution & Technical Hurdles:")
    print("  'I architected the assessment submission pipeline. Under high concurrency,")
    print("   I tuned connection pools and implemented optimistic locking to eliminate write contention.'\\n")

    print("Step 4: Quantitative Results & Trade-Offs:")
    print("  'Reduced p95 latency from 450ms to 65ms, supporting 1,200 req/sec with zero data loss.'")

if __name__ == "__main__":
    deliver_project_walkthrough()`,
    },
  },

  // NOTE 5
  {
    id: 'd9-note-5',
    title: 'Web Application Security Essentials: OWASP Top 10, JWT & CORS',
    conceptSummary:
      'Production web applications must defend against standard OWASP security vectors: 1) Cross-Origin Resource Sharing (CORS): Browsers restrict frontend scripts from requesting APIs on different domains unless the server returns explicit `Access-Control-Allow-Origin` headers. Never use `*` with credentials! 2) JSON Web Tokens (JWT): Compact, URL-safe tokens with Header.Payload.Signature. Always verify HMAC-SHA256 or RSA signatures; keep tokens stateless and short-lived (e.g. 15 mins) paired with HttpOnly refresh cookies. 3) Cross-Site Scripting (XSS): Sanitizing user inputs and escaping HTML outputs before rendering to prevent malicious JS injection. 4) Cross-Site Request Forgery (CSRF): Defended via SameSite=Strict cookies and anti-CSRF token headers for state-changing POST/PUT requests.',
    timeSpaceNote: 'JWT Signature Verification: O(K) where K is token byte length.',
    kapilMentorTip:
      'Never store access tokens in `localStorage` in browser applications because any XSS vulnerability can read `localStorage` and steal credentials. Store refresh tokens in `HttpOnly; Secure; SameSite=Strict` cookies which JavaScript cannot read.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

// CORS Header Security Validator
typedef struct {
    const char* origin;
    bool allowCredentials;
} CorsConfig;

bool validateCorsHeaders(const CorsConfig* config, const char* requestOrigin) {
    // SECURITY RULE: Never allow wildcard '*' when allowCredentials is true
    if (strcmp(config->origin, "*") == 0 && config->allowCredentials) {
        printf("  [SECURITY VIOLATION]: Wildcard '*' origin forbidden when credentials=true!\\n");
        return false;
    }
    if (strcmp(config->origin, requestOrigin) == 0) {
        printf("  [CORS APPROVED]: Origin %s explicitly trusted.\\n", requestOrigin);
        return true;
    }
    printf("  [CORS BLOCKED]: Origin %s disallowed.\\n", requestOrigin);
    return false;
}

int main() {
    CorsConfig secureConfig = {"https://spsu.ac.in", true};
    CorsConfig insecureConfig = {"*", true};

    printf("Validating CORS Security Policies:\\n");
    validateCorsHeaders(&secureConfig, "https://spsu.ac.in");
    validateCorsHeaders(&secureConfig, "https://malicious-site.com");
    validateCorsHeaders(&insecureConfig, "https://any.com");
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

struct CorsConfig {
    std::string origin;
    bool allowCredentials;
};

class SecurityEngine {
public:
    static bool validateCors(const CorsConfig& config, const std::string& requestOrigin) {
        if (config.origin == "*" && config.allowCredentials) {
            std::cout << "  [SECURITY VIOLATION]: Wildcard '*' forbidden when credentials=true!\\n";
            return false;
        }
        if (config.origin == requestOrigin) {
            std::cout << "  [CORS APPROVED]: Origin " << requestOrigin << " explicitly trusted.\\n";
            return true;
        }
        std::cout << "  [CORS BLOCKED]: Origin " << requestOrigin << " disallowed.\\n";
        return false;
    }
};

int main() {
    CorsConfig secure{"https://spsu.ac.in", true};
    CorsConfig insecure{"*", true};

    std::cout << "Validating CORS Security Policies:\\n";
    SecurityEngine::validateCors(secure, "https://spsu.ac.in");
    SecurityEngine::validateCors(secure, "https://malicious-site.com");
    SecurityEngine::validateCors(insecure, "https://any.com");
    return 0;
}`,
      java: `public class WebSecurityEssentials {
    public record CorsConfig(String origin, boolean allowCredentials) {}

    public static boolean validateCors(CorsConfig config, String requestOrigin) {
        if ("*".equals(config.origin()) && config.allowCredentials()) {
            System.out.println("  [SECURITY VIOLATION]: Wildcard '*' forbidden when credentials=true!");
            return false;
        }
        if (config.origin().equals(requestOrigin)) {
            System.out.printf("  [CORS APPROVED]: Origin %s explicitly trusted.%n", requestOrigin);
            return true;
        }
        System.out.printf("  [CORS BLOCKED]: Origin %s disallowed.%n", requestOrigin);
        return false;
    }

    public static void main(String[] args) {
        CorsConfig secure = new CorsConfig("https://spsu.ac.in", true);
        CorsConfig insecure = new CorsConfig("*", true);

        System.out.println("Validating CORS Security Policies:");
        validateCors(secure, "https://spsu.ac.in");
        validateCors(secure, "https://malicious-site.com");
        validateCors(insecure, "https://any.com");
    }
}`,
      python: `from dataclasses import dataclass

@dataclass(frozen=True)
class CorsConfig:
    origin: str
    allow_credentials: bool

def validate_cors(config: CorsConfig, request_origin: str) -> bool:
    if config.origin == "*" and config.allow_credentials:
        print("  [SECURITY VIOLATION]: Wildcard '*' forbidden when credentials=true!")
        return False
    if config.origin == request_origin:
        print(f"  [CORS APPROVED]: Origin {request_origin} explicitly trusted.")
        return True
    print(f"  [CORS BLOCKED]: Origin {request_origin} disallowed.")
    return False

if __name__ == "__main__":
    secure = CorsConfig("https://spsu.ac.in", True)
    insecure = CorsConfig("*", True)

    print("Validating CORS Security Policies:")
    validate_cors(secure, "https://spsu.ac.in")
    validate_cors(secure, "https://malicious-site.com")
    validate_cors(insecure, "https://any.com")`,
    },
  },
];
