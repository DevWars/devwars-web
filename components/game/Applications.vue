<template>
    <div class="Applications">
        <div v-if="game" class="controls">
            <h4>({{ applications.length }}) Applicants</h4>
            <div>
                <Button class="outline primary" @click="addRegistrant">
                    Add Registrant
                </Button>
                <Button
                    class="outline secondary"
                    :disabled="gameHasPlayers || !canAutoAssign"
                    @click="generateAutoAssignmentProperties"
                >
                    Auto Assign
                </Button>
            </div>
        </div>

        <Table>
            <tr slot="head">
                <th>Username</th>
                <th>Games</th>
                <th>Won</th>
                <th>Lost</th>
                <th>HTML</th>
                <th>CSS</th>
                <th>JS</th>
                <th>Devcoins</th>
            </tr>

            <tr
                v-for="(applicant, index) in applications"
                :key="index"
                @click="addPlayer(applicant)"
            >
                <td>
                    <User
                        :user="applicant"
                        :team="getPlayerTeamById(applicant.id)"
                    />
                </td>
                <td>
                    {{ totalGamesForApplication(applicant) }}
                </td>
                <td>
                    {{ applicant.gameStats ? applicant.gameStats.wins : 0 }}
                </td>
                <td>
                    {{ applicant.gameStats ? applicant.gameStats.loses : 0 }}
                </td>
                <td>
                    {{ defaultSkillValue(applicant.profile.skills, 'html', 0) }}
                </td>
                <td>
                    {{ defaultSkillValue(applicant.profile.skills, 'css', 0) }}
                </td>
                <td>
                    {{ defaultSkillValue(applicant.profile.skills, 'js', 0) }}
                </td>
                <td>
                    <Devcoins :amount="applicant.stats.coins" class="xs" />
                </td>
            </tr>
        </Table>

        <div v-if="applications.length === 0" class="dark plain no-players">
            <p>No players have applied for this game</p>
        </div>
    </div>
</template>

<script>
import { isNil, defaultTo, mean, sample, size } from 'lodash';

import Table from '@/components/Table';
import User from '@/components/user/User';
import Devcoins from '@/components/Devcoins';
import AddPlayerModal from '@/components/modal/AddPlayerModal';
import AddRegistrantModal from '@/components/modal/AddRegistrantModal';
import { getLanguageByGamePlayer } from '@/utils';

export default {
    name: 'Applications',

    components: { Table, User, Devcoins },

    props: {
        schedule: { type: Object, default: undefined },
        game: { type: Object, default: undefined },
    },

    data() {
        return {
            applications: [],
        };
    },

    computed: {
        // Returns true if we have already assigned players to roles.
        gameHasPlayers() {
            return size(this.game?.players) > 0;
        },

        // Returns true if and only if the current game mode is supported for
        // auto assignment.
        canAutoAssign() {
            return ['Classic'].includes(this.game?.mode);
        },
    },

    mounted() {
        if (!this.schedule && !this.game) return;
        this.loadApplications();
    },

    methods: {
        getLanguageByGamePlayer,

        async loadApplications() {
            const scheduleOrGame = this.schedule
                ? `schedule/${this.schedule.id}?stats=true&profile=true`
                : `game/${this.game.id}?stats=true&profile=true`;

            const response = await this.$axios.get(
                `/applications/${scheduleOrGame}`,
            );

            const applications = response.data;
            this.applications = applications;
        },

        async addPlayer(user) {
            if (isNil(this.game)) return;
            const result = await this.$open(AddPlayerModal, {
                user,
                game: this.game,
            });

            if (!isNil(result)) {
                this.$emit('assigned-player', { user, ...result });
            }
        },

        /**
         * Default the given value to the def valud if the given value is not assigned
         * @param {any} value The value being assigned.
         * @param {string} name The name of the key to be returned.
         * @param {any} def The default of the value if null or undefined.
         */
        defaultSkillValue(value, name, def) {
            if (isNil(value)) return def;
            return defaultTo(value[name], def);
        },

        /**
         * Returns the total wins and loses (games) for given application.
         * @param {Application} Application The application who is getting the total games.
         */
        totalGamesForApplication(application) {
            if (isNil(application) || isNil(application.gameStats)) return 0;
            return application.gameStats.wins + application.gameStats.loses;
        },

        async addRegistrant() {
            await this.$open(AddRegistrantModal, { game: this.game });
            this.loadApplications();
        },

        async generateAutoAssignmentProperties() {
            if (this.game.mode === 'Classic')
                await this.generateClassicAssignmentsForApplications();
        },

        async generateClassicAssignmentsForApplications() {
            const playersAssignments = [];

            for (const player of this.applications) {
                const totalGames =
                    player.gameStats?.wins + player.gameStats?.loses || 0;

                playersAssignments.push({
                    preferredRole: sample(['js', 'html', 'css']),
                    meanScore: mean(Object.values(player.profile.skills)),
                    totalGames,
                    player,
                });
            }

            playersAssignments.sort(
                (a, b) =>
                    a.meanScore - b.meanScore && a.totalGames - b.totalGames,
            );

            await this.assignApplicationsToRoles(playersAssignments);
            await this.loadApplications();
        },

        /**
         * Assigns the auto generated roles and players to the given roles in order.
         * @param {object[]}  assingments The players being assigned, including the roles and users.
         */
        async assignApplicationsToRoles(assignments) {
            let lastResponse = null;
            const usedRoles = [];

            let currentTeam = 0;
            let altTeam = 1;

            for (const assignment of assignments) {
                const teamName = this.getTeamNameById(currentTeam);
                const altTeamName = this.getTeamNameById(altTeam);

                const player = {
                    id: assignment.player.id,
                    username: assignment.player.username,
                    language: assignment.preferredRole,
                    team: currentTeam,
                };

                const usedId = `${teamName}-${player.language}`;
                const usedAltId = `${altTeamName}-${player.language}`;
                let currentUsedId = usedId;

                if (usedRoles.includes(usedId) && usedRoles.includes(usedAltId))
                    continue;

                if (
                    usedRoles.includes(usedId) &&
                    !usedRoles.includes(usedAltId)
                ) {
                    currentUsedId = usedAltId;
                    player.team = altTeam;
                }

                lastResponse = await this.$axios.post(
                    `/games/${this.game.id}/player`,
                    { player },
                );

                altTeam = currentTeam;
                currentTeam = currentTeam === 0 ? 1 : 0;
                usedRoles.push(currentUsedId);
            }

            this.$store.commit('game/game', lastResponse.data);
        },

        /**
         * Get the team that the given user is assigned too.
         * Used for assigning + coloring of the users on the applications screen.
         */
        getPlayerTeamById(id) {
            if (isNil(this.game?.players) || isNil(this.game.players[id]))
                return;

            return this.game.players[id].team;
        },

        getTeamNameById(id) {
            return id === 0 ? 'blue' : 'red';
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.Applications {
    .Table tbody td:last-of-type {
        text-align: left;
    }

    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }
}

.no-players {
    text-align: center;
    margin-top: 25px;
    p {
        color: $brand-secondary;
        font-weight: normal;
    }
}
</style>
