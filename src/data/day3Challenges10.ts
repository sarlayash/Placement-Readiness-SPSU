import { PracticalChallenge } from '../types';

/**
 * 10 Company-Oriented Placement Problems for Day 3 - Virtual Lab
 * Mapped to LeetCode, HackerRank, GeeksforGeeks & Top Recruiters (Amazon, Microsoft, TCS Digital, Google, etc.)
 * Fully solved in C, C++, Java, and Python with step-by-step Execution Visualizations & Hidden Boundary Test Cases.
 */
export const DAY_3_PRACTICAL_CHALLENGES_10: PracticalChallenge[] = [
  {
    id: 'day3-p1-rotated-search',
    day: 3,
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    moduleTag: 'Binary Search & Monotonic Partition',
    companies: ['Amazon', 'Microsoft', 'Google', 'TCS Digital', 'Infosys'],
    platforms: ['LeetCode #33', 'GeeksforGeeks', 'HackerRank'],
    problemStatement:
      'Given an integer array nums sorted in ascending order (with distinct values) that is rotated at an unknown pivot index, and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.',
    inputFormat: 'First line contains integer n. Second line contains n space-separated rotated sorted integers. Third line contains integer target.',
    outputFormat: 'Print the 0-based index of target, or -1 if not found.',
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'All values of nums are unique', '-10^4 <= target <= 10^4'],
    sampleInput: '7\n4 5 6 7 0 1 2\n0',
    sampleOutput: '4',
    kapilIntuition:
      'Mentorship By Kapil: At any midpoint mid, at least one half [low, mid] or [mid, high] is guaranteed to be strictly sorted! Identify which half is sorted. If target lies within that sorted range, search there; otherwise search the opposite half.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int search(int nums[], int n, int target) {
    // Write your O(log N) binary search here
    return -1;
}

