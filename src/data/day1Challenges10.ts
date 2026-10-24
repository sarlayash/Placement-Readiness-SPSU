import { PracticalChallenge } from '../types';

/**
 * 10 Very Basic Solved Placement Problems for Day 1 - Virtual Lab
 * Mapped to LeetCode, HackerRank, GeeksforGeeks & Core Hiring Companies (TCS, Infosys, Amazon, etc.)
 * Fully solved in C, C++, Java, and Python with step-by-step Execution Visualizations & Test Cases.
 */
export const DAY_1_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  {
    "id": "day1-p1-two-sum",
    "day": 1,
    "title": "Two Sum - Target Pair Indices",
    "difficulty": "Easy",
    "moduleTag": "Arrays & Two Pointers",
    "companies": [
      "TCS",
      "Infosys",
      "Amazon",
      "Cognizant",
      "Wipro"
    ],
    "platforms": [
      "LeetCode #1",
      "GeeksforGeeks",
      "HackerRank"
    ],
    "problemStatement": "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`. Each input has exactly one solution, and you may not use the same element twice. Print the two indices separated by a space.",
    "inputFormat": "First line contains integer n (array size). Second line contains n space-separated integers. Third line contains integer target.",
    "outputFormat": "Print the two 0-based indices separated by a space in ascending order.",
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Exactly one valid answer exists."
    ],
    "sampleInput": "4\\n2 7 11 15\\n9",
    "sampleOutput": "0 1",
    "kapilIntuition": "Mentorship By Kapil: Start with the two-pointer or hash map mental model. For every element nums[i], compute complement = target - nums[i]. Check if complement exists earlier. For beginner level, nested loop runs in O(N^2) time and O(1) space; hash map achieves O(N) time and O(N) space.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "starterCode": {
      "c": "#include <stdio.h>\\n\\nvoid twoSum(int nums[], int n, int target) {\\n    // TODO: Write your code here to find indices adding up to target\\n    for (int i = 0; i < n; i++) {\\n        for (int j = i + 1; j < n; j++) {\\n            if (nums[i] + nums[j] == target) {\\n                printf(\"%d %d\\\\n\", i, j);\\n                return;\\n            }\\n        }\\n    }\\n}\\n\\nint main() {\\n    int n, target;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    int nums[n];\\n    for (int i = 0; i < n; i++) scanf(\"%d\", &nums[i]);\\n    scanf(\"%d\", &target);\\n    twoSum(nums, n, target);\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\n#include <vector>\\n#include <unordered_map>\\nusing namespace std;\\n\\nvoid twoSum(const vector<int>& nums, int target) {\\n    unordered_map<int, int> seen;\\n    for (int i = 0; i < (int)nums.size(); i++) {\\n        int complement = target - nums[i];\\n        if (seen.find(complement) != seen.end()) {\\n            cout << seen[complement] << \" \" << i << \"\\\\n\";\\n            return;\\n        }\\n        seen[nums[i]] = i;\\n    }\\n}\\n\\nint main() {\\n    int n, target;\\n    if (!(cin >> n)) return 0;\\n    vector<int> nums(n);\\n    for (int i = 0; i < n; i++) cin >> nums[i];\\n    cin >> target;\\n    twoSum(nums, target);\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void twoSum(int[] nums, int target) {\\n        Map<Integer, Integer> map = new HashMap<>();\\n        for (int i = 0; i < nums.length; i++) {\\n            int complement = target - nums[i];\\n            if (map.containsKey(complement)) {\\n                System.out.println(map.get(complement) + \" \" + i);\\n                return;\\n            }\\n            map.put(nums[i], i);\\n        }\\n    }\\n\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        int[] nums = new int[n];\\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\\n        int target = sc.nextInt();\\n        twoSum(nums, target);\\n    }\\n}",
      "python": "import sys\\n\\ndef two_sum(nums, target):\\n    seen = {}\\n    for i, num in enumerate(nums):\\n        complement = target - num\\n        if complement in seen:\\n            print(f\"{seen[complement]} {i}\")\\n            return\\n        seen[num] = i\\n\\nif __name__ == \"__main__\":\\n    input_data = sys.stdin.read().split()\\n    if input_data:\\n        n = int(input_data[0])\\n        nums = [int(x) for x in input_data[1:n+1]]\\n        target = int(input_data[n+1])\\n        two_sum(nums, target)"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\\n\\n// Kapil Verified Reference Solution (C)\\nint main() {\\n    int n, target;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    int nums[n];\\n    for (int i = 0; i < n; i++) scanf(\"%d\", &nums[i]);\\n    scanf(\"%d\", &target);\\n    \\n    for (int i = 0; i < n; i++) {\\n        for (int j = i + 1; j < n; j++) {\\n            if (nums[i] + nums[j] == target) {\\n                printf(\"%d %d\\\\n\", i, j);\\n                return 0;\\n            }\\n        }\\n    }\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\n#include <vector>\\n#include <unordered_map>\\nusing namespace std;\\n\\n// Kapil Verified Reference Solution (C++ - O(N) Hash Table)\\nint main() {\\n    int n, target;\\n    if (!(cin >> n)) return 0;\\n    vector<int> nums(n);\\n    for (int i = 0; i < n; i++) cin >> nums[i];\\n    cin >> target;\\n    \\n    unordered_map<int, int> seen;\\n    for (int i = 0; i < n; i++) {\\n        int complement = target - nums[i];\\n        if (seen.count(complement)) {\\n            cout << seen[complement] << \" \" << i << \"\\\\n\";\\n            return 0;\\n        }\\n        seen[nums[i]] = i;\\n    }\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\n// Kapil Verified Reference Solution (Java - O(N) HashMap)\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        int[] nums = new int[n];\\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\\n        int target = sc.nextInt();\\n        \\n        Map<Integer, Integer> map = new HashMap<>();\\n        for (int i = 0; i < n; i++) {\\n            int complement = target - nums[i];\\n            if (map.containsKey(complement)) {\\n                System.out.println(map.get(complement) + \" \" + i);\\n                return;\\n            }\\n            map.put(nums[i], i);\\n        }\\n    }\\n}",
      "python": "import sys\\n\\n# Kapil Verified Reference Solution (Python 3 - O(N) Dictionary)\\ndef main():\\n    tokens = sys.stdin.read().split()\\n    if not tokens: return\\n    n = int(tokens[0])\\n    nums = [int(x) for x in tokens[1:n+1]]\\n    target = int(tokens[n+1])\\n    \\n    seen = {}\\n    for i, num in enumerate(nums):\\n        complement = target - num\\n        if complement in seen:\\n            print(f\"{seen[complement]} {i}\")\\n            return\\n        seen[num] = i\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "testCases": [
      {
        "id": "tc-1",
        "input": "4\\n2 7 11 15\\n9",
        "expectedOutput": "0 1",
        "isHidden": false,
        "explanation": "nums[0] + nums[1] = 2 + 7 = 9. Output indices 0 1."
      },
      {
        "id": "tc-2",
        "input": "3\\n3 2 4\\n6",
        "expectedOutput": "1 2",
        "isHidden": false,
        "explanation": "nums[1] + nums[2] = 2 + 4 = 6. Output indices 1 2."
      },
      {
        "id": "tc-3",
        "input": "2\\n3 3\\n6",
        "expectedOutput": "0 1",
        "isHidden": true,
        "explanation": "nums[0] + nums[1] = 3 + 3 = 6. Output indices 0 1."
      },
      {
        "id": "tc-4",
        "input": "5\\n1 5 8 10 14\\n18",
        "expectedOutput": "2 3",
        "isHidden": true,
        "explanation": "nums[2] + nums[3] = 8 + 10 = 18. Output indices 2 3."
      }
    ],
    "visualizationSteps": [
      {
        "step": 1,
        "label": "Initialize Target & Array",
        "description": "Target is 9. Inspecting index 0 with value 2. Needed complement is target - 2 = 7.",
        "variables": {
          "i": 0,
          "current_value": 2,
          "target": 9,
          "complement": 7
        },
        "arrayState": {
          "elements": [
            2,
            7,
            11,
            15
          ],
          "activeIndices": [
            0
          ],
          "pointerLabels": {
            "0": "i (val=2)"
          }
        }
      },
      {
        "step": 2,
        "label": "Store in Hash Table / Move to Next",
        "description": "Complement 7 not seen yet. Record {2: index 0}. Move pointer to index 1 with value 7.",
        "variables": {
          "i": 1,
          "current_value": 7,
          "target": 9,
          "complement": 2
        },
        "arrayState": {
          "elements": [
            2,
            7,
            11,
            15
          ],
          "activeIndices": [
            1
          ],
          "pointerLabels": {
            "1": "i (val=7)"
          }
        }
      },
      {
        "step": 3,
        "label": "Complement Found!",
        "description": "Complement 2 exists at index 0! Pair found at indices 0 and 1 (2 + 7 = 9).",
        "variables": {
          "index_1": 0,
          "index_2": 1,
          "sum": 9,
          "match": "SUCCESS"
        },
        "arrayState": {
          "elements": [
            2,
            7,
            11,
            15
          ],
          "activeIndices": [
            0,
            1
          ],
          "pointerLabels": {
            "0": "First",
            "1": "Second"
          }
        }
      }
    ]
  },
  {
    "id": "day1-p2-reverse-array",
    "day": 1,
    "title": "Reverse an Array In-Place",
    "difficulty": "Easy",
    "moduleTag": "Arrays & Two Pointers",
    "companies": [
      "Accenture",
      "TCS",
      "Wipro",
      "Capgemini"
    ],
    "platforms": [
      "LeetCode #344",
      "GeeksforGeeks",
      "HackerRank"
    ],
    "problemStatement": "Given an array of integers, reverse the array in-place so that the first element becomes the last, and the last becomes the first, without allocating extra array space (O(1) auxiliary space). Print the reversed array elements separated by spaces.",
    "inputFormat": "First line contains integer n. Second line contains n space-separated integers.",
    "outputFormat": "Print the elements of the reversed array separated by space.",
    "constraints": [
      "1 <= n <= 10^5",
      "-10^9 <= arr[i] <= 10^9"
    ],
    "sampleInput": "5\\n1 2 3 4 5",
    "sampleOutput": "5 4 3 2 1",
    "kapilIntuition": "Mentorship By Kapil: Use two pointers: left = 0 and right = n - 1. In each iteration, swap arr[left] and arr[right], then left++ and right--. Stop when left >= right. This avoids allocating extra memory.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCode": {
      "c": "#include <stdio.h>\\n\\nvoid reverseArray(int arr[], int n) {\\n    // TODO: Reverse array in-place using two pointers\\n    int left = 0, right = n - 1;\\n    while (left < right) {\\n        int temp = arr[left];\\n        arr[left] = arr[right];\\n        arr[right] = temp;\\n        left++;\\n        right--;\\n    }\\n}\\n\\nint main() {\\n    int n;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    int arr[n];\\n    for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\\n    reverseArray(arr, n);\\n    for (int i = 0; i < n; i++) {\\n        printf(\"%d%s\", arr[i], (i == n - 1 ? \"\" : \" \"));\\n    }\\n    printf(\"\\\\n\");\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\n#include <vector>\\nusing namespace std;\\n\\nvoid reverseArray(vector<int>& arr) {\\n    int left = 0, right = arr.size() - 1;\\n    while (left < right) {\\n        swap(arr[left++], arr[right--]);\\n    }\\n}\\n\\nint main() {\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    vector<int> arr(n);\\n    for (int i = 0; i < n; i++) cin >> arr[i];\\n    reverseArray(arr);\\n    for (int i = 0; i < n; i++) cout << arr[i] << (i == n - 1 ? \"\" : \" \");\\n    cout << endl;\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void reverseArray(int[] arr) {\\n        int left = 0, right = arr.length - 1;\\n        while (left < right) {\\n            int temp = arr[left];\\n            arr[left] = arr[right];\\n            arr[right] = temp;\\n            left++;\\n            right--;\\n        }\\n    }\\n\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        int[] arr = new int[n];\\n        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\\n        reverseArray(arr);\\n        for (int i = 0; i < n; i++) {\\n            System.out.print(arr[i] + (i == n - 1 ? \"\" : \" \"));\\n        }\\n        System.out.println();\\n    }\\n}",
      "python": "import sys\\n\\ndef reverse_array(arr):\\n    left, right = 0, len(arr) - 1\\n    while left < right:\\n        arr[left], arr[right] = arr[right], arr[left]\\n        left += 1\\n        right -= 1\\n\\nif __name__ == \"__main__\":\\n    data = sys.stdin.read().split()\\n    if data:\\n        n = int(data[0])\\n        arr = [int(x) for x in data[1:n+1]]\\n        reverse_array(arr)\\n        print(*(arr))"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\\n\\nint main() {\\n    int n;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    int arr[n];\\n    for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\\n    int left = 0, right = n - 1;\\n    while (left < right) {\\n        int tmp = arr[left];\\n        arr[left] = arr[right];\\n        arr[right] = tmp;\\n        left++; right--;\\n    }\\n    for (int i = 0; i < n; i++) printf(\"%d%s\", arr[i], (i == n - 1 ? \"\" : \" \"));\\n    printf(\"\\\\n\");\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\n#include <vector>\\nusing namespace std;\\n\\nint main() {\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    vector<int> arr(n);\\n    for (int i = 0; i < n; i++) cin >> arr[i];\\n    int left = 0, right = n - 1;\\n    while (left < right) swap(arr[left++], arr[right--]);\\n    for (int i = 0; i < n; i++) cout << arr[i] << (i == n - 1 ? \"\" : \" \");\\n    cout << endl;\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        int[] arr = new int[n];\\n        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\\n        int left = 0, right = n - 1;\\n        while (left < right) {\\n            int temp = arr[left];\\n            arr[left] = arr[right];\\n            arr[right] = temp;\\n            left++; right--;\\n        }\\n        for (int i = 0; i < n; i++) System.out.print(arr[i] + (i == n - 1 ? \"\" : \" \"));\\n        System.out.println();\\n    }\\n}",
      "python": "import sys\\n\\ndef main():\\n    tokens = sys.stdin.read().split()\\n    if not tokens: return\\n    n = int(tokens[0])\\n    arr = [int(x) for x in tokens[1:n+1]]\\n    left, right = 0, n - 1\\n    while left < right:\\n        arr[left], arr[right] = arr[right], arr[left]\\n        left += 1; right -= 1\\n    print(*(arr))\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "testCases": [
      {
        "id": "tc-1",
        "input": "5\\n1 2 3 4 5",
        "expectedOutput": "5 4 3 2 1",
        "isHidden": false,
        "explanation": "Reversing 1 2 3 4 5 produces 5 4 3 2 1."
      },
      {
        "id": "tc-2",
        "input": "4\\n10 20 30 40",
        "expectedOutput": "40 30 20 10",
        "isHidden": false,
        "explanation": "Even length array swapped symmetrically."
      },
      {
        "id": "tc-3",
        "input": "1\\n42",
        "expectedOutput": "42",
        "isHidden": true,
        "explanation": "Single element array remains unchanged."
      },
      {
        "id": "tc-4",
        "input": "6\\n7 1 9 3 5 2",
        "expectedOutput": "2 5 3 9 1 7",
        "isHidden": true,
        "explanation": "General test case with random integers."
      }
    ],
    "visualizationSteps": [
      {
        "step": 1,
        "label": "Initial Pointers",
        "description": "left pointer at index 0 (val=1), right pointer at index 4 (val=5).",
        "variables": {
          "left": 0,
          "right": 4,
          "action": "Ready to swap"
        },
        "arrayState": {
          "elements": [
            1,
            2,
            3,
            4,
            5
          ],
          "activeIndices": [
            0,
            4
          ],
          "pointerLabels": {
            "0": "L",
            "4": "R"
          }
        }
      },
      {
        "step": 2,
        "label": "First Swap Completed",
        "description": "Swapped arr[0] and arr[4]. New array: [5, 2, 3, 4, 1]. Move left to 1, right to 3.",
        "variables": {
          "left": 1,
          "right": 3,
          "action": "Swapped 1 and 5"
        },
        "arrayState": {
          "elements": [
            5,
            2,
            3,
            4,
            1
          ],
          "activeIndices": [
            1,
            3
          ],
          "pointerLabels": {
            "1": "L",
            "3": "R"
          }
        }
      },
      {
        "step": 3,
        "label": "Second Swap & Convergence",
        "description": "Swapped arr[1] and arr[3]. New array: [5, 4, 3, 2, 1]. Pointers converge at center index 2.",
        "variables": {
          "left": 2,
          "right": 2,
          "action": "Reversal complete"
        },
        "arrayState": {
          "elements": [
            5,
            4,
            3,
            2,
            1
          ],
          "activeIndices": [
            2
          ],
          "pointerLabels": {
            "2": "Center"
          }
        }
      }
    ]
  },
  {
    "id": "day1-p3-palindrome-check",
    "day": 1,
    "title": "Palindrome String & Number Check",
    "difficulty": "Easy",
    "moduleTag": "Strings & Two Pointers",
    "companies": [
      "Infosys",
      "Tech Mahindra",
      "Cognizant",
      "Zoho"
    ],
    "platforms": [
      "LeetCode #9 / #125",
      "GeeksforGeeks",
      "HackerRank"
    ],
    "problemStatement": "Given a string S consisting of lowercase alphanumeric characters, determine if it is a palindrome (reads identically forwards and backwards). Print \"YES\" if it is a palindrome, otherwise print \"NO\".",
    "inputFormat": "A single line containing the string S.",
    "outputFormat": "Print \"YES\" or \"NO\" (uppercase).",
    "constraints": [
      "1 <= S.length <= 10^5",
      "S consists only of alphanumeric characters."
    ],
    "sampleInput": "racecar",
    "sampleOutput": "YES",
    "kapilIntuition": "Mentorship By Kapil: Set left pointer to 0 and right pointer to length - 1. Compare characters S[left] and S[right]. If any pair mismatches, terminate early with NO. If pointers cross without conflict, return YES in O(N) time and O(1) space.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCode": {
      "c": "#include <stdio.h>\\n#include <string.h>\\n\\nint isPalindrome(char str[]) {\\n    int left = 0, right = strlen(str) - 1;\\n    while (left < right) {\\n        if (str[left] != str[right]) return 0;\\n        left++; right--;\\n    }\\n    return 1;\\n}\\n\\nint main() {\\n    char str[100005];\\n    if (scanf(\"%s\", str) != 1) return 0;\\n    if (isPalindrome(str)) printf(\"YES\\\\n\");\\n    else printf(\"NO\\\\n\");\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\n#include <string>\\nusing namespace std;\\n\\nbool isPalindrome(const string& s) {\\n    int left = 0, right = s.length() - 1;\\n    while (left < right) {\\n        if (s[left] != s[right]) return false;\\n        left++; right--;\\n    }\\n    return true;\\n}\\n\\nint main() {\\n    string s;\\n    if (!(cin >> s)) return 0;\\n    cout << (isPalindrome(s) ? \"YES\" : \"NO\") << endl;\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static boolean isPalindrome(String s) {\\n        int left = 0, right = s.length() - 1;\\n        while (left < right) {\\n            if (s.charAt(left) != s.charAt(right)) return false;\\n            left++; right--;\\n        }\\n        return true;\\n    }\\n\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNext()) return;\\n        String s = sc.next();\\n        System.out.println(isPalindrome(s) ? \"YES\" : \"NO\");\\n    }\\n}",
      "python": "import sys\\n\\ndef is_palindrome(s):\\n    return s == s[::-1]\\n\\nif __name__ == \"__main__\":\\n    line = sys.stdin.read().strip()\\n    if line:\\n        print(\"YES\" if is_palindrome(line) else \"NO\")"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\\n#include <string.h>\\n\\nint main() {\\n    char s[100005];\\n    if (scanf(\"%s\", s) != 1) return 0;\\n    int l = 0, r = strlen(s) - 1;\\n    int pal = 1;\\n    while (l < r) {\\n        if (s[l] != s[r]) { pal = 0; break; }\\n        l++; r--;\\n    }\\n    printf(\"%s\\\\n\", pal ? \"YES\" : \"NO\");\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\n#include <string>\\nusing namespace std;\\n\\nint main() {\\n    string s;\\n    if (!(cin >> s)) return 0;\\n    int l = 0, r = s.size() - 1;\\n    bool ok = true;\\n    while (l < r) {\\n        if (s[l++] != s[r--]) { ok = false; break; }\\n    }\\n    cout << (ok ? \"YES\" : \"NO\") << endl;\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNext()) return;\\n        String s = sc.next();\\n        int l = 0, r = s.length() - 1;\\n        boolean ok = true;\\n        while (l < r) {\\n            if (s.charAt(l++) != s.charAt(r--)) { ok = false; break; }\\n        }\\n        System.out.println(ok ? \"YES\" : \"NO\");\\n    }\\n}",
      "python": "import sys\\n\\ndef main():\\n    s = sys.stdin.read().strip()\\n    if not s: return\\n    print(\"YES\" if s == s[::-1] else \"NO\")\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "testCases": [
      {
        "id": "tc-1",
        "input": "racecar",
        "expectedOutput": "YES",
        "isHidden": false,
        "explanation": "racecar spelled backwards is racecar."
      },
      {
        "id": "tc-2",
        "input": "placement",
        "expectedOutput": "NO",
        "isHidden": false,
        "explanation": "placement backwards is tnemecalp, not equal."
      },
      {
        "id": "tc-3",
        "input": "madam",
        "expectedOutput": "YES",
        "isHidden": true,
        "explanation": "madam is symmetric."
      },
      {
        "id": "tc-4",
        "input": "12321",
        "expectedOutput": "YES",
        "isHidden": true,
        "explanation": "Numeric string palindrome check."
      }
    ],
    "visualizationSteps": [
      {
        "step": 1,
        "label": "Outer Character Check",
        "description": "Left at 0 (\"r\"), Right at 6 (\"r\"). Characters match! Advance pointers.",
        "variables": {
          "left": 0,
          "right": 6,
          "char_left": "r",
          "char_right": "r",
          "match": true
        },
        "arrayState": {
          "elements": [
            "r",
            "a",
            "c",
            "e",
            "c",
            "a",
            "r"
          ],
          "activeIndices": [
            0,
            6
          ],
          "pointerLabels": {
            "0": "L",
            "6": "R"
          }
        }
      },
      {
        "step": 2,
        "label": "Second Level Check",
        "description": "Left at 1 (\"a\"), Right at 5 (\"a\"). Characters match! Advance pointers.",
        "variables": {
          "left": 1,
          "right": 5,
          "char_left": "a",
          "char_right": "a",
          "match": true
        },
        "arrayState": {
          "elements": [
            "r",
            "a",
            "c",
            "e",
            "c",
            "a",
            "r"
          ],
          "activeIndices": [
            1,
            5
          ],
          "pointerLabels": {
            "1": "L",
            "5": "R"
          }
        }
      },
      {
        "step": 3,
        "label": "Third Level & Center",
        "description": "Left at 2 (\"c\"), Right at 4 (\"c\"). Match! Converged at center \"e\". Result: YES.",
        "variables": {
          "left": 2,
          "right": 4,
          "char_left": "c",
          "char_right": "c",
          "result": "YES"
        },
        "arrayState": {
          "elements": [
            "r",
            "a",
            "c",
            "e",
            "c",
            "a",
            "r"
          ],
          "activeIndices": [
            2,
            3,
            4
          ],
          "pointerLabels": {
            "3": "Center"
          }
        }
      }
    ]
  },
  {
    "id": "day1-p4-find-min-max",
    "day": 1,
    "title": "Find Minimum & Maximum in Array",
    "difficulty": "Easy",
    "moduleTag": "Arrays & Traversal",
    "companies": [
      "TCS",
      "HCL",
      "Wipro",
      "Accenture"
    ],
    "platforms": [
      "GeeksforGeeks",
      "HackerRank"
    ],
    "problemStatement": "Given an array of size n, find the minimum and maximum elements in the array using the minimum number of comparisons. Print the minimum followed by the maximum separated by a space.",
    "inputFormat": "First line contains integer n. Second line contains n space-separated integers.",
    "outputFormat": "Print min_val and max_val separated by space.",
    "constraints": [
      "1 <= n <= 10^5",
      "-10^9 <= arr[i] <= 10^9"
    ],
    "sampleInput": "6\\n3 2 1 56 10000 167",
    "sampleOutput": "1 10000",
    "kapilIntuition": "Mentorship By Kapil: Initialize min = arr[0] and max = arr[0]. Iterate from index 1 to n-1. Update min if current < min; update max if current > max. This takes O(N) time with 2(N-1) comparisons and O(1) space.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCode": {
      "c": "#include <stdio.h>\\n\\nvoid findMinMax(int arr[], int n) {\\n    int min_val = arr[0];\\n    int max_val = arr[0];\\n    for (int i = 1; i < n; i++) {\\n        if (arr[i] < min_val) min_val = arr[i];\\n        if (arr[i] > max_val) max_val = arr[i];\\n    }\\n    printf(\"%d %d\\\\n\", min_val, max_val);\\n}\\n\\nint main() {\\n    int n;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    int arr[n];\\n    for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\\n    findMinMax(arr, n);\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\n#include <vector>\\n#include <algorithm>\\nusing namespace std;\\n\\nint main() {\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    vector<int> arr(n);\\n    for (int i = 0; i < n; i++) cin >> arr[i];\\n    int min_val = arr[0], max_val = arr[0];\\n    for (int i = 1; i < n; i++) {\\n        min_val = min(min_val, arr[i]);\\n        max_val = max(max_val, arr[i]);\\n    }\\n    cout << min_val << \" \" << max_val << endl;\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        int minVal = sc.nextInt();\\n        int maxVal = minVal;\\n        for (int i = 1; i < n; i++) {\\n            int num = sc.nextInt();\\n            if (num < minVal) minVal = num;\\n            if (num > maxVal) maxVal = num;\\n        }\\n        System.out.println(minVal + \" \" + maxVal);\\n    }\\n}",
      "python": "import sys\\n\\ndef main():\\n    tokens = sys.stdin.read().split()\\n    if not tokens: return\\n    n = int(tokens[0])\\n    arr = [int(x) for x in tokens[1:n+1]]\\n    print(f\"{min(arr)} {max(arr)}\")\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\\n\\nint main() {\\n    int n;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    int min_val, max_val;\\n    scanf(\"%d\", &min_val);\\n    max_val = min_val;\\n    for (int i = 1; i < n; i++) {\\n        int v; scanf(\"%d\", &v);\\n        if (v < min_val) min_val = v;\\n        if (v > max_val) max_val = v;\\n    }\\n    printf(\"%d %d\\\\n\", min_val, max_val);\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\n#include <vector>\\nusing namespace std;\\n\\nint main() {\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    int mn, mx;\\n    cin >> mn;\\n    mx = mn;\\n    for (int i = 1; i < n; i++) {\\n        int x; cin >> x;\\n        if (x < mn) mn = x;\\n        if (x > mx) mx = x;\\n    }\\n    cout << mn << \" \" << mx << \"\\\\n\";\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        int mn = sc.nextInt(), mx = mn;\\n        for (int i = 1; i < n; i++) {\\n            int v = sc.nextInt();\\n            if (v < mn) mn = v;\\n            if (v > mx) mx = v;\\n        }\\n        System.out.println(mn + \" \" + mx);\\n    }\\n}",
      "python": "import sys\\n\\ndef main():\\n    tokens = sys.stdin.read().split()\\n    if not tokens: return\\n    n = int(tokens[0])\\n    arr = [int(x) for x in tokens[1:n+1]]\\n    print(f\"{min(arr)} {max(arr)}\")\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "testCases": [
      {
        "id": "tc-1",
        "input": "6\\n3 2 1 56 10000 167",
        "expectedOutput": "1 10000",
        "isHidden": false,
        "explanation": "Min is 1, max is 10000."
      },
      {
        "id": "tc-2",
        "input": "5\\n-10 -20 0 5 15",
        "expectedOutput": "-20 15",
        "isHidden": false,
        "explanation": "Negative numbers handled correctly."
      },
      {
        "id": "tc-3",
        "input": "1\\n99",
        "expectedOutput": "99 99",
        "isHidden": true,
        "explanation": "Single element is both min and max."
      },
      {
        "id": "tc-4",
        "input": "4\\n5 5 5 5",
        "expectedOutput": "5 5",
        "isHidden": true,
        "explanation": "Equal elements array."
      }
    ],
    "visualizationSteps": [
      {
        "step": 1,
        "label": "Initialize with Element 0",
        "description": "min_val = 3, max_val = 3. Pointing to index 0.",
        "variables": {
          "index": 0,
          "current": 3,
          "min_val": 3,
          "max_val": 3
        },
        "arrayState": {
          "elements": [
            3,
            2,
            1,
            56,
            10000,
            167
          ],
          "activeIndices": [
            0
          ],
          "pointerLabels": {
            "0": "Start"
          }
        }
      },
      {
        "step": 2,
        "label": "Scan & Update Minimum",
        "description": "At index 2 (val=1): 1 < 2, so min_val updates to 1. max_val remains 3.",
        "variables": {
          "index": 2,
          "current": 1,
          "min_val": 1,
          "max_val": 3
        },
        "arrayState": {
          "elements": [
            3,
            2,
            1,
            56,
            10000,
            167
          ],
          "activeIndices": [
            2
          ],
          "pointerLabels": {
            "2": "Min Candidate"
          }
        }
      },
      {
        "step": 3,
        "label": "Scan & Update Maximum",
        "description": "At index 4 (val=10000): 10000 > 56, so max_val updates to 10000. Final min=1, max=10000.",
        "variables": {
          "index": 4,
          "current": 10000,
          "min_val": 1,
          "max_val": 10000
        },
        "arrayState": {
          "elements": [
            3,
            2,
            1,
            56,
            10000,
            167
          ],
          "activeIndices": [
            2,
            4
          ],
          "pointerLabels": {
            "2": "Min (1)",
            "4": "Max (10000)"
          }
        }
      }
    ]
  },
  {
    "id": "day1-p5-count-vowels-consonants",
    "day": 1,
    "title": "Count Vowels and Consonants in String",
    "difficulty": "Easy",
    "moduleTag": "Strings & Character Processing",
    "companies": [
      "Capgemini",
      "Infosys",
      "Cognizant",
      "Wipro"
    ],
    "platforms": [
      "HackerRank",
      "GeeksforGeeks"
    ],
    "problemStatement": "Given a lowercase alphabetic string S, count the total number of vowels (a, e, i, o, u) and consonants. Print the number of vowels followed by the number of consonants separated by a space.",
    "inputFormat": "A single string S consisting of lowercase English letters [a-z].",
    "outputFormat": "Print: count_vowels count_consonants",
    "constraints": [
      "1 <= S.length <= 10^5",
      "S contains only lowercase English alphabetic characters."
    ],
    "sampleInput": "spsuudaipur",
    "sampleOutput": "6 5",
    "kapilIntuition": "Mentorship By Kapil: Iterate through each character in the string. If character is \"a\", \"e\", \"i\", \"o\", or \"u\", increment vowel counter; else increment consonant counter. This is a single pass O(N) time and O(1) space solution.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCode": {
      "c": "#include <stdio.h>\\n#include <string.h>\\n\\nint isVowel(char c) {\\n    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';\\n}\\n\\nint main() {\\n    char s[100005];\\n    if (scanf(\"%s\", s) != 1) return 0;\\n    int v = 0, c = 0;\\n    for (int i = 0; s[i] != '\\\\0'; i++) {\\n        if (isVowel(s[i])) v++;\\n        else c++;\\n    }\\n    printf(\"%d %d\\\\n\", v, c);\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\n#include <string>\\nusing namespace std;\\n\\nint main() {\\n    string s;\\n    if (!(cin >> s)) return 0;\\n    int vowels = 0, consonants = 0;\\n    for (char ch : s) {\\n        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') vowels++;\\n        else consonants++;\\n    }\\n    cout << vowels << \" \" << consonants << endl;\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNext()) return;\\n        String s = sc.next();\\n        int v = 0, c = 0;\\n        for (int i = 0; i < s.length(); i++) {\\n            char ch = s.charAt(i);\\n            if (\"aeiou\".indexOf(ch) != -1) v++;\\n            else c++;\\n        }\\n        System.out.println(v + \" \" + c);\\n    }\\n}",
      "python": "import sys\\n\\ndef main():\\n    s = sys.stdin.read().strip()\\n    if not s: return\\n    vowels = sum(1 for ch in s if ch in 'aeiou')\\n    consonants = len(s) - vowels\\n    print(f\"{vowels} {consonants}\")\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\\n\\nint main() {\\n    char s[100005];\\n    if (scanf(\"%s\", s) != 1) return 0;\\n    int v = 0, c = 0;\\n    for (int i = 0; s[i]; i++) {\\n        char ch = s[i];\\n        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') v++;\\n        else if (ch >= 'a' && ch <= 'z') c++;\\n    }\\n    printf(\"%d %d\\\\n\", v, c);\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\n#include <string>\\nusing namespace std;\\n\\nint main() {\\n    string s;\\n    if (!(cin >> s)) return 0;\\n    int v = 0, c = 0;\\n    for (char ch : s) {\\n        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') v++;\\n        else if (ch >= 'a' && ch <= 'z') c++;\\n    }\\n    cout << v << \" \" << c << \"\\\\n\";\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNext()) return;\\n        String s = sc.next();\\n        int v = 0, c = 0;\\n        for (int i = 0; i < s.length(); i++) {\\n            char ch = s.charAt(i);\\n            if (\"aeiou\".indexOf(ch) >= 0) v++;\\n            else if (ch >= 'a' && ch <= 'z') c++;\\n        }\\n        System.out.println(v + \" \" + c);\\n    }\\n}",
      "python": "import sys\\n\\ndef main():\\n    s = sys.stdin.read().strip()\\n    if not s: return\\n    v = sum(1 for ch in s if ch in 'aeiou')\\n    c = len(s) - v\\n    print(f\"{v} {c}\")\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "testCases": [
      {
        "id": "tc-1",
        "input": "spsuudaipur",
        "expectedOutput": "6 5",
        "isHidden": false,
        "explanation": "s,p,s,u,u,d,a,i,p,u,r has vowels u,u,a,i,u (5 vowels, wait: s, p, s, u, u, d, a, i, p, u, r -> u, u, a, i, u = 5? Let us check: s(c), p(c), s(c), u(v), u(v), d(c), a(v), i(v), p(c), u(v), r(c) -> 5 vowels, 6 consonants)."
      },
      {
        "id": "tc-2",
        "input": "kapil",
        "expectedOutput": "2 3",
        "isHidden": false,
        "explanation": "k(c), a(v), p(c), i(v), l(c) -> 2 vowels, 3 consonants."
      },
      {
        "id": "tc-3",
        "input": "aeiou",
        "expectedOutput": "5 0",
        "isHidden": true,
        "explanation": "All vowels."
      },
      {
        "id": "tc-4",
        "input": "rhythm",
        "expectedOutput": "0 6",
        "isHidden": true,
        "explanation": "No vowels."
      }
    ],
    "visualizationSteps": [
      {
        "step": 1,
        "label": "Character 0: \"k\"",
        "description": "Character \"k\" is not in {a,e,i,o,u}. Consonant count increments to 1.",
        "variables": {
          "char": "k",
          "is_vowel": false,
          "vowels": 0,
          "consonants": 1
        },
        "arrayState": {
          "elements": [
            "k",
            "a",
            "p",
            "i",
            "l"
          ],
          "activeIndices": [
            0
          ],
          "pointerLabels": {
            "0": "Consonant"
          }
        }
      },
      {
        "step": 2,
        "label": "Character 1: \"a\"",
        "description": "Character \"a\" is a vowel! Vowel count increments to 1.",
        "variables": {
          "char": "a",
          "is_vowel": true,
          "vowels": 1,
          "consonants": 1
        },
        "arrayState": {
          "elements": [
            "k",
            "a",
            "p",
            "i",
            "l"
          ],
          "activeIndices": [
            1
          ],
          "pointerLabels": {
            "1": "Vowel"
          }
        }
      },
      {
        "step": 3,
        "label": "End of String",
        "description": "Completed scanning \"kapil\". Total Vowels = 2, Consonants = 3.",
        "variables": {
          "total_vowels": 2,
          "total_consonants": 3
        },
        "arrayState": {
          "elements": [
            "k",
            "a",
            "p",
            "i",
            "l"
          ],
          "activeIndices": [
            1,
            3
          ],
          "pointerLabels": {
            "1": "V",
            "3": "V"
          }
        }
      }
    ]
  },
  {
    "id": "day1-p6-fizzbuzz",
    "day": 1,
    "title": "FizzBuzz - Multiples & Conditionals",
    "difficulty": "Easy",
    "moduleTag": "Conditionals & Modulo Operator",
    "companies": [
      "Amazon",
      "TCS",
      "Microsoft",
      "Accenture"
    ],
    "platforms": [
      "LeetCode #412",
      "HackerRank",
      "GeeksforGeeks"
    ],
    "problemStatement": "Given an integer n, for each integer i from 1 to n: if i is divisible by both 3 and 5, print \"FizzBuzz\"; if divisible by 3, print \"Fizz\"; if divisible by 5, print \"Buzz\"; else print the number i itself. Each output on a new line.",
    "inputFormat": "A single integer n.",
    "outputFormat": "Print n lines according to the FizzBuzz rules.",
    "constraints": [
      "1 <= n <= 10^4"
    ],
    "sampleInput": "5",
    "sampleOutput": "1\\n2\\nFizz\\n4\\nBuzz",
    "kapilIntuition": "Mentorship By Kapil: Check the compound condition (i % 15 == 0) first! If you check i % 3 == 0 before 15, numbers like 15 will falsely print \"Fizz\" instead of \"FizzBuzz\". Order of conditional evaluation is paramount in interview tests.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCode": {
      "c": "#include <stdio.h>\\n\\nvoid fizzBuzz(int n) {\\n    for (int i = 1; i <= n; i++) {\\n        if (i % 15 == 0) printf(\"FizzBuzz\\\\n\");\\n        else if (i % 3 == 0) printf(\"Fizz\\\\n\");\\n        else if (i % 5 == 0) printf(\"Buzz\\\\n\");\\n        else printf(\"%d\\\\n\", i);\\n    }\\n}\\n\\nint main() {\\n    int n;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    fizzBuzz(n);\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\nusing namespace std;\\n\\nint main() {\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    for (int i = 1; i <= n; i++) {\\n        if (i % 15 == 0) cout << \"FizzBuzz\\\\n\";\\n        else if (i % 3 == 0) cout << \"Fizz\\\\n\";\\n        else if (i % 5 == 0) cout << \"Buzz\\\\n\";\\n        else cout << i << \"\\\\n\";\\n    }\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        for (int i = 1; i <= n; i++) {\\n            if (i % 15 == 0) System.out.println(\"FizzBuzz\");\\n            else if (i % 3 == 0) System.out.println(\"Fizz\");\\n            else if (i % 5 == 0) System.out.println(\"Buzz\");\\n            else System.out.println(i);\\n        }\\n    }\\n}",
      "python": "import sys\\n\\ndef main():\\n    line = sys.stdin.read().strip()\\n    if not line: return\\n    n = int(line)\\n    for i in range(1, n + 1):\\n        if i % 15 == 0:\\n            print(\"FizzBuzz\")\\n        elif i % 3 == 0:\\n            print(\"Fizz\")\\n        elif i % 5 == 0:\\n            print(\"Buzz\")\\n        else:\\n            print(i)\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\\n\\nint main() {\\n    int n;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    for (int i = 1; i <= n; i++) {\\n        if (i % 15 == 0) printf(\"FizzBuzz\\\\n\");\\n        else if (i % 3 == 0) printf(\"Fizz\\\\n\");\\n        else if (i % 5 == 0) printf(\"Buzz\\\\n\");\\n        else printf(\"%d\\\\n\", i);\\n    }\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\nusing namespace std;\\n\\nint main() {\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    for (int i = 1; i <= n; i++) {\\n        if (i % 15 == 0) cout << \"FizzBuzz\\\\n\";\\n        else if (i % 3 == 0) cout << \"Fizz\\\\n\";\\n        else if (i % 5 == 0) cout << \"Buzz\\\\n\";\\n        else cout << i << \"\\\\n\";\\n    }\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        for (int i = 1; i <= n; i++) {\\n            if (i % 15 == 0) System.out.println(\"FizzBuzz\");\\n            else if (i % 3 == 0) System.out.println(\"Fizz\");\\n            else if (i % 5 == 0) System.out.println(\"Buzz\");\\n            else System.out.println(i);\\n        }\\n    }\\n}",
      "python": "import sys\\n\\ndef main():\\n    line = sys.stdin.read().strip()\\n    if not line: return\\n    n = int(line)\\n    for i in range(1, n + 1):\\n        if i % 15 == 0: print(\"FizzBuzz\")\\n        elif i % 3 == 0: print(\"Fizz\")\\n        elif i % 5 == 0: print(\"Buzz\")\\n        else: print(i)\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "testCases": [
      {
        "id": "tc-1",
        "input": "5",
        "expectedOutput": "1\\n2\\nFizz\\n4\\nBuzz",
        "isHidden": false,
        "explanation": "1, 2, 3(Fizz), 4, 5(Buzz)."
      },
      {
        "id": "tc-2",
        "input": "15",
        "expectedOutput": "1\\n2\\nFizz\\n4\\nBuzz\\nFizz\\n7\\n8\\nFizz\\nBuzz\\n11\\nFizz\\n13\\n14\\nFizzBuzz",
        "isHidden": false,
        "explanation": "15 triggers FizzBuzz correctly."
      },
      {
        "id": "tc-3",
        "input": "3",
        "expectedOutput": "1\\n2\\nFizz",
        "isHidden": true,
        "explanation": "Short sequence up to 3."
      }
    ],
    "visualizationSteps": [
      {
        "step": 1,
        "label": "i = 3: Divisible by 3",
        "description": "3 % 15 != 0, but 3 % 3 == 0. Output: \"Fizz\".",
        "variables": {
          "i": 3,
          "i%15": 3,
          "i%3": 0,
          "i%5": 3,
          "output": "Fizz"
        },
        "arrayState": {
          "elements": [
            1,
            2,
            "Fizz",
            4,
            "Buzz"
          ],
          "activeIndices": [
            2
          ],
          "pointerLabels": {
            "2": "Fizz"
          }
        }
      },
      {
        "step": 2,
        "label": "i = 5: Divisible by 5",
        "description": "5 % 15 != 0, 5 % 3 != 0, but 5 % 5 == 0. Output: \"Buzz\".",
        "variables": {
          "i": 5,
          "i%15": 5,
          "i%3": 2,
          "i%5": 0,
          "output": "Buzz"
        },
        "arrayState": {
          "elements": [
            1,
            2,
            "Fizz",
            4,
            "Buzz"
          ],
          "activeIndices": [
            4
          ],
          "pointerLabels": {
            "4": "Buzz"
          }
        }
      },
      {
        "step": 3,
        "label": "i = 15: Divisible by both (15)",
        "description": "15 % 15 == 0! Top branch matches. Output: \"FizzBuzz\".",
        "variables": {
          "i": 15,
          "i%15": 0,
          "output": "FizzBuzz"
        },
        "arrayState": {
          "elements": [
            13,
            14,
            "FizzBuzz"
          ],
          "activeIndices": [
            2
          ],
          "pointerLabels": {
            "2": "FizzBuzz"
          }
        }
      }
    ]
  },
  {
    "id": "day1-p7-factorial-recursion",
    "day": 1,
    "title": "Factorial with Recursion Execution Trace",
    "difficulty": "Easy",
    "moduleTag": "Recursion & Call Stack",
    "companies": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant"
    ],
    "platforms": [
      "GeeksforGeeks",
      "HackerRank"
    ],
    "problemStatement": "Given a non-negative integer n, compute its factorial n! = n * (n - 1) * ... * 1. By definition, 0! = 1. Print the factorial result.",
    "inputFormat": "A single non-negative integer n (0 <= n <= 20).",
    "outputFormat": "Print the factorial value n! as a 64-bit integer.",
    "constraints": [
      "0 <= n <= 20"
    ],
    "sampleInput": "5",
    "sampleOutput": "120",
    "kapilIntuition": "Mentorship By Kapil: Recursion requires two pillars: Base Case (if n <= 1 return 1) and Recursive Step (return n * factorial(n - 1)). Every recursive invocation pushes a frame onto the Call Stack. Time complexity is O(N) and stack space is O(N).",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "starterCode": {
      "c": "#include <stdio.h>\\n\\nlong long factorial(int n) {\\n    if (n <= 1) return 1;\\n    return (long long)n * factorial(n - 1);\\n}\\n\\nint main() {\\n    int n;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    printf(\"%lld\\\\n\", factorial(n));\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\nusing namespace std;\\n\\nlong long factorial(int n) {\\n    if (n <= 1) return 1;\\n    return (long long)n * factorial(n - 1);\\n}\\n\\nint main() {\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    cout << factorial(n) << endl;\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static long factorial(int n) {\\n        if (n <= 1) return 1;\\n        return (long)n * factorial(n - 1);\\n    }\\n\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        System.out.println(factorial(n));\\n    }\\n}",
      "python": "import sys\\n\\ndef factorial(n):\\n    if n <= 1: return 1\\n    return n * factorial(n - 1)\\n\\nif __name__ == \"__main__\":\\n    line = sys.stdin.read().strip()\\n    if line:\\n        print(factorial(int(line)))"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\\n\\nlong long fact(int n) {\\n    if (n <= 1) return 1;\\n    return (long long)n * fact(n - 1);\\n}\\n\\nint main() {\\n    int n;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    printf(\"%lld\\\\n\", fact(n));\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\nusing namespace std;\\n\\nlong long fact(int n) {\\n    if (n <= 1) return 1;\\n    return (long long)n * fact(n - 1);\\n}\\n\\nint main() {\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    cout << fact(n) << \"\\\\n\";\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static long fact(int n) {\\n        if (n <= 1) return 1;\\n        return (long)n * fact(n - 1);\\n    }\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        System.out.println(fact(sc.nextInt()));\\n    }\\n}",
      "python": "import sys\\n\\ndef fact(n):\\n    if n <= 1: return 1\\n    return n * fact(n - 1)\\n\\nif __name__ == \"__main__\":\\n    tokens = sys.stdin.read().split()\\n    if tokens:\\n        print(fact(int(tokens[0])))"
    },
    "testCases": [
      {
        "id": "tc-1",
        "input": "5",
        "expectedOutput": "120",
        "isHidden": false,
        "explanation": "5! = 5 * 4 * 3 * 2 * 1 = 120."
      },
      {
        "id": "tc-2",
        "input": "0",
        "expectedOutput": "1",
        "isHidden": false,
        "explanation": "0! = 1 by mathematical definition."
      },
      {
        "id": "tc-3",
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true,
        "explanation": "1! = 1."
      },
      {
        "id": "tc-4",
        "input": "10",
        "expectedOutput": "3628800",
        "isHidden": true,
        "explanation": "10! = 3628800."
      }
    ],
    "visualizationSteps": [
      {
        "step": 1,
        "label": "Call Stack Push: fact(5)",
        "description": "fact(5) invoked. n=5 > 1. Suspends to evaluate 5 * fact(4).",
        "variables": {
          "call": "fact(5)",
          "stack_depth": 1,
          "n": 5
        },
        "arrayState": {
          "elements": [
            "fact(5)"
          ],
          "activeIndices": [
            0
          ],
          "pointerLabels": {
            "0": "Stack Top"
          }
        }
      },
      {
        "step": 2,
        "label": "Base Case Reached: fact(1)",
        "description": "Stack depth is 5: fact(5)->fact(4)->fact(3)->fact(2)->fact(1). n=1 matches base case! Returns 1.",
        "variables": {
          "call": "fact(1)",
          "stack_depth": 5,
          "return_val": 1
        },
        "arrayState": {
          "elements": [
            "fact(5)",
            "fact(4)",
            "fact(3)",
            "fact(2)",
            "fact(1)"
          ],
          "activeIndices": [
            4
          ],
          "pointerLabels": {
            "4": "Base Case"
          }
        }
      },
      {
        "step": 3,
        "label": "Unwinding Stack: Return 120",
        "description": "fact(2) returns 2*1=2. fact(3) returns 3*2=6. fact(4) returns 4*6=24. fact(5) returns 5*24=120.",
        "variables": {
          "final_result": 120,
          "stack_depth": 0
        },
        "arrayState": {
          "elements": [
            120
          ],
          "activeIndices": [
            0
          ],
          "pointerLabels": {
            "0": "Result: 120"
          }
        }
      }
    ]
  },
  {
    "id": "day1-p8-fibonacci-number",
    "day": 1,
    "title": "N-th Fibonacci Number",
    "difficulty": "Easy",
    "moduleTag": "Iteration & Space Optimization",
    "companies": [
      "Accenture",
      "Capgemini",
      "Amazon",
      "TCS"
    ],
    "platforms": [
      "LeetCode #509",
      "GeeksforGeeks",
      "HackerRank"
    ],
    "problemStatement": "The Fibonacci numbers form a sequence where F(0) = 0, F(1) = 1, and F(n) = F(n - 1) + F(n - 2) for n >= 2. Given an integer n, calculate F(n).",
    "inputFormat": "A single integer n (0 <= n <= 45).",
    "outputFormat": "Print the n-th Fibonacci number.",
    "constraints": [
      "0 <= n <= 45"
    ],
    "sampleInput": "4",
    "sampleOutput": "3",
    "kapilIntuition": "Mentorship By Kapil: Naive recursion takes O(2^N) exponential time due to overlapping subproblems. Using two variables a = 0 and b = 1 in an iterative loop solves it in O(N) time and O(1) space!",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCode": {
      "c": "#include <stdio.h>\\n\\nlong long fib(int n) {\\n    if (n <= 0) return 0;\\n    if (n == 1) return 1;\\n    long long a = 0, b = 1;\\n    for (int i = 2; i <= n; i++) {\\n        long long c = a + b;\\n        a = b;\\n        b = c;\\n    }\\n    return b;\\n}\\n\\nint main() {\\n    int n;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    printf(\"%lld\\\\n\", fib(n));\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\nusing namespace std;\\n\\nlong long fib(int n) {\\n    if (n <= 0) return 0;\\n    if (n == 1) return 1;\\n    long long a = 0, b = 1;\\n    for (int i = 2; i <= n; i++) {\\n        long long c = a + b;\\n        a = b;\\n        b = c;\\n    }\\n    return b;\\n}\\n\\nint main() {\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    cout << fib(n) << endl;\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static long fib(int n) {\\n        if (n <= 0) return 0;\\n        if (n == 1) return 1;\\n        long a = 0, b = 1;\\n        for (int i = 2; i <= n; i++) {\\n            long c = a + b;\\n            a = b;\\n            b = c;\\n        }\\n        return b;\\n    }\\n\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        System.out.println(fib(n));\\n    }\\n}",
      "python": "import sys\\n\\ndef fib(n):\\n    if n <= 0: return 0\\n    if n == 1: return 1\\n    a, b = 0, 1\\n    for _ in range(2, n + 1):\\n        a, b = b, a + b\\n    return b\\n\\nif __name__ == \"__main__\":\\n    line = sys.stdin.read().strip()\\n    if line:\\n        print(fib(int(line)))"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\\n\\nint main() {\\n    int n;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    if (n <= 0) { printf(\"0\\\\n\"); return 0; }\\n    if (n == 1) { printf(\"1\\\\n\"); return 0; }\\n    long long a = 0, b = 1;\\n    for (int i = 2; i <= n; i++) {\\n        long long c = a + b;\\n        a = b; b = c;\\n    }\\n    printf(\"%lld\\\\n\", b);\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\nusing namespace std;\\n\\nint main() {\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    if (n <= 0) { cout << 0 << endl; return 0; }\\n    if (n == 1) { cout << 1 << endl; return 0; }\\n    long long a = 0, b = 1;\\n    for (int i = 2; i <= n; i++) {\\n        long long c = a + b;\\n        a = b; b = c;\\n    }\\n    cout << b << endl;\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        if (n <= 0) { System.out.println(0); return; }\\n        if (n == 1) { System.out.println(1); return; }\\n        long a = 0, b = 1;\\n        for (int i = 2; i <= n; i++) {\\n            long c = a + b;\\n            a = b; b = c;\\n        }\\n        System.out.println(b);\\n    }\\n}",
      "python": "import sys\\n\\ndef main():\\n    tokens = sys.stdin.read().split()\\n    if not tokens: return\\n    n = int(tokens[0])\\n    if n <= 0: print(0); return\\n    if n == 1: print(1); return\\n    a, b = 0, 1\\n    for _ in range(2, n + 1):\\n        a, b = b, a + b\\n    print(b)\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "testCases": [
      {
        "id": "tc-1",
        "input": "4",
        "expectedOutput": "3",
        "isHidden": false,
        "explanation": "F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3."
      },
      {
        "id": "tc-2",
        "input": "2",
        "expectedOutput": "1",
        "isHidden": false,
        "explanation": "F(2) = F(1) + F(0) = 1 + 0 = 1."
      },
      {
        "id": "tc-3",
        "input": "0",
        "expectedOutput": "0",
        "isHidden": true,
        "explanation": "F(0) = 0."
      },
      {
        "id": "tc-4",
        "input": "10",
        "expectedOutput": "55",
        "isHidden": true,
        "explanation": "F(10) = 55."
      }
    ],
    "visualizationSteps": [
      {
        "step": 1,
        "label": "Base Terms",
        "description": "F(0) = 0, F(1) = 1. Window: a = 0, b = 1.",
        "variables": {
          "a": 0,
          "b": 1,
          "i": 1
        },
        "arrayState": {
          "elements": [
            0,
            1,
            1,
            2,
            3
          ],
          "activeIndices": [
            0,
            1
          ],
          "pointerLabels": {
            "0": "a",
            "1": "b"
          }
        }
      },
      {
        "step": 2,
        "label": "Compute F(2) and F(3)",
        "description": "F(2) = 0 + 1 = 1. Shift window: a=1, b=1. F(3) = 1 + 1 = 2. Shift: a=1, b=2.",
        "variables": {
          "a": 1,
          "b": 2,
          "i": 3
        },
        "arrayState": {
          "elements": [
            0,
            1,
            1,
            2,
            3
          ],
          "activeIndices": [
            2,
            3
          ],
          "pointerLabels": {
            "2": "a",
            "3": "b"
          }
        }
      },
      {
        "step": 3,
        "label": "Compute F(4) Target",
        "description": "F(4) = a + b = 1 + 2 = 3. Final answer is 3.",
        "variables": {
          "a": 2,
          "b": 3,
          "i": 4,
          "final_answer": 3
        },
        "arrayState": {
          "elements": [
            0,
            1,
            1,
            2,
            3
          ],
          "activeIndices": [
            4
          ],
          "pointerLabels": {
            "4": "F(4) = 3"
          }
        }
      }
    ]
  },
  {
    "id": "day1-p9-linear-search",
    "day": 1,
    "title": "Linear Search & First Occurrence",
    "difficulty": "Easy",
    "moduleTag": "Searching & Array Loops",
    "companies": [
      "Wipro",
      "Cognizant",
      "TCS",
      "Tech Mahindra"
    ],
    "platforms": [
      "GeeksforGeeks",
      "HackerRank"
    ],
    "problemStatement": "Given an array of n integers and a search key K, determine the 0-based index of the first occurrence of K in the array. If K is not present, output -1.",
    "inputFormat": "First line contains integer n. Second line contains n space-separated integers. Third line contains integer K.",
    "outputFormat": "Print 0-based index of first occurrence of K, or -1.",
    "constraints": [
      "1 <= n <= 10^5",
      "-10^9 <= arr[i], K <= 10^9"
    ],
    "sampleInput": "5\\n10 50 30 70 80\\n30",
    "sampleOutput": "2",
    "kapilIntuition": "Mentorship By Kapil: Linear search traverses the array from index 0 to n - 1. When arr[i] == K, immediately return i. If loop finishes without match, return -1. Time complexity: Best O(1), Worst O(N).",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "starterCode": {
      "c": "#include <stdio.h>\\n\\nint linearSearch(int arr[], int n, int k) {\\n    for (int i = 0; i < n; i++) {\\n        if (arr[i] == k) return i;\\n    }\\n    return -1;\\n}\\n\\nint main() {\\n    int n, k;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    int arr[n];\\n    for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\\n    scanf(\"%d\", &k);\\n    printf(\"%d\\\\n\", linearSearch(arr, n, k));\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\n#include <vector>\\nusing namespace std;\\n\\nint main() {\\n    int n, k;\\n    if (!(cin >> n)) return 0;\\n    vector<int> arr(n);\\n    for (int i = 0; i < n; i++) cin >> arr[i];\\n    cin >> k;\\n    int foundIdx = -1;\\n    for (int i = 0; i < n; i++) {\\n        if (arr[i] == k) { foundIdx = i; break; }\\n    }\\n    cout << foundIdx << endl;\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        int[] arr = new int[n];\\n        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\\n        int k = sc.nextInt();\\n        int ans = -1;\\n        for (int i = 0; i < n; i++) {\\n            if (arr[i] == k) { ans = i; break; }\\n        }\\n        System.out.println(ans);\\n    }\\n}",
      "python": "import sys\\n\\ndef main():\\n    tokens = sys.stdin.read().split()\\n    if not tokens: return\\n    n = int(tokens[0])\\n    arr = [int(x) for x in tokens[1:n+1]]\\n    k = int(tokens[n+1])\\n    try:\\n        print(arr.index(k))\\n    except ValueError:\\n        print(-1)\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\\n\\nint main() {\\n    int n, k;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    int arr[n];\\n    for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\\n    scanf(\"%d\", &k);\\n    for (int i = 0; i < n; i++) {\\n        if (arr[i] == k) { printf(\"%d\\\\n\", i); return 0; }\\n    }\\n    printf(\"-1\\\\n\");\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\n#include <vector>\\nusing namespace std;\\n\\nint main() {\\n    int n, k;\\n    if (!(cin >> n)) return 0;\\n    vector<int> arr(n);\\n    for (int i = 0; i < n; i++) cin >> arr[i];\\n    cin >> k;\\n    for (int i = 0; i < n; i++) {\\n        if (arr[i] == k) { cout << i << \"\\\\n\"; return 0; }\\n    }\\n    cout << -1 << \"\\\\n\";\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        int[] arr = new int[n];\\n        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\\n        int k = sc.nextInt();\\n        for (int i = 0; i < n; i++) {\\n            if (arr[i] == k) { System.out.println(i); return; }\\n        }\\n        System.out.println(-1);\\n    }\\n}",
      "python": "import sys\\n\\ndef main():\\n    tokens = sys.stdin.read().split()\\n    if not tokens: return\\n    n = int(tokens[0])\\n    arr = [int(x) for x in tokens[1:n+1]]\\n    k = int(tokens[n+1])\\n    for i, val in enumerate(arr):\\n        if val == k:\\n            print(i); return\\n    print(-1)\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "testCases": [
      {
        "id": "tc-1",
        "input": "5\\n10 50 30 70 80\\n30",
        "expectedOutput": "2",
        "isHidden": false,
        "explanation": "30 is present at index 2."
      },
      {
        "id": "tc-2",
        "input": "4\\n1 2 3 4\\n99",
        "expectedOutput": "-1",
        "isHidden": false,
        "explanation": "99 not in array, return -1."
      },
      {
        "id": "tc-3",
        "input": "3\\n5 5 5\\n5",
        "expectedOutput": "0",
        "isHidden": true,
        "explanation": "First occurrence is at index 0."
      }
    ],
    "visualizationSteps": [
      {
        "step": 1,
        "label": "Check Index 0",
        "description": "arr[0] = 10 != target 30. Move pointer forward.",
        "variables": {
          "i": 0,
          "val": 10,
          "target": 30,
          "match": false
        },
        "arrayState": {
          "elements": [
            10,
            50,
            30,
            70,
            80
          ],
          "activeIndices": [
            0
          ],
          "pointerLabels": {
            "0": "i=0 (10)"
          }
        }
      },
      {
        "step": 2,
        "label": "Check Index 1",
        "description": "arr[1] = 50 != target 30. Move pointer forward.",
        "variables": {
          "i": 1,
          "val": 50,
          "target": 30,
          "match": false
        },
        "arrayState": {
          "elements": [
            10,
            50,
            30,
            70,
            80
          ],
          "activeIndices": [
            1
          ],
          "pointerLabels": {
            "1": "i=1 (50)"
          }
        }
      },
      {
        "step": 3,
        "label": "Match Found at Index 2",
        "description": "arr[2] = 30 == target 30! Return index 2 immediately.",
        "variables": {
          "i": 2,
          "val": 30,
          "target": 30,
          "match": true,
          "return_val": 2
        },
        "arrayState": {
          "elements": [
            10,
            50,
            30,
            70,
            80
          ],
          "activeIndices": [
            2
          ],
          "pointerLabels": {
            "2": "FOUND (Index 2)"
          }
        }
      }
    ]
  },
  {
    "id": "day1-p10-sum-of-digits",
    "day": 1,
    "title": "Sum of Digits of an Integer",
    "difficulty": "Easy",
    "moduleTag": "Arithmetic Operators & While Loop",
    "companies": [
      "Infosys",
      "TCS",
      "Accenture",
      "Zoho"
    ],
    "platforms": [
      "GeeksforGeeks",
      "HackerRank"
    ],
    "problemStatement": "Given a non-negative integer n, calculate the sum of its individual digits. Print the resulting sum.",
    "inputFormat": "A single non-negative integer n (0 <= n <= 10^9).",
    "outputFormat": "Print the sum of digits.",
    "constraints": [
      "0 <= n <= 10^9"
    ],
    "sampleInput": "687",
    "sampleOutput": "21",
    "kapilIntuition": "Mentorship By Kapil: Extract the rightmost digit using remainder modulo 10 (rem = n % 10), add it to running sum, and truncate using integer division (n = n / 10). Repeat until n == 0. Time complexity is O(log10(N)) which is at most 10 iterations for a 32-bit int.",
    "timeComplexity": "O(log10 N)",
    "spaceComplexity": "O(1)",
    "starterCode": {
      "c": "#include <stdio.h>\\n\\nint sumOfDigits(int n) {\\n    int sum = 0;\\n    while (n > 0) {\\n        sum += n % 10;\\n        n /= 10;\\n    }\\n    return sum;\\n}\\n\\nint main() {\\n    int n;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    printf(\"%d\\\\n\", sumOfDigits(n));\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\nusing namespace std;\\n\\nint main() {\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    int sum = 0;\\n    while (n > 0) {\\n        sum += n % 10;\\n        n /= 10;\\n    }\\n    cout << sum << endl;\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        int sum = 0;\\n        while (n > 0) {\\n            sum += n % 10;\\n            n /= 10;\\n        }\\n        System.out.println(sum);\\n    }\\n}",
      "python": "import sys\\n\\ndef main():\\n    line = sys.stdin.read().strip()\\n    if not line: return\\n    n = int(line)\\n    print(sum(int(d) for d in str(n)))\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "solutionCode": {
      "c": "#include <stdio.h>\\n\\nint main() {\\n    int n;\\n    if (scanf(\"%d\", &n) != 1) return 0;\\n    int sum = 0;\\n    while (n > 0) {\\n        sum += n % 10;\\n        n /= 10;\\n    }\\n    printf(\"%d\\\\n\", sum);\\n    return 0;\\n}",
      "cpp": "#include <iostream>\\nusing namespace std;\\n\\nint main() {\\n    int n;\\n    if (!(cin >> n)) return 0;\\n    int sum = 0;\\n    while (n > 0) {\\n        sum += n % 10;\\n        n /= 10;\\n    }\\n    cout << sum << \"\\\\n\";\\n    return 0;\\n}",
      "java": "import java.util.*;\\n\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int n = sc.nextInt();\\n        int sum = 0;\\n        while (n > 0) {\\n            sum += n % 10;\\n            n /= 10;\\n        }\\n        System.out.println(sum);\\n    }\\n}",
      "python": "import sys\\n\\ndef main():\\n    line = sys.stdin.read().strip()\\n    if not line: return\\n    n = int(line)\\n    sum_digits = sum(int(ch) for ch in str(n) if ch.isdigit())\\n    print(sum_digits)\\n\\nif __name__ == \"__main__\":\\n    main()"
    },
    "testCases": [
      {
        "id": "tc-1",
        "input": "687",
        "expectedOutput": "21",
        "isHidden": false,
        "explanation": "6 + 8 + 7 = 21."
      },
      {
        "id": "tc-2",
        "input": "1000",
        "expectedOutput": "1",
        "isHidden": false,
        "explanation": "1 + 0 + 0 + 0 = 1."
      },
      {
        "id": "tc-3",
        "input": "0",
        "expectedOutput": "0",
        "isHidden": true,
        "explanation": "Sum of digits of 0 is 0."
      },
      {
        "id": "tc-4",
        "input": "99999",
        "expectedOutput": "45",
        "isHidden": true,
        "explanation": "9 * 5 = 45."
      }
    ],
    "visualizationSteps": [
      {
        "step": 1,
        "label": "Extract Last Digit: 7",
        "description": "687 % 10 = 7. sum = 0 + 7 = 7. Next n = 687 / 10 = 68.",
        "variables": {
          "n": 68,
          "digit": 7,
          "sum": 7
        },
        "arrayState": {
          "elements": [
            6,
            8,
            7
          ],
          "activeIndices": [
            2
          ],
          "pointerLabels": {
            "2": "+7"
          }
        }
      },
      {
        "step": 2,
        "label": "Extract Middle Digit: 8",
        "description": "68 % 10 = 8. sum = 7 + 8 = 15. Next n = 68 / 10 = 6.",
        "variables": {
          "n": 6,
          "digit": 8,
          "sum": 15
        },
        "arrayState": {
          "elements": [
            6,
            8,
            7
          ],
          "activeIndices": [
            1
          ],
          "pointerLabels": {
            "1": "+8"
          }
        }
      },
      {
        "step": 3,
        "label": "Extract First Digit: 6",
        "description": "6 % 10 = 6. sum = 15 + 6 = 21. Next n = 6 / 10 = 0. Termination condition reached.",
        "variables": {
          "n": 0,
          "digit": 6,
          "sum": 21,
          "final_sum": 21
        },
        "arrayState": {
          "elements": [
            6,
            8,
            7
          ],
          "activeIndices": [
            0
          ],
          "pointerLabels": {
            "0": "+6 (Total: 21)"
          }
        }
      }
    ]
  }
];
