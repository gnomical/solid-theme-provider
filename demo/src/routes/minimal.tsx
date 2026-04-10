import { Title } from "@solidjs/meta"
import { ThemeToggle } from "solid-theme-provider"

export default function Minimal() {
  return (
    <main>
      <Title>Minimal — solid-theme-provider demo</Title>
      <h1>Minimal</h1>
      <h2>No configuration required. Detects system light/dark preference automatically.</h2>

      <div class="demo-section">
        <h3>Live</h3>
        <div class="demo-box">
          <ThemeToggle />
          <span class="note">No props — defaults to system preference</span>
        </div>
        <div class="demo-box">
          <ThemeToggle label="Toggle Theme" />
          <span class="note">With label prop</span>
        </div>
      </div>

      <div class="demo-section">
        <h3>Code</h3>
        <pre>
          <code>{`import { ThemeProvider, ThemeToggle } from "solid-theme-provider";

<ThemeProvider>
    <ThemeToggle label="Toggle Theme" />
</ThemeProvider>`}</code>
        </pre>
      </div>

      <div class="demo-section">
        <h3>Default CSS Variables</h3>
        <pre>
          <code>{`body, html {
  background: var(--stp-background);
  color: var(--stp-foreground);
}`}</code>
        </pre>
        <p class="note" style={{ "margin-top": "0.75rem" }}>
          The component injects <code>--stp-background</code>, <code>--stp-foreground</code>, and{" "}
          <code>--stp-button_radius</code> into <code>:root</code> on every theme switch.
        </p>
      </div>
    </main>
  )
}
