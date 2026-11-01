import { AssessmentQuestion } from '../types';

/**
 * Day 7 Assessments (50 Pre-Assessment MCQs & 50 Post-Assessment MCQs = 100 Total)
 * Module 7: Computer Networks, Protocols & REST Security
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 * Coverage: OSI 7-Layer vs TCP/IP Stack, PDU Encapsulation,
 * TCP 3-Way Handshake, 4-Way FIN Termination, Sliding Window, Congestion Control (Reno/Tahoe),
 * IPv4 Classful vs CIDR Subnetting, Mask Calculations, Usable Hosts, RFC 1918,
 * DNS Resolution Pipeline, Ports (0-65535), HTTP/1.1, HTTP/2, HTTP/3 (QUIC),
 * REST Principles, Idempotency & Safety Matrix, HTTP Status Codes (2xx, 3xx, 4xx, 5xx),
 * Network Security: TLS/HTTPS Handshake, Symmetric vs Asymmetric Ciphers, CORS, CSRF, XSS, HSTS.
 * Balanced: 15 Theory (30%) + 35 Practical Execution & Trace (70%)
 */

export const DAY_7_PRE_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d7-pre-1",
    "question": "Which layer of the OSI 7-Layer model is responsible for logical IP addressing, packet routing, and path determination?",
    "options": [
      "Data Link Layer (Layer 2)",
      "Network Layer (Layer 3)",
      "Transport Layer (Layer 4)",
      "Session Layer (Layer 5)"
    ],
    "correctIndex": 1,
    "explanation": "The Network Layer (Layer 3) handles logical host addressing (IPv4/IPv6), subnetting, and packet routing across intermediate routers.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-2",
    "question": "What is the correct protocol data unit (PDU) encapsulation sequence as user payload data travels down the OSI stack from Layer 7 to Layer 1?",
    "options": [
      "Data -> Frame -> Packet -> Segment -> Bits",
      "Data -> Segment -> Packet -> Frame -> Bits",
      "Packet -> Segment -> Frame -> Bits -> Data",
      "Bits -> Frame -> Packet -> Segment -> Data"
    ],
    "correctIndex": 1,
    "explanation": "Application data becomes Segments at Layer 4 (Transport), Packets at Layer 3 (Network), Frames at Layer 2 (Data Link), and raw Bits at Layer 1 (Physical).",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-3",
    "question": "What is the standard packet exchange sequence for establishing a reliable TCP connection?",
    "options": [
      "ACK -> SYN -> FIN",
      "SYN -> SYN-ACK -> ACK",
      "FIN -> ACK -> FIN-ACK",
      "SYN -> ACK -> DATA"
    ],
    "correctIndex": 1,
    "explanation": "TCP 3-Way Handshake begins with client sending SYN, server replying with SYN-ACK, and client responding with ACK.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-4",
    "question": "How many packets are exchanged in a graceful teardown of an established full-duplex TCP connection?",
    "options": [
      "2 packets (FIN, ACK)",
      "3 packets (FIN, SYN, ACK)",
      "4 packets (FIN, ACK, FIN, ACK)",
      "1 packet (RST)"
    ],
    "correctIndex": 2,
    "explanation": "Because TCP is full-duplex, each direction closes independently: Host A sends FIN, Host B sends ACK; then Host B sends FIN, and Host A sends ACK (4-Way Termination).",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-5",
    "question": "Why does the UDP header have only 8 bytes of overhead compared to TCP's minimum 20 bytes?",
    "options": [
      "UDP encrypts all headers using AES",
      "UDP is connectionless and lacks sequence numbers, acknowledgement numbers, sliding window fields, and urgent pointers",
      "UDP only works on local area networks",
      "UDP packets cannot exceed 128 bytes in size"
    ],
    "correctIndex": 1,
    "explanation": "The UDP header consists strictly of four 16-bit fields (8 bytes total): Source Port, Destination Port, Length, and Checksum.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-6",
    "question": "In IPv4 addressing, which RFC 1918 block designates private, non-routable class C space commonly used in home Wi-Fi routers?",
    "options": [
      "10.0.0.0/8",
      "172.16.0.0/12",
      "192.168.0.0/16",
      "169.254.0.0/16"
    ],
    "correctIndex": 2,
    "explanation": "RFC 1918 defines: 10.0.0.0/8 (Class A private), 172.16.0.0/12 (Class B private), and 192.168.0.0/16 (Class C private).",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-7",
    "question": "What is the fundamental difference between Recursive and Iterative DNS resolution?",
    "options": [
      "Recursive resolution queries only .com domains; iterative queries .org domains",
      "In recursive resolution, the client's resolver offloads the entire resolution to the local DNS server which returns the final IP; in iterative resolution, the queried server returns the best referral to the next nameserver",
      "Iterative resolution requires a physical phone call to the ISP",
      "Recursive resolution never uses DNS cache"
    ],
    "correctIndex": 1,
    "explanation": "In recursive queries, the DNS server takes full responsibility to return the final answer. In iterative queries, each nameserver provides a referral pointer to the next hierarchy server.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-8",
    "question": "Which DNS record type maps an alias domain name (e.g., `www.example.com`) to a canonical hostname?",
    "options": [
      "A Record",
      "AAAA Record",
      "CNAME Record",
      "MX Record"
    ],
    "correctIndex": 2,
    "explanation": "CNAME (Canonical Name) maps an alias name to another true domain name. A maps to IPv4, AAAA maps to IPv6, and MX maps to mail exchange servers.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-9",
    "question": "What are the default transport protocol and port used by standard DNS queries?",
    "options": [
      "TCP port 80",
      "UDP port 53 (falling back to TCP 53 for payloads > 512 bytes or zone transfers)",
      "UDP port 67",
      "TCP port 443"
    ],
    "correctIndex": 1,
    "explanation": "DNS uses UDP port 53 for fast query/response overhead, switching to TCP 53 when responses exceed 512 bytes (EDNS0) or for DNS zone transfers.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-10",
    "question": "Which of the following describes the key distinction between HTTP/1.1 and HTTP/2?",
    "options": [
      "HTTP/2 uses plain text headers with CRLF delimiters",
      "HTTP/2 introduces binary framing, multiplexed streams over a single TCP connection, and HPACK header compression to resolve Head-of-Line (HoL) blocking",
      "HTTP/2 removes support for GET and POST methods",
      "HTTP/2 requires fiber optic cabling to operate"
    ],
    "correctIndex": 1,
    "explanation": "HTTP/2 replaces textual protocols with binary frames, multiplexing concurrent streams over a single TCP connection and eliminating application-layer Head-of-Line blocking.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-11",
    "question": "Which architectural constraint is NOT part of Roy Fielding's defining principles for RESTful systems?",
    "options": [
      "Client-Server separation",
      "Statelessness",
      "Server-Side Session State Affinity",
      "Cacheability and Uniform Interface"
    ],
    "correctIndex": 2,
    "explanation": "REST strictly prohibits server-side session affinity (sticky state in server memory). Every request must contain all necessary context (Statelessness).",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-12",
    "question": "What is the primary role of ARP (Address Resolution Protocol)?",
    "options": [
      "To map known 32-bit IPv4 addresses to 48-bit physical MAC hardware addresses within a local broadcast domain",
      "To assign dynamic IP addresses to booting computers",
      "To encrypt passwords in transit",
      "To convert domain names into IP addresses"
    ],
    "correctIndex": 0,
    "explanation": "ARP broadcasts a query asking 'Who has IP X.X.X.X?' so the target host replies with its physical 48-bit MAC address for Layer 2 frame transmission.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-13",
    "question": "What is the purpose of the TTL (Time to Live) field in the IPv4 packet header?",
    "options": [
      "To indicate how many milliseconds an application has to process the packet",
      "To prevent packets from circulating endlessly in routing loops by decrementing by 1 at each router hop until discarded at 0",
      "To measure download bandwidth",
      "To set the expiration date of SSL certificates"
    ],
    "correctIndex": 1,
    "explanation": "Every router decrements the 8-bit TTL field by 1. When TTL reaches 0, the packet is discarded and an ICMP Time Exceeded (Type 11) is sent back to the source.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-14",
    "question": "What is the Maximum Transmission Unit (MTU) of standard Ethernet at the Data Link layer?",
    "options": [
      "512 bytes",
      "1500 bytes",
      "4096 bytes",
      "65535 bytes"
    ],
    "correctIndex": 1,
    "explanation": "Standard Ethernet frames carry up to 1500 bytes of IP payload without requiring fragmentation.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-15",
    "question": "What does the `SYN Cookie` mechanism defend against in modern operating system network stacks?",
    "options": [
      "SQL injection attacks",
      "SYN Flood Denial-of-Service attacks by encoding connection parameters into the initial sequence number without allocating half-open socket memory",
      "DNS cache poisoning",
      "Cross-site scripting in browser cookies"
    ],
    "correctIndex": 1,
    "explanation": "SYN cookies allow the server to avoid allocating state in the SYN backlog table during SYN floods, computing the initial sequence number cryptographically.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-pre-16",
    "question": "A network engineer allocates an IPv4 subnet of `192.168.10.0/27`. What is the dotted-decimal subnet mask and the maximum number of usable host IP addresses?",
    "options": [
      "255.255.255.192 and 62 usable hosts",
      "255.255.255.224 and 30 usable hosts",
      "255.255.255.240 and 14 usable hosts",
      "255.255.255.128 and 126 usable hosts"
    ],
    "correctIndex": 1,
    "explanation": "Prefix /27 leaves 32 - 27 = 5 host bits. Mask has 27 ones: 11111111.11111111.11111111.11100000 = 255.255.255.224. Usable hosts = 2^5 - 2 = 30.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-17",
    "question": "Given the IP address `10.45.68.193` with subnet mask `255.255.255.192` (/26), what is the calculated Network Address and Broadcast Address?",
    "options": [
      "Network: 10.45.68.0, Broadcast: 10.45.68.255",
      "Network: 10.45.68.128, Broadcast: 10.45.68.191",
      "Network: 10.45.68.192, Broadcast: 10.45.68.255",
      "Network: 10.45.68.64, Broadcast: 10.45.68.127"
    ],
    "correctIndex": 2,
    "explanation": "In binary: 193 = 11000001; 192 = 11000000. 193 AND 192 = 192 (Network Address: 10.45.68.192). Block size is 64. Broadcast = 192 + 63 = 255.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-18",
    "question": "Trace the bitwise calculation for an IPv4 route lookup. If packet destination is `172.16.5.42`, which routing table entry matches under Longest Prefix Match (LPM)?\nRoute 1: 172.16.0.0/16\nRoute 2: 172.16.4.0/22\nRoute 3: 172.16.5.0/24\nRoute 4: 0.0.0.0/0",
    "options": [
      "Route 1 (172.16.0.0/16)",
      "Route 2 (172.16.4.0/22)",
      "Route 3 (172.16.5.0/24)",
      "Route 4 (Default Gateway)"
    ],
    "correctIndex": 2,
    "explanation": "All three routes cover 172.16.5.42, but Route 3 has the longest prefix length (/24 > /22 > /16), making it the most specific match.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-19",
    "question": "A client initiates a TCP handshake with sequence number `ISN_c = 1000`. The server responds with `ISN_s = 5000` and ACK number. What will be the `ack` value in the server's SYN-ACK packet?",
    "options": [
      "1000",
      "1001",
      "5000",
      "5001"
    ],
    "correctIndex": 1,
    "explanation": "The server acknowledges the client's SYN (which consumes 1 sequence number) by setting ACK = client_ISN + 1 = 1000 + 1 = 1001.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-20",
    "question": "In the third step of the TCP handshake, the client sends its ACK back to the server. What will be the `seq` and `ack` fields in this final ACK packet?",
    "options": [
      "seq = 1001, ack = 5001",
      "seq = 1000, ack = 5000",
      "seq = 1002, ack = 5001",
      "seq = 1001, ack = 5000"
    ],
    "correctIndex": 0,
    "explanation": "The client advances its sequence number to 1001 and acknowledges the server's SYN by setting ACK = server_ISN + 1 = 5000 + 1 = 5001.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-21",
    "question": "Trace the sliding window behavior in TCP. Sender's current window size is 4000 bytes. It transmits two 1000-byte segments starting at seq 2001 and 3001. How many more bytes can the sender transmit before waiting for an ACK?",
    "options": [
      "0 bytes",
      "1000 bytes",
      "2000 bytes",
      "4000 bytes"
    ],
    "correctIndex": 2,
    "explanation": "Usable window = Total Window (4000) - Unacknowledged Bytes in flight (2000) = 2000 bytes remaining.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-22",
    "question": "An HTTP client transmits a conditional GET request with the header `If-None-Match: \"e84f-901a\"`. The server checks the resource and observes its current ETag is still `\"e84f-901a\"`. What status code and payload does the server return?",
    "options": [
      "200 OK with the full updated resource body",
      "304 Not Modified with zero message body bytes",
      "412 Precondition Failed with an error message",
      "204 No Content with headers stripped"
    ],
    "correctIndex": 1,
    "explanation": "When ETags match, the server returns HTTP 304 Not Modified with an empty body, instructing the browser to render from local cache.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-23",
    "question": "What is the output of inspecting the following raw HTTP request line?\n`POST /api/v2/orders?priority=high HTTP/1.1`",
    "options": [
      "Method: POST, Path: /api/v2/orders, Query: priority=high, Protocol: HTTP/1.1",
      "Method: GET, Path: /api/v2/orders, Protocol: HTTP/2",
      "Method: OPTIONS, Path: /orders, Protocol: HTTP/1.0",
      "Invalid HTTP request syntax"
    ],
    "correctIndex": 0,
    "explanation": "The request line follows `<Method> <URI> <HTTP-Version>`. Method is POST, Path is `/api/v2/orders`, Query is `priority=high`, and Version is `HTTP/1.1`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-24",
    "question": "A company requires 500 distinct subnets, each with at least 50 host IP addresses. Starting with the private network `10.0.0.0/8`, which CIDR prefix should be used for each subnet?",
    "options": [
      "/24 (254 hosts)",
      "/26 (62 hosts)",
      "/27 (30 hosts)",
      "/22 (1022 hosts)"
    ],
    "correctIndex": 1,
    "explanation": "A subnet needing at least 50 hosts requires 6 host bits (2^6 - 2 = 62 hosts, which satisfies >= 50). 32 - 6 = /26. /26 provides 2^(26-8) = 2^18 = 262,144 subnets, well above 500.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-25",
    "question": "What is the broadcast address for the IPv4 subnet `172.16.32.0/20`?",
    "options": [
      "172.16.32.255",
      "172.16.47.255",
      "172.16.63.255",
      "172.16.255.255"
    ],
    "correctIndex": 1,
    "explanation": "A /20 subnet has 12 host bits. 2^12 = 4096 addresses. 4096 / 256 = 16 Class C blocks. Third octet spans 32 to (32 + 16 - 1) = 47. Broadcast is 172.16.47.255.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-26",
    "question": "Trace the four steps of the DHCP dynamic IP assignment protocol between a client and server:",
    "options": [
      "SYN -> SYN-ACK -> ACK -> ESTABLISHED",
      "DHCPDISCOVER -> DHCPOFFER -> DHCPREQUEST -> DHCPACK",
      "ARP_REQ -> ARP_REPLY -> ICMP_ECHO -> ICMP_REPLY",
      "DNS_QUERY -> DNS_RESOLVE -> HTTP_GET -> HTTP_200"
    ],
    "correctIndex": 1,
    "explanation": "The DORA process: 1. DHCPDISCOVER (broadcast by client), 2. DHCPOFFER (unicast/broadcast by server), 3. DHCPREQUEST (client accepts offer), 4. DHCPACK (server confirms lease).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-27",
    "question": "How does a router running Network Address Translation (NAT/NAPT) disambiguate between two distinct internal laptops (`192.168.1.10` and `192.168.1.20`) simultaneously accessing `google.com:443` through a single public IP `203.0.113.5`?",
    "options": [
      "By translating their MAC addresses",
      "By rewriting their source port numbers to unique ephemeral port numbers on the public IP and maintaining a NAT translation table",
      "By queuing requests sequentially and serving one laptop per minute",
      "By adding an extra byte to the HTTP payload"
    ],
    "correctIndex": 1,
    "explanation": "Port Address Translation (PAT/NAPT) maps internal `IP:Port` tuples to distinct public source ports on the single public IP, tracking entries in a stateful NAT table.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-28",
    "question": "An IP datagram of length 4000 bytes (20 bytes IP header + 3980 bytes payload) arrives at a router whose outgoing interface has an MTU of 1500 bytes. Into how many fragments will the packet be split?",
    "options": [
      "2 fragments",
      "3 fragments",
      "4 fragments",
      "Fragmented into 1500 pieces"
    ],
    "correctIndex": 1,
    "explanation": "Max payload per 1500-byte MTU frame is 1500 - 20 = 1480 bytes (which must be a multiple of 8). Frag 1: 1480 bytes, Frag 2: 1480 bytes, Frag 3: 3980 - (1480*2) = 1020 bytes. Total 3 fragments.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-29",
    "question": "In the IP fragmentation of the previous question, what will be the Fragment Offset field value for the second fragment?",
    "options": [
      "1480",
      "185",
      "0",
      "740"
    ],
    "correctIndex": 1,
    "explanation": "Fragment Offset is measured in 8-byte units: Offset = 1480 / 8 = 185.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-30",
    "question": "When executing `traceroute` (or `tracert`), how does the utility discover the IP addresses of intermediate routers along the path?",
    "options": [
      "By asking the root DNS server for the router list",
      "By incrementally sending packets with TTL starting at 1, 2, 3... and reading the source IP of the returned ICMP Time Exceeded (Type 11) messages from each router",
      "By reading the router's SSH configuration files",
      "By sending broadcast ARP messages across the ocean"
    ],
    "correctIndex": 1,
    "explanation": "Traceroute sets TTL=1 (first router drops packet and returns ICMP Time Exceeded), then TTL=2 (second router drops and replies), and so on until the target responds.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-31",
    "question": "What is the calculated usable host IP address range for `10.10.16.0/22`?",
    "options": [
      "10.10.16.1 to 10.10.19.254",
      "10.10.16.1 to 10.10.16.254",
      "10.10.16.1 to 10.10.31.254",
      "10.10.16.0 to 10.10.20.0"
    ],
    "correctIndex": 0,
    "explanation": "Prefix /22 has block size of 4 in third octet (16 to 19). Network is 10.10.16.0, Broadcast is 10.10.19.255. Usable range is 10.10.16.1 to 10.10.19.254 (1022 hosts).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-32",
    "question": "Trace TCP Congestion Control: During the 'Slow Start' phase, what happens to the congestion window (cwnd) upon receiving an acknowledgment for every transmitted segment?",
    "options": [
      "cwnd increases linearly by 1 MSS per RTT",
      "cwnd doubles every Round Trip Time (RTT), growing exponentially (cwnd += 1 MSS per ACK)",
      "cwnd remains static until timeout",
      "cwnd cuts in half immediately"
    ],
    "correctIndex": 1,
    "explanation": "In Slow Start, cwnd increases by 1 MSS for each ACK received, effectively doubling cwnd each round-trip time (RTT).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-33",
    "question": "In TCP Reno, what triggers 'Fast Retransmit' before the retransmission timer (RTO) expires?",
    "options": [
      "A FIN packet from the client",
      "Arrival of 3 duplicate ACKs (4 identical ACKs total) for the same sequence number",
      "An HTTP 500 status code",
      "A TTL expiration notice"
    ],
    "correctIndex": 1,
    "explanation": "When 3 duplicate ACKs arrive, TCP infers the missing segment was lost rather than delayed, triggering an immediate Fast Retransmit without waiting for RTO timeout.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-34",
    "question": "Which of the following represents a valid, fully compressed IPv6 address corresponding to `2001:0db8:0000:0000:0000:0000:0000:0001`?",
    "options": [
      "2001:db8::1",
      "2001:0db8::0001",
      "2001:db8:::1",
      "2001::db8::1"
    ],
    "correctIndex": 0,
    "explanation": "Leading zeros in each 16-bit block are omitted (`0db8` -> `db8`), and the longest contiguous run of zero blocks is replaced once with `::`. Thus, `2001:db8::1`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-35",
    "question": "Why does IPv6 eliminate the checksum field in its base 40-byte header?",
    "options": [
      "IPv6 does not care about data corruption",
      "To improve router forwarding performance, since Layer 2 (Ethernet CRC-32) and Layer 4 (TCP/UDP) already enforce checksums, avoiding redundant computation on every hop",
      "Because IPv6 packets are encrypted by default",
      "Because IPv6 cables are made of pure gold"
    ],
    "correctIndex": 1,
    "explanation": "Omitting the header checksum allows intermediate routers to forward IPv6 packets without recalculating checksums on every Hop Limit decrement, speeding up routing.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-36",
    "question": "Inspect the following CORS response header from an API:\n`Access-Control-Allow-Origin: https://app.example.com`\n`Access-Control-Allow-Methods: GET, POST, OPTIONS`\nWhat happens when a browser script from `https://malicious.com` attempts an AJAX fetch to this endpoint?",
    "options": [
      "The server automatically formats the computer hard disk",
      "The browser's Same-Origin Policy blocks the response from being read by JavaScript running on `https://malicious.com`",
      "The request succeeds and returns full data to the attacker",
      "The browser crashes with a kernel panic"
    ],
    "correctIndex": 1,
    "explanation": "CORS is enforced by the client browser. Because the origin `https://malicious.com` does not match `https://app.example.com`, the browser blocks script access.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-37",
    "question": "Trace the TLS 1.3 handshake. How many round trips (RTT) are required before application data can be encrypted and transmitted?",
    "options": [
      "3 RTTs",
      "2 RTTs",
      "1 RTT (and 0-RTT for resumed sessions)",
      "4 RTTs"
    ],
    "correctIndex": 2,
    "explanation": "TLS 1.3 optimizes the handshake down to 1-RTT by combining key exchange parameters into ClientHello and ServerHello, and supports 0-RTT resumption.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-38",
    "question": "A web application receives an HTTP request with the header:\n`Authorization: Basic dXNlcjpzZWNyZXQxMjM=`\nWhat credentials were transmitted in plaintext Base64?",
    "options": [
      "admin:admin123",
      "user:secret123",
      "root:password",
      "api_token:bearer_999"
    ],
    "correctIndex": 1,
    "explanation": "Decoding Base64 string `dXNlcjpzZWNyZXQxMjM=` yields `user:secret123`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-39",
    "question": "What is the difference between Symmetric Encryption (e.g., AES-256-GCM) and Asymmetric Encryption (e.g., RSA-4096 / ECDSA) in HTTPS?",
    "options": [
      "Symmetric encryption uses two keys; asymmetric uses one key",
      "Symmetric encryption uses a single shared secret key for both encryption and decryption (orders of magnitude faster); Asymmetric uses a public key to encrypt and a private key to decrypt",
      "Symmetric encryption is only for images",
      "Asymmetric encryption can only run on quantum computers"
    ],
    "correctIndex": 1,
    "explanation": "Symmetric uses 1 shared key and is computationally lightweight for bulk data. Asymmetric uses a key pair and is used during the handshake to exchange the symmetric session key.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-40",
    "question": "What does the `Strict-Transport-Security` (HSTS) HTTP response header instruct the web browser to do?",
    "options": [
      "Always connect to this domain using HTTPS only for the duration specified by `max-age`, preventing SSL-stripping man-in-the-middle attacks",
      "Strictly check user passwords for numbers and symbols",
      "Disable JavaScript execution on the website",
      "Disconnect from Wi-Fi immediately"
    ],
    "correctIndex": 0,
    "explanation": "HSTS tells browsers never to load the site over insecure HTTP, automatically upgrading all attempts to HTTPS and disallowing certificate override bypasses.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-41",
    "question": "Which of the following IP addresses represents a valid Class B IPv4 network before CIDR was introduced?",
    "options": [
      "10.0.0.1",
      "128.16.5.1",
      "192.168.1.1",
      "224.0.0.1"
    ],
    "correctIndex": 1,
    "explanation": "Class A: 1-126, Class B: 128-191 (first octet bits 10), Class C: 192-223, Class D: 224-239 (multicast). 128.16.5.1 is Class B.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-42",
    "question": "What is the purpose of the loopback IP address `127.0.0.1`?",
    "options": [
      "To connect to the internet service provider gateway",
      "To route traffic internally to the local host itself without sending packets out of any physical network interface",
      "To test whether the printer is turned on",
      "To reboot the computer operating system"
    ],
    "correctIndex": 1,
    "explanation": "The entire 127.0.0.0/8 block is reserved for host loopback; packets sent to 127.0.0.1 are processed entirely within the local OS network stack.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-43",
    "question": "An IPv4 subnet has network address `10.200.0.0` and broadcast address `10.200.0.7`. What is its CIDR prefix length?",
    "options": [
      "/28",
      "/29",
      "/30",
      "/31"
    ],
    "correctIndex": 1,
    "explanation": "Total addresses in range 0 through 7 = 8 addresses. 8 = 2^3, which means 3 host bits. Prefix = 32 - 3 = /29.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-44",
    "question": "What is the purpose of the `SameSite=Strict` cookie attribute?",
    "options": [
      "The cookie is only accessible on the local computer hard drive",
      "The cookie will never be sent in cross-site requests (such as following links or embedded images from external sites), defending against Cross-Site Request Forgery (CSRF)",
      "The cookie cannot be edited by the developer",
      "The cookie expires after 5 minutes"
    ],
    "correctIndex": 1,
    "explanation": "`SameSite=Strict` completely prevents the browser from sending the cookie with any cross-site request, eliminating CSRF attack vectors.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-45",
    "question": "In socket programming, what is the role of the `listen(int sockfd, int backlog)` system call in a TCP server?",
    "options": [
      "To convert an active socket into a passive socket that accepts incoming connection requests and set the queue capacity for pending connections",
      "To listen to audio files over UDP",
      "To bind an IP address to the network card",
      "To terminate the process when a client disconnects"
    ],
    "correctIndex": 0,
    "explanation": "`listen()` marks the socket as passive to accept incoming SYN handshakes, with `backlog` defining the queue depth for completed/half-open connections.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-46",
    "question": "In socket programming, which system call blocks on a passive TCP socket until a client completes the 3-way handshake, returning a NEW connected socket descriptor?",
    "options": [
      "bind()",
      "connect()",
      "accept()",
      "select()"
    ],
    "correctIndex": 2,
    "explanation": "`accept()` extracts the first completed connection from the listening socket's backlog queue, creating a new dedicated connected socket descriptor for client communication.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-47",
    "question": "What is the purpose of the `SO_REUSEADDR` socket option?",
    "options": [
      "To use two Ethernet cables on one laptop",
      "To allow a server to bind to a local port that is currently in the `TIME_WAIT` state, enabling instant server restarts without waiting 2 minutes",
      "To recycle deleted IP addresses",
      "To change the MAC address of the server"
    ],
    "correctIndex": 1,
    "explanation": "`SO_REUSEADDR` bypasses the `TIME_WAIT` port lock (typically 2*MSL = 120s), allowing a restarted server to rebind to its port immediately.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-48",
    "question": "What does the `X-Forwarded-For` HTTP header represent when traffic passes through a Layer 7 Reverse Proxy (like NGINX)?",
    "options": [
      "The email address of the developer",
      "The original client's public IP address before it was obscured by the proxy's own IP address",
      "The version of the proxy software",
      "A secret encryption key"
    ],
    "correctIndex": 1,
    "explanation": "Reverse proxies terminate incoming TCP connections and open new connections to backends; `X-Forwarded-For: <client_ip>` preserves the originating client's true IP.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-49",
    "question": "What is the binary representation of the subnet mask `255.255.254.0` (/23)?",
    "options": [
      "11111111.11111111.11111110.00000000",
      "11111111.11111111.11111100.00000000",
      "11111111.11111111.11111111.10000000",
      "11111111.11111110.00000000.00000000"
    ],
    "correctIndex": 0,
    "explanation": "/23 has 23 consecutive ones: eight 1s (255), eight 1s (255), seven 1s followed by one 0 (254), and eight 0s (0).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-pre-50",
    "question": "An application programmer observes that repeated `GET /api/v1/users/42` requests return HTTP 200 without modifying any database records. According to REST specifications, what two properties does this method satisfy?",
    "options": [
      "Encrypted and Synchronous",
      "Safe (read-only) and Idempotent (f(f(x)) = f(x))",
      "Volatile and Asynchronous",
      "Stateless and Non-idempotent"
    ],
    "correctIndex": 1,
    "explanation": "GET is defined as Safe (does not alter server state) and Idempotent (calling it 1x or 100x produces the same server state).",
    "category": "Practical Execution & Trace (70%)"
  }
];

