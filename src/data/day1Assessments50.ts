import { AssessmentQuestion } from '../types';

export const DAY_1_PRE_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "day1-pre-q1",
    "question": "Trace the execution of this C program. What is printed to stdout?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int a = 5, b = 2;\n    printf(\"%.2f\", (float)a / b);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "2.00",
      "2",
      "2.50",
      "3.00"
    ],
    "correctIndex": 2,
    "explanation": "Casting 'a' to float before division forces floating-point division (5.0 / 2 = 2.5), formatted to 2 decimals as 2.50.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q2",
    "question": "What is the time complexity of the following loop?",
    "codeSnippet": "void loopTrace(int n) {\n    for (int i = 1; i <= n; i *= 2) {\n        // O(1) operations\n    }\n}",
    "codeLanguage": "cpp",
    "options": [
      "O(log N)",
      "O(N log N)",
      "O(1)",
      "O(N)"
    ],
    "correctIndex": 0,
    "explanation": "The loop variable doubles each iteration (1, 2, 4, 8, ... 2^k <= n), terminating in k = floor(log2 n) + 1 steps: O(log N).",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-pre-q3",
    "question": "What will be printed when this C code runs on a standard 32/64-bit architecture?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    char str[] = \"SPSU\";\n    printf(\"%zu\", sizeof(str));\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "6",
      "4",
      "8",
      "5"
    ],
    "correctIndex": 3,
    "explanation": "The string literal 'SPSU' contains 4 characters plus the implicit trailing null terminator '\\0', totaling 5 bytes.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q4",
    "question": "What is the output of this Python integer division and modulo script?",
    "codeSnippet": "a = 17\nb = -5\nprint(a // b, a % b)",
    "codeLanguage": "python",
    "options": [
      "-3 2",
      "-4 -3",
      "-3 -2",
      "-4 2"
    ],
    "correctIndex": 1,
    "explanation": "In Python, // rounds towards negative infinity (-3.4 -> -4), and modulo satisfies a = (a // b) * b + (a % b), so 17 = (-4)*(-5) + (-3).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q5",
    "question": "What does this C++ function determine about integer n?",
    "codeSnippet": "bool check(int n) {\n    return n > 0 && (n & (n - 1)) == 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Returns true if n is a power of 2",
      "Returns true if n is prime",
      "Returns true if n is divisible by 4",
      "Returns true if n is an odd number"
    ],
    "correctIndex": 0,
    "explanation": "Powers of two have exactly one bit set. Subtracting 1 flips that bit and all trailing bits; bitwise AND with n yields 0.",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-pre-q6",
    "question": "Trace the execution of this C code. What is the final value of x?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int a = 0;\n    int x = 10;\n    if (a != 0 && (x = 20)) {\n        // branch\n    }\n    printf(\"%d\", x);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "Undefined",
      "20",
      "10",
      "0"
    ],
    "correctIndex": 2,
    "explanation": "Because 'a != 0' evaluates to false (0), short-circuit evaluation skips the right operand '(x = 20)' entirely. x remains 10.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q7",
    "question": "What is printed by this Java program?",
    "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        int x = 5;\n        int y = x++ + ++x;\n        System.out.println(y);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "11",
      "12",
      "10",
      "13"
    ],
    "correctIndex": 1,
    "explanation": "x++ evaluates to 5 and increments x to 6. Then ++x increments x to 7 and evaluates to 7. Result: 5 + 7 = 12.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q8",
    "question": "What is the output of this Python snippet?",
    "codeSnippet": "s = \"Placement\"\nprint(s[1:5])",
    "codeLanguage": "python",
    "options": [
      "Plac",
      "ace",
      "lacem",
      "lace"
    ],
    "correctIndex": 3,
    "explanation": "Python slice s[1:5] extracts characters from index 1 up to index 4 (exclusive of 5): 'l' (1), 'a' (2), 'c' (3), 'e' (4).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q9",
    "question": "Trace this C pointer manipulation. What is printed?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int arr[] = {10, 20, 30, 40};\n    int *ptr = arr;\n    ptr += 2;\n    printf(\"%d\", *ptr);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "30",
      "40",
      "20",
      "10"
    ],
    "correctIndex": 0,
    "explanation": "Pointer arithmetic 'ptr += 2' advances the pointer by 2 * sizeof(int) bytes, pointing to arr[2], which is 30.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q10",
    "question": "What will this Java recursive function return for mystery(4)?",
    "codeSnippet": "public static int mystery(int n) {\n    if (n <= 1) return 1;\n    return n * mystery(n - 1);\n}",
    "codeLanguage": "java",
    "options": [
      "12",
      "16",
      "4",
      "24"
    ],
    "correctIndex": 3,
    "explanation": "This is the factorial function: 4! = 4 * 3 * 2 * 1 = 24.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q11",
    "question": "What is the return value of this C bitwise function for x = 12 (binary 1100)?",
    "codeSnippet": "int isolate(int x) {\n    return x & -x;\n}",
    "codeLanguage": "c",
    "options": [
      "0",
      "8",
      "4",
      "12"
    ],
    "correctIndex": 2,
    "explanation": "In two's complement, -x = ~x + 1. x & -x isolates the lowest set bit. For 12 (1100), the lowest set bit is at position 2 (value 4).",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-pre-q12",
    "question": "What is the output of this C++ switch statement?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int val = 2;\n    switch (val) {\n        case 1: cout << \"One \";\n        case 2: cout << \"Two \";\n        case 3: cout << \"Three \";\n        default: cout << \"Default\";\n    }\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Two Three Default",
      "Default",
      "Two",
      "Two Three"
    ],
    "correctIndex": 0,
    "explanation": "Because there is no 'break' statement after case 2, execution falls through all remaining cases and default.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q13",
    "question": "What does this Python code print?",
    "codeSnippet": "def test():\n    try:\n        return 10\n    finally:\n        return 20\n\nprint(test())",
    "codeLanguage": "python",
    "options": [
      "10",
      "20",
      "None",
      "Error"
    ],
    "correctIndex": 1,
    "explanation": "The 'finally' clause is guaranteed to execute before returning; a return statement in 'finally' overrides any previous return value.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q14",
    "question": "What is the time complexity of this nested loop?",
    "codeSnippet": "void nested(int n) {\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < i; j++) {\n            // O(1) step\n        }\n    }\n}",
    "codeLanguage": "cpp",
    "options": [
      "O(N log N)",
      "O(log N)",
      "O(N²)",
      "O(N)"
    ],
    "correctIndex": 2,
    "explanation": "Total inner iterations = 0 + 1 + 2 + ... + (n - 1) = n*(n - 1)/2 = O(N²).",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-pre-q15",
    "question": "Trace this C code swap function. What is printed?",
    "codeSnippet": "#include <stdio.h>\nvoid swap(int a, int b) {\n    int t = a; a = b; b = t;\n}\nint main() {\n    int x = 1, y = 2;\n    swap(x, y);\n    printf(\"%d %d\", x, y);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "Compilation Error",
      "2 1",
      "0 0",
      "1 2"
    ],
    "correctIndex": 3,
    "explanation": "Parameters in C are passed by value; swap only modifies local copies within its stack frame. x and y in main remain 1 and 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q16",
    "question": "What is the result of 1 << 3 in C/C++/Java?",
    "codeSnippet": "int res = 1 << 3;",
    "codeLanguage": "c",
    "options": [
      "8",
      "3",
      "4",
      "16"
    ],
    "correctIndex": 0,
    "explanation": "Left shifting 1 by 3 positions corresponds to 1 * 2^3 = 8.",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-pre-q17",
    "question": "What is the output of this Java String comparison?",
    "codeSnippet": "String s1 = \"SPSU\";\nString s2 = new String(\"SPSU\");\nSystem.out.println((s1 == s2) + \" \" + s1.equals(s2));",
    "codeLanguage": "java",
    "options": [
      "false false",
      "true false",
      "false true",
      "true true"
    ],
    "correctIndex": 2,
    "explanation": "'==' tests object reference identity (s2 is on heap, s1 in string pool -> false). '.equals()' compares character contents -> true.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q18",
    "question": "What will this C code output?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int x = -1;\n    unsigned int y = 2;\n    if (x < y) printf(\"LESS\");\n    else printf(\"GREATER\");\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "Error",
      "GREATER",
      "LESS",
      "EQUAL"
    ],
    "correctIndex": 1,
    "explanation": "In mixed signed/unsigned comparisons in C, signed int -1 is promoted to unsigned int (UINT_MAX), which is greater than 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q19",
    "question": "What is the output of this Python list default argument trap?",
    "codeSnippet": "def add_item(item, lst=[]):\n    lst.append(item)\n    return lst\n\nprint(add_item(1))\nprint(add_item(2))",
    "codeLanguage": "python",
    "options": [
      "[1] then [2]",
      "[1, 2] both times",
      "Error",
      "[1] then [1, 2]"
    ],
    "correctIndex": 3,
    "explanation": "Default argument expressions in Python are evaluated once when the function is defined; the same mutable list is shared across calls.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q20",
    "question": "What is the value of count after this loop executes?",
    "codeSnippet": "int count = 0;\nfor (int i = 1; i <= 32; i *= 2) {\n    count++;\n}",
    "codeLanguage": "cpp",
    "options": [
      "32",
      "6",
      "7",
      "5"
    ],
    "correctIndex": 1,
    "explanation": "Values of i are 1, 2, 4, 8, 16, 32 (total 6 values), before i reaches 64 and exceeds 32.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q21",
    "question": "What does this C function return for arr = {1, 2, 3, 4, 5} and n = 5?",
    "codeSnippet": "int calc(int arr[], int n) {\n    int sum = 0;\n    for (int i = 0; i < n; i += 2) sum += arr[i];\n    return sum;\n}",
    "codeLanguage": "c",
    "options": [
      "9",
      "10",
      "15",
      "6"
    ],
    "correctIndex": 0,
    "explanation": "Loop visits indices 0, 2, 4: arr[0]=1, arr[2]=3, arr[4]=5. Sum = 1 + 3 + 5 = 9.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q22",
    "question": "What is the time complexity of the following code snippet?",
    "codeSnippet": "void check(int n) {\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= n; j *= 2) {\n            // O(1) step\n        }\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "O(N²)",
      "O(log N)",
      "O(N)",
      "O(N log N)"
    ],
    "correctIndex": 3,
    "explanation": "Outer loop runs N times. Inner loop doubles j, running log2(N) times. Total = N * log2(N) = O(N log N).",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-pre-q23",
    "question": "What is printed by this C do-while loop?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int i = 5;\n    do {\n        printf(\"%d \", i);\n        i++;\n    } while (i < 5);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "5 6 ",
      "5 ",
      "Infinite Loop",
      "Nothing"
    ],
    "correctIndex": 1,
    "explanation": "A do-while loop always executes its body at least once before testing the condition.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q24",
    "question": "What will this C++ snippet output?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 10, b = 20;\n    int res = (a > b) ? a : b;\n    cout << res;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "0",
      "10",
      "20",
      "1"
    ],
    "correctIndex": 2,
    "explanation": "10 > 20 is false, so the ternary operator evaluates and returns the false branch 'b' (20).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q25",
    "question": "In Java, what happens when this code is executed?",
    "codeSnippet": "int[] arr = new int[5];\nSystem.out.println(arr[5]);",
    "codeLanguage": "java",
    "options": [
      "Throws ArrayIndexOutOfBoundsException",
      "Prints 0",
      "Prints garbage value",
      "Compile-time Error"
    ],
    "correctIndex": 0,
    "explanation": "An array of size 5 has valid indices 0 to 4. Accessing index 5 triggers an ArrayIndexOutOfBoundsException at runtime.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q26",
    "question": "What is the value of ans after this XOR operation in C?",
    "codeSnippet": "int a = 7, b = 7;\nint ans = a ^ b;",
    "codeLanguage": "c",
    "options": [
      "14",
      "1",
      "7",
      "0"
    ],
    "correctIndex": 3,
    "explanation": "XORing any integer with itself produces 0 (x ^ x = 0).",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-pre-q27",
    "question": "What does this Python function compute?",
    "codeSnippet": "def func(n):\n    if n == 0: return 0\n    return (n % 10) + func(n // 10)",
    "codeLanguage": "python",
    "options": [
      "Binary parity of n",
      "Sum of the decimal digits of n",
      "Count of digits in n",
      "Reversed digits of n"
    ],
    "correctIndex": 1,
    "explanation": "The function recursively adds the last digit (n % 10) to the sum of digits of n // 10.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q28",
    "question": "What is printed by this C snippet?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int x = 5;\n    printf(\"%d \", x);\n    { int x = 10; printf(\"%d \", x); }\n    printf(\"%d\", x);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "5 10 10",
      "5 5 5",
      "5 10 5",
      "10 10 10"
    ],
    "correctIndex": 2,
    "explanation": "The inner block shadows the outer 'x' with its own local variable 'x = 10'. When the inner block exits, outer 'x' is restored.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q29",
    "question": "What is the output of this Python boolean expression?",
    "codeSnippet": "print(bool([]), bool([0]), bool(\"\"))",
    "codeLanguage": "python",
    "options": [
      "False True False",
      "True True True",
      "False True True",
      "False False False"
    ],
    "correctIndex": 0,
    "explanation": "Empty collection [] and empty string '' are falsy. Non-empty list [0] has length 1 and is truthy.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q30",
    "question": "What is the maximum number of times this recursive function will be placed on the stack?",
    "codeSnippet": "void countdown(int n) {\n    if (n <= 0) return;\n    countdown(n - 1);\n}",
    "codeLanguage": "c",
    "options": [
      "2^n frames",
      "n frames",
      "n + 1 frames",
      "1 frame"
    ],
    "correctIndex": 2,
    "explanation": "Calls countdown(n), countdown(n-1), ... countdown(0), creating n + 1 stack frames simultaneously at maximum depth.",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-pre-q31",
    "question": "Trace this C loop with continue. What is the output?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    for (int i = 0; i < 5; i++) {\n        if (i == 2) continue;\n        printf(\"%d\", i);\n    }\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "01234",
      "01",
      "234",
      "0134"
    ],
    "correctIndex": 3,
    "explanation": "'continue' skips the rest of the loop body when i == 2. All other iterations 0, 1, 3, 4 are printed.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q32",
    "question": "What does this C++ snippet output?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int arr[3] = {1, 2, 3};\n    int* p = arr;\n    cout << *(p + 1);\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "2",
      "3",
      "Address of arr",
      "1"
    ],
    "correctIndex": 0,
    "explanation": "p points to arr[0]. Pointer arithmetic (p + 1) points to arr[1], whose value is 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q33",
    "question": "What is the output of this Java try-catch-finally snippet?",
    "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.print(\"Catch \");\n        } finally {\n            System.out.print(\"Finally\");\n        }\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Compilation Error",
      "Catch Finally",
      "Catch",
      "Finally"
    ],
    "correctIndex": 1,
    "explanation": "Division by zero throws ArithmeticException, caught by the catch block, and the finally block executes immediately after.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q34",
    "question": "What is printed by this Python string formatting code?",
    "codeSnippet": "val = 3.14159\nprint(f\"{val:.2f}\")",
    "codeLanguage": "python",
    "options": [
      "3.1",
      "3.141",
      "3",
      "3.14"
    ],
    "correctIndex": 3,
    "explanation": "The format specifier '.2f' rounds floating-point numbers to two decimal places: 3.14.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q35",
    "question": "What is the time complexity of finding the maximum element in an unsorted array of size N?",
    "codeSnippet": "int findMax(int arr[], int n) {\n    int m = arr[0];\n    for (int i = 1; i < n; i++)\n        if (arr[i] > m) m = arr[i];\n    return m;\n}",
    "codeLanguage": "c",
    "options": [
      "O(N²)",
      "O(1)",
      "O(N)",
      "O(log N)"
    ],
    "correctIndex": 2,
    "explanation": "Linear scan visits all N elements exactly once, performing N - 1 comparisons: O(N) time.",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-pre-q36",
    "question": "What is the output of this C program?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int a = 1;\n    int b = a << 4;\n    printf(\"%d\", b);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "16",
      "32",
      "4",
      "8"
    ],
    "correctIndex": 0,
    "explanation": "1 << 4 = 1 * 2^4 = 16.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q37",
    "question": "What does this C++ function return for an array [1, 2, 3, 4]?",
    "codeSnippet": "int mystery(int arr[], int n) {\n    int res = 0;\n    for (int i = 0; i < n; i++) res += arr[i];\n    return res;\n}",
    "codeLanguage": "cpp",
    "options": [
      "24",
      "4",
      "0",
      "10"
    ],
    "correctIndex": 3,
    "explanation": "Computes total sum: 1 + 2 + 3 + 4 = 10.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q38",
    "question": "What is the output of this Python slice with step?",
    "codeSnippet": "s = \"ABCDEF\"\nprint(s[::2])",
    "codeLanguage": "python",
    "options": [
      "ABC",
      "ACE",
      "FEDCBA",
      "BDF"
    ],
    "correctIndex": 1,
    "explanation": "Step 2 selects indices 0, 2, 4 -> 'A', 'C', 'E'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q39",
    "question": "What is the return value of this C function for x = 0?",
    "codeSnippet": "int check(int x) {\n    if (!x) return 100;\n    return 200;\n}",
    "codeLanguage": "c",
    "options": [
      "100",
      "Error",
      "200",
      "0"
    ],
    "correctIndex": 0,
    "explanation": "In C, 0 is falsy, so !0 evaluates to 1 (true), returning 100.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q40",
    "question": "What is the asymptotic space complexity of this recursive function?",
    "codeSnippet": "int sum(int n) {\n    if (n <= 0) return 0;\n    return n + sum(n - 1);\n}",
    "codeLanguage": "java",
    "options": [
      "O(1) space",
      "O(log N) space",
      "O(N) auxiliary stack space",
      "O(N²) space"
    ],
    "correctIndex": 2,
    "explanation": "The function makes N recursive calls before reaching the base case, each consuming a stack frame: O(N) space.",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-pre-q41",
    "question": "What is the output of this C snippet?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int x = 10;\n    int *p = &x;\n    *p = 50;\n    printf(\"%d\", x);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "Address of x",
      "50",
      "0",
      "10"
    ],
    "correctIndex": 1,
    "explanation": "Dereferencing '*p = 50' modifies the value stored at the address of x directly.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q42",
    "question": "What will this Python comparison evaluate to?",
    "codeSnippet": "a = [1, 2]\nb = [1, 2]\nprint(a == b, a is b)",
    "codeLanguage": "python",
    "options": [
      "False True",
      "True True",
      "False False",
      "True False"
    ],
    "correctIndex": 3,
    "explanation": "'==' compares element values (equal -> True); 'is' checks object identity (two distinct lists in memory -> False).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q43",
    "question": "What is the output of this C++ loop?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int sum = 0;\n    for (int i = 1; i <= 3; i++) {\n        for (int j = 1; j <= 2; j++) {\n            sum++;\n        }\n    }\n    cout << sum;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "6",
      "5",
      "3",
      "2"
    ],
    "correctIndex": 0,
    "explanation": "Outer loop runs 3 times; inner loop runs 2 times per outer loop iteration. Total iterations = 3 * 2 = 6.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q44",
    "question": "What does this C code print?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int a = 3, b = 4;\n    printf(\"%d\", a & b);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "3",
      "4",
      "0",
      "7"
    ],
    "correctIndex": 2,
    "explanation": "3 in binary is 011; 4 in binary is 100. Bitwise AND (011 & 100) = 000 = 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q45",
    "question": "What will this Java loop output?",
    "codeSnippet": "for (int i = 0; i < 3; i++) {\n    if (i == 1) break;\n    System.out.print(i);\n}",
    "codeLanguage": "java",
    "options": [
      "Nothing",
      "01",
      "02",
      "0"
    ],
    "correctIndex": 3,
    "explanation": "i = 0 prints '0'. When i = 1, 'break' terminates the loop immediately.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q46",
    "question": "What is the time complexity of accessing an element in an array by index arr[i]?",
    "codeSnippet": "int val = arr[idx];",
    "codeLanguage": "c",
    "options": [
      "O(N)",
      "O(1)",
      "O(log N)",
      "O(N²)"
    ],
    "correctIndex": 1,
    "explanation": "Array indexing computes BaseAddress + index * element_size in a single CPU instruction: O(1).",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-pre-q47",
    "question": "What is printed by this Python code?",
    "codeSnippet": "print(5 // 2, 5 / 2)",
    "codeLanguage": "python",
    "options": [
      "2 2",
      "2.5 2.5",
      "2 2.5",
      "2.5 2"
    ],
    "correctIndex": 2,
    "explanation": "// performs floor division returning 2; / performs true float division returning 2.5.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q48",
    "question": "What is the value of x after this operation?",
    "codeSnippet": "int x = 10;\nx += 5 * 2;",
    "codeLanguage": "c",
    "options": [
      "20",
      "15",
      "30",
      "25"
    ],
    "correctIndex": 0,
    "explanation": "Multiplication has higher precedence than addition: 5 * 2 = 10, then x += 10 produces 20.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q49",
    "question": "What does this C++ recursive function calculate for n = 5?",
    "codeSnippet": "int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}",
    "codeLanguage": "cpp",
    "options": [
      "8",
      "5",
      "3",
      "15"
    ],
    "correctIndex": 1,
    "explanation": "Fibonacci sequence: fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-pre-q50",
    "question": "In C, what is the output of sizeof(char) guaranteed to be by standard?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    printf(\"%zu\", sizeof(char));\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "4",
      "Implementation-defined",
      "2",
      "1"
    ],
    "correctIndex": 3,
    "explanation": "By the ANSI C standard, sizeof(char) is strictly defined to be 1.",
    "category": "Theory (30%)"
  }
];

