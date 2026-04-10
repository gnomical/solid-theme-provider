import { createContext, createEffect, createSignal, onCleanup, onMount, useContext } from "solid-js"
import fallbackThemes from "../fallbacks.themes.json"
import {
  SystemThemesObject,
  ThemeContextValue,
  ThemeProviderProps,
  ThemeVars,
  ThemesObject,
} from "../lib/types"
import { SYSTEM_THEME_CONFIG_KEY, SYSTEM_THEME_KEY } from "../lib/constants"

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const defaultCalculateVariants = (name: string, value: string): ThemeVars => {
  const pattern = /^#[0-9A-F]{6}$/i
  if (value.match(pattern)) {
    return {
      [name + "-alpha_primary"]: value + "f2", // 95%
      [name + "-alpha_secondary"]: value + "99", // 60%
      [name + "-alpha_tertiary"]: value + "4d", // 30%
      [name + "-alpha_quaternary"]: value + "17", // 9%
      // allow for misspelled 'quarternary' for backwards compatibility
      [name + "-alpha_quarternary"]: value + "17", // 9%
    }
  }
  return {}
}

export function ThemeProvider(props: ThemeProviderProps) {
  const prefix = props.prefix || "stp-"
  const system_theme_config: SystemThemesObject =
    props.themes?.system_theme_config || fallbackThemes.system_theme_config
  const themes: ThemesObject = props.themes?.themes || fallbackThemes.themes
  const themeKeys = Object.keys(themes)
  const hasSystemThemesObject =
    !props.themes || props.themes.hasOwnProperty(SYSTEM_THEME_CONFIG_KEY)
  const systemThemesCorrect =
    hasSystemThemesObject &&
    system_theme_config.hasOwnProperty("dark") &&
    system_theme_config.hasOwnProperty("light") &&
    themes.hasOwnProperty(system_theme_config.dark) &&
    themes.hasOwnProperty(system_theme_config.light)
  const calculateVariants = props.calculateVariants || defaultCalculateVariants

  const [useSystem, setUseSystem] = createSignal(
    props.default ? false : systemThemesCorrect ? true : false,
  )

  // Deterministic initial state: props.default, or light as a safe SSR fallback.
  // System preference is applied in onMount to avoid SSR/hydration mismatch.
  const initialTheme =
    props.default || (systemThemesCorrect ? system_theme_config.light : themeKeys[0])

  const [currentTheme, setTheme] = createSignal(initialTheme)
  const [currentSystem, setCurrentSystem] = createSignal(
    systemThemesCorrect ? system_theme_config.light : themeKeys[0],
  )

  onMount(() => {
    const systemThemeIsDark = window.matchMedia("(prefers-color-scheme: dark)")
    const systemIsDark = systemThemeIsDark.matches

    // Apply actual system preference now that we're on the client
    if (!props.default && systemThemesCorrect) {
      const resolvedTheme = systemIsDark ? system_theme_config.dark : system_theme_config.light
      setTheme(resolvedTheme)
      setCurrentSystem(resolvedTheme)
    }

    const handler = (e: MediaQueryListEvent) => {
      if (systemThemesCorrect) {
        if (useSystem()) {
          const nextTheme = e.matches ? system_theme_config.dark : system_theme_config.light
          setTheme(nextTheme)
        }
        setCurrentSystem(e.matches ? system_theme_config.dark : system_theme_config.light)
      }
    }
    systemThemeIsDark.addEventListener("change", handler)
    onCleanup(() => systemThemeIsDark.removeEventListener("change", handler))
  })

  // inject the invert stylesheet
  createEffect(() => {
    let stylesheet = document.createElement("style")
    stylesheet.type = "text/css"
    stylesheet.id = "stp-inverter"
    document.head.appendChild(stylesheet)
  })

  // check themes for proper config
  createEffect(() => {
    if (!systemThemesCorrect) {
      console.warn(
        `The '${SYSTEM_THEME_CONFIG_KEY}' property of your themes object is misconfigured. Automatic theme toggling may not work and the 'System Preference' dropdown option has been disabled`,
      )
      if (!hasSystemThemesObject) {
        console.warn(`Your themes object is missing the '${SYSTEM_THEME_CONFIG_KEY}' property.`)
        if (!props.default) {
          console.warn(
            `Because you have omitted the '${SYSTEM_THEME_CONFIG_KEY}' object and have not provided a default theme via props; Theme toggling will utilize the first two themes in your themes object.`,
          )
        }
      } else {
        if (!system_theme_config.hasOwnProperty("dark")) {
          console.warn("The 'system_themes.dark' property of your themes object is undefined.")
        } else if (!themes.hasOwnProperty(system_theme_config.dark)) {
          console.warn(
            `The 'system_themes.dark' property of your themes object is misconfigured. The theme '${system_theme_config.dark}' cannot be found.`,
          )
        }
        if (!system_theme_config.hasOwnProperty("light")) {
          console.warn("The 'system_themes.light' property of your themes object is undefined.")
        } else if (!themes.hasOwnProperty(system_theme_config.light)) {
          console.warn(
            `The 'system_themes.light' property of your themes object is misconfigured. The theme '${system_theme_config.light}' cannot be found.`,
          )
        }
      }
    }
    for (const [themeName, settings] of Object.entries(themes)) {
      if (!settings.hasOwnProperty("vars")) {
        console.warn(
          `The '${themeName}' object is missing its 'vars' property. It has been removed from the available themes`,
        )
      } else if (!settings.hasOwnProperty("config")) {
        console.warn(`The '${themeName}' theme object is missing its 'config' property.`)
      }
    }
  })

  createEffect(() => {
    if (!themes[currentTheme()]) return

    // loop through the theme vars and inject them to the :root style element
    Object.keys(themes[currentTheme()].vars).forEach(name => {
      document.documentElement.style.setProperty(
        "--" + prefix + name,
        themes[currentTheme()].vars[name],
      )

      // calculate any variants and inject them to the :root style element
      const variants = calculateVariants(name, themes[currentTheme()].vars[name])
      Object.keys(variants).forEach(variant => {
        document.documentElement.style.setProperty("--" + prefix + variant, variants[variant])
      })
    })

    // find the theme-color meta tag and edit it, or, create a new one
    let theme_meta = document.querySelector('meta[name="theme-color"]')
    if (themes[currentTheme()].config?.browser_theme_color) {
      if (!theme_meta) {
        theme_meta = document.createElement("meta")
        theme_meta.setAttribute("name", "theme-color")
        document.getElementsByTagName("head")[0].appendChild(theme_meta)
      }
      theme_meta.setAttribute("content", themes[currentTheme()].config.browser_theme_color!)
    } else {
      if (theme_meta) theme_meta.remove()
    }

    // add the browser theme color as a css variable
    if (themes[currentTheme()].config.browser_theme_color) {
      document.documentElement.style.setProperty(
        "--" + prefix + "browser_theme_color",
        themes[currentTheme()].config.browser_theme_color!,
      )
    }

    // find the stp-inverter stylesheet and edit it
    if (systemThemesCorrect) {
      const invertStylesheet = document.querySelector("#stp-inverter") as HTMLElement
      if (invertStylesheet) {
        const currentlyDark = currentTheme() == system_theme_config.dark
        const currentlyLight = currentTheme() == system_theme_config.light

        if (currentlyDark) {
          invertStylesheet.innerText =
            'img[src$="#invert-safe--light"],.invert-safe--light{filter:hue-rotate(180deg) invert()}'
        } else if (currentlyLight) {
          invertStylesheet.innerText =
            'img[src$="#invert-safe--dark"],.invert-safe--dark{filter:hue-rotate(180deg) invert()}'
        }
      }
    }
  })

  const contextValue: ThemeContextValue = {
    currentTheme,
    setTheme,
    themes,
    themeKeys,
    systemThemeConfig: system_theme_config,
    systemThemesCorrect,
    useSystem,
    setUseSystem,
    currentSystem,
    prefix,
  }

  return <ThemeContext.Provider value={contextValue}>{props.children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (ctx === undefined) {
    throw new Error("useTheme must be used inside a ThemeProvider")
  }
  return ctx
}
