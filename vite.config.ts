import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import { libInjectCss } from "vite-plugin-lib-inject-css"

export default defineConfig({
  plugins: [libInjectCss()],
  esbuild: {
    jsx: "preserve",
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL("src/index.tsx", import.meta.url)),
      formats: ["es"],
    },
    target: "esnext",
    minify: false,
    rollupOptions: {
      external: ["solid-js", "solid-js/web", "solid-js/store"],
      jsx: { mode: "preserve" },
      output: {
        assetFileNames: "[name][extname]",
        entryFileNames: "index.jsx",
      },
    },
  },
})
