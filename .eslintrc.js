module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {jsx: true},
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@app-config', './app-config'],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
    react: {version: 'detect'},
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'standard',
    'plugin:prettier/recommended',
  ],
  globals: {},
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSpacing: false,
        printWidth: 100,
        semi: false,
        singleQuote: true,
      },
    ],
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'prefer-promise-reject-errors': [2, {allowEmptyReject: true}],
    camelcase: ['error', {properties: 'never', ignoreDestructuring: true}],
  },
}
