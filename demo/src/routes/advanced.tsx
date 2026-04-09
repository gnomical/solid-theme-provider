import { Title } from "@solidjs/meta";
import { ThemeProvider, currentTheme, setTheme } from "solid-theme-provider";

export default function Advanced() {
  return (
    <main>
      <Title>Advanced — solid-theme-provider demo</Title>
      <h1>Advanced</h1>
      <h2>
        <code>currentTheme</code> and <code>setTheme</code> are exported signals you can use to
        read or drive the active theme from anywhere in your app.
      </h2>

      <div class="demo-section">
        <h3>Live</h3>
        <div class="demo-box">
          <ThemeProvider label="Toggle" />
          <div class="current-theme-display">
            Active theme: <strong>{currentTheme()}</strong>
          </div>
        </div>
        <div class="demo-box" style={{ gap: "0.5rem", "flex-wrap": "wrap" }}>
          <span class="note" style={{ width: "100%", "margin-top": 0 }}>Drive theme externally:</span>
          <button onClick={() => setTheme("light")}>Force Light</button>
          <button onClick={() => setTheme("dark")}>Force Dark</button>
        </div>
      </div>

      <div class="demo-section">
        <h3>Code</h3>
        <pre><code>{`import { ThemeProvider, currentTheme, setTheme } from "solid-theme-provider";

// Read the active theme name reactively
<MyComponent theme={currentTheme()} />

// Set the theme programmatically
<button onClick={() => setTheme("dark")}>Force Dark</button>`}</code></pre>
      </div>

      <div class="demo-section">
        <h3>Notes</h3>
        <p class="note">
          <code>currentTheme()</code> is a Solid signal — it's reactive and will trigger updates in
          any component that reads it. <code>setTheme(name)</code> accepts any theme key defined in
          your themes config.
        </p>
      </div>
    </main>
  );
}
