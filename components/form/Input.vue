<template>
    <input
        :type="type"
        :value="value"
        @input="e => $emit('input', e.target.value)"
        :class="['form-control', {empty: !valid},  {valid}]"
    >
</template>


<script>
export default {
    name: 'Input',
    props: ['type', 'value'],
    computed: {
        valid() {
            return !(this.value == null || typeof this.value === 'undefined');
        },
    },
};
</script>

