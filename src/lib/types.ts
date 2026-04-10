import type { Accessor, JSX } from "solid-js"

export type ThemeConfig = {
  label?: string
  icon?: JSX.Element
  browserThemeColor?: string
}

export type ThemeVars = {
  [key: string]: string
}

export type ThemeObject = {
  config?: ThemeConfig
  vars: ThemeVars
}

export type SystemThemesObject = {
  dark: string
  light: string
}

export type ThemesObject = {
  [key: string]: ThemeObject
}

export type ThemesConfig = {
  systemThemes?: SystemThemesObject
  themes: ThemesObject
}

export type ThemeContextValue = {
  currentTheme: Accessor<string>
  setTheme: (theme: string) => void
  themes: Accessor<ThemesObject>
  themeKeys: Accessor<string[]>
  systemThemes: Accessor<SystemThemesObject | undefined>
  systemThemesCorrect: Accessor<boolean>
  useSystem: Accessor<boolean>
  setUseSystem: (val: boolean) => void
  currentSystem: Accessor<string>
  setThemesConfig: (config: ThemesConfig) => void
  prefix: string
}

export type ThemeProviderProps = {
  themes?: ThemesConfig
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
