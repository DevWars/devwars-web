<template>
    <div class="dashboard-card">
        <div class="dashboard-card__header">
            <i class="dashboard-card__icon fa fa-calendar"></i>
            <h4 class="dashboard-card__title">Upcoming Games</h4>
        </div>
        <div class="applied-games">
            <div class="applied-games__item" :key="game.id" v-for="game in games">
                <div class="applied-games__main">
                    <div class="applied-games__status" :class="[game.colorClass]">{{ game.enterText }}</div>
                    <div class="applied-games__title">{{ game.timestamp | moment('longDate') }} @ {{
                        game.timestamp | moment('HH:mm') }} (UTC)
                    </div>
                </div>
                <div class="applied-games__actions">
                    <button v-show="game.enterText !== 'Playing'"
                            @click="enterOrCancel(game)"
                            class="btn btn-sm btn-block" :class="['btn-outline-' + (game.entered ? 'danger': 'white')]">
                        {{ game.entered ? 'Cancel' : 'Enter'}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import ConfirmModal from '~/components/modal/ConfirmModal';
    import GameRegistration from '~/components/modal/GameRegistration';
    import Http from "../../services/Http";

    @Component({
        props: ['upcoming', 'applied']
    })
    export default class UpcomingGames extends Vue {
        @State(state => state.user.user) user;

        get games() {
            return this.upcoming.map(game => {
                let entered = Object.keys(game.teams).map(it => game.teams[it]).some(team => {
                    return team.players.some(player => player.user.id == this.user.id);
                });

                let signedup = this.applied.some(it => it === game.id);

                if (entered) {
                    game.entered = true;
                    game.enterText = "Playing";
                    game.colorClass = "color-success";
                } else if (signedup) {
                    game.entered = true;
                    game.enterText = "Entered";
                    game.colorClass = "color-warning";
                } else {
                    game.entered = false;
                    game.enterText = "Not Entered";
                    game.colorClass = "color-muted";
                }

                return game;
            });
        }

        async cancel(game) {
            let result = await this.$open(ConfirmModal, {
                title: "Confirm",
                text: "Are you sure you would like to cancel?"
            });

            if (!result) return;

            await Http.for('game/application').delete(game);

            game.entered = false;
            game.enterText = "Not Entered";
            game.colorClass = "color-muted";
        }

        async enter(game) {
            let entered = await this.$open(GameRegistration, {game});

            if (!entered) return;

            game.entered = true;
            game.enterText = "Entered";
            game.colorClass = "color-warning";
        }

        enterOrCancel(game) {
            if (game.entered) {
                this.cancel(game);
            } else this.enter(game)
        }
    }
</script>
