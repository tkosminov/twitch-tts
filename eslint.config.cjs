const globals = require('globals');
const typescript_eslint = require('typescript-eslint');
const prettier_plugin = require('eslint-plugin-prettier/recommended');
const vue_plugin = require('eslint-plugin-vue');

const default_ignores_pool = ['**/.git', '**/dist/**/*', '**/node_modules/**/*', '**/coverage/**/*', '**/*.d.ts'];

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...[typescript_eslint.configs.recommendedTypeChecked[1], typescript_eslint.configs.recommendedTypeChecked[2]].map((config) => ({
    ...config,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescript_eslint.parser,
      },
    },
    plugins: {
      '@typescript-eslint': typescript_eslint.plugin,
    },
    rules: {
      'no-unused-vars': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['src/*'],
              message: 'No import from src!',
            },
          ],
        },
      ],
    },
    files: ['**/*.{ts}'],
    ignores: [...default_ignores_pool],
  })),
  ...vue_plugin.configs['flat/recommended'].map((config) => ({
    ...config,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescript_eslint.parser,
      },
    },
    plugins: {
      '@typescript-eslint': typescript_eslint.plugin,
      vue: vue_plugin,
    },
    rules: {
      'no-unused-vars': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['src/*'],
              message: 'No import from src!',
            },
          ],
        },
      ],
    },
    files: ['**/*.{vue}'],
    ignores: [...default_ignores_pool],
  })),
  {
    ...prettier_plugin,
    name: 'prettier/recommended',
    ignores: [...default_ignores_pool],
  },
];
