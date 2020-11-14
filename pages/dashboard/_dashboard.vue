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
                    <GamesPlayed :user="user.user" />

                    <UpcomingGames
                        v-if="upcomingGames.length > 0"
                        :upcoming="upcomingGames"
                    />

                    <Activities
                        v-if="user.activities.length > 0"
                        :paged="user.activities"
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
import GamesPlayed from '@/components/dashboard/GamesPlayed';

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
        GamesPlayed,
    },

    async asyncData({ params, error, store, app: { $api } }) {
        if (params.dashboard == null || params.dashboard.trim() === '')
            return {};

        try {
            const { dashboard: userId } = params;

            const user = await $api.users.getUser(userId);
            const stats = await $api.users.getUserStatistics(userId);
            const activities = await $api.users.getUserActivities(userId);

            return {
                me: false,

                user: {
                    user,
                    stats,
                    activities,
                },
            };
        } catch (e) {
            error({
                statusCode: e.code,
                description: e.message,
                message: e.message,
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
        upcomingGames() {
            return this.$store.state.game.upcoming;
        },
        isModerator() {
            const { user } = this.$store.state.user;

            if (user != null && user != null) {
                return user.role === 'MODERATOR' || user.role === 'ADMIN';
            }

            return false;
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
