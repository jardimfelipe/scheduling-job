module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2020: true,
        jest: true,
    },
    extends: "airbnb",
    parserOptions: {
        ecmaVersion: 11,
    },
    rules: {
        "func-names": ["error", "never"],
    },
};
