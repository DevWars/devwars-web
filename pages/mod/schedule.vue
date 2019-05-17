<template>
    <div>
        <PanelHeader :title="startDate" :subtitle="`@ ${startTime} UTC`">
            <ButtonGroup>
                <Button to="/mod/schedules" class="outline muted">Back</Button>
                <Button v-if="viewingSetupPage" v-async-click="[save]" class="primary">Save</Button>
                <Button v-if="user.role === 'ADMIN'" class="danger" disabled>Delete</Button>
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

    async fetch({ store, query }) {
        await store.dispatch('game/schedules', query.schedule);
    },

    methods: {
        async save() {
            await this.$axios.patch(`/schedules/${this.schedule.id}`, this.schedule);
        },
    },
};
</script>
