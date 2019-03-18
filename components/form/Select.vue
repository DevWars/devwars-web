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
        <label v-if="label">{{ label }}</label>
    </div>
</template>


<script>
export default {
    name: 'Select',
    props: ['type', 'value', 'label'],
    computed: {
        valid() {
            return !(this.value == null || typeof this.value === 'undefined');
        },
    },
};
</script>


<style lang="scss" scoped>
@import '../../assets/styles/utils';

.select-container {
    font-family: $alt-font-face;
}
</style>

