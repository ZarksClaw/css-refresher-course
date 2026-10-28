// Each practice frame is a script-free, opaque-origin document with blocked network access.
const Playground = {
  document(html, css, revision = 0) {
    const safeCSS = css.replace(/<\/style/gi, '<\\/style');
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src 'none'; font-src 'none'; connect-src 'none'; form-action 'none'; base-uri 'none'"><style>*,*::before,*::after{box-sizing:border-box}body{margin:0;padding:16px;font:16px/1.5 system-ui,sans-serif;color:#172554;background:white}button,input,select,textarea{font:inherit}</style><style>${safeCSS}</style></head><body data-preview-revision="${revision}">${html}</body></html>`;
  },
  mount(step, container) {
    if (!step.demo) return;
    const host = container.querySelector('.playground-host');
    if (!host) return;
    host.innerHTML = `
      <section class="playground" aria-label="CSS practice editor">
        <label for="css-editor">Your CSS</label>
        <textarea id="css-editor" rows="8" spellcheck="false" autocapitalize="off" autocomplete="off" aria-describedby="editor-help"></textarea>
        <p id="editor-help">Apply your CSS, or open the worked solution below. The HTML is fixed. Scripts, external assets, and form submission are blocked in the preview.</p>
        <div class="playground-actions"><button type="button" class="btn btn-primary apply-css">Apply CSS</button><button type="button" class="btn btn-ghost reset-css">Reset editor</button></div>
        <label for="preview-width">Preview width: <output id="preview-width-value">100%</output></label>
        <input id="preview-width" type="range" min="40" max="100" value="100" step="10">
        <p class="playground-status" role="status">Starter preview. Write your CSS above.</p>
        <div class="preview-well"><iframe title="Isolated CSS practice preview" sandbox="" referrerpolicy="no-referrer" loading="eager"></iframe></div>
      </section>`;
    const editor = host.querySelector('textarea');
    let frame = host.querySelector('iframe');
    const status = host.querySelector('.playground-status');
    let revision = 0;
    frame.dataset.revision = '0';
    const starter = '/* Write your CSS here, then choose Apply CSS. */';
    editor.value = starter;
    const apply = () => {
      revision++;
      // Replace the opaque-origin frame rather than navigating an existing srcdoc.
      // This also discards any prior native control or scrolling state reliably.
      const nextFrame = frame.cloneNode(false);
      nextFrame.dataset.revision = String(revision);
      nextFrame.srcdoc = this.document(step.demo.html, editor.value, revision);
      frame.replaceWith(nextFrame);
      frame = nextFrame;
      status.textContent = 'CSS applied. Inspect the preview; invalid CSS may be ignored by the browser.';
    };
    frame.srcdoc = this.document(step.demo.html, starter);
    host.querySelector('.apply-css').addEventListener('click', apply);
    host.querySelector('.reset-css').addEventListener('click', () => {
      editor.value = starter;
      apply();
      status.textContent = 'Editor reset to the starter. Course progress is unchanged.';
    });
    container.querySelector('.try-solution').addEventListener('click', () => {
      editor.value = step.demo.css;
      apply();
    });
    host.querySelector('#preview-width').addEventListener('input', event => {
      const width = event.target.value;
      frame.style.width = `${width}%`;
      host.querySelector('output').textContent = `${width}%`;
    });
  }
};
