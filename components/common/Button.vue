<template>
    <btn class="Button" v-bind="$attrs">
        <slot></slot>
    </btn>
</template>


<script>
import btn from './button.module';

export default {
    components: { btn },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';
$colors: (
    primary: $brand-primary,
    success: #2ecc71,
    warning: #f1c40f,
    danger: #e74c3c,
    info: #3498db,
    orange: #e67e22,
    purple: #8e44ad,
    white: #fff,
    black: $black-color,
    muted: $text-color-muted,
    // Brand
        youtube: $youtube-color,
    discord: $discord-color,
    twitch: $twitch-color,
);

.Button {
    display: inline-block;
    vertical-align: middle;
    border: 1px solid transparent;
    padding: 10px 20px;
    outline: 0;
    line-height: 1;
    background-color: rgba(#fff, 0.85);
    font-family: $alt-font-face;
    font-weight: $font-weight-bold;
    font-size: 12px;
    color: $black-color;
    text-transform: uppercase;
    text-align: center;
    transition: all 150ms ease;
    cursor: pointer;

    &::-moz-focus-inner {
        border: none;
    }

    &:hover {
        background-color: #fff;
    }

    &.disabled,
    &:disabled {
        pointer-events: none;
        opacity: 0.25;
    }

    & + & {
        margin-left: $grid-gutter-width;

        @include breakpoint(sm) {
            margin-top: $grid-gutter-width;
        }
    }

    &.block {
        display: block;
        width: 100%;
        margin-left: 0;

        & + & {
            margin-top: $grid-gutter-part;
        }
    }

    &.static {
        & + & {
            margin: initial;
        }
    }

    @each $name, $color in $colors {
        &.#{$name} {
            background-color: $color;
            color: #fff;

            &:hover {
                background-color: rgba($color, 0.8);
            }
        }
    }

    &.outline {
        border-color: #fff;
        background-color: transparent;
        color: #fff;

        &:hover {
            border-color: rgba(#fff, 0.8);
            background-color: rgba(#fff, 0.8);
            color: $black-color;
        }

        @each $name, $color in $colors {
            &.#{$name} {
                border-color: $color;
                color: $color;

                &:hover {
                    border-color: rgba($color, 0.8);
                    background-color: rgba($color, 0.8);
                    color: #fff;
                }
            }
        }
    }

    &.link {
        background-color: transparent;
        color: #fff;

        &:hover {
            background-color: transparent;
            color: rgba(#fff, 0.8);
        }

        @each $name, $color in $colors {
            &.#{$name} {
                color: $color;

                &:hover {
                    @if $name == muted {
                        color: $base-font-color;
                    } @else {
                        color: rgba($color, 0.8);
                    }
                }
            }
        }
    }

    &.sm {
        padding: 6px 12px;
        font-size: $font-size-sm;
    }

    &.lg {
        padding: 15px 35px;
        font-size: $font-size-lg;
    }
}
</style>
