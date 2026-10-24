import { ProgrammingNote } from '../types';

/**
 * Day 3 Comprehensive Programming Notes & Solved Examples
 * Module 3: Company-Oriented Coding Lab & Trade-Off Benchmarking
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 * Covers: Constraint analysis, Binary Search on Answer, Prefix Sums, Kadane's Algorithm,
 * Two Pointers, Monotonic Stack, Greedy Intervals, Bitwise Hacks & Defensive Coding.
 */
export const DAY_3_PROGRAMMING_NOTES: ProgrammingNote[] = [
  {
    id: 'd3-note-1',
    title: 'Constraint-to-Complexity Mapping & The 10^8 Operations Rule',
    conceptSummary:
      'In technical placement tests (TCS Digital, Infosys, Amazon, Microsoft, Wipro Turbo), online judges typically grant a 1.0 to 2.0-second CPU time limit. As an ironclad rule of thumb, an optimized C/C++ or Java program can execute approximately 10^8 basic operations per second. Looking at input constraint N dictates the required algorithm before writing a single line of code:\n' +
      '• N <= 10: O(N!) or O(2^N * N) - Permutations, Travelling Salesperson (Brute Force / Bitmask DP)\n' +
      '• N <= 20: O(2^N) - Subsets, Exponential Backtracking, Meet-in-the-Middle\n' +
      '• N <= 500: O(N^3) - Floyd-Warshall, 3D Dynamic Programming\n' +
      '• N <= 2,000: O(N^2) - 2D Dynamic Programming, Nested Traversal, Matrix operations\n' +
      '• N <= 10^5: O(N log N) or O(N) - Sorting, Binary Search, Heaps, Hash Map, Two Pointers, Monotonic Stack\n' +
      '• N <= 10^9: O(log N) or O(sqrt(N)) - Binary Search on Answer Space, Math formulas, Fast Exponentiation',
    timeSpaceNote: 'Time Complexity: Maps strictly to 10^8 ops/sec budget. Auxiliary Space: 256MB memory limit corresponds to ~6 * 10^7 32-bit integers.',
    kapilMentorTip:
      'Never jump straight into coding during an online assessment! First glance at the constraints on N. If N = 10^5, an O(N^2) double loop will hit TLE (Time Limit Exceeded) guaranteed. Always target O(N log N) or O(N).',
    codeByLanguage: {
      c: `// Example: Check whether problem demands O(N) or O(log N)
// If N = 10^9, we cannot even iterate array elements linearly!
#include <stdio.h>

// O(log N) Fast Exponentiation for huge powers up to 10^9
long long fastPower(long long base, long long exp, long long mod) {
    long long res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}

int main() {
    long long base = 2, exp = 1000000000, mod = 1000000007;
    // Computes (2^10^9) % 1000000007 in just 30 operations!
    printf("Result: %lld\\n", fastPower(base, exp, mod));
    return 0;
}`,
      cpp: `// C++: Fast I/O is mandatory for N >= 10^5 to prevent TLE
#include <iostream>
using namespace std;

void enableFastIO() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
}

// O(log N) Fast Power
long long fastPower(long long base, long long exp, long long mod) {
    long long res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}

int main() {
    enableFastIO();
    cout << "2^10^9 mod 10^9+7 = " << fastPower(2, 1000000000, 1000000007) << "\\n";
    return 0;
}`,
      java: `// Java: Use BufferedReader & StringTokenizer for N >= 10^5
import java.io.*;
import java.util.*;

public class Main {
    static long fastPower(long base, long exp, long mod) {
        long res = 1;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) res = (res * base) % mod;
            base = (base * base) % mod;
            exp >>= 1;
        }
        return res;
    }

    public static void main(String[] args) {
        long ans = fastPower(2, 1000000000, 1000000007);
        System.out.println("Result: " + ans);
    }
}`,
      python: `# Python: Use sys.stdin.read().split() for massive inputs
import sys

def fast_power(base: int, exp: int, mod: int) -> int:
    return pow(base, exp, mod) # Python built-in pow() is O(log exp)

if __name__ == "__main__":
    print(f"Result: {fast_power(2, 10**9, 10**9 + 7)}")`,
    },
  },
  {
    id: 'd3-note-2',
    title: 'Binary Search on Answer Space (Min-Max Optimization)',
    conceptSummary:
      'Binary Search is not just for searching elements in a sorted array! Whenever a problem asks to "Minimize the Maximum" or "Maximize the Minimum", and the feasibility function f(x) is monotonic (if load x is possible, any load > x is also possible), you can Binary Search on the Answer domain [low, high].\n' +
      '• Classic Problems: Book Allocation Problem, Aggressive Cows, Capacity to Ship Packages Within D Days, Koko Eating Bananas.\n' +
      '• Domain Initialization:\n' +
      '  - low = max(array) (minimum possible capacity must hold at least the largest individual item)\n' +
      '  - high = sum(array) (maximum possible capacity if one worker takes everything)\n' +
      '• Mid calculation: Always write mid = low + (high - low) / 2 to avoid 32-bit signed integer overflow!',
    timeSpaceNote: 'Time Complexity: O(N * log(sum - max)). Auxiliary Space: O(1).',
    kapilMentorTip:
      'Mentorship By Kapil: Check monotonic behavior first! Ask yourself: "If capacity = K is valid, is capacity = K + 1 also guaranteed to be valid?" If YES, Binary Search on Answer is 100% applicable.',
    codeByLanguage: {
      c: `// C Implementation: Capacity to Ship Packages in D Days
#include <stdio.h>

int isFeasible(int weights[], int n, int d, int capacity) {
    int days = 1, currentWeight = 0;
    for (int i = 0; i < n; i++) {
        if (currentWeight + weights[i] > capacity) {
            days++;
            currentWeight = weights[i];
        } else {
            currentWeight += weights[i];
        }
    }
    return days <= d;
}

int shipWithinDays(int weights[], int n, int d) {
    int low = 0, high = 0;
    for (int i = 0; i < n; i++) {
        if (weights[i] > low) low = weights[i];
        high += weights[i];
    }
    int ans = high;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (isFeasible(weights, n, d, mid)) {
            ans = mid;
            high = mid - 1; // Try smaller capacity
        } else {
            low = mid + 1;  // Need bigger capacity
        }
    }
    return ans;
}

int main() {
    int weights[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int days = 5;
    printf("Min Capacity: %d\\n", shipWithinDays(weights, 10, days)); // 15
    return 0;
}`,
      cpp: `// C++ Implementation: Capacity to Ship Packages in D Days
#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

bool isFeasible(const vector<int>& weights, int days, int capacity) {
    int requiredDays = 1, currentLoad = 0;
    for (int w : weights) {
        if (currentLoad + w > capacity) {
            requiredDays++;
            currentLoad = w;
        } else {
            currentLoad += w;
        }
    }
    return requiredDays <= days;
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
    vector<int> weights = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    cout << "Min Capacity: " << shipWithinDays(weights, 5) << endl; // 15
    return 0;
}`,
      java: `// Java Implementation: Capacity to Ship Packages in D Days
import java.util.*;

public class Main {
    static boolean isFeasible(int[] weights, int days, int capacity) {
        int requiredDays = 1, currentLoad = 0;
        for (int w : weights) {
            if (currentLoad + w > capacity) {
                requiredDays++;
                currentLoad = w;
            } else {
                currentLoad += w;
            }
        }
        return requiredDays <= days;
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
        int[] weights = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        System.out.println("Min Capacity: " + shipWithinDays(weights, 5)); // 15
    }
}`,
      python: `# Python Implementation: Capacity to Ship Packages in D Days
from typing import List

def ship_within_days(weights: List[int], days: int) -> int:
    def is_feasible(capacity: int) -> bool:
        required_days = 1
        current_load = 0
        for w in weights:
            if current_load + w > capacity:
                required_days += 1
                current_load = w
            else:
                current_load += w
        return required_days <= days

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
    weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    print("Min Capacity:", ship_within_days(weights, 5)) # 15`,
    },
  },
  {
    id: 'd3-note-3',
    title: "Subarray Mastery: Kadane's Algorithm & Prefix Sum with Hash Map",
    conceptSummary:
      'Subarrays are contiguous sequences of array elements. Two quintessential placement problem types:\n' +
      "1. Maximum Subarray Sum (Kadane's Algorithm):\n" +
      '   Maintain current_sum = max(nums[i], current_sum + nums[i]) and max_so_far. Solves in O(N) time and O(1) space.\n' +
      '2. Subarray Sum Equals K (Negative & Positive values):\n' +
      '   If cumulative prefix sum up to index j is S_j, any prior prefix sum S_i satisfying S_j - S_i = K implies subarray nums[i+1...j] sums to K.\n' +
      '   Therefore, store frequencies of prefix sums in a Hash Map. Check if (current_prefix_sum - K) exists in O(1) average time.\n' +
      '   Base case: Put {0: 1} initially to handle subarrays starting at index 0.',
    timeSpaceNote: "Kadane: O(N) Time, O(1) Space. Subarray Sum Equals K: O(N) Time, O(N) Space via Hash Map.",
    kapilMentorTip:
      'Watch out! Kadane fails if you initialize max_so_far = 0 when the array contains all negative numbers like [-5, -2, -8]. Always initialize max_so_far = nums[0] or INT_MIN!',
    codeByLanguage: {
      c: `// C: Kadane's Algorithm for Maximum Subarray Sum
#include <stdio.h>
#include <limits.h>

int maxSubArray(int nums[], int n) {
    int maxSoFar = nums[0];
    int currentSum = nums[0];

    for (int i = 1; i < n; i++) {
        currentSum = (nums[i] > currentSum + nums[i]) ? nums[i] : (currentSum + nums[i]);
        if (currentSum > maxSoFar) {
            maxSoFar = currentSum;
        }
    }
    return maxSoFar;
}

int main() {
    int arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    printf("Max Subarray Sum: %d\\n", maxSubArray(arr, 9)); // 6 (subarray [4, -1, 2, 1])
    return 0;
}`,
      cpp: `// C++: Subarray Sum Equals K using Prefix Sum + unordered_map
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int subarraySum(const vector<int>& nums, int k) {
    unordered_map<int, int> prefixFreq;
    prefixFreq[0] = 1; // Base case: prefix sum of 0 appears once
    int currentSum = 0, count = 0;

    for (int x : nums) {
        currentSum += x;
        int needed = currentSum - k;
        if (prefixFreq.count(needed)) {
            count += prefixFreq[needed];
        }
        prefixFreq[currentSum]++;
    }
    return count;
}

int main() {
    vector<int> nums = {1, 2, 3, -2, 1, 4};
    int k = 3;
    cout << "Count of subarrays summing to " << k << ": " << subarraySum(nums, k) << endl;
    return 0;
}`,
      java: `// Java: Subarray Sum Equals K
import java.util.*;

public class Main {
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        int currentSum = 0, count = 0;

        for (int x : nums) {
            currentSum += x;
            if (map.containsKey(currentSum - k)) {
                count += map.get(currentSum - k);
            }
            map.put(currentSum, map.getOrDefault(currentSum, 0) + 1);
        }
        return count;
    }

    public static void main(String[] args) {
        int[] nums = {1, 1, 1};
        System.out.println("Subarrays summing to 2: " + subarraySum(nums, 2)); // 2
    }
}`,
      python: `# Python: Subarray Sum Equals K
from typing import List

def subarray_sum(nums: List[int], k: int) -> int:
    prefix_map = {0: 1}
    current_sum = 0
    count = 0

    for x in nums:
        current_sum += x
        count += prefix_map.get(current_sum - k, 0)
        prefix_map[current_sum] = prefix_map.get(current_sum, 0) + 1

    return count

if __name__ == "__main__":
    print("Count:", subarray_sum([1, 2, 3, -2, 1, 4], 3))`,
    },
  },
  {
    id: 'd3-note-4',
    title: 'Two-Pointer Squeezing & Trapping Rain Water',
    conceptSummary:
      'The Two-Pointer technique squeezes from opposite boundaries [left, right] towards the center. Ideal for sorted arrays (3Sum, Two Sum II) and container volume problems (Container With Most Water, Trapping Rain Water).\n' +
      '• Trapping Rain Water Mental Model:\n' +
      '  Water trapped above index i is determined by: min(max_left, max_right) - height[i].\n' +
      '  Instead of precomputing prefix/suffix max arrays in O(N) space, maintain leftMax and rightMax pointers.\n' +
      '  If height[left] <= height[right], water trapped at left depends strictly on leftMax. Advance left++.\n' +
      '  Else water trapped at right depends strictly on rightMax. Advance right--.\n' +
      '  Achieves O(N) time with O(1) auxiliary memory!',
    timeSpaceNote: 'Time Complexity: O(N) single pass. Auxiliary Space: O(1) optimal two pointers.',
    kapilMentorTip:
      'During interview presentations for Trapping Rain Water, always mention the progression: "Brute force O(N^2) -> Precomputed Prefix/Suffix Arrays O(N) space -> Two Pointers O(1) optimal space." Interviewers love hearing algorithmic progression!',
    codeByLanguage: {
      c: `// C: Trapping Rain Water in O(N) Time and O(1) Space
#include <stdio.h>

int trapRainWater(int height[], int n) {
    if (n <= 2) return 0;
    int left = 0, right = n - 1;
    int leftMax = 0, rightMax = 0;
    int waterTrapped = 0;

    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                waterTrapped += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                waterTrapped += rightMax - height[right];
            }
            right--;
        }
    }
    return waterTrapped;
}

int main() {
    int elevation[] = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    printf("Trapped Water: %d units\\n", trapRainWater(elevation, 12)); // 6
    return 0;
}`,
      cpp: `// C++: Trapping Rain Water (O(N) Time, O(1) Space)
#include <iostream>
#include <vector>
using namespace std;

int trap(const vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, totalWater = 0;

    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else totalWater += (leftMax - height[left]);
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else totalWater += (rightMax - height[right]);
            right--;
        }
    }
    return totalWater;
}

int main() {
    vector<int> h = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    cout << "Trapped Water: " << trap(h) << endl; // 6
    return 0;
}`,
      java: `// Java: Trapping Rain Water
public class Main {
    public static int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, totalWater = 0;

        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else totalWater += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else totalWater += rightMax - height[right];
                right--;
            }
        }
        return totalWater;
    }

    public static void main(String[] args) {
        int[] h = {4, 2, 0, 3, 2, 5};
        System.out.println("Trapped Water: " + trap(h)); // 9
    }
}`,
      python: `# Python: Trapping Rain Water
from typing import List

def trap(height: List[int]) -> int:
    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    total_water = 0

    while left < right:
        if height[left] <= height[right]:
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
    print("Trapped Water:", trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])) # 6`,
    },
  },
  {
    id: 'd3-note-5',
    title: 'Monotonic Stack for Next Greater Element & Histogram Area',
    conceptSummary:
      'A Monotonic Stack maintains elements in strictly increasing or decreasing order. Whenever an incoming element violates the monotonic order, elements are popped from the stack.\n' +
      '• Next Greater Element (NGE):\n' +
      '  Traverse the array from right to left. Maintain a decreasing stack of elements.\n' +
      '  While stack is not empty and stack.top() <= current, pop from stack.\n' +
      '  If stack is empty, NGE is -1; else NGE is stack.top().\n' +
      '  Push current element onto stack.\n' +
      '• Even though there is a while loop inside the for loop, every element is pushed at most once and popped at most once. Amortized runtime is strictly O(N)!',
    timeSpaceNote: 'Time Complexity: O(N) amortized. Auxiliary Space: O(N) for the stack.',
    kapilMentorTip:
      'Recognizing Monotonic Stack: Any problem that asks "Find the nearest element greater/smaller than element X on its left or right" is a dead giveaway for a Monotonic Stack!',
    codeByLanguage: {
      c: `// C: Next Greater Element using Monotonic Stack
#include <stdio.h>

void nextGreaterElement(int arr[], int n, int result[]) {
    int stack[100000];
    int top = -1;

    for (int i = n - 1; i >= 0; i--) {
        while (top >= 0 && stack[top] <= arr[i]) {
            top--; // Pop smaller elements
        }
        result[i] = (top == -1) ? -1 : stack[top];
        stack[++top] = arr[i]; // Push current element
    }
}

int main() {
    int arr[] = {4, 5, 2, 25, 7, 8};
    int n = 6;
    int result[6];
    nextGreaterElement(arr, n, result);

    for (int i = 0; i < n; i++) printf("%d -> %d\\n", arr[i], result[i]);
    // 4 -> 5, 5 -> 25, 2 -> 25, 25 -> -1, 7 -> 8, 8 -> -1
    return 0;
}`,
      cpp: `// C++: Next Greater Element using std::stack
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreaterElements(const vector<int>& nums) {
    int n = nums.size();
    vector<int> nge(n, -1);
    stack<int> st;

    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= nums[i]) {
            st.pop();
        }
        if (!st.empty()) nge[i] = st.top();
        st.push(nums[i]);
    }
    return nge;
}

int main() {
    vector<int> nums = {4, 5, 2, 25};
    vector<int> res = nextGreaterElements(nums);
    for (int x : res) cout << x << " ";
    cout << "\\n"; // 5 25 25 -1
    return 0;
}`,
      java: `// Java: Next Greater Element using ArrayDeque
import java.util.*;

public class Main {
    public static int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] nge = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= nums[i]) {
                stack.pop();
            }
            nge[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(nums[i]);
        }
        return nge;
    }

    public static void main(String[] args) {
        int[] nums = {4, 5, 2, 25};
        System.out.println(Arrays.toString(nextGreaterElements(nums)));
    }
}`,
      python: `# Python: Next Greater Element using List as Stack
from typing import List

def next_greater_elements(nums: List[int]) -> List[int]:
    n = len(nums)
    nge = [-1] * n
    stack = []

    for i in range(n - 1, -1, -1):
        while stack and stack[-1] <= nums[i]:
            stack.pop()
        if stack:
            nge[i] = stack[-1]
        stack.append(nums[i])
    return nge

if __name__ == "__main__":
    print(next_greater_elements([4, 5, 2, 25])) # [5, 25, 25, -1]`,
    },
  },
  {
    id: 'd3-note-6',
    title: 'Greedy Interval Scheduling & Meeting Rooms',
    conceptSummary:
      'Interval problems (Non-overlapping Intervals, Merge Intervals, Meeting Rooms II) require sorting before applying greedy choices:\n' +
      '• To maximize non-overlapping intervals (Activity Selection): Sort by END TIME ascending. Always pick the interval that finishes earliest so that maximum room remains for subsequent events.\n' +
      '• To count minimum meeting rooms required: Sort start times and end times independently, or use a Min-Heap of end times. If the new meeting starts after the earliest active meeting ends, reuse the room (heap pop). Otherwise, allocate a new room.\n' +
      '• In-place sorting runs in O(N log N) time.',
    timeSpaceNote: 'Time Complexity: O(N log N) dominated by sorting. Auxiliary Space: O(1) in-place or O(N) for heaps.',
    kapilMentorTip:
      'Remember the distinction: To find minimum removals to make intervals non-overlapping, sort by END time. To merge overlapping intervals, sort by START time!',
    codeByLanguage: {
      c: `// C: Activity Selection / Max Non-overlapping Intervals
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int start;
    int end;
} Interval;

int compare(const void* a, const void* b) {
    Interval* ia = (Interval*)a;
    Interval* ib = (Interval*)b;
    return ia->end - ib->end; // Sort by end time
}

int eraseOverlapIntervals(Interval intervals[], int n) {
    if (n <= 1) return 0;
    qsort(intervals, n, sizeof(Interval), compare);

    int countNonOverlap = 1;
    int lastEnd = intervals[0].end;

    for (int i = 1; i < n; i++) {
        if (intervals[i].start >= lastEnd) {
            countNonOverlap++;
            lastEnd = intervals[i].end;
        }
    }
    return n - countNonOverlap; // Minimum removals
}

int main() {
    Interval intervals[] = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};
    printf("Min intervals to remove: %d\\n", eraseOverlapIntervals(intervals, 4)); // 1
    return 0;
}`,
      cpp: `// C++: Non-overlapping Intervals (LeetCode 435)
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    if (intervals.empty()) return 0;
    // Sort by end time
    sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) {
        return a[1] < b[1];
    });

    int countNonOverlap = 1;
    int lastEnd = intervals[0][1];

    for (size_t i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] >= lastEnd) {
            countNonOverlap++;
            lastEnd = intervals[i][1];
        }
    }
    return intervals.size() - countNonOverlap;
}

int main() {
    vector<vector<int>> intervals = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};
    cout << "Min removals: " << eraseOverlapIntervals(intervals) << endl; // 1
    return 0;
}`,
      java: `// Java: Non-overlapping Intervals
import java.util.*;

public class Main {
    public static int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

        int nonOverlap = 1;
        int lastEnd = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] >= lastEnd) {
                nonOverlap++;
                lastEnd = intervals[i][1];
            }
        }
        return intervals.length - nonOverlap;
    }

    public static void main(String[] args) {
        int[][] intervals = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};
        System.out.println("Min removals: " + eraseOverlapIntervals(intervals)); // 1
    }
}`,
      python: `# Python: Non-overlapping Intervals
from typing import List

def erase_overlap_intervals(intervals: List[List[int]]) -> int:
    if not intervals: return 0
    intervals.sort(key=lambda x: x[1]) # Sort by end time

    non_overlap = 1
    last_end = intervals[0][1]

    for start, end in intervals[1:]:
        if start >= last_end:
            non_overlap += 1
            last_end = end
            
    return len(intervals) - non_overlap

if __name__ == "__main__":
    print("Min removals:", erase_overlap_intervals([[1,2],[2,3],[3,4],[1,3]])) # 1`,
    },
  },
  {
    id: 'd3-note-7',
    title: 'Bit Manipulation Hacks for Speed & Space Optimization',
    conceptSummary:
      'Bitwise operations execute in a single CPU clock cycle and are beloved by company placement coding evaluators:\n' +
      '1. XOR properties: x ^ x = 0 and x ^ 0 = x. Order does not matter. If every number appears twice except one, XORing all elements yields the unique number in O(N) time and O(1) space!\n' +
      "2. Brian Kernighan's Algorithm: n = n & (n - 1) clears the lowest set bit. The number of iterations equals the exact number of set bits (popcount) in O(set bits) time.\n" +
      '3. Power of Two Check: (n > 0) && ((n & (n - 1)) == 0).\n' +
      '4. Generate all 2^N subsets: Use an integer mask from 0 to (1 << N) - 1. If (mask & (1 << i)) != 0, include nums[i].',
    timeSpaceNote: 'Time Complexity: O(1) or O(set bits). Auxiliary Space: O(1).',
    kapilMentorTip:
      'Never write `1 << 35` using standard 32-bit int in C/C++/Java, as it leads to undefined behavior or signed overflow! Always use `1ULL << 35` in C++ or `1L << 35` in Java.',
    codeByLanguage: {
      c: `// C: Bitwise Tricks
#include <stdio.h>

// Brian Kernighan's bit count
int countSetBits(int n) {
    int count = 0;
    while (n > 0) {
        n = n & (n - 1); // Clears the lowest set bit
        count++;
    }
    return count;
}

// Single number among pairs
int singleNumber(int nums[], int n) {
    int res = 0;
    for (int i = 0; i < n; i++) res ^= nums[i];
    return res;
}

int main() {
    printf("Set bits in 29 (11101): %d\\n", countSetBits(29)); // 4
    int arr[] = {4, 1, 2, 1, 2};
    printf("Single number: %d\\n", singleNumber(arr, 5)); // 4
    return 0;
}`,
      cpp: `// C++: Bitwise Subsets Generation
#include <iostream>
#include <vector>
using namespace std;

void generateSubsets(const vector<int>& nums) {
    int n = nums.size();
    int total = 1 << n; // 2^n subsets

    for (int mask = 0; mask < total; mask++) {
        cout << "{ ";
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) cout << nums[i] << " ";
        }
        cout << "}\\n";
    }
}

int main() {
    vector<int> nums = {1, 2, 3};
    generateSubsets(nums);
    return 0;
}`,
      java: `// Java: Bitwise Tricks
public class Main {
    public static int singleNumber(int[] nums) {
        int xor = 0;
        for (int x : nums) xor ^= x;
        return xor;
    }

    public static boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }

    public static void main(String[] args) {
        int[] nums = {7, 3, 5, 3, 7};
        System.out.println("Unique element: " + singleNumber(nums)); // 5
        System.out.println("Is 16 power of 2? " + isPowerOfTwo(16)); // true
    }
}`,
      python: `# Python: Bitwise Tricks
def single_number(nums):
    res = 0
    for x in nums:
        res ^= x
    return res

def count_set_bits(n: int) -> int:
    count = 0
    while n:
        n &= (n - 1)
        count += 1
    return count

if __name__ == "__main__":
    print("Unique element:", single_number([4, 1, 2, 1, 2])) # 4
    print("Set bits in 29:", count_set_bits(29)) # 4`,
    },
  },
  {
    id: 'd3-note-8',
    title: 'Defensive Coding & Edge-Case Checklist for Online Assessments',
    conceptSummary:
      'The difference between qualifying and getting rejected in company coding tests often boils down to 2 or 3 hidden test cases. Common edge-case pitfalls:\n' +
      '1. 32-bit Integer Overflow: When summing numbers up to 10^5 elements of size 10^9, sum reaches 10^14. A 32-bit signed int overflows at 2.14 * 10^9. Always use `long long` in C/C++, `long` in Java.\n' +
      '2. Array Length Boundaries: N = 0 (empty input), N = 1 (single element), N = 2.\n' +
      '3. Duplicates & All-Equal Elements: Input where nums[i] are identical, e.g., [5, 5, 5, 5].\n' +
      '4. Extreme Negative Values: Kadane with all negative numbers, negative modular arithmetic `(a % m + m) % m`.\n' +
      '5. Floating Point Precision: Always use `double` and compare with epsilon `fabs(a - b) < 1e-9` instead of `a == b`.\n' +
      '6. Off-by-One in Binary Search: Ensure your while loop condition (`low <= high` vs `low < high`) matches whether you update `high = mid - 1` or `high = mid`.',
    timeSpaceNote: 'Defensive coding adds zero runtime overhead but guarantees 100% test-case pass rate.',
    kapilMentorTip:
      'Before clicking SUBMIT, ask yourself: 1) Can the sum exceed 2 * 10^9? 2) What happens if the array has only 1 element? 3) What if all numbers are negative? This 30-second audit will save your assessment score!',
    codeByLanguage: {
      c: `// C: Defensive Integer Overflow & Negative Modulo Handling
#include <stdio.h>

long long safeSubarraySum(int arr[], int n) {
    long long total = 0; // 64-bit integer prevents overflow
    for (int i = 0; i < n; i++) {
        total += (long long)arr[i];
    }
    return total;
}

// C/C++ negative modulo fix: (-7) % 5 is -2, but mathematical modulo is 3
int positiveMod(int a, int m) {
    return (a % m + m) % m;
}

int main() {
    int bigNums[] = {1000000000, 1000000000, 1000000000};
    printf("Safe sum: %lld\\n", safeSubarraySum(bigNums, 3)); // 3000000000
    printf("(-7) mod 5: %d\\n", positiveMod(-7, 5)); // 3
    return 0;
}`,
      cpp: `// C++: Defensive Modulo & Boundary Handling
#include <iostream>
#include <vector>
using namespace std;

// Safe positive modulo
long long safeMod(long long val, long long m) {
    return (val % m + m) % m;
}

int main() {
    long long mod = 1e9 + 7;
    long long a = -15;
    cout << "Safe mod of -15 with 10^9+7: " << safeMod(a, mod) << endl;
    return 0;
}`,
      java: `// Java: Safe Math with Long & Math.floorMod
public class Main {
    public static void main(String[] args) {
        int a = -7;
        int m = 5;
        // Java's Math.floorMod correctly handles negative dividends
        System.out.println("Math.floorMod(-7, 5): " + Math.floorMod(a, m)); // 3
        
        long sum = 0L;
        int val = 1_000_000_000;
        sum += (long) val + val + val;
        System.out.println("Safe 64-bit sum: " + sum); // 3000000000
    }
}`,
      python: `# Python: Python handles arbitrary size integers automatically!
# But beware of recursion limit!
import sys
sys.setrecursionlimit(200000) # Prevents RecursionError for deep DFS / recursion

def safe_mod(val: int, m: int) -> int:
    return val % m # Python's % operator naturally returns positive modulo!

if __name__ == "__main__":
    print("(-7) % 5 in Python:", (-7) % 5) # 3
    big = 10**18 * 10**18 # No overflow in Python!
    print("Big int length:", len(str(big)))`,
    },
  },
];
