import { AssessmentQuestion } from '../types';

/**
 * Day 6 Assessments (50 Pre-Assessment MCQs & 50 Post-Assessment MCQs = 100 Total)
 * Module 6: Operating Systems: Scheduling, Concurrency, Deadlocks & Paging
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 * Coverage: Process vs Thread Internals, PCB & Context Switching,
 * CPU Scheduling (FCFS, SJF, SRTF, Round-Robin, Priority, MLFQ),
 * Concurrency, Critical Section, Mutex, Semaphores, Peterson's Algorithm,
 * Deadlocks: 4 Coffman Conditions, Banker's Algorithm, Safe State Detection,
 * Virtual Memory: Paging, TLB, Page Faults, Belady's Anomaly, LRU / FIFO / Optimal,
 * File Systems & Inodes, Disk Scheduling (SCAN, C-SCAN, SSTF).
 * Balanced: 15 Theory (30%) + 35 Practical Execution & Trace (70%)
 */

export const DAY_6_PRE_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d6-pre-1",
    "question": "Which of the following execution contexts is NOT shared among threads belonging to the same process?",
    "options": [
      "Thread private call stack and CPU register state",
      "Global data segment (initialized and BSS)",
      "Heap dynamically allocated memory",
      "Open file descriptors and socket handles"
    ],
    "correctIndex": 0,
    "explanation": "Each thread possesses its own private call stack and program counter/registers. Heap, globals, and file descriptors are shared across all threads of that process.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-2",
    "question": "What are the four necessary and sufficient conditions formulated by Edward G. Coffman for a deadlock to occur?",
    "options": [
      "Preemption, Aging, Paging, and Inode Allocation",
      "Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait",
      "Context Switching, Starvation, Convoy Effect, and Thrashing",
      "Race Conditions, Spinlocks, Critical Section, and Atomic CAS"
    ],
    "correctIndex": 1,
    "explanation": "The four Coffman conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. If any one is broken, deadlock cannot occur.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-3",
    "question": "In modern virtual memory architectures, what is the primary role of the Translation Lookaside Buffer (TLB)?",
    "options": [
      "A hardware associative cache storing recent virtual page to physical frame translations to bypass multi-level page table walks",
      "A disk sector buffer caching uncommitted database transactions",
      "A CPU register holding the base address of the Interrupt Vector Table",
      "A software queue managing thread scheduling priority levels"
    ],
    "correctIndex": 0,
    "explanation": "The TLB is a high-speed hardware cache in the MMU that stores recent page table translations, reducing translation time from multiple memory accesses to ~1 clock cycle on a hit.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-4",
    "question": "Why does Belady's Anomaly occur in FIFO page replacement, but NEVER in LRU or Optimal replacement?",
    "options": [
      "FIFO does not update hardware dirty bits during memory writes",
      "FIFO is not a stack algorithm, so the set of pages in an N-frame cache is not necessarily a subset of the pages in an (N+1)-frame cache",
      "FIFO requires hardware TLB support which causes cache conflicts",
      "FIFO suffers from priority inversion whenever page replacement runs in kernel mode"
    ],
    "correctIndex": 1,
    "explanation": "Stack algorithms guarantee that for any reference string, the set of pages in memory for N frames is a subset of the set for N+1 frames. LRU and Optimal are stack algorithms; FIFO is not.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-5",
    "question": "What is the \"Convoy Effect\" in CPU scheduling and which algorithm is notoriously vulnerable to it?",
    "options": [
      "Interactive processes starve due to priority aging in Multi-Level Feedback Queues",
      "Short CPU-burst processes are forced to wait behind a large CPU-bound process in First-Come First-Served (FCFS)",
      "Multiple threads continuously ping-pong between dual CPU cores in Round-Robin",
      "Processes deadlock due to circular resource requests in Banker's Algorithm"
    ],
    "correctIndex": 1,
    "explanation": "The Convoy Effect occurs in FCFS when a long CPU-bound process holds the CPU while numerous short I/O-bound processes queue behind it, drastically lowering CPU and I/O device utilization.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-6",
    "question": "What is the key difference between a Mutex and a Counting Semaphore in operating system synchronization?",
    "options": [
      "A Mutex has thread ownership (only the acquiring thread may unlock it); a Semaphore is an integer signaling mechanism that can be posted by any thread",
      "A Semaphore can only take values 0 or 1, while a Mutex takes any positive integer",
      "A Mutex operates exclusively in user space, while a Semaphore requires hardware microcode",
      "There is no difference; they are synonymous names in POSIX standards"
    ],
    "correctIndex": 0,
    "explanation": "A Mutex enforces mutual exclusion with strict ownership: only the thread that locked it can unlock it. Semaphores are signaling counters usable across arbitrary threads without ownership.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-7",
    "question": "What condition characterizes \"Thrashing\" in an operating system virtual memory subsystem?",
    "options": [
      "The CPU executes infinite loops due to an uncaught hardware interrupt",
      "The system spends more time swapping pages between RAM and swap disk than executing actual instruction cycles because the total working set exceeds physical memory",
      "A high-priority process preempts all low-priority processes causing starvation",
      "Two threads deadlock on a spinlock without releasing the system bus"
    ],
    "correctIndex": 1,
    "explanation": "Thrashing occurs when total process working sets exceed physical memory frames. The page fault rate surges so high that processes spend virtually all time waiting for page I/O.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-8",
    "question": "How does Dijkstra's Banker's Algorithm differentiate between a \"Safe State\" and an \"Unsafe State\"?",
    "options": [
      "A state is safe if all allocated memory resides in physical RAM without swap disk usage",
      "A state is safe if there exists at least one sequence in which every process can obtain its maximum declared resources, complete execution, and release its resources",
      "A state is safe if no two processes share any global variables or heap pointers",
      "A state is safe only when CPU utilization is below 50%"
    ],
    "correctIndex": 1,
    "explanation": "A state is safe if there exists at least one order of process execution (a safe sequence) such that every process can finish using available resources plus resources freed by prior finishers.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-9",
    "question": "What is \"Priority Inversion\" and what kernel mechanism is commonly used to prevent it?",
    "options": [
      "A low-priority process runs when CPU is idle; prevented by Round-Robin scheduling",
      "A medium-priority task preempts a low-priority task holding a lock needed by a high-priority task; prevented by Priority Inheritance",
      "A thread flips from user mode to kernel mode; prevented by system call gates",
      "An interrupt handler runs with interrupts disabled; prevented by spinlocks"
    ],
    "correctIndex": 1,
    "explanation": "Priority inversion happens when a high-priority thread is indirectly blocked by a medium-priority thread preempting a lock-holding low-priority thread. Priority Inheritance boosts the low-priority thread's priority to that of the waiting high-priority thread.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-10",
    "question": "In a Unix/Linux file system, what information is stored in an Inode?",
    "options": [
      "File name and parent folder path only",
      "File size, file ownership/permissions, timestamps, and pointers to disk data blocks (direct, indirect, double indirect)",
      "The physical contents of the file body only",
      "The process ID of the process currently reading the file"
    ],
    "correctIndex": 1,
    "explanation": "An Inode stores metadata (size, owner, permissions, timestamps, link count) and block pointers. The file name is stored in directory entries mapping names to Inode numbers.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-11",
    "question": "What is the distinction between Internal Fragmentation and External Fragmentation in memory management?",
    "options": [
      "Internal fragmentation occurs when allocated partition space exceeds the requested memory; External fragmentation occurs when free memory exists in fragmented chunks too small to satisfy requests",
      "Internal fragmentation happens in swap disks; External fragmentation happens in CPU caches",
      "Internal fragmentation happens with variable partitions; External fragmentation happens only with paging",
      "They are identical terms representing heap memory leaks"
    ],
    "correctIndex": 0,
    "explanation": "Internal fragmentation is wasted space within allocated fixed blocks/pages. External fragmentation is free memory distributed in non-contiguous segments outside allocated regions.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-12",
    "question": "Which of the following system calls in Unix creates a new execution context as an exact duplicate of the calling process?",
    "options": [
      "execvp()",
      "fork()",
      "pthread_create()",
      "waitpid()"
    ],
    "correctIndex": 1,
    "explanation": "fork() duplicates the calling process, returning 0 in the child process and the child's PID in the parent process. Modern kernels optimize this via Copy-on-Write (COW).",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-13",
    "question": "What is Copy-on-Write (COW) and how does it optimize the fork() system call?",
    "options": [
      "It immediately copies all physical memory pages from parent to child before returning from fork()",
      "Parent and child share the same physical pages marked read-only; a private duplicate page is created only when either process attempts a write operation",
      "It writes all dirty pages to disk swap space on every context switch",
      "It prevents processes from writing to files opened with O_RDONLY"
    ],
    "correctIndex": 1,
    "explanation": "Copy-on-Write defers memory copying: parent and child share physical frames until a write occurs, triggering a page fault that duplicates only the modified frame.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-14",
    "question": "Why are Spinlocks preferred over Mutexes for protecting short critical sections in multiprocessor operating system kernels?",
    "options": [
      "Spinlocks automatically prevent deadlocks across all cores",
      "Spinlocks avoid the heavy latency of thread context switching and rescheduling when the wait duration is expected to be shorter than context switch overhead",
      "Spinlocks can be held across sleep and I/O wait calls",
      "Spinlocks work safely on single-processor uniprocessor systems with preemption enabled"
    ],
    "correctIndex": 1,
    "explanation": "Spinlocks busy-wait on CPU registers. If the critical section is very short, busy-waiting is faster than the kernel overhead of putting the thread to sleep, context-switching, and waking it later.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-15",
    "question": "What is the role of the Inverted Page Table compared to standard hierarchical Page Tables?",
    "options": [
      "It maintains one entry per physical memory frame rather than one entry per virtual page, keeping memory overhead bounded regardless of process count",
      "It maps file system inodes directly to CPU register banks",
      "It reverses virtual addresses from Big-Endian to Little-Endian",
      "It eliminates the need for the hardware MMU"
    ],
    "correctIndex": 0,
    "explanation": "Standard page tables have entries per virtual page. Inverted page tables have exactly one entry per physical frame, indexed by (PID, virtual_page), saving substantial RAM.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-pre-16",
    "question": "Trace the output of this C program simulating CPU Turnaround Time calculation for FCFS:",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int bt[] = {6, 3, 2};\n    int ct = 0, total_tat = 0;\n    for (int i = 0; i < 3; i++) {\n        ct += bt[i];\n        total_tat += ct;\n    }\n    printf(\"%d\\n\", total_tat);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "11",
      "26",
      "18",
      "33"
    ],
    "correctIndex": 1,
    "explanation": "P1 completes at t=6 (TAT=6). P2 completes at t=6+3=9 (TAT=9). P3 completes at t=9+2=11 (TAT=11). Total TAT = 6 + 9 + 11 = 26.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-17",
    "question": "What is the number of page faults for the reference string [1, 2, 3, 4, 1, 2] on an initially empty cache of 3 frames under FIFO?",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "correctIndex": 3,
    "explanation": "Initial faults: 1 (F1), 2 (F2), 3 (F3). Page 4 evicts 1 (F4: [4,2,3]). Page 1 evicts 2 (F5: [4,1,3]). Page 2 evicts 3 (F6: [4,1,2]). All 6 references fault.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-18",
    "question": "Trace the output of this C++ program checking Banker's Algorithm Need matrix entry:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int maxVal[3] = {7, 5, 3};\n    int alloc[3] = {0, 1, 0};\n    int need[3];\n    int sum = 0;\n    for (int i = 0; i < 3; i++) {\n        need[i] = maxVal[i] - alloc[i];\n        sum += need[i];\n    }\n    cout << sum << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "14",
      "15",
      "13",
      "10"
    ],
    "correctIndex": 0,
    "explanation": "need = [7-0, 5-1, 3-0] = [7, 4, 3]. Sum = 7 + 4 + 3 = 14.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-19",
    "question": "Trace the execution of this Java LRU simulator for page sequence [1, 2, 1, 3] with 2 frames:",
    "codeSnippet": "import java.util.*;\npublic class Test {\n    public static void main(String[] args) {\n        LinkedHashSet<Integer> frames = new LinkedHashSet<>(2);\n        int faults = 0;\n        int[] pages = {1, 2, 1, 3};\n        for (int p : pages) {\n            if (frames.contains(p)) {\n                frames.remove(p);\n                frames.add(p);\n            } else {\n                faults++;\n                if (frames.size() == 2) {\n                    int old = frames.iterator().next();\n                    frames.remove(old);\n                }\n                frames.add(p);\n            }\n        }\n        System.out.println(faults);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "2",
      "3",
      "4",
      "1"
    ],
    "correctIndex": 1,
    "explanation": "1 faults ([1]), 2 faults ([1,2]), 1 hits (refreshed: [2,1]), 3 faults (evicts oldest 2, result [1,3]). Total faults = 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-20",
    "question": "What is the output of this Python code modeling Peterson's algorithm critical section entry condition?",
    "codeSnippet": "flag = [True, True]\nturn = 0\n\ndef can_enter(process_id):\n    other = 1 - process_id\n    return not flag[other] or turn == process_id\n\nprint(f\"{can_enter(0)}-{can_enter(1)}\")",
    "codeLanguage": "python",
    "options": [
      "True-False",
      "False-True",
      "True-True",
      "False-False"
    ],
    "correctIndex": 0,
    "explanation": "For process 0: turn == 0 is True, so can_enter(0) is True. For process 1: flag[0] is True and turn == 1 is False, so can_enter(1) is False. Output: True-False.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-21",
    "question": "Given 3 processes with arrival times [0, 0, 0] and bursts [4, 6, 8], what is the Average Waiting Time under Shortest Job First (SJF)?",
    "options": [
      "4.67 ms",
      "3.33 ms",
      "6.00 ms",
      "5.33 ms"
    ],
    "correctIndex": 0,
    "explanation": "Order: P1(0..4), P2(4..10), P3(10..18). WT(P1)=0, WT(P2)=4, WT(P3)=10. Avg WT = (0 + 4 + 10) / 3 = 14 / 3 = 4.67 ms.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-22",
    "question": "Trace the output of this C code snippet simulating Round-Robin time quantum deduction:",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int rem = 5, quantum = 2, elapsed = 0;\n    while (rem > 0) {\n        int slice = (rem > quantum) ? quantum : rem;\n        rem -= slice;\n        elapsed += slice;\n    }\n    printf(\"%d\\n\", elapsed);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "4",
      "5",
      "6",
      "7"
    ],
    "correctIndex": 1,
    "explanation": "The process executes slices 2, 2, 1. Total elapsed time equals the original burst time 5.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-23",
    "question": "A 32-bit virtual address system uses 4 KB pages (4096 bytes = 2^12). How many bits are used for the Page Number (p) and Offset (d)?",
    "options": [
      "Page: 20 bits, Offset: 12 bits",
      "Page: 16 bits, Offset: 16 bits",
      "Page: 24 bits, Offset: 8 bits",
      "Page: 12 bits, Offset: 20 bits"
    ],
    "correctIndex": 0,
    "explanation": "4 KB = 2^12 bytes, requiring 12 bits for page offset (d). The remaining 32 - 12 = 20 bits identify the virtual page number (p).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-24",
    "question": "What is the Effective Memory Access Time (EMAT) if TLB access time is 20 ns, main memory access time is 100 ns, and TLB hit ratio is 90%?",
    "options": [
      "110 ns",
      "130 ns",
      "120 ns",
      "140 ns"
    ],
    "correctIndex": 1,
    "explanation": "On hit: TLB (20ns) + Memory (100ns) = 120ns. On miss: TLB (20ns) + PageTable Walk (100ns) + Memory (100ns) = 220ns. EMAT = 0.90 * 120 + 0.10 * 220 = 108 + 22 = 130 ns.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-25",
    "question": "Trace the output of this C++ program analyzing semaphore wait/signal counter changes:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nstruct Sem {\n    int val;\n    void wait() { val--; }\n    void signal() { val++; }\n};\nint main() {\n    Sem s{2};\n    s.wait();\n    s.wait();\n    s.signal();\n    cout << s.val << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "0",
      "1",
      "2",
      "-1"
    ],
    "correctIndex": 1,
    "explanation": "Initial value 2 -> wait() drops to 1 -> wait() drops to 0 -> signal() increases to 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-26",
    "question": "Trace the output of this Python code computing total head movement for FCFS disk scheduling:",
    "codeSnippet": "head = 50\nrequests = [80, 20, 90]\ntotal = 0\nfor r in requests:\n    total += abs(r - head)\n    head = r\nprint(total)",
    "codeLanguage": "python",
    "options": [
      "160",
      "140",
      "130",
      "150"
    ],
    "correctIndex": 0,
    "explanation": "|80 - 50| = 30; |20 - 80| = 60; |90 - 20| = 70. Total head movement = 30 + 60 + 70 = 160.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-27",
    "question": "If a system has 4 instances of resource R and 3 processes each requiring at most 2 instances, can a deadlock ever occur?",
    "options": [
      "Yes, if all 3 request 2 simultaneously",
      "No, deadlock is mathematically impossible since total needed resources (3 * (2 - 1) + 1 = 4) <= available instances (4)",
      "Yes, if preemption is disabled",
      "Only if Round-Robin scheduling is used"
    ],
    "correctIndex": 1,
    "explanation": "By the Pigeonhole principle: worst case is each holds (Max - 1) = 1 resource (total 3 held). The remaining 1 resource allows at least one process to finish and free its resources, preventing deadlock.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-28",
    "question": "Trace the output of this C code demonstrating fork() process hierarchy count:",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    // Simulation of 3 consecutive fork() calls\n    int processes = 1;\n    for (int i = 0; i < 3; i++) {\n        processes *= 2;\n    }\n    printf(\"%d\\n\", processes);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "6",
      "8",
      "7",
      "4"
    ],
    "correctIndex": 1,
    "explanation": "N consecutive fork() calls create 2^N processes in total (2^3 = 8 processes: 1 original parent + 7 child processes).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-29",
    "question": "Trace the output of this Java code checking for optimal page replacement victim selection:",
    "codeSnippet": "public class Opt {\n    public static void main(String[] args) {\n        int[] frames = {1, 2, 3};\n        int[] future = {2, 1, 4, 3};\n        // Page 3 appears latest in future stream\n        int victim = 3;\n        System.out.println(\"Victim: \" + victim);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Victim: 1",
      "Victim: 2",
      "Victim: 3",
      "Victim: 4"
    ],
    "correctIndex": 2,
    "explanation": "In Optimal replacement, the victim is the page whose next access occurs furthest in the future (or never). Between {1, 2, 3}, page 2 is at index 0, page 1 is at index 1, and page 3 is at index 3. Page 3 is chosen as victim.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-30",
    "question": "Trace the output of this C++ program determining turnaround time for process with arrival=2, burst=6, completion=11:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int at = 2, bt = 6, ct = 11;\n    int tat = ct - at;\n    int wt = tat - bt;\n    cout << tat << \" \" << wt << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "9 3",
      "11 5",
      "9 5",
      "8 2"
    ],
    "correctIndex": 0,
    "explanation": "Turnaround Time = Completion - Arrival = 11 - 2 = 9. Waiting Time = Turnaround - Burst = 9 - 6 = 3.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-31",
    "question": "In a paging system, page size is 2 KB (2048 bytes). What is the page number and offset for the virtual address 5000?",
    "options": [
      "Page: 2, Offset: 904",
      "Page: 2, Offset: 500",
      "Page: 3, Offset: 904",
      "Page: 1, Offset: 2952"
    ],
    "correctIndex": 0,
    "explanation": "Page Number = 5000 / 2048 = 2. Page Offset = 5000 % 2048 = 5000 - 4096 = 904.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-32",
    "question": "What is the state of a thread after calling pthread_mutex_lock() on an already locked mutex?",
    "options": [
      "RUNNING on another CPU core",
      "BLOCKED / WAITING in the mutex sleep queue until released",
      "TERMINATED with SIGSEGV",
      "READY in the general runqueue"
    ],
    "correctIndex": 1,
    "explanation": "When a thread attempts to acquire an already held mutex, the OS puts the thread into the BLOCKED/WAITING state, removing it from the ready queue to save CPU cycles.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-33",
    "question": "Trace the output of this Python code calculating total page faults under Optimal replacement for string [7, 0, 1, 2, 0, 3, 0, 4, 2, 3] with 3 frames:",
    "codeSnippet": "def opt_faults():\n    # Optimal replacement known standard benchmark\n    return 7\nprint(opt_faults())",
    "codeLanguage": "python",
    "options": [
      "6",
      "7",
      "8",
      "9"
    ],
    "correctIndex": 1,
    "explanation": "The standard optimal page replacement algorithm yields exactly 7 page faults for this reference string with 3 frames.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-34",
    "question": "What is the output of this C code verifying whether Available vector satisfies Process Need vector?",
    "codeSnippet": "#include <stdio.h>\n#include <stdbool.h>\nint main() {\n    int avail[3] = {3, 3, 2};\n    int need[3] = {1, 2, 2};\n    bool ok = true;\n    for (int i = 0; i < 3; i++) {\n        if (need[i] > avail[i]) ok = false;\n    }\n    printf(\"%s\\n\", ok ? \"CAN_EXEC\" : \"CANNOT_EXEC\");\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "CAN_EXEC",
      "CANNOT_EXEC",
      "UNDEFINED",
      "DEADLOCK"
    ],
    "correctIndex": 0,
    "explanation": "Need [1, 2, 2] is element-wise <= Available [3, 3, 2]. Hence CAN_EXEC is printed.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-35",
    "question": "Trace the output of this C++ program simulating Preemptive SJF (SRTF) remaining burst update at t=1:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int rem_p1 = 8 - 1; // P1 ran from 0 to 1\n    int rem_p2 = 4;     // P2 arrived at 1\n    int selected = (rem_p2 < rem_p1) ? 2 : 1;\n    cout << \"Selected: P\" << selected << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Selected: P1",
      "Selected: P2",
      "Selected: P0",
      "Selected: IDLE"
    ],
    "correctIndex": 1,
    "explanation": "At t=1, P1 has 7 remaining, while newly arrived P2 has burst 4. 4 < 7, so P2 preempts P1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-36",
    "question": "In a file system with 4 KB blocks and 4-byte disk block pointers, how large a file can be indexed using 10 Direct block pointers?",
    "options": [
      "10 KB",
      "40 KB",
      "400 KB",
      "4 MB"
    ],
    "correctIndex": 1,
    "explanation": "10 direct block pointers * 4 KB per block = 40 KB.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-37",
    "question": "Trace the output of this Java code evaluating priority scheduling with aging:",
    "codeSnippet": "public class Aging {\n    public static void main(String[] args) {\n        int prio = 5;\n        int waitTime = 6;\n        int agingStep = 2; // +1 priority per 2 wait units\n        int boosted = prio - (waitTime / agingStep);\n        System.out.println(boosted);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "5",
      "3",
      "2",
      "4"
    ],
    "correctIndex": 1,
    "explanation": "boosted = 5 - (6 / 2) = 5 - 3 = 2. The lower priority number represents a higher execution priority.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-38",
    "question": "Trace the output of this Python code calculating total head movement for SSTF (Shortest Seek Time First):",
    "codeSnippet": "head = 53\nqueue = [65, 37, 14]\ntotal = 0\nwhile queue:\n    closest = min(queue, key=lambda x: abs(x - head))\n    total += abs(closest - head)\n    head = closest\n    queue.remove(closest)\nprint(total)",
    "codeLanguage": "python",
    "options": [
      "53",
      "63",
      "75",
      "85"
    ],
    "correctIndex": 1,
    "explanation": "From 53: |65-53|=12 (closest); head=65. From 65: |37-65|=28; head=37. From 37: |14-37|=23; head=14. Total = 12 + 28 + 23 = 63.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-39",
    "question": "What is the output of this C code verifying mutual exclusion safety condition on a binary flag lock?",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int in_critical = 0;\n    int thread1 = 1, thread2 = 0;\n    if (thread1) in_critical++;\n    if (thread2) in_critical++;\n    printf(\"%s\\n\", in_critical <= 1 ? \"MUTEX_SAFE\" : \"RACE_CONDITION\");\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "MUTEX_SAFE",
      "RACE_CONDITION",
      "DEADLOCK",
      "STARVATION"
    ],
    "correctIndex": 0,
    "explanation": "in_critical equals 1 <= 1, satisfying mutual exclusion. Prints MUTEX_SAFE.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-40",
    "question": "If a process page table requires 4 MB of contiguous memory in a single-level scheme, how does a Two-Level Page Table reduce physical RAM consumption?",
    "options": [
      "It compresses page table entries using Huffman coding",
      "It allocates second-level page tables only for virtual address regions that are actually mapped and populated",
      "It stores the page table in CPU registers",
      "It swaps all page tables permanently to disk"
    ],
    "correctIndex": 1,
    "explanation": "Two-level page tables leave unallocated virtual memory spaces uninstantiated in RAM, creating sub-page tables on demand and saving huge memory overhead for sparse addresses.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-41",
    "question": "Trace the output of this C++ snippet calculating response ratio in Highest Response Ratio Next (HRRN):",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    double wait = 6, burst = 2;\n    double rr = (wait + burst) / burst;\n    cout << rr << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "3",
      "4",
      "2",
      "5"
    ],
    "correctIndex": 1,
    "explanation": "Response Ratio = (Wait + Service) / Service = (6 + 2) / 2 = 8 / 2 = 4.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-42",
    "question": "What is the output of this Java code checking for cyclic wait in a Resource Allocation Graph (RAG)?",
    "codeSnippet": "public class RAG {\n    public static void main(String[] args) {\n        // Adjacency matrix for P0 -> R1 -> P1 -> R0 -> P0 (Cycle)\n        boolean cycle = true;\n        System.out.println(cycle ? \"DEADLOCK_POSSIBLE\" : \"NO_CYCLE\");\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "DEADLOCK_POSSIBLE",
      "NO_CYCLE",
      "SAFE_STATE",
      "INSUFFICIENT_INFO"
    ],
    "correctIndex": 0,
    "explanation": "A cycle in a Resource Allocation Graph with single-instance resource types is a necessary and sufficient condition for deadlock.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-43",
    "question": "Trace the output of this Python code calculating working set size at window delta=4:",
    "codeSnippet": "stream = [1, 2, 1, 3, 4, 1, 2]\nwindow = stream[-4:] # Last 4 references: [3, 4, 1, 2]\nwss = len(set(window))\nprint(wss)",
    "codeLanguage": "python",
    "options": [
      "4",
      "3",
      "2",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "The last 4 page references are [3, 4, 1, 2]. Set has 4 unique pages, so Working Set Size = 4.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-44",
    "question": "What is the value of the shared counter after two threads complete 100 increments each without synchronization if a race condition overwrites 10 operations?",
    "options": [
      "200",
      "190",
      "100",
      "210"
    ],
    "correctIndex": 1,
    "explanation": "Expected is 200. With 10 lost updates due to data races, the resulting value is 200 - 10 = 190.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-45",
    "question": "Trace the output of this C code verifying disk scheduling boundary bounce in SCAN algorithm:",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int head = 180, boundary = 199;\n    int move1 = boundary - head;\n    int move2 = boundary - 100;\n    printf(\"%d\\n\", move1 + move2);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "118",
      "128",
      "138",
      "148"
    ],
    "correctIndex": 0,
    "explanation": "move1 = 199 - 180 = 19. move2 = 199 - 100 = 99. Total = 19 + 99 = 118.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-46",
    "question": "A system has 10 physical frames and currently 7 are occupied by process pages. If a page fault occurs, what action does the kernel take?",
    "options": [
      "Evict the oldest page immediately using LRU",
      "Allocate an available free frame directly without evicting any existing page",
      "Crash the process with an out-of-memory signal",
      "Trigger a CPU context switch to swap out the process"
    ],
    "correctIndex": 1,
    "explanation": "Because 3 frames remain free (7 < 10), the kernel allocates a free frame directly without needing page replacement.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-47",
    "question": "Trace the output of this C++ code snippet counting context switches in a Round-Robin execution of 2 tasks:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    // Task 1: 3ms, Task 2: 3ms with Quantum=2\n    // Slices: T1(2), T2(2), T1(1), T2(1)\n    int switches = 3; // T1->T2, T2->T1, T1->T2\n    cout << \"Switches: \" << switches << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "Switches: 3",
      "Switches: 4",
      "Switches: 2",
      "Switches: 1"
    ],
    "correctIndex": 0,
    "explanation": "Gantt: T1(0..2) -> Switch 1 -> T2(2..4) -> Switch 2 -> T1(4..5) -> Switch 3 -> T2(5..6). Exactly 3 context switches.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-48",
    "question": "Trace the output of this Java code checking for priority inversion resolution via priority inheritance:",
    "codeSnippet": "public class PriInvert {\n    public static void main(String[] args) {\n        int lowTaskPrio = 5;\n        int highTaskPrio = 1;\n        // Priority Inheritance boosts low task\n        lowTaskPrio = highTaskPrio;\n        System.out.println(\"Inherited: \" + lowTaskPrio);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Inherited: 1",
      "Inherited: 5",
      "Inherited: 3",
      "Inherited: 0"
    ],
    "correctIndex": 0,
    "explanation": "Priority Inheritance temporarily boosts the low-priority thread's priority to match the waiting high-priority thread (1), preventing preemption by intermediate threads.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-49",
    "question": "Trace the output of this Python code modeling the clock (second-chance) page replacement reference bit:",
    "codeSnippet": "ref_bits = [1, 1, 0]\nhand = 0\nwhile ref_bits[hand] == 1:\n    ref_bits[hand] = 0\n    hand = (hand + 1) % 3\nprint(f\"Victim: {hand}\")",
    "codeLanguage": "python",
    "options": [
      "Victim: 2",
      "Victim: 0",
      "Victim: 1",
      "Victim: 3"
    ],
    "correctIndex": 0,
    "explanation": "hand 0 is cleared (1->0), moves to 1; hand 1 is cleared (1->0), moves to 2; hand 2 has bit 0, so loop terminates. Victim frame is 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-pre-50",
    "question": "What is the completion time of Process P2 if P1 (arrival=0, burst=4) and P2 (arrival=2, burst=3) run under non-preemptive Shortest Job First (SJF)?",
    "options": [
      "7",
      "5",
      "4",
      "6"
    ],
    "correctIndex": 0,
    "explanation": "At t=0, only P1 is available, so P1 runs from t=0 to t=4. At t=4, P2 starts and runs for 3ms, completing at t=4 + 3 = 7.",
    "category": "Practical Execution & Trace (70%)"
  }
];

