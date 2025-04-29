---
title: "leetcode-grinding-day5"
date: "2025-04-28T19:29:32"
---

# Day 5: Trees (BFS & DFS)

## Core Concepts:

* **Node Structure:** Basic unit `TreeNode` typically contains `val` (value), `left` child pointer, and `right` child pointer (either can be `None`).
* **Terminology:**
    * **Root:** The top-most node.
    * **Parent/Child:** Nodes connected by an edge, higher is parent.
    * **Leaf:** A node with no children (`left` and `right` are `None`).
    * **Subtree:** A node and all its descendants form a subtree rooted at that node.
    * **Depth:** Number of edges from Root to a node (Root depth = 0).
    * **Height:** Number of edges on the longest path from a node to a leaf in its subtree (Leaf height = 0). Tree height = Root height.
* **Binary Search Tree (BST):** A special binary tree where for every node: `all nodes in left subtree < node.val < all nodes in right subtree`. This property holds recursively. Inorder traversal yields a sorted sequence.

## Traversal Algorithms:

* **Breadth-First Search (BFS) / Level Order:**
    * **Idea:** Explore level by level, top-to-bottom, left-to-right.
    * **Data Structure:** Uses a **Queue**.
    * **Process:** Enqueue root. While queue not empty: dequeue node, process it, enqueue its non-null children (left then right).
    * **Use Cases:** Level order traversal, shortest path in unweighted graphs/trees.
    * **Space:** O(W), where W = max width of the tree (can be up to O(N)).

