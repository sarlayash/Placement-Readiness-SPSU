import { ProgrammingNote } from '../types';

/**
 * Day 5 Comprehensive Programming Notes & Solved Examples
 * Module 5: Object-Oriented Programming (OOP) & SOLID Design
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 * Covers: 4 Pillars of OOP, VTable / VPtr Dynamic Dispatch Internals,
 * Constructors/Destructors, Copy vs Move Semantics, Deep vs Shallow Copy,
 * Diamond Problem & Virtual Inheritance, Interface vs Abstract Class,
 * All 5 SOLID Design Principles, and GoF Patterns (Singleton, Factory, Strategy).
 */
export const DAY_5_PROGRAMMING_NOTES: ProgrammingNote[] = [
  {
    id: 'd5-note-1',
    title: 'The 4 Pillars of OOP & Virtual Method Table (vtable / vptr) Dynamic Dispatch',
    conceptSummary:
      'Object-Oriented Programming organizes software systems around cohesive data structures (state) coupled with operations (behavior).\n\n1. The Four Pillars:\n   - Encapsulation: Bundling state with methods and restricting direct access to internal invariants via access specifiers (private/protected/public).\n   - Abstraction: Hiding implementation complexity behind clear public contracts.\n   - Inheritance: Establishing "is-a" relationships for behavioral and structural reuse.\n   - Polymorphism: Ability of different types to respond to the same message/method call.\n\n2. Compile-Time vs Runtime Polymorphism:\n   - Compile-Time (Static Binding): Method Overloading (same name, different parameter types/arity) and Templates/Generics. Resolved by the compiler with zero runtime overhead.\n   - Runtime (Dynamic Binding): Method Overriding in inheritance hierarchies. Resolved during execution via dynamic dispatch.\n\n3. Dynamic Dispatch Internals (C++ VTable Memory Architecture):\n   - When a class declares at least one `virtual` function, the compiler creates a static Virtual Method Table (vtable) containing function pointers to the most-derived implementations.\n   - Each instance of that class is secretly augmented with a hidden pointer (`_vptr`, typically the first 8 bytes on 64-bit systems) pointing to that class\'s vtable.\n   - Calling `ptr->virtualMethod()` compiles down to: dereference `ptr` to get `_vptr`, add the method\'s fixed index offset into the vtable, and jump to the function pointer `(*_vptr[offset])()`. This adds only 1 pointer dereference overhead (O(1)).',
    timeSpaceNote:
      'Virtual Dispatch Call: O(1) time (2 pointer dereferences) | Memory: 8 bytes per object for _vptr + 8 bytes per virtual method in the class-level static vtable.',
    kapilMentorTip:
      'A classic Amazon/Google placement interview question: "What is the sizeof an empty class in C++ vs an empty class with one virtual function?" An empty class is 1 byte (to give it a unique address). An empty class with a virtual function is 8 bytes on a 64-bit machine because of the compiler-injected `_vptr`!',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>

/*
 * C Simulation of C++ VTable & Dynamic Dispatch:
 * Structs + Function Pointer Table simulating vtable & _vptr
 */
typedef struct ShapeVTable ShapeVTable;

typedef struct Shape {
    const ShapeVTable* vptr; // Simulated _vptr
    char name[32];
} Shape;

struct ShapeVTable {
    double (*area)(const Shape* self);
    void (*draw)(const Shape* self);
};

// Derived Circle
typedef struct Circle {
    Shape base; // Inheritance via containment
    double radius;
} Circle;

double circle_area(const Shape* self) {
    const Circle* c = (const Circle*)self;
    return 3.1415926535 * c->radius * c->radius;
}

void circle_draw(const Shape* self) {
    const Circle* c = (const Circle*)self;
    printf("[Circle: %s] Drawing with Radius = %.2f, Area = %.2f\\n", c->base.name, c->radius, circle_area(self));
}

// Static VTable for Circle
static const ShapeVTable circle_vtable = { circle_area, circle_draw };

Circle* create_circle(const char* name, double radius) {
    Circle* c = (Circle*)malloc(sizeof(Circle));
    c->base.vptr = &circle_vtable; // Initialize _vptr
    snprintf(c->base.name, sizeof(c->base.name), "%s", name);
    c->radius = radius;
    return c;
}

int main() {
    Circle* c = create_circle("AlphaCircle", 5.0);
    Shape* polyPtr = (Shape*)c; // Upcasting to base

    // Dynamic dispatch via simulated vtable
    polyPtr->vptr->draw(polyPtr);
    printf("Calculated Area via VTable: %.2f\\n", polyPtr->vptr->area(polyPtr));

    free(c);
    return 0;
}`,
      cpp: `#include <iostream>
#include <memory>
#include <vector>
using namespace std;

// Base Abstract Contract
class Shape {
protected:
    string name;
public:
    explicit Shape(string n) : name(move(n)) {}
    // Pure virtual method makes Shape an Abstract Base Class (ABC)
    virtual double area() const = 0;
    virtual void draw() const {
        cout << "[Base Shape: " << name << "] Generic draw." << endl;
    }
    // Virtual destructor is MANDATORY for polymorphic base classes
    virtual ~Shape() {
        cout << "~Shape() cleaned up: " << name << endl;
    }
};

class Circle : public Shape {
    double radius;
public:
    Circle(string n, double r) : Shape(move(n)), radius(r) {}
    double area() const override {
        return 3.1415926535 * radius * radius;
    }
    void draw() const override {
        cout << "[Circle: " << name << "] Radius=" << radius << " | Area=" << area() << endl;
    }
    ~Circle() override {
        cout << "~Circle() specific resource cleaned." << endl;
    }
};

int main() {
    // Unique pointer for automatic memory management & safe polymorphic cleanup
    vector<unique_ptr<Shape>> shapes;
    shapes.push_back(make_unique<Circle>("PlacementCircle", 7.0));

    for (const auto& s : shapes) {
        s->draw(); // Dynamic dispatch via vtable at runtime
        cout << "Area = " << s->area() << endl;
    }
    return 0;
}`,
      java: `abstract class Shape {
    protected String name;
    public Shape(String name) { this.name = name; }
    // Abstract method must be implemented by concrete subclasses
    public abstract double area();
    public void draw() {
        System.out.println("[Base Shape: " + name + "] Drawing shape.");
    }
}

class Circle extends Shape {
    private final double radius;
    public Circle(String name, double radius) {
        super(name);
        this.radius = radius;
    }
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
    @Override
    public void draw() {
        System.out.printf("[Circle: %s] Radius=%.2f | Area=%.2f%n", name, radius, area());
    }
}

public class PillarsDemo {
    public static void main(String[] args) {
        // Polymorphic reference: Base type referring to derived instance
        Shape s = new Circle("JavaCircle", 5.0);
        s.draw(); // Dynamic dispatch (Java invokevirtual bytecode)
        System.out.printf("Computed Area: %.2f%n", s.area());
    }
}`,
      python: `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    def __init__(self, name: str) -> None:
        self._name = name  # Protected encapsulation convention
        
    @abstractmethod
    def area(self) -> float:
        """Subclasses must implement area."""
        pass
        
    def draw(self) -> None:
        print(f"[Base Shape: {self._name}] Generic draw.")

class Circle(Shape):
    def __init__(self, name: str, radius: float) -> None:
        super().__init__(name)
        if radius <= 0:
            raise ValueError("Radius must be strictly positive.")
        self.__radius = radius  # Name mangling private attribute
        
    def area(self) -> float:
        return math.pi * (self.__radius ** 2)
        
    def draw(self) -> None:
        print(f"[Circle: {self._name}] Radius={self.__radius:.2f} | Area={self.area():.2f}")

if __name__ == "__main__":
    shape: Shape = Circle("PyCircle", 4.0)
    shape.draw()  # Dynamic method lookup via Python dictionary MRO
    print(f"Area: {shape.area():.2f}")`,
    },
  },
  {
    id: 'd5-note-2',
    title: 'Constructors, Destructors, Copy vs Move Semantics & Virtual Destructors',
    conceptSummary:
      'Lifecycle management of objects governs stability, performance, and resource leakage in enterprise software.\n\n1. Constructor Taxonomy:\n   - Default Constructor: Initializes object without arguments.\n   - Parameterized Constructor: Injects initial state and enforces domain invariants.\n   - Copy Constructor: Creates a new object as a copy of an existing object. Beware of Shallow vs Deep copy!\n   - Move Constructor (C++11): Transfers ownership of heap resources from an rvalue temporary (`&&`) without memory reallocation, leaving the source in a valid but empty state.\n\n2. Shallow Copy vs Deep Copy:\n   - Shallow Copy: Copies pointer addresses. Both objects share the same heap memory. When both destructors run, this causes a catastrophic Double-Free memory corruption!\n   - Deep Copy: Allocates fresh heap memory and copies the actual underlying data values.\n\n3. The Mandatory Virtual Destructor Rule:\n   - If a class has virtual functions, its destructor MUST be declared `virtual`!\n   - If you delete a derived object through a base class pointer (`Base* p = new Derived(); delete p;`), and `Base` does NOT have a virtual destructor: ONLY `~Base()` executes! The `~Derived()` destructor is never invoked, leaking file handles, network sockets, and heap memory allocated by the derived class.',
    timeSpaceNote:
      'Move Constructor: O(1) pointer swap | Deep Copy Constructor: O(N) memory allocation and copy.',
    kapilMentorTip:
      'Rule of Zero / Three / Five in modern C++:\n- Rule of Three (C++98): If you write a custom Destructor, Copy Constructor, or Copy Assignment, you almost certainly need to write all three.\n- Rule of Five (C++11): Add Move Constructor and Move Assignment for optimal performance.\n- Rule of Zero: Prefer smart pointers (`std::unique_ptr`, `std::shared_ptr`) so you don\'t need to write manual memory management at all!',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
 * C Deep Copy Simulation with Dynamic Memory Management
 */
typedef struct DynamicBuffer {
    int* data;
    size_t size;
} DynamicBuffer;

DynamicBuffer create_buffer(size_t size, int init_val) {
    DynamicBuffer buf;
    buf.size = size;
    buf.data = (int*)malloc(size * sizeof(int));
    for (size_t i = 0; i < size; i++) buf.data[i] = init_val;
    return buf;
}

// Deep Copy: Allocates fresh buffer so caller and source don't double-free
DynamicBuffer deep_copy_buffer(const DynamicBuffer* src) {
    DynamicBuffer copy;
    copy.size = src->size;
    copy.data = (int*)malloc(src->size * sizeof(int));
    memcpy(copy.data, src->data, src->size * sizeof(int));
    return copy;
}

void free_buffer(DynamicBuffer* buf) {
    if (buf->data) {
        free(buf->data);
        buf->data = NULL;
        buf->size = 0;
    }
}

int main() {
    DynamicBuffer b1 = create_buffer(3, 100);
    DynamicBuffer b2 = deep_copy_buffer(&b1); // Deep copy
    b1.data[0] = 999; // Mutating b1 does NOT affect b2

    printf("b1[0] = %d | b2[0] = %d (Independent Heap Memory)\\n", b1.data[0], b2.data[0]);
    free_buffer(&b1);
    free_buffer(&b2); // Safe! No double free
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <utility>
using namespace std;

class DeepArray {
    int* data;
    size_t size;
public:
    // 1. Parameterized Constructor
    DeepArray(size_t sz, int val) : size(sz), data(new int[sz]) {
        for (size_t i = 0; i < size; i++) data[i] = val;
        cout << "Constructed size " << size << endl;
    }

    // 2. Deep Copy Constructor
    DeepArray(const DeepArray& other) : size(other.size), data(new int[other.size]) {
        for (size_t i = 0; i < size; i++) data[i] = other.data[i];
        cout << "Deep Copy executed (New heap allocation)" << endl;
    }

    // 3. Move Constructor (C++11 rvalue steal)
    DeepArray(DeepArray&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr; // Neutralize source to prevent double deletion
        other.size = 0;
        cout << "Move Constructor executed (Zero allocation pointer swap)" << endl;
    }

    // 4. Destructor
    virtual ~DeepArray() {
        delete[] data;
        cout << "Destructor called for size " << size << endl;
    }

    void set(size_t idx, int val) { if (idx < size) data[idx] = val; }
    int get(size_t idx) const { return (idx < size) ? data[idx] : -1; }
};

int main() {
    DeepArray arr1(3, 42);
    DeepArray arr2 = arr1; // Deep Copy
    arr1.set(0, 999);
    cout << "arr1[0]: " << arr1.get(0) << " | arr2[0]: " << arr2.get(0) << endl;

    DeepArray arr3 = move(arr1); // Move ownership to arr3
    cout << "arr3[0]: " << arr3.get(0) << endl;
    return 0;
}`,
      java: `class DeepArray implements Cloneable {
    private final int[] data;

    public DeepArray(int size, int initVal) {
        this.data = new int[size];
        for (int i = 0; i < size; i++) this.data[i] = initVal;
    }

    // Copy constructor for clean deep copying in Java
    public DeepArray(DeepArray other) {
        this.data = other.data.clone(); // Clones internal heap array
    }

    public void set(int idx, int val) { this.data[idx] = val; }
    public int get(int idx) { return this.data[idx]; }

    public static void main(String[] args) {
        DeepArray a1 = new DeepArray(3, 50);
        DeepArray a2 = new DeepArray(a1); // Deep copy constructor
        a1.set(0, 999);

        System.out.println("a1[0] = " + a1.get(0) + " | a2[0] = " + a2.get(0));
    }
}`,
      python: `import copy

class DeepArray:
    def __init__(self, size: int, init_val: int) -> None:
        self.data: list[int] = [init_val] * size
        
    def __copy__(self) -> 'DeepArray':
        """Custom shallow copy."""
        new_obj = DeepArray(0, 0)
        new_obj.data = self.data.copy()
        return new_obj

    def __deepcopy__(self, memo: dict) -> 'DeepArray':
        """Custom deep copy."""
        new_obj = DeepArray(0, 0)
        new_obj.data = copy.deepcopy(self.data, memo)
        return new_obj

if __name__ == "__main__":
    a1 = DeepArray(3, 77)
    a2 = copy.deepcopy(a1)
    a1.data[0] = 999
    print(f"a1[0] = {a1.data[0]} | a2[0] = {a2.data[0]} (Isolated memory lists)")`,
    },
  },
  {
    id: 'd5-note-3',
    title: 'Interfaces vs Abstract Classes, Multiple Inheritance & The Diamond Problem',
    conceptSummary:
      'Designing flexible type hierarchies requires knowing when to use pure interfaces vs abstract base classes and how compilers resolve multiple inheritance conflicts.\n\n1. Abstract Class vs Interface:\n   - Abstract Class: Represents an "is-a" identity. Can contain instance fields (state), concrete methods, and constructors. Classes can typically inherit from only ONE base class (single inheritance).\n   - Interface: Represents a "can-do" capability or behavioral contract. Historically stateless (though Java 8 added default methods). Classes can implement MULTIPLE interfaces.\n\n2. The Diamond Problem in Multiple Inheritance:\n   - Occurs when class `D` inherits from both `B` and `C`, and both `B` and `C` inherit from class `A`.\n   - Ambiguity: Does an object of `D` contain one copy of `A` or two? If `A` has field `x`, accessing `d.x` fails compilation because the compiler does not know whether to take `B::x` or `C::x`!\n\n3. Language Solutions to the Diamond Problem:\n   - C++: Solves it via `virtual` inheritance (`class B : virtual public A`). The compiler inserts an offset table so `D` contains only ONE shared sub-object of `A`.\n   - Java: Disallows multiple class inheritance altogether; allows multiple interfaces. If two interfaces declare identical default methods, the implementing class MUST override and explicitly disambiguate via `InterfaceName.super.method()`.\n   - Python: Solves multiple inheritance using Method Resolution Order (MRO) computed via the C3 Linearization Algorithm. Inspectable via `ClassName.__mro__`.',
    timeSpaceNote:
      'Virtual Base Class: Injects a vbptr (Virtual Base Pointer) adding 8 bytes per inheritance level and 1 level of indirection.',
    kapilMentorTip:
      'In LLD (Low-Level Design) interview rounds, adhere to the "Favor Composition over Inheritance" principle (GoF). Inheritance tightly couples classes and creates fragile base class problems. Use interfaces for polymorphism and composition for code reuse.',
    codeByLanguage: {
      c: `#include <stdio.h>

/*
 * C Simulation of Multiple Interface Capabilities via Composition
 */
typedef struct Printable {
    void (*print)(void* obj);
} Printable;

typedef struct Serializable {
    void (*serialize)(void* obj);
} Serializable;

typedef struct Document {
    char title[32];
    Printable printable;
    Serializable serializable;
} Document;

void doc_print(void* obj) {
    Document* d = (Document*)obj;
    printf("[Printable] Printing Document: %s\\n", d->title);
}

void doc_serialize(void* obj) {
    Document* d = (Document*)obj;
    printf("[Serializable] JSON payload: {\\\"title\\\": \\\"%s\\\"}\\n", d->title);
}

int main() {
    Document doc = { "SPSU Placement Roadmap", { doc_print }, { doc_serialize } };
    doc.printable.print(&doc);
    doc.serializable.serialize(&doc);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

// The Classic Diamond Problem Solved via Virtual Inheritance
class Device {
public:
    int id;
    Device(int i = 0) : id(i) {
        cout << "Device(" << id << ") constructed." << endl;
    }
};

// Virtual base class ensures only ONE instance of Device in final derived class
class Printer : virtual public Device {
public:
    Printer(int i) : Device(i) {}
    void print() const { cout << "Printer ID: " << id << " printing..." << endl; }
};

class Scanner : virtual public Device {
public:
    Scanner(int i) : Device(i) {}
    void scan() const { cout << "Scanner ID: " << id << " scanning..." << endl; }
};

// Most derived class is directly responsible for initializing the virtual base
class MultiFunctionMachine : public Printer, public Scanner {
public:
    MultiFunctionMachine(int i) : Device(i), Printer(i), Scanner(i) {}
};

int main() {
    MultiFunctionMachine mfm(501);
    mfm.print();
    mfm.scan();
    // No ambiguity! Exactly one 'id' exists
    cout << "Unified Device ID: " << mfm.id << endl;
    return 0;
}`,
      java: `interface Printable {
    default void execute() {
        System.out.println("Printable: Sending to hardware queue.");
    }
}

interface Loggable {
    default void execute() {
        System.out.println("Loggable: Writing to disk log.");
    }
}

// Java Multiple Interface Default Method Conflict Resolution
class DocumentProcessor implements Printable, Loggable {
    @Override
    public void execute() {
        // Compiler forces explicit disambiguation
        System.out.println("--- DocumentProcessor Disambiguation ---");
        Printable.super.execute();
        Loggable.super.execute();
    }
}

public class DiamondDemo {
    public static void main(String[] args) {
        DocumentProcessor dp = new DocumentProcessor();
        dp.execute();
    }
}`,
      python: `class A:
    def action(self) -> None:
        print("Action from A")

class B(A):
    def action(self) -> None:
        print("Action from B")
        super().action()

class C(A):
    def action(self) -> None:
        print("Action from C")
        super().action()

class D(B, C):
    """Diamond hierarchy resolved by C3 Linearization (MRO)."""
    def action(self) -> None:
        print("Action from D")
        super().action()

if __name__ == "__main__":
    d = D()
    d.action()
    print("\\nMethod Resolution Order (MRO):")
    for cls in D.__mro__:
        print(" ->", cls.__name__)`,
    },
  },
  {
    id: 'd5-note-4',
    title: 'The 5 SOLID Principles with Real-World Refactoring Code',
    conceptSummary:
      'The SOLID principles (introduced by Robert C. Martin / Uncle Bob) form the gold standard for writing maintainable, extensible, and clean object-oriented architectures.\n\n1. S – Single Responsibility Principle (SRP):\n   - A class should have one, and only one, reason to change.\n   - Violation: An `Invoice` class that calculates totals, saves itself to a PostgreSQL database, and formats HTML emails.\n   - Fix: Separate into `Invoice` (entity), `InvoiceRepository` (persistence), and `InvoiceNotifier` (communication).\n\n2. O – Open/Closed Principle (OCP):\n   - Software entities should be open for extension, but closed for modification.\n   - Avoid modifying existing battle-tested code with massive `switch` or `if/else` ladders. Use polymorphism and abstract strategies.\n\n3. L – Liskov Substitution Principle (LSP):\n   - Subtypes must be substitutable for their base types without altering correctness.\n   - Classic Violation: Making `Square` inherit from `Rectangle` and overriding `setWidth(w)` to also mutate height, breaking callers that expect independent width and height mutations.\n\n4. I – Interface Segregation Principle (ISP):\n   - Clients should not be forced to depend on methods they do not use.\n   - Prefer small, role-specific interfaces over massive "fat" interfaces.\n\n5. D – Dependency Inversion Principle (DIP):\n   - High-level modules should not depend on low-level modules. Both should depend on abstractions.\n   - Abstractions should not depend on details. Details should depend on abstractions (Dependency Injection).',
    timeSpaceNote:
      'Applying SOLID decouples components into O(1) swappable modules and simplifies unit testing with mock objects.',
    kapilMentorTip:
      'In System Design & Low-Level Design (LLD) placement interviews, interviewers intentionally give you problems like "Design a Notification System" or "Design a Parking Lot". Don\'t start writing code immediately! Identify the SOLID violations first and articulate your interfaces and dependency injection strategy.',
    codeByLanguage: {
      c: `#include <stdio.h>

/*
 * C Dependency Inversion Principle (DIP):
 * High-level business logic depends on logger abstraction, not concrete console/file
 */
typedef struct Logger {
    void (*log)(const char* msg);
} Logger;

void console_log(const char* msg) {
    printf("[CONSOLE]: %s\\n", msg);
}

void file_mock_log(const char* msg) {
    printf("[DISK FILE LOG]: %s\\n", msg);
}

// High-level service depends on abstraction (DIP)
typedef struct OrderService {
    const Logger* logger;
} OrderService;

void checkout(const OrderService* service, int order_id) {
    char buf[64];
    snprintf(buf, sizeof(buf), "Order #%d processed successfully.", order_id);
    service->logger->log(buf);
}

int main() {
    Logger cLog = { console_log };
    Logger fLog = { file_mock_log };

    OrderService s1 = { &cLog };
    checkout(&s1, 1001);

    OrderService s2 = { &fLog }; // Swapped without modifying checkout logic (OCP + DIP)
    checkout(&s2, 1002);
    return 0;
}`,
      cpp: `#include <iostream>
#include <memory>
#include <string>
using namespace std;

// 1. DIP & OCP: Abstract Payment Channel
class IPaymentChannel {
public:
    virtual void sendPayment(double amount) const = 0;
    virtual ~IPaymentChannel() = default;
};

class UPIChannel : public IPaymentChannel {
public:
    void sendPayment(double amount) const override {
        cout << "[UPI] Transferred Rs " << amount << " via Virtual Payment Address." << endl;
    }
};

class NetBankingChannel : public IPaymentChannel {
public:
    void sendPayment(double amount) const override {
        cout << "[NetBanking] Transferred Rs " << amount << " via IMPS/NEFT gateway." << endl;
    }
};

// 2. High-Level Service adhering to SRP & DIP
class PaymentService {
    unique_ptr<IPaymentChannel> channel; // Depends on abstraction, not concrete class
public:
    explicit PaymentService(unique_ptr<IPaymentChannel> ch) : channel(move(ch)) {}
    
    void process(double amount) {
        // Business validation (SRP)
        if (amount <= 0) throw invalid_argument("Amount must be positive.");
        channel->sendPayment(amount);
    }
};

int main() {
    PaymentService service1(make_unique<UPIChannel>());
    service1.process(1500.0);

    PaymentService service2(make_unique<NetBankingChannel>());
    service2.process(50000.0);
    return 0;
}`,
      java: `// ISP: Fine-grained interfaces
interface Workable { void work(); }
interface Feedable { void eat(); }

class HumanWorker implements Workable, Feedable {
    @Override public void work() { System.out.println("Human: Writing code."); }
    @Override public void eat() { System.out.println("Human: Eating lunch."); }
}

// Robots do not eat; ISP avoids forcing Robot to implement empty/throwing eat()
class RobotWorker implements Workable {
    @Override public void work() { System.out.println("Robot: Assembling hardware."); }
}

public class SolidDemo {
    public static void main(String[] args) {
        Workable w1 = new HumanWorker();
        Workable w2 = new RobotWorker();
        w1.work();
        w2.work();
    }
}`,
      python: `from abc import ABC, abstractmethod

# OCP & DIP: Strategy abstraction for Tax Calculation
class TaxStrategy(ABC):
    @abstractmethod
    def calculate_tax(self, amount: float) -> float:
        pass

class IndiaGstStrategy(TaxStrategy):
    def calculate_tax(self, amount: float) -> float:
        return amount * 0.18  # 18% GST

class UsSalesTaxStrategy(TaxStrategy):
    def calculate_tax(self, amount: float) -> float:
        return amount * 0.08  # 8% State Tax

class BillingCalculator:
    """High-level billing engine depending only on TaxStrategy abstraction."""
    def __init__(self, strategy: TaxStrategy) -> None:
        self.strategy = strategy
        
    def generate_bill(self, base_amount: float) -> float:
        tax = self.strategy.calculate_tax(base_amount)
        return base_amount + tax

if __name__ == "__main__":
    b1 = BillingCalculator(IndiaGstStrategy())
    print(f"Total Bill (India): Rs {b1.generate_bill(1000):.2f}")
    
    b2 = BillingCalculator(UsSalesTaxStrategy())
    print(f"Total Bill (US): $ {b2.generate_bill(1000):.2f}")`,
    },
  },
  {
    id: 'd5-note-5',
    title: 'Object Invariants, Exception Hierarchies & Enterprise GoF Patterns',
    conceptSummary:
      'Writing defensive, production-ready OOP systems requires solid error modeling and standard architectural design patterns.\n\n1. Object Invariants:\n   - An invariant is a condition that must ALWAYS hold true for an object throughout its entire lifetime (e.g., `bankBalance >= 0`, `accountNumber != null`).\n   - Enforced by validating in constructors and making all mutating methods private or invariant-checked.\n\n2. Exception Hierarchies:\n   - Checked Exceptions (Java): Subclasses of `Exception` that the compiler requires you to catch or declare in `throws` (e.g., `IOException`, `SQLException`).\n   - Unchecked Exceptions: Subclasses of `RuntimeException` indicating programming bugs (e.g., `NullPointerException`, `IndexOutOfBoundsException`).\n   - In C++, always catch exceptions by `const&` (reference) to avoid Object Slicing where derived exception details get clipped into base exception values.\n\n3. Core GoF Design Patterns for Interviews:\n   - Singleton: Ensures a class has only one instance and provides a global point of access. In multi-threaded environments, requires Double-Checked Locking or Meyer\'s static local initialization in C++.\n   - Factory Method: Defines an interface for creating objects, delegating instantiation to subclasses or specialized creators.\n   - Strategy Pattern: Encapsulates swappable algorithms behind a shared interface, runtime switchable.',
    timeSpaceNote:
      'Singleton Instance Retrieval: O(1) time | Factory Instantiation: O(1) time overhead.',
    kapilMentorTip:
      'The Meyers Singleton in modern C++ is thread-safe by default according to the C++11 standard: `static MySingleton& instance() { static MySingleton inst; return inst; }`. Compilers guarantee that static local variables are initialized safely across concurrent threads without explicit mutex locking!',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>

/*
 * C Singleton Pattern Simulation (Database Connection Handle)
 */
typedef struct DatabaseConnection {
    int connection_id;
    bool is_connected;
} DatabaseConnection;

static DatabaseConnection* global_db_instance = NULL;

DatabaseConnection* get_database_instance() {
    static DatabaseConnection single_instance;
    if (global_db_instance == NULL) {
        single_instance.connection_id = 42;
        single_instance.is_connected = true;
        global_db_instance = &single_instance;
        printf("[Singleton DB] First-time connection pool created (ID: %d)\\n", single_instance.connection_id);
    }
    return global_db_instance;
}

int main() {
    DatabaseConnection* db1 = get_database_instance();
    DatabaseConnection* db2 = get_database_instance();
    printf("db1 ptr: %p | db2 ptr: %p (Identical Singleton Address)\\n", (void*)db1, (void*)db2);
    return 0;
}`,
      cpp: `#include <iostream>
#include <memory>
using namespace std;

// Meyer's Thread-Safe Singleton Pattern (C++11 Guaranteed)
class ConfigurationManager {
private:
    string appEnvironment;
    ConfigurationManager() : appEnvironment("PRODUCTION_SPSU") {
        cout << "ConfigurationManager initialized once." << endl;
    }
public:
    // Delete copy and move semantics to prevent duplicate instances
    ConfigurationManager(const ConfigurationManager&) = delete;
    ConfigurationManager& operator=(const ConfigurationManager&) = delete;

    static ConfigurationManager& getInstance() {
        static ConfigurationManager instance; // Thread-safe local static
        return instance;
    }

    string getEnv() const { return appEnvironment; }
};

int main() {
    ConfigurationManager& c1 = ConfigurationManager::getInstance();
    ConfigurationManager& c2 = ConfigurationManager::getInstance();

    cout << "c1 Addr: " << &c1 << " | c2 Addr: " << &c2 << endl;
    cout << "App Env: " << c1.getEnv() << endl;
    return 0;
}`,
      java: `// Thread-Safe Bill Pugh Singleton Pattern
class CacheRegistry {
    private CacheRegistry() {
        System.out.println("CacheRegistry initialized.");
    }

    private static class SingletonHelper {
        private static final CacheRegistry INSTANCE = new CacheRegistry();
    }

    public static CacheRegistry getInstance() {
        return SingletonHelper.INSTANCE;
    }
}

public class PatternDemo {
    public static void main(String[] args) {
        CacheRegistry r1 = CacheRegistry.getInstance();
        CacheRegistry r2 = CacheRegistry.getInstance();
        System.out.println("r1 == r2? " + (r1 == r2));
    }
}`,
      python: `class SingletonMeta(type):
    """Thread-safe Singleton metaclass."""
    _instances: dict = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class DatabasePool(metaclass=SingletonMeta):
    def __init__(self) -> None:
        self.endpoint = "db.spsu.internal:5432"

if __name__ == "__main__":
    p1 = DatabasePool()
    p2 = DatabasePool()
    print(f"p1 is p2? {p1 is p2} | Endpoint: {p1.endpoint}")`,
    },
  },
];
