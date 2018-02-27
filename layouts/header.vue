<template>
    <div>
        <modals-container></modals-container>
        <Toasts/>

        <DevWarsHeader/>

        <nuxt/>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import Header from '~/components/layout/Header';

    import Toasts from '~/components/toast/Toasts';

    @Component({
        components: {DevWarsHeader: Header, Toasts}
    })
    export default class HeaderLayout extends Vue {
    }
</script>
