module.exports = {
  root: true,
  // ref: https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:jsonc/recommended-with-json',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'jsonc/sort-keys': 'error',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  settings: {
    react: {
      // eslint-plugin-react settings
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.json'],
      parser: 'jsonc-eslint-parser',
    },
  ],
}