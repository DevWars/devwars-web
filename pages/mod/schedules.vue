<template>
    <div>
        <PanelHeader title="Schedules" showSearch>
            <button class="btn btn-primary btn-icon btn-sm" disabled>
                <i class="fa fa-plus"></i>
                <span>Add Schedule</span>
            </button>
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
                    <nuxt-link
                        :to="`/mod/schedule/setup?schedule=${schedule.id}`"
                        class="btn-link"
                    >Edit</nuxt-link>
                </td>
            </tr>
        </Table>
    </div>
</template>


<script>
import PanelHeader from '~/components/mod/PanelHeader';
import ListingFilters from '~/components/mod/ListingFilters';
import Table from '~/components/Table';

import nameFromStatus from '~/utils/gameStatus';

export default {
    name: 'ModSchedules',
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
