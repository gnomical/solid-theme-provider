# Solid Theme Provider

Lightweight component that allows for theme switching by injecting css variables into the document's root element.

This component also provides a simple UI for handling click to toggle interactions. It will default to the users system theme (light vs dark) and then allow the user to toggle with a button press.

The theme variables as well as the UI styles are able to be overridden.

## Installation

```bash
npm install solid-theme-provider
```

## Usage

#### Props:

- **label** - string  
  a text label that will display inside the theme toggle button.
- **prefix** - string  
  override the css variable prefix. defaults to 'stp-'.
- **styles** - style object  
  override the styles that get applied to the toggle button.
- **themes** - json  
  override the default variables that will be injected to the document's root element styles upon theme switching

#### Component:

`<ThemeProvider>` serves as both the UI handle and the receiver of the themes json which will control the themes available for switching

```jsx
// Example with a modified label, custom themes, and custom button style
import { ThemeProvider } from 'solid-theme-provider';
import myThemes from './themes.json';
import buttonStyles from './customThemesButton.css';

<ThemeProvider
  label="Toggle Theme"
  themes={myThemes}
  styles={buttonStyles}
>
```

### Custom Themes

Example Themes JSON:

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
      "b_rad": "0.1em",
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
      "border_radius": "0.5em",
      "foreground": "#111100",
      "muted": "#777755"
    }
  }
}
```

**system_themes**:  
this object represents which of the themes listed in your root object should be used applied when accomodating system settings for theme preference

**all other root objects**:  
Everything else is keyed by the theme name. If/when presented in the UI they will have their first first letters capitalized and underscores converted to spaces

> **config:**  
> For now the only config per theme is an icon. This is presented within the toggle button to represent which theme will be applied if the button is clicked.

> **vars**  
> each property within this object becomes the variables that are injected into the document's root element styles. the keyname becomes the variable name after being combined with the prefix. For example, `background` would be combined with the default prefix to become the css variable `--stp-background`. You can store any value within these variables that would normally be accepted by the CSS standard.

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
