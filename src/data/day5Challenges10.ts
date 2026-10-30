import { PracticalChallenge } from '../types';

/**
 * Day 5: 10 Comprehensive Practical Coding Challenges (70% Practical Allocation)
 * Module 5: Object-Oriented Programming (OOP) & SOLID Design
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 * Polyglot implementations: C (C17), C++ (C++20), Java (Java 21), Python (Python 3.12)
 * Fully wired with interactive visualization steps, starter code, solutions & test cases.
 */
export const DAY_5_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  {
    id: 'd5-prob-1',
    day: 5,
    title: 'Polymorphic Payment Gateway & Strategy Fee Engine',
    difficulty: 'Easy',
    moduleTag: 'Module 5: OOP',
    problemStatement:
      'Design an extensible polymorphic payment processor supporting UPI (0% fee), Credit Card (2% fee), and Crypto (1% fee + Rs 10 network fee). Given a transaction amount, invoke the appropriate payment processor polymorphically and output the formatted receipt line.',
    inputFormat: 'A string representing payment method ("UPI", "CARD", "CRYPTO") and an integer transaction amount.',
    outputFormat: 'Print the formatted confirmation string: "<METHOD> Processed: Total Rs <AMOUNT> (Fee: Rs <FEE>)".',
    constraints: [
      'Amount is between 100 and 1,000,000',
      'Must use polymorphic dispatch via abstract class / interface / function pointer',
    ],
    sampleInput: 'CARD 1000',
    sampleOutput: 'CARD Processed: Total Rs 1020 (Fee: Rs 20)',
    kapilIntuition:
      'In interviews, never use a giant switch-case block for payment methods. Use an abstract interface so adding new methods like ApplePay or NetBanking is as simple as creating a new class without modifying existing code (Open-Closed Principle).',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'Parse Input', description: 'Read payment method ("CARD") and base amount (1000).' , variables: {} },
      { step: 2, label: 'Instantiate Strategy', description: 'Polymorphic factory returns CardPaymentProcessor implementing IPaymentProcessor.' , variables: {} },
      { step: 3, label: 'Dynamic Dispatch', description: 'Invoke calculate_fee() via vtable: 2% of 1000 = Rs 20.' , variables: {} },
      { step: 4, label: 'Generate Receipt', description: 'Combine base amount (1000) + fee (20) = Rs 1020 total.' , variables: {} },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char method[16];
    int amount;
    if (scanf("%s %d", method, &amount) == 2) {
        // Implement polymorphic function pointer dispatch
        int fee = 0;
        if (strcmp(method, "UPI") == 0) fee = 0;
        else if (strcmp(method, "CARD") == 0) fee = (amount * 2) / 100;
        else if (strcmp(method, "CRYPTO") == 0) fee = (amount * 1) / 100 + 10;
        printf("%s Processed: Total Rs %d (Fee: Rs %d)\\n", method, amount + fee, fee);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <memory>
#include <string>
using namespace std;

class PaymentProcessor {
public:
    virtual int calculateFee(int amount) const = 0;
    virtual ~PaymentProcessor() = default;
};

class UPIProcessor : public PaymentProcessor {
public:
    int calculateFee(int amount) const override { return 0; }
};

class CardProcessor : public PaymentProcessor {
public:
    int calculateFee(int amount) const override { return (amount * 2) / 100; }
};

class CryptoProcessor : public PaymentProcessor {
public:
    int calculateFee(int amount) const override { return (amount * 1) / 100 + 10; }
};

int main() {
    string method;
    int amount;
    if (cin >> method >> amount) {
        unique_ptr<PaymentProcessor> p;
        if (method == "UPI") p = make_unique<UPIProcessor>();
        else if (method == "CARD") p = make_unique<CardProcessor>();
        else p = make_unique<CryptoProcessor>();

        int fee = p->calculateFee(amount);
        cout << method << " Processed: Total Rs " << (amount + fee) << " (Fee: Rs " << fee << ")" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

interface PaymentProcessor {
    int calculateFee(int amount);
}

class UPIProcessor implements PaymentProcessor {
    public int calculateFee(int amount) { return 0; }
}

class CardProcessor implements PaymentProcessor {
    public int calculateFee(int amount) { return (amount * 2) / 100; }
}

class CryptoProcessor implements PaymentProcessor {
    public int calculateFee(int amount) { return (amount * 1) / 100 + 10; }
}

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String method = sc.next();
            int amount = sc.nextInt();
            PaymentProcessor p;
            if (method.equals("UPI")) p = new UPIProcessor();
            else if (method.equals("CARD")) p = new CardProcessor();
            else p = new CryptoProcessor();

            int fee = p.calculateFee(amount);
            System.out.printf("%s Processed: Total Rs %d (Fee: Rs %d)%n", method, amount + fee, fee);
        }
    }
}`,
      python: `import sys
from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def calculate_fee(self, amount: int) -> int:
        pass

class UPIProcessor(PaymentProcessor):
    def calculate_fee(self, amount: int) -> int:
        return 0

class CardProcessor(PaymentProcessor):
    def calculate_fee(self, amount: int) -> int:
        return (amount * 2) // 100

class CryptoProcessor(PaymentProcessor):
    def calculate_fee(self, amount: int) -> int:
        return (amount * 1) // 100 + 10

def main():
    line = sys.stdin.read().strip()
    if not line:
        return
    parts = line.split()
    method, amount = parts[0], int(parts[1])
    
    registry = {
        "UPI": UPIProcessor(),
        "CARD": CardProcessor(),
        "CRYPTO": CryptoProcessor(),
    }
    processor = registry.get(method, UPIProcessor())
    fee = processor.calculate_fee(amount)
    print(f"{method} Processed: Total Rs {amount + fee} (Fee: Rs {fee})")

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char method[16];
    int amount;
    if (scanf("%s %d", method, &amount) == 2) {
        int fee = 0;
        if (strcmp(method, "UPI") == 0) fee = 0;
        else if (strcmp(method, "CARD") == 0) fee = (amount * 2) / 100;
        else if (strcmp(method, "CRYPTO") == 0) fee = (amount * 1) / 100 + 10;
        printf("%s Processed: Total Rs %d (Fee: Rs %d)\\n", method, amount + fee, fee);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <memory>
#include <string>
using namespace std;

class PaymentProcessor {
public:
    virtual int calculateFee(int amount) const = 0;
    virtual ~PaymentProcessor() = default;
};

class UPIProcessor : public PaymentProcessor {
public:
    int calculateFee(int amount) const override { return 0; }
};

class CardProcessor : public PaymentProcessor {
public:
    int calculateFee(int amount) const override { return (amount * 2) / 100; }
};

class CryptoProcessor : public PaymentProcessor {
public:
    int calculateFee(int amount) const override { return (amount * 1) / 100 + 10; }
};

int main() {
    string method;
    int amount;
    if (cin >> method >> amount) {
        unique_ptr<PaymentProcessor> p;
        if (method == "UPI") p = make_unique<UPIProcessor>();
        else if (method == "CARD") p = make_unique<CardProcessor>();
        else p = make_unique<CryptoProcessor>();

        int fee = p->calculateFee(amount);
        cout << method << " Processed: Total Rs " << (amount + fee) << " (Fee: Rs " << fee << ")" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

interface PaymentProcessor {
    int calculateFee(int amount);
}

class UPIProcessor implements PaymentProcessor {
    public int calculateFee(int amount) { return 0; }
}

class CardProcessor implements PaymentProcessor {
    public int calculateFee(int amount) { return (amount * 2) / 100; }
}

class CryptoProcessor implements PaymentProcessor {
    public int calculateFee(int amount) { return (amount * 1) / 100 + 10; }
}

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String method = sc.next();
            int amount = sc.nextInt();
            PaymentProcessor p;
            if (method.equals("UPI")) p = new UPIProcessor();
            else if (method.equals("CARD")) p = new CardProcessor();
            else p = new CryptoProcessor();

            int fee = p.calculateFee(amount);
            System.out.printf("%s Processed: Total Rs %d (Fee: Rs %d)%n", method, amount + fee, fee);
        }
    }
}`,
      python: `import sys
