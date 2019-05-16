<template>
    <div class="Select">
        <select
            :type="type"
            :value="value"
            :class="['form-control', {empty: !valid},  {valid}]"
            @input="e => $emit('input', e.target.value)"
        >
            <slot></slot>
        </select>
        <label v-if="label">{{ label }}</label>
    </div>
</template>


<script>
export default {
    name: 'Select',
    props: {
        type: {
            type: String,
            default: 'text',
        },
        value: {
            type: String,
            default: undefined,
        },
        label: {
            type: String,
            default: undefined,
        },
    },
    computed: {
        valid() {
            return !(this.value == null || typeof this.value === 'undefined');
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.Select {
    display: block;
    position: relative;
    font-family: $alt-font-face;
    outline: none;

    &.clear select {
        background: transparent;
        border: none;
        font-family: $alt-font-face;
        text-transform: uppercase;
        font-weight: $font-weight-bold;
        outline: none;

        option {
            background-color: #fff;
            color: $black-color;
        }
    }

    &:after {
        @extend .fa;
        content: $fa-caret-down;
        color: $text-color-secondary;
        position: absolute;
        right: $input-padding-x;
        top: 50%;
        transform: translateY(-50%);
    }

    select {
        padding-right: $grid-gutter-width;
        margin-top: 0;
        appearance: none;

        &:focus::-ms-value {
            color: $input-color;
            background-color: $input-bg;
        }

        option {
            color: $black-color;
        }
    }
}
</style>

