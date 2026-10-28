# Responsive dashboard capstone

Open `index.html` in this directory. It needs no server, package install, remote
asset, or JavaScript. From the repository root, a local static server is optional:

```bash
python3 -m http.server 8080
```

Visit http://localhost:8080/examples/dashboard/.

## Behavior contract

- Meaningful source order: workspace navigation, overview, tasks, notes.
- At small widths the layout is one column; at 56rem it introduces a sidebar.
- Statistics use an intrinsic-aware Grid. Long task names wrap instead of forcing
  the entire page to scroll horizontally.
- A summary card has a named inline-size container and a usable base layout.
- Theme roles adapt to the system color preference. Reduced motion omits optional
  link transitions. Native inputs/selects follow color-scheme.
- A skip link targets the main content. Navigation and form controls expose focus.
- The form has associated labels and an explicit statement that it does not filter
  data. It is a styling demonstration, not an implemented application feature.
- Print removes navigation and the demo form, preserves the content, and uses a
  light palette and simple flow.

## Review checklist

1. Resize to 320, 390, 768, and 1280px; inspect fit and spacing, not just breakpoints.
2. Tab from the top, activate the skip link, and inspect the input/select focus rings.
3. Increase zoom and text size; replace labels with longer translations.
4. Test dark preference, reduced motion, and forced colors.
5. Inspect the container query in a narrow/wide main region.
6. Check print preview and ensure the task/status text remains understandable.
7. Review actual contrast and semantics before adapting it to production.

The automated browser suite covers selected layout measurements, preferences,
keyboard behavior, and print declarations. It does not prove full accessibility
conformance or every pagination/assistive-technology behavior. No actual project
data is fetched, filtered, or persisted.

Try adding a genuine filter using JavaScript, a theme selector with persistent
preference, or a second component using the same tokens. Update both the visible
functional description and corresponding tests when adding behavior.
