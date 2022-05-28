# Solid Theme Provider

Lightweight component that allows for theme switching by injecting css variables into the document's root element.

![Example of UI with no configuration](https://github.com/gnomical/solid-theme-provider/blob/assets/minimum_ui.gif?raw=true)

## Features

- Auto detect system theme (light vs dark)
- click to toggle theme
- dropdown list when more than 2 themes configured
- fully customizable

## Installation

```bash
npm install solid-theme-provider
```

## Usage

#### Props:

- **default** - string
  the key of the theme that should be set upon first load. defaults to 'system'.
- **label** - string  
  a text label that will display inside the theme toggle button.
  > defaults to an empty string
- **prefix** - string  
  override the css variable prefix. 
  > defaults to 'stp-'.
- **styles** - style object  
  override the styles that get applied to the toggle button.
- **themes** - json  
  override the default variables that will be injected to the document's root element styles upon theme switching

#### Component:

`<ThemeProvider>` serves as both the UI handle and the receiver of the themes json which will control the themes available for switching

```jsx
// Example with a modified label
import { ThemeProvider } from 'solid-theme-provider';

<ThemeProvider label="Toggle Theme">
```

![Example of UI with custom label](https://github.com/gnomical/solid-theme-provider/blob/assets/label_ui.gif?raw=true)

## Custom Themes

```jsx
// Example with more themes configured
import { ThemeProvider } from 'solid-theme-provider';
import myThemes from './themes.json';

<ThemeProvider 
  label="Toggle Theme"
  themes={myThemes}
>
```

![Example of UI with custom label](https://github.com/gnomical/solid-theme-provider/blob/assets/dropdown_ui.gif?raw=true)

Example themes.json:

```json
{
  "system_themes": {
    "dark": "humid_night",
    "light": "warm_light"
  },
  "humid_night": {
    "config": {
      "icon": "base64 encoded svg or html"
    },
    "vars": {
      "background": "#110000",
      "background_active": "#221919",
      "border_radius": "0.25em",
      "foreground": "#ddddcc",
      "muted": "#999988"
    }
  },
  "warm_light": {
    "config": {
      "icon": "base64 encoded svg or html"
    },
    "vars": {
      "background": "#ffffee",
      "background_active": "#f3eedd",
      "border_radius": "0.25em",
      "foreground": "#111100",
      "muted": "#777755"
    }
  },
  "turtle": {
    "config": {

    },
    "vars": {
      "background": "#115522",
      "background_active": "#226633",
      "border_radius": "1em",
      "foreground": "#eeffee",
      "muted": "#ddcccc"
    }
  }
}
```

**system_themes**:  
this object represents which of the themes listed in your root object should be used applied when accommodating system settings for theme preference

**all other root objects**:  
Everything else is keyed by the theme name. If/when presented in the UI they will have their first first letters capitalized and underscores converted to spaces

> **config:**  
> For now the only config per theme is an icon. This is presented within the toggle button to represent which theme will be applied if the button is clicked.

> **vars**  
> each property within this object becomes the variables that are injected into the document's root element styles. the key name becomes the variable name after being combined with the prefix. For example, `background` would be combined with the default prefix to become the css variable `--stp-background`. You can store any value within these variables that would normally be accepted by the CSS standard.

## Custom Styles

```scss
// Example Button Styling
.button {
  cursor: pointer;
  display: inline-block;
  padding: 0.25em 0.5em;
  border-radius: var(--stp-border_radius);
  background: var(--stp-background);
  color: var(--stp-muted);
  vertical-align: top;

  .icon,
  .text {
    vertical-align: middle;
    display: inline-block;
    -webkit-user-select: none;
    user-select: none;
  }

  .icon {
    padding-top: 0.2em;
  }

  .text:not(:empty) {
    padding-left: 0.25em;
  }

  .icon svg {
    width: 1.5em;
    fill: var(--stp-muted);
  }

  &:hover {
    background: var(--stp-background_active);
    color: var(--stp-foreground);

    .icon svg {
      fill: var(--stp-foreground);
    }
  }
}
```

Note that the styles used to override the toggle button can also leverage the theme variables. As can anything else in your project.
