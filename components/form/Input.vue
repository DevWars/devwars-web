<template>
    <div class="Input" :class="{ label }">
        <input
            :id="labelName"
            ref="input"
            :type="type"
            :class="[{ empty: !valid }, { valid }]"
            v-bind="$attrs"
            :value="value"
            @input="
                (e) => [
                    $emit('input', e.target.value),
                    inputChange(e.target.value),
                ]
            "
        />
        <label v-if="label" :for="labelName">{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: 'Input',

    props: {
        value: {
            type: [String, Number],
            default: undefined,
        },
        label: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },

    },

    data: () => ({
        valid: '',
    }),

    computed: {
        labelName() {
            return this.label.toLowerCase().replace(/\s/g, '-');
        },
    },

    watch: {
        value(value) {
            this.inputChange(value);
        },
    },

    mounted() {
        this.inputChange(this.$refs.input.value);
    },

    methods: {
        inputChange(value) {
            this.valid = !(value === '' || typeof value === 'undefined');
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.Input {
    width: 100%;

    input {
        @extend %form-control;
    }

    &.label {
        @extend %form-label;
    }

    &.group {
        @extend %form-group;
    }
}
</style>
