import { onCleanup, onMount } from "solid-js"
import { Title } from "@solidjs/meta"
import { ThemePicker, useTheme } from "solid-theme-provider"
import { CodeBlock } from "../components/CodeBlock"
import { customThemes } from "../data/custom-themes"

export default function CustomThemes() {
  const ctx = useTheme()

  onMount(() => {
    const previous = { systemThemes: ctx.systemThemes(), themes: ctx.themes() }
    ctx.setThemesConfig(customThemes)
    onCleanup(() => ctx.setThemesConfig(previous))
  })

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
        </div>
        <p class="note">
          3 custom themes: Ember Night, Warm Light, and Trusty Turtle
        </p>
      </div>

      <div class="demo-section">
        <h3>Code</h3>
        <CodeBlock code={`import { ThemeProvider, ThemePicker } from "solid-theme-provider";
import { myThemes } from "./themes";

export default function App() {
  return (
    <ThemeProvider themes={myThemes}>
      <nav>
        <ThemePicker label="Theme" />
      </nav>
    </ThemeProvider>
  )
}`} />
      </div>

      <div class="demo-section">
        <h3>themes.tsx</h3>
        <CodeBlock code={`import type { ThemesConfig } from "solid-theme-provider";

export const myThemes: ThemesConfig = {
  systemThemes: {
    dark: "ember_night",
    light: "warm_light",
  },
  themes: {
    ember_night: { ... },
    warm_light: { ... },
    turtle: {
      config: {
        label: "Trusty Turtle",
        browserThemeColor: "#115522",
        icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z"/>
            <path d="M4.82 7.9 8 10"/>
            <path d="M15.18 7.9 12 10"/>
            <path d="M16.93 10H20a2 2 0 0 1 0 4H2"/>
          </svg>
        ),
      },
      vars: {
        background: "#115522",
        foreground: "#eeffee",
        button_radius: "1.2em",
      },
    },
  },
};`} />
        <p>
          The <code>icon</code> field accepts a function returning a JSX element, so it can be
          rendered multiple times without DOM conflicts. Use a <code>.tsx</code> file to define
          your themes when using icons.
        </p>
      </div>
    </main>
  )
}
