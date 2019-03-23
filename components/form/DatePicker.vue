<template>
    <FlatPickr
        ref="pickr"
        :class="['form-control', {empty: !value || !value.length}, {valid: value && value.length }]"
        :value="value"
        :config="config"
        @input="onChange"
    />
</template>


<script>
import FlatPickr from 'vue-flatpickr-component';

export default {
    name: 'DatePicker',
    components: { FlatPickr },
    props: {
        'value': {
            type: String,
            required: true,
        },
    },
    data: () => {
        return {
            config: {
                dateFormat: 'm/d/Y H:i',
                altFormat: 'm/d/Y H:i',
                enableTime: true,
                wrap: true,
            },
        };
    },
    methods: {
        onChange(e) {
            this.$emit('input', e);
        },
        // i comment that but the close  for click outside should be on FlatPickr
        // closePicker() {
        //     this.$refs.pickr.fp.close();
        // },
    },
};
</script>
