import { ProgrammingNote } from '../types';

/**
 * Day 4 Comprehensive Programming Notes & Solved Examples
 * Module 4: SQL & Relational Database Systems
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 * Covers: SQL Logical Execution Order, Join Algorithms, B+ Tree Indexing & Sargability,
 * Normalisation Theory (1NF-BCNF), ACID Transactions, Isolation Anomalies, and Window Functions.
 */
export const DAY_4_PROGRAMMING_NOTES: ProgrammingNote[] = [
  {
    id: 'd4-note-1',
    title: 'SQL Logical Execution Order & Join Algorithms (Nested Loop, Hash, Sort-Merge)',
    conceptSummary:
      'SQL is declarative: you specify WHAT data you want, and the database query optimizer chooses the execution plan. The logical execution order is: FROM/JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT/OFFSET.\n\nKey Insights:\n1. Why WHERE cannot use SELECT aliases: WHERE executes BEFORE SELECT.\n2. Why HAVING can filter aggregates: HAVING executes AFTER GROUP BY.\n3. Join Algorithms:\n   - Nested Loop Join: O(M * N) worst case, O(M * log N) with index on inner table. Best for small outer tables.\n   - Hash Join: O(M + N) time, O(min(M, N)) space. Builds an in-memory hash table on the smaller table, then probes it with the larger table. Used for equi-joins without indexes.\n   - Sort-Merge Join: O(M log M + N log N) for sorting, then O(M + N) merge scan. Best when inputs are already sorted or ordered by index.',
    timeSpaceNote:
      'Nested Loop: O(M*N) time, O(1) space | Hash Join: O(M+N) time, O(min(M,N)) space | Sort-Merge: O(M log M + N log N) time, O(1) space',
    kapilMentorTip:
      'In tech interviews, when asked "Why is this query slow?", check if an index exists on the foreign key column. Without an index, a JOIN degrades from an index nested-loop join (O(M log N)) into a full table scan or costly disk-based hash join!',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>

/*
 * C Simulation of Relational Equi-Hash Join:
 * SELECT E.name, D.dept_name
 * FROM Employees E
 * JOIN Departments D ON E.dept_id = D.id;
 */
typedef struct { int id; char name[20]; } Dept;
typedef struct { int id; char name[20]; int dept_id; } Emp;

int main() {
    Dept depts[] = {{101, "Engineering"}, {102, "Finance"}, {103, "Marketing"}};
    Emp emps[] = {{1, "Arjun", 101}, {2, "Priya", 102}, {3, "Rohan", 101}, {4, "Sneha", 104}};
    int d_count = 3, e_count = 4;

    printf("--- HASH JOIN PROBE RESULTS ---\\n");
    for (int i = 0; i < e_count; i++) {
        for (int j = 0; j < d_count; j++) {
            if (emps[i].dept_id == depts[j].id) {
                printf("Emp: %-8s | Dept: %s\\n", emps[i].name, depts[j].name);
                break;
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>
using namespace std;

// Relational Hash Join: O(M + N) Time, O(D) Space
struct Department { int id; string name; };
struct Employee { int id; string name; int dept_id; };

int main() {
    vector<Department> departments = {{101, "Engineering"}, {102, "Finance"}, {103, "Marketing"}};
    vector<Employee> employees = {{1, "Arjun", 101}, {2, "Priya", 102}, {3, "Rohan", 101}, {4, "Sneha", 104}};

    // 1. BUILD PHASE: Hash table on smaller table (Departments)
    unordered_map<int, string> dept_hash;
    for (const auto& d : departments) dept_hash[d.id] = d.name;

    // 2. PROBE PHASE: Scan Employees and probe hash table
    cout << "--- INNER JOIN RESULTS ---\\n";
    for (const auto& e : employees) {
        auto it = dept_hash.find(e.dept_id);
        if (it != dept_hash.end()) {
            cout << "Emp: " << e.name << " -> Dept: " << it->second << "\\n";
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class RelationalHashJoin {
    record Dept(int id, String name) {}
    record Emp(int id, String name, int deptId) {}

    public static void main(String[] args) {
        List<Dept> depts = List.of(new Dept(101, "Engineering"), new Dept(102, "Finance"));
        List<Emp> emps = List.of(
            new Emp(1, "Arjun", 101),
            new Emp(2, "Priya", 102),
            new Emp(3, "Rohan", 101),
            new Emp(4, "Karan", 999) // Unmatched
        );

        // Build Phase: O(D)
        Map<Integer, String> deptMap = new HashMap<>();
        for (Dept d : depts) deptMap.put(d.id(), d.name());

        // Probe Phase: O(E)
        System.out.println("--- RELATIONAL HASH JOIN ---");
        for (Emp e : emps) {
            String deptName = deptMap.get(e.deptId());
            if (deptName != null) {
                System.out.printf("Employee: %-8s | Department: %s%n", e.name(), deptName);
            }
        }
    }
}`,
      python: `def hash_join():
    departments = [(101, "Engineering"), (102, "Finance"), (103, "Marketing")]
    employees = [
        (1, "Arjun", 101),
        (2, "Priya", 102),
        (3, "Rohan", 101),
        (4, "Sneha", 104)  # unmatched dept
    ]

    # Build phase on inner table: O(M)
    dept_hash = {dept_id: name for dept_id, name in departments}

    # Probe phase on outer table: O(N)
    print("--- INNER JOIN ---")
    for emp_id, name, dept_id in employees:
        if dept_id in dept_hash:
            print(f"Emp: {name:<8} | Dept: {dept_hash[dept_id]}")

if __name__ == "__main__":
    hash_join()`,
    },
  },
  {
    id: 'd4-note-2',
    title: 'B+ Tree Index Architecture, Sargability & Query Optimization',
    conceptSummary:
      'Relational databases (MySQL InnoDB, PostgreSQL, Oracle) utilize B+ Trees for disk-based indexing.\n\nB+ Tree Core Mechanics:\n1. All data pointers/records reside strictly in LEAF nodes. Internal nodes contain only routing keys, allowing high branch fan-out (1000+ keys per page).\n2. Leaves are linked sequentially as a doubly linked list, enabling lightning-fast range scans (`BETWEEN`, `>`, `<`).\n3. Clustered vs Secondary Index:\n   - Clustered Index: The table IS the B+ Tree; leaf nodes contain the full row data. Only 1 clustered index per table (typically Primary Key).\n   - Secondary (Non-clustered) Index: Leaf nodes store the index key + primary key pointer. Accessing other columns requires an extra "Bookmark Lookup" (double traversal) unless the query is satisfied by a Covering Index.\n\nSargability (Search Argument Able):\nA query predicate is sargable if the engine can utilize an index seek rather than a full index/table scan. Applying functions (`WHERE YEAR(dob) = 2000` or `WHERE UPPER(email) = "..."`) destroys sargability!',
    timeSpaceNote:
      'Point Lookup: O(log_B N) disk I/O | Range Scan: O(log_B N + K/B) disk I/O | Fan-out B typically 500-1000',
    kapilMentorTip:
      'Remember the Leftmost Prefix Rule for composite indexes (colA, colB, colC): the index can satisfy queries on (colA), (colA, colB), and (colA, colB, colC), but CANNOT optimize a query filtering solely on (colB) or (colC)!',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>

/*
 * B+ Tree Leaf Node Simulation with Doubly Linked Pointers:
 * Demonstrates how range scans jump to start key and scan horizontally.
 */
typedef struct LeafNode {
    int keys[3];
    int count;
    struct LeafNode* next;
} LeafNode;

int main() {
    LeafNode leaf2 = {{70, 80, 90}, 3, NULL};
    LeafNode leaf1 = {{10, 20, 30}, 3, &leaf2};

    // Range Query: SELECT * WHERE key >= 20 AND key <= 80;
    printf("B+ Tree Horizontal Range Scan (20 to 80):\\n");
    LeafNode* curr = &leaf1;
    while (curr) {
        for (int i = 0; i < curr->count; i++) {
            if (curr->keys[i] >= 20 && curr->keys[i] <= 80) {
                printf("Found Indexed Key: %d\\n", curr->keys[i]);
            }
        }
        curr = curr->next;
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Demonstrating Sargable vs Non-Sargable Predicates
int main() {
    vector<int> indexed_timestamps = {1609459200, 1609545600, 1612137600, 1614556800};

    // Sargable: Binary Search / B+ Tree Seek O(log N)
    int target_min = 1609500000;
    auto it = lower_bound(indexed_timestamps.begin(), indexed_timestamps.end(), target_min);
    cout << "Sargable Index Seek result: " << *it << " (O(log N))\\n";

    // Non-sargable equivalent (e.g. converting timestamp in WHERE clause):
    // Requires scanning all N rows because function strips sort order!
    cout << "Non-sargable functions force a FULL TABLE SCAN!\\n";
    return 0;
}`,
      java: `import java.util.*;

public class IndexCoveringDemo {
    // A covering index contains ALL columns requested in SELECT and WHERE
    // eliminating the secondary-to-primary lookup!
    static class UserRow { int id; String email; String role; }

    public static void main(String[] args) {
        // Index on (email, role)
        Map<String, String> coveringIndex = new TreeMap<>();
        coveringIndex.put("arjun@spsu.ac.in", "STUDENT");
        coveringIndex.put("kapil@spsu.ac.in", "MENTOR");

        // Query: SELECT role FROM users WHERE email = 'kapil@spsu.ac.in';
        // Result is retrieved directly from the index without reading table heap!
        String role = coveringIndex.get("kapil@spsu.ac.in");
        System.out.println("Covering Index hit without table heap lookup: role=" + role);
    }
}`,
      python: `import bisect

def b_plus_tree_range_scan():
    # Simulating sorted leaf pages
    leaf_keys = [10, 20, 30, 45, 50, 65, 80, 95, 110]

    # Query: SELECT * WHERE id BETWEEN 25 AND 85;
    # 1. B+ Tree Seek to lower bound: O(log N)
    start_idx = bisect.bisect_left(leaf_keys, 25)
    
    # 2. Sequential leaf traversal: O(K)
    results = []
    for idx in range(start_idx, len(leaf_keys)):
        if leaf_keys[idx] > 85:
            break
        results.append(leaf_keys[idx])
        
    print(f"B+ Tree Index Scan matched keys: {results}")

if __name__ == "__main__":
    b_plus_tree_range_scan()`,
    },
  },
  {
    id: 'd4-note-3',
    title: 'Database Normalisation (1NF, 2NF, 3NF, BCNF) & Key Theory',
    conceptSummary:
      'Database normalisation eliminates data redundancy and prevents insertion, update, and deletion anomalies.\n\nNormal Form Hierarchy:\n1. 1NF (Atomic Values): Every attribute must contain only atomic (indivisible) values. No repeating groups or comma-separated lists.\n2. 2NF (No Partial Dependency): Must be in 1NF, and every non-prime attribute must be FULLY functionally dependent on the ENTIRE candidate key (relevant when candidate key is composite).\n3. 3NF (No Transitive Dependency): Must be in 2NF, and no non-prime attribute should depend on another non-prime attribute (X -> Y where X is not a superkey and Y is not prime).\n4. BCNF (Boyce-Codd NF): For EVERY non-trivial functional dependency X -> Y, X MUST be a superkey.\n\nLossless Join vs Dependency Preservation:\n- A decomposition of R into (R1, R2) is LOSSLESS if and only if R1 ∩ R2 -> R1 or R1 ∩ R2 -> R2 (the shared attributes form a superkey of at least one relation).',
    timeSpaceNote:
      'Higher normal forms reduce write amplification and storage, but require more JOINs during read queries.',
    kapilMentorTip:
      'In high-throughput placement interviews (e.g. Swiggy, Uber, Flipkart), you will be asked when to DENORMALIZE. The answer: when read performance on critical read-heavy paths outweighs write anomaly risk, you denormalize deliberately with cache-invalidation guards!',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>

/*
 * C Simulation of 2NF vs 3NF check:
 * Functional Dependencies:
 * RollNo -> StudentName
 * RollNo -> DeptID
 * DeptID -> DeptHead  (Transitive dependency RollNo -> DeptHead: Violates 3NF!)
 */
int main() {
    printf("Original Relation (RollNo, StudentName, DeptID, DeptHead) is in 2NF.\\n");
    printf("Transitive Dependency: DeptID -> DeptHead causes 3NF violation.\\n");
    printf("Decomposed 3NF Relations:\\n");
    printf("1. Students(RollNo [PK], StudentName, DeptID [FK])\\n");
    printf("2. Departments(DeptID [PK], DeptHead)\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <set>
#include <map>
#include <string>
using namespace std;

// BCNF Validator: For every X -> Y, X must be a superkey
bool checkBCNF(const set<string>& candidate_keys, const map<string, string>& fds) {
    for (const auto& [lhs, rhs] : fds) {
        if (candidate_keys.find(lhs) == candidate_keys.end()) {
            cout << "BCNF VIOLATION: Functional Dependency (" << lhs << " -> " << rhs 
                 << ") where LHS is not a Superkey!\\n";
            return false;
        }
    }
    return true;
}

int main() {
    set<string> candidate_keys = {"StudentID_CourseID"};
    map<string, string> fds = {
        {"StudentID_CourseID", "Grade"},
        {"ProfessorID", "CourseID"} // Violates BCNF if ProfessorID is not a candidate key
    };
    bool is_bcnf = checkBCNF(candidate_keys, fds);
    cout << "Is Schema in BCNF? " << (is_bcnf ? "YES" : "NO") << endl;
    return 0;
}`,
      java: `import java.util.*;

public class NormalisationEngine {
    // Lossless Decomposition Verification:
    // (R1 ∩ R2) must determine either R1 or R2
    public static void main(String[] args) {
        Set<String> r1 = Set.of("EmpID", "DeptID");
        Set<String> r2 = Set.of("DeptID", "DeptName", "DeptHead");

        Set<String> intersection = new HashSet<>(r1);
        intersection.retainAll(r2); // DeptID

        System.out.println("Shared Attribute: " + intersection);
        System.out.println("Does DeptID -> R2 hold? YES (DeptID is PK of Departments)");
        System.out.println("Conclusion: Decomposition is LOSSLESS!");
    }
}`,
      python: `def check_lossless_join(r1_cols, r2_cols, pk_r2):
    shared = set(r1_cols).intersection(set(r2_cols))
    # If shared attributes contain the primary key of either relation, it is lossless
    is_lossless = pk_r2.issubset(shared)
    print(f"Shared Columns: {shared}")
    print(f"Lossless Decomposition Verified? {is_lossless}")

if __name__ == "__main__":
    check_lossless_join(["emp_id", "dept_id"], ["dept_id", "dept_name"], {"dept_id"})`,
    },
  },
  {
    id: 'd4-note-4',
    title: 'ACID Guarantees, Transaction Isolation Levels & Concurrency Anomalies',
    conceptSummary:
      'ACID guarantees ensure database integrity under concurrent access and crashes.\n\nACID Properties:\n1. Atomicity: All-or-nothing execution. Achieved via Write-Ahead Logging (WAL) and Undo logs.\n2. Consistency: Database transitions from one valid state to another, satisfying all constraints.\n3. Isolation: Concurrent transactions do not interfere with each other.\n4. Durability: Committed updates survive system crashes (WAL Redo logs + fsync).\n\nANSI SQL Isolation Levels & Concurrency Anomalies:\n- Read Uncommitted: Subject to Dirty Reads, Non-repeatable Reads, Phantom Reads.\n- Read Committed: Prevents Dirty Reads (reads only committed rows). Subject to Non-repeatable Reads and Phantom Reads.\n- Repeatable Read (Default in MySQL InnoDB): Prevents Dirty Reads & Non-repeatable Reads. Uses MVCC and Next-Key Locking to prevent Phantom Reads.\n- Serializable: Highest isolation. Full serial execution simulated via Strict Two-Phase Locking (SS2PL) or Serializable Snapshot Isolation (SSI).',
    timeSpaceNote:
      'Isolation vs Performance trade-off: Higher isolation introduces lock contention and rollback overhead.',
    kapilMentorTip:
      'When asked about Deadlocks in databases: A deadlock occurs when two transactions hold locks and each waits for the other (Cycle in Wait-For Graph). Modern engines detect deadlocks via cycle-detection background threads and abort the transaction with fewer writes ("younger victim") to unblock the system.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>

/*
 * C Simulation of Transaction Rollback via Undo Log:
 * Demonstrating Atomicity: Either all account balances update, or all revert!
 */
typedef struct { int acc_id; int balance; } Account;

int main() {
    Account a = {101, 1000}, b = {102, 500};
    int transfer_amount = 600;

    printf("Initial: Acc101=%d, Acc102=%d\\n", a.balance, b.balance);
    // Begin Transaction
    int undo_a = a.balance, undo_b = b.balance;
    a.balance -= transfer_amount; // Step 1

    bool simulate_system_crash = true;
    if (simulate_system_crash) {
        printf("CRASH DETECTED before step 2! Triggering UNDO LOG rollback...\\n");
        a.balance = undo_a;
        b.balance = undo_b;
    } else {
        b.balance += transfer_amount;
        printf("COMMIT!\\n");
    }

    printf("Final: Acc101=%d, Acc102=%d (Atomicity Guaranteed)\\n", a.balance, b.balance);
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Transaction Isolation Anomalies Summary Matrix
struct Anomaly { string level; bool dirty_read; bool non_repeatable; bool phantom; };

int main() {
    vector<Anomaly> matrix = {
        {"Read Uncommitted", true, true, true},
        {"Read Committed", false, true, true},
        {"Repeatable Read", false, false, false}, // MySQL InnoDB with Next-Key Locks
        {"Serializable", false, false, false}
    };
    cout << "--- ANSI SQL ISOLATION ANOMALY MATRIX ---\\n";
    for (const auto& a : matrix) {
        cout << a.level << " -> Dirty:" << (a.dirty_read ? "YES" : "NO ")
             << " | Non-Repeatable:" << (a.non_repeatable ? "YES" : "NO ")
             << " | Phantom:" << (a.phantom ? "YES" : "NO ") << "\\n";
    }
    return 0;
}`,
      java: `public class AcidIsolationDemo {
    // Demonstration of Multi-Version Concurrency Control (MVCC)
    // Readers do not block writers, and writers do not block readers!
    static class DataItem {
        int value;
        int version;
        DataItem(int v, int ver) { this.value = v; this.version = ver; }
    }

    public static void main(String[] args) {
        DataItem rowV1 = new DataItem(100, 1);
        System.out.println("Transaction T1 (Read Committed) sees snapshot Version: " + rowV1.version + ", Value: " + rowV1.value);

        // Transaction T2 updates row concurrently: creates version 2 in Undo Log
        DataItem rowV2 = new DataItem(250, 2);
        System.out.println("Transaction T2 writes Version 2 (Value: " + rowV2.value + ") concurrently without locking T1!");
    }
}`,
      python: `def simulate_deadlock():
    # Transaction Wait-For Graph:
    # T1 holds Lock A, wants Lock B
    # T2 holds Lock B, wants Lock A
    wait_for_graph = {
        "T1": ["T2"],  # T1 waits for T2
        "T2": ["T1"]   # T2 waits for T1 -> Cycle detected!
    }
    
    print("Wait-For Graph Cycle Detected: T1 -> T2 -> T1")
    print("Deadlock Detector Action: Roll back T2 (lowest write cost), grant lock to T1.")

if __name__ == "__main__":
    simulate_deadlock()`,
    },
  },
  {
    id: 'd4-note-5',
    title: 'Advanced Window Functions, CTEs & Ranking Query Optimization',
    conceptSummary:
      'Window functions compute aggregated values across a set of table rows without collapsing them into a single row (unlike GROUP BY).\n\nCore Window Functions:\n1. ROW_NUMBER(): Assigns a unique sequential integer (1, 2, 3...) to rows within each partition.\n2. RANK(): Assigns rank with gaps for ties (e.g. 1, 2, 2, 4).\n3. DENSE_RANK(): Assigns rank without gaps for ties (e.g. 1, 2, 2, 3). Essential for "N-th highest salary".\n4. NTILE(N): Divides partition into N roughly equal buckets/quartiles.\n5. LEAD(col, offset) & LAG(col, offset): Accesses subsequent or previous rows without a self-join.\n\nCommon Table Expressions (CTEs):\n- `WITH RegionalSales AS (...)` enhances modularity and readability.\n- Recursive CTEs enable graph traversal and hierarchical organizational tree queries (e.g. employee-to-CEO reporting chains).',
    timeSpaceNote:
      'Window functions require sorting partitions: O(N log N) time, O(N) space. Extremely faster than correlated self-joins.',
    kapilMentorTip:
      'Classic interview question: "Find the 3rd highest salary in each department." Use `DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rnk` inside a CTE, then filter `WHERE rnk = 3`. Never use subquery `LIMIT 1 OFFSET 2` because OFFSET fails on ties and multi-department partitions!',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>

/*
 * C Simulation of DENSE_RANK() vs RANK():
 * Sorted Salaries: 100k, 90k, 90k, 80k
 */
int main() {
    int salaries[] = {100, 90, 90, 80};
    int n = 4;
    int rank = 1, dense_rank = 1;

    printf("Salary | RANK | DENSE_RANK\\n");
    for (int i = 0; i < n; i++) {
        if (i > 0) {
            if (salaries[i] == salaries[i - 1]) {
                // Tie: rank stays same, dense_rank stays same
            } else {
                rank = i + 1;       // Gaps: 1, 2, 2, 4
                dense_rank++;       // No gaps: 1, 2, 2, 3
            }
        }
        printf("%5dk | %4d | %10d\\n", salaries[i], rank, dense_rank);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Simulating SQL: SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC)
struct Employee { string name; int salary; };

int main() {
    vector<Employee> emps = {{"Arjun", 95000}, {"Neha", 90000}, {"Pooja", 90000}, {"Rahul", 75000}};
    sort(emps.begin(), emps.end(), [](const Employee& a, const Employee& b) {
        return a.salary > b.salary;
    });

    int current_rank = 1;
    cout << "--- SQL DENSE_RANK SIMULATION ---\\n";
    for (size_t i = 0; i < emps.size(); i++) {
        if (i > 0 && emps[i].salary < emps[i - 1].salary) {
            current_rank++;
        }
        cout << "Rank " << current_rank << ": " << emps[i].name << " (" << emps[i].salary << ")\\n";
    }
    return 0;
}`,
      java: `import java.util.*;

public class WindowFunctionDemo {
    record SalaryRecord(String name, int dept, int salary) {}

    public static void main(String[] args) {
        List<SalaryRecord> list = List.of(
            new SalaryRecord("A", 101, 100),
            new SalaryRecord("B", 101, 90),
            new SalaryRecord("C", 101, 90),
            new SalaryRecord("D", 101, 80)
        );

        int denseRank = 1;
        System.out.println("SQL: DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC)");
        for (int i = 0; i < list.size(); i++) {
            if (i > 0 && list.get(i).salary() < list.get(i - 1).salary()) {
                denseRank++;
            }
            System.out.printf("Emp %s -> DenseRank: %d%n", list.get(i).name(), denseRank);
        }
    }
}`,
      python: `def simulate_lead_lag():
    # SQL: SELECT date, revenue, LAG(revenue, 1) OVER (ORDER BY date) as prev_day_rev
    daily_revenue = [
        ("2026-10-26", 15000),
        ("2026-10-27", 18500),
        ("2026-10-28", 22000)
    ]
    
    print("--- LAG() SIMULATION ---")
    for i in range(len(daily_revenue)):
        date, rev = daily_revenue[i]
        prev_rev = daily_revenue[i - 1][1] if i > 0 else None
        delta = (rev - prev_rev) if prev_rev else 0
        print(f"Date: {date} | Today: {rev} | PrevDay: {prev_rev} | Growth: +{delta}")

if __name__ == "__main__":
    simulate_lead_lag()`,
    },
  },
];
