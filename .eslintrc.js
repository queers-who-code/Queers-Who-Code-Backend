module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  // https://eslint.org/docs/rules
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        // varsIgnorePattern: 'next',
        // varargsIgnorePattern: 'next',
      },
    ],
  },
};
