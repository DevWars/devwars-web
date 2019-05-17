<template>
    <Button class="ButtonIcon">
        <div v-if="image" class="image">
            <slot name="image"></slot>
        </div>
        <i v-if="icon" class="icon" :class="icon"></i>
        <slot></slot>
    </Button>
</template>


<script>
export default {
    props: {
        icon: {
            type: String,
            default: '',
        },
    },

    computed: {
        image() {
            return this.$slots.image || undefined;
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.ButtonIcon {
    display: flex;
    align-items: center;

    .icon {
        padding-right: 10px;
        line-height: 1;
        font-size: 16px;
    }

    & > img,
    & > svg {
        height: $font-size-lg;
    }

    &.reverse {
        flex-direction: row-reverse;

        .icon {
            padding-right: 0;
            padding-left: 10px;
        }
    }
}
</style>



