<template>
    <div class="Container">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
@import 'utils.scss';

.Container {
    max-width: map-get($container-max-widths, xl);
    margin-left: auto;
    margin-right: auto;
    padding-left: $grid-gutter-width;
    padding-right: $grid-gutter-width;

    &.fluid {
        max-width: none;
    }

    &.no-gutter {
        padding-left: 0;
        padding-right: 0;
    }

    @each $breakpoint in map-keys($grid-breakpoints) {
        @include breakpoint($breakpoint, min) {
            max-width: map-get($container-max-widths, $breakpoint);
        }
    }
}
</style>
