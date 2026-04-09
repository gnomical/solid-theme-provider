import { Title } from "@solidjs/meta";
import { ThemeProvider } from "solid-theme-provider";

// Default behavior for reference
const defaultVariants = (name: string, value: string) => {
  const pattern = /^#[0-9A-F]{6}$/i;
  if (value.match(pattern)) {
    return {
      [name + "-alpha_primary"]: value + "f2",
      [name + "-alpha_secondary"]: value + "99",
      [name + "-alpha_tertiary"]: value + "4d",
      [name + "-alpha_quaternary"]: value + "17",
    };
  }
  return {};
};

// Custom override: generate CSS oklch lightness steps instead
const customVariants = (name: string, value: string) => {
  const pattern = /^#[0-9A-F]{6}$/i;
  if (value.match(pattern)) {
    const r = parseInt(value.slice(1, 3), 16) / 255;
    const g = parseInt(value.slice(3, 5), 16) / 255;
    const b = parseInt(value.slice(5, 7), 16) / 255;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const isDark = luminance < 0.5;
    return {
      [name + "-subtle"]: isDark
        ? value + "33"  // 20% opacity for dark colors
        : value + "22", // 13% opacity for light colors
      [name + "-muted"]: value + "88",  // 53% opacity
      [name + "-strong"]: value + "dd", // 87% opacity
    };
  }
  return {};
};

export default function CalculateVariants() {
  return (
    <main>
      <Title>Calculate Variants — solid-theme-provider demo</Title>
      <h1>Calculate Variants</h1>
      <h2>
        Override how complementary CSS variable variants are generated from your theme's hex colors.
      </h2>

      <div class="demo-section">
        <h3>Live — Default (alpha transparencies)</h3>
        <div class="demo-box">
          <ThemeProvider label="Toggle" calculate_variants={defaultVariants} />
          <span class="note">
            Generates <code>--stp-background-alpha_primary</code> … <code>-alpha_quaternary</code>
          </span>
        </div>
      </div>

      <div class="demo-section">
        <h3>Live — Custom (semantic opacity steps)</h3>
        <div class="demo-box">
          <ThemeProvider label="Toggle" calculate_variants={customVariants} />
          <span class="note">
            Generates <code>--stp-background-subtle</code>, <code>-muted</code>, <code>-strong</code>
          </span>
        </div>
      </div>

      <div class="demo-section">
        <h3>Code</h3>
        <pre><code>{`import { ThemeProvider } from "solid-theme-provider";

const myVariants = (name: string, value: string) => {
  const isHex = /^#[0-9A-F]{6}$/i.test(value);
  if (isHex) {
    return {
      [name + "-subtle"]: value + "33",
      [name + "-muted"]:  value + "88",
      [name + "-strong"]: value + "dd",
    };
  }
  return {};
};

<ThemeProvider calculate_variants={myVariants} />`}</code></pre>
      </div>

      <div class="demo-section">
        <h3>Default behavior</h3>
        <pre><code>{`// Built-in calculate_variants
(name, value) => {
  if (/^#[0-9A-F]{6}$/i.test(value)) {
    return {
      [name + "-alpha_primary"]:    value + "f2", // 95%
      [name + "-alpha_secondary"]:  value + "99", // 60%
      [name + "-alpha_tertiary"]:   value + "4d", // 30%
      [name + "-alpha_quaternary"]: value + "17", //  9%
    };
  }
  return {};
};`}</code></pre>
      </div>
    </main>
  );
}
