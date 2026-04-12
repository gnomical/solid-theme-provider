import { MetaProvider, Title } from "@solidjs/meta"
import { Router, A } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import { ThemeProvider, ThemeToggle } from "solid-theme-provider"
import { Footer } from "./components/Footer"
import "./app.css"

export default function App() {
  return (
    <ThemeProvider>
      <Router
        base={import.meta.env.BASE_URL}
        root={props => (
          <MetaProvider>
            <Title>solid-theme-provider demo</Title>
            <nav>
              <span class="logo">STP</span>
              <A href="/">Home</A>
              <A href="/toggle">ThemeToggle</A>
              <A href="/picker">ThemePicker</A>
              <A href="/custom-themes">Custom Themes</A>
              <A href="/advanced">Advanced</A>
              <A href="/image-invert">Image Invert</A>
              <span class="spacer" />
              <ThemeToggle />
            </nav>
            <Suspense>{props.children}</Suspense>
            <Footer />
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </ThemeProvider>
  )
}
