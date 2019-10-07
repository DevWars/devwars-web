<template>
    <div class="Header">
        <div class="header">
            <Container class="fluid">
                <div>
                    <Button class="link burger-menu" @click="toggleMobileMenu"/>

                    <nuxt-link to="/" class="logo">
                        <img class="logo-full" src="~assets/img/logo.png" alt="DevWars">
                        <img class="logo-icon" src="~assets/img/logo-icon.png" alt="DevWars">
                    </nuxt-link>

                    <ul class="nav nav-main">
                        <li class="nav__item">
                            <nuxt-link to="/" class="nav__link">Home</nuxt-link>
                        </li>
                        <li class="nav__item">
                            <nuxt-link to="/games" class="nav__link">Games</nuxt-link>
                        </li>
                        <li class="nav__item">
                            <nuxt-link to="/schedule" class="nav__link">Schedule</nuxt-link>
                        </li>
                        <!-- <li class="nav__item">
                            <nuxt-link to="/leaderboards" class="nav__link">Leaders</nuxt-link>
                        </li>-->
                        <li class="nav__item">
                            <nuxt-link to="/docs" class="nav__link">About</nuxt-link>
                        </li>
                    </ul>
                </div>

                <ul v-if="!user" class="nav nav-actions">
                    <li class="nav__item">
                        <Button to="/register" class="primary">Register</Button>
                    </li>
                    <li class="nav__item">
                        <Button to="/login">Log In</Button>
                    </li>
                </ul>

                <Popup v-else>
                    <template #trigger>
                        <User size="sm" :user="user"/>
                    </template>
                    <template #menu="{close}">
                        <Button v-if="isStaff" to="/mod/dashboard">Modpanel</Button>
                        <div v-if="isStaff" class="divider"></div>
                        <Button to="/dashboard">Dashboard</Button>
                        <Button to="/badges">Badges</Button>
                        <Button to="/settings/profile">Settings</Button>
                        <div class="divider"></div>
                        <Button @click="logout">Logout</Button>
                    </template>
                </Popup>
            </Container>
        </div>

        <!-- Mobile -->
        <HeaderMobile v-if="toggleMobileMenuVal" :toggleMobileMenu="toggleMobileMenu"/>
    </div>
</template>


<script>
import Popup from '@/components/Popup';
import User from '@/components/user/User';
import HeaderMobile from './HeaderMobile';

export default {
    name: 'ComponentHeader',

    components: { HeaderMobile, Popup, User },

    data: () => {
        return {
            isMobile: false,
            toggleMobileMenuVal: false,
        };
    },

    computed: {
        user() {
            return this.$store.state.user.user;
        },

        isStaff() {
            return this.user.role === 'ADMIN' || this.user.role === 'MODERATOR';
        },
    },

    methods: {
        logout() {
            this.$store.dispatch('user/logout');
        },

        toggleMobileMenu() {
            this.toggleMobileMenuVal = !this.toggleMobileMenuVal;
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.Header {
    .header {
        height: $header-height;
        background: #000;
        transition: all 0.6s;
    }

    .Container {
        @extend %flex-justify;
        height: 100%;
    }

    .logo,
    .burger-menu {
        vertical-align: middle;
    }

    .logo {
        display: inline-block;
        margin-right: $s-space;

        &-full {
            width: 160px;

            @include breakpoint(sm) {
                display: none;
            }
        }

        &-icon {
            display: none;
            width: 40px;

            @include breakpoint(sm) {
                display: inline-block;
            }
        }
    }

    .burger-menu.Button {
        display: none;
        padding: $xs-space $xs-space $xs-space 0;
        margin-right: $xs-space;

        @include breakpoint(md) {
            display: inline-block;
        }

        &:before {
            @extend .fa;
            content: $fa-bars;
            font-size: $h3-font-size;
        }

        &:hover,
        &:focus {
            color: $brand-primary;
        }
    }

    .nav {
        @extend %list-unstyled;
        @extend %align-middle;

        &__item {
            @extend %align-middle;
            padding: 10px 0;
            position: relative;

            &:hover .nav__link {
                color: #fff;
            }
        }

        &__link {
            display: inline-block;
            padding: 10px;
            margin: $xxs-space 0;
            font-weight: bold;
            text-transform: uppercase;
            font-size: $font-size-base;
            color: $text-color-secondary;
            font-family: $alt-font-face;

            &.active {
                color: $base-font-color;

                &:before {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 2px;
                    position: absolute;
                    background-color: $brand-primary;
                    bottom: 0;
                    left: 0;
                    right: 0;
                }
            }
        }

        &-main {
            @include breakpoint(md) {
                display: none;
            }
        }
    }
}
</style>
