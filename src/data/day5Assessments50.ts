import { AssessmentQuestion } from '../types';

/**
 * Day 5 Assessments (50 Pre-Assessment MCQs & 50 Post-Assessment MCQs = 100 Total)
 * Module 5: Object-Oriented Programming (OOP) & SOLID Design
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 * Coverage: 4 Pillars of OOP, VTable & VPtr Dynamic Dispatch, Constructors/Destructors,
 * Virtual Inheritance & Diamond Problem, Object Slicing, Copy/Move Semantics,
 * SOLID Principles (SRP, OCP, LSP, ISP, DIP), and GoF Design Patterns across C, C++, Java, and Python.
 * Strictly balanced: 15 Theory (30%) + 35 Practical Execution & Trace (70%)
 * Correct Option Distribution: Exactly 13 A, 13 B, 12 C, 12 D for Pre and Post sets.
 */

export const DAY_5_PRE_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d5-pre-1",
    "question": "What is the primary conceptual distinction between Encapsulation and Data Hiding in Object-Oriented Design?",
    "options": [
      "Encapsulation is bundling data and related methods into a cohesive unit; Data Hiding is restricting direct access to internal components using access specifiers",
      "Encapsulation restricts variable visibility to subclasses, whereas Data Hiding compiles code into bytecode",
      "Data Hiding creates multiple constructors for a class, while Encapsulation prevents inheritance",
      "They are strictly identical terms with no architectural or syntactic difference in modern compilers"
    ],
    "correctIndex": 0,
    "explanation": "Encapsulation packages state and behavior together within an entity (class/struct), while Data Hiding isolates mutable internal state from external arbitrary tampering using access specifiers (private/protected).",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-2",
    "question": "Which of the following correctly pairs each of the Four Pillars of OOP with its primary software engineering benefit?",
    "options": [
      "Abstraction -> Code duplication; Inheritance -> Thread safety; Polymorphism -> Binary compatibility; Encapsulation -> Faster clock cycles",
      "Encapsulation -> State protection & modularity; Abstraction -> Complexity reduction; Inheritance -> Code reuse; Polymorphism -> Dynamic flexibility & extensibility",
      "Polymorphism -> Memory minimization; Abstraction -> Automatic garbage collection; Inheritance -> Virtual memory mapping; Encapsulation -> Compile-time linking",
      "Inheritance -> Eliminating pointers; Encapsulation -> Multi-core parallelization; Polymorphism -> Loop unrolling; Abstraction -> Inlining"
    ],
    "correctIndex": 1,
    "explanation": "The four pillars provide: Encapsulation (modularity & state integrity), Abstraction (hiding implementation complexity), Inheritance (hierarchical reuse), and Polymorphism (interchangeable behavior via uniform interfaces).",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-3",
    "question": "What is the key mechanical difference between Compile-Time Polymorphism (Static Binding) and Run-Time Polymorphism (Dynamic Binding)?",
    "options": [
      "Compile-time polymorphism only operates on primitive integers, whereas run-time polymorphism operates exclusively on strings",
      "Run-time polymorphism incurs zero instruction overhead, while compile-time polymorphism requires a lookup table at runtime",
      "Compile-time polymorphism resolves function signatures at compilation (overloading, templates); run-time polymorphism resolves method calls at execution via virtual tables (overriding)",
      "Compile-time polymorphism requires the 'virtual' keyword in C++, while run-time polymorphism is achieved using preprocessor macros"
    ],
    "correctIndex": 2,
    "explanation": "Compile-time polymorphism (function overloading, operator overloading, templates) is bound during compilation with zero runtime call indirection. Run-time polymorphism (virtual functions, overriding) is resolved dynamically during execution via pointer dereferencing through a VTable.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-4",
    "question": "How do modern C++ compilers implement dynamic dispatch for classes containing virtual member functions?",
    "options": [
      "The compiler replaces every method call with a switch-case statement over class IDs",
      "The CPU executes a branch predictor instruction that jumps directly into the operating system kernel",
      "The JVM bytecode verifier dynamically injects reflection metadata into heap allocations",
      "Each polymorphic class receives a shared Virtual Method Table (VTable) of function pointers, and each object instance holds a hidden pointer (_vptr) pointing to it"
    ],
    "correctIndex": 3,
    "explanation": "When a class declares or inherits a virtual function, the compiler constructs a static VTable containing pointers to its virtual implementations. Each instance of the class contains a hidden vptr pointer that directs virtual calls to the appropriate table entry at runtime.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-5",
    "question": "When should a software architect prefer an Abstract Class over an Interface in Java or C++?",
    "options": [
      "When related classes share common mutable state, non-public methods, or constructor logic alongside abstract contracts",
      "When implementing multiple inheritance across completely unrelated types",
      "When all methods must be static and final without any subclass specialization",
      "Abstract classes should never be preferred because interfaces have lower memory overhead"
    ],
    "correctIndex": 0,
    "explanation": "Abstract classes are suited for closely related classes that share code, constructors, and instance fields (an IS-A relationship). Interfaces define pure behavioral contracts that can be implemented across diverse, unrelated hierarchies (a CAN-DO contract).",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-6",
    "question": "What is the 'Diamond Problem' in multiple inheritance, and how does C++ definitively solve it?",
    "options": [
      "A compilation crash caused by four classes sharing the same variable name; resolved by namespaces",
      "Ambiguity arising when a derived class inherits two copies of a base class from two intermediate parents; resolved via Virtual Inheritance ('virtual public Base')",
      "Heap fragmentation resulting from allocating four objects simultaneously; resolved by std::unique_ptr",
      "Stack overflow during recursive constructor invocation; resolved by explicit destructor chaining"
    ],
    "correctIndex": 1,
    "explanation": "In multiple inheritance, if classes B and C inherit from A, and D inherits from both B and C, D inherits two distinct instances of A's members. C++ resolves this ambiguity using Virtual Inheritance (`class B : virtual public A`), ensuring only a single shared instance of A exists in D.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-7",
    "question": "According to the Single Responsibility Principle (SRP) of SOLID, what constitutes a valid 'responsibility' for a class?",
    "options": [
      "A class should only contain exactly one public method and no private helper functions",
      "A class must never exceed 100 lines of source code regardless of domain complexity",
      "A class should have one, and only one, reason to change (i.e., serving a single actor or business domain role)",
      "A class must be responsible for both database persistence and UI rendering to maintain cohesion"
    ],
    "correctIndex": 2,
    "explanation": "Robert C. Martin defines SRP as: 'A class should have only one reason to change.' This means a module should be responsible to one, and only one, actor or business stakeholder (e.g., separating persistence logic from financial calculation logic).",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-8",
    "question": "How does adhering to the Open/Closed Principle (OCP) prevent regression bugs in production enterprise codebases?",
    "options": [
      "By locking all source files into read-only mode after deploying to the master branch",
      "By requiring all methods to return void to avoid data mutation side-effects",
      "By compiling all source files into binary shared objects (.so / .dll) without debug symbols",
      "By designing modules to be open for extension via interfaces or inheritance, but closed for modification of verified existing source code"
    ],
    "correctIndex": 3,
    "explanation": "OCP states that software entities should be open for extension, but closed for modification. New behaviors are added by introducing new subclasses or interface implementations rather than editing existing, tested, bug-free classes.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-9",
    "question": "What is the core rule established by Barbara Liskov in the Liskov Substitution Principle (LSP)?",
    "options": [
      "Objects of a superclass must be replaceable with objects of a subclass without altering any correctness properties of the program",
      "Subclasses must override every method declared in the superclass to ensure runtime polymorphism",
      "Derived classes should always strengthen preconditions and weaken postconditions compared to the base class",
      "A subclass must never implement an interface if its superclass already implements one"
    ],
    "correctIndex": 0,
    "explanation": "LSP guarantees that if class S is a subtype of T, objects of type T may be replaced with objects of type S without breaking program invariants, altering expected behaviors, or throwing unexpected exceptions.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-10",
    "question": "What problem does the Interface Segregation Principle (ISP) prevent in large-scale software systems?",
    "options": [
      "It prevents multiple threads from acquiring the same monitor lock simultaneously",
      "It prevents 'fat' monolithic interfaces that force client classes to implement methods they do not need or use",
      "It prevents garbage collectors from reclaiming objects that still have weak references",
      "It prevents subclasses from calling super() in their constructors"
    ],
    "correctIndex": 1,
    "explanation": "ISP states that no client should be forced to depend on methods it does not use. Large interfaces should be split into smaller, cohesive, role-specific interfaces (e.g., separating `Readable`, `Writable`, and `Closable`).",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-11",
    "question": "What does the Dependency Inversion Principle (DIP) mandate regarding high-level business logic and low-level utility modules?",
    "options": [
      "High-level modules must directly instantiate low-level concrete classes using the 'new' keyword",
      "Low-level database modules must define the business rules for high-level domain controllers",
      "High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces)",
      "Abstractions must depend on concrete implementation details for optimal hardware pipelining"
    ],
    "correctIndex": 2,
    "explanation": "DIP dictates: (1) High-level modules should not depend on low-level modules; both should depend on abstractions. (2) Abstractions should not depend on details; details should depend on abstractions.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-12",
    "question": "What catastrophic failure occurs when an object containing dynamically allocated heap memory relies on a default compiler-generated Shallow Copy?",
    "options": [
      "The CPU registers are permanently corrupted by the operating system scheduler",
      "The heap memory is automatically multiplied by two, causing immediate physical RAM exhaustion",
      "The object's virtual table pointer is erased, causing compile-time linker failures",
      "Both objects point to the same memory buffer, leading to double-free crashes and dangling pointer corruption when destructors execute"
    ],
    "correctIndex": 3,
    "explanation": "A shallow copy performs a byte-by-byte member copy. For raw pointers, it copies only the memory address. When either object is destroyed, its destructor frees the memory, leaving the other object with a dangling pointer; when the second object is destroyed, a fatal double-free occurs.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-13",
    "question": "What is 'Object Slicing' in C++, and under what condition does it occur?",
    "options": [
      "When a Derived class object is assigned or passed by value to a Base class variable, stripping away derived member variables and virtual overrides",
      "When dynamic_cast fails and returns a nullptr reference to a derived type",
      "When an array of objects is partitioned into chunks across CPU cache lines",
      "When a member variable is marked private and cannot be read by derived classes"
    ],
    "correctIndex": 0,
    "explanation": "Object slicing occurs when a derived class instance is copied into a base class object by value. The base copy constructor copies only the base sub-object, slicing off all derived-specific fields and resetting the vptr to the base class vtable.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-14",
    "question": "Why MUST a base class in C++ declare a 'virtual' destructor if instances are deleted polymorphically via a base pointer (`Base* ptr = new Derived(); delete ptr;`)?",
    "options": [
      "Without a virtual destructor, the compiler refuses to compile any class that uses inheritance",
      "Without a virtual destructor, only the Base destructor executes, causing resource and memory leaks for all resources allocated by the Derived class",
      "Virtual destructors force the CPU to allocate heap memory directly into L1 cache for speed",
      "It prevents the derived class from ever calling delete on its own members"
    ],
    "correctIndex": 1,
    "explanation": "If the base class destructor is non-virtual, calling `delete` on a `Base*` pointing to a `Derived` object results in undefined behavior (typically calling only `~Base()`). Declaring `virtual ~Base()` ensures dynamic dispatch invokes `~Derived()` first, followed by `~Base()`.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-15",
    "question": "Why is 'Composition over Inheritance' widely recognized as a foundational software architecture principle?",
    "options": [
      "Inheritance requires runtime virtual table lookups, whereas composition is always resolved by the GPU",
      "Classes cannot inherit from more than one interface in any programming language",
      "Composition offers loose coupling and dynamic runtime flexibility (HAS-A), avoiding rigid compile-time class hierarchies and fragile base class bugs (IS-A)",
      "Composition allows subclasses to bypass private access specifiers in parent classes"
    ],
    "correctIndex": 2,
    "explanation": "Inheritance exposes subclasses to parent implementation details (white-box reuse) and creates rigid compile-time coupling. Composition (black-box reuse) enables behaviors to be swapped or configured at runtime without breaking dependent classes.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-pre-16",
    "question": "What is the exact console output of this C++ program demonstrating dynamic dispatch through base pointers?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n    virtual void show() { cout << \"Base::show \"; }\n    void print() { cout << \"Base::print \"; }\n};\n\nclass Derived : public Base {\npublic:\n    void show() override { cout << \"Derived::show \"; }\n    void print() { cout << \"Derived::print \"; }\n};\n\nint main() {\n    Base* b = new Derived();\n    b->show();\n    b->print();\n    delete b;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Base::show Base::print",
      "Derived::show Derived::print",
      "Base::show Derived::print",
      "Derived::show Base::print"
    ],
    "correctIndex": 3,
    "explanation": "show() is virtual, so `b->show()` resolves dynamically through the vtable to `Derived::show`. print() is non-virtual, so `b->print()` resolves statically based on pointer type (`Base*`), calling `Base::print`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-17",
    "question": "Trace the execution order of constructors and initialization blocks in this Java program. What is printed?",
    "codeSnippet": "class Parent {\n    static { System.out.print(\"S1 \"); }\n    { System.out.print(\"I1 \"); }\n    Parent() { System.out.print(\"C1 \"); }\n}\n\nclass Child extends Parent {\n    static { System.out.print(\"S2 \"); }\n    { System.out.print(\"I2 \"); }\n    Child() { System.out.print(\"C2 \"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new Child();\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "S1 S2 I1 C1 I2 C2",
      "S1 I1 C1 S2 I2 C2",
      "I1 C1 I2 C2 S1 S2",
      "S2 S1 I2 C2 I1 C1"
    ],
    "correctIndex": 0,
    "explanation": "Static blocks run once in hierarchy order: Parent static (S1), Child static (S2). Then on instantiation: Parent instance block (I1), Parent constructor (C1), Child instance block (I2), Child constructor (C2).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-18",
    "question": "According to Python's C3 Linearization (MRO), what is the output of calling `obj.greet()` in this diamond hierarchy?",
    "codeSnippet": "class A:\n    def greet(self):\n        return \"A\"\n\nclass B(A):\n    def greet(self):\n        return \"B -> \" + super().greet()\n\nclass C(A):\n    def greet(self):\n        return \"C -> \" + super().greet()\n\nclass D(B, C):\n    def greet(self):\n        return \"D -> \" + super().greet()\n\nprint(D().greet())",
    "codeLanguage": "python",
    "options": [
      "D -> B -> A",
      "D -> B -> C -> A",
      "D -> C -> B -> A",
      "D -> B -> A -> C -> A"
    ],
    "correctIndex": 1,
    "explanation": "Under C3 Linearization, the MRO for D(B, C) is [D, B, C, A, object]. When D calls super().greet(), it dispatches to B. B's super().greet() dispatches to C (the next in MRO), and C's super() dispatches to A.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-19",
    "question": "What is printed by this C++ snippet demonstrating Object Slicing when passing by value?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Animal {\npublic:\n    virtual void speak() const { cout << \"Animal \"; }\n};\n\nclass Dog : public Animal {\npublic:\n    void speak() const override { cout << \"Bark \"; }\n};\n\nvoid makeNoise(Animal a) {\n    a.speak();\n}\n\nint main() {\n    Dog d;\n    makeNoise(d);\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Bark",
      "Compilation Error: Abstract parameter",
      "Animal",
      "Undefined Behavior: segmentation fault"
    ],
    "correctIndex": 2,
    "explanation": "Because `makeNoise` accepts `Animal a` by value (not reference `Animal&`), object slicing occurs: `a` is constructed as a pure `Animal` using the default copy constructor, slicing off `Dog`'s vtable entry and printing 'Animal'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-20",
    "question": "Trace the method call output in this Java polymorphic reference puzzle:",
    "codeSnippet": "class Alpha {\n    void process(Alpha a) { System.out.print(\"Alpha-Alpha \"); }\n    void process(Beta b) { System.out.print(\"Alpha-Beta \"); }\n}\n\nclass Beta extends Alpha {\n    void process(Alpha a) { System.out.print(\"Beta-Alpha \"); }\n    void process(Beta b) { System.out.print(\"Beta-Beta \"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Alpha ref = new Beta();\n        Beta b = new Beta();\n        ref.process(b);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Alpha-Alpha",
      "Alpha-Beta",
      "Beta-Alpha",
      "Beta-Beta"
    ],
    "correctIndex": 3,
    "explanation": "Overload resolution occurs at compile time based on static types: `ref` has type `Alpha`, and `b` has static type `Beta`, selecting signature `process(Beta)`. At runtime, dynamic dispatch executes `Beta`'s override of `process(Beta)`, printing 'Beta-Beta'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-21",
    "question": "What dangerous problem occurs in this C++ program during deletion of the polymorphic object?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass ResourceBase {\npublic:\n    ResourceBase() { cout << \"BaseInit \"; }\n    ~ResourceBase() { cout << \"BaseClean \"; }\n};\n\nclass FileHandler : public ResourceBase {\n    int* buffer;\npublic:\n    FileHandler() { buffer = new int[100]; cout << \"DerivedInit \"; }\n    ~FileHandler() { delete[] buffer; cout << \"DerivedClean \"; }\n};\n\nint main() {\n    ResourceBase* ptr = new FileHandler();\n    delete ptr;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "~FileHandler() is never invoked because ResourceBase lacks a virtual destructor, leaking the heap buffer",
      "The code fails to compile because buffers cannot be dynamically allocated inside constructors",
      "Both destructors run normally in reverse order: DerivedClean followed by BaseClean",
      "A segmentation fault occurs at line 'delete ptr' because pointers cannot hold subclasses"
    ],
    "correctIndex": 0,
    "explanation": "Because `ResourceBase::~ResourceBase()` is non-virtual, deleting a `FileHandler` through a `ResourceBase*` invokes only `~ResourceBase()`. `~FileHandler()` is bypassed, leaking the 100-integer heap buffer.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-22",
    "question": "What is the exact console output when the base destructor is correctly marked 'virtual'?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n    virtual ~Base() { cout << \"~Base \"; }\n};\n\nclass Derived : public Base {\npublic:\n    ~Derived() override { cout << \"~Derived \"; }\n};\n\nint main() {\n    Base* b = new Derived();\n    delete b;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "~Base ~Derived",
      "~Derived ~Base",
      "~Derived",
      "~Base"
    ],
    "correctIndex": 1,
    "explanation": "With a virtual destructor, dynamic dispatch calls the most-derived destructor first (`~Derived()`), which then automatically chains up to destroy its base sub-object (`~Base()`), printing '~Derived ~Base '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-23",
    "question": "What is printed by this Python encapsulation snippet utilizing the `@property` decorator?",
    "codeSnippet": "class BankAccount:\n    def __init__(self, balance: float):\n        self._balance = balance\n\n    @property\n    def balance(self) -> float:\n        return self._balance\n\n    @balance.setter\n    def balance(self, value: float) -> None:\n        if value < 0:\n            raise ValueError(\"Negative balance disallowed\")\n        self._balance = value\n\nacc = BankAccount(500.0)\nacc.balance += 250.0\nprint(acc.balance)",
    "codeLanguage": "python",
    "options": [
      "500.0",
      "AttributeError: can't set attribute",
      "750.0",
      "None"
    ],
    "correctIndex": 2,
    "explanation": "`acc.balance += 250.0` invokes the `@property` getter to read 500.0, adds 250.0 to get 750.0, and calls the `@balance.setter` to safely update `_balance`. Printing `acc.balance` yields 750.0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-24",
    "question": "Trace the method hiding vs method overriding behavior in this Java snippet. What is printed?",
    "codeSnippet": "class SuperClass {\n    static void display() { System.out.print(\"SuperStatic \"); }\n    void render() { System.out.print(\"SuperVirtual \"); }\n}\n\nclass SubClass extends SuperClass {\n    static void display() { System.out.print(\"SubStatic \"); }\n    void render() { System.out.print(\"SubVirtual \"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        SuperClass obj = new SubClass();\n        obj.display();\n        obj.render();\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "SubStatic SubVirtual",
      "SuperStatic SuperVirtual",
      "SubStatic SuperVirtual",
      "SuperStatic SubVirtual"
    ],
    "correctIndex": 3,
    "explanation": "Static methods cannot be overridden in Java; they are hidden. `obj.display()` resolves at compile-time to `SuperClass.display()`. Instance methods are virtual by default; `obj.render()` resolves dynamically to `SubClass.render()`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-25",
    "question": "What is printed by this C++ program demonstrating virtual inheritance to resolve the Diamond Problem?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Device {\npublic:\n    int id = 101;\n};\n\nclass Scanner : virtual public Device {};\nclass Printer : virtual public Device {};\nclass Copier : public Scanner, public Printer {};\n\nint main() {\n    Copier c;\n    c.id = 505;\n    cout << c.Scanner::id << \" \" << c.Printer::id << \" \" << c.id;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "505 505 505",
      "101 101 505",
      "Compilation Error: ambiguous request for member 'id'",
      "505 101 505"
    ],
    "correctIndex": 0,
    "explanation": "Because `Scanner` and `Printer` virtually inherit `Device`, `Copier` contains only one shared instance of `Device`. Modifying `c.id = 505` updates the single shared variable, so all accessors output 505.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-26",
    "question": "How does Java resolve default method conflicts when a class implements two interfaces declaring identical default signatures?",
    "codeSnippet": "interface InterfaceA {\n    default void ping() { System.out.print(\"PingA \"); }\n}\n\ninterface InterfaceB {\n    default void ping() { System.out.print(\"PingB \"); }\n}\n\nclass Service implements InterfaceA, InterfaceB {\n    @Override\n    public void ping() {\n        InterfaceB.super.ping();\n        System.out.print(\"Custom \");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new Service().ping();\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "PingA PingB Custom",
      "PingB Custom",
      "Compilation Error: Duplicate default methods cannot be disambiguated",
      "PingA Custom"
    ],
    "correctIndex": 1,
    "explanation": "When two interfaces provide conflicting default methods, the implementing class must explicitly override the method. Using `InterfaceB.super.ping()` explicitly invokes `InterfaceB`'s version, printing 'PingB Custom '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-27",
    "question": "What is printed by this C program that emulates object-oriented runtime polymorphism using function pointers inside a struct?",
    "codeSnippet": "#include <stdio.h>\n\ntypedef struct Calculator {\n    int (*operate)(int, int);\n} Calculator;\n\nint add(int a, int b) { return a + b; }\nint multiply(int a, int b) { return a * b; }\n\nint main() {\n    Calculator c1 = { add };\n    Calculator c2 = { multiply };\n    printf(\"%d %d\\n\", c1.operate(4, 5), c2.operate(4, 5));\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "9 9",
      "20 20",
      "9 20",
      "45 45"
    ],
    "correctIndex": 2,
    "explanation": "In C, structs holding function pointers simulate C++ vtables. `c1.operate` points to `add(4, 5)` which returns 9. `c2.operate` points to `multiply(4, 5)` which returns 20.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-28",
    "question": "What is printed by this C++ Move Constructor trace using `std::move`?",
    "codeSnippet": "#include <iostream>\n#include <utility>\nusing namespace std;\n\nclass Buffer {\npublic:\n    int size;\n    Buffer(int s) : size(s) {}\n    Buffer(const Buffer& other) : size(other.size) { cout << \"Copy \"; }\n    Buffer(Buffer&& other) noexcept : size(other.size) {\n        other.size = 0;\n        cout << \"Move \";\n    }\n};\n\nint main() {\n    Buffer b1(10);\n    Buffer b2 = std::move(b1);\n    cout << b1.size << \" \" << b2.size;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Copy 10 10",
      "Move 10 10",
      "Copy 0 10",
      "Move 0 10"
    ],
    "correctIndex": 3,
    "explanation": "`std::move(b1)` casts `b1` to an rvalue reference, triggering the move constructor which prints 'Move ', sets `other.size = 0`, and assigns 10 to `b2.size`, outputting 'Move 0 10'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-29",
    "question": "What is printed by this Python Singleton implementation overriding `__new__`?",
    "codeSnippet": "class DatabaseRegistry:\n    _instance = None\n\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n            cls._instance.connections = 0\n        return cls._instance\n\nr1 = DatabaseRegistry()\nr1.connections += 5\nr2 = DatabaseRegistry()\nr2.connections += 3\nprint(r1 is r2, r1.connections)",
    "codeLanguage": "python",
    "options": [
      "True 8",
      "False 5",
      "False 3",
      "True 5"
    ],
    "correctIndex": 0,
    "explanation": "Because `__new__` returns the existing `_instance`, `r1` and `r2` reference the identical object in heap memory (`r1 is r2` is True). Adding 5 and then 3 modifies the same `connections` attribute, totaling 8.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-30",
    "question": "Trace the constructor execution order when instantiating this abstract Java hierarchy:",
    "codeSnippet": "abstract class Vehicle {\n    Vehicle(String type) {\n        System.out.print(\"Veh:\" + type + \" \");\n    }\n}\n\nclass ElectricCar extends Vehicle {\n    ElectricCar() {\n        super(\"EV\");\n        System.out.print(\"Batt:100% \");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new ElectricCar();\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Batt:100% Veh:EV",
      "Veh:EV Batt:100%",
      "Veh:null Batt:100%",
      "Compilation Error: Abstract classes cannot have constructors"
    ],
    "correctIndex": 1,
    "explanation": "Abstract classes CAN have constructors; they are invoked via `super(...)` when subclasses are instantiated. `ElectricCar` calls `super('EV')` which prints 'Veh:EV ', followed by 'Batt:100% '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-31",
    "question": "What is the output of this C++ program leveraging Covariant Return Types in overriding?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n    virtual Base* clone() { cout << \"BaseClone \"; return this; }\n};\n\nclass Derived : public Base {\npublic:\n    Derived* clone() override { cout << \"DerivedClone \"; return this; }\n};\n\nint main() {\n    Derived d;\n    Base* ptr = &d;\n    ptr->clone();\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "BaseClone",
      "Compilation Error: return types do not match",
      "DerivedClone",
      "Segmentation Fault"
    ],
    "correctIndex": 2,
    "explanation": "C++ supports Covariant Return Types: an overriding virtual function can return a pointer/reference to a class derived from the base return type. Calling `ptr->clone()` dispatches dynamically to `Derived::clone()`, printing 'DerivedClone '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-32",
    "question": "Identify why the following classic code snippet violates the Liskov Substitution Principle (LSP):",
    "codeSnippet": "class Rectangle {\n    protected int width, height;\n    public void setWidth(int w) { this.width = w; }\n    public void setHeight(int h) { this.height = h; }\n    public int getArea() { return width * height; }\n}\n\nclass Square extends Rectangle {\n    @Override\n    public void setWidth(int w) { this.width = w; this.height = w; }\n    @Override\n    public void setHeight(int h) { this.width = h; this.height = h; }\n}\n\nvoid testArea(Rectangle r) {\n    r.setWidth(5);\n    r.setHeight(4);\n    assert r.getArea() == 20; // Fails when r is an instance of Square!\n}",
    "codeLanguage": "java",
    "options": [
      "Square does not define a constructor taking side length",
      "Square is a final class and cannot inherit protected fields",
      "setWidth and setHeight must return boolean to satisfy Java contracts",
      "Square alters the postcondition of Rectangle: setting height silently mutates width, breaking client assumptions"
    ],
    "correctIndex": 3,
    "explanation": "LSP is violated because clients expecting a `Rectangle` assume `setWidth` and `setHeight` operate independently. `Square` silently mutates both dimensions, causing `r.getArea()` to return 16 instead of 20, breaking the superclass contract.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-33",
    "question": "What is printed by this Strategy Pattern refactoring that eliminates a switch-case statement (adhering to OCP)?",
    "codeSnippet": "interface DiscountStrategy {\n    double apply(double amount);\n}\n\nclass RegularDiscount implements DiscountStrategy {\n    public double apply(double amount) { return amount * 0.90; }\n}\n\nclass PremiumDiscount implements DiscountStrategy {\n    public double apply(double amount) { return amount * 0.80; }\n}\n\nclass Checkout {\n    private DiscountStrategy strategy;\n    public Checkout(DiscountStrategy s) { this.strategy = s; }\n    public double calculate(double amt) { return strategy.apply(amt); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Checkout c = new Checkout(new PremiumDiscount());\n        System.out.println((int)c.calculate(500.0));\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "400",
      "450",
      "500",
      "350"
    ],
    "correctIndex": 0,
    "explanation": "`PremiumDiscount` applies a 20% discount: `500.0 * 0.80 = 400.0`. Casting to `int` yields 400. Adding new discount algorithms now requires zero modification to `Checkout` (conforming to OCP).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-34",
    "question": "What is printed by this Python dependency injection demonstration conforming to the Dependency Inversion Principle (DIP)?",
    "codeSnippet": "class MessageService:\n    def send(self, msg: str) -> str:\n        raise NotImplementedError()\n\nclass EmailService(MessageService):\n    def send(self, msg: str) -> str:\n        return f\"Email:[{msg}]\"\n\nclass NotificationManager:\n    def __init__(self, service: MessageService):\n        self._service = service\n\n    def notify(self, text: str) -> str:\n        return self._service.send(text)\n\nmanager = NotificationManager(EmailService())\nprint(manager.notify(\"Welcome SPSU\"))",
    "codeLanguage": "python",
    "options": [
      "SMS:[Welcome SPSU]",
      "Email:[Welcome SPSU]",
      "Welcome SPSU",
      "NotificationManager:[Welcome SPSU]"
    ],
    "correctIndex": 1,
    "explanation": "`NotificationManager` depends on the abstraction `MessageService`, not a concrete implementation. Injecting `EmailService` causes `send` to return 'Email:[Welcome SPSU]'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-35",
    "question": "What is printed by this C++ Factory Method implementation?",
    "codeSnippet": "#include <iostream>\n#include <memory>\n#include <string>\nusing namespace std;\n\nclass Vehicle {\npublic:\n    virtual void drive() = 0;\n    virtual ~Vehicle() = default;\n};\n\nclass Bike : public Vehicle {\npublic:\n    void drive() override { cout << \"RideBike \"; }\n};\n\nclass Car : public Vehicle {\npublic:\n    void drive() override { cout << \"DriveCar \"; }\n};\n\nunique_ptr<Vehicle> createVehicle(const string& type) {\n    if (type == \"car\") return make_unique<Car>();\n    return make_unique<Bike>();\n}\n\nint main() {\n    auto v = createVehicle(\"car\");\n    v->drive();\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "RideBike",
      "Compilation Error: Abstract factory instantiation",
      "DriveCar",
      "Segmentation fault"
    ],
    "correctIndex": 2,
    "explanation": "`createVehicle(\"car\")` returns a `std::unique_ptr<Car>`. Invoking `v->drive()` executes `Car::drive()`, printing 'DriveCar '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-36",
    "question": "Why is the 'volatile' keyword mandatory on the helper field in this Java Double-Checked Locking Singleton?",
    "codeSnippet": "public class ConnectionPool {\n    private static volatile ConnectionPool instance;\n\n    private ConnectionPool() {}\n\n    public static ConnectionPool getInstance() {\n        if (instance == null) {\n            synchronized (ConnectionPool.class) {\n                if (instance == null) {\n                    instance = new ConnectionPool();\n                }\n            }\n        }\n        return instance;\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "It prevents the JVM garbage collector from finalizing the Singleton instance",
      "It allows multiple threads to acquire the synchronized lock simultaneously",
      "It serializes the class state directly to flash storage on every access",
      "It prevents instruction reordering during object construction, ensuring other threads never see a partially initialized object"
    ],
    "correctIndex": 3,
    "explanation": "`instance = new ConnectionPool()` involves allocating memory, initializing fields, and writing the address to `instance`. Without `volatile`, compiler/CPU instruction reordering could publish the reference before field initialization completes, exposing a broken object to concurrent threads.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-37",
    "question": "Trace the notifications broadcast in this Java Observer Pattern implementation:",
    "codeSnippet": "import java.util.*;\n\ninterface Observer { void update(int price); }\n\nclass Ticker {\n    private List<Observer> list = new ArrayList<>();\n    public void register(Observer o) { list.add(o); }\n    public void setPrice(int p) {\n        for (Observer o : list) o.update(p);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Ticker ticker = new Ticker();\n        ticker.register(p -> System.out.print(\"A:\" + p + \" \"));\n        ticker.register(p -> System.out.print(\"B:\" + (p * 2) + \" \"));\n        ticker.setPrice(100);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "A:100 B:200 ",
      "A:100 A:100 ",
      "B:200 A:100 ",
      "A:200 B:100 "
    ],
    "correctIndex": 0,
    "explanation": "When `setPrice(100)` is invoked, it iterates through registered observers in registration order: Observer A receives 100 ('A:100 '), Observer B receives 100 and computes 100 * 2 ('B:200 ').",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-38",
    "question": "What is printed by this Python Decorator Pattern calculation wrapping beverage orders?",
    "codeSnippet": "class Beverage:\n    def cost(self) -> int: return 50\n\nclass Milk(Beverage):\n    def __init__(self, b: Beverage): self.b = b\n    def cost(self) -> int: return self.b.cost() + 20\n\nclass Sugar(Beverage):\n    def __init__(self, b: Beverage): self.b = b\n    def cost(self) -> int: return self.b.cost() + 10\n\norder = Sugar(Milk(Beverage()))\nprint(order.cost())",
    "codeLanguage": "python",
    "options": [
      "50",
      "80",
      "70",
      "60"
    ],
    "correctIndex": 1,
    "explanation": "Base beverage costs 50. Wrapped in Milk: 50 + 20 = 70. Wrapped in Sugar: 70 + 10 = 80. Printing `order.cost()` outputs 80.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-39",
    "question": "Trace the execution of this Adapter Pattern that interfaces a legacy system to a modern contract:",
    "codeSnippet": "interface ModernPort {\n    void request(int v);\n}\n\nclass LegacySocket {\n    public void plugSpecific(int v) {\n        System.out.print(\"Legacy:\" + (v + 5) + \" \");\n    }\n}\n\nclass SocketAdapter implements ModernPort {\n    private LegacySocket socket = new LegacySocket();\n    public void request(int v) {\n        socket.plugSpecific(v * 2);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        ModernPort port = new SocketAdapter();\n        port.request(10);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Legacy:15 ",
      "Legacy:20 ",
      "Legacy:25 ",
      "Legacy:30 "
    ],
    "correctIndex": 2,
    "explanation": "Calling `port.request(10)` passes `10 * 2 = 20` to `socket.plugSpecific(20)`. The method prints `Legacy:` followed by `20 + 5 = 25`, resulting in 'Legacy:25 '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-40",
    "question": "In C++, what surprising behavior is demonstrated when a pure virtual function is defined with a body?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n    virtual void action() = 0;\n};\n\nvoid Base::action() {\n    cout << \"BaseDefault \";\n}\n\nclass Derived : public Base {\npublic:\n    void action() override {\n        Base::action();\n        cout << \"DerivedAction \";\n    }\n};\n\nint main() {\n    Derived d;\n    d.action();\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Compilation Error: Pure virtual functions can never have a definition",
      "DerivedAction BaseDefault",
      "Runtime pure virtual function call crash",
      "BaseDefault DerivedAction "
    ],
    "correctIndex": 3,
    "explanation": "In C++, pure virtual functions can provide a default implementation. Derived classes must still override them, but they can explicitly invoke `Base::action()` via scope resolution, printing 'BaseDefault DerivedAction '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-41",
    "question": "What compilation result occurs in this Java snippet attempting to extend a 'final' class?",
    "codeSnippet": "final class SecurityVault {\n    void unlock() { System.out.println(\"Unlocked\"); }\n}\n\nclass CustomVault extends SecurityVault {\n    @Override\n    void unlock() { System.out.println(\"Custom Unlock\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new CustomVault().unlock();\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Compile-time Error: Cannot inherit from final 'SecurityVault'",
      "Prints 'Custom Unlock'",
      "Prints 'Unlocked'",
      "Runtime SecurityException thrown during class loading"
    ],
    "correctIndex": 0,
    "explanation": "In Java, marking a class with `final` prohibits any subclass from extending it. The compiler immediately rejects `class CustomVault extends SecurityVault` with a compile-time error.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-42",
    "question": "Trace the cooperative multiple inheritance output of `super()` in this Python hierarchy:",
    "codeSnippet": "class First:\n    def __init__(self):\n        print(\"First\", end=\" \")\n        super().__init__()\n\nclass Second:\n    def __init__(self):\n        print(\"Second\", end=\" \")\n        super().__init__()\n\nclass Combined(First, Second):\n    def __init__(self):\n        print(\"Combined\", end=\" \")\n        super().__init__()\n\nCombined()",
    "codeLanguage": "python",
    "options": [
      "Combined First",
      "Combined First Second ",
      "First Second Combined ",
      "Combined Second First "
    ],
    "correctIndex": 1,
    "explanation": "The MRO for `Combined` is [Combined, First, Second, object]. Instantiating `Combined` prints 'Combined ', then its `super()` calls `First.__init__` ('First '), whose `super()` calls `Second.__init__` ('Second ').",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-43",
    "question": "What is printed by this C++ Operator Overloading implementation for vector addition?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nstruct Vec2 {\n    int x, y;\n    Vec2(int x, int y) : x(x), y(y) {}\n    Vec2 operator+(const Vec2& rhs) const {\n        return Vec2(x + rhs.x, y + rhs.y);\n    }\n};\n\nint main() {\n    Vec2 v1(3, 4);\n    Vec2 v2(1, 2);\n    Vec2 v3 = v1 + v2;\n    cout << v3.x << \",\" << v3.y;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "4,4",
      "3,2",
      "4,6",
      "2,2"
    ],
    "correctIndex": 2,
    "explanation": "`operator+` creates a new `Vec2` with `x = 3 + 1 = 4` and `y = 4 + 2 = 6`. Printing `v3.x,v3.y` displays '4,6'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-44",
    "question": "What is the output of this Java variable capture in an anonymous inner class?",
    "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        int base = 10;\n        Runnable r = new Runnable() {\n            public void run() {\n                System.out.print(\"Run:\" + (base * 2) + \" \");\n            }\n        };\n        r.run();\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Run:10 ",
      "Compilation Error: base is not declared final",
      "Run:0 ",
      "Run:20 "
    ],
    "correctIndex": 3,
    "explanation": "Since Java 8, local variables captured by inner classes or lambdas must be effectively final. `base` is never reassigned, so it is effectively final and prints 'Run:20 '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-45",
    "question": "What occurs when attempting to instantiate this incomplete abstract class in Python?",
    "codeSnippet": "from abc import ABC, abstractmethod\n\nclass BaseProcessor(ABC):\n    @abstractmethod\n    def process(self):\n        pass\n\nclass RealProcessor(BaseProcessor):\n    pass\n\np = RealProcessor()",
    "codeLanguage": "python",
    "options": [
      "TypeError: Can't instantiate abstract class RealProcessor with abstract method process",
      "Instantiates normally with process() returning None",
      "Compilation Error: ABC module cannot be imported in standard Python",
      "ProcessWarning emitted to stderr"
    ],
    "correctIndex": 0,
    "explanation": "In Python's `abc` module, any subclass that fails to override all `@abstractmethod` declarations remains abstract and raises a `TypeError` upon instantiation.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-46",
    "question": "What is printed by this C++ `dynamic_cast` pointer safety test?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Entity {\npublic:\n    virtual ~Entity() = default;\n};\n\nclass Player : public Entity {\npublic:\n    void attack() { cout << \"Attack \"; }\n};\n\nclass Monster : public Entity {};\n\nint main() {\n    Entity* e = new Monster();\n    Player* p = dynamic_cast<Player*>(e);\n    if (p) p->attack();\n    else cout << \"SafeNull \";\n    delete e;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Attack",
      "SafeNull ",
      "Segmentation Fault",
      "Compilation Error"
    ],
    "correctIndex": 1,
    "explanation": "`dynamic_cast` uses runtime type information (RTTI). Because `e` points to a `Monster`, casting to `Player*` fails safely and returns `nullptr`, entering the else branch and printing 'SafeNull '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-47",
    "question": "Why does the following Java method override fail to compile?",
    "codeSnippet": "import java.io.IOException;\n\nclass ParentEngine {\n    void start() throws IOException {\n        System.out.println(\"Starting engine\");\n    }\n}\n\nclass ChildEngine extends ParentEngine {\n    @Override\n    void start() throws Exception {\n        System.out.println(\"Child starting\");\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Overridden methods cannot declare any throws clause",
      "ParentEngine must be declared abstract",
      "An overriding method cannot throw checked exceptions that are broader than those declared by the superclass method",
      "start() must return a boolean value"
    ],
    "correctIndex": 2,
    "explanation": "In Java, an overriding method may only throw the same checked exceptions, a subclass of them, or fewer exceptions. It cannot throw broader checked exceptions (such as `Exception` when the superclass declares `IOException`) because this breaks client error handling (LSP).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-48",
    "question": "Trace the execution of this Template Method Pattern. What is printed?",
    "codeSnippet": "abstract class BuildPipeline {\n    public void execute() {\n        compile();\n        test();\n        packageApp();\n    }\n    void compile() { System.out.print(\"Comp \"); }\n    abstract void test();\n    void packageApp() { System.out.print(\"Pkg \"); }\n}\n\nclass FastPipeline extends BuildPipeline {\n    void test() { System.out.print(\"SkipTest \"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new FastPipeline().execute();\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Comp Pkg SkipTest ",
      "SkipTest Comp Pkg ",
      "Comp Pkg ",
      "Comp SkipTest Pkg "
    ],
    "correctIndex": 3,
    "explanation": "`execute()` defines the invariant algorithmic skeleton: compile() prints 'Comp ', test() dynamically dispatches to FastPipeline's override printing 'SkipTest ', and packageApp() prints 'Pkg ', giving 'Comp SkipTest Pkg '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-49",
    "question": "What is printed by this C++ Return Value Optimization (RVO) snippet under C++17 guaranteed copy elision?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nstruct Tracker {\n    Tracker() { cout << \"Create \"; }\n    Tracker(const Tracker&) { cout << \"Copy \"; }\n    Tracker(Tracker&&) noexcept { cout << \"Move \"; }\n};\n\nTracker getTracker() {\n    return Tracker();\n}\n\nint main() {\n    Tracker t = getTracker();\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Create ",
      "Create Copy ",
      "Create Move ",
      "Create Copy Move "
    ],
    "correctIndex": 0,
    "explanation": "Under C++17 guaranteed copy elision (RVO), returning a temporary directly initializes the target object `t` in place without invoking copy or move constructors, outputting only 'Create '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-pre-50",
    "question": "What is printed when printing a list containing this Python object?",
    "codeSnippet": "class Node:\n    def __init__(self, val: int):\n        self.val = val\n\n    def __str__(self):\n        return f\"Node({self.val})\"\n\n    def __repr__(self):\n        return f\"[{self.val}]\"\n\nnodes = [Node(10), Node(20)]\nprint(nodes)",
    "codeLanguage": "python",
    "options": [
      "[Node(10), Node(20)]",
      "[[10], [20]]",
      "Node(10), Node(20)",
      "[<Node object at 0x...>, <Node object at 0x...>]"
    ],
    "correctIndex": 1,
    "explanation": "When printing a container (such as a list) in Python, the container invokes `__repr__` on its elements, not `__str__`. Each `Node` renders as `[{self.val}]`, resulting in `[[10], [20]]`.",
    "category": "Practical Execution & Trace (70%)"
  }
];

