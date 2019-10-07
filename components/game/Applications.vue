<template>
    <div class="Applications">
        <div v-if="game" class="controls">
            <h4>({{ applications.length }}) Applicants</h4>
            <Button
                class="outline primary"
                :class="{disabled: applications.length === 0}"
                @click="addRegistrant"
            >Add Registrant</Button>
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

            <tr v-for="applicant in applications" :key="applicant.id" @click="addPlayer(applicant)">
                <td>
                    <User :user="applicant"/>
                </td>
                <td>{{ applicant.stats.game.wins + applicant.stats.game.loses }}</td>
                <td>{{ applicant.stats.game.wins }}</td>
                <td>{{ applicant.stats.game.loses }}</td>
                <td>{{ applicant.profile.skills ? applicant.profile.skills.html : 0 }}</td>
                <td>{{ applicant.profile.skills ? applicant.profile.skills.css : 0 }}</td>
                <td>{{ applicant.profile.skills ? applicant.profile.skills.js : 0 }}</td>
                <td>
                    <Devcoins :amount="applicant.stats.coins" class="xs"/>
                </td>
            </tr>
        </Table>

        <Card v-if="applications.length === 0" class="dark plain">
            <p>No players have applied for this game</p>
        </Card>
    </div>
</template>


<script>
import Table from '@/components/Table';
import Card from '@/components/Card';
import User from '@/components/user/User';
import Devcoins from '@/components/Devcoins';
import AddPlayerModal from '@/components/modal/AddPlayerModal';
import AddRegistrantModal from '@/components/modal/AddRegistrantModal';
import { getLanguageByGamePlayer } from '@/utils';

export default {
    name: 'Applications',

    components: { Table, Card, User, Devcoins },

    props: {
        schedule: { type: Object, default: undefined },
        game: { type: Object, default: undefined },
    },

    data() {
        return {
            applications: [],
        };
    },

    async mounted() {
        if (!this.schedule && !this.game) return;
        const scheduleOrGame = this.schedule ? `schedule/${this.schedule.id}` : `game/${this.game.id}`;
        const applications = (await this.$axios.get(`/applications/${scheduleOrGame}`)).data;

        for (const applicant of applications) {
            // eslint-disable-next-line no-await-in-loop
            applicant.stats = (await this.$axios.get(`/users/${applicant.id}/stats`)).data;
            // eslint-disable-next-line no-await-in-loop
            applicant.profile = (await this.$axios.get(`/users/${applicant.id}/profile`)).data;
        }

        this.applications = applications;
    },

    methods: {
        getLanguageByGamePlayer,

        addPlayer(user) {
            if (!this.game) return;
            this.$open(AddPlayerModal, { user, game: this.game });
        },

        async addRegistrant() {
            await this.$open(AddRegistrantModal, { game: this.game });
            await this.refresh();
        },
    },
};
</script>


<style lang="scss" scoped>
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
</style>
