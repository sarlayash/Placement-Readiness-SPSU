import { ProgrammingNote } from '../types';

export const DAY_1_PROGRAMMING_NOTES: ProgrammingNote[] = [
  {
    id: 'd1-note-1',
    title: '1. Variables, Data Types & Memory Representation',
    conceptSummary:
      'Variables are named memory locations storing data. Primitive types (int, float, char, bool) differ in bit-width and memory layout. In C/C++, integer sizes depend on architecture (typically 32-bit: -2^31 to 2^31 - 1). In Java, primitives have guaranteed fixed sizes. In Python, integers have arbitrary precision. Understanding 32-bit signed overflow, type promotion (e.g. int to float/double), and explicit type casting prevents catastrophic silent data corruption.',
    timeSpaceNote: 'Declaration & Primitive Assignment: O(1) Time | O(1) Stack Memory',
    kapilMentorTip:
      'Never write `int mid = (low + high) / 2` when values can exceed 10^9; always use `int mid = low + (high - low) / 2` to prevent 32-bit integer overflow.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <limits.h>

// Solved Example: Data types, limits, type casting, and overflow prevention
int main() {
    // 1. Primitive declarations and sizes
    int a = 2147483647; // INT_MAX (2^31 - 1)
    long long safeSum = (long long)a + 100; // Explicit cast prevents 32-bit overflow
    
    // 2. Type casting in division
    int numerator = 7, denominator = 2;
    double exactQuotient = (double)numerator / denominator; // 3.5 instead of truncated 3
    
    printf("Safe Sum: %lld\\n", safeSum);
    printf("Exact Quotient: %.2f\\n", exactQuotient);
    printf("Size of int: %zu bytes, Size of long long: %zu bytes\\n", sizeof(int), sizeof(long long));
    return 0;
}`,
      cpp: `#include <iostream>
#include <climits>
#include <cstdint>
using namespace std;

// Solved Example: Fixed-width integer types and explicit casting
int main() {
    int32_t maxVal = INT32_MAX;
    
    // Explicit casting to int64_t before addition
    int64_t sum = static_cast<int64_t>(maxVal) + 500;
    
    int num = 9, den = 4;
    double result = static_cast<double>(num) / den;
    
    cout << "Calculated Sum: " << sum << "\\n";
    cout << "Exact Division: " << result << "\\n";
    return 0;
}`,
      java: `public class VariablesDemo {
    // Solved Example: Primitive types and avoiding overflow
    public static void main(String[] args) {
        int maxInt = Integer.MAX_VALUE; // 2,147,483,647
        
        // Correct casting to long before arithmetic
        long total = (long) maxInt + 1000L;
        
        int x = 5, y = 2;
        double division = (double) x / y; // 2.5
        
        System.out.println("Safe 64-bit Total: " + total);
        System.out.println("Exact Double Division: " + division);
    }
}`,
      python: `def variables_and_types_demo():
    # In Python 3, integers have arbitrary precision (no 32-bit overflow)
    large_val = 2**63 - 1
    extended_val = large_val + 10**18
    
    # Division: / gives float (exact), // gives floor integer division
    quotient_float = 7 / 2   # 3.5
    quotient_floor = 7 // 2  # 3
    
    print(f"Extended Arbitrary Precision: {extended_val}")
    print(f"Float: {quotient_float}, Floor: {quotient_floor}")

if __name__ == "__main__":
    variables_and_types_demo()`,
    },
  },
  {
    id: 'd1-note-2',
    title: '2. Operators & Bit Manipulation Fundamentals',
    conceptSummary:
      'Operators manipulate data: Arithmetic (+, -, *, /, %), Relational (==, !=, <, >), Logical (&&, ||, !), and Bitwise (&, |, ^, ~, <<, >>). Short-circuit evaluation in logical AND/OR executes the right-hand operand only when necessary, which is crucial for null-pointer and boundary guards. Bitwise operations run in a single CPU cycle: `n & (n - 1)` clears the lowest set bit; `x << 1` multiplies by 2; `x >> 1` divides by 2.',
    timeSpaceNote: 'All Bitwise & Arithmetic Operations: O(1) Time | O(1) Space',
    kapilMentorTip:
      'To check if a positive integer N is a power of 2, use `n > 0 && (n & (n - 1)) == 0`. It checks if N has exactly one set bit in O(1) time.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>

// Solved Example: Power of 2 check and short-circuit null guarding
bool isPowerOfTwo(int n) {
    return (n > 0) && ((n & (n - 1)) == 0);
}

int main() {
    int val = 16;
    printf("%d is power of two: %s\\n", val, isPowerOfTwo(val) ? "true" : "false");
    
    // Short-circuit execution trace
    int x = 0;
    if (x != 0 && (100 / x > 2)) {
        // Safe: 100/x is NEVER executed because x != 0 evaluates to false
        printf("Will not print\\n");
    } else {
        printf("Short-circuit safely prevented division by zero!\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

// Solved Example: Bitwise manipulation and parity
int main() {
    int num = 12; // Binary: 1100
    // Isolate lowest set bit: num & -num
    int lowestSetBit = num & -num; // 4 (0100)
    
    // Swap two variables without temporary variable using XOR
    int a = 25, b = 40;
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    
    cout << "Lowest set bit of 12: " << lowestSetBit << "\\n";
    cout << "Swapped a: " << a << ", b: " << b << "\\n";
    return 0;
}`,
      java: `public class OperatorsDemo {
    // Solved Example: Bitwise tricks and short-circuit guarding
    public static void main(String[] args) {
        int n = 32;
        boolean isPowerOf2 = (n > 0) && ((n & (n - 1)) == 0);
        System.out.println(n + " is power of 2: " + isPowerOf2);

        String text = null;
        // Short-circuit prevents NullPointerException
        if (text != null && text.length() > 0) {
            System.out.println("Length: " + text.length());
        } else {
            System.out.println("Safely handled null reference via short-circuit &&");
        }
    }
}`,
      python: `def operators_demo():
    # Power of two verification
    def is_power_of_two(n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0

    print("64 is power of 2:", is_power_of_two(64))
    print("18 is power of 2:", is_power_of_two(18))

    # Python short-circuit demonstration
    item = None
    if item is not None and len(item) > 0:
        print("Item length checked")
    else:
        print("Short-circuit safely skipped len(item) on None")

if __name__ == "__main__":
    operators_demo()`,
    },
  },
  {
    id: 'd1-note-3',
    title: '3. Conditions & Decision Control Flow',
    conceptSummary:
      'Decision control alters the sequential instruction pointer using `if-else` cascades, nested branches, and `switch-case` constructs. A common trap in C/C++/Java is forgetting the `break` statement in switch cases, causing unintended fall-through. In modern technical interviews, clean ternary operators and guard clauses (early returns) are preferred over deeply nested conditions.',
    timeSpaceNote: 'Branch Evaluation: O(1) Time | O(1) Space',
    kapilMentorTip:
      'Flatten nested `if` statements using guard clauses with early returns: test invalid edge cases at the very top of your function and return immediately.',
    codeByLanguage: {
      c: `#include <stdio.h>

// Solved Example: Leap Year calculation using clean guard conditions
int isLeapYear(int year) {
    if (year <= 0) return -1; // Guard clause: invalid input
    // Leap year rule: divisible by 4, not 100 unless also divisible by 400
    if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {
        return 1;
    }
    return 0;
}

int main() {
    int testYears[] = {2000, 2024, 2100, 2023};
    for (int i = 0; i < 4; i++) {
        printf("Year %d: %s\\n", testYears[i], isLeapYear(testYears[i]) ? "Leap Year" : "Common Year");
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

// Solved Example: Switch-case state transition with deliberate fall-through guard
enum class HttpStatus { OK = 200, NOT_FOUND = 404, SERVER_ERROR = 500 };

const char* describeStatus(HttpStatus status) {
    switch (status) {
        case HttpStatus::OK:
            return "200: Request Succeeded";
        case HttpStatus::NOT_FOUND:
            return "404: Resource Missing";
        case HttpStatus::SERVER_ERROR:
            return "500: Internal Server Error";
        default:
            return "Unknown Status Code";
    }
}

int main() {
    cout << describeStatus(HttpStatus::OK) << "\\n";
    cout << describeStatus(HttpStatus::NOT_FOUND) << "\\n";
    return 0;
}`,
      java: `public class ConditionsDemo {
    // Solved Example: Early return guard pattern
    public static String classifyTriangle(int a, int b, int c) {
        // Guard against degenerate triangles
        if (a <= 0 || b <= 0 || c <= 0 || (a + b <= c) || (a + c <= b) || (b + c <= a)) {
            return "Invalid Triangle";
        }
        if (a == b && b == c) return "Equilateral";
        if (a == b || b == c || a == c) return "Isosceles";
        return "Scalene";
    }

    public static void main(String[] args) {
        System.out.println(classifyTriangle(3, 3, 3));
        System.out.println(classifyTriangle(3, 4, 5));
        System.out.println(classifyTriangle(1, 2, 10)); // Invalid
    }
}`,
      python: `def classify_triangle(a: int, b: int, c: int) -> str:
    """Classifies triangle with early return guards."""
    if a <= 0 or b <= 0 or c <= 0:
        return "Invalid Triangle: side lengths must be positive"
    if a + b <= c or a + c <= b or b + c <= a:
        return "Invalid Triangle: violates triangle inequality"
    
    if a == b == c:
        return "Equilateral"
    if a == b or b == c or a == c:
        return "Isosceles"
    return "Scalene"

if __name__ == "__main__":
    print(classify_triangle(5, 5, 5))
    print(classify_triangle(5, 12, 13))
    print(classify_triangle(1, 2, 5))`,
    },
  },
  {
    id: 'd1-note-4',
    title: '4. Loops & Iteration Patterns',
    conceptSummary:
      'Loops execute a block of code repeatedly while a termination condition holds. `for` loops are suited for known iterations, while `while` loops handle state-dependent termination. To analyze time complexity: if step size is additive (`i += c`), iterations equal N/c -> O(N). If step size is multiplicative (`i *= 2`), iterations equal log2(N) -> O(log N). Off-by-one errors occur when bounds `<` vs `<=` are mixed.',
    timeSpaceNote: 'Additive Step: O(N) Time | Multiplicative Step: O(log N) Time | O(1) Space',
    kapilMentorTip:
      'Whenever analyzing a loop, write down the sequence of values of the loop variable: 1, 2, 4, 8, ... 2^k. Setting 2^k = N gives k = log2(N) iterations immediately.',
    codeByLanguage: {
      c: `#include <stdio.h>

// Solved Example: Digit extraction via while loop and multiplicative for-loop trace
int sumOfDigits(int n) {
    if (n < 0) n = -n;
    int sum = 0;
    while (n > 0) {
        sum += (n % 10);
        n /= 10; // Logarithmic progression: O(log10 N) iterations
    }
    return sum;
}

int main() {
    printf("Sum of digits of 9482: %d\\n", sumOfDigits(9482));
    
    // O(log2 N) loop progression
    int count = 0;
    for (int i = 1; i <= 64; i *= 2) {
        count++;
    }
    printf("Iterations for i *= 2 up to 64: %d\\n", count); // 7 iterations (1,2,4,8,16,32,64)
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

// Solved Example: Reversing an integer in-place without string conversion
int reverseInteger(int n) {
    int reversed = 0;
    while (n != 0) {
        int pop = n % 10;
        n /= 10;
        // Guard against 32-bit overflow
        if (reversed > INT32_MAX / 10 || (reversed == INT32_MAX / 10 && pop > 7)) return 0;
        if (reversed < INT32_MIN / 10 || (reversed == INT32_MIN / 10 && pop < -8)) return 0;
        reversed = reversed * 10 + pop;
    }
    return reversed;
}

int main() {
    cout << "Reversed 12345: " << reverseInteger(12345) << "\\n";
    cout << "Reversed -987: " << reverseInteger(-987) << "\\n";
    return 0;
}`,
      java: `public class LoopsDemo {
    // Solved Example: Counting loop iterations and invariant tracking
    public static void main(String[] args) {
        int n = 1000;
        int operations = 0;
        
        // Multiplicative step: O(log2 N)
        for (int i = 1; i < n; i *= 2) {
            operations++;
        }
        System.out.println("Operations for N=" + n + " with i*=2: " + operations); // 10 operations

        // Reversing digits
        int num = 45678, rev = 0;
        while (num > 0) {
            rev = rev * 10 + (num % 10);
            num /= 10;
        }
        System.out.println("Reversed number: " + rev);
    }
}`,
      python: `def loops_demo():
    # Solved Example: Digit reversal and complexity count
    def reverse_num(num: int) -> int:
        rev = 0
        sign = -1 if num < 0 else 1
        num = abs(num)
        while num > 0:
            rev = rev * 10 + (num % 10)
            num //= 10
        return sign * rev

    print("Reversed 83021:", reverse_num(83021))
    print("Reversed -5432:", reverse_num(-5432))

    # Trace log2(N) progression
    i = 1
    steps = 0
    while i <= 1024:
        steps += 1
        i *= 2
    print(f"Steps for i *= 2 up to 1024: {steps}")  # 11 steps

if __name__ == "__main__":
    loops_demo()`,
    },
  },
  {
    id: 'd1-note-5',
    title: '5. Functions, Call Stack & Parameter Passing',
    conceptSummary:
      'Functions encapsulate reusable logic. When a function is called, the CPU pushes a Stack Frame containing local variables, parameters, and the return address onto the call stack. In C, parameters are passed by value; pass-by-reference is simulated using pointers. In C++, references (`&`) provide native pass-by-reference. In Java, primitives are passed by value and object references are passed by value. In Python, arguments are passed by assignment (object reference).',
    timeSpaceNote: 'Function Call Overhead: O(1) Time | Stack Frame Allocation: O(1) Space',
    kapilMentorTip:
      'Never return the address of a local stack variable in C or C++. When the function returns, its stack frame is popped, leaving a dangling pointer pointing to corrupted memory.',
    codeByLanguage: {
      c: `#include <stdio.h>

// Solved Example: Pass-by-value failure vs Pass-by-pointer success
void swapByValue(int a, int b) {
    int temp = a;
    a = b;
    b = temp; // Only local copies swapped; caller sees NO change
}

void swapByPointer(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp; // Dereferencing swaps values directly at caller's addresses
}

int main() {
    int x = 10, y = 20;
    swapByValue(x, y);
    printf("After swapByValue: x=%d, y=%d (Unchanged!)\\n", x, y);
    
    swapByPointer(&x, &y);
    printf("After swapByPointer: x=%d, y=%d (Swapped!)\\n", x, y);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

// Solved Example: C++ Reference Parameters
void swapByRef(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int u = 100, v = 500;
    swapByRef(u, v);
    cout << "After swapByRef: u=" << u << ", v=" << v << "\\n";
    return 0;
}`,
      java: `public class FunctionsDemo {
    // In Java: Object references are passed by value
    static class Box { int value; Box(int v) { this.value = v; } }

    public static void modifyBox(Box b) {
        b.value = 999; // Mutates the object referenced by caller
    }

    public static void reassignBox(Box b) {
        b = new Box(0); // Reassigns only the local reference copy; caller unchanged!
    }

    public static void main(String[] args) {
        Box box = new Box(42);
        modifyBox(box);
        System.out.println("After modifyBox: " + box.value); // 999
        reassignBox(box);
        System.out.println("After reassignBox: " + box.value); // Still 999!
    }
}`,
      python: `def functions_parameter_demo():
    # Pass-by-object-reference:
    # Immutable objects (int, str, tuple) cannot be mutated in place
    # Mutable objects (list, dict, set) are mutated in place
    def mutate_list(lst):
        lst.append(999)

    def reassign_list(lst):
        lst = [1, 2, 3]  # Rebinds local variable; caller unaffected

    my_list = [10, 20]
    mutate_list(my_list)
    print("After mutate_list:", my_list)  # [10, 20, 999]
    reassign_list(my_list)
    print("After reassign_list:", my_list)  # Still [10, 20, 999]

if __name__ == "__main__":
    functions_parameter_demo()`,
    },
  },
  {
    id: 'd1-note-6',
    title: '6. Arrays & Contiguous Memory Manipulation',
    conceptSummary:
      'An array stores elements of identical type in contiguous memory blocks. Element access at index i is calculated via base pointer arithmetic: `Address(A[i]) = BaseAddress + i * sizeof(Element)` which executes in strict O(1) time. Key array patterns include in-place two-pointer traversal, prefix sums, and sliding windows. Out-of-bounds indices result in undefined behavior in C/C++ and runtime exceptions in Java/Python.',
    timeSpaceNote: 'Index Access: O(1) Time | Linear Traversal: O(N) Time | Auxiliary Space: O(1)',
    kapilMentorTip:
      'When reversing an array or checking for palindromes, always prefer two pointers (`left = 0, right = n - 1`) meeting in the center: it cuts iterations in half (N/2) and uses zero extra memory.',
    codeByLanguage: {
      c: `#include <stdio.h>

// Solved Example: In-place two-pointer array reversal
void reverseArray(int arr[], int n) {
    int left = 0, right = n - 1;
    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}

int main() {
    int arr[] = {11, 22, 33, 44, 55};
    int n = sizeof(arr) / sizeof(arr[0]);
    reverseArray(arr, n);
    printf("Reversed: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

// Solved Example: In-place Prefix Sum computation
void computePrefixSums(vector<int>& nums) {
    for (size_t i = 1; i < nums.size(); i++) {
        nums[i] += nums[i - 1]; // In-place prefix sum: O(N) Time, O(1) Space
    }
}

int main() {
    vector<int> nums = {2, 4, 6, 8, 10};
    computePrefixSums(nums);
    cout << "Prefix Sums: ";
    for (int v : nums) cout << v << " ";
    cout << "\\n";
    return 0;
}`,
      java: `public class ArraysDemo {
    // Solved Example: Two-pointer reversal
    public static void reverse(int[] arr) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        int[] data = {1, 3, 5, 7, 9};
        reverse(data);
        for (int x : data) System.out.print(x + " ");
        System.out.println();
    }
}`,
      python: `def array_two_pointer_demo():
    # Solved Example: In-place list reversal
    arr = [10, 20, 30, 40, 50]
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    print("Reversed list:", arr)

if __name__ == "__main__":
    array_two_pointer_demo()`,
    },
  },
  {
    id: 'd1-note-7',
    title: '7. Strings & Character Array Processing',
    conceptSummary:
      "In C, strings are null-terminated character arrays (`char[]` ending with `\\0`), requiring N+1 bytes. In C++, `std::string` manages dynamic buffers with automatic null-termination and size tracking. In Java and Python, strings are IMMUTABLE: every concatenation with `+` in a loop creates a new object in memory, leading to accidental O(N²) time complexity. In Java use `StringBuilder`, and in Python use `''.join(list)`.",
    timeSpaceNote: 'String Length: O(N) Time | Character Access: O(1) Time | Immutable Concat in Loop: O(N²) Time',
    kapilMentorTip:
      'Never concatenate strings in a loop using `str += ch`. In Java, always use `StringBuilder`; in Python, append to a list and use `"".join(chars)` to ensure linear O(N) performance.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

// Solved Example: Palindrome check on null-terminated char array
bool isPalindrome(const char *s) {
    int left = 0;
    int right = strlen(s) - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}

int main() {
    char word1[] = "racecar";
    char word2[] = "spsu";
    printf("'%s' is palindrome: %s\\n", word1, isPalindrome(word1) ? "YES" : "NO");
    printf("'%s' is palindrome: %s\\n", word2, isPalindrome(word2) ? "YES" : "NO");
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

// Solved Example: Case-insensitive Palindrome
bool isValidPalindrome(const string& s) {
    int left = 0, right = (int)s.size() - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) return false;
        left++;
        right--;
    }
    return true;
}

