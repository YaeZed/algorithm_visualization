---
name: algorithm-visualization
description: Creates a highly interactive, 3-column LeetCode algorithm visualization tool using p5.js, Highlight.js (VS Code Dark+), and 5-language code snippets. Use this when the user asks for algorithm visualization, LeetCode problem illustrations, or step-by-step code execution UI.
---

Algorithm physicalization is the process of translating abstract data structures and code logic into beautiful, interactive, step-by-step visual metaphors.

This skill orchestrates the creation of a 3-column UI:

1. Panel 1: Parameter configuration (Seed, Speed, variables)
2. Panel 2: Interactive `p5.js` animated execution canvas
3. Panel 3: Multilingual optimal code (VS Code syntax highlighting) & real-time execution log.

When invoked, execute the following workflow:

## WARM UP: ALGORITHM DECONSTRUCTION

First, deeply understand the algorithm the user is referencing (e.g., "Merge K Sorted Lists", "Binary Tree Level Order Traversal", "Dijkstra", etc.).

Decide on a visual metaphor:

- Arrays -> Histograms, discrete color blocks, moving nodes.
- Graphs/Trees -> Structured nodes with edges, expanding frontiers.
- Pointers -> Arrows, floating halos over elements.

Determine the Key Execution States:
What are the crucial moments in the code that trigger a visual change? E.g., comparing two nodes, popping from a heap, updating a pointer. These are the moments you will invoke `logMsg()`.

---

## ⚠️ CRITICAL STEP 0: READ THE TEMPLATE ⚠️

Before writing any HTML, you MUST:

1. **Read** `templates/viewer.html` from this skill directory using the Read tool.
2. **USE THIS TEMPLATE as your LITERAL STARTING POINT** - do not invent your own structure.
3. Keep the 3-column CSS (`.sidebar`, `.canvas-area`, `.right-panel`), the VS Code `.hljs` class overrides, entirely intact.
4. Locate the specific comments marked with `REPLACE_...` and ONLY modify those regions.

---

## IMPLEMENTATION REQUIREMENTS

### 1. The Code Viewer (SNIPPETS Object)

You must write the _optimal_ solution to the target problem in FIVE languages.

1. Python (e.g., `heapq`, `collections.deque`)
2. TypeScript (strong typing)
3. Java (`PriorityQueue`, standard structures)
4. C++ (STL vectors, memory management)
5. C (raw pointers, manual structures)

**CRITICAL RULE FOR SNIPPETS (ANTI-BUG STRICT ENFORCEMENT)**:

