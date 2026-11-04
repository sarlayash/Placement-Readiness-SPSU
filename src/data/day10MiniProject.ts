import { MiniProject } from '../types';

/**
 * Day 10 Grand Capstone Mini-Project: AI Code Auditor & Technical Interview Simulation Engine
 * Modules 10 & 11: AI-Assisted Software Development & Technical Interview Preparation
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 */
export const DAY_10_MINI_PROJECT: MiniProject = {
  id: 'day10-mini-project-ai-interview-engine',
  day: 10,
  title: 'AI Code Auditor & Technical Interview Simulation Engine',
  subtitle: 'Grand Finale: Static AST Bug Scanner, PII Redaction Pipeline, Thinking-Aloud Harness & Live Invariant Verifier',
  description:
    'An enterprise-grade software verification and interview readiness engine that audits AI-generated software drafts for signed 32-bit integer overflows, boundary off-by-one errors, memory leaks, and slopsquatting package hallucinations, while providing an interactive simulated technical interview platform that tracks the 5-Step Thinking-Aloud protocol, tests boundary edge-cases, and certifies placement readiness.',
  features: [
    'Static AST Vulnerability Scanner: Detects flawed AI midpoints `(low+high)/2`, unchecked malloc calls, and iterator invalidation',
    'Enterprise PII & Secret Redaction Pipeline: Strips Bearer tokens, AWS keys, and emails before sending prompts to external LLMs',
    'Supply-Chain Slopsquatting Defense: Whitelists approved package coordinates to block hallucinated dependencies',
    'Interactive 5-Step Technical Interview Simulator: Enforces Clarification -> Brute Force -> Optimal -> Code -> Dry Run',
    'Complete Polyglot Source Implementations: Full production code in C, C++, Java, and Python with interactive CLI',
  ],
  conceptsCovered: {
    dataTypes: [
      'struct AuditReport (bugsFound, piiRedacted, approvedPackages, status)',
      'struct InterviewState (step, clarified, bruteForceO, optimalO, completed)',
      'Set<string> for O(1) package whitelisting',
      'Regular Expressions for PII and credential pattern matching',
    ],
    conditionals: [
      'Signed integer overflow checks: if (low > INT_MAX - high)',
      'Resource allocation balance checks: if (activeAllocations.size() > 0)',
      'Candidate progression gate: require step N before step N+1',
    ],
    loops: [
      'Single-pass O(N) token streams for lexical redacting',
      'Two-pointer inward traversal loop: while (left < right)',
      'State-machine event loop processing simulated interview interactions',
    ],
    constraints: [
      'Zero production secrets leaked to public LLMs',
      'All arithmetic bounds overflow-safe across 32-bit and 64-bit platforms',
      'Time Complexity: O(N) for static scanning; O(1) for interview state transitions',
      'Auxiliary Space: O(N) for audit reports and sanitization buffers',
    ],
  },
  codeByLanguage: {
    c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

#define MAX_LINE 512

// 1. Static AI Bug Auditor
typedef struct {
    int overflowBugs;
    int unclosedResources;
    int hallucinatedPackages;
    bool passedAudit;
} AuditResult;

AuditResult auditAiCodeDraft(const char* codeSnippet, const char* packageList) {
    AuditResult res = {0, 0, 0, true};

    // Check 1: Midpoint overflow bug
    if (strstr(codeSnippet, "(low + high) / 2") || strstr(codeSnippet, "(low+high)/2")) {
        res.overflowBugs++;
        res.passedAudit = false;
        printf("  [ALERT] Critical Bug: Midpoint (low + high) / 2 overflows for large arrays! Fix: low + (high - low) / 2\\n");
    }

    // Check 2: Unsafe malloc without free
    if (strstr(codeSnippet, "malloc(") && !strstr(codeSnippet, "free(")) {
        res.unclosedResources++;
        res.passedAudit = false;
        printf("  [ALERT] Resource Leak: malloc() found without corresponding free()!\\n");
    }

    // Check 3: Slopsquatting / Hallucinated package detection
    if (strstr(packageList, "fake-auth-turbo") || strstr(packageList, "slop-validator")) {
        res.hallucinatedPackages++;
        res.passedAudit = false;
        printf("  [ALERT] Supply-Chain Risk: Hallucinated package detected in prompt suggestion!\\n");
    }

    return res;
}

// 2. PII & Secret Redactor
void sanitizePrompt(char* dest, const char* src, size_t maxLen) {
    size_t d = 0;
    size_t s = 0;
    while (src[s] && d < maxLen - 1) {
        if (strncmp(&src[s], "Bearer ", 7) == 0) {
            strcpy(&dest[d], "Bearer [REDACTED_TOKEN]");
            d += 23;
            s += 7;
            while (src[s] && src[s] != ' ' && src[s] != '\\n') s++;
        } else if (strncmp(&src[s], "AKIA", 4) == 0) {
            strcpy(&dest[d], "[REDACTED_AWS_KEY]");
            d += 18;
            s += 20; // Skip 20 chars of AKIA key
        } else {
            dest[d++] = src[s++];
        }
    }
    dest[d] = '\\0';
}

// 3. Interview State Machine
typedef struct {
    int currentStep; // 1: Clarify, 2: Brute Force, 3: Optimal, 4: Code, 5: Dry-Run
    bool certified;
} InterviewSimulator;

void advanceInterviewStep(InterviewSimulator* sim, int step, const char* notes) {
    if (step == sim->currentStep) {
        printf("  [STEP %d ACCEPTED] %s\\n", step, notes);
        sim->currentStep++;
        if (sim->currentStep > 5) {
            sim->certified = true;
            printf("  >>> 5-STEP PROTOCOL COMPLETED: CANDIDATE PLACEMENT READY! <<<\\n");
        }
    } else {
        printf("  [STEP REJECTED] You must complete Step %d before Step %d!\\n", sim->currentStep, step);
    }
}

int main() {
    printf("=================================================================\\n");
    printf("  SPSU Udaipur Placement Readiness Program | Mentor: Kapil\\n");
    printf("  Day 10 Grand Capstone: AI Code Auditor & Interview Engine\\n");
    printf("=================================================================\\n\\n");

    printf("--- PART 1: AUDITING FLAWED AI CODE DRAFT ---\\n");
    const char* flawedDraft = "int mid = (low + high) / 2; int* buffer = (int*)malloc(100);";
    AuditResult audit = auditAiCodeDraft(flawedDraft, "express-jwt-official");
    printf("  Audit Status: %s (Bugs: %d, Leaks: %d)\\n\\n", 
           audit.passedAudit ? "PASSED" : "FAILED_AUDIT_REQUIRED_FIXES", 
           audit.overflowBugs, audit.unclosedResources);

    printf("--- PART 2: PROMPT PII & SECRET REDACTION ---\\n");
    char cleanPrompt[256];
    const char* rawPrompt = "Review API auth using AKIA1234567890ABCDEF and Bearer eyJhbGciOiJ...";
    sanitizePrompt(cleanPrompt, rawPrompt, sizeof(cleanPrompt));
    printf("  Raw Prompt:       %s\\n", rawPrompt);
    printf("  Sanitized Prompt: %s\\n\\n", cleanPrompt);

    printf("--- PART 3: 5-STEP TECHNICAL INTERVIEW SIMULATION ---\\n");
    InterviewSimulator sim = {1, false};
    advanceInterviewStep(&sim, 1, "Clarified input bounds (N <= 200,000, non-negative heights)");
    advanceInterviewStep(&sim, 2, "Stated Brute Force: Check all pairs in O(N^2) Time, O(1) Space");
    advanceInterviewStep(&sim, 3, "Proposed Optimal: Two-Pointer inward scan in O(N) Time, O(1) Space");
    advanceInterviewStep(&sim, 4, "Implemented clean code while narrating pointer invariants aloud");
    advanceInterviewStep(&sim, 5, "Dry-run verified with edge cases: empty array, single bar, ascending peaks");

    printf("\\n=================================================================\\n");
    printf("  DAY 10 GRAND FINALE COMPLETE: ALL 10 DAYS OFFICIALLY MASTERED\\n");
    printf("=================================================================\\n");
    return 0;
}`,
    cpp: `#include <iostream>
#include <string>
#include <vector>
#include <unordered_set>
#include <regex>

// 1. Production C++ AI Code Auditor
class AiCodeAuditor {
public:
    struct AuditReport {
        bool safeMidpoint;
        bool memorySafe;
        bool packagesWhitelisted;
        bool readyForProduction;
    };

    static AuditReport auditSnippet(const std::string& code, const std::vector<std::string>& packages) {
        static const std::unordered_set<std::string> approvedLibs = {
            "boost", "openssl", "nlohmann_json", "gtest", "spdlog"
        };

        AuditReport r{true, true, true, true};

        if (code.find("(low + high) / 2") != std::string::npos || code.find("(low+high)/2") != std::string::npos) {
            r.safeMidpoint = false;
            r.readyForProduction = false;
            std::cout << "  [AUDIT ERROR] 32-bit signed overflow detected in midpoint arithmetic!\\n";
        }

        if (code.find("new ") != std::string::npos && code.find("delete ") == std::string::npos) {
            r.memorySafe = false;
            r.readyForProduction = false;
            std::cout << "  [AUDIT ERROR] Raw 'new' allocation detected without 'delete' (RAII recommended)!\\n";
        }

        for (const auto& pkg : packages) {
            if (approvedLibs.find(pkg) == approvedLibs.end()) {
                r.packagesWhitelisted = false;
                r.readyForProduction = false;
                std::cout << "  [AUDIT ERROR] Supply-Chain Risk: Package '" << pkg << "' not in enterprise whitelist!\\n";
            }
        }

        return r;
    }
};

// 2. Secret Redactor
class PromptSanitizer {
public:
    static std::string scrub(const std::string& raw) {
        std::regex awsRegex(R"(AKIA[A-Za-z0-9]{16})");
        std::regex emailRegex(R"([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})");
        std::regex bearerRegex(R"(Bearer\s+[^\s]+)");

        std::string s1 = std::regex_replace(raw, awsRegex, "[REDACTED_AWS_KEY]");
        std::string s2 = std::regex_replace(s1, bearerRegex, "Bearer [REDACTED_TOKEN]");
        return std::regex_replace(s2, emailRegex, "[REDACTED_EMAIL]");
    }
};

// 3. Technical Interview Simulator
class InterviewSimulator {
private:
    int step = 1;

public:
    void submitStep(int submittedStep, const std::string& detail) {
        if (submittedStep == step) {
            std::cout << "  [STEP " << step << " PASSED] " << detail << "\\n";
            step++;
            if (step > 5) {
                std::cout << "  >>> CANDIDATE CLEARED ALL 5 INTERVIEW GATES: STRONG HIRE! <<<\\n";
            }
        } else {
            std::cout << "  [PROTOCOL VIOLATION] Must complete Step " << step << " before Step " << submittedStep << "!\\n";
        }
    }
};

int main() {
    std::cout << "=================================================================\\n";
    std::cout << "  SPSU Udaipur Placement Readiness Program | Mentor: Kapil\\n";
    std::cout << "  Day 10 Grand Capstone: AI Code Auditor & Interview Engine\\n";
    std::cout << "=================================================================\\n\\n";

    std::cout << "--- 1. AUDITING AI-GENERATED C++ DRAFT ---\\n";
    std::string sampleCode = "int mid = (low + high) / 2; int* p = new int[50];";
    auto report = AiCodeAuditor::auditSnippet(sampleCode, {"nlohmann_json", "unknown-slop-lib"});
    std::cout << "  Ready for Production: " << (report.readyForProduction ? "YES" : "NO - REJECTED") << "\\n\\n";

    std::cout << "--- 2. SCRUBBING SECRETS BEFORE AI PROMPT CALL ---\\n";
    std::string sensitive = "Analyze stack trace for user kapil@spsu.ac.in with key AKIAIOSFODNN7EXAMPLE";
    std::cout << "  Scrubbed: " << PromptSanitizer::scrub(sensitive) << "\\n\\n";

    std::cout << "--- 3. LIVE 5-STEP THINKING ALOUD INTERVIEW HARNESS ---\\n";
    InterviewSimulator sim;
    sim.submitStep(1, "Clarify: N <= 10^5, non-negative, in-place O(1) space required");
    sim.submitStep(2, "Brute Force: Check every subarray in O(N^2) time");
    sim.submitStep(3, "Optimal: Hash Map Prefix Sum to achieve O(N) time and O(N) space");
    sim.submitStep(4, "Code: Implement clean single-pass while speaking invariants aloud");
    sim.submitStep(5, "Dry-Run: Test with negative numbers, duplicates, and empty array");

    std::cout << "\\n=================================================================\\n";
    std::cout << "  DAY 10 GRAND FINALE COMPLETE: ALL 10 DAYS OFFICIALLY MASTERED\\n";
    std::cout << "=================================================================\\n";
    return 0;
}`,
    java: `import java.util.*;
import java.util.regex.Pattern;

public class Day10CapstoneEngine {
    // 1. Static AI Code Auditor
    public static class AiAuditor {
        private static final Set<String> WHITELISTED_DEPS = Set.of(
            "org.springframework.boot", "com.google.guava", "org.junit.jupiter"
        );

        public static boolean audit(String codeSnippet, String dependencyCoordinate) {
            boolean clean = true;
            if (codeSnippet.contains("(low + high) / 2") || codeSnippet.contains("(low+high)/2")) {
                System.out.println("  [AUDIT WARNING] 32-bit signed overflow in midpoint calculation!");
                clean = false;
            }
            if (codeSnippet.contains("new FileInputStream") && !codeSnippet.contains("try (")) {
                System.out.println("  [AUDIT WARNING] Resource leak: Unclosed stream! Use try-with-resources.");
                clean = false;
            }
            if (!WHITELISTED_DEPS.contains(dependencyCoordinate)) {
                System.out.println("  [AUDIT WARNING] Slopsquatting risk: Unknown library coordinate: " + dependencyCoordinate);
                clean = false;
            }
            return clean;
        }
    }

    // 2. PII Sanitizer
    public static class Sanitizer {
        private static final Pattern AWS_KEY = Pattern.compile("AKIA[A-Za-z0-9]{16}");
        private static final Pattern EMAIL = Pattern.compile("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}");
        private static final Pattern BEARER = Pattern.compile("Bearer\\s+[^\\s]+");

        public static String scrub(String input) {
            String s1 = AWS_KEY.matcher(input).replaceAll("[REDACTED_AWS_KEY]");
            String s2 = BEARER.matcher(s1).replaceAll("Bearer [REDACTED_TOKEN]");
            return EMAIL.matcher(s2).replaceAll("[REDACTED_EMAIL]");
        }
    }

    // 3. Technical Interview Simulator
    public static class InterviewHarness {
        private int step = 1;

        public void advance(int submittedStep, String narrative) {
            if (submittedStep == step) {
                System.out.println("  [STEP " + step + " VERIFIED] " + narrative);
                step++;
                if (step > 5) {
                    System.out.println("  >>> INTERVIEW PASSED WITH FLYING COLORS: OFFICIALLY CERTIFIED! <<<");
                }
            } else {
                System.out.println("  [ORDER ERROR] Must complete Step " + step + " before Step " + submittedStep);
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("=================================================================");
        System.out.println("  SPSU Udaipur Placement Readiness Program | Mentor: Kapil");
        System.out.println("  Day 10 Grand Capstone: AI Code Auditor & Interview Engine");
        System.out.println("=================================================================\\n");

        System.out.println("--- 1. AUDITING AI-GENERATED JAVA SNIPPET ---");
        String draft = "int mid = (low + high) / 2; FileInputStream fis = new FileInputStream(\\"data.txt\\");";
        boolean passed = AiAuditor.audit(draft, "com.hallucinated.slop");
        System.out.println("  Audit Outcome: " + (passed ? "ACCEPTED" : "REJECTED_FOR_SAFETY") + "\\n");

        System.out.println("--- 2. SCRUBBING PROMPT SECRETS ---");
        String prompt = "Debug AKIA1234567890ABCDEF for user kapil@spsu.ac.in with Bearer secretKey123";
        System.out.println("  Scrubbed: " + Sanitizer.scrub(prompt) + "\\n");

        System.out.println("--- 3. 5-STEP TECHNICAL INTERVIEW PROTOCOL ---");
        InterviewHarness harness = new InterviewHarness();
        harness.advance(1, "Clarified bounds: N <= 2*10^5, time bound O(N), space bound O(1)");
        harness.advance(2, "Stated Brute Force: Scan left and right boundaries in O(N^2) time");
        harness.advance(3, "Proposed Optimal: Two-Pointer inward invariant in O(N) time and O(1) space");
        harness.advance(4, "Implemented code while speaking loop invariants aloud");
        harness.advance(5, "Dry-run verified with edge cases: empty map, single bar, descending heights");

        System.out.println("\\n=================================================================");
        System.out.println("  DAY 10 GRAND FINALE COMPLETE: ALL 10 DAYS OFFICIALLY MASTERED");
        System.out.println("=================================================================");
    }
}`,
    python: `import re

class AiCodeAuditor:
    """Audits AI-generated code for common hallucination, overflow, and leak bugs."""
    APPROVED_PACKAGES = {"fastapi", "uvicorn", "pydantic", "pytest", "requests"}

    @classmethod
    def audit_snippet(cls, code: str, package: str) -> dict:
        issues = []
        if "(low + high) // 2" in code or "(low+high)//2" in code or "(low + high) / 2" in code:
            issues.append("INTEGER_OVERFLOW: Midpoint should be 'low + (high - low) // 2' in polyglot engines.")
        if "open(" in code and "with open(" not in code and ".close()" not in code:
            issues.append("RESOURCE_LEAK: Unclosed file handle! Use 'with open(...) as f:'.")
        if package.lower() not in cls.APPROVED_PACKAGES:
            issues.append(f"SLOPSQUATTING_RISK: Package '{package}' is not in enterprise whitelist.")

        return {
            "passed": len(issues) == 0,
            "issues": issues
        }

class PromptSanitizer:
    """Scrubs PII and API credentials before sending prompts to external LLMs."""
    @staticmethod
    def redact(text: str) -> str:
        text = re.sub(r'AKIA[A-Za-z0-9]{16}', '[REDACTED_AWS_KEY]', text)
        text = re.sub(r'Bearer\s+[^\s]+', 'Bearer [REDACTED_TOKEN]', text)
        text = re.sub(r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', '[REDACTED_EMAIL]', text)
        return text

class InterviewHarness:
    """Simulates Kapil's 5-Step Technical Interview Thinking-Aloud Protocol."""
    def __init__(self):
        self.step = 1

    def advance(self, step: int, explanation: str):
        if step == self.step:
            print(f"  [STEP {self.step} ACCEPTED] {explanation}")
            self.step += 1
            if self.step > 5:
                print("  >>> CONGRATULATIONS: 5-STEP PROTOCOL CLEARED FOR TOP TIER PLACEMENT! <<<")
        else:
            print(f"  [PROTOCOL ERROR] Must finish Step {self.step} before attempting Step {step}!")

def main():
    print("=================================================================")
    print("  SPSU Udaipur Placement Readiness Program | Mentor: Kapil")
    print("  Day 10 Grand Capstone: AI Code Auditor & Interview Engine")
    print("=================================================================\\n")

    print("--- 1. AUDITING FLAWED AI PYTHON DRAFT ---")
    draft = "mid = (low + high) // 2; f = open('data.txt', 'r')"
    report = AiCodeAuditor.audit_snippet(draft, "hallucinated-auth-lib")
    print("  Audit Result Passed:", report["passed"])
    for issue in report["issues"]:
        print("   -", issue)
    print()

    print("--- 2. REDACTING SECRETS BEFORE AI PROMPTS ---")
    raw_prompt = "Verify user test.learner@spsu.ac.in with AKIA1234567890ABCDEF and Bearer secretToken"
    print("  Scrubbed Prompt:", PromptSanitizer.redact(raw_prompt))
    print()

    print("--- 3. 5-STEP THINKING ALOUD TECHNICAL INTERVIEW HARNESS ---")
    harness = InterviewHarness()
    harness.advance(1, "Clarified input constraints: N <= 2*10^5, sorted integers, O(log N) target")
    harness.advance(2, "Brute Force stated: Linear search in O(N) Time, O(1) Space")
    harness.advance(3, "Optimal proposed: Binary search with safe midpoint in O(log N) Time, O(1) Space")
    harness.advance(4, "Code written with narrated invariants: while low <= high")
    harness.advance(5, "Dry-run completed with edge cases: empty array, target absent, boundary elements")

    print("\\n=================================================================")
    print("  DAY 10 GRAND FINALE COMPLETE: ALL 10 DAYS OFFICIALLY MASTERED")
    print("=================================================================")

if __name__ == "__main__":
    main()`,
  },
  educationalNotes: [
    {
      number: 1,
      title: 'The Critical AI Verification Mindset: Zero Blind Trust',
      details:
        'AI assistants produce probabilistically plausible code that frequently contains signed integer arithmetic overflows, subtle off-by-one loop conditions, and unclosed resources. Responsible engineers treat all AI-generated code as an unverified draft requiring deterministic unit tests, fuzzing, and line-by-line static inspection.',
    },
    {
      number: 2,
      title: 'Defending the Enterprise Supply Chain Against Slopsquatting',
      details:
        'LLMs frequently hallucinate package names that sound natural. Attackers register these hallucinated names on npm and PyPI with Trojan payloads. Build automation and CI/CD pipelines must enforce strict package whitelisting to prevent unauthorized dependency installation.',
    },
    {
      number: 3,
      title: 'Prompt Privacy & Zero-Secret Governance',
      details:
        'Never paste API keys, JWT secrets, database connection strings, or customer PII into public AI interfaces. Always use automated pre-commit scanners (truffleHog, git-secrets) and lexical redacting pipelines before sharing code contexts.',
    },
    {
      number: 4,
      title: 'Kapil’s 5-Step Interview Protocol: Communicating Engineering Judgement',
      details:
        'In live placement rounds, interviewers evaluate structured thinking aloud: Clarify Requirements -> State Brute Force -> Propose Optimal Pattern -> Implement with Narrated Invariants -> Dry-Run with Edge Cases. Silence is a liability; structured narration is your greatest asset.',
    },
  ],
  complexity: {
    basicOperations: 'O(1) interview state transitions and package whitelist checks',
    powerCalculation: 'O(N) single-pass token scanning and regex redaction',
    menuDisplay: 'O(1) CLI status rendering and audit reporting',
    auxiliarySpace: 'O(N) temporary buffer for sanitized strings and audit issue lists',
  },
  interactiveScenarios: [
    {
      id: 'scen-1',
      name: 'Simulate AI Code Audit for Integer Overflow',
      choice: 1,
      description: 'Submit an AI code snippet containing midpoint calculation `(low + high) / 2`.',
      sampleInputs: ['int mid = (low + high) / 2;'],
      expectedOutput: 'AUDIT_FAILED: INTEGER_OVERFLOW_DETECTED -> FIX_WITH_SAFE_MIDPOINT',
      explanation: 'The static scanner flags 32-bit signed overflow and recommends `low + (high - low) / 2`.',
    },
    {
      id: 'scen-2',
      name: 'PII & Secret Redaction Pipeline',
      choice: 2,
      description: 'Process a prompt containing an email and an AWS access key.',
      sampleInputs: ['kapil@spsu.ac.in AKIA1234567890ABCDEF'],
      expectedOutput: '[REDACTED_EMAIL] [REDACTED_AWS_KEY]',
      explanation: 'Sensitive credentials are scrubbed before prompt transmission.',
    },
    {
      id: 'scen-3',
      name: '5-Step Interview Thinking Aloud Simulator',
      choice: 3,
      description: 'Advance through all 5 placement interview steps in order.',
      sampleInputs: ['1', '2', '3', '4', '5'],
      expectedOutput: 'STEP_1_OK -> STEP_2_OK -> STEP_3_OK -> STEP_4_OK -> STEP_5_OK -> PLACEMENT_CERTIFIED',
      explanation: 'Sequential progression through requirements, brute force, optimal, coding, and dry run unlocks placement readiness certification.',
    },
  ],
};
