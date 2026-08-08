//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  {
    // Artefacts de build et fichiers generes : jamais lintes.
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      '.output/**',
      '.nitro/**',
      '.tanstack/**',
      'dist/**',
      'src/routeTree.gen.ts',
    ],
  },
  ...tanstackConfig,
  {
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
    },
  },
  {
    // Composants generes par `pnpm shadcn add` : non modifies a la main.
    files: ['src/shared/components/ui/**'],
    rules: {
      'import/consistent-type-specifier-style': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
    },
  },
]
