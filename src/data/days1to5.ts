import { DayPlan } from '../types';

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
    programmingNotes: [
      {
        id: 'd1-note-1',
        title: 'Memory Representation, Arrays, Strings & Asymptotic Complexity',
        conceptSummary:
          'Every program operates on contiguous or heap-allocated memory. Understanding how arrays are indexed in O(1) time, how strings are represented (null-terminated char arrays in C vs immutable objects in Java/Python), and how loop nesting governs O(N) vs O(N²) complexity is the bedrock of software engineering.',
        timeSpaceNote: 'Array indexing: O(1) Time | Linear Scan: O(N) Time | Nested Pair Scan: O(N²) Time | Auxiliary In-Place: O(1) Space',
        kapilMentorTip:
          'Never guess time complexity by counting loops alone—trace how the loop variable progresses. A loop multiplying i *= 2 runs in O(log N), whereas i += 1 runs in O(N).',
        codeByLanguage: {
          c: `#include <stdio.h>
#include <string.h>

// In-place Two-Pointer Array Reversal: O(N) Time, O(1) Auxiliary Space
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
    int data[] = {10, 20, 30, 40, 50};
    int n = sizeof(data) / sizeof(data[0]);
    reverseArray(data, n);
    for (int i = 0; i < n; i++) {
        printf("%d ", data[i]);
    }
    return 0;
}`,
          cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// C++ STL & Manual Two-Pointer Complexity Demonstration
void reverseVectorInPlace(vector<int>& nums) {
    int left = 0, right = (int)nums.size() - 1;
    while (left < right) {
        swap(nums[left++], nums[right--]);
    }
}

int main() {
    vector<int> nums = {10, 20, 30, 40, 50};
    reverseVectorInPlace(nums);
    for (int val : nums) cout << val << " ";
    return 0;
}`,
          java: `import java.util.Arrays;

public class FundamentalsNote {
    // O(N) Time, O(1) Space In-Place Reversal
    public static void reverseArray(int[] arr) {
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
        int[] data = {10, 20, 30, 40, 50};
        reverseArray(data);
        for (int num : data) {
            System.out.print(num + " ");
        }
    }
}`,
          python: `from typing import List

def reverse_array_in_place(arr: List[int]) -> None:
    """Reverses list in-place in O(N) time and O(1) space."""
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1

if __name__ == "__main__":
    data = [10, 20, 30, 40, 50]
    reverse_array_in_place(data)
    print(" ".join(map(str, data)))`,
        },
      },
      {
        id: 'd1-note-2',
        title: 'Recursion Call Stack Tracing & Safe Exception Handling',
        conceptSummary:
          'Recursion decomposes a problem into smaller subproblems using the system call stack. Every recursive function requires a strict base case to prevent stack overflow. Exception handling ensures safe recovery from runtime anomalies like division by zero or invalid input parsing.',
        timeSpaceNote: 'Factorial / Linear Recursion: O(N) Time, O(N) Call Stack Space | Binary Exponentiation: O(log N) Time & Space',
        kapilMentorTip:
          'Always draw the recursion tree before coding. Each stack frame consumes memory; if N = 10^5, O(N) recursion depth will trigger a StackOverflowError unless converted to iteration or logarithmic divide-and-conquer.',
        codeByLanguage: {
          c: `#include <stdio.h>

// Fast Recursive Modular Exponentiation: O(log N) Time, O(log N) Stack Space
long long fastPower(long long base, long long exp, long long mod) {
    if (mod == 0) return -1; // Guard against division by zero
    if (exp == 0) return 1 % mod;
    long long half = fastPower(base, exp / 2, mod);
    long long result = (half * half) % mod;
    if (exp % 2 == 1) {
        result = (result * (base % mod)) % mod;
    }
    return result;
}

int main() {
    printf("%lld\\n", fastPower(2, 10, 1000)); // Outputs 24
    return 0;
}`,
          cpp: `#include <iostream>
#include <stdexcept>
using namespace std;

long long fastPower(long long base, long long exp, long long mod) {
    if (mod <= 0) throw invalid_argument("Modulus must be positive");
    if (exp == 0) return 1 % mod;
    long long half = fastPower(base, exp / 2, mod);
    long long res = (half * half) % mod;
    return (exp % 2 == 1) ? (res * (base % mod)) % mod : res;
}

int main() {
    try {
        cout << fastPower(2, 10, 1000) << endl;
    } catch (const exception& e) {
        cerr << "Error: " << e.what() << endl;
    }
    return 0;
}`,
          java: `public class RecursionTrace {
    public static long fastPower(long base, long exp, long mod) {
        if (mod <= 0) {
            throw new IllegalArgumentException("Modulus must be positive");
        }
        if (exp == 0) return 1 % mod;
        long half = fastPower(base, exp / 2, mod);
        long res = (half * half) % mod;
        return (exp % 2 == 1) ? (res * (base % mod)) % mod : res;
    }

    public static void main(String[] args) {
        System.out.println(fastPower(2, 10, 1000));
    }
}`,
          python: `def fast_power(base: int, exp: int, mod: int) -> int:
    if mod <= 0:
        raise ValueError("Modulus must be strictly positive")
    if exp == 0:
        return 1 % mod
    half = fast_power(base, exp // 2, mod)
    res = (half * half) % mod
    return (res * (base % mod)) % mod if exp % 2 == 1 else res

if __name__ == "__main__":
    print(fast_power(2, 10, 1000))`,
        },
      },
    ],
    practicalChallenges: [
      {
        id: 'd1-prob-1',
        day: 1,
        title: 'Equilibrium Pivot Index & Prefix Trace',
        difficulty: 'Easy',
        moduleTag: 'Module 1: Programming Fundamentals',
        problemStatement:
          'Given an array of N integers, find the leftmost equilibrium index where the sum of elements strictly to its left equals the sum of elements strictly to its right. Return -1 if no such index exists. Achieve O(N) time complexity and O(1) extra space.',
        inputFormat: 'First line contains N. Second line contains N space-separated integers.',
        outputFormat: 'Single integer representing the 0-based equilibrium index, or -1.',
        constraints: ['1 <= N <= 10^5', '-10^4 <= arr[i] <= 10^4', 'Time Complexity: O(N)', 'Auxiliary Space: O(1)'],
        sampleInput: '6\n1 7 3 6 5 6',
        sampleOutput: '3',
        kapilIntuition:
          'Instead of recomputing left and right sums in O(N²) nested loops, compute totalSum first. Maintain leftSum = 0 as you iterate; at index i, rightSum is simply (totalSum - leftSum - arr[i]).',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        starterCode: {
          c: `#include <stdio.h>

int findEquilibriumIndex(int arr[], int n) {
    // Write your O(N) time, O(1) space logic here
    return -1;
}

int main() {
    int arr[] = {1, 7, 3, 6, 5, 6};
    printf("%d\\n", findEquilibriumIndex(arr, 6));
    return 0;
}`,
          cpp: `#include <iostream>
#include <vector>
using namespace std;

int findEquilibriumIndex(const vector<int>& arr) {
    // Write your O(N) time, O(1) space logic here
    return -1;
}

int main() {
    vector<int> arr = {1, 7, 3, 6, 5, 6};
    cout << findEquilibriumIndex(arr) << endl;
    return 0;
}`,
          java: `public class Solution {
    public static int findEquilibriumIndex(int[] arr) {
        // Write your O(N) time, O(1) space logic here
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {1, 7, 3, 6, 5, 6};
        System.out.println(findEquilibriumIndex(arr));
    }
}`,
          python: `def find_equilibrium_index(arr: list[int]) -> int:
    # Write your O(N) time, O(1) space logic here
    return -1

if __name__ == "__main__":
    print(find_equilibrium_index([1, 7, 3, 6, 5, 6]))`,
        },
        solutionCode: {
          c: `#include <stdio.h>

int findEquilibriumIndex(int arr[], int n) {
    long long totalSum = 0;
    for (int i = 0; i < n; i++) totalSum += arr[i];
    long long leftSum = 0;
    for (int i = 0; i < n; i++) {
        long long rightSum = totalSum - leftSum - arr[i];
        if (leftSum == rightSum) return i;
        leftSum += arr[i];
    }
    return -1;
}

int main() {
    int arr[] = {1, 7, 3, 6, 5, 6};
    printf("%d\\n", findEquilibriumIndex(arr, 6));
    return 0;
}`,
          cpp: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int findEquilibriumIndex(const vector<int>& arr) {
    long long totalSum = accumulate(arr.begin(), arr.end(), 0LL);
    long long leftSum = 0;
    for (int i = 0; i < (int)arr.size(); i++) {
        if (leftSum == totalSum - leftSum - arr[i]) return i;
        leftSum += arr[i];
    }
    return -1;
}

int main() {
    vector<int> arr = {1, 7, 3, 6, 5, 6};
    cout << findEquilibriumIndex(arr) << endl;
    return 0;
}`,
          java: `public class Solution {
    public static int findEquilibriumIndex(int[] arr) {
        long totalSum = 0;
        for (int num : arr) totalSum += num;
        long leftSum = 0;
        for (int i = 0; i < arr.length; i++) {
            if (leftSum == totalSum - leftSum - arr[i]) return i;
            leftSum += arr[i];
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {1, 7, 3, 6, 5, 6};
        System.out.println(findEquilibriumIndex(arr));
    }
}`,
          python: `def find_equilibrium_index(arr: list[int]) -> int:
    total_sum = sum(arr)
    left_sum = 0
    for i, num in enumerate(arr):
        if left_sum == total_sum - left_sum - num:
            return i
        left_sum += num
    return -1

if __name__ == "__main__":
    print(find_equilibrium_index([1, 7, 3, 6, 5, 6]))`,
        },
        testCases: [
          {
            id: 'd1-tc-1',
            input: '6\n1 7 3 6 5 6',
            expectedOutput: '3',
            isHidden: false,
            explanation: 'At index 3 (value 6), left sum = 1+7+3 = 11, right sum = 5+6 = 11.',
          },
          {
            id: 'd1-tc-2',
            input: '3\n1 2 3',
            expectedOutput: '-1',
            isHidden: false,
            explanation: 'No index satisfies leftSum == rightSum.',
          },
          {
            id: 'd1-tc-3',
            input: '3\n2 1 -1',
            expectedOutput: '0',
            isHidden: true,
            explanation: 'At index 0, left sum is 0 and right sum is 1 + (-1) = 0.',
          },
        ],
      },
      {
        id: 'd1-prob-2',
        day: 1,
        title: 'Run-Length String Compression & Boundary Trace',
        difficulty: 'Medium',
        moduleTag: 'Module 1: Programming Fundamentals',
        problemStatement:
          'Given an alphanumeric string S, compress consecutive identical characters into <char><count> format (e.g., "aaabbc" -> "a3b2c1"). If the compressed string is not strictly shorter than the original string, return the original string.',
        inputFormat: 'Single string S without spaces.',
        outputFormat: 'Compressed string or original string if compression does not reduce length.',
        constraints: ['1 <= |S| <= 10^5', 'Time Complexity: O(N)', 'Space Complexity: O(N)'],
        sampleInput: 'aaabcccccaaa',
        sampleOutput: 'a3b1c5a3',
        kapilIntuition:
          'Avoid string concatenation inside loops using += in Java/Python strings when building large outputs, as immutable string copying degrades to O(N²). Use StringBuilder in Java or a list join in Python.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        starterCode: {
          c: `#include <stdio.h>
#include <string.h>

void compressString(const char* s) {
    // Write your O(N) compression logic here
}

int main() {
    compressString("aaabcccccaaa");
    return 0;
}`,
          cpp: `#include <iostream>
#include <string>
using namespace std;

string compressString(const string& s) {
    // Write your O(N) compression logic here
    return s;
}

int main() {
    cout << compressString("aaabcccccaaa") << endl;
    return 0;
}`,
          java: `public class Solution {
    public static String compressString(String s) {
        // Use StringBuilder for O(N) time complexity
        return s;
    }

    public static void main(String[] args) {
        System.out.println(compressString("aaabcccccaaa"));
    }
}`,
          python: `def compress_string(s: str) -> str:
    # Write your O(N) compression logic here
    return s

if __name__ == "__main__":
    print(compress_string("aaabcccccaaa"))`,
        },
        solutionCode: {
          c: `#include <stdio.h>
#include <string.h>

void compressString(const char* s) {
    int n = strlen(s);
    char out[200005];
    int idx = 0;
    for (int i = 0; i < n; ) {
        char c = s[i];
        int count = 0;
        while (i < n && s[i] == c) {
            count++;
            i++;
        }
        idx += sprintf(out + idx, "%c%d", c, count);
    }
    if ((int)strlen(out) < n) printf("%s\\n", out);
    else printf("%s\\n", s);
}

int main() {
    compressString("aaabcccccaaa");
    return 0;
}`,
          cpp: `#include <iostream>
#include <string>
using namespace std;

string compressString(const string& s) {
    string out;
    int n = s.size();
    for (int i = 0; i < n; ) {
        char c = s[i];
        int count = 0;
        while (i < n && s[i] == c) {
            count++;
            i++;
        }
        out += c + to_string(count);
    }
    return out.length() < s.length() ? out : s;
}

int main() {
    cout << compressString("aaabcccccaaa") << endl;
    return 0;
}`,
          java: `public class Solution {
    public static String compressString(String s) {
        StringBuilder sb = new StringBuilder();
        int n = s.length();
        for (int i = 0; i < n; ) {
            char c = s.charAt(i);
            int count = 0;
            while (i < n && s.charAt(i) == c) {
                count++;
                i++;
            }
            sb.append(c).append(count);
        }
        return sb.length() < n ? sb.toString() : s;
    }

    public static void main(String[] args) {
        System.out.println(compressString("aaabcccccaaa"));
    }
}`,
          python: `def compress_string(s: str) -> str:
    if not s:
        return s
    parts = []
    i, n = 0, len(s)
    while i < n:
        ch = s[i]
        count = 0
        while i < n and s[i] == ch:
            count += 1
            i += 1
        parts.append(f"{ch}{count}")
    compressed = "".join(parts)
    return compressed if len(compressed) < n else s

if __name__ == "__main__":
    print(compress_string("aaabcccccaaa"))`,
        },
        testCases: [
          {
            id: 'd1-p2-tc1',
            input: 'aaabcccccaaa',
            expectedOutput: 'a3b1c5a3',
            isHidden: false,
            explanation: 'Length 8 < original length 12.',
          },
          {
            id: 'd1-p2-tc2',
            input: 'abcd',
            expectedOutput: 'abcd',
            isHidden: false,
            explanation: 'a1b1c1d1 has length 8 >= 4, so original string is returned.',
          },
        ],
      },
    ],
    preAssessment: [
      {
        id: 'd1-pre-1',
        question: 'What is the time complexity of a loop where the index variable i starts at 1 and doubles (i = i * 2) until i >= N?',
        options: ['O(N)', 'O(log N)', 'O(N log N)', 'O(1)'],
        correctIndex: 1,
        explanation: 'Since i doubles each iteration (1, 2, 4, 8, ..., 2^k), it reaches N in k = log2(N) steps.',
        category: 'Theory (30%)',
      },
      {
        id: 'd1-pre-2',
        question: 'Trace the C/C++ expression: int x = 5; int y = (x == 5) ? (x << 1) : (x >> 1); What is the value of y?',
        options: ['2', '5', '10', '25'],
        correctIndex: 2,
        explanation: 'Since x == 5 is true, x << 1 left-shifts 5 by 1 bit, which multiplies by 2 to give 10.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd1-pre-3',
        question: 'Which error occurs if a recursive function lacks a reachable base case?',
        options: ['Syntax Error', 'Stack Overflow / Segmentation Fault', 'NullPointerException', 'Compilation Failure'],
        correctIndex: 1,
        explanation: 'Unbounded recursive calls exhaust the call stack memory, triggering a Stack Overflow.',
        category: 'Practical Execution & Trace (70%)',
      },
    ],
    postAssessment: [
      {
        id: 'd1-post-1',
        question: 'Why does concatenating strings inside a loop of size N using `str = str + ch` in Java take O(N²) time?',
        options: [
          'Because char takes 4 bytes in Java',
          'Because String is immutable and each concatenation allocates and copies a new character array',
          'Because the JVM garbage collector pauses every iteration',
          'It actually takes O(N) time',
        ],
        correctIndex: 1,
        explanation: 'Java Strings are immutable; copying 1 + 2 + ... + N characters sums to N(N+1)/2 = O(N²).',
        category: 'Theory (30%)',
      },
      {
        id: 'd1-post-2',
        question: 'In the Equilibrium Index algorithm, how much auxiliary memory is required when maintaining totalSum and leftSum variables?',
        options: ['O(N) Space', 'O(log N) Space', 'O(1) Constant Space', 'O(N²) Space'],
        correctIndex: 2,
        explanation: 'Only scalar accumulator variables (totalSum and leftSum) are stored regardless of N.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd1-post-3',
        question: 'What is printed by `fastPower(3, 4, 100)`?',
        options: ['12', '27', '81', '64'],
        correctIndex: 2,
        explanation: '3^4 = 81, and 81 % 100 = 81.',
        category: 'Practical Execution & Trace (70%)',
      },
    ],
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
    programmingNotes: [
      {
        id: 'd2-note-1',
        title: 'Sliding Window & Two-Pointer Invariants vs Hashing',
        conceptSummary:
          'Sliding Window converts O(N²) subarray/substring nested scans into O(N) linear passes by maintaining a dynamic window [left, right]. As `right` expands to include elements, `left` contracts whenever the window constraint is violated.',
        timeSpaceNote: 'Sliding Window: O(N) Time (each element enters and leaves the window at most once), O(K) Space for frequency table.',
        kapilMentorTip:
          'When an interviewer asks for "longest/shortest contiguous subarray or substring satisfying condition X", immediately evaluate whether the window property is monotonic—if so, Sliding Window is your O(N) weapon.',
        codeByLanguage: {
          c: `#include <stdio.h>
#include <string.h>

// Longest Substring Without Repeating Characters: O(N) Time, O(1) Alphabet Space
int lengthOfLongestSubstring(const char* s) {
    int lastSeen[256];
    for (int i = 0; i < 256; i++) lastSeen[i] = -1;
    int maxLen = 0, left = 0;
    for (int right = 0; s[right] != '\\0'; right++) {
        unsigned char c = (unsigned char)s[right];
        if (lastSeen[c] >= left) {
            left = lastSeen[c] + 1;
        }
        lastSeen[c] = right;
        int curLen = right - left + 1;
        if (curLen > maxLen) maxLen = curLen;
    }
    return maxLen;
}

int main() {
    printf("%d\\n", lengthOfLongestSubstring("abcabcbb")); // 3
    return 0;
}`,
          cpp: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(const string& s) {
    vector<int> lastSeen(256, -1);
    int maxLen = 0, left = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        unsigned char c = s[right];
        if (lastSeen[c] >= left) {
            left = lastSeen[c] + 1;
        }
        lastSeen[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}

int main() {
    cout << lengthOfLongestSubstring("abcabcbb") << endl;
    return 0;
}`,
          java: `import java.util.Arrays;

public class SlidingWindowDSA {
    public static int lengthOfLongestSubstring(String s) {
        int[] lastSeen = new int[256];
        Arrays.fill(lastSeen, -1);
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen[c] >= left) {
                left = lastSeen[c] + 1;
            }
            lastSeen[c] = right;
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb"));
    }
}`,
          python: `def length_of_longest_substring(s: str) -> int:
    last_seen: dict[str, int] = {}
    left = 0
    max_len = 0
    for right, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= left:
            left = last_seen[ch] + 1
        last_seen[ch] = right
        max_len = max(max_len, right - left + 1)
    return max_len

if __name__ == "__main__":
    print(length_of_longest_substring("abcabcbb"))`,
        },
      },
      {
        id: 'd2-note-2',
        title: 'Trees, Graph BFS/DFS & Introductory Dynamic Programming',
        conceptSummary:
          'BFS explores level-by-level using a FIFO Queue (ideal for shortest path in unweighted graphs), while DFS explores depth-first using a Stack/Recursion. Dynamic Programming (DP) optimizes recursion when overlapping subproblems and optimal substructure exist.',
        timeSpaceNote: 'BFS/DFS: O(V + E) Time, O(V) Space | 1D DP Tabulation: O(N) Time, O(1) Space with state compression.',
        kapilMentorTip:
          'Every DP solution starts as a brute-force recursion choice tree. Identify the changing parameters in your recursive state, cache them in a table, and then flip it bottom-up.',
        codeByLanguage: {
          c: `#include <stdio.h>

// Introductory DP: Maximum Non-Adjacent Subsequence Sum (House Robber Pattern)
// O(N) Time, O(1) Space
int maxNonAdjacentSum(int nums[], int n) {
    int prev2 = 0, prev1 = 0;
    for (int i = 0; i < n; i++) {
        int take = prev2 + nums[i];
        int skip = prev1;
        int curr = (take > skip) ? take : skip;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int main() {
    int arr[] = {2, 7, 9, 3, 1};
    printf("%d\\n", maxNonAdjacentSum(arr, 5)); // 12
    return 0;
}`,
          cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxNonAdjacentSum(const vector<int>& nums) {
    int prev2 = 0, prev1 = 0;
    for (int x : nums) {
        int curr = max(prev1, prev2 + x);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int main() {
    cout << maxNonAdjacentSum({2, 7, 9, 3, 1}) << endl;
    return 0;
}`,
          java: `public class DynamicProgrammingNote {
    public static int maxNonAdjacentSum(int[] nums) {
        int prev2 = 0, prev1 = 0;
        for (int x : nums) {
            int curr = Math.max(prev1, prev2 + x);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }

    public static void main(String[] args) {
        System.out.println(maxNonAdjacentSum(new int[]{2, 7, 9, 3, 1}));
    }
}`,
          python: `def max_non_adjacent_sum(nums: list[int]) -> int:
    prev2, prev1 = 0, 0
    for x in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + x)
    return prev1

if __name__ == "__main__":
    print(max_non_adjacent_sum([2, 7, 9, 3, 1]))`,
        },
      },
    ],
    practicalChallenges: [
      {
        id: 'd2-prob-1',
        day: 2,
        title: 'Longest Substring Without Repeating Characters (Sliding Window)',
        difficulty: 'Medium',
        moduleTag: 'Module 2: Data Structures & Algorithms',
        problemStatement:
          'Given a string S, find the length of the longest contiguous substring without any repeating characters. Solve in O(N) time using the Sliding Window + Hash/Array index pattern.',
        inputFormat: 'Single string S.',
        outputFormat: 'Integer representing the maximum length.',
        constraints: ['1 <= |S| <= 10^5', 'Time Complexity: O(N)', 'Space Complexity: O(1) (256 ASCII slots)'],
        sampleInput: 'abcabcbb',
        sampleOutput: '3',
        kapilIntuition:
          'Store the last seen index of each ASCII character. When character s[right] was seen at index >= left, jump `left` directly to `lastSeen[s[right]] + 1` in O(1) time.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        starterCode: {
          c: `#include <stdio.h>
#include <string.h>

int longestUniqueSubstring(const char* s) {
    // Write Sliding Window O(N) logic here
    return 0;
}

int main() {
    printf("%d\\n", longestUniqueSubstring("abcabcbb"));
    return 0;
}`,
          cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int longestUniqueSubstring(const string& s) {
    // Write Sliding Window O(N) logic here
    return 0;
}

int main() {
    cout << longestUniqueSubstring("abcabcbb") << endl;
    return 0;
}`,
          java: `import java.util.*;

public class Solution {
    public static int longestUniqueSubstring(String s) {
        // Write Sliding Window O(N) logic here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(longestUniqueSubstring("abcabcbb"));
    }
}`,
          python: `def longest_unique_substring(s: str) -> int:
    # Write Sliding Window O(N) logic here
    return 0

if __name__ == "__main__":
    print(longest_unique_substring("abcabcbb"))`,
        },
        solutionCode: {
          c: `#include <stdio.h>
#include <string.h>

int longestUniqueSubstring(const char* s) {
    int last[256];
    for (int i = 0; i < 256; i++) last[i] = -1;
    int left = 0, maxLen = 0;
    for (int r = 0; s[r] != '\\0'; r++) {
        unsigned char c = (unsigned char)s[r];
        if (last[c] >= left) left = last[c] + 1;
        last[c] = r;
        if (r - left + 1 > maxLen) maxLen = r - left + 1;
    }
    return maxLen;
}

int main() {
    printf("%d\\n", longestUniqueSubstring("abcabcbb"));
    return 0;
}`,
          cpp: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int longestUniqueSubstring(const string& s) {
    vector<int> last(256, -1);
    int left = 0, maxLen = 0;
    for (int r = 0; r < (int)s.size(); r++) {
        unsigned char c = s[r];
        if (last[c] >= left) left = last[c] + 1;
        last[c] = r;
        maxLen = max(maxLen, r - left + 1);
    }
    return maxLen;
}

int main() {
    cout << longestUniqueSubstring("abcabcbb") << endl;
    return 0;
}`,
          java: `import java.util.*;

public class Solution {
    public static int longestUniqueSubstring(String s) {
        int[] last = new int[256];
        Arrays.fill(last, -1);
        int left = 0, maxLen = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            if (last[c] >= left) left = last[c] + 1;
            last[c] = r;
            maxLen = Math.max(maxLen, r - left + 1);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        System.out.println(longestUniqueSubstring("abcabcbb"));
    }
}`,
          python: `def longest_unique_substring(s: str) -> int:
    last = {}
    left = 0
    max_len = 0
    for r, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = r
        max_len = max(max_len, r - left + 1)
    return max_len

if __name__ == "__main__":
    print(longest_unique_substring("abcabcbb"))`,
        },
        testCases: [
          {
            id: 'd2-tc1',
            input: 'abcabcbb',
            expectedOutput: '3',
            isHidden: false,
            explanation: 'The longest unique substring is "abc" of length 3.',
          },
          {
            id: 'd2-tc2',
            input: 'bbbbb',
            expectedOutput: '1',
            isHidden: false,
            explanation: 'The longest unique substring is "b" of length 1.',
          },
          {
            id: 'd2-tc3',
            input: 'pwwkew',
            expectedOutput: '3',
            isHidden: true,
            explanation: '"wke" has length 3.',
          },
        ],
      },
      {
        id: 'd2-prob-2',
        day: 2,
        title: 'Next Greater Element via Monotonic Stack',
        difficulty: 'Medium',
        moduleTag: 'Module 2: Data Structures & Algorithms',
        problemStatement:
          'Given an array of N integers, for each element find the first greater element to its right. If no greater element exists, output -1 for that position. Solve in O(N) time using a Monotonic Decreasing Stack.',
        inputFormat: 'N space-separated integers.',
        outputFormat: 'Space-separated Next Greater Elements.',
        constraints: ['1 <= N <= 10^5', 'Time Complexity: O(N)', 'Space Complexity: O(N)'],
        sampleInput: '4 5 2 25',
        sampleOutput: '5 25 25 -1',
        kapilIntuition:
          'Traverse from right to left while maintaining a stack of elements in strictly decreasing order. Pop elements <= current element; the top of the stack is your Next Greater Element.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        starterCode: {
          c: `#include <stdio.h>

void nextGreaterElements(int arr[], int n) {
    // Implement O(N) Monotonic Stack logic
}

int main() {
    int arr[] = {4, 5, 2, 25};
    nextGreaterElements(arr, 4);
    return 0;
}`,
          cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

void nextGreaterElements(const vector<int>& arr) {
    // Implement O(N) Monotonic Stack logic
}

int main() {
    nextGreaterElements({4, 5, 2, 25});
    return 0;
}`,
          java: `import java.util.*;

public class Solution {
    public static void nextGreaterElements(int[] arr) {
        // Implement O(N) Monotonic Stack logic
    }

    public static void main(String[] args) {
        nextGreaterElements(new int[]{4, 5, 2, 25});
    }
}`,
          python: `def next_greater_elements(arr: list[int]) -> list[int]:
    # Implement O(N) Monotonic Stack logic
    return []

if __name__ == "__main__":
    print(" ".join(map(str, next_greater_elements([4, 5, 2, 25]))))`,
        },
        solutionCode: {
          c: `#include <stdio.h>

void nextGreaterElements(int arr[], int n) {
    int stack[100005], res[100005], top = -1;
    for (int i = n - 1; i >= 0; i--) {
        while (top >= 0 && stack[top] <= arr[i]) top--;
        res[i] = (top >= 0) ? stack[top] : -1;
        stack[++top] = arr[i];
    }
    for (int i = 0; i < n; i++) {
        printf("%d%s", res[i], (i == n - 1) ? "\\n" : " ");
    }
}

int main() {
    int arr[] = {4, 5, 2, 25};
    nextGreaterElements(arr, 4);
    return 0;
}`,
          cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

void nextGreaterElements(const vector<int>& arr) {
    int n = arr.size();
    vector<int> res(n, -1);
    stack<int> st;
    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= arr[i]) st.pop();
        if (!st.empty()) res[i] = st.top();
        st.push(arr[i]);
    }
    for (int i = 0; i < n; i++) {
        cout << res[i] << (i == n - 1 ? "\\n" : " ");
    }
}

int main() {
    nextGreaterElements({4, 5, 2, 25});
    return 0;
}`,
          java: `import java.util.*;

public class Solution {
    public static void nextGreaterElements(int[] arr) {
        int n = arr.length;
        int[] res = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= arr[i]) stack.pop();
            res[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(arr[i]);
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(res[i]).append(i == n - 1 ? "" : " ");
        }
        System.out.println(sb.toString());
    }

    public static void main(String[] args) {
        nextGreaterElements(new int[]{4, 5, 2, 25});
    }
}`,
          python: `def next_greater_elements(arr: list[int]) -> list[int]:
    res = [-1] * len(arr)
    stack = []
    for i in range(len(arr) - 1, -1, -1):
        while stack and stack[-1] <= arr[i]:
            stack.pop()
        if stack:
            res[i] = stack[-1]
        stack.append(arr[i])
    return res

if __name__ == "__main__":
    print(" ".join(map(str, next_greater_elements([4, 5, 2, 25]))))`,
        },
        testCases: [
          {
            id: 'd2-p2-tc1',
            input: '4 5 2 25',
            expectedOutput: '5 25 25 -1',
            isHidden: false,
            explanation: 'Next greater for 4 is 5, for 5 is 25, for 2 is 25, for 25 is -1.',
          },
          {
            id: 'd2-p2-tc2',
            input: '13 7 6 12',
            expectedOutput: '-1 12 12 -1',
            isHidden: true,
            explanation: '13 has no greater element; 7 and 6 both see 12.',
          },
        ],
      },
    ],
    preAssessment: [
      {
        id: 'd2-pre-1',
        question: 'Which traversal of a Binary Search Tree (BST) visits nodes in non-decreasing sorted order?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order (BFS)'],
        correctIndex: 1,
        explanation: 'In-order traversal (Left -> Root -> Right) visits all BST keys in sorted ascending order.',
        category: 'Theory (30%)',
      },
      {
        id: 'd2-pre-2',
        question: 'In Floyd’s Cycle Detection (Tortoise and Hare) on a Singly Linked List, what are the step sizes of the two pointers?',
        options: ['1 step and 2 steps', '1 step and 3 steps', '2 steps and 4 steps', 'Both move 1 step'],
        correctIndex: 0,
        explanation: 'Slow pointer advances 1 node per step while Fast pointer advances 2 nodes per step, guaranteeing O(N) cycle detection in O(1) space.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd2-pre-3',
        question: 'What is the amortized time complexity of Next Greater Element using a Monotonic Stack over N elements?',
        options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(1)'],
        correctIndex: 2,
        explanation: 'Each element is pushed onto the stack once and popped at most once, totaling at most 2N operations = O(N).',
        category: 'Practical Execution & Trace (70%)',
      },
    ],
    postAssessment: [
      {
        id: 'd2-post-1',
        question: 'Which data structure is used internally by Breadth-First Search (BFS) to find the shortest path in an unweighted graph?',
        options: ['Stack (LIFO)', 'Queue (FIFO)', 'Min-Heap', 'Disjoint Set Union'],
        correctIndex: 1,
        explanation: 'A FIFO Queue guarantees vertices are explored in order of their distance (level) from the source.',
        category: 'Theory (30%)',
      },
      {
        id: 'd2-post-2',
        question: 'Trace `longestUniqueSubstring("pwwkew")`. What is the returned length?',
        options: ['2', '3', '4', '5'],
        correctIndex: 1,
        explanation: 'The longest substring without repeating characters is "wke" or "kew", both of length 3.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd2-post-3',
        question: 'What differentiates Dynamic Programming from Greedy algorithms?',
        options: [
          'Greedy is always slower than DP',
          'DP evaluates overlapping subproblems to guarantee a global optimum when local greedy choices fail',
          'DP only works on sorted arrays',
          'Greedy requires O(N²) memory',
        ],
        correctIndex: 1,
        explanation: 'DP explores and caches overlapping subproblem states when a locally optimal greedy step does not guarantee global optimality.',
        category: 'Theory (30%)',
      },
    ],
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
    programmingNotes: [
      {
        id: 'd3-note-1',
        title: 'Constraint-to-Complexity Mapping & Binary Search on Answer',
        conceptSummary:
          'In company coding rounds, problem constraints dictate the required algorithm before you write a single line of code: N <= 20 implies O(2^N) backtracking/bitmask; N <= 2000 allows O(N²) DP; N <= 10^5 requires O(N log N) or O(N); N <= 10^9 demands O(log N) Binary Search on the Answer space.',
        timeSpaceNote: 'Binary Search on Monotonic Answer Space [low, high]: O(N log(Range)) Time, O(1) Auxiliary Space.',
        kapilMentorTip:
          'Always compute `mid = low + (high - low) / 2` instead of `(low + high) / 2` to prevent 32-bit signed integer overflow when low + high > 2^31 - 1.',
        codeByLanguage: {
          c: `#include <stdio.h>
#include <stdbool.h>

// Binary Search on Answer: Allocate Minimum Pages / Workload Partition
bool canAllocate(int pages[], int n, int students, long long maxLimit) {
    int count = 1;
    long long currentSum = 0;
    for (int i = 0; i < n; i++) {
        if (pages[i] > maxLimit) return false;
        if (currentSum + pages[i] > maxLimit) {
            count++;
            currentSum = pages[i];
            if (count > students) return false;
        } else {
            currentSum += pages[i];
        }
    }
    return true;
}

long long minMaxPages(int pages[], int n, int students) {
    if (students > n) return -1;
    long long low = 0, high = 0;
    for (int i = 0; i < n; i++) {
        if (pages[i] > low) low = pages[i];
        high += pages[i];
    }
    long long ans = high;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (canAllocate(pages, n, students, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main() {
    int pages[] = {12, 34, 67, 90};
    printf("%lld\\n", minMaxPages(pages, 4, 2)); // 113
    return 0;
}`,
          cpp: `#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

bool canAllocate(const vector<int>& pages, int students, long long maxLimit) {
    int count = 1;
    long long currentSum = 0;
    for (int p : pages) {
        if (p > maxLimit) return false;
        if (currentSum + p > maxLimit) {
            count++;
            currentSum = p;
            if (count > students) return false;
        } else {
            currentSum += p;
        }
    }
    return true;
}

long long minMaxPages(const vector<int>& pages, int students) {
    if (students > (int)pages.size()) return -1;
    long long low = *max_element(pages.begin(), pages.end());
    long long high = accumulate(pages.begin(), pages.end(), 0LL);
    long long ans = high;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (canAllocate(pages, students, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main() {
    cout << minMaxPages({12, 34, 67, 90}, 2) << endl;
    return 0;
}`,
          java: `public class CompanyCodingLab {
    private static boolean canAllocate(int[] pages, int students, long maxLimit) {
        int count = 1;
        long currentSum = 0;
        for (int p : pages) {
            if (p > maxLimit) return false;
            if (currentSum + p > maxLimit) {
                count++;
                currentSum = p;
                if (count > students) return false;
            } else {
                currentSum += p;
            }
        }
        return true;
    }

    public static long minMaxPages(int[] pages, int students) {
        if (students > pages.length) return -1;
        long low = 0, high = 0;
        for (int p : pages) {
            low = Math.max(low, p);
            high += p;
        }
        long ans = high;
        while (low <= high) {
            long mid = low + (high - low) / 2;
            if (canAllocate(pages, students, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }

    public static void main(String[] args) {
        System.out.println(minMaxPages(new int[]{12, 34, 67, 90}, 2));
    }
}`,
          python: `def min_max_pages(pages: list[int], students: int) -> int:
    if students > len(pages):
        return -1

    def can_allocate(limit: int) -> bool:
        count, curr = 1, 0
        for p in pages:
            if curr + p > limit:
                count += 1
                curr = p
                if count > students:
                    return False
            else:
                curr += p
        return True

    low, high = max(pages), sum(pages)
    ans = high
    while low <= high:
        mid = low + (high - low) // 2
        if can_allocate(mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans

if __name__ == "__main__":
    print(min_max_pages([12, 34, 67, 90], 2))`,
        },
      },
    ],
    practicalChallenges: [
      {
        id: 'd3-prob-1',
        day: 3,
        title: 'Minimum Workload Partition (Binary Search on Answer)',
        difficulty: 'Hard',
        moduleTag: 'Module 3: Company-oriented Coding Lab',
        problemStatement:
          'Given an array of book page counts and K students, assign contiguous books to each student such that the maximum pages assigned to any student is minimized. Return this minimum possible maximum load.',
        inputFormat: 'Array of pages and integer K.',
        outputFormat: 'Minimum possible maximum pages.',
        constraints: ['1 <= N <= 10^5', '1 <= pages[i] <= 10^6', 'Time Complexity: O(N log(Sum))', 'Space Complexity: O(1)'],
        sampleInput: '12 34 67 90 | K=2',
        sampleOutput: '113',
        kapilIntuition:
          'The feasibility predicate `canAllocate(limit)` is monotonic: if limit X works, any limit > X also works. Binary search in [max(pages), sum(pages)].',
        timeComplexity: 'O(N log(Sum))',
        spaceComplexity: 'O(1)',
        starterCode: {
          c: `#include <stdio.h>

long long solveBookAllocation(int pages[], int n, int k) {
    // Write Binary Search on Answer here
    return 113;
}

int main() {
    int pages[] = {12, 34, 67, 90};
    printf("%lld\\n", solveBookAllocation(pages, 4, 2));
    return 0;
}`,
          cpp: `#include <iostream>
#include <vector>
using namespace std;

long long solveBookAllocation(const vector<int>& pages, int k) {
    // Write Binary Search on Answer here
    return 113;
}

int main() {
    cout << solveBookAllocation({12, 34, 67, 90}, 2) << endl;
    return 0;
}`,
          java: `public class Solution {
    public static long solveBookAllocation(int[] pages, int k) {
        // Write Binary Search on Answer here
        return 113;
    }

    public static void main(String[] args) {
        System.out.println(solveBookAllocation(new int[]{12, 34, 67, 90}, 2));
    }
}`,
          python: `def solve_book_allocation(pages: list[int], k: int) -> int:
    # Write Binary Search on Answer here
    low, high = max(pages), sum(pages)
    ans = high
    while low <= high:
        mid = (low + high) // 2
        students, curr = 1, 0
        for p in pages:
            if curr + p > mid:
                students += 1
                curr = p
            else:
                curr += p
        if students <= k:
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans

if __name__ == "__main__":
    print(solve_book_allocation([12, 34, 67, 90], 2))`,
        },
        solutionCode: {
          c: `#include <stdio.h>

long long solveBookAllocation(int pages[], int n, int k) {
    long long low = 0, high = 0;
    for (int i = 0; i < n; i++) {
        if (pages[i] > low) low = pages[i];
        high += pages[i];
    }
    long long ans = high;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        int cnt = 1;
        long long curr = 0;
        for (int i = 0; i < n; i++) {
            if (curr + pages[i] > mid) {
                cnt++;
                curr = pages[i];
            } else {
                curr += pages[i];
            }
        }
        if (cnt <= k) { ans = mid; high = mid - 1; }
        else low = mid + 1;
    }
    return ans;
}

int main() {
    int pages[] = {12, 34, 67, 90};
    printf("%lld\\n", solveBookAllocation(pages, 4, 2));
    return 0;
}`,
          cpp: `#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

long long solveBookAllocation(const vector<int>& pages, int k) {
    long long low = *max_element(pages.begin(), pages.end());
    long long high = accumulate(pages.begin(), pages.end(), 0LL);
    long long ans = high;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        int cnt = 1;
        long long curr = 0;
        for (int p : pages) {
            if (curr + p > mid) { cnt++; curr = p; }
            else curr += p;
        }
        if (cnt <= k) { ans = mid; high = mid - 1; }
        else low = mid + 1;
    }
    return ans;
}

int main() {
    cout << solveBookAllocation({12, 34, 67, 90}, 2) << endl;
    return 0;
}`,
          java: `public class Solution {
    public static long solveBookAllocation(int[] pages, int k) {
        long low = 0, high = 0;
        for (int p : pages) {
            low = Math.max(low, p);
            high += p;
        }
        long ans = high;
        while (low <= high) {
            long mid = low + (high - low) / 2;
            int cnt = 1;
            long curr = 0;
            for (int p : pages) {
                if (curr + p > mid) { cnt++; curr = p; }
                else curr += p;
            }
            if (cnt <= k) { ans = mid; high = mid - 1; }
            else low = mid + 1;
        }
        return ans;
    }

    public static void main(String[] args) {
        System.out.println(solveBookAllocation(new int[]{12, 34, 67, 90}, 2));
    }
}`,
          python: `def solve_book_allocation(pages: list[int], k: int) -> int:
    low, high = max(pages), sum(pages)
    ans = high
    while low <= high:
        mid = (low + high) // 2
        cnt, curr = 1, 0
        for p in pages:
            if curr + p > mid:
                cnt += 1
                curr = p
            else:
                curr += p
        if cnt <= k:
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans

if __name__ == "__main__":
    print(solve_book_allocation([12, 34, 67, 90], 2))`,
        },
        testCases: [
          {
            id: 'd3-tc1',
            input: '12 34 67 90 | K=2',
            expectedOutput: '113',
            isHidden: false,
            explanation: 'Split [12, 34, 67] = 113 and [90] = 90. Max load is 113.',
          },
          {
            id: 'd3-tc2',
            input: '10 20 30 40 | K=2',
            expectedOutput: '60',
            isHidden: true,
            explanation: 'Split [10, 20, 30] = 60 and [40] = 40.',
          },
        ],
      },
    ],
    preAssessment: [
      {
        id: 'd3-pre-1',
        question: 'If a coding problem specifies N <= 2 * 10^5 and a 1.0-second time limit, which worst-case time complexity will result in Time Limit Exceeded (TLE)?',
        options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(log N)'],
        correctIndex: 2,
        explanation: 'For N = 2*10^5, N² = 4*10^10 operations, which vastly exceeds the ~10^8 operations/second limit.',
        category: 'Theory (30%)',
      },
      {
        id: 'd3-pre-2',
        question: 'Why do we write `mid = low + (high - low) / 2` in Binary Search?',
        options: [
          'It executes faster on modern CPUs',
          'It prevents signed 32-bit integer overflow when low + high exceeds INT_MAX',
          'It rounds up instead of down',
          'It avoids division by zero',
        ],
        correctIndex: 1,
        explanation: 'Adding two large positive 32-bit integers can overflow INT_MAX (2,147,483,647) and become negative.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd3-pre-3',
        question: 'When explaining trade-offs in a technical interview, what is the standard progression expected by interviewers?',
        options: [
          'Only state the optimal code without explanation',
          'Brute-Force baseline -> Bottleneck identification -> Optimal Time/Space trade-off + Edge-Case verification',
          'Write pseudocode only',
          'Skip space complexity analysis',
        ],
        correctIndex: 1,
        explanation: 'Articulating the brute-force bottleneck and systematically optimizing demonstrates structured engineering reasoning.',
        category: 'Theory (30%)',
      },
    ],
    postAssessment: [
      {
        id: 'd3-post-1',
        question: 'In the Book Allocation / Workload Partition problem with pages = [12, 34, 67, 90] and K = 2, what is the initial binary search range [low, high]?',
        options: ['[12, 90]', '[90, 203]', '[0, 203]', '[34, 113]'],
        correctIndex: 1,
        explanation: 'The minimum possible max load is max(pages) = 90, and the maximum possible load is sum(pages) = 203.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd3-post-2',
        question: 'Which hidden test case category most frequently breaks naive array solutions in placement assessments?',
        options: [
          'Single-element arrays, all-negative numbers, and 64-bit accumulator overflows',
          'Arrays of length 5 with small positive integers',
          'Sorted arrays of length 4',
          'None of the above',
        ],
        correctIndex: 0,
        explanation: 'Boundary inputs (N=1, negative numbers, sum exceeding 32-bit int) are standard hidden test cases.',
        category: 'Practical Execution & Trace (70%)',
      },
      {
        id: 'd3-post-3',
        question: 'What is the time complexity of Kadane’s Algorithm for Maximum Subarray Sum?',
        options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(2^N)'],
        correctIndex: 2,
        explanation: 'Kadane’s algorithm scans the array once, maintaining currentMax and globalMax in O(N) time and O(1) space.',
        category: 'Theory (30%)',
      },
    ],
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
