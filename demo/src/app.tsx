import { MetaProvider, Title } from "@solidjs/meta";
import { Router, A } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { ThemeProvider } from "solid-theme-provider";
import "./app.css";

export default function App() {
  return (
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
            <ThemeProvider />
          </nav>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
