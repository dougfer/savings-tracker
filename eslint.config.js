const expoConfig = require('eslint-config-expo/flat');
const eslintConfigPrettier = require('eslint-config-prettier');
const tailwindcss = require('eslint-plugin-tailwindcss');

const SRC_FILES = ['src/**/*.{js,jsx,ts,tsx}'];
const SRC_TS_FILES = ['src/**/*.{ts,tsx,d.ts}'];

module.exports = [
  // Expo base (React, React Hooks, TS, import) — scoped to src/
  ...expoConfig.map((cfg) => ({ ...cfg, files: SRC_FILES })),

  // Tailwind CSS / NativeWind — catches contradictions and enforces shorthand
  ...tailwindcss.configs['flat/recommended'].map((cfg) => ({
    ...cfg,
    files: SRC_FILES,
  })),
  {
    files: SRC_FILES,
    settings: {
      tailwindcss: {
        callees: ['className', 'clsx', 'cn', 'cva', 'twMerge'],
        config: 'tailwind.config.js',
      },
    },
    rules: {
      'tailwindcss/classnames-order': 'off', // handled by prettier-plugin-tailwindcss
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/enforces-shorthand': 'warn',
      'tailwindcss/no-unnecessary-arbitrary-value': 'warn',
      'tailwindcss/no-custom-classname': 'off', // project uses design-token classes
    },
  },

  // React best-practice overrides
  {
    files: SRC_FILES,
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/self-closing-comp': 'warn',
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/no-array-index-key': 'warn',
      'react/hook-use-state': 'warn',

      'react-hooks/exhaustive-deps': 'warn',

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            { pattern: 'react', group: 'builtin', position: 'before' },
            { pattern: 'react-native', group: 'builtin', position: 'before' },
            { pattern: 'expo-*', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-native'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'warn',

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-nested-ternary': 'warn',
    },
  },

  // TypeScript overrides — scoped to TS files in src/
  {
    files: SRC_TS_FILES,
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Prettier must be last — disables all formatting rules that conflict
  eslintConfigPrettier,

  // Global ignores — everything outside src/ and test directories inside src/
  {
    ignores: [
      '!src/**',
      'src/test/**',
      'src/tests/**',
      'dist/**',
      'node_modules/**',
      '.specify/**',
      'web-build/**',
      '.expo/**',
      'coverage/**',
      '*.min.js',
    ],
  },
];
