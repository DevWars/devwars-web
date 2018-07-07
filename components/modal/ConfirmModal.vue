<template>
    <div>
        <h1 v-if="title">
            {{ title }}
        </h1>
        <p>
            {{ description }}
        </p>

        <div class="modal__actions">
            <button class="btn btn-link" @click="close(false)">
                {{ cancelText }}
            </button>
            <button class="btn btn-primary" @click="close(true)">
                {{ confirmText }}
            </button>
        </div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';

    @Component
    export default class ConfirmModal extends Vue {
        @Prop() title;
        @Prop() description;
        @Prop({default: 'Cancel'}) cancelText;
        @Prop({default: 'Okay'}) confirmText;

        @Prop() resolve;
        @Prop() reject;
    }
</script>
