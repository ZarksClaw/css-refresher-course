const CHAPTERS = [
  // =====================================================================
  // CHAPTER 1 — CSS Basics
  // =====================================================================
  {
    id: 1,
    title: "CSS Basics",
    description: "Selectors, properties, cascade, specificity, and how to include CSS in HTML.",
    steps: [
      {
        type: "lesson",
        content: `<p><strong>CSS</strong> (Cascading Style Sheets) controls the presentation of HTML. The "cascading" part refers to how conflicting rules are resolved.</p>
<p><strong>Basic syntax:</strong></p>
<div class="code-block">
selector {
  property: value;
}
</div>
<p><strong>Three ways to include CSS:</strong></p>
<ul>
  <li><strong>External</strong> — <code>&lt;link rel="stylesheet" href="style.css"&gt;</code> (best practice)</li>
  <li><strong>Internal</strong> — <code>&lt;style&gt;</code> block in <code>&lt;head&gt;</code></li>
  <li><strong>Inline</strong> — <code>style="color: red"</code> attribute (highest specificity, avoid)</li>
</ul>`
      },
      {
        type: "question",
        question: "Which method of including CSS is considered best practice?",
        options: [
          "Inline styles",
          "Internal style block",
          "External stylesheet linked via &lt;link&gt;",
          "JavaScript injection"
        ],
        correct: 2,
        explanation: "External stylesheets are best practice — they separate content from presentation, can be cached by the browser, and apply to multiple pages."
      },
      {
        type: "lesson",
        content: `<p><strong>Selectors</strong> — patterns that target elements:</p>
<div class="code-block">
<span class="comment">/* Element selector */</span>
p { color: blue; }

<span class="comment">/* Class selector */</span>
.card { border: 1px solid gray; }

<span class="comment">/* ID selector */</span>
#header { height: 60px; }

<span class="comment">/* Multiple selectors */</span>
h1, h2, h3 { font-family: sans-serif; }

<span class="comment">/* Descendant combinator */</span>
article p { line-height: 1.6; }
</div>`
      },
      {
        type: "question",
        question: "Which selector targets elements with a specific class attribute?",
        options: ["#class", ".class", "*class", "class"],
        correct: 1,
        explanation: "A dot (.) prefix selects by class. # selects by ID, * is universal, and bare name selects element type."
      },
      {
        type: "lesson",
        content: `<p><strong>The Cascade</strong> — conflicting declarations are sorted through multiple stages. For ordinary author rules, first check origin/importance and layers, then specificity, scope proximity where relevant, and source order:</p>
<ol>
  <li><strong>Importance</strong> — <code>!important</code> changes cascade priority; user/UA important styles and active transitions can outrank author important declarations</li>
  <li><strong>Specificity</strong> — inline > ID > class/attribute/pseudo-class > element/pseudo-element</li>
  <li><strong>Source order</strong> — later rules override earlier ones when specificity ties</li>
</ol>
<p><strong>Specificity calculator:</strong> count (inline, #id, .class, element)</p>
<div class="code-block">
<span class="comment">/* Specificity: 0, 1, 0, 1 */</span>
#nav a { color: blue; }

<span class="comment">/* Specificity: 0, 0, 2, 0 — loses to above */</span>
.nav .link { color: red; }
</div>`
      },
      {
        type: "question",
        question: "What is the specificity of <code>#header .nav a</code>?",
        options: ["0,1,1,1", "0,0,1,1", "0,1,0,1", "0,1,1,0"],
        correct: 0,
        explanation: "One ID (#header), one class (.nav), one element (a) = 0,1,1,1. Specificity is (inline, IDs, classes, elements)."
      },
      {
        type: "lesson",
        content: `<p><strong>Inheritance</strong> — some properties are inherited from parent to child:</p>
<ul>
  <li><strong>Inherited:</strong> <code>color</code>, <code>font-*</code>, <code>line-height</code>, <code>text-align</code>, <code>visibility</code></li>
  <li><strong>Not inherited:</strong> <code>margin</code>, <code>padding</code>, <code>border</code>, <code>background</code>, <code>width</code>, <code>height</code></li>
</ul>
<p><code>inherit</code> takes the parent value. <code>initial</code> uses the property’s specification initial value. <code>unset</code> inherits inherited properties and otherwise uses initial; it does not always prevent inheritance.</p>`
      },
      {
        type: "question",
        question: "Which property IS inherited by default?",
        options: ["margin", "border", "color", "background"],
        correct: 2,
        explanation: "color is inherited — child elements get the parent's text color. margin, border, and background are not inherited."
      }
    ],
    quiz: [
      { question: "What does the 'C' in CSS stand for?", options: ["Cascading", "Combined", "Class-based", "Computed"], correct: 0, explanation: "CSS = Cascading Style Sheets. The cascade is how conflicting rules are resolved." },
      { question: "Which selector has the highest specificity?", options: ["Element selector", "Class selector", "ID selector", "Universal selector"], correct: 2, explanation: "ID selectors (#id) have higher specificity than class/attribute/pseudo-class selectors." },
      { question: "What does <code>!important</code> do?", options: ["Makes a rule important to read", "Marks a declaration as important within the cascade", "Increases specificity", "Prevents inheritance"], correct: 1, explanation: "!important changes priority; it does not add selector specificity or guarantee victory over every origin, layer, or active transition." },
      { question: "Which element selector matches all elements?", options: ["#", ".", "*", "~"], correct: 2, explanation: "The universal selector matches every element and adds zero specificity. Measure real performance instead of assuming a selector is inherently slow." },
      { question: "What keyword forces a property to inherit from its parent?", options: ["initial", "inherit", "unset", "revert"], correct: 1, explanation: "inherit forces inheritance. initial uses the specification initial value, which is not necessarily a user-agent stylesheet default. unset inherits if the property normally inherits, otherwise uses initial." }
    ]
  },

  // =====================================================================
  // CHAPTER 2 — Box Model
  // =====================================================================
  {
    id: 2,
    title: "Box Model",
    description: "Content, padding, border, margin, and the all-important box-sizing property.",
    steps: [
      {
        type: "lesson",
        content: `<p>Every element in CSS is a rectangular box. The <strong>box model</strong> consists of four layers (inside → out):</p>
<ol>
  <li><strong>Content</strong> — the actual content (text, image)</li>
  <li><strong>Padding</strong> — space between content and border</li>
  <li><strong>Border</strong> — line around the padding</li>
  <li><strong>Margin</strong> — space outside the border (between elements)</li>
</ol>
<div class="code-block">
.box {
  width: 200px;
  padding: 20px;       <span class="comment">/* inside the border */</span>
  border: 2px solid black;
  margin: 10px;         <span class="comment">/* outside the border */</span>
}
</div>
<p>With <code>box-sizing: content-box</code> (default), the <code>width</code> only applies to the content. The total width = 200 + 40 + 4 = 244px.</p>`
      },
      {
        type: "question",
        question: "What is the total width of <code>.box { width: 100px; padding: 10px; border: 2px solid; }</code> with the default box-sizing?",
        options: ["100px", "110px", "114px", "124px"],
        correct: 3,
        explanation: "Default box-sizing is content-box. Total width = content (100) + padding (10+10=20) + border (2+2=4) = 124px."
      },
      {
        type: "lesson",
        content: `<p><strong>box-sizing: border-box</strong> — the modern standard. Width includes padding and border:</p>
<div class="code-block">
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 2px solid black;
}
<span class="comment">/* Total width = 200px. Content shrinks to 200 - 40 - 4 = 156px */</span>
</div>
<p>Many developers set this globally on all elements:</p>
<div class="code-block">
*, *::before, *::after {
  box-sizing: border-box;
}
</div>`
      },
      {
        type: "question",
        question: "With <code>box-sizing: border-box</code>, what does the declared <code>width</code> include?",
        options: ["Content only", "Content + padding", "Content + padding + border", "Content + padding + border + margin"],
        correct: 2,
        explanation: "border-box includes content, padding, and border in the declared width. Margin is never included in width."
      },
      {
        type: "lesson",
        content: `<p><strong>Margin collapsing</strong> — adjoining positive block margins can collapse in ordinary block flow. Flex/grid item margins do not collapse. With negative margins the calculation is different:</p>
<div class="code-block">
.box-a { margin-bottom: 30px; }
.box-b { margin-top: 20px; }
<span class="comment">/* Space between them = 30px (not 50px) */</span>
</div>
<p>Margin collapsing only affects vertical margins (<code>margin-top</code> / <code>margin-bottom</code>). Horizontal margins never collapse.</p>
<p><strong>Margin auto</strong> — centers block elements horizontally when a width is set:</p>
<div class="code-block">
.centered {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</div>`
      },
      {
        type: "question",
        question: "In ordinary horizontal block flow with adjoining collapsible positive margins, what is the gap between divs with <code>margin-bottom: 20px</code> and <code>margin-top: 30px</code>?",
        options: ["10px", "20px", "30px", "50px"],
        correct: 2,
        explanation: "For these adjoining positive margins in ordinary horizontal block flow, max(20, 30) = 30px. This is not the rule for flex/grid items or negative margins."
      },
      {
        type: "lesson",
        content: `<p><strong>Shorthand properties</strong> save typing:</p>
<div class="code-block">
<span class="comment">/* Padding / Margin: top right bottom left */</span>
padding: 10px;              <span class="comment">/* all four sides */</span>
padding: 10px 20px;         <span class="comment">/* top/bottom  left/right */</span>
padding: 10px 20px 30px;    <span class="comment">/* top  left/right  bottom */</span>
padding: 10px 20px 30px 40px; <span class="comment">/* top right bottom left (clockwise) */</span>

<span class="comment">/* Border shorthand: width style color */</span>
border: 2px dashed blue;
</div>`
      },
      {
        type: "question",
        question: "What does <code>margin: 5px 10px</code> mean?",
        options: [
          "top:5px right:10px bottom:5px left:10px",
          "top:5px right:10px bottom:10px left:5px",
          "top:5px right:5px bottom:10px left:10px",
          "all sides 5px and 10px"
        ],
        correct: 0,
        explanation: "Two values: first is top/bottom (5px), second is left/right (10px)."
      }
    ],
    quiz: [
      { question: "What is the order of the box model from inside to outside?", options: ["margin → border → padding → content", "content → padding → border → margin", "content → border → padding → margin", "padding → content → border → margin"], correct: 1, explanation: "Inside to outside: content → padding → border → margin." },
      { question: "What does <code>box-sizing: border-box</code> prevent?", options: ["Margin collapsing", "Unexpected overflow from padding/border adding to width", "Border rendering", "Inheritance"], correct: 1, explanation: "border-box makes padding and border fit inside the declared width, preventing layout surprises." },
      { question: "Do horizontal margins collapse?", options: ["Yes, always", "Only on block elements", "No, only vertical margins collapse", "Only on inline elements"], correct: 2, explanation: "Margin collapsing only applies to vertical margins (top/bottom). Horizontal margins always add up." },
      { question: "What does <code>border: 3px solid red</code> set the style to?", options: ["dashed", "dotted", "solid", "double"], correct: 2, explanation: "The border shorthand is width style color. Here style is 'solid'." },
      { question: "What is the top margin in <code>margin: 1px 2px 3px</code>?", options: ["1px", "2px", "3px", "0"], correct: 0, explanation: "Three values: top=1px, left/right=2px, bottom=3px." }
    ]
  },

  // =====================================================================
  // CHAPTER 3 — Colors & Typography
  // =====================================================================
  {
    id: 3,
    title: "Colors & Typography",
    description: "Color formats, backgrounds, font properties, text styling, and web fonts.",
    steps: [
      {
        type: "lesson",
        content: `<p><strong>Color formats</strong> in CSS:</p>
<div class="code-block">
<span class="comment">/* Named colors */</span>
color: rebeccapurple;

<span class="comment">/* Hexadecimal */</span>
color: #ff6600;          <span class="comment">/* #rgb or #rrggbb */</span>
color: #f60;             <span class="comment">/* shorthand */</span>

<span class="comment">/* RGB / RGBA */</span>
color: rgb(255, 102, 0);
color: rgba(255, 102, 0, 0.5);   <span class="comment">/* 0.5 = 50% opacity */</span>

<span class="comment">/* HSL / HSLA */</span>
color: hsl(24, 100%, 50%);        <span class="comment">/* hue, saturation, lightness */</span>
color: hsla(24, 100%, 50%, 0.5);
</div>`
      },
      {
        type: "question",
        question: "In <code>hsl(240, 100%, 50%)</code>, what does the first value (240) represent?",
        options: ["Saturation", "Lightness", "Hue (blue on the color wheel)", "Alpha"],
        correct: 2,
        explanation: "The first value in hsl() is hue (0-360 degrees on the color wheel). 240 is blue. 0=red, 120=green, 240=blue."
      },
      {
        type: "lesson",
        content: `<p><strong>Background</strong> properties:</p>
<div class="code-block">
.element {
  background-color: #f0f0f0;
  background-image: url("pattern.png");
  background-repeat: no-repeat;     <span class="comment">/* repeat, repeat-x, repeat-y */</span>
  background-position: center;      <span class="comment">/* or 50% 50% or top left */</span>
  background-size: cover;           <span class="comment">/* cover, contain, or dimensions */</span>

  <span class="comment">/* Shorthand */</span>
  background: #f0f0f0 url("img.jpg") no-repeat center / cover;
}
</div>
<p><strong>Gradients:</strong></p>
<div class="code-block">
background: linear-gradient(to right, red, blue);
background: radial-gradient(circle, yellow, orange);
</div>`
      },
      {
        type: "question",
        question: "What does <code>background-size: cover</code> do?",
        options: [
          "Shows only the center portion",
          "Scales the image to cover the entire element (may crop)",
          "Repeats the image to cover the element",
          "Makes the image transparent"
        ],
        correct: 1,
        explanation: "cover scales the image to fill the element's entire area while maintaining aspect ratio — parts may be cropped. contain fits the whole image inside."
      },
      {
        type: "lesson",
        content: `<p><strong>Font properties:</strong></p>
<div class="code-block">
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;      <span class="comment">/* or bold, 400=normal, 700=bold */</span>
  font-style: italic;    <span class="comment">/* normal, italic, oblique */</span>
  line-height: 1.6;      <span class="comment">/* unitless multiplier (best practice) */</span>

  <span class="comment">/* Shorthand: style weight size/line-height family */</span>
  font: italic 700 16px/1.6 "Helvetica Neue", sans-serif;
}
</div>
<p><strong>Text properties:</strong></p>
<div class="code-block">
text-align: center;         <span class="comment">/* left, right, center, justify */</span>
text-decoration: underline; <span class="comment">/* none, underline, line-through */</span>
text-transform: uppercase;  <span class="comment">/* uppercase, lowercase, capitalize */</span>
letter-spacing: 2px;        <span class="comment">/* character spacing */</span>
word-spacing: 4px;          <span class="comment">/* word spacing */</span>
text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
</div>`
      },
      {
        type: "question",
        question: "Why is a unitless <code>line-height</code> recommended?",
        options: [
          "It's the only valid syntax",
          "It inherits as a multiplier, scaling with font-size changes",
          "It performs better",
          "It prevents text overflow"
        ],
        correct: 1,
        explanation: "Unitless line-height (e.g., 1.6) is relative to the element's font-size. When inherited, it recalculates based on the child's font-size. A fixed unit (e.g., 24px) doesn't adapt."
      },
      {
        type: "lesson",
        content: `<p><strong>Web fonts</strong> — custom fonts via @font-face or Google Fonts:</p>
<div class="code-block">
<span class="comment">/* Google Fonts (include in HTML or @import) */</span>
@import url('https://fonts.googleapis.com/css2?family=Roboto');

body {
  font-family: 'Roboto', sans-serif;
}

<span class="comment">/* @font-face for self-hosted fonts */</span>
@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
</div>`
      },
      {
        type: "question",
        question: "Which format is preferred for modern web fonts due to better compression?",
        options: ["TTF", "OTF", "WOFF2", "EOT"],
        correct: 2,
        explanation: "WOFF2 (Web Open Font Format 2) offers the best compression and is supported in all modern browsers."
      }
    ],
    quiz: [
      { question: "Which color value includes an alpha (opacity) channel?", options: ["#ff6600", "rgb(255,102,0)", "hsl(24,100%,50%)", "hsla(24,100%,50%,0.5)"], correct: 3, explanation: "This hsla value explicitly supplies alpha. Modern rgb()/hsl() also support slash alpha, and #RGBA/#RRGGBBAA hex forms include alpha." },
      { question: "What does <code>font-weight: 400</code> correspond to?", options: ["light", "normal", "bold", "bolder"], correct: 1, explanation: "400 is normal weight. 700 is bold. Other numeric weights depend on the font’s available faces or variable-font axis; 500 commonly denotes medium and 600 semibold." },
      { question: "What does <code>background-size: contain</code> do?", options: ["Fills the element entirely, cropping if needed", "Scales the image to fit inside the element without cropping", "Repeats the image", "Stretches the image"], correct: 1, explanation: "contain scales the image to fit entirely within the element (may leave empty space). cover fills the element (may crop)." },
      { question: "Which property changes text to ALL CAPS?", options: ["text-transform: uppercase", "font-variant: all-caps", "text-decoration: uppercase", "letter-spacing: caps"], correct: 0, explanation: "text-transform: uppercase converts text to uppercase. lowercase and capitalize also use this property." },
      { question: "What is the line-height in <code>font: bold 14px/1.5 Arial</code>?", options: ["1.5 (unitless)", "14px", "bold", "Arial"], correct: 0, explanation: "The slash introduces line-height after font-size: here size=14px and line-height=1.5. Optional style/weight/variant/stretch values precede the required size and family; their order is not rigidly style then weight." }
    ]
  },

  // =====================================================================
  // CHAPTER 4 — Display & Position
  // =====================================================================
  {
    id: 4,
    title: "Display & Position",
    description: "Display modes, positioning schemes, stacking context, and z-index.",
    steps: [
      {
        type: "lesson",
        content: `<p>The <code>display</code> property determines how an element behaves in the layout:</p>
<div class="code-block">
display: block;     <span class="comment">/* full width, starts new line (div, p, h1) */</span>
display: inline;    <span class="comment">/* flows in text, no width/height (span, a) */</span>
display: inline-block; <span class="comment">/* inline but accepts width/height */</span>
display: none;      <span class="comment">/* completely removed from layout */</span>
</div>
<p><strong>Key differences:</strong></p>
<ul>
  <li><code>block</code> — respects width, height, margin; starts new line</li>
  <li><code>inline</code> — ignores width/height; respects only horizontal margin</li>
  <li><code>inline-block</code> — behaves like inline but accepts width/height</li>
  <li><code>none</code> — element not rendered (different from <code>visibility: hidden</code>)</li>
</ul>`
      },
      {
        type: "question",
        question: "Do width and height apply normally to a non-replaced inline such as span?",
        options: [
          "Yes",
          "No — inline elements ignore width and height",
          "Only with opacity: 1",
          "Only with box-sizing: border-box"
        ],
        correct: 1,
        explanation: "Non-replaced inline boxes such as ordinary span/a ignore width and height. Replaced inline elements such as images are a different case. Use <code>inline-block</code> if you need both inline flow and dimensions."
      },
      {
        type: "lesson",
        content: `<p><strong>Position</strong> — controls how an element is placed in the document:</p>
<div class="code-block">
position: static;    <span class="comment">/* default — normal flow */</span>
position: relative;  <span class="comment">/* offset from normal position */</span>
position: absolute;  <span class="comment">/* relative to nearest positioned ancestor */</span>
position: fixed;     <span class="comment">/* relative to viewport; stays on scroll */</span>
position: sticky;    <span class="comment">/* remains in flow; offset within scroll/containing-block constraints */</span>
</div>
<p><code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code> control the offset (only work with a non-static position).</p>`
      },
      {
        type: "question",
        question: "With no transform, filter, or containment exceptions, which ancestor establishes the absolute-position containing block?",
        options: [
          "Relative to the document body",
          "Relative to the nearest positioned ancestor (non-static)",
          "Relative to the viewport",
          "Relative to its normal position in the flow"
        ],
        correct: 1,
        explanation: "In the basic case, a positioned ancestor establishes the containing block. Transforms and some containment/filter properties can also establish one. If none exists, it's relative to the initial containing block (usually the viewport)."
      },
      {
        type: "lesson",
        content: `<p><strong>Centering tricks:</strong></p>
<div class="code-block">
<span class="comment">/* Horizontal center for block elements */</span>
margin: 0 auto;

<span class="comment">/* Absolute centering */</span>
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

<span class="comment">/* Flexbox centering */</span>
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
</div>`
      },
      {
        type: "lesson",
        content: `<p><strong>z-index and stacking context</strong>:</p>
<ul>
  <li><code>z-index</code> controls stacking order (higher = closer to viewer)</li>
  <li>Only works on <strong>positioned elements</strong> (non-static) and flex/grid items</li>
  <li>Elements in the same stacking context are stacked by z-index</li>
  <li>A stacking context can be created by <code>position</code>, <code>opacity &lt; 1</code>, <code>transform</code>, <code>filter</code>, etc.</li>
</ul>
<p>An element with <code>z-index: 9999</code> inside a low-z-index stacking context still stays behind elements in a higher context.</p>`
      },
      {
        type: "question",
        question: "Does z-index apply to an ordinary static box that is neither a flex nor grid item?",
        options: [
          "Yes, always",
          "No — z-index only works on positioned elements (non-static) and flex/grid items",
          "Only with position: absolute",
          "Only when paired with opacity"
        ],
        correct: 1,
        explanation: "z-index has no effect on an ordinary static box, but it can apply to static flex/grid items. It requires the element to be positioned (relative, absolute, fixed, sticky) or be a flex/grid item."
      }
    ],
    quiz: [
      { question: "Which display value removes the element from layout entirely?", options: ["visibility: hidden", "display: none", "opacity: 0", "display: hidden"], correct: 1, explanation: "display: none removes the element from the layout. visibility: hidden hides it visually but it still occupies space." },
      { question: "What's the default position value?", options: ["relative", "absolute", "static", "fixed"], correct: 2, explanation: "The default position is static — elements follow the normal document flow." },
      { question: "Without a containing-block-establishing ancestor, which positioning anchors to the viewport on scroll?", options: ["absolute", "fixed", "sticky", "static"], correct: 1, explanation: "In the absence of an ancestor that establishes a fixed-position containing block (for example with transform), position: fixed anchors to the viewport. It stays in place when the page scrolls." },
      { question: "What is the difference between sticky and fixed?", options: ["No difference", "sticky scrolls until a threshold, then acts like fixed within its parent", "fixed is relative to parent, sticky to viewport", "sticky only works on mobile"], correct: 1, explanation: "sticky acts as relative until the scroll offset reaches a threshold, then its offset is constrained by its scrollport and containing block; it does not actually become position: fixed." },
      { question: "What creates a new stacking context?", options: ["position: relative with z-index", "opacity less than 1", "transform: translateX(0)", "All of the above"], correct: 3, explanation: "Many properties create stacking contexts: positioned elements with z-index, opacity < 1, transform, filter, will-change, etc." }
    ]
  },

  // =====================================================================
  // CHAPTER 5 — Flexbox
  // =====================================================================
  {
    id: 5,
    title: "Flexbox",
    description: "Flex containers and items, main/cross axis, alignment, and sizing.",
    steps: [
      {
        type: "lesson",
        content: `<p>Flexbox is a one-dimensional layout model for distributing space and aligning items.</p>
<p><strong>Flex container</strong> — the parent:</p>
<div class="code-block">
.container {
  display: flex;          <span class="comment">/* or inline-flex */</span>
  flex-direction: row;    <span class="comment">/* row, row-reverse, column, column-reverse */</span>
  flex-wrap: wrap;        <span class="comment">/* nowrap (default), wrap, wrap-reverse */</span>
  justify-content: center; <span class="comment">/* main axis: flex-start, center, space-between, etc. */</span>
  align-items: stretch;    <span class="comment">/* cross axis: stretch, center, flex-start, flex-end */</span>
  gap: 16px;              <span class="comment">/* shorthand for row-gap and column-gap */</span>
}
</div>`
      },
      {
        type: "question",
        question: "What does <code>justify-content: space-between</code> do?",
        options: [
          "Centers items with equal space around them",
          "Distributes items with equal space between them (first and last touch edges)",
          "Stretches items to fill the container",
          "Pushes items to the right"
        ],
        correct: 1,
        explanation: "space-between puts the first item at the start, last at the end, and equal space between each pair. space-around gives equal space around each item."
      },
      {
        type: "lesson",
        content: `<p><strong>Flex items</strong> — children of the flex container:</p>
<div class="code-block">
.item {
  flex-grow: 1;      <span class="comment">/* 0 = don't grow; 1 = grow equally */</span>
  flex-shrink: 1;    <span class="comment">/* shrinking is weighted by shrink factor times flex base size */</span>
  flex-basis: auto;  <span class="comment">/* starting size before growing/shrinking */</span>

  <span class="comment">/* Shorthand: grow shrink basis */</span>
  flex: 1 1 0;       <span class="comment">/* grow, shrink, basis */</span>
  flex: 1;           <span class="comment">/* browsers expand to 1 1 0%; constraints still matter */</span>

  align-self: center; <span class="comment">/* override align-items for this item */</span>
  order: -1;          <span class="comment">/* reorder items (default 0) */</span>
}
</div>`
      },
      {
        type: "question",
        question: "In a definite 600px flex row with no gaps, padding, borders, or minimum-size constraints, how wide are three equal flex: 1 items?",
        options: ["100px", "200px", "300px", "Depends on content"],
        correct: 1,
        explanation: "flex: 1 means flex-grow: 1, flex-shrink: 1, flex-basis: 0. Under the stated definite-size and unconstrained conditions, 600px / 3 = 200px each. Automatic minimum sizes or content can change the result."
      },
      {
        type: "lesson",
        content: `<p><strong>Main axis vs cross axis</strong> — determined by <code>flex-direction</code>:</p>
<ul>
  <li><code>flex-direction: row</code> → main = horizontal, cross = vertical</li>
  <li><code>flex-direction: column</code> → main = vertical, cross = horizontal</li>
</ul>
<div class="code-block">
<span class="comment">/* Main axis alignment */</span>
justify-content: center;    <span class="comment">/* along flex-direction */</span>

<span class="comment">/* Cross axis alignment */</span>
align-items: center;        <span class="comment">/* perpendicular to flex-direction */</span>

<span class="comment">/* Multi-line alignment */</span>
align-content: center;      <span class="comment">/* when flex-wrap causes multiple lines */</span>
</div>`
      },
      {
        type: "question",
        question: "In a column-direction flex container, what does <code>justify-content</code> control?",
        options: ["Horizontal alignment", "Vertical alignment", "Diagonal alignment", "Cross axis alignment"],
        correct: 1,
        explanation: "In a column layout, the main axis is vertical, so justify-content controls vertical alignment. align-items controls horizontal (cross axis)."
      },
      {
        type: "lesson",
        content: `<p><strong>Common layout patterns:</strong></p>
<div class="code-block">
<span class="comment">/* Navbar: logo left, links right */</span>
.nav { display: flex; justify-content: space-between; }

<span class="comment">/* Centered card */</span>
.centered { display: flex; justify-content: center; align-items: center; }

<span class="comment">/* Equal-height columns */</span>
.columns { display: flex; gap: 20px; }
.column { flex: 1; }   <span class="comment">/* all equal width */</span>

<span class="comment">/* Sticky footer */</span>
body { display: flex; flex-direction: column; min-height: 100vh; }
main { flex: 1; }       <span class="comment">/* grows to push footer down */</span>
</div>`
      },
      {
        type: "question",
        question: "How do you make a flex item not shrink below its content size?",
        options: ["flex-shrink: 0", "flex-grow: 0", "flex-basis: auto", "width: min-content"],
        correct: 0,
        explanation: "flex-shrink: 0 prevents the item from shrinking. It will still wrap if flex-wrap is enabled, but won't compress below its content size."
      }
    ],
    quiz: [
      { question: "Which property distributes space along the main axis?", options: ["align-items", "justify-content", "align-content", "gap"], correct: 1, explanation: "justify-content controls distribution along the main axis. align-items controls the cross axis." },
      { question: "What does <code>flex: 1</code> expand to?", options: ["flex: 1 0 auto", "flex: 1 1 0%", "flex: 0 1 1", "flex: 1 0 0"], correct: 1, explanation: "In browsers, flex: 1 expands to grow 1, shrink 1, basis 0%. In a definite main size it commonly behaves like a zero basis; intrinsic minimums still apply. The item will grow/shrink from 0." },
      { question: "Which shorthand sets row-gap and column-gap?", options: ["gap", "margin", "space", "row-spacing"], correct: 0, explanation: "The <code>gap</code> property (formerly grid-gap) works in both Flexbox and Grid. It adds space between items without affecting edges." },
      { question: "What does <code>align-items: stretch</code> do?", options: ["Stretches items to the width of the container", "Stretches items to fill the cross axis", "Makes items full height", "Stretches text"], correct: 1, explanation: "align-items: stretch (the default) stretches items along the cross axis to fill the container's height (row) or width (column)." },
      { question: "Can you reorder flex items visually without changing HTML?", options: ["No", "Yes, with the order property", "Only with JavaScript", "Only on mobile"], correct: 1, explanation: "The <code>order</code> property (default 0) reorders flex items visually. Lower values come first. This does not update DOM reading/tab order and can create an accessibility mismatch; keep meaningful source order." }
    ]
  },

  // =====================================================================
  // CHAPTER 6 — CSS Grid
  // =====================================================================
  {
    id: 6,
    title: "CSS Grid",
    description: "Grid containers, tracks, areas, the fr unit, and alignment.",
    steps: [
      {
        type: "lesson",
        content: `<p>CSS Grid is a <strong>two-dimensional</strong> layout system (rows and columns simultaneously).</p>
<p><strong>Basic grid container:</strong></p>
<div class="code-block">
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;  <span class="comment">/* three columns */</span>
  grid-template-rows: auto 200px;          <span class="comment">/* two rows */</span>
  gap: 16px;                              <span class="comment">/* row-gap column-gap */</span>
}
</div>
<p>The <code>fr</code> unit distributes available space proportionally — like flex-grow for Grid.</p>`
      },
      {
        type: "question",
        question: "What does <code>1fr</code> mean in CSS Grid?",
        options: [
          "One frame per second",
          "One fraction of the available space",
          "One fixed row",
          "One flex-row"
        ],
        correct: 1,
        explanation: "fr = fraction. It distributes available space proportionally. <code>grid-template-columns: 1fr 2fr</code> gives the second column twice the space of the first."
      },
      {
        type: "lesson",
        content: `<p><strong>Repeat and minmax:</strong></p>
<div class="code-block">
<span class="comment">/* 3 equal columns */</span>
grid-template-columns: repeat(3, 1fr);

<span class="comment">/* Flexible columns: min 200px, max 1fr */</span>
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

<span class="comment">/* Explicit tracks */</span>
grid-template-columns: [start] 1fr [middle] 2fr [end];
</div>
<p><code>auto-fit</code> and <code>auto-fill</code> repeat tracks in the explicit grid; placement beyond that grid can create implicit tracks. <code>auto-fit</code> collapses empty tracks, <code>auto-fill</code> preserves them.</p>`
      },
      {
        type: "question",
        question: "What does <code>repeat(auto-fit, minmax(250px, 1fr))</code> do?",
        options: [
          "Creates exactly 3 columns of 250px each",
          "Creates as many 250px-minimum columns as fit, growing to fill space",
          "Creates a single flexible column",
          "Creates fixed-width columns that don't wrap"
        ],
        correct: 1,
        explanation: "auto-fit creates as many tracks as fit the container. Each is at least 250px but stretches to 1fr if space allows. This is the classic responsive grid pattern."
      },
      {
        type: "lesson",
        content: `<p><strong>Placing items:</strong></p>
<div class="code-block">
<span class="comment">/* On the grid container */</span>
.grid {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 200px;
}

<span class="comment">/* On grid items — line numbers start at 1 */</span>
.item1 {
  grid-column: 1 / 3;   <span class="comment">/* span from column line 1 to 3 */</span>
  grid-row: 1 / 2;       <span class="comment">/* span row 1 */</span>
}

<span class="comment">/* Span shorthand */</span>
.item2 {
  grid-column: span 2;  <span class="comment">/* span 2 columns */</span>
}
</div>`
      },
      {
        type: "lesson",
        content: `<p><strong>Grid template areas</strong> — the most readable way to define layouts:</p>
<div class="code-block">
.grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 16px;
}

header { grid-area: header; }
aside  { grid-area: sidebar; }
main   { grid-area: main; }
footer { grid-area: footer; }
</div>`
      },
      {
        type: "question",
        question: "What character separates cells in <code>grid-template-areas</code>?",
        options: [
          "Commas between cells",
          "Spaces for cells in the same row, quotes for rows",
          "Semicolons between rows",
          "Slash for row breaks"
        ],
        correct: 1,
        explanation: "Each string is a row. Spaces separate cells within the row. The period (.) creates an empty cell."
      },
      {
        type: "lesson",
        content: `<p><strong>Alignment in Grid:</strong></p>
<div class="code-block">
<span class="comment">/* On the container — aligns items within their grid areas */</span>
justify-items: center;     <span class="comment">/* horizontal (row axis) */</span>
align-items: center;       <span class="comment">/* vertical (column axis) */</span>

<span class="comment">/* On the container — aligns the entire grid within its container */</span>
justify-content: center;   <span class="comment">/* horizontal */</span>
align-content: center;     <span class="comment">/* vertical */</span>

<span class="comment">/* On individual items — overrides align-items */</span>
align-self: end;
justify-self: stretch;
</div>`
      },
      {
        type: "question",
        question: "What's the difference between <code>justify-items</code> and <code>justify-content</code> in Grid?",
        options: [
          "They are the same",
          "justify-items aligns items inside their cells; justify-content aligns the grid within the container",
          "justify-content aligns items; justify-items aligns the grid",
          "justify-items only works with flexbox"
        ],
        correct: 1,
        explanation: "justify-items (and align-items) position items within their assigned grid area. justify-content (and align-content) position the entire grid when there's extra space in the container."
      }
    ],
    quiz: [
      { question: "Which unit distributes available space proportionally in Grid?", options: ["%", "vw", "fr", "em"], correct: 2, explanation: "The fr (fraction) unit distributes leftover space. It allocates remaining space after gaps, but automatic minimums and oversized content can still cause overflow." },
      { question: "What does <code>grid-column: 1 / 3</code> mean?", options: ["Item spans from column line 1 to line 3", "Item spans three columns", "Item occupies only column 3", "Item starts at line 3"], correct: 0, explanation: "Grid lines are 1-indexed. 1 / 3 spans across lines 1, 2, and 3 — meaning columns 1 and 2." },
      { question: "How do you create an empty cell in grid-template-areas?", options: ["Leave it blank", "Use a period (.)", "Use null", "Use 'empty'"], correct: 1, explanation: "A period (.) in grid-template-areas represents an empty cell. Multiple dots like ... can be used." },
      { question: "What does <code>auto-fit</code> do in repeat(auto-fit, minmax(...))?", options: ["Fits the container to the content", "Creates as many tracks as fit, collapsing empty ones", "Fits the grid to one column", "Creates fixed tracks"], correct: 1, explanation: "auto-fit creates tracks to fill the container but collapses any empty ones to 0 width. auto-fill keeps empty tracks at their min size." },
      { question: "Which is better for a page-wide layout with header, sidebar, main, and footer?", options: ["Flexbox", "CSS Grid", "Float", "Inline-block"], correct: 1, explanation: "CSS Grid excels at two-dimensional layouts like the classic page chrome. Flexbox is better for one-dimensional layouts along a single axis." }
    ]
  },

  // =====================================================================
  // CHAPTER 7 — Responsive Design
  // =====================================================================
  {
    id: 7,
    title: "Responsive Design",
    description: "Media queries, mobile-first, responsive units, and breakpoints.",
    steps: [
      {
        type: "lesson",
        content: `<p><strong>Responsive design</strong> ensures pages work on all screen sizes. The three core ingredients are:</p>
<ul>
  <li><strong>Fluid grids</strong> — use relative units (%, fr, vw) instead of fixed px</li>
  <li><strong>Flexible images</strong> — <code>max-width: 100%</code> on images</li>
  <li><strong>Media queries</strong> — apply styles based on screen width</li>
</ul>
<div class="code-block">
<span class="comment">/* Mobile-first: base styles for small screens */</span>
body { font-size: 16px; }
.sidebar { display: none; }

<span class="comment">/* Tablet and up */</span>
@media (min-width: 768px) {
  body { font-size: 18px; }
  .sidebar { display: block; }
}
</div>`
      },
      {
        type: "question",
        question: "What is the mobile-first approach?",
        options: [
          "Design for mobile first, then add features for larger screens",
          "Design for desktop first, then scale down",
          "Only design for mobile",
          "Use JavaScript to detect devices"
        ],
        correct: 0,
        explanation: "Mobile-first means writing base styles for small screens, then using min-width media queries to enhance for larger screens. It's easier to add complexity than remove it."
      },
      {
        type: "lesson",
        content: `<p><strong>Common breakpoints</strong> — based on content, not devices:</p>
<div class="code-block">
<span class="comment">/* Small / mobile:   default (320px+) */</span>

<span class="comment">/* Medium / tablet:  768px+ */</span>
@media (min-width: 768px) { ... }

<span class="comment">/* Large / desktop:  1024px+ */</span>
@media (min-width: 1024px) { ... }

<span class="comment">/* Extra large:      1280px+ */</span>
@media (min-width: 1280px) { ... }
</div>
<p><strong>Other media query features:</strong></p>
<ul>
  <li><code>@media (prefers-color-scheme: dark)</code> — dark mode</li>
  <li><code>@media (prefers-reduced-motion: no-preference)</code> — animation preference</li>
  <li><code>@media (orientation: portrait)</code> — screen orientation</li>
  <li><code>@media (pointer: coarse)</code> — primary pointing device is coarse; not a guarantee that all input is touch</li>
</ul>`
      },
      {
        type: "question",
        question: "Which media feature detects if the user prefers dark mode?",
        options: ["@media (dark-mode: true)", "@media (prefers-color-scheme: dark)", "@media (theme: dark)", "@media (color-scheme: dark)"],
        correct: 1,
        explanation: "prefers-color-scheme detects the user's OS-level light/dark mode preference. Values: light, dark."
      },
      {
        type: "lesson",
        content: `<p><strong>Responsive units:</strong></p>
<ul>
  <li><code>%</code> — relative to parent</li>
  <li><code>em</code> — on font-size, relative to the inherited font size; on most other lengths, the element’s own computed font size</li>
  <li><code>rem</code> — relative to root (<code>html</code>) font-size (16px by default)</li>
  <li><code>vw</code> — 1% of viewport width</li>
  <li><code>vh</code> — 1% of viewport height</li>
  <li><code>clamp(min, preferred, max)</code> — clamps a value between min and max</li>
</ul>
<div class="code-block">
<span class="comment">/* Fluid typography: never smaller than 1rem, never larger than 3rem */</span>
font-size: clamp(1rem, 2.5vw, 3rem);

<span class="comment">/* Full viewport height */</span>
.hero { height: 100vh; }

<span class="comment">/* Responsive padding */</span>
padding: 1rem 5%;
</div>`
      },
      {
        type: "question",
        question: "What does <code>clamp(1rem, 2vw, 3rem)</code> do?",
        options: [
          "Keeps the value at 2vw, capped between 1rem and 3rem",
          "Creates a random value between 1rem and 3rem",
          "Clamps to 1rem on all screen sizes",
          "Sets the value to exactly 2vw"
        ],
        correct: 0,
        explanation: "clamp() sets a preferred value (2vw) but prevents it from going below the minimum (1rem) or above the maximum (3rem)."
      },
      {
        type: "lesson",
        content: `<p><strong>Responsive images and typography:</strong></p>
<div class="code-block">
<span class="comment">/* Images that never overflow */</span>
img { max-width: 100%; height: auto; }

<span class="comment">/* Fluid typography scale */</span>
h1 { font-size: clamp(1.75rem, 4vw, 3rem); }
p  { font-size: clamp(1rem, 2vw, 1.25rem); }

<span class="comment">/* Viewport meta tag (required for responsive) */</span>
<span class="comment">&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</span>
</div>
<p>The viewport meta tag tells mobile browsers not to scale the page down. Without it, media queries won't work correctly on mobile.</p>`
      },
      {
        type: "question",
        question: "Why is the viewport meta tag essential for responsive design?",
        options: [
          "It improves SEO",
          "It prevents mobile browsers from scaling the page to a virtual width",
          "It enables media queries",
          "It loads responsive images"
        ],
        correct: 1,
        explanation: "Without the viewport meta tag, mobile browsers render the page at a typical desktop width (980px) and then scale it down, making media queries ineffective."
      }
    ],
    quiz: [
      { question: "Which unit is relative to the root element's font-size?", options: ["em", "rem", "vw", "%"], correct: 1, explanation: "rem is relative to the root (&lt;html&gt;) font-size. On font-size, em uses the inherited size; on most other lengths it uses the element’s own computed font size." },
      { question: "What does <code>@media (min-width: 768px)</code> target?", options: ["Screens narrower than 768px", "Screens wider than or equal to 768px", "Exactly 768px wide screens", "Print media"], correct: 1, explanation: "min-width targets widths ABOVE the breakpoint. max-width targets widths BELOW." },
      { question: "What does <code>100vw</code> represent?", options: ["100% of the parent's width", "100% of the viewport width (including scrollbar)", "100 pixels wide", "100% of the document width"], correct: 1, explanation: "vw is viewport width. 100vw = full viewport width, including the scrollbar. This can cause horizontal overflow." },
      { question: "Which CSS feature most helps avoid fixed breakpoints?", options: ["Media queries", "clamp() and minmax()", "!important", "Inline styles"], correct: 1, explanation: "clamp() for typography and minmax() for grids create fluid, continuous scaling without rigid breakpoints." },
      { question: "How do you make an image responsive so it never overflows?", options: ["width: 100%", "max-width: 100%", "width: auto", "max-width: 100vw"], correct: 1, explanation: "max-width: 100% prevents the image from exceeding its container's width while not forcing small images to stretch." }
    ]
  },

  // =====================================================================
  // CHAPTER 8 — Transitions & Animations
  // =====================================================================
  {
    id: 8,
    title: "Transitions & Animations",
    description: "Transitions between states, @keyframes animations, and animation properties.",
    steps: [
      {
        type: "lesson",
        content: `<p><strong>Transitions</strong> smoothly change property values over time:</p>
<div class="code-block">
.button {
  background-color: blue;
  transition: background-color 0.3s ease;
}
.button:hover {
  background-color: darkblue;
}
</div>
<p><strong>Transition shorthand:</strong> <code>transition: property duration timing-function delay</code></p>
<div class="code-block">
transition: all 0.3s ease;                     <span class="comment">/* all properties */</span>
transition: opacity 0.5s ease, transform 0.3s;  <span class="comment">/* multiple */</span>
</div>`
      },
      {
        type: "question",
        question: "What does <code>transition: all 0.3s</code> do?",
        options: [
          "Animates only color changes",
          "Smoothly transitions all animatable properties over 0.3 seconds",
          "Creates a 0.3s delay before starting",
          "Applies a 3D animation"
        ],
        correct: 1,
        explanation: "all applies the transition to any animatable property that changes. 0.3s is the duration."
      },
      {
        type: "lesson",
        content: `<p><strong>Timing functions</strong> control the speed curve:</p>
<ul>
  <li><code>ease</code> — slow start, fast middle, slow end (default)</li>
  <li><code>linear</code> — constant speed</li>
  <li><code>ease-in</code> — slow start, fast end</li>
  <li><code>ease-out</code> — fast start, slow end</li>
  <li><code>ease-in-out</code> — slow both ends</li>
  <li><code>cubic-bezier(n, n, n, n)</code> — custom curve</li>
</ul>
<p><strong>Properties that can be transitioned:</strong> color, opacity, transform, background, width, height, margin, padding, box-shadow, etc.</p>
<p><strong>Interpolation limits:</strong> many properties are discrete rather than smoothly interpolable. Supporting browsers can transition discrete display changes with transition-behavior: allow-discrete; entry/exit needs additional state handling. Provide a usable fallback.</p>`
      },
      {
        type: "question",
        question: "Which timing function has a constant speed?",
        options: ["ease", "ease-in", "ease-out", "linear"],
        correct: 3,
        explanation: "linear has no acceleration or deceleration — the speed is constant throughout the animation."
      },
      {
        type: "lesson",
        content: `<p><strong>CSS Animations</strong> — more powerful than transitions, with multiple keyframes:</p>
<div class="code-block">
<span class="comment">/* Define the animation */</span>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

<span class="comment">/* Apply it */</span>
.element {
  animation: fadeIn 0.5s ease-out forwards;
}
</div>`
      },
      {
        type: "lesson",
        content: `<p><strong>Animation properties:</strong></p>
<div class="code-block">
.element {
  animation-name: slideIn;        <span class="comment">/* @keyframes name */</span>
  animation-duration: 1s;         <span class="comment">/* time */</span>
  animation-timing-function: ease; <span class="comment">/* speed curve */</span>
  animation-delay: 0.5s;          <span class="comment">/* wait before starting */</span>
  animation-iteration-count: 3;   <span class="comment">/* or 'infinite' */</span>
  animation-direction: alternate;  <span class="comment">/* normal, reverse, alternate */</span>
  animation-fill-mode: forwards;   <span class="comment">/* keep end state */</span>

  <span class="comment">/* Shorthand */</span>
  animation: slideIn 1s ease 0.5s 3 alternate forwards;
}
</div>
<p>Multi-step keyframes use percentage stops:</p>
<div class="code-block">
@keyframes bounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-30px); }
  100% { transform: translateY(0); }
}
</div>`
      },
      {
        type: "question",
        question: "What does <code>animation-fill-mode: forwards</code> do?",
        options: [
          "Reverses the animation",
          "Keeps the final keyframe state after the animation ends",
          "Plays the animation in slow motion",
          "Restarts the animation"
        ],
        correct: 1,
        explanation: "forwards retains the relevant final animation value; the final keyframe depends on direction and iteration count. Without it, the element snaps back to its original styles."
      },
      {
        type: "lesson",
        content: `<p><strong>Best practices for performant animations:</strong></p>
<ul>
  <li>Prefer transform/opacity for motion when appropriate; they are often compositable, but layer allocation and actual rendering costs depend on context</li>
  <li>Avoid animating <code>width</code>, <code>height</code>, <code>top</code>, <code>left</code> — these trigger layout recalculations</li>
  <li>Use will-change only after measuring a problem, on a few elements, and remove it when no longer needed</li>
</ul>
<div class="code-block">
<span class="comment">/* Often efficient; profile the actual result */</span>
transform: translateX(100px);
opacity: 0.5;

<span class="comment">/* Changes can require layout; this alone is not layout thrashing */</span>
left: 100px;
width: 200px;
</div>`
      },
      {
        type: "question",
        question: "Which properties are safest to animate for good performance?",
        options: ["width and height", "transform and opacity", "top and left", "margin and padding"],
        correct: 1,
        explanation: "transform and opacity are often efficient candidates, but compositing is implementation/context dependent; profile real paint and layer behavior. Other properties like width cause expensive layout recalculations."
      }
    ],
    quiz: [
      { question: "What's the main difference between a transition and an animation?", options: ["Animations are faster", "Transitions need a trigger (like :hover); animations can run automatically", "Transitions use @keyframes", "There is no difference"], correct: 1, explanation: "Transitions require a state change (triggered by CSS classes or pseudo-classes). Animations with @keyframes can run automatically on page load." },
      { question: "What does <code>animation-iteration-count: infinite</code> do?", options: ["Plays once", "Plays forever", "Plays 3 times", "Pauses on hover"], correct: 1, explanation: "infinite loops the animation continuously until the element is removed or the animation is changed." },
      { question: "Which timing function has a slow start and slow end?", options: ["linear", "ease-in", "ease-out", "ease-in-out"], correct: 3, explanation: "ease-in-out accelerates slowly at start and decelerates at the end. ease starts slow, is fast in the middle, and ends slow." },
      { question: "What is a cubic bezier used for?", options: ["3D transforms", "Creating custom timing functions", "Round corners", "Animation keyframes"], correct: 1, explanation: "cubic-bezier(x1, y1, x2, y2) defines a custom timing function curve. It's the mathematical basis of all CSS easing functions." },
      { question: "What does <code>@keyframes</code> allow you to do?", options: ["Define reusable colors", "Define multi-step animation sequences", "Create CSS variables", "Import fonts"], correct: 1, explanation: "@keyframes defines intermediate steps in an animation using percentage stops (0% to 100%) or from/to keywords." }
    ]
  },

  // =====================================================================
  // CHAPTER 9 — Pseudo-classes & Pseudo-elements
  // =====================================================================
  {
    id: 9,
    title: "Pseudo-classes & Pseudo-elements",
    description: "User action states, structural selectors, form states, and generated content.",
    steps: [
      {
        type: "lesson",
        content: `<p><strong>Pseudo-classes</strong> (:) — select elements based on state or position:</p>
<div class="code-block">
<span class="comment">/* User action states */</span>
a:hover { color: red; }          <span class="comment">/* on hover */</span>
input:focus { border-color: blue; } <span class="comment">/* focused */</span>
button:active { transform: scale(0.95); } <span class="comment">/* being clicked */</span>
a:visited { color: purple; }

<span class="comment">/* Structural pseudo-classes */</span>
li:first-child { font-weight: bold; }
li:last-child { border: none; }
li:nth-child(odd) { background: #f5f5f5; }
li:nth-child(3n+1) { color: red; }   <span class="comment">/* every 3rd starting at 1 */</span>
</div>`
      },
      {
        type: "question",
        question: "What does <code>li:nth-child(3n)</code> select?",
        options: [
          "Every third &lt;li&gt; starting with the first",
          "Every third &lt;li&gt; (3, 6, 9, ...)",
          "The third &lt;li&gt; only",
          "All &lt;li&gt; elements"
        ],
        correct: 1,
        explanation: "3n matches every 3rd element (3n = 3, 6, 9...). 3n+1 would start at 1 (1, 4, 7, 10...)."
      },
      {
        type: "lesson",
        content: `<p><strong>Form state pseudo-classes:</strong></p>
<div class="code-block">
input:disabled { opacity: 0.5; }
input:checked { outline: 2px solid blue; }  <span class="comment">/* checkbox/radio */</span>
input:required { border-color: red; }
input:invalid { background: #ffe0e0; }
input:valid { background: #e0ffe0; }
input:placeholder-shown { font-style: italic; }
</div>
<p><strong>Negation pseudo-class:</strong> <code>:not()</code></p>
<div class="code-block">
<span class="comment">/* Style all inputs except submit buttons */</span>
input:not([type="submit"]) { border: 1px solid gray; }

<span class="comment">/* Exclude first child */</span>
li:not(:first-child) { border-top: 1px solid #ddd; }
</div>`
      },
      {
        type: "question",
        question: "Which pseudo-class styles an input with invalid data?",
        options: [":invalid", ":error", ":bad", ":unchecked"],
        correct: 0,
        explanation: ":invalid applies when the input's value doesn't match its validation constraints (type, pattern, required). It works with HTML5 form validation."
      },
      {
        type: "lesson",
        content: `<p><strong>Pseudo-elements</strong> (::) — create virtual elements or target parts of an element:</p>
<div class="code-block">
<span class="comment">/* Generated content — must have content property */</span>
.note::before {
  content: "💡 ";
}
.note::after {
  content: "";
  display: block;
  clear: both;
}

<span class="comment">/* Targeting parts */</span>
p::first-line { font-weight: bold; }
p::first-letter { font-size: 200%; }
::selection { background: yellow; }
::placeholder { color: gray; }
</div>
<p>Pseudo-elements use <code>::</code> (double colon) while pseudo-classes use <code>:</code> (single colon). Older browsers accept single colon for pseudo-elements too.</p>`
      },
      {
        type: "question",
        question: "Which property is REQUIRED on <code>::before</code> and <code>::after</code>?",
        options: ["display", "content", "position", "width"],
        correct: 1,
        explanation: "The <code>content</code> property is mandatory for ::before and ::after. Without it, the pseudo-element won't render. It can be an empty string: content: ''."
      },
      {
        type: "lesson",
        content: `<p><strong>Practical uses for pseudo-elements:</strong></p>
<div class="code-block">
<span class="comment">/* Clearfix hack */</span>
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

<span class="comment">/* Custom list bullets */</span>
li::marker {
  color: blue;
}

<span class="comment">/* Tooltip arrow */</span>
.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  border: 8px solid transparent;
  border-top-color: black;
}
</div>`
      },
      {
        type: "question",
        question: "Can pseudo-elements be selected with JavaScript?",
        options: [
          "Yes, with querySelector",
          "No — they are not part of the DOM",
          "Only ::before and ::after",
          "Only with getComputedStyle"
        ],
        correct: 1,
        explanation: "Pseudo-elements are not in the DOM — they're visual constructs. You can read their computed styles with getComputedStyle(el, '::before') but cannot select them."
      }
    ],
    quiz: [
      { question: "What's the syntax difference between a pseudo-class and a pseudo-element?", options: ["Pseudo-classes use ::, pseudo-elements use :", "Pseudo-classes use :, pseudo-elements use ::", "They both use :", "They both use ::"], correct: 1, explanation: "Pseudo-classes use single colon (:hover). Pseudo-elements use double colon (::before). Old browsers accept single colon for pseudo-elements." },
      { question: "Which pseudo-class selects elements that are NOT the first child?", options: [":not(:first-child)", ":not-first-child", ":except(first-child)", ":other-child"], correct: 0, explanation: ":not() negates a selector. :not(:first-child) selects all children except the first." },
      { question: "What does <code>::first-line</code> target?", options: ["The first letter", "The first formatted line of text", "The first child element", "The first sentence"], correct: 1, explanation: "::first-line targets the first line of a block-level element as it appears in the formatted layout (not the first sentence)." },
      { question: "What does <code>:empty</code> select?", options: ["Elements with no content or children", "Elements with no CSS", "Elements with no class", "Empty containers"], correct: 0, explanation: ":empty matches elements that have no children at all (no elements, text, or whitespace)." },
      { question: "Which pseudo-element targets a list item's native marker?", options: ["li::before", "li::marker", "li::after", "li::bullet"], correct: 1, explanation: "::marker targets the marker box. ::before can add separate decoration, but it is not the native list marker." }
    ]
  },

  // =====================================================================
  // CHAPTER 10 — CSS Variables & Functions
  // =====================================================================
  {
    id: 10,
    title: "CSS Variables & Functions",
    description: "Custom properties, var(), calc(), min(), max(), clamp(), and env().",
    steps: [
      {
        type: "lesson",
        content: `<p><strong>CSS Custom Properties</strong> (CSS variables) store values for reuse:</p>
<div class="code-block">
:root {
  --primary: #3498db;
  --spacing: 16px;
  --radius: 8px;
}

.button {
  background: var(--primary);
  padding: var(--spacing);
  border-radius: var(--radius);
}
</div>
<p>Unlike preprocessor variables (Sass/Less), CSS variables are <strong>live</strong> — they cascade, can be overridden per element, and can be changed with JavaScript.</p>`
      },
      {
        type: "question",
        question: "How do you override a CSS variable on a specific element?",
        options: [
          "You can't — variables are global",
          "Set it again in the element's selector or a parent",
          "Use JavaScript only",
          "Use the !important flag"
        ],
        correct: 1,
        explanation: "CSS variables cascade. Redefining --primary inside any selector overrides it for that element and its descendants. This is much more powerful than preprocessor variables."
      },
      {
        type: "lesson",
        content: `<p><strong>Fallback values</strong> — what happens if the variable isn't defined:</p>
<div class="code-block">
.element {
  <span class="comment">/* Use --primary if defined, otherwise use blue */</span>
  background: var(--primary, blue);

  <span class="comment">/* Nested fallbacks */</span>
  color: var(--text, var(--fallback-text, black));
}
</div>
<p><strong>JavaScript access:</strong></p>
<div class="code-block">
<span class="comment">// Set a variable</span>
element.style.setProperty('--primary', 'red');

<span class="comment">// Get a variable</span>
getComputedStyle(element).getPropertyValue('--primary').trim();
</div>`
      },
      {
        type: "question",
        question: "What does <code>var(--text, black)</code> do?",
        options: [
          "Sets --text to black",
          "Uses --text if defined, otherwise uses black",
          "Makes the text always black",
          "Throws an error if --text is undefined"
        ],
        correct: 1,
        explanation: "The second argument to var() is a fallback. If the custom property is missing or has a guaranteed-invalid value, the fallback is used. A defined value of the wrong type for color does not automatically activate the fallback."
      },
      {
        type: "lesson",
        content: `<p><strong>Useful CSS functions:</strong></p>
<div class="code-block">
<span class="comment">/* calc() — do math with mixed units */</span>
width: calc(100% - 320px);            <span class="comment">/* sidebar-aware */</span>
font-size: calc(1rem + 0.5vw);        <span class="comment">/* fluid typography */</span>
padding: calc(var(--spacing) * 2);

<span class="comment">/* min() and max() */</span>
width: min(100%, 1200px);             <span class="comment">/* responsive max-width */</span>
padding: max(1rem, 3vw);              <span class="comment">/* at least 1rem */</span>

<span class="comment">/* clamp() — preferred with min/max bounds */</span>
font-size: clamp(1rem, 2.5vw, 2rem);
</div>
<p>These functions work where their resulting numeric type is accepted: width, font-size, padding, margin, etc.</p>`
      },
      {
        type: "question",
        question: "What does <code>width: min(100%, 600px)</code> do?",
        options: [
          "Sets width to the SMALLER of 100% or 600px",
          "Sets width to the LARGER of 100% or 600px",
          "Sets width to exactly 600px",
          "Sets width to 100% on mobile"
        ],
        correct: 0,
        explanation: "min() selects the smallest value. So width is 100% until 100% exceeds 600px, then it caps at 600px. This is a simpler alternative to max-width."
      },
      {
        type: "lesson",
        content: `<p><strong>env()</strong> — access environment variables (safe area insets):</p>
<div class="code-block">
<span class="comment">/* Notch / safe area for mobile devices */</span>
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
</div>
<p><strong>attr()</strong> — use HTML attribute values in CSS:</p>
<div class="code-block">
<span class="comment">/* Show the href next to links when printing */</span>
@media print {
  a::after {
    content: " (" attr(href) ")";
  }
}
</div>`
      },
      {
        type: "question",
        question: "What does <code>env(safe-area-inset-top)</code> help with?",
        options: [
          "Safe area for printing",
          "Preventing content from hiding under the notch on phones",
          "Setting safe margin for all devices",
          "Safe area for animations"
        ],
        correct: 1,
        explanation: "env(safe-area-inset-top) returns the space needed to avoid the device's notch/status bar. It's essential for full-screen mobile web apps."
      }
    ],
    quiz: [
      { question: "How do you define a CSS variable with global scope?", options: ["$primary: blue;", "--primary: blue; inside :root {}", "@primary: blue;", "var(--primary: blue)"], correct: 1, explanation: "CSS variables use -- prefix. Defining them in :root makes them globally available (cascade to all elements)." },
      { question: "What does <code>calc(100% - 40px)</code> do?", options: ["Subtracts 40% from 100%", "Subtracts 40px from 100% of the parent's width", "Calculates 40px of margin", "Adds 40px to 100%"], correct: 1, explanation: "calc() can mix units. 100% is the parent's width, minus a fixed 40px. Whitespace is required around + and - in calc(); type and percentage rules still apply." },
      { question: "How is <code>min(100%, 800px)</code> different from <code>max-width: 800px</code>?", options: ["They're identical", "min() works with any property, not just max-width constraints", "min() is faster", "max-width is more modern"], correct: 1, explanation: "min() can be used anywhere a value is expected (width, font-size, grid gaps, etc.), not just for max-width." },
      { question: "Can CSS variables be changed with JavaScript?", options: ["No", "Yes, via element.style.setProperty()", "Only with jQuery", "Only in development mode"], correct: 1, explanation: "element.style.setProperty('--primary', 'red') changes a CSS variable at runtime, instantly updating all elements that use it." },
      { question: "What does <code>clamp(16px, 5vw, 48px)</code> guarantee?", options: ["Value is always 5vw", "Value stays between 16px and 48px, preferring 5vw", "Value is 16px on mobile, 48px on desktop", "Value scales linearly from 16px to 48px"], correct: 1, explanation: "clamp() prefers 5vw but won't go below 16px or above 48px. It provides fluid scaling with hard limits." }
    ]
  },

  // =====================================================================
  // CHAPTER 11 — Modern CSS
  // =====================================================================
  {
    id: 11,
    title: "Modern CSS",
    description: ":is(), :where(), container queries, subgrid, logical properties, accent-color, and more.",
    steps: [
      {
        type: "lesson",
        content: `<p>CSS continues to evolve. Here are powerful modern features you should know.</p>
<p><strong>:is() and :where()</strong> — forgiving selector lists with different specificity:</p>
<div class="code-block">
<span class="comment">/* Without :is() — verbose */</span>
header a, main a, footer a { color: blue; }

<span class="comment">/* With :is() — takes specificity of the highest argument */</span>
:is(header, main, footer) a { color: blue; }

<span class="comment">/* With :where() — specificity is always 0 */</span>
:where(header, main, footer) a { color: blue; }
</div>`
      },
      {
        type: "question",
        question: "What is the key difference between <code>:is()</code> and <code>:where()</code>?",
        options: [
          "They are identical",
          ":is() takes specificity of its arguments; :where() has zero specificity",
          ":where() has higher specificity",
          ":is() is newer"
        ],
        correct: 1,
        explanation: ":is() takes the specificity of its most specific argument. :where() always has 0 specificity, making it easy to override."
      },
      {
        type: "lesson",
        content: `<p><strong>Container Queries</strong> — style elements based on their container's size, not the viewport:</p>
<div class="code-block">
<span class="comment">/* Define a container */</span>
.card-container {
  container-type: inline-size;
  container-name: card;
}

<span class="comment">/* Query the container */</span>
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

<span class="comment">/* Shorthand */</span>
.card-container {
  container: card / inline-size;
}
</div>
<p>Container queries are a game-changer for reusable components — they adapt to their placement, not the screen.</p>`
      },
      {
        type: "question",
        question: "What problem do container queries solve that media queries cannot?",
        options: [
          "Changing layout based on the element's container size, not the viewport",
          "Animating elements",
          "Changing colors",
          "Loading fonts"
        ],
        correct: 0,
        explanation: "Media queries test the viewport, output environment, and preferences. Container size queries test an eligible ancestor’s size. Container queries let a component respond to its own container's size — crucial for reusable component libraries."
      },
      {
        type: "lesson",
        content: `<p><strong>Logical Properties</strong> — physical vs logical directions for internationalization:</p>
<div class="code-block">
<span class="comment">/* Physical (old) */</span>
margin-left: 16px;
padding-top: 8px;
border-right: 1px solid;

<span class="comment">/* Logical (new) — adapts to writing direction */</span>
margin-inline-start: 16px;   <span class="comment">/* left in LTR, right in RTL */</span>
padding-block-start: 8px;     <span class="comment">/* top in horizontal writing */</span>
border-inline-end: 1px solid; <span class="comment">/* right in LTR, left in RTL */</span>
</div>
<p>Logical properties use <code>block</code> (top/bottom) and <code>inline</code> (left/right) axes that rotate with writing mode.</p>`
      },
      {
        type: "lesson",
        content: `<p><strong>More modern features:</strong></p>
<div class="code-block">
<span class="comment">/* accent-color — style form controls */</span>
input[type="checkbox"] {
  accent-color: #3498db;
}

<span class="comment">/* color-mix — blend colors in CSS */</span>
.element {
  background: color-mix(in srgb, red 50%, blue);
}

<span class="comment">/* scroll-behavior — smooth scrolling */</span>
html { scroll-behavior: smooth; }

<span class="comment">/* aspect-ratio — maintain proportions */</span>
.video-embed { aspect-ratio: 16 / 9; }

<span class="comment">/* Subgrid — inherit grid tracks from parent */</span>
.child-grid {
  display: grid;
  grid-template-columns: subgrid;
}
</div>`
      },
      {
        type: "question",
        question: "What does <code>aspect-ratio: 16 / 9</code> do?",
        options: [
          "Makes the element 16px wide and 9px tall",
          "Supplies a preferred 16:9 ratio when sizing constraints allow it",
          "Creates a 16-column grid",
          "Sets font aspect ratio"
        ],
        correct: 1,
        explanation: "aspect-ratio provides a preferred ratio, not an unconditional constraint. At least one relevant size is normally automatic; explicit sizes or min/max constraints can override the ratio. If width is 400px, height is automatically 225px (400 * 9/16)."
      },
      {
        type: "lesson",
        content: `<p><strong>Subgrid</strong> — child grid elements can inherit track sizes from the parent grid:</p>
<div class="code-block">
.parent {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
}

.child {
  display: grid;
  grid-template-columns: subgrid;   <span class="comment">/* matches parent's columns */</span>
  grid-column: 1 / -1;             <span class="comment">/* span all columns */</span>
}
</div>
<p>Before subgrid, nested grids were independent and columns wouldn't align. Subgrid fixes this.</p>
<p><strong>@scope</strong> (check your target browser matrix) — styles scoped to a subtree:</p>
<div class="code-block">
@scope (.card) {
  p { color: gray; }        <span class="comment">/* only paragraphs inside .card */</span>
}
</div>`
      },
      {
        type: "question",
        question: "What does <code>grid-template-columns: subgrid</code> do?",
        options: [
          "Creates a subgrid with its own column definitions",
          "Inherits the parent grid's column tracks",
          "Makes the element a subgrid of the body",
          "Creates a 3-column subgrid"
        ],
        correct: 1,
        explanation: "subgrid inherits the parent's grid track definitions. This ensures nested grid items align with the parent's columns, solving a long-standing alignment problem."
      }
    ],
    quiz: [
      { question: "What is the specificity of <code>:where(.nav a)</code>?", options: ["0,0,1,1", "0,0,0,1", "0,1,0,1", "0,0,0,0"], correct: 3, explanation: "The entire selector :where(.nav a) has zero specificity. A separate a outside :where(), as in :where(.nav) a, would contribute one type selector." },
      { question: "Which property styles checkboxes and radio buttons with the brand color?", options: ["color", "accent-color", "brand-color", "form-color"], correct: 1, explanation: "accent-color sets the color of form controls like checkboxes, radio buttons, range sliders, and progress bars." },
      { question: "What does container-type: inline-size do?", options: ["Sets container width", "Declares the element as a query container that can be queried by size", "Sets inline size", "Creates a flex container"], correct: 1, explanation: "container-type: inline-size makes the element a containment context that @container queries can reference." },
      { question: "In logical properties, what does 'inline' refer to?", options: ["The vertical axis (top/bottom)", "The horizontal axis in horizontal writing (left/right)", "Inline CSS", "The element's display type"], correct: 1, explanation: "inline refers to the axis along which text flows — horizontal in LTR/RTL languages. block is the perpendicular axis." },
      { question: "What does <code>color-mix(in srgb, red, blue)</code> do?", options: ["Picks either red or blue", "Mixes red and blue to create purple at 50% each", "Creates a gradient", "Blends two elements' colors"], correct: 1, explanation: "color-mix() blends two colors. By default it's 50% each, producing purple from red and blue." }
    ]
  }
];
