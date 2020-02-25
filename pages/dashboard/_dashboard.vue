<template>
    <div class="dashboard header-offset">
        <Container>
            <Row>
                <Column v-if="user" :md="4" class="aside">
                    <ProfileCard :user="user.user" />

                    <Wallet :stats="user.stats" />
                </Column>

                <Column :md="8" class="main">
                    <Moderation v-if="isModerator && !me" :user="user.user" />
                    <DailyPrizes />

                    <UpcomingGames
                        v-if="upcomingGames.length > 0"
                        :upcoming="upcomingGames"
                    />

                    <Activities
                        v-if="activities.length > 0"
                        :paged="activities"
                    />
                </Column>
            </Row>
        </Container>
    </div>
</template>

<script>
import { names } from '../../utils/auth';
import ProfileCard from '@/components/dashboard/ProfileCard';
import Wallet from '@/components/dashboard/Wallet';
import Activities from '@/components/dashboard/Activities';
import UpcomingGames from '@/components/dashboard/UpcomingGames';
import Moderation from '@/components/dashboard/Moderation';
import DailyPrizes from '@/components/dashboard/DailyPrizes';

export default {
    name: 'Dashboard',
    meta: {
        auth: names.USER,
    },
    components: {
        ProfileCard,
        Moderation,
        Wallet,
        Activities,
        UpcomingGames,
        DailyPrizes,
    },

    async asyncData({ params, error, $axios, store }) {
        if (params.dashboard == null || params.dashboard.trim() === '')
            return {};

        try {
            const user = await await $axios.get(`/users/${params.dashboard}`);
            const stats = await await $axios.get(
                `/users/${params.dashboard}/stats`,
            );

            return {
                me: false,
                user: {
                    user: user.data,
                    stats: stats.data,
                },
            };
        } catch (e) {
            error({
                statusCode: e.response.status,
                description: e.response.data.error,
                message: e.response.statusText,
            });
        }
    },

    data() {
        return {
            id: this.$route.params.dashboard,
            user: this.$store.state.user,
            me: true,
        };
    },

    computed: {
        stats() {
            return this.$store.state.stats;
        },
        upcomingGames() {
            return this.$store.state.game.upcoming;
        },
        activities() {
            return this.$store.state.user.activities;
        },

        isModerator() {
            const { role } = this.$store.state.user.user;
            return role === 'MODERATOR' || role === 'ADMIN';
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
