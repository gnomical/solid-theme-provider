import { createResource, Show } from "solid-js"
import { createHighlighter } from "shiki"
import { useTheme } from "solid-theme-provider"
import styles from "./Code.module.css"

const shikiThemeMap: Record<string, string> = {
  dark: "github-dark",
  ember_night: "github-dark",
  light: "night-owl-light",
  warm_light: "night-owl-light",
  turtle: "everforest-light",
}

const highlighterPromise = createHighlighter({
  themes: ["night-owl-light", "github-dark", "everforest-light"],
  langs: ["tsx", "html", "css", "json"],
})

type CodeSpanProps = {
  code: string
  lang?: string
}

export function CodeSpan(props: CodeSpanProps) {
  const ctx = useTheme()

  const shikiTheme = () => shikiThemeMap[ctx.currentTheme()] ?? "github-dark"

  const [html] = createResource(
    () => [props.code, shikiTheme()] as const,
    async ([code, theme]) => {
      const highlighter = await highlighterPromise
      const bg = highlighter.getTheme(theme).bg
      const tokens = highlighter.codeToHtml(code, {
        lang: props.lang ?? "tsx",
        theme,
        structure: "inline",
      })
      return { tokens, bg }
    },
  )

  return (
    <Show when={html()} fallback={<code>{props.code}</code>}>
      <code class={styles.code} style={{ background: html()!.bg }} innerHTML={html()!.tokens} />
    </Show>
  )
}
