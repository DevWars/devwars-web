<template>
    <Applications :games="games">
        <Table slot-scope="{enterOrCancel, isApplied, cancel, enter}">
            <tr slot="head">
                <th width="15%" class="align-left">Date</th>
                <th width="15%" class="align-left">Time</th>
                <th width="5%" class="align-left">Duration</th>
                <th width="40%" class="align-left">Showing</th>
                <th width="30%" class="align-left"></th>
            </tr>
            <tr v-for="game in limitBy(games, count)" :key="game.id" v-if="filter ? (filter === game.name) : true">
                <td>
                    <div class="dow">{{ game.startTime | moment('dddd') }}</div>
                    <h4 class="date">{{ game.startTime | moment('MMMM D') }}</h4>
                </td>
                <td>
                    <h4 class="time">{{ game.startTime | moment('H:mm') }} UTC</h4>
                </td>
                <td>
                    <h4 class="duration">{{ durations[game.name] || '30' }}</h4>
                </td>
                <td>
                    <div class="show">DevWars Live</div>
                    <div class="title">{{ description(game)}}</div>
                </td>
                <td>
                    <div>
                        <a v-show="!isApplied(game)" @click="enter(game)" class="btn btn-primary">
                            Register for Entry
                        </a>
                        <a v-show="isApplied(game)" @click="cancel(game)" class="btn btn-outline-danger"
                        >
                            Resign
                        </a>
                    </div>
                </td>
            </tr>
        </Table>
    </Applications>
</template>

<script>
    import Component, { State } from 'nuxt-class-component';
    import Vue from 'vue';

    import { sortBy } from 'lodash';

    import { Prop } from 'vue-property-decorator';

    import Table from '~/components/Table';
    import Applications from '~/components/game/Applications';
    import GameDurations from '../../utils/game-durations';

    @Component({
        components: { Table, Applications }
    })
    export default class ScheduleBlock extends Vue {
        @Prop({ default: '' }) filter;
        @Prop() count;

        durations = GameDurations;

        @State(state => state.game.upcoming) _games;

        get games() {
            return sortBy(this._games, game => game.startTime);
        }

        description(game) {
            const descriptions = {
                'Classic': 'Classic - 3 VS 3',
                'Zen Garden': 'Zen Garden : 1 VS 1',
                'Blitz': 'Blitz - 1 VS 1',
            };

            return descriptions[game.name] || '';
        }
    }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils';

.Table {
    td:last-of-type {
        text-align: right;
    }
}

.dow {
    text-transform: uppercase;
    font-size: $font-size-sm;
}

.show {
    text-transform: uppercase;
}

.duration:after {
    content: " min";
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
</style>
