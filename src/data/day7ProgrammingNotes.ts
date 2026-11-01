import { ProgrammingNote } from '../types';

/**
 * Day 7 Comprehensive Programming Notes & Solved Examples
 * Module 7: Computer Networks, Protocols & REST Security
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 * Covers:
 * - Note 1: OSI 7-Layer vs TCP/IP Stack, PDU Encapsulation & Wire Flow
 * - Note 2: TCP 3-Way Handshake, Sliding Window Flow Control & 4-Way Teardown
 * - Note 3: IPv4 CIDR Bitwise Subnetting, Masking & Longest Prefix Match Routing
 * - Note 4: DNS Resolution Architecture, Port Multiplexing & Socket Programming
 * - Note 5: HTTP/1.1 vs HTTP/2/3, TLS 1.3 Cryptographic Handshake & REST API Security
 */
export const DAY_7_PROGRAMMING_NOTES: ProgrammingNote[] = [
  {
    id: 'd7-note-1',
    title: 'OSI 7-Layer Model vs TCP/IP Protocol Suite & Packet Encapsulation',
    conceptSummary:
      'Computer networks structure communications into layered abstractions where each layer provides services to the layer above and consumes services from the layer below.\n\n1. The OSI 7-Layer Architecture:\n   - Layer 7: Application (HTTP, HTTPS, DNS, SSH, FTP, SMTP)\n   - Layer 6: Presentation (Data serialization, JSON, XML, TLS encryption, compression)\n   - Layer 5: Session (RPC sessions, session checkpoints)\n   - Layer 4: Transport (TCP, UDP - Port addressing, process-to-process communication, segmentation)\n   - Layer 3: Network (IPv4, IPv6, ICMP, BGP, OSPF - Logical IP addressing, packet routing across routers)\n   - Layer 2: Data Link (Ethernet, Wi-Fi 802.11, ARP - 48-bit MAC addressing, frame creation, error detection via CRC-32)\n   - Layer 1: Physical (Cables, optical fiber, radio frequencies - Raw bit transmission 0s and 1s)\n\n2. Protocol Data Unit (PDU) Encapsulation:\n   - Application Payload -> Add TCP Header (Segment) -> Add IP Header (Packet) -> Add Ethernet Header + Trailer (Frame) -> Bits.\n   - At each intermediate hop, a router decapsulates up to Layer 3 (reads destination IP) to consult its routing table, then re-encapsulates with the next-hop MAC address.',
    timeSpaceNote:
      'PDU Encapsulation / Decapsulation: O(1) header insertion / extraction | Frame Check Sequence (CRC-32): O(N) over packet bytes.',
    kapilMentorTip:
      'FAANG Interview Classic: "What is the difference between a Layer 2 Switch and a Layer 3 Router?" A switch forwards frames based on physical 48-bit MAC addresses within a single local broadcast domain (Layer 2). A router inspects logical 32-bit/128-bit IP addresses (Layer 3) to forward packets between different networks across the global Internet.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>

// PDU Header Encapsulation Simulation in C
typedef struct {
    char data[128];
} ApplicationData;

typedef struct {
    unsigned short srcPort;
    unsigned short dstPort;
    unsigned int seqNum;
    ApplicationData payload;
} TcpSegment;

typedef struct {
    unsigned int srcIp;
    unsigned int dstIp;
    unsigned char protocol; // 6 for TCP
    TcpSegment payload;
} IpPacket;

void displayEncapsulation(const char *msg) {
    IpPacket packet;
    packet.srcIp = 0x0A000001; // 10.0.0.1
    packet.dstIp = 0xC0A80101; // 192.168.1.1
    packet.protocol = 6;
    packet.payload.srcPort = 54321;
    packet.payload.dstPort = 80;
    packet.payload.seqNum = 1001;
    strncpy(packet.payload.payload.data, msg, 127);

    printf("=== PACKET ENCAPSULATION ===\\n");
    printf("Layer 3 Network IP   : Src 10.0.0.1 -> Dst 192.168.1.1 (Protocol: TCP)\\n");
    printf("Layer 4 Transport TCP: Src Port %u -> Dst Port %u (Seq %u)\\n",
           packet.payload.srcPort, packet.payload.dstPort, packet.payload.seqNum);
    printf("Layer 7 App Payload  : \\"%s\\"\\n", packet.payload.payload.data);
}

int main() {
    displayEncapsulation("GET /api/v1/inbox HTTP/1.1");
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

struct Packet {
    string srcIp;
    string dstIp;
    int srcPort;
    int dstPort;
    string payload;

    void trace() const {
        cout << "[L3 Network]   " << srcIp << " -> " << dstIp << endl;
        cout << "[L4 Transport] Port " << srcPort << " -> Port " << dstPort << " (TCP)" << endl;
        cout << "[L7 Payload]   " << payload << endl;
    }
};

int main() {
    Packet p{"192.168.1.100", "93.184.216.34", 49152, 443, "GET /index.html HTTP/1.1"};
    p.trace();
    return 0;
}`,
      java: `public class PacketEncapsulation {
    public static void main(String[] args) {
        String srcIp = "10.0.1.50";
        String dstIp = "142.250.190.46";
        int srcPort = 58210;
        int dstPort = 443;
        String httpPayload = "GET /search?q=SPSU HTTP/1.1";

        System.out.println("[L3] Packet Header: " + srcIp + " -> " + dstIp);
        System.out.println("[L4] Segment Header: Port " + srcPort + " -> Port " + dstPort);
        System.out.println("[L7] Payload: " + httpPayload);
    }
}`,
      python: `def trace_packet(src_ip: str, dst_ip: str, src_port: int, dst_port: int, payload: str) -> None:
    print(f"[Layer 3 Network]   {src_ip} -> {dst_ip}")
    print(f"[Layer 4 Transport] TCP Port {src_port} -> {dst_port}")
    print(f"[Layer 7 Payload]   {payload}")

if __name__ == "__main__":
    trace_packet("192.168.1.15", "104.244.42.1", 52140, 443, "GET /api/v1/tweets HTTP/1.1")`,
    },
  },
  {
    id: 'd7-note-2',
    title: 'TCP 3-Way Handshake, Sliding Window Flow Control & Connection Teardown',
    conceptSummary:
      'TCP (Transmission Control Protocol) is a connection-oriented, reliable, byte-stream transport protocol.\n\n1. Three-Way Handshake (Connection Establishment):\n   - Step 1: Client -> Server: `SYN` (seq = ISN_c)\n   - Step 2: Server -> Client: `SYN-ACK` (seq = ISN_s, ack = ISN_c + 1)\n   - Step 3: Client -> Server: `ACK` (seq = ISN_c + 1, ack = ISN_s + 1)\n   * Both sides synchronize Initial Sequence Numbers (ISNs) to track every byte.\n\n2. Flow Control (Sliding Window):\n   - The receiver advertises its available buffer space via the `Receive Window` (rwnd) in every ACK header.\n   - Usable Window = `rwnd - (LastByteSent - LastByteAcked)`.\n   - If `rwnd == 0`, sender halts transmission and sends periodic 1-byte Zero-Window Probes.\n\n3. Congestion Control:\n   - Slow Start: Exponential increase (`cwnd` doubles every RTT until threshold `ssthresh`).\n   - Congestion Avoidance: Additive Increase Multiplicative Decrease (AIMD).\n   - Fast Retransmit: Triggered by 3 duplicate ACKs without waiting for RTO.\n\n4. Connection Teardown (4-Way Termination):\n   - FIN -> ACK; FIN -> ACK; Active closer enters `TIME_WAIT` for 2*MSL (120s) to drain stray segments.',
    timeSpaceNote:
      'Handshake Overhead: Exactly 1 RTT before data transfer | Sliding Window Tracking: O(1) buffer pointers | Space: O(WindowSize) in socket memory.',
    kapilMentorTip:
      'Why is sequence number incremented by 1 during SYN and FIN packets if they carry zero bytes of application data? Because SYN and FIN flags consume exactly one logical sequence number in the TCP stream to ensure their delivery is acknowledged reliably by the remote host!',
    codeByLanguage: {
      c: `#include <stdio.h>

// TCP 3-Way Handshake State Simulation
void simulateTcpHandshake(unsigned int clientIsn, unsigned int serverIsn) {
    printf("1. [CLIENT -> SERVER] SYN: seq=%u\\n", clientIsn);
    
    unsigned int serverAck = clientIsn + 1;
    printf("2. [SERVER -> CLIENT] SYN-ACK: seq=%u, ack=%u\\n", serverIsn, serverAck);
    
    unsigned int clientSeq = serverAck;
    unsigned int clientAck = serverIsn + 1;
    printf("3. [CLIENT -> SERVER] ACK: seq=%u, ack=%u\\n", clientSeq, clientAck);
    printf("--> TCP CONNECTION ESTABLISHED (Full Duplex Ready)\\n");
}

int main() {
    simulateTcpHandshake(1000, 5000);
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

void tcpHandshake(uint32_t c_isn, uint32_t s_isn) {
    cout << "Step 1: [SYN]     seq=" << c_isn << endl;
    cout << "Step 2: [SYN-ACK] seq=" << s_isn << ", ack=" << (c_isn + 1) << endl;
    cout << "Step 3: [ACK]     seq=" << (c_isn + 1) << ", ack=" << (s_isn + 1) << endl;
    cout << "State: ESTABLISHED" << endl;
}

int main() {
    tcpHandshake(1000, 5000);
    return 0;
}`,
      java: `public class TcpHandshakeSimulator {
    public static void handshake(long clientIsn, long serverIsn) {
        System.out.println("1. [SYN]     clientSeq=" + clientIsn);
        System.out.println("2. [SYN-ACK] serverSeq=" + serverIsn + ", ack=" + (clientIsn + 1));
        System.out.println("3. [ACK]     clientSeq=" + (clientIsn + 1) + ", ack=" + (serverIsn + 1));
        System.out.println("Status: TCP Socket ESTABLISHED");
    }

    public static void main(String[] args) {
        handshake(1000, 5000);
    }
}`,
      python: `def tcp_handshake(client_isn: int, server_isn: int) -> None:
    print(f"1. [SYN]     client_seq={client_isn}")
    print(f"2. [SYN-ACK] server_seq={server_isn}, ack={client_isn + 1}")
    print(f"3. [ACK]     client_seq={client_isn + 1}, ack={server_isn + 1}")
    print("TCP 3-Way Handshake Complete -> Socket ESTABLISHED")

if __name__ == "__main__":
    tcp_handshake(1000, 5000)`,
    },
  },
  {
    id: 'd7-note-3',
    title: 'IPv4 Addressing, CIDR Bitwise Subnetting & Longest Prefix Match (LPM)',
    conceptSummary:
      'IPv4 addresses are 32-bit unsigned integers partitioned into Network bits and Host bits via a Subnet Mask.\n\n1. CIDR (Classless Inter-Domain Routing) Notation `/prefix`:\n   - Prefix length $P$ specifies the number of leading 1-bits in the subnet mask.\n   - Host bits $H = 32 - P$.\n   - Total addresses in block = $2^H$.\n   - Usable host addresses = $2^H - 2$ (excluding the Network Address and Broadcast Address).\n\n2. Bitwise Subnet Math:\n   - Subnet Mask = `(0xFFFFFFFF << (32 - P)) & 0xFFFFFFFF`\n   - Network Address = `IP & SubnetMask`\n   - Broadcast Address = `NetworkAddress | ~SubnetMask`\n   - First Usable Host = `NetworkAddress + 1`\n   - Last Usable Host = `BroadcastAddress - 1`\n\n3. Routing Table Lookup - Longest Prefix Match (LPM):\n   - When multiple routes match a destination IP (e.g., `/16`, `/24`, `/28`), the router always selects the route with the highest prefix length because it represents the most specific path.',
    timeSpaceNote:
      'Subnet Mask & Host Math: O(1) bitwise operations | Routing Table LPM: O(1) with Hardware TCAM or O(W) with Radix Trie (W=32 bits).',
    kapilMentorTip:
      'Remember the "/30 and /31" interview rules: A /30 subnet yields 4 total addresses and exactly 2 usable hosts, making it the classic standard for point-to-point router links. Modern RFC 3021 permits /31 subnets for point-to-point links with 0 subtracted hosts.',
    codeByLanguage: {
      c: `#include <stdio.h>

// Full IPv4 CIDR Calculator in C
void calculateSubnet(unsigned char o1, unsigned char o2, unsigned char o3, unsigned char o4, int prefix) {
    unsigned int ip = (o1 << 24) | (o2 << 16) | (o3 << 8) | o4;
    unsigned int mask = (prefix == 0) ? 0 : (~0U << (32 - prefix));
    unsigned int net = ip & mask;
    unsigned int bcast = net | ~mask;
    
    int hostBits = 32 - prefix;
    long long usableHosts = (hostBits >= 2) ? ((1LL << hostBits) - 2) : 0;

    printf("Input IP     : %u.%u.%u.%u/%d\\n", o1, o2, o3, o4, prefix);
    printf("Subnet Mask  : %u.%u.%u.%u\\n", (mask >> 24) & 0xFF, (mask >> 16) & 0xFF, (mask >> 8) & 0xFF, mask & 0xFF);
    printf("Network Addr : %u.%u.%u.%u\\n", (net >> 24) & 0xFF, (net >> 16) & 0xFF, (net >> 8) & 0xFF, net & 0xFF);
    printf("Broadcast    : %u.%u.%u.%u\\n", (bcast >> 24) & 0xFF, (bcast >> 16) & 0xFF, (bcast >> 8) & 0xFF, bcast & 0xFF);
    printf("Usable Hosts : %lld\\n", usableHosts);
}

int main() {
    calculateSubnet(192, 168, 10, 75, 26);
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

void cidrCalc(uint32_t ip, int prefix) {
    uint32_t mask = (prefix == 0) ? 0 : (~0U << (32 - prefix));
    uint32_t net = ip & mask;
    uint32_t bcast = net | ~mask;
    int hostBits = 32 - prefix;
    long long usable = (hostBits >= 2) ? ((1LL << hostBits) - 2) : 0;

    auto printIp = [](uint32_t val) {
        cout << ((val >> 24) & 255) << "." << ((val >> 16) & 255) << "."
             << ((val >> 8) & 255) << "." << (val & 255);
    };

    cout << "Network:   "; printIp(net); cout << endl;
    cout << "Broadcast: "; printIp(bcast); cout << endl;
    cout << "Usable:    " << usable << " hosts" << endl;
}

int main() {
    // 192.168.10.75 in hex = 0xC0A80A4B
    cidrCalc(0xC0A80A4B, 26);
    return 0;
}`,
      java: `public class CidrCalculator {
    public static void compute(int o1, int o2, int o3, int o4, int prefix) {
        long ip = ((long)o1 << 24) | ((long)o2 << 16) | ((long)o3 << 8) | o4;
        long mask = (prefix == 0) ? 0 : (0xFFFFFFFFL << (32 - prefix)) & 0xFFFFFFFFL;
        long net = ip & mask;
        long bcast = net | (~mask & 0xFFFFFFFFL);
        long usable = (32 - prefix >= 2) ? ((1L << (32 - prefix)) - 2) : 0;

        System.out.printf("Network:   %d.%d.%d.%d%n", (net>>24)&255, (net>>16)&255, (net>>8)&255, net&255);
        System.out.printf("Broadcast: %d.%d.%d.%d%n", (bcast>>24)&255, (bcast>>16)&255, (bcast>>8)&255, bcast&255);
        System.out.printf("Usable Hosts: %d%n", usable);
    }

    public static void main(String[] args) {
        compute(192, 168, 10, 75, 26);
    }
}`,
      python: `def cidr_calculate(ip_str: str, prefix: int) -> None:
    octets = [int(x) for x in ip_str.split(".")]
    ip = (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]
    mask = (0xFFFFFFFF << (32 - prefix)) & 0xFFFFFFFF if prefix > 0 else 0
    net = ip & mask
    bcast = net | (~mask & 0xFFFFFFFF)
    usable = (1 << (32 - prefix)) - 2 if (32 - prefix) >= 2 else 0

    fmt = lambda x: f"{(x >> 24) & 255}.{(x >> 16) & 255}.{(x >> 8) & 255}.{x & 255}"
    print(f"Network:   {fmt(net)}")
    print(f"Broadcast: {fmt(bcast)}")
    print(f"Usable:    {usable} hosts")

if __name__ == "__main__":
    cidr_calculate("192.168.10.75", 26)`,
    },
  },
  {
    id: 'd7-note-4',
    title: 'DNS Resolution Architecture, Port Multiplexing & Socket Programming',
    conceptSummary:
      'Network sockets allow distinct processes on different physical machines to exchange continuous byte streams.\n\n1. The DNS Resolution Pipeline:\n   - Browser Cache -> OS Cache (hosts file) -> Local Recursive DNS Resolver (ISP/8.8.8.8) -> Root Nameserver (`.`) -> Top-Level Domain (TLD) Nameserver (`.com`) -> Authoritative Nameserver (`ns1.example.com`) -> IP returned and cached with TTL.\n\n2. Port Multiplexing (0 - 65,535):\n   - Well-Known Ports (0–1023): HTTP (80), HTTPS (443), DNS (53), SSH (22), FTP (20/21), SMTP (25).\n   - Registered Ports (1024–49151): MySQL (3306), Redis (6379), PostgreSQL (5432).\n   - Dynamic / Ephemeral Ports (49152–65535): Assigned by client OS for outbound connections.\n\n3. POSIX Berkeley Socket Lifecycle:\n   - Server: `socket()` -> `bind(ip, port)` -> `listen(backlog)` -> `accept()` -> `recv()/send()` -> `close()`.\n   - Client: `socket()` -> `connect(ip, port)` -> `send()/recv()` -> `close()`.',
    timeSpaceNote:
      'DNS Cache Hit: O(1) memory lookup | DNS Full Iterative Walk: ~50-150ms round trips across root/TLD/auth servers.',
    kapilMentorTip:
      'In SDE interviews, always explain the difference between `listen()` and `accept()`: `listen()` configures the socket to act as a passive door with a backlog queue; `accept()` extracts a completed connection from the queue and creates a brand-new socket descriptor dedicated to that specific client connection.',
    codeByLanguage: {
      c: `#include <stdio.h>

// Socket State Machine Emulation in C
typedef enum { CLOSED, LISTEN, SYN_RCVD, ESTABLISHED, CLOSE_WAIT, LAST_ACK, TIME_WAIT } SocketState;

typedef struct {
    int port;
    SocketState state;
    int backlog;
} ServerSocket;

void openListener(ServerSocket *sock, int port, int backlog) {
    sock->port = port;
    sock->backlog = backlog;
    sock->state = LISTEN;
    printf("[SOCKET] bind() and listen() on Port %d with backlog %d -> State: LISTEN\\n", port, backlog);
}

int main() {
    ServerSocket server;
    openListener(&server, 8080, 128);
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

class MockSocket {
public:
    void bindAndListen(int port) {
        cout << "[TCP Server] Bound to 0.0.0.0:" << port << " | State: LISTENING" << endl;
    }
};

int main() {
    MockSocket s;
    s.bindAndListen(443);
    return 0;
}`,
      java: `public class SocketFlow {
    public static void main(String[] args) {
        int port = 8080;
        System.out.println("ServerSocket created -> bind(port=" + port + ") -> listen()");
        System.out.println("Blocking on accept() waiting for incoming client handshake...");
    }
}`,
      python: `def simulate_socket_listener(port: int) -> None:
    print(f"[Socket Server] socket(AF_INET, SOCK_STREAM)")
    print(f"[Socket Server] bind(('0.0.0.0', {port}))")
    print(f"[Socket Server] listen(backlog=128) -> Waiting for client accept()")

if __name__ == "__main__":
    simulate_socket_listener(8080)`,
    },
  },
  {
    id: 'd7-note-5',
    title: 'HTTP/1.1 vs HTTP/2/3, TLS 1.3 Cryptography & REST API Security',
    conceptSummary:
      'Web communication relies on HTTP layered on top of transport security (TLS).\n\n1. Evolution of HTTP:\n   - HTTP/1.1: Textual protocol. Supports persistent connections, but suffers from Head-of-Line (HoL) blocking on pipelining.\n   - HTTP/2: Binary protocol with multiplexed streams over 1 TCP connection, HPACK header compression, and server push.\n   - HTTP/3: Uses QUIC over UDP, eliminating TCP-level packet loss stall, with connection migration and 0-RTT handshakes.\n\n2. HTTPS / TLS 1.3 Handshake:\n   - ClientHello (Supported ciphers, ECDHE public share)\n   - ServerHello (Selected cipher, server public share, Certificate, Finished)\n   - Generates shared symmetric session key (AES-256-GCM) in 1 single RTT.\n\n3. Web Security Safeguards:\n   - CORS: Browser policy preventing cross-domain JS reads without server permission.\n   - CSRF: Attack exploiting ambient browser cookies; mitigated via SameSite cookies and Anti-CSRF tokens.\n   - XSS: Malicious script injection; mitigated via HTML sanitization and Content-Security-Policy (CSP).\n   - HSTS: Enforces HTTPS-only communication.',
    timeSpaceNote:
      'TLS 1.2: 2 RTT Handshake | TLS 1.3: 1 RTT Handshake (and 0-RTT session resumption) | Symmetric encryption: ~1-3 GB/s throughput with hardware AES-NI.',
    kapilMentorTip:
      'Placement question: "Why do we use both asymmetric and symmetric cryptography in HTTPS?" Asymmetric cryptography is used during the handshake to authenticate the server and securely agree on a secret key. Once established, the system switches to symmetric cryptography (AES-GCM) for data transfer because it is hundreds of times faster and requires minimal CPU.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>

// REST Method & Idempotency Validator in C
void checkRestMethod(const char *method) {
    int isSafe = (strcmp(method, "GET") == 0 || strcmp(method, "HEAD") == 0);
    int isIdempotent = (strcmp(method, "GET") == 0 || strcmp(method, "PUT") == 0 || strcmp(method, "DELETE") == 0);
    
    printf("Method: %-7s | Safe (Read-only): %s | Idempotent: %s\\n",
           method,
           isSafe ? "YES" : "NO",
           isIdempotent ? "YES (f(f(x)) = f(x))" : "NO (Creates new state)");
}

int main() {
    checkRestMethod("GET");
    checkRestMethod("POST");
    checkRestMethod("PUT");
    checkRestMethod("DELETE");
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

void validateMethod(const string &m) {
    bool safe = (m == "GET" || m == "HEAD");
    bool idempotent = (m == "GET" || m == "PUT" || m == "DELETE");
    cout << "HTTP " << m << " -> Safe: " << (safe ? "True" : "False")
         << ", Idempotent: " << (idempotent ? "True" : "False") << endl;
}

int main() {
    validateMethod("GET");
    validateMethod("POST");
    validateMethod("PUT");
    validateMethod("DELETE");
    return 0;
}`,
      java: `public class RestSecurityValidator {
    public static void check(String method) {
        boolean safe = method.equals("GET") || method.equals("HEAD");
        boolean idempotent = method.equals("GET") || method.equals("PUT") || method.equals("DELETE");
        System.out.printf("HTTP %-6s -> Safe: %-5b | Idempotent: %-5b%n", method, safe, idempotent);
    }

    public static void main(String[] args) {
        check("GET");
        check("POST");
        check("PUT");
        check("DELETE");
    }
}`,
      python: `def check_http_method(method: str) -> None:
    safe = method in ("GET", "HEAD")
    idempotent = method in ("GET", "PUT", "DELETE")
    print(f"HTTP {method:<6} | Safe: {str(safe):<5} | Idempotent: {str(idempotent):<5}")

if __name__ == "__main__":
    for m in ["GET", "POST", "PUT", "DELETE"]:
        check_http_method(m)`,
    },
  },
];
