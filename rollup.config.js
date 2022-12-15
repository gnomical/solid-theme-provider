import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import jsx from "acorn-jsx";

const plugins = [
  nodeResolve({
    extensions: [".js", ".ts", ".tsx"],
  }),
  babel({
    extensions: [".js", ".ts", ".tsx"],
    babelHelpers: "bundled",
    presets: ["@babel/preset-typescript"],
    exclude: "node_modules/**",
  }),
];

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
    typescript({ compilerOptions: { jsx: "preserve" } }),
    json(),
    postcss({
      minimize: true,
      plugins: [],
    }),
  ],
  acornInjectPlugins: [jsx()],
};
