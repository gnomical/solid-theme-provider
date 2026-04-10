import { defineConfig } from "vite"
import solid from "vite-plugin-solid"

export default defineConfig({
  plugins: [solid()],
  build: {
    lib: {
      entry: new URL("src/index.tsx", import.meta.url).pathname,
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web", "solid-js/store"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].jsx",
        assetFileNames: "[name][extname]",
      },
    },
    cssCodeSplit: true,
    minify: false,
  },
})
