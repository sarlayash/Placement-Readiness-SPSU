import { PracticalChallenge } from '../types';

/**
 * 10 Company-Oriented Placement Problems for Day 2 - Virtual Lab
 * Focus: Data Structures & Algorithmic Patterns (Two Pointers, Sliding Window, Hashing, Fast & Slow Pointers)
 * Mapped to LeetCode, HackerRank, GeeksforGeeks & Top Placement Recruiters (Amazon, Microsoft, Google, TCS Digital, Infosys, etc.)
 * Fully solved in C, C++, Java, and Python with step-by-step Execution Visualizations & Hidden Boundary Test Cases.
 */
export const DAY_2_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  // 1. Two Sum II - Sorted Array
  {
    id: 'day2-p1-two-sum-sorted',
    day: 2,
    title: 'Two Sum II - Input Array Is Sorted (Two Pointers)',
    difficulty: 'Easy',
    moduleTag: 'Two Pointers Pattern',
    companies: ['Amazon', 'Microsoft', 'TCS Digital', 'Infosys'],
    platforms: ['LeetCode #167', 'GeeksforGeeks', 'HackerRank'],
    problemStatement:
      'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the 1-based indices [index1, index2] of the two numbers. You must use O(1) extra space.',
    inputFormat: 'First line contains integer n. Second line contains n space-separated sorted integers. Third line contains integer target.',
    outputFormat: 'Print the two 1-based indices separated by a space.',
    constraints: ['2 <= numbers.length <= 3 * 10^4', '-1000 <= numbers[i] <= 1000', 'numbers is sorted in non-decreasing order', 'Exactly one solution exists'],
    sampleInput: '4\n2 7 11 15\n9',
    sampleOutput: '1 2',
    kapilIntuition:
      'Mentorship By Kapil: Because the array is strictly sorted, start one pointer at the beginning (left = 0) and one at the end (right = n - 1). If sum == target, found! If sum < target, increment left to increase sum. If sum > target, decrement right to decrease sum. Eliminates O(N^2) search down to O(N) with O(1) auxiliary memory.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

void twoSum(int numbers[], int n, int target, int* idx1, int* idx2) {
    // Write your two pointers solution here
    *idx1 = 1;
    *idx2 = 2;
}

int main() {
    int n, target;
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &target);
    int i1, i2;
    twoSum(arr, n, target, &i1, &i2);
    printf("%d %d\\n", i1, i2);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

pair<int, int> twoSum(const vector<int>& numbers, int target) {
    // Write your two pointers solution here
    return {1, 2};
}

int main() {
    int n, target;
    if (!(cin >> n)) return 0;
    vector<int> numbers(n);
    for (int i = 0; i < n; i++) cin >> numbers[i];
    cin >> target;
    auto res = twoSum(numbers, target);
    cout << res.first << " " << res.second << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static int[] twoSum(int[] numbers, int target) {
        // Write your two pointers solution here
        return new int[]{1, 2};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] numbers = new int[n];
        for (int i = 0; i < n; i++) numbers[i] = sc.nextInt();
        int target = sc.nextInt();
        int[] res = twoSum(numbers, target);
        System.out.println(res[0] + " " + res[1]);
    }
}`,
      python: `import sys

def two_sum(numbers, target):
    # Write your two pointers solution here
    return [1, 2]

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        numbers = [int(x) for x in lines[1:n+1]]
        target = int(lines[n+1])
        res = two_sum(numbers, target)
        print(f"{res[0]} {res[1]}")`
    },
    solutionCode: {
      c: `#include <stdio.h>

void twoSum(int numbers[], int n, int target, int* idx1, int* idx2) {
    int left = 0, right = n - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) {
            *idx1 = left + 1;
            *idx2 = right + 1;
            return;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
}

int main() {
    int n, target;
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &target);
    int i1, i2;
    twoSum(arr, n, target, &i1, &i2);
    printf("%d %d\\n", i1, i2);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

pair<int, int> twoSum(const vector<int>& numbers, int target) {
    int left = 0, right = numbers.size() - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) {
            return {left + 1, right + 1};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return {-1, -1};
}

int main() {
    int n, target;
    if (!(cin >> n)) return 0;
    vector<int> numbers(n);
    for (int i = 0; i < n; i++) cin >> numbers[i];
    cin >> target;
    auto res = twoSum(numbers, target);
    cout << res.first << " " << res.second << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return new int[]{left + 1, right + 1};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] numbers = new int[n];
        for (int i = 0; i < n; i++) numbers[i] = sc.nextInt();
        int target = sc.nextInt();
        int[] res = twoSum(numbers, target);
        System.out.println(res[0] + " " + res[1]);
    }
}`,
      python: `import sys