int main() {
    string text = "A man, a plan, a canal: Panama";
    cout << "Is valid palindrome: " << (isValidPalindrome(text) ? "YES" : "NO") << "\\n";
    return 0;
}`,
      java: `public class StringsDemo {
    // Solved Example: Efficient O(N) string construction using StringBuilder
    public static String buildRepeatedPattern(String base, int times) {
        StringBuilder sb = new StringBuilder(); // O(N) total Time
        for (int i = 0; i < times; i++) {
            sb.append(base);
        }
        return sb.toString();
    }

    public static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left++) != s.charAt(right--)) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("Palindrome test: " + isPalindrome("level"));
        System.out.println("Pattern length: " + buildRepeatedPattern("SPSU", 5).length());
    }
}`,
      python: `def strings_demo():
    # Solved Example: Palindrome verification and efficient join
    def is_palindrome(s: str) -> bool:
        # Filter alphanumeric and lowercase
        cleaned = [ch.lower() for ch in s if ch.isalnum()]
        return cleaned == cleaned[::-1]

    # Efficient string building: O(N) using join
    tokens = ["SPSU", "Placement", "Mentorship", "By", "Kapil"]
    result = " • ".join(tokens)
    
    print("Is 'Was it a car or a cat I saw?' palindrome:", is_palindrome("Was it a car or a cat I saw?"))
    print("Formatted Banner:", result)