* **Depth-First Search (DFS):**
    * **Idea:** Go as deep as possible down one path before backtracking.
    * **Data Structure:** Uses **Recursion** (implicit function call stack) or an **explicit Stack** (iterative). Recursion is often more natural for trees.
    * **Orders (Defined by when Root is processed relative to Left/Right):**
        * **Preorder (Root-Left-Right):** Process node, then recurse left, then recurse right.
        * **Inorder (Left-Root-Right):** Recurse left, then process node, then recurse right. (Yields sorted sequence for BST).
        * **Postorder (Left-Right-Root):** Recurse left, then recurse right, then process node. (Useful when result depends on children's results).
    * **Use Cases:** Path finding, checking tree properties (depth, validity), many recursive problems.
    * **Space:** O(H), where H = height of the tree (recursion stack or explicit stack, can be O(N) in skewed trees, O(log N) in balanced trees).


## Classic Problems & Optimal Approaches:

### 1. Maximum Depth of Binary Tree (LeetCode #104 - Easy)

* **Problem:** Find the maximum depth (longest root-to-leaf path) of a binary tree.
* **Optimal Approach:** DFS (Recursive) or BFS.
* **Thought Process (DFS):** Depth of a node is `1 + max(depth of left child, depth of right child)`. Base case: `depth(None) = 0`.
* **Complexity:** Time: O(N), Space: O(H).

### 2. Same Tree (LeetCode #100 - Easy)

* **Problem:** Check if two binary trees `p` and `q` are structurally identical and have the same node values.
* **Optimal Approach:** DFS (Recursive).
* **Thought Process:** Trees are same if roots have same value AND left subtrees are same AND right subtrees are same. Handle `None` base cases carefully (both `None` -> True, one `None` -> False).
* **Complexity:** Time: O(N) (N = nodes in smaller tree), Space: O(H).

### 3. Invert Binary Tree (LeetCode #226 - Easy)

* **Problem:** Invert a binary tree (swap left and right children for all nodes).
* **Optimal Approach:** DFS (Recursive) or BFS.
* **Thought Process (DFS):** Recursively invert the left subtree, recursively invert the right subtree, then swap the current node's `left` and `right` children. Base case: `node is None`.
* **Complexity:** Time: O(N), Space: O(H) (DFS) or O(W) (BFS).

### 4. Binary Tree Inorder Traversal (LeetCode #94 - Easy)

* **Problem:** Return the inorder traversal (Left-Root-Right) of a binary tree.
* **Optimal Approach:** DFS (Recursive or Iterative with Stack).
* **Thought Process (Recursive):** Define `inorder(node)`: if node exists, call `inorder(node.left)`, process `node.val`, call `inorder(node.right)`.
* **Thought Process (Iterative):** Use a stack. Push nodes while going left. Pop node, process it. Go right (`current = node.right`). Repeat.
* **Complexity:** Time: O(N), Space: O(H).

### 5. Binary Tree Preorder Traversal (LeetCode #144 - Easy)

* **Problem:** Return the preorder traversal (Root-Left-Right) of a binary tree.
* **Optimal Approach:** DFS (Recursive or Iterative with Stack).
* **Thought Process (Recursive):** Define `preorder(node)`: if node exists, process `node.val`, call `preorder(node.left)`, call `preorder(node.right)`.
* **Thought Process (Iterative):** Use a stack. Push root. While stack not empty: pop node, process it, push right child (if exists), push left child (if exists).
* **Complexity:** Time: O(N), Space: O(H).

### 6. Binary Tree Level Order Traversal (LeetCode #102 - Medium)

* **Problem:** Return the level order traversal (nodes level by level, left to right), grouped by level.
* **Optimal Approach:** BFS (Queue).
* **Thought Process:** Use a queue. In each iteration, process all nodes currently in the queue (representing one level). Get the `level_size`. Loop `level_size` times: dequeue node, add its value to `current_level` list, enqueue its non-null children. After the inner loop, add `current_level` to the main result list.
* **Complexity:** Time: O(N), Space: O(W).

### 7. Symmetric Tree (LeetCode #101 - Easy)

* **Problem:** Check if a binary tree is a mirror image of itself (symmetric around its center).
* **Optimal Approach:** Recursive DFS (comparing symmetric nodes) or BFS (checking level symmetry).
* **Thought Process (Recursive):** Define helper `isMirror(left_node, right_node)`. Base cases for `None`. Check if `left_node.val == right_node.val`. Recursively check `isMirror(left_node.left, right_node.right)` AND `isMirror(left_node.right, right_node.left)`. Initial call `isMirror(root.left, root.right)`.
* **Complexity:** Time: O(N), Space: O(H).

### 8. Validate Binary Search Tree (LeetCode #98 - Medium)

* **Problem:** Determine if a given binary tree is a valid Binary Search Tree (BST).
* **Optimal Approach:** Recursive check with valid range OR Inorder traversal check for sortedness.
* **Thought Process (Range Check):** Define helper `isValid(node, min_bound, max_bound)`. Check if `node.val` is within `(min_bound, max_bound)`. Recursively call for left child with updated upper bound (`isValid(node.left, min_bound, node.val)`) and for right child with updated lower bound (`isValid(node.right, node.val, max_bound)`).
* **Thought Process (Inorder Check):** Perform inorder traversal. Keep track of the `previous_value`. For each node visited, check if its value is strictly greater than `previous_value`. If not, return `False`. Update `previous_value`. Avoids storing the whole list.
* **Complexity:** Time: O(N), Space: O(H).

### 9. Lowest Common Ancestor of a Binary Search Tree (LeetCode #235 - Easy)

* **Problem:** Find the Lowest Common Ancestor (LCA) of two given nodes `p` and `q` in a BST.
* **Optimal Approach:** Utilize BST property (Iterative or Recursive).
* **Thought Process:** Start at root. If both `p.val` and `q.val` are smaller than `root.val`, LCA must be in left subtree. If both are larger, LCA must be in right subtree. If they are on different sides (or one is the root), the current `root` is the LCA.
* **Complexity:** Time: O(H), Space: O(1) (Iterative) or O(H) (Recursive).

### 10. Subtree of Another Tree (LeetCode #572 - Easy)

* **Problem:** Check if tree `subRoot` is a subtree of tree `root` (identical structure and values).
* **Optimal Approach:** Recursive check using a helper for tree equality.
* **Thought Process:** Define `isSameTree(p, q)` (from #100). Main function `isSubtree(root, subRoot)`: If `root` is `None`, return `False` (unless `subRoot` is also `None`). Check if `isSameTree(root, subRoot)`. If yes, return `True`. If not, recursively check `isSubtree(root.left, subRoot)` OR `isSubtree(root.right, subRoot)`.
* **Complexity:** Time: O(N * M) (N = nodes in root, M = nodes in subRoot) in worst case for basic recursion. Space: O(H_root).


## Core Techniques Summary (Day 5):

1.  **BFS vs. DFS Choice:** Use BFS (Queue) for level-order or shortest path problems. Use DFS (Recursion/Stack) for problems involving depth, path checking, or where results depend on subtrees. Recursion is often cleaner for DFS on trees.
2.  **Master Recursive DFS Traversals:** Understand the exact order of visiting the node (`process(node)`) relative to recursive calls (`dfs(left)`, `dfs(right)`) for Preorder, Inorder, and Postorder.
3.  **Master Iterative BFS:** Use a Queue and often track the size of the current level to process nodes layer by layer.
4.  **Iterative DFS (Stack):** Know how to implement Preorder and Inorder iteratively using a Stack (Postorder is less common/trickier).
5.  **Leverage BST Properties:** For BST problems, use the `left < root < right` constraint to guide search or validation efficiently (often O(H) time). Remember Inorder traversal yields sorted data.
6.  **Recursive Problem Decomposition:** Break tree problems into subproblems on the left/right children. Define base cases (usually involving `None` nodes) and combine results from children to solve the problem for the current node.
7.  **Node Definition:** Be comfortable with the `TreeNode(val, left, right)` structure.


