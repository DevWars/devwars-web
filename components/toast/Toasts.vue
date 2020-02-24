<template>
    <transition-group tag="div" class="Toasts" name="bounceRight">
        <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" />
    </transition-group>
</template>

<script>
import Toast from '@/components/toast/Toast';

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

<style lang="scss" scoped>
@import 'utils.scss';
$toast-margin-x: 10px;

.Toasts {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: $toast-margin-x;
    z-index: $zindex-tooltip;
}
</style>
