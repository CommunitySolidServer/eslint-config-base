module.exports = {
  /**
   * Predefined global variables
   *
   * Browser, Node.js (+scoping), ECMAScript 6 features except for modules.
   *
   * See also: https://eslint.org/docs/user-guide/configuring#specifying-environments
   */
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  /**
   * Extends (overrides in order of extension):
   * - ESLint recommended https://eslint.org/docs/rules/
   * - Airbnb base https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base
   * - ES6+ export/imports https://github.com/benmosher/eslint-plugin-import/tree/master/config
   * - Prettier https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
   */
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],

  /**
   * Specify global variables
   *
   * See also: https://eslint.org/docs/user-guide/configuring#specifying-globals
   */
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },

  /**
   * Ignore files and directories
   */
  ignorePatterns: [ "**/dist/**/*", "**/coverage/**/*" ],

  /**
   * Specify modules directories
   *
   * See also: https://github.com/benmosher/eslint-plugin-import#resolvers
   */
  settings: {
    "import/resolver": {
      node: {
        extensions: [ ".js", ".ts" ],
        paths: [ "node_modules/", "node_modules/@types" ],
      },
    },
  },

  /**
   * JavaScript language options support
   *
   * See also: https://eslint.org/docs/user-guide/configuring#specifying-parser-options
   */
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },

  /**
   * Rules configuration
   * - ESLint https://eslint.org/docs/rules/
   * - ES6+ export/imports https://github.com/benmosher/eslint-plugin-import
   *
   * Note: Use rule severity "off", "warn" & "error" instead of their numeric equivalent 0, 1 & 2
   */
  rules: {
    // ESLint
    /**
     * Camel case
     *
     * 1. Override Airbnb's config to accomodate for json objects that might have snake case fields
     * 2. Explicitly allow the RDF/JS Quad_* types
     *
     * See also: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base
     */
    camelcase: [
      "warn",
      {
        "allow": [
          "Quad_*"
        ]
      }
    ],

    /**
     * Comments
     *
     * See also: https://eslint.org/docs/rules/multiline-comment-style#enforce-a-particular-style-for-multiline-comments-multiline-comment-style
     */
    "multiline-comment-style": [ "error", "starred-block" ],

    /**
     * Syntax restrictions
     *
     * Note: Removes airbnb's ForOfStatement recommendation; we don't use regenerator-runtime anyway,
     * and we iterate over Sets in our libraries. Avoids TypeScript features that generate runtime
     * code, it aligns with the TypeScript design goals stated in
     * https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals#goals.
     * So no enum, namespace (taken care of by @typescript-eslint/recommended), parameter properties,
     * or experimental decorators (TODO).
     *
     * See also: https://eslint.org/docs/rules/no-restricted-syntax#disallow-specified-syntax-no-restricted-syntax
     */
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      {
        selector: "LabeledStatement",
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "TSEnumDeclaration",
        message:
          "Avoid enums as they result in runtime code; TypeScript should be types only.",
      },
      {
        selector: "TSParameterProperty",
        message:
          "Avoid parameter properties as they result in runtime code; TypeScript should be types only.",
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
    ],

    /**
     * No overwriting built-in globals (for example URL)
     *
     * See also: https://eslint.org/docs/rules/no-shadow
     */
    "no-shadow": [ "error", { builtinGlobals: true } ],

    // ES6+ export/imports
    /**
     * No file extensions within the import source path
     *
     * See also: https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
     */
    "import/extensions": [
      "error",
      {
        js: "never",
        jsx: "never",
        mjs: "never",
        ts: "never",
        tsx: "never",
      },
    ],

    /*
     * No default exports
     *
     * See also: https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-default-export.md
     */
    "import/no-default-export": "error",
    "import/prefer-default-export": "off",

    /**
     * No duplicate imports
     *
     * See also: https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
     */
    "import/no-duplicates": "error",

    /**
     * No dev dependencies except in tests
     *
     * See also: https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
     */
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [ "**/*.test.*", "**/test/**/*.*" ],
      },
    ],

    /**
     * No unsorted import statements
     *
     * See also: https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
     */
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "never",
      },
    ],
  },

  /**
   * TypeScript support
   */
  overrides: [
    {
      files: [ "*.ts", "*.tsx" ],

      /**
       * Base parser configuration on tsconfig.json files
       *
       * See also: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser/README.md#configuration
       */
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: './**/tsconfig*.json',
      },

      /**
       * Extends (overrides in order of extension):
       * - TypeScript recommended+type checking+prettier https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/configs
       */
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      /**
       * Rules configuration
       * - TypeScript https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
       */
      rules: {
        // TypeScript
        /**
         * Type imports
         *
         * See also: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.md
         */
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { prefer: "type-imports" },
        ],

        /**
         * Naming convention
         *
         * See also: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
         */
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "default",
            format: [ "camelCase" ],
            leadingUnderscore: "forbid",
            trailingUnderscore: "forbid",
          },
          {
            selector: "memberLike",
            format: [ "camelCase", "snake_case" ],
            leadingUnderscore: "forbid",
            trailingUnderscore: "forbid",
          },
          {
            selector: "variable",
            format: [ "camelCase", "UPPER_CASE" ],
            leadingUnderscore: "forbid",
            trailingUnderscore: "forbid",
          },
          {
            selector: "typeLike",
            format: [ "PascalCase" ],
          },
          {
            selector: [ "typeParameter" ],
            format: [ "PascalCase" ],
            custom: {
              regex: "^[T,K,P]$",
              match: true,
            },
          },
        ],

        /**
         * No empty functions except arrow functions
         *
         * Note: arrow functions are useful as defaults or for testing mocks
         *
         * See also: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
         */
        "@typescript-eslint/no-empty-function": [
          "error",
          { allow: [ "arrowFunctions" ] },
        ],

        /**
         * No unhandled promise rejection
         *
         * See also: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md
         */
        "@typescript-eslint/no-floating-promises": "error",

        /**
         * No return await
         *
         * See also: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
         */
        "no-return-await": [ "off" ],
        "@typescript-eslint/return-await": "error",

        /**
         * No unused variables
         *
         * See also: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
         */
        "@typescript-eslint/no-unused-vars": "error",
      },
    },
    {
      files: [ "*.test.ts", "*.test.js" ],

      /**
       * Extends (overrides in order of extension):
       * - Jest https://github.com/jest-community/eslint-plugin-jest#rules
       */
      extends: [
        "plugin:jest/recommended",
        "plugin:jest/style",
      ],
    },
  ],
};
