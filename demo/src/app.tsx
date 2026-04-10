import { MetaProvider, Title } from "@solidjs/meta"
import { Router, A } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import { ThemeProvider, ThemeToggle } from "solid-theme-provider"
import "./app.css"

export default function App() {
  return (
    <ThemeProvider>
      <Router
        root={props => (
          <MetaProvider>
            <Title>solid-theme-provider demo</Title>
            <nav>
              <A href="/">Home</A>
              <A href="/minimal">Minimal</A>
              <A href="/custom-themes">Custom Themes</A>
              <A href="/advanced">Advanced</A>
              <A href="/image-invert">Image Invert</A>
              <span class="spacer" />
              <ThemeToggle />
            </nav>
            <Suspense>{props.children}</Suspense>
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </ThemeProvider>
  )
}
