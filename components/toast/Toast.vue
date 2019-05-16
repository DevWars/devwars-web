<template>
    <div class="Toast" :class="[toast.type]">
        <i class="icon"></i>
        <p class="message">{{ toast.message }}</p>
        <button class="close"></button>
    </div>
</template>


<script>
export default {
    name: 'Toast',
    props: {
        toast: {
            type: Object,
            required: true,
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';
$toast-margin-x: 10px;
$toast-margin-y: 10px;

.Toast {
    @extend %material;
    display: flex;
    width: 300px;
    padding: 10px 25px 10px 20px;
    margin-right: $toast-margin-x;
    margin-bottom: $toast-margin-y;
    border-top-width: $border-size;
    border-top-style: solid;
    border-top-color: $brand-primary;
    background-color: $bg-color-2;
    color: #fff;
    position: relative;

    .icon {
        margin-top: 3px;
        margin-right: 20px;
        &:before {
            @extend .fa;
            content: $fa-info-circle;
            font-size: $h4-font-size;
        }
    }

    .message {
        font-size: $font-size-base;
        color: $text-color-primary;
    }

    .close {
        &:before {
            @extend .fa;
            content: $fa-times;
            position: absolute;
            top: 0;
            right: 0;
            padding: $toast-margin-x;
            color: $text-color-muted;
        }

        &:hover:before {
            color: #fff;
        }
    }

    @mixin toast-type($name, $color, $icon) {
        .#{$name} {
            border-color: $color;

            .icon:before {
                content: $icon;
            }
        }
    }

    @include toast-type(success, $success-color, $fa-check);
    @include toast-type(error, $danger-color, $fa-times-circle);
    @include toast-type(warning, $warning-color, $fa-exclamation-triangle);
}

toast {
    display: block;
}
</style>
