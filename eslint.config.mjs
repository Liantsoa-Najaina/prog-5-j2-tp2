import js from "@eslint/js";
import globals from "globals";
import {defineConfig} from "eslint/config";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: {
            js,
            "@typescript-eslint": tsPlugin,
        },
        extends: ["js/recommended"],
        languageOptions: {
            globals: globals.browser,
            parser: tsParser,
        },
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "class",
                    format: ["PascalCase"],
                },
                {
                    selector: "variable",
                    format: ["camelCase"],
                },
                {
                    selector: "method",
                    format: ["camelCase"],
                },
                {
                    selector: "function",
                    format: ["camelCase"],
                },
            ],
        },
    },
]);
