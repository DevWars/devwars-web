<template>
    <div class="Leaderboards">
        <PageBanner title="Leaderboards" />

        <Container class="footer-offset">
            <Table>
                <tr slot="head">
                    <th width="10%">Rank</th>
                    <th width="30%">Username</th>
                    <th width="15%">Level</th>
                    <th width="15%">Won</th>
                    <th width="15%">Coins</th>
                    <th width="15%">XP</th>
                </tr>

                <tr
                    v-for="(user, index) in leaderboards.data"
                    :key="user.userId"
                >
                    <td scope="row" class="rank">
                        {{ page * 10 + index + 1 }}
                    </td>
                    <td><User :user="user" size="sm" /></td>
                    <td>{{ user.level }}</td>
                    <td>{{ user.wins }}</td>
                    <td>{{ user.coins }}</td>
                    <td>{{ user.xp }}</td>
                </tr>
            </Table>

            <Pagination
                :page="page"
                :per-page="10"
                :can-next="leaderboards.pagination.after !== null"
                :can-previous="leaderboards.pagination.before !== null"
                @previous="previous"
                @next="next"
            />
        </Container>
    </div>
</template>

<script>
import PageBanner from '@/components/layout/PageBanner';
import Table from '@/components/Table';
import User from '@/components/user/User';
import Pagination from '@/components/Pagination';

export default {
    name: 'Leaderboards',

    components: { PageBanner, Table, User, Pagination },

    async asyncData({ app: { $api } }) {
        return {
            leaderboards: await $api.leaderboards.leaderboardsOfUsers({
                first: 25,
                after: 0,
            }),
        };
    },

    data: () => {
        return {
            page: 0,
            pagination: {
                after: null,
                before: null,
            },
            data: [],
        };
    },

    mounted() {},

    methods: {
        async previous() {
            this.page -= 1;

            const { pagination } = this.leaderboards;

            const first = pagination.before.split('?first=')[1].split('&')[0];
            const after = pagination.before.split('&after=')[1];

            this.leaderboards = await this.$api.leaderboards.leaderboardsOfUsers(
                {
                    first,
                    after,
                },
            );
        },

        async next() {
            this.page += 1;

            const { pagination } = this.leaderboards;

            const first = pagination.after.split('?first=')[1].split('&')[0];
            const after = pagination.after.split('&after=')[1];

            this.leaderboards = await this.$api.leaderboards.leaderboardsOfUsers(
                {
                    first,
                    after,
                },
            );
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.Leaderboards {
    .rank {
        padding-left: 20px;
        font-size: 15px;

        &.increase {
            color: $success-color;
        }
        &.neutral {
            color: $info-color;
            font-size: 12px;
        }
        &.decrease {
            color: $danger-color;
        }
    }

    .Table td {
        padding-top: $grid-gutter-width;
        padding-bottom: $grid-gutter-width;

        &:last-child {
            text-align: left;
        }
    }
}
</style>
