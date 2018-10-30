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
    import { team_for_game, vote_analysis_for_team } from '../../utils/objectives';

    @Component
    export default class VoteBox extends Vue {
        @Prop() game;
        @Prop() vote;
        @Prop() label;

        analysisForTeam(team, otherTeam) {
            return vote_analysis_for_team(team, otherTeam, this.label);
        }

        get analysis() {
            let analysis = {};

            analysis.red = this.analysisForTeam(team_for_game("red", this.game), team_for_game("blue", this.game));
            analysis.blue = this.analysisForTeam(team_for_game("blue", this.game), team_for_game("red", this.game));

            return analysis;
        }

        get total() {
            return this.analysis.blue.votes + this.analysis.red.votes;
        }
    }
</script>
