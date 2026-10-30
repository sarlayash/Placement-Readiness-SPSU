import { ProgrammingNote } from '../types';

/**
 * Day 6 Comprehensive Programming Notes & Solved Examples
 * Module 6: Operating Systems: Scheduling, Concurrency, Deadlocks & Paging
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 * Covers:
 * - Note 1: Processes vs Threads, PCB, Context Switching & Address Space Memory Layout
 * - Note 2: CPU Scheduling Algorithms: FCFS, SJF, SRTF, Round-Robin, Priority & MLFQ
 * - Note 3: Concurrency, Critical Section Problem, Peterson's Solution, Mutex vs Semaphores
 * - Note 4: Deadlocks: 4 Coffman Conditions, RAG Cycles, Banker's Safe State Algorithm
 * - Note 5: Virtual Memory, Paging, TLB Cache, Page Faults, Belady's Anomaly & LRU Replacement
 */
export const DAY_6_PROGRAMMING_NOTES: ProgrammingNote[] = [
  {
    id: 'd6-note-1',
    title: 'Process vs Thread Internals, PCB, Context Switching & Memory Layout',
    conceptSummary:
      'An Operating System Process is an executing instance of a program with private memory isolation. A Thread is the smallest unit of CPU execution within a process.\n\n1. Memory Segments of a Process:\n   - Text (Code): Compiled read-only machine instructions.\n   - Data & BSS: Initialized global/static variables (Data) and uninitialized/zero-filled globals (BSS).\n   - Heap: Dynamically allocated memory at runtime (malloc/new) growing upwards toward higher addresses.\n   - Stack: Local variables, function parameters, and return addresses growing downwards toward lower addresses.\n\n2. Process Control Block (PCB / Linux task_struct):\n   - Maintains PID, CPU registers (Program Counter, Stack Pointer, accumulator), CPU scheduling state (RUNNING, READY, WAITING), memory management info (page tables), and open file descriptor tables.\n\n3. Threads vs Processes:\n   - Threads of the SAME process share Text, Data, BSS, Heap, and File Descriptors.\n   - Each thread retains its own private Program Counter, Register set, and Thread Call Stack.\n   - Context switching between threads in the same process is significantly faster than between processes because page tables and TLB caches do not need to be flushed.',
    timeSpaceNote:
      'Thread Context Switch: ~1-2 microseconds | Process Context Switch: ~5-15 microseconds (TLB invalidation + page directory reload) | Space: O(1) PCB overhead per process.',
    kapilMentorTip:
      'Top placement interview question: "What actually happens during a CPU Context Switch?" The OS kernel saves the executing process\'s CPU registers into its PCB in kernel memory, updates its state to READY, selects the next process via the CPU scheduler, loads the new process\'s registers from its PCB into hardware CPU registers, switches the CR3 register (Page Directory Base Register), and resumes execution at the new Program Counter.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>

// PCB Simulation in C
typedef enum { READY, RUNNING, BLOCKED, TERMINATED } ProcessState;

typedef struct {
    int pid;
    ProcessState state;
    int programCounter;
    int registers[4]; // R0, R1, R2, R3
    int priority;
} ProcessControlBlock;

void contextSwitch(ProcessControlBlock *oldProc, ProcessControlBlock *newProc) {
    printf("[KERNEL CONTEXT SWITCH] Saving PID %d registers -> PCB\\n", oldProc->pid);
    oldProc->state = READY;
    
    printf("[KERNEL CONTEXT SWITCH] Restoring PID %d registers from PCB into CPU\\n", newProc->pid);
    newProc->state = RUNNING;
}

int main() {
    ProcessControlBlock p1 = {101, RUNNING, 0x00401000, {10, 20, 0, 0}, 1};
    ProcessControlBlock p2 = {102, READY,   0x00402000, {5,  15, 0, 0}, 2};
    contextSwitch(&p1, &p2);
    printf("Active Process: PID %d is now RUNNING\\n", p2.pid);
    return 0;
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

enum class TaskState { Ready, Running, Blocked, Terminated };

struct PCB {
    int pid;
    string name;
    TaskState state;
    uintptr_t pc;
    int priority;
};

class KernelDispatcher {
public:
    static void switchTask(PCB& from, PCB& to) {
        cout << "[DISPATCHER] Context Switch: Evicting PID " << from.pid 
             << " (" << from.name << ") -> Loading PID " << to.pid 
             << " (" << to.name << ")\\n";
        from.state = TaskState::Ready;
        to.state = TaskState::Running;
    }
};

int main() {
    PCB chrome{2001, "ChromeRenderer", TaskState::Running, 0x7FFF00, 3};
    PCB spotify{2002, "SpotifyAudio", TaskState::Ready, 0x7FFF80, 1};
    KernelDispatcher::switchTask(chrome, spotify);
    return 0;
}`,
      java: `public class ProcessMemoryLayout {
    // Shared Heap State
    static class SharedHeap {
        int activeSessions = 0;
    }

    // Thread-Private Execution Context
    static class WorkerThread extends Thread {
        private final int threadId;
        private final SharedHeap heap;

        WorkerThread(int threadId, SharedHeap heap) {
            this.threadId = threadId;
            this.heap = heap;
        }

        @Override
        public void run() {
            // Stack variable (Private to this thread)
            int localCounter = threadId * 100;
            synchronized (heap) {
                heap.activeSessions++; // Mutating shared Heap
            }
            System.out.printf("Thread %d: Stack local=%d, Shared Heap sessions=%d%n",
                threadId, localCounter, heap.activeSessions);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        SharedHeap heap = new SharedHeap();
        WorkerThread t1 = new WorkerThread(1, heap);
        WorkerThread t2 = new WorkerThread(2, heap);
        t1.start(); t2.start();
        t1.join(); t2.join();
    }
}`,
      python: `import threading
import time

# Shared memory across threads in the same Python process
shared_counter = 0
lock = threading.Lock()

def thread_worker(thread_id: int):
    global shared_counter
    # Thread-local private stack variable
    local_calc = thread_id * 50
    with lock:
        shared_counter += 1
        print(f"Thread {thread_id}: Local Stack={local_calc} | Shared Heap Counter={shared_counter}")

if __name__ == "__main__":
    t1 = threading.Thread(target=thread_worker, args=(1,))
    t2 = threading.Thread(target=thread_worker, args=(2,))
    t1.start(); t2.start()
    t1.join(); t2.join()`,
    },
  },
  {
    id: 'd6-note-2',
    title: 'CPU Scheduling Algorithms: FCFS, SJF, SRTF, Round-Robin & Priority Scheduling',
    conceptSummary:
      'The CPU Scheduler determines which process in the READY queue gains control of the CPU when the currently running process yields, blocks, or exhausts its time slice.\n\n1. Key Metrics:\n   - Turnaround Time (TAT) = Completion Time - Arrival Time\n   - Waiting Time (WT) = Turnaround Time - Burst Time\n   - Response Time = First CPU Allocation Time - Arrival Time\n\n2. Algorithmic Trade-offs:\n   - First-Come First-Served (FCFS): Non-preemptive. Suffers from the Convoy Effect (short tasks wait behind a huge CPU-bound process, blowing up average WT).\n   - Shortest Job First (SJF / SRTF): Provably optimal for minimizing average waiting time. Non-preemptive (SJF) or preemptive (Shortest Remaining Time First). Drawback: Requires future burst time prediction (exponential averaging) and can cause starvation of long jobs.\n   - Round-Robin (RR): Preemptive with time quantum q. Fair, starvation-free, excellent response time for interactive systems. Optimal q balances responsiveness vs context switch overhead.\n   - Priority Scheduling: Selects process with highest priority. Prone to Starvation / Indefinite Blocking. Solved via Aging (gradually increasing the priority of processes waiting in the ready queue).',
    timeSpaceNote:
      'FCFS/RR: O(1) enqueue/dequeue per scheduling step | Priority/SRTF: O(log N) with min-heap or O(N) array search | Space: O(N) ready queue.',
    kapilMentorTip:
      'Formula to memorize: `Turnaround Time = Completion Time - Arrival Time` and `Waiting Time = Turnaround Time - Burst Time`. Always draw the Gantt chart from left to right with exact timestamps to avoid 1-off errors during placement tests!',
    codeByLanguage: {
      c: `#include <stdio.h>

// Shortest Remaining Time First (SRTF / Preemptive SJF)
void solveSRTF(int arrival[], int burst[], int n) {
    int remaining[10], completed = 0, t = 0, minIdx = -1, minRem = 999999;
    int totalWT = 0, totalTAT = 0;
    for (int i = 0; i < n; i++) remaining[i] = burst[i];

    while (completed < n) {
        minRem = 999999; minIdx = -1;
        for (int i = 0; i < n; i++) {
            if (arrival[i] <= t && remaining[i] > 0 && remaining[i] < minRem) {
                minRem = remaining[i];
                minIdx = i;
            }
        }
        if (minIdx == -1) { t++; continue; }
        remaining[minIdx]--;
        t++;
        if (remaining[minIdx] == 0) {
            completed++;
            int tat = t - arrival[minIdx];
            int wt = tat - burst[minIdx];
            totalTAT += tat;
            totalWT += wt;
            printf("PID %d completed at t=%d | TAT=%d ms | WT=%d ms\\n", minIdx + 1, t, tat, wt);
        }
    }
    printf("Avg TAT = %.2f ms, Avg WT = %.2f ms\\n", (double)totalTAT / n, (double)totalWT / n);
}

int main() {
    int arrival[] = {0, 1, 2, 3};
    int burst[] = {8, 4, 2, 1};
    solveSRTF(arrival, burst, 4);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Job { int id, at, bt, rt, ct, wt, tat; };

void simulateSRTF(vector<Job> jobs) {
    int n = jobs.size(), completed = 0, t = 0;
    while (completed < n) {
        int best = -1;
        for (int i = 0; i < n; i++) {
            if (jobs[i].at <= t && jobs[i].rt > 0) {
                if (best == -1 || jobs[i].rt < jobs[best].rt) best = i;
            }
        }
        if (best == -1) { t++; continue; }
        jobs[best].rt--;
        t++;
        if (jobs[best].rt == 0) {
            completed++;
            jobs[best].ct = t;
            jobs[best].tat = jobs[best].ct - jobs[best].at;
            jobs[best].wt = jobs[best].tat - jobs[best].bt;
            cout << "P" << jobs[best].id << " Done: CT=" << t << " TAT=" << jobs[best].tat << " WT=" << jobs[best].wt << endl;
        }
    }
}

int main() {
    simulateSRTF({{1, 0, 8, 8, 0, 0, 0}, {2, 1, 4, 4, 0, 0, 0}, {3, 2, 2, 2, 0, 0, 0}});
    return 0;
}`,
      java: `import java.util.*;

public class CpuSchedulerSRTF {
    public static void main(String[] args) {
        int[] arrival = {0, 1, 2};
        int[] burst = {6, 2, 8};
        int[] remaining = burst.clone();
        int n = arrival.length, completed = 0, t = 0;

        while (completed < n) {
            int idx = -1, minRem = Integer.MAX_VALUE;
            for (int i = 0; i < n; i++) {
                if (arrival[i] <= t && remaining[i] > 0 && remaining[i] < minRem) {
                    minRem = remaining[i];
                    idx = i;
                }
            }
            if (idx == -1) { t++; continue; }
            remaining[idx]--;
            t++;
            if (remaining[idx] == 0) {
                completed++;
                int tat = t - arrival[idx];
                int wt = tat - burst[idx];
                System.out.printf("P%d Finished: TAT=%d, WT=%d at t=%d%n", idx + 1, tat, wt, t);
            }
        }
    }
}`,
      python: `def srtf_scheduler(arrival: list[int], burst: list[int]):
    n = len(arrival)
    rem = burst.copy()
    completed = 0
    t = 0
    print("[SRTF Scheduling]")
    while completed < n:
        candidates = [i for i in range(n) if arrival[i] <= t and rem[i] > 0]
        if not candidates:
            t += 1
            continue
        idx = min(candidates, key=lambda i: rem[i])
        rem[idx] -= 1
        t += 1
        if rem[idx] == 0:
            completed += 1
            tat = t - arrival[idx]
            wt = tat - burst[idx]
            print(f"P{idx + 1} Completed at t={t}: TAT={tat}ms, WT={wt}ms")

if __name__ == "__main__":
    srtf_scheduler([0, 1, 2], [6, 2, 8])`,
    },
  },
  {
    id: 'd6-note-3',
    title: 'Concurrency, Critical Section Problem, Mutex Locks & Semaphores',
    conceptSummary:
      'When multiple threads execute concurrently on shared memory, unexpected instruction interleaving leads to Race Conditions.\n\n1. Critical Section Requirements:\n   - Mutual Exclusion: If thread T is executing in its critical section, no other thread can be executing in its critical section.\n   - Progress: If no thread is in the critical section and some wish to enter, selection cannot be postponed indefinitely.\n   - Bounded Waiting: A bound exists on how many times other threads can enter before a thread\'s request is granted.\n\n2. Hardware Support:\n   - Atomic instructions: Test-and-Set (TAS) and Compare-and-Swap (CAS).\n\n3. Synchronization Primitives:\n   - Mutex (Mutual Exclusion Lock): Binary state (locked/unlocked) with thread ownership. Only the locking thread may unlock it.\n   - Counting Semaphore: Integer value `S`. `wait(S)` / `P(S)` decrements S and blocks if S <= 0. `signal(S)` / `V(S)` increments S and wakes up a waiting thread. Used for coordinating access to a finite pool of N resources.\n   - Classic Synchronization Problems: Producer-Consumer (Bounded Buffer), Readers-Writers, Dining Philosophers.',
    timeSpaceNote:
      'Atomic CAS / Mutex Lock: O(1) time complexity | Semaphore Queue: O(N) waiting threads blocked on OS futex.',
    kapilMentorTip:
      'Difference between Mutex and Binary Semaphore: A Mutex has strict ownership (if Thread A locks, Thread A must unlock). A Semaphore has no ownership (Thread A can wait/decrement while Thread B signals/increments, acting as an event notifier across threads).',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>

// Peterson's Algorithm for 2 processes (Software Solution for Mutual Exclusion)
bool flag[2] = {false, false};
int turn = 0;
int sharedCounter = 0;

void enterCriticalSection(int self) {
    int other = 1 - self;
    flag[self] = true;
    turn = other;
    while (flag[other] && turn == other) {
        // Busy wait
    }
}

void leaveCriticalSection(int self) {
    flag[self] = false;
}

int main() {
    // Process 0 enters
    enterCriticalSection(0);
    sharedCounter += 50; // Critical Section
    printf("Process 0 in Critical Section: sharedCounter = %d\\n", sharedCounter);
    leaveCriticalSection(0);

    // Process 1 enters
    enterCriticalSection(1);
    sharedCounter += 50; // Critical Section
    printf("Process 1 in Critical Section: sharedCounter = %d\\n", sharedCounter);
    leaveCriticalSection(1);

    return 0;
}`,
      cpp: `#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

using namespace std;

mutex mtx;
int safeCounter = 0;

void incrementTask(int iterations) {
    for (int i = 0; i < iterations; i++) {
        lock_guard<mutex> lock(mtx); // RAII Mutex Lock
        safeCounter++;
    }
}

int main() {
    thread t1(incrementTask, 5000);
    thread t2(incrementTask, 5000);
    t1.join();
    t2.join();
    cout << "Final Mutex Protected Counter: " << safeCounter << " (Expected: 10000)\\n";
    return 0;
}`,
      java: `import java.util.concurrent.Semaphore;

public class BoundedBufferSemaphore {
    private static final int CAPACITY = 3;
    private static final Semaphore mutex = new Semaphore(1);
    private static final Semaphore emptySlots = new Semaphore(CAPACITY);
    private static final Semaphore fullSlots = new Semaphore(0);

    public static void produce(int item) throws InterruptedException {
        emptySlots.acquire();
        mutex.acquire();
        System.out.println("Produced item: " + item);
        mutex.release();
        fullSlots.release();
    }

    public static void consume() throws InterruptedException {
        fullSlots.acquire();
        mutex.acquire();
        System.out.println("Consumed item from buffer");
        mutex.release();
        emptySlots.release();
    }

    public static void main(String[] args) throws InterruptedException {
        produce(101);
        produce(102);
        consume();
    }
}`,
      python: `import threading

class BoundedQueue:
    def __init__(self, capacity: int = 2):
        self.capacity = capacity
        self.buffer = []
        self.mutex = threading.Lock()
        self.empty = threading.Semaphore(capacity)
        self.full = threading.Semaphore(0)

    def produce(self, item: int):
        self.empty.acquire()
        with self.mutex:
            self.buffer.append(item)
            print(f"Produced {item} | Buffer: {self.buffer}")
        self.full.release()

    def consume(self) -> int:
        self.full.acquire()
        with self.mutex:
            item = self.buffer.pop(0)
            print(f"Consumed {item} | Buffer: {self.buffer}")
        self.empty.release()
        return item

if __name__ == "__main__":
    q = BoundedQueue(2)
    q.produce(10)
    q.produce(20)
    q.consume()`,
    },
  },
  {
    id: 'd6-note-4',
    title: 'Deadlocks: 4 Coffman Conditions, RAG Cycle Detection & Banker\'s Algorithm',
    conceptSummary:
      'A Deadlock is a state where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process in the set.\n\n1. The 4 Necessary Coffman Conditions:\n   - Mutual Exclusion: At least one non-sharable resource held.\n   - Hold and Wait: A process holds >= 1 resource and requests more currently held by others.\n   - No Preemption: Resources cannot be forcibly taken away; released only voluntarily.\n   - Circular Wait: A closed loop P0 -> P1 -> ... -> Pn -> P0 where each waits for the next.\n\n2. Deadlock Handling Strategies:\n   - Prevention: Design the system to invalidate at least one Coffman condition (e.g. enforce a global total lock acquisition ordering to break Circular Wait).\n   - Avoidance: Banker\'s Algorithm — the OS evaluates whether granting a request keeps the system in a "Safe State" where at least one sequence allows all processes to finish.\n   - Detection & Recovery: Periodically check Resource Allocation Graph for cycles; kill processes or preempt resources if detected.\n   - Ignorance (Ostrich Algorithm): Assume deadlocks rarely occur (standard Linux/Windows desktop approach for user processes).',
    timeSpaceNote:
      'Banker\'s Safety Algorithm: O(P^2 * R) where P = processes, R = resource types | Space: O(P * R) for Allocation, Max, and Need matrices.',
    kapilMentorTip:
      'In placement tests, you will often be given: Allocation matrix, Max matrix, and Available vector. Always compute `Need = Max - Allocation` first! Then find a process whose `Need <= Available`. When it terminates, `Available = Available + Allocation`. Repeat until all processes finish (Safe State) or none can proceed (Unsafe State / Deadlock).',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>

#define P 3
#define R 3

// Dijkstra's Banker's Algorithm Safe State Detector
bool checkSafeState(int alloc[P][R], int max[P][R], int avail[R]) {
    int need[P][R];
    for (int i = 0; i < P; i++) {
        for (int j = 0; j < R; j++) {
            need[i][j] = max[i][j] - alloc[i][j];
        }
    }

    bool finish[P] = {false};
    int safeSeq[P], work[R], count = 0;
    for (int j = 0; j < R; j++) work[j] = avail[j];

    while (count < P) {
        bool found = false;
        for (int p = 0; p < P; p++) {
            if (!finish[p]) {
                bool canExec = true;
                for (int j = 0; j < R; j++) {
                    if (need[p][j] > work[j]) { canExec = false; break; }
                }
                if (canExec) {
                    for (int j = 0; j < R; j++) work[j] += alloc[p][j];
                    safeSeq[count++] = p;
                    finish[p] = true;
                    found = true;
                }
            }
        }
        if (!found) {
            printf("System is in UNSAFE STATE! Deadlock possible.\\n");
            return false;
        }
    }

    printf("SAFE STATE CONFIRMED! Safe Sequence: < ");
    for (int i = 0; i < P; i++) printf("P%d ", safeSeq[i]);
    printf(">\\n");
    return true;
}

int main() {
    int alloc[P][R] = {{0, 1, 0}, {2, 0, 0}, {3, 0, 2}};
    int max[P][R]   = {{7, 5, 3}, {3, 2, 2}, {9, 0, 2}};
    int avail[R]    = {3, 3, 2};
    checkSafeState(alloc, max, avail);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

bool isBankerSafe(const vector<vector<int>>& alloc, const vector<vector<int>>& maxM, vector<int> avail) {
    int p = alloc.size(), r = avail.size();
    vector<vector<int>> need(p, vector<int>(r));
    for (int i = 0; i < p; i++)
        for (int j = 0; j < r; j++)
            need[i][j] = maxM[i][j] - alloc[i][j];

    vector<bool> finish(p, false);
    vector<int> safeSeq;
    while ((int)safeSeq.size() < p) {
        bool progressed = false;
        for (int i = 0; i < p; i++) {
            if (!finish[i]) {
                bool possible = true;
                for (int j = 0; j < r; j++) if (need[i][j] > avail[j]) possible = false;
                if (possible) {
                    for (int j = 0; j < r; j++) avail[j] += alloc[i][j];
                    finish[i] = true;
                    safeSeq.push_back(i);
                    progressed = true;
                }
            }
        }
        if (!progressed) return false;
    }
    cout << "Safe Execution Order: ";
    for (int id : safeSeq) cout << "P" << id << " ";
    cout << endl;
    return true;
}

int main() {
    isBankerSafe({{0, 1, 0}, {2, 0, 0}, {3, 0, 2}}, {{7, 5, 3}, {3, 2, 2}, {9, 0, 2}}, {3, 3, 2});
    return 0;
}`,
      java: `import java.util.*;

public class BankersAlgorithm {
    public static boolean isSafe(int[][] alloc, int[][] max, int[] avail) {
        int p = alloc.length, r = avail.length;
        int[][] need = new int[p][r];
        for (int i = 0; i < p; i++)
            for (int j = 0; j < r; j++)
                need[i][j] = max[i][j] - alloc[i][j];

        boolean[] finish = new boolean[p];
        List<Integer> seq = new ArrayList<>();
        int[] work = avail.clone();

        while (seq.size() < p) {
            boolean found = false;
            for (int i = 0; i < p; i++) {
                if (!finish[i]) {
                    boolean ok = true;
                    for (int j = 0; j < r; j++) if (need[i][j] > work[j]) ok = false;
                    if (ok) {
                        for (int j = 0; j < r; j++) work[j] += alloc[i][j];
                        finish[i] = true;
                        seq.add(i);
                        found = true;
                    }
                }
            }
            if (!found) return false;
        }
        System.out.println("Guaranteed Safe Sequence: " + seq);
        return true;
    }

    public static void main(String[] args) {
        int[][] alloc = {{0, 1, 0}, {2, 0, 0}, {3, 0, 2}};
        int[][] max = {{7, 5, 3}, {3, 2, 2}, {9, 0, 2}};
        int[] avail = {3, 3, 2};
        isSafe(alloc, max, avail);
    }
}`,
      python: `def bankers_algorithm(alloc: list[list[int]], max_mat: list[list[int]], avail: list[int]) -> bool:
    p = len(alloc)
    r = len(avail)
    need = [[max_mat[i][j] - alloc[i][j] for j in range(r)] for i in range(p)]
    work = list(avail)
    finish = [False] * p
    safe_seq = []

    while len(safe_seq) < p:
        found = False
        for i in range(p):
            if not finish[i] and all(need[i][j] <= work[j] for j in range(r)):
                for j in range(r):
                    work[j] += alloc[i][j]
                finish[i] = True
                safe_seq.append(f"P{i}")
                found = True
        if not found:
            print("System Unsafe! Deadlock impending.")
            return False

    print(f"Safe Sequence: {' -> '.join(safe_seq)}")
    return True

if __name__ == "__main__":
    bankers_algorithm([[0, 1, 0], [2, 0, 0], [3, 0, 2]], [[7, 5, 3], [3, 2, 2], [9, 0, 2]], [3, 3, 2])`,
    },
  },
  {
    id: 'd6-note-5',
    title: 'Virtual Memory, Paging, TLB Cache, Page Faults & Belady\'s Anomaly',
    conceptSummary:
      'Virtual Memory creates an illusion of a large, continuous address space by mapping virtual addresses to non-contiguous physical RAM frames or swap disk.\n\n1. Address Translation:\n   - Virtual Address = Page Number (p) + Page Offset (d).\n   - The hardware Memory Management Unit (MMU) indexes the Page Table: Physical Frame Number (f) concatenated with Offset (d).\n\n2. Translation Lookaside Buffer (TLB):\n   - High-speed associative hardware cache storing recent virtual-to-physical translations.\n   - Effective Memory Access Time (EMAT) = Hit_Ratio * (TLB_time + Mem_time) + (1 - Hit_Ratio) * (TLB_time + 2 * Mem_time).\n\n3. Page Replacement Algorithms:\n   - FIFO (First-In, First-Out): Evicts oldest loaded page. Suffers from Belady\'s Anomaly (allocating MORE physical frames can paradoxically INCREASE page faults!).\n   - Optimal (OPT / MIN): Evicts the page that will not be used for the longest future period. Minimum page faults, but impossible to implement in practice (requires future oracle knowledge).\n   - LRU (Least Recently Used): Evicts page that has not been accessed for the longest time in the past. Stack algorithm (immune to Belady\'s anomaly). Implemented in hardware via aging register or in software via Doubly Linked List + Hash Map.',
    timeSpaceNote:
      'LRU Cache (LinkedHashMap / DLL + Hash): O(1) get & put | FIFO: O(1) queue | Space: O(Capacity) frames.',
    kapilMentorTip:
      'Interview Gold: "What is Belady\'s Anomaly and which algorithms exhibit it?" Belady\'s anomaly is when increasing the number of page frames results in an increased number of page faults. FIFO exhibits Belady\'s anomaly (classic example: reference string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 has 9 faults on 3 frames but 10 faults on 4 frames!). Stack algorithms like LRU and LFU are provably immune to Belady\'s anomaly.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>

// Belady's Anomaly Demo in FIFO: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5
int countFIFOPageFaults(int pages[], int n, int capacity) {
    int frames[10], front = 0, size = 0, faults = 0;
    for (int i = 0; i < n; i++) {
        int p = pages[i];
        bool found = false;
        for (int j = 0; j < size; j++) {
            if (frames[j] == p) { found = true; break; }
        }
        if (!found) {
            faults++;
            if (size < capacity) {
                frames[size++] = p;
            } else {
                frames[front] = p;
                front = (front + 1) % capacity;
            }
        }
    }
    return faults;
}

int main() {
    int ref[] = {1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5};
    int f3 = countFIFOPageFaults(ref, 12, 3);
    int f4 = countFIFOPageFaults(ref, 12, 4);
    printf("FIFO 3 Frames Faults: %d\\n", f3); // 9
    printf("FIFO 4 Frames Faults: %d (Belady's Anomaly: MORE frames -> MORE faults!)\\n", f4); // 10
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <list>

using namespace std;

// O(1) LRU Cache via Doubly Linked List + Hash Map
class LRUCache {
    int cap;
    list<pair<int, int>> dll; // (page, value)
    unordered_map<int, list<pair<int, int>>::iterator> mp;
public:
    LRUCache(int capacity) : cap(capacity) {}

    int get(int page) {
        if (!mp.count(page)) return -1;
        dll.splice(dll.begin(), dll, mp[page]); // Move to MRU head
        return mp[page]->second;
    }

    void put(int page, int val) {
        if (mp.count(page)) {
            mp[page]->second = val;
            dll.splice(dll.begin(), dll, mp[page]);
            return;
        }
        if ((int)dll.size() == cap) {
            int evictKey = dll.back().first;
            dll.pop_back();
            mp.erase(evictKey);
        }
        dll.push_front({page, val});
        mp[page] = dll.begin();
    }
};

int main() {
    LRUCache cache(2);
    cache.put(1, 100);
    cache.put(2, 200);
    cout << "Page 1: " << cache.get(1) << endl; // 100 (Page 1 refreshed)
    cache.put(3, 300); // Page 2 evicted
    cout << "Page 2: " << cache.get(2) << " (Evicted)\\n"; // -1
    return 0;
}`,
      java: `import java.util.*;

public class LRUVirtualMemoryEngine {
    public static int simulateLRU(int[] pages, int capacity) {
        LinkedHashSet<Integer> frames = new LinkedHashSet<>(capacity);
        int faults = 0;
        for (int p : pages) {
            if (frames.contains(p)) {
                frames.remove(p);
                frames.add(p); // Refresh recency
            } else {
                faults++;
                if (frames.size() == capacity) {
                    int oldest = frames.iterator().next();
                    frames.remove(oldest);
                }
                frames.add(p);
            }
        }
        return faults;
    }

    public static void main(String[] args) {
        int[] pages = {7, 0, 1, 2, 0, 3, 0, 4};
        System.out.println("LRU Page Faults: " + simulateLRU(pages, 3)); // 6
    }
}`,
      python: `from collections import OrderedDict

def lru_page_faults(pages: list[int], capacity: int) -> int:
    frames = OrderedDict()
    faults = 0
    for p in pages:
        if p in frames:
            frames.move_to_end(p)
        else:
            faults += 1
            if len(frames) == capacity:
                frames.popitem(last=False)
            frames[p] = True
    return faults

if __name__ == "__main__":
    print(f"LRU Page Faults: {lru_page_faults([7, 0, 1, 2, 0, 3, 0, 4], 3)}")`,
    },
  },
];