export const DAY_7_POST_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d7-post-1",
    "question": "In Roy Fielding's REST architectural dissertation, what does the 'Uniform Interface' constraint mandate?",
    "options": [
      "All web pages must use the exact same CSS stylesheet",
      "Resources are identified by URIs, manipulated through representations, deliver self-descriptive messages, and use Hypermedia as the Engine of Application State (HATEOAS)",
      "All server hardware must run the same Linux distribution",
      "All API responses must be formatted in binary assembly"
    ],
    "correctIndex": 1,
    "explanation": "Uniform interface requires URI identification, representation manipulation, self-describing messages, and hypermedia controls (HATEOAS).",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-2",
    "question": "What is the precise difference between HTTP PUT and HTTP PATCH?",
    "options": [
      "PUT deletes resources; PATCH creates resources",
      "PUT is a complete resource replacement (idempotent); PATCH applies partial modifications to a resource",
      "PUT only accepts XML; PATCH only accepts JSON",
      "There is no difference; they are exact aliases"
    ],
    "correctIndex": 1,
    "explanation": "PUT completely replaces the resource state with the supplied representation; PATCH modifies only the specified fields.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-3",
    "question": "Why is HTTP DELETE considered idempotent even if subsequent DELETE calls return 404 Not Found?",
    "options": [
      "Because 404 is a success code",
      "Because idempotency evaluates the resulting server resource state (the resource remains nonexistent), not the returned status code",
      "Because servers ignore duplicate DELETE requests",
      "Because browsers automatically convert DELETE into GET"
    ],
    "correctIndex": 1,
    "explanation": "Idempotency means repeated identical requests produce the same server side-effects. Deleting an already-deleted resource leaves it deleted.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-4",
    "question": "What does HTTP status code 401 Unauthorized indicate compared to HTTP 403 Forbidden?",
    "options": [
      "401 is Authentication failure ('Who are you? Missing/invalid token'); 403 is Authorization failure ('I know who you are, but you lack permission')",
      "401 means server error; 403 means client error",
      "401 is for mobile; 403 is for desktop",
      "They are identical status codes"
    ],
    "correctIndex": 0,
    "explanation": "401 means authentication credentials are missing or invalid; 403 means identity is verified, but permissions to access the resource are denied.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-5",
    "question": "What is the primary motivation for HTTP/3 adopting QUIC over UDP instead of TCP?",
    "options": [
      "To avoid paying licensing fees for TCP",
      "To eliminate TCP-level Head-of-Line blocking (packet loss in one stream stalling all other streams) and enable zero-RTT connection resumption and connection migration across Wi-Fi/cellular transitions",
      "To remove encryption completely",
      "Because UDP cables transmit signals faster than TCP cables"
    ],
    "correctIndex": 1,
    "explanation": "QUIC runs over UDP and handles streams independently inside user space, so a dropped packet in Stream A never stalls Stream B (solving transport HoL blocking).",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-6",
    "question": "What is the difference between a forward proxy and a reverse proxy?",
    "options": [
      "Forward proxies sit in front of clients to filter and cache outbound requests; Reverse proxies sit in front of backend servers to load balance, terminate SSL, and protect infrastructure",
      "Forward proxies only work for downloading; reverse proxies only work for uploading",
      "Forward proxies reverse the order of bytes in packets",
      "Reverse proxies are only used by hackers"
    ],
    "correctIndex": 0,
    "explanation": "Forward proxies represent clients contacting the internet; reverse proxies represent backend origin servers receiving incoming internet traffic.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-7",
    "question": "How does the TCP Sliding Window mechanism prevent a fast sender from overwhelming a slow receiver (Flow Control)?",
    "options": [
      "By rebooting the sender when the receiver is slow",
      "The receiver advertises its available buffer space via the `Receive Window` (rwnd) field in every ACK packet, capping the sender's unacknowledged bytes",
      "By discarding all odd-numbered packets",
      "By converting the stream to UDP"
    ],
    "correctIndex": 1,
    "explanation": "Flow control is receiver-driven: the receiver advertises `rwnd` in TCP header acknowledgment packets, instructing the sender how many bytes it can accept.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-8",
    "question": "What is the role of an Authoritative DNS Nameserver?",
    "options": [
      "To store temporary internet browser cookies",
      "To hold the actual DNS zone file records (A, CNAME, MX) configured by the domain owner and provide definitive answers for that specific domain",
      "To assign private IP addresses to home laptops",
      "To filter spam emails"
    ],
    "correctIndex": 1,
    "explanation": "Authoritative nameservers are the official source of truth for a domain's records, answering queries with definitive DNS mapping data.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-9",
    "question": "What attack does a Certificate Authority (CA) public-key infrastructure protect against in HTTPS?",
    "options": [
      "Man-in-the-Middle (MITM) attacks by verifying that the server's public key truly belongs to the requested domain through a cryptographically signed digital certificate",
      "Physical theft of server hard drives",
      "Excessive network electricity consumption",
      "Buffer overflow bugs in C code"
    ],
    "correctIndex": 0,
    "explanation": "Without trusted CAs, an attacker could intercept traffic and present their own public key. Digital certificates bind domain names to public keys cryptographically.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-10",
    "question": "What is the purpose of the `Content-Security-Policy` (CSP) HTTP header?",
    "options": [
      "To prevent Cross-Site Scripting (XSS) and data injection by specifying the exact trusted domains and hashes from which scripts, styles, and images can be loaded",
      "To compress JPEG photos",
      "To check whether the client computer has an antivirus installed",
      "To encrypt local storage databases"
    ],
    "correctIndex": 0,
    "explanation": "CSP restricts which scripts and resources the browser is allowed to execute or fetch, blocking inline injected malicious script payloads.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-11",
    "question": "In IPv4, what is the purpose of the 169.254.0.0/16 address block?",
    "options": [
      "Automatic Private IP Addressing (APIPA / Link-Local) assigned by the operating system when no DHCP server responds",
      "Public IPs allocated to Google",
      "Class E experimental broadcast",
      "Loopback test range"
    ],
    "correctIndex": 0,
    "explanation": "169.254.0.0/16 is the APIPA link-local range auto-assigned by Windows/macOS/Linux when a network interface fails to obtain a lease from a DHCP server.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-12",
    "question": "What is the purpose of the TCP `RST` (Reset) packet flag?",
    "options": [
      "To request a new password",
      "To immediately abort a connection abnormally when a packet arrives for a port with no listening process or due to an invalid state",
      "To restart the physical router",
      "To double the window size"
    ],
    "correctIndex": 1,
    "explanation": "A TCP RST abruptly tears down the connection without a 4-way FIN handshake, signaling that an unrecoverable error occurred or the port was closed.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-13",
    "question": "What is the difference between TCP Keep-Alive and HTTP Keep-Alive (Persistent Connections)?",
    "options": [
      "They are identical concepts",
      "HTTP Keep-Alive reuses the same established TCP connection for multiple successive HTTP requests; TCP Keep-Alive sends empty probe packets during idle periods to detect dead peers",
      "HTTP Keep-Alive is only for videos",
      "TCP Keep-Alive only works on Wi-Fi"
    ],
    "correctIndex": 1,
    "explanation": "HTTP Persistent Connection (`Connection: keep-alive`) avoids repeated TCP handshakes for web assets. TCP Keep-Alive is an OS-level probe detecting broken socket connections.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-14",
    "question": "What is a 'SYN Backlog Queue' in an operating system's TCP/IP stack?",
    "options": [
      "A list of downloaded files",
      "A kernel data structure storing half-open connections (SYN received, waiting for the client's final ACK)",
      "A queue of deleted browser tabs",
      "A list of blocked IP addresses"
    ],
    "correctIndex": 1,
    "explanation": "The SYN backlog holds half-open connections until the client's ACK arrives, transitioning the connection into the accept queue.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-15",
    "question": "What does the `ETag` (Entity Tag) HTTP response header represent in web caching?",
    "options": [
      "An electronic price tag",
      "An opaque cryptographic fingerprint or hash representing the specific version of a resource to enable conditional cache validation",
      "The user's social security number",
      "The server's physical CPU temperature"
    ],
    "correctIndex": 1,
    "explanation": "ETag is a hash of the resource representation. Clients pass it back in `If-None-Match` to avoid re-downloading unchanged content.",
    "category": "Theory (30%)"
  },
  {
    "id": "d7-post-16",
    "question": "A company requires 6 distinct departments on the network `192.168.50.0/24`. What is the smallest CIDR prefix that provides at least 6 subnets, and how many usable hosts are available per subnet?",
    "options": [
      "/27 (8 subnets, 30 usable hosts per subnet)",
      "/26 (4 subnets, 62 usable hosts per subnet)",
      "/28 (16 subnets, 14 usable hosts per subnet)",
      "/25 (2 subnets, 126 usable hosts per subnet)"
    ],
    "correctIndex": 0,
    "explanation": "To get at least 6 subnets, we need 3 subnet bits (2^3 = 8 >= 6). 24 + 3 = /27. Remaining host bits = 32 - 27 = 5. Usable hosts = 2^5 - 2 = 30.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-17",
    "question": "What is the third usable host IP address in the second subnet of `192.168.1.0/26`?",
    "options": [
      "192.168.1.65",
      "192.168.1.66",
      "192.168.1.67",
      "192.168.1.68"
    ],
    "correctIndex": 2,
    "explanation": "Subnet 0 is 192.168.1.0. Subnet 1 (second subnet) starts at network 192.168.1.64. Host 1 = .65, Host 2 = .66, Host 3 = .67.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-18",
    "question": "Given a packet with source IP `10.0.0.1` and destination IP `192.168.1.1` arriving at a router with the routing table below, which next-hop interface is chosen?\n1. `192.168.1.0/24` -> `eth1`\n2. `192.168.1.0/26` -> `eth2`\n3. `192.168.0.0/16` -> `eth3`\n4. `0.0.0.0/0` -> `eth0`",
    "options": [
      "eth0",
      "eth1",
      "eth2",
      "eth3"
    ],
    "correctIndex": 2,
    "explanation": "Under Longest Prefix Match (LPM), /26 has 26 matching bits which is longer and more specific than /24 or /16, so `eth2` is selected.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-19",
    "question": "Trace TCP Selective Acknowledgment (SACK). A sender transmits segments 1, 2, 3, 4, 5. Segment 2 is dropped by a router, but segments 3, 4, 5 arrive safely. What will the receiver's ACK packet contain?",
    "options": [
      "ACK = 6",
      "Cumulative ACK = 2, with SACK option block indicating bytes for segments 3-5 were received",
      "ACK = 1",
      "TCP RST"
    ],
    "correctIndex": 1,
    "explanation": "Cumulative ACK remains at 2 (the next expected byte), while the SACK block informs the sender that segments 3-5 arrived, allowing retransmission of ONLY segment 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-20",
    "question": "A client opens a browser and types `https://api.example.com/data`. Trace the exact chronological sequence of network operations before HTTP response data is received:",
    "options": [
      "1. HTTP GET -> 2. DNS Lookup -> 3. TLS Handshake -> 4. TCP Handshake",
      "1. DNS Lookup -> 2. TCP 3-Way Handshake -> 3. TLS Cryptographic Handshake -> 4. HTTP GET -> 5. Response Render",
      "1. TLS Handshake -> 2. TCP Handshake -> 3. DNS Lookup -> 4. HTTP GET",
      "1. ARP Query -> 2. HTTP GET -> 3. DNS Lookup"
    ],
    "correctIndex": 1,
    "explanation": "First, DNS resolves hostname to IP; second, TCP 3-way handshake establishes connection; third, TLS negotiates encrypted session; fourth, HTTP request is transmitted.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-21",
    "question": "An engineer configures an IPv4 network with prefix `/29`. What is the subnet mask in binary and hexadecimal?",
    "options": [
      "Binary: 11111111.11111111.11111111.11111000 | Hex: 0xFFFFFFF8",
      "Binary: 11111111.11111111.11111111.11110000 | Hex: 0xFFFFFFF0",
      "Binary: 11111111.11111111.11111111.11000000 | Hex: 0xFFFFFFC0",
      "Binary: 11111111.11111111.11111111.00000000 | Hex: 0xFFFFFF00"
    ],
    "correctIndex": 0,
    "explanation": "Prefix /29 has 29 ones and 3 zeros in binary, which corresponds to 255.255.255.248, or hex 0xFFFFFFF8.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-22",
    "question": "A backend service receives an HTTP POST request to `/api/v1/payments` with an `Idempotency-Key: e9a2-41bf`. How does a distributed cache (like Redis) guarantee safe retries without double-charging?",
    "options": [
      "It deletes the customer's bank account",
      "It executes `SET idempotency_key response_payload NX EX 86400`; if key already exists, it immediately returns the cached response without re-executing payment processing",
      "It rejects all requests with HTTP 400",
      "It generates a new credit card number"
    ],
    "correctIndex": 1,
    "explanation": "Atomic `SET ... NX` (Set if Not Exists) stores the key with the result. Any subsequent identical request within TTL returns the cached response, preventing duplicate processing.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-23",
    "question": "What does the following HTTP response header enforce?\n`Cache-Control: private, max-age=3600, must-revalidate`",
    "options": [
      "The response may only be stored in private client browser caches (not shared public CDN/proxy caches) for 3600 seconds, and must be revalidated with origin after expiring",
      "The response is completely uncacheable anywhere",
      "The response is cached forever on public CDNs",
      "The browser will delete all history"
    ],
    "correctIndex": 0,
    "explanation": "`private` restricts storage to end-user browser caches. `max-age=3600` caches for 1 hour. `must-revalidate` prohibits using stale cached representations without origin validation.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-24",
    "question": "An IPv4 host at `192.168.1.100` needs to send a packet to `192.168.1.200` on the same `/24` subnet. It has no ARP entry for `.200`. What happens first?",
    "options": [
      "The host drops the packet",
      "The host broadcasts an ARP Request (`FF:FF:FF:FF:FF:FF`) asking 'Who has 192.168.1.200?'",
      "The host sends the packet directly to the default gateway router",
      "The host reboots its network interface"
    ],
    "correctIndex": 1,
    "explanation": "Because the destination is on the local subnet, the host broadcasts an ARP request to learn the target's MAC address before sending the Layer 2 frame.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-25",
    "question": "In the scenario above, if the destination were `8.8.8.8` (an external internet IP), whose MAC address would the sender query via ARP?",
    "options": [
      "Google's server MAC address",
      "The local Default Gateway router's MAC address",
      "The root DNS server's MAC address",
      "Broadcast MAC address FF:FF:FF:FF:FF:FF forever"
    ],
    "correctIndex": 1,
    "explanation": "For off-subnet destinations, traffic must be forwarded through the default gateway; thus, the host ARPs for the Default Gateway's MAC address.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-26",
    "question": "Trace TCP Nagle's Algorithm. When is Nagle's algorithm disabled using the `TCP_NODELAY` socket option?",
    "options": [
      "When downloading massive multi-gigabyte ISO files",
      "In low-latency interactive applications (like online gaming or financial trading) where small packets must be sent immediately without waiting to coalesce into a full MSS",
      "When using UDP sockets",
      "To save computer battery"
    ],
    "correctIndex": 1,
    "explanation": "Nagle buffers small packets until prior packets are acknowledged. Disabling it via `TCP_NODELAY` eliminates buffering delay for latency-sensitive real-time communication.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-27",
    "question": "A client initiates a cross-origin HTTP request with custom header `X-Auth-Role: admin`. What will the browser automatically transmit prior to the actual request?",
    "options": [
      "An HTTP GET ping",
      "An HTTP `OPTIONS` preflight request containing `Access-Control-Request-Headers: x-auth-role` to verify server permission",
      "A DNS zone transfer request",
      "A TCP FIN termination packet"
    ],
    "correctIndex": 1,
    "explanation": "Non-simple cross-origin requests trigger an automatic preflight `OPTIONS` request where the browser checks if the server permits the custom header.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-28",
    "question": "What is the network ID and first usable host IP for `172.24.160.0/19`?",
    "options": [
      "Network: 172.24.160.0, First Usable Host: 172.24.160.1",
      "Network: 172.24.128.0, First Usable Host: 172.24.128.1",
      "Network: 172.24.0.0, First Usable Host: 172.24.0.1",
      "Network: 172.24.160.0, First Usable Host: 172.24.160.0"
    ],
    "correctIndex": 0,
    "explanation": "A /19 mask has a block size of 32 in the third octet (multiples: 0, 32, 64, 96, 128, 160). 160 is a valid boundary, so Network is 172.24.160.0 and first host is 172.24.160.1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-29",
    "question": "What is the difference between TCP Reno and TCP Tahoe regarding packet loss handling on timeout?",
    "options": [
      "TCP Tahoe drops cwnd to 1 MSS on both timeout and 3 duplicate ACKs; TCP Reno drops cwnd to 1 MSS on timeout, but cuts cwnd in half and enters Fast Recovery on 3 duplicate ACKs",
      "TCP Reno is for wireless only",
      "TCP Tahoe never uses sequence numbers",
      "TCP Reno does not support slow start"
    ],
    "correctIndex": 0,
    "explanation": "Tahoe resets cwnd to 1 on any loss. Reno distinguishes timeouts (drops to 1) from 3 duplicate ACKs (cuts cwnd in half and uses Fast Recovery).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-30",
    "question": "An IP packet has Total Length = 40 bytes and Header Length (IHL) = 5 (in 32-bit words). How many bytes of payload data does this packet contain?",
    "options": [
      "20 bytes",
      "35 bytes",
      "40 bytes",
      "0 bytes"
    ],
    "correctIndex": 0,
    "explanation": "IHL = 5 words = 5 * 4 = 20 bytes of header. Payload = Total Length (40) - Header Length (20) = 20 bytes.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-31",
    "question": "What is the standard port and transport protocol for SSH (Secure Shell) remote access?",
    "options": [
      "TCP port 22",
      "UDP port 23",
      "TCP port 8080",
      "UDP port 53"
    ],
    "correctIndex": 0,
    "explanation": "SSH operates over reliable TCP port 22, providing encrypted terminal and file transfer capabilities.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-32",
    "question": "A web server receives 10,000 rapid requests per second from a single IP address `203.0.113.88`. Which architectural component should intercept and reject this traffic with HTTP 429 Too Many Requests?",
    "options": [
      "The relational database table",
      "The API Gateway / Web Application Firewall (WAF) implementing a distributed Token Bucket or Leaky Bucket rate limiter",
      "The frontend JavaScript React bundle",
      "The user's local mouse driver"
    ],
    "correctIndex": 1,
    "explanation": "API Gateways (like Kong/Envoy) and WAFs enforce rate limits before requests hit backend business microservices or databases.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-33",
    "question": "What does the `Set-Cookie: session=xyz; HttpOnly; Secure; SameSite=Lax` header combination achieve?",
    "options": [
      "Prevents JavaScript access to the cookie via `document.cookie` (HttpOnly), ensures transmission only over HTTPS (Secure), and restricts cross-site request sending (SameSite)",
      "Makes the cookie readable by any external domain",
      "Stores the cookie in the operating system BIOS",
      "Disables encryption"
    ],
    "correctIndex": 0,
    "explanation": "HttpOnly prevents XSS theft, Secure enforces TLS transmission, and SameSite protects against CSRF forgery.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-34",
    "question": "How does a DNS amplification Distributed Denial of Service (DDoS) attack work?",
    "options": [
      "The attacker downloads all websites on the internet",
      "The attacker sends small DNS queries (e.g. `ANY` record) with a spoofed source IP matching the victim to open recursive resolvers, which reply with 50x-70x larger responses directed at the victim",
      "The attacker physically damages DNS antennas",
      "The attacker changes the domain name password"
    ],
    "correctIndex": 1,
    "explanation": "DNS amplification uses spoofed UDP source addresses to bounce large responses off public recursive DNS resolvers, flooding the victim with massive bandwidth.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-35",
    "question": "What is the maximum number of subnets and usable hosts per subnet obtained by subnetting `172.16.0.0/16` into `/20` subnets?",
    "options": [
      "16 subnets with 4094 usable hosts each",
      "4 subnets with 16382 usable hosts each",
      "64 subnets with 1022 usable hosts each",
      "8 subnets with 8190 usable hosts each"
    ],
    "correctIndex": 0,
    "explanation": "Subnet bits = 20 - 16 = 4 bits -> 2^4 = 16 subnets. Host bits = 32 - 20 = 12 bits -> 2^12 - 2 = 4094 usable hosts per subnet.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-36",
    "question": "In socket programming, what error is returned if a client calls `connect()` on a server port where no application is currently listening?",
    "options": [
      "ECONNREFUSED (Connection Refused)",
      "ETIMEDOUT",
      "EADDRINUSE",
      "EPIPE"
    ],
    "correctIndex": 0,
    "explanation": "When no process is listening on the target port, the host operating system responds with a TCP RST, causing the client's `connect()` call to fail with `ECONNREFUSED`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-37",
    "question": "What is the function of the BGP (Border Gateway Protocol) on the global Internet?",
    "options": [
      "To translate domain names to IP addresses for home computers",
      "An exterior gateway path-vector protocol used to exchange routing and reachability information among Autonomous Systems (AS) across the global Internet backbone",
      "To assign private Wi-Fi passwords",
      "To synchronize time clocks across computers"
    ],
    "correctIndex": 1,
    "explanation": "BGP is the routing protocol that binds the global Internet together, managing routes between distinct Autonomous Systems owned by ISPs and tech giants.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-38",
    "question": "An IP address is `192.168.100.14` and its subnet mask is `255.255.255.240` (/28). What is the broadcast address of this subnet?",
    "options": [
      "192.168.100.15",
      "192.168.100.31",
      "192.168.100.255",
      "192.168.100.16"
    ],
    "correctIndex": 0,
    "explanation": "Prefix /28 has block size of 16 (256 - 240). Subnet ranges from 0 to 15. Since .14 falls in this range, network is .0 and broadcast is .15.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-39",
    "question": "What is the purpose of the `TIME_WAIT` state in the TCP state transition diagram?",
    "options": [
      "To wait for the user to type a new command",
      "To remain active for 2*MSL (Maximum Segment Lifetime) to ensure the remote host received the final ACK and to prevent stale duplicate segments from interfering with future connections",
      "To measure download ping speed",
      "To save electricity on the network switch"
    ],
    "correctIndex": 1,
    "explanation": "TIME_WAIT lasts for 2*MSL (typically 60-120s) so any delayed duplicate packets drain from the network and the final ACK is reliably delivered.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-40",
    "question": "What is the primary vulnerability prevented by setting the `X-Content-Type-Options: nosniff` header?",
    "options": [
      "SQL injection attacks",
      "MIME-type sniffing attacks, where the browser incorrectly interprets executable scripts disguised as images or text files",
      "Wi-Fi eavesdropping",
      "Buffer overflow exploits"
    ],
    "correctIndex": 1,
    "explanation": "`nosniff` forces browsers to adhere strictly to the declared `Content-Type`, preventing malicious file uploads from being executed as JavaScript.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-41",
    "question": "In IPv4 routing, what does the destination address `0.0.0.0/0` represent in a host routing table?",
    "options": [
      "The loopback interface",
      "The Default Gateway (default route for any packet whose destination does not match any specific routing table entry)",
      "An invalid address that crashes the router",
      "A multicast address"
    ],
    "correctIndex": 1,
    "explanation": "0.0.0.0/0 matches any destination IP with a prefix length of 0, serving as the Default Gateway route when no specific route exists.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-42",
    "question": "A client sends an HTTP request with `Accept-Encoding: gzip, br`. What does this header communicate to the server?",
    "options": [
      "The client wants to compress the server's hard disk",
      "The client supports decompressing response bodies compressed with gzip or Brotli algorithms to save bandwidth",
      "The client is using Google Chrome on Windows",
      "The client requires TLS 1.3 encryption"
    ],
    "correctIndex": 1,
    "explanation": "`Accept-Encoding` informs the origin or CDN which compression algorithms the client understands, allowing the server to return compressed payloads.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-43",
    "question": "What is the primary role of the ICMP protocol in IP networking?",
    "options": [
      "To stream movies and video games",
      "To deliver operational network diagnostic and error-reporting messages (e.g., Destination Unreachable, Time Exceeded, Echo Request/Reply)",
      "To replace TCP for all web traffic",
      "To assign domain names to websites"
    ],
    "correctIndex": 1,
    "explanation": "ICMP (Internet Control Message Protocol) is used by network devices to send error and diagnostic messages (like Ping and Traceroute).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-44",
    "question": "What is the broadcast address for `10.1.2.0/23`?",
    "options": [
      "10.1.2.255",
      "10.1.3.255",
      "10.1.255.255",
      "10.1.4.255"
    ],
    "correctIndex": 1,
    "explanation": "Prefix /23 covers 2 Class C blocks (even boundary: 2 and 3). Network is 10.1.2.0. Broadcast is 10.1.3.255.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-45",
    "question": "In HTTP/2 and HTTP/3, what is 'Server Push'?",
    "options": [
      "Physical moving of server racks in the data center",
      "The server proactively sending cacheable resource assets (like CSS and JS files) to the client before the client parses the HTML and explicitly requests them",
      "Pushing code to GitHub",
      "Sending notifications to mobile phones"
    ],
    "correctIndex": 1,
    "explanation": "Server Push allows an HTTP/2 server to send critical sub-resources (CSS/JS) anticipating that the client will need them to render the requested page.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-46",
    "question": "What is the purpose of the `Transfer-Encoding: chunked` header in HTTP/1.1?",
    "options": [
      "To send the payload in variable-sized chunks when the total content length is unknown at the start of transmission (e.g., streaming dynamic data)",
      "To break database tables into CSV chunks",
      "To send data over multiple Wi-Fi networks",
      "To delete the connection"
    ],
    "correctIndex": 0,
    "explanation": "Chunked transfer encoding allows a server to stream dynamically generated data without needing to know or buffer the full `Content-Length` beforehand.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-47",
    "question": "What does an HTTP 502 Bad Gateway status code indicate?",
    "options": [
      "The client typed an incorrect URL",
      "An edge reverse-proxy or load balancer received an invalid or crashed response from an upstream backend server",
      "The user's Wi-Fi router is disconnected",
      "The SSL certificate has expired"
    ],
    "correctIndex": 1,
    "explanation": "502 Bad Gateway occurs when an intermediate proxy receives an invalid response, connection reset, or crash from the upstream application server.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-48",
    "question": "What does an HTTP 504 Gateway Timeout status code indicate?",
    "options": [
      "The client computer shut down",
      "An edge reverse-proxy or load balancer timed out while waiting for a response from the upstream backend server",
      "The user ran out of mobile data",
      "The server firewall was turned off"
    ],
    "correctIndex": 1,
    "explanation": "504 Gateway Timeout means the reverse proxy waited longer than its configured timeout threshold for the upstream microservice to reply.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-49",
    "question": "How many total IP addresses are contained in an IPv4 `/30` subnet (commonly used for point-to-point router links)?",
    "options": [
      "2 total, 0 usable",
      "4 total, 2 usable hosts",
      "8 total, 6 usable hosts",
      "16 total, 14 usable hosts"
    ],
    "correctIndex": 1,
    "explanation": "A /30 subnet has 32 - 30 = 2 host bits. 2^2 = 4 total addresses. Subtracting network and broadcast yields exactly 2 usable host addresses (ideal for router-to-router point-to-point links).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d7-post-50",
    "question": "What is the passing score benchmark for the SPSU Day 7 Assessment to unlock the Day 7 Daily Badge and advance toward technical mastery?",
    "options": [
      "Strictly 80% (at least 40 out of 50 correct)",
      "50% (25 out of 50)",
      "60% (30 out of 50)",
      "75% (37 out of 50)"
    ],
    "correctIndex": 0,
    "explanation": "The SPSU Placement Readiness curriculum enforces an 80% benchmark (40/50 correct) on daily post-assessments to guarantee verified technical competence.",
    "category": "Practical Execution & Trace (70%)"
  }
];
