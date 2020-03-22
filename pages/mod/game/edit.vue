<template>
    <div>
        <div v-if="nameFromStatus(game.status) === 'ENDED'" class="plain dark">
            <Card class="plain dark">
                <SubScore
                    title="Objectives"
                    :blue-score="teams[0].scores.objectives"
                    :red-score="teams[1].scores.objectives"
                >
                    <ul class="objectives">
                        <li
                            v-for="objective in game.objectives"
                            :key="objective.id"
                            class="objectives__item"
                            :class="{ bonus: objective.isBonus }"
                        >
                            <div
                                class="objectives__square team-blue"
                                :class="{
                                    active: teamCompletedObjective(
                                        0,
                                        objective,
                                    ),
                                }"
                                @click="toggleObjectiveState(0, objective)"
                            />
                            <span class="objectives__obj">{{
                                objective.description
                            }}</span>
                            <div
                                class="objectives__square team-red"
                                :class="{
                                    active: teamCompletedObjective(
                                        1,
                                        objective,
                                    ),
                                }"
                                @click="toggleObjectiveState(1, objective)"
                            />
                        </li>
                    </ul>
                </SubScore>
            </Card>
            <Card
                v-for="(scores, index) in game.meta ? game.meta.teamScores : []"
                :key="index"
                class="plain dark teamScores"
            >
                <div class="container">
                    <h3>Team {{ teamName(index) }}</h3>

                    <Input
                        v-model.number="scores.ui"
                        label="UI Score"
                        type="number"
                        required
                        @input="(e) => updateTeamVoteScore(index, 'ui', e)"
                    />
                    <Input
                        v-model.number="scores.ux"
                        label="UX Score"
                        type="number"
                        required
                        @input="(e) => updateTeamVoteScore(index, 'ux', e)"
                    />
                    <Checkbox
                        :checked="scores.tie"
                        :label="`Team ${teamName(index)} Tied`"
                        @input="(e) => toggleTeamTied(index, e)"
                    />

                    <Checkbox
                        :checked="isWinner(index)"
                        :label="`Team ${teamName(index)} Winner`"
                        @input="(e) => toggleTeamWinner(index, e)"
                    />
                </div>
            </Card>
        </div>
        <div v-else><h1>Game Not Ended</h1></div>
    </div>
</template>

<script>
// META: WINNING TEAM, TEAM SCORES (UI, UX, Objective Count)
// TEAMS: Votes (matches meta team scores), objectives complete.
import * as _ from 'lodash';
import { names } from '../../../utils/auth';
import { teams } from '@/utils/mixins';

import {
    getScoreByGameTeam,
    getPlayersByGameTeam,
    getLanguageByGamePlayer,
    teamCompletedObjective,
} from '@/utils';

import Checkbox from '@/components/form/Checkbox';
import Input from '@/components/form/Input';
import SubScore from '@/components/game/SubScore';
import nameFromStatus from '@/utils/gameStatus';
import Card from '@/components/Card';

export default {
    name: 'GameEdit',

    meta: {
        auth: names.MODERATOR,
    },

    components: { SubScore, Card, Input, Checkbox },

    mixins: [teams],

    props: {
        includePlayers: {
            type: Boolean,
            required: false,
            default: true,
        },
    },

    computed: {
        game() {
            const query = Number(this.$route.query.game);
            const games = this.$store.state.game.game;

            return Array(games).find((game) => game.id === query);
        },
    },

    beforeMount() {
        if (_.isNil(this.game.meta)) {
            this.game.meta = {
                winningTeam: null,
                teamScores: _.fill(Array(2), {
                    objectives: 0,
                    ui: 0,
                    ux: 0,
                    tie: false,
                }),
            };
        }

        _.forEach(this.game.teams, (team) => {
            if (_.isNil(team.votes)) team.votes = { ui: 0, ux: 0, tie: false };
            if (_.isNil(team.objectives)) team.objectives = {};
        });

        this.$store.commit('game/game', Object.assign({}, this.game));
    },

    methods: {
        getScoreByGameTeam,
        getPlayersByGameTeam,
        getLanguageByGamePlayer,
        teamCompletedObjective,
        nameFromStatus,

        toggleObjectiveState(team, objective) {
            const specTeam = this.game.teams[team];

            if (_.isNil(specTeam.objectives)) specTeam.objectives = {};

            if (
                _.isNil(specTeam.objectives[objective.id]) ||
                specTeam.objectives[objective.id] === 'incomplete'
            ) {
                specTeam.objectives[objective.id] = 'complete';
            } else if (specTeam.objectives[objective.id] === 'complete') {
                specTeam.objectives[objective.id] = 'incomplete';
            }

            let total = 0;
            _.forEach(specTeam.objectives, (obj) => {
                if (obj === 'complete') total += 1;
            });

            this.game.meta.teamScores[team].objectives = total;
        },

        isWinner(team) {
            return (
                this.game.meta.winningTeam != null &&
                Number(team) === this.game.meta.winningTeam
            );
        },

        teamName(team) {
            return Number(team) === 0 ? 'Blue' : 'Red';
        },

        updateTeamVoteScore(team, type, score) {
            this.game.teams[team].votes[type] = _.defaultTo(Number(score), 0);
            this.game.meta.teamScores[team][type] = _.defaultTo(
                Number(score),
                0,
            );
        },

        toggleTeamTied(team, tied) {
            this.game.teams[team].votes.tie = Boolean(tied);
            this.game.meta.teamScores[team].tie = Boolean(tied);

            const otherTeam = Number(team) === 0 ? 1 : 0;
            this.game.teams[otherTeam].votes.tie = Boolean(tied);
            this.game.meta.teamScores[otherTeam].tie = Boolean(tied);
        },

        toggleTeamWinner(team, winner) {
            if (winner) {
                this.game.meta.winningTeam = Number(team);
            } else {
                team = Number(team) === 1 ? 0 : 1;
                this.game.meta.winningTeam = team;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

h3 {
    margin-bottom: 25px;
}

.container {
    max-width: 650px;
}

.teamScores {
    padding: 25px;
}

.teamScores div {
    margin-bottom: 25px;
}

.objectives {
    &__item {
        @extend %flex-justify;
        width: 100%;
        padding-bottom: $s-space;
        text-align: center;

        &.bonus {
            color: $bonus-color;
        }
    }

    &__square {
        cursor: pointer;
        width: 30px;
        height: 30px;
        border: 5px solid #23252c;

        &.team-blue.active {
            background-color: $brand-primary;
        }

        &.team-red.active {
            background-color: $brand-secondary;
        }
    }

    &__item.bonus &__square.active {
        background-color: $bonus-color;
    }
}
</style>
