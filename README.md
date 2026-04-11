# solid-theme-provider

[![npm version](https://img.shields.io/npm/v/solid-theme-provider)](https://www.npmjs.org/package/solid-theme-provider)
[![npm downloads](https://img.shields.io/npm/dt/solid-theme-provider)](https://www.npmjs.org/package/solid-theme-provider)
[![bundle size](https://img.shields.io/bundlephobia/minzip/solid-theme-provider)](https://bundlephobia.com/package/solid-theme-provider)
[![license](https://img.shields.io/npm/l/solid-theme-provider)](./LICENSE)

A SolidJS theme provider that injects CSS variables into `:root` on theme switch, with built-in UI components and automatic system preference detection.

**[Live Demo →](https://gnomical.github.io/solid-theme-provider)**

## Installation

```bash
npm install solid-theme-provider
```

## Quick Start

Wrap your app in `ThemeProvider` and place `ThemeToggle` or `ThemePicker` anywhere inside it. No configuration required — it detects system light/dark preference automatically.

```jsx
import { ThemeProvider, ThemeToggle } from "solid-theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      <nav>
        <ThemeToggle label="Toggle Theme" />
      </nav>
    </ThemeProvider>
  );
}
```

## UI Components

### `ThemeToggle`

Toggles between the defined default light and dark themes.

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` | — |
| `classList` | `Record<string, boolean>` | — |

### `ThemePicker`

Opens a dropdown listing all available themes as well as a "Match System" setting.

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` | `"Theme"` |
| `menuPlacement` | `"ne" \| "se" \| "sw" \| "nw"` | `"se"` |
| `classList` | `Record<string, boolean>` | — |

## ThemeProvider Props

| Prop | Type | Default |
| --- | --- | --- |
| `themes` | `ThemesConfig` | built-in light/dark |
| `default` | `string` | system preference |
| `prefix` | `string` | `"stp-"` |
| `calculateVariants` | `(name, value) => ThemeVars` | hex alpha variants |

## CSS Variables

The built-in themes inject these variables into `:root`:

```css
--stp-background
--stp-foreground
--stp-button_radius
```

Use them in your own stylesheets to adopt the theme globally:

```css
body, html {
  background: var(--stp-background);
  color: var(--stp-foreground);
}
```

### Alpha Variants

Any hex color variable automatically generates four transparent variants:

| Suffix | Opacity |
| --- | --- |
| `-alpha-primary` | 95% |
| `-alpha-secondary` | 60% |
| `-alpha-tertiary` | 30% |
| `-alpha-quaternary` | 9% |

For example, `--stp-foreground` generates `--stp-foreground-alpha-quaternary`, useful for subtle hover states and borders.

## Custom Themes

```jsx
import { ThemeProvider, ThemePicker } from "solid-theme-provider";
import type { ThemesConfig } from "solid-theme-provider";

const themes: ThemesConfig = {
  systemThemes: { dark: "ember_night", light: "warm_light" },
  themes: {
    ember_night: {
      config: { browserThemeColor: "#110000" },
      vars: { background: "#110000", foreground: "#ddddcc", button_radius: "0.5em" },
    },
    warm_light: {
      config: { browserThemeColor: "#f1efe5" },
      vars: { background: "#fffff5", foreground: "#111100", button_radius: "0.5em" },
    },
  },
};

<ThemeProvider themes={themes}>
  <ThemePicker />
</ThemeProvider>
```

> **Note:** Only one `ThemeProvider` should exist in your app. The snippet above is illustrative — in practice, `themes` is passed to the one and only provider you should have, the provider that wraps your app.

`systemThemes` maps which of your themes should be applied when following system light/dark preference. See the [Custom Themes demo](https://gnomical.github.io/solid-theme-provider/custom-themes) for a full example.

### Theme Config Options

Each theme can include an optional `config` object:

| Field | Type | Description |
| --- | --- | --- |
| `label` | `string` | Display name in the picker (defaults to title-cased key) |
| `icon` | `() => JSX.Element` | Icon shown in the picker |
| `browserThemeColor` | `string` | Sets `<meta name="theme-color">` |

## Advanced Usage

`useTheme()` exposes the full context for driving theme state from your own code:

```jsx
import { useTheme } from "solid-theme-provider";

function MyComponent() {
  const { currentTheme, setTheme, themes } = useTheme();

  return <div>Current theme: {currentTheme()}</div>;
}
```

See the [Advanced demo](https://gnomical.github.io/solid-theme-provider/advanced) for more examples including `setThemesConfig` for runtime theme config updates.

## Image Inversion

The provider injects styles that automatically invert images when the opposing system theme is active. See the [Image Invert demo](https://gnomical.github.io/solid-theme-provider/image-invert) for full usage details.

```html
<!-- Invert when dark theme is active -->
<img class="invert-safe--light" src="..." />

<!-- Invert when light theme is active -->
<img class="invert-safe--dark" src="..." />

<!-- Also works via URL fragment -->
<img src="./logo.png#invert-safe--light" />
```