export const DAY_5_POST_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d5-post-1",
    "question": "In object-oriented taxonomy, what is the key difference between Aggregation and Composition?",
    "options": [
      "In Composition, child lifecycle is strictly bound to parent lifecycle (strong ownership); in Aggregation, children can exist independently of the parent (weak ownership)",
      "Aggregation requires the 'extends' keyword in Java, while Composition requires 'implements'",
      "Composition allows circular references, while Aggregation is strictly acyclic",
      "Aggregation is only supported in functional programming, while Composition is unique to C++"
    ],
    "correctIndex": 0,
    "explanation": "Both represent HAS-A relationships. In Composition, the child cannot exist without the parent (e.g., Room inside a House; killing House destroys Room). In Aggregation, the child has an independent lifecycle (e.g., Department and Professors).",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-2",
    "question": "Which of the following best defines the Interface Segregation Principle (ISP) in terms of API design?",
    "options": [
      "Classes should only implement one interface per source file",
      "Clients should not be forced to depend on methods they do not use; lean, role-specific interfaces are preferred over large general-purpose ones",
      "Interfaces must never contain static helper methods",
      "All interface methods must be marked public and final"
    ],
    "correctIndex": 1,
    "explanation": "ISP emphasizes designing fine-grained, role-based interfaces so that implementing classes only provide logic for behaviors relevant to their domain.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-3",
    "question": "What is the performance implication of Virtual Method Calls compared to regular non-virtual member functions in C++?",
    "options": [
      "Virtual calls are completely optimized away into direct inline jumps by every compiler",
      "Virtual calls execute 1000 times slower due to operating system page faults",
      "Virtual calls require an extra level of indirection (dereferencing _vptr then indexing VTable), which also hinders compiler inlining",
      "Virtual calls consume O(N) memory per function call where N is the depth of inheritance"
    ],
    "correctIndex": 2,
    "explanation": "A virtual function call requires fetching the object's `_vptr`, indexing into the class's VTable, and making an indirect call. Because the destination is not known at compile-time, it typically prevents compiler function inlining.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-4",
    "question": "Under the Single Responsibility Principle (SRP), why is having a class that handles both business calculations and database persistence problematic?",
    "options": [
      "Java and C++ compilers refuse to compile classes that import both math and database libraries",
      "Calculations run in RAM while databases run on disk, causing bus lock contention",
      "It forces the class to be declared static, disabling all instance-level variables",
      "Any change to the persistence schema (e.g., SQL to NoSQL) risks breaking business calculations and vice versa, creating tight coupling and high regression risk"
    ],
    "correctIndex": 3,
    "explanation": "Combining persistence and business logic gives the class two distinct reasons to change. Modifying persistence infrastructure risks introducing bugs into domain calculations and complicates automated unit testing.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-5",
    "question": "What distinguishes the Factory Method pattern from the Abstract Factory pattern?",
    "options": [
      "Factory Method uses a method in an inheritance hierarchy to create a single product; Abstract Factory uses object composition to create families of related products",
      "Factory Method creates database connections, while Abstract Factory creates UI widgets",
      "Factory Method requires static methods only, whereas Abstract Factory requires private constructors",
      "There is no difference; they are synonymous names for the same Gang of Four pattern"
    ],
    "correctIndex": 0,
    "explanation": "Factory Method relies on inheritance (subclasses override the factory method to create an individual object). Abstract Factory relies on composition (an object with multiple factory methods creating whole product families).",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-6",
    "question": "In C++, what is RAII (Resource Acquisition Is Initialization), and how does it guarantee leak prevention?",
    "options": [
      "A garbage collection daemon that runs periodically in the background",
      "Binding resource lifespan to object lifespan: resources are acquired in the constructor and deterministically released in the destructor when exiting scope",
      "A compiler flag that turns all raw pointers into void pointers automatically",
      "A thread synchronization primitive for mutexes and condition variables"
    ],
    "correctIndex": 1,
    "explanation": "RAII ties resource lifecycle (heap memory, sockets, file descriptors, mutex locks) to object lifetime. When a stack-allocated object goes out of scope (even during exceptions), its destructor automatically cleans up the resource.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-7",
    "question": "What is the primary role of the Dependency Inversion Principle (DIP) in enabling test-driven development (TDD)?",
    "options": [
      "It allows the compiler to run tests concurrently across multiple GPUs",
      "It forces all unit tests to be written in the same package as production code",
      "It decouples business services from infrastructure, allowing mock or stub implementations to be injected during automated testing",
      "It guarantees 100% test branch coverage without writing assertions"
    ],
    "correctIndex": 2,
    "explanation": "By depending on interfaces rather than concrete databases or external REST clients, unit tests can inject mock objects without requiring live database connections or network services.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-8",
    "question": "What is 'Duck Typing' in dynamic languages like Python, and how does it relate to polymorphism?",
    "options": [
      "Type verification performed exclusively by the operating system kernel before executing bytecode",
      "A strict compilation pass requiring explicit type annotations on every variable",
      "A memory allocation strategy where objects are arranged sequentially like ducks in a row",
      "'If it walks like a duck and quacks like a duck, it's a duck'—polymorphism determined by the presence of methods and properties rather than explicit inheritance"
    ],
    "correctIndex": 3,
    "explanation": "Duck typing enables runtime polymorphism without requiring classes to inherit from a common base class or interface. As long as an object provides the expected methods (e.g., `read()` or `__len__()`), it can be used interchangeably.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-9",
    "question": "What is the fundamental difference between Overriding and Overloading in modern object-oriented programming?",
    "options": [
      "Overloading defines multiple methods with the same name but different parameter signatures within the same scope; Overriding redefines a base class virtual method with identical signature in a derived class",
      "Overriding is resolved at compile time, while Overloading is resolved at runtime via dynamic dispatch",
      "Overloading requires the 'override' keyword in all languages, while Overriding requires the 'final' keyword",
      "Overloading only applies to static methods, whereas Overriding only applies to constructors"
    ],
    "correctIndex": 0,
    "explanation": "Overloading provides compile-time polymorphism (same name, distinct signatures in the same class/scope). Overriding provides runtime polymorphism (derived class re-implements an inherited base method with the exact same signature).",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-10",
    "question": "Why should deep inheritance trees (e.g., 5+ levels of subclassing) generally be avoided in enterprise software design?",
    "options": [
      "Compilers cannot process more than 3 levels of inheritance due to stack limitations",
      "They create brittle base class problems, tight coupling, and confusing state transitions where small changes break distant subclasses",
      "Deep inheritance trees cause permanent hardware CPU pipeline stalls",
      "Garbage collectors cannot trace objects with more than two ancestors"
    ],
    "correctIndex": 1,
    "explanation": "Deep inheritance hierarchies create high coupling, make unit testing difficult, and lead to the 'Fragile Base Class' problem, where altering a root class inadvertently breaks subclasses several layers removed.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-11",
    "question": "What is the behavioral contract between `equals()` and `hashCode()` in Java (and similar contracts in other OOP languages)?",
    "options": [
      "If two objects have the same hashCode(), they must always be equal according to equals()",
      "hashCode() must always return a unique 64-bit memory address for each object",
      "If two objects are equal according to equals(), they MUST return the exact same integer from hashCode()",
      "equals() and hashCode() have no relationship and can be overridden independently with arbitrary logic"
    ],
    "correctIndex": 2,
    "explanation": "The Java contract requires: if `a.equals(b)` is true, then `a.hashCode() == b.hashCode()` must also be true. Failure to adhere to this rule causes hash-based collections (`HashMap`, `HashSet`) to lose or misplace keys.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-12",
    "question": "What is the primary motivation for using the Builder Pattern over a telescoping constructor with many parameters?",
    "options": [
      "The Builder pattern eliminates the need to compile the code",
      "Telescoping constructors are deprecated by the ISO C++ standard",
      "The Builder pattern allows objects to be garbage collected twice as fast",
      "It avoids unreadable constructor calls with multiple optional or identically typed parameters, providing clear, fluent step-by-step construction"
    ],
    "correctIndex": 3,
    "explanation": "Constructors with many parameters (especially of the same type like multiple Strings or ints) are error-prone and unreadable. The Builder pattern provides a readable, fluent API where optional parameters are set by name.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-13",
    "question": "What is the key role of the Decorator Pattern compared to standard subclass inheritance?",
    "options": [
      "It dynamically adds behaviors to individual objects at runtime without modifying other objects of the same class, avoiding an exponential explosion of subclasses",
      "It enforces that only one instance of a class ever exists across the entire operating system",
      "It converts an existing interface into another interface expected by client classes",
      "It defines an algorithmic skeleton in a base class and defers steps to subclasses"
    ],
    "correctIndex": 0,
    "explanation": "The Decorator pattern attaches additional responsibilities dynamically. Instead of creating subclasses for every possible feature combination (e.g., `CoffeeWithMilk`, `CoffeeWithSugar`, `CoffeeWithMilkAndSugar`), decorators wrap objects flexibly.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-14",
    "question": "Under the Open/Closed Principle, what is the recommended way to handle a requirement for a new payment gateway in an e-commerce platform?",
    "options": [
      "Add another 'case' statement into the existing 500-line 'switch (paymentType)' block",
      "Create a new class implementing the 'PaymentGateway' interface and register it with the payment orchestrator without modifying existing gateway classes",
      "Rewrite the entire billing system from scratch in assembly language",
      "Mark all existing payment gateway classes as private and final"
    ],
    "correctIndex": 1,
    "explanation": "OCP dictates that we extend behavior by introducing a new implementation of `PaymentGateway` rather than altering existing, production-tested switch-cases.",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-15",
    "question": "What is the primary architectural purpose of the Proxy Pattern in object-oriented design?",
    "options": [
      "To execute multiple SQL queries in parallel across distributed cluster nodes",
      "To convert a monolithic relational database into an in-memory graph database",
      "To provide a surrogate or placeholder for another object to control access, perform lazy initialization, caching, or logging",
      "To automatically translate Java bytecode into C++ native instructions"
    ],
    "correctIndex": 2,
    "explanation": "A Proxy controls access to the real subject. Common variants include Virtual Proxies (lazy loading expensive objects), Protection Proxies (access control/auth), and Remote Proxies (RPC/network communication).",
    "category": "Theory (30%)"
  },
  {
    "id": "d5-post-16",
    "question": "What is the exact console output of this C++ program testing virtual function call mechanics in constructors?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n    Base() { test(); }\n    virtual void test() { cout << \"Base::test \"; }\n};\n\nclass Derived : public Base {\npublic:\n    Derived() {}\n    void test() override { cout << \"Derived::test \"; }\n};\n\nint main() {\n    Derived d;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Derived::test",
      "Base::test Derived::test",
      "Pure virtual method call crash",
      "Base::test "
    ],
    "correctIndex": 3,
    "explanation": "In C++, calling a virtual function inside a base class constructor resolves to the BASE class version (`Base::test`), NOT the derived version. This is because the `Derived` sub-object is not yet initialized when `Base` runs.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-17",
    "question": "Trace the execution order of constructor calls in this multilevel C++ inheritance hierarchy:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Alpha { public: Alpha() { cout << \"A\"; } };\nclass Beta : public Alpha { public: Beta() { cout << \"B\"; } };\nclass Gamma : public Beta { public: Gamma() { cout << \"C\"; } };\n\nint main() {\n    Gamma g;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "ABC",
      "CBA",
      "CAB",
      "BAC"
    ],
    "correctIndex": 0,
    "explanation": "Constructors are executed from root base class down to the most-derived leaf class: `Alpha` (A), then `Beta` (B), then `Gamma` (C), printing 'ABC'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-18",
    "question": "What is the output of this Python multiple inheritance method resolution using `super()`?",
    "codeSnippet": "class Root:\n    def ping(self):\n        print(\"Root\", end=\" \")\n\nclass Left(Root):\n    def ping(self):\n        print(\"Left\", end=\" \")\n        super().ping()\n\nclass Right(Root):\n    def ping(self):\n        print(\"Right\", end=\" \")\n        super().ping()\n\nclass Leaf(Left, Right):\n    def ping(self):\n        print(\"Leaf\", end=\" \")\n        super().ping()\n\nLeaf().ping()",
    "codeLanguage": "python",
    "options": [
      "Leaf Left Root Right ",
      "Leaf Left Right Root ",
      "Leaf Right Left Root ",
      "Leaf Left Root "
    ],
    "correctIndex": 1,
    "explanation": "The MRO for `Leaf` is [Leaf, Left, Right, Root, object]. `Leaf().ping()` prints 'Leaf ', calls `Left` ('Left '), which calls `Right` ('Right '), which calls `Root` ('Root ').",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-19",
    "question": "What is printed by this Java program testing field hiding vs method overriding?",
    "codeSnippet": "class Parent {\n    int value = 10;\n    int getValue() { return value; }\n}\n\nclass Child extends Parent {\n    int value = 20;\n    int getValue() { return value; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Parent p = new Child();\n        System.out.println(p.value + \" \" + p.getValue());\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "20 20",
      "10 10",
      "10 20",
      "20 10"
    ],
    "correctIndex": 2,
    "explanation": "In Java, member variables are NOT polymorphic; field access `p.value` is resolved at compile time using the static type `Parent` (yielding 10). Methods ARE polymorphic; `p.getValue()` is dispatched dynamically to `Child` (yielding 20).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-20",
    "question": "What is printed by this C++ program testing destructor execution order upon scope exit?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n    virtual ~Base() { cout << \"B\"; }\n};\n\nclass Mid : public Base {\npublic:\n    ~Mid() override { cout << \"M\"; }\n};\n\nclass Leaf : public Mid {\npublic:\n    ~Leaf() override { cout << \"L\"; }\n};\n\nint main() {\n    Base* ptr = new Leaf();\n    delete ptr;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "BML",
      "LMB",
      "L",
      "LMB"
    ],
    "correctIndex": 3,
    "explanation": "With virtual destructors, destruction begins at the most-derived leaf class (`Leaf` -> 'L'), then moves to `Mid` ('M'), and finishes at `Base` ('B'), outputting 'LMB'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-21",
    "question": "What is printed by this Java program demonstrating anonymous class state encapsulation?",
    "codeSnippet": "interface Counter {\n    int next();\n}\n\npublic class Main {\n    public static Counter makeCounter() {\n        return new Counter() {\n            private int count = 0;\n            public int next() { return ++count; }\n        };\n    }\n\n    public static void main(String[] args) {\n        Counter c1 = makeCounter();\n        Counter c2 = makeCounter();\n        System.out.println(c1.next() + \" \" + c1.next() + \" \" + c2.next());\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "1 2 1",
      "1 2 3",
      "1 1 1",
      "2 2 1"
    ],
    "correctIndex": 0,
    "explanation": "`c1` and `c2` are two distinct instance objects in heap memory, each maintaining its own private `count` field. `c1` increments twice (1, 2); `c2` increments once (1), printing '1 2 1'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-22",
    "question": "What is printed by this Python magic methods trace utilizing `__call__` to emulate a callable object?",
    "codeSnippet": "class Multiplier:\n    def __init__(self, factor: int):\n        self.factor = factor\n\n    def __call__(self, val: int) -> int:\n        return self.factor * val\n\ndouble = Multiplier(2)\ntriple = Multiplier(3)\nprint(double(5) + triple(4))",
    "codeLanguage": "python",
    "options": [
      "10",
      "22",
      "12",
      "30"
    ],
    "correctIndex": 1,
    "explanation": "Implementing `__call__` turns instances into callables: `double(5)` computes `2 * 5 = 10`; `triple(4)` computes `3 * 4 = 12`. Their sum is `10 + 12 = 22`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-23",
    "question": "Trace the output in this C++ copy constructor vs assignment operator test:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Widget {\npublic:\n    Widget() { cout << \"Default \"; }\n    Widget(const Widget&) { cout << \"Copy \"; }\n    Widget& operator=(const Widget&) { cout << \"Assign \"; return *this; }\n};\n\nint main() {\n    Widget w1;\n    Widget w2 = w1;\n    Widget w3;\n    w3 = w1;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Default Assign Default Assign ",
      "Default Default Copy Assign ",
      "Default Copy Default Assign ",
      "Default Copy Copy Default "
    ],
    "correctIndex": 2,
    "explanation": "`Widget w1;` calls the default constructor ('Default '). `Widget w2 = w1;` is initialization, which invokes the copy constructor ('Copy '). `Widget w3;` invokes default ('Default '). `w3 = w1;` is assignment to an existing object, calling `operator=` ('Assign ').",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-24",
    "question": "What is printed by this Java exception handling polymorphism puzzle?",
    "codeSnippet": "class BaseEx extends Exception {}\nclass DerivedEx extends BaseEx {}\n\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            throw new DerivedEx();\n        } catch (BaseEx e) {\n            System.out.print(\"CaughtBase \");\n        }\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Unhandled exception termination",
      "Compilation error: DerivedEx must be explicitly caught first",
      "NullPointerException",
      "CaughtBase "
    ],
    "correctIndex": 3,
    "explanation": "Exception catching in Java is polymorphic: a catch block for `BaseEx` matches any instance of `BaseEx` or its subclasses, successfully catching `DerivedEx` and printing 'CaughtBase '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-25",
    "question": "What is printed by this Python class attribute vs instance attribute mutation trace?",
    "codeSnippet": "class Config:\n    tags = []\n\nc1 = Config()\nc2 = Config()\nc1.tags.append(\"alpha\")\nc2.tags.append(\"beta\")\nprint(len(c1.tags), len(c2.tags), Config.tags)",
    "codeLanguage": "python",
    "options": [
      "2 2 ['alpha', 'beta']",
      "1 1 ['alpha']",
      "1 1 ['beta']",
      "0 0 []"
    ],
    "correctIndex": 0,
    "explanation": "`tags = []` is a mutable class-level attribute shared across all instances of `Config`. Appending to `c1.tags` and `c2.tags` mutates the identical shared list, so both see a list of length 2: `['alpha', 'beta']`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-26",
    "question": "What is printed by this C++ `std::shared_ptr` reference count trace?",
    "codeSnippet": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n    shared_ptr<int> p1 = make_shared<int>(42);\n    shared_ptr<int> p2 = p1;\n    {\n        shared_ptr<int> p3 = p2;\n        cout << p1.use_count() << \" \";\n    }\n    cout << p1.use_count();\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "2 1",
      "3 2",
      "3 1",
      "1 1"
    ],
    "correctIndex": 1,
    "explanation": "Inside the nested block, `p1`, `p2`, and `p3` all share ownership of the integer, so `p1.use_count()` is 3. When `p3` exits scope, its destructor decrements the reference count to 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-27",
    "question": "Trace the output in this Java Static Polymorphism (method overloading) puzzle with `null`:",
    "codeSnippet": "public class Main {\n    public static void test(Object o) { System.out.print(\"Object \"); }\n    public static void test(String s) { System.out.print(\"String \"); }\n\n    public static void main(String[] args) {\n        test(null);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Object ",
      "NullPointerException at runtime",
      "String ",
      "Compilation Error: ambiguous method call"
    ],
    "correctIndex": 2,
    "explanation": "In Java, the compiler chooses the most specific overload applicable. Because `String` is a subtype of `Object`, `String` is more specific than `Object`, so `test(String)` is invoked, printing 'String '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-28",
    "question": "What is printed by this C++ virtual function dispatch using reference parameters?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Speaker {\npublic:\n    virtual void say() { cout << \"Generic \"; }\n};\n\nclass FrenchSpeaker : public Speaker {\npublic:\n    void say() override { cout << \"Bonjour \"; }\n};\n\nvoid greet(Speaker& s) {\n    s.say();\n}\n\nint main() {\n    FrenchSpeaker fs;\n    greet(fs);\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Generic ",
      "Generic Bonjour ",
      "Compilation Error",
      "Bonjour "
    ],
    "correctIndex": 3,
    "explanation": "Passing by reference (`Speaker& s`) avoids object slicing and preserves the dynamic type. At runtime, dynamic dispatch invokes `FrenchSpeaker::say()`, printing 'Bonjour '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-29",
    "question": "What is printed by this Python `@classmethod` factory pattern trace?",
    "codeSnippet": "class Date:\n    def __init__(self, y: int, m: int, d: int):\n        self.y, self.m, self.d = y, m, d\n\n    @classmethod\n    def from_string(cls, date_str: str):\n        y, m, d = map(int, date_str.split('-'))\n        return cls(y, m, d)\n\ndt = Date.from_string(\"2026-10-25\")\nprint(f\"{dt.y}/{dt.m}/{dt.d}\")",
    "codeLanguage": "python",
    "options": [
      "2026/10/25",
      "25/10/2026",
      "10/25/2026",
      "TypeError: split() takes no keyword arguments"
    ],
    "correctIndex": 0,
    "explanation": "The `@classmethod` receives the class `Date` as `cls`, splits the string '2026-10-25' into integers 2026, 10, 25, and constructs a new instance, outputting '2026/10/25'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-30",
    "question": "Trace the execution of this Java Command Pattern implementing an undo stack:",
    "codeSnippet": "import java.util.*;\n\ninterface Command { void execute(); void undo(); }\n\nclass TextDoc {\n    StringBuilder text = new StringBuilder();\n}\n\nclass AppendCommand implements Command {\n    private TextDoc doc;\n    private String str;\n    public AppendCommand(TextDoc d, String s) { this.doc = d; this.str = s; }\n    public void execute() { doc.text.append(str); }\n    public void undo() {\n        int len = doc.text.length();\n        doc.text.delete(len - str.length(), len);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        TextDoc doc = new TextDoc();\n        Command c1 = new AppendCommand(doc, \"Hello \");\n        Command c2 = new AppendCommand(doc, \"SPSU\");\n        c1.execute();\n        c2.execute();\n        c2.undo();\n        System.out.println(doc.text.toString());\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Hello SPSU",
      "Hello ",
      "SPSU",
      "Empty String"
    ],
    "correctIndex": 1,
    "explanation": "`c1.execute()` appends 'Hello '; `c2.execute()` appends 'SPSU' -> 'Hello SPSU'. `c2.undo()` removes the last 4 characters ('SPSU'), leaving 'Hello '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-31",
    "question": "What is printed by this C++ dynamic binding test through a pointer to pointer?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n    virtual int code() { return 10; }\n};\n\nclass Sub : public Base {\npublic:\n    int code() override { return 20; }\n};\n\nint main() {\n    Sub s;\n    Base* b = &s;\n    Base** pp = &b;\n    cout << (*pp)->code();\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "10",
      "Address of pointer",
      "20",
      "Compilation Error"
    ],
    "correctIndex": 2,
    "explanation": "`*pp` dereferences the pointer-to-pointer to yield `Base* b`. Calling `->code()` resolves dynamically through the vtable of `s`, executing `Sub::code()` which returns 20.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-32",
    "question": "What is printed by this Python multiple inheritance `isinstance` and `issubclass` inspection?",
    "codeSnippet": "class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass\n\nd = D()\nprint(isinstance(d, A), issubclass(D, C), isinstance(d, (B, C)))",
    "codeLanguage": "python",
    "options": [
      "True False True",
      "False True True",
      "True True False",
      "True True True"
    ],
    "correctIndex": 3,
    "explanation": "`d` is an instance of `A` (via B and C); `D` is a subclass of `C`; and `d` is an instance of `(B, C)`. All three evaluations return `True`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-33",
    "question": "Trace the output in this Java default interface method inheritance puzzle:",
    "codeSnippet": "interface BaseUI {\n    default void draw() { System.out.print(\"BaseUI \"); }\n}\n\ninterface ModernUI extends BaseUI {\n    default void draw() { System.out.print(\"ModernUI \"); }\n}\n\nclass Dashboard implements ModernUI {}\n\npublic class Main {\n    public static void main(String[] args) {\n        new Dashboard().draw();\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "ModernUI ",
      "BaseUI ",
      "BaseUI ModernUI ",
      "Compilation Error: Duplicate default methods"
    ],
    "correctIndex": 0,
    "explanation": "In Java interface inheritance, a sub-interface's default method overrides the super-interface's default method. `ModernUI` overrides `BaseUI.draw()`, so `Dashboard` prints 'ModernUI '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-34",
    "question": "What is printed by this C++ `std::unique_ptr` ownership transfer using `std::move`?",
    "codeSnippet": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nvoid process(unique_ptr<int> p) {\n    if (p) cout << *p << \" \";\n}\n\nint main() {\n    unique_ptr<int> ptr = make_unique<int>(99);\n    process(std::move(ptr));\n    if (!ptr) cout << \"Transferred\";\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "99 99",
      "99 Transferred",
      "Compilation Error: unique_ptr cannot be passed by value",
      "Transferred 99"
    ],
    "correctIndex": 1,
    "explanation": "`std::move(ptr)` transfers ownership of the allocated integer to parameter `p` of `process`. Inside `process`, `*p` prints '99 '. Upon return, `ptr` in `main` is null, so it prints 'Transferred'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-35",
    "question": "What is printed by this Python private attribute name mangling check?",
    "codeSnippet": "class SecretVault:\n    def __init__(self):\n        self.__code = 4321\n\nv = SecretVault()\nprint(hasattr(v, '__code'), hasattr(v, '_SecretVault__code'))",
    "codeLanguage": "python",
    "options": [
      "True False",
      "True True",
      "False True",
      "False False"
    ],
    "correctIndex": 2,
    "explanation": "Python enforces private attributes with double underscores by name mangling: `__code` is transformed internally into `_ClassName__attribute` (`_SecretVault__code`). Thus `hasattr(v, '__code')` is False and `hasattr(v, '_SecretVault__code')` is True.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-36",
    "question": "What is printed by this Java polymorphism test using polymorphic array storage?",
    "codeSnippet": "class Super { void test() { System.out.print(\"S \"); } }\nclass SubA extends Super { void test() { System.out.print(\"A \"); } }\nclass SubB extends Super { void test() { System.out.print(\"B \"); } }\n\npublic class Main {\n    public static void main(String[] args) {\n        Super[] arr = { new SubA(), new SubB(), new Super() };\n        for (Super s : arr) s.test();\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "S S S ",
      "A B A ",
      "A A S ",
      "A B S "
    ],
    "correctIndex": 3,
    "explanation": "Each element in the `Super[]` array executes its dynamic runtime override: `SubA.test()` prints 'A ', `SubB.test()` prints 'B ', and `Super.test()` prints 'S ', yielding 'A B S '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-37",
    "question": "Trace the output in this C++ virtual destructor memory reclamation verification:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nint leakCount = 0;\n\nclass Core {\npublic:\n    virtual ~Core() { leakCount--; cout << \"C\"; }\n};\n\nclass Extension : public Core {\npublic:\n    Extension() { leakCount += 2; }\n    ~Extension() override { leakCount--; cout << \"E\"; }\n};\n\nint main() {\n    Core* c = new Extension();\n    delete c;\n    cout << \" Rem:\" << leakCount;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "EC Rem:0",
      "C Rem:1",
      "EC Rem:1",
      "CE Rem:0"
    ],
    "correctIndex": 0,
    "explanation": "`Extension` constructor increments `leakCount` to 2. `delete c` invokes `~Extension()` (prints 'E', decrements to 1) followed by `~Core()` (prints 'C', decrements to 0), printing 'EC Rem:0'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-38",
    "question": "What is printed by this Python generator-based iteration inside a custom class?",
    "codeSnippet": "class FibonacciSeries:\n    def __init__(self, limit: int):\n        self.limit = limit\n\n    def __iter__(self):\n        a, b = 0, 1\n        for _ in range(self.limit):\n            yield a\n            a, b = b, a + b\n\nprint(list(FibonacciSeries(5)))",
    "codeLanguage": "python",
    "options": [
      "[1, 1, 2, 3, 5]",
      "[0, 1, 1, 2, 3]",
      "[0, 1, 2, 3, 4]",
      "[1, 2, 3, 5, 8]"
    ],
    "correctIndex": 1,
    "explanation": "The generator yields 5 terms starting from `a = 0, b = 1`: 0, 1, 1, 2, 3. Converted to a list, it outputs `[0, 1, 1, 2, 3]`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-39",
    "question": "What is printed by this Java enum with custom behavior and method overriding?",
    "codeSnippet": "enum Operation {\n    PLUS { int apply(int a, int b) { return a + b; } },\n    TIMES { int apply(int a, int b) { return a * b; } };\n\n    abstract int apply(int a, int b);\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(Operation.PLUS.apply(3, 4) + Operation.TIMES.apply(3, 4));\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "12",
      "14",
      "19",
      "21"
    ],
    "correctIndex": 2,
    "explanation": "`Operation.PLUS.apply(3, 4)` returns `3 + 4 = 7`. `Operation.TIMES.apply(3, 4)` returns `3 * 4 = 12`. Their sum is `7 + 12 = 19`.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-40",
    "question": "What is printed by this C++ `const` member function overload test?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass DataHolder {\npublic:\n    void inspect() { cout << \"Mutable \"; }\n    void inspect() const { cout << \"Const \"; }\n};\n\nint main() {\n    DataHolder dh1;\n    const DataHolder dh2;\n    dh1.inspect();\n    dh2.inspect();\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Mutable Mutable ",
      "Const Const ",
      "Const Mutable ",
      "Mutable Const "
    ],
    "correctIndex": 3,
    "explanation": "`dh1` is non-const, binding to the non-const `inspect()` ('Mutable '). `dh2` is const, binding to `inspect() const` ('Const '), printing 'Mutable Const '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-41",
    "question": "What is printed by this Python `@abstractmethod` enforcement check?",
    "codeSnippet": "from abc import ABC, abstractmethod\n\nclass Base(ABC):\n    @abstractmethod\n    def run(self): pass\n\nclass Concrete(Base):\n    def run(self): return \"Running\"\n\nc = Concrete()\nprint(c.run())",
    "codeLanguage": "python",
    "options": [
      "Running",
      "TypeError: Cannot instantiate Concrete",
      "None",
      "Compilation Error"
    ],
    "correctIndex": 0,
    "explanation": "`Concrete` overrides all abstract methods of `Base` (`run`), so instantiation succeeds and `c.run()` returns 'Running'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-42",
    "question": "Trace the method execution in this Java Interface default method diamond resolution:",
    "codeSnippet": "interface GrandParent {\n    default void hello() { System.out.print(\"GP \"); }\n}\ninterface Parent1 extends GrandParent {}\ninterface Parent2 extends GrandParent {\n    default void hello() { System.out.print(\"P2 \"); }\n}\nclass Child implements Parent1, Parent2 {}\n\npublic class Main {\n    public static void main(String[] args) {\n        new Child().hello();\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "GP ",
      "P2 ",
      "GP P2 ",
      "Compilation Error: Ambiguous default methods"
    ],
    "correctIndex": 1,
    "explanation": "In Java's default method resolution rules, sub-interfaces win over super-interfaces. Since `Parent2` extends `GrandParent` and overrides `hello()`, `Parent2` is more specific than `GrandParent` (inherited via `Parent1`), so `Child` inherits `Parent2.hello()` without conflict, printing 'P2 '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-43",
    "question": "What is printed by this C++ `explicit` constructor conversion prevention check?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass Fraction {\npublic:\n    int num;\n    explicit Fraction(int n) : num(n) {}\n};\n\nvoid show(Fraction f) {\n    cout << f.num;\n}\n\nint main() {\n    // show(5); // Fails due to explicit!\n    show(Fraction(5));\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "0",
      "Compilation error on line show(Fraction(5))",
      "5",
      "Garbage memory value"
    ],
    "correctIndex": 2,
    "explanation": "An `explicit` constructor prevents implicit type conversion (like `show(5)`), but explicit construction `show(Fraction(5))` is fully permitted and prints 5.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-44",
    "question": "What is printed by this Python context manager implementing `__enter__` and `__exit__`?",
    "codeSnippet": "class FileManager:\n    def __enter__(self):\n        print(\"Open\", end=\" \")\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        print(\"Close\", end=\" \")\n        return True\n\nwith FileManager():\n    print(\"Work\", end=\" \")",
    "codeLanguage": "python",
    "options": [
      "Open Close Work ",
      "Work Open Close ",
      "Open Work ",
      "Open Work Close "
    ],
    "correctIndex": 3,
    "explanation": "`with FileManager():` first runs `__enter__` ('Open '), executes the body ('Work '), and guarantees execution of `__exit__` ('Close ') upon block termination, printing 'Open Work Close '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-45",
    "question": "What is printed by this Java thread-safe Singleton using the initialization-on-demand holder idiom?",
    "codeSnippet": "public class BillPughSingleton {\n    private BillPughSingleton() { System.out.print(\"Init \"); }\n\n    private static class Holder {\n        private static final BillPughSingleton INSTANCE = new BillPughSingleton();\n    }\n\n    public static BillPughSingleton getInstance() {\n        return Holder.INSTANCE;\n    }\n\n    public static void main(String[] args) {\n        System.out.print(\"Start \");\n        BillPughSingleton s1 = BillPughSingleton.getInstance();\n        BillPughSingleton s2 = BillPughSingleton.getInstance();\n        System.out.print(s1 == s2);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Start Init true",
      "Init Start true",
      "Start Init Init true",
      "Start true"
    ],
    "correctIndex": 0,
    "explanation": "The nested `Holder` class is not loaded into JVM memory until `getInstance()` is called. 'Start ' prints first. Then `Holder` is initialized, invoking the constructor ('Init '). Subsequent calls return the same cached instance, printing 'Start Init true'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-46",
    "question": "What is printed by this C++ Diamond problem initialization test?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\n\nclass A {\npublic:\n    A(int v) { cout << \"A:\" << v << \" \"; }\n};\n\nclass B : virtual public A {\npublic:\n    B() : A(1) { cout << \"B \"; }\n};\n\nclass C : virtual public A {\npublic:\n    C() : A(2) { cout << \"C \"; }\n};\n\nclass D : public B, public C {\npublic:\n    D() : A(3) { cout << \"D \"; }\n};\n\nint main() {\n    D d;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "A:1 B A:2 C D ",
      "A:3 B C D ",
      "B C A:3 D ",
      "A:1 A:2 A:3 B C D "
    ],
    "correctIndex": 1,
    "explanation": "In C++ virtual inheritance, the most-derived class (`D`) is solely responsible for initializing the virtual base class (`A`). `B` and `C`'s initializers for `A` are ignored. Thus `A(3)` runs first, followed by `B`, `C`, and `D`, printing 'A:3 B C D '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-47",
    "question": "What is printed by this Python deepcopy vs shallow copy demonstration?",
    "codeSnippet": "import copy\n\nclass Team:\n    def __init__(self, members):\n        self.members = members\n\nt1 = Team([\"Alice\", \"Bob\"])\nt2 = copy.copy(t1)\nt3 = copy.deepcopy(t1)\n\nt1.members.append(\"Charlie\")\nprint(len(t2.members), len(t3.members))",
    "codeLanguage": "python",
    "options": [
      "2 2",
      "3 3",
      "3 2",
      "2 3"
    ],
    "correctIndex": 2,
    "explanation": "`t2` is a shallow copy, so `t2.members` references the same list as `t1.members` (now length 3). `t3` is a deepcopy, so `t3.members` is an independent cloned list (remains length 2), printing '3 2'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-48",
    "question": "What is printed by this Java method reference vs lambda polymorphic invocation?",
    "codeSnippet": "import java.util.*;\nimport java.util.function.Function;\n\nclass Transformer {\n    static String upper(String s) { return s.toUpperCase(); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Function<String, String> f = Transformer::upper;\n        System.out.println(f.apply(\"spsu\"));\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "spsu",
      "Transformer.upper",
      "null",
      "SPSU"
    ],
    "correctIndex": 3,
    "explanation": "`Transformer::upper` assigns the static method to a functional interface `Function<String, String>`. Calling `apply(\"spsu\")` executes `Transformer.upper(\"spsu\")` which returns 'SPSU'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-49",
    "question": "What is printed by this C++ `std::unique_ptr` polymorphic container trace?",
    "codeSnippet": "#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual void draw() const { cout << \"S \"; }\n    virtual ~Shape() = default;\n};\n\nclass Circle : public Shape {\npublic:\n    void draw() const override { cout << \"C \"; }\n};\n\nint main() {\n    vector<unique_ptr<Shape>> list;\n    list.push_back(make_unique<Shape>());\n    list.push_back(make_unique<Circle>());\n    for (const auto& item : list) {\n        item->draw();\n    }\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "S C ",
      "C S ",
      "S S ",
      "C C "
    ],
    "correctIndex": 0,
    "explanation": "The vector stores polymorphic smart pointers. `item->draw()` invokes dynamic dispatch via each object's vptr: the first object prints 'S ', the second prints 'C ', outputting 'S C '.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d5-post-50",
    "question": "What is printed by this Python dunder method `__len__` and `__getitem__` implementation allowing slicing?",
    "codeSnippet": "class NumberRange:\n    def __init__(self, start: int, end: int):\n        self.data = list(range(start, end))\n\n    def __len__(self):\n        return len(self.data)\n\n    def __getitem__(self, item):\n        return self.data[item]\n\nnr = NumberRange(10, 15)\nprint(len(nr), nr[1:3])",
    "codeLanguage": "python",
    "options": [
      "5 [10, 11]",
      "5 [11, 12]",
      "6 [11, 12, 13]",
      "5 [11, 12, 13]"
    ],
    "correctIndex": 1,
    "explanation": "`range(10, 15)` has 5 elements: `[10, 11, 12, 13, 14]`. `len(nr)` is 5. `nr[1:3]` extracts slice indices 1 and 2, which are `[11, 12]`, outputting '5 [11, 12]'.",
    "category": "Practical Execution & Trace (70%)"
  }
];
