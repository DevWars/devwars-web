<template>
    <input
        :type="type"
        :value="value"
        :class="['form-control', {empty: !valid},  {valid}]"
        @input="e => $emit('input', e.target.value)"
    >
</template>


<script>
export default {
    name: 'Input',
    props: {
        type: {
            type: String,
            default: 'text',
        },
        value: {
            type: [String, Number],
            required: false,
            default: '',
        },
    },
    computed: {
        valid() {
            return !(this.value == null || typeof this.value === 'undefined');
        },
    },
};
</script>

