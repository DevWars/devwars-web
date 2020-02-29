<template>
    <div
        class="SquareToggle"
        :class="[name ? name : '', active ? 'active' : '']"
        @click="$emit('change', !active)"
        @mouseover="hovered = true"
        @mouseleave="hovered = false"
    />
</template>

<script>
export default {
    name: 'SquareToggle',
    props: {
        name: {
            type: String,
            required: false,
            default: undefined,
        },
        active: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.SquareToggle {
    width: 30px;
    height: 30px;
    border: 5px solid #23252c;
    cursor: pointer;

    &.active,
    &:hover {
        background-color: rgba(#fff, 0.8);
    }

    &.blue.active,
    &.blue:hover {
        background-color: $blue-color;
    }
    &.red.active,
    &.red:hover {
        background-color: $red-color;
    }
    &.bonus.active,
    &.bonus:hover {
        background-color: $bonus-color;
    }
}
</style>
