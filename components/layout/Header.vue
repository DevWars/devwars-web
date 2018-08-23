<template>
    <div>
        <div class="header">
            <div class="header__inner container-fluid">
                <div class="header__main">
                    <button @click="toggleMenu" class="burger-menu"></button>
                    <nuxt-link to="/"
                               class="logo">
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
                            <nuxt-link to="/blog" class="nav__link">Blog</nuxt-link>
                        </li>
                    </ul>
                </div>

                <ul class="nav nav-actions" v-if="!user">
                    <li class="nav__item">
                        <nuxt-link to="/register"
                                   class="btn btn-primary">Register
                        </nuxt-link>
                    </li>
                    <li class="nav__item">
                        <nuxt-link to="/login"
                                   class="btn btn-link color-white">Log In
                        </nuxt-link>
                    </li>
                </ul>

                <div class="user-menu" v-if="user">
                    <Popup>
                        <div class="user-group" slot="trigger">
                            <Avatar :user="user" class="sm"/>
                            <div class="user-group__name">
                                {{ user.username }}
                            </div>
                        </div>
                        <div slot="menu">
                            <nuxt-link v-if="isAdmin" to="/mod/dashboard" class="btn-link">Modpanel</nuxt-link>
                            <div v-if="isAdmin" class="menu-divider"></div>
                            <nuxt-link to="/dashboard" class="btn-link">Dashboard</nuxt-link>
                            <nuxt-link to="/badges" class="btn-link">Badges</nuxt-link>
                            <nuxt-link to="/settings/profile" class="btn-link">Settings</nuxt-link>
                            <div class="menu-divider"></div>
                            <a @click="logout" class="btn-link">Logout</a>
                        </div>
                    </Popup>
                </div>
            </div>
        </div>

        <!-- Mobile -->
        <div v-click-outside="hideMenu" :class="['mobile-nav', {active: show}]">
            <div class="mobile-nav__header">
                <nuxt-link to="/"
                   class="logo">
                    <img src="~/assets/img/logo.png"
                         alt="DevWars">
                </nuxt-link>
            </div>
            <nuxt-link to="/"
               class="mobile-nav__link">Home
            </nuxt-link>
            <nuxt-link to="/games"
               class="mobile-nav__link">Games
            </nuxt-link>
            <nuxt-link to="/schedule"
               class="mobile-nav__link">Schedule
            </nuxt-link>
            <nuxt-link to="/leaderboards"
               class="mobile-nav__link">Leaders
            </nuxt-link>
            <nuxt-link to="/blog"
               class="mobile-nav__link">Blog
            </nuxt-link>
            <div class="mobile-nav__account">
                <nuxt-link to="/register"
                   class="btn btn-primary btn-block">Register
                </nuxt-link>
                <nuxt-link to="/login"
                   class="btn btn-link btn-block color-white">Log In
                </nuxt-link>
            </div>
        </div>
        <div :class="['mobile-nav__overlay', {'active': show}]"></div>
    </div>
</template>

<script>
    import Component, { State } from 'nuxt-class-component';
    import Vue from 'vue';

    import Popup from '~/components/Popup';
    import Avatar from '~/components/user/Avatar';

    import ClickOutside from 'vue-click-outside';

    @Component({
        components: { Popup, Avatar },
        directives: { ClickOutside },
    })
    export default class Header extends Vue {
        @State(state => state.user.user) user;

        show = false;

        get isAdmin() {
            return this.user.role === 'ADMIN';
        }

        toggleMenu() {
            // Hack to make sure this overrides the outside click
            setTimeout(() => {
                this.show = !this.show;
            }, 0)
        }

        hideMenu() {
            this.show = false;
        }

        logout() {
            this.$store.dispatch('user/logout');
        }
    }
</script>
