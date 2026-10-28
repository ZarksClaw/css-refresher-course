# CSS Refresher Course

A practical interactive refresher with **23 chapters, 183 learning steps, 125 quiz
questions, and 23 editable practice labs with worked solutions**. Learn the
fundamentals, challenge common layout assumptions, and build a responsive dashboard.

No build tools, third-party runtime dependencies, remote fonts, or network requests
are needed to use the course. Open `index.html`, or serve the repository:

```bash
python3 -m http.server 8080
```

Visit http://localhost:8080. Use a current browser; modern-feature support must
still be checked against your own project's browser targets. The automated suite
runs in Chromium and Firefox, not every released browser version.

## Study workflow

1. Search by title, topic, or learning goal; filter Foundations or Engineering.
2. Read the goals, examples, and prediction questions.
3. At each practice lab, inspect the fixed HTML and write CSS in the editor.
4. Choose **Apply CSS**, resize the preview, and test your assumptions. The width
   slider changes the iframe viewport, affecting media queries and available
   container space. The frame has a fixed height and can scroll locally.
5. Open **Show worked solution** when ready. **Apply worked solution** loads that
   CSS into the editor. **Reset editor** restores the starter without clearing
   course progress. Edits are temporary and are discarded when you leave the step.
6. Complete the knowledge check. At least 60% is required; explanations appear on
   submission, and quizzes can be retried after failing or passing.
7. Review the [dashboard capstone](examples/dashboard/index.html) and its checklist.

Allow about 25 minutes per Foundations chapter and 35 per Engineering chapter,
plus additional practice time. These are estimates. Any chapter can be opened from
the dashboard, and later steps unlock as you work within it. Use the lesson outline
to revisit unlocked material.

Practice is self-assessed. A quiz pass does not prove that an exercise is complete,
and the editor does not grade arbitrary CSS or report every invalid declaration.
Browsers can silently ignore invalid CSS; use DevTools to investigate the result.

## Preview behavior

Each lab uses a separate sandboxed `srcdoc` iframe. It has an opaque origin,
script execution disabled, and a Content Security Policy blocking external assets,
connections, fonts, images, and form submissions. The HTML is repository-authored
and fixed; only CSS is editable. Course layout and progress are outside the frame.
This is a local teaching tool, not a general-purpose service for executing untrusted
web applications.

Every preview supplies a small documented baseline: border-box for all boxes,
16px system font, body padding of 16px, white background, and inherited control
fonts. A solution can explicitly override those defaults. Code blocks are escaped
before being inserted into lesson HTML, so selectors and markup display literally.

## Progress

Progress is stored in the browser for that origin. A different hostname, port, or
browser has separate storage. Upgrading from the original course retains completed
original lesson positions, but expanded quizzes must be passed again. Reset clears
saved progress and in-memory question answers. If browser storage is blocked,
progress remains usable for the current session and a notice explains the limit.

## Foundations

| # | Chapter | Added depth |
|---|---------|-------------|
| 1 | CSS Basics | Cascade stages, layers, inheritance, reset keywords |
| 2 | Box Model | Actual sizing constraints, negative/collapsed margins, flow-root |
| 3 | Colors & Typography | Alpha vs opacity, readable measure, font fallback |
| 4 | Display & Position | Containing blocks, interaction vs visibility, stacking |
| 5 | Flexbox | Automatic minimums, weighted shrink, source-order concerns |
| 6 | CSS Grid | Intrinsic track minimums, overflow, explicit/implicit tracks |
| 7 | Responsive Design | Content-driven breakpoints, units, zoom, viewport changes |
| 8 | Transitions & Animations | Reduced motion, animation state, measured rendering costs |
| 9 | Pseudo-classes & Pseudo-elements | Semantic states, focus, generated content limits |
| 10 | CSS Variables & Functions | Computed-value invalidation, numeric types, fallback behavior |
| 11 | Modern CSS | :has, native nesting, query prerequisites, subgrid, ratios |

## Engineering

