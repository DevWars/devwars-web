<template>
    <div class="select-container">
        <select
            :type="type"
            :value="value"
            :class="['form-control', {empty: !valid},  {valid}]"
            @input="e => $emit('input', e.target.value)"
        >
            <slot></slot>
        </select>
        <label v-if="label">{{ label }}</label>
    </div>
</template>


<script>
export default {
    name: 'Select',
    props: {
        type: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
    computed: {
        valid() {
            return !(this.value == null || typeof this.value === 'undefined');
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.select-container {
    font-family: $alt-font-face;
}
</style>

