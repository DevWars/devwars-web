<template>
    <div class="dashboard header-offset">
        <div class="container">
            <div class="row">
                <div class="aside col-md-4">
                    <ProfileCard :user="user.user" />

                    <Wallet :user="user.user" />

                    <Badges :owned="mine" />
                </div>


                <div class="main col-md-8">
                    <DailyPrizes />

                    <UpcomingGames :upcoming="upcomingGames" :applied="appliedGames" />

                    <Activities :paged="activities" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Http from "../services/Http";

    import ProfileCard from '~/components/dashboard/ProfileCard';
    import Wallet from '~/components/dashboard/Wallet';
    import Badges from '~/components/dashboard/Badges';
    import Activities from '~/components/dashboard/Activities';
    import UpcomingGames from '~/components/dashboard/UpcomingGames';
    import DailyPrizes from '~/components/dashboard/DailyPrizes';

    import {mapState} from "vuex";

    export default {
        name: "Dashboard",
        components: {
            ProfileCard,
            Wallet,
            Badges,
            Activities,
            UpcomingGames,
            DailyPrizes
        },
        async asyncData({store}) {
            return {
                mine: await Http.for(`user/${store.state.user.user.id}`).get('badges'),
                activities: await Http.for('activity').get('mine'),
            };
        },
        computed:{ 
            user() {
                return this.$store.state.user
            },
            appliedGames() {
                return this.$store.state.game.applied
            },
            upcomingGames() {
                return this.$store.state.game.upcoming
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/styles/utils';

.dashboard {
    padding-top: $header-offset + $grid-gutter-width;
}

.aside {
    /deep/ .Card {
        border-top-color: $brand-primary;
    }
}

.main {
    margin-top: $user-avatar-offset;
}
</style>
