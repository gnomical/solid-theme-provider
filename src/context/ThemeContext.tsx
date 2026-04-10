import { createContext, createEffect, createSignal, onCleanup, onMount, useContext } from "solid-js"
import { fallbackThemes } from "../fallbacks.themes"
import {
  SystemThemesObject,
  ThemeContextValue,
  ThemeProviderProps,
  ThemeVars,
  ThemesObject,
} from "../lib/types"
import { SYSTEM_THEME_KEY } from "../lib/constants"

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const CSS_VAR_NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9_-]*$/

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
  const systemThemes: SystemThemesObject | undefined =
    props.themes?.systemThemes ?? fallbackThemes.systemThemes
  const themes: ThemesObject = props.themes?.themes ?? fallbackThemes.themes
  const themeKeys = Object.keys(themes)

  const hasSystemThemes = !!systemThemes
  const systemThemesCorrect =
    hasSystemThemes &&
    systemThemes.hasOwnProperty("dark") &&
    systemThemes.hasOwnProperty("light") &&
    themes.hasOwnProperty(systemThemes.dark) &&
    themes.hasOwnProperty(systemThemes.light)

  const calculateVariants = props.calculateVariants || defaultCalculateVariants

  const [useSystem, setUseSystem] = createSignal(
    props.default ? false : systemThemesCorrect ? true : false,
  )

  // Deterministic initial state: props.default, or light as a safe SSR fallback.
  // System preference is applied in onMount to avoid SSR/hydration mismatch.
  const initialTheme =
    props.default || (systemThemesCorrect ? systemThemes!.light : themeKeys[0])

  const [currentTheme, setTheme] = createSignal(initialTheme)
  const [currentSystem, setCurrentSystem] = createSignal(
    systemThemesCorrect ? systemThemes!.light : themeKeys[0],
  )

  onMount(() => {
    const systemThemeIsDark = window.matchMedia("(prefers-color-scheme: dark)")
    const systemIsDark = systemThemeIsDark.matches

    // Apply actual system preference now that we're on the client
    if (!props.default && systemThemesCorrect) {
      const resolvedTheme = systemIsDark ? systemThemes!.dark : systemThemes!.light
      setTheme(resolvedTheme)
      setCurrentSystem(resolvedTheme)
    }

    const handler = (e: MediaQueryListEvent) => {
      if (systemThemesCorrect) {
        if (useSystem()) {
          const nextTheme = e.matches ? systemThemes!.dark : systemThemes!.light
          setTheme(nextTheme)
        }
        setCurrentSystem(e.matches ? systemThemes!.dark : systemThemes!.light)
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
        `The 'systemThemes' property of your themes config is misconfigured. Automatic theme toggling may not work and the 'System Preference' dropdown option has been disabled.`,
      )
      if (!hasSystemThemes) {
        if (!props.default) {
          console.warn(
            `Because you have omitted 'systemThemes' and have not provided a default theme via props; theme toggling will utilize the first two themes in your themes object.`,
          )
        }
      } else {
        if (!systemThemes!.hasOwnProperty("dark")) {
          console.warn("The 'systemThemes.dark' property of your themes config is undefined.")
        } else if (!themes.hasOwnProperty(systemThemes!.dark)) {
          console.warn(
            `The 'systemThemes.dark' value '${systemThemes!.dark}' does not match any theme key.`,
          )
        }
        if (!systemThemes!.hasOwnProperty("light")) {
          console.warn("The 'systemThemes.light' property of your themes config is undefined.")
        } else if (!themes.hasOwnProperty(systemThemes!.light)) {
          console.warn(
            `The 'systemThemes.light' value '${systemThemes!.light}' does not match any theme key.`,
          )
        }
      }
    }
    for (const [themeName, themeObj] of Object.entries(themes)) {
      if (!themeObj.hasOwnProperty("vars")) {
        console.warn(
          `The '${themeName}' theme is missing its 'vars' property and has been removed from available themes.`,
        )
      }
      for (const varName of Object.keys(themeObj.vars ?? {})) {
        if (!CSS_VAR_NAME_PATTERN.test(varName)) {
          console.warn(
            `The var key '${varName}' in theme '${themeName}' is not a valid CSS custom property name and will be skipped.`,
          )
        }
      }
    }
  })

  createEffect(() => {
    if (!themes[currentTheme()]) return

    // loop through the theme vars and inject them to the :root style element
    Object.keys(themes[currentTheme()].vars).forEach(name => {
      if (!CSS_VAR_NAME_PATTERN.test(name)) return

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
    if (themes[currentTheme()].config?.browserThemeColor) {
      if (!theme_meta) {
        theme_meta = document.createElement("meta")
        theme_meta.setAttribute("name", "theme-color")
        document.getElementsByTagName("head")[0].appendChild(theme_meta)
      }
      theme_meta.setAttribute("content", themes[currentTheme()].config!.browserThemeColor!)
    } else {
      if (theme_meta) theme_meta.remove()
    }

    // add the browser theme color as a css variable
    if (themes[currentTheme()].config?.browserThemeColor) {
      document.documentElement.style.setProperty(
        "--" + prefix + "browser_theme_color",
        themes[currentTheme()].config!.browserThemeColor!,
      )
    }

    // find the stp-inverter stylesheet and edit it
    if (systemThemesCorrect) {
      const invertStylesheet = document.querySelector("#stp-inverter") as HTMLElement
      if (invertStylesheet) {
        const currentlyDark = currentTheme() == systemThemes!.dark
        const currentlyLight = currentTheme() == systemThemes!.light

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
    systemThemes,
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