int main() {
    int n, target;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    scanf("%d", &target);
    printf("%d\\n", search(nums, n, target));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int search(const vector<int>& nums, int target) {
    // Write your O(log N) binary search here
    return -1;
}

int main() {
    int n, target;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cin >> target;
    cout << search(nums, target) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int search(int[] nums, int target) {
        // Write your O(log N) binary search here
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();
        System.out.println(search(nums, target));
    }
}`,
      python: `import sys

def search(nums, target):
    # Write your O(log N) binary search here
    return -1

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        nums = [int(x) for x in tokens[1:n+1]]
        target = int(tokens[n+1])
        print(search(nums, target))`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int search(int nums[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;

        // Check if left half is sorted
        if (nums[low] <= nums[mid]) {
            if (target >= nums[low] && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else { // Right half is sorted
            if (target > nums[mid] && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1;
}

int main() {
    int n, target;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    scanf("%d", &target);
    printf("%d\\n", search(nums, n, target));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int search(const vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;

        if (nums[low] <= nums[mid]) {
            if (target >= nums[low] && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            if (target > nums[mid] && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}

int main() {
    int n, target;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cin >> target;
    cout << search(nums, target) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;

            if (nums[low] <= nums[mid]) {
                if (target >= nums[low] && target < nums[mid]) high = mid - 1;
                else low = mid + 1;
            } else {
                if (target > nums[mid] && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();
        System.out.println(search(nums, target));
    }
}`,
      python: `import sys

def search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else:
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return -1

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        nums = [int(x) for x in tokens[1:n+1]]
        target = int(tokens[n+1])
        print(search(nums, target))`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '7\n4 5 6 7 0 1 2\n0',
        expectedOutput: '4',
        isHidden: false,
        explanation: '0 is at index 4.',
      },
      {
        id: 'tc-2',
        input: '7\n4 5 6 7 0 1 2\n3',
        expectedOutput: '-1',
        isHidden: false,
        explanation: '3 is not in nums.',
      },
      {
        id: 'tc-3',
        input: '1\n1\n0',
        expectedOutput: '-1',
        isHidden: true,
        explanation: 'Boundary test: single element not matching target.',
      },
      {
        id: 'tc-4',
        input: '5\n5 1 2 3 4\n1',
        expectedOutput: '1',
        isHidden: true,
        explanation: 'Target found right at pivot boundary.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Initialize Search Range',
        description: 'low = 0 (val 4), high = 6 (val 2). Target is 0. Calculate mid = 3 (val 7).',
        variables: { low: 0, high: 6, mid: 3, midVal: 7, target: 0 },
        arrayState: {
          elements: [4, 5, 6, 7, 0, 1, 2],
          activeIndices: [0, 3, 6],
          pointerLabels: { 0: 'low', 3: 'mid', 6: 'high' },
        },
      },
      {
        step: 2,
        label: 'Identify Sorted Half',
        description: 'nums[low]=4 <= nums[mid]=7, so left half [4, 5, 6, 7] is sorted. Since target 0 is not in [4, 7), search right half.',
        variables: { low: 4, high: 6, mid: 3 },
        arrayState: {
          elements: [4, 5, 6, 7, 0, 1, 2],
          activeIndices: [4, 6],
          pointerLabels: { 4: 'new low', 6: 'high' },
        },
      },
      {
        step: 3,
        label: 'Match Target at Mid',
        description: 'New mid = (4 + 6) / 2 = 5 (val 1). Left half sorted. Target 0 is in [nums[4]=0, nums[5]=1), high moves to mid-1=4. Next iteration finds nums[4] == 0!',
        variables: { low: 4, high: 4, result: 4 },
        arrayState: {
          elements: [4, 5, 6, 7, 0, 1, 2],
          activeIndices: [4],
          pointerLabels: { 4: 'TARGET FOUND' },
        },
      },
    ],
  },
  {
    id: 'day3-p2-ship-packages',
    day: 3,
    title: 'Capacity to Ship Packages Within D Days (Book Allocation)',
    difficulty: 'Medium',
    moduleTag: 'Binary Search on Answer Space',
    companies: ['Google', 'Flipkart', 'Infosys', 'Amazon', 'Adobe'],
    platforms: ['LeetCode #1011', 'GeeksforGeeks (Allocate Minimum Pages)', 'HackerRank'],
    problemStatement:
      'A conveyor belt has packages that must be shipped within days. The i-th package has weight weights[i]. Each day, we load the belt with packages in the given order without exceeding conveyor capacity. Return the least weight capacity of the ship that will result in all packages being shipped within days.',
    inputFormat: 'First line contains n and days. Second line contains n space-separated positive integers.',
    outputFormat: 'Print a single integer: the minimum ship capacity.',
    constraints: ['1 <= days <= weights.length <= 5 * 10^4', '1 <= weights[i] <= 500'],
    sampleInput: '10 5\n1 2 3 4 5 6 7 8 9 10',
    sampleOutput: '15',
    kapilIntuition:
      'Mentorship By Kapil: Minimum possible capacity is max(weights) (since the largest single package must fit). Maximum possible capacity is sum(weights) (all packages on 1 day). Binary search the capacity range [max, sum]. For each candidate mid, test if it ships in <= days.',
    timeComplexity: 'O(N * log(sum - max))',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int shipWithinDays(int weights[], int n, int days) {
    // Write your Binary Search on Answer here
    return 0;
}

int main() {
    int n, days;
    if (scanf("%d %d", &n, &days) != 2) return 0;
    int weights[n];
    for (int i = 0; i < n; i++) scanf("%d", &weights[i]);
    printf("%d\\n", shipWithinDays(weights, n, days));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int shipWithinDays(const vector<int>& weights, int days) {
    // Write your Binary Search on Answer here
    return 0;
}

int main() {
    int n, days;
    if (!(cin >> n >> days)) return 0;
    vector<int> weights(n);
    for (int i = 0; i < n; i++) cin >> weights[i];
    cout << shipWithinDays(weights, days) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int shipWithinDays(int[] weights, int days) {
        // Write your Binary Search on Answer here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int days = sc.nextInt();
        int[] weights = new int[n];
        for (int i = 0; i < n; i++) weights[i] = sc.nextInt();
        System.out.println(shipWithinDays(weights, days));
    }
}`,
      python: `import sys

def ship_within_days(weights, days):
    # Write your Binary Search on Answer here
    return 0

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n, days = int(tokens[0]), int(tokens[1])
        weights = [int(x) for x in tokens[2:n+2]]
        print(ship_within_days(weights, days))`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int isFeasible(int weights[], int n, int days, int cap) {
    int d = 1, current = 0;
    for (int i = 0; i < n; i++) {
        if (current + weights[i] > cap) {
            d++;
            current = weights[i];
        } else {
            current += weights[i];
        }
    }
    return d <= days;
}

int shipWithinDays(int weights[], int n, int days) {
    int low = 0, high = 0;
    for (int i = 0; i < n; i++) {
        if (weights[i] > low) low = weights[i];
        high += weights[i];
    }
    int ans = high;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (isFeasible(weights, n, days, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main() {
    int n, days;
    if (scanf("%d %d", &n, &days) != 2) return 0;
    int weights[n];
    for (int i = 0; i < n; i++) scanf("%d", &weights[i]);
    printf("%d\\n", shipWithinDays(weights, n, days));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

bool isFeasible(const vector<int>& weights, int days, int cap) {
    int d = 1, current = 0;
    for (int w : weights) {
        if (current + w > cap) {
            d++;
            current = w;
        } else {
            current += w;
        }
    }
    return d <= days;
}

int shipWithinDays(const vector<int>& weights, int days) {
    int low = *max_element(weights.begin(), weights.end());
    int high = accumulate(weights.begin(), weights.end(), 0);
    int ans = high;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (isFeasible(weights, days, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main() {
    int n, days;
    if (!(cin >> n >> days)) return 0;
    vector<int> weights(n);
    for (int i = 0; i < n; i++) cin >> weights[i];
    cout << shipWithinDays(weights, days) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    static boolean isFeasible(int[] weights, int days, int cap) {
        int d = 1, current = 0;
        for (int w : weights) {
            if (current + w > cap) {
                d++;
                current = w;
            } else {
                current += w;
            }
        }
        return d <= days;
    }

    public static int shipWithinDays(int[] weights, int days) {
        int low = 0, high = 0;
        for (int w : weights) {
            low = Math.max(low, w);
            high += w;
        }
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (isFeasible(weights, days, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int days = sc.nextInt();
        int[] weights = new int[n];
        for (int i = 0; i < n; i++) weights[i] = sc.nextInt();
        System.out.println(shipWithinDays(weights, days));
    }
}`,
      python: `import sys

def ship_within_days(weights, days):
    def is_feasible(cap):
        d = 1
        curr = 0
        for w in weights:
            if curr + w > cap:
                d += 1
                curr = w
            else:
                curr += w
        return d <= days

    low = max(weights)
    high = sum(weights)
    ans = high

    while low <= high:
        mid = (low + high) // 2
        if is_feasible(mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n, days = int(tokens[0]), int(tokens[1])
        weights = [int(x) for x in tokens[2:n+2]]
        print(ship_within_days(weights, days))`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '10 5\n1 2 3 4 5 6 7 8 9 10',
        expectedOutput: '15',
        isHidden: false,
        explanation: 'Day 1: 1..5 (15), Day 2: 6,7 (13), Day 3: 8, Day 4: 9, Day 5: 10.',
      },
      {
        id: 'tc-2',
        input: '6 3\n3 2 2 4 1 4',
        expectedOutput: '6',
        isHidden: false,
        explanation: 'Capacity 6 ships in 3 days: [3, 2], [2, 4], [1, 4].',
      },
      {
        id: 'tc-3',
        input: '5 1\n1 2 3 1 1',
        expectedOutput: '8',
        isHidden: true,
        explanation: 'When days = 1, capacity must equal sum(weights).',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Initialize Range',
        description: 'weights=[1..10], days=5. low=10 (max element), high=55 (sum). Initial mid=32.',
        variables: { low: 10, high: 55, mid: 32 },
        arrayState: { elements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      },
      {
        step: 2,
        label: 'Feasibility Test',
        description: 'mid=15 requires exactly 5 days: Day 1 (15), Day 2 (13), Day 3 (8), Day 4 (9), Day 5 (10). Feasible! Search lower half [10, 14].',
        variables: { capacityTested: 15, daysNeeded: 5, feasible: true },
        arrayState: { elements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      },
      {
        step: 3,
        label: 'Optimal Capacity Found',
        description: 'Capacities < 15 require > 5 days. Minimum optimal capacity is 15.',
        variables: { ans: 15 },
        arrayState: { elements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      },
    ],
  },
  {
    id: 'day3-p3-kadane',
    day: 3,
    title: "Maximum Subarray Sum (Kadane's Algorithm)",
    difficulty: 'Easy',
    moduleTag: 'Subarrays & Dynamic Programming',
    companies: ['TCS Digital', 'Amazon', 'Cognizant', 'Microsoft', 'Capgemini'],
    platforms: ['LeetCode #53', 'GeeksforGeeks', 'HackerRank'],
    problemStatement:
      'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    inputFormat: 'First line contains integer n. Second line contains n space-separated integers.',
    outputFormat: 'Print the maximum subarray sum.',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    sampleInput: '9\n-2 1 -3 4 -1 2 1 -5 4',
    sampleOutput: '6',
    kapilIntuition:
      "Mentorship By Kapil: At each index i, we decide whether to extend the previous subarray (current_sum + nums[i]) or start a fresh subarray at nums[i]. Watch out for all-negative arrays like [-3, -1, -5] where the answer must be -1!",
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int maxSubArray(int nums[], int n) {
    // Write your O(N) Kadane algorithm here
    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    printf("%d\\n", maxSubArray(nums, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int maxSubArray(const vector<int>& nums) {
    // Write your O(N) Kadane algorithm here
    return 0;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << maxSubArray(nums) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int maxSubArray(int[] nums) {
        // Write your O(N) Kadane algorithm here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println(maxSubArray(nums));
    }
}`,
      python: `import sys

def max_sub_array(nums):
    # Write your O(N) Kadane algorithm here
    return 0

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        nums = [int(x) for x in tokens[1:n+1]]
        print(max_sub_array(nums))`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int maxSubArray(int nums[], int n) {
    int maxSoFar = nums[0];
    int curr = nums[0];
    for (int i = 1; i < n; i++) {
        curr = (nums[i] > curr + nums[i]) ? nums[i] : (curr + nums[i]);
        if (curr > maxSoFar) maxSoFar = curr;
    }
    return maxSoFar;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    printf("%d\\n", maxSubArray(nums, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxSubArray(const vector<int>& nums) {
    int maxSoFar = nums[0], curr = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        curr = max(nums[i], curr + nums[i]);
        maxSoFar = max(maxSoFar, curr);
    }
    return maxSoFar;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << maxSubArray(nums) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int maxSubArray(int[] nums) {
        int maxSoFar = nums[0], curr = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curr = Math.max(nums[i], curr + nums[i]);
            maxSoFar = Math.max(maxSoFar, curr);
        }
        return maxSoFar;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println(maxSubArray(nums));
    }
}`,
      python: `import sys

def max_sub_array(nums):
    max_so_far = nums[0]
    curr = nums[0]
    for x in nums[1:]:
        curr = max(x, curr + x)
        max_so_far = max(max_so_far, curr)
    return max_so_far

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        nums = [int(x) for x in tokens[1:n+1]]
        print(max_sub_array(nums))`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '9\n-2 1 -3 4 -1 2 1 -5 4',
        expectedOutput: '6',
        isHidden: false,
        explanation: 'Subarray [4, -1, 2, 1] has largest sum 6.',
      },
      {
        id: 'tc-2',
        input: '1\n1',
        expectedOutput: '1',
        isHidden: false,
        explanation: 'Single element array.',
      },
      {
        id: 'tc-3',
        input: '5\n5 4 -1 7 8',
        expectedOutput: '23',
        isHidden: true,
        explanation: 'All elements sum to 23.',
      },
      {
        id: 'tc-4',
        input: '4\n-3 -2 -5 -1',
        expectedOutput: '-1',
        isHidden: true,
        explanation: 'All negative numbers: output largest single negative element -1.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Initialize with First Element',
        description: 'curr = -2, maxSoFar = -2.',
        variables: { curr: -2, maxSoFar: -2 },
        arrayState: { elements: [-2, 1, -3, 4, -1, 2, 1, -5, 4], activeIndices: [0] },
      },
      {
        step: 2,
        label: 'Reset on Element 1',
        description: 'nums[1]=1 > curr+(-2)= -1. Restart subarray at index 1: curr=1, maxSoFar=1.',
        variables: { curr: 1, maxSoFar: 1 },
        arrayState: { elements: [-2, 1, -3, 4, -1, 2, 1, -5, 4], activeIndices: [1] },
      },
      {
        step: 3,
        label: 'Peak at Subarray [4, -1, 2, 1]',
        description: 'curr accumulates to 4 + (-1) + 2 + 1 = 6. maxSoFar is updated to 6.',
        variables: { curr: 6, maxSoFar: 6 },
        arrayState: { elements: [-2, 1, -3, 4, -1, 2, 1, -5, 4], activeIndices: [3, 4, 5, 6] },
      },
    ],
  },
  {
    id: 'day3-p4-subarray-sum-k',
    day: 3,
    title: 'Subarray Sum Equals K',
    difficulty: 'Medium',
    moduleTag: 'Prefix Sum & Hash Map',
    companies: ['Microsoft', 'Adobe', 'Wipro Turbo', 'Amazon', 'Meta'],
    platforms: ['LeetCode #560', 'GeeksforGeeks'],
    problemStatement:
      'Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k. The array may contain both positive, zero, and negative values.',
    inputFormat: 'First line contains n and k. Second line contains n space-separated integers.',
    outputFormat: 'Print the count of matching subarrays.',
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000', '-10^7 <= k <= 10^7'],
    sampleInput: '3 2\n1 1 1',
    sampleOutput: '2',
    kapilIntuition:
      'Mentorship By Kapil: Do not use two pointers or sliding window here because the array can contain negative numbers! Sliding window only works on non-negative values. Use Prefix Sum + Hash Map. Check if prefix_sum - k exists.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    starterCode: {
      c: `#include <stdio.h>

int subarraySum(int nums[], int n, int k) {
    // Write your Prefix Sum + Hash Map logic here
    return 0;
}

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    printf("%d\\n", subarraySum(nums, n, k));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int subarraySum(const vector<int>& nums, int k) {
    // Write your Prefix Sum + Hash Map logic here
    return 0;
}

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << subarraySum(nums, k) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int subarraySum(int[] nums, int k) {
        // Write your Prefix Sum + Hash Map logic here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println(subarraySum(nums, k));
    }
}`,
      python: `import sys

def subarray_sum(nums, k):
    # Write your Prefix Sum + Hash Map logic here
    return 0

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n, k = int(tokens[0]), int(tokens[1])
        nums = [int(x) for x in tokens[2:n+2]]
        print(subarray_sum(nums, k))`,
    },
    solutionCode: {
      c: `#include <stdio.h>

// Simple hash map for C
#define HASH_SIZE 40009
typedef struct Entry {
    int key;
    int val;
    struct Entry* next;
} Entry;

Entry* table[HASH_SIZE];
Entry pool[50000];
int poolIdx = 0;

int hash(int key) {
    int h = key % HASH_SIZE;
    return (h < 0) ? h + HASH_SIZE : h;
}

void put(int key) {
    int h = hash(key);
    Entry* curr = table[h];
    while (curr) {
        if (curr->key == key) { curr->val++; return; }
        curr = curr->next;
    }
    Entry* e = &pool[poolIdx++];
    e->key = key; e->val = 1; e->next = table[h];
    table[h] = e;
}

int get(int key) {
    int h = hash(key);
    Entry* curr = table[h];
    while (curr) {
        if (curr->key == key) return curr->val;
        curr = curr->next;
    }
    return 0;
}

int subarraySum(int nums[], int n, int k) {
    for (int i = 0; i < HASH_SIZE; i++) table[i] = NULL;
    poolIdx = 0;
    put(0); // Base case: prefix 0 has frequency 1

    int sum = 0, count = 0;
    for (int i = 0; i < n; i++) {
        sum += nums[i];
        count += get(sum - k);
        put(sum);
    }
    return count;
}

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    printf("%d\\n", subarraySum(nums, n, k));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int subarraySum(const vector<int>& nums, int k) {
    unordered_map<int, int> prefixFreq;
    prefixFreq[0] = 1;
    int sum = 0, count = 0;

    for (int x : nums) {
        sum += x;
        if (prefixFreq.count(sum - k)) count += prefixFreq[sum - k];
        prefixFreq[sum]++;
    }
    return count;
}

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << subarraySum(nums, k) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        int sum = 0, count = 0;

        for (int x : nums) {
            sum += x;
            count += map.getOrDefault(sum - k, 0);
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println(subarraySum(nums, k));
    }
}`,
      python: `import sys

def subarray_sum(nums, k):
    prefix_map = {0: 1}
    curr_sum = 0
    count = 0

    for x in nums:
        curr_sum += x
        count += prefix_map.get(curr_sum - k, 0)
        prefix_map[curr_sum] = prefix_map.get(curr_sum, 0) + 1
    return count

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n, k = int(tokens[0]), int(tokens[1])
        nums = [int(x) for x in tokens[2:n+2]]
        print(subarray_sum(nums, k))`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '3 2\n1 1 1',
        expectedOutput: '2',
        isHidden: false,
        explanation: 'Subarrays [0..1] and [1..2] each sum to 2.',
      },
      {
        id: 'tc-2',
        input: '3 3\n1 2 3',
        expectedOutput: '2',
        isHidden: false,
        explanation: 'Subarrays [0..1] (1+2=3) and [2] (3) sum to 3.',
      },
      {
        id: 'tc-3',
        input: '6 0\n1 -1 0 0 1 -1',
        expectedOutput: '7',
        isHidden: true,
        explanation: 'Handles zeros and negative sums.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Initialize Map with Prefix 0',
        description: 'prefix_map = {0: 1}, count = 0, sum = 0.',
        variables: { count: 0, sum: 0 },
        arrayState: { elements: [1, 1, 1] },
      },
      {
        step: 2,
        label: 'Process First Element (1)',
        description: 'sum = 1. Needed (1 - 2 = -1) not in map. Record prefix 1.',
        variables: { sum: 1, count: 0 },
        arrayState: { elements: [1, 1, 1], activeIndices: [0] },
      },
      {
        step: 3,
        label: 'Process Second Element (1)',
        description: 'sum = 2. Needed (2 - 2 = 0) is in map (freq 1). Count increments to 1! Record prefix 2.',
        variables: { sum: 2, count: 1 },
        arrayState: { elements: [1, 1, 1], activeIndices: [0, 1] },
      },
      {
        step: 4,
        label: 'Process Third Element (1)',
        description: 'sum = 3. Needed (3 - 2 = 1) is in map (freq 1). Count increments to 2!',
        variables: { sum: 3, count: 2 },
        arrayState: { elements: [1, 1, 1], activeIndices: [1, 2] },
      },
    ],
  },
  {
    id: 'day3-p5-3sum',
    day: 3,
    title: '3Sum - Unique Triplets Sum to Zero',
    difficulty: 'Medium',
    moduleTag: 'Two Pointers & Duplicate Elimination',
    companies: ['Amazon', 'Meta', 'Capgemini', 'Microsoft', 'Oracle'],
    platforms: ['LeetCode #15', 'GeeksforGeeks', 'HackerRank'],
    problemStatement:
      'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets. Print the number of unique triplets found.',
    inputFormat: 'First line contains n. Second line contains n space-separated integers.',
    outputFormat: 'Print the count of unique triplets.',
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    sampleInput: '6\n-1 0 1 2 -1 -4',
    sampleOutput: '2',
    kapilIntuition:
      'Mentorship By Kapil: Sort the array first O(N log N). Fix the first element nums[i]. Use two pointers (left = i + 1, right = n - 1). If sum == 0, record triplet and skip duplicates for both left and right! Total runtime is O(N^2).',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1) auxiliary space (excluding output)',
    starterCode: {
      c: `#include <stdio.h>

int threeSumCount(int nums[], int n) {
    // Write your O(N^2) sorted two-pointer logic here
    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    printf("%d\\n", threeSumCount(nums, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int threeSumCount(vector<int>& nums) {
    // Write your O(N^2) sorted two-pointer logic here
    return 0;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << threeSumCount(nums) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int threeSumCount(int[] nums) {
        // Write your O(N^2) sorted two-pointer logic here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println(threeSumCount(nums));
    }
}`,
      python: `import sys

def three_sum_count(nums):
    # Write your O(N^2) sorted two-pointer logic here
    return 0

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        nums = [int(x) for x in tokens[1:n+1]]
        print(three_sum_count(nums))`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int compare(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

int threeSumCount(int nums[], int n) {
    qsort(nums, n, sizeof(int), compare);
    int count = 0;

    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicates
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
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    printf("%d\\n", threeSumCount(nums, n));
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
                left++; right--;
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
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << threeSumCount(nums) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
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
                    left++; right--;
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
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println(threeSumCount(nums));
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
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        nums = [int(x) for x in tokens[1:n+1]]
        print(three_sum_count(nums))`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '6\n-1 0 1 2 -1 -4',
        expectedOutput: '2',
        isHidden: false,
        explanation: 'The 2 unique triplets are [-1, -1, 2] and [-1, 0, 1].',
      },
      {
        id: 'tc-2',
        input: '3\n0 1 1',
        expectedOutput: '0',
        isHidden: false,
        explanation: 'No triplet sums to 0.',
      },
      {
        id: 'tc-3',
        input: '5\n0 0 0 0 0',
        expectedOutput: '1',
        isHidden: true,
        explanation: 'Exactly 1 unique triplet: [0, 0, 0].',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Sort Array',
        description: 'Input sorted: [-4, -1, -1, 0, 1, 2].',
        variables: { sorted: true },
        arrayState: { elements: [-4, -1, -1, 0, 1, 2] },
      },
      {
        step: 2,
        label: 'Fix i = 1 (val -1)',
        description: 'left=2 (val -1), right=5 (val 2). Sum: -1 + (-1) + 2 = 0! Triplet recorded.',
        variables: { i: 1, left: 2, right: 5, sum: 0 },
        arrayState: { elements: [-4, -1, -1, 0, 1, 2], activeIndices: [1, 2, 5] },
      },
      {
        step: 3,
        label: 'Next Pair for i = 1',
        description: 'left moves to 3 (val 0), right moves to 4 (val 1). Sum: -1 + 0 + 1 = 0! Second triplet recorded.',
        variables: { i: 1, left: 3, right: 4, sum: 0 },
        arrayState: { elements: [-4, -1, -1, 0, 1, 2], activeIndices: [1, 3, 4] },
      },
    ],
  },
  {
    id: 'day3-p6-trapping-water',
    day: 3,
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    moduleTag: 'Two Pointers & Squeezing Bounds',
    companies: ['Google', 'Amazon', 'Goldman Sachs', 'Microsoft', 'Samsung'],
    platforms: ['LeetCode #42', 'GeeksforGeeks', 'HackerRank'],
    problemStatement:
      'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    inputFormat: 'First line contains n. Second line contains n space-separated non-negative integers.',
    outputFormat: 'Print total trapped water units.',
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    sampleInput: '12\n0 1 0 2 1 0 1 3 2 1 2 1',
    sampleOutput: '6',
    kapilIntuition:
      'Mentorship By Kapil: Water at index i is min(maxLeft, maxRight) - height[i]. With two pointers, if height[left] <= height[right], water at left is bottlenecked solely by maxLeft! Advance left. Else bottlenecked by maxRight, advance right.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int trap(int height[], int n) {
    // Write your O(N) Two Pointer logic here
    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int height[n];
    for (int i = 0; i < n; i++) scanf("%d", &height[i]);
    printf("%d\\n", trap(height, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int trap(const vector<int>& height) {
    // Write your O(N) Two Pointer logic here
    return 0;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> height(n);
    for (int i = 0; i < n; i++) cin >> height[i];
    cout << trap(height) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int trap(int[] height) {
        // Write your O(N) Two Pointer logic here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] height = new int[n];
        for (int i = 0; i < n; i++) height[i] = sc.nextInt();
        System.out.println(trap(height));
    }
}`,
      python: `import sys

def trap(height):
    # Write your O(N) Two Pointer logic here
    return 0

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        height = [int(x) for x in tokens[1:n+1]]
        print(trap(height))`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int trap(int height[], int n) {
    int left = 0, right = n - 1;
    int leftMax = 0, rightMax = 0, water = 0;

    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int height[n];
    for (int i = 0; i < n; i++) scanf("%d", &height[i]);
    printf("%d\\n", trap(height, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int trap(const vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, water = 0;

    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> height(n);
    for (int i = 0; i < n; i++) cin >> height[i];
    cout << trap(height) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;

        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] height = new int[n];
        for (int i = 0; i < n; i++) height[i] = sc.nextInt();
        System.out.println(trap(height));
    }
}`,
      python: `import sys

def trap(height):
    left, right = 0, len(height) - 1
    left_max = right_max = water = 0

    while left < right:
        if height[left] <= height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    return water

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        height = [int(x) for x in tokens[1:n+1]]
        print(trap(height))`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '12\n0 1 0 2 1 0 1 3 2 1 2 1',
        expectedOutput: '6',
        isHidden: false,
        explanation: 'Traps 6 units of water.',
      },
      {
        id: 'tc-2',
        input: '6\n4 2 0 3 2 5',
        expectedOutput: '9',
        isHidden: false,
        explanation: 'Traps 9 units between pillars 4 and 5.',
      },
      {
        id: 'tc-3',
        input: '3\n3 2 1',
        expectedOutput: '0',
        isHidden: true,
        explanation: 'Descending heights cannot trap water.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Initialize Two Pointers',
        description: 'left=0 (h=0), right=11 (h=1). leftMax=0, rightMax=0, water=0.',
        variables: { left: 0, right: 11, leftMax: 0, rightMax: 0 },
        arrayState: { elements: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], activeIndices: [0, 11] },
      },
      {
        step: 2,
        label: 'Trap Water at Index 2',
        description: 'left=2 (h=0), leftMax=1. Water trapped = 1 - 0 = 1 unit!',
        variables: { water: 1, left: 2, leftMax: 1 },
        arrayState: { elements: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], activeIndices: [2] },
      },
      {
        step: 3,
        label: 'Full Trapping Sum Completed',
        description: 'Total water accumulated across all valley dips = 6 units.',
        variables: { totalWater: 6 },
        arrayState: { elements: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
      },
    ],
  },
  {
    id: 'day3-p7-next-greater',
    day: 3,
    title: 'Next Greater Element I',
    difficulty: 'Easy',
    moduleTag: 'Monotonic Stack',
    companies: ['TCS', 'HCL', 'Infosys', 'Cognizant', 'Accenture'],
    platforms: ['LeetCode #496', 'GeeksforGeeks'],
    problemStatement:
      'Given an array of integers, for each element find the first greater element to its right. If no such element exists, output -1 for that position. Print the space-separated next greater elements.',
    inputFormat: 'First line contains integer n. Second line contains n space-separated integers.',
    outputFormat: 'Print n space-separated integers representing the next greater elements.',
    constraints: ['1 <= n <= 10^5', '-10^9 <= arr[i] <= 10^9'],
    sampleInput: '4\n4 5 2 25',
    sampleOutput: '5 25 25 -1',
    kapilIntuition:
      'Mentorship By Kapil: Traverse backwards from n-1 down to 0. Keep a decreasing stack. Pop any stack top smaller or equal to current. Top is now the next greater element. Push current. Runs in amortized O(N) time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    starterCode: {
      c: `#include <stdio.h>

void nextGreater(int arr[], int n, int res[]) {
    // Write your Monotonic Stack logic here
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[n], res[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    nextGreater(arr, n, res);
    for (int i = 0; i < n; i++) printf("%d%c", res[i], (i == n - 1 ? '\\n' : ' '));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreater(const vector<int>& nums) {
    // Write your Monotonic Stack logic here
    return {};
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    vector<int> res = nextGreater(nums);
    for (int i = 0; i < n; i++) cout << res[i] << (i == n - 1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int[] nextGreater(int[] nums) {
        // Write your Monotonic Stack logic here
        return new int[0];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int[] res = nextGreater(nums);
        for (int i = 0; i < n; i++) {
            System.out.print(res[i] + (i == n - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
      python: `import sys

def next_greater(nums):
    # Write your Monotonic Stack logic here
    return []

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        nums = [int(x) for x in tokens[1:n+1]]
        res = next_greater(nums)
        print(" ".join(map(str, res)))`,
    },
    solutionCode: {
      c: `#include <stdio.h>

void nextGreater(int arr[], int n, int res[]) {
    int stack[100000];
    int top = -1;
    for (int i = n - 1; i >= 0; i--) {
        while (top >= 0 && stack[top] <= arr[i]) top--;
        res[i] = (top == -1) ? -1 : stack[top];
        stack[++top] = arr[i];
    }
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[n], res[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    nextGreater(arr, n, res);
    for (int i = 0; i < n; i++) printf("%d%c", res[i], (i == n - 1 ? '\\n' : ' '));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreater(const vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, -1);
    stack<int> st;

    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= nums[i]) st.pop();
        if (!st.empty()) res[i] = st.top();
        st.push(nums[i]);
    }
    return res;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    vector<int> res = nextGreater(nums);
    for (int i = 0; i < n; i++) cout << res[i] << (i == n - 1 ? "" : " ");
    cout << "\\n";
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int[] nextGreater(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        Deque<Integer> st = new ArrayDeque<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!st.isEmpty() && st.peek() <= nums[i]) st.pop();
            res[i] = st.isEmpty() ? -1 : st.peek();
            st.push(nums[i]);
        }
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int[] res = nextGreater(nums);
        for (int i = 0; i < n; i++) {
            System.out.print(res[i] + (i == n - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
      python: `import sys

def next_greater(nums):
    n = len(nums)
    res = [-1] * n
    stack = []

    for i in range(n - 1, -1, -1):
        while stack and stack[-1] <= nums[i]:
            stack.pop()
        if stack:
            res[i] = stack[-1]
        stack.append(nums[i])
    return res

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        nums = [int(x) for x in tokens[1:n+1]]
        res = next_greater(nums)
        print(" ".join(map(str, res)))`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '4\n4 5 2 25',
        expectedOutput: '5 25 25 -1',
        isHidden: false,
        explanation: '4->5, 5->25, 2->25, 25->-1.',
      },
      {
        id: 'tc-2',
        input: '4\n13 7 6 12',
        expectedOutput: '-1 12 12 -1',
        isHidden: false,
        explanation: '7 and 6 both have 12 as next greater.',
      },
      {
        id: 'tc-3',
        input: '3\n5 4 3',
        expectedOutput: '-1 -1 -1',
        isHidden: true,
        explanation: 'Strictly decreasing sequence has no greater right elements.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Start at Right Boundary',
        description: 'i=3 (val 25). Stack is empty -> res[3] = -1. Push 25 onto stack.',
        variables: { i: 3, val: 25, result: -1 },
        arrayState: { elements: [4, 5, 2, 25], activeIndices: [3] },
      },
      {
        step: 2,
        label: 'Process i = 2 (val 2)',
        description: 'Stack top is 25 > 2. res[2] = 25. Push 2 onto stack.',
        variables: { i: 2, val: 2, result: 25 },
        arrayState: { elements: [4, 5, 2, 25], activeIndices: [2] },
      },
      {
        step: 3,
        label: 'Process i = 1 (val 5)',
        description: 'Stack top 2 <= 5 -> pop 2. Now top is 25 > 5. res[1] = 25. Push 5.',
        variables: { i: 1, val: 5, result: 25 },
        arrayState: { elements: [4, 5, 2, 25], activeIndices: [1] },
      },
    ],
  },
  {
    id: 'day3-p8-non-overlapping',
    day: 3,
    title: 'Non-overlapping Intervals',
    difficulty: 'Medium',
    moduleTag: 'Greedy Interval Scheduling',
    companies: ['Uber', 'Amazon', 'Cisco', 'Salesforce'],
    platforms: ['LeetCode #435', 'GeeksforGeeks'],
    problemStatement:
      'Given an array of intervals intervals where intervals[i] = [start_i, end_i], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.',
    inputFormat: 'First line contains integer n. Next n lines each contain start and end times.',
    outputFormat: 'Print the minimum intervals to remove.',
    constraints: ['1 <= intervals.length <= 10^5', 'intervals[i].length == 2', '-5 * 10^4 <= start_i < end_i <= 5 * 10^4'],
    sampleInput: '4\n1 2\n2 3\n3 4\n1 3',
    sampleOutput: '1',
    kapilIntuition:
      'Mentorship By Kapil: Sort intervals by END TIME! Greedy rule: by keeping the interval that finishes earliest, you leave maximum possible time for subsequent intervals. Count non-overlapping intervals; answer is total - nonOverlapping.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

int eraseOverlapIntervals(int starts[], int ends[], int n) {
    // Write your Greedy by End Time logic here
    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int s[n], e[n];
    for (int i = 0; i < n; i++) scanf("%d %d", &s[i], &e[i]);
    printf("%d\\n", eraseOverlapIntervals(s, e, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int eraseOverlapIntervals(vector<pair<int, int>>& intervals) {
    // Write your Greedy by End Time logic here
    return 0;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int, int>> intervals(n);
    for (int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;
    cout << eraseOverlapIntervals(intervals) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int eraseOverlapIntervals(int[][] intervals) {
        // Write your Greedy by End Time logic here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[][] intervals = new int[n][2];
        for (int i = 0; i < n; i++) {
            intervals[i][0] = sc.nextInt();
            intervals[i][1] = sc.nextInt();
        }
        System.out.println(eraseOverlapIntervals(intervals));
    }
}`,
      python: `import sys

def erase_overlap_intervals(intervals):
    # Write your Greedy by End Time logic here
    return 0

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        intervals = []
        idx = 1
        for _ in range(n):
            intervals.append([int(tokens[idx]), int(tokens[idx+1])])
            idx += 2
        print(erase_overlap_intervals(intervals))`,
    },
    solutionCode: {
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int s, e;
} Interval;

int compare(const void* a, const void* b) {
    return ((Interval*)a)->e - ((Interval*)b)->e;
}

int eraseOverlapIntervals(int starts[], int ends[], int n) {
    Interval* arr = (Interval*)malloc(n * sizeof(Interval));
    for (int i = 0; i < n; i++) { arr[i].s = starts[i]; arr[i].e = ends[i]; }
    qsort(arr, n, sizeof(Interval), compare);

    int count = 1;
    int lastEnd = arr[0].e;
    for (int i = 1; i < n; i++) {
        if (arr[i].s >= lastEnd) {
            count++;
            lastEnd = arr[i].e;
        }
    }
    free(arr);
    return n - count;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int s[n], e[n];
    for (int i = 0; i < n; i++) scanf("%d %d", &s[i], &e[i]);
    printf("%d\\n", eraseOverlapIntervals(s, e, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int eraseOverlapIntervals(vector<pair<int, int>>& intervals) {
    if (intervals.empty()) return 0;
    sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) {
        return a.second < b.second;
    });

    int count = 1, lastEnd = intervals[0].second;
    for (size_t i = 1; i < intervals.size(); i++) {
        if (intervals[i].first >= lastEnd) {
            count++;
            lastEnd = intervals[i].second;
        }
    }
    return intervals.size() - count;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int, int>> intervals(n);
    for (int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;
    cout << eraseOverlapIntervals(intervals) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

        int count = 1, lastEnd = intervals[0][1];
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] >= lastEnd) {
                count++;
                lastEnd = intervals[i][1];
            }
        }
        return intervals.length - count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[][] intervals = new int[n][2];
        for (int i = 0; i < n; i++) {
            intervals[i][0] = sc.nextInt();
            intervals[i][1] = sc.nextInt();
        }
        System.out.println(eraseOverlapIntervals(intervals));
    }
}`,
      python: `import sys

def erase_overlap_intervals(intervals):
    if not intervals: return 0
    intervals.sort(key=lambda x: x[1])

    count = 1
    last_end = intervals[0][1]
    for s, e in intervals[1:]:
        if s >= last_end:
            count += 1
            last_end = e
    return len(intervals) - count

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        intervals = []
        idx = 1
        for _ in range(n):
            intervals.append([int(tokens[idx]), int(tokens[idx+1])])
            idx += 2
        print(erase_overlap_intervals(intervals))`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '4\n1 2\n2 3\n3 4\n1 3',
        expectedOutput: '1',
        isHidden: false,
        explanation: 'Removing [1, 3] leaves [1, 2], [2, 3], [3, 4] non-overlapping.',
      },
      {
        id: 'tc-2',
        input: '3\n1 2\n1 2\n1 2',
        expectedOutput: '2',
        isHidden: false,
        explanation: 'Must remove two copies of [1, 2].',
      },
      {
        id: 'tc-3',
        input: '3\n1 2\n2 3\n3 4',
        expectedOutput: '0',
        isHidden: true,
        explanation: 'Already non-overlapping; 0 removals needed.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Sort by End Time',
        description: 'Intervals sorted by finish time: [1, 2], [2, 3], [1, 3], [3, 4].',
        variables: { sorted: true },
        arrayState: { elements: ['[1,2]', '[2,3]', '[1,3]', '[3,4]'] },
      },
      {
        step: 2,
        label: 'Greedy Pick [1,2] & [2,3]',
        description: 'Keep [1, 2] (end=2). Keep [2, 3] (start 2 >= 2, end=3).',
        variables: { nonOverlapCount: 2, lastEnd: 3 },
        arrayState: { elements: ['[1,2]', '[2,3]', '[1,3]', '[3,4]'], activeIndices: [0, 1] },
      },
      {
        step: 3,
        label: 'Detect Overlap with [1,3]',
        description: '[1, 3] start=1 < lastEnd=3. Must be removed!',
        variables: { removals: 1 },
        arrayState: { elements: ['[1,2]', '[2,3]', '[1,3] (DROP)', '[3,4]'], activeIndices: [2] },
      },
    ],
  },
  {
    id: 'day3-p9-single-number',
    day: 3,
    title: 'Single Number (Bitwise XOR)',
    difficulty: 'Easy',
    moduleTag: 'Bit Manipulation & O(1) Space',
    companies: ['Accenture', 'Cognizant', 'Wipro', 'TCS', 'Amazon'],
    platforms: ['LeetCode #136', 'GeeksforGeeks'],
    problemStatement:
      'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.',
    inputFormat: 'First line contains integer n. Second line contains n space-separated integers.',
    outputFormat: 'Print the unique element.',
    constraints: ['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4', 'Every element appears twice except for one.'],
    sampleInput: '5\n4 1 2 1 2',
    sampleOutput: '4',
    kapilIntuition:
      'Mentorship By Kapil: XORing any number with itself gives 0 (x ^ x = 0). XORing with 0 gives the number (x ^ 0 = x). Since XOR is commutative and associative, all duplicate pairs cancel out, leaving the single unique number in O(N) time and O(1) space!',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    starterCode: {
      c: `#include <stdio.h>

int singleNumber(int nums[], int n) {
    // Write your O(N) Time and O(1) Space XOR logic here
    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    printf("%d\\n", singleNumber(nums, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int singleNumber(const vector<int>& nums) {
    // Write your O(N) Time and O(1) Space XOR logic here
    return 0;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << singleNumber(nums) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int singleNumber(int[] nums) {
        // Write your O(N) Time and O(1) Space XOR logic here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println(singleNumber(nums));
    }
}`,
      python: `import sys

def single_number(nums):
    # Write your O(N) Time and O(1) Space XOR logic here
    return 0

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        nums = [int(x) for x in tokens[1:n+1]]
        print(single_number(nums))`,
    },
    solutionCode: {
      c: `#include <stdio.h>

int singleNumber(int nums[], int n) {
    int xor = 0;
    for (int i = 0; i < n; i++) xor ^= nums[i];
    return xor;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    printf("%d\\n", singleNumber(nums, n));
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int singleNumber(const vector<int>& nums) {
    int xorVal = 0;
    for (int x : nums) xorVal ^= x;
    return xorVal;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << singleNumber(nums) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int singleNumber(int[] nums) {
        int xor = 0;
        for (int x : nums) xor ^= x;
        return xor;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println(singleNumber(nums));
    }
}`,
      python: `import sys

def single_number(nums):
    ans = 0
    for x in nums:
        ans ^= x
    return ans

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n = int(tokens[0])
        nums = [int(x) for x in tokens[1:n+1]]
        print(single_number(nums))`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '5\n4 1 2 1 2',
        expectedOutput: '4',
        isHidden: false,
        explanation: '1 and 2 appear twice. 4 appears once.',
      },
      {
        id: 'tc-2',
        input: '3\n2 2 1',
        expectedOutput: '1',
        isHidden: false,
        explanation: '2 appears twice. 1 appears once.',
      },
      {
        id: 'tc-3',
        input: '1\n1',
        expectedOutput: '1',
        isHidden: true,
        explanation: 'Single element array.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Initialize XOR Accumulator',
        description: 'xor = 0. Array: [4, 1, 2, 1, 2].',
        variables: { xor: 0 },
        arrayState: { elements: [4, 1, 2, 1, 2] },
      },
      {
        step: 2,
        label: 'XOR with 4, 1, 2',
        description: '0 ^ 4 = 4. 4 ^ 1 = 5. 5 ^ 2 = 7.',
        variables: { xor: 7 },
        arrayState: { elements: [4, 1, 2, 1, 2], activeIndices: [0, 1, 2] },
      },
      {
        step: 3,
        label: 'Cancel Duplicates',
        description: '7 ^ 1 = 6. 6 ^ 2 = 4! Exactly 4 remains.',
        variables: { finalResult: 4 },
        arrayState: { elements: [4, 1, 2, 1, 2], activeIndices: [3, 4] },
      },
    ],
  },
  {
    id: 'day3-p10-sliding-window-max',
    day: 3,
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    moduleTag: 'Monotonic Deque',
    companies: ['Google', 'Microsoft', 'Walmart', 'Amazon', 'Apple'],
    platforms: ['LeetCode #239', 'GeeksforGeeks'],
    problemStatement:
      'You are given an array of integers nums, and there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position, output the max sliding window value separated by spaces.',
    inputFormat: 'First line contains n and k. Second line contains n space-separated integers.',
    outputFormat: 'Print space-separated maximum values for each window position.',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
    sampleInput: '8 3\n1 3 -1 -3 5 3 6 7',
    sampleOutput: '3 3 5 5 6 7',
    kapilIntuition:
      'Mentorship By Kapil: Do not re-scan the window in O(K) time! Use a Double-Ended Queue (Deque) storing INDICES in monotonically decreasing order of values. Maintain two invariants: 1) Remove indices out of current window (idx <= i - k). 2) Pop back indices whose values are <= nums[i]. The front of the deque is always the window maximum in amortized O(N) time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
    starterCode: {
      c: `#include <stdio.h>

void maxSlidingWindow(int nums[], int n, int k) {
    // Write your Monotonic Deque O(N) logic here
}

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    maxSlidingWindow(nums, n, k);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <deque>
using namespace std;

void maxSlidingWindow(const vector<int>& nums, int k) {
    // Write your Monotonic Deque O(N) logic here
}

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    maxSlidingWindow(nums, k);
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void maxSlidingWindow(int[] nums, int k) {
        // Write your Monotonic Deque O(N) logic here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        maxSlidingWindow(nums, k);
    }
}`,
      python: `import sys

def max_sliding_window(nums, k):
    # Write your Monotonic Deque O(N) logic here
    pass

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n, k = int(tokens[0]), int(tokens[1])
        nums = [int(x) for x in tokens[2:n+2]]
        max_sliding_window(nums, k)`,
    },
    solutionCode: {
      c: `#include <stdio.h>

void maxSlidingWindow(int nums[], int n, int k) {
    int deque[100000];
    int head = 0, tail = -1;
    int first = 1;

    for (int i = 0; i < n; i++) {
        // 1. Remove elements outside current window
        if (head <= tail && deque[head] <= i - k) head++;

        // 2. Remove smaller elements from tail
        while (head <= tail && nums[deque[tail]] <= nums[i]) tail--;

        // 3. Push current index
        deque[++tail] = i;

        // 4. Output max once window reaches size k
        if (i >= k - 1) {
            if (!first) printf(" ");
            printf("%d", nums[deque[head]]);
            first = 0;
        }
    }
    printf("\\n");
}

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    int nums[n];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    maxSlidingWindow(nums, n, k);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <deque>
using namespace std;

void maxSlidingWindow(const vector<int>& nums, int k) {
    deque<int> dq;
    bool first = true;

    for (int i = 0; i < (int)nums.size(); i++) {
        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
        dq.push_back(i);

        if (i >= k - 1) {
            if (!first) cout << " ";
            cout << nums[dq.front()];
            first = false;
        }
    }
    cout << "\\n";
}

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    maxSlidingWindow(nums, k);
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static void maxSlidingWindow(int[] nums, int k) {
        Deque<Integer> dq = new ArrayDeque<>();
        StringBuilder sb = new StringBuilder();
        boolean first = true;

        for (int i = 0; i < nums.length; i++) {
            if (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();
            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();
            dq.offerLast(i);

            if (i >= k - 1) {
                if (!first) sb.append(" ");
                sb.append(nums[dq.peekFirst()]);
                first = false;
            }
        }
        System.out.println(sb.toString());
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        maxSlidingWindow(nums, k);
    }
}`,
      python: `import sys
from collections import deque

def max_sliding_window(nums, k):
    dq = deque()
    res = []

    for i in range(len(nums)):
        if dq and dq[0] <= i - k:
            dq.popleft()
        while dq and nums[dq[-1]] <= nums[i]:
            dq.pop()
        dq.append(i)

        if i >= k - 1:
            res.append(str(nums[dq[0]]))
    print(" ".join(res))

if __name__ == "__main__":
    tokens = sys.stdin.read().split()
    if tokens:
        n, k = int(tokens[0]), int(tokens[1])
        nums = [int(x) for x in tokens[2:n+2]]
        max_sliding_window(nums, k)`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '8 3\n1 3 -1 -3 5 3 6 7',
        expectedOutput: '3 3 5 5 6 7',
        isHidden: false,
        explanation: 'Max for each window of size 3.',
      },
      {
        id: 'tc-2',
        input: '1 1\n1',
        expectedOutput: '1',
        isHidden: false,
        explanation: 'Window size 1 on single element.',
      },
      {
        id: 'tc-3',
        input: '4 2\n9 11 8 5',
        expectedOutput: '11 11 8',
        isHidden: true,
        explanation: 'Windows: [9,11]->11, [11,8]->11, [8,5]->8.',
      },
    ],
    visualizationSteps: [
      {
        step: 1,
        label: 'Window 1: [1, 3, -1]',
        description: 'Indices in deque: [1, 2] (values 3, -1). Front index 1 holds max value 3.',
        variables: { windowMax: 3 },
        arrayState: { elements: [1, 3, -1, -3, 5, 3, 6, 7], activeIndices: [0, 1, 2] },
      },
      {
        step: 2,
        label: 'Window 2: [3, -1, -3]',
        description: 'Index 3 (-3) added. Front still index 1 (value 3). Window max = 3.',
        variables: { windowMax: 3 },
        arrayState: { elements: [1, 3, -1, -3, 5, 3, 6, 7], activeIndices: [1, 2, 3] },
      },
      {
        step: 3,
        label: 'Window 3: [-1, -3, 5]',
        description: 'Value 5 arrives! Smaller values -1, -3 popped. Index 1 out of bounds. Front is now 5!',
        variables: { windowMax: 5 },
        arrayState: { elements: [1, 3, -1, -3, 5, 3, 6, 7], activeIndices: [2, 3, 4] },
      },
    ],
  },
];
