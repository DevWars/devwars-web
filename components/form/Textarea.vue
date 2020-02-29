<template>
    <div class="Textarea" :class="{ label }">
        <textarea
            :id="labelName"
            ref="input"
            :class="[{ empty: !valid }, { valid }]"
            v-bind="$attrs"
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
        label: {
            type: String,
            default: '',
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

.Textarea {
    width: 100%;

    textarea {
        @extend %form-control;
        min-height: 100px;
        resize: vertical;
    }

    &.label {
        @extend %form-label;
    }

    &.group {
        @extend %form-group;
    }
}
</style>
