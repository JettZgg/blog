---
title: "leetcode-grinding-day3"
date: "2025-04-26T20:30:04"
---

# Day 3: Two Pointers & Sliding Window

## Core Concepts:

### Two Pointers

* **Core Idea:** Use two integer indices ("pointers") to traverse a data structure (like an array, string, or linked list) collaboratively and efficiently, often reducing complexity from O(n²) to O(n).
* **Common Patterns:**
    * **Opposite Ends:** One pointer starts at the beginning (`left`), the other at the end (`right`), moving towards each other. Used for reversing, palindrome checks, finding pairs in sorted arrays (`Two Sum II`), `Container With Most Water`.
    * **Same Direction / Fast & Slow:** Both pointers start near the beginning but move at different speeds or maintain a relative condition. Used for cycle detection/middle node in linked lists (fast/slow), or in-place array modification like removing duplicates/elements (`Move Zeroes`, `Remove Duplicates`).
* **Why Effective:** Avoids nested loops by processing elements based on pointer relationships in a single pass (or close to it).

### Sliding Window

* **Core Idea:** A specific **Same Direction Two Pointers** technique maintaining a contiguous sub-array or sub-string ("window") defined by `left` and `right` pointers. The window "slides" through the data. Can be fixed or variable size.
* **When to Use:** Problems involving properties of **contiguous** sub-arrays/sub-strings (longest/shortest length, max/min sum, contains specific characters/patterns).
* **General Pattern (Variable Size):** Expand window using `right` pointer, update window state. When a condition is met, update the overall result and shrink the window using the `left` pointer while maintaining the condition (if possible) or until the condition is no longer met.
* **Data Structures:** Often used with **HashMaps** (for character counts) or **Sets** (for uniqueness checks) to efficiently track the state within the current window.
* **Complexity:** Typically O(n) time as each element is processed by `left` and `right` pointers a limited number of times.


## Classic Problems & Optimal Approaches:

### 1. Two Sum II - Input Array Is Sorted (LeetCode #167 - Medium)

* **Problem:** Find two numbers in a **sorted** array that sum to a target. Return 1-based indices.
* **Optimal Approach:** Opposite Ends Two Pointers.
* **Thought Process:** Use `left` at start, `right` at end. If `sum < target`, `left++` (need larger sum). If `sum > target`, `right--` (need smaller sum). If `sum == target`, return indices.
* **Complexity:** Time: O(n), Space: O(1).

### 2. Valid Palindrome (LeetCode #125 - Easy)

* **Problem:** Check if a string is a palindrome, considering only alphanumeric chars and ignoring case.
* **Optimal Approach:** Opposite Ends Two Pointers.
* **Thought Process:** Use `left` at start, `right` at end. Skip non-alphanumeric chars by advancing pointers inwards. Compare `s[left].lower()` and `s[right].lower()`. If mismatch, return `False`. If pointers meet/cross, return `True`.
* **Complexity:** Time: O(n), Space: O(1).

### 3. Container With Most Water (LeetCode #11 - Medium)

* **Problem:** Find two lines in `height` array forming a container with max water.
* **Optimal Approach:** Opposite Ends Two Pointers.
* **Thought Process:** Use `left` at start, `right` at end. Calculate `area = min(h[left], h[right]) * (right - left)`. Update `max_area`. Move the pointer pointing to the **shorter** line inwards, as this is the only way the area might potentially increase.
* **Complexity:** Time: O(n), Space: O(1).

### 4. Move Zeroes (LeetCode #283 - Easy)

* **Problem:** Move all 0s to end of array `nums` in-place, maintaining relative order of non-zero elements.
* **Optimal Approach:** Same Direction Two Pointers (Read/Write).
* **Thought Process:** Use `slow` pointer for the next non-zero position. Use `fast` pointer to iterate through array. If `nums[fast]` is non-zero, place it at `nums[slow]` and increment `slow`. After `fast` finishes, fill the rest of the array (from `slow` onwards) with 0s.
* **Complexity:** Time: O(n), Space: O(1).

### 5. Remove Duplicates from Sorted Array (LeetCode #26 - Easy)

