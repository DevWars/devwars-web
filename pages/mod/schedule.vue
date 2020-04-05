<template>
    <div>
        <PanelHeader :title="startDate" :subtitle="`@ ${startTime} UTC`">
            <ButtonGroup>
                <Button to="/mod/schedules" class="outline muted">Back</Button>
                <Button
                    v-if="viewingSetupPage"
                    class="primary"
                    :async-click="save"
                >
                    Save
                </Button>
                <Button
                    v-if="schedule.status !== 1"
                    class="success"
                    :async-click="activateAndCreateGame"
                >
                    Activate
                </Button>
                <Button
                    v-if="schedule.status === 1"
                    class="danger"
                    :async-click="end"
                >
                    End
                </Button>
                <Button
                    v-if="user.role === 'ADMIN'"
                    class="outline danger"
                    disabled
                >
                    Delete
                </Button>
            </ButtonGroup>
        </PanelHeader>

        <Tabs>
            <nuxt-link :to="`/mod/schedule/setup?schedule=${schedule.id}`">
                Setup
            </nuxt-link>
            <nuxt-link
                :to="`/mod/schedule/applications?schedule=${schedule.id}`"
            >
                Applications
            </nuxt-link>
        </Tabs>

        <nuxt />
    </div>
</template>

<script>
import moment from 'moment';
import { names } from '../../utils/auth';
import Tabs from '@/components/Tabs';
import PanelHeader from '@/components/mod/PanelHeader';

export default {
    name: 'DashboardSchedule',

    components: { Tabs, PanelHeader },

    meta: {
        auth: names.MODERATOR,
    },

    data() {
        return {};
    },

    async fetch({ store, query }) {
        await store.dispatch('game/schedules', query.schedule);
    },

    computed: {
        schedule() {
            const schedules = this.$store.state.game.schedules;
            return schedules.find(
                (schedule) =>
                    schedule.id === Number(this.$route.query.schedule),
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
            return this.$store.state.user.user;
        },
    },

    methods: {
        async save() {
            try {
                await this.$axios.patch(
                    `/schedules/${this.schedule.id}`,
                    this.schedule,
                );
            } catch (e) {
                this.$store.dispatch('toast/error', e.response.data);
            }
        },

        async activateAndCreateGame() {
            try {
                const schedule = this.schedule;

                await this.$axios.post(`/schedules/${schedule.id}/activate`);

                await this.$axios.post('/games', {
                    schedule: schedule.id,
                    season: 3,
                    mode: schedule.mode,
                    title: schedule.title,
                    status: schedule.status,
                    storage: {
                        templates: schedule.templates,
                        startTime: schedule.startTime,
                        mode: schedule.mode,
                        title: schedule.title,
                        objectives: schedule.objectives,
                    },
                });
            } catch (e) {
                this.$store.dispatch('toast/error', e.response.data);
            }
        },

        async end() {
            await this.$axios.post(`/schedules/${this.schedule.id}/end`);
        },
    },
};
</script>
