import type { ThemesConfig } from "./lib/types"

export const fallbackThemes: ThemesConfig = {
  systemThemes: {
    dark: "dark",
    light: "light",
  },
  themes: {
    dark: {
      config: {
        browserThemeColor: "#111111",
      },
      vars: {
        background: "#111111",
        foreground: "#eeeeee",
        button_radius: "0.5em",
      },
    },
    light: {
      config: {
        browserThemeColor: "#ffffff",
      },
      vars: {
        background: "#ffffff",
        foreground: "#111111",
        button_radius: "0.5em",
      },
    },
  },
}
