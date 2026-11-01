import { PracticalChallenge } from '../types';

/**
 * Day 7: 10 Comprehensive Practical Coding Challenges (70% Practical Allocation)
 * Module 7: Computer Networks, Protocols & REST Security
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 * Polyglot implementations: C (C17), C++ (C++20), Java (Java 21), Python (Python 3.12)
 * Complete with visualization steps, starter code, solutions & test cases.
 */
export const DAY_7_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  {
    id: 'd7-prob-1',
    day: 7,
    title: 'IPv4 CIDR Subnet Mask & Usable Host Calculator',
    difficulty: 'Easy',
    moduleTag: 'Module 7: Computer Networks',
    problemStatement:
      'Given an IPv4 CIDR prefix length N (e.g., 24), compute the dotted-decimal subnet mask, the total number of IP addresses in the subnet, and the exact count of usable host IP addresses (excluding network and broadcast addresses). If prefix is 31 or 32, usable hosts are 2 (RFC 3021 point-to-point) or 1 (host route).',
    inputFormat: 'A single integer prefix length N (1 <= N <= 32).',
    outputFormat: 'Print "CIDR /<N> -> Mask: <A.B.C.D> | Total: <total> | Usable: <usable>".',
    constraints: ['1 <= N <= 32', 'O(1) time and space complexity'],
    sampleInput: '24',
    sampleOutput: 'CIDR /24 -> Mask: 255.255.255.0 | Total: 256 | Usable: 254',
    kapilIntuition:
      'A /N prefix assigns N bits to the network ID and (32 - N) bits to host addresses. The 32-bit mask is (0xFFFFFFFF << (32 - N)) & 0xFFFFFFFF. Total IPs = 2^(32 - N). For N <= 30, usable = total - 2; for N=31 usable = 2; for N=32 usable = 1.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'Read Prefix N', description: 'N = 24. Host bits = 32 - 24 = 8 bits.', variables: { prefix: 24, hostBits: 8 } },
      { step: 2, label: 'Compute Mask Bitwise', description: 'Shift 0xFFFFFFFF << 8: 11111111.11111111.11111111.00000000.', variables: { octet1: 255, octet2: 255, octet3: 255, octet4: 0 } },
      { step: 3, label: 'Compute Usable Hosts', description: 'Total = 2^8 = 256. Exclude .0 (Network) and .255 (Broadcast): 254 usable.', variables: { total: 256, usable: 254 } },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdint.h>

int main() {
    int prefix;
    if (scanf("%d", &prefix) == 1) {
        // Compute dotted-decimal mask, total IPs, and usable hosts
        printf("CIDR /%d -> Mask: 255.255.255.0 | Total: 256 | Usable: 254\\n", prefix);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <cstdint>

using namespace std;

int main() {
    int prefix;
    if (cin >> prefix) {
        // Implement CIDR calculator
        cout << "CIDR /" << prefix << " -> Mask: 255.255.255.0 | Total: 256 | Usable: 254" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int prefix = sc.nextInt();
            // Implement CIDR calculation
            System.out.println("CIDR /" + prefix + " -> Mask: 255.255.255.0 | Total: 256 | Usable: 254");
        }
    }
}`,
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        return
    prefix = int(line)
    # Implement CIDR calculation
    print(f"CIDR /{prefix} -> Mask: 255.255.255.0 | Total: 256 | Usable: 254")

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdint.h>

int main() {
    int prefix;
    if (scanf("%d", &prefix) == 1) {
        uint32_t mask = (prefix == 0) ? 0 : (prefix == 32) ? 0xFFFFFFFF : ~((1U << (32 - prefix)) - 1);
        unsigned long long total = 1ULL << (32 - prefix);
        unsigned long long usable = (prefix >= 31) ? (prefix == 31 ? 2 : 1) : (total - 2);
        int a = (mask >> 24) & 0xFF;
        int b = (mask >> 16) & 0xFF;
        int c = (mask >> 8) & 0xFF;
        int d = mask & 0xFF;
        printf("CIDR /%d -> Mask: %d.%d.%d.%d | Total: %llu | Usable: %llu\\n", prefix, a, b, c, d, total, usable);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <cstdint>

using namespace std;

int main() {
    int prefix;
    if (cin >> prefix) {
        uint32_t mask = (prefix == 0) ? 0 : (prefix == 32) ? 0xFFFFFFFF : ~((1U << (32 - prefix)) - 1);
        unsigned long long total = 1ULL << (32 - prefix);
        unsigned long long usable = (prefix >= 31) ? (prefix == 31 ? 2 : 1) : (total - 2);
        int a = (mask >> 24) & 0xFF;
        int b = (mask >> 16) & 0xFF;
        int c = (mask >> 8) & 0xFF;
        int d = mask & 0xFF;
        cout << "CIDR /" << prefix << " -> Mask: " << a << "." << b << "." << c << "." << d 
             << " | Total: " << total << " | Usable: " << usable << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int prefix = sc.nextInt();
            long maskVal = (prefix == 0) ? 0L : (0xFFFFFFFFL << (32 - prefix)) & 0xFFFFFFFFL;
            long total = 1L << (32 - prefix);
            long usable = (prefix >= 31) ? (prefix == 31 ? 2 : 1) : (total - 2);
            long a = (maskVal >>> 24) & 0xFF;
            long b = (maskVal >>> 16) & 0xFF;
            long c = (maskVal >>> 8) & 0xFF;
            long d = maskVal & 0xFF;
            System.out.println("CIDR /" + prefix + " -> Mask: " + a + "." + b + "." + c + "." + d +
                               " | Total: " + total + " | Usable: " + usable);
        }
    }
}`,
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        return
    prefix = int(line)
    host_bits = 32 - prefix
    mask_val = (0xFFFFFFFF << host_bits) & 0xFFFFFFFF if host_bits < 32 else 0
    a = (mask_val >> 24) & 0xFF
    b = (mask_val >> 16) & 0xFF
    c = (mask_val >> 8) & 0xFF
    d = mask_val & 0xFF
    total = 2 ** host_bits
    usable = 2 if prefix == 31 else (1 if prefix == 32 else max(0, total - 2))
    print(f"CIDR /{prefix} -> Mask: {a}.{b}.{c}.{d} | Total: {total} | Usable: {usable}")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'd7-prob1-tc1',
        input: '24',
        expectedOutput: 'CIDR /24 -> Mask: 255.255.255.0 | Total: 256 | Usable: 254',
        isHidden: false,
        explanation: 'Standard Class C equivalent CIDR block.',
      },
      {
        id: 'd7-prob1-tc2',
        input: '28',
        expectedOutput: 'CIDR /28 -> Mask: 255.255.255.240 | Total: 16 | Usable: 14',
        isHidden: false,
        explanation: 'Subnet with 4 host bits allows 16 addresses with 14 usable hosts.',
      },
      {
        id: 'd7-prob1-tc3',
        input: '16',
        expectedOutput: 'CIDR /16 -> Mask: 255.255.0.0 | Total: 65536 | Usable: 65534',
        isHidden: true,
        explanation: 'Class B block with 16 host bits yields 65,534 usable hosts.',
      },
      {
        id: 'd7-prob1-tc4',
        input: '30',
        expectedOutput: 'CIDR /30 -> Mask: 255.255.255.252 | Total: 4 | Usable: 2',
        isHidden: true,
        explanation: 'Classic point-to-point link subnet with 2 usable IPs.',
      },
    ],
  },
  {
    id: 'd7-prob-2',
    day: 7,
    title: 'Validate IPv4 Dotted-Decimal and IPv6 Addresses',
    difficulty: 'Medium',
    moduleTag: 'Module 7: Computer Networks',
    problemStatement:
      'Given an IP address string, return "IPv4" if it is a valid IPv4 address, "IPv6" if it is a valid IPv6 address, or "Neither" otherwise.\n- IPv4: Four decimal numbers (0-255) separated by single dots. Leading zeros (e.g., "01") are invalid unless the number is "0".\n- IPv6: Eight groups of 1 to 4 hexadecimal digits (case-insensitive) separated by colons. Empty groups or leading colons without shorthand are invalid.',
    inputFormat: 'A single string IP address on one line.',
    outputFormat: 'Print "IPv4", "IPv6", or "Neither".',
    constraints: ['Length of string <= 100', 'No external regex libraries required'],
    sampleInput: '192.168.1.1',
    sampleOutput: 'IPv4',
    kapilIntuition:
      'For IPv4: split by "." (must produce exactly 4 parts). Each part must consist of 1-3 digits with no leading zero (unless single "0"), and 0 <= int(part) <= 255. For IPv6: split by ":" (must produce exactly 8 parts), each part 1-4 hex digits.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    visualizationSteps: [
      { step: 1, label: 'Check Delimiters', description: 'Look for "." or ":" to determine target IP protocol.', variables: { input: '192.168.1.1' } },
      { step: 2, label: 'Split Octets', description: 'Tokens: ["192", "168", "1", "1"]. Count = 4.', variables: { tokens: 4 } },
      { step: 3, label: 'Validate Values', description: 'All tokens numeric, no leading zeros, all in range [0, 255]. Valid IPv4.', variables: { result: 'IPv4' } },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char ip[128];
    if (scanf("%s", ip) == 1) {
        // Validate IPv4 or IPv6
        printf("IPv4\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string ip;
    if (cin >> ip) {
        // Check IPv4, IPv6, or Neither
        cout << "IPv4" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String ip = sc.next();
            // Validate IP
            System.out.println("IPv4");
        }
    }
}`,
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        return
    # Validate IPv4 or IPv6
    print("IPv4")

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

int isValidIPv4(const char *ip) {
    int dots = 0;
    for (int i = 0; ip[i]; i++) {
        if (ip[i] == '.') dots++;
    }
    if (dots != 3) return 0;
    char copy[128];
    strncpy(copy, ip, 127);
    copy[127] = '\\0';
    char *token = strtok(copy, ".");
    int count = 0;
    while (token) {
        count++;
        int len = strlen(token);
        if (len == 0 || len > 3) return 0;
        if (len > 1 && token[0] == '0') return 0;
        for (int i = 0; i < len; i++) {
            if (!isdigit(token[i])) return 0;
        }
        int val = atoi(token);
        if (val < 0 || val > 255) return 0;
        token = strtok(NULL, ".");
    }
    return count == 4;
}

int isValidIPv6(const char *ip) {
    int colons = 0;
    for (int i = 0; ip[i]; i++) {
        if (ip[i] == ':') colons++;
    }
    if (colons != 7) return 0;
    char copy[128];
    strncpy(copy, ip, 127);
    copy[127] = '\\0';
    char *token = strtok(copy, ":");
    int count = 0;
    while (token) {
        count++;
        int len = strlen(token);
        if (len == 0 || len > 4) return 0;
        for (int i = 0; i < len; i++) {
            if (!isxdigit(token[i])) return 0;
        }
        token = strtok(NULL, ":");
    }
    return count == 8;
}

int main() {
    char ip[128];
    if (scanf("%s", ip) == 1) {
        if (isValidIPv4(ip)) printf("IPv4\\n");
        else if (isValidIPv6(ip)) printf("IPv6\\n");
        else printf("Neither\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <sstream>
#include <vector>

using namespace std;

bool isValidIPv4(const string &ip) {
    if (ip.front() == '.' || ip.back() == '.') return false;
    stringstream ss(ip);
    string token;
    vector<string> parts;
    while (getline(ss, token, '.')) parts.push_back(token);
    if (parts.size() != 4) return false;
    for (const auto &p : parts) {
        if (p.empty() || p.size() > 3) return false;
        if (p.size() > 1 && p[0] == '0') return false;
        for (char c : p) if (!isdigit(c)) return false;
        int val = stoi(p);
        if (val < 0 || val > 255) return false;
    }
    return true;
}

bool isValidIPv6(const string &ip) {
    if (ip.front() == ':' || ip.back() == ':') return false;
    stringstream ss(ip);
    string token;
    vector<string> parts;
    while (getline(ss, token, ':')) parts.push_back(token);
    if (parts.size() != 8) return false;
    for (const auto &p : parts) {
        if (p.empty() || p.size() > 4) return false;
        for (char c : p) if (!isxdigit(c)) return false;
    }
    return true;
}

int main() {
    string ip;
    if (cin >> ip) {
        if (isValidIPv4(ip)) cout << "IPv4" << endl;
        else if (isValidIPv6(ip)) cout << "IPv6" << endl;
        else cout << "Neither" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    private static boolean isValidIPv4(String ip) {
        if (ip.startsWith(".") || ip.endsWith(".")) return false;
        String[] parts = ip.split("\\\\.");
        if (parts.length != 4) return false;
        for (String p : parts) {
            if (p.isEmpty() || p.length() > 3) return false;
            if (p.length() > 1 && p.charAt(0) == '0') return false;
            for (char c : p.toCharArray()) if (!Character.isDigit(c)) return false;
            int val = Integer.parseInt(p);
            if (val < 0 || val > 255) return false;
        }
        return true;
    }

    private static boolean isValidIPv6(String ip) {
        if (ip.startsWith(":") || ip.endsWith(":")) return false;
        String[] parts = ip.split(":");
        if (parts.length != 8) return false;
        for (String p : parts) {
            if (p.isEmpty() || p.length() > 4) return false;
            for (char c : p.toCharArray()) {
                if (!((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F'))) return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String ip = sc.next();
            if (isValidIPv4(ip)) System.out.println("IPv4");
            else if (isValidIPv6(ip)) System.out.println("IPv6");
            else System.out.println("Neither");
        }
    }
}`,
      python: `import sys

def check_ipv4(ip: str) -> bool:
    if ip.startswith(".") or ip.endswith("."):
        return False
    parts = ip.split(".")
    if len(parts) != 4:
        return False
    for p in parts:
        if not p.isdigit() or (len(p) > 1 and p[0] == "0") or int(p) < 0 or int(p) > 255:
            return False
    return True

def check_ipv6(ip: str) -> bool:
    if ip.startswith(":") or ip.endswith(":"):
        return False
    parts = ip.split(":")
    if len(parts) != 8:
        return False
    for p in parts:
        if len(p) == 0 or len(p) > 4 or not all(c in "0123456789abcdefABCDEF" for c in p):
            return False
    return True

def solve():
    line = sys.stdin.read().strip()
    if not line:
        return
    if check_ipv4(line):
        print("IPv4")
    elif check_ipv6(line):
        print("IPv6")
    else:
        print("Neither")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'd7-prob2-tc1',
        input: '172.16.254.1',
        expectedOutput: 'IPv4',
        isHidden: false,
        explanation: 'Valid private IPv4 address.',
      },
      {
        id: 'd7-prob2-tc2',
        input: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        expectedOutput: 'IPv6',
        isHidden: false,
        explanation: 'Standard 8-group full IPv6 address.',
      },
      {
        id: 'd7-prob2-tc3',
        input: '256.100.50.0',
        expectedOutput: 'Neither',
        isHidden: true,
        explanation: 'Octet 256 exceeds 255.',
      },
      {
        id: 'd7-prob2-tc4',
        input: '192.168.01.1',
        expectedOutput: 'Neither',
        isHidden: true,
        explanation: 'Leading zero in "01" is invalid.',
      },
    ],
  },
  {
    id: 'd7-prob-3',
    day: 7,
    title: 'Routing Table Longest Prefix Match (LPM) Lookup',
    difficulty: 'Medium',
    moduleTag: 'Module 7: Computer Networks',
    problemStatement:
      'Given a routing table of N routes where each route has a CIDR network (e.g., "192.168.0.0/16") and an exit interface (e.g., "eth1"), and a destination IP address, find the interface corresponding to the Longest Prefix Match (LPM). If no route matches, output "DROP".',
    inputFormat: 'Line 1: N (number of routes). Next N lines: "<CIDR> <Interface>". Final line: "<DestinationIP>".',
    outputFormat: 'Print "Route: <Interface> (Prefix /<len>)" or "DROP".',
    constraints: ['1 <= N <= 1000', 'Valid IPv4 CIDR notations (0 <= prefix <= 32)'],
    sampleInput: '3\n192.168.0.0/16 eth0\n192.168.1.0/24 eth1\n0.0.0.0/0 default_gw\n192.168.1.55',
    sampleOutput: 'Route: eth1 (Prefix /24)',
    kapilIntuition:
      'Parse both route and destination IPs into 32-bit unsigned integers. A route matches if (dest_ip & mask) == route_network. Among all matching routes, select the one with the maximum prefix length.',
    timeComplexity: 'O(N) linear search or O(W) with a Trie (W=32 bits)',
    spaceComplexity: 'O(N)',
    visualizationSteps: [
      { step: 1, label: 'Parse Destination', description: 'Dest 192.168.1.55 converted to 32-bit integer.', variables: { dest: '192.168.1.55' } },
      { step: 2, label: 'Evaluate Routes', description: '0.0.0.0/0 matches (/0). 192.168.0.0/16 matches (/16). 192.168.1.0/24 matches (/24).', variables: { matches: 3 } },
      { step: 3, label: 'Select LPM', description: 'Longest prefix is /24 with interface eth1.', variables: { bestPrefix: 24, iface: 'eth1' } },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        // Implement LPM routing lookup
        printf("Route: eth1 (Prefix /24)\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    int n;
    if (cin >> n) {
        // Implement Longest Prefix Match
        cout << "Route: eth1 (Prefix /24)" << endl;
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            // Implement LPM routing lookup
            System.out.println("Route: eth1 (Prefix /24)");
        }
    }
}`,
      python: `import sys

def solve():
    lines = sys.stdin.read().strip().split()
    if not lines:
        return
    # Implement Longest Prefix Match
    print("Route: eth1 (Prefix /24)")

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

uint32_t parseIP(const char *ipStr) {
    unsigned int a, b, c, d;
    sscanf(ipStr, "%u.%u.%u.%u", &a, &b, &c, &d);
    return ((uint32_t)a << 24) | ((uint32_t)b << 16) | ((uint32_t)c << 8) | (uint32_t)d;
}

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        char cidrs[1000][64], ifaces[1000][32];
        for (int i = 0; i < n; i++) {
            scanf("%s %s", cidrs[i], ifaces[i]);
        }
        char destStr[64];
        scanf("%s", destStr);
        uint32_t dest = parseIP(destStr);

        int bestPrefix = -1, bestIdx = -1;
        for (int i = 0; i < n; i++) {
            char ipPart[32];
            int prefix;
            sscanf(cidrs[i], "%[^/]/%d", ipPart, &prefix);
            uint32_t net = parseIP(ipPart);
            uint32_t mask = (prefix == 0) ? 0 : (prefix == 32) ? 0xFFFFFFFF : ~((1U << (32 - prefix)) - 1);
            if ((dest & mask) == (net & mask)) {
                if (prefix > bestPrefix) {
                    bestPrefix = prefix;
                    bestIdx = i;
                }
            }
        }
        if (bestIdx != -1) {
            printf("Route: %s (Prefix /%d)\\n", ifaces[bestIdx], bestPrefix);
        } else {
            printf("DROP\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <cstdint>

using namespace std;

uint32_t parseIP(const string &ip) {
    stringstream ss(ip);
    string token;
    uint32_t res = 0;
    while (getline(ss, token, '.')) {
        res = (res << 8) | stoi(token);
    }
    return res;
}

int main() {
    int n;
    if (cin >> n) {
        vector<pair<string, string>> routes(n);
        for (int i = 0; i < n; i++) cin >> routes[i].first >> routes[i].second;
        string destStr;
        cin >> destStr;
        uint32_t dest = parseIP(destStr);

        int bestPrefix = -1;
        string bestIface = "";
        for (const auto &r : routes) {
            size_t slash = r.first.find('/');
            string ipPart = r.first.substr(0, slash);
            int prefix = stoi(r.first.substr(slash + 1));
            uint32_t net = parseIP(ipPart);
            uint32_t mask = (prefix == 0) ? 0 : (prefix == 32) ? 0xFFFFFFFF : ~((1U << (32 - prefix)) - 1);
            if ((dest & mask) == (net & mask)) {
                if (prefix > bestPrefix) {
                    bestPrefix = prefix;
                    bestIface = r.second;
                }
            }
        }
        if (bestPrefix != -1) {
            cout << "Route: " << bestIface << " (Prefix /" << bestPrefix << ")" << endl;
        } else {
            cout << "DROP" << endl;
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    private static long parseIP(String ip) {
        String[] parts = ip.split("\\\\.");
        long res = 0;
        for (String p : parts) res = (res << 8) | Integer.parseInt(p);
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            List<String[]> routes = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                routes.add(new String[]{sc.next(), sc.next()});
            }
            String destStr = sc.next();
            long dest = parseIP(destStr);

            int bestPrefix = -1;
            String bestIface = "";
            for (String[] r : routes) {
                String[] cidrParts = r[0].split("/");
                long net = parseIP(cidrParts[0]);
                int prefix = Integer.parseInt(cidrParts[1]);
                long mask = (prefix == 0) ? 0L : (0xFFFFFFFFL << (32 - prefix)) & 0xFFFFFFFFL;
                if ((dest & mask) == (net & mask)) {
                    if (prefix > bestPrefix) {
                        bestPrefix = prefix;
                        bestIface = r[1];
                    }
                }
            }
            if (bestPrefix != -1) {
                System.out.println("Route: " + bestIface + " (Prefix /" + bestPrefix + ")");
            } else {
                System.out.println("DROP");
            }
        }
    }
}`,
      python: `import sys

def parse_ip(ip: str) -> int:
    parts = [int(x) for x in ip.split(".")]
    return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]

def solve():
    tokens = sys.stdin.read().strip().split()
    if not tokens:
        return
    n = int(tokens[0])
    idx = 1
    routes = []
    for _ in range(n):
        routes.append((tokens[idx], tokens[idx + 1]))
        idx += 2
    dest_str = tokens[idx]
    dest = parse_ip(dest_str)

    best_prefix = -1
    best_iface = ""
    for cidr, iface in routes:
        ip_part, p_str = cidr.split("/")
        prefix = int(p_str)
        net = parse_ip(ip_part)
        mask = (0xFFFFFFFF << (32 - prefix)) & 0xFFFFFFFF if prefix > 0 else 0
        if (dest & mask) == (net & mask):
            if prefix > best_prefix:
                best_prefix = prefix
                best_iface = iface

    if best_prefix != -1:
        print(f"Route: {best_iface} (Prefix /{best_prefix})")
    else:
        print("DROP")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'd7-prob3-tc1',
        input: '3\n192.168.0.0/16 eth0\n192.168.1.0/24 eth1\n0.0.0.0/0 default_gw\n192.168.1.55',
        expectedOutput: 'Route: eth1 (Prefix /24)',
        isHidden: false,
        explanation: '192.168.1.55 matches all three routes, but /24 is the longest prefix.',
      },
      {
        id: 'd7-prob3-tc2',
        input: '3\n192.168.0.0/16 eth0\n192.168.1.0/24 eth1\n0.0.0.0/0 default_gw\n10.20.30.40',
        expectedOutput: 'Route: default_gw (Prefix /0)',
        isHidden: false,
        explanation: '10.20.30.40 only matches the default gateway /0.',
      },
      {
        id: 'd7-prob3-tc3',
        input: '2\n10.0.0.0/8 internal\n10.1.0.0/16 dev_cluster\n10.1.5.20',
        expectedOutput: 'Route: dev_cluster (Prefix /16)',
        isHidden: true,
        explanation: '/16 is longer prefix match than /8.',
      },
    ],
  },
  {
    id: 'd7-prob-4',
    day: 7,
    title: 'TCP Sliding Window Flow Control Simulator',
    difficulty: 'Medium',
    moduleTag: 'Module 7: Computer Networks',
    problemStatement:
      'Simulate TCP sender sliding window behavior. Given a window size W and a total number of data packets N (indexed 0 to N-1), packets are transmitted within the window [base, base + W - 1]. Each step receives an acknowledgment ACK k meaning all packets up to and including packet k are acknowledged (cumulative ACK). Slide the window base to k + 1. Output the sequence of transmitted packet IDs and final status.',
    inputFormat: 'Line 1: W (window size) and N (total packets). Line 2: M (number of ACKs). Line 3: M integers representing the cumulative ACKs received.',
    outputFormat: 'Print "Completed: <N> packets transmitted | Base: <base>".',
    constraints: ['1 <= W <= 50', '1 <= N <= 1000', 'ACKs are monotonically non-decreasing'],
    sampleInput: '3 6\n3\n1 3 5',
    sampleOutput: 'Completed: 6 packets transmitted | Base: 6',
    kapilIntuition:
      'In TCP Go-Back-N/Sliding Window, cumulative ACK k advances base to k + 1. New packets in range [previous_sent + 1, base + W - 1] are immediately dispatched.',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'Init Window', description: 'Base=0, Window=3. Transmit [0, 1, 2].', variables: { base: 0, sent: 2 } },
      { step: 2, label: 'ACK 1 Arrives', description: 'Cumulative ACK for packet 1. Base moves to 2. Transmit [3, 4].', variables: { base: 2, sent: 4 } },
      { step: 3, label: 'ACK 5 Arrives', description: 'All packets acknowledged. Base moves to 6. Transmission complete.', variables: { base: 6, sent: 5 } },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int w, n, m;
    if (scanf("%d %d", &w, &n) == 2 && scanf("%d", &m) == 1) {
        // Simulate TCP sliding window
        printf("Completed: %d packets transmitted | Base: %d\\n", n, n);
    }
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int w, n, m;
    if (cin >> w >> n >> m) {
        // Implement TCP Sliding Window Simulator
        cout << "Completed: " << n << " packets transmitted | Base: " << n << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int w = sc.nextInt();
            int n = sc.nextInt();
            int m = sc.nextInt();
            // Implement sliding window
            System.out.println("Completed: " + n + " packets transmitted | Base: " + n);
        }
    }
}`,
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    w, n, m = int(tokens[0]), int(tokens[1]), int(tokens[2])
    # Implement sliding window
    print(f"Completed: {n} packets transmitted | Base: {n}")

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int w, n, m;
    if (scanf("%d %d", &w, &n) == 2 && scanf("%d", &m) == 1) {
        int acks[1000];
        for (int i = 0; i < m; i++) scanf("%d", &acks[i]);
        int base = 0;
        int nextSeq = 0;
        for (int i = 0; i < m; i++) {
            int ack = acks[i];
            if (ack >= base) {
                base = ack + 1;
            }
            while (nextSeq < base + w && nextSeq < n) {
                nextSeq++;
            }
        }
        printf("Completed: %d packets transmitted | Base: %d\\n", nextSeq, base);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int w, n, m;
    if (cin >> w >> n >> m) {
        vector<int> acks(m);
        for (int i = 0; i < m; i++) cin >> acks[i];
        int base = 0;
        int nextSeq = 0;
        for (int ack : acks) {
            if (ack >= base) {
                base = ack + 1;
            }
            while (nextSeq < base + w && nextSeq < n) {
                nextSeq++;
            }
        }
        cout << "Completed: " << nextSeq << " packets transmitted | Base: " << base << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int w = sc.nextInt();
            int n = sc.nextInt();
            int m = sc.nextInt();
            int[] acks = new int[m];
            for (int i = 0; i < m; i++) acks[i] = sc.nextInt();
            int base = 0;
            int nextSeq = 0;
            for (int ack : acks) {
                if (ack >= base) base = ack + 1;
                while (nextSeq < base + w && nextSeq < n) nextSeq++;
            }
            System.out.println("Completed: " + nextSeq + " packets transmitted | Base: " + base);
        }
    }
}`,
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    w, n, m = int(tokens[0]), int(tokens[1]), int(tokens[2])
    acks = [int(x) for x in tokens[3:3 + m]]
    base = 0
    next_seq = 0
    for ack in acks:
        if ack >= base:
            base = ack + 1
        while next_seq < base + w and next_seq < n:
            next_seq += 1
    print(f"Completed: {next_seq} packets transmitted | Base: {base}")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'd7-prob4-tc1',
        input: '3 6\n3\n1 3 5',
        expectedOutput: 'Completed: 6 packets transmitted | Base: 6',
        isHidden: false,
        explanation: 'All 6 packets successfully acknowledged in 3 cumulative steps.',
      },
      {
        id: 'd7-prob4-tc2',
        input: '4 10\n2\n2 5',
        expectedOutput: 'Completed: 10 packets transmitted | Base: 6',
        isHidden: true,
        explanation: 'Window slides to base 6, sending packets up to index 9.',
      },
    ],
  },
  {
    id: 'd7-prob-5',
    day: 7,
    title: 'HTTP Request Line & Header Parser',
    difficulty: 'Easy',
    moduleTag: 'Module 7: Computer Networks',
    problemStatement:
      'Given a raw HTTP request message (first line is the Request-Line, followed by key-value headers separated by ": "), parse and print the HTTP Method, URL Path, Protocol Version, and a specific requested header value. If header does not exist, print "NOT FOUND".',
    inputFormat: 'First line: The name of the target header to look up (e.g. "Host"). Next lines: The HTTP request lines terminated by an empty line or EOF.',
    outputFormat: 'Print "Method: <METHOD> | Path: <PATH> | Version: <VERSION> | <HeaderName>: <HeaderValue>".',
    constraints: ['Standard HTTP/1.1 syntax', 'Header names are case-insensitive'],
    sampleInput: 'Host\nGET /api/v1/students HTTP/1.1\nHost: portal.spsu.edu.in\nUser-Agent: Curl/7.68\nAccept: application/json',
    sampleOutput: 'Method: GET | Path: /api/v1/students | Version: HTTP/1.1 | Host: portal.spsu.edu.in',
    kapilIntuition:
      'Split the first line by whitespace to extract Method, Path, and Version. For subsequent lines, locate the first colon delimiter, strip whitespace from key and value, and match case-insensitively against the target header.',
    timeComplexity: 'O(L) where L is total character length',
    spaceComplexity: 'O(L)',
    visualizationSteps: [
      { step: 1, label: 'Parse Request Line', description: 'GET /api/v1/students HTTP/1.1 -> Method: GET, Path: /api/v1/students, Version: HTTP/1.1.', variables: { method: 'GET', path: '/api/v1/students' } },
      { step: 2, label: 'Iterate Headers', description: 'Match target "Host" against "portal.spsu.edu.in".', variables: { found: true } },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char target[64];
    if (scanf("%s\\n", target) == 1) {
        // Implement HTTP Parser
        printf("Method: GET | Path: /api/v1/students | Version: HTTP/1.1 | Host: portal.spsu.edu.in\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string target;
    if (cin >> target) {
        // Implement HTTP Request Parser
        cout << "Method: GET | Path: /api/v1/students | Version: HTTP/1.1 | Host: portal.spsu.edu.in" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String target = sc.nextLine().trim();
            // Implement HTTP Parser
            System.out.println("Method: GET | Path: /api/v1/students | Version: HTTP/1.1 | Host: portal.spsu.edu.in");
        }
    }
}`,
      python: `import sys

def solve():
    lines = sys.stdin.read().splitlines()
    if not lines:
        return
    # Implement HTTP Parser
    print("Method: GET | Path: /api/v1/students | Version: HTTP/1.1 | Host: portal.spsu.edu.in")

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

void toLowerStr(char *d, const char *s) {
    while (*s) { *d++ = tolower(*s++); }
    *d = '\\0';
}

int main() {
    char target[64];
    if (!fgets(target, sizeof(target), stdin)) return 0;
    target[strcspn(target, "\\r\\n")] = 0;
    char targetLow[64];
    toLowerStr(targetLow, target);

    char reqLine[256];
    if (!fgets(reqLine, sizeof(reqLine), stdin)) return 0;
    reqLine[strcspn(reqLine, "\\r\\n")] = 0;
    char method[32], path[128], version[32];
    sscanf(reqLine, "%s %s %s", method, path, version);

    char line[512], foundVal[256] = "NOT FOUND";
    while (fgets(line, sizeof(line), stdin)) {
        line[strcspn(line, "\\r\\n")] = 0;
        char *colon = strchr(line, ':');
        if (colon) {
            *colon = '\\0';
            char key[64], keyLow[64];
            strncpy(key, line, 63); key[63] = 0;
            // Trim key
            char *val = colon + 1;
            while (*val == ' ') val++;
            toLowerStr(keyLow, key);
            if (strcmp(keyLow, targetLow) == 0) {
                strncpy(foundVal, val, 255);
                foundVal[255] = 0;
            }
        }
    }
    printf("Method: %s | Path: %s | Version: %s | %s: %s\\n", method, path, version, target, foundVal);
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <sstream>
#include <algorithm>

using namespace std;

string toLowerStr(string s) {
    transform(s.begin(), s.end(), s.begin(), ::tolower);
    return s;
}

int main() {
    string target;
    if (!getline(cin, target)) return 0;
    while (!target.empty() && (target.back() == '\\r' || target.back() == ' ')) target.pop_back();

    string reqLine;
    if (!getline(cin, reqLine)) return 0;
    stringstream ss(reqLine);
    string method, path, version;
    ss >> method >> path >> version;

    string line;
    string targetLow = toLowerStr(target);
    string foundVal = "NOT FOUND";
    while (getline(cin, line)) {
        size_t colon = line.find(':');
        if (colon != string::npos) {
            string key = line.substr(0, colon);
            while (!key.empty() && key.back() == ' ') key.pop_back();
            string val = line.substr(colon + 1);
            while (!val.empty() && val.front() == ' ') val.erase(val.begin());
            while (!val.empty() && (val.back() == '\\r' || val.back() == ' ')) val.pop_back();
            if (toLowerStr(key) == targetLow) {
                foundVal = val;
            }
        }
    }
    cout << "Method: " << method << " | Path: " << path << " | Version: " << version << " | " << target << ": " << foundVal << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String target = sc.nextLine().trim();
        if (!sc.hasNextLine()) return;
        String reqLine = sc.nextLine().trim();
        String[] parts = reqLine.split("\\\\s+");
        String method = parts[0], path = parts[1], version = parts[2];

        String foundVal = "NOT FOUND";
        while (sc.hasNextLine()) {
            String line = sc.nextLine().trim();
            if (line.isEmpty()) break;
            int colon = line.indexOf(':');
            if (colon != -1) {
                String key = line.substring(0, colon).trim();
                String val = line.substring(colon + 1).trim();
                if (key.equalsIgnoreCase(target)) {
                    foundVal = val;
                }
            }
        }
        System.out.println("Method: " + method + " | Path: " + path + " | Version: " + version + " | " + target + ": " + foundVal);
    }
}`,
      python: `import sys

def solve():
    lines = sys.stdin.read().splitlines()
    if not lines:
        return
    target = lines[0].strip()
    req_parts = lines[1].strip().split()
    method, path, version = req_parts[0], req_parts[1], req_parts[2]
    headers = {}
    for line in lines[2:]:
        if not line.strip():
            break
        if ":" in line:
            k, v = line.split(":", 1)
            headers[k.strip().lower()] = v.strip()
    found_val = headers.get(target.lower(), "NOT FOUND")
    print(f"Method: {method} | Path: {path} | Version: {version} | {target}: {found_val}")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'd7-prob5-tc1',
        input: 'Host\nGET /api/v1/students HTTP/1.1\nHost: portal.spsu.edu.in\nUser-Agent: Curl/7.68\nAccept: application/json',
        expectedOutput: 'Method: GET | Path: /api/v1/students | Version: HTTP/1.1 | Host: portal.spsu.edu.in',
        isHidden: false,
        explanation: 'Parses standard HTTP GET request with Host header.',
      },
      {
        id: 'd7-prob5-tc2',
        input: 'Authorization\nPOST /login HTTP/1.1\nHost: spsu.ac.in\nContent-Type: application/json',
        expectedOutput: 'Method: POST | Path: /login | Version: HTTP/1.1 | Authorization: NOT FOUND',
        isHidden: true,
        explanation: 'Missing Authorization header reports NOT FOUND.',
      },
    ],
  },
  {
    id: 'd7-prob-6',
    day: 7,
    title: 'REST API Idempotency & Safe Method Validator',
    difficulty: 'Easy',
    moduleTag: 'Module 7: Computer Networks',
    problemStatement:
      'Given an HTTP verb (GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD), classify it according to RFC 9110 HTTP semantics: whether it is "Safe" (does not modify server resource state) and whether it is "Idempotent" (multiple identical requests have the same side effect as a single request).',
    inputFormat: 'A single string representing the HTTP method name (case-insensitive).',
    outputFormat: 'Print "Method: <METHOD> | Safe: <YES/NO> | Idempotent: <YES/NO>".',
    constraints: ['Input is one of: GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD'],
    sampleInput: 'PUT',
    sampleOutput: 'Method: PUT | Safe: NO | Idempotent: YES',
    kapilIntuition:
      'Safe methods: GET, HEAD, OPTIONS (read-only, never mutate server resource state). Idempotent methods: GET, HEAD, OPTIONS, PUT, DELETE (repeating PUT /users/1 or DELETE /users/1 leaves server state identical). POST and PATCH are neither safe nor idempotent by default.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'Lookup Method', description: 'Method: PUT.', variables: { method: 'PUT' } },
      { step: 2, label: 'Check Safety', description: 'PUT mutates resource state -> Safe: NO.', variables: { safe: false } },
      { step: 3, label: 'Check Idempotency', description: 'Repeated PUT with same body produces identical state -> Idempotent: YES.', variables: { idempotent: true } },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char method[16];
    if (scanf("%s", method) == 1) {
        // Implement HTTP Method Safety/Idempotency classifier
        printf("Method: PUT | Safe: NO | Idempotent: YES\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string method;
    if (cin >> method) {
        // Classify method
        cout << "Method: PUT | Safe: NO | Idempotent: YES" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String method = sc.next();
            // Implement classifier
            System.out.println("Method: PUT | Safe: NO | Idempotent: YES");
        }
    }
}`,
      python: `import sys

def solve():
    m = sys.stdin.read().strip().upper()
    if not m:
        return
    # Classify method
    print(f"Method: {m} | Safe: NO | Idempotent: YES")

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char method[16];
    if (scanf("%s", method) == 1) {
        for (int i = 0; method[i]; i++) method[i] = toupper(method[i]);
        int isSafe = (strcmp(method, "GET") == 0 || strcmp(method, "HEAD") == 0 || strcmp(method, "OPTIONS") == 0);
        int isIdempotent = (isSafe || strcmp(method, "PUT") == 0 || strcmp(method, "DELETE") == 0);
        printf("Method: %s | Safe: %s | Idempotent: %s\\n", method, isSafe ? "YES" : "NO", isIdempotent ? "YES" : "NO");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

int main() {
    string method;
    if (cin >> method) {
        transform(method.begin(), method.end(), method.begin(), ::toupper);
        bool isSafe = (method == "GET" || method == "HEAD" || method == "OPTIONS");
        bool isIdempotent = (isSafe || method == "PUT" || method == "DELETE");
        cout << "Method: " << method << " | Safe: " << (isSafe ? "YES" : "NO") 
             << " | Idempotent: " << (isIdempotent ? "YES" : "NO") << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String method = sc.next().toUpperCase();
            boolean isSafe = method.equals("GET") || method.equals("HEAD") || method.equals("OPTIONS");
            boolean isIdempotent = isSafe || method.equals("PUT") || method.equals("DELETE");
            System.out.println("Method: " + method + " | Safe: " + (isSafe ? "YES" : "NO") +
                               " | Idempotent: " + (isIdempotent ? "YES" : "NO"));
        }
    }
}`,
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        return
    m = line.upper()
    is_safe = m in {"GET", "HEAD", "OPTIONS"}
    is_idempotent = is_safe or m in {"PUT", "DELETE"}
    print(f"Method: {m} | Safe: {'YES' if is_safe else 'NO'} | Idempotent: {'YES' if is_idempotent else 'NO'}")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'd7-prob6-tc1',
        input: 'PUT',
        expectedOutput: 'Method: PUT | Safe: NO | Idempotent: YES',
        isHidden: false,
        explanation: 'PUT replaces resource state: unsafe, but idempotent.',
      },
      {
        id: 'd7-prob6-tc2',
        input: 'POST',
        expectedOutput: 'Method: POST | Safe: NO | Idempotent: NO',
        isHidden: false,
        explanation: 'POST creates resources: neither safe nor idempotent.',
      },
      {
        id: 'd7-prob6-tc3',
        input: 'GET',
        expectedOutput: 'Method: GET | Safe: YES | Idempotent: YES',
        isHidden: true,
        explanation: 'GET is safe and idempotent read-only retrieval.',
      },
    ],
  },
  {
    id: 'd7-prob-7',
    day: 7,
    title: 'Port Number Service Category & Protocol Mapper',
    difficulty: 'Easy',
    moduleTag: 'Module 7: Computer Networks',
    problemStatement:
      'Given an integer port number (0 - 65535), identify its IANA range category (Well-Known: 0-1023, Registered: 1024-49151, Dynamic/Private: 49152-65535) and default standard protocol name for key ports (20/21: FTP, 22: SSH, 23: Telnet, 25: SMTP, 53: DNS, 80: HTTP, 443: HTTPS, 3306: MySQL, 5432: PostgreSQL, 6379: Redis). If port is not in this specific map, output service as "CUSTOM/OTHER".',
    inputFormat: 'An integer port number P.',
    outputFormat: 'Print "Port: <P> | Range: <RANGE> | Service: <SERVICE>".',
    constraints: ['0 <= P <= 65535'],
    sampleInput: '443',
    sampleOutput: 'Port: 443 | Range: Well-Known (0-1023) | Service: HTTPS',
    kapilIntuition:
      'Port numbers dictate L4 transport endpoint bindings. Well-Known ports (0-1023) require root/administrative privileges on Unix. Registered ports (1024-49151) are assigned to services like DBs. Dynamic/Ephemeral ports (49152-65535) are used by clients.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'Range Classification', description: 'Port 443 <= 1023 -> Well-Known (0-1023).', variables: { port: 443, range: 'Well-Known' } },
      { step: 2, label: 'Service Lookup', description: 'Port 443 matches HTTPS (TLS/SSL).', variables: { service: 'HTTPS' } },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int port;
    if (scanf("%d", &port) == 1) {
        // Implement Port Mapper
        printf("Port: 443 | Range: Well-Known (0-1023) | Service: HTTPS\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int port;
    if (cin >> port) {
        // Implement Port Mapper
        cout << "Port: 443 | Range: Well-Known (0-1023) | Service: HTTPS" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int port = sc.nextInt();
            // Implement Port Mapper
            System.out.println("Port: 443 | Range: Well-Known (0-1023) | Service: HTTPS");
        }
    }
}`,
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        return
    port = int(line)
    # Implement Port Mapper
    print("Port: 443 | Range: Well-Known (0-1023) | Service: HTTPS")

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int port;
    if (scanf("%d", &port) == 1) {
        const char *range = (port <= 1023) ? "Well-Known (0-1023)" : (port <= 49151) ? "Registered (1024-49151)" : "Dynamic/Private (49152-65535)";
        const char *service = "CUSTOM/OTHER";
        switch (port) {
            case 20: case 21: service = "FTP"; break;
            case 22: service = "SSH"; break;
            case 23: service = "Telnet"; break;
            case 25: service = "SMTP"; break;
            case 53: service = "DNS"; break;
            case 80: service = "HTTP"; break;
            case 443: service = "HTTPS"; break;
            case 3306: service = "MySQL"; break;
            case 5432: service = "PostgreSQL"; break;
            case 6379: service = "Redis"; break;
        }
        printf("Port: %d | Range: %s | Service: %s\\n", port, range, service);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

int main() {
    int port;
    if (cin >> port) {
        string range = (port <= 1023) ? "Well-Known (0-1023)" : (port <= 49151) ? "Registered (1024-49151)" : "Dynamic/Private (49152-65535)";
        unordered_map<int, string> svc = {
            {20, "FTP"}, {21, "FTP"}, {22, "SSH"}, {23, "Telnet"}, {25, "SMTP"},
            {53, "DNS"}, {80, "HTTP"}, {443, "HTTPS"}, {3306, "MySQL"}, {5432, "PostgreSQL"}, {6379, "Redis"}
        };
        string service = svc.count(port) ? svc[port] : "CUSTOM/OTHER";
        cout << "Port: " << port << " | Range: " << range << " | Service: " << service << endl;
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int port = sc.nextInt();
            String range = (port <= 1023) ? "Well-Known (0-1023)" : (port <= 49151) ? "Registered (1024-49151)" : "Dynamic/Private (49152-65535)";
            Map<Integer, String> svc = Map.of(
                20, "FTP", 21, "FTP", 22, "SSH", 23, "Telnet", 25, "SMTP",
                53, "DNS", 80, "HTTP", 443, "HTTPS", 3306, "MySQL", 5432, "PostgreSQL"
            );
            String service = svc.getOrDefault(port, port == 6379 ? "Redis" : "CUSTOM/OTHER");
            System.out.println("Port: " + port + " | Range: " + range + " | Service: " + service);
        }
    }
}`,
      python: `import sys

def solve():
    line = sys.stdin.read().strip()
    if not line:
        return
    port = int(line)
    if port <= 1023:
        range_str = "Well-Known (0-1023)"
    elif port <= 49151:
        range_str = "Registered (1024-49151)"
    else:
        range_str = "Dynamic/Private (49152-65535)"
    
    svc_map = {
        20: "FTP", 21: "FTP", 22: "SSH", 23: "Telnet", 25: "SMTP",
        53: "DNS", 80: "HTTP", 443: "HTTPS", 3306: "MySQL", 5432: "PostgreSQL", 6379: "Redis"
    }
    service = svc_map.get(port, "CUSTOM/OTHER")
    print(f"Port: {port} | Range: {range_str} | Service: {service}")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'd7-prob7-tc1',
        input: '443',
        expectedOutput: 'Port: 443 | Range: Well-Known (0-1023) | Service: HTTPS',
        isHidden: false,
        explanation: 'Port 443 is the standard well-known port for TLS encrypted web traffic.',
      },
      {
        id: 'd7-prob7-tc2',
        input: '3306',
        expectedOutput: 'Port: 3306 | Range: Registered (1024-49151) | Service: MySQL',
        isHidden: false,
        explanation: 'Port 3306 is the standard registered port for MySQL database server.',
      },
      {
        id: 'd7-prob7-tc3',
        input: '50000',
        expectedOutput: 'Port: 50000 | Range: Dynamic/Private (49152-65535) | Service: CUSTOM/OTHER',
        isHidden: true,
        explanation: 'Ephemeral client port.',
      },
    ],
  },
  {
    id: 'd7-prob-8',
    day: 7,
    title: 'Subnet Overlap & IP Range Inclusion Checker',
    difficulty: 'Medium',
    moduleTag: 'Module 7: Computer Networks',
    problemStatement:
      'Given two IPv4 CIDR blocks A and B (e.g., "192.168.0.0/16" and "192.168.1.0/24"), determine if they overlap. If they do, identify if one strictly contains the other or if they are identical. Output "A CONTAINS B", "B CONTAINS A", "IDENTICAL", or "NO OVERLAP".',
    inputFormat: 'Two space-separated CIDR strings: "<CIDR_A> <CIDR_B>".',
    outputFormat: 'Print the relationship string.',
    constraints: ['Valid IPv4 CIDR blocks (0 <= prefix <= 32)'],
    sampleInput: '192.168.0.0/16 192.168.1.0/24',
    sampleOutput: 'A CONTAINS B',
    kapilIntuition:
      'Two subnets overlap if and only if one contains the other. For two subnets with prefix lengths pA <= pB, A contains B if (netB & maskA) == (netA & maskA). If pA == pB and masks match, they are IDENTICAL.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'Compute Ranges', description: 'A: 192.168.0.0 - 192.168.255.255 (/16). B: 192.168.1.0 - 192.168.1.255 (/24).', variables: {} },
      { step: 2, label: 'Compare Prefixes', description: 'Prefix A (16) < Prefix B (24). Check if B is inside A.', variables: {} },
      { step: 3, label: 'Result', description: 'Subnet B is fully encompassed inside Subnet A -> A CONTAINS B.', variables: { result: 'A CONTAINS B' } },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    char a[32], b[32];
    if (scanf("%s %s", a, b) == 2) {
        // Determine subnet containment/overlap
        printf("A CONTAINS B\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string a, b;
    if (cin >> a >> b) {
        // Implement Subnet Overlap Checker
        cout << "A CONTAINS B" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String a = sc.next();
            String b = sc.next();
            // Implement Subnet Overlap Checker
            System.out.println("A CONTAINS B");
        }
    }
}`,
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if len(tokens) < 2:
        return
    a, b = tokens[0], tokens[1]
    # Implement Subnet Overlap Checker
    print("A CONTAINS B")

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

uint32_t parseIP(const char *ipStr) {
    unsigned int a, b, c, d;
    sscanf(ipStr, "%u.%u.%u.%u", &a, &b, &c, &d);
    return ((uint32_t)a << 24) | ((uint32_t)b << 16) | ((uint32_t)c << 8) | (uint32_t)d;
}

int main() {
    char cidrA[32], cidrB[32];
    if (scanf("%s %s", cidrA, cidrB) == 2) {
        char ipA[32], ipB[32];
        int pA, pB;
        sscanf(cidrA, "%[^/]/%d", ipA, &pA);
        sscanf(cidrB, "%[^/]/%d", ipB, &pB);
        uint32_t netA = parseIP(ipA), netB = parseIP(ipB);
        uint32_t maskA = (pA == 0) ? 0 : (pA == 32) ? 0xFFFFFFFF : ~((1U << (32 - pA)) - 1);
        uint32_t maskB = (pB == 0) ? 0 : (pB == 32) ? 0xFFFFFFFF : ~((1U << (32 - pB)) - 1);
        netA &= maskA;
        netB &= maskB;

        if (pA == pB && netA == netB) {
            printf("IDENTICAL\\n");
        } else if (pA <= pB && (netB & maskA) == netA) {
            printf("A CONTAINS B\\n");
        } else if (pB <= pA && (netA & maskB) == netB) {
            printf("B CONTAINS A\\n");
        } else {
            printf("NO OVERLAP\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <sstream>
#include <cstdint>

using namespace std;

uint32_t parseIP(const string &ip) {
    stringstream ss(ip);
    string token;
    uint32_t res = 0;
    while (getline(ss, token, '.')) res = (res << 8) | stoi(token);
    return res;
}

int main() {
    string cidrA, cidrB;
    if (cin >> cidrA >> cidrB) {
        size_t sA = cidrA.find('/'), sB = cidrB.find('/');
        uint32_t netA = parseIP(cidrA.substr(0, sA));
        int pA = stoi(cidrA.substr(sA + 1));
        uint32_t netB = parseIP(cidrB.substr(0, sB));
        int pB = stoi(cidrB.substr(sB + 1));

        uint32_t maskA = (pA == 0) ? 0 : (pA == 32) ? 0xFFFFFFFF : ~((1U << (32 - pA)) - 1);
        uint32_t maskB = (pB == 0) ? 0 : (pB == 32) ? 0xFFFFFFFF : ~((1U << (32 - pB)) - 1);
        netA &= maskA;
        netB &= maskB;

        if (pA == pB && netA == netB) {
            cout << "IDENTICAL" << endl;
        } else if (pA <= pB && (netB & maskA) == netA) {
            cout << "A CONTAINS B" << endl;
        } else if (pB <= pA && (netA & maskB) == netB) {
            cout << "B CONTAINS A" << endl;
        } else {
            cout << "NO OVERLAP" << endl;
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    private static long parseIP(String ip) {
        String[] parts = ip.split("\\\\.");
        long res = 0;
        for (String p : parts) res = (res << 8) | Integer.parseInt(p);
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String cidrA = sc.next();
            String cidrB = sc.next();
            String[] pA = cidrA.split("/");
            String[] pB = cidrB.split("/");
            long netA = parseIP(pA[0]);
            int prefA = Integer.parseInt(pA[1]);
            long netB = parseIP(pB[0]);
            int prefB = Integer.parseInt(pB[1]);

            long maskA = (prefA == 0) ? 0L : (0xFFFFFFFFL << (32 - prefA)) & 0xFFFFFFFFL;
            long maskB = (prefB == 0) ? 0L : (0xFFFFFFFFL << (32 - prefB)) & 0xFFFFFFFFL;
            netA &= maskA;
            netB &= maskB;

            if (prefA == prefB && netA == netB) {
                System.out.println("IDENTICAL");
            } else if (prefA <= prefB && (netB & maskA) == netA) {
                System.out.println("A CONTAINS B");
            } else if (prefB <= prefA && (netA & maskB) == netB) {
                System.out.println("B CONTAINS A");
            } else {
                System.out.println("NO OVERLAP");
            }
        }
    }
}`,
      python: `import sys

def parse_ip(ip: str) -> int:
    parts = [int(x) for x in ip.split(".")]
    return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]

def solve():
    tokens = sys.stdin.read().split()
    if len(tokens) < 2:
        return
    cA, cB = tokens[0], tokens[1]
    ipA, pA_str = cA.split("/")
    ipB, pB_str = cB.split("/")
    pA, pB = int(pA_str), int(pB_str)
    netA, netB = parse_ip(ipA), parse_ip(ipB)
    maskA = (0xFFFFFFFF << (32 - pA)) & 0xFFFFFFFF if pA > 0 else 0
    maskB = (0xFFFFFFFF << (32 - pB)) & 0xFFFFFFFF if pB > 0 else 0
    netA &= maskA
    netB &= maskB

    if pA == pB and netA == netB:
        print("IDENTICAL")
    elif pA <= pB and (netB & maskA) == netA:
        print("A CONTAINS B")
    elif pB <= pA and (netA & maskB) == netB:
        print("B CONTAINS A")
    else:
        print("NO OVERLAP")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'd7-prob8-tc1',
        input: '192.168.0.0/16 192.168.1.0/24',
        expectedOutput: 'A CONTAINS B',
        isHidden: false,
        explanation: 'Subnet A encompasses the smaller subnet B.',
      },
      {
        id: 'd7-prob8-tc2',
        input: '10.0.0.0/24 10.0.1.0/24',
        expectedOutput: 'NO OVERLAP',
        isHidden: false,
        explanation: 'Adjacent, distinct /24 subnets do not overlap.',
      },
      {
        id: 'd7-prob8-tc3',
        input: '172.16.0.0/12 172.16.0.0/12',
        expectedOutput: 'IDENTICAL',
        isHidden: true,
        explanation: 'Identical prefix and address range.',
      },
    ],
  },
  {
    id: 'd7-prob-9',
    day: 7,
    title: 'Token Bucket Traffic Rate Limiter',
    difficulty: 'Hard',
    moduleTag: 'Module 7: Computer Networks',
    problemStatement:
      'Implement a Token Bucket traffic shaping rate limiter. Given bucket capacity C tokens, refill rate R tokens per second, and a sequence of N packet arrivals with (timestamp in seconds, tokens_required), determine whether each packet is "PASS" or "DROP". Tokens refill continuously based on time elapsed since last check, up to max capacity C. Initially the bucket starts full with C tokens.',
    inputFormat: 'Line 1: C (capacity) and R (refill rate). Line 2: N (number of packets). Next N lines: "<timestamp> <tokens_required>".',
    outputFormat: 'Print "Packet <index>: PASS (Remaining: <tokens>)" or "Packet <index>: DROP (Available: <tokens>)".',
    constraints: ['1 <= C <= 1000', '1 <= R <= 100', '1 <= N <= 500', 'Timestamps are non-decreasing integers'],
    sampleInput: '10 2\n3\n0 6\n1 6\n1 2',
    sampleOutput: 'Packet 0: PASS (Remaining: 4)\nPacket 1: PASS (Remaining: 0)\nPacket 2: DROP (Available: 0)',
    kapilIntuition:
      'Tokens at time t = min(C, current_tokens + (t - last_time) * R). If tokens >= required: subtract required and return PASS. Otherwise: tokens remain unchanged and return DROP. Update last_time to t.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'T=0 Arrives', description: 'Bucket starts with 10 tokens. Packet 0 needs 6 tokens. 10 - 6 = 4 remaining -> PASS.', variables: { tokens: 4 } },
      { step: 2, label: 'T=1 Arrives', description: 'Elapsed = 1s. Tokens added = 1 * 2 = 2. Current = 4 + 2 = 6. Packet 1 needs 6 tokens. Remaining = 0 -> PASS.', variables: { tokens: 0 } },
      { step: 3, label: 'T=1 Second Packet', description: 'Elapsed = 0s. Current = 0. Packet 2 needs 2 tokens -> DROP.', variables: { tokens: 0 } },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int c, r, n;
    if (scanf("%d %d", &c, &r) == 2 && scanf("%d", &n) == 1) {
        // Implement Token Bucket Rate Limiter
        printf("Packet 0: PASS (Remaining: 4)\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int c, r, n;
    if (cin >> c >> r >> n) {
        // Implement Token Bucket
        cout << "Packet 0: PASS (Remaining: 4)" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int c = sc.nextInt();
            int r = sc.nextInt();
            int n = sc.nextInt();
            // Implement Token Bucket
            System.out.println("Packet 0: PASS (Remaining: 4)");
        }
    }
}`,
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    c, r, n = int(tokens[0]), int(tokens[1]), int(tokens[2])
    # Implement Token Bucket
    print("Packet 0: PASS (Remaining: 4)")

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int capacity, rate, n;
    if (scanf("%d %d", &capacity, &rate) == 2 && scanf("%d", &n) == 1) {
        long currentTokens = capacity;
        long lastTime = 0;
        for (int i = 0; i < n; i++) {
            long t, cost;
            scanf("%ld %ld", &t, &cost);
            long elapsed = t - lastTime;
            currentTokens += elapsed * rate;
            if (currentTokens > capacity) currentTokens = capacity;
            lastTime = t;

            if (currentTokens >= cost) {
                currentTokens -= cost;
                printf("Packet %d: PASS (Remaining: %ld)\\n", i, currentTokens);
            } else {
                printf("Packet %d: DROP (Available: %ld)\\n", i, currentTokens);
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <algorithm>

using namespace std;

int main() {
    long capacity, rate;
    int n;
    if (cin >> capacity >> rate >> n) {
        long currentTokens = capacity;
        long lastTime = 0;
        for (int i = 0; i < n; i++) {
            long t, cost;
            cin >> t >> cost;
            long elapsed = t - lastTime;
            currentTokens = min(capacity, currentTokens + elapsed * rate);
            lastTime = t;

            if (currentTokens >= cost) {
                currentTokens -= cost;
                cout << "Packet " << i << ": PASS (Remaining: " << currentTokens << ")" << endl;
            } else {
                cout << "Packet " << i << ": DROP (Available: " << currentTokens << ")" << endl;
            }
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long capacity = sc.nextLong();
            long rate = sc.nextLong();
            int n = sc.nextInt();
            long currentTokens = capacity;
            long lastTime = 0;
            for (int i = 0; i < n; i++) {
                long t = sc.nextLong();
                long cost = sc.nextLong();
                long elapsed = t - lastTime;
                currentTokens = Math.min(capacity, currentTokens + elapsed * rate);
                lastTime = t;

                if (currentTokens >= cost) {
                    currentTokens -= cost;
                    System.out.println("Packet " + i + ": PASS (Remaining: " + currentTokens + ")");
                } else {
                    System.out.println("Packet " + i + ": DROP (Available: " + currentTokens + ")");
                }
            }
        }
    }
}`,
      python: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    capacity = int(tokens[0])
    rate = int(tokens[1])
    n = int(tokens[2])
    idx = 3
    current_tokens = capacity
    last_time = 0
    for i in range(n):
        t = int(tokens[idx])
        cost = int(tokens[idx + 1])
        idx += 2
        elapsed = t - last_time
        current_tokens = min(capacity, current_tokens + elapsed * rate)
        last_time = t

        if current_tokens >= cost:
            current_tokens -= cost
            print(f"Packet {i}: PASS (Remaining: {current_tokens})")
        else:
            print(f"Packet {i}: DROP (Available: {current_tokens})")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'd7-prob9-tc1',
        input: '10 2\n3\n0 6\n1 6\n1 2',
        expectedOutput: 'Packet 0: PASS (Remaining: 4)\nPacket 1: PASS (Remaining: 0)\nPacket 2: DROP (Available: 0)',
        isHidden: false,
        explanation: 'Bucket refills at 2 tokens/sec; packet 2 exceeds available tokens and is dropped.',
      },
      {
        id: 'd7-prob9-tc2',
        input: '5 1\n2\n0 5\n10 5',
        expectedOutput: 'Packet 0: PASS (Remaining: 0)\nPacket 1: PASS (Remaining: 0)',
        isHidden: true,
        explanation: 'After 10 seconds, bucket reaches its cap of 5 tokens and admits packet 1.',
      },
    ],
  },
  {
    id: 'd7-prob-10',
    day: 7,
    title: 'CRC-32 Frame Check Sequence Verification',
    difficulty: 'Hard',
    moduleTag: 'Module 7: Computer Networks',
    problemStatement:
      'Compute the standard Ethernet CRC-32 Frame Check Sequence (FCS) checksum for an ASCII data payload. Output the resulting 32-bit checksum in 8-digit uppercase hexadecimal format.\nUsing the standard IEEE 802.3 polynomial: 0xEDB88320 (reversed), with initial value 0xFFFFFFFF and final XOR 0xFFFFFFFF.',
    inputFormat: 'A single line of ASCII text representing the payload.',
    outputFormat: 'Print "CRC-32: 0x<HEX>".',
    constraints: ['Payload length between 1 and 1000 characters', 'Standard Ethernet polynomial IEEE 802.3'],
    sampleInput: 'SPSU Placement 2026',
    sampleOutput: 'CRC-32: 0x8C526A18',
    kapilIntuition:
      'CRC-32 operates as bitwise polynomial division modulo 2. For each byte, XOR into the low byte of the CRC register, then shift right 8 times; if the LSB was 1, XOR with the polynomial 0xEDB88320. At the end, invert all bits.',
    timeComplexity: 'O(N) where N is payload length',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'Init Register', description: 'Initialize CRC accumulator to 0xFFFFFFFF.', variables: { crc: '0xFFFFFFFF' } },
      { step: 2, label: 'Process Bytes', description: 'Iterate through all payload characters, bit-shifting and applying polynomial 0xEDB88320.', variables: {} },
      { step: 3, label: 'Final XOR', description: 'Invert accumulator (crc ^ 0xFFFFFFFF) to yield final FCS.', variables: {} },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdint.h>

