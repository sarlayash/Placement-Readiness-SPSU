const fs = require('fs');
const path = require('path');

const challenges = [
  // 1. Distributed Partitioned Commit Log
  {
    id: 'd16-ch-1',
    day: 16,
    title: 'Distributed Partitioned Commit Log & Offset Watermark Tracker',
    difficulty: 'Medium',
    moduleTag: '17. Event Streaming & Vector Architecture',
    companies: ['Google', 'LinkedIn', 'Uber', 'Netflix'],
    platforms: ['FAANG Distributed Lab'],
    problemStatement:
      'Design a partitioned commit log with P partitions (0 to P-1). You are given Q operations:\n- `APPEND key partition_id payload`: Append record to partition_id, returning monotonic partition offset.\n- `READ partition_id offset`: Return payload at offset in partition_id, or `EMPTY` if offset is not yet committed.\n- `WATERMARK partition_id`: Output the latest committed offset for partition_id (-1 if empty).',
    inputFormat: 'First line: P Q (partitions count, queries count).\nNext Q lines: operation details.',
    outputFormat: 'Output result of each operation on a new line.',
    constraints: ['1 <= P <= 16', '1 <= Q <= 1000', '0 <= partition_id < P'],
    sampleInput: '2 5\nAPPEND k1 0 LOGIN\nAPPEND k2 0 LOGOUT\nREAD 0 1\nWATERMARK 0\nWATERMARK 1',
    sampleOutput: '0\n1\nLOGOUT\n1\n-1',
    kapilIntuition:
      'Mentorship By Kapil: Maintain an independent array of records per partition. Sequential appends increment that partition\'s next offset. Lookups by offset are direct O(1) index accesses.',
    timeComplexity: 'O(1) append, O(1) read',
    spaceComplexity: 'O(P * N)',
    testCases: [
      { id: 'tc-1', input: '2 5\nAPPEND k1 0 LOGIN\nAPPEND k2 0 LOGOUT\nREAD 0 1\nWATERMARK 0\nWATERMARK 1', expectedOutput: '0\n1\nLOGOUT\n1\n-1', isHidden: false, explanation: 'Two items appended to partition 0 with offsets 0 and 1.' },
      { id: 'tc-2', input: '1 3\nREAD 0 0\nWATERMARK 0\nAPPEND a 0 DATA', expectedOutput: 'EMPTY\n-1\n0', isHidden: false, explanation: 'Empty read gives EMPTY, watermark gives -1.' },
      { id: 'tc-3', input: '3 4\nAPPEND a 2 PAYLOAD_A\nAPPEND b 2 PAYLOAD_B\nREAD 2 0\nWATERMARK 2', expectedOutput: '0\n1\nPAYLOAD_A\n1', isHidden: true, explanation: 'Partition 2 handles offsets 0 and 1.' }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int P, Q;
    if (scanf("%d %d", &P, &Q) != 2) return 0;
    // Implement partitioned commit log
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    int P, Q;
    if (!(cin >> P >> Q)) return 0;
    // Implement partitioned commit log
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int P = sc.nextInt();
        int Q = sc.nextInt();
        // Implement partitioned commit log
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    P, Q = int(lines[0]), int(lines[1])
    # Implement partitioned commit log

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

#define MAX_P 16
#define MAX_RECS 200

typedef struct {
    char key[32];
    char payload[64];
} Record;

Record logs[MAX_P][MAX_RECS];
int counts[MAX_P];

int main() {
    int P, Q;
    if (scanf("%d %d", &P, &Q) != 2) return 0;
    memset(counts, 0, sizeof(counts));
    char cmd[32];
    for (int i = 0; i < Q; ++i) {
        if (scanf("%s", cmd) != 1) break;
        if (strcmp(cmd, "APPEND") == 0) {
            char key[32], payload[64];
            int p;
            scanf("%s %d %s", key, &p, payload);
            int off = counts[p]++;
            strcpy(logs[p][off].key, key);
            strcpy(logs[p][off].payload, payload);
            printf("%d\\n", off);
        } else if (strcmp(cmd, "READ") == 0) {
            int p, off;
            scanf("%d %d", &p, &off);
            if (off >= 0 && off < counts[p]) {
                printf("%s\\n", logs[p][off].payload);
            } else {
                printf("EMPTY\\n");
            }
        } else if (strcmp(cmd, "WATERMARK") == 0) {
            int p;
            scanf("%d", &p);
            printf("%d\\n", counts[p] - 1);
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

struct Record {
    string key;
    string payload;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int P, Q;
    if (!(cin >> P >> Q)) return 0;
    vector<vector<Record>> logs(P);
    string cmd;
    for (int i = 0; i < Q; ++i) {
        cin >> cmd;
        if (cmd == "APPEND") {
            string key, payload;
            int p;
            cin >> key >> p >> payload;
            int off = logs[p].size();
            logs[p].push_back({key, payload});
            cout << off << "\\n";
        } else if (cmd == "READ") {
            int p, off;
            cin >> p >> off;
            if (off >= 0 && off < static_cast<int>(logs[p].size())) {
                cout << logs[p][off].payload << "\\n";
            } else {
                cout << "EMPTY\\n";
            }
        } else if (cmd == "WATERMARK") {
            int p;
            cin >> p;
            cout << (static_cast<int>(logs[p].size()) - 1) << "\\n";
        }
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    static class Record {
        String key;
        String payload;
        Record(String key, String payload) {
            this.key = key;
            this.payload = payload;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int P = sc.nextInt();
        int Q = sc.nextInt();
        List<List<Record>> logs = new ArrayList<>();
        for (int i = 0; i < P; i++) logs.add(new ArrayList<>());

        for (int i = 0; i < Q; i++) {
            String cmd = sc.next();
            if (cmd.equals("APPEND")) {
                String key = sc.next();
                int p = sc.nextInt();
                String payload = sc.next();
                int off = logs.get(p).size();
                logs.get(p).add(new Record(key, payload));
                System.out.println(off);
            } else if (cmd.equals("READ")) {
                int p = sc.nextInt();
                int off = sc.nextInt();
                if (off >= 0 && off < logs.get(p).size()) {
                    System.out.println(logs.get(p).get(off).payload);
                } else {
                    System.out.println("EMPTY");
                }
            } else if (cmd.equals("WATERMARK")) {
                int p = sc.nextInt();
                System.out.println(logs.get(p).size() - 1);
            }
        }
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    P = int(tokens[0])
    Q = int(tokens[1])
    logs = [[] for _ in range(P)]
    idx = 2
    out = []
    for _ in range(Q):
        if idx >= len(tokens):
            break
        cmd = tokens[idx]
        idx += 1
        if cmd == "APPEND":
            key = tokens[idx]
            p = int(tokens[idx+1])
            payload = tokens[idx+2]
            idx += 3
            off = len(logs[p])
            logs[p].append((key, payload))
            out.append(str(off))
        elif cmd == "READ":
            p = int(tokens[idx])
            off = int(tokens[idx+1])
            idx += 2
            if 0 <= off < len(logs[p]):
                out.append(logs[p][off][1])
            else:
                out.append("EMPTY")
        elif cmd == "WATERMARK":
            p = int(tokens[idx])
            idx += 1
            out.append(str(len(logs[p]) - 1))
    print("\\n".join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 2. High-Dimensional Vector Cosine Similarity Search
  {
    id: 'd16-ch-2',
    day: 16,
    title: 'High-Dimensional Vector Cosine Similarity Search & Top-K Ranking',
    difficulty: 'Medium',
    moduleTag: '17. Event Streaming & Vector Architecture',
    companies: ['Google', 'Meta', 'OpenAI', 'Anthropic'],
    platforms: ['AI & RAG Lab'],
    problemStatement:
      'Given a query embedding vector of dimension D and N candidate document vectors (each with ID 1 to N), compute the Cosine Similarity between the query and each document. Rank the documents in descending order of similarity score (break ties with smaller ID). Output the IDs of the Top-K most similar documents.',
    inputFormat: 'First line: N D K\nSecond line: D floating-point numbers (query vector).\nNext N lines: D floating-point numbers for document i (1-indexed).',
    outputFormat: 'Output the Top-K document IDs on a single line separated by space.',
    constraints: ['1 <= N <= 1000', '1 <= D <= 128', '1 <= K <= N'],
    sampleInput: '3 3 2\n1.0 0.0 0.0\n0.8 0.6 0.0\n0.0 1.0 0.0\n0.9 0.1 0.0',
    sampleOutput: '3 1',
    kapilIntuition:
      'Mentorship By Kapil: Cosine Similarity = (A • B) / (||A|| * ||B||). Compute dot product and magnitudes in a single loop, sort candidates using a comparator on score descending, then tie-break on ID ascending.',
    timeComplexity: 'O(N * D + N log N)',
    spaceComplexity: 'O(N)',
    testCases: [
      { id: 'tc-1', input: '3 3 2\n1.0 0.0 0.0\n0.8 0.6 0.0\n0.0 1.0 0.0\n0.9 0.1 0.0', expectedOutput: '3 1', isHidden: false, explanation: 'Doc 3 has score ~0.993, Doc 1 has score 0.8, Doc 2 has score 0.' },
      { id: 'tc-2', input: '2 2 1\n0.5 0.5\n0.0 1.0\n1.0 0.0', expectedOutput: '1', isHidden: false, explanation: 'Both doc 1 and doc 2 have score 0.7071; tie-breaker chooses smaller ID 1.' },
      { id: 'tc-3', input: '4 2 3\n1.0 1.0\n1.0 1.0\n-1.0 -1.0\n0.5 0.5\n0.0 1.0', expectedOutput: '1 3 4', isHidden: true, explanation: 'Docs 1 and 3 match perfectly, doc 4 is next highest.' }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <math.h>

int main() {
    int N, D, K;
    if (scanf("%d %d %d", &N, &D, &K) != 3) return 0;
    // Compute Cosine Similarity and output top K IDs
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, D, K;
    if (!(cin >> N >> D >> K)) return 0;
    // Compute Cosine Similarity and output top K IDs
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int D = sc.nextInt();
        int K = sc.nextInt();
        // Compute Cosine Similarity and output top K IDs
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Compute Cosine Similarity and output top K IDs

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <math.h>

typedef struct {
    int id;
    double score;
} DocScore;

int cmp(const void* a, const void* b) {
    const DocScore* da = (const DocScore*)a;
    const DocScore* db = (const DocScore*)b;
    if (fabs(da->score - db->score) > 1e-9) {
        return da->score < db->score ? 1 : -1;
    }
    return da->id - db->id;
}

int main() {
    int N, D, K;
    if (scanf("%d %d %d", &N, &D, &K) != 3) return 0;
    double query[128];
    double norm_q = 0.0;
    for (int d = 0; d < D; ++d) {
        scanf("%lf", &query[d]);
        norm_q += query[d] * query[d];
    }
    norm_q = sqrt(norm_q);

    DocScore* docs = (DocScore*)malloc(N * sizeof(DocScore));
    for (int i = 0; i < N; ++i) {
        double dot = 0.0, norm_d = 0.0;
        for (int d = 0; d < D; ++d) {
            double val;
            scanf("%lf", &val);
            dot += val * query[d];
            norm_d += val * val;
        }
        norm_d = sqrt(norm_d);
        double denom = norm_q * norm_d;
        docs[i].id = i + 1;
        docs[i].score = denom < 1e-9 ? 0.0 : dot / denom;
    }

    qsort(docs, N, sizeof(DocScore), cmp);
    for (int i = 0; i < K; ++i) {
        printf("%d%c", docs[i].id, i == K - 1 ? '\\n' : ' ');
    }
    free(docs);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

struct DocScore {
    int id;
    double score;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N, D, K;
    if (!(cin >> N >> D >> K)) return 0;
    vector<double> query(D);
    double normQ = 0.0;
    for (int i = 0; i < D; ++i) {
        cin >> query[i];
        normQ += query[i] * query[i];
    }
    normQ = sqrt(normQ);

    vector<DocScore> docs(N);
    for (int i = 0; i < N; ++i) {
        double dot = 0.0, normD = 0.0;
        for (int j = 0; j < D; ++j) {
            double val;
            cin >> val;
            dot += val * query[j];
            normD += val * val;
        }
        normD = sqrt(normD);
        double denom = normQ * normD;
        docs[i] = {i + 1, denom < 1e-9 ? 0.0 : dot / denom};
    }

    sort(docs.begin(), docs.end(), [](const DocScore& a, const DocScore& b) {
        if (abs(a.score - b.score) > 1e-9) return a.score > b.score;
        return a.id < b.id;
    });

    for (int i = 0; i < K; ++i) {
        cout << docs[i].id << (i == K - 1 ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    static class DocScore {
        int id;
        double score;
        DocScore(int id, double score) {
            this.id = id;
            this.score = score;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int D = sc.nextInt();
        int K = sc.nextInt();
        double[] query = new double[D];
        double normQ = 0.0;
        for (int i = 0; i < D; i++) {
            query[i] = sc.nextDouble();
            normQ += query[i] * query[i];
        }
        normQ = Math.sqrt(normQ);

        List<DocScore> docs = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            double dot = 0.0, normD = 0.0;
            for (int j = 0; j < D; j++) {
                double val = sc.nextDouble();
                dot += val * query[j];
                normD += val * val;
            }
            normD = Math.sqrt(normD);
            double denom = normQ * normD;
            double score = denom < 1e-9 ? 0.0 : dot / denom;
            docs.add(new DocScore(i + 1, score));
        }

        docs.sort((a, b) -> {
            if (Math.abs(a.score - b.score) > 1e-9) {
                return Double.compare(b.score, a.score);
            }
            return Integer.compare(a.id, b.id);
        });

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < K; i++) {
            sb.append(docs.get(i).id).append(i == K - 1 ? "" : " ");
        }
        System.out.println(sb.toString());
    }
}`,
      python: `import sys
import math

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    N = int(tokens[0])
    D = int(tokens[1])
    K = int(tokens[2])
    idx = 3
    query = [float(tokens[idx + i]) for i in range(D)]
    idx += D
    norm_q = math.sqrt(sum(x * x for x in query))

    docs = []
    for doc_id in range(1, N + 1):
        vec = [float(tokens[idx + i]) for i in range(D)]
        idx += D
        dot = sum(a * b for a, b in zip(query, vec))
        norm_d = math.sqrt(sum(x * x for x in vec))
        denom = norm_q * norm_d
        score = dot / denom if denom > 1e-9 else 0.0
        docs.append((doc_id, score))

    docs.sort(key=lambda x: (-x[1], x[0]))
    result = [str(docs[i][0]) for i in range(K)]
    print(" ".join(result))

if __name__ == '__main__':
    main()`
    }
  },

  // 3. LSM-Tree MemTable Flush & Multi-Way SSTable Merge
  {
    id: 'd16-ch-3',
    day: 16,
    title: 'LSM-Tree MemTable Flush & Multi-Way SSTable Merge',
    difficulty: 'Hard',
    moduleTag: '17. Event Streaming & Vector Architecture',
    companies: ['Meta', 'Amazon', 'Databricks', 'Snowflake'],
    platforms: ['Storage Engine Lab'],
    problemStatement:
      'Given M sorted SSTables (each containing key-value pairs sorted lexicographically by key), and an in-memory MemTable with current key-value updates, perform a Compaction Merge. Higher-numbered SSTables represent newer writes than lower-numbered SSTables, and the MemTable is newest of all. If a key appears multiple times, retain ONLY the latest value. If the latest value is `TOMBSTONE`, the key was deleted and must be excluded entirely from the final merged output. Output all surviving keys and values sorted lexicographically by key.',
    inputFormat: 'First line: M (number of SSTables on disk).\nFor each SSTable: K_count followed by K_count lines `key value`.\nNext line: MemTable count followed by lines `key value`.',
    outputFormat: 'Print each surviving `key value` on a new line. Print `EMPTY` if no keys survive.',
    constraints: ['1 <= M <= 10', '0 <= K_count <= 200', '1 <= key_len <= 32'],
    sampleInput: '2\n2\napple 10\nbanana 20\n2\nbanana 25\ncherry 30\n1\nbanana TOMBSTONE',
    sampleOutput: 'apple 10\ncherry 30',
    kapilIntuition:
      'Mentorship By Kapil: Storage compaction resolves multi-version concurrency. Process SSTable 0 up to MemTable in increasing chronological order, storing the latest state in a dictionary/map. If value is TOMBSTONE, mark as deleted. Output remaining sorted keys.',
    timeComplexity: 'O(Total_Keys * log(Unique_Keys))',
    spaceComplexity: 'O(Unique_Keys)',
    testCases: [
      { id: 'tc-1', input: '2\n2\napple 10\nbanana 20\n2\nbanana 25\ncherry 30\n1\nbanana TOMBSTONE', expectedOutput: 'apple 10\ncherry 30', isHidden: false, explanation: 'banana is tombstoned in memtable so it is excluded.' },
      { id: 'tc-2', input: '1\n1\nx 100\n1\nx TOMBSTONE', expectedOutput: 'EMPTY', isHidden: false, explanation: 'Only key x is tombstoned, output EMPTY.' },
      { id: 'tc-3', input: '1\n2\na 1\nb 2\n1\nc 3', expectedOutput: 'a 1\nb 2\nc 3', isHidden: true, explanation: 'All keys survive and are printed sorted.' }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int M;
    if (scanf("%d", &M) != 1) return 0;
    // Implement LSM-Tree compaction
    return 0;
}`,
      cpp: `#include <iostream>
#include <map>
#include <string>

using namespace std;

int main() {
    int M;
    if (!(cin >> M)) return 0;
    // Implement LSM-Tree compaction
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int M = sc.nextInt();
        // Implement LSM-Tree compaction
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement LSM-Tree compaction

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char key[36];
    char val[36];
} Pair;

int cmp(const void* a, const void* b) {
    return strcmp(((const Pair*)a)->key, ((const Pair*)b)->key);
}

int main() {
    int M;
    if (scanf("%d", &M) != 1) return 0;
    Pair pairs[2000];
    int count = 0;

    for (int s = 0; s < M; ++s) {
        int k;
        scanf("%d", &k);
        for (int i = 0; i < k; ++i) {
            char kstr[36], vstr[36];
            scanf("%s %s", kstr, vstr);
            int found = -1;
            for (int j = 0; j < count; ++j) {
                if (strcmp(pairs[j].key, kstr) == 0) {
                    found = j;
                    break;
                }
            }
            if (found != -1) {
                strcpy(pairs[found].val, vstr);
            } else {
                strcpy(pairs[count].key, kstr);
                strcpy(pairs[count].val, vstr);
                count++;
            }
        }
    }

    int memCount;
    if (scanf("%d", &memCount) == 1) {
        for (int i = 0; i < memCount; ++i) {
            char kstr[36], vstr[36];
            scanf("%s %s", kstr, vstr);
            int found = -1;
            for (int j = 0; j < count; ++j) {
                if (strcmp(pairs[j].key, kstr) == 0) {
                    found = j;
                    break;
                }
            }
            if (found != -1) {
                strcpy(pairs[found].val, vstr);
            } else {
                strcpy(pairs[count].key, kstr);
                strcpy(pairs[count].val, vstr);
                count++;
            }
        }
    }

    qsort(pairs, count, sizeof(Pair), cmp);
    int printed = 0;
    for (int i = 0; i < count; ++i) {
        if (strcmp(pairs[i].val, "TOMBSTONE") != 0) {
            printf("%s %s\\n", pairs[i].key, pairs[i].val);
            printed++;
        }
    }
    if (printed == 0) {
        printf("EMPTY\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <map>
#include <string>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int M;
    if (!(cin >> M)) return 0;
    map<string, string> store;

    for (int s = 0; s < M; ++s) {
        int k;
        cin >> k;
        for (int i = 0; i < k; ++i) {
            string key, val;
            cin >> key >> val;
            store[key] = val;
        }
    }

    int memCount;
    if (cin >> memCount) {
        for (int i = 0; i < memCount; ++i) {
            string key, val;
            cin >> key >> val;
            store[key] = val;
        }
    }

    int printed = 0;
    for (const auto& [k, v] : store) {
        if (v != "TOMBSTONE") {
            cout << k << " " << v << "\\n";
            printed++;
        }
    }
    if (printed == 0) {
        cout << "EMPTY\\n";
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int M = sc.nextInt();
        Map<String, String> store = new TreeMap<>();

        for (int s = 0; s < M; s++) {
            int k = sc.nextInt();
            for (int i = 0; i < k; i++) {
                String key = sc.next();
                String val = sc.next();
                store.put(key, val);
            }
        }

        if (sc.hasNextInt()) {
            int memCount = sc.nextInt();
            for (int i = 0; i < memCount; i++) {
                String key = sc.next();
                String val = sc.next();
                store.put(key, val);
            }
        }

        int printed = 0;
        for (Map.Entry<String, String> entry : store.entrySet()) {
            if (!entry.getValue().equals("TOMBSTONE")) {
                System.out.println(entry.getKey() + " " + entry.getValue());
                printed++;
            }
        }
        if (printed == 0) {
            System.out.println("EMPTY");
        }
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    M = int(tokens[0])
    idx = 1
    store = {}
    for _ in range(M):
        k = int(tokens[idx])
        idx += 1
        for _ in range(k):
            key = tokens[idx]
            val = tokens[idx+1]
            idx += 2
            store[key] = val

    if idx < len(tokens):
        mem_k = int(tokens[idx])
        idx += 1
        for _ in range(mem_k):
            key = tokens[idx]
            val = tokens[idx+1]
            idx += 2
            store[key] = val

    surviving = [(k, v) for k, v in store.items() if v != "TOMBSTONE"]
    surviving.sort(key=lambda x: x[0])
    if not surviving:
        print("EMPTY")
    else:
        for k, v in surviving:
            print(f"{k} {v}")

if __name__ == '__main__':
    main()`
    }
  },

  // 4. Bloom Filter Probabilistic Query Pruning
  {
    id: 'd16-ch-4',
    day: 16,
    title: 'Bloom Filter Probabilistic Query Pruning with Hash Multipliers',
    difficulty: 'Medium',
    moduleTag: '17. Event Streaming & Vector Architecture',
    companies: ['Google', 'Akamai', 'Cloudflare', 'Cassandra'],
    platforms: ['Probabilistic Data Structures'],
    problemStatement:
      'Design a Bloom Filter with a bit array of size M (0 to M-1) and K hash functions: `h_i(x) = (hash(x) + i * 31) % M` for i = 0 to K-1, where `hash(x)` is the polynomial rolling hash `sum(c * 37^idx) % 1000000007`.\nGiven Q operations:\n- `ADD key`: Insert key into the Bloom Filter by setting K bits.\n- `CHECK key`: Return `MAYBE` if all K bits are set; otherwise return `NO`.',
    inputFormat: 'First line: M K Q\nNext Q lines: `ADD key` or `CHECK key`',
    outputFormat: 'For each `CHECK` operation, output `MAYBE` or `NO` on a new line.',
    constraints: ['8 <= M <= 10000', '1 <= K <= 10', '1 <= Q <= 1000', '1 <= key_len <= 32'],
    sampleInput: '16 2 4\nADD user1\nCHECK user1\nCHECK user2\nADD user2',
    sampleOutput: 'MAYBE\nNO',
    kapilIntuition:
      'Mentorship By Kapil: Bloom Filters guarantee zero false negatives. If even a single bit in the K positions is 0, the element is definitely not present (`NO`). If all K bits are 1, it is `MAYBE` present.',
    timeComplexity: 'O(K * len(key)) per operation',
    spaceComplexity: 'O(M) bits',
    testCases: [
      { id: 'tc-1', input: '16 2 4\nADD user1\nCHECK user1\nCHECK user2\nADD user2', expectedOutput: 'MAYBE\nNO', isHidden: false, explanation: 'user1 was added so it returns MAYBE. user2 was not added yet so it returns NO.' },
      { id: 'tc-2', input: '32 3 2\nCHECK alpha\nADD alpha', expectedOutput: 'NO', isHidden: false, explanation: 'Checking before add returns NO.' },
      { id: 'tc-3', input: '64 2 3\nADD doc_A\nADD doc_B\nCHECK doc_A', expectedOutput: 'MAYBE', isHidden: true, explanation: 'doc_A was added and bits are set.' }
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int M, K, Q;
    if (scanf("%d %d %d", &M, &K, &Q) != 3) return 0;
    // Implement Bloom Filter
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    int M, K, Q;
    if (!(cin >> M >> K >> Q)) return 0;
    // Implement Bloom Filter
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int M = sc.nextInt();
        int K = sc.nextInt();
        int Q = sc.nextInt();
        // Implement Bloom Filter
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement Bloom Filter

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

long long compute_hash(const char* str) {
    long long h = 0;
    long long p = 1;
    long long mod = 1000000007;
    for (int i = 0; str[i]; ++i) {
        h = (h + (unsigned char)str[i] * p) % mod;
        p = (p * 37) % mod;
    }
    return h;
}

int main() {
    int M, K, Q;
    if (scanf("%d %d %d", &M, &K, &Q) != 3) return 0;
    int bits[10005] = {0};
    char cmd[16], key[64];

    for (int q = 0; q < Q; ++q) {
        scanf("%s %s", cmd, key);
        long long base = compute_hash(key);
        if (strcmp(cmd, "ADD") == 0) {
            for (int i = 0; i < K; ++i) {
                int bit = (int)((base + (long long)i * 31) % M);
                bits[bit] = 1;
            }
        } else if (strcmp(cmd, "CHECK") == 0) {
            int all_set = 1;
            for (int i = 0; i < K; ++i) {
                int bit = (int)((base + (long long)i * 31) % M);
                if (!bits[bit]) {
                    all_set = 0;
                    break;
                }
            }
            if (all_set) printf("MAYBE\\n");
            else printf("NO\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

long long computeHash(const string& str) {
    long long h = 0;
    long long p = 1;
    long long mod = 1000000007;
    for (char c : str) {
        h = (h + static_cast<unsigned char>(c) * p) % mod;
        p = (p * 37) % mod;
    }
    return h;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int M, K, Q;
    if (!(cin >> M >> K >> Q)) return 0;
    vector<bool> bits(M, false);
    string cmd, key;

    for (int q = 0; q < Q; ++q) {
        cin >> cmd >> key;
        long long base = computeHash(key);
        if (cmd == "ADD") {
            for (int i = 0; i < K; ++i) {
                int bit = (base + i * 31LL) % M;
                bits[bit] = true;
            }
        } else if (cmd == "CHECK") {
            bool allSet = true;
            for (int i = 0; i < K; ++i) {
                int bit = (base + i * 31LL) % M;
                if (!bits[bit]) {
                    allSet = false;
                    break;
                }
            }
            cout << (allSet ? "MAYBE" : "NO") << "\\n";
        }
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    static long computeHash(String str) {
        long h = 0;
        long p = 1;
        long mod = 1000000007L;
        for (int i = 0; i < str.length(); i++) {
            h = (h + (long)str.charAt(i) * p) % mod;
            p = (p * 37) % mod;
        }
        return h;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int M = sc.nextInt();
        int K = sc.nextInt();
        int Q = sc.nextInt();
        boolean[] bits = new boolean[M];

        for (int q = 0; q < Q; q++) {
            String cmd = sc.next();
            String key = sc.next();
            long base = computeHash(key);
            if (cmd.equals("ADD")) {
                for (int i = 0; i < K; i++) {
                    int bit = (int)((base + (long)i * 31) % M);
                    bits[bit] = true;
                }
            } else if (cmd.equals("CHECK")) {
                boolean allSet = true;
                for (int i = 0; i < K; i++) {
                    int bit = (int)((base + (long)i * 31) % M);
                    if (!bits[bit]) {
                        allSet = false;
                        break;
                    }
                }
                System.out.println(allSet ? "MAYBE" : "NO");
            }
        }
    }
}`,
      python: `import sys

def compute_hash(s: str) -> int:
    h = 0
    p = 1
    mod = 1000000007
    for ch in s:
        h = (h + ord(ch) * p) % mod
        p = (p * 37) % mod
    return h

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    M = int(tokens[0])
    K = int(tokens[1])
    Q = int(tokens[2])
    bits = [False] * M
    idx = 3
    out = []
    for _ in range(Q):
        cmd = tokens[idx]
        key = tokens[idx+1]
        idx += 2
        base = compute_hash(key)
        if cmd == "ADD":
            for i in range(K):
                bit = (base + i * 31) % M
                bits[bit] = True
        elif cmd == "CHECK":
            all_set = True
            for i in range(K):
                bit = (base + i * 31) % M
                if not bits[bit]:
                    all_set = False
                    break
            out.append("MAYBE" if all_set else "NO")
    print("\\n".join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 5. Event-Time Streaming Window Aggregator
  {
    id: 'd16-ch-5',
    day: 16,
    title: 'Event-Time Streaming Window Aggregator with Watermark Handling',
    difficulty: 'Medium',
    moduleTag: '17. Event Streaming & Vector Architecture',
    companies: ['Uber', 'Apache Flink', 'Stripe', 'Google Cloud'],
    platforms: ['Stream Analytics Engine'],
    problemStatement:
      'Given a stream of N events with `(timestamp, value)` in seconds and a fixed tumbling window size W seconds. Events arrive out of order. A Watermark lags behind the maximum observed event timestamp by L seconds: `Watermark = max_observed_timestamp - L`. When a window closes (its `window_end <= Watermark`), emit the sum of values belonging to that window: `[window_start, window_end)`. Late events arriving with `timestamp < Watermark` are considered late and ignored. Emit closed windows in chronological order.',
    inputFormat: 'First line: N W L (event count, window size, allowed lag).\nNext N lines: timestamp value',
    outputFormat: 'For each closed window, output `[start,end): sum` on a new line. If no window closes, output `NONE`.',
    constraints: ['1 <= N <= 1000', '1 <= W <= 3600', '0 <= L <= 3600', '0 <= timestamp <= 1000000'],
    sampleInput: '4 10 5\n2 10\n8 20\n16 5\n22 50',
    sampleOutput: '[0,10): 30\n[10,20): 5',
    kapilIntuition:
      'Mentorship By Kapil: Windows close as the watermark moves forward. Calculate `Watermark = max_time - L`. Any window with `window_end <= Watermark` is closed and ready to emit.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    testCases: [
      { id: 'tc-1', input: '4 10 5\n2 10\n8 20\n16 5\n22 50', expectedOutput: '[0,10): 30\n[10,20): 5', isHidden: false, explanation: 'Max time 22 gives watermark 17. Windows [0,10) and [10,20) have closed.' },
      { id: 'tc-2', input: '2 60 10\n5 100\n10 200', expectedOutput: 'NONE', isHidden: false, explanation: 'Max time 10 gives watermark 0, so window [0,60) has not closed.' },
      { id: 'tc-3', input: '3 5 2\n1 10\n3 20\n8 30', expectedOutput: '[0,5): 30', isHidden: true, explanation: 'Max time 8 gives watermark 6, closing [0,5).' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, W, L;
    if (scanf("%d %d %d", &N, &W, &L) != 3) return 0;
    // Implement Streaming Window Aggregator
    return 0;
}`,
      cpp: `#include <iostream>
#include <map>

using namespace std;

int main() {
    int N, W, L;
    if (!(cin >> N >> W >> L)) return 0;
    // Implement Streaming Window Aggregator
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int W = sc.nextInt();
        int L = sc.nextInt();
        // Implement Streaming Window Aggregator
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement Streaming Window Aggregator

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    long long window_start;
    long long sum;
} WinRecord;

int cmp(const void* a, const void* b) {
    long long diff = ((const WinRecord*)a)->window_start - ((const WinRecord*)b)->window_start;
    return diff > 0 ? 1 : (diff < 0 ? -1 : 0);
}

int main() {
    int N, W, L;
    if (scanf("%d %d %d", &N, &W, &L) != 3) return 0;

    WinRecord wins[2000];
    int win_count = 0;
    long long max_time = -1;

    for (int i = 0; i < N; ++i) {
        long long t, v;
        scanf("%lld %lld", &t, &v);
        if (t > max_time) max_time = t;
        long long start = (t / W) * W;
        int found = -1;
        for (int j = 0; j < win_count; ++j) {
            if (wins[j].window_start == start) {
                found = j;
                break;
            }
        }
        if (found != -1) {
            wins[found].sum += v;
        } else {
            wins[win_count].window_start = start;
            wins[win_count].sum = v;
            win_count++;
        }
    }

    long long watermark = max_time - L;
    qsort(wins, win_count, sizeof(WinRecord), cmp);

    int printed = 0;
    for (int i = 0; i < win_count; ++i) {
        long long end = wins[i].window_start + W;
        if (end <= watermark) {
            printf("[%lld,%lld): %lld\\n", wins[i].window_start, end, wins[i].sum);
            printed++;
        }
    }
    if (printed == 0) printf("NONE\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <map>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N, W, L;
    if (!(cin >> N >> W >> L)) return 0;

    map<int64_t, int64_t> windows;
    int64_t maxTime = -1;

    for (int i = 0; i < N; ++i) {
        int64_t t, v;
        cin >> t >> v;
        if (t > maxTime) maxTime = t;
        int64_t start = (t / W) * W;
        windows[start] += v;
    }

    int64_t watermark = maxTime - L;
    int printed = 0;

    for (const auto& [start, sum] : windows) {
        int64_t end = start + W;
        if (end <= watermark) {
            cout << "[" << start << "," << end << "): " << sum << "\\n";
            printed++;
        }
    }
    if (printed == 0) cout << "NONE\\n";
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int W = sc.nextInt();
        int L = sc.nextInt();

        Map<Long, Long> windows = new TreeMap<>();
        long maxTime = -1;

        for (int i = 0; i < N; i++) {
            long t = sc.nextLong();
            long v = sc.nextLong();
            if (t > maxTime) maxTime = t;
            long start = (t / W) * W;
            windows.put(start, windows.getOrDefault(start, 0L) + v);
        }

        long watermark = maxTime - L;
        int printed = 0;

        for (Map.Entry<Long, Long> entry : windows.entrySet()) {
            long start = entry.getKey();
            long end = start + W;
            if (end <= watermark) {
                System.out.println("[" + start + "," + end + "): " + entry.getValue());
                printed++;
            }
        }
        if (printed == 0) System.out.println("NONE");
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    N = int(tokens[0])
    W = int(tokens[1])
    L = int(tokens[2])
    idx = 3
    windows = {}
    max_time = -1
    for _ in range(N):
        t = int(tokens[idx])
        v = int(tokens[idx+1])
        idx += 2
        if t > max_time:
            max_time = t
        start = (t // W) * W
        windows[start] = windows.get(start, 0) + v

    watermark = max_time - L
    closed_windows = sorted([s for s in windows.keys() if s + W <= watermark])
    if not closed_windows:
        print("NONE")
    else:
        for s in closed_windows:
            print(f"[{s},{s+W}): {windows[s]}")

if __name__ == '__main__':
    main()`
    }
  },

  // 6. Consumer Group Partition Rebalancing
  {
    id: 'd16-ch-6',
    day: 16,
    title: 'Consumer Group Partition Rebalancing & Sticky Assignment Protocol',
    difficulty: 'Medium',
    moduleTag: '17. Event Streaming & Vector Architecture',
    companies: ['LinkedIn', 'Apache Kafka', 'Confluent', 'Uber'],
    platforms: ['Distributed Systems Protocol'],
    problemStatement:
      'Given P partitions (0 to P-1) and C consumer instances (0 to C-1). Implement Round-Robin Partition Assignment. Partitions are assigned to consumers in cyclical order: partition i is assigned to consumer `(i % C)`. Output the list of partitions assigned to each consumer (format: `Consumer C_ID: [p1, p2, ...]`). If a consumer has no partitions, output `Consumer C_ID: []`.',
    inputFormat: 'A single line containing two integers: P C',
    outputFormat: 'C lines, each detailing the partitions assigned to consumer i (0 <= i < C).',
    constraints: ['1 <= P <= 100', '1 <= C <= 50'],
    sampleInput: '5 3',
    sampleOutput: 'Consumer 0: [0, 3]\nConsumer 1: [1, 4]\nConsumer 2: [2]',
    kapilIntuition:
      'Mentorship By Kapil: Partition assignment distributes streaming load across workers. Round-robin assignment guarantees maximum load disparity of at most 1 partition between any two consumers.',
    timeComplexity: 'O(P + C)',
    spaceComplexity: 'O(P)',
    testCases: [
      { id: 'tc-1', input: '5 3', expectedOutput: 'Consumer 0: [0, 3]\nConsumer 1: [1, 4]\nConsumer 2: [2]', isHidden: false, explanation: '5 partitions shared across 3 consumers.' },
      { id: 'tc-2', input: '2 3', expectedOutput: 'Consumer 0: [0]\nConsumer 1: [1]\nConsumer 2: []', isHidden: false, explanation: 'More consumers than partitions, consumer 2 gets empty assignment.' },
      { id: 'tc-3', input: '4 2', expectedOutput: 'Consumer 0: [0, 2]\nConsumer 1: [1, 3]', isHidden: true, explanation: 'Equal distribution of 2 partitions each.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int P, C;
    if (scanf("%d %d", &P, &C) != 2) return 0;
    // Implement Round-Robin Consumer Assignment
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int P, C;
    if (!(cin >> P >> C)) return 0;
    // Implement Round-Robin Consumer Assignment
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int P = sc.nextInt();
        int C = sc.nextInt();
        // Implement Round-Robin Consumer Assignment
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    P, C = int(lines[0]), int(lines[1])
    # Implement Round-Robin Consumer Assignment

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int P, C;
    if (scanf("%d %d", &P, &C) != 2) return 0;
    for (int c = 0; c < C; ++c) {
        printf("Consumer %d: [", c);
        int first = 1;
        for (int p = 0; p < P; ++p) {
            if (p % C == c) {
                if (!first) printf(", ");
                printf("%d", p);
                first = 0;
            }
        }
        printf("]\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int P, C;
    if (!(cin >> P >> C)) return 0;
    vector<vector<int>> assignments(C);
    for (int p = 0; p < P; ++p) {
        assignments[p % C].push_back(p);
    }
    for (int c = 0; c < C; ++c) {
        cout << "Consumer " << c << ": [";
        for (size_t i = 0; i < assignments[c].size(); ++i) {
            cout << assignments[c][i] << (i + 1 == assignments[c].size() ? "" : ", ");
        }
        cout << "]\\n";
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int P = sc.nextInt();
        int C = sc.nextInt();
        List<List<Integer>> assignments = new ArrayList<>();
        for (int i = 0; i < C; i++) assignments.add(new ArrayList<>());
        for (int p = 0; p < P; p++) {
            assignments.get(p % C).add(p);
        }
        for (int c = 0; c < C; c++) {
            System.out.print("Consumer " + c + ": [");
            List<Integer> list = assignments.get(c);
            for (int i = 0; i < list.size(); i++) {
                System.out.print(list.get(i) + (i + 1 == list.size() ? "" : ", "));
            }
            System.out.println("]");
        }
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    P, C = int(tokens[0]), int(tokens[1])
    assignments = [[] for _ in range(C)]
    for p in range(P):
        assignments[p % C].append(p)
    for c in range(C):
        print(f"Consumer {c}: [{', '.join(map(str, assignments[c]))}]")

if __name__ == '__main__':
    main()`
    }
  },

  // 7. HNSW Greedy Nearest Neighbor Traversal
  {
    id: 'd16-ch-7',
    day: 16,
    title: 'Hierarchical Navigable Small World (HNSW) Greedy Vector Traversal',
    difficulty: 'Hard',
    moduleTag: '17. Event Streaming & Vector Architecture',
    companies: ['OpenAI', 'Pinecone', 'Meta AI', 'Amazon Search'],
    platforms: ['Vector Search Engine'],
    problemStatement:
      'Given a graph of N vector nodes (1 to N) in 2D space `(x, y)` and bidirectional edges connecting neighbor nodes. Given an entry node E and a query coordinate `(qx, qy)`. Perform a Greedy Local Search: from current node, evaluate Euclidean distances to all connected neighbors. Transition to the neighbor that strictly minimizes distance to the query. Repeat until no neighbor is strictly closer than current node (local minimum reached). Output the traversal path of node IDs followed by the reached nearest neighbor ID.',
    inputFormat: 'First line: N M (nodes count, edges count).\nNext N lines: node_id x y\nNext M lines: u v (undirected edge)\nLast line: E qx qy (entry node, query coordinates)',
    outputFormat: 'First line: space-separated node IDs in order of traversal.\nSecond line: `NEAREST: <id>`',
    constraints: ['1 <= N <= 100', '1 <= M <= 500', '1 <= E <= N'],
    sampleInput: '4 4\n1 0 0\n2 5 0\n3 5 5\n4 0 5\n1 2\n2 3\n3 4\n4 1\n1 6 0',
    sampleOutput: '1 2\nNEAREST: 2',
    kapilIntuition:
      'Mentorship By Kapil: HNSW graph search navigates greedily through Delaunay-like graphs. At each step, measure Euclidean distance squared `(x - qx)^2 + (y - qy)^2` to all neighbors; pick the minimum. If min neighbor distance >= current distance, terminate.',
    timeComplexity: 'O(Degree * Steps)',
    spaceComplexity: 'O(N + M)',
    testCases: [
      { id: 'tc-1', input: '4 4\n1 0 0\n2 5 0\n3 5 5\n4 0 5\n1 2\n2 3\n3 4\n4 1\n1 6 0', expectedOutput: '1 2\nNEAREST: 2', isHidden: false, explanation: 'Node 2 at (5,0) is closer to (6,0) than node 1 at (0,0).' },
      { id: 'tc-2', input: '3 2\n1 0 0\n2 1 0\n3 2 0\n1 2\n2 3\n1 0 0', expectedOutput: '1\nNEAREST: 1', isHidden: false, explanation: 'Node 1 is already at the query position (0,0).' },
      { id: 'tc-3', input: '3 2\n1 0 0\n2 2 0\n3 4 0\n1 2\n2 3\n1 5 0', expectedOutput: '1 2 3\nNEAREST: 3', isHidden: true, explanation: 'Greedy jumps 1 -> 2 -> 3 toward (5,0).' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    // Implement HNSW Greedy Search
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, M;
    if (!(cin >> N >> M)) return 0;
    // Implement HNSW Greedy Search
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        // Implement HNSW Greedy Search
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement HNSW Greedy Search

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <math.h>

#define MAX_NODES 105

typedef struct {
    double x, y;
} Point;

Point pts[MAX_NODES];
int adj[MAX_NODES][MAX_NODES];
int deg[MAX_NODES];

double dist_sq(Point a, double qx, double qy) {
    double dx = a.x - qx;
    double dy = a.y - qy;
    return dx * dx + dy * dy;
}

int main() {
    int N, M;
    if (scanf("%d %d", &N, &M) != 2) return 0;
    for (int i = 0; i < N; ++i) {
        int id;
        scanf("%d", &id);
        scanf("%lf %lf", &pts[id].x, &pts[id].y);
        deg[id] = 0;
    }
    for (int i = 0; i < M; ++i) {
        int u, v;
        scanf("%d %d", &u, &v);
        adj[u][deg[u]++] = v;
        adj[v][deg[v]++] = u;
    }
    int curr;
    double qx, qy;
    scanf("%d %lf %lf", &curr, &qx, &qy);

    int path[200];
    int pcount = 0;
    path[pcount++] = curr;

    while (1) {
        double best_dist = dist_sq(pts[curr], qx, qy);
        int next_node = curr;
        for (int i = 0; i < deg[curr]; ++i) {
            int neighbor = adj[curr][i];
            double d = dist_sq(pts[neighbor], qx, qy);
            if (d < best_dist - 1e-9) {
                best_dist = d;
                next_node = neighbor;
            }
        }
        if (next_node == curr) break;
        curr = next_node;
        path[pcount++] = curr;
    }

    for (int i = 0; i < pcount; ++i) {
        printf("%d%c", path[i], i == pcount - 1 ? '\\n' : ' ');
    }
    printf("NEAREST: %d\\n", curr);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

struct Point {
    double x, y;
};

double distSq(const Point& a, double qx, double qy) {
    double dx = a.x - qx;
    double dy = a.y - qy;
    return dx * dx + dy * dy;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N, M;
    if (!(cin >> N >> M)) return 0;
    vector<Point> pts(N + 1);
    for (int i = 0; i < N; ++i) {
        int id;
        cin >> id;
        cin >> pts[id].x >> pts[id].y;
    }
    vector<vector<int>> adj(N + 1);
    for (int i = 0; i < M; ++i) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    int curr;
    double qx, qy;
    cin >> curr >> qx >> qy;

    vector<int> path = {curr};
    while (true) {
        double bestDist = distSq(pts[curr], qx, qy);
        int nextNode = curr;
        for (int neighbor : adj[curr]) {
            double d = distSq(pts[neighbor], qx, qy);
            if (d < bestDist - 1e-9) {
                bestDist = d;
                nextNode = neighbor;
            }
        }
        if (nextNode == curr) break;
        curr = nextNode;
        path.push_back(curr);
    }

    for (size_t i = 0; i < path.size(); ++i) {
        cout << path[i] << (i + 1 == path.size() ? "" : " ");
    }
    cout << "\\nNEAREST: " << curr << "\\n";
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    static class Point {
        double x, y;
        Point(double x, double y) {
            this.x = x;
            this.y = y;
        }
    }

    static double distSq(Point a, double qx, double qy) {
        double dx = a.x - qx;
        double dy = a.y - qy;
        return dx * dx + dy * dy;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int M = sc.nextInt();
        Map<Integer, Point> pts = new HashMap<>();
        for (int i = 0; i < N; i++) {
            int id = sc.nextInt();
            pts.put(id, new Point(sc.nextDouble(), sc.nextDouble()));
        }
        Map<Integer, List<Integer>> adj = new HashMap<>();
        for (int i = 1; i <= N; i++) adj.put(i, new ArrayList<>());
        for (int i = 0; i < M; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        int curr = sc.nextInt();
        double qx = sc.nextDouble();
        double qy = sc.nextDouble();

        List<Integer> path = new ArrayList<>();
        path.add(curr);

        while (true) {
            double bestDist = distSq(pts.get(curr), qx, qy);
            int nextNode = curr;
            for (int neighbor : adj.get(curr)) {
                double d = distSq(pts.get(neighbor), qx, qy);
                if (d < bestDist - 1e-9) {
                    bestDist = d;
                    nextNode = neighbor;
                }
            }
            if (nextNode == curr) break;
            curr = nextNode;
            path.add(curr);
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < path.size(); i++) {
            sb.append(path.get(i)).append(i + 1 == path.size() ? "" : " ");
        }
        System.out.println(sb.toString());
        System.out.println("NEAREST: " + curr);
    }
}`,
      python: `import sys

def dist_sq(pt, qx, qy):
    dx = pt[0] - qx
    dy = pt[1] - qy
    return dx * dx + dy * dy

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    N = int(tokens[0])
    M = int(tokens[1])
    idx = 2
    pts = {}
    for _ in range(N):
        nid = int(tokens[idx])
        x = float(tokens[idx+1])
        y = float(tokens[idx+2])
        idx += 3
        pts[nid] = (x, y)

    adj = {i: [] for i in pts}
    for _ in range(M):
        u = int(tokens[idx])
        v = int(tokens[idx+1])
        idx += 2
        adj[u].append(v)
        adj[v].append(u)

    curr = int(tokens[idx])
    qx = float(tokens[idx+1])
    qy = float(tokens[idx+2])

    path = [curr]
    while True:
        best_dist = dist_sq(pts[curr], qx, qy)
        next_node = curr
        for neighbor in adj[curr]:
            d = dist_sq(pts[neighbor], qx, qy)
            if d < best_dist - 1e-9:
                best_dist = d
                next_node = neighbor
        if next_node == curr:
            break
        curr = next_node
        path.append(curr)

    print(" ".join(map(str, path)))
    print(f"NEAREST: {curr}")

if __name__ == '__main__':
    main()`
    }
  },

  // 8. Write-Ahead Log (WAL) Crash Recovery
  {
    id: 'd16-ch-8',
    day: 16,
    title: 'Write-Ahead Log (WAL) Crash Recovery & Idempotent Replay Engine',
    difficulty: 'Medium',
    moduleTag: '17. Event Streaming & Vector Architecture',
    companies: ['PostgreSQL', 'SQLite', 'MongoDB', 'Couchbase'],
    platforms: ['Database Durability Engine'],
    problemStatement:
      'A database server crashes and restarts. It reads its raw on-disk Write-Ahead Log (WAL) containing records formatted as `LSN TX_ID OP KEY VAL` (Log Sequence Number, Transaction ID, Operation `SET` or `COMMIT` or `ABORT`, Key, Value).\nRules:\n1. Only transactions that reached a `COMMIT` record before the crash are durable and must be applied to the database state.\n2. Transactions without a `COMMIT` or with an `ABORT` record must be rolled back completely.\n3. Output the final state of all surviving keys sorted lexicographically. If database is empty, output `EMPTY`.',
    inputFormat: 'First line: L (number of WAL records).\nNext L lines: LSN TX_ID OP KEY VAL (or `LSN TX_ID COMMIT NONE NONE` / `LSN TX_ID ABORT NONE NONE`)',
    outputFormat: 'Sorted lines `KEY VAL` or `EMPTY`.',
    constraints: ['1 <= L <= 1000', '1 <= LSN <= 100000', '1 <= TX_ID <= 1000'],
    sampleInput: '5\n1 101 SET balance 100\n2 102 SET status PENDING\n3 101 COMMIT NONE NONE\n4 103 SET count 50\n5 102 ABORT NONE NONE',
    sampleOutput: 'balance 100',
    kapilIntuition:
      'Mentorship By Kapil: ARIES crash recovery algorithm separates uncommitted transactions from committed ones. Group mutation ops by TX_ID; filter only for transactions with an explicit COMMIT, then replay in order of LSN.',
    timeComplexity: 'O(L log U)',
    spaceComplexity: 'O(L)',
    testCases: [
      { id: 'tc-1', input: '5\n1 101 SET balance 100\n2 102 SET status PENDING\n3 101 COMMIT NONE NONE\n4 103 SET count 50\n5 102 ABORT NONE NONE', expectedOutput: 'balance 100', isHidden: false, explanation: 'Only TX 101 committed; TX 102 aborted and TX 103 never committed before crash.' },
      { id: 'tc-2', input: '2\n1 200 SET a 1\n2 200 ABORT NONE NONE', expectedOutput: 'EMPTY', isHidden: false, explanation: 'Transaction was aborted.' },
      { id: 'tc-3', input: '4\n1 300 SET a 10\n2 300 SET b 20\n3 300 COMMIT NONE NONE\n4 400 SET c 30', expectedOutput: 'a 10\nb 20', isHidden: true, explanation: 'Only 300 committed.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int L;
    if (scanf("%d", &L) != 1) return 0;
    // Implement WAL Recovery Engine
    return 0;
}`,
      cpp: `#include <iostream>
#include <map>
#include <string>

using namespace std;

int main() {
    int L;
    if (!(cin >> L)) return 0;
    // Implement WAL Recovery Engine
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int L = sc.nextInt();
        // Implement WAL Recovery Engine
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement WAL Recovery Engine

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct {
    int lsn;
    int tx_id;
    char op[16];
    char key[32];
    char val[32];
} WALRec;

typedef struct {
    char key[32];
    char val[32];
} KVPair;

int cmp(const void* a, const void* b) {
    return strcmp(((const KVPair*)a)->key, ((const KVPair*)b)->key);
}

int main() {
    int L;
    if (scanf("%d", &L) != 1) return 0;
    WALRec recs[1005];
    int committed_tx[1005] = {0};

    for (int i = 0; i < L; ++i) {
        scanf("%d %d %s %s %s", &recs[i].lsn, &recs[i].tx_id, recs[i].op, recs[i].key, recs[i].val);
        if (strcmp(recs[i].op, "COMMIT") == 0) {
            committed_tx[recs[i].tx_id] = 1;
        } else if (strcmp(recs[i].op, "ABORT") == 0) {
            committed_tx[recs[i].tx_id] = 0;
        }
    }

    KVPair db[1005];
    int db_count = 0;

    for (int i = 0; i < L; ++i) {
        if (strcmp(recs[i].op, "SET") == 0 && committed_tx[recs[i].tx_id]) {
            int found = -1;
            for (int j = 0; j < db_count; ++j) {
                if (strcmp(db[j].key, recs[i].key) == 0) {
                    found = j;
                    break;
                }
            }
            if (found != -1) {
                strcpy(db[found].val, recs[i].val);
            } else {
                strcpy(db[db_count].key, recs[i].key);
                strcpy(db[db_count].val, recs[i].val);
                db_count++;
            }
        }
    }

    qsort(db, db_count, sizeof(KVPair), cmp);
    if (db_count == 0) {
        printf("EMPTY\\n");
    } else {
        for (int i = 0; i < db_count; ++i) {
            printf("%s %s\\n", db[i].key, db[i].val);
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <set>

using namespace std;

struct WALRec {
    int lsn;
    int txId;
    string op;
    string key;
    string val;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int L;
    if (!(cin >> L)) return 0;
    vector<WALRec> recs(L);
    set<int> committedTx;

    for (int i = 0; i < L; ++i) {
        cin >> recs[i].lsn >> recs[i].txId >> recs[i].op >> recs[i].key >> recs[i].val;
        if (recs[i].op == "COMMIT") {
            committedTx.insert(recs[i].txId);
        } else if (recs[i].op == "ABORT") {
            committedTx.erase(recs[i].txId);
        }
    }

    map<string, string> db;
    for (const auto& r : recs) {
        if (r.op == "SET" && committedTx.count(r.txId)) {
            db[r.key] = r.val;
        }
    }

    if (db.empty()) {
        cout << "EMPTY\\n";
    } else {
        for (const auto& [k, v] : db) {
            cout << k << " " << v << "\\n";
        }
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    static class WALRec {
        int lsn, txId;
        String op, key, val;
        WALRec(int lsn, int txId, String op, String key, String val) {
            this.lsn = lsn;
            this.txId = txId;
            this.op = op;
            this.key = key;
            this.val = val;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int L = sc.nextInt();
        List<WALRec> recs = new ArrayList<>();
        Set<Integer> committed = new HashSet<>();

        for (int i = 0; i < L; i++) {
            int lsn = sc.nextInt();
            int tx = sc.nextInt();
            String op = sc.next();
            String key = sc.next();
            String val = sc.next();
            recs.add(new WALRec(lsn, tx, op, key, val));
            if (op.equals("COMMIT")) {
                committed.add(tx);
            } else if (op.equals("ABORT")) {
                committed.remove(tx);
            }
        }

        Map<String, String> db = new TreeMap<>();
        for (WALRec r : recs) {
            if (r.op.equals("SET") && committed.contains(r.txId)) {
                db.put(r.key, r.val);
            }
        }

        if (db.isEmpty()) {
            System.out.println("EMPTY");
        } else {
            for (Map.Entry<String, String> e : db.entrySet()) {
                System.out.println(e.getKey() + " " + e.getValue());
            }
        }
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    L = int(tokens[0])
    idx = 1
    recs = []
    committed = set()

    for _ in range(L):
        lsn = int(tokens[idx])
        tx = int(tokens[idx+1])
        op = tokens[idx+2]
        key = tokens[idx+3]
        val = tokens[idx+4]
        idx += 5
        recs.append((lsn, tx, op, key, val))
        if op == "COMMIT":
            committed.add(tx)
        elif op == "ABORT":
            committed.discard(tx)

    db = {}
    for lsn, tx, op, key, val in recs:
        if op == "SET" and tx in committed:
            db[key] = val

    if not db:
        print("EMPTY")
    else:
        for k in sorted(db.keys()):
            print(f"{k} {db[k]}")

if __name__ == '__main__':
    main()`
    }
  },

  // 9. Real-Time Sliding Window Rate-Limiter
  {
    id: 'd16-ch-9',
    day: 16,
    title: 'Real-Time Sliding Window Rate-Limiter with Token Influx',
    difficulty: 'Medium',
    moduleTag: '17. Event Streaming & Vector Architecture',
    companies: ['Cloudflare', 'Stripe', 'Twitter', 'Amazon'],
    platforms: ['API Gateway Engine'],
    problemStatement:
      'Design an API Gateway rate limiter with maximum capacity C tokens, refilling at rate R tokens per second. Tokens are capped at C. At t = 0, bucket starts with C tokens. When a request arrives at timestamp T requesting K tokens: if the bucket has at least K tokens after refilling for elapsed time, accept the request (`ACCEPTED`) and deduct K tokens. Otherwise, reject the request (`REJECTED`) and do not deduct tokens. Output the status for each request.',
    inputFormat: 'First line: C R Q (capacity, refill rate, queries count).\nNext Q lines: timestamp tokens_requested',
    outputFormat: 'Q lines, each containing `ACCEPTED` or `REJECTED`.',
    constraints: ['1 <= C <= 1000', '1 <= R <= 100', '1 <= Q <= 1000', '0 <= timestamp <= 100000', 'timestamps non-decreasing'],
    sampleInput: '10 2 4\n0 5\n1 4\n1 8\n5 8',
    sampleOutput: 'ACCEPTED\nACCEPTED\nREJECTED\nACCEPTED',
    kapilIntuition:
      'Mentorship By Kapil: Token Bucket handles bursts cleanly. On request at time T, calculate `tokens = min(C, current_tokens + (T - last_T) * R)`. If `tokens >= K`, accept and subtract K.',
    timeComplexity: 'O(1) per query',
    spaceComplexity: 'O(1)',
    testCases: [
      { id: 'tc-1', input: '10 2 4\n0 5\n1 4\n1 8\n5 8', expectedOutput: 'ACCEPTED\nACCEPTED\nREJECTED\nACCEPTED', isHidden: false, explanation: 'T=0 has 10 tokens, uses 5. At T=1 refilled 2 tokens (total 7), uses 4 (remaining 3). At T=1 requested 8 -> REJECTED. At T=5 refilled 8 (capped at 10), uses 8 -> ACCEPTED.' },
      { id: 'tc-2', input: '5 1 2\n0 6\n1 1', expectedOutput: 'REJECTED\nACCEPTED', isHidden: false, explanation: 'Requesting 6 when capacity is 5 is rejected.' },
      { id: 'tc-3', input: '10 5 3\n0 10\n1 5\n1 2', expectedOutput: 'ACCEPTED\nACCEPTED\nREJECTED', isHidden: true, explanation: 'At T=1 refilled 5 tokens, used 5, next 2 rejected.' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int C, R, Q;
    if (scanf("%d %d %d", &C, &R, &Q) != 3) return 0;
    // Implement Token Bucket Rate Limiter
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    int C, R, Q;
    if (!(cin >> C >> R >> Q)) return 0;
    // Implement Token Bucket Rate Limiter
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int C = sc.nextInt();
        int R = sc.nextInt();
        int Q = sc.nextInt();
        // Implement Token Bucket Rate Limiter
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement Token Bucket Rate Limiter

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int C, R, Q;
    if (scanf("%d %d %d", &C, &R, &Q) != 3) return 0;
    double tokens = C;
    int last_t = 0;

    for (int i = 0; i < Q; ++i) {
        int t, k;
        scanf("%d %d", &t, &k);
        int dt = t - last_t;
        tokens += (double)dt * R;
        if (tokens > C) tokens = C;
        last_t = t;

        if (tokens >= k) {
            tokens -= k;
            printf("ACCEPTED\\n");
        } else {
            printf("REJECTED\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int C, R, Q;
    if (!(cin >> C >> R >> Q)) return 0;
    double tokens = C;
    int lastT = 0;

    for (int i = 0; i < Q; ++i) {
        int t, k;
        cin >> t >> k;
        int dt = t - lastT;
        tokens = min(static_cast<double>(C), tokens + dt * R);
        lastT = t;

        if (tokens >= k) {
            tokens -= k;
            cout << "ACCEPTED\\n";
        } else {
            cout << "REJECTED\\n";
        }
    }
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int C = sc.nextInt();
        int R = sc.nextInt();
        int Q = sc.nextInt();
        double tokens = C;
        int lastT = 0;

        for (int i = 0; i < Q; i++) {
            int t = sc.nextInt();
            int k = sc.nextInt();
            int dt = t - lastT;
            tokens = Math.min((double)C, tokens + (double)dt * R);
            lastT = t;

            if (tokens >= k) {
                tokens -= k;
                System.out.println("ACCEPTED");
            } else {
                System.out.println("REJECTED");
            }
        }
    }
}`,
      python: `import sys

def main():
    tokens_in = sys.stdin.read().split()
    if not tokens_in:
        return
    C = int(tokens_in[0])
    R = int(tokens_in[1])
    Q = int(tokens_in[2])
    idx = 3
    tokens = float(C)
    last_t = 0
    out = []
    for _ in range(Q):
        t = int(tokens_in[idx])
        k = int(tokens_in[idx+1])
        idx += 2
        dt = t - last_t
        tokens = min(float(C), tokens + dt * R)
        last_t = t
        if tokens >= k:
            tokens -= k
            out.append("ACCEPTED")
        else:
            out.append("REJECTED")
    print("\\n".join(out))

if __name__ == '__main__':
    main()`
    }
  },

  // 10. Distributed Vector Cache & RAG Semantic Context Assembler
  {
    id: 'd16-ch-10',
    day: 16,
    title: 'Distributed Vector Cache & RAG Semantic Context Assembler',
    difficulty: 'Hard',
    moduleTag: '17. Event Streaming & Vector Architecture',
    companies: ['Google DeepMind', 'OpenAI', 'Meta AI', 'Microsoft AI'],
    platforms: ['LLM & RAG Infrastructure'],
    problemStatement:
      'Given an LLM context token budget B and N document chunks. Each chunk has `id text token_cost similarity_score`. Select chunks that maximize total similarity score within the token budget B (0/1 Knapsack with floating point value / integer cost). If total similarity is tied, prefer the subset with smaller total token cost. Output the sorted list of chosen chunk IDs and total similarity formatted to 2 decimal places.',
    inputFormat: 'First line: N B (chunks count, token budget).\nNext N lines: id text token_cost similarity_score',
    outputFormat: 'First line: space-separated chunk IDs in numerical order.\nSecond line: `SCORE: <total_similarity>`',
    constraints: ['1 <= N <= 30', '1 <= B <= 1000', '1 <= token_cost <= B', '0.0 <= similarity_score <= 1.0'],
    sampleInput: '3 10\n1 ChunkA 4 0.85\n2 ChunkB 6 0.90\n3 ChunkC 5 0.70',
    sampleOutput: '1 2\nSCORE: 1.75',
    kapilIntuition:
      'Mentorship By Kapil: RAG context assembling balances relevance against context window size limits. Formulate as 0/1 Knapsack dynamic programming using integer token costs to track chosen items.',
    timeComplexity: 'O(N * B)',
    spaceComplexity: 'O(N * B)',
    testCases: [
      { id: 'tc-1', input: '3 10\n1 ChunkA 4 0.85\n2 ChunkB 6 0.90\n3 ChunkC 5 0.70', expectedOutput: '1 2\nSCORE: 1.75', isHidden: false, explanation: 'Chunk 1 (4 tokens) + Chunk 2 (6 tokens) = 10 tokens, score = 1.75.' },
      { id: 'tc-2', input: '2 5\n1 Intro 6 0.95\n2 Summary 3 0.80', expectedOutput: '2\nSCORE: 0.80', isHidden: false, explanation: 'Chunk 1 exceeds budget of 5 tokens.' },
      { id: 'tc-3', input: '3 10\n1 Doc1 3 0.50\n2 Doc2 3 0.50\n3 Doc3 4 0.50', expectedOutput: '1 2 3\nSCORE: 1.50', isHidden: true, explanation: 'All three fit in 10 tokens (3+3+4=10).' }
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int N, B;
    if (scanf("%d %d", &N, &B) != 2) return 0;
    // Implement RAG Context Assembler
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N, B;
    if (!(cin >> N >> B)) return 0;
    // Implement RAG Context Assembler
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int B = sc.nextInt();
        // Implement RAG Context Assembler
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines:
        return
    # Implement RAG Context Assembler

if __name__ == '__main__':
    main()`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int id;
    char text[32];
    int cost;
    double score;
} Chunk;

int cmp_int(const void* a, const void* b) {
    return (*(const int*)a) - (*(const int*)b);
}

int main() {
    int N, B;
    if (scanf("%d %d", &N, &B) != 2) return 0;
    Chunk chunks[35];
    for (int i = 0; i < N; ++i) {
        scanf("%d %s %d %lf", &chunks[i].id, chunks[i].text, &chunks[i].cost, &chunks[i].score);
    }

    double dp[35][1005];
    int take[35][1005];
    memset(dp, 0, sizeof(dp));
    memset(take, 0, sizeof(take));

    for (int i = 1; i <= N; ++i) {
        int c = chunks[i-1].cost;
        double s = chunks[i-1].score;
        for (int w = 0; w <= B; ++w) {
            dp[i][w] = dp[i-1][w];
            if (w >= c && dp[i-1][w-c] + s > dp[i][w] + 1e-9) {
                dp[i][w] = dp[i-1][w-c] + s;
                take[i][w] = 1;
            }
        }
    }

    int curr_w = B;
    int chosen[35];
    int count = 0;
    for (int i = N; i >= 1; --i) {
        if (take[i][curr_w]) {
            chosen[count++] = chunks[i-1].id;
            curr_w -= chunks[i-1].cost;
        }
    }

    qsort(chosen, count, sizeof(int), cmp_int);
    for (int i = 0; i < count; ++i) {
        printf("%d%c", chosen[i], i == count - 1 ? '\\n' : ' ');
    }
    printf("SCORE: %.2f\\n", dp[N][B]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <iomanip>

using namespace std;

struct Chunk {
    int id;
    string text;
    int cost;
    double score;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N, B;
    if (!(cin >> N >> B)) return 0;
    vector<Chunk> chunks(N);
    for (int i = 0; i < N; ++i) {
        cin >> chunks[i].id >> chunks[i].text >> chunks[i].cost >> chunks[i].score;
    }

    vector<vector<double>> dp(N + 1, vector<double>(B + 1, 0.0));
    vector<vector<bool>> take(N + 1, vector<bool>(B + 1, false));

    for (int i = 1; i <= N; ++i) {
        int c = chunks[i - 1].cost;
        double s = chunks[i - 1].score;
        for (int w = 0; w <= B; ++w) {
            dp[i][w] = dp[i - 1][w];
            if (w >= c && dp[i - 1][w - c] + s > dp[i][w] + 1e-9) {
                dp[i][w] = dp[i - 1][w - c] + s;
                take[i][w] = true;
            }
        }
    }

    int currW = B;
    vector<int> chosen;
    for (int i = N; i >= 1; --i) {
        if (take[i][currW]) {
            chosen.push_back(chunks[i - 1].id);
            currW -= chunks[i - 1].cost;
        }
    }
    sort(chosen.begin(), chosen.end());

    for (size_t i = 0; i < chosen.size(); ++i) {
        cout << chosen[i] << (i + 1 == chosen.size() ? "" : " ");
    }
    cout << fixed << setprecision(2) << "\\nSCORE: " << dp[N][B] << "\\n";
    return 0;
}`,
      java: `package com.faang.challenges;

import java.util.*;

public class Solution {
    static class Chunk {
        int id;
        String text;
        int cost;
        double score;
        Chunk(int id, String text, int cost, double score) {
            this.id = id;
            this.text = text;
            this.cost = cost;
            this.score = score;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int B = sc.nextInt();
        List<Chunk> chunks = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            chunks.add(new Chunk(sc.nextInt(), sc.next(), sc.nextInt(), sc.nextDouble()));
        }

        double[][] dp = new double[N + 1][B + 1];
        boolean[][] take = new boolean[N + 1][B + 1];

        for (int i = 1; i <= N; i++) {
            int c = chunks.get(i - 1).cost;
            double s = chunks.get(i - 1).score;
            for (int w = 0; w <= B; w++) {
                dp[i][w] = dp[i - 1][w];
                if (w >= c && dp[i - 1][w - c] + s > dp[i][w] + 1e-9) {
                    dp[i][w] = dp[i - 1][w - c] + s;
                    take[i][w] = true;
                }
            }
        }

        int currW = B;
        List<Integer> chosen = new ArrayList<>();
        for (int i = N; i >= 1; i--) {
            if (take[i][currW]) {
                chosen.add(chunks.get(i - 1).id);
                currW -= chunks.get(i - 1).cost;
            }
        }
        Collections.sort(chosen);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < chosen.size(); i++) {
            sb.append(chosen.get(i)).append(i + 1 == chosen.size() ? "" : " ");
        }
        System.out.println(sb.toString());
        System.out.printf(Locale.US, "SCORE: %.2f%n", dp[N][B]);
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    N = int(tokens[0])
    B = int(tokens[1])
    idx = 2
    chunks = []
    for _ in range(N):
        cid = int(tokens[idx])
        text = tokens[idx+1]
        cost = int(tokens[idx+2])
        score = float(tokens[idx+3])
        idx += 4
        chunks.append((cid, text, cost, score))

    dp = [[0.0] * (B + 1) for _ in range(N + 1)]
    take = [[False] * (B + 1) for _ in range(N + 1)]

    for i in range(1, N + 1):
        cid, text, c, s = chunks[i - 1]
        for w in range(B + 1):
            dp[i][w] = dp[i - 1][w]
            if w >= c and dp[i - 1][w - c] + s > dp[i][w] + 1e-9:
                dp[i][w] = dp[i - 1][w - c] + s
                take[i][w] = True

    curr_w = B
    chosen = []
    for i in range(N, 0, -1):
        if take[i][curr_w]:
            chosen.append(chunks[i - 1][0])
            curr_w -= chunks[i - 1][2]

    chosen.sort()
    print(" ".join(map(str, chosen)))
    print(f"SCORE: {dp[N][B]:.2f}")

if __name__ == '__main__':
    main()`
    }
  }
];

const fileContent = `import { PracticalChallenge } from '../types';

export const DAY_16_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = ${JSON.stringify(challenges, null, 2)};
`;

const targetPath = path.join(__dirname, '../src/data/day16Challenges10.ts');
fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log('Successfully generated src/data/day16Challenges10.ts with 10 production-grade challenges.');
