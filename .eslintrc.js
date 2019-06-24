module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  rules: {
    "no-console": "off",
    "no-dupe-class-members": "off"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
