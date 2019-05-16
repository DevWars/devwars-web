<template>
    <div class="dashboard header-offset">
        <div class="container">
            <div class="row">
                <div v-if="user" class="aside col-md-4">
                    <ProfileCard :user="user.user"/>

                    <Wallet :stats="user.stats"/>

                    <!-- <Badges :owned="mine"/> -->
                </div>

                <div class="main col-md-8">
                    <DailyPrizes/>

                    <UpcomingGames v-if="upcomingGames.length > 0" :upcoming="upcomingGames"/>

                    <Activities v-if="activities.length > 0" :paged="activities"/>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import ProfileCard from '~/components/dashboard/ProfileCard';
import Wallet from '~/components/dashboard/Wallet';
import Activities from '~/components/dashboard/Activities';
import UpcomingGames from '~/components/dashboard/UpcomingGames';
import DailyPrizes from '~/components/dashboard/DailyPrizes';

export default {
    name: 'Dashboard',
    components: {
        ProfileCard,
        Wallet,
        Activities,
        UpcomingGames,
        DailyPrizes,
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        stats() {
            return this.$store.state.stats;
        },
        upcomingGames() {
            return this.$store.state.game.upcoming;
        },
        activities() {
            return this.$store.state.user.activities;
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

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
