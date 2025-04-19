---
title: "Leetcode-Grinding-Day1"
date: "2025-04-19T16:46:45"
---

# Day 1 Summary: Foundations

## Key Data Structures Learned:

* **List (Array):** Ordered, changeable sequence. Use for ordered data you need to modify. (`[]`)
* **String:** Ordered, UNchangeable sequence of characters. Use for text. (`""`)
* **Dictionary (HashMap):** Key-Value pairs. VERY fast lookups using keys. Use for lookups, counting frequencies. (`{}`)
* **Set:** Collection of UNIQUE items. VERY fast checking if an item exists. Use for uniqueness checks, removing duplicates. (`{}`)
* **Tuple:** Ordered, UNchangeable sequence. Use for fixed data (like coordinates) or as dictionary keys. (`()`)

*Key difference reminder: Lists are changeable (mutable), while Strings and Tuples are not (immutable).*

## Classic Problems & Optimal Approaches:

### 1. Two Sum

* **Problem:** Find indices of two numbers in a list that add up to a `target`.
* **Optimal Approach:** Use a Dictionary (HashMap).
* **Thought Process:**
    1.  Need to find a pair `(num, complement)` where `complement = target - num`.
    2.  Checking every pair is slow (O(n²)).
    3.  Need faster way to see if `complement` exists and find its index.
    4.  Use a dictionary `seen = {number: index}`.
    5.  Loop through the list: calculate `complement`. If `complement` is in `seen`, return `[seen[complement], current_index]`. Else, add `{current_number: current_index}` to `seen`.
    6.  Result: O(n) time.

### 2. Contains Duplicate

* **Problem:** Check if a list contains any duplicate numbers.
* **Optimal Approach:** Use a Set.
* **Thought Process:**
    1.  Problem is about checking for *uniqueness*.
    2.  Sets store only unique items and check existence fast (O(1)).
    3.  Method 1: Iterate through list, try adding each number to a `seen` set. If already in the set, return `True`. If loop finishes, return `False`.
    4.  Method 2 (Concise): Convert list to set. If `len(set(nums)) < len(nums)`, duplicates existed. Return `True`, else `False`.
    5.  Result: O(n) time.

### 3. Valid Anagram

* **Problem:** Check if string `t` is a rearrangement of string `s`.
* **Optimal Approach:** Use a Dictionary (HashMap/Counter) for frequency counts.
* **Thought Process:**
    1.  Anagrams have the same characters with the same counts. Lengths must be equal.
    2.  Option 1: Sort both strings and compare (O(n log n)).
    3.  Option 2 (Better): Count character frequency in both strings using dictionaries. If counts are identical, they are anagrams.
    4.  Use one dictionary: Count up for `s`, count down for `t`. Check for negatives or non-zero counts at the end. (Or use `collections.Counter(s) == collections.Counter(t)` if imports allowed).
    5.  Result: O(n) time.

### 4. Valid Palindrome

* **Problem:** Check if a string reads the same forwards and backwards, ignoring non-alphanumeric chars and case.
* **Optimal Approach:** Two Pointers on the original string.
* **Thought Process:**
    1.  Need to compare characters from start and end, moving inwards.
    2.  Need to skip non-alphanumeric chars and ignore case.
    3.  Use `left` pointer starting at 0, `right` pointer starting at end.
    4.  While `left < right`:
        * Move `left` forward past non-alphanumeric chars.
        * Move `right` backward past non-alphanumeric chars.
        * Compare `s[left].lower()` and `s[right].lower()`. If different, return `False`.
        * Move pointers: `left += 1`, `right -= 1`.
    5.  If loop finishes, return `True`.
    6.  Result: O(n) time, O(1) extra space.

### 5. Group Anagrams

* **Problem:** Group a list of words into lists of anagrams.
* **Optimal Approach:** Use a Dictionary (HashMap) where the key represents the anagram group.
* **Thought Process:**
    1.  Need a unique "signature" for each anagram group.
    2.  Sorting the letters of a word gives a unique signature (e.g., "eat", "tea", "ate" all sort to "aet").
    3.  Use a dictionary `groups = {}`.
    4.  Loop through each `word`:
        * Calculate its `signature` (e.g., `key = "".join(sorted(word))`).
        * Append the `word` to the list stored at `groups[key]`. (Handle case where key doesn't exist yet by creating a new list).
    5.  Return the `values()` of the dictionary as a list.
    6.  Result: O(N * K log K) time (N words, max length K, due to sorting).

