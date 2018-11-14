<template>
    <div class="user-avatar-wrapper" :key="user && user.avatarUrl">
        <div class="user-avatar" :style="style"></div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    @Component({
        props: ['user']
    })
    export default class Avatar extends Vue {

        get style() {
           return {
               backgroundImage: `url(${this.user.avatarUrl || require('~/assets/img/default-avatar.png')})`
           }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils';

.user-avatar-wrapper {
    @extend %align-middle;
    width: 50px;
    &.xs { width: 25px; }
    &.sm { width: 38px; }
    &.md { width: 50px; }
    &.lg { width: 70px; }
    &.xl { width: 140px; }
}

.user-avatar {
    @include aspect-ratio(1,1);
    width: 100%;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-color: $bg-color-4;
    background-image: url('~/assets/img/default-avatar.png');
    position: relative;
    overflow: hidden;
    font-size: $font-size-base;
    cursor: pointer;
}
</style>
