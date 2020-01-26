module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  plugins: ['vue'],
  rules: {
    curly: 'off',
    'vue/html-self-closing': 'off',
    'space-before-function-paren': 'off',
    'arrow-parens': 'off',
    'vue/html-self-closing': 'off'
  }
}
