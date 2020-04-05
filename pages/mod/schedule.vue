<template>
    <div>
        <PanelHeader :title="startDate" :subtitle="`@ ${startTime} UTC`">
            <ButtonGroup>
                <Button to="/mod/schedules" class="outline muted">Back</Button>
                <Button class="primary" :async-click="save">
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
            <Tab name="Setup" :selected="true">
                <Setup
                    :schedule="schedule"
                    @update-schedule="triggerScheduleRefresh"
                />
            </Tab>
            <Tab name="Applications">
                <Applications
                    :schedule="schedule"
                    @update-schedule="triggerScheduleRefresh"
                />
            </Tab>
        </Tabs>
    </div>
</template>

<script>
import moment from 'moment';
import { names } from '../../utils/auth';
import Tabs from '@/components/Tabs';
import Tab from '@/components/Tab';

import PanelHeader from '@/components/mod/PanelHeader';
import Setup from '@/components/mod/schedule/setup';
import Applications from '@/components/mod/schedule/Applications';

export default {
    name: 'DashboardSchedule',

    components: { Tabs, Tab, PanelHeader, Setup, Applications },

    meta: {
        auth: names.MODERATOR,
    },

    async asyncData({ query, error, $axios }) {
        if (query.schedule == null || query.schedule.trim() === '') return {};

        try {
            const response = await $axios.get(`/schedules/${query.schedule}`);
            return { schedule: response.data };
        } catch (e) {
            error({
                statusCode: e.response.status,
                description: e.response.data.error,
                message: e.response.statusText,
            });
        }
    },

    computed: {
        schedule() {
            const { schedule: id } = this.$route.query;
            return this.$store.getters['game/scheduleById'](id);
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

        triggerScheduleRefresh(updatedSchedule) {
            this.schedule = Object.assign({}, updatedSchedule);
        },
    },
};
</script>
