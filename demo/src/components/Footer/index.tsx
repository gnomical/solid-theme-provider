import styles from "./Footer.module.css"

export function Footer() {
  return (
    <footer class={styles.footer}>
      <a
        href="https://github.com/gnomical/solid-theme-provider"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" width="50" height="50" fill="currentColor">
          <path d="M10.303 16.652c-2.837-.344-4.835-2.385-4.835-5.028 0-1.074.387-2.235 1.031-3.008-.279-.709-.236-2.214.086-2.837.86-.107 2.02.344 2.708.967.816-.258 1.676-.386 2.728-.386 1.053 0 1.913.128 2.686.365.666-.602 1.848-1.053 2.708-.946.3.581.344 2.085.064 2.815.688.817 1.053 1.913 1.053 3.03 0 2.643-1.998 4.641-4.877 5.006.73.473 1.224 1.504 1.224 2.686v2.235c0 .644.537 1.01 1.182.752 3.889-1.483 6.94-5.372 6.94-10.185 0-6.081-4.942-11.044-11.022-11.044-6.081 0-10.98 4.963-10.98 11.044a10.84 10.84 0 0 0 7.112 10.206c.58.215 1.139-.172 1.139-.752v-1.719a2.768 2.768 0 0 1-1.032.215c-1.418 0-2.256-.773-2.857-2.213-.237-.58-.495-.924-.989-.988-.258-.022-.344-.129-.344-.258 0-.258.43-.451.86-.451.623 0 1.16.386 1.719 1.181.43.623.881.903 1.418.903.537 0 .881-.194 1.375-.688.365-.365.645-.687.903-.902Z"></path>
        </svg>
        GitHub
      </a>
      <a
        href="https://www.npmjs.com/package/solid-theme-provider"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 27.23 27.23" aria-hidden="true" fill="currentColor">
          <path d="M2 0h23.23A2 2 0 0 1 27.23 2v23.23a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2Zm3.8 6.04.02 15.71h7.86V9.98h3.92l-.01 11.78h3.93l.01-15.7L5.8 6.04Z" />
        </svg>
        npm
      </a>
      <a
        href="https://github.com/sponsors/gnomical"
        target="_blank"
        rel="noopener noreferrer"
        class={styles.sponsor}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="icon icon-tabler icons-tabler-filled icon-tabler-heart"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
        </svg>
        Sponsor
      </a>
      <span>© {new Date().getFullYear()} Jacob Kofron</span>
    </footer>
  )
}
