import { createSignal } from "solid-js";
import fallbackStyles from "../fallbacks.module.scss";
import { useTheme } from "../context/ThemeContext";
import { themeHasBase64Icon } from "../lib/helpers";
import { ThemePickerProps } from "../lib/types";
import { CHEVRON_UP_ICON, SYSTEM_THEME_KEY } from "../lib/constants";
import { Dropdown } from "./Dropdown";

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
      class={`${fallbackStyles.component} ${fallbackStyles[menuPlacement()]}`}
      classList={props.classList}
    >
      <div
        class={fallbackStyles.button + (dropdownOpen() ? " " + fallbackStyles.open : "")}
        onMouseDown={() => setDropdownOpen(true)}
      >
        {dropdownOpen() ? (
          <span class={`${fallbackStyles.icon} ${fallbackStyles.chevron}`}>
            {CHEVRON_UP_ICON()}
          </span>
        ) : themeHasBase64Icon(ctx.themes[ctx.currentTheme()] ?? {}) ? (
          <span
            class={fallbackStyles.icon}
            innerHTML={atob(ctx.themes[ctx.currentTheme()].config.icon!)}
          />
        ) : (
          <span
            class={`${fallbackStyles.icon} ${fallbackStyles.chevron}`}
            style={{ transform: "rotate(180deg)" }}
          >
            {CHEVRON_UP_ICON()}
          </span>
        )}
        {props.label && <span class={fallbackStyles.text}>{props.label}</span>}
      </div>
      {dropdownOpen() && (
        <Dropdown
          styles={fallbackStyles}
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
