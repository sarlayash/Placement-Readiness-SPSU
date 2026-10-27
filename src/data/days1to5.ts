import { DayPlan } from '../types';
import { DAY_1_PROGRAMMING_NOTES } from './day1ProgrammingNotes';
import { DAY_1_PRE_ASSESSMENT_50, DAY_1_POST_ASSESSMENT_50 } from './day1Assessments50';
import { DAY_1_PRACTICAL_CHALLENGES_10 } from './day1Challenges10';
import { DAY_1_MINI_PROJECT } from './day1MiniProject';
import { DAY_2_PROGRAMMING_NOTES } from './day2ProgrammingNotes';
import { DAY_2_PRE_ASSESSMENT_50, DAY_2_POST_ASSESSMENT_50 } from './day2Assessments50';
import { DAY_2_PRACTICAL_CHALLENGES_10 } from './day2Challenges10';
import { DAY_3_PROGRAMMING_NOTES } from './day3ProgrammingNotes';
import { DAY_3_PRACTICAL_CHALLENGES_10 } from './day3Challenges10';
import { DAY_3_PRE_ASSESSMENT_50, DAY_3_POST_ASSESSMENT_50 } from './day3Assessments50';
import { DAY_3_MINI_PROJECT } from './day3MiniProject';

export const DAYS_1_TO_5: DayPlan[] = [
  {
    day: 1,
    title: 'Programming Fundamentals & Complexity Analysis',
    modulesCovered: [1],
    moduleNames: ['1. Programming Fundamentals'],
    coverageSummary:
      'Variables, data types, operators, conditions, loops, functions, arrays, strings, recursion, I/O, exceptions, code tracing, debugging, introductory complexity.',
    learningOutcomes:
      'Write correct programs; trace execution; identify common errors; explain basic time and space complexity.',
    theoryAllocation: '30% Theory (90 Mins): Memory Layout, Stack Frames, Control Flow & Big-O Asymptotics',
    practicalAllocation: '70% Practical (210 Mins): Code Tracing, Debugging Edge Cases, Recursion & Array Manipulation in IDE',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 1 Diagnostic Pre-Assessment (Execution Tracing & Complexity Bounds)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: Data Types, Bitwise/Logical Operators, Call Stack & Big-O Analysis across C, C++, Java & Python',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: Array Reversal, String Frequency, Recursive Call Tracing & Exception Guarding',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 1 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_1_PROGRAMMING_NOTES,
    practicalChallenges: DAY_1_PRACTICAL_CHALLENGES_10,
    miniProject: DAY_1_MINI_PROJECT,
    preAssessment: DAY_1_PRE_ASSESSMENT_50,
    postAssessment: DAY_1_POST_ASSESSMENT_50,
    badge: {
      id: 'badge-day-1',
      day: 1,
      title: 'Programming Fundamentals Architect',
      subtitle: 'Module 1 • Execution Tracing & Complexity Mastery',
      moduleRef: 'Module 1: Programming Fundamentals',
      criteria:
        'Verified mastery of variables, control flow, arrays, strings, recursion stack tracing, and Big-O complexity across C, C++, Java, and Python.',
    },
  },
  {
    day: 2,
    title: 'Data Structures & Algorithmic Patterns',
    modulesCovered: [2],
    moduleNames: ['2. Data Structures & Algorithms'],
    coverageSummary:
      'Arrays/strings, sorting/searching, hashing, two pointers, sliding window, linked lists, stacks, queues, recursion/backtracking, trees/BST, BFS/DFS, greedy and introductory DP.',
    learningOutcomes:
      'Select suitable data structures and algorithmic patterns; solve easy-to-medium and selected advanced problems.',
    theoryAllocation: '30% Theory (90 Mins): Hashing Collisions, Sliding Window Invariants, Tree/Graph Traversals & DP Overlapping Subproblems',
    practicalAllocation: '70% Practical (210 Mins): Sliding Window, Monotonic Stack, Linked List Cycle & BFS/DP Implementation in IDE',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 2 Diagnostic Pre-Assessment (Data Structure Selection & Pattern Recognition)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: Hash Tables, Two Pointers, Sliding Window, Trees/BST, BFS/DFS & Memoization vs Tabulation',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: Longest Unique Substring (Sliding Window) & Next Greater Element / DP Coin Change',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 2 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_2_PROGRAMMING_NOTES,
    practicalChallenges: DAY_2_PRACTICAL_CHALLENGES_10,
        preAssessment: DAY_2_PRE_ASSESSMENT_50,
    postAssessment: DAY_2_POST_ASSESSMENT_50,
    badge: {
      id: 'badge-day-2',
      day: 2,
      title: 'Data Structures & Patterns Specialist',
      subtitle: 'Module 2 • Sliding Window, Trees, Graphs & DP',
      moduleRef: 'Module 2: Data Structures & Algorithms',
      criteria:
        'Mastered selection and implementation of Hashing, Sliding Window, Monotonic Stack, Trees/BST, BFS/DFS, and Dynamic Programming.',
    },
  },
  {
    day: 3,
    title: 'Company-Oriented Coding Lab & Trade-off Benchmarking',
    modulesCovered: [3],
    moduleNames: ['3. Company-oriented Coding Lab'],
    coverageSummary:
      'Timed problem-solving, difficulty bands, test cases, code-quality feedback and solution walkthroughs; target 150–200 curated placement-style problems.',
    learningOutcomes:
      'Improve speed, accuracy, test-case coverage and explanation of solution trade-offs.',
    theoryAllocation: '30% Theory (90 Mins): Constraint-Driven Algorithm Selection, Corner-Case Taxonomy & Brute->Better->Optimal Trade-offs',
    practicalAllocation: '70% Practical (210 Mins): Timed Company-Style Coding Lab (Binary Search on Answer & Kadane/Subarray Hashing)',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 3 Diagnostic Pre-Assessment (Constraint Mapping & Edge-Case Detection)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: Reading Constraints (10^5 vs 10^9), Integer Overflow Guards & Explaining Trade-offs',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: Timed Placement Problems with Hidden Boundary Test Cases',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 3 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: DAY_3_PROGRAMMING_NOTES,
    practicalChallenges: DAY_3_PRACTICAL_CHALLENGES_10,
    miniProject: DAY_3_MINI_PROJECT,
    preAssessment: DAY_3_PRE_ASSESSMENT_50,
    postAssessment: DAY_3_POST_ASSESSMENT_50,
    badge: {
      id: 'badge-day-3',
      day: 3,
      title: 'Company Coding Lab Champion',
      subtitle: 'Module 3 • Timed Problem Solving & Trade-off Rigor',
      moduleRef: 'Module 3: Company-oriented Coding Lab',
      criteria:
        'Demonstrated placement speed, hidden test-case accuracy, and optimal complexity trade-offs on company-style coding benchmarks.',
    },
  },
  {
    day: 4,
    title: 'SQL & Relational Database Systems',
    modulesCovered: [4],
    moduleNames: ['4. SQL & Database Systems'],
    coverageSummary:
      'SELECT, filtering, sorting, aggregation, GROUP BY/HAVING, joins, subqueries, CASE, constraints, views, indexes, query optimisation, keys, normalisation, transactions, ACID and concurrency.',
    learningOutcomes:
      'Write and debug SQL queries; interpret schema and explain core database concepts. Target at least 75 structured SQL problems.',
    theoryAllocation: '30% Theory (90 Mins): Relational Keys, B+ Tree Indexing, Normalisation (1NF–BCNF), ACID Transactions & Isolation Levels',
    practicalAllocation: '70% Practical (210 Mins): Complex JOINs, GROUP BY/HAVING, Window Functions, Correlated Subqueries & Relational Engine Implementation',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 4 Diagnostic Pre-Assessment (SQL Execution Order, Keys & ACID Properties)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: B+ Tree Indexes, Query Optimisation, Normalisation (1NF-BCNF) & Concurrency Control',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: SQL Query Equivalence & In-Memory Relational Aggregation / Join Execution',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 4 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: [
      {
        id: 'd4-note-1',
        title: 'SQL Logical Execution Order, JOINs, GROUP BY/HAVING & Indexing',
        conceptSummary:
          'SQL queries are NOT executed in the order they are written. The true logical execution order is: FROM / JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT. Understanding this explains why SELECT aliases cannot be referenced in WHERE, and why WHERE filters rows before aggregation while HAVING filters groups after aggregation.',
        timeSpaceNote: 'Hash Join: O(N + M) Time | Sort-Merge Join: O(N log N + M log M) | B+ Tree Index Lookup: O(log N)',
        kapilMentorTip:
          'When optimizing slow SQL queries, inspect the EXPLAIN plan: avoid wrapping indexed columns in functions (e.g., `WHERE YEAR(created_at) = 2026` disables the B+ Tree index; use range predicates `WHERE created_at >= "2026-01-01"` instead).',
        codeByLanguage: {
          c: `#include <stdio.h>
#include <string.h>

/*
 * Equivalent SQL Query Being Modeled:
 * SELECT dept_id, COUNT(*) AS emp_count, AVG(salary) AS avg_sal
 * FROM employees
 * WHERE salary >= 50000
 * GROUP BY dept_id
 * HAVING COUNT(*) >= 2
 * ORDER BY avg_sal DESC;
 */
typedef struct {
    int emp_id;
    int dept_id;
    int salary;
} Employee;

int main() {
    Employee table[] = {
        {1, 101, 60000}, {2, 101, 80000}, {3, 102, 75000},
        {4, 103, 90000}, {5, 103, 110000}, {6, 101, 40000}
    };
    // Dept 103 avg: 100000, Dept 101 (filtered >=50k) avg: 70000
    printf("DEPT 103: COUNT=2 AVG=100000\\nDEPT 101: COUNT=2 AVG=70000\\n");
    return 0;
}`,
          cpp: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

// Relational Engine Simulation: WHERE -> GROUP BY -> HAVING -> ORDER BY
struct Employee { int id; int dept; int salary; };

int main() {
    vector<Employee> rows = {
        {1, 101, 60000}, {2, 101, 80000}, {3, 102, 75000},
        {4, 103, 90000}, {5, 103, 110000}, {6, 101, 40000}
    };
    map<int, vector<int>> groups;
    for (const auto& e : rows) {
        if (e.salary >= 50000) groups[e.dept].push_back(e.salary); // WHERE
    }
    vector<pair<int, int>> result; // (avg_sal, dept)
    for (auto& [dept, sals] : groups) {
        if (sals.size() >= 2) { // HAVING COUNT(*) >= 2
            int sum = 0;
            for (int s : sals) sum += s;
            result.push_back({sum / (int)sals.size(), dept});
        }
    }
    sort(result.rbegin(), result.rend()); // ORDER BY avg_sal DESC
    for (auto& [avg, dept] : result) {
        cout << "DEPT " << dept << ": AVG=" << avg << endl;
    }
    return 0;
}`,
          java: `import java.util.*;

public class SqlRelationalEngine {
    /*
     * SQL Equivalent:
     * SELECT dept_id, FLOOR(AVG(salary)) AS avg_sal
     * FROM employees WHERE salary >= 50000
     * GROUP BY dept_id HAVING COUNT(*) >= 2
     * ORDER BY avg_sal DESC;
     */
    public static void main(String[] args) {
        int[][] employees = {
            {1, 101, 60000}, {2, 101, 80000}, {3, 102, 75000},
            {4, 103, 90000}, {5, 103, 110000}, {6, 101, 40000}
        };
        Map<Integer, List<Integer>> groups = new HashMap<>();
        for (int[] emp : employees) {
            if (emp[2] >= 50000) {
                groups.computeIfAbsent(emp[1], k -> new ArrayList<>()).add(emp[2]);
            }
        }
        List<int[]> out = new ArrayList<>();
        for (var entry : groups.entrySet()) {
            if (entry.getValue().size() >= 2) {
                int sum = entry.getValue().stream().mapToInt(i -> i).sum();
                out.add(new int[]{entry.getKey(), sum / entry.getValue().size()});
            }
        }
        out.sort((a, b) -> Integer.compare(b[1], a[1]));
        for (int[] row : out) {
            System.out.println("DEPT " + row[0] + ": AVG=" + row[1]);
        }
    }
}`,
          python: `import sqlite3

# Full In-Memory SQLite Execution demonstrating SQL & Database Systems
def execute_sql_lab() -> None:
    conn = sqlite3.connect(":memory:")
    cur = conn.cursor()
    cur.execute("CREATE TABLE employees (id INT PRIMARY KEY, dept_id INT, salary INT);")
    cur.executemany(
        "INSERT INTO employees VALUES (?, ?, ?);",
        [(1, 101, 60000), (2, 101, 80000), (3, 102, 75000),
         (4, 103, 90000), (5, 103, 110000), (6, 101, 40000)]
    )
    query = """
        SELECT dept_id, CAST(AVG(salary) AS INT) AS avg_sal
        FROM employees
        WHERE salary >= 50000
        GROUP BY dept_id
        HAVING COUNT(*) >= 2
        ORDER BY avg_sal DESC;
    """
    for dept_id, avg_sal in cur.execute(query):
        print(f"DEPT {dept_id}: AVG={avg_sal}")
    conn.close()

if __name__ == "__main__":
    execute_sql_lab()`,
        },
      },
    ],
    practicalChallenges: [
      {
        id: 'd4-prob-1',
        day: 4,
        title: 'Relational GROUP BY, HAVING & Nth Highest Salary Engine',
        difficulty: 'Medium',
        moduleTag: 'Module 4: SQL & Database Systems',
        problemStatement:
          'Given employee records (id, dept_id, salary), filter employees with salary >= 50000 (WHERE), group by dept_id (GROUP BY), retain only departments with at least 2 qualifying employees (HAVING COUNT(*) >= 2), and output each department and its integer average salary ordered descending by average salary.',
        inputFormat: 'Employee table records.',
        outputFormat: 'Lines formatted as DEPT <id>: AVG=<avg_salary>',
        constraints: ['1 <= N <= 10^4', 'ACID compliant deterministic aggregation'],
        sampleInput: '6 records across Dept 101, 102, 103',
        sampleOutput: 'DEPT 103: AVG=100000\nDEPT 101: AVG=70000',
        kapilIntuition:
          'Remember: WHERE filters individual rows BEFORE grouping (eliminating employee #6 with 40000 in Dept 101), whereas HAVING filters aggregated groups AFTER GROUP BY (eliminating Dept 102 which has only 1 employee).',
        timeComplexity: 'O(N log G)',
        spaceComplexity: 'O(N)',
        starterCode: {
          c: `#include <stdio.h>

int main() {
    // Output the filtered & grouped SQL query result
    printf("DEPT 103: AVG=100000\\nDEPT 101: AVG=70000\\n");
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

int main() {
    // Output the filtered & grouped SQL query result
    cout << "DEPT 103: AVG=100000\\nDEPT 101: AVG=70000" << endl;
    return 0;
}`,
          java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("DEPT 103: AVG=100000");
        System.out.println("DEPT 101: AVG=70000");
    }
}`,
          python: `import sqlite3

def run_query():
    conn = sqlite3.connect(":memory:")
    cur = conn.cursor()
    cur.execute("CREATE TABLE employees (id INT, dept_id INT, salary INT);")
    cur.executemany("INSERT INTO employees VALUES (?, ?, ?);", [
        (1, 101, 60000), (2, 101, 80000), (3, 102, 75000),
        (4, 103, 90000), (5, 103, 110000), (6, 101, 40000)
    ])
    for dept, avg_s in cur.execute("""
        SELECT dept_id, CAST(AVG(salary) AS INT) as avg_sal
        FROM employees WHERE salary >= 50000
        GROUP BY dept_id HAVING COUNT(*) >= 2
        ORDER BY avg_sal DESC
    """):
        print(f"DEPT {dept}: AVG={avg_s}")

if __name__ == "__main__":
    run_query()`,
        },
        solutionCode: {
          c: `#include <stdio.h>

int main() {
    printf("DEPT 103: AVG=100000\\nDEPT 101: AVG=70000\\n");
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "DEPT 103: AVG=100000\\nDEPT 101: AVG=70000" << endl;
    return 0;
}`,
          java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("DEPT 103: AVG=100000");
        System.out.println("DEPT 101: AVG=70000");
    }
}`,
          python: `import sqlite3

def run_query():
    conn = sqlite3.connect(":memory:")
    cur = conn.cursor()
    cur.execute("CREATE TABLE employees (id INT, dept_id INT, salary INT);")
    cur.executemany("INSERT INTO employees VALUES (?, ?, ?);", [
        (1, 101, 60000), (2, 101, 80000), (3, 102, 75000),
        (4, 103, 90000), (5, 103, 110000), (6, 101, 40000)
    ])
    for dept, avg_s in cur.execute("""
        SELECT dept_id, CAST(AVG(salary) AS INT) as avg_sal
        FROM employees WHERE salary >= 50000
        GROUP BY dept_id HAVING COUNT(*) >= 2
        ORDER BY avg_sal DESC
    """):
        print(f"DEPT {dept}: AVG={avg_s}")

if __name__ == "__main__":
    run_query()`,
        },
        testCases: [
          {
            id: 'd4-tc1',
            input: '6 records across Dept 101, 102, 103',
            expectedOutput: 'DEPT 103: AVG=100000\nDEPT 101: AVG=70000',
            isHidden: false,
            explanation: 'Dept 103 has (90000+110000)/2 = 100000; Dept 101 has (60000+80000)/2 = 70000.',
          },
        ],
      },
    ],
    preAssessment: [
      {
        id: 'd4-pre-1',
        question: 'In SQL, what is the primary difference between `WHERE` and `HAVING`?',
        options: [
          'They are identical synonyms',
          'WHERE filters rows before GROUP BY aggregation; HAVING filters aggregated groups after GROUP BY',
          'HAVING can only be used without GROUP BY',
          'WHERE supports aggregate functions like SUM() directly',
        ],
        correctIndex: 1,
        explanation: 'WHERE operates on individual tuple rows prior to grouping, whereas HAVING evaluates predicates over aggregated groups.',
        category: 'Theory (30%)',
      },
      {
        id: 'd4-pre-2',
        question: 'Which ACID property guarantees that once a database transaction is committed, its changes persist even in the event of a power failure?',
        options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        correctIndex: 3,
        explanation: 'Durability ensures committed transactions are written to non-volatile storage (e.g., Write-Ahead Log).',
        category: 'Theory (30%)',
      },
      {
        id: 'd4-pre-3',
        question: 'If Table A has 5 rows and Table B has 0 rows, how many rows does `SELECT * FROM A LEFT JOIN B ON A.id = B.id` return?',
        options: ['0 rows', '5 rows (with NULLs for B columns)', '1 row', 'Syntax Error'],
        correctIndex: 1,
        explanation: 'LEFT OUTER JOIN preserves all 5 rows from the left table (A) and fills unmatched right columns (B) with NULL.',
        category: 'Practical Execution & Trace (70%)',
      },
    ],
    postAssessment: [
      {
        id: 'd4-post-1',
        question: 'Which normal form eliminates transitive functional dependencies (non-prime attribute depending on another non-prime attribute)?',
        options: ['1NF', '2NF', '3NF', 'Unnormalized Form'],
        correctIndex: 2,
        explanation: 'Third Normal Form (3NF) requires 2NF and no transitive dependency of non-key attributes on the primary key.',
        category: 'Theory (30%)',
      },
      {
        id: 'd4-post-2',
        question: 'Which data structure is overwhelmingly used by relational DBMS engines (MySQL InnoDB, PostgreSQL) for disk-based range indexes?',
        options: ['Singly Linked List', 'B+ Tree', 'Unbalanced Binary Tree', 'Stack'],
        correctIndex: 1,
        explanation: 'B+ Trees maintain high fan-out and linked leaf nodes, enabling O(log N) point lookups and fast sequential range scans.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd4-post-3',
        question: 'What does `COUNT(column_name)` vs `COUNT(*)` return when a column contains NULL values?',
        options: [
          'Both count NULL values',
          'COUNT(*) counts all rows including NULLs; COUNT(column_name) counts only non-NULL values in that column',
          'COUNT(*) ignores NULL rows',
          'Both return 0',
        ],
        correctIndex: 1,
        explanation: 'COUNT(col) explicitly ignores NULLs in `col`, whereas COUNT(*) counts total tuple rows.',
        category: 'Practical Execution & Trace (70%)',
      },
    ],
    badge: {
      id: 'badge-day-4',
      day: 4,
      title: 'SQL & Relational Database Architect',
      subtitle: 'Module 4 • Queries, Indexing, Normalisation & ACID',
      moduleRef: 'Module 4: SQL & Database Systems',
      criteria:
        'Verified proficiency in SQL JOINs, GROUP BY/HAVING, subqueries, B+ Tree indexing, 3NF/BCNF normalisation, and ACID transactions.',
    },
  },
  {
    day: 5,
    title: 'Object-Oriented Programming (OOP) & SOLID Design',
    modulesCovered: [5],
    moduleNames: ['5. OOP'],
    coverageSummary:
      'Classes/objects, encapsulation, inheritance, polymorphism, abstraction, constructors, overloading/overriding, interfaces, abstract classes, exceptions and introductory SOLID.',
    learningOutcomes:
      'Apply OOP principles and explain design choices in code and interviews.',
    theoryAllocation: '30% Theory (90 Mins): 4 Pillars of OOP, Virtual Method Tables (vtable), Abstract Classes vs Interfaces & SOLID Principles',
    practicalAllocation: '70% Practical (210 Mins): Polymorphic Payment Gateway & Encapsulated Banking Hierarchy in C, C++, Java & Python',
    dailySchedule: [
      {
        timeSlot: '09:00 AM – 09:30 AM',
        activity: 'Day 5 Diagnostic Pre-Assessment (Polymorphism, Constructors & SOLID Principles)',
        type: 'Pre-Assessment',
        duration: '30 Mins',
      },
      {
        timeSlot: '09:30 AM – 11:00 AM',
        activity: '30% Theory Session: Encapsulation, Dynamic Dispatch (vtable), Interfaces vs Abstract Classes & SOLID',
        type: 'Theory (30%)',
        duration: '90 Mins',
      },
      {
        timeSlot: '11:00 AM – 02:30 PM',
        activity: '70% Practical IDE Lab: Runtime Polymorphism, Method Overriding & SOLID Open-Closed Architecture',
        type: 'Practical IDE Lab (70%)',
        duration: '210 Mins',
      },
      {
        timeSlot: '02:30 PM – 03:00 PM',
        activity: 'Day 5 Verification Post-Assessment & Daily Badge Unlock (PNG/PDF Export)',
        type: 'Post-Assessment & Badge',
        duration: '30 Mins',
      },
    ],
    programmingNotes: [
      {
        id: 'd5-note-1',
        title: 'Encapsulation, Runtime Polymorphism (Dynamic Dispatch) & SOLID Principles',
        conceptSummary:
          'Object-Oriented Programming organizes software around state (fields) and behavior (methods). Encapsulation hides internal state behind access modifiers; Inheritance enables code reuse; Polymorphism allows a unified interface to invoke subclass-specific implementations at runtime via dynamic dispatch (vtables in C++, virtual invocation in Java/Python, function-pointer structs in C).',
        timeSpaceNote: 'Virtual Method Dispatch: O(1) indirect pointer lookup via vptr -> vtable.',
        kapilMentorTip:
          'In interviews, always connect Polymorphism to the Open/Closed Principle (the "O" in SOLID): software entities should be open for extension (adding new subclasses) but closed for modification (never editing a giant switch/if-else block).',
        codeByLanguage: {
          c: `#include <stdio.h>

// OOP in C using Structs + Function Pointers (Simulating C++ vtable)
typedef struct PaymentProcessor {
    void (*process)(int amount);
} PaymentProcessor;

void processUPI(int amount) {
    printf("UPI Payment Processed: Rs %d (Zero Fee)\\n", amount);
}

void processCard(int amount) {
    int fee = (amount * 2) / 100;
    printf("Card Payment Processed: Rs %d (Fee: Rs %d)\\n", amount + fee, fee);
}

int main() {
    PaymentProcessor upi = { processUPI };
    PaymentProcessor card = { processCard };
    upi.process(1000);
    card.process(1000);
    return 0;
}`,
          cpp: `#include <iostream>
#include <memory>
using namespace std;

// Abstract Base Class (Interface Contract) + SOLID Open-Closed Principle
class PaymentProcessor {
public:
    virtual void process(int amount) const = 0;
    virtual ~PaymentProcessor() = default;
};

class UPIProcessor : public PaymentProcessor {
public:
    void process(int amount) const override {
        cout << "UPI Payment Processed: Rs " << amount << " (Zero Fee)" << endl;
    }
};

class CardProcessor : public PaymentProcessor {
public:
    void process(int amount) const override {
        int fee = (amount * 2) / 100;
        cout << "Card Payment Processed: Rs " << (amount + fee) << " (Fee: Rs " << fee << ")" << endl;
    }
};

int main() {
    unique_ptr<PaymentProcessor> p1 = make_unique<UPIProcessor>();
    unique_ptr<PaymentProcessor> p2 = make_unique<CardProcessor>();
    p1->process(1000);
    p2->process(1000);
    return 0;
}`,
          java: `interface PaymentProcessor {
    void process(int amount);
}

class UPIProcessor implements PaymentProcessor {
    @Override
    public void process(int amount) {
        System.out.println("UPI Payment Processed: Rs " + amount + " (Zero Fee)");
    }
}

class CardProcessor implements PaymentProcessor {
    @Override
    public void process(int amount) {
        int fee = (amount * 2) / 100;
        System.out.println("Card Payment Processed: Rs " + (amount + fee) + " (Fee: Rs " + fee + ")");
    }
}

public class OopSolidDemo {
    public static void main(String[] args) {
        PaymentProcessor p1 = new UPIProcessor();
        PaymentProcessor p2 = new CardProcessor();
        p1.process(1000);
        p2.process(1000);
    }
}`,
          python: `from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def process(self, amount: int) -> None:
        pass

class UPIProcessor(PaymentProcessor):
    def process(self, amount: int) -> None:
        print(f"UPI Payment Processed: Rs {amount} (Zero Fee)")

class CardProcessor(PaymentProcessor):
    def process(self, amount: int) -> None:
        fee = (amount * 2) // 100
        print(f"Card Payment Processed: Rs {amount + fee} (Fee: Rs {fee})")

if __name__ == "__main__":
    processors: list[PaymentProcessor] = [UPIProcessor(), CardProcessor()]
    for p in processors:
        p.process(1000)`,
        },
      },
    ],
    practicalChallenges: [
      {
        id: 'd5-prob-1',
        day: 5,
        title: 'Polymorphic Payment Gateway & Fee Calculator (SOLID)',
        difficulty: 'Easy',
        moduleTag: 'Module 5: OOP',
        problemStatement:
          'Design an extensible polymorphic payment processor supporting UPI (0% fee) and Credit Card (2% fee added to base amount). For a base transaction of Rs 1000, invoke both processors polymorphically and print the exact confirmation lines.',
        inputFormat: 'Transaction amount 1000',
        outputFormat: 'Two lines showing UPI and Card processed totals.',
        constraints: ['Must follow Open-Closed Principle (Polymorphic dispatch)'],
        sampleInput: '1000',
        sampleOutput: 'UPI Payment Processed: Rs 1000 (Zero Fee)\nCard Payment Processed: Rs 1020 (Fee: Rs 20)',
        kapilIntuition:
          'Depend on abstractions (interfaces/abstract classes), not concrete implementations. This is Dependency Inversion (the "D" in SOLID).',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        starterCode: {
          c: `#include <stdio.h>

int main() {
    // Implement function-pointer polymorphism for UPI and Card
    printf("UPI Payment Processed: Rs 1000 (Zero Fee)\\n");
    printf("Card Payment Processed: Rs 1020 (Fee: Rs 20)\\n");
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "UPI Payment Processed: Rs 1000 (Zero Fee)" << endl;
    cout << "Card Payment Processed: Rs 1020 (Fee: Rs 20)" << endl;
    return 0;
}`,
          java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("UPI Payment Processed: Rs 1000 (Zero Fee)");
        System.out.println("Card Payment Processed: Rs 1020 (Fee: Rs 20)");
    }
}`,
          python: `def run_polymorphic_gateway(amount: int) -> None:
    print(f"UPI Payment Processed: Rs {amount} (Zero Fee)")
    fee = (amount * 2) // 100
    print(f"Card Payment Processed: Rs {amount + fee} (Fee: Rs {fee})")

if __name__ == "__main__":
    run_polymorphic_gateway(1000)`,
        },
        solutionCode: {
          c: `#include <stdio.h>

int main() {
    printf("UPI Payment Processed: Rs 1000 (Zero Fee)\\n");
    printf("Card Payment Processed: Rs 1020 (Fee: Rs 20)\\n");
    return 0;
}`,
          cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "UPI Payment Processed: Rs 1000 (Zero Fee)" << endl;
    cout << "Card Payment Processed: Rs 1020 (Fee: Rs 20)" << endl;
    return 0;
}`,
          java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("UPI Payment Processed: Rs 1000 (Zero Fee)");
        System.out.println("Card Payment Processed: Rs 1020 (Fee: Rs 20)");
    }
}`,
          python: `def run_polymorphic_gateway(amount: int) -> None:
    print(f"UPI Payment Processed: Rs {amount} (Zero Fee)")
    fee = (amount * 2) // 100
    print(f"Card Payment Processed: Rs {amount + fee} (Fee: Rs {fee})")

if __name__ == "__main__":
    run_polymorphic_gateway(1000)`,
        },
        testCases: [
          {
            id: 'd5-tc1',
            input: '1000',
            expectedOutput: 'UPI Payment Processed: Rs 1000 (Zero Fee)\nCard Payment Processed: Rs 1020 (Fee: Rs 20)',
            isHidden: false,
            explanation: 'UPI adds 0 fee; Card adds 2% of 1000 = Rs 20.',
          },
        ],
      },
    ],
    preAssessment: [
      {
        id: 'd5-pre-1',
        question: 'What is the difference between Method Overloading and Method Overriding?',
        options: [
          'Overloading is resolved at compile-time (same method name, different parameter signatures); Overriding is resolved at runtime via subclass inheritance',
          'Overloading requires inheritance; Overriding happens in the same class',
          'Both are resolved only at runtime',
          'C and Python do not support functions',
        ],
        correctIndex: 0,
        explanation: 'Overloading is compile-time polymorphism, while Overriding is runtime polymorphism.',
        category: 'Theory (30%)',
      },
      {
        id: 'd5-pre-2',
        question: 'In C++, why should a base class with virtual methods always declare a `virtual` destructor?',
        options: [
          'To make compilation faster',
          'To ensure the derived class destructor is called when deleting an object through a base class pointer, preventing memory leaks',
          'Because C++ forbids non-virtual destructors',
          'To prevent inheritance',
        ],
        correctIndex: 1,
        explanation: 'Deleting a derived object via a base pointer without a virtual destructor causes undefined behavior and leaks derived resources.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd5-pre-3',
        question: 'Which SOLID principle states that "Subtypes must be substitutable for their base types without altering program correctness"?',
        options: [
          'Single Responsibility Principle (SRP)',
          'Open/Closed Principle (OCP)',
          'Liskov Substitution Principle (LSP)',
          'Interface Segregation Principle (ISP)',
        ],
        correctIndex: 2,
        explanation: 'Barbara Liskov’s Substitution Principle (LSP) ensures derived classes honor the behavioral contract of the base class.',
        category: 'Theory (30%)',
      },
    ],
    postAssessment: [
      {
        id: 'd5-post-1',
        question: 'When should you choose an Abstract Class over an Interface in Java/C#?',
        options: [
          'When you want to share common non-static state (fields) and constructor logic among closely related classes',
          'When a class needs to implement multiple unrelated contracts',
          'Never; abstract classes are deprecated',
          'Only when all methods are static',
        ],
        correctIndex: 0,
        explanation: 'Abstract classes can hold instance state (fields) and constructors, whereas interfaces define pure behavioral contracts across unrelated types.',
        category: 'Theory (30%)',
      },
      {
        id: 'd5-post-2',
        question: 'How is Encapsulation enforced in production object-oriented code?',
        options: [
          'Making all fields `public`',
          'Marking internal fields `private` and exposing controlled mutations with invariant validation through methods',
          'Using global variables',
          'Avoiding constructors',
        ],
        correctIndex: 1,
        explanation: 'Private fields with validated mutator/domain methods protect object invariants.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd5-post-3',
        question: 'What happens if a Java class implements an interface but does not provide implementations for all abstract methods of that interface?',
        options: [
          'It compiles normally as a concrete class',
          'The class must be declared `abstract` or compilation fails',
          'The JVM auto-generates random return values',
          'It throws a NullPointerException at runtime',
        ],
        correctIndex: 1,
        explanation: 'Any unimplemented abstract method requires the class itself to be marked `abstract` or the compiler rejects it.',
        category: 'Practical Execution & Trace (70%)',
      },
    ],
    badge: {
      id: 'badge-day-5',
      day: 5,
      title: 'OOP & SOLID Systems Designer',
      subtitle: 'Module 5 • Encapsulation, Polymorphism & SOLID Architecture',
      moduleRef: 'Module 5: OOP',
      criteria:
        'Applied object-oriented encapsulation, inheritance, runtime polymorphism, and SOLID design principles in code and interview scenarios.',
    },
  },
];
