<template>
    <div>
        <modals-container></modals-container>

        <Toasts/>

        <nuxt/>
    </div>
</template>

<script>
    import Vue from 'vue';

    import Toasts from '~/components/toast/Toasts';

    export default {
        name: "None",
        components: {Toasts}
    }
</script>

