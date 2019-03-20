<template>
    <Applications :games="games">
        <Table slot-scope="{enterOrCancel, isApplied, cancel, enter}">
            <tr slot="head">
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Showing</th>
                <th></th>
            </tr>
            <tr
                v-for="game in limitBy"
                v-if="filter ? (filter === game.name) : true"
                :key="game.id"
            >
                <td>
                    <div class="dow">{{ game.startTime | moment('dddd') }}</div>
                    <h4 class="date">{{ game.startTime | moment('MMMM D') }}</h4>
                </td>
                <td>
                    <h4 class="time">{{ game.startTime | moment('H:mm') }} UTC</h4>
                </td>
                <td>
                    <h4 class="duration">{{ durations[game.setup.mode] || '30' }}</h4>
                </td>
                <td>
                    <div class="show">DevWars Live</div>
                    <div class="title">{{ description(game)}}</div>
                </td>
                <td>
                    <div>
                        <a
                            v-show="!isApplied(game)"
                            class="btn btn-primary"
                            @click="enter(game)"
                        >Register for Entry</a>
                        <a
                            v-show="isApplied(game)"
                            class="btn btn-outline-danger"
                            @click="cancel(game)"
                        >Resign</a>
                    </div>
                </td>
            </tr>
        </Table>
    </Applications>
</template>


<script>
import { sortBy } from 'lodash';
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
        games() {
            return sortBy(this._games, (game) => game.startTime);
        },
        _games() {
            return this.$store.state.game.upcoming;
        },
        limitBy() {
            // limitBy was called here with a count but it didnt exist
            return this.games;
            // (games, count)
        },
    },
    methods: {
        description(game) {
            const descriptions = {
                Classic: 'Classic - 3 VS 3',
                'Zen Garden': 'Zen Garden : 1 VS 1',
                Blitz: 'Blitz - 1 VS 1',
            };

            return descriptions[game.setup.mode] || '';
        },
    },
};
</script>


<style lang="scss" scoped>
@import '../../assets/styles/utils';

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
