export interface StressWheelQuestion {
  id: number;
  segmentTitle: string;
  theme: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  mentorKapilWisdom: {
    hiddenMeaning: string;
    engineeringTakeaway: string;
    actionableHabit: string;
  };
  funStressReliever: string;
}

export const STRESS_WHEEL_25_QUESTIONS: StressWheelQuestion[] = [
  {
    id: 1,
    segmentTitle: "3 AM Segfault",
    theme: "Debugging Under Pressure",
    question: "It is 2:59 AM. Your code throws a 'Segmentation Fault (core dumped)' on the exact test case due in 1 minute. What is your immediate psychological reaction?",
    options: [
      "Add 15 random printf(\"HERE 1\"), printf(\"HERE 2\") and sacrifice sleep to the compiler gods.",
      "Close the laptop gently, pretend this reality never existed, and sleep.",
      "Systematically isolate pointer boundaries, check array bounds (N vs N-1), and run with a debugger.",
      "Blame the college lab OS, Linux kernel, and the hostel router."
    ],
    correctIndex: 2,
    explanation: "Panic debugging multiplies errors. Systematic binary searching of code lines and boundary condition checks is how senior engineers resolve crashes under fire.",
    mentorKapilWisdom: {
      hiddenMeaning: "A segmentation fault in code is just like anxiety in life—it happens when you try to access memory that doesn't belong to you yet (worrying about future interview results).",
      engineeringTakeaway: "Stay grounded within your current bounds (Index 0 to N-1). Never dereference a null pointer in your mind.",
      actionableHabit: "Whenever an error strikes, take a 30-second breath before typing a single character. Trace on paper first."
    },
    funStressReliever: "Remember: Even James Gosling once wrote a null reference. You are in elite company!"
  },
  {
    id: 2,
    segmentTitle: "Ghost Partner",
    theme: "Teamwork & Ownership",
    question: "Your 4-person B-Tech final year project demo is in 4 hours. Two partners have switched off their phones and one says 'Mera laptop update ho raha hai'. What do you do?",
    options: [
      "Send aggressive WhatsApp stickers in the group and cry in the hostel canteen.",
      "Prepare a rock-solid 3-minute solo demonstration of the core working module you built and brief the professor with calm ownership.",
      "Delete the repository so everyone suffers equal collective damage.",
      "Beg the external examiner to pass you because of 'family emergency'."
    ],
    correctIndex: 1,
    explanation: "Ownership is the single highest-rated trait in tech hiring. Demonstrating working core functionality calmly proves individual leadership.",
    mentorKapilWisdom: {
      hiddenMeaning: "Corporate life has passengers and drivers. In interviews, companies never hire the group; they hire the one who wrote the commit history.",
      engineeringTakeaway: "Architect your modules modularly so that failure of external dependencies (unreliable partners) doesn't crash the main pipeline.",
      actionableHabit: "Maintain clean Git commits with your own name. Your commit log is your truest resume."
    },
    funStressReliever: "When in doubt, open Terminal, run 'cmatrix' or 'htop', and nod thoughtfully. Examiners get impressed!"
  },
  {
    id: 3,
    segmentTitle: "Mass Recruiter English",
    theme: "Communication & Presence",
    question: "During a mass recruitment aptitude / psychometric test, you encounter: 'If a tree falls in the forest and you are on a team, whose fault is it?' What does the company actually want to see?",
    options: [
      "Whichever option uses maximum jargon like 'synergistic paradigm'.",
      "Consistent emotional stability, conflict resolution orientation, and team-first accountability.",
      "A 500-word essay attacking the question's premise.",
      "Random guessing because you think psychometric tests are astrological horoscopes."
    ],
    correctIndex: 1,
    explanation: "Psychometric tests measure behavioral consistency and low toxicity under workplace stress.",
    mentorKapilWisdom: {
      hiddenMeaning: "Corporate recruitment is 50% technical vetting and 50% verifying you won't trigger HR escalations in team meetings.",
      engineeringTakeaway: "Clarity over complexity. The best engineering communication is straightforward, empathetic, and objective.",
      actionableHabit: "In HR interviews, use the STAR format (Situation, Task, Action, Result) with 60-second discipline."
    },
    funStressReliever: "HR doesn't want Shakespeare; they just want someone who doesn't reply 'k' to client emails!"
  },
  {
    id: 4,
    segmentTitle: "74.8% Attendance",
    theme: "Constraint Optimization",
    question: "Your attendance is calculated at 74.8%. The college debar cutoff is strictly 75.0%. How does a true Computer Science engineer handle this constraint?",
    options: [
      "Write a mathematical petition showing that round(74.8) equals 75 in standard IEEE 754 floating-point convention.",
      "Stage a dramatic medical certificate with handwriting from a veterinarian.",
      "Politely approach the faculty with complete lab assignments completed ahead of schedule, demonstrating genuine academic discipline.",
      "Argue with the HOD that Mark Zuckerberg dropped out with 0% attendance."
    ],
    correctIndex: 2,
    explanation: "Faculty value humility, submitted deliverables, and proactive responsibility over legalistic excuses.",
    mentorKapilWisdom: {
      hiddenMeaning: "Attendance rules in college teach you SLA (Service Level Agreement) compliance in corporate contracts.",
      engineeringTakeaway: "Never operate right on the edge of boundary constraints. Maintain a 5% safety buffer in code memory and life commitments.",
      actionableHabit: "Set a personal threshold at 80% so random illness or placement drives never trigger an emergency."
    },
    funStressReliever: "If IEEE 754 rounding worked in college administration, half the nation's engineers would be toppers!"
  },
  {
    id: 5,
    segmentTitle: "2 AM Hard Coder",
    theme: "Avoiding Comparison Trap",
    question: "Your roommate sits across from you at 2:00 AM solving LeetCode Hard problems with mechanical keyboard clicks while you are struggling with Array Two-Pointers. What is your best play?",
    options: [
      "Unplug the hostel WiFi router and blame electricity board fluctuations.",
      "Immediately try solving dynamic programming on trees and burn out in 15 minutes.",
      "Stay focused on your current level, master fundamentals deeply, and benchmark only against your own yesterday.",
      "Switch your career plan to government exams at 2:15 AM."
    ],
    correctIndex: 2,
    explanation: "Mastery is sequential. Skipping fundamentals to match someone else's timeline guarantees fragile understanding.",
    mentorKapilWisdom: {
      hiddenMeaning: "Comparison is the compiler of misery. Someone else solving LeetCode 2000 does not reduce the availability of software jobs for you.",
      engineeringTakeaway: "Every complex algorithm is just 3 basic primitives combined well. Master Day 1 (Arrays) and Day 2 (Two-Pointers) before worrying about Graphs.",
      actionableHabit: "Track your solved problems on your personal dashboard. Compete only against your Day 1 baseline."
    },
    funStressReliever: "Behind every 2 AM mechanical keyboard clicker is a human who still googles 'how to center a div'!"
  },
  {
    id: 6,
    segmentTitle: "Didn't Study Friend",
    theme: "Psychological Resilience",
    question: "A classmate who publicly declared 'Bhai maine toh book bhi nahi kholi' walks out of the placement hall holding an offer letter of 24 LPA. How should an engineering mind interpret this?",
    options: [
      "People prepare silently and manage optics; don't anchor your preparation to what peers announce publicly.",
      "Start believing in black magic and lucky pen ink.",
      "Confront them in the hostel corridor and demand their notes.",
      "Give up placement preparation completely."
    ],
    correctIndex: 0,
    explanation: "High performers often downplay their preparation to manage peer expectations. Focus on empirical preparation rather than campus rumors.",
    mentorKapilWisdom: {
      hiddenMeaning: "The world rewards silent consistency over loud announcements. The duck looks calm on the surface while paddling furiously underwater.",
      engineeringTakeaway: "Do your work quietly. Let your code execution and test-case clearance make the noise.",
      actionableHabit: "Keep your daily study streaks private. Build in silence; let your offer letter announce your success."
    },
    funStressReliever: "'Maine kuch nahi padha' is the oldest campus bug in history—present in version 1.0 of every college!"
  },
  {
    id: 7,
    segmentTitle: "StackOverflow Paste",
    theme: "Code Comprehension",
    question: "You copied a solution from StackOverflow and the interviewer says: 'Great, now explain lines 14 to 18.' Your code has a variable named `int foo_bar_temp2`. What is your response?",
    options: [
      "Say 'Sir, this is an industry standard legacy naming convention'.",
      "Honestly explain the logic line by line, acknowledge borrowing the design pattern, and walk through the algorithm trace clearly.",
      "Pretend your audio broke and reload the Zoom meeting.",
      "Claim your keyboard has an automated AI autocorrect bug."
    ],
    correctIndex: 1,
    explanation: "Every engineer leverages open-source patterns. What separates good engineers is whether they understand every single line they ship.",
    mentorKapilWisdom: {
      hiddenMeaning: "Borrowing logic is research; not understanding what you borrowed is fraud. Interviewers respect honest technical explanations.",
      engineeringTakeaway: "If you cannot explain why a line exists, delete it. Dead or mysterious code is a future production outage.",
      actionableHabit: "Whenever you read an online code solution, re-type it from memory in your IDE and rename variables to clean business domain names."
    },
    funStressReliever: "Senior developers don't write from scratch; they copy from StackOverflow with higher dignity and better variable names!"
  },
  {
    id: 8,
    segmentTitle: "Blank Final Year Project",
    theme: "Interview Presence",
    question: "The interviewer asks: 'What was your primary technical contribution to your college project?' and your brain temporarily empties. What is the winning recovery?",
    options: [
      "Start talking about your high school basketball championship to buy time.",
      "Take a measured sip of water, state the high-level architecture in one sentence, then break down the specific database or API module you owned.",
      "Say 'Sir, it was an IoT ML Blockchain AI project' with zero specifics.",
      "Look at the ceiling and whisper 'Next question please'."
    ],
    correctIndex: 1,
    explanation: "Taking 3 seconds to structure an answer demonstrates executive composure. Framing high-level architecture first provides an immediate mental map.",
    mentorKapilWisdom: {
      hiddenMeaning: "Panic is just cognitive bandwidth saturation. Pausing for 3 seconds resets your working memory cache.",
      engineeringTakeaway: "Always present technical work in Top-Down fashion: System Purpose -> Architecture -> Your Component -> Data Flow -> Tradeoffs.",
      actionableHabit: "Rehearse a 90-second elevator pitch for your primary project before every placement drive."
    },
    funStressReliever: "Drink a sip of water. In corporate life, taking a sip of water makes you look 40% wiser than you actually are!"
  },
  {
    id: 9,
    segmentTitle: "Resume Keyword Stuffing",
    theme: "Authenticity & Depth",
    question: "Your friend's resume lists: 'Kubernetes, Distributed Systems, Neural Networks, Quantum Computing, C++, Rust' after a 3-day boot camp. Why does Mentor Kapil advise against this?",
    options: [
      "Because interviewers will probe the hardest keyword and if you fail depth, your entire credibility collapses to zero.",
      "Because ATS (Applicant Tracking Systems) prefer comic sans fonts.",
      "Because companies only hire people who know HTML and nothing else.",
      "Because Quantum Computing is banned in placement drives."
    ],
    correctIndex: 0,
    explanation: "One verified skill with deep understanding is worth 20 surface-level buzzwords. Interviewers target the most ambitious keyword on a resume first.",
    mentorKapilWisdom: {
      hiddenMeaning: "Depth creates trust; broad superficiality breeds suspicion. In tech interviews, your weakest keyword sets your ceiling.",
      engineeringTakeaway: "Be a T-shaped engineer: Broad awareness of the stack, but unshakeable depth in 1 language and core DSA.",
      actionableHabit: "Audit your resume: If an interviewer asks you to write an implementation of a tool on a whiteboard, can you do it? If not, move it to 'Familiar with'."
    },
    funStressReliever: "Putting 'Kubernetes' on a resume after watching 1 reel is like putting 'Pilot' because you sat in a window seat!"
  },
  {
    id: 10,
    segmentTitle: "45 LPA CTC Reality",
    theme: "Financial Literacy for Engineers",
    question: "A company advertises '45 LPA CTC Package!'. Upon reading the fine print: Base is 9 LPA, 20 LPA is ESOPs vested over 4 years, 5 LPA is joining bonus with 3-year clawback, and 11 LPA is insurance. How should you view this?",
    options: [
      "Cry that life is unfair and reject the offer in anger.",
      "Celebrate the 45 LPA headline on LinkedIn immediately.",
      "Analyze the guaranteed in-hand monthly salary, evaluate the company's growth trajectory, and focus on career capital and skills built.",
      "Ask HR to pay the entire 45 lakhs in cash on Day 1."
    ],
    correctIndex: 2,
    explanation: "Understanding Total Compensation vs Base Pay is essential financial maturity. Skills and growth trajectory in your first 2 years compound far faster than bonuses.",
    mentorKapilWisdom: {
      hiddenMeaning: "CTC is marketing; skills are assets; your learning rate is your true net worth at age 21.",
      engineeringTakeaway: "Evaluate early-career roles by: 1) Engineering mentorship quality, 2) Scale of systems, 3) Freedom to write production code.",
      actionableHabit: "Always calculate monthly post-tax in-hand salary before signing any employment agreement."
    },
    funStressReliever: "CTC stands for 'College Ko Khush Karne Ka Formula'. Focus on the in-hand and the learning!"
  },
  {
    id: 11,
    segmentTitle: "Will AI Replace Us?",
    theme: "Future-Proofing Your Career",
    question: "A viral tech reel claims 'AI will write all code by next week; software engineers are finished!'. What is the objective reality for a student in this 10-day boot camp?",
    options: [
      "Panic, drop out of CS, and open a tea stall near campus.",
      "AI automates syntax and boilerplate, but elevates demand for engineers who understand problem decomposition, architecture, verification, and edge-case rigor.",
      "Refuse to use any AI tools and write code on punch cards.",
      "Let AI write 100% of your college code and stop learning logic."
    ],
    correctIndex: 1,
    explanation: "Compilers didn't replace programmers; they made them 100x more productive. AI does the same: it amplifies engineers who have rock-solid algorithmic thinking.",
    mentorKapilWisdom: {
      hiddenMeaning: "AI creates solutions, but engineers decide WHICH problem is worth solving and verify WHEN the solution fails silently.",
      engineeringTakeaway: "Master algorithmic foundations (Time & Space complexity, invariants, trade-offs). AI can generate code, but you must judge its correctness.",
      actionableHabit: "Use AI as a pair-programmer to explain concepts, but always write your core algorithmic logic with your own fingers."
    },
    funStressReliever: "As long as clients don't know what they want, software engineers will have guaranteed employment!"
  },
  {
    id: 12,
    segmentTitle: "Tell Me About Yourself",
    theme: "Personal Pitching",
    question: "The interviewer smiles and asks: 'Tell me about yourself.' Which opening line positions you as a top 5% candidate?",
    options: [
      "'My name is Rahul, I was born in 2003, my hobbies are listening to music and watching web series...'",
      "'I am an engineering student with 8.2 CGPA and I need a job desperately...'",
      "'I am a problem-solving-focused software developer who enjoys building efficient systems. Recently in our 10-day intensive boot camp, I mastered algorithmic optimization and built practical full-stack solutions...'",
      "'Everything is already written on the resume in front of you, sir.'"
    ],
    correctIndex: 2,
    explanation: "The best self-introduction connects your technical passion, recent hands-on problem solving, and relevance to the company in 60 sharp seconds.",
    mentorKapilWisdom: {
      hiddenMeaning: "This question isn't a biography request; it's a test of whether you can summarize complex data (your life) into a high-value executive summary.",
      engineeringTakeaway: "Structure: Past (What got you into engineering) -> Present (Current mastery & projects) -> Future (Why this company fits your trajectory).",
      actionableHabit: "Record yourself on your phone answering this in 60 seconds. Listen back and remove all filler words ('um', 'basically', 'like')."
    },
    funStressReliever: "Never tell the interviewer your hobby is 'listening to music'. Everyone listens to music—unless you write the Spotify audio codec!"
  },
  {
    id: 13,
    segmentTitle: "Campus WiFi Crash",
    theme: "Contingency Planning",
    question: "During a high-stakes online coding test, the hostel WiFi disconnects with 12 minutes remaining. What is the seasoned engineer's drill?",
    options: [
      "Kick the hostel wall, smash the mouse, and write a complaint email to the college registrar.",
      "Immediately switch to your pre-configured phone hotspot tethered via USB cable (which you kept active before the test started) and resume without lost state.",
      "Wait for 15 minutes hoping the router reboots itself.",
      "Send a message on WhatsApp asking someone else to write your test."
    ],
    correctIndex: 1,
    explanation: "Production systems always require redundancy (failover mechanism). Preparing a backup hotspot before every exam is basic engineering contingency.",
    mentorKapilWisdom: {
      hiddenMeaning: "In production engineering, this is called 'High Availability & Fault Tolerance'. If your single point of failure is hostel WiFi, the system design was flawed.",
      engineeringTakeaway: "Always build redundancy: Primary connection + Mobile Hotspot + Fully charged laptop battery + Local scratchpad for code backup.",
      actionableHabit: "Before any online test: Phone charged to 100%, USB tethering verified, notifications silenced, water bottle at desk."
    },
    funStressReliever: "Hostel WiFi only disconnects when you are about to click 'Submit'. It is a sentient being that feeds on student adrenaline!"
  },
  {
    id: 14,
    segmentTitle: "Rejection Email",
    theme: "Grit & Pipeline Mindset",
    question: "You receive the standard automated email: 'While your qualifications are impressive, we have decided to pursue other candidates...'. What is the productive mindset?",
    options: [
      "Decide that you are untalented and question your entire life choices.",
      "Treat placement as a numbers game with high variance; log the questions asked, identify the exact topic where you hesitated, strengthen it, and apply to the next 5 companies.",
      "Reply angrily to the 'no-reply@company.com' automated address.",
      "Delete LinkedIn and your resume."
    ],
    correctIndex: 1,
    explanation: "Rejection in campus placements is frequently non-technical (batch quotas, headcount freezes, timing). Conducting a post-mortem and iterating your pipeline is the only metric you control.",
    mentorKapilWisdom: {
      hiddenMeaning: "A rejection is not a verdict on your intellect; it is merely an unhandled edge case in that specific interview session.",
      engineeringTakeaway: "Treat your career like machine learning: Rejection is just the loss function. Backpropagate the error, adjust your weights, and retrain.",
      actionableHabit: "Maintain an 'Interview Retrospective' notebook: Date, Company, Question asked, Where I hesitated, What I learned."
    },
    funStressReliever: "Even WhatsApp founder Brian Acton was rejected by Twitter and Facebook in 2009. Keep building!"
  },
  {
    id: 15,
    segmentTitle: "Canteen Chai Debate",
    theme: "Execution vs Endless Debates",
    question: "At the college canteen, three friends spend 2 hours passionately arguing: 'Flutter is dead, React Native is king, no wait Rust is the only future, no wait Web3 is everything!'. Meanwhile, who actually gets placed?",
    options: [
      "The one who spoke the loudest and used the word 'disruptive' 14 times.",
      "The student who quietly mastered Core DSA, basic OS/DBMS, and built one solid, deployed, working project with real users.",
      "The one who shared 50 tech memes on Reddit.",
      "The one who bought 12 Udemy courses on sale but finished 0% of them."
    ],
    correctIndex: 1,
    explanation: "Industry hires builders, not tech commentators. Foundational problem solving transfers across every framework that will be invented in the next 20 years.",
    mentorKapilWisdom: {
      hiddenMeaning: "Frameworks are fashion; algorithms and fundamentals are architecture. Fashion changes every season; architecture stands for decades.",
      engineeringTakeaway: "Learn to build end-to-end. A working SQLite CRUD app running live beats an unbuilt distributed blockchain design every day.",
      actionableHabit: "Spend 80% of your study time typing code and solving problems; spend only 20% consuming tech news and tutorials."
    },
    funStressReliever: "College canteen chai has solved more theoretical problems than the entire Silicon Valley, yet no one ships code!"
  },
  {
    id: 16,
    segmentTitle: "5 Years From Now",
    theme: "Career Vision",
    question: "The HR asks: 'Where do you see yourself in 5 years?'. What response signals high potential without sounding arrogant?",
    options: [
      "'Sitting in your chair as the CEO of this company.'",
      "'Earning 1 crore per month and working 2 hours from a beach.'",
      "'Having grown into a trusted technical lead who designs resilient systems, mentors junior developers, and deeply understands the business impact of our engineering.'",
      "'I don't know, maybe alive?'"
    ],
    correctIndex: 2,
    explanation: "Companies want engineers who aspire to technical depth, team leadership, and understanding business value.",
    mentorKapilWisdom: {
      hiddenMeaning: "This question assesses whether you have thought beyond the immediate paycheck into your professional identity and contribution.",
      engineeringTakeaway: "Your value in tech shifts over 5 years: Year 1-2 (Syntax & Speed) -> Year 3-4 (System Design & Tradeoffs) -> Year 5+ (Mentorship & Business Architecture).",
      actionableHabit: "Focus on becoming the person teammates love to collaborate with and managers trust with production deployments."
    },
    funStressReliever: "Saying 'In your chair' to an HR manager only works in Bollywood movies. In real life, it earns an immediate security escort!"
  },
  {
    id: 17,
    segmentTitle: "Evil Viva Question",
    theme: "Handling the Unknown",
    question: "In an external viva, the examiner asks an obscure question completely outside the textbook syllabus. What is the smart engineering response?",
    options: [
      "Say 'Out of syllabus, sir!' and refuse to speak.",
      "Make up completely fake scientific terms like 'Quantum Electro-Hyperthreading Protocol'.",
      "Calmly acknowledge you haven't studied this specific terminology, but state what fundamental principles you do know and reason logically toward an answer.",
      "Start coughing loudly to trigger an emergency."
    ],
    correctIndex: 2,
    explanation: "Examiners intentionally ask unknown questions to observe your reasoning process under uncertainty, not your encyclopedia memory.",
    mentorKapilWisdom: {
      hiddenMeaning: "In production, every bug is 'out of syllabus'. Nobody gives you a textbook for a database deadlock at 3 AM.",
      engineeringTakeaway: "Demonstrate first-principles thinking: State your assumptions clearly and show how you derive an approach step by step.",
      actionableHabit: "Practice saying: 'I haven't worked directly with X, but based on how Y functions, I hypothesize that...'."
    },
    funStressReliever: "External examiners possess a secret radar for the one chapter you skipped at 5 AM. Don't fight it; reason through it!"
  },
  {
    id: 18,
    segmentTitle: "Git Merge Conflict",
    theme: "Version Control Hygiene",
    question: "You have 10 minutes before submission and Git displays: 'CONFLICT (content): Merge conflict in main.cpp' with <<<<<<< HEAD everywhere. What is the rule?",
    options: [
      "Delete the `.git` folder, zip the desktop directory, and email it as 'final_final_v2_really_final.zip'.",
      "Carefully inspect the diff markers, understand what both branches modified, resolve line by line, test compile, and commit cleanly.",
      "Push with `--force` and destroy your teammate's entire weekend of code.",
      "Turn off your computer and blame Microsoft Windows."
    ],
    correctIndex: 1,
    explanation: "Git conflicts are normal collaboration checkpoints. Resolving them calmly using diff tools is a standard daily engineering activity.",
    mentorKapilWisdom: {
      hiddenMeaning: "Merge conflicts in code are like interpersonal misunderstandings: they happen when two people edit the same shared reality without communicating.",
      engineeringTakeaway: "Pull frequently (`git pull origin main`), communicate when modifying shared files, and keep pull requests small and focused.",
      actionableHabit: "Never use `git push --force` on shared branch unless you want your teammates to remember your name forever for the wrong reasons."
    },
    funStressReliever: "Calling a zip file 'final_final_final_v2_DONE.zip' is the universal prayer of an engineer in distress!"
  },
  {
    id: 19,
    segmentTitle: "LinkedIn Influencer",
    theme: "Authentic Growth vs Optics",
    question: "You scroll LinkedIn and see a classmate's post: 'Humbled and honored to announce that after a grueling 45-minute webinar, I have obtained my Certificate in Quantum AI Leadership!'. How should you react?",
    options: [
      "Comment 'CFBR' and feel depressed about your own progress.",
      "Smile, scroll past, open your IDE or LeetCode, and write real code that solves real problems.",
      "Fabricate a certificate for 'Intergalactic Cloud Architecture' to counter them.",
      "Spend the afternoon creating aesthetic Canva certificates for yourself."
    ],
    correctIndex: 1,
    explanation: "LinkedIn posturing has near-zero correlation with actual engineering competence during technical whiteboard rounds.",
    mentorKapilWisdom: {
      hiddenMeaning: "A certificate is proof of attendance; code that passes unit tests is proof of competence. Companies hire competence.",
      engineeringTakeaway: "Your GitHub repo, your LeetCode problem count, and your working live deployment speak louder than 100 Canva badges.",
      actionableHabit: "Restrict LinkedIn browsing to 15 minutes a day. Spend that saved time in the SPSU IDE Virtual Lab."
    },
    funStressReliever: "If LinkedIn posts were executable code, the entire internet would crash from memory overflow!"
  },
  {
    id: 20,
    segmentTitle: "Optimal Complexity Panic",
    theme: "Iterative Problem Solving",
    question: "The interviewer gives you a problem and asks for an optimal solution. Your mind immediately sees a brute force $O(N^2)$ solution. What do you do?",
    options: [
      "Remain completely silent for 15 minutes hoping an $O(N)$ solution magically descends from heaven.",
      "Immediately explain the brute-force $O(N^2)$ approach out loud, analyze its bottleneck, and collaborate with the interviewer to optimize it to $O(N)$ using hash maps or two pointers.",
      "Lie and claim your brute force runs in $O(1)$ time.",
      "Tell the interviewer the question is flawed."
    ],
    correctIndex: 1,
    explanation: "Interviewers want to see how you evolve code. A working brute force with clear analysis is 100x better than total silence.",
    mentorKapilWisdom: {
      hiddenMeaning: "First make it work, then make it right, then make it fast. Skipping the 'make it work' step leads to cognitive paralysis.",
      engineeringTakeaway: "State the brute-force baseline within 2 minutes. It guarantees you won't walk away with zero code and reveals the exact bottleneck to optimize.",
      actionableHabit: "Always say: 'A straightforward approach would be X with time complexity O(N^2). The bottleneck is repeated lookup; we can optimize this to O(N) by introducing a hash set...'."
    },
    funStressReliever: "Even Google's search engine started as a script that ran slower than today's toaster. Start simple!"
  },
  {
    id: 21,
    segmentTitle: "Imposter Syndrome",
    theme: "Psychological Endurance",
    question: "You look at open source contributors or GitHub heatmaps and think: 'I started coding late in college; everyone else is a born genius; I don't belong here.' What is the truth?",
    options: [
      "You are right; coding requires genetic mutation and cannot be learned.",
      "Most top software engineers started in college. Systematic, daily deliberate practice over 6 to 12 months outperforms years of unstructured dabbling.",
      "Only students from top metros can crack top product companies.",
      "You should quit tech and become an influencer."
    ],
    correctIndex: 1,
    explanation: "Algorithmic thinking is a learnable physical and mental skill. Diligent repetition of patterns over 10 to 60 days produces dramatic leaps in ability.",
    mentorKapilWisdom: {
      hiddenMeaning: "Imposter syndrome is actually a sign of self-awareness. Only people who care deeply about high craftsmanship experience it.",
      engineeringTakeaway: "Talent is a myth in entry-level software engineering. What looks like genius is just someone who has seen the pattern 20 times before you.",
      actionableHabit: "When self-doubt creeps in, open our Day 1 or Day 2 modules, solve 2 problems, and let the green checkmarks rebuild your confidence."
    },
    funStressReliever: "Every senior engineer you admire still looks at their own code from 6 months ago and asks 'Who wrote this garbage?'!"
  },
  {
    id: 22,
    segmentTitle: "Rajasthan Heat Formal Suit",
    theme: "Physical Composure",
    question: "It is 42°C in Udaipur. You are wearing a full 3-piece wool suit for an online interview in your non-AC hostel room. How do you keep your cool?",
    options: [
      "Faint on camera for dramatic sympathy.",
      "Ensure clean professional presentation from the waist up, keep a glass of chilled water handy, maintain a fan pointing at your back, and project calm confidence.",
      "Switch off your video and claim your camera caught fire.",
      "Take the interview wearing a gym singlet."
    ],
    correctIndex: 1,
    explanation: "Managing your physical environment and comfort allows your cognitive problem-solving faculties to function at 100%.",
    mentorKapilWisdom: {
      hiddenMeaning: "External friction is inevitable. Professionalism is maintaining your internal temperature regardless of external weather.",
      engineeringTakeaway: "Optimize your interview rig: Lighting on your face, fan silent, water nearby, laptop elevated to eye level.",
      actionableHabit: "Do a 2-minute camera and audio check 15 minutes before the call. Never enter a room flustered."
    },
    funStressReliever: "The universal uniform of modern software engineering: Formal ironed shirt on top, comfortable shorts below the camera line!"
  },
  {
    id: 23,
    segmentTitle: "Teammate Conflict Trap",
    theme: "Conflict Resolution",
    question: "The interviewer asks: 'Tell me about a time you had a major disagreement with a teammate.' Which answer wins the offer?",
    options: [
      "'I have never had any disagreements because I am a very agreeable person.'",
      "'My teammate was completely incompetent so I yelled at them and rewrote everything myself.'",
      "'We disagreed on choosing SQL vs NoSQL for our project. Instead of arguing personal opinions, we benchmarked our query patterns, analyzed read/write latency requirements, and let empirical data settle the architecture.'",
      "'We had a fist fight behind the campus canteen.'"
    ],
    correctIndex: 2,
    explanation: "Healthy teams disagree all the time. What top companies look for is resolving disagreements through data, benchmarks, and respectful collaboration.",
    mentorKapilWisdom: {
      hiddenMeaning: "Disagreements are not personal attacks; they are conflicting optimization criteria. Depersonalize the debate and let the metrics decide.",
      engineeringTakeaway: "Strong opinions, weakly held. Be passionate about your architecture, but willing to pivot instantly when better data arrives.",
      actionableHabit: "Never say 'I feel this database is better'. Say 'Based on our 90% read-heavy workload, an in-memory cache yields 4x lower latency'."
    },
    funStressReliever: "Answering 'I have never had a disagreement' tells the interviewer you either never worked on a team or never spoke!"
  },
  {
    id: 24,
    segmentTitle: "Tutorial Hell",
    theme: "Active vs Passive Learning",
    question: "You have watched 80 hours of YouTube tutorials on 'Full Stack Web & DSA Masterclass' but freeze when given an empty text editor with no instructions. Why?",
    options: [
      "The YouTube video resolution was too low.",
      "Passive watching creates an 'illusion of competence'. Real neural wiring and debugging instincts only form when your fingers write code and fix errors without assistance.",
      "Your laptop doesn't have enough RAM.",
      "You need to watch another 80 hours of tutorials."
    ],
    correctIndex: 1,
    explanation: "Watching someone else code is like watching someone lift weights at the gym—it builds zero muscle on your own body. Active recall is essential.",
    mentorKapilWisdom: {
      hiddenMeaning: "Tutorial hell is the safest place to feel productive while making zero progress. Growth only happens in the discomfort of a blank editor.",
      engineeringTakeaway: "The 20/80 Rule: Spend 20 minutes learning a concept, then spend 80 minutes writing variations, breaking the code, and fixing it.",
      actionableHabit: "Close the video after the explanation. Implement the algorithm from scratch with zero copy-pasting."
    },
    funStressReliever: "Watching 100 cooking videos doesn't prevent you from burning the Maggi. Open the IDE and write code!"
  },
  {
    id: 25,
    segmentTitle: "Offer Letter Triumph",
    theme: "Grit, Gratitude & The Next Step",
    question: "After 10 days of intense rigor, 80% passing standards, 50-MCQ pre/post tests, and countless debugging hours, your offer letter arrives in your inbox. What is Mentor Kapil's final directive?",
    options: [
      "Never look at code again for the rest of your life.",
      "Celebrate with gratitude to your family, mentor, and peers, remain humble, and realize that Day 1 of your software engineering journey has just officially begun.",
      "Send an arrogant email to every company that rejected you.",
      "Sleep for 3 continuous weeks."
    ],
    correctIndex: 1,
    explanation: "True engineers view milestones as checkpoints, not finish lines. Success built on discipline and humility compounds for decades.",
    mentorKapilWisdom: {
      hiddenMeaning: "The offer letter was never the ultimate goal. The real prize was the person you transformed into: resilient, disciplined, and capable of solving hard problems under pressure.",
      engineeringTakeaway: "Stay a perpetual learner. The technologies that will define your career 10 years from now haven't even been invented yet.",
      actionableHabit: "Reach out to one junior in college and mentor them the way you were mentored. Knowledge shared is competence multiplied."
    },
    funStressReliever: "Enjoy that victory samosa at the canteen—you earned every single byte of it!"
  }
];
