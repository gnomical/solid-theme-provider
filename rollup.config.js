import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import jsx from "acorn-jsx";

export default {
  input: "src/index.tsx",
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
      } 
    }),
    json(),
    postcss({
      minimize: true,
      plugins: [],
    }),
  ],
  acornInjectPlugins: [jsx()],
};