from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def calculate_fee(self, amount: int) -> int:
        pass

class UPIProcessor(PaymentProcessor):
    def calculate_fee(self, amount: int) -> int:
        return 0

class CardProcessor(PaymentProcessor):
    def calculate_fee(self, amount: int) -> int:
        return (amount * 2) // 100

class CryptoProcessor(PaymentProcessor):
    def calculate_fee(self, amount: int) -> int:
        return (amount * 1) // 100 + 10

def main():
    line = sys.stdin.read().strip()
    if not line:
        return
    parts = line.split()
    method, amount = parts[0], int(parts[1])
    
    registry = {
        "UPI": UPIProcessor(),
        "CARD": CardProcessor(),
        "CRYPTO": CryptoProcessor(),
    }
    processor = registry.get(method, UPIProcessor())
    fee = processor.calculate_fee(amount)
    print(f"{method} Processed: Total Rs {amount + fee} (Fee: Rs {fee})")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd5-tc1',
        input: 'CARD 1000',
        expectedOutput: 'CARD Processed: Total Rs 1020 (Fee: Rs 20)',
        isHidden: false,
        explanation: 'Card adds 2% of 1000 = Rs 20 fee. Total = Rs 1020.',
      },
      {
        id: 'd5-tc2',
        input: 'UPI 5000',
        expectedOutput: 'UPI Processed: Total Rs 5000 (Fee: Rs 0)',
        isHidden: false,
        explanation: 'UPI adds 0% fee. Total = Rs 5000.',
      },
      {
        id: 'd5-tc3',
        input: 'CRYPTO 2000',
        expectedOutput: 'CRYPTO Processed: Total Rs 2030 (Fee: Rs 30)',
        isHidden: true,
        explanation: 'Crypto adds 1% (Rs 20) + network flat fee (Rs 10) = Rs 30 fee. Total = Rs 2030.',
      },
    ],
  },
  {
    id: 'd5-prob-2',
    day: 5,
    title: 'Bank Account Class Hierarchy with Invariant Encapsulation',
    difficulty: 'Easy',
    moduleTag: 'Module 5: OOP',
    problemStatement:
      'Design a secure Bank Account class hierarchy with private balance encapsulation. Implement SavingsAccount (minimum balance Rs 1000) and CurrentAccount (allows overdraft up to Rs 5000, i.e., balance down to -5000). Given an initial balance and a withdrawal amount, execute the withdrawal and print the resulting balance or "REJECTED: INSUFFICIENT_FUNDS".',
    inputFormat: 'Account type ("SAVINGS" or "CURRENT"), initial balance, and withdrawal amount.',
    outputFormat: 'Print "SUCCESS: Balance = <BAL>" or "REJECTED: INSUFFICIENT_FUNDS".',
    constraints: ['Initial balance >= 0', 'Withdrawal amount > 0'],
    sampleInput: 'SAVINGS 5000 3000',
    sampleOutput: 'SUCCESS: Balance = 2000',
    kapilIntuition:
      'Encapsulation is not just about making fields private; it is about preserving domain invariants. A SavingsAccount invariant is balance >= 1000. Never allow external callers to set the balance directly.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'Check Invariant', description: 'Savings requires balance - withdraw >= 1000; Current requires >= -5000.' , variables: {} },
      { step: 2, label: 'Evaluate Withdrawal', description: '5000 - 3000 = 2000 >= 1000 (Invariant satisfied).' , variables: {} },
      { step: 3, label: 'Commit Mutation', description: 'Internal private balance updated from 5000 to 2000.' , variables: {} },
      { step: 4, label: 'Return Status', description: 'Print SUCCESS with remaining balance.' , variables: {} },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char type[16];
    int balance, withdraw;
    if (scanf("%s %d %d", type, &balance, &withdraw) == 3) {
        if (strcmp(type, "SAVINGS") == 0) {
            if (balance - withdraw >= 1000) {
                printf("SUCCESS: Balance = %d\\n", balance - withdraw);
            } else {
                printf("REJECTED: INSUFFICIENT_FUNDS\\n");
            }
        } else {
            if (balance - withdraw >= -5000) {
                printf("SUCCESS: Balance = %d\\n", balance - withdraw);
            } else {
                printf("REJECTED: INSUFFICIENT_FUNDS\\n");
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
protected:
    int balance;
public:
    BankAccount(int b) : balance(b) {}
    virtual bool withdraw(int amount) = 0;
    int getBalance() const { return balance; }
    virtual ~BankAccount() = default;
};

class SavingsAccount : public BankAccount {
public:
    SavingsAccount(int b) : BankAccount(b) {}
    bool withdraw(int amount) override {
        if (balance - amount >= 1000) {
            balance -= amount;
            return true;
        }
        return false;
    }
};

class CurrentAccount : public BankAccount {
public:
    CurrentAccount(int b) : BankAccount(b) {}
    bool withdraw(int amount) override {
        if (balance - amount >= -5000) {
            balance -= amount;
            return true;
        }
        return false;
    }
};

int main() {
    string type;
    int initBal, amt;
    if (cin >> type >> initBal >> amt) {
        unique_ptr<BankAccount> acc;
        if (type == "SAVINGS") acc = make_unique<SavingsAccount>(initBal);
        else acc = make_unique<CurrentAccount>(initBal);

        if (acc->withdraw(amt)) {
            cout << "SUCCESS: Balance = " << acc->getBalance() << endl;
        } else {
            cout << "REJECTED: INSUFFICIENT_FUNDS" << endl;
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

abstract class BankAccount {
    protected int balance;
    public BankAccount(int b) { this.balance = b; }
    public abstract boolean withdraw(int amount);
    public int getBalance() { return balance; }
}

class SavingsAccount extends BankAccount {
    public SavingsAccount(int b) { super(b); }
    public boolean withdraw(int amount) {
        if (balance - amount >= 1000) { balance -= amount; return true; }
        return false;
    }
}

class CurrentAccount extends BankAccount {
    public CurrentAccount(int b) { super(b); }
    public boolean withdraw(int amount) {
        if (balance - amount >= -5000) { balance -= amount; return true; }
        return false;
    }
}

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String type = sc.next();
            int initBal = sc.nextInt();
            int amt = sc.nextInt();
            BankAccount acc = type.equals("SAVINGS") ? new SavingsAccount(initBal) : new CurrentAccount(initBal);
            if (acc.withdraw(amt)) {
                System.out.println("SUCCESS: Balance = " + acc.getBalance());
            } else {
                System.out.println("REJECTED: INSUFFICIENT_FUNDS");
            }
        }
    }
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    if not line: return
    parts = line.split()
    acc_type, bal, withdraw = parts[0], int(parts[1]), int(parts[2])
    
    min_limit = 1000 if acc_type == "SAVINGS" else -5000
    if bal - withdraw >= min_limit:
        print(f"SUCCESS: Balance = {bal - withdraw}")
    else:
        print("REJECTED: INSUFFICIENT_FUNDS")

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char type[16];
    int balance, withdraw;
    if (scanf("%s %d %d", type, &balance, &withdraw) == 3) {
        int min_bal = (strcmp(type, "SAVINGS") == 0) ? 1000 : -5000;
        if (balance - withdraw >= min_bal) {
            printf("SUCCESS: Balance = %d\\n", balance - withdraw);
        } else {
            printf("REJECTED: INSUFFICIENT_FUNDS\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <memory>
#include <string>
using namespace std;

int main() {
    string type;
    int initBal, amt;
    if (cin >> type >> initBal >> amt) {
        int minBal = (type == "SAVINGS") ? 1000 : -5000;
        if (initBal - amt >= minBal) {
            cout << "SUCCESS: Balance = " << (initBal - amt) << endl;
        } else {
            cout << "REJECTED: INSUFFICIENT_FUNDS" << endl;
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String type = sc.next();
            int initBal = sc.nextInt();
            int amt = sc.nextInt();
            int minBal = type.equals("SAVINGS") ? 1000 : -5000;
            if (initBal - amt >= minBal) {
                System.out.println("SUCCESS: Balance = " + (initBal - amt));
            } else {
                System.out.println("REJECTED: INSUFFICIENT_FUNDS");
            }
        }
    }
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    if not line: return
    parts = line.split()
    acc_type, bal, withdraw = parts[0], int(parts[1]), int(parts[2])
    min_limit = 1000 if acc_type == "SAVINGS" else -5000
    if bal - withdraw >= min_limit:
        print(f"SUCCESS: Balance = {bal - withdraw}")
    else:
        print("REJECTED: INSUFFICIENT_FUNDS")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd5-tc4',
        input: 'SAVINGS 5000 3000',
        expectedOutput: 'SUCCESS: Balance = 2000',
        isHidden: false,
        explanation: '5000 - 3000 = 2000 >= 1000 minimum balance for savings.',
      },
      {
        id: 'd5-tc5',
        input: 'SAVINGS 2000 1500',
        expectedOutput: 'REJECTED: INSUFFICIENT_FUNDS',
        isHidden: false,
        explanation: '2000 - 1500 = 500 < 1000 minimum balance requirement.',
      },
      {
        id: 'd5-tc6',
        input: 'CURRENT 1000 4000',
        expectedOutput: 'SUCCESS: Balance = -3000',
        isHidden: true,
        explanation: 'Current accounts allow overdraft down to -5000. -3000 >= -5000.',
      },
    ],
  },
  {
    id: 'd5-prob-3',
    day: 5,
    title: 'Pure Virtual Shape Hierarchy & Area Calculator',
    difficulty: 'Easy',
    moduleTag: 'Module 5: OOP',
    problemStatement:
      'Design an abstract base class Shape with a pure virtual area() method. Implement Rectangle(w, h), Circle(r), and Triangle(b, h). Given a shape specifier and dimensions, compute and print the area rounded to 2 decimal places.',
    inputFormat: 'Shape type ("RECT", "CIRCLE", "TRIANGLE") followed by its dimension(s).',
    outputFormat: 'Print "Area = <VAL>".',
    constraints: ['All dimensions > 0', 'Use pi = 3.14159'],
    sampleInput: 'RECT 4 5',
    sampleOutput: 'Area = 20.00',
    kapilIntuition:
      'Pure virtual functions (`virtual void f() = 0;`) force every concrete derived class to supply its own implementation. You cannot instantiate an abstract class directly.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'Parse Shape Type', description: 'Identify shape tag and allocate corresponding derived instance.' , variables: {} },
      { step: 2, label: 'Virtual Dispatch', description: 'Invoke pure virtual area() method through base Shape pointer.' , variables: {} },
      { step: 3, label: 'Format Output', description: 'Display computed area rounded to 2 decimal places.' , variables: {} },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char type[16];
    if (scanf("%s", type) == 1) {
        if (strcmp(type, "RECT") == 0) {
            double w, h;
            scanf("%lf %lf", &w, &h);
            printf("Area = %.2f\\n", w * h);
        } else if (strcmp(type, "CIRCLE") == 0) {
            double r;
            scanf("%lf", &r);
            printf("Area = %.2f\\n", 3.1415926535 * r * r);
        } else if (strcmp(type, "TRIANGLE") == 0) {
            double b, h;
            scanf("%lf %lf", &b, &h);
            printf("Area = %.2f\\n", 0.5 * b * h);
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <iomanip>
#include <memory>
#include <string>
using namespace std;

class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() const override { return 3.1415926535 * r * r; }
};

class Triangle : public Shape {
    double b, h;
public:
    Triangle(double b, double h) : b(b), h(h) {}
    double area() const override { return 0.5 * b * h; }
};

int main() {
    string type;
    if (cin >> type) {
        unique_ptr<Shape> s;
        if (type == "RECT") { double w, h; cin >> w >> h; s = make_unique<Rectangle>(w, h); }
        else if (type == "CIRCLE") { double r; cin >> r; s = make_unique<Circle>(r); }
        else { double b, h; cin >> b >> h; s = make_unique<Triangle>(b, h); }

        cout << fixed << setprecision(2) << "Area = " << s->area() << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

abstract class Shape {
    public abstract double area();
}

class Rectangle extends Shape {
    double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    public double area() { return w * h; }
}

class Circle extends Shape {
    double r;
    Circle(double r) { this.r = r; }
    public double area() { return Math.PI * r * r; }
}

class Triangle extends Shape {
    double b, h;
    Triangle(double b, double h) { this.b = b; this.h = h; }
    public double area() { return 0.5 * b * h; }
}

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String type = sc.next();
            Shape s;
            if (type.equals("RECT")) s = new Rectangle(sc.nextDouble(), sc.nextDouble());
            else if (type.equals("CIRCLE")) s = new Circle(sc.nextDouble());
            else s = new Triangle(sc.nextDouble(), sc.nextDouble());

            System.out.printf("Area = %.2f%n", s.area());
        }
    }
}`,
      python: `import sys, math

def main():
    parts = sys.stdin.read().strip().split()
    if not parts: return
    t = parts[0]
    if t == "RECT":
        w, h = float(parts[1]), float(parts[2])
        ans = w * h
    elif t == "CIRCLE":
        r = float(parts[1])
        ans = math.pi * r * r
    else:
        b, h = float(parts[1]), float(parts[2])
        ans = 0.5 * b * h
    print(f"Area = {ans:.2f}")

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char type[16];
    if (scanf("%s", type) == 1) {
        if (strcmp(type, "RECT") == 0) {
            double w, h;
            scanf("%lf %lf", &w, &h);
            printf("Area = %.2f\\n", w * h);
        } else if (strcmp(type, "CIRCLE") == 0) {
            double r;
            scanf("%lf", &r);
            printf("Area = %.2f\\n", 3.1415926535 * r * r);
        } else if (strcmp(type, "TRIANGLE") == 0) {
            double b, h;
            scanf("%lf %lf", &b, &h);
            printf("Area = %.2f\\n", 0.5 * b * h);
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <iomanip>
#include <memory>
#include <string>
using namespace std;

int main() {
    string type;
    if (cin >> type) {
        double area = 0.0;
        if (type == "RECT") { double w, h; cin >> w >> h; area = w * h; }
        else if (type == "CIRCLE") { double r; cin >> r; area = 3.1415926535 * r * r; }
        else { double b, h; cin >> b >> h; area = 0.5 * b * h; }
        cout << fixed << setprecision(2) << "Area = " << area << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String type = sc.next();
            double area = 0;
            if (type.equals("RECT")) area = sc.nextDouble() * sc.nextDouble();
            else if (type.equals("CIRCLE")) { double r = sc.nextDouble(); area = Math.PI * r * r; }
            else area = 0.5 * sc.nextDouble() * sc.nextDouble();
            System.out.printf("Area = %.2f%n", area);
        }
    }
}`,
      python: `import sys, math

def main():
    parts = sys.stdin.read().strip().split()
    if not parts: return
    t = parts[0]
    if t == "RECT":
        w, h = float(parts[1]), float(parts[2])
        ans = w * h
    elif t == "CIRCLE":
        r = float(parts[1])
        ans = math.pi * r * r
    else:
        b, h = float(parts[1]), float(parts[2])
        ans = 0.5 * b * h
    print(f"Area = {ans:.2f}")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd5-tc7',
        input: 'RECT 4 5',
        expectedOutput: 'Area = 20.00',
        isHidden: false,
        explanation: 'Area of rectangle 4 * 5 = 20.00.',
      },
      {
        id: 'd5-tc8',
        input: 'CIRCLE 3',
        expectedOutput: 'Area = 28.27',
        isHidden: false,
        explanation: 'Area of circle pi * 3^2 = 28.27.',
      },
      {
        id: 'd5-tc9',
        input: 'TRIANGLE 6 8',
        expectedOutput: 'Area = 24.00',
        isHidden: true,
        explanation: 'Area of triangle 0.5 * 6 * 8 = 24.00.',
      },
    ],
  },
  {
    id: 'd5-prob-4',
    day: 5,
    title: 'Deep Copy vs Shallow Copy Vector Implementation',
    difficulty: 'Medium',
    moduleTag: 'Module 5: OOP',
    problemStatement:
      'Implement a dynamic array structure with an explicit Deep Copy constructor. Given N space-separated elements, create array A, deep-copy A into B, mutate A[0] by doubling it, and print the first element of both A and B to verify that B was completely isolated in memory.',
    inputFormat: 'Integer N followed by N integers.',
    outputFormat: 'Print "A[0] = <VAL> | B[0] = <VAL>".',
    constraints: ['N >= 1', 'Array elements are integers between -1000 and 1000'],
    sampleInput: '3 10 20 30',
    sampleOutput: 'A[0] = 20 | B[0] = 10',
    kapilIntuition:
      'If you do a shallow copy, both objects point to the same heap block. Doubling A[0] would also mutate B[0], and when both destructors run, the program crashes with double free. Deep copy allocates fresh memory.',
    timeComplexity: 'O(N) for deep copy',
    spaceComplexity: 'O(N) for deep copy buffer',
    visualizationSteps: [
      { step: 1, label: 'Allocate A', description: 'Allocate heap array A of size N: [10, 20, 30].' , variables: {} },
      { step: 2, label: 'Deep Copy into B', description: 'Allocate fresh heap array B and copy contents: B = [10, 20, 30].' , variables: {} },
      { step: 3, label: 'Mutate A[0]', description: 'Double A[0] -> A[0] = 20. B[0] remains 10.' , variables: {} },
      { step: 4, label: 'Verify Independence', description: 'Outputs show independent states.' , variables: {} },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    if (scanf("%d", &n) == 1 && n > 0) {
        int* a = (int*)malloc(n * sizeof(int));
        for (int i = 0; i < n; i++) scanf("%d", &a[i]);

        // Deep copy
        int* b = (int*)malloc(n * sizeof(int));
        for (int i = 0; i < n; i++) b[i] = a[i];

        // Mutate A
        a[0] *= 2;
        printf("A[0] = %d | B[0] = %d\\n", a[0], b[0]);

        free(a);
        free(b);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class DeepVector {
    int* data;
    size_t size;
public:
    DeepVector(size_t sz) : size(sz), data(new int[sz]) {}
    DeepVector(const DeepVector& other) : size(other.size), data(new int[other.size]) {
        for (size_t i = 0; i < size; i++) data[i] = other.data[i];
    }
    ~DeepVector() { delete[] data; }
    int& operator[](size_t i) { return data[i]; }
    int operator[](size_t i) const { return data[i]; }
};

int main() {
    int n;
    if (cin >> n && n > 0) {
        DeepVector a(n);
        for (int i = 0; i < n; i++) cin >> a[i];
        DeepVector b = a; // Deep copy constructor
        a[0] *= 2;
        cout << "A[0] = " << a[0] << " | B[0] = " << b[0] << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            int[] a = new int[n];
            for (int i = 0; i < n; i++) a[i] = sc.nextInt();
            int[] b = a.clone(); // Java array clone performs deep copy of primitives
            a[0] *= 2;
            System.out.printf("A[0] = %d | B[0] = %d%n", a[0], b[0]);
        }
    }
}`,
      python: `import sys

def main():
    parts = list(map(int, sys.stdin.read().strip().split()))
    if not parts: return
    n, elems = parts[0], parts[1:]
    a = elems[:n]
    b = a.copy() # Deep copy of primitive ints
    a[0] *= 2
    print(f"A[0] = {a[0]} | B[0] = {b[0]}")

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    if (scanf("%d", &n) == 1 && n > 0) {
        int* a = (int*)malloc(n * sizeof(int));
        for (int i = 0; i < n; i++) scanf("%d", &a[i]);
        int* b = (int*)malloc(n * sizeof(int));
        for (int i = 0; i < n; i++) b[i] = a[i];
        a[0] *= 2;
        printf("A[0] = %d | B[0] = %d\\n", a[0], b[0]);
        free(a);
        free(b);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (cin >> n && n > 0) {
        vector<int> a(n);
        for (int i = 0; i < n; i++) cin >> a[i];
        vector<int> b = a;
        a[0] *= 2;
        cout << "A[0] = " << a[0] << " | B[0] = " << b[0] << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            int[] a = new int[n];
            for (int i = 0; i < n; i++) a[i] = sc.nextInt();
            int[] b = a.clone();
            a[0] *= 2;
            System.out.printf("A[0] = %d | B[0] = %d%n", a[0], b[0]);
        }
    }
}`,
      python: `import sys

def main():
    parts = list(map(int, sys.stdin.read().strip().split()))
    if not parts: return
    n, elems = parts[0], parts[1:]
    a = elems[:n]
    b = a.copy()
    a[0] *= 2
    print(f"A[0] = {a[0]} | B[0] = {b[0]}")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd5-tc10',
        input: '3 10 20 30',
        expectedOutput: 'A[0] = 20 | B[0] = 10',
        isHidden: false,
        explanation: 'A[0] was 10, doubled to 20. B[0] remained 10.',
      },
      {
        id: 'd5-tc11',
        input: '1 50',
        expectedOutput: 'A[0] = 100 | B[0] = 50',
        isHidden: true,
        explanation: 'Single element doubled in A, intact in B.',
      },
    ],
  },
  {
    id: 'd5-prob-5',
    day: 5,
    title: 'The Diamond Problem & Virtual Inheritance Simulation',
    difficulty: 'Medium',
    moduleTag: 'Module 5: OOP',
    problemStatement:
      'Simulate the diamond problem resolution where class D inherits from B and C, both inheriting from base class A with an integer value. In a virtual inheritance scheme, A is instantiated exactly once. Given value x for A, an increment b added by B, and an increment c added by C, print the single unified value in D.',
    inputFormat: 'Three integers: base value x, increment b, and increment c.',
    outputFormat: 'Print "Unified Value = <VAL>".',
    constraints: ['All inputs are integers between -1000 and 1000'],
    sampleInput: '10 5 3',
    sampleOutput: 'Unified Value = 18',
    kapilIntuition:
      'Without virtual inheritance, D would have two separate copies of A (one from B and one from C). Virtual inheritance collapses them into one shared instance: result = x + b + c.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'Virtual Base Initialization', description: 'Base A initialized once with x = 10.' , variables: {} },
      { step: 2, label: 'B Branch Offset', description: 'B adds increment b = 5.' , variables: {} },
      { step: 3, label: 'C Branch Offset', description: 'C adds increment c = 3.' , variables: {} },
      { step: 4, label: 'Consolidated Resolution', description: 'D accesses the single shared A sub-object: 10 + 5 + 3 = 18.' , variables: {} },
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    int x, b, c;
    if (scanf("%d %d %d", &x, &b, &c) == 3) {
        printf("Unified Value = %d\\n", x + b + c);
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

class A {
public:
    int val;
    A(int v = 0) : val(v) {}
};

class B : virtual public A {
public:
    B(int v) : A(v) {}
    void addB(int b) { val += b; }
};

class C : virtual public A {
public:
    C(int v) : A(v) {}
    void addC(int c) { val += c; }
};

class D : public B, public C {
public:
    D(int v, int b, int c) : A(v), B(v), C(v) {
        addB(b);
        addC(c);
    }
};

int main() {
    int x, b, c;
    if (cin >> x >> b >> c) {
        D d(x, b, c);
        cout << "Unified Value = " << d.val << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int x = sc.nextInt();
            int b = sc.nextInt();
            int c = sc.nextInt();
            System.out.println("Unified Value = " + (x + b + c));
        }
    }
}`,
      python: `import sys

class A:
    def __init__(self, val: int) -> None:
        self.val = val

class B(A):
    def add_b(self, b: int) -> None:
        self.val += b

class C(A):
    def add_c(self, c: int) -> None:
        self.val += c

class D(B, C):
    def __init__(self, x: int, b: int, c: int) -> None:
        super().__init__(x)
        self.add_b(b)
        self.add_c(c)

def main():
    parts = list(map(int, sys.stdin.read().strip().split()))
    if len(parts) >= 3:
        d = D(parts[0], parts[1], parts[2])
        print(f"Unified Value = {d.val}")

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    int x, b, c;
    if (scanf("%d %d %d", &x, &b, &c) == 3) {
        printf("Unified Value = %d\\n", x + b + c);
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int x, b, c;
    if (cin >> x >> b >> c) {
        cout << "Unified Value = " << (x + b + c) << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int x = sc.nextInt();
            int b = sc.nextInt();
            int c = sc.nextInt();
            System.out.println("Unified Value = " + (x + b + c));
        }
    }
}`,
      python: `import sys

def main():
    parts = list(map(int, sys.stdin.read().strip().split()))
    if len(parts) >= 3:
        print(f"Unified Value = {parts[0] + parts[1] + parts[2]}")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd5-tc12',
        input: '10 5 3',
        expectedOutput: 'Unified Value = 18',
        isHidden: false,
        explanation: '10 + 5 + 3 = 18.',
      },
      {
        id: 'd5-tc13',
        input: '100 -20 50',
        expectedOutput: 'Unified Value = 130',
        isHidden: true,
        explanation: '100 - 20 + 50 = 130.',
      },
    ],
  },
  {
    id: 'd5-prob-6',
    day: 5,
    title: 'Liskov Substitution Principle (LSP) Refactoring',
    difficulty: 'Medium',
    moduleTag: 'Module 5: OOP',
    problemStatement:
      'Given an array of birds ("SPARROW", "OSTRICH", "PENGUIN", "EAGLE"), classify them according to a proper LSP-compliant hierarchy where only FlyingBirds implement fly(). Print which birds can fly ("FLYING") and which can walk ("WALKING") without violating base contracts.',
    inputFormat: 'An integer N followed by N bird names.',
    outputFormat: 'Print "<NAME>: <CAPABILITY>" on each line.',
    constraints: ['1 <= N <= 20'],
    sampleInput: '4 SPARROW OSTRICH PENGUIN EAGLE',
    sampleOutput: 'SPARROW: FLYING\nOSTRICH: WALKING\nPENGUIN: WALKING\nEAGLE: FLYING',
    kapilIntuition:
      'LSP says if class Bird has fly(), forcing Ostrich to inherit from Bird and throwing an exception in fly() breaks client code. Separate into Bird (base) and FlyingBird (interface/subclass).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'Parse Bird Names', description: 'Read bird tokens.' , variables: {} },
      { step: 2, label: 'Contract Dispatch', description: 'Sparrow/Eagle implement Flyable; Ostrich/Penguin implement Walkable.' , variables: {} },
      { step: 3, label: 'Print Capabilities', description: 'Outputs match behavioral contracts without throwing runtime errors.' , variables: {} },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        for (int i = 0; i < n; i++) {
            char bird[32];
            scanf("%s", bird);
            if (strcmp(bird, "SPARROW") == 0 || strcmp(bird, "EAGLE") == 0) {
                printf("%s: FLYING\\n", bird);
            } else {
                printf("%s: WALKING\\n", bird);
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        for (int i = 0; i < n; i++) {
            string bird;
            cin >> bird;
            if (bird == "SPARROW" || bird == "EAGLE") {
                cout << bird << ": FLYING" << endl;
            } else {
                cout << bird << ": WALKING" << endl;
            }
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            for (int i = 0; i < n; i++) {
                String bird = sc.next();
                if (bird.equals("SPARROW") || bird.equals("EAGLE")) {
                    System.out.println(bird + ": FLYING");
                } else {
                    System.out.println(bird + ": WALKING");
                }
            }
        }
    }
}`,
      python: `import sys

def main():
    parts = sys.stdin.read().strip().split()
    if not parts: return
    n, birds = int(parts[0]), parts[1:]
    for b in birds[:n]:
        cap = "FLYING" if b in ("SPARROW", "EAGLE") else "WALKING"
        print(f"{b}: {cap}")

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        for (int i = 0; i < n; i++) {
            char bird[32];
            scanf("%s", bird);
            if (strcmp(bird, "SPARROW") == 0 || strcmp(bird, "EAGLE") == 0) {
                printf("%s: FLYING\\n", bird);
            } else {
                printf("%s: WALKING\\n", bird);
            }
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        for (int i = 0; i < n; i++) {
            string bird;
            cin >> bird;
            if (bird == "SPARROW" || bird == "EAGLE") {
                cout << bird << ": FLYING" << endl;
            } else {
                cout << bird << ": WALKING" << endl;
            }
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            for (int i = 0; i < n; i++) {
                String bird = sc.next();
                if (bird.equals("SPARROW") || bird.equals("EAGLE")) {
                    System.out.println(bird + ": FLYING");
                } else {
                    System.out.println(bird + ": WALKING");
                }
            }
        }
    }
}`,
      python: `import sys

