<template>
    <div>
        <modals-container></modals-container>

        <Toasts/>

        <nuxt/>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import Toasts from '~/components/toast/Toasts';

    @Component({
        components: {Toasts}
    })
    export default class None extends Vue {
    }
</script>

