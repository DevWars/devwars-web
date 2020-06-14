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
            </tr>

            <tr
                v-for="(applicant, index) in applications"
                :key="index"
                @click="addPlayer(applicant)"
            >
                <td>
                    <User
                        :user="applicant.user"
                        :team="getPlayerTeamById(applicant.id)"
                    />
                </td>
                <td>
                    {{ totalGamesForApplication(applicant) }}
                </td>
                <td>
                    {{ applicant.statistics ? applicant.statistics.wins : 0 }}
                </td>
                <td>
                    {{ applicant.statistics ? applicant.statistics.loses : 0 }}
                </td>
                <td>
                    {{ defaultSkillValue(applicant.skills, 'html', 0) }}
                </td>
                <td>
                    {{ defaultSkillValue(applicant.skills, 'css', 0) }}
                </td>
                <td>
                    {{ defaultSkillValue(applicant.skills, 'js', 0) }}
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
import AddPlayerModal from '@/components/modal/AddPlayerModal';
import AddRegistrantModal from '@/components/modal/AddRegistrantModal';
import { getLanguageByGamePlayer } from '@/utils';

export default {
    name: 'Applications',

    components: { Table, User },

    props: {
        game: { type: Object, default: undefined },
        players: { type: Array, default: () => [] },
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
        if (!this.game) return;
        this.loadApplications();
    },

    methods: {
        getLanguageByGamePlayer,

        async loadApplications() {
            const applications = await this.$api.games.getGameApplications(
                this.game.id,
            );

            this.applications = applications;
        },

        async addPlayer(application) {
            if (isNil(this.game)) return;
            const result = await this.$open(AddPlayerModal, {
                user: application.user,
                game: this.game,
            });

            if (!isNil(result)) {
                this.$emit('assigned-player', {
                    user: application.user,
                    ...result,
                });
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
            if (isNil(application) || isNil(application.statistics)) return 0;
            return application.statistics.wins + application.statistics.loses;
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

                lastResponse = await this.$api.games.addPlayerToGame(
                    this.game.id,
                    player,
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
            for (const player of this.players) {
                if (player.id === id) return player.team;
            }

            return null;
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
