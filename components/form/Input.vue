<template>
    <div class="Input" :class="{ label }">
        <input
            v-if="!isArea"
            :id="fieldId || labelName"
            ref="input"
            :type="type"
            :class="[inputClass, { empty: !valid }, { valid }]"
            v-bind="$attrs"
            @input="
                (e) => [
                    $emit('input', e.target.value),
                    inputChange(e.target.value),
                ]
            "
        />
        <textarea
            v-if="isArea"
            :id="fieldId || labelName"
            ref="input"
            :type="type"
            v-bind="$attrs"
            :class="[inputClass, { empty: !valid }, { valid }]"
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
        type: {
            type: String,
            default: 'text',
        },
        label: {
            type: String,
            default: '',
        },
        inputClass: {
            type: String,
            default: '',
        },
        inputId: {
            type: String,
            default: '',
        },
        isArea: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        valid: '',
    }),

    computed: {
        labelName() {
            return this.label.toLowerCase().replace(/\s/g, '-');
        },
        fieldId() {
            return this.inputId.toLowerCase().replace(/\s/g, '-');
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

    input,
    textarea {
        @extend %form-control;
    }

    &.label {
        @extend %form-label;
    }

    &.group {
        @extend %form-group;
    }

    [type='email']:disabled,
    [type='text']:disabled {
        color: #484b5b;
    }
}
</style>
