import { Title } from "@solidjs/meta";
import { ThemeProvider } from "solid-theme-provider";

const pillStyle = {
  "border-radius": "999px",
  "padding": "0.35em 1em",
  "font-size": "0.9rem",
  "font-weight": "600",
  "border": "2px solid currentColor",
};

const minimalStyle = {
  "background": "transparent",
  "border": "none",
  "padding": "0",
  "opacity": "0.5",
};

export default function CustomStyles() {
  return (
    <main>
      <Title>Custom Styles — solid-theme-provider demo</Title>
      <h1>Custom Styles</h1>
      <h2>
        Pass a <code>styles</code> prop to override the toggle button's inline styles.
      </h2>

      <div class="demo-section">
        <h3>Live</h3>
        <div class="demo-box">
          <ThemeProvider label="Toggle" styles={pillStyle} />
          <span class="note">Pill shape</span>
        </div>
        <div class="demo-box">
          <ThemeProvider styles={minimalStyle} />
          <span class="note">Minimal / icon-only</span>
        </div>
        <div class="demo-box">
          <ThemeProvider label="Theme" />
          <span class="note">Default (no styles prop)</span>
        </div>
      </div>

      <div class="demo-section">
        <h3>Code</h3>
        <pre><code>{`import { ThemeProvider } from "solid-theme-provider";

const pillStyle = {
  "border-radius": "999px",
  "padding": "0.35em 1em",
  "font-weight": "600",
  "border": "2px solid currentColor",
};

<ThemeProvider label="Toggle" styles={pillStyle} />`}</code></pre>
      </div>

      <div class="demo-section">
        <h3>CSS Variable Approach</h3>
        <p class="note">
          For deeper customization, target the component via the <code>id</code> prop and use your
          own stylesheet — the button uses theme variables internally so it adapts automatically.
        </p>
        <pre><code>{`<ThemeProvider id="my-toggle" />

/* in your CSS */
#my-toggle button {
  border-radius: 999px;
}`}</code></pre>
      </div>
    </main>
  );
}
