import { PracticalChallenge } from '../types';

/**
 * Placement Readiness Program
 * Mentor: Kapil | Day 15: Real-World Technical Interview Simulation, Machine Coding & Comprehensive Placement Grand Finale
 * 10 Production-Grade Coding Challenges (C, C++, Java, Python)
 */
export const DAY_15_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  {
    "id": "d15-ch-1",
    "day": 15,
    "title": "Multi-Level Parking Lot Machine Coding (LLD)",
    "difficulty": "Hard",
    "moduleTag": "16. Machine Coding & Concurrency",
    "companies": [
      "Google",
      "Amazon",
      "Uber",
      "Atlassian"
    ],
    "platforms": [
      "Machine Coding Lab"
    ],
    "problemStatement": "Design a multi-level parking lot with F floors and S spots per floor. Spot sizes cycle: spot 0 is Compact (bikes only), spot 1 is Regular (bikes, cars), spot 2 is Large (bikes, cars, trucks). Given vehicle arrivals (0=Bike, 1=Car, 2=Truck) and durations in hours, allocate the first available spot on the lowest floor and calculate fees (Bike=$10/hr, Car=$20/hr, Truck=$30/hr). Output allocated spot `(floor*1000 + spot)` and total fee.",
    "inputFormat": "First line: F S Q (floors, spots per floor, queries).\nNext Q lines: vehicle_type duration_hours",
    "outputFormat": "For each query, output allocated spot ID and fee separated by space (or `-1 0` if lot full).",
    "constraints": [
      "1 <= F <= 10",
      "1 <= S <= 100",
      "1 <= Q <= 1000",
      "0 <= vehicle_type <= 2",
      "1 <= duration <= 24"
    ],
    "sampleInput": "2 3 3\n0 2\n1 3\n2 1",
    "sampleOutput": "1000 20\n1001 60\n1002 30",
    "kapilIntuition": "Mentorship By Kapil: In 90-minute machine coding rounds, model eligibility clearly. Bikes fit any spot; Cars fit Regular and Large; Trucks fit Large only. Search lowest floor first, record occupancy, and calculate fees deterministically.",
    "timeComplexity": "O(F * S) per parking search",
    "spaceComplexity": "O(F * S)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "2 3 3\n0 2\n1 3\n2 1",
        "expectedOutput": "1000 20\n1001 60\n1002 30",
        "isHidden": false,
        "explanation": "Bike takes 1000, car takes 1001, truck takes 1002."
      },
      {
        "id": "tc-2",
        "input": "1 2 2\n2 5\n2 4",
        "expectedOutput": "-1 0\n-1 0",
        "isHidden": false,
        "explanation": "Only spot 0 (compact) and 1 (regular) exist, no large spots for trucks."
      },
      {
        "id": "tc-3",
        "input": "2 6 2\n1 4\n0 1",
        "expectedOutput": "1001 80\n1000 10",
        "isHidden": true,
        "explanation": "Car takes 1001, bike takes 1000."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int F, S, Q;\n    if (scanf(\"%d %d %d\", &F, &S, &Q) != 3) return 0;\n    // Implement Multi-Level Parking Lot allocation\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int F, S, Q;\n    if (!(cin >> F >> S >> Q)) return 0;\n    // Implement Multi-Level Parking Lot allocation\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int F = sc.nextInt();\n        int S = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement Multi-Level Parking Lot allocation\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    F, S, Q = int(lines[0]), int(lines[1]), int(lines[2])\n    # Implement Multi-Level Parking Lot allocation\n\nif __name__ == '__main__':\n    main()\n"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\nint occupied[12][105];\n\nint main() {\n    int F, S, Q;\n    if (scanf(\"%d %d %d\", &F, &S, &Q) != 3) return 0;\n\n    int rates[] = {10, 20, 30};\n\n    for (int q = 0; q < Q; ++q) {\n        int vtype, hours;\n        scanf(\"%d %d\", &vtype, &hours);\n        int assigned_floor = -1, assigned_spot = -1;\n\n        for (int f = 0; f < F; ++f) {\n            for (int s = 0; s < S; ++s) {\n                int st = s % 3; // 0: compact, 1: regular, 2: large\n                if (!occupied[f][s]) {\n                    if ((vtype == 0) || (vtype == 1 && st >= 1) || (vtype == 2 && st == 2)) {\n                        occupied[f][s] = 1;\n                        assigned_floor = f + 1;\n                        assigned_spot = s;\n                        break;\n                    }\n                }\n            }\n            if (assigned_floor != -1) break;\n        }\n\n        if (assigned_floor != -1) {\n            int ticket = assigned_floor * 1000 + assigned_spot;\n            int fee = rates[vtype] * hours;\n            printf(\"%d %d\\n\", ticket, fee);\n        } else {\n            printf(\"-1 0\\n\");\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int F, S, Q;\n    if (!(cin >> F >> S >> Q)) return 0;\n\n    vector<vector<bool>> occupied(F, vector<bool>(S, false));\n    int rates[] = {10, 20, 30};\n\n    while (Q--) {\n        int vtype, hours;\n        cin >> vtype >> hours;\n        int assigned_floor = -1, assigned_spot = -1;\n\n        for (int f = 0; f < F; ++f) {\n            for (int s = 0; s < S; ++s) {\n                int st = s % 3;\n                if (!occupied[f][s]) {\n                    if (vtype == 0 || (vtype == 1 && st >= 1) || (vtype == 2 && st == 2)) {\n                        occupied[f][s] = true;\n                        assigned_floor = f + 1;\n                        assigned_spot = s;\n                        break;\n                    }\n                }\n            }\n            if (assigned_floor != -1) break;\n        }\n\n        if (assigned_floor != -1) {\n            int ticket = assigned_floor * 1000 + assigned_spot;\n            int fee = rates[vtype] * hours;\n            cout << ticket << \" \" << fee << \"\\n\";\n        } else {\n            cout << \"-1 0\\n\";\n        }\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int F = sc.nextInt();\n        int S = sc.nextInt();\n        int Q = sc.nextInt();\n\n        boolean[][] occupied = new boolean[F][S];\n        int[] rates = {10, 20, 30};\n\n        for (int q = 0; q < Q; q++) {\n            int vtype = sc.nextInt();\n            int hours = sc.nextInt();\n            int assignedFloor = -1;\n            int assignedSpot = -1;\n\n            for (int f = 0; f < F; f++) {\n                for (int s = 0; s < S; s++) {\n                    int st = s % 3;\n                    if (!occupied[f][s]) {\n                        if (vtype == 0 || (vtype == 1 && st >= 1) || (vtype == 2 && st == 2)) {\n                            occupied[f][s] = true;\n                            assignedFloor = f + 1;\n                            assignedSpot = s;\n                            break;\n                        }\n                    }\n                }\n                if (assignedFloor != -1) break;\n            }\n\n            if (assignedFloor != -1) {\n                int ticket = assignedFloor * 1000 + assignedSpot;\n                int fee = rates[vtype] * hours;\n                System.out.println(ticket + \" \" + fee);\n            } else {\n                System.out.println(\"-1 0\");\n            }\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    F, S, Q = int(input_data[0]), int(input_data[1]), int(input_data[2])\n    idx = 3\n\n    occupied = [[False] * S for _ in range(F)]\n    rates = [10, 20, 30]\n\n    for _ in range(Q):\n        vtype = int(input_data[idx])\n        hours = int(input_data[idx + 1])\n        idx += 2\n\n        assigned_floor = -1\n        assigned_spot = -1\n\n        for f in range(F):\n            for s in range(S):\n                st = s % 3\n                if not occupied[f][s]:\n                    if vtype == 0 or (vtype == 1 and st >= 1) or (vtype == 2 and st == 2):\n                        occupied[f][s] = True\n                        assigned_floor = f + 1\n                        assigned_spot = s\n                        break\n            if assigned_floor != -1:\n                break\n\n        if assigned_floor != -1:\n            ticket = assigned_floor * 1000 + assigned_spot\n            fee = rates[vtype] * hours\n            print(f\"{ticket} {fee}\")\n        else:\n            print(\"-1 0\")\n\nif __name__ == '__main__':\n    main()\n"
    }
  },
  {
    "id": "d15-ch-2",
    "day": 15,
    "title": "Thread-Safe In-Memory Key-Value Store with TTL",
    "difficulty": "Medium",
    "moduleTag": "16. Machine Coding & Concurrency",
    "companies": [
      "Redis",
      "Amazon",
      "Stripe",
      "Google"
    ],
    "platforms": [
      "System Implementation Lab"
    ],
    "problemStatement": "Implement an in-memory key-value store with time-to-live (TTL) expiration. Support operations:\n- `SET key val ttl_ms timestamp`: inserts key with expiration `timestamp + ttl_ms`.\n- `GET key timestamp`: returns value if `timestamp <= expiry`, otherwise returns `NULL` and evicts key.",
    "inputFormat": "First line: Q (queries count).\nNext Q lines: `SET key val ttl timestamp` or `GET key timestamp`",
    "outputFormat": "For each GET operation, print the stored value or `NULL`.",
    "constraints": [
      "1 <= Q <= 1000",
      "1 <= key, val length <= 32",
      "1 <= ttl, timestamp <= 10^9"
    ],
    "sampleInput": "4\nSET session abc 500 1000\nGET session 1200\nGET session 1600\nGET unknown 2000",
    "sampleOutput": "abc\nNULL\nNULL",
    "kapilIntuition": "Mentorship By Kapil: Passive/lazy eviction checks timestamps on each GET query. If `query_time > entry.expiry`, erase from map and return NULL. This provides O(1) average time without requiring background reaper threads.",
    "timeComplexity": "O(1) average per operation",
    "spaceComplexity": "O(N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "4\nSET session abc 500 1000\nGET session 1200\nGET session 1600\nGET unknown 2000",
        "expectedOutput": "abc\nNULL\nNULL",
        "isHidden": false,
        "explanation": "1200 <= 1500 returns abc, 1600 > 1500 returns NULL."
      },
      {
        "id": "tc-2",
        "input": "3\nSET k1 v1 100 50\nGET k1 100\nGET k1 151",
        "expectedOutput": "v1\nNULL",
        "isHidden": false,
        "explanation": "100 <= 150 returns v1, 151 expires."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int Q;\n    if (scanf(\"%d\", &Q) != 1) return 0;\n    // Implement Expiring KV Store\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int Q;\n    if (!(cin >> Q)) return 0;\n    // Implement Expiring KV Store\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int Q = sc.nextInt();\n        // Implement Expiring KV Store\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement Expiring KV Store\n\nif __name__ == '__main__':\n    main()\n"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char key[32];\n    char val[32];\n    long long expiry;\n    int active;\n} KVEntry;\n\nKVEntry store[1005];\nint entry_count = 0;\n\nint main() {\n    int Q;\n    if (scanf(\"%d\", &Q) != 1) return 0;\n\n    for (int q = 0; q < Q; ++q) {\n        char op[10];\n        scanf(\"%s\", op);\n        if (strcmp(op, \"SET\") == 0) {\n            char k[32], v[32];\n            long long ttl, now_ts;\n            scanf(\"%s %s %lld %lld\", k, v, &ttl, &now_ts);\n            int found = 0;\n            for (int i = 0; i < entry_count; ++i) {\n                if (store[i].active && strcmp(store[i].key, k) == 0) {\n                    strncpy(store[i].val, v, 31);\n                    store[i].expiry = now_ts + ttl;\n                    found = 1;\n                    break;\n                }\n            }\n            if (!found) {\n                strncpy(store[entry_count].key, k, 31);\n                strncpy(store[entry_count].val, v, 31);\n                store[entry_count].expiry = now_ts + ttl;\n                store[entry_count].active = 1;\n                entry_count++;\n            }\n        } else if (strcmp(op, \"GET\") == 0) {\n            char k[32];\n            long long now_ts;\n            scanf(\"%s %lld\", k, &now_ts);\n            int found = 0;\n            for (int i = 0; i < entry_count; ++i) {\n                if (store[i].active && strcmp(store[i].key, k) == 0) {\n                    if (now_ts <= store[i].expiry) {\n                        printf(\"%s\\n\", store[i].val);\n                    } else {\n                        store[i].active = 0; // lazy eviction\n                        printf(\"NULL\\n\");\n                    }\n                    found = 1;\n                    break;\n                }\n            }\n            if (!found) {\n                printf(\"NULL\\n\");\n            }\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n#include <unordered_map>\n\nusing namespace std;\n\nstruct Entry {\n    string value;\n    long long expiry;\n};\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int Q;\n    if (!(cin >> Q)) return 0;\n\n    unordered_map<string, Entry> store;\n\n    while (Q--) {\n        string op;\n        cin >> op;\n        if (op == \"SET\") {\n            string k, v;\n            long long ttl, now_ts;\n            cin >> k >> v >> ttl >> now_ts;\n            store[k] = {v, now_ts + ttl};\n        } else if (op == \"GET\") {\n            string k;\n            long long now_ts;\n            cin >> k >> now_ts;\n            auto it = store.find(k);\n            if (it == store.end()) {\n                cout << \"NULL\\n\";\n            } else {\n                if (now_ts <= it->second.expiry) {\n                    cout << it->second.value << \"\\n\";\n                } else {\n                    store.erase(it);\n                    cout << \"NULL\\n\";\n                }\n            }\n        }\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Solution {\n    static class Entry {\n        String val;\n        long expiry;\n        Entry(String val, long expiry) { this.val = val; this.expiry = expiry; }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int Q = sc.nextInt();\n\n        Map<String, Entry> store = new HashMap<>();\n\n        for (int q = 0; q < Q; q++) {\n            String op = sc.next();\n            if (\"SET\".equals(op)) {\n                String k = sc.next();\n                String v = sc.next();\n                long ttl = sc.nextLong();\n                long now = sc.nextLong();\n                store.put(k, new Entry(v, now + ttl));\n            } else if (\"GET\".equals(op)) {\n                String k = sc.next();\n                long now = sc.nextLong();\n                Entry e = store.get(k);\n                if (e == null) {\n                    System.out.println(\"NULL\");\n                } else {\n                    if (now <= e.expiry) {\n                        System.out.println(e.val);\n                    } else {\n                        store.remove(k);\n                        System.out.println(\"NULL\");\n                    }\n                }\n            }\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    Q = int(lines[0])\n    idx = 1\n\n    store = {}\n\n    for _ in range(Q):\n        op = lines[idx]\n        if op == \"SET\":\n            k, v = lines[idx + 1], lines[idx + 2]\n            ttl = int(lines[idx + 3])\n            now_ts = int(lines[idx + 4])\n            store[k] = (v, now_ts + ttl)\n            idx += 5\n        elif op == \"GET\":\n            k = lines[idx + 1]\n            now_ts = int(lines[idx + 2])\n            idx += 3\n            if k in store:\n                val, expiry = store[k]\n                if now_ts <= expiry:\n                    print(val)\n                else:\n                    del store[k]\n                    print(\"NULL\")\n            else:\n                print(\"NULL\")\n\nif __name__ == '__main__':\n    main()\n"
    }
  },
  {
    "id": "d15-ch-3",
    "day": 15,
    "title": "Bounded Blocking Queue Simulator (Producer-Consumer)",
    "difficulty": "Medium",
    "moduleTag": "16. Machine Coding & Concurrency",
    "companies": [
      "Uber",
      "Microsoft",
      "Google",
      "Meta"
    ],
    "platforms": [
      "Concurrency Lab"
    ],
    "problemStatement": "Simulate a circular bounded queue of capacity C. Support:\n- `PUSH x`: If size < C, enqueues x and outputs `OK`. If full, outputs `BLOCKED`.\n- `POP`: If size > 0, dequeues head and outputs value. If empty, outputs `EMPTY`.",
    "inputFormat": "First line: C Q (capacity and queries).\nNext Q lines: `PUSH x` or `POP`",
    "outputFormat": "For each operation, output the result on a new line.",
    "constraints": [
      "1 <= C <= 100",
      "1 <= Q <= 1000",
      "1 <= x <= 10^5"
    ],
    "sampleInput": "2 5\nPUSH 10\nPUSH 20\nPUSH 30\nPOP\nPOP",
    "sampleOutput": "OK\nOK\nBLOCKED\n10\n20",
    "kapilIntuition": "Mentorship By Kapil: Model circular buffer indexing with `head`, `tail`, and `count`. On full condition, production systems block on a Condition Variable; in this simulator, return `BLOCKED`.",
    "timeComplexity": "O(1) per operation",
    "spaceComplexity": "O(C)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "2 5\nPUSH 10\nPUSH 20\nPUSH 30\nPOP\nPOP",
        "expectedOutput": "OK\nOK\nBLOCKED\n10\n20",
        "isHidden": false,
        "explanation": "Queue fills to 2, 30 is blocked, pops yield 10 and 20."
      },
      {
        "id": "tc-2",
        "input": "1 3\nPOP\nPUSH 99\nPOP",
        "expectedOutput": "EMPTY\nOK\n99",
        "isHidden": false,
        "explanation": "Pop on empty returns EMPTY."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int C, Q;\n    if (scanf(\"%d %d\", &C, &Q) != 2) return 0;\n    // Implement Bounded Queue\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int C, Q;\n    if (!(cin >> C >> Q)) return 0;\n    // Implement Bounded Queue\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int C = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement Bounded Queue\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement Bounded Queue\n\nif __name__ == '__main__':\n    main()\n"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nint buf[105];\nint head = 0, tail = 0, count = 0;\n\nint main() {\n    int C, Q;\n    if (scanf(\"%d %d\", &C, &Q) != 2) return 0;\n\n    for (int q = 0; q < Q; ++q) {\n        char op[10];\n        scanf(\"%s\", op);\n        if (strcmp(op, \"PUSH\") == 0) {\n            int x;\n            scanf(\"%d\", &x);\n            if (count < C) {\n                buf[tail] = x;\n                tail = (tail + 1) % C;\n                count++;\n                printf(\"OK\\n\");\n            } else {\n                printf(\"BLOCKED\\n\");\n            }\n        } else if (strcmp(op, \"POP\") == 0) {\n            if (count > 0) {\n                int val = buf[head];\n                head = (head + 1) % C;\n                count--;\n                printf(\"%d\\n\", val);\n            } else {\n                printf(\"EMPTY\\n\");\n            }\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int C, Q;\n    if (!(cin >> C >> Q)) return 0;\n\n    vector<int> buf(C);\n    int head = 0, tail = 0, count = 0;\n\n    while (Q--) {\n        string op;\n        cin >> op;\n        if (op == \"PUSH\") {\n            int x;\n            cin >> x;\n            if (count < C) {\n                buf[tail] = x;\n                tail = (tail + 1) % C;\n                count++;\n                cout << \"OK\\n\";\n            } else {\n                cout << \"BLOCKED\\n\";\n            }\n        } else if (op == \"POP\") {\n            if (count > 0) {\n                int val = buf[head];\n                head = (head + 1) % C;\n                count--;\n                cout << val << \"\\n\";\n            } else {\n                cout << \"EMPTY\\n\";\n            }\n        }\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int C = sc.nextInt();\n        int Q = sc.nextInt();\n\n        int[] buf = new int[C];\n        int head = 0, tail = 0, count = 0;\n\n        for (int q = 0; q < Q; q++) {\n            String op = sc.next();\n            if (\"PUSH\".equals(op)) {\n                int x = sc.nextInt();\n                if (count < C) {\n                    buf[tail] = x;\n                    tail = (tail + 1) % C;\n                    count++;\n                    System.out.println(\"OK\");\n                } else {\n                    System.out.println(\"BLOCKED\");\n                }\n            } else if (\"POP\".equals(op)) {\n                if (count > 0) {\n                    int val = buf[head];\n                    head = (head + 1) % C;\n                    count--;\n                    System.out.println(val);\n                } else {\n                    System.out.println(\"EMPTY\");\n                }\n            }\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    C, Q = int(lines[0]), int(lines[1])\n    idx = 2\n\n    buf = [0] * C\n    head = 0\n    tail = 0\n    count = 0\n\n    for _ in range(Q):\n        op = lines[idx]\n        if op == \"PUSH\":\n            x = int(lines[idx + 1])\n            idx += 2\n            if count < C:\n                buf[tail] = x\n                tail = (tail + 1) % C\n                count += 1\n                print(\"OK\")\n            else:\n                print(\"BLOCKED\")\n        elif op == \"POP\":\n            idx += 1\n            if count > 0:\n                val = buf[head]\n                head = (head + 1) % C\n                count -= 1\n                print(val)\n            else:\n                print(\"EMPTY\")\n\nif __name__ == '__main__':\n    main()\n"
    }
  },
  {
    "id": "d15-ch-4",
    "day": 15,
    "title": "LRU Cache with O(1) Eviction",
    "difficulty": "Hard",
    "moduleTag": "16. Machine Coding & Concurrency",
    "companies": [
      "Google",
      "Meta",
      "Amazon",
      "Apple"
    ],
    "platforms": [
      "LeetCode 146",
      "HackerRank"
    ],
    "problemStatement": "Implement an LRU Cache with capacity C. Support:\n- `PUT key val`: Updates or inserts key. If over capacity, evicts least recently used key.\n- `GET key`: Returns value and promotes key to most recently used. If missing, returns -1.",
    "inputFormat": "First line: C Q (capacity, queries count).\nNext Q lines: `PUT key val` or `GET key`",
    "outputFormat": "For each GET operation, output the integer value or -1.",
    "constraints": [
      "1 <= C <= 1000",
      "1 <= Q <= 2000",
      "0 <= key, val <= 10^5"
    ],
    "sampleInput": "2 6\nPUT 1 10\nPUT 2 20\nGET 1\nPUT 3 30\nGET 2\nGET 3",
    "sampleOutput": "10\n-1\n30",
    "kapilIntuition": "Mentorship By Kapil: Combine a Hash Map with a Doubly Linked List with sentinel head and tail dummy nodes. On GET or PUT update, splice the node to head. On eviction, remove node right before tail. All operations execute strictly in O(1).",
    "timeComplexity": "O(1) per operation",
    "spaceComplexity": "O(C)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "2 6\nPUT 1 10\nPUT 2 20\nGET 1\nPUT 3 30\nGET 2\nGET 3",
        "expectedOutput": "10\n-1\n30",
        "isHidden": false,
        "explanation": "Key 2 is evicted when key 3 is added after key 1 is promoted."
      },
      {
        "id": "tc-2",
        "input": "1 3\nPUT 5 50\nGET 5\nGET 6",
        "expectedOutput": "50\n-1",
        "isHidden": false,
        "explanation": "Single capacity cache test."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int C, Q;\n    if (scanf(\"%d %d\", &C, &Q) != 2) return 0;\n    // Implement LRU Cache\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int C, Q;\n    if (!(cin >> C >> Q)) return 0;\n    // Implement LRU Cache\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int C = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement LRU Cache\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement LRU Cache\n\nif __name__ == '__main__':\n    main()\n"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct Node {\n    int key, val;\n    struct Node* prev;\n    struct Node* next;\n} Node;\n\nNode* head;\nNode* tail;\nNode* map_table[100005];\nint cur_size = 0, max_cap = 0;\n\nvoid remove_node(Node* n) {\n    n->prev->next = n->next;\n    n->next->prev = n->prev;\n}\n\nvoid add_to_head(Node* n) {\n    n->next = head->next;\n    n->prev = head;\n    head->next->prev = n;\n    head->next = n;\n}\n\nint main() {\n    int C, Q;\n    if (scanf(\"%d %d\", &C, &Q) != 2) return 0;\n    max_cap = C;\n\n    head = (Node*)malloc(sizeof(Node));\n    tail = (Node*)malloc(sizeof(Node));\n    head->next = tail;\n    tail->prev = head;\n\n    for (int q = 0; q < Q; ++q) {\n        char op[10];\n        scanf(\"%s\", op);\n        if (strcmp(op, \"PUT\") == 0) {\n            int k, v;\n            scanf(\"%d %d\", &k, &v);\n            if (map_table[k]) {\n                Node* n = map_table[k];\n                n->val = v;\n                remove_node(n);\n                add_to_head(n);\n            } else {\n                if (cur_size == max_cap) {\n                    Node* lru = tail->prev;\n                    map_table[lru->key] = NULL;\n                    remove_node(lru);\n                    free(lru);\n                    cur_size--;\n                }\n                Node* n = (Node*)malloc(sizeof(Node));\n                n->key = k; n->val = v;\n                map_table[k] = n;\n                add_to_head(n);\n                cur_size++;\n            }\n        } else if (strcmp(op, \"GET\") == 0) {\n            int k;\n            scanf(\"%d\", &k);\n            if (map_table[k]) {\n                Node* n = map_table[k];\n                remove_node(n);\n                add_to_head(n);\n                printf(\"%d\\n\", n->val);\n            } else {\n                printf(\"-1\\n\");\n            }\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <unordered_map>\n#include <list>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int C, Q;\n    if (!(cin >> C >> Q)) return 0;\n\n    list<pair<int, int>> dll;\n    unordered_map<int, list<pair<int, int>>::iterator> cache;\n\n    while (Q--) {\n        string op;\n        cin >> op;\n        if (op == \"PUT\") {\n            int k, v;\n            cin >> k >> v;\n            auto it = cache.find(k);\n            if (it != cache.end()) {\n                it->second->second = v;\n                dll.splice(dll.begin(), dll, it->second);\n            } else {\n                if ((int)dll.size() >= C) {\n                    int oldKey = dll.back().first;\n                    dll.pop_back();\n                    cache.erase(oldKey);\n                }\n                dll.emplace_front(k, v);\n                cache[k] = dll.begin();\n            }\n        } else if (op == \"GET\") {\n            int k;\n            cin >> k;\n            auto it = cache.find(k);\n            if (it != cache.end()) {\n                dll.splice(dll.begin(), dll, it->second);\n                cout << it->second->second << \"\\n\";\n            } else {\n                cout << \"-1\\n\";\n            }\n        }\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.LinkedHashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int C = sc.nextInt();\n        int Q = sc.nextInt();\n\n        Map<Integer, Integer> map = new LinkedHashMap<>(C, 0.75f, true) {\n            @Override\n            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {\n                return size() > C;\n            }\n        };\n\n        for (int q = 0; q < Q; q++) {\n            String op = sc.next();\n            if (\"PUT\".equals(op)) {\n                int k = sc.nextInt();\n                int v = sc.nextInt();\n                map.put(k, v);\n            } else if (\"GET\".equals(op)) {\n                int k = sc.nextInt();\n                System.out.println(map.getOrDefault(k, -1));\n            }\n        }\n    }\n}",
      "python": "import sys\nfrom collections import OrderedDict\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    C, Q = int(lines[0]), int(lines[1])\n    idx = 2\n\n    cache = OrderedDict()\n\n    for _ in range(Q):\n        op = lines[idx]\n        if op == \"PUT\":\n            k = int(lines[idx + 1])\n            v = int(lines[idx + 2])\n            idx += 3\n            if k in cache:\n                cache.move_to_end(k)\n            elif len(cache) >= C:\n                cache.popitem(last=False)\n            cache[k] = v\n        elif op == \"GET\":\n            k = int(lines[idx + 1])\n            idx += 2\n            if k in cache:\n                cache.move_to_end(k)\n                print(cache[k])\n            else:\n                print(-1)\n\nif __name__ == '__main__':\n    main()\n"
    }
  },
  {
    "id": "d15-ch-5",
    "day": 15,
    "title": "Distributed Fencing Token Storage Gate",
    "difficulty": "Medium",
    "moduleTag": "16. Machine Coding & Concurrency",
    "companies": [
      "Google",
      "AWS",
      "Databricks"
    ],
    "platforms": [
      "Distributed Systems Lab"
    ],
    "problemStatement": "Simulate a distributed storage gate guarded by monotonic Fencing Tokens. The storage gate tracks the highest committed token (watermark). When a write `WRITE token key val` arrives, if `token > watermark`, the write is ACCEPTED, watermark is updated to `token`, and the value is stored. If `token <= watermark`, the write is REJECTED (stale client write hazard blocked). Also support `READ key`.",
    "inputFormat": "First line: Q (queries count).\nNext Q lines: `WRITE token key val` or `READ key`",
    "outputFormat": "For WRITE, print `ACCEPTED` or `REJECTED`. For READ, print stored value or `NONE`.",
    "constraints": [
      "1 <= Q <= 1000",
      "1 <= token <= 10^9",
      "1 <= key, val length <= 32"
    ],
    "sampleInput": "4\nWRITE 102 order:1 paid\nWRITE 101 order:1 cancelled\nREAD order:1\nWRITE 105 order:1 refunded",
    "sampleOutput": "ACCEPTED\nREJECTED\npaid\nACCEPTED",
    "kapilIntuition": "Mentorship By Kapil: Fencing tokens solve Martin Kleppmann's famous distributed locking critique. By ensuring storage only accepts writes with monotonically strictly greater tokens, stale zombie clients (delayed by GC or network pauses) cannot corrupt committed state.",
    "timeComplexity": "O(1) per operation",
    "spaceComplexity": "O(N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "4\nWRITE 102 order:1 paid\nWRITE 101 order:1 cancelled\nREAD order:1\nWRITE 105 order:1 refunded",
        "expectedOutput": "ACCEPTED\nREJECTED\npaid\nACCEPTED",
        "isHidden": false,
        "explanation": "Token 101 <= 102 is rejected."
      },
      {
        "id": "tc-2",
        "input": "3\nWRITE 10 k v\nWRITE 10 k v2\nREAD k",
        "expectedOutput": "ACCEPTED\nREJECTED\nv",
        "isHidden": false,
        "explanation": "Equal token is rejected."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int Q;\n    if (scanf(\"%d\", &Q) != 1) return 0;\n    // Implement Fencing Storage Gate\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int Q;\n    if (!(cin >> Q)) return 0;\n    // Implement Fencing Storage Gate\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int Q = sc.nextInt();\n        // Implement Fencing Storage Gate\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement Fencing Storage Gate\n\nif __name__ == '__main__':\n    main()\n"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char key[32];\n    char val[32];\n    int active;\n} GateEntry;\n\nGateEntry gate[1005];\nint gate_count = 0;\nlong long watermark = 0;\n\nint main() {\n    int Q;\n    if (scanf(\"%d\", &Q) != 1) return 0;\n\n    for (int q = 0; q < Q; ++q) {\n        char op[10];\n        scanf(\"%s\", op);\n        if (strcmp(op, \"WRITE\") == 0) {\n            long long tok;\n            char k[32], v[32];\n            scanf(\"%lld %s %s\", &tok, k, v);\n            if (tok > watermark) {\n                watermark = tok;\n                int found = 0;\n                for (int i = 0; i < gate_count; ++i) {\n                    if (gate[i].active && strcmp(gate[i].key, k) == 0) {\n                        strncpy(gate[i].val, v, 31);\n                        found = 1;\n                        break;\n                    }\n                }\n                if (!found) {\n                    strncpy(gate[gate_count].key, k, 31);\n                    strncpy(gate[gate_count].val, v, 31);\n                    gate[gate_count].active = 1;\n                    gate_count++;\n                }\n                printf(\"ACCEPTED\\n\");\n            } else {\n                printf(\"REJECTED\\n\");\n            }\n        } else if (strcmp(op, \"READ\") == 0) {\n            char k[32];\n            scanf(\"%s\", k);\n            int found = 0;\n            for (int i = 0; i < gate_count; ++i) {\n                if (gate[i].active && strcmp(gate[i].key, k) == 0) {\n                    printf(\"%s\\n\", gate[i].val);\n                    found = 1;\n                    break;\n                }\n            }\n            if (!found) {\n                printf(\"NONE\\n\");\n            }\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n#include <unordered_map>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int Q;\n    if (!(cin >> Q)) return 0;\n\n    unordered_map<string, string> store;\n    long long watermark = 0;\n\n    while (Q--) {\n        string op;\n        cin >> op;\n        if (op == \"WRITE\") {\n            long long tok;\n            string k, v;\n            cin >> tok >> k >> v;\n            if (tok > watermark) {\n                watermark = tok;\n                store[k] = v;\n                cout << \"ACCEPTED\\n\";\n            } else {\n                cout << \"REJECTED\\n\";\n            }\n        } else if (op == \"READ\") {\n            string k;\n            cin >> k;\n            auto it = store.find(k);\n            if (it != store.end()) {\n                cout << it->second << \"\\n\";\n            } else {\n                cout << \"NONE\\n\";\n            }\n        }\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int Q = sc.nextInt();\n\n        Map<String, String> store = new HashMap<>();\n        long watermark = 0;\n\n        for (int q = 0; q < Q; q++) {\n            String op = sc.next();\n            if (\"WRITE\".equals(op)) {\n                long tok = sc.nextLong();\n                String k = sc.next();\n                String v = sc.next();\n                if (tok > watermark) {\n                    watermark = tok;\n                    store.put(k, v);\n                    System.out.println(\"ACCEPTED\");\n                } else {\n                    System.out.println(\"REJECTED\");\n                }\n            } else if (\"READ\".equals(op)) {\n                String k = sc.next();\n                System.out.println(store.getOrDefault(k, \"NONE\"));\n            }\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    Q = int(lines[0])\n    idx = 1\n\n    store = {}\n    watermark = 0\n\n    for _ in range(Q):\n        op = lines[idx]\n        if op == \"WRITE\":\n            tok = int(lines[idx + 1])\n            k = lines[idx + 2]\n            v = lines[idx + 3]\n            idx += 4\n            if tok > watermark:\n                watermark = tok\n                store[k] = v\n                print(\"ACCEPTED\")\n            else:\n                print(\"REJECTED\")\n        elif op == \"READ\":\n            k = lines[idx + 1]\n            idx += 2\n            print(store.get(k, \"NONE\"))\n\nif __name__ == '__main__':\n    main()\n"
    }
  },
  {
    "id": "d15-ch-6",
    "day": 15,
    "title": "Two-Phase Commit (2PC) Consensus Simulator",
    "difficulty": "Medium",
    "moduleTag": "16. Machine Coding & Concurrency",
    "companies": [
      "Oracle",
      "Google",
      "Amazon",
      "Salesforce"
    ],
    "platforms": [
      "Distributed Transactions Lab"
    ],
    "problemStatement": "Given N database nodes preparing for a distributed transaction, each node votes 1 (PREPARED) or 0 (ABORT). If all N nodes vote 1, coordinator outputs `GLOBAL_COMMIT`. If even a single node votes 0, coordinator outputs `GLOBAL_ABORT`. Given T transaction batches, output the decision for each.",
    "inputFormat": "First line: T (number of transactions).\nNext T lines: N followed by N binary votes (0 or 1)",
    "outputFormat": "For each transaction, output `GLOBAL_COMMIT` or `GLOBAL_ABORT`.",
    "constraints": [
      "1 <= T <= 500",
      "2 <= N <= 100",
      "votes[i] is 0 or 1"
    ],
    "sampleInput": "3\n3 1 1 1\n3 1 0 1\n4 0 0 0 0",
    "sampleOutput": "GLOBAL_COMMIT\nGLOBAL_ABORT\nGLOBAL_ABORT",
    "kapilIntuition": "Mentorship By Kapil: 2PC mandates unanimous consensus during Phase 1. An abort by any single participant or network timeout aborts the entire distributed transaction, demonstrating strict atomicity at the cost of availability.",
    "timeComplexity": "O(N) per transaction",
    "spaceComplexity": "O(1)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "3\n3 1 1 1\n3 1 0 1\n4 0 0 0 0",
        "expectedOutput": "GLOBAL_COMMIT\nGLOBAL_ABORT\nGLOBAL_ABORT",
        "isHidden": false,
        "explanation": "All 1s commit, any 0 aborts."
      },
      {
        "id": "tc-2",
        "input": "1\n2 1 1",
        "expectedOutput": "GLOBAL_COMMIT",
        "isHidden": false,
        "explanation": "2-node unanimous commit."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int T;\n    if (scanf(\"%d\", &T) != 1) return 0;\n    // Implement 2PC\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int T;\n    if (!(cin >> T)) return 0;\n    // Implement 2PC\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int T = sc.nextInt();\n        // Implement 2PC\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement 2PC\n\nif __name__ == '__main__':\n    main()\n"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int T;\n    if (scanf(\"%d\", &T) != 1) return 0;\n    while (T--) {\n        int N;\n        scanf(\"%d\", &N);\n        int all_ok = 1;\n        for (int i = 0; i < N; ++i) {\n            int v;\n            scanf(\"%d\", &v);\n            if (v == 0) all_ok = 0;\n        }\n        if (all_ok) printf(\"GLOBAL_COMMIT\\n\");\n        else printf(\"GLOBAL_ABORT\\n\");\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int T;\n    if (!(cin >> T)) return 0;\n    while (T--) {\n        int N;\n        cin >> N;\n        bool all_ok = true;\n        for (int i = 0; i < N; ++i) {\n            int v;\n            cin >> v;\n            if (v == 0) all_ok = false;\n        }\n        cout << (all_ok ? \"GLOBAL_COMMIT\" : \"GLOBAL_ABORT\") << \"\\n\";\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int T = sc.nextInt();\n        while (T-- > 0) {\n            int N = sc.nextInt();\n            boolean allOk = true;\n            for (int i = 0; i < N; i++) {\n                if (sc.nextInt() == 0) allOk = false;\n            }\n            System.out.println(allOk ? \"GLOBAL_COMMIT\" : \"GLOBAL_ABORT\");\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    T = int(lines[0])\n    idx = 1\n    for _ in range(T):\n        N = int(lines[idx])\n        idx += 1\n        all_ok = True\n        for _ in range(N):\n            if int(lines[idx]) == 0:\n                all_ok = False\n            idx += 1\n        print(\"GLOBAL_COMMIT\" if all_ok else \"GLOBAL_ABORT\")\n\nif __name__ == '__main__':\n    main()\n"
    }
  },
  {
    "id": "d15-ch-7",
    "day": 15,
    "title": "Resilient Saga Transaction Orchestrator with Rollback",
    "difficulty": "Hard",
    "moduleTag": "16. Machine Coding & Concurrency",
    "companies": [
      "Uber",
      "Stripe",
      "Netflix",
      "DoorDash"
    ],
    "platforms": [
      "Microservices Lab"
    ],
    "problemStatement": "Given a pipeline of S named microservice steps with execution statuses (1=SUCCESS, 0=FAIL). Steps execute sequentially. If any step fails, the orchestrator halts forward execution and triggers compensating rollbacks for all previously completed steps in strict reverse order. If all succeed, output `SAGA_COMMITTED`. If any fails, output rollback lines `COMPENSATE step_name` in reverse order followed by `SAGA_ROLLED_BACK`.",
    "inputFormat": "First line: S (number of steps).\nNext S lines: step_name status (1 or 0)",
    "outputFormat": "Output forward failure/compensation steps and final status `SAGA_COMMITTED` or `SAGA_ROLLED_BACK`.",
    "constraints": [
      "1 <= S <= 20",
      "1 <= step_name length <= 32"
    ],
    "sampleInput": "3\nPaymentGateway 1\nInventoryReserve 1\nShippingDispatch 0",
    "sampleOutput": "COMPENSATE InventoryReserve\nCOMPENSATE PaymentGateway\nSAGA_ROLLED_BACK",
    "kapilIntuition": "Mentorship By Kapil: Saga Orchestrator replaces blocking 2PC locks across microservices. Recording completed steps in a LIFO stack allows deterministic reverse compensation upon failure, ensuring eventual consistency.",
    "timeComplexity": "O(S)",
    "spaceComplexity": "O(S)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "3\nPaymentGateway 1\nInventoryReserve 1\nShippingDispatch 0",
        "expectedOutput": "COMPENSATE InventoryReserve\nCOMPENSATE PaymentGateway\nSAGA_ROLLED_BACK",
        "isHidden": false,
        "explanation": "Step 3 fails, steps 2 and 1 compensated in reverse."
      },
      {
        "id": "tc-2",
        "input": "2\nStepA 1\nStepB 1",
        "expectedOutput": "SAGA_COMMITTED",
        "isHidden": false,
        "explanation": "All steps pass."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int S;\n    if (scanf(\"%d\", &S) != 1) return 0;\n    // Implement Saga Orchestrator\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int S;\n    if (!(cin >> S)) return 0;\n    // Implement Saga Orchestrator\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int S = sc.nextInt();\n        // Implement Saga Orchestrator\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement Saga Orchestrator\n\nif __name__ == '__main__':\n    main()\n"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nchar completed[25][35];\nint completed_count = 0;\n\nint main() {\n    int S;\n    if (scanf(\"%d\", &S) != 1) return 0;\n\n    int failed = 0;\n    for (int i = 0; i < S; ++i) {\n        char name[35];\n        int status;\n        scanf(\"%s %d\", name, &status);\n        if (!failed) {\n            if (status == 1) {\n                strncpy(completed[completed_count++], name, 34);\n            } else {\n                failed = 1;\n            }\n        }\n    }\n\n    if (failed) {\n        for (int i = completed_count - 1; i >= 0; --i) {\n            printf(\"COMPENSATE %s\\n\", completed[i]);\n        }\n        printf(\"SAGA_ROLLED_BACK\\n\");\n    } else {\n        printf(\"SAGA_COMMITTED\\n\");\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int S;\n    if (!(cin >> S)) return 0;\n\n    vector<string> completed;\n    bool failed = false;\n\n    for (int i = 0; i < S; ++i) {\n        string name;\n        int status;\n        cin >> name >> status;\n        if (!failed) {\n            if (status == 1) {\n                completed.push_back(name);\n            } else {\n                failed = true;\n            }\n        }\n    }\n\n    if (failed) {\n        for (int i = (int)completed.size() - 1; i >= 0; --i) {\n            cout << \"COMPENSATE \" << completed[i] << \"\\n\";\n        }\n        cout << \"SAGA_ROLLED_BACK\\n\";\n    } else {\n        cout << \"SAGA_COMMITTED\\n\";\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int S = sc.nextInt();\n\n        List<String> completed = new ArrayList<>();\n        boolean failed = false;\n\n        for (int i = 0; i < S; i++) {\n            String name = sc.next();\n            int status = sc.nextInt();\n            if (!failed) {\n                if (status == 1) {\n                    completed.add(name);\n                } else {\n                    failed = true;\n                }\n            }\n        }\n\n        if (failed) {\n            for (int i = completed.size() - 1; i >= 0; i--) {\n                System.out.println(\"COMPENSATE \" + completed.get(i));\n            }\n            System.out.println(\"SAGA_ROLLED_BACK\");\n        } else {\n            System.out.println(\"SAGA_COMMITTED\");\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    S = int(lines[0])\n    idx = 1\n\n    completed = []\n    failed = False\n\n    for _ in range(S):\n        name = lines[idx]\n        status = int(lines[idx + 1])\n        idx += 2\n        if not failed:\n            if status == 1:\n                completed.append(name)\n            else:\n                failed = True\n\n    if failed:\n        for name in reversed(completed):\n            print(f\"COMPENSATE {name}\")\n        print(\"SAGA_ROLLED_BACK\")\n    else:\n        print(\"SAGA_COMMITTED\")\n\nif __name__ == '__main__':\n    main()\n"
    }
  },
  {
    "id": "d15-ch-8",
    "day": 15,
    "title": "Atomic Lock-Free Concurrent Stack (Treiber Stack CAS)",
    "difficulty": "Hard",
    "moduleTag": "16. Machine Coding & Concurrency",
    "companies": [
      "Apple",
      "Intel",
      "Google",
      "Meta"
    ],
    "platforms": [
      "Lock-Free Algorithms Lab"
    ],
    "problemStatement": "Simulate an atomic lock-free LIFO stack using CAS semantics. Support:\n- `PUSH x`: pushes x to top of stack, prints `PUSHED x`.\n- `POP`: pops top item and prints `POPPED x`. If stack is empty, prints `POPPED NONE`.",
    "inputFormat": "First line: Q (queries count).\nNext Q lines: `PUSH x` or `POP`",
    "outputFormat": "For each operation, output the result on a new line.",
    "constraints": [
      "1 <= Q <= 1000",
      "1 <= x <= 10^5"
    ],
    "sampleInput": "4\nPUSH 42\nPUSH 99\nPOP\nPOP",
    "sampleOutput": "PUSHED 42\nPUSHED 99\nPOPPED 99\nPOPPED 42",
    "kapilIntuition": "Mentorship By Kapil: Treiber stack links nodes via an atomic `head` pointer. In actual multi-threaded code, `compare_exchange_weak(&head, node->next, node)` performs the lock-free mutation. On empty stack, pop returns sentinel.",
    "timeComplexity": "O(1) average per operation",
    "spaceComplexity": "O(N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "4\nPUSH 42\nPUSH 99\nPOP\nPOP",
        "expectedOutput": "PUSHED 42\nPUSHED 99\nPOPPED 99\nPOPPED 42",
        "isHidden": false,
        "explanation": "LIFO order output."
      },
      {
        "id": "tc-2",
        "input": "2\nPOP\nPUSH 1",
        "expectedOutput": "POPPED NONE\nPUSHED 1",
        "isHidden": false,
        "explanation": "Pop on empty stack returns NONE."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int Q;\n    if (scanf(\"%d\", &Q) != 1) return 0;\n    // Implement Treiber Stack\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int Q;\n    if (!(cin >> Q)) return 0;\n    // Implement Treiber Stack\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int Q = sc.nextInt();\n        // Implement Treiber Stack\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement Treiber Stack\n\nif __name__ == '__main__':\n    main()\n"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nint stack_items[1005];\nint top = -1;\n\nint main() {\n    int Q;\n    if (scanf(\"%d\", &Q) != 1) return 0;\n\n    for (int q = 0; q < Q; ++q) {\n        char op[10];\n        scanf(\"%s\", op);\n        if (strcmp(op, \"PUSH\") == 0) {\n            int x;\n            scanf(\"%d\", &x);\n            stack_items[++top] = x;\n            printf(\"PUSHED %d\\n\", x);\n        } else if (strcmp(op, \"POP\") == 0) {\n            if (top >= 0) {\n                printf(\"POPPED %d\\n\", stack_items[top--]);\n            } else {\n                printf(\"POPPED NONE\\n\");\n            }\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int Q;\n    if (!(cin >> Q)) return 0;\n\n    vector<int> st;\n\n    while (Q--) {\n        string op;\n        cin >> op;\n        if (op == \"PUSH\") {\n            int x;\n            cin >> x;\n            st.push_back(x);\n            cout << \"PUSHED \" << x << \"\\n\";\n        } else if (op == \"POP\") {\n            if (!st.empty()) {\n                int val = st.back();\n                st.pop_back();\n                cout << \"POPPED \" << val << \"\\n\";\n            } else {\n                cout << \"POPPED NONE\\n\";\n            }\n        }\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.ArrayDeque;\nimport java.util.Deque;\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int Q = sc.nextInt();\n\n        Deque<Integer> stack = new ArrayDeque<>();\n\n        for (int q = 0; q < Q; q++) {\n            String op = sc.next();\n            if (\"PUSH\".equals(op)) {\n                int x = sc.nextInt();\n                stack.push(x);\n                System.out.println(\"PUSHED \" + x);\n            } else if (\"POP\".equals(op)) {\n                if (!stack.isEmpty()) {\n                    System.out.println(\"POPPED \" + stack.pop());\n                } else {\n                    System.out.println(\"POPPED NONE\");\n                }\n            }\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    Q = int(lines[0])\n    idx = 1\n\n    stack = []\n\n    for _ in range(Q):\n        op = lines[idx]\n        if op == \"PUSH\":\n            x = int(lines[idx + 1])\n            idx += 2\n            stack.append(x)\n            print(f\"PUSHED {x}\")\n        elif op == \"POP\":\n            idx += 1\n            if stack:\n                print(f\"POPPED {stack.pop()}\")\n            else:\n                print(\"POPPED NONE\")\n\nif __name__ == '__main__':\n    main()\n"
    }
  },
  {
    "id": "d15-ch-9",
    "day": 15,
    "title": "Extensible Rate Limiter Factory (LLD)",
    "difficulty": "Medium",
    "moduleTag": "16. Machine Coding & Concurrency",
    "companies": [
      "Stripe",
      "Twilio",
      "Shopify",
      "Coinbase"
    ],
    "platforms": [
      "System Design Lab"
    ],
    "problemStatement": "Design a Rate Limiter Factory supporting tiers:\n- `FREE`: limit is 2 requests per query burst.\n- `PRO`: limit is 5 requests per query burst.\n- `ENTERPRISE`: limit is 20 requests per query burst.\nGiven client queries with `tier request_count`, output `ALLOWED` if `request_count <= limit`, otherwise `REJECTED`.",
    "inputFormat": "First line: Q (queries count).\nNext Q lines: tier request_count",
    "outputFormat": "For each query, output `ALLOWED` or `REJECTED`.",
    "constraints": [
      "1 <= Q <= 1000",
      "tier in {FREE, PRO, ENTERPRISE}",
      "1 <= request_count <= 100"
    ],
    "sampleInput": "3\nFREE 2\nFREE 3\nPRO 4",
    "sampleOutput": "ALLOWED\nREJECTED\nALLOWED",
    "kapilIntuition": "Mentorship By Kapil: Factory Method cleanly encapsulates instantiation. The client requests a limiter for their tier, and the factory returns an implementation of `IRateLimiter` without the client knowing underlying class details.",
    "timeComplexity": "O(1) per check",
    "spaceComplexity": "O(1)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "3\nFREE 2\nFREE 3\nPRO 4",
        "expectedOutput": "ALLOWED\nREJECTED\nALLOWED",
        "isHidden": false,
        "explanation": "Free caps at 2, Pro caps at 5."
      },
      {
        "id": "tc-2",
        "input": "2\nENTERPRISE 20\nENTERPRISE 21",
        "expectedOutput": "ALLOWED\nREJECTED",
        "isHidden": false,
        "explanation": "Enterprise caps at 20."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int Q;\n    if (scanf(\"%d\", &Q) != 1) return 0;\n    // Implement Rate Limiter Factory\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int Q;\n    if (!(cin >> Q)) return 0;\n    // Implement Rate Limiter Factory\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int Q = sc.nextInt();\n        // Implement Rate Limiter Factory\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement Rate Limiter Factory\n\nif __name__ == '__main__':\n    main()\n"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    int Q;\n    if (scanf(\"%d\", &Q) != 1) return 0;\n\n    for (int q = 0; q < Q; ++q) {\n        char tier[20];\n        int count;\n        scanf(\"%s %d\", tier, &count);\n        int limit = 2;\n        if (strcmp(tier, \"PRO\") == 0) limit = 5;\n        else if (strcmp(tier, \"ENTERPRISE\") == 0) limit = 20;\n\n        if (count <= limit) printf(\"ALLOWED\\n\");\n        else printf(\"REJECTED\\n\");\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int Q;\n    if (!(cin >> Q)) return 0;\n\n    while (Q--) {\n        string tier;\n        int count;\n        cin >> tier >> count;\n        int limit = 2;\n        if (tier == \"PRO\") limit = 5;\n        else if (tier == \"ENTERPRISE\") limit = 20;\n\n        cout << (count <= limit ? \"ALLOWED\" : \"REJECTED\") << \"\\n\";\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int Q = sc.nextInt();\n\n        for (int q = 0; q < Q; q++) {\n            String tier = sc.next();\n            int count = sc.nextInt();\n            int limit = 2;\n            if (\"PRO\".equalsIgnoreCase(tier)) limit = 5;\n            else if (\"ENTERPRISE\".equalsIgnoreCase(tier)) limit = 20;\n\n            System.out.println(count <= limit ? \"ALLOWED\" : \"REJECTED\");\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    Q = int(lines[0])\n    idx = 1\n\n    for _ in range(Q):\n        tier = lines[idx]\n        count = int(lines[idx + 1])\n        idx += 2\n        limit = 2\n        if tier == \"PRO\":\n            limit = 5\n        elif tier == \"ENTERPRISE\":\n            limit = 20\n\n        print(\"ALLOWED\" if count <= limit else \"REJECTED\")\n\nif __name__ == '__main__':\n    main()\n"
    }
  },
  {
    "id": "d15-ch-10",
    "day": 15,
    "title": "Dining Philosophers Deadlock Prevention (Resource Ordering)",
    "difficulty": "Medium",
    "moduleTag": "16. Machine Coding & Concurrency",
    "companies": [
      "Amazon",
      "Google",
      "Cisco",
      "Qualcomm"
    ],
    "platforms": [
      "Operating Systems Lab"
    ],
    "problemStatement": "N philosophers sit at a round table with N chopsticks numbered 0 to N-1. Philosopher i needs chopstick i and chopstick (i+1)%N to eat. Under Resource Hierarchy Ordering, each philosopher MUST always acquire the chopstick with the lower index first before acquiring the chopstick with the higher index, breaking circular wait. For philosopher i, output the acquisition order `LOWER_IDX HIGHER_IDX`.",
    "inputFormat": "First line: N (philosophers count).\nNext line: Q (queries of philosopher indices).\nNext Q lines: philosopher_index i (0 <= i < N)",
    "outputFormat": "For each query, output the two chopstick indices in the order they must be acquired.",
    "constraints": [
      "3 <= N <= 100",
      "1 <= Q <= 100",
      "0 <= i < N"
    ],
    "sampleInput": "5 3\n0\n4\n2",
    "sampleOutput": "0 1\n0 4\n2 3",
    "kapilIntuition": "Mentorship By Kapil: The classic Dijkstra Dining Philosophers deadlock is caused by Circular Wait. Enforcing a global total ordering (always grab lower-numbered resource first) mathematically prevents cycles in the resource allocation graph.",
    "timeComplexity": "O(1) per philosopher query",
    "spaceComplexity": "O(1)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "5 3\n0\n4\n2",
        "expectedOutput": "0 1\n0 4\n2 3",
        "isHidden": false,
        "explanation": "Philosopher 4 needs 4 and 0; lower first means 0 then 4."
      },
      {
        "id": "tc-2",
        "input": "3 2\n0\n2",
        "expectedOutput": "0 1\n0 2",
        "isHidden": false,
        "explanation": "N=3 test case."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N, Q;\n    if (scanf(\"%d %d\", &N, &Q) != 2) return 0;\n    // Implement Resource Ordering\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int N, Q;\n    if (!(cin >> N >> Q)) return 0;\n    // Implement Resource Ordering\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int N = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement Resource Ordering\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement Resource Ordering\n\nif __name__ == '__main__':\n    main()\n"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N, Q;\n    if (scanf(\"%d %d\", &N, &Q) != 2) return 0;\n\n    for (int q = 0; q < Q; ++q) {\n        int i;\n        scanf(\"%d\", &i);\n        int c1 = i;\n        int c2 = (i + 1) % N;\n        if (c1 > c2) {\n            int tmp = c1; c1 = c2; c2 = tmp;\n        }\n        printf(\"%d %d\\n\", c1, c2);\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int N, Q;\n    if (!(cin >> N >> Q)) return 0;\n\n    while (Q--) {\n        int i;\n        cin >> i;\n        int c1 = i;\n        int c2 = (i + 1) % N;\n        if (c1 > c2) swap(c1, c2);\n        cout << c1 << \" \" << c2 << \"\\n\";\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int N = sc.nextInt();\n        int Q = sc.nextInt();\n\n        for (int q = 0; q < Q; q++) {\n            int i = sc.nextInt();\n            int c1 = i;\n            int c2 = (i + 1) % N;\n            if (c1 > c2) {\n                int tmp = c1; c1 = c2; c2 = tmp;\n            }\n            System.out.println(c1 + \" \" + c2);\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    N, Q = int(lines[0]), int(lines[1])\n    idx = 2\n\n    for _ in range(Q):\n        i = int(lines[idx])\n        idx += 1\n        c1 = i\n        c2 = (i + 1) % N\n        if c1 > c2:\n            c1, c2 = c2, c1\n        print(f\"{c1} {c2}\")\n\nif __name__ == '__main__':\n    main()\n"
    }
  }
];
