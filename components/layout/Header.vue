<template>
    <div>
        <div class="header">
            <div class="header__inner container-fluid">
                <div class="header__main">
                    <button class="burger-menu"></button>
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
                           class="btn btn-primary">Register</nuxt-link>
                    </li>
                    <li class="nav__item">
                        <nuxt-link to="/login"
                           class="btn btn-link color-white">Log In</nuxt-link>
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
                            <a v-if="isAdmin" href="/mod/dashboard" class="btn-link">Modpanel</a>
                            <div v-if="isAdmin" class="menu-divider"></div>
                            <a href="/dashboard" class="btn-link">Dashboard</a>
                            <a href="/badges" class="btn-link">Badges</a>
                            <a href="/settings/profile" class="btn-link">Settings</a>
                            <div class="menu-divider"></div>
                            <a @click="logout" href="#" class="btn-link">Logout</a>
                        </div>
                    </Popup>
                </div>
            </div>
        </div>

        <!-- Mobile -->
        <div class="mobile-nav">
            <div class="mobile-nav__header">
                <a href="/"
                   class="logo">
                    <img src="~/assets/img/logo.png"
                         alt="DevWars">
                </a>
            </div>
            <a href="/"
               class="mobile-nav__link">Home</a>
            <a href="/games"
               class="mobile-nav__link">Games</a>
            <a href="/schedule"
               class="mobile-nav__link">Schedule</a>
            <a href="/leaderboards"
               class="mobile-nav__link">Leaders</a>
            <a href="/blog"
               class="mobile-nav__link">Blog</a>
            <div class="mobile-nav__account">
                <a href="/register"
                   class="btn btn-primary btn-block">Register</a>
                <a href="/login"
                   class="btn btn-link btn-block color-white">Log In</a>
            </div>
        </div>
        <div class="mobile-nav__overlay"></div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import Popup from '~/components/Popup';
    import Avatar from '~/components/user/Avatar';

    @Component({
        components: {Popup, Avatar},
    })
    export default class Header extends Vue {
        @State(state => state.user.user) user;

        get isAdmin() {
            return this.user.role === 'ADMIN';
        }

        logout() {
        }
    }
</script>
