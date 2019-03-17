<template>
    <div>
        <modals-container></modals-container>

        <Toasts/>

        <DevWarsHeader/>

        <nuxt/>

        <DevWarsFooter/>
    </div>
</template>

<script>
    import Vue from 'vue';

    import Header from '~/components/layout/Header';
    import Footer from '~/components/layout/Footer';
    import Toasts from '~/components/toast/Toasts';

    export default {
        name: "Default",
        components: {DevWarsHeader: Header, DevWarsFooter: Footer, Toasts}

    }
</script>
