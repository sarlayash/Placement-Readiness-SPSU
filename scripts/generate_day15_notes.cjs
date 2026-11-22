const fs = require('fs');
const path = require('path');

const notes = [
  {
    id: 'd15-note-1',
    title: 'Machine Coding & Object-Oriented Domain Modeling (SOLID & Clean Architecture)',
    conceptSummary:
      'The 90-minute FAANG/Unicorn Machine Coding round evaluates clean architecture, SOLID principles, and extensibility. The core domain entities (e.g. Vehicle, ParkingSpot, Ticket) must be kept pure and decoupled from storage/repository interfaces and orchestration controllers. By applying the Strategy Pattern to variable business logic (e.g., Dynamic Pricing, Spot Selection Strategies) and Observer Pattern for event auditing, developers can introduce new features without modifying existing verified code (Open-Closed Principle).',
    timeSpaceNote: 'Time Complexity: O(1) for entity operations, O(F * S) for lowest-floor spot allocation. Space Complexity: O(F * S) grid state.',
    kapilMentorTip:
      'Kapil Machine Coding Strategy: First 15 minutes: Clarify requirements, draw class diagram with domain entities, and write interfaces. Next 45 minutes: Implement core domain and state transitions without fancy frameworks. Next 20 minutes: Add edge cases, invalid inputs, and concurrency synchronization. Final 10 minutes: Demonstrate unit tests and explain trade-offs.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <string.h>

typedef enum { VEHICLE_CAR, VEHICLE_BIKE, VEHICLE_TRUCK } VehicleType;

typedef struct {
    char license_plate[32];
    VehicleType type;
} Vehicle;

typedef struct PricingStrategy PricingStrategy;
struct PricingStrategy {
    double (*calculate_fee)(const PricingStrategy* self, int hours);
};

typedef struct {
    double hourly_rate;
} StandardPricing;

double standard_calc(const PricingStrategy* self, int hours) {
    const StandardPricing* sp = (const StandardPricing*)self;
    return sp->hourly_rate * hours;
}

int main(void) {
    StandardPricing sp = { .hourly_rate = 20.0 };
    PricingStrategy strategy = { .calculate_fee = standard_calc };
    printf("Parking Fee for 3 hours: $%.2f\\n", strategy.calculate_fee((PricingStrategy*)&sp, 3));
    return 0;
}`,
      cpp: `#include <iostream>
#include <memory>
#include <string>

enum class VehicleType { Car, Bike, Truck };

struct Vehicle {
    std::string licensePlate;
    VehicleType type;
};

class PricingStrategy {
public:
    virtual ~PricingStrategy() = default;
    virtual double calculateFee(int hours) const = 0;
};

class FlatRatePricing : public PricingStrategy {
private:
    double ratePerHour;
public:
    explicit FlatRatePricing(double rate) : ratePerHour(rate) {}
    double calculateFee(int hours) const override {
        return ratePerHour * hours;
    }
};

int main() {
    std::unique_ptr<PricingStrategy> pricing = std::make_unique<FlatRatePricing>(15.5);
    std::cout << "C++ Parking Fee (4 hrs): $" << pricing->calculateFee(4) << "\\n";
    return 0;
}`,
      java: `package com.faang.lld;

public class MachineCodingDemo {
    public enum VehicleType { CAR, BIKE, TRUCK }
    public record Vehicle(String licensePlate, VehicleType type) {}

    public interface PricingStrategy {
        double calculateFee(long durationHours);
    }

    public static class DynamicPricingStrategy implements PricingStrategy {
        private final double baseRate;
        public DynamicPricingStrategy(double baseRate) { this.baseRate = baseRate; }
        @Override
        public double calculateFee(long durationHours) {
            return baseRate * durationHours * 1.15; // 15% surge
        }
    }

    public static void main(String[] args) {
        PricingStrategy pricing = new DynamicPricingStrategy(25.0);
        System.out.println("Java Fee (2 hrs): $" + pricing.calculateFee(2));
    }
}`,
      python: `from abc import ABC, abstractmethod
from dataclasses import dataclass
from enum import Enum

class VehicleType(Enum):
    CAR = "CAR"
    BIKE = "BIKE"
    TRUCK = "TRUCK"

@dataclass(frozen=True)
class Vehicle:
    license_plate: str
    vehicle_type: VehicleType

class PricingStrategy(ABC):
    @abstractmethod
    def calculate_fee(self, hours: float) -> float:
        pass

class TieredPricingStrategy(PricingStrategy):
    def __init__(self, first_hour_rate: float, subsequent_rate: float):
        self.first_rate = first_hour_rate
        self.subsequent_rate = subsequent_rate

    def calculate_fee(self, hours: float) -> float:
        if hours <= 1:
            return self.first_rate
        return self.first_rate + (hours - 1) * self.subsequent_rate

if __name__ == "__main__":
    strategy = TieredPricingStrategy(10.0, 5.0)
    fee = strategy.calculate_fee(3.0)
    print("Python Parking Fee (3 hrs): $" + str(fee))
`
    }
  },
  {
    id: 'd15-note-2',
    title: 'Multi-Threaded Concurrency Primitives & Synchronization Patterns',
    conceptSummary:
      'High-performance concurrent systems avoid coarse global locks by deploying fine-grained synchronization: Reader-Writer Locks (allowing concurrent readers while granting exclusive access to writers), Condition Variables for thread signaling, and Bounded Blocking Buffers for producer-consumer workflows. When waiting on condition variables, always re-evaluate predicates inside a `while (!condition)` loop to defend against spurious wakeups. In lock-free systems, Compare-And-Swap (CAS) instructions mutate atomic references without kernel lock context switching.',
    timeSpaceNote: 'Time Complexity: O(1) lock acquisition in uncontented state. Space Complexity: O(1) synchronization state.',
    kapilMentorTip:
      'Kapil Invariant Rule: The Spurious Wakeup Invariant! Operating system threads can wake up from condition waits without any explicit signal. Never write `if (!ready) wait();` — always write `while (!ready) wait();`. When implementing reader-writer locks, keep track of `waiting_writers` to prevent writer starvation under continuous reader traffic.',
    codeByLanguage: {
      c: `#include <stdio.h>

typedef struct {
    int active_readers;
    int waiting_writers;
    int writer_active;
} SimpleRWLock;

void rw_init(SimpleRWLock* l) {
    l->active_readers = 0;
    l->waiting_writers = 0;
    l->writer_active = 0;
}

int can_read(SimpleRWLock* l) {
    return (l->writer_active == 0 && l->waiting_writers == 0);
}

int main(void) {
    SimpleRWLock lock;
    rw_init(&lock);
    printf("Can read initial: %d\\n", can_read(&lock));
    lock.waiting_writers = 1;
    printf("Can read with waiting writer: %d (Starvation prevented)\\n", can_read(&lock));
    return 0;
}`,
      cpp: `#include <iostream>
#include <shared_mutex>
#include <thread>

class ThreadSafeCounter {
private:
    mutable std::shared_mutex rwMutex;
    int count = 0;
public:
    int read() const {
        std::shared_lock<std::shared_mutex> lock(rwMutex);
        return count;
    }
    void increment() {
        std::unique_lock<std::shared_mutex> lock(rwMutex);
        count++;
    }
};

int main() {
    ThreadSafeCounter counter;
    counter.increment();
    std::cout << "C++ Shared Mutex Count: " << counter.read() << std::endl;
    return 0;
}`,
      java: `package com.faang.concurrency;

import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ConcurrencyDemo {
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
    private int sharedValue = 42;

    public int getValue() {
        rwLock.readLock().lock();
        try { return sharedValue; }
        finally { rwLock.readLock().unlock(); }
    }

    public void setValue(int v) {
        rwLock.writeLock().lock();
        try { sharedValue = v; }
        finally { rwLock.writeLock().unlock(); }
    }

    public static void main(String[] args) {
        ConcurrencyDemo demo = new ConcurrencyDemo();
        demo.setValue(999);
        System.out.println("Java RWLock Value: " + demo.getValue());
    }
}`,
      python: `import threading

class ThreadSafeResource:
    def __init__(self):
        self._lock = threading.RLock()
        self._cond = threading.Condition(self._lock)
        self._data = 0
        self._ready = False

    def produce(self, val: int):
        with self._cond:
            self._data = val
            self._ready = True
            self._cond.notify_all()

    def consume(self) -> int:
        with self._cond:
            while not self._ready:
                self._cond.wait()
            return self._data

if __name__ == "__main__":
    res = ThreadSafeResource()
    res.produce(777)
    print("Python Value:", res.consume())
`
    }
  },
  {
    id: 'd15-note-3',
    title: 'Thread-Safe In-Memory Cache with TTL Expiration & Eviction Policies',
    conceptSummary:
      'Designing an in-memory Key-Value store requires combining a Hash Map (for O(1) lookup) with an ordering data structure for eviction. For Least Recently Used (LRU) eviction, a Doubly Linked List enables O(1) node promotion to head and O(1) tail removal. Time-To-Live (TTL) expiration can be handled passively (lazy check on `get()` query) or actively (periodic background reaper thread scanning a min-heap of expiration timestamps). Fine-grained lock striping prevents global lock bottlenecks.',
    timeSpaceNote: 'Time Complexity: O(1) average for get(), put(), and delete(). Space Complexity: O(N) storage.',
    kapilMentorTip:
      'Kapil Invariant Rule: The Sentinel Node Trick! Always use dummy sentinel `head` and `tail` nodes in your doubly-linked list for LRU caches. This completely eliminates null pointer checks when inserting at the front or evicting from the back, preventing edge-case bugs under interview time pressure.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int key, val;
    struct Node *prev, *next;
} Node;

typedef struct {
    int cap, size;
    Node *head, *tail;
} SimpleLRU;

void init_lru(SimpleLRU* lru, int cap) {
    lru->cap = cap;
    lru->size = 0;
    lru->head = (Node*)malloc(sizeof(Node));
    lru->tail = (Node*)malloc(sizeof(Node));
    lru->head->next = lru->tail;
    lru->tail->prev = lru->head;
}

int main(void) {
    SimpleLRU lru;
    init_lru(&lru, 5);
    printf("LRU initialized with capacity %d\\n", lru.cap);
    return 0;
}`,
      cpp: `#include <iostream>
#include <unordered_map>
#include <list>
#include <optional>

class LRUCache {
    int cap;
    std::list<std::pair<int, int>> dll;
    std::unordered_map<int, std::list<std::pair<int, int>>::iterator> map;
public:
    explicit LRUCache(int cap) : cap(cap) {}

    std::optional<int> get(int key) {
        auto it = map.find(key);
        if (it == map.end()) return std::nullopt;
        dll.splice(dll.begin(), dll, it->second);
        return it->second->second;
    }
};

int main() {
    LRUCache lru(2);
    std::cout << "Empty get: " << lru.get(1).value_or(-1) << std::endl;
    return 0;
}`,
      java: `package com.faang.cache;

import java.util.LinkedHashMap;
import java.util.Map;

public class SimpleLRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;
    public SimpleLRUCache(int cap) {
        super(cap, 0.75f, true);
        this.capacity = cap;
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;
    }

    public static void main(String[] args) {
        SimpleLRUCache<String, Integer> cache = new SimpleLRUCache<>(2);
        cache.put("A", 1);
        cache.put("B", 2);
        System.out.println("Java LRU size: " + cache.size());
    }
}`,
      python: `from collections import OrderedDict

class ExpiringLRU:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: str):
        if key not in self.cache:
            return None
        self.cache.move_to_end(key)
        return self.cache[key]

if __name__ == '__main__':
    c = ExpiringLRU(2)
    print("LRU Initialized")
`
    }
  },
  {
    id: 'd15-note-4',
    title: 'Distributed Transactions, 2-Phase Commit & Saga Orchestration',
    conceptSummary:
      'In distributed architectures, cross-database consistency cannot be solved with single-machine ACID locks. Two-Phase Commit (2PC) guarantees atomic agreement across participants via Prepare and Commit phases, but blocks during coordinator crashes. The Saga Pattern replaces synchronous locking with a sequence of local transactions paired with compensating actions for failure rollback. Monotonic Fencing Tokens prevent delayed zombie clients from overwriting committed data after lease timeouts.',
    timeSpaceNote: 'Time Complexity: O(N) consensus coordination rounds. Space Complexity: O(N) participant state.',
    kapilMentorTip:
      'Kapil Distributed Systems Gold Standard: Whenever asked how to guarantee consistency across microservices, contrast 2PC with Saga: "2PC provides strong linearizable consistency but suffers from blocking vulnerability and high latency over WAN; Saga provides high availability and eventual consistency through compensating rollbacks." Always mention Martin Kleppmann fencing tokens for distributed locks.',
    codeByLanguage: {
      c: `#include <stdio.h>

int run_2pc(int votes[], int n) {
    for (int i = 0; i < n; ++i) {
        if (votes[i] == 0) return 0; // GLOBAL_ABORT
    }
    return 1; // GLOBAL_COMMIT
}

int main(void) {
    int v[] = {1, 1, 1};
    printf("2PC Result: %s\\n", run_2pc(v, 3) ? "GLOBAL_COMMIT" : "GLOBAL_ABORT");
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

enum class Decision { COMMIT, ABORT };

Decision coordinate2PC(const std::vector<bool>& votes) {
    for (bool v : votes) {
        if (!v) return Decision::ABORT;
    }
    return Decision::COMMIT;
}

int main() {
    std::cout << "Outcome: " << (coordinate2PC({true, true, true}) == Decision::COMMIT ? "COMMIT" : "ABORT") << std::endl;
    return 0;
}`,
      java: `package com.faang.transactions;

import java.util.List;

public class TwoPhaseCommitDemo {
    public static boolean coordinate(List<Boolean> votes) {
        return votes.stream().allMatch(Boolean::booleanValue);
    }

    public static void main(String[] args) {
        System.out.println("2PC Java: " + coordinate(List.of(true, true, true)));
    }
}`,
      python: `from typing import List

def coordinate_2pc(votes: List[bool]) -> str:
    return "GLOBAL_COMMIT" if all(votes) else "GLOBAL_ABORT"

if __name__ == '__main__':
    print("2PC:", coordinate_2pc([True, True, True]))
`
    }
  },
  {
    id: 'd15-note-5',
    title: 'FAANG Technical Interview Mastery: Whiteboarding, Trade-Offs & Edge Cases',
    conceptSummary:
      'The FAANG technical coding and system design interviews are scored on structured decomposition, clear communication, invariant proofs, and defensive edge-case verification. Candidates must practice the 5-Step Clarification Framework: 1) Clarify inputs, outputs, data volumes, and constraints; 2) Verbalize brute force and Big-O baseline; 3) Formulate optimal data structure / math invariant; 4) Code cleanly with defensive guard clauses; 5) Dry-run edge cases (empty inputs, zero, negatives, duplicates, integer overflow) aloud before signaling completion.',
    timeSpaceNote: 'Time Complexity: Rigorous worst-case O(T). Space Complexity: Auxiliary stack and heap space O(S).',
    kapilMentorTip:
      'Kapil Final Placement Mantra: Clean code is not just working code; it is code your peers can understand at 3 AM during a production outage. Name variables intentionally, check boundary bounds upfront, communicate your invariant aloud, and handle edge cases gracefully.',
    codeByLanguage: {
      c: `#include <stdio.h>
#include <stdbool.h>

bool safe_divide(int a, int b, int* res) {
    if (b == 0 || res == NULL) return false;
    *res = a / b;
    return true;
}

int main(void) {
    int out = 0;
    if (safe_divide(100, 5, &out)) printf("Division: %d\\n", out);
    return 0;
}`,
      cpp: `#include <iostream>
#include <optional>

std::optional<int> safeDivide(int a, int b) {
    if (b == 0) return std::nullopt;
    return a / b;
}

int main() {
    auto res = safeDivide(100, 4);
    if (res) std::cout << "Safe divide: " << *res << std::endl;
    return 0;
}`,
      java: `package com.faang.interview;

public class SafeMath {
    public static int binarySearch(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2; // Prevent 32-bit overflow
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9};
        System.out.println("Search 7: " + binarySearch(arr, 7));
    }
}`,
      python: `def binary_search(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = l + (r - l) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            l = mid + 1
        else:
            r = mid - 1
    return -1

if __name__ == '__main__':
    print("Index of 5:", binary_search([1, 3, 5, 7], 5))
`
    }
  }
];

const content = `import { ProgrammingNote } from '../types';

/**
 * Day 15 High-Yield Polyglot Programming Notes (5 Placement Mastery Notes)
 * Module 16: Real-World Technical Interview Simulation, Machine Coding & Comprehensive Placement Grand Finale
 * Mentor: Kapil (Placement Readiness Program)
 * Full Polyglot Coverage: C (C17), C++ (C++20), Java (Java 21), Python (Python 3.12)
 */

export const DAY_15_PROGRAMMING_NOTES: ProgrammingNote[] = ${JSON.stringify(notes, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/day15ProgrammingNotes.ts'), content, 'utf8');
console.log('Successfully wrote src/data/day15ProgrammingNotes.ts');
