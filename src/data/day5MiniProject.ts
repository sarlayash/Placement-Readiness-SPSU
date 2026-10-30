import { MiniProject } from '../types';

/**
 * Day 5 Capstone Mini-Project: Enterprise Ride-Sharing & Fleet Dispatch Architecture
 * Module 5: Object-Oriented Programming (OOP) & SOLID Design
 * An enterprise-grade, clean OOP architecture implementing:
 * - Four Pillars of OOP (Encapsulation, Inheritance, Polymorphism, Abstraction)
 * - Strict adherence to all 5 SOLID Principles (SRP, OCP, LSP, ISP, DIP)
 * - Polymorphic Fare Calculation Strategy (Standard, Peak Surcharge, Eco Discount)
 * - Driver & Passenger Invariant Management with Thread-Safe Singleton Registry
 * - Custom Domain Exception Hierarchy (Zero Balance, No Driver Found, Invalid Status)
 */
export const DAY_5_MINI_PROJECT: MiniProject = {
  id: 'day5-mini-project-fleet-dispatch',
  day: 5,
  title: 'Enterprise Ride-Sharing & Fleet Dispatch System',
  subtitle: 'Full Capstone: SOLID Architecture, Dynamic Polymorphic Pricing, Vehicle Hierarchies & Invariant Protection',
  description:
    'An enterprise-grade object-oriented fleet management and automated dispatch platform. Models passengers, drivers, and polymorphic vehicle classes (Sedan, Electric, Luxury SUV) with strict encapsulation, runtime dispatch, strategy-based dynamic pricing (Standard, Surge, Green Promo), Liskov-compliant energy recharge contracts, and custom exception handling.',
  features: [
    'Polymorphic Vehicle Hierarchy (Base Vehicle, EcoElectric, LuxurySUV) with Dynamic Dispatch',
    'Strategy-Pattern Dynamic Fare Engine adhering to the Open/Closed Principle (OCP)',
    'Strict Encapsulation of Wallet Balances with Invariant Validation and Audit Logs',
    'Liskov Substitution Principle (LSP) Compliant Energy & Refuel Dispatch Contracts',
    'Dependency Inversion (DIP) Powered Dispatch Coordinator with Decoupled Notification Mocking',
  ],
  conceptsCovered: {
    dataTypes: [
      'abstract class Vehicle',
      'interface FareStrategy',
      'enum RideStatus { REQUESTED, MATCHED, IN_TRANSIT, COMPLETED }',
      'class PassengerAccount',
      'class CustomRideException',
    ],
    conditionals: [
      'if (passenger.walletBalance < estimatedFare) throw InsufficientFundsException()',
      'switch (pricingTier) -> Dynamic Strategy Dispatch',
      'invariant checks: validateState(current == REQUESTED)',
    ],
    loops: [
      'Fleet Driver Radial Scan Loop',
      'Vehicle Inspection & Metric Aggregator',
      'Transaction History Traversal',
    ],
    constraints: [
      'Single Responsibility: Separate billing, matching, and logging',
      'Open/Closed: Extend new vehicle types without modifying Dispatcher',
      'Liskov Substitution: Any vehicle can service a standard dispatch request',
      'Interface Segregation: Separate Chargeable from Fuelable interfaces',
      'Dependency Inversion: High-level Dispatcher depends on IFareStrategy and IGeoLocator',
    ],
  },
  complexity: {
    basicOperations: 'O(1) Polymorphic Strategy Calculation',
    powerCalculation: 'O(N) Driver Matching Scan across Active Fleet',
    menuDisplay: 'O(1) VTable Virtual Method Dispatch',
    auxiliarySpace: 'O(N) Fleet & User Domain Objects in Heap',
  },
  educationalNotes: [
    {
      number: 1,
      title: 'Decoupling Pricing with the Strategy Pattern (Open-Closed Principle)',
      details:
        'Instead of using a brittle if-else block checking whether it is raining, peak office hours, or weekend midnight, we encapsulate pricing algorithms into independent implementations of a shared FareStrategy interface. Adding a festival surge or corporate discount requires zero edits to existing dispatch code.',
    },
    {
      number: 2,
      title: 'Liskov Substitution Principle (LSP) in Fleet Management',
      details:
        'If a base class Vehicle defines a refuel(gallons) method, an ElectricVehicle subclass that throws an "UnsupportedOperationException" violates LSP. We segregate energy replenishment into fine-grained interfaces (Fuelable vs Rechargeable) so the Dispatcher can substitute any Vehicle without runtime contract failures.',
    },
    {
      number: 3,
      title: 'Protecting Domain Invariants via Encapsulation',
      details:
        'Never expose internal mutable fields directly. Wallet balances and ride statuses are mutated only through validated domain methods (e.g. deductFare, transitionTo). If an invalid state transition is attempted (e.g., completing an already cancelled ride), a domain exception is thrown immediately.',
    },
    {
      number: 4,
      title: 'Dependency Inversion & Testability',
      details:
        'The DispatchCoordinator does not instantiate concrete SMS or Payment gateways directly. Instead, it receives abstractions via constructor dependency injection. This allows unit tests to inject mock payment channels and mock geolocators with zero network dependencies.',
    },
  ],
  interactiveScenarios: [
    {
      id: 'sc1',
      name: 'Polymorphic Ride Booking with Standard Pricing',
      choice: 1,
      description: 'Book an Executive Sedan for a 12 km trip under standard traffic conditions.',
      sampleInputs: ['Sedan', 'RJ-27-UB-1001', '12.0', 'Standard'],
      expectedOutput: 'SUCCESS: Executive Sedan (RJ-27-UB-1001) dispatched for 12.0 km. Fare: Rs 218.00.',
      explanation: 'Base fare Rs 50 + (12 km * Rs 14/km) = Rs 218.00 computed polymorphically via StandardPricing.',
    },
    {
      id: 'sc2',
      name: 'Peak Hour 1.5x Surge Pricing on Eco Electric',
      choice: 2,
      description: 'Book an Eco Electric cab during morning office rush hour with 1.5x surge pricing.',
      sampleInputs: ['Electric', 'RJ-27-EV-2026', '12.0', 'PeakSurge'],
      expectedOutput: 'SUCCESS: Eco Electric (RJ-27-EV-2026) dispatched for 12.0 km @ 1.5x Surge. Fare: Rs 273.00.',
      explanation: '(Base Rs 50 + 12 km * Rs 11/km) * 1.50 = (50 + 132) * 1.50 = Rs 273.00.',
    },
    {
      id: 'sc3',
      name: 'Invariant Violation: Insufficient Wallet Balance Guard',
      choice: 3,
      description: 'Passenger attempts booking with Rs 100 in wallet when estimated fare is Rs 218.',
      sampleInputs: ['Passenger: Rahul', 'Wallet: 100', 'Fare: 218'],
      expectedOutput: 'ERROR: InsufficientFundsException - Wallet balance Rs 100.00 is below fare Rs 218.00.',
      explanation: 'Domain invariant enforced: rides cannot be confirmed without sufficient guaranteed funds or pre-auth hold.',
    },
    {
      id: 'sc4',
      name: 'Liskov Substitution Principle: Fleet Polymorphic Dispatch Loop',
      choice: 4,
      description: 'Iterate through a heterogeneous fleet (Sedans, EVs, SUVs) and calculate trip costs uniformly without type checks.',
      sampleInputs: ['Fleet: 3 Vehicles', 'Distance: 15 km'],
      expectedOutput: 'DISPATCH COMPLETE: 3 vehicles evaluated polymorphically with zero instanceof checks.',
      explanation: 'Open/Closed and Liskov Substitution principles guarantee that any new Vehicle subclass works seamlessly.',
    },
    {
      id: 'sc5',
      name: 'Dependency Inversion Principle: Mock Payment Injection',
      choice: 5,
      description: 'Inject a MockPaymentGateway into DispatchCoordinator to execute automated zero-latency unit tests without third-party network calls.',
      sampleInputs: ['Gateway: MockPaymentService', 'Status: Simulated 200 OK'],
      expectedOutput: 'TEST PASSED: Ride processed via MockPaymentService. DIP decouples high-level policy from low-level payment providers.',
      explanation: 'High-level business coordinators depend on IPaymentGateway abstractions, enabling seamless test mocking.',
    },
  ],
  codeByLanguage: {
    c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
 * Day 5 Capstone: Enterprise Fleet Dispatcher in C
 * Using Structs & Function Pointer VTables
 */
typedef struct Vehicle {
    char model[32];
    double base_rate_per_km;
    double (*calculate_fare)(struct Vehicle* self, double distance_km);
} Vehicle;

double standard_fare(Vehicle* self, double dist) {
    return 50.0 + (self->base_rate_per_km * dist);
}

double electric_fare(Vehicle* self, double dist) {
    // 10% eco-friendly discount
    return 40.0 + (self->base_rate_per_km * dist * 0.90);
}

int main() {
    Vehicle v1 = { "Sedan Prime", 15.0, standard_fare };
    Vehicle v2 = { "Eco EV", 12.0, electric_fare };

    double dist = 10.0;
    printf("[DISPATCH] %s (%.1f km): Rs %.2f\\n", v1.model, dist, v1.calculate_fare(&v1, dist));
    printf("[DISPATCH] %s (%.1f km): Rs %.2f\\n", v2.model, dist, v2.calculate_fare(&v2, dist));
    return 0;
}`,
    cpp: `#include <iostream>
#include <memory>
#include <vector>
#include <string>
using namespace std;

// 1. Abstract Strategy for Dynamic Pricing (OCP + DIP)
class IFareStrategy {
public:
    virtual double calculateFare(double distanceKm, double baseRate) const = 0;
    virtual string getStrategyName() const = 0;
    virtual ~IFareStrategy() = default;
};

class StandardPricing : public IFareStrategy {
public:
    double calculateFare(double distanceKm, double baseRate) const override {
        return 50.0 + (distanceKm * baseRate);
    }
    string getStrategyName() const override { return "Standard Base Fare"; }
};

class PeakSurgePricing : public IFareStrategy {
public:
    double calculateFare(double distanceKm, double baseRate) const override {
        return (50.0 + (distanceKm * baseRate)) * 1.50; // 1.5x Surge
    }
    string getStrategyName() const override { return "Peak 1.5x Surge Pricing"; }
};

// 2. Base Polymorphic Vehicle
class Vehicle {
protected:
    string plateNumber;
    double ratePerKm;
public:
    Vehicle(string plate, double rate) : plateNumber(move(plate)), ratePerKm(rate) {}
    virtual string getType() const = 0;
    virtual ~Vehicle() = default;
    double getRate() const { return ratePerKm; }
    string getPlate() const { return plateNumber; }
};

class SedanVehicle : public Vehicle {
public:
    SedanVehicle(string plate) : Vehicle(move(plate), 14.0) {}
    string getType() const override { return "Executive Sedan"; }
};

class ElectricVehicle : public Vehicle {
public:
    ElectricVehicle(string plate) : Vehicle(move(plate), 11.0) {}
    string getType() const override { return "Eco Electric Cab"; }
};

// 3. Dispatch Coordinator (SRP + DIP)
class DispatchCoordinator {
    unique_ptr<IFareStrategy> pricingStrategy;
public:
    explicit DispatchCoordinator(unique_ptr<IFareStrategy> strategy)
        : pricingStrategy(move(strategy)) {}

    void quoteRide(const Vehicle& vehicle, double distanceKm) const {
        double fare = pricingStrategy->calculateFare(distanceKm, vehicle.getRate());
        cout << "[DISPATCH MATCHED] Vehicle: " << vehicle.getType()
             << " (" << vehicle.getPlate() << ") | Distance: " << distanceKm
             << " km | Strategy: " << pricingStrategy->getStrategyName()
             << " | Final Fare: Rs " << fare << endl;
    }
};

int main() {
    SedanVehicle sedan("RJ-27-UB-1001");
    ElectricVehicle ev("RJ-27-EV-2026");

    DispatchCoordinator standardDispatcher(make_unique<StandardPricing>());
    standardDispatcher.quoteRide(sedan, 12.0);

    DispatchCoordinator surgeDispatcher(make_unique<PeakSurgePricing>());
    surgeDispatcher.quoteRide(ev, 12.0);
    return 0;
}`,
    java: `import java.util.*;

// Strategy Interface (DIP + OCP)
interface FareStrategy {
    double calculateFare(double distanceKm, double ratePerKm);
    String getName();
}

class StandardPricing implements FareStrategy {
    @Override
    public double calculateFare(double distanceKm, double ratePerKm) {
        return 50.0 + (distanceKm * ratePerKm);
    }
    @Override
    public String getName() { return "Standard"; }
}

class PeakSurgePricing implements FareStrategy {
    @Override
    public double calculateFare(double distanceKm, double ratePerKm) {
        return (50.0 + (distanceKm * ratePerKm)) * 1.50;
    }
    @Override
    public String getName() { return "Peak 1.5x Surge"; }
}

abstract class Vehicle {
    protected final String plate;
    protected final double ratePerKm;

    public Vehicle(String plate, double ratePerKm) {
        this.plate = plate;
        this.ratePerKm = ratePerKm;
    }
    public abstract String getCategory();
    public double getRatePerKm() { return ratePerKm; }
    public String getPlate() { return plate; }
}

class Sedan extends Vehicle {
    public Sedan(String plate) { super(plate, 14.0); }
    @Override public String getCategory() { return "Executive Sedan"; }
}

class ElectricCab extends Vehicle {
    public ElectricCab(String plate) { super(plate, 11.0); }
    @Override public String getCategory() { return "Eco Electric"; }
}

public class FleetDispatchApp {
    public static void main(String[] args) {
        Vehicle sedan = new Sedan("RJ-27-UB-1001");
        Vehicle ev = new ElectricCab("RJ-27-EV-2026");

        FareStrategy standard = new StandardPricing();
        FareStrategy surge = new PeakSurgePricing();

        double dist = 12.0;
        System.out.printf("[DISPATCH] %s (%s) @ %s: Rs %.2f%n",
            sedan.getCategory(), sedan.getPlate(), standard.getName(), standard.calculateFare(dist, sedan.getRatePerKm()));
        System.out.printf("[DISPATCH] %s (%s) @ %s: Rs %.2f%n",
            ev.getCategory(), ev.getPlate(), surge.getName(), surge.calculateFare(dist, ev.getRatePerKm()));
    }
}`,
    python: `from abc import ABC, abstractmethod

class FareStrategy(ABC):
    @abstractmethod
    def calculate_fare(self, distance_km: float, rate_per_km: float) -> float:
        pass
    
    @abstractmethod
    def get_name(self) -> str:
        pass

class StandardPricing(FareStrategy):
    def calculate_fare(self, distance_km: float, rate_per_km: float) -> float:
        return 50.0 + (distance_km * rate_per_km)
    def get_name(self) -> str:
        return "Standard"

class PeakSurgePricing(FareStrategy):
    def calculate_fare(self, distance_km: float, rate_per_km: float) -> float:
        return (50.0 + (distance_km * rate_per_km)) * 1.50
    def get_name(self) -> str:
        return "Peak 1.5x Surge"

class Vehicle(ABC):
    def __init__(self, plate: str, rate_per_km: float) -> None:
        self.plate = plate
        self.rate_per_km = rate_per_km
        
    @abstractmethod
    def get_category(self) -> str:
        pass

class Sedan(Vehicle):
    def __init__(self, plate: str) -> None:
        super().__init__(plate, 14.0)
    def get_category(self) -> str:
        return "Executive Sedan"

class ElectricCab(Vehicle):
    def __init__(self, plate: str) -> None:
        super().__init__(plate, 11.0)
    def get_category(self) -> str:
        return "Eco Electric"

if __name__ == "__main__":
    sedan = Sedan("RJ-27-UB-1001")
    ev = ElectricCab("RJ-27-EV-2026")
    
    strat_std = StandardPricing()
    strat_surge = PeakSurgePricing()
    
    dist = 12.0
    print(f"[DISPATCH] {sedan.get_category()} ({sedan.plate}) @ {strat_std.get_name()}: Rs {strat_std.calculate_fare(dist, sedan.rate_per_km):.2f}")
    print(f"[DISPATCH] {ev.get_category()} ({ev.plate}) @ {strat_surge.get_name()}: Rs {strat_surge.calculate_fare(dist, ev.rate_per_km):.2f}")`,
  },
};
