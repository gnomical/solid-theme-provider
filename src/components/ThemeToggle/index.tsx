import { createMemo } from "solid-js"
import styles from "./ThemeToggle.module.css"
import { useTheme } from "../../context/ThemeContext"
import { themeHasBase64Icon } from "../../lib/helpers"
import { DEFAULT_DARK_ICON, DEFAULT_LIGHT_ICON } from "../../lib/constants"
import { ThemeToggleProps } from "../../lib/types"

export function ThemeToggle(props: ThemeToggleProps) {
  const ctx = useTheme()

  // Prefer toggling between the system-defined dark/light pair.
  // Falls back to the first theme that isn't current when no system config exists.
  const otherTheme = createMemo(() => {
    const current = ctx.currentTheme()
    if (ctx.systemThemesCorrect) {
      const { dark, light } = ctx.systemThemeConfig
      return current === dark ? light : dark
    }
    return ctx.themeKeys.find(k => k !== current) ?? ctx.themeKeys[0]
  })

  function toggle() {
    ctx.setUseSystem(false)
    ctx.setTheme(otherTheme())
  }

  return (
    <div class={styles.button} classList={props.classList} onMouseDown={toggle}>
      <span class={styles.icon}>
        {themeHasBase64Icon(ctx.themes[otherTheme()] ?? {}) ? (
          <span innerHTML={atob(ctx.themes[otherTheme()].config.icon!)} />
        ) : otherTheme() === ctx.systemThemeConfig?.dark ? (
          DEFAULT_DARK_ICON()
        ) : (
          DEFAULT_LIGHT_ICON()
        )}
      </span>
      {props.label && <span>{props.label}</span>}
    </div>
  )
}