| # | Chapter | Practical outcome |
|---|---------|-------------------|
| 12 | Cascade Layers & Specificity | Resolve layer precedence and important reversal predictably |
| 13 | Intrinsic Sizing & Overflow | Fix actual constraints and choose wrapping, scrolling, or clipping |
| 14 | Container Queries & Subgrid | Adapt reusable components to placement and shared tracks |
| 15 | Design Tokens & Theming | Separate semantic roles, theme scopes, and typed registration |
| 16 | Accessible Interaction & Forms | Preserve labels, focus, error meaning, and native behavior |
| 17 | Typography & International Layout | Handle RTL, logical axes, text growth, and zoom |
| 18 | Images, Ratios & Visual Effects | Preserve image geometry and separate decoration from information |
| 19 | Scrolling, Sticky & Stacking | Diagnose contexts and preserve focus/anchor access |
| 20 | Progressive Enhancement & Feature Queries | Keep a usable baseline and verify output contexts |
| 21 | CSS Architecture & DevTools | Define component contracts and investigate computed/used behavior |
| 22 | Performance, Motion & Verification | Measure rendering and test preferences and layout outcomes |
| 23 | Capstone: Responsive Project Dashboard | Combine the course into a standalone static interface |

## Capstone

[Open the dashboard](examples/dashboard/index.html) or read its
[behavior and review checklist](examples/dashboard/README.md). It uses semantic
HTML, local CSS, theme roles, Grid/Flexbox, container queries, a skip link, labeled
controls, preference queries, and print styles. No external assets or scripts.

The example data and form are **static**. The page does not filter, save, or fetch
real project data. Its purpose is CSS layout and state styling, with those limits
visible in the interface.

## Maintainer checks

Viewing the course requires no development tools. Data/progress/preview-document
checks require Node.js 22+:

```bash
node --test tests/*.test.js
```

Browser verification uses a development-only Playwright installation:

```bash
npm install --no-save --package-lock=false playwright
npx playwright install chromium firefox
node tests/browser-smoke.cjs
BROWSER=firefox node tests/browser-smoke.cjs
```

On PowerShell set `$env:BROWSER='firefox'` before running the second command.
GitHub Actions runs the Node checks and a Chromium/Firefox browser matrix. Browser
checks traverse all chapters and quizzes, apply all 23 worked lab styles and inspect
selected computed results, exercise the width control, fail/retry a quiz, reload
progress, reset, search/filter, and check small-screen fit. The dashboard is checked
at 320, 390, 768, and 1280px plus dark/reduced-motion, keyboard, and print states.
CI screenshots are uploaded as review artifacts.

This is targeted evidence, not exhaustive CSS validation or accessibility
certification. Some tests inspect computed declarations; broader layout assertions
and manual review complement them. Original introductory fragments are not treated
as complete applications. No public-network API is required by the course tests.

## Content maintenance

- `js/chapters.js`: original chapters and correctness fixes.
- `js/course-content.js`: expanded content, learning goals, new chapters, and lab
  fixtures with expected computed properties.
- `js/playground.js`: sandbox document generation and editor controls.
- `js/app.js`, `js/quiz.js`, `js/tracker.js`: UI, assessments, revision-aware progress.
- `tests/`: structure/progress/preview tests and browser verification.
- `docs/course-review.md`: review findings and verification boundaries.

Keep stable chapter IDs, append lessons to preserve saved positions, and increment
a chapter's revision when assessment requirements change. Reordering existing steps
requires an explicit migration. Repository-authored lesson HTML is trusted content;
it is not a renderer for arbitrary user-authored HTML.

## Primary references

- [W3C CSS specifications](https://www.w3.org/Style/CSS/current-work)
- [CSS Cascading and Inheritance Level 5](https://www.w3.org/TR/css-cascade-5/)
- [CSS Sizing Level 3](https://www.w3.org/TR/css-sizing-3/)
- [CSS Containment Level 3](https://www.w3.org/TR/css-contain-3/)
- [WAI forms tutorial](https://www.w3.org/WAI/tutorials/forms/)
- [WAI reflow guidance](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
