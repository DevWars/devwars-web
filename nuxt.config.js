const webpack = require('webpack');

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'DevWars',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'DevWars'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto:300,400,500,700'},
            {rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v5.0.8/css/all.css', integrity: 'sha384-OGsxOZf8qnUumoWWSmTqXMPSNI9URpNYN35fXDb5Cv5jT6OR673ah1e5q+9xKTq6', crossorigin: 'anonymous' }
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#ff007d'},

    axios: {
        baseURL: 'http://localhost:3030/',
        browserBaseURL: 'http://localhost:3030/',
        credentials: true
    },

    css: [
        '~/assets/scss/main.scss',
        'webui-popover/src/jquery.webui-popover.css',
        'vue2-animate/dist/vue2-animate.css',
    ],

    plugins: [
        {src: '~plugins/ga.js', ssr: false },
        {src: '~/plugins/popover', ssr: false},
        '~/plugins/directives',
        '~/plugins/axios',
        '~/plugins/filters',
        '~/plugins/modal'
    ],

    modules: [
        '@nuxtjs/axios'
    ],

    router: {
        linkExactActiveClass: 'active',
        middleware: ['pending']

    },

    /*
    ** Build configuration
    */
    build:
        {
            babel: {
                plugins: ['transform-decorators-legacy', 'transform-class-properties', 'transform-flow-strip-types'],
                presets: ['stage-0']
            },

            plugins: [
                new webpack.ProvidePlugin({
                    '$': 'jquery',
                    'Popper': 'popper.js',
                })
            ],
            /*
            ** Run ESLint on save
            */
            extend(config, {isDev, isClient}) {
                if (isDev && isClient) {
                    config.module.rules.push({
                        enforce: 'pre',
                        test: /\.(js|vue)$/,
                        loader: 'eslint-loader',
                        exclude: /(node_modules)/
                    })
                }
            }
        }
}
;
