---
title: "leetcode-grinding-day7"
date: "2025-04-29T22:31:09"
---

# Day 7: Introduction to Dynamic Programming (DP)

## Core Concepts:

* **What is DP?** An optimization technique primarily used for problems that can be solved recursively but involve re-calculating the same subproblems multiple times. DP avoids this redundancy by **storing the results of subproblems** and reusing them when needed.
* **Key Properties for DP Applicability:**
    1.  **Optimal Substructure:** The optimal solution to the overall problem can be constructed from the optimal solutions of its subproblems.
    2.  **Overlapping Subproblems:** The recursive solution computes the same subproblems repeatedly. DP stores these results to avoid re-computation.
* **Two Main Implementation Methods:**
    1.  **Memoization (Top-Down):**
        * **Idea:** Uses the natural recursive structure + a cache (e.g., dictionary `memo` or array `dp`).
        * **Process:** Before computing `solve(state)`, check if `state` is in `memo`. If yes, return cached value. If no, compute recursively, store the result in `memo`, then return it.
        * **Pros:** Often easier to formulate from a recursive thought process. Computes only necessary states.
        * **Cons:** Can have recursion overhead; potential stack overflow for deep recursion.
    2.  **Tabulation (Bottom-Up):**
        * **Idea:** Uses iteration + a table (e.g., array `dp`). Starts from base cases and iteratively computes solutions for larger subproblems using previously computed results stored in the table.
        * **Process:** Determine table size, initialize base cases, figure out the correct iteration order, fill the table using the recurrence relation.
        * **Pros:** No recursion overhead/stack limits. Often easier to implement space optimizations.
        * **Cons:** Requires careful planning of iteration order and state dependencies. Might compute unnecessary states (though usually table size covers required states).
* **General DP Steps:**
    1.  Identify Optimal Substructure & Overlapping Subproblems.
    2.  Define State (e.g., what does `dp[i]` represent?).
    3.  Find Recurrence Relation (how does `dp[i]` depend on previous states?).
    4.  Determine Base Cases (smallest subproblems).
    5.  Choose Implementation (Memoization or Tabulation).
    6.  Determine Iteration Order (for Tabulation).


## Classic Problems & Optimal Approaches:

### 1. Fibonacci Number (LeetCode #509 - Easy)

* **Problem:** Calculate F(n), where F(n) = F(n-1) + F(n-2).
* **Optimal Approach:** DP (Memoization or Tabulation).
* **Thought Process:** State `dp[i]` = F(i). Recurrence `dp[i] = dp[i-1] + dp[i-2]`. Base cases `dp[0]=0, dp[1]=1`.
* **Complexity:** Time: O(n), Space: O(n) or O(1) (Tabulation space optimization).

### 2. Climbing Stairs (LeetCode #70 - Easy)

* **Problem:** Find distinct ways to climb n stairs (1 or 2 steps at a time).
* **Optimal Approach:** DP.
* **Thought Process:** State `dp[i]` = ways to reach stair `i`. Recurrence `dp[i] = dp[i-1] + dp[i-2]`. Base cases `dp[1]=1, dp[2]=2` (or `dp[0]=1, dp[1]=1`). Identical to Fibonacci.
* **Complexity:** Time: O(n), Space: O(n) or O(1).

### 3. Min Cost Climbing Stairs (LeetCode #746 - Easy)

* **Problem:** Find min cost to reach the top of stairs, paying cost `cost[i]` to step on stair `i`, can step 1 or 2 stairs. Start at index 0 or 1.
* **Optimal Approach:** DP.
* **Thought Process:** State `dp[i]` = min cost to reach the top *from* stair `i`. Recurrence `dp[i] = cost[i] + min(dp[i+1], dp[i+2])` (Top-Down view). OR State `dp[i]` = min cost to reach *top of* stair `i`. Recurrence `dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])` (Bottom-Up view). Base cases `dp[0]=0, dp[1]=0`. Goal `dp[n]`.
* **Complexity:** Time: O(n), Space: O(n) or O(1).

### 4. House Robber (LeetCode #198 - Medium)

* **Problem:** Max amount to rob from non-adjacent houses `nums`.
* **Optimal Approach:** DP.
* **Thought Process:** State `dp[i]` = max amount robbing from first `i` houses (index 0 to i-1). Recurrence `dp[i] = max(rob house i-1, don't rob house i-1) = max(nums[i-1] + dp[i-2], dp[i-1])`. Base cases `dp[0]=0, dp[1]=nums[0]`. Goal `dp[n]`.
* **Complexity:** Time: O(n), Space: O(n) or O(1).

### 5. Maximum Subarray (LeetCode #53 - Medium)

