const path = require("path");

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true,
    },
    project: path.join(__dirname, "tsconfig.json"),
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "prettier",
    "import",
    "simple-import-sort",
    "sort-keys-fix",
    "typescript-sort-keys",
    "prefer-arrow",
  ],
  rules: {
    "@typescript-eslint/sort-type-union-intersection-members": "off",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/restrict-template-expressions": "error",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-redundant-type-constituents": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/no-wrapper-object-types": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/prefer-promise-reject-errors": "error",
    "@typescript-eslint/await-thenable": "error",

    camelcase: "off",
    "func-style": ["error", "expression", { allowArrowFunctions: true }],
    "object-shorthand": ["error", "always"],
    "prefer-arrow/prefer-arrow-functions": [
      "warn",
      {
        classPropertiesAllowed: false,
        disallowPrototype: true,
        singleReturnOnly: false,
      },
    ],
    "import/no-named-as-default": "error",
    "import/namespace": [
      "error",
      {
        allowComputed: true,
      },
    ],
    "prefer-const": "error",
    "no-constant-condition": "error",
    "no-empty": "error",
    "no-prototype-builtins": "error",
    "no-unreachable": "error",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    "sort-keys-fix/sort-keys-fix": "error",
    "typescript-sort-keys/interface": "error",
    "typescript-sort-keys/string-enum": "error",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
      typescript: {
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
  },
  ignorePatterns: [
    "/*.js", // Ignore only .js files in the root directory
    ".eslintrc.cjs", // Ignore ESLint config file itself
    "dist/**/*", // Ignore build output
    "node_modules/**/*", // Ignore node_modules
  ],
  overrides: [
    {
      files: ["**/react-native/**/*.{ts,tsx}"],
      rules: {
        // React Native is a CommonJS package that doesn't play well with ESLint's namespace checking
        // The package structure confuses the parser when it tries to validate imports
        // This is a known limitation when using TypeScript with React Native
        "import/namespace": "off",
      },
    },
  ],
  root: true,
};
