<template>
    <FlatPickr
        v-click-outside="closePicker"
        :class="['form-control', {empty: !value || !value.length}, {valid: value && value.length }]"
        ref="pickr"
        @input="onChange"
        :value="value"
        :config="config"
    />
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import { Prop } from 'vue-property-decorator';

    import FlatPickr from 'vue-flatpickr-component';
    import ClickOutside from 'vue-click-outside';

    @Component({
        components: { FlatPickr },
        directives: { ClickOutside }
    })
    export default class extends Vue {
        @Prop() value;

        config = {
            dateFormat: 'm/d/Y H:i',
            altFormat: 'd/m/Y H:i',
            enableTime: true,
            wrap: true
        };

        onChange(e) {
            this.$emit('input', e);
        }

        closePicker() {
            this.$refs.pickr.fp.close();
        }
    }
</script>
