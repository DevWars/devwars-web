<template>
    <DashboardCard v-if="user" class="profile">
        <Avatar :user="user" class="xl" />
        <h4>{{ user.username }}</h4>
        <div class="user-rank rank" :class="['rank-' + user.statistics.rank.levelName]">
            <span>{{ user.statistics.rank.rank }}</span>
        </div>

        <Progress
            :title="'Level' + user.statistics.rank.rankLevel"
            :meta="progress"
            :progress="progress"
        />
    </DashboardCard>
</template>

<script>
import Component from 'nuxt-class-component';
import Vue from 'vue';

import DashboardCard from '~/components/DashboardCard';
import Avatar from '~/components/user/Avatar';
import Progress from '~/components/form/Progress';

@Component({
    components: { DashboardCard, Avatar, Progress },
    props: ['user']
})

export default class ProfileCard extends Vue {
    get progress() {
        let past = this.user.statistics.xp - this.user.statistics.rank.xpRequired;
        let difference = this.user.statistics.nextRank.xpRequired - this.user.statistics.rank.xpRequired;

        return (past / difference * 100) + '%';
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils';

.profile {
    margin-top: $user-avatar-offset;
    background-color: $bg-color-2;
    text-align: center;

    /deep/ .content {
        padding: $grid-gutter-width;
    }
}

.user-rank {
    margin-bottom: $grid-gutter-part;
}

/deep/ .user-avatar-wrapper {
    border: $border-size-lg solid $divider-color;
    margin: -($user-avatar-offset * 2) auto $grid-gutter-part;
    border-radius: 50%;
}
</style>
