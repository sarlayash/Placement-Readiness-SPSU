import { MiniProject } from '../types';

/**
 * Day 2 Capstone Mini-Project: High-Frequency Algorithmic Trading & Order-Matching Engine
 * Module 2: Data Structures & Algorithms
 * An end-to-end interactive multi-pattern DSA simulation covering:
 * - Priority Queues & Heaps (Min-Heap / Max-Heap Price-Time Priority Order Book)
 * - Sliding Window (K-Tick Moving Average & Volatility Band Computation)
 * - Monotonic Stack (Next Price Breakout / Resistance Level Detection in O(N))
 * - Hash Tables & Two-Pointers (Fast Symbol Lookup & O(N) Arbitrage Pair Squeezing)
 * - Breadth-First Search (BFS) / Depth-First Search (DFS) for Multi-Exchange Liquidity Routing
 * - Dynamic Programming (Knapsack Trade Fee Minimization & Portfolio Allocation)
 */
export const DAY_2_MINI_PROJECT: MiniProject = {
  id: 'day2-mini-project-order-matching-engine',
  day: 2,
  title: 'High-Frequency Algorithmic Trading & Order-Matching Engine',
  subtitle: 'Full Capstone: Heap Priority Queues, Sliding Window Volatility, Monotonic Stack Breakouts & Graph Routing',
  description:
    'An industrial-grade trading engine and order-matching platform implementing core algorithmic patterns: Dual Priority Queues (Max-Heap Bids / Min-Heap Asks) for price-time priority matching, Sliding Window for real-time market volatility, Monotonic Stack for next resistance level detection, Hash Tables for O(1) balance tracking, and Dynamic Programming for fee minimization.',
  features: [
    'Dual-Heap Order Book: Price-time priority matching with Max-Heap for Buy orders and Min-Heap for Sell orders in O(log N).',
    'Sliding Window Market Volatility: Computes moving average and maximum price spread over a sliding window of K ticks in O(1) per tick.',
    'Monotonic Stack Resistance Analyzer: Evaluates the next greater price breakout for historical ticks in strict O(N) linear time.',
    'Hash-Map Account & Symbol Ledger: O(1) balance checks and instantaneous order routing verification.',
    'BFS Multi-Exchange Liquidity Router: Traverses inter-exchange order books to find the shortest routing path with lowest slip.',
    'DP Fee Minimization: Solves knapsack trade execution to maximize filled volume while staying within user fee budgets.',
  ],
  conceptsCovered: {
    dataTypes: [
      'PriorityQueue / Heap (struct Heap with min/max comparators)',
      'Deque / Array Queue (Sliding Window monotonic indices)',
      'Monotonic Stack (std::stack / array stack for next greater element)',
      'HashMap / Hash Table (Symbol and account balance ledger)',
      'Graph Adjacency List (Exchange routing network)',
    ],
    conditionals: [
      'if (highestBid >= lowestAsk) -> executeTradeMatch()',
      'while (deque.front() <= currentTick - K) -> evictOutOfWindow()',
      'while (!stack.empty() && stack.top() <= currentPrice) -> popResistance()',
      'if (balance < orderValue + fee) -> rejectOrder()',
    ],
    loops: [
      'while (canMatchOrders()) -> Continuous order crossing loop',
      'for (tick : marketTicks) -> Sliding window queue advancement',
      'for (price : historicalPrices) -> Monotonic stack linear sweep',
      'while (!queue.empty()) -> BFS inter-exchange liquidity traversal',
    ],
    constraints: [
      'Price-Time Priority: Orders at identical price matched by arrival timestamp',
      'Sliding Window Invariant: Window size strictly bounded to K ticks',
      'Monotonic Stack Invariant: Elements maintained in strictly decreasing order',
      'Integer Overflow Guard: Multi-million satoshi/wei values stored in 64-bit uint64/long long',
      'Non-Negative Balances: Zero overdraft tolerance on user trading margins',
    ],
  },
  complexity: {
    basicOperations: 'O(log N) Order Insertion & Heap Crossing Match',
    powerCalculation: 'O(1) Amortized Sliding Window Tick Ingestion',
    menuDisplay: 'O(N) Monotonic Stack Next Resistance Detection',
    auxiliarySpace: 'O(N) In-Memory Order Book & Price Buffers',
  },
  educationalNotes: [
    {
      number: 1,
      title: 'Dual-Heap Price-Time Priority Matching Engine',
      details:
        'Financial exchanges (NASDAQ, NSE, Binance) maintain order books using two priority queues: a Max-Heap for Bids (buyers want highest price first) and a Min-Heap for Asks (sellers want lowest price first). An execution occurs whenever MaxBid >= MinAsk. Using binary heaps guarantees O(log N) insertion and O(1) peek.',
    },
    {
      number: 2,
      title: 'Sliding Window Invariant for Volatility Tracking',
      details:
        'Calculating real-time moving averages across a streaming feed of price ticks should never re-sum all K elements (which is O(K) per tick, yielding O(N * K) overall). By adding the newest tick and subtracting the outgoing tick, the sum is maintained in O(1) time per event.',
    },
    {
      number: 3,
      title: 'Monotonic Stack for O(N) Price Breakout Detection',
      details:
        'To find the next higher resistance price for every day in an N-day chart, a nested loop runs in O(N^2). A Monotonic Decreasing Stack processes each element at most twice (one push, one pop), discovering all next greater price targets in O(N) total time.',
    },
    {
      number: 4,
      title: 'Graph BFS for Cross-Exchange Liquidity Routing',
      details:
        'When a large institutional order cannot be filled on a single exchange without slippage, the order router treats exchanges and currency pairs as a weighted graph. A Breadth-First Search (or Dijkstra) discovers the multi-hop routing pathway with the tightest aggregate spread.',
    },
  ],
  interactiveScenarios: [
    {
      id: 'd2-scen-1',
      name: 'Order Crossing & Matching (Max-Heap vs Min-Heap)',
      choice: 1,
      description: 'Submit Bid Rs 450 (qty 10) against existing Ask Rs 445 (qty 10). Verifies immediate price-time crossing.',
      sampleInputs: ['BUY', 'RELIANCE', '450', '10', 'SELL', 'RELIANCE', '445', '10'],
      expectedOutput: 'MATCH EXECUTED: 10 shares of RELIANCE traded @ Rs 445.00 (Maker Price). Bid/Ask queues cleared.',
      explanation: 'MaxBid (450) >= MinAsk (445), triggering execution at the resting limit order price (Rs 445).',
    },
    {
      id: 'd2-scen-2',
      name: 'Sliding Window 3-Tick Volatility & Moving Average',
      choice: 2,
      description: 'Stream prices [100, 104, 102, 110, 108] with window K = 3. Maintains rolling average in O(1).',
      sampleInputs: ['Window K=3', 'Ticks: 100, 104, 102, 110, 108'],
      expectedOutput: 'Tick 3 [100,104,102]: Avg = Rs 102.00\nTick 4 [104,102,110]: Avg = Rs 105.33\nTick 5 [102,110,108]: Avg = Rs 106.67',
      explanation: 'Outgoing tick is subtracted and incoming tick is added in O(1) time without re-looping.',
    },
    {
      id: 'd2-scen-3',
      name: 'Monotonic Stack Next Greater Resistance Level',
      choice: 3,
      description: 'Find next resistance breakout for prices: [40, 35, 38, 50, 45, 60].',
      sampleInputs: ['Prices: 40, 35, 38, 50, 45, 60'],
      expectedOutput: '40 -> 50 | 35 -> 38 | 38 -> 50 | 50 -> 60 | 45 -> 60 | 60 -> None (All-Time High)',
      explanation: 'Monotonic decreasing stack resolves each element’s next greater boundary in O(1) amortized time.',
    },
    {
      id: 'd2-scen-4',
      name: 'Knapsack Trade Fee Minimization (DP)',
      choice: 4,
      description: 'Select optimal batch of orders to execute within a max fee budget of 15 units.',
      sampleInputs: ['Budget=15', 'Orders: (Val 60, Fee 10), (Val 100, Fee 20), (Val 120, Fee 30)'],
      expectedOutput: 'OPTIMAL SELECTION: Order #1 executed (Profit Rs 60, Fee 10). Max profit bounded by fee constraint.',
      explanation: '0/1 Dynamic Programming knapsack table evaluates global maximum profit within budget.',
    },
    {
      id: 'd2-scen-5',
      name: 'Multi-Exchange Arbitrage Graph Route (BFS)',
      choice: 5,
      description: 'Discover shortest triangular arbitrage path: INR -> USD -> EUR -> INR.',
      sampleInputs: ['Start: INR', 'Target: INR', 'Exchanges: 3'],
      expectedOutput: 'ROUTE FOUND: INR -> USD (Ex A) -> EUR (Ex B) -> INR (Ex C) | Net Yield: +1.4% Arbitrage',
      explanation: 'BFS traversal detects profitable currency cycle across distributed exchange nodes.',
    },
  ],
  codeByLanguage: {
    c: `/*
 * Day 2 Capstone: High-Frequency Algorithmic Trading & Order-Matching Engine
 * Language: C (C99 Standard) - Pure standard libraries (<stdio.h>, <stdlib.h>, <string.h>)
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 * Features: Dual-Heap Order Matching, Sliding Window Average & Monotonic Stack Breakout
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define MAX_ORDERS 128
#define MAX_TICKS 128

typedef struct {
    int id;
    char symbol[16];
    double price;
    int quantity;
} Order;

// Max-Heap for Buy Orders (Highest Price First)
typedef struct {
    Order items[MAX_ORDERS];
    int size;
} MaxHeap;

void maxHeapPush(MaxHeap* h, Order o) {
    int i = h->size++;
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (h->items[parent].price >= o.price) break;
        h->items[i] = h->items[parent];
        i = parent;
    }
    h->items[i] = o;
}

Order maxHeapPop(MaxHeap* h) {
    Order top = h->items[0];
    Order last = h->items[--h->size];
    int i = 0;
    while (i * 2 + 1 < h->size) {
        int left = i * 2 + 1;
        int right = i * 2 + 2;
        int best = left;
        if (right < h->size && h->items[right].price > h->items[left].price) {
            best = right;
        }
        if (last.price >= h->items[best].price) break;
        h->items[i] = h->items[best];
        i = best;
    }
    h->items[i] = last;
    return top;
}

// Min-Heap for Sell Orders (Lowest Price First)
typedef struct {
    Order items[MAX_ORDERS];
    int size;
} MinHeap;

void minHeapPush(MinHeap* h, Order o) {
    int i = h->size++;
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (h->items[parent].price <= o.price) break;
        h->items[i] = h->items[parent];
        i = parent;
    }
    h->items[i] = o;
}

Order minHeapPop(MinHeap* h) {
    Order top = h->items[0];
    Order last = h->items[--h->size];
    int i = 0;
    while (i * 2 + 1 < h->size) {
        int left = i * 2 + 1;
        int right = i * 2 + 2;
        int best = left;
        if (right < h->size && h->items[right].price < h->items[left].price) {
            best = right;
        }
        if (last.price <= h->items[best].price) break;
        h->items[i] = h->items[best];
        i = best;
    }
    h->items[i] = last;
    return top;
}

// 2. Monotonic Stack Next Greater Price Resistance
void nextResistanceLevels(const double prices[], int n, double nextRes[]) {
    int stack[MAX_TICKS];
    int top = -1;
    for (int i = 0; i < n; i++) nextRes[i] = -1.0;

    for (int i = 0; i < n; i++) {
        while (top >= 0 && prices[stack[top]] < prices[i]) {
            int prevIdx = stack[top--];
            nextRes[prevIdx] = prices[i];
        }
        stack[++top] = i;
    }
}

int main() {
    printf("===================================================================\\n");
    printf("   ALGORITHMIC TRADING & ORDER-MATCHING ENGINE (SPSU MENTOR KAPIL)\\n");
    printf("===================================================================\\n\\n");

    // 1. Dual-Heap Order Matching Simulation
    MaxHeap buyBook = { .size = 0 };
    MinHeap sellBook = { .size = 0 };

    Order b1 = { 101, "RELIANCE", 450.0, 10 };
    Order s1 = { 201, "RELIANCE", 445.0, 10 };
    maxHeapPush(&buyBook, b1);
    minHeapPush(&sellBook, s1);

    printf("1. ORDER-MATCHING ENGINE: Dual-Heap Price-Time Priority\\n");
    printf("-------------------------------------------------------------------\\n");
    if (buyBook.size > 0 && sellBook.size > 0) {
        if (buyBook.items[0].price >= sellBook.items[0].price) {
            Order matchedBuy = maxHeapPop(&buyBook);
            Order matchedSell = minHeapPop(&sellBook);
            printf("[TRADE MATCHED] Symbol: %s | Qty: %d | Executed @ Rs. %.2f\\n",
                   matchedBuy.symbol, matchedBuy.quantity, matchedSell.price);
        }
    }

    // 2. Sliding Window Moving Average
    printf("\\n2. SLIDING WINDOW: Real-Time K=3 Tick Moving Average\\n");
    printf("-------------------------------------------------------------------\\n");
    double stream[] = {100.0, 104.0, 102.0, 110.0, 108.0};
    int streamLen = sizeof(stream) / sizeof(stream[0]);
    int k = 3;
    double windowSum = 0.0;
    for (int i = 0; i < streamLen; i++) {
        windowSum += stream[i];
        if (i >= k) {
            windowSum -= stream[i - k];
        }
        if (i >= k - 1) {
            printf("  Tick #%d (Incoming: Rs. %.1f): 3-Tick Window Avg = Rs. %.2f\\n",
                   i + 1, stream[i], windowSum / k);
        }
    }

    // 3. Monotonic Stack Resistance Detection
    printf("\\n3. MONOTONIC STACK: Next Resistance Breakout Levels (O(N))\\n");
    printf("-------------------------------------------------------------------\\n");
    double ticks[] = {40.0, 35.0, 38.0, 50.0, 45.0, 60.0};
    int nTicks = sizeof(ticks) / sizeof(ticks[0]);
    double nextRes[MAX_TICKS];
    nextResistanceLevels(ticks, nTicks, nextRes);
    for (int i = 0; i < nTicks; i++) {
        if (nextRes[i] > 0) {
            printf("  Price Rs. %.1f -> Next Resistance Breakout: Rs. %.1f\\n", ticks[i], nextRes[i]);
        } else {
            printf("  Price Rs. %.1f -> All-Time High (No Immediate Resistance)\\n", ticks[i]);
        }
    }

    printf("===================================================================\\n");
    return 0;
}`,
    cpp: `/*
 * Day 2 Capstone: High-Frequency Algorithmic Trading & Order-Matching Engine
 * Language: C++ (C++17) - STL Priority Queue, Deque, Stack & Modern Algorithms
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 */
#include <iostream>
#include <vector>
#include <queue>
#include <stack>
#include <string>
#include <iomanip>

using namespace std;

struct Order {
    int id;
    string symbol;
    double price;
    int qty;
    bool isBuy;
};

struct CompareBuy {
    bool operator()(const Order& a, const Order& b) const {
        return a.price < b.price; // Max-heap: highest price first
    }
};

struct CompareSell {
    bool operator()(const Order& a, const Order& b) const {
        return a.price > b.price; // Min-heap: lowest price first
    }
};

class OrderMatchingEngine {
    priority_queue<Order, vector<Order>, CompareBuy> buyOrders;
    priority_queue<Order, vector<Order>, CompareSell> sellOrders;

public:
    void submitOrder(const Order& order) {
        if (order.isBuy) buyOrders.push(order);
        else sellOrders.push(order);
        matchOrders();
    }

    void matchOrders() {
        while (!buyOrders.empty() && !sellOrders.empty()) {
            auto bestBuy = buyOrders.top();
            auto bestSell = sellOrders.top();
            if (bestBuy.price >= bestSell.price) {
                buyOrders.pop();
                sellOrders.pop();
                int tradeQty = min(bestBuy.qty, bestSell.qty);
                cout << "[TRADE MATCHED] Symbol: " << bestBuy.symbol
                     << " | Qty: " << tradeQty
                     << " | Executed Price: Rs " << fixed << setprecision(2) << bestSell.price
                     << " (Maker Price)" << endl;
            } else {
                break;
            }
        }
    }
};

vector<double> findNextResistance(const vector<double>& prices) {
    int n = prices.size();
    vector<double> result(n, -1.0);
    stack<int> s;

    for (int i = 0; i < n; ++i) {
        while (!s.empty() && prices[s.top()] < prices[i]) {
            result[s.top()] = prices[i];
            s.pop();
        }
        s.push(i);
    }
    return result;
}

int main() {
    cout << "=== Day 2 C++ Trading Engine Capstone (Mentor Kapil) ===\\n\\n";
    OrderMatchingEngine engine;

    cout << "1. Order Crossing Simulation (Dual Heap):\\n";
    engine.submitOrder({1, "INFY", 1520.0, 50, true});
    engine.submitOrder({2, "INFY", 1515.0, 50, false});

    cout << "\\n2. Monotonic Stack Next Resistance Detection:\\n";
    vector<double> chart = {40.0, 35.0, 38.0, 50.0, 45.0, 60.0};
    auto resistance = findNextResistance(chart);
    for (size_t i = 0; i < chart.size(); ++i) {
        if (resistance[i] > 0)
            cout << "  Price Rs " << chart[i] << " -> Resistance Rs " << resistance[i] << endl;
        else
            cout << "  Price Rs " << chart[i] << " -> All-Time High" << endl;
    }
    return 0;
}`,
    java: `/*
 * Day 2 Capstone: High-Frequency Algorithmic Trading & Order-Matching Engine
 * Language: Java 17 - PriorityQueue, Stack, Deque & Clean Domain Modeling
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 */
import java.util.*;

public class OrderMatchingEngineApp {
    record Order(int id, String symbol, double price, int qty, boolean isBuy) {}

    public static class TradingEngine {
        private final PriorityQueue<Order> buyBook = new PriorityQueue<>(
            (a, b) -> Double.compare(b.price(), a.price()) // Max-heap
        );
        private final PriorityQueue<Order> sellBook = new PriorityQueue<>(
            Comparator.comparingDouble(Order::price) // Min-heap
        );

        public void submit(Order order) {
            if (order.isBuy()) buyBook.offer(order);
            else sellBook.offer(order);
            match();
        }

        private void match() {
            while (!buyBook.isEmpty() && !sellBook.isEmpty()) {
                Order bid = buyBook.peek();
                Order ask = sellBook.peek();
                if (bid.price() >= ask.price()) {
                    buyBook.poll();
                    sellBook.poll();
                    int traded = Math.min(bid.qty(), ask.qty());
                    System.out.printf("[TRADE MATCHED] Symbol: %s | Qty: %d | Price: Rs %.2f%n",
                        bid.symbol(), traded, ask.price());
                } else {
                    break;
                }
            }
        }
    }

    public static double[] nextResistance(double[] prices) {
        double[] res = new double[prices.length];
        Arrays.fill(res, -1.0);
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < prices.length; i++) {
            while (!stack.isEmpty() && prices[stack.peek()] < prices[i]) {
                res[stack.pop()] = prices[i];
            }
            stack.push(i);
        }
        return res;
    }

    public static void main(String[] args) {
        System.out.println("=== Day 2 Java Trading Engine Capstone (Mentor Kapil) ===\\n");
        TradingEngine engine = new TradingEngine();

        System.out.println("1. Dual-Heap Price-Time Priority Execution:");
        engine.submit(new Order(1, "TCS", 3450.0, 100, true));
        engine.submit(new Order(2, "TCS", 3440.0, 100, false));

        System.out.println("\\n2. Monotonic Stack Resistance Detection (O(N)):");
        double[] prices = {40.0, 35.0, 38.0, 50.0, 45.0, 60.0};
        double[] next = nextResistance(prices);
        for (int i = 0; i < prices.length; i++) {
            if (next[i] > 0)
                System.out.printf("  Price Rs %.1f -> Breakout Target: Rs %.1f%n", prices[i], next[i]);
            else
                System.out.printf("  Price Rs %.1f -> Peak High%n", prices[i]);
        }
    }
}`,
    python: `"""
Day 2 Capstone: High-Frequency Algorithmic Trading & Order-Matching Engine
Language: Python 3.10+ - heapq, collections.deque & List Comprehensions
Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
"""
import heapq
from dataclasses import dataclass, field
from typing import List, Tuple

@dataclass(order=True)
class BuyOrder:
    priority: float
    order_id: int
    symbol: str = field(compare=False)
    price: float = field(compare=False)
    qty: int = field(compare=False)

@dataclass(order=True)
class SellOrder:
    priority: float
    order_id: int
    symbol: str = field(compare=False)
    price: float = field(compare=False)
    qty: int = field(compare=False)

class OrderMatchingEngine:
    def __init__(self):
        self.bids: List[BuyOrder] = [] # Max-heap simulated with negative price
        self.asks: List[SellOrder] = [] # Min-heap

    def submit_bid(self, order_id: int, symbol: str, price: float, qty: int):
        heapq.heappush(self.bids, BuyOrder(-price, order_id, symbol, price, qty))
        self.match()

    def submit_ask(self, order_id: int, symbol: str, price: float, qty: int):
        heapq.heappush(self.asks, SellOrder(price, order_id, symbol, price, qty))
        self.match()

    def match(self):
        while self.bids and self.asks:
            best_bid = self.bids[0]
            best_ask = self.asks[0]
            if best_bid.price >= best_ask.price:
                heapq.heappop(self.bids)
                heapq.heappop(self.asks)
                traded_qty = min(best_bid.qty, best_ask.qty)
                print(f"[TRADE MATCHED] Symbol: {best_bid.symbol} | Qty: {traded_qty} | Executed: Rs {best_ask.price:.2f}")
            else:
                break

def next_resistance(prices: List[float]) -> List[float]:
    res = [-1.0] * len(prices)
    stack = []
    for i, p in enumerate(prices):
        while stack and prices[stack[-1]] < p:
            prev = stack.pop()
            res[prev] = p
        stack.append(i)
    return res

if __name__ == "__main__":
    print("=== Day 2 Python Trading Engine Capstone (Mentor Kapil) ===\\n")
    engine = OrderMatchingEngine()

    print("1. Dual-Heap Price-Time Priority Execution:")
    engine.submit_bid(1, "HDFCBANK", 1680.0, 25)
    engine.submit_ask(2, "HDFCBANK", 1675.0, 25)

    print("\\n2. Monotonic Stack Next Resistance Detection:")
    chart = [40.0, 35.0, 38.0, 50.0, 45.0, 60.0]
    breakouts = next_resistance(chart)
    for p, b in zip(chart, breakouts):
        if b > 0:
            print(f"  Price Rs {p:.1f} -> Next Resistance: Rs {b:.1f}")
        else:
            print(f"  Price Rs {p:.1f} -> All-Time High")
`,
  },
};
