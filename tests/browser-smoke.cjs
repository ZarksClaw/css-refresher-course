// Optional end-to-end checks: install Playwright and Chromium first (see README).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const engines = require('playwright');
const engineName = process.env.BROWSER || 'chromium';
assert.ok(['chromium', 'firefox'].includes(engineName), 'Choose chromium or firefox');

(async () => {
  const root = path.resolve(__dirname, '..');
  const server = http.createServer((request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
    if (!/^(index\.html|js\/[a-z-]+\.js|css\/style\.css|examples\/dashboard\/(index\.html|dashboard\.css))$/.test(relative)) {
      response.writeHead(404).end();
      return;
    }
    response.setHeader('Content-Type', relative.endsWith('.js') ? 'text/javascript' : relative.endsWith('.css') ? 'text/css' : 'text/html');
    response.end(fs.readFileSync(path.join(root, relative)));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await engines[engineName].launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
    const page = await browser.newPage();
    const waitForPreview = async () => {
      const revision = await page.locator('iframe').getAttribute('data-revision');
      await page.frameLocator('iframe').locator(`body[data-preview-revision="${revision}"]`).waitFor();
    };
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    assert.equal(await page.locator('.chapter-card').count(), 23);
    await page.locator('#chapter-search').fill('Subgrid');
    assert.ok(await page.locator('.chapter-card').count() >= 1);
    await page.locator('#chapter-search').fill('no-such-topic');
    assert.equal(await page.locator('.chapter-card').count(), 0);
    await page.locator('#chapter-search').fill('');
    await page.locator('#track-filter').selectOption('Engineering');
    assert.equal(await page.locator('.chapter-card').count(), 12);
    await page.locator('#track-filter').selectOption('');

    const chapters = await page.evaluate(() => CHAPTERS.map(ch => ({ id: ch.id, steps: ch.steps.map(s => ({ type: s.type, correct: s.correct, demo: s.demo })), quiz: ch.quiz.map(q => q.correct) })));
    for (const chapter of chapters) {
      await page.locator(`[data-chapter="${chapter.id}"]`).click();
      assert.equal(await page.locator('.learning-goals').count(), 1);
      assert.equal(await page.locator('.outline-step[disabled]').count(), chapter.steps.length - 1);
      for (const step of chapter.steps) {
        if (step.demo) {
          await page.frameLocator('iframe').locator('body').waitFor();
          await page.locator('summary').click();
          await page.locator('.try-solution').click();
          await waitForPreview();
          const preview = page.frameLocator('iframe');
          for (const check of step.demo.checks) {
            const element = preview.locator(check.selector).first();
            await element.waitFor();
            for (const [property, expected] of Object.entries(check.style)) {
              // Frame locators resolve the newly navigated srcdoc frame for each assertion.
              const actual = await element.evaluate((node, property) => getComputedStyle(node)[property], property);
              assert.equal(actual, expected, `${chapter.id}: ${check.selector} ${property}`);
            }
          }
          assert.equal(await page.locator('iframe').getAttribute('sandbox'), '');
          const fullWidth = (await page.locator('iframe').boundingBox()).width;
          await page.locator('#preview-width').focus();
          await page.locator('#preview-width').press('Home');
          assert.equal(await page.locator('#preview-width-value').innerText(), '40%');
          assert.ok((await page.locator('iframe').boundingBox()).width < fullWidth);
          await page.locator('#preview-width').press('End');
          if (chapter.id === 1) {
            await page.locator('#css-editor').fill('.panel p { color: rgb(1, 2, 3); }');
            await page.locator('.apply-css').click();
            await waitForPreview();
            assert.equal(await preview.locator('.panel p').evaluate(node => getComputedStyle(node).color), 'rgb(1, 2, 3)');
            const denied = await preview.locator('body').evaluate(() => {
              try { void parent.document; return false; } catch (error) { return error.name === 'SecurityError'; }
            });
            assert.equal(denied, true, 'preview must not access the host document');
            await page.locator('.reset-css').click();
            await waitForPreview();
            assert.match(await page.locator('#css-editor').inputValue(), /Write your CSS/);
          }
        }
        if (step.type === 'question') {
          assert.equal(await page.locator('#next-btn').isDisabled(), true);
          await page.locator(`.q-option[data-idx="${step.correct}"]`).click();
        }
        await page.locator('#next-btn').click();
      }
      assert.equal(await page.locator('#quiz-view').isVisible(), true);
      if (chapter.id === 12) {
        for (let i = 0; i < chapter.quiz.length; i++) {
          await page.locator(`.q-ops[data-q="${i}"] button`).nth((chapter.quiz[i] + 1) % 4).click();
        }
        await page.locator('#quiz-submit-btn').click();
        assert.match(await page.locator('#quiz-score').innerText(), /^0\//);
        await page.locator('#quiz-retry-btn').click();
      }
      for (let i = 0; i < chapter.quiz.length; i++) {
        await page.locator(`.q-ops[data-q="${i}"] button`).nth(chapter.quiz[i]).click();
      }
      await page.locator('#quiz-submit-btn').click();
      assert.equal(await page.locator('.q-explain.show').count(), chapter.quiz.length);
      await page.locator('#quiz-done-btn').click();
    }
    assert.equal(await page.locator('#overall-label').innerText(), '23 / 23 chapters');
    await page.reload();
    assert.equal(await page.locator('#overall-label').innerText(), '23 / 23 chapters');
    await page.locator('#reset-btn').click();
    await page.locator('#reset-cancel-btn').click();
    assert.equal(await page.locator('#overall-label').innerText(), '23 / 23 chapters');
    await page.locator('#reset-btn').click();
    await page.locator('#reset-confirm-btn').click();
    assert.equal(await page.locator('#overall-label').innerText(), '0 / 23 chapters');
    await page.locator('[data-chapter="1"]').click();
    const firstQuestion = chapters[0].steps.findIndex(step => step.type === 'question');
    for (let i = 0; i < firstQuestion; i++) await page.locator('#next-btn').click();
    assert.equal(await page.locator('.q-option').count(), 4);
    assert.equal(await page.locator('.q-option:disabled').count(), 0, 'reset clears session answers');
    await page.locator('#back-btn').click();
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    await page.locator('[data-chapter="18"]').click();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    await page.goto(`http://127.0.0.1:${server.address().port}/examples/dashboard/index.html`);
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `capstone width ${width}`);
      const tracks = await page.locator('.stats').evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length);
      assert.ok(tracks >= 1);
      if (process.env.CAPTURE_SCREENSHOTS) {
        fs.mkdirSync('test-results', { recursive: true });
        await page.screenshot({ path: `test-results/${engineName}-dashboard-${width}.png`, fullPage: true });
      }
    }
    await page.setViewportSize({ width: 1280, height: 900 });
    assert.equal(await page.locator('.app-layout').evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length), 2);
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    assert.equal(await page.locator('body').evaluate(node => getComputedStyle(node).backgroundColor), 'rgb(17, 28, 25)');
    if (process.env.CAPTURE_SCREENSHOTS) await page.screenshot({ path: `test-results/${engineName}-dashboard-dark.png`, fullPage: true });
    assert.equal(await page.locator('nav a').first().evaluate(node => getComputedStyle(node).transitionDuration), '0s');
    await page.emulateMedia({ media: 'print' });
    assert.equal(await page.locator('nav').evaluate(node => getComputedStyle(node).display), 'none');
    assert.equal(await page.locator('.filters').evaluate(node => getComputedStyle(node).display), 'none');
    await page.emulateMedia({ media: 'screen', colorScheme: 'light', reducedMotion: 'reduce' });
    await page.goto(`http://127.0.0.1:${server.address().port}/examples/dashboard/index.html`);
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.skip-link').evaluate(node => node === document.activeElement), true);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#main').evaluate(node => node === document.activeElement), true);
    await page.locator('#search').focus();
    assert.equal(await page.locator('#search').evaluate(node => getComputedStyle(node).outlineStyle), 'solid');
    assert.deepEqual(errors, []);
    console.log('Browser smoke passed: 23 chapters/quizzes, all 23 worked CSS fixtures, retry, storage, reset, search, filters, mobile width, and capstone preferences/keyboard/print.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
