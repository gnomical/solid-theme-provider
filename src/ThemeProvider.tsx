import { createEffect, createSignal, For } from "solid-js";
import fallbackStyles from "./fallbacks.module.scss";
import fallbackThemes from "./fallbacks.themes.json";

type ThemeProviderProps = {
  default: string;
  label: string;
  prefix: string;
  styles: any;
  themes: any;
};

const SYSTEM_THEME_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.9 25.9">
    <path d="M7.95,24.88c-1.56-.68-2.94-1.61-4.13-2.81s-2.13-2.57-2.81-4.13-1.02-3.23-1.02-5,.34-3.43,1.02-5,1.61-2.94,2.81-4.13S6.39,1.69,7.95,1.02c1.56-.68,3.23-1.02,4.99-1.02s3.44,.34,5,1.02c1.57,.68,2.94,1.61,4.13,2.81s2.12,2.57,2.8,4.13c.68,1.56,1.02,3.23,1.02,5s-.34,3.43-1.02,5c-.68,1.56-1.61,2.94-2.8,4.13s-2.57,2.13-4.13,2.81c-1.56,.68-3.23,1.02-5,1.02s-3.43-.34-4.99-1.02ZM12.95,2.16c-1.49,0-2.89,.28-4.2,.83-1.31,.55-2.46,1.33-3.44,2.32-.99,.99-1.76,2.14-2.32,3.44s-.84,2.7-.84,4.2,.28,2.9,.83,4.2c.55,1.3,1.32,2.45,2.31,3.43,.99,.99,2.13,1.76,3.44,2.32,1.31,.56,2.71,.84,4.21,.84V2.16Z" />
  </svg>
);

const SYSTEM_THEME_KEY = "stp_system_theme";

export function ThemeProvider(props: ThemeProviderProps) {
  const prefix = props.prefix || "stp-";
  const themes = props.themes || fallbackThemes;
  const numThemes = Object.keys(themes).length - 1;
  const styles = props.styles || fallbackStyles;
  const multiToggle = numThemes > 2;

  const systemThemeIsDark = window.matchMedia("(prefers-color-scheme: dark)");
  const [currentTheme, setTheme] = createSignal(
    props.default || (systemThemeIsDark ? themes.system_themes.dark : themes.system_themes.light)
  );
  // otherTheme is used when the button is in toggle mode (only two themes configured)
  const [otherTheme, setOtherTheme] = createSignal(
    props.default
      ? props.default == themes.system_themes.dark
        ? themes.system_themes.light
        : themes.system_themes.dark
      : systemThemeIsDark
      ? themes.system_themes.light
      : themes.system_themes.dark
  );
  const [active, setActive] = createSignal(false);
  const [useSystem, setUseSystem] = createSignal(props.default ? false : true);
  const [currentSystem, setCurrentSystem] = createSignal(
    systemThemeIsDark ? themes.system_themes.dark : themes.system_themes.light
  );

  systemThemeIsDark.addEventListener("change", e => {
    if (useSystem()) {
      let nextTheme = themes.system_themes.light;
      if (e.matches) {
        nextTheme = themes.system_themes.dark;
      }
      setOtherTheme(currentTheme());
      setTheme(nextTheme);
    }
    if (e.matches) {
      setCurrentSystem(themes.system_themes.dark);
    } else {
      setCurrentSystem(themes.system_themes.light);
    }
  });

  createEffect(() => {
    Object.keys(themes[currentTheme()].vars).forEach(name => {
      document.documentElement.style.setProperty(
        "--" + prefix + name,
        themes[currentTheme()].vars[name]
      );
    });
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
    setActive(false);
  }

  function toggleDropdown() {
    setActive(!active());
  }

  return (
    <div class={styles.component}>
      <div
        class={styles.button + (active() ? " " + styles.open : "")}
        onClick={multiToggle ? () => toggleDropdown() : () => toggleTheme(otherTheme())}
      >
        <span
          class={styles.icon}
          innerHTML={atob(themes[multiToggle ? currentTheme() : otherTheme()].config.icon)}
        />
        {props.label && <span class={styles.text}>{props.label}</span>}
      </div>
      {active() && (
        <div class={styles.dropdown}>
          <div
            class={useSystem() ? styles.active : ""}
            onClick={() => toggleTheme(SYSTEM_THEME_KEY)}
          >
            <span class={styles.icon}>{SYSTEM_THEME_ICON}</span>
            <span class={styles.text}>System Theme</span>
          </div>
          <For
            each={Object.keys(themes).filter(key => key != "system_themes")}
            fallback={<div>Loading...</div>}
          >
            {themeName => {
              let themeLabel = themeName
                .split("_")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              return (
                <div
                  class={!useSystem() && currentTheme() == themeName ? styles.active : ""}
                  onClick={() => toggleTheme(themeName)}
                >
                  <span class={styles.icon} innerHTML={atob(themes[themeName].config.icon)} />
                  <span class={styles.text}>{themeLabel}</span>
                </div>
              );
            }}
          </For>
        </div>
      )}
    </div>
  );
}