int main() {
    char data[1024];
    if (fgets(data, sizeof(data), stdin)) {
        // Compute CRC-32
        printf("CRC-32: 0x8C526A18\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string data;
    if (getline(cin, data)) {
        // Implement CRC-32
        cout << "CRC-32: 0x8C526A18" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String data = sc.nextLine();
            // Implement CRC-32
            System.out.println("CRC-32: 0x8C526A18");
        }
    }
}`,
      python: `import sys

def solve():
    line = sys.stdin.read().rstrip("\\r\\n")
    if not line:
        return
    # Implement CRC-32
    print("CRC-32: 0x8C526A18")

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

uint32_t computeCRC32(const char *data, size_t len) {
    uint32_t crc = 0xFFFFFFFF;
    for (size_t i = 0; i < len; i++) {
        uint8_t byte = (uint8_t)data[i];
        crc ^= byte;
        for (int j = 0; j < 8; j++) {
            if (crc & 1) crc = (crc >> 1) ^ 0xEDB88320;
            else crc >>= 1;
        }
    }
    return crc ^ 0xFFFFFFFF;
}

int main() {
    char data[1024];
    if (fgets(data, sizeof(data), stdin)) {
        size_t len = strlen(data);
        while (len > 0 && (data[len - 1] == '\\r' || data[len - 1] == '\\n')) {
            data[--len] = '\\0';
        }
        uint32_t fcs = computeCRC32(data, len);
        printf("CRC-32: 0x%08X\\n", fcs);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <iomanip>
#include <cstdint>

using namespace std;

uint32_t computeCRC32(const string &data) {
    uint32_t crc = 0xFFFFFFFF;
    for (uint8_t byte : data) {
        crc ^= byte;
        for (int j = 0; j < 8; j++) {
            if (crc & 1) crc = (crc >> 1) ^ 0xEDB88320;
            else crc >>= 1;
        }
    }
    return crc ^ 0xFFFFFFFF;
}

int main() {
    string data;
    if (getline(cin, data)) {
        while (!data.empty() && (data.back() == '\\r' || data.back() == '\\n')) data.pop_back();
        uint32_t fcs = computeCRC32(data);
        cout << "CRC-32: 0x" << uppercase << hex << setfill('0') << setw(8) << fcs << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;
import java.util.zip.CRC32;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String data = sc.nextLine();
            while (data.endsWith("\\r") || data.endsWith("\\n")) {
                data = data.substring(0, data.length() - 1);
            }
            CRC32 crc = new CRC32();
            crc.update(data.getBytes());
            long val = crc.getValue();
            System.out.printf("CRC-32: 0x%08X%n", val);
        }
    }
}`,
      python: `import sys
import zlib

def solve():
    line = sys.stdin.read().rstrip("\\r\\n")
    if not line:
        return
    fcs = zlib.crc32(line.encode("utf-8")) & 0xFFFFFFFF
    print(f"CRC-32: 0x{fcs:08X}")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'd7-prob10-tc1',
        input: 'SPSU Placement 2026',
        expectedOutput: 'CRC-32: 0x8C526A18',
        isHidden: false,
        explanation: 'Standard IEEE 802.3 CRC-32 checksum computation for string.',
      },
      {
        id: 'd7-prob10-tc2',
        input: '123456789',
        expectedOutput: 'CRC-32: 0xCBF43926',
        isHidden: false,
        explanation: 'Universal CRC-32 test vector (0xCBF43926).',
      },
    ],
  },
];
