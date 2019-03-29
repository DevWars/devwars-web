<template>
    <Applications :schedules="schedules">
        <Table slot-scope="{enterOrCancel, isApplied, cancel, enter}">
            <tr slot="head">
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Showing</th>
                <th></th>
            </tr>
            <!-- eslint-disable -->
            <tr
                v-for="schedule in schedules"
                v-if="filter ? (filter === schedule.name) : true"
                :key="schedule.id"
            >
                <!-- eslint-enable -->
                <td>
                    <div class="dow">{{ schedule.startTime | moment('dddd') }}</div>
                    <h4 class="date">{{ schedule.startTime | moment('MMMM D') }}</h4>
                </td>
                <td>
                    <h4 class="time">{{ schedule.startTime | moment('H:mm') }} UTC</h4>
                </td>
                <td>
                    <h4 class="duration">{{ durations[schedule.mode] || '30' }}</h4>
                </td>
                <td>
                    <div class="show">DevWars Live</div>
                    <div class="title">{{ description(schedule)}}</div>
                </td>
                <td>
                    <div>
                        <a
                            v-show="!isApplied(schedule)"
                            class="btn btn-primary"
                            @click="enter(schedule)"
                        >Register for Entry</a>
                        <a
                            v-show="isApplied(schedule)"
                            class="btn btn-outline-danger"
                            @click="cancel(schedule)"
                        >Resign</a>
                    </div>
                </td>
            </tr>
        </Table>
    </Applications>
</template>


<script>
// import { sortBy } from 'lodash';
import Table from '~/components/Table';
import Applications from '~/components/game/Applications';
import GameDurations from '../../utils/gameDurations';

export default {
    name: 'ScheduleBlock',
    components: { Table, Applications },
    props: {
        filter: {
            type: String,
            default: '',
        },
        count: {
            type: Number,
            default: 0,
        },
    },
    data: () => {
        return {
            durations: GameDurations,
        };
    },
    computed: {
        schedules() {
            return this.$store.state.game.upcoming;
        },
    },
    methods: {
        description(schedule) {
            const descriptions = {
                Classic: 'Classic - 3 VS 3',
                'Zen Garden': 'Zen Garden : 1 VS 1',
                Blitz: 'Blitz - 1 VS 1',
            };

            return descriptions[schedule.mode] || '';
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.dow {
    text-transform: uppercase;
    font-size: $font-size-sm;
}

.show {
    text-transform: uppercase;
}

.duration:after {
    content: ' min';
    font-size: $font-size-xs;
}

.tournament .show {
    color: $bonus-color;

    &:before {
        @extend .far;
        content: $fa-trophy;
        margin-right: $xs-space;
    }
}

.Table /deep/ {
    thead,
    tr {
        display: table;
        width: 100%;
    }

    tbody {
        display: block;
        width: 100%;
        height: 300px;
        overflow-y: auto;
    }

    th,
    td {
        text-align: left;
        width: 20%;
    }

    td:last-of-type {
        text-align: right;
    }
}
</style>
