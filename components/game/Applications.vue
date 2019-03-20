<template>
    <div>
        <slot name="default" :isApplied="isApplied" :cancel="cancel" :enter="enter"></slot>

        <div v-for="game in altered" :key="game.game.id">
            <slot name="game" v-bind="game"></slot>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import ConfirmModal from '~/components/modal/ConfirmModal';
import GameRegistration from '~/components/modal/GameRegistration';

export default {
    name: 'Applications',
    props: {
        'games': {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState({
            user: 'user',
        }),
        applied() {
            return this.$store.state.game.applied;
        },
        entered() {
            return this.$store.state.game.entered;
        },
        altered() {
            return this.games.map((game) => {
                const applied = this.applied.some(
                    (it) => it.id === game.id || it === game.id
                );
                const playing = this.entered.some(
                    (it) => it.id === game.id || it === game.id
                );

                let text;
                let color;
                let action;

                if (playing) {
                    text = 'Playing';
                    color = 'color-success';
                    action = 'Resign';
                } else if (applied) {
                    text = 'Entered';
                    action = 'Resign';
                    color = 'color-warning';
                } else {
                    text = 'Not Entered';
                    action = 'Enter';
                    color = 'color-muted';
                }

                return {
                    game,
                    applied,
                    playing,
                    text,
                    color,
                    enterOrCancel: this.enterOrCancel,
                    action,
                };
            });
        },
    },
    methods: {
        async enter(game) {
            if (!this.user) {
                this.$router.push('/login');

                return;
            }
            const [entered] = await this.$open(GameRegistration, { game });

            if (!entered) return;

            await this.$store.dispatch('game/apply', game);
        },
        async cancel(game) {
            const [result] = await this.$open(ConfirmModal, {
                title: 'Confirm',
                description: 'Are you sure you would like to cancel?',
            });

            if (!result) return;

            await this.$store.dispatch('game/forfeit', game);
        },
        enterOrCancel(altered) {
            if (altered.applied) {
                this.cancel(altered.game);
            } else this.enter(altered.game);
        },
        isApplied(game) {
            return this.applied.some(
                (it) => it.id === game.id || it === game.id
            );
        },
    },

};
</script>
