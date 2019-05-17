<template>
    <div :key="user && user.avatarUrl" class="Avatar">
        <div class="img" :style="style"></div>
    </div>
</template>


<script>
export default {
    name: 'Avatar',
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    computed: {
        style() {
            return {
                backgroundImage: `url(${this.user.avatarUrl ||
                    require('@/assets/img/default-avatar.png')})`,
            };
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.Avatar {
    @extend %align-middle;
    width: 50px;
    &.xs {
        width: 25px;
    }
    &.sm {
        width: 38px;
    }
    &.md {
        width: 50px;
    }
    &.lg {
        width: 70px;
    }
    &.xl {
        width: 140px;
    }
}

.img {
    @include aspect-ratio(1, 1);
    width: 100%;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-color: $bg-color-4;
    background-image: url('~assets/img/default-avatar.png');
    position: relative;
    overflow: hidden;
    font-size: $font-size-base;
    cursor: pointer;
}
</style>
