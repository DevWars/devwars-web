<template>
    <Card v-if="currentGame != null" class="dark plain">
        <div
            v-if="
                nameFromStatus(currentGame.status) === 'ENDED' && teams != null
            "
            class="container"
        >
            <Card class="dark">
                <SubScore
                    title="Objectives"
                    :blue-score="currentTeams[0].scores.objectives"
                    :red-score="currentTeams[1].scores.objectives"
                >
                    <ul class="objectives">
                        <li
                            v-for="objective in currentGame.objectives"
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
                v-for="(scores, index) in currentGame.meta
                    ? currentGame.meta.teamScores
                    : []"
                :key="index"
                class=" dark teamScores"
            >
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
            </Card>
        </div>
        <div v-else-if="nameFromStatus(currentGame.status) !== 'ENDED'">
            <h1>Game Not Ended</h1>
        </div>
        <div
            v-else-if="nameFromStatus(game.status) === 'ENDED' && teams == null"
        >
            <h1>No Teams Played</h1>
        </div>
    </Card>
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
        game: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        currentGame: {},
    }),

    computed: {
        currentTeams() {
            return this.teams(this.currentGame);
        },
    },

    watch: {
        game(newGame, oldGame) {
            this.currentGame = newGame;
        },
    },

    beforeMount() {
        this.currentGame = this.game;

        if (_.isNil(this.currentGame.meta)) {
            this.currentGame.meta = {
                winningTeam: null,
                teamScores: [],
            };

            const teamsAmount = _.size(this.currentGame.teams);

            for (let index = 0; index < teamsAmount; index++) {
                this.currentGame.meta.teamScores.push({
                    objectives: 0,
                    ui: 0,
                    ux: 0,
                    tie: false,
                });
            }
        }

        _.forEach(this.currentGame.teams, (team) => {
            if (_.isNil(team.votes)) team.votes = { ui: 0, ux: 0, tie: false };
            if (_.isNil(team.objectives)) team.objectives = {};
        });
    },

    methods: {
        getScoreByGameTeam,
        getPlayersByGameTeam,
        getLanguageByGamePlayer,
        teamCompletedObjective,
        nameFromStatus,

        toggleObjectiveState(team, objective) {
            const specTeam = this.currentGame.teams[team];

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

            this.currentGame.meta.teamScores[team].objectives = total;
            this.$emit('update-game', this.currentGame);
        },

        isWinner(team) {
            return (
                this.currentGame.meta.winningTeam != null &&
                Number(team) === this.currentGame.meta.winningTeam
            );
        },

        teamName(team) {
            return Number(team) === 0 ? 'Blue' : 'Red';
        },

        updateTeamVoteScore(team, type, score) {
            this.currentGame.teams[team].votes[type] = _.defaultTo(
                Number(score),
                0,
            );
            this.currentGame.meta.teamScores[team][type] = _.defaultTo(
                Number(score),
                0,
            );

            this.$emit('update-game', this.currentGame);
        },

        toggleTeamTied(team, tied) {
            this.currentGame.teams[team].votes.tie = Boolean(tied);
            this.currentGame.meta.teamScores[team].tie = Boolean(tied);

            const otherTeam = Number(team) === 0 ? 1 : 0;
            this.currentGame.teams[otherTeam].votes.tie = Boolean(tied);
            this.currentGame.meta.teamScores[otherTeam].tie = Boolean(tied);
            this.$emit('update-game', this.currentGame);
        },

        toggleTeamWinner(team, winner) {
            if (winner) {
                this.currentGame.meta.winningTeam = Number(team);
            } else {
                this.currentGame.meta.winningTeam = null;
            }

            this.$emit('update-game', this.currentGame);
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

.template-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 20px;
}

.input-container {
    display: flex;
}

.container {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 10px;

    .Card {
        margin: 5px;
        max-width: 500px;
        min-width: 300px;
        min-height: 450px;
    }
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

    &__obj {
        margin: 0 10px 0 10px;
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
