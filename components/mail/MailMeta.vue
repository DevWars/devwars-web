<template>
    <mj-wrapper>
        <mj-raw>
            <div v-bind="$props" />
        </mj-raw>
        <slot name="default" />
    </mj-wrapper>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import { Prop } from 'vue-property-decorator';

    @Component({
        props: ['subject']
    })
    export default class extends Vue {
        @Prop() subject;
    }
</script>
