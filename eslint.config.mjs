import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.turbo/**', '**/coverage/**', '**/*.gen.ts', 'pnpm-lock.yaml'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mjs'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-empty': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    files: ['apps/api/**/*.ts', 'apps/worker/**/*.ts', 'packages/**/*.ts'],
    languageOptions: { globals: { ...globals.node, ...globals.jest } },
  },
  eslintConfigPrettier,
);
