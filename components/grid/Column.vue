<template>
    <div class="Column" :class="[colSizes]">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        xs: { type: Number, default: null },
        sm: { type: Number, default: null },
        md: { type: Number, default: null },
        lg: { type: Number, default: null },
        xl: { type: Number, default: null },
    },

    computed: {
        colSizes() {
            const columnClasses = [];
            const sizes = this.$props;

            for (const size in sizes) {
                if (sizes[size]) {
                    columnClasses.push(`${size}-${sizes[size]}`);
                }
            }

            return columnClasses;
        },
    },
};
</script>

<style lang="scss">
@import 'utils.scss';

.Column {
    min-height: 1px;
    padding-right: $grid-gutter-width;
    padding-left: $grid-gutter-width;

    &.no-gutter {
        padding-left: 0;
        padding-right: 0;
    }

    @each $breakpoint in map-keys($grid-breakpoints) {
        @for $i from 1 through $grid-columns {
            &.#{$breakpoint}-#{$i} {
                @include col-breakpoint($breakpoint) {
                    width: percentage($i / $grid-columns);
                    float: left;
                }
            }
        }
    }
}
</style>
