<template>
    <div>
        <slot name="default" :isApplied="isApplied" :cancel="cancel" :enter="enter"></slot>

        <div v-for="schedule in altered" :key="schedule.id">
            <slot name="schedule" v-bind="schedule"></slot>
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
        schedules: {
            type: Array,
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
            return this.schedules.map((schedule) => {
                const applied = this.applied.some(
                    (it) => it.id === schedule.id || it === schedule.id
                );
                const playing = this.entered.some(
                    (it) => it.id === schedule.id || it === schedule.id
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
                    schedule,
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
        async enter(schedule) {
            if (!this.user) {
                this.$router.push('/login');

                return;
            }
            const [entered] = await this.$open(GameRegistration, { schedule });

            if (!entered) return;

            await this.$store.dispatch('game/apply', schedule);
        },
        async cancel(schedule) {
            const [result] = await this.$open(ConfirmModal, {
                title: 'Confirm',
                description: 'Are you sure you would like to cancel?',
            });

            if (!result) return;

            await this.$store.dispatch('game/forfeit', schedule);
        },
        enterOrCancel(altered) {
            if (altered.applied) {
                this.cancel(altered.schedule);
            } else this.enter(altered.schedule);
        },
        isApplied(schedule) {
            return this.applied.some(
                (it) => it.id === schedule.id || it === schedule.id
            );
        },
    },
};
</script>
