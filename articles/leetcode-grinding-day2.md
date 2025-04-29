---
title: "Leetcode-Grinding-Day2"
date: "2025-04-20T20:45:29"
---

# Day 2: Sorting & Searching

## Core Concepts:

### Sorting

* **What:** Arranging elements in a specific order (ascending/descending).
* **Why in LeetCode:** Often a crucial **preprocessing step** to structure data, making subsequent operations (searching, two pointers, duplicate finding) easier or more efficient.
* **Python Built-ins:**
    * **`list.sort()`:** Sorts the list **in-place** (modifies original), returns `None`.
    * **`sorted(iterable)`:** Returns a **new** sorted list, leaves original unchanged (often preferred).
    * **Descending:** Use `reverse=True`.
    * **Custom Sort (`key`):** Provide a function to `key`. Sorting is based on the *results* of applying the key function to each element (e.g., `key=len`, `key=lambda x: x[1]`).
* **Complexity:** Python's Timsort is O(n log n) on average and worst-case.

### Searching

* **Linear Search:** Check elements one by one. Time: O(n). Usually too slow for large datasets.
* **Binary Search:** Efficient search algorithm.
    * **Prerequisite:** Data **MUST BE SORTED**.
    * **Core Idea:** Divide and Conquer. Compare target with the middle element, discard half the search space, repeat.
    * **Complexity:** Very fast - O(log n) time. O(1) space.
    * **Variations:** Used not just for exact matches, but finding boundaries (first/last occurrence), searching in rotated arrays, or searching on the "answer space" where a condition shows monotonicity.


## Classic Problems & Optimal Approaches:

### 1. Merge Sorted Array (LeetCode #88 - Easy)

* **Problem:** Merge sorted `nums2` into `nums1` (which has space) in-place.
* **Optimal Approach:** Three Pointers (from the end).
* **Thought Process:** Compare elements from the ends of `nums1` (m-1) and `nums2` (n-1). Place the larger element at the end of `nums1` (m+n-1 position). Move pointers backward. Handle remaining elements in `nums2` if any.
* **Complexity:** Time: O(m + n), Space: O(1).

### 2. Squares of a Sorted Array (LeetCode #977 - Easy)

* **Problem:** Given sorted `nums`, return sorted array of squares.
* **Optimal Approach:** Two Pointers (start and end).
* **Thought Process:** Largest squares come from the largest absolute values at the ends of the sorted input. Use `left` and `right` pointers. Compare `abs(nums[left])` and `abs(nums[right])`. Put the larger square at the end of the result array. Move the corresponding pointer inwards. Fill result array from end to start.
* **Complexity:** Time: O(n), Space: O(n) (for result array).

### 3. Search Insert Position (LeetCode #35 - Easy)

* **Problem:** In sorted `nums`, find `target` index or index where it would be inserted.
* **Optimal Approach:** Binary Search.
* **Thought Process:** Standard binary search. If `target` found, return `mid`. If loop finishes (`left > right`), `target` not found. The `left` pointer now indicates the correct insertion position. Return `left`.
* **Complexity:** Time: O(log n), Space: O(1).

### 4. Binary Search (LeetCode #704 - Easy)

* **Problem:** Standard binary search in a sorted array. Find `target` or return -1.
* **Optimal Approach:** Binary Search.
* **Thought Process:** Implement the standard binary search algorithm template (`while left <= right`, compare `nums[mid]` with `target`, adjust `left` or `right`). Return -1 if loop finishes.
* **Complexity:** Time: O(log n), Space: O(1).

### 5. First Bad Version (LeetCode #278 - Easy)

* **Problem:** Find the first bad version in `[1..n]` using `isBadVersion(v)` API. Versions are `[Good...Good, Bad...Bad]`.
* **Optimal Approach:** Binary Search on version numbers.
* **Thought Process:** Search space `[1, n]`. Use `while left < right`. If `isBadVersion(mid)` is true, the first bad could be `mid` or earlier, so search `[left, mid]` (`right = mid`). If false, the first bad must be after `mid`, search `[mid + 1, right]` (`left = mid + 1`). Loop terminates when `left == right`, which is the first bad version.
* **Complexity:** Time: O(log n), Space: O(1).

### 6. Find Peak Element (LeetCode #162 - Medium)

* **Problem:** Find *any* peak element (strictly > neighbors) in `nums`. `nums[-1]=nums[n]=-inf`.
* **Optimal Approach:** Binary Search based on comparison with neighbor.
* **Thought Process:** Use `while left < right`. Compare `nums[mid]` with `nums[mid + 1]`.
    * If `nums[mid] < nums[mid + 1]`: A peak must exist to the right (could be `mid+1` or further). Search `[mid + 1, right]` (`left = mid + 1`).
    * If `nums[mid] > nums[mid + 1]`: `mid` could be a peak, or a peak exists to the left. Search `[left, mid]` (`right = mid`).
    * Loop terminates when `left == right`, pointing to a peak.
* **Complexity:** Time: O(log n), Space: O(1).

### 7. Search a 2D Matrix (LeetCode #74 - Medium)

* **Problem:** Search for `target` in an `m x n` matrix where rows are sorted L-R, and row `i`'s first element > row `i-1`'s last.
* **Optimal Approach:** Binary Search (treat as 1D array).
* **Thought Process:** The matrix properties mean it's effectively a sorted 1D array of size `m*n`. Binary search on indices `[0, m*n - 1]`. For a `mid_idx`, convert it to `row = mid_idx // n`, `col = mid_idx % n`. Compare `matrix[row][col]` with `target` and adjust `left`/`right`.
* **Complexity:** Time: O(log(m*n)), Space: O(1).

