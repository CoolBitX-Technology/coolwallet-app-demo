module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['node_modules'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'prettier',
        'prettier/react',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
      ],
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          modules: true,
          jsx: true,
        },
        project: './tsconfig.json',
      },
      plugins: ['react', '@typescript-eslint'],
      rules: {
        'react/prop-types': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-empty-interface': 'off', // off
        '@typescript-eslint/no-var-requires': 'off',
        'react/display-name': 'off',

        // TODO: need to upgrade level to error after fixing that errors
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-this-alias': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        'no-empty-pattern': 'warn',
        'react/jsx-key': 'warn',
      },
    },
    {
      files: ['*.js', '*.jsx'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'prettier',
        'prettier/react',
        'plugin:react-hooks/recommended',
        'plugin:jest/recommended',
      ],
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          modules: true,
          jsx: true,
        },
      },
      plugins: ['react', 'react-hooks'],
      rules: {
        'react/prop-types': 'off',
        'no-unused-vars': [
          'error',
          {
            args: 'none',
          },
        ],
        'react-native/no-inline-styles': 0,
        'prettier/prettier': 0,
      },
    },
  ],
};
