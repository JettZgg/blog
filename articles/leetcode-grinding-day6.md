---
title: "leetcode-grinding-day6"
date: "2025-04-29T15:14:13"
---

# Day 6 Summary: Heaps (Priority Queues) & Intro to Graphs

## Core Concepts:

### Heaps / Priority Queues

* **What is a Heap?** A specialized tree-based structure (usually a Complete Binary Tree) satisfying the heap property:
    * **Min-Heap:** Parent node's value <= children's values. Root is the minimum.
    * **Max-Heap:** Parent node's value >= children's values. Root is the maximum.
* **Priority Queue:** An abstract data type allowing adding elements and efficiently extracting the element with the highest (or lowest) priority. Heaps are a common implementation.
* **Python's `heapq` Module:**
    * Implements a **Min-Heap** using standard Python lists.
    * **Key Functions:** `heapq.heappush(h, item)` (O(log n)), `heapq.heappop(h)` (O(log n), returns smallest), `heapq.heapify(list)` (O(n), in-place), `h[0]` (O(1), peek smallest).
    * **Simulating Max-Heap:** Store negated values (`-item`). Popping the "smallest" negative value gives the largest original value.
* **Use Cases:** Finding Kth largest/smallest, Top K frequent, Median from stream, Merging sorted lists, Graph algorithms (Dijkstra, Prim).
* **Complexity:** Push/Pop: O(log n), Peek: O(1), Build Heap (Heapify): O(n).

### Introduction to Graphs

* **What is a Graph?** A structure of Vertices (Nodes) connected by Edges, representing relationships. Can be directed/undirected, weighted/unweighted.
* **Representations:**
    * **Adjacency List:** **Most common for sparse graphs.** Dictionary or list mapping `vertex -> [list of neighbors]`. Space: O(V + E).
    * **Adjacency Matrix:** V x V matrix where `matrix[i][j]` indicates an edge. Good for dense graphs, O(1) edge check. Space: O(V²).
* **Graph Traversal:** Systematically visiting nodes. Requires a `visited` set to handle cycles.
    * **Breadth-First Search (BFS):** Explores layer by layer using a **Queue**. Finds shortest paths in unweighted graphs.
    * **Depth-First Search (DFS):** Explores as deep as possible along a path before backtracking. Uses **Recursion** (implicit stack) or an **explicit Stack**. Used for path finding, cycle detection, connectivity.
* **Complexity (BFS/DFS):** Time: O(V + E), Space: O(V + E) (for adjacency list, visited set, queue/stack).

---

## Classic Problems & Optimal Approaches (Examples 1-10):

### 1. Kth Largest Element in an Array (LeetCode #215 - Medium)

* **Problem:** Find the Kth largest element in `nums`.
* **Optimal Approach:** Min-Heap of size K.
* **Thought Process:** Maintain a min-heap storing the K largest elements seen so far. Iterate through `nums`. Push `num` to heap. If heap size > K, pop the smallest (heap top). Final heap top is the Kth largest.
* **Complexity:** Time: O(n log k), Space: O(k).

### 2. Top K Frequent Elements (LeetCode #347 - Medium)

* **Problem:** Find the K most frequent elements in `nums`.
* **Optimal Approach:** HashMap for frequencies + Min-Heap of size K.
* **Thought Process:** 1. Count frequencies using HashMap (O(n)). 2. Create min-heap storing `(frequency, element)`. 3. Iterate through HashMap items, push to heap, pop if size > K. 4. Extract elements from the final heap.
* **Complexity:** Time: O(n log k), Space: O(n + k).

### 3. Merge k Sorted Lists (LeetCode #23 - Hard)

* **Problem:** Merge K sorted linked lists into one sorted list.
* **Optimal Approach:** Min-Heap storing nodes.
* **Thought Process:** Use a min-heap to efficiently find the smallest node among the current heads of all K lists. Store `(node.val, unique_id, node)` in heap to handle same values safely in Python 3. Pop smallest node, add to result, push its `next` node (if exists) back into heap.
* **Complexity:** Time: O(N log k) (N=total nodes), Space: O(k) (for heap).

### 4. Find Median from Data Stream (LeetCode #295 - Hard)

* **Problem:** Design structure to add numbers and find median efficiently.
* **Optimal Approach:** Two Heaps: Max-Heap (for lower half) and Min-Heap (for upper half).
* **Thought Process:** Keep heaps balanced (size diff <= 1). `addNum`: Add to max-heap, move max-heap top to min-heap, rebalance if needed. `findMedian`: If sizes equal, avg of tops. If one heap larger, its top is median. (Remember to negate for max-heap simulation).
* **Complexity:** Time: Add O(log n), Find O(1). Space: O(n).

### 5. Number of Islands (LeetCode #200 - Medium)

