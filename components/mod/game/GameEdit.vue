<template>
    <div v-if="currentGame != null" class="GameEdit">
        <Card class="dark plain">
            <Row v-if="nameFromStatus(currentGame.status) === 'ENDED' && teamReport != null">
                <Column :md="6">
                    <Card class="dark plain">
                        <ObjectivesList
                            :game="game"
                            :players="players"
                            @blueObjective="(objective) => toggleObjectiveState(0, objective)"
                            @redObjective="(objective) => toggleObjectiveState(1, objective)"
                        />
                    </Card>
                </Column>

                <Column
                    v-for="(scores, index) in currentGame.meta
                        ? currentGame.meta.teamScores
                        : []"
                    :key="index"
                    :lg="3"
                    :md="6"
                >
                    <Card class="dark plain teamScores">
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
                            :checked="currentGame.meta.tie"
                            label="Tied"
                            @input="(e) => toggleTeamTied(e)"
                        />
                        <Checkbox
                            :label="`Winner-${index}`"
                            :checked="isWinner(index)"
                            @input="(e) => toggleTeamWinner(index, e)"
                        />
                    </Card>
                </Column>
            </Row>

            <div v-else-if="nameFromStatus(currentGame.status) !== 'ENDED'">
                <h1>Game Not Ended</h1>
            </div>
            <div v-else-if="nameFromStatus(game.status) === 'ENDED' && teams == null">
                <h1>No Teams Played</h1>
            </div>
        </Card>
    </div>
</template>

<script>
// META: WINNING TEAM, TEAM SCORES (UI, UX, Objective Count)
// TEAMS: Votes (matches meta team scores), objectives complete.
import * as _ from 'lodash';
import { names } from '../../../utils/auth';
import { createTeamReport } from '@/utils/mixins';
import Checkbox from '@/components/form/Checkbox';
import Input from '@/components/form/Input';
import ObjectivesList from '@/components/game/ObjectivesList';
import nameFromStatus from '@/utils/gameStatus';
import Card from '@/components/Card';

export default {
    name: 'GameEdit',

    meta: {
        auth: names.MODERATOR,
    },

    components: { Card, Input, Checkbox, ObjectivesList },

    mixins: [createTeamReport],

    props: {
        players: {
            type: Array,
            required: false,
            default: () => [],
        },
        game: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        currentGame: {},
    }),

    computed: {
        teamReport() {
            return this.createTeamReport(this.game, this.players);
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
        nameFromStatus,

        toggleObjectiveState(teamId, objective) {
            const specTeam = this.teamReport[teamId];

            if (_.isNil(specTeam.objectives))
                specTeam.objectives = { [objective.id]: 'incomplete' };

            const state =
                _.isNil(specTeam.objectives[objective.id]) ||
                specTeam.objectives[objective.id] === 'incomplete'
                    ? 'complete'
                    : 'incomplete';

            specTeam.objectives[objective.id] = state;
            this.currentGame.meta.teamScores[specTeam.id].objectives[
                objective.id
            ] = state;

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
            this.teamReport[team][type] = _.defaultTo(Number(score), 0);
            this.currentGame.meta.teamScores[team][type] = _.defaultTo(
                Number(score),
                0,
            );

            this.$emit('update-game', this.currentGame);
        },

        toggleTeamTied(tied) {
            this.currentGame.meta.tie = Boolean(tied);

            if (this.currentGame.meta.tie)
                this.currentGame.meta.winningTeam = null;

            this.$emit('update-game', this.currentGame);
        },

        toggleTeamWinner(team, winner) {
            this.currentGame.meta.winningTeam = winner ? Number(team) : null;
            this.currentGame.meta.tie = false;

            this.$emit('update-game', this.currentGame);
        },

        teamCompletedObjective(teamId, objective) {
            if (!this.teamReport[teamId].objectives) return;

            for (const [key, value] of Object.entries(
                this.teamReport[teamId].objectives,
            )) {
                if (objective.id === Number(key) && value === 'complete') {
                    return value;
                }
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

.Row {
    .Column {
        &:not(:last-child) {
            padding: 0 $grid-gutter-width;
            border-right: 1px solid $divider-color;
        }
    }

    .Card {
        box-shadow: none;
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
