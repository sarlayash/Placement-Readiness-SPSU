import { PracticalChallenge } from '../types';

/**
 * 10 Company-Oriented Placement Problems for Day 4 - Virtual Lab
 * Module 4: SQL & Relational Database Systems
 * Fully solved in C, C++, Java, and Python with step-by-step Execution Visualizations & Hidden Boundary Test Cases.
 */
export const DAY_4_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  {
    id: 'day4-p1-sql-execution-engine',
    day: 4,
    title: 'Relational Group-By & Having Aggregation Engine',
    difficulty: 'Medium',
    moduleTag: 'Relational Execution Order',
    companies: ['Amazon', 'Oracle', 'Microsoft', 'TCS Digital', 'Infosys'],
    platforms: ['LeetCode #596', 'HackerRank SQL', 'GeeksforGeeks'],
    problemStatement:
      'Given an array of employee records where each record contains (id, dept_id, salary), implement an in-memory SQL execution engine that simulates the query:\n\nSELECT dept_id, COUNT(*) as emp_count, AVG(salary) as avg_salary\nFROM Employees\nWHERE salary >= min_salary_filter\nGROUP BY dept_id\nHAVING COUNT(*) >= min_count_filter\nORDER BY avg_salary DESC, dept_id ASC;\n\nReturn the department IDs and their integer floor average salaries.',
    inputFormat:
      'Line 1: N (number of employees), min_salary_filter, min_count_filter\nNext N lines: id dept_id salary',
    outputFormat:
      'For each qualifying department on a new line: "DEPT <dept_id>: COUNT=<count> AVG=<floor_avg>" sorted by average salary descending.',
    constraints: [
      '1 <= N <= 10^5',
      '1 <= dept_id <= 10^4',
      '0 <= salary <= 10^7',
      '1 <= min_count_filter <= N',
    ],
    sampleInput: '6 50000 2\n1 101 60000\n2 101 80000\n3 102 75000\n4 103 90000\n5 103 110000\n6 101 40000',
    sampleOutput: 'DEPT 103: COUNT=2 AVG=100000\nDEPT 101: COUNT=2 AVG=70000',
    kapilIntuition:
      'Strictly mirror the SQL logical order: 1) First apply WHERE to filter out employee #6 (salary 40000 < 50000). 2) Group remaining records by dept_id. 3) Apply HAVING filter (count >= 2), which keeps Dept 103 (count 2) and Dept 101 (count 2) while discarding Dept 102 (count 1). 4) Sort by average salary descending.',
    timeComplexity: 'O(N log K) where N is number of rows and K is number of unique departments.',
    spaceComplexity: 'O(K) auxiliary space for department hash buckets.',
    starterCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

// Complete the Relational Engine Simulation
int main() {
    int n, min_sal, min_cnt;
    if (scanf("%d %d %d", &n, &min_sal, &min_cnt) != 3) return 0;
    
    // Write your logic here
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

// Complete the Relational Engine Simulation
int main() {
    int n, min_sal, min_cnt;
    if (!(cin >> n >> min_sal >> min_cnt)) return 0;
    
    // Write your logic here
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int minSal = sc.nextInt();
        int minCnt = sc.nextInt();
        
        // Write your logic here
    }
}`,
      python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    min_sal = int(input_data[1])
    min_cnt = int(input_data[2])
    
    # Write your logic here

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int dept;
    long long sum;
    int count;
} DeptGroup;

int cmp(const void* a, const void* b) {
    DeptGroup* da = (DeptGroup*)a;
    DeptGroup* db = (DeptGroup*)b;
    long long avgA = da->sum / da->count;
    long long avgB = db->sum / db->count;
    if (avgB != avgA) return (avgB > avgA) ? 1 : -1;
    return da->dept - db->dept;
}

int main() {
    int n, min_sal, min_cnt;
    if (scanf("%d %d %d", &n, &min_sal, &min_cnt) != 3) return 0;

    int deptList[10005] = {0};
    long long sums[10005] = {0};
    int counts[10005] = {0};
    int uniqueDepts[10005], uCount = 0;

    for (int i = 0; i < n; i++) {
        int id, dept, sal;
        scanf("%d %d %d", &id, &dept, &sal);
        if (sal >= min_sal) { // WHERE
            if (counts[dept] == 0) {
                uniqueDepts[uCount++] = dept;
            }
            sums[dept] += sal;
            counts[dept]++;
        }
    }

    DeptGroup qualified[10005];
    int qCount = 0;
    for (int i = 0; i < uCount; i++) {
        int d = uniqueDepts[i];
        if (counts[d] >= min_cnt) { // HAVING
            qualified[qCount].dept = d;
            qualified[qCount].sum = sums[d];
            qualified[qCount].count = counts[d];
            qCount++;
        }
    }

    qsort(qualified, qCount, sizeof(DeptGroup), cmp); // ORDER BY

    for (int i = 0; i < qCount; i++) {
        printf("DEPT %d: COUNT=%d AVG=%lld\\n", qualified[i].dept, qualified[i].count, qualified[i].sum / qualified[i].count);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

struct Group {
    int dept;
    long long sum;
    int count;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, min_sal, min_cnt;
    if (!(cin >> n >> min_sal >> min_cnt)) return 0;

    unordered_map<int, pair<long long, int>> groups; // dept -> (sum, count)
    for (int i = 0; i < n; i++) {
        int id, dept, sal;
        cin >> id >> dept >> sal;
        if (sal >= min_sal) { // WHERE
            groups[dept].first += sal;
            groups[dept].second += 1;
        }
    }

    vector<Group> result;
    for (auto& [dept, data] : groups) {
        if (data.second >= min_cnt) { // HAVING
            result.push_back({dept, data.first, data.second});
        }
    }

    sort(result.begin(), result.end(), [](const Group& a, const Group& b) {
        long long avgA = a.sum / a.count;
        long long avgB = b.sum / b.count;
        if (avgA != avgB) return avgA > avgB;
        return a.dept < b.dept;
    });

    for (const auto& g : result) {
        cout << "DEPT " << g.dept << ": COUNT=" << g.count << " AVG=" << (g.sum / g.count) << "\\n";
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    static class Group {
        int dept;
        long sum;
        int count;
        Group(int d, long s, int c) { dept = d; sum = s; count = c; }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int minSal = sc.nextInt();
        int minCnt = sc.nextInt();

        Map<Integer, long[]> map = new HashMap<>(); // dept -> [sum, count]
        for (int i = 0; i < n; i++) {
            int id = sc.nextInt();
            int dept = sc.nextInt();
            int sal = sc.nextInt();
            if (sal >= minSal) { // WHERE
                long[] curr = map.computeIfAbsent(dept, k -> new long[2]);
                curr[0] += sal;
                curr[1] += 1;
            }
        }

        List<Group> list = new ArrayList<>();
        for (var entry : map.entrySet()) {
            if (entry.getValue()[1] >= minCnt) { // HAVING
                list.add(new Group(entry.getKey(), entry.getValue()[0], (int)entry.getValue()[1]));
            }
        }

        list.sort((a, b) -> {
            long avgA = a.sum / a.count;
            long avgB = b.sum / b.count;
            if (avgA != avgB) return Long.compare(avgB, avgA);
            return Integer.compare(a.dept, b.dept);
        });

        for (Group g : list) {
            System.out.println("DEPT " + g.dept + ": COUNT=" + g.count + " AVG=" + (g.sum / g.count));
        }
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    min_sal = int(raw[1])
    min_cnt = int(raw[2])

    groups = {} # dept -> [sum, count]
    idx = 3
    for _ in range(n):
        eid = int(raw[idx])
        dept = int(raw[idx+1])
        sal = int(raw[idx+2])
        idx += 3
        if sal >= min_sal: # WHERE
            if dept not in groups:
                groups[dept] = [0, 0]
            groups[dept][0] += sal
            groups[dept][1] += 1

    result = []
    for dept, (total, count) in groups.items():
        if count >= min_cnt: # HAVING
            result.append((total // count, dept, count))

    # ORDER BY avg DESC, dept ASC
    result.sort(key=lambda x: (-x[0], x[1]))

    for avg, dept, count in result:
        print(f"DEPT {dept}: COUNT={count} AVG={avg}")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '6 50000 2\n1 101 60000\n2 101 80000\n3 102 75000\n4 103 90000\n5 103 110000\n6 101 40000',
        expectedOutput: 'DEPT 103: COUNT=2 AVG=100000\nDEPT 101: COUNT=2 AVG=70000',
        isHidden: false,
        explanation: 'WHERE salary >= 50000 removes record 6. HAVING count >= 2 eliminates Dept 102 (count 1).',
      },
      {
        id: 'tc2',
        input: '4 70000 1\n1 201 80000\n2 201 90000\n3 202 70000\n4 203 60000',
        expectedOutput: 'DEPT 201: COUNT=2 AVG=85000\nDEPT 202: COUNT=1 AVG=70000',
        isHidden: true,
        explanation: 'Dept 203 is removed by WHERE. Dept 201 avg is 85000, Dept 202 avg is 70000.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'WHERE Filtering Phase',
        description: 'Iterate through all N tuples; retain only tuples with salary >= min_salary.',
        variables: { min_salary: 50000, filtered_out_records: 1 },
      },
      {
        step: 2,
        label: 'GROUP BY Bucket Construction',
        description: 'Accumulate sum and count into department hash buckets.',
        variables: { dept_101: 'sum: 140000, count: 2', dept_102: 'sum: 75000, count: 1', dept_103: 'sum: 200000, count: 2' },
      },
      {
        step: 3,
        label: 'HAVING Group Qualification',
        description: 'Filter groups where count >= min_count. Dept 102 (count 1) is discarded.',
        variables: { qualifying_depts: '101, 103' },
      },
      {
        step: 4,
        label: 'ORDER BY Sort',
        description: 'Sort qualifying groups by floor(sum/count) descending.',
        variables: { top_dept: 103, top_avg: 100000 },
      },
    ],
  },
  {
    id: 'day4-p2-hash-join',
    day: 4,
    title: 'Relational Hash Join Implementation (INNER & LEFT JOIN)',
    difficulty: 'Medium',
    moduleTag: 'Join Algorithms',
    companies: ['Google', 'Amazon', 'Snowflake', 'Oracle'],
    platforms: ['LeetCode #175', 'HackerRank SQL', 'GeeksforGeeks'],
    problemStatement:
      'Given two relational tables represented as arrays of tuples: Table A (id, name, dept_id) and Table B (dept_id, dept_name, budget), implement the Relational Hash Join algorithm to output both INNER JOIN and LEFT OUTER JOIN.\n\nFor INNER JOIN, output matched records: (A.name, B.dept_name, B.budget).\nFor LEFT OUTER JOIN, if a record in Table A has no matching dept_id in Table B, output "NULL" for department fields.',
    inputFormat:
      'Line 1: N (number of employees in Table A), M (number of departments in Table B)\nNext N lines: id name dept_id\nNext M lines: dept_id dept_name budget',
    outputFormat:
      'Print INNER JOIN header followed by inner join results.\nPrint LEFT JOIN header followed by left join results.',
    constraints: [
      '1 <= N, M <= 10^4',
      'dept_id is a positive integer',
      'Names are non-empty alphanumeric strings without spaces',
    ],
    sampleInput: '3 2\n1 Arjun 101\n2 Priya 102\n3 Rohan 103\n101 Tech 500000\n102 Sales 300000',
    sampleOutput: 'INNER JOIN:\nArjun Tech 500000\nPriya Sales 300000\nLEFT JOIN:\nArjun Tech 500000\nPriya Sales 300000\nRohan NULL NULL',
    kapilIntuition:
      'A Hash Join operates in two phases: 1) Build Phase on Table B (build hash map of dept_id -> department info). 2) Probe Phase: iterate Table A. If dept_id exists in hash map, it is an INNER match. For LEFT JOIN, if absent, output table A name with "NULL NULL".',
    timeComplexity: 'O(N + M) average time for hash build and probe.',
    spaceComplexity: 'O(M) auxiliary space for building the hash table on Table B.',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

// Complete the Hash Join Simulation
int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    // Write your solution here
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Complete the Hash Join Simulation
int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;
    // Write your solution here
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int m = sc.nextInt();
        // Write your solution here
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    # Write your solution here

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

typedef struct {
    int dept_id;
    char name[30];
    int budget;
} Dept;

typedef struct {
    int id;
    char name[30];
    int dept_id;
} Emp;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;

    Emp emps[1005];
    for (int i = 0; i < n; i++) {
        scanf("%d %s %d", &emps[i].id, emps[i].name, &emps[i].dept_id);
    }

    Dept depts[1005];
    for (int j = 0; j < m; j++) {
        scanf("%d %s %d", &depts[j].dept_id, depts[j].name, &depts[j].budget);
    }

    printf("INNER JOIN:\\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (emps[i].dept_id == depts[j].dept_id) {
                printf("%s %s %d\\n", emps[i].name, depts[j].name, depts[j].budget);
                break;
            }
        }
    }

    printf("LEFT JOIN:\\n");
    for (int i = 0; i < n; i++) {
        int found = 0;
        for (int j = 0; j < m; j++) {
            if (emps[i].dept_id == depts[j].dept_id) {
                printf("%s %s %d\\n", emps[i].name, depts[j].name, depts[j].budget);
                found = 1;
                break;
            }
        }
        if (!found) {
            printf("%s NULL NULL\\n", emps[i].name);
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

struct Emp { int id; string name; int dept_id; };
struct DeptInfo { string name; int budget; };

int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;

    vector<Emp> emps(n);
    for (int i = 0; i < n; i++) {
        cin >> emps[i].id >> emps[i].name >> emps[i].dept_id;
    }

    unordered_map<int, DeptInfo> deptMap;
    for (int j = 0; j < m; j++) {
        int dId, budget;
        string dName;
        cin >> dId >> dName >> budget;
        deptMap[dId] = {dName, budget};
    }

    cout << "INNER JOIN:\\n";
    for (const auto& e : emps) {
        auto it = deptMap.find(e.dept_id);
        if (it != deptMap.end()) {
            cout << e.name << " " << it->second.name << " " << it->second.budget << "\\n";
        }
    }

    cout << "LEFT JOIN:\\n";
    for (const auto& e : emps) {
        auto it = deptMap.find(e.dept_id);
        if (it != deptMap.end()) {
            cout << e.name << " " << it->second.name << " " << it->second.budget << "\\n";
        } else {
            cout << e.name << " NULL NULL\\n";
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    record DeptInfo(String name, int budget) {}
    record Emp(int id, String name, int deptId) {}

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int m = sc.nextInt();

        List<Emp> emps = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            emps.add(new Emp(sc.nextInt(), sc.next(), sc.nextInt()));
        }

        Map<Integer, DeptInfo> deptMap = new HashMap<>();
        for (int j = 0; j < m; j++) {
            deptMap.put(sc.nextInt(), new DeptInfo(sc.next(), sc.nextInt()));
        }

        System.out.println("INNER JOIN:");
        for (Emp e : emps) {
            DeptInfo d = deptMap.get(e.deptId());
            if (d != null) {
                System.out.println(e.name() + " " + d.name() + " " + d.budget());
            }
        }

        System.out.println("LEFT JOIN:");
        for (Emp e : emps) {
            DeptInfo d = deptMap.get(e.deptId());
            if (d != null) {
                System.out.println(e.name() + " " + d.name() + " " + d.budget());
            } else {
                System.out.println(e.name() + " NULL NULL");
            }
        }
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    m = int(raw[1])
    idx = 2

    emps = []
    for _ in range(n):
        eid = int(raw[idx])
        ename = raw[idx+1]
        dept_id = int(raw[idx+2])
        emps.append((eid, ename, dept_id))
        idx += 3

    dept_map = {}
    for _ in range(m):
        did = int(raw[idx])
        dname = raw[idx+1]
        budget = int(raw[idx+2])
        dept_map[did] = (dname, budget)
        idx += 3

    print("INNER JOIN:")
    for eid, ename, did in emps:
        if did in dept_map:
            print(f"{ename} {dept_map[did][0]} {dept_map[did][1]}")

    print("LEFT JOIN:")
    for eid, ename, did in emps:
        if did in dept_map:
            print(f"{ename} {dept_map[did][0]} {dept_map[did][1]}")
        else:
            print(f"{ename} NULL NULL")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '3 2\n1 Arjun 101\n2 Priya 102\n3 Rohan 103\n101 Tech 500000\n102 Sales 300000',
        expectedOutput: 'INNER JOIN:\nArjun Tech 500000\nPriya Sales 300000\nLEFT JOIN:\nArjun Tech 500000\nPriya Sales 300000\nRohan NULL NULL',
        isHidden: false,
        explanation: 'Rohan has dept_id 103 which does not exist in Table B; INNER JOIN omits Rohan, LEFT JOIN prints NULL.',
      },
      {
        id: 'tc2',
        input: '2 1\n1 Maya 99\n2 Tara 99\n99 Operations 400000',
        expectedOutput: 'INNER JOIN:\nMaya Operations 400000\nTara Operations 400000\nLEFT JOIN:\nMaya Operations 400000\nTara Operations 400000',
        isHidden: true,
        explanation: 'Both rows match department 99, so INNER and LEFT joins yield identical output.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Build Phase',
        description: 'Construct hash map on Table B (Departments) with dept_id as key.',
        variables: { hash_keys: '101, 102', total_dept_buckets: 2 },
      },
      {
        step: 2,
        label: 'Probe Phase: Row 1 & 2',
        description: 'Lookup Arjun (101) and Priya (102). Both match; output for INNER & LEFT join.',
        variables: { row_1_match: 'Tech', row_2_match: 'Sales' },
      },
      {
        step: 3,
        label: 'Probe Phase: Row 3 (Unmatched)',
        description: 'Lookup Rohan (103). Key 103 not in hash table. Skip in INNER, emit NULL in LEFT JOIN.',
        variables: { row_3_status: 'Unmatched', output_left: 'Rohan NULL NULL' },
      },
    ],
  },
  {
    id: 'day4-p3-consecutive-logins',
    day: 4,
    title: 'Consecutive Days Active Streak Analyzer (Window LAG / LEAD)',
    difficulty: 'Medium',
    moduleTag: 'Window Functions',
    companies: ['Meta', 'Amazon', 'Spotify', 'TCS Digital'],
    platforms: ['LeetCode #180', 'HackerRank SQL', 'LeetCode #128'],
    problemStatement:
      'Given a table of user login dates, find all users who logged in for at least 3 consecutive calendar days.\n\nSimulate the SQL query using window analytical functions:\nSELECT DISTINCT user_id\nFROM (\n  SELECT user_id, login_date,\n         LAG(login_date, 1) OVER (PARTITION BY user_id ORDER BY login_date) as prev_1,\n         LAG(login_date, 2) OVER (PARTITION BY user_id ORDER BY login_date) as prev_2\n  FROM UserLogins\n) t\nWHERE DATEDIFF(login_date, prev_1) = 1 AND DATEDIFF(prev_1, prev_2) = 1;',
    inputFormat:
      'Line 1: N (number of login records)\nNext N lines: user_id day_number (1 to 365, sorted or unsorted)',
    outputFormat:
      'Sorted list of user_ids with >= 3 consecutive days login, separated by space.',
    constraints: [
      '1 <= N <= 10^5',
      '1 <= user_id <= 10^4',
      '1 <= day_number <= 365',
    ],
    sampleInput: '7\n101 1\n101 2\n101 3\n102 5\n102 7\n101 4\n103 10',
    sampleOutput: '101',
    kapilIntuition:
      'Sort dates for each user. Compute the difference `day[i] - day[i-1]` and `day[i-1] - day[i-2]`. If both differences equal 1, the user achieved a 3-day consecutive streak!',
    timeComplexity: 'O(N log N) for sorting logins per user.',
    spaceComplexity: 'O(N) space to store and partition user records.',
    starterCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    // Write your solution here
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <set>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    // Write your solution here
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        // Write your solution here
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    # Write your solution here

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int user;
    int day;
} Login;

int cmp(const void* a, const void* b) {
    Login* la = (Login*)a;
    Login* lb = (Login*)b;
    if (la->user != lb->user) return la->user - lb->user;
    return la->day - lb->day;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    Login logs[10005];
    for (int i = 0; i < n; i++) {
        scanf("%d %d", &logs[i].user, &logs[i].day);
    }

    qsort(logs, n, sizeof(Login), cmp);

    int qualifying[10005];
    int qCount = 0;

    int streak = 1;
    for (int i = 1; i < n; i++) {
        if (logs[i].user == logs[i - 1].user) {
            if (logs[i].day == logs[i - 1].day + 1) {
                streak++;
                if (streak >= 3) {
                    if (qCount == 0 || qualifying[qCount - 1] != logs[i].user) {
                        qualifying[qCount++] = logs[i].user;
                    }
                }
            } else if (logs[i].day != logs[i - 1].day) {
                streak = 1;
            }
        } else {
            streak = 1;
        }
    }

    for (int i = 0; i < qCount; i++) {
        printf("%d%c", qualifying[i], (i == qCount - 1 ? '\\n' : ' '));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <set>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;

    map<int, vector<int>> userLogins;
    for (int i = 0; i < n; i++) {
        int u, d;
        cin >> u >> d;
        userLogins[u].push_back(d);
    }

    vector<int> qualified;
    for (auto& [u, days] : userLogins) {
        sort(days.begin(), days.end());
        days.erase(unique(days.begin(), days.end()), days.end()); // remove dup days
        int streak = 1;
        bool hasStreak = false;
        for (size_t i = 1; i < days.size(); i++) {
            if (days[i] == days[i - 1] + 1) {
                streak++;
                if (streak >= 3) {
                    hasStreak = true;
                    break;
                }
            } else {
                streak = 1;
            }
        }
        if (hasStreak) qualified.push_back(u);
    }

    for (size_t i = 0; i < qualified.size(); i++) {
        cout << qualified[i] << (i + 1 == qualified.size() ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();

        Map<Integer, TreeSet<Integer>> map = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            int u = sc.nextInt();
            int d = sc.nextInt();
            map.computeIfAbsent(u, k -> new TreeSet<>()).add(d);
        }

        List<Integer> result = new ArrayList<>();
        for (var entry : map.entrySet()) {
            List<Integer> days = new ArrayList<>(entry.getValue());
            int streak = 1;
            for (int i = 1; i < days.size(); i++) {
                if (days.get(i) == days.get(i - 1) + 1) {
                    streak++;
                    if (streak >= 3) {
                        result.add(entry.getKey());
                        break;
                    }
                } else {
                    streak = 1;
                }
            }
        }

        for (int i = 0; i < result.size(); i++) {
            System.out.print(result.get(i) + (i == result.size() - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    idx = 1
    user_days = {}
    for _ in range(n):
        u = int(raw[idx])
        d = int(raw[idx+1])
        idx += 2
        if u not in user_days:
            user_days[u] = set()
        user_days[u].add(d)

    qualified = []
    for u in sorted(user_days.keys()):
        days = sorted(list(user_days[u]))
        streak = 1
        for i in range(1, len(days)):
            if days[i] == days[i-1] + 1:
                streak += 1
                if streak >= 3:
                    qualified.append(str(u))
                    break
            else:
                streak = 1

    print(" ".join(qualified))

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '7\n101 1\n101 2\n101 3\n102 5\n102 7\n101 4\n103 10',
        expectedOutput: '101',
        isHidden: false,
        explanation: 'User 101 logged in on days 1, 2, 3, 4 (4 consecutive days >= 3). User 102 logged in days 5 and 7 (gap of 2).',
      },
      {
        id: 'tc2',
        input: '8\n50 10\n50 11\n50 12\n60 20\n60 21\n60 22\n70 30\n70 31',
        expectedOutput: '50 60',
        isHidden: true,
        explanation: 'Users 50 and 60 both have >= 3 consecutive days.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Partition by user_id',
        description: 'Group logins by user_id and sort ascending by date.',
        variables: { user_101_days: '[1, 2, 3, 4]', user_102_days: '[5, 7]' },
      },
      {
        step: 2,
        label: 'Window LAG() Comparison',
        description: 'Compare current day with day-1 and day-2.',
        variables: { current_day: 3, prev_1: 2, prev_2: 1, diff: 'Consecutive!' },
      },
      {
        step: 3,
        label: 'Emit Streak Qualifier',
        description: 'User 101 qualifies with streak >= 3.',
        variables: { qualified_users: '[101]' },
      },
    ],
  },
  {
    id: 'day4-p4-second-highest-salary',
    day: 4,
    title: 'N-th Highest Salary Finder (DENSE_RANK Simulation)',
    difficulty: 'Easy',
    moduleTag: 'Window Functions',
    companies: ['Amazon', 'Microsoft', 'Google', 'TCS Digital'],
    platforms: ['LeetCode #176', 'LeetCode #177', 'GeeksforGeeks'],
    problemStatement:
      'Given an array of employee salaries and an integer N, return the N-th highest distinct salary. If there are fewer than N distinct salaries, return "null".\n\nSimulate SQL:\nSELECT DISTINCT salary\nFROM (\n  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk\n  FROM Employees\n) WHERE rnk = N;',
    inputFormat: 'Line 1: Total records K, target rank N\nLine 2: K space-separated salaries',
    outputFormat: 'The N-th highest salary, or "null" if no such salary exists.',
    constraints: ['1 <= K <= 10^5', '1 <= N <= K', '0 <= salary <= 10^9'],
    sampleInput: '4 2\n100 200 300 200',
    sampleOutput: '200',
    kapilIntuition:
      'DENSE_RANK assigns distinct ranks without skipping integers on ties. Distinct sorted salaries: 300 (rank 1), 200 (rank 2), 100 (rank 3). Rank 2 is 200.',
    timeComplexity: 'O(K log K) or O(K) using quickselect on distinct set.',
    spaceComplexity: 'O(K) auxiliary space for distinct hash set.',
    starterCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int k, n;
    if (scanf("%d %d", &k, &n) != 2) return 0;
    // Write your solution here
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <set>
using namespace std;

int main() {
    int k, n;
    if (!(cin >> k >> n)) return 0;
    // Write your solution here
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int k = sc.nextInt();
        int n = sc.nextInt();
        // Write your solution here
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    # Write your solution here

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int cmpDesc(const void* a, const void* b) {
    long long la = *(long long*)a;
    long long lb = *(long long*)b;
    if (lb != la) return (lb > la) ? 1 : -1;
    return 0;
}

int main() {
    int k, n;
    if (scanf("%d %d", &k, &n) != 2) return 0;

    long long arr[100005];
    for (int i = 0; i < k; i++) {
        scanf("%lld", &arr[i]);
    }

    qsort(arr, k, sizeof(long long), cmpDesc);

    long long distinct[100005];
    int dCount = 0;
    for (int i = 0; i < k; i++) {
        if (i == 0 || arr[i] != arr[i - 1]) {
            distinct[dCount++] = arr[i];
        }
    }

    if (n <= dCount) {
        printf("%lld\\n", distinct[n - 1]);
    } else {
        printf("null\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <set>
using namespace std;

int main() {
    int k, n;
    if (!(cin >> k >> n)) return 0;

    set<long long, greater<long long>> distinctSalaries;
    for (int i = 0; i < k; i++) {
        long long s;
        cin >> s;
        distinctSalaries.insert(s);
    }

    if (n > (int)distinctSalaries.size()) {
        cout << "null\\n";
    } else {
        auto it = distinctSalaries.begin();
        for (int i = 1; i < n; i++) ++it;
        cout << *it << "\\n";
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int k = sc.nextInt();
        int n = sc.nextInt();

        TreeSet<Long> set = new TreeSet<>(Collections.reverseOrder());
        for (int i = 0; i < k; i++) {
            set.add(sc.nextLong());
        }

        if (n > set.size()) {
            System.out.println("null");
        } else {
            Iterator<Long> it = set.iterator();
            long val = 0;
            for (int i = 0; i < n; i++) {
                val = it.next();
            }
            System.out.println(val);
        }
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    k = int(raw[0])
    n = int(raw[1])
    salaries = [int(x) for x in raw[2:2+k]]

    distinct_sorted = sorted(list(set(salaries)), reverse=True)
    if n <= len(distinct_sorted):
        print(distinct_sorted[n-1])
    else:
        print("null")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '4 2\n100 200 300 200',
        expectedOutput: '200',
        isHidden: false,
        explanation: 'Distinct sorted: 300 (1st), 200 (2nd), 100 (3rd). 2nd highest is 200.',
      },
      {
        id: 'tc2',
        input: '3 3\n100 100 100',
        expectedOutput: 'null',
        isHidden: true,
        explanation: 'Only 1 distinct salary exists; rank 3 does not exist, return null.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Eliminate Duplicates',
        description: 'Insert salaries into a hash set to extract distinct values.',
        variables: { raw_count: 4, distinct_count: 3 },
      },
      {
        step: 2,
        label: 'Sort Descending',
        description: 'Sort distinct salaries descending: [300, 200, 100].',
        variables: { rank_1: 300, rank_2: 200, rank_3: 100 },
      },
      {
        step: 3,
        label: 'Rank Indexing',
        description: 'Lookup index N-1 (rank 2 -> 200).',
        variables: { target_rank: 2, result: 200 },
      },
    ],
  },
  {
    id: 'day4-p5-dept-top-salaries',
    day: 4,
    title: 'Department Top-3 Salaries with Ties (Partition & Rank)',
    difficulty: 'Medium',
    moduleTag: 'Window Functions',
    companies: ['Amazon', 'Google', 'Microsoft', 'Bloomberg'],
    platforms: ['LeetCode #185', 'HackerRank SQL'],
    problemStatement:
      'A company wants to find employees who earn top-3 distinct salaries in each department.\n\nSimulate SQL:\nSELECT Department, Employee, Salary\nFROM (\n  SELECT Department, Employee, Salary,\n         DENSE_RANK() OVER (PARTITION BY Department ORDER BY Salary DESC) as rnk\n  FROM Employee\n) WHERE rnk <= 3\nORDER BY Department ASC, Salary DESC, Employee ASC;',
    inputFormat:
      'Line 1: N (number of employees)\nNext N lines: EmployeeName DepartmentName Salary',
    outputFormat:
      'Lines of "Department Employee Salary" sorted by Department ASC, Salary DESC, EmployeeName ASC.',
    constraints: ['1 <= N <= 10^5', '0 <= Salary <= 10^8'],
    sampleInput: '7\nJoe IT 85000\nHenry IT 80000\nSam IT 60000\nMax IT 90000\nJanet IT 69000\nRandy IT 85000\nWill Sales 70000',
    sampleOutput: 'IT Max 90000\nIT Joe 85000\nIT Randy 85000\nIT Henry 80000\nSales Will 70000',
    kapilIntuition:
      'In department IT, distinct salaries are 90000 (Rank 1), 85000 (Rank 2), 80000 (Rank 3), 69000 (Rank 4), 60000 (Rank 5). Max has rank 1; Joe and Randy both tie at rank 2; Henry has rank 3. All four employees in IT qualify!',
    timeComplexity: 'O(N log N) to sort employees within department partitions.',
    spaceComplexity: 'O(N) to store department partitions.',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    // Write your solution here
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    // Write your solution here
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        // Write your solution here
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    # Write your solution here

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[30];
    char dept[30];
    int sal;
} Emp;

int cmp(const void* a, const void* b) {
    Emp* ea = (Emp*)a;
    Emp* eb = (Emp*)b;
    int d = strcmp(ea->dept, eb->dept);
    if (d != 0) return d;
    if (eb->sal != ea->sal) return eb->sal - ea->sal;
    return strcmp(ea->name, eb->name);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    Emp emps[10005];
    for (int i = 0; i < n; i++) {
        scanf("%s %s %d", emps[i].name, emps[i].dept, &emps[i].sal);
    }

    qsort(emps, n, sizeof(Emp), cmp);

    int rank = 1;
    for (int i = 0; i < n; i++) {
        if (i == 0 || strcmp(emps[i].dept, emps[i - 1].dept) != 0) {
            rank = 1;
        } else if (emps[i].sal < emps[i - 1].sal) {
            rank++;
        }
        if (rank <= 3) {
            printf("%s %s %d\\n", emps[i].dept, emps[i].name, emps[i].sal);
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

struct Emp { string name; string dept; int sal; };

int main() {
    int n;
    if (!(cin >> n)) return 0;

    vector<Emp> emps(n);
    for (int i = 0; i < n; i++) {
        cin >> emps[i].name >> emps[i].dept >> emps[i].sal;
    }

    sort(emps.begin(), emps.end(), [](const Emp& a, const Emp& b) {
        if (a.dept != b.dept) return a.dept < b.dept;
        if (a.sal != b.sal) return a.sal > b.sal;
        return a.name < b.name;
    });

    int rank = 1;
    for (size_t i = 0; i < emps.size(); i++) {
        if (i == 0 || emps[i].dept != emps[i - 1].dept) {
            rank = 1;
        } else if (emps[i].sal < emps[i - 1].sal) {
            rank++;
        }
        if (rank <= 3) {
            cout << emps[i].dept << " " << emps[i].name << " " << emps[i].sal << "\\n";
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    record Emp(String name, String dept, int sal) {}

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();

        List<Emp> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            list.add(new Emp(sc.next(), sc.next(), sc.nextInt()));
        }

        list.sort((a, b) -> {
            int d = a.dept().compareTo(b.dept());
            if (d != 0) return d;
            int s = Integer.compare(b.sal(), a.sal());
            if (s != 0) return s;
            return a.name().compareTo(b.name());
        });

        int rank = 1;
        for (int i = 0; i < list.size(); i++) {
            if (i == 0 || !list.get(i).dept().equals(list.get(i - 1).dept())) {
                rank = 1;
            } else if (list.get(i).sal() < list.get(i - 1).sal()) {
                rank++;
            }
            if (rank <= 3) {
                System.out.println(list.get(i).dept() + " " + list.get(i).name() + " " + list.get(i).sal());
            }
        }
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    idx = 1
    emps = []
    for _ in range(n):
        name = raw[idx]
        dept = raw[idx+1]
        sal = int(raw[idx+2])
        emps.append((dept, -sal, name, sal))
        idx += 3

    emps.sort()

    rank = 1
    for i in range(len(emps)):
        dept, neg_sal, name, sal = emps[i]
        if i == 0 or emps[i][0] != emps[i-1][0]:
            rank = 1
        elif sal < emps[i-1][3]:
            rank += 1
        if rank <= 3:
            print(f"{dept} {name} {sal}")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '7\nJoe IT 85000\nHenry IT 80000\nSam IT 60000\nMax IT 90000\nJanet IT 69000\nRandy IT 85000\nWill Sales 70000',
        expectedOutput: 'IT Max 90000\nIT Joe 85000\nIT Randy 85000\nIT Henry 80000\nSales Will 70000',
        isHidden: false,
        explanation: 'In IT, Joe and Randy tie for rank 2. Henry is rank 3. In Sales, Will is rank 1.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Partition by Department',
        description: 'Separate employees into department buckets (IT, Sales).',
        variables: { departments: 'IT (6), Sales (1)' },
      },
      {
        step: 2,
        label: 'DENSE_RANK Calculation with Ties',
        description: 'Max(90k)->Rnk 1. Joe(85k) & Randy(85k)->Rnk 2. Henry(80k)->Rnk 3. Janet(69k)->Rnk 4.',
        variables: { qualified_it_ranks: '1, 2, 2, 3' },
      },
      {
        step: 3,
        label: 'Format Output',
        description: 'Sort by Dept ASC, Salary DESC, Name ASC.',
        variables: { total_selected: 5 },
      },
    ],
  },
  {
    id: 'day4-p6-bplus-tree-search',
    day: 4,
    title: 'B+ Tree Index Point Lookup & Range Scan Simulator',
    difficulty: 'Hard',
    moduleTag: 'Database Indexing',
    companies: ['Oracle', 'MongoDB', 'Microsoft', 'Amazon'],
    platforms: ['GeeksforGeeks', 'LeetCode'],
    problemStatement:
      'Implement an in-memory B+ Tree Leaf Index supporting two relational operations:\n1. POINT LOOKUP: `SEEK key` -> Returns data pointer or "NOT_FOUND"\n2. RANGE SCAN: `SCAN min_key max_key` -> Returns all sorted keys in [min_key, max_key] connected via leaf pointers in O(K) sequential access time.',
    inputFormat:
      'Line 1: N (number of keys to insert)\nLine 2: N sorted unique keys\nLine 3: Q (number of queries)\nNext Q lines: "SEEK <key>" OR "SCAN <min_key> <max_key>"',
    outputFormat:
      'For SEEK: "FOUND <key>" or "NOT_FOUND"\nFor SCAN: Space-separated keys in range, or "EMPTY" if no keys match.',
    constraints: ['1 <= N <= 10^5', '1 <= Q <= 10^4', 'Keys are unique integers'],
    sampleInput: '6\n10 20 30 40 50 60\n3\nSEEK 30\nSEEK 35\nSCAN 25 55',
    sampleOutput: 'FOUND 30\nNOT_FOUND\n30 40 50',
    kapilIntuition:
      'B+ Tree leaf nodes are stored as a sorted doubly linked list. Binary search finds the starting leaf in O(log N), then horizontal pointer traversal collects all items up to max_key in O(K) time without going back to internal nodes.',
    timeComplexity: 'SEEK: O(log N). SCAN: O(log N + K).',
    spaceComplexity: 'O(N) for leaf structures.',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    // Write your solution here
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    // Write your solution here
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        // Write your solution here
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    # Write your solution here

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int binarySearch(int* arr, int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int lowerBound(int* arr, int n, int target) {
    int low = 0, high = n;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] >= target) high = mid;
        else low = mid + 1;
    }
    return low;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    int arr[100005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int q;
    if (scanf("%d", &q) != 1) return 0;

    while (q--) {
        char op[10];
        scanf("%s", op);
        if (strcmp(op, "SEEK") == 0) {
            int key;
            scanf("%d", &key);
            if (binarySearch(arr, n, key) != -1) {
                printf("FOUND %d\\n", key);
            } else {
                printf("NOT_FOUND\\n");
            }
        } else if (strcmp(op, "SCAN") == 0) {
            int minK, maxK;
            scanf("%d %d", &minK, &maxK);
            int start = lowerBound(arr, n, minK);
            int count = 0;
            for (int i = start; i < n && arr[i] <= maxK; i++) {
                printf("%d%c", arr[i], (i + 1 < n && arr[i + 1] <= maxK ? ' ' : '\\n'));
                count++;
            }
            if (count == 0) printf("EMPTY\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;

    vector<int> keys(n);
    for (int i = 0; i < n; i++) cin >> keys[i];

    int q;
    if (!(cin >> q)) return 0;

    while (q--) {
        string op;
        cin >> op;
        if (op == "SEEK") {
            int target;
            cin >> target;
            if (binary_search(keys.begin(), keys.end(), target)) {
                cout << "FOUND " << target << "\\n";
            } else {
                cout << "NOT_FOUND\\n";
            }
        } else if (op == "SCAN") {
            int minK, maxK;
            cin >> minK >> maxK;
            auto it = lower_bound(keys.begin(), keys.end(), minK);
            vector<int> results;
            while (it != keys.end() && *it <= maxK) {
                results.push_back(*it);
                ++it;
            }
            if (results.empty()) {
                cout << "EMPTY\\n";
            } else {
                for (size_t i = 0; i < results.size(); i++) {
                    cout << results[i] << (i + 1 == results.size() ? "" : " ");
                }
                cout << "\\n";
            }
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();

        int[] keys = new int[n];
        for (int i = 0; i < n; i++) keys[i] = sc.nextInt();

        int q = sc.nextInt();
        while (q-- > 0) {
            String op = sc.next();
            if (op.equals("SEEK")) {
                int target = sc.nextInt();
                int idx = Arrays.binarySearch(keys, target);
                System.out.println(idx >= 0 ? "FOUND " + target : "NOT_FOUND");
            } else if (op.equals("SCAN")) {
                int minK = sc.nextInt();
                int maxK = sc.nextInt();
                int idx = Arrays.binarySearch(keys, minK);
                if (idx < 0) idx = -idx - 1;

                List<Integer> list = new ArrayList<>();
                while (idx < keys.length && keys[idx] <= maxK) {
                    list.add(keys[idx++]);
                }
                if (list.isEmpty()) {
                    System.out.println("EMPTY");
                } else {
                    for (int i = 0; i < list.size(); i++) {
                        System.out.print(list.get(i) + (i == list.size() - 1 ? "" : " "));
                    }
                    System.out.println();
                }
            }
        }
    }
}`,
      python: `import sys
import bisect

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    keys = [int(x) for x in raw[1:1+n]]
    q = int(raw[1+n])
    idx = 2 + n

    for _ in range(q):
        op = raw[idx]
        if op == "SEEK":
            target = int(raw[idx+1])
            idx += 2
            pos = bisect.bisect_left(keys, target)
            if pos < len(keys) and keys[pos] == target:
                print(f"FOUND {target}")
            else:
                print("NOT_FOUND")
        elif op == "SCAN":
            min_k = int(raw[idx+1])
            max_k = int(raw[idx+2])
            idx += 3
            start = bisect.bisect_left(keys, min_k)
            res = []
            while start < len(keys) and keys[start] <= max_k:
                res.append(str(keys[start]))
                start += 1
            if res:
                print(" ".join(res))
            else:
                print("EMPTY")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '6\n10 20 30 40 50 60\n3\nSEEK 30\nSEEK 35\nSCAN 25 55',
        expectedOutput: 'FOUND 30\nNOT_FOUND\n30 40 50',
        isHidden: false,
        explanation: '30 is present; 35 is absent; scan [25, 55] finds 30, 40, 50.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'B+ Tree SEEK Operation',
        description: 'Binary search routes through root/internal nodes down to leaf in O(log N).',
        variables: { target: 30, index: 2, status: 'FOUND' },
      },
      {
        step: 2,
        label: 'B+ Tree Horizontal SCAN',
        description: 'Seek to lower bound (25 -> index 2, key 30). Traverse sibling leaf pointers sequentially.',
        variables: { lower_bound: 25, upper_bound: 55, matched: '[30, 40, 50]' },
      },
    ],
  },
  {
    id: 'day4-p7-wal-recovery',
    day: 4,
    title: 'Write-Ahead Log (WAL) Redo & Undo Recovery Simulator',
    difficulty: 'Hard',
    moduleTag: 'Transactions & ACID',
    companies: ['Amazon', 'Google Cloud', 'Salesforce', 'Microsoft'],
    platforms: ['GeeksforGeeks', 'System Design'],
    problemStatement:
      'Given a sequence of Write-Ahead Log (WAL) records from a relational database engine that experienced an unexpected power failure, simulate the ARIES recovery protocol (Redo & Undo phases) to determine the final committed state of database data items.\n\nLog Record Format:\n- `START <tid>`: Transaction begins.\n- `UPDATE <tid> <variable> <old_val> <new_val>`: Transaction updates variable.\n- `COMMIT <tid>`: Transaction successfully committed.\n\nRecovery Rules:\n1. Transactions with a COMMIT record are COMMITTED (Redo their updates).\n2. Transactions without a COMMIT record are UNCOMMITTED (Roll back / Undo their updates back to old_val).',
    inputFormat:
      'Line 1: N (number of initial variables)\nNext N lines: <variable> <initial_value>\nLine N+2: M (number of log entries)\nNext M lines: Log entries',
    outputFormat:
      'Final recovered variable values in alphabetical order: "<variable> = <final_value>".',
    constraints: ['1 <= N <= 100', '1 <= M <= 1000', 'Values are integers'],
    sampleInput: '2\nA 100\nB 200\n5\nSTART T1\nUPDATE T1 A 100 150\nSTART T2\nUPDATE T2 B 200 350\nCOMMIT T1',
    sampleOutput: 'A = 150\nB = 200',
    kapilIntuition:
      'T1 has a COMMIT record, so A retains its new value 150. T2 was in-flight when the system crashed (no COMMIT), so B must be rolled back (undone) to its old value 200.',
    timeComplexity: 'O(M + N log N) for scanning the log and sorting output variables.',
    spaceComplexity: 'O(M + N) to maintain log history and variable table.',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    // Write your solution here
    return 0;
}`,
      cpp: `#include <iostream>
#include <map>
#include <set>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    // Write your solution here
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        // Write your solution here
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    # Write your solution here

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct {
    char var[20];
    int val;
} Var;

typedef struct {
    char tid[20];
    char var[20];
    int oldV;
    int newV;
} UpdateLog;

int cmp(const void* a, const void* b) {
    return strcmp(((Var*)a)->var, ((Var*)b)->var);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    Var vars[105];
    for (int i = 0; i < n; i++) {
        scanf("%s %d", vars[i].var, &vars[i].val);
    }

    int m;
    if (scanf("%d", &m) != 1) return 0;

    char committed[105][20];
    int cCount = 0;

    UpdateLog updates[1005];
    int uCount = 0;

    for (int i = 0; i < m; i++) {
        char op[20];
        scanf("%s", op);
        if (strcmp(op, "COMMIT") == 0) {
            scanf("%s", committed[cCount++]);
        } else if (strcmp(op, "START") == 0) {
            char tid[20];
            scanf("%s", tid);
        } else if (strcmp(op, "UPDATE") == 0) {
            scanf("%s %s %d %d", updates[uCount].tid, updates[uCount].var, &updates[uCount].oldV, &updates[uCount].newV);
            uCount++;
        }
    }

    // Apply Redo for committed transactions, Undo for uncommitted
    for (int i = 0; i < uCount; i++) {
        int isCommitted = 0;
        for (int c = 0; c < cCount; c++) {
            if (strcmp(updates[i].tid, committed[c]) == 0) {
                isCommitted = 1;
                break;
            }
        }
        for (int v = 0; v < n; v++) {
            if (strcmp(vars[v].var, updates[i].var) == 0) {
                if (isCommitted) {
                    vars[v].val = updates[i].newV;
                } else {
                    vars[v].val = updates[i].oldV;
                }
                break;
            }
        }
    }

    qsort(vars, n, sizeof(Var), cmp);
    for (int i = 0; i < n; i++) {
        printf("%s = %d\\n", vars[i].var, vars[i].val);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <map>
#include <set>
#include <vector>
using namespace std;

struct LogEntry { string tid; string var; int oldVal; int newVal; };

int main() {
    int n;
    if (!(cin >> n)) return 0;

    map<string, int> db;
    for (int i = 0; i < n; i++) {
        string var;
        int val;
        cin >> var >> val;
        db[var] = val;
    }

    int m;
    cin >> m;
    set<string> committed;
    vector<LogEntry> updates;

    for (int i = 0; i < m; i++) {
        string op;
        cin >> op;
        if (op == "COMMIT") {
            string tid;
            cin >> tid;
            committed.insert(tid);
        } else if (op == "START") {
            string tid;
            cin >> tid;
        } else if (op == "UPDATE") {
            string tid, var;
            int oldV, newV;
            cin >> tid >> var >> oldV >> newV;
            updates.push_back({tid, var, oldV, newV});
        }
    }

    for (const auto& log : updates) {
        if (committed.count(log.tid)) {
            db[log.var] = log.newVal; // REDO
        } else {
            db[log.var] = log.oldVal; // UNDO
        }
    }

    for (const auto& [var, val] : db) {
        cout << var << " = " << val << "\\n";
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    record LogEntry(String tid, String var, int oldVal, int newVal) {}

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();

        Map<String, Integer> db = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            db.put(sc.next(), sc.nextInt());
        }

        int m = sc.nextInt();
        Set<String> committed = new HashSet<>();
        List<LogEntry> updates = new ArrayList<>();

        for (int i = 0; i < m; i++) {
            String op = sc.next();
            if (op.equals("COMMIT")) {
                committed.add(sc.next());
            } else if (op.equals("START")) {
                sc.next();
            } else if (op.equals("UPDATE")) {
                updates.add(new LogEntry(sc.next(), sc.next(), sc.nextInt(), sc.nextInt()));
            }
        }

        for (LogEntry log : updates) {
            if (committed.contains(log.tid())) {
                db.put(log.var(), log.newVal());
            } else {
                db.put(log.var(), log.oldVal());
            }
        }

        for (var entry : db.entrySet()) {
            System.out.println(entry.getKey() + " = " + entry.getValue());
        }
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    idx = 1
    db = {}
    for _ in range(n):
        var = raw[idx]
        val = int(raw[idx+1])
        db[var] = val
        idx += 2

    m = int(raw[idx])
    idx += 1

    committed = set()
    updates = []

    for _ in range(m):
        op = raw[idx]
        if op == "COMMIT":
            committed.add(raw[idx+1])
            idx += 2
        elif op == "START":
            idx += 2
        elif op == "UPDATE":
            tid = raw[idx+1]
            var = raw[idx+2]
            old_v = int(raw[idx+3])
            new_v = int(raw[idx+4])
            updates.append((tid, var, old_v, new_v))
            idx += 5

    for tid, var, old_v, new_v in updates:
        if tid in committed:
            db[var] = new_v
        else:
            db[var] = old_v

    for var in sorted(db.keys()):
        print(f"{var} = {db[var]}")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '2\nA 100\nB 200\n5\nSTART T1\nUPDATE T1 A 100 150\nSTART T2\nUPDATE T2 B 200 350\nCOMMIT T1',
        expectedOutput: 'A = 150\nB = 200',
        isHidden: false,
        explanation: 'T1 committed -> A=150. T2 uncommitted -> B rolled back to 200.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Analysis Phase',
        description: 'Scan log forward to determine committed transactions: T1 committed, T2 uncommitted (loser).',
        variables: { committed_set: '{T1}', loser_set: '{T2}' },
      },
      {
        step: 2,
        label: 'Redo Phase',
        description: 'Reapply changes of committed transactions (A -> 150).',
        variables: { var_A: 150 },
      },
      {
        step: 3,
        label: 'Undo Phase',
        description: 'Revert changes of uncommitted transactions back to old_val (B -> 200).',
        variables: { var_B: 200 },
      },
    ],
  },
  {
    id: 'day4-p8-deadlock-detector',
    day: 4,
    title: 'Concurrency Lock Manager & Deadlock Detector (Wait-For Graph)',
    difficulty: 'Hard',
    moduleTag: 'Concurrency Control',
    companies: ['Amazon', 'Google', 'Oracle', 'Microsoft'],
    platforms: ['GeeksforGeeks', 'LeetCode #207'],
    problemStatement:
      'In a relational DBMS using Two-Phase Locking (2PL), transactions request locks on data items. When transaction T_A requests a lock currently held by transaction T_B, a directed edge T_A -> T_B is added to the Wait-For Graph (WFG).\n\nDetect whether a deadlock exists (i.e. whether a directed cycle exists in the Wait-For Graph). If a deadlock exists, print "DEADLOCK_DETECTED" and the lexicographically smallest cycle; otherwise print "NO_DEADLOCK".',
    inputFormat:
      'Line 1: E (number of wait-for dependency edges)\nNext E lines: <T_from> <T_to> (T_from is waiting for T_to)',
    outputFormat: '"DEADLOCK_DETECTED" or "NO_DEADLOCK".',
    constraints: ['1 <= E <= 10^4', 'Transaction names are alphanumeric'],
    sampleInput: '3\nT1 T2\nT2 T3\nT3 T1',
    sampleOutput: 'DEADLOCK_DETECTED',
    kapilIntuition:
      'A deadlock in databases is mathematically equivalent to a directed cycle in a graph. Using Depth First Search (DFS) with a 3-color node tracking (0=unvisited, 1=visiting, 2=visited), any back-edge pointing to a node currently in the call stack (color 1) immediately proves a deadlock cycle!',
    timeComplexity: 'O(V + E) using DFS cycle detection.',
    spaceComplexity: 'O(V + E) for adjacency list.',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int e;
    if (scanf("%d", &e) != 1) return 0;
    // Write your solution here
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
using namespace std;

int main() {
    int e;
    if (!(cin >> e)) return 0;
    // Write your solution here
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int e = sc.nextInt();
        // Write your solution here
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    # Write your solution here

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

int adj[105][105];
int visited[105];
int n = 0;
char names[105][20];

int getIdx(char* name) {
    for (int i = 0; i < n; i++) {
        if (strcmp(names[i], name) == 0) return i;
    }
    strcpy(names[n], name);
    return n++;
}

bool dfs(int u) {
    visited[u] = 1; // visiting
    for (int v = 0; v < n; v++) {
        if (adj[u][v]) {
            if (visited[v] == 1) return true; // cycle
            if (visited[v] == 0 && dfs(v)) return true;
        }
    }
    visited[u] = 2; // visited
    return false;
}

int main() {
    int e;
    if (scanf("%d", &e) != 1) return 0;

    memset(adj, 0, sizeof(adj));
    memset(visited, 0, sizeof(visited));

    for (int i = 0; i < e; i++) {
        char u[20], v[20];
        scanf("%s %s", u, v);
        int uIdx = getIdx(u);
        int vIdx = getIdx(v);
        adj[uIdx][vIdx] = 1;
    }

    bool hasCycle = false;
    for (int i = 0; i < n; i++) {
        if (visited[i] == 0) {
            if (dfs(i)) {
                hasCycle = true;
                break;
            }
        }
    }

    if (hasCycle) printf("DEADLOCK_DETECTED\\n");
    else printf("NO_DEADLOCK\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
using namespace std;

map<string, vector<string>> adj;
map<string, int> visited; // 0=unvisited, 1=visiting, 2=visited

bool hasCycle(const string& u) {
    visited[u] = 1;
    for (const string& v : adj[u]) {
        if (visited[v] == 1) return true;
        if (visited[v] == 0 && hasCycle(v)) return true;
    }
    visited[u] = 2;
    return false;
}

int main() {
    int e;
    if (!(cin >> e)) return 0;

    for (int i = 0; i < e; i++) {
        string u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        if (!visited.count(u)) visited[u] = 0;
        if (!visited.count(v)) visited[v] = 0;
    }

    bool cycleFound = false;
    for (auto& [node, state] : visited) {
        if (state == 0) {
            if (hasCycle(node)) {
                cycleFound = true;
                break;
            }
        }
    }

    cout << (cycleFound ? "DEADLOCK_DETECTED" : "NO_DEADLOCK") << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    static Map<String, List<String>> adj = new HashMap<>();
    static Map<String, Integer> state = new HashMap<>();

    static boolean dfs(String u) {
        state.put(u, 1);
        for (String v : adj.getOrDefault(u, Collections.emptyList())) {
            if (state.getOrDefault(v, 0) == 1) return true;
            if (state.getOrDefault(v, 0) == 0 && dfs(v)) return true;
        }
        state.put(u, 2);
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int e = sc.nextInt();

        for (int i = 0; i < e; i++) {
            String u = sc.next();
            String v = sc.next();
            adj.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
            state.putIfAbsent(u, 0);
            state.putIfAbsent(v, 0);
        }

        boolean cycle = false;
        for (String node : new ArrayList<>(state.keySet())) {
            if (state.get(node) == 0) {
                if (dfs(node)) {
                    cycle = true;
                    break;
                }
            }
        }

        System.out.println(cycle ? "DEADLOCK_DETECTED" : "NO_DEADLOCK");
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    e = int(raw[0])
    idx = 1
    adj = {}
    nodes = set()
    for _ in range(e):
        u = raw[idx]
        v = raw[idx+1]
        idx += 2
        if u not in adj:
            adj[u] = []
        adj[u].append(v)
        nodes.add(u)
        nodes.add(v)

    visited = {node: 0 for node in nodes} # 0=unvisited, 1=visiting, 2=done

    def dfs(u):
        visited[u] = 1
        for v in adj.get(u, []):
            if visited[v] == 1:
                return True
            if visited[v] == 0 and dfs(v):
                return True
        visited[u] = 2
        return False

    has_deadlock = False
    for node in nodes:
        if visited[node] == 0:
            if dfs(node):
                has_deadlock = True
                break

    print("DEADLOCK_DETECTED" if has_deadlock else "NO_DEADLOCK")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '3\nT1 T2\nT2 T3\nT3 T1',
        expectedOutput: 'DEADLOCK_DETECTED',
        isHidden: false,
        explanation: 'Cycle T1 -> T2 -> T3 -> T1 causes circular wait deadlock.',
      },
      {
        id: 'tc2',
        input: '2\nT1 T2\nT2 T3',
        expectedOutput: 'NO_DEADLOCK',
        isHidden: true,
        explanation: 'Directed acyclic dependency chain, no circular wait.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Build Wait-For Graph',
        description: 'Construct directed edges representing transaction lock wait dependencies.',
        variables: { edges: 'T1->T2, T2->T3, T3->T1' },
      },
      {
        step: 2,
        label: 'DFS Cycle Detection',
        description: 'DFS path: T1 (visiting) -> T2 (visiting) -> T3 (visiting) -> T1 (already in call stack).',
        variables: { back_edge: 'T3 -> T1', cycle_detected: true },
      },
      {
        step: 3,
        label: 'Deadlock Abort Victim Selection',
        description: 'Identify circular wait and notify lock manager to abort victim transaction.',
        variables: { status: 'DEADLOCK_DETECTED' },
      },
    ],
  },
  {
    id: 'day4-p9-functional-dependency-closure',
    day: 4,
    title: 'Functional Dependency Closure & BCNF Violation Validator',
    difficulty: 'Medium',
    moduleTag: 'Relational Normalisation',
    companies: ['Microsoft', 'Amazon', 'Oracle', 'TCS Digital'],
    platforms: ['GeeksforGeeks Database Normalisation', 'HackerRank'],
    problemStatement:
      'Given a relation schema R with attribute set and a set of Functional Dependencies (FDs) F, compute the Attribute Closure X+ for a given attribute set X, and determine whether the schema satisfies Boyce-Codd Normal Form (BCNF).\n\nBCNF Condition: For every non-trivial functional dependency A -> B, A must be a Superkey (i.e. A+ must contain ALL attributes of R).',
    inputFormat:
      'Line 1: Attributes of R (space-separated single uppercase letters, e.g. A B C D)\nLine 2: F (number of functional dependencies)\nNext F lines: LHS -> RHS (e.g. A B -> C)',
    outputFormat:
      'Line 1: "CANDIDATE_KEYS: <keys>"\nLine 2: "BCNF_STATUS: COMPLIANT" or "BCNF_STATUS: VIOLATION (<offending_fd>)"',
    constraints: ['1 <= |R| <= 10', '1 <= F <= 20'],
    sampleInput: 'A B C\n2\nA -> B\nB -> C',
    sampleOutput: 'CANDIDATE_KEYS: A\nBCNF_STATUS: VIOLATION (B -> C)',
    kapilIntuition:
      'Attribute closure of A: {A}+ = {A, B, C} -> A is a candidate key. But for FD B -> C, the closure of B is {B, C} which does not contain A, so B is NOT a superkey. Therefore, B -> C violates BCNF!',
    timeComplexity: 'O(F * |R|) to compute attribute closures.',
    spaceComplexity: 'O(|R|) to maintain attribute sets.',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    // Write your solution here
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <set>
using namespace std;

int main() {
    // Write your solution here
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // Write your solution here
    }
}`,
      python: `import sys

def solve():
    # Write your solution here
    pass

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

int main() {
    char line[100];
    if (!fgets(line, sizeof(line), stdin)) return 0;

    int allMask = 0;
    for (int i = 0; line[i]; i++) {
        if (line[i] >= 'A' && line[i] <= 'Z') {
            allMask |= (1 << (line[i] - 'A'));
        }
    }

    int f;
    if (scanf("%d\\n", &f) != 1) return 0;

    int lhsMask[25] = {0}, rhsMask[25] = {0};
    char rawFD[25][50];

    for (int i = 0; i < f; i++) {
        fgets(rawFD[i], sizeof(rawFD[i]), stdin);
        // remove newline
        rawFD[i][strcspn(rawFD[i], "\\r\\n")] = 0;
        char* arrow = strstr(rawFD[i], "->");
        if (arrow) {
            for (char* p = rawFD[i]; p < arrow; p++) {
                if (*p >= 'A' && *p <= 'Z') lhsMask[i] |= (1 << (*p - 'A'));
            }
            for (char* p = arrow + 2; *p; p++) {
                if (*p >= 'A' && *p <= 'Z') rhsMask[i] |= (1 << (*p - 'A'));
            }
        }
    }

    // Closure computation helper
    int getClosure(int mask) {
        int closure = mask;
        bool changed = true;
        while (changed) {
            changed = false;
            for (int i = 0; i < f; i++) {
                if ((closure & lhsMask[i]) == lhsMask[i]) {
                    if ((closure & rhsMask[i]) != rhsMask[i]) {
                        closure |= rhsMask[i];
                        changed = true;
                    }
                }
            }
        }
        return closure;
    }

    // Find candidate keys (single letter for simplicity)
    printf("CANDIDATE_KEYS:");
    for (int i = 0; i < 26; i++) {
        if (allMask & (1 << i)) {
            if (getClosure(1 << i) == allMask) {
                printf(" %c", 'A' + i);
            }
        }
    }
    printf("\\n");

    // Check BCNF
    bool compliant = true;
    for (int i = 0; i < f; i++) {
        if (getClosure(lhsMask[i]) != allMask) {
            printf("BCNF_STATUS: VIOLATION (%s)\\n", rawFD[i]);
            compliant = false;
            break;
        }
    }
    if (compliant) printf("BCNF_STATUS: COMPLIANT\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <set>
using namespace std;

set<char> getClosure(set<char> x, const vector<pair<set<char>, set<char>>>& fds) {
    bool changed = true;
    while (changed) {
        changed = false;
        for (const auto& [lhs, rhs] : fds) {
            bool lhsSubset = true;
            for (char c : lhs) {
                if (!x.count(c)) { lhsSubset = false; break; }
            }
            if (lhsSubset) {
                for (char c : rhs) {
                    if (!x.count(c)) {
                        x.insert(c);
                        changed = true;
                    }
                }
            }
        }
    }
    return x;
}

int main() {
    string attrLine;
    if (!getline(cin, attrLine)) return 0;
    stringstream ss(attrLine);
    set<char> allAttrs;
    char c;
    while (ss >> c) allAttrs.insert(c);

    int f;
    if (!(cin >> f)) return 0;
    string dummy;
    getline(cin, dummy);

    vector<pair<set<char>, set<char>>> fds;
    vector<string> rawFDs;

    for (int i = 0; i < f; i++) {
        string line;
        getline(cin, line);
        rawFDs.push_back(line);
        size_t arrowPos = line.find("->");
        string lhsStr = line.substr(0, arrowPos);
        string rhsStr = line.substr(arrowPos + 2);

        set<char> lhs, rhs;
        for (char ch : lhsStr) if (isupper(ch)) lhs.insert(ch);
        for (char ch : rhsStr) if (isupper(ch)) rhs.insert(ch);
        fds.push_back({lhs, rhs});
    }

    cout << "CANDIDATE_KEYS:";
    for (char ch : allAttrs) {
        if (getClosure({ch}, fds) == allAttrs) {
            cout << " " << ch;
        }
    }
    cout << "\\n";

    bool bcnf = true;
    for (size_t i = 0; i < fds.size(); i++) {
        if (getClosure(fds[i].first, fds) != allAttrs) {
            cout << "BCNF_STATUS: VIOLATION (" << rawFDs[i] << ")\\n";
            bcnf = false;
            break;
        }
    }
    if (bcnf) cout << "BCNF_STATUS: COMPLIANT\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    static Set<Character> getClosure(Set<Character> x, List<Set<Character>> lhsList, List<Set<Character>> rhsList) {
        Set<Character> closure = new HashSet<>(x);
        boolean changed = true;
        while (changed) {
            changed = false;
            for (int i = 0; i < lhsList.size(); i++) {
                if (closure.containsAll(lhsList.get(i))) {
                    for (char c : rhsList.get(i)) {
                        if (closure.add(c)) changed = true;
                    }
                }
            }
        }
        return closure;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String line = sc.nextLine();
        Set<Character> allAttrs = new TreeSet<>();
        for (char c : line.toCharArray()) {
            if (Character.isUpperCase(c)) allAttrs.add(c);
        }

        int f = Integer.parseInt(sc.nextLine().trim());
        List<Set<Character>> lhsList = new ArrayList<>();
        List<Set<Character>> rhsList = new ArrayList<>();
        List<String> raw = new ArrayList<>();

        for (int i = 0; i < f; i++) {
            String fd = sc.nextLine().trim();
            raw.add(fd);
            String[] parts = fd.split("->");
            Set<Character> lhs = new HashSet<>();
            Set<Character> rhs = new HashSet<>();
            for (char c : parts[0].toCharArray()) if (Character.isUpperCase(c)) lhs.add(c);
            for (char c : parts[1].toCharArray()) if (Character.isUpperCase(c)) rhs.add(c);
            lhsList.add(lhs);
            rhsList.add(rhs);
        }

        System.out.print("CANDIDATE_KEYS:");
        for (char c : allAttrs) {
            if (getClosure(Set.of(c), lhsList, rhsList).equals(allAttrs)) {
                System.out.print(" " + c);
            }
        }
        System.out.println();

        boolean bcnf = true;
        for (int i = 0; i < f; i++) {
            if (!getClosure(lhsList.get(i), lhsList, rhsList).equals(allAttrs)) {
                System.out.println("BCNF_STATUS: VIOLATION (" + raw.get(i) + ")");
                bcnf = false;
                break;
            }
        }
        if (bcnf) System.out.println("BCNF_STATUS: COMPLIANT");
    }
}`,
      python: `import sys

def solve():
    lines = sys.stdin.read().splitlines()
    if not lines:
        return
    all_attrs = set([c for c in lines[0] if c.isupper()])
    f = int(lines[1].strip())
    fds = []
    raw_fds = []
    for i in range(2, 2+f):
        raw = lines[i].strip()
        raw_fds.append(raw)
        lhs_str, rhs_str = raw.split("->")
        lhs = set([c for c in lhs_str if c.isupper()])
        rhs = set([c for c in rhs_str if c.isupper()])
        fds.append((lhs, rhs))

    def closure(x):
        res = set(x)
        changed = True
        while changed:
            changed = False
            for lhs, rhs in fds:
                if lhs.issubset(res):
                    for c in rhs:
                        if c not in res:
                            res.add(c)
                            changed = True
        return res

    candidate_keys = []
    for c in sorted(list(all_attrs)):
        if closure({c}) == all_attrs:
            candidate_keys.append(c)

    print("CANDIDATE_KEYS: " + " ".join(candidate_keys))

    bcnf = True
    for i, (lhs, rhs) in enumerate(fds):
        if closure(lhs) != all_attrs:
            print(f"BCNF_STATUS: VIOLATION ({raw_fds[i]})")
            bcnf = False
            break

    if bcnf:
        print("BCNF_STATUS: COMPLIANT")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: 'A B C\n2\nA -> B\nB -> C',
        expectedOutput: 'CANDIDATE_KEYS: A\nBCNF_STATUS: VIOLATION (B -> C)',
        isHidden: false,
        explanation: 'A is candidate key. In B -> C, closure of B is {B, C} which is not superkey, violating BCNF.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Attribute Closure of Candidate Key A',
        description: 'Compute {A}+ = {A} U {B} U {C} = {A, B, C}. Since it covers all attributes, A is a Superkey.',
        variables: { candidate_key: 'A', closure: '{A, B, C}' },
      },
      {
        step: 2,
        label: 'BCNF Test on Dependency B -> C',
        description: 'Compute {B}+ = {B, C}. Attribute A is missing from closure. B is NOT a Superkey.',
        variables: { offending_fd: 'B -> C', b_closure: '{B, C}', is_superkey: false },
      },
      {
        step: 3,
        label: 'BCNF Verdict',
        description: 'Emit BCNF VIOLATION for schema decomposition.',
        variables: { status: 'VIOLATION' },
      },
    ],
  },
  {
    id: 'day4-p10-org-hierarchy-cte',
    day: 4,
    title: 'Hierarchical Organizational Tree & Depth Analyzer (Recursive CTE)',
    difficulty: 'Medium',
    moduleTag: 'Recursive CTEs & Trees',
    companies: ['Google', 'Microsoft', 'Uber', 'TCS Digital'],
    platforms: ['LeetCode #580', 'HackerRank SQL', 'GeeksforGeeks'],
    problemStatement:
      'Given an employee hierarchy table with records (emp_id, emp_name, manager_id), compute each employee\'s reporting depth from the CEO (manager_id = NULL has depth 0).\n\nSimulate SQL:\nWITH RECURSIVE OrgHierarchy AS (\n  SELECT emp_id, emp_name, 0 AS depth\n  FROM Employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT E.emp_id, E.emp_name, H.depth + 1\n  FROM Employees E\n  JOIN OrgHierarchy H ON E.manager_id = H.emp_id\n)\nSELECT emp_name, depth FROM OrgHierarchy ORDER BY depth ASC, emp_name ASC;',
    inputFormat:
      'Line 1: N (number of employees)\nNext N lines: emp_id emp_name manager_id (manager_id is 0 for CEO)',
    outputFormat: 'Lines of "<emp_name> <depth>" sorted by depth ASC, then emp_name ASC.',
    constraints: ['1 <= N <= 10^4', 'Tree structure is a valid DAG rooted at single CEO'],
    sampleInput: '5\n1 Alice 0\n2 Bob 1\n3 Charlie 1\n4 David 2\n5 Emma 2',
    sampleOutput: 'Alice 0\nBob 1\nCharlie 1\nDavid 2\nEmma 2',
    kapilIntuition:
      'A Recursive CTE begins with the anchor member (CEO at depth 0) and iteratively evaluates the recursive member (finding all subordinates who report to current employees, incrementing depth by 1). This is Breadth First Search (BFS) / level-order traversal on a tree.',
    timeComplexity: 'O(N) time using BFS/DFS tree traversal.',
    spaceComplexity: 'O(N) auxiliary space for queue and adjacency list.',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    // Write your solution here
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    // Write your solution here
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        // Write your solution here
    }
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    # Write your solution here

if __name__ == "__main__":
    solve()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct {
    int id;
    char name[30];
    int mgr;
    int depth;
} Emp;

int cmp(const void* a, const void* b) {
    Emp* ea = (Emp*)a;
    Emp* eb = (Emp*)b;
    if (ea->depth != eb->depth) return ea->depth - eb->depth;
    return strcmp(ea->name, eb->name);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    Emp emps[10005];
    int ceoIdx = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d %s %d", &emps[i].id, emps[i].name, &emps[i].mgr);
        emps[i].depth = -1;
        if (emps[i].mgr == 0) ceoIdx = i;
    }

    emps[ceoIdx].depth = 0;
    int resolved = 1;
    while (resolved < n) {
        for (int i = 0; i < n; i++) {
            if (emps[i].depth == -1) {
                for (int j = 0; j < n; j++) {
                    if (emps[j].depth != -1 && emps[i].mgr == emps[j].id) {
                        emps[i].depth = emps[j].depth + 1;
                        resolved++;
                        break;
                    }
                }
            }
        }
    }

    qsort(emps, n, sizeof(Emp), cmp);
    for (int i = 0; i < n; i++) {
        printf("%s %d\\n", emps[i].name, emps[i].depth);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <queue>
#include <algorithm>
using namespace std;

struct Node { string name; int depth; };

int main() {
    int n;
    if (!(cin >> n)) return 0;

    map<int, string> idToName;
    map<int, vector<int>> adj;
    int ceoId = 0;

    for (int i = 0; i < n; i++) {
        int id, mgr;
        string name;
        cin >> id >> name >> mgr;
        idToName[id] = name;
        if (mgr == 0) {
            ceoId = id;
        } else {
            adj[mgr].push_back(id);
        }
    }

    // BFS (simulates recursive CTE)
    queue<pair<int, int>> q;
    q.push({ceoId, 0});
    vector<Node> results;

    while (!q.empty()) {
        auto [u, d] = q.front();
        q.pop();
        results.push_back({idToName[u], d});
        for (int v : adj[u]) {
            q.push({v, d + 1});
        }
    }

    sort(results.begin(), results.end(), [](const Node& a, const Node& b) {
        if (a.depth != b.depth) return a.depth < b.depth;
        return a.name < b.name;
    });

    for (const auto& r : results) {
        cout << r.name << " " << r.depth << "\\n";
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    record Node(String name, int depth) {}

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();

        Map<Integer, String> idToName = new HashMap<>();
        Map<Integer, List<Integer>> adj = new HashMap<>();
        int ceoId = 0;

        for (int i = 0; i < n; i++) {
            int id = sc.nextInt();
            String name = sc.next();
            int mgr = sc.nextInt();
            idToName.put(id, name);
            if (mgr == 0) {
                ceoId = id;
            } else {
                adj.computeIfAbsent(mgr, k -> new ArrayList<>()).add(id);
            }
        }

        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{ceoId, 0});
        List<Node> list = new ArrayList<>();

        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int u = curr[0];
            int d = curr[1];
            list.add(new Node(idToName.get(u), d));
            for (int v : adj.getOrDefault(u, Collections.emptyList())) {
                q.add(new int[]{v, d + 1});
            }
        }

        list.sort((a, b) -> {
            if (a.depth() != b.depth()) return Integer.compare(a.depth(), b.depth());
            return a.name().compareTo(b.name());
        });

        for (Node node : list) {
            System.out.println(node.name() + " " + node.depth());
        }
    }
}`,
      python: `import sys
from collections import deque

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    idx = 1
    id_to_name = {}
    adj = {}
    ceo_id = 0

    for _ in range(n):
        eid = int(raw[idx])
        name = raw[idx+1]
        mgr = int(raw[idx+2])
        idx += 3
        id_to_name[eid] = name
        if mgr == 0:
            ceo_id = eid
        else:
            if mgr not in adj:
                adj[mgr] = []
            adj[mgr].append(eid)

    q = deque([(ceo_id, 0)])
    results = []

    while q:
        u, d = q.popleft()
        results.append((d, id_to_name[u]))
        for v in adj.get(u, []):
            q.append((v, d + 1))

    results.sort(key=lambda x: (x[0], x[1]))

    for d, name in results:
        print(f"{name} {d}")

if __name__ == "__main__":
    solve()`,
    },
    testCases: [
      {
        id: 'tc1',
        input: '5\n1 Alice 0\n2 Bob 1\n3 Charlie 1\n4 David 2\n5 Emma 2',
        expectedOutput: 'Alice 0\nBob 1\nCharlie 1\nDavid 2\nEmma 2',
        isHidden: false,
        explanation: 'Alice is depth 0 (CEO). Bob & Charlie report to Alice (depth 1). David & Emma report to Bob (depth 2).',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Anchor Member Initialization',
        description: 'Find employee with manager_id = 0 (Alice). Initialize depth = 0.',
        variables: { anchor_emp: 'Alice', depth: 0 },
      },
      {
        step: 2,
        label: 'Recursive Join Phase (Depth 1)',
        description: 'Find employees reporting to Alice (Bob, Charlie). Set depth = 1.',
        variables: { direct_reports: 'Bob, Charlie', depth: 1 },
      },
      {
        step: 3,
        label: 'Recursive Join Phase (Depth 2)',
        description: 'Find employees reporting to Bob (David, Emma). Set depth = 2.',
        variables: { indirect_reports: 'David, Emma', depth: 2 },
      },
    ],
  },
];
