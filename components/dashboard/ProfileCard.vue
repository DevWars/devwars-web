<template>
    <DashboardCard v-if="user" class="profile">
        <Avatar :user="user" class="xl"/>
        <h4>{{ user.username }}</h4>
        <div class="user-rank rank">
            <span>RANK</span>
        </div>

        <Progress title="Level 1" :meta="progress" :progress="progress"/>
    </DashboardCard>
</template>


<script>
import DashboardCard from '~/components/DashboardCard';
import Avatar from '~/components/user/Avatar';
import Progress from '~/components/form/Progress';

export default {
    name: 'ProfileCard',
    components: { DashboardCard, Avatar, Progress },
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    computed: {
        stats() {
            return this.$store.state.stats;
        },
        progress() {
            // const past =
            //     this.user.statistics.xp - this.user.statistics.rank.xpRequired;
            // const difference =
            //     this.user.statistics.nextRank.xpRequired -
            //     this.user.statistics.rank.xpRequired;
            // const percentage = Math.round((past / difference) * 100);
            // const formattedPercentage = `${percentage}%`;

            return '50%';
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.profile {
    margin-top: $user-avatar-offset;
    background-color: $bg-color-2;
    text-align: center;

    /deep/ .content {
        padding: 30px;
    }
}

.Avatar {
    margin-bottom: 20px;
}

.user-rank {
    margin-bottom: $grid-gutter-width;
}

/deep/ .user-avatar-wrapper {
    border: $border-size-lg solid $divider-color;
    margin: -($user-avatar-offset * 2) auto $grid-gutter-width;
    border-radius: 50%;
}
</style>
