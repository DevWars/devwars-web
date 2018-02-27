<template>
    <div class="toast__item" :class="[toast.type]">
        <i class="toast__icon"></i>
        <p class="toast__message">
            {{ toast.message }}
        </p>
        <button class="toast__close"></button>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';

    @Component({})
    export default class Toast extends Vue {
        @Prop() toast;
    }
</script>
