import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from "solid-js"
import { fallbackThemes } from "../fallbacks.themes"
import {
  ThemeContextValue,
  ThemeProviderProps,
  ThemesConfig,
  ThemeVars,
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
  const calculateVariants = props.calculateVariants || defaultCalculateVariants

  const [themesConfig, setThemesConfig] = createSignal<ThemesConfig>(
    props.themes ?? fallbackThemes,
  )

  const systemThemes = createMemo(() => themesConfig().systemThemes)
  const themes = createMemo(() => themesConfig().themes)
  const themeKeys = createMemo(() => Object.keys(themes()))

  const systemThemesCorrect = createMemo(() => {
    const st = systemThemes()
    const t = themes()
    return (
      !!st &&
      st.hasOwnProperty("dark") &&
      st.hasOwnProperty("light") &&
      t.hasOwnProperty(st.dark) &&
      t.hasOwnProperty(st.light)
    )
  })

  const [useSystem, setUseSystem] = createSignal(
    props.default ? false : systemThemesCorrect() ? true : false,
  )

  // Deterministic initial state: props.default, or light as a safe SSR fallback.
  // System preference is applied in onMount to avoid SSR/hydration mismatch.
  const resolveDefaultTheme = () => {
    const st = systemThemes()
    const keys = themeKeys()
    return props.default || (systemThemesCorrect() ? st!.light : keys[0])
  }

  const [currentTheme, setTheme] = createSignal(resolveDefaultTheme())
  const [currentSystem, setCurrentSystem] = createSignal(resolveDefaultTheme())

  // When the themes config changes, reset to the new config's appropriate default
  // (skip on first run — initial signals handle that)
  let configInitialized = false
  createEffect(() => {
    themesConfig() // subscribe
    if (!configInitialized) {
      configInitialized = true
      return
    }
    const next = resolveDefaultTheme()
    setTheme(next)
    setCurrentSystem(next)
    setUseSystem(props.default ? false : systemThemesCorrect())
  })

  onMount(() => {
    const systemThemeIsDark = window.matchMedia("(prefers-color-scheme: dark)")
    const systemIsDark = systemThemeIsDark.matches

    // Apply actual system preference now that we're on the client
    if (!props.default && systemThemesCorrect()) {
      const resolvedTheme = systemIsDark ? systemThemes()!.dark : systemThemes()!.light
      setTheme(resolvedTheme)
      setCurrentSystem(resolvedTheme)
    }

    const handler = (e: MediaQueryListEvent) => {
      if (systemThemesCorrect()) {
        if (useSystem()) {
          setTheme(e.matches ? systemThemes()!.dark : systemThemes()!.light)
        }
        setCurrentSystem(e.matches ? systemThemes()!.dark : systemThemes()!.light)
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
    const st = systemThemes()
    const t = themes()
    if (!systemThemesCorrect()) {
      console.warn(
        `The 'systemThemes' property of your themes config is misconfigured. Automatic theme toggling may not work and the 'System Preference' dropdown option has been disabled.`,
      )
      if (!st) {
        if (!props.default) {
          console.warn(
            `Because you have omitted 'systemThemes' and have not provided a default theme via props; theme toggling will utilize the first two themes in your themes object.`,
          )
        }
      } else {
        if (!st.hasOwnProperty("dark")) {
          console.warn("The 'systemThemes.dark' property of your themes config is undefined.")
        } else if (!t.hasOwnProperty(st.dark)) {
          console.warn(
            `The 'systemThemes.dark' value '${st.dark}' does not match any theme key.`,
          )
        }
        if (!st.hasOwnProperty("light")) {
          console.warn("The 'systemThemes.light' property of your themes config is undefined.")
        } else if (!t.hasOwnProperty(st.light)) {
          console.warn(
            `The 'systemThemes.light' value '${st.light}' does not match any theme key.`,
          )
        }
      }
    }
    for (const [themeName, themeObj] of Object.entries(t)) {
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
    const t = themes()
    const theme = currentTheme()
    if (!t[theme]) return

    // loop through the theme vars and inject them to the :root style element
    Object.keys(t[theme].vars).forEach(name => {
      if (!CSS_VAR_NAME_PATTERN.test(name)) return

      document.documentElement.style.setProperty("--" + prefix + name, t[theme].vars[name])

      // calculate any variants and inject them to the :root style element
      const variants = calculateVariants(name, t[theme].vars[name])
      Object.keys(variants).forEach(variant => {
        document.documentElement.style.setProperty("--" + prefix + variant, variants[variant])
      })
    })

    // find the theme-color meta tag and edit it, or, create a new one
    let theme_meta = document.querySelector('meta[name="theme-color"]')
    if (t[theme].config?.browserThemeColor) {
      if (!theme_meta) {
        theme_meta = document.createElement("meta")
        theme_meta.setAttribute("name", "theme-color")
        document.getElementsByTagName("head")[0].appendChild(theme_meta)
      }
      theme_meta.setAttribute("content", t[theme].config!.browserThemeColor!)
    } else {
      if (theme_meta) theme_meta.remove()
    }

    // add the browser theme color as a css variable
    if (t[theme].config?.browserThemeColor) {
      document.documentElement.style.setProperty(
        "--" + prefix + "browser_theme_color",
        t[theme].config!.browserThemeColor!,
      )
    }

    // find the stp-inverter stylesheet and edit it
    if (systemThemesCorrect()) {
      const st = systemThemes()!
      const invertStylesheet = document.querySelector("#stp-inverter") as HTMLElement
      if (invertStylesheet) {
        if (theme === st.dark) {
          invertStylesheet.innerText =
            'img[src$="#invert-safe--light"],.invert-safe--light{filter:hue-rotate(180deg) invert()}'
        } else if (theme === st.light) {
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
    setThemesConfig,
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
