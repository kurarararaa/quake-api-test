module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'space-before-function-paren': ['error', 'never'],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    semi: ['error', 'never'],
    quotes: [2, 'single'],
    'keyword-spacing': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'space-before-blocks': 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
  },
}
