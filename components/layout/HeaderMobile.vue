<template>
    <div v-closable="{handler: toggleMobileMenu, outSideFrom: '#MobileMenu'}" class="HeaderMobile">
        <div id="MobileMenu" class="main">
            <div class="head">
                <nuxt-link to="/" class="logo" @click.native="toggleMobileMenu">
                    <img src="~assets/img/logo.png" alt="DevWars">
                </nuxt-link>
            </div>

            <Button to="/" class="link block static" @click="toggleMobileMenu">Home</Button>
            <Button to="/games" class="link block static" @click="toggleMobileMenu">Games</Button>
            <Button to="/schedule" class="link block static" @click="toggleMobileMenu">Schedule</Button>
            <Button to="/leaderboards" class="link block static" @click="toggleMobileMenu">Leaders</Button>

            <div v-if="!user" class="actions">
                <Button to="/register" class="primary block">Register</Button>
                <Button to="/login" class="link block">Log In</Button>
            </div>

            <UserMenu v-if="user" :user="user" class="nav-link">
                <template #default="{close}">
                    <nuxt-link v-if="isAdmin" to="/mod/dashboard" @click="close">Modpanel</nuxt-link>
                    <div v-if="isAdmin" class="menu-divider"></div>
                    <nuxt-link to="/dashboard" @click="close">Dashboard</nuxt-link>
                    <nuxt-link to="/badges" @click="close">Badges</nuxt-link>
                    <nuxt-link to="/settings/profile" @click="close">Settings</nuxt-link>
                    <div class="menu-divider"></div>
                    <a @click="logout">Logout</a>
                </template>
            </UserMenu>
        </div>

        <div class="overlay"></div>
    </div>
</template>


<script>
import UserMenu from '~/components/user/UserMenu';

export default {
    name: 'HeaderMobile',

    components: { UserMenu },

    props: {
        toggleMobileMenu: {
            type: Function,
            required: true,
        },
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
        logout() {
            this.$store.dispatch('user/logout');
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';
$mobile-nav-width: 300px;

.HeaderMobile {
    .main {
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

    .Button.link,
    .nav-link {
        display: block;
        color: #fff;
        padding: $s-space $grid-gutter-width;
        font-weight: bold;
        text-transform: uppercase;
        line-height: 1;
        text-align: left;

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
}
</style>
