import { Title } from "@solidjs/meta"
import { A } from "@solidjs/router"

const pages = [
  {
    href: "/minimal",
    title: "Minimal",
    description: "Zero-config usage. System theme detection + label prop.",
  },
  {
    href: "/custom-themes",
    title: "Custom Themes",
    description: "Supply a themes.json with multiple named themes.",
  },
  {
    href: "/advanced",
    title: "Advanced",
    description: "Use currentTheme and setTheme to drive external components.",
  },
  {
    href: "/image-invert",
    title: "Image Invert",
    description: "Invert images automatically on theme switch.",
  },
]

export default function Home() {
  return (
    <main>
      <Title>solid-theme-provider demo</Title>
      <h1>solid-theme-provider</h1>
      <h2>
        Interactive demos for select features, view the README for more features and information.
      </h2>
      <div class="card-grid">
        {pages.map(page => (
          <A href={page.href} class="card">
            <h3>{page.title}</h3>
            <p>{page.description}</p>
          </A>
        ))}
      </div>
    </main>
  )
}
