<template>
    <Button class="ButtonIcon" v-bind="$attrs" @click.native="$emit('click')">
        <div class="inner">
            <div v-if="image" class="image">
                <slot name="image" />
            </div>
            <Icon v-if="icon" :name="icon" />
            <slot />
        </div>
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
    .inner {
        display: flex;
        align-items: center;
    }

    .Icon {
        margin-right: 10px;
        line-height: 1;
        font-size: 16px;
    }

    & > img,
    & > svg {
        height: $font-size-lg;
    }

    &.reverse {
        flex-direction: row-reverse;

        .Icon {
            margin-right: 0;
            margin-left: 10px;
        }
    }
}
</style>
