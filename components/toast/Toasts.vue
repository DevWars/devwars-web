<template>
    <transition-group tag="div" class="toast" name="bounceRight">
        <Toast :toast="toast" v-for="toast in toasts" :key="toast.id"></Toast>
    </transition-group>
</template>

<script>
    import Vue from 'vue';

    import Toast from '~/components/toast/Toast';

    export default {
        name: "Toasts",
        components: {Toast},
        computed: {
            toasts() {
                return this.$store.state.toast.toasts;
            }
        }
    }
</script>