export const DAY_1_POST_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "day1-post-q1",
    "question": "Trace this C code using static variables. What is printed on the second call?",
    "codeSnippet": "#include <stdio.h>\nvoid counter() {\n    static int count = 10;\n    count += 5;\n    printf(\"%d \", count);\n}\nint main() {\n    counter();\n    counter();\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "15 15 ",
      "15 20 ",
      "10 15 ",
      "20 20 "
    ],
    "correctIndex": 1,
    "explanation": "Static local variables retain their value in the data segment across function invocations. First call prints 15, second prints 20.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q2",
    "question": "What is the time complexity of Binary Search on a sorted array of N elements?",
    "codeSnippet": "int binarySearch(int arr[], int n, int target) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}",
    "codeLanguage": "cpp",
    "options": [
      "O(1)",
      "O(N log N)",
      "O(N)",
      "O(log N)"
    ],
    "correctIndex": 3,
    "explanation": "Binary search halves the search space in each iteration, resulting in log2(N) steps.",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q3",
    "question": "What is the output of this Java code snippet?",
    "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        int a = 10, b = 20;\n        System.out.println(\"Sum: \" + a + b);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Sum: 1020",
      "Error",
      "Sum: 30",
      "Sum: 10 20"
    ],
    "correctIndex": 0,
    "explanation": "The '+' operator evaluates left-to-right. \"Sum: \" + 10 becomes \"Sum: 10\", and then + 20 concatenates to \"Sum: 1020\".",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q4",
    "question": "What does this Python list comprehension produce?",
    "codeSnippet": "nums = [1, 2, 3, 4, 5]\nevsq = [x*x for x in nums if x % 2 == 0]\nprint(evsq)",
    "codeLanguage": "python",
    "options": [
      "[1, 9, 25]",
      "[2, 4]",
      "[4, 16]",
      "[1, 4, 9, 16, 25]"
    ],
    "correctIndex": 2,
    "explanation": "Filters even numbers (2 and 4) and squares them: 2^2 = 4, 4^2 = 16.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q5",
    "question": "What is the output of this C pointer arithmetic code?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int arr[] = {100, 200, 300, 400};\n    int *p = arr + 1;\n    printf(\"%d\", *(p + 2));\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "200",
      "100",
      "300",
      "400"
    ],
    "correctIndex": 3,
    "explanation": "arr + 1 points to arr[1] (200). (p + 2) points to arr[1 + 2] = arr[3] (400). Dereferencing gives 400.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q6",
    "question": "What does this C++ function return for a string 'racecar'?",
    "codeSnippet": "bool isPal(const string& s) {\n    int l = 0, r = s.size() - 1;\n    while (l < r) {\n        if (s[l++] != s[r--]) return false;\n    }\n    return true;\n}",
    "codeLanguage": "cpp",
    "options": [
      "compilation error",
      "true",
      "false",
      "undefined"
    ],
    "correctIndex": 1,
    "explanation": "'racecar' reads the same forwards and backwards. Two pointers match all character pairs.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q7",
    "question": "What is printed by this Python recursive function?",
    "codeSnippet": "def f(n):\n    if n <= 0: return\n    f(n - 1)\n    print(n, end=\" \")\n\nf(3)",
    "codeLanguage": "python",
    "options": [
      "1 2 3 ",
      "3 2 1 ",
      "1 2 ",
      "3 2 "
    ],
    "correctIndex": 0,
    "explanation": "Print occurs after the recursive call (head recursion unwind). The calls unwind printing 1, then 2, then 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q8",
    "question": "What is the value of res after this Java bitwise operation?",
    "codeSnippet": "int res = 12 >> 2;",
    "codeLanguage": "java",
    "options": [
      "24",
      "48",
      "3",
      "6"
    ],
    "correctIndex": 2,
    "explanation": "Right shifting by 2 divides by 2^2 = 4: 12 / 4 = 3.",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q9",
    "question": "Trace this C code swap using references/pointers. What is printed?",
    "codeSnippet": "#include <stdio.h>\nvoid swap(int *a, int *b) {\n    int t = *a; *a = *b; *b = t;\n}\nint main() {\n    int x = 40, y = 80;\n    swap(&x, &y);\n    printf(\"%d %d\", x, y);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "80 80",
      "80 40",
      "40 80",
      "40 40"
    ],
    "correctIndex": 1,
    "explanation": "Passing memory addresses (&x, &y) allows the function to dereference and swap values in caller scope.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q10",
    "question": "What is the output of this Python dictionary operation?",
    "codeSnippet": "d = {\"a\": 1, \"b\": 2}\nprint(d.get(\"c\", 99))",
    "codeLanguage": "python",
    "options": [
      "99",
      "None",
      "KeyError",
      "0"
    ],
    "correctIndex": 0,
    "explanation": "dict.get(key, default) safely returns the default value 99 when the key 'c' does not exist.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q11",
    "question": "What is the time complexity of inserting N items into an empty Java StringBuilder?",
    "codeSnippet": "StringBuilder sb = new StringBuilder();\nfor (int i = 0; i < n; i++) {\n    sb.append('a');\n}",
    "codeLanguage": "java",
    "options": [
      "O(log N)",
      "O(1)",
      "O(N²)",
      "O(N)"
    ],
    "correctIndex": 3,
    "explanation": "StringBuilder uses an amortized doubling dynamic array buffer, making each append O(1) amortized, totaling O(N).",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q12",
    "question": "What will this C code output?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int x = 10;\n    if (x == 10)\n        printf(\"A\");\n    else if (x > 5)\n        printf(\"B\");\n    else\n        printf(\"C\");\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "ABC",
      "A",
      "AB",
      "B"
    ],
    "correctIndex": 1,
    "explanation": "In an if-else if ladder, once the first condition (x == 10) matches, remaining branches are skipped.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q13",
    "question": "What does this C++ code output?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 5;\n    int &ref = a;\n    ref = 25;\n    cout << a;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "5",
      "Address of a",
      "25",
      "Error"
    ],
    "correctIndex": 2,
    "explanation": "ref is an alias for variable 'a'. Mutating ref directly alters 'a' to 25.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q14",
    "question": "What will this Python try-except block output?",
    "codeSnippet": "try:\n    x = int(\"SPSU\")\nexcept ValueError:\n    print(\"Caught\", end=\"\")",
    "codeLanguage": "python",
    "options": [
      "Caught",
      "Crash",
      "0",
      "None"
    ],
    "correctIndex": 0,
    "explanation": "Converting non-numeric string 'SPSU' to int raises ValueError, successfully intercepted by the except block.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q15",
    "question": "What is the space complexity of an in-place two-pointer array reversal?",
    "codeSnippet": "void reverse(int arr[], int n) {\n    int l = 0, r = n - 1;\n    while (l < r) {\n        int temp = arr[l]; arr[l] = arr[r]; arr[r] = temp;\n        l++; r--;\n    }\n}",
    "codeLanguage": "c",
    "options": [
      "O(N²) Space",
      "O(N) Space",
      "O(log N) Space",
      "O(1) Auxiliary Space"
    ],
    "correctIndex": 3,
    "explanation": "Only three integer pointer/temp variables (l, r, temp) are allocated, independent of N: O(1) space.",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q16",
    "question": "What is printed by this C program?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int x = 7;\n    printf(\"%d\", (x > 5) ? (x < 10 ? 1 : 2) : 3);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "2",
      "3",
      "1",
      "0"
    ],
    "correctIndex": 2,
    "explanation": "x = 7. 7 > 5 is true. Nested condition 7 < 10 is true -> returns 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q17",
    "question": "What does this Java code print?",
    "codeSnippet": "int x = 0;\nfor (int i = 0; i < 5; i++) {\n    if (i % 2 == 0) continue;\n    x += i;\n}\nSystem.out.println(x);",
    "codeLanguage": "java",
    "options": [
      "10",
      "4",
      "0",
      "6"
    ],
    "correctIndex": 1,
    "explanation": "Evens (0, 2, 4) are skipped by continue. Odds added: 1 + 3 = 4.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q18",
    "question": "What is the output of this Python string reversal?",
    "codeSnippet": "s = \"Udaipur\"\nprint(s[::-1])",
    "codeLanguage": "python",
    "options": [
      "Error",
      "Udaipur",
      "rupiad",
      "rupiadU"
    ],
    "correctIndex": 3,
    "explanation": "Step -1 slices the string backwards, producing 'rupiadU'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q19",
    "question": "What is the result of ~0 in two's complement representation in C?",
    "codeSnippet": "int x = ~0;",
    "codeLanguage": "c",
    "options": [
      "-1",
      "0",
      "1",
      "INT_MAX"
    ],
    "correctIndex": 0,
    "explanation": "Bitwise NOT of all 0s produces all 1s (0xFFFFFFFF), which represents -1 in two's complement signed integer.",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q20",
    "question": "Trace this C recursive fast power function. For exp = 0, what does it return?",
    "codeSnippet": "long long fastPow(long long base, long long exp) {\n    if (exp == 0) return 1;\n    long long half = fastPow(base, exp / 2);\n    return (exp % 2 == 0) ? half * half : half * half * base;\n}",
    "codeLanguage": "cpp",
    "options": [
      "base",
      "-1",
      "1",
      "0"
    ],
    "correctIndex": 2,
    "explanation": "By mathematical identity, any non-zero base raised to the power 0 equals 1 (base case).",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q21",
    "question": "What is the output of this C code?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int a = 10;\n    int b = ++a;\n    printf(\"%d %d\", a, b);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "10 10",
      "11 11",
      "11 10",
      "10 11"
    ],
    "correctIndex": 1,
    "explanation": "Prefix ++a increments 'a' to 11 first, and then evaluates to 11 for assignment to 'b'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q22",
    "question": "What will this Java method return?",
    "codeSnippet": "public static boolean isEven(int n) {\n    return (n & 1) == 0;\n}",
    "codeLanguage": "java",
    "options": [
      "true for even numbers, false for odd numbers",
      "true for odd numbers",
      "true for all numbers",
      "false for all numbers"
    ],
    "correctIndex": 0,
    "explanation": "The least significant bit of even numbers is 0; ANDing with 1 evaluates to 0.",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q23",
    "question": "What is the output of this Python snippet?",
    "codeSnippet": "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))",
    "codeLanguage": "python",
    "options": [
      "1",
      "Error",
      "4",
      "3"
    ],
    "correctIndex": 2,
    "explanation": "'b = a' assigns a reference to the same list; mutating b mutates a as well.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q24",
    "question": "What is the output of this C++ snippet?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int arr[2][2] = {{1, 2}, {3, 4}};\n    cout << arr[1][0];\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "4",
      "1",
      "2",
      "3"
    ],
    "correctIndex": 3,
    "explanation": "arr[1][0] accesses row index 1, column index 0, which holds the value 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q25",
    "question": "What is the time complexity of the following code?",
    "codeSnippet": "void mystery(int n) {\n    for (int i = n; i > 0; i /= 2) {\n        // O(1) step\n    }\n}",
    "codeLanguage": "c",
    "options": [
      "O(N)",
      "O(log N)",
      "O(N²)",
      "O(1)"
    ],
    "correctIndex": 1,
    "explanation": "Halving i each step reaches 0 in floor(log2 N) + 1 steps: O(log N).",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q26",
    "question": "What does this C code print?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int x = 5;\n    int y = (x == 5) ? (x << 1) : (x >> 1);\n    printf(\"%d\", y);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "10",
      "5",
      "25",
      "2"
    ],
    "correctIndex": 0,
    "explanation": "Condition (5 == 5) is true; (5 << 1) multiplies 5 by 2 = 10.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q27",
    "question": "In Java, what is the default value of an uninitialized int array element?",
    "codeSnippet": "int[] arr = new int[5];\nSystem.out.println(arr[0]);",
    "codeLanguage": "java",
    "options": [
      "undefined",
      "null",
      "0",
      "Garbage value"
    ],
    "correctIndex": 2,
    "explanation": "In Java, elements of primitive numeric arrays are initialized to 0 by default.",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q28",
    "question": "What is the output of this Python code?",
    "codeSnippet": "x = 5\ndef test():\n    global x\n    x = 10\ntest()\nprint(x)",
    "codeLanguage": "python",
    "options": [
      "5",
      "10",
      "None",
      "Error"
    ],
    "correctIndex": 1,
    "explanation": "The 'global x' declaration allows the function to reassign the module-level variable x to 10.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q29",
    "question": "What is the output of this C code snippet?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int a = 0, b = 1;\n    printf(\"%d\", a || b);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "2",
      "true",
      "0",
      "1"
    ],
    "correctIndex": 3,
    "explanation": "Logical OR (0 || 1) evaluates to 1 (true) in C.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q30",
    "question": "What is the time complexity of reversing an array of size N in-place?",
    "codeSnippet": "// Two-pointer reversal",
    "codeLanguage": "cpp",
    "options": [
      "O(1)",
      "O(N)",
      "O(N log N)",
      "O(N²)"
    ],
    "correctIndex": 1,
    "explanation": "The two pointers meet in N / 2 swaps, which is asymptotically O(N).",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q31",
    "question": "What does this Java code snippet print?",
    "codeSnippet": "int x = 3;\nswitch (x) {\n    case 1: System.out.print(\"1\");\n    case 3: System.out.print(\"3\");\n    case 5: System.out.print(\"5\"); break;\n    default: System.out.print(\"D\");\n}",
    "codeLanguage": "java",
    "options": [
      "35",
      "3",
      "35D",
      "135"
    ],
    "correctIndex": 0,
    "explanation": "Matches case 3: prints '3', falls through to case 5: prints '5', hits 'break' and exits.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q32",
    "question": "What is the output of this Python slice?",
    "codeSnippet": "s = \"KAPIL\"\nprint(s[1:-1])",
    "codeLanguage": "python",
    "options": [
      "APIL",
      "KAPI",
      "KAPIL",
      "API"
    ],
    "correctIndex": 3,
    "explanation": "Starts at index 1 ('A') and stops before index -1 ('L'), yielding 'API'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q33",
    "question": "What is printed by this C program?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int arr[] = {1, 2, 3};\n    printf(\"%d\", 1[arr]);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "Compilation Error",
      "1",
      "2",
      "3"
    ],
    "correctIndex": 2,
    "explanation": "In C, arr[1] and 1[arr] both resolve to *(arr + 1) due to commutative addition of pointers, printing 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q34",
    "question": "What will this C++ code output?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 0;\n    while (++x < 3) {\n        cout << x << \" \";\n    }\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "1 2 ",
      "0 1 2 ",
      "1 2 3 ",
      "0 1 "
    ],
    "correctIndex": 0,
    "explanation": "x increments before comparison: ++x = 1 (< 3) prints 1; ++x = 2 (< 3) prints 2; ++x = 3 (not < 3) loop terminates.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q35",
    "question": "In Python, what is the result of 10 % 3 vs -10 % 3?",
    "codeSnippet": "print(10 % 3, -10 % 3)",
    "codeLanguage": "python",
    "options": [
      "1 1",
      "1 2",
      "0 0",
      "1 -1"
    ],
    "correctIndex": 1,
    "explanation": "In Python, modulo matches divisor sign: -10 = (-4) * 3 + 2, so -10 % 3 = 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q36",
    "question": "What will this Java method output?",
    "codeSnippet": "public static void main(String[] args) {\n    int x = 5;\n    change(x);\n    System.out.println(x);\n}\nstatic void change(int x) {\n    x = 100;\n}",
    "codeLanguage": "java",
    "options": [
      "Compilation Error",
      "100",
      "0",
      "5"
    ],
    "correctIndex": 3,
    "explanation": "Primitive types in Java are passed by value; caller's 'x' is unaffected.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q37",
    "question": "What is the time complexity of checking if a number is prime using trial division up to sqrt(N)?",
    "codeSnippet": "bool isPrime(int n) {\n    if (n <= 1) return false;\n    for (int i = 2; i * i <= n; i++)\n        if (n % i == 0) return false;\n    return true;\n}",
    "codeLanguage": "c",
    "options": [
      "O(N)",
      "O(log N)",
      "O(sqrt(N))",
      "O(1)"
    ],
    "correctIndex": 2,
    "explanation": "The loop terminates when i > sqrt(N), performing at most sqrt(N) iterations: O(sqrt(N)).",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q38",
    "question": "What does this C code print?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int x = 1;\n    printf(\"%d\", !(!x));\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "1",
      "-1",
      "Error",
      "0"
    ],
    "correctIndex": 0,
    "explanation": "!1 = 0, and !0 = 1. Double negation normalizes non-zero values to 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q39",
    "question": "What is the output of this Python dictionary lookup?",
    "codeSnippet": "d = {1: \"one\", 2: \"two\"}\nprint(1 in d, \"one\" in d)",
    "codeLanguage": "python",
    "options": [
      "False False",
      "True True",
      "False True",
      "True False"
    ],
    "correctIndex": 3,
    "explanation": "'in' on a dictionary tests keys, not values. Key 1 exists (True); key 'one' does not (False).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q40",
    "question": "What will this C++ function return?",
    "codeSnippet": "int func() {\n    int a = 10;\n    return a++;\n}",
    "codeLanguage": "cpp",
    "options": [
      "11",
      "10",
      "0",
      "Undefined"
    ],
    "correctIndex": 1,
    "explanation": "Postfix a++ evaluates to current value 10 before incrementing; returns 10.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q41",
    "question": "What is the space complexity of iterative binary search?",
    "codeSnippet": "// iterative binary search with low, high, mid",
    "codeLanguage": "c",
    "options": [
      "O(N)",
      "O(N log N)",
      "O(1) Auxiliary Space",
      "O(log N)"
    ],
    "correctIndex": 2,
    "explanation": "Iterative binary search uses fixed integer variables and zero recursion stack: O(1) space.",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q42",
    "question": "What does this Java code print?",
    "codeSnippet": "int a = 5, b = 2;\nSystem.out.println(a / b);",
    "codeLanguage": "java",
    "options": [
      "2",
      "3",
      "2.5",
      "2.0"
    ],
    "correctIndex": 0,
    "explanation": "Integer division truncates fractional components towards zero: 5 / 2 = 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q43",
    "question": "What will this Python code output?",
    "codeSnippet": "print(type(1 / 1))",
    "codeLanguage": "python",
    "options": [
      "<class 'int'>",
      "<class 'number'>",
      "Error",
      "<class 'float'>"
    ],
    "correctIndex": 3,
    "explanation": "In Python 3, the '/' division operator always returns a float (1.0).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q44",
    "question": "What is the output of this C code?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int x = 16;\n    printf(\"%d\", x >> 1);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "4",
      "8",
      "16",
      "32"
    ],
    "correctIndex": 1,
    "explanation": "Right shift by 1 bit divides by 2: 16 >> 1 = 8.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q45",
    "question": "What does this C++ snippet output?",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int sum = 0;\n    for (int i = 0; i < 3; ++i) sum += i;\n    cout << sum;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "3",
      "2",
      "6",
      "0"
    ],
    "correctIndex": 0,
    "explanation": "0 + 1 + 2 = 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q46",
    "question": "What is the result of 0 ^ 42?",
    "codeSnippet": "int res = 0 ^ 42;",
    "codeLanguage": "c",
    "options": [
      "0",
      "-42",
      "42",
      "1"
    ],
    "correctIndex": 2,
    "explanation": "XORing any number with 0 preserves the original number (0 ^ x = x).",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q47",
    "question": "What is printed by this Python snippet?",
    "codeSnippet": "x = [1, 2, 3]\nprint(x.pop())\nprint(x)",
    "codeLanguage": "python",
    "options": [
      "3 then [1, 2, 3]",
      "3 then [1, 2]",
      "Error",
      "1 then [2, 3]"
    ],
    "correctIndex": 1,
    "explanation": "pop() removes and returns the last element (3); x becomes [1, 2].",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q48",
    "question": "In Java, what does break do inside a nested loop without a label?",
    "codeSnippet": "for (...) {\n    for (...) {\n        if (cond) break;\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Skips to next iteration",
      "Terminates both loops",
      "Terminates the program",
      "Terminates only the innermost loop"
    ],
    "correctIndex": 3,
    "explanation": "An unlabelled break terminates strictly the nearest enclosing loop.",
    "category": "Theory (30%)"
  },
  {
    "id": "day1-post-q49",
    "question": "What is the output of this C code?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int a = 2, b = 3;\n    printf(\"%d\", a * b + a);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "8",
      "10",
      "12",
      "6"
    ],
    "correctIndex": 0,
    "explanation": "2 * 3 = 6, then 6 + 2 = 8.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "day1-post-q50",
    "question": "What is the time complexity of the Dutch National Flag algorithm (sort 0s, 1s, 2s)?",
    "codeSnippet": "// Single pass three-pointer partition",
    "codeLanguage": "cpp",
    "options": [
      "O(N²) Time",
      "O(N) Space",
      "O(N) Time and O(1) Space",
      "O(N log N) Time"
    ],
    "correctIndex": 2,
    "explanation": "The Dutch National Flag algorithm processes each element in at most a single pass: O(N) time and O(1) space.",
    "category": "Theory (30%)"
  }
];