### 8. Find Minimum in Rotated Sorted Array (LeetCode #153 - Medium)

* **Problem:** Find the minimum element in a rotated sorted array (unique elements).
* **Optimal Approach:** Binary Search comparing `mid` with `right`.
* **Thought Process:** Use `while left < right`. Compare `nums[mid]` with `nums[right]`.
    * If `nums[mid] < nums[right]`: The section `[mid, right]` is sorted. Minimum cannot be in `(mid, right]`. `mid` *could* be the minimum. Search `[left, mid]` (`right = mid`).
    * If `nums[mid] > nums[right]`: The rotation point (and minimum) is in `(mid, right]`. `mid` cannot be the minimum. Search `[mid + 1, right]` (`left = mid + 1`).
    * Loop terminates when `left == right`, pointing to the minimum element.
* **Complexity:** Time: O(log n), Space: O(1).

### 9. Koko Eating Bananas (LeetCode #875 - Medium)

* **Problem:** Find the minimum eating speed `k` such that Koko can eat all bananas in `piles` within `h` hours.
* **Optimal Approach:** Binary Search on the Answer Space (speed `k`).
* **Thought Process:** Speed `k` has a range `[1, max(piles)]`. Time taken is monotonic with speed. Binary search for `k`.
    * Check function `can_finish(speed)`: Calculate total hours needed for given speed (`ceil(pile / speed)` for each pile). Return `True` if `total_hours <= h`.
    * Binary Search `[1, max(piles)]` using `while left < right`.
        * If `can_finish(mid_k)` is `True`: `mid_k` might be the answer, or maybe slower works. Try slower: `right = mid_k`.
        * If `can_finish(mid_k)` is `False`: `mid_k` is too slow. Need faster: `left = mid_k + 1`.
    * Loop ends with `left` being the minimum valid speed.
* **Complexity:** Time: O(n log M) (n = # piles, M = max pile size), Space: O(1).

### 10. Search in Rotated Sorted Array (LeetCode #33 - Medium)

* **Problem:** Search for `target` in a rotated sorted array (unique elements). Return index or -1.
* **Optimal Approach:** Modified Binary Search checking which half is sorted.
* **Thought Process:** Use `while left <= right`. Calculate `mid`.
    * Check if `nums[mid] == target`.
    * Determine which half (`[left, mid]` or `[mid, right]`) is sorted by comparing `nums[left]` with `nums[mid]`.
    * If left half is sorted (`nums[left] <= nums[mid]`): Check if `target` is within the range `[nums[left], nums[mid])`. If yes, search left (`right = mid - 1`). Else, search right (`left = mid + 1`).
    * If right half is sorted (`nums[left] > nums[mid]`): Check if `target` is within the range `(nums[mid], nums[right]]`. If yes, search right (`left = mid + 1`). Else, search left (`right = mid - 1`).
* **Complexity:** Time: O(log n), Space: O(1).


## Core Techniques for Day 2 Problems:

1.  **Sorting as Preprocessing:** Recognize when sorting simplifies the problem structure (e.g., allows two pointers, binary search, easy duplicate checks).
2.  **Binary Search Applicability:** Identify problems with explicitly sorted data, implicitly sorted data (monotonic conditions), or partially sorted data (rotated arrays) where O(log n) search is possible.
3.  **Binary Search Logic:** Master the core divide-and-conquer steps: calculate `mid`, compare, correctly adjust `left`/`right` boundaries to shrink the search space.
4.  **Boundary Conditions:** Pay close attention to initializing `left`/`right`, the loop condition (`<` vs `<=`), and boundary updates (`mid`, `mid-1`, `mid+1`).
5.  **Problem Transformation:** Adapt problems to fit search algorithms (e.g., 2D matrix to 1D view).
6.  **Binary Search on Answer Space:** Apply binary search not just on data indices, but on the range of possible *answers* when a condition exhibits monotonicity.


## `while (left < right)` vs `while (left <= right)` in Binary Search:

### `while (left <= right)`:

* **Search Space:** `[left, right]` (inclusive). Loop continues as long as space has at least one element.
* **Termination:** `left > right`. Search space becomes empty.
* **Updates (when `target != mid`):** Typically **exclude** `mid` from the next search: `left = mid + 1` or `right = mid - 1`.
* **Use Case:** Good for finding an **exact match**. If the loop finishes without finding the target, it's not there. The final `left` value often indicates the insertion point.

### `while (left < right)`:

* **Search Space:** Often aims to converge `left` and `right` to a single potential answer. Loop continues as long as `left` and `right` are different.
* **Termination:** `left == right`. They meet at the potential answer index.
* **Updates:** Boundary updates depend on whether `mid` should be **included** in the next search space.
    * `right = mid`: Keep `mid` as a possibility in the `[left, mid]` range. Used when `mid` satisfies a condition and we want the *first* such element or `mid` could be the answer.
    * `left = mid + 1`: Exclude `mid`. Used when `mid` does not satisfy the condition and the answer must be to the right.
* **Use Case:** Often used for finding the **first/last element satisfying a condition**, finding boundaries, or in problems where the comparison naturally partitions the space such that `mid` itself needs consideration for the next step (e.g., `First Bad Version`, `Find Minimum`, `Find Peak`).

**Guidance:** Choose based on what you're looking for (exact match vs. boundary) and how your comparison logic naturally leads to shrinking the search space (inclusive vs. exclusive of `mid`). Both can often be adapted, but one might feel more natural for a given problem. Always verify your boundary conditions and termination logic.

