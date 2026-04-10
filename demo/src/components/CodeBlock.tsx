import { createResource, Show } from "solid-js"
import { createHighlighter } from "shiki"
import { useTheme } from "solid-theme-provider"

const highlighterPromise = createHighlighter({
  themes: ["night-owl-light", "github-dark"],
  langs: ["tsx", "html", "css", "json"],
})

type CodeBlockProps = {
  code: string
  lang?: string
}

export function CodeBlock(props: CodeBlockProps) {
  const ctx = useTheme()

  const isDark = () => ctx.currentTheme() === ctx.systemThemes()?.dark

  const [html] = createResource(
    () => [props.code, isDark()] as const,
    async ([code, dark]) => {
      const highlighter = await highlighterPromise
      return highlighter.codeToHtml(code, {
        lang: props.lang ?? "tsx",
        theme: dark ? "github-dark" : "night-owl-light",
      })
    },
  )

  return (
    <Show when={html()} fallback={<pre><code>{props.code}</code></pre>}>
      <div class="shiki-wrapper" innerHTML={html()} />
    </Show>
  )
}
