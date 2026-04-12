import { Title } from "@solidjs/meta"
import { A } from "@solidjs/router"

const pages = [
  {
    href: "/toggle",
    title: "ThemeToggle",
    description: "One-click toggle between light and dark. No configuration required.",
  },
  {
    href: "/picker",
    title: "ThemePicker",
    description: "Dropdown listing all available themes, with menuPlacement options.",
  },
  {
    href: "/custom-themes",
    title: "Custom Themes",
    description: "Supply a themes config with multiple named themes.",
  },
  {
    href: "/advanced",
    title: "Advanced",
    description: "Use useTheme() to drive external components from theme state.",
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
        Interactive demos for select features, view the{" "}
        <a
          href="https://www.npmjs.com/package/solid-theme-provider"
          target="_blank"
          rel="noopener noreferrer"
        >
          README
        </a>{" "}
        for more features and information.
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
