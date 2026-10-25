import { MiniProject } from '../types';

/**
 * Day 1 Capstone Mini-Project: Educational Calculator & Fundamental System Inspector
 * Source: Educational C Program using ONLY <stdio.h> without additional header files.
 * Covers:
 *  - ALL Fundamental Numeric & Character Data Types (char, short, int, unsigned int, long, long long, float, double, long double, _Bool)
 *  - ALL Conditional Control Structures (if-else, nested if, switch-case, ternary operator)
 *  - ALL Loop Constructs (for, while, do-while)
 *  - Input Validation & Stream Flushing (getchar discard loop)
 *  - Iterative Power Calculation without math.h pow()
 *  - Division-by-Zero and Modulus-by-Zero Edge-Case Handling
 */
export const DAY_1_MINI_PROJECT: MiniProject = {
  id: 'day1-mini-project-calculator',
  day: 1,
  title: 'C Calculator & Fundamental System Inspector — Zero Additional Headers',
  subtitle: 'Full Capstone: All 10 Data Types, Conditionals (if-else, switch), All Loops (for, while, do-while)',
  description:
    'An end-to-end educational command-line application built using strictly the standard <stdio.h> header file without additional headers such as <stdlib.h>, <string.h>, <errno.h>, <limits.h>, <math.h>, or <ctype.h>. It demonstrates all core numeric data types, input stream validation, division/modulus guards, iterative power computation without pow(), and menu routing.',
  features: [
    'Strict Header Constraint: Uses only standard <stdio.h> — zero external math or string libraries.',
    'All Major Fundamental Data Types: char, short, int, unsigned int, long, long long, float, double, long double, and _Bool.',
    'All Conditional Structures: Multi-way if-else cascades, nested conditionals, switch-case, and ternary operators.',
    'All Three Loop Types: for loop for menu generation & power iteration, while loop for input stream validation, and do-while for session execution.',
    'Robust Edge-Case Validation: Division by zero (f2 == 0.0f), Modulus by zero (b == 0), and negative exponent zero (f1 == 0.0f && exp < 0).',
    'Iterative Power Engine: Computes positive and negative exponents via loop accumulation without powl() or pow().',
    'Interactive Data Types Demonstration: Scans and prints all 10 types with exact format specifiers (%c, %hd, %d, %u, %ld, %lld, %f, %lf, %Lf).',
  ],
  conceptsCovered: {
    dataTypes: [
      'char (%c, 1 byte ASCII)',
      'short int (%hd, 2 bytes signed)',
      'int (%d, 4 bytes signed)',
      'unsigned int (%u, 4 bytes non-negative)',
      'long int (%ld, 4 or 8 bytes architecture-dependent)',
      'long long int (%lld, guaranteed 8 bytes 64-bit)',
      'float (%f, 4 bytes single-precision IEEE 754)',
      'double (%lf, 8 bytes double-precision IEEE 754)',
      'long double (%Lf, 8, 12, or 16 bytes extended precision)',
      '_Bool (1 byte C99 Boolean flag: 0 or 1)',
    ],
    conditionals: [
      'if-else cascades for range checking (choice < 1 || choice > 8)',
      'switch-case statement for menu display and operation dispatch',
      'Nested if-else for denominator zero guards (b == 0, f2 == 0.0f)',
      'Ternary conditional operator: (exponent < 0 ? -exponent : exponent)',
    ],
    loops: [
      'for loop: 1 to 8 menu iteration, and exponent multiplication iteration',
      'while loop: non-integer input rejection and character buffer flushing via getchar() != \'\\n\'',
      'do-while loop: outer program persistence until user selects repeat == 0',
    ],
    constraints: [
      'Only #include <stdio.h> allowed',
      'No pow() or powl() from <math.h>',
      'No exit() or system() from <stdlib.h>',
      'No string manipulation from <string.h>',
    ],
  },
  complexity: {
    basicOperations: 'O(1) Constant Time (Addition, Subtraction, Multiplication, Division, Modulus)',
    powerCalculation: 'O(|exponent|) Iterative Multiplication Loop',
    menuDisplay: 'O(1) Fixed 8-item iteration',
    auxiliarySpace: 'O(1) Strictly Stack-allocated primitive variables',
  },
  educationalNotes: [
    {
      number: 1,
      title: 'Only One Header File (#include <stdio.h>)',
      details:
        'This provides the standard input/output functions used in the program, including printf(), scanf(), and getchar(). Avoiding <stdlib.h>, <math.h>, and <string.h> forces developers to understand how loops replace library math functions like pow() and how input streams must be cleared manually using getchar() rather than relying on high-level string sanitizers.',
    },
    {
      number: 2,
      title: 'Iterative Power Calculation Without pow()',
      details:
        'The power operation uses a for loop rather than pow() or powl(). This is ideal for teaching iteration: it tracks positive exponents, handles negative exponents by computing the absolute power then inverting with `1.0f / power`, and guards against undefined math: `0^negative` is caught with `if (f1 == 0.0f && exponent < 0)` before execution.',
    },
    {
      number: 3,
      title: 'Complete Data Types & Format Specifier Spectrum',
      details:
        'The program explicitly demonstrates char (%c), short (%hd), int (%d), unsigned int (%u), long (%ld), long long (%lld), float (%f), double (%lf), long double (%Lf), and C99 _Bool. Each type is declared, scanned with runtime keyboard input, and verified via output.',
    },
    {
      number: 4,
      title: 'Input Stream Validation & Buffer Flushing',
      details:
        'When scanf("%d", &choice) encounters non-numeric input (such as an alphabet or symbol), it returns 0 and leaves the invalid characters in standard input buffer stdin. The while (getchar() != \'\\n\') loop actively drains the buffer until a newline is found, preventing infinite loops and input corruption.',
    },
    {
      number: 5,
      title: 'Algorithmic Complexity & Hardware Footprint',
      details:
        'All arithmetic operations execute in O(1) clock cycles. The power loop runs in O(|exponent|) operations. The menu loop runs in O(1) fixed steps. The auxiliary space is strictly O(1), operating with zero dynamic heap allocation (malloc/free), preserving stack hygiene in embedded and resource-constrained environments.',
    },
  ],
  codeByLanguage: {
    c: `#include <stdio.h>

int main()
{
    /* Variable declarations */
    int choice, repeat, i;
    int a, b, result;
    char symbol;
    float f1, f2;
    double d1, d2;
    long double ld1, ld2;
    short s1;
    long l1;
    long long ll1;
    unsigned int u1;
    _Bool valid;

    do
    {
        printf("\\n========== C CALCULATOR ==========\\n");

        /* FOR LOOP: Display menu */
        for (i = 1; i <= 8; i++)
        {
            switch (i)
            {
                case 1: printf("1. Addition\\n"); break;
                case 2: printf("2. Subtraction\\n"); break;
                case 3: printf("3. Multiplication\\n"); break;
                case 4: printf("4. Division\\n"); break;
                case 5: printf("5. Modulus\\n"); break;
                case 6: printf("6. Power\\n"); break;
                case 7: printf("7. Data Types Demo\\n"); break;
                case 8: printf("8. Exit\\n"); break;
            }
        }

        printf("Enter your choice: ");

        /* WHILE LOOP: Validate menu choice */
        while (scanf("%d", &choice) != 1)
        {
            printf("Invalid input. Enter an integer: ");
            /* Consume the invalid input line */
            while (getchar() != '\\n')
            {
                /* Discard characters */
            }
        }

        if (choice < 1 || choice > 8)
        {
            printf("Invalid menu choice!\\n");
            repeat = 1;
            continue;
        }
        else if (choice == 8)
        {
            printf("Thank you for using the calculator!\\n");
            break;
        }
        else if (choice == 7)
        {
            /* Demonstrate fundamental data types */
            printf("\\n--- DATA TYPES DEMONSTRATION ---\\n");

            printf("Enter a character: ");
            scanf(" %c", &symbol);
            printf("Character: %c\\n", symbol);

            printf("Enter a short integer: ");
            scanf("%hd", &s1);
            printf("Short: %hd\\n", s1);

            printf("Enter an integer: ");
            scanf("%d", &a);
            printf("Integer: %d\\n", a);

            printf("Enter an unsigned integer: ");
            scanf("%u", &u1);
            printf("Unsigned integer: %u\\n", u1);

            printf("Enter a long integer: ");
            scanf("%ld", &l1);
            printf("Long: %ld\\n", l1);

            printf("Enter a long long integer: ");
            scanf("%lld", &ll1);
            printf("Long long: %lld\\n", ll1);

            printf("Enter a float: ");
            scanf("%f", &f1);
            printf("Float: %f\\n", f1);

            printf("Enter a double: ");
            scanf("%lf", &d1);
            printf("Double: %lf\\n", d1);

            printf("Enter a long double: ");
            scanf("%Lf", &ld1);
            printf("Long double: %Lf\\n", ld1);

            valid = 1;
        }
        else
        {
            valid = 1;
            if (choice == 5)
            {
                printf("Enter two integers: ");
                scanf("%d %d", &a, &b);

                if (b == 0)
                {
                    printf("Error: Modulus by zero!\\n");
                    valid = 0;
                }
                else
                {
                    printf("Result = %d\\n", a % b);
                }
            }
            else
            {
                printf("Enter two numbers: ");
                scanf("%f %f", &f1, &f2);

                switch (choice)
                {
                    case 1:
                        printf("Result = %f\\n", f1 + f2);
                        break;
                    case 2:
                        printf("Result = %f\\n", f1 - f2);
                        break;
                    case 3:
                        printf("Result = %f\\n", f1 * f2);
                        break;
                    case 4:
                        if (f2 == 0.0f)
                        {
                            printf("Error: Division by zero!\\n");
                            valid = 0;
                        }
                        else
                        {
                            printf("Result = %f\\n", f1 / f2);
                        }
                        break;
                    case 6:
                    {
                        int exponent, j;
                        float power = 1.0f;

                        printf("Enter an integer exponent: ");
                        scanf("%d", &exponent);

                        if (f1 == 0.0f && exponent < 0)
                        {
                            printf("Error: Zero cannot have a negative exponent!\\n");
                            valid = 0;
                        }
                        else
                        {
                            for (j = 0; j < (exponent < 0 ? -exponent : exponent); j++)
                            {
                                power *= f1;
                            }
                            if (exponent < 0)
                            {
                                power = 1.0f / power;
                            }
                            printf("Result = %f\\n", power);
                        }
                        break;
                    }
                    default:
                        printf("Unsupported operation!\\n");
                        valid = 0;
                }
            }
        }

        /* WHILE LOOP: Validate repeat choice */
        while (1)
        {
            printf("\\nCalculate again? (1 = Yes, 0 = No): ");
            if (scanf("%d", &repeat) == 1 && (repeat == 0 || repeat == 1))
            {
                break;
            }
            printf("Please enter 1 or 0.\\n");
            while (getchar() != '\\n')
            {
                /* Discard invalid input */
            }
        }

        if (valid)
        {
            printf("Operation completed.\\n");
        }
        else
        {
            printf("Operation could not be completed.\\n");
        }

    } while (repeat == 1);

    return 0;
}`,
    cpp: `// C++ Equivalent: Zero External Headers (Only <iostream>)
#include <iostream>

int main()
{
    int choice, repeat, i;
    int a, b;
    char symbol;
    float f1, f2;
    double d1;
    long double ld1;
    short s1;
    long l1;
    long long ll1;
    unsigned int u1;
    bool valid;

    do
    {
        std::cout << "\\n========== C++ CALCULATOR ==========\\n";

        // FOR LOOP: Display menu
        for (i = 1; i <= 8; i++)
        {
            switch (i)
            {
                case 1: std::cout << "1. Addition\\n"; break;
                case 2: std::cout << "2. Subtraction\\n"; break;
                case 3: std::cout << "3. Multiplication\\n"; break;
                case 4: std::cout << "4. Division\\n"; break;
                case 5: std::cout << "5. Modulus\\n"; break;
                case 6: std::cout << "6. Power\\n"; break;
                case 7: std::cout << "7. Data Types Demo\\n"; break;
                case 8: std::cout << "8. Exit\\n"; break;
            }
        }

        std::cout << "Enter your choice: ";
        while (!(std::cin >> choice))
        {
            std::cout << "Invalid input. Enter an integer: ";
            std::cin.clear();
            while (std::cin.get() != '\\n') {}
        }

        if (choice < 1 || choice > 8)
        {
            std::cout << "Invalid menu choice!\\n";
            repeat = 1;
            continue;
        }
        else if (choice == 8)
        {
            std::cout << "Thank you for using the calculator!\\n";
            break;
        }
        else if (choice == 7)
        {
            std::cout << "\\n--- DATA TYPES DEMONSTRATION ---\\n";
            std::cout << "Enter a character: "; std::cin >> symbol;
            std::cout << "Character: " << symbol << "\\n";

            std::cout << "Enter a short integer: "; std::cin >> s1;
            std::cout << "Short: " << s1 << "\\n";

            std::cout << "Enter an integer: "; std::cin >> a;
            std::cout << "Integer: " << a << "\\n";

            std::cout << "Enter an unsigned integer: "; std::cin >> u1;
            std::cout << "Unsigned: " << u1 << "\\n";

            std::cout << "Enter a long integer: "; std::cin >> l1;
            std::cout << "Long: " << l1 << "\\n";

            std::cout << "Enter a long long integer: "; std::cin >> ll1;
            std::cout << "Long long: " << ll1 << "\\n";

            std::cout << "Enter a float: "; std::cin >> f1;
            std::cout << "Float: " << f1 << "\\n";

            std::cout << "Enter a double: "; std::cin >> d1;
            std::cout << "Double: " << d1 << "\\n";

            std::cout << "Enter a long double: "; std::cin >> ld1;
            std::cout << "Long double: " << ld1 << "\\n";

            valid = true;
        }
        else
        {
            valid = true;
            if (choice == 5)
            {
                std::cout << "Enter two integers: ";
                std::cin >> a >> b;
                if (b == 0)
                {
                    std::cout << "Error: Modulus by zero!\\n";
                    valid = false;
                }
                else
                {
                    std::cout << "Result = " << (a % b) << "\\n";
                }
            }
            else
            {
                std::cout << "Enter two numbers: ";
                std::cin >> f1 >> f2;

                switch (choice)
                {
                    case 1: std::cout << "Result = " << (f1 + f2) << "\\n"; break;
                    case 2: std::cout << "Result = " << (f1 - f2) << "\\n"; break;
                    case 3: std::cout << "Result = " << (f1 * f2) << "\\n"; break;
                    case 4:
                        if (f2 == 0.0f)
                        {
                            std::cout << "Error: Division by zero!\\n";
                            valid = false;
                        }
                        else
                        {
                            std::cout << "Result = " << (f1 / f2) << "\\n";
                        }
                        break;
                    case 6:
                    {
                        int exponent;
                        float power = 1.0f;
                        std::cout << "Enter an integer exponent: ";
                        std::cin >> exponent;

                        if (f1 == 0.0f && exponent < 0)
                        {
                            std::cout << "Error: Zero cannot have a negative exponent!\\n";
                            valid = false;
                        }
                        else
                        {
                            int absExp = exponent < 0 ? -exponent : exponent;
                            for (int j = 0; j < absExp; j++)
                            {
                                power *= f1;
                            }
                            if (exponent < 0)
                            {
                                power = 1.0f / power;
                            }
                            std::cout << "Result = " << power << "\\n";
                        }
                        break;
                    }
                    default:
                        std::cout << "Unsupported operation!\\n";
                        valid = false;
                }
            }
        }

        while (true)
        {
            std::cout << "\\nCalculate again? (1 = Yes, 0 = No): ";
            if (std::cin >> repeat && (repeat == 0 || repeat == 1))
            {
                break;
            }
            std::cout << "Please enter 1 or 0.\\n";
            std::cin.clear();
            while (std::cin.get() != '\\n') {}
        }

        if (valid)
            std::cout << "Operation completed.\\n";
        else
            std::cout << "Operation could not be completed.\\n";

    } while (repeat == 1);

    return 0;
}`,
    java: `// Java Equivalent: Data Types, Loops & Conditionals Mini-Project
import java.util.Scanner;

public class EducationalCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int choice, repeat = 0;
        boolean valid;

        do {
            System.out.println("\\n========== JAVA CALCULATOR ==========");

            // FOR LOOP: Display menu
            for (int i = 1; i <= 8; i++) {
                switch (i) {
                    case 1: System.out.println("1. Addition"); break;
                    case 2: System.out.println("2. Subtraction"); break;
                    case 3: System.out.println("3. Multiplication"); break;
                    case 4: System.out.println("4. Division"); break;
                    case 5: System.out.println("5. Modulus"); break;
                    case 6: System.out.println("6. Power"); break;
                    case 7: System.out.println("7. Data Types Demo"); break;
                    case 8: System.out.println("8. Exit"); break;
                }
            }

            System.out.print("Enter your choice: ");
            while (!scanner.hasNextInt()) {
                System.out.print("Invalid input. Enter an integer: ");
                scanner.next();
            }
            choice = scanner.nextInt();

            if (choice < 1 || choice > 8) {
                System.out.println("Invalid menu choice!");
                repeat = 1;
                continue;
            } else if (choice == 8) {
                System.out.println("Thank you for using the calculator!");
                break;
            } else if (choice == 7) {
                System.out.println("\\n--- DATA TYPES DEMONSTRATION ---");
                System.out.print("Enter a character: ");
                char symbol = scanner.next().charAt(0);
                System.out.println("Character: " + symbol);

                System.out.print("Enter a byte: ");
                byte bVal = scanner.nextByte();
                System.out.println("Byte: " + bVal);

                System.out.print("Enter a short integer: ");
                short s1 = scanner.nextShort();
                System.out.println("Short: " + s1);

                System.out.print("Enter an integer: ");
                int aVal = scanner.nextInt();
                System.out.println("Integer: " + aVal);

                System.out.print("Enter a long integer: ");
                long l1 = scanner.nextLong();
                System.out.println("Long: " + l1);

                System.out.print("Enter a float: ");
                float f1 = scanner.nextFloat();
                System.out.println("Float: " + f1);

                System.out.print("Enter a double: ");
                double d1 = scanner.nextDouble();
                System.out.println("Double: " + d1);

                System.out.print("Enter a boolean (true/false): ");
                boolean boolVal = scanner.nextBoolean();
                System.out.println("Boolean: " + boolVal);

                valid = true;
            } else {
                valid = true;
                if (choice == 5) {
                    System.out.print("Enter two integers: ");
                    int a = scanner.nextInt();
                    int b = scanner.nextInt();

                    if (b == 0) {
                        System.out.println("Error: Modulus by zero!");
                        valid = false;
                    } else {
                        System.out.println("Result = " + (a % b));
                    }
                } else {
                    System.out.print("Enter two numbers: ");
                    float f1 = scanner.nextFloat();
                    float f2 = scanner.nextFloat();

                    switch (choice) {
                        case 1: System.out.println("Result = " + (f1 + f2)); break;
                        case 2: System.out.println("Result = " + (f1 - f2)); break;
                        case 3: System.out.println("Result = " + (f1 * f2)); break;
                        case 4:
                            if (f2 == 0.0f) {
                                System.out.println("Error: Division by zero!");
                                valid = false;
                            } else {
                                System.out.println("Result = " + (f1 / f2));
                            }
                            break;
                        case 6: {
                            System.out.print("Enter an integer exponent: ");
                            int exponent = scanner.nextInt();

                            if (f1 == 0.0f && exponent < 0) {
                                System.out.println("Error: Zero cannot have a negative exponent!");
                                valid = false;
                            } else {
                                float power = 1.0f;
                                int absExp = exponent < 0 ? -exponent : exponent;
                                for (int j = 0; j < absExp; j++) {
                                    power *= f1;
                                }
                                if (exponent < 0) {
                                    power = 1.0f / power;
                                }
                                System.out.println("Result = " + power);
                            }
                            break;
                        }
                        default:
                            System.out.println("Unsupported operation!");
                            valid = false;
                    }
                }
            }

            while (true) {
                System.out.print("\\nCalculate again? (1 = Yes, 0 = No): ");
                if (scanner.hasNextInt()) {
                    repeat = scanner.nextInt();
                    if (repeat == 0 || repeat == 1) break;
                } else {
                    scanner.next();
                }
                System.out.println("Please enter 1 or 0.");
            }

            if (valid)
                System.out.println("Operation completed.");
            else
                System.out.println("Operation could not be completed.");

        } while (repeat == 1);

        scanner.close();
    }
}`,
    python: `# Python Equivalent: Data Types, Conditionals & Loops Mini-Project
def run_calculator():
    repeat = 1

    while repeat == 1:
        print("\\n========== PYTHON CALCULATOR ==========")

        # FOR LOOP: Display menu
        menu_items = [
            "1. Addition", "2. Subtraction", "3. Multiplication",
            "4. Division", "5. Modulus", "6. Power",
            "7. Data Types Demo", "8. Exit"
        ]
        for item in menu_items:
            print(item)

        # WHILE LOOP: Validate menu choice
        while True:
            raw_choice = input("Enter your choice: ")
            try:
                choice = int(raw_choice)
                break
            except ValueError:
                print("Invalid input. Enter an integer: ")

        if choice < 1 or choice > 8:
            print("Invalid menu choice!")
            continue
        elif choice == 8:
            print("Thank you for using the calculator!")
            break
        elif choice == 7:
            print("\\n--- DATA TYPES DEMONSTRATION ---")
            symbol = input("Enter a character: ")[0]
            print(f"Character: {symbol} (Type: {type(symbol).__name__})")

            i_val = int(input("Enter an integer: "))
            print(f"Integer: {i_val} (Type: {type(i_val).__name__})")

            f_val = float(input("Enter a float: "))
            print(f"Float: {f_val} (Type: {type(f_val).__name__})")

            b_val = bool(input("Enter non-empty for True, empty for False: "))
            print(f"Boolean: {b_val} (Type: {type(b_val).__name__})")

            valid = True
        else:
            valid = True
            if choice == 5:
                a = int(input("Enter first integer: "))
                b = int(input("Enter second integer: "))
                if b == 0:
                    print("Error: Modulus by zero!")
                    valid = False
                else:
                    print(f"Result = {a % b}")
            else:
                f1 = float(input("Enter first number: "))
                f2 = float(input("Enter second number: "))

                if choice == 1:
                    print(f"Result = {f1 + f2}")
                elif choice == 2:
                    print(f"Result = {f1 - f2}")
                elif choice == 3:
                    print(f"Result = {f1 * f2}")
                elif choice == 4:
                    if f2 == 0.0:
                        print("Error: Division by zero!")
                        valid = False
                    else:
                        print(f"Result = {f1 / f2}")
                elif choice == 6:
                    exponent = int(input("Enter an integer exponent: "))
                    if f1 == 0.0 and exponent < 0:
                        print("Error: Zero cannot have a negative exponent!")
                        valid = False
                    else:
                        # Iterative power computation without math.pow() or **
                        power = 1.0
                        abs_exp = -exponent if exponent < 0 else exponent
                        for _ in range(abs_exp):
                            power *= f1
                        if exponent < 0:
                            power = 1.0 / power
                        print(f"Result = {power}")
                else:
                    print("Unsupported operation!")
                    valid = False

        while True:
            raw_rep = input("\\nCalculate again? (1 = Yes, 0 = No): ")
            if raw_rep in ("0", "1"):
                repeat = int(raw_rep)
                break
            print("Please enter 1 or 0.")

        if valid:
            print("Operation completed.")
        else:
            print("Operation could not be completed.")

if __name__ == "__main__":
    run_calculator()`,
  },
  interactiveScenarios: [
    {
      id: 'sc-1',
      name: 'Scenario 1: Menu Display (For Loop & Switch)',
      choice: 0,
      description: 'Generates the 8-item menu in sequence using for (i = 1; i <= 8; i++) and switch(i).',
      sampleInputs: ['(Automated on loop start)'],
      expectedOutput: '1. Addition\\n2. Subtraction\\n3. Multiplication\\n4. Division\\n5. Modulus\\n6. Power\\n7. Data Types Demo\\n8. Exit',
      explanation: 'Demonstrates for loop iteration bounds and compile-time jump table dispatch in switch-case.',
    },
    {
      id: 'sc-2',
      name: 'Scenario 2: Floating Division & Zero Guard (Choice 4)',
      choice: 4,
      description: 'Performs float division and validates denominator zero condition (f2 == 0.0f).',
      sampleInputs: ['Choice: 4', 'Numbers: 25.0 0.0'],
      expectedOutput: 'Error: Division by zero!\\nOperation could not be completed.',
      explanation: 'Ensures arithmetic logic prevents floating-point SIGFPE or infinity corruptions before execution.',
    },
    {
      id: 'sc-3',
      name: 'Scenario 3: Integer Modulus & Zero Guard (Choice 5)',
      choice: 5,
      description: 'Accepts two integers and applies modulus operator %, verifying b != 0.',
      sampleInputs: ['Choice: 5', 'Integers: 29 4'],
      expectedOutput: 'Result = 1\\nOperation completed.',
      explanation: 'Demonstrates integer arithmetic vs float arithmetic, and handles division-by-zero boundary.',
    },
    {
      id: 'sc-4',
      name: 'Scenario 4: Iterative Power with Negative Exponent (Choice 6)',
      choice: 6,
      description: 'Calculates 2.0^-3 without math.h pow() using a for loop and ternary absolute inversion.',
      sampleInputs: ['Choice: 6', 'Base: 2.0', 'Exponent: -3'],
      expectedOutput: 'Result = 0.125000\\nOperation completed.',
      explanation: 'Iterates 3 times: 1.0 * 2 * 2 * 2 = 8.0, then inverts: 1.0 / 8.0 = 0.125. Demonstrates loop accumulator pattern.',
    },
    {
      id: 'sc-5',
      name: 'Scenario 5: 10 Fundamental Data Types Walkthrough (Choice 7)',
      choice: 7,
      description: 'Demonstrates sequential scanning and printing of all 10 fundamental C data types with format specifiers.',
      sampleInputs: ['Choice: 7', 'char: K', 'short: 32000', 'int: 2147483647', 'unsigned: 4000000000', 'float: 3.14159', 'double: 2.718281828'],
      expectedOutput: 'Character: K\\nShort: 32000\\nInteger: 2147483647\\nUnsigned: 4000000000\\nFloat: 3.141590\\nDouble: 2.718282\\nOperation completed.',
      explanation: 'Demonstrates exact memory sizes and format specifiers (%c, %hd, %d, %u, %ld, %lld, %f, %lf, %Lf).',
    },
    {
      id: 'sc-6',
      name: 'Scenario 6: Stream Buffer Flushing (While + getchar)',
      choice: 99,
      description: 'Rejects invalid non-integer input and flushes newline characters via while (getchar() != \'\\n\').',
      sampleInputs: ['Choice: abc', 'Choice: 8'],
      expectedOutput: 'Invalid input. Enter an integer: \\nThank you for using the calculator!',
      explanation: 'Guarantees the input stream stdin is flushed cleanly and eliminates infinite scanf loops.',
    },
  ],
};
