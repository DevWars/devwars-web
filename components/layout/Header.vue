<template>
    <div>
        <div class="header">
            <div class="inner container-fluid">
                <div>
                    <button @click="toggleMobileMenu" class="burger-menu"></button>
                    <nuxt-link to="/" class="logo">
                        <img class="logo-full"
                             src="~/assets/img/logo.png"
                             alt="DevWars">
                        <img class="logo-icon"
                             src="~/assets/img/logo-icon.png"
                             alt="DevWars">
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
                        <li class="nav__item">
                            <nuxt-link to="/leaderboards" class="nav__link">Leaders</nuxt-link>
                        </li>
                        <li class="nav__item">
                            <nuxt-link to="/docs" class="nav__link">About</nuxt-link>
                        </li>
                    </ul>
                </div>

                <ul v-if="!user" class="nav nav-actions">
                    <li class="nav__item">
                        <nuxt-link to="/register" class="btn btn-primary">Register</nuxt-link>
                    </li>
                    <li class="nav__item">
                        <nuxt-link to="/login" class="btn btn-link color-white">Log In</nuxt-link>
                    </li>
                </ul>

                <UserMenu v-if="user" :user="user">
                    <nuxt-link v-if="isAdmin" to="/mod/dashboard" class="btn-link">Modpanel</nuxt-link>
                    <div v-if="isAdmin" class="menu-divider"></div>
                    <nuxt-link to="/dashboard" class="btn-link">Dashboard</nuxt-link>
                    <nuxt-link to="/badges" class="btn-link">Badges</nuxt-link>
                    <nuxt-link to="/settings/profile" class="btn-link">Settings</nuxt-link>
                    <div class="menu-divider"></div>
                    <a @click="logout" class="btn-link">Logout</a>
                </UserMenu>
            </div>
        </div>

        <!-- Mobile -->
        <HeaderMobile ref="mobileHeader" />
    </div>
</template>

<script>
import Component, { State } from 'nuxt-class-component';
import Vue from 'vue';
import UserMenu from '~/components/user/UserMenu';
import HeaderMobile from './HeaderMobile';

@Component({
    data: () => ({ isMobile: false }),
    components: { HeaderMobile, UserMenu },
})
export default class Header extends Vue {
    @State(state => state.user.user) user;

    get isAdmin() {
        return this.user.role === 'ADMIN';
    }

    logout() {
        this.$store.dispatch('user/logout');
    }

    toggleMobileMenu() {
        this.$refs.mobileHeader.toggleMenu();
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils';

.header {
    height: $header-height;
    background: #000;
    transition: all 0.6s;
}

.inner {
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

    img {
        max-height: 40px;
    }

    &-full {
        @include breakpoint(sm) {
            display: none;
        }
    }

    &-icon {
        display: none;

        @include breakpoint(sm) {
            display: inline-block;
        }
    }
}

.burger-menu {
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
        padding: $btn-padding-y 0;
        position: relative;

        &:hover .nav__link {
            color: #fff;
        }
    }

    &__link {
        display: inline-block;
        padding: $btn-padding-y ($btn-padding-x / 2);
        margin: $xxs-space 0;
        line-height: $btn-line-height;
        font-weight: bold;
        text-transform: uppercase;
        font-size: $font-size-base;
        color: $text-color-secondary;
        font-family: $alt-font-face;

        &.active {
            color: $base-font-color;

            &:before {
                content: "";
                display: block;
                width: 100%;
                height: 2px;
                position: absolute;
                background-color: $brand-primary;
                bottom: 0;
                left: 0; right: 0;
            }
        }
    }

    &-main {
        @include breakpoint(md) {
            display: none;
        }
    }
}
</style>
