/* eslint-env node */
/* eslint-disable */
module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "jest/globals": true 
  },
  "extends": [ 
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react", "jest"
  ],
  "rules": {
      "quotes": [
          "warn",
          "double"
      ],
      "semi": [
          "warn",
          "never"
      ],
      "no-unused-vars": [
          "warn"
      ],
      "eqeqeq": "error",
      "react/no-unescaped-entities": 0,
      "object-curly-spacing": [
          "warn", "always"
      ],
      "arrow-spacing": [
          "error", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/prop-types": 0
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}