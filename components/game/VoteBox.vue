<template>
    <SubScore
        v-show="total > 0 || showOverride"
        :title="category"
        :blue-score="analysis.blue.points"
        :red-score="analysis.red.points"
    >
        <div class="voting">
            <div class="team team-blue" :class="{ win: analysis.blue.win }">
                <div class="meta">
                    <div class="placeholder" />
                    <div class="percent">{{ analysis.blue.percent }}</div>
                </div>
                <div class="progress">
                    <div
                        class="bar"
                        :style="{ width: analysis.blue.percent }"
                    />
                </div>
            </div>
            <div class="team team-red" :class="{ win: analysis.red.win }">
                <div class="progress">
                    <div class="bar" :style="{ width: analysis.red.percent }" />
                </div>
                <div class="meta">
                    <div class="placeholder" />
                    <div class="percent">{{ analysis.red.percent }}</div>
                </div>
            </div>
        </div>

        <div class="voters">{{ total }} votes</div>
    </SubScore>
</template>

<script>
import { isNil } from 'lodash';
import { voteAnalysisForTeam } from '../../utils/objectives';
import SubScore from '@/components/game/SubScore';

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
        showOverride: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        analysis() {
            const analysis = { blue: {}, red: {} };

            const scores = this.game.meta.teamScores;

            analysis.blue = this.analysisForTeam(scores[0], scores[1], this.category);
            analysis.red = this.analysisForTeam(scores[1], scores[0], this.category);

            return analysis;
        },

        total() {
            const teams = this.game.meta.teamScores;
            let totalScore = 0;
            if (teams) {
                for (const team of Object.values(teams)) {
                    if (!team[this.category]) {
                        continue;
                    }
                    const vote = team[this.category];
                    totalScore += vote;
                }
            }

            return totalScore;
        },
    },

    methods: {
        teamScore(team) {
            if (isNil(this.game.meta) || isNil(this.game.meta.teamScores)) {
                return 0;
            }

            const teamIndex = team === 'blue' ? 0 : 1;
            const teamScores = this.game.meta.teamScores[teamIndex];
            if (!teamScores && !teamScores[this.category]) {
                return 0;
            }

            return teamScores[this.category] || 0;
        },

        analysisForTeam(team, otherTeam) {
            return voteAnalysisForTeam(team, otherTeam, this.category, this.game);
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
    font-size: $font-size-lg;
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
