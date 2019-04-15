<template>
    <div>
        <PanelHeader :title="startDate" :subtitle="`@ ${startTime} UTC`">
            <a href="/mod/schedules" class="btn btn-outline-gray">Back</a>
            <button v-if="viewingSetupPage" v-async-click="[save]" class="btn btn-primary">Save</button>
            <button v-if="user.role === 'ADMIN'" class="btn btn-secondary" disabled>Delete</button>
        </PanelHeader>

        <nav class="nav-tabs">
            <nuxt-link
                :to="`/mod/schedule/setup?schedule=${schedule.id}`"
                class="nav-tabs__item"
            >Setup</nuxt-link>
            <nuxt-link
                :to="`/mod/schedule/applications?schedule=${schedule.id}`"
                class="nav-tabs__item"
            >Applications</nuxt-link>
        </nav>

        <nuxt/>
    </div>
</template>


<script>
import moment from 'moment';
import PanelHeader from '~/components/mod/PanelHeader';
import { roles } from '../../utils/auth';

export default {
    name: 'DashboardSchedule',
    components: { PanelHeader },
    meta: {
        auth: [roles.moderator, roles.admin],
    },
    computed: {
        schedule() {
            const schedules = this.$store.state.game.schedules;
            return schedules.find(
                (schedule) => schedule.id === Number(this.$route.query.schedule)
            );
        },
        startDate() {
            return moment(this.schedule.startTime).format('MM/DD/YYYY');
        },
        startTime() {
            return moment(this.schedule.startTime).format('HH:mm');
        },
        viewingSetupPage() {
            const currentPage = this.$route.path.split('/').pop();
            return currentPage === 'setup';
        },
        user() {
            return this.$store.state.user.user
        },
    },
    async fetch({ store, query }) {
        await store.dispatch('game/schedules', query.schedule);
    },
    methods: {
        async save() {
            await this.$axios.patch(
                `/schedules/${this.schedule.id}`,
                this.schedule
            );
        },
    },
};
</script>
