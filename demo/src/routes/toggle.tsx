import { Title } from "@solidjs/meta"
import { ThemeToggle } from "solid-theme-provider"
import { CodeBlock, CodeSpan } from "../components/Code"

export default function Toggle() {
  return (
    <main>
      <Title>ThemeToggle — solid-theme-provider demo</Title>
      <h1>ThemeToggle</h1>
      <h2>Toggles between the default light and dark themes. No configuration required.</h2>

      <div class="demo-section">
        <h3>Live</h3>
        <div class="demo-box">
          <ThemeToggle />
        </div>
        <p class="note">
          <CodeSpan code={`<ThemeToggle />`} /> No props
        </p>
        <div class="demo-box">
          <ThemeToggle label="Toggle Theme" />
        </div>
        <p class="note">
          <CodeSpan code={`<ThemeToggle label="Toggle Theme" />`} /> With label prop
        </p>
      </div>

      <div class="demo-section">
        <h3>Code</h3>
        <CodeBlock
          code={`import { ThemeProvider, ThemeToggle } from "solid-theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      <nav>
        <ThemeToggle label="Toggle Theme" />
      </nav>
    </ThemeProvider>
  )
}`}
        />
        <p>
          The <code>ThemeProvider</code> component should wrap your app. <code>ThemeToggle</code> can
          be placed anywhere within it. By default, the provider will detect the user's system
          preference and apply the appropriate theme.
        </p>
      </div>

      <div class="demo-section">
        <h3>Default CSS Variables</h3>
        <CodeBlock
          lang="css"
          code={`body, html {
  background: var(--stp-background);
  color: var(--stp-foreground);
}`}
        />
        <p>
          On every theme switch, all variables defined in your theme's <code>vars</code> object are
          injected into <code>:root</code>. The built-in themes define <code>--stp-background</code>,{" "}
          <code>--stp-foreground</code>, and <code>--stp-button-radius</code> — but in practice
          you'll define your own. Any key/value pair in <code>vars</code> becomes a CSS custom
          property your stylesheets can consume directly.
        </p>
      </div>
    </main>
  )
}
