/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ["shortl"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json", "./apps/*/tsconfig.json", "./packages/*/tsconfig.json"],
  },
  settings: {
    react: {
      version: "detect",
    },
    next: {
      rootDir: ["apps/nextjs"],
    },
  },
};

module.exports = config;
