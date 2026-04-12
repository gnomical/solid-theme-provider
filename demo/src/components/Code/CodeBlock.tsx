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

type CodeBlockProps = {
  code: string
  lang?: string
}

export function CodeBlock(props: CodeBlockProps) {
  const ctx = useTheme()

  const shikiTheme = () => shikiThemeMap[ctx.currentTheme()] ?? "github-dark"

  const [html] = createResource(
    () => [props.code, shikiTheme()] as const,
    async ([code, theme]) => {
      const highlighter = await highlighterPromise
      return highlighter.codeToHtml(code, {
        lang: props.lang ?? "tsx",
        theme,
      })
    },
  )

  return (
    <Show
      when={html()}
      fallback={
        <pre>
          <code>{props.code}</code>
        </pre>
      }
    >
      <div class={styles.code} innerHTML={html()} />
    </Show>
  )
}
