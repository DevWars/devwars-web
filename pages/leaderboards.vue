<template>
    <div>
        <PageBanner title="Leaderboards">
            <!-- <select class="select--clear">
                <option>Today</option>
                <option selected="selected">Weekly</option>
                <option>Monthly</option>
                <option>All Time</option>
            </select> -->
        </PageBanner>

        <div class="footer-offset container">
            <Table>
                <tr slot="head">
                    <th width="10%">Rank</th>
                    <th width="50%">User Name</th>
                    <th width="15%">Level</th>
                    <th width="15%">Won</th>
                    <th width="15%">XP</th>
                </tr>

                <tr v-for="(user, index) in leaderboards.users" :key="user.id">
                    <td scope="row" class="leaderboard__rank">
                        {{ (page * 10) + index + 1 }}
                    </td>
                    <td><User :user="user"/></td>
                    <td>{{ user.statistics.rank.rank }}</td>
                    <td>{{ user.statistics.wins }}</td>
                    <td>{{ user.statistics.xp }}</td>
                </tr>
            </Table>

            <Pagination :page="page" :perPage="10" :count="leaderboards.count" @previous="previous" @next="next"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Http from "../services/Http";

    import PageBanner from '~/components/layout/PageBanner';
    import Table from '~/components/Table';
    import Pagination from '~/components/Pagination';
    import User from '~/components/user/User';

    export default {
        name: "Leaderboards",
        components: { PageBanner, Table, Pagination, User },
        data: () => {
            return {
                page: 0
            }
        },
        methods: {
            async previous() {
                this.page--;
                this.leaderboards = await Http.for('leaderboard/users').get({page: this.page});
            },
            async next() {
                this.page++;
                this.leaderboards = await Http.for('leaderboard/users').get({page: this.page});
            }
        },
        async asyncData() {
            return {leaderboards: await Http.for('leaderboard/users').get()}
        }

    }
</script>
