import { Title } from "@solidjs/meta";
import { ThemeProvider } from "solid-theme-provider";
import myThemes from "../data/custom-themes.json";

export default function CustomThemes() {
  return (
    <main>
      <Title>Custom Themes — solid-theme-provider demo</Title>
      <h1>Custom Themes</h1>
      <h2>
        Supply a <code>themes</code> prop to define your own named themes. More than 2 themes
        renders a dropdown.
      </h2>

      <div class="demo-section">
        <h3>Live</h3>
        <div class="demo-box">
          <ThemeProvider label="Theme" themes={myThemes} />
          <span class="note">3 themes: Humid Night, Warm Light, Turtle — dropdown auto-appears</span>
        </div>
      </div>

      <div class="demo-section">
        <h3>Code</h3>
        <pre><code>{`import { ThemeProvider } from "solid-theme-provider";
import myThemes from "./themes.json";

<ThemeProvider label="Theme" themes={myThemes} />`}</code></pre>
      </div>

      <div class="demo-section">
        <h3>themes.json shape</h3>
        <pre><code>{`{
  "system_theme_config": {
    "dark": "humid_night",
    "light": "warm_light"
  },
  "themes": {
    "humid_night": {
      "config": { "browser_theme_color": "#110000" },
      "vars": {
        "background": "#110000",
        "foreground": "#ddddcc",
        "button_radius": "0.5em"
      }
    },
    "warm_light": { ... },
    "turtle": { ... }
  }
}`}</code></pre>
        <p class="note" style={{ "margin-top": "0.75rem" }}>
          <code>system_theme_config</code> maps <code>dark</code> / <code>light</code> to theme
          keys, so system preference auto-selects the right one. Every other key is a named theme.
        </p>
      </div>
    </main>
  );
}
