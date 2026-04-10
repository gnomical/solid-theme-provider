import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.tsx",
  jsx: "preserve",
  output: [
    {
      file: "dist/index.jsx",
      format: "es",
    },
  ],
  external: ["solid-js"],
  plugins: [
    typescript({
      compilerOptions: {
        jsx: "preserve",
        outDir: "./dist",
        declaration: false,
      },
    }),
    json(),
    postcss({
      minimize: true,
      modules: true,
      plugins: [],
    }),
  ],
};
