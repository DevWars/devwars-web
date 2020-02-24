<template>
    <div
        v-closable="{ handler: toggleMobileMenu, outSideFrom: '#MobileMenu' }"
        class="HeaderMobile"
    >
        <div id="MobileMenu" class="main">
            <div class="head">
                <nuxt-link to="/" class="logo" @click.native="toggleMobileMenu">
                    <img src="~assets/img/logo.png" alt="DevWars" />
                </nuxt-link>
            </div>

            <Button to="/" class="link block" @click="toggleMobileMenu">
                Home
            </Button>
            <Button to="/games" class="link block" @click="toggleMobileMenu">
                Games
            </Button>
            <Button to="/schedule" class="link block" @click="toggleMobileMenu">
                Schedule
            </Button>
            <Button
                to="/leaderboards"
                class="link block"
                @click="toggleMobileMenu"
            >
                Leaders
            </Button>
            <div v-if="!user" class="actions">
                <Button to="/register" class="primary block">
                    Register
                </Button>
                <Button to="/login" class="link block">
                    Log In
                </Button>
            </div>

            <Popup v-if="user" class="nav-link">
                <template #trigger>
                    <User size="sm" :user="user" />
                </template>
                <template #menu>
                    <Button v-if="isAdmin" to="/mod/dashboard" @click="close">
                        Modpanel
                    </Button>
                    <div v-if="isAdmin" class="menu-divider" />
                    <Button to="/dashboard" @click="close">
                        Dashboard
                    </Button>
                    <Button to="/badges" @click="close">
                        Badges
                    </Button>
                    <Button to="/settings/profile" @click="close">
                        Settings
                    </Button>
                    <div class="menu-divider" />
                    <Button @click="logout">
                        Logout
                    </Button>
                </template>
            </Popup>
        </div>

        <div class="overlay" />
    </div>
</template>

<script>
import Popup from '@/components/Popup';
import User from '@/components/user/User';

export default {
    name: 'HeaderMobile',

    components: { Popup, User },

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
        padding: 30px 0;
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
        padding: 30px;
        margin-top: $grid-gutter-width;
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
        padding: 20px 30px;
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
