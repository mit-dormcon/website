/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    reactPlugin.configs.flat.recommended,
    ...compat.extends(
        "plugin:@docusaurus/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
    ),
    reactPlugin.configs.flat["jsx-runtime"],
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        ...reactPlugin.configs.flat.recommended,
        languageOptions: {
            ...reactPlugin.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.serviceworker,
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
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

// export default [
//     ...compat.extends(
//         "eslint:recommended",
//         "plugin:@typescript-eslint/strict",
//         "plugin:@typescript-eslint/stylistic",
//         "plugin:react/recommended",
//         "plugin:@docusaurus/recommended",
//         "plugin:react/jsx-runtime",
//     ),
//     {
//         plugins: {
//             "@typescript-eslint": typescriptEslint,
//             react,
//         },

//         languageOptions: {
//             globals: {
//                 ...globals.browser,
//             },

//             parser: tsParser,
//             ecmaVersion: "latest",
//             sourceType: "module",
//         },

//         settings: {
//             react: {
//                 version: "detect",
//             },
//         },

//         rules: {
//             "@docusaurus/no-untranslated-text": [
//                 "off",
//                 {
//                     ignoredStrings: ["·", "—", "×"],
//                 },
//             ],
//         },
//     },
//     {
//         files: ["**/.eslintrc.{js,cjs}"],

//         languageOptions: {
//             globals: {
//                 ...globals.node,
//             },

//             ecmaVersion: 5,
//             sourceType: "commonjs",
//         },
//     },
// ];
