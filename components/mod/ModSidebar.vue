<template>
    <div class="ModSidebar">
        <h6>Main</h6>
        <ul>
            <li>
                <nuxt-link to="/mod/dashboard">
                    <i class="fa fa-tachometer-alt" />Dashboard
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mod/users">
                    <i class="fa fa-user" />Users
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mod/teams" class="disabled">
                    <i class="fa fa-users" />Teams
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mod/schedules">
                    <i class="fa fa-calendar" />Schedules
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mod/games">
                    <i class="fa fa-gamepad" />Games
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mod/tournaments" class="disabled">
                    <i class="fa fa-trophy" />Tournaments
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mod/blogs" class="disabled">
                    <i class="fa fa-newspaper" />Blog
                </nuxt-link>
            </li>
        </ul>

        <h6>More</h6>
        <ul>
            <li>
                <nuxt-link to="#" class="disabled">
                    <i class="fa fa-file-alt" />Mod Doc
                </nuxt-link>
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

        <h6>information</h6>
        <div class="information">
            <div>
                Client: <span>v{{ version }}</span>
            </div>
            <div>
                API: <span>v{{ serverVersion }}</span>
            </div>
            <div>
                Status: <span :class="apiStatusColor">{{ serverStatus }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Progress from '@/components/form/Progress';

export default {
    name: 'ModSidebar',
    components: { Progress },

    data() {
        return {
            apiStatusColor: 'information__healthy',
            version: process.env.version,
        };
    },

    computed: {
        ...mapGetters({
            serverVersion: 'server/version',
            serverStatus: 'server/status',
        }),
    },

    mounted() {
        this.apiStatusColor = `information__${this.serverStatus}`.toLowerCase();
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.ModSidebar {
    width: 320px;
    background-color: $bg-color-4;
    position: relative;
    overflow-y: auto;

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

.information {
    padding: 10px $s-space;

    h5 {
        margin-bottom: $xs-space;
        font-weight: $font-weight-bold;
    }

    div {
        margin-bottom: 10px;
        margin-top: 0px;
        font-size: $font-size-base;
        line-height: 1.3;
    }

    &__healthy {
        color: $success-color;
    }

    &__degraded {
        color: $warning-color;
    }

    &__error {
        color: $danger-color;
    }
}
</style>
