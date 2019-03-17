<template>
    <div class="ModSidebar">
        <h6>Main</h6>
        <ul>
            <li>
                <nuxt-link to="/mod/dashboard">
                <i class="fa fa-tachometer"></i>Dashboard</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mod/users" class="disabled">
                <i class="fa fa-user"></i>Users</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mod/teams" class="disabled">
                <i class="fa fa-users"></i>Teams</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mod/games">
                <i class="fa fa-gamepad"></i>Games</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mod/tournaments">
                <i class="fa fa-trophy"></i>Tournaments</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mod/blogs" class="disabled">
                <i class="fa fa-newspaper"></i>Blog</nuxt-link>
            </li>
        </ul>

        <h6>More</h6>
        <ul>
            <li>
                <nuxt-link to="#" class="disabled">
                <i class="fa fa-file-alt"></i>Mod Doc</nuxt-link>
            </li>
        </ul>

        <h6>Stats</h6>
        <ul class="list-info">
            <li>
                <nuxt-link to="#">
                    <Progress
                        title="Server Usage"
                        :progress="30 + '%'"
                        color="primary"
                    />
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="#">
                    <Progress
                        title="GitHub Issues"
                        :progress="30 + '%'"
                        color="yellow"
                    />
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue';

import Progress from '~/components/form/Progress';

export default {
    name: "ModSidebar",
    components: { Progress }
}
</script>


<style lang="scss" scoped>
@import '../../assets/styles/utils';

.ModSidebar {
    width: 320px;
    background-color: $bg-color-4;
    position: relative;

    @include breakpoint(md) {
        width: 100%;
    }

    h6 {
        display: block;
        margin: 40px 20px 10px;
        text-transform: uppercase;

        &:first-of-type {
            margin-top: 20px;
        }
    }

    ul {
        @extend %list-unstyled;
    }

    a {
        color: $text-color-primary;
        display: block;
        padding: $sxs-space 20px;
        text-decoration: none;
        transition: background-color 0.2s;
        font-family: $alt-font-face;

        &:hover {
            background-color: rgba(#000, 0.3);
            color: inherit;
            text-decoration: none;
        }

        &.active {
            background-color: rgba(#000, 0.3);
        }

        &.disabled {
            pointer-events: none;
            opacity: 0.3;
        }

        > .fa {
            width: 20px;
            margin-right: 20px;
            text-align: center;
        }
    }
}
</style>
