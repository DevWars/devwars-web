<template>
    <div class="dashboard header-offset">
        <div class="container">
            <div class="row">
                <div class="dashboard__aside">
                    <ProfileCard :user="user"/>

                    <Wallet :user="user"/>

                    <Badges :owned="mine"/>
                </div>


                <div class="dashboard__main">

                    <!-- <div class="dashboard-card">
                    <div class="dashboard-card__header">
                    <i class="dashboard-card__icon fa fa-gift"></i>
                    <h4 class="dashboard-card__title">Daily Tasks</h4>
                    </div>
                    <div class="daily-prizes">
                    <div class="daily-prizes__item">
                    <div class="daily-prizes__main">
                    <div class="daily-prizes__prize">
                    <div class="devcoins">
                    <Devcoin></Devcoin>
                    <div class="devcoins__amount">500</div>
                    </div>
                    </div>
                    <div class="daily-prizes__title">Submit 5 Objectives</div>
                    </div>
                    <div class="daily-prizes__actions">
                    <a href="#" class="btn btn-outline-white btn-sm">Claim</a>
                    </div>
                    </div>

                    <div class="daily-prizes__item">
                    <div class="daily-prizes__main">
                    <div class="daily-prizes__prize">
                    <div class="devcoins">
                    <Devcoin></Devcoin>
                    <div class="devcoins__amount">200</div>
                    </div>
                    </div>
                    <div class="daily-prizes__title">Comment on a User Submission</div>
                    </div>
                    <div class="daily-prizes__actions">
                    <a href="#" class="btn btn-outline-white btn-sm disabled">Claim</a>
                    </div>
                    </div>
                    </div>
                    </div> -->
                    <UpcomingGames :upcoming="upcomingGames" :applied="appliedGames"/>

                    <Activities :paged="activities"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';
    import Http from "../services/Http";

    import ProfileCard from '~/components/dashboard/ProfileCard';
    import Wallet from '~/components/dashboard/Wallet';
    import Badges from '~/components/dashboard/Badges';
    import Activities from '~/components/dashboard/Activities';
    import UpcomingGames from '~/components/dashboard/UpcomingGames';

    @Component({
        components: {ProfileCard, Wallet, Badges, Activities, UpcomingGames}
    })
    export default class Dashboard extends Vue {
        @State(state => state.user.user) user;
        @State(state => state.game.applied) appliedGames;
        @State(state => state.game.upcoming) upcomingGames;

        async asyncData() {
            return {
                mine: await Http.for('badge').get('mine'),
                activities: await Http.for('activity').get('mine'),
            };
        }
    }
</script>

