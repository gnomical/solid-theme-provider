import { createMemo } from "solid-js"
import { useTheme } from "../../context/ThemeContext"
import { themeHasIcon } from "../../lib/helpers"
import { DEFAULT_DARK_ICON, DEFAULT_LIGHT_ICON } from "../../lib/constants"
import { ThemeToggleProps } from "../../lib/types"
import { IconButton } from "../IconButton"

export function ThemeToggle(props: ThemeToggleProps) {
  const ctx = useTheme()

  // Prefer toggling between the system-defined dark/light pair.
  // Falls back to the first theme that isn't current when no system config exists.
  const otherTheme = createMemo(() => {
    const current = ctx.currentTheme()
    if (ctx.systemThemesCorrect()) {
      const { dark, light } = ctx.systemThemes()!
      return current === dark ? light : dark
    }
    return ctx.themeKeys().find(k => k !== current) ?? ctx.themeKeys()[0]
  })

  function toggle() {
    ctx.setUseSystem(false)
    ctx.setTheme(otherTheme())
  }

  const icon = () => {
    const theme = ctx.themes()[otherTheme()]
    if (themeHasIcon(theme)) return theme.config!.icon
    if (ctx.systemThemes()?.dark === otherTheme()) return DEFAULT_DARK_ICON()
    return DEFAULT_LIGHT_ICON()
  }

  return (
    <IconButton icon={icon()} label={props.label} classList={props.classList} onMouseDown={toggle} />
  )
}
