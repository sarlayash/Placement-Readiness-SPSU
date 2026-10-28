import { AssessmentQuestion } from '../types';

/**
 * Day 4 Assessments (50 Pre-Assessment MCQs & 50 Post-Assessment MCQs = 100 Total)
 * Module 4: SQL & Relational Database Systems
 * Mentor: Kapil (SPSU Udaipur Placement Readiness Program)
 * Coverage: SQL Logical Execution Order, Three-Valued Logic (NULLs), Joins (Hash/Merge/Nested Loop),
 * Correlated Subqueries, Common Table Expressions (Recursive CTEs), Window Functions (RANK, DENSE_RANK, LEAD/LAG),
 * Normalisation (1NF, 2NF, 3NF, BCNF, Lossless Decomposition), B+ Tree Indexing Architecture & Sargability,
 * Transactions (ACID), Isolation Levels (Dirty, Non-repeatable, Phantom Reads), 2PL & MVCC Concurrency.
 * Formatted with balanced A/B/C/D key distribution & dedicated syntax codeSnippet blocks.
 */

export const DAY_4_PRE_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d4-pre-1",
    "question": "What is the true logical execution order of clauses in a standard SQL query?",
    "codeSnippet": "SELECT dept_id, AVG(salary) FROM employees WHERE age > 25 GROUP BY dept_id HAVING COUNT(*) > 5 ORDER BY AVG(salary) DESC LIMIT 10;",
    "codeLanguage": "sql",
    "options": [
      "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT",
      "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT",
      "FROM -> SELECT -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT",
      "WHERE -> FROM -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT"
    ],
    "correctIndex": 0,
    "explanation": "SQL logically evaluates FROM/JOIN first to assemble relations, filters rows with WHERE, aggregates via GROUP BY, filters groups via HAVING, projects columns with SELECT, orders tuples with ORDER BY, and finally applies LIMIT/OFFSET.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-2",
    "question": "Why does the following SQL query result in a syntax or execution error in standard SQL engines?",
    "codeSnippet": "SELECT employee_id, salary * 12 AS annual_salary\nFROM employees\nWHERE annual_salary > 600000;",
    "codeLanguage": "sql",
    "options": [
      "WHERE clauses cannot contain numeric comparison operators like '>'",
      "The WHERE clause is logically evaluated before SELECT, so the alias 'annual_salary' does not exist yet",
      "The multiplication operator '*' is disallowed in standard SQL projection",
      "Column aliases must always be enclosed in single quotes rather than double quotes"
    ],
    "correctIndex": 1,
    "explanation": "Because WHERE executes before SELECT in the logical query pipeline, column aliases defined in the SELECT list are not yet in scope when WHERE evaluates.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-3",
    "question": "What is the primary operational difference between the `WHERE` clause and the `HAVING` clause?",
    "options": [
      "WHERE filters aggregated groups; HAVING filters individual tuple rows",
      "WHERE and HAVING are completely interchangeable synonyms in all ANSI SQL engines",
      "WHERE filters individual rows prior to grouping; HAVING filters aggregated groups after GROUP BY",
      "HAVING can only evaluate non-aggregate scalar expressions"
    ],
    "correctIndex": 2,
    "explanation": "WHERE filters rows before aggregation occurs. HAVING evaluates aggregate predicates (e.g. COUNT(*) > 5, AVG(sal) > 50000) over grouped rows.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-4",
    "question": "What is the result of evaluating `NULL = NULL` and `NULL <> NULL` in three-valued SQL logic?",
    "options": [
      "Both evaluate to TRUE",
      "Both evaluate to FALSE",
      "First is TRUE, second is FALSE",
      "Both evaluate to UNKNOWN (neither TRUE nor FALSE)"
    ],
    "correctIndex": 3,
    "explanation": "In ANSI three-valued logic (3VL), comparing NULL with any value (even another NULL) using equality or inequality yields UNKNOWN. To check for NULL, one must use `IS NULL` or `IS NOT NULL`.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-5",
    "question": "Given Table A with 5 rows where column `val` has values: (10, 20, NULL, 30, NULL). What is the output of `SELECT COUNT(val), COUNT(*) FROM A;`?",
    "codeSnippet": "CREATE TABLE A (val INT);\nINSERT INTO A VALUES (10), (20), (NULL), (30), (NULL);\nSELECT COUNT(val), COUNT(*) FROM A;",
    "codeLanguage": "sql",
    "options": [
      "3 and 5",
      "5 and 5",
      "3 and 3",
      "0 and 5"
    ],
    "correctIndex": 0,
    "explanation": "COUNT(column_name) ignores NULL entries and counts only non-null values (3 rows: 10, 20, 30). COUNT(*) counts all physical tuple rows regardless of contents (5 rows).",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-6",
    "question": "What is the difference between `UNION` and `UNION ALL` in relational query processing?",
    "options": [
      "UNION ALL removes duplicates while UNION retains all rows",
      "UNION performs an internal sort/hash to remove duplicates, whereas UNION ALL preserves all rows without deduplication",
      "UNION requires both queries to have identical table names",
      "UNION is faster than UNION ALL because it combines results in parallel"
    ],
    "correctIndex": 1,
    "explanation": "UNION performs a distinct sort or hash deduplication step (O(N log N)), whereas UNION ALL simply concatenates result sets without overhead (O(N)).",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-7",
    "question": "Given Table X with 4 rows {1, 2, 2, 3} and Table Y with 3 rows {2, 3, 4}. How many rows are returned by `SELECT id FROM X INTERSECT SELECT id FROM Y;`?",
    "codeSnippet": "Table X: [1, 2, 2, 3]\nTable Y: [2, 3, 4]\nSELECT id FROM X INTERSECT SELECT id FROM Y;",
    "codeLanguage": "sql",
    "options": [
      "3 rows",
      "4 rows",
      "2 rows ({2, 3})",
      "1 row"
    ],
    "correctIndex": 2,
    "explanation": "Standard SQL INTERSECT returns distinct overlapping values between the two queries. The common values are 2 and 3, yielding 2 rows.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-8",
    "question": "What does the query `SELECT 1 WHERE NULL NOT IN (1, 2, 3);` evaluate to?",
    "codeSnippet": "SELECT 1 WHERE NULL NOT IN (1, 2, 3);",
    "codeLanguage": "sql",
    "options": [
      "Returns 1 row containing value 1",
      "Syntax error",
      "Returns NULL",
      "Returns 0 rows (Empty Set) because the WHERE predicate evaluates to UNKNOWN"
    ],
    "correctIndex": 3,
    "explanation": "The expression translates to `NOT (NULL = 1 OR NULL = 2 OR NULL = 3)`. Each comparison yields UNKNOWN, so the disjunction is UNKNOWN, and NOT UNKNOWN is UNKNOWN. A WHERE clause only accepts TRUE, so 0 rows are returned.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-9",
    "question": "Which SQL operator or function can be used to replace a NULL value with a fallback default value across multiple candidate expressions?",
    "options": [
      "COALESCE(arg1, arg2, ..., argN)",
      "IFNULL only",
      "NULLIF()",
      "NVL2 only"
    ],
    "correctIndex": 0,
    "explanation": "ANSI SQL standard `COALESCE` accepts an arbitrary number of arguments and returns the first non-NULL expression from left to right.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-10",
    "question": "What is the result of the following CASE WHEN expression when `score` is NULL?",
    "codeSnippet": "SELECT CASE \n         WHEN score >= 80 THEN 'PASS'\n         WHEN score < 80 THEN 'RETAKE'\n         ELSE 'ABSENT'\n       END AS status\nFROM exam_records;",
    "codeLanguage": "sql",
    "options": [
      "'RETAKE'",
      "'ABSENT'",
      "'PASS'",
      "NULL"
    ],
    "correctIndex": 1,
    "explanation": "Both `score >= 80` and `score < 80` evaluate to UNKNOWN when score is NULL. Neither WHEN condition triggers, so control falls through to the ELSE clause, returning 'ABSENT'.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-11",
    "question": "Given Table A with 3 rows (IDs: 1, 1, 2) and Table B with 2 rows (IDs: 1, 1). How many rows does `SELECT * FROM A INNER JOIN B ON A.id = B.id` return?",
    "codeSnippet": "Table A: [1, 1, 2]\nTable B: [1, 1]\nSELECT * FROM A INNER JOIN B ON A.id = B.id;",
    "codeLanguage": "sql",
    "options": [
      "2 rows",
      "3 rows",
      "4 rows",
      "6 rows"
    ],
    "correctIndex": 2,
    "explanation": "Each row in A with ID=1 matches both rows in B with ID=1. Since there are 2 rows in A with ID=1 and 2 rows in B with ID=1, they produce 2 * 2 = 4 rows. ID=2 has no match in B.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-12",
    "question": "Table A has 10 rows and Table B has 0 rows. How many rows will be returned by `SELECT * FROM A LEFT OUTER JOIN B ON A.id = B.id`?",
    "options": [
      "0 rows",
      "Throws runtime error: Right relation is empty",
      "1 row",
      "10 rows with all columns from Table B filled with NULL"
    ],
    "correctIndex": 3,
    "explanation": "A LEFT OUTER JOIN preserves all rows from the left table (10 rows). Unmatched columns from Table B are populated with NULL.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-13",
    "question": "What is the Cartesian product (CROSS JOIN) size of Table R with 50 rows and Table S with 40 rows?",
    "options": [
      "2000 rows",
      "10 rows",
      "90 rows",
      "50 rows"
    ],
    "correctIndex": 0,
    "explanation": "A CROSS JOIN pairs every tuple in R with every tuple in S without predicate filters: |R| * |S| = 50 * 40 = 2000 rows.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-14",
    "question": "What is a Correlated Subquery in relational database systems?",
    "options": [
      "A subquery that can be executed completely independently of the outer query once",
      "A subquery that references columns from the outer query, requiring evaluation for each outer row",
      "A subquery that contains recursive CTE definitions",
      "A subquery that produces only Cartesian products"
    ],
    "correctIndex": 1,
    "explanation": "A correlated subquery references one or more attributes from the outer query block. Because of this dependency, it cannot be evaluated once in isolation and conceptually executes once for each candidate outer row.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-15",
    "question": "Given the query below, what does the `EXISTS` clause evaluate?",
    "codeSnippet": "SELECT d.name FROM departments d\nWHERE EXISTS (\n  SELECT 1 FROM employees e WHERE e.dept_id = d.id AND e.salary > 100000\n);",
    "codeLanguage": "sql",
    "options": [
      "It computes the arithmetic sum of employee IDs",
      "It counts total matching rows and returns TRUE if count > 100000",
      "It tests whether the subquery returns at least one tuple row (returns TRUE as soon as first match is found)",
      "It checks if column e.dept_id is NOT NULL"
    ],
    "correctIndex": 2,
    "explanation": "EXISTS evaluates to TRUE as soon as the subquery produces at least one row, enabling efficient short-circuiting in query optimization.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-pre-16",
    "question": "Why is `EXISTS` generally preferred over `IN` when the subquery might return NULL values?",
    "codeSnippet": "SELECT * FROM orders WHERE customer_id NOT IN (SELECT customer_id FROM blacklist);",
    "codeLanguage": "sql",
    "options": [
      "IN is slower because it always uses full text search",
      "IN is deprecated in modern ANSI SQL",
      "EXISTS cannot handle integer keys",
      "If the subquery in NOT IN contains even a single NULL, the entire NOT IN expression evaluates to UNKNOWN, returning 0 rows"
    ],
    "correctIndex": 3,
    "explanation": "If any blacklist row has `customer_id IS NULL`, `x NOT IN (1, 2, NULL)` becomes `x!=1 AND x!=2 AND x!=NULL`. Since `x!=NULL` is UNKNOWN, the entire conjunction is UNKNOWN or FALSE, causing NOT IN to return zero rows. NOT EXISTS handles NULLs safely.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-17",
    "question": "What is the result of the following query with a Scalar Subquery?",
    "codeSnippet": "SELECT name, salary - (SELECT AVG(salary) FROM employees) AS diff\nFROM employees\nWHERE id = 101;",
    "codeLanguage": "sql",
    "options": [
      "Returns employee name and difference from the company-wide average salary",
      "Syntax error because subquery is in SELECT clause",
      "Throws error because AVG requires GROUP BY in outer query",
      "Returns company-wide average salary only"
    ],
    "correctIndex": 0,
    "explanation": "A scalar subquery returns exactly one row and one column, so it is legal wherever a scalar expression is accepted (e.g. SELECT list, WHERE predicate).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-18",
    "question": "Consider a Self-Join on an `Employee` table (id, name, manager_id). How do you find employees who earn more than their direct managers?",
    "codeSnippet": "SELECT E.name\nFROM Employee E\nJOIN Employee M ON E.manager_id = M.id\nWHERE E.salary > M.salary;",
    "codeLanguage": "sql",
    "options": [
      "The query is invalid because a table cannot be joined with itself",
      "Join the table to itself using aliases (E for employee, M for manager) on E.manager_id = M.id and filter E.salary > M.salary",
      "Use an outer join with GROUP BY",
      "Use UNION ALL between employee and manager"
    ],
    "correctIndex": 1,
    "explanation": "A self-join treats the same physical table as two logical relations using distinct table aliases (E and M), allowing comparison of an employee row with their manager row.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-19",
    "question": "What is a Common Table Expression (CTE) defined using the `WITH` clause?",
    "options": [
      "A permanent physical table created in the database catalog",
      "An unindexed materialized view stored on disk",
      "A temporary result set defined within the scope of a single SELECT, INSERT, UPDATE, or DELETE statement",
      "A stored procedure parameter"
    ],
    "correctIndex": 2,
    "explanation": "A Common Table Expression (CTE) is a temporary named result set defined within a `WITH` clause that exists only during query execution, significantly improving readability and supporting recursion.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-20",
    "question": "What does the recursive member in a Recursive CTE do during each iteration?",
    "codeSnippet": "WITH RECURSIVE Subordinates AS (\n  SELECT id, name, manager_id FROM employees WHERE id = 1 -- Anchor\n  UNION ALL\n  SELECT e.id, e.name, e.manager_id FROM employees e JOIN Subordinates s ON e.manager_id = s.id -- Recursive\n)\nSELECT * FROM Subordinates;",
    "codeLanguage": "sql",
    "options": [
      "It restarts from the anchor row repeatedly",
      "It deletes old rows from the database",
      "It creates an infinite loop unless terminated by a database trigger",
      "It reads from the previous iteration's result set and joins with the base table until no new rows are produced"
    ],
    "correctIndex": 3,
    "explanation": "In a recursive CTE, the anchor member runs once to seed the queue. The recursive member repeatedly joins with the working table of the prior step until the step returns an empty set.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-21",
    "question": "Given salaries [1000, 900, 900, 800], what are the ranks assigned by `DENSE_RANK() OVER (ORDER BY salary DESC)`?",
    "options": [
      "1, 2, 2, 3",
      "1, 2, 3, 4",
      "1, 2, 2, 4",
      "1, 1, 2, 3"
    ],
    "correctIndex": 0,
    "explanation": "DENSE_RANK() does not skip rank values after ties. 1000 is rank 1, both 900s receive rank 2, and 800 receives rank 3 (unlike RANK() which produces 1, 2, 2, 4).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-22",
    "question": "Given salaries [1000, 900, 900, 800], what are the ranks assigned by `RANK() OVER (ORDER BY salary DESC)`?",
    "options": [
      "1, 2, 2, 3",
      "1, 2, 2, 4",
      "1, 2, 3, 4",
      "1, 1, 3, 4"
    ],
    "correctIndex": 1,
    "explanation": "RANK() leaves gaps in sequence following ties. Since two rows tie for rank 2, the next rank skips 3 and becomes 4 (1, 2, 2, 4).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-23",
    "question": "What does `ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY hire_date ASC)` assign to rows?",
    "options": [
      "A random integer between 1 and 100",
      "The employee's physical memory address",
      "A sequential integer starting from 1 for each department without ties",
      "Identical numbers for employees hired on the same date"
    ],
    "correctIndex": 2,
    "explanation": "ROW_NUMBER() guarantees unique, consecutive integer values (1, 2, 3...) within each partition, breaking any ties deterministically or arbitrarily.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-24",
    "question": "Which window function allows retrieving the value of a column from the immediately preceding row without requiring a self-join?",
    "options": [
      "LEAD()",
      "FIRST_VALUE()",
      "NTILE()",
      "LAG()"
    ],
    "correctIndex": 3,
    "explanation": "LAG(column, offset, default) accesses an earlier row at a specified physical offset prior to the current row within the partition.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-25",
    "question": "What does `LEAD(sales_amount, 1, 0) OVER (ORDER BY sale_date)` return for the final row in a partition?",
    "options": [
      "0 (the specified fallback default value)",
      "NULL",
      "Throws out-of-bounds error",
      "The value of the first row (wraps around)"
    ],
    "correctIndex": 0,
    "explanation": "Since there is no succeeding row after the final row, LEAD returns the specified default value (0 in this case).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-26",
    "question": "What is the effect of `PARTITION BY department_id` in a window function specification?",
    "options": [
      "It splits the physical database table across multiple hard drive sectors",
      "It divides the query result set into independent partitions/buckets to which the window function is applied separately",
      "It deletes all rows that do not belong to that department",
      "It acts identically to an index creation statement"
    ],
    "correctIndex": 1,
    "explanation": "PARTITION BY subdivides the row stream into logical partitions. The window function resets its calculations (e.g. ranking or running totals) at the boundary of each partition.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-27",
    "question": "Given the query below, what does `running_total` represent?",
    "codeSnippet": "SELECT date, amount,\n       SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total\nFROM transactions;",
    "codeLanguage": "sql",
    "options": [
      "The average transaction amount per day",
      "The grand total across the entire table repeated on every row",
      "The cumulative sum of amount from the earliest transaction date up to the current row",
      "The difference between today and yesterday amount"
    ],
    "correctIndex": 2,
    "explanation": "The frame `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` instructs the window aggregate to accumulate from the very start of the partition up to the current row, forming a running cumulative total.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-28",
    "question": "What does `NTILE(4) OVER (ORDER BY salary ASC)` do to a dataset of 100 employee records?",
    "options": [
      "Multiplies every salary by 4",
      "Selects only the top 4 highest earning employees",
      "Finds employees whose salary is divisible by 4",
      "Divides the 100 employees into 4 quartiles of 25 employees each, assigned bucket numbers 1, 2, 3, 4"
    ],
    "correctIndex": 3,
    "explanation": "NTILE(K) divides an ordered partition as equally as possible into K ranked buckets (quartiles when K=4).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-29",
    "question": "How do you find the second highest salary using window functions?",
    "codeSnippet": "WITH RankedSalaries AS (\n  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk\n  FROM employees\n)\nSELECT salary FROM RankedSalaries WHERE rnk = 2;",
    "codeLanguage": "sql",
    "options": [
      "Use DENSE_RANK() in a CTE or subquery and filter where rnk = 2",
      "Filter directly: SELECT salary FROM employees WHERE DENSE_RANK() = 2",
      "Use LIMIT 2 with GROUP BY salary ASC",
      "Window functions cannot be used for ranking"
    ],
    "correctIndex": 0,
    "explanation": "Window functions cannot be evaluated directly in the WHERE clause of the same SELECT block; they must be encapsulated in a CTE or derived table subquery.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-30",
    "question": "What is the difference between `ROWS` and `RANGE` window frame specifications?",
    "options": [
      "ROWS treats duplicates as a single unit; RANGE does not",
      "ROWS specifies frame boundaries based on physical offset count of rows; RANGE specifies frame boundaries based on logical value differences of the ORDER BY expression",
      "RANGE only works on string columns; ROWS works on integer columns",
      "They are identical synonyms in PostgreSQL and MySQL"
    ],
    "correctIndex": 1,
    "explanation": "ROWS counts physical rows (e.g. 5 ROWS PRECEDING). RANGE looks at value distance (e.g. INTERVAL '7' DAY PRECEDING or duplicate tie values).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-31",
    "question": "What is the definition of a Superkey in relational database theory?",
    "options": [
      "A key that can only contain integer values",
      "A foreign key with CASCADE DELETE permissions",
      "An attribute or set of attributes that uniquely identifies every tuple in a relation",
      "The smallest column in terms of storage size"
    ],
    "correctIndex": 2,
    "explanation": "A superkey is any set of attributes whose values uniquely distinguish every tuple in the relation. A candidate key is a minimal superkey (no proper subset is a superkey).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-32",
    "question": "Which condition must be met for a relation to satisfy First Normal Form (1NF)?",
    "options": [
      "All non-key attributes must be fully dependent on the primary key",
      "No transitive functional dependencies can exist",
      "The relation must have a B+ Tree index on every column",
      "All attribute domains must contain only atomic (indivisible) values, and there are no repeating groups"
    ],
    "correctIndex": 3,
    "explanation": "1NF requires that each attribute value is atomic (no comma-separated lists, arrays, or composite multi-part columns) and every tuple is unique.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-33",
    "question": "A relation R(A, B, C, D) has Candidate Key (A, B). Which functional dependency represents a Partial Dependency that violates Second Normal Form (2NF)?",
    "options": [
      "A -> C",
      "(A, B) -> C",
      "C -> D",
      "(A, B) -> D"
    ],
    "correctIndex": 0,
    "explanation": "A partial dependency occurs when a non-prime attribute (C) is functionally determined by a proper subset (A) of a composite candidate key (A, B). To be in 2NF, all non-prime attributes must depend on the whole key.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-34",
    "question": "A relation R(RollNo, Name, DeptID, DeptHead) has functional dependencies: RollNo -> DeptID, and DeptID -> DeptHead. Which normal form is violated?",
    "options": [
      "1NF",
      "3NF (Third Normal Form)",
      "2NF",
      "BCNF only"
    ],
    "correctIndex": 1,
    "explanation": "RollNo is the primary key. Since RollNo -> DeptID and DeptID -> DeptHead, there is a transitive dependency RollNo -> DeptHead where DeptHead depends on non-prime attribute DeptID. This violates 3NF.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-35",
    "question": "What is the defining requirement of Boyce-Codd Normal Form (BCNF)?",
    "options": [
      "All foreign keys must reference the same parent table",
      "Every candidate key must consist of exactly one column",
      "For every non-trivial functional dependency X -> Y, X MUST be a Superkey",
      "Every non-prime attribute must depend on another non-prime attribute"
    ],
    "correctIndex": 2,
    "explanation": "BCNF is a stricter version of 3NF. In BCNF, for every non-trivial functional dependency X -> Y, the determinant X must be a superkey of the relation.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-36",
    "question": "Given relation R(A, B, C) with FDs: A -> B and B -> C. We decompose R into R1(A, B) and R2(B, C). Is this decomposition Lossless?",
    "options": [
      "Decompositions are always lossy",
      "No, because C is lost in the decomposition",
      "No, because A is not in R2",
      "Yes, because the intersection R1 ∩ R2 = {B}, and B -> C holds (B is a superkey of R2)"
    ],
    "correctIndex": 3,
    "explanation": "A decomposition of R into (R1, R2) is lossless if and only if R1 ∩ R2 -> R1 or R1 ∩ R2 -> R2. Here R1 ∩ R2 = {B}. Since B -> C, B is a superkey of R2, making the join lossless.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-37",
    "question": "What is Dependency Preservation in schema decomposition?",
    "options": [
      "When all functional dependencies of the original schema can be verified on individual decomposed relations without computing joins",
      "When foreign key constraints are disabled during batch insert",
      "When primary keys are duplicated across all tables",
      "When normalisation is reversed"
    ],
    "correctIndex": 0,
    "explanation": "Dependency preservation ensures that every functional dependency in F can be enforced directly on the decomposed relations without needing expensive multi-table joins.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-38",
    "question": "Can every relational schema be decomposed into BCNF while guaranteeing both Lossless Join and Dependency Preservation?",
    "options": [
      "Yes, BCNF always preserves all dependencies",
      "No, 3NF guarantees both Lossless Join and Dependency Preservation, but BCNF may sometimes sacrifice Dependency Preservation",
      "No, normalisation never guarantees lossless join",
      "Yes, but only in NoSQL databases"
    ],
    "correctIndex": 1,
    "explanation": "While 3NF always admits a decomposition that is both lossless and dependency-preserving, achieving BCNF can sometimes make it impossible to preserve all functional dependencies.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-39",
    "question": "What does the `ON DELETE CASCADE` foreign key clause enforce?",
    "options": [
      "Prevents deletion of parent rows if child rows exist",
      "Sets the foreign key column in child rows to NULL",
      "Automatically deletes matching child rows when a referenced parent row is deleted",
      "Rolls back the parent delete transaction with an error"
    ],
    "correctIndex": 2,
    "explanation": "ON DELETE CASCADE maintains referential integrity by automatically cascading deletions of parent tuples down to all associated child tuples.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-40",
    "question": "What is the difference between a Candidate Key and a Primary Key?",
    "options": [
      "Candidate keys can have duplicate values; primary keys cannot",
      "They are stored in separate database files",
      "Primary keys cannot be composite; candidate keys can",
      "A table can have multiple Candidate Keys, but the database designer chooses exactly one Candidate Key to serve as the Primary Key"
    ],
    "correctIndex": 3,
    "explanation": "All minimal superkeys are candidate keys. Exactly one candidate key is selected as the relation's primary key (which cannot contain NULLs); the others are alternate keys.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-41",
    "question": "Why do relational database engines (MySQL InnoDB, PostgreSQL) overwhelmingly use B+ Trees instead of Binary Search Trees for disk-based indexing?",
    "options": [
      "B+ Trees have high fan-out (hundreds of keys per node), resulting in very low tree height (3-4 levels) and minimal disk I/O reads",
      "Binary Search Trees cannot store string data",
      "B+ Trees use less RAM than Binary Search Trees",
      "Binary Search Trees do not support equality lookups"
    ],
    "correctIndex": 0,
    "explanation": "Disk I/O is orders of magnitude slower than CPU operations. B+ Trees have high fan-out (B ≈ 500-1000), allowing millions of rows to be indexed in just 3-4 tree levels (3-4 disk page reads).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-42",
    "question": "What is the structural difference between internal nodes and leaf nodes in a B+ Tree?",
    "options": [
      "Leaf nodes contain only search keys; internal nodes contain actual data",
      "Internal nodes store search keys and child pointers; all actual row data or data pointers reside exclusively in leaf nodes",
      "Leaf nodes are organized as binary trees; internal nodes are linked lists",
      "There is no structural difference"
    ],
    "correctIndex": 1,
    "explanation": "In a B+ Tree, non-leaf internal nodes act strictly as routing roadmaps. All data records or row pointers reside in the leaves, which are linked together in a doubly linked list for fast sequential range scans.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-43",
    "question": "How many Clustered Indexes can exist on a single database table in MySQL InnoDB?",
    "options": [
      "As many as the number of columns",
      "Up to 16 clustered indexes",
      "Exactly one, because the table rows themselves are physically stored in the leaf pages of the clustered index",
      "Clustered indexes are not supported in InnoDB"
    ],
    "correctIndex": 2,
    "explanation": "Because the clustered index defines the physical on-disk storage order of the table's rows, a table can possess only ONE clustered index (by default, the Primary Key).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-44",
    "question": "What is a Secondary (Non-Clustered) Index in InnoDB?",
    "options": [
      "A duplicate copy of the entire table",
      "A hash table stored in a flat file",
      "An index stored in memory that disappears on server reboot",
      "An index whose leaf nodes contain the secondary index keys and the matching Primary Key value (requiring a bookmark lookup to fetch other row columns)"
    ],
    "correctIndex": 3,
    "explanation": "In InnoDB, secondary index leaf nodes store the primary key value as their data reference. To read columns not present in the secondary index, the engine traverses the clustered index using this PK (Bookmark Lookup).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-45",
    "question": "What is a Covering Index?",
    "options": [
      "An index that contains all columns requested by a SELECT query (both in WHERE and SELECT list), avoiding the secondary-to-primary table lookup",
      "An index that encrypts disk data blocks",
      "An index that covers more than 50% of the table rows",
      "A composite index containing every column in the table"
    ],
    "correctIndex": 0,
    "explanation": "When an index contains all attributes demanded by the query (e.g. index on (user_id, email) for query `SELECT email FROM users WHERE user_id = ?`), the query is satisfied directly from the index tree without touching the table heap.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-46",
    "question": "Given a composite index on `(department_id, hire_date, salary)`. Which query CANNOT use this index via an index seek?",
    "options": [
      "SELECT * FROM employees WHERE department_id = 10 AND hire_date > '2026-01-01';",
      "SELECT * FROM employees WHERE hire_date = '2026-01-01' AND salary > 50000;",
      "SELECT * FROM employees WHERE department_id = 10;",
      "SELECT * FROM employees WHERE department_id = 10 AND hire_date = '2026-01-01' AND salary = 80000;"
    ],
    "correctIndex": 1,
    "explanation": "According to the Leftmost Prefix Rule, a composite index can only be navigated if the leftmost column (`department_id`) is provided in the filter predicate. Querying solely on `hire_date` and `salary` cannot perform an index seek.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-47",
    "question": "Why does the query `SELECT * FROM users WHERE YEAR(created_at) = 2026;` cause a Full Table Scan even if an index exists on `created_at`?",
    "options": [
      "2026 is an invalid integer literal",
      "Date columns cannot be indexed in SQL",
      "Wrapping the column in a function (YEAR()) destroys sargability, forcing the engine to compute the function on every row",
      "The WHERE clause requires single quotes"
    ],
    "correctIndex": 2,
    "explanation": "When a column is wrapped inside a scalar function (`YEAR(col)`), the engine cannot use B+ tree sorting order to perform a binary seek. Writing `WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'` restores sargability.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-48",
    "question": "Which wildcard query is Sargable and can utilize an index seek on `name`?",
    "options": [
      "SELECT * FROM users WHERE name LIKE '%Sharma';",
      "SELECT * FROM users WHERE name LIKE '%Sharma%';",
      "SELECT * FROM users WHERE REVERSE(name) LIKE 'amrahS%';",
      "SELECT * FROM users WHERE name LIKE 'Sharma%';"
    ],
    "correctIndex": 3,
    "explanation": "`LIKE 'Sharma%'` has a fixed prefix, allowing the B+ Tree to seek directly to the 'Sharma' key range. Leading wildcards (`'%Sharma'`) require scanning the entire index.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-49",
    "question": "What does Index Selectivity measure in database performance tuning?",
    "options": [
      "The proportion of distinct values in an indexed column: Cardinality / Total Rows (higher selectivity = more effective index seek)",
      "The number of CPU cores used during query planning",
      "The speed of network packet transmission to client",
      "The percentage of memory allocated to buffer pool"
    ],
    "correctIndex": 0,
    "explanation": "Selectivity = Cardinality / Total Records. An index on unique email (selectivity 1.0) is highly selective. An index on gender (selectivity 0.00001) has poor selectivity and the query optimizer will typically bypass it for a table scan.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-pre-50",
    "question": "What does the `EXPLAIN` command in SQL reveal to database administrators?",
    "options": [
      "The complete server source code",
      "The query optimizer's chosen execution plan, including join type, indexes examined/used, and estimated rows scanned",
      "The database backup encryption keys",
      "The list of active network socket connections"
    ],
    "correctIndex": 1,
    "explanation": "EXPLAIN prints the execution plan generated by the relational cost-based optimizer, detailing whether index seeks, range scans, temporary tables, or filesorts are utilized.",
    "category": "Practical Execution & Trace (70%)"
  }
];

