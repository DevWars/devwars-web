<template>
    <SubScore
        v-show="total > 0"
        :title="category"
        :blueScore="game.meta.teamScores[0][category]"
        :redScore="game.meta.teamScores[1][category]"
    >
        <div class="voting">
            <div class="team team-blue" :class="{win: analysis.blue.win}">
                <div class="meta">
                    <div class="placeholder"></div>
                    <div class="percent">{{ analysis.blue.percent }}</div>
                </div>
                <div class="progress">
                    <div class="bar" :style="{width: analysis.blue.percent}"></div>
                </div>
            </div>
            <div class="team team-red" :class="{win: analysis.red.win}">
                <div class="progress">
                    <div class="bar" :style="{width: analysis.red.percent}"></div>
                </div>
                <div class="meta">
                    <div class="placeholder"></div>
                    <div class="percent">{{ analysis.red.percent }}</div>
                </div>
            </div>
        </div>

        <div class="voters">{{ total }} votes</div>
    </SubScore>
</template>


<script>
import SubScore from '@/components/game/SubScore';
import { vote_analysis_for_team } from '../../utils/objectives';

export default {
    name: 'VoteBox',
    components: { SubScore },
    props: {
        game: {
            type: Object,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    computed: {
        analysis() {
            const analysis = {};

            analysis.blue = this.analysisForTeam(
                this.game.teams[0],
                this.game.teams[1]
            );
            analysis.red = this.analysisForTeam(
                this.game.teams[1],
                this.game.teams[0]
            );

            return analysis;
        },
        total() {
            const teams = this.game.teams;
            let totalScore = 0;
            if (teams) {
                for (const team of Object.values(teams)) {
                    const vote = team.votes[this.category];
                    totalScore += vote;
                }
            }
            return totalScore;
        },
    },
    methods: {
        analysisForTeam(team, otherTeam) {
            return vote_analysis_for_team(team, otherTeam, this.category);
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';
$voting-bar-height: 20px;

.voting {
    @extend %flex-justify;
    @extend %brand-skew;
    position: relative;

    &:after {
        @extend %absolute-center;
        content: '';
        display: inline-block;
        height: $voting-bar-height + 10px;
        width: 4px;
        background-color: #fff;
    }

    // Variations
    @mixin games-voting-variant($team, $color, $direction, $offset) {
        .team.#{$team} .meta {
            float: $offset;
            text-align: $offset;
        }

        .team.#{$team} .progress {
            float: $direction;
        }

        .team.#{$team} .bar {
            background-color: $color;
            float: $direction;
        }
    }

    @include games-voting-variant(team-blue, $brand-primary, right, left);
    @include games-voting-variant(team-red, $brand-secondary, left, right);
}

.team {
    width: 50%;
}

.progress {
    width: 80%;
}

.bar {
    width: 0%;
    height: $voting-bar-height;
    position: relative;
    opacity: 0.4;
}

.meta {
    width: 20%;
    position: relative;
    line-height: 1;
}

.placeholder,
.percent {
    padding: 0 $xs-space;
    font-size: $h4-font-size;
    font-weight: $font-weight-bold;
    color: $text-color-secondary;
}

.percent {
    @extend %absolute-center-y;
    width: 100%;
}

.placeholder {
    &:before {
        content: '100%';
    }
    opacity: 0;
    visibility: hidden;
}

.voters {
    margin-top: $s-space;
    text-align: center;
    color: $text-color-secondary;
}

.team.win .bar {
    opacity: 1;
}
</style>
