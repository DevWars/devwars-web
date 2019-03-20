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
        'type': {
            type: String,
            default: '',
        }, 
        'value': {
            type: String,
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

