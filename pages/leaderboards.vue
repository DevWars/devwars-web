<template>
    <div class="Leaderboards">
        <PageBanner title="Leaderboards">
            <Select class="clear">
                <option>Today</option>
                <option selected="selected">Weekly</option>
                <option>Monthly</option>
                <option>All Time</option>
            </Select>
        </PageBanner>

        <Container class="footer-offset">
            <Table>
                <tr slot="head">
                    <th width="10%">Rank</th>
                    <th width="50%">User Name</th>
                    <th width="15%">Level</th>
                    <th width="15%">Won</th>
                    <th width="15%">XP</th>
                </tr>

                <tr v-for="(user, index) in leaderboards.users" :key="user.id">
                    <td scope="row" class="rank">{{ (page * 10) + index + 1 }}</td>
                    <td>
                        <User :user="user"/>
                    </td>
                    <td>{{ user.statistics.rank.rank }}</td>
                    <td>{{ user.statistics.wins }}</td>
                    <td>{{ user.statistics.xp }}</td>
                </tr>
            </Table>

            <Pagination
                :page="page"
                :perPage="10"
                :count="leaderboards.count"
                @previous="previous"
                @next="next"
            />
        </Container>
    </div>
</template>


<script>
import Http from '../services/Http';
import PageBanner from '@/components/layout/PageBanner';
import Table from '@/components/Table';
import Select from '@/components/form/Select';
import Pagination from '@/components/Pagination';
import User from '@/components/user/User';

export default {
    name: 'Leaderboards',

    components: { PageBanner, Table, Select, Pagination, User },

    async asyncData() {
        return { leaderboards: await Http.for('leaderboard/users').get() };
    },

    data: () => {
        return {
            page: 0,
        };
    },

    methods: {
        async previous() {
            this.page -= 1;
            this.leaderboards = await Http.for('leaderboard/users').get({
                page: this.page,
            });
        },

        async next() {
            this.page += 1;
            this.leaderboards = await Http.for('leaderboard/users').get({
                page: this.page,
            });
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
            color: $blue-color;
            font-size: 12px;
        }
        &.decrease {
            color: $danger-color;
        }
    }
}
</style>