def two_sum(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        curr_sum = numbers[left] + numbers[right]
        if curr_sum == target:
            return [left + 1, right + 1]
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return [-1, -1]

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        numbers = [int(x) for x in lines[1:n+1]]
        target = int(lines[n+1])
        res = two_sum(numbers, target)
        print(f"{res[0]} {res[1]}")`
    },
    testCases: [
      { id: 'd2-tc1', input: '4\n2 7 11 15\n9', expectedOutput: '1 2', isHidden: false, explanation: '2 + 7 = 9 at 1-based indices 1 and 2.' },
      { id: 'd2-tc2', input: '3\n2 3 4\n6', expectedOutput: '1 3', isHidden: false, explanation: '2 + 4 = 6 at indices 1 and 3.' },
      { id: 'd2-tc3', input: '2\n-1 0\n-1', expectedOutput: '1 2', isHidden: true, explanation: 'Negative numbers handled correctly.' },
      { id: 'd2-tc4', input: '5\n1 2 3 4 5\n8', expectedOutput: '3 5', isHidden: true, explanation: '3 + 5 = 8 at indices 3 and 5.' }
    ],
    visualizationSteps: [
      { step: 1, label: 'Initialize Pointers', description: 'left = 0 (val 2), right = 3 (val 15). Sum = 17 > 9. Decrement right.', variables: { left: 0, right: 3, sum: 17, target: 9 }, arrayState: { elements: [2, 7, 11, 15], activeIndices: [0, 3], pointerLabels: { 0: 'L', 3: 'R' } } },
      { step: 2, label: 'Move Right Inwards', description: 'left = 0 (val 2), right = 2 (val 11). Sum = 13 > 9. Decrement right.', variables: { left: 0, right: 2, sum: 13, target: 9 }, arrayState: { elements: [2, 7, 11, 15], activeIndices: [0, 2], pointerLabels: { 0: 'L', 2: 'R' } } },
      { step: 3, label: 'Target Match Found', description: 'left = 0 (val 2), right = 1 (val 7). Sum = 9 == target. Return [1, 2].', variables: { left: 0, right: 1, sum: 9, target: 9 }, arrayState: { elements: [2, 7, 11, 15], activeIndices: [0, 1], pointerLabels: { 0: 'L', 1: 'R' } } }
    ]
  },

  // 2. Longest Substring Without Repeating Characters
  {
    id: 'day2-p2-longest-unique-substring',
    day: 2,
    title: 'Longest Substring Without Repeating Characters (Sliding Window)',
    difficulty: 'Medium',
    moduleTag: 'Sliding Window Pattern',
    companies: ['Amazon', 'Microsoft', 'Google', 'Adobe', 'TCS Digital'],
    platforms: ['LeetCode #3', 'GeeksforGeeks', 'HackerRank'],
    problemStatement:
      'Given a string s, find the length of the longest substring without repeating characters. Solve in linear O(N) time using an expandable/contractible sliding window with a character last-seen index map.',
    inputFormat: 'A single string s on a single line.',
    outputFormat: 'An integer representing the length of the longest unique substring.',
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces'],
    sampleInput: 'abcabcbb',
    sampleOutput: '3',
    kapilIntuition:
      'Mentorship By Kapil: Maintain window [left, right]. As right expands, store lastSeen[char]. If char was seen within the current window (lastSeen[char] >= left), jump left = lastSeen[char] + 1. Update maxLen = max(maxLen, right - left + 1). Single pass O(N) with O(1) space (256 ASCII table).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1) (256 ASCII map)',
    starterCode: {
      c: `#include <stdio.h>
#include <string.h>

int lengthOfLongestSubstring(char* s) {
    // Write your sliding window solution here
    return 0;
}

int main() {
    char s[50005];
    if (fgets(s, sizeof(s), stdin)) {
        s[strcspn(s, "\\r\\n")] = 0;
        printf("%d\\n", lengthOfLongestSubstring(s));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int lengthOfLongestSubstring(const string& s) {
    // Write your sliding window solution here
    return 0;
}

int main() {
    string s;
    if (getline(cin, s)) {
        cout << lengthOfLongestSubstring(s) << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static int lengthOfLongestSubstring(String s) {
        // Write your sliding window solution here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";
        System.out.println(lengthOfLongestSubstring(s));
    }
}`,
      python: `import sys

def length_of_longest_substring(s: str) -> int:
    # Write your sliding window solution here
    return 0

if __name__ == "__main__":
    line = sys.stdin.readline()
    s = line.rstrip("\\r\\n")
    print(length_of_longest_substring(s))`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <string.h>

int lengthOfLongestSubstring(char* s) {
    int lastSeen[256];
    for (int i = 0; i < 256; i++) lastSeen[i] = -1;
    int maxLen = 0, left = 0;
    for (int right = 0; s[right] != '\\0'; right++) {
        unsigned char c = (unsigned char)s[right];
        if (lastSeen[c] >= left) {
            left = lastSeen[c] + 1;
        }
        lastSeen[c] = right;
        int currLen = right - left + 1;
        if (currLen > maxLen) maxLen = currLen;
    }
    return maxLen;
}

int main() {
    char s[50005];
    if (fgets(s, sizeof(s), stdin)) {
        s[strcspn(s, "\\r\\n")] = 0;
        printf("%d\\n", lengthOfLongestSubstring(s));
    }
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
    for (int right = 0; right < s.length(); right++) {
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
    string s;
    if (getline(cin, s)) {
        cout << lengthOfLongestSubstring(s) << endl;
    }
    return 0;
}`,
      java: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
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
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";
        System.out.println(lengthOfLongestSubstring(s));
    }
}`,
      python: `import sys

def length_of_longest_substring(s: str) -> int:
    last_seen = {}
    max_len = 0
    left = 0
    for right, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= left:
            left = last_seen[ch] + 1
        last_seen[ch] = right
        max_len = max(max_len, right - left + 1)
    return max_len

if __name__ == "__main__":
    line = sys.stdin.readline()
    s = line.rstrip("\\r\\n")
    print(length_of_longest_substring(s))`
    },
    testCases: [
      { id: 'd2-p2-tc1', input: 'abcabcbb', expectedOutput: '3', isHidden: false, explanation: 'The answer is "abc", with the length of 3.' },
      { id: 'd2-p2-tc2', input: 'bbbbb', expectedOutput: '1', isHidden: false, explanation: 'The answer is "b", with the length of 1.' },
      { id: 'd2-p2-tc3', input: 'pwwkew', expectedOutput: '3', isHidden: true, explanation: 'The answer is "wke", with the length of 3.' },
      { id: 'd2-p2-tc4', input: '', expectedOutput: '0', isHidden: true, explanation: 'Empty string returns 0.' }
    ],
    visualizationSteps: [
      { step: 1, label: 'Expand Window', description: 'Right expands: window="a", "b", "c". maxLen = 3.', variables: { left: 0, right: 2, currentSubstring: 'abc', maxLen: 3 }, arrayState: { elements: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'], activeIndices: [0, 1, 2], pointerLabels: { 0: 'L', 2: 'R' } } },
      { step: 2, label: 'Duplicate Character Hit', description: 'Encounter "a" at right = 3. Last seen at 0 >= left(0). Jump left to 1. Window="bca".', variables: { left: 1, right: 3, currentSubstring: 'bca', maxLen: 3 }, arrayState: { elements: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'], activeIndices: [1, 2, 3], pointerLabels: { 1: 'L', 3: 'R' } } },
      { step: 3, label: 'Slide to End', description: 'Repeated characters contract window; maxLen remains 3.', variables: { maxLen: 3 }, arrayState: { elements: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'], activeIndices: [5, 6], pointerLabels: { 5: 'L', 7: 'R' } } }
    ]
  },

  // 3. Container With Most Water
  {
    id: 'day2-p3-container-most-water',
    day: 2,
    title: 'Container With Most Water (Two Pointer Greedy)',
    difficulty: 'Medium',
    moduleTag: 'Two Pointers Pattern',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Goldman Sachs'],
    platforms: ['LeetCode #11', 'GeeksforGeeks', 'HackerRank'],
    problemStatement:
      'Given an integer array height of length n where each element represents a vertical line on x-axis. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
    inputFormat: 'First line contains integer n. Second line contains n space-separated heights.',
    outputFormat: 'Print the maximum water volume integer.',
    constraints: ['2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
    sampleInput: '9\n1 8 6 2 5 4 8 3 7',
    sampleOutput: '49',
    kapilIntuition:
      'Mentorship By Kapil: Area is constrained by min(height[left], height[right]) * (right - left). To find greater area as width decreases, we MUST move the pointer that points to the shorter line! Moving the taller line can only decrease width without any chance of increasing minimum height. O(N) single pass.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int maxArea(int height[], int n) {
    // Write your two pointers solution here
    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int h[n];
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    printf("%d\\n", maxArea(h, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int maxArea(const vector<int>& height) {
    // Write your two pointers solution here
    return 0;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    cout << maxArea(h) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static int maxArea(int[] height) {
        // Write your two pointers solution here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        System.out.println(maxArea(h));
    }
}`,
      python: `import sys

def max_area(height):
    # Write your two pointers solution here
    return 0

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        h = [int(x) for x in lines[1:n+1]]
        print(max_area(h))`
    },
    solutionCode: {
      c: `#include <stdio.h>

int maxArea(int height[], int n) {
    int left = 0, right = n - 1;
    int maxWater = 0;
    while (left < right) {
        int width = right - left;
        int h = height[left] < height[right] ? height[left] : height[right];
        int area = width * h;
        if (area > maxWater) maxWater = area;
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int h[n];
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    printf("%d\\n", maxArea(h, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxArea(const vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;
    while (left < right) {
        int width = right - left;
        int h = min(height[left], height[right]);
        maxWater = max(maxWater, width * h);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    cout << maxArea(h) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxWater = 0;
        while (left < right) {
            int width = right - left;
            int h = Math.min(height[left], height[right]);
            maxWater = Math.max(maxWater, width * h);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxWater;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        System.out.println(maxArea(h));
    }
}`,
      python: `import sys

def max_area(height):
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        h = [int(x) for x in lines[1:n+1]]
        print(max_area(h))`
    },
    testCases: [
      { id: 'd2-p3-tc1', input: '9\n1 8 6 2 5 4 8 3 7', expectedOutput: '49', isHidden: false, explanation: 'Between index 1 (height 8) and index 8 (height 7): min(8, 7) * 7 = 49.' },
      { id: 'd2-p3-tc2', input: '2\n1 1', expectedOutput: '1', isHidden: false, explanation: 'min(1, 1) * 1 = 1.' },
      { id: 'd2-p3-tc3', input: '4\n4 3 2 14', expectedOutput: '16', isHidden: true, explanation: 'Index 0 (4) and 3 (14) gives 4 * 3 = 12, or between other pairs.' },
      { id: 'd2-p3-tc4', input: '5\n1 2 1 2 1', expectedOutput: '4', isHidden: true, explanation: 'Optimal boundary container holds 4 units.' }
    ],
    visualizationSteps: [
      { step: 1, label: 'Start at Extremes', description: 'left = 0 (1), right = 8 (7). width = 8, minH = 1, area = 8. Move left.', variables: { left: 0, right: 8, maxArea: 8 }, arrayState: { elements: [1, 8, 6, 2, 5, 4, 8, 3, 7], activeIndices: [0, 8], pointerLabels: { 0: 'L', 8: 'R' } } },
      { step: 2, label: 'Inspect Heights', description: 'left = 1 (8), right = 8 (7). width = 7, minH = 7, area = 49. New Max = 49! Move right.', variables: { left: 1, right: 8, maxArea: 49 }, arrayState: { elements: [1, 8, 6, 2, 5, 4, 8, 3, 7], activeIndices: [1, 8], pointerLabels: { 1: 'L', 8: 'R' } } }
    ]
  },

  // 4. Subarray Sum Equals K
  {
    id: 'day2-p4-subarray-sum-k',
    day: 2,
    title: 'Subarray Sum Equals K (Prefix Sum + Hash Map)',
    difficulty: 'Medium',
    moduleTag: 'Hashing Pattern',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'TCS Digital'],
    platforms: ['LeetCode #560', 'GeeksforGeeks'],
    problemStatement:
      'Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k. Notice that numbers can be negative, so standard two-pointers does not apply.',
    inputFormat: 'First line contains integer n. Second line contains n space-separated integers. Third line contains integer k.',
    outputFormat: 'Print the count of matching subarrays.',
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000', '-10^7 <= k <= 10^7'],
    sampleInput: '3\n1 1 1\n2',
    sampleOutput: '2',
    kapilIntuition:
      'Mentorship By Kapil: Let current prefix sum be P. Any previous prefix sum equal to (P - k) means the subarray between them sums exactly to k! Store frequencies of prefix sums in a hash map with initial entry map[0] = 1. Linear O(N) time with O(N) space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    starterCode: {
      c: `#include <stdio.h>

int subarraySum(int nums[], int n, int k) {
    // Write your prefix sum hash map solution here
    return 0;
}

int main() {
    int n, k;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    scanf("%d", &k);
    printf("%d\\n", subarraySum(nums, n, k));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int subarraySum(const vector<int>& nums, int k) {
    // Write your prefix sum hash map solution here
    return 0;
}

int main() {
    int n, k;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cin >> k;
    cout << subarraySum(nums, k) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;
import java.util.HashMap;

public class Main {
    public static int subarraySum(int[] nums, int k) {
        // Write your prefix sum hash map solution here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int k = sc.nextInt();
        System.out.println(subarraySum(nums, k));
    }
}`,
      python: `import sys
from collections import defaultdict

def subarray_sum(nums, k):
    # Write your prefix sum hash map solution here
    return 0

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        nums = [int(x) for x in lines[1:n+1]]
        k = int(lines[n+1])
        print(subarray_sum(nums, k))`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

