<template>
    <div class="sub-score-section" v-show="total > 0">
        <div class="sub-score-header">
            <span class="sub-score-header__points team-blue">{{ analysis.blue.points }}</span>
            <h3 class="sub-score-header__title">{{ label }}</h3>
            <span class="sub-score-header__points team-red">{{ analysis.red.points }}</span>
        </div>
        <div class="games-voting">
            <div class="games-voting__team team-blue" :class="{win: analysis.blue.win}">
                <div class="games-voting__meta">
                    <div class="games-voting__placeholder"></div>
                    <div class="games-voting__percent">{{ analysis.blue.percent }}</div>
                </div>
                <div class="games-voting__progress">
                    <div class="games-voting__bar" :style="{width: analysis.blue.percent}"></div>
                </div>
            </div>
            <div class="games-voting__team team-red" :class="{win: analysis.red.win}">
                <div class="games-voting__progress">
                    <div class="games-voting__bar" :style="{width: analysis.red.percent}"></div>
                </div>
                <div class="games-voting__meta">
                    <div class="games-voting__placeholder"></div>
                    <div class="games-voting__percent">{{ analysis.red.percent }}</div>
                </div>
            </div>
        </div>
        <div class="games-voting__voters">{{ total }} votes</div>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';

    @Component
    export default class VoteBox extends Vue {
        @Prop() game;
        @Prop() vote;
        @Prop() label;

        analysisForTeam(team, otherTeam) {
            let points;
            let teamVotes = team.votes[this.vote] ? team.votes[this.vote].count : 0;
            let otherVotes = otherTeam.votes[this.vote] ? otherTeam.votes[this.vote].count : 0;
            let total = teamVotes + otherVotes;

            if (teamVotes >= total * (2.0 / 3.0)) {
                points = 2;
            } else if (teamVotes >= total * (1.0 / 3.0)) {
                points = 1;
            } else {
                points = 0;
            }

            let percent = (teamVotes / total * 100).toFixed(0) + '%';
            let win = teamVotes > otherVotes;
            return {points, win, percent, votes: teamVotes};
        }

        get analysis() {
            let analysis = {};

            analysis.red = this.analysisForTeam(this.game.teams.red, this.game.teams.blue);
            analysis.blue = this.analysisForTeam(this.game.teams.blue, this.game.teams.red);

            return analysis;
        }

        get total() {
            return this.analysis.blue.votes + this.analysis.red.votes;
        }
    }
</script>
