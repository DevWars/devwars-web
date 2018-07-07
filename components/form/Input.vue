<template>
    <input
        :type="type"
        :value="value"
        @input="e => $emit('input', e.target.value)"
        :class="['form-control', {empty: !(value && value.length)},  {valid: value && value.length}]"
    />
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import { Prop } from 'vue-property-decorator';

    @Component({})
    export default class extends Vue {
        @Prop() type;
        @Prop() value;
    }
</script>

