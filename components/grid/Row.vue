<template>
    <div class="Row">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
@import 'utils.scss';

.Row {
    @extend %clear;
    margin-left: -$grid-gutter-width;
    margin-right: -$grid-gutter-width;

    &.normalize > [class^='Col'] {
        padding-left: $grid-gutter-width / 2;
        padding-right: $grid-gutter-width / 2;

        @include breakpoint(xs) {
            padding-left: $grid-gutter-width;
            padding-right: $grid-gutter-width;
        }

        &:first-child {
            padding-left: $grid-gutter-width;
        }
        &:last-child {
            padding-right: $grid-gutter-width;
        }
    }
}
</style>
