<template>
    <div class="Toast" :class="[toast.type]">
        <Icon :name="icons[toast.type]" />
        <p class="message">{{ toast.message }}</p>
        <Icon name="times" class="close" />
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

    data: () => ({
        icons: {
            success: 'check',
            warning: 'exclamation-triangle',
            error: 'times-circle',
        },
    }),
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
    .Icon {
        margin-top: 3px;
        margin-right: 20px;
        font-size: $font-size-lg;
    }
    .message {
        font-size: $font-size-base;
        color: $text-color-primary;
    }
    .Icon.close {
        position: absolute;
        top: $toast-margin-y;
        right: 0;
        font-size: 14px;
        color: $text-color-muted;
        cursor: pointer;
        &:hover {
            color: #fff;
        }
    }
    &.success {
        border-color: $success-color;
    }
    &.error {
        border-color: $danger-color;
    }
    &.warning {
        border-color: $warning-color;
    }
}

toast {
    display: block;
}
</style>
