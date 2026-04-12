import { Title } from "@solidjs/meta"
import { ThemePicker } from "solid-theme-provider"
import { CodeBlock, CodeSpan } from "../components/Code"

export default function Picker() {
  return (
    <main>
      <Title>ThemePicker — solid-theme-provider demo</Title>
      <h1>ThemePicker</h1>
      <h2>Opens a dropdown listing all available themes.</h2>

      <div class="demo-section">
        <h3>Live</h3>
        <div class="demo-box">
          <ThemePicker />
        </div>
        <p class="note">
          <CodeSpan code={`<ThemePicker />`} /> - No props
        </p>
        <div class="demo-box placement-box">
          <ThemePicker menuPlacement="nw" label="NW" />
          <ThemePicker menuPlacement="ne" label="NE" />
          <ThemePicker menuPlacement="sw" label="SW" />
          <ThemePicker menuPlacement="se" label="SE" />
        </div>
        <p class="note">
          <CodeSpan code={`<ThemePicker menuPlacement="..." />`} /> — All options
        </p>
      </div>

      <div class="demo-section">
        <h3>Code</h3>
        <CodeBlock
          code={`import { ThemeProvider, ThemePicker } from "solid-theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      <nav>
        <ThemePicker label="Appearance" menuPlacement="se" />
      </nav>
    </ThemeProvider>
  )
}`}
        />
      </div>
    </main>
  )
}
