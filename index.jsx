import fallbackThemes from './themes.json';
import fallbackStyles from './fallbacks.module.scss';
import { createEffect, createSignal } from 'solid-js';

function ThemeProvider(props) {

  const themes = props.themes || fallbackThemes;
  const styles = props.styles || fallbackStyles;

  const systemThemeIsDark = window.matchMedia("(prefers-color-scheme: dark)")
  const [currentTheme, setTheme] = createSignal(systemThemeIsDark?themes.system_themes.dark:themes.system_themes.light)
  const [otherTheme, setOtherTheme] = createSignal(systemThemeIsDark?themes.system_themes.light:themes.system_themes.dark)

  systemThemeIsDark.addEventListener("change", e => {
    if (e.matches) {
      toggleTheme(themes.system_themes.dark)
    } else {
      toggleTheme(themes.system_themes.light)
    }
  })

  createEffect(() => {
    Object.keys(themes[currentTheme()].colors).forEach(name => {
      document.documentElement.style.setProperty("--stp-"+name, themes[currentTheme()].colors[name])
    })
  })

  function toggleTheme(nextTheme) {
    if(nextTheme != currentTheme()) {
      setOtherTheme(currentTheme())
      setTheme(nextTheme)
    }
  }

  return (
    <div class={styles.button} onClick={()=>toggleTheme(otherTheme())}>
      <span class={styles.icon} innerHTML={atob(themes[otherTheme()].config.icon)}/>
      {props.label && <span class={styles.text}>{props.label}</span>}
    </div>
  )
}

export default ThemeProvider;