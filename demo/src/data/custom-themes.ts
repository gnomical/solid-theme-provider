import type { ThemesConfig } from "solid-theme-provider"

export const customThemes: ThemesConfig = {
  systemThemes: {
    dark: "humid_night",
    light: "warm_light",
  },
  themes: {
    humid_night: {
      config: {
        label: "Humid Night",
        browserThemeColor: "#110000",
      },
      vars: {
        background: "#110000",
        background_active: "#2b1d1c",
        foreground: "#ddddcc",
        foreground_muted: "#999988",
        button_radius: "0.5em",
      },
    },
    warm_light: {
      config: {
        label: "Warm Light",
        browserThemeColor: "#f1efe5",
      },
      vars: {
        background: "#fffff5",
        background_active: "#f1efe5",
        foreground: "#111100",
        foreground_muted: "#777755",
        button_radius: "0.5em",
      },
    },
    turtle: {
      config: {
        label: "Turtle",
        browserThemeColor: "#115522",
      },
      vars: {
        background: "#115522",
        background_active: "#226633",
        foreground: "#eeffee",
        foreground_muted: "#ddcccc",
        button_radius: "1.2em",
      },
    },
  },
}
