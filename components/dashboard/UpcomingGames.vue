<template>
    <DashboardCard title="Upcoming Games" icon="fa fa-calendar">
        <Applications :games="upcoming">
            <div slot="game" slot-scope="props" class="item">
                <div class="main">
                    <div class="col-xs-2 no-gutter" :class="[props.color]">{{ props.text }}</div>
                    <div class="col-xs-8 no-gutter">
                        {{ props.game.startTime | moment('longDate') }} @ {{ props.game.startTime | moment('HH:mm') }} (UTC)
                    </div>
                </div>
                <div class="actions">
                    <button v-show="!props.playing"
                        @click="props.enterOrCancel(props)"
                        class="btn btn-sm btn-block" :class="['btn-outline-' + (props.applied ? 'danger': 'white')]">
                        {{ props.applied ? 'Cancel' : 'Enter'}}
                    </button>
                </div>
            </div>
        </Applications>
    </DashboardCard>
</template>

<script>
    import Vue from 'vue';

    import Applications from '~/components/game/Applications';
    import DashboardCard from '~/components/DashboardCard';

    import Http from "../../services/Http";

    import {mapState} from "vuex";

    export default {
        name: "UpcomingGames",
         props: ['upcoming', 'applied'],
        components: { Applications, DashboardCard },
        computed: {
            ...mapState({
                user: 'user'
            })
        }
    }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils';

.item {
    @extend %flex-justify;
    padding: $grid-gutter-part;
    border-bottom: 1px solid $divider-color;
}

/deep/ {
    .main {
        width: 100%;
    }

    .actions {
        width: 100px;
    }
}
</style>
