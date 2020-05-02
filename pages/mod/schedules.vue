<template>
    <div>
        <PanelHeader title="Schedules" show-search>
            <ButtonIcon icon="plus" class="primary sm" @click="createSchedule">
                Add Schedule
            </ButtonIcon>
        </PanelHeader>

        <ListingFilters
            :options="scheduleFilterOptions"
            @change="onScheduleFilterChange"
        />

        <Table>
            <tr slot="head">
                <th>Date</th>
                <th>Status</th>
                <th>Theme</th>
                <th>Gamemode</th>
                <th>&nbsp;</th>
            </tr>

            <tr v-for="schedule in schedules.data" :key="schedule.id">
                <td>{{ schedule.startTime | moment('MM/DD/YYYY') }}</td>
                <td>
                    <span
                        :class="[
                            'mod-status',
                            nameFromStatus(schedule.status).toLowerCase(),
                        ]"
                    >
                        {{ nameFromStatus(schedule.status) }}
                    </span>
                </td>
                <td>{{ schedule.title }}</td>
                <td>{{ schedule.mode }}</td>
                <td>
                    <Button
                        :to="`/mod/schedule?schedule=${schedule.id}`"
                        class="link"
                    >
                        Edit
                    </Button>
                </td>
            </tr>
        </Table>

        <Pagination
            :page="page"
            :per-page="10"
            :can-next="canPageNextSchedule"
            :can-previous="canPagePreviousSchedule"
            @next="next"
            @previous="previous"
        />
    </div>
</template>

<script>
import { isNil } from 'lodash';
import { names } from '../../utils/auth';
import CreateScheduleModal from '../../components/modal/CreateScheduleModal.vue';
import PanelHeader from '@/components/mod/PanelHeader';
import Pagination from '@/components/Pagination';
import ListingFilters from '@/components/mod/ListingFilters';
import Table from '@/components/Table';

import nameFromStatus from '@/utils/gameStatus';

export default {
    name: 'ModSchedules',

    meta: {
        auth: names.MODERATOR,
    },

    components: { PanelHeader, ListingFilters, Table, Pagination },

    async asyncData({ query, error, $axios }) {
        try {
            const { data } = await $axios.get('/schedules?first=10');
            return { schedules: data, page: 0 };
        } catch (e) {
            error({
                statusCode: e.response.status,
                description: e.response.data.error,
                message: e.response.statusText,
            });
        }
    },

    data() {
        return {
            scheduleFilter: 'all',

            scheduleFilterOptions: [
                { name: 'Show All', value: 'all' },
                { name: 'Scheduled', value: 'scheduled' },
                { name: 'Active', value: 'active' },
                { name: 'Ended', value: 'ended' },
            ],
        };
    },

    computed: {
        /**
         * Returns true if we can page forward in the schedule list, this ensures
         * we have the next page link and the next page will not be empty.
         */
        canPageNextSchedule() {
            if (isNil(this.schedules?.pagination?.next)) return false;
            return (
                this.schedules?.pagination?.next != null &&
                this.schedules?.data?.length >= 10
            );
        },

        /**
         * Returns true if we can page backward, ensuring that we are not the
         * first page.
         */
        canPagePreviousSchedule() {
            if (isNil(this.schedules?.pagination?.previous)) return false;
            return this.schedules?.pagination?.previous != null;
        },
    },

    methods: {
        nameFromStatus,
        async createSchedule() {
            await this.$open(CreateScheduleModal, {});
        },

        async onScheduleFilterChange(e) {
            try {
                this.scheduleFilter = e;
                let url = '/schedules?first=10';

                if (this.scheduleFilter !== 'all')
                    url += `&status=${this.scheduleFilter}`;

                this.schedules = (await this.$axios.get(url)).data;

                this.page = 0;
            } catch (error) {
                this.$store.dispatch('toast/error', e.response.data);
            }
        },

        /**
         * Execute a page backward.
         */
        async previous() {
            this.page -= 1;
            const { pagination } = this.schedules;
            const before = pagination.previous;

            let url = `schedules?first=10&before=${before}`;
            if (this.scheduleFilter !== 'all')
                url += `&status=${this.scheduleFilter}`;

            const { data } = await this.$axios.get(url);

            this.schedules = data;
        },

        /**
         * Execute a page forward.
         */
        async next() {
            this.page += 1;
            const { pagination } = this.schedules;
            const after = pagination.next;

            let url = `schedules?first=10&after=${after}`;
            if (this.scheduleFilter !== 'all')
                url += `&status=${this.scheduleFilter}`;

            const { data } = await this.$axios.get(url);

            this.schedules = data;
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.mod-status {
    font-weight: $font-weight-bold;

    &.scheduled {
        color: $info-color;
    }

    &.preparing {
        color: $warning-color;
    }

    &.live {
        color: $danger-color;
    }

    &.active,
    &.complete {
        color: $success-color;
    }

    &.ended {
        color: $text-color-muted;
    }
}
</style>
