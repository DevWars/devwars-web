<template>
    <div class="card card-plain">
        <Applications :games="games">
            <table class="table" slot-scope="{enterOrCancel, isApplied, cancel, enter}">
                <thead>
                <tr>
                    <th width="15%" class="align-left">Date</th>
                    <th width="15%" class="align-left">Time</th>
                    <th width="5%" class="align-left">Duration</th>
                    <th width="50%" class="align-left">Showing</th>
                    <th width="20%" class="align-left"></th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="game in limitBy(games, count)" :key="game.id" v-if="filter ? (filter === game.name) : true">
                        <td>
                            <div class="dow">{{ game.timestamp | moment('dddd') }}</div>
                            <h4 class="date">{{ game.timestamp | moment('MMMM D') }}</h4>
                        </td>
                        <td>
                            <h4 class="time">{{ game.timestamp | moment('H:mm') }} UTC</h4>
                        </td>
                        <td>
                            <h4 class="duration">{{ durations[game.name] || '30' }}</h4>
                        </td>
                        <td>
                            <div class="show">DevWars Live</div>
                            <div class="title">{{ description(game)}}</div>
                        </td>
                        <td>
                            <a v-show="!isApplied(game)" @click="enter(game)" class="btn btn-primary">
                                Register for Entry
                            </a>
                            <a
                                v-show="isApplied(game)" @click="cancel(game)"
                                class="btn btn-outline-danger"
                            >Resign</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Applications>
    </div>
</template>

<script>
    import Component, { State } from 'nuxt-class-component';
    import Vue from 'vue';

    import { sortBy } from 'lodash';

    import { Prop } from 'vue-property-decorator';

    import Applications from '~/components/game/Applications';
    import GameDurations from '../../utils/game-durations';

    @Component({
        components: { Applications }
    })
    export default class ScheduleBlock extends Vue {
        @Prop({ default: '' }) filter;
        @Prop() count;

        durations = GameDurations;

        @State(state => state.game.upcoming) _games;

        get games() {
            return sortBy(this._games, game => game.timestamp);
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

tbody td {
    &:last-of-type {
        text-align: right;
    }
}

@include breakpoint(sm) {
    thead {
        display: none;
    }

    tbody tr {
        display: block;
        padding: $xs-space $grid-gutter-part;
        text-align: center;
        cursor: default;

        &:hover {
            background-color: transparent;
        }

        &:not(:last-of-type) {
            border-bottom: 1px solid $divider-color;
        }
    }

    tbody td {
        display: block;
        padding: 0;
        border: none;

        &:nth-of-type(1),
        &:nth-of-type(2) {
            display: inline-block;
            vertical-align: middle;
        }

        &:last-of-type {
            margin-top: $xs-space;
            text-align: center;
        }
    }

    .btn {
        margin-top: $xxs-space;
    }
}

.dow {
    text-transform: uppercase;
    font-size: $font-size-sm;

    @include breakpoint(sm) {
        &:after {
            content: ",";
            margin-right: $xxs-space;
        }
    }
}

.time {
    @include breakpoint(sm) {
        &:before {
            content: "@";
            margin: 0 $xxs-space;
        }
    }
}

.duration {
    &:after {
        content: " min";
        font-size: $font-size-xs;
    }
}

td div,
td h4:not(.duration) {
    @include breakpoint(sm) {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-base !important;
        text-transform: uppercase;
    }
}

.show {
    text-transform: uppercase;

    @include breakpoint(sm) {
        &:after {
            content: "-";
            margin: 0 $xxs-space;
        }
    }
}

tbody tr.tournament .show {
    color: $bonus-color;

    &:before {
        @extend .far;
        content: $fa-trophy;
        margin-right: $xs-space;
    }
}
</style>