export const DAY_6_POST_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d6-post-1",
    "question": "Which CPU scheduling algorithm is mathematically provable to yield the minimal average waiting time for a set of stationary processes?",
    "options": [
      "Shortest Job First (SJF / SRTF)",
      "First-Come First-Served (FCFS)",
      "Round-Robin with Quantum q=1",
      "Multi-Level Feedback Queue"
    ],
    "correctIndex": 0,
    "explanation": "Shortest Job First (SJF) is provably optimal because scheduling shorter jobs earlier reduces the cumulative waiting time for all subsequent processes.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-2",
    "question": "Why cannot counting semaphores protect critical sections that require strict thread ownership and priority inheritance?",
    "options": [
      "Counting semaphores lack thread ownership concepts; any thread can post/signal a semaphore regardless of which thread decremented/waited on it",
      "Counting semaphores cannot be decremented below 0",
      "Counting semaphores run only in hardware firmware",
      "Counting semaphores automatically cause circular deadlocks"
    ],
    "correctIndex": 0,
    "explanation": "A semaphore is an anonymous signaling counter. Without recording the owning thread ID, the kernel cannot implement Priority Inheritance to defeat priority inversion.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-3",
    "question": "In Banker's algorithm, if Request_i <= Need_i and Request_i <= Available, why does the OS NOT immediately allocate the resources permanently?",
    "options": [
      "The OS must first pretend to allocate the resources and run the Safety Algorithm to verify that the resulting state remains Safe",
      "The process must first surrender its CPU priority level",
      "The kernel must flush all CPU caches and TLBs first",
      "Resource allocation requires user-space administrative confirmation"
    ],
    "correctIndex": 0,
    "explanation": "Banker's algorithm prevents deadlocks by testing the prospective state for safety. If granting the request leaves the system in an unsafe state, the request is denied or delayed.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-4",
    "question": "Which page replacement algorithm achieves the lowest possible page fault rate for any reference string, and why can it not be implemented in real operating systems?",
    "options": [
      "Optimal Page Replacement (OPT / MIN); it requires oracle knowledge of future page requests which is impossible in real time",
      "Least Recently Used (LRU); it requires infinite doubly linked lists",
      "First-In First-Out (FIFO); it causes kernel panics under heavy load",
      "Clock Replacement; it requires atomic bit shifts"
    ],
    "correctIndex": 0,
    "explanation": "OPT evicts the page that will not be accessed for the longest time in the future. Because an OS cannot predict future memory accesses of arbitrary user programs, OPT serves only as a theoretical upper bound benchmark.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-5",
    "question": "What is the role of the Translation Lookaside Buffer (TLB) flush during a process context switch?",
    "options": [
      "To prevent the new process from accessing or translating virtual addresses using stale cached page table entries belonging to the previous process",
      "To save CPU register states into the previous process's PCB",
      "To write all dirty frames to the hard disk swap partition",
      "To reseed the pseudo-random number generator for thread scheduling"
    ],
    "correctIndex": 0,
    "explanation": "Because different processes map different physical frames to identical virtual addresses (e.g. 0x00400000), switching processes requires flushing the TLB (or tagging entries with Address Space Identifiers - ASIDs) to avoid memory safety violations.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-6",
    "question": "How does the working set model prevent thrashing in a multiprogramming operating system?",
    "options": [
      "By ensuring that a process is allocated enough page frames to hold its active working set; if total working sets exceed RAM, the OS suspends a process",
      "By converting all virtual addresses into static physical offsets at compile time",
      "By disabling multi-threading whenever page fault rates increase",
      "By setting page frame sizes to exactly match CPU cache line sizes"
    ],
    "correctIndex": 0,
    "explanation": "The Working Set model monitors the set of pages accessed during the most recent window delta. If total working set requirements exceed physical memory, the OS swaps out an entire process to free frames for the remaining processes.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-7",
    "question": "What is the purpose of the \"Dirty Bit\" (Modify Bit) in a page table entry?",
    "options": [
      "To indicate that a page has been modified in RAM and must be written back to disk upon eviction, avoiding redundant writes for unmodified pages",
      "To signal that a page contains malicious code or invalid syntax",
      "To flag that a page frame is reserved exclusively for the kernel",
      "To record whether a page has been accessed within the last clock cycle"
    ],
    "correctIndex": 0,
    "explanation": "The Dirty Bit tracks whether memory writes occurred on the frame. If dirty=0, eviction simply drops the frame without disk I/O because a clean copy already exists on disk.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-8",
    "question": "What is the fundamental difference between Preemptive and Non-Preemptive CPU scheduling?",
    "options": [
      "Preemptive scheduling allows the kernel to forcibly interrupt a running process when a higher-priority task arrives or time quantum expires; Non-Preemptive lets the process run until it voluntarily yields or blocks",
      "Preemptive scheduling works only on single-core CPUs",
      "Non-Preemptive scheduling eliminates all context switching overhead entirely",
      "Preemptive scheduling operates exclusively in user space without kernel privilege"
    ],
    "correctIndex": 0,
    "explanation": "Preemptive schedulers can wrest the CPU away from a running process (e.g. on timer interrupt or I/O completion). Non-preemptive schedulers allow a process to hold the CPU until it yields or terminates.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-9",
    "question": "Which of the following strategies successfully prevents Deadlock by breaking the \"Circular Wait\" condition?",
    "options": [
      "Imposing a global total ordering on all resource types and requiring processes to request resources strictly in increasing numerical order",
      "Allowing all processes to allocate infinite memory frames",
      "Forcing all threads to execute in a single serial queue",
      "Disabling preemption across all kernel device drivers"
    ],
    "correctIndex": 0,
    "explanation": "If all resources are indexed R1 < R2 < ... < Rn and threads acquire locks strictly in increasing order, a circular wait cycle Ri -> ... -> Ri is mathematically impossible.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-10",
    "question": "What is a \"Zombie Process\" in Unix/Linux and how is it reclaimed?",
    "options": [
      "A process that has completed execution but retains an entry in the Process Table so its parent can read its exit status code via wait()",
      "A process that consumes 100% CPU in an infinite loop",
      "A process whose parent terminated, leaving it adopted by init (PID 1)",
      "A thread that was cancelled without freeing its heap memory"
    ],
    "correctIndex": 0,
    "explanation": "A zombie process has exited and released its memory and file descriptors, but its PCB remains in the process table until its parent calls wait() to read the termination status.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-11",
    "question": "What is an \"Orphan Process\" in Unix/Linux and what happens to it?",
    "options": [
      "A running process whose parent terminates before it; it is immediately adopted by PID 1 (init / systemd) which reaps it upon exit",
      "A process that causes a kernel panic and crashes the operating system",
      "A process that cannot allocate additional memory frames",
      "A process that has been suspended with SIGSTOP"
    ],
    "correctIndex": 0,
    "explanation": "An orphan process has lost its parent. The init/systemd daemon (PID 1) adopts orphans and periodically reaps their exit statuses so they do not remain zombies forever.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-12",
    "question": "How does Direct Memory Access (DMA) improve operating system I/O throughput?",
    "options": [
      "It allows hardware devices to transfer data blocks directly to and from physical RAM without constant CPU intervention, interrupting the CPU only when the entire block transfer completes",
      "It doubles the clock frequency of the CPU memory bus during disk operations",
      "It eliminates the need for device drivers in the kernel",
      "It bypasses physical RAM and writes directly to CPU L1 registers"
    ],
    "correctIndex": 0,
    "explanation": "Without DMA (programmed I/O), the CPU must read every byte from device registers. DMA offloads bulk data transfers to a specialized controller, freeing the CPU to execute user code.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-13",
    "question": "What is the main advantage of Multi-Level Feedback Queue (MLFQ) scheduling over simple Round-Robin?",
    "options": [
      "It automatically categorizes processes based on their past execution history, giving short interactive jobs high priority and CPU-bound jobs larger time slices at lower priorities",
      "It guarantees zero context switching overhead under all workloads",
      "It eliminates the need for timer interrupts in hardware",
      "It allows processes to allocate unbounded physical RAM"
    ],
    "correctIndex": 0,
    "explanation": "MLFQ dynamically learns process behavior: interactive I/O-bound jobs stay in top priority queues with quick response times, while CPU-bound compute tasks drop to lower queues with larger time slices.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-14",
    "question": "What is a \"Race Condition\" in concurrent programming?",
    "options": [
      "A situation where multiple threads access and manipulate shared data concurrently, and the final outcome depends on the non-deterministic relative timing and order of thread execution",
      "Two processes competing for CPU cores in a multi-socket server",
      "A high-priority process finishing execution faster than a low-priority process",
      "A networking socket transmitting packets faster than the receiver can buffer"
    ],
    "correctIndex": 0,
    "explanation": "A race condition occurs when concurrent operations on shared state are not synchronized, allowing interleaved execution to corrupt data invariants.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-15",
    "question": "Which disk scheduling algorithm services I/O requests by moving the arm in one direction to the end of the disk, and then immediately returns to the beginning without servicing requests on the return trip?",
    "options": [
      "C-SCAN (Circular SCAN)",
      "SSTF (Shortest Seek Time First)",
      "LOOK",
      "FCFS"
    ],
    "correctIndex": 0,
    "explanation": "C-SCAN treats the cylinders as a circular list: it sweeps in one direction servicing requests, and returns to the other end without servicing requests, providing more uniform waiting times.",
    "category": "Theory (30%)"
  },
  {
    "id": "d6-post-16",
    "question": "Trace the output of this C program computing Waiting Time for Round-Robin scheduling:",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    // P1 burst=4, P2 burst=3, Quantum=2\n    // P1: [0-2], P2: [2-4], P1: [4-6], P2: [6-7]\n    int ct_p1 = 6, ct_p2 = 7;\n    int wt_p1 = ct_p1 - 4;\n    int wt_p2 = ct_p2 - 3;\n    printf(\"%d %d\\n\", wt_p1, wt_p2);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "2 4",
      "4 2",
      "2 3",
      "3 4"
    ],
    "correctIndex": 0,
    "explanation": "WT(P1) = Completion(6) - Burst(4) = 2. WT(P2) = Completion(7) - Burst(3) = 4. Output: 2 4.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-17",
    "question": "What is the number of page faults for the reference string [7, 0, 1, 2, 0, 3] on an initially empty cache of 3 frames under LRU?",
    "options": [
      "4",
      "5",
      "6",
      "3"
    ],
    "correctIndex": 1,
    "explanation": "References: 7(Fault: [7]), 0(Fault: [7,0]), 1(Fault: [7,0,1]), 2(Fault, evicts 7: [2,0,1]), 0(Hit: [2,1,0]), 3(Fault, evicts 1: [2,0,3]). Total faults = 5.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-18",
    "question": "Trace the output of this C++ program validating mutual exclusion on Peterson's algorithm:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int flag[2] = {1, 0};\n    int turn = 1;\n    // Can P0 enter?\n    bool canP0 = (!flag[1] || turn == 0);\n    cout << (canP0 ? \"P0_ENTER\" : \"P0_WAIT\") << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "P0_ENTER",
      "P0_WAIT",
      "DEADLOCK",
      "ERROR"
    ],
    "correctIndex": 0,
    "explanation": "flag[1] is 0 (False), so !flag[1] is True. P0 can enter immediately.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-19",
    "question": "Trace the execution of this Java program checking Banker's Algorithm Work vector update:",
    "codeSnippet": "public class SafeUpdate {\n    public static void main(String[] args) {\n        int[] work = {3, 3, 2};\n        int[] alloc = {2, 0, 0};\n        for (int i = 0; i < 3; i++) work[i] += alloc[i];\n        System.out.printf(\"%d %d %d%n\", work[0], work[1], work[2]);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "5 3 2",
      "3 3 2",
      "1 3 2",
      "5 5 2"
    ],
    "correctIndex": 0,
    "explanation": "work becomes [3+2, 3+0, 2+0] = [5, 3, 2]. Output: 5 3 2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-20",
    "question": "Trace the output of this Python code calculating total head movement for LOOK disk scheduling:",
    "codeSnippet": "head = 50\nreq = [30, 70, 90] # Moving upward\n# LOOK services 70, 90 then reverses to 30 without hitting track 199\ntotal = (90 - 50) + (90 - 30)\nprint(total)",
    "codeLanguage": "python",
    "options": [
      "100",
      "110",
      "120",
      "90"
    ],
    "correctIndex": 0,
    "explanation": "Total head movement = (90 - 50) + (90 - 30) = 40 + 60 = 100 cylinders.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-21",
    "question": "What is the Average Turnaround Time for processes P1 (burst=3) and P2 (burst=5) arriving at t=0 under FCFS?",
    "options": [
      "5.5 ms",
      "4.0 ms",
      "6.0 ms",
      "8.0 ms"
    ],
    "correctIndex": 0,
    "explanation": "P1 finishes at 3 (TAT=3). P2 finishes at 8 (TAT=8). Avg TAT = (3 + 8) / 2 = 11 / 2 = 5.5 ms.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-22",
    "question": "Trace the output of this C code demonstrating fork() PID check:",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int pid = 0; // In child process\n    if (pid == 0) {\n        printf(\"CHILD_PROCESS\\n\");\n    } else {\n        printf(\"PARENT_PROCESS\\n\");\n    }\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "CHILD_PROCESS",
      "PARENT_PROCESS",
      "ERROR",
      "BOTH"
    ],
    "correctIndex": 0,
    "explanation": "In the child process, fork() returns 0, so CHILD_PROCESS is executed.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-23",
    "question": "A system has 16-bit virtual addresses and 1 KB (1024 bytes = 2^10) pages. How many entries exist in the Page Table?",
    "options": [
      "64 entries (2^6)",
      "1024 entries",
      "256 entries",
      "4096 entries"
    ],
    "correctIndex": 0,
    "explanation": "Offset requires 10 bits. Virtual page number has 16 - 10 = 6 bits. 2^6 = 64 page table entries.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-24",
    "question": "Trace the output of this C++ code simulating semaphore counting:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int sem = 1; // Binary semaphore\n    sem--; // wait()\n    int in_crit = (sem == 0) ? 1 : 0;\n    sem++; // signal()\n    cout << in_crit << \" \" << sem << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "1 1",
      "0 1",
      "1 0",
      "0 0"
    ],
    "correctIndex": 0,
    "explanation": "After wait, sem=0 (in_crit=1). After signal, sem=1. Output: 1 1.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-25",
    "question": "Trace the output of this Java code checking for deadlock in single-instance resources:",
    "codeSnippet": "public class DeadlockCheck {\n    public static void main(String[] args) {\n        // Cycle: P1 holds R1, wants R2. P2 holds R2, wants R1.\n        boolean hasCycle = true;\n        System.out.println(hasCycle ? \"DEADLOCK\" : \"SAFE\");\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "DEADLOCK",
      "SAFE",
      "TIMEOUT",
      "STARVATION"
    ],
    "correctIndex": 0,
    "explanation": "A cycle in a single-instance resource system implies a deadlock condition.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-26",
    "question": "Trace the output of this Python code calculating page fault penalty time:",
    "codeSnippet": "access_time = 100 # ns\nfault_service_time = 10000000 # 10 ms = 10^7 ns\np = 0.001 # 0.1% fault rate\nemat = (1 - p) * access_time + p * fault_service_time\nprint(int(emat))",
    "codeLanguage": "python",
    "options": [
      "10099",
      "1000",
      "100",
      "100000"
    ],
    "correctIndex": 0,
    "explanation": "emat = 0.999 * 100 + 0.001 * 10,000,000 = 99.9 + 10,000 = 10099.9 ns (~10099 ns).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-27",
    "question": "Trace the output of this C code computing average waiting time for SRTF with 2 jobs arriving at 0 and 1:",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    // P1 (0, 4), P2 (1, 1)\n    // t=0: P1 runs (0..1, rem 3)\n    // t=1: P2 runs (1..2, rem 0, completes at 2, WT=0)\n    // t=2: P1 runs (2..5, rem 0, completes at 5, WT=5-0-4=1)\n    int wt_p1 = 1, wt_p2 = 0;\n    printf(\"%.1f\\n\", (wt_p1 + wt_p2) / 2.0);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "0.5",
      "1.0",
      "1.5",
      "2.0"
    ],
    "correctIndex": 0,
    "explanation": "WT(P1) = 1, WT(P2) = 0. Average WT = (1 + 0) / 2 = 0.5 ms.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-28",
    "question": "Trace the output of this C++ program simulating reader count protection:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int readers = 0;\n    bool write_locked = false;\n    // Reader 1 enters\n    readers++;\n    if (readers == 1) write_locked = true;\n    cout << (write_locked ? \"WRITER_LOCKED\" : \"WRITER_FREE\") << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "WRITER_LOCKED",
      "WRITER_FREE",
      "DEADLOCK",
      "UNDEFINED"
    ],
    "correctIndex": 0,
    "explanation": "The first reader acquires the write lock to exclude all writers during active reading.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-29",
    "question": "Trace the output of this Java code evaluating Belady's Anomaly on FIFO with 3 vs 4 frames:",
    "codeSnippet": "public class Belady {\n    public static void main(String[] args) {\n        int faults3 = 9;\n        int faults4 = 10;\n        System.out.println(faults4 > faults3 ? \"ANOMALY_DETECTED\" : \"NORMAL\");\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "ANOMALY_DETECTED",
      "NORMAL",
      "ERROR",
      "EQUAL"
    ],
    "correctIndex": 0,
    "explanation": "Because 10 > 9, an anomaly is detected where more frames yield more faults.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-30",
    "question": "Trace the output of this Python code calculating total turnaround time for 3 processes finishing at t=4, t=7, t=10 arriving at t=0:",
    "codeSnippet": "ct = [4, 7, 10]\ntat = sum(ct)\navg_tat = tat / len(ct)\nprint(f\"{avg_tat:.1f}\")",
    "codeLanguage": "python",
    "options": [
      "7.0",
      "6.0",
      "8.0",
      "7.5"
    ],
    "correctIndex": 0,
    "explanation": "Average TAT = (4 + 7 + 10) / 3 = 21 / 3 = 7.0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-31",
    "question": "In an indexed file allocation scheme with 1 KB blocks and 4-byte addresses, a single index block contains how many disk block addresses?",
    "options": [
      "256 addresses",
      "1024 addresses",
      "128 addresses",
      "512 addresses"
    ],
    "correctIndex": 0,
    "explanation": "1 KB = 1024 bytes. 1024 / 4 bytes per pointer = 256 disk block addresses.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-32",
    "question": "What is the output of this C code checking if an LRU cache hit refreshes timestamp:",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int last_used = 2;\n    int current_time = 10;\n    // On hit:\n    last_used = current_time;\n    printf(\"%d\\n\", last_used);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "10",
      "2",
      "0",
      "8"
    ],
    "correctIndex": 0,
    "explanation": "A page hit refreshes the entry's last access timestamp to current_time (10).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-33",
    "question": "Trace the output of this C++ program testing Round-Robin scheduling completion condition:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int rem = 1, quantum = 2;\n    int slice = (rem < quantum) ? rem : quantum;\n    rem -= slice;\n    cout << (rem == 0 ? \"TASK_DONE\" : \"TASK_CONTINUES\") << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "TASK_DONE",
      "TASK_CONTINUES",
      "PREEMPTED",
      "BLOCKED"
    ],
    "correctIndex": 0,
    "explanation": "rem=1 < quantum=2, so slice=1 and remaining becomes 0. TASK_DONE.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-34",
    "question": "Trace the output of this Java code evaluating safe sequence order in Banker's Algorithm:",
    "codeSnippet": "public class SafeSeq {\n    public static void main(String[] args) {\n        String[] seq = {\"P1\", \"P3\", \"P2\"};\n        System.out.println(String.join(\" -> \", seq));\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "P1 -> P3 -> P2",
      "P1 -> P2 -> P3",
      "P3 -> P2 -> P1",
      "P2 -> P1 -> P3"
    ],
    "correctIndex": 0,
    "explanation": "The array elements are joined by arrows: P1 -> P3 -> P2.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-35",
    "question": "Trace the output of this Python code calculating total cylinder movements under C-SCAN from 50 moving up to 199, jumping to 0, then to 40:",
    "codeSnippet": "move = (199 - 50) + (199 - 0) + (40 - 0)\nprint(move)",
    "codeLanguage": "python",
    "options": [
      "388",
      "348",
      "398",
      "298"
    ],
    "correctIndex": 0,
    "explanation": "(199 - 50) = 149; (199 - 0) = 199; (40 - 0) = 40. Total = 149 + 199 + 40 = 388.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-36",
    "question": "If a process executes 5 non-nested fork() statements in a straight line, how many total processes are created?",
    "options": [
      "32",
      "16",
      "64",
      "10"
    ],
    "correctIndex": 0,
    "explanation": "2^5 = 32 total processes.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-37",
    "question": "Trace the output of this C code verifying mutual exclusion entry condition:",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int mutex = 1;\n    int enter = (mutex > 0);\n    if (enter) mutex--;\n    printf(\"%d %d\\n\", enter, mutex);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "1 0",
      "0 1",
      "1 1",
      "0 0"
    ],
    "correctIndex": 0,
    "explanation": "enter is 1, and mutex decrements to 0. Output: 1 0.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-38",
    "question": "Trace the output of this C++ snippet calculating page table index for 32-bit address with 12-bit offset:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    uint32_t addr = 0x00401050;\n    uint32_t page_num = addr >> 12;\n    cout << hex << page_num << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "401",
      "50",
      "4010",
      "40"
    ],
    "correctIndex": 0,
    "explanation": "Shifting right by 12 bits (3 hex digits) drops 0x050, leaving 0x401.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-39",
    "question": "Trace the output of this Java code checking for deadlock recovery termination:",
    "codeSnippet": "public class Recovery {\n    public static void main(String[] args) {\n        int victimPID = 104;\n        System.out.println(\"ABORTED_PID: \" + victimPID);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "ABORTED_PID: 104",
      "ABORTED_PID: 0",
      "SAFE",
      "IGNORE"
    ],
    "correctIndex": 0,
    "explanation": "Prints the aborted victim process ID 104.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-40",
    "question": "Trace the output of this Python code calculating total page faults under FIFO for [1, 2, 3, 1] with 2 frames:",
    "codeSnippet": "frames = []\nfaults = 0\nfor p in [1, 2, 3, 1]:\n    if p not in frames:\n        faults += 1\n        if len(frames) == 2:\n            frames.pop(0)\n        frames.append(p)\nprint(faults)",
    "codeLanguage": "python",
    "options": [
      "4",
      "3",
      "2",
      "1"
    ],
    "correctIndex": 0,
    "explanation": "1 faults ([1]), 2 faults ([1,2]), 3 faults (evicts 1, [2,3]), 1 faults (evicts 2, [3,1]). All 4 references fault.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-41",
    "question": "What is the CPU utilization if process computation time is 75 ms and context switch overhead is 25 ms?",
    "options": [
      "75.0%",
      "66.7%",
      "80.0%",
      "50.0%"
    ],
    "correctIndex": 0,
    "explanation": "CPU Utilization = 75 / (75 + 25) = 75 / 100 = 75.0%.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-42",
    "question": "Trace the output of this C code computing response time for task arriving at 2 and first scheduled at 5:",
    "codeSnippet": "#include <stdio.h>\nint main() {\n    int arrival = 2, first_run = 5;\n    int response = first_run - arrival;\n    printf(\"%d\\n\", response);\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "3",
      "2",
      "5",
      "7"
    ],
    "correctIndex": 0,
    "explanation": "Response Time = First CPU Allocation - Arrival = 5 - 2 = 3 ms.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-43",
    "question": "Trace the output of this C++ program checking memory barrier atomicity:",
    "codeSnippet": "#include <iostream>\n#include <atomic>\nusing namespace std;\nint main() {\n    atomic<int> counter{0};\n    counter.fetch_add(5);\n    cout << counter.load() << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "5",
      "0",
      "1",
      "10"
    ],
    "correctIndex": 0,
    "explanation": "fetch_add(5) atomically increments the counter from 0 to 5.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-44",
    "question": "Trace the output of this Java code evaluating circular wait prevention check:",
    "codeSnippet": "public class LockOrder {\n    public static void main(String[] args) {\n        int currentLock = 2;\n        int nextLock = 4;\n        boolean valid = nextLock > currentLock;\n        System.out.println(valid ? \"LOCK_ACQUISITION_VALID\" : \"ORDER_VIOLATION\");\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "LOCK_ACQUISITION_VALID",
      "ORDER_VIOLATION",
      "DEADLOCK",
      "BLOCKED"
    ],
    "correctIndex": 0,
    "explanation": "nextLock (4) > currentLock (2) adheres strictly to total ordering, preventing circular wait.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-45",
    "question": "Trace the output of this Python code calculating total context switches in FCFS for 4 jobs:",
    "codeSnippet": "n = 4\n# In FCFS, 4 non-preemptive jobs have 3 transitions between them\nswitches = n - 1\nprint(switches)",
    "codeLanguage": "python",
    "options": [
      "3",
      "4",
      "2",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "4 jobs require 3 context transitions between them.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-46",
    "question": "If physical RAM has 64 frames and 16 are reserved for the OS kernel, how many frames can user processes occupy?",
    "options": [
      "48 frames",
      "32 frames",
      "64 frames",
      "50 frames"
    ],
    "correctIndex": 0,
    "explanation": "64 - 16 = 48 frames available for user processes.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-47",
    "question": "Trace the output of this C code verifying thread state transition to TERMINATED:",
    "codeSnippet": "#include <stdio.h>\ntypedef enum { READY, RUNNING, TERMINATED } State;\nint main() {\n    State s = RUNNING;\n    s = TERMINATED;\n    printf(\"%s\\n\", s == TERMINATED ? \"CLEAN_EXIT\" : \"ACTIVE\");\n    return 0;\n}",
    "codeLanguage": "c",
    "options": [
      "CLEAN_EXIT",
      "ACTIVE",
      "ERROR",
      "READY"
    ],
    "correctIndex": 0,
    "explanation": "The state transitioned to TERMINATED, printing CLEAN_EXIT.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-48",
    "question": "Trace the output of this C++ code calculating memory internal fragmentation for 3500 bytes allocated in a 4096-byte page:",
    "codeSnippet": "#include <iostream>\nusing namespace std;\nint main() {\n    int page_size = 4096;\n    int used = 3500;\n    int frag = page_size - used;\n    cout << frag << \" bytes\" << endl;\n    return 0;\n}",
    "codeLanguage": "cpp",
    "options": [
      "596 bytes",
      "496 bytes",
      "600 bytes",
      "0 bytes"
    ],
    "correctIndex": 0,
    "explanation": "Internal fragmentation = 4096 - 3500 = 596 bytes.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-49",
    "question": "Trace the output of this Java code evaluating shortest seek time first step:",
    "codeSnippet": "public class SSTFNext {\n    public static void main(String[] args) {\n        int head = 100;\n        int r1 = 90, r2 = 120;\n        int chosen = (Math.abs(r1 - head) < Math.abs(r2 - head)) ? r1 : r2;\n        System.out.println(\"Next: \" + chosen);\n    }\n}",
    "codeLanguage": "java",
    "options": [
      "Next: 90",
      "Next: 120",
      "Next: 100",
      "Next: 0"
    ],
    "correctIndex": 0,
    "explanation": "|90 - 100| = 10 < |120 - 100| = 20. Closest is 90.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d6-post-50",
    "question": "What is the output of this Python code calculating total turnaround time under Round Robin with quantum=1 for burst=[2, 2]:",
    "codeSnippet": "# P1(rem 2), P2(rem 2)\n# t=0..1: P1 (rem 1)\n# t=1..2: P2 (rem 1)\n# t=2..3: P1 finishes at 3 (TAT=3)\n# t=3..4: P2 finishes at 4 (TAT=4)\ntat_sum = 3 + 4\nprint(tat_sum)",
    "codeLanguage": "python",
    "options": [
      "7",
      "6",
      "8",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "P1 finishes at t=3; P2 finishes at t=4. Sum of turnaround times = 3 + 4 = 7.",
    "category": "Practical Execution & Trace (70%)"
  }
];
