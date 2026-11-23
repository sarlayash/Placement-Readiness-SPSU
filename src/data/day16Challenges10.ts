import { PracticalChallenge } from '../types';

export const DAY_16_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  {
    "id": "d16-ch-1",
    "day": 16,
    "title": "Distributed Partitioned Commit Log & Offset Watermark Tracker",
    "difficulty": "Medium",
    "moduleTag": "17. Event Streaming & Vector Architecture",
    "companies": [
      "Google",
      "LinkedIn",
      "Uber",
      "Netflix"
    ],
    "platforms": [
      "FAANG Distributed Lab"
    ],
    "problemStatement": "Design a partitioned commit log with P partitions (0 to P-1). You are given Q operations:\n- `APPEND key partition_id payload`: Append record to partition_id, returning monotonic partition offset.\n- `READ partition_id offset`: Return payload at offset in partition_id, or `EMPTY` if offset is not yet committed.\n- `WATERMARK partition_id`: Output the latest committed offset for partition_id (-1 if empty).",
    "inputFormat": "First line: P Q (partitions count, queries count).\nNext Q lines: operation details.",
    "outputFormat": "Output result of each operation on a new line.",
    "constraints": [
      "1 <= P <= 16",
      "1 <= Q <= 1000",
      "0 <= partition_id < P"
    ],
    "sampleInput": "2 5\nAPPEND k1 0 LOGIN\nAPPEND k2 0 LOGOUT\nREAD 0 1\nWATERMARK 0\nWATERMARK 1",
    "sampleOutput": "0\n1\nLOGOUT\n1\n-1",
    "kapilIntuition": "Mentorship By Kapil: Maintain an independent array of records per partition. Sequential appends increment that partition's next offset. Lookups by offset are direct O(1) index accesses.",
    "timeComplexity": "O(1) append, O(1) read",
    "spaceComplexity": "O(P * N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "2 5\nAPPEND k1 0 LOGIN\nAPPEND k2 0 LOGOUT\nREAD 0 1\nWATERMARK 0\nWATERMARK 1",
        "expectedOutput": "0\n1\nLOGOUT\n1\n-1",
        "isHidden": false,
        "explanation": "Two items appended to partition 0 with offsets 0 and 1."
      },
      {
        "id": "tc-2",
        "input": "1 3\nREAD 0 0\nWATERMARK 0\nAPPEND a 0 DATA",
        "expectedOutput": "EMPTY\n-1\n0",
        "isHidden": false,
        "explanation": "Empty read gives EMPTY, watermark gives -1."
      },
      {
        "id": "tc-3",
        "input": "3 4\nAPPEND a 2 PAYLOAD_A\nAPPEND b 2 PAYLOAD_B\nREAD 2 0\nWATERMARK 2",
        "expectedOutput": "0\n1\nPAYLOAD_A\n1",
        "isHidden": true,
        "explanation": "Partition 2 handles offsets 0 and 1."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    int P, Q;\n    if (scanf(\"%d %d\", &P, &Q) != 2) return 0;\n    // Implement partitioned commit log\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int P, Q;\n    if (!(cin >> P >> Q)) return 0;\n    // Implement partitioned commit log\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int P = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement partitioned commit log\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    P, Q = int(lines[0]), int(lines[1])\n    # Implement partitioned commit log\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\n#define MAX_P 16\n#define MAX_RECS 200\n\ntypedef struct {\n    char key[32];\n    char payload[64];\n} Record;\n\nRecord logs[MAX_P][MAX_RECS];\nint counts[MAX_P];\n\nint main() {\n    int P, Q;\n    if (scanf(\"%d %d\", &P, &Q) != 2) return 0;\n    memset(counts, 0, sizeof(counts));\n    char cmd[32];\n    for (int i = 0; i < Q; ++i) {\n        if (scanf(\"%s\", cmd) != 1) break;\n        if (strcmp(cmd, \"APPEND\") == 0) {\n            char key[32], payload[64];\n            int p;\n            scanf(\"%s %d %s\", key, &p, payload);\n            int off = counts[p]++;\n            strcpy(logs[p][off].key, key);\n            strcpy(logs[p][off].payload, payload);\n            printf(\"%d\\n\", off);\n        } else if (strcmp(cmd, \"READ\") == 0) {\n            int p, off;\n            scanf(\"%d %d\", &p, &off);\n            if (off >= 0 && off < counts[p]) {\n                printf(\"%s\\n\", logs[p][off].payload);\n            } else {\n                printf(\"EMPTY\\n\");\n            }\n        } else if (strcmp(cmd, \"WATERMARK\") == 0) {\n            int p;\n            scanf(\"%d\", &p);\n            printf(\"%d\\n\", counts[p] - 1);\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nstruct Record {\n    string key;\n    string payload;\n};\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int P, Q;\n    if (!(cin >> P >> Q)) return 0;\n    vector<vector<Record>> logs(P);\n    string cmd;\n    for (int i = 0; i < Q; ++i) {\n        cin >> cmd;\n        if (cmd == \"APPEND\") {\n            string key, payload;\n            int p;\n            cin >> key >> p >> payload;\n            int off = logs[p].size();\n            logs[p].push_back({key, payload});\n            cout << off << \"\\n\";\n        } else if (cmd == \"READ\") {\n            int p, off;\n            cin >> p >> off;\n            if (off >= 0 && off < static_cast<int>(logs[p].size())) {\n                cout << logs[p][off].payload << \"\\n\";\n            } else {\n                cout << \"EMPTY\\n\";\n            }\n        } else if (cmd == \"WATERMARK\") {\n            int p;\n            cin >> p;\n            cout << (static_cast<int>(logs[p].size()) - 1) << \"\\n\";\n        }\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    static class Record {\n        String key;\n        String payload;\n        Record(String key, String payload) {\n            this.key = key;\n            this.payload = payload;\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int P = sc.nextInt();\n        int Q = sc.nextInt();\n        List<List<Record>> logs = new ArrayList<>();\n        for (int i = 0; i < P; i++) logs.add(new ArrayList<>());\n\n        for (int i = 0; i < Q; i++) {\n            String cmd = sc.next();\n            if (cmd.equals(\"APPEND\")) {\n                String key = sc.next();\n                int p = sc.nextInt();\n                String payload = sc.next();\n                int off = logs.get(p).size();\n                logs.get(p).add(new Record(key, payload));\n                System.out.println(off);\n            } else if (cmd.equals(\"READ\")) {\n                int p = sc.nextInt();\n                int off = sc.nextInt();\n                if (off >= 0 && off < logs.get(p).size()) {\n                    System.out.println(logs.get(p).get(off).payload);\n                } else {\n                    System.out.println(\"EMPTY\");\n                }\n            } else if (cmd.equals(\"WATERMARK\")) {\n                int p = sc.nextInt();\n                System.out.println(logs.get(p).size() - 1);\n            }\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    P = int(tokens[0])\n    Q = int(tokens[1])\n    logs = [[] for _ in range(P)]\n    idx = 2\n    out = []\n    for _ in range(Q):\n        if idx >= len(tokens):\n            break\n        cmd = tokens[idx]\n        idx += 1\n        if cmd == \"APPEND\":\n            key = tokens[idx]\n            p = int(tokens[idx+1])\n            payload = tokens[idx+2]\n            idx += 3\n            off = len(logs[p])\n            logs[p].append((key, payload))\n            out.append(str(off))\n        elif cmd == \"READ\":\n            p = int(tokens[idx])\n            off = int(tokens[idx+1])\n            idx += 2\n            if 0 <= off < len(logs[p]):\n                out.append(logs[p][off][1])\n            else:\n                out.append(\"EMPTY\")\n        elif cmd == \"WATERMARK\":\n            p = int(tokens[idx])\n            idx += 1\n            out.append(str(len(logs[p]) - 1))\n    print(\"\\n\".join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d16-ch-2",
    "day": 16,
    "title": "High-Dimensional Vector Cosine Similarity Search & Top-K Ranking",
    "difficulty": "Medium",
    "moduleTag": "17. Event Streaming & Vector Architecture",
    "companies": [
      "Google",
      "Meta",
      "OpenAI",
      "Anthropic"
    ],
    "platforms": [
      "AI & RAG Lab"
    ],
    "problemStatement": "Given a query embedding vector of dimension D and N candidate document vectors (each with ID 1 to N), compute the Cosine Similarity between the query and each document. Rank the documents in descending order of similarity score (break ties with smaller ID). Output the IDs of the Top-K most similar documents.",
    "inputFormat": "First line: N D K\nSecond line: D floating-point numbers (query vector).\nNext N lines: D floating-point numbers for document i (1-indexed).",
    "outputFormat": "Output the Top-K document IDs on a single line separated by space.",
    "constraints": [
      "1 <= N <= 1000",
      "1 <= D <= 128",
      "1 <= K <= N"
    ],
    "sampleInput": "3 3 2\n1.0 0.0 0.0\n0.8 0.6 0.0\n0.0 1.0 0.0\n0.9 0.1 0.0",
    "sampleOutput": "3 1",
    "kapilIntuition": "Mentorship By Kapil: Cosine Similarity = (A • B) / (||A|| * ||B||). Compute dot product and magnitudes in a single loop, sort candidates using a comparator on score descending, then tie-break on ID ascending.",
    "timeComplexity": "O(N * D + N log N)",
    "spaceComplexity": "O(N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "3 3 2\n1.0 0.0 0.0\n0.8 0.6 0.0\n0.0 1.0 0.0\n0.9 0.1 0.0",
        "expectedOutput": "3 1",
        "isHidden": false,
        "explanation": "Doc 3 has score ~0.993, Doc 1 has score 0.8, Doc 2 has score 0."
      },
      {
        "id": "tc-2",
        "input": "2 2 1\n0.5 0.5\n0.0 1.0\n1.0 0.0",
        "expectedOutput": "1",
        "isHidden": false,
        "explanation": "Both doc 1 and doc 2 have score 0.7071; tie-breaker chooses smaller ID 1."
      },
      {
        "id": "tc-3",
        "input": "4 2 3\n1.0 1.0\n1.0 1.0\n-1.0 -1.0\n0.5 0.5\n0.0 1.0",
        "expectedOutput": "1 3 4",
        "isHidden": true,
        "explanation": "Docs 1 and 3 match perfectly, doc 4 is next highest."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    int N, D, K;\n    if (scanf(\"%d %d %d\", &N, &D, &K) != 3) return 0;\n    // Compute Cosine Similarity and output top K IDs\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N, D, K;\n    if (!(cin >> N >> D >> K)) return 0;\n    // Compute Cosine Similarity and output top K IDs\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int N = sc.nextInt();\n        int D = sc.nextInt();\n        int K = sc.nextInt();\n        // Compute Cosine Similarity and output top K IDs\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Compute Cosine Similarity and output top K IDs\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <math.h>\n\ntypedef struct {\n    int id;\n    double score;\n} DocScore;\n\nint cmp(const void* a, const void* b) {\n    const DocScore* da = (const DocScore*)a;\n    const DocScore* db = (const DocScore*)b;\n    if (fabs(da->score - db->score) > 1e-9) {\n        return da->score < db->score ? 1 : -1;\n    }\n    return da->id - db->id;\n}\n\nint main() {\n    int N, D, K;\n    if (scanf(\"%d %d %d\", &N, &D, &K) != 3) return 0;\n    double query[128];\n    double norm_q = 0.0;\n    for (int d = 0; d < D; ++d) {\n        scanf(\"%lf\", &query[d]);\n        norm_q += query[d] * query[d];\n    }\n    norm_q = sqrt(norm_q);\n\n    DocScore* docs = (DocScore*)malloc(N * sizeof(DocScore));\n    for (int i = 0; i < N; ++i) {\n        double dot = 0.0, norm_d = 0.0;\n        for (int d = 0; d < D; ++d) {\n            double val;\n            scanf(\"%lf\", &val);\n            dot += val * query[d];\n            norm_d += val * val;\n        }\n        norm_d = sqrt(norm_d);\n        double denom = norm_q * norm_d;\n        docs[i].id = i + 1;\n        docs[i].score = denom < 1e-9 ? 0.0 : dot / denom;\n    }\n\n    qsort(docs, N, sizeof(DocScore), cmp);\n    for (int i = 0; i < K; ++i) {\n        printf(\"%d%c\", docs[i].id, i == K - 1 ? '\\n' : ' ');\n    }\n    free(docs);\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <cmath>\n#include <algorithm>\n\nusing namespace std;\n\nstruct DocScore {\n    int id;\n    double score;\n};\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int N, D, K;\n    if (!(cin >> N >> D >> K)) return 0;\n    vector<double> query(D);\n    double normQ = 0.0;\n    for (int i = 0; i < D; ++i) {\n        cin >> query[i];\n        normQ += query[i] * query[i];\n    }\n    normQ = sqrt(normQ);\n\n    vector<DocScore> docs(N);\n    for (int i = 0; i < N; ++i) {\n        double dot = 0.0, normD = 0.0;\n        for (int j = 0; j < D; ++j) {\n            double val;\n            cin >> val;\n            dot += val * query[j];\n            normD += val * val;\n        }\n        normD = sqrt(normD);\n        double denom = normQ * normD;\n        docs[i] = {i + 1, denom < 1e-9 ? 0.0 : dot / denom};\n    }\n\n    sort(docs.begin(), docs.end(), [](const DocScore& a, const DocScore& b) {\n        if (abs(a.score - b.score) > 1e-9) return a.score > b.score;\n        return a.id < b.id;\n    });\n\n    for (int i = 0; i < K; ++i) {\n        cout << docs[i].id << (i == K - 1 ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    static class DocScore {\n        int id;\n        double score;\n        DocScore(int id, double score) {\n            this.id = id;\n            this.score = score;\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int N = sc.nextInt();\n        int D = sc.nextInt();\n        int K = sc.nextInt();\n        double[] query = new double[D];\n        double normQ = 0.0;\n        for (int i = 0; i < D; i++) {\n            query[i] = sc.nextDouble();\n            normQ += query[i] * query[i];\n        }\n        normQ = Math.sqrt(normQ);\n\n        List<DocScore> docs = new ArrayList<>();\n        for (int i = 0; i < N; i++) {\n            double dot = 0.0, normD = 0.0;\n            for (int j = 0; j < D; j++) {\n                double val = sc.nextDouble();\n                dot += val * query[j];\n                normD += val * val;\n            }\n            normD = Math.sqrt(normD);\n            double denom = normQ * normD;\n            double score = denom < 1e-9 ? 0.0 : dot / denom;\n            docs.add(new DocScore(i + 1, score));\n        }\n\n        docs.sort((a, b) -> {\n            if (Math.abs(a.score - b.score) > 1e-9) {\n                return Double.compare(b.score, a.score);\n            }\n            return Integer.compare(a.id, b.id);\n        });\n\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < K; i++) {\n            sb.append(docs.get(i).id).append(i == K - 1 ? \"\" : \" \");\n        }\n        System.out.println(sb.toString());\n    }\n}",
      "python": "import sys\nimport math\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    N = int(tokens[0])\n    D = int(tokens[1])\n    K = int(tokens[2])\n    idx = 3\n    query = [float(tokens[idx + i]) for i in range(D)]\n    idx += D\n    norm_q = math.sqrt(sum(x * x for x in query))\n\n    docs = []\n    for doc_id in range(1, N + 1):\n        vec = [float(tokens[idx + i]) for i in range(D)]\n        idx += D\n        dot = sum(a * b for a, b in zip(query, vec))\n        norm_d = math.sqrt(sum(x * x for x in vec))\n        denom = norm_q * norm_d\n        score = dot / denom if denom > 1e-9 else 0.0\n        docs.append((doc_id, score))\n\n    docs.sort(key=lambda x: (-x[1], x[0]))\n    result = [str(docs[i][0]) for i in range(K)]\n    print(\" \".join(result))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d16-ch-3",
    "day": 16,
    "title": "LSM-Tree MemTable Flush & Multi-Way SSTable Merge",
    "difficulty": "Hard",
    "moduleTag": "17. Event Streaming & Vector Architecture",
    "companies": [
      "Meta",
      "Amazon",
      "Databricks",
      "Snowflake"
    ],
    "platforms": [
      "Storage Engine Lab"
    ],
    "problemStatement": "Given M sorted SSTables (each containing key-value pairs sorted lexicographically by key), and an in-memory MemTable with current key-value updates, perform a Compaction Merge. Higher-numbered SSTables represent newer writes than lower-numbered SSTables, and the MemTable is newest of all. If a key appears multiple times, retain ONLY the latest value. If the latest value is `TOMBSTONE`, the key was deleted and must be excluded entirely from the final merged output. Output all surviving keys and values sorted lexicographically by key.",
    "inputFormat": "First line: M (number of SSTables on disk).\nFor each SSTable: K_count followed by K_count lines `key value`.\nNext line: MemTable count followed by lines `key value`.",
    "outputFormat": "Print each surviving `key value` on a new line. Print `EMPTY` if no keys survive.",
    "constraints": [
      "1 <= M <= 10",
      "0 <= K_count <= 200",
      "1 <= key_len <= 32"
    ],
    "sampleInput": "2\n2\napple 10\nbanana 20\n2\nbanana 25\ncherry 30\n1\nbanana TOMBSTONE",
    "sampleOutput": "apple 10\ncherry 30",
    "kapilIntuition": "Mentorship By Kapil: Storage compaction resolves multi-version concurrency. Process SSTable 0 up to MemTable in increasing chronological order, storing the latest state in a dictionary/map. If value is TOMBSTONE, mark as deleted. Output remaining sorted keys.",
    "timeComplexity": "O(Total_Keys * log(Unique_Keys))",
    "spaceComplexity": "O(Unique_Keys)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "2\n2\napple 10\nbanana 20\n2\nbanana 25\ncherry 30\n1\nbanana TOMBSTONE",
        "expectedOutput": "apple 10\ncherry 30",
        "isHidden": false,
        "explanation": "banana is tombstoned in memtable so it is excluded."
      },
      {
        "id": "tc-2",
        "input": "1\n1\nx 100\n1\nx TOMBSTONE",
        "expectedOutput": "EMPTY",
        "isHidden": false,
        "explanation": "Only key x is tombstoned, output EMPTY."
      },
      {
        "id": "tc-3",
        "input": "1\n2\na 1\nb 2\n1\nc 3",
        "expectedOutput": "a 1\nb 2\nc 3",
        "isHidden": true,
        "explanation": "All keys survive and are printed sorted."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    int M;\n    if (scanf(\"%d\", &M) != 1) return 0;\n    // Implement LSM-Tree compaction\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <map>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int M;\n    if (!(cin >> M)) return 0;\n    // Implement LSM-Tree compaction\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int M = sc.nextInt();\n        // Implement LSM-Tree compaction\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement LSM-Tree compaction\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct {\n    char key[36];\n    char val[36];\n} Pair;\n\nint cmp(const void* a, const void* b) {\n    return strcmp(((const Pair*)a)->key, ((const Pair*)b)->key);\n}\n\nint main() {\n    int M;\n    if (scanf(\"%d\", &M) != 1) return 0;\n    Pair pairs[2000];\n    int count = 0;\n\n    for (int s = 0; s < M; ++s) {\n        int k;\n        scanf(\"%d\", &k);\n        for (int i = 0; i < k; ++i) {\n            char kstr[36], vstr[36];\n            scanf(\"%s %s\", kstr, vstr);\n            int found = -1;\n            for (int j = 0; j < count; ++j) {\n                if (strcmp(pairs[j].key, kstr) == 0) {\n                    found = j;\n                    break;\n                }\n            }\n            if (found != -1) {\n                strcpy(pairs[found].val, vstr);\n            } else {\n                strcpy(pairs[count].key, kstr);\n                strcpy(pairs[count].val, vstr);\n                count++;\n            }\n        }\n    }\n\n    int memCount;\n    if (scanf(\"%d\", &memCount) == 1) {\n        for (int i = 0; i < memCount; ++i) {\n            char kstr[36], vstr[36];\n            scanf(\"%s %s\", kstr, vstr);\n            int found = -1;\n            for (int j = 0; j < count; ++j) {\n                if (strcmp(pairs[j].key, kstr) == 0) {\n                    found = j;\n                    break;\n                }\n            }\n            if (found != -1) {\n                strcpy(pairs[found].val, vstr);\n            } else {\n                strcpy(pairs[count].key, kstr);\n                strcpy(pairs[count].val, vstr);\n                count++;\n            }\n        }\n    }\n\n    qsort(pairs, count, sizeof(Pair), cmp);\n    int printed = 0;\n    for (int i = 0; i < count; ++i) {\n        if (strcmp(pairs[i].val, \"TOMBSTONE\") != 0) {\n            printf(\"%s %s\\n\", pairs[i].key, pairs[i].val);\n            printed++;\n        }\n    }\n    if (printed == 0) {\n        printf(\"EMPTY\\n\");\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <map>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int M;\n    if (!(cin >> M)) return 0;\n    map<string, string> store;\n\n    for (int s = 0; s < M; ++s) {\n        int k;\n        cin >> k;\n        for (int i = 0; i < k; ++i) {\n            string key, val;\n            cin >> key >> val;\n            store[key] = val;\n        }\n    }\n\n    int memCount;\n    if (cin >> memCount) {\n        for (int i = 0; i < memCount; ++i) {\n            string key, val;\n            cin >> key >> val;\n            store[key] = val;\n        }\n    }\n\n    int printed = 0;\n    for (const auto& [k, v] : store) {\n        if (v != \"TOMBSTONE\") {\n            cout << k << \" \" << v << \"\\n\";\n            printed++;\n        }\n    }\n    if (printed == 0) {\n        cout << \"EMPTY\\n\";\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int M = sc.nextInt();\n        Map<String, String> store = new TreeMap<>();\n\n        for (int s = 0; s < M; s++) {\n            int k = sc.nextInt();\n            for (int i = 0; i < k; i++) {\n                String key = sc.next();\n                String val = sc.next();\n                store.put(key, val);\n            }\n        }\n\n        if (sc.hasNextInt()) {\n            int memCount = sc.nextInt();\n            for (int i = 0; i < memCount; i++) {\n                String key = sc.next();\n                String val = sc.next();\n                store.put(key, val);\n            }\n        }\n\n        int printed = 0;\n        for (Map.Entry<String, String> entry : store.entrySet()) {\n            if (!entry.getValue().equals(\"TOMBSTONE\")) {\n                System.out.println(entry.getKey() + \" \" + entry.getValue());\n                printed++;\n            }\n        }\n        if (printed == 0) {\n            System.out.println(\"EMPTY\");\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    M = int(tokens[0])\n    idx = 1\n    store = {}\n    for _ in range(M):\n        k = int(tokens[idx])\n        idx += 1\n        for _ in range(k):\n            key = tokens[idx]\n            val = tokens[idx+1]\n            idx += 2\n            store[key] = val\n\n    if idx < len(tokens):\n        mem_k = int(tokens[idx])\n        idx += 1\n        for _ in range(mem_k):\n            key = tokens[idx]\n            val = tokens[idx+1]\n            idx += 2\n            store[key] = val\n\n    surviving = [(k, v) for k, v in store.items() if v != \"TOMBSTONE\"]\n    surviving.sort(key=lambda x: x[0])\n    if not surviving:\n        print(\"EMPTY\")\n    else:\n        for k, v in surviving:\n            print(f\"{k} {v}\")\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d16-ch-4",
    "day": 16,
    "title": "Bloom Filter Probabilistic Query Pruning with Hash Multipliers",
    "difficulty": "Medium",
    "moduleTag": "17. Event Streaming & Vector Architecture",
    "companies": [
      "Google",
      "Akamai",
      "Cloudflare",
      "Cassandra"
    ],
    "platforms": [
      "Probabilistic Data Structures"
    ],
    "problemStatement": "Design a Bloom Filter with a bit array of size M (0 to M-1) and K hash functions: `h_i(x) = (hash(x) + i * 31) % M` for i = 0 to K-1, where `hash(x)` is the polynomial rolling hash `sum(c * 37^idx) % 1000000007`.\nGiven Q operations:\n- `ADD key`: Insert key into the Bloom Filter by setting K bits.\n- `CHECK key`: Return `MAYBE` if all K bits are set; otherwise return `NO`.",
    "inputFormat": "First line: M K Q\nNext Q lines: `ADD key` or `CHECK key`",
    "outputFormat": "For each `CHECK` operation, output `MAYBE` or `NO` on a new line.",
    "constraints": [
      "8 <= M <= 10000",
      "1 <= K <= 10",
      "1 <= Q <= 1000",
      "1 <= key_len <= 32"
    ],
    "sampleInput": "16 2 4\nADD user1\nCHECK user1\nCHECK user2\nADD user2",
    "sampleOutput": "MAYBE\nNO",
    "kapilIntuition": "Mentorship By Kapil: Bloom Filters guarantee zero false negatives. If even a single bit in the K positions is 0, the element is definitely not present (`NO`). If all K bits are 1, it is `MAYBE` present.",
    "timeComplexity": "O(K * len(key)) per operation",
    "spaceComplexity": "O(M) bits",
    "testCases": [
      {
        "id": "tc-1",
        "input": "16 2 4\nADD user1\nCHECK user1\nCHECK user2\nADD user2",
        "expectedOutput": "MAYBE\nNO",
        "isHidden": false,
        "explanation": "user1 was added so it returns MAYBE. user2 was not added yet so it returns NO."
      },
      {
        "id": "tc-2",
        "input": "32 3 2\nCHECK alpha\nADD alpha",
        "expectedOutput": "NO",
        "isHidden": false,
        "explanation": "Checking before add returns NO."
      },
      {
        "id": "tc-3",
        "input": "64 2 3\nADD doc_A\nADD doc_B\nCHECK doc_A",
        "expectedOutput": "MAYBE",
        "isHidden": true,
        "explanation": "doc_A was added and bits are set."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    int M, K, Q;\n    if (scanf(\"%d %d %d\", &M, &K, &Q) != 3) return 0;\n    // Implement Bloom Filter\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int M, K, Q;\n    if (!(cin >> M >> K >> Q)) return 0;\n    // Implement Bloom Filter\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int M = sc.nextInt();\n        int K = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement Bloom Filter\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement Bloom Filter\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n\nlong long compute_hash(const char* str) {\n    long long h = 0;\n    long long p = 1;\n    long long mod = 1000000007;\n    for (int i = 0; str[i]; ++i) {\n        h = (h + (unsigned char)str[i] * p) % mod;\n        p = (p * 37) % mod;\n    }\n    return h;\n}\n\nint main() {\n    int M, K, Q;\n    if (scanf(\"%d %d %d\", &M, &K, &Q) != 3) return 0;\n    int bits[10005] = {0};\n    char cmd[16], key[64];\n\n    for (int q = 0; q < Q; ++q) {\n        scanf(\"%s %s\", cmd, key);\n        long long base = compute_hash(key);\n        if (strcmp(cmd, \"ADD\") == 0) {\n            for (int i = 0; i < K; ++i) {\n                int bit = (int)((base + (long long)i * 31) % M);\n                bits[bit] = 1;\n            }\n        } else if (strcmp(cmd, \"CHECK\") == 0) {\n            int all_set = 1;\n            for (int i = 0; i < K; ++i) {\n                int bit = (int)((base + (long long)i * 31) % M);\n                if (!bits[bit]) {\n                    all_set = 0;\n                    break;\n                }\n            }\n            if (all_set) printf(\"MAYBE\\n\");\n            else printf(\"NO\\n\");\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nlong long computeHash(const string& str) {\n    long long h = 0;\n    long long p = 1;\n    long long mod = 1000000007;\n    for (char c : str) {\n        h = (h + static_cast<unsigned char>(c) * p) % mod;\n        p = (p * 37) % mod;\n    }\n    return h;\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int M, K, Q;\n    if (!(cin >> M >> K >> Q)) return 0;\n    vector<bool> bits(M, false);\n    string cmd, key;\n\n    for (int q = 0; q < Q; ++q) {\n        cin >> cmd >> key;\n        long long base = computeHash(key);\n        if (cmd == \"ADD\") {\n            for (int i = 0; i < K; ++i) {\n                int bit = (base + i * 31LL) % M;\n                bits[bit] = true;\n            }\n        } else if (cmd == \"CHECK\") {\n            bool allSet = true;\n            for (int i = 0; i < K; ++i) {\n                int bit = (base + i * 31LL) % M;\n                if (!bits[bit]) {\n                    allSet = false;\n                    break;\n                }\n            }\n            cout << (allSet ? \"MAYBE\" : \"NO\") << \"\\n\";\n        }\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    static long computeHash(String str) {\n        long h = 0;\n        long p = 1;\n        long mod = 1000000007L;\n        for (int i = 0; i < str.length(); i++) {\n            h = (h + (long)str.charAt(i) * p) % mod;\n            p = (p * 37) % mod;\n        }\n        return h;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int M = sc.nextInt();\n        int K = sc.nextInt();\n        int Q = sc.nextInt();\n        boolean[] bits = new boolean[M];\n\n        for (int q = 0; q < Q; q++) {\n            String cmd = sc.next();\n            String key = sc.next();\n            long base = computeHash(key);\n            if (cmd.equals(\"ADD\")) {\n                for (int i = 0; i < K; i++) {\n                    int bit = (int)((base + (long)i * 31) % M);\n                    bits[bit] = true;\n                }\n            } else if (cmd.equals(\"CHECK\")) {\n                boolean allSet = true;\n                for (int i = 0; i < K; i++) {\n                    int bit = (int)((base + (long)i * 31) % M);\n                    if (!bits[bit]) {\n                        allSet = false;\n                        break;\n                    }\n                }\n                System.out.println(allSet ? \"MAYBE\" : \"NO\");\n            }\n        }\n    }\n}",
      "python": "import sys\n\ndef compute_hash(s: str) -> int:\n    h = 0\n    p = 1\n    mod = 1000000007\n    for ch in s:\n        h = (h + ord(ch) * p) % mod\n        p = (p * 37) % mod\n    return h\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    M = int(tokens[0])\n    K = int(tokens[1])\n    Q = int(tokens[2])\n    bits = [False] * M\n    idx = 3\n    out = []\n    for _ in range(Q):\n        cmd = tokens[idx]\n        key = tokens[idx+1]\n        idx += 2\n        base = compute_hash(key)\n        if cmd == \"ADD\":\n            for i in range(K):\n                bit = (base + i * 31) % M\n                bits[bit] = True\n        elif cmd == \"CHECK\":\n            all_set = True\n            for i in range(K):\n                bit = (base + i * 31) % M\n                if not bits[bit]:\n                    all_set = False\n                    break\n            out.append(\"MAYBE\" if all_set else \"NO\")\n    print(\"\\n\".join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d16-ch-5",
    "day": 16,
    "title": "Event-Time Streaming Window Aggregator with Watermark Handling",
    "difficulty": "Medium",
    "moduleTag": "17. Event Streaming & Vector Architecture",
    "companies": [
      "Uber",
      "Apache Flink",
      "Stripe",
      "Google Cloud"
    ],
    "platforms": [
      "Stream Analytics Engine"
    ],
    "problemStatement": "Given a stream of N events with `(timestamp, value)` in seconds and a fixed tumbling window size W seconds. Events arrive out of order. A Watermark lags behind the maximum observed event timestamp by L seconds: `Watermark = max_observed_timestamp - L`. When a window closes (its `window_end <= Watermark`), emit the sum of values belonging to that window: `[window_start, window_end)`. Late events arriving with `timestamp < Watermark` are considered late and ignored. Emit closed windows in chronological order.",
    "inputFormat": "First line: N W L (event count, window size, allowed lag).\nNext N lines: timestamp value",
    "outputFormat": "For each closed window, output `[start,end): sum` on a new line. If no window closes, output `NONE`.",
    "constraints": [
      "1 <= N <= 1000",
      "1 <= W <= 3600",
      "0 <= L <= 3600",
      "0 <= timestamp <= 1000000"
    ],
    "sampleInput": "4 10 5\n2 10\n8 20\n16 5\n22 50",
    "sampleOutput": "[0,10): 30\n[10,20): 5",
    "kapilIntuition": "Mentorship By Kapil: Windows close as the watermark moves forward. Calculate `Watermark = max_time - L`. Any window with `window_end <= Watermark` is closed and ready to emit.",
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(N)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "4 10 5\n2 10\n8 20\n16 5\n22 50",
        "expectedOutput": "[0,10): 30\n[10,20): 5",
        "isHidden": false,
        "explanation": "Max time 22 gives watermark 17. Windows [0,10) and [10,20) have closed."
      },
      {
        "id": "tc-2",
        "input": "2 60 10\n5 100\n10 200",
        "expectedOutput": "NONE",
        "isHidden": false,
        "explanation": "Max time 10 gives watermark 0, so window [0,60) has not closed."
      },
      {
        "id": "tc-3",
        "input": "3 5 2\n1 10\n3 20\n8 30",
        "expectedOutput": "[0,5): 30",
        "isHidden": true,
        "explanation": "Max time 8 gives watermark 6, closing [0,5)."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N, W, L;\n    if (scanf(\"%d %d %d\", &N, &W, &L) != 3) return 0;\n    // Implement Streaming Window Aggregator\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <map>\n\nusing namespace std;\n\nint main() {\n    int N, W, L;\n    if (!(cin >> N >> W >> L)) return 0;\n    // Implement Streaming Window Aggregator\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int N = sc.nextInt();\n        int W = sc.nextInt();\n        int L = sc.nextInt();\n        // Implement Streaming Window Aggregator\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement Streaming Window Aggregator\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    long long window_start;\n    long long sum;\n} WinRecord;\n\nint cmp(const void* a, const void* b) {\n    long long diff = ((const WinRecord*)a)->window_start - ((const WinRecord*)b)->window_start;\n    return diff > 0 ? 1 : (diff < 0 ? -1 : 0);\n}\n\nint main() {\n    int N, W, L;\n    if (scanf(\"%d %d %d\", &N, &W, &L) != 3) return 0;\n\n    WinRecord wins[2000];\n    int win_count = 0;\n    long long max_time = -1;\n\n    for (int i = 0; i < N; ++i) {\n        long long t, v;\n        scanf(\"%lld %lld\", &t, &v);\n        if (t > max_time) max_time = t;\n        long long start = (t / W) * W;\n        int found = -1;\n        for (int j = 0; j < win_count; ++j) {\n            if (wins[j].window_start == start) {\n                found = j;\n                break;\n            }\n        }\n        if (found != -1) {\n            wins[found].sum += v;\n        } else {\n            wins[win_count].window_start = start;\n            wins[win_count].sum = v;\n            win_count++;\n        }\n    }\n\n    long long watermark = max_time - L;\n    qsort(wins, win_count, sizeof(WinRecord), cmp);\n\n    int printed = 0;\n    for (int i = 0; i < win_count; ++i) {\n        long long end = wins[i].window_start + W;\n        if (end <= watermark) {\n            printf(\"[%lld,%lld): %lld\\n\", wins[i].window_start, end, wins[i].sum);\n            printed++;\n        }\n    }\n    if (printed == 0) printf(\"NONE\\n\");\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <map>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int N, W, L;\n    if (!(cin >> N >> W >> L)) return 0;\n\n    map<int64_t, int64_t> windows;\n    int64_t maxTime = -1;\n\n    for (int i = 0; i < N; ++i) {\n        int64_t t, v;\n        cin >> t >> v;\n        if (t > maxTime) maxTime = t;\n        int64_t start = (t / W) * W;\n        windows[start] += v;\n    }\n\n    int64_t watermark = maxTime - L;\n    int printed = 0;\n\n    for (const auto& [start, sum] : windows) {\n        int64_t end = start + W;\n        if (end <= watermark) {\n            cout << \"[\" << start << \",\" << end << \"): \" << sum << \"\\n\";\n            printed++;\n        }\n    }\n    if (printed == 0) cout << \"NONE\\n\";\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int N = sc.nextInt();\n        int W = sc.nextInt();\n        int L = sc.nextInt();\n\n        Map<Long, Long> windows = new TreeMap<>();\n        long maxTime = -1;\n\n        for (int i = 0; i < N; i++) {\n            long t = sc.nextLong();\n            long v = sc.nextLong();\n            if (t > maxTime) maxTime = t;\n            long start = (t / W) * W;\n            windows.put(start, windows.getOrDefault(start, 0L) + v);\n        }\n\n        long watermark = maxTime - L;\n        int printed = 0;\n\n        for (Map.Entry<Long, Long> entry : windows.entrySet()) {\n            long start = entry.getKey();\n            long end = start + W;\n            if (end <= watermark) {\n                System.out.println(\"[\" + start + \",\" + end + \"): \" + entry.getValue());\n                printed++;\n            }\n        }\n        if (printed == 0) System.out.println(\"NONE\");\n    }\n}",
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    N = int(tokens[0])\n    W = int(tokens[1])\n    L = int(tokens[2])\n    idx = 3\n    windows = {}\n    max_time = -1\n    for _ in range(N):\n        t = int(tokens[idx])\n        v = int(tokens[idx+1])\n        idx += 2\n        if t > max_time:\n            max_time = t\n        start = (t // W) * W\n        windows[start] = windows.get(start, 0) + v\n\n    watermark = max_time - L\n    closed_windows = sorted([s for s in windows.keys() if s + W <= watermark])\n    if not closed_windows:\n        print(\"NONE\")\n    else:\n        for s in closed_windows:\n            print(f\"[{s},{s+W}): {windows[s]}\")\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d16-ch-6",
    "day": 16,
    "title": "Consumer Group Partition Rebalancing & Sticky Assignment Protocol",
    "difficulty": "Medium",
    "moduleTag": "17. Event Streaming & Vector Architecture",
    "companies": [
      "LinkedIn",
      "Apache Kafka",
      "Confluent",
      "Uber"
    ],
    "platforms": [
      "Distributed Systems Protocol"
    ],
    "problemStatement": "Given P partitions (0 to P-1) and C consumer instances (0 to C-1). Implement Round-Robin Partition Assignment. Partitions are assigned to consumers in cyclical order: partition i is assigned to consumer `(i % C)`. Output the list of partitions assigned to each consumer (format: `Consumer C_ID: [p1, p2, ...]`). If a consumer has no partitions, output `Consumer C_ID: []`.",
    "inputFormat": "A single line containing two integers: P C",
    "outputFormat": "C lines, each detailing the partitions assigned to consumer i (0 <= i < C).",
    "constraints": [
      "1 <= P <= 100",
      "1 <= C <= 50"
    ],
    "sampleInput": "5 3",
    "sampleOutput": "Consumer 0: [0, 3]\nConsumer 1: [1, 4]\nConsumer 2: [2]",
    "kapilIntuition": "Mentorship By Kapil: Partition assignment distributes streaming load across workers. Round-robin assignment guarantees maximum load disparity of at most 1 partition between any two consumers.",
    "timeComplexity": "O(P + C)",
    "spaceComplexity": "O(P)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "5 3",
        "expectedOutput": "Consumer 0: [0, 3]\nConsumer 1: [1, 4]\nConsumer 2: [2]",
        "isHidden": false,
        "explanation": "5 partitions shared across 3 consumers."
      },
      {
        "id": "tc-2",
        "input": "2 3",
        "expectedOutput": "Consumer 0: [0]\nConsumer 1: [1]\nConsumer 2: []",
        "isHidden": false,
        "explanation": "More consumers than partitions, consumer 2 gets empty assignment."
      },
      {
        "id": "tc-3",
        "input": "4 2",
        "expectedOutput": "Consumer 0: [0, 2]\nConsumer 1: [1, 3]",
        "isHidden": true,
        "explanation": "Equal distribution of 2 partitions each."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int P, C;\n    if (scanf(\"%d %d\", &P, &C) != 2) return 0;\n    // Implement Round-Robin Consumer Assignment\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int P, C;\n    if (!(cin >> P >> C)) return 0;\n    // Implement Round-Robin Consumer Assignment\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int P = sc.nextInt();\n        int C = sc.nextInt();\n        // Implement Round-Robin Consumer Assignment\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    P, C = int(lines[0]), int(lines[1])\n    # Implement Round-Robin Consumer Assignment\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int P, C;\n    if (scanf(\"%d %d\", &P, &C) != 2) return 0;\n    for (int c = 0; c < C; ++c) {\n        printf(\"Consumer %d: [\", c);\n        int first = 1;\n        for (int p = 0; p < P; ++p) {\n            if (p % C == c) {\n                if (!first) printf(\", \");\n                printf(\"%d\", p);\n                first = 0;\n            }\n        }\n        printf(\"]\\n\");\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int P, C;\n    if (!(cin >> P >> C)) return 0;\n    vector<vector<int>> assignments(C);\n    for (int p = 0; p < P; ++p) {\n        assignments[p % C].push_back(p);\n    }\n    for (int c = 0; c < C; ++c) {\n        cout << \"Consumer \" << c << \": [\";\n        for (size_t i = 0; i < assignments[c].size(); ++i) {\n            cout << assignments[c][i] << (i + 1 == assignments[c].size() ? \"\" : \", \");\n        }\n        cout << \"]\\n\";\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int P = sc.nextInt();\n        int C = sc.nextInt();\n        List<List<Integer>> assignments = new ArrayList<>();\n        for (int i = 0; i < C; i++) assignments.add(new ArrayList<>());\n        for (int p = 0; p < P; p++) {\n            assignments.get(p % C).add(p);\n        }\n        for (int c = 0; c < C; c++) {\n            System.out.print(\"Consumer \" + c + \": [\");\n            List<Integer> list = assignments.get(c);\n            for (int i = 0; i < list.size(); i++) {\n                System.out.print(list.get(i) + (i + 1 == list.size() ? \"\" : \", \"));\n            }\n            System.out.println(\"]\");\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    P, C = int(tokens[0]), int(tokens[1])\n    assignments = [[] for _ in range(C)]\n    for p in range(P):\n        assignments[p % C].append(p)\n    for c in range(C):\n        print(f\"Consumer {c}: [{', '.join(map(str, assignments[c]))}]\")\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d16-ch-7",
    "day": 16,
    "title": "Hierarchical Navigable Small World (HNSW) Greedy Vector Traversal",
    "difficulty": "Hard",
    "moduleTag": "17. Event Streaming & Vector Architecture",
    "companies": [
      "OpenAI",
      "Pinecone",
      "Meta AI",
      "Amazon Search"
    ],
    "platforms": [
      "Vector Search Engine"
    ],
    "problemStatement": "Given a graph of N vector nodes (1 to N) in 2D space `(x, y)` and bidirectional edges connecting neighbor nodes. Given an entry node E and a query coordinate `(qx, qy)`. Perform a Greedy Local Search: from current node, evaluate Euclidean distances to all connected neighbors. Transition to the neighbor that strictly minimizes distance to the query. Repeat until no neighbor is strictly closer than current node (local minimum reached). Output the traversal path of node IDs followed by the reached nearest neighbor ID.",
    "inputFormat": "First line: N M (nodes count, edges count).\nNext N lines: node_id x y\nNext M lines: u v (undirected edge)\nLast line: E qx qy (entry node, query coordinates)",
    "outputFormat": "First line: space-separated node IDs in order of traversal.\nSecond line: `NEAREST: <id>`",
    "constraints": [
      "1 <= N <= 100",
      "1 <= M <= 500",
      "1 <= E <= N"
    ],
    "sampleInput": "4 4\n1 0 0\n2 5 0\n3 5 5\n4 0 5\n1 2\n2 3\n3 4\n4 1\n1 6 0",
    "sampleOutput": "1 2\nNEAREST: 2",
    "kapilIntuition": "Mentorship By Kapil: HNSW graph search navigates greedily through Delaunay-like graphs. At each step, measure Euclidean distance squared `(x - qx)^2 + (y - qy)^2` to all neighbors; pick the minimum. If min neighbor distance >= current distance, terminate.",
    "timeComplexity": "O(Degree * Steps)",
    "spaceComplexity": "O(N + M)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "4 4\n1 0 0\n2 5 0\n3 5 5\n4 0 5\n1 2\n2 3\n3 4\n4 1\n1 6 0",
        "expectedOutput": "1 2\nNEAREST: 2",
        "isHidden": false,
        "explanation": "Node 2 at (5,0) is closer to (6,0) than node 1 at (0,0)."
      },
      {
        "id": "tc-2",
        "input": "3 2\n1 0 0\n2 1 0\n3 2 0\n1 2\n2 3\n1 0 0",
        "expectedOutput": "1\nNEAREST: 1",
        "isHidden": false,
        "explanation": "Node 1 is already at the query position (0,0)."
      },
      {
        "id": "tc-3",
        "input": "3 2\n1 0 0\n2 2 0\n3 4 0\n1 2\n2 3\n1 5 0",
        "expectedOutput": "1 2 3\nNEAREST: 3",
        "isHidden": true,
        "explanation": "Greedy jumps 1 -> 2 -> 3 toward (5,0)."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N, M;\n    if (scanf(\"%d %d\", &N, &M) != 2) return 0;\n    // Implement HNSW Greedy Search\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N, M;\n    if (!(cin >> N >> M)) return 0;\n    // Implement HNSW Greedy Search\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int N = sc.nextInt();\n        int M = sc.nextInt();\n        // Implement HNSW Greedy Search\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement HNSW Greedy Search\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <math.h>\n\n#define MAX_NODES 105\n\ntypedef struct {\n    double x, y;\n} Point;\n\nPoint pts[MAX_NODES];\nint adj[MAX_NODES][MAX_NODES];\nint deg[MAX_NODES];\n\ndouble dist_sq(Point a, double qx, double qy) {\n    double dx = a.x - qx;\n    double dy = a.y - qy;\n    return dx * dx + dy * dy;\n}\n\nint main() {\n    int N, M;\n    if (scanf(\"%d %d\", &N, &M) != 2) return 0;\n    for (int i = 0; i < N; ++i) {\n        int id;\n        scanf(\"%d\", &id);\n        scanf(\"%lf %lf\", &pts[id].x, &pts[id].y);\n        deg[id] = 0;\n    }\n    for (int i = 0; i < M; ++i) {\n        int u, v;\n        scanf(\"%d %d\", &u, &v);\n        adj[u][deg[u]++] = v;\n        adj[v][deg[v]++] = u;\n    }\n    int curr;\n    double qx, qy;\n    scanf(\"%d %lf %lf\", &curr, &qx, &qy);\n\n    int path[200];\n    int pcount = 0;\n    path[pcount++] = curr;\n\n    while (1) {\n        double best_dist = dist_sq(pts[curr], qx, qy);\n        int next_node = curr;\n        for (int i = 0; i < deg[curr]; ++i) {\n            int neighbor = adj[curr][i];\n            double d = dist_sq(pts[neighbor], qx, qy);\n            if (d < best_dist - 1e-9) {\n                best_dist = d;\n                next_node = neighbor;\n            }\n        }\n        if (next_node == curr) break;\n        curr = next_node;\n        path[pcount++] = curr;\n    }\n\n    for (int i = 0; i < pcount; ++i) {\n        printf(\"%d%c\", path[i], i == pcount - 1 ? '\\n' : ' ');\n    }\n    printf(\"NEAREST: %d\\n\", curr);\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <cmath>\n\nusing namespace std;\n\nstruct Point {\n    double x, y;\n};\n\ndouble distSq(const Point& a, double qx, double qy) {\n    double dx = a.x - qx;\n    double dy = a.y - qy;\n    return dx * dx + dy * dy;\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int N, M;\n    if (!(cin >> N >> M)) return 0;\n    vector<Point> pts(N + 1);\n    for (int i = 0; i < N; ++i) {\n        int id;\n        cin >> id;\n        cin >> pts[id].x >> pts[id].y;\n    }\n    vector<vector<int>> adj(N + 1);\n    for (int i = 0; i < M; ++i) {\n        int u, v;\n        cin >> u >> v;\n        adj[u].push_back(v);\n        adj[v].push_back(u);\n    }\n    int curr;\n    double qx, qy;\n    cin >> curr >> qx >> qy;\n\n    vector<int> path = {curr};\n    while (true) {\n        double bestDist = distSq(pts[curr], qx, qy);\n        int nextNode = curr;\n        for (int neighbor : adj[curr]) {\n            double d = distSq(pts[neighbor], qx, qy);\n            if (d < bestDist - 1e-9) {\n                bestDist = d;\n                nextNode = neighbor;\n            }\n        }\n        if (nextNode == curr) break;\n        curr = nextNode;\n        path.push_back(curr);\n    }\n\n    for (size_t i = 0; i < path.size(); ++i) {\n        cout << path[i] << (i + 1 == path.size() ? \"\" : \" \");\n    }\n    cout << \"\\nNEAREST: \" << curr << \"\\n\";\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    static class Point {\n        double x, y;\n        Point(double x, double y) {\n            this.x = x;\n            this.y = y;\n        }\n    }\n\n    static double distSq(Point a, double qx, double qy) {\n        double dx = a.x - qx;\n        double dy = a.y - qy;\n        return dx * dx + dy * dy;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int N = sc.nextInt();\n        int M = sc.nextInt();\n        Map<Integer, Point> pts = new HashMap<>();\n        for (int i = 0; i < N; i++) {\n            int id = sc.nextInt();\n            pts.put(id, new Point(sc.nextDouble(), sc.nextDouble()));\n        }\n        Map<Integer, List<Integer>> adj = new HashMap<>();\n        for (int i = 1; i <= N; i++) adj.put(i, new ArrayList<>());\n        for (int i = 0; i < M; i++) {\n            int u = sc.nextInt();\n            int v = sc.nextInt();\n            adj.get(u).add(v);\n            adj.get(v).add(u);\n        }\n        int curr = sc.nextInt();\n        double qx = sc.nextDouble();\n        double qy = sc.nextDouble();\n\n        List<Integer> path = new ArrayList<>();\n        path.add(curr);\n\n        while (true) {\n            double bestDist = distSq(pts.get(curr), qx, qy);\n            int nextNode = curr;\n            for (int neighbor : adj.get(curr)) {\n                double d = distSq(pts.get(neighbor), qx, qy);\n                if (d < bestDist - 1e-9) {\n                    bestDist = d;\n                    nextNode = neighbor;\n                }\n            }\n            if (nextNode == curr) break;\n            curr = nextNode;\n            path.add(curr);\n        }\n\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < path.size(); i++) {\n            sb.append(path.get(i)).append(i + 1 == path.size() ? \"\" : \" \");\n        }\n        System.out.println(sb.toString());\n        System.out.println(\"NEAREST: \" + curr);\n    }\n}",
      "python": "import sys\n\ndef dist_sq(pt, qx, qy):\n    dx = pt[0] - qx\n    dy = pt[1] - qy\n    return dx * dx + dy * dy\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    N = int(tokens[0])\n    M = int(tokens[1])\n    idx = 2\n    pts = {}\n    for _ in range(N):\n        nid = int(tokens[idx])\n        x = float(tokens[idx+1])\n        y = float(tokens[idx+2])\n        idx += 3\n        pts[nid] = (x, y)\n\n    adj = {i: [] for i in pts}\n    for _ in range(M):\n        u = int(tokens[idx])\n        v = int(tokens[idx+1])\n        idx += 2\n        adj[u].append(v)\n        adj[v].append(u)\n\n    curr = int(tokens[idx])\n    qx = float(tokens[idx+1])\n    qy = float(tokens[idx+2])\n\n    path = [curr]\n    while True:\n        best_dist = dist_sq(pts[curr], qx, qy)\n        next_node = curr\n        for neighbor in adj[curr]:\n            d = dist_sq(pts[neighbor], qx, qy)\n            if d < best_dist - 1e-9:\n                best_dist = d\n                next_node = neighbor\n        if next_node == curr:\n            break\n        curr = next_node\n        path.append(curr)\n\n    print(\" \".join(map(str, path)))\n    print(f\"NEAREST: {curr}\")\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d16-ch-8",
    "day": 16,
    "title": "Write-Ahead Log (WAL) Crash Recovery & Idempotent Replay Engine",
    "difficulty": "Medium",
    "moduleTag": "17. Event Streaming & Vector Architecture",
    "companies": [
      "PostgreSQL",
      "SQLite",
      "MongoDB",
      "Couchbase"
    ],
    "platforms": [
      "Database Durability Engine"
    ],
    "problemStatement": "A database server crashes and restarts. It reads its raw on-disk Write-Ahead Log (WAL) containing records formatted as `LSN TX_ID OP KEY VAL` (Log Sequence Number, Transaction ID, Operation `SET` or `COMMIT` or `ABORT`, Key, Value).\nRules:\n1. Only transactions that reached a `COMMIT` record before the crash are durable and must be applied to the database state.\n2. Transactions without a `COMMIT` or with an `ABORT` record must be rolled back completely.\n3. Output the final state of all surviving keys sorted lexicographically. If database is empty, output `EMPTY`.",
    "inputFormat": "First line: L (number of WAL records).\nNext L lines: LSN TX_ID OP KEY VAL (or `LSN TX_ID COMMIT NONE NONE` / `LSN TX_ID ABORT NONE NONE`)",
    "outputFormat": "Sorted lines `KEY VAL` or `EMPTY`.",
    "constraints": [
      "1 <= L <= 1000",
      "1 <= LSN <= 100000",
      "1 <= TX_ID <= 1000"
    ],
    "sampleInput": "5\n1 101 SET balance 100\n2 102 SET status PENDING\n3 101 COMMIT NONE NONE\n4 103 SET count 50\n5 102 ABORT NONE NONE",
    "sampleOutput": "balance 100",
    "kapilIntuition": "Mentorship By Kapil: ARIES crash recovery algorithm separates uncommitted transactions from committed ones. Group mutation ops by TX_ID; filter only for transactions with an explicit COMMIT, then replay in order of LSN.",
    "timeComplexity": "O(L log U)",
    "spaceComplexity": "O(L)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "5\n1 101 SET balance 100\n2 102 SET status PENDING\n3 101 COMMIT NONE NONE\n4 103 SET count 50\n5 102 ABORT NONE NONE",
        "expectedOutput": "balance 100",
        "isHidden": false,
        "explanation": "Only TX 101 committed; TX 102 aborted and TX 103 never committed before crash."
      },
      {
        "id": "tc-2",
        "input": "2\n1 200 SET a 1\n2 200 ABORT NONE NONE",
        "expectedOutput": "EMPTY",
        "isHidden": false,
        "explanation": "Transaction was aborted."
      },
      {
        "id": "tc-3",
        "input": "4\n1 300 SET a 10\n2 300 SET b 20\n3 300 COMMIT NONE NONE\n4 400 SET c 30",
        "expectedOutput": "a 10\nb 20",
        "isHidden": true,
        "explanation": "Only 300 committed."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int L;\n    if (scanf(\"%d\", &L) != 1) return 0;\n    // Implement WAL Recovery Engine\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <map>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int L;\n    if (!(cin >> L)) return 0;\n    // Implement WAL Recovery Engine\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int L = sc.nextInt();\n        // Implement WAL Recovery Engine\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement WAL Recovery Engine\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int lsn;\n    int tx_id;\n    char op[16];\n    char key[32];\n    char val[32];\n} WALRec;\n\ntypedef struct {\n    char key[32];\n    char val[32];\n} KVPair;\n\nint cmp(const void* a, const void* b) {\n    return strcmp(((const KVPair*)a)->key, ((const KVPair*)b)->key);\n}\n\nint main() {\n    int L;\n    if (scanf(\"%d\", &L) != 1) return 0;\n    WALRec recs[1005];\n    int committed_tx[1005] = {0};\n\n    for (int i = 0; i < L; ++i) {\n        scanf(\"%d %d %s %s %s\", &recs[i].lsn, &recs[i].tx_id, recs[i].op, recs[i].key, recs[i].val);\n        if (strcmp(recs[i].op, \"COMMIT\") == 0) {\n            committed_tx[recs[i].tx_id] = 1;\n        } else if (strcmp(recs[i].op, \"ABORT\") == 0) {\n            committed_tx[recs[i].tx_id] = 0;\n        }\n    }\n\n    KVPair db[1005];\n    int db_count = 0;\n\n    for (int i = 0; i < L; ++i) {\n        if (strcmp(recs[i].op, \"SET\") == 0 && committed_tx[recs[i].tx_id]) {\n            int found = -1;\n            for (int j = 0; j < db_count; ++j) {\n                if (strcmp(db[j].key, recs[i].key) == 0) {\n                    found = j;\n                    break;\n                }\n            }\n            if (found != -1) {\n                strcpy(db[found].val, recs[i].val);\n            } else {\n                strcpy(db[db_count].key, recs[i].key);\n                strcpy(db[db_count].val, recs[i].val);\n                db_count++;\n            }\n        }\n    }\n\n    qsort(db, db_count, sizeof(KVPair), cmp);\n    if (db_count == 0) {\n        printf(\"EMPTY\\n\");\n    } else {\n        for (int i = 0; i < db_count; ++i) {\n            printf(\"%s %s\\n\", db[i].key, db[i].val);\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <map>\n#include <set>\n\nusing namespace std;\n\nstruct WALRec {\n    int lsn;\n    int txId;\n    string op;\n    string key;\n    string val;\n};\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int L;\n    if (!(cin >> L)) return 0;\n    vector<WALRec> recs(L);\n    set<int> committedTx;\n\n    for (int i = 0; i < L; ++i) {\n        cin >> recs[i].lsn >> recs[i].txId >> recs[i].op >> recs[i].key >> recs[i].val;\n        if (recs[i].op == \"COMMIT\") {\n            committedTx.insert(recs[i].txId);\n        } else if (recs[i].op == \"ABORT\") {\n            committedTx.erase(recs[i].txId);\n        }\n    }\n\n    map<string, string> db;\n    for (const auto& r : recs) {\n        if (r.op == \"SET\" && committedTx.count(r.txId)) {\n            db[r.key] = r.val;\n        }\n    }\n\n    if (db.empty()) {\n        cout << \"EMPTY\\n\";\n    } else {\n        for (const auto& [k, v] : db) {\n            cout << k << \" \" << v << \"\\n\";\n        }\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    static class WALRec {\n        int lsn, txId;\n        String op, key, val;\n        WALRec(int lsn, int txId, String op, String key, String val) {\n            this.lsn = lsn;\n            this.txId = txId;\n            this.op = op;\n            this.key = key;\n            this.val = val;\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int L = sc.nextInt();\n        List<WALRec> recs = new ArrayList<>();\n        Set<Integer> committed = new HashSet<>();\n\n        for (int i = 0; i < L; i++) {\n            int lsn = sc.nextInt();\n            int tx = sc.nextInt();\n            String op = sc.next();\n            String key = sc.next();\n            String val = sc.next();\n            recs.add(new WALRec(lsn, tx, op, key, val));\n            if (op.equals(\"COMMIT\")) {\n                committed.add(tx);\n            } else if (op.equals(\"ABORT\")) {\n                committed.remove(tx);\n            }\n        }\n\n        Map<String, String> db = new TreeMap<>();\n        for (WALRec r : recs) {\n            if (r.op.equals(\"SET\") && committed.contains(r.txId)) {\n                db.put(r.key, r.val);\n            }\n        }\n\n        if (db.isEmpty()) {\n            System.out.println(\"EMPTY\");\n        } else {\n            for (Map.Entry<String, String> e : db.entrySet()) {\n                System.out.println(e.getKey() + \" \" + e.getValue());\n            }\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    L = int(tokens[0])\n    idx = 1\n    recs = []\n    committed = set()\n\n    for _ in range(L):\n        lsn = int(tokens[idx])\n        tx = int(tokens[idx+1])\n        op = tokens[idx+2]\n        key = tokens[idx+3]\n        val = tokens[idx+4]\n        idx += 5\n        recs.append((lsn, tx, op, key, val))\n        if op == \"COMMIT\":\n            committed.add(tx)\n        elif op == \"ABORT\":\n            committed.discard(tx)\n\n    db = {}\n    for lsn, tx, op, key, val in recs:\n        if op == \"SET\" and tx in committed:\n            db[key] = val\n\n    if not db:\n        print(\"EMPTY\")\n    else:\n        for k in sorted(db.keys()):\n            print(f\"{k} {db[k]}\")\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d16-ch-9",
    "day": 16,
    "title": "Real-Time Sliding Window Rate-Limiter with Token Influx",
    "difficulty": "Medium",
    "moduleTag": "17. Event Streaming & Vector Architecture",
    "companies": [
      "Cloudflare",
      "Stripe",
      "Twitter",
      "Amazon"
    ],
    "platforms": [
      "API Gateway Engine"
    ],
    "problemStatement": "Design an API Gateway rate limiter with maximum capacity C tokens, refilling at rate R tokens per second. Tokens are capped at C. At t = 0, bucket starts with C tokens. When a request arrives at timestamp T requesting K tokens: if the bucket has at least K tokens after refilling for elapsed time, accept the request (`ACCEPTED`) and deduct K tokens. Otherwise, reject the request (`REJECTED`) and do not deduct tokens. Output the status for each request.",
    "inputFormat": "First line: C R Q (capacity, refill rate, queries count).\nNext Q lines: timestamp tokens_requested",
    "outputFormat": "Q lines, each containing `ACCEPTED` or `REJECTED`.",
    "constraints": [
      "1 <= C <= 1000",
      "1 <= R <= 100",
      "1 <= Q <= 1000",
      "0 <= timestamp <= 100000",
      "timestamps non-decreasing"
    ],
    "sampleInput": "10 2 4\n0 5\n1 4\n1 8\n5 8",
    "sampleOutput": "ACCEPTED\nACCEPTED\nREJECTED\nACCEPTED",
    "kapilIntuition": "Mentorship By Kapil: Token Bucket handles bursts cleanly. On request at time T, calculate `tokens = min(C, current_tokens + (T - last_T) * R)`. If `tokens >= K`, accept and subtract K.",
    "timeComplexity": "O(1) per query",
    "spaceComplexity": "O(1)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "10 2 4\n0 5\n1 4\n1 8\n5 8",
        "expectedOutput": "ACCEPTED\nACCEPTED\nREJECTED\nACCEPTED",
        "isHidden": false,
        "explanation": "T=0 has 10 tokens, uses 5. At T=1 refilled 2 tokens (total 7), uses 4 (remaining 3). At T=1 requested 8 -> REJECTED. At T=5 refilled 8 (capped at 10), uses 8 -> ACCEPTED."
      },
      {
        "id": "tc-2",
        "input": "5 1 2\n0 6\n1 1",
        "expectedOutput": "REJECTED\nACCEPTED",
        "isHidden": false,
        "explanation": "Requesting 6 when capacity is 5 is rejected."
      },
      {
        "id": "tc-3",
        "input": "10 5 3\n0 10\n1 5\n1 2",
        "expectedOutput": "ACCEPTED\nACCEPTED\nREJECTED",
        "isHidden": true,
        "explanation": "At T=1 refilled 5 tokens, used 5, next 2 rejected."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int C, R, Q;\n    if (scanf(\"%d %d %d\", &C, &R, &Q) != 3) return 0;\n    // Implement Token Bucket Rate Limiter\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int C, R, Q;\n    if (!(cin >> C >> R >> Q)) return 0;\n    // Implement Token Bucket Rate Limiter\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int C = sc.nextInt();\n        int R = sc.nextInt();\n        int Q = sc.nextInt();\n        // Implement Token Bucket Rate Limiter\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement Token Bucket Rate Limiter\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int C, R, Q;\n    if (scanf(\"%d %d %d\", &C, &R, &Q) != 3) return 0;\n    double tokens = C;\n    int last_t = 0;\n\n    for (int i = 0; i < Q; ++i) {\n        int t, k;\n        scanf(\"%d %d\", &t, &k);\n        int dt = t - last_t;\n        tokens += (double)dt * R;\n        if (tokens > C) tokens = C;\n        last_t = t;\n\n        if (tokens >= k) {\n            tokens -= k;\n            printf(\"ACCEPTED\\n\");\n        } else {\n            printf(\"REJECTED\\n\");\n        }\n    }\n    return 0;\n}",
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int C, R, Q;\n    if (!(cin >> C >> R >> Q)) return 0;\n    double tokens = C;\n    int lastT = 0;\n\n    for (int i = 0; i < Q; ++i) {\n        int t, k;\n        cin >> t >> k;\n        int dt = t - lastT;\n        tokens = min(static_cast<double>(C), tokens + dt * R);\n        lastT = t;\n\n        if (tokens >= k) {\n            tokens -= k;\n            cout << \"ACCEPTED\\n\";\n        } else {\n            cout << \"REJECTED\\n\";\n        }\n    }\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int C = sc.nextInt();\n        int R = sc.nextInt();\n        int Q = sc.nextInt();\n        double tokens = C;\n        int lastT = 0;\n\n        for (int i = 0; i < Q; i++) {\n            int t = sc.nextInt();\n            int k = sc.nextInt();\n            int dt = t - lastT;\n            tokens = Math.min((double)C, tokens + (double)dt * R);\n            lastT = t;\n\n            if (tokens >= k) {\n                tokens -= k;\n                System.out.println(\"ACCEPTED\");\n            } else {\n                System.out.println(\"REJECTED\");\n            }\n        }\n    }\n}",
      "python": "import sys\n\ndef main():\n    tokens_in = sys.stdin.read().split()\n    if not tokens_in:\n        return\n    C = int(tokens_in[0])\n    R = int(tokens_in[1])\n    Q = int(tokens_in[2])\n    idx = 3\n    tokens = float(C)\n    last_t = 0\n    out = []\n    for _ in range(Q):\n        t = int(tokens_in[idx])\n        k = int(tokens_in[idx+1])\n        idx += 2\n        dt = t - last_t\n        tokens = min(float(C), tokens + dt * R)\n        last_t = t\n        if tokens >= k:\n            tokens -= k\n            out.append(\"ACCEPTED\")\n        else:\n            out.append(\"REJECTED\")\n    print(\"\\n\".join(out))\n\nif __name__ == '__main__':\n    main()"
    }
  },
  {
    "id": "d16-ch-10",
    "day": 16,
    "title": "Distributed Vector Cache & RAG Semantic Context Assembler",
    "difficulty": "Hard",
    "moduleTag": "17. Event Streaming & Vector Architecture",
    "companies": [
      "Google DeepMind",
      "OpenAI",
      "Meta AI",
      "Microsoft AI"
    ],
    "platforms": [
      "LLM & RAG Infrastructure"
    ],
    "problemStatement": "Given an LLM context token budget B and N document chunks. Each chunk has `id text token_cost similarity_score`. Select chunks that maximize total similarity score within the token budget B (0/1 Knapsack with floating point value / integer cost). If total similarity is tied, prefer the subset with smaller total token cost. Output the sorted list of chosen chunk IDs and total similarity formatted to 2 decimal places.",
    "inputFormat": "First line: N B (chunks count, token budget).\nNext N lines: id text token_cost similarity_score",
    "outputFormat": "First line: space-separated chunk IDs in numerical order.\nSecond line: `SCORE: <total_similarity>`",
    "constraints": [
      "1 <= N <= 30",
      "1 <= B <= 1000",
      "1 <= token_cost <= B",
      "0.0 <= similarity_score <= 1.0"
    ],
    "sampleInput": "3 10\n1 ChunkA 4 0.85\n2 ChunkB 6 0.90\n3 ChunkC 5 0.70",
    "sampleOutput": "1 2\nSCORE: 1.75",
    "kapilIntuition": "Mentorship By Kapil: RAG context assembling balances relevance against context window size limits. Formulate as 0/1 Knapsack dynamic programming using integer token costs to track chosen items.",
    "timeComplexity": "O(N * B)",
    "spaceComplexity": "O(N * B)",
    "testCases": [
      {
        "id": "tc-1",
        "input": "3 10\n1 ChunkA 4 0.85\n2 ChunkB 6 0.90\n3 ChunkC 5 0.70",
        "expectedOutput": "1 2\nSCORE: 1.75",
        "isHidden": false,
        "explanation": "Chunk 1 (4 tokens) + Chunk 2 (6 tokens) = 10 tokens, score = 1.75."
      },
      {
        "id": "tc-2",
        "input": "2 5\n1 Intro 6 0.95\n2 Summary 3 0.80",
        "expectedOutput": "2\nSCORE: 0.80",
        "isHidden": false,
        "explanation": "Chunk 1 exceeds budget of 5 tokens."
      },
      {
        "id": "tc-3",
        "input": "3 10\n1 Doc1 3 0.50\n2 Doc2 3 0.50\n3 Doc3 4 0.50",
        "expectedOutput": "1 2 3\nSCORE: 1.50",
        "isHidden": true,
        "explanation": "All three fit in 10 tokens (3+3+4=10)."
      }
    ],
    "starterCode": {
      "c": "#include <stdio.h>\n\nint main() {\n    int N, B;\n    if (scanf(\"%d %d\", &N, &B) != 2) return 0;\n    // Implement RAG Context Assembler\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N, B;\n    if (!(cin >> N >> B)) return 0;\n    // Implement RAG Context Assembler\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int N = sc.nextInt();\n        int B = sc.nextInt();\n        // Implement RAG Context Assembler\n    }\n}",
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    # Implement RAG Context Assembler\n\nif __name__ == '__main__':\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct {\n    int id;\n    char text[32];\n    int cost;\n    double score;\n} Chunk;\n\nint cmp_int(const void* a, const void* b) {\n    return (*(const int*)a) - (*(const int*)b);\n}\n\nint main() {\n    int N, B;\n    if (scanf(\"%d %d\", &N, &B) != 2) return 0;\n    Chunk chunks[35];\n    for (int i = 0; i < N; ++i) {\n        scanf(\"%d %s %d %lf\", &chunks[i].id, chunks[i].text, &chunks[i].cost, &chunks[i].score);\n    }\n\n    double dp[35][1005];\n    int take[35][1005];\n    memset(dp, 0, sizeof(dp));\n    memset(take, 0, sizeof(take));\n\n    for (int i = 1; i <= N; ++i) {\n        int c = chunks[i-1].cost;\n        double s = chunks[i-1].score;\n        for (int w = 0; w <= B; ++w) {\n            dp[i][w] = dp[i-1][w];\n            if (w >= c && dp[i-1][w-c] + s > dp[i][w] + 1e-9) {\n                dp[i][w] = dp[i-1][w-c] + s;\n                take[i][w] = 1;\n            }\n        }\n    }\n\n    int curr_w = B;\n    int chosen[35];\n    int count = 0;\n    for (int i = N; i >= 1; --i) {\n        if (take[i][curr_w]) {\n            chosen[count++] = chunks[i-1].id;\n            curr_w -= chunks[i-1].cost;\n        }\n    }\n\n    qsort(chosen, count, sizeof(int), cmp_int);\n    for (int i = 0; i < count; ++i) {\n        printf(\"%d%c\", chosen[i], i == count - 1 ? '\\n' : ' ');\n    }\n    printf(\"SCORE: %.2f\\n\", dp[N][B]);\n    return 0;\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <iomanip>\n\nusing namespace std;\n\nstruct Chunk {\n    int id;\n    string text;\n    int cost;\n    double score;\n};\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int N, B;\n    if (!(cin >> N >> B)) return 0;\n    vector<Chunk> chunks(N);\n    for (int i = 0; i < N; ++i) {\n        cin >> chunks[i].id >> chunks[i].text >> chunks[i].cost >> chunks[i].score;\n    }\n\n    vector<vector<double>> dp(N + 1, vector<double>(B + 1, 0.0));\n    vector<vector<bool>> take(N + 1, vector<bool>(B + 1, false));\n\n    for (int i = 1; i <= N; ++i) {\n        int c = chunks[i - 1].cost;\n        double s = chunks[i - 1].score;\n        for (int w = 0; w <= B; ++w) {\n            dp[i][w] = dp[i - 1][w];\n            if (w >= c && dp[i - 1][w - c] + s > dp[i][w] + 1e-9) {\n                dp[i][w] = dp[i - 1][w - c] + s;\n                take[i][w] = true;\n            }\n        }\n    }\n\n    int currW = B;\n    vector<int> chosen;\n    for (int i = N; i >= 1; --i) {\n        if (take[i][currW]) {\n            chosen.push_back(chunks[i - 1].id);\n            currW -= chunks[i - 1].cost;\n        }\n    }\n    sort(chosen.begin(), chosen.end());\n\n    for (size_t i = 0; i < chosen.size(); ++i) {\n        cout << chosen[i] << (i + 1 == chosen.size() ? \"\" : \" \");\n    }\n    cout << fixed << setprecision(2) << \"\\nSCORE: \" << dp[N][B] << \"\\n\";\n    return 0;\n}",
      "java": "package com.faang.challenges;\n\nimport java.util.*;\n\npublic class Solution {\n    static class Chunk {\n        int id;\n        String text;\n        int cost;\n        double score;\n        Chunk(int id, String text, int cost, double score) {\n            this.id = id;\n            this.text = text;\n            this.cost = cost;\n            this.score = score;\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int N = sc.nextInt();\n        int B = sc.nextInt();\n        List<Chunk> chunks = new ArrayList<>();\n        for (int i = 0; i < N; i++) {\n            chunks.add(new Chunk(sc.nextInt(), sc.next(), sc.nextInt(), sc.nextDouble()));\n        }\n\n        double[][] dp = new double[N + 1][B + 1];\n        boolean[][] take = new boolean[N + 1][B + 1];\n\n        for (int i = 1; i <= N; i++) {\n            int c = chunks.get(i - 1).cost;\n            double s = chunks.get(i - 1).score;\n            for (int w = 0; w <= B; w++) {\n                dp[i][w] = dp[i - 1][w];\n                if (w >= c && dp[i - 1][w - c] + s > dp[i][w] + 1e-9) {\n                    dp[i][w] = dp[i - 1][w - c] + s;\n                    take[i][w] = true;\n                }\n            }\n        }\n\n        int currW = B;\n        List<Integer> chosen = new ArrayList<>();\n        for (int i = N; i >= 1; i--) {\n            if (take[i][currW]) {\n                chosen.add(chunks.get(i - 1).id);\n                currW -= chunks.get(i - 1).cost;\n            }\n        }\n        Collections.sort(chosen);\n\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < chosen.size(); i++) {\n            sb.append(chosen.get(i)).append(i + 1 == chosen.size() ? \"\" : \" \");\n        }\n        System.out.println(sb.toString());\n        System.out.printf(Locale.US, \"SCORE: %.2f%n\", dp[N][B]);\n    }\n}",
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    N = int(tokens[0])\n    B = int(tokens[1])\n    idx = 2\n    chunks = []\n    for _ in range(N):\n        cid = int(tokens[idx])\n        text = tokens[idx+1]\n        cost = int(tokens[idx+2])\n        score = float(tokens[idx+3])\n        idx += 4\n        chunks.append((cid, text, cost, score))\n\n    dp = [[0.0] * (B + 1) for _ in range(N + 1)]\n    take = [[False] * (B + 1) for _ in range(N + 1)]\n\n    for i in range(1, N + 1):\n        cid, text, c, s = chunks[i - 1]\n        for w in range(B + 1):\n            dp[i][w] = dp[i - 1][w]\n            if w >= c and dp[i - 1][w - c] + s > dp[i][w] + 1e-9:\n                dp[i][w] = dp[i - 1][w - c] + s\n                take[i][w] = True\n\n    curr_w = B\n    chosen = []\n    for i in range(N, 0, -1):\n        if take[i][curr_w]:\n            chosen.append(chunks[i - 1][0])\n            curr_w -= chunks[i - 1][2]\n\n    chosen.sort()\n    print(\" \".join(map(str, chosen)))\n    print(f\"SCORE: {dp[N][B]:.2f}\")\n\nif __name__ == '__main__':\n    main()"
    }
  }
];
