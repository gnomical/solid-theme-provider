import { defineConfig } from "vite"
import { nitroV2Plugin as nitro } from "@solidjs/vite-plugin-nitro-2"
import { solidStart } from "@solidjs/start/config"
import { resolve } from "path"
import { fileURLToPath } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  plugins: [solidStart(), nitro()],
  resolve: {
    alias: {
      "solid-theme-provider": resolve(__dirname, "../src/index.tsx"),
    },
  },
})
