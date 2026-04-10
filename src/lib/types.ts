import type { Accessor, JSX } from "solid-js"

export type ThemeConfig = {
  icon?: string
  browser_theme_color?: string
}

export type ThemeVars = {
  [key: string]: string
}

export type ThemeObject = {
  config: ThemeConfig
  vars: ThemeVars
}

export type SystemThemesObject = {
  dark: string
  light: string
}

export type ThemesObject = {
  [key: string]: ThemeObject
}

export type ThemesConfigObject = {
  system_theme_config: SystemThemesObject
  themes: ThemesObject
}

export type ThemeContextValue = {
  currentTheme: Accessor<string>
  setTheme: (theme: string) => void
  themes: ThemesObject
  themeKeys: string[]
  systemThemeConfig: SystemThemesObject
  systemThemesCorrect: boolean
  useSystem: Accessor<boolean>
  setUseSystem: (val: boolean) => void
  currentSystem: Accessor<string>
  prefix: string
}

export type ThemeProviderProps = {
  themes?: ThemesConfigObject
  default?: string
  prefix?: string
  calculateVariants?: (name: string, value: string) => ThemeVars
  children?: JSX.Element
}

export type ThemeToggleProps = {
  label?: string
  classList?: Record<string, boolean>
}

export type ThemePickerProps = {
  label?: string
  menuPlacement?: "ne" | "se" | "sw" | "nw"
  classList?: Record<string, boolean>
}
