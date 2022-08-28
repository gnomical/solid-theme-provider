import { createEffect, createSignal, For } from "solid-js";
import fallbackStyles from "./fallbacks.module.scss";
import fallbackThemes from "./fallbacks.themes.json";

type ThemeConfig = {
  icon: string;
  browser_theme_color: string;
};

type ThemeVars = {
  [key: string]: string;
};

type ThemeObject = {
  config: ThemeConfig;
  vars: ThemeVars;
};

type SystemThemesObject = {
  dark: string;
  light: string;
}

type ThemesObject = {
  [key: string]: ThemeObject;
};

type ThemesConfigObject = {
  system_theme_config: SystemThemesObject;
  themes: ThemesObject;
};

type ThemeProviderProps = {
  default?: string;
  id?: string;
  label?: string;
  prefix?: string;
  styles?: any;
  themes?: ThemesConfigObject;
};

const SYSTEM_THEME_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.9 25.9">
    <path d="M7.95,24.88c-1.56-.68-2.94-1.61-4.13-2.81s-2.13-2.57-2.81-4.13-1.02-3.23-1.02-5,.34-3.43,1.02-5,1.61-2.94,2.81-4.13S6.39,1.69,7.95,1.02c1.56-.68,3.23-1.02,4.99-1.02s3.44,.34,5,1.02c1.57,.68,2.94,1.61,4.13,2.81s2.12,2.57,2.8,4.13c.68,1.56,1.02,3.23,1.02,5s-.34,3.43-1.02,5c-.68,1.56-1.61,2.94-2.8,4.13s-2.57,2.13-4.13,2.81c-1.56,.68-3.23,1.02-5,1.02s-3.43-.34-4.99-1.02ZM12.95,2.16c-1.49,0-2.89,.28-4.2,.83-1.31,.55-2.46,1.33-3.44,2.32-.99,.99-1.76,2.14-2.32,3.44s-.84,2.7-.84,4.2,.28,2.9,.83,4.2c.55,1.3,1.32,2.45,2.31,3.43,.99,.99,2.13,1.76,3.44,2.32,1.31,.56,2.71,.84,4.21,.84V2.16Z" />
  </svg>
);

const CHEVRON_UP_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.45 14.33">
    <path d="M11.73,.44c.27-.29,.61-.44,1-.44,.19,0,.36,.04,.54,.12,.17,.08,.32,.19,.45,.32l11.34,11.6c.26,.25,.4,.57,.4,.95,0,.25-.06,.48-.18,.68s-.28,.36-.48,.48c-.2,.12-.43,.18-.68,.18-.39,0-.71-.13-.95-.38L11.94,2.49h1.57L2.28,13.94c-.23,.25-.55,.38-.95,.38-.25,0-.48-.06-.68-.18s-.36-.28-.48-.48c-.12-.2-.18-.43-.18-.68,0-.19,.03-.36,.1-.53s.17-.31,.29-.42L11.73,.44Z" />
  </svg>
);

const SYSTEM_THEME_KEY = "stp_system_theme";
const SYSTEM_THEME_CONFIG_KEY = "system_theme_config";


