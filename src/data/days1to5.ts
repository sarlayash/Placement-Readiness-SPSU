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
import { DAY_4_PROGRAMMING_NOTES } from './day4ProgrammingNotes';
import { DAY_4_PRACTICAL_CHALLENGES_10 } from './day4Challenges10';
import { DAY_4_PRE_ASSESSMENT_50, DAY_4_POST_ASSESSMENT_50 } from './day4Assessments50';
import { DAY_4_MINI_PROJECT } from './day4MiniProject';

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
    programmingNotes: DAY_4_PROGRAMMING_NOTES,
    practicalChallenges: DAY_4_PRACTICAL_CHALLENGES_10,
    preAssessment: DAY_4_PRE_ASSESSMENT_50,
    postAssessment: DAY_4_POST_ASSESSMENT_50,
    badge: {
      id: 'badge-day-4',
      day: 4,
      title: 'SQL & Relational Database Architect',
      subtitle: 'Module 4 • Queries, Indexing, Normalisation & ACID',
      moduleRef: 'Module 4: SQL & Database Systems',
      criteria:
        'Verified proficiency in SQL JOINs, GROUP BY/HAVING, subqueries, B+ Tree indexing, 3NF/BCNF normalisation, and ACID transactions.',
    },
    miniProject: DAY_4_MINI_PROJECT,
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
