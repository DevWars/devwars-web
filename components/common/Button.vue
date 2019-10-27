<template>
    <btn
        class="Button"
        :class="{ loading: isLoading }"
        v-bind="$attrs"
        :disabled="isLoading"
        @click.native="click"
    >
        <slot></slot>
    </btn>
</template>


<script>
import btn from './button.module';

export default {
    components: { btn },

    props: {
        asyncClick: {
            type: Function,
            default: undefined,
        },
    },

    data: () => ({
        isLoading: false,
    }),

    methods: {
        async click() {
            if (!this.$props.asyncClick) {
                this.$emit('click');
                return;
            }

            this.isLoading = true;

            try {
                await this.$props.asyncClick();
            } catch (e) {
                console.error(e);
            }

            this.isLoading = false;
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';
$colors: (
    primary: $brand-primary,
    secondary: $brand-secondary,
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
    height: 35px;
    line-height: 35px;
    border: 1px solid transparent;
    padding: 0 20px;
    outline: 0;
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
        opacity: 0.3;
    }

    &.block {
        display: block;
        width: 100%;
        margin-left: 0;

        & + & {
            margin-top: $grid-gutter-width;
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
        height: 26px;
        line-height: 26px;
        padding: 0 12px;
        font-size: $font-size-sm;
    }

    &.lg {
        height: 45px;
        line-height: 45px;
        padding: 0 25px;
        font-size: $font-size-lg;
    }

    $spinner-size: 20px;
    $spiner-border-width: 3px;
    &.loading {
        position: relative;

        &:after {
            content: '';
            display: inline-block;
            vertical-align: middle;
            width: $spinner-size;
            height: $spinner-size;
            border-radius: 50%;
            border: $spiner-border-width solid rgba(#000, 0.2);
            border-top-color: #fff;
            animation: spinner 0.6s linear infinite;

            margin-top: -$spiner-border-width;
            margin-left: 10px;
        }

        &.block:after {
            position: absolute;
            right: 0;
            margin-left: 0;
            right: 30px;
        }

        @keyframes spinner {
            to {
                transform: rotateZ(360deg);
            }
        }
    }
}
</style>

