const fs = require('fs');
const path = require('path');

const challenges = [
  // 1. Multi-Level Parking Lot
  {
    id: 'd15-ch-1',
    day: 15,
    title: 'Multi-Level Parking Lot Machine Coding (LLD)',
    difficulty: 'Hard',
    moduleTag: '16. Machine Coding & Concurrency',
    companies: ['Google', 'Amazon', 'Uber', 'Atlassian'],
    platforms: ['Machine Coding Lab'],
    problemStatement:
      'Design a multi-level parking lot with F floors and S spots per floor. Spot sizes cycle: spot 0 is Compact (bikes only), spot 1 is Regular (bikes, cars), spot 2 is Large (bikes, cars, trucks). Given vehicle arrivals (0=Bike, 1=Car, 2=Truck) and durations in hours, allocate the first available spot on the lowest floor and calculate fees (Bike=$10/hr, Car=$20/hr, Truck=$30/hr). Output allocated spot `(floor*1000 + spot)` and total fee.',
    inputFormat: 'First line: F S Q (floors, spots per floor, queries).\nNext Q lines: vehicle_type duration_hours',
    outputFormat: 'For each query, output allocated spot ID and fee separated by space (or `-1 0` if lot full).',
    constraints: ['1 <= F <= 10', '1 <= S <= 100', '1 <= Q <= 1000', '0 <= vehicle_type <= 2', '1 <= duration <= 24'],
    sampleInput: '2 3 3\n0 2\n1 3\n2 1',
    sampleOutput: '1000 20\n1001 60\n1002 30',
    kapilIntuition:
      'Mentorship By Kapil: In 90-minute machine coding rounds, model eligibility clearly. Bikes fit any spot; Cars fit Regular and Large; Trucks fit Large only. Search lowest floor first, record occupancy, and calculate fees deterministically.',
    timeComplexity: 'O(F * S) per parking search',
    spaceComplexity: 'O(F * S)',
    testCases: [
      { id: 'tc-1', input: '2 3 3\n0 2\n1 3\n2 1', expectedOutput: '1000 20\n1001 60\n1002 30', isHidden: false, explanation: 'Bike takes 1000, car takes 1001, truck takes 1002.' },
      { id: 'tc-2', input: '1 2 2\n2 5\n2 4', expectedOutput: '-1 0\n-1 0', isHidden: false, explanation: 'Only spot 0 (compact) and 1 (regular) exist, no large spots for trucks.' },
      { id: 'tc-3', input: '2 6 2\n1 4\n0 1', expectedOutput: '1001 80\n1000 10', isHidden: true, explanation: 'Car takes 1001, bike takes 1000.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int F, S, Q;
    if (scanf("%d %d %d", &F, &S, &Q) != 3) return 0;
    // Implement Multi-Level Parking Lot allocation
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int F, S, Q;
    if (!(cin >> F >> S >> Q)) return 0;
    // Implement Multi-Level Parking Lot allocation
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int F = sc.nextInt();
        int S = sc.nextInt();
        int Q = sc.nextInt();
        // Implement Multi-Level Parking Lot allocation
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    F, S, Q = int(lines[0]), int(lines[1]), int(lines[2])
    # Implement Multi-Level Parking Lot allocation

if __name__ == '__main__':
    main()
`
    },
    solutionCode: {
      c: `#include <stdio.h>

int occupied[12][105];

int main() {
    int F, S, Q;
    if (scanf("%d %d %d", &F, &S, &Q) != 3) return 0;

    int rates[] = {10, 20, 30};

    for (int q = 0; q < Q; ++q) {
        int vtype, hours;
        scanf("%d %d", &vtype, &hours);
        int assigned_floor = -1, assigned_spot = -1;

        for (int f = 0; f < F; ++f) {
            for (int s = 0; s < S; ++s) {
                int st = s % 3; // 0: compact, 1: regular, 2: large
                if (!occupied[f][s]) {
                    if ((vtype == 0) || (vtype == 1 && st >= 1) || (vtype == 2 && st == 2)) {
                        occupied[f][s] = 1;
                        assigned_floor = f + 1;
                        assigned_spot = s;
                        break;
                    }
                }
            }
            if (assigned_floor != -1) break;
        }

        if (assigned_floor != -1) {
            int ticket = assigned_floor * 1000 + assigned_spot;
            int fee = rates[vtype] * hours;
            printf("%d %d\\n", ticket, fee);
        } else {
            printf("-1 0\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int F, S, Q;
    if (!(cin >> F >> S >> Q)) return 0;

    vector<vector<bool>> occupied(F, vector<bool>(S, false));
    int rates[] = {10, 20, 30};

    while (Q--) {
        int vtype, hours;
        cin >> vtype >> hours;
        int assigned_floor = -1, assigned_spot = -1;

        for (int f = 0; f < F; ++f) {
            for (int s = 0; s < S; ++s) {
                int st = s % 3;
                if (!occupied[f][s]) {
                    if (vtype == 0 || (vtype == 1 && st >= 1) || (vtype == 2 && st == 2)) {
                        occupied[f][s] = true;
                        assigned_floor = f + 1;
                        assigned_spot = s;
                        break;
                    }
                }
            }
            if (assigned_floor != -1) break;
        }

        if (assigned_floor != -1) {
            int ticket = assigned_floor * 1000 + assigned_spot;
            int fee = rates[vtype] * hours;
            cout << ticket << " " << fee << "\\n";
        } else {
            cout << "-1 0\\n";
        }
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int F = sc.nextInt();
        int S = sc.nextInt();
        int Q = sc.nextInt();

        boolean[][] occupied = new boolean[F][S];
        int[] rates = {10, 20, 30};

        for (int q = 0; q < Q; q++) {
            int vtype = sc.nextInt();
            int hours = sc.nextInt();
            int assignedFloor = -1;
            int assignedSpot = -1;

            for (int f = 0; f < F; f++) {
                for (int s = 0; s < S; s++) {
                    int st = s % 3;
                    if (!occupied[f][s]) {
                        if (vtype == 0 || (vtype == 1 && st >= 1) || (vtype == 2 && st == 2)) {
                            occupied[f][s] = true;
                            assignedFloor = f + 1;
                            assignedSpot = s;
                            break;
                        }
                    }
                }
                if (assignedFloor != -1) break;
            }

            if (assignedFloor != -1) {
                int ticket = assignedFloor * 1000 + assignedSpot;
                int fee = rates[vtype] * hours;
                System.out.println(ticket + " " + fee);
            } else {
                System.out.println("-1 0");
            }
        }
    }
}`,
      python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    F, S, Q = int(input_data[0]), int(input_data[1]), int(input_data[2])
    idx = 3

    occupied = [[False] * S for _ in range(F)]
    rates = [10, 20, 30]

    for _ in range(Q):
        vtype = int(input_data[idx])
        hours = int(input_data[idx + 1])
        idx += 2

        assigned_floor = -1
        assigned_spot = -1

        for f in range(F):
            for s in range(S):
                st = s % 3
                if not occupied[f][s]:
                    if vtype == 0 or (vtype == 1 and st >= 1) or (vtype == 2 and st == 2):
                        occupied[f][s] = True
                        assigned_floor = f + 1
                        assigned_spot = s
                        break
            if assigned_floor != -1:
                break

        if assigned_floor != -1:
            ticket = assigned_floor * 1000 + assigned_spot
            fee = rates[vtype] * hours
            print(f"{ticket} {fee}")
        else:
            print("-1 0")

if __name__ == '__main__':
    main()
`
    }
  },

  // 2. Thread-Safe In-Memory Key-Value Store with TTL
  {
    id: 'd15-ch-2',
    day: 15,
    title: 'Thread-Safe In-Memory Key-Value Store with TTL',
    difficulty: 'Medium',
    moduleTag: '16. Machine Coding & Concurrency',
    companies: ['Redis', 'Amazon', 'Stripe', 'Google'],
    platforms: ['System Implementation Lab'],
    problemStatement:
      'Implement an in-memory key-value store with time-to-live (TTL) expiration. Support operations:\n- `SET key val ttl_ms timestamp`: inserts key with expiration `timestamp + ttl_ms`.\n- `GET key timestamp`: returns value if `timestamp <= expiry`, otherwise returns `NULL` and evicts key.',
    inputFormat: 'First line: Q (queries count).\nNext Q lines: `SET key val ttl timestamp` or `GET key timestamp`',
    outputFormat: 'For each GET operation, print the stored value or `NULL`.',
    constraints: ['1 <= Q <= 1000', '1 <= key, val length <= 32', '1 <= ttl, timestamp <= 10^9'],
    sampleInput: '4\nSET session abc 500 1000\nGET session 1200\nGET session 1600\nGET unknown 2000',
    sampleOutput: 'abc\nNULL\nNULL',
    kapilIntuition:
      'Mentorship By Kapil: Passive/lazy eviction checks timestamps on each GET query. If `query_time > entry.expiry`, erase from map and return NULL. This provides O(1) average time without requiring background reaper threads.',
    timeComplexity: 'O(1) average per operation',
    spaceComplexity: 'O(N)',
    testCases: [
      { id: 'tc-1', input: '4\nSET session abc 500 1000\nGET session 1200\nGET session 1600\nGET unknown 2000', expectedOutput: 'abc\nNULL\nNULL', isHidden: false, explanation: '1200 <= 1500 returns abc, 1600 > 1500 returns NULL.' },
      { id: 'tc-2', input: '3\nSET k1 v1 100 50\nGET k1 100\nGET k1 151', expectedOutput: 'v1\nNULL', isHidden: false, explanation: '100 <= 150 returns v1, 151 expires.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int Q;
    if (scanf("%d", &Q) != 1) return 0;
    // Implement Expiring KV Store
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

int main() {
    int Q;
    if (!(cin >> Q)) return 0;
    // Implement Expiring KV Store
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int Q = sc.nextInt();
        // Implement Expiring KV Store
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement Expiring KV Store

if __name__ == '__main__':
    main()
`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

typedef struct {
    char key[32];
    char val[32];
    long long expiry;
    int active;
} KVEntry;

KVEntry store[1005];
int entry_count = 0;

int main() {
    int Q;
    if (scanf("%d", &Q) != 1) return 0;

    for (int q = 0; q < Q; ++q) {
        char op[10];
        scanf("%s", op);
        if (strcmp(op, "SET") == 0) {
            char k[32], v[32];
            long long ttl, now_ts;
            scanf("%s %s %lld %lld", k, v, &ttl, &now_ts);
            int found = 0;
            for (int i = 0; i < entry_count; ++i) {
                if (store[i].active && strcmp(store[i].key, k) == 0) {
                    strncpy(store[i].val, v, 31);
                    store[i].expiry = now_ts + ttl;
                    found = 1;
                    break;
                }
            }
            if (!found) {
                strncpy(store[entry_count].key, k, 31);
                strncpy(store[entry_count].val, v, 31);
                store[entry_count].expiry = now_ts + ttl;
                store[entry_count].active = 1;
                entry_count++;
            }
        } else if (strcmp(op, "GET") == 0) {
            char k[32];
            long long now_ts;
            scanf("%s %lld", k, &now_ts);
            int found = 0;
            for (int i = 0; i < entry_count; ++i) {
                if (store[i].active && strcmp(store[i].key, k) == 0) {
                    if (now_ts <= store[i].expiry) {
                        printf("%s\\n", store[i].val);
                    } else {
                        store[i].active = 0; // lazy eviction
                        printf("NULL\\n");
                    }
                    found = 1;
                    break;
                }
            }
            if (!found) {
                printf("NULL\\n");
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

struct Entry {
    string value;
    long long expiry;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int Q;
    if (!(cin >> Q)) return 0;

    unordered_map<string, Entry> store;

    while (Q--) {
        string op;
        cin >> op;
        if (op == "SET") {
            string k, v;
            long long ttl, now_ts;
            cin >> k >> v >> ttl >> now_ts;
            store[k] = {v, now_ts + ttl};
        } else if (op == "GET") {
            string k;
            long long now_ts;
            cin >> k >> now_ts;
            auto it = store.find(k);
            if (it == store.end()) {
                cout << "NULL\\n";
            } else {
                if (now_ts <= it->second.expiry) {
                    cout << it->second.value << "\\n";
                } else {
                    store.erase(it);
                    cout << "NULL\\n";
                }
            }
        }
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Solution {
    static class Entry {
        String val;
        long expiry;
        Entry(String val, long expiry) { this.val = val; this.expiry = expiry; }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int Q = sc.nextInt();

        Map<String, Entry> store = new HashMap<>();

        for (int q = 0; q < Q; q++) {
            String op = sc.next();
            if ("SET".equals(op)) {
                String k = sc.next();
                String v = sc.next();
                long ttl = sc.nextLong();
                long now = sc.nextLong();
                store.put(k, new Entry(v, now + ttl));
            } else if ("GET".equals(op)) {
                String k = sc.next();
                long now = sc.nextLong();
                Entry e = store.get(k);
                if (e == null) {
                    System.out.println("NULL");
                } else {
                    if (now <= e.expiry) {
                        System.out.println(e.val);
                    } else {
                        store.remove(k);
                        System.out.println("NULL");
                    }
                }
            }
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    Q = int(lines[0])
    idx = 1

    store = {}

    for _ in range(Q):
        op = lines[idx]
        if op == "SET":
            k, v = lines[idx + 1], lines[idx + 2]
            ttl = int(lines[idx + 3])
            now_ts = int(lines[idx + 4])
            store[k] = (v, now_ts + ttl)
            idx += 5
        elif op == "GET":
            k = lines[idx + 1]
            now_ts = int(lines[idx + 2])
            idx += 3
            if k in store:
                val, expiry = store[k]
                if now_ts <= expiry:
                    print(val)
                else:
                    del store[k]
                    print("NULL")
            else:
                print("NULL")

if __name__ == '__main__':
    main()
`
    }
  },

  // 3. Bounded Blocking Queue
  {
    id: 'd15-ch-3',
    day: 15,
    title: 'Bounded Blocking Queue Simulator (Producer-Consumer)',
    difficulty: 'Medium',
    moduleTag: '16. Machine Coding & Concurrency',
    companies: ['Uber', 'Microsoft', 'Google', 'Meta'],
    platforms: ['Concurrency Lab'],
    problemStatement:
      'Simulate a circular bounded queue of capacity C. Support:\n- `PUSH x`: If size < C, enqueues x and outputs `OK`. If full, outputs `BLOCKED`.\n- `POP`: If size > 0, dequeues head and outputs value. If empty, outputs `EMPTY`.',
    inputFormat: 'First line: C Q (capacity and queries).\nNext Q lines: `PUSH x` or `POP`',
    outputFormat: 'For each operation, output the result on a new line.',
    constraints: ['1 <= C <= 100', '1 <= Q <= 1000', '1 <= x <= 10^5'],
    sampleInput: '2 5\nPUSH 10\nPUSH 20\nPUSH 30\nPOP\nPOP',
    sampleOutput: 'OK\nOK\nBLOCKED\n10\n20',
    kapilIntuition:
      'Mentorship By Kapil: Model circular buffer indexing with `head`, `tail`, and `count`. On full condition, production systems block on a Condition Variable; in this simulator, return `BLOCKED`.',
    timeComplexity: 'O(1) per operation',
    spaceComplexity: 'O(C)',
    testCases: [
      { id: 'tc-1', input: '2 5\nPUSH 10\nPUSH 20\nPUSH 30\nPOP\nPOP', expectedOutput: 'OK\nOK\nBLOCKED\n10\n20', isHidden: false, explanation: 'Queue fills to 2, 30 is blocked, pops yield 10 and 20.' },
      { id: 'tc-2', input: '1 3\nPOP\nPUSH 99\nPOP', expectedOutput: 'EMPTY\nOK\n99', isHidden: false, explanation: 'Pop on empty returns EMPTY.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int C, Q;
    if (scanf("%d %d", &C, &Q) != 2) return 0;
    // Implement Bounded Queue
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int C, Q;
    if (!(cin >> C >> Q)) return 0;
    // Implement Bounded Queue
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int C = sc.nextInt();
        int Q = sc.nextInt();
        // Implement Bounded Queue
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement Bounded Queue

if __name__ == '__main__':
    main()
`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int buf[105];
int head = 0, tail = 0, count = 0;

int main() {
    int C, Q;
    if (scanf("%d %d", &C, &Q) != 2) return 0;

    for (int q = 0; q < Q; ++q) {
        char op[10];
        scanf("%s", op);
        if (strcmp(op, "PUSH") == 0) {
            int x;
            scanf("%d", &x);
            if (count < C) {
                buf[tail] = x;
                tail = (tail + 1) % C;
                count++;
                printf("OK\\n");
            } else {
                printf("BLOCKED\\n");
            }
        } else if (strcmp(op, "POP") == 0) {
            if (count > 0) {
                int val = buf[head];
                head = (head + 1) % C;
                count--;
                printf("%d\\n", val);
            } else {
                printf("EMPTY\\n");
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int C, Q;
    if (!(cin >> C >> Q)) return 0;

    vector<int> buf(C);
    int head = 0, tail = 0, count = 0;

    while (Q--) {
        string op;
        cin >> op;
        if (op == "PUSH") {
            int x;
            cin >> x;
            if (count < C) {
                buf[tail] = x;
                tail = (tail + 1) % C;
                count++;
                cout << "OK\\n";
            } else {
                cout << "BLOCKED\\n";
            }
        } else if (op == "POP") {
            if (count > 0) {
                int val = buf[head];
                head = (head + 1) % C;
                count--;
                cout << val << "\\n";
            } else {
                cout << "EMPTY\\n";
            }
        }
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int C = sc.nextInt();
        int Q = sc.nextInt();

        int[] buf = new int[C];
        int head = 0, tail = 0, count = 0;

        for (int q = 0; q < Q; q++) {
            String op = sc.next();
            if ("PUSH".equals(op)) {
                int x = sc.nextInt();
                if (count < C) {
                    buf[tail] = x;
                    tail = (tail + 1) % C;
                    count++;
                    System.out.println("OK");
                } else {
                    System.out.println("BLOCKED");
                }
            } else if ("POP".equals(op)) {
                if (count > 0) {
                    int val = buf[head];
                    head = (head + 1) % C;
                    count--;
                    System.out.println(val);
                } else {
                    System.out.println("EMPTY");
                }
            }
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    C, Q = int(lines[0]), int(lines[1])
    idx = 2

    buf = [0] * C
    head = 0
    tail = 0
    count = 0

    for _ in range(Q):
        op = lines[idx]
        if op == "PUSH":
            x = int(lines[idx + 1])
            idx += 2
            if count < C:
                buf[tail] = x
                tail = (tail + 1) % C
                count += 1
                print("OK")
            else:
                print("BLOCKED")
        elif op == "POP":
            idx += 1
            if count > 0:
                val = buf[head]
                head = (head + 1) % C
                count -= 1
                print(val)
            else:
                print("EMPTY")

if __name__ == '__main__':
    main()
`
    }
  },

  // 4. Thread-Safe LRU Cache
  {
    id: 'd15-ch-4',
    day: 15,
    title: 'LRU Cache with O(1) Eviction',
    difficulty: 'Hard',
    moduleTag: '16. Machine Coding & Concurrency',
    companies: ['Google', 'Meta', 'Amazon', 'Apple'],
    platforms: ['LeetCode 146', 'HackerRank'],
    problemStatement:
      'Implement an LRU Cache with capacity C. Support:\n- `PUT key val`: Updates or inserts key. If over capacity, evicts least recently used key.\n- `GET key`: Returns value and promotes key to most recently used. If missing, returns -1.',
    inputFormat: 'First line: C Q (capacity, queries count).\nNext Q lines: `PUT key val` or `GET key`',
    outputFormat: 'For each GET operation, output the integer value or -1.',
    constraints: ['1 <= C <= 1000', '1 <= Q <= 2000', '0 <= key, val <= 10^5'],
    sampleInput: '2 6\nPUT 1 10\nPUT 2 20\nGET 1\nPUT 3 30\nGET 2\nGET 3',
    sampleOutput: '10\n-1\n30',
    kapilIntuition:
      'Mentorship By Kapil: Combine a Hash Map with a Doubly Linked List with sentinel head and tail dummy nodes. On GET or PUT update, splice the node to head. On eviction, remove node right before tail. All operations execute strictly in O(1).',
    timeComplexity: 'O(1) per operation',
    spaceComplexity: 'O(C)',
    testCases: [
      { id: 'tc-1', input: '2 6\nPUT 1 10\nPUT 2 20\nGET 1\nPUT 3 30\nGET 2\nGET 3', expectedOutput: '10\n-1\n30', isHidden: false, explanation: 'Key 2 is evicted when key 3 is added after key 1 is promoted.' },
      { id: 'tc-2', input: '1 3\nPUT 5 50\nGET 5\nGET 6', expectedOutput: '50\n-1', isHidden: false, explanation: 'Single capacity cache test.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int C, Q;
    if (scanf("%d %d", &C, &Q) != 2) return 0;
    // Implement LRU Cache
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int C, Q;
    if (!(cin >> C >> Q)) return 0;
    // Implement LRU Cache
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int C = sc.nextInt();
        int Q = sc.nextInt();
        // Implement LRU Cache
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement LRU Cache

if __name__ == '__main__':
    main()
`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Node {
    int key, val;
    struct Node* prev;
    struct Node* next;
} Node;

Node* head;
Node* tail;
Node* map_table[100005];
int cur_size = 0, max_cap = 0;

void remove_node(Node* n) {
    n->prev->next = n->next;
    n->next->prev = n->prev;
}

void add_to_head(Node* n) {
    n->next = head->next;
    n->prev = head;
    head->next->prev = n;
    head->next = n;
}

int main() {
    int C, Q;
    if (scanf("%d %d", &C, &Q) != 2) return 0;
    max_cap = C;

    head = (Node*)malloc(sizeof(Node));
    tail = (Node*)malloc(sizeof(Node));
    head->next = tail;
    tail->prev = head;

    for (int q = 0; q < Q; ++q) {
        char op[10];
        scanf("%s", op);
        if (strcmp(op, "PUT") == 0) {
            int k, v;
            scanf("%d %d", &k, &v);
            if (map_table[k]) {
                Node* n = map_table[k];
                n->val = v;
                remove_node(n);
                add_to_head(n);
            } else {
                if (cur_size == max_cap) {
                    Node* lru = tail->prev;
                    map_table[lru->key] = NULL;
                    remove_node(lru);
                    free(lru);
                    cur_size--;
                }
                Node* n = (Node*)malloc(sizeof(Node));
                n->key = k; n->val = v;
                map_table[k] = n;
                add_to_head(n);
                cur_size++;
            }
        } else if (strcmp(op, "GET") == 0) {
            int k;
            scanf("%d", &k);
            if (map_table[k]) {
                Node* n = map_table[k];
                remove_node(n);
                add_to_head(n);
                printf("%d\\n", n->val);
            } else {
                printf("-1\\n");
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_map>
#include <list>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int C, Q;
    if (!(cin >> C >> Q)) return 0;

    list<pair<int, int>> dll;
    unordered_map<int, list<pair<int, int>>::iterator> cache;

    while (Q--) {
        string op;
        cin >> op;
        if (op == "PUT") {
            int k, v;
            cin >> k >> v;
            auto it = cache.find(k);
            if (it != cache.end()) {
                it->second->second = v;
                dll.splice(dll.begin(), dll, it->second);
            } else {
                if ((int)dll.size() >= C) {
                    int oldKey = dll.back().first;
                    dll.pop_back();
                    cache.erase(oldKey);
                }
                dll.emplace_front(k, v);
                cache[k] = dll.begin();
            }
        } else if (op == "GET") {
            int k;
            cin >> k;
            auto it = cache.find(k);
            if (it != cache.end()) {
                dll.splice(dll.begin(), dll, it->second);
                cout << it->second->second << "\\n";
            } else {
                cout << "-1\\n";
            }
        }
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int C = sc.nextInt();
        int Q = sc.nextInt();

        Map<Integer, Integer> map = new LinkedHashMap<>(C, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
                return size() > C;
            }
        };

        for (int q = 0; q < Q; q++) {
            String op = sc.next();
            if ("PUT".equals(op)) {
                int k = sc.nextInt();
                int v = sc.nextInt();
                map.put(k, v);
            } else if ("GET".equals(op)) {
                int k = sc.nextInt();
                System.out.println(map.getOrDefault(k, -1));
            }
        }
    }
}`,
      python: `import sys
from collections import OrderedDict

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    C, Q = int(lines[0]), int(lines[1])
    idx = 2

    cache = OrderedDict()

    for _ in range(Q):
        op = lines[idx]
        if op == "PUT":
            k = int(lines[idx + 1])
            v = int(lines[idx + 2])
            idx += 3
            if k in cache:
                cache.move_to_end(k)
            elif len(cache) >= C:
                cache.popitem(last=False)
            cache[k] = v
        elif op == "GET":
            k = int(lines[idx + 1])
            idx += 2
            if k in cache:
                cache.move_to_end(k)
                print(cache[k])
            else:
                print(-1)

if __name__ == '__main__':
    main()
`
    }
  },

  // 5. Distributed Fencing Token Validator
  {
    id: 'd15-ch-5',
    day: 15,
    title: 'Distributed Fencing Token Storage Gate',
    difficulty: 'Medium',
    moduleTag: '16. Machine Coding & Concurrency',
    companies: ['Google', 'AWS', 'Databricks'],
    platforms: ['Distributed Systems Lab'],
    problemStatement:
      'Simulate a distributed storage gate guarded by monotonic Fencing Tokens. The storage gate tracks the highest committed token (watermark). When a write `WRITE token key val` arrives, if `token > watermark`, the write is ACCEPTED, watermark is updated to `token`, and the value is stored. If `token <= watermark`, the write is REJECTED (stale client write hazard blocked). Also support `READ key`.',
    inputFormat: 'First line: Q (queries count).\nNext Q lines: `WRITE token key val` or `READ key`',
    outputFormat: 'For WRITE, print `ACCEPTED` or `REJECTED`. For READ, print stored value or `NONE`.',
    constraints: ['1 <= Q <= 1000', '1 <= token <= 10^9', '1 <= key, val length <= 32'],
    sampleInput: '4\nWRITE 102 order:1 paid\nWRITE 101 order:1 cancelled\nREAD order:1\nWRITE 105 order:1 refunded',
    sampleOutput: 'ACCEPTED\nREJECTED\npaid\nACCEPTED',
    kapilIntuition:
      'Mentorship By Kapil: Fencing tokens solve Martin Kleppmann\'s famous distributed locking critique. By ensuring storage only accepts writes with monotonically strictly greater tokens, stale zombie clients (delayed by GC or network pauses) cannot corrupt committed state.',
    timeComplexity: 'O(1) per operation',
    spaceComplexity: 'O(N)',
    testCases: [
      { id: 'tc-1', input: '4\nWRITE 102 order:1 paid\nWRITE 101 order:1 cancelled\nREAD order:1\nWRITE 105 order:1 refunded', expectedOutput: 'ACCEPTED\nREJECTED\npaid\nACCEPTED', isHidden: false, explanation: 'Token 101 <= 102 is rejected.' },
      { id: 'tc-2', input: '3\nWRITE 10 k v\nWRITE 10 k v2\nREAD k', expectedOutput: 'ACCEPTED\nREJECTED\nv', isHidden: false, explanation: 'Equal token is rejected.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int Q;
    if (scanf("%d", &Q) != 1) return 0;
    // Implement Fencing Storage Gate
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int Q;
    if (!(cin >> Q)) return 0;
    // Implement Fencing Storage Gate
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int Q = sc.nextInt();
        // Implement Fencing Storage Gate
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement Fencing Storage Gate

if __name__ == '__main__':
    main()
`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

typedef struct {
    char key[32];
    char val[32];
    int active;
} GateEntry;

GateEntry gate[1005];
int gate_count = 0;
long long watermark = 0;

int main() {
    int Q;
    if (scanf("%d", &Q) != 1) return 0;

    for (int q = 0; q < Q; ++q) {
        char op[10];
        scanf("%s", op);
        if (strcmp(op, "WRITE") == 0) {
            long long tok;
            char k[32], v[32];
            scanf("%lld %s %s", &tok, k, v);
            if (tok > watermark) {
                watermark = tok;
                int found = 0;
                for (int i = 0; i < gate_count; ++i) {
                    if (gate[i].active && strcmp(gate[i].key, k) == 0) {
                        strncpy(gate[i].val, v, 31);
                        found = 1;
                        break;
                    }
                }
                if (!found) {
                    strncpy(gate[gate_count].key, k, 31);
                    strncpy(gate[gate_count].val, v, 31);
                    gate[gate_count].active = 1;
                    gate_count++;
                }
                printf("ACCEPTED\\n");
            } else {
                printf("REJECTED\\n");
            }
        } else if (strcmp(op, "READ") == 0) {
            char k[32];
            scanf("%s", k);
            int found = 0;
            for (int i = 0; i < gate_count; ++i) {
                if (gate[i].active && strcmp(gate[i].key, k) == 0) {
                    printf("%s\\n", gate[i].val);
                    found = 1;
                    break;
                }
            }
            if (!found) {
                printf("NONE\\n");
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int Q;
    if (!(cin >> Q)) return 0;

    unordered_map<string, string> store;
    long long watermark = 0;

    while (Q--) {
        string op;
        cin >> op;
        if (op == "WRITE") {
            long long tok;
            string k, v;
            cin >> tok >> k >> v;
            if (tok > watermark) {
                watermark = tok;
                store[k] = v;
                cout << "ACCEPTED\\n";
            } else {
                cout << "REJECTED\\n";
            }
        } else if (op == "READ") {
            string k;
            cin >> k;
            auto it = store.find(k);
            if (it != store.end()) {
                cout << it->second << "\\n";
            } else {
                cout << "NONE\\n";
            }
        }
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int Q = sc.nextInt();

        Map<String, String> store = new HashMap<>();
        long watermark = 0;

        for (int q = 0; q < Q; q++) {
            String op = sc.next();
            if ("WRITE".equals(op)) {
                long tok = sc.nextLong();
                String k = sc.next();
                String v = sc.next();
                if (tok > watermark) {
                    watermark = tok;
                    store.put(k, v);
                    System.out.println("ACCEPTED");
                } else {
                    System.out.println("REJECTED");
                }
            } else if ("READ".equals(op)) {
                String k = sc.next();
                System.out.println(store.getOrDefault(k, "NONE"));
            }
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    Q = int(lines[0])
    idx = 1

    store = {}
    watermark = 0

    for _ in range(Q):
        op = lines[idx]
        if op == "WRITE":
            tok = int(lines[idx + 1])
            k = lines[idx + 2]
            v = lines[idx + 3]
            idx += 4
            if tok > watermark:
                watermark = tok
                store[k] = v
                print("ACCEPTED")
            else:
                print("REJECTED")
        elif op == "READ":
            k = lines[idx + 1]
            idx += 2
            print(store.get(k, "NONE"))

if __name__ == '__main__':
    main()
`
    }
  },

  // 6. Two-Phase Commit Consensus Simulator
  {
    id: 'd15-ch-6',
    day: 15,
    title: 'Two-Phase Commit (2PC) Consensus Simulator',
    difficulty: 'Medium',
    moduleTag: '16. Machine Coding & Concurrency',
    companies: ['Oracle', 'Google', 'Amazon', 'Salesforce'],
    platforms: ['Distributed Transactions Lab'],
    problemStatement:
      'Given N database nodes preparing for a distributed transaction, each node votes 1 (PREPARED) or 0 (ABORT). If all N nodes vote 1, coordinator outputs `GLOBAL_COMMIT`. If even a single node votes 0, coordinator outputs `GLOBAL_ABORT`. Given T transaction batches, output the decision for each.',
    inputFormat: 'First line: T (number of transactions).\nNext T lines: N followed by N binary votes (0 or 1)',
    outputFormat: 'For each transaction, output `GLOBAL_COMMIT` or `GLOBAL_ABORT`.',
    constraints: ['1 <= T <= 500', '2 <= N <= 100', 'votes[i] is 0 or 1'],
    sampleInput: '3\n3 1 1 1\n3 1 0 1\n4 0 0 0 0',
    sampleOutput: 'GLOBAL_COMMIT\nGLOBAL_ABORT\nGLOBAL_ABORT',
    kapilIntuition:
      'Mentorship By Kapil: 2PC mandates unanimous consensus during Phase 1. An abort by any single participant or network timeout aborts the entire distributed transaction, demonstrating strict atomicity at the cost of availability.',
    timeComplexity: 'O(N) per transaction',
    spaceComplexity: 'O(1)',
    testCases: [
      { id: 'tc-1', input: '3\n3 1 1 1\n3 1 0 1\n4 0 0 0 0', expectedOutput: 'GLOBAL_COMMIT\nGLOBAL_ABORT\nGLOBAL_ABORT', isHidden: false, explanation: 'All 1s commit, any 0 aborts.' },
      { id: 'tc-2', input: '1\n2 1 1', expectedOutput: 'GLOBAL_COMMIT', isHidden: false, explanation: '2-node unanimous commit.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int T;
    if (scanf("%d", &T) != 1) return 0;
    // Implement 2PC
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int T;
    if (!(cin >> T)) return 0;
    // Implement 2PC
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int T = sc.nextInt();
        // Implement 2PC
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement 2PC

if __name__ == '__main__':
    main()
`
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int T;
    if (scanf("%d", &T) != 1) return 0;
    while (T--) {
        int N;
        scanf("%d", &N);
        int all_ok = 1;
        for (int i = 0; i < N; ++i) {
            int v;
            scanf("%d", &v);
            if (v == 0) all_ok = 0;
        }
        if (all_ok) printf("GLOBAL_COMMIT\\n");
        else printf("GLOBAL_ABORT\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int T;
    if (!(cin >> T)) return 0;
    while (T--) {
        int N;
        cin >> N;
        bool all_ok = true;
        for (int i = 0; i < N; ++i) {
            int v;
            cin >> v;
            if (v == 0) all_ok = false;
        }
        cout << (all_ok ? "GLOBAL_COMMIT" : "GLOBAL_ABORT") << "\\n";
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int T = sc.nextInt();
        while (T-- > 0) {
            int N = sc.nextInt();
            boolean allOk = true;
            for (int i = 0; i < N; i++) {
                if (sc.nextInt() == 0) allOk = false;
            }
            System.out.println(allOk ? "GLOBAL_COMMIT" : "GLOBAL_ABORT");
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    T = int(lines[0])
    idx = 1
    for _ in range(T):
        N = int(lines[idx])
        idx += 1
        all_ok = True
        for _ in range(N):
            if int(lines[idx]) == 0:
                all_ok = False
            idx += 1
        print("GLOBAL_COMMIT" if all_ok else "GLOBAL_ABORT")

if __name__ == '__main__':
    main()
`
    }
  },

  // 7. Resilient Saga Transaction Orchestrator with Rollback
  {
    id: 'd15-ch-7',
    day: 15,
    title: 'Resilient Saga Transaction Orchestrator with Rollback',
    difficulty: 'Hard',
    moduleTag: '16. Machine Coding & Concurrency',
    companies: ['Uber', 'Stripe', 'Netflix', 'DoorDash'],
    platforms: ['Microservices Lab'],
    problemStatement:
      'Given a pipeline of S named microservice steps with execution statuses (1=SUCCESS, 0=FAIL). Steps execute sequentially. If any step fails, the orchestrator halts forward execution and triggers compensating rollbacks for all previously completed steps in strict reverse order. If all succeed, output `SAGA_COMMITTED`. If any fails, output rollback lines `COMPENSATE step_name` in reverse order followed by `SAGA_ROLLED_BACK`.',
    inputFormat: 'First line: S (number of steps).\nNext S lines: step_name status (1 or 0)',
    outputFormat: 'Output forward failure/compensation steps and final status `SAGA_COMMITTED` or `SAGA_ROLLED_BACK`.',
    constraints: ['1 <= S <= 20', '1 <= step_name length <= 32'],
    sampleInput: '3\nPaymentGateway 1\nInventoryReserve 1\nShippingDispatch 0',
    sampleOutput: 'COMPENSATE InventoryReserve\nCOMPENSATE PaymentGateway\nSAGA_ROLLED_BACK',
    kapilIntuition:
      'Mentorship By Kapil: Saga Orchestrator replaces blocking 2PC locks across microservices. Recording completed steps in a LIFO stack allows deterministic reverse compensation upon failure, ensuring eventual consistency.',
    timeComplexity: 'O(S)',
    spaceComplexity: 'O(S)',
    testCases: [
      { id: 'tc-1', input: '3\nPaymentGateway 1\nInventoryReserve 1\nShippingDispatch 0', expectedOutput: 'COMPENSATE InventoryReserve\nCOMPENSATE PaymentGateway\nSAGA_ROLLED_BACK', isHidden: false, explanation: 'Step 3 fails, steps 2 and 1 compensated in reverse.' },
      { id: 'tc-2', input: '2\nStepA 1\nStepB 1', expectedOutput: 'SAGA_COMMITTED', isHidden: false, explanation: 'All steps pass.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int S;
    if (scanf("%d", &S) != 1) return 0;
    // Implement Saga Orchestrator
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int S;
    if (!(cin >> S)) return 0;
    // Implement Saga Orchestrator
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int S = sc.nextInt();
        // Implement Saga Orchestrator
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement Saga Orchestrator

if __name__ == '__main__':
    main()
`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

char completed[25][35];
int completed_count = 0;

int main() {
    int S;
    if (scanf("%d", &S) != 1) return 0;

    int failed = 0;
    for (int i = 0; i < S; ++i) {
        char name[35];
        int status;
        scanf("%s %d", name, &status);
        if (!failed) {
            if (status == 1) {
                strncpy(completed[completed_count++], name, 34);
            } else {
                failed = 1;
            }
        }
    }

    if (failed) {
        for (int i = completed_count - 1; i >= 0; --i) {
            printf("COMPENSATE %s\\n", completed[i]);
        }
        printf("SAGA_ROLLED_BACK\\n");
    } else {
        printf("SAGA_COMMITTED\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int S;
    if (!(cin >> S)) return 0;

    vector<string> completed;
    bool failed = false;

    for (int i = 0; i < S; ++i) {
        string name;
        int status;
        cin >> name >> status;
        if (!failed) {
            if (status == 1) {
                completed.push_back(name);
            } else {
                failed = true;
            }
        }
    }

    if (failed) {
        for (int i = (int)completed.size() - 1; i >= 0; --i) {
            cout << "COMPENSATE " << completed[i] << "\\n";
        }
        cout << "SAGA_ROLLED_BACK\\n";
    } else {
        cout << "SAGA_COMMITTED\\n";
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int S = sc.nextInt();

        List<String> completed = new ArrayList<>();
        boolean failed = false;

        for (int i = 0; i < S; i++) {
            String name = sc.next();
            int status = sc.nextInt();
            if (!failed) {
                if (status == 1) {
                    completed.add(name);
                } else {
                    failed = true;
                }
            }
        }

        if (failed) {
            for (int i = completed.size() - 1; i >= 0; i--) {
                System.out.println("COMPENSATE " + completed.get(i));
            }
            System.out.println("SAGA_ROLLED_BACK");
        } else {
            System.out.println("SAGA_COMMITTED");
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    S = int(lines[0])
    idx = 1

    completed = []
    failed = False

    for _ in range(S):
        name = lines[idx]
        status = int(lines[idx + 1])
        idx += 2
        if not failed:
            if status == 1:
                completed.append(name)
            else:
                failed = True

    if failed:
        for name in reversed(completed):
            print(f"COMPENSATE {name}")
        print("SAGA_ROLLED_BACK")
    else:
        print("SAGA_COMMITTED")

if __name__ == '__main__':
    main()
`
    }
  },

  // 8. Atomic Lock-Free Stack (Treiber Stack CAS)
  {
    id: 'd15-ch-8',
    day: 15,
    title: 'Atomic Lock-Free Concurrent Stack (Treiber Stack CAS)',
    difficulty: 'Hard',
    moduleTag: '16. Machine Coding & Concurrency',
    companies: ['Apple', 'Intel', 'Google', 'Meta'],
    platforms: ['Lock-Free Algorithms Lab'],
    problemStatement:
      'Simulate an atomic lock-free LIFO stack using CAS semantics. Support:\n- `PUSH x`: pushes x to top of stack, prints `PUSHED x`.\n- `POP`: pops top item and prints `POPPED x`. If stack is empty, prints `POPPED NONE`.',
    inputFormat: 'First line: Q (queries count).\nNext Q lines: `PUSH x` or `POP`',
    outputFormat: 'For each operation, output the result on a new line.',
    constraints: ['1 <= Q <= 1000', '1 <= x <= 10^5'],
    sampleInput: '4\nPUSH 42\nPUSH 99\nPOP\nPOP',
    sampleOutput: 'PUSHED 42\nPUSHED 99\nPOPPED 99\nPOPPED 42',
    kapilIntuition:
      'Mentorship By Kapil: Treiber stack links nodes via an atomic `head` pointer. In actual multi-threaded code, `compare_exchange_weak(&head, node->next, node)` performs the lock-free mutation. On empty stack, pop returns sentinel.',
    timeComplexity: 'O(1) average per operation',
    spaceComplexity: 'O(N)',
    testCases: [
      { id: 'tc-1', input: '4\nPUSH 42\nPUSH 99\nPOP\nPOP', expectedOutput: 'PUSHED 42\nPUSHED 99\nPOPPED 99\nPOPPED 42', isHidden: false, explanation: 'LIFO order output.' },
      { id: 'tc-2', input: '2\nPOP\nPUSH 1', expectedOutput: 'POPPED NONE\nPUSHED 1', isHidden: false, explanation: 'Pop on empty stack returns NONE.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int Q;
    if (scanf("%d", &Q) != 1) return 0;
    // Implement Treiber Stack
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int Q;
    if (!(cin >> Q)) return 0;
    // Implement Treiber Stack
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int Q = sc.nextInt();
        // Implement Treiber Stack
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement Treiber Stack

if __name__ == '__main__':
    main()
`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int stack_items[1005];
int top = -1;

int main() {
    int Q;
    if (scanf("%d", &Q) != 1) return 0;

    for (int q = 0; q < Q; ++q) {
        char op[10];
        scanf("%s", op);
        if (strcmp(op, "PUSH") == 0) {
            int x;
            scanf("%d", &x);
            stack_items[++top] = x;
            printf("PUSHED %d\\n", x);
        } else if (strcmp(op, "POP") == 0) {
            if (top >= 0) {
                printf("POPPED %d\\n", stack_items[top--]);
            } else {
                printf("POPPED NONE\\n");
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int Q;
    if (!(cin >> Q)) return 0;

    vector<int> st;

    while (Q--) {
        string op;
        cin >> op;
        if (op == "PUSH") {
            int x;
            cin >> x;
            st.push_back(x);
            cout << "PUSHED " << x << "\\n";
        } else if (op == "POP") {
            if (!st.empty()) {
                int val = st.back();
                st.pop_back();
                cout << "POPPED " << val << "\\n";
            } else {
                cout << "POPPED NONE\\n";
            }
        }
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int Q = sc.nextInt();

        Deque<Integer> stack = new ArrayDeque<>();

        for (int q = 0; q < Q; q++) {
            String op = sc.next();
            if ("PUSH".equals(op)) {
                int x = sc.nextInt();
                stack.push(x);
                System.out.println("PUSHED " + x);
            } else if ("POP".equals(op)) {
                if (!stack.isEmpty()) {
                    System.out.println("POPPED " + stack.pop());
                } else {
                    System.out.println("POPPED NONE");
                }
            }
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    Q = int(lines[0])
    idx = 1

    stack = []

    for _ in range(Q):
        op = lines[idx]
        if op == "PUSH":
            x = int(lines[idx + 1])
            idx += 2
            stack.append(x)
            print(f"PUSHED {x}")
        elif op == "POP":
            idx += 1
            if stack:
                print(f"POPPED {stack.pop()}")
            else:
                print("POPPED NONE")

if __name__ == '__main__':
    main()
`
    }
  },

  // 9. Rate Limiter Factory (LLD)
  {
    id: 'd15-ch-9',
    day: 15,
    title: 'Extensible Rate Limiter Factory (LLD)',
    difficulty: 'Medium',
    moduleTag: '16. Machine Coding & Concurrency',
    companies: ['Stripe', 'Twilio', 'Shopify', 'Coinbase'],
    platforms: ['System Design Lab'],
    problemStatement:
      'Design a Rate Limiter Factory supporting tiers:\n- `FREE`: limit is 2 requests per query burst.\n- `PRO`: limit is 5 requests per query burst.\n- `ENTERPRISE`: limit is 20 requests per query burst.\nGiven client queries with `tier request_count`, output `ALLOWED` if `request_count <= limit`, otherwise `REJECTED`.',
    inputFormat: 'First line: Q (queries count).\nNext Q lines: tier request_count',
    outputFormat: 'For each query, output `ALLOWED` or `REJECTED`.',
    constraints: ['1 <= Q <= 1000', 'tier in {FREE, PRO, ENTERPRISE}', '1 <= request_count <= 100'],
    sampleInput: '3\nFREE 2\nFREE 3\nPRO 4',
    sampleOutput: 'ALLOWED\nREJECTED\nALLOWED',
    kapilIntuition:
      'Mentorship By Kapil: Factory Method cleanly encapsulates instantiation. The client requests a limiter for their tier, and the factory returns an implementation of `IRateLimiter` without the client knowing underlying class details.',
    timeComplexity: 'O(1) per check',
    spaceComplexity: 'O(1)',
    testCases: [
      { id: 'tc-1', input: '3\nFREE 2\nFREE 3\nPRO 4', expectedOutput: 'ALLOWED\nREJECTED\nALLOWED', isHidden: false, explanation: 'Free caps at 2, Pro caps at 5.' },
      { id: 'tc-2', input: '2\nENTERPRISE 20\nENTERPRISE 21', expectedOutput: 'ALLOWED\nREJECTED', isHidden: false, explanation: 'Enterprise caps at 20.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int Q;
    if (scanf("%d", &Q) != 1) return 0;
    // Implement Rate Limiter Factory
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int Q;
    if (!(cin >> Q)) return 0;
    // Implement Rate Limiter Factory
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int Q = sc.nextInt();
        // Implement Rate Limiter Factory
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement Rate Limiter Factory

if __name__ == '__main__':
    main()
`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int Q;
    if (scanf("%d", &Q) != 1) return 0;

    for (int q = 0; q < Q; ++q) {
        char tier[20];
        int count;
        scanf("%s %d", tier, &count);
        int limit = 2;
        if (strcmp(tier, "PRO") == 0) limit = 5;
        else if (strcmp(tier, "ENTERPRISE") == 0) limit = 20;

        if (count <= limit) printf("ALLOWED\\n");
        else printf("REJECTED\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int Q;
    if (!(cin >> Q)) return 0;

    while (Q--) {
        string tier;
        int count;
        cin >> tier >> count;
        int limit = 2;
        if (tier == "PRO") limit = 5;
        else if (tier == "ENTERPRISE") limit = 20;

        cout << (count <= limit ? "ALLOWED" : "REJECTED") << "\\n";
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int Q = sc.nextInt();

        for (int q = 0; q < Q; q++) {
            String tier = sc.next();
            int count = sc.nextInt();
            int limit = 2;
            if ("PRO".equalsIgnoreCase(tier)) limit = 5;
            else if ("ENTERPRISE".equalsIgnoreCase(tier)) limit = 20;

            System.out.println(count <= limit ? "ALLOWED" : "REJECTED");
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    Q = int(lines[0])
    idx = 1

    for _ in range(Q):
        tier = lines[idx]
        count = int(lines[idx + 1])
        idx += 2
        limit = 2
        if tier == "PRO":
            limit = 5
        elif tier == "ENTERPRISE":
            limit = 20

        print("ALLOWED" if count <= limit else "REJECTED")

if __name__ == '__main__':
    main()
`
    }
  },

  // 10. Dining Philosophers Deadlock Prevention
  {
    id: 'd15-ch-10',
    day: 15,
    title: 'Dining Philosophers Deadlock Prevention (Resource Ordering)',
    difficulty: 'Medium',
    moduleTag: '16. Machine Coding & Concurrency',
    companies: ['Amazon', 'Google', 'Cisco', 'Qualcomm'],
    platforms: ['Operating Systems Lab'],
    problemStatement:
      'N philosophers sit at a round table with N chopsticks numbered 0 to N-1. Philosopher i needs chopstick i and chopstick (i+1)%N to eat. Under Resource Hierarchy Ordering, each philosopher MUST always acquire the chopstick with the lower index first before acquiring the chopstick with the higher index, breaking circular wait. For philosopher i, output the acquisition order `LOWER_IDX HIGHER_IDX`.',
    inputFormat: 'First line: N (philosophers count).\nNext line: Q (queries of philosopher indices).\nNext Q lines: philosopher_index i (0 <= i < N)',
    outputFormat: 'For each query, output the two chopstick indices in the order they must be acquired.',
    constraints: ['3 <= N <= 100', '1 <= Q <= 100', '0 <= i < N'],
    sampleInput: '5 3\n0\n4\n2',
    sampleOutput: '0 1\n0 4\n2 3',
    kapilIntuition:
      'Mentorship By Kapil: The classic Dijkstra Dining Philosophers deadlock is caused by Circular Wait. Enforcing a global total ordering (always grab lower-numbered resource first) mathematically prevents cycles in the resource allocation graph.',
    timeComplexity: 'O(1) per philosopher query',
    spaceComplexity: 'O(1)',
    testCases: [
      { id: 'tc-1', input: '5 3\n0\n4\n2', expectedOutput: '0 1\n0 4\n2 3', isHidden: false, explanation: 'Philosopher 4 needs 4 and 0; lower first means 0 then 4.' },
      { id: 'tc-2', input: '3 2\n0\n2', expectedOutput: '0 1\n0 2', isHidden: false, explanation: 'N=3 test case.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, Q;
    if (scanf("%d %d", &N, &Q) != 2) return 0;
    // Implement Resource Ordering
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int N, Q;
    if (!(cin >> N >> Q)) return 0;
    // Implement Resource Ordering
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int Q = sc.nextInt();
        // Implement Resource Ordering
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement Resource Ordering

if __name__ == '__main__':
    main()
`
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int N, Q;
    if (scanf("%d %d", &N, &Q) != 2) return 0;

    for (int q = 0; q < Q; ++q) {
        int i;
        scanf("%d", &i);
        int c1 = i;
        int c2 = (i + 1) % N;
        if (c1 > c2) {
            int tmp = c1; c1 = c2; c2 = tmp;
        }
        printf("%d %d\\n", c1, c2);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <algorithm>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int N, Q;
    if (!(cin >> N >> Q)) return 0;

    while (Q--) {
        int i;
        cin >> i;
        int c1 = i;
        int c2 = (i + 1) % N;
        if (c1 > c2) swap(c1, c2);
        cout << c1 << " " << c2 << "\\n";
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int Q = sc.nextInt();

        for (int q = 0; q < Q; q++) {
            int i = sc.nextInt();
            int c1 = i;
            int c2 = (i + 1) % N;
            if (c1 > c2) {
                int tmp = c1; c1 = c2; c2 = tmp;
            }
            System.out.println(c1 + " " + c2);
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    N, Q = int(lines[0]), int(lines[1])
    idx = 2

    for _ in range(Q):
        i = int(lines[idx])
        idx += 1
        c1 = i
        c2 = (i + 1) % N
        if c1 > c2:
            c1, c2 = c2, c1
        print(f"{c1} {c2}")

if __name__ == '__main__':
    main()
`
    }
  }
];

const content = `import { PracticalChallenge } from '../types';

/**
 * Placement Readiness Program
 * Mentor: Kapil | Day 15: Real-World Technical Interview Simulation, Machine Coding & Comprehensive Placement Grand Finale
 * 10 Production-Grade Coding Challenges (C, C++, Java, Python)
 */
export const DAY_15_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = ${JSON.stringify(challenges, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/day15Challenges10.ts'), content, 'utf8');
console.log('Successfully wrote src/data/day15Challenges10.ts');
