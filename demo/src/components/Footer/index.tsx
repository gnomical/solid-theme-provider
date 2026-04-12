import styles from "./Footer.module.css"

export function Footer() {
  return (
    <footer class={styles.footer}>
      <a href="https://github.com/gnomical/solid-theme-provider" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://github.com/sponsors/gnomical" target="_blank" rel="noopener noreferrer">Sponsor</a>
      <span>© {new Date().getFullYear()} Jacob Kofron</span>
    </footer>
  )
}
