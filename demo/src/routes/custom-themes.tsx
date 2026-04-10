import { Title } from "@solidjs/meta"
import { ThemePicker } from "solid-theme-provider"
import { CodeBlock } from "../components/CodeBlock"

export default function CustomThemes() {
  return (
    <main>
      <Title>Custom Themes — solid-theme-provider demo</Title>
      <h1>Custom Themes</h1>
      <h2>
        Supply a <code>themes</code> prop to define your own named themes. Use{" "}
        <code>ThemePicker</code> to render a dropdown for selecting between them.
      </h2>

      <div class="demo-section">
        <h3>Live</h3>
        <div class="demo-box">
          <ThemePicker label="Theme" />
          <span class="note">
            3 themes: Humid Night, Warm Light, Turtle — dropdown with system preference
          </span>
        </div>
      </div>

      <div class="demo-section">
        <h3>Code</h3>
        <CodeBlock code={`import { ThemeProvider, ThemePicker } from "solid-theme-provider";
import { myThemes } from "./themes";

<ThemeProvider themes={myThemes}>
  <header>
    <ThemePicker label="Theme" />
  </header>
  <main>
    {/* rest of your app */}
  </main>
</ThemeProvider>`} />
      </div>

      <div class="demo-section">
        <h3>themes.ts shape</h3>
        <CodeBlock code={`import type { ThemesConfig } from "solid-theme-provider";

export const myThemes: ThemesConfig = {
  systemThemes: {
    dark: "humid_night",
    light: "warm_light",
  },
  themes: {
    humid_night: {
      config: { label: "Humid Night", browserThemeColor: "#110000" },
      vars: {
        background: "#110000",
        foreground: "#ddddcc",
        button_radius: "0.5em",
      },
    },
    warm_light: { ... },
    turtle: { ... },
  },
};`} />
        <p class="note" style={{ "margin-top": "0.75rem" }}>
          <code>systemThemes</code> maps <code>dark</code> / <code>light</code> to theme keys, so
          system preference auto-selects the right one. Every other key is a named theme.
        </p>
      </div>
    </main>
  )
}
