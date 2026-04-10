import { createSignal } from "solid-js";
import styles from "./ThemePicker.module.css";
import { useTheme } from "../../context/ThemeContext";
import { themeHasBase64Icon } from "../../lib/helpers";
import { ThemePickerProps } from "../../lib/types";
import { CHEVRON_UP_ICON, SYSTEM_THEME_KEY } from "../../lib/constants";
import { Dropdown } from "../Dropdown";

export function ThemePicker(props: ThemePickerProps) {
  const ctx = useTheme();
  const menuPlacement = () => props.menuPlacement ?? "se";
  const [dropdownOpen, setDropdownOpen] = createSignal(false);

  function selectTheme(nextTheme: string) {
    if (nextTheme === SYSTEM_THEME_KEY) {
      ctx.setUseSystem(true);
      ctx.setTheme(ctx.currentSystem());
    } else {
      ctx.setUseSystem(false);
      ctx.setTheme(nextTheme);
    }
    setDropdownOpen(false);
  }

  return (
    <div
      class={`${styles.component} ${styles[menuPlacement()]}`}
      classList={props.classList}
    >
      <div
        class={styles.button + (dropdownOpen() ? " " + styles.open : "")}
        onMouseDown={() => setDropdownOpen(true)}
      >
        {dropdownOpen() ? (
          <span class={`${styles.icon} ${styles.chevron}`}>
            {CHEVRON_UP_ICON()}
          </span>
        ) : themeHasBase64Icon(ctx.themes[ctx.currentTheme()] ?? {}) ? (
          <span
            class={styles.icon}
            innerHTML={atob(ctx.themes[ctx.currentTheme()].config.icon!)}
          />
        ) : (
          <span
            class={`${styles.icon} ${styles.chevron}`}
            style={{ transform: "rotate(180deg)" }}
          >
            {CHEVRON_UP_ICON()}
          </span>
        )}
        {props.label && <span class={styles.text}>{props.label}</span>}
      </div>
      {dropdownOpen() && (
        <Dropdown
          allowSystemTheme={ctx.systemThemesCorrect}
          themes={ctx.themes}
          activeTheme={ctx.useSystem() ? SYSTEM_THEME_KEY : ctx.currentTheme()}
          toggleTheme={selectTheme}
          setDropdownOpen={setDropdownOpen}
        />
      )}
    </div>
  );
}
