# chai_tailwind

A lightweight, client-side utility CSS engine built from scratch using vanilla JavaScript and DOM manipulation. Inspired by Tailwind CSS, it scans the DOM for classes prefixed with `chai-`, parses them at runtime, and injects inline styles directly onto elements.

## Live Demo

- **Live URL:** [https://dev-ops-om.github.io/chai_tailwind/](https://dev-ops-om.github.io/chai_tailwind/)
- **Demo Path:** `demo/d1/index.html`

---

## How It Works (DOM Manipulation Pipeline)

Instead of using a build step, compiler, or preprocessor, `chai_tailwind` runs directly inside the browser using native DOM APIs.

```
DOM Ready / Node Added
         │
         ▼
[1] DOM Traversal (querySelectorAll("[class*='chai-']"))
         │
         ▼
[2] Extract Class List (Array.from(el.classList))
         │
         ▼
[3] Parse Class String (extract token & value)
         │
         ▼
[4] Rule Resolution (staticRules vs dynamicRules)
         │
         ▼
[5] Apply Inline Style (el.style[prop] = resolvedValue)
         │
         ▼
[6] Clean DOM (el.classList.remove(cls))
```

### 1. Engine Initialization (`src/main.js`)
On `DOMContentLoaded`, the engine calls `runEngine(document.body)` to process the initial HTML markup, and starts `startObserver()` to watch for future DOM updates.

### 2. Traversal & Selection (`src/engine.js`)
Rather than scanning the entire DOM tree node-by-node, `runEngine` uses an optimized CSS attribute selector:
```js
const elements = root.querySelectorAll("[class*='chai-']");
```
This filters out untouched elements and returns only elements containing `chai-` candidate classes.

### 3. Parsing & Rule Lookup (`src/parser.js`, `src/rules.js`)
For each element:
1. It loops through `el.classList` and checks `cls.startsWith("chai-")`.
2. It splits the class string into `{ raw, token, value }`.
3. If it matches a **static rule** (e.g., `chai-flex`, `chai-flex-col`, `chai-w-full`, `chai-h-screen`), it assigns the style object directly using `Object.assign(el.style, staticRules[raw])`.
4. If it matches a **dynamic rule** (e.g., `p`, `px`, `py`, `bg`, `text`, `border`, `gap`, `rounded`), it resolves the CSS property:
   - For `border`: checks if the value is a color (`borderColor`) or size (`borderWidth`).
   - For `text`: checks if the value is a font size (`fontSize`) or color (`color`).

### 4. Value Resolution (`src/resolver.js`, `src/constants/`)
Values are resolved against predefined scales (`spacing.js`, `color.js`) or arbitrary bracket syntax:
- Preset: `chai-px-16` -> `16` maps to `64px`
- Arbitrary value: `chai-w-[200px]` -> extracts `200px`
- Arbitrary color: `chai-border-[#ff0000]` -> extracts `#ff0000`

### 5. Style Application & DOM Cleanup
The resolved value is applied to the element's style property:
```js
if (Array.isArray(cssProperty)) {
  cssProperty.forEach((prop) => {
    el.style[prop] = cssValue; // e.g., paddingLeft and paddingRight for px
  });
} else {
  el.style[cssProperty] = cssValue;
}
```
After applying the inline style, `el.classList.remove(cls)` removes the processed utility class from the element to keep the DOM clean.

### 6. Dynamic DOM Observation (`src/observer.js`)
To support dynamically created elements (e.g., elements injected via JavaScript), a `MutationObserver` monitors changes:
```js
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) runEngine(node);
    });
  });
});
observer.observe(document.body, { childList: true, subtree: true });
```
When new elements are added to the page, they are automatically parsed and styled without re-running the entire script manually.

---

## Step-by-Step Operation & Time Complexity

Here is the exact operation breakdown and time complexity analysis for the engine:

### 1. DOM Traversal & Selection
- If scanning the full tree with `document.querySelectorAll('*')`:
  - **Time Complexity:** `O(N)` where `N` is total DOM nodes.
- When optimized with attribute selector `document.querySelectorAll("[class*='chai-']")`:
  - **Time Complexity:** `O(K)` where `K` is matching candidate nodes (`K <= N`).

### 2. Class Iteration
For each selected element, the engine iterates over its class list:
```js
for (const cls of el.classList) {
  // process class
}
```
- If an element has `M` classes:
  - **Time Complexity:** `O(M)` where `M` is the number of classes on the element.

### 3. String Parsing & Tokenizing
- **Prefix Check:** `cls.startsWith('chai-')` checks a fixed-length prefix.
  - **Time Complexity:** `O(1)`
- **Token Extraction:** `cls.split('-')` splits a string of length `L`.
  - **Time Complexity:** `O(L)`
  - Since utility class names are short strings (`L <= 30`), `L` is bounded and behaves like a constant.
  - **Effective Complexity:** `O(1)`

### 4. Rule Lookup
```js
staticRules[raw]
dynamicRules[token]
```
JavaScript object property access uses hash-table lookups.
- **Average Time Complexity:** `O(1)`

### 5. Style Application
```js
el.style[property] = value;
// or
Object.assign(el.style, styles);
```
Setting an inline style is constant-time from a JavaScript execution perspective.
- **Time Complexity:** `O(1)` (excluding browser internal style recalculation/reflow).

### 6. Class Removal
```js
el.classList.remove(cls);
```
Removing a class searches through the element's class collection.
- **Time Complexity:** `O(M)`

---

### Total Overall Time Complexity

- **General Case:**
  $$\mathcal{O}(N + K \times M)$$
  Where:
  - $N$ = Total DOM nodes
  - $K$ = Selected candidate nodes with `chai-` classes
  - $M$ = Average classes per element

- **Worst Case:**
  When all elements contain utility classes and must be processed:
  $$\mathcal{O}(N \times M)$$

- **Practical Case:**
  In real-world applications, $M$ is typically small (3–10 classes per element) and acts as a constant factor. Therefore:
  $$\mathcal{O}(N)$$

**Effective Time Complexity: `O(N)`**  
Linear runtime with respect to DOM size, ensuring the engine scales well even with larger documents.

---

## Project Structure

```text
chai_tailwind/
├── index.html              # Root entry point with redirect/link to live demo
├── package.json            # Project manifest (type: module)
├── README.md               # Project documentation & time complexity analysis
├── demo/
│   ├── style.css           # Base styles for demo
│   ├── tester.html         # Test playground for utility classes
│   └── d1/
│       ├── index.html      # ChaiCode hero section demo
│       └── assets/         # Demo image & gif assets
└── src/
    ├── main.js             # Entry point (initializes engine & observer)
    ├── engine.js           # Core processing logic & DOM styling
    ├── observer.js         # MutationObserver for dynamic elements
    ├── parser.js           # Class name parser
    ├── resolver.js         # Value resolution (presets & arbitrary values)
    ├── rules.js            # Static and dynamic utility rules
    └── constants/
        ├── color.js        # Color palette definitions
        └── spacing.js      # Spacing scale & font size mappings
```

---

## How to Run Locally

Because the project uses ES Modules (`import`/`export`), it needs to be served over HTTP:

1. Clone the repository:
   ```bash
   git clone https://github.com/dev-ops-om/chai_tailwind.git
   cd chai_tailwind
   ```
2. Start any local static server:
   ```bash
   # Using npx serve:
   npx serve .

   # Or using Python:
   python -m http.server 8000
   ```
3. Open `http://localhost:8000/demo/d1/index.html` in your browser.
