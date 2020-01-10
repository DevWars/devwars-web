<template>
    <div>
        <PanelHeader :title="startDate" :subtitle="`@ ${startTime} UTC`">
            <ButtonGroup>
                <Button to="/mod/schedules" class="outline muted">Back</Button>
                <Button v-if="viewingSetupPage" class="primary" :async-click="save">Save</Button>
                <Button
                    v-if="schedule.status !== 1"
                    class="success"
                    :async-click="activate"
                >Activate</Button>
                <Button v-if="schedule.status === 1" class="danger" :async-click="end">End</Button>
                <Button v-if="user.role === 'ADMIN'" class="outline danger" disabled>Delete</Button>
            </ButtonGroup>
        </PanelHeader>

        <Tabs>
            <nuxt-link :to="`/mod/schedule/setup?schedule=${schedule.id}`">Setup</nuxt-link>
            <nuxt-link :to="`/mod/schedule/applications?schedule=${schedule.id}`">Applications</nuxt-link>
        </Tabs>

        <nuxt/>
    </div>
</template>


<script>
import moment from 'moment';
import Tabs from '@/components/Tabs';
import PanelHeader from '@/components/mod/PanelHeader';
import { names } from '../../utils/auth';

export default {
    name: 'DashboardSchedule',

    components: { Tabs, PanelHeader },

    meta: {
        auth: names.MODERATOR,
    },

    async fetch({ store, query }) {
        await store.dispatch('game/schedules', query.schedule);
    },

    computed: {
        schedule() {
            const schedules = this.$store.state.game.schedules;
            return schedules.find((schedule) => schedule.id === Number(this.$route.query.schedule));
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
            return this.$store.state.user.user;
        },
    },

    methods: {
        async save() {
            await this.$axios.patch(`/schedules/${this.schedule.id}`, this.schedule);
        },

        async activate() {
            const schedule = this.schedule;
            schedule.season = 3;
            await this.$axios.post(`/schedules/${this.schedule.id}/activate`, schedule);
        },

        async end() {
            await this.$axios.post(`/schedules/${this.schedule.id}/end`);
        },
    },
};
</script>
