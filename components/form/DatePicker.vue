<template>
    <FlatPickr
        ref="pickr"
        v-click-outside="closePicker"
        :class="['form-control', {empty: !value || !value.length}, {valid: value && value.length }]"
        :value="value"
        :config="config"
        @input="onChange"
    />
</template>


<script>
import FlatPickr from 'vue-flatpickr-component';
import ClickOutside from 'vue-click-outside';

export default {
    name: 'DatePicker',
    components: { FlatPickr },
    directives: { ClickOutside },
    props: ['value'],
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
        closePicker() {
            this.$refs.pickr.fp.close();
        },
    },
};
</script>
