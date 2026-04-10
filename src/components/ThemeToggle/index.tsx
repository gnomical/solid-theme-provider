import { createMemo } from "solid-js"
import { useTheme } from "../../context/ThemeContext"
import { themeHasBase64Icon } from "../../lib/helpers"
import { DEFAULT_DARK_ICON, DEFAULT_LIGHT_ICON } from "../../lib/constants"
import { ThemeToggleProps } from "../../lib/types"
import { IconButton } from "../IconButton"

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

  const icon = () => {
    if (themeHasBase64Icon(ctx.themes[otherTheme()] ?? {})) {
      return <span innerHTML={atob(ctx.themes[otherTheme()].config.icon!)} />
    }
    return otherTheme() === ctx.systemThemeConfig?.dark ? DEFAULT_DARK_ICON() : DEFAULT_LIGHT_ICON()
  }

  return (
    <IconButton icon={icon()} label={props.label} classList={props.classList} onMouseDown={toggle} />
  )
}
