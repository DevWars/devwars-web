<template>
    <div>
        <modals-container></modals-container>

        <DevWarsHeader/>

        <nuxt/>

        <DevWarsFooter/>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import Header from '~/components/layout/Header';
    import Footer from '~/components/layout/Footer';

    @Component({
        components: {DevWarsHeader: Header, DevWarsFooter: Footer}
    })
    export default class Default extends Vue {
    }
</script>
