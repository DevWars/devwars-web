<template>
    <div>
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
                <td>{{ applicant.profile.skills.html }}</td>
                <td>{{ applicant.profile.skills.css }}</td>
                <td>{{ applicant.profile.skills.js }}</td>
                <td>
                    <Devcoins :amount="applicant.stats.coins" class="xs"/>
                </td>
            </tr>
        </Table>
    </div>
</template>


<script>
import Table from '~/components/Table';
import Http from '../../../services/Http';
import User from '~/components/user/User';
import Devcoins from '~/components/Devcoins';
import { roles } from '../../../utils/auth';

export default {
    name: 'DashboardSchedulesApplications',
    meta: {
        auth: [roles.moderator, roles.admin],
    },
    components: { Table, User, Devcoins },
    computed: {
        schedule() {
            const schedules = this.$store.state.game.schedules;

            return schedules.find((schedule) => schedule.id === Number(this.$route.query.schedule));
        },
    },
    async asyncData({ query }) {
        const applications = await Http.for(`/applications/schedule/${query.schedule}`).get();

        for (const applicant of applications) {
            // eslint-disable-next-line no-await-in-loop
            applicant.stats = await Http.for(`/users/${applicant.id}/stats`).get();
            // eslint-disable-next-line no-await-in-loop
            applicant.profile = await Http.for(`/users/${applicant.id}/profile`).get();
        }

        return { applications };
    },
    async fetch({ store }) {
        await store.dispatch('game/schedules');
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
