import { createSignal } from "solid-js"
import styles from "./ThemePicker.module.css"
import { useTheme } from "../../context/ThemeContext"
import { ThemePickerProps } from "../../lib/types"
import { CHEVRON_UP_ICON, SYSTEM_THEME_KEY } from "../../lib/constants"
import { Dropdown } from "../Dropdown"
import { IconButton } from "../IconButton"

export function ThemePicker(props: ThemePickerProps) {
  const ctx = useTheme()
  const menuPlacement = () => props.menuPlacement ?? "se"
  const [dropdownOpen, setDropdownOpen] = createSignal(false)

  function selectTheme(nextTheme: string) {
    if (nextTheme === SYSTEM_THEME_KEY) {
      ctx.setUseSystem(true)
      ctx.setTheme(ctx.currentSystem())
    } else {
      ctx.setUseSystem(false)
      ctx.setTheme(nextTheme)
    }
    setDropdownOpen(false)
  }

  const icon = () => <span class={styles.chevron}>{CHEVRON_UP_ICON()}</span>

  return (
    <div class={styles.component} classList={props.classList}>
      <IconButton
        icon={icon()}
        label={props.label ?? "Theme"}
        classList={{ [styles.open]: dropdownOpen() }}
        onMouseDown={() => setDropdownOpen(true)}
      />
      {dropdownOpen() && (
        <Dropdown
          allowSystemTheme={ctx.systemThemesCorrect()}
          menuPlacement={menuPlacement()}
          themes={ctx.themes()}
          systemThemes={ctx.systemThemes()}
          activeTheme={ctx.useSystem() ? SYSTEM_THEME_KEY : ctx.currentTheme()}
          toggleTheme={selectTheme}
          setDropdownOpen={setDropdownOpen}
        />
      )}
    </div>
  )
}
