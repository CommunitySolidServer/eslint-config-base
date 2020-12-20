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

