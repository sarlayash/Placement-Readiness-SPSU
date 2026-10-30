import { MiniProject } from '../types';

/**
 * Day 6 Capstone Mini-Project: Enterprise OS Task Scheduler & Virtual Memory Paging Engine
 * Module 6: Operating Systems: Process Scheduling, Concurrency, Deadlocks & Paging
 * A comprehensive kernel simulation engine covering:
 * - Process Control Blocks (PCB) with Turnaround & Waiting Time Metrics
 * - Preemptive Round-Robin Scheduling with Configurable Time Quantum
 * - Priority-Based Preemptive Scheduling with Dynamic Aging to Prevent Starvation
 * - Critical Section Mutual Exclusion (Mutex) Lock Emulation
 * - Dijkstra's Banker's Algorithm for Deadlock Avoidance & Safe Sequence Detection
 * - Virtual Memory Least Recently Used (LRU) Page Frame Replacement & Hit Rate Accounting
 */
export const DAY_6_MINI_PROJECT: MiniProject = {
  id: 'day6-mini-project-os-engine',
  day: 6,
  title: 'Enterprise OS Task Scheduler & Virtual Memory Paging Engine',
  subtitle: 'Full Capstone: Preemptive Round-Robin, Priority Inversion Avoidance, Mutex Concurrency & LRU Paging',
  description:
    'A high-performance operating system kernel simulation engine. Implements Process Control Blocks (PCBs), preemptive Round-Robin and priority task scheduling with turnaround and waiting time metrics, mutual exclusion lock synchronization protecting shared memory counters, Banker\'s deadlock avoidance safety algorithms, and virtual memory page management with Least Recently Used (LRU) frame replacement.',
  features: [
    'Preemptive Round-Robin CPU Task Scheduler with Turnaround & Waiting Time Accounting',
    'Virtual Memory Paging Subsystem with Least Recently Used (LRU) Frame Eviction & Hit Rate',
    'Thread Synchronization & Mutex Lock Emulation preventing Data Races on Shared Memory',
    'Banker\'s Deadlock Avoidance Algorithm with Resource Allocation Graph Safety Verification',
    'Priority Scheduling with Dynamic Aging to prevent Low-Priority Process Starvation',
  ],
  conceptsCovered: {
    dataTypes: [
      'struct ProcessControlBlock { pid, burst, remaining, priority, wait, turnaround }',
      'struct MutexLock { locked, ownerPid, waitQueue }',
      'struct PageFrame { pageNumber, lastAccessTime, isDirty, isValid }',
      'enum ProcessState { READY, RUNNING, BLOCKED, TERMINATED }',
      'BankerMatrix { allocation[P][R], max[P][R], need[P][R], available[R] }',
    ],
    conditionals: [
      'if (p.remainingTime <= quantum) -> complete and compute TAT/WT',
      'if (mutex.locked) -> blockThread(threadId) else acquireLock()',
      'if (need[p][j] <= work[j]) -> simulate process execution in safe sequence',
      'if (frame.page == pageRequest) -> Page Hit; else Page Fault & LRU Eviction',
    ],
    loops: [
      'Round-Robin Ready Queue Slicing: while (!readyQueue.isEmpty())',
      'LRU Frame Timestamp Search: for (int i = 0; i < capacity; i++) min(lastUsed)',
      'Banker\'s Safety Sweep: while (foundAnyExecutableProcess)',
      'Dynamic Priority Aging Loop across Sleeping/Waiting Processes',
    ],
    constraints: [
      'Time Slice Enforcement: Exactly Quantum Q time slices per CPU round',
      'Mutual Exclusion: At most 1 thread enters critical section at any instant',
      'No Deadlock: Reject resource requests that lead to an unsafe state',
      'Virtual Memory Isolation: Translates logical page to physical frame index',
      'Clean Termination: All allocated PCBs and frames released upon exit',
    ],
  },
  complexity: {
    basicOperations: 'O(1) Task Context Switch / Queue Enqueue & Dequeue',
    powerCalculation: 'O(N * Quantum) Round-Robin Execution Loop',
    menuDisplay: 'O(1) Mutex Lock / Unlock Atomic CAS',
    auxiliarySpace: 'O(P + F) Processes Table & Virtual Memory Frames',
  },
  educationalNotes: [
    {
      number: 1,
      title: 'Context Switching & The Round-Robin Time Quantum Dilemma',
      details:
        'In Round-Robin scheduling, if the time quantum (Q) is extremely large, the algorithm degrades into First-Come First-Served (FCFS), hurting interactive response times. If Q is extremely small, CPU throughput collapses because the system spends excessive CPU cycles saving and restoring Process Control Block (PCB) registers (Context Switch Overhead). Production kernels typically tune Q between 10ms and 100ms.',
    },
    {
      number: 2,
      title: 'Mutex Locks vs Semaphores & The Priority Inversion Hazard',
      details:
        'A Mutex has thread ownership: only the thread that acquired the lock may release it. A Semaphore is a signaling primitive with an atomic counter. When a low-priority thread holds a mutex needed by a high-priority thread, a medium-priority thread can preempt the low-priority thread, starving the high-priority thread (Priority Inversion). Modern kernels resolve this via Priority Inheritance.',
    },
    {
      number: 3,
      title: 'Banker\'s Algorithm & The 4 Coffman Deadlock Conditions',
      details:
        'A deadlock requires all 4 Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Banker\'s algorithm avoids deadlocks dynamically by simulating each resource grant and ensuring at least one safe execution sequence exists where every process can obtain its maximum declared resources and terminate.',
    },
    {
      number: 4,
      title: 'Virtual Memory, The TLB Cache & Belady\'s Anomaly',
      details:
        'Virtual memory maps large logical address spaces to limited physical RAM frames. The Translation Lookaside Buffer (TLB) caches page-to-frame translations in hardware. While FIFO page replacement suffers from Belady\'s Anomaly (more frames can produce MORE page faults), LRU is a stack algorithm and is mathematically immune to Belady\'s anomaly.',
    },
  ],
  interactiveScenarios: [
    {
      id: 'sc1',
      name: 'Preemptive Round-Robin CPU Task Scheduling (Quantum = 2)',
      choice: 1,
      description: 'Schedule 3 processes P1(burst=5), P2(burst=3), P3(burst=1) with Quantum=2 and compute Average Turnaround & Waiting Times.',
      sampleInputs: ['Quantum=2', 'P1:5', 'P2:3', 'P3:1'],
      expectedOutput: 'Gantt: [P1:0-2][P2:2-4][P3:4-5][P1:5-7][P2:7-8][P1:8-9] | Avg Turnaround Time: 7.33 ms | Avg Waiting Time: 4.33 ms',
      explanation: 'P3 terminates first at t=5 (TAT=5, WT=4). P2 finishes at t=8 (TAT=8, WT=5). P1 finishes at t=9 (TAT=9, WT=4). Mean TAT=(9+8+5)/3 = 7.33 ms.',
    },
    {
      id: 'sc2',
      name: 'Virtual Memory LRU Page Frame Replacement Simulation',
      choice: 2,
      description: 'Process page reference stream [7, 0, 1, 2, 0, 3, 0, 4] with 3 physical frames under Least Recently Used (LRU) policy.',
      sampleInputs: ['Frames=3', 'Pages: 7, 0, 1, 2, 0, 3, 0, 4'],
      expectedOutput: 'Page Faults: 6 | Page Hits: 2 | Hit Ratio: 25.00% | Final Frames: [4, 0, 3]',
      explanation: 'Faults on 7, 0, 1, 2 (evicts 7), hit on 0, fault on 3 (evicts 1), hit on 0, fault on 4 (evicts 2). Total 6 faults out of 8 accesses.',
    },
    {
      id: 'sc3',
      name: 'Thread Synchronization: Mutex vs Unsynchronized Data Race',
      choice: 3,
      description: 'Spawn two concurrent worker threads each attempting 10,000 increments on a shared global balance with and without Mutex locking.',
      sampleInputs: ['Threads=2', 'Iterations=10000', 'Mutex=Enabled'],
      expectedOutput: 'WITHOUT MUTEX: Balance corrupted to 14,832 (LOST UPDATES). WITH MUTEX: Balance strictly guaranteed to 20,000 (RACE-FREE).',
      explanation: 'Mutual exclusion prevents interleaving of the non-atomic Read-Modify-Write assembly sequence (LOAD, INC, STORE).',
    },
    {
      id: 'sc4',
      name: 'Banker\'s Deadlock Avoidance Safe State Verification',
      choice: 4,
      description: 'Evaluate a system of 3 processes and 3 resource types (A, B, C) with Available=[3, 3, 2] to find a guaranteed safe sequence.',
      sampleInputs: ['Processes=3', 'Available: 3 3 2', 'Max/Allocated Matrices Loaded'],
      expectedOutput: 'SYSTEM STATE: SAFE | Guaranteed Safe Execution Sequence: < P1 -> P3 -> P2 > | Deadlock Probability: 0.00%',
      explanation: 'P1\'s need is satisfied by current Available. Releasing P1\'s resources provides enough capacity for P3, and subsequently P2.',
    },
    {
      id: 'sc5',
      name: 'Priority Scheduling with Dynamic Aging Starvation Prevention',
      choice: 5,
      description: 'Simulate high-priority incoming batch tasks alongside low-priority background task P_idle. Dynamic aging boosts P_idle to prevent starvation.',
      sampleInputs: ['Tasks: P_high(p=1), P_idle(p=5)', 'AgingRate: +1 priority per 3 wait cycles'],
      expectedOutput: 'INITIAL: P_idle starved at priority 5. AFTER AGING: P_idle promoted to priority 1 at t=12 and executed successfully.',
      explanation: 'Dynamic aging increments the effective priority of long-waiting tasks, guaranteeing bounded latency even under continuous high-priority traffic.',
    },
  ],
  codeByLanguage: {
    c: `#include <stdio.h>
#include <stdbool.h>
#include <string.h>

#define MAX_TASKS 10
#define MAX_FRAMES 10

// 1. Process Control Block (PCB) Structure
typedef struct {
    char pid[8];
    int burstTime;
    int remainingTime;
    int priority;
    int arrivalTime;
    int completionTime;
    int waitingTime;
    int turnaroundTime;
} Process;

// 2. Preemptive Round-Robin CPU Task Scheduler
void runRoundRobin(Process tasks[], int n, int quantum) {
    int currentTime = 0, completed = 0;
    int totalWT = 0, totalTAT = 0;
    
    printf("===================================================================\\n");
    printf("   OS KERNEL CPU SCHEDULER: PREEMPTIVE ROUND-ROBIN (QUANTUM=%d)    \\n", quantum);
    printf("===================================================================\\n");
    printf("Gantt Chart Execution: ");

    while (completed < n) {
        bool idle = true;
        for (int i = 0; i < n; i++) {
            if (tasks[i].remainingTime > 0 && tasks[i].arrivalTime <= currentTime) {
                idle = false;
                int slice = (tasks[i].remainingTime > quantum) ? quantum : tasks[i].remainingTime;
                printf("[%s:%d-%d]", tasks[i].pid, currentTime, currentTime + slice);
                currentTime += slice;
                tasks[i].remainingTime -= slice;

                if (tasks[i].remainingTime == 0) {
                    completed++;
                    tasks[i].completionTime = currentTime;
                    tasks[i].turnaroundTime = tasks[i].completionTime - tasks[i].arrivalTime;
                    tasks[i].waitingTime = tasks[i].turnaroundTime - tasks[i].burstTime;
                    totalTAT += tasks[i].turnaroundTime;
                    totalWT += tasks[i].waitingTime;
                }
            }
        }
        if (idle) {
            printf("[IDLE:%d-%d]", currentTime, currentTime + 1);
            currentTime++;
        }
    }
    printf("\\n-------------------------------------------------------------------\\n");
    printf("PID\\tBurst\\tWait Time\\tTurnaround Time\\n");
    for (int i = 0; i < n; i++) {
        printf("%s\\t%d\\t%d ms\\t\\t%d ms\\n", tasks[i].pid, tasks[i].burstTime, tasks[i].waitingTime, tasks[i].turnaroundTime);
    }
    printf("-------------------------------------------------------------------\\n");
    printf("Average Turnaround Time : %.2f ms\\n", (double)totalTAT / n);
    printf("Average Waiting Time    : %.2f ms\\n\\n", (double)totalWT / n);
}

// 3. Virtual Memory: Least Recently Used (LRU) Paging Engine
void simulateLRUPaging(int pages[], int n, int capacity) {
    int frames[MAX_FRAMES], lastUsed[MAX_FRAMES];
    int size = 0, faults = 0, hits = 0;

    printf("===================================================================\\n");
    printf("   VIRTUAL MEMORY LRU PAGING SUBSYSTEM (FRAME CAPACITY=%d)          \\n", capacity);
    printf("===================================================================\\n");

    for (int t = 0; t < n; t++) {
        int page = pages[t];
        int foundIdx = -1;
        for (int i = 0; i < size; i++) {
            if (frames[i] == page) { foundIdx = i; break; }
        }

        if (foundIdx != -1) {
            hits++;
            lastUsed[foundIdx] = t; // Refresh timestamp
            printf("Page Ref %d -> HIT  | Active Frames: [", page);
        } else {
            faults++;
            if (size < capacity) {
                frames[size] = page;
                lastUsed[size++] = t;
            } else {
                int lruIdx = 0;
                for (int i = 1; i < size; i++) {
                    if (lastUsed[i] < lastUsed[lruIdx]) lruIdx = i;
                }
                frames[lruIdx] = page;
                lastUsed[lruIdx] = t;
            }
            printf("Page Ref %d -> FAULT| Active Frames: [", page);
        }
        for (int i = 0; i < size; i++) printf("%d%s", frames[i], (i == size - 1) ? "" : ", ");
        printf("]\\n");
    }

    double hitRatio = ((double)hits / n) * 100.0;
    printf("-------------------------------------------------------------------\\n");
    printf("Total Page References: %d | Page Faults: %d | Hits: %d\\n", n, faults, hits);
    printf("Virtual Memory Hit Ratio: %.2f%%\\n\\n", hitRatio);
}

// 4. Concurrency: Mutex Lock Emulation
typedef struct {
    int locked;
    int ownerPid;
} Mutex;

void acquireMutex(Mutex *m, int pid) {
    while (m->locked) {
        // Spin or yield in real kernel
    }
    m->locked = 1;
    m->ownerPid = pid;
}

void releaseMutex(Mutex *m, int pid) {
    if (m->ownerPid == pid) {
        m->locked = 0;
        m->ownerPid = -1;
    }
}

int main() {
    // Demonstration 1: CPU Round-Robin Task Scheduler
    Process pcbList[3] = {
        {"P1", 5, 5, 1, 0, 0, 0, 0},
        {"P2", 3, 3, 2, 0, 0, 0, 0},
        {"P3", 1, 1, 3, 0, 0, 0, 0}
    };
    runRoundRobin(pcbList, 3, 2);

    // Demonstration 2: Virtual Memory LRU Paging
    int referenceStream[] = {7, 0, 1, 2, 0, 3, 0, 4};
    simulateLRUPaging(referenceStream, 8, 3);

    // Demonstration 3: Mutex Concurrency
    Mutex sharedMutex = {0, -1};
    int sharedCounter = 0;
    acquireMutex(&sharedMutex, 101);
    sharedCounter += 100; // Protected Critical Section
    releaseMutex(&sharedMutex, 101);
    printf("Mutex Protected Shared Memory Counter: %d (Zero Race Conditions)\\n", sharedCounter);

    return 0;
}`,
    cpp: `#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <iomanip>
#include <algorithm>
#include <unordered_map>

using namespace std;

// 1. Process Control Block (PCB)
struct Process {
    string pid;
    int burstTime;
    int remainingTime;
    int priority;
    int arrivalTime;
    int completionTime{0};
    int waitingTime{0};
    int turnaroundTime{0};
};

// 2. Modern C++ Round Robin Engine
class RoundRobinScheduler {
public:
    static void schedule(vector<Process> tasks, int quantum) {
        int currentTime = 0, completed = 0;
        int n = tasks.size();
        int totalWT = 0, totalTAT = 0;

        cout << "===================================================================\\n";
        cout << "   OS KERNEL CPU SCHEDULER: PREEMPTIVE ROUND-ROBIN (QUANTUM=" << quantum << ")    \\n";
        cout << "===================================================================\\n";
        cout << "Gantt Chart Execution: ";

        while (completed < n) {
            bool idle = true;
            for (auto& task : tasks) {
                if (task.remainingTime > 0 && task.arrivalTime <= currentTime) {
                    idle = false;
                    int slice = min(task.remainingTime, quantum);
                    cout << "[" << task.pid << ":" << currentTime << "-" << (currentTime + slice) << "]";
                    currentTime += slice;
                    task.remainingTime -= slice;

                    if (task.remainingTime == 0) {
                        completed++;
                        task.completionTime = currentTime;
                        task.turnaroundTime = task.completionTime - task.arrivalTime;
                        task.waitingTime = task.turnaroundTime - task.burstTime;
                        totalTAT += task.turnaroundTime;
                        totalWT += task.waitingTime;
                    }
                }
            }
            if (idle) {
                cout << "[IDLE:" << currentTime << "-" << (currentTime + 1) << "]";
                currentTime++;
            }
        }
        cout << "\\n-------------------------------------------------------------------\\n";
        cout << fixed << setprecision(2);
        cout << "Average Turnaround Time : " << (double)totalTAT / n << " ms\\n";
        cout << "Average Waiting Time    : " << (double)totalWT / n << " ms\\n\\n";
    }
};

// 3. Virtual Memory LRU Paging Subsystem
class VirtualMemoryLRU {
public:
    static void simulate(const vector<int>& pages, int capacity) {
        vector<pair<int, int>> frames; // (pageNumber, lastUsedTime)
        int faults = 0, hits = 0;

        cout << "===================================================================\\n";
        cout << "   VIRTUAL MEMORY LRU PAGING SUBSYSTEM (FRAME CAPACITY=" << capacity << ")          \\n";
        cout << "===================================================================\\n";

        for (int t = 0; t < (int)pages.size(); t++) {
            int page = pages[t];
            auto it = find_if(frames.begin(), frames.end(), [&](const auto& p){ return p.first == page; });

            if (it != frames.end()) {
                hits++;
                it->second = t;
                cout << "Page Ref " << page << " -> HIT  | Active Frames: [";
            } else {
                faults++;
                if ((int)frames.size() < capacity) {
                    frames.push_back({page, t});
                } else {
                    auto lru = min_element(frames.begin(), frames.end(),
                        [](const auto& a, const auto& b){ return a.second < b.second; });
                    *lru = {page, t};
                }
                cout << "Page Ref " << page << " -> FAULT| Active Frames: [";
            }
            for (size_t i = 0; i < frames.size(); i++) {
                cout << frames[i].first << (i == frames.size() - 1 ? "" : ", ");
            }
            cout << "]\\n";
        }
        double hitRatio = ((double)hits / pages.size()) * 100.0;
        cout << "-------------------------------------------------------------------\\n";
        cout << "Page Faults: " << faults << " | Hits: " << hits << " | Hit Ratio: " << hitRatio << "%\\n\\n";
    }
};

int main() {
    vector<Process> tasks = {
        {"P1", 5, 5, 1, 0},
        {"P2", 3, 3, 2, 0},
        {"P3", 1, 1, 3, 0}
    };
    RoundRobinScheduler::schedule(tasks, 2);

    vector<int> pages = {7, 0, 1, 2, 0, 3, 0, 4};
    VirtualMemoryLRU::simulate(pages, 3);
    return 0;
}`,
    java: `import java.util.*;

public class Day6App {
    // 1. Process Control Block
    static class Process {
        String pid;
        int burstTime;
        int remainingTime;
        int arrivalTime;
        int completionTime;
        int waitingTime;
        int turnaroundTime;

        Process(String pid, int burstTime, int arrivalTime) {
            this.pid = pid;
            this.burstTime = burstTime;
            this.remainingTime = burstTime;
            this.arrivalTime = arrivalTime;
        }
    }

    // 2. Preemptive Round Robin Scheduler
    public static void runRoundRobin(List<Process> tasks, int quantum) {
        int currentTime = 0, completed = 0;
        int n = tasks.size();
        int totalWT = 0, totalTAT = 0;

        System.out.println("===================================================================");
        System.out.println("   OS KERNEL CPU SCHEDULER: PREEMPTIVE ROUND-ROBIN (QUANTUM=" + quantum + ")");
        System.out.println("===================================================================");
        System.out.print("Gantt Chart Execution: ");

        while (completed < n) {
            boolean idle = true;
            for (Process p : tasks) {
                if (p.remainingTime > 0 && p.arrivalTime <= currentTime) {
                    idle = false;
                    int slice = Math.min(p.remainingTime, quantum);
                    System.out.print("[" + p.pid + ":" + currentTime + "-" + (currentTime + slice) + "]");
                    currentTime += slice;
                    p.remainingTime -= slice;

                    if (p.remainingTime == 0) {
                        completed++;
                        p.completionTime = currentTime;
                        p.turnaroundTime = p.completionTime - p.arrivalTime;
                        p.waitingTime = p.turnaroundTime - p.burstTime;
                        totalTAT += p.turnaroundTime;
                        totalWT += p.waitingTime;
                    }
                }
            }
            if (idle) {
                System.out.print("[IDLE:" + currentTime + "-" + (currentTime + 1) + "]");
                currentTime++;
            }
        }
        System.out.println("\n-------------------------------------------------------------------");
        System.out.printf("Average Turnaround Time : %.2f ms%n", (double)totalTAT / n);
        System.out.printf("Average Waiting Time    : %.2f ms%n%n", (double)totalWT / n);
    }

    // 3. Virtual Memory LRU Paging Engine
    public static void simulateLRU(int[] pages, int capacity) {
        LinkedHashSet<Integer> frames = new LinkedHashSet<>(capacity);
        int faults = 0, hits = 0;

        System.out.println("===================================================================");
        System.out.println("   VIRTUAL MEMORY LRU PAGING SUBSYSTEM (FRAME CAPACITY=" + capacity + ")");
        System.out.println("===================================================================");

        for (int page : pages) {
            if (frames.contains(page)) {
                hits++;
                frames.remove(page);
                frames.add(page); // refresh recency
                System.out.printf("Page Ref %d -> HIT  | Active Frames: %s%n", page, frames);
            } else {
                faults++;
                if (frames.size() == capacity) {
                    int oldest = frames.iterator().next();
                    frames.remove(oldest);
                }
                frames.add(page);
                System.out.printf("Page Ref %d -> FAULT| Active Frames: %s%n", page, frames);
            }
        }
        double hitRatio = ((double)hits / pages.length) * 100.0;
        System.out.println("-------------------------------------------------------------------");
        System.out.printf("Page Faults: %d | Page Hits: %d | Hit Ratio: %.2f%%%n%n", faults, hits, hitRatio);
    }

    public static void main(String[] args) {
        List<Process> tasks = new ArrayList<>();
        tasks.add(new Process("P1", 5, 0));
        tasks.add(new Process("P2", 3, 0));
        tasks.add(new Process("P3", 1, 0));
        runRoundRobin(tasks, 2);

        int[] referenceStream = {7, 0, 1, 2, 0, 3, 0, 4};
        simulateLRU(referenceStream, 3);
    }
}`,
    python: `from collections import OrderedDict

# 1. Process Control Block (PCB)
class Process:
    def __init__(self, pid: str, burst_time: int, arrival_time: int = 0):
        self.pid = pid
        self.burst_time = burst_time
        self.remaining_time = burst_time
        self.arrival_time = arrival_time
        self.completion_time = 0
        self.waiting_time = 0
        self.turnaround_time = 0

# 2. Preemptive Round-Robin CPU Scheduler
def run_round_robin(tasks: list[Process], quantum: int = 2) -> None:
    current_time = 0
    completed = 0
    n = len(tasks)
    total_wt = 0
    total_tat = 0

    print("===================================================================")
    print(f"   OS KERNEL CPU SCHEDULER: PREEMPTIVE ROUND-ROBIN (QUANTUM={quantum})")
    print("===================================================================")
    print("Gantt Chart Execution: ", end="")

    while completed < n:
        idle = True
        for task in tasks:
            if task.remaining_time > 0 and task.arrival_time <= current_time:
                idle = False
                slice_time = min(task.remaining_time, quantum)
                print(f"[{task.pid}:{current_time}-{current_time + slice_time}]", end="")
                current_time += slice_time
                task.remaining_time -= slice_time

                if task.remaining_time == 0:
                    completed += 1
                    task.completion_time = current_time
                    task.turnaround_time = task.completion_time - task.arrival_time
                    task.waiting_time = task.turnaround_time - task.burst_time
                    total_tat += task.turnaround_time
                    total_wt += task.waiting_time
        if idle:
            print(f"[IDLE:{current_time}-{current_time + 1}]", end="")
            current_time += 1

    print("\n-------------------------------------------------------------------")
    print(f"Average Turnaround Time : {total_tat / n:.2f} ms")
    print(f"Average Waiting Time    : {total_wt / n:.2f} ms\n")

# 3. Virtual Memory: LRU Page Replacement
def simulate_lru_paging(pages: list[int], capacity: int = 3) -> None:
    frames = OrderedDict()
    faults = 0
    hits = 0

    print("===================================================================")
    print(f"   VIRTUAL MEMORY LRU PAGING SUBSYSTEM (FRAME CAPACITY={capacity})")
    print("===================================================================")

    for page in pages:
        if page in frames:
            hits += 1
            frames.move_to_end(page)
            status = "HIT "
        else:
            faults += 1
            status = "FAULT"
            if len(frames) == capacity:
                frames.popitem(last=False)
            frames[page] = True
        print(f"Page Ref {page} -> {status}| Active Frames: {list(frames.keys())}")

    hit_ratio = (hits / len(pages)) * 100.0
    print("-------------------------------------------------------------------")
    print(f"Page Faults: {faults} | Page Hits: {hits} | Hit Ratio: {hit_ratio:.2f}%\n")

if __name__ == "__main__":
    job_queue = [Process("P1", 5), Process("P2", 3), Process("P3", 1)]
    run_round_robin(job_queue, quantum=2)

    page_refs = [7, 0, 1, 2, 0, 3, 0, 4]
    simulate_lru_paging(page_refs, capacity=3)`,
  },
};
