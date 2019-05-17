<template>
    <div>
        <modals-container/>

        <Toasts/>

        <DevWarsHeader/>

        <nuxt/>

        <DevWarsFooter/>
    </div>
</template>


<script>
import Header from '~/components/layout/Header';
import Toasts from '~/components/toast/Toasts';

export default {
    name: 'Default',
    components: {
        DevWarsHeader: Header,
        DevWarsFooter: () => import('~/components/layout/Footer'),
        Toasts,
    },
};
</script>


<style lang="scss">
@import 'utils.scss';

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-family: $base-font-face;
    font-size: $font-size-base;
    line-height: $line-height-base;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    @include breakpoint(sm) {
        font-size: $font-size-sm;
    }
    @include breakpoint(xs) {
        font-size: $font-size-xs;
    }
}

body {
    height: 100%;
    color: $base-font-color;
    background: $body-bg;
    -webkit-font-smoothing: antialiased;
    transition: transform 300ms ease-in-out; // mobile-nav

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track-piece {
        background-color: $bg-color-3;
    }

    ::-webkit-scrollbar-thumb {
        background-color: $silver-color;
        outline: 2px solid $silver-color;
        outline-offset: -2px;
        border: 0.1px solid $silver-color;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: lighten($silver-color, 10%);
    }
}

img {
    border: 0;
    max-width: 100%;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
}

label {
    display: block;
}

a {
    color: $link-color;
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
    line-height: normal;
    color: $headings-color;
    word-wrap: break-word;
}

h1 {
    text-transform: $h1-transform;
    font-weight: $h1-font-weight;
    font-family: $h1-font-family;
    font-size: $h1-font-size;
}

h2 {
    text-transform: $h2-transform;
    font-weight: $h2-font-weight;
    font-family: $h2-font-family;
    font-size: $h2-font-size;
}

h3 {
    font-weight: $h3-font-weight;
    font-size: $h3-font-size;
}

h4 {
    font-weight: $h4-font-weight;
    font-size: $h4-font-size;
}

h5 {
    font-weight: $h5-font-weight;
    font-size: $h5-font-size;
}

h6 {
    font-weight: $h6-font-weight;
    font-size: $h6-font-size;
}

p {
    color: $p-color;
    line-height: $p-line-height;
    font-size: $p-font-size;
    word-wrap: break-word;
}

.header-offset {
    padding-top: $header-offset;
    padding-bottom: $xl-space;

    @include breakpoint(md) {
        padding-top: $header-offset / 2;
    }

    @include breakpoint(sm) {
        padding-top: $header-offset / 4;
    }
}

.header-onset {
    padding-top: $header-height;
}

.footer-offset {
    padding-bottom: $xl-space;
}
</style>
