module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'eslint:recommended',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'no-console': 'off',
    eqeqeq: 'off',
    'no-prototype-builtins': 'off',
    semi: ['error', 'never'],
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['pages/**/*.vue', 'layouts/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
}
