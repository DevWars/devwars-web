<template>
    <transition-group tag="div" class="toast" name="bounceRight">
        <Toast :toast="toast" v-for="toast in toasts" :key="toast.id"></Toast>
    </transition-group>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import Toast from '~/components/toast/Toast';

    @Component({
        components: {Toast}
    })
    export default class Toasts extends Vue {
        @State(state => state.toast.toasts) toasts;
    }
</script>
