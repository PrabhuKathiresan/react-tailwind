import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // A leading underscore marks a value left unused on purpose; so does a prop pulled out of
      // a rest spread just to keep it off the element.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      // `interface XProps extends HTMLAttributes<…> {}` names a public props type that can grow.
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
      // Baseline until their own changes land; new code shouldn't add to either.
      // `any` → real types: 213 to go. SelectBox's hooks: it returns early before them.
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['src/components/SelectBox/SelectBox.tsx'],
    rules: { 'react-hooks/rules-of-hooks': 'warn' },
  },
])