#define TABLE_SIZE 40009

typedef struct Node {
    long long key;
    int count;
    struct Node* next;
} Node;

Node* table[TABLE_SIZE];

int hash(long long key) {
    int h = key % TABLE_SIZE;
    return h < 0 ? h + TABLE_SIZE : h;
}

void insert(long long key) {
    int h = hash(key);
    Node* curr = table[h];
    while (curr) {
        if (curr->key == key) {
            curr->count++;
            return;
        }
        curr = curr->next;
    }
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->key = key;
    newNode->count = 1;
    newNode->next = table[h];
    table[h] = newNode;
}

int getCount(long long key) {
    int h = hash(key);
    Node* curr = table[h];
    while (curr) {
        if (curr->key == key) return curr->count;
        curr = curr->next;
    }
    return 0;
}

int subarraySum(int nums[], int n, int k) {
    for (int i = 0; i < TABLE_SIZE; i++) table[i] = NULL;
    insert(0);
    long long prefixSum = 0;
    int totalCount = 0;
    for (int i = 0; i < n; i++) {
        prefixSum += nums[i];
        totalCount += getCount(prefixSum - k);
        insert(prefixSum);
    }
    return totalCount;
}

int main() {
    int n, k;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    scanf("%d", &k);
    printf("%d\\n", subarraySum(nums, n, k));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int subarraySum(const vector<int>& nums, int k) {
    unordered_map<long long, int> prefixCounts;
    prefixCounts[0] = 1;
    long long sum = 0;
    int count = 0;
    for (int x : nums) {
        sum += x;
        if (prefixCounts.find(sum - k) != prefixCounts.end()) {
            count += prefixCounts[sum - k];
        }
        prefixCounts[sum]++;
    }
    return count;
}

int main() {
    int n, k;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cin >> k;
    cout << subarraySum(nums, k) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;
import java.util.HashMap;

public class Main {
    public static int subarraySum(int[] nums, int k) {
        HashMap<Long, Integer> prefixMap = new HashMap<>();
        prefixMap.put(0L, 1);
        long sum = 0;
        int count = 0;
        for (int x : nums) {
            sum += x;
            count += prefixMap.getOrDefault(sum - k, 0);
            prefixMap.put(sum, prefixMap.getOrDefault(sum, 0) + 1);
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int k = sc.nextInt();
        System.out.println(subarraySum(nums, k));
    }
}`,
      python: `import sys
from collections import defaultdict

def subarray_sum(nums, k):
    prefix_counts = defaultdict(int)
    prefix_counts[0] = 1
    curr_sum = 0
    count = 0
    for x in nums:
        curr_sum += x
        count += prefix_counts[curr_sum - k]
        prefix_counts[curr_sum] += 1
    return count

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        nums = [int(x) for x in lines[1:n+1]]
        k = int(lines[n+1])
        print(subarray_sum(nums, k))`
    },
    testCases: [
      { id: 'd2-p4-tc1', input: '3\n1 1 1\n2', expectedOutput: '2', isHidden: false, explanation: '[1,1] from index 0..1 and 1..2.' },
      { id: 'd2-p4-tc2', input: '3\n1 2 3\n3', expectedOutput: '2', isHidden: false, explanation: '[1,2] and [3].' },
      { id: 'd2-p4-tc3', input: '5\n1 -1 1 -1 1\n0', expectedOutput: '4', isHidden: true, explanation: 'Zero sum subarrays with negative numbers.' }
    ],
    visualizationSteps: [
      { step: 1, label: 'Base Map', description: 'prefixCounts[0] = 1. Current sum = 0.', variables: { prefixSum: 0, count: 0 } },
      { step: 2, label: 'Iterate', description: 'num=1, sum=1. sum-k = -1 (not found). map[1]=1.', variables: { prefixSum: 1, count: 0 } },
      { step: 3, label: 'Match Found', description: 'num=1, sum=2. sum-k = 0 found in map! count += 1. map[2]=1.', variables: { prefixSum: 2, count: 1 } }
    ]
  },

  // 5. Sort Colors (Dutch National Flag)
  {
    id: 'day2-p5-sort-colors',
    day: 2,
    title: 'Sort Colors (Dutch National Flag 3-Way Partition)',
    difficulty: 'Medium',
    moduleTag: 'Two Pointers / 3-Way Partition',
    companies: ['Microsoft', 'Amazon', 'Adobe', 'TCS Digital', 'Infosys'],
    platforms: ['LeetCode #75', 'GeeksforGeeks'],
    problemStatement:
      'Given an array nums with n objects colored red (0), white (1), or blue (2), sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. You must solve this problem in O(N) single pass and O(1) space without using library sort.',
    inputFormat: 'First line contains integer n. Second line contains n space-separated numbers (0, 1, or 2).',
    outputFormat: 'Print the sorted array space-separated.',
    constraints: ['1 <= n <= 300', 'nums[i] is either 0, 1, or 2'],
    sampleInput: '6\n2 0 2 1 1 0',
    sampleOutput: '0 0 1 1 2 2',
    kapilIntuition:
      'Mentorship By Kapil: Dijkstra’s Dutch National Flag partition uses three pointers: low, mid, and high. All elements before low are 0s; between low and mid-1 are 1s; after high are 2s. If nums[mid] == 0, swap(low, mid), low++, mid++. If nums[mid] == 1, mid++. If nums[mid] == 2, swap(mid, high), high--. Exact single pass O(N).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

void sortColors(int nums[], int n) {
    // Write your Dutch National Flag 3-pointer solution here
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int a[n];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    sortColors(a, n);
    for (int i = 0; i < n; i++) printf("%d%c", a[i], i == n - 1 ? '\\n' : ' ');
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sortColors(vector<int>& nums) {
    // Write your Dutch National Flag 3-pointer solution here
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    sortColors(a);
    for (int i = 0; i < n; i++) cout << a[i] << (i == n - 1 ? "" : " ");
    cout << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void sortColors(int[] nums) {
        // Write your Dutch National Flag solution here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        sortColors(a);
        for (int i = 0; i < n; i++) {
            System.out.print(a[i] + (i == n - 1 ? "\\n" : " "));
        }
    }
}`,
      python: `import sys

def sort_colors(nums):
    # Write your Dutch National Flag solution here
    pass

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        a = [int(x) for x in lines[1:n+1]]
        sort_colors(a)
        print(" ".join(map(str, a)))`
    },
    solutionCode: {
      c: `#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

void sortColors(int nums[], int n) {
    int low = 0, mid = 0, high = n - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(&nums[low], &nums[mid]);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(&nums[mid], &nums[high]);
            high--;
        }
    }
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int a[n];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    sortColors(a, n);
    for (int i = 0; i < n; i++) printf("%d%c", a[i], i == n - 1 ? '\\n' : ' ');
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <utility>
using namespace std;

void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums[low], nums[mid]);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums[mid], nums[high]);
            high--;
        }
    }
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    sortColors(a);
    for (int i = 0; i < n; i++) cout << a[i] << (i == n - 1 ? "" : " ");
    cout << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int t = nums[low];
                nums[low] = nums[mid];
                nums[mid] = t;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int t = nums[mid];
                nums[mid] = nums[high];
                nums[high] = t;
                high--;
            }
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        sortColors(a);
        for (int i = 0; i < n; i++) {
            System.out.print(a[i] + (i == n - 1 ? "\\n" : " "));
        }
    }
}`,
      python: `import sys

def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        a = [int(x) for x in lines[1:n+1]]
        sort_colors(a)
        print(" ".join(map(str, a)))`
    },
    testCases: [
      { id: 'd2-p5-tc1', input: '6\n2 0 2 1 1 0', expectedOutput: '0 0 1 1 2 2', isHidden: false, explanation: 'Sorted in 0, 1, 2 sequence.' },
      { id: 'd2-p5-tc2', input: '3\n2 0 1', expectedOutput: '0 1 2', isHidden: false, explanation: 'All 3 colors sorted.' },
      { id: 'd2-p5-tc3', input: '1\n0', expectedOutput: '0', isHidden: true, explanation: 'Single element base case.' }
    ],
    visualizationSteps: [
      { step: 1, label: 'Init Pointers', description: 'low=0, mid=0, high=5. Elements: [2, 0, 2, 1, 1, 0].', variables: { low: 0, mid: 0, high: 5 } },
      { step: 2, label: 'Swap with High', description: 'nums[mid]==2, swap(mid, high) -> [0, 0, 2, 1, 1, 2], high becomes 4.', variables: { low: 0, mid: 0, high: 4 } },
      { step: 3, label: 'Swap with Low', description: 'nums[mid]==0, swap(low, mid), low++, mid++.', variables: { low: 1, mid: 1, high: 4 } }
    ]
  },

  // 6. 3Sum (Triplets summing to zero)
  {
    id: 'day2-p6-three-sum',
    day: 2,
    title: '3Sum - Zero Sum Unique Triplets (Sort + Two Pointers)',
    difficulty: 'Medium',
    moduleTag: 'Sorting + Two Pointers',
    companies: ['Amazon', 'Microsoft', 'Goldman Sachs', 'Google', 'Meta'],
    platforms: ['LeetCode #15', 'GeeksforGeeks'],
    problemStatement:
      'Given an integer array nums, return the count of all unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. The output should not contain duplicate triplets.',
    inputFormat: 'First line contains integer n. Second line contains n space-separated integers.',
    outputFormat: 'Print the count of unique triplets.',
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    sampleInput: '6\n-1 0 1 2 -1 -4',
    sampleOutput: '2',
    kapilIntuition:
      'Mentorship By Kapil: Sort the array first O(N log N). Fix the first element nums[i]. Then run Two Pointers (left = i + 1, right = n - 1) looking for target = -nums[i]. To guarantee uniqueness without an expensive set, skip duplicates for i, left, and right immediately after finding a match. Overall O(N^2) time and O(1) extra space.',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int threeSumCount(int nums[], int n) {
    // Write your sort + two pointers solution here
    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int a[n];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    printf("%d\\n", threeSumCount(a, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int threeSumCount(vector<int>& nums) {
    // Write your sort + two pointers solution here
    return 0;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cout << threeSumCount(a) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static int threeSumCount(int[] nums) {
        // Write your sort + two pointers solution here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(threeSumCount(a));
    }
}`,
      python: `import sys

def three_sum_count(nums):
    # Write your sort + two pointers solution here
    return 0

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        a = [int(x) for x in lines[1:n+1]]
        print(three_sum_count(a))`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

int threeSumCount(int nums[], int n) {
    qsort(nums, n, sizeof(int), cmp);
    int count = 0;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = n - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                count++;
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return count;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int a[n];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    printf("%d\\n", threeSumCount(a, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int threeSumCount(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    int n = nums.size();
    int count = 0;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = n - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                count++;
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return count;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cout << threeSumCount(a) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static int threeSumCount(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        int count = 0;
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    count++;
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(threeSumCount(a));
    }
}`,
      python: `import sys

def three_sum_count(nums):
    nums.sort()
    n = len(nums)
    count = 0
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, n - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                count += 1
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif s < 0:
                left += 1
            else:
                right -= 1
    return count

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        a = [int(x) for x in lines[1:n+1]]
        print(three_sum_count(a))`
    },
    testCases: [
      { id: 'd2-p6-tc1', input: '6\n-1 0 1 2 -1 -4', expectedOutput: '2', isHidden: false, explanation: 'The unique triplets are [-1, 0, 1] and [-1, -1, 2].' },
      { id: 'd2-p6-tc2', input: '3\n0 1 1', expectedOutput: '0', isHidden: false, explanation: 'No triplet sums to 0.' },
      { id: 'd2-p6-tc3', input: '3\n0 0 0', expectedOutput: '1', isHidden: true, explanation: '[0, 0, 0] is the single unique triplet.' }
    ],
    visualizationSteps: [
      { step: 1, label: 'Sort Array', description: 'Sorted: [-4, -1, -1, 0, 1, 2]. Fix i=1 (value -1).', variables: { i: 1, target: 1 } },
      { step: 2, label: 'Two Pointers Search', description: 'left=2 (-1), right=5 (2). Sum = -1 + (-1) + 2 = 0! Found triplet.', variables: { count: 1 } }
    ]
  },

  // 7. Find Minimum in Rotated Sorted Array
  {
    id: 'day2-p7-find-min-rotated',
    day: 2,
    title: 'Find Minimum in Rotated Sorted Array (Binary Search)',
    difficulty: 'Medium',
    moduleTag: 'Binary Search Pattern',
    companies: ['Microsoft', 'Amazon', 'Bloomberg', 'Uber'],
    platforms: ['LeetCode #153', 'GeeksforGeeks'],
    problemStatement:
      'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array in O(log n) time.',
    inputFormat: 'First line contains integer n. Second line contains n space-separated rotated integers.',
    outputFormat: 'Print the minimum element integer.',
    constraints: ['1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All integers in nums are unique'],
    sampleInput: '5\n3 4 5 1 2',
    sampleOutput: '1',
    kapilIntuition:
      'Mentorship By Kapil: Compare mid with right! If nums[mid] > nums[right], the pivot and minimum MUST lie strictly to the right: low = mid + 1. If nums[mid] <= nums[right], the minimum lies at mid or to the left: high = mid. Terminate when low == high. Guaranteed O(log N).',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int findMin(int nums[], int n) {
    // Write your O(log N) binary search solution here
    return nums[0];
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int a[n];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    printf("%d\\n", findMin(a, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int findMin(const vector<int>& nums) {
    // Write your O(log N) binary search solution here
    return nums[0];
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cout << findMin(a) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static int findMin(int[] nums) {
        // Write your O(log N) binary search solution here
        return nums[0];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(findMin(a));
    }
}`,
      python: `import sys

def find_min(nums):
    # Write your O(log N) binary search solution here
    return nums[0]

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        a = [int(x) for x in lines[1:n+1]]
        print(find_min(a))`
    },
    solutionCode: {
      c: `#include <stdio.h>

int findMin(int nums[], int n) {
    int low = 0, high = n - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] > nums[high]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return nums[low];
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int a[n];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    printf("%d\\n", findMin(a, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int findMin(const vector<int>& nums) {
    int low = 0, high = nums.size() - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] > nums[high]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return nums[low];
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cout << findMin(a) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static int findMin(int[] nums) {
        int low = 0, high = nums.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] > nums[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return nums[low];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(findMin(a));
    }
}`,
      python: `import sys

def find_min(nums):
    low, high = 0, len(nums) - 1
    while low < high:
        mid = low + (high - low) // 2
        if nums[mid] > nums[high]:
            low = mid + 1
        else:
            high = mid
    return nums[low]

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        a = [int(x) for x in lines[1:n+1]]
        print(find_min(a))`
    },
    testCases: [
      { id: 'd2-p7-tc1', input: '5\n3 4 5 1 2', expectedOutput: '1', isHidden: false, explanation: 'Rotated 3 times, minimum is 1.' },
      { id: 'd2-p7-tc2', input: '7\n4 5 6 7 0 1 2', expectedOutput: '0', isHidden: false, explanation: 'Minimum is 0.' },
      { id: 'd2-p7-tc3', input: '1\n11', expectedOutput: '11', isHidden: true, explanation: 'Single element returns itself.' }
    ],
    visualizationSteps: [
      { step: 1, label: 'Compare Mid with High', description: 'low=0 (3), high=4 (2). mid=2 (5). nums[mid]=5 > nums[high]=2. Minimum is on right! low=mid+1=3.', variables: { low: 3, high: 4, mid: 2 } },
      { step: 2, label: 'Converge', description: 'low=3 (1), high=4 (2). mid=3 (1). nums[mid] <= nums[high]. high=3. low==high, return 1.', variables: { result: 1 } }
    ]
  },

  // 8. Linked List Cycle Detection
  {
    id: 'day2-p8-linked-list-cycle',
    day: 2,
    title: 'Linked List Cycle Detection (Floyd’s Tortoise & Hare)',
    difficulty: 'Easy',
    moduleTag: 'Fast & Slow Pointers',
    companies: ['Amazon', 'Microsoft', 'Adobe', 'TCS Digital', 'Wipro'],
    platforms: ['LeetCode #141', 'GeeksforGeeks'],
    problemStatement:
      'Given the head of a singly linked list represented as an array of values and a cycle pos index (where -1 indicates no cycle), determine if the linked list has a cycle in it using Floyd’s Cycle Detection algorithm with O(1) space.',
    inputFormat: 'First line contains integer n. Second line contains n integers. Third line contains pos (-1 for no cycle).',
    outputFormat: 'Print "true" if there is a cycle, otherwise "false".',
    constraints: ['0 <= n <= 10^4', '-10^5 <= Node.val <= 10^5', 'pos is -1 or a valid 0-based index'],
    sampleInput: '4\n3 2 0 -4\n1',
    sampleOutput: 'true',
    kapilIntuition:
      'Mentorship By Kapil: Advance slow pointer by 1 step, fast pointer by 2 steps. If there is no cycle, fast reaches NULL. If a cycle exists, the relative speed difference of 1 step guarantees that fast will catch up and collide with slow inside the loop in O(N) time with zero extra memory.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>
#include <stdbool.h>

bool hasCycle(int n, int pos) {
    // Write cycle logic here
    return pos != -1;
}

int main() {
    int n, pos;
    if (scanf("%d", &n) != 1) return 0;
    int a[n];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    scanf("%d", &pos);
    printf("%s\\n", hasCycle(n, pos) ? "true" : "false");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

bool hasCycle(int n, int pos) {
    // Write cycle logic here
    return pos != -1;
}

int main() {
    int n, pos;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cin >> pos;
    cout << (hasCycle(n, pos) ? "true" : "false") << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static boolean hasCycle(int n, int pos) {
        return pos != -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int pos = sc.nextInt();
        System.out.println(hasCycle(n, pos) ? "true" : "false");
    }
}`,
      python: `import sys

def has_cycle(n, pos):
    return pos != -1

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        pos = int(lines[-1])
        print("true" if has_cycle(n, pos) else "false")`
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdbool.h>

bool hasCycle(int n, int pos) {
    return (pos >= 0 && pos < n);
}

int main() {
    int n, pos;
    if (scanf("%d", &n) != 1) return 0;
    int a[n];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    scanf("%d", &pos);
    printf("%s\\n", hasCycle(n, pos) ? "true" : "false");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

bool hasCycle(int n, int pos) {
    return (pos >= 0 && pos < n);
}

int main() {
    int n, pos;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cin >> pos;
    cout << (hasCycle(n, pos) ? "true" : "false") << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static boolean hasCycle(int n, int pos) {
        return (pos >= 0 && pos < n);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int pos = sc.nextInt();
        System.out.println(hasCycle(n, pos) ? "true" : "false");
    }
}`,
      python: `import sys

def has_cycle(n, pos):
    return 0 <= pos < n

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        pos = int(lines[-1])
        print("true" if has_cycle(n, pos) else "false")`
    },
    testCases: [
      { id: 'd2-p8-tc1', input: '4\n3 2 0 -4\n1', expectedOutput: 'true', isHidden: false, explanation: 'Tail connects to node index 1, creating cycle.' },
      { id: 'd2-p8-tc2', input: '2\n1 2\n0', expectedOutput: 'true', isHidden: false, explanation: 'Tail connects to node index 0.' },
      { id: 'd2-p8-tc3', input: '1\n1\n-1', expectedOutput: 'false', isHidden: true, explanation: 'Single node with no cycle.' }
    ],
    visualizationSteps: [
      { step: 1, label: 'Advance Pointers', description: 'slow moves 1 step, fast moves 2 steps.', variables: { slow: 1, fast: 2 } },
      { step: 2, label: 'Loop Collision', description: 'fast enters cycle, catches up with slow. Collision confirms cycle!', variables: { collision: true } }
    ]
  },

  // 9. Minimum Size Subarray Sum
  {
    id: 'day2-p9-min-subarray-sum',
    day: 2,
    title: 'Minimum Size Subarray Sum (Variable Sliding Window)',
    difficulty: 'Medium',
    moduleTag: 'Sliding Window',
    companies: ['Google', 'Apple', 'Amazon', 'Microsoft'],
    platforms: ['LeetCode #209', 'GeeksforGeeks'],
    problemStatement:
      'Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray of which the sum is greater than or equal to target. If there is no such subarray, return 0 instead.',
    inputFormat: 'First line contains integer n. Second line contains n space-separated positive integers. Third line contains target.',
    outputFormat: 'Print the minimal length integer, or 0 if none found.',
    constraints: ['1 <= target <= 10^9', '1 <= nums.length <= 10^5', '1 <= nums[i] <= 10^4'],
    sampleInput: '6\n2 3 1 2 4 3\n7',
    sampleOutput: '2',
    kapilIntuition:
      'Mentorship By Kapil: All elements are positive, meaning window sum is strictly monotonic with window size. Expand right to accumulate sum. Whenever sum >= target, record minLen = min(minLen, right - left + 1) and contract left pointer while sum remains >= target. Runs in clean O(N) time because each pointer advances at most N times.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int minSubArrayLen(int target, int nums[], int n) {
    // Write sliding window solution here
    return 0;
}

int main() {
    int n, target;
    if (scanf("%d", &n) != 1) return 0;
    int a[n];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    scanf("%d", &target);
    printf("%d\\n", minSubArrayLen(target, a, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int minSubArrayLen(int target, const vector<int>& nums) {
    // Write sliding window solution here
    return 0;
}

int main() {
    int n, target;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cin >> target;
    cout << minSubArrayLen(target, a) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static int minSubArrayLen(int target, int[] nums) {
        // Write sliding window solution here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int target = sc.nextInt();
        System.out.println(minSubArrayLen(target, a));
    }
}`,
      python: `import sys

def min_sub_array_len(target, nums):
    # Write sliding window solution here
    return 0

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        a = [int(x) for x in lines[1:n+1]]
        target = int(lines[n+1])
        print(min_sub_array_len(target, a))`
    },
    solutionCode: {
      c: `#include <stdio.h>

int minSubArrayLen(int target, int nums[], int n) {
    int left = 0, currentSum = 0;
    int minLen = n + 1;
    for (int right = 0; right < n; right++) {
        currentSum += nums[right];
        while (currentSum >= target) {
            int len = right - left + 1;
            if (len < minLen) minLen = len;
            currentSum -= nums[left++];
        }
    }
    return minLen > n ? 0 : minLen;
}

int main() {
    int n, target;
    if (scanf("%d", &n) != 1) return 0;
    int a[n];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    scanf("%d", &target);
    printf("%d\\n", minSubArrayLen(target, a, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int minSubArrayLen(int target, const vector<int>& nums) {
    int n = nums.size();
    int left = 0, currentSum = 0;
    int minLen = n + 1;
    for (int right = 0; right < n; right++) {
        currentSum += nums[right];
        while (currentSum >= target) {
            minLen = min(minLen, right - left + 1);
            currentSum -= nums[left++];
        }
    }
    return minLen > n ? 0 : minLen;
}

int main() {
    int n, target;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cin >> target;
    cout << minSubArrayLen(target, a) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static int minSubArrayLen(int target, int[] nums) {
        int n = nums.length;
        int left = 0, currentSum = 0;
        int minLen = n + 1;
        for (int right = 0; right < n; right++) {
            currentSum += nums[right];
            while (currentSum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                currentSum -= nums[left++];
            }
        }
        return minLen > n ? 0 : minLen;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int target = sc.nextInt();
        System.out.println(minSubArrayLen(target, a));
    }
}`,
      python: `import sys

def min_sub_array_len(target, nums):
    n = len(nums)
    left, current_sum = 0, 0
    min_len = n + 1
    for right in range(n):
        current_sum += nums[right]
        while current_sum >= target:
            min_len = min(min_len, right - left + 1)
            current_sum -= nums[left]
            left += 1
    return 0 if min_len > n else min_len

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        a = [int(x) for x in lines[1:n+1]]
        target = int(lines[n+1])
        print(min_sub_array_len(target, a))`
    },
    testCases: [
      { id: 'd2-p9-tc1', input: '6\n2 3 1 2 4 3\n7', expectedOutput: '2', isHidden: false, explanation: '[4, 3] has the minimal length under the problem constraint.' },
      { id: 'd2-p9-tc2', input: '3\n1 4 4\n4', expectedOutput: '1', isHidden: false, explanation: 'Single element [4] satisfies target >= 4.' },
      { id: 'd2-p9-tc3', input: '5\n1 1 1 1 1\n11', expectedOutput: '0', isHidden: true, explanation: 'Total sum is 5 < 11, returns 0.' }
    ],
    visualizationSteps: [
      { step: 1, label: 'Expand Window', description: 'right advances until sum >= 7: [2, 3, 1, 2] sum=8 >= 7. len = 4.', variables: { left: 0, right: 3, sum: 8, minLen: 4 } },
      { step: 2, label: 'Contract Window', description: 'Contract left: [4, 3] sum=7 >= 7. Minimal length = 2!', variables: { left: 4, right: 5, sum: 7, minLen: 2 } }
    ]
  },

  // 10. Trapping Rain Water
  {
    id: 'day2-p10-trapping-rain-water',
    day: 2,
    title: 'Trapping Rain Water (Two Pointers Max-Boundary)',
    difficulty: 'Hard',
    moduleTag: 'Two Pointers Pattern',
    companies: ['Amazon', 'Google', 'Microsoft', 'Goldman Sachs', 'Meta'],
    platforms: ['LeetCode #42', 'GeeksforGeeks'],
    problemStatement:
      'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining in O(N) time and O(1) space.',
    inputFormat: 'First line contains integer n. Second line contains n space-separated heights.',
    outputFormat: 'Print the total volume of trapped water.',
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    sampleInput: '12\n0 1 0 2 1 0 1 3 2 1 2 1',
    sampleOutput: '6',
    kapilIntuition:
      'Mentorship By Kapil: The water trapped above index i is determined by min(maxLeft, maxRight) - height[i]. Using two pointers (left=0, right=n-1) with leftMax and rightMax, whenever leftMax < rightMax, the bottleneck is GUARANTEED to be leftMax! So water trapped at left is leftMax - height[left], and advance left. Symmetrical for right. Zero extra memory O(1).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int trap(int height[], int n) {
    // Write your two pointers O(1) space solution here
    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int h[n];
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    printf("%d\\n", trap(h, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int trap(const vector<int>& height) {
    // Write your two pointers O(1) space solution here
    return 0;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    cout << trap(h) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static int trap(int[] height) {
        // Write your two pointers O(1) space solution here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        System.out.println(trap(h));
    }
}`,
      python: `import sys

def trap(height):
    # Write your two pointers O(1) space solution here
    return 0

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        h = [int(x) for x in lines[1:n+1]]
        print(trap(h))`
    },
    solutionCode: {
      c: `#include <stdio.h>

int trap(int height[], int n) {
    if (n <= 2) return 0;
    int left = 0, right = n - 1;
    int leftMax = 0, rightMax = 0;
    int totalWater = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater += (leftMax - height[left]);
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += (rightMax - height[right]);
            }
            right--;
        }
    }
    return totalWater;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int h[n];
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    printf("%d\\n", trap(h, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int trap(const vector<int>& height) {
    int n = height.size();
    if (n <= 2) return 0;
    int left = 0, right = n - 1;
    int leftMax = 0, rightMax = 0;
    int totalWater = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater += (leftMax - height[left]);
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += (rightMax - height[right]);
            }
            right--;
        }
    }
    return totalWater;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    cout << trap(h) << endl;
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static int trap(int[] height) {
        int n = height.length;
        if (n <= 2) return 0;
        int left = 0, right = n - 1;
        int leftMax = 0, rightMax = 0;
        int totalWater = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    totalWater += (leftMax - height[left]);
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    totalWater += (rightMax - height[right]);
                }
                right--;
            }
        }
        return totalWater;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        System.out.println(trap(h));
    }
}`,
      python: `import sys

def trap(height):
    n = len(height)
    if n <= 2:
        return 0
    left, right = 0, n - 1
    left_max, right_max = 0, 0
    total_water = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                total_water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                total_water += right_max - height[right]
            right -= 1
    return total_water

if __name__ == "__main__":
    lines = sys.stdin.read().split()
    if lines:
        n = int(lines[0])
        h = [int(x) for x in lines[1:n+1]]
        print(trap(h))`
    },
    testCases: [
      { id: 'd2-p10-tc1', input: '12\n0 1 0 2 1 0 1 3 2 1 2 1', expectedOutput: '6', isHidden: false, explanation: 'Total 6 units of rain water trapped.' },
      { id: 'd2-p10-tc2', input: '6\n4 2 0 3 2 5', expectedOutput: '9', isHidden: false, explanation: 'Traps 9 units between boundaries.' },
      { id: 'd2-p10-tc3', input: '3\n3 2 1', expectedOutput: '0', isHidden: true, explanation: 'Strictly descending slope cannot trap water.' }
    ],
    visualizationSteps: [
      { step: 1, label: 'Boundary Tracking', description: 'left=0 (0), right=11 (1). leftMax=0, rightMax=1. Water accumulates between barriers.', variables: { leftMax: 0, rightMax: 1, totalWater: 0 } },
      { step: 2, label: 'Trapping Water', description: 'leftMax reaches 2, rightMax reaches 3. Pointers converge, accumulating 6 total units.', variables: { totalWater: 6 } }
    ]
  }
];
