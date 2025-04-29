---
title: "leetcode-grinding-day4"
date: "2025-04-28T19:29:02"
---
# Day 4: Linked Lists

## Core Concepts:

* **Node Structure:** Basic unit `ListNode` typically contains `val` (value) and `next` (a pointer/reference to the next node or `None` if it's the last node).
* **Head:** A reference pointing to the very first node of the list. It's the entry point. An empty list has a `head` of `None`.
* **Traversal:** Iterating through the list, usually starting from the `head` and repeatedly moving to the `next` node (`current = current.next`) until `current` becomes `None`. Careful handling of `None` is crucial.
* **vs. Array:** Linked lists allow efficient O(1) time insertion/deletion *if* you have a reference to the node/previous node, but accessing the k-th element takes O(k) time. Arrays offer O(1) access by index but O(n) insertion/deletion in the general case due to element shifting. Nodes can be non-contiguous in memory.
* **Dummy Node (Sentinel):** An auxiliary node placed *before* the actual head (`dummy = ListNode(0, head)`). This simplifies code, especially for operations that might modify the head node (like deletion or insertion at the beginning), as the head can then be treated like any other node relative to the dummy node. The actual result list starts at `dummy.next`.


## Classic Problems & Optimal Approaches:

### 1. Reverse Linked List (LeetCode #206 - Easy)

* **Problem:** Reverse a singly linked list.
* **Optimal Approach:** Iterative using three pointers (`prev`, `curr`, `next_temp`).
* **Thought Process:** Iterate through the list. For each node `curr`, store its next node (`next_temp`), reverse its `next` pointer to point to `prev`, then advance `prev` to `curr` and `curr` to `next_temp`. Initialize `prev = None`. The new head is `prev` after the loop.
* **Complexity:** Time: O(n), Space: O(1).

### 2. Merge Two Sorted Lists (LeetCode #21 - Easy)

* **Problem:** Merge two sorted linked lists `list1` and `list2` into one sorted list.
* **Optimal Approach:** Iterative using a Dummy Node and a `tail` pointer.
* **Thought Process:** Create a `dummy` head for the result. Use `tail` pointer to build the new list. Compare `list1.val` and `list2.val`. Append the smaller node to `tail.next`, advance the pointer of the list from which the node was taken, and advance `tail`. After one list is exhausted, append the rest of the other list. Return `dummy.next`.
* **Complexity:** Time: O(m + n), Space: O(1).

### 3. Linked List Cycle (LeetCode #141 - Easy)

* **Problem:** Detect if a linked list has a cycle.
* **Optimal Approach:** Fast & Slow Pointers (Floyd's Tortoise and Hare).
* **Thought Process:** Initialize `slow` and `fast` to `head`. In a loop (`while fast and fast.next`), move `slow` one step (`slow = slow.next`) and `fast` two steps (`fast = fast.next.next`). If `slow == fast` at any point, a cycle exists. If the loop terminates (fast reaches `None`), no cycle exists.
* **Complexity:** Time: O(n), Space: O(1).

### 4. Middle of the Linked List (LeetCode #876 - Easy)

* **Problem:** Find the middle node of a linked list. If two middle nodes, return the second one.
* **Optimal Approach:** Fast & Slow Pointers.
* **Thought Process:** Initialize `slow` and `fast` to `head`. In a loop (`while fast and fast.next`), move `slow` one step and `fast` two steps. When the loop terminates, `slow` will be pointing at the middle (or second middle) node.
* **Complexity:** Time: O(n), Space: O(1).

### 5. Delete Node in a Linked List (LeetCode #237 - Easy)

* **Problem:** Delete a node (`node`) from a list, given only access to that node (not the head, and not the tail).
* **Optimal Approach:** Value Copying Trick.
* **Thought Process:** Since we cannot access the previous node to change its `next` pointer, we overwrite the value of the node-to-be-deleted (`node`) with the value of its *next* node (`node.next.val`). Then, we bypass the *next* node by setting `node.next = node.next.next`. This effectively deletes the target node's value by replacing it and removing the subsequent node.
* **Complexity:** Time: O(1), Space: O(1).

### 6. Remove Nth Node From End of List (LeetCode #19 - Medium)

* **Problem:** Remove the Nth node from the *end* of the list and return its head.
* **Optimal Approach:** Two Pointers (Fixed Gap) + Dummy Node.
* **Thought Process:** Use a `dummy` node pointing to `head` to handle edge cases (removing the actual head). Initialize `fast` and `slow` pointers to `dummy`. First, advance `fast` `n` steps ahead. Then, advance both `fast` and `slow` together until `fast.next` is `None`. At this point, `slow` is pointing to the node *before* the Nth node from the end. Perform deletion: `slow.next = slow.next.next`. Return `dummy.next`.
* **Complexity:** Time: O(L) (L = list length), Space: O(1).

### 7. Palindrome Linked List (LeetCode #234 - Easy)

* **Problem:** Check if a singly linked list is a palindrome.
* **Optimal Approach:** Find Middle + Reverse Second Half + Compare.
* **Thought Process:** 1. Use fast/slow pointers to find the middle node. 2. Reverse the second half of the list starting from `middle.next`. 3. Compare the first half (from `head`) with the reversed second half. If all values match, it's a palindrome. 4. (Optional but good practice) Restore the list by reversing the second half again and reconnecting.
* **Complexity:** Time: O(n), Space: O(1).

### 8. Intersection of Two Linked Lists (LeetCode #160 - Easy)

* **Problem:** Find the node at which two singly linked lists intersect. Return `null` if they don't.
* **Optimal Approach:** Two Pointers (Traversal swap).
* **Thought Process:** Initialize `pA = headA`, `pB = headB`. Traverse simultaneously. If `pA` reaches the end of list A, redirect it to `headB`. If `pB` reaches the end of list B, redirect it to `headA`. The pointers will meet at the intersection node (if one exists) because they will have traveled the same total distance (`lenA + lenB - commonLen`). If they don't intersect, they will both become `None` simultaneously. Return `pA` (or `pB`) when `pA == pB`.
* **Complexity:** Time: O(m + n), Space: O(1).

### 9. Add Two Numbers (LeetCode #2 - Medium)

* **Problem:** Add two numbers represented by linked lists (digits stored in reverse order). Return sum as a linked list.
* **Optimal Approach:** Elementary Math Simulation + Dummy Node.
* **Thought Process:** Use a `dummy` head for the result list and a `current` pointer to build it. Use a `carry` variable (initially 0). Iterate while either list still has nodes or `carry` is non-zero. In each step, get values from `l1` and `l2` (use 0 if list is `None`), calculate `total = val1 + val2 + carry`, update `carry = total // 10`, get `digit = total % 10`. Create a new node with `digit`, append it to `current.next`, move `current`. Advance `l1` and `l2` if they exist. Return `dummy.next`.
* **Complexity:** Time: O(max(m, n)), Space: O(max(m, n)) (for the result list).

### 10. Reorder List (LeetCode #143 - Medium)

* **Problem:** Reorder list `L0→L1→…→Ln-1→Ln` to `L0→Ln→L1→Ln-1→L2→Ln-2→…` in-place.
* **Optimal Approach:** Find Middle + Reverse Second Half + Merge Alternatingly.
* **Thought Process:** 1. Find the middle node using fast/slow pointers. 2. Split the list into two halves (set `middle.next = None`). 3. Reverse the second half. 4. Merge the first half and the reversed second half by alternating nodes: link first node of second list after first node of first list, link second node of first list after first node of second list, and so on.
* **Complexity:** Time: O(n), Space: O(1).


## Core Techniques Summary (Day 4):

1.  **Master Pointer Variables:** Effectively use `prev`, `curr`, `next_temp`, `slow`, `fast` (or similar) to track positions and modify links without losing references.
2.  **Handle `None` (Null Checks):** Crucial for avoiding errors. Always check if a node or `node.next` is `None` before accessing its properties.
3.  **Use Dummy Nodes:** Employ a dummy head node (`ListNode(0, head)`) to simplify edge cases involving the actual head node (insertion, deletion). Remember to return `dummy.next`.
4.  **Recognize Fast/Slow Pattern:** Apply this for cycle detection and finding the middle node.
5.  **Iterative Reversal Pattern:** Know the standard 3-pointer (`prev`, `curr`, `next_temp`) iterative reversal logic.
6.  **Two Pointers with Gap:** Use for finding Nth node from end (let `fast` lead `slow` by `n` steps).
7.  **Visualize:** Draw linked list diagrams and trace pointer movements on paper or whiteboard to understand and debug complex manipulations.
