<template>
    <div class="ModPanel">
        <div class="modpanel-sidebar">
            <h1 class="modpanel-sidebar-header">Main</h1>
            <ul class="modpanel-sidebar-list">
                <li>
                    <a href="/mod/dashboard" class="modpanel-sidebar-list-item">
                    <i class="fa fa-tachometer" aria-hidden="true"></i>Dashboard</a>
                </li>
                <li>
                    <a href="/mod/users" class="modpanel-sidebar-list-item disabled">
                    <i class="fa fa-user" aria-hidden="true"></i>Users</a>
                </li>
                <li>
                    <a href="/mod/teams" class="modpanel-sidebar-list-item disabled">
                    <i class="fa fa-users" aria-hidden="true"></i>Teams</a>
                </li>
                <li>
                    <a href="/mod/games" class="modpanel-sidebar-list-item">
                    <i class="fa fa-gamepad" aria-hidden="true"></i>Games</a>
                </li>
                <li>
                    <a href="/mod/tournaments" class="modpanel-sidebar-list-item">
                    <i class="fa fa-trophy" aria-hidden="true"></i>Tournaments</a>
                </li>
                <li>
                    <a href="/mod/blogs" class="modpanel-sidebar-list-item disabled">
                    <i class="fa fa-newspaper" aria-hidden="true"></i>Blog</a>
                </li>
            </ul>

            <h1 class="modpanel-sidebar-header">More</h1>
            <ul class="modpanel-sidebar-list">
                <li>
                    <a href="#" class="modpanel-sidebar-list-item disabled">
                    <i class="fa fa-file-alt" aria-hidden="true"></i>Mod Doc</a>
                </li>
            </ul>

            <h1 class="modpanel-sidebar-header">Stats</h1>
            <ul class="modpanel-sidebar-list modpanel-sidebar-list-info">
                <li>
                    <a href="#" class="modpanel-sidebar-list-item">
                        <Progress
                            title="Server Usage"
                            :progress="30 + '%'"
                            color="primary"
                        />
                    </a>
                </li>
                <li>
                    <a href="#" class="modpanel-sidebar-list-item">
                        <Progress
                            title="GitHub Issues"
                            :progress="30 + '%'"
                            color="yellow"
                        />
                    </a>
                </li>
            </ul>

            <button class="btn modpanel-sidebar-close">
                <i class="icon icon-chevron"></i>
            </button>
        </div>


        <div class="modpanel-main">
            <nuxt/>
        </div>
    </div>
</template>

<script>
import Component from 'nuxt-class-component';
import Vue from 'vue';

import Progress from '~/components/form/Progress';

@Component({
    layout: 'header',
    components: { Progress }
})

export default class Mod extends Vue {

}
</script>

<style lang="scss" scoped>
@import '../assets/styles/utils';

.ModPanel {
    height: calc(100vh - #{$header-height});
    display: flex;
    flex: 1;

    @include breakpoint(md) {
        display: block;
    }
}
</style>

