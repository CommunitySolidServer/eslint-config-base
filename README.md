# ESLint Base Configuration

Solid defaults for eslinting.

## Install

1. Install package and its peer-dependencies
   ```bash
   npm install --save-dev @solid/eslint-config-base
   npx install-peerdeps -D @solid/eslint-config-base
   ```
2. Create `.eslintrc.js` extending base configuration
   ```bash
   printf 'module.exports = {\n  extends: [ "@solid/eslint-config-base" ]\n};\n' > .eslintrc.js
   ```


## Linting TypeScript

### Requirements

Requires both `'./tsconfig.json'` and `'./test/tsconfig.json'`.

Create a simple tests TypeScript configuration extending from the base one:
```json
{
   "extends": "../tsconfig.json",
   "include": [
      "."
   ]
}
```

### A common error

Why is `'./test/tsconfig.json'` required?

1. We use `'./tsconfig.json'` which should not include the `test` directory for [parser options](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser/README.md#configuration).
2. The `@typescript-eslint/parser` needs to know how to parse all TypeScript files.
3. Without a TypeScript configuration for tests linting will error:
   ```bash
   Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
   The file does not match your project config: <TEST_FILE>
   The file must be included in at least one of the projects provided.
   ```

Therefore `@typescript-eslint/parser`'s project parser options has `'./tsconfig.json'` and `'./test/tsconfig.json'`.

Linting will error if `'./test/tsconfig.json'` is missing from a TypeScript project using `@solid/eslint-config-base`.
