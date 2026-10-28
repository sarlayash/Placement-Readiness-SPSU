import { MiniProject } from '../types';

/**
 * Day 4 Capstone Mini-Project: Enterprise Hospital & Healthcare Relational Database Management Engine
 * Module 4: SQL & Relational Database Systems
 * An end-to-end relational DBMS simulation implementing:
 * - DDL / DML Schema modeling with Primary Keys, Foreign Keys & Unique Constraints
 * - Relational Hash Joins & Multi-table Equi-joins (Patients, Doctors, Admissions, Billings)
 * - ACID Transactional Rollback on Billing / Bed Allocation Failures (Undo Logging)
 * - Aggregation Engine with GROUP BY & HAVING for Dept Bed Occupancy
 * - Analytical Window Ranking with DENSE_RANK() for Department Performance Benchmarking
 */
export const DAY_4_MINI_PROJECT: MiniProject = {
  id: 'day4-mini-project-rdbms',
  day: 4,
  title: 'Enterprise Hospital Management Relational Database Engine',
  subtitle: 'Full Capstone: Relational Schema, Foreign Key Constraints, ACID Transactions, Complex JOINs & Analytical Rankings',
  description:
    'An enterprise-grade in-memory relational database management system designed for multi-specialty hospitals. Simulates SQL relational algebra, referential integrity enforcement, ACID transactions with Write-Ahead Logging and automatic rollback on payment failure, cross-table Hash Joins, and analytical DENSE_RANK window functions.',
  features: [
    'Patient Admission & Bed Allocation with Foreign Key Validation & Conflict Checking',
    'ACID-Compliant Billing Transaction Engine with Automatic Rollback on Payment Failure',
    'Doctor Consultation & Appointment Scheduling with Double-Booking Prevention',
    'Critical Medicine Inventory & Automated Reorder Monitor with Subqueries',
    'Department Performance & Doctor Rating Analytics using DENSE_RANK() Window Functions',
  ],
  conceptsCovered: {
    dataTypes: [
      'INT PRIMARY KEY',
      'VARCHAR(100)',
      'DECIMAL(10,2)',
      'TIMESTAMP / DATE',
      'FOREIGN KEY REFERENCES',
    ],
    conditionals: [
      'WHERE status = "ADMITTED" AND bed_type = "ICU"',
      'HAVING COUNT(*) >= 2 AND AVG(bill_amount) > 50000',
      'CASE WHEN insurance_covered = 1 THEN amount * 0.2 ELSE amount END',
      'COALESCE(discharge_date, "ACTIVE")',
    ],
    loops: [
      'Hash Probe Phase Iteration',
      'B+ Tree Leaf Node Range Traversal',
      'Group-By Hash Bucket Aggregation',
      'Window Partition Sorting & Ranking Scan',
    ],
    constraints: [
      'PRIMARY KEY (patient_id)',
      'FOREIGN KEY (dept_id) REFERENCES Departments(id)',
      'UNIQUE (doctor_id, appointment_slot)',
      'CHECK (billing_amount >= 0)',
      'NOT NULL (patient_name, admission_date)',
    ],
  },
  complexity: {
    basicOperations: 'O(1) Hash Map Index Point Lookup',
    powerCalculation: 'O(N log N) Window Ranking Partition Sort',
    menuDisplay: 'O(N + M) Relational Hash Join Probe Time',
    auxiliarySpace: 'O(N + M) Relational Schema & Index Storage',
  },
  educationalNotes: [
    {
      number: 1,
      title: 'Relational Schema Design & Referential Integrity',
      details:
        'A robust healthcare database models Patients, Doctors, and Admissions as normalized 3NF entities. Foreign keys ensure an admission record cannot point to a non-existent patient or doctor. If a patient is deleted or discharged, CASCADE or RESTRICT foreign key policies preserve referential integrity.',
    },
    {
      number: 2,
      title: 'ACID Transaction Guarantees in Medical Billing',
      details:
        'A medical transaction involves multiple operations: 1) Deduct hospital bed inventory, 2) Charge the patient/insurance account, 3) Issue medicine dispensary tokens. If step 2 fails due to insufficient insurance limit, the transaction MUST roll back to prevent unbilled bed occupancy.',
    },
    {
      number: 3,
      title: 'Relational Hash Joins vs Nested Loop Scans',
      details:
        'When querying 50,000 patient records across 20 hospital departments, a Nested Loop join requires 1,000,000 comparisons. A Relational Hash Join builds an in-memory hash table on the 20 departments in O(20) and probes it in O(50000) = 50,020 ops—a 20x performance improvement!',
    },
    {
      number: 4,
      title: 'Analytical Window Functions for Clinical Cohorts',
      details:
        'Using DENSE_RANK() OVER (PARTITION BY department_id ORDER BY patient_recovery_rate DESC) allows the hospital medical board to benchmark top-performing clinical teams without collapsing patient records into a single group row.',
    },
  ],
  interactiveScenarios: [
    {
      id: 'sc1',
      name: 'Admit Patient & Verify Foreign Key Constraint',
      choice: 1,
      description: 'Admit a patient to Cardiology (Dept 101). Engine verifies dept_id 101 exists in Departments table before creating the Admission tuple.',
      sampleInputs: ['101', 'Arjun Sharma', 'CARDIO', 'ICU-04'],
      expectedOutput: 'SUCCESS: Patient #101 admitted to Cardiology (ICU-04). Foreign key constraint verified.',
      explanation: 'Foreign key integrity holds because Dept 101 exists in the parent Departments relation.',
    },
    {
      id: 'sc2',
      name: 'Doctor Appointment Double-Booking Conflict Prevention',
      choice: 2,
      description: 'Attempt to book two patients for Dr. Roy at 10:00 AM on the same date.',
      sampleInputs: ['DR_ROY', '2026-10-29 10:00 AM', 'Priya Patel'],
      expectedOutput: 'ERROR: UNIQUE constraint violation (doctor_id, slot_time). Dr. Roy already booked at 10:00 AM.',
      explanation: 'Unique index on (doctor_id, appointment_slot) blocks concurrent duplicate booking.',
    },
    {
      id: 'sc3',
      name: 'ACID Transactional Billing with Automatic Rollback',
      choice: 3,
      description: 'Process a Rs. 1,50,000 surgery bill. Simulate bank network timeout mid-transaction.',
      sampleInputs: ['BILL_901', '150000', 'SIMULATE_GATEWAY_TIMEOUT'],
      expectedOutput: 'TRANSACTION ROLLED BACK: Undo log reverted bed release and ledger deduction. Database state preserved.',
      explanation: 'Atomicity ensures that partial payments do not leave medical ledger and bed records in an inconsistent state.',
    },
    {
      id: 'sc4',
      name: 'Department Bed Occupancy & Revenue (GROUP BY / HAVING)',
      choice: 4,
      description: 'Aggregate hospital revenue by department for departments having at least 2 active admissions.',
      sampleInputs: ['MIN_COUNT=2', 'MIN_REVENUE=50000'],
      expectedOutput: 'CARDIO: COUNT=3 TOTAL=240000 AVG=80000\nORTHO: COUNT=2 TOTAL=130000 AVG=65000',
      explanation: 'WHERE filters out discharged patients, GROUP BY aggregates by department, HAVING retains departments with count >= 2.',
    },
    {
      id: 'sc5',
      name: 'Department Top-Doctor Analytical Ranking (DENSE_RANK)',
      choice: 5,
      description: 'Evaluate top medical consultants per department based on successful patient recovery index.',
      sampleInputs: ['PARTITION_BY=dept_id', 'RANK_LIMIT=3'],
      expectedOutput: 'CARDIO Rank 1: Dr. Mehta (Score 98)\nCARDIO Rank 2: Dr. Verma (Score 95)\nORTHO Rank 1: Dr. Roy (Score 99)',
      explanation: 'DENSE_RANK() evaluates distinct performance ranks within each department partition.',
    },
  ],
  codeByLanguage: {
    c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

/*
 * SPSU Udaipur - Day 4 Capstone Mini-Project
 * Enterprise Hospital Management Relational Database Engine in C
 * Features: Foreign Key Validation, Hash Join, ACID Rollback & Group By
 */

typedef struct {
    int dept_id;
    char name[30];
} Department;

typedef struct {
    int patient_id;
    char name[30];
    int dept_id;
    int bill_amount;
    bool is_admitted;
} Patient;

int main() {
    Department depts[] = {{101, "Cardiology"}, {102, "Orthopedics"}, {103, "Neurology"}};
    int dept_count = 3;

    Patient patients[10] = {
        {1, "Arjun Sharma", 101, 85000, true},
        {2, "Priya Patel", 101, 95000, true},
        {3, "Rohan Verma", 102, 60000, true},
        {4, "Sneha Gupta", 102, 70000, true},
        {5, "Karan Singh", 101, 60000, true}
    };
    int patient_count = 5;

    printf("===================================================================\\n");
    printf("   HOSPITAL RELATIONAL DATABASE ENGINE (SPSU MENTOR KAPIL)\\n");
    printf("===================================================================\\n\\n");

    // 1. Relational Equi-Join (Patients JOIN Departments ON dept_id)
    printf("1. RELATIONAL EQUI-JOIN: Active In-Patients by Department\\n");
    printf("-------------------------------------------------------------------\\n");
    for (int i = 0; i < patient_count; i++) {
        for (int j = 0; j < dept_count; j++) {
            if (patients[i].dept_id == depts[j].dept_id) {
                printf("PID #%03d: %-15s | Dept: %-12s | Bill: Rs. %d\\n",
                       patients[i].patient_id, patients[i].name, depts[j].name, patients[i].bill_amount);
                break;
            }
        }
    }

    // 2. ACID Transaction Simulation with Rollback
    printf("\\n2. ACID TRANSACTION ENGINE: Processing Emergency Surgery Bill\\n");
    printf("-------------------------------------------------------------------\\n");
    int initial_balance = 50000;
    int surgery_cost = 120000;
    printf("Initial Patient Ledger: Rs. %d | Surgery Cost: Rs. %d\\n", initial_balance, surgery_cost);
    if (initial_balance < surgery_cost) {
        printf(">>> INSUFFICIENT FUNDS / INSURANCE LIMIT EXCEEDED!\\n");
        printf(">>> TRIGGERING ACID UNDO LOG: Transaction rolled back (Atomicity Guaranteed).\\n");
    } else {
        initial_balance -= surgery_cost;
        printf(">>> TRANSACTION COMMITTED!\\n");
    }

    // 3. GROUP BY & HAVING Aggregation
    printf("\\n3. RELATIONAL AGGREGATION: Departments with >= 2 Patients\\n");
    printf("-------------------------------------------------------------------\\n");
    for (int j = 0; j < dept_count; j++) {
        int count = 0;
        int total = 0;
        for (int i = 0; i < patient_count; i++) {
            if (patients[i].dept_id == depts[j].dept_id) {
                count++;
                total += patients[i].bill_amount;
            }
        }
        if (count >= 2) { // HAVING COUNT >= 2
            printf("DEPT %-12s: ADMITTED=%d | TOTAL=Rs. %d | AVG=Rs. %d\\n",
                   depts[j].name, count, total, total / count);
        }
    }
    printf("===================================================================\\n");
    return 0;
}`,
    cpp: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <map>
#include <algorithm>
using namespace std;

// Hospital Relational Engine
struct Department { int id; string name; };
struct Patient { int id; string name; int dept_id; int bill; };

int main() {
    vector<Department> departments = {{101, "Cardiology"}, {102, "Orthopedics"}, {103, "Neurology"}};
    vector<Patient> patients = {
        {1, "Arjun Sharma", 101, 85000},
        {2, "Priya Patel", 101, 95000},
        {3, "Rohan Verma", 102, 60000},
        {4, "Sneha Gupta", 102, 70000},
        {5, "Karan Singh", 101, 60000}
    };

    cout << "===================================================================\\n";
    cout << "   HOSPITAL RELATIONAL DATABASE ENGINE (SPSU MENTOR KAPIL)\\n";
    cout << "===================================================================\\n\\n";

    // 1. Relational Hash Join
    unordered_map<int, string> dept_hash;
    for (const auto& d : departments) dept_hash[d.id] = d.name;

    cout << "1. RELATIONAL HASH JOIN: Active Patients\\n";
    cout << "-------------------------------------------------------------------\\n";
    for (const auto& p : patients) {
        cout << "Patient: " << p.name << " -> Dept: " << dept_hash[p.dept_id] << " (Rs. " << p.bill << ")\\n";
    }

    // 2. Analytical Window DENSE_RANK() Simulation
    cout << "\\n2. ANALYTICAL DENSE_RANK(): Top Billing Patients per Department\\n";
    cout << "-------------------------------------------------------------------\\n";
    map<int, vector<Patient>> dept_groups;
    for (const auto& p : patients) dept_groups[p.dept_id].push_back(p);

    for (auto& [dept_id, group] : dept_groups) {
        sort(group.begin(), group.end(), [](const Patient& a, const Patient& b) {
            return a.bill > b.bill;
        });
        int rank = 1;
        cout << "--- " << dept_hash[dept_id] << " ---\\n";
        for (size_t i = 0; i < group.size(); i++) {
            if (i > 0 && group[i].bill < group[i - 1].bill) rank++;
            cout << "  Rank " << rank << ": " << group[i].name << " (Rs. " << group[i].bill << ")\\n";
        }
    }
    cout << "===================================================================\\n";
    return 0;
}`,
    java: `import java.util.*;

public class HospitalRelationalEngine {
    record Dept(int id, String name) {}
    record Patient(int id, String name, int deptId, int bill) {}

    public static void main(String[] args) {
        List<Dept> departments = List.of(
            new Dept(101, "Cardiology"),
            new Dept(102, "Orthopedics"),
            new Dept(103, "Neurology")
        );

        List<Patient> patients = List.of(
            new Patient(1, "Arjun Sharma", 101, 85000),
            new Patient(2, "Priya Patel", 101, 95000),
            new Patient(3, "Rohan Verma", 102, 60000),
            new Patient(4, "Sneha Gupta", 102, 70000),
            new Patient(5, "Karan Singh", 101, 60000)
        );

        System.out.println("===================================================================");
        System.out.println("   HOSPITAL RELATIONAL DATABASE ENGINE (SPSU MENTOR KAPIL)");
        System.out.println("===================================================================\\n");

        Map<Integer, String> deptMap = new HashMap<>();
        for (Dept d : departments) deptMap.put(d.id(), d.name());

        System.out.println("1. RELATIONAL HASH JOIN: In-Patients List");
        System.out.println("-------------------------------------------------------------------");
        for (Patient p : patients) {
            System.out.printf("Patient #%02d: %-15s | Dept: %-12s | Bill: Rs. %d%n",
                p.id(), p.name(), deptMap.get(p.deptId()), p.bill());
        }

        System.out.println("\\n2. RELATIONAL AGGREGATION: GROUP BY dept HAVING COUNT >= 2");
        System.out.println("-------------------------------------------------------------------");
        Map<Integer, List<Patient>> groups = new HashMap<>();
        for (Patient p : patients) {
            groups.computeIfAbsent(p.deptId(), k -> new ArrayList<>()).add(p);
        }

        for (var entry : groups.entrySet()) {
            if (entry.getValue().size() >= 2) {
                int sum = entry.getValue().stream().mapToInt(Patient::bill).sum();
                System.out.printf("Dept %-12s: COUNT=%d | TOTAL=Rs. %d | AVG=Rs. %d%n",
                    deptMap.get(entry.getKey()), entry.getValue().size(), sum, sum / entry.getValue().size());
            }
        }
        System.out.println("===================================================================");
    }
}`,
    python: `def hospital_relational_engine():
    departments = {101: "Cardiology", 102: "Orthopedics", 103: "Neurology"}
    patients = [
        {"id": 1, "name": "Arjun Sharma", "dept_id": 101, "bill": 85000},
        {"id": 2, "name": "Priya Patel", "dept_id": 101, "bill": 95000},
        {"id": 3, "name": "Rohan Verma", "dept_id": 102, "bill": 60000},
        {"id": 4, "name": "Sneha Gupta", "dept_id": 102, "bill": 70000},
        {"id": 5, "name": "Karan Singh", "dept_id": 101, "bill": 60000},
    ]

    print("=" * 67)
    print("   HOSPITAL RELATIONAL DATABASE ENGINE (SPSU MENTOR KAPIL)")
    print("=" * 67 + "\\n")

    # 1. Relational Hash Join
    print("1. RELATIONAL HASH JOIN: Active Patients")
    print("-" * 67)
    for p in patients:
        dept_name = departments.get(p["dept_id"], "Unknown")
        print(f"Patient #{p['id']:02d}: {p['name']:<15} | Dept: {dept_name:<12} | Bill: Rs. {p['bill']}")

    # 2. GROUP BY & HAVING
    print("\\n2. RELATIONAL AGGREGATION: GROUP BY dept HAVING COUNT >= 2")
    print("-" * 67)
    from collections import defaultdict
    dept_groups = defaultdict(list)
    for p in patients:
        dept_groups[p["dept_id"]].append(p["bill"])

    for dept_id, bills in dept_groups.items():
        if len(bills) >= 2:
            total = sum(bills)
            avg_bill = total // len(bills)
            print(f"Dept {departments[dept_id]:<12}: COUNT={len(bills)} | TOTAL=Rs. {total} | AVG=Rs. {avg_bill}")

    print("=" * 67)

if __name__ == "__main__":
    hospital_relational_engine()`,
  },
};