* **Problem:** Remove duplicates from a **sorted** array `nums` in-place, return new length.
* **Optimal Approach:** Same Direction Two Pointers (Read/Write).
* **Thought Process:** Use `slow` for the position of the next unique element (starts at 1). Use `fast` to iterate (starts at 1). If `nums[fast]` is different from `nums[slow - 1]`, it's unique. Copy `nums[fast]` to `nums[slow]` and increment `slow`. Return `slow`.
* **Complexity:** Time: O(n), Space: O(1).

### 6. Linked List Cycle (LeetCode #141 - Easy)

* **Problem:** Detect if a linked list has a cycle.
* **Optimal Approach:** Fast & Slow Pointers (Floyd's Tortoise and Hare).
* **Thought Process:** `slow` moves 1 step, `fast` moves 2 steps. If they meet (`slow == fast`), there's a cycle. If `fast` or `fast.next` becomes `None`, there's no cycle.
* **Complexity:** Time: O(n), Space: O(1).

### 7. Middle of the Linked List (LeetCode #876 - Easy)

* **Problem:** Find the middle node of a linked list (return second middle if even length).
* **Optimal Approach:** Fast & Slow Pointers.
* **Thought Process:** `slow` moves 1 step, `fast` moves 2 steps. When `fast` reaches the end (or `None`), `slow` will be at the middle (or second middle).
* **Complexity:** Time: O(n), Space: O(1).

### 8. Minimum Size Subarray Sum (LeetCode #209 - Medium)

* **Problem:** Find min length of a contiguous subarray whose sum is `>= target`.
* **Optimal Approach:** Variable Size Sliding Window.
* **Thought Process:** Expand window with `right`, adding `nums[right]` to `current_sum`. While `current_sum >= target`, update `min_len = min(min_len, right - left + 1)`, then shrink window by removing `nums[left]` from sum and incrementing `left`.
* **Complexity:** Time: O(n), Space: O(1).

### 9. Longest Substring Without Repeating Characters (LeetCode #3 - Medium)

* **Problem:** Find the length of the longest substring without repeating characters.
* **Optimal Approach:** Variable Size Sliding Window + Set or HashMap.
* **Thought Process (Set):** Expand window with `right`. Use a `Set` to track chars in window. If `s[right]` is already in set, shrink window from `left`, removing `s[left]` from set, until `s[right]` is no longer a duplicate. Add `s[right]` to set. Update `max_len = max(max_len, right - left + 1)`.
* **Complexity:** Time: O(n), Space: O(k) (k = charset size).

### 10. Permutation in String (LeetCode #567 - Medium)

* **Problem:** Check if `s2` contains a permutation of `s1` as a substring.
* **Optimal Approach:** Fixed Size Sliding Window + Frequency Counts (HashMap/Array).
* **Thought Process:** Window size = `len(s1)`. Calculate `s1`'s char counts. Maintain char counts for the current window in `s2`. Slide the window one char at a time: add new char count, remove old char count. Compare window counts with `s1` counts at each step. If they match, return `True`.
* **Complexity:** Time: O(len(s2)), Space: O(k) (k = charset size).


## Core Techniques for Day 3 Problems:

1.  **Pattern Recognition:** Identify if a problem can be solved by comparing elements from opposite ends, using fast/slow pointers, or by analyzing contiguous subarrays/substrings (sliding window).
2.  **Pointer Initialization & Movement:** Correctly initialize pointer(s) (`left`, `right`, `slow`, `fast`). Define the logic for moving pointers based on comparisons or conditions to systematically explore possibilities or maintain invariants.
3.  **Window Management (Sliding Window):** Maintain the window state (e.g., sum, character counts using HashMap/Set). Define clear rules for expanding (`right++`) and shrinking (`left++`) the window based on problem constraints.
4.  **In-Place Modification:** Understand how to use read/write pointers (like `slow`/`fast`) to modify an array/list directly according to problem requirements (e.g., `Move Zeroes`, `Remove Duplicates`).
5.  **Complexity Goal:** Aim for O(n) time complexity by avoiding nested loops through clever pointer manipulation. Be mindful of space complexity (O(1) for most pointer techniques, O(k) or O(n) sometimes needed for window state).


## Practical Approach Reminder:

* In practice (especially under time pressure), focus on the **trend** – which pointer movement moves closer to a solution or maintains a necessary condition? Ensure your **termination conditions** for loops are correct. While not a formal proof, sound reasoning about *why* a specific pointer movement works is crucial and should be explainable.