* **Problem:** Count disconnected groups of '1's (land) in a 2D grid surrounded by '0's (water).
* **Optimal Approach:** Grid Traversal (BFS or DFS) + Visited/Marking.
* **Thought Process:** Iterate through grid. If find '1' not yet visited: increment island count, start BFS/DFS from this cell. Mark all connected '1's reached during traversal as visited (e.g., change '1' to '0' or use a visited set).
* **Complexity:** Time: O(M*N), Space: O(min(M,N)) (BFS) or O(M*N) (DFS stack/visited).

### 6. Clone Graph (LeetCode #133 - Medium)

* **Problem:** Create a deep copy of a connected undirected graph given a starting node.
* **Optimal Approach:** Graph Traversal (BFS or DFS) + HashMap for visited/cloned mapping.
* **Thought Process:** Use HashMap `cloned_map = {original_node: clone_node}`. Start traversal (DFS/BFS) from given node. If node already in map, return its clone. Otherwise, create clone, store in map. Then, iterate original node's neighbors, recursively clone them, and add cloned neighbors to the current clone's neighbor list.
* **Complexity:** Time: O(V + E), Space: O(V).

### 7. Rotting Oranges (LeetCode #994 - Medium)

* **Problem:** In a grid with empty(0), fresh(1), rotten(2) oranges, find min minutes for all fresh to rot (adjacent rotten spreads). Return -1 if impossible.
* **Optimal Approach:** Multi-Source BFS on Grid.
* **Thought Process:** Find all initial rotten oranges and add to queue (level 0). Count fresh oranges. Perform BFS level by level. Each level represents one minute. While queue not empty & fresh > 0: process current level, rotting adjacent fresh oranges, decrementing fresh count, enqueueing newly rotten ones. Track minutes passed. If fresh count becomes 0, return minutes. If queue empties but fresh > 0, return -1.
* **Complexity:** Time: O(M*N), Space: O(M*N).

### 8. Find if Path Exists in Graph (LeetCode #1971 - Easy)

* **Problem:** Given edges, n vertices, source, destination, check if a path exists.
* **Optimal Approach:** Basic Graph Traversal (BFS or DFS) + Visited Set.
* **Thought Process:** Build Adjacency List. Start BFS/DFS from `source`. Use `visited` set. If `destination` is reached during traversal, return `True`. If traversal finishes without reaching `destination`, return `False`.
* **Complexity:** Time: O(V + E), Space: O(V + E).

### 9. Island Perimeter (LeetCode #463 - Easy)

* **Problem:** Calculate the perimeter of a single island in a grid (no lakes).
* **Optimal Approach:** Iterate through grid, check neighbors.
* **Thought Process:** Iterate cells. If `grid[r][c] == 1`: check 4 neighbors. For each neighbor that is out of bounds OR is water (`grid[nr][nc] == 0`), add 1 to perimeter.
* **Complexity:** Time: O(M*N), Space: O(1).

### 10. Course Schedule (LeetCode #207 - Medium)

* **Problem:** Check if it's possible to finish all courses given prerequisites (check for cycles in directed graph).
* **Optimal Approach:** Cycle Detection using DFS (with states) or BFS (Kahn's Algorithm/Topological Sort).
* **Thought Process (DFS):** Build graph (prereq -> course). Use `visited` array with 3 states (0=unvisited, 1=visiting, 2=visited). Start DFS from unvisited nodes. Mark node as 1 (visiting). Recurse on neighbors. If neighbor is state 1, cycle detected. If neighbor is state 0, recurse. If recursion finds cycle, propagate True. After visiting all neighbors, mark node as 2 (visited). If no cycle found starting from any node, return True.
* **Complexity:** Time: O(V + E), Space: O(V + E).

---

## Core Techniques Summary (Day 6):

1.  **Heap (`heapq`) Usage:** Know how to use `heappush`, `heappop`, `heapify` for priority queue tasks. Remember it's a min-heap.
2.  **Max-Heap Simulation:** Use negative values with `heapq` to simulate a max-heap.
3.  **Top K Pattern:** Use a min-heap of size K for Kth Largest / Top K Frequent elements (keep largest k). Use a max-heap of size K for Kth Smallest (keep smallest k).
4.  **Two Heaps Pattern:** Use a balanced Max-Heap and Min-Heap to track median or partition data.
5.  **Graph Representation:** Primarily use **Adjacency List** (e.g., `defaultdict(list)`) for most problems. Know when Matrix might be useful (dense graphs).
6.  **BFS (Queue + Visited):** Apply for shortest path (unweighted), level-order traversal. Remember the `visited` set to prevent cycles/re-visiting. Know multi-source BFS pattern.
7.  **DFS (Recursion/Stack + Visited):** Apply for path finding, cycle detection, connectivity. Remember the `visited` set. Understand recursive structure or iterative stack simulation. For cycle detection in directed graphs, often need 3 states (visiting, visited).
8.  **Grid as Graph:** Treat cells in a 2D grid as nodes and adjacent cells (4 or 8 directions) as edges. Apply standard graph traversal (BFS/DFS).


