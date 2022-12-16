export type ThemeConfig = {
  icon: string;
  browser_theme_color: string;
};

export type ThemeVars = {
  [key: string]: string;
};

export type ThemeObject = {
  config: ThemeConfig;
  vars: ThemeVars;
};

export type SystemThemesObject = {
  dark: string;
  light: string;
};

export type ThemesObject = {
  [key: string]: ThemeObject;
};

export type ThemesConfigObject = {
  system_theme_config: SystemThemesObject;
  themes: ThemesObject;
};

export type ThemeProviderProps = {
  default?: string;
  id?: string;
  label?: string;
  prefix?: string;
  styles?: any;
  themes?: ThemesConfigObject;
  menu_placement: "ne" | "se" | "sw" | "nw";
};
