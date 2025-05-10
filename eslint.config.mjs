import globals from "globals";
import eslint from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
    recommendedConfig: eslint.configs.recommended,
    allConfig: eslint.configs.all,
});

import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    reactPlugin.configs.flat.recommended,
    reactHooks.configs["recommended-latest"],
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
            "react-hooks/exhaustive-deps": "off",
        },
    },
    {
        ignores: [".docusaurus/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    },
);
