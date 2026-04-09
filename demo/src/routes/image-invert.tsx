import { Title } from "@solidjs/meta";
import { ThemeProvider } from "solid-theme-provider";

// Simple inline SVGs to demo the invert classes without needing external assets
const lightSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="white"/><circle cx="40" cy="40" r="20" fill="black"/><text x="40" y="45" text-anchor="middle" fill="white" font-size="12">light</text></svg>`;
const darkSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="black"/><circle cx="40" cy="40" r="20" fill="white"/><text x="40" y="45" text-anchor="middle" fill="black" font-size="12">dark</text></svg>`;

export default function ImageInvert() {
  return (
    <main>
      <Title>Image Invert — solid-theme-provider demo</Title>
      <h1>Image Invert</h1>
      <h2>
        Apply <code>.invert-safe--light</code> or <code>.invert-safe--dark</code> to images that
        should invert automatically when the opposite theme is active.
      </h2>

      <div class="demo-section">
        <h3>Live — toggle the theme to see inversion</h3>
        <div class="demo-box" style={{ gap: "2rem", "align-items": "flex-start" }}>
          <ThemeProvider label="Toggle" />
        </div>
        <div class="demo-box" style={{ gap: "2rem" }}>
          <div style={{ "text-align": "center" }}>
            <img
              class="invert-safe--light"
              src={lightSvg}
              alt="Primarily light image"
              width="80"
              height="80"
              style={{ display: "block", "margin-bottom": "0.5rem" }}
            />
            <span class="note">.invert-safe--light</span>
          </div>
          <div style={{ "text-align": "center" }}>
            <img
              class="invert-safe--dark"
              src={darkSvg}
              alt="Primarily dark image"
              width="80"
              height="80"
              style={{ display: "block", "margin-bottom": "0.5rem" }}
            />
            <span class="note">.invert-safe--dark</span>
          </div>
          <div style={{ "text-align": "center" }}>
            <img
              src={lightSvg}
              alt="No invert class"
              width="80"
              height="80"
              style={{ display: "block", "margin-bottom": "0.5rem" }}
            />
            <span class="note">No class (never inverts)</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3>Class-based usage</h3>
        <pre><code>{`<!-- Inverts when dark theme is active (primarily light image) -->
<img class="invert-safe--light" src="..." />

<!-- Inverts when light theme is active (primarily dark image) -->
<img class="invert-safe--dark" src="..." />`}</code></pre>
      </div>

      <div class="demo-section">
        <h3>src attribute usage (when you can't set class names)</h3>
        <pre><code>{`<!-- Works by appending the class name as a URL fragment -->
<img src="./logo.png#invert-safe--light" />
<img src="./icon.png#invert-safe--dark" />`}</code></pre>
      </div>

      <div class="demo-section">
        <h3>Notes</h3>
        <p class="note">
          The inversion uses <code>filter: invert(1) hue-rotate(180deg)</code> which preserves hues
          while flipping luminosity. Works best on black-and-white line art but can work on colorful
          images too.
        </p>
      </div>
    </main>
  );
}
