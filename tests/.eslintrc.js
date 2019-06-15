module.exports = {
  // https://eslint.org/docs/rules
  rules: {
    'no-unused-expressions': 'off',
    'no-undef': 'off',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        varsIgnorePattern: 'should',
      },
    ],
  },
};
