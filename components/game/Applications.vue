<template>
    <div class="Applications">
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

            <tr v-for="applicant in applications" :key="applicant.id">
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

        <Card v-if="!applications || applications.length === 0" class="dark plain">
            <p>No players have applied for this game</p>
        </Card>
    </div>
</template>


<script>
import Table from '@/components/Table';
import Card from '@/components/Card';
import User from '@/components/user/User';
import Devcoins from '@/components/Devcoins';

export default {
    name: 'Applications',

    components: { Table, Card, User, Devcoins },

    props: {
        schedule: { type: Object, required: true },
    },

    data() {
        return {
            applications: [],
        };
    },

    async mounted() {
        const applications = (await this.$axios.get(`/applications/schedule/${this.schedule.id}`)).data;

        for (const applicant of applications) {
            // eslint-disable-next-line no-await-in-loop
            applicant.stats = (await this.$axios.get(`/users/${applicant.id}/stats`)).data;
            // eslint-disable-next-line no-await-in-loop
            applicant.profile = (await this.$axios.get(`/users/${applicant.id}/profile`)).data;
        }

        this.applications = applications;
    },
};
</script>


<style lang="scss" scoped>
.roster {
    display: flex;
    margin-bottom: 30px;

    .GameTeam {
        flex: 1 1 100%;
    }
}

.Table tbody td:last-of-type {
    text-align: left;
}

.status {
    margin: 10px 0 20px;
}
</style>
