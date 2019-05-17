<template>
    <div>
        <PanelHeader title="Schedules" showSearch>
            <ButtonIcon icon="fa fa-plus" class="primary sm" @click="createSchedule">Add Schedule</ButtonIcon>
        </PanelHeader>

        <ListingFilters/>

        <Table>
            <tr slot="head">
                <th>Date</th>
                <th>Status</th>
                <th>Theme</th>
                <th>Gamemode</th>
                <th>&nbsp;</th>
            </tr>

            <tr v-for="schedule in schedules" :key="schedule.id">
                <td>{{ schedule.startTime | moment('MM/DD/YYYY') }}</td>
                <td>
                    <span
                        :class="['mod-status', nameFromStatus(schedule.status).toLowerCase()]"
                    >{{ nameFromStatus(schedule.status) }}</span>
                </td>
                <td>{{ schedule.title }}</td>
                <td>{{ schedule.mode }}</td>
                <td>
                    <Button :to="`/mod/schedule/setup?schedule=${schedule.id}`" class="link">Edit</Button>
                </td>
            </tr>
        </Table>
    </div>
</template>


<script>
import PanelHeader from '@/components/mod/PanelHeader';
import ListingFilters from '@/components/mod/ListingFilters';
import Table from '@/components/Table';
import { names } from '../../utils/auth';

import nameFromStatus from '@/utils/gameStatus';
import CreateScheduleModal from '../../components/modal/CreateScheduleModal.vue';

export default {
    name: 'ModSchedules',
    meta: {
        auth: names.MODERATOR,
    },
    components: { PanelHeader, ListingFilters, Table },
    computed: {
        schedules() {
            return this.$store.state.game.schedules;
        },
    },
    async fetch({ store }) {
        await store.dispatch('game/schedules');
    },
    methods: {
        nameFromStatus,
        async createSchedule() {
            await this.$open(CreateScheduleModal, {});
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
