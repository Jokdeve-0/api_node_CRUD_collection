import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    languageOptions:
    {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      }
    }
  },
  {
    rules: {
      'no-unused-vars': ['warn'],
      'no-undef': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'no-console': ['error', { allow: ['warn', 'error', 'log', 'dir'] }],
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'object-curly-spacing': ['error', 'always'],
      'no-trailing-spaces': ['error'],
    }
  }
];
