# CSS course review and expansion

The original course has a useful dependency-free browser format with immediate
feedback and local progress. This change preserves it and expands the curriculum
from 11 to 23 chapters, with deeper explanations and an editable lab in each chapter.

## Findings addressed

| Finding | Correction or enhancement |
|---------|---------------------------|
| Short definitions with no hands-on feedback | Added goals, practical edge cases, editable isolated previews, and worked solutions |
| No standalone integrated example | Added a responsive static dashboard with explicit functional limits |
| Cascade described as importance/specificity/source order only | Added origins, layer order, important reversal, and scoped-resolution context |
| important said to override everything | Corrected the priority model and transition/origin exceptions |
| Duplicate correct “Cascading” quiz options | Replaced the duplicate distractor |
| initial described as a browser default and unset as preventing inheritance | Explained specification initial values, inherited properties, and revert keywords |
| Universal selectors called inherently slow | Replaced folklore with measurement-based guidance |
| Margin collapse presented as unconditional maximum arithmetic | Scoped positive adjoining block-flow examples and added negative/context rules |
| Alpha claimed exclusive to legacy rgba/hsla | Added slash-alpha rgb/hsl and alpha hex distinctions |
| Inline sizing explanation ignored replaced elements | Scoped the rule to non-replaced inline boxes |
| Absolute/fixed/sticky explanations were unconditional | Added containing-block and scroll-context qualifications |
| z-index denied on every static box | Distinguished ordinary static boxes from flex/grid items |
| Flex equal sizing/shrink presented without constraints | Added basis, weighted shrink, minimum-size, and definite-size assumptions |
| Visual order described as having no accessibility impact | Explained reading/tab-order mismatch |
| auto-fit/auto-fill tracks called implicit | Corrected explicit repetition vs implicit placement |
| fr claimed to prevent overflow | Added intrinsic minimum sizing and child overflow policies |
| Grid span assessment included ambiguous equivalent answers | Made the line/track distinction explicit |
| em always described relative to parent font size | Distinguished font-size from most other length properties |
| pointer:coarse equated to touch device | Clarified primary pointer capability rather than device category |
| display animation and compositor behavior described absolutely | Added progressive discrete-transition context and measured rendering guidance |
| will-change recommended without limits | Added targeted use and resource/context tradeoffs |
| invalid-state question had another plausible selector answer | Replaced the overlapping distractor |
| :where explanation contradicted its zero-specificity answer | Corrected the entire-selector vs outside-selector distinction |
| aspect-ratio presented as an unconditional size constraint | Explained preferred ratios and explicit/min/max constraints |
| var fallback implied wrong-type values always recover | Added invalid-at-computed-value behavior |
| HTML-like selector text disappeared in options | Escaped literal markup examples |
| Reset retained in-memory answers | Clear session state with saved progress |
| Larger course lacked discovery/navigation | Added search, tracks, unlocked outlines, goals, and accessible card buttons |
| Existing quiz passes ignored expanded content | Added revision-aware invalidation while retaining original positions |
| Storage failures could interrupt learning | Added session fallback and a visible notice |

## Verification scope

Node tests verify curriculum shape, answer indexes/uniqueness, labs, progression,
legacy migration, storage fallback, reset, and restrictive preview-document generation.
The browser suite exercises every chapter/quiz and applies every worked lab style
against selected computed expectations. It also checks preview width controls and
capstone fit, preferences, keyboard behavior, and print declarations in Chromium
and Firefox through CI.

The capstone is static: form/data persistence and real filtering are not implemented
and are not advertised. CSS edits are temporary and self-assessed. The preview blocks
scripts and network assets and uses fixed repository-authored HTML. These checks
are targeted evidence, not an exhaustive CSS parser, full accessibility audit,
performance benchmark, or support guarantee for all browsers and devices.
