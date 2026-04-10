import { createEffect, For, onCleanup } from "solid-js"
import styles from "./Dropdown.module.css"
import { SYSTEM_THEME_ICON, SYSTEM_THEME_KEY } from "../../lib/constants"
import { DEFAULT_DARK_ICON, DEFAULT_LIGHT_ICON } from "../../lib/constants"
import { themeHasIcon } from "../../lib/helpers"
import { SystemThemesObject, ThemesObject } from "../../lib/types"

type DropdownProps = {
  activeTheme: string
  allowSystemTheme?: boolean
  toggleTheme: (theme: string) => void
  themes: ThemesObject
  systemThemes: SystemThemesObject | undefined
  setDropdownOpen: (open: boolean) => void
}

export function Dropdown(props: DropdownProps) {
  const allowSystemTheme = props.allowSystemTheme || false

  let containerRef: any
  const closeDropdown = (e: Event) => {
    if (!containerRef.contains(e.target)) props.setDropdownOpen(false)
  }

  createEffect(() => {
    document.addEventListener("mousedown", closeDropdown)
    onCleanup(() => document.removeEventListener("mousedown", closeDropdown))
  })

  const themeIcon = (themeName: string) => {
    const theme = props.themes[themeName]
    if (themeHasIcon(theme)) return theme.config!.icon
    if (props.systemThemes?.dark === themeName) return DEFAULT_DARK_ICON()
    if (props.systemThemes?.light === themeName) return DEFAULT_LIGHT_ICON()
    return null
  }

  const themeLabel = (themeName: string) => {
    return (
      props.themes[themeName]?.config?.label ??
      themeName
        .split("_")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
  }

  return (
    <div ref={containerRef} class={styles.dropdown}>
      {allowSystemTheme && (
        <div
          class={`${styles.item}${props.activeTheme == SYSTEM_THEME_KEY ? ` ${styles.active}` : ""}`}
          onClick={() => props.toggleTheme(SYSTEM_THEME_KEY)}
        >
          <span class={styles.icon}>{SYSTEM_THEME_ICON()}</span>
          <span>Match System</span>
        </div>
      )}
      <For
        each={Object.keys(props.themes).filter(key => props.themes[key].hasOwnProperty("vars"))}
        fallback={<div>Loading...</div>}
      >
        {themeName => {
          const icon = themeIcon(themeName)
          return (
            <div
              class={`${styles.item}${props.activeTheme == themeName ? ` ${styles.active}` : ""}`}
              onClick={() => props.toggleTheme(themeName)}
            >
              {icon && <span class={styles.icon}>{icon}</span>}
              <span>{themeLabel(themeName)}</span>
            </div>
          )
        }}
      </For>
    </div>
  )
}