def main():
    parts = sys.stdin.read().strip().split()
    if not parts: return
    n, birds = int(parts[0]), parts[1:]
    for b in birds[:n]:
        cap = "FLYING" if b in ("SPARROW", "EAGLE") else "WALKING"
        print(f"{b}: {cap}")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd5-tc14',
        input: '4 SPARROW OSTRICH PENGUIN EAGLE',
        expectedOutput: 'SPARROW: FLYING\nOSTRICH: WALKING\nPENGUIN: WALKING\nEAGLE: FLYING',
        isHidden: false,
        explanation: 'Sparrow/Eagle can fly; Ostrich/Penguin walk.',
      },
    ],
  },
  {
    id: 'd5-prob-7',
    day: 5,
    title: 'Thread-Safe Singleton Logger & Audit Registry',
    difficulty: 'Medium',
    moduleTag: 'Module 5: OOP',
    problemStatement:
      'Implement a Singleton Logger that records audit logs. Multiple components log messages to the singleton instance. Given N log entries, simulate sequential logging and print "[LOG <ID>]: <MSG>", followed by "Total Logs: <N>" from the singleton.',
    inputFormat: 'Integer N followed by N log messages (one per line).',
    outputFormat: 'Print each formatted log and the final summary.',
    constraints: ['1 <= N <= 100'],
    sampleInput: '2\nUserLoggedIn\nPaymentSuccess',
    sampleOutput: '[LOG 1]: UserLoggedIn\n[LOG 2]: PaymentSuccess\nTotal Logs: 2',
    kapilIntuition:
      'Singleton pattern ensures a class has only one instance and provides a global point of access. In C++, Meyer\'s Singleton `static Logger& instance()` is thread-safe by default.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    visualizationSteps: [
      { step: 1, label: 'Access Instance', description: 'Retrieve single global instance of Logger.' , variables: {} },
      { step: 2, label: 'Append Logs', description: 'Log messages sequentially, incrementing internal log counter.' , variables: {} },
      { step: 3, label: 'Print Count', description: 'Display internal log counter state.' , variables: {} },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int n;
    if (scanf("%d\\n", &n) == 1) {
        char line[128];
        for (int i = 1; i <= n; i++) {
            if (fgets(line, sizeof(line), stdin)) {
                line[strcspn(line, "\\r\\n")] = 0;
                printf("[LOG %d]: %s\\n", i, line);
            }
        }
        printf("Total Logs: %d\\n", n);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Logger {
    int count = 0;
    Logger() = default;
public:
    Logger(const Logger&) = delete;
    Logger& operator=(const Logger&) = delete;
    static Logger& getInstance() {
        static Logger instance;
        return instance;
    }
    void log(const string& msg) {
        count++;
        cout << "[LOG " << count << "]: " << msg << endl;
    }
    int getCount() const { return count; }
};

int main() {
    int n;
    if (cin >> n) {
        string dummy;
        getline(cin, dummy);
        Logger& logger = Logger::getInstance();
        for (int i = 0; i < n; i++) {
            string msg;
            getline(cin, msg);
            logger.log(msg);
        }
        cout << "Total Logs: " << logger.getCount() << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            sc.nextLine();
            for (int i = 1; i <= n; i++) {
                String msg = sc.nextLine();
                System.out.printf("[LOG %d]: %s%n", i, msg);
            }
            System.out.println("Total Logs: " + n);
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().strip().splitlines()
    if not lines: return
    n = int(lines[0])
    for i in range(1, n + 1):
        if i < len(lines):
            print(f"[LOG {i}]: {lines[i]}")
    print(f"Total Logs: {n}")

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int n;
    if (scanf("%d\\n", &n) == 1) {
        char line[128];
        for (int i = 1; i <= n; i++) {
            if (fgets(line, sizeof(line), stdin)) {
                line[strcspn(line, "\\r\\n")] = 0;
                printf("[LOG %d]: %s\\n", i, line);
            }
        }
        printf("Total Logs: %d\\n", n);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        string dummy;
        getline(cin, dummy);
        for (int i = 1; i <= n; i++) {
            string msg;
            getline(cin, msg);
            cout << "[LOG " << i << "]: " << msg << endl;
        }
        cout << "Total Logs: " << n << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            sc.nextLine();
            for (int i = 1; i <= n; i++) {
                String msg = sc.nextLine();
                System.out.printf("[LOG %d]: %s%n", i, msg);
            }
            System.out.println("Total Logs: " + n);
        }
    }
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().strip().splitlines()
    if not lines: return
    n = int(lines[0])
    for i in range(1, n + 1):
        if i < len(lines):
            print(f"[LOG {i}]: {lines[i]}")
    print(f"Total Logs: {n}")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd5-tc15',
        input: '2\nUserLoggedIn\nPaymentSuccess',
        expectedOutput: '[LOG 1]: UserLoggedIn\n[LOG 2]: PaymentSuccess\nTotal Logs: 2',
        isHidden: false,
        explanation: 'Logged 2 events via singleton logger.',
      },
    ],
  },
  {
    id: 'd5-prob-8',
    day: 5,
    title: 'Notification Dispatcher Factory Method Pattern',
    difficulty: 'Medium',
    moduleTag: 'Module 5: OOP',
    problemStatement:
      'Implement the Factory Method Pattern to dispatch notifications based on channel type ("SMS", "EMAIL", "PUSH"). Given the channel and message content, the factory instantiates the correct notifier to send the message.',
    inputFormat: 'Channel type ("SMS", "EMAIL", "PUSH") and message text.',
    outputFormat: 'Print "[DISPATCH <CHANNEL>]: <MSG>".',
    constraints: ['Message length <= 200'],
    sampleInput: 'SMS Your OTP is 584920',
    sampleOutput: '[DISPATCH SMS]: Your OTP is 584920',
    kapilIntuition:
      'Factory Method decouples client code from the concrete classes being created. Adding WhatsApp notification simply requires registering a new class with the factory.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'Read Channel', description: 'Read "SMS" token from input stream.' , variables: {} },
      { step: 2, label: 'Factory Instantiation', description: 'NotificationFactory creates concrete SmsNotifier instance.' , variables: {} },
      { step: 3, label: 'Dispatch', description: 'Invoke notify(message) on interface.' , variables: {} },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char ch[16], msg[256];
    if (scanf("%s %[^\n]", ch, msg) == 2) {
        printf("[DISPATCH %s]: %s\\n", ch, msg);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string ch, msg;
    if (cin >> ch) {
        getline(cin >> ws, msg);
        cout << "[DISPATCH " << ch << "]: " << msg << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String ch = sc.next();
            String msg = sc.nextLine().trim();
            System.out.printf("[DISPATCH %s]: %s%n", ch, msg);
        }
    }
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    if not line: return
    parts = line.split(maxsplit=1)
    ch, msg = parts[0], parts[1] if len(parts) > 1 else ""
    print(f"[DISPATCH {ch}]: {msg}")

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int main() {
    char ch[16], msg[256];
    if (scanf("%s %[^\n]", ch, msg) == 2) {
        printf("[DISPATCH %s]: %s\\n", ch, msg);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string ch, msg;
    if (cin >> ch) {
        getline(cin >> ws, msg);
        cout << "[DISPATCH " << ch << "]: " << msg << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String ch = sc.next();
            String msg = sc.nextLine().trim();
            System.out.printf("[DISPATCH %s]: %s%n", ch, msg);
        }
    }
}`,
      python: `import sys

def main():
    line = sys.stdin.read().strip()
    if not line: return
    parts = line.split(maxsplit=1)
    ch, msg = parts[0], parts[1] if len(parts) > 1 else ""
    print(f"[DISPATCH {ch}]: {msg}")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd5-tc16',
        input: 'SMS Your OTP is 584920',
        expectedOutput: '[DISPATCH SMS]: Your OTP is 584920',
        isHidden: false,
        explanation: 'SMS notifier factory created.',
      },
      {
        id: 'd5-tc17',
        input: 'EMAIL Offer letter attached',
        expectedOutput: '[DISPATCH EMAIL]: Offer letter attached',
        isHidden: true,
        explanation: 'Email notifier factory created.',
      },
    ],
  },
  {
    id: 'd5-prob-9',
    day: 5,
    title: 'Custom Exception Hierarchy for E-Commerce Orders',
    difficulty: 'Medium',
    moduleTag: 'Module 5: OOP',
    problemStatement:
      'Design a domain exception hierarchy inheriting from a base OrderException: OutOfStockException and PaymentFailedException. Given order details (stock count and payment status "PAID" or "FAILED"), validate and process the order or catch the custom exception and print the error.',
    inputFormat: 'Stock available (integer) and payment status ("PAID" or "FAILED").',
    outputFormat: 'Print "ORDER_SUCCESS" or "CAUGHT_EXCEPTION: <ERROR>".',
    constraints: ['Stock >= 0'],
    sampleInput: '0 PAID',
    sampleOutput: 'CAUGHT_EXCEPTION: OUT_OF_STOCK',
    kapilIntuition:
      'Exceptions represent exceptional failure modes. Always create domain-specific exception hierarchies so callers can handle different business errors cleanly.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    visualizationSteps: [
      { step: 1, label: 'Check Stock', description: 'If stock == 0, raise OutOfStockException.' , variables: {} },
      { step: 2, label: 'Check Payment', description: 'If payment == "FAILED", raise PaymentFailedException.' , variables: {} },
      { step: 3, label: 'Catch and Report', description: 'Catch domain exception and print error message.' , variables: {} },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int stock;
    char payment[16];
    if (scanf("%d %s", &stock, payment) == 2) {
        if (stock <= 0) {
            printf("CAUGHT_EXCEPTION: OUT_OF_STOCK\\n");
        } else if (strcmp(payment, "PAID") != 0) {
            printf("CAUGHT_EXCEPTION: PAYMENT_FAILED\\n");
        } else {
            printf("ORDER_SUCCESS\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

class OrderException : public runtime_error {
public:
    explicit OrderException(const string& msg) : runtime_error(msg) {}
};

class OutOfStockException : public OrderException {
public:
    OutOfStockException() : OrderException("OUT_OF_STOCK") {}
};

class PaymentFailedException : public OrderException {
public:
    PaymentFailedException() : OrderException("PAYMENT_FAILED") {}
};

int main() {
    int stock;
    string payment;
    if (cin >> stock >> payment) {
        try {
            if (stock <= 0) throw OutOfStockException();
            if (payment != "PAID") throw PaymentFailedException();
            cout << "ORDER_SUCCESS" << endl;
        } catch (const OrderException& e) {
            cout << "CAUGHT_EXCEPTION: " << e.what() << endl;
        }
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int stock = sc.nextInt();
            String payment = sc.next();
            if (stock <= 0) {
                System.out.println("CAUGHT_EXCEPTION: OUT_OF_STOCK");
            } else if (!payment.equals("PAID")) {
                System.out.println("CAUGHT_EXCEPTION: PAYMENT_FAILED");
            } else {
                System.out.println("ORDER_SUCCESS");
            }
        }
    }
}`,
      python: `import sys

def main():
    parts = sys.stdin.read().strip().split()
    if len(parts) >= 2:
        stock, payment = int(parts[0]), parts[1]
        if stock <= 0:
            print("CAUGHT_EXCEPTION: OUT_OF_STOCK")
        elif payment != "PAID":
            print("CAUGHT_EXCEPTION: PAYMENT_FAILED")
        else:
            print("ORDER_SUCCESS")

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int stock;
    char payment[16];
    if (scanf("%d %s", &stock, payment) == 2) {
        if (stock <= 0) {
            printf("CAUGHT_EXCEPTION: OUT_OF_STOCK\\n");
        } else if (strcmp(payment, "PAID") != 0) {
            printf("CAUGHT_EXCEPTION: PAYMENT_FAILED\\n");
        } else {
            printf("ORDER_SUCCESS\\n");
        }
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int stock;
    string payment;
    if (cin >> stock >> payment) {
        if (stock <= 0) cout << "CAUGHT_EXCEPTION: OUT_OF_STOCK" << endl;
        else if (payment != "PAID") cout << "CAUGHT_EXCEPTION: PAYMENT_FAILED" << endl;
        else cout << "ORDER_SUCCESS" << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int stock = sc.nextInt();
            String payment = sc.next();
            if (stock <= 0) System.out.println("CAUGHT_EXCEPTION: OUT_OF_STOCK");
            else if (!payment.equals("PAID")) System.out.println("CAUGHT_EXCEPTION: PAYMENT_FAILED");
            else System.out.println("ORDER_SUCCESS");
        }
    }
}`,
      python: `import sys

def main():
    parts = sys.stdin.read().strip().split()
    if len(parts) >= 2:
        stock, payment = int(parts[0]), parts[1]
        if stock <= 0:
            print("CAUGHT_EXCEPTION: OUT_OF_STOCK")
        elif payment != "PAID":
            print("CAUGHT_EXCEPTION: PAYMENT_FAILED")
        else:
            print("ORDER_SUCCESS")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd5-tc18',
        input: '0 PAID',
        expectedOutput: 'CAUGHT_EXCEPTION: OUT_OF_STOCK',
        isHidden: false,
        explanation: 'Stock is 0, OutOfStockException raised.',
      },
      {
        id: 'd5-tc19',
        input: '5 FAILED',
        expectedOutput: 'CAUGHT_EXCEPTION: PAYMENT_FAILED',
        isHidden: false,
        explanation: 'Payment failed, PaymentFailedException raised.',
      },
      {
        id: 'd5-tc20',
        input: '10 PAID',
        expectedOutput: 'ORDER_SUCCESS',
        isHidden: true,
        explanation: 'Both valid, order placed.',
      },
    ],
  },
  {
    id: 'd5-prob-10',
    day: 5,
    title: 'Extensible Expression Evaluator via Composite Pattern',
    difficulty: 'Hard',
    moduleTag: 'Module 5: OOP',
    problemStatement:
      'Design an extensible expression tree evaluator using the Composite Design Pattern. A component can be a Number (leaf node) or an OperationNode (composite node having left and right sub-expressions and an operator "+", "-", "*"). Given an expression in postfix format, construct the composite expression tree, evaluate it polymorphically, and print the result.',
    inputFormat: 'A space-separated postfix expression of single-digit integers and operators ("+", "-", "*").',
    outputFormat: 'Print "Evaluated Result = <VAL>".',
    constraints: ['Expression length <= 30', 'Valid postfix expression without division by zero'],
    sampleInput: '3 4 + 2 *',
    sampleOutput: 'Evaluated Result = 14',
    kapilIntuition:
      'The Composite pattern treats individual leaf objects (Number) and compositions of objects (OperationNode) uniformly through a shared Expression component interface. Evaluation is a simple recursive polymorphic call.',
    timeComplexity: 'O(N) where N is number of tokens',
    spaceComplexity: 'O(N) for tree nodes in heap',
    visualizationSteps: [
      { step: 1, label: 'Parse 3 and 4', description: 'Push Number(3) and Number(4) onto stack.' , variables: {} },
      { step: 2, label: 'Build Addition Node', description: 'Pop 4 and 3, create OperationNode("+", 3, 4).' , variables: {} },
      { step: 3, label: 'Parse 2 and *', description: 'Create OperationNode("*", (3+4), 2).' , variables: {} },
      { step: 4, label: 'Evaluate Root', description: 'Root evaluates left (7) * right (2) = 14.' , variables: {} },
    ],
    starterCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int main() {
    char token[16];
    int stack[64], top = -1;
    while (scanf("%s", token) == 1) {
        if (isdigit(token[0]) || (token[0] == '-' && isdigit(token[1]))) {
            stack[++top] = atoi(token);
        } else {
            int right = stack[top--];
            int left = stack[top--];
            if (token[0] == '+') stack[++top] = left + right;
            else if (token[0] == '-') stack[++top] = left - right;
            else if (token[0] == '*') stack[++top] = left * right;
        }
    }
    if (top >= 0) printf("Evaluated Result = %d\\n", stack[top]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <memory>
#include <stack>
#include <string>
#include <sstream>
using namespace std;

class Expression {
public:
    virtual int evaluate() const = 0;
    virtual ~Expression() = default;
};

class NumberNode : public Expression {
    int val;
public:
    NumberNode(int v) : val(v) {}
    int evaluate() const override { return val; }
};

class OperationNode : public Expression {
    char op;
    unique_ptr<Expression> left, right;
public:
    OperationNode(char o, unique_ptr<Expression> l, unique_ptr<Expression> r)
        : op(o), left(move(l)), right(move(r)) {}
    int evaluate() const override {
        int l = left->evaluate();
        int r = right->evaluate();
        if (op == '+') return l + r;
        if (op == '-') return l - r;
        return l * r;
    }
};

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        string token;
        stack<unique_ptr<Expression>> st;
        while (ss >> token) {
            if (token == "+" || token == "-" || token == "*") {
                auto r = move(st.top()); st.pop();
                auto l = move(st.top()); st.pop();
                st.push(make_unique<OperationNode>(token[0], move(l), move(r)));
            } else {
                st.push(make_unique<NumberNode>(stoi(token)));
            }
        }
        if (!st.empty()) {
            cout << "Evaluated Result = " << st.top()->evaluate() << endl;
        }
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] tokens = sc.nextLine().trim().split("\\\\s+");
            Deque<Integer> stack = new ArrayDeque<>();
            for (String t : tokens) {
                if (t.equals("+") || t.equals("-") || t.equals("*")) {
                    int r = stack.pop();
                    int l = stack.pop();
                    if (t.equals("+")) stack.push(l + r);
                    else if (t.equals("-")) stack.push(l - r);
                    else stack.push(l * r);
                } else if (!t.isEmpty()) {
                    stack.push(Integer.parseInt(t));
                }
            }
            if (!stack.isEmpty()) System.out.println("Evaluated Result = " + stack.pop());
        }
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().strip().split()
    if not tokens: return
    stack = []
    for t in tokens:
        if t in ("+", "-", "*"):
            r = stack.pop()
            l = stack.pop()
            if t == "+": stack.append(l + r)
            elif t == "-": stack.append(l - r)
            else: stack.append(l * r)
        else:
            stack.append(int(t))
    if stack:
        print(f"Evaluated Result = {stack.pop()}")

if __name__ == "__main__":
    main()`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

int main() {
    char token[16];
    int stack[64], top = -1;
    while (scanf("%s", token) == 1) {
        if (isdigit(token[0]) || (token[0] == '-' && isdigit(token[1]))) {
            stack[++top] = atoi(token);
        } else {
            int right = stack[top--];
            int left = stack[top--];
            if (token[0] == '+') stack[++top] = left + right;
            else if (token[0] == '-') stack[++top] = left - right;
            else if (token[0] == '*') stack[++top] = left * right;
        }
    }
    if (top >= 0) printf("Evaluated Result = %d\\n", stack[top]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <sstream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        string token;
        stack<int> st;
        while (ss >> token) {
            if (token == "+" || token == "-" || token == "*") {
                int r = st.top(); st.pop();
                int l = st.top(); st.pop();
                if (token == "+") st.push(l + r);
                else if (token == "-") st.push(l - r);
                else st.push(l * r);
            } else {
                st.push(stoi(token));
            }
        }
        if (!st.empty()) cout << "Evaluated Result = " << st.top() << endl;
    }
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] tokens = sc.nextLine().trim().split("\\\\s+");
            Deque<Integer> stack = new ArrayDeque<>();
            for (String t : tokens) {
                if (t.equals("+") || t.equals("-") || t.equals("*")) {
                    int r = stack.pop();
                    int l = stack.pop();
                    if (t.equals("+")) stack.push(l + r);
                    else if (t.equals("-")) stack.push(l - r);
                    else stack.push(l * r);
                } else if (!t.isEmpty()) {
                    stack.push(Integer.parseInt(t));
                }
            }
            if (!stack.isEmpty()) System.out.println("Evaluated Result = " + stack.pop());
        }
    }
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().strip().split()
    if not tokens: return
    stack = []
    for t in tokens:
        if t in ("+", "-", "*"):
            r = stack.pop()
            l = stack.pop()
            if t == "+": stack.append(l + r)
            elif t == "-": stack.append(l - r)
            else: stack.append(l * r)
        else:
            stack.append(int(t))
    if stack:
        print(f"Evaluated Result = {stack.pop()}")

if __name__ == "__main__":
    main()`,
    },
    testCases: [
      {
        id: 'd5-tc21',
        input: '3 4 + 2 *',
        expectedOutput: 'Evaluated Result = 14',
        isHidden: false,
        explanation: '(3 + 4) * 2 = 14.',
      },
      {
        id: 'd5-tc22',
        input: '5 1 2 + 4 * + 3 -',
        expectedOutput: 'Evaluated Result = 14',
        isHidden: true,
        explanation: '5 + ((1 + 2) * 4) - 3 = 5 + 12 - 3 = 14.',
      },
    ],
  },
];
