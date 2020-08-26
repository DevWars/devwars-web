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

                <tr v-for="(user, index) in leaderboards.data" :key="user.id">
                    <td scope="row" class="rank">
                        {{ page * 10 + index + 1 }}
                    </td>
                    <td><User :user="user" size="sm" /></td>
                    <td>{{ user.stats.level }}</td>
                    <td>{{ user.gameStats.wins }}</td>
                    <td>{{ user.stats.coins }}</td>
                    <td>{{ user.stats.xp }}</td>
                </tr>
            </Table>

            <Pagination
                :page="page"
                :per-page="10"
                :can-next="false"
                :can-previous="false"
                @previous="() => {}"
                @next="() => {}"
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
            leaderboards: await $api.leaderboards.leaderboardsOfUsers({}),
        };
    },

    data: () => {
        return {
            page: 0,
        };
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
