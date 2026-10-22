import baseConfig from '@halfwave/config-eslint';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '_legacy/**'],
  },
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
];
