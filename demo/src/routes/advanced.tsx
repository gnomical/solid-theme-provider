import { Title } from "@solidjs/meta"
import { ThemeProvider, ThemeToggle, useTheme } from "solid-theme-provider"
import { CodeBlock } from "../components/CodeBlock"

function ThemeControls() {
  const { currentTheme, setTheme } = useTheme()
  return (
    <>
      <div class="demo-box">
        <ThemeToggle label="Toggle" />
        <div class="current-theme-display">
          Active theme: <strong>{currentTheme()}</strong>
        </div>
      </div>
      <div class="demo-box" style={{ gap: "0.5rem", "flex-wrap": "wrap" }}>
        <span class="note" style={{ width: "100%", "margin-top": 0 }}>
          Drive theme externally:
        </span>
        <button onClick={() => setTheme("light")}>Force Light</button>
        <button onClick={() => setTheme("dark")}>Force Dark</button>
      </div>
    </>
  )
}

export default function Advanced() {
  return (
    <main>
      <Title>Advanced — solid-theme-provider demo</Title>
      <h1>Advanced</h1>
      <h2>
        Use the <code>useTheme()</code> hook to read or drive the active theme from anywhere inside
        a <code>ThemeProvider</code>.
      </h2>

      <div class="demo-section">
        <h3>Live</h3>
        <ThemeControls />
      </div>

      <div class="demo-section">
        <h3>Code</h3>
        <CodeBlock code={`import { ThemeProvider, ThemeToggle, useTheme } from "solid-theme-provider";

function ThemeControls() {
  const { currentTheme, setTheme } = useTheme();
  return (
    <>
      <ThemeToggle label="Toggle" />
      <div>Active theme: {currentTheme()}</div>
      <button onClick={() => setTheme("dark")}>Force Dark</button>
    </>
  );
}`} />
      </div>

      <div class="demo-section">
        <h3>Notes</h3>
        <p>
          <code>useTheme()</code> returns a <code>currentTheme</code> Solid signal accessor — it's
          reactive and triggers updates in any component that reads it. <code>setTheme(name)</code>{" "}
          accepts any theme key defined in your themes config. Must be called inside a component
          that is a descendant of <code>ThemeProvider</code>.
        </p>
      </div>
    </main>
  )
}
