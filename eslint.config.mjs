// @ts-check

import globals from "globals";
import eslint from "@eslint/js";

import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import { fileURLToPath } from "node:url";

import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";
// import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
    recommendedConfig: eslint.configs.recommended,
    allConfig: eslint.configs.all,
});

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig(
    includeIgnoreFile(gitignorePath),
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    reactPlugin.configs.flat.recommended,
    // reactHooks.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,
    ...compat.extends("plugin:@docusaurus/recommended"),
    reactPlugin.configs.flat["jsx-runtime"],
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        languageOptions: {
            globals: {
                ...globals.serviceworker,
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "@docusaurus/no-untranslated-text": [
                "off",
                {
                    ignoredStrings: ["·", "—", "×"],
                },
            ],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    caughtErrors: "all",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
    {
        ignores: [".docusaurus/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    },
);
