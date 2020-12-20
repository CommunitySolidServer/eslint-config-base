# ESLint Base Configuration

Solid defaults for eslinting.

## Install

1. Install package and its peer-dependencies
   ```bash
   npm install --save-dev @solid/eslint-base-config
   npx install-peerdeps -D @solid/eslint-base-config
   ```
2. Create `.eslintrc.js` extending base configuration
   ```bash
   printf 'module.exports = {\n  extends: [ "@solid/eslint-base-config" ]\n};\n' > .eslintrc.js
   ```

