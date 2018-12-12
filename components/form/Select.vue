<template>
    <div class="select-container">
        <select
            :type="type"
            :value="value"
            @input="e => $emit('input', e.target.value)"
            :class="['form-control', {empty: !valid},  {valid}]"
        >
            <slot></slot>
        </select>
        <label>{{ label }}</label>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import { Prop } from 'vue-property-decorator';

    @Component({})
    export default class extends Vue {
        @Prop() type;
        @Prop() value;
        @Prop() label;

        get valid() {
            return !(this.value == null || typeof this.value === "undefined")
        }
    }
</script>

