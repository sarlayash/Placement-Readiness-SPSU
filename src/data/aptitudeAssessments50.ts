export interface AptitudeQuestion {
  id: number;
  category: 'Quantitative Aptitude' | 'Logical Reasoning' | 'Verbal & Analytical';
  subtopic: string;
  targetCompanies: string[];
  question: string;
  options: string[];
  correctIndex: number;
  stepByStepSolution: string;
  mentorKapilShortcut: string;
  mentorKapilWisdom?: {
    hiddenMeaning: string;
    engineeringTakeaway: string;
    actionableHabit: string;
  };
}

export const APTITUDE_50_QUESTIONS: AptitudeQuestion[] = [
  // ---------------- QUANTITATIVE APTITUDE (1-20) ----------------
  {
    id: 1,
    category: 'Quantitative Aptitude',
    subtopic: 'Time and Work',
    targetCompanies: ['TCS NQT', 'Infosys', 'Cognizant'],
    question: 'A can complete a piece of work in 12 days, and B can complete the same work in 18 days. If they work together for 4 days, what fraction of the work remains unfinished?',
    options: ['4/9', '5/9', '1/3', '2/9'],
    correctIndex: 0,
    stepByStepSolution: 'Total work = LCM(12, 18) = 36 units. Efficiency of A = 36/12 = 3 units/day. Efficiency of B = 36/18 = 2 units/day. Combined efficiency = 3 + 2 = 5 units/day. Work done in 4 days = 4 * 5 = 20 units. Remaining work = 36 - 20 = 16 units. Fraction remaining = 16/36 = 4/9.',
    mentorKapilShortcut: 'Kapil LCM Method: Assume total units = 36. Efficiencies = 3 and 2 (sum = 5). 4 days = 20 units. Remaining = 16. Fraction = 16/36 = 4/9 in 15 seconds!'
  },
  {
    id: 2,
    category: 'Quantitative Aptitude',
    subtopic: 'Time, Speed and Distance',
    targetCompanies: ['Wipro', 'Accenture', 'TCS'],
    question: 'A train 180 meters long travelling at 72 km/h crosses a platform in 25 seconds. What is the length of the platform?',
    options: ['320 m', '300 m', '280 m', '350 m'],
    correctIndex: 0,
    stepByStepSolution: 'Speed in m/s = 72 * (5/18) = 20 m/s. Total distance covered in 25 seconds = 20 * 25 = 500 m. Since total distance = Train Length + Platform Length, Platform Length = 500 - 180 = 320 meters.',
    mentorKapilShortcut: 'Convert speed immediately: 72 km/h is 4 * 18, so in m/s it is 4 * 5 = 20 m/s. 20 * 25 = 500. Subtract 180 -> 320 m!'
  },
  {
    id: 3,
    category: 'Quantitative Aptitude',
    subtopic: 'Percentages & Profit-Loss',
    targetCompanies: ['Amazon', 'Infosys', 'Capgemini'],
    question: 'A shopkeeper sells an article at a discount of 15% on the marked price and still makes a profit of 19%. By what percentage is the marked price above the cost price?',
    options: ['40%', '35%', '45%', '50%'],
    correctIndex: 0,
    stepByStepSolution: 'Let Cost Price (CP) = 100. Selling Price (SP) = 119 (since 19% profit). SP is 85% of Marked Price (MP). So 0.85 * MP = 119 => MP = 119 / 0.85 = 140. Marked price is 140 - 100 = 40 above CP. Markup% = 40%.',
    mentorKapilShortcut: 'Kapil Formula: (Markup % + Discount %) / (100 - Discount %) = Profit %. Direct Ratio: MP/CP = (100 + Profit%)/(100 - Discount%) = 119/85 = 7/5 = 1.40 -> 40% markup!'
  },
  {
    id: 4,
    category: 'Quantitative Aptitude',
    subtopic: 'Simple & Compound Interest',
    targetCompanies: ['TCS Digital', 'Cognizant GenC', 'Infosys DSE'],
    question: 'The difference between compound interest and simple interest on a certain sum of money for 2 years at 10% per annum is Rs. 144. What is the principal sum?',
    options: ['Rs. 14,400', 'Rs. 12,000', 'Rs. 15,000', 'Rs. 16,000'],
    correctIndex: 0,
    stepByStepSolution: 'For 2 years, Difference = P * (R/100)^2. Here Difference = 144, R = 10%. 144 = P * (10/100)^2 = P * (1/100). P = 144 * 100 = Rs. 14,400.',
    mentorKapilShortcut: '2-Year Difference Rule: Diff = P * (r%)^2. Here (10%)^2 = 1%. If 1% of Principal = 144, then 100% = 144 * 100 = 14,400. Mental math!'
  },
  {
    id: 5,
    category: 'Quantitative Aptitude',
    subtopic: 'Ratios and Proportions',
    targetCompanies: ['Wipro', 'Capgemini', 'TCS'],
    question: 'If A : B = 3 : 4, B : C = 8 : 9, and C : D = 15 : 16, what is the ratio of A : D?',
    options: ['5 : 8', '3 : 5', '5 : 6', '1 : 2'],
    correctIndex: 0,
    stepByStepSolution: 'A/D = (A/B) * (B/C) * (C/D) = (3/4) * (8/9) * (15/16). Simplifying: (3 * 8 * 15) / (4 * 9 * 16) = (360) / (576). Divide numerator and denominator by 72: 360/72 = 5, 576/72 = 8. So A : D = 5 : 8.',
    mentorKapilShortcut: 'Direct Telescopic Cancellation: (3/4) * (8/9) * (15/16). Cancel 3 with 9 (gives 3 in denom). Cancel 8 with 4 (gives 2 in num). Cancel 2 with 16 (gives 8 in denom). 15 / (3 * 8) = 5/8. Solved in 8 seconds!'
  },
  {
    id: 6,
    category: 'Quantitative Aptitude',
    subtopic: 'Mixtures and Alligations',
    targetCompanies: ['Amazon', 'Infosys', 'Cognizant'],
    question: 'In what ratio must a grocer mix tea at Rs. 60 per kg with tea at Rs. 65 per kg so that by selling the mixture at Rs. 68.20 per kg, he may gain 10%?',
    options: ['3 : 2', '2 : 3', '3 : 4', '4 : 5'],
    correctIndex: 0,
    stepByStepSolution: 'Selling Price = Rs. 68.20 with 10% profit. Mean Cost Price = 68.20 / 1.10 = Rs. 62. By Alligation rule: Ratio of Cheaper to Dearer = (Price of Dearer - Mean) / (Mean - Price of Cheaper) = (65 - 62) / (62 - 60) = 3 / 2 = 3 : 2.',
    mentorKapilShortcut: 'Mean CP = 68.2/1.1 = 62. Cross subtraction: (65 - 62 = 3) on left, (62 - 60 = 2) on right. Ratio = 3 : 2!'
  },
  {
    id: 7,
    category: 'Quantitative Aptitude',
    subtopic: 'Permutations & Combinations',
    targetCompanies: ['TCS Digital', 'Infosys DSE', 'Amazon'],
    question: 'In how many different ways can the letters of the word "OPTICAL" be arranged so that the vowels always come together?',
    options: ['720', '5040', '120', '840'],
    correctIndex: 0,
    stepByStepSolution: 'Letters in "OPTICAL": Total 7 letters (O, P, T, I, C, A, L). Vowels are O, I, A (3 vowels). Consonants are P, T, C, L (4 consonants). Treat the 3 vowels as a single block: [O, I, A] + 4 consonants = 5 units. These 5 units can be arranged in 5! = 120 ways. Inside the block, the 3 vowels can be arranged among themselves in 3! = 6 ways. Total arrangements = 5! * 3! = 120 * 6 = 720.',
    mentorKapilShortcut: 'Block Method: 4 consonants + 1 vowel block = 5 items = 5! = 120. Internal vowel scramble = 3! = 6. 120 * 6 = 720. 10-second answer!'
  },
  {
    id: 8,
    category: 'Quantitative Aptitude',
    subtopic: 'Probability',
    targetCompanies: ['Cognizant', 'Accenture', 'Wipro'],
    question: 'Two dice are tossed simultaneously. What is the probability that the sum of the numbers appearing on the two dice is a prime number?',
    options: ['5/12', '7/12', '1/2', '13/36'],
    correctIndex: 0,
    stepByStepSolution: 'Total outcomes = 6 * 6 = 36. Possible prime sums from two dice are: 2, 3, 5, 7, 11. Sum 2: (1,1) -> 1 pair. Sum 3: (1,2), (2,1) -> 2 pairs. Sum 5: (1,4), (2,3), (3,2), (4,1) -> 4 pairs. Sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> 6 pairs. Sum 11: (5,6), (6,5) -> 2 pairs. Total favorable outcomes = 1 + 2 + 4 + 6 + 2 = 15. Probability = 15/36 = 5/12.',
    mentorKapilShortcut: 'Memorize the dice sum frequency pyramid: 2->1, 3->2, 5->4, 7->6, 11->2. Sum = 1 + 2 + 4 + 6 + 2 = 15. 15/36 = 5/12 instantly!'
  },
  {
    id: 9,
    category: 'Quantitative Aptitude',
    subtopic: 'Boats and Streams',
    targetCompanies: ['TCS NQT', 'Infosys', 'Capgemini'],
    question: 'A boat takes 90 minutes less to travel 36 miles downstream than to travel the same distance upstream. If the speed of the boat in still water is 10 mph, find the speed of the stream.',
    options: ['2 mph', '3 mph', '4 mph', '2.5 mph'],
    correctIndex: 0,
    stepByStepSolution: 'Let speed of stream = s. Upstream speed = 10 - s, Downstream speed = 10 + s. Time difference = 90 min = 1.5 hours. 36/(10 - s) - 36/(10 + s) = 1.5. Testing options: For s = 2: 36/(8) - 36/(12) = 4.5 - 3.0 = 1.5 hours. Perfectly matches!',
    mentorKapilShortcut: 'Always back-solve Boats & Streams using options! Plug s = 2: 36/8 = 4.5 hrs, 36/12 = 3 hrs. Difference = 1.5 hrs = 90 mins. Verified in 10 seconds!'
  },
  {
    id: 10,
    category: 'Quantitative Aptitude',
    subtopic: 'Ages Problem',
    targetCompanies: ['Wipro', 'Accenture', 'TCS'],
    question: 'The ratio of present ages of father and son is 7 : 3. Ten years ago, the ratio was 3 : 1. What will be the father\'s age 5 years from now?',
    options: ['75 years', '70 years', '65 years', '80 years'],
    correctIndex: 0,
    stepByStepSolution: 'Let present ages be 7x and 3x. Ten years ago: (7x - 10) / (3x - 10) = 3 / 1 => 7x - 10 = 9x - 30 => 2x = 20 => x = 10. Present age of father = 7 * 10 = 70 years. Father\'s age after 5 years = 70 + 5 = 75 years.',
    mentorKapilShortcut: 'Father present age is a multiple of 7. After 5 years, (Age - 5) must be divisible by 7! Options: 75 - 5 = 70 (divisible by 7). 70 - 5 = 65 (No). 65 - 5 = 60 (No). Only 75 works!'
  },
  {
    id: 11,
    category: 'Quantitative Aptitude',
    subtopic: 'Pipes and Cisterns',
    targetCompanies: ['Infosys', 'Cognizant', 'TCS'],
    question: 'Two pipes A and B can fill a tank in 20 minutes and 30 minutes respectively. A third pipe C can empty it in 15 minutes. If all three pipes are opened together, how long will it take to fill the tank?',
    options: ['60 minutes', '45 minutes', '30 minutes', 'Tank will never fill'],
    correctIndex: 0,
    stepByStepSolution: 'Tank capacity = LCM(20, 30, 15) = 60 units. Pipe A efficiency = +3 units/min. Pipe B efficiency = +2 units/min. Pipe C efficiency = -4 units/min (emptying). Net rate = +3 + 2 - 4 = +1 unit/min. Time taken to fill 60 units = 60 / 1 = 60 minutes.',
    mentorKapilShortcut: 'Unit capacity = 60. Net work rate = 3 + 2 - 4 = 1. 60 / 1 = 60 mins. Pure mental arithmetic.'
  },
  {
    id: 12,
    category: 'Quantitative Aptitude',
    subtopic: 'Number Systems & Divisibility',
    targetCompanies: ['Amazon', 'TCS Digital', 'Infosys DSE'],
    question: 'What is the remainder when 2^2026 is divided by 7?',
    options: ['2', '4', '1', '6'],
    correctIndex: 0,
    stepByStepSolution: 'By Fermat\'s Little Theorem, 2^6 = 1 (mod 7), and more specifically 2^3 = 8 = 1 (mod 7). So the cycle of powers of 2 mod 7 is: 2^1 = 2, 2^2 = 4, 2^3 = 1, with period 3. We divide exponent 2026 by 3: 2026 = 3 * 675 + 1 (remainder 1). Therefore, 2^2026 = 2^1 = 2 (mod 7).',
    mentorKapilShortcut: 'Fermat / Cyclicity rule: 2^3 = 8 = 1 mod 7 (period 3). Check remainder of 2026 mod 3: 2+0+2+6 = 10 -> 10 mod 3 = 1. Result = 2^1 = 2!'
  },
  {
    id: 13,
    category: 'Quantitative Aptitude',
    subtopic: 'Averages',
    targetCompanies: ['Cognizant', 'Wipro', 'Capgemini'],
    question: 'The average weight of 24 students in a class is 40 kg. When the weight of the teacher is included, the average increases by 1 kg. What is the weight of the teacher?',
    options: ['65 kg', '64 kg', '60 kg', '62 kg'],
    correctIndex: 0,
    stepByStepSolution: 'Old total weight = 24 * 40 = 960 kg. New count = 25 people. New average = 41 kg. New total weight = 25 * 41 = 1025 kg. Weight of teacher = 1025 - 960 = 65 kg.',
    mentorKapilShortcut: 'Kapil Deviation Method: Teacher enters and contributes 41 kg for themselves, plus compensates +1 kg for each of the 24 existing students! 41 + 24 = 65 kg in 5 seconds!'
  },
  {
    id: 14,
    category: 'Quantitative Aptitude',
    subtopic: 'Mensuration (2D/3D)',
    targetCompanies: ['TCS', 'Infosys', 'Accenture'],
    question: 'If the radius of a circle is increased by 20%, by what percentage does its area increase?',
    options: ['44%', '40%', '20%', '48%'],
    correctIndex: 0,
    stepByStepSolution: 'Area of circle = pi * r^2. Let initial radius = 10. Initial Area = 100 * pi. New radius = 12. New Area = 144 * pi. Percentage increase = ((144 - 100) / 100) * 100% = 44%.',
    mentorKapilShortcut: 'Successive Percentage Formula: a + b + (ab/100). For radius squared: 20 + 20 + (20 * 20)/100 = 40 + 4 = 44% instant!'
  },
  {
    id: 15,
    category: 'Quantitative Aptitude',
    subtopic: 'Partnership',
    targetCompanies: ['Infosys', 'Cognizant', 'Wipro'],
    question: 'A, B, and C enter into a partnership. A invests Rs. 6500 for 6 months, B invests Rs. 8400 for 5 months, and C invests Rs. 10000 for 3 months. If the total annual profit is Rs. 7400, find A\'s share.',
    options: ['Rs. 2600', 'Rs. 2800', 'Rs. 2000', 'Rs. 2400'],
    correctIndex: 0,
    stepByStepSolution: 'Profit ratio = (Capital_A * Time_A) : (Capital_B * Time_B) : (Capital_C * Time_C) = (6500 * 6) : (8400 * 5) : (10000 * 3) = 39000 : 42000 : 30000. Divide by 3000: 13 : 14 : 10. Total parts = 13 + 14 + 10 = 37 parts. Total profit = Rs. 7400. Value of 1 part = 7400 / 37 = 200. A\'s share = 13 * 200 = Rs. 2600.',
    mentorKapilShortcut: 'Ratio: 39 : 42 : 30 -> 13 : 14 : 10. Total = 37 parts. 7400 / 37 = 200. A\'s share = 13 * 200 = 2600!'
  },
  {
    id: 16,
    category: 'Quantitative Aptitude',
    subtopic: 'Clocks',
    targetCompanies: ['TCS Digital', 'Amazon', 'Infosys'],
    question: 'At what time between 4 and 5 o\'clock will the hands of a clock be pointing in opposite directions (180 degrees)?',
    options: ['54 6/11 minutes past 4', '53 7/11 minutes past 4', '50 minutes past 4', '52 4/11 minutes past 4'],
    correctIndex: 0,
    stepByStepSolution: 'At 4 o\'clock, hour hand is at 20 minute spaces. To be opposite (180 deg), the minute hand must be 30 minute spaces apart, so minute hand must gain 20 + 30 = 50 minute spaces. In 60 minutes, the minute hand gains 55 minute spaces over the hour hand. Time taken to gain 50 spaces = 50 * (60/55) = 50 * (12/11) = 600/11 = 54 6/11 minutes past 4.',
    mentorKapilShortcut: 'Kapil Clock Master Rule: Time = (Minute spaces to gain) * (12/11). Minute spaces = 20 + 30 = 50. 50 * 12/11 = 600/11 = 54 6/11!'
  },
  {
    id: 17,
    category: 'Quantitative Aptitude',
    subtopic: 'Calendars',
    targetCompanies: ['Capgemini', 'Wipro', 'TCS'],
    question: 'If 15th August 2024 was a Thursday, what day of the week was 15th August 2025?',
    options: ['Friday', 'Saturday', 'Thursday', 'Sunday'],
    correctIndex: 0,
    stepByStepSolution: 'From 15th August 2024 to 15th August 2025 is exactly 1 normal year (365 days). (Note: 2024 was a leap year, but February 2024 has already passed). Number of odd days in a normal year = 365 % 7 = 1 odd day. Therefore, Day = Thursday + 1 = Friday.',
    mentorKapilShortcut: 'Normal year has 1 odd day; leap year has 2 odd days. Since Feb 2024 is behind us, the elapsed period only spans 365 days (1 odd day). Thursday + 1 = Friday!'
  },
  {
    id: 18,
    category: 'Quantitative Aptitude',
    subtopic: 'Simplification and Surds',
    targetCompanies: ['Accenture', 'TCS', 'Cognizant'],
    question: 'Find the value of sqrt(42 + sqrt(42 + sqrt(42 + ... inf))).',
    options: ['7', '6', '14', '8'],
    correctIndex: 0,
    stepByStepSolution: 'Let x = sqrt(42 + x). Squaring both sides: x^2 = 42 + x => x^2 - x - 42 = 0 => (x - 7)(x + 6) = 0. Since the radical expression is positive, x = 7.',
    mentorKapilShortcut: 'Kapil Consecutive Factors Rule: If expression is sqrt(N + sqrt(N + ...)), factor N as n * (n + 1). 42 = 6 * 7. Since there is a PLUS sign, answer is the LARGER factor = 7! (If minus, answer would be 6).'
  },
  {
    id: 19,
    category: 'Quantitative Aptitude',
    subtopic: 'Quadratic Equations',
    targetCompanies: ['Infosys DSE', 'TCS Digital', 'Amazon'],
    question: 'If the roots of the equation x^2 - 12x + k = 0 are in the ratio 1 : 2, find the value of k.',
    options: ['32', '24', '36', '20'],
    correctIndex: 0,
    stepByStepSolution: 'Let the roots be r and 2r. Sum of roots = r + 2r = 3r. From the equation, sum of roots = -(-12)/1 = 12. 3r = 12 => r = 4. The roots are 4 and 8. Product of roots = k = 4 * 8 = 32.',
    mentorKapilShortcut: 'Sum = 12, ratio 1:2 -> roots are 4 and 8. Product k = 4 * 8 = 32. Direct 5-second mental step!'
  },
  {
    id: 20,
    category: 'Quantitative Aptitude',
    subtopic: 'Linear Equations & Algebra',
    targetCompanies: ['Cognizant', 'Capgemini', 'Wipro'],
    question: '5 pens and 3 pencils cost Rs. 85, while 3 pens and 5 pencils cost Rs. 75. What is the cost of 1 pen and 1 pencil together?',
    options: ['Rs. 20', 'Rs. 18', 'Rs. 22', 'Rs. 25'],
    correctIndex: 0,
    stepByStepSolution: 'Equation 1: 5P + 3Q = 85. Equation 2: 3P + 5Q = 75. Adding both equations directly: 8P + 8Q = 160 => 8(P + Q) = 160 => P + Q = 20. Cost of 1 pen + 1 pencil = Rs. 20.',
    mentorKapilShortcut: 'Symmetric Linear Equations Trick: Whenever coefficients cross-swap (5,3 and 3,5), simply ADD the equations! 8P + 8Q = 160 -> P + Q = 20. No need to solve for P and Q individually!'
  },

  // ---------------- LOGICAL REASONING (21-38) ----------------
  {
    id: 21,
    category: 'Logical Reasoning',
    subtopic: 'Syllogisms',
    targetCompanies: ['TCS NQT', 'Infosys', 'Capgemini'],
    question: 'Statements: 1) All algorithms are logic. 2) Some logic are circuits. Conclusions: I) Some circuits are algorithms. II) Some logic are algorithms.',
    options: ['Only conclusion II follows', 'Only conclusion I follows', 'Both I and II follow', 'Neither follows'],
    correctIndex: 0,
    stepByStepSolution: 'Statement 1: All A are L. By standard categorical syllogism conversion, "All A are L" implies "Some L are A" (Conclusion II is valid). Between "circuits" and "algorithms", circuits only intersect with some logic; it does not necessarily intersect with the algorithms subset of logic. Hence Conclusion I is not certain. Only conclusion II follows.',
    mentorKapilShortcut: 'Venn Diagram Rule: Universal affirmative (All A are B) converts immediately to particular affirmative (Some B are A). Thus Conclusion II is 100% true without drawing!'
  },
  {
    id: 22,
    category: 'Logical Reasoning',
    subtopic: 'Blood Relations',
    targetCompanies: ['Wipro', 'Cognizant', 'Accenture'],
    question: 'Pointing to a photograph, Rohit said, "She is the daughter of the only son of my grandfather." How is the girl in the photograph related to Rohit?',
    options: ['Sister', 'Mother', 'Cousin', 'Aunt'],
    correctIndex: 0,
    stepByStepSolution: '"Only son of my grandfather" = Rohit\'s father (since he has only one son). "Daughter of my father" = Rohit\'s sister. Therefore, the girl is Rohit\'s sister.',
    mentorKapilShortcut: 'Reverse Tree Walk: Grandfather\'s ONLY son = Father. Father\'s daughter = Sister. Instant 5-second conclusion!'
  },
  {
    id: 23,
    category: 'Logical Reasoning',
    subtopic: 'Coding-Decoding',
    targetCompanies: ['Infosys', 'TCS NQT', 'Amazon'],
    question: 'In a certain code language, if "SYSTEM" is coded as "SYSMET" and "NEARER" is coded as "AENRER", how will "FRACTION" be coded?',
    options: ['CARFNOIT', 'CARFTION', 'CRAFNOIT', 'ARFCNOIT'],
    correctIndex: 0,
    stepByStepSolution: 'Analyze pattern on SYSTEM (6 letters): Divide into two halves: SYS and TEM. First half SYS reversed = SYS. Second half TEM reversed = MET. Result: SYSMET. For NEARER: NEA reversed = AEN, RER reversed = RER -> AENRER. For FRACTION (8 letters): First half FRAC reversed = CARF. Second half TION reversed = NOIT. Combined = CARFNOIT.',
    mentorKapilShortcut: 'Split into equal halves and reverse each half! FRACTION -> FRAC / TION -> CARF / NOIT -> CARFNOIT!'
  },
  {
    id: 24,
    category: 'Logical Reasoning',
    subtopic: 'Direction Sense',
    targetCompanies: ['Capgemini', 'TCS', 'Cognizant'],
    question: 'An engineer walks 30 meters North, then turns right and walks 40 meters. She then turns right again and walks 60 meters, and finally turns left and walks 20 meters. How far and in which direction is she from her starting point?',
    options: ['30*sqrt(5) meters South-East', '50 meters South-East', '30*sqrt(5) meters North-East', '60 meters South'],
    correctIndex: 0,
    stepByStepSolution: 'Track coordinates (x = East/West, y = North/South). Start at (0, 0). 1) 30 m North -> (0, 30). 2) Turn right (East) 40 m -> (40, 30). 3) Turn right (South) 60 m -> (40, 30 - 60) = (40, -30). 4) Turn left (East) 20 m -> (40 + 20, -30) = (60, -30). Distance = sqrt(60^2 + (-30)^2) = sqrt(3600 + 900) = sqrt(4500) = 30 * sqrt(5) meters. Direction: x > 0 (East), y < 0 (South) -> South-East.',
    mentorKapilShortcut: 'Coordinate tracking: North +30, South -60 = Net South -30. East +40, East +20 = Net East +60. Distance = sqrt(60^2 + 30^2) = 30*sqrt(2^2 + 1^2) = 30*sqrt(5) m South-East!'
  },
  {
    id: 25,
    category: 'Logical Reasoning',
    subtopic: 'Circular Seating Arrangement',
    targetCompanies: ['Amazon', 'Infosys DSE', 'TCS Digital'],
    question: 'Six friends P, Q, R, S, T, and U are sitting around a circular table facing the center. P is opposite to S. Q is sitting between P and T. R is sitting between P and U. Who is sitting immediately to the right of S?',
    options: ['T', 'U', 'R', 'Q'],
    correctIndex: 0,
    stepByStepSolution: 'Arrange on circle: Place P at the top (12 o\'clock). P is opposite to S, so S is at bottom (6 o\'clock). Q is between P and T, R is between P and U. To place P at top with Q and R adjacent to P: say Q is at 2 o\'clock and R is at 10 o\'clock. Then T is at 4 o\'clock (adjacent to Q and S), and U is at 8 o\'clock (adjacent to R and S). Looking from S towards center: S\'s right is at 4 o\'clock (where T is sitting). Therefore, T is immediately to the right of S.',
    mentorKapilShortcut: 'Clock face mapping: S is at 6. Facing center, S\'s right hand points towards 4 o\'clock (counter-clockwise). T is between Q and S at 4 o\'clock. Immediate right of S is T!'
  },
  {
    id: 26,
    category: 'Logical Reasoning',
    subtopic: 'Number Series Completion',
    targetCompanies: ['Wipro', 'TCS', 'Infosys'],
    question: 'Identify the next number in the series: 7, 13, 25, 49, 97, ?',
    options: ['193', '185', '194', '189'],
    correctIndex: 0,
    stepByStepSolution: 'Examine pattern of differences or multiples: 7 * 2 - 1 = 13. 13 * 2 - 1 = 25. 25 * 2 - 1 = 49. 49 * 2 - 1 = 97. Following the rule: 97 * 2 - 1 = 194 - 1 = 193.',
    mentorKapilShortcut: 'Pattern is 2x - 1! 97 * 2 = 194. 194 - 1 = 193 in 3 seconds.'
  },
  {
    id: 27,
    category: 'Logical Reasoning',
    subtopic: 'Letter Series & Analogies',
    targetCompanies: ['Accenture', 'Cognizant', 'Capgemini'],
    question: 'Select the missing term: BCD, EFG, HIJ, ?',
    options: ['KLM', 'LMN', 'JKM', 'KMN'],
    correctIndex: 0,
    stepByStepSolution: 'Consecutive alphabetical triplets: BCD (2,3,4), EFG (5,6,7), HIJ (8,9,10). The next triplet is letters 11, 12, 13 = KLM.',
    mentorKapilShortcut: 'Continuous alphabetical sequences of length 3: BCD -> EFG -> HIJ -> KLM!'
  },
  {
    id: 28,
    category: 'Logical Reasoning',
    subtopic: 'Clock Angle Problem',
    targetCompanies: ['TCS', 'Infosys', 'Wipro'],
    question: 'What is the angle between the hour hand and minute hand of a clock at 3:40?',
    options: ['130 degrees', '140 degrees', '125 degrees', '135 degrees'],
    correctIndex: 0,
    stepByStepSolution: 'Formula for angle between hands: Angle = |(30 * H) - (11/2 * M)|. Here H = 3, M = 40. Angle = |(30 * 3) - (11/2 * 40)| = |90 - 220| = |-130| = 130 degrees.',
    mentorKapilShortcut: 'Direct Kapil Formula: |30H - 5.5M|. 30(3) = 90. 5.5 * 40 = 220. |90 - 220| = 130 deg!'
  },
  {
    id: 29,
    category: 'Logical Reasoning',
    subtopic: 'Order and Ranking',
    targetCompanies: ['Cognizant', 'Capgemini', 'TCS'],
    question: 'In a class of 45 students, Aditya ranks 18th from the top. What is his rank from the bottom?',
    options: ['28th', '27th', '29th', '30th'],
    correctIndex: 0,
    stepByStepSolution: 'Total = Top_Rank + Bottom_Rank - 1. 45 = 18 + Bottom_Rank - 1 => 45 = 17 + Bottom_Rank => Bottom_Rank = 45 - 17 = 28.',
    mentorKapilShortcut: 'Rank from bottom = (Total + 1) - Top Rank = 46 - 18 = 28th!'
  },
  {
    id: 30,
    category: 'Logical Reasoning',
    subtopic: 'Statement and Assumptions',
    targetCompanies: ['TCS Digital', 'Infosys DSE', 'Amazon'],
    question: 'Statement: "Join SPSU Udaipur Placement Boot Camp to guarantee high algorithmic readiness." - Mentor Kapil. Assumptions: I) Students aspire for high algorithmic readiness. II) The SPSU boot camp provides quality instruction.',
    options: ['Both assumptions I and II are implicit', 'Only assumption I is implicit', 'Only assumption II is implicit', 'Neither is implicit'],
    correctIndex: 0,
    stepByStepSolution: 'Any advertisement or invitation assumes that the audience desires the outcome (Assumption I) and that the entity can deliver that outcome effectively (Assumption II). Both assumptions are inherently implicit in making the statement.',
    mentorKapilShortcut: 'Ad Rule: An announcement implicitly presumes both a demand for the benefit and competence to deliver it.'
  },
  {
    id: 31,
    category: 'Logical Reasoning',
    subtopic: 'Statement and Course of Action',
    targetCompanies: ['Cognizant', 'Wipro', 'Accenture'],
    question: 'Statement: Many candidates face severe anxiety during technical whiteboard rounds. Courses of action: 1) Candidates should conduct timed mock interviews with mentors to normalize pressure. 2) Companies should completely abolish coding rounds.',
    options: ['Only course 1 is feasible and logical', 'Only course 2 is feasible', 'Both 1 and 2 follow', 'Neither follows'],
    correctIndex: 0,
    stepByStepSolution: 'Course 1 directly addresses the root cause through practice and mental conditioning. Course 2 is extreme, unfeasible, and unrealistic for industry vetting. Only Course 1 is actionable.',
    mentorKapilShortcut: 'Eliminate extreme courses of action that shut down necessary processes. Support progressive remediation!'
  },
  {
    id: 32,
    category: 'Logical Reasoning',
    subtopic: 'Data Sufficiency',
    targetCompanies: ['Amazon', 'Infosys DSE', 'TCS Digital'],
    question: 'Is integer x even? Statement 1: x + 3 is an odd integer. Statement 2: 2x is an even integer.',
    options: ['Statement 1 alone is sufficient, but Statement 2 alone is not', 'Statement 2 alone is sufficient', 'Both statements together are needed', 'Neither statement is sufficient'],
    correctIndex: 0,
    stepByStepSolution: 'From Statement 1: x + 3 = Odd => x = Odd - Odd = Even. Thus, Statement 1 uniquely proves x is even. Statement 2: 2x is even for ANY integer x (whether x is odd or even, 2 * odd = even, 2 * even = even), so Statement 2 does not specify whether x is even or odd. Hence Statement 1 alone is sufficient.',
    mentorKapilShortcut: 'Even + Odd = Odd -> If x + 3 is Odd, x must be Even. Statement 2 (2x is even) is a tautology that gives zero info on x!'
  },
  {
    id: 33,
    category: 'Logical Reasoning',
    subtopic: 'Cubes and Dice',
    targetCompanies: ['TCS', 'Capgemini', 'Cognizant'],
    question: 'A cube is painted red on all six faces and cut into 64 smaller cubes of equal size. How many smaller cubes have exactly two red faces?',
    options: ['24', '16', '32', '12'],
    correctIndex: 0,
    stepByStepSolution: 'Total cubes = n^3 = 64 => n = 4. Cubes with exactly 2 painted faces lie on the edges (excluding the corners). Formula = 12 * (n - 2). For n = 4: 12 * (4 - 2) = 12 * 2 = 24.',
    mentorKapilShortcut: 'Standard Cube Formulas: Corners (3 faces) = 8. Edges (2 faces) = 12(n - 2) = 12(2) = 24. Centers (1 face) = 6(n - 2)^2 = 24. Core (0 faces) = (n - 2)^3 = 8.'
  },
  {
    id: 34,
    category: 'Logical Reasoning',
    subtopic: 'Venn Diagram Deductions',
    targetCompanies: ['Infosys', 'Wipro', 'TCS'],
    question: 'In a group of 100 developers, 65 know Python, 55 know Java, and 40 know both languages. How many developers know neither Python nor Java?',
    options: ['20', '15', '25', '10'],
    correctIndex: 0,
    stepByStepSolution: 'Total developers = 100. Developers knowing at least one language = n(P U J) = n(P) + n(J) - n(P int J) = 65 + 55 - 40 = 80. Developers knowing neither = 100 - 80 = 20.',
    mentorKapilShortcut: 'Set Union: 65 + 55 - 40 = 80. Subtract from 100: 100 - 80 = 20 in 5 seconds!'
  },
  {
    id: 35,
    category: 'Logical Reasoning',
    subtopic: 'Inequalities',
    targetCompanies: ['TCS Digital', 'Cognizant', 'Accenture'],
    question: 'Given: A > B >= C = D < E. Which of the following conclusions is definitely true?',
    options: ['A > D', 'B < E', 'A = C', 'C > E'],
    correctIndex: 0,
    stepByStepSolution: 'From the statement: A > B and B >= C and C = D. Since A > B and B >= D, it strictly follows that A > D.',
    mentorKapilShortcut: 'A > B >= D => A > D directly. Solved in 2 seconds!'
  },
  {
    id: 36,
    category: 'Logical Reasoning',
    subtopic: 'Linear Seating',
    targetCompanies: ['Infosys', 'Capgemini', 'Wipro'],
    question: 'Five people A, B, C, D, and E are standing in a row facing North. C is sitting in the exact middle. A is to the immediate left of C. E is at one of the extreme ends. Who is sitting to the immediate right of A?',
    options: ['C', 'B', 'D', 'E'],
    correctIndex: 0,
    stepByStepSolution: 'Row positions: 1, 2, 3, 4, 5. C is in the middle -> Position 3. A is to the immediate left of C -> Position 2. Therefore, to the immediate right of A is Position 3, which is C.',
    mentorKapilShortcut: 'If A is immediately left of C, then C is immediately right of A by definition!'
  },
  {
    id: 37,
    category: 'Logical Reasoning',
    subtopic: 'Missing Character in Matrix',
    targetCompanies: ['TCS NQT', 'Cognizant', 'Infosys'],
    question: 'In a 3x3 matrix, row 1 is [3, 4, 25], row 2 is [5, 12, 169], row 3 is [7, 24, ?]. What is the missing number?',
    options: ['625', '576', '49', '676'],
    correctIndex: 0,
    stepByStepSolution: 'Notice Pythagorean triples: 3^2 + 4^2 = 9 + 16 = 25. 5^2 + 12^2 = 25 + 144 = 169. For row 3: 7^2 + 24^2 = 49 + 576 = 625 (25^2 = 625).',
    mentorKapilShortcut: 'Pythagorean Triplets: (3, 4, 5^2=25), (5, 12, 13^2=169), (7, 24, 25^2=625)!'
  },
  {
    id: 38,
    category: 'Logical Reasoning',
    subtopic: 'Critical Deduction',
    targetCompanies: ['Amazon', 'Infosys DSE', 'TCS Digital'],
    question: 'If all Z are Y, and no Y are X, which of the following MUST be true?',
    options: ['No Z are X', 'Some Z are X', 'All X are Z', 'Some Y are X'],
    correctIndex: 0,
    stepByStepSolution: 'Z is a subset of Y. Since Y and X have an empty intersection (disjoint sets), no element in Z can belong to X. Thus, "No Z are X" is definitely true.',
    mentorKapilShortcut: 'Disjoint containment: If country Y has no trade with country X, then city Z inside country Y also has no trade with country X!'
  },

  // ---------------- VERBAL & ANALYTICAL (39-50) ----------------
  {
    id: 39,
    category: 'Verbal & Analytical',
    subtopic: 'Sentence Correction & Grammar',
    targetCompanies: ['TCS NQT', 'Infosys', 'Accenture'],
    question: 'Choose the grammatically correct sentence: "Neither the system architect nor the backend engineers _____ able to resolve the database deadlock."',
    options: ['were', 'was', 'is', 'has been'],
    correctIndex: 0,
    stepByStepSolution: 'Subject-Verb Agreement with "Neither... nor": When two subjects are connected by "or" or "nor", the verb agrees with the subject closest to it. Here the closest subject is "the backend engineers" (plural). Therefore, the plural past verb "were" is grammatically required.',
    mentorKapilShortcut: 'Rule of Proximity: In "Neither A nor B", look ONLY at B! Here B = "backend engineers" (plural), so verb = WERE.'
  },
  {
    id: 40,
    category: 'Verbal & Analytical',
    subtopic: 'Vocabulary & Contextual Usage',
    targetCompanies: ['Capgemini', 'Cognizant', 'Wipro'],
    question: 'Select the word most nearly opposite in meaning (Antonym) to "METICULOUS":',
    options: ['Careless', 'Diligent', 'Scrupulous', 'Methodical'],
    correctIndex: 0,
    stepByStepSolution: '"Meticulous" means showing great attention to detail, very careful and precise. Diligent, scrupulous, and methodical are all synonyms. The direct antonym is "Careless".',
    mentorKapilShortcut: 'Meticulous = Ultra-careful. Antonym = Careless.'
  },
  {
    id: 41,
    category: 'Verbal & Analytical',
    subtopic: 'Reading Comprehension & Inference',
    targetCompanies: ['TCS Digital', 'Infosys DSE', 'Amazon'],
    question: 'Passage: "Distributed caches reduce latency by storing frequently queried data in fast memory, but introduce cache invalidation challenges when updates occur in the primary database." What can be logically inferred?',
    options: [
      'Distributed caching involves a fundamental trade-off between read speed and data consistency.',
      'Distributed caches should never be used in modern production systems.',
      'Primary databases are no longer necessary when using distributed caches.',
      'Cache invalidation is completely solved in modern memory architectures.'
    ],
    correctIndex: 0,
    stepByStepSolution: 'The passage highlights speed benefits ("reduce latency") paired directly with invalidation challenges upon update ("cache invalidation challenges"). This expresses the classic speed vs. consistency engineering trade-off.',
    mentorKapilShortcut: 'Identify the trade-off stated: "reduces latency" + "invalidation challenges" = Read Speed vs Data Consistency!'
  },
  {
    id: 42,
    category: 'Verbal & Analytical',
    subtopic: 'Idioms and Phrases',
    targetCompanies: ['Cognizant', 'TCS NQT', 'Wipro'],
    question: 'What is the meaning of the idiom "to burn the candle at both ends"?',
    options: [
      'To exhaust oneself by working excessively hard late into the night and early morning.',
      'To waste valuable electricity during engineering assignments.',
      'To celebrate a successful campus placement offer with friends.',
      'To write inefficient O(N^2) algorithms intentionally.'
    ],
    correctIndex: 0,
    stepByStepSolution: '"To burn the candle at both ends" means working relentlessly from early morning to late night, exhausting one\'s physical and mental energy.',
    mentorKapilShortcut: 'Candle burning from both sides burns out twice as fast = Overworking without rest.'
  },
  {
    id: 43,
    category: 'Verbal & Analytical',
    subtopic: 'Para Jumbles (Sentence Rearrangement)',
    targetCompanies: ['Infosys', 'TCS', 'Capgemini'],
    question: 'Arrange the sentences into a coherent paragraph: P) Consequently, latency drops and user experience improves. Q) It stores compiled query results in high-speed RAM. R) Redis is an open-source in-memory key-value data store. S) Applications can access this stored data in sub-millisecond time.',
    options: ['RQSP', 'RSPQ', 'QSRP', 'PRQS'],
    correctIndex: 0,
    stepByStepSolution: 'R introduces the core subject ("Redis is an open-source in-memory..."). Q explains its mechanism ("It stores compiled query results in RAM"). S describes the effect ("Applications can access this stored data..."). P concludes with the final impact ("Consequently, latency drops..."). Sequence: R -> Q -> S -> P.',
    mentorKapilShortcut: 'Introduction first: Only R introduces the noun "Redis". P starts with "Consequently" (conclusion). Order MUST begin with R and end with P -> RQSP!'
  },
  {
    id: 44,
    category: 'Verbal & Analytical',
    subtopic: 'Error Spotting',
    targetCompanies: ['Accenture', 'Cognizant', 'Wipro'],
    question: 'Find the part with an error: "The team lead (A) / accompanied by four developers (B) / are attending (C) / the international tech summit (D)."',
    options: ['Part C', 'Part A', 'Part B', 'Part D'],
    correctIndex: 0,
    stepByStepSolution: 'When a singular subject ("The team lead") is joined to other words by "accompanied by", "along with", "as well as", the verb must agree with the primary subject. Here "The team lead" is singular, so Part C should use "is attending", not "are attending".',
    mentorKapilShortcut: 'Parenthetical phrases like "accompanied by" do NOT change subject number! "The team lead [accompanied by...] IS attending". Error is in Part C.'
  },
  {
    id: 45,
    category: 'Verbal & Analytical',
    subtopic: 'One Word Substitution',
    targetCompanies: ['TCS NQT', 'Infosys', 'Capgemini'],
    question: 'One who possesses varied talents and can adapt easily to different tasks is called:',
    options: ['Versatile', 'Fastidious', 'Altruist', 'Gregarious'],
    correctIndex: 0,
    stepByStepSolution: '"Versatile" means able to adapt or be adapted to many different functions or activities. Fastidious = hard to please; Altruist = selfless helper; Gregarious = sociable.',
    mentorKapilShortcut: 'Versatile = Multi-skilled adaptive engineer.'
  },
  {
    id: 46,
    category: 'Verbal & Analytical',
    subtopic: 'Analogies (Verbal)',
    targetCompanies: ['Cognizant', 'TCS', 'Amazon'],
    question: 'COMPILER : CODE :: TRANSLATOR : ?',
    options: ['SPEECH', 'DICTIONARY', 'ALGORITHM', 'COMPUTER'],
    correctIndex: 0,
    stepByStepSolution: 'A compiler converts and interprets computer code from one form to another. Similarly, a human translator converts and interprets spoken or written speech/language from one tongue to another.',
    mentorKapilShortcut: 'Entity to medium: Compiler processes code; Translator processes speech/language.'
  },
  {
    id: 47,
    category: 'Verbal & Analytical',
    subtopic: 'Data Interpretation (Chart Reasoning)',
    targetCompanies: ['Amazon', 'Infosys DSE', 'TCS Digital'],
    question: 'A company\'s server revenue was Rs. 40 crores in 2023 and Rs. 52 crores in 2024. What was the percentage growth in revenue?',
    options: ['30%', '25%', '35%', '20%'],
    correctIndex: 0,
    stepByStepSolution: 'Growth = 52 - 40 = 12 crores. Percentage growth = (12 / 40) * 100% = (3 / 10) * 100% = 30%.',
    mentorKapilShortcut: '12 / 40 = 3 / 10 = 30%!'
  },
  {
    id: 48,
    category: 'Verbal & Analytical',
    subtopic: 'Cause and Effect',
    targetCompanies: ['TCS Digital', 'Infosys', 'Wipro'],
    question: 'Statement I: The engineering college opened modern GPU computing labs on campus. Statement II: Many students successfully built and deployed deep learning projects this semester.',
    options: [
      'Statement I is the cause and Statement II is its effect',
      'Statement II is the cause and Statement I is its effect',
      'Both statements are independent causes',
      'Both statements are effects of independent causes'
    ],
    correctIndex: 0,
    stepByStepSolution: 'The opening of GPU computing labs (Statement I) provided the infrastructural capability that enabled students to build and deploy deep learning models (Statement II). Statement I is the direct cause and Statement II is the resulting effect.',
    mentorKapilShortcut: 'Infrastructure creation (cause) precedes student project deployment (effect).'
  },
  {
    id: 49,
    category: 'Verbal & Analytical',
    subtopic: 'Critical Reasoning (Strengthening Argument)',
    targetCompanies: ['Amazon', 'Infosys DSE', 'Cognizant'],
    question: 'Argument: "Practicing 50 quality aptitude MCQs daily increases a candidate\'s clearing rate in TCS and Infosys entrance tests by 70%." Which finding most strongly strengthens this argument?',
    options: [
      'A 3-year study across 10,000 engineering candidates showed candidates with daily 50-MCQ discipline cleared cognitive rounds at twice the rate of passive studiers.',
      'Some students cleared tests without any formal practice.',
      'Recruiters look at extracurricular activities as well.',
      'Coding rounds happen after aptitude tests.'
    ],
    correctIndex: 0,
    stepByStepSolution: 'Option A provides large-scale empirical data (10,000 candidates over 3 years) directly demonstrating that daily 50-MCQ practice doubled cognitive clearing rates, strongly validating the core claim.',
    mentorKapilShortcut: 'Empirical statistical corroboration with large sample size directly fortifies the causal claim!'
  },
  {
    id: 50,
    category: 'Verbal & Analytical',
    subtopic: 'Professional Technical Ethics',
    targetCompanies: ['TCS Digital', 'Infosys', 'Amazon', 'Cognizant'],
    question: 'During a production release, you discover a minor race condition that only triggers once in 100,000 transactions. The product manager asks you to push it live anyway to meet today\'s marketing deadline. What is the ethically and technically sound response?',
    options: [
      'Transparently document the risk and latency metrics, propose an immediate 2-hour hotfix or feature flag rollback mechanism, and align on an informed mitigation plan before deployment.',
      'Silently deploy the code and pretend you never noticed the bug.',
      'Post on social media complaining about management.',
      'Resign from the company immediately.'
    ],
    correctIndex: 0,
    stepByStepSolution: 'Professional engineering integrity requires transparent risk disclosure, architectural mitigation (feature flags, hotfixes), and collaborative problem solving rather than reckless silence or unprofessional drama.',
    mentorKapilWisdom: {
      hiddenMeaning: "Engineering excellence is not perfection; it is total transparency about system boundaries and proactive contingency control.",
      engineeringTakeaway: "Always provide solutions alongside risk reports: 'Here is the risk, here is the likelihood, and here are the two mitigation paths.'",
      actionableHabit: "Implement feature flags for critical releases so any edge-case failure can be disabled instantly without rolling back the entire build."
    },
    mentorKapilShortcut: 'Professional Rule: Quantify risk, provide an immediate mitigation (hotfix/flag), and communicate transparently before production push!'
  }
];
