<template>
    <div>
        <slot name="default" :isApplied="isApplied" :cancel="cancel" :enter="enter"/>

        <div v-for="game in altered" :key="game.game.id">
            <slot name="game" v-bind="game"/>
        </div>
    </div>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import {Prop} from 'vue-property-decorator';

    import ConfirmModal from '~/components/modal/ConfirmModal';
    import GameRegistration from '~/components/modal/GameRegistration';

    @Component
    export default class Applications extends Vue {
        @Prop() games;

        @State(state => state.game.applied) applied;
        @State(state => state.user.user) user;

        async enter(game) {
            if(!this.user) {
                this.$router.push('/login');

                return;
            }

            let [entered] = await this.$open(GameRegistration, {game});

            if (!entered) return;

            await this.$store.dispatch('game/apply', game);
        }

        async cancel(game) {
            let result = await this.$open(ConfirmModal, {
                title: "Confirm",
                text: "Are you sure you would like to cancel?"
            });

            if (!result) return;

            await this.$store.dispatch('game/forfeit', game);
        }


        enterOrCancel(altered) {
            if (altered.applied) {
                this.cancel(altered.game);
            } else this.enter(altered.game)
        }

        isApplied(game) {
            return this.applied.some(it => it.id === game.id || it === game.id);
        }

        get altered() {
            return this.games.map(game => {
                let applied = this.applied.some(it => it.id === game.id || it === game.id);
                let playing = this.applied.some(it => {
                    return it.id === game.id && Object.values(it.teams).some(team => {
                        return team.players.some(player => player.user.id === this.user.id);
                    });
                });

                let text;
                let color;

                if (playing) {
                    text = "Playing";
                    color = "color-success";
                } else if (applied) {
                    text = "Entered";
                    color = "color-warning";
                } else {
                    text = "Not Entered";
                    color = "color-muted";
                }

                return {game, applied, playing, text, color, enterOrCancel: this.enterOrCancel};
            });
        }
    }
</script>
