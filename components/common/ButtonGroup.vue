<template>
    <div class="ButtonGroup">
        <slot></slot>
    </div>
</template>


<style lang="scss" scoped>
@import 'utils.scss';

.ButtonGroup {
    .Button + .Button,
    & > * + & > * {
        margin-left: $grid-gutter-width;

        @include breakpoint(xs) {
            display: block;
            width: 100%;
            margin-left: 0;
            margin-top: $grid-gutter-part;
        }
    }
}
</style>
