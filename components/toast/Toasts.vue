<template>
    <transition-group tag="div" class="toast" name="bounceRight">
        <Toast v-for="toast in toasts" :key="toast.id" :toast="toast"/>
    </transition-group>
</template>


<script>
import Toast from '~/components/toast/Toast';

export default {
    name: 'Toasts',
    components: { Toast },
    computed: {
        toasts() {
            return this.$store.state.toast.toasts;
        },
    },
};
</script>
