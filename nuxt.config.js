const path = require('path');
const webpack = require('webpack');
const parser = require('body-parser');

module.exports = {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: 'DevWars',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'DevWars is a live game show where web developers compete against each other in 60  ' +
                    'minute coding challenges. Join our educational and entertaining platform of experienced ' +
                    'and aspiring members.',
            },
            {
                name: 'google-site-verification',
                content: 'RLFyk9dzTQTWw10KYT1_-C3uMy4Itz26Har6xRbv_Co',
            },
            { name: 'og:title', content: 'Esports for Developers - DevWars' },
            { name: 'og:image', content: 'https://devwars.tv/og/logo.jpeg' },
            {
                name: 'og:description',
                content:
                    'DevWars is a live game show where web developers compete against each other in 60 ' +
                    'minute coding challenges. Join our educational and entertaining platform of experienced' +
                    ' and aspiring members.',
            },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto:300,400,500,700',
            },
            {
                rel: 'stylesheet',
                href: 'https://pro.fontawesome.com/releases/v5.0.8/css/all.css',
                integrity:
                    'sha384-OGsxOZf8qnUumoWWSmTqXMPSNI9URpNYN35fXDb5Cv5jT6OR673ah1e5q+9xKTq6',
                crossorigin: 'anonymous',
            },
        ],
    },

    serverMiddleware: [
        { path: '/mail/translate', handler: parser.json({ limit: '5mb' }) },
        { path: '/mail/translate', handler: '~/mail/translate' },
        { path: '/mail/render', handler: '~/mail/render' },
    ],

    debug: true,
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#ff007d' },

    axios: {
        baseURL: 'http://localhost:8080/',
        browserBaseURL: 'http://localhost:8080/',
        credentials: true,
    },

    render: {
        gzip: false,
    },

    css: [
        '~assets/scss/main.scss',
        'cropperjs/dist/cropper.css',
        'flatpickr/dist/flatpickr.css',
        'vue-js-modal/dist/styles.css',
    ],

    plugins: [
        { src: '~plugins/ga.js', ssr: false },
        { src: '~/plugins/send-back', ssr: false },
        '~/plugins/directives',
        '~/plugins/axios',
        '~/plugins/filters',
        '~/plugins/mixins',
        '~/plugins/modal',
    ],

    modules: ['@nuxtjs/axios'],

    router: {
        linkExactActiveClass: 'active',
        middleware: ['pending', 'update-latest-route'],
    },

    /*
     ** Build configuration
     */
    build: {
        plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
        babel: {
            presets() {
                return [
                    [
                        '@nuxt/babel-preset-app',
                        {
                            useBuiltIns: 'entry',
                        },
                    ],
                ];
            },
        },
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                });
            }

            config.resolve.alias['utils.scss$'] = path.resolve(
                'assets/styles/utils.scss'
            );
        },
    },
    watchers: {
        webpack: {
            aggregateTimeout: 300,
            poll: 1000,
        },
        ignored: /node_modules/,
    },
};
