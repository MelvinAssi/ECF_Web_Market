import { defineConfig } from "eslint/config";

export default defineConfig({
  files: ["**/*.{js,jsx,ts,tsx}"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: "module"
  },
  rules: {
    // tes règles personnalisées ici
  },
  settings: {
    react: {
      version: "detect"
    }
  }
});
