module.exports = [
    {
      files: ["**/*.js"],
      ignores: ["node_modules/**"],
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: "commonjs"
      },
      rules: {
        "no-unused-vars": "warn",
        "no-undef": "error"
      }
    }
  ];