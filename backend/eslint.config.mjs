import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      ecmaVersion: 2021,
      sourceType: "commonjs",
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
