<template>
    <div class="Applications">
        <slot :isApplied="isApplied" :cancel="cancel" :enter="enter"></slot>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import GameResignModal from '@/components/modal/GameResignModal';
import GameRegistration from '@/components/modal/GameRegistration';

export default {
    name: 'Applications',

    computed: {
        ...mapState({
            user: 'user',
        }),

        applications() {
            return this.$store.state.game.applications;
        },
    },

    methods: {
        async enter(schedule) {
            if (!this.user) {
                this.$router.push('/login');
                return;
            }

            await this.$open(GameRegistration, { schedule });
        },

        async cancel(schedule) {
            if (!this.user) {
                this.$router.push('/login');
                return;
            }

            await this.$open(GameResignModal, { schedule });
        },

        isApplied(schedule) {
            return this.applications.some((application) => {
                return application.schedule.id === schedule.id;
            });
        },
    },
};
</script>
