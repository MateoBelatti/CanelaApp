// eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  eslintConfigPrettier,
);
