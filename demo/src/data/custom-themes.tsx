import type { ThemesConfig } from "solid-theme-provider"

export const customThemes: ThemesConfig = {
  systemThemes: {
    dark: "ember_night",
    light: "warm_light",
  },
  themes: {
    ember_night: {
      config: {
        label: "Ember Night",
        browserThemeColor: "#110000",
      },
      vars: {
        background: "#110000",
        foreground: "#ddddcc",
        "button-radius": "0.5em",
      },
    },
    warm_light: {
      config: {
        label: "Warm Light",
        browserThemeColor: "#f1efe5",
      },
      vars: {
        background: "#fffff5",
        foreground: "#111100",
        "button-radius": "0.5em",
      },
    },
    turtle: {
      config: {
        label: "Trusty Turtle",
        browserThemeColor: "#115522",
        icon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-turtle-icon lucide-turtle"
          >
            <path d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z" />
            <path d="M4.82 7.9 8 10" />
            <path d="M15.18 7.9 12 10" />
            <path d="M16.93 10H20a2 2 0 0 1 0 4H2" />
          </svg>
        ),
      },
      vars: {
        background: "#fffff5",
        foreground: "#117722",
        "button-radius": "1.2em",
      },
    },
  },
}
