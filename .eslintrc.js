module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    jest: true,
  },
  extends: ['airbnb/legacy',],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'comma-dangle': ['error', 'always',],
    'no-console': 'off',
    strict: 'off',
    'no-new': 'off',
    'comma-spacing': 'off',
    indent: 'off',
  },
};
