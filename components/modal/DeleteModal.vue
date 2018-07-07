<template>
    <div class="modal">
        <h1 class="modal__title">{{ title }}</h1>
        <p class="modal__desc" v-if="description">{{ description }}</p>

        <div class="modal__actions">
            <button class="btn btn-link" @click="$emit('close')"> {{ cancel }}</button>
            <button class="btn btn-danger" @click="close(true)">{{ confirm }}</button>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';

    @Component({})
    export default class extends Vue {
        @Prop({default: "Warning!"}) title;
        @Prop() description;
        @Prop({default: "Cancel"}) cancel;
        @Prop({default: "Delete"}) confirm;

        @Prop() resolve;
        @Prop() reject;
    }
</script>
