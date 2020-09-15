
module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest': true
    },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': ['off'],
    "react/no-direct-mutation-state": 1,
    "react/no-multi-comp": 1,
    "react/no-set-state": 0,
    "react/no-unknown-property": 1,
    "react/prop-types":0,
    "react/react-in-jsx-scope": 0,
    "react/require-extension": 0,
    "react/self-closing-comp": 1,
    "react/sort-comp": 1,
    "indent": ["error", "tab"],
    'linebreak-style': ['off'],
    'eqeqeq': 'error',
    "comma-dangle": 1,
    "no-extra-semi": 1,
    "no-undef": 1,
    "no-unused-vars": 1,
    'no-warning-comments': ["error", { "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['warn', { allow: ['info', 'error'] }]

  },
};
