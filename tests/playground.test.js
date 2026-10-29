const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync('js/playground.js', 'utf8') + ';globalThis.preview = Playground', context);

test('preview document sets a restrictive policy and isolates CSS from the host', () => {
  const html = context.preview.document('<p class="demo">Hello</p>', '.demo { color: navy; }');
  assert.ok(html.includes("default-src 'none'"));
  assert.ok(html.includes("style-src 'unsafe-inline'"));
  assert.ok(html.includes("form-action 'none'"));
  assert.ok(html.includes('<p class="demo">Hello</p>'));
  assert.ok(html.includes('.demo { color: navy; }'));
  assert.ok(!html.includes('allow-scripts'));
});

test('CSS cannot terminate its style element through a literal closing tag', () => {
  const html = context.preview.document('<p>Fixture</p>', '</style><script>parent.location="bad"</script>');
  assert.ok(!html.includes('</style><script>'));
  assert.ok(html.includes('<\\/style>'));
});
