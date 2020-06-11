<template>
    <Table>
        <tr slot="head">
            <th @click="time = !time">Date</th>
            <th @click="time = !time">Time</th>
            <th @click="duration = !duration">Duration</th>
            <th @click="duration = !duration">Showing</th>
            <th />
        </tr>

        <tr v-for="game in games" :key="game.id">
            <td>
                <div class="dow">{{ game.startTime | moment('dddd') }}</div>
                <h4 class="date">
                    {{ game.startTime | moment('MMMM D') }}
                </h4>
            </td>
            <td>
                <h4 class="time">{{ game.startTime | moment('H:mm') }} UTC</h4>
            </td>
            <td>
                <h4 class="duration">{{ durations[game.mode] || '30' }}</h4>
            </td>
            <td>
                <div class="show">
                    <Icon name="trophy" />
                    <span>DevWars Live</span>
                </div>
                <div class="title">{{ description(game) }}</div>
            </td>
            <td>
                <RegistrationButtons :game="game" />
            </td>
        </tr>
    </Table>
</template>

<script>
import { sortBy, take } from 'lodash';
import GameDurations from '../../utils/gameDurations';
import Table from '@/components/Table';
import RegistrationButtons from '@/components/game/RegistrationButtons';

export default {
    name: 'ScheduleBlock',

    components: { Table, RegistrationButtons },

    props: {
        filter: {
            type: String,
            default: '',
        },

        count: {
            type: Number,
            default: 10,
        },
    },

    data: () => {
        return {
            durations: GameDurations,
            duration: false,
            time: true,
        };
    },

    computed: {
        games() {
            const results = [];

            const { upcoming } = this.$store.state.game;

            for (const game of take(upcoming, this.count)) {
                if (game.mode === this.filter || this.filter === '') {
                    results.push(game);
                }
            }

            const subFilters = [];

            if (this.time) subFilters.push('startTime');
            if (this.duration) subFilters.push('mode');

            console.log(results);

            return sortBy(results, subFilters);
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
    display: flex;
    align-items: Center;
    color: $bonus-color;

    .Icon {
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
