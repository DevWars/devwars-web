<template>
    <div v-if="schedule != null">
        <PanelHeader :title="startDate" :subtitle="`@ ${startTime} UTC`">
            <ButtonGroup>
                <Button to="/mod/schedules" class="outline muted">Back</Button>
                <Button class="primary" :async-click="save">
                    Save
                </Button>
                <Button
                    v-if="schedule.status === 0"
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
                    v-if="schedule.status !== 1"
                    class="danger"
                    :async-click="deleteScheduleById"
                >
                    Delete
                </Button>
            </ButtonGroup>
        </PanelHeader>

        <Tabbed>
            <TabbedItem name="Setup" :selected="true">
                <Setup
                    :schedule="schedule"
                    @update-schedule="triggerScheduleRefresh"
                />
            </TabbedItem>
            <TabbedItem name="Applications">
                <Applications
                    :schedule="schedule"
                    @update-schedule="triggerScheduleRefresh"
                />
            </TabbedItem>
        </Tabbed>
    </div>
</template>

<script>
import moment from 'moment';
import { isNil } from 'lodash';

import { names } from '../../utils/auth';
import Tabbed from '@/components/Tabbed';
import TabbedItem from '@/components/TabbedItem';

import PanelHeader from '@/components/mod/PanelHeader';
import Setup from '@/components/mod/schedule/setup';
import Applications from '@/components/mod/schedule/applications';

export default {
    name: 'DashboardSchedule',

    components: { Tabbed, TabbedItem, PanelHeader, Setup, Applications },

    meta: {
        auth: names.MODERATOR,
    },

    async asyncData({ query, error, $axios }) {
        if (query.schedule == null || query.schedule.trim() === '')
            return { schedule: null };

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
        startDate() {
            return moment(this.schedule?.startTime).format('MM/DD/YYYY');
        },

        startTime() {
            return moment(this.schedule?.startTime).format('HH:mm');
        },

        viewingSetupPage() {
            const currentPage = this.$route.path.split('/').pop();
            return currentPage === 'setup';
        },

        user() {
            return this.$store.state.user.user;
        },
    },

    // If we did not get the related schedule from the server, just redirect the
    // user to the home page. And let the user know why it happened.
    created() {
        if (isNil(this.schedule)) {
            this.$store.dispatch('toast/error', 'Schedule could not be loaded');
            return this.$router.push('/');
        }
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

                await this.$axios.patch(
                    `/schedules/${this.schedule.id}`,
                    this.schedule,
                );

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

                this.schedule.status = 1;
            } catch (e) {
                this.$store.dispatch('toast/error', e.response.data);
            }
        },

        /**
         * Attempt to end the given schedule
         */
        async end() {
            try {
                await this.$axios.post(`/schedules/${this.schedule.id}/end`);
                this.schedule.status = 2;
            } catch (e) {
                this.$store.dispatch('toast/error', e.response.data);
            }
        },

        /**
         * Deletes the given schedule by the id, letting the user know that it
         * was deleted and redirecting them to the schedules page. If a error is
         * triggered, the user will still be redirected.
         */
        async deleteScheduleById() {
            try {
                await this.$axios.delete(`/schedules/${this.schedule.id}`);
                this.$store.dispatch(
                    'toast/success',
                    `Deleted schedule ${this.schedule.id}`,
                );
                this.$router.push({ path: '/mod/schedules' });
            } catch (e) {
                this.$store.dispatch('toast/error', e.response.data);
            }
        },

        triggerScheduleRefresh(updatedSchedule) {
            this.schedule = Object.assign({}, updatedSchedule);
        },
    },
};
</script>
