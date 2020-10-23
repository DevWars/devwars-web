<template>
    <div class="Devcoins">
        <DevcoinIcon />
        <div class="amount">{{ amount | formatNumber }}</div>
    </div>
</template>

<script>
import DevcoinIcon from '@/components/DevcoinIcon';

export default {
    components: { DevcoinIcon },

    props: {
        amount: {
            type: Number,
            default: 0,
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';
$base-size: 20px;
$base-spacing: 7px;
$increment-size: 6px;
$font-distance: 5px;
$sizes: (xs, sm, md, lg, xl);

.Devcoins {
    display: flex;
    align-items: center;

    .amount {
        font-weight: $font-weight-bold;
    }

    // Allows [md] styles to automatically be applied
    @mixin base-size($size) {
        @if $size == md {
            @content;
        } @else {
            &.#{$size} {
                @content;
            }
        }
    }

    @each $size in $sizes {
        $i: index($sizes, $size) - 1;
        $adjusted-size: $base-size + ($increment-size * $i);

        @include base-size($size) {
            .DevcoinIcon {
                width: $adjusted-size;
                margin-right: $base-spacing + $i;
            }

            .amount {
                font-size: $adjusted-size - $font-distance;
            }
        }
    }
}
</style>
