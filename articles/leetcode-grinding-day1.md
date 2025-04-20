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

### 6. Majority Element

* **Problem:** Given an array `nums` of size `n`, find the element that appears more than `⌊ n / 2 ⌋` times. (Assume one always exists).
* **Optimal Approach:** Use a Dictionary (HashMap) for counting OR Boyer-Moore Voting Algorithm. (HashMap focus).
* **Thought Process:**
    1.  Need counts of each number.
    2.  Use **Dictionary** `{number: count}`.
    3.  Iterate `nums`, increment counts (`counts[num] = counts.get(num, 0) + 1`).
    4.  Iterate `counts`, find the number where count > `len(nums) // 2`.
    5.  Result (HashMap): O(n) time, O(n) space. *(Boyer-Moore is O(n) time, O(1) space)*.

### 7. Ransom Note

* **Problem:** Given strings `ransomNote` and `magazine`, return `True` if `ransomNote` can be constructed using letters from `magazine` exactly once per required letter.
* **Optimal Approach:** Use a Dictionary (HashMap/Counter) for frequency counts.
* **Thought Process:**
    1.  Need counts of available characters in `magazine`.
    2.  Use **Dictionary** `mag_counts = {char: count}` for `magazine`.
    3.  Iterate through `ransomNote`. For each `char`:
        * Check if `char` is in `mag_counts` and `mag_counts[char] > 0`.
        * If yes, decrement `mag_counts[char] -= 1`.
        * If no, return `False`.
    4.  If loop finishes, return `True`.
    5.  Result: O(m + n) time, O(k) space (k=alphabet size).

### 8. Longest Consecutive Sequence

* **Problem:** Given unsorted `nums`, find the length of the longest sequence of consecutive elements (e.g., `[1, 2, 3, 4]`).
* **Optimal Approach:** Use a Set for fast lookups.
* **Thought Process:**
    1.  Sorting works (O(n log n)), but aiming for O(n).
    2.  Need fast check if `num + 1` exists. Use a **Set**.
    3.  Algorithm:
        * Add all `nums` to `num_set`.
        * Iterate through `nums`.
        * **Optimization:** If `num - 1` is NOT in `num_set` (it's a sequence start):
            * Count length by checking for `num + 1`, `num + 2`, ... in `num_set`.
            * Update max length found.
    4.  Result: O(n) time, O(n) space (for the set).

### 9. Is Subsequence

* **Problem:** Given strings `s` and `t`, return `True` if `s` can be formed by deleting chars from `t` without changing relative order.
* **Optimal Approach:** Two Pointers (or pointer-like iteration).
* **Thought Process:**
    1.  Need to find chars of `s` within `t` *in order*.
    2.  Use pointer `i` for `s`, `j` for `t`.
    3.  While `i < len(s)` and `j < len(t)`:
        * If `s[i] == t[j]`, found current char, so increment `i`.
        * Always increment `j` to check next char in `t`.
    4.  If `i == len(s)` after loop, all chars were found in order. Return `True`. Else `False`.
    5.  Result: O(len(t)) time, O(1) space. Uses **String** access.

### 10. Find All Numbers Disappeared in an Array

* **Problem:** Given `nums` with numbers `[1..n]`, find all numbers in `[1..n]` not present in `nums`.
* **Optimal Approach:** Use a Set OR in-place modification.
* **Thought Process (Set):**
    1.  Need to know which numbers `1..n` are present. Use a **Set**.
    2.  Algorithm:
        * Create `seen_set` from `nums`.
        * Initialize `result` list.
        * Loop `i` from `1` to `n`. If `i` not in `seen_set`, add `i` to `result`.
        * Return `result`.
    3.  Result: O(n) time, O(n) space.
* **Thought Process (In-place - Alt):**
    1.  Use array indices to mark presence. Iterate `nums`, for `val = abs(nums[i])`, make `nums[val - 1]` negative.
    2.  Iterate `1..n`. If `nums[i-1]` is positive, `i` was missing. Add `i` to result.
    3.  Result: O(n) time, O(1) space (modifies input). Uses clever **Array/List** index manipulation.

---

## Key Thinking Patterns & Knowledge Points for Day 1:

1.  **Data Structure Selection:** Know *when* to use List, Dict, Set, String, Tuple based on order, mutability, uniqueness, lookups, key-value needs.
2.  **Leveraging O(1) Operations:** Use HashMaps/Sets for fast lookups/membership checks to optimize beyond O(n²) or O(n log n).
3.  **Frequency Counting:** Use HashMaps/Dicts (or `Counter`) for counting item occurrences.
4.  **Handling Duplicates/Uniqueness:** Use Sets for tracking unique items or checking presence/absence quickly.
5.  **Using Signatures/Canonical Forms:** Represent structurally equivalent items (like anagrams) uniquely (e.g., sorted string) to use as HashMap keys for grouping.
6.  **Pointer Techniques (Basic):** Use indices/pointers (conceptually) to iterate and compare within sequences (Lists/Strings).
7.  **Time/Space Trade-offs:** Understand that faster time (e.g., O(n) via HashMap/Set) often costs extra space (O(n)), while O(1) space solutions might be slower or require in-place modification.
8.  **Read the Problem Carefully:** Pay attention to constraints, input/output specs, and edge cases.

---

## Native Implementation Templates (No Imports):

### Native Counter Implementation:

* Mimics `collections.Counter` using a standard dictionary.

```python
def native_counter(iterable):
    """Counts item frequency using a native dict."""
    counts = {} 
    for item in iterable:
        counts[item] = counts.get(item, 0) + 1
    return counts

# Example: native_counter("aabbc") -> {'a': 2, 'b': 2, 'c': 1}
```

### Native defaultdict(list) Implementation (for Grouping):

* Mimics `collections.defaultdict(list)` behavior for grouping items, using `dict.setdefault`.
```python
def group_items_native_setdefault(items_with_keys):
    """Groups items using a native dict and setdefault.
    Assumes items_with_keys is an iterable yielding (key, value) pairs 
    or similar structure where key can be derived.
    """
    groups = {} # Use a standard dictionary
    
    # Example loop structure (adapt as needed)
    # for key, value in items_with_keys: 
    #    groups.setdefault(key, []).append(value)

    # Example for Group Anagrams logic:
    strs = ["eat", "tea", "tan", "ate", "nat", "bat"] 
    for word in strs:
        key = "".join(sorted(word))
        # setdefault ensures the key maps to a list, then appends.
        groups.setdefault(key, []).append(word) 

    return groups # Or list(groups.values()) depending on desired output

# Example call (using the anagram logic inside):
# anagram_groups = group_items_native_setdefault(None) # Pass actual data if needed
# print(list(anagram_groups.values())) 
# -> [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
```