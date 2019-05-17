<template>
    <div class="dashboard header-offset">
        <Container>
            <Row>
                <Column v-if="user" :md="4" class="aside">
                    <ProfileCard :user="user.user"/>

                    <Wallet :stats="user.stats"/>

                    <!-- <Badges :owned="mine"/> -->
                </Column>

                <Column :md="8" class="main">
                    <DailyPrizes/>

                    <UpcomingGames v-if="upcomingGames.length > 0" :upcoming="upcomingGames"/>

                    <Activities v-if="activities.length > 0" :paged="activities"/>
                </Column>
            </Row>
        </Container>
    </div>
</template>


<script>
import ProfileCard from '@/components/dashboard/ProfileCard';
import Wallet from '@/components/dashboard/Wallet';
import Activities from '@/components/dashboard/Activities';
import UpcomingGames from '@/components/dashboard/UpcomingGames';
import DailyPrizes from '@/components/dashboard/DailyPrizes';
import { names } from '../utils/auth';

export default {
    name: 'Dashboard',
    meta: {
        auth: names.USER,
    },
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
    padding-top: $header-offset + 30px;
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