* **Problem:** Find the contiguous subarray with the largest sum.
* **Optimal Approach:** Kadane's Algorithm (Simple DP).
* **Thought Process:** State `dp[i]` = max sum of subarray *ending* at index `i`. Recurrence `dp[i] = max(nums[i], nums[i] + dp[i-1])`. Track overall `global_max = max(global_max, dp[i])`. O(1) space optimization uses `current_max` for `dp[i]` and `global_max`.
* **Complexity:** Time: O(n), Space: O(1).

### 6. Coin Change (LeetCode #322 - Medium)

* **Problem:** Find minimum number of coins from `coins` to make `amount`. Infinite coins of each type.
* **Optimal Approach:** DP (Unbounded Knapsack type).
* **Thought Process (Tabulation):** State `dp[i]` = min coins for amount `i`. Initialize `dp[0]=0`, others `inf`. Iterate `amount i` from 1 to `amount`. For each `coin` in `coins`: if `i >= coin`, update `dp[i] = min(dp[i], dp[i - coin] + 1)`. Final answer `dp[amount]` (or -1 if still `inf`).
* **Complexity:** Time: O(amount * num_coins), Space: O(amount).

### 7. Unique Paths (LeetCode #62 - Medium)

* **Problem:** Count unique paths from top-left to bottom-right in `m x n` grid (move right or down).
* **Optimal Approach:** DP.
* **Thought Process:** State `dp[i][j]` = ways to reach cell `(i, j)`. Recurrence `dp[i][j] = dp[i-1][j] + dp[i][j-1]`. Base cases: first row `dp[0][j]=1`, first col `dp[i][0]=1`.
* **Complexity:** Time: O(m * n), Space: O(m * n) or O(min(m, n)).

### 8. Longest Increasing Subsequence (LeetCode #300 - Medium)

* **Problem:** Find the length of the longest strictly increasing subsequence in `nums`. (Not necessarily contiguous).
* **Optimal Approach:** DP O(n²) or DP + Binary Search O(n log n).
* **Thought Process (O(n²) DP):** State `dp[i]` = length of LIS *ending* at `nums[i]`. Initialize `dp` with 1s. For `i` from 0 to n-1: For `j` from 0 to `i-1`: if `nums[i] > nums[j]`, update `dp[i] = max(dp[i], dp[j] + 1)`. Final answer is `max(dp)`.
* **Complexity:** Time: O(n²), Space: O(n).

### 9. Decode Ways (LeetCode #91 - Medium)

* **Problem:** Count ways to decode a string of digits ('1'-'26' map to A-Z).
* **Optimal Approach:** DP.
* **Thought Process:** State `dp[i]` = ways to decode prefix `s[0...i-1]`. Recurrence: `dp[i]` gets contributions from `dp[i-1]` (if `s[i-1]` is '1'-'9') and `dp[i-2]` (if `s[i-2]s[i-1]` is '10'-'26'). `dp[i] = ways1 + ways2`. Base cases `dp[0]=1`, `dp[1]` depends on `s[0]`.
* **Complexity:** Time: O(n), Space: O(n) or O(1).

### 10. Word Break (LeetCode #139 - Medium)

* **Problem:** Check if string `s` can be segmented into space-separated words from `wordDict`.
* **Optimal Approach:** DP.
* **Thought Process:** State `dp[i]` = boolean, if prefix `s[0...i-1]` can be segmented. Recurrence: `dp[i]` is `True` if there exists `j < i` such that `dp[j]` is `True` AND the substring `s[j...i-1]` is in `wordDict` (use a Set for fast lookup). Base case `dp[0] = True`.
* **Complexity:** Time: O(n^3) (due to substring slicing inside loops) or O(n^2) with optimizations. Space: O(n) + O(DictSize).


## Core Techniques Summary (Day 7 - DP Intro):

1.  **Identify DP Properties:** Check for **Optimal Substructure** and **Overlapping Subproblems**.
2.  **Define State:** Clearly define `dp[i]` or `dp[i][j]`. This is often the most critical step. What subproblem does it solve?
3.  **Find Recurrence Relation:** Express `dp[i]` (or `dp[i][j]`) in terms of solutions to smaller subproblems (e.g., `dp[i-1]`, `dp[i-2]`, `dp[i][j-1]`, `dp[i-1][j]`).
4.  **Determine Base Cases:** Identify the smallest subproblems whose solutions are known directly, needed to start the computation.
5.  **Choose Implementation:**
    * **Memoization (Top-Down):** Recursive function + cache. Easier if recursive structure is obvious.
    * **Tabulation (Bottom-Up):** Iterative approach + DP table. Often better for performance, avoiding recursion limits, and enabling space optimization.
6.  **Determine Iteration Order (Tabulation):** Ensure subproblems are solved *before* they are needed by the main recurrence.
7.  **Space Optimization:** Look for chances to reduce DP table size if the current state only depends on a few recent previous states (e.g., O(n) -> O(1), O(m*n) -> O(n)).