1. You must add _Extremely Detailed_ Chinese comments inside the SNIPPETS code strings to explain complex syntax or logic. Since the user reads this while watching the animation, heavily comment _why_ a line is doing what it's doing.
2. ⚠️ NEVER escape your backticks (`) or template literal dollar signs (${}) when writing the Javascript code string. Just use standard template literals. Using `\`` will break the HTML execution.

Example:

```javascript
const SNIPPETS = {
  python: `# Python\ndef solve():\n    # 初始化堆\n    heap = []`,
  //...
};
```

### 2. The Execution Log (`logMsg`)

The template includes a pre-built auto-scrolling log function: `logMsg(message, highlightBoolean)`.
You must strategically call this throughout your `p5.js` implementation's `draw() -> performStep()` cycle.

- Example: `logMsg("📍 指针移动到节点 " + curr.val, false);`
- Highlighted Example: `logMsg("🚀 找到局部最优解，压入结果集！", true);`

### 3. Visual Domain Mapping

Map abstract data structures to concrete visual elements:

- Arrays -> Horizontal sequences of boxes with indices below.
- Linked Lists -> Circular or rounded nodes with arrows.
- Dummy/Sentinel Nodes -> Should be visually distinct (e.g., a "D" label or gray color) and clearly labeled as "dummy".
- Variables & Pointers -> Do not just highlight a node. Use floating labels (e.g., "pre ↓", "tail ↓", "temp ↓") that point to the data they represent. These labels should also use `lerp()` to follow the data they point to.
- Priority Queues/Heaps -> Use a small grid or bubble list to show the currently "standing by" elements.
- Hash Maps/Sets -> Use a 2-column key-value grid or floating discrete "buckets" off to the side.
- Recursion/Call Stack -> Stacked rectangular frames that expand (push) and collapse (pop).

### 4. Language-Aware UX (Crucial)

When the user switches between the 5 programming languages (Python, Java, C++, TS, C), the visualization MUST adapt:

1. **Auto-Reset**: The `switchLang(l)` function must set `currentLang = l;` and immediately call `initializeSystem()` or `resetAnimation()` so the current animation restarts from the beginning under the rules of the new code snippet.
2. **Dynamic Variables**: Different languages use different variable names (e.g., Python might use `pre` and `nxt`, while Java might use `prev` and `next`, and C++ uses `p` and `q`).
   - Define a global `const LANG_VARS = { python: {...}, java: {...}, cpp: {...}, ... }` map.
   - The floating labels rendered in `draw()` must read their display name from `LANG_VARS[currentLang]` instead of being hardcoded strings.

### 5. State Management (`performStep()`)

Do not run a `while(true)` loop inside `p5.js` `draw()`. Visualizing an algorithm requires slowing it down.
Maintain a global state machine:

- `isDone` boolean.
- `isPaused` boolean (toggled by the Pause button).
- `stepTimer` counter (managed by `params.speed`).
- Arrays or queues reflecting the current state.
  Inside `performStep()`, execute exactly ONE atomic logical step of the algorithm, update visual queues, call `logMsg()`, and then yield back to the `draw()` loop to animate the transition.

### 6. Smooth Animations (Asymptotic Lerping)

To make the visualization feel premium, DO NOT jump geometric shapes instantly.

1. **Nodes**: Use global `dispX/Y` variables and `p5.js lerp()` in `draw()` to chase logic variables.
2. **Global Labels**: For pointers like `pre`, `tail`, or `temp`, maintain `dispPtrX/Y` coordinates and lerp them towards the target node's position. This ensures labels don't "teleport" between nodes.
3. **Transition Speed**: Use `0.1 * params.speed` as a baseline for smooth, non-linear movement.

Example for a pointer label:

```javascript
// Inside draw():
dispPreX = lerp(dispPreX, nodes[preIdx].x, 0.1 * params.speed);
text("pre ↓", dispPreX, nodes[preIdx].y - 40);
```

### 7. Interactive Parameters (`params` Object)

Identify what makes this specific algorithm interesting to tweak.

- Array length?
- Number of nodes?
- Target sum?
- Randomness boundaries?
  Create sliders for these in the HTML `div.control-section` and sync them to the `params` Javascript object via `updateParam()`.

### 8. Data View UI (`updateDataUI()`)

For some algorithms (like Heaps or Stacks), it's highly educational to print the raw state of a secondary array beneath the codebase. Use the existing `#data-nodes` container and the `updateDataUI(array)` function provided in the template to print out the raw sequence of numbers or chars representing the hidden state.

### 9. Algorithm Memo Card (`REPLACE_KNOWLEDGE_PANEL`)

**Only replace this section. Do NOT modify any other part of the template.**

Fill in two parts:

1. **Complexity badges**: Provide the optimal time (`.time`) and space (`.space`) complexity for the algorithm.
2. **Memo tips** (3–5 items, mix of styles):
   - Default orange `.memo-tip` → Core execution logic / key decision points
   - Green `.memo-tip g` → Extended insights / connections to other algorithms
   - Amber `.memo-tip w` → Common mistakes / edge-case traps

Example (Trapping Rain Water · Two Pointers):
```html
<div class="memo-card">
  <h3>算法速记</h3>
  <div class="memo-badges">
    <span class="memo-badge time">⏱ O(n)</span>
    <span class="memo-badge space">□ O(1)</span>
  </div>
  <div class="memo-tips">
    <div class="memo-tip">💡 左右双指针向中收敛，每步移动较小高度的一侧。</div>
    <div class="memo-tip">💡 当前侧能积水 = 当前侧最大高度 − 当前高度。</div>
    <div class="memo-tip g">🔍 本质是贪心：较矮侧积水量已被自身最大值决定，无需看对侧。</div>
    <div class="memo-tip w">⚠️ 不要暴力 O(n²) 枚举左右边界，双指针一次扫完即可。</div>
  </div>
</div>
```

**CRITICAL**: Never leave placeholder text ("核心思路描述放这里", etc.). Always replace ALL tip items with real content specific to the algorithm being visualized.

---

## OUTPUT FORMAT

Output:
A **Single HTML Artifact** using the standard claude.ai artifact system.
It must embed everything inline: CSS, p5.js CDN links, highlight.js dependencies, SVG icons, and the massive `SNIPPETS` object and custom P5 logic.

**NEVER provide broken or truncated HTML.** Provide the complete, fully functional `.html` text. The result must run instantly in the browser without external local files.
