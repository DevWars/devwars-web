<template>
    <div class="dashboard-card">
        <div class="dashboard-card__header">
            <i class="dashboard-card__icon fa fa-calendar"></i>
            <h4 class="dashboard-card__title">Upcoming Games</h4>
        </div>
        <Applications :games="upcoming" class="applied-games">
            <div slot="game" slot-scope="props" class="applied-games__item">
                <div class="applied-games__main">
                    <div class="applied-games__status" :class="[props.color]">{{ props.text }}</div>
                    <div class="applied-games__title">
                        {{ props.game.timestamp | moment('longDate') }} @ {{ props.game.timestamp | moment('HH:mm') }} (UTC)
                    </div>
                </div>
                <div class="applied-games__actions">
                    <button v-show="!props.playing"
                            @click="props.enterOrCancel(props)"
                            class="btn btn-sm btn-block" :class="['btn-outline-' + (props.applied ? 'danger': 'white')]">
                        {{ props.applied ? 'Cancel' : 'Enter'}}
                    </button>
                </div>
            </div>
        </Applications>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';


    import Applications from '~/components/game/Applications';

    import Http from "../../services/Http";

    @Component({
        props: ['upcoming', 'applied'],
        components: {Applications}
    })
    export default class UpcomingGames extends Vue {
        @State(state => state.user.user) user;



    }
</script>
