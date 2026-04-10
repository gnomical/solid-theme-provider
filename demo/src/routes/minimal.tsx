import { Title } from "@solidjs/meta"
import { ThemeToggle, ThemePicker } from "solid-theme-provider"
import { CodeBlock } from "../components/CodeBlock"

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
        </div>
        <p class="note"><code>ThemeToggle</code> No props</p>
        <div class="demo-box">
          <ThemeToggle label="Toggle Theme" />
        </div>
        <p class="note"><code>ThemeToggle</code> With label prop</p>
        <div class="demo-box">
          <ThemePicker />
        </div>
        <p class="note"><code>ThemePicker</code> No props</p>
      </div>

      <div class="demo-section">
        <h3>Code</h3>
        <CodeBlock code={`import { ThemeProvider, ThemeToggle } from "solid-theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      <nav>
        <ThemeToggle label="Toggle Theme" />
      </nav>
    </ThemeProvider>
  )
}`} />
        <p>
          The <code>ThemeProvider</code> component should wrap your app, and the ui components (<code>ThemeToggle</code>, <code>ThemePicker</code>) can be placed anywhere within it. By default, the provider will detect the user's system preference and apply the appropriate theme.
        </p>
      </div>

      <div class="demo-section">
        <h3>Default CSS Variables</h3>
        <CodeBlock lang="css" code={`body, html {
  background: var(--stp-background);
  color: var(--stp-foreground);
}`} />
        <p>
          The component injects <code>--stp-background</code>, <code>--stp-foreground</code>, and{" "}
          <code>--stp-button_radius</code> into <code>:root</code> on every theme switch. These can be customized by passing a <code>theme</code> prop to the <code>ThemeProvider</code>.
        </p>
      </div>
    </main>
  )
}
