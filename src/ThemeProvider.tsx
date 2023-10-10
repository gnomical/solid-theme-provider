import { createEffect, createSignal } from "solid-js";
import fallbackStyles from "./fallbacks.module.scss";
import fallbackThemes from "./fallbacks.themes.json";
import { SystemThemesObject, ThemeProviderProps, ThemesObject } from "./lib/types";
import {
  CHEVRON_UP_ICON,
  SYSTEM_THEME_CONFIG_KEY,
  SYSTEM_THEME_KEY,
  UNKNOWN_ICON,
} from "./lib/constants";
import { themeHasBase64Icon } from "./lib/helpers";
import { Dropdown } from "./Dropdown";

export const [currentTheme, setTheme] = createSignal("initializing");

export function ThemeProvider(props: ThemeProviderProps) {
  const prefix = props.prefix || "stp-";
  const system_theme_config: SystemThemesObject =
    props.themes?.system_theme_config || fallbackThemes.system_theme_config;
  const themes: ThemesObject = props.themes?.themes || fallbackThemes.themes;
  const themeKeys = Object.keys(themes);
  const hasSystemThemesObject =
    props.themes && props.themes.hasOwnProperty(SYSTEM_THEME_CONFIG_KEY);
  const systemThemesCorrect =
    hasSystemThemesObject &&
    system_theme_config.hasOwnProperty("dark") &&
    system_theme_config.hasOwnProperty("light") &&
    themes.hasOwnProperty(system_theme_config.dark) &&
    themes.hasOwnProperty(system_theme_config.light);
  const styles = props.styles || fallbackStyles;
  const multiToggle = themeKeys.length > 2;
  const menu_placement = props.menu_placement || "se";

  const [dropdownOpen, setDropdownOpen] = createSignal(false);
  const [useSystem, setUseSystem] = createSignal(
    props.default ? false : systemThemesCorrect ? true : false
  );

  const systemThemeIsDark = window.matchMedia("(prefers-color-scheme: dark)");
  // initialize the current theme
  createEffect(() => {
    setTheme(props.default ||
      (systemThemesCorrect
        ? systemThemeIsDark.matches
          ? system_theme_config.dark
          : system_theme_config.light
        : themeKeys[0])
    );
  });

  // otherTheme is used when the button is in toggle mode (only two themes configured)
  const [otherTheme, setOtherTheme] = createSignal(
    systemThemesCorrect
      ? props.default
        ? props.default == system_theme_config.dark
          ? system_theme_config.light
          : system_theme_config.dark
        : systemThemeIsDark.matches
        ? system_theme_config.light
        : system_theme_config.dark
      : themeKeys[1]
  );
  const [currentSystem, setCurrentSystem] = createSignal(
    systemThemesCorrect
      ? systemThemeIsDark.matches
        ? system_theme_config.dark
        : system_theme_config.light
      : themeKeys[0]
  );

  systemThemeIsDark.addEventListener("change", e => {
    if (systemThemesCorrect) {
      if (useSystem()) {
        let nextTheme = system_theme_config.light;
        if (e.matches) {
          nextTheme = system_theme_config.dark;
        }
        setOtherTheme(currentTheme());
        setTheme(nextTheme);
      }
      if (e.matches) {
        setCurrentSystem(system_theme_config.dark);
      } else {
        setCurrentSystem(system_theme_config.light);
      }
    }
  });

  // inject the invert stylesheet
  createEffect(() => {
    let stylesheet = document.createElement("style");
    stylesheet.type = "text/css";
    stylesheet.id = "stp-inverter";
    document.head.appendChild(stylesheet);
  });

  // check themes for proper config
  createEffect(() => {
    if (!systemThemesCorrect) {
      console.warn(
        `The '${SYSTEM_THEME_CONFIG_KEY}' property of your themes object is misconfigured. Automatic theme toggling may not work and the 'System Preference' dropdown option has been disabled`
      );
      if (!hasSystemThemesObject) {
        console.warn(`Your themes object is missing the '${SYSTEM_THEME_CONFIG_KEY}' property.`);
        if (!props.default) {
          console.warn(
            `Because you have omitted the '${SYSTEM_THEME_CONFIG_KEY}' object and have not provided a default theme via props; Theme toggling will utilize the first two themes in your themes object.`
          );
        }
      } else {
        if (!system_theme_config.hasOwnProperty("dark")) {
          console.warn("The 'system_themes.dark' property of your themes object is undefined.");
        } else if (!themes.hasOwnProperty(system_theme_config.dark)) {
          console.warn(
            `The 'system_themes.dark' property of your themes object is misconfigured. The theme '${system_theme_config.dark}' cannot be found.`
          );
        }
        if (!system_theme_config.hasOwnProperty("light")) {
          console.warn("The 'system_themes.light' property of your themes object is undefined.");
        } else if (!themes.hasOwnProperty(system_theme_config.light)) {
          console.warn(
            `The 'system_themes.light' property of your themes object is misconfigured. The theme '${system_theme_config.light}' cannot be found.`
          );
        }
      }
    }
    for (let [themeName, settings] of Object.entries(themes)) {
      if (!settings.hasOwnProperty("vars")) {
        console.warn(
          `The '${themeName}' object is missing its 'vars' property. It has been removed from the available themes`
        );
      } else if (!settings.hasOwnProperty("config")) {
        console.warn(`The '${themeName}' theme object is missing its 'config' property.`);
      } else if (!settings.config.hasOwnProperty("icon")) {
        console.warn(
          `The '${themeName}.config' object is missing its 'icon' property. A fallback placeholder is being used instead.`
        );
      }
    }
  });

  createEffect(() => {
    // TODO: loop through properties of last theme and remove any that don't exist in the next theme

    // loop through the theme vars and inject them to the :root style element
    Object.keys(themes[currentTheme()].vars).forEach(name => {
      document.documentElement.style.setProperty(
        "--" + prefix + name,
        themes[currentTheme()].vars[name]
      );

      //if the current value is a hex color - add complementary transparencies
      let pattern = /^#[0-9A-F]{6}$/i;
      if (themes[currentTheme()].vars[name].match(pattern)) {
        document.documentElement.style.setProperty(
          "--" + prefix + name + "-alpha_primary",
          themes[currentTheme()].vars[name] + "f2" // 95%
        );
        document.documentElement.style.setProperty(
          "--" + prefix + name + "-alpha_secondary",
          themes[currentTheme()].vars[name] + "99" // 60%
        );
        document.documentElement.style.setProperty(
          "--" + prefix + name + "-alpha_tertiary",
          themes[currentTheme()].vars[name] + "4d" // 30%
        );
        document.documentElement.style.setProperty(
          "--" + prefix + name + "-alpha_quarternary",
          themes[currentTheme()].vars[name] + "17" // 9%
        );
      }
    });

    // find the theme-color meta tag and edit it, or, create a new one
    // <meta name="theme-color" content="#FFFFFF"></meta>
    let theme_meta = document.querySelector('meta[name="theme-color"]');
    if (
      themes[currentTheme()].hasOwnProperty("config") &&
      themes[currentTheme()].config.hasOwnProperty("browser_theme_color")
    ) {
      if (!theme_meta) {
        theme_meta = document.createElement("meta");
        theme_meta.setAttribute("name", "theme-color");
        document.getElementsByTagName("head")[0].appendChild(theme_meta);
      }
      theme_meta.setAttribute("content", themes[currentTheme()].config.browser_theme_color);
    } else {
      if (theme_meta) theme_meta.remove();
    }

    // add the browser theme color as a css variable
    document.documentElement.style.setProperty(
      "--" + prefix + "browser_theme_color",
      themes[currentTheme()].config.browser_theme_color
    );

    // find the stp-inverter stylesheet and edit it
    if (systemThemesCorrect) {
      let invertStylesheet = document.querySelector("#stp-inverter") as HTMLElement;
      if (invertStylesheet) {
        let currentlyDark = currentTheme() == system_theme_config.dark;
        let currentlyLight = currentTheme() == system_theme_config.light;

        if (currentlyDark) {
          invertStylesheet.innerText =
            'img[src$="#invert-safe--light"],.invert-safe--light{filter:hue-rotate(180deg) invert()}';
        } else if (currentlyLight) {
          invertStylesheet.innerText =
            'img[src$="#invert-safe--dark"],.invert-safe--dark{filter:hue-rotate(180deg) invert()}';
        }
      }
    }
  });

  function toggleTheme(nextTheme: string) {
    if (nextTheme == SYSTEM_THEME_KEY) {
      setUseSystem(true);
      setTheme(currentSystem());
    } else {
      setUseSystem(false);
      setOtherTheme(currentTheme());
      setTheme(nextTheme);
    }
    setDropdownOpen(false);
  }

  return (
    <div class={styles.component + " " + styles[menu_placement]} id={props.id}>
      <div
        class={styles.button + (dropdownOpen() ? " " + styles.open : "")}
        onMouseDown={multiToggle ? () => setDropdownOpen(true) : () => toggleTheme(otherTheme())}
      >
        {dropdownOpen() ? (
          <span class={styles.icon}>{CHEVRON_UP_ICON}</span>
        ) : themeHasBase64Icon(themes[multiToggle ? currentTheme() : otherTheme()]) ? (
          <span
            class={styles.icon}
            innerHTML={atob(themes[multiToggle ? currentTheme() : otherTheme()].config.icon)}
          />
        ) : (
          <span class={styles.icon}>{UNKNOWN_ICON}</span>
        )}
        {props.label && <span class={styles.text}>{props.label}</span>}
      </div>
      {dropdownOpen() && (
        <Dropdown
          styles={styles}
          allowSystemTheme={systemThemesCorrect}
          themes={themes}
          activeTheme={useSystem() ? SYSTEM_THEME_KEY : currentTheme()}
          toggleTheme={toggleTheme}
          setDropdownOpen={setDropdownOpen}
        />
      )}
    </div>
  );
}
