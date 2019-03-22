<template>
    <div>
        <div v-if="isVisible" v-click-outside="toggleMenu" class="header">
            <div class="head">
                <nuxt-link to="/" class="logo">
                    <img src="~assets/img/logo.png" alt="DevWars">
                </nuxt-link>
            </div>

            <nuxt-link to="/" class="link btn-icon">Home</nuxt-link>
            <nuxt-link to="/games" class="link btn-icon">Games</nuxt-link>
            <nuxt-link to="/schedule" class="link btn-icon">Schedule</nuxt-link>
            <nuxt-link to="/leaderboards" class="link btn-icon">Leaders</nuxt-link>
            <nuxt-link to="/blog" class="link btn-icon">Blog</nuxt-link>

            <div v-if="!user" class="actions">
                <nuxt-link to="/register" class="btn btn-primary btn-block">Register</nuxt-link>
                <nuxt-link to="/login" class="btn btn-link btn-block color-white">Log In</nuxt-link>
            </div>

            <UserMenu v-if="user" :user="user">
                <template #default>
                    <nuxt-link v-if="isAdmin" to="/mod/dashboard" class="btn-link">Modpanel</nuxt-link>
                    <div v-if="isAdmin" class="menu-divider"></div>
                    <nuxt-link to="/dashboard" class="btn-link">Dashboard</nuxt-link>
                    <nuxt-link to="/badges" class="btn-link">Badges</nuxt-link>
                    <nuxt-link to="/settings/profile" class="btn-link">Settings</nuxt-link>
                    <div class="menu-divider"></div>
                    <a class="btn-link" @click="logout">Logout</a>
                </template>
            </UserMenu>
        </div>

        <div v-if="isVisible" class="overlay"></div>
    </div>
</template>


<script>
import ClickOutside from 'vue-click-outside';
import UserMenu from '~/components/user/UserMenu';

export default {
    name: 'HeaderMobile',
    components: { UserMenu },
    directives: { ClickOutside },
    data: () => {
        return {
            isVisible: false,
        };
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
        isAdmin() {
            return this.user.role === 'ADMIN';
        },
    },
    methods: {
        toggleMenu() {
            this.isVisible = !this.isVisible;
        },
        logout() {
            this.$store.dispatch('user/logout');
        },
    },
};
</script>


<style lang="scss" scoped>
@import '../../assets/styles/utils';
$mobile-nav-width: 300px;

.header {
    height: 100%;
    width: $mobile-nav-width;
    padding: $grid-gutter-width 0;
    background-color: $bg-color-3;
    position: fixed;
    top: 0;
    left: 0;
    z-index: $zindex-navbar-fixed;

    @include breakpoint(md) {
        display: inline-block;
    }
}

.actions {
    border-top: 1px solid $divider-color;
    padding: $grid-gutter-width;
    margin-top: $grid-gutter-part;
}

.overlay {
    @extend %fixed-overlay;
    background-color: rgba(#000, 0.85);
    z-index: $zindex-navbar-fixed - 1;
}

.link {
    display: block;
    color: #fff;
    padding: $s-space $grid-gutter-width;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 1;

    &:hover,
    &:focus {
        background-color: $bg-color-2;
    }
}

.head {
    margin-bottom: $m-space;
    text-align: center;
}

.logo {
    display: block;

    img {
        display: inline-block;
        width: 60%;
    }
}
</style>
