# ESLint Base Configuration

Solid defaults for eslinting.

## Install

1. Install package and its peer-dependencies
   ```bash
   npm install --save-dev @solid/eslint-config-base
   npx install-peerdeps -D @solid/eslint-config-base
   ```
2. Create `.eslintrc.js` file extending `@solid/eslint-config-base`
   ```bash
   printf 'module.exports = {\n  extends: [ "@solid/eslint-config-base" ]\n};\n' > .eslintrc.js
   ```


## Linting TypeScript

### Requirements

TypeScript configuration files need to match the `./**/tsconfig.*json` glob pattern adopted by `@solid/eslint-config-base`.

All TypeScript files must be included in a `tsconfig` file.

### A common error

1. A common error is missing a `tsconfig.json` file that includes test files
   ```bash
   Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
   The file does not match your project config: <TEST_FILE>
   The file must be included in at least one of the projects provided.
   ```
3. The `@solid/eslint-config-base` uses a glob pattern `./**/tsconfig.*json` in its [parser options](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser/README.md#configuration)
4. Create a simple TypeScript configuration file `tsconfig.test.json` that extends the main `tsconfig.json` and includes in the `test` folder:
   ```bash
   printf '{\n  "extends": "./tsconfig.json",\n  "include": [ "test" ]\n}\n' > tsconfig.test.json
   ```
