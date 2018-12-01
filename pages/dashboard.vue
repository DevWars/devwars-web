<template>
    <div class="dashboard header-offset">
        <div class="container">
            <div class="row">
                <div class="aside col-md-4">
                    <ProfileCard :user="user" />

                    <Wallet :user="user" />

                    <Badges :owned="mine" />
                </div>


                <div class="main col-md-8">
                    <!-- <DailyPrizes /> -->

                    <UpcomingGames :upcoming="upcomingGames" :applied="appliedGames" />

                    <Activities :paged="activities" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';
    import Http from "../services/Http";

    import ProfileCard from '~/components/dashboard/ProfileCard';
    import Wallet from '~/components/dashboard/Wallet';
    import Badges from '~/components/dashboard/Badges';
    import Activities from '~/components/dashboard/Activities';
    import UpcomingGames from '~/components/dashboard/UpcomingGames';

    @Component({
        components: {
            ProfileCard,
            Wallet,
            Badges,
            Activities,
            UpcomingGames,
        }
    })
    export default class Dashboard extends Vue {
        @State(state => state.user.user) user;
        @State(state => state.game.applied) appliedGames;
        @State(state => state.game.upcoming) upcomingGames;

        async asyncData({store}) {
            return {
                mine: await Http.for(`user/${store.state.user.user.id}`).get('badges'),
                activities: await Http.for('activity').get('mine'),
            };
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/styles/utils';

.dashboard {
    padding-top: $header-offset + $grid-gutter-width;
}

.aside {
    /deep/ .card {
        border-top-color: $brand-primary;
    }
}

.main {
    margin-top: $user-avatar-offset;
}
</style>
