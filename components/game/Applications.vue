<template>
    <div class="Applications">
        <div v-if="game" class="controls">
            <h4>({{ applications.length }}) Applicants</h4>
            <Button class="outline primary" @click="addRegistrant">
                Add Registrant
            </Button>
        </div>

        <Table>
            <tr slot="head">
                <th>Username1</th>
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
                :key="applicant.id + index + applicant.id"
                @click="addPlayer(applicant)"
            >
                <td>
                    <User
                        :user="applicant"
                        :team="getPlayerTeamById(applicant.id)"
                    />
                </td>
                <td>
                    {{ applicant.gameStats.wins + applicant.gameStats.loses }}
                </td>
                <td>{{ applicant.gameStats.wins }}</td>
                <td>{{ applicant.gameStats.loses }}</td>
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
import { isNil, defaultTo } from 'lodash';

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

        /**
         * A object containing a key-value pair of the assignments if any.
         * Allowing the understanding of who has been asigned to what team.
         *
         * "1": 0
         * "2": 1
         * "3": 0
         */
        assignments: {
            type: Object,
            default: Object,
        },
    },

    data() {
        return {
            applications: [],
        };
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

        addPlayer(user) {
            if (isNil(this.game)) return;
            this.$open(AddPlayerModal, { user, game: this.game });
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

        async addRegistrant() {
            await this.$open(AddRegistrantModal, { game: this.game });
            this.loadApplications();
        },

        /**
         * Get the team that the given user is assigned too.
         * Used for assigning + coloring of the users on the applications screen.
         */
        getPlayerTeamById(id) {
            if (isNil(this.game) || isNil(this.game.players[id])) return;
            return this.game.players[id].team;
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
}
</style>
