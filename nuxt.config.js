/* eslint-disable nuxt/no-cjs-in-config */

require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const apiUrl = process.env.API_URL || 'http://localhost:8080';
const discordClient = process.env.DISCORD_CLIENT || '';
const twitchClient = process.env.TWITCH_CLIENT || '';

export default {
    mode: 'universal',
    env: {
        baseUrl,
        apiUrl,
        discordClient,
        twitchClient,
        version: process.env.npm_package_version,
    },
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
                href:
                    'https://use.fontawesome.com/releases/v5.12.1/css/all.css',
                integrity:
                    'sha384-v8BU367qNbs/aIZIxuivaU55N5GPF89WBerHoGA4QTcbUjYiLQtKdrfXnqAcXyTv',
                crossorigin: 'anonymous',
            },
        ],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#ff007d' },
    /*
     ** Global CSS
     */
    css: ['cropperjs/dist/cropper.css', 'vue-js-modal/dist/styles.css'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '@/plugins/ga.js', ssr: false },
        { src: '@/plugins/send-back', ssr: false },
        '@/plugins/global',
        '@/plugins/directives',
        '@/plugins/axios',
        '@/plugins/filters',
        '@/plugins/mixins',
        '@/plugins/modal',
        '@/plugins/highlight',
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // Doc: https://github.com/nuxt-community/dotenv-module
        '@nuxtjs/dotenv',
    ],

    router: {
        linkExactActiveClass: 'active',
        middleware: ['update-latest-route', 'auth'],
    },

    debug: process.env.NODE_ENV === 'development',

    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: apiUrl,
        browserBaseURL: apiUrl,
        credentials: true,
    },

    /*
     ** Build configuration
     */
    build: {
        transpile: [/^vue-awesome/],
        plugins: [
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }),
        ],
        loaders: {
            loaders: {
                scss: { sourceMap: false },
            },
        },
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

                config.devtool = 'source-map';
            }

            config.resolve.alias['utils.scss$'] = path.resolve(
                'assets/styles/utils.scss',
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
