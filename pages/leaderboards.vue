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
            <div class="card card-plain">
                <table class="table leaderboard">
                    <thead>
                    <tr>
                        <th width="10%">Rank</th>
                        <th width="50%">User Name</th>
                        <th width="15%">Level</th>
                        <th width="15%">Won</th>
                        <th width="15%">Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(ranking, index) in leaderboards" :key="ranking.user.id">
                        <td scope="row" class="leaderboard__rank">
                            {{ (page * 10) + index + 1 }}
                        </td>
                        <td>
                            <div class="user-group">
                                <Avatar :user="ranking.user"/>
                                <span class="user-group__name leaderboard__user">{{ ranking.user.username }}</span>
                            </div>
                        </td>
                        <td>{{ ranking.user.ranking.rank.rank }}</td>
                        <td>{{ ranking.won }}</td>
                        <td>{{ ranking.score }}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="ranking-pagination">
                    <button @click="previous" class="ranking-pagination__btn" :class="{disabled: page < 1}">Prev</button>
                    <span class="ranking-pagination__page">Page {{ page + 1}}</span>
                    <button @click="next" class="ranking-pagination__btn">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';
    import Http from "../services/Http";

    import PageBanner from '~/components/layout/PageBanner';
    import Avatar from '~/components/user/Avatar';

    @Component({
        components: { PageBanner, Avatar }
    })
    export default class Leaderboards extends Vue {
        page = 0;

        async previous() {
            this.page--;
            this.leaderboards = await Http.for('leaderboard').get({page: this.page});
        }

        async next() {
            console.log(this.page);
            this.page++;
            this.leaderboards = await Http.for('leaderboard').get({page: this.page});
        }

        async asyncData() {
            return {leaderboards: await Http.for('leaderboard').get()}
        }
    }
</script>