if __name__ == "__main__":
    strings_demo()`,
    },
  },
  {
    id: 'd1-note-8',
    title: '8. Recursion & Call Stack Tracing',
    conceptSummary:
      'Recursion solves a problem by having a function call itself with smaller sub-inputs until reaching a terminating base case. Every recursive call pushes a stack frame onto the system call stack. If the base case is unreachable or omitted, stack frames accumulate indefinitely until Stack Overflow occurs. Converting naive O(2^N) recursion into logarithmic O(log N) divide-and-conquer (e.g. Fast Power) is a fundamental algorithmic optimization.',
    timeSpaceNote: 'Fast Power: O(log N) Time | O(log N) Call Stack Depth Space',
    kapilMentorTip:
      'In any recursive function, write the base case condition FIRST before writing any recursive call. Never leave base cases until the end of the block.',
    codeByLanguage: {
      c: `#include <stdio.h>

// Solved Example: Fast Modular Exponentiation: O(log N) Time and Stack Space
long long fastPower(long long base, long long exp, long long mod) {
    if (mod == 0) return -1; // Guard against division by zero
    if (exp == 0) return 1 % mod; // Base case: base^0 = 1
    
    long long half = fastPower(base, exp / 2, mod);
    long long result = (half * half) % mod;
    
    if (exp % 2 == 1) {
        result = (result * (base % mod)) % mod;
    }
    return result;
}

