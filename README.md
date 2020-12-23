# Solid ESLint base configuration
[![npm](https://img.shields.io/npm/v/@solid/eslint-config-base)](https://www.npmjs.com/package/@solid/eslint-config-base)

Solid defaults for eslinting.

## Install

1. Install package and its peer-dependencies
   ```bash
   npm install --save-dev @solid/eslint-config-base
   npx install-peerdeps -D @solid/eslint-config-base
   ```
2. Extend `@solid/eslint-config-base` from `.eslintrc.js`
   ```bash
   printf 'module.exports = {\n  extends: [ "@solid/eslint-config-base" ]\n};\n' > .eslintrc.js
   ```


## Linting TypeScript

### Requirements

TypeScript configuration files need to match the `./**/tsconfig.*json` glob pattern adopted
by Solid's ESLint base configuration.

All TypeScript files must be included in a `tsconfig`.

### A common error

A common error is missing a `tsconfig` for tests.
```bash
Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
The file does not match your project config: <TEST_FILE>
The file must be included in at least one of the projects provided.
```

To fix it, extend `tsconfig.json` from a `tsconfig.test.json` that includes the `test` folder.
```bash
printf '{\n  "extends": "./tsconfig.json",\n  "include": [ "test" ]\n}\n' > tsconfig.test.json
```
