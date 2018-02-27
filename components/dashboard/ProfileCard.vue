<template>
    <div class="dashboard-card user-profile">
        <Avatar :user="user" class="xl"></Avatar>
        <div class="user-profile__name">{{ user.username }}</div>
        <div class="user-rank rank" :class="['rank-' + user.ranking.rank.level_name]">
            <div class=""></div>
            <span>{{ user.ranking.rank.rank }}</span>
        </div>
        <div class="progress-header">
            <span class="progress-header__title">Level {{ user.ranking.rank.rank_level }}</span>
            <span class="progress-header__meta">{{ progress }}</span>
        </div>
        <div class="progress">
            <div class="progress__bar" :style="{width: progress}"></div>
        </div>
    </div>

</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import Avatar from '~/components/user/Avatar';

    @Component({
        components: {Avatar},
        props: ['user']
    })
    export default class ProfileCard extends Vue {
        get progress() {
            let past = this.user.ranking.xp - this.user.ranking.rank.xp_required;
            let difference = this.user.ranking.next_rank.xp_required - this.user.ranking.rank.xp_required;

            return (past / difference * 100) + '%';
        }

    }
</script>
