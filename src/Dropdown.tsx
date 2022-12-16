import { createEffect, For, onCleanup } from "solid-js";
import {
  SYSTEM_THEME_CONFIG_KEY,
  SYSTEM_THEME_ICON,
  SYSTEM_THEME_KEY,
  UNKNOWN_ICON
} from "./lib/constants";
import {
  themeHasBase64Icon
} from "./lib/helpers"

type DropdownProps = {
  styles: any;
  activeTheme: string;
  allowSystemTheme?: boolean;
  toggleTheme: any;
  themes: any;
  setDropdownOpen: any;
}; 

export function Dropdown(props: DropdownProps) {
  const styles = props.styles;
  const allowSystemTheme = props.allowSystemTheme || false;

  // handle global click events
  let containerRef: any;
  const closeDropdown = (e: Event) => {
    if(!containerRef.contains(e.target))
      props.setDropdownOpen(false);
  }

  createEffect(() => {
    document.addEventListener('mousedown',closeDropdown)
    onCleanup(() => document.removeEventListener('mousedown',closeDropdown))
  });

  return (
    <div ref={containerRef} class={styles.dropdown}>
      {allowSystemTheme && (
        <div
          class={props.activeTheme == SYSTEM_THEME_KEY ? styles.active : ""}
          onClick={() => props.toggleTheme(SYSTEM_THEME_KEY)}
        >
          <span class={styles.icon}>{SYSTEM_THEME_ICON}</span>
          <span class={styles.text}>System Preference</span>
        </div>
      )}
      <For
        each={Object.keys(props.themes).filter(key => {
          return key != SYSTEM_THEME_CONFIG_KEY && props.themes[key].hasOwnProperty("vars");
        })}
        fallback={<div>Loading...</div>}
      >
        {themeName => {
          let themeLabel = themeName
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          return (
            <div
              class={props.activeTheme == themeName ? styles.active : ""}
              onClick={() => props.toggleTheme(themeName)}
            >
              {themeHasBase64Icon(props.themes[themeName]) ? (
                <span class={styles.icon} innerHTML={atob(props.themes[themeName].config.icon)} />
              ) : (
                <span class={styles.icon}>{UNKNOWN_ICON}</span>
              )}
              <span class={styles.text}>{themeLabel}</span>
            </div>
          );
        }}
      </For>
    </div>
  )
}
