<template>
    <div class="Input" :class="{ label }">
        <input
            v-if="!textarea"
            :id="id"
            ref="input"
            :type="type"
            :class="[inputClass, { empty: !valid }, { valid }]"
            v-bind="$attrs"
            :value="value"
            :placeholder="placeholder"
            @input="
                (e) => [
                    $emit('input', e.target.value),
                    inputChange(e.target.value),
                ]
            "
        />
        <textarea
            v-if="textarea"
            :id="id"
            ref="input"
            :type="type"
            v-bind="$attrs"
            :value="value"
            :placeholder="placeholder"
            :class="[inputClass, { empty: !valid }, { valid }]"
            @input="
                (e) => [
                    inputChange(e.target.value),
                    $emit('input', e.target.value),
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
        id: {
            type: String,
            default: undefined,
        },
        required: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [String, Number],
            required: false,
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
        inputClass: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        textarea: {
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