export function ThemeProvider(props: ThemeProviderProps) {
  const prefix = props.prefix || "stp-";
  const system_theme_config: SystemThemesObject = props.themes?.system_theme_config || fallbackThemes.system_theme_config;
  const themes: ThemesObject = props.themes?.themes || fallbackThemes.themes;
  const themeKeys = Object.keys(themes);
  const hasSystemThemesObject = props.themes && props.themes.hasOwnProperty(SYSTEM_THEME_CONFIG_KEY);
  const systemThemesCorrect =
    hasSystemThemesObject &&
    system_theme_config.hasOwnProperty("dark") &&
    system_theme_config.hasOwnProperty("light") &&
    themes.hasOwnProperty(system_theme_config.dark) &&
    themes.hasOwnProperty(system_theme_config.light);
  const numThemes = themeKeys.length - 1;
  const styles = props.styles || fallbackStyles;
  const multiToggle = numThemes > 2;

  const [active, setActive] = createSignal(false);
  const [useSystem, setUseSystem] = createSignal(
    props.default ? false : systemThemesCorrect ? true : false
  );

  const systemThemeIsDark = window.matchMedia("(prefers-color-scheme: dark)");
  const [currentTheme, setTheme] = createSignal(
    props.default ||
      (systemThemesCorrect
        ? systemThemeIsDark
          ? system_theme_config.dark
          : system_theme_config.light
        : themeKeys[0])
  );
  // otherTheme is used when the button is in toggle mode (only two themes configured)
  const [otherTheme, setOtherTheme] = createSignal(
    systemThemesCorrect
      ? props.default
        ? props.default == system_theme_config.dark
          ? system_theme_config.light
          : system_theme_config.dark
        : systemThemeIsDark
        ? system_theme_config.light
        : system_theme_config.dark
      : themeKeys[1]
  );
  const [currentSystem, setCurrentSystem] = createSignal(
    systemThemesCorrect
      ? systemThemeIsDark
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
    stylesheet.type = 'text/css';
    stylesheet.id = 'stp-inverter';
    document.head.appendChild(stylesheet);
  })

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
      if(themes[currentTheme()].vars[name].match(pattern)) {
        document.documentElement.style.setProperty(
          "--" + prefix + name + '-alpha_primary',
          themes[currentTheme()].vars[name] + 'f2' // 95%
        );
        document.documentElement.style.setProperty(
          "--" + prefix + name + '-alpha_secondary',
          themes[currentTheme()].vars[name] + '99' // 60%
        );
        document.documentElement.style.setProperty(
          "--" + prefix + name + '-alpha_tertiary',
          themes[currentTheme()].vars[name] + '4d' // 30%
        );
        document.documentElement.style.setProperty(
          "--" + prefix + name + '-alpha_quarternary',
          themes[currentTheme()].vars[name] + '17' // 9%
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

    // find the stp-inverter stylesheet and edit it
    if(systemThemesCorrect) {
      let invertStylesheet = document.querySelector('#stp-inverter') as HTMLElement;
      if(invertStylesheet) {
        let currentlyDark = currentTheme() == system_theme_config.dark;
        let currentlyLight = currentTheme() == system_theme_config.light;

        if (currentlyDark) {
          invertStylesheet.innerText = '.invert-safe--light{filter:invert()}';
        } else if (currentlyLight) {
          invertStylesheet.innerText = '.invert-safe--dark{filter:invert()}';
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
    setActive(false);
  }

  function toggleDropdown() {
    setActive(!active());
  }

  function themeHasBase64Icon(theme: ThemeObject) {
    if (theme.hasOwnProperty("config")) {
      if (theme.config.hasOwnProperty("icon")) {
        let base64Pattern = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        return theme.config.icon.match(base64Pattern) !== null;
      }
    }
    return false;
  }

  function UNKNOWN_ICON() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.61 21.5">
        <path d="M3.43,.26c.79-.17,1.66-.26,2.61-.26h.14V1.89h-.21c-.62,0-1.22,.05-1.81,.16s-1.06,.34-1.41,.7c-.35,.35-.58,.82-.69,1.4s-.16,1.18-.16,1.8v.19H0v-.12c0-.95,.09-1.82,.26-2.61S.8,1.95,1.37,1.38,2.63,.43,3.43,.26ZM0,7.75H1.89v6.01H0V7.75Zm.25,10.34c-.17-.79-.25-1.67-.25-2.64v-.08H1.89v.21c0,.61,.05,1.2,.16,1.78s.34,1.04,.69,1.4c.36,.35,.83,.58,1.41,.7s1.17,.17,1.78,.17h.25v1.89h-.12c-.96,0-1.84-.09-2.63-.26s-1.48-.55-2.06-1.12c-.58-.57-.95-1.25-1.12-2.04Zm9.39-5.85v-.15c0-.58,.14-1.04,.42-1.39s.63-.67,1.05-.96c.52-.36,.9-.67,1.15-.92s.38-.58,.38-.98c0-.45-.16-.81-.48-1.08s-.75-.42-1.29-.42c-.26,0-.5,.04-.72,.13s-.42,.21-.6,.37-.34,.35-.48,.58l-.21,.28c-.1,.14-.22,.25-.36,.34s-.3,.13-.5,.13-.38-.07-.55-.21-.26-.34-.26-.6c0-.1,0-.2,.02-.29s.04-.19,.07-.28c.16-.54,.56-1.01,1.2-1.42s1.46-.62,2.47-.62c.66,0,1.28,.12,1.84,.35s1.02,.57,1.37,1.01,.52,.99,.52,1.64c0,.7-.18,1.26-.55,1.66s-.83,.8-1.39,1.17c-.41,.27-.72,.53-.91,.77s-.29,.52-.29,.85v.14c0,.23-.08,.42-.25,.59s-.4,.25-.69,.25c-.62,0-.94-.31-.94-.93ZM7.78,0h6.05V1.89H7.78V0Zm0,19.62h6.05v1.89H7.78v-1.89Zm1.89-3.32c-.25-.24-.38-.53-.38-.86s.12-.62,.37-.86,.54-.36,.88-.36,.64,.12,.89,.35,.38,.52,.38,.87-.12,.63-.38,.87-.55,.35-.89,.35-.63-.12-.88-.36ZM21.35,3.42c.17,.79,.26,1.67,.26,2.64v.08h-1.89v-.22c0-.6-.05-1.19-.16-1.76s-.34-1.04-.7-1.4-.82-.58-1.4-.7-1.17-.17-1.78-.17h-.26V0h.12c.97,0,1.85,.08,2.64,.25s1.48,.54,2.06,1.13,.94,1.25,1.11,2.03Zm-3.17,17.83c-.79,.17-1.67,.26-2.64,.26h-.12v-1.89h.26c.6,0,1.19-.06,1.78-.17s1.05-.35,1.4-.7c.35-.36,.58-.83,.7-1.4s.17-1.17,.17-1.78v-.21h1.89v.08c0,.97-.09,1.85-.26,2.64s-.54,1.47-1.11,2.04-1.26,.95-2.06,1.12Zm1.54-13.5h1.89v6.01h-1.89V7.75Z" />
      </svg>
    );
  }

  return (
    <div class={styles.component} id={props.id}>
      <div
        class={styles.button + (active() ? " " + styles.open : "")}
        onClick={multiToggle ? () => toggleDropdown() : () => toggleTheme(otherTheme())}
      >
        {active() ? (
          <span class={styles.icon}>{CHEVRON_UP_ICON}</span>
        ) : themeHasBase64Icon(themes[multiToggle ? currentTheme() : otherTheme()]) ? (
          <span
            class={styles.icon}
            innerHTML={atob(themes[multiToggle ? currentTheme() : otherTheme()].config.icon)}
          />
        ) : (
          <span class={styles.icon}>{UNKNOWN_ICON()}</span>
        )}
        {props.label && <span class={styles.text}>{props.label}</span>}
      </div>
      {active() && (
        <div class={styles.dropdown}>
          {systemThemesCorrect && (
            <div
              class={useSystem() ? styles.active : ""}
              onClick={() => toggleTheme(SYSTEM_THEME_KEY)}
            >
              <span class={styles.icon}>{SYSTEM_THEME_ICON}</span>
              <span class={styles.text}>System Preference</span>
            </div>
          )}
          <For
            each={Object.keys(themes).filter(key => {
              return key != SYSTEM_THEME_CONFIG_KEY && themes[key].hasOwnProperty("vars");
            })}
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
                  {themeHasBase64Icon(themes[themeName]) ? (
                    <span class={styles.icon} innerHTML={atob(themes[themeName].config.icon)} />
                  ) : (
                    <span class={styles.icon}>{UNKNOWN_ICON}</span>
                  )}
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