export const DAY_4_POST_ASSESSMENT_50: AssessmentQuestion[] = [
  {
    "id": "d4-post-1",
    "question": "In PostgreSQL or MySQL EXPLAIN plans, what does 'type: ALL' (or 'Seq Scan') indicate?",
    "options": [
      "A complete sequential scan of the entire physical table (Full Table Scan), indicating missing or unusable indexes",
      "A lightning-fast point lookup on clustered primary key",
      "All columns were cached in RAM buffer pool",
      "An asynchronous parallel index scan"
    ],
    "correctIndex": 0,
    "explanation": "In EXPLAIN output, `type: ALL` in MySQL or `Seq Scan` in PostgreSQL indicates that the engine must read every page of the table sequentially from start to end, which is costly on large datasets.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-2",
    "question": "When joining two tables where Table A has 1,000,000 rows and Table B has 100 rows with no indexes, which join algorithm does a cost-based optimizer choose?",
    "options": [
      "Sort-Merge Join",
      "Hash Join (builds hash table on the 100 rows of Table B and probes with Table A)",
      "Nested Loop Join without index",
      "Cartesian product scan"
    ],
    "correctIndex": 1,
    "explanation": "For unsorted tables without indexes, a Hash Join builds an in-memory hash table on the smaller table B (100 rows, minimal RAM) and streams table A through it in O(M+N) time.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-3",
    "question": "Under which condition is a Sort-Merge Join superior to a Hash Join?",
    "options": [
      "When joining string columns with integer columns",
      "When one table is empty",
      "When both input tables are already sorted on the join key (e.g. from an index) or memory is insufficient for hash tables",
      "When performing non-equi joins like A.id != B.id"
    ],
    "correctIndex": 2,
    "explanation": "If input tables are already sorted on the join key (e.g. via clustered index or B+ Tree range scan), a Sort-Merge Join merges them in linear O(M + N) time with zero hash memory allocation.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-4",
    "question": "Given the following query, how many times will the subquery execute in a naive un-optimized execution?",
    "codeSnippet": "SELECT e.id, e.salary\nFROM employees e\nWHERE e.salary > (\n  SELECT AVG(d.salary) FROM employees d WHERE d.dept_id = e.dept_id\n);",
    "codeLanguage": "sql",
    "options": [
      "Once for the entire query",
      "Once per distinct department ID",
      "Zero times",
      "Once for each row in the outer employees table (N times)"
    ],
    "correctIndex": 3,
    "explanation": "Because the subquery references `e.dept_id` from the outer row, it is a correlated subquery that conceptually executes once for each candidate row in `employees`.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-5",
    "question": "What does the SQL standard window framing clause `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING` define?",
    "options": [
      "A sliding 3-row moving window consisting of the prior row, the current row, and the next row",
      "A frame of exactly 1 row",
      "All rows in the entire table",
      "Rows where column value equals 1"
    ],
    "correctIndex": 0,
    "explanation": "The frame encompasses the immediate predecessor (1 PRECEDING), the anchor (CURRENT ROW), and the immediate successor (1 FOLLOWING), creating a 3-point moving calculation (e.g. 3-day moving average).",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-6",
    "question": "Given Table A with values {1, 2, 3} and Table B with values {2, 3, 4}. What is the output of `SELECT id FROM A EXCEPT SELECT id FROM B;`?",
    "codeSnippet": "Table A: [1, 2, 3]\nTable B: [2, 3, 4]\nSELECT id FROM A EXCEPT SELECT id FROM B;",
    "codeLanguage": "sql",
    "options": [
      "{4}",
      "{1}",
      "{2, 3}",
      "{1, 4}"
    ],
    "correctIndex": 1,
    "explanation": "EXCEPT (or MINUS in Oracle) returns all distinct rows that exist in the first query result set but do NOT exist in the second query result set. 1 is in A but not B.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-7",
    "question": "What does a FULL OUTER JOIN produce in relational algebra?",
    "options": [
      "Only rows that match in both tables",
      "Only unmatched rows from both tables",
      "All matched rows, plus unmatched rows from the left table and unmatched rows from the right table (with NULLs for missing sides)",
      "The Cartesian product"
    ],
    "correctIndex": 2,
    "explanation": "FULL OUTER JOIN combines the results of both LEFT and RIGHT outer joins: matched rows appear together, and unmatched rows from either relation are preserved with NULLs filling the opposing columns.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-8",
    "question": "What is the result of applying `DENSE_RANK() OVER (ORDER BY salary DESC)` on an empty table?",
    "options": [
      "Throws NullPointerException",
      "Returns NULL",
      "Returns 0",
      "Returns an empty result set (0 rows)"
    ],
    "correctIndex": 3,
    "explanation": "Window functions operate over the rows supplied by the FROM/WHERE clause. If the input stream contains 0 rows, the window function emits 0 rows.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-9",
    "question": "What is a Materialized View compared to a standard View?",
    "options": [
      "A materialized view computes and physically stores the query results on disk (requiring periodic refresh), whereas a standard view executes its query dynamically upon invocation",
      "A standard view is physically saved on disk; a materialized view is only a saved query string",
      "A materialized view cannot contain joins or aggregations",
      "Materialized views only exist in SQLite"
    ],
    "correctIndex": 0,
    "explanation": "Standard views are virtual; they expand into subqueries at runtime. Materialized views precompute and persist data on disk, speeding up complex analytical reads at the cost of data freshness.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-10",
    "question": "What does the query `SELECT COALESCE(NULL, NULL, 'SPSU', 'Udaipur');` return?",
    "options": [
      "'Udaipur'",
      "'SPSU'",
      "NULL",
      "Syntax error"
    ],
    "correctIndex": 1,
    "explanation": "COALESCE scans arguments from left to right and immediately returns the first non-NULL value, which is 'SPSU'.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-11",
    "question": "Which ACID property ensures that all sub-operations of a transaction are executed to completion or all changes are rolled back on failure?",
    "options": [
      "Isolation",
      "Consistency",
      "Atomicity",
      "Durability"
    ],
    "correctIndex": 2,
    "explanation": "Atomicity enforces all-or-nothing execution. If any operation within a `BEGIN TRANSACTION ... COMMIT` block fails, the engine triggers an Undo rollback.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-12",
    "question": "What is a 'Dirty Read' anomaly in database transaction processing?",
    "options": [
      "Reading data from a corrupted hard drive sector",
      "Executing a SELECT query without an index",
      "Reading data without an SSL/TLS connection",
      "A transaction reads uncommitted data modifications made by another concurrent transaction that may subsequently roll back"
    ],
    "correctIndex": 3,
    "explanation": "A Dirty Read occurs when Transaction T1 updates a row but has not committed yet, and Transaction T2 reads this uncommitted value. If T1 rolls back, T2 operated on phantom data that never existed.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-13",
    "question": "What is a 'Non-Repeatable Read' (Fuzzy Read) anomaly?",
    "options": [
      "Transaction T1 reads a row; Transaction T2 updates or deletes that row and commits; Transaction T1 re-reads the row and observes altered data",
      "A query fails to execute twice due to connection timeout",
      "A transaction inserts duplicate primary keys",
      "Two transactions write to the same log page"
    ],
    "correctIndex": 0,
    "explanation": "A Non-Repeatable Read occurs when a transaction reads the same row twice and observes different attribute values because an intervening transaction modified and committed that row.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-14",
    "question": "What is a 'Phantom Read' anomaly?",
    "options": [
      "Reading data deleted three years ago",
      "A transaction queries a range of rows with a predicate (e.g. salary > 50k); another transaction inserts a new row satisfying that predicate and commits; re-executing the range query returns an additional row",
      "Reading uncommitted ghost versions in memory",
      "A deadlock between two read transactions"
    ],
    "correctIndex": 1,
    "explanation": "Phantom Reads involve set membership in range queries: a concurrent transaction commits new tuples that satisfy the range predicate, causing subsequent range scans within the original transaction to observe 'phantom' tuples.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-15",
    "question": "Which ANSI SQL isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still permit Phantom Reads under strict ANSI definitions?",
    "options": [
      "Read Uncommitted",
      "Read Committed",
      "Repeatable Read",
      "Serializable"
    ],
    "correctIndex": 2,
    "explanation": "According to ANSI SQL-92: Repeatable Read guarantees that any row read during the transaction cannot be modified by another transaction, preventing Dirty and Non-Repeatable reads, though phantom rows may appear in range scans.",
    "category": "Theory (30%)"
  },
  {
    "id": "d4-post-16",
    "question": "How does MySQL InnoDB's implementation of Repeatable Read prevent Phantom Reads without serializing all transactions?",
    "options": [
      "It disables all INSERT statements across the entire table",
      "It forces all queries to run in single-threaded mode",
      "It creates a full disk backup before every transaction",
      "It uses Multi-Version Concurrency Control (MVCC) for reads and Next-Key Locks (record lock + gap lock) for write statements"
    ],
    "correctIndex": 3,
    "explanation": "InnoDB uses MVCC consistent read snapshots for reads and Next-Key Locking (locking the index record plus the 'gap' before it) to block concurrent transactions from inserting new rows into the scanned range.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-17",
    "question": "What is Multi-Version Concurrency Control (MVCC)?",
    "options": [
      "A database concurrency mechanism where readers do not block writers and writers do not block readers by maintaining multiple snapshot versions of data rows in Undo logs",
      "A version control system like Git embedded in SQL",
      "A protocol requiring 3 separate master databases",
      "A backup scheduling tool"
    ],
    "correctIndex": 0,
    "explanation": "MVCC allows read queries to access a consistent snapshot of data corresponding to the transaction's start time without holding shared read locks, ensuring readers never block writers.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-18",
    "question": "What is the Two-Phase Locking (2PL) protocol in database transactions?",
    "options": [
      "A protocol requiring two database administrators to approve transactions",
      "A protocol with an Expanding (Growing) Phase where locks are acquired and a Shrinking Phase where locks are released (once a lock is released, no new locks can be acquired)",
      "Locking the table twice before updating",
      "A protocol that guarantees zero deadlocks"
    ],
    "correctIndex": 1,
    "explanation": "2PL guarantees conflict serializability. In the Growing Phase, a transaction may acquire locks but not release any. Once the first lock is released (Shrinking Phase), no further locks may be acquired.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-19",
    "question": "What is the Write-Ahead Logging (WAL) rule?",
    "options": [
      "Data pages must be written to disk before log records",
      "Queries must be logged before they are parsed by the SQL compiler",
      "Log records describing a data update must be flushed to non-volatile storage (fsync) BEFORE the dirty data page is written to database disk tables",
      "User passwords must be encrypted in log files"
    ],
    "correctIndex": 2,
    "explanation": "WAL guarantees Atomicity and Durability: changes are appended to the sequential log file on disk before in-memory buffer pool data pages are flushed. If a crash occurs, the log contains the necessary Redo and Undo information.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-20",
    "question": "How does a database engine resolve a Deadlock between two transactions in a Wait-For Graph?",
    "options": [
      "It waits indefinitely until the server is rebooted",
      "It duplicates the data item so both can write",
      "It executes both transactions simultaneously without locks",
      "It detects a directed cycle in the Wait-For Graph, picks one transaction as a 'victim' (typically based on lowest undo cost), aborts it, rolls back its updates, and allows the other transaction to proceed"
    ],
    "correctIndex": 3,
    "explanation": "A deadlock detection thread scans the Wait-For Graph for directed cycles. Upon cycle detection, it selects a victim transaction, rolls it back, and returns error 1213 (Deadlock found) to the client application.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-21",
    "question": "In a B+ Tree of order M, what is the maximum number of children an internal node can have?",
    "options": [
      "M children",
      "M - 1 children",
      "2 children",
      "2 * M children"
    ],
    "correctIndex": 0,
    "explanation": "An internal node of order M can have at most M pointers (children) and at most M - 1 search keys.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-22",
    "question": "What is the time complexity of searching for a key in a B+ Tree containing N records with fan-out B?",
    "options": [
      "O(N)",
      "O(log_B N)",
      "O(B * N)",
      "O(1)"
    ],
    "correctIndex": 1,
    "explanation": "Because each tree level divides the search space by a factor of B, the height of the B+ Tree is log_B N. Finding any record requires O(log_B N) node visits.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-23",
    "question": "Why are the leaf nodes of a B+ Tree interconnected with sibling pointers?",
    "options": [
      "To enable full-text search indexing",
      "To prevent leaf nodes from exceeding memory limits",
      "To allow efficient horizontal sequential range scans without re-traversing internal tree nodes",
      "To store database rollback transaction IDs"
    ],
    "correctIndex": 2,
    "explanation": "Once the starting key of a range query (e.g. `BETWEEN 10 AND 50`) is found via root-to-leaf traversal, the engine simply scans along the leaf linked list pointers until 50 is passed, achieving O(K) sequential retrieval.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-24",
    "question": "What is the penalty of creating too many indexes on a database table?",
    "options": [
      "It slows down SELECT queries",
      "The database drops foreign key constraints",
      "It corrupts database transactions",
      "Write operations (INSERT, UPDATE, DELETE) become significantly slower because every index B+ Tree must be synchronously updated and rebalanced"
    ],
    "correctIndex": 3,
    "explanation": "Every index added accelerates matching reads, but penalizes all write operations (write amplification) because new entries, page splits, and B+ tree node rebalancing must occur for every index on the table.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-25",
    "question": "What is an Index Skip Scan in modern query engines?",
    "options": [
      "An optimization where the engine uses a composite index (A, B) even when column A is omitted, by logically skipping across distinct values of prefix A",
      "An engine optimization that skips reading corrupt index pages",
      "Skipping foreign key verification",
      "A full table scan that ignores indexes"
    ],
    "correctIndex": 0,
    "explanation": "Index Skip Scan allows a composite index on (A, B) to be used when column A has very low cardinality (e.g. gender: M/F). The engine performs a mini-seek for A='F' and another for A='M'.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-26",
    "question": "What causes a B+ Tree Page Split during an INSERT operation?",
    "options": [
      "A transaction rollback occurs",
      "The page runs out of free space (exceeds maximum key capacity M - 1), forcing the engine to allocate a new 16KB page, split the keys 50/50, and promote the median key to the parent node",
      "The query contains a JOIN statement",
      "An index is dropped by the DBA"
    ],
    "correctIndex": 1,
    "explanation": "When inserting into a full page (typically 16KB in InnoDB), the page splits into two half-full pages and promotes a separator key to the parent node. Sequential auto-increment keys minimize page splits.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-27",
    "question": "Why does `UUID` (v4 random string) as a Clustered Primary Key hurt MySQL InnoDB write throughput compared to `AUTO_INCREMENT INT`?",
    "options": [
      "UUIDs cannot be indexed",
      "UUIDs cannot be queried with SELECT",
      "Random UUID values insert unpredictably throughout the B+ tree, causing massive random I/O page splits and buffer pool thrashing",
      "InnoDB only supports integer primary keys"
    ],
    "correctIndex": 2,
    "explanation": "Monotonically increasing integer IDs append cleanly to the rightmost leaf page with zero page splits. Random UUIDs force writes into random disk pages, causing frequent page splits, fragmentation, and memory cache thrashing.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-28",
    "question": "Given a composite index on `(status, created_at)`. How will the following query be executed?",
    "codeSnippet": "SELECT * FROM orders WHERE status = 'SHIPPED' AND created_at >= '2026-10-01';",
    "codeLanguage": "sql",
    "options": [
      "Full table scan",
      "Syntax error",
      "Two separate hash joins",
      "Index seek on status = 'SHIPPED', followed by an index range scan along the sorted created_at leaf pointers"
    ],
    "correctIndex": 3,
    "explanation": "Because the equality predicate (`status = 'SHIPPED'`) narrows down to a contiguous range, the engine performs an index seek to the start and range-scans `created_at` efficiently.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-29",
    "question": "What is an Clustered Index Leaf Node page size in standard MySQL InnoDB?",
    "options": [
      "16 Kilobytes (16 KB)",
      "4 Gigabytes",
      "512 Bytes",
      "1 Megabyte"
    ],
    "correctIndex": 0,
    "explanation": "The default page size in MySQL InnoDB is 16 KB (`innodb_page_size`). All internal and leaf B+ Tree nodes occupy exactly 16 KB pages on disk.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-30",
    "question": "What does 'Using index condition' (Index Condition Pushdown - ICP) mean in an EXPLAIN plan?",
    "options": [
      "The index was rejected by the engine",
      "The storage engine evaluates parts of the WHERE predicate directly at the index level before reading full table rows from disk",
      "The database converted the query to SQL Server syntax",
      "The query executed on a secondary replica"
    ],
    "correctIndex": 1,
    "explanation": "Index Condition Pushdown (ICP) pushes WHERE filters down to the storage engine layer so non-sargable or composite index columns filter out unneeded rows before performing costly table row lookups.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-31",
    "question": "Consider schema R(A, B, C, D) with functional dependencies: AB -> C, C -> D, D -> A. What are the candidate keys of R?",
    "options": [
      "AB only",
      "A only",
      "AB, BC, BD",
      "ABCD"
    ],
    "correctIndex": 2,
    "explanation": "Compute closures: (AB)+ = {A,B,C,D}. (BC)+ = {B,C,D,A}. (BD)+ = {B,D,A,C}. All three (AB, BC, BD) are minimal superkeys, hence all three are candidate keys.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-32",
    "question": "In the schema R(A, B, C, D) with Candidate Keys AB, BC, BD and FDs: AB -> C, C -> D, D -> A. Which normal form is R in?",
    "options": [
      "1NF only",
      "2NF only",
      "BCNF",
      "3NF (Third Normal Form)"
    ],
    "correctIndex": 3,
    "explanation": "Prime attributes are {A, B, C, D}. In FD C -> D, C is not a superkey, BUT D is a prime attribute! In 3NF, X -> Y is valid if X is superkey OR Y is prime. Thus R is in 3NF, but NOT in BCNF (since C is not a superkey).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-33",
    "question": "A relation R(A, B, C) has functional dependencies: A -> B, B -> C. We decompose R into R1(A, B) and R2(A, C). Is this decomposition Dependency Preserving?",
    "options": [
      "No, the functional dependency B -> C cannot be verified directly in either R1(A, B) or R2(A, C) without joining them",
      "Yes, all dependencies are preserved",
      "Yes, because A is the candidate key",
      "Decompositions never preserve dependencies"
    ],
    "correctIndex": 0,
    "explanation": "Neither R1(A, B) nor R2(A, C) contains both B and C. Therefore, verifying B -> C requires computing a join between R1 and R2, violating dependency preservation.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-34",
    "question": "What is an Insertion Anomaly in an un-normalized database table?",
    "options": [
      "An out-of-memory error during SQL INSERT",
      "The inability to record certain information without artificially inserting unrelated data (e.g. cannot record a new course without enrolling a student)",
      "Inserting duplicate primary keys",
      "A syntax error in INSERT INTO statement"
    ],
    "correctIndex": 1,
    "explanation": "An insertion anomaly occurs when facts about an entity cannot be recorded without recording facts about another distinct entity (e.g., adding a new department without any employees).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-35",
    "question": "What is a Deletion Anomaly?",
    "options": [
      "Deleting a record causes database server shutdown",
      "Dropping a table by mistake",
      "Deleting one piece of information unintentionally deletes other completely independent valuable information (e.g. deleting the last student enrolled in a course deletes course details)",
      "A foreign key constraint violation"
    ],
    "correctIndex": 2,
    "explanation": "A deletion anomaly occurs when removing data about one entity results in the unintended loss of data regarding a completely separate entity.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-36",
    "question": "What is Fourth Normal Form (4NF) concerned with?",
    "options": [
      "Splitting tables into 4 equal partitions",
      "Replacing SQL with NoSQL",
      "Adding 4 primary keys per table",
      "Eliminating Multi-Valued Dependencies (MVDs) where independent 1-to-many relationships exist in the same relation"
    ],
    "correctIndex": 3,
    "explanation": "4NF eliminates Multi-Valued Dependencies (MVDs: A ->> B). When an entity has two independent multi-valued attributes (e.g. an employee's languages and hobbies), 4NF separates them into distinct tables.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-37",
    "question": "What is Fifth Normal Form (5NF / Project-Join Normal Form)?",
    "options": [
      "A normal form that addresses Join Dependencies, ensuring a relation cannot be reconstructed from smaller decomposed projections without spurious tuples",
      "Eliminating all foreign keys",
      "A normal form requiring 5 candidate keys",
      "An unindexed flat file format"
    ],
    "correctIndex": 0,
    "explanation": "5NF deals with cyclic join dependencies where a table can be decomposed into 3 or more smaller projections and rejoined losslessly without generating spurious tuples.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-38",
    "question": "When is deliberate Denormalization justified in high-scale production systems (e.g. Amazon, Uber)?",
    "options": [
      "When the database administrator does not know how to write JOIN queries",
      "To optimize high-frequency read latency on read-heavy workflows by avoiding expensive multi-table joins, accepting controlled redundancy and write overhead",
      "Whenever disk space is cheap",
      "Denormalization is strictly forbidden in production systems"
    ],
    "correctIndex": 1,
    "explanation": "In massive scale architectures, normalisation requires many JOINs. Denormalising frequently read aggregations or lookup names directly onto high-traffic tables dramatically slashes query latency.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-39",
    "question": "What is the closure of attribute set {A, B} given FDs: A -> C, B -> D, CD -> E?",
    "options": [
      "{A, B, D}",
      "{A, B, C}",
      "{A, B, C, D, E}",
      "{A, B}"
    ],
    "correctIndex": 2,
    "explanation": "Start: {A, B}. Apply A->C: {A, B, C}. Apply B->D: {A, B, C, D}. Apply CD->E: {A, B, C, D, E}. Thus {A, B}+ = {A, B, C, D, E}.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-40",
    "question": "In a relation with attributes (A, B, C), if functional dependency A -> B holds, which statement is guaranteed?",
    "options": [
      "B is never NULL",
      "Two tuples with identical B values MUST have identical A values",
      "A is the primary key of the table",
      "Two tuples with identical A values MUST have identical B values"
    ],
    "correctIndex": 3,
    "explanation": "By definition of functional dependency A -> B: for any pair of tuples t1 and t2, if t1[A] = t2[A], then t1[B] must equal t2[B].",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-41",
    "question": "What is the output of the following query on Table Employees containing salaries (100, 200, 300)?",
    "codeSnippet": "SELECT salary, \n       LAG(salary, 1, 0) OVER (ORDER BY salary) as prev_sal,\n       LEAD(salary, 1, 0) OVER (ORDER BY salary) as next_sal\nFROM Employees\nWHERE salary = 200;",
    "codeLanguage": "sql",
    "options": [
      "salary: 200, prev_sal: 0, next_sal: 0",
      "salary: 200, prev_sal: 100, next_sal: 300",
      "Syntax error",
      "Empty set"
    ],
    "correctIndex": 0,
    "explanation": "CRITICAL: The WHERE clause executes BEFORE the window function! WHERE salary = 200 filters the table down to a single row containing 200. Inside this 1-row window, there is no preceding or following row, so LAG and LEAD emit their default 0!",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-42",
    "question": "How do you correctly compute the moving window calculation without filtering the window prematurely?",
    "codeSnippet": "WITH Ranked AS (\n  SELECT salary, \n         LAG(salary, 1, 0) OVER (ORDER BY salary) as prev_sal,\n         LEAD(salary, 1, 0) OVER (ORDER BY salary) as next_sal\n  FROM Employees\n)\nSELECT * FROM Ranked WHERE salary = 200;",
    "codeLanguage": "sql",
    "options": [
      "Use HAVING instead of WHERE",
      "Compute the window function inside a CTE/subquery over the full dataset first, then apply the WHERE filter in the outer query",
      "Disable the query optimizer",
      "Use an inline CROSS JOIN"
    ],
    "correctIndex": 1,
    "explanation": "By placing the window function in a CTE, the window operates on the full table (salary 200 sees prev_sal 100 and next_sal 300). The outer query then filters for salary = 200.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-43",
    "question": "What does the following query return for finding duplicate emails?",
    "codeSnippet": "SELECT email\nFROM Person\nGROUP BY email\nHAVING COUNT(email) > 1;",
    "codeLanguage": "sql",
    "options": [
      "All unique emails that appear exactly once",
      "Throws error because COUNT(email) cannot be used in HAVING",
      "Emails that appear more than once in the Person table",
      "Returns total number of duplicate rows as an integer"
    ],
    "correctIndex": 2,
    "explanation": "GROUP BY email bundles rows by email. HAVING COUNT(email) > 1 filters out single occurrences, returning only duplicate email strings.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-44",
    "question": "What is the return value of `NULLIF(100, 100)` and `NULLIF(100, 200)`?",
    "options": [
      "True and False",
      "100 and NULL",
      "0 and 100",
      "NULL and 100"
    ],
    "correctIndex": 3,
    "explanation": "NULLIF(a, b) returns NULL if both arguments are equal (a = b); otherwise it returns the first argument (a).",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-45",
    "question": "How do you prevent a 'Division by Zero' SQL runtime exception when calculating percentages?",
    "codeSnippet": "SELECT total_passed / NULLIF(total_students, 0) * 100 AS pass_percentage FROM exam_summary;",
    "codeLanguage": "sql",
    "options": [
      "Use NULLIF(divisor, 0) which converts 0 to NULL, making any division by NULL safely evaluate to NULL instead of an exception",
      "Use WHERE divisor > 0 only",
      "Division by zero is automatically ignored in SQL",
      "Wrap the query in a TRY/CATCH stored procedure only"
    ],
    "correctIndex": 0,
    "explanation": "In SQL, dividing any number by NULL yields NULL without throwing a runtime error. `NULLIF(denominator, 0)` converts 0 into NULL, gracefully preventing crash.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-46",
    "question": "What does the following SQL expression with String Aggregation return in modern PostgreSQL or MySQL?",
    "codeSnippet": "-- PostgreSQL: STRING_AGG(name, ', ' ORDER BY name)\n-- MySQL: GROUP_CONCAT(name ORDER BY name SEPARATOR ', ')\nSELECT dept_id, STRING_AGG(name, ', ') FROM employees GROUP BY dept_id;",
    "codeLanguage": "sql",
    "options": [
      "The arithmetic sum of characters in names",
      "A comma-separated concatenated string of employee names for each department",
      "An array of integer string lengths",
      "Syntax error"
    ],
    "correctIndex": 1,
    "explanation": "STRING_AGG (PostgreSQL) and GROUP_CONCAT (MySQL) aggregate string values within each group into a single formatted delimiter-separated string.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-47",
    "question": "What is the result of the following recursive query?",
    "codeSnippet": "WITH RECURSIVE Counter AS (\n  SELECT 1 AS val\n  UNION ALL\n  SELECT val + 1 FROM Counter WHERE val < 5\n)\nSELECT SUM(val) FROM Counter;",
    "codeLanguage": "sql",
    "options": [
      "10",
      "5",
      "15 (1 + 2 + 3 + 4 + 5)",
      "Infinite loop"
    ],
    "correctIndex": 2,
    "explanation": "The recursive CTE generates values 1, 2, 3, 4, 5. The outer query computes SUM(val) = 1 + 2 + 3 + 4 + 5 = 15.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-48",
    "question": "Which query correctly finds all customers who never placed an order?",
    "options": [
      "SELECT C.name FROM Customers C CROSS JOIN Orders O;",
      "SELECT C.name FROM Customers C JOIN Orders O ON C.id = O.customer_id WHERE O.id IS NULL;",
      "SELECT C.name FROM Customers C WHERE C.id IN (SELECT customer_id FROM Orders);",
      "SELECT C.name FROM Customers C LEFT JOIN Orders O ON C.id = O.customer_id WHERE O.id IS NULL;"
    ],
    "correctIndex": 3,
    "explanation": "An anti-join pattern: `LEFT JOIN` preserves all customers, and `WHERE O.id IS NULL` filters for customers where no matching order row exists.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-49",
    "question": "Given Table Logs (id, num). How do you find all numbers that appear at least three times consecutively?",
    "codeSnippet": "SELECT DISTINCT l1.num AS ConsecutiveNums\nFROM Logs l1\nJOIN Logs l2 ON l1.id = l2.id - 1\nJOIN Logs l3 ON l1.id = l3.id - 2\nWHERE l1.num = l2.num AND l2.num = l3.num;",
    "codeLanguage": "sql",
    "options": [
      "Self-join the Logs table three times on consecutive IDs (l1.id = l2.id - 1 = l3.id - 2) and filter where l1.num = l2.num = l3.num",
      "GROUP BY num HAVING COUNT(*) >= 3",
      "SELECT num FROM Logs ORDER BY num DESC LIMIT 3",
      "Use CROSS JOIN between Logs and Logs"
    ],
    "correctIndex": 0,
    "explanation": "Self-joining on consecutive IDs or using `LAG(num, 1)` and `LAG(num, 2)` verifies that the identical value `num` occurs consecutively across 3 adjacent physical rows.",
    "category": "Practical Execution & Trace (70%)"
  },
  {
    "id": "d4-post-50",
    "question": "What does `SELECT user_id, COUNT(DISTINCT item_id) FROM orders GROUP BY user_id;` compute?",
    "options": [
      "Total order rows per user including duplicate item purchases",
      "Total number of unique items purchased by each user",
      "Average price of items purchased by each user",
      "The total distinct users in the database"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(DISTINCT item_id) tallies only the unique item identifiers purchased per user group, filtering out repeated purchases of the same item.",
    "category": "Practical Execution & Trace (70%)"
  }
];
