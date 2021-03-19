<template>
    <div class="User" :class="{ red: team == 1, blue: team == 0 }">
        <div class="avatar">
            <Avatar :user="user" :class="size" />
            <img v-if="stats" :src="rankSrc" class="rank" :alt="stats.rank.name"/>
        </div>

        <div class="main">
            <strong>{{ user.username }}</strong>
            <ConnectionsSmall :connections="user.connections" />
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/user/Avatar';
import ConnectionsSmall from '@/components/user/ConnectionsSmall';

export default {
    name: 'User',

    components: { Avatar, ConnectionsSmall },

    props: {
        team: {
            type: Number,
            default: null,
        },
        user: {
            type: Object,
            required: true,
        },
        size: {
            type: String,
            default: 'md',
        },
        showRank: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        stats: null,
        rankSrc: null,
    }),

    async mounted() {
        if (this.showRank) {
            await this.getUserStats();
        }
    },

    methods: {
        async getUserStats() {
            this.stats = await this.$api.users.getUserStatistics(this.user.id);

            if (this.stats) {
                this.rankSrc = `https://devwars-cdn.s3.amazonaws.com/ranks/${this.stats.rank.level}.svg`;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.User {
    display: flex;
    align-items: center;
    line-height: 1;

    .avatar {
        position: relative;

        .rank {
            max-width: 20px;
            position: absolute;
            right: 0;
            bottom: -5px;
        }
    }

    .main {
        display: flex;
        align-items: center;
        margin-left: 10px;
    }

    &.blue {
        color: $brand-primary;
    }

    &.red {
        color: $brand-secondary;
    }
}
</style>