int main() {
    // 2^10 % 1000 = 1024 % 1000 = 24 in 4 recursive steps instead of 10
    printf("fastPower(2, 10, 1000) = %lld\\n", fastPower(2, 10, 1000));
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

// Solved Example: Fibonacci comparison: Naive vs Memoized Call Stack
int fibCount = 0;
int fibMemo(int n, int memo[]) {
    fibCount++;
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
}

int main() {
    int memo[50];
    for (int i = 0; i < 50; i++) memo[i] = -1;
    cout << "Fib(10): " << fibMemo(10, memo) << "\\n";
    cout << "Total recursive calls with memoization: " << fibCount << "\\n"; // Only 19 calls!
    return 0;
}`,
      java: `public class RecursionDemo {
    // Solved Example: Fast Binary Exponentiation
    public static long power(long base, long exp) {
        if (exp == 0) return 1;
        long half = power(base, exp / 2);
        return (exp % 2 == 0) ? (half * half) : (half * half * base);
    }

    public static void main(String[] args) {
        System.out.println("2^16 = " + power(2, 16)); // 65536 in log2(16) = 4 steps
    }
}`,
      python: `def recursion_demo():
    # Solved Example: Fast power via divide-and-conquer
    def fast_pow(base: int, exp: int) -> int:
        if exp == 0:
            return 1
        half = fast_pow(base, exp // 2)
        return half * half if exp % 2 == 0 else half * half * base

    print("3^7 =", fast_pow(3, 7)) # 2187 in 3 recursive steps

if __name__ == "__main__":
    recursion_demo()`,
    },
  },
  {
    id: 'd1-note-9',
    title: '9. Input/Output (I/O) & Formatting',
    conceptSummary:
      'Standard I/O transfers data between your program and terminal streams (`stdin`, `stdout`, `stderr`). In C/C++, `scanf`/`cin` can leave trailing newline (`\\n`) characters in the input buffer, causing subsequent string reads (`fgets`/`getline`) to read an empty line immediately. In competitive programming, untying C++ streams via `ios_base::sync_with_stdio(false); cin.tie(NULL);` prevents synchronous flushing of C stdio buffers, reducing I/O time from seconds to milliseconds.',
    timeSpaceNote: 'Buffered I/O: O(1) Amortized per character read | O(Buffer Size) Memory',
    kapilMentorTip:
      'Always clear or consume trailing newline characters after reading numbers before calling line-reading functions like `getline()` or `input()`.',
    codeByLanguage: {
      c: `#include <stdio.h>

// Solved Example: Correctly consuming newline buffer before string input
int main() {
    int age = 21;
    char name[50] = "Kapil Narula";
    
    // Formatted output with precision and width control
    printf("Learner: %-15s | Age: %03d | Score: %6.2f%%\\n", name, age, 98.75);
    return 0;
}`,
      cpp: `#include <iostream>
#include <iomanip>
using namespace std;

// Solved Example: Fast I/O and stream formatting
int main() {
    // Fast I/O configuration for competitive programming
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    double pi = 3.1415926535;
    cout << "Formatted PI: " << fixed << setprecision(3) << pi << "\\n";
    return 0;
}`,
      java: `import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class FastIODemo {
    // Solved Example: Fast I/O via BufferedReader
    public static void main(String[] args) throws IOException {
        // BufferedReader is 10x faster than Scanner for 10^5 inputs
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        System.out.printf("Formatted output: ID=%05d, Ratio=%.4f%n", 42, 0.98765);
    }
}`,
      python: `import sys

def fast_io_demo():
    # Fast I/O via sys.stdin.readline
    # Output formatting using f-strings
    score = 94.6789
    name = "Kapil"
    print(f"Learner: {name:<10} | Score: {score:6.2f}%")

if __name__ == "__main__":
    fast_io_demo()`,
    },
  },
  {
    id: 'd1-note-10',
    title: '10. Exceptions & Safe Error Handling',
    conceptSummary:
      'Exceptions represent abnormal conditions during program execution (e.g. division by zero, null pointer dereference, out-of-bounds array access, file not found). Structured exception handling (`try`, `catch`, `finally` / `except`) allows programs to intercept runtime faults and recover gracefully rather than crashing abruptly. The `finally` block in Java/Python is guaranteed to run, making it ideal for closing database connections, file handles, and network sockets.',
    timeSpaceNote: 'Zero-Cost Exceptions on normal path | Modest stack unwinding latency on throw',
    kapilMentorTip:
      'Never write an empty `catch (Exception e) {}` block that silently swallows errors. Always log the error message or rethrow; silent failures make debugging in production nearly impossible.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>

// In C: Exceptions are handled via return error codes and status flags
bool safeDivide(int numerator, int denominator, double *result) {
    if (denominator == 0) {
        return false; // Error condition reported safely without hardware trap
    }
    *result = (double)numerator / denominator;
    return true;
}

int main() {
    double res;
    if (safeDivide(10, 0, &res)) {
        printf("Result: %.2f\\n", res);
    } else {
        printf("Safe Error Handling: Division by zero caught and prevented!\\n");
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <stdexcept>
using namespace std;

// Solved Example: C++ try-catch with std::runtime_error
double safeDivide(double num, double den) {
    if (den == 0.0) {
        throw runtime_error("Math Error: Division by zero is prohibited");
    }
    return num / den;
}

int main() {
    try {
        cout << "10 / 2 = " << safeDivide(10, 2) << "\\n";
        cout << "10 / 0 = " << safeDivide(10, 0) << "\\n";
    } catch (const exception& e) {
        cerr << "Caught Exception: " << e.what() << "\\n";
    }
    return 0;
}`,
      java: `public class ExceptionsDemo {
    // Solved Example: try-catch-finally block
    public static int parseAndDivide(String input, int divisor) {
        try {
            int num = Integer.parseInt(input);
            return num / divisor;
        } catch (NumberFormatException e) {
            System.err.println("Invalid numeric format: " + e.getMessage());
            return -1;
        } catch (ArithmeticException e) {
            System.err.println("Arithmetic failure: " + e.getMessage());
            return -1;
        } finally {
            System.out.println("Finally block executed for resource cleanup");
        }
    }

    public static void main(String[] args) {
        parseAndDivide("40", 2);
        parseAndDivide("40", 0);
    }
}`,
      python: `def exceptions_demo():
    # Solved Example: try-except-finally in Python
    def safe_divide(a: float, b: float) -> float:
        try:
            return a / b
        except ZeroDivisionError as e:
            print(f"Error intercepted: {e}")
            return float('nan')
        finally:
            print("Cleanup complete (finally)")

    print("Result 10 / 2:", safe_divide(10, 2))
    print("Result 10 / 0:", safe_divide(10, 0))

if __name__ == "__main__":
    exceptions_demo()`,
    },
  },
  {
    id: 'd1-note-11',
    title: '11. Code Tracing, Debugging & Introductory Complexity',
    conceptSummary:
      'Code tracing is manually stepping through code line-by-line using a Variable State Table to track variable values across loop iterations and function calls. Asymptotic notation describes how runtime or memory scales as input size N grows to infinity: O(1) Constant, O(log N) Logarithmic, O(N) Linear, O(N log N) Linearithmic, and O(N^2) Quadratic. Auxiliary Space measures extra memory allocated excluding the input data itself.',
    timeSpaceNote: 'Binary Search: O(log N) Time | Linear Search: O(N) Time | Nested Pairs: O(N²) Time',
    kapilMentorTip:
      'Before writing code in an interview, draw a 3-column table: [Step, Variables, Condition]. Tracing on a tiny sample input (e.g. N = 3) catches 95% of off-by-one errors before running the compiler.',
    codeByLanguage: {
      c: `#include <stdio.h>

// Solved Example: Step-by-step tracing of Binary Search: O(log N) Time, O(1) Space
int binarySearchTrace(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    int step = 1;
    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevents overflow
        printf("Step %d: low=%d, high=%d, mid=%d, arr[mid]=%d\\n", step++, low, high, mid, arr[mid]);
        
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 23;
    int idx = binarySearchTrace(arr, n, target);
    printf("Found target %d at index %d\\n", target, idx);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

// Solved Example: Loop Complexity Comparison (O(log N) vs O(N))
int main() {
    int n = 16;
    int logSteps = 0, linearSteps = 0;
    
    // O(log N) loop
    for (int i = 1; i <= n; i *= 2) {
        logSteps++;
    }
    
    // O(N) loop
    for (int i = 1; i <= n; i++) {
        linearSteps++;
    }
    
    cout << "For N = " << n << ":\\n";
    cout << "O(log N) steps: " << logSteps << "\\n"; // 5 steps (1, 2, 4, 8, 16)
    cout << "O(N) steps:     " << linearSteps << "\\n"; // 16 steps
    return 0;
}`,
      java: `public class ComplexityTraceDemo {
    // Solved Example: Trace table for Equilibrium Index: O(N) Time, O(1) Space
    public static int findEquilibriumTrace(int[] arr) {
        int totalSum = 0;
        for (int x : arr) totalSum += x;

        int leftSum = 0;
        for (int i = 0; i < arr.length; i++) {
            int rightSum = totalSum - leftSum - arr[i];
            System.out.printf("i=%d, val=%d, leftSum=%d, rightSum=%d%n", i, arr[i], leftSum, rightSum);
            if (leftSum == rightSum) return i;
            leftSum += arr[i];
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] data = {1, 7, 3, 6, 5, 6};
        int pivot = findEquilibriumTrace(data);
        System.out.println("Equilibrium pivot found at index: " + pivot);
    }
}`,
      python: `def complexity_trace_demo():
    # Solved Example: Trace table for finding maximum element
    nums = [14, 28, 9, 45, 33]
    max_val = nums[0]
    print(f"Initial: max_val = {max_val}")

    for idx in range(1, len(nums)):
        val = nums[idx]
        if val > max_val:
            print(f"Step {idx}: nums[{idx}]={val} > {max_val} -> UPDATED max_val={val}")
            max_val = val
        else:
            print(f"Step {idx}: nums[{idx}]={val} <= {max_val} -> NO CHANGE")

    print(f"Final Maximum: {max_val} (Found in O(N) Time and O(1) Space)")

if __name__ == "__main__":
    complexity_trace_demo()`,
    },
  },
];
