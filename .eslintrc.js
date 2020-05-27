module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended',
        'eslint:recommended',
        'plugin:vue/recommended',
    ],
    plugins: ['vue'],
    rules: {
        curly: 'off',
        'vue/html-self-closing': 'off',
        'space-before-function-paren': 'off',
        'arrow-parens': 'off',
        'vue/html-self-closing': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'no-useless-escape': 'off',
        semi: ['error', 'always'],
        indent: ['error', 4],
        'vue/html-indent': ['error', 4],
    },

    ignorePatterns: ['/client/*'],
};
