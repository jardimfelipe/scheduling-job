module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    jest: true,
  },
  extends: ["airbnb/legacy", "prettier",],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    "linebreak-style": ["error", "unix",],
    quotes: ["error", "double",],
    semi: ["error", "always",],
    "comma-dangle": ["error", "always",],
    "no-cond-assign": ["error", "always",],
    "no-console": "off",
    strict: "off",
    "no-new": "off",
  },
};
